"use client"

import type React from "react"
import type { NewVendorData } from "@/lib/vendors/data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ImplementationTabProps {
  vendorData: NewVendorData[]
}

const ImplementationTab: React.FC<ImplementationTabProps> = ({ vendorData }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Implementation Metrics</CardTitle>
          <CardDescription>Key metrics related to the implementation of each vendor.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Vendor</TableHead>
                <TableHead>Deployment Time (Days)</TableHead>
                <TableHead>Complexity</TableHead>
                <TableHead>Agentless (%)</TableHead>
                <TableHead>Cloud Native</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendorData.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">{vendor.name}</TableCell>
                  <TableCell>{vendor.implementation.averageDeploymentTimeDays}</TableCell>
                  <TableCell>{vendor.implementation.complexityLevel}</TableCell>
                  <TableCell>{vendor.implementation.agentlessCapabilityPercent}</TableCell>
                  <TableCell>{vendor.implementation.cloudNative ? "Yes" : "No"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default ImplementationTab
