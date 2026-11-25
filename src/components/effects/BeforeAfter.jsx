"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/gsap-client";

export default function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeLabel = "Empty venue",
  afterLabel = "Fully produced",
  title = "From blank space to atmosphere",
  description = "Drag to reveal how RV EVENTS transforms a venue — lighting, florals, staging, and guest flow.",
}) {
  const wrapRef = useRef(null);
  const [pos, setPos] = useState(55);
  const dragging = useRef(false);

  useEffect(() => {
    const { gsap } = getGsap();
    if (!wrapRef.current || !gsap) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapRef.current,
        { autoAlpha: 0, y: 60 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 80%",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  function setFromClientX(clientX) {
    const el = wrapRef.current?.querySelector("[data-ba-stage]");
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, next)));
  }

  return (
    <section className="section-pad border-t border-[var(--color-line)]">
      <div ref={wrapRef} className="mx-auto max-w-[1400px] opacity-0">
        <p className="font-body text-xs uppercase tracking-[0.28em] text-[var(--color-stone)]">
          Transformation
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl md:text-6xl">{title}</h2>
        <p className="mt-5 max-w-2xl font-body text-[var(--color-fog-muted)]">{description}</p>

        <div
          data-ba-stage
          className="relative mt-12 aspect-[16/10] cursor-ew-resize overflow-hidden select-none touch-none"
          onPointerDown={(e) => {
            dragging.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            setFromClientX(e.clientX);
          }}
          onPointerMove={(e) => {
            if (!dragging.current) return;
            setFromClientX(e.clientX);
          }}
          onPointerUp={() => {
            dragging.current = false;
          }}
          data-cursor="Drag"
        >
          <Image src={afterSrc} alt={afterLabel} fill className="object-cover" sizes="100vw" />
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <Image src={beforeSrc} alt={beforeLabel} fill className="object-cover" sizes="100vw" />
          </div>

          <div
            className="absolute inset-y-0 z-10 w-px bg-white/90"
            style={{ left: `${pos}%` }}
          >
            <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/50 backdrop-blur-sm">
              <span className="font-body text-[10px] tracking-widest text-white">⟷</span>
            </div>
          </div>

          <span className="absolute left-4 top-4 z-10 bg-black/50 px-3 py-1 font-body text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm">
            {beforeLabel}
          </span>
          <span className="absolute right-4 top-4 z-10 bg-black/50 px-3 py-1 font-body text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm">
            {afterLabel}
          </span>
        </div>
      </div>
    </section>
  );
}
