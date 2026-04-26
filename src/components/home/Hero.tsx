import Link from "next/link";
import FadeIn from "@/components/shared/FadeIn";
import { HighlightText } from "@/components/ui/HighlightText";
import type { HeroContent } from "@/lib/data";

interface HeroProps {
  content: HeroContent;
}

export default function Hero({ content }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[var(--bg)]">
      <div className="container-wide w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — text */}
          <div className="order-2 lg:order-1">
            <FadeIn>
              <p className="text-eyebrow text-accent mb-6">APSLOCK</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-hero text-text">
                <HighlightText text={content.headline} highlight="build" />
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg md:text-xl text-text-muted leading-relaxed max-w-xl">
                {content.subline}
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  href={content.primaryCta.href}
                  className="inline-flex items-center px-8 py-4 text-base font-medium bg-accent text-white rounded-full hover:bg-accent-hover transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  {content.primaryCta.label}
                </Link>
                <Link
                  href={content.secondaryCta.href}
                  className="inline-flex items-center px-8 py-4 text-base font-medium text-text border border-border rounded-full hover:border-text transition-all duration-200"
                >
                  {content.secondaryCta.label}
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right — animated gradient composition */}
          <FadeIn delay={0.15} direction="left" className="order-1 lg:order-2">
            <div
              className="relative w-full overflow-hidden rounded-2xl"
              style={{ aspectRatio: "4/3", background: "var(--surface)" }}
            >
              {/* Blob 1 — warm amber */}
              <div
                aria-hidden="true"
                className="absolute rounded-full"
                style={{
                  width: "70%",
                  height: "70%",
                  top: "5%",
                  left: "5%",
                  background: "#E2C99A",
                  filter: "blur(64px)",
                  opacity: 0.55,
                  animation: "blob-a 10s ease-in-out infinite",
                  willChange: "transform",
                }}
              />
              {/* Blob 2 — cool blue */}
              <div
                aria-hidden="true"
                className="absolute rounded-full"
                style={{
                  width: "60%",
                  height: "60%",
                  bottom: "5%",
                  right: "5%",
                  background: "#9AB8D8",
                  filter: "blur(56px)",
                  opacity: 0.5,
                  animation: "blob-b 13s ease-in-out infinite",
                  animationDelay: "-4s",
                  willChange: "transform",
                }}
              />
              {/* Blob 3 — soft lavender */}
              <div
                aria-hidden="true"
                className="absolute rounded-full"
                style={{
                  width: "48%",
                  height: "48%",
                  top: "35%",
                  left: "28%",
                  background: "#BBA8D8",
                  filter: "blur(48px)",
                  opacity: 0.45,
                  animation: "blob-c 8s ease-in-out infinite",
                  animationDelay: "-7s",
                  willChange: "transform",
                }}
              />

              {/* Dot-grid overlay for texture */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(0,0,0,0.12) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                  opacity: 0.6,
                }}
              />

              {/* Vignette — pulls blobs away from edges */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 35%, color-mix(in oklab, var(--surface) 55%, transparent) 100%)",
                }}
              />

              {/* Bottom label */}
              <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[var(--text)]/35">
                  Design · Development · Growth
                </p>
                <span className="font-mono text-[0.6rem] text-[var(--text)]/25">
                  Est. 2025
                </span>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
