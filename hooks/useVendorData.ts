"use client"

import { useQuery } from "@tanstack/react-query"
import type { NewVendorData, VendorId } from "@/lib/vendors/data"

const fetchVendors = async (): Promise<NewVendorData[]> => {
  const response = await fetch("/api/vendors")
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

export function useVendorData() {
  const {
    data: vendors,
    isLoading,
    error,
    isSuccess,
  } = useQuery<NewVendorData[]>({
    queryKey: ["vendors"],
    queryFn: fetchVendors,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  })

  const getVendor = (id: VendorId) => {
    return vendors?.find((v) => v.id === id)
  }

  const vendorOptions =
    vendors?.map((v) => ({
      value: v.id,
      label: v.name,
      logo: v.logoUrl,
    })) || []

  return {
    vendors: vendors || [],
    vendorOptions,
    getVendor,
    isLoading,
    error,
    isSuccess,
  }
}
