"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Loader2, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccessibleInfiniteScrollProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  loadMore: () => Promise<void>
  hasMore: boolean
  loading: boolean
  className?: string
  itemsPerPage?: number
  enableInfiniteScroll?: boolean
  loadingMessage?: string
  endMessage?: string
  errorMessage?: string
  onError?: (error: Error) => void
}

export function AccessibleInfiniteScroll<T>({
  items,
  renderItem,
  loadMore,
  hasMore,
  loading,
  className,
  itemsPerPage = 20,
  enableInfiniteScroll = true,
  loadingMessage = "Loading more items...",
  endMessage = "No more items to load",
  errorMessage = "Failed to load more items",
  onError
}: AccessibleInfiniteScrollProps<T>) {
  const [displayCount, setDisplayCount] = React.useState(itemsPerPage)
  const [error, setError] = React.useState<string | null>(null)
  const observerRef = React.useRef<HTMLDivElement>(null)
  const loadingRef = React.useRef(false)

  // Intersection Observer for infinite scroll
  React.useEffect(() => {
    if (!enableInfiniteScroll || !observerRef.current) return

    const observer = new IntersectionObserver(
      async (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && hasMore && !loading && !loadingRef.current) {
          loadingRef.current = true
          try {
            await loadMore()
            setError(null)
          } catch (err) {
            const errorMsg = err instanceof Error ? err.message : errorMessage
            setError(errorMsg)
            onError?.(err instanceof Error ? err : new Error(errorMsg))
          } finally {
            loadingRef.current = false
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    )

    observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [enableInfiniteScroll, hasMore, loading, loadMore, errorMessage, onError])

  const handleLoadMore = async () => {
    if (enableInfiniteScroll) {
      // For infinite scroll, trigger the loadMore function
      if (!loading && hasMore) {
        try {
          await loadMore()
          setError(null)
        } catch (err) {
          const errorMsg = err instanceof Error ? err.message : errorMessage
          setError(errorMsg)
          onError?.(err instanceof Error ? err : new Error(errorMsg))
        }
      }
    } else {
      // For pagination, just show more items
      setDisplayCount(prev => prev + itemsPerPage)
    }
  }

  const visibleItems = enableInfiniteScroll ? items : items.slice(0, displayCount)
  const showLoadMoreButton = enableInfiniteScroll ? hasMore : displayCount < items.length

  return (
    <div className={cn("space-y-4", className)}>
      {/* Items list */}
      <div 
        role="list" 
        aria-label="Content list"
        className="space-y-2"
      >
        {visibleItems.map((item, index) => (
          <div key={index} role="listitem">
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {/* Loading indicator for infinite scroll */}
      {enableInfiniteScroll && (
        <div
          ref={observerRef}
          className="flex justify-center py-4"
          aria-live="polite"
          aria-label="Loading indicator"
        >
          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{loadingMessage}</span>
            </div>
          )}
        </div>
      )}

      {/* Manual load more button */}
      {showLoadMoreButton && !loading && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={loading}
            aria-label="Load more items"
            className="flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Load More
              </>
            )}
          </Button>
        </div>
      )}

      {/* End message */}
      {!hasMore && !loading && items.length > 0 && (
        <div 
          className="text-center text-muted-foreground py-4"
          role="status"
          aria-live="polite"
        >
          {endMessage}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div 
          className="text-center text-destructive py-4"
          role="alert"
          aria-live="assertive"
        >
          <p>{error}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLoadMore}
            className="mt-2"
          >
            Try Again
          </Button>
        </div>
      )}

      {/* Empty state */}
      {items.length === 0 && !loading && (
        <div 
          className="text-center text-muted-foreground py-8"
          role="status"
        >
          No items available
        </div>
      )}

      {/* Accessibility controls */}
      <div className="flex justify-center gap-2 pt-4 border-t">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          aria-label="Scroll to top"
        >
          Back to Top
        </Button>
        
        {enableInfiniteScroll && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setDisplayCount(itemsPerPage)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            aria-label="Reset to first page"
          >
            Reset View
          </Button>
        )}
      </div>
    </div>
  )
}