"use client"

import { useState, useEffect } from "react"
import type { NewVendorData, VendorId } from "@/lib/vendors/data"

export function useVendorData() {
  const [vendors, setVendors] = useState<NewVendorData[]>([])
  const [isLoadingAllVendors, setIsLoadingAllVendors] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch("/api/vendors")
        if (!response.ok) {
          throw new Error("Failed to fetch vendors")
        }
        const data = await response.json()
        setVendors(data.vendors || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
        console.error("Error fetching vendors:", err)
      } finally {
        setIsLoadingAllVendors(false)
      }
    }

    fetchVendors()
  }, [])

  const getAllVendorIds = (): VendorId[] => {
    return vendors.map((vendor) => vendor.id)
  }

  const getVendor = (id: VendorId): NewVendorData | undefined => {
    return vendors.find((vendor) => vendor.id === id)
  }

  return {
    vendors,
    getAllVendorIds,
    getVendor,
    isLoadingAllVendors,
    error,
  }
}

export type { VendorId }
