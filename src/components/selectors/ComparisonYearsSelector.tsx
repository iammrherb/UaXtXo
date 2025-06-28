"use client";

import React from 'react';
import { useDashboardSettings } from '@/context/DashboardContext';
import { cn } from '@/lib/utils';

const yearOptions: { value: number; label: string }[] = [
  { value: 1, label: "1 Year" },
  { value: 3, label: "3 Years" },
  { value: 5, label: "5 Years" },
];

export const ComparisonYearsSelector: React.FC<{ className?: string }> = ({ className }) => {
  const { comparisonYears, setComparisonYears } = useDashboardSettings();

  return (
    <div className={cn("flex flex-col space-y-1", className)}>
      <label htmlFor="years-selector" className="text-xs font-medium text-slate-400">
        Analysis Period
      </label>
      <select
        id="years-selector"
        value={comparisonYears}
        onChange={(e) => setComparisonYears(parseInt(e.target.value, 10))}
        className={cn(
          "block w-full appearance-none rounded-md border border-slate-700 bg-slate-800/70 py-1.5 px-3 text-sm text-slate-100 shadow-sm",
          "focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500",
          "hover:border-slate-600 transition-colors duration-150"
        )}
      >
        {yearOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
