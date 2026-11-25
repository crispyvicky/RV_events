import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/site/Reveal";
import { getProjectBySlug, getProjects } from "@/lib/data";
import { pageMeta } from "@/lib/seo";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return pageMeta({
    title: project.title,
    description: project.excerpt,
    path: `/portfolio/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="pt-28">
      <section className="relative min-h-[70vh] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/25" />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-[1400px] items-end px-6 pb-16 md:px-10 lg:px-16">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.22em] text-[var(--color-accent-soft)]">
              {project.category} · {project.city} · {project.year}
            </p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl md:text-6xl">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <Reveal>
          <p className="mx-auto max-w-3xl font-body text-lg leading-relaxed text-[var(--color-fog-muted)]">
            {project.description}
          </p>
        </Reveal>
      </section>

      <section className="px-6 pb-24 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1400px] gap-4 md:grid-cols-2">
          {(project.gallery || []).map((src, i) => (
            <Reveal key={src + i} delay={(i % 2) * 0.06}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={src}
                  alt={`${project.title} gallery ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-16 max-w-[1400px] text-center">
          <Link href="/get-quote" className="btn-primary">
            Plan a similar experience
          </Link>
        </div>
      </section>
    </div>
  );
}
