export const en = {
  label: 'English',
  short: 'EN',
  htmlLang: 'en',

  nav: {
    links: {
      work: 'Work',
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
    eyebrow: 'Commercial photography · Milan · since 2008',
    titleA: 'Images made to',
    titleB: 'sell what you make.',
    lead: 'We photograph products, food, clothing and collections for brands that sell online. Send us what you sell, or we come to your location — you get a complete, channel-ready set of images on a fixed price agreed before we start. Newly rebranded, now taking on new brands.',
    ctaPrimary: 'Get a fixed price',
    ctaSecondary: 'See selected work',
    stats: [
    { value: 'Milan · Paris', label: 'Where we shoot' },
    { value: 'EN · IT · FR', label: 'We work in 3 languages' },
    { value: 'Photographer', label: 'since 2008' },
    { value: 'Fixed price', label: 'Agreed before we start' }],

    studioCaption: 'Milan-based, working on-location and with shipped products — all angles, all light.'
  },

  clients: { label: 'Selected clients' },

  work: {
    eyebrow: 'Selected work',
    title: 'Shot for shelves,\nnot for portfolios.',
    lead: 'A short record of recent commissions — what we were asked for, what we delivered, and what it changed.',
    scopeLabel: 'Scope',
    outcomeLabel: 'Outcome',
    projects: {
      ambra: {
        title: 'Ambra Eau de Parfum',
        sector: 'Fragrance · launch campaign',
        scope: '22 images, one studio day, cut-outs on white plus three lifestyle crops.',
        outcome: 'Launch sold out in nine days'
      },
      nord: {
        title: 'Everyday Carry',
        sector: 'Consumer audio · catalogue',
        scope: '48 images across six SKUs, built for clean cut-outs on every marketplace.',
        outcome: 'Listing conversion +18%'
      },
      marconi: {
        title: 'Autumn Tailoring',
        sector: 'Fashion · lookbook',
        scope: '40 looks photographed in a single studio day, delivered in four.',
        outcome: 'Wholesale orders opened two weeks early'
      },
      nove: {
        title: 'Primi Piatti',
        sector: 'Restaurant · menu & delivery',
        scope: '30 dishes lit to match the room they are served in, plus vertical clips.',
        outcome: 'Delivery orders +31%'
      }
    }
  },

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
      camera: 'Camera',
      lenses: 'Lenses',
      lighting: 'Lighting',
      support: 'Support',
      aerial: 'Aerial',
      storage: 'Storage',
      power: 'Power',
      post: 'Post-production'
    },
    note: 'Everything is colour-calibrated in-house. If a brief needs something we do not own, we rent it and quote it openly before the shoot.'
  },

  estimator: {
    eyebrow: 'Pricing, before you ask',
    title: 'See your price before you talk to anyone.',
    lead: 'Move the controls and watch the number change. This is the same calculation behind every quote we send.',
    categoryLegend: 'What are we photographing?',
    categories: {
      product: 'Product',
      restaurant: 'Food',
      fashion: 'Fashion',
      brand: 'Brand'
    },
    countLabel: 'How many final images?',
    countMin: '0 — base only',
    countMax: '80 — full catalogue',
    whereLabel: 'Where?',
    whereStudio: 'Our Studio',
    whereStudioNote: 'Full control of the light',
    whereLocation: 'Your location',
    whereLocationNote: 'We pack the studio into a van',
    addOnLegend: 'Anything else?',
    addOns: {
      simpleVideo: { label: 'Simple video', description: '1 setup, one location, no lighting change' },
      styledVideo: { label: 'Social media commercial video', description: 'Lighting setups, 2 hours recording time' },
      express: { label: 'Express delivery', description: '48h' }
    },
    resultLabel: 'Your estimate',
    lineStudio: (category: string) => `${category} shoot — studio time & lighting`,
    lineImages: (count: number) => `${count} final retouched images`,
    lineLocation: 'On-location crew & kit transport',
    deliveryLabel: 'Files delivered',
    delivery48: '48 hours',
    delivery7: '7 working days',
    delivery4: '4 working days',
    recommendedLabel: 'Recommended package',
    oneDay: 'One shoot day',
    twoDays: 'Two shoot days',
    cta: 'Hold a date with this brief'
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
        shots: '100 photos included',
        turnaround: '3 weeks',
        includes: [
        '8 hours on-location',
        '2 locations in one day',
        '10 videos (5 voice-over, 5 music)',
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
      a: 'Packages run €400–€1,000 depending on the scope, hours, locations, and video needs. The estimator above uses the same maths we use to write your quote.'
    },
    {
      q: 'Can I send my products, or do you come to me?',
      a: 'Both. We can photograph your products if you ship them to us in Milan. Or we come to your shop, studio, or location and photograph on-site. Tell us your preference when you book.'
    },
    {
      q: 'Can I be there during the shoot?',
      a: 'Always welcome. If you cannot travel, we run a live tethered stream so you can approve frames in real time from your desk.'
    },
    {
      q: 'What formats do I get?',
      a: 'Full-resolution TIFF or JPEG masters, plus ready-to-post crops for your store, Instagram and paid ads. Marketplace-safe cut-outs are included in every package.'
    },
    {
      q: 'How far ahead should I book?',
      a: 'Two to three weeks is comfortable. We hold a small number of express slots each month for launches that cannot wait.'
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