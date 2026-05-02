"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { clipPathVariants } from "@/components/ui/animated-slideshow"
import type { Capability } from "@/lib/data"
import FadeIn from "@/components/shared/FadeIn"

interface AnimatedCapabilitiesProps {
  items: Capability[]
}

// One focused image per capability — rich, editorial photography
const capabilityImages = [
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1200", // digital/laptop
  "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80&w=1200", // mobile app
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200", // AI/circuit
  "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=1200", // growth/marketing
  "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&q=80&w=1200", // search/seo
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200", // brand/design
]

function pad(n: number) {
  return String(n + 1).padStart(2, "0")
}

// Self-contained image slide with clip-path animation — no external context needed
function CapabilityImage({
  imageUrl,
  alt,
  isActive,
}: {
  imageUrl: string
  alt: string
  isActive: boolean
}) {
  return (
    <motion.img
      src={imageUrl}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover"
      variants={clipPathVariants}
      animate={isActive ? "visible" : "hidden"}
      transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.75 }}
    />
  )
}

export default function AnimatedCapabilities({ items }: AnimatedCapabilitiesProps) {
  const [activeIndex, setActiveIndex] = React.useState(0)

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">

        {/* ── Section header ─────────────────────────────────── */}
        <FadeIn>
          <div className="mb-14 lg:mb-20 max-w-2xl">
            <h2 className="text-section-heading text-text mb-5">
              Building Blocks of Digital Growth
            </h2>
            <p className="text-lg text-text-muted leading-relaxed">
              The core capabilities we bring together to design, build, and scale
              high‑performing digital experiences.
            </p>
          </div>
        </FadeIn>

        {/* ── Mobile: stacked list ─────────────────────────── */}
        <div className="flex flex-col divide-y divide-border lg:hidden">
          {items.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.05}>
              <div className="py-6">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-xs text-text-muted pt-[3px] shrink-0 w-6">
                    {pad(index)}
                  </span>
                  <div>
                    <p className="font-display font-semibold text-base uppercase tracking-tight text-text leading-snug mb-2">
                      {item.title}
                    </p>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* ── Desktop: accordion + sticky image ───────────── */}
        <div className="hidden lg:grid grid-cols-[1fr_420px] xl:grid-cols-[1fr_500px] gap-16 items-start">

          {/* Left: accordion rows */}
          <div className="flex flex-col divide-y divide-border/60">
            {items.map((item, index) => {
              const isActive = activeIndex === index
              return (
                <FadeIn key={item.title} delay={index * 0.07}>
                  <button
                    type="button"
                    className="w-full text-left group py-7 focus:outline-none"
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    aria-expanded={isActive}
                  >
                    <div className="flex items-center justify-between gap-6">
                      {/* Index + Title */}
                      <div className="flex items-baseline gap-5 flex-1 min-w-0">
                        <span
                          className="font-mono text-xs shrink-0 transition-colors duration-300"
                          style={{ color: isActive ? "var(--accent)" : "rgba(var(--text-muted-rgb, 120,113,108), 0.4)" }}
                        >
                          {pad(index)}
                        </span>
                        <span
                          className="font-display font-medium text-2xl xl:text-3xl uppercase tracking-tight leading-tight transition-colors duration-300"
                          style={{ color: isActive ? "var(--text)" : "rgba(var(--text-muted-rgb, 120,113,108), 0.45)" }}
                        >
                          {item.title}
                        </span>
                      </div>

                      {/* + / × indicator */}
                      <motion.span
                        className="text-2xl leading-none shrink-0 transition-colors duration-300"
                        style={{ color: isActive ? "var(--text)" : "rgba(var(--text-muted-rgb, 120,113,108), 0.3)" }}
                        animate={{ rotate: isActive ? 45 : 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                      >
                        +
                      </motion.span>
                    </div>

                    {/* Expandable description */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key="desc"
                          initial={{ height: 0, opacity: 0, y: -4 }}
                          animate={{ height: "auto", opacity: 1, y: 0 }}
                          exit={{ height: 0, opacity: 0, y: -4 }}
                          transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 pb-1 ml-[2.75rem] text-base text-text-muted leading-relaxed max-w-lg">
                            {item.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </FadeIn>
              )
            })}
          </div>

          {/* Right: sticky image panel */}
          <FadeIn delay={0.18} className="sticky top-28 self-start">
            <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl aspect-[4/5]">
              {items.map((item, index) => (
                <CapabilityImage
                  key={item.title}
                  imageUrl={capabilityImages[index % capabilityImages.length]}
                  alt={item.title}
                  isActive={activeIndex === index}
                />
              ))}
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
