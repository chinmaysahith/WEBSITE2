import {
  Monitor,
  Search,
  Palette,
  Megaphone,
  PenTool,
  type LucideIcon,
} from "lucide-react";
import FadeIn from "@/components/shared/FadeIn";
import type { Capability } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  Monitor,
  Search,
  Palette,
  Megaphone,
  PenTool,
};

interface CapabilitiesProps {
  items: Capability[];
}

export default function Capabilities({ items }: CapabilitiesProps) {
  return (
    <section className="pb-24 md:pb-32 lg:pb-40 bg-surface">
      <div className="container-wide">
        <FadeIn>
          <p className="text-eyebrow mb-4">What We Do</p>
          <h2 className="text-section-heading text-text max-w-2xl">
            Capabilities built for growth
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <FadeIn key={item.title} delay={index * 0.08}>
                <article className="group p-8 rounded-2xl border border-border-light hover:border-border transition-all duration-300">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-bg text-text mb-6">
                    {Icon && <Icon size={24} strokeWidth={1.5} />}
                  </div>
                  <h3 className="text-xl font-semibold text-text mb-3 group-hover:text-accent transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
