'use client'

import { useTestimonials } from '@/hooks/useCMS'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Star } from 'lucide-react'
import { urlFor } from '@/lib/sanity'
import { Skeleton } from '@/components/ui/skeleton'
import { useState, useEffect } from 'react'

export default function TestimonialsFromCMS() {
  const { testimonials, loading, error } = useTestimonials()
  const [api, setApi] = useState<any>()

  useEffect(() => {
    if (!api) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, 4000)

    return () => clearInterval(interval)
  }, [api])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-background p-8 text-center">
            <CardContent className="p-0">
              <Skeleton className="h-8 w-8 mx-auto mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mx-auto mb-6" />
              <Skeleton className="h-4 w-20 mx-auto mb-4" />
              <Skeleton className="h-4 w-32 mx-auto mb-1" />
              <Skeleton className="h-3 w-40 mx-auto" />
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

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No testimonials found in CMS.</p>
        <p className="text-sm text-muted-foreground">
          Add some testimonials to your Sanity CMS to see them here.
        </p>
      </div>
    )
  }

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {testimonials.map((testimonial) => (
          <CarouselItem key={testimonial._id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
            <Card className="bg-background p-8 text-center h-full">
              <CardContent className="p-0">
                <div className="text-4xl text-primary mb-4">"</div>
                <blockquote className="text-lg text-muted-foreground mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center justify-center mb-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="text-lg font-semibold text-foreground mb-1">
                  {testimonial.studentName}
                </div>
                <div className="text-sm text-muted-foreground">{testimonial.program}</div>
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