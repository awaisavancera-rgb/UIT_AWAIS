import { definePlugin } from 'sanity'
import { dashboardTool } from '@sanity/dashboard'
import { StatsWidget } from './widgets/StatsWidget'
import { RecentActivityWidget } from './widgets/RecentActivityWidget'
import { QuickActionsWidget } from './widgets/QuickActionsWidget'
import { DocumentListWidget } from './widgets/DocumentListWidget'
import { AnalyticsWidget } from './widgets/AnalyticsWidget'

export const customDashboard = definePlugin({
  name: 'custom-dashboard',
  plugins: [
    dashboardTool({
      widgets: [
        {
          name: 'document-stats',
          component: StatsWidget,
          layout: { width: 'medium', height: 'small' }
        },
        {
          name: 'recent-activity',
          component: RecentActivityWidget,
          layout: { width: 'medium', height: 'medium' }
        },
        {
          name: 'quick-actions',
          component: QuickActionsWidget,
          layout: { width: 'small', height: 'small' }
        },
        {
          name: 'recent-documents',
          component: DocumentListWidget,
          layout: { width: 'large', height: 'medium' }
        },
        {
          name: 'analytics-overview',
          component: AnalyticsWidget,
          layout: { width: 'large', height: 'large' }
        }
      ]
    })
  ]
})