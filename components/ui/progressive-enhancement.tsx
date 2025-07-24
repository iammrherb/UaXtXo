"use client"

import * as React from "react"

interface ProgressiveEnhancementProps {
  children: React.ReactNode
  fallback: React.ReactNode
  feature: string
  className?: string
}

export function ProgressiveEnhancement({ 
  children, 
  fallback, 
  feature, 
  className 
}: ProgressiveEnhancementProps) {
  const [isSupported, setIsSupported] = React.useState(false)
  const [isLoaded, setIsLoaded] = React.useState(false)

  React.useEffect(() => {
    const checkFeatureSupport = () => {
      switch (feature) {
        case 'intersectionObserver':
          return 'IntersectionObserver' in window
        case 'webAnimations':
          return 'animate' in document.createElement('div')
        case 'customProperties':
          return CSS.supports('color', 'var(--test)')
        case 'gridLayout':
          return CSS.supports('display', 'grid')
        case 'flexbox':
          return CSS.supports('display', 'flex')
        case 'javascript':
          return true
        default:
          return false
      }
    }

    setIsSupported(checkFeatureSupport())
    setIsLoaded(true)
  }, [feature])

  if (!isLoaded) {
    return <div className={className}>{fallback}</div>
  }

  return (
    <div className={className}>
      {isSupported ? children : fallback}
    </div>
  )
}

interface NoScriptFallbackProps {
  children: React.ReactNode
  message?: string
}

export function NoScriptFallback({ children, message }: NoScriptFallbackProps) {
  return (
    <>
      <noscript>
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800">
            {message || "This application requires JavaScript to function properly. Please enable JavaScript in your browser."}
          </p>
          <div className="mt-4">
            {children}
          </div>
        </div>
      </noscript>
    </>
  )
}

export function useFeatureDetection() {
  const [features, setFeatures] = React.useState({
    intersectionObserver: false,
    webAnimations: false,
    customProperties: false,
    gridLayout: false,
    flexbox: false,
    javascript: true
  })

  React.useEffect(() => {
    setFeatures({
      intersectionObserver: 'IntersectionObserver' in window,
      webAnimations: 'animate' in document.createElement('div'),
      customProperties: CSS.supports('color', 'var(--test)'),
      gridLayout: CSS.supports('display', 'grid'),
      flexbox: CSS.supports('display', 'flex'),
      javascript: true
    })
  }, [])

  return features
}