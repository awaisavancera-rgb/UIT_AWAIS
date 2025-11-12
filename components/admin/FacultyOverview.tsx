'use client'
import React from 'react'
import { Icon } from '@iconify/react'

const FacultyOverview = () => {
  const facultyStats = [
    {
      department: 'Computer Science',
      members: 24,
      courses: 18,
      students: 456,
      color: 'primary'
    },
    {
      department: 'Mathematics',
      members: 18,
      courses: 15,
      students: 342,
      color: 'success'
    },
    {
      department: 'Business',
      members: 16,
      courses: 12,
      students: 298,
      color: 'info'
    },
    {
      department: 'Engineering',
      members: 22,
      courses: 20,
      students: 387,
      color: 'warning'
    },
    {
      department: 'Arts & Sciences',
      members: 9,
      courses: 8,
      students: 156,
      color: 'danger'
    }
  ]

  const topFaculty = [
    {
      name: 'Dr. Sarah Johnson',
      department: 'Computer Science',
      rating: 4.9,
      courses: 3,
      students: 156
    },
    {
      name: 'Prof. Michael Chen',
      department: 'Mathematics',
      rating: 4.8,
      courses: 2,
      students: 134
    },
    {
      name: 'Dr. Emily Davis',
      department: 'Business',
      rating: 4.7,
      courses: 2,
      students: 98
    }
  ]

  return (
    <div className="card h-100">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
        <h6 className="text-lg fw-semibold mb-0">Faculty Overview</h6>
        <button className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-2">
          Manage Faculty
          <Icon icon="solar:users-group-rounded-bold" />
        </button>
      </div>
      <div className="card-body p-24">
        {/* Department Statistics */}
        <div className="mb-4">
          <h6 className="text-md fw-semibold mb-3">Department Statistics</h6>
          <div className="d-flex flex-column gap-3">
            {facultyStats.map((dept, index) => (
              <div key={index} className={`border border-${dept.color}-100 rounded-3 p-3`}>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="text-sm fw-medium mb-0">{dept.department}</h6>
                  <span className={`badge bg-${dept.color}-100 text-${dept.color}`} style={{ padding: '0.25rem 0.5rem' }}>
                    {dept.members} Faculty
                  </span>
                </div>
                <div className="d-flex align-items-center gap-3 text-xs text-secondary-light">
                  <span className="d-inline-flex align-items-center gap-1">
                    <Icon icon="solar:book-bookmark-linear" />
                    {dept.courses} Courses
                  </span>
                  <span className="d-inline-flex align-items-center gap-1">
                    <Icon icon="solar:users-group-rounded-linear" />
                    {dept.students} Students
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Faculty */}
        <div>
          <h6 className="text-md fw-semibold mb-3">Top Rated Faculty</h6>
          <div className="d-flex flex-column gap-3">
            {topFaculty.map((faculty, index) => (
              <div key={index} className="d-flex align-items-center justify-content-between p-3 border rounded-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="w-40-px h-40-px bg-primary-100 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                    <Icon icon="solar:user-bold" className="text-primary" />
                  </div>
                  <div>
                    <h6 className="text-sm fw-medium mb-0">{faculty.name}</h6>
                    <span className="text-xs text-secondary-light">{faculty.department}</span>
                  </div>
                </div>
                <div className="text-end flex-shrink-0">
                  <div className="d-flex align-items-center gap-1 mb-1 justify-content-end">
                    <Icon icon="solar:star-bold" className="text-warning text-xs" />
                    <span className="text-xs fw-medium">{faculty.rating}</span>
                  </div>
                  <div className="text-xs text-secondary-light">
                    {faculty.courses} courses • {faculty.students} students
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FacultyOverview