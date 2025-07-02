"use client"

import type React from "react"
import type { NewVendorData } from "@/lib/vendors/data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Wrench, Users, Clock } from "lucide-react"

interface OperationsImpactTabProps {
  vendorData: NewVendorData[]
}

const OperationsImpactTab: React.FC<OperationsImpactTabProps> = ({ vendorData }) => {
  const deploymentData = vendorData.map((v) => ({
    name: v.name,
    "Deployment Time (Days)": v.implementation.averageDeploymentTimeDays,
  }))
  const fteData = vendorData.map((v) => ({ name: v.name, "Required FTEs": v.tcoFactors.personnelCostFactor }))

  const complexityColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "medium":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "very_high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  return (
    <div className="space-y-8">
      <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Operational Impact Analysis</CardTitle>
          <CardDescription className="text-slate-400">
            Evaluating the impact of each solution on your IT operations, including staffing, deployment time, and
            complexity.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Users />
                Required FTEs Comparison
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={fteData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" strokeOpacity={0.3} />
                    <XAxis dataKey="name" tick={{ fill: "#94A3B8", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} />
                    <Tooltip
                      cursor={{ fill: "rgba(71, 85, 105, 0.3)" }}
                      contentStyle={{ backgroundColor: "rgba(30, 41, 59, 0.95)", borderColor: "#475569" }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Bar dataKey="Required FTEs" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Clock />
                Deployment Time Comparison
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deploymentData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" strokeOpacity={0.3} />
                    <XAxis dataKey="name" tick={{ fill: "#94A3B8", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} />
                    <Tooltip
                      cursor={{ fill: "rgba(71, 85, 105, 0.3)" }}
                      contentStyle={{ backgroundColor: "rgba(30, 41, 59, 0.95)", borderColor: "#475569" }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Bar dataKey="Deployment Time (Days)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Wrench />
              Implementation Complexity
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {vendorData.map((vendor) => (
                <div key={vendor.id} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 text-center">
                  <p className="font-semibold text-slate-200 mb-2">{vendor.name}</p>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full border ${complexityColor(vendor.implementation.complexityLevel)}`}
                  >
                    {vendor.implementation.complexityLevel.replace("_", " ").toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default OperationsImpactTab
