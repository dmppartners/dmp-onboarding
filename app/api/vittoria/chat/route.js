import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { systemPrompt, answerLocally } from "../../../../lib/vittoria/knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Assistente d'atelier.
 *
 * Con ANTHROPIC_API_KEY impostata risponde Claude, con la scheda dell'atelier
 * come system prompt. Senza chiave — o se la chiamata fallisce, o se un IP
 * esagera — risponde il motore deterministico di lib/vittoria/knowledge.js:
 * il chatbot resta utile anche a costo zero e non lascia mai il sito muto.
 */

const MODEL = process.env.VR_CHAT_MODEL || "claude-opus-5";
const MAX_HISTORY = 12;
const MAX_CHARS = 1000;

// Freno d'emergenza in memoria (una sola istanza su Railway): oltre la soglia
// si continua a rispondere, ma con il motore locale che non costa nulla.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_CALLS = 20;
const hits = new Map();

function withinBudget(ip) {
  const now = Date.now();
  const log = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  log.push(now);
  hits.set(ip, log);
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (!times.length || now - times[times.length - 1] > WINDOW_MS) hits.delete(key);
    }
  }
  return log.length <= MAX_CALLS;
}

function clientIp(request) {
  const fwd = request.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : request.headers.get("x-real-ip") || "anon").trim();
}

/** Tiene solo turni user/assistant con testo, tagliati alle ultime battute. */
function sanitize(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_CHARS) }))
    .filter((m) => m.content.length > 0)
    .slice(-MAX_HISTORY);
}

function local(question, extra = {}) {
  const answer = answerLocally(question);
  return NextResponse.json({ reply: answer.text, chips: answer.chips, ...extra });
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non leggibile." }, { status: 400 });
  }

  const messages = sanitize(payload?.messages);
  const last = messages[messages.length - 1];
  if (!last || last.role !== "user") {
    return NextResponse.json({ error: "Manca la domanda." }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return local(last.content, { source: "locale" });
  if (!withinBudget(clientIp(request))) return local(last.content, { source: "locale" });

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 2048,
      output_config: { effort: "low" },
      system: [{ type: "text", text: systemPrompt, cache_control: { type: "ephemeral" } }],
      messages,
    });

    if (response.stop_reason === "refusal") return local(last.content, { source: "locale" });

    const text = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    if (!text) return local(last.content, { source: "locale" });
    return NextResponse.json({ reply: text, chips: [], source: "claude" });
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      console.error("[vr-chat] chiave API rifiutata");
    } else if (error instanceof Anthropic.RateLimitError) {
      console.error("[vr-chat] rate limit sul modello");
    } else if (error instanceof Anthropic.APIError) {
      console.error(`[vr-chat] errore API ${error.status}: ${error.message}`);
    } else {
      console.error("[vr-chat] errore imprevisto:", error);
    }
    // Il visitatore non deve accorgersene: risponde il motore locale.
    return local(last.content, { source: "locale" });
  }
}
