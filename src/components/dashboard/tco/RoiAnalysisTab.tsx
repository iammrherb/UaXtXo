"use client"

import type React from "react"
import { motion } from "framer-motion"
import type { TCOResult } from "@/hooks/useTcoCalculator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { TrendingUp, Clock, Percent, Shield, Zap, DollarSign } from "lucide-react"

interface RoiAnalysisTabProps {
  tcoResults: TCOResult[]
}

const RoiAnalysisTab: React.FC<RoiAnalysisTabProps> = ({ tcoResults }) => {
  const formatCurrency = (value: number) =>
    value.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 })

  return (
    <div className="space-y-8">
      <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-white">ROI & Business Value Analysis</CardTitle>
          <CardDescription className="text-slate-400">
            Comparing the financial returns, payback periods, and efficiency gains for each vendor.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tcoResults.map((result, index) => (
              <motion.div
                key={result.vendorId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-slate-900/50 border-slate-700 h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-lg text-cyan-400">{result.vendorName}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-amber-400" />
                      <div>
                        <p className="text-sm text-slate-400">Payback Period</p>
                        <p className="text-lg font-bold text-white">{result.roiMetrics.paybackPeriodMonths} months</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Percent className="w-5 h-5 text-emerald-400" />
                      <div>
                        <p className="text-sm text-slate-400">Annualized ROI</p>
                        <p className="text-lg font-bold text-white">{result.roiMetrics.annualizedROIPercent}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="text-sm text-slate-400">Total Annual Benefits</p>
                        <p className="text-lg font-bold text-white">
                          {formatCurrency(result.roiMetrics.totalAnnualizedBenefits)}
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-slate-700 pt-4 space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 flex items-center gap-2">
                          <Shield size={14} />
                          Incident Reduction
                        </span>
                        <span className="font-medium text-slate-200">
                          {formatCurrency(result.roiMetrics.incidentReductionSavingsAnnual)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 flex items-center gap-2">
                          <TrendingUp size={14} />
                          Compliance Automation
                        </span>
                        <span className="font-medium text-slate-200">
                          {formatCurrency(result.roiMetrics.complianceAutomationSavingsAnnual)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 flex items-center gap-2">
                          <Zap size={14} />
                          Operational Efficiency
                        </span>
                        <span className="font-medium text-slate-200">
                          {formatCurrency(result.roiMetrics.operationalEfficiencyGainsAnnual)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RoiAnalysisTab
