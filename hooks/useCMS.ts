import { useState, useEffect } from 'react'
import { getCourses, getTestimonials, getBlogPosts, getEvents, getHeroContent, getFaculty, getCourseBySlug } from '@/lib/sanity'
import type { Course, Testimonial, BlogPost, Event, HeroContent, Faculty, CourseDetails } from '@/types/cms'

// Custom hook for fetching courses
export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true)
        const data = await getCourses()
        setCourses(data)
      } catch (err) {
        setError('Failed to fetch courses')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  return { courses, loading, error }
}

// Custom hook for fetching testimonials
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        setLoading(true)
        const data = await getTestimonials()
        setTestimonials(data)
      } catch (err) {
        setError('Failed to fetch testimonials')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  return { testimonials, loading, error }
}

// Custom hook for fetching blog posts
export function useBlogPosts() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        setLoading(true)
        const data = await getBlogPosts()
        setBlogPosts(data)
      } catch (err) {
        setError('Failed to fetch blog posts')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  return { blogPosts, loading, error }
}

// Custom hook for fetching events
export function useEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true)
        const data = await getEvents()
        setEvents(data)
      } catch (err) {
        setError('Failed to fetch events')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return { events, loading, error }
}

// Custom hook for fetching hero content
export function useHeroContent() {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchHeroContent() {
      try {
        setLoading(true)
        const data = await getHeroContent()
        setHeroContent(data)
      } catch (err) {
        setError('Failed to fetch hero content')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchHeroContent()
  }, [])

  return { heroContent, loading, error }
}

// Custom hook for fetching faculty
export function useFaculty() {
  const [faculty, setFaculty] = useState<Faculty[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFaculty() {
      try {
        setLoading(true)
        const data = await getFaculty()
        setFaculty(data)
      } catch (err) {
        setError('Failed to fetch faculty')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchFaculty()
  }, [])

  return { faculty, loading, error }
}

// Custom hook for fetching course details by slug
export function useCourseDetails(slug: string) {
  const [course, setCourse] = useState<CourseDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCourseDetails() {
      try {
        setLoading(true)
        const data = await getCourseBySlug(slug)
        setCourse(data)
      } catch (err) {
        setError('Failed to fetch course details')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchCourseDetails()
    }
  }, [slug])

  return { course, loading, error }
}