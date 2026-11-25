"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import FullScreenMenu from "@/components/effects/FullScreenMenu";
import MagneticButton from "@/components/effects/MagneticButton";
import SiteLogo from "@/components/site/SiteLogo";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (isAdmin) return null;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[rgba(12,12,12,0.88)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10 lg:px-16">
          <SiteLogo size="md" />

          <nav className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-[11px] uppercase tracking-[0.24em] transition ${
                  pathname === link.href
                    ? "text-[var(--color-accent-soft)]"
                    : "text-[var(--color-fog-muted)] hover:text-[var(--color-fog)]"
                }`}
                data-cursor="Go"
              >
                {link.label}
              </Link>
            ))}
            <MagneticButton href="/get-quote" className="btn-primary !px-5 !py-2.5">
              Get Quote
            </MagneticButton>
          </nav>

          <button
            type="button"
            aria-label="Open menu"
            className="font-body text-xs uppercase tracking-[0.22em] text-[var(--color-fog-muted)] lg:hidden"
            onClick={() => setOpen(true)}
            data-cursor="Menu"
          >
            <span className="inline-flex items-center gap-2">
              <Menu size={18} /> Menu
            </span>
          </button>

          <button
            type="button"
            aria-label="Open menu"
            className="hidden font-body text-xs uppercase tracking-[0.22em] text-[var(--color-fog-muted)] lg:inline-flex"
            onClick={() => setOpen(true)}
            data-cursor="Menu"
          >
            Menu
          </button>
        </div>
      </header>

      <FullScreenMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
