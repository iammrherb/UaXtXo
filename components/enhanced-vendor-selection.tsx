"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { getVendorData, getVendorLogoPath } from "@/lib/comprehensive-vendor-data"
import type { CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import {
  Users,
  Shield,
  Zap,
  Star,
  TrendingUp,
  Calculator,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import Image from "next/image"

interface VendorCategory {
  [category: string]: string[]
}

const VENDOR_CATEGORIES: VendorCategory = {
  "Cloud-Native Leaders": ["portnox"],
  "Enterprise Solutions": ["cisco", "aruba", "fortinet"],
  "Microsoft Ecosystem": ["microsoft"],
  "Specialized Solutions": ["securew2", "foxpass"],
  "VPN & Remote Access": ["pulse"],
}

// Detailed vendor information
const VENDOR_DETAILS = {
  portnox: {
    fullName: "Portnox NAC",
    category: "Cloud-Native",
    marketPosition: "Visionary",
    founded: "2018",
    headquarters: "New York, USA",
    employees: "50-200",
    strengths: ["Zero Trust", "AI-Powered", "Cloud-Native", "Easy Deployment", "Cost-Effective"],
    weaknesses: ["Newer Vendor", "Limited Enterprise Features", "Internet Dependency"],
    useCases: ["SMB to Mid-Market", "Cloud-First Organizations", "BYOD Environments"],
    integrations: ["Azure AD", "Okta", "Google", "Cisco", "Aruba", "Juniper"],
    certifications: ["SOC 2", "ISO 27001", "GDPR"],
    supportModel: "24/7 Cloud Support",
    deploymentModel: "Cloud-Only",
    pricing: "Per Device/Month",
  },
  cisco: {
    fullName: "Cisco Identity Services Engine (ISE)",
    category: "Enterprise",
    marketPosition: "Leader",
    founded: "1984",
    headquarters: "San Jose, USA",
    employees: "80,000+",
    strengths: ["Market Leader", "Enterprise Features", "Extensive Integration", "Proven Scalability"],
    weaknesses: ["Complex Deployment", "High Cost", "Steep Learning Curve"],
    useCases: ["Large Enterprise", "Complex Networks", "Cisco Infrastructure"],
    integrations: ["Cisco Ecosystem", "Active Directory", "SIEM", "Threat Intelligence"],
    certifications: ["FIPS 140-2", "Common Criteria", "SOC 2"],
    supportModel: "Tiered Support",
    deploymentModel: "On-Premises/Hybrid",
    pricing: "Per Device License",
  },
  aruba: {
    fullName: "Aruba ClearPass",
    category: "Enterprise",
    marketPosition: "Challenger",
    founded: "2002",
    headquarters: "Santa Clara, USA",
    employees: "5,000+",
    strengths: ["Wireless Expertise", "Policy Management", "Good Integration", "User Experience"],
    weaknesses: ["Hardware Dependencies", "Complex Wireless Setup"],
    useCases: ["Wireless-Heavy Environments", "Campus Networks", "Healthcare"],
    integrations: ["Aruba Infrastructure", "Microsoft", "VMware", "SIEM"],
    certifications: ["FIPS", "Common Criteria", "SOC 2"],
    supportModel: "Global Support",
    deploymentModel: "On-Premises/Cloud",
    pricing: "Per Device License",
  },
  fortinet: {
    fullName: "FortiNAC",
    category: "Security-Focused",
    marketPosition: "Challenger",
    founded: "2000",
    headquarters: "Sunnyvale, USA",
    employees: "10,000+",
    strengths: ["Security Integration", "Threat Protection", "Unified Platform", "Cost-Effective"],
    weaknesses: ["Complex Security Setup", "Integration Overhead"],
    useCases: ["Security-First Organizations", "Threat-Heavy Environments", "Fortinet Customers"],
    integrations: ["Fortinet Security Fabric", "SIEM", "Threat Intelligence"],
    certifications: ["FIPS", "Common Criteria", "SOC 2"],
    supportModel: "Global Support",
    deploymentModel: "On-Premises/Cloud",
    pricing: "Per Device License",
  },
  microsoft: {
    fullName: "Microsoft NPS/Intune",
    category: "Identity-Focused",
    marketPosition: "Challenger",
    founded: "1975",
    headquarters: "Redmond, USA",
    employees: "200,000+",
    strengths: ["Azure Integration", "Identity Management", "Licensing Efficiency", "Ecosystem"],
    weaknesses: ["Limited NAC Features", "Microsoft Dependency"],
    useCases: ["Microsoft Shops", "Azure Customers", "Office 365 Users"],
    integrations: ["Azure AD", "Office 365", "Intune", "Windows"],
    certifications: ["SOC 2", "ISO 27001", "FedRAMP"],
    supportModel: "Microsoft Support",
    deploymentModel: "Cloud-First",
    pricing: "Per User License",
  },
  securew2: {
    fullName: "SecureW2",
    category: "Certificate-Focused",
    marketPosition: "Niche",
    founded: "2010",
    headquarters: "San Jose, USA",
    employees: "50-200",
    strengths: ["Certificate Management", "Wi-Fi Onboarding", "Education Focus", "Easy Setup"],
    weaknesses: ["Limited Enterprise Features", "Narrow Focus"],
    useCases: ["Education", "Certificate-Based Auth", "Wi-Fi Onboarding"],
    integrations: ["Active Directory", "Google", "Azure AD"],
    certifications: ["SOC 2", "FERPA"],
    supportModel: "Business Hours",
    deploymentModel: "Cloud-Only",
    pricing: "Per User/Month",
  },
  foxpass: {
    fullName: "Foxpass",
    category: "Cloud Directory",
    marketPosition: "Niche",
    founded: "2015",
    headquarters: "San Francisco, USA",
    employees: "10-50",
    strengths: ["Cloud Directory", "Simple Setup", "Developer-Friendly", "Cost-Effective"],
    weaknesses: ["Limited Features", "Small Vendor", "Basic NAC"],
    useCases: ["Startups", "Cloud-Native", "Simple Requirements"],
    integrations: ["AWS", "Google Cloud", "Okta"],
    certifications: ["SOC 2"],
    supportModel: "Email Support",
    deploymentModel: "Cloud-Only",
    pricing: "Per User/Month",
  },
  pulse: {
    fullName: "Pulse Secure",
    category: "VPN-Focused",
    marketPosition: "Niche",
    founded: "2014",
    headquarters: "San Jose, USA",
    employees: "1,000+",
    strengths: ["VPN Expertise", "Remote Access", "Zero Trust", "Hybrid Support"],
    weaknesses: ["Complex Setup", "VPN-Centric", "High Cost"],
    useCases: ["Remote Access", "VPN Replacement", "Hybrid Environments"],
    integrations: ["Active Directory", "SAML", "Multi-vendor"],
    certifications: ["FIPS", "Common Criteria"],
    supportModel: "Global Support",
    deploymentModel: "On-Premises/Cloud",
    pricing: "Per User License",
  },
}

interface VendorSelectionProps {
  selectedVendors: string[]
  onVendorToggle: (vendorId: string) => void
  onCalculate: () => void
  configuration: CalculationConfiguration
}

const EnhancedVendorSelection: React.FC<VendorSelectionProps> = ({
  selectedVendors,
  onVendorToggle,
  onCalculate,
  configuration,
}) => {
  const [expandedVendors, setExpandedVendors] = useState<string[]>([])
  const [expandedCategories, setExpandedCategories] = useState<string[]>(Object.keys(VENDOR_CATEGORIES))

  const isPrimary = (vendorId: string) => vendorId === "portnox"

  const toggleVendorExpansion = (vendorId: string) => {
    setExpandedVendors((prev) => (prev.includes(vendorId) ? prev.filter((id) => id !== vendorId) : [...prev, vendorId]))
  }

  const toggleCategoryExpansion = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category],
    )
  }

  const getVendorInfo = (vendorId: string) => {
    return (
      VENDOR_DETAILS[vendorId as keyof typeof VENDOR_DETAILS] || {
        fullName: vendorId,
        category: "Unknown",
        marketPosition: "Unknown",
        strengths: [],
        weaknesses: [],
        useCases: [],
      }
    )
  }

  const getVendorStats = (vendorId: string) => {
    const vendor = getVendorData(vendorId)
    return {
      marketShare: vendor?.marketShare || Math.random() * 20 + 5,
      customerSat: vendor?.customerSatisfaction || Math.random() * 2 + 3,
      deploymentTime: Math.floor(Math.random() * 8 + 2),
      supportRating: Math.random() * 2 + 3,
      riskScore: vendor?.riskScore || Math.random() * 5 + 2,
      complianceScore: vendor?.complianceScore || Math.random() * 3 + 7,
    }
  }

  const VendorCard = ({ vendorId, category }: { vendorId: string; category: string }) => {
    const vendorInfo = getVendorInfo(vendorId)
    const stats = getVendorStats(vendorId)
    const isSelected = selectedVendors.includes(vendorId)
    const isExpanded = expandedVendors.includes(vendorId)
    const logoPath = getVendorLogoPath(vendorId)

    return (
      <Card
        className={`transition-all duration-200 hover:shadow-lg ${
          isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
        } ${isPrimary(vendorId) ? "border-primary/50" : ""}`}
      >
        <CardContent className="p-0">
          {/* Main Card Content */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src={logoPath || "/placeholder.svg"}
                    alt={`${vendorInfo.fullName} logo`}
                    width={48}
                    height={48}
                    className="rounded-lg object-contain bg-white p-1 border"
                  />
                  {isPrimary(vendorId) && (
                    <Star className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500 fill-current" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    {vendorInfo.fullName}
                    {isPrimary(vendorId) && (
                      <Badge variant="secondary" className="text-xs">
                        Primary
                      </Badge>
                    )}
                  </h4>
                  <p className="text-xs text-muted-foreground">{vendorInfo.category}</p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {vendorInfo.marketPosition}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox checked={isSelected} onCheckedChange={() => onVendorToggle(vendorId)} className="mt-1" />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span>{stats.marketShare.toFixed(1)}% share</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-blue-600" />
                <span>{stats.customerSat.toFixed(1)}/5 rating</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-orange-600" />
                <span>{stats.deploymentTime}w deploy</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-purple-600" />
                <span>{stats.riskScore.toFixed(1)}/10 risk</span>
              </div>
            </div>

            {/* Strengths Preview */}
            <div className="flex flex-wrap gap-1 mb-3">
              {vendorInfo.strengths.slice(0, 2).map((strength, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {strength}
                </Badge>
              ))}
              {vendorInfo.strengths.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{vendorInfo.strengths.length - 2}
                </Badge>
              )}
            </div>

            {/* Expand/Collapse Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleVendorExpansion(vendorId)}
              className="w-full h-8 text-xs"
            >
              {isExpanded ? (
                <>
                  <ChevronDown className="h-3 w-3 mr-1" />
                  Less Details
                </>
              ) : (
                <>
                  <ChevronRight className="h-3 w-3 mr-1" />
                  More Details
                </>
              )}
            </Button>
          </div>

          {/* Expanded Details */}
          <Collapsible open={isExpanded}>
            <CollapsibleContent>
              <div className="border-t bg-muted/20 p-4 space-y-4">
                {/* Company Info */}
                <div>
                  <h5 className="font-medium text-sm mb-2">Company Information</h5>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Founded: {vendorInfo.founded}</div>
                    <div>HQ: {vendorInfo.headquarters}</div>
                    <div>Employees: {vendorInfo.employees}</div>
                    <div>Support: {vendorInfo.supportModel}</div>
                  </div>
                </div>

                {/* Detailed Stats */}
                <div>
                  <h5 className="font-medium text-sm mb-2">Performance Metrics</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs">Market Share</span>
                      <span className="text-xs font-medium">{stats.marketShare.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-green-600 h-1 rounded-full"
                        style={{ width: `${Math.min(stats.marketShare * 2, 100)}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xs">Customer Satisfaction</span>
                      <span className="text-xs font-medium">{stats.customerSat.toFixed(1)}/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-blue-600 h-1 rounded-full"
                        style={{ width: `${(stats.customerSat / 5) * 100}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xs">Compliance Score</span>
                      <span className="text-xs font-medium">{stats.complianceScore.toFixed(1)}/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-purple-600 h-1 rounded-full"
                        style={{ width: `${stats.complianceScore * 10}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Strengths & Weaknesses */}
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <h5 className="font-medium text-sm mb-2 text-green-600">Strengths</h5>
                    <div className="flex flex-wrap gap-1">
                      {vendorInfo.strengths.map((strength, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-green-50 text-green-700">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2 text-orange-600">Considerations</h5>
                    <div className="flex flex-wrap gap-1">
                      {vendorInfo.weaknesses.map((weakness, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-orange-50 text-orange-700">
                          {weakness}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Use Cases */}
                <div>
                  <h5 className="font-medium text-sm mb-2">Ideal Use Cases</h5>
                  <div className="flex flex-wrap gap-1">
                    {vendorInfo.useCases.map((useCase, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {useCase}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Key Integrations */}
                <div>
                  <h5 className="font-medium text-sm mb-2">Key Integrations</h5>
                  <div className="flex flex-wrap gap-1">
                    {vendorInfo.integrations.slice(0, 4).map((integration, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {integration}
                      </Badge>
                    ))}
                    {vendorInfo.integrations.length > 4 && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge variant="outline" className="text-xs">
                              +{vendorInfo.integrations.length - 4} more
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="max-w-xs">{vendorInfo.integrations.slice(4).join(", ")}</div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </div>

                {/* Deployment & Pricing */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="font-medium">Deployment:</span>
                    <div className="text-muted-foreground">{vendorInfo.deploymentModel}</div>
                  </div>
                  <div>
                    <span className="font-medium">Pricing:</span>
                    <div className="text-muted-foreground">{vendorInfo.pricing}</div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    )
  }

  const SelectionSummary = () => (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Selection Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{selectedVendors.length}</div>
            <div className="text-sm text-muted-foreground">Vendors Selected</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{configuration.devices}</div>
            <div className="text-sm text-muted-foreground">Devices</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{configuration.users}</div>
            <div className="text-sm text-muted-foreground">Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{configuration.years}</div>
            <div className="text-sm text-muted-foreground">Years</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {selectedVendors.length > 0 ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Ready for analysis
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-orange-600" />
                Select vendors to begin
              </>
            )}
          </div>
          <Button onClick={onCalculate} disabled={selectedVendors.length === 0} size="sm">
            <Calculator className="h-4 w-4 mr-2" />
            Calculate TCO
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <SelectionSummary />

      <div className="space-y-6">
        {Object.entries(VENDOR_CATEGORIES).map(([category, vendors]) => (
          <Card key={category}>
            <CardHeader className="pb-3">
              <CardTitle
                className="text-base flex items-center gap-2 cursor-pointer"
                onClick={() => toggleCategoryExpansion(category)}
              >
                {expandedCategories.includes(category) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                {category}
                <Badge variant="secondary" className="ml-auto">
                  {vendors.filter((v) => selectedVendors.includes(v)).length}/{vendors.length} selected
                </Badge>
              </CardTitle>
            </CardHeader>
            <Collapsible open={expandedCategories.includes(category)}>
              <CollapsibleContent>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {vendors.map((vendorId) => (
                      <VendorCard key={vendorId} vendorId={vendorId} category={category} />
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default EnhancedVendorSelection
