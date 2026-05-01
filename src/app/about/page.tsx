import type { Metadata } from "next";
import FadeIn from "@/components/shared/FadeIn";
import ValuesSection from "@/components/about/ValuesSection";
import WorkProcess from "@/components/about/WorkProcess";
import TeamSection from "@/components/about/TeamSection";
import BigCTA from "@/components/shared/BigCTA";
import GrainBlobs from "@/components/shared/GrainBlobs";
import { values, workProcess } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "APSLOCK is a strategic design and technology studio based in Atlanta. Meet the team, learn our values, and see how we work.",
};

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Sage tint — feels natural, grounded for an 'about' page */}
      <GrainBlobs variant="sage" intensity={0.11} animate={true} />

      {/* Hero */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-28 relative z-10">
        <div className="container-wide">
          <FadeIn>
            <p className="text-eyebrow text-accent mb-4">About Us</p>
            <h1 className="text-hero text-text max-w-3xl">
              A studio built on craft and conviction
            </h1>
            <p className="mt-6 text-lg md:text-xl text-text-muted max-w-2xl leading-relaxed">
              APSLOCK started with a belief: the best digital work happens when
              strategy, design, and engineering sit at the same table. We&apos;re a
              small, senior team that partners deeply with the brands we believe in.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <div className="relative z-10"><ValuesSection values={values} /></div>

      {/* Work Process */}
      <div className="relative z-10"><WorkProcess process={workProcess} /></div>

      {/* Team */}
      <div className="relative z-10"><TeamSection /></div>

      {/* CTA */}
      <div className="relative z-10"><BigCTA /></div>
    </div>
  );
}
