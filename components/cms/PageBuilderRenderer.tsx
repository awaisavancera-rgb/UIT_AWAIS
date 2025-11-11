'use client'

import React from 'react'
import FacultySection from '@/components/sections/FacultySection'
import CMSIntegrationExample from '@/components/cms/CMSIntegrationExample'
import AceternityTimeline from '@/components/ui/aceternity-timeline'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Section = {
  _key?: string
  key?: string
  type: string
  props?: {
    title?: string
    subtitle?: string
    content?: any
    backgroundImage?: any
  }
}

export default function PageBuilderRenderer({ sections }: { sections: Section[] }) {
  if (!sections || sections.length === 0) {
    return null
  }

  return (
    <div className="space-y-16">
      {sections.map((section, index) => {
        const key = section._key || section.key || `section-${index}`
        switch (section.type) {
          case 'hero':
            return (
              <div key={key} className="relative w-full h-[360px] md:h-[480px] rounded-xl overflow-hidden bg-muted">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/25">
                  {section?.props?.title && (
                    <h1 className="text-white text-3xl md:text-5xl font-bold mb-3">{section.props.title}</h1>
                  )}
                  {section?.props?.subtitle && (
                    <p className="text-white/90 text-base md:text-lg max-w-2xl">{section.props.subtitle}</p>
                  )}
                </div>
              </div>
            )
          case 'courses':
            return (
              <div key={key} className="container mx-auto px-4">
                <CMSIntegrationExample />
              </div>
            )
          case 'faculty':
            return (
              <div key={key} className="container mx-auto px-4">
                <FacultySection />
              </div>
            )
          case 'testimonials':
            return (
              <div key={key} className="container mx-auto px-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{section?.props?.title || 'Testimonials'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Placeholder: reuse Courses/Testimonials CMS block if needed */}
                    <div className="text-muted-foreground">Testimonials component goes here.</div>
                  </CardContent>
                </Card>
              </div>
            )
          case 'timeline':
            return (
              <div key={key} className="container mx-auto px-4">
                <AceternityTimeline />
              </div>
            )
          case 'richText':
            return (
              <div key={key} className="container mx-auto px-4 prose dark:prose-invert max-w-none">
                {/* Render rich text simply as JSON for MVP; can integrate PortableText later */}
                <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
{JSON.stringify(section?.props?.content, null, 2)}
                </pre>
              </div>
            )
          default:
            return (
              <div key={key} className="container mx-auto px-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Unknown section type: {section.type}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-muted-foreground text-sm">No renderer configured yet.</div>
                  </CardContent>
                </Card>
              </div>
            )
        }
      })}
    </div>
  )
}

