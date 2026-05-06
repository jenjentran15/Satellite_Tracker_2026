import fs from 'fs';
import path from 'path';

const CACHE_PATH = path.join(process.cwd(), 'cache', 'tle_cache.json');
const LOG_PATH = path.join(process.cwd(), 'logs', 'spacetrack_calls.log');
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export function isCacheValid() {
  try {
    if (!fs.existsSync(CACHE_PATH)) return false;
    const raw = fs.readFileSync(CACHE_PATH, 'utf8');
    const { fetchedAt } = JSON.parse(raw);
    return Date.now() - new Date(fetchedAt).getTime() < CACHE_TTL;
  } catch { return false; }
}

export function readCache() {
  try {
    const raw = fs.readFileSync(CACHE_PATH, 'utf8');
    return JSON.parse(raw).data;
  } catch { return null; }
}

export function writeCache(data) {
  try {
    ensureDir(CACHE_PATH);
    fs.writeFileSync(CACHE_PATH, JSON.stringify({ fetchedAt: new Date().toISOString(), data }));
  } catch (e) { console.warn('[cache] write failed:', e.message); }
}

export function appendLog(entry) {
  try {
    ensureDir(LOG_PATH);
    fs.appendFileSync(LOG_PATH, JSON.stringify({ ts: new Date().toISOString(), ...entry }) + '\n');
  } catch {}
}
