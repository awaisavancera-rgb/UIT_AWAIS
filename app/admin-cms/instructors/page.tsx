'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { SupabaseAdmin } from '@/lib/supabase-admin'
import { Plus, Edit, Trash2, Search, Mail, Award } from 'lucide-react'

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadInstructors()
  }, [])

  const loadInstructors = async () => {
    try {
      const data = await SupabaseAdmin.getAll('instructors', {
        orderBy: 'created_at',
        ascending: false
      })
      setInstructors(data)
    } catch (error) {
      console.error('Error loading instructors:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this instructor?')) return
    
    try {
      await SupabaseAdmin.delete('instructors', id)
      setInstructors(instructors.filter(i => i.id !== id))
      alert('Instructor deleted successfully')
    } catch (error) {
      console.error('Error deleting instructor:', error)
      alert('Failed to delete instructor')
    }
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await SupabaseAdmin.update('instructors', id, { is_active: !currentStatus })
      setInstructors(instructors.map(i => 
        i.id === id ? { ...i, is_active: !currentStatus } : i
      ))
    } catch (error) {
      console.error('Error updating instructor:', error)
    }
  }

  const filteredInstructors = instructors.filter(instructor =>
    instructor.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    instructor.specialization?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading instructors...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Instructors</h1>
          <p className="mt-2 text-gray-600">Manage faculty members</p>
        </div>
        <Link
          href="/admin-cms/instructors/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Add Instructor
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInstructors.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No instructors found
          </div>
        ) : (
          filteredInstructors.map((instructor) => (
            <div key={instructor.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {instructor.image_url ? (
                      <img
                        src={instructor.image_url}
                        alt={instructor.full_name}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-600 font-semibold text-xl">
                          {instructor.full_name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{instructor.full_name}</h3>
                      {instructor.specialization && (
                        <p className="text-sm text-gray-600">{instructor.specialization}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    {instructor.email}
                  </div>
                  {instructor.years_experience && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Award className="h-4 w-4" />
                      {instructor.years_experience} years experience
                    </div>
                  )}
                </div>

                {instructor.bio && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{instructor.bio}</p>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <button
                    onClick={() => toggleActive(instructor.id, instructor.is_active)}
                    className={`px-3 py-1 text-xs rounded-full ${
                      instructor.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {instructor.is_active ? 'Active' : 'Inactive'}
                  </button>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin-cms/instructors/${instructor.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(instructor.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Total Instructors</div>
          <div className="text-2xl font-bold text-gray-900">{instructors.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Active Instructors</div>
          <div className="text-2xl font-bold text-green-600">
            {instructors.filter(i => i.is_active).length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Avg. Experience</div>
          <div className="text-2xl font-bold text-blue-600">
            {Math.round(
              instructors.reduce((sum, i) => sum + (i.years_experience || 0), 0) / instructors.length || 0
            )} years
          </div>
        </div>
      </div>
    </div>
  )
}
