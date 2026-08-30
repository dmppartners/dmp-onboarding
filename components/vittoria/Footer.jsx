import Link from "next/link";
import Logo from "./Logo";
import { business, nav, footer } from "../../lib/vittoria/content";

export default function Footer() {
  return (
    <footer className="vr-footer">
      <div className="vr-shell">
        <div className="vr-footer__grid">
          <div>
            <Logo light />
            <p className="vr-footer__claim">{footer.claim}</p>
          </div>

          <div>
            <p className="vr-footer__title">Atelier</p>
            <ul>
              {business.addressLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
              <li>
                <a href={business.mapsUrl} target="_blank" rel="noreferrer">
                  Apri la mappa
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="vr-footer__title">Contatti</p>
            <ul>
              <li>
                <a href={business.phoneHref}>{business.phone}</a>
              </li>
              <li>
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </li>
              {business.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="vr-footer__title">Pagine</p>
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="vr-footer__bottom">
          <span>{footer.legal}</span>
          <span>{business.hoursShort}</span>
        </div>
      </div>
    </footer>
  );
}
