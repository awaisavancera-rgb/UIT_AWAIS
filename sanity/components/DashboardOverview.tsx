import React from 'react'

export function DashboardOverview() {
  return (
    <div style={{
      padding: '24px',
      background: '#f5f7fa',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        marginBottom: '32px'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '600',
          color: '#111827',
          margin: '0 0 8px 0'
        }}>
          Dashboard
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          margin: '0'
        }}>
          Manage your university content efficiently
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '8px'
          }}>
            Total Courses
          </div>
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '4px'
          }}>
            24
          </div>
          <div style={{
            fontSize: '12px',
            color: '#10b981'
          }}>
            +3 this month
          </div>
        </div>

        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '8px'
          }}>
            Faculty Members
          </div>
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '4px'
          }}>
            156
          </div>
          <div style={{
            fontSize: '12px',
            color: '#10b981'
          }}>
            +8 new hires
          </div>
        </div>

        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '8px'
          }}>
            Active Events
          </div>
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '4px'
          }}>
            12
          </div>
          <div style={{
            fontSize: '12px',
            color: '#f59e0b'
          }}>
            3 upcoming
          </div>
        </div>

        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '8px'
          }}>
            Blog Posts
          </div>
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '4px'
          }}>
            89
          </div>
          <div style={{
            fontSize: '12px',
            color: '#10b981'
          }}>
            +5 this week
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        marginBottom: '32px'
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#111827',
          margin: '0 0 20px 0'
        }}>
          Quick Actions
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px'
        }}>
          <button style={{
            background: '#1f2937',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}>
            Add New Course
          </button>
          <button style={{
            background: '#f9fafb',
            color: '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}>
            Create Faculty Profile
          </button>
          <button style={{
            background: '#f9fafb',
            color: '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}>
            Schedule Event
          </button>
          <button style={{
            background: '#f9fafb',
            color: '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}>
            Write Blog Post
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#111827',
          margin: '0 0 20px 0'
        }}>
          Recent Activity
        </h2>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {[
            { action: 'New course "Advanced AI" published', time: '2 hours ago', type: 'course' },
            { action: 'Dr. Sarah Johnson added to faculty', time: '4 hours ago', type: 'faculty' },
            { action: 'Tech Conference 2024 event created', time: '1 day ago', type: 'event' },
            { action: 'Blog post "Future of Education" published', time: '2 days ago', type: 'blog' }
          ].map((activity, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 0',
              borderBottom: index < 3 ? '1px solid #f3f4f6' : 'none'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: activity.type === 'course' ? '#3b82f6' : 
                           activity.type === 'faculty' ? '#10b981' :
                           activity.type === 'event' ? '#f59e0b' : '#6b7280'
              }} />
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '14px',
                  color: '#111827',
                  fontWeight: '500'
                }}>
                  {activity.action}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280'
                }}>
                  {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardOverview