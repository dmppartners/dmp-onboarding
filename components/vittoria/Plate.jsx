/**
 * Superficie materica generata in CSS (travertino, rovere, ottone, boucle,
 * lino, vetro fume').
 *
 * E' anche lo slot fotografico del sito: passando `src` la stessa cornice
 * ospita l'immagine reale, senza toccare il layout.
 */
export default function Plate({
  variant = "travertino",
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
    `vr-plate--${variant}`,
    arch ? "vr-plate--arch" : "",
    frame ? "vr-plate--frame" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={style} role={src ? undefined : "presentation"}>
      {src ? <img src={src} alt={alt} loading="lazy" /> : null}
      {caption ? <span className="vr-plate__caption">{caption}</span> : null}
    </div>
  );
}
