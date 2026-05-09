import type { Metadata } from "next";
import FadeIn from "@/components/shared/FadeIn";
import BlogFilter from "@/components/blog/BlogFilter";
import GrainBlobs from "@/components/shared/GrainBlobs";
import { blogPosts as fallbackPosts, blogCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog — Strategy, Design & Growth Insights",
  description:
    "Expert insights on brand strategy, web design, SEO, performance marketing, and digital growth from the APSLOCK team in Atlanta.",
  alternates: {
    canonical: "https://apslock.com/blogs",
  },
};

export const revalidate = 60; // revalidate every minute

export default async function BlogsPage() {
  // Always use the curated local posts — no Sanity merge
  const posts = fallbackPosts;
  const categoriesToUse = blogCategories;

  return (
    <div className="relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <GrainBlobs variant="amber" intensity={0.12} animate={true} />

      {/* Hero */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 relative z-10">
        <div className="container-wide">
          <FadeIn>

            <h1 className="text-hero text-text max-w-2xl">
              Ideas &amp; insights
            </h1>
            <p className="mt-6 text-lg text-text-muted max-w-xl leading-relaxed">
              Thinking from our team on strategy, design, engineering, and growth.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filter + List — transparent, same blob shows through */}
      <section className="pb-24 md:pb-32 relative z-10">
        <div className="container-wide">
          <BlogFilter posts={posts} categories={categoriesToUse} />
        </div>
      </section>
    </div>
  );
}
