import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Cell,
  Tooltip as RechartsTooltip,
} from "recharts"
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react"

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
      name: 'Portnox CLEAR',
      training
