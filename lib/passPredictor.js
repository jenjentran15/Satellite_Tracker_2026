'use client';
import * as satellite from 'satellite.js';

function azToCompass(deg) {
  const d = ((deg % 360) + 360) % 360;
  return ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'][Math.round(d / 22.5) % 16];
}

export function formatAz(deg) {
  const d = Math.round(((deg % 360) + 360) % 360);
  return `${d.toString().padStart(3, '0')}° ${azToCompass(d)}`;
}

export function predictPasses(sat, obsLat, obsLon, maxPasses = 10, maxHours = 48) {
  if (!sat.tle1 || !sat.tle2) return [];
  try {
    const satrec = satellite.twoline2satrec(sat.tle1, sat.tle2);
    const obsGd = {
      longitude: satellite.degreesToRadians(obsLon),
      latitude: satellite.degreesToRadians(obsLat),
      height: 0.01,
    };
    const passes = [];
    const stepMs = 10000;
    const now = Date.now();
    const end = now + maxHours * 3600000;
    let inPass = false;
    let passData = null;

    for (let t = now; t < end && passes.length < maxPasses; t += stepMs) {
      const d = new Date(t);
      const gmst = satellite.gstime(d);
      const pv = satellite.propagate(satrec, d);
      if (!pv?.position) continue;
      const satEcf = satellite.eciToEcf(pv.position, gmst);
      const look = satellite.ecfToLookAngles(obsGd, satEcf);
      const el = look.elevation * 180 / Math.PI;
      const az = ((look.azimuth * 180 / Math.PI) + 360) % 360;

      if (!inPass && el > 0) {
        inPass = true;
        passData = { rise: new Date(t), riseAz: az, maxEl: el, maxElAz: az, maxElTime: new Date(t), setAz: az, set: new Date(t) };
      } else if (inPass && el > 0) {
        if (el > passData.maxEl) { passData.maxEl = el; passData.maxElAz = az; passData.maxElTime = new Date(t); }
        passData.setAz = az;
        passData.set = new Date(t);
      } else if (inPass && el <= 0) {
        inPass = false;
        const dur = (passData.set.getTime() - passData.rise.getTime()) / 1000;
        if (dur > 30) {
          passes.push({
            rise: passData.rise,
            riseAz: passData.riseAz,
            peak: passData.maxElTime,
            peakEl: parseFloat(passData.maxEl.toFixed(1)),
            peakAz: passData.maxElAz,
            set: passData.set,
            setAz: passData.setAz,
            duration: Math.round(dur),
            nakedEye: passData.maxEl > 10,
          });
        }
        t += 300000;
      }
    }
    return passes;
  } catch { return []; }
}
