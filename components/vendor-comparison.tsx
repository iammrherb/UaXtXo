"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts"
import { CheckCircle, XCircle, AlertTriangle, Clock, DollarSign, Shield, Zap, Users } from "lucide-react"
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

interface VendorComparisonProps {
  results: any
  selectedVendors: string[]
  darkMode: boolean
}

const VendorComparison: React.FC<VendorComparisonProps> = ({ results, selectedVendors, darkMode }) => {
  const vendorData = [
    {
      name: "Portnox",
      logo: "/portnox-logo.png",
      tco: 180000,
      deployment: 2,
      licensing: "Per Device",
      support: "24/7 Included",
      hardware: "None Required",
      cloudNative: true,
      addOns: "All Included",
      compliance: 98,
      automation: 95,
      integration: 90,
      usability: 95,
      performance: 92,
      security: 96,
    },
    {
      name: "Cisco ISE",
      logo: "/cisco-logo.png",
      tco: 450000,
      deployment: 180,
      licensing: "Base + Add-ons",
      support: "Premium Required",
      hardware: "Appliances Required",
      cloudNative: false,
      addOns: "Multiple Tiers",
      compliance: 85,
      automation: 60,
      integration: 85,
      usability: 65,
      performance: 80,
      security: 88,
    },
    {
      name: "Aruba ClearPass",
      logo: "/aruba-logo.png",
      tco: 380000,
      deployment: 120,
      licensing: "Concurrent Users",
      support: "Standard/Premium",
      hardware: "VM or Appliance",
      cloudNative: false,
      addOns: "Policy Manager+",
      compliance: 82,
      automation: 70,
      integration: 80,
      usability: 75,
      performance: 85,
      security: 85,
    },
    {
      name: "Cisco Meraki",
      logo: "/meraki-logo.png",
      tco: 320000,
      deployment: 90,
      licensing: "Per Device",
      support: "Cloud Included",
      hardware: "Access Points",
      cloudNative: true,
      addOns: "Advanced Security",
      compliance: 88,
      automation: 80,
      integration: 75,
      usability: 85,
      performance: 82,
      security: 80,
    },
  ]

  const radarData = vendorData.map((vendor) => ({
    vendor: vendor.name,
    Compliance: vendor.compliance,
    Automation: vendor.automation,
    Integration: vendor.integration,
    Usability: vendor.usability,
    Performance: vendor.performance,
    Security: vendor.security,
  }))

  const ComparisonTable = () => (
    <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
      <CardHeader>
        <CardTitle>Detailed Vendor Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                <th className={`text-left p-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Vendor</th>
                <th className={`text-left p-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>3-Year TCO</th>
                <th className={`text-left p-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Deployment</th>
                <th className={`text-left p-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Licensing</th>
                <th className={`text-left p-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Hardware</th>
                <th className={`text-left p-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Cloud Native</th>
                <th className={`text-left p-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Add-ons</th>
              </tr>
            </thead>
            <tbody>
              {vendorData.map((vendor, index) => (
                <motion.tr
                  key={vendor.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"} hover:${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                >
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={vendor.logo || "/placeholder.svg"}
                        alt={vendor.name}
                        width={80}
                        height={20}
                        className="h-5 w-auto"
                      />
                      <span className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{vendor.name}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-col">
                      <span
                        className={`font-semibold ${vendor.name === "Portnox" ? "text-green-600" : darkMode ? "text-white" : "text-gray-900"}`}
                      >
                        ${(vendor.tco / 1000).toFixed(0)}K
                      </span>
                      {vendor.name === "Portnox" && (
                        <Badge variant="default" className="w-fit mt-1">
                          Lowest
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Clock
                        className={`h-4 w-4 ${vendor.deployment <= 7 ? "text-green-500" : vendor.deployment <= 90 ? "text-yellow-500" : "text-red-500"}`}
                      />
                      <span className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {vendor.deployment} {vendor.deployment === 2 ? "days" : "days"}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      {vendor.licensing}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {vendor.hardware === "None Required" ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {vendor.hardware}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    {vendor.cloudNative ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </td>
                  <td className="p-3">
                    <span
                      className={`text-sm ${vendor.addOns === "All Included" ? "text-green-600 font-medium" : darkMode ? "text-gray-300" : "text-gray-600"}`}
                    >
                      {vendor.addOns}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Radar Chart Comparison */}
      <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Capability Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart
              data={
                radarData[0]
                  ? Object.keys(radarData[0])
                      .filter((key) => key !== "vendor")
                      .map((key) => ({
                        capability: key,
                        Portnox: radarData.find((d) => d.vendor === "Portnox")?.[key] || 0,
                        "Cisco ISE": radarData.find((d) => d.vendor === "Cisco ISE")?.[key] || 0,
                        "Aruba ClearPass": radarData.find((d) => d.vendor === "Aruba ClearPass")?.[key] || 0,
                        "Cisco Meraki": radarData.find((d) => d.vendor === "Cisco Meraki")?.[key] || 0,
                      }))
                  : []
              }
            >
              <PolarGrid stroke={darkMode ? "#374151" : "#E5E7EB"} />
              <PolarAngleAxis dataKey="capability" tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 12 }} />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 10 }}
              />
              <Radar
                name="Portnox"
                dataKey="Portnox"
                stroke={PORTNOX_COLORS.primary}
                fill={PORTNOX_COLORS.primary}
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="Cisco ISE"
                dataKey="Cisco ISE"
                stroke={PORTNOX_COLORS.accent}
                fill={PORTNOX_COLORS.accent}
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Radar
                name="Aruba ClearPass"
                dataKey="Aruba ClearPass"
                stroke={PORTNOX_COLORS.info}
                fill={PORTNOX_COLORS.info}
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Radar
                name="Cisco Meraki"
                dataKey="Cisco Meraki"
                stroke={PORTNOX_COLORS.warning}
                fill={PORTNOX_COLORS.warning}
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Comparison Table */}
      <ComparisonTable />

      {/* Key Differentiators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Deployment Speed",
            portnox: "2 days",
            competitor: "3-6 months",
            advantage: "99% faster",
            icon: Zap,
            color: PORTNOX_COLORS.accent,
          },
          {
            title: "Total Cost",
            portnox: "$180K",
            competitor: "$320K+",
            advantage: "60% lower",
            icon: DollarSign,
            color: PORTNOX_COLORS.success,
          },
          {
            title: "Hardware Required",
            portnox: "None",
            competitor: "Appliances",
            advantage: "Cloud-native",
            icon: Shield,
            color: PORTNOX_COLORS.info,
          },
          {
            title: "Add-on Costs",
            portnox: "All included",
            competitor: "Extra fees",
            advantage: "No surprises",
            icon: Users,
            color: PORTNOX_COLORS.primary,
          },
        ].map((diff, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`h-full ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full" style={{ backgroundColor: `${diff.color}20` }}>
                    <diff.icon className="h-5 w-5" style={{ color: diff.color }} />
                  </div>
                  <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{diff.title}</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Portnox:</span>
                    <span className={`text-sm font-medium text-green-600`}>{diff.portnox}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Competitors:</span>
                    <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{diff.competitor}</span>
                  </div>
                  <Badge variant="default" className="w-full justify-center mt-2">
                    {diff.advantage}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default VendorComparison
