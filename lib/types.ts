// Core application types
export interface CalculationConfiguration {
  orgSize: "small" | "medium" | "large" | "enterprise"
  devices: number
  users: number
  industry: string
  years: number
  region: string
  portnoxBasePrice: number
  portnoxAddons: {
    atp: boolean
    compliance: boolean
    iot: boolean
    analytics: boolean
  }
}

export interface VendorSelectionState {
  selectedVendors: string[]
  searchQuery: string
  filters: {
    category?: string
    deploymentType?: string
    minMarketShare?: number
    maxPrice?: number
  }
  sortBy: string
}

export interface LoadingState {
  isLoading: boolean
  error: string | null
  progress?: number
  message?: string
}

export interface AccessibilityPreferences {
  reduceMotion: boolean
  highContrast: boolean
  largeText: boolean
  screenReader: boolean
}

export interface UIState {
  darkMode: boolean
  sidebarCollapsed: boolean
  sidebarOpen: boolean
  settingsOpen: boolean
  accessibility: AccessibilityPreferences
}

// Error handling types
export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: Date
  recoverable: boolean
}

export interface ErrorBoundaryState {
  hasError: boolean
  error?: AppError
  errorInfo?: any
}

// Progressive enhancement types
export interface FeatureSupport {
  intersectionObserver: boolean
  webAnimations: boolean
  customProperties: boolean
  gridLayout: boolean
  flexbox: boolean
}

export interface BrowserCapabilities {
  features: FeatureSupport
  isModern: boolean
  needsPolyfills: string[]
}