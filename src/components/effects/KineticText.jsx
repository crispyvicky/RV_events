"use client";

import { useEffect, useMemo, useRef } from "react";
import { getGsap } from "@/lib/gsap-client";

export default function KineticText({
  text = "Experiences shaped with intention",
  className = "font-display text-4xl md:text-6xl lg:text-7xl",
  mode = "words",
}) {
  const ref = useRef(null);

  const parts = useMemo(() => {
    if (mode === "chars") {
      return text.split("").map((c) => (c === " " ? "\u00A0" : c));
    }
    return text.split(" ");
  }, [text, mode]);

  useEffect(() => {
    const el = ref.current;
    const { gsap, ScrollTrigger } = getGsap();
    if (!el || !gsap || !ScrollTrigger) return;

    const inners = el.querySelectorAll(".kinetic-inner");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        inners,
        { yPercent: 120, rotate: 6 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.05,
          stagger: mode === "chars" ? 0.018 : 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const proxy = { skew: 0 };
      const clamp = gsap.utils.clamp(-8, 8);
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const skew = clamp(self.getVelocity() / -450);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: "power3",
              overwrite: true,
              onUpdate: () => {
                gsap.set(inners, {
                  skewY: proxy.skew,
                  transformOrigin: "center bottom",
                });
              },
            });
          }
        },
      });
    }, el);

    return () => ctx.revert();
  }, [parts, mode]);

  return (
    <div ref={ref} className={className} aria-label={text}>
      {parts.map((part, i) => (
        <span key={`${part}-${i}`} className="kinetic-part inline-block overflow-hidden align-bottom">
          <span className="kinetic-inner inline-block">
            {part}
            {mode === "words" ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </div>
  );
}
