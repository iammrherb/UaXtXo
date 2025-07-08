"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Shield,
  DollarSign,
  Users,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Target,
  Award,
  Filter,
  Download,
  Eye,
  BarChart3,
} from "lucide-react"
import { COMPREHENSIVE_VENDOR_DATA } from "@/lib/vendors/comprehensive-vendor-data"
import { calculateComprehensiveTCO, compareVendorsByCategory } from "@/lib/calculators/comprehensive-tco-calculator"

interface VendorComparisonMatrixProps {
  selectedVendors?: string[]
  deviceCount?: number
  timeframe?: 1 | 3 | 5
  industry?: string
}

export function VendorComparisonMatrix({
  selectedVendors = ["PORTNOX", "CISCO_ISE", "ARUBA_CLEARPASS", "FORESCOUT"],
  deviceCount = 500,
  timeframe = 3,
  industry = "HEALTHCARE",
}: VendorComparisonMatrixProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [filterCategory, setFilterCategory] = useState("all")
  const [sortBy, setSortBy] = useState("totalCost")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [showDetails, setShowDetails] = useState<string | null>(null)

  // Calculate comprehensive comparison data
  const comparisonData = useMemo(() => {
    return compareVendorsByCategory(selectedVendors, deviceCount, timeframe, industry)
  }, [selectedVendors, deviceCount, timeframe, industry])

  // Feature comparison matrix
  const featureMatrix = useMemo(() => {
    const features = [
      "zeroTrustMaturity",
      "cloudNative",
      "agentlessSupport",
      "iotDeviceSupport",
      "byodSupport",
      "complianceAutomation",
      "threatDetection",
      "networkSegmentation",
      "guestAccess",
      "certificateManagement",
    ]

    return selectedVendors.map((vendorKey) => {
      const vendor = COMPREHENSIVE_VENDOR_DATA[vendorKey]
      const featureScores = {}

      features.forEach((feature) => {
        featureScores[feature] = vendor?.capabilities?.[feature] || 0
      })

      return {
        vendorKey,
        vendor,
        features: featureScores,
      }
    })
  }, [selectedVendors])

  // Security scorecard data
  const securityScorecard = useMemo(() => {
    return selectedVendors.map((vendorKey) => {
      const vendor = COMPREHENSIVE_VENDOR_DATA[vendorKey]
      const tcoData = calculateComprehensiveTCO({
        vendorKey,
        deviceCount,
        timeframe,
        industry,
        deploymentModel: "CLOUD",
        hasExistingNAC: false,
        includeCompliance: true,
        includeRiskReduction: true,
      })

      return {
        vendorKey,
        vendor,
        securityScore: vendor?.securityScore || 0,
        complianceScore: vendor?.complianceScore || 0,
        zeroTrustScore: vendor?.capabilities?.zeroTrustMaturity || 0,
        threatDetectionScore: vendor?.capabilities?.threatDetection || 0,
        riskReduction: tcoData.riskReduction.total,
        vulnerabilities: vendor?.vulnerabilities || 0,
      }
    })
  }, [selectedVendors, deviceCount, timeframe, industry])

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return "default"
    if (score >= 70) return "secondary"
    return "destructive"
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Vendor Comparison Matrix
              </CardTitle>
              <CardDescription>
                Comprehensive analysis of {selectedVendors.length} NAC vendors across multiple dimensions
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Comparison Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="costs">Costs</TabsTrigger>
          <TabsTrigger value="scorecard">Scorecard</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {comparisonData.comparisons.map((comparison) => (
              <Card key={comparison.vendorKey} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{comparison.vendor?.name || comparison.vendorKey}</CardTitle>
                    {comparison.vendorKey === "PORTNOX" && <Badge variant="default">Recommended</Badge>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Cost</span>
                      <span className="font-semibold">${(comparison.totalCost / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Per Device</span>
                      <span className="font-semibold">${comparison.perDeviceCost}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Deployment</span>
                      <span className="font-semibold">{comparison.deploymentTime}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Security Score</span>
                      <Badge variant={getScoreBadgeVariant(comparison.securityScore)}>
                        {comparison.securityScore}/100
                      </Badge>
                    </div>
                    <Progress value={comparison.securityScore} className="h-2" />
                  </div>

                  {comparison.savings > 0 && (
                    <Alert className="bg-green-50 border-green-200">
                      <TrendingUp className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        Save ${(comparison.savings / 1000).toFixed(0)}K vs Portnox
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    onClick={() => setShowDetails(comparison.vendorKey)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Lowest Cost Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="font-semibold">{comparisonData.lowestCost.vendor?.name}</div>
                    <div className="text-sm text-muted-foreground">
                      ${(comparisonData.lowestCost.totalCost / 1000).toFixed(0)}K total
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Fastest Deployment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Zap className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="font-semibold">{comparisonData.fastestDeployment.vendor?.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {comparisonData.fastestDeployment.deploymentTime}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Highest Security</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-purple-600" />
                  <div>
                    <div className="font-semibold">{comparisonData.highestSecurity.vendor?.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {comparisonData.highestSecurity.securityScore}/100 score
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Features Tab */}
        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Feature Comparison Matrix</CardTitle>
              <CardDescription>Detailed capability comparison across key NAC features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Feature</TableHead>
                      {selectedVendors.map((vendorKey) => (
                        <TableHead key={vendorKey} className="text-center">
                          {COMPREHENSIVE_VENDOR_DATA[vendorKey]?.name || vendorKey}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { key: "zeroTrustMaturity", label: "Zero Trust Maturity" },
                      { key: "cloudNative", label: "Cloud Native" },
                      { key: "agentlessSupport", label: "Agentless Support" },
                      { key: "iotDeviceSupport", label: "IoT Device Support" },
                      { key: "byodSupport", label: "BYOD Support" },
                      { key: "complianceAutomation", label: "Compliance Automation" },
                      { key: "threatDetection", label: "Threat Detection" },
                      { key: "networkSegmentation", label: "Network Segmentation" },
                      { key: "guestAccess", label: "Guest Access" },
                      { key: "certificateManagement", label: "Certificate Management" },
                    ].map((feature) => (
                      <TableRow key={feature.key}>
                        <TableCell className="font-medium">{feature.label}</TableCell>
                        {featureMatrix.map((vendor) => (
                          <TableCell key={vendor.vendorKey} className="text-center">
                            <div className="flex items-center justify-center">
                              {vendor.features[feature.key] >= 90 ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : vendor.features[feature.key] >= 70 ? (
                                <div className="w-5 h-5 rounded-full bg-yellow-400" />
                              ) : vendor.features[feature.key] >= 50 ? (
                                <div className="w-5 h-5 rounded-full bg-orange-400" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-600" />
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">{vendor.features[feature.key]}%</div>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {securityScorecard.map((vendor) => (
              <Card key={vendor.vendorKey}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{vendor.vendor?.name || vendor.vendorKey}</span>
                    <Badge variant={getScoreBadgeVariant(vendor.securityScore)}>{vendor.securityScore}/100</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Overall Security</span>
                      <span className={`font-semibold ${getScoreColor(vendor.securityScore)}`}>
                        {vendor.securityScore}/100
                      </span>
                    </div>
                    <Progress value={vendor.securityScore} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Compliance Score</span>
                      <span className={`font-semibold ${getScoreColor(vendor.complianceScore)}`}>
                        {vendor.complianceScore}/100
                      </span>
                    </div>
                    <Progress value={vendor.complianceScore} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Zero Trust Maturity</span>
                      <span className={`font-semibold ${getScoreColor(vendor.zeroTrustScore)}`}>
                        {vendor.zeroTrustScore}/100
                      </span>
                    </div>
                    <Progress value={vendor.zeroTrustScore} className="h-2" />
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Risk Reduction</div>
                      <div className="font-semibold text-green-600">${(vendor.riskReduction / 1000).toFixed(0)}K</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Vulnerabilities</div>
                      <div
                        className={`font-semibold ${vendor.vulnerabilities === 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {vendor.vulnerabilities}
                      </div>
                    </div>
                  </div>

                  {vendor.vulnerabilities === 0 && (
                    <Alert className="bg-green-50 border-green-200">
                      <Shield className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        Zero known vulnerabilities - Secure by design
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Costs Tab */}
        <TabsContent value="costs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown Comparison</CardTitle>
              <CardDescription>
                Detailed cost analysis over {timeframe} years for {deviceCount} devices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vendor</TableHead>
                      <TableHead className="text-right">Software</TableHead>
                      <TableHead className="text-right">Hardware</TableHead>
                      <TableHead className="text-right">Implementation</TableHead>
                      <TableHead className="text-right">Operational</TableHead>
                      <TableHead className="text-right">Total Cost</TableHead>
                      <TableHead className="text-right">Savings vs Portnox</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonData.comparisons.map((comparison) => {
                      const tcoData = calculateComprehensiveTCO({
                        vendorKey: comparison.vendorKey,
                        deviceCount,
                        timeframe,
                        industry,
                        deploymentModel: "CLOUD",
                        hasExistingNAC: false,
                        includeCompliance: true,
                        includeRiskReduction: true,
                      })

                      return (
                        <TableRow key={comparison.vendorKey}>
                          <TableCell className="font-medium">
                            {comparison.vendor?.name || comparison.vendorKey}
                          </TableCell>
                          <TableCell className="text-right">${(tcoData.software.total / 1000).toFixed(0)}K</TableCell>
                          <TableCell className="text-right">${(tcoData.hardware.total / 1000).toFixed(0)}K</TableCell>
                          <TableCell className="text-right">
                            ${(tcoData.implementation.total / 1000).toFixed(0)}K
                          </TableCell>
                          <TableCell className="text-right">
                            ${(tcoData.operational.total / 1000).toFixed(0)}K
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            ${(tcoData.totalCost / 1000).toFixed(0)}K
                          </TableCell>
                          <TableCell className="text-right">
                            {comparison.savings > 0 ? (
                              <span className="text-red-600">+${(comparison.savings / 1000).toFixed(0)}K</span>
                            ) : comparison.savings < 0 ? (
                              <span className="text-green-600">
                                -${(Math.abs(comparison.savings) / 1000).toFixed(0)}K
                              </span>
                            ) : (
                              <span className="text-muted-foreground">Baseline</span>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scorecard Tab */}
        <TabsContent value="scorecard" className="space-y-6">
          <VendorScorecard
            selectedVendors={selectedVendors}
            deviceCount={deviceCount}
            timeframe={timeframe}
            industry={industry}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Vendor Scorecard Component
export function VendorScorecard({
  selectedVendors = ["PORTNOX", "CISCO_ISE", "ARUBA_CLEARPASS", "FORESCOUT"],
  deviceCount = 500,
  timeframe = 3,
  industry = "HEALTHCARE",
}: VendorComparisonMatrixProps) {
  const scorecardData = useMemo(() => {
    return selectedVendors.map((vendorKey) => {
      const vendor = COMPREHENSIVE_VENDOR_DATA[vendorKey]
      const tcoData = calculateComprehensiveTCO({
        vendorKey,
        deviceCount,
        timeframe,
        industry,
        deploymentModel: "CLOUD",
        hasExistingNAC: false,
        includeCompliance: true,
        includeRiskReduction: true,
      })

      // Calculate overall score
      const costScore = Math.max(0, 100 - tcoData.totalCost / 10000) // Lower cost = higher score
      const securityScore = vendor?.securityScore || 0
      const deploymentScore =
        vendor?.deploymentTime === "30 minutes"
          ? 100
          : vendor?.deploymentTime === "7 days"
            ? 80
            : vendor?.deploymentTime === "30 days"
              ? 60
              : 40
      const supportScore =
        vendor?.supportQuality === "EXCELLENT"
          ? 100
          : vendor?.supportQuality === "GOOD"
            ? 80
            : vendor?.supportQuality === "FAIR"
              ? 60
              : 40

      const overallScore = Math.round((costScore + securityScore + deploymentScore + supportScore) / 4)

      return {
        vendorKey,
        vendor,
        scores: {
          overall: overallScore,
          cost: Math.round(costScore),
          security: securityScore,
          deployment: deploymentScore,
          support: supportScore,
        },
        tcoData,
        recommendation:
          overallScore >= 85
            ? "HIGHLY_RECOMMENDED"
            : overallScore >= 70
              ? "RECOMMENDED"
              : overallScore >= 55
                ? "CONSIDER"
                : "NOT_RECOMMENDED",
      }
    })
  }, [selectedVendors, deviceCount, timeframe, industry])

  const getRecommendationBadge = (recommendation: string) => {
    switch (recommendation) {
      case "HIGHLY_RECOMMENDED":
        return <Badge className="bg-green-600">Highly Recommended</Badge>
      case "RECOMMENDED":
        return <Badge className="bg-blue-600">Recommended</Badge>
      case "CONSIDER":
        return <Badge variant="secondary">Consider</Badge>
      default:
        return <Badge variant="destructive">Not Recommended</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {scorecardData.map((scorecard) => (
          <Card key={scorecard.vendorKey} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{scorecard.vendor?.name || scorecard.vendorKey}</CardTitle>
                {getRecommendationBadge(scorecard.recommendation)}
              </div>
              <CardDescription>Overall Score: {scorecard.scores.overall}/100</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Overall Score Circle */}
              <div className="flex items-center justify-center">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-muted-foreground/20"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2.51 * scorecard.scores.overall} 251`}
                      className={
                        scorecard.scores.overall >= 85
                          ? "text-green-600"
                          : scorecard.scores.overall >= 70
                            ? "text-blue-600"
                            : scorecard.scores.overall >= 55
                              ? "text-yellow-600"
                              : "text-red-600"
                      }
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{scorecard.scores.overall}</span>
                  </div>
                </div>
              </div>

              {/* Individual Scores */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Cost Efficiency</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={scorecard.scores.cost} className="w-16 h-2" />
                    <span className="text-sm font-medium w-8">{scorecard.scores.cost}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={scorecard.scores.security} className="w-16 h-2" />
                    <span className="text-sm font-medium w-8">{scorecard.scores.security}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">Deployment Speed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={scorecard.scores.deployment} className="w-16 h-2" />
                    <span className="text-sm font-medium w-8">{scorecard.scores.deployment}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-orange-600" />
                    <span className="text-sm">Support Quality</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={scorecard.scores.support} className="w-16 h-2" />
                    <span className="text-sm font-medium w-8">{scorecard.scores.support}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Total Cost</div>
                  <div className="font-semibold">${(scorecard.tcoData.totalCost / 1000).toFixed(0)}K</div>
                </div>
                <div>
                  <div className="text-muted-foreground">ROI</div>
                  <div className="font-semibold text-green-600">{scorecard.tcoData.roi.toFixed(0)}%</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Payback</div>
                  <div className="font-semibold">{Math.round(scorecard.tcoData.paybackPeriod / 30)} months</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Risk Reduction</div>
                  <div className="font-semibold text-blue-600">
                    ${(scorecard.tcoData.riskReduction.total / 1000).toFixed(0)}K
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              {scorecard.recommendation === "HIGHLY_RECOMMENDED" && (
                <Alert className="bg-green-50 border-green-200">
                  <Award className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Excellent choice with superior value proposition and minimal risk.
                  </AlertDescription>
                </Alert>
              )}

              {scorecard.recommendation === "NOT_RECOMMENDED" && (
                <Alert className="bg-red-50 border-red-200">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Consider alternatives due to cost, complexity, or security concerns.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Executive Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scorecardData
              .filter((s) => s.recommendation === "HIGHLY_RECOMMENDED")
              .map((scorecard) => (
                <Alert key={scorecard.vendorKey} className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>{scorecard.vendor?.name}</strong> delivers exceptional value with
                    {scorecard.scores.overall}/100 overall score. Recommended for immediate deployment with $
                    {(scorecard.tcoData.totalCost / 1000).toFixed(0)}K total investment and{" "}
                    {scorecard.tcoData.roi.toFixed(0)}% ROI.
                  </AlertDescription>
                </Alert>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default VendorComparisonMatrix
