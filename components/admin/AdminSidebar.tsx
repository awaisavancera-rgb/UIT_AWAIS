'use client'
import React from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'

const AdminSidebar = () => {
  const menuItems = [
    {
      title: 'Dashboard',
      icon: 'solar:home-bold',
      href: '/admin',
      active: true
    },
    {
      title: 'Students',
      icon: 'solar:users-group-rounded-bold',
      href: '/admin/students'
    },
    {
      title: 'Faculty',
      icon: 'solar:user-speak-rounded-bold',
      href: '/admin/faculty'
    },
    {
      title: 'Courses',
      icon: 'solar:book-bookmark-bold',
      href: '/admin/courses'
    },
    {
      title: 'Events',
      icon: 'solar:calendar-bold',
      href: '/admin/events'
    },
    {
      title: 'Blog Posts',
      icon: 'solar:document-text-bold',
      href: '/admin/blog'
    },
    {
      title: 'Analytics',
      icon: 'solar:chart-bold',
      href: '/admin/analytics'
    },
    {
      title: 'Settings',
      icon: 'solar:settings-bold',
      href: '/admin/settings'
    }
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Link href="/admin" className="sidebar-logo">
          <Icon icon="solar:graduation-bold" className="me-2" />
          UIT Admin
        </Link>
      </div>
      
      <nav className="sidebar-menu">
        {menuItems.map((item, index) => (
          <div key={index} className="sidebar-menu-item">
            <Link 
              href={item.href} 
              className={`sidebar-menu-link ${item.active ? 'active' : ''}`}
            >
              <Icon icon={item.icon} className="sidebar-menu-icon" />
              {item.title}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  )
}

export default AdminSidebar