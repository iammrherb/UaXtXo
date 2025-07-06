import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { TrendingUp } from 'lucide-react';

// Scalability Analysis Component
export function ScalabilityAnalysis() {
  const scalabilityData = [
    { devices: 100, portnox: 6000, cisco: 12500, aruba: 9500, forescout: 8500 },
    { devices: 500, portnox: 27000, cisco: 62500, aruba: 47500, forescout: 42500 },
    { devices: 1000, portnox: 48000, cisco: 110000, aruba: 82000, forescout: 74000 },
    { devices: 2500, portnox: 105000, cisco: 245000, aruba: 187500, forescout: 170000 },
    { devices: 5000, portnox: 210000, cisco: 490000, aruba: 375000, forescout: 340000 },
    { devices: 10000, portnox: 360000, cisco: 850000, aruba: 680000, forescout: 600000 },
    { devices: 25000, portnox: 750000, cisco: 1875000, aruba: 1500000, forescout: 1350000 },
    { devices: 50000, portnox: 1400000, cisco: 3500000, aruba: 2800000, forescout: 2550000 }
  ];

  const performanceMetrics = [
    {
      vendor: 'Portnox CLEAR',
      metrics: {
        authPerSecond: 10000,
        concurrentSessions: 100000,
        latency: 5,
        availability: 99.99,
        geoRedundancy: true,
        autoScaling: true
      }
    },
    {
      vendor: 'Cisco ISE',
      metrics: {
        authPerSecond: 5000,
        concurrentSessions: 50000,
        latency: 15,
        availability: 99.9,
        geoRedundancy: true,
        autoScaling: false
      }
    },
    {
      vendor: 'Aruba ClearPass',
      metrics: {
        authPerSecond: 3000,
        concurrentSessions: 25000,
        latency: 20,
        availability: 99.5,
        geoRedundancy: true,
        autoScaling: false
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Cost Scaling Curve */}
      <Card>
        <CardHeader>
          <CardTitle>TCO Scaling Analysis</CardTitle>
          <CardDescription>How costs scale with organization size</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={scalabilityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="devices"
                scale="log"
                domain={[100, 50000]}
                tickFormatter={(value) => `${(value / 1000).toFixed(value >= 1000 ? 0 : 1)}k`}
              />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <RechartsTooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="portnox" stroke="#10b981" strokeWidth={3} name="Portnox CLEAR" />
              <Line type="monotone" dataKey="cisco" stroke="#3b82f6" strokeWidth={2} name="Cisco ISE" />
              <Line type="monotone" dataKey="aruba" stroke="#f59e0b" strokeWidth={2} name="Aruba ClearPass" />
              <Line type="monotone" dataKey="forescout" stroke="#8b5cf6" strokeWidth={2} name="Forescout" />
            </LineChart>
          </ResponsiveContainer>
          <Alert className="mt-4">
            <TrendingUp className="h-4 w-4" />
            <AlertDescription>
              Portnox CLEAR shows linear scaling with predictable per-device costs, while traditional vendors
              exhibit step-function increases due to hardware requirements and licensing tiers.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Performance at Scale */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics at Scale</CardTitle>
          <CardDescription>How vendors perform under load</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {performanceMetrics.map(({ vendor, metrics }) => (
              <div key={vendor} className="space-y-3">
                <h4 className="font-semibold">{vendor}</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Auth/Second</p>
                    <p className="text-2xl font-bold">{metrics.authPerSecond.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Concurrent Sessions</p>
                    <p className="text-2xl font-bold">{(metrics.concurrentSessions / 1000).toFixed(0)}k</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Latency</p>
                    <p className="text-2xl font-bold">{metrics.latency}ms</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Availability</p>
                    <p className="text-2xl font-bold">{metrics.availability}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Geo-Redundancy</p>
                    <p className="text-2xl font-bold">{metrics.geoRedundancy ? '✓' : '✗'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Auto-Scaling</p>
                    <p className="text-2xl font-bold">{metrics.autoScaling ? '✓' : '✗'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Growth Readiness Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Growth Readiness Assessment</CardTitle>
          <CardDescription>Evaluating vendors for future scalability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-2 text-sm">
              <div className="font-medium">Factor</div>
              <div className="text-center">Portnox</div>
              <div className="text-center">Cisco</div>
              <div className="text-center">Aruba</div>
              <div className="text-center">Forescout</div>

              {[
                { factor: 'Linear Cost Scaling', scores: [95, 60, 65, 70] },
                { factor: 'No Hardware Limits', scores: [100, 40, 45, 50] },
                { factor: 'Cloud Elasticity', scores: [100, 20, 30, 60] },
                { factor: 'Multi-Site Support', scores: [95, 85, 80, 85] },
                { factor: 'API Scalability', scores: [90, 75, 70, 75] },
                { factor: 'Management Overhead', scores: [90, 50, 60, 55] }
              ].map(({ factor, scores }) => (
                <React.Fragment key={factor}>
                  <div className="text-muted-foreground">{factor}</div>
                  {scores.map((score, idx) => (
                    <div key={idx} className="text-center">
                      <Badge variant={score >= 80 ? "success" : score >= 60 ? "warning" : "destructive"}>
                        {score}
                      </Badge>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ScalabilityAnalysis;
