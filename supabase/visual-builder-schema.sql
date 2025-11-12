-- ============================================================================
-- VISUAL PAGE BUILDER SCHEMA - Shopify-like Architecture
-- ============================================================================
-- This schema implements a composable page builder with:
-- 1. JSONB storage for flexible component configurations
-- 2. JSON Schema validation for data integrity
-- 3. Drag-and-drop section ordering
-- 4. Reusable component definitions
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_jsonschema";

-- ============================================================================
-- TABLE: component_schemas
-- Defines reusable component types with their JSON schemas
-- Similar to Shopify's section schema definitions
-- ============================================================================
CREATE TABLE IF NOT EXISTS component_schemas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Component identification
  component_type VARCHAR(100) UNIQUE NOT NULL, -- e.g., 'hero_banner', 'faculty_grid'
  display_name VARCHAR(255) NOT NULL,          -- Human-readable name
  description TEXT,                             -- Component description
  category VARCHAR(100),                        -- Group components (e.g., 'hero', 'content', 'navigation')
  
  -- Icon and preview
  icon VARCHAR(100),                            -- Icon identifier (lucide icon name)
  preview_image_url TEXT,                       -- Preview thumbnail
  
  -- JSON Schema definition for validation
  settings_schema JSONB NOT NULL,               -- JSON Schema for component settings
  default_settings JSONB DEFAULT '{}',          -- Default configuration
  
  -- Component metadata
  is_active BOOLEAN DEFAULT true,               -- Can be used in builder
  is_system BOOLEAN DEFAULT false,              -- System component (cannot be deleted)
  max_instances INTEGER,                        -- Limit instances per page (null = unlimited)
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Validation: Ensure settings_schema is valid JSON Schema
  CONSTRAINT valid_settings_schema CHECK (
    jsonb_typeof(settings_schema) = 'object' AND
    settings_schema ? 'type' AND
    settings_schema->>'type' = 'object'
  )
);

-- ============================================================================
-- TABLE: builder_pages
-- Stores page metadata and component configurations
-- Each page contains an ordered array of component instances
-- ============================================================================
CREATE TABLE IF NOT EXISTS builder_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Page identification
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  
  -- SEO metadata
  meta_title VARCHAR(255),
  meta_description TEXT,
  meta_keywords TEXT,
  og_image_url TEXT,
  
  -- Page configuration (JSONB array of component instances)
  -- Structure: [{ component_type, order, settings }, ...]
  components JSONB DEFAULT '[]',
  
  -- Page settings
  layout_template VARCHAR(100) DEFAULT 'default',
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  
  -- Version control
  version INTEGER DEFAULT 1,
  last_edited_by VARCHAR(255),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Validation: Ensure components is an array
  CONSTRAINT valid_components_array CHECK (
    jsonb_typeof(components) = 'array'
  )
);

-- ============================================================================
-- TABLE: page_versions
-- Version history for rollback capability
-- ============================================================================
CREATE TABLE IF NOT EXISTS page_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID REFERENCES builder_pages(id) ON DELETE CASCADE,
  
  version INTEGER NOT NULL,
  components JSONB NOT NULL,
  
  -- Version metadata
  created_by VARCHAR(255),
  change_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(page_id, version)
);

-- ============================================================================
-- FUNCTION: Validate component against its schema
-- This function checks if a component instance matches its schema definition
-- ============================================================================
CREATE OR REPLACE FUNCTION validate_component_settings(
  p_component_type VARCHAR,
  p_settings JSONB
) RETURNS BOOLEAN AS $$
DECLARE
  v_schema JSONB;
  v_is_valid BOOLEAN;
BEGIN
  -- Get the schema for this component type
  SELECT settings_schema INTO v_schema
  FROM component_schemas
  WHERE component_type = p_component_type AND is_active = true;
  
  -- If schema not found, reject
  IF v_schema IS NULL THEN
    RAISE EXCEPTION 'Component type "%" not found or inactive', p_component_type;
  END IF;
  
  -- Validate settings against schema using pg_jsonschema
  SELECT jsonb_matches_schema(v_schema, p_settings) INTO v_is_valid;
  
  RETURN v_is_valid;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- FUNCTION: Validate all components in a page
-- Ensures every component in the components array is valid
-- ============================================================================
CREATE OR REPLACE FUNCTION validate_page_components(p_components JSONB)
RETURNS BOOLEAN AS $$
DECLARE
  v_component JSONB;
  v_component_type VARCHAR;
  v_settings JSONB;
  v_is_valid BOOLEAN;
BEGIN
  -- Iterate through each component
  FOR v_component IN SELECT * FROM jsonb_array_elements(p_components)
  LOOP
    -- Extract component_type and settings
    v_component_type := v_component->>'component_type';
    v_settings := v_component->'settings';
    
    -- Validate required fields exist
    IF v_component_type IS NULL THEN
      RAISE EXCEPTION 'Component missing required field: component_type';
    END IF;
    
    IF v_settings IS NULL THEN
      RAISE EXCEPTION 'Component "%" missing required field: settings', v_component_type;
    END IF;
    
    -- Validate settings against schema
    v_is_valid := validate_component_settings(v_component_type, v_settings);
    
    IF NOT v_is_valid THEN
      RAISE EXCEPTION 'Component "%" has invalid settings', v_component_type;
    END IF;
  END LOOP;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TRIGGER: Validate components before insert/update
-- Ensures data integrity at the database level
-- ============================================================================
CREATE OR REPLACE FUNCTION trigger_validate_page_components()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate all components
  PERFORM validate_page_components(NEW.components);
  
  -- Increment version on update
  IF TG_OP = 'UPDATE' AND OLD.components IS DISTINCT FROM NEW.components THEN
    NEW.version := OLD.version + 1;
    NEW.updated_at := NOW();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_components_before_save
  BEFORE INSERT OR UPDATE ON builder_pages
  FOR EACH ROW
  EXECUTE FUNCTION trigger_validate_page_components();

-- ============================================================================
-- TRIGGER: Auto-save version history
-- ============================================================================
CREATE OR REPLACE FUNCTION trigger_save_page_version()
RETURNS TRIGGER AS $$
BEGIN
  -- Save version on update if components changed
  IF TG_OP = 'UPDATE' AND OLD.components IS DISTINCT FROM NEW.components THEN
    INSERT INTO page_versions (page_id, version, components, created_by)
    VALUES (NEW.id, NEW.version, NEW.components, NEW.last_edited_by);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER save_version_after_update
  AFTER UPDATE ON builder_pages
  FOR EACH ROW
  EXECUTE FUNCTION trigger_save_page_version();

-- ============================================================================
-- INDEXES for performance
-- ============================================================================
CREATE INDEX idx_builder_pages_slug ON builder_pages(slug);
CREATE INDEX idx_builder_pages_published ON builder_pages(is_published);
CREATE INDEX idx_component_schemas_type ON component_schemas(component_type);
CREATE INDEX idx_component_schemas_category ON component_schemas(category);
CREATE INDEX idx_page_versions_page_id ON page_versions(page_id);

-- ============================================================================
-- INSERT: Default Component Schemas
-- These are the reusable component definitions (like Shopify sections)
-- ============================================================================

-- Hero Banner Component
INSERT INTO component_schemas (
  component_type,
  display_name,
  description,
  category,
  icon,
  settings_schema,
  default_settings,
  is_system
) VALUES (
  'hero_banner',
  'Hero Banner',
  'Full-width hero section with image, heading, and CTA',
  'hero',
  'Layout',
  '{
    "type": "object",
    "required": ["heading", "background_image"],
    "properties": {
      "heading": {
        "type": "string",
        "title": "Heading",
        "minLength": 1,
        "maxLength": 200
      },
      "subheading": {
        "type": "string",
        "title": "Subheading",
        "maxLength": 500
      },
      "background_image": {
        "type": "string",
        "title": "Background Image URL",
        "format": "uri"
      },
      "cta_text": {
        "type": "string",
        "title": "Button Text",
        "maxLength": 50
      },
      "cta_link": {
        "type": "string",
        "title": "Button Link",
        "format": "uri"
      },
      "text_color": {
        "type": "string",
        "title": "Text Color",
        "enum": ["light", "dark"],
        "default": "light"
      },
      "height": {
        "type": "string",
        "title": "Section Height",
        "enum": ["small", "medium", "large", "fullscreen"],
        "default": "large"
      }
    }
  }',
  '{
    "heading": "Welcome to Our University",
    "subheading": "Excellence in Education",
    "background_image": "",
    "cta_text": "Learn More",
    "cta_link": "/about",
    "text_color": "light",
    "height": "large"
  }',
  true
);

-- Faculty Grid Component
INSERT INTO component_schemas (
  component_type,
  display_name,
  description,
  category,
  icon,
  settings_schema,
  default_settings,
  is_system
) VALUES (
  'faculty_grid',
  'Faculty Grid',
  'Display faculty members in a responsive grid',
  'content',
  'Users',
  '{
    "type": "object",
    "required": ["title"],
    "properties": {
      "title": {
        "type": "string",
        "title": "Section Title",
        "minLength": 1,
        "maxLength": 100
      },
      "description": {
        "type": "string",
        "title": "Section Description",
        "maxLength": 500
      },
      "columns": {
        "type": "integer",
        "title": "Number of Columns",
        "minimum": 2,
        "maximum": 4,
        "default": 3
      },
      "show_bio": {
        "type": "boolean",
        "title": "Show Bio Excerpt",
        "default": true
      },
      "show_specialization": {
        "type": "boolean",
        "title": "Show Specialization",
        "default": true
      },
      "limit": {
        "type": "integer",
        "title": "Number of Faculty to Show",
        "minimum": 1,
        "maximum": 50,
        "default": 6
      },
      "filter_by_department": {
        "type": "string",
        "title": "Filter by Department (optional)"
      }
    }
  }',
  '{
    "title": "Our Faculty",
    "description": "Meet our distinguished faculty members",
    "columns": 3,
    "show_bio": true,
    "show_specialization": true,
    "limit": 6
  }',
  true
);

-- Course Showcase Component
INSERT INTO component_schemas (
  component_type,
  display_name,
  description,
  category,
  icon,
  settings_schema,
  default_settings,
  is_system
) VALUES (
  'course_showcase',
  'Course Showcase',
  'Featured courses with cards',
  'content',
  'BookOpen',
  '{
    "type": "object",
    "required": ["title"],
    "properties": {
      "title": {
        "type": "string",
        "title": "Section Title",
        "minLength": 1
      },
      "layout": {
        "type": "string",
        "title": "Layout Style",
        "enum": ["grid", "carousel", "list"],
        "default": "grid"
      },
      "show_featured_only": {
        "type": "boolean",
        "title": "Show Featured Courses Only",
        "default": true
      },
      "limit": {
        "type": "integer",
        "title": "Number of Courses",
        "minimum": 1,
        "maximum": 20,
        "default": 6
      },
      "show_price": {
        "type": "boolean",
        "title": "Show Price",
        "default": true
      },
      "show_instructor": {
        "type": "boolean",
        "title": "Show Instructor",
        "default": true
      }
    }
  }',
  '{
    "title": "Featured Courses",
    "layout": "grid",
    "show_featured_only": true,
    "limit": 6,
    "show_price": true,
    "show_instructor": true
  }',
  true
);

-- Text Content Component
INSERT INTO component_schemas (
  component_type,
  display_name,
  description,
  category,
  icon,
  settings_schema,
  default_settings,
  is_system
) VALUES (
  'text_content',
  'Text Content',
  'Rich text content block',
  'content',
  'FileText',
  '{
    "type": "object",
    "required": ["content"],
    "properties": {
      "heading": {
        "type": "string",
        "title": "Heading (optional)",
        "maxLength": 200
      },
      "content": {
        "type": "string",
        "title": "Content",
        "minLength": 1
      },
      "text_align": {
        "type": "string",
        "title": "Text Alignment",
        "enum": ["left", "center", "right"],
        "default": "left"
      },
      "max_width": {
        "type": "string",
        "title": "Max Width",
        "enum": ["narrow", "medium", "wide", "full"],
        "default": "medium"
      }
    }
  }',
  '{
    "content": "Add your content here...",
    "text_align": "left",
    "max_width": "medium"
  }',
  true
);

-- CTA Banner Component
INSERT INTO component_schemas (
  component_type,
  display_name,
  description,
  category,
  icon,
  settings_schema,
  default_settings,
  is_system
) VALUES (
  'cta_banner',
  'Call to Action Banner',
  'Prominent CTA section with background',
  'marketing',
  'Megaphone',
  '{
    "type": "object",
    "required": ["heading", "button_text", "button_link"],
    "properties": {
      "heading": {
        "type": "string",
        "title": "Heading",
        "minLength": 1,
        "maxLength": 150
      },
      "description": {
        "type": "string",
        "title": "Description",
        "maxLength": 300
      },
      "button_text": {
        "type": "string",
        "title": "Button Text",
        "minLength": 1,
        "maxLength": 50
      },
      "button_link": {
        "type": "string",
        "title": "Button Link",
        "format": "uri"
      },
      "background_color": {
        "type": "string",
        "title": "Background Color",
        "enum": ["blue", "green", "purple", "orange", "gray"],
        "default": "blue"
      },
      "style": {
        "type": "string",
        "title": "Style",
        "enum": ["solid", "gradient", "image"],
        "default": "gradient"
      }
    }
  }',
  '{
    "heading": "Ready to Get Started?",
    "description": "Join thousands of students in their educational journey",
    "button_text": "Apply Now",
    "button_link": "/apply",
    "background_color": "blue",
    "style": "gradient"
  }',
  true
);

COMMENT ON TABLE component_schemas IS 'Defines reusable component types with JSON Schema validation';
COMMENT ON TABLE builder_pages IS 'Stores page configurations with ordered component instances';
COMMENT ON TABLE page_versions IS 'Version history for rollback capability';
