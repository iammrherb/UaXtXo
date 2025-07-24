"use client"

import * as React from "react"
import { Loader2, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
  message?: string
}

export function LoadingSpinner({ size = "md", className, message }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  }

  return (
    <div className={cn("flex flex-col items-center justify-center gap-2", className)} role="status" aria-live="polite">
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      {message && (
        <p className="text-sm text-muted-foreground" aria-label={message}>
          {message}
        </p>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  )
}

interface SkeletonCardProps {
  showAvatar?: boolean
  showImage?: boolean
  lines?: number
  className?: string
}

export function SkeletonCard({ showAvatar = false, showImage = false, lines = 3, className }: SkeletonCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex items-center space-x-4">
          {showAvatar && <Skeleton className="h-12 w-12 rounded-full" />}
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {showImage && <Skeleton className="h-48 w-full rounded-md" />}
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className={cn("h-4", i === lines - 1 ? "w-2/3" : "w-full")} />
        ))}
      </CardContent>
    </Card>
  )
}

interface LoadingStateProps {
  loading: boolean
  error?: string | null
  onRetry?: () => void
  children: React.ReactNode
  loadingComponent?: React.ReactNode
  errorComponent?: React.ReactNode
  emptyState?: React.ReactNode
  isEmpty?: boolean
  className?: string
}

export function LoadingState({
  loading,
  error,
  onRetry,
  children,
  loadingComponent,
  errorComponent,
  emptyState,
  isEmpty = false,
  className
}: LoadingStateProps) {
  if (loading) {
    return (
      <div className={cn("flex items-center justify-center p-8", className)}>
        {loadingComponent || <LoadingSpinner message="Loading content..." />}
      </div>
    )
  }

  if (error) {
    return (
      <div className={cn("p-4", className)}>
        {errorComponent || (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>{error}</span>
              {onRetry && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRetry}
                  className="ml-4"
                  aria-label="Retry loading"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Retry
                </Button>
              )}
            </AlertDescription>
          </Alert>
        )}
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div className={cn("flex items-center justify-center p-8", className)}>
        {emptyState || (
          <div className="text-center text-muted-foreground">
            <p>No content available</p>
          </div>
        )}
      </div>
    )
  }

  return <div className={className}>{children}</div>
}

interface ProgressiveLoadingProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  delay?: number
  className?: string
}

export function ProgressiveLoading({ 
  children, 
  fallback, 
  delay = 200, 
  className 
}: ProgressiveLoadingProps) {
  const [showContent, setShowContent] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      setShowContent(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  if (!mounted) {
    return null
  }

  if (!showContent) {
    return (
      <div className={className}>
        {fallback || <LoadingSpinner size="sm" />}
      </div>
    )
  }

  return <div className={className}>{children}</div>
}

interface LazyLoadProps {
  children: React.ReactNode
  placeholder?: React.ReactNode
  rootMargin?: string
  threshold?: number
  className?: string
}

export function LazyLoad({ 
  children, 
  placeholder, 
  rootMargin = "50px", 
  threshold = 0.1,
  className 
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [hasLoaded, setHasLoaded] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true)
          setHasLoaded(true)
        }
      },
      {
        rootMargin,
        threshold
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [rootMargin, threshold, hasLoaded])

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : (placeholder || <SkeletonCard />)}
    </div>
  )
}