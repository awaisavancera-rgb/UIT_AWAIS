import React, { useEffect, useState } from 'react'
import { Card, Stack, Text, Flex, Grid, Spinner } from '@sanity/ui'
import { useClient } from 'sanity'
import { ChartUpwardIcon } from '@sanity/icons'

interface AnalyticsData {
  totalViews: number
  totalDocuments: number
  publishedThisMonth: number
  draftDocuments: number
  monthlyGrowth: number
  popularContent: Array<{
    title: string
    type: string
    views: number
  }>
}

export function AnalyticsWidget() {
  const client = useClient()
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Simulate analytics data - in a real app, this would come from your analytics service
        const [
          totalDocs,
          publishedThisMonth,
          draftDocs,
          recentCourses,
          recentBlogPosts
        ] = await Promise.all([
          client.fetch('count(*[_type in ["course", "faculty", "event", "blogPost", "testimonial"]])'),
          client.fetch(`count(*[_type in ["course", "blogPost", "event"] && _createdAt >= "${getCurrentMonthStart()}"])`),
          client.fetch('count(*[_type == "blogPost" && !defined(publishedAt)])'),
          client.fetch('*[_type == "course"][0...3]{ title, _type }'),
          client.fetch('*[_type == "blogPost"][0...3]{ title, _type }')
        ])

        // Simulate view counts and growth
        const mockAnalytics: AnalyticsData = {
          totalViews: Math.floor(Math.random() * 10000) + 5000,
          totalDocuments: totalDocs,
          publishedThisMonth,
          draftDocuments: draftDocs,
          monthlyGrowth: Math.floor(Math.random() * 30) + 5,
          popularContent: [
            ...recentCourses.map((course: any) => ({
              title: course.title,
              type: 'Course',
              views: Math.floor(Math.random() * 500) + 100
            })),
            ...recentBlogPosts.map((post: any) => ({
              title: post.title,
              type: 'Blog Post',
              views: Math.floor(Math.random() * 300) + 50
            }))
          ].slice(0, 5)
        }

        setAnalytics(mockAnalytics)
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [client])

  if (loading) {
    return (
      <Card padding={4} radius={3}>
        <Flex align="center" justify="center" style={{ minHeight: '400px' }}>
          <Spinner muted />
        </Flex>
      </Card>
    )
  }

  if (!analytics) {
    return (
      <Card padding={4} radius={3}>
        <Text>Failed to load analytics data</Text>
      </Card>
    )
  }

  return (
    <Card padding={4} radius={3}>
      <Stack space={4}>
        <Flex align="center" gap={2}>
          <ChartUpwardIcon />
          <Text size={2} weight="semibold">Analytics Overview</Text>
        </Flex>
        
        <Grid columns={[1, 2, 4]} gap={3}>
          <MetricCard
            title="Total Views"
            value={analytics.totalViews.toLocaleString()}
            trend={analytics.monthlyGrowth}
            color="#667eea"
          />
          <MetricCard
            title="Total Content"
            value={analytics.totalDocuments.toString()}
            trend={15}
            color="#764ba2"
          />
          <MetricCard
            title="Published This Month"
            value={analytics.publishedThisMonth.toString()}
            trend={analytics.monthlyGrowth}
            color="#f093fb"
          />
          <MetricCard
            title="Draft Content"
            value={analytics.draftDocuments.toString()}
            trend={-5}
            color="#f5576c"
          />
        </Grid>

        <Stack space={3}>
          <Text size={1} weight="medium">Popular Content</Text>
          <Stack space={2}>
            {analytics.popularContent.map((item, index) => (
              <PopularContentItem key={index} item={item} />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  )
}

function MetricCard({ title, value, trend, color }: {
  title: string
  value: string
  trend: number
  color: string
}) {
  return (
    <Card 
      padding={3} 
      radius={2}
      style={{
        background: `linear-gradient(135deg, ${color}20, ${color}10)`,
        border: `1px solid ${color}30`
      }}
    >
      <Stack space={2}>
        <Text size={0} muted>{title}</Text>
        <Text size={2} weight="bold">{value}</Text>
        <Flex align="center" gap={1}>
          <Text 
            size={0} 
            style={{ color: trend > 0 ? '#10b981' : '#ef4444' }}
          >
            {trend > 0 ? '↗ +' : trend < 0 ? '↘ ' : '→ '}{trend}%
          </Text>
        </Flex>
      </Stack>
    </Card>
  )
}

function PopularContentItem({ item }: {
  item: { title: string; type: string; views: number }
}) {
  return (
    <Card padding={2} radius={1} tone="transparent" border>
      <Flex align="center" justify="space-between">
        <Stack space={1}>
          <Text size={1}>{item.title}</Text>
          <Text size={0} muted>{item.type}</Text>
        </Stack>
        <Text size={0} weight="medium">{item.views} views</Text>
      </Flex>
    </Card>
  )
}

function getCurrentMonthStart(): string {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
}