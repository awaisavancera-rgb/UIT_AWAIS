# Visual Page Builder - Phase II Complete ✅

## UIT University Component Library

Phase II implements the **complete UIT University component library** based on the existing UITU site structure analysis.

## What's Been Built

### 1. Five UIT-Specific Components

All components mapped from the existing UITU website structure:

#### **Component 1: Hero Slideshow** (`hero_slideshow`)
- **Purpose**: Revolving image slides with CTAs for major announcements
- **UITU Context**: Main banner with "Apply Now" CTA
- **Shopify Analog**: Section Everywhere / Slideshow Section

**Features:**
- Multiple slides (1-10)
- Per-slide settings: image, title, subtitle, CTA button
- Text positioning (left/center/right)
- Dark overlay toggle
- Autoplay with configurable speed
- Navigation arrows and pagination dots
- Height options: medium, large, fullscreen

**Schema Fields:**
```typescript
{
  slides: Array<{
    image_url: string (required)
    title_text: string
    subtitle_text: string
    cta_text: string
    cta_link: string
    text_position: 'left' | 'center' | 'right'
  }>
  shadow_overlay: boolean
  autoplay: boolean
  autoplay_speed: number (3-10 seconds)
  show_navigation: boolean
  show_pagination: boolean
  height: 'medium' | 'large' | 'fullscreen'
}
```

---

#### **Component 2: Program Grid** (`program_grid`)
- **Purpose**: Display Academic Programs (Engineering, Computing, Management)
- **UITU Context**: Faculty showcase with icons and descriptions
- **Shopify Analog**: Collection/Product Grid

**Features:**
- Grid, carousel, or list layout
- Configurable columns (2-4)
- Per-program settings: icon, color, title, description, link
- Icon display toggle
- Card styles: elevated, bordered, flat
- Custom link text

**Schema Fields:**
```typescript
{
  section_heading: string (required)
  section_description: string
  layout: 'grid' | 'carousel' | 'list'
  columns: 2 | 3 | 4
  program_list: Array<{
    icon: string (Lucide icon name)
    icon_color: 'blue' | 'green' | 'purple' | 'orange' | 'red'
    title: string (required)
    description: string
    link: string (URI)
    link_text: string
    image_url: string
  }>
  show_icons: boolean
  card_style: 'elevated' | 'bordered' | 'flat'
}
```

---

#### **Component 3: Leadership Profiles** (`leadership_profiles`)
- **Purpose**: Display Vice Chancellor, Deans, key personnel
- **UITU Context**: Leadership grid with photos and bios
- **Shopify Analog**: Custom Content Block with repeatable fields

**Features:**
- Grid or carousel layout
- Configurable columns (2-5)
- Per-profile: name, title, photo, bio, contact info
- Bio excerpt toggle
- Contact info toggle (email, phone, office)
- Card styles: elevated, bordered, minimal

**Schema Fields:**
```typescript
{
  section_heading: string (required)
  section_description: string
  layout: 'grid' | 'carousel'
  layout_cols: 2 | 3 | 4 | 5
  profiles: Array<{
    name: string (required)
    title: string (required)
    image_url: string (required)
    bio_excerpt: string
    bio_link: string
    email: string (email format)
    phone: string
    office: string
  }>
  show_bio_excerpt: boolean
  show_contact: boolean
  card_style: 'elevated' | 'bordered' | 'minimal'
}
```

---

#### **Component 4: News & Events Feed** (`news_events_feed`)
- **Purpose**: Dynamic feed for recent happenings
- **UITU Context**: News and events with images and links
- **Shopify Analog**: Blog/Collection Feed

**Features:**
- Tabbed interface (all, news, events, announcements)
- Grid, list, or masonry layout
- Featured item display (large)
- Date, category, excerpt toggles
- Database or manual data source
- Configurable items per page (3-20)

**Schema Fields:**
```typescript
{
  section_heading: string (required)
  tabs: Array<'all' | 'news' | 'events' | 'announcements'>
  layout: 'grid' | 'list' | 'masonry'
  items_per_page: number (3-20)
  show_featured: boolean
  show_date: boolean
  show_category: boolean
  show_excerpt: boolean
  data_source: 'database' | 'manual'
}
```

---

#### **Component 5: Quick Links** (`quick_links`)
- **Purpose**: Utility navigation (Student Portal, Library, WebMail)
- **UITU Context**: Quick access links for students
- **Shopify Analog**: Footer/Header utility blocks

**Features:**
- Multiple display styles: cards, list, buttons, icons
- Configurable columns (2-6)
- Per-link: label, URL, icon, description
- Open in new tab option
- Background color options
- Icon support (Lucide icons)

**Schema Fields:**
```typescript
{
  section_heading: string
  style: 'cards' | 'list' | 'buttons' | 'icons'
  columns: 2 | 3 | 4 | 5 | 6
  links: Array<{
    label: string (required)
    url: string (required, URI)
    icon: string (Lucide icon name)
    description: string
    open_new_tab: boolean
  }>
  background_color: 'white' | 'gray' | 'blue' | 'transparent'
}
```

---

## Component Mapping Table

| Component | UITU Element | Shopify Analog | Key Features |
|-----------|--------------|----------------|--------------|
| **hero_slideshow** | Main banner with slides | Slideshow Section | Multiple slides, CTAs, autoplay |
| **program_grid** | Faculty showcase | Product Grid | Icons, descriptions, links |
| **leadership_profiles** | Vice Chancellor, Deans | Custom Content Block | Photos, bios, contact info |
| **news_events_feed** | News & events list | Blog Feed | Tabs, featured items, filters |
| **quick_links** | Student Portal, Library | Utility Navigation | Icons, external links, styles |

## JSON Schema Validation

Each component has **strict validation** enforced at the database level:

### Example: Program Grid Validation
```json
{
  "type": "object",
  "required": ["section_heading", "program_list"],
  "properties": {
    "section_heading": {
      "type": "string",
      "minLength": 1,
      "maxLength": 150
    },
    "program_list": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["title"],
        "properties": {
          "title": {
            "type": "string",
            "minLength": 1,
            "maxLength": 150
          }
        }
      }
    }
  }
}
```

**Result**: Database will REJECT any component that doesn't match its schema!

## Custom Field Types Implemented

Based on the component schemas, the following field types are auto-generated:

1. **String** - Text inputs (titles, descriptions)
2. **URL** - Link inputs with validation
3. **Email** - Email inputs with validation
4. **Boolean** - Toggle switches
5. **Integer** - Number inputs with min/max
6. **Enum** - Dropdown selects
7. **Array** - Repeatable blocks (slides, programs, profiles, links)
8. **Object** - Nested field groups

## Setup Instructions

### 1. Run Phase I Schema (if not done)
```sql
-- In Supabase SQL Editor
-- Run: supabase/visual-builder-schema.sql
```

### 2. Run Phase II UIT Components
```sql
-- In Supabase SQL Editor
-- Run: supabase/uit-components-schema.sql
```

### 3. Verify Components
```sql
SELECT component_type, display_name, category 
FROM component_schemas 
ORDER BY category, display_name;
```

You should see **10 total components**:
- 5 from Phase I (base components)
- 5 from Phase II (UIT-specific)

## Usage Example

### Create a UIT Homepage

```typescript
import { PageBuilderAPI } from '@/lib/page-builder-api'

// Create page
const page = await PageBuilderAPI.createPage({
  slug: 'home',
  title: 'UIT University Home'
})

// Add hero slideshow
await PageBuilderAPI.addComponent(page.id, 'hero_slideshow')
await PageBuilderAPI.updateComponentSettings(page.id, 0, {
  slides: [
    {
      image_url: 'https://...',
      title_text: 'Welcome to UIT University',
      subtitle_text: 'Excellence in Education',
      cta_text: 'Apply Now',
      cta_link: '/apply',
      text_position: 'center'
    }
  ],
  autoplay: true,
  height: 'large'
})

// Add program grid
await PageBuilderAPI.addComponent(page.id, 'program_grid')
await PageBuilderAPI.updateComponentSettings(page.id, 1, {
  section_heading: 'Our Academic Programs',
  layout: 'grid',
  columns: 3,
  program_list: [
    {
      icon: 'Cpu',
      icon_color: 'blue',
      title: 'Faculty of Engineering',
      description: 'Leading engineering education',
      link: '/faculties/engineering',
      link_text: 'Read More'
    },
    // ... more programs
  ]
})

// Add leadership profiles
await PageBuilderAPI.addComponent(page.id, 'leadership_profiles')

// Add news feed
await PageBuilderAPI.addComponent(page.id, 'news_events_feed')

// Add quick links
await PageBuilderAPI.addComponent(page.id, 'quick_links')

// Publish
await PageBuilderAPI.publishPage(page.id, true)
```

## Files Created

```
✅ supabase/uit-components-schema.sql  - UIT component definitions
✅ types/uit-components.ts             - TypeScript types
```

## What's Next: Phase III

Coming next:
1. **Visual Builder UI** - Drag-and-drop interface
2. **Settings Form Generator** - Auto-generate forms from JSON Schema
3. **Component Renderer** - React components for each type
4. **Preview Mode** - Live preview while editing
5. **Media Library** - Image picker integration

---

**Phase II Complete! UIT University component library is ready!** 🎓
