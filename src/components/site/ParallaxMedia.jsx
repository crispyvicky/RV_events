"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap-client";

export default function ParallaxMedia({
  src,
  alt,
  className = "",
  priority = false,
  speed = 18,
  scaleFrom = 1.18,
}) {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    const { gsap } = getGsap();
    if (!wrap || !img || !gsap) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { yPercent: -speed, scale: scaleFrom },
        {
          yPercent: speed,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, wrap);

    return () => ctx.revert();
  }, [speed, scaleFrom]);

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`}>
      <div
        ref={imgRef}
        className="absolute inset-0 h-[130%] w-full will-change-transform"
        style={{ top: "-15%" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </div>
  );
}
