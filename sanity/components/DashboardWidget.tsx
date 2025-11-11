import React from 'react'
import { Card, Stack, Text, Flex, Badge } from '@sanity/ui'

interface DashboardWidgetProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  icon?: React.ReactNode
  color?: 'primary' | 'success' | 'warning' | 'danger'
}

export function DashboardWidget({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon,
  color = 'primary'
}: DashboardWidgetProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'positive'
      case 'down': return 'critical'
      default: return 'default'
    }
  }

  const getCardTone = () => {
    switch (color) {
      case 'success': return 'positive'
      case 'warning': return 'caution'
      case 'danger': return 'critical'
      default: return 'default'
    }
  }

  return (
    <Card 
      padding={4} 
      radius={3} 
      shadow={1} 
      tone={getCardTone()}
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none'
      }}
    >
      <Stack space={3}>
        <Flex align="center" justify="space-between">
          <Text size={1} weight="medium" style={{ color: 'rgba(255,255,255,0.8)' }}>
            {title}
          </Text>
          {icon && (
            <div style={{ color: 'rgba(255,255,255,0.9)' }}>
              {icon}
            </div>
          )}
        </Flex>
        
        <Text size={4} weight="bold" style={{ color: 'white' }}>
          {value}
        </Text>
        
        {(subtitle || trendValue) && (
          <Flex align="center" gap={2}>
            {subtitle && (
              <Text size={1} style={{ color: 'rgba(255,255,255,0.7)' }}>
                {subtitle}
              </Text>
            )}
            {trendValue && (
              <Badge tone={getTrendColor()} fontSize={0}>
                {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'} {trendValue}
              </Badge>
            )}
          </Flex>
        )}
      </Stack>
    </Card>
  )
}

export default DashboardWidget