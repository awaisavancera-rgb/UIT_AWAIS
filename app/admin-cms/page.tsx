'use client'

import { useEffect, useState } from 'react'
import { DashboardAnalytics } from '@/lib/supabase-admin'
import { BookOpen, Users, GraduationCap, UserCheck, TrendingUp, Clock } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [recentEnrollments, setRecentEnrollments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [statsData, enrollmentsData] = await Promise.all([
        DashboardAnalytics.getStats(),
        DashboardAnalytics.getRecentEnrollments(5)
      ])
      setStats(statsData)
      setRecentEnrollments(enrollmentsData)
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    )
  }

  const statCards = [
    {
      name: 'Total Courses',
      value: stats?.totalCourses || 0,
      icon: BookOpen,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      name: 'Total Students',
      value: stats?.totalStudents || 0,
      icon: Users,
      color: 'bg-green-500',
      change: '+18%'
    },
    {
      name: 'Instructors',
      value: stats?.totalInstructors || 0,
      icon: GraduationCap,
      color: 'bg-purple-500',
      change: '+5%'
    },
    {
      name: 'Enrollments',
      value: stats?.totalEnrollments || 0,
      icon: UserCheck,
      color: 'bg-orange-500',
      change: '+23%'
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to your university CMS</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Courses</span>
              <span className="font-semibold text-gray-900">{stats?.activeCourses || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending Enrollments</span>
              <span className="font-semibold text-orange-600">{stats?.pendingEnrollments || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Revenue</span>
              <span className="font-semibold text-green-600">$0</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Enrollments</h2>
          <div className="space-y-3">
            {recentEnrollments.length === 0 ? (
              <p className="text-gray-500 text-sm">No enrollments yet</p>
            ) : (
              recentEnrollments.map((enrollment: any) => (
                <div key={enrollment.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {enrollment.student?.full_name || 'Unknown Student'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {enrollment.course?.title || 'Unknown Course'}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    enrollment.status === 'approved' ? 'bg-green-100 text-green-800' :
                    enrollment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {enrollment.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/admin-cms/courses/new"
            className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <BookOpen className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-700">Add Course</span>
          </a>
          <a
            href="/admin-cms/students/new"
            className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Users className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-700">Add Student</span>
          </a>
          <a
            href="/admin-cms/instructors/new"
            className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <GraduationCap className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-700">Add Instructor</span>
          </a>
          <a
            href="/admin-cms/blog/new"
            className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Clock className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-700">New Post</span>
          </a>
        </div>
      </div>
    </div>
  )
}
