import { createClient } from 'next-sanity'

const client = createClient({
  projectId: 'x4p4xewx',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const getPostsQuery = `
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

async function run() {
  const posts = await client.fetch(getPostsQuery)
  console.log(JSON.stringify(posts, null, 2))
}
run()
