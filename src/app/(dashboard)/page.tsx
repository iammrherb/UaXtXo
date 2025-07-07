"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useDashboardSettings } from "@/context/DashboardContext"
import ExecutiveSummary from "@/components/charts/dashboards/ExecutiveSummary"
import ComplianceOverview from "@/components/charts/dashboards/ComplianceOverview"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"

const Dashboard = () => {
  const { selectedOrgSize, selectedIndustry } = useDashboardSettings()
  const [activeTab, setActiveTab] = useState("overview")

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  }

  return (
    <motion.div variants={fadeInUp} initial="initial" animate="animate" className="space-y-8">
      {/* Executive Summary Section */}
      <ExecutiveSummary />

      {/* Compliance Overview Section */}
      <ComplianceOverview />

      {/* Additional Analysis and Reporting */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-white">Detailed Analysis</CardTitle>
            <CardDescription className="text-slate-400">
              Explore in-depth TCO, ROI, and vendor comparisons
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Button variant="secondary" size="lg">
              <FileText className="w-5 h-5 mr-2" />
              View Analysis
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-white">Custom Reports</CardTitle>
            <CardDescription className="text-slate-400">
              Generate tailored reports for your organization
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Button variant="secondary" size="lg">
              <Download className="w-5 h-5 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

export default Dashboard
