import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactSettings',
  title: '📧 Contact Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Contact Page Title',
      type: 'string',
      initialValue: 'Contact UIT University',
    }),
    defineField({
      name: 'description',
      title: 'Contact Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'mainOffice',
      title: 'Main Office',
      type: 'object',
      fields: [
        { name: 'name', type: 'string', title: 'Office Name' },
        { name: 'address', type: 'text', title: 'Address' },
        { name: 'phone', type: 'string', title: 'Phone' },
        { name: 'email', type: 'email', title: 'Email' },
        { name: 'hours', type: 'string', title: 'Office Hours' },
      ],
    }),
    defineField({
      name: 'admissionsOffice',
      title: 'Admissions Office',
      type: 'object',
      fields: [
        { name: 'name', type: 'string', title: 'Office Name' },
        { name: 'address', type: 'text', title: 'Address' },
        { name: 'phone', type: 'string', title: 'Phone' },
        { name: 'email', type: 'email', title: 'Email' },
        { name: 'hours', type: 'string', title: 'Office Hours' },
      ],
    }),
    defineField({
      name: 'departments',
      title: 'Department Contacts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'department', type: 'string', title: 'Department Name' },
            { name: 'head', type: 'string', title: 'Department Head' },
            { name: 'phone', type: 'string', title: 'Phone' },
            { name: 'email', type: 'email', title: 'Email' },
            { name: 'office', type: 'string', title: 'Office Location' },
          ],
        },
      ],
    }),
    defineField({
      name: 'emergencyContacts',
      title: 'Emergency Contacts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Contact Title' },
            { name: 'phone', type: 'string', title: 'Phone' },
            { name: 'description', type: 'string', title: 'Description' },
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
        title: title || 'Contact Settings',
        subtitle: 'University Contact Information',
      }
    },
  },
})