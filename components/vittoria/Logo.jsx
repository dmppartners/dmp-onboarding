import { wordmark } from "../../lib/vittoria/brand";

/**
 * Marchio tipografico: monogramma ad arco (il "Arch." del nome, e le volte del
 * centro storico di Ancona) piu' il nome in serif d'impaginato.
 * Se arriva il logo vettoriale originale, va sostituito solo l'<svg>.
 */
export default function Logo({ light = false, compact = false }) {
  return (
    <span className={`vr-logo${light ? " vr-logo--light" : ""}`}>
      <svg
        className="vr-logo__mark"
        viewBox="0 0 34 40"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M1.6 39.2V17.4a15.4 15.4 0 0 1 30.8 0v21.8"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path d="M1.6 39.2h30.8" stroke="currentColor" strokeWidth="1" />
        <text
          x="17"
          y="27.5"
          textAnchor="middle"
          fill="currentColor"
          fontFamily="Cormorant Garamond, Georgia, serif"
          fontSize="13.5"
          letterSpacing="0.5"
        >
          {wordmark.monogram}
        </text>
      </svg>
      {!compact && (
        <span className="vr-logo__type">
          <span className="vr-logo__name">
            {wordmark.first} <em>{wordmark.last}</em>
          </span>
          <span className="vr-logo__sub">{wordmark.payoff}</span>
        </span>
      )}
    </span>
  );
}
