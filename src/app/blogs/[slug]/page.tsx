import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { blogPosts as fallbackPosts } from "@/lib/data";
import { client } from "@/sanity/lib/client";
import { getPostBySlugQuery, getPostsQuery } from "@/sanity/lib/queries";
import { formatDate } from "@/lib/utils";
import BlogPostContent from "@/components/blog/BlogPostContent";
import FadeIn from "@/components/shared/FadeIn";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    const posts = await client.fetch(getPostsQuery);
    return posts.map((post: any) => ({ slug: post.slug }));
  }
  return fallbackPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Local posts take priority
  let post: any = fallbackPosts.find((p) => p.slug === slug);
  if (!post && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      post = await client.fetch(getPostBySlugQuery, { slug });
    } catch { /* silent */ }
  }

  if (!post) return {};

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical: `https://apslock.com/blogs/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt || post.date,
      authors: [post.author],
      images: post.image?.src ? [
        {
          url: post.image.src,
          width: post.image.width || 1200,
          height: post.image.height || 630,
          alt: post.image.alt || post.title,
        },
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.image?.src ? [post.image.src] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  // Always check local posts first — guaranteed to exist
  const localPost = fallbackPosts.find((p) => p.slug === slug);
  
  let post: any = localPost;
  let allPosts: any[] = fallbackPosts;
  
  // Only query Sanity for slugs not found locally
  if (!localPost && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      post = await client.fetch(getPostBySlugQuery, { slug });
      const sanityAll = await client.fetch(getPostsQuery);
      if (sanityAll?.length) allPosts = [...fallbackPosts, ...sanityAll];
    } catch {
      // silent — fallbackPosts still used
    }
  }

  if (!post) {
    notFound();
  }

  // Find related posts (same category, excluding current)
  const relatedPosts = allPosts
    .filter((p: any) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.image?.src ? [post.image.src] : [],
    "datePublished": post.publishedAt || post.date,
    "dateModified": post.publishedAt || post.date,
    "author": [{
      "@type": "Person",
      "name": post.author,
    }],
    "description": post.metaDescription || post.excerpt,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BlogPostContent post={post} relatedPosts={relatedPosts} />
    </>
  );
}
