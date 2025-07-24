"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts"
import { Shield, AlertTriangle, CheckCircle2, Award } from "lucide-react"
import { motion } from "framer-motion"

interface SecurityRadarChartProps {
  results: any[]
}

export default function SecurityRadarChart({ results }: SecurityRadarChartProps) {
  const radarData = useMemo(() => {
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
        let score = result.risk?.securityScore || 70

        // Adjust scores based on category and vendor capabilities
        if (category === 'Zero Trust') {
          score = result.vendorData?.security?.zero_trust_maturity || score
        } else if (category === 'Compliance') {
          score = result.risk?.complianceScore || score
        } else if (category === 'Threat Detection') {
          if (result.vendorId === 'portnox') score = 95
          else if (result.vendorId === 'forescout') score = 90
          else score = Math.max(60, score - 10)
        } else if (category === 'Monitoring') {
          if (result.vendorData?.vendor?.deployment_type === 'cloud') score += 10
        }

        // CVE penalty
        const cveCount = result.vendorData?.security?.cve_count || 0
        score = Math.max(30, score - cveCount * 0.5)

        dataPoint[result.vendorName] = Math.round(score)
      })

      return dataPoint
    })
  }, [results])

  const securityScores = useMemo(() => {
    return results.map(result => {
      const avgScore = radarData.reduce((sum, category) => 
        sum + (category[result.vendorName] || 0), 0
      ) / radarData.length

      return {
        vendor: result.vendorName,
        vendorId: result.vendorId,
        score: avgScore,
        cveCount: result.vendorData?.security?.cve_count || 0,
        zeroTrustMaturity: result.vendorData?.security?.zero_trust_maturity || 0,
        isPortnox: result.vendorId === 'portnox'
      }
    }).sort((a, b) => b.score - a.score)
  }, [results, radarData])

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
    if (score >= 90) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-50' }
    if (score >= 80) return { level: 'Good', color: 'text-blue-600', bg: 'bg-blue-50' }
    if (score >= 70) return { level: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-50' }
    return { level: 'Poor', color: 'text-red-600', bg: 'bg-red-50' }
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
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
        </div>
      )
    }
    return null
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Shield className="h-6 w-6 text-blue-600" />
          Security Capabilities Assessment
        </CardTitle>
        <CardDescription>
          Multi-dimensional security analysis across key protection areas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Security Rankings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {securityScores.slice(0, 4).map((vendor, index) => {
              const secLevel = getSecurityLevel(vendor.score)
              return (
                <motion.div
                  key={vendor.vendorId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`${secLevel.bg} border-2 ${vendor.isPortnox ? 'border-green-300' : 'border-transparent'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={index === 0 ? "default" : "secondary"}>
                          #{index + 1}
                        </Badge>
                        {vendor.isPortnox && (
                          <Badge className="bg-green-600">
                            <Award className="w-3 h-3 mr-1" />
                            Best
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{vendor.vendor}</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Security Score</span>
                            <span className={secLevel.color}>{vendor.score.toFixed(0)}/100</span>
                          </div>
                          <Progress value={vendor.score} className="h-2" />
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>CVEs:</span>
                          <span className={vendor.cveCount === 0 ? 'text-green-600' : 'text-red-600'}>
                            {vendor.cveCount}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Zero Trust:</span>
                          <span>{vendor.zeroTrustMaturity}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Radar Chart */}
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
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
                    fillOpacity={result.vendorId === 'portnox' ? 0.3 : 0.1}
                    strokeWidth={result.vendorId === 'portnox' ? 3 : 2}
                  />
                ))}
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Security Insights */}
          <div className="space-y-3">
            <h4 className="font-semibold">Security Analysis Insights</h4>
            
            {securityScores[0]?.cveCount === 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800"
              >
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-green-900 dark:text-green-100">
                    Zero CVE Security Leader
                  </h5>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {securityScores[0].vendor} maintains a perfect security record with zero known vulnerabilities,
                    providing the strongest security posture in the market.
                  </p>
                </div>
              </motion.div>
            )}

            {securityScores.some(s => s.cveCount > 20) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800"
              >
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-red-900 dark:text-red-100">
                    High CVE Count Warning
                  </h5>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Some vendors show concerning vulnerability counts. Consider security track record 
                    when making your decision, especially for critical infrastructure.
                  </p>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800"
            >
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-blue-900 dark:text-blue-100">
                  Zero Trust Readiness
                </h5>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Modern security requires Zero Trust architecture. Cloud-native solutions typically 
                  offer superior Zero Trust implementation compared to legacy on-premise systems.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}