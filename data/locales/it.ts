import type { Dict } from './en';

export const it: Dict = {
  label: 'Italiano',
  short: 'IT',
  htmlLang: 'it',

  nav: {
    links: {
      approach: 'Metodo',
      studio: 'Studio',
      pricing: 'Prezzi',
      packages: 'Pacchetti',
      faq: 'FAQ'
    },
    cta: 'Prenota uno shooting',
    openMenu: 'Apri il menu',
    closeMenu: 'Chiudi il menu',
    language: 'Lingua'
  },

  hero: {
    eyebrow: 'Foto e video per brand che vendono online · Milano · dal 2008',
    titleA: 'Contenuti fatti per',
    titleB: 'vendere ciò che crei.',
    lead: "Le foto e i video di cui il tuo brand ha bisogno per vendere online — scatti di prodotto, reel pronti per i social e contenuti per campagne, per il tuo shop, le tue ads e i tuoi canali social. Inviaci ciò che vendi, o veniamo noi da te. Un unico team per foto e video, a un prezzo fisso concordato prima di iniziare. Brand da poco rinnovato, ora accettiamo nuovi clienti.",
    ctaPrimary: 'Ottieni un prezzo fisso',
    stats: [
    { value: 'Milano · Parigi', label: 'Dove fotografiamo' },
    { value: 'Foto + Video', label: 'Un team, entrambi' },
    { value: 'Fotografo', label: 'dal 2008' },
    { value: 'Prezzo fisso', label: 'Concordato prima di iniziare' }],

    studioCaption:
    'Milano, in location e con prodotti spediti — ogni angolo, ogni luce.'
  },

  clients: { label: 'Clienti selezionati' },

  process: {
    eyebrow: 'Dal primo messaggio ai file finali',
    title: 'Saprai sempre cosa succede dopo.',
    lead: "Niente gergo, nessuna fattura a sorpresa. Quattro passaggi, tempi fissi, una sola persona che segue il progetto dall'inizio alla fine.",
    steps: [
    {
      title: 'Raccontaci cosa vendi',
      body: 'Una breve call o un modulo. Guardiamo i tuoi prodotti, i tuoi canali e le immagini che ti mancano.',
      duration: '20 minuti'
    },
    {
      title: 'Ti inviamo lo shot list',
      body: 'Ogni scatto è pianificato prima di toccare la macchina — angoli, props, luce e utilizzo finale.',
      duration: '2 giorni'
    },
    {
      title: 'Giorno di shooting',
      body: 'In location tua, oppure con i tuoi prodotti spediti a noi. Partecipa di persona, oppure segui il collegamento live ovunque tu sia.',
      duration: 'Mezza o intera giornata'
    },
    {
      title: 'Selezione, ritocco, consegna',
      body: 'Scegli le preferite in una galleria privata. Ritocchiamo e consegniamo in ogni formato che ti serve.',
      duration: '4–7 giorni'
    }]

  },

  testimonials: {
    eyebrow: 'Parole dei clienti',
    title: 'Cosa hanno cambiato le immagini.',
    items: {
      t1: {
        quote:
        'Hanno pianificato ogni scatto prima del nostro arrivo, la giornata è stata serena. Le immagini hanno fatto sembrare il lancio di un brand tre volte più grande.',
        role: 'Fondatrice',
        result: 'Esaurito in 9 giorni'
      },
      t2: {
        quote:
        'Quaranta look in una giornata di studio, consegnati in quattro. Nessun altro voleva nemmeno preventivarlo.',
        role: 'Direttore creativo',
        result: '40 look · 1 giorno'
      },
      t3: {
        quote:
        'Le foto del menù finalmente somigliano alla sala in cui serviamo. Gli ordini in delivery sono saliti già dalla settimana del cambio.',
        role: 'Titolare',
        result: '+31% ordini delivery'
      }
    }
  },

  equipment: {
    eyebrow: 'Quello che portiamo',
    title: 'Kit completo.\\nNulla a noleggio.',
    lead: "Macchina fotografica professionale, illuminazione e postazione di finitura calibrata. Tutto quello che abbiamo è nostro e manutenuto. Portiamo l'essenziale a ogni shooting, e quotizziamo apertamente se serve noleggiare qualcosa di extra per il tuo brief.",
    groups: {
      camerasLenses: 'Fotocamere e obiettivi',
      lightingPhoto: 'Illuminazione — Foto',
      lightingVideo: 'Illuminazione — Video',
      supportGrip: 'Supporti e attrezzatura'
    },
    items: {
      camerasLenses: ['Sony FX30', 'Sony a6700', '33mm f/1.2', '85mm f/1.4', '50mm f/1.4'],
      lightingPhoto: ['Godox AD600Pro', 'Godox AD300Pro'],
      lightingVideo: ['GVM 300W LED', '150W LED light'],
      supportGrip: ['Tripods', 'Light stands', '120cm & 85cm softboxes']
    },
    note: 'Tutto è calibrato internamente. Se un brief richiede qualcosa che non abbiamo, lo noleggiamo e lo indichiamo apertamente prima dello shooting.'
  },

  estimator: {
    eyebrow: 'Il prezzo, prima di chiederlo',
    title: 'Il tuo prezzo, prima di parlare con qualcuno.',
    lead: 'Muovi i controlli e guarda il numero cambiare. È lo stesso calcolo che sta dietro a ogni preventivo che inviamo.',
    categoryLegend: 'Cosa fotografiamo?',
    categories: {
      product: 'Prodotto',
      restaurant: 'Food',
      fashion: 'Moda',
      brand: 'Brand'
    },
    countLabel: 'Quante immagini finali?',
    countMin: '0 — solo base',
    countMax: '80 — catalogo completo',
    whereLabel: 'Dove?',
    whereStudio: 'Il nostro Studio',
    whereStudioNote: 'Controllo totale della luce',
    whereLocation: 'Da te',
    whereLocationNote: 'Portiamo lo studio con noi',
    addOnLegend: 'Serve altro?',
    addOns: {
      simpleVideo: { label: 'Video semplice', description: '1 setup, una location, nessun cambio luci' },
      styledVideo: { label: 'Video commerciale per social', description: 'Setup di illuminazione, 2 ore di ripresa' },
      socialPack: { label: 'Pacchetto video social', description: '4 video brevi, meno di 20 secondi ciascuno — pronti per Reels, TikTok e ads' },
      express: { label: 'Consegna express', description: '48h' }
    },
    resultLabel: 'La tua stima',
    lineStudio: (category: string) => `Shooting ${category.toLowerCase()} — studio e luci`,
    lineImages: (count: number) => `${count} immagini finali ritoccate`,
    lineLocation: 'Troupe e trasporto attrezzatura in loco',
    deliveryLabel: 'File consegnati',
    delivery48: '48 ore',
    delivery7: '7 giorni lavorativi',
    delivery4: '4 giorni lavorativi',
    recommendedLabel: 'Pacchetto consigliato',
    oneDay: 'Una giornata di shooting',
    twoDays: 'Due giornate di shooting',
    cta: 'Blocca una data con questo brief'
  },

  packages: {
    eyebrow: 'Pacchetti',
    title: 'Tre modi di lavorare insieme.',
    lead: 'Parti da dove sei. La maggior parte dei brand inizia con Gold e cresce da lì.',
    best: 'Il più scelto',
    volume: 'Volume',
    delivery: 'Consegna',
    from: 'da',
    choose: (name: string) => `Scegli ${name}`,
    tiers: {
      silver: {
        name: 'Silver',
        tagline: 'Viaggio / Negozio / Prodotti',
        shots: '40 foto incluse',
        turnaround: '2 settimane',
        includes: [
        '4 ore in loco',
        '1 video, 30 secondi',
        'Fino a 10 outfit o prodotti',
        'Behind-the-scenes (facoltativo)',
        'Outfit extra: €25 ognuno']

      },
      gold: {
        name: 'Gold',
        tagline: "Negozio e all'aperto",
        shots: '75 foto incluse',
        turnaround: '2 settimane',
        includes: [
        '6 ore in loco',
        '2 location in un giorno',
        '1 video + €100 a video extra',
        'Fino a 20 outfit o prodotti',
        'Behind-the-scenes incluso']

      },
      platinum: {
        name: 'Platinum',
        tagline: 'Content Sprint',
        shots: '50 foto incluse',
        turnaround: '3 settimane',
        includes: [
        '8 ore in loco',
        '2 location in un giorno',
        '5 video',
        'Colore grading professionale',
        'Instagram Reels + TikTok ottimizzato']

      }
    }
  },

  faq: {
    title: 'Le domande che riceviamo ogni settimana.',
    leadBefore: 'Ancora dubbi? Scrivi a',
    leadAfter: 'e una persona risponde entro un giorno lavorativo.',
    items: [
    {
      q: 'Quanto costa davvero uno shooting?',
      a: 'I pacchetti vanno da €500 a €1.000 in base a scope, ore, location e video richiesti. Il calcolatore qui sopra usa la stessa matematica dei nostri preventivi — e ogni prezzo è fissato per iscritto prima di iniziare.'
    },
    {
      q: 'Posso spedire i prodotti o vieni da me?',
      a: 'Entrambi. Spediscici i prodotti e li fotograferemo in studio, oppure veniamo nella tua location a Milano e oltre. Come è più facile — il prezzo è concordato comunque allo stesso modo.'
    },
    {
      q: 'Posso essere presente allo shooting?',
      a: 'Per gli shooting in location sei benvenuto a partecipare, oppure puoi mandare qualcuno di fiducia per rappresentarti. Per gli shooting di prodotti in studio, ti teniamo aggiornato con una diretta, così puoi approvare gli scatti in tempo reale senza viaggiare.'
    },
    {
      q: 'Quali formati ricevo?',
      a: 'File ad alta risoluzione pronti per la stampa, più versioni web-optimize dimensionate per il tuo negozio, listing marketplace e social. Diccelo dove vivranno le immagini e consegniamo i tagli giusti.'
    },
    {
      q: 'Con quanto anticipo conviene prenotare?',
      a: 'Una settimana di preavviso è ideale, anche se spesso riusciamo a incastrare lavori più piccoli prima. Invia il tuo brief attraverso il modulo e confirmeremo la data più vicina che riusciamo a garantire.'
    },
    {
      q: 'In quali lingue lavorate?',
      a: 'Inglese, francese e italiano — sul set e in ogni documento che ricevi.'
    }]

  },

  booking: {
    titleA: 'Mettiamo una data',
    titleB: 'in agenda.',
    lead: 'Raccontaci cosa vendi, dove vuoi fotografare e quando ti servono le immagini. Rispondiamo entro un giorno lavorativo con shot list e prezzo fisso — nessuna call obbligatoria.',
    studioLabel: 'Location',
    languagesLabel: 'Lingue',
    languagesValue: 'English · Français · Italiano',
    formTitle: 'Richiedi una data',
    name: 'Il tuo nome',
    namePlaceholder: 'Giulia Rossi',
    email: 'Email',
    emailPlaceholder: 'tu@brand.com',
    brief: 'Cosa fotografiamo?',
    briefPlaceholder: '24 prodotti skincare per il lancio dello shop a ottobre.',
    dateLabel: 'Scegli una data',
    timeLabel: 'Scegli un orario',
    error: 'Inserisci nome ed email validi così possiamo risponderti.',
    submit: 'Invia il brief',
    sending: 'Invio',
    disclaimer: 'Nessun impegno. Teniamo la tua data per 48 ore.',
    sentTitle: 'Brief ricevuto.',
    sentBody: (name: string, email: string) =>
    `Grazie ${name} — una conferma sta arrivando a ${email}. Shot list e prezzo fisso entro un giorno lavorativo.`,
    again: 'Invia un altro brief'
  },

  footer: {
    tagline: 'Fotografia commerciale per i brand che vendono. Milano, dal 2008.',
    rights: 'Tutti i diritti riservati.'
  }
};