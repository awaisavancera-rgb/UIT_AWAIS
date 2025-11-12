import { supabase } from './supabase'

// Generic CRUD operations for any table
export class SupabaseAdmin {
  // Get all records from a table
  static async getAll<T>(table: string, options?: {
    orderBy?: string
    ascending?: boolean
    filters?: Record<string, any>
  }): Promise<T[]> {
    let query = supabase.from(table).select('*')
    
    if (options?.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        query = query.eq(key, value)
      })
    }
    
    if (options?.orderBy) {
      query = query.order(options.orderBy, { ascending: options.ascending ?? false })
    }
    
    const { data, error } = await query
    if (error) throw error
    return (data || []) as T[]
  }

  // Get single record by ID
  static async getById<T>(table: string, id: string): Promise<T | null> {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }
    return data as T
  }

  // Create new record
  static async create<T>(table: string, data: Partial<T>): Promise<T> {
    const { data: created, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single()
    
    if (error) throw error
    return created as T
  }

  // Update record
  static async update<T>(table: string, id: string, data: Partial<T>): Promise<T> {
    const { data: updated, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return updated as T
  }

  // Delete record
  static async delete(table: string, id: string): Promise<void> {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }

  // Bulk delete
  static async bulkDelete(table: string, ids: string[]): Promise<void> {
    const { error } = await supabase
      .from(table)
      .delete()
      .in('id', ids)
    
    if (error) throw error
  }

  // Search records
  static async search<T>(table: string, column: string, query: string): Promise<T[]> {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .ilike(column, `%${query}%`)
    
    if (error) throw error
    return (data || []) as T[]
  }

  // Get count
  static async count(table: string, filters?: Record<string, any>): Promise<number> {
    let query = supabase.from(table).select('*', { count: 'exact', head: true })
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value)
      })
    }
    
    const { count, error } = await query
    if (error) throw error
    return count || 0
  }

  // Upload file to Supabase Storage
  static async uploadFile(bucket: string, path: string, file: File): Promise<string> {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path)
    
    return publicUrl
  }

  // Delete file from storage
  static async deleteFile(bucket: string, path: string): Promise<void> {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])
    
    if (error) throw error
  }
}

// Specific table operations with relationships
export const CoursesAdmin = {
  async getAllWithInstructor() {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        instructor:instructors(*)
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getByIdWithDetails(id: string) {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        instructor:instructors(*),
        enrollments(count)
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  }
}

export const EnrollmentsAdmin = {
  async getAllWithDetails() {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        student:students(*),
        course:courses(*)
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
}

export const BlogPostsAdmin = {
  async getAllWithAuthor() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:instructors(*)
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
}

// Dashboard Analytics
export const DashboardAnalytics = {
  async getStats() {
    const [
      coursesCount,
      studentsCount,
      instructorsCount,
      enrollmentsCount,
      activeCoursesCount,
      pendingEnrollments
    ] = await Promise.all([
      SupabaseAdmin.count('courses'),
      SupabaseAdmin.count('students'),
      SupabaseAdmin.count('instructors'),
      SupabaseAdmin.count('enrollments'),
      SupabaseAdmin.count('courses', { is_active: true }),
      SupabaseAdmin.count('enrollments', { status: 'pending' })
    ])

    return {
      totalCourses: coursesCount,
      totalStudents: studentsCount,
      totalInstructors: instructorsCount,
      totalEnrollments: enrollmentsCount,
      activeCourses: activeCoursesCount,
      pendingEnrollments
    }
  },

  async getRecentEnrollments(limit = 10) {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        student:students(full_name, email),
        course:courses(title)
      `)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  },

  async getPopularCourses(limit = 5) {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        enrollments(count)
      `)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  }
}
