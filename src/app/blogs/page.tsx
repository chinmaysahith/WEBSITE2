import type { Metadata } from "next";
import FadeIn from "@/components/shared/FadeIn";
import BlogFilter from "@/components/blog/BlogFilter";
import { blogPosts as fallbackPosts, blogCategories } from "@/lib/data";
import { client } from "@/sanity/lib/client";
import { getPostsQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on brand strategy, design systems, SEO, web performance, and digital marketing from the APSLOCK team.",
};

export const revalidate = 60; // revalidate every minute

export default async function BlogsPage() {
  let posts = fallbackPosts;
  
  try {
    // Attempt to fetch from Sanity if env vars are present
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const sanityPosts = await client.fetch(getPostsQuery);
      if (sanityPosts && sanityPosts.length > 0) {
        // Merge Sanity posts with existing fallback posts so old content isn't lost
        const sanitySlugs = new Set(sanityPosts.map((p: any) => p.slug));
        const filteredFallbacks = fallbackPosts.filter((p) => !sanitySlugs.has(p.slug));
        posts = [...sanityPosts, ...filteredFallbacks];
      }
    }
  } catch (error) {
    console.error("Error fetching from Sanity:", error);
    // Silent fallback to local data
  }

  // Derive categories dynamically from posts, or use fallback
  const dynamicCategories = [
    { label: "All", value: "all" },
    ...Array.from(new Set(posts.map(p => p.category))).map(cat => ({ 
      label: cat as string, 
      value: cat as string 
    }))
  ];
  const categoriesToUse = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? dynamicCategories : blogCategories;

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 gradient-hero relative gradient-noise overflow-hidden">
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
      <section className="pb-24 md:pb-32 gradient-section-cool relative gradient-noise overflow-hidden">
        <div className="container-wide">
          <BlogFilter posts={posts} categories={categoriesToUse} />
        </div>
      </section>
    </>
  );
}
