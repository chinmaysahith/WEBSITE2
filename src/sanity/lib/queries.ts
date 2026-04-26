import {groq} from 'next-sanity'

export const getPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "author": author->name,
    "category": categories[0]->title,
    publishedAt,
    readTime,
    excerpt,
    "image": mainImage {
      "src": asset->url,
      alt,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }
  }
`

export const getPostBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "author": author->name,
    "category": categories[0]->title,
    publishedAt,
    readTime,
    excerpt,
    body,
    "image": mainImage {
      "src": asset->url,
      alt,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }
  }
`
