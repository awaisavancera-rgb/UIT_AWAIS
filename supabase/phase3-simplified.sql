-- ============================================================================
-- PHASE III: ENHANCED DATABASE ARCHITECTURE (Simplified)
-- Production-Grade Headless CMS without pg_jsonschema dependency
-- ============================================================================
-- This implements:
-- 1. Separate PostgreSQL schemas (content, definitions)
-- 2. JSONB validation via custom functions
-- 3. Row Level Security (RLS) policies
-- 4. Draft/Published workflow
-- 5. Version history tracking
-- ============================================================================

-- ============================================================================
-- STEP 1: Enable Required Extensions
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- STEP 2: Create Separate Schemas for Logical Separation
-- ============================================================================
CREATE SCHEMA IF NOT EXISTS definitions;
CREATE SCHEMA IF NOT EXISTS content;

-- Grant usage to authenticated users
GRANT USAGE ON SCHEMA definitions TO authenticated, anon;
GRANT USAGE ON SCHEMA content TO authenticated, anon;

-- ============================================================================
-- STEP 3: Component Definitions Schema (Read-Only for Editors)
-- ============================================================================

CREATE TABLE IF NOT EXISTS definitions.component_definitions (
  -- Primary identification
  id TEXT PRIMARY KEY,
  
  -- Component metadata
  component_name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  icon TEXT,
  preview_image_url TEXT,
  
  -- JSON Schema for validation
  settings_schema JSONB NOT NULL,
  
  -- UI Schema for form generation hints
  ui_schema JSONB DEFAULT '{}',
  
  -- Default settings
  default_settings JSONB DEFAULT '{}',
  
  -- Component configuration
  is_active BOOLEAN DEFAULT true,
  is_system BOOLEAN DEFAULT false,
  max_instances INTEGER,
  allowed_parent_types TEXT[],
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Validation: Ensure settings_schema is valid JSON Schema
  CONSTRAINT valid_json_schema CHECK (
    jsonb_typeof(settings_schema) = 'object' AND
    settings_schema ? 'type' AND
    settings_schema->>'type' = 'object'
  )
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_component_definitions_active ON definitions.component_definitions(is_active);
CREATE INDEX IF NOT EXISTS idx_component_definitions_category ON definitions.component_definitions(category);

-- ============================================================================
-- STEP 4: Pages Table with Enhanced Validation
-- ============================================================================

-- Status enum for workflow
DO $$ BEGIN
  CREATE TYPE content.page_status AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS content.pages (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Page identification
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  
  -- SEO metadata
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  og_image_url TEXT,
  
  -- Content data (JSONB for performance)
  content_data JSONB DEFAULT '[]' NOT NULL,
  
  -- Workflow status
  status content.page_status DEFAULT 'DRAFT' NOT NULL,
  
  -- Publishing metadata
  published_at TIMESTAMP WITH TIME ZONE,
  
  -- Version control
  version INTEGER DEFAULT 1 NOT NULL,
  
  -- Audit trail
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Layout configuration
  layout_template TEXT DEFAULT 'default',
  
  -- Validation: Ensure content_data is an array
  CONSTRAINT valid_content_array CHECK (
    jsonb_typeof(content_data) = 'array'
  )
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_pages_slug ON content.pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_status ON content.pages(status);
CREATE INDEX IF NOT EXISTS idx_pages_published ON content.pages(status, published_at) WHERE status = 'PUBLISHED';
CREATE INDEX IF NOT EXISTS idx_pages_updated ON content.pages(updated_at DESC);

-- GIN index for JSONB queries
CREATE INDEX IF NOT EXISTS idx_pages_content_data ON content.pages USING GIN (content_data);

-- ============================================================================
-- STEP 5: Page Versions for History Tracking
-- ============================================================================

CREATE TABLE IF NOT EXISTS content.page_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID REFERENCES content.pages(id) ON DELETE CASCADE,
  
  -- Version snapshot
  version INTEGER NOT NULL,
  content_data JSONB NOT NULL,
  
  -- Snapshot metadata
  title TEXT NOT NULL,
  status content.page_status NOT NULL,
  
  -- Audit information
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  change_description TEXT,
  
  -- Ensure unique version per page
  UNIQUE(page_id, version)
);

CREATE INDEX IF NOT EXISTS idx_page_versions_page ON content.page_versions(page_id, version DESC);

-- ============================================================================
-- STEP 6: Simplified Validation Function
-- ============================================================================

CREATE OR REPLACE FUNCTION content.validate_page_content(p_content_data JSONB)
RETURNS BOOLEAN AS $$
DECLARE
  v_component JSONB;
  v_component_type TEXT;
  v_settings JSONB;
  v_exists BOOLEAN;
BEGIN
  -- Validate that content_data is an array
  IF jsonb_typeof(p_content_data) != 'array' THEN
    RAISE EXCEPTION 'content_data must be an array';
  END IF;
  
  -- Iterate through each component
  FOR v_component IN SELECT * FROM jsonb_array_elements(p_content_data)
  LOOP
    -- Extract component_type and settings
    v_component_type := v_component->>'component_type';
    v_settings := v_component->'settings';
    
    -- Validate required fields
    IF v_component_type IS NULL THEN
      RAISE EXCEPTION 'Component missing required field: component_type';
    END IF;
    
    IF v_settings IS NULL THEN
      RAISE EXCEPTION 'Component "%" missing required field: settings', v_component_type;
    END IF;
    
    -- Check if component type exists and is active
    SELECT EXISTS (
      SELECT 1 FROM definitions.component_definitions
      WHERE id = v_component_type AND is_active = true
    ) INTO v_exists;
    
    IF NOT v_exists THEN
      RAISE EXCEPTION 'Component type "%" not found or inactive', v_component_type;
    END IF;
    
    -- Basic validation: settings must be an object
    IF jsonb_typeof(v_settings) != 'object' THEN
      RAISE EXCEPTION 'Component "%" settings must be an object', v_component_type;
    END IF;
  END LOOP;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- STEP 7: Trigger - Enforce Validation Before Save
-- ============================================================================

CREATE OR REPLACE FUNCTION content.trigger_validate_and_version()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate content structure
  PERFORM content.validate_page_content(NEW.content_data);
  
  -- Update timestamp
  NEW.updated_at := NOW();
  
  -- Increment version on content change
  IF TG_OP = 'UPDATE' AND OLD.content_data IS DISTINCT FROM NEW.content_data THEN
    NEW.version := OLD.version + 1;
  END IF;
  
  -- Auto-set published_at when status changes to PUBLISHED
  IF TG_OP = 'UPDATE' AND NEW.status = 'PUBLISHED' AND OLD.status != 'PUBLISHED' THEN
    NEW.published_at := NOW();
  END IF;
  
  -- Clear published_at when unpublishing
  IF TG_OP = 'UPDATE' AND NEW.status != 'PUBLISHED' AND OLD.status = 'PUBLISHED' THEN
    NEW.published_at := NULL;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS validate_content_before_save ON content.pages;
CREATE TRIGGER validate_content_before_save
  BEFORE INSERT OR UPDATE ON content.pages
  FOR EACH ROW
  EXECUTE FUNCTION content.trigger_validate_and_version();

-- ============================================================================
-- STEP 8: Auto-Save Version History
-- ============================================================================

CREATE OR REPLACE FUNCTION content.trigger_save_version()
RETURNS TRIGGER AS $$
BEGIN
  -- Save version snapshot on content change
  IF TG_OP = 'UPDATE' AND OLD.content_data IS DISTINCT FROM NEW.content_data THEN
    INSERT INTO content.page_versions (
      page_id,
      version,
      content_data,
      title,
      status,
      change_description
    ) VALUES (
      NEW.id,
      NEW.version,
      NEW.content_data,
      NEW.title,
      NEW.status,
      'Auto-saved version ' || NEW.version
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS save_version_after_update ON content.pages;
CREATE TRIGGER save_version_after_update
  AFTER UPDATE ON content.pages
  FOR EACH ROW
  EXECUTE FUNCTION content.trigger_save_version();

-- ============================================================================
-- STEP 9: Row Level Security (RLS) Policies
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE definitions.component_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE content.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE content.page_versions ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- Component Definitions Policies
-- ============================================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view active components" ON definitions.component_definitions;
DROP POLICY IF EXISTS "Authenticated can view all components" ON definitions.component_definitions;

-- Public can read active components (for rendering)
CREATE POLICY "Public can view active components"
  ON definitions.component_definitions
  FOR SELECT
  TO anon, public
  USING (is_active = true);

-- Authenticated users can read all components (for editor)
CREATE POLICY "Authenticated can view all components"
  ON definitions.component_definitions
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================================
-- Pages Policies (Draft/Published Workflow)
-- ============================================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Public can view published pages" ON content.pages;
DROP POLICY IF EXISTS "Authenticated can view all pages" ON content.pages;
DROP POLICY IF EXISTS "Authenticated can create pages" ON content.pages;
DROP POLICY IF EXISTS "Authenticated can update pages" ON content.pages;
DROP POLICY IF EXISTS "Authenticated can delete pages" ON content.pages;

-- Public can view PUBLISHED pages only
CREATE POLICY "Public can view published pages"
  ON content.pages
  FOR SELECT
  TO anon, public
  USING (status = 'PUBLISHED');

-- Authenticated users can view all pages (for editor)
CREATE POLICY "Authenticated can view all pages"
  ON content.pages
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can create pages
CREATE POLICY "Authenticated can create pages"
  ON content.pages
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update pages
CREATE POLICY "Authenticated can update pages"
  ON content.pages
  FOR UPDATE
  TO authenticated
  USING (true);

-- Authenticated users can delete pages
CREATE POLICY "Authenticated can delete pages"
  ON content.pages
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- Page Versions Policies
-- ============================================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated can view page versions" ON content.page_versions;

-- Users can view versions of pages they can access
CREATE POLICY "Authenticated can view page versions"
  ON content.page_versions
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================================
-- STEP 10: Helper Functions
-- ============================================================================

-- Function to publish a page
CREATE OR REPLACE FUNCTION content.publish_page(p_page_id UUID)
RETURNS content.pages AS $$
DECLARE
  v_page content.pages;
BEGIN
  UPDATE content.pages
  SET 
    status = 'PUBLISHED',
    published_at = NOW()
  WHERE id = p_page_id
  RETURNING * INTO v_page;
  
  RETURN v_page;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to unpublish a page
CREATE OR REPLACE FUNCTION content.unpublish_page(p_page_id UUID)
RETURNS content.pages AS $$
DECLARE
  v_page content.pages;
BEGIN
  UPDATE content.pages
  SET 
    status = 'DRAFT',
    published_at = NULL
  WHERE id = p_page_id
  RETURNING * INTO v_page;
  
  RETURN v_page;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to restore a version
CREATE OR REPLACE FUNCTION content.restore_version(
  p_page_id UUID,
  p_version_id UUID
)
RETURNS content.pages AS $$
DECLARE
  v_version content.page_versions;
  v_page content.pages;
BEGIN
  -- Get the version
  SELECT * INTO v_version
  FROM content.page_versions
  WHERE id = p_version_id AND page_id = p_page_id;
  
  IF v_version IS NULL THEN
    RAISE EXCEPTION 'Version not found';
  END IF;
  
  -- Restore content
  UPDATE content.pages
  SET 
    content_data = v_version.content_data,
    status = 'DRAFT'
  WHERE id = p_page_id
  RETURNING * INTO v_page;
  
  RETURN v_page;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- STEP 11: Migrate Existing Data
-- ============================================================================

-- Migrate component_schemas to definitions.component_definitions
INSERT INTO definitions.component_definitions (
  id,
  component_name,
  display_name,
  description,
  category,
  icon,
  preview_image_url,
  settings_schema,
  default_settings,
  is_active,
  is_system
)
SELECT 
  component_type as id,
  component_type as component_name,
  display_name,
  description,
  category,
  icon,
  preview_image_url,
  settings_schema,
  default_settings,
  is_active,
  is_system
FROM component_schemas
WHERE EXISTS (SELECT 1 FROM component_schemas)
ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  description = EXCLUDED.description,
  settings_schema = EXCLUDED.settings_schema,
  default_settings = EXCLUDED.default_settings,
  updated_at = NOW();

-- Migrate builder_pages to content.pages
INSERT INTO content.pages (
  id,
  slug,
  title,
  meta_title,
  meta_description,
  meta_keywords,
  og_image_url,
  content_data,
  status,
  published_at,
  version,
  created_at,
  updated_at,
  layout_template
)
SELECT 
  id,
  slug,
  title,
  meta_title,
  meta_description,
  meta_keywords,
  og_image_url,
  components as content_data,
  CASE 
    WHEN is_published THEN 'PUBLISHED'::content.page_status
    ELSE 'DRAFT'::content.page_status
  END as status,
  published_at,
  version,
  created_at,
  updated_at,
  layout_template
FROM builder_pages
WHERE EXISTS (SELECT 1 FROM builder_pages)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  content_data = EXCLUDED.content_data,
  status = EXCLUDED.status,
  updated_at = NOW();

-- ============================================================================
-- STEP 12: Grant Permissions
-- ============================================================================

-- Grant select on definitions to public
GRANT SELECT ON definitions.component_definitions TO anon, authenticated;

-- Grant appropriate permissions on content schema
GRANT SELECT, INSERT, UPDATE, DELETE ON content.pages TO authenticated;
GRANT SELECT ON content.pages TO anon;
GRANT SELECT ON content.page_versions TO authenticated;

-- Grant usage on sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA content TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA definitions TO authenticated;

-- ============================================================================
-- Verification Query
-- ============================================================================

SELECT 
  'Component Definitions' as table_name,
  COUNT(*) as row_count
FROM definitions.component_definitions
UNION ALL
SELECT 
  'Pages',
  COUNT(*)
FROM content.pages
UNION ALL
SELECT 
  'Page Versions',
  COUNT(*)
FROM content.page_versions;

-- Add comments
COMMENT ON SCHEMA definitions IS 'Component validation blueprints (read-only for editors)';
COMMENT ON SCHEMA content IS 'Dynamic website content with draft/published workflow';
COMMENT ON TABLE definitions.component_definitions IS 'Component type definitions with JSON schemas';
COMMENT ON TABLE content.pages IS 'Page content with JSONB storage and validation';
COMMENT ON TABLE content.page_versions IS 'Version history for rollback capability';
