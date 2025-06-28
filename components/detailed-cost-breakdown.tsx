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
  PieChart,
  Line,
  Area,
  AreaChart,
} from "recharts"
import { DollarSign, TrendingDown, AlertTriangle, Calculator, Zap, Clock } from "lucide-react"
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

interface DetailedCostBreakdownProps {
  results?: any
  years?: number
  darkMode?: boolean
  configuration?: any
}

const DetailedCostBreakdown: React.FC<DetailedCostBreakdownProps> = ({
  results = {},
  years = 3,
  darkMode = false,
  configuration = {},
}) => {
  const devices = configuration?.devices || 2500
  const users = configuration?.users || 1500

  // Detailed cost breakdown data
  const vendorCostData = {
    portnox: {
      name: "Portnox",
      logo: "/portnox-logo.png",
      licensing: {
        perDevice: 3.0,
        total: devices * 3.0 * 12 * years,
        model: "Per device/month",
        tiers: 1,
      },
      implementation: {
        professional: 15000,
        training: 5000,
        migration: 8000,
        total: 28000,
      },
      hardware: {
        servers: 0,
        appliances: 0,
        networking: 0,
        total: 0,
      },
      support: {
        annual: devices * 0.5 * 12,
        total: devices * 0.5 * 12 * years,
        tier: "Premium included",
      },
      hidden: {
        maintenance: 0,
        upgrades: 0,
        consulting: 0,
        total: 0,
      },
    },
    cisco: {
      name: "Cisco ISE",
      logo: "/cisco-logo.png",
      licensing: {
        perDevice: 8.5,
        total: devices * 8.5 * 12 * years,
        model: "Per device/month + base",
        tiers: 3,
      },
      implementation: {
        professional: 85000,
        training: 25000,
        migration: 35000,
        total: 145000,
      },
      hardware: {
        servers: 45000,
        appliances: 25000,
        networking: 15000,
        total: 85000,
      },
      support: {
        annual: 35000,
        total: 35000 * years,
        tier: "SmartNet required",
      },
      hidden: {
        maintenance: 15000 * years,
        upgrades: 25000,
        consulting: 20000 * years,
        total: 15000 * years + 25000 + 20000 * years,
      },
    },
    aruba: {
      name: "Aruba ClearPass",
      logo: "/aruba-logo.png",
      licensing: {
        perDevice: 7.2,
        total: devices * 7.2 * 12 * years,
        model: "Per device/month",
        tiers: 2,
      },
      implementation: {
        professional: 65000,
        training: 18000,
        migration: 28000,
        total: 111000,
      },
      hardware: {
        servers: 35000,
        appliances: 20000,
        networking: 12000,
        total: 67000,
      },
      support: {
        annual: 28000,
        total: 28000 * years,
        tier: "Foundation Care",
      },
      hidden: {
        maintenance: 12000 * years,
        upgrades: 18000,
        consulting: 15000 * years,
        total: 12000 * years + 18000 + 15000 * years,
      },
    },
    meraki: {
      name: "Cisco Meraki",
      logo: "/meraki-logo.png",
      licensing: {
        perDevice: 6.8,
        total: devices * 6.8 * 12 * years,
        model: "Per device/month",
        tiers: 2,
      },
      implementation: {
        professional: 45000,
        training: 12000,
        migration: 18000,
        total: 75000,
      },
      hardware: {
        servers: 0,
        appliances: 35000,
        networking: 25000,
        total: 60000,
      },
      support: {
        annual: 22000,
        total: 22000 * years,
        tier: "Cloud support",
      },
      hidden: {
        maintenance: 8000 * years,
        upgrades: 12000,
        consulting: 10000 * years,
        total: 8000 * years + 12000 + 10000 * years,
      },
    },
  }

  const selectedVendors = ["portnox", "cisco", "aruba", "meraki"]

  // Calculate total costs
  const totalCostData = selectedVendors.map((vendor) => {
    const data = vendorCostData[vendor as keyof typeof vendorCostData]
    const total =
      data.licensing.total + data.implementation.total + data.hardware.total + data.support.total + data.hidden.total
    return {
      vendor: data.name,
      licensing: data.licensing.total,
      implementation: data.implementation.total,
      hardware: data.hardware.total,
      support: data.support.total,
      hidden: data.hidden.total,
      total,
    }
  })

  // Cost breakdown by category
  const costCategoryData = [
    {
      name: "Licensing",
      portnox: vendorCostData.portnox.licensing.total,
      cisco: vendorCostData.cisco.licensing.total,
      aruba: vendorCostData.aruba.licensing.total,
      meraki: vendorCostData.meraki.licensing.total,
    },
    {
      name: "Implementation",
      portnox: vendorCostData.portnox.implementation.total,
      cisco: vendorCostData.cisco.implementation.total,
      aruba: vendorCostData.aruba.implementation.total,
      meraki: vendorCostData.meraki.implementation.total,
    },
    {
      name: "Hardware",
      portnox: vendorCostData.portnox.hardware.total,
      cisco: vendorCostData.cisco.hardware.total,
      aruba: vendorCostData.aruba.hardware.total,
      meraki: vendorCostData.meraki.hardware.total,
    },
    {
      name: "Support",
      portnox: vendorCostData.portnox.support.total,
      cisco: vendorCostData.cisco.support.total,
      aruba: vendorCostData.aruba.support.total,
      meraki: vendorCostData.meraki.support.total,
    },
    {
      name: "Hidden Costs",
      portnox: vendorCostData.portnox.hidden.total,
      cisco: vendorCostData.cisco.hidden.total,
      aruba: vendorCostData.aruba.hidden.total,
      meraki: vendorCostData.meraki.hidden.total,
    },
  ]

  // Year-over-year cost projection
  const yearlyProjection = Array.from({ length: years }, (_, index) => {
    const year = index + 1
    return {
      year: `Year ${year}`,
      portnox:
        vendorCostData.portnox.licensing.total / years + (year === 1 ? vendorCostData.portnox.implementation.total : 0),
      cisco:
        vendorCostData.cisco.licensing.total / years +
        vendorCostData.cisco.support.total / years +
        vendorCostData.cisco.hidden.total / years +
        (year === 1 ? vendorCostData.cisco.implementation.total + vendorCostData.cisco.hardware.total : 0),
      aruba:
        vendorCostData.aruba.licensing.total / years +
        vendorCostData.aruba.support.total / years +
        vendorCostData.aruba.hidden.total / years +
        (year === 1 ? vendorCostData.aruba.implementation.total + vendorCostData.aruba.hardware.total : 0),
      meraki:
        vendorCostData.meraki.licensing.total / years +
        vendorCostData.meraki.support.total / years +
        vendorCostData.meraki.hidden.total / years +
        (year === 1 ? vendorCostData.meraki.implementation.total + vendorCostData.meraki.hardware.total : 0),
    }
  })

  // Treemap data for cost visualization
  const treemapData = selectedVendors.map((vendor) => {
    const data = vendorCostData[vendor as keyof typeof vendorCostData]
    return {
      name: data.name,
      size:
        data.licensing.total + data.implementation.total + data.hardware.total + data.support.total + data.hidden.total,
      children: [
        { name: "Licensing", size: data.licensing.total, fill: PORTNOX_COLORS.primary },
        { name: "Implementation", size: data.implementation.total, fill: PORTNOX_COLORS.accent },
        { name: "Hardware", size: data.hardware.total, fill: PORTNOX_COLORS.danger },
        { name: "Support", size: data.support.total, fill: PORTNOX_COLORS.info },
        { name: "Hidden", size: data.hidden.total, fill: PORTNOX_COLORS.warning },
      ],
    }
  })

  const CostMetricCard = ({ title, value, subtitle, icon: Icon, trend, color = PORTNOX_COLORS.primary }: any) => (
    <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Card className={`h-full ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20`, color: color }}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{title}</p>
                <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{value}</p>
                {subtitle && <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{subtitle}</p>}
              </div>
            </div>
            {trend && (
              <Badge variant={trend < 0 ? "default" : "destructive"} className="ml-2">
                {trend > 0 ? "+" : ""}
                {trend}%
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card
          className={`${darkMode ? "bg-gradient-to-r from-gray-800 to-gray-900" : "bg-gradient-to-r from-blue-50 to-indigo-50"}`}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                  <Calculator className="h-8 w-8 text-blue-600" />
                  Detailed Cost Analysis
                </CardTitle>
                <p className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  {years}-year comprehensive cost breakdown for {devices.toLocaleString()} devices
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">
                  $
                  {(
                    vendorCostData.cisco.licensing.total +
                    vendorCostData.cisco.implementation.total +
                    vendorCostData.cisco.hardware.total +
                    vendorCostData.cisco.support.total +
                    vendorCostData.cisco.hidden.total -
                    (vendorCostData.portnox.licensing.total +
                      vendorCostData.portnox.implementation.total +
                      vendorCostData.portnox.hardware.total +
                      vendorCostData.portnox.support.total +
                      vendorCostData.portnox.hidden.total) /
                      1000
                  ).toFixed(0)}
                  K
                </div>
                <div className="text-sm text-green-600">Total Savings vs Cisco</div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Key Cost Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CostMetricCard
          title="Portnox Total TCO"
          value={`$${((vendorCostData.portnox.licensing.total + vendorCostData.portnox.implementation.total + vendorCostData.portnox.hardware.total + vendorCostData.portnox.support.total + vendorCostData.portnox.hidden.total) / 1000).toFixed(0)}K`}
          subtitle={`$${(vendorCostData.portnox.licensing.perDevice * 12).toFixed(0)}/device/year`}
          icon={DollarSign}
          trend={-65}
          color={PORTNOX_COLORS.primary}
        />
        <CostMetricCard
          title="Hidden Cost Savings"
          value={`$${((vendorCostData.cisco.hidden.total - vendorCostData.portnox.hidden.total) / 1000).toFixed(0)}K`}
          subtitle="Maintenance, upgrades, consulting"
          icon={AlertTriangle}
          trend={-100}
          color={PORTNOX_COLORS.success}
        />
        <CostMetricCard
          title="Hardware Savings"
          value={`$${((vendorCostData.cisco.hardware.total - vendorCostData.portnox.hardware.total) / 1000).toFixed(0)}K`}
          subtitle="Cloud-native advantage"
          icon={Zap}
          trend={-100}
          color={PORTNOX_COLORS.accent}
        />
        <CostMetricCard
          title="Deployment Speed"
          value="2 days"
          subtitle="vs 6 months average"
          icon={Clock}
          trend={-95}
          color={PORTNOX_COLORS.info}
        />
      </div>

      {/* Cost Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total Cost Comparison */}
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-blue-600" />
              Total Cost Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={totalCostData} layout="vertical">
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
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Total Cost"]}
                  contentStyle={{
                    backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                    border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="total" fill={PORTNOX_COLORS.primary} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cost Category Breakdown */}
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-green-600" />
              Cost Category Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={costCategoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#E5E7EB"} />
                <XAxis dataKey="name" tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 12 }} />
                <YAxis
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
                  contentStyle={{
                    backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                    border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="portnox" fill={PORTNOX_COLORS.primary} name="Portnox" />
                <Bar dataKey="cisco" fill={PORTNOX_COLORS.accent} name="Cisco ISE" />
                <Bar dataKey="aruba" fill={PORTNOX_COLORS.info} name="Aruba" />
                <Bar dataKey="meraki" fill={PORTNOX_COLORS.warning} name="Meraki" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Year-over-Year Projection */}
      <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-purple-600" />
            Year-over-Year Cost Projection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={yearlyProjection}>
              <defs>
                <linearGradient id="portnoxGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={PORTNOX_COLORS.primary} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={PORTNOX_COLORS.primary} stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="ciscoGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={PORTNOX_COLORS.accent} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={PORTNOX_COLORS.accent} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#E5E7EB"} />
              <XAxis dataKey="year" tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 12 }} />
              <YAxis
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 12 }}
              />
              <Tooltip
                formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
                contentStyle={{
                  backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                  border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="portnox"
                stroke={PORTNOX_COLORS.primary}
                fillOpacity={1}
                fill="url(#portnoxGradient)"
                strokeWidth={2}
                name="Portnox"
              />
              <Area
                type="monotone"
                dataKey="cisco"
                stroke={PORTNOX_COLORS.accent}
                fillOpacity={1}
                fill="url(#ciscoGradient)"
                strokeWidth={2}
                name="Cisco ISE"
              />
              <Line
                type="monotone"
                dataKey="aruba"
                stroke={PORTNOX_COLORS.info}
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
                name="Aruba"
              />
              <Line
                type="monotone"
                dataKey="meraki"
                stroke={PORTNOX_COLORS.warning}
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
                name="Meraki"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Cost Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {selectedVendors.slice(0, 2).map((vendor, index) => {
          const data = vendorCostData[vendor as keyof typeof vendorCostData]
          return (
            <motion.div
              key={vendor}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Image
                      src={data.logo || "/placeholder.svg"}
                      alt={data.name}
                      width={100}
                      height={25}
                      className="h-6 w-auto"
                    />
                    Cost Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { category: "Licensing", data: data.licensing, icon: DollarSign },
                      { category: "Implementation", data: data.implementation, icon: Zap },
                      { category: "Hardware", data: data.hardware, icon: AlertTriangle },
                      { category: "Support", data: data.support, icon: Clock },
                      { category: "Hidden Costs", data: data.hidden, icon: TrendingDown },
                    ].map((item) => (
                      <div
                        key={item.category}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="h-5 w-5 text-gray-500" />
                          <div>
                            <div className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                              {item.category}
                            </div>
                            {item.data.model && (
                              <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                {item.data.model}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                            ${item.data.total.toLocaleString()}
                          </div>
                          {item.data.perDevice && (
                            <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                              ${item.data.perDevice}/device/month
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="border-t pt-3">
                      <div className="flex items-center justify-between">
                        <div className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
                          Total TCO
                        </div>
                        <div className={`font-bold text-xl ${darkMode ? "text-white" : "text-gray-900"}`}>
                          $
                          {(
                            data.licensing.total +
                            data.implementation.total +
                            data.hardware.total +
                            data.support.total +
                            data.hidden.total
                          ).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default DetailedCostBreakdown
