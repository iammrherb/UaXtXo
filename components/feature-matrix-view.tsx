"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"
import { CheckCircle, XCircle, AlertCircle, Search, Download } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface FeatureMatrixViewProps {
  selectedVendors: string[]
}

export default function FeatureMatrixView({ selectedVendors }: FeatureMatrixViewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("authentication")

  const vendors = selectedVendors.map((id) => ComprehensiveVendorDatabase[id]).filter(Boolean)

  if (vendors.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <p>No vendors selected for feature comparison</p>
        </CardContent>
      </Card>
    )
  }

  const getFeatureIcon = (support: string) => {
    switch (support) {
      case "✓✓✓":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "✓✓":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      case "✓":
        return <CheckCircle className="h-4 w-4 text-yellow-600" />
      case "✗":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getFeatureLabel = (support: string) => {
    switch (support) {
      case "✓✓✓":
        return "Excellent"
      case "✓✓":
        return "Good"
      case "✓":
        return "Basic"
      case "✗":
        return "Not Supported"
      default:
        return "Unknown"
    }
  }

  const categories = [
    { key: "authentication", name: "Authentication", icon: "🔐" },
    { key: "network", name: "Network Support", icon: "🌐" },
    { key: "advanced", name: "Advanced Features", icon: "⚡" },
    { key: "compliance", name: "Compliance", icon: "📋" },
  ]

  const renderFeatureMatrix = (categoryKey: string) => {
    const features = Object.keys(vendors[0]?.featureSupport[categoryKey as keyof typeof vendors[0].featureSupport
    ] ||
    )\
    const filteredFeatures = features.filter((feature) => feature.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 font-semibold">Feature</th>
              {vendors.map((vendor) => (
                <th key={vendor.id} className="text-center p-3 font-semibold min-w-[120px]">
                  {vendor.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredFeatures.map((feature) => (
              <tr key={feature} className="border-b hover:bg-muted/50">
                <td className="p-3 font-medium">{feature}</td>
                {vendors.map((vendor) => {
                  const support = vendor.featureSupport[categoryKey as keyof typeof vendor.featureSupport][feature]
                  return (
                    <td key={vendor.id} className="text-center p-3">
                      <div className="flex items-center justify-center space-x-2">
                        {getFeatureIcon(support)}
                        <span className="text-xs text-muted-foreground">{getFeatureLabel(support)}</span>
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const calculateCategoryScore = (vendor: any, categoryKey: string) => {
    const features = vendor.featureSupport[categoryKey as keyof typeof vendor.featureSupport]
    const values = Object.values(features)
    const excellentCount = values.filter((v) => v === "✓✓✓").length
    const goodCount = values.filter((v) => v === "✓✓").length
    const basicCount = values.filter((v) => v === "✓").length
    const total = values.length

    return Math.round(((excellentCount * 3 + goodCount * 2 + basicCount * 1) / (total * 3)) * 100)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Feature Comparison Matrix</h2>
          <p className="text-muted-foreground">Compare features across selected vendors</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search features..."
              className="pl-8 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Category Scores Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Card key={category.key}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center space-x-2">
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {vendors.map((vendor) => {
                  const score = calculateCategoryScore(vendor, category.key)
                  return (
                    <div key={vendor.id} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{vendor.name}</span>
                      <Badge variant={score > 80 ? "default" : score > 60 ? "secondary" : "outline"}>{score}%</Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feature Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Feature Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid w-full grid-cols-4">
              {categories.map((category) => (
                <TabsTrigger key={category.key} value={category.key} className="flex items-center space-x-2">
                  <span>{category.icon}</span>
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.key} value={category.key} className="mt-6">
                {renderFeatureMatrix(category.key)}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Feature Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Support Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Excellent (✓✓✓)</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Good (✓✓)</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm">Basic (✓)</span>
            </div>
            <div className="flex items-center space-x-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm">Not Supported (✗)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vendor Strengths Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Strengths Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vendors.map((vendor) => {
              const strengths = categories
                .map((category) => ({
                  category: category.name,
                  score: calculateCategoryScore(vendor, category.key),
                }))
                .sort((a, b) => b.score - a.score)

              return (
                <div key={vendor.id} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-3">{vendor.name}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {strengths.map((strength) => (
                      <div key={strength.category} className="text-center">
                        <p className="text-sm text-muted-foreground">{strength.category}</p>
                        <p className="text-lg font-semibold">{strength.score}%</p>
                        <div
                          className={cn(
                            "w-full h-2 rounded-full mt-1",
                            strength.score > 80 ? "bg-green-200" : strength.score > 60 ? "bg-blue-200" : "bg-gray-200",
                          )}
                        >
                          <div
                            className={cn(
                              "h-full rounded-full",
                              strength.score > 80
                                ? "bg-green-600"
                                : strength.score > 60
                                  ? "bg-blue-600"
                                  : "bg-gray-600",
                            )}
                            style={{ width: `${strength.score}%` }}
                          />
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
