import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { caseStudies } from "@/lib/data";
import FadeIn from "@/components/shared/FadeIn";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = caseStudies.find((c) => c.slug === slug);
  if (!caseStudy) return {};

  return {
    title: `${caseStudy.title} | ${caseStudy.client}`,
    description: caseStudy.description,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.description,
      images: [
        {
          url: caseStudy.image.src,
          width: caseStudy.image.width,
          height: caseStudy.image.height,
          alt: caseStudy.image.alt,
        },
      ],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((c) => c.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <article>
        {/* Hero Section */}
        <header className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-[85vh] flex flex-col justify-end">
          <div className="absolute inset-0">
            <Image
              src={caseStudy.image.src}
              alt={caseStudy.image.alt}
              fill
              className="object-cover"
              priority
            />
            {/* Dark gradient overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/20" />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="container-wide relative z-10 mt-auto">
            <FadeIn>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors duration-200 mb-10 group"
              >
                <ArrowLeft
                  size={16}
                  className="group-hover:-translate-x-1 transition-transform duration-200"
                />
                All case studies
              </Link>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
              <div className="lg:col-span-8">
                <FadeIn delay={0.1}>
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="text-xs font-medium px-3.5 py-1.5 bg-accent/10 text-text rounded-full backdrop-blur-md border border-border/50 uppercase tracking-widest">
                      {caseStudy.category}
                    </span>
                    <span className="text-sm font-semibold tracking-wider text-text uppercase">
                      Client: {caseStudy.client}
                    </span>
                  </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-text leading-[1.05] tracking-tight font-display uppercase">
                    {caseStudy.title}
                  </h1>
                </FadeIn>
              </div>

              <div className="lg:col-span-4">
                <FadeIn delay={0.3}>
                  <p className="text-lg md:text-xl text-text-muted leading-relaxed">
                    {caseStudy.description}
                  </p>
                </FadeIn>
              </div>
            </div>
          </div>
        </header>

        {/* Metrics Section */}
        <section className="py-20 md:py-32 bg-bg border-t border-border/40 relative">
          <div className="absolute inset-0 gradient-noise pointer-events-none opacity-20" />
          <div className="container-wide relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {caseStudy.metrics.map((metric, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="p-8 rounded-2xl bg-surface/50 border border-border/40 backdrop-blur-sm">
                    <p className="text-5xl md:text-6xl font-bold text-text font-display mb-3 tracking-tighter">
                      {metric.value}
                    </p>
                    <p className="text-sm text-text-muted font-mono uppercase tracking-widest">
                      {metric.label}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Content Placeholder */}
        <section className="py-32 bg-bg text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/[0.02] blur-3xl" />
          <FadeIn>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-border/50 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            </div>
            <h2 className="text-3xl font-display uppercase tracking-tight text-text mb-4">
              Full Case Study Coming Soon
            </h2>
            <p className="text-lg text-text-muted max-w-md mx-auto">
              We are currently putting together the final details, wireframes, and outcomes for this project.
            </p>
          </FadeIn>
        </section>
      </article>
    </>
  );
}
