# 🎯 Headless CMS Integration - UIT University

Your UIT University website now supports **headless CMS integration** with Sanity! This allows you to manage content dynamically without touching code.

## 🚀 Quick Demo

Visit `/cms-demo` in your application to see the CMS integration in action and check your connection status.

## ⚡ Quick Setup (5 minutes)

### 1. Create Sanity Account
```bash
# Go to https://sanity.io and create a free account
# Create a new project and note your Project ID
```

### 2. Configure Environment
```bash
# Copy the example environment file
cp .env.local.example .env.local

# Edit .env.local and add your credentials:
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Test Connection
```bash
# Start your development server
npm run dev

# Visit http://localhost:3000/cms-demo
# Check if the connection status shows "Connected"
```

## 📋 Content Types Available

| Content Type | Description | Usage |
|-------------|-------------|--------|
| **Courses** | Academic programs | Course listings, details, pricing |
| **Testimonials** | Student feedback | Homepage testimonials carousel |
| **Blog Posts** | News & articles | Blog section, latest updates |
| **Events** | University events | Event listings, announcements |
| **Faculty** | Staff profiles | Faculty directory, about pages |
| **Hero Content** | Banner images | Homepage slideshow |

## 🎨 Using CMS in Your Components

### Replace Static Data with CMS Data

**Before (Static):**
```tsx
const courses = [
  { title: "BS Computer Science", price: "$150,000" },
  // ... hardcoded data
]
```

**After (CMS):**
```tsx
import { useCourses } from '@/hooks/useCMS'
import CoursesFromCMS from '@/components/cms/CoursesFromCMS'

export default function CoursesSection() {
  return <CoursesFromCMS />
}
```

### Available Hooks
```tsx
import { 
  useCourses,
  useTestimonials, 
  useBlogPosts,
  useEvents,
  useFaculty,
  useHeroContent 
} from '@/hooks/useCMS'
```

## 🔧 Integration Examples

### 1. Replace Homepage Courses
```tsx
// In app/page.tsx, replace the static courses section:
import CoursesFromCMS from '@/components/cms/CoursesFromCMS'

// Replace the existing courses carousel with:
<CoursesFromCMS />
```

### 2. Replace Testimonials
```tsx
// Replace static testimonials with:
import TestimonialsFromCMS from '@/components/cms/TestimonialsFromCMS'

<TestimonialsFromCMS />
```

### 3. Dynamic Blog Posts
```tsx
import { useBlogPosts } from '@/hooks/useCMS'

export default function BlogSection() {
  const { blogPosts, loading, error } = useBlogPosts()
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return (
    <div>
      {blogPosts.map(post => (
        <article key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}
```

## 🎯 Benefits for Your University

### For Content Managers
- ✅ **Easy Updates**: Change content without developer help
- ✅ **Rich Media**: Upload images, videos, documents
- ✅ **Preview**: See changes before publishing
- ✅ **Collaboration**: Multiple users can manage content
- ✅ **Version Control**: Track all changes and revert if needed

### For Developers  
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Performance**: Optimized queries and caching
- ✅ **Flexibility**: Easy to extend and customize
- ✅ **Reliability**: Automatic error handling and fallbacks

### For Students & Visitors
- ✅ **Fresh Content**: Always up-to-date information
- ✅ **Fast Loading**: Optimized content delivery
- ✅ **Better UX**: Consistent, professional presentation

## 🛠️ Advanced Configuration

### Custom Queries
```tsx
// Add custom queries in lib/sanity.ts
export const customQueries = {
  featuredCourses: `*[_type == "course" && featured == true]`,
  recentEvents: `*[_type == "event" && eventDate > now()] | order(eventDate asc)[0...3]`
}
```

### Image Optimization
```tsx
import { urlFor } from '@/lib/sanity'

// Automatically optimized images
<img 
  src={urlFor(image).width(800).height(600).url()} 
  alt="Course image" 
/>
```

## 🔒 Security & Performance

- ✅ **Environment Variables**: Sensitive data protected
- ✅ **CDN Delivery**: Fast global content delivery
- ✅ **Caching**: Intelligent content caching
- ✅ **Error Boundaries**: Graceful error handling
- ✅ **Loading States**: Smooth user experience

## 📞 Support

Need help with CMS integration?

1. **Check Status**: Visit `/cms-demo` to diagnose issues
2. **Documentation**: See `docs/CMS_SETUP.md` for detailed setup
3. **Sanity Docs**: [sanity.io/docs](https://sanity.io/docs)
4. **Community**: [Sanity Community](https://slack.sanity.io)

## 🚀 Next Steps

1. **Set up your Sanity project** (5 minutes)
2. **Add content schemas** to your Sanity studio
3. **Replace static sections** with CMS components
4. **Train content managers** on the Sanity interface
5. **Go live** with dynamic content!

---

**Ready to make your university website dynamic?** Start with the `/cms-demo` page! 🎉