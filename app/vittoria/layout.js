import "./vittoria.css";
import Header from "../../components/vittoria/Header";
import Footer from "../../components/vittoria/Footer";
import ChatWidget from "../../components/vittoria/ChatWidget";
import { IllustrationDefs } from "../../components/vittoria/Illustrations";
import { business } from "../../lib/vittoria/content";

export const metadata = {
  title: {
    default: "Arch. Vittoria Ribighini » Progettazione e arredamento",
    template: "Arch. Vittoria Ribighini » %s",
  },
  description:
    `Progettazione e arredamento ad ${business.city} dal ${business.since}. Marchi mescolati su misura, dal disegno alla consegna chiavi in mano.`,
  // Anteprima: non deve finire in indice e fare concorrenza al sito vero.
  robots: { index: false, follow: false },
};

const FONTS =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap";

export default function VittoriaLayout({ children }) {
  return (
    <div className="vr">
      {/* Le comparse allo scroll partono solo se il JS gira: senza questa
          classe il contenuto resta visibile a crawler, stampa e no-script. */}
      <script
        dangerouslySetInnerHTML={{
          __html: "document.documentElement.classList.add('vr-js')",
        }}
      />
      {/* Font del marchio. <link> invece di next/font: il build resta
          possibile anche senza accesso di rete a fonts.googleapis.com. */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={FONTS} />
      <IllustrationDefs />
      <Header />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
