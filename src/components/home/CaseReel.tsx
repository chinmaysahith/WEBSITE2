"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { featuredCases } from "@/lib/data";

/**
 * CaseReel — Nakula-style stacked card reveal
 *
 * Scroll down → current image slides UP and fades, next image slides UP from below.
 * Left side: big numeral (01, 02, 03) + title + subtitle, all synced to active card.
 *
 * Key fixes from prior version:
 *   • Card stage has overflow-hidden — exits no longer visible outside frame
 *   • Card enter/exit uses full viewport travel (100%) with eased timing
 *   • Numeral/text/card all share a single direction + key so they animate together
 *   • Side nav click jumps to that card's scroll section
 */
export default function CaseReel() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isDesktop, setIsDesktop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateDesktop = () => setIsDesktop(desktopQuery.matches);
    const updateMotion = () => setPrefersReducedMotion(motionQuery.matches);

    updateDesktop();
    updateMotion();
    desktopQuery.addEventListener("change", updateDesktop);
    motionQuery.addEventListener("change", updateMotion);
    return () => {
      desktopQuery.removeEventListener("change", updateDesktop);
      motionQuery.removeEventListener("change", updateMotion);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ["start start", "end end"],
  });

  const useStackedLayout = !isDesktop || !mounted || prefersReducedMotion;

  // Map scroll progress → active index. Each card owns 1/total of the range.
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const total = featuredCases.length;
    const clamped = Math.min(Math.max(progress, 0), 0.9999);
    const next = Math.floor(clamped * total);
    setActiveIndex((prev) => {
      if (next === prev) return prev;
      setDirection(next > prev ? 1 : -1);
      return next;
    });
  });

  const getSubtitle = (c: (typeof featuredCases)[number]) =>
    c.subtitle ?? c.description;

  // ── Mobile / reduced-motion fallback ───────────────────────────
  if (useStackedLayout) {
    return (
      <section
        aria-label="Featured work"
        className="border-t border-[var(--border)] bg-[var(--bg)]"
      >
        {featuredCases.map((c) => (
          <article
            key={c.slug}
            className="mx-auto max-w-6xl px-6 py-24 sm:px-8"
          >
            <div className="mb-6 font-numeral text-7xl font-normal tracking-tight text-[var(--text)]/25">
              {c.index}
            </div>
            <h3 className="mb-3 font-display text-3xl font-normal tracking-tight text-[var(--text)] sm:text-4xl">
              {c.title}
            </h3>
            <p className="mb-8 max-w-md font-sans text-base text-[var(--text-muted)]">
              {getSubtitle(c)}
            </p>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[var(--surface)] shadow-2xl shadow-black/20">
              <Image
                src={c.image.src}
                alt={c.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <Link
              href={`/case-studies/${c.slug}`}
              className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-medium text-[var(--text)] underline underline-offset-4"
            >
              View case study →
            </Link>
          </article>
        ))}
      </section>
    );
  }

  // ── Desktop pinned reel ────────────────────────────────────────
  const active = featuredCases[activeIndex];
  const easeOut = [0.22, 1, 0.36, 1] as const;

  const DURATION = 0.75;

  // Numeral: vertical odometer roll — direction-aware
  const numeralVariants = {
    enter: (dir: number) => ({
      y: dir > 0 ? "40%" : "-40%",
      opacity: 0,
      filter: "blur(8px)",
    }),
    center: { y: "0%", opacity: 1, filter: "blur(0px)" },
    exit: (dir: number) => ({
      y: dir > 0 ? "-40%" : "40%",
      opacity: 0,
      filter: "blur(8px)",
    }),
  };

  // Card: slides fully in from below, fully out above (scroll-down case)
  const cardVariants = {
    enter: (dir: number) => ({
      y: dir > 0 ? "100%" : "-100%",
    }),
    center: { y: "0%" },
    exit: (dir: number) => ({
      y: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  // Text: subtle fade + lift
  const textVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? 12 : -12,
      filter: "blur(8px)",
    }),
    center: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? -12 : 12,
      filter: "blur(8px)",
    }),
  };

  // Side nav click: scroll to that card's section
  const handleNavClick = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const total = featuredCases.length;
    const sectionHeight = rect.height / total;
    const targetY = window.scrollY + rect.top + sectionHeight * i;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      aria-label="Featured work"
      className="relative border-t border-[var(--border)] bg-[var(--bg)]"
      style={{ height: `${featuredCases.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] items-center gap-12 px-8 xl:gap-20 xl:px-12 relative z-10">
          {/* LEFT: numeral + text + side nav */}
          <div className="relative">
            {/* Oversized numeral */}
            <div
              className="relative mb-12 h-[11rem] overflow-hidden xl:h-[13rem]"
              aria-hidden="true"
            >
              <AnimatePresence
                mode="popLayout"
                custom={direction}
                initial={false}
              >
                <motion.div
                  key={`num-${activeIndex}`}
                  custom={direction}
                  variants={numeralVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: DURATION, ease: easeOut }}
                  className="absolute inset-0 font-display text-[11rem] font-normal leading-[1] tracking-tight text-[var(--text)]/25 xl:text-[13rem]"
                >
                  {active.index}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Title + subtitle + link */}
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              <motion.div
                key={`text-${activeIndex}`}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
                transition={{ duration: DURATION, ease: easeOut }}
              >
                <h3 className="mb-5 font-display text-5xl font-normal leading-[1.05] tracking-tight text-[var(--text)] xl:text-6xl">
                  {active.title}
                </h3>
                <p className="mb-10 max-w-sm font-sans text-lg leading-snug text-[var(--text-muted)]">
                  {getSubtitle(active)}
                </p>
                <Link
                  href={`/case-studies/${active.slug}`}
                  className="inline-flex items-center gap-2 font-sans text-sm font-medium text-[var(--text)] underline underline-offset-[6px] decoration-[var(--text)]/30 transition-colors hover:decoration-[var(--text)]"
                >
                  View case study →
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Side nav */}
            <nav
              aria-label="Featured cases"
              className="mt-20 flex flex-col gap-3"
            >
              {featuredCases.map((c, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => handleNavClick(i)}
                    className="group flex items-center gap-4 text-left"
                  >
                    <span
                      className={`h-px transition-all duration-500 ${isActive
                        ? "w-16 bg-[var(--accent)]"
                        : "w-8 bg-[var(--border)]"
                        }`}
                    />
                    <span
                      className={`font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${isActive
                        ? "text-[var(--text)]"
                        : "text-[var(--text-muted)]"
                        }`}
                    >
                      {c.title}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* RIGHT: image stage */}
          <div className="relative" style={{ perspective: "1200px" }}>
            {/* Atmospheric radial gradient behind card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-24 -z-10"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 45%, color-mix(in oklab, var(--accent) 12%, transparent) 0%, color-mix(in oklab, var(--text) 6%, transparent) 35%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />

            {/* STAGE: overflow-hidden clips the sliding cards to frame */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <AnimatePresence custom={direction} initial={false}>
                <motion.div
                  key={`card-${activeIndex}`}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: DURATION,
                    ease: easeOut,
                  }}
                  className="absolute inset-0 overflow-hidden rounded-xl bg-[var(--surface)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] will-change-transform"
                >
                  <Image
                    src={active.image.src}
                    alt={active.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                    priority={activeIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}