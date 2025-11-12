-- ============================================================================
-- PHASE V: ROLE-BASED ACCESS CONTROL (RBAC) & SECURITY
-- Production-Grade Security with JWT Custom Claims and Enhanced RLS
-- ============================================================================
-- This implements:
-- 1. Three application roles: public, editor, admin
-- 2. JWT custom claims for role enforcement
-- 3. Enhanced RLS policies for content governance
-- 4. Audit logging
-- 5. Security functions
-- ============================================================================

-- ============================================================================
-- STEP 1: Create User Roles Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('public', 'editor', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Only admins can manage roles
CREATE POLICY "Admins can manage user roles"
  ON public.user_roles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Users can view their own role
CREATE POLICY "Users can view own role"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- ============================================================================
-- STEP 2: Helper Functions for Role Checking
-- ============================================================================

-- Get current user's role
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
DECLARE
  v_role TEXT;
BEGIN
  -- First check JWT claim (if set by auth hook)
  v_role := current_setting('request.jwt.claims', true)::json->>'app_role';
  
  IF v_role IS NOT NULL THEN
    RETURN v_role;
  END IF;
  
  -- Fallback to database lookup
  SELECT role INTO v_role
  FROM public.user_roles
  WHERE user_id = auth.uid();
  
  RETURN COALESCE(v_role, 'public');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user has specific role
CREATE OR REPLACE FUNCTION public.has_role(required_role TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN public.get_user_role() = required_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user has admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN public.has_role('admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user has editor or admin role
CREATE OR REPLACE FUNCTION public.is_editor_or_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN public.get_user_role() IN ('editor', 'admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- STEP 3: Enhanced RLS Policies for Component Definitions
-- ============================================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Public can view active components" ON definitions.component_definitions;
DROP POLICY IF EXISTS "Authenticated can view all components" ON definitions.component_definitions;

-- Public can view active components (for rendering)
CREATE POLICY "Public can view active components"
  ON definitions.component_definitions
  FOR SELECT
  TO anon, public
  USING (is_active = true);

-- Authenticated users can view all components (for editor)
CREATE POLICY "Authenticated can view all components"
  ON definitions.component_definitions
  FOR SELECT
  TO authenticated
  USING (true);

-- Only admins can create/update/delete component definitions
CREATE POLICY "Only admins can modify component definitions"
  ON definitions.component_definitions
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================================
-- STEP 4: Enhanced RLS Policies for Pages (Content Governance)
-- ============================================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Public can view published pages" ON content.pages;
DROP POLICY IF EXISTS "Authenticated can view all pages" ON content.pages;
DROP POLICY IF EXISTS "Authenticated can create pages" ON content.pages;
DROP POLICY IF EXISTS "Authenticated can update pages" ON content.pages;
DROP POLICY IF EXISTS "Authenticated can delete pages" ON content.pages;

-- ============================================================================
-- PUBLIC ACCESS POLICY (Read Published Content)
-- ============================================================================

CREATE POLICY "Public can view published pages"
  ON content.pages
  FOR SELECT
  TO anon, public
  USING (status = 'PUBLISHED');

-- ============================================================================
-- EDITOR ACCESS POLICY (Draft Management)
-- ============================================================================

-- Editors can view all pages (for editing)
CREATE POLICY "Editors can view all pages"
  ON content.pages
  FOR SELECT
  TO authenticated
  USING (public.is_editor_or_admin());

-- Editors can create DRAFT pages
CREATE POLICY "Editors can create draft pages"
  ON content.pages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    public.is_editor_or_admin() AND
    status = 'DRAFT'
  );

-- Editors can update DRAFT pages (but cannot publish)
CREATE POLICY "Editors can update draft pages"
  ON content.pages
  FOR UPDATE
  TO authenticated
  USING (
    public.is_editor_or_admin() AND
    status = 'DRAFT'
  )
  WITH CHECK (
    public.is_editor_or_admin() AND
    status = 'DRAFT'  -- Prevents editors from changing status to PUBLISHED
  );

-- ============================================================================
-- ADMIN ACCESS POLICY (Publish Control)
-- ============================================================================

-- Admins can publish pages (change status to PUBLISHED)
CREATE POLICY "Admins can publish pages"
  ON content.pages
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Admins can delete any page
CREATE POLICY "Admins can delete pages"
  ON content.pages
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ============================================================================
-- STEP 5: Enhanced RLS Policies for Page Versions
-- ============================================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated can view page versions" ON content.page_versions;

-- Editors and admins can view page versions
CREATE POLICY "Editors can view page versions"
  ON content.page_versions
  FOR SELECT
  TO authenticated
  USING (public.is_editor_or_admin());

-- ============================================================================
-- STEP 6: Audit Logging
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  user_role TEXT,
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID,
  old_data JSONB,
  new_data JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_log_user_id ON public.audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_table_name ON public.audit_log(table_name);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON public.audit_log(created_at DESC);

-- Enable RLS
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Only admins can view audit logs"
  ON public.audit_log
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- ============================================================================
-- STEP 7: Audit Trigger Function
-- ============================================================================

CREATE OR REPLACE FUNCTION public.audit_trigger()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.audit_log (
    user_id,
    user_role,
    action,
    table_name,
    record_id,
    old_data,
    new_data
  ) VALUES (
    auth.uid(),
    public.get_user_role(),
    TG_OP,
    TG_TABLE_SCHEMA || '.' || TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply audit triggers to pages table
DROP TRIGGER IF EXISTS audit_pages_trigger ON content.pages;
CREATE TRIGGER audit_pages_trigger
  AFTER INSERT OR UPDATE OR DELETE ON content.pages
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_trigger();

-- ============================================================================
-- STEP 8: Enhanced Publish Function with Role Check
-- ============================================================================

DROP FUNCTION IF EXISTS content.publish_page(UUID);
CREATE OR REPLACE FUNCTION content.publish_page(p_page_id UUID)
RETURNS content.pages AS $$
DECLARE
  v_page content.pages;
BEGIN
  -- Check if user is admin
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Only administrators can publish pages';
  END IF;
  
  -- Publish the page
  UPDATE content.pages
  SET 
    status = 'PUBLISHED',
    published_at = NOW()
  WHERE id = p_page_id
  RETURNING * INTO v_page;
  
  IF v_page IS NULL THEN
    RAISE EXCEPTION 'Page not found';
  END IF;
  
  RETURN v_page;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- STEP 9: Enhanced Unpublish Function with Role Check
-- ============================================================================

DROP FUNCTION IF EXISTS content.unpublish_page(UUID);
CREATE OR REPLACE FUNCTION content.unpublish_page(p_page_id UUID)
RETURNS content.pages AS $$
DECLARE
  v_page content.pages;
BEGIN
  -- Check if user is admin
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Only administrators can unpublish pages';
  END IF;
  
  -- Unpublish the page
  UPDATE content.pages
  SET 
    status = 'DRAFT',
    published_at = NULL
  WHERE id = p_page_id
  RETURNING * INTO v_page;
  
  IF v_page IS NULL THEN
    RAISE EXCEPTION 'Page not found';
  END IF;
  
  RETURN v_page;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- STEP 10: Function to Assign User Role (Admin Only)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.assign_user_role(
  p_user_id UUID,
  p_role TEXT
)
RETURNS public.user_roles AS $$
DECLARE
  v_user_role public.user_roles;
BEGIN
  -- Check if caller is admin
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Only administrators can assign roles';
  END IF;
  
  -- Validate role
  IF p_role NOT IN ('public', 'editor', 'admin') THEN
    RAISE EXCEPTION 'Invalid role. Must be: public, editor, or admin';
  END IF;
  
  -- Upsert user role
  INSERT INTO public.user_roles (user_id, role, created_by)
  VALUES (p_user_id, p_role, auth.uid())
  ON CONFLICT (user_id)
  DO UPDATE SET
    role = p_role,
    updated_at = NOW()
  RETURNING * INTO v_user_role;
  
  RETURN v_user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- STEP 11: Grant Permissions
-- ============================================================================

-- Grant access to role functions
GRANT EXECUTE ON FUNCTION public.get_user_role() TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.has_role(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_editor_or_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.assign_user_role(UUID, TEXT) TO authenticated;

-- Grant table access
GRANT SELECT ON public.user_roles TO authenticated;
GRANT SELECT ON public.audit_log TO authenticated;

-- ============================================================================
-- STEP 12: Create Initial Admin User (CHANGE THIS!)
-- ============================================================================

-- IMPORTANT: Replace with your actual user ID after signup
-- To get your user ID: SELECT id FROM auth.users WHERE email = 'your@email.com';

-- Example (commented out - uncomment and update with real user ID):
-- INSERT INTO public.user_roles (user_id, role)
-- VALUES ('YOUR-USER-ID-HERE', 'admin')
-- ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- ============================================================================
-- STEP 13: Security Best Practices
-- ============================================================================

-- Revoke public access to auth schema
REVOKE ALL ON SCHEMA auth FROM public;

-- Ensure RLS is enabled on all sensitive tables
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN 
    SELECT schemaname, tablename 
    FROM pg_tables 
    WHERE schemaname IN ('content', 'definitions', 'public')
    AND tablename NOT LIKE 'pg_%'
  LOOP
    EXECUTE format('ALTER TABLE %I.%I ENABLE ROW LEVEL SECURITY', r.schemaname, r.tablename);
  END LOOP;
END $$;

-- ============================================================================
-- Verification Queries
-- ============================================================================

-- Check RLS is enabled
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname IN ('content', 'definitions', 'public')
ORDER BY schemaname, tablename;

-- Check policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE schemaname IN ('content', 'definitions', 'public')
ORDER BY schemaname, tablename, policyname;

-- Test role functions (run as authenticated user)
-- SELECT public.get_user_role();
-- SELECT public.is_admin();
-- SELECT public.is_editor_or_admin();

COMMENT ON TABLE public.user_roles IS 'User role assignments for RBAC';
COMMENT ON TABLE public.audit_log IS 'Audit trail for all content changes';
COMMENT ON FUNCTION public.get_user_role() IS 'Returns current user role from JWT or database';
COMMENT ON FUNCTION public.is_admin() IS 'Checks if current user is admin';
COMMENT ON FUNCTION content.publish_page(UUID) IS 'Publishes a page (admin only)';
