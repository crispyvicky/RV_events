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
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="font-body text-base leading-relaxed text-[var(--color-fog-muted)] md:text-lg">
              {SITE.name} brings creative direction, production expertise, and
              hospitality thinking together. We work as both imaginative partner
              and execution lead — balancing ambition with budget discipline,
              atmosphere with logistics.
            </p>
            <p className="mt-6 font-body text-base leading-relaxed text-[var(--color-fog-muted)] md:text-lg">
              Whether you are planning a wedding weekend, a corporate launch, or
              a private milestone, we shape the experience from concept through
              the final cue.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border border-[var(--color-line)] p-8 md:p-10">
              <p className="font-body text-xs uppercase tracking-[0.22em] text-[var(--color-stone)]">
                Presence
              </p>
              <ul className="mt-6 space-y-5">
                {SITE.cities.map((city) => (
                  <li key={city}>
                    <p className="font-display text-3xl">{city}</p>
                    <p className="mt-1 font-body text-sm text-[var(--color-fog-muted)]">
                      Full-service planning &amp; production
                    </p>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-ghost mt-10 inline-flex">
                Get in touch
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
