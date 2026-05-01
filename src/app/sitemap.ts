import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';
import { getPostsQuery } from '@/sanity/lib/queries';
import { caseStudies, blogPosts as fallbackPosts } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://apslock.com';

  // Get posts
  let posts = fallbackPosts;
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const sanityPosts = await client.fetch(getPostsQuery);
      if (sanityPosts && sanityPosts.length > 0) {
        posts = sanityPosts;
      }
    } catch (e) {
      console.error('Failed to fetch posts for sitemap', e);
    }
  }

  const postUrls: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.publishedAt || post.date || new Date()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const caseStudyUrls: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/expertise`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...postUrls,
    ...caseStudyUrls,
  ];
}
