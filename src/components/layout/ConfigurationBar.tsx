"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useDashboardSettings, useDashboardDispatch } from "@/context/DashboardContext"
import {
  Settings,
  Building,
  DollarSign,
  Shield,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Save,
  RotateCcw,
  Download,
  Upload,
} from "lucide-react"
import { cn } from "@/lib/utils"

const industryOptions = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "financial_services", label: "Financial Services" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "education", label: "Education" },
  { value: "government", label: "Government" },
]

const orgSizeOptions = [
  { value: "smb", label: "Small Business (100-500 employees)" },
  { value: "medium", label: "Mid-Market (500-2500 employees)" },
  { value: "enterprise", label: "Enterprise (2500+ employees)" },
  { value: "custom", label: "Custom Configuration" },
]

export default function ConfigurationBar() {
  const {
    selectedOrgSize,
    selectedIndustry,
    comparisonYears,
    devices,
    users,
    hasExistingNAC,
    existingVendor,
    includeCompliance,
    includeRiskReduction,
    includeHiddenCosts,
    discountRate,
    inflationRate,
    riskFactor,
    growthRate,
    region,
    portnoxBasePrice,
    portnoxAddons,
  } = useDashboardSettings()
  const dispatch = useDashboardDispatch()

  const [isExpanded, setIsExpanded] = useState(false)
  const [activeSection, setActiveSection] = useState("organization")

  const handleOrgSizeChange = (size: string) => {
    let newDevices = devices
    let newUsers = users

    if (size === "smb") {
      newDevices = 300
      newUsers = 150
    } else if (size === "medium") {
      newDevices = 1500
      newUsers = 750
    } else if (size === "enterprise") {
      newDevices = 5000
      newUsers = 2500
    }

    dispatch({ type: "SET_DEVICES", payload: newDevices })
    dispatch({ type: "SET_USERS", payload: newUsers })
  }

  const resetToDefaults = () => {
    dispatch({
      type: "UPDATE_SETTINGS",
      payload: {
        selectedOrgSize: "medium",
        selectedIndustry: "technology",
        comparisonYears: 3,
        devices: 500,
        users: 500,
        hasExistingNAC: false,
        existingVendor: "cisco_ise",
        includeCompliance: true,
        includeRiskReduction: true,
        includeHiddenCosts: true,
        discountRate: 8,
        inflationRate: 3,
        riskFactor: "medium",
        growthRate: 5,
        region: "north_america",
        portnoxBasePrice: 3.5,
        portnoxAddons: {
          atp: true,
          compliance: true,
          iot: false,
          analytics: true,
        },
      },
    })
  }

  const sections = [
    { id: "organization", label: "Organization", icon: Building },
    { id: "financial", label: "Financial", icon: DollarSign },
    { id: "security", label: "Security", icon: Shield },
    { id: "advanced", label: "Advanced", icon: TrendingUp },
  ]

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Settings className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Configuration Panel</h3>
              <p className="text-sm text-muted-foreground">
                Customize your TCO analysis parameters for accurate results
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {devices.toLocaleString()} devices
            </Badge>
            <Badge variant="outline" className="text-xs">
              {comparisonYears} years
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Quick Settings Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
          {/* Organization Size */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Organization Size</Label>
            <Select value={selectedOrgSize} onValueChange={handleOrgSizeChange}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {orgSizeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Industry</Label>
            <Select
              value={selectedIndustry}
              onValueChange={(value) => dispatch({ type: "SET_INDUSTRY", payload: value })}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {industryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Devices */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Devices</Label>
            <Input
              type="number"
              value={devices}
              onChange={(e) => dispatch({ type: "SET_DEVICES", payload: Number(e.target.value) })}
              className="h-8 text-xs"
            />
          </div>

          {/* Users */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Users</Label>
            <Input
              type="number"
              value={users}
              onChange={(e) => dispatch({ type: "SET_USERS", payload: Number(e.target.value) })}
              className="h-8 text-xs"
            />
          </div>

          {/* Analysis Period */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Analysis Period</Label>
            <Slider
              value={[comparisonYears]}
              onValueChange={(value) => dispatch({ type: "SET_COMPARISON_YEARS", payload: value[0] })}
              max={5}
              min={3}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>3 years</span>
              <span className="font-medium">{comparisonYears} years</span>
              <span>5 years</span>
            </div>
          </div>

          {/* Region */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Region</Label>
            <Select value={region} onValueChange={(value) => dispatch({ type: "SET_REGION", payload: value })}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="north_america">North America</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="asia_pacific">Asia Pacific</SelectItem>
                <SelectItem value="latin_america">Latin America</SelectItem>
                <SelectItem value="middle_east_africa">Middle East & Africa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Expanded Configuration */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <Separator className="my-4" />

              {/* Section Tabs */}
              <div className="flex space-x-1 mb-4 bg-muted/50 p-1 rounded-lg">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all",
                      activeSection === section.id
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <section.icon className="h-4 w-4" />
                    <span>{section.label}</span>
                  </button>
                ))}
              </div>

              {/* Section Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeSection === "organization" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium text-sm">Current Environment</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Existing NAC Solution</Label>
                            <Switch
                              checked={hasExistingNAC}
                              onCheckedChange={(checked) =>
                                dispatch({ type: "SET_HAS_EXISTING_NAC", payload: checked })
                              }
                            />
                          </div>
                          {hasExistingNAC && (
                            <Select
                              value={existingVendor}
                              onValueChange={(value) => dispatch({ type: "SET_EXISTING_VENDOR", payload: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select existing vendor" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cisco_ise">Cisco ISE</SelectItem>
                                <SelectItem value="aruba_clearpass">Aruba ClearPass</SelectItem>
                                <SelectItem value="forescout">Forescout</SelectItem>
                                <SelectItem value="fortinet">FortiNAC</SelectItem>
                                <SelectItem value="juniper_mist">Juniper Mist</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium text-sm">Analysis Scope</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Include Compliance Benefits</Label>
                            <Switch
                              checked={includeCompliance}
                              onCheckedChange={(checked) =>
                                dispatch({ type: "SET_INCLUDE_COMPLIANCE", payload: checked })
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Include Risk Reduction</Label>
                            <Switch
                              checked={includeRiskReduction}
                              onCheckedChange={(checked) =>
                                dispatch({ type: "SET_INCLUDE_RISK_REDUCTION", payload: checked })
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Include Hidden Costs</Label>
                            <Switch
                              checked={includeHiddenCosts}
                              onCheckedChange={(checked) =>
                                dispatch({ type: "SET_INCLUDE_HIDDEN_COSTS", payload: checked })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium text-sm">Growth Projections</h4>
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm">Annual Growth Rate</Label>
                            <div className="mt-2">
                              <Slider
                                value={[growthRate]}
                                onValueChange={(value) => dispatch({ type: "SET_GROWTH_RATE", payload: value[0] })}
                                max={20}
                                min={0}
                                step={1}
                                className="w-full"
                              />
                              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>0%</span>
                                <span className="font-medium">{growthRate}%</span>
                                <span>20%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === "financial" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium text-sm">Portnox Pricing</h4>
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm">Base Price ($/device/month)</Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={portnoxBasePrice}
                              onChange={(e) =>
                                dispatch({ type: "SET_PORTNOX_BASE_PRICE", payload: Number(e.target.value) })
                              }
                              className="mt-1"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm">Add-on Modules</Label>
                            {Object.entries({
                              atp: "Advanced Threat Protection (+$1.00)",
                              compliance: "Compliance Automation (+$0.50)",
                              iot: "IoT Security (+$0.75)",
                              analytics: "Advanced Analytics (+$0.50)",
                            }).map(([key, label]) => (
                              <div key={key} className="flex items-center justify-between">
                                <span className="text-sm">{label}</span>
                                <Switch
                                  checked={portnoxAddons[key]}
                                  onCheckedChange={(checked) =>
                                    dispatch({
                                      type: "SET_PORTNOX_ADDONS",
                                      payload: { ...portnoxAddons, [key]: checked },
                                    })
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium text-sm">Financial Parameters</h4>
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm">Discount Rate (%)</Label>
                            <div className="mt-2">
                              <Slider
                                value={[discountRate]}
                                onValueChange={(value) => dispatch({ type: "SET_DISCOUNT_RATE", payload: value[0] })}
                                max={15}
                                min={3}
                                step={0.5}
                                className="w-full"
                              />
                              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>3%</span>
                                <span className="font-medium">{discountRate}%</span>
                                <span>15%</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm">Inflation Rate (%)</Label>
                            <div className="mt-2">
                              <Slider
                                value={[inflationRate]}
                                onValueChange={(value) => dispatch({ type: "SET_INFLATION_RATE", payload: value[0] })}
                                max={8}
                                min={1}
                                step={0.5}
                                className="w-full"
                              />
                              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>1%</span>
                                <span className="font-medium">{inflationRate}%</span>
                                <span>8%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium text-sm">Risk Assessment</h4>
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm">Risk Factor</Label>
                            <Select
                              value={riskFactor}
                              onValueChange={(value: any) => dispatch({ type: "SET_RISK_FACTOR", payload: value })}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low Risk</SelectItem>
                                <SelectItem value="medium">Medium Risk</SelectItem>
                                <SelectItem value="high">High Risk</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === "security" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium text-sm">Security Metrics</h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Zero Trust Score</span>
                              <Badge variant="outline">95/100</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Portnox CLEAR's comprehensive Zero Trust implementation score
                            </p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Breach Risk Reduction</span>
                              <Badge variant="outline">92%</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Estimated reduction in security breach probability
                            </p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Compliance Coverage</span>
                              <Badge variant="outline">98%</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Coverage of industry compliance requirements
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium text-sm">Automation Benefits</h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Policy Automation</span>
                              <Badge variant="outline">98%</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Automated policy enforcement and remediation
                            </p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Threat Response</span>
                              <Badge variant="outline">95%</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">Automated threat detection and response</p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Compliance Reporting</span>
                              <Badge variant="outline">100%</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">Automated compliance reporting and auditing</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === "advanced" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium text-sm">Calculation Methods</h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <h5 className="text-sm font-medium mb-2">NPV Calculation</h5>
                            <p className="text-xs text-muted-foreground">
                              Net Present Value calculated using {discountRate}% discount rate over {comparisonYears}{" "}
                              years
                            </p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <h5 className="text-sm font-medium mb-2">ROI Methodology</h5>
                            <p className="text-xs text-muted-foreground">
                              Return on Investment includes cost savings, risk reduction, and productivity gains
                            </p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <h5 className="text-sm font-medium mb-2">Industry Benchmarks</h5>
                            <p className="text-xs text-muted-foreground">
                              Comparisons based on {industryOptions.find((i) => i.value === selectedIndustry)?.label}{" "}
                              industry standards
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium text-sm">Data Sources</h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <h5 className="text-sm font-medium mb-2">Market Data</h5>
                            <p className="text-xs text-muted-foreground">
                              Pricing and feature data from vendor websites and industry reports (2024)
                            </p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <h5 className="text-sm font-medium mb-2">Security Metrics</h5>
                            <p className="text-xs text-muted-foreground">
                              Breach cost data from IBM Cost of Data Breach Report 2024
                            </p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <h5 className="text-sm font-medium mb-2">Compliance Data</h5>
                            <p className="text-xs text-muted-foreground">
                              Regulatory requirements and penalty data from official sources
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={resetToDefaults}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset to Defaults
                  </Button>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Config
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Config
                  </Button>
                  <Button size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
