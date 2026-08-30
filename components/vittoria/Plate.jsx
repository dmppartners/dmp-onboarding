import Illo from "./Illustrations";

/**
 * Superficie materica generata in CSS (travertino, rovere, ottone, boucle,
 * lino, vetro fume') — usata per i campioni di materiale.
 *
 * Con `illo` diventa invece una "scena": un fondo chiaro piatto che ospita
 * un'illustrazione a tratto (vedi Illustrations.jsx), scelta per essere
 * coerente con il testo del blocco — la cucina per "Casa di famiglia",
 * la pianta per "Progetto", eccetera.
 *
 * In entrambi i casi resta lo slot fotografico del sito: passando `src` la
 * stessa cornice ospita l'immagine reale, senza toccare il layout.
 */
export default function Plate({
  variant = "travertino",
  illo,
  caption,
  src,
  alt = "",
  arch = false,
  frame = true,
  className = "",
  style,
}) {
  const classes = [
    "vr-plate",
    illo ? "vr-plate--scene" : `vr-plate--${variant}`,
    arch ? "vr-plate--arch" : "",
    frame ? "vr-plate--frame" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={style} role={src ? undefined : "presentation"}>
      {src ? <img src={src} alt={alt} loading="lazy" /> : illo ? <Illo name={illo} /> : null}
      {caption ? <span className="vr-plate__caption">{caption}</span> : null}
    </div>
  );
}
