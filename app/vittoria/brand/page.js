import PageHead from "../../../components/vittoria/PageHead";
import CtaBand from "../../../components/vittoria/CtaBand";
import Reveal from "../../../components/vittoria/Reveal";
import { pages, brands, brandNotes } from "../../../lib/vittoria/content";

const page = pages.brand;

export const metadata = {
  title: "Brand",
  description: page.lead,
};

export default function BrandPage() {
  return (
    <>
      <PageHead {...page} />

      <div className="vr-marquee" aria-hidden="true">
        <div className="vr-marquee__track">
          {[...brands, ...brands].map((brand, index) => (
            <span className="vr-marquee__item" key={`${brand}-${index}`}>
              {brand}
            </span>
          ))}
        </div>
      </div>

      <section className="vr-section vr-section--tight">
        <div className="vr-shell">
          <Reveal className="vr-brandgrid" style={{ marginTop: 0 }}>
            {brands.map((brand) => (
              <div className="vr-brandgrid__item" key={brand}>
                <p className="vr-brandgrid__name">{brand}</p>
                {brandNotes[brand] ? <p className="vr-brandgrid__note">{brandNotes[brand]}</p> : null}
              </div>
            ))}
          </Reveal>
          <Reveal className="vr-lead" style={{ marginTop: "2.6rem" }}>
            L&apos;elenco cambia: entrano piccole aziende che ci convincono, escono quelle che si
            ripetono. Chiedi in atelier che cosa è arrivato questo mese.
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="La selezione"
        title="Nessun marchio decide il tuo progetto."
        lead="Vieni a vedere come si comportano quando li mettiamo nella stessa stanza."
      />
    </>
  );
}
