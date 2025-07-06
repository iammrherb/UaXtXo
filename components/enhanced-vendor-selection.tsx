"use client"

import type React from "react"

interface VendorCategory {
  [category: string]: string[]
}

const VENDOR_CATEGORIES: VendorCategory = {
  "Cloud-Native Leaders": ["portnox", "juniper_mist", "arista", "foxpass", "securew2", "meraki"],
  "Enterprise Solutions": ["cisco_ise", "aruba_clearpass", "forescout"],
  "Specialized & Niche": ["extreme", "pulse_secure", "microsoft_nps", "packetfence"],
}

interface VendorSelectionProps {
  selectedVendors: string[]
  onVendorChange: (vendors: string[]) => void
}

const EnhancedVendorSelection: React.FC<VendorSelectionProps> = ({ selectedVendors, onVendorChange }) => {
  const isPrimary = (vendorId: string) => vendorId === "portnox"

  const handleVendorChange = (vendorId: string) => {
    let newVendors = [...selectedVendors]
    if (selectedVendors.includes(vendorId)) {
      newVendors = newVendors.filter((v) => v !== vendorId)
    } else {
      newVendors = [...newVendors, vendorId]
    }
    onVendorChange(newVendors)
  }

  return (
    <div>
      {Object.entries(VENDOR_CATEGORIES).map(([category, vendors]) => (
        <div key={category}>
          <h3>{category}</h3>
          {vendors.map((vendorId) => (
            <label key={vendorId} style={{ display: "block", marginBottom: "5px" }}>
              <input
                type="checkbox"
                value={vendorId}
                checked={selectedVendors.includes(vendorId)}
                onChange={() => handleVendorChange(vendorId)}
              />
              {vendorId}
              {isPrimary(vendorId) && (
                <span style={{ color: "green", marginLeft: "5px", fontWeight: "bold" }}>(Primary)</span>
              )}
            </label>
          ))}
        </div>
      ))}
    </div>
  )
}

export default EnhancedVendorSelection
