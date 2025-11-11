import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { dashboardTool } from '@sanity/dashboard'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/structure'
import CustomLogo from './sanity/components/CustomLogo'

export default defineConfig({
  name: 'uit-university',
  title: 'UIT University CMS',
  projectId: 'cgip4fq9',
  dataset: 'production',

  plugins: [
    dashboardTool({
      widgets: [
        {
          name: 'document-list',
          options: {
            title: 'Recent Posts',
            order: '_createdAt desc',
            types: ['course', 'faculty', 'event', 'blogPost'],
            limit: 10
          }
        },
        {
          name: 'project-info',
          options: {
            title: 'UIT University CMS',
            description: 'Content Management System for University Website',
            data: [
              {
                title: 'Total Courses',
                value: 'Dynamic count via GROQ'
              },
              {
                title: 'Faculty Members', 
                value: 'Dynamic count via GROQ'
              },
              {
                title: 'Upcoming Events',
                value: 'Dynamic count via GROQ'
              }
            ]
          }
        },
        {
          name: 'project-users',
          layout: { width: 'small' }
        }
      ]
    }),
    structureTool({
      structure,
      title: 'Content',
    }),
    visionTool({
      title: 'GROQ',
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  studio: {
    components: {
      logo: CustomLogo,
      layout: (props) => {
        // Import custom CSS
        if (typeof document !== 'undefined') {
          const existingLink = document.querySelector('link[href*="studio.css"]')
          if (!existingLink) {
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.type = 'text/css'
            link.href = '/sanity/studio.css'
            document.head.appendChild(link)
          }
        }
        return props.renderDefault(props)
      },
    },
  },
})