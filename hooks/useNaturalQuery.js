import { useState, useCallback, useRef } from 'react';

export function useNaturalQuery() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const abortRef = useRef(null);

  const submit = useCallback(async (queryText, context = null) => {
    const q = (queryText || query).trim();
    if (!q) return;

    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, context }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) throw new Error(`API error ${res.status}`);

      const data = await res.json();

      if (data.success) {
        setResult(data.result);
        setHistory(prev => [
          { query: q, result: data.result, timestamp: Date.now() },
          ...prev.slice(0, 9),
        ]);
      } else {
        setError(data.error || 'Unknown error');
      }
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [query]);

  const clear = useCallback(() => {
    setQuery('');
    setResult(null);
    setError(null);
  }, []);

  return { query, setQuery, result, loading, error, history, submit, clear };
}
