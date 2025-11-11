'use client'
import React from 'react'
import { Icon } from '@iconify/react'

const UniversityStatsCards = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '2,847',
      change: '+156',
      changeType: 'increase',
      period: 'This semester',
      icon: 'solar:users-group-rounded-bold',
      gradient: 'bg-gradient-start-1',
      iconBg: 'bg-primary'
    },
    {
      title: 'Active Courses',
      value: '124',
      change: '+8',
      changeType: 'increase', 
      period: 'This semester',
      icon: 'solar:book-bookmark-bold',
      gradient: 'bg-gradient-start-2',
      iconBg: 'bg-info'
    },
    {
      title: 'Faculty Members',
      value: '89',
      change: '+3',
      changeType: 'increase',
      period: 'This month',
      icon: 'solar:user-speak-rounded-bold',
      gradient: 'bg-gradient-start-3',
      iconBg: 'bg-success'
    },
    {
      title: 'Upcoming Events',
      value: '12',
      change: '+4',
      changeType: 'increase',
      period: 'This month',
      icon: 'solar:calendar-bold',
      gradient: 'bg-gradient-start-4',
      iconBg: 'bg-warning'
    },
    {
      title: 'Total Revenue',
      value: '$284,750',
      change: '+$12,500',
      changeType: 'increase',
      period: 'This month',
      icon: 'solar:wallet-money-bold',
      gradient: 'bg-gradient-start-5',
      iconBg: 'bg-danger'
    }
  ]

  return (
    <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
      {stats.map((stat, index) => (
        <div key={index} className="col">
          <div className={`card shadow-none border ${stat.gradient} h-100`}>
            <div className="card-body p-20">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-medium text-primary-light mb-1">{stat.title}</p>
                  <h6 className="mb-0 fw-bold">{stat.value}</h6>
                </div>
                <div className={`w-50-px h-50-px ${stat.iconBg} rounded-circle d-flex justify-content-center align-items-center`}>
                  <Icon
                    icon={stat.icon}
                    className="text-white text-2xl mb-0"
                  />
                </div>
              </div>
              <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                <span className={`d-inline-flex align-items-center gap-1 ${stat.changeType === 'increase' ? 'text-success-main' : 'text-danger-main'}`}>
                  <Icon 
                    icon={stat.changeType === 'increase' ? 'bxs:up-arrow' : 'bxs:down-arrow'} 
                    className="text-xs" 
                  /> 
                  {stat.change}
                </span>
                {stat.period}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UniversityStatsCards