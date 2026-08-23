// Serve i file salvati con il backend "disco" (STORAGE_DIR). Su Railway, STORAGE_DIR
// punta al Volume persistente: questa route funziona quindi anche in produzione,
// non solo in sviluppo. Se invece e' impostato BLOB_READ_WRITE_TOKEN (backend Vercel
// Blob), questa route non viene mai usata: i file sono serviti direttamente da Vercel.
import { NextResponse } from "next/server";
import { readLocalRaw } from "../../lib/storage";

export const runtime = "nodejs";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  if (!key) {
    return NextResponse.json({ error: "key mancante" }, { status: 400 });
  }
  try {
    const buffer = await readLocalRaw(key);
    return new NextResponse(buffer, {
      headers: { "content-type": guessContentType(key) },
    });
  } catch {
    return NextResponse.json({ error: "file non trovato" }, { status: 404 });
  }
}

function guessContentType(key) {
  if (key.endsWith(".json")) return "application/json";
  if (key.endsWith(".md")) return "text/markdown";
  if (key.endsWith(".png")) return "image/png";
  if (key.endsWith(".jpg") || key.endsWith(".jpeg")) return "image/jpeg";
  if (key.endsWith(".pdf")) return "application/pdf";
  return "application/octet-stream";
}
