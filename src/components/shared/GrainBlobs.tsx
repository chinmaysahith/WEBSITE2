"use client";

/**
 * GrainBlobs — Premium soft gradient blobs with film grain texture.
 *
 * Fix notes:
 *  - Old warm/sand colours were nearly identical to #FAFAF7 bg → invisible.
 *  - Old SVG feComposite "in" operator produced no output on white fill.
 *  - New colours are noticeably different from background but still tasteful.
 *  - Grain now uses a tiled background-image SVG with multiply blend — reliable.
 */

interface GrainBlobsProps {
  variant?: "amber" | "sage" | "blush" | "slate";
  intensity?: number; // 0–1, grain darkness (default 0.12)
  animate?: boolean;
  className?: string;
}

// Colors are picked to be VISIBLY different from #FAFAF7 cream
// while staying tonal and premium — NOT neon, NOT flat
const PALETTE: Record<string, { core: string; a: string; b: string }> = {
  // Warm amber-gold
  amber: {
    core: "rgba(215, 120, 40, 0.45)",  // Deep rich orange core
    a: "rgba(195, 155, 80, 0.35)",     // Mid amber
    b: "rgba(225, 190, 120, 0.15)",    // Pale gold fade
  },
  // Muted sage-green
  sage: {
    core: "rgba(60, 130, 90, 0.40)",   // Deep forest core
    a: "rgba(90, 150, 110, 0.35)",   
    b: "rgba(130, 180, 145, 0.15)",  
  },
  // Dusty blush-rose
  blush: {
    core: "rgba(200, 75, 80, 0.38)",   // Richer, deeper red/rose core
    a: "rgba(190, 115, 110, 0.30)",    // Mid dusty rose
    b: "rgba(225, 165, 155, 0.15)",    // Pale pink fade
  },
  // Cool slate-blue
  slate: {
    core: "rgba(60, 90, 150, 0.40)",   // Deep slate core
    a: "rgba(90, 120, 175, 0.35)",   
    b: "rgba(140, 168, 215, 0.15)",  
  },
};

// Tiled grain SVG as a CSS background — uses multiply so it darkens what's under it
// Encodes to a URL-safe data URI without escaping issues
const GRAIN_BG = [
  "url(\"data:image/svg+xml,",
  "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>",
  "<filter id='g'>",
  "<feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' seed='8' stitchTiles='stitch'/>",
  "<feColorMatrix type='saturate' values='0'/>",
  "</filter>",
  "<rect width='200' height='200' filter='url(%23g)' opacity='1'/>",
  "</svg>\")",
].join("");

export default function GrainBlobs({
  variant = "amber",
  intensity = 0.22, // Increased default intensity for much more visible grain
  animate = true,
  className = "",
}: GrainBlobsProps) {
  const pal = PALETTE[variant] ?? PALETTE.amber;

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* ── Blob A — Top Right Corner Only ──────────────────────── */}
      <div
        className={animate ? "blob-drift-a" : undefined}
        style={{
          position: "absolute",
          top: "-10%",
          right: "-10%",
          width: "80vw",
          height: "120vh",
          maxWidth: 1400,
          background: `
            radial-gradient(ellipse at 95% 5%, ${pal.core} 0%, transparent 45%),
            radial-gradient(ellipse at 85% 15%, ${pal.a} 5%, transparent 65%),
            radial-gradient(ellipse at 70% 30%, ${pal.b} 15%, transparent 90%)
          `,
          filter: "blur(80px)",
          willChange: "transform",
        }}
      />

      {/* ── Film grain overlay — tiled SVG noise, enhanced blend ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: GRAIN_BG,
          backgroundRepeat: "repeat",
          backgroundSize: "150px 150px", // slightly smaller tile for finer grain
          opacity: intensity,
          mixBlendMode: "overlay", // Overlay creates both highlights and shadows for high-clarity grain
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
