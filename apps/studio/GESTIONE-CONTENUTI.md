# Guida gestione sito La Speziale

## Avvio

```powershell
cd apps/studio
pnpm dev
```

Il sito web deve essere attivo su `http://localhost:4321` per usare il pulsante che apre la versione pubblica.

## Organizzazione Studio

### Pagine Statiche

- `Impostazioni sito`: logo, favicon, contatti, social, CTA globale, footer e SEO generale.
- `Homepage`: contenuti principali, immagini, programmi in evidenza e CTA finale.
- `Dicono di noi`: impostazioni pagina e testimonianze.
- `Contatti`: testi, form dimostrativo, mappa, immagini, CTA e SEO.

### Programmi

- `Impostazioni pagina Programmi`: hero, immagine, introduzione alle card, CTA e SEO.
- `Elenco programmi`: ogni nuovo programma pubblicato appare automaticamente nella pagina e nel sottomenu Programmi.

### Prodotti

- `Impostazioni pagina Prodotti`: hero, testi, ricerca, messaggi e CTA.
- `Elenco prodotti`: ogni nuovo prodotto pubblicato appare automaticamente nella griglia e ha una pagina dettaglio.

La ricerca prodotti usa una corrispondenza testuale `contains` su nome, categoria, descrizione breve, prezzo, parole chiave e testo del bottone della card.

## Anteprima bozze

Le pagine principali e i programmi hanno due schede:

- `Modifica`: campi del contenuto.
- `Anteprima`: anteprima immediata dei dati in bozza, anche prima della pubblicazione.

Il pulsante `Apri sito pubblico` apre invece la versione pubblicata.

## Menu del sito

Il menu e intenzionalmente fisso per evitare modifiche accidentali:

- Programmi
- Prodotti
- Contatti
- Dicono di noi

I singoli programmi possono essere mostrati o nascosti dal dropdown tramite `Visibile nel menu`.

## Recensioni Google

In `Pagine Statiche > Dicono di noi > Impostazioni pagina` il gruppo `Recensioni Google` permette di:

- attivare o nascondere l intera sezione;
- indicare valutazione media e numero totale di recensioni;
- collegare la scheda Google dell attivita;
- scegliere fino a 6 recensioni da mostrare con autore, stelle, testo, data e foto opzionale.

Il `Google Place ID` e predisposto per una futura integrazione automatica tramite Google Places API. Il sito attuale non espone chiavi Google nel browser.

Per inserire la selezione verificata dalla scheda Google di La Speziale, inclusi media, numero totale e link, usa:

```powershell
$env:SANITY_AUTH_TOKEN="..."
pnpm seed:google-reviews
```

Il comando sostituisce soltanto la configurazione della sezione Recensioni Google e la attiva. Le testimonianze interne restano invariate.

## Programmi

Ogni programma permette di gestire hero, immagini, panoramica, destinatari, benefici, timeline, FAQ, CTA, SEO e visibilita delle sezioni. Il layout resta protetto.

- `Pubblicato` controlla la presenza del programma nel sito e nella griglia.
- `Visibile nel menu` controlla solo il sottomenu Programmi.
- `Ordine` determina la posizione nella griglia e nel menu.
- Gli interruttori in `Sezioni visibili` accendono o spengono panoramica, destinatari, descrizione, benefici, funzionamento, FAQ, contenuti extra e CTA finale.

## Sincronizzazione programmi esistenti

Il comando seguente crea i programmi mancanti, collega le immagini storiche e completa solo i campi ancora vuoti. Le modifiche gia inserite nello Studio non vengono sovrascritte.

```powershell
$env:SANITY_AUTH_TOKEN="..."
pnpm sync:programs
```

## Sincronizzazione pagine e Prodotti

Questo comando completa Impostazioni sito, Homepage, Contatti, Dicono di noi, testimonianze e impostazioni della pagina Prodotti. Carica anche logo e immagini gia disponibili senza sovrascrivere i campi modificati.

```powershell
$env:SANITY_AUTH_TOKEN="..."
pnpm sync:site
```

Per sincronizzare sia programmi sia pagine in un solo passaggio usa `pnpm sync:all`.

Le singole card prodotto non vengono create automaticamente: vanno aggiunte da `Prodotti > Elenco prodotti` quando sono disponibili nome, immagine e contenuti reali.

## Contenuti iniziali

Il seed richiede un token Sanity con permessi di scrittura:

```powershell
$env:SANITY_AUTH_TOKEN="..."
pnpm seed:content
```
