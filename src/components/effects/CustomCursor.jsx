"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const pathname = usePathname();
  const dotRef = useRef(null);
  const labelRef = useRef(null);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setVisible(true);
    document.documentElement.classList.add("has-custom-cursor");

    let raf;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      const interactive = e.target.closest("[data-cursor], a, button");
      const text = interactive?.getAttribute?.("data-cursor") || (interactive ? "Open" : "");
      setLabel(text);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [pathname]);

  if (!visible || pathname?.startsWith("/admin")) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`pointer-events-none fixed left-0 top-0 z-[100] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-fog)] mix-blend-difference transition-opacity ${
          label ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        ref={labelRef}
        className={`pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/30 bg-black/55 px-4 py-2 font-body text-[10px] uppercase tracking-[0.22em] text-white backdrop-blur-md transition-opacity ${
          label ? "opacity-100" : "opacity-0"
        }`}
      >
        {label || "·"}
      </div>
    </>
  );
}
