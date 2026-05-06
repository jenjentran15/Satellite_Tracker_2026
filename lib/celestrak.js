import * as satellite from 'satellite.js';
import { isCacheValid, readCache, writeCache, appendLog } from './fileCache.js';
import { checkRateLimit } from './rateLimiter.js';

const ST_BASE = 'https://www.space-track.org';
const ST_LOGIN = `${ST_BASE}/ajaxauth/login`;
const GM = 398600.4418;
const R_EARTH = 6371.0;

let sessionCookie = null;
let sessionTime = 0;
const SESSION_TTL = 2 * 60 * 60 * 1000;

async function getSession() {
  if (sessionCookie && Date.now() - sessionTime < SESSION_TTL) return sessionCookie;
  const email = process.env.SPACETRACK_EMAIL;
  const password = process.env.SPACETRACK_PASSWORD;
  if (!email || !password) throw new Error('SPACETRACK_EMAIL and SPACETRACK_PASSWORD must be set in .env.local');
  const res = await fetch(ST_LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `identity=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
  });
  if (!res.ok) throw new Error(`Space-Track login failed: HTTP ${res.status}`);
  const cookie = res.headers.get('set-cookie');
  if (!cookie) throw new Error('Space-Track login returned no session cookie');
  sessionCookie = cookie.split(';')[0];
  sessionTime = Date.now();
  return sessionCookie;
}

async function fetchGP(url) {
  checkRateLimit();
  const t0 = Date.now();
  const cookie = await getSession();
  const res = await fetch(url, { headers: { Cookie: cookie } });
  const durationMs = Date.now() - t0;
  if (!res.ok) {
    if (res.status === 401) sessionCookie = null;
    const body = await res.text().catch(() => '');
    appendLog({ endpoint: url, status: res.status, durationMs, error: body.slice(0, 100) });
    throw new Error(`Space-Track query failed: HTTP ${res.status} — ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  appendLog({ endpoint: url.replace(ST_BASE, ''), status: res.status, durationMs, count: data.length });
  return data;
}

function gpJsonToRecords(records) {
  return records.filter(r => r.TLE_LINE1 && r.TLE_LINE2).map(r => ({
    name: r.OBJECT_NAME ?? '',
    line1: r.TLE_LINE1,
    line2: r.TLE_LINE2,
    intlDesignator: r.OBJECT_ID ?? null,
    countryCode: r.COUNTRY_CODE ?? null,
    launchDate: r.LAUNCH_DATE ?? null,
    launchSite: r.SITE ?? null,
    decayDate: r.DECAY_DATE ?? null,
    rcsSize: r.RCS_SIZE ?? null,
    tleEpoch: r.EPOCH ?? null,
    objectTypeRaw: r.OBJECT_TYPE ?? null,
  }));
}

function getTypeFromName(name) {
  const n = name.toUpperCase();
  if (n.includes(' DEB') || n.endsWith('DEB') || n.includes('DEBRIS')) return 'debris';
  if (n.includes('R/B') || n.includes('ROCKET BODY')) return 'rocket_body';
  return 'active';
}

function getOrbitType(satrec) {
  const n = satrec.no / 60;
  const a = Math.cbrt(GM / (n * n));
  const avgAlt = a - R_EARTH;
  if (satrec.ecco > 0.25) return 'HEO';
  if (avgAlt < 2000) return 'LEO';
  if (avgAlt >= 34000 && avgAlt <= 37000) return 'GEO';
  return 'MEO';
}

function getConstellationAndOperator(name) {
  const n = name.toUpperCase();
  if (n.startsWith('STARLINK')) return { constellation: 'Starlink', operator: 'SpaceX' };
  if (n.startsWith('ONEWEB')) return { constellation: 'OneWeb', operator: 'OneWeb' };
  if (n.startsWith('GPS') || n.startsWith('NAVSTAR')) return { constellation: 'GPS', operator: 'US Space Force' };
  if (n.includes('IRIDIUM')) return { constellation: 'Iridium', operator: 'Iridium' };
  if (n.includes('GLOBALSTAR')) return { constellation: 'Globalstar', operator: 'Globalstar' };
  if (n.includes('ZARYA') || n.includes('ISS ') || n === 'ISS (ZARYA)') return { constellation: null, operator: 'ISS Partners' };
  if (n.includes('INTELSAT')) return { constellation: null, operator: 'Intelsat' };
  if (n.includes('SES-') || n.startsWith('SES ')) return { constellation: null, operator: 'SES' };
  if (n.includes('COSMOS')) return { constellation: null, operator: 'Roscosmos' };
  if (n.includes('BEIDOU')) return { constellation: 'BeiDou', operator: 'CNSA' };
  if (n.includes('GALILEO')) return { constellation: 'Galileo', operator: 'ESA' };
  if (n.includes('GLONASS')) return { constellation: 'GLONASS', operator: 'Roscosmos' };
  return { constellation: null, operator: 'Unknown' };
}

function getLaunchYear(line1) {
  const intldes = line1.substring(9, 17).trim();
  if (intldes.length >= 2) {
    const yy = parseInt(intldes.substring(0, 2), 10);
    if (isNaN(yy)) return null;
    return yy < 57 ? 2000 + yy : 1900 + yy;
  }
  return null;
}

function propagateAll(records) {
  const now = new Date();
  const gmst = satellite.gstime(now);
  const results = [];

  for (const rec of records) {
    const { name, line1, line2, intlDesignator, countryCode, launchDate, launchSite, decayDate, rcsSize, tleEpoch, objectTypeRaw } = rec;
    try {
      const satrec = satellite.twoline2satrec(line1, line2);
      if (satrec.error !== 0) continue;
      const pv = satellite.propagate(satrec, now);
      if (!pv.position || typeof pv.position.x !== 'number') continue;
      const geo = satellite.eciToGeodetic(pv.position, gmst);
      const lat = satellite.degreesLat(geo.latitude);
      const lon = satellite.degreesLong(geo.longitude);
      const alt = geo.height;
      if (!isFinite(lat) || !isFinite(lon) || !isFinite(alt) || alt < 0 || alt > 100000) continue;

      // Orbital mechanics
      const n = satrec.no / 60; // rad/s
      const a = Math.cbrt(GM / (n * n));
      const e = satrec.ecco;
      const period = parseFloat(((2 * Math.PI / n) / 60).toFixed(1));
      const apogee = Math.round(a * (1 + e) - R_EARTH);
      const perigee = Math.round(a * (1 - e) - R_EARTH);
      const velocity = parseFloat(Math.sqrt(GM / a).toFixed(3));

      results.push({
        noradId: parseInt(satrec.satnum, 10),
        name,
        type: getTypeFromName(name),
        ...getConstellationAndOperator(name),
        altitude: Math.round(alt),
        inclination: parseFloat((satrec.inclo * 180 / Math.PI).toFixed(2)),
        orbitType: getOrbitType(satrec),
        launchYear: getLaunchYear(line1),
        lat: parseFloat(lat.toFixed(4)),
        lon: parseFloat(lon.toFixed(4)),
        riskLevel: null,
        // TLE lines for client-side propagation
        tle1: line1,
        tle2: line2,
        // Orbital mechanics
        period,
        apogee,
        perigee,
        velocity,
        // Space-Track metadata
        intlDesignator,
        countryCode,
        launchDate,
        launchSite,
        decayDate,
        rcsSize,
        tleEpoch,
        objectType: objectTypeRaw,
      });
    } catch { continue; }
  }
  return results;
}

export async function fetchRealSatellites() {
  // Use file cache if valid (24h TTL)
  if (isCacheValid()) {
    const cached = readCache();
    if (cached) {
      console.log(`[celestrak] serving from file cache (${cached.length} objects)`);
      return cached;
    }
  }

  const gp = `${ST_BASE}/basicspacedata/query/class/gp`;
  let starlinkJson, otherPayloadJson, debrisJson, rocketBodyJson;

  try {
    [starlinkJson, otherPayloadJson, debrisJson, rocketBodyJson] = await Promise.all([
      fetchGP(`${gp}/OBJECT_NAME/~~STARLINK/OBJECT_TYPE/PAYLOAD/orderby/EPOCH%20desc/limit/6000/format/json`),
      fetchGP(`${gp}/OBJECT_TYPE/PAYLOAD/orderby/EPOCH%20desc/limit/2000/format/json`),
      fetchGP(`${gp}/OBJECT_TYPE/DEBRIS/orderby/EPOCH%20desc/limit/1000/format/json`),
      fetchGP(`${gp}/OBJECT_TYPE/ROCKET%20BODY/orderby/EPOCH%20desc/limit/500/format/json`),
    ]);
  } catch (err) {
    console.warn('[celestrak] fetch failed, falling back to file cache:', err.message);
    const cached = readCache();
    if (cached) return cached;
    throw err;
  }

  // Deduplicate payloads
  const seen = new Set();
  const allPayloads = [];
  for (const r of [...starlinkJson, ...otherPayloadJson]) {
    if (!seen.has(r.GP_ID)) { seen.add(r.GP_ID); allPayloads.push(r); }
  }

  console.log(`[celestrak] starlink:${starlinkJson.length} payload:${otherPayloadJson.length} debris:${debrisJson.length} rockets:${rocketBodyJson.length} merged:${allPayloads.length}`);

  const records = [
    ...gpJsonToRecords(allPayloads),
    ...gpJsonToRecords(debrisJson),
    ...gpJsonToRecords(rocketBodyJson),
  ];

  const result = propagateAll(records);
  console.log(`[celestrak] propagated: ${result.length} objects`);
  writeCache(result);
  return result;
}
