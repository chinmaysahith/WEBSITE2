import FadeIn from "@/components/shared/FadeIn";
import type { WorkProcessItem } from "@/lib/data";

interface WorkProcessProps {
  process: WorkProcessItem[];
}

export default function WorkProcess({ process }: WorkProcessProps) {
  return (
    <section className="py-24 md:py-32 gradient-section-cool relative gradient-noise overflow-hidden">
      <div className="container-wide">
        <FadeIn>
          <p className="text-eyebrow mb-4">How We Work</p>
          <h2 className="text-section-heading text-text max-w-xl mb-16">
            A process built for partnership
          </h2>
        </FadeIn>

        <div className="space-y-0">
          {process.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.1}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 py-10 border-b border-border last:border-0">
                {/* Phase Label */}
                <div className="lg:col-span-2">
                  <p className="text-xs font-medium uppercase tracking-widest text-accent">
                    {item.phase}
                  </p>
                </div>

                {/* Title & Description */}
                <div className="lg:col-span-4">
                  <h3 className="text-2xl font-display text-text mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Deliverables */}
                <div className="lg:col-span-6">
                  <div className="flex flex-wrap gap-3">
                    {item.deliverables.map((d) => (
                      <span
                        key={d}
                        className="px-4 py-2 text-sm bg-bg border border-border-light rounded-full text-text-muted"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
