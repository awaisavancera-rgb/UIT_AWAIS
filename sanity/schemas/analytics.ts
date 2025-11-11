import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'analytics',
  title: '📊 Analytics Dashboard',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Dashboard Title',
      type: 'string',
      initialValue: 'UIT University Analytics',
      readOnly: true,
    }),
    defineField({
      name: 'totalStudents',
      title: 'Total Students',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'totalCourses',
      title: 'Total Courses',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'totalFaculty',
      title: 'Total Faculty',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'totalEvents',
      title: 'Total Events',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'monthlyStats',
      title: 'Monthly Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'month', type: 'string', title: 'Month' },
            { name: 'enrollments', type: 'number', title: 'New Enrollments' },
            { name: 'applications', type: 'number', title: 'Applications' },
            { name: 'events', type: 'number', title: 'Events Held' },
          ],
        },
      ],
    }),
    defineField({
      name: 'popularCourses',
      title: 'Most Popular Courses',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'course' }],
        },
      ],
    }),
    defineField({
      name: 'recentActivities',
      title: 'Recent Activities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'activity', type: 'string', title: 'Activity' },
            { name: 'date', type: 'datetime', title: 'Date' },
            { name: 'type', type: 'string', title: 'Type', options: {
              list: ['course', 'faculty', 'event', 'blog', 'student']
            }},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Analytics Dashboard',
        subtitle: 'University Statistics & Insights',
      }
    },
  },
})