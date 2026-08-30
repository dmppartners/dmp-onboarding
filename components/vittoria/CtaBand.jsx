import Link from "next/link";
import Reveal from "./Reveal";
import { business } from "../../lib/vittoria/content";

/** Fascia di chiusura comune alle pagine interne. */
export default function CtaBand({
  eyebrow = "Il primo passo",
  title = "Portaci una pianta. Anche a matita.",
  lead = "Il primo incontro è gratuito e dura un'ora: si esce con una direzione, non con un preventivo a sorpresa.",
}) {
  return (
    <section className="vr-section vr-section--noir">
      <div className="vr-shell vr-cta">
        <Reveal>
          <p className="vr-eyebrow vr-eyebrow--center">{eyebrow}</p>
          <h2 className="vr-display vr-h2">{title}</h2>
          <p className="vr-lead" style={{ marginInline: "auto" }}>
            {lead}
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "2.4rem",
            }}
          >
            <Link className="vr-btn vr-btn--light" href="/vittoria/contatti">
              Contatti
            </Link>
            <a className="vr-btn vr-btn--light" href={business.phoneHref}>
              {business.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
