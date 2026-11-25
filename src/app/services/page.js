import ServicesExperience from "@/components/site/ServicesExperience";
import { getServices } from "@/lib/data";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Services",
  description:
    "Wedding, corporate, social, destination, and full-service event management by RV EVENTS in Hyderabad and Kakinada.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices();
  return <ServicesExperience services={services} />;
}
