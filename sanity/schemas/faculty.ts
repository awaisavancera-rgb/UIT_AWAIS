import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faculty',
  title: '👨‍🏫 Faculty Members',
  type: 'document',
  icon: () => '👨‍🏫',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      placeholder: 'e.g., Professor, Associate Professor, Lecturer',
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      placeholder: 'e.g., Head of Department, Dean',
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'Computer Science', value: 'computer-science' },
          { title: 'Engineering', value: 'engineering' },
          { title: 'Business Administration', value: 'business' },
          { title: 'Management Sciences', value: 'management' },
          { title: 'Arts & Sciences', value: 'arts-sciences' },
        ],
      },
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      title: 'Profile Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'office',
      title: 'Office Location',
      type: 'string',
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'degree', type: 'string', title: 'Degree' },
            { name: 'institution', type: 'string', title: 'Institution' },
            { name: 'year', type: 'number', title: 'Year' },
          ],
        },
      ],
    }),
    defineField({
      name: 'experience',
      title: 'Years of Experience',
      type: 'number',
    }),
    defineField({
      name: 'specializations',
      title: 'Specializations',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'publications',
      title: 'Publications',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Faculty',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image',
    },
  },
})