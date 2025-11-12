'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { HeroSlideshowSettings } from '@/types/uit-components'

export default function HeroSlideshow(settings: HeroSlideshowSettings) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { slides, shadow_overlay, autoplay, autoplay_speed, show_navigation, show_pagination, height } = settings

  useEffect(() => {
    if (!autoplay || slides.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, autoplay_speed * 1000)

    return () => clearInterval(interval)
  }, [autoplay, autoplay_speed, slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const heightClasses = {
    medium: 'h-96',
    large: 'h-[600px]',
    fullscreen: 'h-screen'
  }

  if (slides.length === 0) {
    return (
      <div className="bg-gray-100 h-96 flex items-center justify-center">
        <p className="text-gray-500">No slides configured</p>
      </div>
    )
  }

  return (
    <div className={`relative ${heightClasses[height]} overflow-hidden`}>
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          {slide.image_url && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image_url})` }}
            />
          )}

          {/* Shadow Overlay */}
          {shadow_overlay && (
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          )}

          {/* Content */}
          <div className="relative h-full flex items-center justify-center px-4">
            <div className={`max-w-4xl text-center ${
              slide.text_position === 'left' ? 'mr-auto text-left' :
              slide.text_position === 'right' ? 'ml-auto text-right' :
              'mx-auto text-center'
            }`}>
              {slide.title_text && (
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  {slide.title_text}
                </h1>
              )}
              {slide.subtitle_text && (
                <p className="text-xl md:text-2xl text-white mb-8">
                  {slide.subtitle_text}
                </p>
              )}
              {slide.cta_text && slide.cta_link && (
                <a
                  href={slide.cta_link}
                  className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  {slide.cta_text}
                </a>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {show_navigation && slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full transition-all"
          >
            <ChevronLeft className="h-6 w-6 text-gray-900" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full transition-all"
          >
            <ChevronRight className="h-6 w-6 text-gray-900" />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {show_pagination && slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
