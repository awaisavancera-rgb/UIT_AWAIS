import PageBuilderRenderer from '@/components/cms/PageBuilderRenderer'
import { dbFunctions } from '@/lib/supabase'

async function fetchSections(slug: string) {
  try {
    const data = await dbFunctions.getPageBySlug(slug)
    if (!data) return null
    // Adapt to renderer format
    const sections = data.sections.map(s => ({
      _key: s.id,
      type: s.type,
      props: s.props || {},
    }))
    return { title: data.page.title, sections }
  } catch {
    return null
  }
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await fetchSections(slug)

  if (!page) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-semibold mb-2">Page not found</h1>
        <p className="text-muted-foreground">No page exists for slug "{slug}".</p>
      </div>
    )
  }

  return (
    <div className="py-8">
      {page?.title && (
        <div className="max-w-5xl mx-auto px-4 mb-8">
          <h1 className="text-3xl font-bold">{page.title}</h1>
        </div>
      )}
      <PageBuilderRenderer sections={page.sections || []} />
    </div>
  )
}

