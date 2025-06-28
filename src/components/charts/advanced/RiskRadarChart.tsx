"use client";

import React from 'react';
import { ResponsiveRadar, RadarCustomLayerProps } from '@nivo/radar';
import { NewVendorData } from '@/lib/vendors/data'; // For type hints if needed

export interface RiskRadarChartDataPoint {
  metric: string; // e.g., "Security Effectiveness", "Deployment Speed"
  Portnox: number;
  "Traditional NAC": number; // Or "Competitor Average"
  // Can add more series if needed
}

interface RiskRadarChartProps {
  data: RiskRadarChartDataPoint[];
  keys: string[]; // e.g., ["Portnox", "Traditional NAC"]
  indexBy: string; // e.g., "metric"
  title?: string;
}

// Define the keys and their display names for the radar chart from comparativeScores
const radarMetricKeys: Array<keyof NonNullable<NewVendorData['comparativeScores']>> = [
  "securityEffectiveness",
  "easeOfDeployment",
  "scalability",
  "integrationCapabilities",
  // "totalCostOfOwnershipScore", // TCO score is inverted (higher is better), might be confusing in a risk/security context
  "complianceCoverageScore"
];

const formattedRadarMetricKeys: Record<string, string> = {
  securityEffectiveness: "Security Effectiveness",
  easeOfDeployment: "Deployment Ease",
  scalability: "Scalability",
  integrationCapabilities: "Integration Capabilities",
  complianceCoverageScore: "Compliance Coverage"
};


export const RiskRadarChart: React.FC<RiskRadarChartProps> = ({ data, keys, indexBy, title }) => {
  if (!data || data.length === 0) {
    return <div className="text-center text-slate-400 p-4">No data available for Risk Radar Chart.</div>;
  }

  return (
    <div className="h-[350px] md:h-[400px] w-full"> {/* Ensure parent has height */}
      {title && <h4 className="text-md font-semibold text-slate-200 mb-2 text-center">{title}</h4>}
      <ResponsiveRadar
        data={data}
        keys={keys}
        indexBy={indexBy}
        valueFormat=">-.0f" // Format tick values to integers
        maxValue={100} // Assuming scores are 0-100
        margin={{ top: 60, right: 70, bottom: 40, left: 70 }}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={18}
        dotSize={8}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        colors={["#00D4AA", "#FF6B35"]} // Portnox primary, Portnox accent (or a more contrasting color for traditional)
        // Example: colors={['var(--portnox-primary)', 'var(--color-red)']} - if CSS vars are accessible
        fillOpacity={0.20}
        blendMode="multiply" // 'multiply' or 'normal'
        animate={true}
        motionConfig="wobbly" // "gentle", "wobbly", "stiff"
        isInteractive={true}
        theme={{
          axis: {
            ticks: { text: { fontSize: 10, fill: '#cbd5e1' } }, // slate-300
            legend: { text: { fontSize: 12, fill: '#e2e8f0', fontWeight: 'bold' } }, // slate-200
          },
          grid: { line: { stroke: '#475569', strokeDasharray: '2 2', strokeWidth: 1 } }, // slate-600
          labels: { text: { fill: "#f1f5f9", fontSize: 11 } }, // slate-100
          dots: {
              text: { fill: "#f8fafc", fontSize: 12 } // slate-50
          },
          tooltip: {
            container: {
              background: '#1e293b', // slate-800
              color: '#f1f5f9', // slate-100
              fontSize: '13px',
              borderRadius: '6px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            },
          },
          legends: {
              text: {fill: '#cbd5e1', fontSize: 12} // slate-300
          }
        }}
        legends={[
          {
            anchor: 'top-right',
            direction: 'column',
            translateX: -50,
            translateY: -40,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#999',
            symbolSize: 12,
            symbolShape: 'circle',
            effects: [{ on: 'hover', style: { itemTextColor: '#fff' } }]
          }
        ]}
      />
    </div>
  );
};

// Helper function to generate data specifically for Portnox vs Traditional NAC comparison
export const generatePortnoxVsTraditionalRadarData = (
  portnoxScores: NewVendorData['comparativeScores'],
  traditionalNacBaselineScores: NewVendorData['comparativeScores'] // Same structure for simplicity
): RiskRadarChartDataPoint[] => {
  if (!portnoxScores || !traditionalNacBaselineScores) return [];

  return radarMetricKeys.map(key => ({
    metric: formattedRadarMetricKeys[key],
    Portnox: portnoxScores[key] || 0,
    "Traditional NAC": traditionalNacBaselineScores[key] || 0,
  }));
};

// Example baseline for Traditional NAC
export const traditionalNacBaseline: NewVendorData['comparativeScores'] = {
  securityEffectiveness: 65,
  easeOfDeployment: 40, // Typically harder
  scalability: 75,
  integrationCapabilities: 70,
  totalCostOfOwnershipScore: 50, // Higher TCO generally means lower score here
  complianceCoverageScore: 60,
};
