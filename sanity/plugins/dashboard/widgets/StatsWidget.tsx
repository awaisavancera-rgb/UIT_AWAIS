import React, { useEffect, useState } from 'react'
import { Card, Grid, Stack, Text, Flex, Badge, Spinner } from '@sanity/ui'
import { useClient } from 'sanity'
import { UsersIcon, DocumentIcon, CalendarIcon, CommentIcon } from '@sanity/icons'

interface StatItem {
    title: string
    value: number
    change: number
    changeType: 'increase' | 'decrease' | 'neutral'
    icon: React.ComponentType
    color: string
}

export function StatsWidget() {
    const client = useClient()
    const [stats, setStats] = useState<StatItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const queries = [
                    client.fetch('count(*[_type == "course"])'),
                    client.fetch('count(*[_type == "faculty"])'),
                    client.fetch('count(*[_type == "event"])'),
                    client.fetch('count(*[_type == "blogPost"])'),
                    client.fetch('count(*[_type == "testimonial"])'),
                    // Previous month counts for comparison
                    client.fetch(`count(*[_type == "course" && _createdAt >= "${getPreviousMonthStart()}" && _createdAt < "${getCurrentMonthStart()}"]) `),
                    client.fetch(`count(*[_type == "faculty" && _createdAt >= "${getPreviousMonthStart()}" && _createdAt < "${getCurrentMonthStart()}"]) `),
                    client.fetch(`count(*[_type == "event" && _createdAt >= "${getPreviousMonthStart()}" && _createdAt < "${getCurrentMonthStart()}"]) `),
                    client.fetch(`count(*[_type == "blogPost" && _createdAt >= "${getPreviousMonthStart()}" && _createdAt < "${getCurrentMonthStart()}"]) `),
                ]

                const [
                    totalCourses, totalFaculty, totalEvents, totalBlogPosts, totalTestimonials,
                    prevCourses, prevFaculty, prevEvents, prevBlogPosts
                ] = await Promise.all(queries)

                const statsData: StatItem[] = [
                    {
                        title: 'Total Courses',
                        value: totalCourses,
                        change: calculateChange(totalCourses, prevCourses),
                        changeType: getChangeType(totalCourses, prevCourses),
                        icon: DocumentIcon,
                        color: '#667eea'
                    },
                    {
                        title: 'Faculty Members',
                        value: totalFaculty,
                        change: calculateChange(totalFaculty, prevFaculty),
                        changeType: getChangeType(totalFaculty, prevFaculty),
                        icon: UsersIcon,
                        color: '#764ba2'
                    },
                    {
                        title: 'Events',
                        value: totalEvents,
                        change: calculateChange(totalEvents, prevEvents),
                        changeType: getChangeType(totalEvents, prevEvents),
                        icon: CalendarIcon,
                        color: '#f093fb'
                    },
                    {
                        title: 'Blog Posts',
                        value: totalBlogPosts,
                        change: calculateChange(totalBlogPosts, prevBlogPosts),
                        changeType: getChangeType(totalBlogPosts, prevBlogPosts),
                        icon: CommentIcon,
                        color: '#f5576c'
                    }
                ]

                setStats(statsData)
            } catch (error) {
                console.error('Error fetching stats:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [client])

    if (loading) {
        return (
            <Card padding={4} radius={3}>
                <Flex align="center" justify="center" style={{ minHeight: '200px' }}>
                    <Spinner muted />
                </Flex>
            </Card>
        )
    }

    return (
        <Card padding={4} radius={3}>
            <Stack space={4}>
                <Text size={2} weight="semibold">Content Statistics</Text>
                <Grid columns={2} gap={3}>
                    {stats.map((stat, index) => (
                        <StatCard key={index} stat={stat} />
                    ))}
                </Grid>
            </Stack>
        </Card>
    )
}

function StatCard({ stat }: { stat: StatItem }) {
    const Icon = stat.icon

    return (
        <Card
            padding={3}
            radius={2}
            shadow={1}
            style={{
                background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                border: `1px solid ${stat.color}30`
            }}
        >
            <Stack space={3}>
                <Flex align="center" justify="space-between">
                    <Text size={1} muted>{stat.title}</Text>
                    <Icon />
                </Flex>

                <Text size={3} weight="bold">{stat.value}</Text>

                <Flex align="center" gap={2}>
                    <Badge
                        tone={stat.changeType === 'increase' ? 'positive' : stat.changeType === 'decrease' ? 'critical' : 'default'}
                        fontSize={0}
                    >
                        {stat.change > 0 ? '↗ +' : stat.change < 0 ? '↘ ' : '→ '}{stat.change}%
                    </Badge>
                    <Text size={0} muted>vs last month</Text>
                </Flex>
            </Stack>
        </Card>
    )
}

function calculateChange(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0
    return Math.round(((current - previous) / previous) * 100)
}

function getChangeType(current: number, previous: number): 'increase' | 'decrease' | 'neutral' {
    if (current > previous) return 'increase'
    if (current < previous) return 'decrease'
    return 'neutral'
}

function getCurrentMonthStart(): string {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
}

function getPreviousMonthStart(): string {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString()
}