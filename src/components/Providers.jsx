"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { getGsap } from "@/lib/gsap-client";

export default function Providers({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;

    const { gsap, ScrollTrigger } = getGsap();
    if (!gsap || !ScrollTrigger) return;

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      touchMultiplier: 1.3,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(ticker);
      try {
        lenis.destroy();
      } catch {
        /* ignore */
      }
      // Do NOT kill all ScrollTriggers here — races React unmount (removeChild errors).
      // Each component reverts its own gsap.context().
    };
  }, [isAdmin, pathname]);

  return <SessionProvider>{children}</SessionProvider>;
}
