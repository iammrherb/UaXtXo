"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"
import {
  CheckCircle2,
  XCircle,
  MinusCircle,
  Search,
  Filter,
  Star,
  Shield,
  Zap,
  Users,
  Globe,
  Settings,
} from "lucide-react"

interface EnhancedFeatureComparisonViewProps {
  selectedVendors: string[]
}

const FEATURE_CATEGORIES = {
  authentication: {
    name: "Authentication & Identity",
    icon: <Shield className="h-4 w-4" />,
    color: "text-blue-600",
  },
  network: {
    name: "Network Control",
    icon: <Globe className="h-4 w-4" />,
    color: "text-green-600",
  },
  advanced: {
    name: "Advanced Security",
    icon: <Zap className="h-4 w-4" />,
    color: "text-purple-600",
  },
  compliance: {
    name: "Compliance & Reporting",
    icon: <Settings className="h-4 w-4" />,
    color: "text-orange-600",
  },
  management: {
    name: "Management & Operations",
    icon: <Users className="h-4 w-4" />,
    color: "text-red-600",
  },
}

const FEATURE_WEIGHTS = {
  "✓✓✓": { score: 100, label: "Excellent", color: "text-green-600", bg: "bg-green-100" },
  "✓✓": { score: 75, label: "Good", color: "text-blue-600", bg: "bg-blue-100" },
  "✓": { score: 50, label: "Basic", color: "text-yellow-600", bg: "bg-yellow-100" },
  "✗": { score: 0, label: "Not Available", color: "text-red-600", bg: "bg-red-100" },
  "N/A": { score: 0, label: "Not Applicable", color: "text-gray-600", bg: "bg-gray-100" },
}

export function EnhancedFeatureComparisonView({ selectedVendors }: EnhancedFeatureComparisonViewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(Object.keys(FEATURE_CATEGORIES))
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false)
  const [sortBy, setSortBy] = useState<"name" | "score">("name")

  const vendors = selectedVendors
    .map((id) => ComprehensiveVendorDatabase[id])
    .filter(Boolean)
    .slice(0, 6) // Limit to 6 vendors for better display

  const renderFeatureIcon = (value: string) => {
    const weight = FEATURE_WEIGHTS[value as keyof typeof FEATURE_WEIGHTS]
    if (!weight) return <span className="text-xs">{value}</span>

    switch (value) {
      case "✓✓✓":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "✓✓":
        return <CheckCircle2 className="h-4 w-4 text-blue-600" />
      case "✓":
        return <MinusCircle className="h-4 w-4 text-yellow-600" />
      case "✗":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <span className="text-xs text-gray-600">{value}</span>
    }
  }

  const calculateVendorScore = (vendor: any) => {
    let totalScore = 0
    let totalFeatures = 0

    Object.keys(FEATURE_CATEGORIES).forEach((categoryKey) => {
      const features = vendor.featureSupport?.[categoryKey] || {}
      Object.values(features).forEach((value: any) => {
        const weight = FEATURE_WEIGHTS[value as keyof typeof FEATURE_WEIGHTS]
        if (weight) {
          totalScore += weight.score
          totalFeatures++
        }
      })
    })

    return totalFeatures > 0 ? Math.round(totalScore / totalFeatures) : 0
  }

  const getAllFeatures = () => {
    const allFeatures: Record<string, Set<string>> = {}

    vendors.forEach((vendor) => {
      Object.keys(FEATURE_CATEGORIES).forEach((categoryKey) => {
        if (!allFeatures[categoryKey]) allFeatures[categoryKey] = new Set()
        const features = vendor.featureSupport?.[categoryKey] || {}
        Object.keys(features).forEach((feature) => {
          allFeatures[categoryKey].add(feature)
        })
      })
    })

    return allFeatures
  }

  const filteredFeatures = () => {
    const allFeatures = getAllFeatures()
    const filtered: Record<string, string[]> = {}

    Object.entries(allFeatures).forEach(([category, features]) => {
      if (!selectedCategories.includes(category)) return

      const categoryFeatures = Array.from(features).filter((feature) =>
        feature.toLowerCase().includes(searchTerm.toLowerCase()),
      )

      if (showOnlyDifferences) {
        const featuresWithDifferences = categoryFeatures.filter((feature) => {
          const values = vendors.map((vendor) => vendor.featureSupport?.[category]?.[feature] || "✗")
          return new Set(values).size > 1 // Only show features where vendors differ
        })
        if (featuresWithDifferences.length > 0) {
          filtered[category] = featuresWithDifferences
        }
      } else {
        if (categoryFeatures.length > 0) {
          filtered[category] = categoryFeatures
        }
      }
    })

    return filtered
  }

  const vendorScores = vendors.map((vendor) => ({
    ...vendor,
    overallScore: calculateVendorScore(vendor),
  }))

  const sortedVendors = [...vendorScores].sort((a, b) => {
    if (sortBy === "score") {
      return b.overallScore - a.overallScore
    }
    return a.name.localeCompare(b.name)
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Feature Comparison</h2>
          <p className="text-muted-foreground">Detailed feature analysis across selected vendors</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {vendors.length} Vendors
        </Badge>
      </div>

      {/* Vendor Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedVendors.map((vendor, index) => (
          <Card key={vendor.id} className={vendor.id === "portnox" ? "ring-2 ring-primary" : ""}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{vendor.name}</h3>
                  {vendor.id === "portnox" && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                </div>
                <Badge
                  variant={vendor.overallScore > 80 ? "default" : vendor.overallScore > 60 ? "secondary" : "outline"}
                >
                  {vendor.overallScore}/100
                </Badge>
              </div>
              <div className="space-y-2">
                {Object.entries(FEATURE_CATEGORIES).map(([categoryKey, category]) => {
                  const features = vendor.featureSupport?.[categoryKey] || {}
                  const categoryScore =
                    Object.values(features).reduce((sum: number, value: any) => {
                      const weight = FEATURE_WEIGHTS[value as keyof typeof FEATURE_WEIGHTS]
                      return sum + (weight?.score || 0)
                    }, 0) / Math.max(Object.keys(features).length, 1)

                  return (
                    <div key={categoryKey} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        {category.icon}
                        <span className={category.color}>{category.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {Math.round(categoryScore)}/100
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="comparison" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="comparison">Feature Matrix</TabsTrigger>
          <TabsTrigger value="analysis">Gap Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  <Input
                    placeholder="Search features..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm font-medium">Categories:</span>
                  {Object.entries(FEATURE_CATEGORIES).map(([key, category]) => (
                    <div key={key} className="flex items-center gap-1">
                      <Checkbox
                        checked={selectedCategories.includes(key)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([...selectedCategories, key])
                          } else {
                            setSelectedCategories(selectedCategories.filter((c) => c !== key))
                          }
                        }}
                      />
                      <span className="text-xs">{category.name}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox checked={showOnlyDifferences} onCheckedChange={setShowOnlyDifferences} />
                  <span className="text-sm">Show only differences</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Sort by:</span>
                  <Button
                    variant={sortBy === "name" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy("name")}
                  >
                    Name
                  </Button>
                  <Button
                    variant={sortBy === "score" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy("score")}
                  >
                    Score
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Comparison Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium sticky left-0 bg-muted/50 z-10">Feature</th>
                      {sortedVendors.map((vendor) => (
                        <th key={vendor.id} className="text-center p-4 font-medium min-w-32">
                          <div className="flex flex-col items-center gap-1">
                            <span>{vendor.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {vendor.overallScore}/100
                            </Badge>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(filteredFeatures()).map(([categoryKey, features]) => (
                      <>
                        <tr key={categoryKey} className="bg-muted/20">
                          <td colSpan={vendors.length + 1} className="p-4 font-semibold sticky left-0 bg-muted/20 z-10">
                            <div className="flex items-center gap-2">
                              {FEATURE_CATEGORIES[categoryKey as keyof typeof FEATURE_CATEGORIES].icon}
                              <span
                                className={FEATURE_CATEGORIES[categoryKey as keyof typeof FEATURE_CATEGORIES].color}
                              >
                                {FEATURE_CATEGORIES[categoryKey as keyof typeof FEATURE_CATEGORIES].name}
                              </span>
                            </div>
                          </td>
                        </tr>
                        {features.map((feature) => (
                          <tr key={feature} className="border-b hover:bg-muted/10">
                            <td className="p-4 font-medium sticky left-0 bg-background z-10">{feature}</td>
                            {sortedVendors.map((vendor) => {
                              const value = vendor.featureSupport?.[categoryKey]?.[feature] || "✗"
                              const weight = FEATURE_WEIGHTS[value as keyof typeof FEATURE_WEIGHTS]
                              return (
                                <td key={vendor.id} className="p-4 text-center">
                                  <div className="flex flex-col items-center gap-1">
                                    {renderFeatureIcon(value)}
                                    {weight && (
                                      <Badge variant="outline" className={`text-xs ${weight.color}`}>
                                        {weight.label}
                                      </Badge>
                                    )}
                                  </div>
                                </td>
                              )
                            })}
                          </tr>
                        ))}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(FEATURE_CATEGORIES).map(([categoryKey, category]) => (
              <Card key={categoryKey}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {category.icon}
                    <span className={category.color}>{category.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sortedVendors.map((vendor) => {
                      const features = vendor.featureSupport?.[categoryKey] || {}
                      const categoryScore =
                        Object.values(features).reduce((sum: number, value: any) => {
                          const weight = FEATURE_WEIGHTS[value as keyof typeof FEATURE_WEIGHTS]
                          return sum + (weight?.score || 0)
                        }, 0) / Math.max(Object.keys(features).length, 1)

                      const excellentFeatures = Object.values(features).filter((v) => v === "✓✓✓").length
                      const goodFeatures = Object.values(features).filter((v) => v === "✓✓").length
                      const basicFeatures = Object.values(features).filter((v) => v === "✓").length
                      const missingFeatures = Object.values(features).filter((v) => v === "✗").length

                      return (
                        <div key={vendor.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{vendor.name}</span>
                            <Badge
                              variant={categoryScore > 80 ? "default" : categoryScore > 60 ? "secondary" : "outline"}
                            >
                              {Math.round(categoryScore)}/100
                            </Badge>
                          </div>
                          <div className="grid grid-cols-4 gap-2 text-xs">
                            <div className="text-center">
                              <div className="text-green-600 font-medium">{excellentFeatures}</div>
                              <div className="text-muted-foreground">Excellent</div>
                            </div>
                            <div className="text-center">
                              <div className="text-blue-600 font-medium">{goodFeatures}</div>
                              <div className="text-muted-foreground">Good</div>
                            </div>
                            <div className="text-center">
                              <div className="text-yellow-600 font-medium">{basicFeatures}</div>
                              <div className="text-muted-foreground">Basic</div>
                            </div>
                            <div className="text-center">
                              <div className="text-red-600 font-medium">{missingFeatures}</div>
                              <div className="text-muted-foreground">Missing</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sortedVendors
                    .filter((v) => v.overallScore > 75)
                    .map((vendor) => (
                      <div key={vendor.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{vendor.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Strong across {Object.keys(FEATURE_CATEGORIES).length} categories
                          </div>
                        </div>
                        <Badge variant="default">{vendor.overallScore}/100</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-orange-600">Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sortedVendors
                    .filter((v) => v.overallScore < 75)
                    .map((vendor) => (
                      <div key={vendor.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{vendor.name}</div>
                          <div className="text-sm text-muted-foreground">Consider feature gaps before selection</div>
                        </div>
                        <Badge variant="outline">{vendor.overallScore}/100</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Selection Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Best Overall Choice</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {sortedVendors[0]?.name} offers the most comprehensive feature set with a score of{" "}
                    {sortedVendors[0]?.overallScore}/100. Recommended for organizations requiring full NAC capabilities.
                  </p>
                </div>

                <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Best Value Option</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Consider vendors with scores above 70 for good feature coverage at potentially lower costs. Evaluate
                    based on your specific requirements.
                  </p>
                </div>

                <div className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Specialized Solutions</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Some vendors excel in specific categories. Consider your priority features when making the final
                    decision.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default EnhancedFeatureComparisonView
