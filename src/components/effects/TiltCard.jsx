"use client";

import Image from "next/image";
import { useRef } from "react";

export default function TiltCard({
  image,
  title,
  meta,
  description,
  className = "",
}) {
  const ref = useRef(null);

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotX = (0.5 - y) * 14;
    const rotY = (x - 0.5) * 16;
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
    const glare = el.querySelector("[data-glare]");
    if (glare) {
      glare.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.28), transparent 45%)`;
    }
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  }

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative overflow-hidden border border-[var(--color-line)] transition-transform duration-200 ease-out will-change-transform ${className}`}
      data-cursor="Explore"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        <div data-glare className="pointer-events-none absolute inset-0 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6">
        {meta && (
          <p className="font-body text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent-soft)]">
            {meta}
          </p>
        )}
        <h3 className="mt-2 font-display text-2xl md:text-3xl">{title}</h3>
        {description && (
          <p className="mt-2 font-body text-sm text-[var(--color-fog-muted)]">{description}</p>
        )}
      </div>
    </article>
  );
}
