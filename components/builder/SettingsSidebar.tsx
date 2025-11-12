'use client'

import { useState, useEffect } from 'react'
import { X, Save } from 'lucide-react'
import { PageBuilderAPIV2 as PageBuilderAPI } from '@/lib/page-builder-api-v2'
import { ComponentInstance } from '@/types/page-builder'
import { DynamicForm } from './DynamicForm'

interface SettingsSidebarProps {
  component: ComponentInstance
  componentIndex: number
  onUpdateSettings: (index: number, settings: Record<string, any>) => void
  onClose: () => void
}

export function SettingsSidebar({
  component,
  componentIndex,
  onUpdateSettings,
  onClose
}: SettingsSidebarProps) {
  const [schema, setSchema] = useState<any>(null)
  const [uiSchema, setUiSchema] = useState<any>(null)
  const [settings, setSettings] = useState(component.settings)
  const [loading, setLoading] = useState(true)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    loadComponentSchema()
  }, [component.component_type])

  useEffect(() => {
    setSettings(component.settings)
    setHasChanges(false)
  }, [component])

  const loadComponentSchema = async () => {
    try {
      setLoading(true)
      const definition = await PageBuilderAPI.getComponentDefinition(component.component_type)
      if (definition) {
        setSchema(definition.settings_schema)
        setUiSchema(definition.ui_schema || {})
      }
    } catch (error) {
      console.error('Error loading schema:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSettingsChange = (newSettings: Record<string, any>) => {
    setSettings(newSettings)
    setHasChanges(true)
  }

  const handleSave = () => {
    onUpdateSettings(componentIndex, settings)
    setHasChanges(false)
  }

  const handleReset = () => {
    setSettings(component.settings)
    setHasChanges(false)
  }

  if (loading) {
    return (
      <div className="w-96 border-l bg-white p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-96 border-l bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
          <p className="text-xs text-gray-500 mt-1">{component.component_type}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* Settings Form */}
      <div className="flex-1 overflow-y-auto p-4">
        {schema ? (
          <DynamicForm
            schema={schema}
            uiSchema={uiSchema}
            data={settings}
            onChange={handleSettingsChange}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No settings available</p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {hasChanges && (
        <div className="p-4 border-t bg-gray-50">
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
