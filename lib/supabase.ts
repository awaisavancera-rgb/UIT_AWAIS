import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Student {
  id: string
  email: string
  full_name: string
  phone?: string
  date_of_birth?: string
  address?: string
  created_at: string
  updated_at: string
}

export interface Course {
  id: string
  title: string
  description: string
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'bachelor' | 'master' | 'phd'
  price: number
  category: string
  image_url?: string
  instructor_id?: string
  max_students?: number
  start_date?: string
  end_date?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Instructor {
  id: string
  full_name: string
  email: string
  phone?: string
  bio?: string
  specialization?: string
  image_url?: string
  years_experience?: number
  created_at: string
  updated_at: string
}

export interface Enrollment {
  id: string
  student_id: string
  course_id: string
  enrollment_date: string
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  payment_status: 'pending' | 'paid' | 'refunded'
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  title: string
  description: string
  event_date: string
  location: string
  image_url?: string
  max_attendees?: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt?: string
  author_id: string
  category: string
  image_url?: string
  is_published: boolean
  published_at?: string
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  student_name: string
  program: string
  quote: string
  rating: number
  image_url?: string
  is_approved: boolean
  created_at: string
  updated_at: string
}

export interface Page {
  id: string
  slug: string
  title: string
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface PageSection {
  id: string
  page_id: string
  position: number
  type: string
  props: Record<string, any>
  created_at: string
  updated_at: string
}

// Database Functions
export const dbFunctions = {
  // Students
  async getStudents() {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Student[]
  },

  async getStudentById(id: string) {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Student
  },

  async createStudent(student: Omit<Student, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('students')
      .insert(student)
      .select()
      .single()
    
    if (error) throw error
    return data as Student
  },

  // Courses
  async getCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        instructor:instructors(*)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as (Course & { instructor?: Instructor })[]
  },

  async getCourseById(id: string) {
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
    return data as Course & { instructor?: Instructor; enrollments: { count: number }[] }
  },

  async createCourse(course: Omit<Course, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('courses')
      .insert(course)
      .select()
      .single()
    
    if (error) throw error
    return data as Course
  },

  // Instructors
  async getInstructors() {
    const { data, error } = await supabase
      .from('instructors')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Instructor[]
  },

  async createInstructor(instructor: Omit<Instructor, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('instructors')
      .insert(instructor)
      .select()
      .single()
    
    if (error) throw error
    return data as Instructor
  },

  // Enrollments
  async createEnrollment(enrollment: Omit<Enrollment, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('enrollments')
      .insert(enrollment)
      .select()
      .single()
    
    if (error) throw error
    return data as Enrollment
  },

  async getStudentEnrollments(studentId: string) {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        course:courses(*)
      `)
      .eq('student_id', studentId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as (Enrollment & { course: Course })[]
  },

  // Events
  async getEvents() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_active', true)
      .order('event_date', { ascending: true })
    
    if (error) throw error
    return data as Event[]
  },

  async createEvent(event: Omit<Event, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('events')
      .insert(event)
      .select()
      .single()
    
    if (error) throw error
    return data as Event
  },

  // Blog Posts
  async getBlogPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
    
    if (error) throw error
    return data as BlogPost[]
  },

  async createBlogPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(post)
      .select()
      .single()
    
    if (error) throw error
    return data as BlogPost
  },

  // Testimonials
  async getTestimonials() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Testimonial[]
  },

  async createTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('testimonials')
      .insert(testimonial)
      .select()
      .single()
    
    if (error) throw error
    return data as Testimonial
  },

  // Pages (Page Builder)
  async getPageBySlug(slug: string) {
    const { data: page, error: pageError } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()
    if (pageError) throw pageError
    if (!page) return null

    const { data: sections, error: sectionsError } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page_id', page.id)
      .order('position', { ascending: true })
    if (sectionsError) throw sectionsError

    return { page: page as Page, sections: (sections || []) as PageSection[] }
  },

  async upsertPageWithSections(input: { slug: string; title: string; is_published?: boolean; sections: Array<{ type: string; props?: any }> }) {
    // Upsert page
    const { data: existing } = await supabase
      .from('pages')
      .select('id')
      .eq('slug', input.slug)
      .maybeSingle()

    let pageId = existing?.id as string | undefined
    if (!pageId) {
      const { data: created, error } = await supabase
        .from('pages')
        .insert({ slug: input.slug, title: input.title, is_published: input.is_published ?? true })
        .select('id')
        .single()
      if (error) throw error
      pageId = created.id
    } else {
      const { error } = await supabase
        .from('pages')
        .update({ title: input.title, is_published: input.is_published ?? true })
        .eq('id', pageId)
      if (error) throw error
    }

    // Replace sections
    const { error: delErr } = await supabase.from('page_sections').delete().eq('page_id', pageId)
    if (delErr) throw delErr

    if (input.sections.length > 0) {
      const rows = input.sections.map((s, idx) => ({
        page_id: pageId,
        position: idx,
        type: s.type,
        props: s.props ?? {},
      }))
      const { error: insErr } = await supabase.from('page_sections').insert(rows)
      if (insErr) throw insErr
    }
    return pageId
  }
}