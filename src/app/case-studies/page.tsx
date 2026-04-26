import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/shared/FadeIn";
import CaseGrid from "@/components/case-studies/CaseGrid";
import ProcessSteps from "@/components/case-studies/ProcessSteps";
import SpinningText from "@/components/shared/SpinningText";
import { HighlightText } from "@/components/ui/HighlightText";
import { caseStudies, processSteps } from "@/lib/data";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Explore how APSLOCK has helped brands across eCommerce, retail, healthcare, and nonprofits achieve measurable growth through strategic design and technology.",
};

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden gradient-hero gradient-noise">
        <SpinningText />
        <div className="container-wide">
          <FadeIn>
            <p className="text-eyebrow text-accent mb-4">Case Studies</p>
            <h1 className="text-hero text-text max-w-3xl">
              <HighlightText text="Work that speaks for itself" highlight="speaks" />
            </h1>
            <p className="mt-6 text-lg md:text-xl text-text-muted max-w-2xl leading-relaxed">
              Real projects, real results. We partner with brands to solve complex
              challenges and deliver outcomes that move the needle.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24 md:pb-32">
        <div className="container-wide">
          <CaseGrid studies={caseStudies} />
        </div>
      </section>

      {/* Process */}
      <div className="gradient-section-warm relative gradient-noise overflow-hidden">
        <ProcessSteps steps={processSteps} />
      </div>

      {/* CTA */}
      <section className="py-24 md:py-32 gradient-cta relative gradient-noise overflow-hidden">
        <div className="container-wide text-center">
          <FadeIn>
            <h2 className="text-section-heading text-text mb-6">
              Ready to start your project?
            </h2>
            <p className="text-lg text-text-muted max-w-lg mx-auto mb-10">
              Let&apos;s discuss how we can help your brand grow with strategic design
              and technology.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium bg-accent text-white rounded-full hover:bg-accent-hover transition-colors duration-200 group"
            >
              Start a conversation
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
