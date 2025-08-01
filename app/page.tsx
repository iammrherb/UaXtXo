import { Suspense } from 'react'
import TcoAnalyzerUltimate from '@/components/tco-analyzer'
import { LoadingSpinner } from '@/components/ui/loading-states'

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
