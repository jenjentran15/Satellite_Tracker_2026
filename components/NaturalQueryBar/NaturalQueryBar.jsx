'use client';

import { useRef, useEffect, useState } from 'react';
import { useNaturalQuery } from '@/hooks/useNaturalQuery';
import styles from './NaturalQueryBar.module.css';

const SUGGESTIONS = [
  'Show me all Starlink satellites',
  'High risk conjunctions right now',
  'Debris above 800 km altitude',
  'Satellites visible from Los Angeles tonight',
  'GPS constellation',
  'What launched in 2024?',
  'Show Russian satellites in LEO',
  'Inactive satellites near ISS orbit',
];

export default function NaturalQueryBar({ onResult, onClear }) {
  const { query, setQuery, result, loading, error, history, submit, clear } = useNaturalQuery();
  const [focused, setFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (result) {
      onResult?.(result);
      setShowSuggestions(false);
    }
  }, [result, onResult]);

  function handleKey(e) {
    if (e.key === 'Enter') submit();
    if (e.key === 'Escape') { clear(); onClear?.(); setShowSuggestions(false); }
  }

  function handleSuggestion(s) {
    setQuery(s);
    submit(s);
  }

  const filteredSuggestions = query.length > 1
    ? SUGGESTIONS.filter(s => s.toLowerCase().includes(query.toLowerCase()))
    : SUGGESTIONS;

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.bar} ${focused ? styles.focused : ''} ${loading ? styles.loading : ''}`}>

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
          onChange={e => { setQuery(e.target.value); setShowSuggestions(true); }}
          onFocus={() => { setFocused(true); setShowSuggestions(true); }}
          onBlur={() => { setFocused(false); setTimeout(() => setShowSuggestions(false), 150); }}
          onKeyDown={handleKey}
          placeholder="Ask anything — 'show Starlink over Europe' or 'high risk conjunctions'..."
          autoComplete="off"
          spellCheck={false}
        />

        <div className={styles.actions}>
          {result && (
            <span className={styles.resultPill}>
              {result.humanSummary}
            </span>
          )}
          {query && (
            <button className={styles.clearBtn} onClick={() => { clear(); onClear?.(); }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          )}
          <button
            className={styles.submitBtn}
            onClick={() => submit()}
            disabled={!query.trim() || loading}
          >
            {loading ? 'Thinking...' : 'Search'}
          </button>
        </div>
      </div>

      {error && (
        <div className={styles.error}>Query failed: {error}</div>
      )}

      {showSuggestions && focused && (
        <div className={styles.dropdown}>
          {history.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionLabel}>Recent</div>
              {history.slice(0, 3).map((h, i) => (
                <button key={i} className={styles.suggestion} onClick={() => handleSuggestion(h.query)}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{opacity:.5}}>
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
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{opacity:.4}}>
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
              <button className={`${styles.suggestion} ${styles.followUp}`} onClick={() => handleSuggestion(result.followUp)}>
                {result.followUp} →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
