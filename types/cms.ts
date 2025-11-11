// TypeScript types for CMS content

export interface Course {
  _id: string
  title: string
  description: string
  duration: string
  level: 'Undergraduate' | 'Graduate' | 'Short Course'
  price: string
  image: {
    asset: {
      _id: string
      url: string
    }
  }
  slug: {
    current: string
  }
  _createdAt: string
}

export interface CourseDetails {
  _id: string
  title: string
  slug: { current: string }
  description: string
  longDescription: string
  image: { asset: { url: string } }
  instructor: {
    name: string
    title: string
    image: { asset: { url: string } }
    bio: string
    experience: string
  }
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  price: string
  originalPrice?: string
  category: string
  rating: number
  studentsEnrolled: number
  totalLessons: number
  totalHours: string
  language: string
  certificate: boolean
  prerequisites: string[]
  learningOutcomes: string[]
  curriculum: {
    module: string
    lessons: {
      title: string
      duration: string
      type: 'video' | 'text' | 'quiz'
      preview?: boolean
    }[]
  }[]
  features: string[]
  requirements: string[]
  tags: string[]
  startDate: string
  endDate: string
  schedule: string
  location: string
  _createdAt: string
}

export interface Testimonial {
  _id: string
  quote: string
  studentName: string
  program: string
  rating: number
  image?: {
    asset: {
      _id: string
      url: string
    }
  }
  _createdAt: string
}

export interface BlogPost {
  _id: string
  title: string
  excerpt: string
  content: any[] // Rich text content
  category: string
  image: {
    asset: {
      _id: string
      url: string
    }
  }
  slug: {
    current: string
  }
  publishedAt: string
  _createdAt: string
}

export interface Event {
  _id: string
  title: string
  description: string
  eventDate: string
  location: string
  image: {
    asset: {
      _id: string
      url: string
    }
  }
  slug: {
    current: string
  }
  _createdAt: string
}

export interface HeroContent {
  _id: string
  title: string
  subtitle: string
  images: Array<{
    asset: {
      _id: string
      url: string
    }
  }>
}

export interface Faculty {
  _id: string
  name: string
  title?: string
  position?: string
  department?: string
  bio?: any[] // Rich text content
  image?: {
    asset: {
      _id: string
      url: string
    }
  }
  email?: string
  phone?: string
  office?: string
  education?: Array<{
    degree: string
    institution: string
    year: number
  }>
  experience?: number
  specializations?: string[]
  publications?: string[]
  featured?: boolean
  _createdAt: string
}