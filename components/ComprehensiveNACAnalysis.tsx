"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Cell,
  Tooltip as RechartsTooltip,
} from "recharts"
import { TrendingUp, AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react"

// Comprehensive Vendor Feature Matrix Component
export function VendorFeatureMatrix() {
  const features = {
    "Core NAC Features": {
      "802.1X Authentication": {
        portnox: true,
        cisco: true,
        aruba: true,
        juniper: true,
        forescout: true,
        meraki: true,
        microsoft: true,
        foxpass: true,
        packetfence: true,
        securew2: true,
        extreme: true,
        arista: true,
        fortinet: true,
      },
      "MAC Authentication Bypass": {
        portnox: true,
        cisco: true,
        aruba: true,
        juniper: true,
        forescout: true,
        meraki: true,
        microsoft: true,
        foxpass: true,
        packetfence: true,
        securew2: false,
        extreme: true,
        arista: true,
        fortinet: true,
      },
      "Guest Access Management": {
        portnox: true,
        cisco: true,
        aruba: true,
        juniper: true,
        forescout: true,
        meraki: true,
        microsoft: false,
        foxpass: false,
        packetfence: true,
        securew2: false,
        extreme: true,
        arista: true,
        fortinet: true,
      },
      "BYOD Onboarding": {
        portnox: true,
        cisco: true,
        aruba: true,
        juniper: true,
        forescout: true,
        meraki: true,
        microsoft: false,
        foxpass: false,
        packetfence: true,
        securew2: true,
        extreme: true,
        arista: true,
        fortinet: true,
      },
      "Device Profiling": {
        portnox: true,
        cisco: true,
        aruba: true,
        juniper: true,
        forescout: true,
        meraki: false,
        microsoft: false,
        foxpass: false,
        packetfence: true,
        securew2: false,
        extreme: true,
        arista: true,
        fortinet: true,
      },
      "Posture Assessment": {
        portnox: true,
        cisco: true,
        aruba: true,
        juniper: true,
        forescout: true,
        meraki: false,
        microsoft: false,
        foxpass: false,
        packetfence: false,
        securew2: false,
        extreme: true,
        arista: true,
        fortinet: true,
      },
    },
    "Zero Trust Capabilities": {
      "Continuous Verification": {
        portnox: true,
        cisco: true,
        aruba: true,
        juniper: true,
        forescout: true,
        meraki: false,
        microsoft: false,
        foxpass: false,
        packetfence: false,
        securew2: false,
        extreme: true,
        arista: true,
        fortinet: true,
      },
      "Risk-Based Access": {
        portnox: true,
        cisco: false,
        aruba: false,
        juniper: true,
        forescout: false,
        meraki: false,
        microsoft: false,
        foxpass: false,
        packetfence: false,
        securew2: false,
        extreme: false,
        arista: true,
        fortinet: false,
      },
      "Micro-Segmentation": {
        portnox: true,
        cisco: true,
        aruba: true,
        juniper: true,
        forescout: true,
        meraki: true,
        microsoft: false,
        foxpass: false,
        packetfence: true,
        securew2: false,
        extreme: true,
        arista: true,
        fortinet: true,
      },
      "Behavior Analytics": {
        portnox: true,
        cisco: false,
        aruba: false,
        juniper: true,
        forescout: false,
        meraki: false,
        microsoft: false,
        foxpass: false,
        packetfence: false,
        securew2: false,
        extreme: false,
        arista: true,
        fortinet: false,
      },
      "Automated Response": {
        portnox: true,
        cisco: true,
        aruba: true,
        juniper: true,
        forescout: true,
        meraki: true,
        microsoft: false,
        foxpass: false,
        packetfence: false,
        securew2: false,
        extreme: true,
        arista: true,
        fortinet: true,
      },
    },
    "Deployment & Management": {
      "Cloud-Native Architecture": {
        portnox: true,
        cisco: false,
        aruba: false,
        juniper: true,
        forescout: false,
        meraki: true,
        microsoft: false,
        foxpass: true,
        packetfence: false,
        securew2: true,
        extreme: false,
        arista: true,
        fortinet: false,
      },
      "No Hardware Required": {
        portnox: true,
        cisco: false,
        aruba: false,
        juniper: true,
        forescout: false,
        meraki: true,
        microsoft: false,
        foxpass: true,
        packetfence: false,
        securew2: true,
        extreme: false,
        arista: true,
        fortinet: false,
      },
      "Multi-Site Support": {
        portnox: true,
        cisco: true,
        aruba: true,
        juniper: true,
        forescout: true,
        meraki: true,
        microsoft: true,
        foxpass: true,
        packetfence: true,
        securew2: true,
        extreme: true,
        arista: true,
        fortinet: true,
      },
      "API Availability": {
        portnox: true,
        cisco: true,
        aruba: true,
        juniper: true,
        forescout: true,
        meraki: true,
        microsoft: false,
        foxpass: true,
        packetfence: true,
        securew2: true,
        extreme: true,
        arista: true,
        fortinet: true,
      },
      "SaaS Management": {
        portnox: true,
        cisco: false,
        aruba: false,
        juniper: true,
        forescout: false,
        meraki: true,
        microsoft: false,
        foxpass: true,
        packetfence: false,
        securew2: true,
        extreme: false,
        arista: true,
        fortinet: false,
      },
    },
    "Integration Capabilities": {
      "SIEM Integration": {
        portnox: true,
        cisco: true,
        aruba: true,
        juniper: true,
        forescout: true,
        meraki: true,
        microsoft: false,
        foxpass: false,
        packetfence: true,
        securew2: false,
        extreme: true,
        arista: true,
        fortinet: true,
      },
      "MDM Integration": {
        portnox: true,
        cisco: true,
        aruba: true,
        juniper: true,
        forescout: true,
        meraki: true,
        microsoft: false,
        foxpass: false,
        packetfence: false,
        securew2: false,
        extreme: true,
        arista: true,
        fortinet: true,
      },
      "Cloud IdP Support": {
        portnox: true,
        cisco: true,
        aruba: true,
        juniper: true,
        forescout: true,
        meraki: true,
        microsoft: true,
        foxpass: true,
        packetfence: false,
        securew2: true,
        extreme: true,
        arista: true,
        fortinet: true,
      },
      "Firewall Integration": {
        portnox: true,
        cisco: true,
        aruba: true,
        juniper: true,
        forescout: true,
        meraki: false,
        microsoft: false,
        foxpass: false,
        packetfence: true,
        securew2: false,
        extreme: true,
        arista: true,
        fortinet: true,
      },
    },
  }

  const vendors = [
    "portnox",
    "cisco",
    "aruba",
    "juniper",
    "forescout",
    "meraki",
    "microsoft",
    "foxpass",
    "packetfence",
    "securew2",
    "extreme",
    "arista",
    "fortinet",
  ]
  const vendorNames = {
    portnox: "Portnox CLEAR",
    cisco: "Cisco ISE",
    aruba: "Aruba ClearPass",
    juniper: "Juniper Mist",
    forescout: "Forescout",
    meraki: "Meraki AC",
    microsoft: "Microsoft NPS",
    foxpass: "FoxPass",
    packetfence: "PacketFence",
    securew2: "SecureW2",
    extreme: "Extreme NAC",
    arista: "Arista Agni",
    fortinet: "FortiNAC",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comprehensive Vendor Feature Comparison</CardTitle>
        <CardDescription>Detailed capability matrix across all NAC vendors</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="sticky left-0 bg-background z-10 w-[250px] text-left p-4">Feature</th>
                  {vendors.map((vendor) => (
                    <th key={vendor} className="text-center min-w-[120px] p-4">
                      {vendorNames[vendor]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(features).map(([category, categoryFeatures]) => (
                  <React.Fragment key={category}>
                    <tr>
                      <td colSpan={vendors.length + 1} className="bg-muted font-semibold p-4">
                        {category}
                      </td>
                    </tr>
                    {Object.entries(categoryFeatures).map(([feature, vendorSupport]) => (
                      <tr key={feature} className="border-b">
                        <td className="sticky left-0 bg-background z-10 p-4">{feature}</td>
                        {vendors.map((vendor) => (
                          <td key={vendor} className="text-center p-4">
                            {vendorSupport[vendor] ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

// Risk Assessment Dashboard Component
export function RiskAssessmentDashboard({ industry = "healthcare", devices = 500 }) {
  const riskScenarios = [
    {
      threat: "Ransomware Attack",
      withoutNAC: { probability: 28, impact: 4500000, duration: 21 },
      withBasicNAC: { probability: 18, impact: 3200000, duration: 14 },
      withPortnox: { probability: 4, impact: 850000, duration: 3 },
    },
    {
      threat: "Insider Threat",
      withoutNAC: { probability: 22, impact: 2800000, duration: 45 },
      withBasicNAC: { probability: 15, impact: 2100000, duration: 30 },
      withPortnox: { probability: 5, impact: 450000, duration: 7 },
    },
    {
      threat: "Supply Chain Compromise",
      withoutNAC: { probability: 18, impact: 3200000, duration: 60 },
      withBasicNAC: { probability: 12, impact: 2400000, duration: 45 },
      withPortnox: { probability: 3, impact: 650000, duration: 14 },
    },
    {
      threat: "Zero-Day Exploit",
      withoutNAC: { probability: 15, impact: 3800000, duration: 14 },
      withBasicNAC: { probability: 10, impact: 2800000, duration: 10 },
      withPortnox: { probability: 2, impact: 750000, duration: 2 },
    },
  ]

  const annualRiskCost = (scenarios) => {
    return scenarios.reduce((total, scenario) => {
      const cost = (scenario.probability / 100) * scenario.impact
      return total + cost
    }, 0)
  }

  const withoutNACRisk = annualRiskCost(riskScenarios.map((s) => s.withoutNAC))
  const withBasicNACRisk = annualRiskCost(riskScenarios.map((s) => s.withBasicNAC))
  const withPortnoxRisk = annualRiskCost(riskScenarios.map((s) => s.withPortnox))

  return (
    <div className="space-y-6">
      {/* Risk Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-red-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Without NAC</CardTitle>
            <CardDescription>Current risk exposure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">${(withoutNACRisk / 1000000).toFixed(1)}M</div>
            <p className="text-sm text-muted-foreground">Annual risk exposure</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Avg breach probability</span>
                <span className="font-medium">21%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Avg recovery time</span>
                <span className="font-medium">35 days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">With Basic NAC</CardTitle>
            <CardDescription>Traditional NAC protection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">${(withBasicNACRisk / 1000000).toFixed(1)}M</div>
            <p className="text-sm text-muted-foreground">Annual risk exposure</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Risk reduction</span>
                <span className="font-medium text-yellow-600">
                  -{Math.round((1 - withBasicNACRisk / withoutNACRisk) * 100)}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Avg recovery time</span>
                <span className="font-medium">25 days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">With Portnox CLEAR</CardTitle>
            <CardDescription>Zero Trust NAC protection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">${(withPortnoxRisk / 1000000).toFixed(1)}M</div>
            <p className="text-sm text-muted-foreground">Annual risk exposure</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Risk reduction</span>
                <span className="font-medium text-green-600">
                  -{Math.round((1 - withPortnoxRisk / withoutNACRisk) * 100)}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Avg recovery time</span>
                <span className="font-medium">6.5 days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Threat Scenario Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Threat Scenario Impact Analysis</CardTitle>
          <CardDescription>Probability and financial impact by protection level</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={riskScenarios.map((scenario) => ({
                threat: scenario.threat,
                "No NAC": (scenario.withoutNAC.probability * scenario.withoutNAC.impact) / 100000,
                "Basic NAC": (scenario.withBasicNAC.probability * scenario.withBasicNAC.impact) / 100000,
                Portnox: (scenario.withPortnox.probability * scenario.withPortnox.impact) / 100000,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="threat" angle={-15} textAnchor="end" height={80} />
              <YAxis tickFormatter={(value) => `$${value}k`} />
              <RechartsTooltip formatter={(value) => `$${(value * 1000).toLocaleString()}`} />
              <Legend />
              <Bar dataKey="No NAC" fill="#ef4444" />
              <Bar dataKey="Basic NAC" fill="#f59e0b" />
              <Bar dataKey="Portnox" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Security Metrics Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Security Control Effectiveness Heatmap</CardTitle>
          <CardDescription>How different NAC solutions address security controls</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-1"></div>
            <div className="text-center font-medium">No NAC</div>
            <div className="text-center font-medium">Basic NAC</div>
            <div className="text-center font-medium">Portnox</div>

            {[
              { control: "Identity Verification", scores: [20, 70, 95] },
              { control: "Device Trust", scores: [10, 65, 92] },
              { control: "Network Segmentation", scores: [15, 75, 94] },
              { control: "Threat Detection", scores: [25, 60, 90] },
              { control: "Automated Response", scores: [5, 50, 91] },
              { control: "Compliance Monitoring", scores: [30, 70, 93] },
            ].map(({ control, scores }) => (
              <React.Fragment key={control}>
                <div className="text-sm font-medium">{control}</div>
                {scores.map((score, idx) => (
                  <div
                    key={idx}
                    className={`h-16 flex items-center justify-center text-white font-bold rounded ${
                      score >= 90
                        ? "bg-green-600"
                        : score >= 70
                          ? "bg-yellow-600"
                          : score >= 50
                            ? "bg-orange-600"
                            : "bg-red-600"
                    }`}
                  >
                    {score}%
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Implementation Complexity Analyzer
export function ImplementationComplexityAnalyzer() {
  const vendors = [
    {
      name: "Portnox CLEAR",
      complexity: "Low",
      score: 25,
      timeToValue: 7,
      requiredSkills: ["Basic networking", "Cloud services"],
      prerequisites: ["Internet connectivity", "Active Directory"],
      risks: ["Change management", "User training"],
    },
    {
      name: "Cisco ISE",
      complexity: "Very High",
      score: 85,
      timeToValue: 90,
      requiredSkills: ["Cisco certification", "RADIUS expertise", "PKI knowledge", "Network architecture"],
      prerequisites: ["Hardware procurement", "Server infrastructure", "Database setup", "Load balancers"],
      risks: [
        "Downtime during migration",
        "Configuration complexity",
        "Performance tuning",
        "High expertise requirement",
      ],
    },
    {
      name: "Aruba ClearPass",
      complexity: "High",
      score: 70,
      timeToValue: 60,
      requiredSkills: ["Aruba networking", "RADIUS", "PKI basics"],
      prerequisites: ["Hardware/VM infrastructure", "Database", "Certificates"],
      risks: ["Complex policy migration", "Integration challenges", "Scaling issues"],
    },
    {
      name: "Forescout",
      complexity: "High",
      score: 75,
      timeToValue: 75,
      requiredSkills: ["Network architecture", "Security operations", "OT/IoT knowledge"],
      prerequisites: ["Appliances", "Span ports", "Database infrastructure"],
      risks: ["Network redesign needed", "Performance impact", "Complex integrations"],
    },
    {
      name: "PacketFence",
      complexity: "Very High",
      score: 90,
      timeToValue: 120,
      requiredSkills: ["Linux administration", "Perl programming", "RADIUS", "Network engineering"],
      prerequisites: ["Linux servers", "Open source stack", "Custom development"],
      risks: ["Limited support", "Requires deep expertise", "Customization complexity"],
    },
  ]

  return (
    <div className="space-y-6">
      {/* Complexity Score Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Complexity Score</CardTitle>
          <CardDescription>Lower scores indicate easier implementation</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vendors} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={120} />
              <RechartsTooltip />
              <Bar
                dataKey="score"
                fill={(entry) => {
                  if (entry.score <= 30) return "#10b981"
                  if (entry.score <= 50) return "#3b82f6"
                  if (entry.score <= 70) return "#f59e0b"
                  return "#ef4444"
                }}
              >
                {vendors.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.score <= 30
                        ? "#10b981"
                        : entry.score <= 50
                          ? "#3b82f6"
                          : entry.score <= 70
                            ? "#f59e0b"
                            : "#ef4444"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Time to Value Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Time to Value Analysis</CardTitle>
          <CardDescription>Days until first production deployment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vendors.map((vendor) => (
              <div key={vendor.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{vendor.name}</span>
                  <span className="text-sm text-muted-foreground">{vendor.timeToValue} days</span>
                </div>
                <Progress value={((120 - vendor.timeToValue) / 120) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Implementation Requirements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {vendors.slice(0, 4).map((vendor) => (
          <Card key={vendor.name}>
            <CardHeader>
              <CardTitle className="text-lg">{vendor.name}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    vendor.complexity === "Low"
                      ? "success"
                      : vendor.complexity === "Medium"
                        ? "default"
                        : vendor.complexity === "High"
                          ? "warning"
                          : "destructive"
                  }
                >
                  {vendor.complexity} Complexity
                </Badge>
                <Badge variant="outline">{vendor.timeToValue} days to deploy</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {vendor.requiredSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Prerequisites</h4>
                <ul className="text-sm space-y-1">
                  {vendor.prerequisites.map((prereq) => (
                    <li key={prereq} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                      {prereq}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Implementation Risks</h4>
                <ul className="text-sm space-y-1">
                  {vendor.risks.map((risk) => (
                    <li key={risk} className="flex items-start gap-2">
                      <AlertTriangle className="h-3 w-3 text-yellow-500 mt-0.5" />
                      <span className="text-muted-foreground">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Hidden Cost Calculator Component
export function HiddenCostCalculator({ devices = 500, years = 3 }) {
  const hiddenCosts = {
    portnox: {
      name: "Portnox CLEAR",
      training: { initial: 2500, ongoing: 500 },
      downtime: { hours: 0, costPerHour: 5000 },
      staffing: { fte: 0.1, annualCost: 90000 },
      infrastructure: { servers: 0, storage: 0, network: 0 },
      migration: { professional: 5000, internal: 2000 },
      compliance: { audit: 10000, documentation: 2000 },
      opportunity: { delayedProjects: 0, missedSavings: 0 },
    },
    cisco: {
      name: "Cisco ISE",
      training: { initial: 15000, ongoing: 5000 },
      downtime: { hours: 16, costPerHour: 5000 },
      staffing: { fte: 0.5, annualCost: 90000 },
      infrastructure: { servers: 50000, storage: 20000, network: 25000 },
      migration: { professional: 50000, internal: 25000 },
      compliance: { audit: 20000, documentation: 10000 },
      opportunity: { delayedProjects: 50000, missedSavings: 100000 },
    },
    aruba: {
      name: "Aruba ClearPass",
      training: { initial: 10000, ongoing: 3000 },
      downtime: { hours: 8, costPerHour: 5000 },
      staffing: { fte: 0.3, annualCost: 90000 },
      infrastructure: { servers: 30000, storage: 15000, network: 15000 },
      migration: { professional: 35000, internal: 15000 },
      compliance: { audit: 15000, documentation: 7000 },
      opportunity: { delayedProjects: 30000, missedSavings: 60000 },
    },
  }

  const calculateHiddenCosts = (vendor) => {
    const costs = hiddenCosts[vendor]
    const totalTraining = costs.training.initial + costs.training.ongoing * years
    const totalDowntime = costs.downtime.hours * costs.downtime.costPerHour
    const totalStaffing = costs.staffing.fte * costs.staffing.annualCost * years
    const totalInfrastructure =
      costs.infrastructure.servers + costs.infrastructure.storage + costs.infrastructure.network
    const totalMigration = costs.migration.professional + costs.migration.internal
    const totalCompliance = (costs.compliance.audit + costs.compliance.documentation) * years
    const totalOpportunity = costs.opportunity.delayedProjects + costs.opportunity.missedSavings

    return {
      training: totalTraining,
      downtime: totalDowntime,
      staffing: totalStaffing,
      infrastructure: totalInfrastructure,
      migration: totalMigration,
      compliance: totalCompliance,
      opportunity: totalOpportunity,
      total:
        totalTraining +
        totalDowntime +
        totalStaffing +
        totalInfrastructure +
        totalMigration +
        totalCompliance +
        totalOpportunity,
    }
  }

  const vendorTotals = Object.entries(hiddenCosts).map(([key, vendor]) => ({
    vendor: vendor.name,
    ...calculateHiddenCosts(key),
  }))

  return (
    <div className="space-y-6">
      {/* Hidden Cost Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Hidden Cost Analysis</CardTitle>
          <CardDescription>Often overlooked costs over {years} years</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={vendorTotals}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="vendor" />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <RechartsTooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="training" stackId="a" fill="#8b5cf6" name="Training" />
              <Bar dataKey="downtime" stackId="a" fill="#ef4444" name="Downtime" />
              <Bar dataKey="staffing" stackId="a" fill="#f59e0b" name="Additional Staffing" />
              <Bar dataKey="infrastructure" stackId="a" fill="#3b82f6" name="Infrastructure" />
              <Bar dataKey="migration" stackId="a" fill="#10b981" name="Migration" />
              <Bar dataKey="compliance" stackId="a" fill="#6366f1" name="Compliance" />
              <Bar dataKey="opportunity" stackId="a" fill="#ec4899" name="Opportunity Cost" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vendorTotals.map((vendor) => (
          <Card key={vendor.vendor}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{vendor.vendor}</CardTitle>
              <CardDescription>
                Total Hidden Costs: <span className="font-bold text-foreground">${vendor.total.toLocaleString()}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Training & Certification</span>
                <span>${vendor.training.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Downtime Costs</span>
                <span className={vendor.downtime > 0 ? "text-red-600" : ""}>${vendor.downtime.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Additional Staffing</span>
                <span>${vendor.staffing.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Infrastructure</span>
                <span>${vendor.infrastructure.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Migration Costs</span>
                <span>${vendor.migration.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Compliance Overhead</span>
                <span>${vendor.compliance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Opportunity Cost</span>
                <span>${vendor.opportunity.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Insights */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Key Finding:</strong> Hidden costs can add{" "}
          {Math.round((vendorTotals[1].total / vendorTotals[0].total - 1) * 100)}% more to Cisco ISE's TCO compared to
          Portnox CLEAR. The largest differentiators are staffing requirements (
          {Math.round((vendorTotals[1].staffing - vendorTotals[0].staffing) / 1000)}k), infrastructure (
          {Math.round((vendorTotals[1].infrastructure - vendorTotals[0].infrastructure) / 1000)}k), and opportunity
          costs.
        </AlertDescription>
      </Alert>
    </div>
  )
}

// Scalability Analysis Component
export function ScalabilityAnalysis() {
  const scalabilityData = [
    { devices: 100, portnox: 6000, cisco: 12500, aruba: 9500, forescout: 8500 },
    { devices: 500, portnox: 27000, cisco: 62500, aruba: 47500, forescout: 42500 },
    { devices: 1000, portnox: 48000, cisco: 110000, aruba: 82000, forescout: 74000 },
    { devices: 2500, portnox: 105000, cisco: 245000, aruba: 187500, forescout: 170000 },
    { devices: 5000, portnox: 210000, cisco: 490000, aruba: 375000, forescout: 340000 },
    { devices: 10000, portnox: 360000, cisco: 850000, aruba: 680000, forescout: 600000 },
    { devices: 25000, portnox: 750000, cisco: 1875000, aruba: 1500000, forescout: 1350000 },
    { devices: 50000, portnox: 1400000, cisco: 3500000, aruba: 2800000, forescout: 2550000 },
  ]

  const performanceMetrics = [
    {
      vendor: "Portnox CLEAR",
      metrics: {
        authPerSecond: 10000,
        concurrentSessions: 100000,
        latency: 5,
        availability: 99.99,
        geoRedundancy: true,
        autoScaling: true,
      },
    },
    {
      vendor: "Cisco ISE",
      metrics: {
        authPerSecond: 5000,
        concurrentSessions: 50000,
        latency: 15,
        availability: 99.9,
        geoRedundancy: true,
        autoScaling: false,
      },
    },
    {
      vendor: "Aruba ClearPass",
      metrics: {
        authPerSecond: 3000,
        concurrentSessions: 25000,
        latency: 20,
        availability: 99.5,
        geoRedundancy: true,
        autoScaling: false,
      },
    },
  ]

  return (
    <div className="space-y-6">
      {/* Cost Scaling Curve */}
      <Card>
        <CardHeader>
          <CardTitle>TCO Scaling Analysis</CardTitle>
          <CardDescription>How costs scale with organization size</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={scalabilityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="devices"
                scale="log"
                domain={[100, 50000]}
                tickFormatter={(value) => `${(value / 1000).toFixed(value >= 1000 ? 0 : 1)}k`}
              />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <RechartsTooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="portnox" stroke="#10b981" strokeWidth={3} name="Portnox CLEAR" />
              <Line type="monotone" dataKey="cisco" stroke="#3b82f6" strokeWidth={2} name="Cisco ISE" />
              <Line type="monotone" dataKey="aruba" stroke="#f59e0b" strokeWidth={2} name="Aruba ClearPass" />
              <Line type="monotone" dataKey="forescout" stroke="#8b5cf6" strokeWidth={2} name="Forescout" />
            </LineChart>
          </ResponsiveContainer>
          <Alert className="mt-4">
            <TrendingUp className="h-4 w-4" />
            <AlertDescription>
              Portnox CLEAR shows linear scaling with predictable per-device costs, while traditional vendors exhibit
              step-function increases due to hardware requirements and licensing tiers.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Performance at Scale */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics at Scale</CardTitle>
          <CardDescription>How vendors perform under load</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {performanceMetrics.map(({ vendor, metrics }) => (
              <div key={vendor} className="space-y-3">
                <h4 className="font-semibold">{vendor}</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Auth/Second</p>
                    <p className="text-2xl font-bold">{metrics.authPerSecond.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Concurrent Sessions</p>
                    <p className="text-2xl font-bold">{(metrics.concurrentSessions / 1000).toFixed(0)}k</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Latency</p>
                    <p className="text-2xl font-bold">{metrics.latency}ms</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Availability</p>
                    <p className="text-2xl font-bold">{metrics.availability}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Geo-Redundancy</p>
                    <p className="text-2xl font-bold">{metrics.geoRedundancy ? "✓" : "✗"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Auto-Scaling</p>
                    <p className="text-2xl font-bold">{metrics.autoScaling ? "✓" : "✗"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Growth Readiness Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Growth Readiness Assessment</CardTitle>
          <CardDescription>Evaluating vendors for future scalability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-2 text-sm">
              <div className="font-medium">Factor</div>
              <div className="text-center">Portnox</div>
              <div className="text-center">Cisco</div>
              <div className="text-center">Aruba</div>
              <div className="text-center">Forescout</div>

              {[
                { factor: "Linear Cost Scaling", scores: [95, 60, 65, 70] },
                { factor: "No Hardware Limits", scores: [100, 40, 45, 50] },
                { factor: "Cloud Elasticity", scores: [100, 20, 30, 60] },
                { factor: "Multi-Site Support", scores: [95, 85, 80, 85] },
                { factor: "API Scalability", scores: [90, 75, 70, 75] },
                { factor: "Management Overhead", scores: [90, 50, 60, 55] },
              ].map(({ factor, scores }) => (
                <React.Fragment key={factor}>
                  <div className="text-muted-foreground">{factor}</div>
                  {scores.map((score, idx) => (
                    <div key={idx} className="text-center">
                      <Badge variant={score >= 80 ? "success" : score >= 60 ? "warning" : "destructive"}>{score}</Badge>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Export all components
export default function ComprehensiveNACAnalysis() {
  const [activeTab, setActiveTab] = useState("feature-matrix")

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Comprehensive NAC Analysis Suite</h1>
        <p className="text-muted-foreground">Deep-dive analysis tools for NAC vendor evaluation and decision making</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="feature-matrix">Feature Matrix</TabsTrigger>
          <TabsTrigger value="risk-assessment">Risk Assessment</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="hidden-costs">Hidden Costs</TabsTrigger>
        </TabsList>

        <TabsContent value="feature-matrix">
          <VendorFeatureMatrix />
        </TabsContent>

        <TabsContent value="risk-assessment">
          <RiskAssessmentDashboard />
        </TabsContent>

        <TabsContent value="implementation">
          <ImplementationComplexityAnalyzer />
        </TabsContent>

        <TabsContent value="hidden-costs">
          <HiddenCostCalculator />
        </TabsContent>
      </Tabs>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Additional Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ScalabilityAnalysis />
        </CardContent>
      </Card>
    </div>
  )
}
