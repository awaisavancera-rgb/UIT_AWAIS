import React from 'react'
import { Card, Container, Stack, Text, Flex, Grid } from '@sanity/ui'
import { DashboardIcon } from '@sanity/icons'
import { StatsWidget } from './widgets/StatsWidget'
import { RecentActivityWidget } from './widgets/RecentActivityWidget'
import { QuickActionsWidget } from './widgets/QuickActionsWidget'
import { DocumentListWidget } from './widgets/DocumentListWidget'
import { AnalyticsWidget } from './widgets/AnalyticsWidget'

export function Dashboard() {
  // Load custom styles
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      const existingLink = document.querySelector('link[href*="dashboard.css"]')
      if (!existingLink) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.type = 'text/css'
        link.href = '/sanity/plugins/dashboard/styles/dashboard.css'
        document.head.appendChild(link)
      }
    }
  }, [])

  return (
    <Container width={5} style={{ padding: '2rem' }}>
      <Stack space={5}>
        {/* Dashboard Header */}
        <Flex align="center" gap={3}>
          <DashboardIcon style={{ fontSize: '28px', color: '#667eea' }} />
          <Stack space={1}>
            <Text size={4} weight="bold">UIT University Dashboard</Text>
            <Text size={1} muted>Content management overview</Text>
          </Stack>
        </Flex>
        
        {/* Dashboard Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '1.5rem',
          gridAutoRows: 'min-content'
        }}>
          {/* Stats Widget - spans 8 columns */}
          <div style={{ gridColumn: 'span 8' }}>
            <StatsWidget />
          </div>
          
          {/* Quick Actions - spans 4 columns */}
          <div style={{ gridColumn: 'span 4' }}>
            <QuickActionsWidget />
          </div>
          
          {/* Recent Activity - spans 6 columns */}
          <div style={{ gridColumn: 'span 6' }}>
            <RecentActivityWidget />
          </div>
          
          {/* Document List - spans 6 columns */}
          <div style={{ gridColumn: 'span 6' }}>
            <DocumentListWidget />
          </div>
          
          {/* Analytics Widget - spans full width */}
          <div style={{ gridColumn: 'span 12' }}>
            <AnalyticsWidget />
          </div>
        </div>
      </Stack>
    </Container>
  )
}

export default Dashboard