"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import VendorComparisonMatrix from "./vendor-comparison-matrix"
import ROICalculatorView from "./roi-calculator-view"

const TCOAnalyzer = () => {
  const [selectedVendors, setSelectedVendors] = useState<string[]>([])

  return (
    <Tabs defaultValue="selection" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-8">
        <TabsTrigger value="selection">Selection</TabsTrigger>
        <TabsTrigger value="comparison">Comparison</TabsTrigger>
        <TabsTrigger value="roi">ROI Calculator</TabsTrigger>
        <TabsTrigger value="migration">Migration</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="compliance">Compliance</TabsTrigger>
        <TabsTrigger value="operational">Operational</TabsTrigger>
        <TabsTrigger value="executive">Executive</TabsTrigger>
      </TabsList>
      <TabsContent value="selection">Make a selection</TabsContent>
      <TabsContent value="comparison">
        <VendorComparisonMatrix selectedVendors={selectedVendors} onVendorSelectionChange={setSelectedVendors} />
      </TabsContent>
      <TabsContent value="roi">
        <ROICalculatorView selectedVendors={selectedVendors} />
      </TabsContent>
      <TabsContent value="migration">Migration</TabsContent>
      <TabsContent value="security">Security</TabsContent>
      <TabsContent value="compliance">Compliance</TabsContent>
      <TabsContent value="operational">Operational</TabsContent>
      <TabsContent value="executive">Executive</TabsContent>
    </Tabs>
  )
}

export default TCOAnalyzer
