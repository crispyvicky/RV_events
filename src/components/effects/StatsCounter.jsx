"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap-client";

const DEFAULT_STATS = [
  { value: 500, suffix: "+", label: "Events hosted" },
  { value: 50, suffix: "k+", label: "Guests welcomed" },
  { value: 12, suffix: "+", label: "Years of craft" },
  { value: 2, suffix: "", label: "Cities · HYD & KKD" },
];

export default function StatsCounter({ stats = DEFAULT_STATS }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const { gsap } = getGsap();
    if (!section || !gsap) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".stat-item").forEach((item) => {
        const num = item.querySelector("[data-count]");
        const target = Number(num?.dataset.count || 0);
        const obj = { n: 0 };
        gsap.to(obj, {
          n: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          onUpdate: () => {
            if (num) num.textContent = Math.floor(obj.n).toLocaleString("en-IN");
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [stats]);

  return (
    <section
      ref={sectionRef}
      className="border-y border-[var(--color-line)] bg-[var(--color-ink-soft)]"
    >
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-20 md:grid-cols-4 md:px-10 lg:px-16">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-item text-center md:text-left">
            <p className="font-display text-5xl md:text-6xl">
              <span data-count={stat.value}>0</span>
              {stat.suffix}
            </p>
            <p className="mt-3 font-body text-xs uppercase tracking-[0.22em] text-[var(--color-stone)]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
