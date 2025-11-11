'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, AlertCircle, ExternalLink } from 'lucide-react'
import { client } from '@/lib/sanity'

export default function CMSStatus() {
  const [status, setStatus] = useState<{
    connected: boolean
    projectId: string | null
    dataset: string | null
    error: string | null
  }>({
    connected: false,
    projectId: null,
    dataset: null,
    error: null
  })

  useEffect(() => {
    async function checkConnection() {
      try {
        const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
        const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

        if (!projectId || projectId === 'your-project-id-here') {
          setStatus({
            connected: false,
            projectId: null,
            dataset: null,
            error: 'Project ID not configured'
          })
          return
        }

        // Try a simple query to test connection
        if (!client) {
          throw new Error('Sanity client not initialized')
        }
        await client.fetch('{"test": true}')
        
        setStatus({
          connected: true,
          projectId,
          dataset: dataset || 'production',
          error: null
        })
      } catch (error) {
        setStatus({
          connected: false,
          projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || null,
          dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || null,
          error: error instanceof Error ? error.message : 'Connection failed'
        })
      }
    }

    checkConnection()
  }, [])

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {status.connected ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
          CMS Connection Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status:</span>
          <Badge variant={status.connected ? "default" : "destructive"}>
            {status.connected ? 'Connected' : 'Disconnected'}
          </Badge>
        </div>

        {status.projectId && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Project ID:</span>
            <code className="text-xs bg-muted px-2 py-1 rounded">
              {status.projectId}
            </code>
          </div>
        )}

        {status.dataset && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Dataset:</span>
            <code className="text-xs bg-muted px-2 py-1 rounded">
              {status.dataset}
            </code>
          </div>
        )}

        {status.error && (
          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-red-700">
              <strong>Error:</strong> {status.error}
            </div>
          </div>
        )}

        {!status.connected && (
          <div className="space-y-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900">Setup Required:</h4>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Create a Sanity account at sanity.io</li>
              <li>Create a new project and note the Project ID</li>
              <li>Update your .env.local file with the credentials</li>
              <li>Add content schemas to your Sanity studio</li>
            </ol>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-3"
              onClick={() => window.open('https://sanity.io', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Go to Sanity.io
            </Button>
          </div>
        )}

        {status.connected && (
          <div className="space-y-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="text-sm font-semibold text-green-900">✅ CMS Connected!</h4>
            <p className="text-sm text-green-800">
              Your headless CMS is properly configured and ready to use.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-3"
              onClick={() => window.open(`https://${status.projectId}.sanity.studio`, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Sanity Studio
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}