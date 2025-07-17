"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle2, XCircle } from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface FeatureMatrixViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

export default function FeatureMatrixView({ results = [], config }: FeatureMatrixViewProps) {
  const featureCategories = useMemo(() => {
    if (results.length === 0) return []

    const firstVendorFeatures = results[0].vendorData.features
    return Object.keys(firstVendorFeatures).map((categoryKey) => ({
      name: categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1).replace(/([A-Z])/g, " $1"),
      key: categoryKey as keyof typeof firstVendorFeatures,
      features: Object.keys(firstVendorFeatures[categoryKey as keyof typeof firstVendorFeatures]).map((featureKey) => ({
        name: featureKey.charAt(0).toUpperCase() + featureKey.slice(1).replace(/([A-Z])/g, " $1"),
        key: featureKey,
      })),
    }))
  }, [results])

  const featureScores = useMemo(() => {
    return results.map((result) => {
      let totalFeatures = 0
      let supportedFeatures = 0
      Object.values(result.vendorData.features).forEach((category) => {
        Object.values(category).forEach((supported) => {
          totalFeatures++
          if (supported) supportedFeatures++
        })
      })
      return {
        vendorId: result.vendorId,
        vendorName: result.vendorName,
        score: totalFeatures > 0 ? (supportedFeatures / totalFeatures) * 100 : 0,
      }
    })
  }, [results])

  const getIcon = (supported: boolean) => {
    if (supported) return <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
    return <XCircle className="h-5 w-5 text-red-500 mx-auto" />
  }

  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          Please select vendors to compare features.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Feature Coverage Summary</CardTitle>
          <CardDescription>Overall feature support across all categories.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {featureScores.map((item) => (
            <Card key={item.vendorId} className="text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{item.vendorName}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-portnox-primary">{item.score.toFixed(0)}%</div>
                <p className="text-xs text-muted-foreground mt-1">Feature Coverage</p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {featureCategories.map((category) => (
        <Card key={category.key}>
          <CardHeader>
            <CardTitle>{category.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Feature</TableHead>
                  {results.map((result) => (
                    <TableHead key={result.vendorId} className="text-center">
                      {result.vendorName}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {category.features.map((feature) => (
                  <TableRow key={feature.key}>
                    <TableCell className="font-medium">{feature.name}</TableCell>
                    {results.map((result) => (
                      <TableCell key={result.vendorId} className="text-center">
                        {getIcon((result.vendorData.features[category.key] as any)[feature.key])}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
