import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { useCalculator } from '../../context/CalculatorContext';
import { VendorResult } from '../../utils/calculationEngine';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface ExecutiveSummaryChartProps {
  height?: number;
}

const ExecutiveSummaryChart: React.FC<ExecutiveSummaryChartProps> = ({ height = 400 }) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  
  const chartOptions = useMemo(() => {
    if (!calculationResults || !calculationResults.vendorResults) {
      return {
        chart: {
          type: 'area',
          height,
          fontFamily: 'Nunito, sans-serif'
        },
        title: {
          text: 'Executive Summary',
          align: 'center'
        },
        subtitle: {
          text: 'No data available. Please calculate results first.',
          align: 'center'
        },
        series: [],
        xaxis: {
          categories: []
        }
      };
    }
    
    // Get Portnox and competitors
    const portnox = calculationResults.vendorResults.find((v: VendorResult) => v.vendorId === 'portnox');
    if (!portnox) return { chart: { type: 'area' }, series: [], xaxis: { categories: [] } };
    
    const competitors = calculationResults.vendorResults
      .filter((v: VendorResult) => v.vendorId !== 'portnox')
      .sort((a: VendorResult, b: VendorResult) => b.totalTco - a.totalTco);
    
    // Average competitor values
    const avgCompetitorTco = competitors.length > 0 
      ? competitors.reduce((sum, vendor) => sum + vendor.totalTco, 0) / competitors.length 
      : portnox.totalTco * 1.5;
    
    const avgCompetitorImplementation = competitors.length > 0 
      ? competitors.reduce((sum, vendor) => sum + vendor.implementationDays, 0) / competitors.length 
      : portnox.implementationDays * 3;
    
    const avgCompetitorSecurity = competitors.length > 0 
      ? competitors.reduce((sum, vendor) => sum + vendor.securityImprovement, 0) / competitors.length 
      : portnox.securityImprovement * 0.7;
    
    // Calculate advantage percentages
    const costAdvantage = Math.round((avgCompetitorTco - portnox.totalTco) / avgCompetitorTco * 100);
    const speedAdvantage = Math.round((avgCompetitorImplementation - portnox.implementationDays) / avgCompetitorImplementation * 100);
    const securityAdvantage = Math.round((portnox.securityImprovement - avgCompetitorSecurity) / avgCompetitorSecurity * 100);
    const roiAdvantage = Math.round((portnox.roi - (competitors.length > 0 ? competitors[0].roi : portnox.roi * 0.6)) / 
      (competitors.length > 0 ? competitors[0].roi : portnox.roi * 0.6) * 100);
    
    // Prepare data for radar chart
    const categories = ['Cost Advantage', 'ROI', 'Speed to Security', 'Operational Efficiency', 'Security Effectiveness', 'Future Readiness'];
    
    const operationalAdvantage = Math.round((10 - portnox.managementComplexity) / portnox.managementComplexity * 100);
    const futureReadiness = 80; // Assuming cloud solutions have high future readiness
    
    // Scale all advantages to 0-100 for better visualization
    const portnoxAdvantages = [
      costAdvantage > 100 ? 100 : costAdvantage,
      roiAdvantage > 100 ? 100 : roiAdvantage,
      speedAdvantage > 100 ? 100 : speedAdvantage,
      operationalAdvantage > 100 ? 100 : operationalAdvantage,
      securityAdvantage > 100 ? 100 : securityAdvantage,
      futureReadiness
    ];
    
    return {
      chart: {
        type: 'radar',
        height,
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        },
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: false
        }
      },
      title: {
        text: 'Portnox Competitive Advantage',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 'bold'
        }
      },
      subtitle: {
        text: '% improvement vs. traditional NAC solutions',
        align: 'center'
      },
      stroke: {
        width: 3
      },
      fill: {
        opacity: 0.2
      },
      markers: {
        size: 5,
        hover: {
          size: 8
        }
      },
      colors: ['#2BD25B'],
      xaxis: {
        categories: categories,
        labels: {
          style: {
            fontSize: '12px',
            fontWeight: 'bold'
          }
        }
      },
      yaxis: {
        show: false,
        min: 0,
        max: 100
      },
      dataLabels: {
        enabled: true,
        background: {
          enabled: true,
          borderRadius: 2
        },
        style: {
          colors: ['#333']
        },
        formatter: function(val: number) {
          return `${Math.round(val)}%`;
        }
      },
      tooltip: {
        y: {
          formatter: function(val: number) {
            return `${Math.round(val)}% advantage`;
          }
        }
      },
      series: [
        {
          name: 'Competitive Advantage',
          data: portnoxAdvantages
        }
      ]
    };
  }, [calculationResults, height]);
  
  return (
    <div className="chart-container">
      <Chart
        options={chartOptions}
        series={chartOptions.series || []}
        type="radar"
        height={height}
      />
      {calculationResults && calculationResults.vendorResults && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="text-md font-medium text-green-700 dark:text-green-400 mb-2">Financial Impact</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Portnox Cloud delivers substantial cost savings through eliminated hardware 
              requirements, simplified implementation, and reduced operational overhead—resulting 
              in a projected {calculationResults.executiveSummary.savingsPercentage}% TCO reduction over traditional solutions.
            </p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="text-md font-medium text-blue-700 dark:text-blue-400 mb-2">Strategic Value</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Beyond cost savings, Portnox provides significant strategic advantages: rapid deployment 
              ({calculationResults.executiveSummary.implementationTime} days vs. industry average 90+ days), 
              improved security posture ({calculationResults.executiveSummary.riskReduction}% improvement), 
              and future-proof cloud architecture that continuously evolves against emerging threats.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExecutiveSummaryChart;
