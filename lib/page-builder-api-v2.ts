import { supabase } from './supabase'
import type { BuilderPage, ComponentInstance, PageVersion } from '@/types/page-builder'

// ============================================================================
// PAGE BUILDER API V2
// Enhanced API for Phase III architecture with schema separation
// ============================================================================

export type PageStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'

export interface PageV2 extends Omit<BuilderPage, 'components' | 'is_published'> {
  content_data: ComponentInstance[]
  status: PageStatus
  published_by?: string
}

export class PageBuilderAPIV2 {
  // ==========================================================================
  // COMPONENT DEFINITIONS (definitions schema)
  // ==========================================================================

  /**
   * Get all active component definitions
   */
  static async getComponentDefinitions() {
    const { data, error } = await supabase
      .from('definitions.component_definitions')
      .select('*')
      .eq('is_active', true)
      .order('category', { ascending: true })
      .order('display_name', { ascending: true})

    if (error) throw error
    return data
  }

  /**
   * Get component definition by ID
   */
  static async getComponentDefinition(componentId: string) {
    const { data, error } = await supabase
      .from('definitions.component_definitions')
      .select('*')
      .eq('id', componentId)
      .eq('is_active', true)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }
    return data
  }

  // ==========================================================================
  // PAGES (content schema)
  // ==========================================================================

  /**
   * Get all pages (respects RLS)
   */
  static async getPages(status?: PageStatus): Promise<PageV2[]> {
    let query = supabase
      .from('content.pages')
      .select('*')
      .order('updated_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query
    if (error) throw error
    return data as PageV2[]
  }

  /**
   * Get published pages only (public access)
   */
  static async getPublishedPages(): Promise<PageV2[]> {
    return this.getPages('PUBLISHED')
  }

  /**
   * Get page by slug
   */
  static async getPageBySlug(slug: string): Promise<PageV2 | null> {
    const { data, error } = await supabase
      .from('content.pages')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }
    return data as PageV2
  }

  /**
   * Get published page by slug (public access)
   */
  static async getPublishedPageBySlug(slug: string): Promise<PageV2 | null> {
    const { data, error } = await supabase
      .from('content.pages')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'PUBLISHED')
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }
    return data as PageV2
  }

  /**
   * Get page by ID
   */
  static async getPageById(id: string): Promise<PageV2 | null> {
    const { data, error } = await supabase
      .from('content.pages')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }
    return data as PageV2
  }

  /**
   * Create new page
   */
  static async createPage(page: {
    slug: string
    title: string
    meta_title?: string
    meta_description?: string
    content_data?: ComponentInstance[]
    layout_template?: string
    last_modified_by?: string
  }): Promise<PageV2> {
    const { data, error } = await supabase
      .from('content.pages')
      .insert({
        slug: page.slug,
        title: page.title,
        meta_title: page.meta_title,
        meta_description: page.meta_description,
        content_data: page.content_data || [],
        layout_template: page.layout_template || 'default',
        status: 'DRAFT',
        last_modified_by: page.last_modified_by
      })
      .select()
      .single()

    if (error) {
      // Enhanced error messages for validation failures
      if (error.message.includes('Component')) {
        throw new Error(`Validation Error: ${error.message}`)
      }
      throw error
    }
    return data as PageV2
  }

  /**
   * Update page
   * Validation happens automatically via database trigger
   */
  static async updatePage(
    id: string,
    updates: Partial<PageV2>
  ): Promise<PageV2> {
    const { data, error } = await supabase
      .from('content.pages')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.message.includes('Component')) {
        throw new Error(`Validation Error: ${error.message}`)
      }
      throw error
    }
    return data as PageV2
  }

  /**
   * Update page content
   * This triggers validation and version saving
   */
  static async updatePageContent(
    id: string,
    content_data: ComponentInstance[],
    userId?: string
  ): Promise<PageV2> {
    return this.updatePage(id, {
      content_data,
      last_modified_by: userId
    })
  }

  /**
   * Publish page (uses database function for proper workflow)
   */
  static async publishPage(pageId: string, userId?: string): Promise<PageV2> {
    const { data, error } = await supabase.rpc('content.publish_page', {
      p_page_id: pageId,
      p_user_id: userId
    })

    if (error) throw error
    return data as PageV2
  }

  /**
   * Unpublish page (revert to draft)
   */
  static async unpublishPage(pageId: string, userId?: string): Promise<PageV2> {
    const { data, error } = await supabase.rpc('content.unpublish_page', {
      p_page_id: pageId,
      p_user_id: userId
    })

    if (error) throw error
    return data as PageV2
  }

  /**
   * Delete page
   */
  static async deletePage(id: string): Promise<void> {
    const { error } = await supabase
      .from('content.pages')
      .delete()
      .eq('id', id)

    if (error) throw error
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
  ): Promise<PageV2> {
    const page = await this.getPageById(pageId)
    if (!page) throw new Error('Page not found')

    // Get component definition for default settings
    const definition = await this.getComponentDefinition(componentType)
    if (!definition) throw new Error(`Component type "${componentType}" not found`)

    const newComponent: ComponentInstance = {
      component_type: componentType,
      order: position !== undefined ? position : page.content_data.length,
      settings: definition.default_settings
    }

    const content_data = [...page.content_data]
    if (position !== undefined) {
      content_data.splice(position, 0, newComponent)
    } else {
      content_data.push(newComponent)
    }

    // Reorder
    const reordered = content_data.map((c, idx) => ({ ...c, order: idx }))

    return this.updatePageContent(pageId, reordered)
  }

  /**
   * Remove component
   */
  static async removeComponent(
    pageId: string,
    componentIndex: number
  ): Promise<PageV2> {
    const page = await this.getPageById(pageId)
    if (!page) throw new Error('Page not found')

    const content_data = page.content_data.filter((_, idx) => idx !== componentIndex)
    const reordered = content_data.map((c, idx) => ({ ...c, order: idx }))

    return this.updatePageContent(pageId, reordered)
  }

  /**
   * Update component settings
   */
  static async updateComponentSettings(
    pageId: string,
    componentIndex: number,
    settings: Record<string, any>
  ): Promise<PageV2> {
    const page = await this.getPageById(pageId)
    if (!page) throw new Error('Page not found')

    const content_data = [...page.content_data]
    if (!content_data[componentIndex]) {
      throw new Error('Component not found at index')
    }

    content_data[componentIndex] = {
      ...content_data[componentIndex],
      settings
    }

    return this.updatePageContent(pageId, content_data)
  }

  /**
   * Reorder components (drag-and-drop)
   */
  static async reorderComponents(
    pageId: string,
    fromIndex: number,
    toIndex: number
  ): Promise<PageV2> {
    const page = await this.getPageById(pageId)
    if (!page) throw new Error('Page not found')

    const content_data = [...page.content_data]
    const [moved] = content_data.splice(fromIndex, 1)
    content_data.splice(toIndex, 0, moved)

    const reordered = content_data.map((c, idx) => ({ ...c, order: idx }))

    return this.updatePageContent(pageId, reordered)
  }

  /**
   * Duplicate component
   */
  static async duplicateComponent(
    pageId: string,
    componentIndex: number
  ): Promise<PageV2> {
    const page = await this.getPageById(pageId)
    if (!page) throw new Error('Page not found')

    const toDuplicate = page.content_data[componentIndex]
    if (!toDuplicate) throw new Error('Component not found')

    const duplicated: ComponentInstance = {
      ...toDuplicate,
      order: componentIndex + 1
    }

    const content_data = [...page.content_data]
    content_data.splice(componentIndex + 1, 0, duplicated)

    const reordered = content_data.map((c, idx) => ({ ...c, order: idx }))

    return this.updatePageContent(pageId, reordered)
  }

  // ==========================================================================
  // VERSION HISTORY
  // ==========================================================================

  /**
   * Get version history for a page
   */
  static async getPageVersions(pageId: string): Promise<PageVersion[]> {
    const { data, error } = await supabase
      .from('content.page_versions')
      .select('*')
      .eq('page_id', pageId)
      .order('version', { ascending: false })

    if (error) throw error
    return data as PageVersion[]
  }

  /**
   * Restore page to a specific version
   */
  static async restoreVersion(
    pageId: string,
    versionId: string,
    userId?: string
  ): Promise<PageV2> {
    const { data, error } = await supabase.rpc('content.restore_version', {
      p_page_id: pageId,
      p_version_id: versionId,
      p_user_id: userId
    })

    if (error) throw error
    return data as PageV2
  }
}

// Export for backward compatibility
export { PageBuilderAPIV2 as PageBuilderAPI }
