"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap-client";

const DEFAULT_STEPS = [
  {
    day: "01",
    title: "Discovery call",
    detail: "Vision, guest count, city, and the feeling you want the room to hold.",
  },
  {
    day: "02",
    title: "Concept & mood",
    detail: "Creative direction, palette, spatial plan, and first production sketch.",
  },
  {
    day: "03",
    title: "Vendor orchestration",
    detail: "Venue, florals, lighting, catering, entertainment — one coordinated brief.",
  },
  {
    day: "04",
    title: "Run-of-show",
    detail: "Minute-by-minute cues, guest flow, and hospitality checkpoints.",
  },
  {
    day: "05",
    title: "On-site production",
    detail: "Our team lives the timeline so you can stay present for the moment.",
  },
];

export default function EventTimeline({
  steps = DEFAULT_STEPS,
  eyebrow = "How we work",
  heading = "A clear path from idea to evening",
}) {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    const { gsap } = getGsap();
    if (!section || !path || !gsap) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 35%",
          scrub: true,
        },
      });

      gsap.utils.toArray(".timeline-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [steps]);

  return (
    <section ref={sectionRef} className="section-pad border-t border-[var(--color-line)]">
      <div className="mx-auto max-w-[1100px]">
        <p className="font-body text-xs uppercase tracking-[0.28em] text-[var(--color-stone)]">
          {eyebrow}
        </p>
        <h2 className="mt-4 font-display text-4xl md:text-6xl">{heading}</h2>

        <div className="relative mt-16">
          <svg
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-8 -translate-x-1/2 md:block"
            viewBox="0 0 20 1000"
            preserveAspectRatio="none"
          >
            <path
              ref={pathRef}
              d="M10 0 V1000"
              fill="none"
              stroke="rgba(176,141,87,0.7)"
              strokeWidth="2"
            />
          </svg>

          <div className="space-y-10 md:space-y-16">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={`timeline-item grid items-center gap-4 opacity-0 md:grid-cols-2 ${
                  i % 2 === 1 ? "md:text-right" : ""
                }`}
              >
                <div className={i % 2 === 1 ? "md:order-2 md:pl-12" : "md:pr-12"}>
                  <p className="font-body text-xs uppercase tracking-[0.28em] text-[var(--color-accent-soft)]">
                    Phase {step.day}
                  </p>
                  <h3 className="mt-2 font-display text-3xl md:text-4xl">{step.title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-[var(--color-fog-muted)] md:text-base">
                    {step.detail}
                  </p>
                </div>
                <div className="hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
