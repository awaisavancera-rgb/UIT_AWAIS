import React from 'react'
import { Card, Stack, Text, Button, Grid } from '@sanity/ui'
import { useRouter } from 'sanity/router'
import { AddIcon, UsersIcon, CalendarIcon, DocumentIcon, CogIcon, ChartUpwardIcon } from '@sanity/icons'

interface QuickAction {
  title: string
  description: string
  icon: React.ComponentType
  action: () => void
  color: string
}

export function QuickActionsWidget() {
  const router = useRouter()

  const quickActions: QuickAction[] = [
    {
      title: 'New Course',
      description: 'Create a new course',
      icon: AddIcon,
      action: () => router.navigateIntent('create', { type: 'course' }),
      color: '#667eea'
    },
    {
      title: 'Add Faculty',
      description: 'Add new faculty member',
      icon: UsersIcon,
      action: () => router.navigateIntent('create', { type: 'faculty' }),
      color: '#764ba2'
    },
    {
      title: 'New Event',
      description: 'Schedule an event',
      icon: CalendarIcon,
      action: () => router.navigateIntent('create', { type: 'event' }),
      color: '#f093fb'
    },
    {
      title: 'Write Post',
      description: 'Create blog post',
      icon: DocumentIcon,
      action: () => router.navigateIntent('create', { type: 'blogPost' }),
      color: '#f5576c'
    },
    {
      title: 'Analytics',
      description: 'View site analytics',
      icon: ChartUpwardIcon,
      action: () => console.log('Navigate to analytics'),
      color: '#4ade80'
    },
    {
      title: 'Settings',
      description: 'Site configuration',
      icon: CogIcon,
      action: () => router.navigateIntent('edit', { id: 'siteSettings', type: 'siteSettings' }),
      color: '#64748b'
    }
  ]

  return (
    <Card padding={4} radius={3}>
      <Stack space={4}>
        <Text size={2} weight="semibold">Quick Actions</Text>
        
        <Grid columns={2} gap={2}>
          {quickActions.map((action, index) => (
            <QuickActionButton key={index} action={action} />
          ))}
        </Grid>
      </Stack>
    </Card>
  )
}

function QuickActionButton({ action }: { action: QuickAction }) {
  const Icon = action.icon
  
  return (
    <Button
      mode="ghost"
      padding={3}
      radius={2}
      onClick={action.action}
      style={{
        height: 'auto',
        textAlign: 'left',
        border: `1px solid ${action.color}30`,
        background: `linear-gradient(135deg, ${action.color}10, ${action.color}05)`
      }}
    >
      <Stack space={2}>
        <Icon />
        <Stack space={1}>
          <Text size={1} weight="medium">{action.title}</Text>
          <Text size={0} muted>{action.description}</Text>
        </Stack>
      </Stack>
    </Button>
  )
}