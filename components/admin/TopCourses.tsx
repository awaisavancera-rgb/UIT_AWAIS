'use client'
import React from 'react'
import { Icon } from '@iconify/react'

const TopCourses = () => {
  const courses = [
    {
      name: 'Computer Science Fundamentals',
      instructor: 'Dr. Sarah Johnson',
      students: 156,
      completion: 89,
      rating: 4.8,
      category: 'Computer Science',
      color: 'primary'
    },
    {
      name: 'Advanced Mathematics',
      instructor: 'Prof. Michael Chen',
      students: 134,
      completion: 92,
      rating: 4.9,
      category: 'Mathematics',
      color: 'success'
    },
    {
      name: 'Digital Marketing Strategy',
      instructor: 'Dr. Emily Davis',
      students: 98,
      completion: 76,
      rating: 4.6,
      category: 'Business',
      color: 'info'
    },
    {
      name: 'Data Structures & Algorithms',
      instructor: 'Dr. Robert Wilson',
      students: 87,
      completion: 84,
      rating: 4.7,
      category: 'Computer Science',
      color: 'warning'
    },
    {
      name: 'Web Development Bootcamp',
      instructor: 'Ms. Lisa Anderson',
      students: 203,
      completion: 78,
      rating: 4.5,
      category: 'Technology',
      color: 'danger'
    }
  ]

  return (
    <div className="card h-100">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
        <h6 className="text-lg fw-semibold mb-0">Top Performing Courses</h6>
        <button className="btn btn-sm btn-outline-primary">
          <Icon icon="solar:eye-bold" className="me-1" />
          View All
        </button>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="fw-semibold text-primary-light">Course</th>
                <th className="fw-semibold text-primary-light">Students</th>
                <th className="fw-semibold text-primary-light">Completion</th>
                <th className="fw-semibold text-primary-light">Rating</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center gap-12">
                      <div className={`w-40-px h-40-px rounded-circle bg-${course.color}-100 d-flex align-items-center justify-content-center`}>
                        <Icon 
                          icon="solar:book-bookmark-bold" 
                          className={`text-${course.color} text-lg`} 
                        />
                      </div>
                      <div>
                        <h6 className="text-md fw-medium mb-0">{course.name}</h6>
                        <span className="text-sm text-secondary-light">{course.instructor}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="fw-medium">{course.students}</span>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-8">
                      <div className="progress w-80-px" style={{ height: '6px' }}>
                        <div 
                          className={`progress-bar bg-${course.color}`} 
                          style={{ width: `${course.completion}%` }}
                        ></div>
                      </div>
                      <span className="text-sm fw-medium">{course.completion}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-4">
                      <Icon icon="solar:star-bold" className="text-warning" />
                      <span className="fw-medium">{course.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TopCourses