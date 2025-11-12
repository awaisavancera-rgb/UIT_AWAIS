# Supabase CMS Setup Guide

## 🎉 Your Shopify-Like CMS with Supabase

This is a complete Content Management System built with **only Supabase** - no Sanity needed!

## Features

✅ **Full CRUD Operations** - Create, Read, Update, Delete everything
✅ **Dashboard Analytics** - Real-time stats and insights
✅ **Courses Management** - Add/edit/delete courses with instructors
✅ **Student Management** - Track student enrollments
✅ **Instructor Profiles** - Manage faculty information
✅ **Blog System** - Create and publish blog posts
✅ **Events Calendar** - Manage university events
✅ **Testimonials** - Collect and approve student reviews
✅ **Media Library** - Upload and manage images
✅ **Site Settings** - Configure your website
✅ **Shopify-like Interface** - Clean, modern admin panel

## Setup Instructions

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new project (FREE tier)
4. Wait for project to be ready (~2 minutes)

### Step 2: Run Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire content from `supabase/complete-schema.sql`
4. Paste it into the SQL editor
5. Click "Run" to create all tables

### Step 3: Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Where to find these:**
- Go to your Supabase project
- Click "Settings" → "API"
- Copy "Project URL" and "anon public" key

### Step 4: Enable Storage (for images)

1. In Supabase dashboard, go to **Storage**
2. Create a new bucket called `media`
3. Make it **public** (for image uploads)
4. Set policies to allow uploads

### Step 5: Start Your CMS

```bash
npm run dev
```

Visit: **http://localhost:3000/admin-cms**

## CMS Structure

### Main Sections

1. **Dashboard** (`/admin-cms`)
   - Overview statistics
   - Recent enrollments
   - Quick actions

2. **Courses** (`/admin-cms/courses`)
   - List all courses
   - Add/Edit/Delete courses
   - Assign instructors
   - Set pricing and availability

3. **Students** (`/admin-cms/students`)
   - Manage student records
   - View enrollments
   - Track progress

4. **Instructors** (`/admin-cms/instructors`)
   - Faculty profiles
   - Specializations
   - Course assignments

5. **Enrollments** (`/admin-cms/enrollments`)
   - Student course registrations
   - Payment tracking
   - Status management

6. **Events** (`/admin-cms/events`)
   - University events
   - Workshops and seminars
   - Registration management

7. **Blog** (`/admin-cms/blog`)
   - Create blog posts
   - Publish/unpublish
   - Categories and tags

8. **Testimonials** (`/admin-cms/testimonials`)
   - Student reviews
   - Approve/reject
   - Display order

9. **Media Library** (`/admin-cms/media`)
   - Upload images
   - Manage files
   - Image URLs for content

10. **Settings** (`/admin-cms/settings`)
    - Site configuration
    - Contact information
    - Social media links

## Database Tables

All tables are created automatically:

- `courses` - Course information
- `students` - Student records
- `instructors` - Faculty profiles
- `enrollments` - Course registrations
- `events` - University events
- `blog_posts` - Blog content
- `testimonials` - Student reviews
- `pages` - Custom pages
- `page_sections` - Page builder
- `site_settings` - Configuration
- `media_library` - File management

## API Usage

### Using the Admin API

```typescript
import { SupabaseAdmin } from '@/lib/supabase-admin'

// Get all records
const courses = await SupabaseAdmin.getAll('courses')

// Get by ID
const course = await SupabaseAdmin.getById('courses', id)

// Create
const newCourse = await SupabaseAdmin.create('courses', {
  title: 'New Course',
  price: 99.99,
  is_active: true
})

// Update
await SupabaseAdmin.update('courses', id, {
  title: 'Updated Title'
})

// Delete
await SupabaseAdmin.delete('courses', id)

// Search
const results = await SupabaseAdmin.search('courses', 'title', 'computer')
```

### With Relationships

```typescript
import { CoursesAdmin } from '@/lib/supabase-admin'

// Get courses with instructor info
const courses = await CoursesAdmin.getAllWithInstructor()

// Get course with enrollment count
const course = await CoursesAdmin.getByIdWithDetails(id)
```

## Cost Breakdown (FREE!)

```
Supabase Free Tier:
✅ 500MB Database
✅ 1GB File Storage
✅ 50,000 Monthly Active Users
✅ 2GB Bandwidth
✅ Unlimited API Requests

Total Cost: $0/month 🎉
```

## Next Steps

### 1. Add Sample Data

Create some test courses, instructors, and students to see how it works.

### 2. Customize the Design

Edit the components in `app/admin-cms/` to match your brand.

### 3. Add More Features

- Email notifications
- Payment integration
- Advanced analytics
- File uploads
- User authentication

### 4. Deploy

Deploy to Vercel (FREE):
```bash
vercel deploy
```

## Comparison: Supabase vs Sanity

| Feature | Supabase | Sanity |
|---------|----------|--------|
| Cost | FREE | FREE (limited) |
| Database | PostgreSQL | Proprietary |
| Customization | Full control | Limited |
| Learning Curve | Easy | Medium |
| File Storage | Included | Separate |
| Authentication | Built-in | External |
| Real-time | Yes | Yes |
| Self-hosted | Yes | No |

## Support

Need help? Check:
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- Project issues on GitHub

## What's Removed

✅ Sanity CMS - No longer needed
✅ Sanity Studio - Replaced with custom admin
✅ Sanity schemas - Using Supabase tables
✅ Extra dependencies - Simplified stack

## What You Get

✅ Complete CMS with Supabase only
✅ Shopify-like admin interface
✅ Full CRUD operations
✅ Dashboard analytics
✅ 100% FREE forever
✅ No vendor lock-in
✅ Full database control

---

**You now have a complete, production-ready CMS using only Supabase! 🚀**
