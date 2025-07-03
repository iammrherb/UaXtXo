"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { IndustrySelector } from "@/components/selectors/IndustrySelector"
import { OrgSizeSelector } from "@/components/selectors/OrgSizeSelector"
import { ComparisonYearsSelector } from "@/components/selectors/ComparisonYearsSelector"
import { VendorSelector } from "@/components/selectors/VendorSelector"
import { useDashboardContext } from "@/context/DashboardContext"
import { useVendorData } from "@/hooks/useVendorData"
import {
  Settings,
  ChevronDown,
  ChevronUp,
  Users,
  Building,
  Calendar,
  BarChart3,
  RefreshCw,
  Download,
  Share,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

export const ConfigurationBar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const {
    selectedVendors,
    selectedIndustry,
    selectedOrgSize,
    comparisonYears,
    showAdvancedMetrics,
    setShowAdvancedMetrics,
    resetToDefaults,
  } = useDashboardContext()

  const { getVendor } = useVendorData()

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate refresh delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }

  const selectedVendorNames = selectedVendors
    .map((id) => getVendor(id)?.name)
    .filter(Boolean)
    .slice(0, 3)

  return (
    <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Collapsed View */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-slate-400 hover:text-white"
            >
              <Settings className="w-4 h-4 mr-2" />
              Configuration
              {isExpanded ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
            </Button>

            <Separator orientation="vertical" className="h-6 bg-slate-600" />

            {/* Quick Summary */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300">
                  {selectedVendors.length} vendor{selectedVendors.length !== 1 ? "s" : ""}
                </span>
                {selectedVendorNames.length > 0 && (
                  <div className="flex items-center gap-1">
                    {selectedVendorNames.map((name, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {name}
                      </Badge>
                    ))}
                    {selectedVendors.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{selectedVendors.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-green-400" />
                <span className="text-slate-300 capitalize">{selectedIndustry.replace("_", " ")}</span>
              </div>

              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-400" />
                <span className="text-slate-300 capitalize">{selectedOrgSize.replace("_", " ")}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-400" />
                <span className="text-slate-300">
                  {comparisonYears} year{comparisonYears !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvancedMetrics(!showAdvancedMetrics)}
              className={cn(
                "text-slate-400 hover:text-white",
                showAdvancedMetrics && "text-purple-400 bg-purple-500/10",
              )}
            >
              <Sparkles className="w-4 h-4 mr-1" />
              Advanced
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="text-slate-400 hover:text-white"
            >
              <RefreshCw className={cn("w-4 h-4 mr-1", isRefreshing && "animate-spin")} />
              Refresh
            </Button>

            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>

            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <Share className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>
        </div>

        {/* Expanded Configuration Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <Separator className="my-4 bg-slate-700" />

              <Card className="bg-slate-700/30 border-slate-600">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                    {/* Vendor Selection */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-400" />
                        Vendor Selection
                      </h3>
                      <VendorSelector />
                    </div>

                    {/* Industry Selection */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                        <Building className="w-4 h-4 text-green-400" />
                        Industry
                      </h3>
                      <IndustrySelector />
                    </div>

                    {/* Organization Size */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-purple-400" />
                        Organization Size
                      </h3>
                      <OrgSizeSelector />
                    </div>

                    {/* Analysis Period */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-orange-400" />
                        Analysis Period
                      </h3>
                      <ComparisonYearsSelector />
                    </div>
                  </div>

                  {/* Advanced Options */}
                  <div className="mt-6 pt-6 border-t border-slate-600">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-1">Advanced Options</h3>
                        <p className="text-xs text-slate-400">Configure advanced analysis settings and preferences</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={resetToDefaults}
                          className="text-slate-400 border-slate-600 hover:text-white hover:border-slate-500 bg-transparent"
                        >
                          Reset to Defaults
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsExpanded(false)}
                          className="text-slate-400 border-slate-600 hover:text-white hover:border-slate-500"
                        >
                          Done
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
