'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCourses, urlFor } from '@/lib/sanity';

interface SanityCourse {
  _id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  price: string;
  image?: any;
  slug: {
    current: string;
  };
  category?: string;
}

// Fallback courses for when Sanity is not configured
const fallbackCourses = [
  {
    _id: '1',
    title: 'BS Computer Science',
    description: 'Comprehensive computer science program covering programming, algorithms, data structures, and software development.',
    duration: '4 Years',
    level: 'bachelor',
    price: '150,000 PKR',
    category: 'computer-science',
    slug: { current: 'bs-computer-science' }
  },
  {
    _id: '2',
    title: 'BS Software Engineering',
    description: 'Focus on software development lifecycle, project management, and modern software engineering practices.',
    duration: '4 Years',
    level: 'bachelor',
    price: '150,000 PKR',
    category: 'computer-science',
    slug: { current: 'bs-software-engineering' }
  },
  {
    _id: '3',
    title: 'BS Artificial Intelligence',
    description: 'Cutting-edge AI program covering machine learning, neural networks, and intelligent systems.',
    duration: '4 Years',
    level: 'bachelor',
    price: '160,000 PKR',
    category: 'computer-science',
    slug: { current: 'bs-artificial-intelligence' }
  }
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<SanityCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortBy, setSortBy] = useState('title');

  useEffect(() => {
    async function fetchCourses() {
      try {
        const sanityCourses = await getCourses();
        if (sanityCourses && sanityCourses.length > 0) {
          setCourses(sanityCourses);
        } else {
          // Use fallback courses if Sanity is not configured or has no data
          setCourses(fallbackCourses);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setCourses(fallbackCourses);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  // Get unique categories and levels from courses
  const categories = ['All', ...Array.from(new Set(courses.map(course => course.category || 'Other').filter(Boolean)))];
  const levels = ['All', ...Array.from(new Set(courses.map(course => course.level).filter(Boolean)))];

  const filteredCourses = courses.filter(course => {
    const categoryMatch = selectedCategory === 'All' || course.category === selectedCategory;
    const levelMatch = selectedLevel === 'All' || course.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'duration':
        return a.duration.localeCompare(b.duration);
      default:
        return 0;
    }
  });

  const formatLevel = (level: string) => {
    const levelMap: { [key: string]: string } = {
      'beginner': 'Beginner',
      'intermediate': 'Intermediate',
      'advanced': 'Advanced',
      'bachelor': 'Bachelor',
      'master': 'Master',
      'phd': 'PhD'
    };
    return levelMap[level] || level;
  };

  const formatCategory = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'computer-science': 'Computer Science',
      'engineering': 'Engineering',
      'business': 'Business',
      'management': 'Management',
      'arts': 'Arts',
      'sciences': 'Sciences'
    };
    return categoryMap[category] || category;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="heading-large mb-4">Our Courses</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Discover our comprehensive range of programs designed to meet industry demands and prepare you for success.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Level Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="title">Title</option>
                  <option value="price">Price</option>
                  <option value="duration">Duration</option>
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              Showing {sortedCourses.length} course{sortedCourses.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sortedCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No courses found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedCourses.map((course) => (
                <div key={course._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {course.image ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={typeof urlFor(course.image).url === 'function' ? urlFor(course.image).url() : '/placeholder-image.jpg'}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-4xl font-bold mb-2">{course.title.charAt(0)}</div>
                        <div className="text-sm opacity-90">{formatCategory(course.category || '')}</div>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${course.level === 'bachelor' || course.level === 'beginner' ? 'bg-blue-100 text-blue-800' :
                        course.level === 'master' || course.level === 'advanced' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                        {formatLevel(course.level)}
                      </span>
                      <span className="text-sm text-gray-500">{course.duration}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3">{course.description}</p>

                    {course.category && (
                      <div className="mb-4">
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {formatCategory(course.category)}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-blue-600">
                        {course.price}
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/courses/${course.slug.current}`}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          Learn More
                        </Link>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-large text-gray-900 mb-4">Ready to Start Learning?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have chosen UIT University for their education.
            Apply now and take the first step towards your future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
