import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About UIT University</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              Empowering minds, shaping futures, and building tomorrow's leaders through excellence in education, research, and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-8">Who We Are</h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  The UIT University (UITU) stands as a beacon of educational excellence, established under The UIT University Act, 2017
                  [Sindh Act No. XXXIV of 2018] by the Government of Sindh. Our charter was officially published in The Sindh Government
                  Gazette on May 28, 2018, marking the beginning of our journey as an independent institution of higher learning.
                </p>
                <p>
                  Following comprehensive charter inspections by the Higher Education Commission (HEC), UITU received its No Objection
                  Certificate (NOC), initially authorizing us to offer undergraduate programs across four distinguished departments:
                  Electrical Engineering, Management Sciences, Computer Science, and Social Sciences.
                </p>
                <p>
                  Our institution is proudly managed by the Usman Memorial Foundation (UMF), a philanthropic organization established
                  in 1973 in memory of Late Mohammad Usman. The foundation's unwavering commitment to providing quality education
                  to the community drives our mission to create accessible, world-class educational opportunities.
                </p>
                <div className="flex flex-wrap gap-3 mt-8">
                  <Badge variant="secondary" className="px-4 py-2">HEC Recognized</Badge>
                  <Badge variant="secondary" className="px-4 py-2">Government Chartered</Badge>
                  <Badge variant="secondary" className="px-4 py-2">Since 1994</Badge>
                </div>
              </div>
            </div>
            <div className="relative">
              {/* Image placeholder - Use campus main building photo */}
              <div className="bg-gradient-to-br from-primary to-primary/70 rounded-2xl h-96 flex items-center justify-center shadow-2xl">
                <div className="text-primary-foreground text-center">
                  <div className="text-7xl font-bold mb-4">UITU</div>
                  <div className="text-xl font-medium">Excellence in Education</div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-6 shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Years of Legacy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governance & Leadership */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Governance & Leadership</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our university is guided by distinguished boards and councils that ensure academic excellence and strategic direction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Board of Governors</h3>
                <p className="text-muted-foreground text-sm">
                  Strategic oversight and policy formulation for institutional governance and long-term planning.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Board of Advisors</h3>
                <p className="text-muted-foreground text-sm">
                  Expert guidance from industry leaders and academic luminaries for strategic direction.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Academic Council</h3>
                <p className="text-muted-foreground text-sm">
                  Academic policy formulation, curriculum development, and quality assurance oversight.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Board of Faculties</h3>
                <p className="text-muted-foreground text-sm">
                  Faculty representation ensuring academic freedom and educational excellence standards.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Five decades of educational excellence, innovation, and commitment to transforming lives through learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-blue-600">1973</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Foundation Legacy</h3>
                <p className="text-muted-foreground">
                  Usman Memorial Foundation established in memory of Late Mohammad Usman, marking the beginning of our educational mission.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">1994</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Institute Birth</h3>
                <p className="text-muted-foreground">
                  Usman Institute of Technology (UIT) established, beginning our journey in technical education and innovation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-purple-600">2015</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Academic Growth</h3>
                <p className="text-muted-foreground">
                  Affiliation with NED University of Engineering and Technology, expanding our academic horizons and partnerships.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-orange-600">2018</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">University Status</h3>
                <p className="text-muted-foreground">
                  Chartered as independent UIT University under Sindh Act, achieving full autonomy and HEC recognition.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Vision & Mission</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our guiding principles that shape every aspect of our educational journey and institutional growth.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-10">
                <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-6">Our Vision</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To emerge as a globally recognized center of excellence in higher education, fostering innovation,
                  creativity, and critical thinking. We aspire to nurture future leaders who will drive technological
                  advancement, social progress, and economic development while maintaining the highest standards of
                  ethical conduct and social responsibility.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-10">
                <div className="bg-green-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-6">Our Mission</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To provide transformative education that meets international standards, promote cutting-edge research
                  and innovation, and contribute meaningfully to Pakistan's socio-economic development. We are committed
                  to producing skilled professionals, ethical leaders, and responsible global citizens who can address
                  contemporary challenges with confidence and competence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vice Chancellor's Message */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1">
              {/* Image placeholder - Use Vice Chancellor's professional photo */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-80 flex items-center justify-center mb-6">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">👤</div>
                  <div className="text-sm">Vice Chancellor Photo</div>
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold text-foreground">Prof. Dr. [Name]</h4>
                <p className="text-muted-foreground">Vice Chancellor</p>
                <p className="text-sm text-muted-foreground mt-2">Ph.D., [University Name]</p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-4xl font-bold text-foreground mb-8">Vice Chancellor's Message</h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p className="text-2xl text-primary font-medium italic">
                  "Education is the most powerful weapon which you can use to change the world."
                </p>
                <p>
                  Welcome to UIT University, where we believe in transforming lives through quality education and innovative research.
                  As we continue our journey of academic excellence, I am proud to lead an institution that has consistently
                  demonstrated its commitment to nurturing young minds and preparing them for the challenges of tomorrow.
                </p>
                <p>
                  Our university stands as a testament to the vision of the Usman Memorial Foundation, which has been dedicated
                  to educational excellence for over five decades. We have evolved from a small institute to a comprehensive
                  university, always maintaining our core values of integrity, innovation, and inclusivity.
                </p>
                <p>
                  At UITU, we don't just impart knowledge; we cultivate critical thinking, foster creativity, and encourage
                  our students to become lifelong learners. Our distinguished faculty, state-of-the-art facilities, and
                  industry partnerships ensure that our graduates are well-prepared to excel in their chosen fields and
                  contribute meaningfully to society.
                </p>
                <p>
                  I invite you to join our vibrant academic community and be part of our continuing story of success and growth.
                </p>
                <div className="pt-4">
                  <p className="font-semibold text-foreground">Prof. Dr. [Vice Chancellor Name]</p>
                  <p className="text-muted-foreground">Vice Chancellor, UIT University</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditations & Recognition */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Accreditations & Recognition</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our commitment to quality education is validated by prestigious accreditations and recognitions from national and international bodies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">HEC Recognition</h3>
                <p className="text-muted-foreground">
                  Fully recognized by Higher Education Commission of Pakistan with degree awarding powers and quality assurance.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">PCP Certification</h3>
                <p className="text-muted-foreground">
                  Pakistan Computer Professionals certification ensuring our IT programs meet industry standards and requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Government Charter</h3>
                <p className="text-muted-foreground">
                  Chartered under Sindh Act No. XXXIV of 2018, providing legal authority and governmental recognition.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Management & Organization */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Management & Organization</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our organizational structure ensures effective governance, academic excellence, and operational efficiency at all levels.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Organizational Excellence</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Executive Leadership</h4>
                    <p className="text-muted-foreground">Strategic decision-making and institutional direction under experienced leadership.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Academic Administration</h4>
                    <p className="text-muted-foreground">Dedicated academic leadership ensuring quality education and research excellence.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Support Services</h4>
                    <p className="text-muted-foreground">Comprehensive student services, IT support, and administrative excellence.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {/* Image placeholder - Use organizational chart or management team photo */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center">
                <div className="space-y-4">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-foreground">Organizational Structure</h4>
                  <p className="text-muted-foreground">Clear hierarchy and defined roles ensuring efficient operations and accountability.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities & Campus Life */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Facilities & Campus Life</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              State-of-the-art facilities and vibrant campus life create an environment conducive to learning, growth, and personal development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Modern Classrooms</h3>
                <p className="text-muted-foreground">
                  Smart classrooms equipped with multimedia technology, interactive whiteboards, and comfortable seating arrangements.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Advanced Laboratories</h3>
                <p className="text-muted-foreground">
                  Cutting-edge labs for engineering, computer science, and research with latest equipment and software.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Digital Library</h3>
                <p className="text-muted-foreground">
                  Comprehensive digital and physical library resources with extensive databases and research materials.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Strategic Location</h3>
                <p className="text-muted-foreground">
                  Centrally located in Karachi with excellent connectivity and accessibility from all parts of the city.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Student Support</h3>
                <p className="text-muted-foreground">
                  Comprehensive student services including counseling, career guidance, and financial aid programs.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Innovation Hub</h3>
                <p className="text-muted-foreground">
                  Dedicated spaces for research, innovation, and entrepreneurship fostering creativity and collaboration.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Legacy of Excellence</h2>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
            Become part of the UIT University family and embark on a transformative educational journey that will shape your future and contribute to society's progress.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link
              href="/courses"
              className="bg-white text-primary hover:bg-gray-100 px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore Programs
            </Link>
            <Link
              href="/apply"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Contact Us
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-lg opacity-90">Years of Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">5000+</div>
              <div className="text-lg opacity-90">Graduates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">100+</div>
              <div className="text-lg opacity-90">Expert Faculty</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
