"use client";

import React from 'react';
import { OrgSizeSelector } from '@/components/selectors/OrgSizeSelector';
import { IndustrySelector } from '@/components/selectors/IndustrySelector';
import { ComparisonYearsSelector } from '@/components/selectors/ComparisonYearsSelector';
import { cn } from '@/lib/utils';
// Import an icon for a refresh/apply button, e.g., RefreshCw
import { PlayCircle, RefreshCw, Settings2 } from 'lucide-react';

export const ConfigurationBar: React.FC<{ className?: string }> = ({ className }) => {
  // In the future, this bar could also have a button to "Apply" settings if we don't want instant re-render on change
  // or to trigger more complex recalculations. For now, selectors directly update context.

  return (
    <div
      className={cn(
        "p-3 md:p-4 border-b border-slate-700/50 bg-slate-900/70 dark:bg-gray-950/70 backdrop-blur-md shadow-sm sticky top-0 z-20",
        className
      )}
    >
      <div className="max-w-screen-2xl mx-auto"> {/* Removed container to allow full width for bar, content uses container */}
        <div className="flex flex-col space-y-3 md:flex-row md:items-end md:space-y-0 md:gap-4 lg:gap-6">
          <OrgSizeSelector className="min-w-[200px] md:min-w-[220px] lg:min-w-[240px]" />
          <IndustrySelector className="min-w-[200px] md:min-w-[220px] lg:min-w-[240px]" />
          <ComparisonYearsSelector className="min-w-[150px] md:min-w-[160px] lg:min-w-[180px]" />

          {/* Optional: Button to manually trigger recalculation or apply settings */}
          {/* <button
            className="mt-2 md:mt-0 md:ml-auto flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            // onClick={() => { /* Potentially trigger global recalculation if needed */ }}
          >
            <RefreshCw size={16} />
            Apply Filters
          </button> */}
        </div>
      </div>
    </div>
  );
};
