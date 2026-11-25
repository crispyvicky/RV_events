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

/** Swap-ready placeholder imagery — replace with real photos later (see ASSETS.md) */
export const PLACEHOLDERS = {
  hero: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2400&q=80",
  wedding: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=80",
  corporate: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=80",
  social: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1800&q=80",
  destination: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80",
  production: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=80",
  about: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1800&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1400&q=80",
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
    image: PLACEHOLDERS.about,
    featured: false,
    order: 6,
  },
];
