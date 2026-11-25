"use client";

import { useEffect, useRef } from "react";
import { PLACEHOLDERS } from "@/lib/constants";
import { getGsap } from "@/lib/gsap-client";
import MagneticButton from "@/components/effects/MagneticButton";
import ParallaxMedia from "./ParallaxMedia";

export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const { gsap } = getGsap();
    if (!root || !gsap) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-line",
        { autoAlpha: 0, y: 56 },
        { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.12 }
      )
        .fromTo(
          ".hero-cta",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.9 },
          "-=0.55"
        )
        .fromTo(
          ".hero-scroll",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.8 },
          "-=0.3"
        );

      gsap.to(".hero-veil", {
        opacity: 0.92,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-copy", {
        yPercent: 28,
        autoAlpha: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[100svh] items-end overflow-hidden"
    >
      <ParallaxMedia
        src={PLACEHOLDERS.hero}
        alt="RV EVENTS celebration atmosphere"
        priority
        className="absolute inset-0 h-[120%] w-full"
        speed={12}
        scaleFrom={1.22}
      />
      <div className="hero-veil absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />

      <div className="hero-copy relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-24 pt-40 md:px-10 md:pb-32 lg:px-16">
        <h1 className="max-w-4xl">
          <span className="hero-line block font-display text-3xl leading-[1.12] text-[var(--color-fog)] md:text-5xl lg:text-6xl">
            We don&apos;t start with what&apos;s typical.
          </span>
          <span className="hero-line mt-2 block font-display text-3xl leading-[1.12] text-[var(--color-fog-muted)] md:text-5xl lg:text-6xl">
            We start with what would light you up.
          </span>
        </h1>
        <p className="hero-line mt-8 max-w-xl font-body text-sm leading-relaxed text-[var(--color-fog-muted)] md:text-base">
          Full-service event management across Hyderabad and Kakinada —
          weddings, corporate gatherings, and celebrations shaped with
          intention.
        </p>
        <div className="hero-cta mt-12 flex flex-wrap gap-4">
          <MagneticButton href="/get-quote" className="btn-primary">
            Begin a conversation
          </MagneticButton>
          <MagneticButton href="/portfolio" className="btn-ghost">
            View portfolio
          </MagneticButton>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="font-body text-[10px] uppercase tracking-[0.35em] text-[var(--color-stone)]">
            Scroll
          </span>
          <span className="scroll-line h-10 w-px bg-[var(--color-fog-muted)]" />
        </div>
      </div>
    </section>
  );
}
