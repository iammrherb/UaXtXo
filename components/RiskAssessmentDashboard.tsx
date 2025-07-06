import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { AlertTriangle } from 'lucide-react';

// Risk Assessment Dashboard Component
export function RiskAssessmentDashboard({ industry = 'healthcare', devices = 500 }) {
  const riskScenarios = [
    {
      threat: 'Ransomware Attack',
      withoutNAC: { probability: 28, impact: 4500000, duration: 21 },
      withBasicNAC: { probability: 18, impact: 3200000, duration: 14 },
      withPortnox: { probability: 4, impact: 850000, duration: 3 }
    },
    {
      threat: 'Insider Threat',
      withoutNAC: { probability: 22, impact: 2800000, duration: 45 },
      withBasicNAC: { probability: 15, impact: 2100000, duration: 30 },
      withPortnox: { probability: 5, impact: 450000, duration: 7 }
    },
    {
      threat: 'Supply Chain Compromise',
      withoutNAC: { probability: 18, impact: 3200000, duration: 60 },
      withBasicNAC: { probability: 12, impact: 2400000, duration: 45 },
      withPortnox: { probability: 3, impact: 650000, duration: 14 }
    },
    {
      threat: 'Zero-Day Exploit',
      withoutNAC: { probability: 15, impact: 3800000, duration: 14 },
      withBasicNAC: { probability: 10, impact: 2800000, duration: 10 },
      withPortnox: { probability: 2, impact: 750000, duration: 2 }
    }
  ];

  const annualRiskCost = (scenarios) => {
    return scenarios.reduce((total, scenario) => {
      const cost = (scenario.probability / 100) * scenario.impact;
      return total + cost;
    }, 0);
  };

  const withoutNACRisk = annualRiskCost(riskScenarios.map(s => s.withoutNAC));
  const withBasicNACRisk = annualRiskCost(riskScenarios.map(s => s.withBasicNAC));
  const withPortnoxRisk = annualRiskCost(riskScenarios.map(s => s.withPortnox));

  return (
    <div className="space-y-6">
      {/* Risk Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-red-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Without NAC</CardTitle>
            <CardDescription>Current risk exposure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">${(withoutNACRisk / 1000000).toFixed(1)}M</div>
            <p className="text-sm text-muted-foreground">Annual risk exposure</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Avg breach probability</span>
                <span className="font-medium">21%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Avg recovery time</span>
                <span className="font-medium">35 days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">With Basic NAC</CardTitle>
            <CardDescription>Traditional NAC protection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">${(withBasicNACRisk / 1000000).toFixed(1)}M</div>
            <p className="text-sm text-muted-foreground">Annual risk exposure</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Risk reduction</span>
                <span className="font-medium text-yellow-600">-{Math.round((1 - withBasicNACRisk / withoutNACRisk) * 100)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Avg recovery time</span>
                <span className="font-medium">25 days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">With Portnox CLEAR</CardTitle>
            <CardDescription>Zero Trust NAC protection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">${(withPortnoxRisk / 1000000).toFixed(1)}M</div>
            <p className="text-sm text-muted-foreground">Annual risk exposure</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Risk reduction</span>
                <span className="font-medium text-green-600">-{Math.round((1 - withPortnoxRisk / withoutNACRisk) * 100)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Avg recovery time</span>
                <span className="font-medium">6.5 days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Threat Scenario Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Threat Scenario Impact Analysis</CardTitle>
          <CardDescription>Probability and financial impact by protection level</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={riskScenarios.map(scenario => ({
                threat: scenario.threat,
                'No NAC': (scenario.withoutNAC.probability * scenario.withoutNAC.impact) / 100000,
                'Basic NAC': (scenario.withBasicNAC.probability * scenario.withBasicNAC.impact) / 100000,
                'Portnox': (scenario.withPortnox.probability * scenario.withPortnox.impact) / 100000
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="threat" angle={-15} textAnchor="end" height={80} />
              <YAxis tickFormatter={(value) => `$${value}k`} />
              <RechartsTooltip formatter={(value) => `$${(value * 1000).toLocaleString()}`} />
              <Legend />
              <Bar dataKey="No NAC" fill="#ef4444" />
              <Bar dataKey="Basic NAC" fill="#f59e0b" />
              <Bar dataKey="Portnox" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Security Metrics Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Security Control Effectiveness Heatmap</CardTitle>
          <CardDescription>How different NAC solutions address security controls</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-1"></div>
            <div className="text-center font-medium">No NAC</div>
            <div className="text-center font-medium">Basic NAC</div>
            <div className="text-center font-medium">Portnox</div>

            {[
              { control: 'Identity Verification', scores: [20, 70, 95] },
              { control: 'Device Trust', scores: [10, 65, 92] },
              { control: 'Network Segmentation', scores: [15, 75, 94] },
              { control: 'Threat Detection', scores: [25, 60, 90] },
              { control: 'Automated Response', scores: [5, 50, 91] },
              { control: 'Compliance Monitoring', scores: [30, 70, 93] }
            ].map(({ control, scores }) => (
              <React.Fragment key={control}>
                <div className="text-sm font-medium">{control}</div>
                {scores.map((score, idx) => (
                  <div
                    key={idx}
                    className={`h-16 flex items-center justify-center text-white font-bold rounded ${
                      score >= 90 ? 'bg-green-600' :
                      score >= 70 ? 'bg-yellow-600' :
                      score >= 50 ? 'bg-orange-600' :
                      'bg-red-600'
                    }`}
                  >
                    {score}%
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default RiskAssessmentDashboard;
