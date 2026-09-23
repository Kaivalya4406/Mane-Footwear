import type { ShoeIconKind } from "../../types";

type ImagePlaceholderProps = {
  src?: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
  variant?: "light" | "dark";
  kind?: ShoeIconKind;
  iconClassName?: string;
};

const ICON_PATHS: Record<ShoeIconKind, string> = {
  sneaker:
    "M8 44c0-2.5 1.5-4 4-5l10-4 8-9c1.5-1.5 3-2.5 5-2.5h8c4 0 7 1.5 8.5 4.5l5 9c1.5 2.5 3 4 5.5 5v7a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3v-5Z",
  formal:
    "M6 42c0-2 1.5-3.2 4-3.6l15-2.4c2.5-.4 4-1.6 5.5-3.4l4-4.6c1.5-1.7 3-2.6 5-2.6h8c3 0 5 2 5 5v9a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-.4Z",
  sandal:
    "M8 40c0-3 2-5.5 5.5-5.5h29c4 0 6.5 2.8 6.5 6v2.5H12A4 4 0 0 1 8 39v-1ZM18 32c4-4 11-6 17-6M24 32v-6",
  boot: "M15 15v13.5l-7 4.3C6 34 5 36 5 38v4a3 3 0 0 0 3 3h35a3 3 0 0 0 3-3v-5.5c0-3-2-5.4-5-6.3l-8.5-3V15a3 3 0 0 0-3-3H18a3 3 0 0 0-3 3Z",
  kids: "M10 40c0-2 1.2-3.3 3.3-3.8l10-2.6 6-5.8c1.2-1.2 2.4-1.8 3.8-1.8h9.9c3 0 5 2 5 5v7.5a3 3 0 0 1-3 3H13a3 3 0 0 1-3-3v-1.5Z",
  leather:
    "M8 40c0-2.6 1.6-4.2 4.2-4.7l14-2.6c3-.6 5-2 7-4.2l3.6-3.8c1.6-1.7 3.2-2.7 5.2-2.7h6c3 0 5 2 5 5v9a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3v-1Z M23 33.5c2.4-1 4.8-1 7 0",
};

// Renders a real photo once `src` is provided (e.g. once real MANE FOOTWEAR
// photography is added under public/images/...). Until then, shows an
// on-brand illustrated silhouette matching the item's footwear category.
export default function ImagePlaceholder({
  src,
  alt,
  aspectRatio = "aspect-[4/3]",
  className = "",
  variant = "light",
  kind = "sneaker",
  iconClassName = "h-14 w-16 sm:h-16 sm:w-20",
}: ImagePlaceholderProps) {
      if (src) {
    return (
      <div className={`relative overflow-hidden rounded-lg ${aspectRatio} ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }

  const isDark = variant === "dark";

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative flex items-center justify-center overflow-hidden rounded-lg ${aspectRatio} ${className} ${
          isDark
          ? "border border-gold/20 bg-navy bg-[radial-gradient(circle_at_50%_35%,rgba(184,145,47,0.18),transparent_65%)]"
          : "border border-gray-light bg-gradient-to-br from-navy/5 to-gold/10"
      }`}
    >
      <svg
        viewBox="0 0 64 48"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
              className={`${iconClassName} ${isDark ? "text-gold/70" : "text-navy/25"}`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS[kind]} />
        <path strokeLinecap="round" d="M5 44h46" />
      </svg>
    </div>
  );
}