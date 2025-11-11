'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { getTimeline, urlFor } from '@/lib/sanity'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TimelineItem {
  _id: string
  year: string
  title: string
  description?: any[]
  shortDescription?: string
  image?: any
  order: number
}

export default function Timeline() {
  const [timelineData, setTimelineData] = useState<TimelineItem[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Transform scroll progress to horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"])

  useEffect(() => {
    async function fetchTimeline() {
      try {
        const data = await getTimeline()
        if (data && data.length > 0) {
          setTimelineData(data)
        } else {
          // Fallback data
          setTimelineData([
            {
              _id: '1',
              year: '1973',
              title: 'Foundation Established',
              shortDescription: 'Usman Memorial Foundation was formed in memory of Late Mohammad Usman.',
              order: 1
            },
            {
              _id: '2', 
              year: '1994',
              title: 'UIT Established',
              shortDescription: 'Usman Institute of Technology (UIT) was established as a philanthropic initiative.',
              order: 2
            },
            {
              _id: '3',
              year: '2015', 
              title: 'NED Affiliation',
              shortDescription: 'UIT got affiliation with NED University of Engineering and Technology.',
              order: 3
            },
            {
              _id: '4',
              year: '2021',
              title: 'Independent University',
              shortDescription: 'UIT became an independent chartered UIT University.',
              order: 4
            }
          ])
        }
      } catch (error) {
        console.error('Error fetching timeline:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTimeline()
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle wheel scroll for horizontal movement on desktop
  useEffect(() => {
    const container = containerRef.current
    if (!container || isMobile) return

    const handleWheel = (e: WheelEvent) => {
      if (!isInView) return
      
      const scrollContainer = scrollContainerRef.current
      if (!scrollContainer) return

      e.preventDefault()
      
      const scrollAmount = e.deltaY * 2
      scrollContainer.scrollLeft += scrollAmount
      
      // Update current index based on scroll position
      const itemWidth = scrollContainer.scrollWidth / timelineData.length
      const newIndex = Math.round(scrollContainer.scrollLeft / itemWidth)
      setCurrentIndex(Math.max(0, Math.min(newIndex, timelineData.length - 1)))
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [isInView, isMobile, timelineData.length])

  const navigateToItem = (index: number) => {
    setCurrentIndex(index)
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      const itemWidth = scrollContainer.scrollWidth / timelineData.length
      scrollContainer.scrollTo({
        left: itemWidth * index,
        behavior: 'smooth'
      })
    }
  }

  const buildImageUrl = (image: any) => {
    if (!image) return null
    const builder = urlFor(image)
    if (typeof (builder as any).width === 'function') {
      return (builder as any).width(600).height(400).url()
    }
    return builder.url()
  }

  if (loading) {
    return (
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="flex gap-8 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="min-w-[300px] h-96 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section ref={containerRef} className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-large font-semibold mb-4">
            Our <span className="ma-hightlighted-text">Timeline</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A journey through the milestones that shaped UIT University into what it is today.
          </p>
        </motion.div>

        {/* Progress Indicators */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex space-x-2">
            {timelineData.map((_, index) => (
              <button
                key={index}
                onClick={() => navigateToItem(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Navigation Buttons (Desktop) */}
        {!isMobile && (
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateToItem(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateToItem(Math.min(timelineData.length - 1, currentIndex + 1))}
              disabled={currentIndex === timelineData.length - 1}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Timeline Container */}
        <div className="relative">
          {/* Desktop Horizontal Timeline */}
          {!isMobile ? (
            <motion.div
              ref={scrollContainerRef}
              className="flex gap-8 overflow-x-auto scrollbar-hide pb-4"
              style={{ x: isMobile ? 0 : x }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {timelineData.map((item, index) => (
                <motion.div
                  key={item._id}
                  className="min-w-[350px] relative"
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ delay: 0.2 * index, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                >
                  {/* Timeline Line */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-primary to-transparent" />
                  
                  {/* Year Badge */}
                  <motion.div 
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold text-sm shadow-lg"
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.year}
                  </motion.div>

                  {/* Card */}
                  <Card className="mt-12 bg-background hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                    {item.image && (
                      <div className="overflow-hidden rounded-t-lg">
                        <motion.img
                          src={buildImageUrl(item.image) || '/placeholder-image.jpg'}
                          alt={item.title}
                          className="w-full h-48 object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">{item.year}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.shortDescription || 'No description available'}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Mobile Vertical Timeline */
            <div className="space-y-8">
              {timelineData.map((item, index) => (
                <motion.div
                  key={item._id}
                  className="relative pl-8"
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ delay: 0.2 * index, duration: 0.6 }}
                >
                  {/* Vertical Line */}
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />
                  
                  {/* Year Badge */}
                  <div className="absolute -left-2 top-4 bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm shadow-lg">
                    {item.year.slice(-2)}
                  </div>

                  {/* Card */}
                  <Card className="ml-4 bg-background hover:shadow-lg transition-shadow">
                    {item.image && (
                      <div className="overflow-hidden rounded-t-lg">
                        <img
                          src={buildImageUrl(item.image) || '/placeholder-image.jpg'}
                          alt={item.title}
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">{item.year}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {item.shortDescription || 'No description available'}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Scroll Hint (Desktop only) */}
        {!isMobile && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <p className="text-sm text-muted-foreground">
              Scroll to navigate through our timeline
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}