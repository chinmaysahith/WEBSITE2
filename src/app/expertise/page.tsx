import type { Metadata } from "next";
import ExpertiseHero from "@/components/expertise/ExpertiseHero";
import ServiceSegment from "@/components/expertise/ServiceSegment";
import GrainBlobs from "@/components/shared/GrainBlobs";
import { serviceSegments } from "@/lib/data";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "From brand foundations to growth marketing, web development, and content strategy — explore APSLOCK's full range of digital services.",
};

export default function ExpertisePage() {
  return (
    <div className="relative overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Sage — calm, professional, capability-focused */}
      <GrainBlobs variant="sage" intensity={0.11} animate={true} />

      <div className="relative z-10">
        <ExpertiseHero />
      </div>

      {/* Service Segments */}
      <div className="relative z-10">
        {serviceSegments.map((segment, index) => (
          <ServiceSegment key={segment.label} segment={segment} index={index} />
        ))}
      </div>
    </div>
  );
}
