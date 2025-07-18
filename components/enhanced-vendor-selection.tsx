"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, XCircle, AlertTriangle, Shield, DollarSign, Clock, Users, Star, Minus, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Vendor {
  id: string
  name: string
  logo: string
  category: "recommended" | "acceptable" | "caution" | "avoid"
  pricing: {
    min: number
    max: number
    model: string
  }
  deployment: {
    time: string
    complexity: "Low" | "Medium" | "High" | "Very High"
  }
  security: {
    score: number
    cves: number
    lastIncident: string
  }
  marketShare: number
  satisfaction: number
  status: "active" | "deprecated" | "critical"
  description: string
  pros: string[]
  cons: string[]
}

const VENDORS: Vendor[] = [
  {
    id: "portnox",
    name: "Portnox CLEAR",
    logo: "/portnox-logo.png",
    category: "recommended",
    pricing: { min: 36, max: 60, model: "Per device/year" },
    deployment: { time: "1-2 days", complexity: "Low" },
    security: { score: 98, cves: 0, lastIncident: "None" },
    marketShare: 8.7,
    satisfaction: 94,
    status: "active",
    description: "Cloud-native NAC with zero infrastructure requirements",
    pros: ["Zero CVEs", "Fastest deployment", "No hardware needed", "95% Zero Trust maturity"],
    cons: ["Newer market presence", "Limited legacy integrations"],
  },
  {
    id: "cisco",
    name: "Cisco ISE",
    logo: "/cisco-logo.png",
    category: "acceptable",
    pricing: { min: 100, max: 200, model: "Per endpoint/year + HW" },
    deployment: { time: "6-9 months", complexity: "Very High" },
    security: { score: 72, cves: 47, lastIncident: "Dec 2023" },
    marketShare: 25.3,
    satisfaction: 72,
    status: "active",
    description: "Market leader with comprehensive features but complex deployment",
    pros: ["Market leader", "Feature rich", "Strong ecosystem", "Enterprise focus"],
    cons: ["Complex deployment", "High TCO", "47 CVEs in 3 years", "Requires expertise"],
  },
  {
    id: "aruba",
    name: "Aruba ClearPass",
    logo: "/aruba-logo.png",
    category: "acceptable",
    pricing: { min: 80, max: 125, model: "Perpetual license" },
    deployment: { time: "3-6 months", complexity: "High" },
    security: { score: 78, cves: 12, lastIncident: "Aug 2023" },
    marketShare: 18.2,
    satisfaction: 78,
    status: "active",
    description: "Best value traditional NAC with good performance",
    pros: ["Good value", "Reliable performance", "Strong WiFi integration", "88% satisfaction"],
    cons: ["Complex licensing", "Hardware dependency", "Long deployment", "12 CVEs"],
  },
  {
    id: "forescout",
    name: "Forescout Platform",
    logo: "/forescout-logo.png",
    category: "acceptable",
    pricing: { min: 35, max: 50, model: "Per device" },
    deployment: { time: "4-8 months", complexity: "High" },
    security: { score: 75, cves: 8, lastIncident: "Jun 2023" },
    marketShare: 12.1,
    satisfaction: 69,
    status: "active",
    description: "IoT/OT specialization with 20M+ device fingerprints",
    pros: ["IoT/OT focus", "Device visibility", "20M+ fingerprints", "Agentless"],
    cons: ["Complex deployment", "High maintenance", "Limited WiFi", "8 CVEs"],
  },
  {
    id: "extreme",
    name: "Extreme NAC",
    logo: "/extreme-logo.png",
    category: "acceptable",
    pricing: { min: 12, max: 18, model: "Per device/year" },
    deployment: { time: "2-4 months", complexity: "Medium" },
    security: { score: 73, cves: 5, lastIncident: "Mar 2023" },
    marketShare: 6.8,
    satisfaction: 71,
    status: "active",
    description: "Flexible deployment with competitive pricing",
    pros: ["Flexible deployment", "Good pricing", "Cloud options", "Decent support"],
    cons: ["Limited features", "Smaller ecosystem", "5 CVEs", "Market presence"],
  },
  {
    id: "juniper",
    name: "Juniper Mist",
    logo: "/juniper-logo.png",
    category: "acceptable",
    pricing: { min: 6, max: 12, model: "Per client/year + infra" },
    deployment: { time: "3-5 months", complexity: "Medium" },
    security: { score: 76, cves: 3, lastIncident: "Jan 2023" },
    marketShare: 4.2,
    satisfaction: 74,
    status: "active",
    description: "Cloud-native with AI, requires Mist ecosystem",
    pros: ["AI-driven", "Cloud-native", "Good analytics", "Low CVEs"],
    cons: ["Requires Mist ecosystem", "Limited standalone", "Newer solution", "Ecosystem lock-in"],
  },
  {
    id: "fortinet",
    name: "FortiNAC",
    logo: "/fortinet-logo.png",
    category: "acceptable",
    pricing: { min: 25, max: 40, model: "Quote-based" },
    deployment: { time: "3-6 months", complexity: "High" },
    security: { score: 74, cves: 9, lastIncident: "May 2023" },
    marketShare: 7.3,
    satisfaction: 68,
    status: "active",
    description: "Firewall integration with FortiGate ecosystem",
    pros: ["Firewall integration", "Security fabric", "Good performance", "Ecosystem play"],
    cons: ["Requires FortiGate", "Complex setup", "9 CVEs", "Vendor lock-in"],
  },
  {
    id: "arista",
    name: "Arista CloudVision",
    logo: "/arista-logo.png",
    category: "caution",
    pricing: { min: 15, max: 25, model: "Per switch port" },
    deployment: { time: "4-7 months", complexity: "High" },
    security: { score: 71, cves: 6, lastIncident: "Apr 2023" },
    marketShare: 2.1,
    satisfaction: 66,
    status: "active",
    description: "Requires Arista switches, cloud-first architecture",
    pros: ["Cloud-first", "Good analytics", "Arista integration", "Modern UI"],
    cons: ["Requires Arista switches", "Limited market", "6 CVEs", "Niche solution"],
  },
  {
    id: "ivanti",
    name: "Ivanti Neurons",
    logo: "/placeholder-logo.png",
    category: "avoid",
    pricing: { min: 30, max: 55, model: "Per device" },
    deployment: { time: "6-12 months", complexity: "Very High" },
    security: { score: 45, cves: 23, lastIncident: "Active exploitation" },
    marketShare: 3.8,
    satisfaction: 52,
    status: "critical",
    description: "⚠️ CRITICAL: Active nation-state exploitation",
    pros: ["Previously established", "Feature set"],
    cons: ["Active exploitation", "23 CVEs", "Nation-state attacks", "Immediate migration required"],
  },
  {
    id: "microsoft",
    name: "Microsoft NPS",
    logo: "/microsoft-logo.png",
    category: "caution",
    pricing: { min: 0, max: 0, model: "Free with Windows Server" },
    deployment: { time: "1-3 months", complexity: "Medium" },
    security: { score: 68, cves: 4, lastIncident: "Feb 2023" },
    marketShare: 15.2,
    satisfaction: 58,
    status: "active",
    description: "Basic RADIUS only, lacks modern NAC features",
    pros: ["Free", "Windows integration", "Simple setup", "Familiar interface"],
    cons: ["Basic RADIUS only", "No advanced features", "Limited scalability", "4 CVEs"],
  },
  {
    id: "foxpass",
    name: "FoxPass",
    logo: "/foxpass-logo.png",
    category: "caution",
    pricing: { min: 36, max: 48, model: "Per user/month" },
    deployment: { time: "1-2 weeks", complexity: "Low" },
    security: { score: 72, cves: 1, lastIncident: "Nov 2022" },
    marketShare: 1.2,
    satisfaction: 71,
    status: "active",
    description: "Cloud RADIUS, SMB focused, limited enterprise features",
    pros: ["Quick setup", "Cloud-based", "SMB friendly", "Low CVEs"],
    cons: ["Limited enterprise features", "WiFi/PKI only", "Small market", "Basic functionality"],
  },
  {
    id: "securew2",
    name: "SecureW2",
    logo: "/securew2-logo.png",
    category: "caution",
    pricing: { min: 120, max: 200, model: "Premium PKI pricing" },
    deployment: { time: "2-4 months", complexity: "Medium" },
    security: { score: 79, cves: 2, lastIncident: "Sep 2022" },
    marketShare: 0.8,
    satisfaction: 73,
    status: "active",
    description: "Managed PKI, premium pricing (10x competitors)",
    pros: ["Strong PKI", "Good security", "Managed service", "Low CVEs"],
    cons: ["Premium pricing (10x)", "Limited scope", "PKI focus only", "Niche market"],
  },
]

interface EnhancedVendorSelectionProps {
  selectedVendors: string[]
  onVendorToggle: (vendorId: string) => void
  onClearAll: () => void
  onSelectRecommended: () => void
  darkMode: boolean
}

export default function EnhancedVendorSelection({
  selectedVendors,
  onVendorToggle,
  onClearAll,
  onSelectRecommended,
  darkMode,
}: EnhancedVendorSelectionProps) {
  const [expandedVendor, setExpandedVendor] = useState<string | null>(null)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "recommended":
        return "border-green-600 bg-green-900/20"
      case "acceptable":
        return "border-blue-600 bg-blue-900/20"
      case "caution":
        return "border-yellow-600 bg-yellow-900/20"
      case "avoid":
        return "border-red-600 bg-red-900/20"
      default:
        return "border-gray-600 bg-gray-900/20"
    }
  }

  const getCategoryIcon = (category: string, status: string) => {
    if (status === "critical") return <AlertTriangle className="h-4 w-4 text-red-500 animate-pulse" />
    switch (category) {
      case "recommended":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "acceptable":
        return <CheckCircle2 className="h-4 w-4 text-blue-500" />
      case "caution":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "avoid":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "critical":
        return (
          <Badge variant="destructive" className="text-xs animate-pulse">
            CRITICAL
          </Badge>
        )
      case "deprecated":
        return (
          <Badge variant="secondary" className="text-xs">
            DEPRECATED
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <TooltipProvider>
      <div className="h-full flex flex-col">
        {/* Header Actions */}
        <div className="p-4 border-b border-gray-800/50 bg-black/20 backdrop-blur-sm">
          <div className="flex gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onSelectRecommended}
              className="flex-1 text-xs bg-green-900/20 border-green-700 text-green-300 hover:bg-green-800/30"
            >
              <Star className="h-3 w-3 mr-1" />
              Recommended
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onClearAll}
              className="flex-1 text-xs bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700"
            >
              Clear All
            </Button>
          </div>
          <div className="text-xs text-gray-400 text-center">
            {selectedVendors.length} of {VENDORS.length} vendors selected
          </div>
        </div>

        {/* Vendor Grid */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {VENDORS.map((vendor) => (
                <motion.div
                  key={vendor.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`relative rounded-lg border backdrop-blur-sm transition-all duration-200 ${getCategoryColor(vendor.category)} ${
                    selectedVendors.includes(vendor.id) ? "ring-2 ring-cyan-500 shadow-lg shadow-cyan-500/20" : ""
                  }`}
                >
                  <div className="p-3">
                    {/* Vendor Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Checkbox
                          checked={selectedVendors.includes(vendor.id)}
                          onCheckedChange={() => onVendorToggle(vendor.id)}
                          className="flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1">
                            {getCategoryIcon(vendor.category, vendor.status)}
                            <span className="text-xs font-medium text-gray-200 truncate">{vendor.name}</span>
                          </div>
                          {getStatusBadge(vendor.status)}
                        </div>
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                            onClick={() => setExpandedVendor(expandedVendor === vendor.id ? null : vendor.id)}
                          >
                            <Info className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View details</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-green-400" />
                        <span className="text-gray-300">
                          ${vendor.pricing.min}-{vendor.pricing.max}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-blue-400" />
                        <span className="text-gray-300">{vendor.deployment.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="h-3 w-3 text-purple-400" />
                        <span className="text-gray-300">{vendor.security.score}/100</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-orange-400" />
                        <span className="text-gray-300">{vendor.satisfaction}%</span>
                      </div>
                    </div>

                    {/* Market Share Indicator */}
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-400">Market Share</span>
                        <span className="text-gray-300">{vendor.marketShare}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(vendor.marketShare * 4, 100)}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="bg-gradient-to-r from-cyan-500 to-purple-500 h-1 rounded-full"
                        />
                      </div>
                    </div>

                    {/* CVE Warning */}
                    {vendor.security.cves > 0 && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-red-400">
                        <AlertTriangle className="h-3 w-3" />
                        <span>{vendor.security.cves} CVEs</span>
                      </div>
                    )}
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedVendor === vendor.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-700/50 bg-black/20 backdrop-blur-sm overflow-hidden"
                      >
                        <div className="p-3 space-y-3">
                          <p className="text-xs text-gray-300">{vendor.description}</p>

                          <div className="grid grid-cols-1 gap-2">
                            <div>
                              <h5 className="text-xs font-medium text-green-400 mb-1">Pros:</h5>
                              <ul className="text-xs text-gray-300 space-y-1">
                                {vendor.pros.slice(0, 2).map((pro, index) => (
                                  <li key={index} className="flex items-start gap-1">
                                    <span className="text-green-400 mt-0.5">•</span>
                                    <span>{pro}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h5 className="text-xs font-medium text-red-400 mb-1">Cons:</h5>
                              <ul className="text-xs text-gray-300 space-y-1">
                                {vendor.cons.slice(0, 2).map((con, index) => (
                                  <li key={index} className="flex items-start gap-1">
                                    <span className="text-red-400 mt-0.5">•</span>
                                    <span>{con}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <Separator className="bg-gray-700/50" />

                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-gray-400">Complexity:</span>
                              <span className="ml-1 text-gray-300">{vendor.deployment.complexity}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Last Incident:</span>
                              <span className="ml-1 text-gray-300">{vendor.security.lastIncident}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollArea>

        {/* Footer Summary */}
        <div className="p-4 border-t border-gray-800/50 bg-black/20 backdrop-blur-sm">
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="text-green-400">
              <div className="font-medium">{VENDORS.filter((v) => v.category === "recommended").length}</div>
              <div className="text-gray-400">Recommended</div>
            </div>
            <div className="text-blue-400">
              <div className="font-medium">{VENDORS.filter((v) => v.category === "acceptable").length}</div>
              <div className="text-gray-400">Acceptable</div>
            </div>
            <div className="text-yellow-400">
              <div className="font-medium">{VENDORS.filter((v) => v.category === "caution").length}</div>
              <div className="text-gray-400">Caution</div>
            </div>
            <div className="text-red-400">
              <div className="font-medium">{VENDORS.filter((v) => v.category === "avoid").length}</div>
              <div className="text-gray-400">Avoid</div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
