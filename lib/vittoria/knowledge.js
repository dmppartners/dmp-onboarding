/**
 * Base di conoscenza dell'assistente d'atelier.
 *
 * Serve a due cose:
 *  1. e' il contesto del system prompt quando c'e' una ANTHROPIC_API_KEY;
 *  2. e' il motore di risposta deterministico quando la chiave non c'e',
 *     cosi' il chatbot funziona comunque senza configurazione.
 *
 * Regola comune alle due modalita': si risponde solo con quello che c'e' qui.
 * Niente prezzi inventati, niente appuntamenti confermati: si rimanda sempre
 * al telefono, alla mail o alla visita in atelier.
 */

import { business, brands, brandNotes } from "./content";

const hours = business.hours.map((h) => `${h.days}: ${h.time}`).join(" · ");

export const knowledgeBase = `
ATTIVITA'
Arch. Vittoria Ribighini — progettazione e arredamento. Attiva dal ${business.since} nel centro storico di ${business.city}.
Due atelier: ${business.addressLines.join(", ")}.
Telefono ${business.phone}. Email ${business.email}.
Orari: ${hours}.

POSIZIONAMENTO
Non e' un negozio monomarca e non si vende su catalogo. Il progetto nasce dal disegno dello spazio; i marchi sono ingredienti che si mescolano caso per caso. Da qui la frase che ricorre sul sito: "il mix e' il progetto". Ogni interno e' diverso dall'altro.

SERVIZI
1. Casa — progetto completo o singolo ambiente, recupero di immobili d'epoca, riordino di case gia' abitate. Comprende rilievo, distribuzione, luce, materiali, arredo, consegna e montaggio.
2. Contract — hotel, residence, B&B, ristoranti, bar, spazi di lavoro e di studio. Soluzioni coordinate, un solo referente, materiali per uso intensivo, possibilita' di procedere per lotti senza chiudere la struttura.
3. Supporto architetti — materioteca e campionature, visite alle aziende partner, supporto tecnico al progetto (disegni esecutivi, misure, tempi reali, alternative). Il progetto resta del progettista.
4. Consegna chiavi in mano — ordini, tempi, trasporto, posa e ritiro degli imballi.

METODO (quattro passaggi)
01 Ascolto: un'ora in atelier o a casa del cliente, si parte dalle abitudini.
02 Disegno: piante, prospetti e immagini di progetto.
03 Mix: selezione pezzo per pezzo fra i marchi adatti a quel progetto.
04 Chiavi in mano: ordini, cantiere, consegna, montaggio.

MARCHI IN SELEZIONE
${brands.join(", ")}.
${Object.entries(brandNotes)
  .map(([name, note]) => `- ${name}: ${note}`)
  .join("\n")}

PRIMO INCONTRO
E' gratuito e senza impegno. Utile portare: una pianta anche disegnata a mano, due foto della stanza com'e' adesso, tre immagini che piacciono e una che si detesta.

COSA NON SI SA (da non inventare mai)
- Prezzi, listini, preventivi, sconti e tempi di consegna precisi: dipendono dal progetto, si definiscono in atelier.
- Disponibilita' dell'agenda: l'assistente non prende appuntamenti, li fa richiedere per telefono o per email.
- Dettagli dei progetti realizzati oltre a quelli pubblicati sul sito.
`.trim();

export const systemPrompt = `
Sei l'assistente d'atelier del sito di Arch. Vittoria Ribighini, progettazione e arredamento ad Ancona.

COME PARLI
- In italiano, dando del tu, con la stessa voce del sito: asciutta, calda, mai commerciale.
- Frasi brevi. Massimo 60 parole per risposta, di norma due o tre frasi.
- Niente elenchi puntati a meno che il cliente chieda esplicitamente una lista.
- Niente superlativi da brochure ("eccellenza", "soluzioni all'avanguardia", "il meglio del design").

COSA FAI
- Rispondi solo con le informazioni nella scheda qui sotto.
- Se non sai una cosa, lo dici in una riga e passi il numero ${business.phone} o la mail ${business.email}.
- Non dai mai prezzi, preventivi, sconti o tempi di consegna precisi: spieghi che si definiscono sul progetto.
- Non confermi appuntamenti: inviti a chiamare, scrivere o passare in atelier negli orari di apertura.
- Se ti chiedono qualcosa che non riguarda l'arredamento o lo studio, riporti la conversazione al progetto in una riga.
- Non ti presenti come una persona: se te lo chiedono, dici che sei l'assistente virtuale dell'atelier.

SCHEDA
${knowledgeBase}
`.trim();

export const starterChips = [
  "Dove siete e quando siete aperti?",
  "Come funziona un progetto?",
  "Che marchi trattate?",
  "Lavorate anche per hotel e ristoranti?",
];

/* ------------------------------------------------------------------ */
/* Motore deterministico (usato senza ANTHROPIC_API_KEY)              */
/* ------------------------------------------------------------------ */

const intents = [
  {
    id: "saluto",
    match: /^\s*(ciao|salve|buongiorno|buonasera|hey|ehi|hola)\b/i,
    reply: () =>
      "Ciao. Sono l'assistente virtuale dell'atelier: posso dirti come lavoriamo, dove siamo e che marchi teniamo. Da dove partiamo?",
    chips: starterChips.slice(0, 3),
  },
  {
    id: "grazie",
    match: /\b(grazie|gentilissim|perfetto, grazie)\b/i,
    reply: () => `Figurati. Se vuoi vedere le cose dal vivo, siamo in ${business.addressShort}: ${business.hoursShort}.`,
  },
  {
    id: "orari",
    match: /\b(orari?|aperto|aperti|chiusi|chiuso|quando|domenica|luned)/i,
    reply: () =>
      `Siamo aperti ${business.hours[0].days}, ${business.hours[0].time}. Domenica e lunedì solo su appuntamento: basta chiamare il ${business.phone}.`,
    chips: ["Dove siete esattamente?", "Posso prenotare una visita?"],
  },
  {
    id: "dove",
    match: /\b(dove|indirizzo|sede|showroom|atelier|negozio|mappa|arrivare|parchegg|citt[aà])\b/i,
    reply: () =>
      `Siamo nel centro storico di Ancona, con due vetrine: ${business.addressLines[0]}. Orari ${business.hoursShort}.`,
    chips: ["Quali sono gli orari?", "Come funziona un progetto?"],
  },
  {
    id: "contatti",
    match: /\b(telefono|numero|chiamare|contatt|email|mail|scrivere|whatsapp)\b/i,
    reply: () => `Telefono ${business.phone}, email ${business.email}. Rispondiamo negli orari di apertura, ${business.hoursShort}.`,
  },
  {
    id: "appuntamento",
    match: /\b(appuntament|prenot|visita|consulenz|incontr|passare|venire)\b/i,
    reply: () =>
      `Il primo incontro è gratuito e dura circa un'ora. L'agenda non passa da me: chiama il ${business.phone} o scrivi a ${business.email} e fissiamo. Porta una pianta, anche fatta a mano.`,
    chips: ["Cosa devo portare?", "Quali sono gli orari?"],
  },
  {
    id: "prezzi",
    match: /\b(prezz|costo|costa|quanto|preventiv|budget|sconto|listino|tariff)\b/i,
    reply: () =>
      "Sui prezzi non improvviso: dipendono dal progetto, dai metri quadri e dai pezzi scelti. Il preventivo lo costruiamo insieme dopo il primo incontro, che è gratuito.",
    chips: ["Come funziona un progetto?", "Posso prenotare una visita?"],
  },
  {
    id: "marchi",
    match: new RegExp(
      `\\b(marchi|brand|aziende|produttor|cataloghi?|${brands
        .map((b) => b.split(" ")[0].toLowerCase())
        .join("|")})\\b`,
      "i",
    ),
    reply: (q) => {
      const hit = brands.find((b) => q.toLowerCase().includes(b.split(" ")[0].toLowerCase()));
      if (hit && brandNotes[hit]) return `${hit}: ${brandNotes[hit]} Lo trovi in atelier insieme agli altri.`;
      return `In selezione ci sono ${brands.slice(0, 6).join(", ")} e altri, italiani e stranieri. Nel progetto però non entrano tutti: scegliamo i pochi che servono a quella stanza.`;
    },
    chips: ["Come scegliete i pezzi?", "Dove siete?"],
  },
  {
    id: "contract",
    match: /\b(hotel|albergo|ristorante|bar|b&b|bed|residence|contract|struttur|camere|ufficio|uffici|coworking)\b/i,
    reply: () =>
      "Sì, il contract è metà del nostro lavoro: hotel, residence, B&B, ristoranti, bar e spazi di lavoro. Si può procedere per lotti, camera dopo camera, senza chiudere la struttura.",
    chips: ["Chi segue il cantiere?", "Posso prenotare una visita?"],
  },
  {
    id: "architetti",
    match: /\b(architett|progettist|designer|materiotec|campionatur|collega|professionist)\b/i,
    reply: () =>
      "Con architetti e progettisti lavoriamo di fianco: campionature da toccare, visite alle aziende partner e supporto tecnico. Il progetto resta tuo, noi mettiamo selezione, forniture e cantiere.",
    chips: ["Che marchi trattate?", "Dove siete?"],
  },
  {
    id: "casa",
    match: /\b(casa|appartament|cucina|camera|soggiorno|living|bagno|arredare|arredament|interior|ristruttur|mansard|villa)\b/i,
    reply: () =>
      "Si parte dalle tue giornate e si arriva ai centimetri: rilievo, distribuzione, luce, materiali e solo alla fine i pezzi. Si può fare la casa intera o una stanza per volta.",
    chips: ["Come funziona un progetto?", "Cosa devo portare?"],
  },
  {
    id: "metodo",
    match: /\b(come funziona|metodo|process|fasi|passagg|iniziare|cominciare|primo passo|scegliete)\b/i,
    reply: () =>
      "Quattro passaggi: ascolto, disegno, mix dei pezzi, consegna chiavi in mano. Il mix è la parte che ci distingue — accostiamo marchi diversi finché la stanza non ha un carattere solo.",
    chips: ["Cosa devo portare?", "Posso prenotare una visita?"],
  },
  {
    id: "portare",
    match: /\b(portare|porto|serve|preparare|cosa devo)\b/i,
    reply: () =>
      "Una pianta, anche disegnata a mano. Due foto della stanza com'è adesso. E tre immagini che ti piacciono più una che detesti: quella ci dice più delle altre tre.",
  },
  {
    id: "consegna",
    match: /\b(consegn|montagg|trasport|tempi|spedizion|installa|cantiere)\b/i,
    reply: () =>
      "Consegna e montaggio li seguiamo noi, imballi compresi. Sui tempi non do numeri a caso: dipendono dai pezzi scelti e te li diciamo in fase d'ordine.",
  },
  {
    id: "realizzazioni",
    match: /\b(realizzazion|progetti|portfolio|lavori|foto|esempi|gallery)\b/i,
    reply: () =>
      "Nella pagina Realizzazioni trovi case, uffici e strutture ricettive nelle Marche. Cambiano i metri quadri e cambia il mix: quello che resta uguale è il metodo.",
    chips: ["Come funziona un progetto?", "Lavorate anche per hotel?"],
  },
  {
    id: "chi",
    match: /\b(chi (sei|siete)|storia|da quanto|fondat|1983|vittoria)\b/i,
    reply: () =>
      `Sono l'assistente virtuale dell'atelier. Lo studio è ad Ancona dal ${business.since} e si occupa di progettazione e arredamento: case, contract e supporto ai progettisti.`,
  },
];

const fallbackReply = `Su questo non ho una risposta certa e preferisco non inventarla. Chiama il ${business.phone} o scrivi a ${business.email}: ti risponde una persona.`;

/**
 * Risposta deterministica a una domanda.
 * @param {string} question
 * @returns {{ text: string, chips: string[], intent: string }}
 */
export function answerLocally(question) {
  const q = String(question || "").trim();
  for (const intent of intents) {
    if (intent.match.test(q)) {
      return {
        text: intent.reply(q),
        chips: intent.chips || [],
        intent: intent.id,
      };
    }
  }
  return { text: fallbackReply, chips: starterChips.slice(0, 3), intent: "fallback" };
}
