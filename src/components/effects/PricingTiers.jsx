"use client";

import { useEffect, useRef, useState } from "react";
import MagneticButton from "./MagneticButton";
import { getGsap } from "@/lib/gsap-client";

const TIERS = {
  early: [
    {
      name: "Intimate",
      price: 185000,
      note: "Up to 80 guests",
      features: ["Creative direction", "Day coordination", "Vendor shortlist"],
    },
    {
      name: "Signature",
      price: 425000,
      note: "Up to 250 guests",
      popular: true,
      features: ["Full production", "Design & florals lead", "On-site team", "Run-of-show"],
    },
    {
      name: "Grandeur",
      price: 890000,
      note: "Destination / 250+",
      features: ["Multi-day planning", "Hospitality desk", "Scenic production", "Guest logistics"],
    },
  ],
  standard: [
    {
      name: "Intimate",
      price: 220000,
      note: "Up to 80 guests",
      features: ["Creative direction", "Day coordination", "Vendor shortlist"],
    },
    {
      name: "Signature",
      price: 495000,
      note: "Up to 250 guests",
      popular: true,
      features: ["Full production", "Design & florals lead", "On-site team", "Run-of-show"],
    },
    {
      name: "Grandeur",
      price: 980000,
      note: "Destination / 250+",
      features: ["Multi-day planning", "Hospitality desk", "Scenic production", "Guest logistics"],
    },
  ],
};

function RollingPrice({ value }) {
  const ref = useRef(null);

  useEffect(() => {
    const { gsap } = getGsap();
    if (!ref.current || !gsap) return;
    const obj = { n: 0 };
    const tween = gsap.to(obj, {
      n: value,
      duration: 1.1,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
          }).format(obj.n);
        }
      },
    });
    return () => tween.kill();
  }, [value]);

  return <span ref={ref}>₹0</span>;
}

export default function PricingTiers() {
  const [mode, setMode] = useState("early");
  const sectionRef = useRef(null);
  const tiers = TIERS[mode];

  useEffect(() => {
    const { gsap } = getGsap();
    if (!sectionRef.current || !gsap) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".price-card",
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
      gsap.to(".popular-glow", {
        opacity: 0.35,
        repeat: -1,
        yoyo: true,
        duration: 1.6,
        ease: "sine.inOut",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [mode]);

  return (
    <section ref={sectionRef} className="section-pad border-t border-[var(--color-line)]">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.28em] text-[var(--color-stone)]">
              Quotation starting points
            </p>
            <h2 className="mt-4 font-display text-4xl md:text-6xl">Planning packages</h2>
            <p className="mt-4 max-w-xl font-body text-[var(--color-fog-muted)]">
              Indicative investment bands for Hyderabad &amp; Kakinada. Final quotations
              are tailored line-by-line with GST.
            </p>
          </div>
          <div className="flex border border-[var(--color-line)]">
            {[
              ["early", "Early bird"],
              ["standard", "Standard"],
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setMode(key)}
                className={`px-5 py-2.5 font-body text-xs uppercase tracking-[0.2em] transition ${
                  mode === key
                    ? "bg-[var(--color-fog)] text-[var(--color-ink)]"
                    : "text-[var(--color-fog-muted)]"
                }`}
                data-cursor="Toggle"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`price-card relative border border-[var(--color-line)] p-8 opacity-0 ${
                tier.popular ? "bg-[var(--color-ink-soft)]" : ""
              }`}
            >
              {tier.popular && (
                <>
                  <div className="popular-glow pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(176,141,87,0.35),transparent_55%)]" />
                  <p className="relative mb-4 font-body text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent-soft)]">
                    Most popular
                  </p>
                </>
              )}
              <h3 className="relative font-display text-3xl">{tier.name}</h3>
              <p className="relative mt-2 font-body text-sm text-[var(--color-stone)]">{tier.note}</p>
              <p className="relative mt-6 font-display text-4xl">
                <RollingPrice value={tier.price} />
              </p>
              <ul className="relative mt-8 space-y-3 font-body text-sm text-[var(--color-fog-muted)]">
                {tier.features.map((f) => (
                  <li key={f}>— {f}</li>
                ))}
              </ul>
              <MagneticButton href="/get-quote" className="btn-ghost relative mt-10 !px-5 !py-2.5">
                Request quote
              </MagneticButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
