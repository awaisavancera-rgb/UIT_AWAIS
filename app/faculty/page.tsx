import PageBanner from '@/components/ui/page-banner'
import FacultyFromCMS from '@/components/cms/FacultyFromCMS'

export default function FacultyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Banner */}
      <PageBanner
        title="Our Faculty"
        subtitle="Meet our distinguished faculty members who are industry experts and academic leaders committed to excellence in education"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Faculty' }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      />

      {/* Faculty Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Distinguished Faculty Members
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our faculty brings together decades of industry experience, cutting-edge research, 
              and a passion for teaching to provide you with world-class education.
            </p>
          </div>

          <FacultyFromCMS />
        </div>
      </section>

      {/* Faculty Stats */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">150+</div>
              <div className="text-muted-foreground">Faculty Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Hold PhD Degrees</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">20+</div>
              <div className="text-muted-foreground">Years Avg Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Research Publications</div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Faculty CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-primary/5 rounded-2xl p-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Join Our Faculty Team
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Are you passionate about education and research? We're always looking for 
              exceptional educators to join our growing faculty community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                View Open Positions
              </button>
              <button className="border border-primary text-primary px-8 py-3 rounded-lg font-medium hover:bg-primary/5 transition-colors">
                Faculty Resources
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}