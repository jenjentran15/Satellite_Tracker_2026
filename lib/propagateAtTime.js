'use client';
import * as satellite from 'satellite.js';

const satrec_cache = new Map();

export function initSatrecCache(satellites) {
  satrec_cache.clear();
  for (const sat of satellites) {
    if (!sat.tle1 || !sat.tle2) continue;
    try {
      const rec = satellite.twoline2satrec(sat.tle1, sat.tle2);
      if (rec.error === 0) satrec_cache.set(sat.noradId, rec);
    } catch {}
  }
}

export function propagateAllAtTime(satellites, targetDate) {
  const gmst = satellite.gstime(targetDate);
  return satellites.map(sat => {
    const rec = satrec_cache.get(sat.noradId);
    if (!rec) return sat;
    try {
      const pv = satellite.propagate(rec, targetDate);
      if (!pv.position || typeof pv.position.x !== 'number') return sat;
      const geo = satellite.eciToGeodetic(pv.position, gmst);
      const lat = satellite.degreesLat(geo.latitude);
      const lon = satellite.degreesLong(geo.longitude);
      const alt = geo.height;
      if (!isFinite(lat) || !isFinite(lon) || !isFinite(alt)) return sat;
      return { ...sat, lat: parseFloat(lat.toFixed(4)), lon: parseFloat(lon.toFixed(4)), altitude: Math.round(alt) };
    } catch { return sat; }
  });
}

export function propagateOrbitArc(sat, targetDate, steps = 90) {
  const rec = satrec_cache.get(sat.noradId);
  if (!rec) return [];
  const periodMs = (sat.period || 90) * 60000;
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const d = new Date(targetDate.getTime() + (i / steps) * periodMs);
    try {
      const gmst = satellite.gstime(d);
      const pv = satellite.propagate(rec, d);
      if (!pv.position) continue;
      const geo = satellite.eciToGeodetic(pv.position, gmst);
      points.push({ lat: satellite.degreesLat(geo.latitude), lon: satellite.degreesLong(geo.longitude) });
    } catch {}
  }
  return points;
}
