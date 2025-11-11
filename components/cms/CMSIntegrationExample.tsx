'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import CoursesFromCMS from './CoursesFromCMS'
import TestimonialsFromCMS from './TestimonialsFromCMS'

// This component shows how to toggle between static and CMS data
export default function CMSIntegrationExample() {
  const [useCMS, setUseCMS] = useState(false)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className={`text-sm ${!useCMS ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>
            Static Data
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setUseCMS(!useCMS)}
            className="relative"
          >
            <div className={`w-12 h-6 rounded-full transition-colors ${useCMS ? 'bg-primary' : 'bg-muted'}`}>
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ${useCMS ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`} />
            </div>
          </Button>
          <span className={`text-sm ${useCMS ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>
            CMS Data
          </span>
        </div>
        
        {useCMS ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 text-sm">
              🎉 <strong>CMS Mode Active!</strong> Content is now being fetched from your headless CMS.
              {!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && (
                <span className="block mt-2 text-green-700">
                  ⚠️ Configure your CMS credentials in <code>.env.local</code> to see live data.
                </span>
              )}
            </p>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm">
              📝 <strong>Static Mode Active!</strong> Showing hardcoded content for development.
            </p>
          </div>
        )}
      </div>

      {/* Courses Section */}
      <section className="py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Academic Courses {useCMS ? '(From CMS)' : '(Static)'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {useCMS 
              ? 'Content managed through your headless CMS' 
              : 'Hardcoded content for development'
            }
          </p>
        </div>
        
        {useCMS ? (
          <CoursesFromCMS />
        ) : (
          <div className="text-center py-8 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">Static courses would be displayed here</p>
          </div>
        )}
      </section>

      {/* Testimonials Section */}
      <section className="py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Student Testimonials {useCMS ? '(From CMS)' : '(Static)'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {useCMS 
              ? 'Real testimonials from your CMS' 
              : 'Sample testimonials for development'
            }
          </p>
        </div>
        
        {useCMS ? (
          <TestimonialsFromCMS />
        ) : (
          <div className="text-center py-8 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">Static testimonials would be displayed here</p>
          </div>
        )}
      </section>
    </div>
  )
}