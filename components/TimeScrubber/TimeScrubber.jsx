'use client';
import { useState, useCallback, useRef } from 'react';
import styles from './TimeScrubber.module.css';

const MIN_OFFSET = -6 * 3600;   // -6 hours in seconds
const MAX_OFFSET = 24 * 3600;   // +24 hours in seconds

function formatUTC(date) {
  return date.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
}

export default function TimeScrubber({ onTimeOffset, isLive, onSetLive }) {
  const [offset, setOffset] = useState(0);
  const throttleRef = useRef(null);

  const handleChange = useCallback((e) => {
    const val = parseInt(e.target.value, 10);
    setOffset(val);
    if (throttleRef.current) clearTimeout(throttleRef.current);
    throttleRef.current = setTimeout(() => onTimeOffset(val), 150);
  }, [onTimeOffset]);

  const handleLive = useCallback(() => {
    setOffset(0);
    onSetLive();
  }, [onSetLive]);

  const targetDate = new Date(Date.now() + offset * 1000);
  const isAtLive = offset === 0;

  return (
    <div className={styles.scrubber}>
      <div className={styles.top}>
        <span className={styles.timeDisplay}>{formatUTC(targetDate)}</span>
        <button
          className={`${styles.liveBtn} ${isAtLive ? styles.liveBtnActive : ''}`}
          onClick={handleLive}
        >
          {isAtLive ? <><span className={styles.liveDot} />LIVE</> : 'SNAP TO LIVE'}
        </button>
      </div>
      <div className={styles.sliderRow}>
        <span className={styles.rangeLabel}>-6h</span>
        <input
          type="range"
          min={MIN_OFFSET}
          max={MAX_OFFSET}
          step={60}
          value={offset}
          onChange={handleChange}
          className={styles.slider}
        />
        <span className={styles.rangeLabel}>+24h</span>
      </div>
      {!isAtLive && (
        <div className={styles.offsetBadge}>
          {offset > 0 ? `+${Math.round(offset/3600*10)/10}h` : `${Math.round(offset/3600*10)/10}h`}
        </div>
      )}
    </div>
  );
}
