import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/expertise/shared/Reveal";
import { FAQ } from "@/components/expertise/shared/FAQ";
import { ToolsMarquee } from "@/components/expertise/shared/ToolsMarquee";
import { MarketsWeShape } from "@/components/expertise/brand-foundations/MarketsWeShape";
import CTA from "@/components/CTA";
import GrainBlobs from "@/components/shared/GrainBlobs";
import { workAreas, brandTools, faqs } from "./data";

export const metadata = {
  title: "Brand Foundations — APSLOCK",
  description:
    "Positioning, identity, voice, and systems that let the rest of the business move. The work that makes every campaign, hire, and launch compound instead of drift.",
};

const brandMarkets = [
  {
    title: "Growth & Consumer Brands",
    items: ["Retail & eCommerce", "Food & Beverage", "Health & Wellness", "Apparel & Fashion", "Home & Lifestyle", "Beauty & Personal Care"],
  },
  {
    title: "Challenger & B2B Brands",
    items: ["SaaS & Software Companies", "Fintech & Financial Services", "Professional Services & Consulting", "Healthcare & MedTech", "Logistics & Operations", "Agencies & Creative Studios"],
  },
  {
    title: "Commerce & Retail Brands",
    items: ["Direct-to-Consumer Brands", "Specialty & Luxury Retail", "Restaurant & Food Commerce", "Subscription & Membership Brands", "Beauty & Wellness Retail", "Fashion & Apparel"],
  },
  {
    title: "Culture & Campaign Brands",
    items: ["eCommerce & Retail", "Hospitality & Travel", "Real Estate & Property", "Automotive & Mobility", "Entertainment & Events", "Local & Regional Businesses"],
  },
  {
    title: "Product & Platform Companies",
    items: ["SaaS & Web Applications", "Fintech & Banking Platforms", "Healthcare Portals & Apps", "Marketplace & Aggregator Platforms", "Enterprise & Internal Tools", "EdTech & Learning Platforms"],
  },
  {
    title: "Lifestyle & Content Brands",
    items: ["eCommerce & Product Brands", "Restaurants & Food Businesses", "Fitness & Wellness Brands", "Real Estate & Hospitality", "Fashion & Apparel", "Local & Service Businesses"],
  },
];

export default function BrandFoundationsPage() {
  return (
    <main className="flex-1 bg-[#F3F1ED] expertise-page">

      {/* ── 01 · HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[94svh] flex items-end overflow-hidden">
        <GrainBlobs variant="sage" intensity={0.14} animate={true} className="absolute inset-0 z-0 pointer-events-none" />
        {/* Soft blend into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F3F1ED] to-transparent pointer-events-none z-0" />
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 sm:pt-36 sm:pb-24">
          <Reveal delay={140} duration={700} distance={16}>
            <Link
              href="/expertise"
              className="group inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-[#6B5A7A] hover:text-[#5A2A6E] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={2.2} />
              Expertise
            </Link>
          </Reveal>

          <Reveal delay={300} duration={900} distance={0}>
            <h1
              className="font-display uppercase mt-10"
              style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, letterSpacing: "0.06em", lineHeight: 1.15, color: "#0D0D0D" }}
            >
              Brand Foundations.
            </h1>
          </Reveal>

          <Reveal delay={440} duration={900} distance={32}>
            <h2 className="text-[2rem] sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold tracking-tight text-[#5A2A6E] leading-[1.04]">
              The work that makes everything after easier.
            </h2>
          </Reveal>

          <Reveal delay={620} duration={800} distance={24}>
            <p className="mt-10 text-base sm:text-lg lg:text-xl text-[#6B5A7A] max-w-2xl leading-[1.7]">
              Positioning, identity, voice, and the systems that let the rest of the business move.
              We build the foundation your growth runs on — so every campaign, hire, product launch,
              and partnership compounds the same signal instead of drifting away from it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 02 · MARKETS WE SHAPE ─────────────────────────────────────── */}
      <MarketsWeShape markets={brandMarkets} />

      {/* ── 03 · THE WORK — dark 3×2 hover grid ──────────────────────── */}
      <section className="border-t border-white/5 bg-[#222222]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-22 pb-0">
          <Reveal delay={120} duration={900} distance={28}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08] max-w-xl font-serif" style={{ color: "#EDE8DE" }}>
              Six disciplines. One foundation.
            </h2>
          </Reveal>
          <Reveal delay={240} duration={800} distance={20}>
            <p className="mt-5 text-base leading-[1.7] max-w-lg" style={{ color: "#6E6E6E" }}>
              Every engagement draws from the same body of practice — each discipline delivered at full depth, not bundled as a line item.
            </p>
          </Reveal>
        </div>

        <Reveal delay={360} duration={900} distance={24}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {workAreas.map((area, i) => {
              const isLastRow = i >= 3;
              const colIdx = i % 3;
              const borderRight = colIdx < 2 ? "lg:border-r border-white/[0.07]" : "";
              const borderBottom = !isLastRow ? "border-b border-white/[0.07]" : "";

              return (
                <div key={area.title} className={`group relative overflow-hidden px-8 py-10 sm:px-10 ${borderRight} ${borderBottom} cursor-default`}>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#C9A84C] tracking-tight leading-tight transition-all duration-500 ease-in-out group-hover:-translate-y-6 group-hover:opacity-0">
                    {area.title}
                  </h3>
                  <p className="absolute inset-x-8 sm:inset-x-10 top-1/2 -translate-y-1/2 text-[15px] sm:text-base leading-[1.75] text-[#A8894A] opacity-0 translate-y-4 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-[-50%]">
                    {area.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* ── 04 · TOOLS WE USE ─────────────────────────────────────────── */}
      <section className="border-t border-[#1A1625]/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8">
          <div className="max-w-2xl">
            <Reveal delay={0} duration={700} distance={16}>
              <span className="font-mono text-[10px] font-bold tracking-[0.22em] uppercase text-[#5A2A6E]">
                Tools of the trade
              </span>
            </Reveal>
            <Reveal delay={120} duration={900} distance={0}>
              <h2
                className="font-display uppercase mt-5"
                style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, letterSpacing: "0.06em", lineHeight: 1.15, color: "#0D0D0D" }}
              >
                The stack behind the foundation.
              </h2>
            </Reveal>
            <Reveal delay={240} duration={800} distance={16}>
              <p className="mt-5 text-base text-[#6B5A7A] leading-[1.7]">
                The platforms we&apos;ve standardized on because they hold up at scale — chosen for durability, not novelty.
              </p>
            </Reveal>
          </div>
        </div>
        <Reveal delay={100} duration={900} distance={16} className="pt-4 pb-20 sm:pb-24">
          <ToolsMarquee tools={brandTools} />
        </Reveal>
      </section>

      {/* ── 05 · FAQ ──────────────────────────────────────────────────── */}
      <section className="border-t border-[#1A1625]/10 bg-[#F3F1ED]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-32">
          <div className="max-w-2xl">
            <Reveal delay={0} duration={700} distance={16}>
              <span className="font-mono text-[10px] font-bold tracking-[0.22em] uppercase text-[#5A2A6E]">
                Questions clients ask
              </span>
            </Reveal>
            <Reveal delay={120} duration={900} distance={0}>
              <h2
                className="font-display uppercase mt-5"
                style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, letterSpacing: "0.06em", lineHeight: 1.15, color: "#0D0D0D" }}
              >
                The ones that come up first.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={240} duration={900} distance={20} className="mt-14 sm:mt-16">
            <FAQ items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* ── 06 · CTA ──────────────────────────────────────────────────── */}
      <CTA />
    </main>
  );
}
