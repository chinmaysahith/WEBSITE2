/* ═══════════════════════════════════════════════════════
 * APSLOCK — Central Data Layer
 * All page content lives here. Components import typed
 * constants from this file. When a CMS is connected,
 * replace each import with a fetch call — no UI changes.
 * ═══════════════════════════════════════════════════════ */


// ── Shared Types ─────────────────────────────────────────

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// ── Site Meta ────────────────────────────────────────────

export interface SiteMeta {
  title: string;
  description: string;
  url: string;
  ogImage: ImageAsset;
}

export const siteMeta: SiteMeta = {
  title: "APSLOCK — Digital Agency",
  description:
    "APSLOCK is a modern digital agency crafting web experiences, brand identities, and growth strategies that drive measurable results.",
  url: "https://apslock.com",
  ogImage: {
    src: "/images/og-image.jpg",
    alt: "APSLOCK Digital Agency",
    width: 1200,
    height: 630,
  },
};

// ── Navigation ───────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Expertise", href: "/expertise" },
  { label: "Blog", href: "/blogs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ── Hero ─────────────────────────────────────────────────

export interface HeroContent {
  headline: string;
  subline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  image: ImageAsset;
}

export const heroContent: HeroContent = {
  headline: "Built to stand out. Engineered to perform.",
  subline:
    "APSLOCK partners with ambitious brands to design and build digital experiences, platforms, and campaigns that drive measurable growth.",
  primaryCta: { label: "View our work", href: "/case-studies" },
  secondaryCta: { label: "Let's talk", href: "/contact" },
  image: {
    src: "/images/hero-brand.jpg",
    alt: "APSLOCK brand graphic — abstract geometric composition",
    width: 1200,
    height: 800,
  },
};

// ── Featured Cases (Case Reel) ───────────────────────────

export interface FeaturedCase {
  slug: string;
  index: string;
  title: string;
  subtitle?: string;
  description: string;
  industry: string;
  year: string;
  image: ImageAsset;
}

export const featuredCases: FeaturedCase[] = [
  {
    slug: "elevate-commerce-redesign",
    index: "01.",
    title: "Reimagining the Online Shopping Experience",
    subtitle: "A conversion-optimized storefront that boosted revenue 340%",
    description:
      "A ground-up redesign that transformed a legacy storefront into a conversion-optimized platform, boosting revenue by 340% in six months.",
    industry: "eCommerce",
    year: "2024",
    image: {
      src: "/images/cases/case-01.jpg",
      alt: "Elevate Commerce website redesign showcase",
      width: 800,
      height: 1200,
    },
  },
  {
    slug: "haven-health-platform",
    index: "02.",
    title: "A Patient Portal That People Actually Use",
    subtitle: "Accessible healthcare portal serving 200K+ patients",
    description:
      "Designed and built an accessible patient portal that simplified appointment booking, telehealth, and record access for 200K+ patients.",
    industry: "Healthcare",
    year: "2024",
    image: {
      src: "/images/cases/case-02.jpg",
      alt: "Haven Health patient portal interface",
      width: 800,
      height: 1200,
    },
  },
  {
    slug: "greenleaf-brand-identity",
    index: "03.",
    title: "Building a Brand from the Ground Up",
    subtitle: "Full brand identity and digital presence for a sustainable food brand",
    description:
      "Full brand identity system and digital presence for a sustainable food brand, from naming through launch-day campaigns.",
    industry: "Retail",
    year: "2023",
    image: {
      src: "/images/cases/case-03.jpg",
      alt: "GreenLeaf Organics brand identity system",
      width: 800,
      height: 1200,
    },
  },
];

// ── Capabilities ─────────────────────────────────────────

export interface Capability {
  title: string;
  description: string;
  icon: string; // Lucide icon name
}

export const capabilities: Capability[] = [
  {
    title: "Digital Platforms",
    description:
      "We design and develop scalable web experiences that form the foundation of your digital presence—built for performance, flexibility, and growth.",
    icon: "Monitor",
  },
  {
    title: "Product & App Experiences",
    description:
      "From concept to launch, we create intuitive applications that solve real problems and deliver seamless user experiences across devices.",
    icon: "Layers",
  },
  {
    title: "AI-Driven Solutions",
    description:
      "We integrate intelligent systems that automate workflows, enhance decision-making, and unlock new possibilities for modern businesses.",
    icon: "Cpu",
  },
  {
    title: "Growth Marketing",
    description:
      "We craft data-driven campaigns that connect brands with the right audience—turning visibility into engagement and engagement into results.",
    icon: "TrendingUp",
  },
  {
    title: "Search & Visibility",
    description:
      "We optimize digital presence to ensure your brand is discoverable, relevant, and consistently positioned where it matters most.",
    icon: "Search",
  },
  {
    title: "Brand Identity & Design",
    description:
      "We create distinctive visual identities that communicate clearly, resonate deeply, and establish a strong, memorable brand presence.",
    icon: "Palette",
  },
];


// ── Case Studies ─────────────────────────────────────────

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  category: string;
  description: string;
  metrics: { label: string; value: string }[];
  image: ImageAsset;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "elevate-commerce-redesign",
    title: "Reimagining the Online Shopping Experience",
    client: "Elevate Commerce",
    category: "eCommerce",
    description:
      "A ground-up redesign that transformed a legacy storefront into a conversion-optimized platform, boosting revenue by 340% in six months.",
    metrics: [
      { label: "Revenue Growth", value: "+340%" },
      { label: "Conversion Rate", value: "4.8%" },
      { label: "Page Speed", value: "98/100" },
    ],
    image: {
      src: "/images/case-study-1.jpg",
      alt: "Elevate Commerce website redesign showcase",
      width: 800,
      height: 600,
    },
  },
  {
    slug: "greenleaf-brand-identity",
    title: "Building a Brand from the Ground Up",
    client: "GreenLeaf Organics",
    category: "Retail",
    description:
      "Full brand identity system and digital presence for a sustainable food brand, from naming through launch-day campaigns.",
    metrics: [
      { label: "Brand Awareness", value: "+280%" },
      { label: "Social Following", value: "45K" },
      { label: "Launch Sales", value: "$1.2M" },
    ],
    image: {
      src: "/images/case-study-2.jpg",
      alt: "GreenLeaf Organics brand identity system",
      width: 800,
      height: 600,
    },
  },
  {
    slug: "haven-health-platform",
    title: "A Patient Portal That People Actually Use",
    client: "Haven Health",
    category: "Healthcare",
    description:
      "Designed and built an accessible patient portal that simplified appointment booking, telehealth, and record access for 200K+ patients.",
    metrics: [
      { label: "User Adoption", value: "87%" },
      { label: "Accessibility", value: "AAA" },
      { label: "Support Tickets", value: "-62%" },
    ],
    image: {
      src: "/images/case-study-3.jpg",
      alt: "Haven Health patient portal interface",
      width: 800,
      height: 600,
    },
  },
  {
    slug: "uplift-foundation-campaign",
    title: "Turning Awareness into Action",
    client: "Uplift Foundation",
    category: "Nonprofit",
    description:
      "An integrated awareness campaign and donation platform that helped a nonprofit raise $4.2M in their biggest giving season ever.",
    metrics: [
      { label: "Donations", value: "$4.2M" },
      { label: "Donor Conversion", value: "12.3%" },
      { label: "Email Open Rate", value: "48%" },
    ],
    image: {
      src: "/images/case-study-4.jpg",
      alt: "Uplift Foundation campaign landing page",
      width: 800,
      height: 600,
    },
  },
  {
    slug: "nova-fintech-launch",
    title: "Launching a Fintech Brand in 90 Days",
    client: "Nova Financial",
    category: "eCommerce",
    description:
      "Brand strategy, website, and go-to-market campaign that took a fintech startup from zero to 10K signups in its first quarter.",
    metrics: [
      { label: "Signups", value: "10K+" },
      { label: "CAC Reduction", value: "-45%" },
      { label: "Press Mentions", value: "32" },
    ],
    image: {
      src: "/images/case-study-5.jpg",
      alt: "Nova Financial brand launch materials",
      width: 800,
      height: 600,
    },
  },
  {
    slug: "atlas-retail-experience",
    title: "Bridging Online and In-Store",
    client: "Atlas Home Goods",
    category: "Retail",
    description:
      "An omnichannel strategy connecting digital marketing with in-store experience, increasing foot traffic by 65% and online sales by 180%.",
    metrics: [
      { label: "Foot Traffic", value: "+65%" },
      { label: "Online Sales", value: "+180%" },
      { label: "Customer LTV", value: "+40%" },
    ],
    image: {
      src: "/images/case-study-6.jpg",
      alt: "Atlas Home Goods omnichannel experience",
      width: 800,
      height: 600,
    },
  },
];

// ── Process Steps ────────────────────────────────────────

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "We immerse ourselves in your business, audience, and competitive landscape to uncover insights that drive strategy.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Translating strategy into compelling visuals, interactions, and messaging that resonate with your target audience.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Engineering robust, performant digital products with clean code, modern tooling, and rigorous quality standards.",
  },
  {
    number: "04",
    title: "Grow",
    description:
      "Launching, measuring, and iterating — we use data to optimize performance and unlock sustainable growth.",
  },
];

// ── Service Segments (Expertise) ─────────────────────────

export interface ServiceSegment {
  label: string;
  heading: string;
  description: string;
  offerings: string[];
}

export const serviceSegments: ServiceSegment[] = [
  {
    label: "Foundation",
    heading: "Brand Foundations",
    description:
      "Every great brand starts with clarity. We define who you are, what you stand for, and how the world should perceive you — from naming and visual identity to voice and messaging frameworks.",
    offerings: [
      "Brand Strategy & Positioning",
      "Visual Identity Systems",
      "Naming & Verbal Identity",
      "Brand Guidelines & Governance",
      "Competitive Audits",
    ],
  },
  {
    label: "Growth",
    heading: "Growth & Go-To-Market",
    description:
      "We build and execute go-to-market strategies that move the needle — from launch campaigns and demand generation to SEO, paid media, and conversion optimization.",
    offerings: [
      "Go-To-Market Strategy",
      "SEO & Organic Growth",
      "Paid Media Management",
      "Email & Lifecycle Marketing",
      "Conversion Rate Optimization",
    ],
  },
  {
    label: "Build",
    heading: "Build & Innovation",
    description:
      "Pixel-perfect design meets production-grade engineering. We create web experiences, applications, and digital platforms built for performance, scale, and delight.",
    offerings: [
      "Web Design & Development",
      "Application Development",
      "Design Systems",
      "CMS & Platform Architecture",
      "Performance Optimization",
    ],
  },
  {
    label: "Trust",
    heading: "Trust & Influence",
    description:
      "Content is currency. We develop editorial strategies and produce high-quality content that builds authority, earns trust, and drives organic engagement over time.",
    offerings: [
      "Content Strategy",
      "Thought Leadership Programs",
      "Editorial Production",
      "Social Media Strategy",
      "Community Building",
    ],
  },
];

// ── Blog Posts ────────────────────────────────────────────

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: ImageAsset;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "your-interface-isnt-broken",
    title: "Your Interface Isn't Broken. It's Indistinguishable.",
    excerpt:
      "Open five SaaS products in your space. Blur the logos. They start to look the same. Design has become predictable — not because teams lack talent, but because everyone is optimizing against the same references.",
    content: `## The Convergence Problem

Open five SaaS products in your space.
Blur the logos.

They start to look the same.

Clean grids. Soft shadows. Rounded buttons. Safe typography.
Nothing is wrong with any of it.

**That's the problem.**

Design has become predictable. Not because teams lack talent—but because everyone is optimizing against the same references.

"Best practices" didn't just standardize usability.
They standardized identity.

When every product feels familiar, users don't choose—they default. And default decisions rarely build loyalty.

## The Metrics Blind Spot

Most teams don't notice this drift.

They measure:

- Task completion
- Click-through rates
- Usability scores

All green.

Meanwhile:

- Recall drops
- Differentiation fades
- Switching costs shrink

Because usability tells you if something works.
It doesn't tell you if it **matters**.

## The Smoothness Trap

We've quietly equated good design with invisible design.

The smoother the experience, the less the user feels it.
The less they feel it, the less they remember it.

That's not user-centric.
That's neutral.

There's a difference between removing friction and removing character.

Broken flows? Fix them.
Confusing navigation? Fix it.

But beyond that, total smoothness becomes a tradeoff.

If every interaction is predictable, nothing stands out.
If nothing stands out, nothing sticks.

## Where Products Converge

Look at where most products converge:

- Same onboarding patterns
- Same dashboard layouts
- Same micro-interactions
- Same tone of voice

It's not coincidence.
It's convergence.

Design systems made teams faster.
They also made outcomes similar.

## The Shift

The shift isn't about rejecting usability.

It's about deciding where **not** to be generic.

Not everywhere. Just where it counts.

A moment in onboarding that signals personality.
Copy that sounds like a human, not a system.
A visual decision that feels intentional, not safe.

Small signals. Big effect.

Because users don't remember flows.
They remember **moments**.

## The Harder Question

Ask a harder question:

**If your UI was stripped of branding, would anyone know it's yours?**

If the answer is no, your design isn't user-centric.
It's reference-centric.

Good design gets you used.

**Distinct design gets you chosen.**

There's a difference.

Don't just make your product easy to use.
Make it impossible to confuse with anything else.`,
    category: "Design",
    author: "Marcus Rivera",
    date: "2025-04-26",
    readTime: "5 min read",
    image: {
      src: "/images/blog-indistinguishable.jpg",
      alt: "Abstract blurred interfaces overlapping — a visual metaphor for design convergence",
      width: 1200,
      height: 630,
    },
  },
  {
    slug: "why-brand-strategy-matters",
    title: "Why Brand Strategy Still Matters in a Performance-Driven World",
    excerpt:
      "In a landscape obsessed with metrics and attribution, brand strategy remains the most under-invested — and most impactful — lever for long-term growth.",
    content:
      "In a landscape obsessed with metrics and attribution, brand strategy remains the most under-invested and most impactful lever for long-term growth. While performance marketing captures demand, brand strategy creates it. The most resilient companies understand that brand isn't a cost center — it's the foundation every other channel builds upon. This article explores why investing in brand foundations pays compound dividends and how to build a measurement framework that captures brand's true impact.",
    category: "Strategy",
    author: "Sarah Chen",
    date: "2024-12-10",
    readTime: "6 min read",
    image: {
      src: "/images/blog-1.jpg",
      alt: "Abstract composition representing brand strategy concepts",
      width: 800,
      height: 500,
    },
  },
  {
    slug: "design-systems-at-scale",
    title: "Design Systems at Scale: Lessons from the Trenches",
    excerpt:
      "Building a design system is easy. Getting an organization to adopt, maintain, and evolve it? That's the real challenge. Here's what we've learned.",
    content:
      "Building a design system is easy. Getting an organization to adopt, maintain, and evolve it? That's the real challenge. Over the past three years, we've helped a dozen companies build and scale design systems. The patterns of success and failure are remarkably consistent. The winning teams treat their design system as a product, complete with user research, roadmaps, and dedicated maintainers. The struggling teams treat it as a side project that everyone owns and nobody maintains. Here are the key lessons we've distilled from working in the trenches.",
    category: "Design",
    author: "Marcus Rivera",
    date: "2024-11-28",
    readTime: "8 min read",
    image: {
      src: "/images/blog-2.jpg",
      alt: "Organized design component library visualization",
      width: 800,
      height: 500,
    },
  },
  {
    slug: "seo-in-age-of-ai",
    title: "SEO in the Age of AI: What Actually Changed",
    excerpt:
      "AI overviews, zero-click searches, and generative engines are reshaping search. But the fundamentals still win. Here's our updated playbook.",
    content:
      "AI overviews, zero-click searches, and generative engines are reshaping search. But the fundamentals still win. The rise of AI in search has triggered widespread panic in the SEO community. Headlines proclaim the death of organic traffic. Reality is more nuanced. While the search landscape is evolving rapidly, the core principles of creating genuinely valuable content, building topical authority, and ensuring excellent technical foundations remain as relevant as ever. What has changed is the importance of structured data, entity optimization, and content that directly answers complex queries. Here is our updated playbook for thriving in the new search paradigm.",
    category: "Marketing",
    author: "Sarah Chen",
    date: "2024-11-15",
    readTime: "7 min read",
    image: {
      src: "/images/blog-3.jpg",
      alt: "Data visualization showing search trend analytics",
      width: 800,
      height: 500,
    },
  },
  {
    slug: "web-performance-business-impact",
    title: "The Business Case for Web Performance",
    excerpt:
      "Every 100ms of latency costs you conversions. We break down the data, the quick wins, and the architecture decisions that make sites fast by default.",
    content:
      "Every 100ms of latency costs you conversions. We break down the data, the quick wins, and the architecture decisions that make sites fast by default. Performance is not just a technical concern — it's a business metric. Amazon famously discovered that every 100ms of added page load time cost them 1% in revenue. Google found that a half-second delay in search page generation dropped traffic by 20%. These numbers have only become more dramatic in the mobile era. In this deep dive, we share the performance optimization framework we use with clients, from quick CSS and image wins to architectural decisions around SSR, edge computing, and modern bundling strategies.",
    category: "Development",
    author: "James Park",
    date: "2024-10-30",
    readTime: "9 min read",
    image: {
      src: "/images/blog-4.jpg",
      alt: "Performance metrics dashboard showing core web vitals",
      width: 800,
      height: 500,
    },
  },
  {
    slug: "nonprofit-digital-transformation",
    title: "Digital Transformation for Nonprofits: A Practical Guide",
    excerpt:
      "Nonprofits face unique digital challenges. Limited budgets, diverse stakeholders, and mission-driven KPIs require a different approach. Here's our framework.",
    content:
      "Nonprofits face unique digital challenges. Limited budgets, diverse stakeholders, and mission-driven KPIs require a different approach. After working with dozens of mission-driven organizations, we have developed a practical framework for nonprofit digital transformation that accounts for these realities. It starts with understanding that nonprofit digital strategy is not just corporate strategy with a smaller budget. The stakeholder landscape is fundamentally different: donors, beneficiaries, volunteers, board members, and partner organizations all have distinct needs and motivations. Successful nonprofit digital transformation addresses each audience thoughtfully while maintaining a unified brand experience.",
    category: "Strategy",
    author: "Marcus Rivera",
    date: "2024-10-12",
    readTime: "6 min read",
    image: {
      src: "/images/blog-5.jpg",
      alt: "Nonprofit team collaborating on digital strategy",
      width: 800,
      height: 500,
    },
  },
  {
    slug: "future-of-headless-cms",
    title: "Headless CMS in 2025: Choosing the Right Architecture",
    excerpt:
      "The headless CMS landscape has matured. We compare the leading options and share our decision framework for choosing the right one.",
    content:
      "The headless CMS landscape has matured. We compare the leading options and share our decision framework for choosing the right one. Three years ago, choosing a headless CMS meant picking between a handful of early movers. Today, the market has exploded with options spanning from developer-first platforms to enterprise suites with visual editing. The right choice depends on your team's technical maturity, content modeling complexity, editorial workflow needs, and budget. We have implemented Sanity, Contentful, Payload, Strapi, and several others across client projects. Here is our honest assessment of each platform and the decision framework we use to guide recommendations.",
    category: "Development",
    author: "James Park",
    date: "2024-09-20",
    readTime: "10 min read",
    image: {
      src: "/images/blog-6.jpg",
      alt: "CMS architecture diagram with connected nodes",
      width: 800,
      height: 500,
    },
  },
];

// ── Blog Categories ──────────────────────────────────────

export interface BlogCategory {
  label: string;
  value: string;
}

export const blogCategories: BlogCategory[] = [
  { label: "All", value: "all" },
  { label: "Strategy", value: "Strategy" },
  { label: "Design", value: "Design" },
  { label: "Marketing", value: "Marketing" },
  { label: "Development", value: "Development" },
];

// ── Team Members ─────────────────────────────────────────

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: ImageAsset;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Sarah Chen",
    role: "Founder & Strategy Lead",
    bio: "15 years shaping brand and growth strategy for startups and Fortune 500s. Previously at IDEO and Google.",
    image: {
      src: "/images/team-1.jpg",
      alt: "Sarah Chen — Founder & Strategy Lead",
      width: 400,
      height: 500,
    },
  },
  {
    name: "Marcus Rivera",
    role: "Creative Director",
    bio: "Award-winning designer with a background in editorial and brand identity. Believes in design that earns trust.",
    image: {
      src: "/images/team-2.jpg",
      alt: "Marcus Rivera — Creative Director",
      width: 400,
      height: 500,
    },
  },
  {
    name: "James Park",
    role: "Head of Engineering",
    bio: "Full-stack architect obsessed with performance. Builds systems that scale gracefully and ship confidently.",
    image: {
      src: "/images/team-3.jpg",
      alt: "James Park — Head of Engineering",
      width: 400,
      height: 500,
    },
  },
  {
    name: "Amara Okafor",
    role: "Marketing Director",
    bio: "Data-driven marketer who bridges brand and performance. Expert in turning insights into growth engines.",
    image: {
      src: "/images/team-4.jpg",
      alt: "Amara Okafor — Marketing Director",
      width: 400,
      height: 500,
    },
  },
];

// ── Values ───────────────────────────────────────────────

export interface Value {
  title: string;
  description: string;
  icon: string; // Lucide icon name
}

export const values: Value[] = [
  {
    title: "Clarity Over Complexity",
    description:
      "We turn complex ideas into clear, actionable direction. Every decision, every deliverable—built to be understood and aligned across teams.",
    icon: "Focus",
  },
  {
    title: "Craft Matters",
    description:
      "Details aren't optional—they define the outcome. From pixels to performance, we obsess over the small things because they compound into excellence.",
    icon: "Gem",
  },
  {
    title: "Outcomes, Not Outputs",
    description:
      "Great design means nothing without impact. We measure success by results—growth, engagement, and real business movement.",
    icon: "TrendingUp",
  },
  {
    title: "Partnership, Not Vendor",
    description:
      "We don't work for you—we work with you. Embedding deeply, understanding your business, and building long-term value together.",
    icon: "Handshake",
  },
];

// ── Work Process ─────────────────────────────────────────

export interface WorkProcessItem {
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const workProcess: WorkProcessItem[] = [
  {
    phase: "Phase 1",
    title: "Understand",
    description:
      "We start by listening, learning, and uncovering insights that shape everything that follows.",
    deliverables: [
      "Stakeholder Interviews",
      "Competitive Analysis",
      "Audience Research",
      "Strategic Brief",
    ],
  },
  {
    phase: "Phase 2",
    title: "Define",
    description:
      "We translate insights into a clear strategy and creative direction aligned with your goals.",
    deliverables: [
      "Brand Strategy",
      "Content Architecture",
      "Creative Direction",
      "Technical Planning",
    ],
  },
  {
    phase: "Phase 3",
    title: "Create",
    description:
      "Ideas become reality through thoughtful design, development, and collaboration.",
    deliverables: [
      "UI/UX Design",
      "Development Sprints",
      "Content Production",
      "QA & Testing",
    ],
  },
  {
    phase: "Phase 4",
    title: "Launch & Evolve",
    description:
      "We launch with intention—and continue refining for performance and growth.",
    deliverables: [
      "Launch Support",
      "Analytics & Tracking",
      "Performance Review",
      "Growth Roadmap",
    ],
  },
];

// ── Contact Info ─────────────────────────────────────────

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  locationDetail: string;
  social: { platform: string; url: string; icon: string }[];
}

export const contactInfo: ContactInfo = {
  email: "hello@apslock.com",
  phone: "+1 (404) 555-0192",
  location: "Atlanta, GA",
  locationDetail: "Atlanta, serving worldwide.",
  social: [
    { platform: "LinkedIn", url: "https://linkedin.com/company/apslock", icon: "Linkedin" },
    { platform: "Twitter", url: "https://twitter.com/apslock", icon: "Twitter" },
    { platform: "Instagram", url: "https://instagram.com/apslock", icon: "Instagram" },
    { platform: "Dribbble", url: "https://dribbble.com/apslock", icon: "Dribbble" },
  ],
};