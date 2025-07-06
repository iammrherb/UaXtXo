"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { vendorDatabase, getVendorLogoPath, type VendorData } from "@/lib/comprehensive-vendor-data"
import { cn } from "@/lib/utils"
import {
  Search,
  Star,
  Zap,
  Building,
  Cloud,
  Server,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Trash2,
  RotateCcw,
} from "lucide-react"

interface EnhancedVendorSelectionProps {
  selectedVendors: string[]
  handleVendorToggle: (vendorId: string) => void
  darkMode: boolean
  onClearAll: () => void
  onSelectRecommended: () => void
}

const VENDOR_CATEGORIES = {
  enterprise: {
    label: "Enterprise Solutions",
    icon: <Building className="h-4 w-4" />,
    vendors: ["portnox", "cisco", "aruba", "fortinet", "microsoft"],
  },
  cloud: {
    label: "Cloud-First",
    icon: <Cloud className="h-4 w-4" />,
    vendors: ["securew2", "foxpass", "radiusaas"],
  },
  specialized: {
    label: "Specialized",
    icon: <Zap className="h-4 w-4" />,
    vendors: ["pulse", "packetfence", "forescout"],
  },
  alternative: {
    label: "Alternatives",
    icon: <Server className="h-4 w-4" />,
    vendors: ["no-nac"],
  },
}

export default function EnhancedVendorSelection({
  selectedVendors,
  handleVendorToggle,
  darkMode,
  onClearAll,
  onSelectRecommended,
}: EnhancedVendorSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredVendors = useMemo(() => {
    let vendors = Object.entries(vendorDatabase)

    // Filter by category
    if (activeCategory !== "all") {
      const categoryVendors = VENDOR_CATEGORIES[activeCategory as keyof typeof VENDOR_CATEGORIES]?.vendors || []
      vendors = vendors.filter(([id]) => categoryVendors.includes(id))
    }

    // Filter by search term
    if (searchTerm) {
      vendors = vendors.filter(
        ([id, vendor]) =>
          vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vendor.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    return vendors
  }, [searchTerm, activeCategory])

  const getRiskColor = (riskScore: number) => {
    if (riskScore <= 3) return "text-green-600"
    if (riskScore <= 6) return "text-yellow-600"
    return "text-red-600"
  }

  const getRiskIcon = (riskScore: number) => {
    if (riskScore <= 3) return <CheckCircle className="h-4 w-4" />
    if (riskScore <= 6) return <AlertTriangle className="h-4 w-4" />
    return <XCircle className="h-4 w-4" />
  }

  const VendorCard = ({ vendorId, vendor }: { vendorId: string; vendor: VendorData }) => {
    const isSelected = selectedVendors.includes(vendorId)
    const isPortnox = vendorId === "portnox"

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card
          className={cn(
            "cursor-pointer transition-all duration-200 hover:shadow-lg",
            isSelected && "ring-2 ring-primary shadow-lg",
            isPortnox && "border-primary/50 bg-primary/5",
          )}
          onClick={() => handleVendorToggle(vendorId)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src={getVendorLogoPath(vendorId) || "/placeholder.svg"}
                    alt={`${vendor.name} logo`}
                    width={40}
                    height={40}
                    className="rounded-lg object-contain"
                  />
                  {isPortnox && (
                    <div className="absolute -top-1 -right-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    </div>
                  )}
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">{vendor.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{vendor.category}</p>
                </div>
              </div>
              {isSelected && <CheckCircle className="h-5 w-5 text-primary" />}
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{vendor.description}</p>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Risk Score</span>
                <div className={cn("flex items-center space-x-1", getRiskColor(vendor.riskScore))}>
                  {getRiskIcon(vendor.riskScore)}
                  <span className="text-xs font-semibold">{vendor.riskScore}/10</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Complexity</span>
                <Badge variant="outline" className="text-xs">
                  {vendor.complexity}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Scalability</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3 w-3",
                        i <= (vendor.scalability === "high" ? 5 : vendor.scalability === "medium" ? 3 : 1)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300",
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Satisfaction</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs font-semibold">{vendor.customerSatisfaction}/5</span>
                </div>
              </div>
            </div>

            {vendor.pricing && (
              <div className="mt-3 pt-3 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">Starting at</span>
                  <span className="text-xs font-bold text-primary">
                    ${vendor.pricing.basePrice}/{vendor.pricing.model.replace("_", " ")}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Vendor Selection</CardTitle>
          <Badge variant="secondary">{selectedVendors.length} selected</Badge>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClearAll}
              className="flex items-center space-x-1 bg-transparent"
            >
              <Trash2 className="h-3 w-3" />
              <span>Clear</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onSelectRecommended}
              className="flex items-center space-x-1 bg-transparent"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Recommended</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="all" className="text-xs">
              All
            </TabsTrigger>
            <TabsTrigger value="enterprise" className="text-xs">
              Enterprise
            </TabsTrigger>
          </TabsList>

          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            <AnimatePresence>
              {filteredVendors.map(([vendorId, vendor]) => (
                <VendorCard key={vendorId} vendorId={vendorId} vendor={vendor} />
              ))}
            </AnimatePresence>
          </div>

          {filteredVendors.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No vendors found</p>
            </div>
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}
