import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [{ type: 'section' }],
      options: { sortable: true },
      validation: (Rule) => Rule.min(0),
    }),
  ],
})

