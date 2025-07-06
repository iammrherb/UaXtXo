import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VendorFeatureMatrix } from './VendorFeatureMatrix';
import { RiskAssessmentDashboard } from './RiskAssessmentDashboard';
import { ImplementationComplexityAnalyzer } from './ImplementationComplexityAnalyzer';
import { HiddenCostCalculator } from './HiddenCostCalculator';
import { ScalabilityAnalysis } from './ScalabilityAnalysis';

export default function ComprehensiveNACAnalysis() {
  const [activeTab, setActiveTab] = useState('feature-matrix');

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Comprehensive NAC Analysis Suite</h1>
        <p className="text-muted-foreground">
          Deep-dive analysis tools for NAC vendor evaluation and decision making
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="feature-matrix">Feature Matrix</TabsTrigger>
          <TabsTrigger value="risk-assessment">Risk Assessment</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="hidden-costs">Hidden Costs</TabsTrigger>
        </TabsList>

        <TabsContent value="feature-matrix">
          <VendorFeatureMatrix />
        </TabsContent>

        <TabsContent value="risk-assessment">
          <RiskAssessmentDashboard />
        </TabsContent>

        <TabsContent value="implementation">
          <ImplementationComplexityAnalyzer />
        </TabsContent>

        <TabsContent value="hidden-costs">
          <HiddenCostCalculator />
        </TabsContent>
      </Tabs>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Additional Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ScalabilityAnalysis />
        </CardContent>
      </Card>
    </div>
  );
}
