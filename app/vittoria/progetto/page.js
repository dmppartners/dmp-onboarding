import PageHead from "../../../components/vittoria/PageHead";
import SplitList from "../../../components/vittoria/SplitList";
import CtaBand from "../../../components/vittoria/CtaBand";
import Reveal from "../../../components/vittoria/Reveal";
import Plate from "../../../components/vittoria/Plate";
import { pages, home } from "../../../lib/vittoria/content";

const page = pages.progetto;

export const metadata = {
  title: "Arredamento casa",
  description: page.lead,
};

export default function ProgettoPage() {
  return (
    <>
      <PageHead {...page} />

      <section className="vr-section vr-section--tight">
        <div className="vr-shell">
          <SplitList items={page.sections} />
        </div>
      </section>

      <section className="vr-section vr-section--warm">
        <div className="vr-shell">
          <Reveal className="vr-head">
            <p className="vr-eyebrow">{home.method.eyebrow}</p>
            <h2 className="vr-display vr-h2">{home.method.title}</h2>
          </Reveal>
          <Reveal className="vr-method" delay={80}>
            {home.method.steps.map((step) => (
              <div className="vr-method__step" key={step.n}>
                <span className="vr-method__n">{step.n}</span>
                <h3 className="vr-method__title">{step.title}</h3>
                <p className="vr-method__text">{step.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="vr-section">
        <div className="vr-shell vr-manifesto__grid">
          <Reveal>
            <p className="vr-eyebrow">Preparativi</p>
            <h2 className="vr-display vr-h2">{page.closing.title}</h2>
            <ul className="vr-checklist">
              {page.closing.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <Plate variant="lino" caption="Lino grezzo · rovere naturale" />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
