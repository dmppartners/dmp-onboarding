# DMP Partners — Onboarding

App web (Next.js) che sostituisce l'intervista guidata del corso "Portale AI Immobiliare":
un questionario a step che DMP compila per configurare il sistema marketing, con un'area
di upload per il materiale informativo (logo, foto, brochure). Alla fine genera in automatico
i 4 file `brand-brief.md`, `icp.md`, `tone-of-voice.md`, `offerta.md` gia' pronti da mettere
nella cartella `brand/` del progetto Claude Code.

Testato in locale end-to-end: build, invio del questionario, upload file, generazione dei
file brand e pagina admin — tutto verificato con richieste reali.

**Hosting: Railway** (non Vercel). Nessun database: le risposte e i materiali sono salvati
come file su un disco persistente (Volume Railway).

---

## 1. Cosa ti serve

- Un account [railway.com](https://railway.com) (si crea in 1 minuto, anche con GitHub)
- 10 minuti

## 2. Pubblicare su Railway

### Opzione A — dashboard (senza terminale)

1. Carica questa cartella su un repository GitHub (con l'app desktop di GitHub, senza comandi)
2. Su [railway.com/new](https://railway.com/new) → **Deploy from GitHub repo** → seleziona il repo
3. Railway riconosce Next.js da solo e avvia la build

### Opzione B — CLI

```bash
npm install -g @railway/cli
railway login
cd dmp-onboarding
railway init
railway up
```

## 3. Aggiungere il Volume (storage persistente)

Obbligatorio: senza, i file caricati si perderebbero a ogni riavvio.

1. Nel progetto Railway → tab **Volumes** → **New Volume**
2. Punto di mount: `/data`
3. Collega il volume al servizio dell'app

## 4. Variabili d'ambiente

Nel servizio → tab **Variables**, aggiungi:

| Variabile | Valore |
|---|---|
| `STORAGE_DIR` | `/data` (deve coincidere col mount point del Volume) |
| `ADMIN_PASSWORD` | una password vera, non "password123" |

Railway rifà il deploy da solo quando salvi le variabili.

## 5. Come funziona una volta online

Railway ti da' un URL del tipo `https://dmp-onboarding-production.up.railway.app`
(personalizzabile in **Settings → Networking**).

### Dare il questionario a un cliente

```
https://il-tuo-progetto.up.railway.app/onboarding/CODICE-A-TUA-SCELTA
```

`CODICE-A-TUA-SCELTA` lo inventi tu, es. `dmp-partners-2026`. Non serve registrarlo:
la pagina esiste automaticamente non appena qualcuno apre quell'URL.

**Importante sulla sicurezza**: non c'e' una vera password su questa pagina — chiunque
conosca il link puo' aprirlo e compilarlo. Scegli un codice non banale e condividilo solo
privatamente (email diretta, non su canali pubblici).

### Rivedere le risposte ricevute

```
https://il-tuo-progetto.up.railway.app/admin/CODICE-A-TUA-SCELTA
```

(lo stesso codice usato per il questionario). Qui ti viene chiesta la password impostata al
punto 4. Trovi le risposte complete e i link per scaricare ogni file.

### Usare i file generati nel progetto Claude Code

Nella pagina admin trovi 4 file dentro `brand-kit/`: `brand-brief.md`, `icp.md`,
`tone-of-voice.md`, `offerta.md`. Scaricali e sostituiscili nella cartella `brand/` del tuo
progetto `~/dmp-marketing` (vedi il corso, Modulo 02). Sono gia' nel formato giusto — ti
resta solo da rileggerli ed eventualmente correggerli.

## 6. Limiti conosciuti (onesti, non nascosti)

- **Max ~4 MB totali di file per invio.** Per loghi, PDF e una foto guida va benissimo.
  Per gallerie fotografiche pesanti, il questionario ha un campo per incollare un link
  Google Drive / WeTransfer.
- **Nessun vero login**, solo link con codice segreto (vedi sopra).
- **Nessun database relazionale**: le risposte sono salvate come file JSON dentro lo stesso
  storage dei materiali. Va benissimo per pochi clienti; con centinaia si puo' aggiungere
  un database vero in seguito.

## 7. Sviluppo locale (facoltativo)

```bash
npm install
npm run dev
```

Apri `http://localhost:3000/onboarding/test`. Senza `STORAGE_DIR` impostato, i file
vengono salvati in `.local-storage/` dentro il progetto.

## 8. Nota: perche' non Vercel

Il codice supporta anche Vercel Blob (imposta `BLOB_READ_WRITE_TOKEN` invece di
`STORAGE_DIR`) se in futuro preferisci spostarti su Vercel — ma il deploy vero e proprio
va comunque avviato da un umano (dal terminale o dalla dashboard): nessun connettore
disponibile qui puo' creare un deployment Vercel per conto tuo. Su Railway invece esiste
un connettore con un vero comando di deploy, per questo e' la scelta di partenza.

---

## 9. Sito vetrina Arch. Vittoria Ribighini (`/vittoria`)

Nello stesso progetto vive la ricostruzione del sito di Arch. Vittoria Ribighini
(progettazione e arredamento, Ancona): sette pagine piu' un chatbot d'atelier.
Vive sotto `/vittoria` e non tocca nulla dell'onboarding.

```
/vittoria                 home
/vittoria/progetto        arredamento casa
/vittoria/realizzazioni   portfolio
/vittoria/contract        hotel, residence, ristoranti, uffici
/vittoria/architetti      supporto ai progettisti
/vittoria/brand           marchi in selezione
/vittoria/contatti        recapiti + modulo
```

**Dove si mettono le mani**

| Cosa | File |
|---|---|
| Testi, recapiti, marchi, progetti | `lib/vittoria/content.js` |
| Colori, font, logo | `lib/vittoria/brand.js` + `app/vittoria/vittoria.css` (token in cima) |
| Risposte del chatbot | `lib/vittoria/knowledge.js` |
| Fotografie | `components/vittoria/Plate.jsx` — passare `src` al posto della superficie generata |

**Chatbot.** Senza `ANTHROPIC_API_KEY` risponde il motore deterministico:
funziona subito, a costo zero, e non inventa nulla. Con la chiave impostata
risponde Claude (`claude-opus-5`, cambiabile con `VR_CHAT_MODEL`) usando la
stessa scheda come system prompt; se la chiamata fallisce o un IP supera 20
messaggi in 10 minuti, si torna al motore locale senza che il visitatore se ne
accorga.

**Da sostituire prima di andare online**: le schede progetto in
`works` (`lib/vittoria/content.js`) sono materiale d'impaginazione, e la
palette e' una ricostruzione — i valori esatti del marchio vanno messi nei
token in cima a `app/vittoria/vittoria.css`. Le pagine sono in `noindex`
finche' resta un'anteprima.
