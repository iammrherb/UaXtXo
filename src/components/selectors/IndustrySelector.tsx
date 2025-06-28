"use client";

import React from 'react';
import { useDashboardSettings } from '@/context/DashboardContext';
import { useIndustryData } from '@/hooks/useIndustryData'; // To fetch industry list
import type { IndustryId } from '@/types/common';
import { cn } from '@/lib/utils';

export const IndustrySelector: React.FC<{ className?: string }> = ({ className }) => {
  const { selectedIndustry, setSelectedIndustry } = useDashboardSettings();
  const { allIndustries, isLoadingAllIndustries } = useIndustryData();

  if (isLoadingAllIndustries) {
    return (
      <div className={cn("flex flex-col space-y-1", className)}>
        <label htmlFor="industry-selector" className="text-xs font-medium text-slate-400">
          Industry
        </label>
        <div className="h-8 w-full animate-pulse rounded-md bg-slate-700/50"></div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col space-y-1", className)}>
      <label htmlFor="industry-selector" className="text-xs font-medium text-slate-400">
        Industry
      </label>
      <select
        id="industry-selector"
        value={selectedIndustry}
        onChange={(e) => setSelectedIndustry(e.target.value as IndustryId)}
        className={cn(
          "block w-full appearance-none rounded-md border border-slate-700 bg-slate-800/70 py-1.5 px-3 text-sm text-slate-100 shadow-sm",
          "focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500",
          "hover:border-slate-600 transition-colors duration-150"
        )}
        disabled={!allIndustries || allIndustries.length === 0}
      >
        {allIndustries && allIndustries.length > 0 ? (
          allIndustries.map(industry => (
            <option key={industry.id} value={industry.id}>
              {industry.name}
            </option>
          ))
        ) : (
          <option value="">Loading industries...</option>
        )}
      </select>
    </div>
  );
};
