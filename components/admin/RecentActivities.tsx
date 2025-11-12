'use client'
import React from 'react'
import { Icon } from '@iconify/react'

const RecentActivities = () => {
  const activities = [
    {
      type: 'student',
      title: 'New Student Registration',
      description: 'Sarah Johnson enrolled in Computer Science',
      time: '2 minutes ago',
      icon: 'solar:user-plus-bold',
      iconColor: 'text-success'
    },
    {
      type: 'course',
      title: 'Course Updated',
      description: 'Advanced Mathematics syllabus updated',
      time: '15 minutes ago',
      icon: 'solar:book-bookmark-bold',
      iconColor: 'text-primary'
    },
    {
      type: 'event',
      title: 'Event Scheduled',
      description: 'Annual Tech Symposium scheduled for Dec 15',
      time: '1 hour ago',
      icon: 'solar:calendar-add-bold',
      iconColor: 'text-warning'
    },
    {
      type: 'faculty',
      title: 'Faculty Assignment',
      description: 'Dr. Smith assigned to Data Structures course',
      time: '2 hours ago',
      icon: 'solar:user-speak-rounded-bold',
      iconColor: 'text-info'
    },
    {
      type: 'payment',
      title: 'Payment Received',
      description: 'Tuition payment from John Doe',
      time: '3 hours ago',
      icon: 'solar:wallet-money-bold',
      iconColor: 'text-success'
    },
    {
      type: 'blog',
      title: 'Blog Post Published',
      description: 'New article about AI in Education',
      time: '5 hours ago',
      icon: 'solar:document-text-bold',
      iconColor: 'text-purple'
    }
  ]

  return (
    <div className="card h-100">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
        <h6 className="text-lg fw-semibold mb-0">Recent Activities</h6>
        <button className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-2">
          View All
          <Icon icon="solar:eye-bold" />
        </button>
      </div>
      <div className="card-body p-24">
        <div className="d-flex flex-column gap-20">
          {activities.map((activity, index) => (
            <div key={index} className="d-flex align-items-start gap-16">
              <div className={`w-40-px h-40-px rounded-circle bg-light d-flex align-items-center justify-content-center flex-shrink-0`}>
                <Icon icon={activity.icon} className={`${activity.iconColor} text-lg`} />
              </div>
              <div className="flex-grow-1">
                <h6 className="text-md fw-medium mb-4">{activity.title}</h6>
                <p className="text-sm text-secondary-light mb-4">{activity.description}</p>
                <span className="text-xs text-secondary-light">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecentActivities