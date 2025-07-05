"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { vendorDatabase } from "@/lib/comprehensive-vendor-data"

interface Vendor {
  id: string
  name: string
  description: string
  category: string
  location: string
  rating: number
  contact: {
    email: string
    phone: string
  }
  servicesOffered: string[]
  pricingDetails: {
    averageCost: number
    currency: string
  }
  availability: {
    daysOfWeek: string[]
    timeSlots: string[]
  }
  images: string[]
  reviews: {
    author: string
    comment: string
    rating: number
    date: string
  }[]
}

const EnhancedVendorSelection = () => {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")

  useEffect(() => {
    setVendors(vendorDatabase)
  }, [])

  const handleVendorSelect = (vendor: Vendor) => {
    setSelectedVendor(vendor)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleCategoryFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(event.target.value)
  }

  const filteredVendors = vendors.filter((vendor) => {
    const searchMatch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
    const categoryMatch = categoryFilter === "All" || vendor.category === categoryFilter
    return searchMatch && categoryMatch
  })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Enhanced Vendor Selection</h1>

      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search vendors..."
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
          onChange={handleSearch}
        />
        <select
          className="shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleCategoryFilter}
          value={categoryFilter}
        >
          <option value="All">All Categories</option>
          {[...new Set(vendors.map((vendor) => vendor.category))].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVendors.map((vendor) => (
          <div
            key={vendor.id}
            className="bg-white shadow-md rounded-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => handleVendorSelect(vendor)}
          >
            <h2 className="text-xl font-semibold">{vendor.name}</h2>
            <p className="text-gray-600">{vendor.description.substring(0, 100)}...</p>
            <p className="text-sm text-gray-500">Category: {vendor.category}</p>
            <p className="text-sm text-gray-500">Rating: {vendor.rating}</p>
          </div>
        ))}
      </div>

      {selectedVendor && (
        <div className="mt-8 p-4 bg-gray-100 rounded-md">
          <h2 className="text-xl font-bold mb-2">{selectedVendor.name}</h2>
          <p>{selectedVendor.description}</p>
          <p>Category: {selectedVendor.category}</p>
          <p>Location: {selectedVendor.location}</p>
          <p>Rating: {selectedVendor.rating}</p>
          <p>Contact Email: {selectedVendor.contact.email}</p>
          <p>Contact Phone: {selectedVendor.contact.phone}</p>
          <h3 className="text-lg font-semibold mt-2">Services Offered:</h3>
          <ul>
            {selectedVendor.servicesOffered.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default EnhancedVendorSelection
