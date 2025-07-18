"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, AlertCircle, Star } from "lucide-react"
import type { CalculationResult } from "@/lib/enhanced-tco-calculator"

interface FeatureComparisonMatrixProps {
  results: CalculationResult[]
}

export function FeatureComparisonMatrix({ results }: FeatureComparisonMatrixProps) {
  const featureCategories = [
    {
      name: "Core NAC Features",
      features: [
        { key: "deviceDiscovery", name: "Device Discovery & Profiling", weight: 1.0 },
        { key: "policyEnforcement", name: "Policy Enforcement", weight: 1.0 },
        { key: "guestAccess", name: "Guest Access Management", weight: 0.8 },
        { key: "byodSupport", name: "BYOD Support", weight: 0.9 },
        { key: "networkSegmentation", name: "Network Segmentation", weight: 1.0 },
      ],
    },
    {
      name: "Zero Trust & Security",
      features: [
        { key: "zeroTrustArchitecture", name: "Zero Trust Architecture", weight: 1.0 },
        { key: "continuousMonitoring", name: "Continuous Monitoring", weight: 0.9 },
        { key: "riskBasedAccess", name: "Risk-Based Access Control", weight: 0.9 },
        { key: "threatDetection", name: "Threat Detection & Response", weight: 0.8 },
        { key: "behaviorAnalytics", name: "User Behavior Analytics", weight: 0.7 },
      ],
    },
    {
      name: "Cloud & Integration",
      features: [
        { key: "cloudNative", name: "Cloud-Native Architecture", weight: 1.0 },
        { key: "apiFirst", name: "API-First Design", weight: 0.9 },
        { key: "siemIntegration", name: "SIEM Integration", weight: 0.8 },
        { key: "identityProviders", name: "Identity Provider Integration", weight: 0.9 },
        { key: "multiTenant", name: "Multi-Tenant Support", weight: 0.7 },
      ],
    },
    {
      name: "Operations & Automation",
      features: [
        { key: "automation", name: "Policy Automation", weight: 1.0 },
        { key: "selfService", name: "Self-Service Capabilities", weight: 0.8 },
        { key: "aiOps", name: "AI/ML Operations", weight: 0.7 },
        { key: "reporting", name: "Advanced Reporting", weight: 0.8 },
        { key: "scalability", name: "Enterprise Scalability", weight: 0.9 },
      ],
    },
    {
      name: "Compliance & Governance",
      features: [
        { key: "complianceReporting", name: "Compliance Reporting", weight: 0.9 },
        { key: "auditTrails", name: "Comprehensive Audit Trails", weight: 0.8 },
        { key: "dataGovernance", name: "Data Governance", weight: 0.7 },
        { key: "regulatorySupport", name: "Regulatory Framework Support", weight: 0.8 },
        { key: "privacyControls", name: "Privacy Controls", weight: 0.7 },
      ],
    },
  ]

  // Mock feature scores for each vendor (in a real app, this would come from the vendor data)
  const getFeatureScore = (vendorId: string, featureKey: string): number => {
    const featureScores: Record<string, Record<string, number>> = {
      portnox: {
        deviceDiscovery: 100,
        policyEnforcement: 100,
        guestAccess: 95,
        byodSupport: 100,
        networkSegmentation: 100,
        zeroTrustArchitecture: 100,
        continuousMonitoring: 95,
        riskBasedAccess: 100,
        threatDetection: 90,
        behaviorAnalytics: 85,
        cloudNative: 100,
        apiFirst: 100,
        siemIntegration: 95,
        identityProviders: 95,
        multiTenant: 100,
        automation: 95,
        selfService: 100,
        aiOps: 85,
        reporting: 90,
        scalability: 100,
        complianceReporting: 95,
        auditTrails: 100,
        dataGovernance: 90,
        regulatorySupport: 95,
        privacyControls: 90,
      },
      cisco: {
        deviceDiscovery: 95,
        policyEnforcement: 100,
        guestAccess: 85,
        byodSupport: 80,
        networkSegmentation: 90,
        zeroTrustArchitecture: 60,
        continuousMonitoring: 70,
        riskBasedAccess: 65,
        threatDetection: 80,
        behaviorAnalytics: 60,
        cloudNative: 40,
        apiFirst: 60,
        siemIntegration: 90,
        identityProviders: 85,
        multiTenant: 50,
        automation: 50,
        selfService: 60,
        aiOps: 30,
        reporting: 85,
        scalability: 95,
        complianceReporting: 80,
        auditTrails: 90,
        dataGovernance: 75,
        regulatorySupport: 90,
        privacyControls: 70,
      },
      aruba: {
        deviceDiscovery: 85,
        policyEnforcement: 90,
        guestAccess: 90,
        byodSupport: 85,
        networkSegmentation: 85,
        zeroTrustArchitecture: 50,
        continuousMonitoring: 60,
        riskBasedAccess: 55,
        threatDetection: 70,
        behaviorAnalytics: 50,
        cloudNative: 45,
        apiFirst: 65,
        siemIntegration: 75,
        identityProviders: 80,
        multiTenant: 60,
        automation: 55,
        selfService: 70,
        aiOps: 35,
        reporting: 75,
        scalability: 85,
        complianceReporting: 70,
        auditTrails: 80,
        dataGovernance: 65,
        regulatorySupport: 75,
        privacyControls: 60,
      },
      forescout: {
        deviceDiscovery: 100,
        policyEnforcement: 80,
        guestAccess: 60,
        byodSupport: 70,
        networkSegmentation: 85,
        zeroTrustArchitecture: 55,
        continuousMonitoring: 85,
        riskBasedAccess: 70,
        threatDetection: 90,
        behaviorAnalytics: 75,
        cloudNative: 35,
        apiFirst: 60,
        siemIntegration: 95,
        identityProviders: 70,
        multiTenant: 40,
        automation: 60,
        selfService: 50,
        aiOps: 50,
        reporting: 85,
        scalability: 80,
        complianceReporting: 85,
        auditTrails: 90,
        dataGovernance: 80,
        regulatorySupport: 85,
        privacyControls: 75,
      },
      juniper: {
        deviceDiscovery: 90,
        policyEnforcement: 85,
        guestAccess: 80,
        byodSupport: 85,
        networkSegmentation: 90,
        zeroTrustArchitecture: 75,
        continuousMonitoring: 80,
        riskBasedAccess: 80,
        threatDetection: 75,
        behaviorAnalytics: 85,
        cloudNative: 90,
        apiFirst: 85,
        siemIntegration: 70,
        identityProviders: 80,
        multiTenant: 85,
        automation: 80,
        selfService: 80,
        aiOps: 90,
        reporting: 80,
        scalability: 85,
        complianceReporting: 75,
        auditTrails: 80,
        dataGovernance: 70,
        regulatorySupport: 80,
        privacyControls: 75,
      },
    }

    return featureScores[vendorId]?.[featureKey] || Math.floor(Math.random() * 40) + 40
  }

  const vendorFeatureData = useMemo(() => {
    return results
      .map((result) => ({
        vendor: result.vendorName,
        vendorId: result.vendorId,
        isPortnox: result.vendorId === "portnox",
        categories: featureCategories.map((category) => ({
          name: category.name,
          features: category.features.map((feature) => ({
            ...feature,
            score: getFeatureScore(result.vendorId, feature.key),
          })),
          averageScore:
            category.features.reduce(
              (sum, feature) => sum + getFeatureScore(result.vendorId, feature.key) * feature.weight,
              0,
            ) / category.features.reduce((sum, feature) => sum + feature.weight, 0),
        })),
        overallScore:
          featureCategories.reduce((sum, category) => {
            const categoryScore =
              category.features.reduce(
                (catSum, feature) => catSum + getFeatureScore(result.vendorId, feature.key) * feature.weight,
                0,
              ) / category.features.reduce((weightSum, feature) => weightSum + feature.weight, 0)
            return sum + categoryScore
          }, 0) / featureCategories.length,
      }))
      .sort((a, b) => b.overallScore - a.overallScore)
  }, [results])

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircle2 className="h-4 w-4 text-green-600" />
    if (score >= 70) return <AlertCircle className="h-4 w-4 text-yellow-600" />
    return <XCircle className="h-4 w-4 text-red-600" />
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-100 dark:bg-green-950/20"
    if (score >= 70) return "bg-yellow-100 dark:bg-yellow-950/20"
    return "bg-red-100 dark:bg-red-950/20"
  }

  return (
    <div className="space-y-6">
      {/* Overall Scores */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Capability Overview</CardTitle>
          <CardDescription>Overall feature scores across all vendors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vendorFeatureData.map((vendor) => (
              <div
                key={vendor.vendorId}
                className={`p-4 rounded-lg border ${
                  vendor.isPortnox
                    ? "border-green-200 bg-green-50 dark:bg-green-950/20"
                    : "border-gray-200 bg-gray-50 dark:bg-gray-950/20"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-sm">{vendor.vendor}</span>
                  {vendor.isPortnox && (
                    <Badge variant="default" className="text-xs bg-green-100 text-green-800 border-green-300">
                      <Star className="h-3 w-3 mr-1" />
                      Leader
                    </Badge>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Overall Score</span>
                    <span className={`font-bold ${getScoreColor(vendor.overallScore)}`}>
                      {vendor.overallScore.toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={vendor.overallScore} className={`h-2 ${vendor.isPortnox ? "bg-green-100" : ""}`} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Feature Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Feature Comparison Matrix</CardTitle>
          <CardDescription>Comprehensive feature analysis across all categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {featureCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{category.name}</h3>

                {/* Category Overview */}
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5 mb-4">
                  {vendorFeatureData.map((vendor) => {
                    const categoryData = vendor.categories[categoryIndex]
                    return (
                      <div
                        key={vendor.vendorId}
                        className={`p-2 rounded text-center ${getScoreBg(categoryData.averageScore)}`}
                      >
                        <div className="text-xs font-medium">{vendor.vendor}</div>
                        <div className={`text-sm font-bold ${getScoreColor(categoryData.averageScore)}`}>
                          {categoryData.averageScore.toFixed(0)}%
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Feature Details */}
                <div className="space-y-3">
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{feature.name}</span>
                        <Badge variant="outline" className="text-xs">
                          Weight: {feature.weight}
                        </Badge>
                      </div>

                      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5">
                        {vendorFeatureData.map((vendor) => {
                          const featureData = vendor.categories[categoryIndex].features[featureIndex]
                          return (
                            <div
                              key={vendor.vendorId}
                              className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-gray-900"
                            >
                              <div className="flex items-center gap-2">
                                {getScoreIcon(featureData.score)}
                                <span className="text-xs">{vendor.vendor}</span>
                              </div>
                              <span className={`text-xs font-bold ${getScoreColor(featureData.score)}`}>
                                {featureData.score}%
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feature Gaps Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Gap Analysis</CardTitle>
          <CardDescription>Areas where vendors fall short of market-leading capabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vendorFeatureData
              .filter((vendor) => !vendor.isPortnox)
              .map((vendor) => {
                const portnoxData = vendorFeatureData.find((v) => v.isPortnox)
                if (!portnoxData) return null

                const gaps = vendor.categories
                  .map((category, index) => ({
                    category: category.name,
                    gap: portnoxData.categories[index].averageScore - category.averageScore,
                    portnoxScore: portnoxData.categories[index].averageScore,
                    vendorScore: category.averageScore,
                  }))
                  .filter((gap) => gap.gap > 10)
                  .sort((a, b) => b.gap - a.gap)

                return (
                  <div key={vendor.vendorId} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium">{vendor.vendor}</span>
                      <Badge variant="outline">{gaps.length} significant gaps</Badge>
                    </div>

                    <div className="space-y-2">
                      {gaps.slice(0, 3).map((gap, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{gap.category}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-red-600">-{gap.gap.toFixed(0)}%</span>
                            <span className="text-xs text-muted-foreground">
                              ({gap.vendorScore.toFixed(0)}% vs {gap.portnoxScore.toFixed(0)}%)
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
