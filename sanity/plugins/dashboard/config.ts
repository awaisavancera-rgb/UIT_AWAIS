import { DashboardConfig } from '@sanity/dashboard'

export const dashboardConfig: DashboardConfig = {
  widgets: [
    {
      name: 'document-stats',
      layout: { width: 'medium', height: 'small' }
    },
    {
      name: 'quick-actions', 
      layout: { width: 'small', height: 'medium' }
    },
    {
      name: 'recent-activity',
      layout: { width: 'medium', height: 'medium' }
    },
    {
      name: 'recent-documents',
      layout: { width: 'large', height: 'medium' }
    },
    {
      name: 'analytics-overview',
      layout: { width: 'large', height: 'large' }
    }
  ]
}