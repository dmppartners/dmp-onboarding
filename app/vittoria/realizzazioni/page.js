import PageHead from "../../../components/vittoria/PageHead";
import CtaBand from "../../../components/vittoria/CtaBand";
import Reveal from "../../../components/vittoria/Reveal";
import Plate from "../../../components/vittoria/Plate";
import { pages, works } from "../../../lib/vittoria/content";

const page = pages.realizzazioni;

export const metadata = {
  title: "Realizzazioni",
  description: page.lead,
};

export default function RealizzazioniPage() {
  return (
    <>
      <PageHead {...page} />

      <section className="vr-section vr-section--tight">
        <div className="vr-shell">
          <div className="vr-works" style={{ marginTop: 0 }}>
            {works.map((work, index) => (
              <Reveal
                as="article"
                className={`vr-work vr-work--${work.size}`}
                key={work.title}
                delay={(index % 3) * 90}
              >
                <div className="vr-work__frame">
                  <Plate variant={work.variant} frame={false} />
                </div>
                <div className="vr-work__meta">
                  <span>{work.place}</span>
                  <span>{work.year}</span>
                </div>
                <h2 className="vr-work__title">{work.title}</h2>
                <p className="vr-work__text">{work.text}</p>
                <div className="vr-work__mix">
                  {work.mix.map((brand) => (
                    <span key={brand}>{brand}</span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Il prossimo"
        title="Il tuo, per ora, è ancora una pianta."
        lead="Raccontaci lo spazio e le abitudini di chi ci vive: il resto è il nostro mestiere."
      />
    </>
  );
}
