
import PageBanner from '@/components/ui/page-banner'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge'
import {
    Users,
    Award,
    BookOpen,
    Target,
    Lightbulb,
    TrendingUp,
    Globe,
    CheckCircle,
    ArrowRight,
    Phone,
    Mail,
    MapPin
} from 'lucide-react'

export default function MERLPage() {
    return (
        <div className="min-h-screen bg-background">

            {/* Page Banner */}
            <PageBanner
                title="Micro Electronics Research Lab (MERL)"
                subtitle=""
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "MERL" }
                ]}
                backgroundImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            />

            {/* About MERL Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-foreground mb-6">Come Join Our Chip X Ai Course Followed By Training At Our Merl Lab.</h2>
                            <p className="space-y-6 text-lg text-muted-foreground">
                                MERL-UITU is the member of international foundations like RISC-V Foundation, OSFPGA Foundation, Chips Alliances, Linux Foundation, Google Summer of Code and Edge Impulse training program.

                                We have a working relationship with PLCT lab in China, UCROSS – USA,  TSMC ( as collaboration for PDK access), ARM Developer program, FOSSI Foundation, Cadence (EDA tool provider), Efabless and Skywater technologies.
                            </p>
                            <div className="flex items-center gap-4 mt-8">
                                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                                    Register Now for MERL Chip Design <ArrowUpRight className="w-4 h-4 ml-2" />
                                </Button>
                                <div className="text-center">
                                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                                        Visit MERL <ArrowUpRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            {/* Placeholder for MERL about image */}
                            <div className="bg-gradient-to-br from-muted to-muted/50 rounded-2xl h-96 flex items-center justify-center">
                                <div className="text-center text-muted-foreground">
                                    <BookOpen className="w-24 h-24 mx-auto mb-4" />
                                    <p className="text-lg">MERL Research Facility</p>
                                    <p className="text-sm">Image Placeholder</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 text-gray-800 py-20 px-6 md:px-16 lg:px-32 font-inter">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="mb-11">
                        <h2 className="heading-large font-semibold text-gray-900">
                            Introduction
                        </h2>
                        <div className="mt-4">
                            <h3 className="text-4xl font-semibold">Welcome!</h3>
                            <p className="text-lg leading-relaxed text-gray-700">
                                MERL-UITU stands at the forefront of chip design education, fostering a dynamic environment where innovation converges with academic excellence. Recognizing the transformative power of chip technology, we have partnered with UIT to empower the next generation of engineers.
                            </p>
                            <p className="text-lg leading-relaxed text-gray-700">
                                Following the ssssgroundbreaking memorandum of understanding signed in December 2018, MERL-UITU has become a pioneer in open-source chip design education across Pakistan. This initiative extends to undergraduate students, providing them with a pathway to success in this ever-evolving field.
                            </p>
                            <p className="text-lg leading-relaxed text-gray-700">
                                Our globally recognized curriculum, meticulously crafted by renowned academic leaders, leverages best-in-class resources. This ensures students acquire the most cutting-edge chip design techniques, equipping them with the skills to become future leaders in the industry.
                            </p>
                            <p className="text-lg leading-relaxed text-gray-700">
                                More than just education, MERL-UITU offers an enriching journey of discovery and innovation. Here, you’ll unlock the limitless possibilities of chip design and become a key player in shaping the future of technology.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white shadow-lg rounded-2xl p-10 border-t-4 border-blue-600 mb-6 flex flex-col gap-[20px] md:flex-row md:gap-[45px]">
                        <div className="flex flex-col justify-center w-full">
                        <h2 className="text-4xl font-outfit font-semibold text-gray-900 mb-4">
                            Background
                        </h2>
                        <p className="text-lg leading-relaxed text-gray-700">
                            There is an ongoing revolution in designing Computer Chips utilizing open source RISC-V ISA and EDA tools, which continues to gain momentum. UIT MERL recognized this early on and encashed on this initiative by signing an MOU in December 2018 with Adinwest, Arizona, to teach open source Chip Designing to students in Pakistan including undergraduates. There is a huge market for this, which is expected to grow to $ one trillion by 2030.
                        </p>
                        </div>

                        <div className="w-full">
                         <img  className="object-cover w-full h-[220px] md:h-[300px] rounded-2xl" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="" />
                        </div>
                    </div>

                    <div className="bg-white shadow-lg rounded-2xl p-10 border-t-4 border-blue-600 mb-4">
                        <h2 className="text-4xl font-outfit font-semibold text-gray-900 mb-4">
                            Background
                        </h2>
                        <p className="text-lg leading-relaxed text-gray-700">
                            There is an ongoing revolution in designing Computer Chips utilizing open source RISC-V ISA and EDA tools, which continues to gain momentum. UIT MERL recognized this early on and encashed on this initiative by signing an MOU in December 2018 with Adinwest, Arizona, to teach open source Chip Designing to students in Pakistan including undergraduates. There is a huge market for this, which is expected to grow to $ one trillion by 2030.
                        </p>
                    </div>
                    <div className="bg-white shadow-lg rounded-2xl p-10 border-t-4 border-blue-600 mb-4">
                        <h2 className="text-4xl font-outfit font-semibold text-gray-900 mb-4">
                            Background
                        </h2>
                        <p className="text-lg leading-relaxed text-gray-700">
                            There is an ongoing revolution in designing Computer Chips utilizing open source RISC-V ISA and EDA tools, which continues to gain momentum. UIT MERL recognized this early on and encashed on this initiative by signing an MOU in December 2018 with Adinwest, Arizona, to teach open source Chip Designing to students in Pakistan including undergraduates. There is a huge market for this, which is expected to grow to $ one trillion by 2030.
                        </p>
                    </div>

                    <div className="bg-white shadow-lg rounded-2xl p-10 border-t-4 border-blue-600 mb-4">
                        <h2 className="text-4xl font-outfit font-semibold text-gray-900 mb-4">
                            Background
                        </h2>
                        <p className="text-lg leading-relaxed text-gray-700">
                            There is an ongoing revolution in designing Computer Chips utilizing open source RISC-V ISA and EDA tools, which continues to gain momentum. UIT MERL recognized this early on and encashed on this initiative by signing an MOU in December 2018 with Adinwest, Arizona, to teach open source Chip Designing to students in Pakistan including undergraduates. There is a huge market for this, which is expected to grow to $ one trillion by 2030.
                        </p>
                    </div>

                </div>
            </section>

            {/* Research Areas */}
            <section className="py-20 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-foreground mb-4">Research Areas</h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Our research spans multiple disciplines, addressing contemporary challenges in management and economics.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-8">
                                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                    <TrendingUp className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-4">Business Analytics</h3>
                                <p className="text-muted-foreground mb-4">
                                    Advanced data analytics and business intelligence solutions for strategic decision-making
                                    and performance optimization.
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        Predictive Analytics
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        Market Research
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        Performance Metrics
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-8">
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                    <Globe className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-4">Economic Development</h3>
                                <p className="text-muted-foreground mb-4">
                                    Research on sustainable economic growth, policy analysis, and development strategies
                                    for emerging markets.
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        Policy Analysis
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        Market Dynamics
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        Growth Strategies
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-8">
                                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                    <Users className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-4">Organizational Behavior</h3>
                                <p className="text-muted-foreground mb-4">
                                    Studies on leadership, team dynamics, organizational culture, and human resource
                                    management practices.
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        Leadership Studies
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        Team Dynamics
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        HR Management
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-8">
                                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                    <Target className="w-8 h-8 text-orange-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-4">Strategic Management</h3>
                                <p className="text-muted-foreground mb-4">
                                    Research on strategic planning, competitive analysis, and business model innovation
                                    for sustainable growth.
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        Strategic Planning
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        Competitive Analysis
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        Innovation Management
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-8">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                    <Award className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-4">Financial Economics</h3>
                                <p className="text-muted-foreground mb-4">
                                    Advanced research in financial markets, investment strategies, and economic modeling
                                    for financial institutions.
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        Market Analysis
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        Risk Management
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        Investment Strategies
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-8">
                                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                    <Lightbulb className="w-8 h-8 text-red-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-4">Innovation & Entrepreneurship</h3>
                                <p className="text-muted-foreground mb-4">
                                    Studies on innovation processes, startup ecosystems, and entrepreneurial behavior
                                    in emerging markets.
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        Startup Ecosystems
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        Innovation Processes
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        Business Incubation
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>


            {/* Research Team */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-foreground mb-4">Our Research Team</h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Meet our distinguished researchers and faculty members driving innovation in management and economics.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Dr. Ahmed Hassan",
                                position: "Director, MERL",
                                specialization: "Strategic Management & Business Analytics",
                                education: "Ph.D. in Management Sciences"
                            },
                            {
                                name: "Dr. Sarah Khan",
                                position: "Senior Research Fellow",
                                specialization: "Economic Development & Policy Analysis",
                                education: "Ph.D. in Economics"
                            },
                            {
                                name: "Dr. Muhammad Ali",
                                position: "Research Associate",
                                specialization: "Organizational Behavior & HR Management",
                                education: "Ph.D. in Organizational Psychology"
                            },
                            {
                                name: "Dr. Fatima Sheikh",
                                position: "Research Fellow",
                                specialization: "Financial Economics & Investment Analysis",
                                education: "Ph.D. in Finance"
                            },
                            {
                                name: "Dr. Usman Malik",
                                position: "Research Associate",
                                specialization: "Innovation & Entrepreneurship",
                                education: "Ph.D. in Business Administration"
                            },
                            {
                                name: "Dr. Ayesha Rehman",
                                position: "Research Fellow",
                                specialization: "Business Analytics & Data Science",
                                education: "Ph.D. in Information Systems"
                            }
                        ].map((member, index) => (
                            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                <CardContent className="p-8">
                                    {/* Placeholder for team member photo */}
                                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Users className="w-16 h-16 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                                    <p className="text-primary font-medium mb-2">{member.position}</p>
                                    <p className="text-sm text-muted-foreground mb-3">{member.specialization}</p>
                                    <Badge variant="secondary" className="text-xs">{member.education}</Badge>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Current Projects */}
            <section className="py-20 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-foreground mb-4">Current Research Projects</h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Explore our ongoing research initiatives that are shaping the future of management and economics.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {[
                            {
                                title: "Digital Transformation in SMEs",
                                status: "Ongoing",
                                duration: "2024-2026",
                                funding: "HEC Research Grant",
                                description: "Investigating the impact of digital transformation on small and medium enterprises in Pakistan, focusing on adoption barriers and success factors."
                            },
                            {
                                title: "Sustainable Business Models",
                                status: "Ongoing",
                                duration: "2023-2025",
                                funding: "Industry Partnership",
                                description: "Developing frameworks for sustainable business models that balance profitability with environmental and social responsibility."
                            },
                            {
                                title: "Economic Impact of Fintech",
                                status: "Ongoing",
                                duration: "2024-2025",
                                funding: "Government Grant",
                                description: "Analyzing the economic impact of financial technology adoption on traditional banking and financial inclusion in emerging markets."
                            },
                            {
                                title: "Leadership in Crisis Management",
                                status: "Completed",
                                duration: "2022-2024",
                                funding: "University Research Fund",
                                description: "Examining leadership strategies and organizational resilience during crisis situations, with insights from the COVID-19 pandemic."
                            }
                        ].map((project, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <Badge variant={project.status === 'Ongoing' ? 'default' : 'secondary'}>
                                            {project.status}
                                        </Badge>
                                        <span className="text-sm text-muted-foreground">{project.duration}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground mb-3">{project.title}</h3>
                                    <p className="text-muted-foreground mb-4">{project.description}</p>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-primary font-medium">Funding: {project.funding}</span>
                                        <Button variant="link" className="p-0 h-auto">
                                            Learn More <ArrowRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Publications & Impact */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-foreground mb-6">Publications & Impact</h2>
                            <div className="space-y-6 text-lg text-muted-foreground">
                                <p>
                                    MERL researchers have published extensively in top-tier international journals,
                                    contributing to the global body of knowledge in management and economics.
                                </p>
                                <p>
                                    Our research has been cited over 500 times and has influenced policy decisions
                                    at both national and international levels.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mt-8">
                                <div className="text-center p-6 bg-primary/5 rounded-lg">
                                    <div className="text-3xl font-bold text-primary mb-2">25+</div>
                                    <div className="text-sm text-muted-foreground">Journal Publications</div>
                                </div>
                                <div className="text-center p-6 bg-green-50 rounded-lg">
                                    <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                                    <div className="text-sm text-muted-foreground">Citations</div>
                                </div>
                                <div className="text-center p-6 bg-blue-50 rounded-lg">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                                    <div className="text-sm text-muted-foreground">Conference Papers</div>
                                </div>
                                <div className="text-center p-6 bg-purple-50 rounded-lg">
                                    <div className="text-3xl font-bold text-purple-600 mb-2">10+</div>
                                    <div className="text-sm text-muted-foreground">Policy Reports</div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-foreground">Recent Publications</h3>
                            {[
                                {
                                    title: "Digital Transformation and SME Performance: Evidence from Pakistan",
                                    journal: "Journal of Business Research",
                                    year: "2024",
                                    authors: "Hassan, A., Khan, S."
                                },
                                {
                                    title: "Sustainable Business Models in Emerging Markets",
                                    journal: "Strategic Management Journal",
                                    year: "2024",
                                    authors: "Sheikh, F., Ali, M."
                                },
                                {
                                    title: "Fintech Adoption and Financial Inclusion",
                                    journal: "Economic Development Quarterly",
                                    year: "2023",
                                    authors: "Malik, U., Rehman, A."
                                }
                            ].map((publication, index) => (
                                <Card key={index} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-6">
                                        <h4 className="font-semibold text-foreground mb-2">{publication.title}</h4>
                                        <p className="text-sm text-muted-foreground mb-1">
                                            <span className="font-medium">{publication.journal}</span> ({publication.year})
                                        </p>
                                        <p className="text-sm text-muted-foreground">Authors: {publication.authors}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact & Collaboration */}
            <section className="py-20 bg-primary text-primary-foreground">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Collaborate with MERL</h2>
                            <p className="text-xl mb-8 opacity-90">
                                Join us in advancing research excellence. We welcome collaborations with industry partners,
                                academic institutions, and research organizations.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-lg">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Research Partnerships</h3>
                                        <p className="opacity-90">
                                            Collaborate on joint research projects and share expertise across disciplines.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-lg">
                                        <BookOpen className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Student Research</h3>
                                        <p className="opacity-90">
                                            Opportunities for graduate students to participate in cutting-edge research projects.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-lg">
                                        <Target className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Consulting Services</h3>
                                        <p className="opacity-90">
                                            Expert consulting services for organizations seeking research-based solutions.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <MapPin className="w-5 h-5" />
                                    <div>
                                        <p className="font-medium">Address</p>
                                        <p className="opacity-90">MERL, UIT University, Karachi, Pakistan</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Phone className="w-5 h-5" />
                                    <div>
                                        <p className="font-medium">Phone</p>
                                        <p className="opacity-90">+92-21-111-978-275</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Mail className="w-5 h-5" />
                                    <div>
                                        <p className="font-medium">Email</p>
                                        <p className="opacity-90">merl@uitu.edu.pk</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <Button className="w-full bg-white text-primary hover:bg-white/90">
                                    Get in Touch
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}