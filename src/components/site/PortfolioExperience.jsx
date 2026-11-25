"use client";

import { useEffect, useRef } from "react";
import MorphLink from "@/components/effects/MorphLink";
import GsapReveal from "./GsapReveal";
import { getGsap } from "@/lib/gsap-client";

export default function PortfolioExperience({ projects }) {
  const gridRef = useRef(null);

  useEffect(() => {
    const { gsap } = getGsap();
    if (!gsap || !gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".project-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 80 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
            delay: (i % 2) * 0.08,
          }
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-28">
      <section className="section-pad !pb-12">
        <GsapReveal>
          <p className="font-body text-xs uppercase tracking-[0.28em] text-[var(--color-stone)]">
            Work
          </p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">Portfolio</h1>
          <p className="mt-6 max-w-xl font-body text-[var(--color-fog-muted)] md:text-lg">
            Click a card — the thumbnail morphs into the project header.
          </p>
        </GsapReveal>
      </section>

      <section className="px-6 pb-28 md:px-10 lg:px-16">
        <div ref={gridRef} className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-2 md:gap-8">
          {projects.map((project) => (
            <MorphLink
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              image={project.image}
              alt={project.title}
              className="project-card group block opacity-0"
              imageClassName="object-cover transition duration-700 group-hover:brightness-110"
            >
              <div className="mt-5">
                <p className="font-body text-xs uppercase tracking-[0.2em] text-[var(--color-stone)]">
                  {project.category} · {project.city}
                </p>
                <h2 className="mt-2 font-display text-3xl md:text-4xl">{project.title}</h2>
                <p className="mt-2 font-body text-sm text-[var(--color-fog-muted)]">
                  {project.excerpt}
                </p>
              </div>
            </MorphLink>
          ))}
        </div>
      </section>
    </div>
  );
}
