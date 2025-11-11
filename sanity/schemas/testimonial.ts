import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: '💬 Testimonials',
  type: 'document',
  icon: () => '💬',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'studentName',
      title: 'Student Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'program',
      title: 'Program/Course',
      type: 'string',
    }),
    defineField({
      name: 'graduationYear',
      title: 'Graduation Year',
      type: 'number',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'image',
      title: 'Student Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'studentName',
      subtitle: 'program',
      media: 'image',
    },
  },
})