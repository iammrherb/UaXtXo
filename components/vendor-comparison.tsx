"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { CheckCircle, XCircle, AlertCircle, TrendingUp, DollarSign, Shield, Clock } from "lucide-react"
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
      complexity: 1,
      maintenance: 1,
      support: 5,
      compliance: 98,
      features: 95,
      scalability: 98,
      integration: 92,
      cloudNative: true,
      hardwareRequired: false,
      addOns: 0,
      supportTiers: 1,
    },
    cisco: {
      name: "Cisco ISE",
      logo: "/cisco-logo.png",
      tco: 450000,
      deployment: 180,
      complexity: 5,
      maintenance: 4,
      support: 4,
      compliance: 85,
      features: 88,
      scalability: 85,
      integration: 95,
      cloudNative: false,
      hardwareRequired: true,
      addOns: 8,
      supportTiers: 3,
    },
    aruba: {
      name: "Aruba ClearPass",
      logo: "/aruba-logo.png",
      tco: 380000,
      deployment: 120,
      complexity: 4,
      maintenance: 3,
      support: 4,
      compliance: 82,
      features: 85,
      scalability: 88,
      integration: 88,
      cloudNative: false,
      hardwareRequired: true,
      addOns: 6,
      supportTiers: 3,
    },
    meraki: {
      name: "Cisco Meraki",
      logo: "/meraki-logo.png",
      tco: 320000,
      deployment: 90,
      complexity: 3,
      maintenance: 2,
      support: 4,
      compliance: 88,
      features: 78,
      scalability: 82,
      integration: 85,
      cloudNative: true,
      hardwareRequired: false,
      addOns: 4,
      supportTiers: 2,
    },
  }

  const radarData = selectedVendors.map((vendor) => {
    const data = vendorData[vendor as keyof typeof vendorData]
    return {
      vendor: data?.name || vendor,
      features: data?.features || 0,
      compliance: data?.compliance || 0,
      scalability: data?.scalability || 0,
      integration: data?.integration || 0,
      support: (data?.support || 0) * 20,
      easeOfUse: 100 - (data?.complexity || 0) * 20,
    }
  })

  const tcoComparisonData = selectedVendors.map((vendor) => {
    const data = vendorData[vendor as keyof typeof vendorData]
    return {
      vendor: data?.name || vendor,
      tco: data?.tco || 0,
      deployment: data?.deployment || 0,
    }
  })

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
                      <span className="text-xs">{vendorData[vendor as keyof typeof vendorData]?.name || vendor}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  feature: "3-Year TCO",
                  getValue: (vendor: string) =>
                    `$${((vendorData[vendor as keyof typeof vendorData]?.tco || 0) / 1000).toFixed(0)}K`,
                  getIcon: (vendor: string) => <DollarSign className="h-4 w-4" />,
                },
                {
                  feature: "Deployment Time",
                  getValue: (vendor: string) =>
                    `${vendorData[vendor as keyof typeof vendorData]?.deployment || 0} days`,
                  getIcon: (vendor: string) => <Clock className="h-4 w-4" />,
                },
                {
                  feature: "Cloud Native",
                  getValue: (vendor: string) =>
                    vendorData[vendor as keyof typeof vendorData]?.cloudNative ? "Yes" : "No",
                  getIcon: (vendor: string) =>
                    vendorData[vendor as keyof typeof vendorData]?.cloudNative ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    ),
                },
                {
                  feature: "Hardware Required",
                  getValue: (vendor: string) =>
                    vendorData[vendor as keyof typeof vendorData]?.hardwareRequired ? "Yes" : "No",
                  getIcon: (vendor: string) =>
                    vendorData[vendor as keyof typeof vendorData]?.hardwareRequired ? (
                      <XCircle className="h-4 w-4 text-red-500" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ),
                },
                {
                  feature: "Add-On Modules",
                  getValue: (vendor: string) => `${vendorData[vendor as keyof typeof vendorData]?.addOns || 0}`,
                  getIcon: (vendor: string) => <AlertCircle className="h-4 w-4" />,
                },
                {
                  feature: "Support Tiers",
                  getValue: (vendor: string) => `${vendorData[vendor as keyof typeof vendorData]?.supportTiers || 0}`,
                  getIcon: (vendor: string) => <Shield className="h-4 w-4" />,
                },
                {
                  feature: "Compliance Score",
                  getValue: (vendor: string) => `${vendorData[vendor as keyof typeof vendorData]?.compliance || 0}%`,
                  getIcon: (vendor: string) => <Shield className="h-4 w-4" />,
                },
              ].map((row, index) => (
                <tr key={index} className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                  <td className={`p-3 font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{row.feature}</td>
                  {selectedVendors.map((vendor) => (
                    <td key={vendor} className="p-3 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        {row.getIcon(vendor)}
                        <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          {row.getValue(vendor)}
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
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Vendor Comparison Analysis</CardTitle>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Comprehensive comparison across {selectedVendors.length} vendors
            </p>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Capability Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid stroke={darkMode ? "#374151" : "#E5E7EB"} />
                <PolarAngleAxis dataKey="vendor" tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 12 }} />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 10 }}
                />
                {selectedVendors.map((vendor, index) => (
                  <Radar
                    key={vendor}
                    name={vendorData[vendor as keyof typeof vendorData]?.name || vendor}
                    dataKey={vendor}
                    stroke={Object.values(PORTNOX_COLORS)[index % Object.values(PORTNOX_COLORS).length]}
                    fill={Object.values(PORTNOX_COLORS)[index % Object.values(PORTNOX_COLORS).length]}
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                ))}
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* TCO Comparison */}
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              TCO & Deployment Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={tcoComparisonData} layout="vertical">
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
                <Bar dataKey="tco" fill={PORTNOX_COLORS.primary} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Comparison Table */}
      <ComparisonTable />

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Lowest TCO",
            description: "Portnox offers 60% lower TCO than traditional solutions",
            value: "60% Savings",
            color: PORTNOX_COLORS.success,
          },
          {
            title: "Fastest Deployment",
            description: "Deploy in days, not months",
            value: "99% Faster",
            color: PORTNOX_COLORS.accent,
          },
          {
            title: "Highest Compliance",
            description: "Best-in-class compliance coverage",
            value: "98% Score",
            color: PORTNOX_COLORS.info,
          },
        ].map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`h-full ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: insight.color }}>
                    {insight.value}
                  </div>
                  <h3 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>{insight.title}</h3>
                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{insight.description}</p>
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
