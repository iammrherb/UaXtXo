"use client";

import React from 'react';
import { useDashboardSettings } from '@/context/DashboardContext';
import type { OrgSizeId } from '@/types/common';
import { cn } from '@/lib/utils';

// Data for org sizes - could also be imported from a central types/data file
const orgSizeOptions: { value: OrgSizeId; label: string }[] = [
  { value: "small_business", label: "Small Business (1-100 users)" },
  { value: "mid_market", label: "Mid-Market (100-1K users)" },
  { value: "enterprise", label: "Enterprise (1K-10K users)" },
  { value: "global_enterprise", label: "Global Enterprise (10K+ users)" },
];

export const OrgSizeSelector: React.FC<{ className?: string }> = ({ className }) => {
  const { selectedOrgSize, setSelectedOrgSize } = useDashboardSettings();

  return (
    <div className={cn("flex flex-col space-y-1", className)}>
      <label htmlFor="org-size-selector" className="text-xs font-medium text-slate-400">
        Organization Size
      </label>
      <select
        id="org-size-selector"
        value={selectedOrgSize}
        onChange={(e) => setSelectedOrgSize(e.target.value as OrgSizeId)}
        className={cn(
          "block w-full appearance-none rounded-md border border-slate-700 bg-slate-800/70 py-1.5 px-3 text-sm text-slate-100 shadow-sm",
          "focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500",
          "hover:border-slate-600 transition-colors duration-150"
        )}
      >
        {orgSizeOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
