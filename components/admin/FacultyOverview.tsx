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
        <button className="btn btn-sm btn-outline-primary">
          <Icon icon="solar:users-group-rounded-bold" className="me-1" />
          Manage Faculty
        </button>
      </div>
      <div className="card-body p-24">
        {/* Department Statistics */}
        <div className="mb-24">
          <h6 className="text-md fw-semibold mb-16">Department Statistics</h6>
          <div className="row g-3">
            {facultyStats.map((dept, index) => (
              <div key={index} className="col-12">
                <div className={`border border-${dept.color}-100 rounded-8 p-16`}>
                  <div className="d-flex align-items-center justify-content-between mb-8">
                    <h6 className="text-sm fw-medium mb-0">{dept.department}</h6>
                    <span className={`badge bg-${dept.color}-100 text-${dept.color} px-8 py-4`}>
                      {dept.members} Faculty
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-16 text-xs text-secondary-light">
                    <span>
                      <Icon icon="solar:book-bookmark-linear" className="me-1" />
                      {dept.courses} Courses
                    </span>
                    <span>
                      <Icon icon="solar:users-group-rounded-linear" className="me-1" />
                      {dept.students} Students
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Faculty */}
        <div>
          <h6 className="text-md fw-semibold mb-16">Top Rated Faculty</h6>
          <div className="d-flex flex-column gap-12">
            {topFaculty.map((faculty, index) => (
              <div key={index} className="d-flex align-items-center justify-content-between p-12 border rounded-8">
                <div className="d-flex align-items-center gap-12">
                  <div className="w-40-px h-40-px bg-primary-100 rounded-circle d-flex align-items-center justify-content-center">
                    <Icon icon="solar:user-bold" className="text-primary" />
                  </div>
                  <div>
                    <h6 className="text-sm fw-medium mb-0">{faculty.name}</h6>
                    <span className="text-xs text-secondary-light">{faculty.department}</span>
                  </div>
                </div>
                <div className="text-end">
                  <div className="d-flex align-items-center gap-4 mb-4">
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