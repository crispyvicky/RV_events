"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { getGsap } from "@/lib/gsap-client";
import SiteLogo from "@/components/site/SiteLogo";

export default function FullScreenMenu({ open, onClose }) {
  const panelRef = useRef(null);
  const navRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    const panel = panelRef.current;
    const nav = navRef.current;
    const { gsap } = getGsap();
    if (!panel || !gsap) return;

    document.body.style.overflow = open ? "hidden" : "";

    const ctx = gsap.context(() => {
      if (open) {
        gsap.fromTo(
          panel,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.35, ease: "power2.out" }
        );
        if (nav) {
          gsap.fromTo(
            nav.querySelectorAll(".menu-item"),
            { y: 48, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
              delay: 0.05,
            }
          );
        }
      } else {
        gsap.to(panel, {
          autoAlpha: 0,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => setMounted(false),
        });
      }
    }, panel);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [open, mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[60] flex flex-col justify-between bg-[rgba(8,8,8,0.97)] px-6 py-8 md:px-12"
      style={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between">
        <SiteLogo size="sm" href={null} />
        <button
          type="button"
          onClick={onClose}
          className="font-body text-xs uppercase tracking-[0.22em] text-[var(--color-fog-muted)]"
          data-cursor="Close"
        >
          Close
        </button>
      </div>

      <nav ref={navRef} className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        {[...NAV_LINKS, { href: "/get-quote", label: "Get Quote" }].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="menu-item font-display text-5xl text-[var(--color-fog)] md:text-7xl"
            data-cursor="Go"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="menu-item flex flex-wrap gap-8 font-body text-sm text-[var(--color-stone)]">
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
        <span>{SITE.cities.join(" · ")}</span>
      </div>
    </div>
  );
}
