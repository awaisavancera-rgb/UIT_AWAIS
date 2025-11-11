'use client'

import { useEffect, useMemo, useState } from 'react'
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import PageBuilderRenderer from '@/components/cms/PageBuilderRenderer'
import { dbFunctions } from '@/lib/supabase'

type Section = {
  key: string
  type: string
  props?: Record<string, any>
}

const SECTION_LIBRARY: Omit<Section, 'key'>[] = [
  { type: 'hero', props: { title: 'Welcome to UIT University', subtitle: 'Empowering with Knowledge' } },
  { type: 'courses', props: { title: 'Courses' } },
  { type: 'faculty', props: { title: 'Faculty' } },
  { type: 'timeline', props: { title: 'Timeline' } },
  { type: 'richText', props: { content: [{ _type: 'block', children: [{ _type: 'span', text: 'Your rich text...' }] }] } },
]

function newKey() {
  return Math.random().toString(36).slice(2, 9)
}

export default function PageBuilderAdmin() {
  const [slug, setSlug] = useState('home')
  const [title, setTitle] = useState('Home')
  const [sections, setSections] = useState<Section[]>([])
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await dbFunctions.getPageBySlug(slug)
        if (data) {
          setTitle(data.page.title || 'Untitled')
          setSections((data.sections || []).map((s) => ({
            key: s.id,
            type: s.type,
            props: s.props || {},
          })))
        } else {
          setSections([])
        }
      } catch (e) {
        setError('Failed to load page')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = sections.findIndex(s => s.key === active.id)
    const newIndex = sections.findIndex(s => s.key === over.id)
    setSections(arrayMove(sections, oldIndex, newIndex))
  }

  const addSection = (template: Omit<Section, 'key'>) => {
    setSections(prev => [...prev, { key: newKey(), ...template }])
  }

  const removeSection = (key: string) => {
    setSections(prev => prev.filter(s => s.key !== key))
  }

  const save = async () => {
    setSaving(true)
    setError(null)
    try {
      await dbFunctions.upsertPageWithSections({
        slug,
        title,
        sections: sections.map(s => ({ type: s.type, props: s.props || {} })),
      })
    } catch (e) {
      setError('Failed to save page')
    } finally {
      setSaving(false)
    }
  }

  const previewSections = useMemo(
    () => sections.map(({ key, ...rest }) => ({ _key: key, ...rest })),
    [sections]
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Page Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Slug</label>
                <input
                  className="w-full rounded-md border px-3 py-2 bg-background"
                  placeholder="home"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <input
                  className="w-full rounded-md border px-3 py-2 bg-background"
                  placeholder="Home"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={save} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Page'}
                </Button>
                <a className="inline-flex" target="_blank" href={`/pages/${slug}`}>
                  <Button variant="outline">Open Page</Button>
                </a>
              </div>
              {loading && <div className="text-sm text-muted-foreground">Loading…</div>}
              {error && <div className="text-sm text-red-500">{error}</div>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Section Library</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {SECTION_LIBRARY.map((tpl, i) => (
                <div key={i} className="flex items-center justify-between border rounded-md p-3">
                  <div className="text-sm font-medium">{tpl.type}</div>
                  <Button size="sm" onClick={() => addSection(tpl)}>Add</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sections (Drag to Reorder)</CardTitle>
            </CardHeader>
            <CardContent>
              <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                <SortableContext items={sections.map(s => s.key)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-3">
                    {sections.map((s) => (
                      <div key={s.key} id={s.key} className="border rounded-md p-3 bg-background">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">{s.type}</div>
                          <Button size="sm" variant="destructive" onClick={() => removeSection(s.key)}>Remove</Button>
                        </div>
                      </div>
                    ))}
                    {sections.length === 0 && (
                      <div className="text-muted-foreground text-sm">No sections yet. Add from library.</div>
                    )}
                  </div>
                </SortableContext>
              </DndContext>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <PageBuilderRenderer sections={previewSections as any} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

