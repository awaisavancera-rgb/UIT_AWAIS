// ============================================================================
// PAGE BUILDER TYPE DEFINITIONS
// Mirrors the database schema for type safety
// ============================================================================

export interface ComponentSchema {
  id: string
  component_type: string
  display_name: string
  description?: string
  category?: string
  icon?: string
  preview_image_url?: string
  settings_schema: Record<string, any> // JSON Schema
  default_settings: Record<string, any>
  is_active: boolean
  is_system: boolean
  max_instances?: number
  created_at: string
  updated_at: string
}

export interface ComponentInstance {
  component_type: string
  order: number
  settings: Record<string, any>
  id?: string // Client-side only for drag-and-drop
}

export interface BuilderPage {
  id: string
  slug: string
  title: string
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  og_image_url?: string
  components: ComponentInstance[]
  layout_template: string
  is_published: boolean
  published_at?: string
  version: number
  last_edited_by?: string
  created_at: string
  updated_at: string
}

export interface PageVersion {
  id: string
  page_id: string
  version: number
  components: ComponentInstance[]
  created_by?: string
  change_description?: string
  created_at: string
}

// ============================================================================
// COMPONENT SETTINGS TYPES
// Type-safe settings for each component
// ============================================================================

export interface HeroBannerSettings {
  heading: string
  subheading?: string
  background_image: string
  cta_text?: string
  cta_link?: string
  text_color: 'light' | 'dark'
  height: 'small' | 'medium' | 'large' | 'fullscreen'
}

export interface FacultyGridSettings {
  title: string
  description?: string
  columns: 2 | 3 | 4
  show_bio: boolean
  show_specialization: boolean
  limit: number
  filter_by_department?: string
}

export interface CourseShowcaseSettings {
  title: string
  layout: 'grid' | 'carousel' | 'list'
  show_featured_only: boolean
  limit: number
  show_price: boolean
  show_instructor: boolean
}

export interface TextContentSettings {
  heading?: string
  content: string
  text_align: 'left' | 'center' | 'right'
  max_width: 'narrow' | 'medium' | 'wide' | 'full'
}

export interface CTABannerSettings {
  heading: string
  description?: string
  button_text: string
  button_link: string
  background_color: 'blue' | 'green' | 'purple' | 'orange' | 'gray'
  style: 'solid' | 'gradient' | 'image'
}

// ============================================================================
// BUILDER UI TYPES
// ============================================================================

export interface DragItem {
  id: string
  index: number
  component_type: string
}

export interface DropResult {
  dragIndex: number
  hoverIndex: number
}

export type BuilderMode = 'edit' | 'preview'

export interface BuilderState {
  page: BuilderPage | null
  selectedComponentIndex: number | null
  mode: BuilderMode
  isDirty: boolean
  isSaving: boolean
}
