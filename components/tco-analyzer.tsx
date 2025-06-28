"use client"

import type React from "react"
import { useState } from "react"
import { BarChart3, DollarSign, TrendingUp, Shield, Users, Grid } from "lucide-react"

import TCOOverview from "./tco-overview"
import VendorComparison from "./vendor-comparison"
import FeatureMatrix from "./feature-matrix"
import DetailedCostBreakdown from "./detailed-cost-breakdown"
import ROIBusinessValue from "./roi-business-value"
import ComplianceRiskView from "./compliance-risk-view"

interface Configuration {
  devices: number
  users: number
  industry: string
  orgSize: string
  years: number
  region: string
  portnoxBasePrice: number
}

interface Results {
  [vendor: string]: {
    tco: number
    roi: number
    complianceScore: number
    featureScore: number
  }
}

interface TCOAnalyzerProps {
  results: Results
  selectedVendors: string[]
  darkMode: boolean
}

const TCOAnalyzer: React.FC<TCOAnalyzerProps> = ({ results, selectedVendors, darkMode }) => {
  const [activeView, setActiveView] = useState("overview")

  const views = [
    { id: "overview", name: "Overview", icon: BarChart3 },
    { id: "detailed-costs", name: "Detailed Costs", icon: DollarSign },
    { id: "roi-business", name: "ROI & Business Value", icon: TrendingUp },
    { id: "compliance-risk", name: "Compliance & Risk", icon: Shield },
    { id: "vendor-comparison", name: "Vendor Comparison", icon: Users },
    { id: "feature-matrix", name: "Feature Matrix", icon: Grid },
  ]

  const [configuration, setConfiguration] = useState({
    devices: 2500,
    users: 1500,
    industry: "technology",
    orgSize: "medium",
    years: 3,
    region: "north-america",
    portnoxBasePrice: 3.0,
  })

  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {views.map((view) => (
          <button
            key={view.id}
            className={`px-4 py-2 flex items-center gap-2 ${
              activeView === view.id
                ? "border-b-2 border-blue-500 text-blue-500 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveView(view.id)}
          >
            <view.icon className="h-4 w-4" />
            {view.name}
          </button>
        ))}
      </div>

      <div className="p-4 flex-grow overflow-y-auto">
        {activeView === "overview" && (
          <TCOOverview results={results} configuration={configuration} darkMode={darkMode} />
        )}

        {activeView === "detailed-costs" && (
          <DetailedCostBreakdown
            results={results}
            years={configuration.years}
            darkMode={darkMode}
            configuration={configuration}
          />
        )}

        {activeView === "roi-business" && (
          <ROIBusinessValue results={results} configuration={configuration} darkMode={darkMode} />
        )}

        {activeView === "compliance-risk" && (
          <ComplianceRiskView
            results={results}
            industry={configuration.industry}
            selectedVendors={selectedVendors}
            darkMode={darkMode}
          />
        )}

        {activeView === "vendor-comparison" && (
          <VendorComparison results={results} selectedVendors={selectedVendors} darkMode={darkMode} />
        )}

        {activeView === "feature-matrix" && (
          <FeatureMatrix results={results} selectedVendors={selectedVendors} darkMode={darkMode} />
        )}
      </div>
    </div>
  )
}

export default TCOAnalyzer
