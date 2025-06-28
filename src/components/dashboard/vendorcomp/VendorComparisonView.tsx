"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDashboardSettings } from '@/context/DashboardContext';
import { useVendorData, VendorId, NewVendorData } from '@/hooks/useVendorData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveRadar } from '@nivo/radar'; // Nivo Radar chart
import { cn } from '@/lib/utils';
import { BarChartBig, Check, CheckCircle, ChevronDown, ChevronUp, Clock, Info, LayoutGrid, ListChecks, Palette, XIcon, Zap } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"; // Assuming shadcn/ui Accordion


// Helper to transform vendor comparative scores for Nivo Radar
const transformDataForRadar = (vendors: NewVendorData[]) => {
  if (!vendors || vendors.length === 0) return [];

  // Define the keys for the radar chart from comparativeScores
  const keys: Array<keyof NonNullable<NewVendorData['comparativeScores']>> = [
    "securityEffectiveness",
    "easeOfDeployment",
    "scalability",
    "integrationCapabilities",
    "totalCostOfOwnershipScore", // Higher is better (inverted TCO)
    "complianceCoverageScore"
  ];

  // Format keys for display
  const formattedKeys: Record<string, string> = {
    securityEffectiveness: "Security",
    easeOfDeployment: "Deployment Ease",
    scalability: "Scalability",
    integrationCapabilities: "Integration",
    totalCostOfOwnershipScore: "TCO Score",
    complianceCoverageScore: "Compliance"
  };

  const radarData = keys.map(key => {
    const entry: { [key: string]: string | number } = { metric: formattedKeys[key] };
    vendors.forEach(vendor => {
      entry[vendor.name] = vendor.comparativeScores?.[key] || 0;
    });
    return entry;
  });
  return radarData;
};

// Sub-component for Feature Matrix Table (simplified from earlier version)
interface FeatureMatrixProps {
  vendors: NewVendorData[];
}
const FeatureMatrixTable: React.FC<FeatureMatrixProps> = ({ vendors }) => {
  // Define some key feature categories and specific features to compare
  // This should ideally be more dynamic based on available feature data in NewVendorData
  const featureSetToCompare = {
    "Access Control": ["802.1X", "RiskBasedAuth", "GuestAccess"],
    "Visibility": ["DeviceProfiling", "EndpointDiscovery"],
    "Automation": ["PolicyAutomation", "Remediation"],
  };

  if (vendors.length === 0) return <p className="text-slate-400">Select vendors to compare features.</p>;

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-700 shadow-lg mt-6">
      <table className="min-w-full divide-y divide-slate-700">
        <thead className="bg-slate-800/70">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-100 sm:pl-6 sticky left-0 bg-slate-800/70 z-10">
              Feature Category / Feature
            </th>
            {vendors.map(vendor => (
              <th key={vendor.id} scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-slate-100">
                {vendor.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-900/50">
          {Object.entries(featureSetToCompare).map(([category, features]) => (
            <React.Fragment key={category}>
              <tr className="bg-slate-700/40">
                <td colSpan={vendors.length + 1} className="py-2 pl-4 pr-3 text-xs font-semibold text-cyan-400 sm:pl-6 sticky left-0 bg-slate-700/40 z-10">
                  {category}
                </td>
              </tr>
              {features.map(featureKey => (
                <tr key={`${category}-${featureKey}`} className="hover:bg-slate-700/30 transition-colors">
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 text-sm font-medium text-slate-200 sm:pl-8 sticky left-0 bg-slate-900/50 hover:bg-slate-700/30 z-10 group">
                    {featureKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </td>
                  {vendors.map(vendor => {
                    const featureData = vendor.features[category]?.[featureKey];
                    let displayValue = <XCircle className="h-5 w-5 text-red-500 mx-auto opacity-70" />; // Default to No
                    if (featureData) {
                      if (typeof featureData === 'object' && featureData.score !== undefined) {
                        if (featureData.score >= 85) displayValue = <CheckCircle className="h-5 w-5 text-emerald-400 mx-auto" />;
                        else if (featureData.score >= 60) displayValue = <Check className="h-5 w-5 text-yellow-400 mx-auto" />;
                      } else if (typeof featureData === 'boolean' && featureData) {
                         displayValue = <CheckCircle className="h-5 w-5 text-emerald-400 mx-auto" />;
                      }
                    }
                    return (
                      <td key={`${vendor.id}-${category}-${featureKey}`} className="py-3 px-3 text-center text-slate-300"
                          title={featureData?.details ? `${featureKey}: ${featureData.details}` : featureKey}>
                        {displayValue}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};


// Sub-component for Implementation Roadmap comparison (simplified)
interface ImplementationRoadmapProps {
  vendors: NewVendorData[];
}
const ImplementationRoadmapComparison: React.FC<ImplementationRoadmapProps> = ({ vendors }) => {
  if (vendors.length === 0) return <p className="text-slate-400">Select vendors to see implementation details.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {vendors.map(vendor => (
        <Card key={vendor.id} className="bg-slate-800/30 border-slate-700/50 shadow-lg flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg text-cyan-400 flex items-center gap-2">
              <img src={vendor.logoUrl || '/default-logo.svg'} alt={vendor.name} className="h-6 w-auto mr-2" onError={(e) => (e.currentTarget.src = '/default-logo.svg')} />
              {vendor.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow space-y-3 text-sm">
            <div>
              <strong className="text-slate-300 block">Avg. Deployment:</strong>
              <span className="text-slate-100">{vendor.implementation.averageDeploymentTimeDays} days</span>
            </div>
            <div>
              <strong className="text-slate-300 block">Complexity:</strong>
              <Badge variant={vendor.implementation.complexityLevel === 'low' ? 'default' : vendor.implementation.complexityLevel === 'medium' ? 'secondary' : 'destructive'}
                     className={cn(
                       vendor.implementation.complexityLevel === 'low' && "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
                       vendor.implementation.complexityLevel === 'medium' && "bg-yellow-500/20 text-yellow-300 border-yellow-400/30",
                       (vendor.implementation.complexityLevel === 'high' || vendor.implementation.complexityLevel === 'very_high') && "bg-red-500/20 text-red-300 border-red-400/30",
                     )}>
                {vendor.implementation.complexityLevel.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
            <div>
              <strong className="text-slate-300 block">Hardware Required:</strong>
              <span className="text-slate-100">{vendor.implementation.requiresHardware ? "Yes" : "No"}</span>
            </div>
            <div>
              <strong className="text-slate-300 block">Cloud Native:</strong>
              <span className="text-slate-100">{vendor.implementation.cloudNative ? "Yes" : "No"}</span>
            </div>
            <div>
              <strong className="text-slate-300 block">Agentless %:</strong>
              <span className="text-slate-100">{vendor.implementation.agentlessCapabilityPercent}%</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};


const VendorComparisonView: React.FC = () => {
  const { selectedOrgSize, selectedIndustry, comparisonYears } = useDashboardSettings();
  const { getAllVendorIds, vendorsMap, isLoadingAllVendors } = useVendorData();

  // Use the same vendor selection logic as TcoAnalysisView for now
  const vendorIdsForComparison: VendorId[] = useMemo(() => {
    const allIds = getAllVendorIds();
    const mainCompetitors: VendorId[] = ["cisco_ise", "aruba_clearpass", "fortinac"];
    let selected: VendorId[] = ["portnox"];
    for (const competitor of mainCompetitors) {
      if (allIds.includes(competitor) && selected.length < 4) {
        selected.push(competitor);
      }
       if (selected.length >=4) break;
    }
     if (selected.length < 4) {
        for (const id of allIds) {
            if (!selected.includes(id) && selected.length < 4) {
                selected.push(id);
            }
            if (selected.length >= 4) break;
        }
    }
    return selected;
  }, [getAllVendorIds]);

  const vendorsToCompare = useMemo(() => {
    if (!vendorsMap || vendorIdsForComparison.length === 0) return [];
    return vendorIdsForComparison.map(id => vendorsMap.get(id)).filter(Boolean) as NewVendorData[];
  }, [vendorsMap, vendorIdsForComparison]);

  const radarChartData = useMemo(() => transformDataForRadar(vendorsToCompare), [vendorsToCompare]);
  const radarKeys = vendorsToCompare.map(v => v.name);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  if (isLoadingAllVendors) {
     return <div className="p-10 text-center text-slate-400">Loading vendor data...</div>;
  }

  return (
    <motion.div variants={fadeInUp} initial="initial" animate="animate" className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4">
          Vendor Capability Matrix
        </h1>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Comparative analysis of vendor strengths, features, and deployment characteristics for informed decision-making.
        </p>
      </div>

      {/* Feature Radar Chart */}
      <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center">
            <Palette size={28} className="mr-3 text-pink-400" />
            Comparative Scores Radar
          </CardTitle>
          <CardDescription className="text-slate-400">
            Visualizing relative strengths across key performance indicators. Scores are 0-100 (higher is better).
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[500px] pt-6">
          {radarChartData.length > 0 && radarKeys.length > 0 ? (
            <ResponsiveRadar
              data={radarChartData}
              keys={radarKeys}
              indexBy="metric"
              maxValue={100}
              margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
              borderColor={{ from: 'color' }}
              gridLevels={5}
              gridShape="circular"
              gridLabelOffset={20}
              dotSize={8}
              dotColor={{ theme: 'background' }}
              dotBorderWidth={2}
              dotBorderColor={{ from: 'color' }}
              enableDotLabel={true}
              dotLabelYOffset={-12}
              colors={{ scheme: 'spectral' }} // Or use VENDOR_COLORS if mapped correctly
              fillOpacity={0.25}
              blendMode="multiply"
              animate={true}
              motionConfig="wobbly"
              theme={{
                axis: {
                  ticks: { text: { fontSize: 11, fill: '#cbd5e1' } }, // slate-300
                  legend: { text: { fontSize: 12, fill: '#e2e8f0' } }, // slate-200
                },
                grid: { line: { stroke: '#475569', strokeDasharray: '3 3' } }, // slate-600
                labels: { text: { fill: "#f1f5f9" } }, // slate-100
                dots: {
                    text: { fill: "#f8fafc", fontSize: 12, fontWeight: "bold" } // slate-50
                },
                tooltip: {
                  container: {
                    background: '#1e293b', // slate-800
                    color: '#f1f5f9', // slate-100
                    fontSize: '13px',
                    borderRadius: '6px',
                  },
                },
                legends: {
                    text: {fill: '#cbd5e1', fontSize: 12} // slate-300
                }
              }}
              legends={[
                {
                  anchor: 'top-left',
                  direction: 'column',
                  translateX: -50,
                  translateY: -40,
                  itemWidth: 80,
                  itemHeight: 20,
                  itemsSpacing: 4,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  effects: [{ on: 'hover', style: { itemTextColor: '#fff' } }]
                }
              ]}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">
              <Info size={24} className="mr-2" /> Not enough data or vendors selected for Radar Chart.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Feature Matrix Table Section */}
       <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
        <AccordionItem value="item-1" className="border-slate-700/80">
          <AccordionTrigger className="text-xl text-white hover:no-underline py-4 px-2 bg-slate-800/50 rounded-t-lg hover:bg-slate-700/50">
             <div className="flex items-center">
                <ListChecks size={24} className="mr-3 text-purple-400" /> Detailed Feature Matrix
             </div>
          </AccordionTrigger>
          <AccordionContent className="bg-slate-800/20 p-0 rounded-b-lg">
            <div className="p-4 md:p-6">
                <FeatureMatrixTable vendors={vendorsToCompare} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Implementation Roadmap Section */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-slate-700/80">
          <AccordionTrigger className="text-xl text-white hover:no-underline py-4 px-2 bg-slate-800/50 rounded-t-lg hover:bg-slate-700/50">
            <div className="flex items-center">
                <Clock size={24} className="mr-3 text-yellow-400" /> Implementation Comparison
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-slate-800/20 p-0 rounded-b-lg">
            <div className="p-4 md:p-6">
                <ImplementationRoadmapComparison vendors={vendorsToCompare} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

    </motion.div>
  );
};

export default VendorComparisonView;
