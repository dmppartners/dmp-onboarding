/**
 * Identita' visiva del sito Arch. Vittoria Ribighini.
 *
 * NOTA SUI TOKEN — il sito originale (vittoriaribighini.it) non e' raggiungibile
 * dall'ambiente in cui questo progetto e' stato costruito, quindi i valori esatti
 * (hex del brand, file dei font, file del logo) non sono stati estratti dal CSS
 * di produzione: la palette e l'accoppiata tipografica qui sotto sono la
 * ricostruzione del carattere del marchio — avorio caldo, nero caldo, ottone,
 * serif d'impaginato + grottesca geometrica.
 *
 * Per allineare tutto ai valori reali basta cambiare questo file e le variabili
 * corrispondenti in app/vittoria/vittoria.css: nient'altro nel sito contiene
 * colori o font scritti a mano.
 */

export const palette = {
  ink: "#191512",        // nero caldo — testo e sezioni scure
  inkSoft: "#5A5048",    // testo secondario
  paper: "#F7F4EF",      // avorio — fondo principale
  paperWarm: "#EFE9DF",  // sabbia — fondi alternati
  line: "#DED6C8",       // filetti e bordi
  brass: "#A67C3D",      // ottone — accento
  brassSoft: "#C9A46A",  // ottone chiaro — su fondo scuro
  noir: "#141210",       // sezioni manifesto
};

export const fonts = {
  // Caricati via <link> in app/vittoria/layout.js (niente next/font: il build
  // gira anche senza accesso di rete a fonts.googleapis.com).
  display: '"Cormorant Garamond", Georgia, "Times New Roman", serif',
  text: '"Jost", "Futura", "Avenir Next", system-ui, sans-serif',
};

/** Wordmark: il logo e' tipografico, ricostruito in components/vittoria/Logo.jsx */
export const wordmark = {
  first: "Vittoria",
  last: "Ribighini",
  prefix: "Arch.",
  payoff: "Progettazione e arredamento",
  monogram: "VR",
};
