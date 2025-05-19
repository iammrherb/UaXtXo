// @ts-nocheck
import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useCalculator } from '../../context/CalculatorContext';
import { complianceFrameworks } from '../../api/vendorData';
// Fix: Import VendorResult with a different name to avoid conflict
import { VendorResult as VendorResultType } from '../../utils/calculationEngine';
import { CalculationResults } from '../../utils/calculationEngine';

interface ComplianceRadarChartProps {
  height?: number;
  width?: number;
}

const ComplianceRadarChart: React.FC<ComplianceRadarChartProps> = ({ height = 350, width = 600 }) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  
  const chartOptions = useMemo<ApexOptions>(() => {
    if (!calculationResults || !calculationResults.vendorResults) {
      return {
        chart: {
          type: 'radar' as const,
          height,
          width,
          toolbar: {
            show: false
          }
        },
        title: {
          text: 'Compliance Coverage',
          align: 'center'
        },
        subtitle: {
          text: 'No data available. Please calculate results first.',
          align: 'center' as const
        },
        series: [],
        labels: []
      };
    }
    
    // Get Portnox and top 2 competitors
    const portnox = calculationResults.vendorResults.find((v: VendorResultType) => v.vendorId === 'portnox');
    if (!portnox || !portnox.complianceScores) {
      return {
        chart: {
          type: 'radar' as const,
          height,
          width
        },
        series: [],
        labels: []
      };
    }
    
    const competitors = calculationResults.vendorResults
      .filter((v: VendorResultType) => v.vendorId !== 'portnox')
      .sort((a: VendorResultType, b: VendorResultType) => {
        const aScore = a.complianceScores?.overall || 0;
        const bScore = b.complianceScores?.overall || 0;
        return bScore - aScore;
      })
      .slice(0, 2);
    
    // Get most relevant compliance frameworks
    const topFrameworks = Object.entries(complianceFrameworks)
      .sort(([, a], [, b]) => b.nacRelevance - a.nacRelevance)
      .slice(0, 6)
      .map(([id, framework]) => ({ id, name: framework.name }));
    
    // Prepare data
    const categories = topFrameworks.map(f => f.name);
    
    // Portnox data
    const portnoxData = topFrameworks.map(f => 
      portnox.complianceScores?.[f.id] || 0
    );
    
    // Generate series
    const series = [
      {
        name: portnox.name,
        data: portnoxData
      }
    ];
    
    // Add competitor data
    competitors.forEach((competitor: VendorResultType) => {
      if (competitor.complianceScores) {
        const competitorData = topFrameworks.map(f => 
          competitor.complianceScores?.[f.id] || 0
        );
        
        series.push({
          name: competitor.name,
          data: competitorData
        });
      }
    });
    
    return {
      chart: {
        type: 'radar' as const,
        height,
        width,
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        },
        toolbar: {
          show: false
        }
      },
      title: {
        text: 'Compliance Framework Coverage',
        align: 'center' as const,
        style: {
          fontSize: '18px',
          fontWeight: 'bold'
        }
      },
      stroke: {
        width: 2
      },
      fill: {
        opacity: 0.1
      },
      markers: {
        size: 3,
        hover: {
          size: 5
        }
      },
      colors: ['#2BD25B', '#1B67B2', '#FF8042'],
      xaxis: {
        categories: categories
      },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 5,
        labels: {
          formatter: (val: number) => `${Math.round(val)}%`
        }
      },
      dataLabels: {
        enabled: true,
        background: {
          enabled: true,
          borderRadius: 2
        },
        style: {
          fontSize: '10px'
        },
        formatter: (val: number) => `${Math.round(val)}%`
      },
      tooltip: {
        y: {
          formatter: (val: number) => `${Math.round(val)}%`
        }
      },
      legend: {
        position: 'bottom' as const
      }
    };
  }, [calculationResults, height, width]);
  
  return (
    <div className="chart-container">
      <Chart
        options={chartOptions}
        series={(chartOptions.series as any) || []}
        type="radar"
        height={height}
        width={width}
      />
      
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 className="text-md font-medium mb-2">Compliance Coverage Insights</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Portnox provides superior compliance coverage across all major frameworks, with continuous
          monitoring capabilities that simplify audit preparation. The cloud architecture enables
          automatic updates to maintain compliance with evolving regulations.
        </p>
      </div>
    </div>
  );
};

export default ComplianceRadarChart;
