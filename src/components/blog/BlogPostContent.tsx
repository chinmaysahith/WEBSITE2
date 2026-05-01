"use client";

import { useRef, useMemo, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import FadeIn from "@/components/shared/FadeIn";
import type { BlogPost } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

// ── Markdown-to-JSX renderer (editorial style) ─────────────
function parseMarkdownContent(content: string): ReactNode[] {
  const sections = content.split(/^## /m);
  const elements: ReactNode[] = [];

  sections.forEach((section, sectionIndex) => {
    if (sectionIndex === 0 && section.trim() === "") return;

    let heading: string | null = null;
    let body: string;

    if (sectionIndex === 0) {
      body = section;
    } else {
      const lines = section.split("\n");
      heading = lines[0].trim();
      body = lines.slice(1).join("\n");
    }

    const bodyElements = parseBody(body);

    elements.push(
      <section key={`section-${sectionIndex}`} className="blog-section">
        {heading && (
          <FadeIn>
            <div className="mt-24 mb-12 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="block w-3 h-3 rounded-full border-2 border-accent/30" />
                <span className="block w-8 h-[2px] bg-gradient-to-r from-accent/40 to-transparent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text font-display tracking-tight uppercase leading-[1.1]">
                {heading}
              </h2>
            </div>
          </FadeIn>
        )}
        {bodyElements}
      </section>
    );
  });

  return elements;
}

function parseBody(body: string): ReactNode[] {
  const elements: ReactNode[] = [];
  const lines = body.split("\n");
  let currentListItems: string[] = [];
  let blockIndex = 0;

  const flushList = () => {
    if (currentListItems.length > 0) {
      elements.push(
        <FadeIn key={`list-${blockIndex}`}>
          <div className="my-8 py-6 px-8 md:px-10 rounded-2xl bg-[var(--gradient-cool)]/40 border border-border/40 backdrop-blur-sm">
            <ul className="space-y-4">
              {currentListItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 text-text leading-relaxed group"
                >
                  <span className="mt-1.5 w-6 h-[2px] bg-accent/50 shrink-0 group-hover:w-8 group-hover:bg-accent transition-all duration-300" />
                  <span className="text-[1.05rem] md:text-lg font-medium">
                    {renderInline(item)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      );
      currentListItems = [];
      blockIndex++;
    }
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // List item
    if (line.startsWith("- ")) {
      currentListItems.push(line.slice(2).trim());
      i++;
      continue;
    }

    flushList();

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Collect consecutive non-empty, non-list lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("- ") &&
      !lines[i].startsWith("## ")
    ) {
      paraLines.push(lines[i]);
      i++;
    }

    if (paraLines.length > 0) {
      const isSingleBold =
        paraLines.length === 1 &&
        paraLines[0].startsWith("**") &&
        paraLines[0].endsWith("**");

      // Check if ALL lines are bold (e.g. a standalone bold block)
      const isFullBoldBlock =
        paraLines.length === 1 &&
        paraLines[0].startsWith("**") &&
        paraLines[0].endsWith("**");

      const isShortBlock = paraLines.every((l) => l.length < 60);

      if (isSingleBold || isFullBoldBlock) {
        // Dramatic pull-quote / callout
        const text = paraLines[0].slice(2, -2);
        elements.push(
          <FadeIn key={`callout-${blockIndex}`}>
            <div className="my-12 md:my-16 relative">
              {/* Accent glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/[0.04] via-transparent to-accent/[0.02] rounded-3xl blur-xl" />
              <blockquote className="relative pl-8 md:pl-10 border-l-[3px] border-accent py-2">
                <p className="text-2xl md:text-3xl lg:text-[2rem] font-bold text-text leading-[1.25] font-display uppercase tracking-tight">
                  {text}
                </p>
              </blockquote>
            </div>
          </FadeIn>
        );
      } else if (isShortBlock && paraLines.length >= 2) {
        // Manifesto-style verse block — punchy, staccato
        elements.push(
          <FadeIn key={`verse-${blockIndex}`}>
            <div className="my-8 md:my-10 py-6 space-y-2 relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
              {paraLines.map((l, li) => (
                <p
                  key={li}
                  className="text-lg md:text-xl text-text pl-6 leading-[1.6] font-medium"
                >
                  {renderInline(l)}
                </p>
              ))}
            </div>
          </FadeIn>
        );
      } else {
        // Regular paragraph
        elements.push(
          <FadeIn key={`para-${blockIndex}`}>
            <p className="text-[1.1rem] md:text-xl text-text-muted leading-[1.85] my-7 tracking-[-0.01em]">
              {paraLines.map((l, li) => (
                <span key={li}>
                  {renderInline(l)}
                  {li < paraLines.length - 1 ? " " : ""}
                </span>
              ))}
            </p>
          </FadeIn>
        );
      }
      blockIndex++;
    }

    continue;
  }

  flushList();
  return elements;
}

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-text font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

// ── Main Component ──────────────────────────────────────────
interface BlogPostContentProps {
  post: BlogPost | any;
  relatedPosts: BlogPost[] | any[];
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <FadeIn>
        <p className="text-[1.1rem] md:text-xl text-text-muted leading-[1.85] my-7 tracking-[-0.01em]">
          {children}
        </p>
      </FadeIn>
    ),
    h2: ({ children }) => (
      <FadeIn>
        <div className="mt-24 mb-12 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="block w-3 h-3 rounded-full border-2 border-accent/30" />
            <span className="block w-8 h-[2px] bg-gradient-to-r from-accent/40 to-transparent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text font-display tracking-tight uppercase leading-[1.1]">
            {children}
          </h2>
        </div>
      </FadeIn>
    ),
    blockquote: ({ children }) => (
      <FadeIn>
        <div className="my-12 md:my-16 relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-accent/[0.04] via-transparent to-accent/[0.02] rounded-3xl blur-xl" />
          <blockquote className="relative pl-8 md:pl-10 border-l-[3px] border-accent py-2">
            <div className="text-2xl md:text-3xl lg:text-[2rem] font-bold text-text leading-[1.25] font-display uppercase tracking-tight">
              {children}
            </div>
          </blockquote>
        </div>
      </FadeIn>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <FadeIn>
        <div className="my-8 py-6 px-8 md:px-10 rounded-2xl bg-[var(--gradient-cool)]/40 border border-border/40 backdrop-blur-sm">
          <ul className="space-y-4">{children}</ul>
        </div>
      </FadeIn>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-4 text-text leading-relaxed group">
        <span className="mt-1.5 w-6 h-[2px] bg-accent/50 shrink-0 group-hover:w-8 group-hover:bg-accent transition-all duration-300" />
        <span className="text-[1.05rem] md:text-lg font-medium">
          {children}
        </span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-text font-bold">{children}</strong>
    ),
    internalLink: ({ value, children }: any) => {
      if (!value?.reference?.slug?.current) return <span className="text-accent">{children}</span>;
      const type = value.reference._type;
      const href = `/${type === 'caseStudy' ? 'case-studies' : 'blogs'}/${value.reference.slug.current}`;
      return (
        <Link href={href} className="text-accent hover:text-accent-hover transition-colors duration-200 underline decoration-accent/30 underline-offset-4">
          {children}
        </Link>
      );
    },
  },
};

export default function BlogPostContent({
  post,
  relatedPosts,
}: BlogPostContentProps) {
  const articleRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start start", "end end"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const contentElements = useMemo(() => {
    if (post.body && Array.isArray(post.body)) {
      return <PortableText value={post.body} components={portableTextComponents} />;
    }
    return parseMarkdownContent(post.content || "");
  }, [post.content, post.body]);

  return (
    <>
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-accent origin-left z-[100]"
        style={{ scaleX }}
      />

      <article ref={articleRef}>
        {/* Hero Section */}
        <header className="relative pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-36 overflow-hidden">
          <div className="absolute inset-0 gradient-hero" />
          <div className="absolute inset-0" />

          {/* Decorative geometry */}
          <div className="absolute top-20 right-[8%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-accent/[0.03] to-transparent blur-3xl" />
          <div className="absolute bottom-10 left-[5%] w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-[var(--gradient-lavender)]/30 to-transparent blur-2xl" />

          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute top-0 left-[25%] w-px h-full bg-text" />
            <div className="absolute top-0 left-[50%] w-px h-full bg-text" />
            <div className="absolute top-0 left-[75%] w-px h-full bg-text" />
          </div>

          <div className="container-wide relative z-10">
            {/* Back link */}
            <FadeIn>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors duration-200 mb-12 group"
              >
                <ArrowLeft
                  size={16}
                  className="group-hover:-translate-x-1 transition-transform duration-200"
                />
                All articles
              </Link>
            </FadeIn>

            {/* Meta */}
            <FadeIn delay={0.05}>
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="text-xs font-medium px-3.5 py-1.5 bg-accent/[0.06] text-accent rounded-full border border-accent/10 tracking-wide uppercase">
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-text-muted font-mono">
                  <Calendar size={13} />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-text-muted font-mono">
                  <Clock size={13} />
                  {post.readTime}
                </span>
              </div>
            </FadeIn>

            {/* Title */}
            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-text leading-[1.05] tracking-tight max-w-5xl font-display uppercase">
                {post.title}
              </h1>
            </FadeIn>

            {/* Excerpt */}
            <FadeIn delay={0.15}>
              <p className="mt-10 text-lg md:text-xl text-text-muted leading-relaxed max-w-2xl">
                {post.excerpt}
              </p>
            </FadeIn>

            {/* Author + Decorative line */}
            <FadeIn delay={0.2}>
              <div className="mt-12 flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/10 flex items-center justify-center text-sm font-bold text-accent">
                  {post.author
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text tracking-wide">
                    {post.author}
                  </p>
                  <p className="text-xs text-text-muted font-mono mt-0.5">
                    APSLOCK
                  </p>
                </div>
                <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-border to-transparent ml-4" />
              </div>
            </FadeIn>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
        </header>

        {/* Article Body */}
        <div className="py-8 md:py-16">
          <div className="container-wide">
            <div className="max-w-[720px] mx-auto">{contentElements}</div>
          </div>
        </div>

        {/* End mark */}
        <div className="container-wide">
          <div className="max-w-[720px] mx-auto">
            <FadeIn>
              <div className="flex items-center justify-center gap-3 py-12">
                <div className="w-16 h-px bg-border" />
                <div className="w-2.5 h-2.5 rotate-45 border-2 border-accent/30" />
                <div className="w-16 h-px bg-border" />
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Author Card */}
        <div className="py-12 md:py-16">
          <div className="container-wide">
            <div className="max-w-[720px] mx-auto">
              <FadeIn>
                <div className="relative p-8 md:p-10 rounded-2xl overflow-hidden">
                  {/* Card background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--gradient-cool)] via-surface to-[var(--gradient-lavender)]/30" />
                  <div className="absolute inset-0 border border-border/50 rounded-2xl" />

                  <div className="relative flex items-start gap-5">
                    <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/10 flex items-center justify-center text-lg font-bold text-accent shrink-0">
                      {post.author
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-xs text-text-muted font-mono uppercase tracking-widest mb-1.5">
                        Written by
                      </p>
                      <p className="text-xl font-bold text-text font-display uppercase tracking-tight">
                        {post.author}
                      </p>
                      <p className="text-sm text-text-muted mt-3 leading-relaxed max-w-md">
                        Part of the APSLOCK team — crafting digital experiences
                        that don&apos;t just work, but matter.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-20 md:py-28 relative overflow-hidden">
            <div className="container-wide">
              <FadeIn>
                <p className="text-eyebrow mb-4">Keep Reading</p>
                <h2 className="text-section-heading text-text mb-14">
                  Related articles
                </h2>
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((related, index) => (
                  <FadeIn key={related.slug} delay={index * 0.08}>
                    <Link
                      href={`/blogs/${related.slug}`}
                      className="group block"
                    >
                      <article>
                        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-border-light mb-5">
                          <Image
                            src={related.image.src}
                            alt={related.image.alt}
                            width={related.image.width}
                            height={related.image.height}
                            unoptimized={true}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-medium px-2.5 py-1 bg-accent/5 text-accent rounded-full">
                            {related.category}
                          </span>
                          <span className="text-xs text-text-muted">
                            {related.readTime}
                          </span>
                        </div>
                        <h3 className="text-base font-semibold text-text leading-snug group-hover:text-accent transition-colors duration-200">
                          {related.title}
                        </h3>
                      </article>
                    </Link>
                  </FadeIn>
                ))}
              </div>

              <FadeIn delay={0.3}>
                <div className="mt-14 text-center">
                  <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-200 group"
                  >
                    View all posts
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform duration-200"
                    />
                  </Link>
                </div>
              </FadeIn>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
