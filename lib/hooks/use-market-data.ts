"use client"

import { useState, useEffect, useCallback } from "react"
import {
  marketDataService,
  type MarketMetrics,
  type VendorMarketData,
  type MarketAlert,
} from "@/lib/services/market-data-service"

export interface UseMarketDataOptions {
  autoRefresh?: boolean
  refreshInterval?: number
}

export function useMarketData(options: UseMarketDataOptions = {}) {
  const [marketMetrics, setMarketMetrics] = useState<MarketMetrics | null>(null)
  const [vendorData, setVendorData] = useState<VendorMarketData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    setIsLoading(true)

    const unsubscribe = marketDataService.subscribe((data) => {
      try {
        setMarketMetrics(data.marketMetrics)
        setVendorData(data.vendorData)
        setIsConnected(true)
        setError(null)
        setLastUpdated(new Date())
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update market data")
        setIsConnected(false)
      } finally {
        setIsLoading(false)
      }
    })

    return unsubscribe
  }, [])

  const refresh = useCallback(() => {
    setIsLoading(true)
    // Market data service will automatically provide fresh data
  }, [])

  return {
    marketMetrics,
    vendorData,
    isLoading,
    error,
    isConnected,
    lastUpdated,
    refresh,
  }
}

export function useMarketAlerts() {
  const [alerts, setAlerts] = useState<MarketAlert[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const unsubscribe = marketDataService.subscribe((data) => {
      if (data.alerts) {
        setAlerts((prev) => {
          const newAlerts = data.alerts.filter(
            (alert: MarketAlert) => !prev.some((existing) => existing.id === alert.id),
          )
          return [...prev, ...newAlerts].slice(-50) // Keep last 50 alerts
        })
      }
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    setUnreadCount(alerts.filter((alert) => !alert.read).length)
  }, [alerts])

  const markAsRead = useCallback((alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, read: true } : alert)))
  }, [])

  const dismiss = useCallback((alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
  }, [])

  const dismissAll = useCallback(() => {
    setAlerts([])
  }, [])

  const criticalAlerts = alerts.filter((alert) => alert.severity === "critical" && !alert.read)

  return {
    alerts,
    unreadCount,
    criticalAlerts,
    markAsRead,
    dismiss,
    dismissAll,
  }
}

export function useLiveMarketData() {
  const [liveData, setLiveData] = useState<MarketMetrics | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    const unsubscribe = marketDataService.subscribe((data) => {
      setLiveData(data.marketMetrics)
      setLastUpdated(new Date())
    })

    return unsubscribe
  }, [])

  return {
    liveData,
    lastUpdated,
  }
}
