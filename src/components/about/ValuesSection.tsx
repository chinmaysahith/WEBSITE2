import {
  Focus,
  Gem,
  TrendingUp,
  Handshake,
  type LucideIcon,
} from "lucide-react";
import FadeIn from "@/components/shared/FadeIn";
import { HighlightText } from "@/components/ui/HighlightText";
import type { Value } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  Focus,
  Gem,
  TrendingUp,
  Handshake,
};

interface ValuesSectionProps {
  values: Value[];
}

export default function ValuesSection({ values }: ValuesSectionProps) {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container-wide">
        <FadeIn>
          <p className="text-eyebrow mb-4">Our Values</p>
          <h2 className="text-section-heading text-text max-w-2xl mb-16">
            <HighlightText text="What drives everything we do" highlight={["drives", "everything"]} />
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {values.map((value, index) => {
            const Icon = iconMap[value.icon];
            return (
              <FadeIn key={value.title} delay={index * 0.1}>
                <div className="flex gap-6">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-accent/5 text-accent shrink-0">
                    {Icon && <Icon size={24} strokeWidth={1.5} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-text mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
