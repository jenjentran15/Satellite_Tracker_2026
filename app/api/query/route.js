import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a satellite query parser for a Space Situational Awareness dashboard.

Convert the user's natural language query into a structured JSON filter object.

Return ONLY valid JSON — no explanation, no markdown, no prose.

Schema:
{
  "intent": "filter" | "info" | "visibility" | "conjunction" | "unknown",
  "filters": {
    "type": ["active" | "debris" | "rocket_body" | "inactive"] or null,
    "operator": string or null,           // e.g. "SpaceX", "NASA", "ESA"
    "constellation": string or null,      // e.g. "Starlink", "OneWeb", "GPS"
    "altitudeMin": number or null,        // km
    "altitudeMax": number or null,        // km
    "inclination": number or null,        // degrees
    "orbitType": "LEO" | "MEO" | "GEO" | "HEO" | null,
    "visibleFrom": { "lat": number, "lon": number } or null,
    "riskLevel": "high" | "medium" | "low" | null,
    "launchYearMin": number or null,
    "launchYearMax": number or null,
    "keyword": string or null
  },
  "highlight": boolean,
  "followUp": string or null,
  "humanSummary": string
}

Rules:
- "humanSummary" is a short plain-English description of what you're showing (max 12 words)
- "followUp" is an optional suggested next query the user might want
- If the query is about a specific place (e.g. "over California"), convert to approximate lat/lon
- For conjunctions/collision risk, set intent to "conjunction"
- For visibility questions (can I see X tonight), set intent to "visibility"
- Default highlight to true when a specific filter is applied

Examples:
"show me all Starlink satellites" → constellation: "Starlink", intent: "filter"
"what debris is above 800km" → type: ["debris"], altitudeMin: 800, intent: "filter"
"high risk conjunctions" → riskLevel: "high", intent: "conjunction"
"satellites over Europe right now" → visibleFrom: { lat: 50, lon: 10 }, intent: "visibility"
"show me GPS satellites" → constellation: "GPS", orbitType: "MEO", intent: "filter"`;

export async function POST(req) {
  try {
    const { query, context } = await req.json();

    if (!query || query.trim().length === 0) {
      return Response.json({ error: 'Query is required' }, { status: 400 });
    }

    const userMessage = context
      ? `Context: ${JSON.stringify(context)}\n\nQuery: ${query}`
      : `Query: ${query}`;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    });

    const raw = message.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return Response.json({ error: 'Failed to parse Claude response', raw }, { status: 500 });
    }

    return Response.json({ success: true, result: parsed, query });
  } catch (err) {
    console.error('NLQ API error:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
