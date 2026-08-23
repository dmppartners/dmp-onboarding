// lib/storage.js
//
// Un unico livello di astrazione sopra lo storage dei file, con due backend possibili:
//
// 1. "disco persistente" (predefinito, usato su Railway): scrive dentro la cartella
//    indicata da STORAGE_DIR (env var). Su Railway questa cartella e' un Volume
//    montato — i file sopravvivono ai riavvii e ai redeploy. In locale, se non
//    imposti STORAGE_DIR, usa semplicemente .local-storage/ nel progetto.
//
// 2. "Vercel Blob" (opzionale, solo se sei su Vercel e imposti BLOB_READ_WRITE_TOKEN):
//    utile se in futuro sposti l'hosting su Vercel invece che su Railway.
//
// In entrambi i casi non serve un database: le risposte del questionario sono
// salvate come file JSON accanto ai materiali caricati.

import { put, list, head } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";

function storageDir() {
  return process.env.STORAGE_DIR || path.join(process.cwd(), ".local-storage");
}

function hasBlobToken() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function ensureLocalDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

/**
 * Salva un file (Buffer o stringa) in una posizione logica, es:
 * "clients/dmp-partners/materiali/logo.png"
 */
export async function saveObject(key, data, contentType) {
  if (hasBlobToken()) {
    const blob = await put(key, data, {
      access: "public",
      contentType,
      addRandomSuffix: false,
      allowOverwrite: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return { url: blob.url, pathname: blob.pathname, backend: "vercel-blob" };
  }

  const filePath = path.join(/*turbopackIgnore: true*/ storageDir(), key);
  await ensureLocalDir(filePath);
  const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data);
  await fs.writeFile(filePath, buffer);
  return { url: `/storage-file?key=${encodeURIComponent(key)}`, pathname: key, backend: "disk" };
}

/**
 * Salva un oggetto JS come JSON.
 */
export async function saveJSON(key, obj) {
  const json = JSON.stringify(obj, null, 2);
  return saveObject(key, json, "application/json");
}

/**
 * Elenca tutti gli oggetti sotto un prefisso, es: "clients/dmp-partners/"
 * Ritorna un array di { url, pathname, size, uploadedAt }
 */
export async function listPrefix(prefix) {
  if (hasBlobToken()) {
    const { blobs } = await list({ prefix, token: process.env.BLOB_READ_WRITE_TOKEN });
    return blobs.map((b) => ({
      url: b.url,
      pathname: b.pathname,
      size: b.size,
      uploadedAt: b.uploadedAt,
    }));
  }

  const dirPath = path.join(/*turbopackIgnore: true*/ storageDir(), prefix);
  const results = [];
  async function walk(current, relBase) {
    let entries;
    try {
      entries = await fs.readdir(current, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const abs = path.join(current, entry.name);
      const rel = path.join(relBase, entry.name);
      if (entry.isDirectory()) {
        await walk(abs, rel);
      } else {
        const stat = await fs.stat(abs);
        results.push({
          url: `/storage-file?key=${encodeURIComponent(path.join(prefix, rel))}`,
          pathname: path.join(prefix, rel),
          size: stat.size,
          uploadedAt: stat.mtime,
        });
      }
    }
  }
  await walk(dirPath, "");
  return results;
}

/**
 * Legge un oggetto JSON salvato in precedenza dato il suo "pathname" logico.
 */
export async function readJSON(pathname) {
  if (hasBlobToken()) {
    const meta = await head(pathname, { token: process.env.BLOB_READ_WRITE_TOKEN }).catch(() => null);
    const url = meta ? meta.url : null;
    if (!url) return null;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  }

  const filePath = path.join(/*turbopackIgnore: true*/ storageDir(), pathname);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Legge il contenuto grezzo (Buffer) di un file salvato su disco.
 * Usato dalla route /storage-file per servire i file quando il backend e' "disk".
 */
export async function readLocalRaw(key) {
  const filePath = path.join(/*turbopackIgnore: true*/ storageDir(), key);
  return fs.readFile(filePath);
}

export function storageBackendName() {
  return hasBlobToken() ? "Vercel Blob" : `Disco persistente (${storageDir()})`;
}
