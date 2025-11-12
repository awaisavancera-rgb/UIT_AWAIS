# Project Structure

## Root Directory Organization

### Application Code
- **`app/`**: Next.js App Router pages and layouts
  - Route-based organization (`about/`, `admin/`, `courses/`, etc.)
  - Global layout and styling in `layout.tsx` and `globals.css`
  - Page components follow Next.js 13+ conventions

- **`components/`**: Reusable React components
  - **`admin/`**: Admin dashboard and page builder components
  - **`cms/`**: CMS integration and content rendering components
  - **`dashboard/`**: Analytics and management dashboard widgets
  - **`layout/`**: Header, Footer, and navigation components
  - **`sections/`**: Page section components for content blocks
  - **`ui/`**: Base UI components and primitives

### Content Management
- **`sanity/`**: Sanity CMS configuration and customization
  - **`components/`**: Custom Sanity Studio components
  - **`plugins/`**: Custom dashboard plugins and widgets
  - **`schemas/`**: Content type definitions and validation
  - `structure.ts`: Studio navigation and organization
  - `sanity.config.ts`: Main CMS configuration

- **`supabase/`**: Database schema and migrations
  - **`migrations/`**: Database version control
  - `schema.sql`: Complete database structure
  - `seed.sql`: Initial data population

### Configuration & Types
- **`lib/`**: Utility functions and service integrations
  - **`admin/`**: Admin-specific utilities and helpers
  - `sanity.ts`: CMS client configuration
  - `supabase.ts`: Database client setup
  - `utils.ts`: General utility functions

- **`types/`**: TypeScript type definitions
  - `admin.ts`: Admin dashboard and page builder types
  - `cms.ts`: Content management system types

- **`hooks/`**: Custom React hooks
  - `useCMS.ts`: CMS data fetching and management

### Assets & Documentation
- **`public/`**: Static assets and media files
  - **`images/`**: Image assets organized by category
  - Brand assets (logo.png) and icons

- **`docs/`**: Project documentation
- **`scripts/`**: Setup and utility scripts
- **`admin-template/`**: Separate admin template implementation

## File Naming Conventions

### Components
- **PascalCase** for component files: `Header.tsx`, `CourseCard.tsx`
- **camelCase** for utility files: `utils.ts`, `sanity.ts`
- **kebab-case** for page routes: `about/`, `contact/`

### Directory Structure
- Group related components in feature-based folders
- Separate admin functionality from public-facing components
- Keep CMS and database configurations in dedicated directories

## Import Path Conventions
- Use `@/` alias for root-level imports
- Relative imports for closely related files
- Absolute imports for shared utilities and components

## Architecture Patterns

### Component Organization
- **Layout Components**: Header, Footer, navigation in `components/layout/`
- **Feature Components**: Grouped by functionality (admin, cms, dashboard)
- **UI Primitives**: Base components in `components/ui/`
- **Page Sections**: Reusable content blocks in `components/sections/`

### Data Layer
- **CMS Integration**: Sanity client in `lib/sanity.ts`
- **Database Access**: Supabase client in `lib/supabase.ts`
- **Type Safety**: Comprehensive TypeScript definitions in `types/`

### Configuration Management
- **Environment Variables**: `.env.local` for sensitive configuration
- **Build Configuration**: `next.config.ts`, `tsconfig.json`
- **Styling Configuration**: `tailwind.config.js`, `postcss.config.mjs`

## Key Architectural Decisions
- **App Router**: Next.js 13+ file-based routing system
- **Component Co-location**: Related components grouped by feature
- **Type-First Development**: TypeScript definitions drive implementation
- **Headless CMS**: Sanity for content, Supabase for application data
- **Modular Design**: Reusable components and clear separation of concerns