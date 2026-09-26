import type { Dict } from './en';

export const fr: Dict = {
  label: 'Français',
  short: 'FR',
  htmlLang: 'fr',

  nav: {
    links: {
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
    eyebrow: 'Photo & vidéo pour les marques qui vendent en ligne · Milan · depuis 2008',
    titleA: 'Du contenu fait pour',
    titleB: 'vendre ce que vous créez.',
    lead: "Les photos et vidéos dont votre marque a besoin pour vendre en ligne — photos de produits, reels prêts pour les réseaux et contenus de campagne, pour votre boutique, vos publicités et vos réseaux sociaux. Envoyez-nous ce que vous vendez, ou nous venons à vous. Une seule équipe pour la photo et la vidéo, à un prix fixe convenu avant de commencer. Marque récemment renouvelée, nous accueillons de nouveaux clients.",
    ctaPrimary: 'Obtenir un prix fixe',
    stats: [
    { value: 'Milan · Paris', label: 'Où nous travaillons' },
    { value: 'Photo + Vidéo', label: 'Une équipe, les deux' },
    { value: 'Photographe', label: 'depuis 2008' },
    { value: 'Prix fixe', label: 'Convenu avant de commencer' }],

    studioCaption:
    'Milan, en location et avec vos produits expédiés — tous les angles, toutes les lumières.'
  },

  clients: { label: 'Clients sélectionnés' },

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
      camerasLenses: 'Appareils & objectifs',
      lightingPhoto: 'Éclairage — Photo',
      lightingVideo: 'Éclairage — Vidéo',
      supportGrip: 'Supports & accessoires'
    },
    items: {
      camerasLenses: ['Sony FX30', 'Sony a6700', '33mm f/1.2', '85mm f/1.4', '50mm f/1.4'],
      lightingPhoto: ['Godox AD600Pro', 'Godox AD300Pro'],
      lightingVideo: ['GVM 300W LED', '150W LED light'],
      supportGrip: ['Tripods', 'Light stands', '120cm & 85cm softboxes']
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
    countMin: '0 — tarif de base',
    countMax: '80 — catalogue complet',
    whereLabel: 'Où ?',
    whereStudio: 'Notre Studio',
    whereStudioNote: 'Maîtrise totale de la lumière',
    whereLocation: 'Chez vous',
    whereLocationNote: 'Nous emportons le studio',
    addOnLegend: 'Autre chose ?',
    addOns: {
      simpleVideo: { label: 'Vidéo simple', description: '1 setup, une location, pas de changement d\'éclairage' },
      styledVideo: { label: 'Vidéo commerciale pour réseaux sociaux', description: 'Setups d\'éclairage, 2 heures d\'enregistrement' },
      socialPack: { label: 'Pack vidéo réseaux sociaux', description: '4 vidéos courtes, moins de 20 secondes chacune — prêtes pour Reels, TikTok et pubs' },
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
        shots: '50 photos incluses',
        turnaround: '3 semaines',
        includes: [
        '8 heures en location',
        '2 lieux en un jour',
        '5 vidéos',
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
      a: "Les formules vont de €500 a €1 000 selon la portee, les heures, les lieux et les besoins video. L\'estimateur ci-dessus utilise le meme calcul que nos devis — et chaque prix est fixe par ecrit avant de commencer."
    },
    {
      q: 'Puis-je envoyer mes produits ou venez-vous chez moi ?',
      a: "Envoyez-nous vos produits et nous les photographierons en studio, ou nous venons a votre location a Milan et au-dela. Comme c\'est plus facile — le prix est convenu d\'avance de toute facon."
    },
    {
      q: 'Puis-je assister a la seance ?',
      a: "Pour les seances en location, vous etes bienvenu a vous joindre, ou envoyez quelqu\'un en qui vous avez confiance pour vous representer. Pour les seances de produits en studio, nous vous tenons informe avec une diffusion en direct, afin que vous puissiez approuver les images en temps reel sans voyager."
    },
    {
      q: 'Quels formats vais-je recevoir ?',
      a: "Fichiers haute resolution prets pour l\'impression, plus des versions optimisees pour le web dimensionnees pour votre boutique, listes de places de marche et canaux sociaux. Dites-nous ou vivront les images et nous livrons les bons cadrages."
    },
    {
      q: 'Combien de temps a l\'avance faut-il reserver ?',
      a: "Un preavis d\'une semaine est ideal, bien que nous puissions souvent integrer des petits travaux plus tot. Envoyez votre brief via le formulaire et nous confirmerons la date la plus proche que nous pouvons garantir."
    },
    {
      q: 'Dans quelles langues travaillez-vous ?',
      a: 'Anglais, francais et italien — sur le plateau et dans chaque document que vous recevez.'
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
    dateLabel: 'Choisissez une date',
    timeLabel: 'Choisissez une heure',
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