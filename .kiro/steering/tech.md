# Technology Stack

## Core Framework
- **Next.js 16.0.0**: React-based full-stack framework with App Router
- **React 19.2.0**: Latest React with concurrent features
- **TypeScript 5**: Full type safety across the application

## Content Management
- **Sanity CMS**: Headless CMS with custom dashboard and schemas
- **Supabase**: PostgreSQL database for page builder and user data
- **Sanity Studio**: Custom dashboard with analytics and content management widgets

## UI & Styling
- **Tailwind CSS 4.0**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Framer Motion**: Animation library for smooth interactions
- **React Bootstrap**: Additional UI components
- **Lucide React**: Icon library
- **Geist Font**: Primary typography

## Data & State
- **@supabase/supabase-js**: Database client and authentication
- **@sanity/client**: CMS data fetching
- **@dnd-kit**: Drag and drop functionality for page builder

## Development Tools
- **ESLint**: Code linting with Next.js configuration
- **PostCSS**: CSS processing
- **TypeScript**: Static type checking

## Common Commands

### Development
```bash
npm run dev          # Start development server (localhost:3000)
npm run studio       # Start Sanity Studio (localhost:3333)
npm run build        # Build production application
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Setup Commands
```bash
npm run setup:supabase    # Initialize Supabase database schema
```

### Environment Setup
Create `.env.local` with:
```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=cgip4fq9
NEXT_PUBLIC_SANITY_DATASET=production

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Build System
- **Next.js Build**: Automatic optimization and bundling
- **Tailwind CSS**: JIT compilation for optimal CSS
- **TypeScript**: Compile-time type checking
- **PostCSS**: CSS processing pipeline

## Deployment
- **Vercel**: Recommended deployment platform
- **Static Export**: Supports static site generation
- **Edge Runtime**: Compatible with edge deployment