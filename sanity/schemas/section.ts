import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'section',
  title: 'Page Section',
  type: 'object',
  fields: [
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
      description: 'Unique key for this section',
    }),
    defineField({
      name: 'type',
      title: 'Section Type',
      type: 'string',
      options: {
        list: [
          { title: 'Hero Banner', value: 'hero' },
          { title: 'Courses Carousel', value: 'courses' },
          { title: 'Faculty Section', value: 'faculty' },
          { title: 'Testimonials', value: 'testimonials' },
          { title: 'Timeline', value: 'timeline' },
          { title: 'Custom Rich Text', value: 'richText' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'props',
      title: 'Section Props',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [{ type: 'block' }],
          hidden: ({ parent }) => parent?.type !== 'richText',
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
          hidden: ({ parent }) => parent?.type !== 'hero',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      type: 'type',
      title: 'props.title',
    },
    prepare({ type, title }) {
      return {
        title: title || type,
        subtitle: `Section: ${type}`,
      }
    },
  },
})

