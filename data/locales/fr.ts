import type { Dict } from './en';

export const fr: Dict = {
  label: 'Français',
  short: 'FR',
  htmlLang: 'fr',

  nav: {
    links: {
      work: 'Travaux',
      approach: 'Méthode',
      studio: 'Studio',
      pricing: 'Tarifs',
      packages: 'Formules',
      faq: 'FAQ'
    },
    cta: 'Réserver une séance',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    language: 'Langue'
  },

  hero: {
    eyebrow: 'Photographie commerciale · Milan · depuis 2017',
    titleA: 'Des images faites pour',
    titleB: 'vendre ce que vous créez.',
    lead: "Nous photographions produits, gastronomie et collections pour les marques qui vendent en ligne. Vous nous envoyez vos produits — nous livrons une série complète, prête pour tous vos canaux, à un prix fixé avant de commencer.",
    ctaPrimary: 'Obtenir un prix fixe',
    ctaSecondary: 'Voir les travaux',
    stats: [
    { value: '420+', label: 'Séances livrées' },
    { value: '9 ans', label: 'Studio à Milan' },
    { value: '4 jours', label: 'Délai moyen' },
    { value: '96%', label: 'Clients qui reviennent' }],

    studioCaption:
    'Notre studio, Via Tortona — une salle, fond blanc, connectée à votre écran en direct.'
  },

  clients: { label: 'Clients sélectionnés' },

  work: {
    eyebrow: 'Travaux sélectionnés',
    title: 'Photographié pour vendre,\npas pour un portfolio.',
    lead: "Un court aperçu de commandes récentes — la demande, ce que nous avons livré, et ce que cela a changé.",
    scopeLabel: 'Prestation',
    outcomeLabel: 'Résultat',
    projects: {
      ambra: {
        title: 'Ambra Eau de Parfum',
        sector: 'Parfum · campagne de lancement',
        scope: "22 images, une journée en studio, détourages sur blanc et trois cadrages lifestyle.",
        outcome: 'Lancement épuisé en neuf jours'
      },
      nord: {
        title: 'Everyday Carry',
        sector: 'Audio grand public · catalogue',
        scope: '48 images sur six références, pensées pour un détourage net sur chaque marketplace.',
        outcome: 'Conversion des fiches +18%'
      },
      marconi: {
        title: 'Tailoring Automne',
        sector: 'Mode · lookbook',
        scope: '40 silhouettes photographiées en une journée, livrées en quatre.',
        outcome: 'Commandes wholesale ouvertes deux semaines plus tôt'
      },
      nove: {
        title: 'Primi Piatti',
        sector: 'Restaurant · carte & livraison',
        scope: '30 plats éclairés comme la salle où ils sont servis, plus des clips verticaux.',
        outcome: 'Commandes en livraison +31%'
      }
    }
  },

  process: {
    eyebrow: 'Du premier message aux fichiers finaux',
    title: 'Vous saurez toujours ce qui vient ensuite.',
    lead: "Pas de jargon, pas de facture surprise. Quatre étapes, des délais fixes, une seule personne qui suit le projet du début à la fin.",
    steps: [
    {
      title: 'Dites-nous ce que vous vendez',
      body: "Un appel court ou un formulaire. Nous regardons vos produits, vos canaux et les images qui vous manquent.",
      duration: '20 minutes'
    },
    {
      title: 'Nous envoyons le plan de prise de vue',
      body: "Chaque image est planifiée avant de toucher un appareil — angles, accessoires, lumière et usage final.",
      duration: '2 jours'
    },
    {
      title: 'Jour de shooting',
      body: "Dans notre studio à Milan ou chez vous. Venez sur place, ou suivez le flux en direct où que vous soyez.",
      duration: 'Demi-journée ou journée'
    },
    {
      title: 'Sélection, retouche, livraison',
      body: "Vous choisissez vos préférées dans une galerie privée. Nous retouchons et livrons dans tous les formats utiles.",
      duration: '4–7 jours'
    }]

  },

  testimonials: {
    eyebrow: 'Paroles de clients',
    title: 'Ce que les images ont changé.',
    items: {
      t1: {
        quote:
        "Chaque image était planifiée avant notre arrivée, la journée a été sereine. Le résultat donne à notre lancement l'allure d'une marque trois fois plus grande.",
        role: 'Fondatrice',
        result: 'Épuisé en 9 jours'
      },
      t2: {
        quote:
        "Quarante silhouettes en une journée de studio, livrées en quatre. Personne d'autre ne voulait même le chiffrer.",
        role: 'Directeur de création',
        result: '40 silhouettes · 1 jour'
      },
      t3: {
        quote:
        "Nos photos de carte ressemblent enfin à la salle où les plats sont servis. Les commandes en livraison ont augmenté dès la semaine du changement.",
        role: 'Propriétaire',
        result: '+31% de commandes'
      }
    }
  },

  equipment: {
    eyebrow: 'Le studio',
    title: 'Une salle.\nTout en propre.',
    lead: "Un studio compact et maîtrisé — fond blanc, éclairage professionnel et un poste de finition calibré. Rien de loué, aucune ligne surprise sur votre facture.",
    groups: {
      camera: 'Boîtiers',
      lenses: 'Optiques',
      lighting: 'Éclairage',
      support: 'Supports',
      aerial: 'Aérien',
      storage: 'Stockage',
      power: 'Énergie',
      post: 'Post-production'
    },
    note: "Tout est entretenu et calibré en interne. Si un brief demande un matériel que nous n'avons pas, nous le louons et l'indiquons clairement avant la séance."
  },

  estimator: {
    eyebrow: 'Le prix, avant même de demander',
    title: 'Votre prix, avant de parler à qui que ce soit.',
    lead: "Déplacez les curseurs et regardez le montant évoluer. C'est le calcul exact qui figure derrière chacun de nos devis.",
    categoryLegend: 'Que photographions-nous ?',
    categories: {
      product: 'Produit',
      restaurant: 'Gastronomie',
      fashion: 'Mode',
      brand: 'Marque'
    },
    countLabel: "Combien d'images finales ?",
    countMin: '5 — une petite série',
    countMax: '80 — un catalogue complet',
    whereLabel: 'Où ?',
    whereStudio: 'Notre studio à Milan',
    whereStudioNote: 'Maîtrise totale de la lumière',
    whereLocation: 'Chez vous',
    whereLocationNote: 'Nous emportons le studio',
    addOnLegend: 'Autre chose ?',
    addOns: {
      model: { label: 'Casting de talents', description: 'Nous castons, réservons et rémunérons.' },
      styling: { label: 'Stylisme & décors', description: 'Accessoires, surfaces, garde-robe.' },
      video: { label: 'Clips vidéo verticaux', description: '6 à 10 clips issus du même plateau.' },
      express: { label: 'Livraison express', description: 'Fichiers retouchés sous 48 heures.' }
    },
    resultLabel: 'Votre estimation',
    vat: 'Hors TVA. Fixé par écrit avant de commencer.',
    lineStudio: (category: string) => `Séance ${category.toLowerCase()} — studio & éclairage`,
    lineImages: (count: number) => `${count} images finales retouchées`,
    lineLocation: 'Équipe et transport du matériel sur place',
    deliveryLabel: 'Fichiers livrés',
    delivery48: '48 heures',
    delivery7: '7 jours ouvrés',
    delivery4: '4 jours ouvrés',
    recommendedLabel: 'Formule conseillée',
    oneDay: 'Une journée de prise de vue',
    twoDays: 'Deux journées de prise de vue',
    cta: 'Réserver une date avec ce brief'
  },

  packages: {
    eyebrow: 'Formules',
    title: 'Trois façons de travailler ensemble.',
    lead: "Commencez là où vous en êtes. La plupart des marques débutent avec Signature et passent à Campaign une fois la première série rentabilisée.",
    best: 'La plus choisie',
    volume: 'Volume',
    delivery: 'Livraison',
    from: 'à partir de',
    choose: (name: string) => `Choisir ${name}`,
    tiers: {
      essential: {
        name: 'Essential',
        tagline: 'Pour un premier catalogue ou une petite série.',
        shots: "Jusqu'à 15 images finales",
        turnaround: '5 jours ouvrés',
        includes: [
        'Demi-journée en studio',
        'Un schéma de lumière',
        'Retouche standard',
        'Exports web + réseaux']

      },
      signature: {
        name: 'Signature',
        tagline: 'La plus demandée. Prête pour la campagne en un jour.',
        shots: "Jusqu'à 40 images finales",
        turnaround: '4 jours ouvrés',
        includes: [
        'Journée complète en studio ou sur place',
        'Trois schémas de lumière',
        'Direction artistique + plan de prise de vue',
        'Retouche avancée',
        'Clips vidéo verticaux']

      },
      campaign: {
        name: 'Campaign',
        tagline: 'Production complète, vidéo incluse.',
        shots: '80+ images finales',
        turnaround: '7 jours ouvrés',
        includes: [
        'Deux jours de prise de vue',
        'Casting + stylisme',
        'Conception du décor',
        'Photo et vidéo ensemble',
        "Droits d'usage pour la publicité"]

      }
    }
  },

  faq: {
    title: 'Les questions qui reviennent chaque semaine.',
    leadBefore: 'Un doute ? Écrivez à',
    leadAfter: 'et une personne vous répond sous un jour ouvré.',
    items: [
    {
      q: 'Combien coûte réellement une séance ?',
      a: "La plupart des projets se situent entre 690 € et 3 200 € selon le nombre d'images finales, le recours à des talents et l'ampleur du décor. L'estimateur ci-dessus utilise le même calcul que nos devis."
    },
    {
      q: 'Dois-je envoyer mes produits à Milan ?',
      a: "En général oui, et nous gérons le reste. Expédiez au studio au moins trois jours avant. Nous photographions, remballons et renvoyons le tout assuré. Pour les pièces fragiles ou volumineuses, nous venons à vous."
    },
    {
      q: 'Puis-je assister à la séance ?',
      a: "Toujours avec plaisir. Si vous ne pouvez pas vous déplacer, un flux en direct vous permet de valider les images depuis votre bureau."
    },
    {
      q: 'Quels formats vais-je recevoir ?',
      a: "Des masters TIFF ou JPEG pleine résolution, ainsi que des cadrages prêts à publier pour votre boutique, Instagram et vos campagnes. Les détourages sur blanc sont inclus dans chaque formule."
    },
    {
      q: 'Combien de temps à l’avance faut-il réserver ?',
      a: "Deux à trois semaines sont confortables. Nous gardons chaque mois quelques créneaux express pour les lancements urgents."
    },
    {
      q: 'Dans quelles langues travaillez-vous ?',
      a: 'Anglais, français et italien — sur le plateau comme dans chaque document que vous recevez.'
    }]

  },

  booking: {
    titleA: 'Fixons une date',
    titleB: 'dans l’agenda.',
    lead: "Dites-nous ce que vous vendez et quand vous avez besoin des images. Nous répondons sous un jour ouvré avec un plan de prise de vue et un prix fixe — sans appel obligatoire.",
    studioLabel: 'Studio',
    languagesLabel: 'Langues',
    languagesValue: 'English · Français · Italiano',
    formTitle: 'Demander une date',
    name: 'Votre nom',
    namePlaceholder: 'Giulia Rossi',
    email: 'E-mail',
    emailPlaceholder: 'vous@marque.com',
    brief: 'Que photographions-nous ?',
    briefPlaceholder: '24 produits de soin pour un lancement de boutique en octobre.',
    error: 'Merci d’indiquer votre nom et un e-mail valide pour que nous puissions répondre.',
    submit: 'Envoyer le brief',
    sending: 'Envoi',
    disclaimer: 'Sans engagement. Nous gardons votre date 48 heures.',
    sentTitle: 'Brief bien reçu.',
    sentBody: (name: string, email: string) =>
    `Merci ${name} — une confirmation part vers ${email}. Vous recevrez le plan de prise de vue et le prix fixe sous un jour ouvré.`,
    again: 'Envoyer un autre brief'
  },

  footer: {
    tagline: 'Photographie commerciale pour les marques qui vendent. Milan, depuis 2017.',
    rights: 'Tous droits réservés.'
  }
};