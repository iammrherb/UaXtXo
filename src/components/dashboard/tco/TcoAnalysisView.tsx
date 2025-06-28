"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDashboardSettings } from '@/context/DashboardContext';
import { useVendorData, VendorId } from '@/hooks/useVendorData';
import { useTcoCalculator, TCOResult, TCOResultBreakdown } from '@/hooks/useTcoCalculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { cn } from '@/lib/utils';
import { DollarSign, TrendingDown, TrendingUp, Info, AlertTriangle } from 'lucide-react';
import { GlassMetricCard } from '@/components/charts/dashboards/ExecutiveSummary'; // Reuse the metric card

// Define colors for chart segments and vendors
const COST_CATEGORY_COLORS: { [key in keyof TCOResultBreakdown]: string } = {
  software: '#3B82F6', // Blue
  hardware: '#EF4444', // Red
  implementation: '#F59E0B', // Amber
  operational: '#10B981', // Emerald
  support: '#8B5CF6', // Violet
  hidden: '#64748B',  // Slate
};

const VENDOR_COLORS = [ // For comparing total TCOs if needed, or for distinct vendor elements
  '#00D4AA', // Portnox Primary
  '#FF6B35', // Portnox Accent
  '#3B82F6', // Blue
  '#8B5CF6', // Violet
  '#10B981', // Emerald
  '#F59E0B', // Amber
];


const TcoAnalysisView: React.FC = () => {
  const { selectedOrgSize, selectedIndustry, comparisonYears } = useDashboardSettings();
  const { getAllVendorIds, getVendor, isLoadingAllVendors } = useVendorData();
  const { calculateAllSelectedVendorsTco } = useTcoCalculator();

  const [isLoadingCalculations, setIsLoadingCalculations] = useState(true);
  const [tcoResults, setTcoResults] = useState<TCOResult[]>([]);

  // For this initial view, let's use a predefined set of vendors or all.
  // Later, this should come from a global multi-vendor selector.
  const vendorIdsForAnalysis: VendorId[] = useMemo(() => {
    const allIds = getAllVendorIds();
    // Select Portnox and up to 3 others for this initial view, prioritizing main competitors.
    const mainCompetitors: VendorId[] = ["cisco_ise", "aruba_clearpass", "fortinac"];
    let selected: VendorId[] = ["portnox"];
    for (const competitor of mainCompetitors) {
      if (allIds.includes(competitor) && selected.length < 4) {
        selected.push(competitor);
      }
      if (selected.length >=4) break;
    }
    // If still less than 4, pick from remaining
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

  useEffect(() => {
    if (isLoadingAllVendors || vendorIdsForAnalysis.length === 0) {
      setIsLoadingCalculations(true);
      return;
    }

    setIsLoadingCalculations(true);
    const results = calculateAllSelectedVendorsTco({
      vendorIds: vendorIdsForAnalysis,
      orgSizeId: selectedOrgSize,
      industryId: selectedIndustry,
      projectionYears: comparisonYears,
    });
    setTcoResults(results);
    setIsLoadingCalculations(false);
  }, [
    vendorIdsForAnalysis,
    selectedOrgSize,
    selectedIndustry,
    comparisonYears,
    calculateAllSelectedVendorsTco,
    isLoadingAllVendors
  ]);

  const chartData = useMemo(() => {
    return tcoResults.map(result => ({
      name: result.vendorName,
      ...result.breakdown, // Spread cost categories
      total: result.totalTCO,
    }));
  }, [tcoResults]);

  const portnoxResult = tcoResults.find(r => r.vendorId === 'portnox');
  const averageCompetitorTCO = useMemo(() => {
    const competitors = tcoResults.filter(r => r.vendorId !== 'portnox');
    if (competitors.length === 0) return null;
    return competitors.reduce((acc, curr) => acc + curr.totalTCO, 0) / competitors.length;
  }, [tcoResults]);

  let portnoxSavings = 0;
  let portnoxSavingsPercent = 0;
  if (portnoxResult && averageCompetitorTCO && averageCompetitorTCO > 0) {
    portnoxSavings = averageCompetitorTCO - portnoxResult.totalTCO;
    portnoxSavingsPercent = (portnoxSavings / averageCompetitorTCO) * 100;
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  if (isLoadingAllVendors || isLoadingCalculations) {
    return (
      <div className="space-y-8">
         <div className="text-center"><h1 className="text-4xl md:text-5xl font-bold text-white mb-4">TCO Analysis Center</h1></div>
        <div className="p-10 rounded-2xl bg-slate-800/50 animate-pulse h-64 flex items-center justify-center text-slate-400">
          <RefreshCw className="animate-spin h-8 w-8 mr-3" /> Loading TCO Data...
        </div>
      </div>
    );
  }

  if (tcoResults.length === 0) {
     return (
      <div className="space-y-8">
         <div className="text-center"><h1 className="text-4xl md:text-5xl font-bold text-white mb-4">TCO Analysis Center</h1></div>
        <div className="p-10 rounded-2xl bg-slate-800/50 text-center text-slate-400">
          <AlertTriangle size={48} className="mx-auto mb-4 text-yellow-500" />
          No TCO data available for the current selection. Please adjust vendor selection or other parameters.
        </div>
      </div>
    );
  }


  return (
    <motion.div variants={fadeInUp} initial="initial" animate="animate" className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 mb-4">
          TCO Analysis Center
        </h1>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Detailed breakdown of Total Cost of Ownership across selected vendors and cost categories
          for a {comparisonYears}-year period in the {selectedIndustry} industry ({selectedOrgSize}).
        </p>
      </div>

      {/* Key Savings Metrics */}
      {portnoxResult && averageCompetitorTCO && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GlassMetricCard
            title="Portnox TCO"
            value={portnoxResult.totalTCO.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}
            description={`${comparisonYears}-Year Total`}
            icon={DollarSign}
            variant="highlight"
          />
          <GlassMetricCard
            title="Avg. Competitor TCO"
            value={averageCompetitorTCO.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}
            description={`${comparisonYears}-Year Total`}
            icon={DollarSign}
          />
          <GlassMetricCard
            title="Portnox Savings vs Avg."
            value={portnoxSavings.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}
            unit={`(${portnoxSavingsPercent.toFixed(0)}%)`}
            description={`Over ${comparisonYears} Years`}
            icon={portnoxSavings > 0 ? TrendingUp : TrendingDown}
            trend={portnoxSavings > 0 ? "up" : "down"}
            trendText={portnoxSavings > 0 ? "Lower Cost" : "Higher Cost"}
            variant={portnoxSavings > 0 ? "primary" : undefined}
          />
        </div>
      )}

      {/* Stacked Bar Chart for TCO Breakdown */}
      <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-white">TCO Breakdown by Vendor & Category</CardTitle>
          <CardDescription className="text-slate-400">
            Visual comparison of cost components for each solution over {comparisonYears} years.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[500px] pt-6"> {/* Increased height for better visibility */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} stroke="#475569" />
              <XAxis
                type="number"
                stroke="#94A3B8"
                tickFormatter={(value) => `$${(value / 1000).toLocaleString()}K`}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#94A3B8"
                width={120}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: 'rgba(71, 85, 105, 0.3)' }}
                contentStyle={{
                  backgroundColor: 'rgba(30, 41, 59, 0.9)', // bg-slate-800 with opacity
                  borderColor: '#475569', // border-slate-600
                  borderRadius: '0.5rem', // rounded-lg
                  color: '#F1F5F9', // text-slate-100
                }}
                formatter={(value: number, name: string) => [
                    `$${value.toLocaleString()}`,
                    name.charAt(0).toUpperCase() + name.slice(1)
                ]}
                labelStyle={{ fontWeight: 'bold', color: '#E2E8F0' }} // text-slate-200
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              {Object.keys(COST_CATEGORY_COLORS).map((key) => (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId="a" // All bars with the same stackId are stacked
                  fill={COST_CATEGORY_COLORS[key as keyof TCOResultBreakdown]}
                  name={key.charAt(0).toUpperCase() + key.slice(1)}
                  radius={[0, 6, 6, 0]} // Rounded corners for the last bar in stack (if horizontal)
                                         // For vertical, this applies to top segments.
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Cost Table */}
      <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Detailed Cost Breakdown Table</CardTitle>
          <CardDescription className="text-slate-400">
            Numerical values for each cost category per vendor over {comparisonYears} years. All figures in USD.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-slate-700">
            <table className="min-w-full divide-y divide-slate-700">
              <thead className="bg-slate-800/70">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-100 sm:pl-6 sticky left-0 bg-slate-800/70 z-10">
                    Cost Category
                  </th>
                  {tcoResults.map(vendor => (
                    <th key={vendor.vendorId} scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-slate-100">
                      {vendor.vendorName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                {(Object.keys(COST_CATEGORY_COLORS) as Array<keyof TCOResultBreakdown>).map((categoryKey) => (
                  <tr key={categoryKey} className="hover:bg-slate-700/30 transition-colors duration-150">
                    <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-slate-200 sm:pl-6 sticky left-0 bg-slate-900/50 hover:bg-slate-700/30 z-10 group">
                      {categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)}
                    </td>
                    {tcoResults.map(vendor => (
                      <td key={`${vendor.vendorId}-${categoryKey}`} className="whitespace-nowrap px-3 py-3 text-sm text-right text-slate-300">
                        {vendor.breakdown[categoryKey]?.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }) || '$0'}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-slate-800/70 hover:bg-slate-700/50 transition-colors duration-150">
                  <td className="whitespace-nowrap py-3.5 pl-4 pr-3 text-sm font-bold text-white sm:pl-6 sticky left-0 bg-slate-800/70 z-10 group">
                    Total {comparisonYears}-Year TCO
                  </td>
                  {tcoResults.map(vendor => (
                    <td key={`${vendor.vendorId}-total`} className="whitespace-nowrap px-3 py-3.5 text-sm text-right font-bold text-white">
                      {vendor.totalTCO.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

    </motion.div>
  );
};

export default TcoAnalysisView;
