import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/shared/FadeIn";
import { HighlightText } from "@/components/ui/HighlightText";
import type { HeroContent } from "@/lib/data";

interface HeroProps {
  content: HeroContent;
}

export default function Hero({ content }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="container-wide w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <FadeIn>
              <p className="text-eyebrow text-accent mb-6">APSLOCK</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-hero text-text">
                <HighlightText text={content.headline} highlight="build" />
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg md:text-xl text-text-muted leading-relaxed max-w-xl">
                {content.subline}
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  href={content.primaryCta.href}
                  className="inline-flex items-center px-8 py-4 text-base font-medium bg-accent text-white rounded-full hover:bg-accent-hover transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  {content.primaryCta.label}
                </Link>
                <Link
                  href={content.secondaryCta.href}
                  className="inline-flex items-center px-8 py-4 text-base font-medium text-text border border-border rounded-full hover:border-text transition-all duration-200"
                >
                  {content.secondaryCta.label}
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Hero Image */}
          <FadeIn delay={0.2} direction="left" className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-border-light">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                width={content.image.width}
                height={content.image.height}
                className="object-cover w-full h-full"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
