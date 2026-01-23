import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    // Bilingual Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        {name: 'en', type: 'string', title: 'English'},
        {name: 'ar', type: 'string', title: 'Arabic (العربية)'},
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Slug (URL-friendly identifier)
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // Author reference
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
    }),

    // Featured image
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
          type: 'object',
          title: 'Alternative Text',
          fields: [
            {name: 'en', type: 'string', title: 'English'},
            {name: 'ar', type: 'string', title: 'Arabic'},
          ],
        },
      ],
    }),

    // Categories
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
    }),

    // Published date
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),

    // Bilingual Excerpt
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'object',
      fields: [
        {name: 'en', type: 'text', title: 'English', rows: 3},
        {name: 'ar', type: 'text', title: 'Arabic (العربية)', rows: 3},
      ],
    }),

    // Bilingual Body
    defineField({
      name: 'body',
      title: 'Body',
      type: 'object',
      fields: [
        {
          name: 'en',
          type: 'array',
          title: 'English',
          of: [
            {type: 'block'},
            {type: 'image', options: {hotspot: true}},
          ],
        },
        {
          name: 'ar',
          type: 'array',
          title: 'Arabic (العربية)',
          of: [
            {type: 'block'},
            {type: 'image', options: {hotspot: true}},
          ],
        },
      ],
    }),

    // SEO fields
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'object',
          fields: [
            {name: 'en', type: 'string', title: 'English'},
            {name: 'ar', type: 'string', title: 'Arabic'},
          ],
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'object',
          fields: [
            {name: 'en', type: 'text', title: 'English', rows: 2},
            {name: 'ar', type: 'text', title: 'Arabic', rows: 2},
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title.en',
      author: 'author.name.en',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
