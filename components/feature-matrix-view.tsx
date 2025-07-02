"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"
import { staggerChildren, fadeInUp } from "./shared-ui"
import { CheckCircle2, MinusCircle, XCircle } from "lucide-react"

const FEATURE_CATEGORIES = {
  Authentication: "authentication",
  Network: "network",
  Advanced: "advanced",
  Compliance: "compliance",
}

export default function FeatureMatrixView({ selectedVendors }: { selectedVendors: string[] }) {
  const vendors = selectedVendors.map((id) => ComprehensiveVendorDatabase[id]).filter(Boolean)

  const renderCheck = (value: string) => {
    if (value === "✓✓✓") return <CheckCircle2 className="h-5 w-5 text-green-500" />
    if (value === "✓✓") return <CheckCircle2 className="h-5 w-5 text-yellow-500" />
    if (value === "✓") return <MinusCircle className="h-5 w-5 text-orange-500" />
    if (value === "✗") return <XCircle className="h-5 w-5 text-red-500" />
    return <span className="text-xs">{value}</span>
  }

  const allFeatures = Object.values(FEATURE_CATEGORIES).reduce(
    (acc, categoryKey) => {
      vendors.forEach((vendor) => {
        if (vendor.featureSupport[categoryKey]) {
          Object.keys(vendor.featureSupport[categoryKey]).forEach((feature) => {
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
    <motion.div className="space-y-6" initial="initial" animate="animate" variants={staggerChildren}>
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Feature Comparison Matrix</CardTitle>
            <CardDescription>Side-by-side feature support across selected vendors.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature</TableHead>
                  {vendors.map((v) => (
                    <TableHead key={v.id} className="text-center">
                      {v.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(allFeatures).map(([category, features]) => (
                  <>
                    <TableRow key={category} className="bg-muted/50">
                      <TableCell colSpan={vendors.length + 1} className="font-bold">
                        {Object.keys(FEATURE_CATEGORIES).find(
                          (key) => FEATURE_CATEGORIES[key as keyof typeof FEATURE_CATEGORIES] === category,
                        )}
                      </TableCell>
                    </TableRow>
                    {Array.from(features).map((feature) => (
                      <TableRow key={feature}>
                        <TableCell className="font-medium">{feature}</TableCell>
                        {vendors.map((v) => (
                          <TableCell key={v.id} className="text-center">
                            {renderCheck(
                              v.featureSupport[category as keyof typeof FEATURE_CATEGORIES]?.[feature] || "✗",
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
