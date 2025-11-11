// Admin Dashboard Type Definitions

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'editor' | 'viewer';
  permissions: Permission[];
  lastLogin: Date;
  isActive: boolean;
}

export interface Permission {
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

export interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  size: WidgetSize;
  position: Position;
  config: WidgetConfig;
  data?: any;
}

export interface WidgetProps {
  widget: DashboardWidget;
  onUpdate: (data: any) => void;
  onResize: (size: WidgetSize) => void;
  onMove: (position: Position) => void;
}

export type WidgetType = 
  | 'analytics-metric' 
  | 'chart' 
  | 'content-list' 
  | 'user-activity' 
  | 'quick-actions'
  | 'notifications';

export interface WidgetSize {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface WidgetConfig {
  refreshInterval?: number;
  showHeader?: boolean;
  customTitle?: string;
  [key: string]: any;
}

export interface AnalyticsMetric {
  label: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  period: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

export interface ContentItem {
  _id: string;
  title: string;
  type: string;
  status: 'published' | 'draft' | 'archived';
  lastModified: Date;
  author: string;
}

export interface ContentManagerProps {
  contentTypes: string[];
  onContentUpdate: (item: ContentItem) => void;
  onBulkAction: (action: string, items: ContentItem[]) => void;
}

export interface DashboardConfig {
  userId: string;
  layout: {
    widgets: DashboardWidget[];
    gridCols: number;
    gridRows: number;
  };
  preferences: {
    theme: 'light' | 'dark';
    autoRefresh: boolean;
    refreshInterval: number;
  };
}

export interface AnalyticsData {
  userMetrics: {
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
    userGrowth: number;
  };
  contentMetrics: {
    totalContent: number;
    publishedContent: number;
    draftContent: number;
    contentGrowth: number;
  };
  systemMetrics: {
    pageViews: number;
    sessionDuration: number;
    bounceRate: number;
    performanceScore: number;
  };
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  isRead: boolean;
  category: string;
}

export interface DashboardLayoutProps {
  children: React.ReactNode;
  user: AdminUser;
  notifications: Notification[];
}