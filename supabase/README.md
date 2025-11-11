# Supabase Database Setup for UIT University

This directory contains the database schema and configuration for the UIT University project using Supabase.

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `uit-university`
   - Database Password: (choose a strong password)
   - Region: (choose closest to your location)
5. Click "Create new project"

### 2. Get Your Project Credentials

1. Once your project is created, go to **Settings > API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)

### 3. Update Environment Variables

Update your `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Create Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `schema.sql` and paste it into the SQL editor
3. Click "Run" to create all tables and relationships

### 5. Add Sample Data (Optional)

1. In the SQL Editor, copy the contents of `seed.sql`
2. Click "Run" to populate your database with sample data

## Database Structure

### Tables Created

- **students** - Student information and profiles
- **instructors** - Faculty and instructor details
- **courses** - Course catalog and information
- **enrollments** - Student course enrollments
- **events** - University events and activities
- **blog_posts** - Blog articles and news
- **testimonials** - Student testimonials and reviews
- **event_attendees** - Event registration tracking

### Key Features

- **UUID Primary Keys** - All tables use UUID for better security
- **Row Level Security (RLS)** - Proper access control policies
- **Automatic Timestamps** - Created/updated timestamps with triggers
- **Data Validation** - Check constraints for data integrity
- **Indexes** - Optimized for common queries

## Usage in Your Application

The Supabase client is configured in `lib/supabase.ts` with:

- Type definitions for all database tables
- Helper functions for common operations
- Error handling and data validation

### Example Usage

```typescript
import { dbFunctions } from '@/lib/supabase'

// Get all active courses
const courses = await dbFunctions.getCourses()

// Create a new student enrollment
const enrollment = await dbFunctions.createEnrollment({
  student_id: 'student-uuid',
  course_id: 'course-uuid',
  enrollment_date: new Date().toISOString(),
  status: 'pending',
  payment_status: 'pending'
})
```

## Security Notes

- All tables have Row Level Security enabled
- Public read access for courses, events, blog posts, and testimonials
- Students can only access their own data
- Authentication required for data modifications

## Next Steps

1. Set up authentication (Supabase Auth)
2. Configure email templates
3. Set up file storage for images
4. Add real-time subscriptions if needed
5. Configure backup and monitoring

## Troubleshooting

### Common Issues

1. **Connection Error**: Check your environment variables
2. **Permission Denied**: Verify RLS policies are correctly set
3. **Schema Errors**: Ensure you ran the schema.sql first

### Support

For issues with this setup, check:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Community](https://github.com/supabase/supabase/discussions)