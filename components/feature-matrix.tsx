"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Star,
  Shield,
  Cloud,
  Lock,
  Activity,
  Smartphone,
  Wifi,
  Database,
  BarChart3,
} from "lucide-react"
import Image from "next/image"

const PORTNOX_COLORS = {
  primary: "#00D4AA",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
}

interface FeatureMatrixProps {
  results: any
  selectedVendors: string[]
  darkMode: boolean
}

const FeatureMatrix: React.FC<FeatureMatrixProps> = ({ results, selectedVendors, darkMode }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const vendors = [
    {
      name: "Portnox",
      logo: "/portnox-logo.png",
      tier: "Enterprise",
    },
    {
      name: "Cisco ISE",
      logo: "/cisco-logo.png",
      tier: "Base/Plus/Apex",
    },
    {
      name: "Aruba ClearPass",
      logo: "/aruba-logo.png",
      tier: "Policy Manager",
    },
    {
      name: "Cisco Meraki",
      logo: "/meraki-logo.png",
      tier: "Systems Manager",
    },
  ]

  const featureCategories = [
    { id: "all", name: "All Features", icon: Star },
    { id: "authentication", name: "Authentication", icon: Lock },
    { id: "authorization", name: "Authorization", icon: Shield },
    { id: "monitoring", name: "Monitoring", icon: Activity },
    { id: "device", name: "Device Management", icon: Smartphone },
    { id: "network", name: "Network Control", icon: Wifi },
    { id: "compliance", name: "Compliance", icon: BarChart3 },
    { id: "integration", name: "Integration", icon: Database },
    { id: "cloud", name: "Cloud Features", icon: Cloud },
  ]

  const features = [
    // Authentication Features
    {
      category: "authentication",
      name: "802.1X Authentication",
      description: "Wired and wireless 802.1X support",
      portnox: "full",
      cisco: "full",
      aruba: "full",
      meraki: "limited",
      importance: "critical",
    },
    {
      category: "authentication",
      name: "Multi-Factor Authentication",
      description: "Built-in MFA support",
      portnox: "full",
      cisco: "addon",
      aruba: "addon",
      meraki: "limited",
      importance: "high",
    },
    {
      category: "authentication",
      name: "Certificate Management",
      description: "Automated certificate lifecycle",
      portnox: "full",
      cisco: "full",
      aruba: "limited",
      meraki: "none",
      importance: "high",
    },
    {
      category: "authentication",
      name: "Guest Access Management",
      description: "Self-service guest portal",
      portnox: "full",
      cisco: "full",
      aruba: "full",
      meraki: "full",
      importance: "medium",
    },
    {
      category: "authentication",
      name: "BYOD Support",
      description: "Bring Your Own Device management",
      portnox: "full",
      cisco: "full",
      aruba: "full",
      meraki: "limited",
      importance: "high",
    },

    // Authorization Features
    {
      category: "authorization",
      name: "Dynamic VLAN Assignment",
      description: "Automatic VLAN assignment based on policy",
      portnox: "full",
      cisco: "full",
      aruba: "full",
      meraki: "limited",
      importance: "critical",
    },
    {
      category: "authorization",
      name: "Role-Based Access Control",
      description: "Granular role-based permissions",
      portnox: "full",
      cisco: "full",
      aruba: "full",
      meraki: "limited",
      importance: "critical",
    },
    {
      category: "authorization",
      name: "Time-Based Access",
      description: "Schedule-based access control",
      portnox: "full",
      cisco: "full",
      aruba: "full",
      meraki: "limited",
      importance: "medium",
    },
    {
      category: "authorization",
      name: "Location-Based Access",
      description: "Geographic access restrictions",
      portnox: "full",
      cisco: "addon",
      aruba: "limited",
      meraki: "none",
      importance: "medium",
    },

    // Monitoring Features
    {
      category: "monitoring",
      name: "Real-Time Monitoring",
      description: "Live network activity monitoring",
      portnox: "full",
      cisco: "full",
      aruba: "full",
      meraki: "full",
      importance: "critical",
    },
    {
      category: "monitoring",
      name: "AI-Powered Analytics",
      description: "Machine learning threat detection",
      portnox: "full",
      cisco: "addon",
      aruba: "none",
      meraki: "limited",
      importance: "high",
    },
    {
      category: "monitoring",
      name: "Behavioral Analysis",
      description: "User and device behavior monitoring",
      portnox: "full",
      cisco: "addon",
      aruba: "limited",
      meraki: "none",
      importance: "high",
    },
    {
      category: "monitoring",
      name: "Threat Intelligence",
      description: "External threat feed integration",
      portnox: "full",
      cisco: "addon",
      aruba: "addon",
      meraki: "none",
      importance: "high",
    },

    // Device Management
    {
      category: "device",
      name: "Device Profiling",
      description: "Automatic device identification",
      portnox: "full",
      cisco: "full",
      aruba: "full",
      meraki: "limited",
      importance: "critical",
    },
    {
      category: "device",
      name: "IoT Device Management",
      description: "Specialized IoT device handling",
      portnox: "full",
      cisco: "addon",
      aruba: "limited",
      meraki: "limited",
      importance: "high",
    },
    {
      category: "device",
      name: "Device Compliance",
      description: "Automated compliance checking",
      portnox: "full",
      cisco: "addon",
      aruba: "addon",
      meraki: "none",
      importance: "high",
    },
    {
      category: "device",
      name: "Quarantine Management",
      description: "Automated device quarantine",
      portnox: "full",
      cisco: "full",
      aruba: "full",
      meraki: "limited",
      importance: "critical",
    },

    // Network Control
    {
      category: "network",
      name: "Microsegmentation",
      description: "Zero-trust network segmentation",
      portnox: "full",
      cisco: "addon",
      aruba: "limited",
      meraki: "none",
      importance: "critical",
    },
    {
      category: "network",
      name: "Software-Defined Perimeter",
      description: "Dynamic network perimeter control",
      portnox: "full",
      cisco: "none",
      aruba: "none",
      meraki: "none",
      importance: "high",
    },
    {
      category: "network",
      name: "Network Automation",
      description: "Automated network policy enforcement",
      portnox: "full",
      cisco: "limited",
      aruba: "limited",
      meraki: "limited",
      importance: "high",
    },

    // Compliance
    {
      category: "compliance",
      name: "SOC 2 Compliance",
      description: "SOC 2 Type II compliance support",
      portnox: "full",
      cisco: "full",
      aruba: "full",
      meraki: "limited",
      importance: "critical",
    },
    {
      category: "compliance",
      name: "HIPAA Compliance",
      description: "Healthcare compliance features",
      portnox: "full",
      cisco: "full",
      aruba: "limited",
      meraki: "limited",
      importance: "high",
    },
    {
      category: "compliance",
      name: "PCI DSS Compliance",
      description: "Payment card industry compliance",
      portnox: "full",
      cisco: "full",
      aruba: "limited",
      meraki: "limited",
      importance: "high",
    },
    {
      category: "compliance",
      name: "GDPR Compliance",
      description: "European data protection compliance",
      portnox: "full",
      cisco: "limited",
      aruba: "limited",
      meraki: "limited",
      importance: "high",
    },
    {
      category: "compliance",
      name: "FedRAMP Authorization",
      description: "Federal government cloud compliance",
      portnox: "full",
      cisco: "none",
      aruba: "none",
      meraki: "none",
      importance: "critical",
    },

    // Integration
    {
      category: "integration",
      name: "Active Directory Integration",
      description: "Native AD/LDAP integration",
      portnox: "full",
      cisco: "full",
      aruba: "full",
      meraki: "full",
      importance: "critical",
    },
    {
      category: "integration",
      name: "SIEM Integration",
      description: "Security information event management",
      portnox: "full",
      cisco: "full",
      aruba: "limited",
      meraki: "limited",
      importance: "high",
    },
    {
      category: "integration",
      name: "API Access",
      description: "RESTful API for integrations",
      portnox: "full",
      cisco: "limited",
      aruba: "limited",
      meraki: "full",
      importance: "high",
    },
    {
      category: "integration",
      name: "Webhook Support",
      description: "Real-time event notifications",
      portnox: "full",
      cisco: "none",
      aruba: "none",
      meraki: "limited",
      importance: "medium",
    },

    // Cloud Features
    {
      category: "cloud",
      name: "Cloud-Native Architecture",
      description: "Built for cloud from ground up",
      portnox: "full",
      cisco: "none",
      aruba: "none",
      meraki: "full",
      importance: "critical",
    },
    {
      category: "cloud",
      name: "Multi-Tenant Support",
      description: "Native multi-tenancy",
      portnox: "full",
      cisco: "limited",
      aruba: "none",
      meraki: "full",
      importance: "high",
    },
    {
      category: "cloud",
      name: "Auto-Scaling",
      description: "Automatic capacity scaling",
      portnox: "full",
      cisco: "none",
      aruba: "none",
      meraki: "limited",
      importance: "high",
    },
    {
      category: "cloud",
      name: "Global Deployment",
      description: "Worldwide cloud presence",
      portnox: "full",
      cisco: "limited",
      aruba: "none",
      meraki: "full",
      importance: "medium",
    },
  ]

  const filteredFeatures = features.filter((feature) => {
    const matchesSearch =
      feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || feature.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getFeatureIcon = (support: string) => {
    switch (support) {
      case "full":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "limited":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "addon":
        return (
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-blue-500" />
            <span className="text-xs text-blue-500">+</span>
          </div>
        )
      case "none":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <XCircle className="h-5 w-5 text-gray-400" />
    }
  }

  const getFeatureBadge = (support: string) => {
    switch (support) {
      case "full":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
            Included
          </Badge>
        )
      case "limited":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
            Limited
          </Badge>
        )
      case "addon":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-300 text-xs">
            Add-on
          </Badge>
        )
      case "none":
        return (
          <Badge variant="destructive" className="text-xs">
            Not Available
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            Unknown
          </Badge>
        )
    }
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "critical":
        return "border-l-red-500"
      case "high":
        return "border-l-orange-500"
      case "medium":
        return "border-l-yellow-500"
      default:
        return "border-l-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Feature Comparison Matrix
          </CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {featureCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  <category.icon className="h-4 w-4 mr-1" />
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Vendor Headers */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="hidden md:block"></div>
        {vendors.map((vendor, index) => (
          <motion.div
            key={vendor.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className={`text-center ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
              <CardContent className="p-4">
                <Image
                  src={vendor.logo || "/placeholder.svg"}
                  alt={vendor.name}
                  width={100}
                  height={25}
                  className="h-6 w-auto mx-auto mb-2"
                />
                <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{vendor.name}</h3>
                <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{vendor.tier}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Feature Matrix */}
      <div className="space-y-2">
        {filteredFeatures.map((feature, index) => (
          <motion.div
            key={`${feature.category}-${feature.name}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card
              className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} border-l-4 ${getImportanceColor(feature.importance)}`}
            >
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  {/* Feature Info */}
                  <div className="md:col-span-1">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {featureCategories.find((cat) => cat.id === feature.category)?.icon &&
                          React.createElement(featureCategories.find((cat) => cat.id === feature.category)!.icon, {
                            className: "h-4 w-4 text-gray-400",
                          })}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{feature.name}</h4>
                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} mt-1`}>
                          {feature.description}
                        </p>
                        <Badge
                          variant="outline"
                          className={`mt-2 text-xs ${
                            feature.importance === "critical"
                              ? "border-red-300 text-red-600"
                              : feature.importance === "high"
                                ? "border-orange-300 text-orange-600"
                                : "border-yellow-300 text-yellow-600"
                          }`}
                        >
                          {feature.importance}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Vendor Support */}
                  <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Portnox */}
                    <div className="flex flex-col items-center gap-2">
                      {getFeatureIcon(feature.portnox)}
                      {getFeatureBadge(feature.portnox)}
                    </div>

                    {/* Cisco ISE */}
                    <div className="flex flex-col items-center gap-2">
                      {getFeatureIcon(feature.cisco)}
                      {getFeatureBadge(feature.cisco)}
                    </div>

                    {/* Aruba ClearPass */}
                    <div className="flex flex-col items-center gap-2">
                      {getFeatureIcon(feature.aruba)}
                      {getFeatureBadge(feature.aruba)}
                    </div>

                    {/* Cisco Meraki */}
                    <div className="flex flex-col items-center gap-2">
                      {getFeatureIcon(feature.meraki)}
                      {getFeatureBadge(feature.meraki)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
        <CardHeader>
          <CardTitle>Feature Coverage Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {vendors.map((vendor) => {
              const vendorKey = vendor.name
                .toLowerCase()
                .replace(/\s+/g, "")
                .replace("ise", "")
                .replace("clearpass", "")
                .replace("meraki", "meraki")
              const fullFeatures = features.filter((f) => f[vendorKey as keyof typeof f] === "full").length
              const totalFeatures = features.length
              const coverage = Math.round((fullFeatures / totalFeatures) * 100)

              return (
                <div key={vendor.name} className="text-center">
                  <Image
                    src={vendor.logo || "/placeholder.svg"}
                    alt={vendor.name}
                    width={80}
                    height={20}
                    className="h-5 w-auto mx-auto mb-2"
                  />
                  <div
                    className={`text-2xl font-bold ${vendor.name === "Portnox" ? "text-green-600" : darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {coverage}%
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {fullFeatures}/{totalFeatures} features
                  </div>
                  <div className="mt-2">
                    <div className={`w-full bg-gray-200 rounded-full h-2 ${darkMode ? "bg-gray-700" : ""}`}>
                      <div
                        className={`h-2 rounded-full ${vendor.name === "Portnox" ? "bg-green-500" : "bg-blue-500"}`}
                        style={{ width: `${coverage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FeatureMatrix
