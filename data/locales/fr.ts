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
    eyebrow: 'Photographie commerciale · Milan · depuis 2008',
    titleA: 'Des images faites pour',
    titleB: 'vendre ce que vous créez.',
    lead: "Nous photographions produits, gastronomie et collections pour les marques qui vendent en ligne. Vous nous envoyez vos produits, ou nous venons chez vous — nous livrons une série complète, prête pour tous vos canaux, à un prix fixé avant de commencer.",
    ctaPrimary: 'Obtenir un prix fixe',
    ctaSecondary: 'Voir les travaux',
    stats: [
    { value: 'Milan · Paris', label: 'Où nous travaillons' },
    { value: 'Photographe', label: 'depuis 2008' },
    { value: '4 jours', label: 'Délai moyen' },
    { value: '96%', label: 'Clients qui reviennent' }],

    studioCaption:
    'Milan, en location et avec vos produits expédiés — tous les angles, toutes les lumières.'
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
      body: "Chez vous en location, ou avec vos produits expédiés chez nous. Venez sur place, ou suivez le flux en direct où que vous soyez.",
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
    eyebrow: 'Ce que nous apportons',
    title: 'Kit complet.\nRien de loué.',
    lead: "Appareil photographique professionnel, éclairage et poste de finition calibré. Tout ce que nous avons est nôtre et entretenu. Nous apportons l'essentiel à chaque séance, et nous quotons ouvertement si quelque chose d'extra est nécessaire pour votre brief.",
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
    note: "Tout est calibré en interne. Si un brief demande un matériel que nous n'avons pas, nous le louons et l'indiquons clairement avant la séance."
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
    whereStudio: 'Notre Studio',
    whereStudioNote: 'Maîtrise totale de la lumière',
    whereLocation: 'Chez vous',
    whereLocationNote: 'Nous emportons le studio',
    addOnLegend: 'Autre chose ?',
    addOns: {
      simpleVideo: { label: 'Vidéo simple', description: '1 setup, une location, pas de changement d\'éclairage' },
      styledVideo: { label: 'Vidéo stylisée', description: 'Setups d\'éclairage' },
      extraPhotos: { label: '10 photos supplémentaires retouchées', description: 'Retouche & détourages marketplace' },
      express: { label: 'Livraison express', description: '48h' }
    },
    resultLabel: 'Votre estimation',
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
    lead: "Commencez là où vous en êtes. La plupart des marques débutent avec Gold et grandissent à partir de là.",
    best: 'La plus choisie',
    volume: 'Volume',
    delivery: 'Livraison',
    from: 'à partir de',
    choose: (name: string) => `Choisir ${name}`,
    tiers: {
      silver: {
        name: 'Silver',
        tagline: 'Voyage / Magasin / Produits',
        shots: '40 photos incluses',
        turnaround: '2 semaines',
        includes: [
        '4 heures en location',
        '1 vidéo, 30 secondes',
        'Jusqu\'à 10 tenues ou produits',
        'Making-of (optionnel)',
        'Tenue supplémentaire : 25 € chacune']

      },
      gold: {
        name: 'Gold',
        tagline: 'Magasin et plein air',
        shots: '75 photos incluses',
        turnaround: '2 semaines',
        includes: [
        '6 heures en location',
        '2 lieux en un jour',
        '1 vidéo + 100 € par vidéo supplémentaire',
        'Jusqu\'à 20 tenues ou produits',
        'Making-of inclus']

      },
      platinum: {
        name: 'Platinum',
        tagline: 'Content Sprint',
        shots: '100 photos incluses',
        turnaround: '3 semaines',
        includes: [
        '8 heures en location',
        '2 lieux en un jour',
        '10 vidéos (5 voice-over, 5 musique)',
        'Étalonnage couleur professionnel',
        'Instagram Reels + TikTok optimisé']

      }
    }
  },

  faq: {
    title: 'Les questions qui reviennent chaque semaine.',
    leadBefore: 'Un doute ? Ecrivez a',
    leadAfter: 'et une personne vous repond sous un jour ouvre.',
    items: [
    {
      q: 'Combien coute reellement une seance ?',
      a: "Les formules vont de 400 € a 1 000 € selon la portee, les heures, les lieux et les besoins video. L\'estimateur ci-dessus utilise le meme calcul que nos devis."
    },
    {
      q: 'Puis-je envoyer mes produits ou venez-vous chez moi ?',
      a: "Les deux. Vous pouvez nous envoyer vos produits a Milan et nous les photographierons ici. Ou nous venons dans votre magasin, studio ou lieu. Dites-nous votre preference quand vous reservez."
    },
    {
      q: 'Puis-je assister a la seance ?',
      a: "Toujours avec plaisir. Si vous ne pouvez pas vous deplacer, un flux en direct vous permet de valider les images depuis votre bureau."
    },
    {
      q: 'Quels formats vais-je recevoir ?',
      a: "Des masters TIFF ou JPEG pleine resolution, ainsi que des cadrages prets a publier pour votre boutique, Instagram et vos campagnes. Les detourages pour les marketplaces sont inclus dans chaque formule."
    },
    {
      q: 'Combien de temps a l\'avance faut-il reserver ?',
      a: "Deux a trois semaines sont confortables. Nous gardons chaque mois quelques creneaux express pour les lancements urgents."
    },
    {
      q: 'Dans quelles langues travaillez-vous ?',
      a: 'Anglais, francais et italien — sur le plateau comme dans chaque document que vous recevez.'
    }]

  },

  booking: {
    titleA: 'Fixons une date',
    titleB: 'dans l\'agenda.',
    lead: "Dites-nous ce que vous vendez, ou vous voulez photographier et quand vous avez besoin des images. Nous repondons sous un jour ouvre avec un plan de prise de vue et un prix fixe — sans appel obligatoire.",
    studioLabel: 'Lieu',
    languagesLabel: 'Langues',
    languagesValue: 'English · Francais · Italiano',
    formTitle: 'Demander une date',
    name: 'Votre nom',
    namePlaceholder: 'Giulia Rossi',
    email: 'E-mail',
    emailPlaceholder: 'vous@marque.com',
    brief: 'Que photographions-nous ?',
    briefPlaceholder: '24 produits de soin pour un lancement de boutique en octobre.',
    error: 'Merci d\'indiquer votre nom et un e-mail valide pour que nous puissions repondre.',
    submit: 'Envoyer le brief',
    sending: 'Envoi',
    disclaimer: 'Sans engagement. Nous gardons votre date 48 heures.',
    sentTitle: 'Brief bien reçu.',
    sentBody: (name: string, email: string) =>
    `Merci ${name} — une confirmation part vers ${email}. Vous recevrez le plan de prise de vue et le prix fixe sous un jour ouvré.`,
    again: 'Envoyer un autre brief'
  },

  footer: {
    tagline: 'Photographie commerciale pour les marques qui vendent. Milan-based, depuis 2008.',
    rights: 'Tous droits réservés.'
  }
};