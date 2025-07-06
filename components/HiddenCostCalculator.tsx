import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { Info } from 'lucide-react';

// Hidden Cost Calculator Component
export function HiddenCostCalculator({ devices = 500, years = 3 }) {
  const hiddenCosts = {
    portnox: {
      name: 'Portnox CLEAR',
      training: { initial: 2500, ongoing: 500 },
      downtime: { hours: 0, costPerHour: 5000 },
      staffing: { fte: 0.1, annualCost: 90000 },
      infrastructure: { servers: 0, storage: 0, network: 0 },
      migration: { professional: 5000, internal: 2000 },
      compliance: { audit: 10000, documentation: 2000 },
      opportunity: { delayedProjects: 0, missedSavings: 0 }
    },
    cisco: {
      name: 'Cisco ISE',
      training: { initial: 15000, ongoing: 5000 },
      downtime: { hours: 16, costPerHour: 5000 },
      staffing: { fte: 0.5, annualCost: 90000 },
      infrastructure: { servers: 50000, storage: 20000, network: 25000 },
      migration: { professional: 50000, internal: 25000 },
      compliance: { audit: 20000, documentation: 10000 },
      opportunity: { delayedProjects: 50000, missedSavings: 100000 }
    },
    aruba: {
      name: 'Aruba ClearPass',
      training: { initial: 10000, ongoing: 3000 },
      downtime: { hours: 8, costPerHour: 5000 },
      staffing: { fte: 0.3, annualCost: 90000 },
      infrastructure: { servers: 30000, storage: 15000, network: 15000 },
      migration: { professional: 35000, internal: 15000 },
      compliance: { audit: 15000, documentation: 7000 },
      opportunity: { delayedProjects: 30000, missedSavings: 60000 }
    }
  };

  const calculateHiddenCosts = (vendor) => {
    const costs = hiddenCosts[vendor];
    const totalTraining = costs.training.initial + (costs.training.ongoing * years);
    const totalDowntime = costs.downtime.hours * costs.downtime.costPerHour;
    const totalStaffing = costs.staffing.fte * costs.staffing.annualCost * years;
    const totalInfrastructure = costs.infrastructure.servers + costs.infrastructure.storage + costs.infrastructure.network;
    const totalMigration = costs.migration.professional + costs.migration.internal;
    const totalCompliance = (costs.compliance.audit + costs.compliance.documentation) * years;
    const totalOpportunity = costs.opportunity.delayedProjects + costs.opportunity.missedSavings;

    return {
      training: totalTraining,
      downtime: totalDowntime,
      staffing: totalStaffing,
      infrastructure: totalInfrastructure,
      migration: totalMigration,
      compliance: totalCompliance,
      opportunity: totalOpportunity,
      total: totalTraining + totalDowntime + totalStaffing + totalInfrastructure +
             totalMigration + totalCompliance + totalOpportunity
    };
  };

  const vendorTotals = Object.entries(hiddenCosts).map(([key, vendor]) => ({
    vendor: vendor.name,
    ...calculateHiddenCosts(key)
  }));

  return (
    <div className="space-y-6">
      {/* Hidden Cost Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Hidden Cost Analysis</CardTitle>
          <CardDescription>Often overlooked costs over {years} years</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={vendorTotals}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="vendor" />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <RechartsTooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="training" stackId="a" fill="#8b5cf6" name="Training" />
              <Bar dataKey="downtime" stackId="a" fill="#ef4444" name="Downtime" />
              <Bar dataKey="staffing" stackId="a" fill="#f59e0b" name="Additional Staffing" />
              <Bar dataKey="infrastructure" stackId="a" fill="#3b82f6" name="Infrastructure" />
              <Bar dataKey="migration" stackId="a" fill="#10b981" name="Migration" />
              <Bar dataKey="compliance" stackId="a" fill="#6366f1" name="Compliance" />
              <Bar dataKey="opportunity" stackId="a" fill="#ec4899" name="Opportunity Cost" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vendorTotals.map((vendor) => (
          <Card key={vendor.vendor}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{vendor.vendor}</CardTitle>
              <CardDescription>
                Total Hidden Costs: <span className="font-bold text-foreground">${vendor.total.toLocaleString()}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Training & Certification</span>
                <span>${vendor.training.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Downtime Costs</span>
                <span className={vendor.downtime > 0 ? "text-red-600" : ""}>${vendor.downtime.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Additional Staffing</span>
                <span>${vendor.staffing.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Infrastructure</span>
                <span>${vendor.infrastructure.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Migration Costs</span>
                <span>${vendor.migration.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Compliance Overhead</span>
                <span>${vendor.compliance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Opportunity Cost</span>
                <span>${vendor.opportunity.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Insights */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Key Finding:</strong> Hidden costs can add {Math.round((vendorTotals[1].total / vendorTotals[0].total - 1) * 100)}%
          more to Cisco ISE's TCO compared to Portnox CLEAR. The largest differentiators are staffing requirements
          ({Math.round((vendorTotals[1].staffing - vendorTotals[0].staffing) / 1000)}k), infrastructure
          ({Math.round((vendorTotals[1].infrastructure - vendorTotals[0].infrastructure) / 1000)}k), and opportunity costs.
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default HiddenCostCalculator;
