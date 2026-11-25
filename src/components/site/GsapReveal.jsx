"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap-client";

export default function GsapReveal({
  children,
  className = "",
  y = 72,
  delay = 0,
  duration = 1.15,
  scrub = false,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const { gsap } = getGsap();
    if (!el || !gsap) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: scrub
            ? {
                trigger: el,
                start: "top 85%",
                end: "top 40%",
                scrub: true,
              }
            : {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [y, delay, duration, scrub]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
