// lib/generateBrandFiles.js
//
// Converte le risposte del questionario nei 4 file markdown usati dal
// progetto Claude Code (brand/brand-brief.md, icp.md, tone-of-voice.md, offerta.md).
// Chi ha gia' seguito il corso puo' scaricare questi file e sostituirli
// direttamente nella cartella brand/ del proprio progetto.

function line(label, value, fallback = "[DA COMPLETARE]") {
  const v = (value || "").toString().trim();
  return `**${label}**: ${v.length ? v : fallback}`;
}

function bulletList(items) {
  const clean = (items || []).map((i) => (i || "").trim()).filter(Boolean);
  if (!clean.length) return "- [DA COMPLETARE]";
  return clean.map((i) => `- ${i}`).join("\n");
}

export function generateBrandBrief(a) {
  return `# Brand Brief — ${a.nomeAzienda || "DMP Partners"}

_Generato dal questionario di onboarding il ${new Date().toLocaleDateString("it-IT")}._

## Chi siamo

${line("Sito", a.sito)}
${line("Proposta di valore in una frase", a.propostaValore)}
${line("Anni di attivita'", a.anniAttivita)}

## Prove (numeri, casi, partner)

${bulletList(a.prove)}

## Modello di ricavo

${line("Come guadagniamo", a.modelloRicavo)}
${line("Prezzi / commissioni", a.prezzi)}

## Concorrenti reali

${bulletList(a.concorrenti)}

## Cosa NON siamo

${bulletList(a.cosaNonSiamo)}

---
_Questo file sostituisce \`brand/brand-brief.md\`. Rileggilo e correggilo: nessun questionario conosce l'azienda meglio di chi ci lavora._
`;
}

export function generateICP(a) {
  return `# ICP — Due pubblici, non uno

_Generato dal questionario di onboarding il ${new Date().toLocaleDateString("it-IT")}._

| | Lato A — Venditori | Lato B — Acquirenti |
|---|---|---|
| **Chi** | ${a.icpVenditoriChi || "[DA COMPLETARE]"} | ${a.icpAcquirentiChi || "[DA COMPLETARE]"} |
| **Paesi/aree target** | ${a.icpVenditoriPaesi || "Italia"} | ${a.icpAcquirentiPaesi || "[DA COMPLETARE]"} |
| **Lingua** | Italiano | ${a.icpAcquirentiLingua || "Inglese"} |
| **% attesa dei lead** | ${a.icpVenditoriPercentuale || "[DA COMPLETARE]"}% | ${a.icpAcquirentiPercentuale || "[DA COMPLETARE]"}% |
| **Canali gia' presidiati** | ${a.canaliVenditori || "[DA COMPLETARE]"} | ${a.canaliAcquirenti || "[DA COMPLETARE]"} |

## Note aggiuntive

${a.icpNote || "[DA COMPLETARE]"}

---
_Questo file sostituisce \`brand/icp.md\`. Le percentuali servono a monitorare l'equilibrio del marketplace nei report settimanali._
`;
}

export function generateToneOfVoice(a) {
  return `# Tono di voce

_Generato dal questionario di onboarding il ${new Date().toLocaleDateString("it-IT")}._

## Parole/espressioni da usare

${bulletList(a.paroleDaUsare)}

## Parole/espressioni vietate

${bulletList(a.paroleVietate)}

## Esempi reali (prima / dopo)

${(a.esempiTono || []).length
    ? a.esempiTono
        .map(
          (e, i) => `**Esempio ${i + 1}**
- Generico: ${e.generico || "[DA COMPLETARE]"}
- DMP: ${e.dmp || "[DA COMPLETARE]"}`
        )
        .join("\n\n")
    : "[DA COMPLETARE — aggiungi almeno 2 esempi veri]"}

---
_Questo file sostituisce \`brand/tone-of-voice.md\`. Gli esempi valgono piu' di qualunque aggettivo descrittivo._
`;
}

export function generateOfferta(a) {
  return `# Offerta

_Generato dal questionario di onboarding il ${new Date().toLocaleDateString("it-IT")}._

${line("Cosa include il servizio", a.offertaCosaIncludeVeramente)}
${line("Prezzo / fee / commissione", a.prezzi)}
${line("Quante demo si possono sostenere a settimana", a.demoASettimana)}
${line("Budget mensile previsto per ads", a.budgetAdsMensile)}

## Canali social gia' collegati

${bulletList(a.canaliSocialEsistenti)}

## Contatti tecnici

${line("Email per notifiche di sistema", a.emailNotifiche)}
${line("Fuso orario preferito", a.fusoOrario)}

---
_Questo file sostituisce \`brand/offerta.md\`. Queste risposte sbloccano promesse precise nel flusso demo e nelle email del sistema di marketing._
`;
}

export function generateAllBrandFiles(answers) {
  return {
    "brand-brief.md": generateBrandBrief(answers),
    "icp.md": generateICP(answers),
    "tone-of-voice.md": generateToneOfVoice(answers),
    "offerta.md": generateOfferta(answers),
  };
}
