"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, Star, Crown } from "lucide-react"
import Image from "next/image"

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
  const vendorFeatures = {
    portnox: {
      name: "Portnox",
      logo: "/portnox-logo.png",
      category: "Cloud-Native NAC",
      features: {
        core: {
          "Network Access Control": "full",
          "Device Discovery": "full",
          "Policy Enforcement": "full",
          "Guest Access": "full",
          "Certificate Management": "full",
        },
        advanced: {
          "AI-Powered Threat Detection": "full",
          "IoT Device Management": "full",
          "BYOD Support": "full",
          "Zero Trust Architecture": "full",
          "Behavioral Analytics": "full",
        },
        compliance: {
          "SOC 2 Type II": "full",
          "ISO 27001": "full",
          HIPAA: "full",
          "PCI DSS": "full",
          GDPR: "full",
          FedRAMP: "full",
        },
        integration: {
          "Active Directory": "full",
          LDAP: "full",
          RADIUS: "full",
          "SAML/SSO": "full",
          "API Access": "full",
          "SIEM Integration": "full",
        },
        deployment: {
          "Cloud Deployment": "full",
          "On-Premises": "partial",
          Hybrid: "full",
          "Multi-Tenant": "full",
          "Auto-Scaling": "full",
        },
      },
    },
    cisco: {
      name: "Cisco ISE",
      logo: "/cisco-logo.png",
      category: "Enterprise NAC",
      features: {
        core: {
          "Network Access Control": "full",
          "Device Discovery": "full",
          "Policy Enforcement": "full",
          "Guest Access": "full",
          "Certificate Management": "partial",
        },
        advanced: {
          "AI-Powered Threat Detection": "none",
          "IoT Device Management": "partial",
          "BYOD Support": "full",
          "Zero Trust Architecture": "partial",
          "Behavioral Analytics": "none",
        },
        compliance: {
          "SOC 2 Type II": "full",
          "ISO 27001": "full",
          HIPAA: "partial",
          "PCI DSS": "full",
          GDPR: "partial",
          FedRAMP: "none",
        },
        integration: {
          "Active Directory": "full",
          LDAP: "full",
          RADIUS: "full",
          "SAML/SSO": "full",
          "API Access": "partial",
          "SIEM Integration": "partial",
        },
        deployment: {
          "Cloud Deployment": "partial",
          "On-Premises": "full",
          Hybrid: "partial",
          "Multi-Tenant": "none",
          "Auto-Scaling": "none",
        },
      },
    },
    aruba: {
      name: "Aruba ClearPass",
      logo: "/aruba-logo.png",
      category: "Enterprise NAC",
      features: {
        core: {
          "Network Access Control": "full",
          "Device Discovery": "full",
          "Policy Enforcement": "full",
          "Guest Access": "full",
          "Certificate Management": "full",
        },
        advanced: {
          "AI-Powered Threat Detection": "none",
          "IoT Device Management": "full",
          "BYOD Support": "full",
          "Zero Trust Architecture": "partial",
          "Behavioral Analytics": "partial",
        },
        compliance: {
          "SOC 2 Type II": "full",
          "ISO 27001": "full",
          HIPAA: "partial",
          "PCI DSS": "full",
          GDPR: "partial",
          FedRAMP: "none",
        },
        integration: {
          "Active Directory": "full",
          LDAP: "full",
          RADIUS: "full",
          "SAML/SSO": "full",
          "API Access": "full",
          "SIEM Integration": "partial",
        },
        deployment: {
          "Cloud Deployment": "partial",
          "On-Premises": "full",
          Hybrid: "partial",
          "Multi-Tenant": "none",
          "Auto-Scaling": "none",
        },
      },
    },
    meraki: {
      name: "Cisco Meraki",
      logo: "/meraki-logo.png",
      category: "Cloud-Managed NAC",
      features: {
        core: {
          "Network Access Control": "full",
          "Device Discovery": "full",
          "Policy Enforcement": "full",
          "Guest Access": "full",
          "Certificate Management": "partial",
        },
        advanced: {
          "AI-Powered Threat Detection": "none",
          "IoT Device Management": "partial",
          "BYOD Support": "full",
          "Zero Trust Architecture": "partial",
          "Behavioral Analytics": "partial",
        },
        compliance: {
          "SOC 2 Type II": "full",
          "ISO 27001": "full",
          HIPAA: "partial",
          "PCI DSS": "full",
          GDPR: "partial",
          FedRAMP: "none",
        },
        integration: {
          "Active Directory": "full",
          LDAP: "full",
          RADIUS: "full",
          "SAML/SSO": "full",
          "API Access": "full",
          "SIEM Integration": "partial",
        },
        deployment: {
          "Cloud Deployment": "full",
          "On-Premises": "none",
          Hybrid: "partial",
          "Multi-Tenant": "partial",
          "Auto-Scaling": "full",
        },
      },
    },
  }

  const FeatureIcon = ({ level }: { level: "full" | "partial" | "none" }) => {
    switch (level) {
      case "full":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "partial":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "none":
        return <XCircle className="h-5 w-5 text-red-500" />
    }
  }

  const getFeatureScore = (vendor: string) => {
    const features = vendorFeatures[vendor as keyof typeof vendorFeatures]?.features
    if (!features) return 0

    let total = 0
    let score = 0

    Object.values(features).forEach((category) => {
      Object.values(category).forEach((level) => {
        total += 1
        if (level === "full") score += 1
        else if (level === "partial") score += 0.5
      })
    })

    return Math.round((score / total) * 100)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500" />
              Comprehensive Feature Matrix
            </CardTitle>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Detailed feature comparison across all vendors and categories
            </p>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Feature Scores Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {selectedVendors.map((vendor, index) => {
          const data = vendorFeatures[vendor as keyof typeof vendorFeatures]
          const score = getFeatureScore(vendor)

          return (
            <motion.div
              key={vendor}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`h-full ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Image
                      src={data.logo || "/placeholder.svg"}
                      alt={data.name}
                      width={100}
                      height={25}
                      className="h-8 w-auto"
                    />
                    {vendor === "portnox" && <Crown className="h-5 w-5 text-yellow-500 ml-2" />}
                  </div>
                  <div
                    className="text-3xl font-bold mb-2"
                    style={{
                      color: score >= 90 ? "#10B981" : score >= 70 ? "#F59E0B" : "#EF4444",
                    }}
                  >
                    {score}%
                  </div>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Feature Completeness</p>
                  <Badge variant={vendor === "portnox" ? "default" : "secondary"} className="mt-2">
                    {data.category}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Detailed Feature Matrix */}
      {Object.entries(vendorFeatures.portnox.features).map(([categoryName, categoryFeatures]) => (
        <Card key={categoryName} className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className="capitalize">{categoryName.replace(/([A-Z])/g, " $1").trim()} Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                    <th className={`text-left p-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Feature</th>
                    {selectedVendors.map((vendor) => {
                      const data = vendorFeatures[vendor as keyof typeof vendorFeatures]
                      return (
                        <th key={vendor} className={`text-center p-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                          <div className="flex flex-col items-center gap-2">
                            <Image
                              src={data.logo || "/placeholder.svg"}
                              alt={data.name}
                              width={80}
                              height={20}
                              className="h-6 w-auto"
                            />
                            <span className="text-sm">{data.name}</span>
                          </div>
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(categoryFeatures).map(([featureName, _], index) => (
                    <tr key={index} className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                      <td className={`p-4 font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {featureName}
                      </td>
                      {selectedVendors.map((vendor) => {
                        const vendorData = vendorFeatures[vendor as keyof typeof vendorFeatures]
                        const featureLevel =
                          vendorData.features[categoryName as keyof typeof vendorData.features]?.[
                            featureName as keyof typeof categoryFeatures
                          ] || "none"

                        return (
                          <td key={vendor} className="p-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <FeatureIcon level={featureLevel as "full" | "partial" | "none"} />
                              {vendor === "portnox" && featureLevel === "full" && (
                                <Badge variant="default" className="text-xs">
                                  Best
                                </Badge>
                              )}
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Legend */}
      <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
        <CardContent className="p-6">
          <h3 className={`font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Legend</h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Full Support - Complete feature implementation
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Partial Support - Limited or add-on required
              </span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Not Supported - Feature not available
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FeatureMatrix
