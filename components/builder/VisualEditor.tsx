'use client'

import { useState, useCallback } from 'react'
import { DndContext, DragEndEvent, DragOverlay, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { ComponentLibrarySidebar } from './ComponentLibrarySidebar'
import { EditorCanvas } from './EditorCanvas'
import { SettingsSidebar } from './SettingsSidebar'
import { EditorToolbar } from './EditorToolbar'
import { PageBuilderAPIV2 as PageBuilderAPI } from '@/lib/page-builder-api-v2'
import type { PageV2 } from '@/lib/page-builder-api-v2'
import type { ComponentInstance } from '@/types/page-builder'
import { Eye, EyeOff, Save, Undo, Redo } from 'lucide-react'

interface VisualEditorProps {
  page: PageV2
  onPageUpdate: (page: PageV2) => void
}

export function VisualEditor({ page, onPageUpdate }: VisualEditorProps) {
  const [selectedComponentIndex, setSelectedComponentIndex] = useState<number | null>(null)
  const [previewMode, setPreviewMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  // Get selected component
  const selectedComponent = selectedComponentIndex !== null 
    ? page.content_data[selectedComponentIndex] 
    : null

  // Handle component reordering (drag-and-drop)
  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over || active.id === over.id) return

    const oldIndex = page.content_data.findIndex((_, idx) => `component-${idx}` === active.id)
    const newIndex = page.content_data.findIndex((_, idx) => `component-${idx}` === over.id)

    if (oldIndex === -1 || newIndex === -1) return

    try {
      const updatedPage = await PageBuilderAPI.reorderComponents(page.id, oldIndex, newIndex)
      onPageUpdate(updatedPage)
      setIsDirty(true)
      
      // Update selected index if needed
      if (selectedComponentIndex === oldIndex) {
        setSelectedComponentIndex(newIndex)
      }
    } catch (error) {
      console.error('Error reordering components:', error)
      alert('Failed to reorder components')
    }
  }, [page, selectedComponentIndex, onPageUpdate])

  // Handle adding component from library
  const handleAddComponent = useCallback(async (componentType: string) => {
    try {
      const updatedPage = await PageBuilderAPI.addComponent(page.id, componentType)
      onPageUpdate(updatedPage)
      setIsDirty(true)
      // Select the newly added component
      setSelectedComponentIndex(updatedPage.content_data.length - 1)
    } catch (error: any) {
      console.error('Error adding component:', error)
      alert(error.message || 'Failed to add component')
    }
  }, [page.id, onPageUpdate])

  // Handle removing component
  const handleRemoveComponent = useCallback(async (index: number) => {
    if (!confirm('Are you sure you want to remove this component?')) return

    try {
      const updatedPage = await PageBuilderAPI.removeComponent(page.id, index)
      onPageUpdate(updatedPage)
      setIsDirty(true)
      
      // Clear selection if removed component was selected
      if (selectedComponentIndex === index) {
        setSelectedComponentIndex(null)
      } else if (selectedComponentIndex !== null && selectedComponentIndex > index) {
        setSelectedComponentIndex(selectedComponentIndex - 1)
      }
    } catch (error) {
      console.error('Error removing component:', error)
      alert('Failed to remove component')
    }
  }, [page.id, selectedComponentIndex, onPageUpdate])

  // Handle duplicating component
  const handleDuplicateComponent = useCallback(async (index: number) => {
    try {
      const updatedPage = await PageBuilderAPI.duplicateComponent(page.id, index)
      onPageUpdate(updatedPage)
      setIsDirty(true)
      setSelectedComponentIndex(index + 1)
    } catch (error) {
      console.error('Error duplicating component:', error)
      alert('Failed to duplicate component')
    }
  }, [page.id, onPageUpdate])

  // Handle updating component settings
  const handleUpdateSettings = useCallback(async (index: number, settings: Record<string, any>) => {
    try {
      const updatedPage = await PageBuilderAPI.updateComponentSettings(page.id, index, settings)
      onPageUpdate(updatedPage)
      setIsDirty(true)
    } catch (error: any) {
      console.error('Error updating settings:', error)
      alert(error.message || 'Failed to update settings')
    }
  }, [page.id, onPageUpdate])

  // Handle save
  const handleSave = useCallback(async () => {
    setIsSaving(true)
    try {
      // Page is already saved via API calls, just mark as clean
      setIsDirty(false)
      alert('Page saved successfully!')
    } catch (error) {
      console.error('Error saving:', error)
      alert('Failed to save page')
    } finally {
      setIsSaving(false)
    }
  }, [])

  // Handle publish
  const handlePublish = useCallback(async () => {
    if (!confirm('Publish this page? It will be visible to the public.')) return

    try {
      const updatedPage = await PageBuilderAPI.publishPage(page.id)
      onPageUpdate(updatedPage)
      setIsDirty(false)
      alert('Page published successfully!')
    } catch (error) {
      console.error('Error publishing:', error)
      alert('Failed to publish page')
    }
  }, [page.id, onPageUpdate])

  // Handle unpublish
  const handleUnpublish = useCallback(async () => {
    if (!confirm('Unpublish this page? It will no longer be visible to the public.')) return

    try {
      const updatedPage = await PageBuilderAPI.unpublishPage(page.id)
      onPageUpdate(updatedPage)
      alert('Page unpublished successfully!')
    } catch (error) {
      console.error('Error unpublishing:', error)
      alert('Failed to unpublish page')
    }
  }, [page.id, onPageUpdate])

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Toolbar */}
      <EditorToolbar
        page={page}
        isDirty={isDirty}
        isSaving={isSaving}
        previewMode={previewMode}
        onTogglePreview={() => setPreviewMode(!previewMode)}
        onSave={handleSave}
        onPublish={handlePublish}
        onUnpublish={handleUnpublish}
      />

      {/* Three-Pane Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Component Library */}
        {!previewMode && (
          <ComponentLibrarySidebar onAddComponent={handleAddComponent} />
        )}

        {/* Center Canvas */}
        <div className="flex-1 overflow-auto bg-white">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={(event) => setActiveId(event.active.id as string)}
          >
            <SortableContext
              items={page.content_data.map((_, idx) => `component-${idx}`)}
              strategy={verticalListSortingStrategy}
            >
              <EditorCanvas
                components={page.content_data}
                selectedIndex={selectedComponentIndex}
                previewMode={previewMode}
                onSelectComponent={setSelectedComponentIndex}
                onRemoveComponent={handleRemoveComponent}
                onDuplicateComponent={handleDuplicateComponent}
              />
            </SortableContext>

            <DragOverlay>
              {activeId ? (
                <div className="bg-white border-2 border-blue-500 rounded-lg p-4 shadow-lg opacity-90">
                  <div className="text-sm font-medium text-gray-900">
                    Dragging component...
                  </div>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>

        {/* Right Sidebar - Settings */}
        {!previewMode && selectedComponent && selectedComponentIndex !== null && (
          <SettingsSidebar
            component={selectedComponent}
            componentIndex={selectedComponentIndex}
            onUpdateSettings={handleUpdateSettings}
            onClose={() => setSelectedComponentIndex(null)}
          />
        )}
      </div>
    </div>
  )
}
