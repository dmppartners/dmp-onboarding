import PageHead from "../../../components/vittoria/PageHead";
import SplitList from "../../../components/vittoria/SplitList";
import CtaBand from "../../../components/vittoria/CtaBand";
import Reveal from "../../../components/vittoria/Reveal";
import Plate from "../../../components/vittoria/Plate";
import { pages } from "../../../lib/vittoria/content";

const page = pages.contract;

const tipologie = [
  { name: "Hotel", variant: "ottone" },
  { name: "Residence", variant: "rovere" },
  { name: "B&B", variant: "lino" },
  { name: "Ristoranti", variant: "vetro" },
  { name: "Bar", variant: "travertino" },
  { name: "Uffici", variant: "boucle" },
];

export const metadata = {
  title: "Contract",
  description: page.lead,
};

export default function ContractPage() {
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
          <Reveal className="vr-head vr-head--center">
            <p className="vr-eyebrow vr-eyebrow--center">Dove interveniamo</p>
            <h2 className="vr-display vr-h2">Sei tipologie, un solo metodo</h2>
          </Reveal>
          <Reveal className="vr-materials" delay={80}>
            {tipologie.map((item) => (
              <div className="vr-material" key={item.name}>
                <Plate variant={item.variant} frame={false} />
                <p className="vr-material__name">{item.name}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Strutture ricettive"
        title="Parliamo del tuo capitolato."
        lead="Mandaci le piante e il numero di camere: torniamo con una proposta di selezione e una stima dei tempi."
      />
    </>
  );
}
