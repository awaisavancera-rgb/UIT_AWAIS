'use client'

import Link from 'next/link'
import { Eye, EyeOff, Save, Globe, ArrowLeft, Clock } from 'lucide-react'
import type { PageV2 } from '@/lib/page-builder-api-v2'

interface EditorToolbarProps {
  page: PageV2
  isDirty: boolean
  isSaving: boolean
  previewMode: boolean
  onTogglePreview: () => void
  onSave: () => void
  onPublish: () => void
  onUnpublish: () => void
}

export function EditorToolbar({
  page,
  isDirty,
  isSaving,
  previewMode,
  onTogglePreview,
  onSave,
  onPublish,
  onUnpublish
}: EditorToolbarProps) {
  const isPublished = page.status === 'PUBLISHED'

  return (
    <div className="h-16 border-b bg-white flex items-center justify-between px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin-cms/pages"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </Link>

        <div className="h-6 w-px bg-gray-300"></div>

        <div>
          <h1 className="text-lg font-semibold text-gray-900">{page.title}</h1>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>/{page.slug}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Version {page.version}
            </span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Status Badge */}
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          isPublished
            ? 'bg-green-100 text-green-800'
            : page.status === 'DRAFT'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {page.status}
        </div>

        {/* Dirty Indicator */}
        {isDirty && (
          <div className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
            Unsaved changes
          </div>
        )}

        {/* Preview Toggle */}
        <button
          onClick={onTogglePreview}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            previewMode
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {previewMode ? (
            <>
              <EyeOff className="h-4 w-4" />
              <span className="text-sm font-medium">Edit Mode</span>
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              <span className="text-sm font-medium">Preview</span>
            </>
          )}
        </button>

        {/* Save Button */}
        {isDirty && (
          <button
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span className="text-sm font-medium">
              {isSaving ? 'Saving...' : 'Save'}
            </span>
          </button>
        )}

        {/* Publish/Unpublish Button */}
        {isPublished ? (
          <button
            onClick={onUnpublish}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">Unpublish</span>
          </button>
        ) : (
          <button
            onClick={onPublish}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">Publish</span>
          </button>
        )}
      </div>
    </div>
  )
}
