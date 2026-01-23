import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
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

    // Slug
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

    // Bilingual Description
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        {name: 'en', type: 'text', title: 'English', rows: 3},
        {name: 'ar', type: 'text', title: 'Arabic (العربية)', rows: 3},
      ],
    }),

    // Color (for UI styling)
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color code for category badge (e.g., #7c3aed)',
    }),
  ],

  preview: {
    select: {
      title: 'title.en',
    },
  },
})
