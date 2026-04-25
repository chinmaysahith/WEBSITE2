import type { Metadata } from "next";
import FadeIn from "@/components/shared/FadeIn";
import BlogFilter from "@/components/blog/BlogFilter";
import { blogPosts, blogCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on brand strategy, design systems, SEO, web performance, and digital marketing from the APSLOCK team.",
};

export default function BlogsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="container-wide">
          <FadeIn>
            <p className="text-eyebrow text-accent mb-4">Blog</p>
            <h1 className="text-hero text-text max-w-2xl">
              Ideas &amp; insights
            </h1>
            <p className="mt-6 text-lg text-text-muted max-w-xl leading-relaxed">
              Thinking from our team on strategy, design, engineering, and growth.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filter + List */}
      <section className="pb-24 md:pb-32">
        <div className="container-wide">
          <BlogFilter posts={blogPosts} categories={blogCategories} />
        </div>
      </section>
    </>
  );
}
