import Reveal from "./Reveal";

/** Griglia di blocchi testuali con filetti, usata nelle pagine di servizio. */
export default function SplitList({ items }) {
  return (
    <Reveal className="vr-split">
      {items.map((item) => (
        <div className="vr-split__item" key={item.title}>
          <h2 className="vr-split__title">{item.title}</h2>
          <p className="vr-split__text">{item.text}</p>
        </div>
      ))}
    </Reveal>
  );
}
