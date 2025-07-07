"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, RotateCcw } from "lucide-react"

interface SettingsPanelProps {
  config: any
  onConfigChange: (config: any) => void
}

export function SettingsPanel({ config, onConfigChange }: SettingsPanelProps) {
  const [localConfig, setLocalConfig] = useState(config)

  const handleSave = () => {
    onConfigChange(localConfig)
  }

  const handleReset = () => {
    const defaultConfig = {
      deviceCount: 1000,
      timeframe: 3,
      industry: "healthcare",
      hasExistingNAC: false,
      existingVendor: "",
      annualRevenue: 100000000,
      securityBudget: 2000000,
      complianceRequirements: ["hipaa", "sox"],
      deploymentComplexity: "medium",
      geographicScope: "national",
      integrationRequirements: ["active_directory", "siem", "itsm"],
      businessCriticality: "high",
    }
    setLocalConfig(defaultConfig)
    onConfigChange(defaultConfig)
  }

  const updateConfig = (key: string, value: any) => {
    setLocalConfig((prev: any) => ({ ...prev, [key]: value }))
  }

  const industries = [
    { value: "healthcare", label: "Healthcare" },
    { value: "financial", label: "Financial Services" },
    { value: "education", label: "Education" },
    { value: "government", label: "Government" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "retail", label: "Retail" },
    { value: "technology", label: "Technology" },
    { value: "other", label: "Other" },
  ]

  const complianceOptions = [
    { id: "hipaa", label: "HIPAA" },
    { id: "pci_dss", label: "PCI DSS" },
    { id: "gdpr", label: "GDPR" },
    { id: "sox", label: "SOX" },
    { id: "iso27001", label: "ISO 27001" },
    { id: "nist", label: "NIST" },
    { id: "fedramp", label: "FedRAMP" },
    { id: "fisma", label: "FISMA" },
  ]

  const integrationOptions = [
    { id: "active_directory", label: "Active Directory" },
    { id: "siem", label: "SIEM" },
    { id: "itsm", label: "ITSM" },
    { id: "mdm", label: "MDM" },
    { id: "vpn", label: "VPN" },
    { id: "firewall", label: "Firewall" },
    { id: "endpoint_protection", label: "Endpoint Protection" },
    { id: "cloud_services", label: "Cloud Services" },
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="organization" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="organization" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select value={localConfig.industry} onValueChange={(value) => updateConfig("industry", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry.value} value={industry.value}>
                      {industry.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deviceCount">Number of Devices</Label>
              <Input
                id="deviceCount"
                type="number"
                value={localConfig.deviceCount}
                onChange={(e) => updateConfig("deviceCount", Number.parseInt(e.target.value) || 0)}
                placeholder="1000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualRevenue">Annual Revenue ($)</Label>
              <Input
                id="annualRevenue"
                type="number"
                value={localConfig.annualRevenue}
                onChange={(e) => updateConfig("annualRevenue", Number.parseInt(e.target.value) || 0)}
                placeholder="100000000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="securityBudget">Security Budget ($)</Label>
              <Input
                id="securityBudget"
                type="number"
                value={localConfig.securityBudget}
                onChange={(e) => updateConfig("securityBudget", Number.parseInt(e.target.value) || 0)}
                placeholder="2000000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeframe">Analysis Timeframe (Years)</Label>
              <div className="px-3">
                <Slider
                  value={[localConfig.timeframe]}
                  onValueChange={(value) => updateConfig("timeframe", value[0])}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>1 year</span>
                  <span>{localConfig.timeframe} years</span>
                  <span>5 years</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="geographicScope">Geographic Scope</Label>
              <Select
                value={localConfig.geographicScope}
                onValueChange={(value) => updateConfig("geographicScope", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select scope" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">Local</SelectItem>
                  <SelectItem value="regional">Regional</SelectItem>
                  <SelectItem value="national">National</SelectItem>
                  <SelectItem value="global">Global</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="technical" className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="hasExistingNAC"
                checked={localConfig.hasExistingNAC}
                onCheckedChange={(checked) => updateConfig("hasExistingNAC", checked)}
              />
              <Label htmlFor="hasExistingNAC">Has Existing NAC Solution</Label>
            </div>

            {localConfig.hasExistingNAC && (
              <div className="space-y-2">
                <Label htmlFor="existingVendor">Current NAC Vendor</Label>
                <Select
                  value={localConfig.existingVendor}
                  onValueChange={(value) => updateConfig("existingVendor", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select current vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cisco">Cisco ISE</SelectItem>
                    <SelectItem value="aruba">Aruba ClearPass</SelectItem>
                    <SelectItem value="forescout">Forescout</SelectItem>
                    <SelectItem value="fortinet">Fortinet FortiNAC</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="deploymentComplexity">Deployment Complexity</Label>
              <Select
                value={localConfig.deploymentComplexity}
                onValueChange={(value) => updateConfig("deploymentComplexity", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select complexity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Simple network, single site</SelectItem>
                  <SelectItem value="medium">Medium - Multiple sites, moderate complexity</SelectItem>
                  <SelectItem value="high">High - Complex network, many sites</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessCriticality">Business Criticality</Label>
              <Select
                value={localConfig.businessCriticality}
                onValueChange={(value) => updateConfig("businessCriticality", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select criticality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Non-critical systems</SelectItem>
                  <SelectItem value="medium">Medium - Important but not critical</SelectItem>
                  <SelectItem value="high">High - Mission-critical systems</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Required Integrations</Label>
              <div className="grid grid-cols-2 gap-2">
                {integrationOptions.map((integration) => (
                  <div key={integration.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={integration.id}
                      checked={localConfig.integrationRequirements?.includes(integration.id)}
                      onCheckedChange={(checked) => {
                        const current = localConfig.integrationRequirements || []
                        if (checked) {
                          updateConfig("integrationRequirements", [...current, integration.id])
                        } else {
                          updateConfig(
                            "integrationRequirements",
                            current.filter((item: string) => item !== integration.id),
                          )
                        }
                      }}
                    />
                    <Label htmlFor={integration.id} className="text-sm">
                      {integration.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="space-y-3">
            <Label>Compliance Requirements</Label>
            <div className="grid grid-cols-2 gap-2">
              {complianceOptions.map((compliance) => (
                <div key={compliance.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={compliance.id}
                    checked={localConfig.complianceRequirements?.includes(compliance.id)}
                    onCheckedChange={(checked) => {
                      const current = localConfig.complianceRequirements || []
                      if (checked) {
                        updateConfig("complianceRequirements", [...current, compliance.id])
                      } else {
                        updateConfig(
                          "complianceRequirements",
                          current.filter((item: string) => item !== compliance.id),
                        )
                      }
                    }}
                  />
                  <Label htmlFor={compliance.id} className="text-sm">
                    {compliance.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Compliance Impact</CardTitle>
              <CardDescription>How your selections affect compliance scoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {localConfig.complianceRequirements?.map((req: string) => {
                  const compliance = complianceOptions.find((c) => c.id === req)
                  return (
                    <div key={req} className="flex items-center justify-between">
                      <span className="text-sm">{compliance?.label}</span>
                      <Badge variant="outline">Required</Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Advanced Configuration</CardTitle>
              <CardDescription>Fine-tune analysis parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Risk Tolerance Level</Label>
                <div className="px-3">
                  <Slider
                    value={[localConfig.riskTolerance || 50]}
                    onValueChange={(value) => updateConfig("riskTolerance", value[0])}
                    max={100}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>Conservative</span>
                    <span>Moderate</span>
                    <span>Aggressive</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Budget Flexibility (%)</Label>
                <div className="px-3">
                  <Slider
                    value={[localConfig.budgetFlexibility || 20]}
                    onValueChange={(value) => updateConfig("budgetFlexibility", value[0])}
                    max={50}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>Fixed</span>
                    <span>{localConfig.budgetFlexibility || 20}%</span>
                    <span>Flexible</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="includeHiddenCosts"
                  checked={localConfig.includeHiddenCosts !== false}
                  onCheckedChange={(checked) => updateConfig("includeHiddenCosts", checked)}
                />
                <Label htmlFor="includeHiddenCosts">Include Hidden Costs Analysis</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="enableBenchmarking"
                  checked={localConfig.enableBenchmarking !== false}
                  onCheckedChange={(checked) => updateConfig("enableBenchmarking", checked)}
                />
                <Label htmlFor="enableBenchmarking">Enable Industry Benchmarking</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Separator />

      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">Configuration will be applied to all analysis modules</div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Apply Settings
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel
