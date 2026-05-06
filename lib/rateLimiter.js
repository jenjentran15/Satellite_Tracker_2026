const MAX_CALLS = 300;
const WINDOW_MS = 60 * 60 * 1000;
let count = 0;
let windowStart = Date.now();

export function checkRateLimit() {
  const now = Date.now();
  if (now - windowStart > WINDOW_MS) { count = 0; windowStart = now; }
  if (count >= MAX_CALLS) throw new Error(`Space-Track rate limit reached (${MAX_CALLS}/hr). Try again later.`);
  count++;
}

export function getRateLimitStatus() {
  return { count, remaining: MAX_CALLS - count, resetsAt: new Date(windowStart + WINDOW_MS).toISOString() };
}
