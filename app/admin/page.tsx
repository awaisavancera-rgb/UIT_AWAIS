'use client'
import React from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'
import UniversityStatsCards from '@/components/admin/UniversityStatsCards'
import RecentActivities from '@/components/admin/RecentActivities'
import StudentEnrollmentChart from '@/components/admin/StudentEnrollmentChart'
import TopCourses from '@/components/admin/TopCourses'
import FacultyOverview from '@/components/admin/FacultyOverview'

export default function AdminDashboard() {
  return (
    <div className="admin-wrapper">
      <AdminSidebar />
      <div className="main-content">
        <AdminHeader />
        <div className="main-body">
          <div className="container-fluid">
            {/* University Statistics Cards */}
            <UniversityStatsCards />
            
            {/* Dashboard Content Grid */}
            <div className="row gy-4 mt-4">
              {/* Student Enrollment Chart */}
              <div className="col-xl-8">
                <StudentEnrollmentChart />
              </div>
              
              {/* Recent Activities */}
              <div className="col-xl-4">
                <div className="fixed-height-card">
                  <RecentActivities />
                </div>
              </div>
              
              {/* Top Courses */}
              <div className="col-xl-6">
                <div className="fixed-height-card">
                  <TopCourses />
                </div>
              </div>
              
              {/* Faculty Overview */}
              <div className="col-xl-6">
                <div className="fixed-height-card">
                  <FacultyOverview />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}