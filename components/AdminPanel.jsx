"use client";

import { useState } from "react";

export default function AdminPanel({ token }) {
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/${token}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Errore");
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (!data) {
    return (
      <div className="max-w-sm rounded-xl bg-white p-6 shadow-sm">
        <label className="block text-sm font-medium text-slate-700">Password admin</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button
          onClick={load}
          disabled={loading || !password}
          className="mt-4 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
        >
          {loading ? "Verifica..." : "Entra"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data.onboarding ? (
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Inviato il {new Date(data.onboarding.submittedAt).toLocaleString("it-IT")}
          </p>
          <pre className="mt-3 max-h-80 overflow-auto rounded-lg bg-slate-50 p-4 text-xs">
            {JSON.stringify(data.onboarding.answers, null, 2)}
          </pre>
        </div>
      ) : (
        <p className="text-sm text-slate-500">Nessuna risposta trovata ancora per questo link.</p>
      )}

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-brand">File salvati ({data.files.length})</h2>
        <ul className="space-y-1 text-sm">
          {data.files.map((f) => (
            <li key={f.pathname} className="flex items-center justify-between gap-4">
              <a className="truncate text-brand underline" href={f.url} target="_blank" rel="noreferrer">
                {f.pathname}
              </a>
              <span className="shrink-0 text-xs text-slate-400">{Math.round((f.size || 0) / 1024)} KB</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
