import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Tooltip as RechartsTooltip } from 'recharts';
import { AlertTriangle } from 'lucide-react';

// Implementation Complexity Analyzer
export function ImplementationComplexityAnalyzer() {
  const vendors = [
    {
      name: 'Portnox CLEAR',
      complexity: 'Low',
      score: 25,
      timeToValue: 7,
      requiredSkills: ['Basic networking', 'Cloud services'],
      prerequisites: ['Internet connectivity', 'Active Directory'],
      risks: ['Change management', 'User training']
    },
    {
      name: 'Cisco ISE',
      complexity: 'Very High',
      score: 85,
      timeToValue: 90,
      requiredSkills: ['Cisco certification', 'RADIUS expertise', 'PKI knowledge', 'Network architecture'],
      prerequisites: ['Hardware procurement', 'Server infrastructure', 'Database setup', 'Load balancers'],
      risks: ['Downtime during migration', 'Configuration complexity', 'Performance tuning', 'High expertise requirement']
    },
    {
      name: 'Aruba ClearPass',
      complexity: 'High',
      score: 70,
      timeToValue: 60,
      requiredSkills: ['Aruba networking', 'RADIUS', 'PKI basics'],
      prerequisites: ['Hardware/VM infrastructure', 'Database', 'Certificates'],
      risks: ['Complex policy migration', 'Integration challenges', 'Scaling issues']
    },
    {
      name: 'Forescout',
      complexity: 'High',
      score: 75,
      timeToValue: 75,
      requiredSkills: ['Network architecture', 'Security operations', 'OT/IoT knowledge'],
      prerequisites: ['Appliances', 'Span ports', 'Database infrastructure'],
      risks: ['Network redesign needed', 'Performance impact', 'Complex integrations']
    },
    {
      name: 'PacketFence',
      complexity: 'Very High',
      score: 90,
      timeToValue: 120,
      requiredSkills: ['Linux administration', 'Perl programming', 'RADIUS', 'Network engineering'],
      prerequisites: ['Linux servers', 'Open source stack', 'Custom development'],
      risks: ['Limited support', 'Requires deep expertise', 'Customization complexity']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Complexity Score Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Complexity Score</CardTitle>
          <CardDescription>Lower scores indicate easier implementation</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vendors} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={120} />
              <RechartsTooltip />
              <Bar dataKey="score" fill={(entry) => {
                if (entry.score <= 30) return '#10b981';
                if (entry.score <= 50) return '#3b82f6';
                if (entry.score <= 70) return '#f59e0b';
                return '#ef4444';
              }}>
                {vendors.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={
                    entry.score <= 30 ? '#10b981' :
                    entry.score <= 50 ? '#3b82f6' :
                    entry.score <= 70 ? '#f59e0b' :
                    '#ef4444'
                  } />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Time to Value Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Time to Value Analysis</CardTitle>
          <CardDescription>Days until first production deployment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vendors.map(vendor => (
              <div key={vendor.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{vendor.name}</span>
                  <span className="text-sm text-muted-foreground">{vendor.timeToValue} days</span>
                </div>
                <Progress value={(120 - vendor.timeToValue) / 120 * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Implementation Requirements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {vendors.slice(0, 4).map(vendor => (
          <Card key={vendor.name}>
            <CardHeader>
              <CardTitle className="text-lg">{vendor.name}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant={
                  vendor.complexity === 'Low' ? 'success' :
                  vendor.complexity === 'Medium' ? 'default' :
                  vendor.complexity === 'High' ? 'warning' :
                  'destructive'
                }>
                  {vendor.complexity} Complexity
                </Badge>
                <Badge variant="outline">{vendor.timeToValue} days to deploy</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {vendor.requiredSkills.map(skill => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Prerequisites</h4>
                <ul className="text-sm space-y-1">
                  {vendor.prerequisites.map(prereq => (
                    <li key={prereq} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                      {prereq}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Implementation Risks</h4>
                <ul className="text-sm space-y-1">
                  {vendor.risks.map(risk => (
                    <li key={risk} className="flex items-start gap-2">
                      <AlertTriangle className="h-3 w-3 text-yellow-500 mt-0.5" />
                      <span className="text-muted-foreground">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ImplementationComplexityAnalyzer;
