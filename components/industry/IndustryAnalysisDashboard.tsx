"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Building2 } from "lucide-react"
import { INDUSTRIES, INDUSTRY_ROI } from "@/lib/vendors/comprehensive-vendor-data"

interface IndustryAnalysisProps {
  selectedIndustry?: string
  deviceCount?: number
  timeframe?: number
}

export function IndustryAnalysisDashboard({
  selectedIndustry = 'HEALTHCARE',
  deviceCount = 500,
  timeframe = 3
}: IndustryAnalysisProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [comparisonIndustry, setComparisonIndustry] = useState('FINANCIAL')

  const industryData = INDUSTRIES[selectedIndustry]
  const industryROI = INDUSTRY_ROI[selectedIndustry]
  const comparisonData = INDUSTRIES[comparisonIndustry]
  const comparisonROI = INDUSTRY_ROI[comparisonIndustry]

  // Industry-specific threat landscape
  const threatLandscape = useMemo(() => {
    const threats = {
      HEALTHCARE: [
        { threat: 'Ransomware', frequency: 85, impact: 'Critical', trend: 'Increasing' },
        { threat: 'Medical Device Attacks', frequency: 65, impact: 'High', trend: 'Increasing' },
        { threat: 'Insider Threats', frequency: 45, impact: 'High', trend: 'Stable' },
        { threat: 'Supply Chain', frequency: 35, impact: 'Medium', trend: 'Increasing' },
        { threat: 'IoT Vulnerabilities', frequency: 75, impact: 'High', trend: 'Increasing' }
      ],
      FINANCIAL: [
        { threat: 'APT Groups', frequency: 90, impact: 'Critical', trend: 'Increasing' },
        { threat: 'Fraud Networks', frequency: 80, impact: 'Critical', trend: 'Stable' },
        { threat: 'Insider Trading', frequency: 25, impact: 'High', trend: 'Stable' },
        { threat: 'DDoS Attacks', frequency: 70, impact: 'Medium', trend: 'Increasing' },
        { threat: 'Mobile Banking', frequency: 60, impact: 'High', trend: 'Increasing' }
      ],
      MANUFACTURING: [
        { threat: 'Industrial Espionage', frequency: 70, impact: 'Critical', trend: 'Increasing' },
        { threat: 'OT/IT Convergence', frequency: 85, impact: 'High', trend: 'Increasing' },
        { threat: 'Supply Chain', frequency: 65, impact: 'High', trend: 'Increasing' },
        { threat: 'Ransomware', frequency: 75, impact: 'Critical', trend: 'Increasing' },
        { threat: 'IP Theft', frequency: 55, impact: 'Critical', trend: 'Stable' }
      ]
    }
    return threats[selectedIndustry] || threats.HEALTHCARE
  }, [selectedIndustry])

  // Compliance requirements mapping
  const complianceRequirements = useMemo(() => {
    const requirements = {
      HEALTHCARE: [
        { framework: 'HIPAA', coverage: 98, criticality: 'Critical', portnoxSupport: 'Full' },
        { framework: 'HITECH', coverage: 95, criticality: 'High', portnoxSupport: 'Full' },
        { framework: 'FDA 21 CFR Part 11', coverage: 90, criticality: 'High', portnoxSupport: 'Partial' },
        { framework: 'SOC 2', coverage: 100, criticality: 'Medium', portnoxSupport: 'Full' },
        { framework: 'ISO 27001', coverage: 92, criticality: 'Medium', portnoxSupport: 'Full' }
      ],
      FINANCIAL: [
        { framework: 'PCI-DSS', coverage: 96, criticality: 'Critical', portnoxSupport: 'Full' },
        { framework: 'SOX', coverage: 94, criticality: 'Critical', portnoxSupport: 'Full' },
        { framework: 'GLBA', coverage: 88, criticality: 'High', portnoxSupport: 'Partial' },
        { framework: 'BASEL III', coverage: 85, criticality: 'High', portnoxSupport: 'Partial' },
        { framework: 'FINRA', coverage: 90, criticality: 'Medium', portnoxSupport: 'Full' }
      ],
      MANUFACTURING: [
        { framework: 'NIST 800-171', coverage: 92, criticality: 'Critical', portnoxSupport: 'Full' },
        { framework: 'ISO 27001', coverage: 95, criticality: 'High', portnoxSupport: 'Full' },
        { framework: 'CIS Controls', coverage: 88, criticality: 'High', portnoxSupport: 'Full' },
        { framework: 'ITAR', coverage: 75, criticality: 'Medium', portnoxSupport: 'Partial' },
        { framework: 'Export Controls', coverage: 70, criticality: 'Medium', portnoxSupport: 'Partial' }
      ]
    }
    return requirements[selectedIndustry] || requirements.HEALTHCARE
  }, [selectedIndustry])

  // Industry benchmarks
  const industryBenchmarks = useMemo(() => {
    return {
      avgBreachCost: industryData.avgBreachCost,
      avgDowntime: selectedIndustry === 'HEALTHCARE' ? 48 : selectedIndustry === 'FINANCIAL' ? 24 : 72,
      complianceCost: selectedIndustry === 'HEALTHCARE' ? 850000 : selectedIndustry === 'FINANCIAL' ? 1200000 : 650000,
      securitySpend: deviceCount * (selectedIndustry === 'HEALTHCARE' ? 180 : selectedIndustry === 'FINANCIAL' ? 220 : 150),
      nacAdoptionRate: selectedIndustry === 'HEALTHCARE' ? 65 : selectedIndustry === 'FINANCIAL' ? 85 : 45
    }
  }, [selectedIndustry, deviceCount, industryData])

  // ROI comparison chart data
  const roiComparisonData = [
    {
      category: 'Breach Prevention',
      current: industryBenchmarks.avgBreachCost * 0.05,
      withPortnox: industryBenchmarks.avgBreachCost * 0.05 * 0.08,
      savings: industryBenchmarks.avgBreachCost * 0.05 * 0.92
    },
    {
      category: 'Compliance Costs',
      current: industryBenchmarks.complianceCost,
      withPortnox: industryBenchmarks.complianceCost * 0.3,
      savings: industryBenchmarks.complianceCost * 0.7
    },
    {
      category: 'Operational Overhead',
      current: 250000,
      withPortnox: 50000,
      savings: 200000
    },
    {
      category: 'Downtime Costs',
      current: industryBenchmarks.avgDowntime * 10000,
      withPortnox: industryBenchmarks.avgDowntime * 10000 * 0.1,
      savings: industryBenchmarks.avgDowntime * 10000 * 0.9
    }
  ]

  // Industry-specific use cases
  const useCases = useMemo(() => {
    const cases = {
      HEALTHCARE: [
        {
          title: 'Medical Device Security',
          description: 'Secure IoMT devices without disrupting patient care',
          benefit: 'Prevent device-based attacks, ensure FDA compliance',
          roi: '$2.1M annual risk reduction'
        },
        {
          title: 'BYOD for Clinicians',
          description: 'Enable secure mobile access for healthcare workers',
          benefit: 'Improve care delivery, maintain HIPAA compliance',
          roi: '25% productivity increase'
        },
        {
          title: 'Guest Network Security',
          description: 'Secure patient and visitor Wi-Fi access',
          benefit: 'Isolate guest traffic, prevent lateral movement',
          roi: '90% reduction in guest-related incidents'
        }
      ],
      FINANCIAL: [
        {
          title: 'Trading Floor Security',
          description: 'Ultra-low latency access control for trading systems',
          benefit: 'Maintain market access, prevent insider trading',
          roi: '$5.2M annual compliance savings'
        },
        {
          title: 'Branch Office NAC',
          description: 'Centralized security for distributed locations',
          benefit: 'Consistent policy, reduced management overhead',
          roi: '60% reduction in branch IT costs'
        },
        {
          title: 'Customer Data Protection',
          description: 'Segment and protect sensitive financial data',
          benefit: 'PCI-DSS compliance, breach prevention',
          roi: '$3.8M breach risk reduction'
        }
      ],
      MANUFACTURING: [
        {
          title: 'OT/IT Convergence',
          description: 'Secure industrial control systems',
          benefit: 'Prevent production disruption, protect IP',
          roi: '$4.5M production continuity value'
        },
        {
          title: 'Supply Chain Security',
          description: 'Secure vendor and partner access',
          benefit: 'Prevent supply chain attacks, ensure quality',
          roi: '85% reduction in vendor-related incidents'
        },
        {
          title: 'Remote Monitoring',
          description: 'Secure remote access to manufacturing systems',
          benefit: 'Enable predictive maintenance, reduce downtime',
          roi: '30% reduction in unplanned downtime'
        }
      ]
    }
    return cases[selectedIndustry] || cases.HEALTHCARE
  }, [selectedIndustry])

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
    return `$${value.toFixed(0)}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-600" />
            {industryData.name} Industry Analysis
          </CardTitle>
          <CardDescription>
            Comprehensive security and compliance analysis for {deviceCount} devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(industryData.avgBreachCost)}
              </div>
              <p className="text-sm text-muted-foreground">Avg Breach Cost</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {industryData.riskProfile}
              </div>
              <p className="text-sm text-muted-foreground">Risk Profile</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {industryData.regulations.length}
              </div>
              <p className="text-sm text-muted-foreground">Key Regulations</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {industryROI ? `${industryROI.threeYearROI}%` : 'N/A'}
              </div>
              <p className="text-sm text-muted-foreground">Portnox ROI</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview">Industry Overview</TabsTrigger>
          <TabsTrigger value="threats">Threat Landscape</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="usecases">Use Cases</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
        </TabsList>

        {/* Industry Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Industry characteristics */}
            <Card>
              <CardHeader>
                <CardTitle>Industry Characteristics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Risk Profile</span>
                    <Badge variant={industryData.riskProfile === 'CRITICAL' ? 'destructive' : 
                                   industryData.riskProfile === 'HIGH' ? 'secondary' : 'default'}>
                      {industryData.riskProfile}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Breach Cost</span>
                    <span className="font-bold text-red-600">{formatCurrency(industryData.avgBreachCost)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>NAC Adoption Rate</span>
                    <span className="font-medium">{industryBenchmarks.nacAdoptionRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Avg Security Spend/Device</span>
                    <span className="font-medium">${(industryBenchmarks.securitySpend / deviceCount).toFixed(0)}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-semibold">Key Regulations</h4>
                  <div className="flex flex-wrap gap-1">
                    {industryData.regulations.map(reg => (
                      <Badge key={reg} variant="outline" className="text-xs">
                        {reg}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Specific Requirements</h4>
                  <div className="space-y-\
