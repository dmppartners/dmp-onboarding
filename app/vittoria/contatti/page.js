import PageHead from "../../../components/vittoria/PageHead";
import Reveal from "../../../components/vittoria/Reveal";
import Plate from "../../../components/vittoria/Plate";
import ContactForm from "../../../components/vittoria/ContactForm";
import { pages, business } from "../../../lib/vittoria/content";

const page = pages.contatti;

export const metadata = {
  title: "Contatti",
  description: page.lead,
};

export default function ContattiPage() {
  return (
    <>
      <PageHead {...page} />

      <section className="vr-section vr-section--tight">
        <div className="vr-shell">
          <Reveal className="vr-contact" style={{ marginTop: 0 }}>
            <div>
              <p className="vr-contact__label">Atelier</p>
              <p className="vr-contact__value">
                {business.addressLines.map((line) => (
                  <span key={line} style={{ display: "block" }}>
                    {line}
                  </span>
                ))}
              </p>
              <p className="vr-contact__note">
                <a href={business.mapsUrl} target="_blank" rel="noreferrer">
                  Apri la mappa →
                </a>
              </p>
            </div>

            <div>
              <p className="vr-contact__label">Telefono</p>
              <p className="vr-contact__value">
                <a href={business.phoneHref}>{business.phone}</a>
              </p>
              <p className="vr-contact__note">Se stiamo disegnando, richiamiamo noi.</p>
            </div>

            <div>
              <p className="vr-contact__label">Email</p>
              <p className="vr-contact__value">
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </p>
              <p className="vr-contact__note">Rispondiamo in giornata, salvo cantieri.</p>
            </div>

            <div>
              <p className="vr-contact__label">Orari</p>
              {business.hours.map((slot) => (
                <p className="vr-contact__value" key={slot.days} style={{ fontSize: "1.15rem" }}>
                  {slot.days}
                  <span style={{ display: "block", fontFamily: "var(--text)", fontSize: "0.92rem", color: "var(--ink-soft)" }}>
                    {slot.time}
                  </span>
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="vr-section vr-section--warm">
        <div className="vr-shell vr-manifesto__grid">
          <Reveal>
            <p className="vr-eyebrow">Scrivici</p>
            <h2 className="vr-display vr-h2">Due righe bastano.</h2>
            <p className="vr-lead">
              Non serve un capitolato: dicci dove, quanti metri e cosa non ti torna. Al resto
              pensiamo al primo incontro.
            </p>
            <ContactForm />
          </Reveal>
          <Reveal delay={120}>
            <Plate variant="travertino" arch caption="Via Pizzecolli 2 · Ancona" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
