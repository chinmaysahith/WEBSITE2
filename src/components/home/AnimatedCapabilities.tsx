"use client"

import {
  HoverSlider,
  TextStaggerHover,
  HoverSliderImageWrap,
  HoverSliderImage,
} from "@/components/ui/animated-slideshow"
import type { Capability } from "@/lib/data"
import FadeIn from "@/components/shared/FadeIn"

interface AnimatedCapabilitiesProps {
  items: Capability[]
}

const aestheticPics = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000"
]

export default function AnimatedCapabilities({ items }: AnimatedCapabilitiesProps) {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        <FadeIn>
          <div className="mb-10 lg:mb-16">
            <p className="text-eyebrow mb-2">What We Do</p>
            <h2 className="text-section-heading text-text max-w-2xl">
              Capabilities built for growth
            </h2>
          </div>
        </FadeIn>

        {/* ── Mobile: 2-col image card grid ──────────────────────── */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
          {items.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.06}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-border-light">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={aestheticPics[index % aestheticPics.length]}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <p className="text-white font-display font-semibold text-[0.65rem] sm:text-xs leading-tight uppercase tracking-wider">
                    {item.title}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* ── Desktop: hover slideshow ────────────────────────────── */}
        <HoverSlider className="hidden lg:flex flex-row w-full gap-16 items-stretch">
          {/* Left: stagger-hover text list */}
          <div className="flex flex-col gap-6 w-[55%] justify-center py-4">
            {items.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.1}>
                <div className="text-4xl font-display font-medium tracking-tight text-text leading-tight">
                  <TextStaggerHover text={item.title.toUpperCase()} index={index} />
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Right: image stage */}
          <div className="w-[45%] relative">
            <FadeIn delay={0.2} className="absolute inset-0 w-full h-full">
              <HoverSliderImageWrap className="rounded-3xl shadow-xl overflow-hidden size-full border border-border">
                {items.map((item, index) => (
                  <HoverSliderImage
                    key={item.title}
                    index={index}
                    imageUrl={aestheticPics[index % aestheticPics.length]}
                    className="object-cover size-full"
                    alt={item.title}
                  />
                ))}
              </HoverSliderImageWrap>
            </FadeIn>
          </div>
        </HoverSlider>
      </div>
    </section>
  )
}
