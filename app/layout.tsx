import type { Metadata } from 'next'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { SkipLink } from '@/components/ui/focus-management'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portnox TCO Analyzer - Executive Intelligence Decision Platform',
  description: 'Comprehensive Total Cost of Ownership analysis for Network Access Control solutions',
  keywords: 'NAC, Network Access Control, TCO, ROI, Security, Portnox',
  authors: [{ name: 'Portnox' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SkipLink href="#main-content">
          Skip to main content
        </SkipLink>
        <SkipLink href="#vendor-selection">
          Skip to vendor selection
        </SkipLink>
        <ErrorBoundary showDetails={process.env.NODE_ENV === 'development'}>
          <div id="main-content">
            {children}
          </div>
        </ErrorBoundary>
      </body>
    </html>
  )
}
