-- ============================================================================
-- PHASE III: ENHANCED DATABASE ARCHITECTURE
-- Production-Grade Headless CMS with Schema Separation & RLS
-- ============================================================================
-- This implements:
-- 1. Separate PostgreSQL schemas (content, definitions)
-- 2. Enhanced JSONB validation with pg_jsonschema
-- 3. Row Level Security (RLS) policies
-- 4. Draft/Published workflow
-- 5. Version history tracking
-- ============================================================================

-- ============================================================================
-- STEP 1: Enable Required Extensions
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_jsonschema";

-- ============================================================================
-- STEP 2: Create Separate Schemas for Logical Separation
-- ============================================================================
CREATE SCHEMA IF NOT EXISTS definitions;
CREATE SCHEMA IF NOT EXISTS content;

-- Grant usage to authenticated users
GRANT USAGE ON SCHEMA definitions TO authenticated;
GRANT USAGE ON SCHEMA content TO authenticated;

-- ============================================================================
-- STEP 3: Component Definitions Schema (Read-Only for Editors)
-- ============================================================================

-- Drop existing table if migrating
DROP TABLE IF EXISTS definitions.component_definitions CASCADE;

CREATE TABLE definitions.component_definitions (
  -- Primary identification (using component_type as PK for clarity)
  id TEXT PRIMARY KEY,  -- e.g., 'hero_slideshow', 'program_grid'
  
  -- Component metadata
  component_name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  icon TEXT,
  preview_image_url TEXT,
  
  -- JSON Schema for validation (the validation blueprint)
  settings_schema JSONB NOT NULL,
  
  -- UI Schema for form generation hints (optional)
  ui_schema JSONB DEFAULT '{}',
  
  -- Default settings when component is added
  default_settings JSONB DEFAULT '{}',
  
  -- Component configuration
  is_active BOOLEAN DEFAULT true,
  is_system BOOLEAN DEFAULT false,
  max_instances INTEGER,
  allowed_parent_types TEXT[],  -- Restrict where component can be used
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  
  -- Validation: Ensure settings_schema is valid JSON Schema
  CONSTRAINT valid_json_schema CHECK (
    jsonb_typeof(settings_schema) = 'object' AND
    settings_schema ? 'type' AND
    settings_schema->>'type' = 'object'
  ),
  
  -- Validation: Ensure default_settings matches schema
  CONSTRAINT default_settings_valid CHECK (
    jsonb_matches_schema(settings_schema, default_settings)
  )
);

-- Index for fast lookups
CREATE INDEX idx_component_definitions_active ON definitions.component_definitions(is_active);
CREATE INDEX idx_component_definitions_category ON definitions.component_definitions(category);

-- ============================================================================
-- STEP 4: Pages Table with Enhanced Validation
-- ============================================================================

-- Status enum for workflow
CREATE TYPE content.page_status AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- Drop existing if migrating
DROP TABLE IF EXISTS content.pages CASCADE;

CREATE TABLE content.pages (
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
  -- Structure: [{ component_type, order, settings }, ...]
  content_data JSONB DEFAULT '[]' NOT NULL,
  
  -- Workflow status
  status content.page_status DEFAULT 'DRAFT' NOT NULL,
  
  -- Publishing metadata
  published_at TIMESTAMP WITH TIME ZONE,
  published_by UUID REFERENCES auth.users(id),
  
  -- Version control
  version INTEGER DEFAULT 1 NOT NULL,
  
  -- Audit trail
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_modified_by UUID REFERENCES auth.users(id),
  
  -- Layout configuration
  layout_template TEXT DEFAULT 'default',
  
  -- Validation: Ensure content_data is an array
  CONSTRAINT valid_content_array CHECK (
    jsonb_typeof(content_data) = 'array'
  )
);

-- Indexes for performance
CREATE INDEX idx_pages_slug ON content.pages(slug);
CREATE INDEX idx_pages_status ON content.pages(status);
CREATE INDEX idx_pages_published ON content.pages(status, published_at) WHERE status = 'PUBLISHED';
CREATE INDEX idx_pages_updated ON content.pages(updated_at DESC);

-- GIN index for JSONB queries (fast component searches)
CREATE INDEX idx_pages_content_data ON content.pages USING GIN (content_data);

-- ============================================================================
-- STEP 5: Page Versions for History Tracking
-- ============================================================================

DROP TABLE IF EXISTS content.page_versions CASCADE;

CREATE TABLE content.page_versions (
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
  created_by UUID REFERENCES auth.users(id),
  change_description TEXT,
  
  -- Ensure unique version per page
  UNIQUE(page_id, version)
);

CREATE INDEX idx_page_versions_page ON content.page_versions(page_id, version DESC);

-- ============================================================================
-- STEP 6: Validation Function - The Integrity Nexus
-- ============================================================================

CREATE OR REPLACE FUNCTION content.validate_page_content(p_content_data JSONB)
RETURNS BOOLEAN AS $$
DECLARE
  v_component JSONB;
  v_component_type TEXT;
  v_settings JSONB;
  v_schema JSONB;
  v_is_valid BOOLEAN;
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
    
    -- Fetch schema from definitions
    SELECT settings_schema INTO v_schema
    FROM definitions.component_definitions
    WHERE id = v_component_type AND is_active = true;
    
    -- If component type not found, reject
    IF v_schema IS NULL THEN
      RAISE EXCEPTION 'Component type "%" not found or inactive', v_component_type;
    END IF;
    
    -- Validate settings against schema using pg_jsonschema
    SELECT jsonb_matches_schema(v_schema, v_settings) INTO v_is_valid;
    
    IF NOT v_is_valid THEN
      RAISE EXCEPTION 'Component "%" has invalid settings. Settings do not match schema.', v_component_type;
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
    NEW.published_by := NEW.last_modified_by;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

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
      created_by,
      change_description
    ) VALUES (
      NEW.id,
      NEW.version,
      NEW.content_data,
      NEW.title,
      NEW.status,
      NEW.last_modified_by,
      'Auto-saved version ' || NEW.version
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

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
-- Component Definitions Policies (Read-Only for Editors)
-- ============================================================================

-- Public can read active components (for rendering)
CREATE POLICY "Public can view active components"
  ON definitions.component_definitions
  FOR SELECT
  TO public
  USING (is_active = true);

-- Authenticated users can read all components (for editor)
CREATE POLICY "Authenticated can view all components"
  ON definitions.component_definitions
  FOR SELECT
  TO authenticated
  USING (true);

-- Only admins can modify component definitions
CREATE POLICY "Only admins can modify components"
  ON definitions.component_definitions
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- ============================================================================
-- Pages Policies (Draft/Published Workflow)
-- ============================================================================

-- Public can view PUBLISHED pages only
CREATE POLICY "Public can view published pages"
  ON content.pages
  FOR SELECT
  TO public
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
  WITH CHECK (
    last_modified_by = auth.uid()
  );

-- Users can update their own draft pages
CREATE POLICY "Users can update own drafts"
  ON content.pages
  FOR UPDATE
  TO authenticated
  USING (
    last_modified_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' IN ('admin', 'editor')
    )
  );

-- Only admins can delete pages
CREATE POLICY "Only admins can delete pages"
  ON content.pages
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- ============================================================================
-- Page Versions Policies
-- ============================================================================

-- Users can view versions of pages they can access
CREATE POLICY "Users can view page versions"
  ON content.page_versions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM content.pages
      WHERE content.pages.id = page_versions.page_id
    )
  );

-- Versions are auto-created by triggers (no direct insert)
CREATE POLICY "No direct version inserts"
  ON content.page_versions
  FOR INSERT
  TO authenticated
  WITH CHECK (false);

-- ============================================================================
-- STEP 10: Helper Functions
-- ============================================================================

-- Function to publish a page
CREATE OR REPLACE FUNCTION content.publish_page(p_page_id UUID, p_user_id UUID)
RETURNS content.pages AS $$
DECLARE
  v_page content.pages;
BEGIN
  UPDATE content.pages
  SET 
    status = 'PUBLISHED',
    published_at = NOW(),
    published_by = p_user_id,
    last_modified_by = p_user_id
  WHERE id = p_page_id
  RETURNING * INTO v_page;
  
  RETURN v_page;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to unpublish a page
CREATE OR REPLACE FUNCTION content.unpublish_page(p_page_id UUID, p_user_id UUID)
RETURNS content.pages AS $$
DECLARE
  v_page content.pages;
BEGIN
  UPDATE content.pages
  SET 
    status = 'DRAFT',
    last_modified_by = p_user_id
  WHERE id = p_page_id
  RETURNING * INTO v_page;
  
  RETURN v_page;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to restore a version
CREATE OR REPLACE FUNCTION content.restore_version(
  p_page_id UUID,
  p_version_id UUID,
  p_user_id UUID
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
    last_modified_by = p_user_id,
    status = 'DRAFT'  -- Restored versions are drafts
  WHERE id = p_page_id
  RETURNING * INTO v_page;
  
  RETURN v_page;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- STEP 11: Migrate Existing Data (if applicable)
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
ON CONFLICT (id) DO NOTHING;

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
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- STEP 12: Grant Permissions
-- ============================================================================

-- Grant select on definitions to public (for rendering)
GRANT SELECT ON definitions.component_definitions TO anon;
GRANT SELECT ON definitions.component_definitions TO authenticated;

-- Grant appropriate permissions on content schema
GRANT SELECT, INSERT, UPDATE ON content.pages TO authenticated;
GRANT SELECT ON content.pages TO anon;
GRANT SELECT ON content.page_versions TO authenticated;

-- Grant usage on sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA content TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA definitions TO authenticated;

-- ============================================================================
-- Verification Query
-- ============================================================================

-- Verify setup
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

COMMENT ON SCHEMA definitions IS 'Component validation blueprints (read-only for editors)';
COMMENT ON SCHEMA content IS 'Dynamic website content with draft/published workflow';
COMMENT ON TABLE definitions.component_definitions IS 'JSON Schema validation blueprints for all components';
COMMENT ON TABLE content.pages IS 'Page content with JSONB storage and validation';
COMMENT ON TABLE content.page_versions IS 'Version history for rollback capability';
