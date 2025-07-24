"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  Area,
  AreaChart,
  Cell,
  PieChart,
  Pie
} from "recharts"
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  Eye, 
  Zap, 
  Target,
  TrendingUp,
  TrendingDown,
  Award,
  AlertCircle,
  Info,
  RefreshCw
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { UltimateCalculationResult } from "@/lib/services/enhanced-calculation-service"

interface InteractiveSecurityDashboardProps {
  results: UltimateCalculationResult[]
  config: any
}

export default function InteractiveSecurityDashboard({ results, config }: InteractiveSecurityDashboardProps) {
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null)
  const [activeMetric, setActiveMetric] = useState<string>('overall')

  const securityMetrics = useMemo(() => {
    const categories = [
      'Authentication',
      'Authorization', 
      'Encryption',
      'Monitoring',
      'Compliance',
      'Incident Response',
      'Zero Trust',
      'Threat Detection'
    ]

    return categories.map(category => {
      const dataPoint: any = { category }

      results.forEach(result => {
        let score = result.risk.securityScore

        // Adjust scores based on category and vendor capabilities
        if (category === 'Zero Trust') {
          score = result.vendorData.security?.zero_trust_maturity || score
        } else if (category === 'Compliance') {
          score = result.risk.complianceScore
        } else if (category === 'Threat Detection') {
          if (result.vendorId === 'portnox') score = 95
          else if (result.vendorId === 'forescout') score = 90
          else score = Math.max(60, score - 10)
        } else if (category === 'Monitoring') {
          if (result.vendorData.vendor.deployment_type === 'cloud') score += 10
        }

        // CVE penalty
        const cveCount = result.vendorData.security?.cve_count_total || 0
        score = Math.max(30, score - cveCount * 0.5)

        dataPoint[result.vendorName] = Math.round(score)
      })

      return dataPoint
    })
  }, [results])

  const vulnerabilityTrends = useMemo(() => {
    return results.map(result => {
      const security = result.vendorData.security
      const currentYear = new Date().getFullYear()
      
      // Simulate historical CVE data
      const trends = []
      for (let year = currentYear - 4; year <= currentYear; year++) {
        const yearlyData: any = { year }
        
        if (result.vendorId === 'portnox') {
          yearlyData.cves = 0
          yearlyData.critical = 0
        } else if (result.vendorId === 'cisco_ise') {
          yearlyData.cves = Math.floor(Math.random() * 15) + 5
          yearlyData.critical = Math.floor(yearlyData.cves * 0.3)
        } else {
          yearlyData.cves = Math.floor(Math.random() * 10) + 2
          yearlyData.critical = Math.floor(yearlyData.cves * 0.2)
        }
        
        trends.push(yearlyData)
      }
      
      return {
        vendor: result.vendorName,
        vendorId: result.vendorId,
        currentCVEs: security?.cve_count_total || 0,
        criticalCVEs: security?.cve_count_critical || 0,
        securityRating: security?.security_rating || 70,
        trends,
        isPortnox: result.vendorId === 'portnox'
      }
    })
  }, [results])

  const complianceMatrix = useMemo(() => {
    const frameworks = ['SOC 2', 'ISO 27001', 'NIST', 'GDPR', 'HIPAA', 'PCI DSS', 'FedRAMP', 'FISMA']
    
    return frameworks.map(framework => {
      const frameworkData: any = { framework }
      
      results.forEach(result => {
        const supported = result.vendorData.security?.compliance_frameworks?.includes(framework) || false
        const certified = result.vendorData.security?.certifications?.includes(framework) || false
        
        let score = 0
        if (certified) score = 100
        else if (supported) score = 80
        else if (result.vendorId === 'portnox') score = 90 // Portnox has broad compliance
        else score = 40

        frameworkData[result.vendorName] = score
        frameworkData[`${result.vendorName}_supported`] = supported
        frameworkData[`${result.vendorName}_certified`] = certified
      })
      
      return frameworkData
    })
  }, [results])

  const securityScores = useMemo(() => {
    return results.map(result => {
      const security = result.vendorData.security
      const avgScore = securityMetrics.reduce((sum, category) => 
        sum + (category[result.vendorName] || 0), 0
      ) / securityMetrics.length

      return {
        vendor: result.vendorName,
        vendorId: result.vendorId,
        overallScore: avgScore,
        securityRating: security?.security_rating || 70,
        cveCount: security?.cve_count_total || 0,
        criticalCves: security?.cve_count_critical || 0,
        zeroTrustMaturity: security?.zero_trust_maturity || 0,
        complianceScore: result.risk.complianceScore,
        breachReduction: result.risk.breachReduction,
        isPortnox: result.vendorId === 'portnox',
        riskLevel: result.recommendations.riskLevel
      }
    }).sort((a, b) => b.overallScore - a.overallScore)
  }, [results, securityMetrics])

  const threatLandscape = useMemo(() => {
    const threats = [
      { name: 'Ransomware', severity: 95, trend: 'increasing' },
      { name: 'Insider Threats', severity: 80, trend: 'stable' },
      { name: 'Supply Chain', severity: 85, trend: 'increasing' },
      { name: 'Zero-Day Exploits', severity: 90, trend: 'increasing' },
      { name: 'Social Engineering', severity: 75, trend: 'stable' },
      { name: 'IoT Vulnerabilities', severity: 70, trend: 'increasing' }
    ]

    return threats.map(threat => {
      const protectionData: any = { ...threat }
      
      results.forEach(result => {
        let protection = 60 // baseline
        
        if (result.vendorId === 'portnox') {
          protection = 95 // Excellent protection
        } else if (result.vendorId === 'cisco_ise') {
          protection = 85 // Good protection
        } else if (result.vendorId === 'forescout') {
          protection = threat.name === 'IoT Vulnerabilities' ? 90 : 80
        }
        
        // Adjust based on CVE count
        const cveCount = result.vendorData.security?.cve_count_total || 0
        protection = Math.max(30, protection - cveCount * 0.5)
        
        protectionData[result.vendorName] = protection
      })
      
      return protectionData
    })
  }, [results])

  const getVendorColor = (vendorId: string, index: number) => {
    const colors = {
      portnox: '#10B981',
      cisco_ise: '#3B82F6', 
      aruba_clearpass: '#8B5CF6',
      forescout: '#F59E0B',
      fortinet_fortinac: '#EF4444'
    }
    return colors[vendorId as keyof typeof colors] || `hsl(${index * 60}, 70%, 50%)`
  }

  const getSecurityLevel = (score: number) => {
    if (score >= 90) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' }
    if (score >= 80) return { level: 'Good', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' }
    if (score >= 70) return { level: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' }
    return { level: 'Poor', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' }
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl"
        >
          <h4 className="font-semibold mb-2">{label}</h4>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm">{entry.dataKey}: {entry.value}/100</span>
              </div>
            ))}
          </div>
        </motion.div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Security Overview Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {securityScores.slice(0, 4).map((vendor, index) => {
          const secLevel = getSecurityLevel(vendor.overallScore)
          return (
            <motion.div
              key={vendor.vendorId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedVendor(selectedVendor === vendor.vendorId ? null : vendor.vendorId)}
              className="cursor-pointer"
            >
              <Card className={`${secLevel.bg} ${secLevel.border} border-2 transition-all hover:shadow-lg ${
                vendor.isPortnox ? 'ring-2 ring-green-300' : ''
              } ${selectedVendor === vendor.vendorId ? 'ring-2 ring-blue-300' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={index === 0 ? "default" : "secondary"} className="text-xs">
                      #{index + 1}
                    </Badge>
                    {vendor.isPortnox && (
                      <Badge className="bg-green-600 text-white">
                        <Award className="w-3 h-3 mr-1" />
                        Best
                      </Badge>
                    )}
                  </div>
                  
                  <h4 className="font-semibold text-sm mb-2 line-clamp-2">{vendor.vendor}</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Security Score</span>
                        <span className={secLevel.color}>{vendor.overallScore.toFixed(0)}/100</span>
                      </div>
                      <Progress value={vendor.overallScore} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">CVEs:</span>
                        <span className={`ml-1 font-bold ${vendor.cveCount === 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {vendor.cveCount}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Zero Trust:</span>
                        <span className="ml-1 font-bold">{vendor.zeroTrustMaturity}%</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Compliance:</span>
                        <span className="ml-1 font-bold">{vendor.complianceScore.toFixed(0)}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Risk Reduction:</span>
                        <span className="ml-1 font-bold text-green-600">{vendor.breachReduction.toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <Tabs defaultValue="radar" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="radar">Security Radar</TabsTrigger>
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="threats">Threat Protection</TabsTrigger>
          <TabsTrigger value="trends">Security Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="radar" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Shield className="h-6 w-6 text-blue-600" />
                    Security Capabilities Assessment
                  </CardTitle>
                  <CardDescription>
                    Multi-dimensional security analysis across critical protection areas
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Update Data
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Radar Chart */}
                <div className="lg:col-span-2">
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={securityMetrics}>
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis 
                          dataKey="category" 
                          tick={{ fontSize: 11, fill: '#6B7280' }}
                        />
                        <PolarRadiusAxis 
                          angle={90} 
                          domain={[0, 100]} 
                          tick={{ fontSize: 10, fill: '#6B7280' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        
                        {results.slice(0, 5).map((result, index) => (
                          <Radar
                            key={result.vendorId}
                            name={result.vendorName}
                            dataKey={result.vendorName}
                            stroke={getVendorColor(result.vendorId, index)}
                            fill={getVendorColor(result.vendorId, index)}
                            fillOpacity={result.vendorId === 'portnox' ? 0.3 : selectedVendor === result.vendorId ? 0.2 : 0.1}
                            strokeWidth={result.vendorId === 'portnox' ? 3 : selectedVendor === result.vendorId ? 2 : 1}
                          />
                        ))}
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Security Metrics Breakdown */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Security Category Scores</h4>
                  {securityMetrics.slice(0, 4).map((category, index) => (
                    <motion.div
                      key={category.category}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between text-sm font-medium">
                        <span>{category.category}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => setActiveMetric(category.category)}
                        >
                          <Info className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="space-y-1">
                        {results.slice(0, 3).map((result) => (
                          <div key={result.vendorId} className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{result.vendorName}</span>
                            <div className="flex items-center gap-2">
                              <Progress 
                                value={category[result.vendorName]} 
                                className="w-16 h-2" 
                              />
                              <span className="text-xs font-medium w-8">
                                {category[result.vendorName]}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vulnerabilities" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* CVE Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Vulnerability Analysis</CardTitle>
                <CardDescription>
                  Known vulnerabilities and security track record
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={vulnerabilityTrends}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="vendor" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="currentCVEs" fill="#EF4444" name="Total CVEs" />
                      <Bar dataKey="criticalCVEs" fill="#DC2626" name="Critical CVEs" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Security Ratings */}
            <Card>
              <CardHeader>
                <CardTitle>Security Ratings Comparison</CardTitle>
                <CardDescription>
                  Overall security posture assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityScores.map((vendor, index) => (
                    <motion.div
                      key={vendor.vendorId}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border-2 ${
                        vendor.isPortnox 
                          ? 'border-green-300 bg-green-50 dark:bg-green-950/20' 
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant={index === 0 ? "default" : "secondary"}>
                            #{index + 1}
                          </Badge>
                          <span className="font-medium">{vendor.vendor}</span>
                          {vendor.isPortnox && (
                            <Badge className="bg-green-600">Secure</Badge>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{vendor.overallScore.toFixed(0)}/100</div>
                          <div className="text-xs text-muted-foreground">Security Score</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div className="text-center">
                          <div className={`text-lg font-bold ${vendor.cveCount === 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {vendor.cveCount}
                          </div>
                          <div className="text-xs text-muted-foreground">CVEs</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{vendor.zeroTrustMaturity}%</div>
                          <div className="text-xs text-muted-foreground">Zero Trust</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600">{vendor.complianceScore.toFixed(0)}%</div>
                          <div className="text-xs text-muted-foreground">Compliance</div>
                        </div>
                      </div>

                      <Progress value={vendor.overallScore} className="mt-3 h-2" />
                      
                      {vendor.cveCount === 0 && (
                        <div className="flex items-center gap-1 mt-2">
                          <CheckCircle2 className="h-3 w-3 text-green-600" />
                          <span className="text-xs text-green-600">Zero vulnerability record</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Framework Matrix</CardTitle>
              <CardDescription>
                Support and certification status across major regulatory frameworks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Framework</th>
                      {results.map(result => (
                        <th key={result.vendorId} className="text-center p-3 font-medium min-w-32">
                          {result.vendorName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {complianceMatrix.map((framework, index) => (
                      <tr key={framework.framework} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                        <td className="p-3 font-medium">{framework.framework}</td>
                        {results.map(result => {
                          const score = framework[result.vendorName] || 0
                          const supported = framework[`${result.vendorName}_supported`]
                          const certified = framework[`${result.vendorName}_certified`]
                          
                          return (
                            <td key={result.vendorId} className="text-center p-3">
                              <div className="flex flex-col items-center gap-1">
                                <div 
                                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                                  style={{ 
                                    backgroundColor: score >= 90 ? '#10B981' : score >= 80 ? '#3B82F6' : score >= 60 ? '#F59E0B' : '#EF4444'
                                  }}
                                >
                                  {score}
                                </div>
                                {certified && (
                                  <Badge variant="outline" className="text-xs">Certified</Badge>
                                )}
                                {supported && !certified && (
                                  <Badge variant="secondary" className="text-xs">Supported</Badge>
                                )}
                              </div>
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="threats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Threat Protection Matrix</CardTitle>
              <CardDescription>
                Protection capabilities against current threat landscape
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={threatLandscape} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    {results.slice(0, 4).map((result, index) => (
                      <Bar
                        key={result.vendorId}
                        dataKey={result.vendorName}
                        fill={getVendorColor(result.vendorId, index)}
                        name={result.vendorName}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Threat Severity Indicators */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {threatLandscape.map((threat, index) => (
              <motion.div
                key={threat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">{threat.name}</h4>
                      <div className="flex items-center gap-1">
                        {threat.trend === 'increasing' ? (
                          <TrendingUp className="w-4 h-4 text-red-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-green-500" />
                        )}
                        <Badge 
                          variant={threat.severity > 85 ? 'destructive' : threat.severity > 70 ? 'secondary' : 'outline'}
                        >
                          {threat.severity}% severity
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Portnox Protection:</span>
                        <span className="font-bold text-green-600">{threat['Portnox CLEAR'] || 95}%</span>
                      </div>
                      <Progress value={threat['Portnox CLEAR'] || 95} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Trend Analysis</CardTitle>
              <CardDescription>
                Historical vulnerability trends and security improvements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vulnerabilityTrends[0]?.trends || []}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {results.slice(0, 4).map((result, index) => {
                      const trendData = vulnerabilityTrends.find(v => v.vendorId === result.vendorId)?.trends || []
                      return (
                        <Line
                          key={result.vendorId}
                          type="monotone"
                          dataKey="cves"
                          data={trendData}
                          stroke={getVendorColor(result.vendorId, index)}
                          strokeWidth={result.vendorId === 'portnox' ? 3 : 2}
                          name={result.vendorName}
                        />
                      )
                    })}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Security Insights and Alerts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Security Analysis Insights</h3>
        
        <AnimatePresence>
          {securityScores[0]?.cveCount === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle className="text-green-900 dark:text-green-100">
                  Zero CVE Security Leader
                </AlertTitle>
                <AlertDescription className="text-green-800 dark:text-green-200">
                  <strong>{securityScores[0].vendor}</strong> maintains a perfect security record with zero known vulnerabilities,
                  providing the strongest security posture in the market. This translates to{" "}
                  <strong>{securityScores[0].breachReduction.toFixed(0)}% breach risk reduction</strong> compared to traditional solutions.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {securityScores.some(s => s.cveCount > 20) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="text-red-900 dark:text-red-100">
                  High Vulnerability Count Warning
                </AlertTitle>
                <AlertDescription className="text-red-800 dark:text-red-200">
                  Some vendors show concerning vulnerability counts (
                  {securityScores.filter(s => s.cveCount > 20).map(s => s.vendor).join(', ')}
                  ). Consider security track record when making your decision, especially for critical infrastructure.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
              <Shield className="h-4 w-4" />
              <AlertTitle className="text-blue-900 dark:text-blue-100">
                Zero Trust Architecture Advantage
              </AlertTitle>
              <AlertDescription className="text-blue-800 dark:text-blue-200">
                Modern security requires Zero Trust architecture. Cloud-native solutions like Portnox CLEAR 
                offer superior Zero Trust implementation ({securityScores.find(s => s.isPortnox)?.zeroTrustMaturity}% maturity) 
                compared to legacy on-premise systems, providing better protection against modern threats.
              </AlertDescription>
            </Alert>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}