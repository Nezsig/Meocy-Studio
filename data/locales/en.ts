export const en = {
  label: 'English',
  short: 'EN',
  htmlLang: 'en',

  nav: {
    links: {
      approach: 'Approach',
      studio: 'Studio',
      pricing: 'Pricing',
      packages: 'Packages',
      faq: 'FAQ'
    },
    cta: 'Book a shoot',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language'
  },

  hero: {
    eyebrow: 'Photo & video for brands that sell online · Milan · since 2008',
    titleA: 'Content made to',
    titleB: 'sell what you make.',
    lead: 'The photos and videos your brand needs to sell online — product shots, social-ready reels, and campaign content for your store, ads and social channels. Send us what you sell, or we come to your location. One team for both photo and video, on a fixed price agreed before we start. Newly rebranded, now taking on new brands.',
    ctaPrimary: 'Get a fixed price',
    stats: [
    { value: 'Milan · Paris', label: 'Where we shoot' },
    { value: 'Photo + Video', label: 'One team, both' },
    { value: 'Photographer', label: 'since 2008' },
    { value: 'Fixed price', label: 'Agreed before we start' }],

    studioCaption: 'Milan-based, working on-location and with shipped products — all angles, all light.'
  },

  clients: { label: 'Selected clients' },

  process: {
    eyebrow: 'From first message to final files',
    title: 'You will always know what happens next.',
    lead: 'No jargon, no surprise invoices. Four steps, fixed timings, one person looking after the project from start to finish.',
    steps: [
    {
      title: 'Tell us what you sell',
      body: 'A short call or a form. We look at your products, your channels, and the images you wish you had.',
      duration: '20 minutes'
    },
    {
      title: 'We send a shot list',
      body: 'Every frame planned before anyone touches a camera — angles, props, light, and where each image will be used.',
      duration: '2 days'
    },
    {
      title: 'Shoot day',
      body: 'At your location or with shipped products. Join in person, or watch the live tethered feed from anywhere.',
      duration: 'Half or full day'
    },
    {
      title: 'Selects, retouch, deliver',
      body: 'You choose favourites in a private gallery. We retouch and deliver in every crop your channels need.',
      duration: '4–7 days'
    }]

  },

  testimonials: {
    eyebrow: 'Client words',
    title: 'What the work did for them.',
    items: {
      t1: {
        quote:
        'They planned every frame before we arrived, so the shoot day felt calm. The images made our launch look like a brand three times our size.',
        role: 'Founder',
        result: 'Sold out in 9 days'
      },
      t2: {
        quote:
        'Forty looks in one studio day, delivered in four. Nobody else we spoke to would even quote that.',
        role: 'Creative Director',
        result: '40 looks · 1 day'
      },
      t3: {
        quote:
        'Our menu photography finally looks like the room the food is served in. Delivery orders went up the week we changed the images.',
        role: 'Owner',
        result: '+31% delivery orders'
      }
    }
  },

  equipment: {
    eyebrow: 'What we bring',
    title: 'Full kit.\nNothing rented.',
    lead: 'Professional-grade camera, lighting, and editing setup. Everything we own is maintained and colour-calibrated. We carry the essentials on every shoot, and we quote openly if we need to rent anything extra for your brief.',
    groups: {
      camerasLenses: 'Cameras & lenses',
      lightingPhoto: 'Lighting — Photography',
      lightingVideo: 'Lighting — Video',
      supportGrip: 'Support & grip'
    },
    items: {
      camerasLenses: ['Sony FX30', 'Sony a6700', '33mm f/1.2', '85mm f/1.4', '50mm f/1.4'],
      lightingPhoto: ['Godox AD600Pro', 'Godox AD300Pro'],
      lightingVideo: ['GVM 300W LED', '150W LED light'],
      supportGrip: ['Tripods', 'Light stands', '120cm & 85cm softboxes']
    },
    note: 'Everything is colour-calibrated in-house. If a brief needs something we do not own, we rent it and quote it openly before the shoot.'
  },

  estimator: {
    eyebrow: 'Video pricing, before you ask',
    title: 'Build your video quote.',
    lead: 'Choose how many videos and the style you want. Price updates instantly — this is what we charge.',
    categoryLabel: 'What are we filming?',
    categories: {
      product: 'Product',
      food: 'Food',
      fashion: 'Fashion',
      brand: 'Brand'
    },
    videoTypeLegend: 'Video type',
    videoTypes: {
      basic: {
        name: 'Basic',
        description: '1 location · 1 lighting · no voiceover',
        price: 100,
        unit: 'video'
      },
      voiceover: {
        name: 'Voiceover & music',
        description: 'Basic video + voiceover + royalty-free music + extra polish',
        price: 150,
        unit: 'video'
      },
      social: {
        name: 'Social media video',
        description: 'Model voice · 2 lighting setups · one location with lighting change · 2 hours recording',
        price: 150,
        unit: 'video'
      },
      pack: {
        name: 'Social media video pack',
        description: '4 short videos (under 20s) per pack — Reels, TikTok & ads.',
        price: 500,
        unit: 'pack'
      },
      commercial: {
        name: 'Social media commercial video',
        description: 'Premium: 4-hour shoot · lighting changed every shot · location change · model voice · voiceover · and more.',
        price: 500,
        unit: 'video'
      }
    },
    countLabel: 'How many videos?',
    countMin: '0 videos',
    countMax: '8 videos',
    resultLabel: 'Your estimate',
    lineVideos: (count: number, unit: string) => `${count} ${unit}${count === 1 ? '' : 's'}`,
    linePhotos: 'final retouched photos — included',
    linePhotosQuote: 'Photos for commercial shoots are quoted separately.',
    linePhotosWant: 'Want photos? Add 5+ videos or choose a pack.',
    caption: 'Fixed price, agreed before we start.',
    cta: 'Book this video'
  },

  packages: {
    eyebrow: 'Packages',
    title: 'Three ways to work with us.',
    lead: 'Start where you are. Most brands begin with Gold and grow from there as your content needs expand.',
    best: 'Most booked',
    volume: 'Volume',
    delivery: 'Delivery',
    from: 'from',
    choose: (name: string) => `Choose ${name}`,
    tiers: {
      silver: {
        name: 'Silver',
        tagline: 'Travel / Shop / Products',
        shots: '40 photos included',
        turnaround: '2 weeks',
        includes: [
        '4 hours on-location',
        '1 video, 30 seconds',
        'Up to 10 outfits or products',
        'Behind-the-scenes (optional)',
        'Additional outfit: €25 each']

      },
      gold: {
        name: 'Gold',
        tagline: 'Shop and Outdoor',
        shots: '75 photos included',
        turnaround: '2 weeks',
        includes: [
        '6 hours on-location',
        '2 locations in one day',
        '1 video + €100 per extra video',
        'Up to 20 outfits or products',
        'Behind-the-scenes included']

      },
      platinum: {
        name: 'Platinum',
        tagline: 'Content Sprint',
        shots: '50 photos included',
        turnaround: '3 weeks',
        includes: [
        '8 hours on-location',
        '2 locations in one day',
        '5 videos',
        'Professional color grading',
        'Instagram Reels + TikTok optimized']

      }
    }
  },

  faq: {
    title: 'Questions we get every week.',
    leadBefore: 'Still unsure? Write to',
    leadAfter: 'and a person answers within one working day.',
    items: [
    {
      q: 'What does a shoot actually cost?',
      a: 'Packages run €500–€1,000 depending on scope, hours, locations and video needs. The estimator above uses the same maths we use to write your quote — and every price is fixed in writing before we start.'
    },
    {
      q: 'Can I send my products, or do you come to me?',
      a: 'Both. Ship us your products and we shoot them in the studio, or we come to your location in Milan and beyond. Whichever is easier — the price is agreed upfront either way.'
    },
    {
      q: 'Can I be there during the shoot?',
      a: 'For on-location shoots you\'re welcome to join, or send someone you trust to represent you. For studio product shoots we keep you in the loop with a live stream, so you can approve frames in real time without travelling.'
    },
    {
      q: 'What formats do I get?',
      a: 'High-resolution files ready for print, plus web-optimised versions sized for your store, marketplace listings and social channels. Tell us where the images will live and we deliver the right crops.'
    },
    {
      q: 'How far ahead should I book?',
      a: 'A week\'s notice is ideal, though we can often fit smaller jobs in sooner. Send your brief through the form and we\'ll confirm the earliest date we can hold.'
    },
    {
      q: 'Which languages do you work in?',
      a: 'English, French and Italian — on set, and in every document you receive.'
    }]

  },

  booking: {
    titleA: "Let's put a date",
    titleB: 'in the diary.',
    lead: 'Tell us what you sell, where you want to shoot, and when you need the images. We reply within one working day with a shot list and a fixed price — no call required unless you want one.',
    studioLabel: 'Location',
    languagesLabel: 'Languages',
    languagesValue: 'English · Français · Italiano',
    formTitle: 'Request a date',
    name: 'Your name',
    namePlaceholder: 'Giulia Rossi',
    email: 'Email',
    emailPlaceholder: 'you@brand.com',
    brief: 'What are we shooting?',
    briefPlaceholder: '24 skincare products for a new shop launch in October.',
    dateLabel: 'Pick a date',
    timeLabel: 'Pick a time',
    error: 'Please add your name and a valid email so we can reply.',
    submit: 'Send brief',
    sending: 'Sending',
    disclaimer: 'No obligation. We hold your date for 48 hours.',
    sentTitle: 'Brief received.',
    sentBody: (name: string, email: string) =>
    `Thank you ${name} — a confirmation is on its way to ${email}. Expect your shot list and fixed price within one working day.`,
    again: 'Send another brief'
  },

  footer: {
    tagline: 'Commercial photography for brands that sell. Milan-based, working since 2008.',
    rights: 'All rights reserved.'
  }
};

export type Dict = typeof en;