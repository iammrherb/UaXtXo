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
import { Alert, AlertDescription } from "@/components/ui/alert"
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
  Shield,
  Zap,
  Brain,
  Key,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Loader2,
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
  const [testingAI, setTestingAI] = useState(false)
  const [aiTestResult, setAITestResult] = useState<string | null>(null)

  const handleConfigChange = (key: string, value: any) => {
    onConfigurationChange({ ...configuration, [key]: value })
    setHasUnsavedChanges(true)
  }

  const handleAddonChange = (key: string, value: boolean) => {
    onAddonsChange({ ...portnoxAddons, [key]: value })
    setHasUnsavedChanges(true)
  }

  const handleAIConfigChange = (key: string, value: any) => {
    const newAIConfig = { ...configuration.aiConfig, [key]: value }
    onConfigurationChange({ ...configuration, aiConfig: newAIConfig })
    setHasUnsavedChanges(true)
  }

  const testAIConnection = async () => {
    setTestingAI(true)
    setAITestResult(null)

    try {
      // Test the AI connection with a simple prompt
      const testPrompt = "Test connection. Respond with 'AI connection successful.'"

      // Simulate API test - replace with actual test
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (configuration.aiConfig?.openaiApiKey) {
        setAITestResult("success")
      } else {
        setAITestResult("error")
      }
    } catch (error) {
      setAITestResult("error")
    } finally {
      setTestingAI(false)
    }
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
      aiConfig: {
        openaiApiKey: "",
        openaiModel: "gpt-4o",
        claudeApiKey: "",
        claudeModel: "claude-3-sonnet-20240229",
        geminiApiKey: "",
        geminiModel: "gemini-pro",
        defaultProvider: "openai",
        maxTokens: 2000,
        temperature: 0.7,
      },
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
              "fixed right-0 top-0 h-full w-full max-w-3xl z-50 overflow-y-auto",
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
                  <Settings className="h-6 w-6 text-blue-600" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Settings & Configuration</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Customize your TCO analysis parameters and AI integration
                    </p>
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
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="organization" className="gap-2">
                    <Building className="h-4 w-4" />
                    <span className="hidden sm:inline">Organization</span>
                  </TabsTrigger>
                  <TabsTrigger value="pricing" className="gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span className="hidden sm:inline">Pricing</span>
                  </TabsTrigger>
                  <TabsTrigger value="ai" className="gap-2">
                    <Brain className="h-4 w-4" />
                    <span className="hidden sm:inline">AI Engine</span>
                  </TabsTrigger>
                  <TabsTrigger value="preferences" className="gap-2">
                    <Palette className="h-4 w-4" />
                    <span className="hidden sm:inline">Display</span>
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
                                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                  : "border-gray-200 dark:border-gray-700",
                              )}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3 flex-1">
                                  <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900/50">{addon.icon}</div>
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

                {/* AI Configuration Tab */}
                <TabsContent value="ai" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5" />
                        AI Engine Configuration
                      </CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Configure AI providers to enhance reports with intelligent insights and industry-specific
                        recommendations.
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* OpenAI Configuration */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Key className="h-4 w-4" />
                          <Label className="text-base font-medium">OpenAI Configuration</Label>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="openaiApiKey">API Key</Label>
                            <Input
                              id="openaiApiKey"
                              type="password"
                              placeholder="sk-..."
                              value={configuration.aiConfig?.openaiApiKey || ""}
                              onChange={(e) => handleAIConfigChange("openaiApiKey", e.target.value)}
                            />
                            <p className="text-xs text-gray-500 mt-1">Your OpenAI API key for GPT models</p>
                          </div>
                          <div>
                            <Label htmlFor="openaiModel">Model</Label>
                            <select
                              id="openaiModel"
                              value={configuration.aiConfig?.openaiModel || "gpt-4o"}
                              onChange={(e) => handleAIConfigChange("openaiModel", e.target.value)}
                              className={cn(
                                "w-full p-2 border rounded-md",
                                darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300",
                              )}
                            >
                              <option value="gpt-4o">GPT-4o (Recommended)</option>
                              <option value="gpt-4">GPT-4</option>
                              <option value="gpt-4-turbo">GPT-4 Turbo</option>
                              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Claude Configuration */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Key className="h-4 w-4" />
                          <Label className="text-base font-medium">Claude Configuration</Label>
                          <Badge variant="outline" className="text-xs">
                            Coming Soon
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="claudeApiKey">API Key</Label>
                            <Input
                              id="claudeApiKey"
                              type="password"
                              placeholder="sk-ant-..."
                              value={configuration.aiConfig?.claudeApiKey || ""}
                              onChange={(e) => handleAIConfigChange("claudeApiKey", e.target.value)}
                              disabled
                            />
                          </div>
                          <div>
                            <Label htmlFor="claudeModel">Model</Label>
                            <select
                              id="claudeModel"
                              value={configuration.aiConfig?.claudeModel || "claude-3-sonnet-20240229"}
                              onChange={(e) => handleAIConfigChange("claudeModel", e.target.value)}
                              className={cn(
                                "w-full p-2 border rounded-md",
                                darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300",
                              )}
                              disabled
                            >
                              <option value="claude-3-opus-20240229">Claude 3 Opus</option>
                              <option value="claude-3-sonnet-20240229">Claude 3 Sonnet</option>
                              <option value="claude-3-haiku-20240307">Claude 3 Haiku</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Gemini Configuration */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Key className="h-4 w-4" />
                          <Label className="text-base font-medium">Google Gemini Configuration</Label>
                          <Badge variant="outline" className="text-xs">
                            Coming Soon
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="geminiApiKey">API Key</Label>
                            <Input
                              id="geminiApiKey"
                              type="password"
                              placeholder="AI..."
                              value={configuration.aiConfig?.geminiApiKey || ""}
                              onChange={(e) => handleAIConfigChange("geminiApiKey", e.target.value)}
                              disabled
                            />
                          </div>
                          <div>
                            <Label htmlFor="geminiModel">Model</Label>
                            <select
                              id="geminiModel"
                              value={configuration.aiConfig?.geminiModel || "gemini-pro"}
                              onChange={(e) => handleAIConfigChange("geminiModel", e.target.value)}
                              className={cn(
                                "w-full p-2 border rounded-md",
                                darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300",
                              )}
                              disabled
                            >
                              <option value="gemini-pro">Gemini Pro</option>
                              <option value="gemini-pro-vision">Gemini Pro Vision</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* AI Parameters */}
                      <div className="space-y-4">
                        <Label className="text-base font-medium">AI Parameters</Label>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="maxTokens">Max Tokens</Label>
                            <div className="flex items-center gap-4 mt-2">
                              <Slider
                                value={[configuration.aiConfig?.maxTokens || 2000]}
                                onValueChange={(value) => handleAIConfigChange("maxTokens", value[0])}
                                min={500}
                                max={4000}
                                step={100}
                                className="flex-1"
                              />
                              <Badge variant="outline" className="min-w-[80px] justify-center">
                                {configuration.aiConfig?.maxTokens || 2000}
                              </Badge>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="temperature">Temperature</Label>
                            <div className="flex items-center gap-4 mt-2">
                              <Slider
                                value={[configuration.aiConfig?.temperature || 0.7]}
                                onValueChange={(value) => handleAIConfigChange("temperature", value[0])}
                                min={0}
                                max={1}
                                step={0.1}
                                className="flex-1"
                              />
                              <Badge variant="outline" className="min-w-[80px] justify-center">
                                {(configuration.aiConfig?.temperature || 0.7).toFixed(1)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Test Connection */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-base font-medium">Test AI Connection</Label>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Verify your AI configuration is working correctly
                            </p>
                          </div>
                          <Button
                            onClick={testAIConnection}
                            disabled={testingAI || !configuration.aiConfig?.openaiApiKey}
                            className="gap-2"
                          >
                            {testingAI ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Testing...
                              </>
                            ) : (
                              <>
                                <Zap className="h-4 w-4" />
                                Test Connection
                              </>
                            )}
                          </Button>
                        </div>

                        {aiTestResult && (
                          <Alert
                            className={
                              aiTestResult === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                            }
                          >
                            {aiTestResult === "success" ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                            )}
                            <AlertDescription>
                              {aiTestResult === "success"
                                ? "AI connection successful! Your reports will now include AI-enhanced insights."
                                : "AI connection failed. Please check your API key and try again."}
                            </AlertDescription>
                          </Alert>
                        )}
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
                            <li>• AI-enhanced insights and recommendations</li>
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
                          <Badge variant="outline" className="mr-2">
                            AI Analysis
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
                        <Brain className="h-4 w-4" />
                        AI Integration Guide
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
