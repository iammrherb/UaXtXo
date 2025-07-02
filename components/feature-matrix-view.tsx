"use client"

import React from "react"
import { motion } from "framer-motion"
import { ComprehensiveVendorDatabase, FEATURE_CATEGORIES } from "@/lib/comprehensive-vendor-data"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SectionTitle, fadeInUp, staggerChildren } from "./shared-ui"
import { CheckCircle2, XCircle, MinusCircle, LayoutGrid } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface FeatureMatrixViewProps {
  selectedVendors: string[]
}

const renderCheck = (value: boolean | string | undefined) => {
  if (value === true || value === "✓✓✓") return <CheckCircle2 className="h-5 w-5 text-green-500" />
  if (value === "✓✓") return <CheckCircle2 className="h-5 w-5 text-lime-500" />
  if (value === "✓") return <CheckCircle2 className="h-5 w-5 text-yellow-500" />
  if (value === false || value === "✗") return <XCircle className="h-5 w-5 text-red-500" />
  if (value === "limited") return <MinusCircle className="h-5 w-5 text-orange-500" />
  if (typeof value === "string") return <Badge variant="secondary">{value}</Badge>
  return <XCircle className="h-5 w-5 text-muted-foreground" />
}

export default function FeatureMatrixView({ selectedVendors }: FeatureMatrixViewProps) {
  const vendors = selectedVendors.map((id) => ComprehensiveVendorDatabase[id])

  return (
    <motion.div className="space-y-8" initial="initial" animate="animate" variants={staggerChildren}>
      <motion.div variants={fadeInUp}>
        <SectionTitle
          icon={<LayoutGrid />}
          title="Feature Comparison Matrix"
          description="A detailed, side-by-side feature comparison across all selected vendors."
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Feature Matrix</h3>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Feature</TableHead>
                    {vendors.map((v) => (
                      <TableHead key={v.id} className="text-center min-w-[120px]">
                        {v.name}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(FEATURE_CATEGORIES).map(([category, features]) => (
                    <React.Fragment key={category}>
                      <TableRow>
                        <TableCell colSpan={vendors.length + 1} className="bg-muted font-bold">
                          {category}
                        </TableCell>
                      </TableRow>
                      {Object.entries(features).map(([featureKey, featureLabel]) => (
                        <TableRow key={featureKey}>
                          <TableCell className="font-medium">{featureLabel}</TableCell>
                          {vendors.map((v) => (
                            <TableCell key={v.id} className="text-center">
                              {renderCheck((v.features as any)[category.toLowerCase().replace(/ & /g, "")][featureKey])}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
