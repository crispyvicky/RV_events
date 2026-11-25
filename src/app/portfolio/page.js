import PortfolioExperience from "@/components/site/PortfolioExperience";
import { getProjects } from "@/lib/data";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Portfolio",
  description:
    "Selected weddings, corporate experiences, and celebrations by RV EVENTS in Hyderabad and Kakinada.",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const projects = await getProjects();
  return <PortfolioExperience projects={projects} />;
}
