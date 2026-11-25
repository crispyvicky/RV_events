"use client";

import Link from "next/link";
import { useRef } from "react";

export default function MagneticButton({
  href,
  children,
  className = "btn-primary",
  strength = 0.35,
}) {
  const ref = useRef(null);

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  }

  const shared = {
    ref,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    className: `${className} transition-transform duration-200 ease-out will-change-transform`,
    "data-cursor": "Click",
  };

  if (href) {
    return (
      <Link href={href} {...shared}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" {...shared}>
      {children}
    </button>
  );
}
