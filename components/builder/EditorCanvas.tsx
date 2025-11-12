'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ComponentInstance } from '@/types/page-builder'
import { GripVertical, Trash2, Copy, Eye } from 'lucide-react'
import { ComponentRenderer } from './ComponentRenderer'

interface EditorCanvasProps {
  components: ComponentInstance[]
  selectedIndex: number | null
  previewMode: boolean
  onSelectComponent: (index: number) => void
  onRemoveComponent: (index: number) => void
  onDuplicateComponent: (index: number) => void
}

export function EditorCanvas({
  components,
  selectedIndex,
  previewMode,
  onSelectComponent,
  onRemoveComponent,
  onDuplicateComponent
}: EditorCanvasProps) {
  if (components.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center max-w-md">
          <div className="text-gray-400 mb-4">
            <svg className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Building Your Page</h3>
          <p className="text-gray-600 text-sm">
            Add components from the left sidebar to start building your page.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {components.map((component, index) => (
        <SortableComponent
          key={`component-${index}`}
          id={`component-${index}`}
          component={component}
          index={index}
          isSelected={selectedIndex === index}
          previewMode={previewMode}
          onSelect={() => onSelectComponent(index)}
          onRemove={() => onRemoveComponent(index)}
          onDuplicate={() => onDuplicateComponent(index)}
        />
      ))}
    </div>
  )
}

interface SortableComponentProps {
  id: string
  component: ComponentInstance
  index: number
  isSelected: boolean
  previewMode: boolean
  onSelect: () => void
  onRemove: () => void
  onDuplicate: () => void
}

function SortableComponent({
  id,
  component,
  index,
  isSelected,
  previewMode,
  onSelect,
  onRemove,
  onDuplicate
}: SortableComponentProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  if (previewMode) {
    return (
      <div className="mb-4">
        <ComponentRenderer
          componentType={component.component_type}
          settings={component.settings}
        />
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative mb-4 rounded-lg transition-all ${
        isSelected
          ? 'ring-2 ring-blue-500 shadow-lg'
          : 'hover:ring-2 hover:ring-gray-300'
      }`}
      onClick={onSelect}
    >
      {/* Component Toolbar */}
      <div className={`absolute -top-10 left-0 right-0 flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-t-lg transition-opacity ${
        isSelected || isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}>
        <div className="flex items-center gap-2">
          {/* Drag Handle */}
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical className="h-4 w-4 text-gray-400" />
          </button>
          
          <span className="text-xs font-medium text-gray-600">
            {component.component_type}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {/* Duplicate */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDuplicate()
            }}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Duplicate"
          >
            <Copy className="h-4 w-4 text-gray-600" />
          </button>

          {/* Delete */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            className="p-1 hover:bg-red-100 rounded transition-colors"
            title="Delete"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </button>
        </div>
      </div>

      {/* Component Content */}
      <div className={`border-2 rounded-lg overflow-hidden ${
        isSelected ? 'border-blue-500' : 'border-transparent'
      }`}>
        <ComponentRenderer
          componentType={component.component_type}
          settings={component.settings}
        />
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
          Selected
        </div>
      )}
    </div>
  )
}
