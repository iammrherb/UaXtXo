"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Settings, Building, Shield, DollarSign, Zap } from "lucide-react"
import type { CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface SettingsPanelProps {
  configuration: CalculationConfiguration
  onConfigurationChange: (config: CalculationConfiguration) => void
  onClose: () => void
}

export default function SettingsPanel({ configuration, onConfigurationChange, onClose }: SettingsPanelProps) {
  const [localConfig, setLocalConfig] = useState<CalculationConfiguration>({
    devices: configuration?.devices || 1000,
    users: configuration?.users || 2500,
    years: configuration?.years || 3,
    industry: configuration?.industry || "technology",
    companySize: configuration?.companySize || "medium",
    securityLevel: configuration?.securityLevel || "high",
    complianceRequirements: configuration?.complianceRequirements || ["SOC2"],
    currentSolution: configuration?.currentSolution || "basic",
    deploymentComplexity: configuration?.deploymentComplexity || "medium",
    supportLevel: configuration?.supportLevel || "premium",
    integrationRequirements: configuration?.integrationRequirements || ["active-directory"],
    geographicScope: configuration?.geographicScope || "single-region",
    budgetConstraints: configuration?.budgetConstraints || "moderate",
  })

  const handleSave = () => {
    onConfigurationChange(localConfig)
    onClose()
  }

  const handleReset = () => {
    const defaultConfig: CalculationConfiguration = {
      devices: 1000,
      users: 2500,
      years: 3,
      industry: "technology",
      companySize: "medium",
      securityLevel: "high",
      complianceRequirements: ["SOC2"],
      currentSolution: "basic",
      deploymentComplexity: "medium",
      supportLevel: "premium",
      integrationRequirements: ["active-directory"],
      geographicScope: "single-region",
      budgetConstraints: "moderate",
    }
    setLocalConfig(defaultConfig)
  }

  const updateConfig = (key: keyof CalculationConfiguration, value: any) => {
    setLocalConfig((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Analysis Configuration</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Organization Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Organization Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="devices">Number of Devices</Label>
                <Input
                  id="devices"
                  type="number"
                  value={localConfig.devices}
                  onChange={(e) => updateConfig("devices", Number.parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="users">Number of Users</Label>
                <Input
                  id="users"
                  type="number"
                  value={localConfig.users}
                  onChange={(e) => updateConfig("users", Number.parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

            <div>
              <Label>Analysis Period: {localConfig.years} years</Label>
              <Slider
                value={[localConfig.years]}
                onValueChange={(value) => updateConfig("years", value[0])}
                max={5}
                min={1}
                step={1}
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Industry</Label>
                <Select value={localConfig.industry} onValueChange={(value) => updateConfig("industry", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Financial Services</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Company Size</Label>
                <Select value={localConfig.companySize} onValueChange={(value) => updateConfig("companySize", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (1-500 employees)</SelectItem>
                    <SelectItem value="medium">Medium (500-5000 employees)</SelectItem>
                    <SelectItem value="large">Large (5000+ employees)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Security Level</Label>
              <Select value={localConfig.securityLevel} onValueChange={(value) => updateConfig("securityLevel", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic Security</SelectItem>
                  <SelectItem value="standard">Standard Security</SelectItem>
                  <SelectItem value="high">High Security</SelectItem>
                  <SelectItem value="critical">Critical Security</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Compliance Requirements</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {["SOC2", "ISO27001", "HIPAA", "PCI-DSS", "GDPR", "NIST", "FedRAMP"].map((compliance) => (
                  <Badge
                    key={compliance}
                    variant={localConfig.complianceRequirements.includes(compliance) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      const current = localConfig.complianceRequirements
                      const updated = current.includes(compliance)
                        ? current.filter((c) => c !== compliance)
                        : [...current, compliance]
                      updateConfig("complianceRequirements", updated)
                    }}
                  >
                    {compliance}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>Current Solution</Label>
              <Select
                value={localConfig.currentSolution}
                onValueChange={(value) => updateConfig("currentSolution", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No NAC Solution</SelectItem>
                  <SelectItem value="basic">Basic Network Security</SelectItem>
                  <SelectItem value="legacy">Legacy NAC Solution</SelectItem>
                  <SelectItem value="partial">Partial Implementation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Deployment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Deployment Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Deployment Complexity</Label>
              <Select
                value={localConfig.deploymentComplexity}
                onValueChange={(value) => updateConfig("deploymentComplexity", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simple">Simple (Cloud-only)</SelectItem>
                  <SelectItem value="medium">Medium (Hybrid)</SelectItem>
                  <SelectItem value="complex">Complex (Multi-site)</SelectItem>
                  <SelectItem value="enterprise">Enterprise (Global)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Support Level</Label>
              <Select value={localConfig.supportLevel} onValueChange={(value) => updateConfig("supportLevel", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic Support</SelectItem>
                  <SelectItem value="standard">Standard Support</SelectItem>
                  <SelectItem value="premium">Premium Support</SelectItem>
                  <SelectItem value="enterprise">Enterprise Support</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Geographic Scope</Label>
              <Select
                value={localConfig.geographicScope}
                onValueChange={(value) => updateConfig("geographicScope", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single-region">Single Region</SelectItem>
                  <SelectItem value="multi-region">Multi-Region</SelectItem>
                  <SelectItem value="global">Global</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Integration Requirements</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {["active-directory", "siem", "mdm", "firewall", "vpn", "cloud-platforms", "ticketing"].map(
                  (integration) => (
                    <Badge
                      key={integration}
                      variant={localConfig.integrationRequirements.includes(integration) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        const current = localConfig.integrationRequirements
                        const updated = current.includes(integration)
                          ? current.filter((i) => i !== integration)
                          : [...current, integration]
                        updateConfig("integrationRequirements", updated)
                      }}
                    >
                      {integration.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Badge>
                  ),
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Budget Constraints */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Budget Considerations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Budget Constraints</Label>
              <Select
                value={localConfig.budgetConstraints}
                onValueChange={(value) => updateConfig("budgetConstraints", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tight">Tight Budget</SelectItem>
                  <SelectItem value="moderate">Moderate Budget</SelectItem>
                  <SelectItem value="flexible">Flexible Budget</SelectItem>
                  <SelectItem value="unlimited">No Budget Constraints</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="border-t p-6">
        <div className="flex gap-3">
          <Button onClick={handleSave} className="flex-1">
            Save Configuration
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Reset to Defaults
          </Button>
        </div>
      </div>
    </div>
  )
}
