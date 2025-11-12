'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { PageBuilderAPIV2 as PageBuilderAPI } from '@/lib/page-builder-api-v2'
import { VisualEditor } from '@/components/builder/VisualEditor'
import type { PageV2 } from '@/lib/page-builder-api-v2'

export default function BuilderPage() {
  const params = useParams()
  const pageId = params.pageId as string
  
  const [page, setPage] = useState<PageV2 | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadPage()
  }, [pageId])

  const loadPage = async () => {
    try {
      setLoading(true)
      const data = await PageBuilderAPI.getPageById(pageId)
      if (!data) {
        setError('Page not found')
        return
      }
      setPage(data)
    } catch (err: any) {
      console.error('Error loading page:', err)
      setError(err.message || 'Failed to load page')
    } finally {
      setLoading(false)
    }
  }

  const handlePageUpdate = (updatedPage: PageV2) => {
    setPage(updatedPage)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading page builder...</p>
        </div>
      </div>
    )
  }

  if (error || !page) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️</div>
          <p className="text-gray-900 font-semibold mb-2">Error Loading Page</p>
          <p className="text-gray-600">{error || 'Page not found'}</p>
        </div>
      </div>
    )
  }

  return (
    <VisualEditor 
      page={page} 
      onPageUpdate={handlePageUpdate}
    />
  )
}
