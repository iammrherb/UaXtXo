"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useDashboardSettings } from '@/context/DashboardContext';
import { useVendorData, VendorId } from '@/hooks/useVendorData';
import { useComplianceData } from '@/hooks/useComplianceData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GlassMetricCard } from '@/components/charts/dashboards/ExecutiveSummary'; // Reuse the metric card
import { cn } from '@/lib/utils';
import { CheckCircle, Zap, ShieldCheck, Users, Clock, BarChart3, Percent, Layers, GitMerge, AlertTriangle, Info, Palette, ListChecks, Settings2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Simple Progress Bar component
const ProgressBar: React.FC<{ value: number; colorClass?: string; className?: string }> = ({ value, colorClass = "bg-cyan-500", className }) => {
  return (
    <div className={cn("w-full bg-slate-700 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden", className)}>
      <div
        className={cn("h-2.5 rounded-full transition-all duration-500 ease-out", colorClass)}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};


const PortnoxPlatformView: React.FC = () => {
  const { selectedIndustry } = useDashboardSettings();
  const { getVendor, isLoadingAllVendors } = useVendorData();
  const { getStandardsByIndustry, isLoadingAllStandards } = useComplianceData();

  const portnoxData = useMemo(() => getVendor("portnox"), [getVendor]);

  const industryStandards = useMemo(() => {
    if (!selectedIndustry) return [];
    return getStandardsByIndustry(selectedIndustry);
  }, [selectedIndustry, getStandardsByIndustry]);

  const isLoading = isLoadingAllVendors || isLoadingAllStandards;

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  if (isLoading) {
    return <div className="p-10 text-center text-slate-400">Loading Portnox platform data...</div>;
  }

  if (!portnoxData) {
    return <div className="p-10 text-center text-red-400">Error: Portnox data not found.</div>;
  }

  const psm = portnoxData.portnoxSpecificMetrics; // Portnox Specific Metrics
  const features = portnoxData.features;

  return (
    <motion.div variants={fadeInUp} initial="initial" animate="animate" className="space-y-8">
      <div className="text-center">
        <img src={portnoxData.logoUrl || "/portnox-logo.png"} alt={`${portnoxData.name} Logo`} className="h-16 mx-auto mb-4" onError={(e) => (e.currentTarget.src = '/default-logo.svg')} />
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-portnox-primary-light via-cyan-400 to-emerald-400 mb-3">
          {portnoxData.name} Platform Deep Dive
        </h1>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-6">
          {portnoxData.shortDescription} Discover the core strengths, advanced capabilities, and integration ecosystem of the leading Zero Trust NAC solution.
        </p>
        <Badge className="bg-portnox-primary/20 text-portnox-primary-light border-portnox-primary/50 text-sm px-4 py-1.5">
          {portnoxData.vendorType}
        </Badge>
      </div>

      {/* Key Portnox Metrics from ZTCA Spec */}
      <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center">
            <Zap size={28} className="mr-3 text-portnox-primary-light" /> Core Platform Metrics
          </CardTitle>
           <CardDescription className="text-slate-400">As highlighted in the Zero Trust Total Cost Analyzer specification.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {psm && <GlassMetricCard title="Risk-Based Authentication" value={psm.riskBasedAuthCoverage} unit="%" icon={Users} trend="up" trendText="AI-Powered Decisions" />}
          {psm && <GlassMetricCard title="Continuous Monitoring" value={psm.continuousMonitoringCoverage} unit="%" icon={Clock} trend="up" trendText="Real-time Visibility" />}
          {psm && <GlassMetricCard title="Automated Remediation" value={psm.automatedRemediationRate} unit="%" icon={ShieldCheck} trend="up" trendText="Proactive Security" />}
          {psm && <GlassMetricCard title="Cloud-Native Architecture" value={psm.is100PercentCloudNative ? "100" : "N/A"} unit={psm.is100PercentCloudNative ? "%" : ""} icon={Layers} trend="up" trendText="Scalable & Resilient" />}
          {psm && <GlassMetricCard title="Agentless Deployment" value={psm.agentlessDeploymentPercent} unit="%" icon={BarChart3} trend="up" trendText="Rapid & Broad Coverage" />}
          <GlassMetricCard title="Deployment Time" value={portnoxData.implementation.averageDeploymentTimeDays} unit="Days" icon={Zap} trend="up" trendText="vs. 120+ Days Traditional" variant="highlight"/>
        </CardContent>
      </Card>

      {/* Strengths & Key Differentiators */}
      <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center">
             <Award size={28} className="mr-3 text-yellow-400" /> Portnox Advantages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-slate-200">
            {portnoxData.strengths?.map((strength, index) => (
              <li key={index} className="flex items-start p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                <CheckCircle className="h-5 w-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Key Feature Areas with Scores/Highlights */}
      <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center">
            <ListChecks size={28} className="mr-3 text-purple-400" /> Key Feature Capabilities
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {Object.entries(features).map(([categoryKey, categoryFeatures]) => (
            <div key={categoryKey} className="p-4 bg-slate-700/20 rounded-lg border border-slate-700/50">
              <h4 className="text-lg font-semibold text-cyan-400 mb-3">{categoryKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h4>
              <div className="space-y-3">
                {Object.entries(categoryFeatures as Record<string, any>).map(([featureKey, featureData]) => (
                  <div key={featureKey}>
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-sm font-medium text-slate-200">{featureKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                      {featureData.score && <Badge className={cn("text-xs", featureData.score >= 90 ? "bg-emerald-500/80 text-white" : featureData.score >=75 ? "bg-sky-500/80 text-white" : "bg-slate-600 text-slate-200")}>{featureData.score}/100</Badge>}
                    </div>
                    {featureData.score && <ProgressBar value={featureData.score} colorClass={featureData.score >= 90 ? "bg-emerald-500" : featureData.score >=75 ? "bg-sky-500" : "bg-slate-500"} className="h-1.5"/>}
                    {featureData.details && <p className="text-xs text-slate-400 mt-1">{featureData.details}</p>}
                    {featureData.isPortnoxAdvantage && <Badge variant="outline" className="mt-1 text-xs border-yellow-400/50 text-yellow-300 bg-yellow-500/10">Portnox Advantage</Badge>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Compliance Automation Highlights */}
      <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center">
            <ShieldCheck size={28} className="mr-3 text-emerald-400" /> Compliance Automation
          </CardTitle>
          <CardDescription className="text-slate-400">Portnox support for key standards in the <span className="font-semibold text-cyan-400">{selectedIndustry.replace("_", " ")}</span> industry.</CardDescription>
        </CardHeader>
        <CardContent>
          {industryStandards.length > 0 ? (
            <div className="space-y-4">
              {industryStandards.slice(0, 3).map(standard => { // Show top 3 relevant standards
                const support = portnoxData.complianceSupport?.find(cs => cs.standardId === standard.id);
                return (
                  <div key={standard.id} className="p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex justify-between items-center">
                      <h4 className="text-md font-semibold text-slate-100">{standard.name} ({standard.id.toUpperCase()})</h4>
                      {support?.coverageLevel && <Badge className={cn(getCoverageColor(support.automationPercent, support.coverageLevel), "text-xs")}>{support.coverageLevel}</Badge>}
                    </div>
                    {support?.automationPercent !== undefined && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-slate-300 mb-0.5">
                          <span>Automation Level</span>
                          <span>{support.automationPercent}%</span>
                        </div>
                        <ProgressBar value={support.automationPercent} />
                      </div>
                    )}
                    {support?.details && <p className="text-xs text-slate-400 mt-1.5">{support.details}</p>}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-slate-400">No specific compliance standards highlighted for the selected industry, or select an industry to see details.</p>
          )}
        </CardContent>
      </Card>

    </motion.div>
  );
};

export default PortnoxPlatformView;
