"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * Portfolio card link. View Transitions disabled for now —
 * they conflict with GSAP pin spacers / React unmounts.
 */
export default function MorphLink({
  href,
  image,
  alt,
  children,
  className = "",
  imageClassName = "object-cover",
  aspectClass = "aspect-[4/5]",
}) {
  return (
    <Link href={href} className={className} data-cursor="View Event">
      <div className={`relative overflow-hidden ${aspectClass}`}>
        <Image src={image} alt={alt} fill className={imageClassName} sizes="50vw" />
      </div>
      {children}
    </Link>
  );
}
