"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AccessibleCarouselProps {
  children: React.ReactNode[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showControls?: boolean
  showIndicators?: boolean
  className?: string
  ariaLabel?: string
}

export function AccessibleCarousel({
  children,
  autoPlay = false,
  autoPlayInterval = 5000,
  showControls = true,
  showIndicators = true,
  className,
  ariaLabel = "Content carousel"
}: AccessibleCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(autoPlay)
  const [isUserInteracting, setIsUserInteracting] = React.useState(false)
  const carouselRef = React.useRef<HTMLDivElement>(null)
  const intervalRef = React.useRef<NodeJS.Timeout>()

  const totalItems = children.length

  // Auto-play functionality with pause on interaction
  React.useEffect(() => {
    if (isPlaying && !isUserInteracting && autoPlay) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalItems)
      }, autoPlayInterval)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, isUserInteracting, autoPlay, autoPlayInterval, totalItems])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsUserInteracting(true)
    setTimeout(() => setIsUserInteracting(false), 3000)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems)
    setIsUserInteracting(true)
    setTimeout(() => setIsUserInteracting(false), 3000)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems)
    setIsUserInteracting(true)
    setTimeout(() => setIsUserInteracting(false), 3000)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        goToPrevious()
        break
      case 'ArrowRight':
        event.preventDefault()
        goToNext()
        break
      case 'Home':
        event.preventDefault()
        goToSlide(0)
        break
      case 'End':
        event.preventDefault()
        goToSlide(totalItems - 1)
        break
      case ' ':
        if (autoPlay) {
          event.preventDefault()
          togglePlayPause()
        }
        break
    }
  }

  return (
    <div
      className={cn("relative focus-within:outline-none", className)}
      role="region"
      aria-label={ariaLabel}
      aria-live="polite"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {currentIndex + 1} of {totalItems}
      </div>

      {/* Main carousel content */}
      <div
        ref={carouselRef}
        className="overflow-hidden rounded-lg"
        onMouseEnter={() => setIsUserInteracting(true)}
        onMouseLeave={() => setIsUserInteracting(false)}
        onFocus={() => setIsUserInteracting(true)}
        onBlur={() => setIsUserInteracting(false)}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0"
              role="tabpanel"
              aria-label={`Slide ${index + 1}`}
              aria-hidden={index !== currentIndex}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation controls */}
      {showControls && (
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
          <Button
            variant="outline"
            size="icon"
            className="ml-4 pointer-events-auto bg-white/90 hover:bg-white"
            onClick={goToPrevious}
            aria-label="Previous slide"
            disabled={totalItems <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="mr-4 pointer-events-auto bg-white/90 hover:bg-white"
            onClick={goToNext}
            aria-label="Next slide"
            disabled={totalItems <= 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Auto-play controls */}
      {autoPlay && (
        <div className="absolute top-4 right-4">
          <Button
            variant="outline"
            size="sm"
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            className="bg-white/90 hover:bg-white"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
      )}

      {/* Slide indicators */}
      {showIndicators && totalItems > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2" role="tablist" aria-label="Slide navigation">
            {children.map((_, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Go to slide ${index + 1}`}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  index === currentIndex
                    ? "bg-primary scale-110"
                    : "bg-white/60 hover:bg-white/80"
                )}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Alternative: List view for users who prefer static content */}
      <details className="mt-4">
        <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
          View all slides as a list (accessibility option)
        </summary>
        <div className="mt-2 space-y-4 border-t pt-4">
          {children.map((child, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Slide {index + 1}</h3>
              {child}
            </div>
          ))}
        </div>
      </details>
    </div>
  )
}