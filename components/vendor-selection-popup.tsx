"use client"

import { useState, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Info, AlertTriangle, CheckCircle2, Users } from "lucide-react"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { AllVendorData } from "@/lib/vendor-data"

interface VendorSelectionPopupProps {
  selectedVendors: string[]
  onVendorChange: (vendors: string[]) => void
}

export function VendorSelectionPopup({ selectedVendors, onVendorChange }: VendorSelectionPopupProps) {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedVendors, setExpandedVendors] = useState<Set<string>>(new Set())

  const vendors = useMemo(() => {
    return Object.entries(AllVendorData).map(([id, data]) => ({
      id,
      ...data,
      category: getVendorCategory(id),
      securityScore: getSecurityScore(id),
      cveCount: getCVECount(id),
    }))
  }, [])

  const filteredVendors = useMemo(() => {
    return vendors.filter(
      (vendor) =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.description?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [vendors, searchTerm])

  const handleVendorToggle = (vendorId: string, checked: boolean) => {
    if (vendorId === "portnox") return // Portnox cannot be deselected

    let newSelection = [...selectedVendors]

    if (checked) {
      if (newSelection.length < 3) {
        newSelection.push(vendorId)
      }
    } else {
      newSelection = newSelection.filter((id) => id !== vendorId)
    }

    onVendorChange(newSelection)
  }

  const toggleExpanded = (vendorId: string) => {
    const newExpanded = new Set(expandedVendors)
    if (newExpanded.has(vendorId)) {
      newExpanded.delete(vendorId)
    } else {
      newExpanded.add(vendorId)
    }
    setExpandedVendors(newExpanded)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "recommended":
        return "bg-green-100 text-green-800 border-green-200"
      case "acceptable":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "caution":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "avoid":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Users className="h-4 w-4" />
          Select Vendors ({selectedVendors.length}/3)
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Select NAC Vendors for Comparison</DialogTitle>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Compare up to 3 vendors (Portnox CLEAR is required)</p>
            <Badge variant="secondary">Selected: {selectedVendors.length}/3</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="overflow-y-auto max-h-[60vh] pr-2">
            <div className="grid gap-4 md:grid-cols-2">
              {filteredVendors.map((vendor) => {
                const isSelected = selectedVendors.includes(vendor.id)
                const isPortnox = vendor.id === "portnox"
                const isDisabled = !isSelected && selectedVendors.length >= 3
                const isExpanded = expandedVendors.has(vendor.id)

                return (
                  <Card
                    key={vendor.id}
                    className={`transition-all ${
                      isSelected ? "ring-2 ring-primary" : ""
                    } ${isDisabled ? "opacity-50" : ""}`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={(checked) => handleVendorToggle(vendor.id, checked as boolean)}
                            disabled={isPortnox || isDisabled}
                          />
                          <div>
                            <CardTitle className="text-base">{vendor.name}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getCategoryColor(vendor.category)}>{vendor.category}</Badge>
                              {isPortnox && <Badge variant="default">Required</Badge>}
                              {vendor.cveCount > 0 && (
                                <Badge variant="destructive" className="gap-1">
                                  <AlertTriangle className="h-3 w-3" />
                                  {vendor.cveCount} CVEs
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => toggleExpanded(vendor.id)}>
                          <Info className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground line-clamp-2">{vendor.description}</p>

                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="font-medium">Pricing:</span>
                            <br />
                            <span className="text-muted-foreground">
                              {vendor.pricing?.perDevice?.monthly
                                ? `$${vendor.pricing.perDevice.monthly * 12}/device/year`
                                : "Quote-based"}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Deployment:</span>
                            <br />
                            <span className="text-muted-foreground">{getDeploymentTime(vendor.id)}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-medium">Security:</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <CheckCircle2
                                  key={i}
                                  className={`h-3 w-3 ${i < vendor.securityScore ? "text-green-500" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {vendor.marketShare ? `${vendor.marketShare}% market` : ""}
                          </span>
                        </div>

                        <Collapsible open={isExpanded}>
                          <CollapsibleContent className="space-y-2">
                            <div className="border-t pt-2 mt-2">
                              <div className="grid gap-2 text-xs">
                                <div>
                                  <span className="font-medium text-green-600">Pros:</span>
                                  <ul className="list-disc list-inside text-muted-foreground ml-2">
                                    {getVendorPros(vendor.id).map((pro, i) => (
                                      <li key={i}>{pro}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <span className="font-medium text-red-600">Cons:</span>
                                  <ul className="list-disc list-inside text-muted-foreground ml-2">
                                    {getVendorCons(vendor.id).map((con, i) => (
                                      <li key={i}>{con}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              {selectedVendors.length === 3
                ? "Maximum vendors selected"
                : `${3 - selectedVendors.length} more vendors can be selected`}
            </p>
            <Button onClick={() => setOpen(false)}>Done</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function getVendorCategory(vendorId: string): string {
  const categories: Record<string, string> = {
    portnox: "recommended",
    aruba: "acceptable",
    forescout: "acceptable",
    cisco: "acceptable",
    extreme: "acceptable",
    juniper: "acceptable",
    fortinet: "acceptable",
    arista: "acceptable",
    foxpass: "caution",
    securew2: "caution",
    microsoft: "caution",
    meraki: "caution",
    packetfence: "caution",
    ivanti: "avoid",
  }
  return categories[vendorId] || "acceptable"
}

function getSecurityScore(vendorId: string): number {
  const scores: Record<string, number> = {
    portnox: 5,
    aruba: 4,
    forescout: 4,
    cisco: 3,
    extreme: 4,
    juniper: 4,
    fortinet: 3,
    arista: 4,
    foxpass: 3,
    securew2: 3,
    microsoft: 2,
    meraki: 3,
    packetfence: 2,
    ivanti: 1,
  }
  return scores[vendorId] || 3
}

function getCVECount(vendorId: string): number {
  const cves: Record<string, number> = {
    cisco: 47,
    ivanti: 23,
    fortinet: 15,
    microsoft: 8,
    aruba: 3,
    juniper: 2,
    portnox: 0,
  }
  return cves[vendorId] || 0
}

function getDeploymentTime(vendorId: string): string {
  const times: Record<string, string> = {
    portnox: "30 minutes",
    foxpass: "1-2 days",
    securew2: "1-2 weeks",
    aruba: "3-6 months",
    forescout: "2-4 months",
    cisco: "6-9 months",
    extreme: "2-3 months",
    juniper: "1-3 months",
    fortinet: "3-6 months",
    arista: "2-4 months",
    microsoft: "1-2 months",
    meraki: "1-2 months",
    packetfence: "4-8 months",
    ivanti: "6-12 months",
  }
  return times[vendorId] || "3-6 months"
}

function getVendorPros(vendorId: string): string[] {
  const pros: Record<string, string[]> = {
    portnox: [
      "Zero infrastructure required",
      "30-minute deployment",
      "95% Zero Trust maturity",
      "No CVEs since inception",
      "70% lower TCO",
    ],
    cisco: ["Market leader", "Comprehensive features", "Strong ecosystem"],
    aruba: ["Best traditional NAC value", "High customer satisfaction", "Flexible deployment"],
    forescout: ["Excellent IoT/OT support", "20M+ device fingerprints", "Agentless discovery"],
    meraki: ["Cloud-managed", "Simple dashboard", "Good for existing Meraki customers"],
    extreme: ["Flexible deployment", "Good pricing", "Cloud options"],
    juniper: ["AI-driven", "Cloud-native", "Good analytics"],
    fortinet: ["Firewall integration", "Security fabric", "Good performance"],
    arista: ["Cloud-first", "Good analytics", "Modern UI"],
    microsoft: ["Free", "Windows integration", "Simple setup"],
    foxpass: ["Simple setup", "Cloud-based", "Low cost"],
    securew2: ["PKI expertise", "Certificate management", "Good support"],
    packetfence: ["Open source", "Customizable", "No licensing fees"],
  }
  return pros[vendorId] || ["Established vendor", "Industry presence"]
}

function getVendorCons(vendorId: string): string[] {
  const cons: Record<string, string[]> = {
    cisco: ["Complex licensing", "6-9 month deployment", "High TCO", "47 CVEs in 3 years"],
    aruba: ["Perpetual licensing model", "Hardware dependencies", "3-6 month deployment"],
    ivanti: ["Active nation-state exploitation", "23 critical CVEs", "End of life approaching"],
    meraki: ["Requires Meraki hardware", "Limited advanced features", "Vendor lock-in"],
    forescout: ["Complex deployment", "High maintenance", "Limited WiFi support"],
    extreme: ["Limited features", "Smaller ecosystem", "Market presence"],
    juniper: ["Requires Mist ecosystem", "Limited standalone", "Newer solution"],
    fortinet: ["Requires FortiGate", "Complex setup", "Vendor lock-in"],
    arista: ["Requires Arista switches", "Limited market", "Niche solution"],
    microsoft: ["Basic RADIUS only", "No advanced features", "Limited scalability"],
    foxpass: ["Limited NAC features", "No device profiling", "Basic functionality"],
    securew2: ["Limited to WiFi/PKI", "No wired NAC", "Premium pricing"],
    packetfence: ["Requires expertise", "Complex setup", "Limited support"],
  }
  return cons[vendorId] || ["Traditional deployment complexity", "Higher TCO than cloud solutions"]
}
