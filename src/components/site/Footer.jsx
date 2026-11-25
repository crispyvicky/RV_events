"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE } from "@/lib/constants";
import SiteLogo from "@/components/site/SiteLogo";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-ink)]">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-10 lg:px-16">
        <div>
          <SiteLogo size="lg" />
          <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-[var(--color-stone)]">
            {SITE.tagline}. Full-service event management across{" "}
            {SITE.cities.join(" & ")}.
          </p>
        </div>

        <div>
          <p className="font-body text-xs uppercase tracking-[0.22em] text-[var(--color-stone)]">
            Explore
          </p>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm text-[var(--color-fog-muted)] transition hover:text-[var(--color-fog)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/get-quote"
                className="font-body text-sm text-[var(--color-fog-muted)] transition hover:text-[var(--color-fog)]"
              >
                Get Quote
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-body text-xs uppercase tracking-[0.22em] text-[var(--color-stone)]">
            Contact
          </p>
          <ul className="mt-5 space-y-3 font-body text-sm text-[var(--color-fog-muted)]">
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
            </li>
            <li>{SITE.cities.join(" · ")}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-line)] px-6 py-6 md:px-10 lg:px-16">
        <p className="font-body text-xs tracking-wide text-[var(--color-stone)]">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
