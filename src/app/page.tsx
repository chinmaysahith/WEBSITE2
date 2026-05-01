import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import CaseReel from "@/components/home/CaseReel";
import AnimatedCapabilities from "@/components/home/AnimatedCapabilities";
import BlogPreview from "@/components/home/BlogPreview";
import GrainBlobs from "@/components/shared/GrainBlobs";
import { heroContent, capabilities, blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "APSLOCK — Digital Agency | Web, Brand & Growth",
  description:
    "APSLOCK is a modern digital agency crafting web experiences, brand identities, and growth strategies that drive measurable results.",
};

export default function HomePage() {
  return (
    <div className="relative overflow-clip" style={{ background: "var(--bg)" }}>
      <GrainBlobs variant="amber" intensity={0.12} animate={true} />
      
      <div className="relative z-10">
        <Hero content={heroContent} />
        <CaseReel />
        <AnimatedCapabilities items={capabilities} />
        <BlogPreview posts={blogPosts} />
      </div>
    </div>
  );
}
