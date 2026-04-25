import type { Metadata } from "next";
import ExpertiseHero from "@/components/expertise/ExpertiseHero";
import ServiceSegment from "@/components/expertise/ServiceSegment";
import { serviceSegments } from "@/lib/data";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "From brand foundations to growth marketing, web development, and content strategy — explore APSLOCK's full range of digital services.",
};

export default function ExpertisePage() {
  return (
    <>
      <ExpertiseHero />

      {/* Service Segments */}
      {serviceSegments.map((segment, index) => (
        <ServiceSegment key={segment.label} segment={segment} index={index} />
      ))}
    </>
  );
}
