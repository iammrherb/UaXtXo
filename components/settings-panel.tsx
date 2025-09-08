"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  Plus,
  Trash2,
  Edit,
  Copy,
} from "lucide-react"
import { aiSettingsManager, type AISettings } from "@/lib/ai-settings-manager"

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
  const [aiSettings, setAiSettings] = useState<AISettings>(aiSettingsManager.getSettings())
  const [testingConnections, setTestingConnections] = useState<Record<string, boolean>>({})
  const [connectionResults, setConnectionResults] = useState<Record<string, boolean | null>>({})
  const [editingPrompt, setEditingPrompt] = useState<string | null>(null)
  const [newCustomPrompt, setNewCustomPrompt] = useState({
    name: "",
    description: "",
    category: "custom" as const,
    prompt: "",
    variables: [] as string[],
  })

  useEffect(() => {
    setAiSettings(aiSettingsManager.getSettings())
  }, [])

  const handleConfigChange = (key: string, value: any) => {
    onConfigurationChange({ ...configuration, [key]: value })
    setHasUnsavedChanges(true)
  }

  const handleAddonChange = (key: string, value: boolean) => {
    onAddonsChange({ ...portnoxAddons, [key]: value })
    setHasUnsavedChanges(true)
  }

  const handleAIProviderChange = (provider: "openai" | "anthropic" | "gemini", field: string, value: any) => {
    aiSettingsManager.updateProviderSettings(provider, { [field]: value })
    setAiSettings(aiSettingsManager.getSettings())
    setHasUnsavedChanges(true)
  }

  const handlePromptChange = (
    category: keyof AISettings["prompts"],
    provider: "openai" | "anthropic" | "gemini",
    prompt: string,
  ) => {
    aiSettingsManager.updatePrompt(category, provider, prompt)
    setAiSettings(aiSettingsManager.getSettings())
    setHasUnsavedChanges(true)
  }

  const testAIConnection = async (provider: "openai" | "anthropic" | "gemini") => {
    setTestingConnections((prev) => ({ ...prev, [provider]: true }))
    setConnectionResults((prev) => ({ ...prev, [provider]: null }))

    try {
      const result = await aiSettingsManager.testConnection(provider)
      setConnectionResults((prev) => ({ ...prev, [provider]: result }))
    } catch (error) {
      setConnectionResults((prev) => ({ ...prev, [provider]: false }))
    } finally {
      setTestingConnections((prev) => ({ ...prev, [provider]: false }))
    }
  }

  const addCustomPrompt = () => {
    if (newCustomPrompt.name && newCustomPrompt.prompt) {
      aiSettingsManager.addCustomPrompt({
        name: newCustomPrompt.name,
        description: newCustomPrompt.description,
        category: newCustomPrompt.category,
        provider: "all",
        prompt: newCustomPrompt.prompt,
        variables: newCustomPrompt.variables,
      })
      setAiSettings(aiSettingsManager.getSettings())
      setNewCustomPrompt({
        name: "",
        description: "",
        category: "custom",
        prompt: "",
        variables: [],
      })
      setHasUnsavedChanges(true)
    }
  }

  const deleteCustomPrompt = (id: string) => {
    aiSettingsManager.deleteCustomPrompt(id)
    setAiSettings(aiSettingsManager.getSettings())
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
        aiSettings,
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
    aiSettingsManager.resetToDefaults()
    setAiSettings(aiSettingsManager.getSettings())
    setHasUnsavedChanges(false)
  }

  const exportSettings = () => {
    const settings = {
      configuration,
      portnoxAddons,
      darkMode,
      aiSettings,
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
        if (settings.aiSettings) {
          aiSettingsManager.importSettings(JSON.stringify(settings.aiSettings))
          setAiSettings(aiSettingsManager.getSettings())
        }
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
              "fixed right-0 top-0 h-full w-full max-w-4xl z-50 overflow-y-auto",
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
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Advanced Settings & AI Configuration
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Customize your TCO analysis parameters and AI integration with OpenAI, Anthropic, and Gemini
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
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="organization" className="gap-2">
                    <Building className="h-4 w-4" />
                    <span className="hidden sm:inline">Organization</span>
                  </TabsTrigger>
                  <TabsTrigger value="pricing" className="gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span className="hidden sm:inline">Pricing</span>
                  </TabsTrigger>
                  <TabsTrigger value="ai-providers" className="gap-2">
                    <Brain className="h-4 w-4" />
                    <span className="hidden sm:inline">AI Providers</span>
                  </TabsTrigger>
                  <TabsTrigger value="ai-prompts" className="gap-2">
                    <Edit className="h-4 w-4" />
                    <span className="hidden sm:inline">AI Prompts</span>
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

                {/* AI Providers Tab */}
                <TabsContent value="ai-providers" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5" />
                        AI Provider Configuration
                      </CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Configure AI providers to enhance reports with intelligent insights and automated company
                        research.
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* OpenAI Configuration */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Key className="h-4 w-4" />
                            <Label className="text-base font-medium">OpenAI Configuration</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={aiSettings.providers.openai.enabled}
                              onCheckedChange={(checked) => handleAIProviderChange("openai", "enabled", checked)}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => testAIConnection("openai")}
                              disabled={testingConnections.openai || !aiSettings.providers.openai.apiKey}
                            >
                              {testingConnections.openai ? <Loader2 className="h-4 w-4 animate-spin" /> : "Test"}
                            </Button>
                            {connectionResults.openai !== null &&
                              (connectionResults.openai ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                              ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="openaiApiKey">API Key</Label>
                            <Input
                              id="openaiApiKey"
                              type="password"
                              placeholder="sk-..."
                              value={aiSettings.providers.openai.apiKey}
                              onChange={(e) => handleAIProviderChange("openai", "apiKey", e.target.value)}
                            />
                            <p className="text-xs text-gray-500 mt-1">Your OpenAI API key for GPT models</p>
                          </div>
                          <div>
                            <Label htmlFor="openaiModel">Model</Label>
                            <Select
                              value={aiSettings.providers.openai.model}
                              onValueChange={(value) => handleAIProviderChange("openai", "model", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="gpt-4o">GPT-4o (Recommended)</SelectItem>
                                <SelectItem value="gpt-4">GPT-4</SelectItem>
                                <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Temperature: {aiSettings.providers.openai.temperature}</Label>
                            <Slider
                              value={[aiSettings.providers.openai.temperature]}
                              onValueChange={(value) => handleAIProviderChange("openai", "temperature", value[0])}
                              min={0}
                              max={1}
                              step={0.1}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label>Max Tokens: {aiSettings.providers.openai.maxTokens}</Label>
                            <Slider
                              value={[aiSettings.providers.openai.maxTokens]}
                              onValueChange={(value) => handleAIProviderChange("openai", "maxTokens", value[0])}
                              min={500}
                              max={8000}
                              step={100}
                              className="mt-2"
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Anthropic Configuration */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Key className="h-4 w-4" />
                            <Label className="text-base font-medium">Anthropic Claude Configuration</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={aiSettings.providers.anthropic.enabled}
                              onCheckedChange={(checked) => handleAIProviderChange("anthropic", "enabled", checked)}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => testAIConnection("anthropic")}
                              disabled={testingConnections.anthropic || !aiSettings.providers.anthropic.apiKey}
                            >
                              {testingConnections.anthropic ? <Loader2 className="h-4 w-4 animate-spin" /> : "Test"}
                            </Button>
                            {connectionResults.anthropic !== null &&
                              (connectionResults.anthropic ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                              ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="anthropicApiKey">API Key</Label>
                            <Input
                              id="anthropicApiKey"
                              type="password"
                              placeholder="sk-ant-..."
                              value={aiSettings.providers.anthropic.apiKey}
                              onChange={(e) => handleAIProviderChange("anthropic", "apiKey", e.target.value)}
                            />
                            <p className="text-xs text-gray-500 mt-1">Your Anthropic API key for Claude models</p>
                          </div>
                          <div>
                            <Label htmlFor="anthropicModel">Model</Label>
                            <Select
                              value={aiSettings.providers.anthropic.model}
                              onValueChange={(value) => handleAIProviderChange("anthropic", "model", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="claude-3-opus-20240229">Claude 3 Opus</SelectItem>
                                <SelectItem value="claude-3-sonnet-20240229">Claude 3 Sonnet (Recommended)</SelectItem>
                                <SelectItem value="claude-3-haiku-20240307">Claude 3 Haiku</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Temperature: {aiSettings.providers.anthropic.temperature}</Label>
                            <Slider
                              value={[aiSettings.providers.anthropic.temperature]}
                              onValueChange={(value) => handleAIProviderChange("anthropic", "temperature", value[0])}
                              min={0}
                              max={1}
                              step={0.1}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label>Max Tokens: {aiSettings.providers.anthropic.maxTokens}</Label>
                            <Slider
                              value={[aiSettings.providers.anthropic.maxTokens]}
                              onValueChange={(value) => handleAIProviderChange("anthropic", "maxTokens", value[0])}
                              min={500}
                              max={8000}
                              step={100}
                              className="mt-2"
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Gemini Configuration */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Key className="h-4 w-4" />
                            <Label className="text-base font-medium">Google Gemini Configuration</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={aiSettings.providers.gemini.enabled}
                              onCheckedChange={(checked) => handleAIProviderChange("gemini", "enabled", checked)}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => testAIConnection("gemini")}
                              disabled={testingConnections.gemini || !aiSettings.providers.gemini.apiKey}
                            >
                              {testingConnections.gemini ? <Loader2 className="h-4 w-4 animate-spin" /> : "Test"}
                            </Button>
                            {connectionResults.gemini !== null &&
                              (connectionResults.gemini ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                              ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="geminiApiKey">API Key</Label>
                            <Input
                              id="geminiApiKey"
                              type="password"
                              placeholder="AI..."
                              value={aiSettings.providers.gemini.apiKey}
                              onChange={(e) => handleAIProviderChange("gemini", "apiKey", e.target.value)}
                            />
                            <p className="text-xs text-gray-500 mt-1">Your Google AI API key for Gemini models</p>
                          </div>
                          <div>
                            <Label htmlFor="geminiModel">Model</Label>
                            <Select
                              value={aiSettings.providers.gemini.model}
                              onValueChange={(value) => handleAIProviderChange("gemini", "model", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="gemini-pro">Gemini Pro (Recommended)</SelectItem>
                                <SelectItem value="gemini-pro-vision">Gemini Pro Vision</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Temperature: {aiSettings.providers.gemini.temperature}</Label>
                            <Slider
                              value={[aiSettings.providers.gemini.temperature]}
                              onValueChange={(value) => handleAIProviderChange("gemini", "temperature", value[0])}
                              min={0}
                              max={1}
                              step={0.1}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label>Max Tokens: {aiSettings.providers.gemini.maxTokens}</Label>
                            <Slider
                              value={[aiSettings.providers.gemini.maxTokens]}
                              onValueChange={(value) => handleAIProviderChange("gemini", "maxTokens", value[0])}
                              min={500}
                              max={8000}
                              step={100}
                              className="mt-2"
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Default Provider */}
                      <div>
                        <Label>Default AI Provider</Label>
                        <Select
                          value={aiSettings.defaultProvider}
                          onValueChange={(value: "openai" | "anthropic" | "gemini") =>
                            aiSettingsManager.setDefaultProvider(value)
                          }
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="openai">OpenAI GPT-4</SelectItem>
                            <SelectItem value="anthropic">Anthropic Claude</SelectItem>
                            <SelectItem value="gemini">Google Gemini</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* AI Prompts Tab */}
                <TabsContent value="ai-prompts" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Edit className="h-5 w-5" />
                        AI Prompt Management
                      </CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Customize AI prompts for different analysis types and create custom prompts for specialized use
                        cases.
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Built-in Prompts */}
                      <div>
                        <Label className="text-base font-medium">Built-in Prompts</Label>
                        <div className="space-y-4 mt-4">
                          {aiSettings.prompts && Object.entries(aiSettings.prompts).map(([category, prompts]) => (
                            <div key={category} className="border rounded-lg p-4">
                              <h4 className="font-medium capitalize mb-3">{category.replace(/([A-Z])/g, " $1")}</h4>
                              <div className="space-y-3">
                                {Object.entries(prompts).map(([provider, prompt]) => (
                                  <div key={provider} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <Label className="capitalize">{provider} Prompt</Label>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setEditingPrompt(`${category}-${provider}`)}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                    </div>
                                    {editingPrompt === `${category}-${provider}` ? (
                                      <div className="space-y-2">
                                        <Textarea
                                          value={prompt}
                                          onChange={(e) =>
                                            handlePromptChange(
                                              category as keyof AISettings["prompts"],
                                              provider as "openai" | "anthropic" | "gemini",
                                              e.target.value,
                                            )
                                          }
                                          rows={6}
                                          className="font-mono text-sm"
                                        />
                                        <div className="flex gap-2">
                                          <Button size="sm" onClick={() => setEditingPrompt(null)}>
                                            Save
                                          </Button>
                                          <Button variant="outline" size="sm" onClick={() => setEditingPrompt(null)}>
                                            Cancel
                                          </Button>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded text-sm font-mono">
                                        {prompt.substring(0, 200)}...
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Custom Prompts */}
                      <div>
                        <div className="flex items-center justify-between">
                          <Label className="text-base font-medium">Custom Prompts</Label>
                          <Button variant="outline" size="sm" onClick={() => setEditingPrompt("new-custom")}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Custom Prompt
                          </Button>
                        </div>

                        {editingPrompt === "new-custom" && (
                          <Card className="mt-4">
                            <CardContent className="p-4 space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Name</Label>
                                  <Input
                                    value={newCustomPrompt.name}
                                    onChange={(e) => setNewCustomPrompt((prev) => ({ ...prev, name: e.target.value }))}
                                    placeholder="Custom Analysis Prompt"
                                  />
                                </div>
                                <div>
                                  <Label>Category</Label>
                                  <Select
                                    value={newCustomPrompt.category}
                                    onValueChange={(value: "research" | "enhancement" | "analysis" | "custom") =>
                                      setNewCustomPrompt((prev) => ({ ...prev, category: value }))
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="research">Research</SelectItem>
                                      <SelectItem value="enhancement">Enhancement</SelectItem>
                                      <SelectItem value="analysis">Analysis</SelectItem>
                                      <SelectItem value="custom">Custom</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div>
                                <Label>Description</Label>
                                <Input
                                  value={newCustomPrompt.description}
                                  onChange={(e) =>
                                    setNewCustomPrompt((prev) => ({ ...prev, description: e.target.value }))
                                  }
                                  placeholder="Brief description of what this prompt does"
                                />
                              </div>
                              <div>
                                <Label>Prompt Template</Label>
                                <Textarea
                                  value={newCustomPrompt.prompt}
                                  onChange={(e) => setNewCustomPrompt((prev) => ({ ...prev, prompt: e.target.value }))}
                                  rows={6}
                                  placeholder="Enter your custom prompt template here. Use {variableName} for variables."
                                  className="font-mono text-sm"
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button onClick={addCustomPrompt}>
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Prompt
                                </Button>
                                <Button variant="outline" onClick={() => setEditingPrompt(null)}>
                                  Cancel
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        <div className="space-y-3 mt-4">
                          {aiSettings.customPrompts.map((prompt) => (
                            <div key={prompt.id} className="border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h4 className="font-medium">{prompt.name}</h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{prompt.description}</p>
                                </div>
                                <div className="flex gap-2">
                                  <Badge variant="outline">{prompt.category}</Badge>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      navigator.clipboard.writeText(prompt.prompt)
                                    }}
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                  <Button variant="outline" size="sm" onClick={() => deleteCustomPrompt(prompt.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded text-sm font-mono">
                                {prompt.prompt.substring(0, 200)}...
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
                          <Label>AI-Enhanced Reports</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Enable AI-powered company research and report enhancement
                          </p>
                        </div>
                        <Switch
                          checked={aiSettings.features.enhancedReports}
                          onCheckedChange={(checked) => aiSettingsManager.updateFeatures({ enhancedReports: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Automatic Company Research</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Automatically research companies when generating reports
                          </p>
                        </div>
                        <Switch
                          checked={aiSettings.features.autoResearch}
                          onCheckedChange={(checked) => aiSettingsManager.updateFeatures({ autoResearch: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Industry Insights</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Include AI-powered industry analysis in reports
                          </p>
                        </div>
                        <Switch
                          checked={aiSettings.features.industryInsights}
                          onCheckedChange={(checked) => aiSettingsManager.updateFeatures({ industryInsights: checked })}
                        />
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
