"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ValuesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 50%"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const lineWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Reveal 1: Origin (Top Left)
  const op1 = useTransform(smoothProgress, [0.1, 0.25], [0, 1]);
  const y1 = useTransform(smoothProgress, [0.1, 0.25], [30, 0]);
  
  // Reveal 2: Approach (Bottom Left)
  const op2 = useTransform(smoothProgress, [0.3, 0.45], [0, 1]);
  const y2 = useTransform(smoothProgress, [0.3, 0.45], [30, 0]);

  // Reveal 3: Conviction (Top Right)
  const op3 = useTransform(smoothProgress, [0.5, 0.65], [0, 1]);
  const y3 = useTransform(smoothProgress, [0.5, 0.65], [30, 0]);

  // Reveal 4: Today (Bottom Right)
  const op4 = useTransform(smoothProgress, [0.7, 0.85], [0, 1]);
  const y4 = useTransform(smoothProgress, [0.7, 0.85], [30, 0]);

  return (
    <section ref={containerRef} className="py-32 md:py-48 relative overflow-hidden bg-[var(--bg)]">
      <div className="container-wide">
        <h2 className="text-[clamp(3.5rem,7vw,6rem)] font-editorial font-light text-text mb-24 uppercase tracking-tight">
          Who We Are
        </h2>

        <div className="relative">
          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 pb-16">
            <motion.div style={{ opacity: op1, y: y1 }}>
              <h3 className="text-3xl font-semibold text-text tracking-wide mb-4">Origin</h3>
              <p className="text-text-muted leading-relaxed text-lg">
                APSLOCK was founded on a single conviction — that strategy, design, and engineering belong under one roof. Not handed off across teams, not managed through layers. Built together, from the first brief to the final delivery.
              </p>
            </motion.div>
            <motion.div style={{ opacity: op3, y: y3 }}>
              <h3 className="text-3xl font-semibold text-text tracking-wide mb-4">Conviction</h3>
              <p className="text-text-muted leading-relaxed text-lg">
                We do not operate at arm&apos;s length. Every engagement is a direct partnership — embedded in your process, accountable to your outcomes. The work carries our name, and we treat it accordingly.
              </p>
            </motion.div>
          </div>

          {/* Timeline Track */}
          <div className="relative h-px w-full my-8">
            {/* Dashed Background Line */}
            <div className="absolute inset-0 w-full h-full" style={{ background: "repeating-linear-gradient(to right, rgba(20,18,16,0.15) 0, rgba(20,18,16,0.15) 6px, transparent 6px, transparent 12px)" }} />
            
            {/* Solid Filled Line (The Time Frame) */}
            <motion.div 
              className="absolute left-0 top-0 h-full bg-text shadow-[0_0_15px_rgba(20,18,16,0.3)]" 
              style={{ width: lineWidth }} 
            />

            {/* Left Dot (Projector 1) */}
            <motion.div 
              className="absolute top-1/2 -translate-y-1/2 left-[25%] md:left-[20%] w-2 h-2 rounded-full border border-text bg-[var(--bg)] z-10"
              style={{ backgroundColor: useTransform(smoothProgress, [0.2, 0.25], ["var(--bg)", "var(--text)"]) }}
            />
            {/* Right Dot (Projector 2) */}
            <motion.div 
              className="absolute top-1/2 -translate-y-1/2 left-[75%] md:left-[70%] w-2 h-2 rounded-full border border-text bg-[var(--bg)] z-10"
              style={{ backgroundColor: useTransform(smoothProgress, [0.6, 0.65], ["var(--bg)", "var(--text)"]) }}
            />
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 pt-16">
            <motion.div style={{ opacity: op2, y: y2 }}>
              <h3 className="text-3xl font-semibold text-text tracking-wide mb-4">Approach</h3>
              <p className="text-text-muted leading-relaxed text-lg">
                We listen before we build. Every project begins with mapping what exists, questioning what is assumed, and identifying what actually needs to change. Clarity first — then momentum.
              </p>
            </motion.div>
            <motion.div style={{ opacity: op4, y: y4 }}>
              <h3 className="text-3xl font-semibold text-text tracking-wide mb-4">Today</h3>
              <p className="text-text-muted leading-relaxed text-lg">
                A focused, senior-led studio based in Atlanta. Working with ambitious brands on strategy, product, and growth. No juniors on the work. No diluted output. Just craft, applied with intention.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
