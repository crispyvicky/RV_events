import HomeExperience from "@/components/site/HomeExperience";
import { SITE } from "@/lib/constants";
import { getProjects, getServices } from "@/lib/data";
import { pageMeta, faqJsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: null,
  description: SITE.description,
  path: "/",
});

const faqs = [
  {
    q: "What cities does RV EVENTS serve?",
    a: "We provide full-service event management across Hyderabad and Kakinada, with destination experiences available on request.",
  },
  {
    q: "What kinds of events do you manage?",
    a: "Weddings, corporate gatherings, product launches, social celebrations, destination experiences, and end-to-end production design.",
  },
  {
    q: "How do I get a quotation?",
    a: "Share your event details through our Get Quote form. Our team prepares a tailored quotation with line items and GST.",
  },
];

export default async function HomePage() {
  const [services, projects] = await Promise.all([getServices(), getProjects()]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <HomeExperience services={services} projects={projects} faqs={faqs} />
    </>
  );
}
