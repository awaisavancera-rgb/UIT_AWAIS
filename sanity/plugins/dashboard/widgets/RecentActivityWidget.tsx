import React, { useEffect, useState } from 'react'
import { Card, Stack, Text, Flex, Badge, Avatar, Spinner } from '@sanity/ui'
import { useClient } from 'sanity'
import { ClockIcon, EditIcon, AddIcon, PublishIcon } from '@sanity/icons'

interface ActivityItem {
  id: string
  type: 'created' | 'updated' | 'published' | 'deleted'
  documentType: string
  documentTitle: string
  user: string
  timestamp: string
  status?: string
}

export function RecentActivityWidget() {
  const client = useClient()
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        // Fetch recently modified documents
        const recentDocs = await client.fetch(`
          *[_type in ["course", "faculty", "event", "blogPost", "testimonial"]] 
          | order(_updatedAt desc)[0...10] {
            _id,
            _type,
            _createdAt,
            _updatedAt,
            title,
            name,
            "status": select(
              _type == "course" => "published",
              _type == "blogPost" => select(publishedAt != null => "published", "draft"),
              _type == "event" => select(startDate > now() => "upcoming", "past"),
              "active"
            )
          }
        `)

        const activityData: ActivityItem[] = recentDocs.map((doc: any) => ({
          id: doc._id,
          type: doc._createdAt === doc._updatedAt ? 'created' : 'updated',
          documentType: doc._type,
          documentTitle: doc.title || doc.name || 'Untitled',
          user: 'Admin', // In a real app, you'd get this from the document history
          timestamp: doc._updatedAt,
          status: doc.status
        }))

        setActivities(activityData)
      } catch (error) {
        console.error('Error fetching recent activity:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentActivity()
  }, [client])

  if (loading) {
    return (
      <Card padding={4} radius={3}>
        <Flex align="center" justify="center" style={{ minHeight: '300px' }}>
          <Spinner muted />
        </Flex>
      </Card>
    )
  }

  return (
    <Card padding={4} radius={3}>
      <Stack space={4}>
        <Flex align="center" justify="space-between">
          <Text size={2} weight="semibold">Recent Activity</Text>
          <ClockIcon />
        </Flex>
        
        <Stack space={3}>
          {activities.length === 0 ? (
            <Text muted>No recent activity</Text>
          ) : (
            activities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))
          )}
        </Stack>
      </Stack>
    </Card>
  )
}

function ActivityItem({ activity }: { activity: ActivityItem }) {
  const getActivityIcon = () => {
    switch (activity.type) {
      case 'created': return <AddIcon style={{ color: '#10b981' }} />
      case 'updated': return <EditIcon style={{ color: '#f59e0b' }} />
      case 'published': return <PublishIcon style={{ color: '#3b82f6' }} />
      default: return <EditIcon />
    }
  }

  const getActivityColor = () => {
    switch (activity.type) {
      case 'created': return 'positive'
      case 'updated': return 'caution'
      case 'published': return 'primary'
      default: return 'default'
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const formatDocumentType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1')
  }

  return (
    <Card padding={3} radius={2} tone="transparent" border>
      <Flex align="center" gap={3}>
        <div style={{ flexShrink: 0 }}>
          {getActivityIcon()}
        </div>
        
        <Stack space={1} flex={1}>
          <Flex align="center" gap={2}>
            <Text size={1} weight="medium">
              {activity.documentTitle}
            </Text>
            <Badge tone={getActivityColor() as any} fontSize={0}>
              {activity.type}
            </Badge>
          </Flex>
          
          <Flex align="center" gap={2}>
            <Text size={0} muted>
              {formatDocumentType(activity.documentType)}
            </Text>
            {activity.status && (
              <>
                <Text size={0} muted>•</Text>
                <Badge tone="default" fontSize={0}>
                  {activity.status}
                </Badge>
              </>
            )}
          </Flex>
        </Stack>
        
        <Text size={0} muted style={{ flexShrink: 0 }}>
          {formatTime(activity.timestamp)}
        </Text>
      </Flex>
    </Card>
  )
}