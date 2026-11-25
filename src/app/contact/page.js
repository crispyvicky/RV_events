import Reveal from "@/components/site/Reveal";
import LeadForm from "@/components/site/LeadForm";
import { SITE } from "@/lib/constants";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Contact RV EVENTS for weddings, corporate events, and celebrations in Hyderabad and Kakinada.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="pt-28">
      <section className="section-pad">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="font-body text-xs uppercase tracking-[0.28em] text-[var(--color-stone)]">
              Contact
            </p>
            <h1 className="mt-4 font-display text-5xl md:text-6xl">
              Get in touch
            </h1>
            <p className="mt-6 font-body text-[var(--color-fog-muted)]">
              Tell us what you&apos;re imagining. We&apos;ll respond with next
              steps.
            </p>
            <div className="mt-10 space-y-4 font-body text-sm text-[var(--color-fog-muted)]">
              <p>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </p>
              <p>
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
              </p>
              <p>{SITE.cities.join(" · ")}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <LeadForm mode="contact" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
