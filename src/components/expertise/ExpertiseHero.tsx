"use client";

import { motion, type Variants } from "framer-motion";
import { HighlightText } from "@/components/ui/HighlightText";

export default function ExpertiseHero() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 overflow-hidden border-b border-border gradient-hero gradient-noise">
      {/* Soft background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-accent/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      
      <div className="container-wide">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          <motion.div variants={item} className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-accent/50" />
            <p className="text-eyebrow text-accent !mb-0">Our Expertise</p>
          </motion.div>
          
          <motion.h1 variants={item} className="text-hero text-text mb-8 tracking-tight">
            <HighlightText text="Full-spectrum digital capability" highlight="digital" />
          </motion.h1>
          
          <motion.p variants={item} className="font-sans text-xl md:text-2xl text-text-muted max-w-2xl leading-relaxed">
            We bring together strategy, design, engineering, and marketing under
            one roof — so every touchpoint works together toward measurable growth.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
