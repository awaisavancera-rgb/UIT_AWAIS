import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'course',
  title: '📚 Courses',
  type: 'document',
  icon: () => '📚',
  fields: [
    defineField({
      name: 'title',
      title: 'Course Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Course Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      placeholder: 'e.g., 4 years, 6 months',
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Bachelor', value: 'bachelor' },
          { title: 'Master', value: 'master' },
          { title: 'PhD', value: 'phd' },
        ],
      },
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      placeholder: 'e.g., $150,000, Free',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Engineering', value: 'engineering' },
          { title: 'Computer Science', value: 'computer-science' },
          { title: 'Business', value: 'business' },
          { title: 'Management', value: 'management' },
          { title: 'Arts', value: 'arts' },
          { title: 'Sciences', value: 'sciences' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Course',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
})