# Visual Page Builder - Phase IV Complete ✅

## Frontend Implementation - Shopify-like Visual Editor

Phase IV implements the **complete visual editor frontend** with drag-and-drop, three-pane layout, and schema-driven dynamic forms.

## What's Been Built

### 1. Technology Stack Selection

**Drag-and-Drop Library: dnd-kit** ✅

**Why dnd-kit over react-beautiful-dnd:**
- ✅ **Nested D&D Support** - Handles complex Section/Block hierarchies
- ✅ **High Customization** - Control over collisions, placeholders, strategies
- ✅ **Modern & Maintained** - Active development, TypeScript-first
- ✅ **Performance** - Lightweight and fast
- ✅ **Flexible** - Custom sorting strategies for different contexts

**Installed:**
```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

### 2. Three-Pane Shopify-like Layout

**Architecture:**
```
┌─────────────────────────────────────────────────────────────┐
│                     EDITOR TOOLBAR                           │
│  [Back] [Page Title] [Status] [Preview] [Save] [Publish]   │
└─────────────────────────────────────────────────────────────┘
┌──────────────┬─────────────────────────┬────────────────────┐
│              │                         │                    │
│  COMPONENT   │    EDITOR CANVAS        │    SETTINGS        │
│  LIBRARY     │    (Drag & Drop)        │    SIDEBAR         │
│              │                         │                    │
│  [Search]    │  ┌─────────────────┐   │  Component: hero   │
│              │  │ Component 1     │   │                    │
│  Categories: │  │ [Drag Handle]   │   │  [Dynamic Form]    │
│  • Hero      │  └─────────────────┘   │  - Heading         │
│  • Content   │                         │  - Image URL       │
│  • Nav       │  ┌─────────────────┐   │  - CTA Text        │
│              │  │ Component 2     │   │  - Settings...     │
│  Components: │  │ [Selected]      │   │                    │
│  + Hero      │  └─────────────────┘   │  [Save Changes]    │
│  + Programs  │                         │                    │
│  + Faculty   │  ┌─────────────────┐   │                    │
│              │  │ Component 3     │   │                    │
│              │  └─────────────────┘   │                    │
└──────────────┴─────────────────────────┴────────────────────┘
```

### 3. Components Created

#### **Main Editor** (`app/builder/[pageId]/page.tsx`)
- Page loader
- Error handling
- State management
- Integration with VisualEditor

#### **Visual Editor** (`components/builder/VisualEditor.tsx`)
- Three-pane layout orchestration
- DndContext setup
- Component selection state
- Drag-and-drop event handling
- Save/publish workflow

**Key Features:**
- ✅ Drag-and-drop reordering
- ✅ Component selection
- ✅ Preview mode toggle
- ✅ Dirty state tracking
- ✅ Auto-save on changes
- ✅ Publish/unpublish workflow

#### **Component Library Sidebar** (`components/builder/ComponentLibrarySidebar.tsx`)
- Lists all available components from database
- Search functionality
- Category filtering
- Click to add components
- Icon display
- Component descriptions

**Features:**
- ✅ Dynamic loading from `definitions.component_definitions`
- ✅ Search by name/description
- ✅ Filter by category
- ✅ Visual component cards
- ✅ One-click add to canvas

#### **Editor Canvas** (`components/builder/EditorCanvas.tsx`)
- Sortable component list
- Drag handles
- Component toolbar (duplicate, delete)
- Selection highlighting
- Empty state

**Features:**
- ✅ Drag-and-drop reordering with dnd-kit
- ✅ Visual feedback during drag
- ✅ Component hover states
- ✅ Selection indicators
- ✅ Per-component actions

#### **Settings Sidebar** (`components/builder/SettingsSidebar.tsx`)
- Loads component schema from database
- Renders dynamic form
- Save/reset functionality
- Change detection

**Features:**
- ✅ Schema-driven UI
- ✅ Dynamic form generation
- ✅ Unsaved changes indicator
- ✅ Reset to original values

#### **Dynamic Form Generator** (`components/builder/DynamicForm.tsx`)
- **THE SCHEMA-DRIVEN UI IMPLEMENTATION**
- Automatically generates form fields from JSON Schema
- Supports all field types

**Supported Field Types:**
- ✅ **String** - Text inputs
- ✅ **Number/Integer** - Number inputs with min/max
- ✅ **Boolean** - Checkboxes
- ✅ **Enum** - Dropdown selects
- ✅ **URL** - URL inputs with validation
- ✅ **Email** - Email inputs with validation
- ✅ **Textarea** - Multi-line text (based on maxLength)
- ✅ **Array** - Repeatable blocks (nested forms)

**Array Field Features:**
- Add/remove items
- Collapsible items
- Nested form generation
- Drag-to-reorder (future)

#### **Component Renderer** (`components/builder/ComponentRenderer.tsx`)
- **THE DYNAMIC RENDERER**
- Maps `component_type` strings to React components
- Central component registry
- Lazy loading with dynamic imports
- Error handling for missing components

**How It Works:**
```typescript
const COMPONENT_REGISTRY = {
  'hero_slideshow': HeroSlideshow,
  'program_grid': ProgramGrid,
  'leadership_profiles': LeadershipProfiles,
  // ... more components
}

// Renders: <HeroSlideshow {...settings} />
<ComponentRenderer 
  componentType="hero_slideshow" 
  settings={settings} 
/>
```

#### **Editor Toolbar** (`components/builder/EditorToolbar.tsx`)
- Page info display
- Status badges
- Preview toggle
- Save button
- Publish/unpublish
- Back navigation

### 4. Example Component Implementation

**Hero Slideshow** (`components/sections/HeroSlideshow.tsx`)
- Full implementation of slideshow component
- Autoplay functionality
- Navigation arrows
- Pagination dots
- Responsive design
- Settings-driven rendering

**Demonstrates:**
- How to consume settings from JSON Schema
- TypeScript type safety
- Responsive design
- Interactive features

### 5. How the System Works

#### **Adding a Component:**
1. User clicks component in library
2. API call: `PageBuilderAPI.addComponent(pageId, componentType)`
3. Database fetches default settings from schema
4. Creates new component instance
5. Validates against schema
6. Saves to database
7. Updates UI

#### **Editing Settings:**
1. User clicks component on canvas
2. Settings sidebar loads component schema
3. DynamicForm generates fields from JSON Schema
4. User edits values
5. On save: `PageBuilderAPI.updateComponentSettings()`
6. Database validates against schema
7. If valid: saves and updates UI
8. If invalid: shows error

#### **Drag-and-Drop:**
1. User drags component
2. dnd-kit tracks drag position
3. On drop: `PageBuilderAPI.reorderComponents()`
4. Database updates order
5. UI reflects new order

#### **Publishing:**
1. User clicks "Publish"
2. API call: `PageBuilderAPI.publishPage()`
3. Database function sets status to 'PUBLISHED'
4. RLS policies make page visible to public
5. UI updates status badge

### 6. Schema-Driven UI in Action

**Example: Hero Slideshow Settings**

**JSON Schema (in database):**
```json
{
  "type": "object",
  "properties": {
    "slides": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "image_url": { "type": "string", "format": "uri" },
          "title_text": { "type": "string", "maxLength": 200 },
          "cta_text": { "type": "string", "maxLength": 50 }
        }
      }
    },
    "autoplay": { "type": "boolean", "default": true },
    "height": { "type": "string", "enum": ["medium", "large", "fullscreen"] }
  }
}
```

**Generated Form (automatic):**
- ✅ **Slides** - Repeatable block with add/remove
  - Image URL - URL input
  - Title Text - Text input (max 200 chars)
  - CTA Text - Text input (max 50 chars)
- ✅ **Autoplay** - Checkbox
- ✅ **Height** - Dropdown (medium, large, fullscreen)

**No manual form code needed!** The form is generated from the schema.

### 7. Adding New Components

**To add a new component:**

1. **Create React Component:**
```typescript
// components/sections/MyNewComponent.tsx
export default function MyNewComponent(settings: MySettings) {
  return <div>{settings.title}</div>
}
```

2. **Define Schema in Database:**
```sql
INSERT INTO definitions.component_definitions (
  id, display_name, settings_schema, default_settings
) VALUES (
  'my_new_component',
  'My New Component',
  '{"type": "object", "properties": {...}}',
  '{"title": "Default Title"}'
);
```

3. **Register in ComponentRenderer:**
```typescript
const MyNewComponent = dynamic(() => import('@/components/sections/MyNewComponent'))

COMPONENT_REGISTRY = {
  ...
  'my_new_component': MyNewComponent
}
```

**That's it!** The component is now:
- ✅ Available in component library
- ✅ Draggable on canvas
- ✅ Has auto-generated settings form
- ✅ Validated by database
- ✅ Renderable on public site

## Files Created

```
✅ app/builder/[pageId]/page.tsx              - Builder page route
✅ components/builder/VisualEditor.tsx         - Main editor
✅ components/builder/ComponentLibrarySidebar.tsx - Component library
✅ components/builder/EditorCanvas.tsx         - Drag-and-drop canvas
✅ components/builder/SettingsSidebar.tsx      - Settings panel
✅ components/builder/DynamicForm.tsx          - Schema-driven forms
✅ components/builder/ComponentRenderer.tsx    - Dynamic renderer
✅ components/builder/EditorToolbar.tsx        - Top toolbar
✅ components/sections/HeroSlideshow.tsx       - Example component
```

## Usage

### Access the Builder

```
http://localhost:3000/builder/[pageId]
```

### Create a Page First

```typescript
const page = await PageBuilderAPI.createPage({
  slug: 'home',
  title: 'Home Page'
})

// Then visit: /builder/{page.id}
```

## Key Benefits

### 1. Schema-Driven UI
- ✅ **No manual form code** - Forms generated from JSON Schema
- ✅ **Type-safe** - TypeScript + JSON Schema validation
- ✅ **Consistent** - All components use same form system
- ✅ **Extensible** - Add new field types easily

### 2. Component Registry
- ✅ **Centralized** - One place to register components
- ✅ **Lazy loading** - Components loaded on demand
- ✅ **Type-safe** - TypeScript ensures correct props
- ✅ **Error handling** - Graceful fallbacks

### 3. Drag-and-Drop
- ✅ **Smooth** - dnd-kit provides excellent UX
- ✅ **Visual feedback** - Drag overlays and highlights
- ✅ **Nested support** - Ready for Block-level dragging
- ✅ **Accessible** - Keyboard navigation support

### 4. Real-time Validation
- ✅ **Database-level** - Invalid data rejected
- ✅ **Immediate feedback** - Errors shown instantly
- ✅ **Type-safe** - TypeScript catches errors early
- ✅ **Schema-enforced** - Consistent validation rules

## What's Next: Phase V

Coming next:
1. **Public Page Renderer** - Render published pages on public site
2. **Media Library** - Image upload and management
3. **Version History UI** - Visual version comparison
4. **Nested Blocks** - Drag-and-drop within sections
5. **Component Preview** - Thumbnail previews in library

---

**Phase IV Complete! Shopify-like visual editor is ready!** 🎨
