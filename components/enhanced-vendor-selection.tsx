"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getVendorData, getVendorLogoPath } from "@/lib/comprehensive-vendor-data"
import type { CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import {
  Building2,
  Users,
  Shield,
  Zap,
  Star,
  TrendingUp,
  Calculator,
  CheckCircle2,
  AlertCircle,
  Info,
} from "lucide-react"
import Image from "next/image"

interface VendorCategory {
  [category: string]: string[]
}

const VENDOR_CATEGORIES: VendorCategory = {
  "Cloud-Native Leaders": ["portnox", "fortinet", "aruba", "securew2"],
  "Enterprise Solutions": ["cisco", "microsoft", "pulse"],
  "Specialized & Niche": ["foxpass", "extreme", "juniper", "forescout", "meraki", "packetfence"],
}

interface VendorSelectionProps {
  selectedVendors: string[]
  onVendorToggle: (vendorId: string) => void
  onCalculate: () => void
  configuration: CalculationConfiguration
}

const EnhancedVendorSelection: React.FC<VendorSelectionProps> = ({
  selectedVendors,
  onVendorToggle,
  onCalculate,
  configuration,
}) => {
  const isPrimary = (vendorId: string) => vendorId === "portnox"

  const getVendorInfo = (vendorId: string) => {
    const vendor = getVendorData(vendorId)
    return (
      vendor || {
        name: vendorId,
        description: "Vendor information not available",
        marketPosition: "Unknown",
        strengths: [],
        weaknesses: [],
      }
    )
  }

  const getVendorStats = (vendorId: string) => {
    const vendor = getVendorInfo(vendorId)
    return {
      marketShare: Math.random() * 20 + 5, // Simulated data
      customerSat: Math.random() * 2 + 3, // 3-5 rating
      deploymentTime: Math.floor(Math.random() * 8 + 2), // 2-10 weeks
      supportRating: Math.random() * 2 + 3, // 3-5 rating
    }
  }

  const VendorCard = ({ vendorId, category }: { vendorId: string; category: string }) => {
    const vendor = getVendorInfo(vendorId)
    const stats = getVendorStats(vendorId)
    const isSelected = selectedVendors.includes(vendorId)
    const logoPath = getVendorLogoPath(vendorId)

    return (
      <Card
        className={`transition-all duration-200 hover:shadow-md cursor-pointer ${
          isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
        } ${isPrimary(vendorId) ? "border-primary/50" : ""}`}
        onClick={() => onVendorToggle(vendorId)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src={logoPath || "/placeholder.svg"}
                  alt={`${vendor.name} logo`}
                  width={40}
                  height={40}
                  className="rounded-lg object-contain bg-white p-1"
                />
                {isPrimary(vendorId) && (
                  <Star className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500 fill-current" />
                )}
              </div>
              <div>
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  {vendor.name}
                  {isPrimary(vendorId) && (
                    <Badge variant="secondary" className="text-xs">
                      Primary
                    </Badge>
                  )}
                </h4>
                <p className="text-xs text-muted-foreground">{category}</p>
              </div>
            </div>
            <Checkbox checked={isSelected} onChange={() => onVendorToggle(vendorId)} className="mt-1" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span>{stats.marketShare.toFixed(1)}% share</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-blue-600" />
              <span>{stats.customerSat.toFixed(1)}/5 rating</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-orange-600" />
              <span>{stats.deploymentTime}w deploy</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-purple-600" />
              <span>{stats.supportRating.toFixed(1)}/5 support</span>
            </div>
          </div>

          {vendor.strengths && vendor.strengths.length > 0 && (
            <div className="mt-3 pt-2 border-t">
              <div className="flex flex-wrap gap-1">
                {vendor.strengths.slice(0, 2).map((strength, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {strength}
                  </Badge>
                ))}
                {vendor.strengths.length > 2 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="outline" className="text-xs">
                          +{vendor.strengths.length - 2} more
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="max-w-xs">{vendor.strengths.slice(2).join(", ")}</div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  const SelectionSummary = () => (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Selection Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{selectedVendors.length}</div>
            <div className="text-sm text-muted-foreground">Vendors Selected</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{configuration.devices}</div>
            <div className="text-sm text-muted-foreground">Devices</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{configuration.users}</div>
            <div className="text-sm text-muted-foreground">Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{configuration.years}</div>
            <div className="text-sm text-muted-foreground">Years</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {selectedVendors.length > 0 ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Ready for analysis
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-orange-600" />
                Select vendors to begin
              </>
            )}
          </div>
          <Button onClick={onCalculate} disabled={selectedVendors.length === 0} size="sm">
            <Calculator className="h-4 w-4 mr-2" />
            Calculate TCO
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <SelectionSummary />

      <div className="space-y-6">
        {Object.entries(VENDOR_CATEGORIES).map(([category, vendors]) => (
          <Card key={category}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                {category}
                <Badge variant="secondary" className="ml-auto">
                  {vendors.filter((v) => selectedVendors.includes(v)).length}/{vendors.length} selected
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vendors.map((vendorId) => (
                  <VendorCard key={vendorId} vendorId={vendorId} category={category} />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium mb-1">Selection Tips:</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• Portnox is marked as the primary vendor for comparison</li>
                <li>• Select 3-5 vendors for optimal comparison analysis</li>
                <li>• Cloud-native solutions typically offer faster deployment</li>
                <li>• Enterprise solutions provide comprehensive feature sets</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EnhancedVendorSelection
