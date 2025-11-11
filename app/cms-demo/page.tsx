import CMSIntegrationExample from '@/components/cms/CMSIntegrationExample'
import CMSStatus from '@/components/cms/CMSStatus'

export default function CMSDemoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Headless CMS Integration</h1>
          <p className="text-xl opacity-90">
            Manage your content dynamically with Sanity CMS
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* CMS Status */}
        <div className="mb-16 flex justify-center">
          <CMSStatus />
        </div>

        {/* Integration Example */}
        <CMSIntegrationExample />

        {/* Documentation */}
        <div className="mt-16 bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">📚 Documentation</h2>
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground mb-4">
              This demo shows how your UIT University website can be powered by a headless CMS. 
              Content can be managed by non-technical users through a user-friendly interface.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-background p-6 rounded-lg">
                <h3 className="font-semibold mb-3">✨ Benefits</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Easy content management</li>
                  <li>• Real-time updates</li>
                  <li>• Multi-user collaboration</li>
                  <li>• Version control</li>
                  <li>• Media management</li>
                  <li>• SEO optimization</li>
                </ul>
              </div>
              
              <div className="bg-background p-6 rounded-lg">
                <h3 className="font-semibold mb-3">🛠️ Features</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Course management</li>
                  <li>• Student testimonials</li>
                  <li>• Blog posts</li>
                  <li>• Event listings</li>
                  <li>• Faculty profiles</li>
                  <li>• Hero content</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}