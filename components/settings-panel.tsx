"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  Settings,
  X,
  Save,
  RotateCcw,
  Download,
  Upload,
  DollarSign,
  Building,
  Palette,
  Bell,
  Shield,
  Zap,
  HelpCircle,
} from "lucide-react"

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  configuration: any
  onConfigurationChange: (config: any) => void
  portnoxAddons: any
  onAddonsChange: (addons: any) => void
  darkMode: boolean
  onDarkModeChange: (enabled: boolean) => void
}

export default function SettingsPanel({
  isOpen,
  onClose,
  configuration,
  onConfigurationChange,
  portnoxAddons,
  onAddonsChange,
  darkMode,
  onDarkModeChange,
}: SettingsPanelProps) {
  const [activeTab, setActiveTab] = useState("organization")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [currency, setCurrency] = useState("USD")
  const [numberFormat, setNumberFormat] = useState("en-US")

  const handleConfigChange = (key: string, value: any) => {
    onConfigurationChange({ ...configuration, [key]: value })
    setHasUnsavedChanges(true)
  }

  const handleAddonChange = (key: string, value: boolean) => {
    onAddonsChange({ ...portnoxAddons, [key]: value })
    setHasUnsavedChanges(true)
  }

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem(
      "portnox-tco-config",
      JSON.stringify({
        configuration,
        portnoxAddons,
        darkMode,
        timestamp: new Date().toISOString(),
      }),
    )
    setHasUnsavedChanges(false)
  }

  const handleReset = () => {
    const defaultConfig = {
      devices: 2500,
      users: 1500,
      industry: "technology",
      orgSize: "medium",
      years: 3,
      region: "north-america",
    }
    const defaultAddons = {
      atp: false,
      compliance: false,
      iot: false,
      analytics: false,
    }
    onConfigurationChange(defaultConfig)
    onAddonsChange(defaultAddons)
    setHasUnsavedChanges(false)
  }

  const exportSettings = () => {
    const settings = {
      configuration,
      portnoxAddons,
      darkMode,
      exportDate: new Date().toISOString(),
      version: "3.0",
    }
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `portnox-tco-settings-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const settings = JSON.parse(e.target?.result as string)
        if (settings.configuration) onConfigurationChange(settings.configuration)
        if (settings.portnoxAddons) onAddonsChange(settings.portnoxAddons)
        if (typeof settings.darkMode === "boolean") onDarkModeChange(settings.darkMode)
        setHasUnsavedChanges(true)
      } catch (error) {
        console.error("Failed to import settings:", error)
      }
    }
    reader.readAsText(file)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "fixed right-0 top-0 h-full w-full max-w-2xl z-50 overflow-y-auto",
              darkMode ? "bg-gray-900 border-l border-gray-700" : "bg-white border-l border-gray-200",
            )}
          >
            {/* Header */}
            <div
              className={cn(
                "sticky top-0 z-10 p-6 border-b",
                darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200",
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Settings className="h-6 w-6 text-portnox-primary" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Settings & Configuration</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Customize your TCO analysis parameters</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-4">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSave}
                  disabled={!hasUnsavedChanges}
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
                <Button variant="outline" size="sm" onClick={handleReset} className="gap-2 bg-transparent">
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
                <Button variant="outline" size="sm" onClick={exportSettings} className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <div className="relative">
                  <input
                    type="file"
                    accept=".json"
                    onChange={importSettings}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Upload className="h-4 w-4" />
                    Import
                  </Button>
                </div>
              </div>

              {hasUnsavedChanges && (
                <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                  <p className="text-xs text-yellow-800 dark:text-yellow-200">
                    You have unsaved changes. Click "Save Changes" to persist your settings.
                  </p>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="organization" className="gap-2">
                    <Building className="h-4 w-4" />
                    <span className="hidden sm:inline">Organization</span>
                  </TabsTrigger>
                  <TabsTrigger value="pricing" className="gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span className="hidden sm:inline">Pricing</span>
                  </TabsTrigger>
                  <TabsTrigger value="preferences" className="gap-2">
                    <Palette className="h-4 w-4" />
                    <span className="hidden sm:inline">Preferences</span>
                  </TabsTrigger>
                  <TabsTrigger value="advanced" className="gap-2">
                    <Zap className="h-4 w-4" />
                    <span className="hidden sm:inline">Advanced</span>
                  </TabsTrigger>
                </TabsList>

                {/* Organization Tab */}
                <TabsContent value="organization" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5" />
                        Organization Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="devices">Number of Devices</Label>
                          <Input
                            id="devices"
                            type="number"
                            value={configuration.devices}
                            onChange={(e) => handleConfigChange("devices", Number.parseInt(e.target.value) || 0)}
                            min="1"
                            max="1000000"
                          />
                          <p className="text-xs text-gray-500 mt-1">Include all network-connected devices</p>
                        </div>
                        <div>
                          <Label htmlFor="users">Number of Users</Label>
                          <Input
                            id="users"
                            type="number"
                            value={configuration.users}
                            onChange={(e) => handleConfigChange("users", Number.parseInt(e.target.value) || 0)}
                            min="1"
                            max="1000000"
                          />
                          <p className="text-xs text-gray-500 mt-1">Total user accounts requiring access</p>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="industry">Industry</Label>
                        <select
                          id="industry"
                          value={configuration.industry}
                          onChange={(e) => handleConfigChange("industry", e.target.value)}
                          className={cn(
                            "w-full p-2 border rounded-md",
                            darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300",
                          )}
                        >
                          <option value="healthcare">Healthcare</option>
                          <option value="financial">Finance & Banking</option>
                          <option value="government">Government & Public Sector</option>
                          <option value="education">Education</option>
                          <option value="manufacturing">Manufacturing</option>
                          <option value="retail">Retail & E-commerce</option>
                          <option value="technology">Technology</option>
                          <option value="energy">Energy & Utilities</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="region">Geographic Region</Label>
                        <select
                          id="region"
                          value={configuration.region}
                          onChange={(e) => handleConfigChange("region", e.target.value)}
                          className={cn(
                            "w-full p-2 border rounded-md",
                            darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300",
                          )}
                        >
                          <option value="north-america">North America</option>
                          <option value="europe">Europe (EMEA)</option>
                          <option value="asia-pacific">Asia Pacific</option>
                          <option value="latin-america">Latin America</option>
                          <option value="middle-east">Middle East & Africa</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="years">Analysis Period</Label>
                        <div className="flex items-center gap-4 mt-2">
                          <Slider
                            value={[configuration.years]}
                            onValueChange={(value) => handleConfigChange("years", value[0])}
                            min={1}
                            max={5}
                            step={1}
                            className="flex-1"
                          />
                          <Badge variant="outline" className="min-w-[60px] justify-center">
                            {configuration.years} year{configuration.years !== 1 ? "s" : ""}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Recommended: 3-5 years for accurate ROI analysis</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Pricing Tab */}
                <TabsContent value="pricing" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Portnox Pricing Configuration
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label>Base Price per Device (Monthly)</Label>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center gap-4">
                            <Slider
                              value={[configuration.portnoxBasePrice || 4.0]}
                              onValueChange={(value) => handleConfigChange("portnoxBasePrice", value[0])}
                              min={1}
                              max={10}
                              step={0.1}
                              className="flex-1"
                            />
                            <Badge variant="outline" className="min-w-[80px] justify-center">
                              ${(configuration.portnoxBasePrice || 4.0).toFixed(2)}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500">
                            Adjust based on your negotiated rate or enterprise pricing
                          </p>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <Label className="text-base font-medium">Add-on Modules</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Select additional Portnox modules for enhanced functionality
                        </p>

                        <div className="space-y-4">
                          {[
                            {
                              key: "atp",
                              name: "Advanced Threat Protection",
                              description: "ML-based threat detection, SOAR integration, threat intel feeds",
                              price: 1.5,
                              icon: <Shield className="h-4 w-4" />,
                            },
                            {
                              key: "compliance",
                              name: "Compliance Automation",
                              description: "Automated reporting, continuous monitoring, evidence collection",
                              price: 1.0,
                              icon: <Shield className="h-4 w-4" />,
                            },
                            {
                              key: "iot",
                              name: "IoT/OT Security",
                              description: "OT protocol support, industrial device profiling, SCADA integration",
                              price: 2.0,
                              icon: <Zap className="h-4 w-4" />,
                            },
                            {
                              key: "analytics",
                              name: "Risk Analytics",
                              description: "Device risk scoring, user behavior analytics, predictive insights",
                              price: 1.5,
                              icon: <Zap className="h-4 w-4" />,
                            },
                          ].map((addon) => (
                            <div
                              key={addon.key}
                              className={cn(
                                "p-4 border rounded-lg",
                                portnoxAddons[addon.key]
                                  ? "border-portnox-primary bg-portnox-primary/5"
                                  : "border-gray-200 dark:border-gray-700",
                              )}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3 flex-1">
                                  <div className="p-2 rounded-md bg-portnox-primary/10">{addon.icon}</div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-medium">{addon.name}</h4>
                                      <Badge variant="outline" className="text-xs">
                                        +${addon.price}/device/month
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{addon.description}</p>
                                  </div>
                                </div>
                                <Switch
                                  checked={portnoxAddons[addon.key]}
                                  onCheckedChange={(checked) => handleAddonChange(addon.key, checked)}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Preferences Tab */}
                <TabsContent value="preferences" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Palette className="h-5 w-5" />
                        Display Preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Dark Mode</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Use dark theme for better viewing in low light
                          </p>
                        </div>
                        <Switch checked={darkMode} onCheckedChange={onDarkModeChange} />
                      </div>

                      <Separator />

                      <div>
                        <Label>Currency Display</Label>
                        <select
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          className={cn(
                            "w-full p-2 border rounded-md mt-2",
                            darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300",
                          )}
                        >
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="CAD">CAD (C$)</option>
                        </select>
                      </div>

                      <div>
                        <Label>Number Format</Label>
                        <select
                          value={numberFormat}
                          onChange={(e) => setNumberFormat(e.target.value)}
                          className={cn(
                            "w-full p-2 border rounded-md mt-2",
                            darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300",
                          )}
                        >
                          <option value="en-US">US (1,234.56)</option>
                          <option value="en-GB">UK (1,234.56)</option>
                          <option value="de-DE">German (1.234,56)</option>
                          <option value="fr-FR">French (1 234,56)</option>
                        </select>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Advanced Tab */}
                <TabsContent value="advanced" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        Advanced Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Auto-save Configuration</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Automatically save changes to browser storage
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Analytics & Telemetry</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Help improve the tool by sharing anonymous usage data
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Advanced Calculations</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Include detailed risk and compliance calculations
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Separator />

                      <div>
                        <Label>Calculation Methodology</Label>
                        <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            This tool uses industry-standard TCO calculation methodologies based on:
                          </p>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                            <li>• Gartner TCO framework for IT infrastructure</li>
                            <li>• Forrester Total Economic Impact methodology</li>
                            <li>• Real market pricing data from 2024</li>
                            <li>• Industry benchmarks and security metrics</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <Label>Data Sources</Label>
                        <div className="mt-2 space-y-2">
                          <Badge variant="outline" className="mr-2">
                            Vendor Public Pricing
                          </Badge>
                          <Badge variant="outline" className="mr-2">
                            Industry Reports
                          </Badge>
                          <Badge variant="outline" className="mr-2">
                            Customer Surveys
                          </Badge>
                          <Badge variant="outline" className="mr-2">
                            Security Benchmarks
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <HelpCircle className="h-5 w-5" />
                        Support & Documentation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                        <HelpCircle className="h-4 w-4" />
                        View Documentation
                      </Button>
                      <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                        <Download className="h-4 w-4" />
                        Download User Guide
                      </Button>
                      <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                        <Bell className="h-4 w-4" />
                        Contact Support
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
