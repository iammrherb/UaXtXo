import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { LoadingSpinner } from '@/components/ui/loading-states'

// Dynamic import to prevent SSR issues
const TcoAnalyzerUltimate = dynamic(() => import("@/components/tco-analyzer"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" message="Loading TCO Analyzer..." />
    </div>
  )
})

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" message="Initializing application..." />
        </div>
      }>
        <TcoAnalyzerUltimate />
      </Suspense>
    </div>
  )
}
