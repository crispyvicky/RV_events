import { SITE } from "./constants";

export function pageMeta({ title, description, path = "/" }) {
  const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
  const url = `${SITE.url}${path}`;
  return {
    title: fullTitle,
    description: description || SITE.description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: description || SITE.description,
      url,
      siteName: SITE.name,
      locale: "en_IN",
      type: "website",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    description: SITE.description,
    areaServed: SITE.cities.map((city) => ({
      "@type": "City",
      name: city,
    })),
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    priceRange: "₹₹₹",
    areaServed: SITE.cities,
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        addressCountry: "IN",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Kakinada",
        addressRegion: "Andhra Pradesh",
        addressCountry: "IN",
      },
    ],
  };
}

export function faqJsonLd(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}
