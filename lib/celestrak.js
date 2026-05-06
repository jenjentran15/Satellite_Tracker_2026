import * as satellite from 'satellite.js';

const ST_BASE = 'https://www.space-track.org';
const ST_LOGIN = `${ST_BASE}/ajaxauth/login`;

// Cache session cookie to avoid logging in every request
let sessionCookie = null;
let sessionTime = 0;
const SESSION_TTL = 2 * 60 * 60 * 1000; // 2 hours

async function getSession() {
  if (sessionCookie && Date.now() - sessionTime < SESSION_TTL) return sessionCookie;

  const email = process.env.SPACETRACK_EMAIL;
  const password = process.env.SPACETRACK_PASSWORD;

  if (!email || !password) {
    throw new Error('SPACETRACK_EMAIL and SPACETRACK_PASSWORD must be set in .env.local');
  }

  const res = await fetch(ST_LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `identity=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
  });

  if (!res.ok) throw new Error(`Space-Track login failed: HTTP ${res.status}`);

  const cookie = res.headers.get('set-cookie');
  if (!cookie) throw new Error('Space-Track login returned no session cookie');

  sessionCookie = cookie.split(';')[0]; // e.g. "chocolatechip=abc123"
  sessionTime = Date.now();
  return sessionCookie;
}

async function fetchGP(url) {
  const cookie = await getSession();
  const res = await fetch(url, { headers: { Cookie: cookie } });
  if (!res.ok) {
    if (res.status === 401) sessionCookie = null;
    const body = await res.text().catch(() => '');
    throw new Error(`Space-Track query failed: HTTP ${res.status} — ${body.slice(0, 200)}`);
  }
  return res.json();
}

function gpJsonToTles(records) {
  return records
    .filter(r => r.TLE_LINE1 && r.TLE_LINE2)
    .map(r => ({ name: r.OBJECT_NAME ?? '', line1: r.TLE_LINE1, line2: r.TLE_LINE2 }));
}

function getTypeFromName(name) {
  const n = name.toUpperCase();
  if (n.includes(' DEB') || n.endsWith('DEB') || n.includes('DEBRIS')) return 'debris';
  if (n.includes('R/B') || n.includes('ROCKET BODY')) return 'rocket_body';
  return 'active';
}

function getOrbitType(satrec) {
  const n = satrec.no_kozai / 60; // rad/min → rad/s
  const a = Math.cbrt(398600.4418 / (n * n));
  const avgAlt = a - 6371;
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

function propagateAll(tleList) {
  const now = new Date();
  const gmst = satellite.gstime(now);
  const results = [];

  for (const { name, line1, line2 } of tleList) {
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
      });
    } catch {
      continue;
    }
  }

  return results;
}

export async function fetchRealSatellites() {
  const gp = `${ST_BASE}/basicspacedata/query/class/gp`;

  const [payloadJson, debrisJson] = await Promise.all([
    fetchGP(`${gp}/OBJECT_TYPE/PAYLOAD/orderby/NORAD_CAT_ID/limit/1500/format/json`),
    fetchGP(`${gp}/OBJECT_TYPE/DEBRIS/orderby/NORAD_CAT_ID/limit/500/format/json`),
  ]);

  console.log(`[celestrak] payload records: ${payloadJson.length}, debris records: ${debrisJson.length}`);

  // Log first record to inspect field names
  if (payloadJson.length > 0) {
    console.log('[celestrak] sample record keys:', Object.keys(payloadJson[0]));
    console.log('[celestrak] sample TLE_LINE1:', payloadJson[0].TLE_LINE1);
  }

  const tles = [
    ...gpJsonToTles(payloadJson),
    ...gpJsonToTles(debrisJson),
  ];

  console.log(`[celestrak] TLEs parsed: ${tles.length}`);

  return propagateAll(tles);
}
