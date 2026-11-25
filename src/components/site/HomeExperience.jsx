"use client";

import Link from "next/link";
import ImageExpand from "@/components/effects/ImageExpand";
import HorizontalGallery from "@/components/effects/HorizontalGallery";
import BeforeAfter from "@/components/effects/BeforeAfter";
import TiltCard from "@/components/effects/TiltCard";
import MagneticButton from "@/components/effects/MagneticButton";
import EventTimeline from "@/components/effects/EventTimeline";
import PricingTiers from "@/components/effects/PricingTiers";
import KineticText from "@/components/effects/KineticText";
import StatsCounter from "@/components/effects/StatsCounter";
import GsapReveal from "./GsapReveal";
import Hero from "./Hero";
import ParallaxMedia from "./ParallaxMedia";
import { PLACEHOLDERS } from "@/lib/constants";

export default function HomeExperience({ services, projects, faqs }) {
  const tiltItems = (services || []).slice(0, 3);
  const galleryItems = (projects || []).map((p) => ({
    ...p,
    href: `/portfolio/${p.slug}`,
  }));

  return (
    <>
      <Hero />

      <StatsCounter />

      <section className="section-pad overflow-hidden">
        <p className="mb-8 font-body text-xs uppercase tracking-[0.32em] text-[var(--color-stone)]">
          Kinetic statement
        </p>
        <KineticText text="We take an idea, a mood, a moment — and turn it into a celebration you won’t forget." />
        <GsapReveal className="mt-10 max-w-2xl">
          <p className="font-body text-base leading-relaxed text-[var(--color-fog-muted)] md:text-lg">
            RV EVENTS crafts weddings, corporate gatherings, and private
            celebrations across Hyderabad and Kakinada — with cinematic
            production and operational precision.
          </p>
        </GsapReveal>
      </section>

      <ImageExpand
        src={PLACEHOLDERS.expand}
        title="Celebration, fully realized"
        subtitle="Florals, light, and hospitality woven into one evening — from first look to last toast."
        label="Scroll-triggered showcase"
      />

      <HorizontalGallery
        items={
          galleryItems.length
            ? galleryItems
            : PLACEHOLDERS.gallery.map((image, i) => ({
                slug: `moment-${i}`,
                title: ["Garden vows", "Brand launch", "Shoreline night", "Retreat weekend"][i % 4],
                category: ["Wedding", "Corporate", "Social", "Destination"][i % 4],
                city: i % 2 ? "Kakinada" : "Hyderabad",
                image,
                href: "/portfolio",
              }))
        }
        eyebrow="Horizontal gallery"
        heading="Scroll, then glide through the work"
      />

      <BeforeAfter
        beforeSrc={PLACEHOLDERS.before}
        afterSrc={PLACEHOLDERS.after}
        beforeLabel="Raw venue"
        afterLabel="RV EVENTS production"
        title="Before & after the build"
        description="Slide to compare an empty hall with a fully dressed RV EVENTS space — staging, lighting, and atmosphere."
      />

      <section className="section-pad border-t border-[var(--color-line)]">
        <GsapReveal>
          <p className="font-body text-xs uppercase tracking-[0.28em] text-[var(--color-stone)]">
            3D tilt cards
          </p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl">Capabilities, up close</h2>
        </GsapReveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {tiltItems.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} data-cursor="View Event">
              <TiltCard
                image={service.image}
                title={service.title}
                meta={service.category}
                description={service.subtitle}
              />
            </Link>
          ))}
        </div>
      </section>

      <EventTimeline />

      <PricingTiers />

      <section className="relative overflow-hidden py-32 md:py-40">
        <ParallaxMedia
          src={PLACEHOLDERS.cta}
          alt="Begin with RV EVENTS"
          className="absolute inset-0 h-full w-full"
          speed={10}
        />
        <div className="absolute inset-0 bg-black/72" />
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 text-center md:px-10">
          <GsapReveal>
            <KineticText
              text="Begin with a quotation"
              className="font-display text-4xl md:text-6xl lg:text-7xl"
              mode="words"
            />
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <MagneticButton href="/get-quote" className="btn-primary min-w-[220px]">
                Get a quotation
              </MagneticButton>
              <MagneticButton href="/contact" className="btn-ghost min-w-[220px]">
                Contact studio
              </MagneticButton>
            </div>
          </GsapReveal>
        </div>
      </section>

      <section className="section-pad border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-[900px]">
          <GsapReveal>
            <h2 className="font-display text-3xl md:text-5xl">Questions</h2>
          </GsapReveal>
          <div className="mt-10 space-y-2">
            {faqs.map((faq, i) => (
              <GsapReveal key={faq.q} delay={i * 0.05}>
                <div className="border-t border-[var(--color-line)] py-7">
                  <h3 className="font-display text-2xl md:text-3xl">{faq.q}</h3>
                  <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-[var(--color-fog-muted)] md:text-base">
                    {faq.a}
                  </p>
                </div>
              </GsapReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
