export const SITE = {
  name: "RV EVENTS",
  tagline: "Experiences shaped with intention",
  description:
    "RV EVENTS is a full-service event management company crafting weddings, corporate gatherings, and celebrations across Hyderabad and Kakinada.",
  email: "maha@rvevents.co",
  phone: "+91 90598 14164",
  cities: ["Hyderabad", "Kakinada"],
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const EVENT_TYPES = [
  "Wedding",
  "Corporate",
  "Social",
  "Destination",
  "Product Launch",
  "Conference",
  "Birthday",
  "Custom",
];

export const QUOTE_STATUSES = [
  "draft",
  "sent",
  "accepted",
  "rejected",
  "expired",
];

export const LEAD_STATUSES = ["new", "contacted", "quoted", "won", "lost"];

/** Unique Unsplash imagery — every key is a different photo (see ASSETS.md) */
const img = (id, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PLACEHOLDERS = {
  hero: img("photo-1511795409834-ef04bbd61622", 2400),
  wedding: img("photo-1519741497674-611481863552"),
  corporate: img("photo-1540575467063-178a50c2df87"),
  social: img("photo-1530103862676-de8c9debad1d"),
  destination: img("photo-1500530855697-b586d89ba3ee"),
  production: img("photo-1492684223066-81342ee5ff30"),
  about: img("photo-1478146896981-b80fe463b330"),
  expand: img("photo-1519167758481-83f29da8d0e0"),
  before: img("photo-1414235077428-338989a2e8c0"),
  after: img("photo-1555244162-803834f70033"),
  cta: img("photo-1429962714451-bb934ecdc4ec"),
  planning: img("photo-1460978812857-470ed1c77af0"),
  gallery: [
    img("photo-1511285560929-80b456fea0bc", 1400),
    img("photo-1465495976277-4387d4b0b4c6", 1400),
    img("photo-1505373877841-8d25f7d46678", 1400),
    img("photo-1464366400600-7168b8af9bc3", 1400),
    img("photo-1470229722913-7c0e2dbbafd3", 1400),
    img("photo-1520854221256-17451cc330bf", 1400),
    img("photo-1507504031003-b417219a0fdf", 1400),
    img("photo-1533174072545-7a4b6ad7a6c3", 1400),
    img("photo-1505236858219-8359eb29e329", 1400),
    img("photo-1578662996442-48f60103fc96", 1400),
  ],
};

export const DEFAULT_SERVICES = [
  {
    slug: "weddings",
    title: "Weddings",
    subtitle: "Ceremonies that feel like you",
    category: "Wedding",
    excerpt:
      "Thoughtfully designed weddings — from intimate gatherings to multi-day celebrations across Hyderabad and Kakinada.",
    description:
      "We design and produce weddings with editorial precision: ceremony flow, spatial design, hospitality, and the details guests remember. Whether a destination weekend or a city celebration, every moment is shaped around your story.",
    image: PLACEHOLDERS.wedding,
    featured: true,
    order: 1,
  },
  {
    slug: "corporate",
    title: "Corporate",
    subtitle: "Brand experiences with clarity",
    category: "Corporate",
    excerpt:
      "Launches, offsites, conferences, and client hospitality — executed with creative direction and operational discipline.",
    description:
      "From product launches to leadership retreats, we operate as creative partner and execution lead. Narrative, venue, production, and guest experience — aligned to your brand and delivered with precision.",
    image: PLACEHOLDERS.corporate,
    featured: true,
    order: 2,
  },
  {
    slug: "social-celebrations",
    title: "Social Celebrations",
    subtitle: "Milestones, elevated",
    category: "Social",
    excerpt:
      "Birthdays, anniversaries, and private gatherings designed with atmosphere, flow, and intention.",
    description:
      "Private celebrations deserve the same care as large productions. We craft mood, pacing, and hospitality so the evening feels effortless — never staged.",
    image: PLACEHOLDERS.social,
    featured: true,
    order: 3,
  },
  {
    slug: "destination",
    title: "Destination Experiences",
    subtitle: "Place as part of the story",
    category: "Destination",
    excerpt:
      "Multi-day experiences shaped by location — travel, venues, programming, and on-site production.",
    description:
      "We build destination celebrations and retreats from the ground up: location scouting, guest logistics, programming, and production that honors the character of the place.",
    image: PLACEHOLDERS.destination,
    featured: true,
    order: 4,
  },
  {
    slug: "production-design",
    title: "Production & Design",
    subtitle: "Atmosphere you can feel",
    category: "Production",
    excerpt:
      "Lighting, staging, spatial design, and art direction for immersive event environments.",
    description:
      "Our production team layers light, set, sound, and styling so spaces feel transportive. We design for photography, guest flow, and the emotional arc of the evening.",
    image: PLACEHOLDERS.production,
    featured: false,
    order: 5,
  },
  {
    slug: "full-service-planning",
    title: "Full-Service Planning",
    subtitle: "Concept through execution",
    category: "Custom",
    excerpt:
      "End-to-end event management — budgeting, vendors, timelines, and day-of orchestration.",
    description:
      "Engage us as your complete planning partner. We manage vendors, budgets, run-of-show, and on-site teams so you stay present for what matters.",
    image: PLACEHOLDERS.planning,
    featured: false,
    order: 6,
  },
];
