"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
} from "recharts"
import {
  TrendingUp,
  DollarSign,
  Users,
  Shield,
  Clock,
  Download,
  FileText,
  Settings,
  BarChart3,
  Target,
  CheckCircle,
  XCircle,
  Info,
  Star,
  Building2,
  Zap,
  Cpu,
} from "lucide-react"
import { DashboardBuilder } from "./dashboard/DashboardBuilder"

// Vendor data with comprehensive details
const vendors = [
  {
    id: "portnox",
    name: "Portnox",
    logo: "/portnox-logo.png",
    price: "$15,000/year",
    complexity: "Low",
    deploymentTime: "2-4 weeks",
    type: "Cloud/On-Prem",
    marketShare: "12%",
    features: ["Zero Trust", "BYOD", "IoT Security", "Cloud-Native"],
    rating: 4.8,
    totalCost: 75000,
    savings: 45000,
    roi: 180,
  },
  {
    id: "cisco",
    name: "Cisco ISE",
    logo: "/cisco-logo.png",
    price: "$45,000/year",
    complexity: "High",
    deploymentTime: "12-16 weeks",
    type: "On-Prem/Hybrid",
    marketShare: "35%",
    features: ["Policy Engine", "TrustSec", "Guest Access", "Profiling"],
    rating: 4.2,
    totalCost: 225000,
    savings: 15000,
    roi: 45,
  },
  {
    id: "aruba",
    name: "Aruba ClearPass",
    logo: "/aruba-logo.png",
    price: "$35,000/year",
    complexity: "Medium",
    deploymentTime: "8-12 weeks",
    type: "Cloud/On-Prem",
    marketShare: "18%",
    features: ["Policy Manager", "Guest Portal", "Device Insight", "OnGuard"],
    rating: 4.1,
    totalCost: 175000,
    savings: 25000,
    roi: 65,
  },
  {
    id: "fortinet",
    name: "FortiNAC",
    logo: "/fortinet-logo.png",
    price: "$28,000/year",
    complexity: "Medium",
    deploymentTime: "6-10 weeks",
    type: "On-Prem/Cloud",
    marketShare: "15%",
    features: ["Network Visibility", "Automated Response", "Compliance", "Integration"],
    rating: 4.0,
    totalCost: 140000,
    savings: 30000,
    roi: 85,
  },
  {
    id: "forescout",
    name: "Forescout",
    logo: "/forescout-logo.png",
    price: "$40,000/year",
    complexity: "High",
    deploymentTime: "10-14 weeks",
    type: "On-Prem/Cloud",
    marketShare: "20%",
    features: ["Device Visibility", "Continuous Compliance", "Threat Detection", "OT Security"],
    rating: 4.3,
    totalCost: 200000,
    savings: 20000,
    roi: 55,
  },
]

// Sample data for charts
const tcoData = [
  { year: "Year 1", portnox: 25000, cisco: 75000, aruba: 58000, fortinet: 47000, forescout: 67000 },
  { year: "Year 2", portnox: 15000, cisco: 45000, aruba: 35000, fortinet: 28000, forescout: 40000 },
  { year: "Year 3", portnox: 15000, cisco: 45000, aruba: 35000, fortinet: 28000, forescout: 40000 },
  { year: "Year 4", portnox: 15000, cisco: 45000, aruba: 35000, fortinet: 28000, forescout: 40000 },
  { year: "Year 5", portnox: 15000, cisco: 45000, aruba: 35000, fortinet: 28000, forescout: 40000 },
]

const roiData = [
  { month: "Month 3", portnox: -25000, cisco: -75000, aruba: -58000, fortinet: -47000 },
  { month: "Month 6", portnox: -10000, cisco: -60000, aruba: -43000, fortinet: -32000 },
  { month: "Month 9", portnox: 15000, cisco: -45000, aruba: -28000, fortinet: -17000 },
  { month: "Month 12", portnox: 45000, cisco: -15000, aruba: 2000, fortinet: 13000 },
  { month: "Month 18", portnox: 85000, cisco: 25000, aruba: 42000, fortinet: 53000 },
  { month: "Month 24", portnox: 125000, cisco: 65000, aruba: 82000, fortinet: 93000 },
]

const operationalData = [
  { category: "FTE Reduction", portnox: 2.5, cisco: 1.2, aruba: 1.8, fortinet: 1.5 },
  { category: "Incident Response", portnox: 85, cisco: 65, aruba: 70, fortinet: 72 },
  { category: "Compliance Score", portnox: 95, cisco: 78, aruba: 82, fortinet: 80 },
  { category: "Automation Level", portnox: 90, cisco: 60, aruba: 70, fortinet: 75 },
]

const complianceData = [
  { framework: "SOX", portnox: 98, cisco: 85, aruba: 88, fortinet: 87, required: 90 },
  { framework: "PCI DSS", portnox: 96, cisco: 82, aruba: 85, fortinet: 84, required: 85 },
  { framework: "HIPAA", portnox: 94, cisco: 78, aruba: 81, fortinet: 80, required: 80 },
  { framework: "ISO 27001", portnox: 97, cisco: 88, aruba: 90, fortinet: 89, required: 85 },
  { framework: "GDPR", portnox: 95, cisco: 80, aruba: 83, fortinet: 82, required: 80 },
]

const riskData = [
  { risk: "Data Breach", probability: 15, impact: 95, portnoxMitigation: 85 },
  { risk: "Compliance Violation", probability: 25, impact: 70, portnoxMitigation: 90 },
  { risk: "Operational Downtime", probability: 20, impact: 80, portnoxMitigation: 75 },
  { risk: "Insider Threats", probability: 30, impact: 60, portnoxMitigation: 80 },
  { risk: "Third-party Access", probability: 35, impact: 55, portnoxMitigation: 85 },
]

export default function TCOAnalyzer() {
  const [selectedVendors, setSelectedVendors] = useState(["portnox", "cisco", "aruba"])
  const [orgSize, setOrgSize] = useState("mid-market")
  const [industry, setIndustry] = useState("technology")
  const [timeframe, setTimeframe] = useState(5)
  const [activeTab, setActiveTab] = useState("executive")
  const [showAdvanced, setShowAdvanced] = useState(false)

  const toggleVendor = (vendorId: string) => {
    setSelectedVendors((prev) => (prev.includes(vendorId) ? prev.filter((id) => id !== vendorId) : [...prev, vendorId]))
  }

  const selectedVendorData = vendors.filter((v) => selectedVendors.includes(v.id))
  const portnoxData = vendors.find((v) => v.id === "portnox")

  // Calculate totals and savings
  const totalSavings = selectedVendorData.reduce(
    (sum, vendor) => (vendor.id === "portnox" ? sum : sum + (vendor.totalCost - portnoxData!.totalCost)),
    0,
  )

  const avgROI = selectedVendorData.reduce((sum, vendor) => sum + vendor.roi, 0) / selectedVendorData.length

  // Export functions
  const exportToPDF = () => {
    // Implementation for PDF export
    console.log("Exporting to PDF...")
  }

  const exportToHTML = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>TCO Analysis Report - Executive Summary</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background: #f8fafc; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; }
          .header h1 { margin: 0; font-size: 2.5em; font-weight: 300; }
          .header p { margin: 10px 0 0 0; opacity: 0.9; font-size: 1.1em; }
          .summary { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 30px; }
          .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }
          .kpi-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; }
          .kpi-value { font-size: 2em; font-weight: bold; color: #10b981; margin-bottom: 5px; }
          .kpi-label { color: #6b7280; font-size: 0.9em; }
          .vendor-comparison { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .vendor-row { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid #e5e7eb; }
          .vendor-name { font-weight: 600; }
          .cost { color: #ef4444; font-weight: 600; }
          .savings { color: #10b981; font-weight: 600; }
          .footer { text-align: center; margin-top: 40px; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Network Access Control TCO Analysis</h1>
          <p>Executive Summary Report - ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="summary">
          <h2>Executive Summary</h2>
          <p>This comprehensive analysis evaluates the Total Cost of Ownership (TCO) for Network Access Control solutions across leading vendors. Our analysis demonstrates significant cost savings and operational benefits with Portnox's cloud-native approach.</p>
          
          <div class="kpi-grid">
            <div class="kpi-card">
              <div class="kpi-value">$${totalSavings.toLocaleString()}</div>
              <div class="kpi-label">Total 5-Year Savings</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-value">${avgROI}%</div>
              <div class="kpi-label">Average ROI</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-value">2.5</div>
              <div class="kpi-label">FTE Reduction</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-value">85%</div>
              <div class="kpi-label">Risk Reduction</div>
            </div>
          </div>
        </div>

        <div class="vendor-comparison">
          <h2>Vendor Cost Comparison (5-Year TCO)</h2>
          ${selectedVendorData
            .map(
              (vendor) => `
            <div class="vendor-row">
              <span class="vendor-name">${vendor.name}</span>
              <span class="cost">$${vendor.totalCost.toLocaleString()}</span>
              <span class="savings">${vendor.id === "portnox" ? "Baseline" : `+$${(vendor.totalCost - portnoxData!.totalCost).toLocaleString()}`}</span>
            </div>
          `,
            )
            .join("")}
        </div>

        <div class="footer">
          <p>Generated by Portnox TCO Analyzer | Confidential Business Analysis</p>
        </div>
      </body>
      </html>
    `

    const blob = new Blob([htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "tco-analysis-report.html"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Portnox TCO Analyzer
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Network Access Control Total Cost of Ownership Analysis
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
                <Settings className="w-4 h-4 mr-2" />
                {showAdvanced ? "Simple" : "Advanced"}
              </Button>
              <Button variant="outline" size="sm" onClick={exportToHTML}>
                <Download className="w-4 h-4 mr-2" />
                Export HTML
              </Button>
              <Button variant="outline" size="sm" onClick={exportToPDF}>
                <FileText className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 space-y-6">
            {/* Configuration Panel */}
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-slate-200 dark:border-slate-700">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Organization Size</Label>
                  <Select value={orgSize} onValueChange={setOrgSize}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (100-500 users)</SelectItem>
                      <SelectItem value="mid-market">Mid-Market (500-2000 users)</SelectItem>
                      <SelectItem value="enterprise">Enterprise (2000+ users)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Industry</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Financial Services</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Analysis Timeframe: {timeframe} years</Label>
                  <Slider
                    value={[timeframe]}
                    onValueChange={(value) => setTimeframe(value[0])}
                    max={10}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Vendor Selection */}
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-slate-200 dark:border-slate-700">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Vendor Selection
                </CardTitle>
                <CardDescription>Select vendors to compare ({selectedVendors.length} selected)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {vendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedVendors.includes(vendor.id)
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                    onClick={() => toggleVendor(vendor.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded flex items-center justify-center">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{vendor.name}</h4>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(vendor.rating) ? "text-yellow-400 fill-current" : "text-slate-300"
                                }`}
                              />
                            ))}
                            <span className="text-xs text-slate-600 ml-1">{vendor.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={vendor.id === "portnox" ? "default" : "secondary"} className="text-xs">
                        {vendor.marketShare}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">Price:</span>
                        <div className="font-semibold">{vendor.price}</div>
                      </div>
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">Complexity:</span>
                        <div
                          className={`font-semibold ${
                            vendor.complexity === "Low"
                              ? "text-green-600"
                              : vendor.complexity === "Medium"
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {vendor.complexity}
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">Deploy:</span>
                        <div className="font-semibold">{vendor.deploymentTime}</div>
                      </div>
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">Type:</span>
                        <div className="font-semibold">{vendor.type}</div>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {vendor.features.slice(0, 2).map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs px-1 py-0">
                          {feature}
                        </Badge>
                      ))}
                      {vendor.features.length > 2 && (
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          +{vendor.features.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                <TabsTrigger value="executive">Executive</TabsTrigger>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="tco-analysis">TCO Analysis</TabsTrigger>
                <TabsTrigger value="vendor-comparison">Vendor Comparison</TabsTrigger>
                <TabsTrigger value="compliance">Compliance & Risk</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              {/* Executive Dashboard */}
              <TabsContent value="executive" className="space-y-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-600 dark:text-green-400">Total Savings</p>
                          <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                            ${totalSavings.toLocaleString()}
                          </p>
                          <p className="text-xs text-green-600 dark:text-green-400 mt-1">5-year projection</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Average ROI</p>
                          <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{avgROI}%</p>
                          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">12-month payback</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                          <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Risk Reduction</p>
                          <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">85%</p>
                          <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Security incidents</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center">
                          <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-200 dark:border-orange-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Deployment Time</p>
                          <p className="text-3xl font-bold text-orange-700 dark:text-orange-300">2-4</p>
                          <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">weeks vs 12-16</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-800 rounded-full flex items-center justify-center">
                          <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Additional KPI Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border-teal-200 dark:border-teal-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-teal-600 dark:text-teal-400">FTE Reduction</p>
                          <p className="text-3xl font-bold text-teal-700 dark:text-teal-300">2.5</p>
                          <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">Full-time equivalents</p>
                        </div>
                        <div className="w-12 h-12 bg-teal-100 dark:bg-teal-800 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border-indigo-200 dark:border-indigo-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                            Operational Efficiency
                          </p>
                          <p className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">90%</p>
                          <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">Automation level</p>
                        </div>
                        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center">
                          <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 border-rose-200 dark:border-rose-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-rose-600 dark:text-rose-400">Compliance Score</p>
                          <p className="text-3xl font-bold text-rose-700 dark:text-rose-300">95%</p>
                          <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">Regulatory adherence</p>
                        </div>
                        <div className="w-12 h-12 bg-rose-100 dark:bg-rose-800 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* TCO Comparison Chart */}
                <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      5-Year Total Cost of Ownership Comparison
                    </CardTitle>
                    <CardDescription>
                      Comprehensive cost analysis including licensing, implementation, and operational expenses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={tcoData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Cost"]} />
                          <Legend />
                          {selectedVendorData.map((vendor, index) => (
                            <Bar
                              key={vendor.id}
                              dataKey={vendor.id}
                              name={vendor.name}
                              fill={`hsl(${index * 60}, 70%, 50%)`}
                            />
                          ))}
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* ROI Timeline */}
                <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Return on Investment Timeline
                    </CardTitle>
                    <CardDescription>Cumulative ROI and operational impact over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={roiData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "ROI"]} />
                          <Legend />
                          {selectedVendorData.map((vendor, index) => (
                            <Line
                              key={vendor.id}
                              type="monotone"
                              dataKey={vendor.id}
                              name={vendor.name}
                              stroke={`hsl(${index * 60}, 70%, 50%)`}
                              strokeWidth={2}
                            />
                          ))}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Key Insights */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Info className="w-5 h-5 mr-2" />
                        Key Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold">67% Lower TCO</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Portnox delivers significantly lower total cost of ownership compared to traditional
                            solutions
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold">85% Faster Deployment</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Cloud-native architecture enables rapid deployment and immediate value realization
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold">90% Automation Level</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Advanced AI-driven automation reduces manual intervention and operational overhead
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold">2.5 FTE Savings</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Reduced staffing requirements through intelligent automation and simplified management
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Star className="w-5 h-5 mr-2" />
                        Portnox Advantages
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-semibold">Zero Trust Architecture</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Built-in zero trust principles with continuous verification and least privilege access
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-semibold">Cloud-Native Platform</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Scalable, resilient cloud architecture with automatic updates and global availability
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-semibold">AI-Powered Insights</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Machine learning algorithms for threat detection and behavioral analysis
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-semibold">Unified Management</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Single pane of glass for all network access control and security policies
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Executive Summary */}
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="text-xl">Executive Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      Our comprehensive analysis demonstrates that Portnox delivers exceptional value through its
                      cloud-native Network Access Control platform. With a <strong>67% lower TCO</strong> compared to
                      traditional solutions,
                      <strong>85% faster deployment</strong>, and <strong>2.5 FTE reduction</strong> in operational
                      requirements, Portnox enables organizations to achieve superior security outcomes while
                      significantly reducing costs. The platform's zero trust architecture, AI-powered insights, and
                      unified management approach position it as the optimal choice for modern enterprises seeking to
                      secure their network infrastructure efficiently and cost-effectively.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Custom Dashboard Builder */}
              <TabsContent value="dashboard" className="space-y-6">
                <DashboardBuilder />
              </TabsContent>

              {/* TCO Analysis Tab */}
              <TabsContent value="tco-analysis" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Cost Breakdown */}
                  <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Cost Breakdown Analysis</CardTitle>
                      <CardDescription>Detailed cost components over {timeframe} years</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: "Licensing", value: 40, fill: "#3b82f6" },
                                { name: "Implementation", value: 25, fill: "#10b981" },
                                { name: "Training", value: 15, fill: "#f59e0b" },
                                { name: "Support", value: 20, fill: "#ef4444" },
                              ]}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            />
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* ROI Analysis */}
                  <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>ROI Analysis</CardTitle>
                      <CardDescription>Return on investment metrics and projections</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">180%</p>
                          <p className="text-sm text-green-600">3-Year ROI</p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">8 months</p>
                          <p className="text-sm text-blue-600">Payback Period</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Initial Investment</span>
                          <span className="font-semibold">$75,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Annual Savings</span>
                          <span className="font-semibold text-green-600">$112,500</span>
                        </div>
                        <div className="flex justify-between">
                          <span>3-Year Net Benefit</span>
                          <span className="font-semibold text-green-600">$262,500</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Operations Impact */}
                <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Operational Impact Analysis</CardTitle>
                    <CardDescription>Efficiency gains and resource optimization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={operationalData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="category" />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} />
                          <Radar name="Portnox" dataKey="portnox" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                          <Radar name="Cisco" dataKey="cisco" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                          <Radar name="Aruba" dataKey="aruba" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline View */}
                <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Implementation Timeline</CardTitle>
                    <CardDescription>Project phases and value realization milestones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { phase: "Planning & Design", duration: "2 weeks", status: "completed" },
                        { phase: "Pilot Deployment", duration: "1 week", status: "completed" },
                        { phase: "Full Rollout", duration: "2 weeks", status: "in-progress" },
                        { phase: "Training & Optimization", duration: "1 week", status: "pending" },
                        { phase: "Go-Live & Support", duration: "Ongoing", status: "pending" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div
                            className={`w-4 h-4 rounded-full ${
                              item.status === "completed"
                                ? "bg-green-500"
                                : item.status === "in-progress"
                                  ? "bg-blue-500"
                                  : "bg-slate-300"
                            }`}
                          />
                          <div className="flex-1">
                            <p className="font-semibold">{item.phase}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{item.duration}</p>
                          </div>
                          <Badge
                            variant={
                              item.status === "completed"
                                ? "default"
                                : item.status === "in-progress"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {item.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Vendor Comparison Tab */}
              <TabsContent value="vendor-comparison" className="space-y-6">
                {/* Feature Comparison Matrix */}
                <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Feature Comparison Matrix</CardTitle>
                    <CardDescription>Comprehensive feature analysis across selected vendors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Feature</th>
                            {selectedVendorData.map((vendor) => (
                              <th key={vendor.id} className="text-center p-2">
                                {vendor.name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            {
                              feature: "Zero Trust Architecture",
                              portnox: true,
                              cisco: false,
                              aruba: true,
                              fortinet: false,
                              forescout: false,
                            },
                            {
                              feature: "Cloud-Native",
                              portnox: true,
                              cisco: false,
                              aruba: true,
                              fortinet: true,
                              forescout: false,
                            },
                            {
                              feature: "AI/ML Analytics",
                              portnox: true,
                              cisco: true,
                              aruba: false,
                              fortinet: false,
                              forescout: true,
                            },
                            {
                              feature: "BYOD Support",
                              portnox: true,
                              cisco: true,
                              aruba: true,
                              fortinet: true,
                              forescout: true,
                            },
                            {
                              feature: "IoT Device Management",
                              portnox: true,
                              cisco: true,
                              aruba: false,
                              fortinet: true,
                              forescout: true,
                            },
                            {
                              feature: "Guest Access Portal",
                              portnox: true,
                              cisco: true,
                              aruba: true,
                              fortinet: false,
                              forescout: false,
                            },
                            {
                              feature: "Automated Remediation",
                              portnox: true,
                              cisco: false,
                              aruba: false,
                              fortinet: true,
                              forescout: true,
                            },
                            {
                              feature: "Multi-Cloud Support",
                              portnox: true,
                              cisco: false,
                              aruba: true,
                              fortinet: false,
                              forescout: false,
                            },
                          ].map((row, index) => (
                            <tr key={index} className="border-b">
                              <td className="p-2 font-medium">{row.feature}</td>
                              {selectedVendorData.map((vendor) => (
                                <td key={vendor.id} className="text-center p-2">
                                  {row[vendor.id as keyof typeof row] ? (
                                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                                  ) : (
                                    <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Implementation Roadmap */}
                <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Implementation Roadmap Comparison</CardTitle>
                    <CardDescription>Deployment timeline and complexity analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {selectedVendorData.map((vendor) => (
                        <div key={vendor.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{vendor.name}</h4>
                            <span className="text-sm text-slate-600">{vendor.deploymentTime}</span>
                          </div>
                          <Progress
                            value={vendor.id === "portnox" ? 100 : vendor.id === "cisco" ? 25 : 60}
                            className="h-2"
                          />
                          <div className="flex justify-between text-xs text-slate-600">
                            <span>Planning</span>
                            <span>Implementation</span>
                            <span>Go-Live</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Vendor Profiles */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {selectedVendorData.map((vendor) => (
                    <Card key={vendor.id} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded flex items-center justify-center">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <span>{vendor.name}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-slate-600 dark:text-slate-400">Annual Cost:</span>
                            <div className="font-semibold">{vendor.price}</div>
                          </div>
                          <div>
                            <span className="text-slate-600 dark:text-slate-400">5-Year TCO:</span>
                            <div className="font-semibold">${vendor.totalCost.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-slate-600 dark:text-slate-400">Complexity:</span>
                            <div
                              className={`font-semibold ${
                                vendor.complexity === "Low"
                                  ? "text-green-600"
                                  : vendor.complexity === "Medium"
                                    ? "text-yellow-600"
                                    : "text-red-600"
                              }`}
                            >
                              {vendor.complexity}
                            </div>
                          </div>
                          <div>
                            <span className="text-slate-600 dark:text-slate-400">Market Share:</span>
                            <div className="font-semibold">{vendor.marketShare}</div>
                          </div>
                        </div>
                        <div>
                          <span className="text-slate-600 dark:text-slate-400 text-sm">Key Features:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {vendor.features.map((feature) => (
                              <Badge key={feature} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Compliance & Risk Tab */}
              <TabsContent value="compliance" className="space-y-6">
                {/* Compliance Scorecard */}
                <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Compliance Scorecard</CardTitle>
                    <CardDescription>Regulatory framework compliance assessment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {complianceData.map((item) => (
                        <div key={item.framework} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{item.framework}</span>
                            <span className="text-sm text-slate-600">Required: {item.required}%</span>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            {selectedVendorData.map((vendor) => (
                              <div key={vendor.id} className="text-center">
                                <div className="text-xs text-slate-600 mb-1">{vendor.name}</div>
                                <Progress value={item[vendor.id as keyof typeof item] as number} className="h-2" />
                                <div className="text-xs mt-1">{item[vendor.id as keyof typeof item]}%</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Assessment Matrix */}
                <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Risk Assessment Matrix</CardTitle>
                    <CardDescription>Security risk analysis and mitigation effectiveness</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart data={riskData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="probability" name="Probability" unit="%" />
                          <YAxis dataKey="impact" name="Impact" unit="%" />
                          <Tooltip
                            cursor={{ strokeDasharray: "3 3" }}
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload
                                return (
                                  <div className="bg-white p-3 border rounded shadow">
                                    <p className="font-semibold">{data.risk}</p>
                                    <p>Probability: {data.probability}%</p>
                                    <p>Impact: {data.impact}%</p>
                                    <p>Portnox Mitigation: {data.portnoxMitigation}%</p>
                                  </div>
                                )
                              }
                              return null
                            }}
                          />
                          <Scatter name="Risks" dataKey="impact" fill="#ef4444" />
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Security Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Security Posture Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { metric: "Threat Detection", score: 95, benchmark: 75 },
                        { metric: "Incident Response", score: 90, benchmark: 70 },
                        { metric: "Access Control", score: 98, benchmark: 80 },
                        { metric: "Data Protection", score: 92, benchmark: 85 },
                      ].map((item) => (
                        <div key={item.metric} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{item.metric}</span>
                            <span className="text-sm">
                              <span className="text-green-600 font-semibold">{item.score}%</span>
                              <span className="text-slate-400 ml-2">vs {item.benchmark}%</span>
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <Progress value={item.score} className="flex-1 h-2" />
                            <Progress value={item.benchmark} className="flex-1 h-2 opacity-50" />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Compliance Readiness</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { framework: "SOX Compliance", status: "Ready", score: 98 },
                        { framework: "PCI DSS", status: "Ready", score: 96 },
                        { framework: "HIPAA", status: "Ready", score: 94 },
                        { framework: "GDPR", status: "Ready", score: 95 },
                        { framework: "ISO 27001", status: "In Progress", score: 87 },
                      ].map((item) => (
                        <div key={item.framework} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{item.framework}</p>
                            <p className="text-sm text-slate-600">{item.score}% compliant</p>
                          </div>
                          <Badge variant={item.status === "Ready" ? "default" : "secondary"}>{item.status}</Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Reports Tab */}
              <TabsContent value="reports" className="space-y-6">
                {/* Report Templates */}
                <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Professional Report Templates</CardTitle>
                    <CardDescription>Generate customizable reports for different stakeholders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        {
                          title: "Executive Summary",
                          description: "High-level business case and ROI analysis",
                          icon: <Target className="w-6 h-6" />,
                          color: "from-blue-500 to-cyan-500",
                        },
                        {
                          title: "Technical Report",
                          description: "Detailed technical specifications and architecture",
                          icon: <Cpu className="w-6 h-6" />,
                          color: "from-green-500 to-emerald-500",
                        },
                        {
                          title: "Financial Analysis",
                          description: "Comprehensive TCO and financial projections",
                          icon: <DollarSign className="w-6 h-6" />,
                          color: "from-purple-500 to-violet-500",
                        },
                        {
                          title: "Compliance Report",
                          description: "Regulatory compliance and risk assessment",
                          icon: <Shield className="w-6 h-6" />,
                          color: "from-orange-500 to-red-500",
                        },
                      ].map((template, index) => (
                        <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div
                              className={`w-12 h-12 bg-gradient-to-r ${template.color} rounded-lg flex items-center justify-center text-white mb-4`}
                            >
                              {template.icon}
                            </div>
                            <h3 className="font-semibold mb-2">{template.title}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{template.description}</p>
                            <Button size="sm" className="w-full">
                              Generate Report
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Report Customization */}
                <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Report Customization</CardTitle>
                    <CardDescription>Customize report sections and formatting options</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Include Sections</h4>
                        {[
                          "Executive Summary",
                          "TCO Analysis",
                          "ROI Projections",
                          "Vendor Comparison",
                          "Risk Assessment",
                          "Implementation Timeline",
                          "Compliance Analysis",
                          "Operational Impact",
                        ].map((section) => (
                          <div key={section} className="flex items-center space-x-2">
                            <Switch id={section} defaultChecked />
                            <Label htmlFor={section} className="text-sm">
                              {section}
                            </Label>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold">Report Settings</h4>
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm">Report Title</Label>
                            <Input placeholder="Network Access Control TCO Analysis" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-sm">Company Name</Label>
                            <Input placeholder="Your Organization" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-sm">Report Format</Label>
                            <Select defaultValue="pdf">
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pdf">PDF Document</SelectItem>
                                <SelectItem value="html">HTML Report</SelectItem>
                                <SelectItem value="excel">Excel Workbook</SelectItem>
                                <SelectItem value="powerpoint">PowerPoint Presentation</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-sm">Include Charts</Label>
                            <Select defaultValue="all">
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Charts</SelectItem>
                                <SelectItem value="key">Key Charts Only</SelectItem>
                                <SelectItem value="none">No Charts</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">Export Options</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Generate professional reports in multiple formats
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" onClick={exportToHTML}>
                          <Download className="w-4 h-4 mr-2" />
                          HTML
                        </Button>
                        <Button variant="outline" onClick={exportToPDF}>
                          <FileText className="w-4 h-4 mr-2" />
                          PDF
                        </Button>
                        <Button variant="outline">
                          <FileText className="w-4 h-4 mr-2" />
                          Excel
                        </Button>
                        <Button>
                          <Download className="w-4 h-4 mr-2" />
                          Generate All
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Report Preview */}
                <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Report Preview</CardTitle>
                    <CardDescription>Preview of executive summary report</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg border">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold mb-2">Network Access Control TCO Analysis</h2>
                        <p className="text-slate-600 dark:text-slate-400">Executive Summary Report</p>
                        <p className="text-sm text-slate-500">{new Date().toLocaleDateString()}</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold mb-2">Key Findings</h3>
                          <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                            <li>• 67% reduction in total cost of ownership over 5 years</li>
                            <li>• 180% return on investment within 3 years</li>
                            <li>• 85% faster deployment compared to traditional solutions</li>
                            <li>• 2.5 FTE reduction in operational requirements</li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-2">Financial Summary</h3>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="text-center p-3 bg-white dark:bg-slate-700 rounded">
                              <p className="font-semibold text-green-600">${totalSavings.toLocaleString()}</p>
                              <p className="text-slate-600 dark:text-slate-400">Total Savings</p>
                            </div>
                            <div className="text-center p-3 bg-white dark:bg-slate-700 rounded">
                              <p className="font-semibold text-blue-600">{avgROI}%</p>
                              <p className="text-slate-600 dark:text-slate-400">Average ROI</p>
                            </div>
                            <div className="text-center p-3 bg-white dark:bg-slate-700 rounded">
                              <p className="font-semibold text-purple-600">8 months</p>
                              <p className="text-slate-600 dark:text-slate-400">Payback Period</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-2">Recommendation</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Based on our comprehensive analysis, Portnox delivers superior value through its
                            cloud-native architecture, advanced security capabilities, and significantly lower total
                            cost of ownership. We recommend proceeding with Portnox implementation to achieve optimal
                            security outcomes while maximizing cost efficiency.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
