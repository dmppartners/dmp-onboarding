import Link from "next/link";
import Plate from "../../components/vittoria/Plate";
import Reveal from "../../components/vittoria/Reveal";
import { business, home, works, brands } from "../../lib/vittoria/content";

const teaser = works.slice(0, 3);

export default function VittoriaHome() {
  return (
    <>
      {/* --------------------------------------------------------- hero */}
      <section className="vr-hero">
        <div className="vr-shell vr-hero__grid">
          <div>
            <Reveal>
              <p className="vr-eyebrow">{home.hero.eyebrow}</p>
              <h1 className="vr-display vr-h1 vr-hero__title">
                {home.hero.titleLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
                <span className="vr-italic">{home.hero.titleAccent}</span>
              </h1>
              <p className="vr-lead">{home.hero.lead}</p>
              <div className="vr-hero__actions">
                <Link className="vr-btn" href={home.hero.primary.href}>
                  {home.hero.primary.label}
                </Link>
                <Link className="vr-btn vr-btn--ghost" href={home.hero.secondary.href}>
                  {home.hero.secondary.label}
                </Link>
              </div>
              <div className="vr-hero__meta">
                <span>{business.addressShort}</span>
                <span>{business.hoursShort}</span>
                <span>{business.phone}</span>
              </div>
            </Reveal>
          </div>

          <Reveal className="vr-hero__plate" delay={140}>
            <Plate variant={home.hero.plate.variant} arch caption={home.hero.plate.caption} />
            <div className="vr-hero__badge">
              <strong>Dal {business.since}</strong>
              <span>nel centro di {business.city}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- numeri */}
      <section className="vr-shell">
        <Reveal className="vr-facts">
          {home.facts.map((fact) => (
            <div className="vr-facts__item" key={fact.label}>
              <p className="vr-facts__value">{fact.value}</p>
              <p className="vr-facts__label">{fact.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ----------------------------------------------------- manifesto */}
      <section className="vr-section vr-section--noir">
        <div className="vr-shell vr-manifesto__grid">
          <Reveal>
            <p className="vr-eyebrow">{home.manifesto.eyebrow}</p>
            <h2 className="vr-display vr-h2">{home.manifesto.title}</h2>
            <p className="vr-manifesto__sign">{home.manifesto.signature}</p>
          </Reveal>
          <Reveal delay={120}>
            <p className="vr-manifesto__quote">{home.manifesto.body[0]}</p>
            <p className="vr-body">{home.manifesto.body[1]}</p>
            <div className="vr-manifesto__chips">
              {home.materials.chips.map((chip) => (
                <span className="vr-chip" key={chip.name}>
                  {chip.name}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------- usp */}
      <section className="vr-section">
        <div className="vr-shell">
          <Reveal className="vr-head">
            <p className="vr-eyebrow">{home.usp.eyebrow}</p>
            <h2 className="vr-display vr-h2">{home.usp.title}</h2>
          </Reveal>
          <Reveal className="vr-usp" delay={80}>
            {home.usp.items.map((item) => (
              <div className="vr-usp__item" key={item.n}>
                <span className="vr-usp__n">{item.n}</span>
                <h3 className="vr-usp__title">{item.title}</h3>
                <p className="vr-usp__text">{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------- materie */}
      <section className="vr-section vr-section--warm">
        <div className="vr-shell">
          <Reveal className="vr-head vr-head--center">
            <p className="vr-eyebrow vr-eyebrow--center">{home.materials.eyebrow}</p>
            <h2 className="vr-display vr-h2">{home.materials.title}</h2>
            <p className="vr-lead">{home.materials.lead}</p>
          </Reveal>
          <Reveal className="vr-materials" delay={80}>
            {home.materials.chips.map((chip) => (
              <div className="vr-material" key={chip.name}>
                <Plate variant={chip.variant} frame={false} />
                <p className="vr-material__name">{chip.name}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- metodo */}
      <section className="vr-section">
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

      {/* ------------------------------------------------------- servizi */}
      <section className="vr-section vr-section--warm">
        <div className="vr-shell">
          <Reveal className="vr-head">
            <p className="vr-eyebrow">{home.services.eyebrow}</p>
            <h2 className="vr-display vr-h2">{home.services.title}</h2>
          </Reveal>
          <Reveal className="vr-services" delay={80}>
            {home.services.items.map((item) => (
              <Link className="vr-service" href={item.href} key={item.href}>
                <Plate variant={item.variant} frame={false} />
                <div className="vr-service__body">
                  <h3 className="vr-service__title">{item.title}</h3>
                  <p className="vr-service__text">{item.text}</p>
                  <span className="vr-service__more">Scopri →</span>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------- realizzazioni */}
      <section className="vr-section">
        <div className="vr-shell">
          <Reveal className="vr-head">
            <p className="vr-eyebrow">{home.worksTeaser.eyebrow}</p>
            <h2 className="vr-display vr-h2">{home.worksTeaser.title}</h2>
          </Reveal>
          <Reveal className="vr-works" delay={80}>
            {teaser.map((work) => (
              <article className="vr-work vr-work--std" key={work.title}>
                <div className="vr-work__frame">
                  <Plate variant={work.variant} frame={false} />
                </div>
                <div className="vr-work__meta">
                  <span>{work.place}</span>
                  <span>{work.year}</span>
                </div>
                <h3 className="vr-work__title">{work.title}</h3>
                <p className="vr-work__text">{work.text}</p>
                <div className="vr-work__mix">
                  {work.mix.map((brand) => (
                    <span key={brand}>{brand}</span>
                  ))}
                </div>
              </article>
            ))}
          </Reveal>
          <Reveal style={{ marginTop: "3rem" }}>
            <Link className="vr-link" href={home.worksTeaser.link.href}>
              {home.worksTeaser.link.label} →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- marchi */}
      <section className="vr-section vr-section--tight">
        <div className="vr-shell">
          <Reveal className="vr-head vr-head--center">
            <p className="vr-eyebrow vr-eyebrow--center">{home.brandsTeaser.eyebrow}</p>
            <h2 className="vr-display vr-h2">{home.brandsTeaser.title}</h2>
            <p className="vr-lead">{home.brandsTeaser.lead}</p>
          </Reveal>
        </div>
        <div className="vr-marquee" style={{ marginTop: "3.2rem" }} aria-hidden="true">
          <div className="vr-marquee__track">
            {[...brands, ...brands].map((brand, index) => (
              <span className="vr-marquee__item" key={`${brand}-${index}`}>
                {brand}
              </span>
            ))}
          </div>
        </div>
        <div className="vr-shell" style={{ marginTop: "2.6rem", textAlign: "center" }}>
          <Link className="vr-link" href={home.brandsTeaser.link.href}>
            {home.brandsTeaser.link.label} →
          </Link>
        </div>
      </section>

      {/* ----------------------------------------------------------- cta */}
      <section className="vr-section vr-section--noir">
        <div className="vr-shell vr-cta">
          <Reveal>
            <p className="vr-eyebrow vr-eyebrow--center">{home.cta.eyebrow}</p>
            <h2 className="vr-display vr-h2">{home.cta.title}</h2>
            <p className="vr-lead" style={{ marginInline: "auto" }}>
              {home.cta.lead}
            </p>
            <Link className="vr-btn vr-btn--light" href="/vittoria/contatti">
              Scrivici o passa in atelier
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
