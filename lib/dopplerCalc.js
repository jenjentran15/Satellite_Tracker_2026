'use client';
import * as satellite from 'satellite.js';

const C = 299792.458;

export function computeDoppler(sat, obsLat, obsLon, freqMHz) {
  if (!sat.tle1 || !sat.tle2 || !freqMHz) return null;
  try {
    const satrec = satellite.twoline2satrec(sat.tle1, sat.tle2);
    const obsGd = { longitude: satellite.degreesToRadians(obsLon), latitude: satellite.degreesToRadians(obsLat), height: 0.01 };
    const now = new Date();
    const gmst = satellite.gstime(now);
    const pv = satellite.propagate(satrec, now);
    if (!pv?.position) return null;
    const satEcf = satellite.eciToEcf(pv.position, gmst);
    const look = satellite.ecfToLookAngles(obsGd, satEcf);
    const el = look.elevation * 180 / Math.PI;

    const now2 = new Date(now.getTime() + 1000);
    const gmst2 = satellite.gstime(now2);
    const pv2 = satellite.propagate(satrec, now2);
    if (!pv2?.position) return null;
    const satEcf2 = satellite.eciToEcf(pv2.position, gmst2);
    const look2 = satellite.ecfToLookAngles(obsGd, satEcf2);

    const rangeRate = look2.rangeSat - look.rangeSat;
    const correctedMHz = freqMHz * (C - rangeRate) / C;
    const offsetKHz = (correctedMHz - freqMHz) * 1000;

    return {
      correctedMHz: parseFloat(correctedMHz.toFixed(6)),
      offsetKHz: parseFloat(offsetKHz.toFixed(3)),
      rangeRateKmS: parseFloat(rangeRate.toFixed(3)),
      elevation: parseFloat(el.toFixed(1)),
    };
  } catch { return null; }
}
