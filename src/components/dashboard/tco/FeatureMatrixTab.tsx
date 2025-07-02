"use client"

import React from "react"

import type { NewVendorData } from "@/lib/vendors/data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Check, Minus } from "lucide-react"

interface FeatureMatrixTabProps {
  vendorData: NewVendorData[]
}

const featureCategories = {
  Authentication: ["802.1X", "MAB", "Web Auth", "SAML 2.0", "OAuth 2.0", "TACACS+", "Cert-Based"],
  "Device & Network Support": ["Wired", "Wireless", "VPN", "BYOD", "IoT", "OT", "Guest", "Mobile"],
  "Advanced Features": ["Zero Trust", "AI/ML", "Cloud Native", "HA/DR", "API", "Automation"],
}

const FeatureMatrixTab = ({ vendorData }) => {
  const getFeatureScore = (vendor: NewVendorData, category: string, feature: string): number | null => {
    const score = vendor.features?.[category]?.[feature]?.score
    return typeof score === "number" ? score : null
  }

  const ScoreIndicator = ({ score }: { score: number | null }) => {
    if (score === null || score < 50) {
      return <Minus className="w-5 h-5 text-slate-500 mx-auto" />
    }
    if (score >= 90) {
      return <Check className="w-5 h-5 text-emerald-400 mx-auto" />
    }
    return <Check className="w-5 h-5 text-amber-400 mx-auto" />
  }

  return (
    <div className="space-y-8">
      <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Feature Comparison Matrix</CardTitle>
          <CardDescription className="text-slate-400">
            A detailed look at key feature support across all selected vendors.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-slate-700">
            <table className="min-w-full divide-y divide-slate-700">
              <thead className="bg-slate-800/70">
                <tr>
                  <th
                    scope="col"
                    className="sticky left-0 bg-slate-800/70 z-20 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-100 sm:pl-6"
                  >
                    Feature
                  </th>
                  {vendorData.map((vendor) => (
                    <th
                      key={vendor.id}
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-slate-100 w-32"
                    >
                      {vendor.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                {Object.entries(featureCategories).map(([category, features]) => (
                  <React.Fragment key={category}>
                    <tr className="bg-slate-800/50">
                      <td
                        colSpan={vendorData.length + 1}
                        className="sticky left-0 bg-slate-800/50 z-10 px-4 py-2 text-sm font-bold text-cyan-400 sm:pl-6"
                      >
                        {category}
                      </td>
                    </tr>
                    {features.map((feature) => (
                      <tr
                        key={`${category}-${feature}`}
                        className="hover:bg-slate-700/30 transition-colors duration-150"
                      >
                        <td className="sticky left-0 bg-slate-900/50 hover:bg-slate-700/30 z-10 whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-slate-200 sm:pl-6">
                          {feature}
                        </td>
                        {vendorData.map((vendor) => (
                          <td
                            key={`${vendor.id}-${feature}`}
                            className="whitespace-nowrap px-3 py-3 text-sm text-center text-slate-300"
                          >
                            <ScoreIndicator score={getFeatureScore(vendor, category, feature)} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FeatureMatrixTab
