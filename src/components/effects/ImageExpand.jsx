"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap-client";

export default function ImageExpand({
  src,
  title = "Hyderabad Garden Wedding",
  subtitle = "A celebration shaped with intention",
  label = "Featured experience",
}) {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const { gsap } = getGsap();
    if (!section || !frame || !gsap) return;

    const ctx = gsap.context(() => {
      // Sticky container — no ScrollTrigger pin (avoids React removeChild crashes)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      tl.fromTo(
        frame,
        {
          width: "min(420px, 78vw)",
          height: "min(520px, 52vh)",
          borderRadius: "4px",
        },
        {
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          ease: "none",
        }
      )
        .fromTo(
          titleRef.current,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, ease: "none" },
          0.45
        )
        .fromTo(
          ".expand-veil",
          { opacity: 0.15 },
          { opacity: 0.55, ease: "none" },
          0
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[220vh] bg-[var(--color-ink)]"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div
          ref={frameRef}
          className="relative overflow-hidden will-change-[width,height]"
          style={{ width: "min(420px, 78vw)", height: "min(520px, 52vh)" }}
        >
          <Image src={src} alt={title} fill priority className="object-cover" sizes="100vw" />
          <div className="expand-veil absolute inset-0 bg-black" />
          <div
            ref={titleRef}
            className="absolute inset-x-0 bottom-0 z-10 px-8 pb-12 md:px-16 md:pb-16"
            style={{ opacity: 0 }}
          >
            <p className="font-body text-xs uppercase tracking-[0.28em] text-[var(--color-accent-soft)]">
              {label}
            </p>
            <h2 className="mt-3 font-display text-4xl text-white md:text-6xl lg:text-7xl">
              {title}
            </h2>
            <p className="mt-3 max-w-xl font-body text-sm text-[var(--color-fog-muted)] md:text-base">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
