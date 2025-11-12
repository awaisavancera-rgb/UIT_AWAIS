import { supabase } from './supabase'
import type {
  ComponentSchema,
  BuilderPage,
  ComponentInstance,
  PageVersion
} from '@/types/page-builder'

// ============================================================================
// PAGE BUILDER API
// Handles all database operations for the visual builder
// ============================================================================

export class PageBuilderAPI {
  // ==========================================================================
  // COMPONENT SCHEMAS
  // ==========================================================================

  /**
   * Get all available component schemas
   */
  static async getComponentSchemas(): Promise<ComponentSchema[]> {
    const { data, error } = await supabase
      .from('component_schemas')
      .select('*')
      .eq('is_active', true)
      .order('category', { ascending: true })
      .order('display_name', { ascending: true })

    if (error) throw error
    return data as ComponentSchema[]
  }

  /**
   * Get component schema by type
   */
  static async getComponentSchema(componentType: string): Promise<ComponentSchema | null> {
    const { data, error } = await supabase
      .from('component_schemas')
      .select('*')
      .eq('component_type', componentType)
      .eq('is_active', true)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }
    return data as ComponentSchema
  }

  // ==========================================================================
  // PAGES
  // ==========================================================================

  /**
   * Get all builder pages
   */
  static async getPages(): Promise<BuilderPage[]> {
    const { data, error } = await supabase
      .from('builder_pages')
      .select('*')
      .order('updated_at', { ascending: false })

    if (error) throw error
    return data as BuilderPage[]
  }

  /**
   * Get page by slug
   */
  static async getPageBySlug(slug: string): Promise<BuilderPage | null> {
    const { data, error } = await supabase
      .from('builder_pages')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }
    return data as BuilderPage
  }

  /**
   * Get page by ID
   */
  static async getPageById(id: string): Promise<BuilderPage | null> {
    const { data, error } = await supabase
      .from('builder_pages')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }
    return data as BuilderPage
  }

  /**
   * Create new page
   */
  static async createPage(page: Partial<BuilderPage>): Promise<BuilderPage> {
    const { data, error } = await supabase
      .from('builder_pages')
      .insert({
        slug: page.slug,
        title: page.title,
        meta_title: page.meta_title,
        meta_description: page.meta_description,
        components: page.components || [],
        layout_template: page.layout_template || 'default',
        is_published: page.is_published || false,
        last_edited_by: page.last_edited_by
      })
      .select()
      .single()

    if (error) throw error
    return data as BuilderPage
  }

  /**
   * Update page
   * This will trigger validation and version saving automatically
   */
  static async updatePage(
    id: string,
    updates: Partial<BuilderPage>
  ): Promise<BuilderPage> {
    const { data, error } = await supabase
      .from('builder_pages')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      // Enhanced error message for validation failures
      if (error.message.includes('Component')) {
        throw new Error(`Validation Error: ${error.message}`)
      }
      throw error
    }
    return data as BuilderPage
  }

  /**
   * Update page components only
   * Optimized for frequent saves during editing
   */
  static async updatePageComponents(
    id: string,
    components: ComponentInstance[],
    editedBy?: string
  ): Promise<BuilderPage> {
    return this.updatePage(id, {
      components,
      last_edited_by: editedBy
    })
  }

  /**
   * Publish/unpublish page
   */
  static async publishPage(id: string, publish: boolean): Promise<BuilderPage> {
    return this.updatePage(id, {
      is_published: publish,
      published_at: publish ? new Date().toISOString() : undefined
    })
  }

  /**
   * Delete page
   */
  static async deletePage(id: string): Promise<void> {
    const { error } = await supabase
      .from('builder_pages')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // ==========================================================================
  // PAGE VERSIONS
  // ==========================================================================

  /**
   * Get version history for a page
   */
  static async getPageVersions(pageId: string): Promise<PageVersion[]> {
    const { data, error } = await supabase
      .from('page_versions')
      .select('*')
      .eq('page_id', pageId)
      .order('version', { ascending: false })

    if (error) throw error
    return data as PageVersion[]
  }

  /**
   * Restore page to a specific version
   */
  static async restorePageVersion(
    pageId: string,
    versionId: string
  ): Promise<BuilderPage> {
    // Get the version
    const { data: version, error: versionError } = await supabase
      .from('page_versions')
      .select('*')
      .eq('id', versionId)
      .single()

    if (versionError) throw versionError

    // Update page with version's components
    return this.updatePageComponents(
      pageId,
      version.components,
      `Restored to version ${version.version}`
    )
  }

  // ==========================================================================
  // COMPONENT OPERATIONS
  // ==========================================================================

  /**
   * Add component to page
   */
  static async addComponent(
    pageId: string,
    componentType: string,
    position?: number
  ): Promise<BuilderPage> {
    // Get current page
    const page = await this.getPageById(pageId)
    if (!page) throw new Error('Page not found')

    // Get component schema for default settings
    const schema = await this.getComponentSchema(componentType)
    if (!schema) throw new Error(`Component type "${componentType}" not found`)

    // Create new component instance
    const newComponent: ComponentInstance = {
      component_type: componentType,
      order: position !== undefined ? position : page.components.length,
      settings: schema.default_settings
    }

    // Insert at position or append
    const components = [...page.components]
    if (position !== undefined) {
      components.splice(position, 0, newComponent)
    } else {
      components.push(newComponent)
    }

    // Reorder
    const reorderedComponents = components.map((c, idx) => ({
      ...c,
      order: idx
    }))

    return this.updatePageComponents(pageId, reorderedComponents)
  }

  /**
   * Remove component from page
   */
  static async removeComponent(
    pageId: string,
    componentIndex: number
  ): Promise<BuilderPage> {
    const page = await this.getPageById(pageId)
    if (!page) throw new Error('Page not found')

    const components = page.components.filter((_, idx) => idx !== componentIndex)
    
    // Reorder
    const reorderedComponents = components.map((c, idx) => ({
      ...c,
      order: idx
    }))

    return this.updatePageComponents(pageId, reorderedComponents)
  }

  /**
   * Update component settings
   */
  static async updateComponentSettings(
    pageId: string,
    componentIndex: number,
    settings: Record<string, any>
  ): Promise<BuilderPage> {
    const page = await this.getPageById(pageId)
    if (!page) throw new Error('Page not found')

    const components = [...page.components]
    if (!components[componentIndex]) {
      throw new Error('Component not found at index')
    }

    components[componentIndex] = {
      ...components[componentIndex],
      settings
    }

    return this.updatePageComponents(pageId, components)
  }

  /**
   * Reorder components (for drag-and-drop)
   */
  static async reorderComponents(
    pageId: string,
    fromIndex: number,
    toIndex: number
  ): Promise<BuilderPage> {
    const page = await this.getPageById(pageId)
    if (!page) throw new Error('Page not found')

    const components = [...page.components]
    const [movedComponent] = components.splice(fromIndex, 1)
    components.splice(toIndex, 0, movedComponent)

    // Update order property
    const reorderedComponents = components.map((c, idx) => ({
      ...c,
      order: idx
    }))

    return this.updatePageComponents(pageId, reorderedComponents)
  }

  /**
   * Duplicate component
   */
  static async duplicateComponent(
    pageId: string,
    componentIndex: number
  ): Promise<BuilderPage> {
    const page = await this.getPageById(pageId)
    if (!page) throw new Error('Page not found')

    const componentToDuplicate = page.components[componentIndex]
    if (!componentToDuplicate) throw new Error('Component not found')

    const duplicated: ComponentInstance = {
      ...componentToDuplicate,
      order: componentIndex + 1
    }

    const components = [...page.components]
    components.splice(componentIndex + 1, 0, duplicated)

    // Reorder
    const reorderedComponents = components.map((c, idx) => ({
      ...c,
      order: idx
    }))

    return this.updatePageComponents(pageId, reorderedComponents)
  }
}
