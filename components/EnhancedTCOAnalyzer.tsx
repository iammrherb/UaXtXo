import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Cell, Tooltip as RechartsTooltip,
  Area, AreaChart, ComposedChart, PieChart, Pie
} from 'recharts';
import {
  Calculator, TrendingUp, Shield, AlertTriangle, DollarSign, Users, Building,
  Clock, Award, CheckCircle, XCircle, Info, FileText, Download, Eye
} from 'lucide-react';

import { enhancedVendorDatabase, calculateTotalCostOfOwnership, calculateROI } from '@/lib/vendors/enhanced-vendor-data';
import { industryComplianceData, complianceFrameworks } from '@/lib/compliance/industry-compliance-data';


// Main Enhanced TCO Analyzer Component
export default function EnhancedTCOAnalyzer() {
  // State management
  const [selectedIndustry, setSelectedIndustry] = useState('healthcare');
  const [devices, setDevices] = useState(500);
  const [users, setUsers] = useState(1000); // Users state is present, but not directly used in current TCO/ROI from enhanced-vendor-data
  const [projectionYears, setProjectionYears] = useState(3);
  const [hasExistingNAC, setHasExistingNAC] = useState(false);
  const [existingVendor, setExistingVendor] = useState('cisco_ise'); // Not directly used in current TCO/ROI from enhanced-vendor-data
  const [includeCompliance, setIncludeCompliance] = useState(true); // Used to gate some ROI parts
  const [includeRiskReduction, setIncludeRiskReduction] = useState(true); // Used to gate some ROI parts

  // Calculate TCO for all vendors
  const tcoAnalysis = useMemo(() => {
    const results = {};
    Object.entries(enhancedVendorDatabase).forEach(([vendorId, vendor]) => {
      // Ensure vendor object is correctly typed for calculateTotalCostOfOwnership
      const typedVendor = vendor as any; // Cast to any or a more specific type if it matches EnhancedVendorData

      const tcoData = calculateTotalCostOfOwnership(typedVendor, devices, Math.max(projectionYears, 5), hasExistingNAC);
      const roiData = calculateROI(typedVendor, tcoData, devices);

      // Adjust ROI data based on includeCompliance and includeRiskReduction flags
      let adjustedTotalAnnualSavings = roiData.totalSavings;
      if (!includeCompliance) {
        adjustedTotalAnnualSavings -= roiData.complianceSavings;
      }
      if (!includeRiskReduction) {
        adjustedTotalAnnualSavings -= roiData.breachRiskReduction;
      }

      const paybackPeriod = tcoData.year1 > 0 && adjustedTotalAnnualSavings > 0 ? tcoData.year1 / adjustedTotalAnnualSavings : Infinity;

      results[vendorId] = {
        tcoForPeriod: projectionYears === 1 ? tcoData.year1 :
                       projectionYears === 2 ? tcoData.year2 :
                       projectionYears === 3 ? tcoData.year3 :
                       tcoData.year5, // Default to year5 if projectionYears is 5 or other
        year1: tcoData.year1,
        year3: tcoData.year3,
        year5: tcoData.year5,
        roi: {
          breachRiskReduction: includeRiskReduction ? roiData.breachRiskReduction : 0,
          operationalSavings: roiData.operationalSavings, // Operational savings are generally always included
          complianceSavings: includeCompliance ? roiData.complianceSavings : 0,
          totalAnnualSavings: adjustedTotalAnnualSavings,
          paybackPeriod: paybackPeriod,
        }
      };
    });
    return results;
  }, [devices, projectionYears, selectedIndustry, includeCompliance, includeRiskReduction, hasExistingNAC]);


  // Prepare comparison data
  const comparisonData = Object.entries(tcoAnalysis).map(([vendorId, data]) => ({
    vendor: enhancedVendorDatabase[vendorId].name,
    tco: data.tcoForPeriod, // Use TCO for the selected projection period
    year1: data.year1,
    year3: data.year3,
    year5: data.year5,
    roi: data.roi.totalAnnualSavings * projectionYears, // Total savings over the period
    payback: data.roi.paybackPeriod
  }));

  // Zero Trust comparison data
   const zeroTrustRadarData = Object.entries(enhancedVendorDatabase).map(([vendorId, vendor]) => ({
    subject: vendor.name,
    A: vendor.security.zeroTrustScore, // Overall
    B: vendor.security.riskReduction.unauthorized_access / 100 * 100, // Identity focused
    C: vendor.security.riskReduction.lateral_movement / 100 * 100, // Network focused
    D: vendor.operationalMetrics.automationLevel, // Automation
    E: vendor.security.complianceMapping.reduce((acc, cm) => Math.max(acc, cm.coverage), 0) // Compliance focus
  }));
  const zeroTrustRadarAxes = [
    { name: 'Overall ZT', dataKey: 'A'},
    { name: 'Identity Security', dataKey: 'B'},
    { name: 'Network Security', dataKey: 'C'},
    { name: 'Automation', dataKey: 'D'},
    { name: 'Compliance Alignment', dataKey: 'E'}
  ];


  const selectedIndustryFrameworks = industryComplianceData[selectedIndustry]?.frameworks || [];
  const portnoxComplianceData = selectedIndustryFrameworks.map(fw => {
    const vendorFw = enhancedVendorDatabase.portnox.security.complianceMapping.find(vfw => vfw.framework.toLowerCase().includes(fw.id.toLowerCase()));
    return {
      name: fw.name,
      coverage: vendorFw ? vendorFw.coverage : 0,
    };
  });


  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Enhanced TCO & ROI Analyzer</h1>
          <p className="text-muted-foreground">
            Comprehensive NAC vendor comparison with security metrics, compliance mapping, and customizable reporting.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => alert("Report generation feature coming soon!")}>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline" onClick={() => alert("Data export feature coming soon!")}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Configuration Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Analysis Configuration</CardTitle>
          <CardDescription>Set your organization parameters for accurate TCO & ROI analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="industry-select">Industry</Label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger id="industry-select">
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(industryComplianceData).map(industryKey => (
                    <SelectItem key={industryKey} value={industryKey}>
                      {industryKey.charAt(0).toUpperCase() + industryKey.slice(1).replace(/_/g, ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="devices-slider">Number of Devices: {devices.toLocaleString()}</Label>
              <Slider
                id="devices-slider"
                value={[devices]}
                onValueChange={([value]) => setDevices(value)}
                min={100}
                max={10000}
                step={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="users-slider">Number of Users: {users.toLocaleString()}</Label>
              <Slider
                id="users-slider"
                value={[users]}
                onValueChange={([value]) => setUsers(value)}
                min={100}
                max={20000}
                step={100}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="projection-years-select">Projection Period (Years)</Label>
              <Select value={projectionYears.toString()} onValueChange={(v) => setProjectionYears(Number(v))}>
                <SelectTrigger id="projection-years-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Year</SelectItem>
                  <SelectItem value="2">2 Years</SelectItem>
                  <SelectItem value="3">3 Years</SelectItem>
                  <SelectItem value="5">5 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="existing-nac-switch"
                  checked={hasExistingNAC}
                  onCheckedChange={setHasExistingNAC}
                />
                <Label htmlFor="existing-nac-switch">Existing NAC Solution</Label>
              </div>
              {hasExistingNAC && (
                <Select value={existingVendor} onValueChange={setExistingVendor}>
                  <SelectTrigger id="existing-vendor-select">
                    <SelectValue placeholder="Select Existing Vendor"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cisco_ise">Cisco ISE</SelectItem>
                    <SelectItem value="aruba_clearpass">Aruba ClearPass</SelectItem>
                    <SelectItem value="forescout">Forescout</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="include-compliance-switch"
                  checked={includeCompliance}
                  onCheckedChange={setIncludeCompliance}
                />
                <Label htmlFor="include-compliance-switch">Include Compliance Savings</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="include-risk-switch"
                  checked={includeRiskReduction}
                  onCheckedChange={setIncludeRiskReduction}
                />
                <Label htmlFor="include-risk-switch">Include Risk Reduction Benefits</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="tco" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="tco">TCO Analysis</TabsTrigger>
          <TabsTrigger value="security">Security Metrics</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Impact</TabsTrigger>
          <TabsTrigger value="roi">ROI & Benefits</TabsTrigger>
          <TabsTrigger value="migration">Migration Path</TabsTrigger>
        </TabsList>

        <TabsContent value="tco" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Cost of Ownership Comparison ({projectionYears}-Year)</CardTitle>
              <CardDescription>Lower is better. Includes software, hardware (if any), implementation, and operations.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={comparisonData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <YAxis dataKey="vendor" type="category" width={120} />
                  <RechartsTooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="tco" name={`${projectionYears}-Year TCO`} fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
            <Card>
              <CardHeader>
                  <CardTitle>Portnox CLEAR Cost Breakdown ({projectionYears}-Year)</CardTitle>
                  <CardDescription>Estimated breakdown of costs for Portnox CLEAR.</CardDescription>
              </CardHeader>
              <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                      <PieChart>
                          <Pie
                              data={[
                                  { name: 'Software/Subscription', value: (enhancedVendorDatabase.portnox.pricing.perDevice.base * devices * projectionYears), fill: '#0088FE' },
                                  { name: 'Implementation (Year 1)', value: (enhancedVendorDatabase.portnox.pricing.perDevice.base * devices * 0.3), fill: '#00C49F' },
                                  { name: 'Operational Effort', value: (enhancedVendorDatabase.portnox.pricing.perDevice.base * devices * (0.1 + (20 - enhancedVendorDatabase.portnox.operationalMetrics.adminEffort) / 100) * projectionYears), fill: '#FFBB28' },
                                  // Add other cost components if available and relevant
                              ]}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent, value }) => `${name} (${(percent * 100).toFixed(0)}%): $${value.toLocaleString()}`}
                              outerRadius={100}
                              dataKey="value"
                          >
                              {[0,1,2].map((entry, index) => ( <Cell key={`cell-${index}`} /> ))}
                          </Pie>
                          <RechartsTooltip formatter={(value) => `$${value.toLocaleString()}`} />
                          <Legend />
                      </PieChart>
                  </ResponsiveContainer>
              </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Zero Trust Maturity Comparison</CardTitle>
              <CardDescription>Radar chart showing alignment with Zero Trust pillars. Higher scores (closer to outer edge) are better.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={zeroTrustRadarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]}/>
                  {zeroTrustRadarAxes.map(axis => (
                    <Radar key={axis.name} name={axis.name} dataKey={axis.dataKey} stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} fillOpacity={0.6} />
                  ))}
                  <Legend />
                  <RechartsTooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
                <CardTitle>Risk Reduction Potential with Portnox CLEAR</CardTitle>
                <CardDescription>Estimated percentage reduction in key risk areas.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {Object.entries(enhancedVendorDatabase.portnox.security.riskReduction).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                            <Badge variant={value > 80 ? "success" : "warning"}>-{value}%</Badge>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2.5">
                            <div className={`h-2.5 rounded-full ${value > 80 ? "bg-green-500" : "bg-yellow-500"}`} style={{ width: `${value}%` }}></div>
                        </div>
                    </div>
                ))}
                {includeRiskReduction && (
                    <Alert className="mt-4">
                        <Shield className="h-4 w-4" />
                        <AlertDescription>
                            <strong>Estimated Annual Financial Benefit from Risk Reduction:</strong>
                            ${(tcoAnalysis.portnox.roi.breachRiskReduction).toLocaleString()}
                            <br />
                            <span className="text-xs">Based on {selectedIndustry} industry average breach cost and Portnox's reduction capabilities.</span>
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Compliance Framework Coverage for {industryComplianceData[selectedIndustry]?.frameworks.map(f=>f.name).join(', ')}</CardTitle>
                    <CardDescription>Portnox CLEAR's alignment with key controls in selected industry frameworks.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={portnoxComplianceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} label={{ value: 'Coverage %', angle: -90, position: 'insideLeft' }} />
                            <RechartsTooltip />
                            <Legend />
                            <Bar dataKey="coverage" name="Portnox Coverage" fill="#10b981" />
                        </BarChart>
                    </ResponsiveContainer>
                    {includeCompliance && (
                        <Alert className="mt-4">
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription>
                                <strong>Estimated Annual Savings from Enhanced Compliance:</strong>
                                ${(tcoAnalysis.portnox.roi.complianceSavings).toLocaleString()}
                                <br />
                                <span className="text-xs">Includes potential cyber insurance discounts and audit cost reductions for the {selectedIndustry} sector.</span>
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="roi" className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Return on Investment (ROI) Analysis for Portnox CLEAR</CardTitle>
                    <CardDescription>Payback period and cumulative benefits over {projectionYears} years.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
                        <div>
                            <p className="text-sm text-muted-foreground">Estimated Payback Period</p>
                            <p className="text-2xl font-bold">{tcoAnalysis.portnox.roi.paybackPeriod.toFixed(1)} Years</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total {projectionYears}-Year TCO</p>
                            <p className="text-2xl font-bold">${tcoAnalysis.portnox.tcoForPeriod.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total {projectionYears}-Year Benefits</p>
                            <p className="text-2xl font-bold text-green-600">${(tcoAnalysis.portnox.roi.totalAnnualSavings * projectionYears).toLocaleString()}</p>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={350}>
                        <ComposedChart data={
                            Array.from({ length: projectionYears + 1 }, (_, i) => {
                                const year = i;
                                const investment = year === 0 ? 0 : year === 1 ? tcoAnalysis.portnox.year1 : tcoAnalysis.portnox.year1 + (calculateCumulativeTCO(enhancedVendorDatabase.portnox, devices, year) - tcoAnalysis.portnox.year1);
                                const returns = tcoAnalysis.portnox.roi.totalAnnualSavings * year;
                                return {
                                    year: `Year ${year}`,
                                    investment: -investment, // Negative for cost
                                    returns: returns,
                                    cumulativeNet: returns - investment
                                };
                            })
                        }>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                            <RechartsTooltip formatter={(value, name) => [`$${value.toLocaleString()}`, name]} />
                            <Legend />
                            <Bar dataKey="investment" fill="#ef4444" name="Cumulative Investment" />
                            <Bar dataKey="returns" fill="#10b981" name="Cumulative Benefits" />
                            <Line type="monotone" dataKey="cumulativeNet" stroke="#3b82f6" strokeWidth={3} name="Cumulative Net Value" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="migration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Migration Path to Portnox CLEAR</CardTitle>
              <CardDescription>From {hasExistingNAC ? (enhancedVendorDatabase[existingVendor]?.name || 'Existing NAC') : 'No Current NAC'}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="mb-4">Portnox CLEAR offers a streamlined migration process, adaptable whether you have an existing NAC or are implementing NAC for the first time. Our cloud-native architecture minimizes disruption and hardware overhead.</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Phase 1: Discovery & Planning (1-2 Weeks):</strong> Comprehensive assessment of your current network, security policies, and integration points. Definition of success criteria and migration milestones.</li>
                    <li><strong>Phase 2: Portnox CLEAR Setup & Initial Configuration (1 Week):</strong> Cloud tenant provisioning. Configuration of core policies based on discovery. Setup of key integrations (Identity Provider, SIEM).</li>
                    <li><strong>Phase 3: Pilot Deployment (1-2 Weeks):</strong> Rollout to a representative pilot group (e.g., IT department, one office location). Monitoring, feedback collection, and policy refinement.</li>
                    <li><strong>Phase 4: Phased Rollout (2-6 Weeks, scalable):</strong> Iterative expansion to remaining users/devices. {hasExistingNAC ? `Parallel operation with ${enhancedVendorDatabase[existingVendor]?.name || 'legacy NAC'}, gradually shifting enforcement.` : `Gradual enforcement of policies.`}</li>
                    <li><strong>Phase 5: Full Cutover & Optimization (1 Week):</strong> Decommissioning of legacy systems (if applicable). Final policy tuning and performance optimization. Handover to operations team with full documentation.</li>
                </ul>
                <Alert className="mt-6">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                        <strong>Key Migration Advantages with Portnox:</strong>
                        <ul className="list-disc pl-5 mt-2">
                            <li>Cloud-native: No on-premise hardware installation for core NAC functionality.</li>
                            <li>Agentless option for broad visibility from day one.</li>
                            <li>Flexible policy engine for replicating and enhancing existing rules.</li>
                            <li>Dedicated migration support and professional services available.</li>
                            {hasExistingNAC && `Specific runbooks for migrating from ${enhancedVendorDatabase[existingVendor]?.name || 'common NAC solutions'} can reduce complexity.`}
                        </ul>
                    </AlertDescription>
                </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-2 border-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-green-500" />
            Executive Summary: Why Portnox CLEAR
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600">
                {tcoAnalysis.cisco_ise && tcoAnalysis.portnox ?
                  `${Math.round((1 - tcoAnalysis.portnox.tcoForPeriod / tcoAnalysis.cisco_ise.tcoForPeriod) * 100)}%`
                  : 'N/A'
                }
              </div>
              <p className="text-sm text-muted-foreground">Lower {projectionYears}-Yr TCO vs Cisco ISE</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">{tcoAnalysis.portnox.roi.paybackPeriod.toFixed(1)} yrs</div>
              <p className="text-sm text-muted-foreground">Payback Period</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">{enhancedVendorDatabase.portnox.security.zeroTrustScore}%</div>
              <p className="text-sm text-muted-foreground">Zero Trust Score</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">
                 {tcoAnalysis.portnox.roi.totalAnnualSavings > 0 && tcoAnalysis.portnox.tcoForPeriod > 0 ?
                    `${Math.round(((tcoAnalysis.portnox.roi.totalAnnualSavings * projectionYears - tcoAnalysis.portnox.tcoForPeriod) / tcoAnalysis.portnox.tcoForPeriod) * 100)}%`
                    : 'N/A'
                 }
              </div>
              <p className="text-sm text-muted-foreground">{projectionYears}-Year ROI</p>
            </div>
          </div>
           <p className="mt-4 text-sm text-muted-foreground">
             Portnox CLEAR offers a compelling value proposition with significantly lower TCO, rapid payback, and superior Zero Trust capabilities.
             Its cloud-native architecture simplifies deployment and management, leading to substantial operational and compliance savings.
             The customizable report generation will further empower strategic decision-making.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
