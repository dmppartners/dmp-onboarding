/**
 * Tutti i testi del sito in un file solo.
 *
 * I dati di contatto, gli orari, i marchi e i servizi provengono dalle pagine
 * pubbliche di vittoriaribighini.it. Le voci marcate PLACEHOLDER sono materiale
 * di impaginazione da sostituire con i contenuti reali (progetti e fotografie).
 */

export const business = {
  name: "Vittoria Ribighini",
  prefix: "Arch.",
  payoff: "Progettazione e arredamento",
  since: 1983,
  city: "Ancona",
  addressLines: ["Via Pizzecolli 2 — Via della Catena 2", "60123 Ancona"],
  addressShort: "Via Pizzecolli 2 · Ancona",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Via+Pizzecolli+2+Ancona",
  phone: "+39 071 204311",
  phoneHref: "tel:+39071204311",
  email: "info@vittoriaribighini.it",
  hours: [
    { days: "Martedì — Sabato", time: "9.30 — 12.30 · 16.30 — 19.30" },
    { days: "Domenica e Lunedì", time: "su appuntamento" },
  ],
  hoursShort: "Mar—Sab 9.30–12.30 / 16.30–19.30",
  social: [
    { label: "Facebook", href: "https://www.facebook.com/Vittoriaribighini/" },
  ],
};

export const nav = [
  { label: "Progetto", href: "/vittoria/progetto" },
  { label: "Realizzazioni", href: "/vittoria/realizzazioni" },
  { label: "Contract", href: "/vittoria/contract" },
  { label: "Architetti", href: "/vittoria/architetti" },
  { label: "Marchi", href: "/vittoria/brand" },
  { label: "Contatti", href: "/vittoria/contatti" },
];

export const home = {
  hero: {
    eyebrow: `Ancona — dal ${business.since}`,
    titleLines: ["Nessuna casa", "dovrebbe somigliare"],
    titleAccent: "a un catalogo.",
    lead:
      "Mescoliamo marchi, epoche e materiali finché lo spazio non ha il tuo carattere. Un progetto alla volta, disegnato su misura.",
    primary: { label: "Prenota una visita", href: "/vittoria/contatti" },
    secondary: { label: "Guarda le realizzazioni", href: "/vittoria/realizzazioni" },
    plate: { variant: "travertino", caption: "Travertino · ottone · rovere" },
  },

  facts: [
    { value: "1983", label: "l'anno in cui abbiamo aperto" },
    { value: "2", label: "atelier nel centro storico" },
    { value: "40+", label: "marchi selezionati, mai tutti insieme" },
    { value: "1", label: "progetto per volta" },
  ],

  manifesto: {
    eyebrow: "Il nostro modo di lavorare",
    title: "Il mix è il progetto.",
    body: [
      "Quaranta marchi in showroom non sono quaranta soluzioni: sono quaranta ingredienti. Il progetto comincia quando smettono di essere cataloghi separati e diventano una stanza sola.",
      "Per questo da noi non escono due interni uguali. Un pezzo artigianale accanto a un sistema tecnico, un tessuto morbido su un pavimento severo: l'accostamento è la firma.",
    ],
    signature: "Arch. Vittoria Ribighini",
  },

  usp: {
    eyebrow: "Perché siamo diversi",
    title: "Quattro cose che non troverai altrove",
    items: [
      {
        n: "01",
        title: "Su misura, non su listino",
        text: "Il progetto nasce dal disegno dello spazio, non dalla pagina di un catalogo. I mobili arrivano dopo.",
      },
      {
        n: "02",
        title: "Marchi mescolati con criterio",
        text: "Nomi noti e piccole eccellenze scelte una a una. Convivono solo quando il progetto lo chiede.",
      },
      {
        n: "03",
        title: "Dal rilievo alla chiave",
        text: "Disegno, direzione, ordini, consegna e montaggio. Un interlocutore unico, dall'inizio alla fine.",
      },
      {
        n: "04",
        title: "Quarant'anni di occhio",
        text: `Dal ${business.since} nel centro di Ancona. Sappiamo che cosa invecchia bene e che cosa stanca in due stagioni.`,
      },
    ],
  },

  materials: {
    eyebrow: "La materia prima",
    title: "Cominciamo da qui",
    lead:
      "Prima dei mobili scegliamo le materie. Sono loro a decidere quali marchi possono stare nella stessa stanza.",
    chips: [
      { name: "Travertino", variant: "travertino" },
      { name: "Ottone brunito", variant: "ottone" },
      { name: "Rovere naturale", variant: "rovere" },
      { name: "Bouclé", variant: "boucle" },
      { name: "Lino grezzo", variant: "lino" },
      { name: "Vetro fumé", variant: "vetro" },
    ],
  },

  method: {
    eyebrow: "Come si lavora insieme",
    title: "Quattro passaggi, nessuna sorpresa",
    steps: [
      {
        n: "01",
        title: "Ascolto",
        text: "Un'ora in atelier, o a casa tua. Prima le abitudini, poi i mobili.",
      },
      {
        n: "02",
        title: "Disegno",
        text: "Piante, prospetti, immagini di progetto. Vedi la stanza prima che esista.",
      },
      {
        n: "03",
        title: "Mix",
        text: "Selezione pezzo per pezzo, tra i marchi giusti per quel progetto e non per tutti.",
      },
      {
        n: "04",
        title: "Chiavi in mano",
        text: "Ordini, tempi, consegna e montaggio. A te resta solo da entrare.",
      },
    ],
  },

  services: {
    eyebrow: "Cosa facciamo",
    title: "Quattro modi di lavorare con noi",
    items: [
      {
        title: "Casa",
        text: "Progetto completo o singolo ambiente, dal riordino di una casa vissuta al recupero di un immobile d'epoca.",
        href: "/vittoria/progetto",
        variant: "rovere",
      },
      {
        title: "Contract",
        text: "Hotel, residence, B&B, ristoranti, bar e spazi di lavoro: soluzioni coordinate per grandi e piccole strutture.",
        href: "/vittoria/contract",
        variant: "vetro",
      },
      {
        title: "Supporto architetti",
        text: "Materioteca, campionature e visite alle aziende partner per chi progetta di mestiere.",
        href: "/vittoria/architetti",
        variant: "ottone",
      },
      {
        title: "Marchi",
        text: "Italiani e stranieri, celebri e da scoprire: la selezione da cui peschiamo gli ingredienti.",
        href: "/vittoria/brand",
        variant: "boucle",
      },
    ],
  },

  worksTeaser: {
    eyebrow: "Realizzazioni",
    title: "Ogni progetto è un mix diverso",
    link: { label: "Tutte le realizzazioni", href: "/vittoria/realizzazioni" },
  },

  brandsTeaser: {
    eyebrow: "La selezione",
    title: "I marchi sono gli ingredienti",
    lead:
      "Nessun monomarca, nessuna esclusiva da difendere. Solo aziende che reggono il confronto quando finiscono nella stessa stanza.",
    link: { label: "Tutti i marchi", href: "/vittoria/brand" },
  },

  cta: {
    eyebrow: "Il primo passo",
    title: "Vieni a vedere come mescoliamo.",
    lead:
      "Un'ora in atelier, senza impegno: porti una pianta, anche fatta a mano, e usciamo con una direzione.",
  },
};

/**
 * PLACEHOLDER — schede di progetto d'impaginazione.
 * Sostituire titolo, luogo, anno, mix e fotografie con le realizzazioni reali:
 * la struttura del dato non cambia (title, place, year, mix, variant, text).
 */
export const works = [
  {
    title: "Appartamento sul porto",
    place: "Ancona",
    year: "2024",
    mix: ["Gervasoni", "Extendo", "Paola Lenti"],
    variant: "travertino",
    text: "Un living lungo e stretto tenuto insieme da un sistema a parete su misura e da tre sedute che non appartengono alla stessa famiglia.",
    size: "wide",
  },
  {
    title: "Casa di famiglia in centro storico",
    place: "Ancona",
    year: "2023",
    mix: ["Alivar", "Kastel", "Arrital"],
    variant: "rovere",
    text: "Soffitti alti, pavimenti originali, cucina contemporanea: il pezzo nuovo entra solo dove serve.",
    size: "tall",
  },
  {
    title: "Terrazza sul Conero",
    place: "Riviera del Conero",
    year: "2024",
    mix: ["Paola Lenti", "Alias"],
    variant: "boucle",
    text: "Outdoor trattato come un salotto: tessuti tecnici, colore, e nessuna sedia di plastica.",
    size: "std",
  },
  {
    title: "Studio professionale",
    place: "Ancona",
    year: "2023",
    mix: ["Arper", "Kastel", "Extendo"],
    variant: "vetro",
    text: "Sala d'attesa, due postazioni e un archivio invisibile. L'ufficio che non sembra un ufficio.",
    size: "std",
  },
  {
    title: "Suite in residence",
    place: "Marche",
    year: "2022",
    mix: ["Bonaldo", "Battistella Nidi"],
    variant: "ottone",
    text: "Ventidue metri quadri che devono sembrare quaranta: contract, ma con la cura di una casa.",
    size: "std",
  },
  {
    title: "Recupero di una casa d'epoca",
    place: "Ancona",
    year: "2022",
    mix: ["Cattelan Italia", "Clei", "Gervasoni"],
    variant: "lino",
    text: "Un immobile fermo da vent'anni rimesso in funzione senza cancellarne l'accento.",
    size: "full",
  },
];

/** Selezione marchi (fonte: pagina Brand del sito). */
export const brands = [
  "Alias",
  "Alivar",
  "Arper",
  "Arrital Cucine",
  "Battistella Nidi",
  "Bonaldo",
  "Campeggi",
  "Cattelan Italia",
  "Clei",
  "Extendo",
  "Gervasoni",
  "Kastel",
  "Paola Lenti",
];

export const brandNotes = {
  Extendo:
    "Sistemi brevettati per strutture componibili: pareti attrezzate, librerie, armadi, tavoli e tavolini che si adattano alla stanza invece del contrario.",
  "Paola Lenti": "Colore e tessuti tecnici, per interni ed esterni trattati con la stessa cura.",
  Alivar: "Certificazione 100% Made in Italy: qualità artigianale e disegno contemporaneo.",
  Gervasoni: "Materiali naturali e volumi morbidi, in casa come fuori.",
  Kastel: "Sedute per ufficio e collettività, quando la postura conta quanto la linea.",
};

export const pages = {
  progetto: {
    eyebrow: "Arredamento casa",
    title: "La casa è un ritratto,",
    titleAccent: "non un allestimento.",
    lead:
      "Partiamo dalle tue giornate e arriviamo ai centimetri. Poi, e solo poi, scegliamo i pezzi.",
    plate: "rovere",
    sections: [
      {
        title: "Progetto completo",
        text: "Rilievo, distribuzione, luce, materiali, arredo. Ti consegniamo una casa finita, non una lista d'acquisto.",
      },
      {
        title: "Un ambiente per volta",
        text: "Cucina, zona notte, living: si può cominciare da una stanza sola e tenere aperta la strada per le altre.",
      },
      {
        title: "Case che hanno già vissuto",
        text: "Recupero di immobili d'epoca e riordino di case abitate da anni: si tiene ciò che vale, si sostituisce ciò che pesa.",
      },
      {
        title: "Consegna e montaggio",
        text: "Trasporto, posa e ritiro degli imballi. Il cantiere finisce quando la stanza è pronta.",
      },
    ],
    closing: {
      title: "Che cosa portare al primo incontro",
      items: [
        "Una pianta, anche disegnata a mano.",
        "Due fotografie della stanza com'è adesso.",
        "Tre immagini che ti piacciono — e una che detesti: serve più delle altre tre.",
      ],
    },
  },

  realizzazioni: {
    eyebrow: "Realizzazioni",
    title: "Nessun progetto",
    titleAccent: "si ripete.",
    lead:
      "Case, uffici e strutture ricettive nelle Marche. Cambiano i metri quadri e cambia il mix: quello che resta è il metodo.",
  },

  contract: {
    eyebrow: "Contract",
    title: "Spazi che devono",
    titleAccent: "lavorare tutti i giorni.",
    lead:
      "Hotel, residence, B&B, ristoranti, bar, spazi di lavoro e di studio: soluzioni coordinate per grandi e piccole strutture, con la resa di una casa e la resistenza di un pubblico esercizio.",
    plate: "vetro",
    sections: [
      {
        title: "Un capitolato, un interlocutore",
        text: "Selezione, tempi, forniture e montaggio coordinati da un referente unico. Meno mail, meno rimpalli.",
      },
      {
        title: "Materiali che reggono",
        text: "Tessuti tecnici, finiture per uso intensivo, sedute certificate per la collettività: la bellezza deve durare la stagione e quella dopo.",
      },
      {
        title: "Riconoscibilità",
        text: "La stanza numero sette non deve somigliare a quella di ogni altra struttura sulla costa. Il mix serve anche a questo.",
      },
      {
        title: "Per fasi",
        text: "Si può intervenire per lotti, camera dopo camera, senza chiudere la struttura.",
      },
    ],
  },

  architetti: {
    eyebrow: "Supporto architetti",
    title: "Un atelier aperto",
    titleAccent: "ai progettisti.",
    lead:
      "Uno spazio di confronto per architetti e interior designer: campionature in mano, marchi da mettere a confronto e le novità viste prima che arrivino in catalogo.",
    plate: "ottone",
    sections: [
      {
        title: "Materioteca e campionature",
        text: "Finiture, tessuti e sezioni da toccare: si decide prima, in atelier, invece che in cantiere.",
      },
      {
        title: "Visite alle aziende partner",
        text: "Organizziamo visite in fabbrica per vedere da vicino i processi produttivi e il lavoro di ricerca dietro ai pezzi.",
      },
      {
        title: "Supporto tecnico al progetto",
        text: "Disegni esecutivi, verifica delle misure, tempi di consegna reali e alternative quando un pezzo non è disponibile.",
      },
      {
        title: "Rispetto dei ruoli",
        text: "Il progetto resta tuo e il cliente pure. Noi mettiamo selezione, forniture e cantiere.",
      },
    ],
  },

  brand: {
    eyebrow: "Marchi",
    title: "Quaranta ingredienti,",
    titleAccent: "una ricetta per volta.",
    lead:
      "Marchi italiani e stranieri, insieme a partner meno noti scelti uno a uno. In showroom convivono; nel progetto entrano solo quelli che servono.",
  },

  contatti: {
    eyebrow: "Contatti",
    title: "Passa in atelier.",
    titleAccent: "Il caffè lo offriamo noi.",
    lead:
      "Due vetrine nel centro storico di Ancona. Chiama, scrivi, o presentati: se stiamo disegnando, ti facciamo aspettare cinque minuti e ne vale la pena.",
  },
};

export const footer = {
  claim: "Progettazione e arredamento dal 1983, nel centro di Ancona.",
  legal: `© ${new Date().getFullYear()} Arch. Vittoria Ribighini — Tutti i diritti riservati`,
};
