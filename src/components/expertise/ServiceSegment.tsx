"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeIn from "@/components/shared/FadeIn";
import type { ServiceSegment as ServiceSegmentType } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ServiceSegmentProps {
  segment: ServiceSegmentType;
  index: number;
}

const segmentImages = [
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
];

export default function ServiceSegment({ segment, index }: ServiceSegmentProps) {
  const isEven = index % 2 === 0;
  const imageSrc = segmentImages[index % segmentImages.length];
  const containerRef = useRef<HTMLElement>(null);

  // Disable parallax on touch/mobile — janky on low-powered devices
  const [enableParallax, setEnableParallax] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 1024px) and (hover: hover)");
    setEnableParallax(mq.matches);
    const handler = (e: MediaQueryListEvent) => setEnableParallax(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      className={`relative overflow-hidden py-20 md:py-28 lg:py-40 ${isEven ? "gradient-section-warm" : "gradient-section-cool"} gradient-noise`}
      ref={containerRef}
    >
      {/* Background numeral — decorative, clipped by overflow-hidden */}
      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none z-0",
          isEven ? "right-0 translate-x-[15%]" : "left-0 -translate-x-[15%]"
        )}
      >
        <span className="text-[40vw] sm:text-[35vw] md:text-[30vw] font-display font-bold leading-none tracking-tighter">
          0{index + 1}
        </span>
      </div>

      <div className="container-wide relative z-10">
        <div
          className={cn(
            "flex flex-col lg:flex-row gap-12 lg:gap-24 items-center",
            !isEven && "lg:flex-row-reverse"
          )}
        >
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/3] sm:aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-2xl lg:rounded-3xl bg-border-light shadow-2xl"
            >
              <motion.img
                style={enableParallax ? { y: imageY } : undefined}
                src={imageSrc}
                alt={segment.heading}
                className="absolute inset-0 w-full h-[120%] object-cover object-center -top-[10%]"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl lg:rounded-3xl pointer-events-none mix-blend-overlay" />
            </motion.div>
          </div>

          {/* Text */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <FadeIn>
              <div className="flex items-center gap-4 mb-5 lg:mb-6">
                <span className="text-sm font-mono text-accent">0{index + 1}</span>
                <div className="h-px w-12 bg-accent/30" />
                <p className="text-eyebrow text-accent !mb-0">{segment.label}</p>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-text mb-5 lg:mb-6 tracking-tight leading-tight">
                {segment.heading}
              </h2>
              <p className="font-sans text-base md:text-lg lg:text-xl text-text-muted leading-relaxed max-w-xl mb-10 lg:mb-12">
                {segment.description}
              </p>
            </FadeIn>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
              {segment.offerings.map((offering, i) => (
                <motion.li
                  key={offering}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                  className="flex items-center gap-3 py-3 border-b border-border-light/50 last:border-0"
                >
                  <svg
                    className="w-4 h-4 text-accent shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm md:text-base text-text font-medium">
                    {offering}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
