import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    // Bilingual Name
    defineField({
      name: 'name',
      title: 'Name',
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
        source: 'name.en',
        maxLength: 96,
      },
    }),

    // Profile Image
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    // Bilingual Bio
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'object',
      fields: [
        {
          name: 'en',
          type: 'array',
          title: 'English',
          of: [{type: 'block'}],
        },
        {
          name: 'ar',
          type: 'array',
          title: 'Arabic (العربية)',
          of: [{type: 'block'}],
        },
      ],
    }),

    // Social links
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        {name: 'twitter', type: 'url', title: 'Twitter/X'},
        {name: 'linkedin', type: 'url', title: 'LinkedIn'},
        {name: 'website', type: 'url', title: 'Website'},
      ],
    }),
  ],

  preview: {
    select: {
      title: 'name.en',
      media: 'image',
    },
  },
})
