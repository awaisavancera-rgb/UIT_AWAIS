// Admin Dashboard Constants

export const ADMIN_ROUTES = {
  DASHBOARD: '/admin',
  ANALYTICS: '/admin/analytics',
  CONTENT: '/admin/content',
  USERS: '/admin/users',
  SETTINGS: '/admin/settings',
} as const;

export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
} as const;

export const PERMISSIONS = {
  CONTENT: {
    CREATE: 'content:create',
    READ: 'content:read',
    UPDATE: 'content:update',
    DELETE: 'content:delete',
  },
  USERS: {
    CREATE: 'users:create',
    READ: 'users:read',
    UPDATE: 'users:update',
    DELETE: 'users:delete',
  },
  ANALYTICS: {
    READ: 'analytics:read',
  },
  SETTINGS: {
    READ: 'settings:read',
    UPDATE: 'settings:update',
  },
} as const;

export const WIDGET_TYPES = {
  ANALYTICS_METRIC: 'analytics-metric',
  CHART: 'chart',
  CONTENT_LIST: 'content-list',
  USER_ACTIVITY: 'user-activity',
  QUICK_ACTIONS: 'quick-actions',
  NOTIFICATIONS: 'notifications',
} as const;

export const DEFAULT_WIDGET_SIZES = {
  SMALL: { width: 1, height: 1 },
  MEDIUM: { width: 2, height: 1 },
  LARGE: { width: 2, height: 2 },
  WIDE: { width: 3, height: 1 },
} as const;

export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

export const NOTIFICATION_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;