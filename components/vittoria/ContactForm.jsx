"use client";

import { useState } from "react";
import { business } from "../../lib/vittoria/content";

/**
 * Modulo senza backend: compone l'email e apre il client di posta del
 * visitatore. Funziona ovunque, non richiede un servizio di invio e non
 * conserva dati personali sul server.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nome = data.get("nome") || "";
    const telefono = data.get("telefono") || "";
    const messaggio = data.get("messaggio") || "";

    const body = [
      messaggio,
      "",
      `— ${nome}`,
      telefono ? `Telefono: ${telefono}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(
      `Richiesta dal sito — ${nome}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form className="vr-form" onSubmit={handleSubmit}>
      <div className="vr-form__row">
        <div className="vr-field">
          <label htmlFor="vr-nome">Nome</label>
          <input id="vr-nome" name="nome" required autoComplete="name" />
        </div>
        <div className="vr-field">
          <label htmlFor="vr-telefono">Telefono</label>
          <input id="vr-telefono" name="telefono" type="tel" autoComplete="tel" />
        </div>
      </div>
      <div className="vr-field">
        <label htmlFor="vr-messaggio">Che spazio hai per le mani?</label>
        <textarea
          id="vr-messaggio"
          name="messaggio"
          required
          placeholder="Due righe bastano: dove, quanti metri, cosa vorresti cambiare."
        />
      </div>
      <div>
        <button type="submit" className="vr-btn">
          Prepara l&apos;email
        </button>
        <p className="vr-contact__note">
          {sent
            ? "Ti abbiamo aperto il programma di posta con l'email già scritta: controlla e invia."
            : "Si apre il tuo programma di posta con il messaggio già scritto. Nessun dato resta su questo sito."}
        </p>
      </div>
    </form>
  );
}
