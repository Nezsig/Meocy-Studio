import type { Dict } from './en';

export const it: Dict = {
  label: 'Italiano',
  short: 'IT',
  htmlLang: 'it',

  nav: {
    links: {
      home: 'Home',
      work: 'Portfolio',
      services: 'Servizi',
      packages: 'Pacchetti',
      about: 'Chi sono',
      faq: 'FAQ',
      collaborate: 'Collabora',
      contact: 'Contatti'
    },
    cta: 'Contattami',
    openMenu: 'Apri il menu',
    closeMenu: 'Chiudi il menu',
    language: 'Lingua'
  },

  hero: {
    eyebrow: 'FOTOGRAFIA & VIDEOGRAFIA · MILANO',
    titleA: 'Contenuti che',
    titleB: 'fanno crescere il tuo business.',
    lead: 'MEOCY è uno studio fotografico e video a Milano. Creiamo i contenuti che mettono il tuo brand di fronte a più persone — e ne trasformano più di loro in clienti. Foto di prodotto, reel pronti per i social e campagne, a un prezzo fisso concordato prima di iniziare.',
    ctaPrimary: 'Ottieni un prezzo fisso',
    stats: [
    { value: 'Vieni visto', label: '' },
    { value: 'Vieni seguito', label: '' },
    { value: 'Vendi di più', label: '' }],

    studioCaption:
    'Milano, in location e con prodotti spediti — ogni angolo, ogni luce.',

    rebrandCallout: 'Appena rinominato — settembre 2026. MEOCY è una ripartenza sotto un nuovo nome. Ci trovi proprio all\'inizio — quindi ricevi attenzione da founder su ogni shooting, e prezzi introduttivi mentre accogliamo i nostri primi brand.',
    noPackageNeeded: 'Nessun pacchetto necessario — raccontaci quello che vuoi e lo giriamo a modo tuo.'
  },

  clients: { label: 'Clienti selezionati' },

  about: {
    sectionHeading: 'Chi sono',
    bio: 'Dietro MEOCY c\'è Chamila, fotografo dallo Sri Lanka. Ho passato otto anni costruendo una carriera in fotografia nella mia terra, poi mi sono trasferito in Italia. Dopo un po\' lontano dalla macchina fotografica, sto ricominciando da capo qui a Milano—stesso occhio, nuovo nome. Lavora con MEOCY e lavori direttamente con me: ogni shooting è attentamente pianificato, girato e consegnato dal founder, a un prezzo concordato in anticipo.',
    whatIShoots: 'Campagne di abbigliamento e brand · Shooting di modelle · Fotografia di moda · Fotografia di cibo · Video',
    kitLine: 'Ogni shooting è realizzato con fotocamere moderne, illuminazione potente e un kit professionale completo — così il lavoro raggiunge uno standard commerciale reale.',
    toggleLabel: 'Conosci il fondatore',
    name: 'Chamila Prasanna',
    role: 'Founder & Photographer · MEOCY STUDIO',
    contact: {
      phoneLabel: 'T',
      phone: '+39 379 105 1000',
      mobileLabel: 'M',
      mobile: '+39 380 498 1718',
      emailLabel: 'E',
      email: 'hello@meocy.com',
      websiteLabel: 'W',
      website: 'meocy.com'
    },
    socialHandles: '@chamila.it · @chami.eu'
  },

  process: {
    eyebrow: 'Dal primo messaggio ai file finali',
    title: 'Saprai sempre cosa succede dopo.',
    lead: 'Ogni shooting è pianificato in anticipo — fino al dettaglio dei tempi — così niente è lasciato al caso e il tempo di nessuno è sprecato. Quattro passaggi chiari, una persona con te dall\'inizio alla fine.',
    steps: [
    {
      title: 'Raccontaci cosa vendi',
      body: 'Una breve call o un modulo. Guardiamo i tuoi prodotti, dove li vendi, e le foto che vorresti avere.',
      duration: '20 minuti'
    },
    {
      title: 'Pianifichiamo tutto per primo',
      body: 'Prima dello shooting concordiamo il piano completo: cosa fotografare, dove, come illuminare e i tempi. Se utile, visitiamo la tua location prima — così il giorno dello shooting, niente è una sorpresa.',
      duration: '2 giorni'
    },
    {
      title: 'Giorno di shooting',
      body: 'Perché tutto è pianificato, la giornata procede secondo programma — risparmiando tempo a entrambi. In location tua, oppure con i tuoi prodotti spediti a noi. Vieni con noi, oppure segui il collegamento live da qualunque posto.',
      duration: 'Mezza o intera giornata'
    },
    {
      title: 'Consegniamo',
      body: 'Scegli le tue preferite in una galleria privata. Ritocchiamo e consegniamo ogni formato di cui i tuoi canali hanno bisogno.',
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
      supportGrip: 'Supporti e attrezzatura',
      movementAerial: 'Movimento e aereo'
    },
    items: {
      camerasLenses: ['Sony FX30', 'Sony a6700', '33mm f/1.2', '85mm f/1.4', '50mm f/1.4'],
      lightingPhoto: ['Godox AD600Pro', 'Godox AD300Pro'],
      lightingVideo: ['GVM 300W LED', '150W LED light'],
      supportGrip: ['Tripods', 'Light stands', '120cm & 85cm softboxes'],
      movementAerial: ['Gimbal DJI RS 4 Mini', 'Drone DJI Mini 3 Pro']
    },
    note: 'Tutto è calibrato internamente. Se un brief richiede qualcosa che non abbiamo, lo noleggiamo e lo indichiamo apertamente prima dello shooting.'
  },

  estimator: {
    eyebrow: 'Prezzi video, prima di chiedere',
    title: 'Costruisci il tuo preventivo video.',
    lead: 'Scegli quanti video e lo stile che vuoi. Il prezzo si aggiorna istantaneamente — questo è quello che addebitiamo.',
    categoryLabel: 'Cosa stiamo filmando?',
    categories: {
      product: 'Prodotto',
      food: 'Food',
      fashion: 'Moda',
      brand: 'Brand'
    },
    videoTypeLegend: 'Tipo di video',
    videoTypes: {
      basic: {
        name: 'Basic',
        description: '1 location · 1 illuminazione · senza voiceover',
        price: 100,
        unit: 'video'
      },
      social: {
        name: 'Video social media',
        description: 'Voce di modella · 2 setup di illuminazione · una location con cambio luci · 2 ore di ripresa',
        price: 150,
        unit: 'video'
      },
      pack: {
        name: 'Pacchetto video social media',
        description: '4 video brevi (meno di 20s) per pacchetto — Reels, TikTok & ads.',
        price: 500,
        unit: 'pacchetto'
      },
      commercial: {
        name: 'Video commerciale social media',
        description: 'Premium: shoot di 4 ore · illuminazione cambiata ogni shot · cambio location · voce di modella · voiceover · e molto altro.',
        price: 500,
        unit: 'video'
      }
    },
    countLabel: 'Quanti video?',
    countMin: '0 video',
    countMax: '8 video',
    resultLabel: 'La tua stima',
    whatYouGet: 'Quello che ottieni',
    benefits: {
      basic: ['1 location · 1 setup di illuminazione', 'Editing semplice · consegna standard'],
      social: ['Voce del modello · 2 setup di illuminazione', 'Una location con cambio luci · 2 ore di ripresa'],
      commercial: ['Shooting di 4 ore · cambio luci a ogni scatto', 'Cambio location · voce del modello · voiceover · full production'],
      pack: ['4 video brevi commerciali (meno di 20s) — Reels, TikTok e ads', '25 foto ritoccate — incluse', 'Cambio location', 'Cambio luci a ogni location', 'Shooting di 6 ore', 'Voce del modello', 'Musica royalty-free']
    },
    lineVideos: (count: number, unit: string) => `${count} ${unit}${count === 1 ? '' : 's'}`,
    linePhotos: 'foto ritoccate finali — incluse',
    linePhotosQuote: 'Le foto per i video commerciali vengono quotate separatamente.',
    linePhotosWant: 'Vuoi foto? Aggiungi 5+ video o scegli un pacchetto.',
    caption: 'Prezzo fisso, concordato prima di iniziare.',
    cta: 'Prenota questo video'
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
    brand: {
      blurb: 'Studio foto e video a Milano. Brand di abbigliamento, modelle, moda, food e video.',
      handles: '@chamila.it · @chami.eu'
    },
    contact: {
      phoneLabel: 'T',
      phone: '+39 379 105 1000',
      mobileLabel: 'M',
      mobile: '+39 380 498 1718',
      emailLabel: 'E',
      email: 'hello@meocy.com',
      websiteLabel: 'W',
      website: 'meocy.com'
    },
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'Portfolio', href: '/work' },
      { label: 'Servizi', href: '/services' },
      { label: 'Pacchetti', href: '/packages' },
      { label: 'Chi sono', href: '/about' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Collabora', href: '/collaborate' },
      { label: 'Contatti', href: '/contact' }
    ],
    tourist: {
      title: 'Fotografia per turisti',
      links: [
        { label: 'Servizio fotografico a Milano', href: '/milan-photoshoot' },
        { label: 'Pacchetti', href: '/milan-photoshoot#packages' },
        { label: 'Location', href: '/milan-photoshoot#locations' },
        { label: 'Prenotazione', href: '/milan-photoshoot#booking' },
        { label: 'Condizioni di prenotazione', href: '/booking-policy' }
      ]
    },
    services: [
      'Campagne di abbigliamento e brand',
      'Shooting con modelle',
      'Fotografia di moda',
      'Fotografia di food',
      'Video'
    ],
    tagline: 'Studio foto e video a Milano — contenuti che fanno crescere il tuo business.',
    rights: 'Tutti i diritti riservati.',
    rebrand: 'Rinnovamento del brand settembre 2026'
  },

  work: {
    title: 'Lavori selezionati',
    intro: 'Una selezione di fotografie e video realizzati per brand, aziende, moda, prodotti e persone a Milano.',
    all: 'Tutti',
    fashion: 'Moda',
    portrait: 'Ritratti',
    city: 'Città',
    commercial: 'Commerciale',
    product: 'Prodotto',
    food: 'Ristorazione e food',
    video: 'Video',
    watch: 'Guarda',
    empty: 'Stiamo aggiungendo nuovi lavori — torna presto.',
    close: 'Chiudi',
    prev: 'Precedente',
    next: 'Successivo',
    ctaTitle: 'Pronto a creare qualcosa?',
    ctaText: 'Raccontaci a cosa stai lavorando.',
    ctaButton: 'Richiedi un preventivo'
  },

  svcPage: {
    title: 'Cosa facciamo',
    intro1: 'Un buon contenuto visivo deve fare più che essere bello.',
    intro2: 'MEOCY crea fotografie e video pensati per siti web, social media, pubblicità, campagne e comunicazione quotidiana del brand.',
    s1t: 'Fotografia di moda e modelle',
    s1d: 'Fotografia fashion, editoriale e di portfolio per modelle, designer e brand di moda.',
    s2t: 'Fotografia commerciale',
    s2d: 'Contenuti visivi professionali per aziende e brand che hanno bisogno di immagini di alta qualità per siti web, pubblicità e social media.',
    s3t: 'Fotografia di prodotto',
    s3d: 'Fotografia di prodotto pulita e professionale per siti web, e-commerce, social media e campagne.',
    s4t: 'Contenuti per ristoranti e food',
    s4d: 'Fotografia e brevi video per ristoranti, caffè, bar e attività di food a Milano.',
    s5t: 'Brand e personal branding',
    s5d: 'Fotografia professionale pensata per dare al tuo brand o alla tua attività un\'identità visiva più forte.',
    s6t: 'Video per i social media',
    s6d: 'Brevi video commerciali e Reel pensati per Instagram, TikTok e advertising digitale.',
    cta: 'Parliamo del tuo progetto',
    ctaTitle: 'Hai un progetto in mente?',
    ctaButton: 'Parliamo del tuo progetto'
  },

  pkgPage: {
    title: 'Pacchetti foto e video',
    intro1: 'Pacchetti semplici per diverse esigenze di produzione.',
    intro2: 'Tutti i progetti sono pianificati in anticipo e il prezzo finale viene concordato prima dell\'inizio della produzione.',
    packageLabel: 'Pacchetto',
    includesLabel: 'Include',
    idealLabel: 'Ideale per',
    photoTitle: 'Pacchetti fotografici',
    videoTitle: 'Produzione video',
    videoIntro: 'Video commerciali brevi creati per social media, siti web e pubblicità digitale.',
    extrasTitle: 'Extra opzionali',
    extrasIntro: 'Hai bisogno di qualcosa in più rispetto al pacchetto scelto? È possibile aggiungere servizi di produzione extra al tuo progetto.',
    customTitle: 'Produzione personalizzata',
    customHeadline: 'Il tuo progetto non deve per forza rientrare in un pacchetto.',
    customText1: 'Per campagne più grandi, più location, più prodotti, produzioni pubblicitarie, modelle, assistenti, truccatori o produzioni video complesse, MEOCY può creare una produzione su misura in base alle tue esigenze.',
    customText2: 'Ogni progetto viene discusso in anticipo e quotato chiaramente prima dell\'inizio della produzione.',
    customButton: 'Richiedi un preventivo personalizzato',
    p1: {
      name: 'Photo Starter',
      price: '€300',
      desc: 'Un servizio fotografico professionale mirato per aziende, professionisti, personal brand e semplici shooting di prodotto.',
      includes: ['Fino a 1,5 ore di shooting', '1 location', '1 setup luci', 'Fino a 2 outfit o allestimenti', '20 foto professionalmente ritoccate', 'File ad alta risoluzione', 'Formati per web e social media', 'Galleria online privata'],
      ideal: ['Piccole attività', 'Personal brand', 'Professionisti', 'Semplici shooting di prodotto', 'Ristoranti e attività locali'],
      button: 'Prenota Photo Starter'
    },
    p2: {
      name: 'Shooting Moda / Modelle',
      price: '€450',
      desc: 'Una produzione dedicata alla moda per modelle, creativi e brand di moda che hanno bisogno di immagini editoriali o di portfolio di grande impatto.',
      includes: ['Fino a 2,5 ore di shooting', '1 location a Milano', 'Fino a 3 outfit', '35 foto professionalmente ritoccate', 'Illuminazione professionale', 'Direzione creativa', 'Direzione di base delle pose', 'File ad alta risoluzione', 'Formati per i social media', 'Galleria online privata'],
      ideal: ['Modelle', 'Brand di moda', 'Editoriali', 'Lookbook', 'Shooting per portfolio', 'Campagne moda'],
      button: 'Prenota shooting moda'
    },
    p3: {
      name: 'Contenuti per attività locali',
      price: '€450',
      desc: 'Contenuti visivi professionali per ristoranti, caffè, negozi, saloni, barbieri, attività di bellezza e altre attività locali di Milano.',
      includes: ['Fino a 2,5 ore di shooting', '1 sede dell\'attività', '25 foto professionalmente ritoccate', '2 video brevi', 'Contenuti di interni ed esterni', 'Prodotti / servizi / persone', 'Illuminazione professionale quando necessario', 'Formati pronti per i social media', 'Galleria online privata'],
      ideal: ['Ristoranti', 'Caffè', 'Bar', 'Negozi', 'Saloni', 'Barbieri', 'Attività di bellezza', 'Servizi locali'],
      button: 'Prenota contenuti per attività locali'
    },
    p4: {
      name: 'Brand Content',
      price: '€650',
      desc: 'Una produzione di contenuti completa per brand in crescita che hanno bisogno di un solido lotto di foto e video in un\'unica produzione.',
      includes: ['Fino a 4 ore di shooting', 'Fino a 2 location', 'Fino a 5 outfit o prodotti', '50 foto professionalmente ritoccate', '2 video brevi', 'Illuminazione professionale', 'Direzione creativa', 'Color grading professionale', 'Formati per sito web e social media', 'Galleria online privata'],
      ideal: ['Brand di moda', 'Ristoranti', 'Attività di bellezza', 'Brand di prodotto', 'Startup', 'Personal brand', 'Attività in crescita'],
      button: 'Prenota Brand Content'
    },
    p5: {
      name: 'Content Day',
      price: '€950',
      desc: 'Un\'intera giornata di produzione per brand che hanno bisogno di abbastanza contenuti visivi per sito web e social media per diverse settimane.',
      includes: ['Fino a 6 ore di produzione', 'Fino a 2 location', 'Fino a 8 outfit o prodotti', '70 foto professionalmente ritoccate', '4 video brevi', 'Illuminazione professionale', 'Direzione creativa', 'Color grading professionale', 'Formati Instagram e TikTok', 'Galleria online privata'],
      ideal: ['Brand in crescita', 'Collezioni moda', 'Lanci di prodotto', 'Ristoranti', 'Campagne sui social media', 'Grandi esigenze di contenuti'],
      button: 'Prenota Content Day'
    },
    v1: {
      name: 'Social Video',
      price: '€250 / video',
      desc: '',
      includes: ['Fino a 2 ore di shooting', '1 location', '1 setup luci', 'Fino a 20 secondi', 'Montaggio professionale', 'Color grading', 'Musica', 'Formato verticale per i social media'],
      ideal: [],
      button: 'Prenota Social Video'
    },
    v2: {
      name: 'Social Video × 3',
      price: '€600',
      desc: 'Tre video brevi realizzati durante un\'unica produzione organizzata.',
      includes: ['Fino a 3 ore di shooting', '1 location', '3 video brevi', 'Montaggio professionale', 'Color grading', 'Musica', 'Formati verticali per i social media'],
      ideal: [],
      button: 'Prenota 3 video'
    },
    v3: {
      name: 'Video commerciale',
      price: 'Da €450',
      desc: 'Un video promozionale più strutturato che richiede produzione, direzione, illuminazione, voce, lavoro sulla location o altre esigenze aggiuntive. Il prezzo finale dipende dal brief del progetto e dai requisiti di produzione.',
      includes: [],
      ideal: [],
      button: 'Richiedi un preventivo video'
    },
    extras: [
      { label: 'Ora di shooting extra', price: '€150' },
      { label: 'Foto ritoccata extra', price: '€15 / immagine' },
      { label: 'Video breve extra', price: '€150' },
      { label: 'Seconda location', price: 'Da €100' },
      { label: 'Consegna prioritaria', price: 'Su richiesta' },
      { label: 'Ulteriori esigenze di produzione', price: 'Quotate a parte' }
    ]
  },

  aboutPage: {
    title: 'Chi è MEOCY',
    headline: 'La persona dietro la fotocamera',
    p1: 'MEOCY è stato fondato da Chamila, fotografo originario dello Sri Lanka che ha trascorso otto anni a costruire la sua carriera fotografica prima di trasferirsi in Italia.',
    p2: 'Dopo un periodo lontano dalla fotocamera, torna alla fotografia a Milano e Parigi con un nuovo nome e un obiettivo chiaro: creare contenuti visivi professionali per brand, aziende, prodotti, modelle e persone.',
    p3: 'Lavorando con MEOCY, lavori direttamente con il fondatore, dal primo brief alla consegna finale.',
    button: 'Inizia un progetto',
    whyTitle: 'Perché scegliere MEOCY?',
    why: [
      { t: 'Coinvolgimento diretto del fondatore', d: 'Lavorando con MEOCY, lavori direttamente con il fondatore, dal primo brief alla consegna finale.' },
      { t: 'Pianificato prima dello shooting', d: 'Ogni produzione viene pianificata prima del giorno delle riprese: location, illuminazione, outfit, prodotti, tempistiche e consegne finali.' },
      { t: 'Contenuti pensati per le piattaforme reali', d: 'Foto e video sono creati pensando al loro utilizzo finale: siti web, social media, pubblicità e campagne.' },
      { t: 'Con base a Milano e Parigi', d: 'Con sede a Milano e Parigi, con produzione on location in entrambe le città e nelle zone limitrofe.' },
      { t: 'Prezzi chiari', d: 'L\'ambito della produzione e il prezzo finale vengono concordati prima dello shooting, quindi nessun costo di produzione inatteso.' }
    ],
    eqTitle: 'Attrezzatura professionale',
    eqIntro: 'MEOCY lavora con un set professionale di fotocamere, obiettivi e luci pensato sia per la fotografia sia per la produzione video.',
    eqNote: 'Le esigenze di attrezzatura vengono pianificate in base alla produzione specifica.',
    eq: [
      { label: 'Fotocamere', items: ['Sony FX30', 'Sony a6700'] },
      { label: 'Obiettivi', items: ['33mm f/1.2', '50mm f/1.4', '85mm f/1.4'] },
      { label: 'Luci per foto', items: ['Godox AD600Pro', 'Godox AD300Pro'] },
      { label: 'Luci per video', items: ['GVM 300W LED', 'Luce LED 150W'] },
      { label: 'Movimento e riprese aeree', items: ['Gimbal DJI RS 4 Mini', 'Drone DJI Mini 3 Pro'] },
      { label: 'Supporti', items: ['Treppiedi professionali', 'Stativi per luci', 'Softbox 120 cm', 'Softbox 85 cm'] }
    ]
  },

  faqPage: {
    howTitle: 'Come funziona',
    steps: [
      { t: 'Raccontaci di cosa hai bisogno', d: ['Inviaci i dettagli del progetto tramite il modulo di contatto o prenota una breve chiamata.', 'Parlaci del tuo brand, dei prodotti, della location e dei contenuti che ti servono.'] },
      { t: 'Pianifichiamo la produzione', d: ['Concordiamo il piano di produzione completo prima dello shooting.', 'Include location, illuminazione, outfit, prodotti, tempistiche e consegne finali.'] },
      { t: 'Shooting', d: ['La produzione si svolge nella tua location a Milano oppure con i prodotti spediti a noi, quando adatto.'] },
      { t: 'Editing e consegna', d: ['Le tue immagini e i tuoi video vengono ritoccati e color-corretti professionalmente e preparati per le piattaforme che ti servono.'] }
    ],
    deliveryTitle: 'Consegna standard',
    deliveryPhotos: 'Foto: 7–10 giorni lavorativi',
    deliveryVideos: 'Video: 7–14 giorni lavorativi',
    deliveryNote: 'La consegna prioritaria può essere richiesta prima della prenotazione.',
    faqTitle: 'Domande frequenti',
    faq: [
      { q: 'Quanto costa uno shooting?', a: ['I pacchetti MEOCY partono da €300 per una fotografia mirata e aumentano in base alle esigenze di produzione.', 'Le produzioni di contenuti più grandi e i progetti personalizzati vengono quotati in base a portata, tempo di shooting, location e consegne.'] },
      { q: 'Posso inviarvi i miei prodotti?', a: ['Sì. I prodotti possono essere spediti direttamente a noi quando il progetto è adatto a una produzione in studio.', 'È disponibile anche la produzione on location a Milano.'] },
      { q: 'Potete venire nella mia attività?', a: ['Sì. MEOCY realizza produzioni foto e video on location a Milano e dintorni.'] },
      { q: 'Posso essere presente durante lo shooting?', a: ['Sì. I clienti possono assistere alla produzione di persona.', 'Per le produzioni adatte, si può organizzare anche la partecipazione a distanza.'] },
      { q: 'Fornite modelle e modelli?', a: ['Le modelle e i modelli possono essere organizzati in base al progetto. I compensi vengono quotati a parte quando necessari.'] },
      { q: 'Fornite truccatori e stylist?', a: ['Truccatori, stylist, assistenti e altri professionisti di produzione possono essere organizzati quando necessario. Questi costi vengono quotati a parte.'] },
      { q: 'Noleggio studio e costi delle location sono inclusi?', a: ['Non automaticamente. Noleggio studio, permessi, location specializzate e altri costi di produzione di terze parti vengono quotati a parte quando necessari.'] },
      { q: 'Quanto tempo richiede la consegna?', a: ['La consegna standard delle foto è di 7–10 giorni lavorativi.', 'La consegna standard dei video è di 7–14 giorni lavorativi.', 'La consegna prioritaria può essere disponibile su richiesta.'] },
      { q: 'In quali lingue lavorate?', a: ['English, Italiano, Français'] },
      { q: 'Dove ha sede MEOCY?', a: ['Milano e Parigi.'] }
    ]
  },

  contactPage: {
    title: 'Lavoriamo insieme',
    intro1: 'Raccontaci il tuo progetto e di cosa hai bisogno.',
    intro2: 'Più informazioni ci fornisci, più accuratamente potremo preparare il tuo preventivo.',
    name: 'Nome',
    email: 'Email',
    brand: 'Attività / Brand',
    projectType: 'Tipo di progetto',
    select: 'Seleziona…',
    preferredDate: 'Data preferita',
    location: 'Location',
    quantity: 'Numero di prodotti / outfit',
    contentType: 'Foto / Video / Entrambi',
    photo: 'Fotografia',
    video: 'Video',
    both: 'Entrambi',
    message: 'Messaggio',
    submit: 'Invia richiesta di progetto',
    sending: 'Invio in corso…',
    errName: 'Inserisci il tuo nome.',
    errEmail: 'Inserisci un indirizzo email valido.',
    errProject: 'Seleziona un tipo di progetto.',
    errMessage: 'Raccontaci brevemente il tuo progetto.',
    errGeneric: 'Qualcosa è andato storto. Riprova o scrivi a hello@meocy.com.',
    successTitle: 'Richiesta ricevuta.',
    successBody: 'Grazie {name} — una conferma sta arrivando a {email}. Ti risponderemo entro un giorno lavorativo.',
    another: 'Invia un\'altra richiesta',
    detailsTitle: 'Contatti',
    loc: 'Milano e Parigi',
    whatsappCta: 'Scrivici su WhatsApp',
    collabLabel: 'PER MODELLE E CREATIVI',
    collabTitle: 'Stai costruendo il tuo portfolio a Milano?',
    collabText1: 'MEOCY collabora con modelle e creativi a Milano per realizzare immagini fashion, editoriali e di portfolio di grande impatto.',
    collabText2: 'Se sei una modella che costruisce il proprio portfolio, un creativo emergente o semplicemente vuoi realizzare nuovi lavori visivi, contattaci.',
    collabButton: 'Collabora con MEOCY',
    projectOptions: [
      'Shooting moda / modelle',
      'Fotografia commerciale',
      'Fotografia di prodotto',
      'Ristorazione e food',
      'Ritratto / personal brand',
      'Video per i social media',
      'Produzione di contenuti completa (foto + video)',
      'Collaborazione modelle / creativi',
      'Altro'
    ]
  },

  collabPage: {
    title: 'Lavora con MEOCY',
    intro1: 'MEOCY è un piccolo studio a Milano guidato dal fondatore. Lavoro direttamente con ogni modella, agenzia e fotografo con cui collaboro.',
    intro2: 'Scegli l\'opzione più adatta a te, guarda cosa mi serve e invia i tuoi dati qui sotto. Leggo ogni messaggio personalmente.',
    tabModels: 'Modelle e talent',
    tabAgencies: 'Agenzie',
    tabCreatives: 'Fotografi e assistenti',
    offerTitle: 'Come funziona',
    needTitle: 'Cosa inviarmi',
    mIntro: 'Stai costruendo il tuo portfolio a Milano? Collaboro con modelle e modelli per realizzare immagini fashion, editoriali e di portfolio di grande impatto.',
    mOffer: [
      'Nessun compenso da nessuna delle due parti — gli shooting in collaborazione non sono retribuiti',
      'Ricevi da 10 a 25 foto professionalmente ritoccate, a seconda dello shooting',
      'Concept, location, outfit e tempistiche vengono pianificati insieme prima dello shooting',
      'I termini vengono confermati per iscritto prima dello shooting'
    ],
    mNeed: [
      'Il tuo Instagram e/o link al portfolio',
      '3–6 foto recenti (tramite link)',
      'La tua città e la tua disponibilità',
      'Se sei rappresentata/o da un\'agenzia',
      'Cosa cerchi: una collaborazione o uno shooting a pagamento'
    ],
    mPaidNote: 'Preferisci uno shooting a pagamento?',
    mPaidLink: 'Scopri il pacchetto Shooting Moda / Modelle',
    aIntro: 'Lavori con un\'agenzia di modelle a Milano? Offro test shoot per new faces e contenuti per le tue modelle.',
    aOffer: [
      'Test shoot gratuiti per new faces — limitati a 10 shooting gratuiti',
      'I test shoot gratuiti sono solo per test e portfolio, non per uso commerciale',
      'Ogni shooting gratuito viene discusso con l\'agenzia per lo specifico progetto prima di essere confermato',
      'Gli shooting commerciali vengono quotati a parte'
    ],
    aNeed: [
      'Nome dell\'agenzia, referente e sito web o Instagram',
      'Un link alla vostra model board o alle new faces che avete in mente',
      'Di cosa avete bisogno: test shoot, digitals e polaroid, comp card, lookbook o video',
      'Le vostre tempistiche o scadenze'
    ],
    cIntro: 'Lavoro con fotografi, videomaker e assistenti luci a Milano.',
    cOffer: [
      'Lavoro retribuito come assistente luci nelle mie produzioni',
      'Compensi e termini vengono concordati prima di ogni produzione'
    ],
    cNeed: [
      'Il tuo Instagram e/o link al portfolio',
      'Il tuo ruolo e la tua città',
      'La tua disponibilità',
      'La tua esperienza con le luci e sul set'
    ],
    creativesPaidNote: 'Lavoro retribuito come assistente luci.',
    name: 'Nome',
    email: 'Email',
    instagram: 'Instagram',
    portfolio: 'Link a portfolio / foto',
    city: 'Città',
    availability: 'Disponibilità',
    message: 'Messaggio (facoltativo)',
    experience: 'Esperienza',
    experienceOptions: [
      'New face',
      'Qualche esperienza',
      'Esperta/o'
    ],
    agencyQ: 'Rappresentata/o da un\'agenzia?',
    agencyOptions: [
      'No',
      'Sì'
    ],
    agencyName: 'Nome dell\'agenzia',
    lookingFor: 'Cerchi',
    lookingForOptions: [
      'Shooting in collaborazione',
      'Shooting a pagamento',
      'Entrambi'
    ],
    over18: 'Confermo di avere almeno 18 anni.',
    consent: 'Accetto che MEOCY utilizzi questi dati per rispondermi, come descritto nell\'Informativa sulla privacy.',
    contactPerson: 'Referente',
    role: 'Il tuo ruolo',
    website: 'Sito web o Instagram',
    modelsCount: 'Numero di modelle / new faces',
    need: 'Di cosa avete bisogno?',
    needOptions: [
      'Test shoot per new faces',
      'Digitals e polaroid',
      'Comp card / portfolio',
      'Lookbook / campagna',
      'Video',
      'Altro'
    ],
    boardLink: 'Link alla model board',
    timeframe: 'Tempistiche / scadenza',
    creativeRole: 'Il tuo ruolo',
    creativeRoleOptions: [
      'Fotografo',
      'Videomaker',
      'Assistente luci'
    ],
    select: 'Seleziona…',
    submit: 'Invia',
    sending: 'Invio in corso…',
    errRequired: 'Compila i campi obbligatori.',
    errEmail: 'Inserisci un indirizzo email valido.',
    errConsent: 'Accetta il consenso privacy per continuare.',
    errOver18: 'Devi avere almeno 18 anni per candidarti.',
    errGeneric: 'Qualcosa è andato storto. Riprova o scrivi a hello@meocy.com.',
    successTitle: 'Messaggio ricevuto.',
    successBody: 'Grazie {name} — leggo ogni messaggio personalmente. Se è adatto a un prossimo progetto, ti risponderò.',
    another: 'Invia un altro messaggio'
  },

  privacyCollab: {
    title: 'Moduli di collaborazione.',
    text: 'Se ci contatti tramite il modulo di collaborazione, utilizziamo i tuoi dati (nome, email, link social o portfolio e le informazioni che fornisci) solo per risponderti e per pianificare eventuali progetti. Non li vendiamo né li condividiamo e li cancelliamo su richiesta.'
  },

  milanShoot: {
    seo: {
      title: 'Servizio fotografico a Milano per coppie | Fotografia professionale | MEOCY',
      description: 'Prenota un servizio fotografico professionale di coppia a Milano con MEOCY. Scegli pacchetto, location, data e orario e riserva la tua esperienza con un acconto di €50.'
    },
    hero: {
      title: 'La vostra storia a Milano, fotografata da professionisti.',
      text: 'Fotografia di coppia professionale a Milano — dal Duomo a Brera e oltre. Scegliete l\'esperienza, le location e lasciate Milano con fotografie da conservare.',
      ctaPrimary: 'PRENOTA IL TUO SHOOTING A MILANO',
      ctaSecondary: 'SCOPRI I PACCHETTI',
      trust: 'Fotografia professionale • Location a Milano • Immagini ritoccate ad alta risoluzione'
    },
    intro: {
      title: 'Più di una foto ricordo.',
      text1: 'Vedete Milano, vivetela e fatevela fotografare da un professionista.',
      text2: 'La sessione è costruita intorno a voi — con una direzione naturale, fotografia professionale e location di Milano scelte con cura. Che viaggiate in coppia, festeggiate un momento speciale o vogliate semplicemente belle fotografie del vostro viaggio, creeremo immagini personali, curate e senza tempo.',
      features: [
        {
          t: 'Direzione professionale',
          d: 'Indicazioni di posa rilassate, così non dovrete mai chiedervi cosa fare.'
        },
        {
          t: 'Fotografia professionale',
          d: 'Fotocamera e luci di alta qualità, immagini composte con cura.'
        },
        {
          t: 'La vera Milano',
          d: 'Fotografie costruite intorno all\'architettura, alle strade e all\'atmosfera di Milano.'
        }
      ]
    },
    experience: {
      title: 'La vostra Milano. Le vostre location. La vostra storia.',
      text: 'Scegliete l\'esperienza adatta al vostro viaggio, poi selezionate le location di Milano che volete fotografare.',
      note: 'Le location si scelgono durante la prenotazione.'
    },
    locations: {
      duomo: {
        name: 'Duomo di Milano',
        desc: 'Il cuore di Milano.'
      },
      galleria: {
        name: 'Galleria Vittorio Emanuele II',
        desc: 'L\'architettura classica di Milano.'
      },
      scala: {
        name: 'Piazza della Scala',
        desc: 'La Milano storica ed elegante.'
      },
      brera: {
        name: 'Brera',
        desc: 'Arte, vie e carattere milanese.'
      },
      castello: {
        name: 'Castello Sforzesco',
        desc: 'Architettura storica e grandi spazi aperti.'
      },
      sempione: {
        name: 'Parco Sempione',
        desc: 'Verde e ritratti rilassati.'
      },
      navigli: {
        name: 'Navigli / Darsena',
        desc: 'Canali, vie e atmosfera serale.'
      },
      portaNuova: {
        name: 'Porta Nuova',
        desc: 'Lo skyline e l\'architettura della Milano moderna.'
      },
      gaeAulenti: {
        name: 'Piazza Gae Aulenti',
        desc: 'La Milano contemporanea.'
      },
      arcoPace: {
        name: 'Arco della Pace',
        desc: 'Architettura elegante e spazi aperti tutt\'intorno.'
      }
    },
    packages: {
      title: 'Scegliete la vostra esperienza a Milano',
      text: 'Tre modi di vivere Milano attraverso la fotografia professionale.',
      label: 'PACCHETTO',
      popular: 'LA PIÙ SCELTA',
      includes: 'Include',
      statTime: 'Durata',
      statPhotos: 'Foto',
      statLocations: 'Location',
      statLighting: 'Luci',
      photosValue: '{n} ritoccate',
      locationsUpTo: 'Fino a {n}',
      locationsIncluded: '{n} incluse',
      lightingAd300: 'Godox AD300 Pro',
      lightingAd600Ad300: 'Godox AD600 Pro + AD300 Pro',
      recommendedLabel: 'Location consigliata',
      recommended: 'Duomo + area intorno al Duomo',
      signatureIncluded: '4 location incluse',
      signatureExtra: 'Location aggiuntive: +€50 ciascuna',
      memory: {
        name: 'MILAN MEMORY',
        duration: '2 ORE',
        cta: 'SCEGLI MILAN MEMORY'
      },
      experience: {
        name: 'MILAN EXPERIENCE',
        duration: '3 ORE',
        cta: 'SCEGLI MILAN EXPERIENCE'
      },
      signature: {
        name: 'MILAN SIGNATURE',
        duration: '5 ORE',
        cta: 'SCEGLI MILAN SIGNATURE'
      }
    },
    features: {
      photos25: '25 fotografie ritoccate professionalmente',
      photos50: '50 fotografie ritoccate professionalmente',
      photos75: '75 fotografie ritoccate professionalmente',
      locations2: 'Fino a 2 location di Milano a scelta',
      locations3: 'Fino a 3 location di Milano a scelta',
      locations4: 'Fino a 4 location di Milano incluse',
      photographer: 'Fotografo professionista',
      naturalPosing: 'Pose naturali e direzione',
      naturalCreative: 'Pose naturali e direzione creativa',
      creativePosing: 'Direzione creativa e pose',
      lightingAd300: 'Illuminazione professionale Godox AD300 Pro',
      lightingAd600Ad300: 'Illuminazione professionale Godox AD600 Pro + AD300 Pro',
      softboxes: 'Softbox professionali da 120 cm e 85 cm',
      editing: 'Ritocco professionale',
      editingGrading: 'Ritocco professionale e color grading',
      highRes: 'Immagini digitali ad alta risoluzione',
      privateGallery: 'Galleria online privata'
    },
    selector: {
      title: 'Scegliete le vostre location a Milano',
      text: 'Selezionate i luoghi adatti alla storia che volete raccontare.',
      packageLabel: 'Il vostro pacchetto',
      counter: '{count} di {included} location incluse selezionate',
      extraCount: '+{n} location aggiuntive · +€{total}',
      select: 'Seleziona',
      selected: 'Selezionata',
      limitIncluded: 'Il vostro pacchetto include {n} location.',
      limitAdd: 'Aggiungete un\'altra location per €50.',
      addConfirm: 'Aggiungi per €50',
      dismiss: 'Mantieni la selezione',
      duomoNote: 'Con Milan Memory, il Duomo e l\'area circostante contano come una sola location.',
      continueCta: 'Continua con la prenotazione'
    },
    why: {
      title: 'Fotografia professionale. Senza l\'effetto foto da turista.',
      items: [
        {
          t: 'Attrezzatura professionale',
          d: 'Fotocamere Sony professionali e attrezzatura di illuminazione professionale.'
        },
        {
          t: 'Direzione naturale',
          d: 'Non serve saper posare. Vi guiderò io durante tutta la sessione.'
        },
        {
          t: 'Location a Milano',
          d: 'Fotografate la Milano iconica che siete venuti a vivere — e scoprite lungo la strada qualche angolo meno noto.'
        },
        {
          t: 'Ritocco professionale',
          d: 'Le fotografie finali vengono selezionate con cura e ritoccate professionalmente.'
        }
      ]
    },
    how: {
      title: 'Prenotate il vostro shooting a Milano in pochi passaggi',
      stepLabel: 'PASSO',
      steps: [
        {
          t: 'Scegliete l\'esperienza',
          d: 'Selezionate il pacchetto fotografico che preferite.'
        },
        {
          t: 'Scegliete data e orario',
          d: 'Selezionate la data che preferite e un orario disponibile.'
        },
        {
          t: 'Scegliete le location',
          d: 'Selezionate le location di Milano incluse nel vostro pacchetto.'
        },
        {
          t: 'Prenotate con €50',
          d: 'Versate un acconto di €50 con la vostra richiesta. Dopo la conferma di MEOCY via email o WhatsApp, l\'acconto blocca la vostra data.'
        }
      ],
      afterPayment: 'Dopo il pagamento, MEOCY conferma la prenotazione manualmente.',
      note: 'La prenotazione viene confermata manualmente da MEOCY dopo la richiesta.'
    },
    booking: {
      title: 'Prenota il tuo servizio fotografico a Milano',
      subtitle: 'Scegli esperienza, data, orario e location.',
      progress: [
        'Pacchetto',
        'Data e orario',
        'Location',
        'Dati',
        'Pagamento',
        'Conferma'
      ],
      stepOf: 'Passo {n} di {total}',
      back: 'Indietro',
      next: 'Continua',
      pkgTitle: 'Scegli il pacchetto',
      pkgLine: '{hours} ore • {photos} foto • fino a {locations} location',
      dateTitle: 'Scegli la data',
      prevMonth: 'Mese precedente',
      nextMonth: 'Mese successivo',
      selectedDate: 'Data scelta:',
      timeTitle: 'Scegli l\'orario',
      timeNote: 'Gli orari sono richieste: MEOCY verifica la disponibilità e conferma ogni sessione manualmente.',
      noTimes: 'Non ci sono orari disponibili in questa data. Scegli un\'altra data.',
      locTitle: 'Scegli le location',
      locUpTo: 'Seleziona fino a {n}',
      locSignature: '{n} incluse · location aggiuntive +€50 ciascuna',
      detailsTitle: 'I tuoi dati',
      name: 'Nome e cognome',
      email: 'Email',
      phone: 'WhatsApp / Telefono',
      people: 'Numero di persone',
      country: 'Paese',
      notes: 'Richieste speciali / Note',
      groupNote: 'Per gruppi più numerosi rispetto all\'esperienza standard per due persone, MEOCY confermerà disponibilità e prezzo separatamente.',
      summaryTitle: 'Riepilogo della prenotazione',
      sumPackage: 'Pacchetto',
      sumDate: 'Data',
      sumTime: 'Orario',
      sumLocations: 'Location',
      sumPeople: 'Numero di persone',
      sumPackagePrice: 'Prezzo del pacchetto',
      sumExtra: 'Location aggiuntive',
      sumNone: 'Nessuna',
      sumDeposit: 'Acconto di prenotazione',
      sumRemaining: 'Saldo restante',
      depositHeadline: 'Acconto di prenotazione: €50',
      remainingLine: 'Saldo restante: {amount}',
      payTitle: 'Acconto di prenotazione di €50',
      payCurrency: 'Valuta di pagamento: EUR (€)',
      payPending: 'Ti invieremo a breve il link per l\'acconto.',
      payButton: 'Paga l\'acconto di €50',
      payPolicy: 'Se annulli almeno {days} giorni ({hours} ore) prima dello shooting, l\'acconto di €50 viene rimborsato per intero. Se annulli meno di {days} giorni prima, l\'acconto non viene rimborsato, ma puoi chiedere un cambio di data, in base alla disponibilità.',
      policyLink: 'Condizioni di prenotazione',
      submit: 'Invia la richiesta di prenotazione',
      sending: 'Invio in corso…',
      errRequired: 'Compila questo campo.',
      errEmail: 'Inserisci un indirizzo email valido.',
      errPhone: 'Inserisci un numero WhatsApp o di telefono valido.',
      errDate: 'Scegli una data.',
      errTime: 'Scegli un orario.',
      errLocations: 'Scegli almeno una location.',
      errGeneric: 'Qualcosa è andato storto e la richiesta non è stata inviata. Riprova o scrivi a hello@meocy.com.',
      errUnavailable: 'Questa data o questo orario non si possono più richiedere. Scegline un altro.',
      errRate: 'Troppe richieste in poco tempo. Attendi qualche minuto e riprova.',
      doneTitle: 'La tua richiesta di prenotazione è stata ricevuta.',
      doneText: 'MEOCY ti darà conferma via email e WhatsApp.',
      reference: 'Codice di prenotazione',
      customerTitle: 'I tuoi dati',
      waCta: 'Invia la richiesta su WhatsApp',
      waIntro: 'Ciao MEOCY, questa è la mia richiesta per uno shooting a Milano.',
      waRef: 'Codice:',
      waPackage: 'Pacchetto:',
      waDate: 'Data:',
      waTime: 'Orario:',
      another: 'Nuova richiesta'
    },
    policy: {
      title: 'Condizioni di prenotazione',
      lines: [
        'Per riservare la data dello shooting è richiesto un acconto di €50.',
        'Se annullate almeno {days} giorni ({hours} ore) prima dello shooting, l\'acconto di €50 viene rimborsato per intero.',
        'Se annullate meno di {days} giorni prima dello shooting, l\'acconto non viene rimborsato, ma potete chiedere un cambio di data, in base alla disponibilità.',
        'I cambi di data vanno richiesti in anticipo.',
        'Dove previsto, si possono aggiungere location per €50 ciascuna.',
        'La prenotazione viene confermata manualmente da MEOCY dopo aver ricevuto la richiesta e l\'acconto.'
      ],
      termsLink: 'Termini e condizioni completi',
      fullPolicyLink: 'Condizioni di prenotazione complete'
    },
    gallery: {
      title: 'Milano attraverso il nostro obiettivo'
    },
    faq: {
      title: 'Domande frequenti',
      items: [
        {
          q: 'A chi è rivolto lo shooting a Milano?',
          a: 'A chi visita Milano e vuole fotografie professionali del proprio viaggio — soprattutto coppie e gruppi di due persone.'
        },
        {
          q: 'Possiamo prenotare in coppia?',
          a: 'Sì. Le esperienze sono pensate per coppie e gruppi di due persone.'
        },
        {
          q: 'Possiamo scegliere le location a Milano?',
          a: 'Sì. Le location si scelgono durante la prenotazione, tra quelle presentate in questa pagina.'
        },
        {
          q: 'Quante location sono incluse?',
          a: 'Milan Memory include fino a 2 location (il Duomo e l\'area circostante contano come una), Milan Experience fino a 3 e Milan Signature 4.'
        },
        {
          q: 'E se vogliamo un\'altra location?',
          a: 'Con Milan Signature si possono aggiungere altre location per €50 ciascuna.'
        },
        {
          q: 'Dobbiamo saper posare?',
          a: 'No. Vi guiderò io durante la sessione, con indicazioni naturali e rilassate.'
        },
        {
          q: 'Usate un\'illuminazione professionale?',
          a: 'Sì. Milan Experience include un Godox AD300 Pro, Milan Signature un Godox AD600 Pro e un AD300 Pro con softbox da 120 cm e 85 cm.'
        },
        {
          q: 'Quanto dura lo shooting?',
          a: 'Milan Memory dura 2 ore, Milan Experience 3 ore e Milan Signature 5 ore.'
        },
        {
          q: 'Quante fotografie ritoccate riceveremo?',
          a: '25 con Milan Memory, 50 con Milan Experience e 75 con Milan Signature — tutte ritoccate professionalmente.'
        },
        {
          q: 'Quando riceveremo le fotografie?',
          a: 'Le fotografie ritoccate vengono consegnate come immagini digitali ad alta risoluzione entro 7-10 giorni.'
        },
        {
          q: 'Come funziona l\'acconto di €50?',
          a: 'La data non è riservata finché MEOCY non conferma la prenotazione via email o WhatsApp. Dopo la conferma di MEOCY, l\'acconto di €50 blocca la vostra data e l\'importo restante si paga a parte.'
        },
        {
          q: 'Posso cambiare la data della prenotazione?',
          a: 'Sì. Il cambio di data va richiesto in anticipo ed è soggetto a disponibilità.'
        },
        {
          q: 'L\'acconto è rimborsabile?',
          a: 'Sì, se annullate almeno {days} giorni ({hours} ore) prima dello shooting: l\'acconto di €50 viene rimborsato per intero. Se annullate meno di {days} giorni prima, non viene rimborsato, ma potete chiedere un cambio di data, in base alla disponibilità.'
        },
        {
          q: 'Posso prenotare per una famiglia o un gruppo più numeroso?',
          a: 'Le esperienze sono pensate per coppie e gruppi di due persone. Per una famiglia o un gruppo più numeroso, contattateci e ne parleremo insieme.'
        }
      ]
    },
    final: {
      title: 'Fate di Milano parte della vostra storia.',
      text: 'Non lasciate Milano solo con le foto del telefono. Create qualcosa che vorrete conservare.',
      ctaPrimary: 'PRENOTA IL TUO SHOOTING A MILANO',
      ctaSecondary: 'VEDI I PACCHETTI'
    },
    ph: {
      label: 'Segnaposto foto',
      hero: 'Shooting di coppia al Duomo di Milano',
      couple: 'Ritratto di coppia a Milano',
      duomo: 'Coppia al Duomo di Milano',
      lighting: 'Ritratto di coppia con illuminazione professionale'
    },
    alt: {
      galleria: 'Ritratto sul pavimento a mosaico della Galleria Vittorio Emanuele II a Milano',
      street: 'Ritratto in una via di Milano',
      experience: 'Ritratto editoriale nella Galleria Vittorio Emanuele II, Milano',
      why: 'Ritratto naturale in una via di Milano',
      final: 'Ritratto in una via di Milano'
    }
  },

  legal: {
    updated: 'Ultimo aggiornamento: ottobre 2026',
    bookingPolicy: {
      title: 'Condizioni di prenotazione',
      intro: 'Queste condizioni si applicano alle prenotazioni di shooting a Milano richieste tramite meocy.com/milan-photoshoot.',
      sections: [
        {
          h: 'Acconto di prenotazione.',
          p: [
            'Per riservare la data dello shooting è richiesto un acconto di €50. Tutti i prezzi sono in euro (EUR).'
          ]
        },
        {
          h: 'Annullamento e rimborso.',
          p: [
            'Se annulli almeno {days} giorni ({hours} ore) prima dello shooting, l\'acconto di €50 viene rimborsato per intero.',
            'Se annulli meno di {days} giorni prima dello shooting, l\'acconto non viene rimborsato, ma puoi chiedere un cambio di data, in base alla disponibilità.'
          ]
        },
        {
          h: 'Cambi di data.',
          p: [
            'I cambi di data si possono richiedere in base alla disponibilità.',
            'I cambi di data vanno richiesti in anticipo.'
          ]
        },
        {
          h: 'Richieste di prenotazione e conferma.',
          p: [
            'Inviando il modulo di prenotazione si crea una richiesta di prenotazione. MEOCY conferma le prenotazioni manualmente.',
            'Una richiesta in attesa non è confermata finché MEOCY non la conferma via email o WhatsApp.',
            'La prenotazione viene confermata manualmente da MEOCY dopo aver ricevuto la richiesta e l\'acconto.'
          ]
        },
        {
          h: 'Disponibilità.',
          p: [
            'La disponibilità è gestita da MEOCY. Scegliere una data e un orario nel modulo non li riserva.'
          ]
        },
        {
          h: 'Pacchetti e location.',
          p: [
            'Milan Memory — €200, 2 location incluse. Milan Experience — €300, 3 location incluse. Milan Signature — €600, 4 location incluse.',
            'Dove previsto, si possono aggiungere location per €50 ciascuna.'
          ]
        },
        {
          h: 'Consegna delle foto.',
          p: [
            'Le fotografie ritoccate vengono consegnate come immagini digitali ad alta risoluzione entro 7-10 giorni.'
          ]
        },
        {
          h: 'Contatti.',
          p: [
            'hello@meocy.com · WhatsApp +39 379 105 1000'
          ]
        }
      ],
      termsLink: 'Termini e condizioni',
      privacyLink: 'Informativa sulla privacy'
    },
    cookiePolicy: {
      title: 'Cookie Policy',
      intro: 'Questa pagina descrive cosa memorizza questo sito nel tuo browser.',
      sections: [
        {
          h: 'Nessun cookie pubblicitario o di tracciamento.',
          p: [
            'Questo sito non imposta cookie propri e non utilizza cookie pubblicitari, di analisi o di tracciamento.'
          ]
        },
        {
          h: 'Preferenza di lingua (local storage).',
          p: [
            'Il sito salva un solo elemento nel local storage del browser, chiamato meocy-lang, che ricorda la lingua che usi sul sito (inglese, italiano o francese).',
            'Viene salvato alla prima visita, in base alla lingua del browser, e aggiornato quando cambi lingua. Non è un cookie, non ci viene inviato e resta nel tuo browser finché non cancelli i dati di questo sito.'
          ]
        },
        {
          h: 'Come eliminarla.',
          p: [
            'Puoi eliminare in qualsiasi momento la preferenza di lingua salvata cancellando i dati di questo sito nelle impostazioni del browser.'
          ]
        },
        {
          h: 'Modifiche.',
          p: [
            'Potremmo aggiornare questa informativa; la data più recente è indicata sopra.'
          ]
        }
      ],
      privacyLink: 'Informativa sulla privacy'
    },
    milanPrivacy: {
      title: 'Richieste di prenotazione degli shooting a Milano.',
      text: 'Quando invii una richiesta di prenotazione dalla pagina degli shooting a Milano, raccogliamo nome, email, numero WhatsApp o di telefono, paese, il pacchetto, la data, l\'orario e le location che scegli, il numero di persone ed eventuali note. Usiamo questi dati solo per gestire la tua richiesta di prenotazione. Vengono inviati via email a MEOCY. Il sito non raccoglie né conserva dati di pagamento.'
    },
    milanTerms: {
      title: 'Richieste di prenotazione degli shooting a Milano.',
      text: 'Una richiesta di prenotazione inviata dalla pagina degli shooting a Milano è una richiesta, non una prenotazione confermata: MEOCY conferma le prenotazioni manualmente via email o WhatsApp. Se annulli almeno {days} giorni ({hours} ore) prima dello shooting, l\'acconto di €50 viene rimborsato per intero; se annulli più tardi, non viene rimborsato, ma puoi chiedere un cambio di data, in base alla disponibilità. Le altre condizioni sono indicate nelle Condizioni di prenotazione. I dati inseriti vengono usati solo per gestire la richiesta e vengono inviati via email a MEOCY; il sito non conserva dati di pagamento.',
      link: 'Condizioni di prenotazione'
    },
    footer: {
      privacy: 'Informativa sulla privacy',
      terms: 'Termini e condizioni',
      bookingPolicy: 'Condizioni di prenotazione',
      cookiePolicy: 'Cookie Policy'
    }
  }
};