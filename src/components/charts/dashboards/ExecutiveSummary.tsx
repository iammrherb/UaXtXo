"use client";

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Assuming shadcn/ui Card
import { Badge } from '@/components/ui/badge'; // Assuming shadcn/ui Badge
import { ArrowUpRight, ArrowDownRight, DollarSign, Zap, ShieldCheck, CheckCircle, BarChart3, Users, Clock, TrendingUp, Award } from 'lucide-react';
import { useVendorData, VendorId } from '@/hooks/useVendorData';
import { useTcoCalculator, TCOResult } from '@/hooks/useTcoCalculator';
import type { OrgSizeId, IndustryId } from '@/types/common';
import { NewVendorData } from '@/lib/vendors/data';
import { cn } from '@/lib/utils'; // Assuming this utility exists

// Re-usable Metric Card component (can be moved to a shared UI location later)
interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ElementType;
  trend?: "up" | "down" | "neutral";
  trendText?: string;
  unit?: string;
  variant?: "default" | "primary" | "highlight";
  isLoading?: boolean;
}

const GlassMetricCard: React.FC<MetricCardProps> = ({ title, value, description, icon: Icon, trend, trendText, unit, variant, isLoading }) => {
  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : null;

  return (
    <motion.div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-xl p-6 transition-all duration-300 hover:bg-white/10",
        variant === "primary" && "bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-400/30",
        variant === "highlight" && "bg-portnox-primary/10 border-portnox-primary/30"
      )}
      whileHover={{ y: -5 }}
    >
      {isLoading ? (
        <div className="h-36 animate-pulse space-y-3">
          <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
          <div className="h-10 bg-slate-600/50 rounded w-1/2"></div>
          <div className="h-4 bg-slate-700/50 rounded w-full"></div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-300 group-hover:text-white">{title}</h3>
            {Icon && <Icon className="h-6 w-6 text-portnox-primary-light" />}
          </div>
          <p className="text-3xl font-bold text-white mb-1">
            {value}
            {unit && <span className="text-xl ml-1 text-slate-400">{unit}</span>}
          </p>
          {description && <p className="text-xs text-slate-400 mb-3">{description}</p>}
          {trend && TrendIcon && trendText && (
            <div className={cn("flex items-center text-xs",
              trend === "up" ? "text-emerald-400" : trend === "down" ? "text-red-400" : "text-slate-400"
            )}>
              <TrendIcon className="h-4 w-4 mr-1" />
              {trendText}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};


import { useDashboardSettings } from '@/context/DashboardContext'; // Import the context hook

export interface ExecutiveSummaryProps {
  // Props are now optional as they will come from context primarily
  primaryVendorId?: VendorId;
  competitorVendorIds?: VendorId[];
}

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({
  primaryVendorId = "portnox", // Default primary vendor
  // Default competitor for summary can be dynamic or a fixed example
  competitorVendorIds: initialCompetitorIds = ["cisco_ise"],
}) => {
  const { selectedOrgSize, selectedIndustry, comparisonYears } = useDashboardSettings();
  const { getVendor, vendorsMap, isLoadingAllVendors } = useVendorData(); // Use vendorsMap for easier iteration
  const { calculateSingleVendorTco } = useTcoCalculator();

  // Use a state for competitor IDs if we want to change them dynamically within this component,
  // or receive them as props if controlled from outside.
  const [competitorIdsForSummary] = useState(initialCompetitorIds);


  // isLoading will now depend on vendor data and calculations
  const [isCalculating, setIsCalculating] = useState(true);
  const [summaryData, setSummaryData] = useState<any>(null);

  const portnoxData = useMemo(() => getVendor(primaryVendorId), [getVendor, primaryVendorId]);

  const portnoxTcoResult = useMemo(() => {
    if (!portnoxData || !selectedOrgSize || !selectedIndustry || !comparisonYears) return null;
    return calculateSingleVendorTco(primaryVendorId, selectedOrgSize, selectedIndustry, comparisonYears);
  }, [primaryVendorId, selectedOrgSize, selectedIndustry, comparisonYears, portnoxData, calculateSingleVendorTco]);

  const competitorTcoResults = useMemo(() => {
    if (competitorIdsForSummary.length === 0 || !selectedOrgSize || !selectedIndustry || !comparisonYears || !vendorsMap) return [];
    return competitorIdsForSummary.map(id => {
      const competitorData = vendorsMap.get(id); // Use vendorsMap from hook
      if (!competitorData) return null;
      return calculateSingleVendorTco(id, selectedOrgSize, selectedIndustry, comparisonYears);
    }).filter(Boolean) as TCOResult[];
  }, [competitorIdsForSummary, selectedOrgSize, selectedIndustry, comparisonYears, vendorsMap, calculateSingleVendorTco]);


  useMemo(() => {
    if (isLoadingAllVendors) {
      setIsCalculating(true);
      return;
    }
    setIsCalculating(true); // Start calculation
    if (portnoxTcoResult && portnoxData) {
      let tcoReductionPercent = 0;
      let traditionalNacDeploymentTime = 120;
      let competitorName = 'Traditional NAC Baseline';

      if (competitorTcoResults.length > 0 && competitorTcoResults[0]) {
        const mainCompetitor = competitorTcoResults[0];
        competitorName = mainCompetitor.vendorName;
        const mainCompetitorTco = mainCompetitor.totalTCO;
        if (mainCompetitorTco > 0) {
          tcoReductionPercent = ((mainCompetitorTco - portnoxTcoResult.totalTCO) / mainCompetitorTco) * 100;
        }
        const compData = vendorsMap?.get(mainCompetitor.vendorId);
        traditionalNacDeploymentTime = compData?.implementation.averageDeploymentTimeDays || 120;
      } else {
        // Fallback: ZTCA spec mentions "67% TCO Reduction with Portnox vs traditional NAC"
        // To achieve this, traditional NAC TCO must be approx. 3x Portnox TCO.
        // (P_TCO / (P_TCO / (1-0.67))) - 1 = -0.67
        // So, Traditional_TCO = Portnox_TCO / (1 - 0.67)
        const assumedTraditionalTCO = portnoxTcoResult.totalTCO / (1 - 0.67);
        if (assumedTraditionalTCO > 0) {
             tcoReductionPercent = ((assumedTraditionalTCO - portnoxTcoResult.totalTCO) / assumedTraditionalTCO) * 100;
        }
      }

      setSummaryData({
        portnoxName: portnoxData.name,
        tcoReductionPercent: parseFloat(tcoReductionPercent.toFixed(0)),
        competitorNameForTco: competitorName,
        complianceCoverage: portnoxData.comparativeScores?.complianceCoverageScore || 95,
        roiPaybackMonths: portnoxTcoResult.roiMetrics.paybackPeriodMonths,
        riskReductionPercent: portnoxData.roiFactors.incidentReductionPercent || 98,
        deploymentTimeDays: portnoxData.implementation.averageDeploymentTimeDays,
        traditionalNacDeploymentTimeDays: traditionalNacDeploymentTime,
        portnoxSpecificMetrics: portnoxData.portnoxSpecificMetrics,
      });
      setIsCalculating(false);
    } else if (!isLoadingAllVendors) { // if not loading vendors and still no data
      setIsCalculating(false); // stop calculating if data is missing
      setSummaryData(null); // Clear summary data
    }
  }, [portnoxTcoResult, competitorTcoResults, portnoxData, vendorsMap, isLoadingAllVendors]);


  const isLoading = isCalculating || isLoadingAllVendors; // Combined loading state

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  return (
    <motion.div variants={fadeInUp} initial="initial" animate="animate" className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-4">
          Executive Intelligence Summary
        </h1>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Key performance indicators for {summaryData?.portnoxName || "Portnox"} compared to industry baselines and traditional solutions,
          highlighting strategic advantages in cost, security, and operational efficiency.
        </p>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GlassMetricCard
          title="TCO Reduction"
          value={summaryData?.tcoReductionPercent || 0}
          unit="%"
          description={`vs. Traditional NAC / ${competitorTcoResults.length > 0 ? competitorTcoResults[0].vendorName : 'Baseline'}`}
          icon={DollarSign}
          trend="up"
          trendText="Significant Savings"
          variant="primary"
          isLoading={isLoading}
        />
        <GlassMetricCard
          title="Compliance Coverage"
          value={summaryData?.complianceCoverage || 0}
          unit="%"
          description="Across key industry standards"
          icon={ShieldCheck}
          trend="up"
          trendText="Comprehensive Adherence"
          isLoading={isLoading}
        />
        <GlassMetricCard
          title="ROI Payback Period"
          value={summaryData?.roiPaybackMonths || "N/A"}
          unit={typeof summaryData?.roiPaybackMonths === 'number' ? "Months" : ""}
          description="Time to realize positive return"
          icon={TrendingUp}
          trend="neutral" // Payback is a point in time
          isLoading={isLoading}
        />
        <GlassMetricCard
          title="Security Risk Reduction"
          value={summaryData?.riskReductionPercent || 0}
          unit="%"
          description="Decrease in security breach probability"
          icon={CheckCircle}
          trend="up"
          trendText="Enhanced Security Posture"
          variant="highlight"
          isLoading={isLoading}
        />
        <GlassMetricCard
          title="Deployment Time"
          value={summaryData?.deploymentTimeDays || 0}
          unit="Days"
          description={`vs. ${summaryData?.traditionalNacDeploymentTimeDays || '120+'} Days (Traditional)`}
          icon={Zap}
          trend="up" // Faster is better, framing as positive trend
          trendText="Rapid Implementation"
          isLoading={isLoading}
        />
         <GlassMetricCard
          title="Automated Remediation"
          value={summaryData?.portnoxSpecificMetrics?.automatedRemediationRate || 0}
          unit="%"
          description="Of policy violations & threats"
          icon={Award} // Using Award as a stand-in for a more specific automation icon
          trend="up"
          trendText="Proactive Security"
          isLoading={isLoading}
        />
      </div>

      {/* TODO: Add more sections like:
          - Small charts summarizing TCO comparison (mini bar chart)
          - Key Portnox differentiators list
          - Call to action to dive deeper into other tabs
      */}
       <div className="mt-12 p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-4 text-center">Portnox Platform Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          {[
            { label: "Risk-Based Auth", value: `${summaryData?.portnoxSpecificMetrics?.riskBasedAuthenticationCoverage || 0}%`, icon: Users },
            { label: "Continuous Monitoring", value: `${summaryData?.portnoxSpecificMetrics?.continuousMonitoringCoverage || 0}%`, icon: Clock },
            { label: "Cloud-Native Arch.", value: summaryData?.portnoxSpecificMetrics?.is100PercentCloudNative ? "100%" : "N/A", icon: Zap },
            { label: "Agentless Deployment", value: `${summaryData?.portnoxSpecificMetrics?.agentlessDeploymentPercent || 0}%`, icon: BarChart3 },
          ].map(item => (
            <div key={item.label} className="p-4 bg-white/5 rounded-lg">
              <item.icon className="h-8 w-8 text-portnox-primary-light mx-auto mb-2" />
              <p className="text-sm text-slate-300">{item.label}</p>
              <p className="text-xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
};

export default ExecutiveSummary;
