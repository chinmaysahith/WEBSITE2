"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import FadeIn from "@/components/shared/FadeIn";
import { HighlightText } from "@/components/ui/HighlightText";
import type { HeroContent } from "@/lib/data";

interface HeroProps {
  content: HeroContent;
}

export default function Hero({ content }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  // Remove the off-white / beige background from the TV image
  // so it blends seamlessly with the site background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const img = document.createElement("img");
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imageData.data;

      for (let i = 0; i < d.length; i += 4) {
        const r = d[i];
        const g = d[i + 1];
        const b = d[i + 2];

        // Detect off-white / beige background pixels
        const maxC = Math.max(r, g, b);
        const minC = Math.min(r, g, b);
        const saturation = maxC === 0 ? 0 : (maxC - minC) / maxC;
        const brightness = (r + g + b) / 3;

        // Low-saturation, high-brightness = background
        if (brightness > 190 && saturation < 0.12) {
          const bgStrength = Math.min(1, (brightness - 190) / 40);
          const alpha = Math.max(0, Math.round(255 * (1 - bgStrength)));
          d[i + 3] = alpha;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setReady(true);
    };
    img.src = "/images/retro-tvs.png";
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[var(--bg)]">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">

          {/* Left — text (padded for readability) */}
          <div className="order-2 lg:order-1 px-6 md:px-12 lg:pl-16 xl:pl-24 lg:pr-8">
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
                  className="inline-flex items-center px-8 py-4 text-base font-medium bg-accent text-bg rounded-full hover:bg-accent-hover transition-colors duration-200 shadow-sm hover:shadow-md"
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

          {/* Right — retro TVs, full-bleed (no padding) */}
          <FadeIn delay={0.15} direction="left" className="order-1 lg:order-2">
            <div className="relative flex items-center justify-center">
              {/* Fallback shown while canvas processes — same layout footprint, no shift */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/retro-tvs.png"
                alt="Stacked retro TVs"
                fetchPriority="high"
                decoding="async"
                className="w-full h-auto object-contain"
                style={{ opacity: ready ? 0 : 1, transition: "opacity 0.3s ease" }}
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-auto"
                style={{
                  opacity: ready ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              />
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
