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
    eyebrow: 'Commercial photography · Milan · since 2017',
    titleA: 'Images made to',
    titleB: 'sell what you make.',
    lead: 'We photograph products, food and collections for brands that sell online. You send us what you sell — we return a complete, channel-ready set of images, on a fixed price agreed before we start.',
    ctaPrimary: 'Get a fixed price',
    ctaSecondary: 'See selected work',
    stats: [
    { value: '420+', label: 'Shoots delivered' },
    { value: '9 yrs', label: 'Studio in Milan' },
    { value: '4 days', label: 'Average turnaround' },
    { value: '96%', label: 'Clients who rebook' }],

    studioCaption: 'Our studio, Via Tortona — one room, white cyclorama, tethered to your screen.'
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
      body: 'In our Milan studio or at your location. Join in person, or watch the live tethered feed from anywhere.',
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
    eyebrow: 'The studio',
    title: 'One room.\nEverything owned.',
    lead: 'A compact, controlled studio — white cyclorama, professional lighting, and a colour-calibrated finishing station. Nothing rented, no surprise line on your invoice.',
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
    note: 'Everything is maintained and colour-calibrated in-house. If a brief needs something we do not own, we rent it and quote it openly before the shoot.'
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
    countMin: '5 — a small drop',
    countMax: '80 — a full catalogue',
    whereLabel: 'Where?',
    whereStudio: 'Our Milan studio',
    whereStudioNote: 'Full control of the light',
    whereLocation: 'Your location',
    whereLocationNote: 'We pack the studio into a van',
    addOnLegend: 'Anything else?',
    addOns: {
      model: { label: 'Talent casting', description: 'We cast, book and pay the talent.' },
      styling: { label: 'Styling & set build', description: 'Props, surfaces, wardrobe.' },
      video: { label: 'Vertical video clips', description: '6–10 short clips from the same set.' },
      express: { label: 'Express delivery', description: 'Retouched files back in 48 hours.' }
    },
    resultLabel: 'Your estimate',
    vat: 'Excluding VAT. Fixed in writing before we start.',
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
    lead: 'Start where you are. Most brands begin with Signature and grow into Campaign once the first set of images pays for itself.',
    best: 'Most booked',
    volume: 'Volume',
    delivery: 'Delivery',
    from: 'from',
    choose: (name: string) => `Choose ${name}`,
    tiers: {
      essential: {
        name: 'Essential',
        tagline: 'For a first catalogue or a small drop.',
        shots: 'Up to 15 final images',
        turnaround: '5 working days',
        includes: [
        'Half day in studio',
        'One lighting setup',
        'Standard retouching',
        'Web + social exports']

      },
      signature: {
        name: 'Signature',
        tagline: 'Our most requested. Campaign-ready in a day.',
        shots: 'Up to 40 final images',
        turnaround: '4 working days',
        includes: [
        'Full day in studio or on location',
        'Three lighting setups',
        'Art direction + shot list',
        'Advanced retouching',
        'Vertical video clips']

      },
      campaign: {
        name: 'Campaign',
        tagline: 'Full production, motion included.',
        shots: '80+ final images',
        turnaround: '7 working days',
        includes: [
        'Two shoot days',
        'Talent casting + styling',
        'Set design',
        'Motion and stills together',
        'Usage rights for paid media']

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
      a: 'Most projects land between €690 and €3,200 depending on the number of final images, whether we need talent, and how much set building is involved. The estimator above uses the same maths we use to write your quote.'
    },
    {
      q: 'Do I need to send my products to Milan?',
      a: 'Usually yes, and we handle the rest. Ship to the studio at least three days before the shoot. We photograph, repack and return everything insured. For fragile or oversized items we come to you.'
    },
    {
      q: 'Can I be there during the shoot?',
      a: 'Always welcome. If you cannot travel, we run a live tethered stream so you can approve frames in real time from your desk.'
    },
    {
      q: 'What formats do I get?',
      a: 'Full-resolution TIFF or JPEG masters, plus ready-to-post crops for your store, Instagram and paid ads. Marketplace-safe cut-outs on white are included in every package.'
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
    lead: 'Tell us what you sell and when you need the images. We reply within one working day with a shot list and a fixed price — no call required unless you want one.',
    studioLabel: 'Studio',
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
    tagline: 'Commercial photography for brands that sell. Milan, since 2017.',
    rights: 'All rights reserved.'
  }
};

export type Dict = typeof en;