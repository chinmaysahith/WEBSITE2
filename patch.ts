import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function run() {
  try {
    // 1. Publish the author and category (this creates the base documents without 'drafts.' prefix)
    await client.mutate([
      { createOrReplace: { _id: 'f951c48c-e598-49ce-9c07-afb5d7ce5e96', _type: 'author', name: 'Marcus Rivera', slug: { _type: 'slug', current: 'marcus-rivera' } } },
      { createOrReplace: { _id: '50d7d198-6060-4f01-a1ca-24a1ab80bbdb', _type: 'category', title: 'Design', description: 'Thoughts on user experience and visual design.' } },
    ])
    
    // 2. Patch the draft post to point to the PUBLISHED ids
    await client
      .patch('drafts.c31c5058-fef4-4d70-ba7c-313abb3f757e')
      .set({
        author: { _type: 'reference', _ref: 'f951c48c-e598-49ce-9c07-afb5d7ce5e96' },
        categories: [{ _key: 'cat1', _type: 'reference', _ref: '50d7d198-6060-4f01-a1ca-24a1ab80bbdb' }]
      })
      .commit()

    // 3. Publish the post!
    const draftPost = await client.getDocument('drafts.c31c5058-fef4-4d70-ba7c-313abb3f757e')
    if (draftPost) {
        const { _id, ...postContent } = draftPost
        await client.mutate([{ createOrReplace: { _id: 'c31c5058-fef4-4d70-ba7c-313abb3f757e', ...postContent } }])
    }
    
    console.log('Fixed!')
  } catch (err) {
    console.error(err)
  }
}
run()
