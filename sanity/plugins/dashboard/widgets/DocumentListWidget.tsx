import React, { useEffect, useState } from 'react'
import { Card, Stack, Text, Flex, Badge, Button, Spinner, Select } from '@sanity/ui'
import { useClient } from 'sanity'
import { useRouter } from 'sanity/router'
import { EditIcon, EyeOpenIcon, CalendarIcon } from '@sanity/icons'

interface Document {
  _id: string
  _type: string
  title?: string
  name?: string
  _updatedAt: string
  status?: string
  publishedAt?: string
  startDate?: string
}

export function DocumentListWidget() {
  const client = useClient()
  const router = useRouter()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState('course')

  const documentTypes = [
    { value: 'course', label: 'Courses' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'event', label: 'Events' },
    { value: 'blogPost', label: 'Blog Posts' }
  ]

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true)
        const docs = await client.fetch(`
          *[_type == "${selectedType}"] 
          | order(_updatedAt desc)[0...8] {
            _id,
            _type,
            title,
            name,
            _updatedAt,
            publishedAt,
            startDate,
            "status": select(
              _type == "course" => "published",
              _type == "blogPost" => select(publishedAt != null => "published", "draft"),
              _type == "event" => select(startDate > now() => "upcoming", "past"),
              "active"
            )
          }
        `)

        setDocuments(docs)
      } catch (error) {
        console.error('Error fetching documents:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [client, selectedType])

  if (loading) {
    return (
      <Card padding={4} radius={3}>
        <Flex align="center" justify="center" style={{ minHeight: '400px' }}>
          <Spinner muted />
        </Flex>
      </Card>
    )
  }

  return (
    <Card padding={4} radius={3}>
      <Stack space={4}>
        <Flex align="center" justify="space-between">
          <Text size={2} weight="semibold">Recent Documents</Text>
          <Select
            value={selectedType}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setSelectedType(event.currentTarget.value)}
            fontSize={1}
          >
            {documentTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </Select>
        </Flex>
        
        <Stack space={2}>
          {documents.length === 0 ? (
            <Text muted>No documents found</Text>
          ) : (
            documents.map((doc) => (
              <DocumentItem key={doc._id} document={doc} />
            ))
          )}
        </Stack>
      </Stack>
    </Card>
  )
}

function DocumentItem({ document }: { document: Document }) {
  const router = useRouter()
  
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'published': return 'positive'
      case 'draft': return 'caution'
      case 'upcoming': return 'primary'
      case 'past': return 'default'
      default: return 'default'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getDocumentTitle = () => {
    return document.title || document.name || 'Untitled'
  }

  const handleEdit = () => {
    router.navigateIntent('edit', { id: document._id, type: document._type })
  }

  const handleView = () => {
    // In a real implementation, this would navigate to the document preview
    console.log('View document:', document._id)
  }

  return (
    <Card padding={3} radius={2} tone="transparent" border>
      <Flex align="center" justify="space-between">
        <Stack space={1} flex={1}>
          <Flex align="center" gap={2}>
            <Text size={1} weight="medium">
              {getDocumentTitle()}
            </Text>
            {document.status && (
              <Badge tone={getStatusColor(document.status)} fontSize={0}>
                {document.status}
              </Badge>
            )}
          </Flex>
          
          <Flex align="center" gap={2}>
            <CalendarIcon style={{ fontSize: '12px' }} />
            <Text size={0} muted>
              Updated {formatDate(document._updatedAt)}
            </Text>
            {document.publishedAt && (
              <>
                <Text size={0} muted>•</Text>
                <Text size={0} muted>
                  Published {formatDate(document.publishedAt)}
                </Text>
              </>
            )}
          </Flex>
        </Stack>
        
        <Flex gap={1}>
          <Button
            mode="ghost"
            icon={EyeOpenIcon}
            onClick={handleView}
            fontSize={0}
            padding={2}
            title="View document"
          />
          <Button
            mode="ghost"
            icon={EditIcon}
            onClick={handleEdit}
            fontSize={0}
            padding={2}
            title="Edit document"
          />
        </Flex>
      </Flex>
    </Card>
  )
}