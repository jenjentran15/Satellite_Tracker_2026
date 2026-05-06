'use client';

import { useRef, useEffect, useState } from 'react';
import { useNaturalQuery } from '@/hooks/useNaturalQuery';
import styles from './NaturalQueryBar.module.css';

const CATEGORY_MAP = {
  SPACE_STATIONS: {
    label: 'Space Stations',
    icon: '🛰️',
    constellations: [
      { label: 'ISS (International Space Station)', query: 'Where is the ISS right now?', group: 'stations' },
      { label: 'Tiangong (CSS)', query: 'Show Tiangong space station', group: 'stations' },
      { label: 'All Space Stations', query: 'Show all space stations', group: 'stations' },
    ],
  },
  COMMUNICATIONS: {
    label: 'Communications',
    icon: '📡',
    constellations: [
      { label: 'Starlink', query: 'Show all Starlink satellites', group: 'starlink' },
      { label: 'OneWeb', query: 'Show OneWeb constellation', group: 'oneweb' },
      { label: 'Kuiper', query: 'Show Amazon Kuiper satellites', group: 'kuiper' },
      { label: 'Iridium NEXT', query: 'Show Iridium NEXT satellites', group: 'iridium-NEXT' },
      { label: 'Intelsat', query: 'Show Intelsat GEO satellites', group: 'intelsat' },
      { label: 'SES', query: 'Show SES satellites', group: 'ses' },
      { label: 'Globalstar', query: 'Show Globalstar constellation', group: 'globalstar' },
      { label: 'Orbcomm', query: 'Show Orbcomm satellites', group: 'orbcomm' },
    ],
  },
  NAVIGATION: {
    label: 'Navigation',
    icon: '🧭',
    constellations: [
      { label: 'GPS (USA)', query: 'Show GPS constellation', group: 'gps-ops' },
      { label: 'GLONASS (Russia)', query: 'Show GLONASS constellation', group: 'glo-ops' },
      { label: 'Galileo (EU)', query: 'Show Galileo constellation', group: 'galileo' },
      { label: 'BeiDou (China)', query: 'Show BeiDou constellation', group: 'beidou' },
      { label: 'All GNSS', query: 'Show all navigation satellites', group: 'gnss' },
    ],
  },
  WEATHER_EARTH_OBS: {
    label: 'Weather & Earth Obs',
    icon: '🌍',
    constellations: [
      { label: 'Weather Satellites', query: 'Show all weather satellites', group: 'weather' },
      { label: 'NOAA', query: 'Show NOAA satellites', group: 'weather' },
      { label: 'GOES', query: 'Show GOES weather satellites', group: 'weather' },
      { label: 'Planet Labs', query: 'Show Planet Labs earth observation', group: 'planet' },
      { label: 'Spire', query: 'Show Spire satellites', group: 'spire' },
      { label: 'Earth Resources', query: 'Show earth resource satellites', group: 'resource' },
      { label: 'Search & Rescue (SARSAT)', query: 'Show search and rescue satellites', group: 'sarsat' },
    ],
  },
  SCIENTIFIC: {
    label: 'Scientific',
    icon: '🔭',
    constellations: [
      { label: 'Hubble Space Telescope', query: 'Where is Hubble right now?', group: 'science' },
      { label: 'CubeSats', query: 'Show CubeSats in LEO', group: 'cubesat' },
      { label: 'Space & Earth Science', query: 'Show science satellites', group: 'science' },
      { label: 'Amateur Radio', query: 'Show amateur radio satellites', group: 'amateur' },
      { label: 'Education Satellites', query: 'Show education satellites', group: 'education' },
    ],
  },
};

const QUICK_SUGGESTIONS = [
  'Show me all Starlink satellites',
  'Where is the ISS right now?',
  'GPS constellation',
  'Hubble Space Telescope',
  'Weather satellites over Pacific',
  'Show BeiDou navigation satellites',
];

export default function NaturalQueryBar({ onResult, onClear }) {
  const { query, setQuery, result, loading, error, history, submit, clear } = useNaturalQuery();
  const [focused, setFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [mode, setMode] = useState('search');
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (result) {
      onResult?.(result);
      setShowDropdown(false);
    }
  }, [result, onResult]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
        setFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleKey(e) {
    if (e.key === 'Enter') submit();
    if (e.key === 'Escape') { clear(); onClear?.(); setShowDropdown(false); }
  }

  function handleSuggestion(q) {
    setQuery(q);
    submit(q);
    setShowDropdown(false);
  }

  function handleConstellationClick(item) {
    setQuery(item.query);
    submit(item.query);
    setShowDropdown(false);
    setActiveCategory(null);
  }

  function handleFocus() {
    setFocused(true);
    setShowDropdown(true);
    setMode('search');
  }

  function toggleBrowse() {
    setMode(m => m === 'browse' ? 'search' : 'browse');
    setShowDropdown(true);
    setActiveCategory(null);
    inputRef.current?.focus();
  }

  const filteredSuggestions = query.length > 1
    ? QUICK_SUGGESTIONS.filter(s => s.toLowerCase().includes(query.toLowerCase()))
    : QUICK_SUGGESTIONS;

  const categoryKeys = Object.keys(CATEGORY_MAP);

  const barClass = [
    styles.bar,
    focused ? styles.focused : '',
    loading ? styles.loading : '',
  ].filter(Boolean).join(' ');

  return (
    <div ref={wrapperRef} className={styles.wrapper}>

      {/* ── Main bar ── */}
      <div className={barClass}>

        <div className={styles.icon}>
          {loading ? (
            <span className={styles.spinner} />
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 10L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </div>

        <input
          ref={inputRef}
          className={styles.input}
          value={query}
          onChange={e => { setQuery(e.target.value); setMode('search'); setShowDropdown(true); }}
          onFocus={handleFocus}
          onKeyDown={handleKey}
          placeholder="Ask anything — 'show Starlink over Europe' or 'GPS constellation'..."
          autoComplete="off"
          spellCheck={false}
        />

        <div className={styles.actions}>
          {result && !loading && (
            <span className={styles.resultPill}>{result.humanSummary}</span>
          )}

          {query && (
            <button className={styles.clearBtn} onClick={() => { clear(); onClear?.(); setShowDropdown(false); }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          )}

          <button
            className={`${styles.browseBtn} ${mode === 'browse' ? styles.browseBtnActive : ''}`}
            onClick={toggleBrowse}
            title="Browse categories"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
              <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
              <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
              <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
            </svg>
          </button>

          <button
            className={styles.submitBtn}
            onClick={() => submit()}
            disabled={!query.trim() || loading}
          >
            {loading ? 'Thinking…' : 'Search'}
          </button>
        </div>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className={styles.error}>⚠ Query failed: {error}</div>
      )}

      {/* ── Dropdown ── */}
      {showDropdown && (
        <div className={styles.dropdown}>

          {/* BROWSE — category grid */}
          {mode === 'browse' && !activeCategory && (
            <>
              <div className={styles.dropdownHeader}>Browse by category</div>
              <div className={styles.categoryGrid}>
                {categoryKeys.map(key => {
                  const cat = CATEGORY_MAP[key];
                  return (
                    <button key={key} className={styles.categoryCard} onClick={() => setActiveCategory(key)}>
                      <span className={styles.categoryIcon}>{cat.icon}</span>
                      <span className={styles.categoryLabel}>{cat.label}</span>
                      <span className={styles.categoryCount}>{cat.constellations.length} sources</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* BROWSE — constellation drill-down */}
          {mode === 'browse' && activeCategory && (
            <>
              <div className={styles.dropdownHeader}>
                <button className={styles.backBtn} onClick={() => setActiveCategory(null)}>← Back</button>
                <span>{CATEGORY_MAP[activeCategory].icon} {CATEGORY_MAP[activeCategory].label}</span>
              </div>
              <div className={styles.constellationList}>
                {CATEGORY_MAP[activeCategory].constellations.map((item, i) => (
                  <button key={i} className={styles.constellationItem} onClick={() => handleConstellationClick(item)}>
                    <span className={styles.constellationLabel}>{item.label}</span>
                    <span className={styles.constellationGroup}>celestrak: {item.group}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* SEARCH — pills + history + suggestions */}
          {mode === 'search' && (
            <>
              <div className={styles.categoryPills}>
                {categoryKeys.map(key => {
                  const cat = CATEGORY_MAP[key];
                  return (
                    <button
                      key={key}
                      className={styles.categoryPill}
                      onClick={() => { setMode('browse'); setActiveCategory(key); }}
                    >
                      {cat.icon} {cat.label}
                    </button>
                  );
                })}
              </div>

              {history.length > 0 && (
                <div className={styles.section}>
                  <div className={styles.sectionLabel}>Recent</div>
                  {history.slice(0, 3).map((h, i) => (
                    <button key={i} className={styles.suggestion} onClick={() => handleSuggestion(h.query)}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.4, flexShrink: 0 }}>
                        <path d="M6 1v5l3 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.3"/>
                      </svg>
                      {h.query}
                    </button>
                  ))}
                </div>
              )}

              <div className={styles.section}>
                <div className={styles.sectionLabel}>Try asking</div>
                {filteredSuggestions.slice(0, 5).map((s, i) => (
                  <button key={i} className={styles.suggestion} onClick={() => handleSuggestion(s)}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.35, flexShrink: 0 }}>
                      <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.3"/>
                      <path d="M8 8L10.5 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                    {s}
                  </button>
                ))}
              </div>

              {result?.followUp && (
                <div className={styles.section}>
                  <div className={styles.sectionLabel}>Suggested next</div>
                  <button
                    className={`${styles.suggestion} ${styles.followUp}`}
                    onClick={() => handleSuggestion(result.followUp)}
                  >
                    {result.followUp} →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}