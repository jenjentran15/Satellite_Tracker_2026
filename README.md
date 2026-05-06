# SSA Natural Language Query — Integration Guide

## What this adds

A search bar that lets users type plain English to query the satellite catalog.
Claude parses the intent and returns a structured filter object.
Your existing Three.js globe highlights matched satellites instantly.

---

## File structure

```
app/
  api/query/route.js          ← Next.js API route (server-side, has API key)
  dashboard/page.example.jsx  ← Wiring example for your dashboard page
components/
  NaturalQueryBar/
    NaturalQueryBar.jsx        ← The search bar component
    NaturalQueryBar.module.css ← Styles (dark mode included)
hooks/
  useNaturalQuery.js           ← React hook managing query state
lib/
  satelliteFilter.js           ← Filter utility + Three.js color helper
```

---

## Setup

### 1. Install dependencies

```bash
npm install @anthropic-ai/sdk
```

### 2. Add your API key

In `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Never import this in client components — only the API route reads it.

### 3. Add the component to your dashboard

```jsx
import NaturalQueryBar from '@/components/NaturalQueryBar/NaturalQueryBar';

<NaturalQueryBar
  onResult={(nlqResult) => {
    const filtered = applyQueryFilter(yourSatelliteArray, nlqResult);
    updateGlobe(filtered);
  }}
  onClear={() => resetGlobe()}
/>
```

### 4. Wire the filter to your Three.js globe

```js
import { applyQueryFilter, getHighlightColor } from '@/lib/satelliteFilter';

// After receiving nlqResult:
const filtered = applyQueryFilter(satellites, nlqResult);
const filteredIds = new Set(filtered.map(s => s.noradId));

// In your Three.js render loop or update function:
satellites.forEach(sat => {
  const mesh = getMeshForSat(sat.noradId);
  mesh.material.color.setHex(getHighlightColor(sat, filteredIds));
});
```

---

## Satellite object shape expected by the filter

```js
{
  noradId: 25544,
  name: 'ISS (ZARYA)',
  type: 'active',             // 'active' | 'debris' | 'rocket_body' | 'inactive'
  operator: 'NASA/Roscosmos',
  constellation: null,
  altitude: 408,              // km (compute from TLE via satellite.js)
  inclination: 51.6,          // degrees
  orbitType: 'LEO',
  launchYear: 1998,
  lat: 42.3,                  // current ground track (update each frame)
  lon: -71.1,
  riskLevel: null,            // 'high' | 'medium' | 'low' | null
}
```

---

## Satellite.js (SGP4 propagation)

```bash
npm install satellite.js
```

```js
import * as satellite from 'satellite.js';

const satrec = satellite.twoline2satrec(tleLine1, tleLine2);
const { position } = satellite.propagate(satrec, new Date());
const gmst = satellite.gstime(new Date());
const { latitude, longitude, height } = satellite.eciToGeodetic(position, gmst);

// height is in km — that's your altitude
// latitude/longitude in radians — convert: lat * (180/Math.PI)
```

---

## Query examples that work out of the box

| User types | Claude returns |
|---|---|
| "show starlink" | constellation: "Starlink" |
| "debris above 800km" | type: ["debris"], altitudeMin: 800 |
| "high risk conjunctions" | riskLevel: "high", intent: "conjunction" |
| "visible from Tokyo tonight" | visibleFrom: { lat: 35.7, lon: 139.7 } |
| "what launched in 2024" | launchYearMin: 2024, launchYearMax: 2024 |
| "GPS satellites" | constellation: "GPS", orbitType: "MEO" |

---

## Next features to build on top of this

1. **Voice input** — Web Speech API → same submit() function, zero backend changes
2. **Query sharing** — serialize nlqResult to URL params so users can share filtered views
3. **Saved filters** — localStorage + a "My filters" panel in the sidebar
4. **Follow-up chaining** — use the `followUp` field to show a suggested next query button
