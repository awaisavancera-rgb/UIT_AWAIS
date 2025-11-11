# Headless CMS Setup Guide

This project is configured to work with **Sanity CMS** as the headless content management system. Follow these steps to set up your CMS integration.

## 🚀 Quick Start

### 1. Create a Sanity Account
1. Go to [sanity.io](https://sanity.io) and create a free account
2. Create a new project
3. Choose a project name and dataset name (usually 'production')
4. Note down your **Project ID** and **Dataset name**

### 2. Configure Environment Variables
1. Open `.env.local` in your project root
2. Replace the placeholder values:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Set Up Sanity Studio (Optional)
To manage your content, you can set up Sanity Studio:

```bash
npm install -g @sanity/cli
sanity init
```

## 📋 Content Types (Schemas)

The project expects these content types in your Sanity CMS:

### Course Schema
```javascript
{
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string'
    },
    {
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          {title: 'Undergraduate', value: 'Undergraduate'},
          {title: 'Graduate', value: 'Graduate'},
          {title: 'Short Course', value: 'Short Course'}
        ]
      }
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    }
  ]
}
```

### Testimonial Schema
```javascript
{
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'studentName',
      title: 'Student Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'program',
      title: 'Program',
      type: 'string'
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.min(1).max(5)
    },
    {
      name: 'image',
      title: 'Student Image',
      type: 'image'
    }
  ]
}
```

### Blog Post Schema
```javascript
{
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text'
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Featured Image',
      type: 'image'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime'
    }
  ]
}
```

## 🔧 Usage in Components

### Using CMS Data in Your Components

```tsx
import { useCourses } from '@/hooks/useCMS'
import CoursesFromCMS from '@/components/cms/CoursesFromCMS'

export default function MyPage() {
  return (
    <div>
      <h2>Our Courses</h2>
      <CoursesFromCMS />
    </div>
  )
}
```

### Available Hooks
- `useCourses()` - Fetch all courses
- `useTestimonials()` - Fetch all testimonials  
- `useBlogPosts()` - Fetch all blog posts
- `useEvents()` - Fetch all events
- `useHeroContent()` - Fetch hero/banner content
- `useFaculty()` - Fetch faculty members

### Direct API Usage
```tsx
import { getCourses, getTestimonials } from '@/lib/sanity'

// In a server component or API route
const courses = await getCourses()
const testimonials = await getTestimonials()
```

## 🎨 Styling and Customization

The CMS components use your existing Tailwind CSS classes and Shadcn UI components. They automatically:

- Show loading skeletons while fetching data
- Display error messages if CMS is not configured
- Fall back gracefully when no content is found
- Maintain responsive design patterns

## 🔄 Alternative CMS Options

This setup can be adapted for other headless CMS providers:

### Contentful
```bash
npm install contentful
```

### Strapi
```bash
npm install @strapi/sdk-js
```

### Hygraph (GraphCMS)
```bash
npm install graphql-request
```

## 🚨 Troubleshooting

### Common Issues:

1. **"Failed to fetch" errors**: Check your environment variables
2. **CORS errors**: Ensure your domain is added to Sanity's CORS origins
3. **No data showing**: Verify your content types match the expected schemas
4. **Images not loading**: Check image URLs and Sanity CDN settings

### Debug Mode
Add this to see detailed error logs:
```env
NEXT_PUBLIC_DEBUG_CMS=true
```

## 📚 Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)