"use client"

export interface MarketMetrics {
  marketSize: number
  growthRate: number
  competitiveIndex: number
  volatilityIndex: number
  pricingPressure: number
  demandIndex: number
  timestamp: Date
}

export interface VendorMarketData {
  vendorId: string
  marketShare: number
  customerSentiment: number
  pricingTrend: number
  marketPressure: number
  recentNews: string[]
  timestamp: Date
}

export interface MarketAlert {
  id: string
  type: "security_issue" | "price_change" | "market_shift" | "competitive_move"
  severity: "critical" | "high" | "medium" | "low"
  title: string
  message: string
  vendorId?: string
  timestamp: Date
  read: boolean
  actionRequired: boolean
  source: string
  verified: boolean
}

export interface CompetitiveIntelligence {
  id: string
  vendorId: string
  updateType: "funding" | "partnership" | "vulnerability" | "product_launch" | "pricing_change"
  title: string
  description: string
  impact: "high" | "medium" | "low"
  source: string
  verified: boolean
  timestamp: Date
}

class MarketDataService {
  private subscribers: Set<(data: any) => void> = new Set()
  private isRunning = false
  private intervalId: NodeJS.Timeout | null = null

  // Simulated real-time market data
  private generateMarketMetrics(): MarketMetrics {
    const baseMetrics = {
      marketSize: 2.8, // $2.8B
      growthRate: 0.125, // 12.5% CAGR
      competitiveIndex: 75 + Math.random() * 10, // 75-85
      volatilityIndex: 45 + Math.random() * 20, // 45-65
      pricingPressure: 60 + Math.random() * 25, // 60-85
      demandIndex: 80 + Math.random() * 15, // 80-95
    }

    return {
      ...baseMetrics,
      timestamp: new Date(),
    }
  }

  private generateVendorData(): VendorMarketData[] {
    return [
      {
        vendorId: "portnox",
        marketShare: 8.5 + Math.random() * 2, // Growing market share
        customerSentiment: 92 + Math.random() * 5, // High satisfaction
        pricingTrend: -0.5 + Math.random() * 1, // Stable pricing
        marketPressure: 15 + Math.random() * 10, // Low pressure
        recentNews: [
          "Portnox CLEAR achieves 99.9% uptime SLA",
          "New Zero Trust certification completed",
          "Customer deployment time reduced to 1 hour average",
        ],
        timestamp: new Date(),
      },
      {
        vendorId: "cisco",
        marketShare: 25.3 - Math.random() * 2, // Declining share
        customerSentiment: 68 + Math.random() * 8,
        pricingTrend: -2 + Math.random() * 1, // Under pressure
        marketPressure: 75 + Math.random() * 15, // High pressure
        recentNews: [
          "ISE 3.3 patch released for critical vulnerability",
          "Hardware refresh cycle announced",
          "Cloud migration strategy updated",
        ],
        timestamp: new Date(),
      },
      {
        vendorId: "aruba",
        marketShare: 15.2 + Math.random() * 1,
        customerSentiment: 78 + Math.random() * 6,
        pricingTrend: -1 + Math.random() * 2,
        marketPressure: 45 + Math.random() * 20,
        recentNews: [
          "ClearPass 6.12 released with new features",
          "HPE Aruba partnership expansion",
          "Cloud-first strategy announced",
        ],
        timestamp: new Date(),
      },
      {
        vendorId: "forescout",
        marketShare: 12.1 + Math.random() * 1,
        customerSentiment: 72 + Math.random() * 8,
        pricingTrend: 0.5 + Math.random() * 1.5,
        marketPressure: 35 + Math.random() * 15,
        recentNews: [
          "New IoT security module launched",
          "OT security capabilities enhanced",
          "Customer success program expanded",
        ],
        timestamp: new Date(),
      },
    ]
  }

  private generateMarketAlerts(): MarketAlert[] {
    const alerts: MarketAlert[] = []
    const now = new Date()

    // Generate realistic market alerts
    if (Math.random() > 0.7) {
      alerts.push({
        id: `alert-${Date.now()}-1`,
        type: "security_issue",
        severity: "critical",
        title: "Critical Vulnerability Discovered",
        message: "New CVE affecting legacy NAC solutions requires immediate patching",
        vendorId: "cisco",
        timestamp: new Date(now.getTime() - Math.random() * 3600000),
        read: false,
        actionRequired: true,
        source: "NIST NVD",
        verified: true,
      })
    }

    if (Math.random() > 0.8) {
      alerts.push({
        id: `alert-${Date.now()}-2`,
        type: "price_change",
        severity: "medium",
        title: "Market Pricing Pressure Increasing",
        message: "Traditional NAC vendors reducing prices by 15-20% due to cloud competition",
        timestamp: new Date(now.getTime() - Math.random() * 7200000),
        read: false,
        actionRequired: false,
        source: "Market Analysis",
        verified: true,
      })
    }

    if (Math.random() > 0.6) {
      alerts.push({
        id: `alert-${Date.now()}-3`,
        type: "market_shift",
        severity: "high",
        title: "Cloud-Native Adoption Accelerating",
        message: "85% of new NAC deployments choosing cloud-native solutions over traditional appliances",
        timestamp: new Date(now.getTime() - Math.random() * 1800000),
        read: false,
        actionRequired: false,
        source: "Industry Report",
        verified: true,
      })
    }

    return alerts
  }

  private generateCompetitiveIntel(): CompetitiveIntelligence[] {
    const intel: CompetitiveIntelligence[] = []
    const now = new Date()

    intel.push({
      id: `intel-${Date.now()}-1`,
      vendorId: "portnox",
      updateType: "product_launch",
      title: "Portnox CLEAR 5.0 Released",
      description: "New AI-powered threat detection and automated response capabilities",
      impact: "high",
      source: "Vendor Announcement",
      verified: true,
      timestamp: new Date(now.getTime() - Math.random() * 86400000),
    })

    intel.push({
      id: `intel-${Date.now()}-2`,
      vendorId: "cisco",
      updateType: "vulnerability",
      title: "ISE Critical Security Update",
      description: "Mandatory security patch for all ISE deployments",
      impact: "high",
      source: "Security Advisory",
      verified: true,
      timestamp: new Date(now.getTime() - Math.random() * 43200000),
    })

    return intel
  }

  subscribe(callback: (data: any) => void) {
    this.subscribers.add(callback)

    if (!this.isRunning) {
      this.start()
    }

    // Return unsubscribe function
    return () => {
      this.subscribers.delete(callback)
      if (this.subscribers.size === 0) {
        this.stop()
      }
    }
  }

  private start() {
    if (this.isRunning) return

    this.isRunning = true
    this.intervalId = setInterval(() => {
      const data = {
        marketMetrics: this.generateMarketMetrics(),
        vendorData: this.generateVendorData(),
        alerts: this.generateMarketAlerts(),
        competitiveIntel: this.generateCompetitiveIntel(),
      }

      this.subscribers.forEach((callback) => callback(data))
    }, 30000) // Update every 30 seconds

    // Send initial data
    const initialData = {
      marketMetrics: this.generateMarketMetrics(),
      vendorData: this.generateVendorData(),
      alerts: this.generateMarketAlerts(),
      competitiveIntel: this.generateCompetitiveIntel(),
    }

    this.subscribers.forEach((callback) => callback(initialData))
  }

  private stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
    this.isRunning = false
  }
}

export const marketDataService = new MarketDataService()
