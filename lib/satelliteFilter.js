/**
 * applyQueryFilter
 * Takes the parsed NLQ result from Claude and filters a satellite array.
 *
 * Each satellite object should have this shape (from your TLE/catalog pipeline):
 * {
 *   noradId: number,
 *   name: string,
 *   type: 'active' | 'debris' | 'rocket_body' | 'inactive',
 *   operator: string,
 *   constellation: string | null,
 *   altitude: number,          // km, current computed altitude
 *   inclination: number,       // degrees
 *   orbitType: 'LEO' | 'MEO' | 'GEO' | 'HEO',
 *   launchYear: number | null,
 *   lat: number,               // current ground track latitude
 *   lon: number,               // current ground track longitude
 *   riskLevel: 'high' | 'medium' | 'low' | null,
 * }
 */
export function applyQueryFilter(satellites, nlqResult) {
  if (!nlqResult || !nlqResult.filters) return satellites;

  const f = nlqResult.filters;
  let results = [...satellites];

  if (f.type && f.type.length > 0) {
    results = results.filter(s => f.type.includes(s.type));
  }

  if (f.operator) {
    const op = f.operator.toLowerCase();
    results = results.filter(s => s.operator?.toLowerCase().includes(op));
  }

  if (f.constellation) {
    const con = f.constellation.toLowerCase();
    results = results.filter(s =>
      s.constellation?.toLowerCase().includes(con) ||
      s.name?.toLowerCase().includes(con)
    );
  }

  if (f.altitudeMin != null) {
    results = results.filter(s => s.altitude >= f.altitudeMin);
  }

  if (f.altitudeMax != null) {
    results = results.filter(s => s.altitude <= f.altitudeMax);
  }

  if (f.inclination != null) {
    results = results.filter(s => Math.abs(s.inclination - f.inclination) <= 5);
  }

  if (f.orbitType) {
    results = results.filter(s => s.orbitType === f.orbitType);
  }

  if (f.riskLevel) {
    results = results.filter(s => s.riskLevel === f.riskLevel);
  }

  if (f.launchYearMin != null) {
    results = results.filter(s => s.launchYear >= f.launchYearMin);
  }

  if (f.launchYearMax != null) {
    results = results.filter(s => s.launchYear <= f.launchYearMax);
  }

  if (f.visibleFrom) {
    const { lat, lon } = f.visibleFrom;
    results = results.filter(s => isApproxVisible(s, lat, lon));
  }

  if (f.keyword) {
    const kw = f.keyword.toLowerCase();
    results = results.filter(s =>
      s.name?.toLowerCase().includes(kw) ||
      s.operator?.toLowerCase().includes(kw)
    );
  }

  return results;
}

/**
 * Rough ground-track visibility check.
 * A satellite is "overhead" if its subsatellite point is within ~2500 km.
 * For real visibility (naked eye), you'd also check elevation angle and sunlight.
 */
function isApproxVisible(sat, observerLat, observerLon) {
  const R = 6371;
  const dLat = (sat.lat - observerLat) * Math.PI / 180;
  const dLon = (sat.lon - observerLon) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(observerLat * Math.PI / 180) *
    Math.cos(sat.lat * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  const distKm = R * 2 * Math.asin(Math.sqrt(a));
  return distKm < 2500;
}

/**
 * getHighlightColor
 * Returns a Three.js-compatible hex color for a satellite
 * based on whether it's in the active filter result set.
 */
export function getHighlightColor(satellite, filteredIds, defaultColor = 0x60a5fa) {
  if (!filteredIds || filteredIds.size === 0) return defaultColor;
  if (filteredIds.has(satellite.noradId)) {
    return satellite.riskLevel === 'high' ? 0xef4444
      : satellite.riskLevel === 'medium' ? 0xf59e0b
      : 0x22c55e;
  }
  return 0x334155;
}
