'use client'

// ============================================================================
// COMPONENT RENDERER - Dynamic Component Mapping
// Maps component_type strings to actual React components
// ============================================================================

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Import all component implementations
// These are the actual React components that render the content
const HeroSlideshow = dynamic(() => import('@/components/sections/HeroSlideshow'), { ssr: false })
const ProgramGrid = dynamic(() => import('@/components/sections/ProgramGrid'), { ssr: false })
const LeadershipProfiles = dynamic(() => import('@/components/sections/LeadershipProfiles'), { ssr: false })
const NewsEventsFeed = dynamic(() => import('@/components/sections/NewsEventsFeed'), { ssr: false })
const QuickLinks = dynamic(() => import('@/components/sections/QuickLinks'), { ssr: false })
const HeroBanner = dynamic(() => import('@/components/sections/HeroBanner'), { ssr: false })
const FacultyGrid = dynamic(() => import('@/components/sections/FacultyGrid'), { ssr: false })
const CourseShowcase = dynamic(() => import('@/components/sections/CourseShowcase'), { ssr: false })
const TextContent = dynamic(() => import('@/components/sections/TextContent'), { ssr: false })
const CTABanner = dynamic(() => import('@/components/sections/CTABanner'), { ssr: false })

// ============================================================================
// COMPONENT REGISTRY
// Central mapping of component_type to React component
// ============================================================================
const COMPONENT_REGISTRY: Record<string, React.ComponentType<any>> = {
  // UIT-specific components
  'hero_slideshow': HeroSlideshow,
  'program_grid': ProgramGrid,
  'leadership_profiles': LeadershipProfiles,
  'news_events_feed': NewsEventsFeed,
  'quick_links': QuickLinks,
  
  // Base components
  'hero_banner': HeroBanner,
  'faculty_grid': FacultyGrid,
  'course_showcase': CourseShowcase,
  'text_content': TextContent,
  'cta_banner': CTABanner,
}

interface ComponentRendererProps {
  componentType: string
  settings: Record<string, any>
}

export function ComponentRenderer({ componentType, settings }: ComponentRendererProps) {
  // Get the component from registry
  const Component = COMPONENT_REGISTRY[componentType]

  // If component not found, show placeholder
  if (!Component) {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-8 text-center">
        <div className="text-yellow-800 font-semibold mb-2">
          ⚠️ Component Not Found
        </div>
        <div className="text-yellow-700 text-sm">
          Component type "{componentType}" is not registered.
        </div>
        <div className="text-yellow-600 text-xs mt-2">
          Add the component to the COMPONENT_REGISTRY in ComponentRenderer.tsx
        </div>
      </div>
    )
  }

  // Render the component with its settings as props
  return (
    <Suspense fallback={<ComponentSkeleton />}>
      <Component {...settings} />
    </Suspense>
  )
}

// Loading skeleton
function ComponentSkeleton() {
  return (
    <div className="animate-pulse bg-gray-100 rounded-lg p-8">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  )
}

// ============================================================================
// HOW TO ADD A NEW COMPONENT:
// ============================================================================
// 1. Create the React component in components/sections/YourComponent.tsx
// 2. Import it at the top of this file
// 3. Add it to COMPONENT_REGISTRY with its component_type as the key
// 4. Define its schema in Supabase (component_definitions table)
// 
// Example:
// const MyNewComponent = dynamic(() => import('@/components/sections/MyNewComponent'))
// 
// COMPONENT_REGISTRY = {
//   ...
//   'my_new_component': MyNewComponent,
// }
// ============================================================================
