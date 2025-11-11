import React from 'react'
import { Card, Container, Stack, Text, Flex } from '@sanity/ui'
import { DashboardIcon } from '@sanity/icons'

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
}

export function DashboardLayout({ children, title = 'Dashboard' }: DashboardLayoutProps) {
  return (
    <Container width={5} style={{ padding: '2rem' }}>
      <Stack space={5}>
        <Flex align="center" gap={3}>
          <DashboardIcon style={{ fontSize: '24px', color: '#667eea' }} />
          <Text size={4} weight="bold">{title}</Text>
        </Flex>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          gridAutoRows: 'min-content'
        }}>
          {children}
        </div>
      </Stack>
    </Container>
  )
}