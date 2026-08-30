"use client";

import { useEffect, useRef, useState } from "react";
import { business } from "../../lib/vittoria/content";
import { starterChips } from "../../lib/vittoria/knowledge";

const GREETING = {
  role: "assistant",
  content:
    "Buongiorno. Sono l'assistente d'atelier: posso raccontarti come lavoriamo, che marchi teniamo e quando trovarci in via Pizzecolli. Cosa ti serve?",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [chips, setChips] = useState(starterChips);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);

  const logRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    inputRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, pending, open]);

  async function send(text) {
    const question = text.trim();
    if (!question || pending) return;

    const history = [...messages, { role: "user", content: question }];
    setMessages(history);
    setDraft("");
    setChips([]);
    setPending(true);

    try {
      const response = await fetch("/api/vittoria/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-12) }),
      });
      const data = await response.json();
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            data.reply ||
            `Qui mi fermo. Per una risposta certa chiama il ${business.phone} o scrivi a ${business.email}.`,
        },
      ]);
      setChips(Array.isArray(data.chips) ? data.chips : []);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: `La connessione è caduta. Nel frattempo: ${business.phone} — ${business.email}.`,
        },
      ]);
    } finally {
      setPending(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="vr-chat">
      {open && (
        <div className="vr-chat__panel" role="dialog" aria-label="Assistente d'atelier">
          <div className="vr-chat__head">
            <div>
              <strong>Assistente d&apos;atelier</strong>
              <span>Vittoria Ribighini</span>
            </div>
            <button
              type="button"
              className="vr-chat__close"
              onClick={() => setOpen(false)}
              aria-label="Chiudi la conversazione"
            >
              ×
            </button>
          </div>

          <div className="vr-chat__log" ref={logRef} aria-live="polite">
            {messages.map((message, index) => (
              <p
                key={index}
                className={`vr-msg vr-msg--${message.role === "user" ? "user" : "bot"}`}
              >
                {message.content}
              </p>
            ))}
            {pending && (
              <p className="vr-msg vr-msg--bot vr-msg--typing" aria-label="Sto scrivendo">
                <i />
                <i />
                <i />
              </p>
            )}
          </div>

          {chips.length > 0 && !pending && (
            <div className="vr-chat__chips">
              {chips.map((chip) => (
                <button key={chip} type="button" onClick={() => send(chip)}>
                  {chip}
                </button>
              ))}
            </div>
          )}

          <form
            className="vr-chat__form"
            onSubmit={(event) => {
              event.preventDefault();
              send(draft);
            }}
          >
            <label htmlFor="vr-chat-input" className="sr-only" style={{ display: "none" }}>
              Scrivi la tua domanda
            </label>
            <input
              id="vr-chat-input"
              ref={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Scrivi qui…"
              autoComplete="off"
              maxLength={1000}
            />
            <button type="submit" className="vr-chat__send" disabled={pending || !draft.trim()}>
              Invia
            </button>
          </form>

          <p className="vr-chat__foot">
            Assistente virtuale. Per preventivi e appuntamenti: {business.phone}
          </p>
        </div>
      )}

      <button
        type="button"
        className="vr-chat__toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M1 3.2A1.2 1.2 0 0 1 2.2 2h11.6A1.2 1.2 0 0 1 15 3.2v7.1a1.2 1.2 0 0 1-1.2 1.2H6.4L3 14.6v-3.1H2.2A1.2 1.2 0 0 1 1 10.3z"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </svg>
        {open ? "Chiudi" : "Parla con l'atelier"}
      </button>
    </div>
  );
}
