import { DEFAULT_SERVICES, PLACEHOLDERS } from "./constants";
import { getDb, hasMongoConfig } from "./mongodb";

const G = PLACEHOLDERS.gallery;

const DEFAULT_PROJECTS = [
  {
    slug: "hyderabad-garden-wedding",
    title: "Garden Wedding, Hyderabad",
    category: "Wedding",
    city: "Hyderabad",
    excerpt: "An intimate evening ceremony under layered light and florals.",
    description:
      "A full-service wedding production spanning ceremony, reception, and guest hospitality — designed with a soft editorial palette.",
    image: G[0],
    gallery: [G[0], G[1], G[5], G[6]],
    featured: true,
    year: "2025",
  },
  {
    slug: "brand-launch-hitech-city",
    title: "Brand Launch, Hitech City",
    category: "Corporate",
    city: "Hyderabad",
    excerpt: "Immersive product reveal with stage design and guest flow.",
    description:
      "Creative direction and production for a corporate launch — narrative moments, VIP hospitality, and precise run-of-show.",
    image: G[2],
    gallery: [G[2], G[3], G[8]],
    featured: true,
    year: "2025",
  },
  {
    slug: "kakinada-shoreline-celebration",
    title: "Shoreline Celebration, Kakinada",
    category: "Social",
    city: "Kakinada",
    excerpt: "A milestone gathering shaped by coastal light and atmosphere.",
    description:
      "Private celebration with destination sensibility — venue styling, dining, and entertainment choreographed as one evening.",
    image: G[9],
    gallery: [G[9], G[4], G[7]],
    featured: true,
    year: "2024",
  },
  {
    slug: "leadership-retreat-weekend",
    title: "Leadership Retreat Weekend",
    category: "Corporate",
    city: "Hyderabad",
    excerpt: "Multi-day offsite with programming, travel, and hospitality.",
    description:
      "We managed location, sessions, dining, and evening experiences so leadership could focus on connection — not logistics.",
    image: G[8],
    gallery: [G[8], G[6], G[1], G[4]],
    featured: false,
    year: "2024",
  },
];

export async function getServices() {
  if (!hasMongoConfig()) return DEFAULT_SERVICES;
  try {
    const db = await getDb();
    const docs = await db.collection("services").find({}).sort({ order: 1 }).toArray();
    if (!docs.length) return DEFAULT_SERVICES;
    return docs.map(serialize);
  } catch {
    return DEFAULT_SERVICES;
  }
}

export async function getServiceBySlug(slug) {
  const all = await getServices();
  return all.find((s) => s.slug === slug) || null;
}

export async function getProjects() {
  if (!hasMongoConfig()) return DEFAULT_PROJECTS;
  try {
    const db = await getDb();
    const docs = await db.collection("projects").find({}).sort({ year: -1 }).toArray();
    if (!docs.length) return DEFAULT_PROJECTS;
    return docs.map(serialize);
  } catch {
    return DEFAULT_PROJECTS;
  }
}

export async function getProjectBySlug(slug) {
  const all = await getProjects();
  return all.find((p) => p.slug === slug) || null;
}

function serialize(doc) {
  const { _id, ...rest } = doc;
  return { id: _id?.toString?.() || doc.id, ...rest };
}

export { DEFAULT_PROJECTS };
