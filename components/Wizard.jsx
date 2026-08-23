"use client";

import { useMemo, useState } from "react";

const STEPS = [
  "Chi siete",
  "Modello di ricavo",
  "Concorrenti",
  "I due pubblici",
  "Tono di voce",
  "Materiali",
  "Canali e operativita'",
  "Contatti tecnici",
];

const initialForm = {
  nomeAzienda: "DMP Partners",
  sito: "https://dmppartners.it",
  propostaValore: "",
  anniAttivita: "",
  prove: "",
  modelloRicavo: "",
  prezzi: "",
  concorrenti: "",
  cosaNonSiamo: "",
  icpVenditoriChi: "",
  icpVenditoriPaesi: "Italia",
  icpVenditoriPercentuale: "",
  canaliVenditori: "",
  icpAcquirentiChi: "",
  icpAcquirentiPaesi: "",
  icpAcquirentiLingua: "Inglese",
  icpAcquirentiPercentuale: "",
  canaliAcquirenti: "",
  icpNote: "",
  paroleDaUsare: "",
  paroleVietate: "",
  esempioTono1Generico: "",
  esempioTono1Dmp: "",
  esempioTono2Generico: "",
  esempioTono2Dmp: "",
  materialiLinkEsterno: "",
  canaliSocialEsistenti: "",
  demoASettimana: "",
  budgetAdsMensile: "",
  fusoOrario: "Europe/Rome",
  emailNotifiche: "",
};

function TextField({ label, value, onChange, placeholder, type = "text", required }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-brand-accent">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
      />
    </label>
  );
}

function TextAreaField({ label, value, onChange, placeholder, hint, rows = 3 }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      {hint && <span className="mb-1 block text-xs text-slate-500">{hint}</span>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
      />
    </label>
  );
}

export default function Wizard({ token }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const update = (field) => (value) => setForm((f) => ({ ...f, [field]: value }));

  const progressPct = useMemo(() => Math.round(((step + 1) / STEPS.length) * 100), [step]);

  const canGoNext = () => {
    if (step === 0) return form.nomeAzienda.trim().length > 0;
    if (step === 7) return form.emailNotifiche.trim().length > 0;
    return true;
  };

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const answers = {
        ...form,
        prove: splitLines(form.prove),
        concorrenti: splitLines(form.concorrenti),
        cosaNonSiamo: splitLines(form.cosaNonSiamo),
        canaliVenditori: splitLines(form.canaliVenditori),
        canaliAcquirenti: splitLines(form.canaliAcquirenti),
        paroleDaUsare: splitLines(form.paroleDaUsare),
        paroleVietate: splitLines(form.paroleVietate),
        canaliSocialEsistenti: splitLines(form.canaliSocialEsistenti),
        esempiTono: [
          { generico: form.esempioTono1Generico, dmp: form.esempioTono1Dmp },
          { generico: form.esempioTono2Generico, dmp: form.esempioTono2Dmp },
        ],
      };

      const fd = new FormData();
      fd.append("token", token);
      fd.append("answers", JSON.stringify(answers));
      for (const file of files) {
        fd.append("files", file, file.name);
      }

      const res = await fetch("/api/onboarding/submit", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Errore durante l'invio");
      setResult(data);
    } catch (e) {
      setError(e.message || "Errore imprevisto");
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-brand">Grazie — questionario ricevuto</h2>
        <p className="mt-2 text-sm text-slate-600">
          Abbiamo salvato le risposte e {files.length} file allegati. Ecco cosa e&apos; stato generato:
        </p>
        <ul className="mt-4 space-y-1 text-sm">
          {result.generatedFiles.map((f) => (
            <li key={f.pathname}>
              <a className="text-brand underline" href={f.url} target="_blank" rel="noreferrer">
                {f.pathname}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-slate-500">
          Puoi scaricare i 4 file <code>.md</code> generati e sostituirli nella cartella
          <code className="mx-1 rounded bg-slate-100 px-1">brand/</code>
          del progetto Claude Code: <code>brand-brief.md</code>, <code>icp.md</code>,
          <code> tone-of-voice.md</code>, <code>offerta.md</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
          <span>
            Passo {step + 1} di {STEPS.length} — {STEPS[step]}
          </span>
          <span>{progressPct}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        {step === 0 && (
          <div className="space-y-4">
            <TextField label="Nome azienda" value={form.nomeAzienda} onChange={update("nomeAzienda")} required />
            <TextField label="Sito web" value={form.sito} onChange={update("sito")} placeholder="https://..." />
            <TextField
              label="Proposta di valore in una frase"
              value={form.propostaValore}
              onChange={update("propostaValore")}
              placeholder="Cosa fate che nessun altro fa"
            />
            <TextField label="Anni di attivita'" value={form.anniAttivita} onChange={update("anniAttivita")} />
            <TextAreaField
              label="Prove (numeri, casi, partner)"
              hint="Una per riga"
              value={form.prove}
              onChange={update("prove")}
            />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <TextAreaField
              label="Come guadagnate"
              value={form.modelloRicavo}
              onChange={update("modelloRicavo")}
              placeholder="Commissione sulla vendita, abbonamento, fee fissa..."
            />
            <TextField label="Prezzi / commissioni" value={form.prezzi} onChange={update("prezzi")} />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <TextAreaField
              label="Concorrenti reali"
              hint="Uno per riga: nome — perche' siete diversi"
              value={form.concorrenti}
              onChange={update("concorrenti")}
              rows={4}
            />
            <TextAreaField
              label="Cosa NON siete"
              hint="Es. non siamo un'agenzia immobiliare, non gestiamo il rogito..."
              value={form.cosaNonSiamo}
              onChange={update("cosaNonSiamo")}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-brand">Lato A — Venditori</h3>
              <div className="space-y-3">
                <TextField label="Chi sono" value={form.icpVenditoriChi} onChange={update("icpVenditoriChi")} />
                <TextField label="Paesi/aree target" value={form.icpVenditoriPaesi} onChange={update("icpVenditoriPaesi")} />
                <TextField
                  label="% attesa dei lead totali"
                  value={form.icpVenditoriPercentuale}
                  onChange={update("icpVenditoriPercentuale")}
                  type="number"
                />
                <TextAreaField
                  label="Canali gia' presidiati"
                  hint="Uno per riga"
                  value={form.canaliVenditori}
                  onChange={update("canaliVenditori")}
                />
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-brand">Lato B — Acquirenti internazionali</h3>
              <div className="space-y-3">
                <TextField label="Chi sono" value={form.icpAcquirentiChi} onChange={update("icpAcquirentiChi")} />
                <TextField label="Paesi target" value={form.icpAcquirentiPaesi} onChange={update("icpAcquirentiPaesi")} />
                <TextField label="Lingua principale" value={form.icpAcquirentiLingua} onChange={update("icpAcquirentiLingua")} />
                <TextField
                  label="% attesa dei lead totali"
                  value={form.icpAcquirentiPercentuale}
                  onChange={update("icpAcquirentiPercentuale")}
                  type="number"
                />
                <TextAreaField
                  label="Canali gia' presidiati"
                  hint="Uno per riga"
                  value={form.canaliAcquirenti}
                  onChange={update("canaliAcquirenti")}
                />
              </div>
            </div>
            <TextAreaField label="Note aggiuntive sui due pubblici" value={form.icpNote} onChange={update("icpNote")} />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <TextAreaField
              label="Parole/espressioni da usare"
              hint="Una per riga"
              value={form.paroleDaUsare}
              onChange={update("paroleDaUsare")}
            />
            <TextAreaField
              label="Parole/espressioni vietate"
              hint="Una per riga"
              value={form.paroleVietate}
              onChange={update("paroleVietate")}
            />
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="mb-2 text-sm font-medium text-slate-700">Esempio 1 — prima / dopo</p>
              <TextField label="Frase generica" value={form.esempioTono1Generico} onChange={update("esempioTono1Generico")} />
              <div className="h-2" />
              <TextField label="Come la direbbe DMP" value={form.esempioTono1Dmp} onChange={update("esempioTono1Dmp")} />
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="mb-2 text-sm font-medium text-slate-700">Esempio 2 — prima / dopo</p>
              <TextField label="Frase generica" value={form.esempioTono2Generico} onChange={update("esempioTono2Generico")} />
              <div className="h-2" />
              <TextField label="Come la direbbe DMP" value={form.esempioTono2Dmp} onChange={update("esempioTono2Dmp")} />
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Carica qui file leggeri: logo, PDF, una o due foto guida. Totale consigliato
              sotto i 4 MB per invio.
            </p>
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
              className="block w-full rounded-lg border border-dashed border-slate-300 p-4 text-sm"
            />
            {files.length > 0 && (
              <ul className="space-y-1 text-sm text-slate-600">
                {files.map((f) => (
                  <li key={f.name}>📎 {f.name} — {(f.size / 1024).toFixed(0)} KB</li>
                ))}
              </ul>
            )}
            {totalFilesSizeMB(files) > 4 && (
              <p className="text-sm text-amber-600">
                Il totale supera i 4 MB: questo invio potrebbe fallire. Rimuovi qualche file
                pesante e condividi il resto con il link qui sotto.
              </p>
            )}
            <TextField
              label="Link a materiali voluminosi (facoltativo)"
              value={form.materialiLinkEsterno}
              onChange={update("materialiLinkEsterno")}
              placeholder="Link Google Drive, WeTransfer, Dropbox..."
            />
          </div>
        )}

        {step === 6 && (
          <div className="space-y-4">
            <TextAreaField
              label="Canali social gia' collegati"
              hint="Uno per riga, es: Instagram @dmppartners"
              value={form.canaliSocialEsistenti}
              onChange={update("canaliSocialEsistenti")}
            />
            <TextField
              label="Quante demo potete sostenere a settimana"
              value={form.demoASettimana}
              onChange={update("demoASettimana")}
              type="number"
            />
            <TextField
              label="Budget mensile previsto per ads (€)"
              value={form.budgetAdsMensile}
              onChange={update("budgetAdsMensile")}
              type="number"
            />
            <TextField label="Fuso orario principale" value={form.fusoOrario} onChange={update("fusoOrario")} />
          </div>
        )}

        {step === 7 && (
          <div className="space-y-4">
            <TextField
              label="Email per le notifiche di sistema"
              value={form.emailNotifiche}
              onChange={update("emailNotifiche")}
              type="email"
              required
            />
            <p className="text-sm text-slate-500">
              Ultimo passo. Dopo l&apos;invio riceverai conferma a schermo e i file generati
              saranno pronti per essere scaricati.
            </p>
          </div>
        )}

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={back}
            disabled={step === 0 || submitting}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 disabled:opacity-30"
          >
            ← Indietro
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              disabled={!canGoNext()}
              className="rounded-lg bg-brand px-5 py-2 text-sm font-medium text-white shadow-sm disabled:opacity-40"
            >
              Avanti →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canGoNext() || submitting}
              className="rounded-lg bg-brand-accent px-5 py-2 text-sm font-medium text-white shadow-sm disabled:opacity-40"
            >
              {submitting ? "Invio in corso..." : "Invia questionario"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function totalFilesSizeMB(files) {
  const bytes = files.reduce((sum, f) => sum + (f.size || 0), 0);
  return bytes / (1024 * 1024);
}

function splitLines(text) {
  return (text || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}
