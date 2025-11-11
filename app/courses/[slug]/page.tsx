'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCourseDetails } from '@/hooks/useCMS'
import type { CourseDetails } from '@/types/cms'
import {
    Clock,
    Users,
    BookOpen,
    Award,
    Calendar,
    MapPin,
    Star,
    CheckCircle,
    Play,
    Download,
    Share2,
    Heart,
    ArrowLeft,
    User,
    GraduationCap,
    Target,
    TrendingUp
} from 'lucide-react'

// Mock data - replace with CMS fetch
const mockCourseData: CourseDetails = {
    _id: '1',
    title: 'Complete Web Development Bootcamp',
    slug: { current: 'complete-web-development-bootcamp' },
    description: 'Master modern web development with HTML, CSS, JavaScript, React, Node.js and more',
    longDescription: 'This comprehensive web development course will take you from beginner to advanced level. You\'ll learn the latest technologies and best practices used by top companies worldwide.',
    image: { asset: { url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80' } },
    instructor: {
        name: 'Dr. Sarah Johnson',
        title: 'Senior Software Engineer & Educator',
        image: { asset: { url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' } },
        bio: 'Dr. Sarah Johnson is a seasoned software engineer with over 10 years of experience in web development and education.',
        experience: '10+ years'
    },
    duration: '12 weeks',
    level: 'Beginner',
    price: '$299',
    originalPrice: '$499',
    category: 'Web Development',
    rating: 4.8,
    studentsEnrolled: 2547,
    totalLessons: 156,
    totalHours: '40 hours',
    language: 'English',
    certificate: true,
    prerequisites: ['Basic computer skills', 'No programming experience required'],
    learningOutcomes: [
        'Build responsive websites using HTML, CSS, and JavaScript',
        'Create dynamic web applications with React',
        'Develop backend APIs with Node.js and Express',
        'Work with databases (MongoDB, SQL)',
        'Deploy applications to production',
        'Understand modern development workflows'
    ],
    curriculum: [
        {
            module: 'HTML & CSS Fundamentals',
            lessons: [
                { title: 'Introduction to HTML', duration: '15 min', type: 'video', preview: true },
                { title: 'CSS Styling Basics', duration: '20 min', type: 'video' },
                { title: 'Responsive Design', duration: '25 min', type: 'video' },
                { title: 'Practice Exercise', duration: '30 min', type: 'quiz' }
            ]
        },
        {
            module: 'JavaScript Programming',
            lessons: [
                { title: 'JavaScript Fundamentals', duration: '30 min', type: 'video' },
                { title: 'DOM Manipulation', duration: '25 min', type: 'video' },
                { title: 'Event Handling', duration: '20 min', type: 'video' },
                { title: 'JavaScript Project', duration: '45 min', type: 'text' }
            ]
        },
        {
            module: 'React Development',
            lessons: [
                { title: 'Introduction to React', duration: '35 min', type: 'video' },
                { title: 'Components and Props', duration: '30 min', type: 'video' },
                { title: 'State Management', duration: '40 min', type: 'video' },
                { title: 'React Hooks', duration: '35 min', type: 'video' }
            ]
        }
    ],
    features: [
        'Lifetime access to course materials',
        'Certificate of completion',
        'Direct instructor support',
        'Real-world projects',
        'Job placement assistance',
        'Mobile and desktop access'
    ],
    requirements: [
        'Computer with internet connection',
        'No prior programming experience needed',
        'Willingness to learn and practice'
    ],
    tags: ['Web Development', 'JavaScript', 'React', 'Node.js', 'HTML', 'CSS'],
    startDate: '2024-02-01',
    endDate: '2024-04-26',
    schedule: 'Mon, Wed, Fri - 7:00 PM to 9:00 PM',
    location: 'Online & Campus',
    _createdAt: '2024-01-15'
}

export default function CourseDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = use(params)
    return <CourseDetailsContent slug={resolvedParams.slug} />
}

function CourseDetailsContent({ slug }: { slug: string }) {
    const { course, loading, error } = useCourseDetails(slug)
    const [activeTab, setActiveTab] = useState('overview')
    const [isWishlisted, setIsWishlisted] = useState(false)

    // Fallback to mock data if CMS is not configured
    const courseData = course || mockCourseData

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Loading course details...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error && !courseData) {
        return (
            <div className="min-h-screen bg-background">
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <p className="text-red-500 mb-4">Error loading course details</p>
                        <p className="text-muted-foreground">Please try again later</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">

            {/* Breadcrumb */}
            <div className="bg-muted/30 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-2 text-sm">
                        <Link href="/" className="text-muted-foreground hover:text-primary">Home</Link>
                        <span className="text-muted-foreground">/</span>
                        <Link href="/courses" className="text-muted-foreground hover:text-primary">Courses</Link>
                        <span className="text-muted-foreground">/</span>
                        <span className="text-foreground">{courseData.title}</span>
                    </div>
                </div>
            </div>

            {/* Course Header */}
            <section className="py-12 bg-gradient-to-r from-primary/5 to-primary/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Course Info */}
                        <div className="lg:col-span-2">
                            <div className="mb-6">
                                <Link href="/courses" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Courses
                                </Link>
                                <div className="flex items-center gap-3 mb-4">
                                    <Badge variant="secondary">{courseData.category}</Badge>
                                    <Badge variant="outline">{courseData.level}</Badge>
                                </div>
                                <h1 className="text-4xl font-bold text-foreground mb-4">{courseData.title}</h1>
                                <p className="text-xl text-muted-foreground mb-6">{courseData.description}</p>

                                {/* Course Stats */}
                                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="font-medium">{courseData.rating}</span>
                                        <span>({courseData.studentsEnrolled} students)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{courseData.totalHours}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="w-4 h-4" />
                                        <span>{courseData.totalLessons} lessons</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        <span>{courseData.studentsEnrolled} enrolled</span>
                                    </div>
                                </div>
                            </div>

                            {/* Instructor Info */}
                            <Card className="mb-8">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={courseData.instructor.image.asset.url}
                                            alt={courseData.instructor.name}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-foreground">{courseData.instructor.name}</h3>
                                            <p className="text-muted-foreground">{courseData.instructor.title}</p>
                                            <p className="text-sm text-muted-foreground">{courseData.instructor.experience} experience</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Course Card */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-24">
                                <div className="relative">
                                    <img
                                        src={courseData.image.asset.url}
                                        alt={courseData.title}
                                        className="w-full h-48 object-cover rounded-t-lg"
                                    />
                                    <div className="absolute inset-0 bg-black/40 rounded-t-lg flex items-center justify-center">
                                        <Button size="lg" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30">
                                            <Play className="w-5 h-5 mr-2" />
                                            Preview Course
                                        </Button>
                                    </div>
                                </div>

                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <span className="text-3xl font-bold text-primary">{courseData.price}</span>
                                            {courseData.originalPrice && (
                                                <span className="text-lg text-muted-foreground line-through ml-2">{courseData.originalPrice}</span>
                                            )}
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setIsWishlisted(!isWishlisted)}
                                            className="text-muted-foreground hover:text-red-500"
                                        >
                                            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                                        </Button>
                                    </div>

                                    <div className="space-y-4 mb-6">
                                        <Button className="w-full" size="lg">
                                            Enroll Now
                                        </Button>
                                        <Button variant="outline" className="w-full">
                                            <Share2 className="w-4 h-4 mr-2" />
                                            Share Course
                                        </Button>
                                    </div>

                                    {/* Course Details */}
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Duration:</span>
                                            <span className="font-medium">{courseData.duration}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Level:</span>
                                            <span className="font-medium">{courseData.level}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Language:</span>
                                            <span className="font-medium">{courseData.language}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Certificate:</span>
                                            <span className="font-medium">{courseData.certificate ? 'Yes' : 'No'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Schedule:</span>
                                            <span className="font-medium text-right">{courseData.schedule}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Location:</span>
                                            <span className="font-medium">{courseData.location}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Content Tabs */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            {/* Tab Navigation */}
                            <div className="flex border-b border-border mb-8">
                                {[
                                    { id: 'overview', label: 'Overview' },
                                    { id: 'curriculum', label: 'Curriculum' },
                                    { id: 'instructor', label: 'Instructor' },
                                    { id: 'reviews', label: 'Reviews' }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-6 py-3 font-medium transition-colors ${activeTab === tab.id
                                            ? 'text-primary border-b-2 border-primary'
                                            : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            {activeTab === 'overview' && (
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-4">Course Description</h3>
                                        <p className="text-muted-foreground leading-relaxed">{courseData.longDescription}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {courseData.learningOutcomes.map((outcome, index) => (
                                                <div key={index} className="flex items-start gap-3">
                                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-muted-foreground">{outcome}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold mb-4">Requirements</h3>
                                        <ul className="space-y-2">
                                            {courseData.requirements.map((req, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                                    <span className="text-muted-foreground">{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'curriculum' && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold">Course Curriculum</h3>
                                    {courseData.curriculum.map((module, moduleIndex) => (
                                        <Card key={moduleIndex}>
                                            <CardContent className="p-6">
                                                <h4 className="text-lg font-semibold mb-4">{module.module}</h4>
                                                <div className="space-y-3">
                                                    {module.lessons.map((lesson, lessonIndex) => (
                                                        <div key={lessonIndex} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                                            <div className="flex items-center gap-3">
                                                                {lesson.type === 'video' && <Play className="w-4 h-4 text-primary" />}
                                                                {lesson.type === 'text' && <BookOpen className="w-4 h-4 text-primary" />}
                                                                {lesson.type === 'quiz' && <Target className="w-4 h-4 text-primary" />}
                                                                <span className="font-medium">{lesson.title}</span>
                                                                {lesson.preview && <Badge variant="secondary" className="text-xs">Preview</Badge>}
                                                            </div>
                                                            <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'instructor' && (
                                <div className="space-y-6">
                                    <Card>
                                        <CardContent className="p-8">
                                            <div className="flex items-start gap-6">
                                                <img
                                                    src={courseData.instructor.image.asset.url}
                                                    alt={courseData.instructor.name}
                                                    className="w-24 h-24 rounded-full object-cover"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="text-2xl font-bold mb-2">{courseData.instructor.name}</h3>
                                                    <p className="text-lg text-primary mb-4">{courseData.instructor.title}</p>
                                                    <p className="text-muted-foreground leading-relaxed">{courseData.instructor.bio}</p>

                                                    <div className="flex items-center gap-6 mt-6 text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <Award className="w-4 h-4 text-primary" />
                                                            <span>{courseData.instructor.experience} Experience</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Users className="w-4 h-4 text-primary" />
                                                            <span>2,547 Students</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                            <span>4.9 Rating</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-2xl font-bold">Student Reviews</h3>
                                        <div className="flex items-center gap-2">
                                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                            <span className="text-lg font-semibold">{courseData.rating}</span>
                                            <span className="text-muted-foreground">({courseData.studentsEnrolled} reviews)</span>
                                        </div>
                                    </div>

                                    {/* Sample Reviews */}
                                    {[1, 2, 3].map((review) => (
                                        <Card key={review}>
                                            <CardContent className="p-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                                        <User className="w-6 h-6 text-primary" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <h4 className="font-semibold">Student Name</h4>
                                                            <div className="flex items-center">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                                                ))}
                                                            </div>
                                                            <span className="text-sm text-muted-foreground">2 days ago</span>
                                                        </div>
                                                        <p className="text-muted-foreground">
                                                            Excellent course! The instructor explains everything clearly and the projects are very practical.
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="space-y-6">
                                {/* Course Features */}
                                <Card>
                                    <CardContent className="p-6">
                                        <h4 className="font-semibold mb-4">This Course Includes:</h4>
                                        <div className="space-y-3">
                                            {courseData.features.map((feature, index) => (
                                                <div key={index} className="flex items-center gap-3">
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                    <span className="text-sm text-muted-foreground">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Tags */}
                                <Card>
                                    <CardContent className="p-6">
                                        <h4 className="font-semibold mb-4">Tags</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {courseData.tags.map((tag, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}