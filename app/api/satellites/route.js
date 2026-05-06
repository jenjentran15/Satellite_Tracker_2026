import { fetchRealSatellites } from '@/lib/celestrak';

export const dynamic = 'force-dynamic';

let cache = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  const now = Date.now();
  if (cache && now - cacheTime < CACHE_TTL) {
    return Response.json(cache);
  }

  try {
    const satellites = await fetchRealSatellites();
    console.log(`[satellites] fetched ${satellites.length} objects`);
    cache = satellites;
    cacheTime = now;
    return Response.json(satellites);
  } catch (err) {
    console.error('[satellites] fetch error:', err);
    if (cache) return Response.json(cache); // serve stale on error
    return Response.json({ error: err.message }, { status: 500 });
  }
}
