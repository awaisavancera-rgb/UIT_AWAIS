import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'menu',
  title: 'Menu',
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
      title: 'Link',
      type: 'string',
      description: 'URL path (e.g., "/about", "/contact") or external URL',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'page',
      title: 'Internal Page',
      type: 'reference',
      to: [{ type: 'page' }],
      description: 'Link to an internal page (optional - overrides slug if selected)',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isExternal',
      title: 'External Link',
      type: 'boolean',
      initialValue: false,
      description: 'Check if this links to an external website',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
      description: 'Open link in a new tab/window',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Show/hide this menu item',
    }),
    defineField({
      name: 'hasDropdown',
      title: 'Has Dropdown',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'dropdownItems',
      title: 'Dropdown Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'slug',
              title: 'Link',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'page',
              title: 'Internal Page',
              type: 'reference',
              to: [{ type: 'page' }],
            },
          ],
        },
      ],
      hidden: ({ document }) => !document?.hasDropdown,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug',
      order: 'order',
    },
    prepare(selection) {
      const { title, subtitle, order } = selection
      return {
        title,
        subtitle: `${order}. ${subtitle}`,
      }
    },
  },
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})