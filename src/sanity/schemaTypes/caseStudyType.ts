import {defineField, defineType, defineArrayMember} from 'sanity'

export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'content',
    }),
    defineField({
      name: 'category',
      title: 'Category / Industry',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
      description: 'Optimal length is 50-60 characters.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      description: 'Optimal length is 150-160 characters. Used for SEO and social sharing.',
      rows: 3,
    }),
    defineField({
      name: 'description',
      title: 'Summary / Description',
      type: 'text',
      group: 'content',
      rows: 4,
    }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'value', type: 'string', title: 'Value'},
          ],
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'servicesUsed',
      title: 'Services Used',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      group: 'content',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessiblity.',
        }
      ],
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'blockContent',
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'mainImage',
    },
  },
})
