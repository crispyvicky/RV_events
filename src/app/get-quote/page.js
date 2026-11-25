import Reveal from "@/components/site/Reveal";
import LeadForm from "@/components/site/LeadForm";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Get Quote",
  description:
    "Request a premium event quotation from RV EVENTS for weddings, corporate, and celebrations in Hyderabad and Kakinada.",
  path: "/get-quote",
});

export default function GetQuotePage() {
  return (
    <div className="pt-28">
      <section className="section-pad">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="font-body text-xs uppercase tracking-[0.28em] text-[var(--color-stone)]">
              Quotation
            </p>
            <h1 className="mt-4 font-display text-5xl md:text-6xl">
              Request a quotation
            </h1>
            <p className="mt-6 max-w-md font-body leading-relaxed text-[var(--color-fog-muted)]">
              Share the essentials — event type, city, date, and scale. Our
              team prepares a detailed quotation with line items and GST.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <LeadForm mode="quote" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
