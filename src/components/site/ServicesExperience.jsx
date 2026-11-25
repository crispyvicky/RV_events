"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap-client";
import GsapReveal from "./GsapReveal";

export default function ServicesExperience({ services }) {
  const listRef = useRef(null);

  useEffect(() => {
    const { gsap } = getGsap();
    if (!gsap || !listRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".service-row").forEach((row) => {
        const media = row.querySelector(".service-media img");
        if (!media) return;
        gsap.fromTo(
          media,
          { scale: 1.2 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, listRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-28">
      <section className="section-pad !pb-12">
        <GsapReveal>
          <p className="font-body text-xs uppercase tracking-[0.28em] text-[var(--color-stone)]">
            Capabilities
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.05] md:text-7xl">
            All kinds of event management — designed end to end
          </h1>
          <p className="mt-6 max-w-2xl font-body text-[var(--color-fog-muted)] md:text-lg">
            From intimate celebrations to large-scale productions across
            Hyderabad and Kakinada.
          </p>
        </GsapReveal>
      </section>

      <section ref={listRef} className="border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-[1400px]">
          {services.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className={`service-row group grid items-stretch border-b border-[var(--color-line)] md:grid-cols-2 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="service-media relative min-h-[360px] overflow-hidden md:min-h-[520px]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition duration-700 group-hover:brightness-110"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col justify-center px-6 py-14 md:px-12 lg:px-16">
                <GsapReveal>
                  <p className="font-body text-xs uppercase tracking-[0.22em] text-[var(--color-accent-soft)]">
                    {service.category}
                  </p>
                  <h2 className="mt-3 font-display text-4xl md:text-5xl">{service.title}</h2>
                  <p className="mt-2 font-display text-xl text-[var(--color-fog-muted)] md:text-2xl">
                    {service.subtitle}
                  </p>
                  <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-[var(--color-fog-muted)] md:text-base">
                    {service.excerpt}
                  </p>
                  <span className="mt-10 inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.22em] text-[var(--color-fog)]">
                    Explore
                    <span className="h-px w-10 bg-[var(--color-fog)] transition-all group-hover:w-16" />
                  </span>
                </GsapReveal>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
