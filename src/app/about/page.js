import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/site/Reveal";
import { PLACEHOLDERS, SITE } from "@/lib/constants";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About",
  description:
    "RV EVENTS is a premium event management company serving Hyderabad and Kakinada — weddings, corporate, and celebrations.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="pt-28">
      <section className="section-pad !pb-10">
        <Reveal>
          <p className="font-body text-xs uppercase tracking-[0.28em] text-[var(--color-stone)]">
            About
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-tight md:text-6xl">
            A complete event management company — rooted in Hyderabad &amp;
            Kakinada
          </h1>
        </Reveal>
      </section>

      <section className="relative min-h-[50vh] overflow-hidden">
        <Image
          src={PLACEHOLDERS.about}
          alt="RV EVENTS atmosphere"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/35" />
      </section>

      <section className="section-pad">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-ink-soft)]">
              <Image
                src="/brand/team/maha.png"
                alt="Maha, Founder of RV EVENTS"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="font-body text-xs uppercase tracking-[0.28em] text-[var(--color-accent-soft)]">
              Founder
            </p>
            <h2 className="mt-4 font-display text-5xl md:text-6xl">Maha</h2>
            <p className="mt-3 font-body text-sm uppercase tracking-[0.2em] text-[var(--color-stone)]">
              Founder &amp; Lead Planner
            </p>
            <p className="mt-8 max-w-xl font-body text-base leading-relaxed text-[var(--color-fog-muted)] md:text-lg">
              {SITE.name} brings creative direction, production expertise, and
              hospitality thinking together. Under Maha&apos;s lead, we work as
              both imaginative partner and execution lead — balancing ambition
              with budget discipline, atmosphere with logistics.
            </p>
            <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-[var(--color-fog-muted)] md:text-lg">
              Whether you are planning a wedding weekend, a corporate launch, or
              a private milestone, we shape the experience from concept through
              the final cue.
            </p>
            <Link href="/contact" className="btn-ghost mt-10 inline-flex">
              Get in touch
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section-pad !pt-0">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className="font-body text-xs uppercase tracking-[0.22em] text-[var(--color-stone)]">
              Presence
            </p>
            <div className="mt-8 grid gap-10 sm:grid-cols-2">
              {SITE.cities.map((city) => (
                <div key={city}>
                  <p className="font-display text-4xl md:text-5xl">{city}</p>
                  <p className="mt-2 font-body text-sm text-[var(--color-fog-muted)]">
                    Full-service planning &amp; production
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
