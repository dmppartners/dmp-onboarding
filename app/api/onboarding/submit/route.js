import { NextResponse } from "next/server";
import { saveObject, saveJSON } from "../../../../lib/storage";
import { generateAllBrandFiles } from "../../../../lib/generateBrandFiles";

export const runtime = "nodejs";

const MAX_TOTAL_BYTES = 4.2 * 1024 * 1024; // margine sotto il limite tipico delle serverless function

function sanitizeToken(raw) {
  return (raw || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "-")
    .slice(0, 64);
}

function sanitizeFilename(name) {
  return (name || "file")
    .toString()
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .slice(0, 120);
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const token = sanitizeToken(formData.get("token"));
    if (!token) {
      return NextResponse.json({ error: "Link non valido: token mancante." }, { status: 400 });
    }

    const answersRaw = formData.get("answers");
    if (!answersRaw) {
      return NextResponse.json({ error: "Risposte mancanti." }, { status: 400 });
    }
    const answers = JSON.parse(answersRaw);

    const incomingFiles = formData.getAll("files").filter((f) => typeof f === "object" && "arrayBuffer" in f);

    const totalBytes = incomingFiles.reduce((sum, f) => sum + (f.size || 0), 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      return NextResponse.json(
        {
          error:
            "I file allegati superano il limite di ~4 MB per invio. Rimuovi qualche file o usa il campo 'link a materiali voluminosi'.",
        },
        { status: 413 }
      );
    }

    const generatedFiles = [];

    // 1. Materiali caricati
    for (const file of incomingFiles) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const key = `clients/${token}/materiali/${Date.now()}-${sanitizeFilename(file.name)}`;
      const saved = await saveObject(key, buffer, file.type || "application/octet-stream");
      generatedFiles.push({ pathname: saved.pathname, url: saved.url, kind: "materiale" });
    }

    // 2. Risposte grezze (JSON), utile per la pagina admin e per audit
    const answersSaved = await saveJSON(`clients/${token}/onboarding.json`, {
      submittedAt: new Date().toISOString(),
      answers,
    });
    generatedFiles.push({ pathname: answersSaved.pathname, url: answersSaved.url, kind: "risposte" });

    // 3. File brand/*.md pronti da usare nel progetto Claude Code
    const brandFiles = generateAllBrandFiles(answers);
    for (const [filename, content] of Object.entries(brandFiles)) {
      const saved = await saveObject(`clients/${token}/brand-kit/${filename}`, content, "text/markdown");
      generatedFiles.push({ pathname: saved.pathname, url: saved.url, kind: "brand-kit" });
    }

    return NextResponse.json({ ok: true, token, generatedFiles });
  } catch (err) {
    console.error("Errore onboarding/submit:", err);
    return NextResponse.json({ error: "Errore interno durante il salvataggio." }, { status: 500 });
  }
}
