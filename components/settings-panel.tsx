"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, DollarSign, Users, Calendar, Shield, Zap, Moon, Sun, Save, RotateCcw, Info } from "lucide-react"
import type { CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  configuration: CalculationConfiguration
  onConfigurationChange: (config: CalculationConfiguration) => void
  darkMode: boolean
  onDarkModeChange: (isDark: boolean) => void
}

export default function SettingsPanel({
  isOpen,
  onClose,
  configuration,
  onConfigurationChange,
  darkMode,
  onDarkModeChange,
}: SettingsPanelProps) {
  const [localConfig, setLocalConfig] = useState<CalculationConfiguration>(configuration)

  const handleSave = () => {
    onConfigurationChange(localConfig)
    onClose()
  }

  const handleReset = () => {
    const defaultConfig: CalculationConfiguration = {
      devices: 5000,
      users: 5000,
      years: 3,
      licenseTier: "Enterprise",
      integrations: { mdm: true, siem: true, edr: false },
      professionalServices: "advanced",
      includeTraining: true,
      portnoxDeviceCost: 60,
      avgFteCost: 150000,
    }
    setLocalConfig(defaultConfig)
  }

  const updateConfig = (updates: Partial<CalculationConfiguration>) => {
    setLocalConfig((prev) => ({ ...prev, ...updates }))
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Configuration Settings
          </SheetTitle>
          <SheetDescription>Customize the TCO analysis parameters and system preferences.</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <Tabs defaultValue="analysis" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>

            <TabsContent value="analysis" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Environment Size
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="devices">Number of Devices</Label>
                    <Input
                      id="devices"
                      type="number"
                      value={localConfig.devices}
                      onChange={(e) => updateConfig({ devices: Number.parseInt(e.target.value) || 0 })}
                      placeholder="5000"
                    />
                    <p className="text-xs text-muted-foreground">Total network devices requiring NAC coverage</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="users">Number of Users</Label>
                    <Input
                      id="users"
                      type="number"
                      value={localConfig.users}
                      onChange={(e) => updateConfig({ users: Number.parseInt(e.target.value) || 0 })}
                      placeholder="5000"
                    />
                    <p className="text-xs text-muted-foreground">Total users requiring network access</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Analysis Period
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Analysis Years: {localConfig.years}</Label>
                    <Slider
                      value={[localConfig.years]}
                      onValueChange={(value) => updateConfig({ years: value[0] })}
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 year</span>
                      <span>5 years</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    License & Services
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>License Tier</Label>
                    <Select
                      value={localConfig.licenseTier}
                      onValueChange={(value: "Essentials" | "Professional" | "Enterprise") =>
                        updateConfig({ licenseTier: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Essentials">Essentials</SelectItem>
                        <SelectItem value="Professional">Professional</SelectItem>
                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Professional Services</Label>
                    <Select
                      value={localConfig.professionalServices}
                      onValueChange={(value: "basic" | "advanced" | "migration") =>
                        updateConfig({ professionalServices: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="migration">Migration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="training">Include Training</Label>
                    <Switch
                      id="training"
                      checked={localConfig.includeTraining}
                      onCheckedChange={(checked) => updateConfig({ includeTraining: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center">
                    <Zap className="h-4 w-4 mr-2" />
                    Integrations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="mdm">MDM Integration</Label>
                    <Switch
                      id="mdm"
                      checked={localConfig.integrations.mdm}
                      onCheckedChange={(checked) =>
                        updateConfig({
                          integrations: { ...localConfig.integrations, mdm: checked },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="siem">SIEM Integration</Label>
                    <Switch
                      id="siem"
                      checked={localConfig.integrations.siem}
                      onCheckedChange={(checked) =>
                        updateConfig({
                          integrations: { ...localConfig.integrations, siem: checked },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="edr">EDR Integration</Label>
                    <Switch
                      id="edr"
                      checked={localConfig.integrations.edr}
                      onCheckedChange={(checked) =>
                        updateConfig({
                          integrations: { ...localConfig.integrations, edr: checked },
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Custom Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="portnox-cost">Portnox Per-Device Cost ($/year)</Label>
                    <Input
                      id="portnox-cost"
                      type="number"
                      value={localConfig.portnoxDeviceCost}
                      onChange={(e) => updateConfig({ portnoxDeviceCost: Number.parseFloat(e.target.value) || 0 })}
                      placeholder="60"
                    />
                    <p className="text-xs text-muted-foreground">
                      Override default Portnox pricing for custom scenarios
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fte-cost">Average FTE Cost ($/year)</Label>
                    <Input
                      id="fte-cost"
                      type="number"
                      value={localConfig.avgFteCost}
                      onChange={(e) => updateConfig({ avgFteCost: Number.parseFloat(e.target.value) || 0 })}
                      placeholder="150000"
                    />
                    <p className="text-xs text-muted-foreground">
                      Fully loaded cost per full-time employee including benefits
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center">
                    <Info className="h-4 w-4 mr-2" />
                    Vendor-Specific Notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Badge variant="outline" className="w-full justify-start">
                      SecureW2
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      User-based licensing model. Excellent for certificate-based authentication.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline" className="w-full justify-start">
                      Foxpass
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      Simple cloud RADIUS/LDAP. Best for basic authentication needs.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline" className="w-full justify-start">
                      Pulse Secure
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      Comprehensive platform with VPN and ZTNA capabilities.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="system" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Appearance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                      <Label>Dark Mode</Label>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={onDarkModeChange} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Data Export</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Export your analysis data and configurations for external use or backup.
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Export Config
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Import Config
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Separator />

          <div className="flex space-x-3">
            <Button onClick={handleReset} variant="outline" className="flex-1 bg-transparent">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSave} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
