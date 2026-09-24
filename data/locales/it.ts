import type { Dict } from './en';

export const it: Dict = {
  label: 'Italiano',
  short: 'IT',
  htmlLang: 'it',

  nav: {
    links: {
      work: 'Lavori',
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
    eyebrow: 'Fotografia commerciale · Milano · dal 2017',
    titleA: 'Immagini fatte per',
    titleB: 'vendere ciò che crei.',
    lead: "Fotografiamo prodotti, cibo e collezioni per i brand che vendono online. Tu ci mandi ciò che vendi — noi consegniamo un set completo, pronto per ogni canale, a un prezzo fissato prima di iniziare.",
    ctaPrimary: 'Ottieni un prezzo fisso',
    ctaSecondary: 'Guarda i lavori',
    stats: [
    { value: '420+', label: 'Shooting consegnati' },
    { value: '9 anni', label: 'Studio a Milano' },
    { value: '4 giorni', label: 'Tempo medio' },
    { value: '96%', label: 'Clienti che tornano' }],

    studioCaption:
    'Il nostro studio, Via Tortona — una sala, fondale bianco, collegata al tuo schermo.'
  },

  clients: { label: 'Clienti selezionati' },

  work: {
    eyebrow: 'Lavori selezionati',
    title: 'Fotografie per vendere,\nnon per un portfolio.',
    lead: 'Un breve resoconto di commesse recenti — la richiesta, ciò che abbiamo consegnato e cosa è cambiato.',
    scopeLabel: 'Lavorazione',
    outcomeLabel: 'Risultato',
    projects: {
      ambra: {
        title: 'Ambra Eau de Parfum',
        sector: 'Profumo · campagna di lancio',
        scope: '22 immagini, una giornata in studio, scontorni su bianco e tre tagli lifestyle.',
        outcome: 'Lancio esaurito in nove giorni'
      },
      nord: {
        title: 'Everyday Carry',
        sector: 'Audio consumer · catalogo',
        scope: '48 immagini su sei referenze, pensate per scontorni puliti su ogni marketplace.',
        outcome: 'Conversione delle schede +18%'
      },
      marconi: {
        title: 'Sartoria Autunno',
        sector: 'Moda · lookbook',
        scope: '40 look fotografati in una sola giornata, consegnati in quattro.',
        outcome: 'Ordini wholesale aperti due settimane prima'
      },
      nove: {
        title: 'Primi Piatti',
        sector: 'Ristorante · menù & delivery',
        scope: '30 piatti illuminati come la sala in cui vengono serviti, più clip verticali.',
        outcome: 'Ordini delivery +31%'
      }
    }
  },

  process: {
    eyebrow: 'Dal primo messaggio ai file finali',
    title: 'Saprai sempre cosa succede dopo.',
    lead: 'Niente gergo, nessuna fattura a sorpresa. Quattro passaggi, tempi fissi, una sola persona che segue il progetto dall’inizio alla fine.',
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
      body: 'Nel nostro studio a Milano o da te. Partecipa di persona, oppure segui il collegamento live ovunque tu sia.',
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
    eyebrow: 'Lo studio',
    title: 'Una sala.\nTutto di proprietà.',
    lead: 'Uno studio compatto e controllato — fondale bianco, illuminazione professionale e una postazione di finitura calibrata. Nulla a noleggio, nessuna voce a sorpresa in fattura.',
    groups: {
      camera: 'Corpi macchina',
      lenses: 'Ottiche',
      lighting: 'Illuminazione',
      support: 'Supporti',
      aerial: 'Aereo',
      storage: 'Archiviazione',
      power: 'Alimentazione',
      post: 'Post-produzione'
    },
    note: 'Tutto è manutenuto e calibrato internamente. Se un brief richiede qualcosa che non abbiamo, lo noleggiamo e lo indichiamo apertamente prima dello shooting.'
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
    countMin: '5 — un piccolo drop',
    countMax: '80 — un catalogo completo',
    whereLabel: 'Dove?',
    whereStudio: 'Il nostro studio a Milano',
    whereStudioNote: 'Controllo totale della luce',
    whereLocation: 'Da te',
    whereLocationNote: 'Portiamo lo studio con noi',
    addOnLegend: 'Serve altro?',
    addOns: {
      model: { label: 'Casting talent', description: 'Selezioniamo, ingaggiamo e paghiamo noi.' },
      styling: { label: 'Styling & set', description: 'Props, superfici, guardaroba.' },
      video: { label: 'Clip video verticali', description: '6–10 clip dallo stesso set.' },
      express: { label: 'Consegna express', description: 'File ritoccati entro 48 ore.' }
    },
    resultLabel: 'La tua stima',
    vat: 'IVA esclusa. Fissato per iscritto prima di iniziare.',
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
    lead: 'Parti da dove sei. La maggior parte dei brand inizia con Signature e passa a Campaign quando il primo set si ripaga da solo.',
    best: 'Il più scelto',
    volume: 'Volume',
    delivery: 'Consegna',
    from: 'da',
    choose: (name: string) => `Scegli ${name}`,
    tiers: {
      essential: {
        name: 'Essential',
        tagline: 'Per un primo catalogo o un piccolo drop.',
        shots: 'Fino a 15 immagini finali',
        turnaround: '5 giorni lavorativi',
        includes: [
        'Mezza giornata in studio',
        'Uno schema luci',
        'Ritocco standard',
        'Export web + social']

      },
      signature: {
        name: 'Signature',
        tagline: 'Il più richiesto. Pronto per la campagna in un giorno.',
        shots: 'Fino a 40 immagini finali',
        turnaround: '4 giorni lavorativi',
        includes: [
        'Giornata intera in studio o in loco',
        'Tre schemi luci',
        'Art direction + shot list',
        'Ritocco avanzato',
        'Clip video verticali']

      },
      campaign: {
        name: 'Campaign',
        tagline: 'Produzione completa, video incluso.',
        shots: '80+ immagini finali',
        turnaround: '7 giorni lavorativi',
        includes: [
        'Due giornate di shooting',
        'Casting + styling',
        'Set design',
        'Foto e video insieme',
        'Diritti d’uso per il paid']

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
      a: 'La maggior parte dei progetti si colloca tra 690 € e 3.200 € in base al numero di immagini finali, all’eventuale casting e alla costruzione del set. Il calcolatore qui sopra usa la stessa matematica dei nostri preventivi.'
    },
    {
      q: 'Devo spedire i prodotti a Milano?',
      a: 'Di solito sì, al resto pensiamo noi. Spedisci allo studio almeno tre giorni prima. Fotografiamo, riconfezioniamo e restituiamo tutto assicurato. Per oggetti fragili o ingombranti veniamo noi da te.'
    },
    {
      q: 'Posso essere presente allo shooting?',
      a: 'Sempre benvenuto. Se non puoi spostarti, attiviamo un collegamento live per approvare gli scatti in tempo reale dalla tua scrivania.'
    },
    {
      q: 'Quali formati ricevo?',
      a: 'Master TIFF o JPEG a piena risoluzione, più tagli pronti per shop, Instagram e campagne. Gli scontorni su bianco per i marketplace sono inclusi in ogni pacchetto.'
    },
    {
      q: 'Con quanto anticipo conviene prenotare?',
      a: 'Due o tre settimane sono comode. Ogni mese teniamo alcuni slot express per i lanci che non possono aspettare.'
    },
    {
      q: 'In quali lingue lavorate?',
      a: 'Inglese, francese e italiano — sul set e in ogni documento che ricevi.'
    }]

  },

  booking: {
    titleA: 'Mettiamo una data',
    titleB: 'in agenda.',
    lead: 'Raccontaci cosa vendi e quando ti servono le immagini. Rispondiamo entro un giorno lavorativo con shot list e prezzo fisso — nessuna call obbligatoria.',
    studioLabel: 'Studio',
    languagesLabel: 'Lingue',
    languagesValue: 'English · Français · Italiano',
    formTitle: 'Richiedi una data',
    name: 'Il tuo nome',
    namePlaceholder: 'Giulia Rossi',
    email: 'Email',
    emailPlaceholder: 'tu@brand.com',
    brief: 'Cosa fotografiamo?',
    briefPlaceholder: '24 prodotti skincare per il lancio dello shop a ottobre.',
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
    tagline: 'Fotografia commerciale per i brand che vendono. Milano, dal 2017.',
    rights: 'Tutti i diritti riservati.'
  }
};