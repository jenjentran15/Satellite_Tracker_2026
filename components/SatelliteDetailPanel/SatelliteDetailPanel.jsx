'use client';
import { useState, useEffect, useRef } from 'react';
import * as satellite from 'satellite.js';
import { predictPasses, formatAz } from '@/lib/passPredictor';
import { computeDoppler } from '@/lib/dopplerCalc';
import styles from './SatelliteDetailPanel.module.css';

const GM = 398600.4418;

function flagEmoji(code) {
  if (!code || code.length < 2) return '';
  try {
    return [...code.toUpperCase().slice(0, 2)]
      .map(c => String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65))
      .join('');
  } catch { return ''; }
}

function tleAgeBadge(epochStr) {
  if (!epochStr) return { label: 'Unknown', color: '#475569' };
  const ageH = (Date.now() - new Date(epochStr).getTime()) / 3600000;
  if (ageH < 24) return { label: `${Math.round(ageH)}h ago`, color: '#22c55e' };
  if (ageH < 72) return { label: `${Math.round(ageH / 24)}d ago`, color: '#f59e0b' };
  return { label: `${Math.round(ageH / 24)}d ago`, color: '#ef4444' };
}

function formatDuration(s) {
  const m = Math.floor(s / 60), sec = s % 60;
  return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
}

function CompassSVG({ riseAz, peakAz, setAz, peakEl }) {
  const toXY = (az, r = 32) => {
    const rad = (az - 90) * Math.PI / 180;
    return { x: 40 + r * Math.cos(rad), y: 40 + r * Math.sin(rad) };
  };
  const rise = toXY(riseAz);
  const set = toXY(setAz);
  const peak = toXY(peakAz, 32 - (peakEl / 90) * 20);
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" className={styles.compass}>
      <circle cx="40" cy="40" r="35" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <circle cx="40" cy="40" r="1.5" fill="rgba(255,255,255,0.3)" />
      {['N','E','S','W'].map((d, i) => {
        const az = i * 90;
        const p = toXY(az, 38);
        return <text key={d} x={p.x} y={p.y} fill="rgba(255,255,255,0.3)" fontSize="8" textAnchor="middle" dominantBaseline="middle">{d}</text>;
      })}
      <line x1={rise.x} y1={rise.y} x2={peak.x} y2={peak.y} stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3,2" />
      <line x1={peak.x} y1={peak.y} x2={set.x} y2={set.y} stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3,2" />
      <circle cx={rise.x} cy={rise.y} r="3" fill="#38bdf8" />
      <circle cx={peak.x} cy={peak.y} r="4" fill="#22c55e" />
      <circle cx={set.x} cy={set.y} r="3" fill="#f59e0b" />
    </svg>
  );
}

export default function SatelliteDetailPanel({ sat, onClose, userLocation }) {
  const [tab, setTab] = useState('orbital');
  const [livePos, setLivePos] = useState({ lat: sat.lat, lon: sat.lon, alt: sat.altitude });
  const [passes, setPasses] = useState([]);
  const [passesLoading, setPassesLoading] = useState(false);
  const [uplinkMHz, setUplinkMHz] = useState('');
  const [downlinkMHz, setDownlinkMHz] = useState('');
  const [dopplerResult, setDopplerResult] = useState(null);
  const dopplerRef = useRef(null);

  // Live position update every 2s
  useEffect(() => {
    if (!sat.tle1 || !sat.tle2) return;
    const satrec = satellite.twoline2satrec(sat.tle1, sat.tle2);
    const tick = () => {
      const now = new Date();
      const gmst = satellite.gstime(now);
      const pv = satellite.propagate(satrec, now);
      if (!pv?.position) return;
      const geo = satellite.eciToGeodetic(pv.position, gmst);
      setLivePos({
        lat: parseFloat(satellite.degreesLat(geo.latitude).toFixed(4)),
        lon: parseFloat(satellite.degreesLong(geo.longitude).toFixed(4)),
        alt: Math.round(geo.height),
      });
    };
    tick();
    const id = setInterval(tick, 2000);
    return () => clearInterval(id);
  }, [sat.noradId, sat.tle1, sat.tle2]);

  // Compute passes when tab opens and location available
  useEffect(() => {
    if (tab !== 'passes' || !userLocation || !sat.tle1) return;
    setPassesLoading(true);
    setPasses([]);
    setTimeout(() => {
      const result = predictPasses(sat, userLocation.lat, userLocation.lon);
      setPasses(result);
      setPassesLoading(false);
    }, 0);
  }, [tab, sat.noradId, userLocation]);

  // Doppler update
  useEffect(() => {
    if (dopplerRef.current) clearInterval(dopplerRef.current);
    if (!userLocation) return;
    const freq = parseFloat(downlinkMHz) || parseFloat(uplinkMHz);
    if (!freq) return;
    const tick = () => setDopplerResult(computeDoppler(sat, userLocation.lat, userLocation.lon, freq));
    tick();
    dopplerRef.current = setInterval(tick, 1000);
    return () => clearInterval(dopplerRef.current);
  }, [uplinkMHz, downlinkMHz, userLocation, sat.noradId]);

  const tabs = [
    { id: 'orbital', label: 'Orbital' },
    { id: 'identity', label: 'Identity' },
    { id: 'launch', label: 'Launch' },
    { id: 'status', label: 'Status' },
    { id: 'passes', label: 'Passes' },
  ];

  const ageBadge = tleAgeBadge(sat.tleEpoch);

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.title}>{sat.name}</span>
        <div className={styles.headerRight}>
          <span className={styles.norad}>#{sat.noradId}</span>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
      </div>

      <div className={styles.tabs}>
        {tabs.map(t => (
          <button
            key={t.id}
            className={`${styles.tab} ${tab === t.id ? styles.tabActive : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={styles.body}>
        {tab === 'orbital' && (
          <div className={styles.grid}>
            <div className={styles.row}><span>Latitude</span><span>{livePos.lat.toFixed(4)}°</span></div>
            <div className={styles.row}><span>Longitude</span><span>{livePos.lon.toFixed(4)}°</span></div>
            <div className={styles.row}><span>Altitude</span><span>{livePos.alt} km</span></div>
            <div className={styles.row}><span>Orbital period</span><span>{sat.period} min</span></div>
            <div className={styles.row}><span>Velocity</span><span>{sat.velocity} km/s</span></div>
            <div className={styles.row}><span>Inclination</span><span>{sat.inclination}°</span></div>
            <div className={styles.row}><span>Apogee</span><span>{sat.apogee} km</span></div>
            <div className={styles.row}><span>Perigee</span><span>{sat.perigee} km</span></div>
            <div className={styles.row}><span>Orbit type</span><span>{sat.orbitType}</span></div>
          </div>
        )}

        {tab === 'identity' && (
          <div className={styles.grid}>
            <div className={styles.row}><span>NORAD ID</span><span>{sat.noradId}</span></div>
            <div className={styles.row}><span>Name</span><span>{sat.name}</span></div>
            <div className={styles.row}><span>Intl Designator</span><span>{sat.intlDesignator || '—'}</span></div>
            <div className={styles.row}>
              <span>Country</span>
              <span>{flagEmoji(sat.countryCode)} {sat.countryCode || '—'}</span>
            </div>
            <div className={styles.row}><span>Operator</span><span>{sat.operator}</span></div>
            <div className={styles.row}><span>Constellation</span><span>{sat.constellation || '—'}</span></div>
            <div className={styles.row}><span>Object type</span><span>{sat.objectType || sat.type}</span></div>
          </div>
        )}

        {tab === 'launch' && (
          <div className={styles.grid}>
            <div className={styles.row}><span>Launch date</span><span>{sat.launchDate || '—'}</span></div>
            <div className={styles.row}><span>Launch site</span><span>{sat.launchSite || '—'}</span></div>
            <div className={styles.row}><span>Launch year</span><span>{sat.launchYear || '—'}</span></div>
            <div className={styles.row}><span>Intl Designator</span><span>{sat.intlDesignator || '—'}</span></div>
          </div>
        )}

        {tab === 'status' && (
          <>
            <div className={styles.grid}>
              <div className={styles.row}><span>Status</span><span style={{ color: sat.type === 'active' ? '#22c55e' : '#94a3b8' }}>{sat.type?.toUpperCase()}</span></div>
              <div className={styles.row}><span>Decay date</span><span>{sat.decayDate || 'Not predicted'}</span></div>
              <div className={styles.row}><span>Radar cross-section</span><span>{sat.rcsSize || '—'}</span></div>
              <div className={styles.row}>
                <span>TLE age</span>
                <span style={{ color: ageBadge.color }}>{ageBadge.label}</span>
              </div>
              <div className={styles.row}><span>TLE epoch</span><span>{sat.tleEpoch ? sat.tleEpoch.substring(0, 16) : '—'}</span></div>
            </div>

            <div className={styles.hamSection}>
              <div className={styles.hamTitle}>Ham Radio / Doppler</div>
              {!userLocation && <div className={styles.hamHint}>Enable location for Doppler calculations</div>}
              <div className={styles.hamInputs}>
                <label className={styles.hamLabel}>
                  Uplink (MHz)
                  <input className={styles.hamInput} type="number" step="0.001" placeholder="145.800"
                    value={uplinkMHz} onChange={e => setUplinkMHz(e.target.value)} />
                </label>
                <label className={styles.hamLabel}>
                  Downlink (MHz)
                  <input className={styles.hamInput} type="number" step="0.001" placeholder="437.550"
                    value={downlinkMHz} onChange={e => setDownlinkMHz(e.target.value)} />
                </label>
              </div>
              {dopplerResult && (
                <div className={styles.dopplerResult}>
                  <div className={styles.dopplerRow}>
                    <span>Corrected</span>
                    <span style={{ color: '#38bdf8' }}>{dopplerResult.correctedMHz} MHz</span>
                  </div>
                  <div className={styles.dopplerRow}>
                    <span>Offset</span>
                    <span style={{ color: dopplerResult.offsetKHz > 0 ? '#22c55e' : '#ef4444' }}>
                      {dopplerResult.offsetKHz > 0 ? '+' : ''}{dopplerResult.offsetKHz} kHz
                    </span>
                  </div>
                  <div className={styles.dopplerRow}>
                    <span>Range rate</span>
                    <span>{dopplerResult.rangeRateKmS} km/s</span>
                  </div>
                  <div className={styles.dopplerRow}>
                    <span>Elevation</span>
                    <span style={{ color: dopplerResult.elevation > 0 ? '#22c55e' : '#ef4444' }}>
                      {dopplerResult.elevation > 0 ? `+${dopplerResult.elevation}°` : `${dopplerResult.elevation}° (below horizon)`}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {tab === 'passes' && (
          <div className={styles.passesTab}>
            {!userLocation && (
              <div className={styles.passHint}>Enable &quot;Use my location&quot; to see pass predictions</div>
            )}
            {userLocation && passesLoading && (
              <div className={styles.passLoading}>Computing passes…</div>
            )}
            {userLocation && !passesLoading && passes.length === 0 && (
              <div className={styles.passHint}>No passes found in next 48 hours</div>
            )}
            {passes.map((p, i) => (
              <div key={i} className={styles.passCard}>
                <div className={styles.passHeader}>
                  <span className={styles.passNum}>Pass {i + 1}</span>
                  {p.nakedEye && <span className={styles.nakedEye}>★ Naked eye</span>}
                  <span className={styles.passDur}>{formatDuration(p.duration)}</span>
                </div>
                <div className={styles.passBody}>
                  <CompassSVG riseAz={p.riseAz} peakAz={p.peakAz} setAz={p.setAz} peakEl={p.peakEl} />
                  <div className={styles.passData}>
                    <div className={styles.passRow}>
                      <span className={styles.passLabel}>Rise</span>
                      <span>{p.rise.toUTCString().substring(17, 25)} UTC</span>
                      <span className={styles.passAz}>{formatAz(p.riseAz)}</span>
                    </div>
                    <div className={styles.passRow}>
                      <span className={styles.passLabel}>Peak</span>
                      <span>{p.peak.toUTCString().substring(17, 25)} UTC</span>
                      <span className={styles.passAz}>{formatAz(p.peakAz)} · +{p.peakEl}°</span>
                    </div>
                    <div className={styles.passRow}>
                      <span className={styles.passLabel}>Set</span>
                      <span>{p.set.toUTCString().substring(17, 25)} UTC</span>
                      <span className={styles.passAz}>{formatAz(p.setAz)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
