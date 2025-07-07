"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, AlertTriangle, CheckCircle, Target, Zap } from "lucide-react"
import { enhancedVendorDatabase } from "@/lib/vendors/enhanced-vendor-data"

interface ImplementationTimelineViewProps {
  selectedVendors?: string[]
  config?: {
    devices?: number
    users?: number
    locations?: number
    industry?: string
  }
  results?: any[]
}

export default function ImplementationTimelineView({
  selectedVendors = [],
  config = {},
  results = [],
}: ImplementationTimelineViewProps) {
  const [selectedVendor, setSelectedVendor] = useState<string>(selectedVendors[0] || "")

  // Early return if no vendors selected
  if (selectedVendors.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Please select at least one vendor to view implementation timeline analysis.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  // Calculate implementation data for each vendor
  const implementationData = useMemo(() => {
    return selectedVendors
      .map((vendorId) => {
        const vendor = enhancedVendorDatabase[vendorId]
        if (!vendor) return null

        const devices = config.devices || 1000
        const locations = config.locations || 1
        const complexity = devices > 5000 ? "high" : devices > 1000 ? "medium" : "low"

        // Base timeline from vendor data
        const baseTimeline = vendor.implementation?.timeline || {
          planning: 4,
          deployment: 8,
          testing: 4,
          rollout: 6,
        }

        // Adjust timeline based on complexity
        const complexityMultiplier = complexity === "high" ? 1.5 : complexity === "medium" ? 1.2 : 1.0
        const locationMultiplier = Math.max(1, Math.log10(locations) * 0.5 + 1)

        const adjustedTimeline = {
          planning: Math.ceil(baseTimeline.planning * complexityMultiplier),
          deployment: Math.ceil(baseTimeline.deployment * complexityMultiplier * locationMultiplier),
          testing: Math.ceil(baseTimeline.testing * complexityMultiplier),
          rollout: Math.ceil(baseTimeline.rollout * locationMultiplier),
        }

        const totalWeeks = Object.values(adjustedTimeline).reduce((sum, weeks) => sum + weeks, 0)

        return {
          vendorId,
          vendorName: vendor.name,
          category: vendor.category,
          complexity,
          timeline: adjustedTimeline,
          totalWeeks,
          totalMonths: Math.ceil(totalWeeks / 4),
          requirements: vendor.implementation?.requirements || [],
          risks: vendor.implementation?.risks || [],
          resources: vendor.implementation?.resources || {},
          milestones: [
            { phase: "Planning Complete", week: adjustedTimeline.planning },
            {
              phase: "Pilot Deployment",
              week: adjustedTimeline.planning + Math.ceil(adjustedTimeline.deployment * 0.3),
            },
            {
              phase: "Testing Complete",
              week: adjustedTimeline.planning + adjustedTimeline.deployment + adjustedTimeline.testing,
            },
            { phase: "Full Rollout", week: totalWeeks },
          ],
        }
      })
      .filter(Boolean)
  }, [selectedVendors, config])

  const selectedVendorData = implementationData.find((v) => v?.vendorId === selectedVendor) || implementationData[0]

  if (!selectedVendorData) {
    return (
      <div className="flex items-center justify-center h-64">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>No implementation data available for selected vendors.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Implementation Timeline Analysis</h2>
          <p className="text-muted-foreground">Detailed implementation planning and timeline projections</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            {implementationData.map((vendor) => (
              <option key={vendor?.vendorId} value={vendor?.vendorId}>
                {vendor?.vendorName}
              </option>
            ))}
          </select>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Export Timeline
          </Button>
        </div>
      </div>

      {/* Timeline Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Total Duration</p>
                <p className="text-2xl font-bold">{selectedVendorData.totalMonths} months</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Complexity</p>
                <p className="text-2xl font-bold capitalize">{selectedVendorData.complexity}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Team Size</p>
                <p className="text-2xl font-bold">{selectedVendorData.resources.teamSize || "TBD"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Risk Level</p>
                <p className="text-2xl font-bold">
                  {selectedVendorData.risks.length > 3
                    ? "High"
                    : selectedVendorData.risks.length > 1
                      ? "Medium"
                      : "Low"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="timeline" className="space-y-4">
        <TabsList>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="phases">Phase Details</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="risks">Risk Management</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-6">
          {/* Visual Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Implementation Timeline - {selectedVendorData.vendorName}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Timeline visualization */}
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
                  {selectedVendorData.milestones.map((milestone, index) => (
                    <div key={index} className="relative flex items-center space-x-4 pb-8">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{milestone.phase}</h4>
                        <p className="text-sm text-muted-foreground">Week {milestone.week}</p>
                      </div>
                      <Badge variant="outline">{Math.ceil(milestone.week / 4)} months</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Phase Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Phase Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(selectedVendorData.timeline).map(([phase, weeks]) => (
                  <div key={phase}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize">{phase}</span>
                      <span>{weeks} weeks</span>
                    </div>
                    <Progress value={(weeks / selectedVendorData.totalWeeks) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="phases" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(selectedVendorData.timeline).map(([phase, weeks]) => (
              <Card key={phase}>
                <CardHeader>
                  <CardTitle className="capitalize">{phase} Phase</CardTitle>
                  <Badge variant="secondary">{weeks} weeks}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Key activities and deliverables for the {phase} phase.
                    </p>
                    {/* Add phase-specific details here */}
                    <div className="mt-4">
                      <h5 className="font-medium mb-2">Key Activities:</h5>
                      <ul className="text-sm space-y-1">
                        {phase === "planning" && (
                          <>
                            <li>• Requirements gathering</li>
                            <li>• Network assessment</li>
                            <li>• Architecture design</li>
                          </>
                        )}
                        {phase === "deployment" && (
                          <>
                            <li>• Infrastructure setup</li>
                            <li>• Software installation</li>
                            <li>• Initial configuration</li>
                          </>
                        )}
                        {phase === "testing" && (
                          <>
                            <li>• Functional testing</li>
                            <li>• Performance validation</li>
                            <li>• Security verification</li>
                          </>
                        )}
                        {phase === "rollout" && (
                          <>
                            <li>• Phased deployment</li>
                            <li>• User training</li>
                            <li>• Go-live support</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resource Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Team Composition</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Project Manager</span>
                      <span>1 FTE</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Network Engineers</span>
                      <span>{Math.ceil((config.devices || 1000) / 2000)} FTE</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Security Specialists</span>
                      <span>1-2 FTE</span>
                    </div>
                    <div className="flex justify-between">
                      <span>System Administrators</span>
                      <span>1 FTE</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">External Resources</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Vendor Professional Services</span>
                      <span>Recommended</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Training Sessions</span>
                      <span>2-3 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Support Hours</span>
                      <span>40-80 hrs</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Implementation Risks & Mitigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedVendorData.risks.length > 0 ? (
                  selectedVendorData.risks.map((risk: string, index: number) => (
                    <Alert key={index}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{risk}</AlertDescription>
                    </Alert>
                  ))
                ) : (
                  <div className="space-y-4">
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>Network downtime during deployment phases</AlertDescription>
                    </Alert>
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>User adoption and training challenges</AlertDescription>
                    </Alert>
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>Integration complexity with existing systems</AlertDescription>
                    </Alert>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
