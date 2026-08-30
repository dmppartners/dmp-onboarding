import Plate from "./Plate";
import Reveal from "./Reveal";

/** Testata comune alle pagine interne. */
export default function PageHead({ eyebrow, title, titleAccent, lead, plateIllo, plateCaption }) {
  return (
    <section className="vr-pagehead">
      <div className={`vr-shell${plateIllo ? " vr-pagehead__grid" : ""}`}>
        <Reveal>
          <p className="vr-eyebrow">{eyebrow}</p>
          <h1 className="vr-display vr-h1">
            <span style={{ display: "block" }}>{title}</span>
            {titleAccent ? <span className="vr-italic">{titleAccent}</span> : null}
          </h1>
          <p className="vr-lead">{lead}</p>
        </Reveal>
        {plateIllo ? (
          <Reveal delay={140}>
            <Plate illo={plateIllo} caption={plateCaption} arch />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
