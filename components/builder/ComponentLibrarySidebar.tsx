'use client'

import { useEffect, useState } from 'react'
import { PageBuilderAPIV2 as PageBuilderAPI } from '@/lib/page-builder-api-v2'
import { Plus, Search } from 'lucide-react'
import * as Icons from 'lucide-react'

interface ComponentDefinition {
  id: string
  display_name: string
  description?: string
  category?: string
  icon?: string
  preview_image_url?: string
}

interface ComponentLibrarySidebarProps {
  onAddComponent: (componentType: string) => void
}

export function ComponentLibrarySidebar({ onAddComponent }: ComponentLibrarySidebarProps) {
  const [components, setComponents] = useState<ComponentDefinition[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    loadComponents()
  }, [])

  const loadComponents = async () => {
    try {
      const data = await PageBuilderAPI.getComponentDefinitions()
      setComponents(data as ComponentDefinition[])
    } catch (error) {
      console.error('Error loading components:', error)
    } finally {
      setLoading(false)
    }
  }

  // Get unique categories
  const categories = ['all', ...new Set(components.map(c => c.category).filter(Boolean))]

  // Filter components
  const filteredComponents = components.filter(component => {
    const matchesSearch = component.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         component.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Group by category
  const groupedComponents = filteredComponents.reduce((acc, component) => {
    const category = component.category || 'other'
    if (!acc[category]) acc[category] = []
    acc[category].push(component)
    return acc
  }, {} as Record<string, ComponentDefinition[]>)

  const getIcon = (iconName?: string) => {
    if (!iconName) return Icons.Box
    const Icon = (Icons as any)[iconName]
    return Icon || Icons.Box
  }

  if (loading) {
    return (
      <div className="w-80 border-r bg-white p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-80 border-r bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Components</h2>
        
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Component List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {Object.entries(groupedComponents).map(([category, categoryComponents]) => (
          <div key={category}>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {category}
            </h3>
            <div className="space-y-2">
              {categoryComponents.map(component => {
                const Icon = getIcon(component.icon)
                return (
                  <button
                    key={component.id}
                    onClick={() => onAddComponent(component.id)}
                    className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <Icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {component.display_name}
                          </h4>
                          <Plus className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                        {component.description && (
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {component.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        {filteredComponents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Icons.Search className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-gray-600 text-sm">No components found</p>
            <p className="text-gray-400 text-xs mt-1">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  )
}
