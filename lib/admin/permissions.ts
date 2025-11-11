// Permission utilities for admin dashboard

import { AdminUser, Permission } from '@/types/admin';
import { USER_ROLES, PERMISSIONS } from './constants';

export function hasPermission(user: AdminUser, resource: string, action: string): boolean {
  // Super admin has all permissions
  if (user.role === USER_ROLES.SUPER_ADMIN) {
    return true;
  }

  // Check if user has specific permission
  return user.permissions.some(permission => 
    permission.resource === resource && 
    permission.actions.includes(action as any)
  );
}

export function canAccessRoute(user: AdminUser, route: string): boolean {
  switch (route) {
    case '/admin':
      return true; // All authenticated admin users can access dashboard
    case '/admin/analytics':
      return hasPermission(user, 'analytics', 'read');
    case '/admin/content':
      return hasPermission(user, 'content', 'read');
    case '/admin/users':
      return hasPermission(user, 'users', 'read');
    case '/admin/settings':
      return hasPermission(user, 'settings', 'read');
    default:
      return false;
  }
}

export function getDefaultPermissions(role: string): Permission[] {
  switch (role) {
    case USER_ROLES.SUPER_ADMIN:
      return [
        { resource: 'content', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'analytics', actions: ['read'] },
        { resource: 'settings', actions: ['read', 'update'] },
      ];
    case USER_ROLES.ADMIN:
      return [
        { resource: 'content', actions: ['create', 'read', 'update', 'delete'] },
        { resource: 'users', actions: ['read', 'update'] },
        { resource: 'analytics', actions: ['read'] },
        { resource: 'settings', actions: ['read'] },
      ];
    case USER_ROLES.EDITOR:
      return [
        { resource: 'content', actions: ['create', 'read', 'update'] },
        { resource: 'analytics', actions: ['read'] },
      ];
    case USER_ROLES.VIEWER:
      return [
        { resource: 'content', actions: ['read'] },
        { resource: 'analytics', actions: ['read'] },
      ];
    default:
      return [];
  }
}

export function filterMenuItems(user: AdminUser, menuItems: any[]) {
  return menuItems.filter(item => {
    if (!item.route) return true;
    return canAccessRoute(user, item.route);
  });
}