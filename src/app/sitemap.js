import { SITE, DEFAULT_SERVICES } from "@/lib/constants";
import { DEFAULT_PROJECTS } from "@/lib/data";

export default function sitemap() {
  const base = SITE.url;
  const staticRoutes = ["", "/services", "/portfolio", "/about", "/contact", "/get-quote"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: path === "" ? 1 : 0.8,
    })
  );

  const services = DEFAULT_SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const projects = DEFAULT_PROJECTS.map((p) => ({
    url: `${base}/portfolio/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...services, ...projects];
}
