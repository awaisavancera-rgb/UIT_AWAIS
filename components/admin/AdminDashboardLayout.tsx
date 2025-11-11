'use client';

import { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { AdminUser, Notification } from '@/types/admin';

// Mock data - in real app, this would come from authentication/API
const mockUser: AdminUser = {
  id: '1',
  email: 'admin@university.edu',
  name: 'Admin User',
  role: 'admin',
  permissions: [
    { resource: 'content', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'users', actions: ['read', 'update'] },
    { resource: 'analytics', actions: ['read'] },
  ],
  lastLogin: new Date(),
  isActive: true,
};

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Course Published',
    message: 'Advanced AI course has been published successfully',
    type: 'success',
    priority: 'medium',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: false,
    category: 'content',
  },
  {
    id: '2',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will begin at 2 AM UTC',
    type: 'warning',
    priority: 'high',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    isRead: false,
    category: 'system',
  },
];

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar 
        user={mockUser}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <AdminHeader 
          user={mockUser}
          notifications={mockNotifications}
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}