"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";
import Link from "next/link";

const skills = [
  "Web Development",
  "App Development",
  "UI/UX Design",
  "AI Applications",
  "Digital Marketing & SEO",
  "Brand Strategy",
  "Cloud & DevOps",
  "Logo Designing",
  "Prototyping & MVPs",
  "API Integrations",
];

const items = [...skills, ...skills, ...skills];

export default function BigCTA() {
  const marqueeARef = useRef<HTMLDivElement>(null);
  const marqueeBRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tweens: gsap.core.Tween[] = [];

    [marqueeARef.current, marqueeBRef.current].forEach((el) => {
      if (!el) return;
      tweens.push(
        gsap.fromTo(
          el,
          { xPercent: -66.666 },
          { xPercent: -33.333, duration: 40, ease: "none", repeat: -1 }
        )
      );
    });

    tweens.push(
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      )
    );

    tweens.push(
      gsap.fromTo(
        btnRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: btnRef.current, start: "top 90%" },
        }
      )
    );

    return () => {
      tweens.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);


  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6">
      <div
        className="max-w-7xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden"
        style={{ background: "#080808" }}
      >

        {/* Top CTA */}
        <div className="flex flex-col items-center justify-center py-16 sm:py-24 px-5 sm:px-8 text-center">
          <h2
            ref={headingRef}
            className="text-3xl md:text-5xl font-bold max-w-3xl leading-tight mb-12 opacity-0 font-display"
            style={{ color: "#F1F5F9" }}
          >
            You&apos;ve reached the <span className="font-accent" style={{ color: "#93c5fd" }}>end</span> —{" "}
            <span style={{ color: "#94A3B8" }}>
              now let&apos;s start something <span className="font-accent" style={{ color: "#e2e8f0" }}>new!</span>
            </span>
          </h2>

          <Link href="/contact">
        <button
            ref={btnRef}
            className="heartbeat opacity-0 flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-sm cursor-pointer"
            style={{ background: "#FFFFFF", color: "#080808" }}
            onMouseEnter={(e) =>
            gsap.to(e.currentTarget, { scale: 1.06, duration: 0.3, ease: "power2.out" })
            }
            onMouseLeave={(e) =>
            gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" })
            }
        >
            <Sparkles size={15} />
            Let&apos;s Connect
        </button>
        </Link>
        </div>

        {/* MARQUEE STRIP */}
        <div
          style={{
            background: "#0D0D0D",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p
            className="text-center text-sm pt-8 pb-6 font-medium"
            style={{ color: "#475569" }}
          >
            Trust us, we are good at this :)
          </p>

          {/* Track */}
          <div
            className="relative overflow-hidden pb-10"
            style={{ height: 90 }}
          >

            {/* LEFT HALF — hollow */}
            <div
              className="absolute inset-0"
              style={{ clipPath: "inset(0 50% 0 0)", zIndex: 1 }}
            >
              <div
                ref={marqueeARef}
                className="flex gap-4 w-max absolute top-0 left-0 items-center h-full"
              >
                {items.map((skill, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full flex-shrink-0 text-sm font-medium"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#64748B",
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full border flex-shrink-0"
                      style={{ borderColor: "#334155" }}
                    />
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT HALF — checked */}
            <div
              className="absolute inset-0"
              style={{ clipPath: "inset(0 0 0 50%)", zIndex: 1 }}
            >
              <div
                ref={marqueeBRef}
                className="flex gap-4 w-max absolute top-0 left-0 items-center h-full"
              >
                {items.map((skill, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full flex-shrink-0 text-sm font-medium"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "#ffffff",
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="flex-shrink-0"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* ── CONCAVE LENS — opposite open brackets ── */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: 250,
                height: 60,
                background:
                  'radial-gradient(15px 40px at 0% 50%, transparent 99%, #0D0D0D 100%) left / 51% 100% no-repeat,' +
                  'radial-gradient(15px 40px at 100% 50%, transparent 99%, #0D0D0D 100%) right / 51% 100% no-repeat',
                zIndex: 20,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Left concave arc border */}
              <div
                style={{
                  content: '""',
                  position: 'absolute',
                  top: -10,
                  bottom: -10,
                  left: -15,
                  width: 30,
                  borderRight: '1.5px solid rgba(255, 255, 255, 0.95)',
                  borderRadius: '50%',
                  filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.6))',
                  boxShadow: '10px 0 20px -5px rgba(255, 255, 255, 0.05)',
                  zIndex: 21,
                }}
              />
              {/* Right concave arc border */}
              <div
                style={{
                  content: '""',
                  position: 'absolute',
                  top: -10,
                  bottom: -10,
                  right: -15,
                  width: 30,
                  borderLeft: '1.5px solid rgba(255, 255, 255, 0.95)',
                  borderRadius: '50%',
                  filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.6))',
                  boxShadow: '-10px 0 20px -5px rgba(255, 255, 255, 0.05)',
                  zIndex: 21,
                }}
              />
              {/* Center text */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <span
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 500,
                    color: 'rgba(255, 255, 255, 1)',
                    letterSpacing: '0.5px',
                    textShadow: '0 0 8px rgba(255, 255, 255, 0.3)',
                  }}
                >
                  APSLOCK
                </span>
                <span
                  style={{
                    fontSize: 7,
                    fontWeight: 500,
                    letterSpacing: 3,
                    color: 'rgba(255,255,255,0.25)',
                    fontFamily: 'inherit',
                  }}
                >
                  DIGITAL AGENCY
                </span>
              </div>
            </div>

            {/* Edge fades */}
            <div
              className="absolute inset-y-0 left-0 w-12 sm:w-28 md:w-40 pointer-events-none"
              style={{
                background: "linear-gradient(to right, #0D0D0D, transparent)",
                zIndex: 5,
              }}
            />
            <div
              className="absolute inset-y-0 right-0 w-12 sm:w-28 md:w-40 pointer-events-none"
              style={{
                background: "linear-gradient(to left, #0D0D0D, transparent)",
                zIndex: 5,
              }}
            />

          </div>
        </div>

      </div>
    </section>
  );
}
