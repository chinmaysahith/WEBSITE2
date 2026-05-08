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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const ctx = maybeCtx;

    let animId = 0;
    const videos: HTMLVideoElement[] = [];

    const img = document.createElement("img");
    img.crossOrigin = "anonymous";
    img.onload = async () => {
      const W = img.naturalWidth;
      const H = img.naturalHeight;
      canvas.width = W;
      canvas.height = H;

      // --- Step 1: Process image on an offscreen canvas ---
      const offscreen = document.createElement("canvas");
      offscreen.width = W;
      offscreen.height = H;
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true })!;
      offCtx.drawImage(img, 0, 0);

      const imageData = offCtx.getImageData(0, 0, W, H);
      const d = imageData.data;

      // Y-zone boundaries (percentage of image height)
      const zoneCuts = [0, 0.4, 0.7, 1.0];

      // Bounding boxes per zone: [minX, minY, maxX, maxY]
      const bboxes: [number, number, number, number][] = [
        [W, H, 0, 0],
        [W, H, 0, 0],
        [W, H, 0, 0],
      ];

      for (let i = 0; i < d.length; i += 4) {
        const r = d[i];
        const g = d[i + 1];
        const b = d[i + 2];

        const pixelIndex = i / 4;
        const px = pixelIndex % W;
        const py = (pixelIndex - px) / W;

        // Detect off-white / beige background pixels
        const maxC = Math.max(r, g, b);
        const minC = Math.min(r, g, b);
        const saturation = maxC === 0 ? 0 : (maxC - minC) / maxC;
        const brightness = (r + g + b) / 3;

        if (brightness > 190 && saturation < 0.12) {
          d[i + 3] = 0;
          continue;
        }

        // Detect chroma-green pixels
        const isGreen = g > 80 && g > r * 1.35 && g > b * 1.35;
        if (isGreen) {
          d[i + 3] = 0;

          // Determine which TV zone this pixel belongs to
          const yPct = py / H;
          let zone = -1;
          for (let z = 0; z < 3; z++) {
            if (yPct >= zoneCuts[z] && yPct < zoneCuts[z + 1]) {
              zone = z;
              break;
            }
          }
          if (zone >= 0) {
            const bb = bboxes[zone];
            if (px < bb[0]) bb[0] = px;
            if (py < bb[1]) bb[1] = py;
            if (px > bb[2]) bb[2] = px;
            if (py > bb[3]) bb[3] = py;
          }
        }
      }

      offCtx.putImageData(imageData, 0, 0);

      // Create bitmap from processed image
      const processedBitmap = await createImageBitmap(offscreen);

      // Convert bounding boxes to { x, y, w, h }
      const bounds = bboxes.map((bb) => ({
        x: bb[0],
        y: bb[1],
        w: bb[2] - bb[0],
        h: bb[3] - bb[1],
      }));

      // --- Step 2: Create 3 video elements ---
      const videoSrcs = [
        "/videos/video-top.mp4",
        "/videos/video-mid.mp4",
        "/videos/video-bot.mp4",
      ];

      let readyCount = 0;

      videoSrcs.forEach((src, idx) => {
        const video = document.createElement("video");
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.crossOrigin = "anonymous";
        video.src = src;
        videos[idx] = video;

        video.addEventListener("canplaythrough", () => {
          readyCount++;
          if (readyCount === 3) {
            videos.forEach((v) => v.play().catch(e => console.error("Video play failed:", e)));
            setReady(true);
            startLoop();
          }
        }, { once: true });

        video.load();
      });

      // --- Step 3: requestAnimationFrame render loop ---
      function startLoop() {
        function frame() {
          ctx.clearRect(0, 0, W, H);

          // Draw each video into its TV bounding box
          for (let i = 0; i < 3; i++) {
            const v = videos[i];
            const b = bounds[i];
            if (v.readyState >= 2 && b.w > 0) {
              // Calculate object-fit: cover to prevent stretching
              const videoAspect = v.videoWidth / v.videoHeight;
              const boxAspect = b.w / b.h;

              let sx = 0, sy = 0, sw = v.videoWidth, sh = v.videoHeight;

              if (videoAspect > boxAspect) {
                // Video is wider than the box, crop sides
                sw = v.videoHeight * boxAspect;
                sx = (v.videoWidth - sw) / 2;
              } else {
                // Video is taller than the box, crop top/bottom
                sh = v.videoWidth / boxAspect;
                sy = (v.videoHeight - sh) / 2;
              }

              ctx.drawImage(v, sx, sy, sw, sh, b.x, b.y, b.w, b.h);
            }
          }

          // Draw the processed TV frame on top (green holes are transparent)
          ctx.drawImage(processedBitmap, 0, 0);

          animId = requestAnimationFrame(frame);
        }
        animId = requestAnimationFrame(frame);
      }
    };
    img.src = "/images/retro-tvs.png";

    // --- Cleanup on unmount ---
    return () => {
      cancelAnimationFrame(animId);
      videos.forEach((v) => {
        v.pause();
        v.src = "";
      });
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#F3F1ED]">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">

          {/* Left — text (padded for readability) */}
          <div className="order-2 lg:order-1 px-6 md:px-12 lg:pl-16 xl:pl-24 lg:pr-8">
            <FadeIn>
              <p className="text-eyebrow text-accent mb-6">APSLOCK</p>
            </FadeIn>
            <FadeIn>
              <h1 className="font-editorial font-light text-[clamp(4rem,6vw,7.5rem)] tracking-[-0.05em] leading-[0.84] text-text">
                <HighlightText text={content.headline} highlight={["stand out.", "perform."]} />
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg md:text-xl text-text-muted leading-relaxed max-w-xl">
                {content.subline}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
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
            <div className="relative flex items-center justify-center" style={{ maxWidth: '75%', margin: '0 auto', transform: 'scale(1.1)' }}>
              {/* Fallback shown while canvas processes — same layout footprint, no shift */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/retro-tvs.png"
                alt="Stacked retro TVs"
                fetchPriority="high"
                decoding="async"
                className="w-full h-auto object-contain"
                style={{ opacity: 0 }}
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
