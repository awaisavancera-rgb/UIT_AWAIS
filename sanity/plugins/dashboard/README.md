# Custom Sanity Studio Dashboard

A comprehensive dashboard plugin for Sanity Studio that provides an overview of your content management system with statistics, recent activity, quick actions, and analytics.

## Features

### 📊 Statistics Widget
- Real-time document counts for all content types
- Month-over-month growth indicators
- Visual trend indicators with color-coded badges
- Support for courses, faculty, events, blog posts, and testimonials

### 🚀 Quick Actions Widget
- One-click content creation buttons
- Direct navigation to common admin tasks
- Customizable action buttons with icons
- Support for creating courses, faculty, events, and blog posts

### 📝 Recent Activity Widget
- Live feed of recent document changes
- Activity type indicators (created, updated, published)
- User attribution and timestamps
- Status badges for different document states

### 📋 Document List Widget
- Filterable list of recent documents by type
- Quick edit and view actions
- Status indicators and publication dates
- Responsive grid layout

### 📈 Analytics Widget
- Content performance metrics
- Popular content rankings
- Growth trends and statistics
- Mock analytics data (ready for real integration)

## Installation

The dashboard is already configured in your Sanity Studio. It uses the `@sanity/dashboard` plugin with custom widgets.

## Configuration

The dashboard is configured in `sanity.config.ts` with the following widgets:

```typescript
dashboardTool({
  widgets: [
    {
      name: 'document-stats',
      component: StatsWidget,
      layout: { width: 'medium', height: 'small' }
    },
    {
      name: 'quick-actions',
      component: QuickActionsWidget,
      layout: { width: 'small', height: 'medium' }
    },
    // ... more widgets
  ]
})
```

## Customization

### Adding New Widgets
1. Create a new widget component in `sanity/plugins/dashboard/widgets/`
2. Add it to the dashboard configuration in `sanity.config.ts`
3. Import and register the widget

### Styling
Custom styles are located in `sanity/plugins/dashboard/styles/dashboard.css` and include:
- Gradient backgrounds matching NextAdmin theme
- Hover effects and transitions
- Responsive grid layouts
- Status badge colors

### Data Sources
Widgets use GROQ queries to fetch data from Sanity:
- Real-time document counts
- Recent activity tracking
- Content filtering and sorting
- Status calculations

## Widget Components

### StatsWidget
- Displays content statistics with trend indicators
- Calculates month-over-month changes
- Color-coded metrics with icons

### RecentActivityWidget
- Shows recent document modifications
- Activity type classification
- Time-based formatting

### QuickActionsWidget
- Grid of action buttons for common tasks
- Navigation integration with Sanity router
- Customizable button configurations

### DocumentListWidget
- Filterable document listings
- Quick action buttons for edit/view
- Status and date information

### AnalyticsWidget
- Performance metrics overview
- Popular content rankings
- Growth trend indicators

## Technical Details

- Built with Sanity Studio v3
- Uses @sanity/ui components for consistency
- TypeScript for type safety
- Responsive CSS Grid layout
- Real-time data updates via Sanity client

## Future Enhancements

- Integration with real analytics services
- User role-based widget visibility
- Drag-and-drop widget customization
- Export functionality for reports
- Advanced filtering and search