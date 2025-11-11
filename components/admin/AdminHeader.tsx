'use client'
import React from 'react'
import { Icon } from '@iconify/react'

const AdminHeader = () => {
  return (
    <div className="main-header">
      <div className="d-flex align-items-center">
        <h4 className="mb-0 fw-bold text-dark">UIT University Dashboard</h4>
      </div>
      
      <div className="d-flex align-items-center gap-3">
        {/* Search */}
        <div className="position-relative">
          <input 
            type="text" 
            className="form-control ps-5" 
            placeholder="Search..."
            style={{ width: '300px' }}
          />
          <Icon 
            icon="solar:magnifer-linear" 
            className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
          />
        </div>
        
        {/* Notifications */}
        <button className="btn btn-light position-relative">
          <Icon icon="solar:bell-bold" className="fs-5" />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            3
          </span>
        </button>
        
        {/* Profile */}
        <div className="dropdown">
          <button 
            className="btn btn-light dropdown-toggle d-flex align-items-center gap-2" 
            type="button" 
            data-bs-toggle="dropdown"
          >
            <div className="w-32-px h-32-px bg-primary rounded-circle d-flex align-items-center justify-content-center">
              <Icon icon="solar:user-bold" className="text-white" />
            </div>
            <span className="fw-medium">Admin</span>
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdminHeader