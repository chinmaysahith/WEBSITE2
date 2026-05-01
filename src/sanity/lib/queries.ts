import {groq} from 'next-sanity'

export const getPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    metaTitle,
    metaDescription,
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
    metaTitle,
    metaDescription,
    "author": author->name,
    "category": categories[0]->title,
    publishedAt,
    readTime,
    excerpt,
    body[] {
      ...,
      markDefs[] {
        ...,
        _type == "internalLink" => {
          "reference": reference->{
            _type,
            slug
          }
        }
      }
    },
    "image": mainImage {
      "src": asset->url,
      alt,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }
  }
`

export const getCaseStudiesQuery = groq`
  *[_type == "caseStudy" && defined(slug.current)] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    metaTitle,
    metaDescription,
    client,
    category,
    description,
    "image": mainImage {
      "src": asset->url,
      alt,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }
  }
`

export const getCaseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    metaTitle,
    metaDescription,
    client,
    category,
    description,
    metrics,
    servicesUsed,
    body[] {
      ...,
      markDefs[] {
        ...,
        _type == "internalLink" => {
          "reference": reference->{
            _type,
            slug
          }
        }
      }
    },
    "image": mainImage {
      "src": asset->url,
      alt,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }
  }
`
