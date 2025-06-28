"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts"
import { CheckCircle, XCircle, DollarSign, Shield } from "lucide-react"
import Image from "next/image"

const PORTNOX_COLORS = {
  primary: "#00D4AA",
  accent: "#FF6B35",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
}

interface VendorComparisonProps {
  results?: any
  selectedVendors?: string[]
  darkMode?: boolean
}

const VendorComparison: React.FC<VendorComparisonProps> = ({
  results = {},
  selectedVendors = ["portnox", "cisco", "aruba", "meraki"],
  darkMode = false,
}) => {
  const vendorData = {
    portnox: {
      name: "Portnox",
      logo: "/portnox-logo.png",
      tco: 180000,
      deployment: 2,
      complexity: "Low",
      hardware: false,
      cloudNative: true,
      support: "24/7",
      compliance: 98,
      automation: 95,
      features: {
        nac: true,
        iot: true,
        byod: true,
        compliance: true,
        analytics: true,
        ai: true,
      },
      pricing: {
        model: "Per Device",
        basePrice: "$3/device/month",
        addOns: "None - All Included",
      },
    },
    cisco: {
      name: "Cisco ISE",
      logo: "/cisco-logo.png",
      tco: 450000,
      deployment: 180,
      complexity: "High",
      hardware: true,
      cloudNative: false,
      support: "Business Hours",
      compliance: 85,
      automation: 60,
      features: {
        nac: true,
        iot: false,
        byod: true,
        compliance: false,
        analytics: false,
        ai: false,
      },
      pricing: {
        model: "Per Device + Appliance",
        basePrice: "$15/device + $50K appliance",
        addOns: "Multiple expensive modules",
      },
    },
    aruba: {
      name: "Aruba ClearPass",
      logo: "/aruba-logo.png",
      tco: 380000,
      deployment: 120,
      complexity: "Medium",
      hardware: true,
      cloudNative: false,
      support: "Business Hours",
      compliance: 82,
      automation: 65,
      features: {
        nac: true,
        iot: true,
        byod: true,
        compliance: false,
        analytics: false,
        ai: false,
      },
      pricing: {
        model: "Per Device + Appliance",
        basePrice: "$12/device + $30K appliance",
        addOns: "IoT, Analytics modules extra",
      },
    },
    meraki: {
      name: "Cisco Meraki",
      logo: "/meraki-logo.png",
      tco: 320000,
      deployment: 90,
      complexity: "Medium",
      hardware: false,
      cloudNative: true,
      support: "Business Hours",
      compliance: 88,
      automation: 70,
      features: {
        nac: true,
        iot: false,
        byod: true,
        compliance: false,
        analytics: true,
        ai: false,
      },
      pricing: {
        model: "Per Device",
        basePrice: "$8/device/month",
        addOns: "Advanced features extra",
      },
    },
  }

  const comparisonData = selectedVendors.map((vendor) => {
    const data = vendorData[vendor as keyof typeof vendorData]
    return {
      vendor: data.name,
      tco: data.tco,
      deployment: data.deployment,
      compliance: data.compliance,
      automation: data.automation,
    }
  })

  const radarData = [
    { subject: "Cost Efficiency", portnox: 95, cisco: 40, aruba: 55, meraki: 65 },
    { subject: "Deployment Speed", portnox: 98, cisco: 20, aruba: 35, meraki: 60 },
    { subject: "Compliance", portnox: 98, cisco: 85, aruba: 82, meraki: 88 },
    { subject: "Automation", portnox: 95, cisco: 60, aruba: 65, meraki: 70 },
    { subject: "Cloud Native", portnox: 100, cisco: 0, aruba: 0, meraki: 80 },
    { subject: "Feature Completeness", portnox: 100, cisco: 60, aruba: 70, meraki: 65 },
  ]

  const FeatureIcon = ({ enabled }: { enabled: boolean }) => {
    if (enabled) {
      return <CheckCircle className="h-5 w-5 text-green-500" />
    }
    return <XCircle className="h-5 w-5 text-red-500" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Vendor Comparison Matrix</CardTitle>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Comprehensive comparison across key evaluation criteria
            </p>
          </CardHeader>
        </Card>
      </motion.div>

      {/* TCO Comparison Chart */}
      <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Total Cost of Ownership (3 Years)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#E5E7EB"} />
              <XAxis
                type="number"
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 12 }}
              />
              <YAxis
                type="category"
                dataKey="vendor"
                width={100}
                tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 12 }}
              />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, "TCO"]}
                contentStyle={{
                  backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                  border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
                  borderRadius: "8px",
                }}
              />
              <Bar
                dataKey="tco"
                fill={(entry: any) => (entry.vendor === "Portnox" ? PORTNOX_COLORS.primary : PORTNOX_COLORS.accent)}
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Radar Chart */}
      <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Multi-Dimensional Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid stroke={darkMode ? "#374151" : "#E5E7EB"} />
              <PolarAngleAxis tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 12 }} />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 10 }}
              />
              <Radar
                name="Portnox"
                dataKey="portnox"
                stroke={PORTNOX_COLORS.primary}
                fill={PORTNOX_COLORS.primary}
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="Cisco"
                dataKey="cisco"
                stroke={PORTNOX_COLORS.accent}
                fill={PORTNOX_COLORS.accent}
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Radar
                name="Aruba"
                dataKey="aruba"
                stroke={PORTNOX_COLORS.info}
                fill={PORTNOX_COLORS.info}
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Radar
                name="Meraki"
                dataKey="meraki"
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
      <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
        <CardHeader>
          <CardTitle>Detailed Feature Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                  <th className={`text-left p-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Criteria</th>
                  {selectedVendors.map((vendor) => {
                    const data = vendorData[vendor as keyof typeof vendorData]
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
                {[
                  { label: "3-Year TCO", key: "tco", format: (val: number) => `$${(val / 1000).toFixed(0)}K` },
                  { label: "Deployment Time", key: "deployment", format: (val: number) => `${val} days` },
                  { label: "Complexity", key: "complexity" },
                  { label: "Hardware Required", key: "hardware", format: (val: boolean) => (val ? "Yes" : "No") },
                  { label: "Cloud Native", key: "cloudNative", format: (val: boolean) => (val ? "Yes" : "No") },
                  { label: "Support", key: "support" },
                  { label: "Compliance Score", key: "compliance", format: (val: number) => `${val}%` },
                  { label: "Automation Level", key: "automation", format: (val: number) => `${val}%` },
                ].map((row, index) => (
                  <tr key={index} className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                    <td className={`p-4 font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{row.label}</td>
                    {selectedVendors.map((vendor) => {
                      const data = vendorData[vendor as keyof typeof vendorData]
                      const value = data[row.key as keyof typeof data]
                      const displayValue = row.format ? row.format(value as any) : value

                      return (
                        <td key={vendor} className={`p-4 text-center ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                          {vendor === "portnox" && (
                            <Badge variant="default" className="bg-green-100 text-green-800 mr-2">
                              Best
                            </Badge>
                          )}
                          {displayValue}
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

      {/* Feature Matrix */}
      <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
        <CardHeader>
          <CardTitle>Feature Availability Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                  <th className={`text-left p-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Feature</th>
                  {selectedVendors.map((vendor) => {
                    const data = vendorData[vendor as keyof typeof vendorData]
                    return (
                      <th key={vendor} className={`text-center p-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {data.name}
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Network Access Control", key: "nac" },
                  { label: "IoT Device Management", key: "iot" },
                  { label: "BYOD Support", key: "byod" },
                  { label: "Compliance Automation", key: "compliance" },
                  { label: "Advanced Analytics", key: "analytics" },
                  { label: "AI-Powered Security", key: "ai" },
                ].map((feature, index) => (
                  <tr key={index} className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                    <td className={`p-4 font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {feature.label}
                    </td>
                    {selectedVendors.map((vendor) => {
                      const data = vendorData[vendor as keyof typeof vendorData]
                      const hasFeature = data.features[feature.key as keyof typeof data.features]

                      return (
                        <td key={vendor} className="p-4 text-center">
                          <FeatureIcon enabled={hasFeature} />
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
    </div>
  )
}

export default VendorComparison
