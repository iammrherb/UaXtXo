"use client"

import type React from "react"
import type { NewVendorData } from "@/lib/vendors/data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle, XCircle, Clock, Wrench, Cloud, Server } from "lucide-react"

interface ImplementationTabProps {
  vendorData: NewVendorData[]
}

const ImplementationTab: React.FC<ImplementationTabProps> = ({ vendorData }) => {
  const formatCurrency = (value: number | undefined) => {
    if (typeof value !== "number") return "N/A"
    return value.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 })
  }

  return (
    <div className="space-y-8">
      <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Implementation & Deployment Analysis</CardTitle>
          <CardDescription className="text-slate-400">
            Comparing deployment timelines, complexity, infrastructure requirements, and initial costs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-slate-700">
            <table className="min-w-full divide-y divide-slate-700">
              <thead className="bg-slate-800/70">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-100 sm:pl-6">
                    Metric
                  </th>
                  {vendorData.map((vendor) => (
                    <th
                      key={vendor.id}
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-slate-100"
                    >
                      {vendor.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                <tr className="hover:bg-slate-700/30">
                  <td className="py-3 pl-4 pr-3 text-sm font-medium text-slate-200 sm:pl-6 flex items-center gap-2">
                    <Clock size={16} />
                    Avg. Deployment Time
                  </td>
                  {vendorData.map((v) => (
                    <td key={v.id} className="px-3 py-3 text-center text-slate-300">
                      {v.implementation.averageDeploymentTimeDays} days
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-700/30">
                  <td className="py-3 pl-4 pr-3 text-sm font-medium text-slate-200 sm:pl-6 flex items-center gap-2">
                    <Wrench size={16} />
                    Complexity
                  </td>
                  {vendorData.map((v) => (
                    <td key={v.id} className="px-3 py-3 text-center text-slate-300 capitalize">
                      {v.implementation.complexityLevel.replace("_", " ")}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-700/30">
                  <td className="py-3 pl-4 pr-3 text-sm font-medium text-slate-200 sm:pl-6 flex items-center gap-2">
                    <Server size={16} />
                    Requires Hardware
                  </td>
                  {vendorData.map((v) => (
                    <td key={v.id} className="px-3 py-3 text-center">
                      {v.implementation.requiresHardware ? (
                        <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-700/30">
                  <td className="py-3 pl-4 pr-3 text-sm font-medium text-slate-200 sm:pl-6 flex items-center gap-2">
                    <Cloud size={16} />
                    Cloud Native
                  </td>
                  {vendorData.map((v) => (
                    <td key={v.id} className="px-3 py-3 text-center">
                      {v.implementation.cloudNative ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-700/30">
                  <td className="py-3 pl-4 pr-3 text-sm font-medium text-slate-200 sm:pl-6">Initial Training Cost</td>
                  {vendorData.map((v) => (
                    <td key={v.id} className="px-3 py-3 text-center text-slate-300">
                      {formatCurrency(v.tcoFactors.trainingCostInitial)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-700/30">
                  <td className="py-3 pl-4 pr-3 text-sm font-medium text-slate-200 sm:pl-6">Prof. Services Factor</td>
                  {vendorData.map((v) => (
                    <td key={v.id} className="px-3 py-3 text-center text-slate-300">
                      {(v.implementation.professionalServicesCostFactor || 0) * 100}% of License
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ImplementationTab
