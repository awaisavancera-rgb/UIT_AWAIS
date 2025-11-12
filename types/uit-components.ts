// ============================================================================
// UIT UNIVERSITY COMPONENT TYPES
// Type-safe settings for UIT-specific components
// ============================================================================

// ============================================================================
// Hero Slideshow Component
// ============================================================================
export interface HeroSlide {
  image_url: string
  title_text?: string
  subtitle_text?: string
  cta_text?: string
  cta_link?: string
  text_position: 'left' | 'center' | 'right'
}

export interface HeroSlideshowSettings {
  slides: HeroSlide[]
  shadow_overlay: boolean
  autoplay: boolean
  autoplay_speed: number
  show_navigation: boolean
  show_pagination: boolean
  height: 'medium' | 'large' | 'fullscreen'
}

// ============================================================================
// Program Grid Component
// ============================================================================
export interface ProgramItem {
  icon?: string
  icon_color: 'blue' | 'green' | 'purple' | 'orange' | 'red'
  title: string
  description?: string
  link?: string
  link_text: string
  image_url?: string
}

export interface ProgramGridSettings {
  section_heading: string
  section_description?: string
  layout: 'grid' | 'carousel' | 'list'
  columns: 2 | 3 | 4
  program_list: ProgramItem[]
  show_icons: boolean
  card_style: 'elevated' | 'bordered' | 'flat'
}

// ============================================================================
// Leadership Profiles Component
// ============================================================================
export interface LeadershipProfile {
  name: string
  title: string
  image_url: string
  bio_excerpt?: string
  bio_link?: string
  email?: string
  phone?: string
  office?: string
}

export interface LeadershipProfilesSettings {
  section_heading: string
  section_description?: string
  layout: 'grid' | 'carousel'
  layout_cols: 2 | 3 | 4 | 5
  profiles: LeadershipProfile[]
  show_bio_excerpt: boolean
  show_contact: boolean
  card_style: 'elevated' | 'bordered' | 'minimal'
}

// ============================================================================
// News & Events Feed Component
// ============================================================================
export type NewsEventTab = 'all' | 'news' | 'events' | 'announcements'

export interface NewsEventsSettings {
  section_heading: string
  tabs: NewsEventTab[]
  layout: 'grid' | 'list' | 'masonry'
  items_per_page: number
  show_featured: boolean
  show_date: boolean
  show_category: boolean
  show_excerpt: boolean
  data_source: 'database' | 'manual'
}

// ============================================================================
// Quick Links Component
// ============================================================================
export interface QuickLink {
  label: string
  url: string
  icon?: string
  description?: string
  open_new_tab: boolean
}

export interface QuickLinksSettings {
  section_heading?: string
  style: 'cards' | 'list' | 'buttons' | 'icons'
  columns: 2 | 3 | 4 | 5 | 6
  links: QuickLink[]
  background_color: 'white' | 'gray' | 'blue' | 'transparent'
}

// ============================================================================
// Component Type Union
// ============================================================================
export type UITComponentSettings =
  | HeroSlideshowSettings
  | ProgramGridSettings
  | LeadershipProfilesSettings
  | NewsEventsSettings
  | QuickLinksSettings

export type UITComponentType =
  | 'hero_slideshow'
  | 'program_grid'
  | 'leadership_profiles'
  | 'news_events_feed'
  | 'quick_links'
