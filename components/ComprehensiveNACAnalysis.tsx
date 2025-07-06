"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
  Tooltip as RechartsTooltip,
} from "recharts"
import { CheckCircle, XCircle, Shield } from "lucide-react"

// Enhanced Vendor Feature Matrix Component with comprehensive coverage
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
        ivanti: true,
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
        ivanti: true,
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
        ivanti: true,
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
        ivanti: true,
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
        ivanti: true,
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
        ivanti: true,
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
        ivanti: true,
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
        ivanti: false,
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
        ivanti: true,
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
        ivanti: false,
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
        ivanti: true,
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
        ivanti: false,
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
        ivanti: false,
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
        ivanti: true,
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
        ivanti: true,
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
        ivanti: false,
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
        ivanti: true,
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
        ivanti: true,
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
        ivanti: true,
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
        ivanti: true,
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
    "ivanti",
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
    ivanti: "Ivanti Pulse",
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

// Enhanced Risk Assessment Dashboard with detailed threat modeling
export function RiskAssessmentDashboard({ industry = "healthcare", devices = 500 }) {
  const enhancedRiskScenarios = [
    {
      threat: "Advanced Persistent Threat (APT)",
      category: "External",
      withoutNAC: { probability: 32, impact: 8500000, duration: 180, detection: 287 },
      withBasicNAC: { probability: 22, impact: 6200000, duration: 120, detection: 180 },
      withPortnox: { probability: 6, impact: 1200000, duration: 21, detection: 24 },
    },
    {
      threat: "Ransomware Attack",
      category: "Malware",
      withoutNAC: { probability: 28, impact: 4500000, duration: 21, detection: 196 },
      withBasicNAC: { probability: 18, impact: 3200000, duration: 14, detection: 120 },
      withPortnox: { probability: 4, impact: 850000, duration: 3, detection: 8 },
    },
    {
      threat: "Insider Threat - Malicious",
      category: "Internal",
      withoutNAC: { probability: 22, impact: 2800000, duration: 45, detection: 85 },
      withBasicNAC: { probability: 15, impact: 2100000, duration: 30, detection: 60 },
      withPortnox: { probability: 5, impact: 450000, duration: 7, detection: 12 },
    },
    {
      threat: "Supply Chain Compromise",
      category: "Third-party",
      withoutNAC: { probability: 18, impact: 3200000, duration: 60, detection: 205 },
      withBasicNAC: { probability: 12, impact: 2400000, duration: 45, detection: 150 },
      withPortnox: { probability: 3, impact: 650000, duration: 14, detection: 18 },
    },
    {
      threat: "Zero-Day Exploit",
      category: "Vulnerability",
      withoutNAC: { probability: 15, impact: 3800000, duration: 14, detection: 156 },
      withBasicNAC: { probability: 10, impact: 2800000, duration: 10, detection: 90 },
      withPortnox: { probability: 2, impact: 750000, duration: 2, detection: 6 },
    },
    {
      threat: "IoT Device Compromise",
      category: "Device",
      withoutNAC: { probability: 35, impact: 1800000, duration: 30, detection: 120 },
      withBasicNAC: { probability: 25, impact: 1200000, duration: 20, detection: 75 },
      withPortnox: { probability: 8, impact: 300000, duration: 5, detection: 4 },
    },
  ]

  const cyberMaturityLevels = {
    initial: {
      level: 1,
      description: "Ad-hoc security practices",
      characteristics: ["Reactive security", "Basic perimeter defense", "Limited visibility"],
      riskMultiplier: 2.5,
    },
    developing: {
      level: 2,
      description: "Documented security processes",
      characteristics: ["Some automation", "Basic monitoring", "Incident response plan"],
      riskMultiplier: 2.0,
    },
    defined: {
      level: 3,
      description: "Standardized security framework",
      characteristics: ["Risk-based approach", "Regular assessments", "Security awareness"],
      riskMultiplier: 1.5,
    },
    managed: {
      level: 4,
      description: "Quantitatively managed security",
      characteristics: ["Metrics-driven", "Continuous monitoring", "Threat intelligence"],
      riskMultiplier: 1.2,
    },
    optimizing: {
      level: 5,
      description: "Continuously improving security",
      characteristics: ["Zero Trust architecture", "AI-driven defense", "Predictive analytics"],
      riskMultiplier: 0.8,
    },
  }

  const annualRiskCost = (scenarios) => {
    return scenarios.reduce((total, scenario) => {
      const cost = (scenario.probability / 100) * scenario.impact
      return total + cost
    }, 0)
  }

  const withoutNACRisk = annualRiskCost(enhancedRiskScenarios.map((s) => s.withoutNAC))
  const withBasicNACRisk = annualRiskCost(enhancedRiskScenarios.map((s) => s.withBasicNAC))
  const withPortnoxRisk = annualRiskCost(enhancedRiskScenarios.map((s) => s.withPortnox))

  return (
    <div className="space-y-6">
      {/* Enhanced Risk Overview Cards */}
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
                <span className="font-medium">25%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Avg detection time</span>
                <span className="font-medium">175 days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Avg recovery time</span>
                <span className="font-medium">55 days</span>
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
                <span>Avg detection time</span>
                <span className="font-medium">112 days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Avg recovery time</span>
                <span className="font-medium">35 days</span>
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
                <span>Avg detection time</span>
                <span className="font-medium">12 days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Avg recovery time</span>
                <span className="font-medium">8.5 days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cyber Maturity Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Cybersecurity Maturity Assessment</CardTitle>
          <CardDescription>How NAC implementation affects organizational security maturity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              {Object.entries(cyberMaturityLevels).map(([key, level]) => (
                <div key={key} className="flex items-center space-x-4 p-3 border rounded-lg">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        level.level <= 2
                          ? "bg-red-500"
                          : level.level === 3
                            ? "bg-yellow-500"
                            : level.level === 4
                              ? "bg-blue-500"
                              : "bg-green-500"
                      }`}
                    >
                      {level.level}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{level.description}</h4>
                    <p className="text-sm text-muted-foreground">{level.characteristics.join(" • ")}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={level.level >= 4 ? "default" : "destructive"}>{level.riskMultiplier}x Risk</Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Portnox CLEAR Impact on Maturity</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Current State (Without NAC)</span>
                  <Badge variant="destructive">Level 2 - Developing</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">With Basic NAC</span>
                  <Badge variant="secondary">Level 3 - Defined</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">With Portnox CLEAR</span>
                  <Badge variant="default" className="bg-green-500">
                    Level 5 - Optimizing
                  </Badge>
                </div>
              </div>

              <Alert className="mt-4">
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <strong>Maturity Advancement:</strong> Portnox CLEAR enables a 3-level jump in cybersecurity maturity,
                  moving organizations from reactive to predictive security postures with Zero Trust architecture and
                  AI-driven threat detection.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Threat Scenario Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Threat Scenario Analysis</CardTitle>
          <CardDescription>Comprehensive threat modeling with detection and response times</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={enhancedRiskScenarios.map((scenario) => ({
                threat: scenario.threat.split(" ")[0], // Shortened for display
                category: scenario.category,
                "No NAC": (scenario.withoutNAC.probability * scenario.withoutNAC.impact) / 100000,
                "Basic NAC": (scenario.withBasicNAC.probability * scenario.withBasicNAC.impact) / 100000,
                Portnox: (scenario.withPortnox.probability * scenario.withPortnox.impact) / 100000,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="threat" angle={-45} textAnchor="end" height={100} />
              <YAxis tickFormatter={(value) => `$${value}k`} />
              <RechartsTooltip
                formatter={(value, name, props) => [
                  `$${(value * 1000).toLocaleString()}`,
                  name,
                  `Category: ${props.payload.category}`,
                ]}
              />
              <Legend />
              <Bar dataKey="No NAC" fill="#ef4444" />
              <Bar dataKey="Basic NAC" fill="#f59e0b" />
              <Bar dataKey="Portnox" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detection Time Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Threat Detection Time Analysis</CardTitle>
          <CardDescription>Mean time to detection (MTTD) across different threat scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={enhancedRiskScenarios.map((scenario) => ({
                threat: scenario.threat.split(" ")[0],
                "No NAC": scenario.withoutNAC.detection,
                "Basic NAC": scenario.withBasicNAC.detection,
                Portnox: scenario.withPortnox.detection,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="threat" />
              <YAxis tickFormatter={(value) => `${value}d`} />
              <RechartsTooltip formatter={(value) => [`${value} days`, "Detection Time"]} />
              <Legend />
              <Line type="monotone" dataKey="No NAC" stroke="#ef4444" strokeWidth={3} />
              <Line type="monotone" dataKey="Basic NAC" stroke="#f59e0b" strokeWidth={3} />
              <Line type="monotone" dataKey="Portnox" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Industry-Specific Risk Factors */}
      <Card>
        <CardHeader>
          <CardTitle>Industry-Specific Risk Assessment</CardTitle>
          <CardDescription>Risk factors and compliance requirements for {industry}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Industry Risk Profile</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Regulatory Pressure</span>
                  <Badge
                    variant={
                      industry === "healthcare" || industry === "financial_services" ? "destructive" : "secondary"
                    }
                  >
                    {industry === "healthcare" || industry === "financial_services"
                      ? "Very High"
                      : industry === "government"
                        ? "Critical"
                        : "Medium"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average Breach Cost</span>
                  <span className="font-medium">
                    $
                    {industry === "healthcare"
                      ? "10.93M"
                      : industry === "financial_services"
                        ? "5.85M"
                        : industry === "government"
                          ? "4.91M"
                          : "4.45M"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Downtime Impact</span>
                  <Badge
                    variant={
                      industry === "healthcare" || industry === "financial_services" ? "destructive" : "secondary"
                    }
                  >
                    {industry === "healthcare"
                      ? "Critical"
                      : industry === "financial_services"
                        ? "Severe"
                        : industry === "manufacturing"
                          ? "High"
                          : "Medium"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Required Compliance Frameworks</h4>
              <div className="flex flex-wrap gap-2">
                {industry === "healthcare" && (
                  <>
                    <Badge>HIPAA</Badge>
                    <Badge>HITECH</Badge>
                    <Badge>FDA 21 CFR Part 11</Badge>
                  </>
                )}
                {industry === "financial_services" && (
                  <>
                    <Badge>PCI-DSS</Badge>
                    <Badge>SOX</Badge>
                    <Badge>GLBA</Badge>
                    <Badge>FFIEC</Badge>
                  </>
                )}
                {industry === "government" && (
                  <>
                    <Badge>FedRAMP</Badge>
                    <Badge>FISMA</Badge>
                    <Badge>NIST 800-53</Badge>
                  </>
                )}
                <Badge>ISO 27001</Badge>
                <Badge>GDPR</Badge>
              </div>
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
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="feature-matrix">Feature Matrix</TabsTrigger>
          <TabsTrigger value="risk-assessment">Risk Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="feature-matrix">
          <VendorFeatureMatrix />
        </TabsContent>

        <TabsContent value="risk-assessment">
          <RiskAssessmentDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
