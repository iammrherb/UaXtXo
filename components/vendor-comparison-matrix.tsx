"use client"

import { CardDescription } from "@/components/ui/card"
import { useMemo } from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
} from "recharts"
import {
  Star,
  TrendingUp,
  Shield,
  Clock,
  DollarSign,
  Users,
  Zap,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Filter,
  RotateCcw,
  Download,
  FileText,
} from "lucide-react"

interface VendorComparisonMatrixProps {
  selectedVendors: string[]
  onVendorSelectionChange: (vendors: string[]) => void
}

// Scoring criteria with weights
const SCORING_CRITERIA = {
  cost: {
    name: "Total Cost of Ownership",
    weight: 25,
    description: "3-year TCO including all costs",
    icon: <DollarSign className="h-4 w-4" />,
  },
  features: {
    name: "Feature Completeness",
    weight: 20,
    description: "Breadth and depth of NAC capabilities",
    icon: <Zap className="h-4 w-4" />,
  },
  security: {
    name: "Security Posture",
    weight: 20,
    description: "Zero-trust and advanced security features",
    icon: <Shield className="h-4 w-4" />,
  },
  deployment: {
    name: "Deployment Ease",
    weight: 15,
    description: "Implementation complexity and time",
    icon: <Clock className="h-4 w-4" />,
  },
  support: {
    name: "Vendor Support",
    weight: 10,
    description: "Support quality and availability",
    icon: <Users className="h-4 w-4" />,
  },
  innovation: {
    name: "Innovation & Roadmap",
    weight: 10,
    description: "Technology leadership and future vision",
    icon: <TrendingUp className="h-4 w-4" />,
  },
}

// Feature categories for detailed comparison
const FEATURE_CATEGORIES = {
  authentication: {
    name: "Authentication & Identity",
    features: [
      "802.1X Authentication",
      "MAC Authentication Bypass",
      "Web Authentication",
      "Certificate-based Auth",
      "Multi-factor Authentication",
      "Risk-based Authentication",
      "Continuous Authentication",
      "Biometric Authentication",
    ],
  },
  networkControl: {
    name: "Network Access Control",
    features: [
      "Dynamic VLAN Assignment",
      "Port-based Access Control",
      "Wireless NAC",
      "VPN Integration",
      "Network Segmentation",
      "Micro-segmentation",
      "Software-defined Perimeter",
      "Zero Trust Network Access",
    ],
  },
  deviceManagement: {
    name: "Device Management",
    features: [
      "Device Profiling",
      "IoT Device Discovery",
      "BYOD Support",
      "Device Compliance Checking",
      "Endpoint Health Assessment",
      "Device Quarantine",
      "Automated Remediation",
      "Device Lifecycle Management",
    ],
  },
  security: {
    name: "Advanced Security",
    features: [
      "Threat Detection",
      "Behavioral Analytics",
      "Anomaly Detection",
      "Threat Intelligence Integration",
      "Incident Response",
      "Security Orchestration",
      "Threat Hunting",
      "Forensic Analysis",
    ],
  },
  compliance: {
    name: "Compliance & Reporting",
    features: [
      "Compliance Monitoring",
      "Audit Reporting",
      "Policy Management",
      "Real-time Dashboards",
      "Custom Reports",
      "Compliance Templates",
      "Automated Compliance",
      "Regulatory Mapping",
    ],
  },
  integration: {
    name: "Integration & APIs",
    features: [
      "SIEM Integration",
      "ITSM Integration",
      "Directory Integration",
      "Cloud Platform Integration",
      "REST APIs",
      "Webhook Support",
      "Third-party Connectors",
      "Custom Integrations",
    ],
  },
}

const featureCategoriesShort = {
  Authentication: "authentication",
  Network: "network",
  Advanced: "advanced",
  Compliance: "compliance",
}

// Vendor Scorecard Component
export function VendorScorecard({ vendorId, data, rank }: { vendorId: string; data: any; rank: number }) {
  const vendor = ComprehensiveVendorDatabase[vendorId]

  if (!vendor || !data) {
    return null
  }

  return (
    <Card className={`${vendorId === "portnox" ? "ring-2 ring-primary" : ""}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold">{rank}</div>
            <span>{vendor.name}</span>
            {vendorId === "portnox" && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
          </div>
          <Badge variant="outline">{data.overallScore}/100</Badge>
        </CardTitle>
        <CardDescription>{vendor.category}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(SCORING_CRITERIA).map(([key, criteria]) => (
            <div key={key} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1">
                  {criteria.icon}
                  {criteria.name.split(" ")[0]}
                </span>
                <span className="font-medium">{data.scores[key]}</span>
              </div>
              <Progress value={data.scores[key]} className="h-2" />
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-green-600">Strengths</h4>
          <ul className="text-sm space-y-1">
            {Object.entries(data.scores)
              .filter(([_, score]) => score >= 80)
              .map(([key, score]) => (
                <li key={key} className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  {SCORING_CRITERIA[key as keyof typeof SCORING_CRITERIA].name} ({score})
                </li>
              ))}
          </ul>
        </div>

        {Object.entries(data.scores).some(([_, score]) => score < 70) && (
          <div className="space-y-2">
            <h4 className="font-semibold text-orange-600">Areas for Improvement</h4>
            <ul className="text-sm space-y-1">
              {Object.entries(data.scores)
                .filter(([_, score]) => score < 70)
                .map(([key, score]) => (
                  <li key={key} className="flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3 text-orange-500" />
                    {SCORING_CRITERIA[key as keyof typeof SCORING_CRITERIA].name} ({score})
                  </li>
                ))}
            </ul>
          </div>
        )}

        <div className="pt-2 border-t">
          <div className="flex justify-between text-sm">
            <span>Market Position:</span>
            <Badge variant="outline">{vendor.marketPosition}</Badge>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>Category:</span>
            <Badge variant="secondary">{vendor.category}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function VendorComparisonMatrix({
  selectedVendors,
  onVendorSelectionChange,
}: VendorComparisonMatrixProps) {
  const [criteriaWeights, setCriteriaWeights] = useState(
    Object.fromEntries(Object.entries(SCORING_CRITERIA).map(([key, criteria]) => [key, criteria.weight])),
  )
  const [filterCategory, setFilterCategory] = useState("all")
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false)
  const [comparisonMode, setComparisonMode] = useState<"detailed" | "summary">("summary")

  // Calculate vendor scores based on weighted criteria
  const vendorScores = useMemo(() => {
    return Object.entries(ComprehensiveVendorDatabase).map(([id, vendor]) => {
      // Cost score (inverse - lower cost = higher score)
      const avgCost = 150000 // Average 3-year cost baseline
      const vendorCost = vendor.pricing.perDevice.base * 1000 * 3 // Simplified calculation
      const costScore = Math.max(0, Math.min(100, ((avgCost - vendorCost) / avgCost) * 100 + 50))

      // Feature score based on capabilities
      const featureScore = vendor.security.zeroTrustScore || 75

      // Security score
      const securityScore = vendor.security.zeroTrustScore || 75

      // Deployment score (inverse of complexity)
      const deploymentScore =
        vendor.implementation.complexity === "low"
          ? 90
          : vendor.implementation.complexity === "medium"
            ? 70
            : vendor.implementation.complexity === "high"
              ? 50
              : 30

      // Support score based on vendor stability and support options
      const supportScore =
        vendor.vendorStability.financialHealth === "excellent"
          ? 90
          : vendor.vendorStability.financialHealth === "good"
            ? 75
            : vendor.vendorStability.financialHealth === "fair"
              ? 60
              : 40

      // Innovation score based on category and market position
      const innovationScore =
        vendor.category === "cloud-native"
          ? 85
          : vendor.category === "hybrid"
            ? 70
            : vendor.category === "on-premise"
              ? 55
              : 40

      const scores = {
        cost: costScore,
        features: featureScore,
        security: securityScore,
        deployment: deploymentScore,
        support: supportScore,
        innovation: innovationScore,
      }

      // Calculate weighted overall score
      const overallScore = Object.entries(scores).reduce((total, [key, score]) => {
        return total + score * (criteriaWeights[key] / 100)
      }, 0)

      return {
        id,
        vendor,
        scores,
        overallScore: Math.round(overallScore),
      }
    })
  }, [criteriaWeights])

  // Filter and sort vendors
  const filteredVendors = useMemo(() => {
    let filtered = vendorScores

    if (selectedVendors.length > 0) {
      filtered = filtered.filter((v) => selectedVendors.includes(v.id))
    }

    return filtered.sort((a, b) => b.overallScore - a.overallScore)
  }, [vendorScores, selectedVendors])

  // Prepare radar chart data
  const radarData = useMemo(() => {
    return Object.entries(SCORING_CRITERIA).map(([key, criteria]) => {
      const dataPoint: any = { criteria: criteria.name }
      filteredVendors.slice(0, 5).forEach((vendor) => {
        dataPoint[vendor.vendor.name] = vendor.scores[key as keyof typeof vendor.scores]
      })
      return dataPoint
    })
  }, [filteredVendors])

  // Reset weights to default
  const resetWeights = () => {
    setCriteriaWeights(
      Object.fromEntries(Object.entries(SCORING_CRITERIA).map(([key, criteria]) => [key, criteria.weight])),
    )
  }

  // Get feature support for comparison
  const getFeatureSupport = (vendorId: string, feature: string) => {
    const vendor = ComprehensiveVendorDatabase[vendorId]
    if (!vendor) return "unknown"

    // Simplified feature mapping - in real implementation, this would be more comprehensive
    const featureMap: Record<string, boolean> = {
      "802.1X Authentication": true,
      "MAC Authentication Bypass": true,
      "Web Authentication": true,
      "Certificate-based Auth": vendor.security.securityFeatures.mfa,
      "Multi-factor Authentication": vendor.security.securityFeatures.mfa,
      "Risk-based Authentication": vendor.security.securityFeatures.continuous_verification,
      "Continuous Authentication": vendor.security.securityFeatures.continuous_verification,
      "Dynamic VLAN Assignment": true,
      "Network Segmentation": vendor.security.securityFeatures.micro_segmentation,
      "Micro-segmentation": vendor.security.securityFeatures.micro_segmentation,
      "Zero Trust Network Access": vendor.security.zeroTrustScore > 80,
      "Threat Detection": vendor.security.securityFeatures.threat_intelligence,
      "Behavioral Analytics": vendor.security.securityFeatures.behavior_analytics,
      "Automated Remediation": vendor.security.securityFeatures.automated_response,
    }

    return featureMap[feature] !== undefined ? featureMap[feature] : Math.random() > 0.3
  }

  const renderCheck = (value: string) => {
    if (value === "✓✓✓") return <CheckCircle2 className="h-5 w-5 text-green-500" />
    if (value === "✓✓") return <CheckCircle2 className="h-5 w-5 text-yellow-500" />
    if (value === "✓") return <CheckCircle2 className="h-5 w-5 text-orange-500" />
    if (value === "✗") return <XCircle className="h-5 w-5 text-red-500" />
    return <span className="text-xs">{value}</span>
  }

  const allFeatures = Object.values(featureCategoriesShort).reduce(
    (acc, categoryKey) => {
      filteredVendors.forEach((vendor) => {
        if (vendor.vendor.featureSupport[categoryKey]) {
          Object.keys(vendor.vendor.featureSupport[categoryKey]).forEach((feature) => {
            if (!acc[categoryKey]) acc[categoryKey] = new Set()
            acc[categoryKey].add(feature)
          })
        }
      })
      return acc
    },
    {} as Record<string, Set<string>>,
  )

  return (
    <motion.div className="space-y-6" initial="initial" animate="animate">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Vendor Comparison Matrix</h2>
          <p className="text-muted-foreground">Comprehensive side-by-side analysis with customizable scoring</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetWeights}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset Weights
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Matrix
          </Button>
        </div>
      </div>

      <Tabs defaultValue="scoring" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scoring">Scoring Matrix</TabsTrigger>
          <TabsTrigger value="features">Feature Comparison</TabsTrigger>
          <TabsTrigger value="analysis">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="scoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Scoring Criteria
                </CardTitle>
                <CardDescription>Adjust weights to match your priorities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(SCORING_CRITERIA).map(([key, criteria]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2 text-sm">
                        {criteria.icon}
                        {criteria.name}
                      </Label>
                      <Badge variant="outline">{criteriaWeights[key]}%</Badge>
                    </div>
                    <Slider
                      value={[criteriaWeights[key]]}
                      onValueChange={([value]) => setCriteriaWeights((prev) => ({ ...prev, [key]: value }))}
                      max={50}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">{criteria.description}</p>
                  </div>
                ))}

                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Total Weight:</span>
                    <span className="font-medium">
                      {Object.values(criteriaWeights).reduce((sum, weight) => sum + weight, 0)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Vendor Scoring Radar</CardTitle>
                  <CardDescription>Multi-dimensional comparison across all criteria</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="criteria" tick={{ fontSize: 12 }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                      {filteredVendors.slice(0, 5).map((vendor, index) => (
                        <Radar
                          key={vendor.id}
                          name={vendor.vendor.name}
                          dataKey={vendor.vendor.name}
                          stroke={`hsl(${index * 60}, 70%, 50%)`}
                          fill={`hsl(${index * 60}, 70%, 50%)`}
                          fillOpacity={0.1}
                          strokeWidth={2}
                        />
                      ))}
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Vendor Rankings</CardTitle>
              <CardDescription>Overall scores based on weighted criteria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredVendors.map((vendor, index) => (
                  <div
                    key={vendor.id}
                    className={`p-4 border rounded-lg ${vendor.id === "portnox" ? "border-primary bg-primary/5" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold flex items-center gap-2">
                            {vendor.vendor.name}
                            {vendor.id === "portnox" && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                          </h4>
                          <p className="text-sm text-muted-foreground">{vendor.vendor.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{vendor.overallScore}</div>
                        <div className="text-xs text-muted-foreground">Overall Score</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                      {Object.entries(SCORING_CRITERIA).map(([key, criteria]) => (
                        <div key={key} className="text-center">
                          <div className="flex items-center justify-center mb-1">{criteria.icon}</div>
                          <div className="text-sm font-medium">{vendor.scores[key as keyof typeof vendor.scores]}</div>
                          <div className="text-xs text-muted-foreground">{criteria.name.split(" ")[0]}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3">
                      <Progress value={vendor.overallScore} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.entries(FEATURE_CATEGORIES).map(([key, category]) => (
                    <SelectItem key={key} value={key}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Checkbox id="differences" checked={showOnlyDifferences} onCheckedChange={setShowOnlyDifferences} />
                <Label htmlFor="differences" className="text-sm">
                  Show only differences
                </Label>
              </div>
            </div>

            <Select value={comparisonMode} onValueChange={(value: "detailed" | "summary") => setComparisonMode(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="summary">Summary</SelectItem>
                <SelectItem value="detailed">Detailed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Feature</TableHead>
                      {filteredVendors.slice(0, 6).map((vendor) => (
                        <TableHead key={vendor.id} className="text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-sm">{vendor.vendor.name}</span>
                            <Badge variant="outline" className="text-xs">
                              Score: {vendor.overallScore}
                            </Badge>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(allFeatures).map(([category, features]) => (
                      <>
                        <TableRow key={category} className="bg-muted/50">
                          <TableCell colSpan={filteredVendors.length + 1} className="font-bold">
                            {Object.keys(featureCategoriesShort).find(
                              (key) => featureCategoriesShort[key as keyof typeof featureCategoriesShort] === category,
                            )}
                          </TableCell>
                        </TableRow>
                        {Array.from(features).map((feature) => (
                          <TableRow key={feature}>
                            <TableCell className="font-medium">{feature}</TableCell>
                            {filteredVendors.slice(0, 6).map((vendor) => (
                              <TableCell key={vendor.id} className="text-center">
                                {renderCheck(
                                  vendor.vendor.featureSupport[category as keyof typeof featureCategoriesShort]?.[
                                    feature
                                  ] || "✗",
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost vs Performance Analysis</CardTitle>
                <CardDescription>Value positioning of each vendor</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="cost" name="3-Year Cost" unit="K" domain={["dataMin - 50", "dataMax + 50"]} />
                    <YAxis dataKey="score" name="Overall Score" domain={[0, 100]} />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-background border rounded-lg p-3 shadow-lg">
                              <p className="font-medium">{data.name}</p>
                              <p className="text-sm">Score: {data.score}</p>
                              <p className="text-sm">Cost: ${data.cost}K</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Scatter
                      data={filteredVendors.map((v) => ({
                        name: v.vendor.name,
                        cost: Math.round((v.vendor.pricing.perDevice.base * 1000 * 3) / 1000),
                        score: v.overallScore,
                        fill: v.id === "portnox" ? "#10b981" : "#6366f1",
                      }))}
                      fill="#6366f1"
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deployment Complexity vs Security</CardTitle>
                <CardDescription>Implementation effort vs security benefits</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="deployment" name="Deployment Score" domain={[0, 100]} />
                    <YAxis dataKey="security" name="Security Score" domain={[0, 100]} />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-background border rounded-lg p-3 shadow-lg">
                              <p className="font-medium">{data.name}</p>
                              <p className="text-sm">Deployment: {data.deployment}</p>
                              <p className="text-sm">Security: {data.security}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Scatter
                      data={filteredVendors.map((v) => ({
                        name: v.vendor.name,
                        deployment: v.scores.deployment,
                        security: v.scores.security,
                        fill: v.id === "portnox" ? "#10b981" : "#f59e0b",
                      }))}
                      fill="#f59e0b"
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredVendors.slice(0, 3).map((vendor, index) => (
              <VendorScorecard key={vendor.id} vendorId={vendor.id} data={vendor} rank={index + 1} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Top Recommendation</CardTitle>
                <CardDescription>Best overall choice based on your criteria</CardDescription>
              </CardHeader>
              <CardContent>
                {filteredVendors.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        <Star className="h-6 w-6 text-green-600 fill-current" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{filteredVendors[0].vendor.name}</h3>
                        <p className="text-sm text-muted-foreground">Score: {filteredVendors[0].overallScore}/100</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold">Why this recommendation?</h4>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                          Highest overall score across weighted criteria
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                          Strong performance in high-priority areas
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                          Balanced approach to cost and capabilities
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                          Future-ready technology platform
                        </li>
                      </ul>
                    </div>

                    <Alert>
                      <TrendingUp className="h-4 w-4" />
                      <AlertDescription>
                        This vendor offers the best combination of features, security, and value for your requirements.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Alternative Options</CardTitle>
                <CardDescription>Other vendors worth considering</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredVendors.slice(1, 4).map((vendor, index) => (
                    <div key={vendor.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{vendor.vendor.name}</h4>
                        <Badge variant="outline">{vendor.overallScore}/100</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {index === 0 && "Strong alternative with competitive features"}
                        {index === 1 && "Good option for specific use cases"}
                        {index === 2 && "Consider for budget-conscious deployments"}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Decision Framework</CardTitle>
              <CardDescription>Key factors to consider in your final decision</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Critical Success Factors</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-blue-500 mt-0.5" />
                      Security requirements alignment
                    </li>
                    <li className="flex items-start gap-2">
                      <DollarSign className="h-4 w-4 text-green-500 mt-0.5" />
                      Total cost of ownership fit
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-orange-500 mt-0.5" />
                      Implementation timeline constraints
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="h-4 w-4 text-purple-500 mt-0.5" />
                      Internal team capabilities
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-yellow-500 mt-0.5" />
                      Integration requirements
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Next Steps</h4>
                  <ol className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center mt-0.5">
                        1
                      </span>
                      Schedule vendor demonstrations
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center mt-0.5">
                        2
                      </span>
                      Conduct proof of concept
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center mt-0.5">
                        3
                      </span>
                      Validate technical requirements
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center mt-0.5">
                        4
                      </span>
                      Negotiate commercial terms
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center mt-0.5">
                        5
                      </span>
                      Develop implementation plan
                    </li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
