'use client'

import { useCourses } from '@/hooks/useCMS'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { urlFor } from '@/lib/sanity'
import { Skeleton } from '@/components/ui/skeleton'

export default function CoursesFromCMS() {
  const { courses, loading, error } = useCourses()

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-background">
            <Skeleton className="w-full h-48" />
            <CardContent className="p-6">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-9 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <p className="text-muted-foreground">
          Using fallback data. Please configure your CMS connection.
        </p>
      </div>
    )
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No courses found in CMS.</p>
        <p className="text-sm text-muted-foreground">
          Add some courses to your Sanity CMS to see them here.
        </p>
      </div>
    )
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {courses.map((course) => (
          <CarouselItem key={course._id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
            <Card className="bg-background h-full">
              <div className="overflow-hidden">
                {course.image ? (
                  <img 
                    src={urlFor(course.image).width(500).height(300).url()} 
                    alt={course.title} 
                    className="w-full h-48 object-cover" 
                  />
                ) : (
                  <div className="w-full h-48 bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">No image</span>
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    {course.level}
                  </span>
                  <span className="text-sm text-muted-foreground">{course.duration}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{course.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm line-clamp-3">{course.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">{course.price}</span>
                  <Button size="sm">Enroll Now</Button>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-primary-foreground bg-primary hover:bg-primary/90" />
      <CarouselNext className="text-primary-foreground bg-primary hover:bg-primary/90" />
    </Carousel>
  )
}