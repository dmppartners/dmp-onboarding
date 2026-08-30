import PageHead from "../../../components/vittoria/PageHead";
import SplitList from "../../../components/vittoria/SplitList";
import CtaBand from "../../../components/vittoria/CtaBand";
import Reveal from "../../../components/vittoria/Reveal";
import { pages, brands } from "../../../lib/vittoria/content";

const page = pages.architetti;

export const metadata = {
  title: "Supporto Architetti",
  description: page.lead,
};

export default function ArchitettiPage() {
  return (
    <>
      <PageHead {...page} />

      <section className="vr-section vr-section--tight">
        <div className="vr-shell">
          <SplitList items={page.sections} />
        </div>
      </section>

      <section className="vr-section vr-section--noir">
        <div className="vr-shell vr-manifesto__grid">
          <Reveal>
            <p className="vr-eyebrow">In atelier</p>
            <h2 className="vr-display vr-h2">Campionature da toccare, non da immaginare</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="vr-manifesto__quote">
              Un tessuto si giudica in mano, una finitura alla luce del pomeriggio. Per questo
              l&apos;atelier è aperto anche quando il progetto è tuo e il cliente pure.
            </p>
            <div className="vr-manifesto__chips">
              {brands.map((brand) => (
                <span className="vr-chip" key={brand}>
                  {brand}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Progettisti"
        title="Vieni a vedere la materioteca."
        lead="Scrivici che progetto hai per le mani: prepariamo le campionature giuste prima che tu arrivi."
      />
    </>
  );
}
