"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ChevronDown, Building2, CheckCircle2, AlertTriangle, Award, Cloud, Server, Grid as Hybrid, Info, X } from "lucide-react"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"
import { motion, AnimatePresence } from "framer-motion"

interface VendorSelectorProps {
  selectedVendors: string[]
  onVendorChange: (vendors: string[]) => void
  maxVendors?: number
}

const DEPLOYMENT_ICONS = {
  cloud: Cloud,
  "on-premise": Server,
  hybrid: Hybrid
}

const CATEGORY_COLORS = {
  leader: "bg-yellow-100 text-yellow-800 border-yellow-300",
  challenger: "bg-blue-100 text-blue-800 border-blue-300", 
  visionary: "bg-purple-100 text-purple-800 border-purple-300",
  niche: "bg-gray-100 text-gray-800 border-gray-300"
}

export default function VendorSelector({ 
  selectedVendors, 
  onVendorChange, 
  maxVendors = 3 
}: VendorSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const vendors = Object.values(ComprehensiveVendorDatabase)
  const selectedVendorData = selectedVendors.map(id => ComprehensiveVendorDatabase[id]).filter(Boolean)
  
  const handleVendorToggle = (vendorId: string) => {
    if (vendorId === "portnox") return // Portnox always selected
    
    if (selectedVendors.includes(vendorId)) {
      onVendorChange(selectedVendors.filter(id => id !== vendorId))
    } else if (selectedVendors.length < maxVendors) {
      onVendorChange([...selectedVendors, vendorId])
    }
  }

  const getVendorStatus = (vendor: any) => {
    if (vendor.id === "portnox") {
      return { type: "recommended", icon: Award, color: "text-green-600", message: "Recommended Solution" }
    }
    if (vendor.id === "ivanti_neurons") {
      return { type: "critical", icon: AlertTriangle, color: "text-red-600", message: "Security Risk - Migration Required" }
    }
    if (vendor.security.cveCount === 0) {
      return { type: "secure", icon: CheckCircle2, color: "text-blue-600", message: "Zero CVE Record" }
    }
    if (vendor.security.cveCount > 20) {
      return { type: "warning", icon: AlertTriangle, color: "text-orange-600", message: "High CVE Count" }
    }
    return { type: "standard", icon: Building2, color: "text-gray-600", message: "Standard Option" }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Building2 className="h-5 w-5 text-muted-foreground" />
        <span className="font-medium">Compare Vendors:</span>
      </div>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="min-w-[200px] justify-between"
            disabled={selectedVendors.length === 0}
          >
            <span>
              {selectedVendors.length === 0 
                ? "Select vendors to compare" 
                : `${selectedVendors.length} vendor${selectedVendors.length > 1 ? 's' : ''} selected`
              }
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        
        <PopoverContent className="w-96 p-0" align="start">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-lg">Select Vendors to Compare</h3>
            <p className="text-sm text-muted-foreground">
              Choose up to {maxVendors} vendors for analysis. Portnox is always included.
            </p>
          </div>

          <div className="max-h-96 overflow-y-auto">
            <div className="p-2 space-y-2">
              {vendors.map((vendor) => {
                const isSelected = selectedVendors.includes(vendor.id)
                const isPortnox = vendor.id === "portnox"
                const canSelect = isSelected || selectedVendors.length < maxVendors || isPortnox
                const status = getVendorStatus(vendor)
                const DeploymentIcon = DEPLOYMENT_ICONS[vendor.deploymentType]

                return (
                  <motion.div
                    key={vendor.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                      isSelected 
                        ? "border-primary bg-primary/5" 
                        : canSelect 
                          ? "border-gray-200 hover:border-gray-300" 
                          : "border-gray-100 opacity-50 cursor-not-allowed"
                    } ${isPortnox ? "border-green-300 bg-green-50" : ""}`}
                    onClick={() => canSelect && handleVendorToggle(vendor.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Checkbox 
                          checked={isSelected}
                          disabled={!canSelect || isPortnox}
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm truncate">{vendor.name}</h4>
                            {isPortnox && (
                              <Badge className="bg-green-600 text-white text-xs">
                                <Award className="w-3 h-3 mr-1" />
                                Default
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${CATEGORY_COLORS[vendor.category]}`}
                            >
                              {vendor.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs flex items-center gap-1">
                              <DeploymentIcon className="w-3 h-3" />
                              {vendor.deploymentType}
                            </Badge>
                          </div>

                          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                            {vendor.description}
                          </p>

                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium">
                              ${vendor.pricing.pricePerDevice}/device/month
                            </span>
                            <div className={`flex items-center gap-1 ${status.color}`}>
                              <status.icon className="w-3 h-3" />
                              <span>{status.message}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <div className="p-4 border-t bg-muted/30">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {selectedVendors.length} of {maxVendors} vendors selected
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsOpen(false)}
                className="text-xs"
              >
                Done
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Selected Vendors Display */}
      <div className="flex items-center gap-2">
        <AnimatePresence>
          {selectedVendorData.map((vendor) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1"
            >
              <Badge 
                variant={vendor.id === "portnox" ? "default" : "secondary"}
                className={`flex items-center gap-1 ${
                  vendor.id === "portnox" ? "bg-green-600" : ""
                }`}
              >
                {vendor.name}
                {vendor.id !== "portnox" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-3 w-3 p-0 hover:bg-transparent ml-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleVendorToggle(vendor.id)
                    }}
                  >
                    <X className="h-2 w-2" />
                  </Button>
                )}
              </Badge>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {selectedVendors.length === maxVendors && (
        <Alert className="max-w-sm">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Maximum {maxVendors} vendors selected. Remove one to add another.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}