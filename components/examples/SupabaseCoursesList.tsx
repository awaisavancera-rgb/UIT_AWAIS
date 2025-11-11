'use client'

import { useState, useEffect } from 'react'
import { dbFunctions, Course, Instructor } from '@/lib/supabase'

interface CourseWithInstructor extends Course {
  instructor?: Instructor
}

export default function SupabaseCoursesList() {
  const [courses, setCourses] = useState<CourseWithInstructor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await dbFunctions.getCourses()
        setCourses(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch courses')
        console.error('Error fetching courses:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading courses from Supabase...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-medium">Error loading courses</h3>
        <p className="text-red-600 text-sm mt-1">{error}</p>
        <p className="text-red-600 text-sm mt-2">
          Make sure your Supabase credentials are configured in .env.local
        </p>
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <div className="text-center p-8">
        <h3 className="text-gray-600 font-medium">No courses found</h3>
        <p className="text-gray-500 text-sm mt-1">
          Run the seed.sql script to add sample courses to your database
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">
        Courses from Supabase ({courses.length})
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                {course.title}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                course.level === 'bachelor' ? 'bg-blue-100 text-blue-800' :
                course.level === 'master' ? 'bg-green-100 text-green-800' :
                course.level === 'phd' ? 'bg-purple-100 text-purple-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {course.level}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
              {course.description}
            </p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Duration:</span>
                <span className="font-medium">{course.duration}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Price:</span>
                <span className="font-medium text-green-600">
                  PKR {course.price.toLocaleString()}
                </span>
              </div>
              
              {course.category && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Category:</span>
                  <span className="font-medium capitalize">
                    {course.category.replace('-', ' ')}
                  </span>
                </div>
              )}
              
              {course.instructor && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Instructor:</span>
                  <span className="font-medium">{course.instructor.full_name}</span>
                </div>
              )}
              
              {course.max_students && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Max Students:</span>
                  <span className="font-medium">{course.max_students}</span>
                </div>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Created: {new Date(course.created_at).toLocaleDateString()}</span>
                <span className={`px-2 py-1 rounded ${
                  course.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {course.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}