"use client"

import { useCallback } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  allVendorsData,
  getVendorDataById,
  VENDOR_IDS_DEFINITIVE,
  type VendorId,
  type NewVendorData,
} from "@/lib/vendors/data"

// Simulate async data fetching for now, TanStack Query expects a promise
const fetchAllVendors = async (): Promise<Map<VendorId, NewVendorData>> => {
  // In a real app, this might be an API call
  // For now, just return the imported map after a slight delay
  await new Promise((resolve) => setTimeout(resolve, 100)) // Simulate network delay
  return allVendorsData
}

const fetchVendorById = async (id: VendorId): Promise<NewVendorData | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return getVendorDataById(id)
}

export function useVendorData() {
  const {
    data: vendorsMap,
    isLoading: isLoadingAllVendors,
    error: errorAllVendors,
  } = useQuery<Map<VendorId, NewVendorData>, Error>({
    queryKey: ["allVendors"],
    queryFn: fetchAllVendors,
    staleTime: Number.POSITIVE_INFINITY, // Data is static for this app version
  })

  const getVendor = useCallback(
    (id: VendorId): NewVendorData | undefined => {
      return vendorsMap?.get(id)
    },
    [vendorsMap],
  )

  const getAllVendorIds = useCallback((): readonly VendorId[] => {
    return VENDOR_IDS_DEFINITIVE
  }, [])

  const getAllVendorsList = useCallback((): NewVendorData[] => {
    return vendorsMap ? Array.from(vendorsMap.values()) : []
  }, [vendorsMap])

  // Hook for a single vendor, could be useful for detail pages
  const useSingleVendor = (id: VendorId | null) => {
    return useQuery<NewVendorData | undefined, Error>({
      queryKey: ["vendor", id],
      queryFn: () => (id ? fetchVendorById(id) : Promise.resolve(undefined)),
      enabled: !!id, // Only run query if id is provided
      staleTime: Number.POSITIVE_INFINITY,
    })
  }

  return {
    vendorsMap,
    isLoadingAllVendors,
    errorAllVendors,
    getVendor,
    getAllVendorIds,
    getAllVendorsList,
    useSingleVendor, // Expose the single vendor query hook
  }
}

export type { VendorId }
