#!/usr/bin/env node

/**
 * Supabase Setup Helper Script
 * 
 * This script helps you set up your Supabase database for the UIT University project.
 * Run with: node scripts/setup-supabase.js
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 UIT University - Supabase Setup Helper\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local file not found!');
  console.log('Please create a .env.local file first.');
  process.exit(1);
}

// Read current .env.local
const envContent = fs.readFileSync(envPath, 'utf8');

// Check if Supabase variables are configured
const hasSupabaseUrl = envContent.includes('NEXT_PUBLIC_SUPABASE_URL=') && 
                      !envContent.includes('NEXT_PUBLIC_SUPABASE_URL=your-supabase-url');
const hasSupabaseKey = envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY=') && 
                      !envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key');

console.log('📋 Setup Checklist:');
console.log('');

// 1. Supabase Project
console.log('1. ✅ Supabase project creation');
console.log('   Go to: https://supabase.com/dashboard');
console.log('   Create a new project named "uit-university"');
console.log('');

// 2. Environment Variables
console.log('2.', hasSupabaseUrl && hasSupabaseKey ? '✅' : '❌', 'Environment variables');
if (!hasSupabaseUrl || !hasSupabaseKey) {
  console.log('   Update your .env.local with:');
  console.log('   - NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co');
  console.log('   - NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key');
  console.log('   Get these from: Settings > API in your Supabase dashboard');
} else {
  console.log('   Environment variables are configured ✅');
}
console.log('');

// 3. Database Schema
console.log('3. ⏳ Database schema setup');
console.log('   In Supabase dashboard, go to SQL Editor');
console.log('   Copy and run the contents of: supabase/schema.sql');
console.log('');

// 4. Sample Data
console.log('4. ⏳ Sample data (optional)');
console.log('   In SQL Editor, copy and run: supabase/seed.sql');
console.log('');

// 5. Test Connection
console.log('5. ⏳ Test the connection');
console.log('   Visit: http://localhost:3000/admin/supabase-test');
console.log('   (after running npm run dev)');
console.log('');

// File locations
console.log('📁 Important files created:');
console.log('   - lib/supabase.ts (Supabase client and functions)');
console.log('   - supabase/schema.sql (Database schema)');
console.log('   - supabase/seed.sql (Sample data)');
console.log('   - supabase/README.md (Detailed setup instructions)');
console.log('   - app/admin/supabase-test/page.tsx (Test page)');
console.log('');

// Next steps
console.log('🎯 Next steps after setup:');
console.log('   1. Set up Supabase Auth for user authentication');
console.log('   2. Create student enrollment system');
console.log('   3. Add file storage for course images');
console.log('   4. Build admin dashboard');
console.log('   5. Add real-time features');
console.log('');

console.log('📖 For detailed instructions, see: supabase/README.md');
console.log('');

if (!hasSupabaseUrl || !hasSupabaseKey) {
  console.log('⚠️  Please configure your Supabase credentials in .env.local before proceeding!');
} else {
  console.log('✅ Ready to test! Run "npm run dev" and visit /admin/supabase-test');
}