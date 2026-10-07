export type ProgrammeId = "thirst" | "feed" | "orphan" | "emergency";

export type Programme = {
  id: ProgrammeId;
  name: string;
  href: string;
  zakatEligible: boolean;
  entryAmount: string;
  currencyNote: string;
  statement: string;
  heroHeadline: [string, string[], string];
  heroSupport: string;
  heroImage: string;
  heroAlt: string;
  workImage: string;
  workAlt: string;
  credit: string;
};

export const programmes: Programme[] = [
  {
    id: "thirst",
    name: "Thirst Relief",
    href: "/programmes/thirst-relief",
    zakatEligible: true,
    entryAmount: "USD 150",
    currencyNote: "or local equivalent in TTD, JMD, GYD, XCD, CAD",
    statement:
      "A communal tap in Berbice means drinking, cooking, and washing without a day lost to fetching water.",
    heroHeadline: ["Water for", ["community"], ""],
    heroSupport: "A well in Berbice starts with a gift today.",
    heroImage: "/images/hero-thirst.jpg",
    heroAlt:
      "Four girls in hijab smiling together outdoors. Thirst Relief field photograph.",
    workImage: "/images/work-thirst.jpg",
    workAlt:
      "A woman and two children standing in forest light. Thirst Relief field photograph.",
    credit: "Thirst Relief",
  },
  {
    id: "feed",
    name: "Feed Our World",
    href: "/programmes/feed-our-world",
    zakatEligible: true,
    entryAmount: "USD 30",
    currencyNote: "or local equivalent in TTD, JMD, GYD, XCD, CAD",
    statement:
      "Food packs and shared kitchens in Couva keep families fed this week, and skills that last beyond it.",
    heroHeadline: ["Food for", ["families"], ""],
    heroSupport: "Food packs for families in Couva and across the region.",
    heroImage: "/images/hero-feed.jpg",
    heroAlt:
      "Children laughing together in a village lane. Feed Our World field photograph.",
    workImage: "/images/work-feed.jpg",
    workAlt:
      "A Penny Appeal volunteer in an orange vest standing with children between village houses. Feed Our World field photograph.",
    credit: "Feed Our World",
  },
  {
    id: "orphan",
    name: "OrphanKind",
    href: "/programmes/orphankind",
    zakatEligible: true,
    entryAmount: "USD 50 / month",
    currencyNote: "or local equivalent in TTD, JMD, GYD, XCD, CAD",
    statement:
      "School fees, meals, and care for one child in Georgetown. Sponsorship is a relationship, not a transaction.",
    heroHeadline: ["Care for", ["every child"], ""],
    heroSupport: "School, meals, and care for one child at a time.",
    heroImage: "/images/hero-orphan.jpg",
    heroAlt:
      "Girls laughing and playing in a school courtyard. OrphanKind field photograph.",
    workImage: "/images/hero-orphan.jpg",
    workAlt:
      "Girls laughing and playing in a school courtyard. OrphanKind field photograph.",
    credit: "OrphanKind",
  },
  {
    id: "emergency",
    name: "Emergency Response",
    href: "/programmes/emergency-response",
    zakatEligible: false,
    entryAmount: "USD 25",
    currencyNote: "or local equivalent in TTD, JMD, GYD, XCD, CAD",
    statement:
      "When a storm or flood hits, food, water, and shelter move first. Restricted Sadaqah, released fast.",
    heroHeadline: ["Help when it is", ["needed"], ""],
    heroSupport: "Shelter, water, and food when a crisis hits.",
    heroImage: "/images/hero-emergency.jpg",
    heroAlt:
      "A volunteer securing a shelter tent at a Penny Appeal Emergency Response site, Gaza, 2024.",
    workImage: "/images/work-emergency.jpg",
    workAlt:
      "Volunteers loading Gaza 2026 food packs from a trailer. Emergency Response field photograph.",
    credit: "Gaza, 2026",
  },
];

export const about = {
  headlineLine1: "Penny Appeal",
  headlineLine2: "Caribbean",
  body: "Penny Appeal Canada is a Canadian humanitarian organization. Since 2019, we have been working across food security, clean water, emergency response, and orphan care, addressing the fundamentals that empower families to rise out of poverty.",
  cta: "Our programmes",
  href: "#give",
};

export const impactStats = [
  {
    name: "Thirst Relief",
    amount: "$465,042",
    href: "/donate",
    programme: "thirst" as const,
  },
  {
    name: "OrphanKind",
    amount: "$925,375",
    href: "/donate",
    programme: "orphan" as const,
  },
  {
    name: "Feed Our World",
    amount: "$860,365",
    href: "/donate",
    programme: "feed" as const,
  },
  {
    name: "Zakat",
    amount: "$3,764,433",
    href: "/zakat",
    programme: "zakat" as const,
  },
  {
    name: "Emergency Response",
    amount: "$1,625,885",
    href: "/donate",
    programme: "emergency" as const,
  },
];

export const happening = [
  {
    href: "/news/a-well-in-berbice",
    programme: "thirst" as ProgrammeId,
    category: "Thirst Relief",
    title: "A well in Berbice, and the morning it changed",
    image: "/images/happen-thirst.jpg",
    alt: "A girl holding a lime among leaves. Thirst Relief field photograph.",
  },
  {
    href: "/news/couva-kitchen",
    programme: "feed" as ProgrammeId,
    category: "Feed Our World",
    title: "The Couva kitchen that feeds on Fridays",
    image: "/images/work-feed.jpg",
    alt: "A Penny Appeal volunteer standing with children in a village lane. Feed Our World field photograph.",
  },
  {
    href: "/news/georgetown-classroom",
    programme: "orphan" as ProgrammeId,
    category: "OrphanKind",
    title: "One desk in Georgetown",
    image: "/images/hero-orphan.jpg",
    alt: "Girls playing in a school courtyard. OrphanKind field photograph.",
  },
];

export const giveCards = [
  {
    id: "autogive",
    href: "/donate#monthly",
    title: "AutoGive",
    lead: "Give every month, and keep a tap running in Berbice.",
    action: "Give monthly",
    image: "/images/work-feed.jpg",
    alt: "A Penny Appeal volunteer standing with children in a village lane.",
  },
  {
    id: "zakat",
    href: "/zakat",
    title: "Zakat",
    lead: "Calculated, then kept restricted.",
    action: "Calculate Zakat",
    image: "/images/hero-thirst.jpg",
    alt: "Four girls in hijab smiling together outdoors. Thirst Relief field photograph.",
  },
  {
    id: "sponsor",
    href: "/programmes/orphankind",
    title: "Sponsor a child",
    lead: "School, meals, and care for one child.",
    action: "Sponsor",
    image: "/images/hero-orphan.jpg",
    alt: "Girls laughing and playing in a school courtyard. OrphanKind field photograph.",
  },
  {
    id: "thirst",
    href: "/programmes/thirst-relief",
    title: "Thirst Relief",
    lead: "A communal tap in Berbice.",
    action: "Support Thirst Relief",
    image: "/images/work-thirst.jpg",
    alt: "A woman and two children standing in forest light. Thirst Relief field photograph.",
  },
  {
    id: "feed",
    href: "/programmes/feed-our-world",
    title: "Feed Our World",
    lead: "Food packs and kitchens in Couva.",
    action: "Support Feed",
    image: "/images/hero-feed.jpg",
    alt: "Children laughing together in a village lane. Feed Our World field photograph.",
  },
  {
    id: "orphan",
    href: "/programmes/orphankind",
    title: "OrphanKind",
    lead: "School, meals, and care in Georgetown.",
    action: "Support OrphanKind",
    image: "/images/work-schoolyard.jpg",
    alt: "Children in a school courtyard. OrphanKind field photograph.",
  },
  {
    id: "emergency",
    href: "/programmes/emergency-response",
    title: "Emergency Response",
    lead: "Food, water, and shelter when a crisis hits.",
    action: "Support relief",
    image: "/images/work-emergency.jpg",
    alt: "Volunteers loading Emergency Response food packs. Gaza, 2026.",
  },
];

export type FlagCode = "gy" | "tt" | "ps";

export const liveProgrammes = [
  {
    href: "/news/a-well-in-berbice",
    flag: "gy" as FlagCode,
    country: "Guyana",
    action: "Thirst Relief is at work in Guyana",
    detail: "A communal tap in Berbice",
  },
  {
    href: "/news/couva-kitchen",
    flag: "tt" as FlagCode,
    country: "Trinidad and Tobago",
    action: "Feed Our World is at work in Trinidad",
    detail: "The Couva kitchen that feeds on Fridays",
  },
  {
    href: "/news/georgetown-classroom",
    flag: "gy" as FlagCode,
    country: "Guyana",
    action: "OrphanKind is at work in Guyana",
    detail: "One desk in Georgetown",
  },
  {
    href: "/news/paramaribo-boat",
    flag: "ps" as FlagCode,
    country: "Palestine",
    action: "Emergency Response is at work in Gaza",
    detail: "Food, water, and shelter first",
  },
];

export const globePins = [
  {
    id: "jordan",
    name: "Jordan",
    lat: 31.9539,
    lng: 35.9106,
  },
  {
    id: "palestine",
    name: "Palestine",
    lat: 31.5017,
    lng: 34.4668,
  },
  {
    id: "sudan",
    name: "Sudan",
    lat: 15.5007,
    lng: 32.5599,
  },
  {
    id: "pakistan",
    name: "Pakistan",
    lat: 33.6844,
    lng: 73.0479,
  },
  {
    id: "turkey",
    name: "Turkey",
    lat: 41.0082,
    lng: 28.9784,
  },
  {
    id: "india",
    name: "India",
    lat: 28.6139,
    lng: 77.209,
  },
  {
    id: "canada",
    name: "Canada",
    lat: 43.6532,
    lng: -79.3832,
  },
  {
    id: "caribbean",
    name: "Caribbean",
    lat: 18.1096,
    lng: -77.2975,
  },
];

export const marqueeImages = [
  { src: "/images/hero-thirst.jpg", alt: "Four girls smiling. Thirst Relief field photograph.", caption: "Thirst Relief" },
  { src: "/images/work-feed.jpg", alt: "Volunteer with children. Feed Our World field photograph.", caption: "Feed Our World" },
  { src: "/images/hero-orphan.jpg", alt: "Girls playing in a courtyard. OrphanKind field photograph.", caption: "OrphanKind" },
  { src: "/images/hero-emergency.jpg", alt: "Emergency shelter tents. Emergency Response field photograph.", caption: "Gaza, 2024" },
  { src: "/images/work-thirst.jpg", alt: "A family in forest light. Thirst Relief field photograph.", caption: "Thirst Relief" },
  { src: "/images/hero-feed.jpg", alt: "Children laughing in a lane. Feed Our World field photograph.", caption: "Feed Our World" },
  { src: "/images/work-emergency.jpg", alt: "Loading food packs. Emergency Response field photograph.", caption: "Gaza, 2026" },
  { src: "/images/happen-thirst.jpg", alt: "A girl among leaves. Thirst Relief field photograph.", caption: "Thirst Relief" },
];

export const stories = {
  featured: {
    href: "/news/a-well-in-berbice",
    title: "A well in Berbice, and the morning it changed",
    dek: "Neighbours who used to walk before dawn now collect water at the communal tap. Named, photographed, still at work.",
    image: "/images/happen-thirst.jpg",
    alt: "A girl holding a lime among leaves. Thirst Relief field photograph.",
    place: "Thirst Relief",
  },
  list: [
    {
      href: "/news/couva-kitchen",
      title: "The Couva kitchen that feeds on Fridays",
      dek: "A rented hall, two pots, and a roster that now stretches past Ramadan.",
      place: "Feed Our World",
      image: "/images/hero-feed.jpg",
      alt: "Children laughing in a village lane. Feed Our World field photograph.",
    },
    {
      href: "/news/georgetown-classroom",
      title: "One desk in Georgetown",
      dek: "OrphanKind sponsorship covers fees, uniform, and a hot meal at midday.",
      place: "OrphanKind",
      image: "/images/hero-orphan.jpg",
      alt: "Girls playing in a school courtyard. OrphanKind field photograph.",
    },
    {
      href: "/news/paramaribo-boat",
      title: "When the packs move",
      dek: "Food, water, and shelter first. Restricted Sadaqah, released fast.",
      place: "Gaza, 2026",
      image: "/images/work-emergency.jpg",
      alt: "Volunteers loading Emergency Response food packs. Gaza, 2026.",
    },
  ],
};

export const importantParts = [
  {
    href: "/reports",
    title: "Financial Reports",
    dek: "What came in, and where it was spent.",
    action: "Read the reports",
    image: "/images/cutout-reports.png",
    alt: "Volunteers loading Emergency Response food packs. Gaza, 2026.",
  },
  {
    href: "/scholars",
    title: "Our Scholars",
    dek: "The scholars who review the fiqh of our programmes.",
    action: "Meet the scholars",
    image: "/images/cutout-scholars.png",
    alt: "A child from an OrphanKind programme, holding a lime.",
  },
  {
    href: "/volunteer",
    title: "Volunteer",
    dek: "Events, packs, and local work. Give the hours you have.",
    action: "Volunteer with us",
    image: "/images/cutout-volunteer.png",
    alt: "A Penny Appeal volunteer standing with children. Feed Our World field photograph.",
  },
];

export type NavChild = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const navMenu: NavItem[] = [
  {
    label: "Our Work",
    href: "/#programmes",
    children: [
      { href: "/donate#monthly", label: "AutoGive" },
      { href: "/programmes/thirst-relief", label: "Thirst Relief" },
      { href: "/programmes/feed-our-world", label: "Feed Our World" },
      { href: "/programmes/orphankind", label: "OrphanKind" },
      { href: "/zakat", label: "Zakat" },
      { href: "/give-monthly", label: "Give monthly" },
    ],
  },
  {
    label: "Emergency Response",
    href: "/programmes/emergency-response",
  },
  {
    label: "About Us",
    href: "/about",
    children: [
      { href: "/about", label: "Who we are" },
      { href: "/news", label: "News" },
      { href: "/volunteer", label: "Volunteer" },
    ],
  },
];

export const navLinks = navMenu.map(({ href, label }) => ({ href, label }));
