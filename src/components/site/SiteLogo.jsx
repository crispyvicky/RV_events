import Link from "next/link";
import { SITE } from "@/lib/constants";

function Mark({ size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle
        cx="40"
        cy="40"
        r="37"
        stroke="var(--color-accent-soft)"
        strokeWidth="1.15"
      />
      <circle
        cx="40"
        cy="40"
        r="33.75"
        stroke="var(--color-fog)"
        strokeWidth="0.4"
        opacity="0.28"
      />
      <g fill="var(--color-fog)">
        <path d="M21 55.5V24.8h13.1c6.55 0 10.55 3.2 10.55 8.2 0 3.55-1.85 6.15-5.15 7.35l7.05 15.15h-5.9L34.9 41.05H26.15V55.5H21Zm5.15-18.7h7.95c3.45 0 5.45-1.65 5.45-4.25s-2-4.2-5.45-4.2h-7.95v8.45Z" />
        <path d="M43.4 24.8h5.75L56.1 49.9l6.85-25.1H68.8L57.55 55.5h-4.15L43.4 24.8Z" />
      </g>
      <path
        d="M27.5 59.2c6.2 2.35 14.2 2.35 20.4 0"
        stroke="var(--color-accent)"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function SiteLogo({
  href = "/",
  size = "md",
  showWordmark = true,
  className = "",
}) {
  const dims =
    size === "lg"
      ? { mark: 52, text: "text-2xl md:text-3xl" }
      : size === "sm"
        ? { mark: 30, text: "text-base md:text-lg" }
        : size === "hero"
          ? { mark: 68, text: "text-4xl md:text-6xl lg:text-7xl" }
          : { mark: 36, text: "text-xl md:text-2xl" };

  const inner = (
    <span className={`inline-flex items-center gap-3 md:gap-4 ${className}`}>
      <Mark size={dims.mark} />
      {showWordmark ? (
        <span
          className={`font-display tracking-[0.18em] text-[var(--color-fog)] ${dims.text}`}
        >
          {SITE.name}
        </span>
      ) : null}
    </span>
  );

  if (!href) return inner;

  return (
    <Link
      href={href}
      className="inline-flex"
      data-cursor="Home"
      aria-label={SITE.name}
    >
      {inner}
    </Link>
  );
}
