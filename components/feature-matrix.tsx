"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, Star, Shield, Zap, Settings } from "lucide-react"
import Image from "next/image"

const PORTNOX_COLORS = {
  primary: "#00D4AA",
  primaryDark: "#00A88A",
  accent: "#FF6B35",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
}

interface FeatureMatrixProps {
  results?: any
  selectedVendors?: string[]
  darkMode?: boolean
}

const FeatureMatrix: React.FC<FeatureMatrixProps> = ({
  results = {},
  selectedVendors = ["portnox", "cisco", "aruba", "meraki"],
  darkMode = false,
}) => {
  const vendorData = {
    portnox: {
      name: "Portnox",
      logo: "/portnox-logo.png",
      tier: "Enterprise",
    },
    cisco: {
      name: "Cisco ISE",
      logo: "/cisco-logo.png",
      tier: "Enterprise",
    },
    aruba: {
      name: "Aruba ClearPass",
      logo: "/aruba-logo.png",
      tier: "Enterprise",
    },
    meraki: {
      name: "Cisco Meraki",
      logo: "/meraki-logo.png",
      tier: "Cloud",
    },
  }

  const featureCategories = [
    {
      name: "Core NAC Features",
      icon: <Shield className="h-5 w-5" />,
      features: [
        {
          name: "Device Discovery & Profiling",
          portnox: "full",
          cisco: "full",
          aruba: "full",
          meraki: "partial",
        },
        {
          name: "Policy Enforcement",
          portnox: "full",
          cisco: "full",
          aruba: "full",
          meraki: "full",
        },
        {
          name: "Guest Access Management",
          portnox: "full",
          cisco: "full",
          aruba: "full",
          meraki: "full",
        },
        {
          name: "BYOD Support",
          portnox: "full",
          cisco: "full",
          aruba: "full",
          meraki: "partial",
        },
        {
          name: "IoT Device Management",
          portnox: "full",
          cisco: "partial",
          aruba: "partial",
          meraki: "partial",
        },
      ],
    },
    {
      name: "Advanced Security",
      icon: <Star className="h-5 w-5" />,
      features: [
        {
          name: "AI-Powered Threat Detection",
          portnox: "full",
          cisco: "none",
          aruba: "none",
          meraki: "none",
        },
        {
          name: "Behavioral Analytics",
          portnox: "full",
          cisco: "addon",
          aruba: "addon",
          meraki: "none",
        },
        {
          name: "Zero Trust Architecture",
          portnox: "full",
          cisco: "partial",
          aruba: "partial",
          meraki: "partial",
        },
        {
          name: "Automated Incident Response",
          portnox: "full",
          cisco: "addon",
          aruba: "none",
          meraki: "none",
        },
        {
          name: "Risk-Based Authentication",
          portnox: "full",
          cisco: "partial",
          aruba: "partial",
          meraki: "none",
        },
      ],
    },
    {
      name: "Compliance & Reporting",
      icon: <Settings className="h-5 w-5" />,
      features: [
        {
          name: "SOC 2 Type II Compliance",
          portnox: "full",
          cisco: "full",
          aruba: "full",
          meraki: "full",
        },
        {
          name: "HIPAA Compliance",
          portnox: "full",
          cisco: "full",
          aruba: "partial",
          meraki: "partial",
        },
        {
          name: "PCI DSS Compliance",
          portnox: "full",
          cisco: "full",
          aruba: "full",
          meraki: "partial",
        },
        {
          name: "GDPR Compliance",
          portnox: "full",
          cisco: "partial",
          aruba: "partial",
          meraki: "partial",
        },
        {
          name: "FedRAMP Authorization",
          portnox: "full",
          cisco: "none",
          aruba: "none",
          meraki: "none",
        },
      ],
    },
    {
      name: "Integration & APIs",
      icon: <Zap className="h-5 w-5" />,
      features: [
        {
          name: "REST API",
          portnox: "full",
          cisco: "full",
          aruba: "full",
          meraki: "full",
        },
        {
          name: "SIEM Integration",
          portnox: "full",
          cisco: "full",
          aruba: "full",
          meraki: "partial",
        },
        {
          name: "Active Directory Integration",
          portnox: "full",
          cisco: "full",
          aruba: "full",
          meraki: "full",
        },
        {
          name: "Cloud Identity Providers",
          portnox: "full",
          cisco: "partial",
          aruba: "partial",
          meraki: "full",
        },
        {
          name: "Webhook Support",
          portnox: "full",
          cisco: "none",
          aruba: "none",
          meraki: "partial",
        },
      ],
    },
  ]

  const getFeatureIcon = (status: string) => {
    switch (status) {
      case "full":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "partial":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "addon":
        return <AlertCircle className="h-5 w-5 text-orange-500" />
      case "none":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <XCircle className="h-5 w-5 text-gray-400" />
    }
  }

  const getFeatureText = (status: string) => {
    switch (status) {
      case "full":
        return "Included"
      case "partial":
        return "Limited"
      case "addon":
        return "Add-on"
      case "none":
        return "Not Available"
      default:
        return "Unknown"
    }
  }

  const getFeatureBadge = (status: string) => {
    switch (status) {
      case "full":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Full</Badge>
      case "partial":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Partial</Badge>
      case "addon":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Add-on</Badge>
      case "none":
        return <Badge className="bg-red-100 text-red-800 border-red-200">None</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Feature Comparison Matrix</CardTitle>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Comprehensive feature analysis across {selectedVendors.length} vendors
            </p>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Feature Categories */}
      {featureCategories.map((category, categoryIndex) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
        >
          <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {category.icon}
                {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                      <th className={`text-left p-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Feature</th>
                      {selectedVendors.map((vendor) => (
                        <th key={vendor} className={`text-center p-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                          <div className="flex flex-col items-center">
                            <Image
                              src={vendorData[vendor as keyof typeof vendorData]?.logo || "/placeholder.svg"}
                              alt={vendorData[vendor as keyof typeof vendorData]?.name || vendor}
                              width={80}
                              height={20}
                              className="h-5 w-auto mb-1"
                            />
                            <span className="text-xs">
                              {vendorData[vendor as keyof typeof vendorData]?.name || vendor}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {category.features.map((feature, featureIndex) => (
                      <tr key={featureIndex} className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                        <td className={`p-3 font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          {feature.name}
                        </td>
                        {selectedVendors.map((vendor) => (
                          <td key={vendor} className="p-3 text-center">
                            <div className="flex flex-col items-center space-y-1">
                              {getFeatureIcon(feature[vendor as keyof typeof feature] as string)}
                              <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                {getFeatureText(feature[vendor as keyof typeof feature] as string)}
                              </span>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {selectedVendors.map((vendor, index) => {
          const data = vendorData[vendor as keyof typeof vendorData]
          const fullFeatures = featureCategories.reduce((acc, category) => {
            return acc + category.features.filter((f) => f[vendor as keyof typeof f] === "full").length
          }, 0)
          const totalFeatures = featureCategories.reduce((acc, category) => acc + category.features.length, 0)
          const completeness = Math.round((fullFeatures / totalFeatures) * 100)

          return (
            <motion.div
              key={vendor}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`h-full ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
                <CardContent className="p-6 text-center">
                  <Image
                    src={data?.logo || "/placeholder.svg"}
                    alt={data?.name || vendor}
                    width={120}
                    height={30}
                    className="h-8 w-auto mx-auto mb-4"
                  />
                  <h3 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {data?.name || vendor}
                  </h3>
                  <div className="space-y-2">
                    <div
                      className="text-2xl font-bold"
                      style={{
                        color:
                          completeness >= 90
                            ? PORTNOX_COLORS.success
                            : completeness >= 70
                              ? PORTNOX_COLORS.warning
                              : PORTNOX_COLORS.danger,
                      }}
                    >
                      {completeness}%
                    </div>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Feature Completeness</p>
                    <div className="text-xs space-y-1">
                      <div className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {fullFeatures}/{totalFeatures} Full Features
                      </div>
                      <Badge variant={data?.tier === "Enterprise" ? "default" : "secondary"}>
                        {data?.tier || "Standard"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Legend */}
      <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
        <CardHeader>
          <CardTitle>Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { status: "full", icon: CheckCircle, color: "text-green-500", description: "Fully included" },
              { status: "partial", icon: AlertCircle, color: "text-yellow-500", description: "Limited functionality" },
              { status: "addon", icon: AlertCircle, color: "text-orange-500", description: "Available as add-on" },
              { status: "none", icon: XCircle, color: "text-red-500", description: "Not available" },
            ].map((item) => (
              <div key={item.status} className="flex items-center space-x-2">
                <item.icon className={`h-5 w-5 ${item.color}`} />
                <div>
                  <div className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {getFeatureText(item.status)}
                  </div>
                  <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FeatureMatrix
