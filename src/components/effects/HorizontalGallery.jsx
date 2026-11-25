"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap-client";

export default function HorizontalGallery({
  items = [],
  eyebrow = "Portfolio reel",
  heading = "Scroll through celebrations",
}) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const { gsap } = getGsap();
    if (!section || !track || !gsap || !items.length) return;

    const ctx = gsap.context(() => {
      const getScroll = () => Math.max(0, track.scrollWidth - window.innerWidth);
      // Height drives sticky scrub — no pin spacer in the DOM
      const setHeight = () => {
        section.style.height = `${getScroll() + window.innerHeight * 1.15}px`;
      };
      setHeight();

      gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
          onRefresh: setHeight,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [items]);

  return (
    <section ref={sectionRef} className="relative bg-[var(--color-ink)]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-20 px-6 pt-10 md:px-12">
          <p className="font-body text-xs uppercase tracking-[0.28em] text-[var(--color-stone)]">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">{heading}</h2>
        </div>

        <div
          ref={trackRef}
          className="flex h-screen w-max items-center gap-6 px-6 pt-28 will-change-transform md:gap-8 md:px-12"
        >
          {items.map((item) => (
            <Link
              key={item.slug || item.title}
              href={item.href || `/portfolio/${item.slug}`}
              className="group relative h-[62vh] w-[78vw] shrink-0 overflow-hidden md:w-[38vw]"
              data-cursor="View"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="80vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-0 p-6 md:p-8">
                <p className="font-body text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent-soft)]">
                  {item.category} · {item.city}
                </p>
                <h3 className="mt-2 font-display text-3xl md:text-4xl">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
