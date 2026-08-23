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
