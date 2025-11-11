import SupabaseCoursesList from '@/components/examples/SupabaseCoursesList'

export default function SupabaseTestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Supabase Database Test</h1>
          <p className="text-gray-600 mt-2">
            This page demonstrates the Supabase database integration. Make sure you have:
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>Created a Supabase project</li>
            <li>Updated your .env.local with Supabase credentials</li>
            <li>Run the schema.sql to create tables</li>
            <li>Optionally run seed.sql to add sample data</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <SupabaseCoursesList />
        </div>
        
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Next Steps</h2>
          <div className="text-blue-800 space-y-2">
            <p>1. <strong>Set up authentication:</strong> Add Supabase Auth for user login/signup</p>
            <p>2. <strong>Create enrollment system:</strong> Allow students to enroll in courses</p>
            <p>3. <strong>Add file storage:</strong> Upload and manage course images</p>
            <p>4. <strong>Build admin panel:</strong> Manage courses, students, and enrollments</p>
            <p>5. <strong>Add real-time features:</strong> Live notifications and updates</p>
          </div>
        </div>
      </div>
    </div>
  )
}