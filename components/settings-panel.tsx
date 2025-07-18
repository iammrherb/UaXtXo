"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Settings, DollarSign, Building2, Zap, BarChart3 } from "lucide-react"

import type { CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface SettingsPanelProps {
  config: CalculationConfiguration
  onConfigChange: (updates: Partial<CalculationConfiguration>) => void
}

export default function SettingsPanel({ config, onConfigChange }: SettingsPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const calculatePortnoxTotal = () => {
    const basePrice = config.portnoxBasePrice
    let addonCost = 0

    if (config.portnoxAddons.atp) addonCost += 12
    if (config.portnoxAddons.compliance) addonCost += 8
    if (config.portnoxAddons.iot) addonCost += 6
    if (config.portnoxAddons.analytics) addonCost += 4

    return (basePrice + addonCost) * config.devices * config.years
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Configuration Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Organization Settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-blue-600" />
            <h3 className="font-semibold">Organization Profile</h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="devices">Number of Devices</Label>
              <Input
                id="devices"
                type="number"
                value={config.devices}
                onChange={(e) => onConfigChange({ devices: Number.parseInt(e.target.value) || 0 })}
                min="1"
                max="100000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="users">Number of Users</Label>
              <Input
                id="users"
                type="number"
                value={config.users}
                onChange={(e) => onConfigChange({ users: Number.parseInt(e.target.value) || 0 })}
                min="1"
                max="100000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="years">Analysis Period</Label>
            <Select
              value={config.years.toString()}
              onValueChange={(value) => onConfigChange({ years: Number.parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Year</SelectItem>
                <SelectItem value="3">3 Years</SelectItem>
                <SelectItem value="5">5 Years</SelectItem>
                <SelectItem value="7">7 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select value={config.industry} onValueChange={(value) => onConfigChange({ industry: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="financial">Financial Services</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="orgSize">Organization Size</Label>
              <Select value={config.orgSize} onValueChange={(value) => onConfigChange({ orgSize: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (&lt; 500 employees)</SelectItem>
                  <SelectItem value="medium">Medium (500-5000)</SelectItem>
                  <SelectItem value="large">Large (5000+ employees)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Select value={config.region} onValueChange={(value) => onConfigChange({ region: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="north-america">North America</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                <SelectItem value="latin-america">Latin America</SelectItem>
                <SelectItem value="middle-east-africa">Middle East & Africa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* Portnox Pricing Configuration */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <h3 className="font-semibold">Portnox Pricing</h3>
            <Badge variant="secondary" className="ml-auto">
              {formatCurrency(calculatePortnoxTotal())} total
            </Badge>
          </div>

          <div className="space-y-2">
            <Label htmlFor="portnoxBasePrice">Base Price per Device/Year</Label>
            <div className="flex items-center gap-2">
              <Slider
                value={[config.portnoxBasePrice]}
                onValueChange={(value) => onConfigChange({ portnoxBasePrice: value[0] })}
                min={36}
                max={84}
                step={6}
                className="flex-1"
              />
              <span className="text-sm font-medium w-16 text-right">${config.portnoxBasePrice}</span>
            </div>
            <div className="text-xs text-muted-foreground">Range: $36 (Starter) to $84 (Enterprise)</div>
          </div>

          <div className="space-y-3">
            <Label>Add-on Modules</Label>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="atp"
                    checked={config.portnoxAddons.atp}
                    onCheckedChange={(checked) =>
                      onConfigChange({
                        portnoxAddons: { ...config.portnoxAddons, atp: checked },
                      })
                    }
                  />
                  <Label htmlFor="atp" className="text-sm">
                    Advanced Threat Protection
                  </Label>
                </div>
                <span className="text-sm text-muted-foreground">+$12/device/year</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="compliance"
                    checked={config.portnoxAddons.compliance}
                    onCheckedChange={(checked) =>
                      onConfigChange({
                        portnoxAddons: { ...config.portnoxAddons, compliance: checked },
                      })
                    }
                  />
                  <Label htmlFor="compliance" className="text-sm">
                    Compliance Suite
                  </Label>
                </div>
                <span className="text-sm text-muted-foreground">+$8/device/year</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="iot"
                    checked={config.portnoxAddons.iot}
                    onCheckedChange={(checked) =>
                      onConfigChange({
                        portnoxAddons: { ...config.portnoxAddons, iot: checked },
                      })
                    }
                  />
                  <Label htmlFor="iot" className="text-sm">
                    IoT Security
                  </Label>
                </div>
                <span className="text-sm text-muted-foreground">+$6/device/year</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="analytics"
                    checked={config.portnoxAddons.analytics}
                    onCheckedChange={(checked) =>
                      onConfigChange({
                        portnoxAddons: { ...config.portnoxAddons, analytics: checked },
                      })
                    }
                  />
                  <Label htmlFor="analytics" className="text-sm">
                    Advanced Analytics
                  </Label>
                </div>
                <span className="text-sm text-muted-foreground">+$4/device/year</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Configuration Presets */}
        <Separator />

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-purple-600" />
            <h3 className="font-semibold">Quick Presets</h3>
          </div>

          <div className="grid gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                onConfigChange({
                  devices: 500,
                  users: 600,
                  years: 3,
                  industry: "technology",
                  orgSize: "small",
                  portnoxBasePrice: 48,
                })
              }
            >
              Small Tech Company
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                onConfigChange({
                  devices: 2500,
                  users: 3000,
                  years: 5,
                  industry: "healthcare",
                  orgSize: "medium",
                  portnoxBasePrice: 60,
                })
              }
            >
              Mid-size Healthcare
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                onConfigChange({
                  devices: 10000,
                  users: 12000,
                  years: 5,
                  industry: "financial",
                  orgSize: "large",
                  portnoxBasePrice: 72,
                })
              }
            >
              Large Financial
            </Button>
          </div>
        </div>

        {/* Configuration Summary */}
        <Separator />

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-blue-600" />
            <h3 className="font-semibold">Configuration Summary</h3>
          </div>

          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Devices:</span>
              <span>{config.devices.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Users:</span>
              <span>{config.users.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Analysis Period:</span>
              <span>{config.years} years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Industry:</span>
              <span className="capitalize">{config.industry}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Organization Size:</span>
              <span className="capitalize">{config.orgSize}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Portnox Total:</span>
              <span className="font-medium">{formatCurrency(calculatePortnoxTotal())}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
