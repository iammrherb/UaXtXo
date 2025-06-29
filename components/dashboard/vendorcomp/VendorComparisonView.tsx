"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Minus, Star, Award, TrendingUp, Shield, Zap, DollarSign } from "lucide-react"
import { useDashboardSettings } from "@/context/DashboardContext"
import Image from "next/image"

export default function VendorComparisonView() {
  const { settings } = useDashboardSettings()

  const vendors = [
    {
      name: "Portnox",
      logo: "/portnox-logo-color.png",
      score: 94,
      tco: 480000,
      deployment: 6,
      recommended: true,
      strengths: ["Cloud-native", "Fast deployment", "Low TCO", "Modern UI"],
      features: {
        "Zero Trust": "full",
        "Cloud Native": "full",
        "API Integration": "full",
        "Mobile Support": "full",
        Compliance: "full",
        Scalability: "full",
        "User Experience": "full",
        "Cost Efficiency": "full",
      },
    },
    {
      name: "Cisco ISE",
      logo: "/cisco-logo.png",
      score: 78,
      tco: 720000,
      deployment: 16,
      recommended: false,
      strengths: ["Market leader", "Feature rich", "Enterprise grade"],
      features: {
        "Zero Trust": "partial",
        "Cloud Native": "partial",
        "API Integration": "full",
        "Mobile Support": "partial",
        Compliance: "full",
        Scalability: "full",
        "User Experience": "partial",
        "Cost Efficiency": "partial",
      },
    },
    {
      name: "Aruba ClearPass",
      logo: "/aruba-logo.png",
      score: 82,
      tco: 650000,
      deployment: 12,
      recommended: false,
      strengths: ["HPE integration", "Policy flexibility", "Good support"],
      features: {
        "Zero Trust": "partial",
        "Cloud Native": "partial",
        "API Integration": "full",
        "Mobile Support": "full",
        Compliance: "full",
        Scalability: "full",
        "User Experience": "partial",
        "Cost Efficiency": "partial",
      },
    },
    {
      name: "Fortinet FortiNAC",
      logo: "/fortinet-logo.png",
      score: 75,
      tco: 580000,
      deployment: 14,
      recommended: false,
      strengths: ["Security focus", "Fortinet integration", "Threat detection"],
      features: {
        "Zero Trust": "partial",
        "Cloud Native": "none",
        "API Integration": "partial",
        "Mobile Support": "partial",
        Compliance: "full",
        Scalability: "partial",
        "User Experience": "partial",
        "Cost Efficiency": "partial",
      },
    },
  ]

  const getFeatureIcon = (level: string) => {
    switch (level) {
      case "full":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "partial":
        return <Minus className="h-4 w-4 text-yellow-600" />
      case "none":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const features = Object.keys(vendors[0].features)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Vendor Comparison</h2>
          <p className="text-gray-600">NAC solution comparison for {settings.industry} organizations</p>
        </div>
        <Badge className="bg-portnox-blue/10 text-portnox-blue border-portnox-blue/20">
          {vendors.length} Vendors Analyzed
        </Badge>
      </div>

      {/* Vendor Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {vendors.map((vendor, index) => (
          <Card
            key={index}
            className={`relative ${
              vendor.recommended
                ? "ring-2 ring-portnox-blue bg-gradient-to-br from-portnox-blue/5 to-portnox-teal/5"
                : "hover:shadow-lg transition-shadow"
            }`}
          >
            {vendor.recommended && (
              <div className="absolute -top-2 -right-2">
                <Badge className="bg-portnox-blue text-white">
                  <Award className="h-3 w-3 mr-1" />
                  Recommended
                </Badge>
              </div>
            )}
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <Image
                  src={vendor.logo || "/placeholder.svg"}
                  alt={vendor.name}
                  width={32}
                  height={32}
                  className="rounded"
                />
                <CardTitle className="text-lg">{vendor.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Score</span>
                <span className={`text-lg font-bold ${getScoreColor(vendor.score)}`}>{vendor.score}/100</span>
              </div>
              <Progress value={vendor.score} className="h-2" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">TCO ({settings.comparisonYears}yr)</span>
                  <span className="font-medium">${(vendor.tco / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deployment</span>
                  <span className="font-medium">{vendor.deployment} weeks</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex flex-wrap gap-1">
                  {vendor.strengths.slice(0, 2).map((strength, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Feature Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Comparison Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Feature</th>
                  {vendors.map((vendor, index) => (
                    <th key={index} className="text-center py-3 px-4 font-medium">
                      <div className="flex items-center justify-center gap-2">
                        <Image
                          src={vendor.logo || "/placeholder.svg"}
                          alt={vendor.name}
                          width={20}
                          height={20}
                          className="rounded"
                        />
                        {vendor.name}
                        {vendor.recommended && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, featureIndex) => (
                  <tr key={featureIndex} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{feature}</td>
                    {vendors.map((vendor, vendorIndex) => (
                      <td key={vendorIndex} className="py-3 px-4 text-center">
                        {getFeatureIcon(vendor.features[feature as keyof typeof vendor.features])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Total Cost of Ownership
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {vendors.map((vendor, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={vendor.logo || "/placeholder.svg"}
                      alt={vendor.name}
                      width={20}
                      height={20}
                      className="rounded"
                    />
                    <span className="text-sm font-medium">{vendor.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${(vendor.tco / 1000).toFixed(0)}K</div>
                    {index === 0 && <Badge className="bg-green-100 text-green-800 text-xs">Lowest Cost</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              Deployment Speed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {vendors.map((vendor, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={vendor.logo || "/placeholder.svg"}
                      alt={vendor.name}
                      width={20}
                      height={20}
                      className="rounded"
                    />
                    <span className="text-sm font-medium">{vendor.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{vendor.deployment} weeks</div>
                    {index === 0 && <Badge className="bg-blue-100 text-blue-800 text-xs">Fastest</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-portnox-blue" />
              Overall Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {vendors.map((vendor, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={vendor.logo || "/placeholder.svg"}
                      alt={vendor.name}
                      width={20}
                      height={20}
                      className="rounded"
                    />
                    <span className="text-sm font-medium">{vendor.name}</span>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${getScoreColor(vendor.score)}`}>{vendor.score}/100</div>
                    {vendor.recommended && (
                      <Badge className="bg-portnox-blue/10 text-portnox-blue text-xs">Top Rated</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendation Summary */}
      <Card className="bg-gradient-to-r from-portnox-blue/10 to-portnox-teal/10 border-portnox-blue/20">
        <CardHeader>
          <CardTitle className="text-portnox-blue">Recommendation Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Award className="h-5 w-5 text-portnox-blue mt-0.5" />
              <div>
                <h4 className="font-semibold text-portnox-blue">Portnox - Best Overall Value</h4>
                <p className="text-sm text-gray-700">
                  Combines the lowest TCO with fastest deployment and highest feature completeness. Ideal for{" "}
                  {settings.industry} organizations seeking modern, cloud-native NAC solutions.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-600">Key Advantages</h4>
                <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                  <li>33% lower TCO than nearest competitor</li>
                  <li>62% faster deployment timeline</li>
                  <li>100% cloud-native architecture</li>
                  <li>Superior user experience and modern interface</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
