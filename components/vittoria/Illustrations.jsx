/**
 * Illustrazioni a tratto — sostituiscono le foto che non possiamo avere
 * (il sito originale non e' raggiungibile dall'ambiente di sviluppo, e non
 * inventiamo fotografie spacciandole per progetti reali). Ogni scena e'
 * disegnata su misura per il testo che accompagna: la consolle d'ingresso
 * per l'hero, la cucina per "Casa di famiglia", la pianta per "Progetto".
 *
 * Un solo sprite <defs>, renderizzato una volta in app/vittoria/layout.js;
 * <Illo name="cucina"/> lo richiama via <use>. NOTA TECNICA: il contenuto
 * clonato da <use> non e' raggiungibile da selettori CSS esterni (le classi
 * su un <path> dentro <symbol> non corrispondono a ".vr-illo .qualcosa") —
 * solo l'EREDITARIETA' attraversa quel confine. Per questo lo stile di base
 * (tratto ink, nessun riempimento) e' impostato come attributi propri del
 * <g> di ogni simbolo — con "currentColor", ereditato in modo affidabile da
 * .vr-illo — e i due accenti in ottone sono scritti in esadecimale diretto
 * sulla singola forma, non tramite classe.
 */

const BRASS = "#a67c3d";
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
const accent = { fill: BRASS, stroke: BRASS, strokeLinecap: "round", strokeLinejoin: "round" };
const accentLine = { fill: "none", stroke: BRASS, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
const soft = { fill: "currentColor", stroke: "none", opacity: 0.08 };
const wall = { fill: "none", stroke: "currentColor", strokeWidth: 3.4, strokeLinecap: "round", strokeLinejoin: "round" };

export function IllustrationDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <symbol id="ill-atelier" viewBox="0 0 240 180">
          <g {...stroke}>
            <line x1="18" y1="152" x2="222" y2="152" />
            <ellipse {...soft} cx="120" cy="154" rx="72" ry="6" />
            <path d="M96,42 a24,24 0 0 1 48,0 v70 h-48 z" />
            <rect x="66" y="112" width="112" height="7" rx="2.5" />
            <line x1="78" y1="119" x2="74" y2="152" />
            <line x1="166" y1="119" x2="170" y2="152" />
            <rect x="26" y="130" width="34" height="7" rx="2.5" />
            <line x1="32" y1="137" x2="30" y2="152" />
            <line x1="54" y1="137" x2="56" y2="152" />
            <path {...accentLine} d="M156,102 q-6,-24 -20,-36" />
            <ellipse {...accent} cx="139" cy="59" rx="4.5" ry="7.5" transform="rotate(-32 139 59)" />
            <ellipse {...accent} cx="128" cy="45" rx="3.5" ry="6" transform="rotate(-45 128 45)" />
            <ellipse {...accent} cx="157" cy="104" rx="9" ry="11" />
          </g>
        </symbol>

        <symbol id="ill-living" viewBox="0 0 240 180">
          <g {...stroke}>
            <line x1="16" y1="158" x2="224" y2="158" />
            <rect x="16" y="82" width="118" height="60" rx="16" />
            <line x1="16" y1="120" x2="134" y2="120" />
            <line x1="58" y1="82" x2="58" y2="120" />
            <line x1="92" y1="82" x2="92" y2="120" />
            <line x1="30" y1="142" x2="28" y2="158" />
            <line x1="122" y1="142" x2="124" y2="158" />
            <path d="M156,158 v-32 q0,-26 27,-26 q27,0 27,26 v32 z" />
            <ellipse cx="140" cy="150" rx="17" ry="5" />
            <line x1="128" y1="153" x2="126" y2="158" />
            <line x1="152" y1="153" x2="154" y2="158" />
            <line x1="220" y1="54" x2="220" y2="158" />
            <path {...accent} d="M206,38 h28 l-8,16 h-12 z" />
          </g>
        </symbol>

        <symbol id="ill-kitchen" viewBox="0 0 240 180">
          <g {...stroke}>
            <line x1="30" y1="45" x2="210" y2="45" />
            <rect {...accent} x="60" y="30" width="14" height="11" rx="1.5" />
            <rect x="100" y="26" width="10" height="15" rx="1.5" />
            <rect x="128" y="30" width="18" height="11" rx="5" />
            <rect x="40" y="100" width="160" height="44" rx="4" />
            <line x1="35" y1="100" x2="205" y2="100" />
            <line x1="80" y1="108" x2="80" y2="144" />
            <line x1="160" y1="108" x2="160" y2="144" />
            <line x1="90" y1="20" x2="90" y2="52" />
            <ellipse {...accent} cx="90" cy="58" rx="12" ry="6" />
            <line x1="150" y1="20" x2="150" y2="52" />
            <ellipse {...accent} cx="150" cy="58" rx="12" ry="6" />
            <line x1="70" y1="144" x2="68" y2="162" />
            <line x1="170" y1="144" x2="172" y2="162" />
            <ellipse cx="60" cy="150" rx="9" ry="4" />
            <line x1="60" y1="154" x2="60" y2="168" />
            <ellipse cx="180" cy="150" rx="9" ry="4" />
            <line x1="180" y1="154" x2="180" y2="168" />
          </g>
        </symbol>

        <symbol id="ill-outdoor" viewBox="0 0 240 180">
          <g {...stroke}>
            <line x1="16" y1="160" x2="224" y2="160" />
            <path d="M30,160 L30,132 Q30,122 42,122 L70,122 Q80,122 80,130 L150,130 Q160,130 160,140 L160,160 Z" />
            <line x1="45" y1="130" x2="45" y2="160" />
            <ellipse {...accent} cx="188" cy="143" rx="15" ry="5" />
            <line x1="188" y1="148" x2="188" y2="160" />
            <ellipse cx="182" cy="138" rx="4" ry="3" />
            <line x1="205" y1="160" x2="205" y2="66" />
            <path {...accent} d="M172,66 Q205,42 238,66 Q205,58 172,66 Z" />
            <circle {...accentLine} cx="36" cy="32" r="9" />
            <line {...accentLine} x1="36" y1="14" x2="36" y2="20" />
            <line {...accentLine} x1="36" y1="44" x2="36" y2="50" />
            <line {...accentLine} x1="18" y1="32" x2="24" y2="32" />
            <line {...accentLine} x1="48" y1="32" x2="54" y2="32" />
            <line {...accentLine} x1="24" y1="20" x2="28" y2="24" />
            <line {...accentLine} x1="48" y1="44" x2="44" y2="40" />
          </g>
        </symbol>

        <symbol id="ill-study" viewBox="0 0 240 180">
          <g {...stroke}>
            <line x1="16" y1="160" x2="224" y2="160" />
            <rect x="28" y="110" width="140" height="7" rx="2" />
            <rect x="40" y="117" width="30" height="38" />
            <line x1="150" y1="117" x2="150" y2="160" />
            <rect x="92" y="128" width="30" height="7" rx="3" />
            <path d="M96,128 q-2,-16 10,-20 q12,4 10,20" />
            <line x1="98" y1="135" x2="98" y2="160" />
            <line x1="116" y1="135" x2="116" y2="160" />
            <line x1="182" y1="30" x2="182" y2="160" />
            <line x1="182" y1="30" x2="228" y2="30" />
            <line x1="182" y1="70" x2="228" y2="70" />
            <line x1="182" y1="110" x2="228" y2="110" />
            <line x1="182" y1="160" x2="228" y2="160" />
            <line x1="228" y1="30" x2="228" y2="160" />
            <rect {...accent} x="192" y="45" width="10" height="18" rx="1" />
            <rect x="206" y="48" width="10" height="15" rx="1" />
            <path d="M158,110 v-30" />
            <path {...accent} d="M150,80 l16,-6 l8,10 l-18,6 z" />
          </g>
        </symbol>

        <symbol id="ill-suite" viewBox="0 0 240 180">
          <g {...stroke}>
            <line x1="16" y1="160" x2="224" y2="160" />
            <rect x="55" y="38" width="100" height="60" rx="10" />
            <rect x="40" y="98" width="130" height="34" rx="6" />
            <rect x="52" y="90" width="34" height="16" rx="8" />
            <rect x="92" y="90" width="34" height="16" rx="8" />
            <path d="M40,120 q65,7 130,0" />
            <line x1="48" y1="132" x2="46" y2="160" />
            <line x1="162" y1="132" x2="164" y2="160" />
            <rect x="16" y="112" width="24" height="20" />
            <ellipse {...accent} cx="28" cy="102" rx="7" ry="4" />
            <line x1="28" y1="106" x2="28" y2="112" />
            <rect x="170" y="112" width="24" height="20" />
            <ellipse {...accent} cx="182" cy="102" rx="7" ry="4" />
            <line x1="182" y1="106" x2="182" y2="112" />
            <path {...accent} d="M94,24 q11,-14 22,0 z" />
            <line x1="105" y1="24" x2="105" y2="32" />
          </g>
        </symbol>

        <symbol id="ill-period" viewBox="0 0 240 180">
          <g {...stroke}>
            <line x1="16" y1="160" x2="224" y2="160" />
            <path d="M78,160 V72 A32,32 0 0 1 142,72 V160" />
            <line x1="110" y1="72" x2="110" y2="160" />
            <line x1="78" y1="118" x2="142" y2="118" />
            <rect x="18" y="96" width="46" height="64" />
            <path d="M14,96 h54 l-6,-10 h-42 z" />
            <line x1="41" y1="96" x2="41" y2="160" />
            <circle cx="55" cy="128" r="1.8" />
            <circle cx="27" cy="128" r="1.8" />
            <path {...accentLine} d="M108,30 l-3,10 h6 z" />
            <ellipse {...accent} cx="105" cy="46" rx="3" ry="4" />
            <ellipse {...accent} cx="118" cy="50" rx="3" ry="4" />
            <ellipse {...accent} cx="95" cy="52" rx="3" ry="4" />
          </g>
        </symbol>

        <symbol id="ill-plan" viewBox="0 0 240 180">
          <g {...stroke}>
            <rect {...wall} x="20" y="20" width="200" height="140" />
            <line {...wall} x1="132" y1="20" x2="132" y2="104" />
            <line {...wall} x1="132" y1="128" x2="132" y2="160" />
            <path d="M132,104 A24,24 0 0 1 156,128" />
            <line x1="132" y1="104" x2="132" y2="128" />
            <path d="M100,160 A20,20 0 0 0 120,140" />
            <line x1="100" y1="160" x2="120" y2="160" />
            <line x1="55" y1="20" x2="55" y2="12" />
            <line x1="75" y1="20" x2="75" y2="12" />
            <line x1="165" y1="20" x2="165" y2="12" />
            <line x1="185" y1="20" x2="185" y2="12" />
            <rect {...soft} x="42" y="60" width="60" height="30" rx="14" />
            <ellipse {...soft} cx="178" cy="90" rx="20" ry="14" />
            <line {...accentLine} x1="20" y1="172" x2="220" y2="172" />
            <line {...accentLine} x1="20" y1="168" x2="20" y2="176" />
            <line {...accentLine} x1="220" y1="168" x2="220" y2="176" />
            <line {...accentLine} x1="120" y1="168" x2="120" y2="176" />
          </g>
        </symbol>

        <symbol id="ill-shelf" viewBox="0 0 240 180">
          <g {...stroke}>
            <rect x="18" y="96" width="204" height="6" rx="1" />
            <line x1="30" y1="102" x2="30" y2="118" />
            <line x1="210" y1="102" x2="210" y2="118" />
            <rect x="34" y="70" width="34" height="8" rx="1" />
            <rect x="34" y="79" width="30" height="8" rx="1" />
            <rect x="34" y="88" width="34" height="8" rx="1" />
            <path {...accent} d="M92,96 q-2,-30 10,-34 q12,4 10,34 q-10,6 -20,0 z" />
            <path d="M140,96 q0,-14 18,-14 q18,0 18,14 q-9,6 -18,6 q-9,0 -18,-6 z" />
            <path d="M186,60 q10,-4 8,10 q-2,10 -12,10 q4,-12 4,-20 z" />
            <line x1="190" y1="80" x2="190" y2="96" />
            <path {...accentLine} d="M190,60 q6,-8 2,-16" />
          </g>
        </symbol>
      </defs>
    </svg>
  );
}

/** <Illo name="cucina" /> — richiama un simbolo dello sprite sopra. */
export default function Illo({ name, className = "" }) {
  return (
    <svg className={`vr-illo ${className}`.trim()} viewBox="0 0 240 180" aria-hidden="true">
      <use href={`#ill-${name}`} />
    </svg>
  );
}
