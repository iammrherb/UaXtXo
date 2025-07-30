import axios from 'axios'

export interface MarketDataPoint {
  timestamp: string
  vendor: string
  metric: string
  value: number
  source: string
  confidence: number
}

export interface PricingUpdate {
  vendorId: string
  pricePerDevice: number
  volumeDiscounts: Record<string, number>
  effectiveDate: string
  source: string
}

export interface SecurityAlert {
  vendorId: string
  alertType: 'cve' | 'incident' | 'advisory'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  impact: string
  recommendation: string
  timestamp: string
}

export interface ComplianceUpdate {
  vendorId: string
  framework: string
  status: 'certified' | 'compliant' | 'non-compliant' | 'under-review'
  effectiveDate: string
  expiryDate?: string
  certificationBody: string
}

export class RealTimeDataService {
  private static readonly API_ENDPOINTS = {
    pricing: 'https://api.vendorwatch.com/pricing',
    security: 'https://api.cvedetails.com/vendor',
    compliance: 'https://api.compliancetracker.com/certifications',
    market: 'https://api.marketintel.com/vendors',
    financial: 'https://api.financialdata.com/companies'
  }

  private static readonly UPDATE_INTERVALS = {
    pricing: 24 * 60 * 60 * 1000, // 24 hours
    security: 6 * 60 * 60 * 1000, // 6 hours
    compliance: 7 * 24 * 60 * 60 * 1000, // 7 days
    market: 12 * 60 * 60 * 1000, // 12 hours
    financial: 24 * 60 * 60 * 1000 // 24 hours
  }

  private static cache = new Map<string, { data: any; timestamp: number; ttl: number }>()
  private static subscribers = new Map<string, ((data: any) => void)[]>()

  // Real-time pricing updates
  static async getPricingUpdates(vendorIds: string[]): Promise<PricingUpdate[]> {
    try {
      // Simulate real-time pricing data
      const updates: PricingUpdate[] = []
      
      for (const vendorId of vendorIds) {
        // Check for cached data
        const cacheKey = `pricing_${vendorId}`
        const cached = this.cache.get(cacheKey)
        
        if (cached && Date.now() - cached.timestamp < this.UPDATE_INTERVALS.pricing) {
          updates.push(cached.data)
          continue
        }

        // Simulate API call for real pricing data
        const pricingData = await this.fetchVendorPricing(vendorId)
        if (pricingData) {
          updates.push(pricingData)
          this.cache.set(cacheKey, {
            data: pricingData,
            timestamp: Date.now(),
            ttl: this.UPDATE_INTERVALS.pricing
          })
        }
      }

      return updates
    } catch (error) {
      console.error('Error fetching pricing updates:', error)
      return []
    }
  }

  // Security alerts and CVE monitoring
  static async getSecurityAlerts(vendorIds: string[]): Promise<SecurityAlert[]> {
    try {
      const alerts: SecurityAlert[] = []
      
      for (const vendorId of vendorIds) {
        const cacheKey = `security_${vendorId}`
        const cached = this.cache.get(cacheKey)
        
        if (cached && Date.now() - cached.timestamp < this.UPDATE_INTERVALS.security) {
          alerts.push(...cached.data)
          continue
        }

        const securityData = await this.fetchSecurityAlerts(vendorId)
        if (securityData) {
          alerts.push(...securityData)
          this.cache.set(cacheKey, {
            data: securityData,
            timestamp: Date.now(),
            ttl: this.UPDATE_INTERVALS.security
          })
        }
      }

      return alerts
    } catch (error) {
      console.error('Error fetching security alerts:', error)
      return []
    }
  }

  // Compliance certification updates
  static async getComplianceUpdates(vendorIds: string[]): Promise<ComplianceUpdate[]> {
    try {
      const updates: ComplianceUpdate[] = []
      
      for (const vendorId of vendorIds) {
        const cacheKey = `compliance_${vendorId}`
        const cached = this.cache.get(cacheKey)
        
        if (cached && Date.now() - cached.timestamp < this.UPDATE_INTERVALS.compliance) {
          updates.push(...cached.data)
          continue
        }

        const complianceData = await this.fetchComplianceUpdates(vendorId)
        if (complianceData) {
          updates.push(...complianceData)
          this.cache.set(cacheKey, {
            data: complianceData,
            timestamp: Date.now(),
            ttl: this.UPDATE_INTERVALS.compliance
          })
        }
      }

      return updates
    } catch (error) {
      console.error('Error fetching compliance updates:', error)
      return []
    }
  }

  // Market intelligence and trends
  static async getMarketIntelligence(vendorIds: string[]): Promise<MarketDataPoint[]> {
    try {
      const intelligence: MarketDataPoint[] = []
      
      for (const vendorId of vendorIds) {
        const cacheKey = `market_${vendorId}`
        const cached = this.cache.get(cacheKey)
        
        if (cached && Date.now() - cached.timestamp < this.UPDATE_INTERVALS.market) {
          intelligence.push(...cached.data)
          continue
        }

        const marketData = await this.fetchMarketIntelligence(vendorId)
        if (marketData) {
          intelligence.push(...marketData)
          this.cache.set(cacheKey, {
            data: marketData,
            timestamp: Date.now(),
            ttl: this.UPDATE_INTERVALS.market
          })
        }
      }

      return intelligence
    } catch (error) {
      console.error('Error fetching market intelligence:', error)
      return []
    }
  }

  // Financial health monitoring
  static async getFinancialUpdates(vendorIds: string[]): Promise<any[]> {
    try {
      const updates: any[] = []
      
      for (const vendorId of vendorIds) {
        const cacheKey = `financial_${vendorId}`
        const cached = this.cache.get(cacheKey)
        
        if (cached && Date.now() - cached.timestamp < this.UPDATE_INTERVALS.financial) {
          updates.push(cached.data)
          continue
        }

        const financialData = await this.fetchFinancialData(vendorId)
        if (financialData) {
          updates.push(financialData)
          this.cache.set(cacheKey, {
            data: financialData,
            timestamp: Date.now(),
            ttl: this.UPDATE_INTERVALS.financial
          })
        }
      }

      return updates
    } catch (error) {
      console.error('Error fetching financial updates:', error)
      return []
    }
  }

  // Real-time data streaming
  static subscribeToUpdates(dataType: string, callback: (data: any) => void): () => void {
    if (!this.subscribers.has(dataType)) {
      this.subscribers.set(dataType, [])
    }
    
    this.subscribers.get(dataType)!.push(callback)
    
    // Start polling for this data type
    this.startPolling(dataType)
    
    // Return unsubscribe function
    return () => {
      const callbacks = this.subscribers.get(dataType) || []
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  private static pollingIntervals = new Map<string, NodeJS.Timeout>()

  private static startPolling(dataType: string) {
    if (this.pollingIntervals.has(dataType)) {
      return // Already polling
    }

    const interval = setInterval(async () => {
      try {
        let data: any = null
        
        switch (dataType) {
          case 'pricing':
            data = await this.getPricingUpdates(['portnox', 'cisco_ise', 'aruba_clearpass'])
            break
          case 'security':
            data = await this.getSecurityAlerts(['portnox', 'cisco_ise', 'aruba_clearpass'])
            break
          case 'compliance':
            data = await this.getComplianceUpdates(['portnox', 'cisco_ise', 'aruba_clearpass'])
            break
          case 'market':
            data = await this.getMarketIntelligence(['portnox', 'cisco_ise', 'aruba_clearpass'])
            break
        }

        if (data) {
          const callbacks = this.subscribers.get(dataType) || []
          callbacks.forEach(callback => callback(data))
        }
      } catch (error) {
        console.error(`Error polling ${dataType} data:`, error)
      }
    }, this.UPDATE_INTERVALS[dataType as keyof typeof this.UPDATE_INTERVALS] || 60000)

    this.pollingIntervals.set(dataType, interval)
  }

  // Mock API calls (replace with real API integrations)
  private static async fetchVendorPricing(vendorId: string): Promise<PricingUpdate | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Mock pricing data with realistic variations
    const basePrices: Record<string, number> = {
      portnox: 4.0,
      cisco_ise: 15.0,
      aruba_clearpass: 9.5,
      forescout: 7.5,
      ivanti_neurons: 8.5
    }

    const basePrice = basePrices[vendorId] || 5.0
    const variation = (Math.random() - 0.5) * 0.2 // ±10% variation
    
    return {
      vendorId,
      pricePerDevice: basePrice * (1 + variation),
      volumeDiscounts: {
        "1000": 10 + Math.random() * 5,
        "5000": 20 + Math.random() * 5,
        "10000": 30 + Math.random() * 5
      },
      effectiveDate: new Date().toISOString(),
      source: 'vendor_api'
    }
  }

  private static async fetchSecurityAlerts(vendorId: string): Promise<SecurityAlert[]> {
    await new Promise(resolve => setTimeout(resolve, 150))
    
    const alerts: SecurityAlert[] = []
    
    // Generate realistic security alerts
    if (vendorId === 'ivanti_neurons') {
      alerts.push({
        vendorId,
        alertType: 'cve',
        severity: 'critical',
        description: 'CVE-2024-0001: Remote code execution vulnerability',
        impact: 'Active exploitation in the wild by nation-state actors',
        recommendation: 'Immediate migration required - patch not available',
        timestamp: new Date().toISOString()
      })
    } else if (vendorId === 'cisco_ise') {
      alerts.push({
        vendorId,
        alertType: 'cve',
        severity: 'high',
        description: 'CVE-2024-0002: Authentication bypass vulnerability',
        impact: 'Potential unauthorized access to network resources',
        recommendation: 'Apply security patch immediately',
        timestamp: new Date().toISOString()
      })
    }
    
    return alerts
  }

  private static async fetchComplianceUpdates(vendorId: string): Promise<ComplianceUpdate[]> {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const updates: ComplianceUpdate[] = []
    
    // Mock compliance updates
    if (vendorId === 'portnox') {
      updates.push({
        vendorId,
        framework: 'SOC2-Type2',
        status: 'certified',
        effectiveDate: '2024-01-01',
        expiryDate: '2024-12-31',
        certificationBody: 'AICPA'
      })
    }
    
    return updates
  }

  private static async fetchMarketIntelligence(vendorId: string): Promise<MarketDataPoint[]> {
    await new Promise(resolve => setTimeout(resolve, 180))
    
    const dataPoints: MarketDataPoint[] = []
    
    // Mock market intelligence
    dataPoints.push({
      timestamp: new Date().toISOString(),
      vendor: vendorId,
      metric: 'customer_satisfaction',
      value: 75 + Math.random() * 25,
      source: 'gartner_peer_insights',
      confidence: 85
    })
    
    return dataPoints
  }

  private static async fetchFinancialData(vendorId: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 120))
    
    // Mock financial data
    return {
      vendorId,
      revenue: 1000000000 + Math.random() * 500000000,
      growth: Math.random() * 20,
      profitability: Math.random() * 30,
      timestamp: new Date().toISOString()
    }
  }

  // Cleanup
  static cleanup() {
    this.pollingIntervals.forEach(interval => clearInterval(interval))
    this.pollingIntervals.clear()
    this.subscribers.clear()
    this.cache.clear()
  }
}

// Enhanced calculation service with real-time data integration
export class EnhancedRealTimeCalculationService {
  static async calculateWithRealTimeData(vendorIds: string[], config: any) {
    // Get real-time updates
    const [pricingUpdates, securityAlerts, complianceUpdates, marketIntel] = await Promise.all([
      RealTimeDataService.getPricingUpdates(vendorIds),
      RealTimeDataService.getSecurityAlerts(vendorIds),
      RealTimeDataService.getComplianceUpdates(vendorIds),
      RealTimeDataService.getMarketIntelligence(vendorIds)
    ])

    // Apply real-time adjustments to calculations
    const adjustedResults = vendorIds.map(vendorId => {
      const pricingUpdate = pricingUpdates.find(p => p.vendorId === vendorId)
      const securityAlert = securityAlerts.filter(a => a.vendorId === vendorId)
      const complianceUpdate = complianceUpdates.filter(c => c.vendorId === vendorId)
      const marketData = marketIntel.filter(m => m.vendor === vendorId)

      return {
        vendorId,
        realTimePricing: pricingUpdate,
        securityAlerts: securityAlert,
        complianceStatus: complianceUpdate,
        marketIntelligence: marketData,
        lastUpdated: new Date().toISOString()
      }
    })

    return adjustedResults
  }

  static startRealTimeMonitoring(vendorIds: string[], onUpdate: (data: any) => void) {
    const unsubscribers: (() => void)[] = []

    // Subscribe to all data types
    unsubscribers.push(
      RealTimeDataService.subscribeToUpdates('pricing', (data) => {
        onUpdate({ type: 'pricing', data, timestamp: new Date().toISOString() })
      })
    )

    unsubscribers.push(
      RealTimeDataService.subscribeToUpdates('security', (data) => {
        onUpdate({ type: 'security', data, timestamp: new Date().toISOString() })
      })
    )

    unsubscribers.push(
      RealTimeDataService.subscribeToUpdates('compliance', (data) => {
        onUpdate({ type: 'compliance', data, timestamp: new Date().toISOString() })
      })
    )

    unsubscribers.push(
      RealTimeDataService.subscribeToUpdates('market', (data) => {
        onUpdate({ type: 'market', data, timestamp: new Date().toISOString() })
      })
    )

    // Return cleanup function
    return () => {
      unsubscribers.forEach(unsub => unsub())
    }
  }
}