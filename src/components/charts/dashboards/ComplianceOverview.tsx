"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useDashboardSettings } from '@/context/DashboardContext';
import { useComplianceData, ComplianceStandard } from '@/hooks/useComplianceData';
import { useIndustryData, Industry } from '@/hooks/useIndustryData';
import { useVendorData, VendorId, NewVendorData } from '@/hooks/useVendorData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Assuming shadcn/ui
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';
import { ShieldCheck, AlertTriangle, CheckCircle, XCircle, MinusCircle, Info } from 'lucide-react';
import type { ComplianceLevel } from '@/types/common';


// Helper to determine cell color for heatmap based on coverage
const getCoverageColor = (coveragePercent: number | undefined, coverageLevel?: ComplianceLevel): string => {
  if (coverageLevel === "Covered") return "bg-emerald-500/70 hover:bg-emerald-500/90 text-white";
  if (coverageLevel === "Partial") return "bg-yellow-500/70 hover:bg-yellow-500/90 text-gray-800";
  if (coverageLevel === "NotCovered") return "bg-red-500/70 hover:bg-red-500/90 text-white";

  if (coveragePercent === undefined) return "bg-slate-700/50 hover:bg-slate-700/70 text-slate-300"; // No data
  if (coveragePercent >= 80) return "bg-emerald-500/70 hover:bg-emerald-500/90 text-white"; // Covered
  if (coveragePercent >= 50) return "bg-yellow-500/70 hover:bg-yellow-500/90 text-gray-800"; // Partial
  return "bg-red-500/70 hover:bg-red-500/90 text-white"; // Not Covered
};

const CoverageIcon = ({ level }: { level: ComplianceLevel | undefined }) => {
  if (level === "Covered") return <CheckCircle className="h-4 w-4 text-emerald-300" />;
  if (level === "Partial") return <AlertTriangle className="h-4 w-4 text-yellow-300" />;
  if (level === "NotCovered") return <XCircle className="h-4 w-4 text-red-300" />;
  return <MinusCircle className="h-4 w-4 text-slate-500" />;
};


interface ComplianceHeatmapMatrixProps {
  industry?: Industry;
  standardsForIndustry: ComplianceStandard[];
  vendors: NewVendorData[]; // Only selected vendors for comparison
  isLoading?: boolean;
}

const ComplianceHeatmapMatrix: React.FC<ComplianceHeatmapMatrixProps> = ({ industry, standardsForIndustry, vendors, isLoading }) => {
  if (isLoading) {
    return <div className="p-6 rounded-2xl bg-slate-800/50 animate-pulse h-96">Loading heatmap data...</div>;
  }
  if (!industry || standardsForIndustry.length === 0 || vendors.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-slate-800/50 text-center text-slate-400">
        <Info size={48} className="mx-auto mb-4 text-slate-500" />
        Select an industry and vendors to view the compliance heatmap.
      </div>
    );
  }

  // For each standard, and for each vendor, find the compliance support data
  const heatmapData = standardsForIndustry.map(standard => {
    return {
      standardName: standard.name,
      standardId: standard.id,
      vendorCoverage: vendors.map(vendor => {
        const support = vendor.complianceSupport?.find(cs => cs.standardId === standard.id);
        return {
          vendorId: vendor.id,
          vendorName: vendor.name,
          coverageLevel: support?.coverageLevel,
          automationPercent: support?.automationPercent,
        };
      }),
    };
  });

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-700 shadow-lg">
      <table className="min-w-full divide-y divide-slate-700">
        <thead className="bg-slate-800/70">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-100 sm:pl-6 sticky left-0 bg-slate-800/70 z-10">
              Compliance Standard
            </th>
            {vendors.map(vendor => (
              <th key={vendor.id} scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-slate-100">
                {vendor.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-900/50">
          {heatmapData.map((row) => (
            <tr key={row.standardId} className="hover:bg-slate-700/30 transition-colors duration-150">
              <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-slate-200 sm:pl-6 sticky left-0 bg-slate-900/50 hover:bg-slate-700/30 z-10 group">
                {row.standardName}
                <p className="text-xs text-slate-400 group-hover:text-slate-300">{row.standardId.toUpperCase()}</p>
              </td>
              {row.vendorCoverage.map(vc => (
                <td
                  key={`${row.standardId}-${vc.vendorId}`}
                  className={cn(
                    "whitespace-nowrap px-3 py-3 text-xs text-center transition-all duration-150",
                    getCoverageColor(vc.automationPercent, vc.coverageLevel) // Color based on coverage
                  )}
                  title={`Vendor: ${vc.vendorName}\nStandard: ${row.standardName}\nCoverage: ${vc.coverageLevel || 'N/A'}${vc.automationPercent ? ` (${vc.automationPercent}% automated)` : ''}`}
                >
                  <div className="flex flex-col items-center justify-center">
                     <CoverageIcon level={vc.coverageLevel} />
                    <span className="font-medium mt-0.5">{vc.coverageLevel || "N/A"}</span>
                    {vc.automationPercent !== undefined && (
                      <span className="text-xs opacity-80">({vc.automationPercent}% auto)</span>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


const ComplianceOverview: React.FC = () => {
  const { selectedIndustry, selectedOrgSize } = useDashboardSettings();
  const { allIndustries, isLoadingAllIndustries, getIndustryById } = useIndustryData();
  const { allStandards, isLoadingAllStandards, getStandardsByIndustry } = useComplianceData();
  const { vendorsMap, isLoadingAllVendors, getAllVendorsList } = useVendorData();

  // For this overview, let's pick Portnox and a couple of competitors for the heatmap
  // This could be made dynamic with global vendor selectors later
  const selectedVendorIdsForHeatmap: VendorId[] = ["portnox", "cisco_ise", "aruba_clearpass"];

  const currentIndustry = useMemo(() => {
    if (!selectedIndustry) return undefined;
    return getIndustryById(selectedIndustry);
  }, [selectedIndustry, getIndustryById]);

  const standardsForSelectedIndustry = useMemo(() => {
    if (!selectedIndustry || !allStandards) return [];
    return getStandardsByIndustry(selectedIndustry);
  }, [selectedIndustry, allStandards, getStandardsByIndustry]);

  const vendorsForHeatmap = useMemo(() => {
    if (!vendorsMap) return [];
    return selectedVendorIdsForHeatmap
      .map(id => vendorsMap.get(id))
      .filter(Boolean) as NewVendorData[];
  }, [selectedVendorIdsForHeatmap, vendorsMap]);

  const isLoading = isLoadingAllIndustries || isLoadingAllStandards || isLoadingAllVendors;

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  return (
    <motion.div variants={fadeInUp} initial="initial" animate="animate" className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 mb-4">
          Compliance Intelligence Center
        </h1>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Analyze compliance coverage across standards for {currentIndustry?.name || "selected industry"} and compare vendor capabilities.
        </p>
      </div>

      <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center">
            <ShieldCheck size={28} className="mr-3 text-blue-400" />
            Compliance Heatmap Matrix
          </CardTitle>
          <CardDescription className="text-slate-400">
            Vendor compliance coverage for standards relevant to the <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-400/30">{currentIndustry?.name || "N/A"}</Badge> industry.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ComplianceHeatmapMatrix
            industry={currentIndustry}
            standardsForIndustry={standardsForSelectedIndustry}
            vendors={vendorsForHeatmap}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-white">Key Standards for {currentIndustry?.name || "Selected Industry"}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <div className="animate-pulse h-20 bg-slate-700/50 rounded-md"></div>}
          {!isLoading && standardsForSelectedIndustry.length > 0 ? (
            <ul className="space-y-3">
              {standardsForSelectedIndustry.map(standard => (
                <li key={standard.id} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                  <h4 className="font-semibold text-cyan-400">{standard.name} <span className="text-xs text-slate-400">({standard.id.toUpperCase()})</span></h4>
                  <p className="text-xs text-slate-300 mt-1">{standard.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            !isLoading && <p className="text-slate-400">No specific standards listed for the selected industry, or select an industry.</p>
          )}
        </CardContent>
      </Card>

      {/* Placeholder for Compliance Funnel - to be developed in Advanced Vis. phase */}
      {/* <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-white">Compliance Coverage Funnel</CardTitle>
          <CardDescription className="text-slate-400">Visualization of coverage stages (e.g., for Portnox).</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400 text-center py-8">Compliance Funnel Chart (e.g., using Nivo Funnel) will be implemented here.</p>
        </CardContent>
      </Card> */}
    </motion.div>
  );
};

export default ComplianceOverview;
