# Client Setup Instructions

## Fix Sanity CMS Error

The error you're seeing is because the Sanity CMS environment variables are not configured on your laptop.

### Step 1: Create Environment File

Create a file named `.env.local` in the root directory of your project (same level as `package.json`) with the following content:

```bash
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=cgip4fq9
NEXT_PUBLIC_SANITY_DATASET=production

# Sanity project configured for UIT University
# Studio URL: https://cgip4fq9.sanity.studio
```

### Step 2: Restart Development Server

After creating the `.env.local` file:

1. Stop your development server (Ctrl+C)
2. Run `npm run dev` again
3. The Sanity error should be resolved

### Step 3: Verify Setup

Visit any page that uses faculty data (like the home page) to confirm the error is gone.

## Important Notes

- The `.env.local` file should NOT be committed to git (it's already in .gitignore)
- Make sure the file is named exactly `.env.local` (with the dot at the beginning)
- The file should be in the root directory, not in any subfolder

## Alternative: Disable CMS Features

If you don't need the CMS functionality, you can disable it by setting:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=disabled
NEXT_PUBLIC_SANITY_DATASET=production
```

This will make the app use fallback/mock data instead of trying to connect to Sanity.