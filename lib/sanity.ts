import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity client configuration
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Only create client if project ID is properly configured
export const client = projectId && projectId !== 'your-project-id' ? createClient({
  projectId,
  dataset,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  apiVersion: '2024-01-01',
}) : null

// Image URL builder
const builder = client ? imageUrlBuilder(client) : null

export function urlFor(source: any) {
  if (!builder) {
    console.warn('Sanity client not configured. Cannot build image URL.')
    return { url: () => '/placeholder-image.jpg' }
  }
  return builder.image(source)
}

// GROQ queries for different content types
export const queries = {
  // Get all courses
  courses: `*[_type == "course"] | order(_createdAt desc) {
    _id,
    title,
    description,
    duration,
    level,
    price,
    image,
    slug,
    _createdAt
  }`,

  // Get all testimonials
  testimonials: `*[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    quote,
    studentName,
    program,
    rating,
    image,
    _createdAt
  }`,

  // Get all blog posts
  blogPosts: `*[_type == "blogPost"] | order(_createdAt desc) {
    _id,
    title,
    excerpt,
    content,
    category,
    image,
    slug,
    publishedAt,
    _createdAt
  }`,

  // Get all events
  events: `*[_type == "event"] | order(eventDate asc) {
    _id,
    title,
    description,
    eventDate,
    location,
    image,
    slug,
    _createdAt
  }`,

  // Get banner/hero content
  heroContent: `*[_type == "heroContent"][0] {
    _id,
    title,
    subtitle,
    images[] {
      asset->{
        _id,
        url
      }
    }
  }`,

  // Get faculty/instructors
  faculty: `*[_type == "faculty"] | order(_createdAt desc) {
    _id,
    name,
    position,
    department,
    bio,
    image,
    email,
    _createdAt
  }`,

  // Get single course by slug
  courseBySlug: `*[_type == "courseDetails" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    longDescription,
    image,
    instructor->{
      name,
      title,
      image,
      bio,
      experience
    },
    duration,
    level,
    price,
    originalPrice,
    category,
    rating,
    studentsEnrolled,
    totalLessons,
    totalHours,
    language,
    certificate,
    prerequisites,
    learningOutcomes,
    curriculum,
    features,
    requirements,
    tags,
    startDate,
    endDate,
    schedule,
    location,
    _createdAt
  }`,

  // Get timeline items
  timeline: `*[_type == "timeline" && isActive == true] | order(order asc) {
    _id,
    year,
    title,
    description,
    shortDescription,
    image,
    order,
    _createdAt
  }`,

  // Get all pages
  pages: `*[_type == "page" && isPublished == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    seoTitle,
    seoDescription,
    publishedAt,
    _createdAt
  }`,

  // Get single page by slug
  pageBySlug: `*[_type == "page" && slug.current == $slug && isPublished == true][0] {
    _id,
    title,
    slug,
    content,
    excerpt,
    featuredImage,
    seoTitle,
    seoDescription,
    publishedAt,
    _createdAt
  }`,

  // Get menu items
  menu: `*[_type == "menu" && isActive == true] | order(order asc) {
    _id,
    title,
    slug,
    page->{
      slug
    },
    order,
    isExternal,
    openInNewTab,
    hasDropdown,
    dropdownItems[]{
      title,
      slug,
      page->{
        slug
      }
    },
    _createdAt
  }`
}

// Fetch functions
export async function getCourses() {
  if (!client) {
    console.warn('Sanity client not configured. Using fallback data.')
    return []
  }
  try {
    return await client.fetch(queries.courses)
  } catch (error) {
    console.error('Error fetching courses:', error)
    return []
  }
}

export async function getTestimonials() {
  if (!client) {
    console.warn('Sanity client not configured. Using fallback data.')
    return []
  }
  try {
    return await client.fetch(queries.testimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

export async function getBlogPosts() {
  if (!client) {
    console.warn('Sanity client not configured. Using fallback data.')
    return []
  }
  try {
    return await client.fetch(queries.blogPosts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getEvents() {
  if (!client) {
    console.warn('Sanity client not configured. Using fallback data.')
    return []
  }
  try {
    return await client.fetch(queries.events)
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}

export async function getHeroContent() {
  if (!client) {
    console.warn('Sanity client not configured. Using fallback data.')
    return null
  }
  try {
    return await client.fetch(queries.heroContent)
  } catch (error) {
    console.error('Error fetching hero content:', error)
    return null
  }
}

export async function getFaculty() {
  if (!client) {
    console.warn('Sanity client not configured. Using fallback data.')
    return []
  }
  try {
    return await client.fetch(queries.faculty)
  } catch (error) {
    console.error('Error fetching faculty:', error)
    return []
  }
}

export async function getCourseBySlug(slug: string) {
  if (!client) {
    console.warn('Sanity client not configured. Using fallback data.')
    return null
  }
  try {
    return await client.fetch(queries.courseBySlug, { slug })
  } catch (error) {
    console.error('Error fetching course by slug:', error)
    return null
  }
}

export async function getTimeline() {
  if (!client) {
    console.warn('Sanity client not configured. Using fallback data.')
    return []
  }
  try {
    return await client.fetch(queries.timeline)
  } catch (error) {
    console.error('Error fetching timeline:', error)
    return []
  }
}

export async function getPages() {
  if (!client) {
    console.warn('Sanity client not configured. Using fallback data.')
    return []
  }
  try {
    return await client.fetch(queries.pages)
  } catch (error) {
    console.error('Error fetching pages:', error)
    return []
  }
}

export async function getPageBySlug(slug: string) {
  if (!client) {
    console.warn('Sanity client not configured. Using fallback data.')
    return null
  }
  try {
    return await client.fetch(queries.pageBySlug, { slug })
  } catch (error) {
    console.error('Error fetching page by slug:', error)
    return null
  }
}

export async function getMenu() {
  if (!client) {
    console.warn('Sanity client not configured. Using fallback data.')
    return []
  }
  try {
    return await client.fetch(queries.menu)
  } catch (error) {
    console.error('Error fetching menu:', error)
    return []
  }
}