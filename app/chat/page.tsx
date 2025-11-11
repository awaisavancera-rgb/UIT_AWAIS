import PageBanner from '@/components/ui/page-banner'

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Banner */}
      <PageBanner
        title="UIT University Assistant"
        subtitle="Get instant answers about programs, fees, scholarships, and admissions"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Chat Assistant' }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      />

      {/* Chat Instructions */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Chat with Our AI Assistant
            </h2>
            <p className="text-lg text-muted-foreground">
              Our intelligent chatbot is available 24/7 to help you with questions about UIT University.
              Click the chat button in the bottom-right corner to get started!
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Academic Programs</h3>
              <p className="text-muted-foreground text-sm">
                Ask about our undergraduate and graduate programs, course details, and admission requirements.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Fees & Scholarships</h3>
              <p className="text-muted-foreground text-sm">
                Get information about tuition fees, payment plans, and available scholarship opportunities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Admissions</h3>
              <p className="text-muted-foreground text-sm">
                Learn about application deadlines, required documents, and the admission process.
              </p>
            </div>
          </div>

          {/* Sample Questions */}
          <div className="bg-primary/5 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-6 text-center">Sample Questions You Can Ask</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg border border-primary/20">
                  <p className="text-sm">"What is the fee for BSCS?"</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-primary/20">
                  <p className="text-sm">"Tell me about engineering programs"</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-primary/20">
                  <p className="text-sm">"What scholarships are available?"</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg border border-primary/20">
                  <p className="text-sm">"How do I apply for admission?"</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-primary/20">
                  <p className="text-sm">"What are the admission requirements?"</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-primary/20">
                  <p className="text-sm">"Tell me about campus facilities"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              For official inquiries and detailed information, contact us at{' '}
              <a href="mailto:info@uitu.edu.pk" className="text-primary hover:underline">
                info@uitu.edu.pk
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}