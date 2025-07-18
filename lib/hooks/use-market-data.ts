"use client"

import { useState, useEffect } from "react"

export interface MarketAlert {
  id: number
  type: "security" | "pricing" | "market" | "regulatory"
  severity: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  timestamp: Date
  vendor: string
  read: boolean
  impact?: string
  source?: string
  recommendation?: string
  effectiveDate?: string
  affectedVersions?: string
  regions?: string
}

export interface MarketMetrics {
  nacMarketSize: number
  growthRate: number
  portnoxMarketShare: number
  portnoxGrowth: number
  threatLevel: string
  avgPriceChange: number
  customerSatisfaction: number
}

export function useMarketAlerts() {
  const [alerts, setAlerts] = useState<MarketAlert[]>([
    {
      id: 1,
      type: "security",
      severity: "critical",
      title: "Critical CVE-2024-0001 discovered in Cisco ISE",
      description:
        "Remote code execution vulnerability affects ISE versions 3.1 and earlier. CISA has added this to the Known Exploited Vulnerabilities catalog with active exploitation reported.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      vendor: "cisco",
      read: false,
      impact: "High",
      source: "CISA KEV Catalog",
      recommendation: "Apply security patch immediately. Implement network segmentation as temporary mitigation.",
      affectedVersions: "ISE 3.1 and earlier",
    },
    {
      id: 2,
      type: "pricing",
      severity: "medium",
      title: "Aruba ClearPass announces 15% price increase for 2024",
      description:
        "HPE Aruba Networks has announced a 15% price increase across all ClearPass licensing tiers, effective Q2 2024. This affects both new purchases and renewals.",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      vendor: "aruba",
      read: false,
      impact: "Medium",
      source: "HPE Aruba Official Announcement",
      recommendation:
        "Evaluate alternative solutions before renewal. Consider multi-year agreements to lock in current pricing.",
      effectiveDate: "Q2 2024",
    },
    {
      id: 3,
      type: "market",
      severity: "low",
      title: "Portnox expands European data center presence",
      description:
        "Portnox has launched new data centers in Frankfurt, Germany and Amsterdam, Netherlands to improve latency and data sovereignty for European customers.",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      vendor: "portnox",
      read: true,
      impact: "Positive",
      source: "Portnox Press Release",
      recommendation: "European customers should evaluate migration to regional data centers for improved performance.",
      regions: "Germany, Netherlands",
    },
    {
      id: 4,
      type: "regulatory",
      severity: "high",
      title: "EU NIS2 Directive mandates enhanced NAC for critical infrastructure",
      description:
        "The Network and Information Security Directive 2 (NIS2) requires critical infrastructure operators to implement enhanced network access controls by October 2024.",
      timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
      vendor: "all",
      read: false,
      impact: "High",
      source: "European Commission",
      recommendation:
        "Review current NAC capabilities against NIS2 requirements. Plan compliance implementation timeline.",
      effectiveDate: "October 2024",
    },
    {
      id: 5,
      type: "security",
      severity: "critical",
      title: "Ivanti Pulse Secure under active nation-state attack",
      description:
        "Multiple nation-state actors are actively exploiting zero-day vulnerabilities in Ivanti Pulse Secure appliances. CISA recommends immediate disconnection from networks.",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      vendor: "ivanti",
      read: false,
      impact: "Critical",
      source: "CISA Emergency Directive",
      recommendation:
        "Immediately disconnect Pulse Secure appliances. Plan emergency migration to alternative NAC solution.",
      affectedVersions: "All versions",
    },
    {
      id: 6,
      type: "market",
      severity: "medium",
      title: "Gartner positions cloud-native NAC as market leader",
      description:
        "Latest Gartner Magic Quadrant shows significant shift toward cloud-native NAC solutions, with traditional on-premise vendors losing market share.",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      vendor: "all",
      read: false,
      impact: "Medium",
      source: "Gartner Magic Quadrant",
      recommendation: "Evaluate cloud-native alternatives for next NAC refresh cycle.",
    },
  ])

  const unreadCount = alerts.filter((alert) => !alert.read).length

  const markAsRead = (alertId: number) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, read: true } : alert)))
  }

  const markAllAsRead = () => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, read: true })))
  }

  // Simulate new alerts
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        // 15% chance every 2 minutes
        const alertTypes = ["security", "pricing", "market", "regulatory"] as const
        const severities = ["low", "medium", "high", "critical"] as const
        const vendors = ["cisco", "aruba", "portnox", "forescout", "fortinet", "all"]

        const newAlert: MarketAlert = {
          id: Date.now(),
          type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
          severity: severities[Math.floor(Math.random() * severities.length)],
          title: "New market development detected",
          description:
            "AI-generated market intelligence update based on real-time monitoring of vendor announcements, security advisories, and industry reports.",
          timestamp: new Date(),
          vendor: vendors[Math.floor(Math.random() * vendors.length)],
          read: false,
          impact: "Medium",
          source: "AI Market Analysis Engine",
          recommendation: "Monitor situation closely and assess potential impact on your NAC strategy.",
        }
        setAlerts((prev) => [newAlert, ...prev.slice(0, 19)]) // Keep only 20 most recent
      }
    }, 120000) // Check every 2 minutes

    return () => clearInterval(interval)
  }, [])

  return {
    alerts,
    unreadCount,
    markAsRead,
    markAllAsRead,
  }
}

export function useMarketData(): MarketMetrics {
  const [metrics, setMetrics] = useState<MarketMetrics>({
    nacMarketSize: 2.8,
    growthRate: 12.5,
    portnoxMarketShare: 8.7,
    portnoxGrowth: 45.2,
    threatLevel: "Medium",
    avgPriceChange: -8.3,
    customerSatisfaction: 94,
  })

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        portnoxMarketShare: Math.max(0, Math.min(15, prev.portnoxMarketShare + (Math.random() - 0.5) * 0.1)),
        portnoxGrowth: Math.max(30, Math.min(60, prev.portnoxGrowth + (Math.random() - 0.5) * 0.5)),
        customerSatisfaction: Math.max(90, Math.min(98, prev.customerSatisfaction + (Math.random() - 0.5) * 0.2)),
        nacMarketSize: Math.max(2.5, Math.min(3.2, prev.nacMarketSize + (Math.random() - 0.5) * 0.05)),
      }))
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return metrics
}
