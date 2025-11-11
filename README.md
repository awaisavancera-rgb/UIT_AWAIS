This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Admin Page Builder (Drag & Drop)

This project includes a simple page builder similar to Shopify sections:

- Create/edit pages at `/admin/builder`
- Drag and drop to reorder sections
- Data backend: Supabase tables `pages` and `page_sections`
- Public pages render at `/pages/[slug]`

Setup:
1) Configure Supabase env in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```
2) Create tables and policies (run one of):
```
- In Supabase SQL Editor: paste supabase/schema.sql
- Or apply migrations in supabase/migrations (001_initial_schema.sql, 002_pages_builder.sql)
```
3) Auth and RLS:
- For development, you can disable RLS or sign in with Supabase Auth.
- Provided basic policies allow public read of published pages and authenticated writes.
4) Open `/admin/builder`, choose slug (e.g. `home`), add sections, Save, then view at `/pages/home`.

Notes:
- The builder uses existing site components where possible (hero, courses, faculty, timeline).
- Extend `components/cms/PageBuilderRenderer.tsx` to add more widgets.