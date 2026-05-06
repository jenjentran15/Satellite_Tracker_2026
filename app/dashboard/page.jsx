'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import NaturalQueryBar from '@/components/NaturalQueryBar/NaturalQueryBar';
import { applyQueryFilter, getHighlightColor } from '@/lib/satelliteFilter';
import styles from './dashboard.module.css';

const CONJUNCTIONS = [
  { id: 1, obj1: 'ISS', obj2: 'DEBRIS-2021-07', sep: '1.9 km', risk: 'high', tca: 'T+03:15', alt: '410 km' },
  { id: 2, obj1: 'STARLINK-3041', obj2: 'SL-24 R/B', sep: '4.7 km', risk: 'high', tca: 'T+06:22', alt: '548 km' },
  { id: 3, obj1: 'SENTINEL-6', obj2: 'COSMOS-1408', sep: '12.3 km', risk: 'medium', tca: 'T+11:40', alt: '1336 km' },
  { id: 4, obj1: 'TERRA', obj2: 'SL-16 DEB', sep: '28.9 km', risk: 'low', tca: 'T+18:05', alt: '705 km' },
];

export default function Dashboard() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const satPositionsRef = useRef([]);
  const stateRef = useRef({
    satellites: [], filtered: null, angle: 0, hoveredId: null,
    zoom: { level: 1, offX: 0, offY: 0, targetLevel: 1, targetOffX: 0, targetOffY: 0 },
  });
  const [queryMeta, setQueryMeta] = useState(null);
  const [selectedSat, setSelectedSat] = useState(null);
  const [tick, setTick] = useState(0);
  const [activeTab, setActiveTab] = useState('conjunctions');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // Clock
  useEffect(() => {
    const tick = () => {
      const el = document.getElementById('clock');
      if (el) {
        const now = new Date();
        el.textContent =
          now.getUTCHours().toString().padStart(2, '0') + ':' +
          now.getUTCMinutes().toString().padStart(2, '0') + ':' +
          now.getUTCSeconds().toString().padStart(2, '0') + ' UTC';
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Fetch real satellite data
  useEffect(() => {
    fetch('/api/satellites')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (data.error) throw new Error(data.error);
        stateRef.current.satellites = data;
        setIsLoading(false);
        setTick(t => t + 1);
      })
      .catch(err => {
        console.error('Failed to load satellites:', err);
        setLoadError(err.message);
        setIsLoading(false);
      });
  }, []);

  const handleQueryResult = useCallback((nlqResult) => {
    const filtered = applyQueryFilter(stateRef.current.satellites, nlqResult);
    stateRef.current.filtered = filtered;
    setQueryMeta({ summary: nlqResult.humanSummary, count: filtered.length, followUp: nlqResult.followUp });
    setTick(t => t + 1);
  }, []);

  const handleClear = useCallback(() => {
    stateRef.current.filtered = null;
    setQueryMeta(null);
    setTick(t => t + 1);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      const { satellites, filtered, angle, zoom } = stateRef.current;
      const w = canvas.width, h = canvas.height;
      const cx = w / 2, cy = h / 2;
      const R = Math.min(w, h) * 0.36;

      // lerp zoom
      zoom.level += (zoom.targetLevel - zoom.level) * 0.08;
      zoom.offX  += (zoom.targetOffX  - zoom.offX)  * 0.08;
      zoom.offY  += (zoom.targetOffY  - zoom.offY)  * 0.08;

      ctx.clearRect(0, 0, w, h);

      // deep space background
      ctx.fillStyle = '#020817';
      ctx.fillRect(0, 0, w, h);

      // stars (fixed, outside zoom transform)
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      for (let i = 0; i < 180; i++) {
        const sx = ((i * 137 + 11) % w);
        const sy = ((i * 97 + 53) % h);
        const sr = i % 7 === 0 ? 1.2 : 0.5;
        ctx.beginPath(); ctx.arc(sx, sy, sr, 0, Math.PI * 2); ctx.fill();
      }

      // apply zoom transform to globe content
      ctx.save();
      ctx.translate(cx + zoom.offX, cy + zoom.offY);
      ctx.scale(zoom.level, zoom.level);
      ctx.translate(-cx, -cy);

      // atmosphere glow
      const atmGrad = ctx.createRadialGradient(cx, cy, R * 0.95, cx, cy, R * 1.12);
      atmGrad.addColorStop(0, 'rgba(56,189,248,0.18)');
      atmGrad.addColorStop(1, 'rgba(56,189,248,0)');
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.12, 0, Math.PI * 2);
      ctx.fillStyle = atmGrad; ctx.fill();

      // globe
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = '#0c1a2e'; ctx.fill();
      ctx.strokeStyle = 'rgba(56,189,248,0.25)'; ctx.lineWidth = 1; ctx.stroke();

      // grid lines
      ctx.strokeStyle = 'rgba(56,189,248,0.08)'; ctx.lineWidth = 0.5;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let first = true;
        for (let lon = 0; lon <= 360; lon += 3) {
          const φ = lat * Math.PI / 180;
          const λ = (lon * Math.PI / 180) + angle;
          const z = Math.cos(φ) * Math.sin(λ);
          if (z < 0) { first = true; continue; }
          const px = cx + R * Math.cos(φ) * Math.cos(λ);
          const py = cy - R * Math.sin(φ);
          first ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          first = false;
        }
        ctx.stroke();
      }
      for (let lon = 0; lon < 360; lon += 30) {
        ctx.beginPath();
        let first = true;
        for (let lat = -80; lat <= 80; lat += 3) {
          const φ = lat * Math.PI / 180;
          const λ = (lon * Math.PI / 180) + angle;
          const z = Math.cos(φ) * Math.sin(λ);
          if (z < 0) { first = true; continue; }
          const px = cx + R * Math.cos(φ) * Math.cos(λ);
          const py = cy - R * Math.sin(φ);
          first ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          first = false;
        }
        ctx.stroke();
      }

      // loading indicator on globe
      if (satellites.length === 0) {
        ctx.fillStyle = 'rgba(56,189,248,0.7)';
        ctx.font = '13px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Loading real satellite data...', cx, cy);
        ctx.textAlign = 'left';
      }

      // satellites
      const displaySats = filtered || satellites;
      const framePositions = [];

      displaySats.forEach((sat) => {
        const φ = sat.lat * Math.PI / 180;
        const λ = (sat.lon * Math.PI / 180) + angle;
        const z = Math.cos(φ) * Math.sin(λ);
        if (z < -0.1) return;

        const altScale = 1 + (sat.altitude / 40000) * 0.45;
        const px = cx + R * altScale * Math.cos(φ) * Math.cos(λ);
        const py = cy - R * altScale * Math.sin(φ);
        const opacity = 0.4 + z * 0.6;

        let color;
        if (sat.riskLevel === 'high')              color = `rgba(239,68,68,${opacity})`;
        else if (sat.riskLevel === 'medium')        color = `rgba(245,158,11,${opacity})`;
        else if (sat.type === 'debris')             color = `rgba(148,163,184,${opacity * 0.5})`;
        else if (sat.constellation === 'Starlink')  color = `rgba(96,165,250,${opacity})`;
        else if (sat.constellation === 'GPS')       color = `rgba(52,211,153,${opacity})`;
        else if (sat.constellation === 'OneWeb')    color = `rgba(167,139,250,${opacity})`;
        else if (sat.constellation === 'Iridium')   color = `rgba(45,212,191,${opacity})`;
        else if (sat.constellation === 'Globalstar')color = `rgba(34,211,238,${opacity})`;
        else if (sat.constellation === 'BeiDou')    color = `rgba(251,191,36,${opacity})`;
        else if (sat.constellation === 'Galileo')   color = `rgba(251,146,60,${opacity})`;
        else if (sat.constellation === 'GLONASS')   color = `rgba(244,114,182,${opacity})`;
        else if (sat.operator === 'ISS Partners')   color = `rgba(186,230,253,${opacity})`;
        else if (sat.orbitType === 'GEO')           color = `rgba(234,179,8,${opacity})`;
        else if (sat.orbitType === 'MEO')           color = `rgba(74,222,128,${opacity})`;
        else                                        color = `rgba(148,163,184,${opacity * 0.55})`;

        const r = sat.riskLevel === 'high' ? 3.5 : sat.type === 'debris' ? 1.2 : 2.5;

        framePositions.push({ sat, px, py });

        if (sat.riskLevel === 'high') {
          ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(239,68,68,${opacity * 0.15})`; ctx.fill();
        }

        ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.fill();
      });

      satPositionsRef.current = framePositions;

      // orbit rings for high risk conjunctions
      if (!filtered) {
        CONJUNCTIONS.filter(c => c.risk === 'high').forEach((c, i) => {
          const orbitR = R * (1 + 0.08 + i * 0.04);
          ctx.beginPath();
          ctx.ellipse(cx, cy, orbitR, orbitR * 0.3, angle * 0.5, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(239,68,68,0.2)'; ctx.lineWidth = 1;
          ctx.setLineDash([4, 6]); ctx.stroke(); ctx.setLineDash([]);
        });
      }

      ctx.restore(); // end zoom transform

      stateRef.current.angle += 0.0008;
      animRef.current = requestAnimationFrame(draw);
    }

    function handleClick(e) {
      const rect = canvas.getBoundingClientRect();
      const clickX = (e.clientX - rect.left) * (canvas.width / rect.width);
      const clickY = (e.clientY - rect.top) * (canvas.height / rect.height);
      const { zoom } = stateRef.current;
      const cxc = canvas.width / 2, cyc = canvas.height / 2;

      let nearest = null, minDist = 12;
      for (const { sat, px, py } of satPositionsRef.current) {
        const sx = (px - cxc) * zoom.level + cxc + zoom.offX;
        const sy = (py - cyc) * zoom.level + cyc + zoom.offY;
        const d = Math.hypot(clickX - sx, clickY - sy);
        if (d < minDist) { minDist = d; nearest = { sat, px, py }; }
      }

      if (nearest) {
        setSelectedSat(nearest.sat);
        zoom.targetLevel = 2.2;
        zoom.targetOffX = (cxc - nearest.px) * 2.2;
        zoom.targetOffY = (cyc - nearest.py) * 2.2;
      } else {
        zoom.targetLevel = 1;
        zoom.targetOffX = 0;
        zoom.targetOffY = 0;
      }
    }

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
      const my = (e.clientY - rect.top) * (canvas.height / rect.height);
      const { zoom } = stateRef.current;
      const cxc = canvas.width / 2, cyc = canvas.height / 2;

      const near = satPositionsRef.current.some(({ px, py }) => {
        const sx = (px - cxc) * zoom.level + cxc + zoom.offX;
        const sy = (py - cyc) * zoom.level + cyc + zoom.offY;
        return Math.hypot(mx - sx, my - sy) < 12;
      });
      canvas.style.cursor = near ? 'pointer' : 'default';
    }

    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('mousemove', handleMouseMove);

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const highCount = CONJUNCTIONS.filter(c => c.risk === 'high').length;
  const totalTracked = queryMeta ? queryMeta.count : stateRef.current.satellites.length;
  const displaySats = stateRef.current.filtered || stateRef.current.satellites;

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logo}>
            <span className={styles.logoMark} />
            <span className={styles.logoText}>ORBIT<span className={styles.logoAccent}>WATCH</span></span>
          </div>
          <div className={styles.liveChip}>
            <span className={styles.liveDot} />
            {isLoading ? 'LOADING' : 'LIVE'}
          </div>
        </div>

        <div className={styles.headerCenter}>
          <NaturalQueryBar onResult={handleQueryResult} onClear={handleClear} />
        </div>

        <div className={styles.headerRight}>
          <div className={styles.statChip}>
            <span className={styles.statVal}>{totalTracked.toLocaleString()}</span>
            <span className={styles.statLabel}>tracked</span>
          </div>
          <div className={styles.statChip} style={{ '--chip-accent': '#ef4444' }}>
            <span className={styles.statVal} style={{ color: '#ef4444' }}>{highCount}</span>
            <span className={styles.statLabel}>high risk</span>
          </div>
          <div className={styles.clock} id="clock">--:-- UTC</div>
        </div>
      </header>

      {queryMeta && (
        <div className={styles.queryBanner}>
          <span className={styles.queryBannerText}>
            Showing {queryMeta.count.toLocaleString()} satellites — {queryMeta.summary}
          </span>
          {queryMeta.followUp && (
            <button className={styles.followUpBtn} onClick={() => {}}>
              Try: "{queryMeta.followUp}" →
            </button>
          )}
        </div>
      )}

      {loadError && (
        <div className={styles.queryBanner} style={{ background: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.3)' }}>
          <span className={styles.queryBannerText} style={{ color: '#ef4444' }}>
            Failed to load satellite data: {loadError}
          </span>
        </div>
      )}

      <main className={styles.main}>
        <div className={styles.globePanel}>
          <canvas ref={canvasRef} className={styles.globe} />
          <div className={styles.globeLegend}>
            <span className={styles.legendItem}><span style={{ background: '#60a5fa' }} className={styles.legendDot} />Starlink</span>
            <span className={styles.legendItem}><span style={{ background: '#34d399' }} className={styles.legendDot} />GPS</span>
            <span className={styles.legendItem}><span style={{ background: '#a78bfa' }} className={styles.legendDot} />OneWeb</span>
            <span className={styles.legendItem}><span style={{ background: '#2dd4bf' }} className={styles.legendDot} />Iridium</span>
            <span className={styles.legendItem}><span style={{ background: '#fbbf24' }} className={styles.legendDot} />BeiDou</span>
            <span className={styles.legendItem}><span style={{ background: '#fb923c' }} className={styles.legendDot} />Galileo</span>
            <span className={styles.legendItem}><span style={{ background: '#f472b4' }} className={styles.legendDot} />GLONASS</span>
            <span className={styles.legendItem}><span style={{ background: '#eab308' }} className={styles.legendDot} />GEO</span>
            <span className={styles.legendItem}><span style={{ background: '#4ade80' }} className={styles.legendDot} />MEO</span>
            <span className={styles.legendItem}><span style={{ background: '#f59e0b' }} className={styles.legendDot} />Medium risk</span>
            <span className={styles.legendItem}><span style={{ background: '#ef4444' }} className={styles.legendDot} />High risk</span>
            <span className={styles.legendItem}><span style={{ background: '#94a3b8', opacity: 0.5 }} className={styles.legendDot} />Debris</span>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.tabs}>
            {['conjunctions', 'satellites', 'heatmap'].map(tab => (
              <button key={tab} className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`} onClick={() => setActiveTab(tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === 'conjunctions' && (
            <div className={styles.tabContent}>
              <div className={styles.sectionLabel}>Active conjunction alerts</div>
              {CONJUNCTIONS.map(c => (
                <div key={c.id} className={styles.conjCard} onClick={() => setSelectedSat(c)}>
                  <div className={styles.conjHeader}>
                    <span className={`${styles.riskBadge} ${styles['risk_' + c.risk]}`}>{c.risk.toUpperCase()}</span>
                    <span className={styles.conjTca}>{c.tca}</span>
                  </div>
                  <div className={styles.conjObjects}>{c.obj1} <span className={styles.conjSlash}>/</span> {c.obj2}</div>
                  <div className={styles.conjMeta}>
                    <span>{c.sep} separation</span>
                    <span>{c.alt}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'satellites' && (
            <div className={styles.tabContent}>
              <div className={styles.sectionLabel}>
                {isLoading ? 'Loading...' : queryMeta ? `${queryMeta.count} results` : `${displaySats.length.toLocaleString()} objects`}
              </div>
              {displaySats.slice(0, 12).map(sat => (
                <div key={sat.noradId} className={styles.satRow} onClick={() => setSelectedSat(sat)}>
                  <div className={styles.satDot} style={{
                    background: sat.riskLevel === 'high' ? '#ef4444' : sat.riskLevel === 'medium' ? '#f59e0b' : sat.type === 'debris' ? '#475569' : '#60a5fa'
                  }} />
                  <div className={styles.satInfo}>
                    <div className={styles.satName}>{sat.name}</div>
                    <div className={styles.satMeta}>{sat.orbitType} · {Math.round(sat.altitude)} km · {sat.type}</div>
                  </div>
                  {sat.riskLevel && <span className={`${styles.riskBadge} ${styles['risk_' + sat.riskLevel]}`}>{sat.riskLevel}</span>}
                </div>
              ))}
              {displaySats.length > 12 && (
                <div className={styles.moreCount}>+{displaySats.length - 12} more objects</div>
              )}
            </div>
          )}

          {activeTab === 'heatmap' && (
            <div className={styles.tabContent}>
              <div className={styles.sectionLabel}>LEO congestion by altitude band</div>
              <div className={styles.heatmapWrap}>
                {Array.from({ length: 36 }, (_, i) => {
                  const density = [1,2,3,5,7,9,8,7,6,8,5,3,2,3,4,6,8,10,9,8,7,9,6,4,3,4,5,7,9,10,10,9,8,10,7,5][i];
                  const norm = density / 10;
                  const r = Math.round(34 + norm * 200);
                  const g = Math.round(160 - norm * 140);
                  const b = Math.round(200 - norm * 180);
                  return (
                    <div key={i} className={styles.hmCell} style={{ background: `rgb(${r},${g},${b})`, opacity: 0.4 + norm * 0.6 }}
                      title={`${300 + i * 47} km — density ${Math.round(norm * 100)}%`} />
                  );
                })}
              </div>
              <div className={styles.hmLabels}><span>300 km</span><span>Low → High</span><span>2000 km</span></div>
              <div className={styles.sectionLabel} style={{ marginTop: 16 }}>Orbit type breakdown</div>
              {[['LEO', 68, '#60a5fa'], ['MEO', 14, '#34d399'], ['GEO', 12, '#f59e0b'], ['HEO', 6, '#c084fc']].map(([label, pct, color]) => (
                <div key={label} className={styles.barRow}>
                  <span className={styles.barLabel}>{label}</span>
                  <div className={styles.barTrack}><div className={styles.barFill} style={{ width: `${pct}%`, background: color }} /></div>
                  <span className={styles.barPct}>{pct}%</span>
                </div>
              ))}
            </div>
          )}
        </aside>
      </main>

      {selectedSat && (
        <div className={styles.detailDrawer}>
          <div className={styles.drawerHeader}>
            <span className={styles.drawerTitle}>{selectedSat.name || `${selectedSat.obj1} / ${selectedSat.obj2}`}</span>
            <button className={styles.drawerClose} onClick={() => setSelectedSat(null)}>✕</button>
          </div>
          <div className={styles.drawerGrid}>
            {selectedSat.altitude && <>
              <div className={styles.drawerRow}><span>Altitude</span><span>{Math.round(selectedSat.altitude)} km</span></div>
              <div className={styles.drawerRow}><span>Orbit type</span><span>{selectedSat.orbitType}</span></div>
              <div className={styles.drawerRow}><span>Type</span><span>{selectedSat.type}</span></div>
              <div className={styles.drawerRow}><span>Operator</span><span>{selectedSat.operator}</span></div>
              <div className={styles.drawerRow}><span>Launch year</span><span>{selectedSat.launchYear}</span></div>
              <div className={styles.drawerRow}><span>NORAD ID</span><span>{selectedSat.noradId}</span></div>
            </>}
            {selectedSat.sep && <>
              <div className={styles.drawerRow}><span>Separation</span><span>{selectedSat.sep}</span></div>
              <div className={styles.drawerRow}><span>Time of CA</span><span>{selectedSat.tca}</span></div>
              <div className={styles.drawerRow}><span>Altitude</span><span>{selectedSat.alt}</span></div>
              <div className={styles.drawerRow}><span>Risk level</span><span style={{ color: selectedSat.risk === 'high' ? '#ef4444' : selectedSat.risk === 'medium' ? '#f59e0b' : '#22c55e' }}>{selectedSat.risk.toUpperCase()}</span></div>
            </>}
          </div>
        </div>
      )}
    </div>
  );
}
