"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import type { Capability } from "@/lib/data"
import FadeIn from "@/components/shared/FadeIn"

interface AnimatedCapabilitiesProps {
  items: Capability[]
}

const capabilityImages = [
  "/capabilities/digital-platforms.png",
  "/capabilities/product-app.png",
  "/capabilities/ai-solutions.png",
  "/capabilities/growth-marketing.png",
  "/capabilities/search-visibility.png",
  "/capabilities/brand-identity.png",
]

const timelines = [
  "2 – 4 weeks",
  "4 – 8 weeks",
  "3 – 6 weeks",
  "2 – 4 weeks",
  "1 – 3 weeks",
  "2 – 5 weeks",
]

function pad(n: number) {
  return String(n + 1)
}

// ─────────────────────────────────────────────────────────
// STAGE TRANSITION CONFIG
// Current card: y 0% → -100% (exits UP)
// Next card:    y 100% → 0%  (enters from BOTTOM)
// Both animate simultaneously via AnimatePresence mode="sync"
// ─────────────────────────────────────────────────────────
const CARD_H = 460
const STAGE_TRANSITION = {
  duration: 0.85,
  ease: [0.4, 0, 0.2, 1],
} as const

const cardVariants = {
  initial: (direction: number) => ({
    y: direction === 1 ? "100%" : "-100%",
  }),
  animate: {
    y: "0%",
  },
  exit: (direction: number) => ({
    y: direction === 1 ? "-100%" : "100%",
  }),
}

const imageVariants = {
  initial: (direction: number) => ({
    y: direction === 1 ? "-100%" : "100%",
  }),
  animate: {
    y: "0%",
  },
  exit: (direction: number) => ({
    y: direction === 1 ? "100%" : "-100%",
  }),
}

// ─────────────────────────────────────────────────────────

export default function AnimatedCapabilities({ items }: AnimatedCapabilitiesProps) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [direction, setDirection] = React.useState(1)
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    }
  }, [])

  function handleSelect(index: number) {
    if (index === activeIndex) return
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  function onHover(index: number) {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(() => {
      handleSelect(index)
    }, 120) // 120ms debounce prevents rapid-fire glitches on fast sweeping
  }

  function onClick(index: number) {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    handleSelect(index)
  }

  return (
    <section
      className="py-16 lg:py-20 relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* ── Header ────────────────────────────────────────── */}
      <div className="px-6 md:px-10 lg:px-16 mb-12 lg:mb-16">
        <FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-section-heading text-text max-w-xl">
              Building Blocks of Digital Growth
            </h2>
            <p className="text-base text-text-muted leading-relaxed max-w-sm lg:text-right">
              The core capabilities we bring together to design, build,
              and scale high‑performing digital experiences.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* ── Mobile ────────────────────────────────────────── */}
      <div className="px-6 md:px-10 flex flex-col gap-5 lg:hidden">
        {items.map((item, index) => (
          <FadeIn key={item.title} delay={index * 0.05}>
            <div className="flex gap-4">
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--border)",
                  fontWeight: 300,
                  paddingTop: 3,
                  flexShrink: 0,
                }}
              >
                {pad(index)}.
              </span>
              <div>
                <p className="font-display font-bold text-sm uppercase tracking-tight mb-1 text-text">
                  {item.title}
                </p>
                <p className="text-sm leading-relaxed text-text-muted">
                  {item.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* ── Desktop: 3 columns, right bleeds to edge ──────── */}
      {/*
        Only left padding — no right padding — image bleeds to viewport.
        Columns: 28% list | 35% stage viewport | 1fr image
      */}
      <div
        className="hidden lg:grid px-6 md:px-10 lg:px-16"
        style={{
          gridTemplateColumns: "28% 35% 1fr",
          columnGap: "2.5rem",
          alignItems: "start",
        }}
      >

        {/* ══════════════════════════════════════════════════
            COLUMN 1 — Clickable service list
            Dark card on active, plain text on inactive.
            No dividers. Weight contrast: number light, label bold.
        ══════════════════════════════════════════════════ */}
        <div
          className="flex flex-col"
          style={{ height: "100%" }}
        >
          {items.map((item, index) => {
            const isActive = activeIndex === index
            return (
              <button
                key={item.title}
                type="button"
                className="w-full text-left focus:outline-none flex-1 flex flex-col justify-center"
                style={{ transition: "all 0.2s ease" }}
                onMouseEnter={() => onHover(index)}
                onClick={() => onClick(index)}
              >
                {isActive ? (
                  /* Active — dark lifted tile */
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.75rem 1rem",
                      background: "var(--text)",
                      borderRadius: 12,
                      boxShadow:
                        "0 6px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.07)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.9rem",
                        color: "rgba(255,255,255,0.4)",
                        fontWeight: 300,
                        flexShrink: 0,
                        width: "1.4rem",
                      }}
                    >
                      {pad(index)}.
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "-0.01em",
                        color: "#ffffff",
                        lineHeight: 1.3,
                      }}
                    >
                      {item.title}
                    </span>
                  </div>
                ) : (
                  /* Inactive — plain row */
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.75rem 1rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.9rem",
                        color: "var(--border)",
                        fontWeight: 300,
                        flexShrink: 0,
                        width: "1.4rem",
                      }}
                    >
                      {pad(index)}.
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.15rem",
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "-0.01em",
                        color: "var(--text-muted)",
                        lineHeight: 1.3,
                      }}
                    >
                      {item.title}
                    </span>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* ══════════════════════════════════════════════════
            COLUMN 2 — Stage viewport (CENTER)

            Rules:
            - Fixed height, overflow hidden
            - Cards absolutely positioned inside
            - ONLY 2 cards ever in DOM during transition
              (AnimatePresence mode="sync"):
                • Current exits:  y 0% → -100%
                • Next enters:    y 100% → 0%
            - At rest: exactly 1 card in DOM
        ══════════════════════════════════════════════════ */}
        <div
          style={{
            position: "relative",
            height: CARD_H,
            overflow: "hidden",
            /* The static viewport has NO border or background now */
          }}
        >
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={STAGE_TRANSITION}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: 32,
                /* The moving card ITSELF has the border and background */
                border: "1px solid var(--border)",
                borderRadius: 24,
                background: "var(--surface)",
              }}
            >
              {/* Title & Description — floats at top */}
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    color: "var(--text)",
                    marginBottom: "1rem",
                  }}
                >
                  {items[activeIndex].title}
                </h3>
                <p
                  style={{
                    fontSize: "1.125rem",
                    lineHeight: 1.75,
                    color: "var(--text-muted)",
                    maxWidth: 400,
                  }}
                >
                  {items[activeIndex].description}
                </p>
              </div>

              {/* Timeline — pinned to bottom with dashed separator */}
              <div>
                <div
                  style={{
                    borderTop: "1.5px dashed var(--border)",
                    marginBottom: "1rem",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                    Timeline
                  </span>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {timelines[activeIndex % timelines.length]}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ══════════════════════════════════════════════════
            COLUMN 3 — Image stage viewport
            The moving card itself has the rounded corners.
        ══════════════════════════════════════════════════ */}
        <div
          style={{
            position: "relative",
            height: CARD_H,
            overflow: "hidden",
            /* NO border radius here — the moving card has it */
          }}
        >
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 24,
                overflow: "hidden",
              }}
            >
              <Image
                src={capabilityImages[activeIndex % capabilityImages.length]}
                alt={items[activeIndex].title}
                fill
                sizes="(max-width: 1280px) 35vw, 500px"
                className="object-cover"
                priority={activeIndex === 0}
              />
              
              {/* Bottom gradient overlay — moves WITH the image */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 45%)",
                  pointerEvents: "none",
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
