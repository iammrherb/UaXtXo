// @ts-nocheck
import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useCalculator } from '../../context/CalculatorContext';
import { VendorResult } from '../../utils/calculationEngine';
import { formatCurrency } from '../../utils/formatters';

interface SavingsProjectionChartProps {
  height?: number;
}

const SavingsProjectionChart: React.FC<SavingsProjectionChartProps> = ({ height = 350 }) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  
  const chartOptions = useMemo<ApexOptions>(() => {
    if (!calculationResults || !calculationResults.vendorResults) {
      return {
        chart: {
          type: 'area',
          height,
          fontFamily: 'Nunito, sans-serif'
        },
        title: {
          text: '5-Year Savings Projection',
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
    
    // Get Portnox and top competitor for comparison
    const portnox = calculationResults.vendorResults.find((v: VendorResult) => v.vendorId === 'portnox');
    if (!portnox) return { chart: { type: 'area' }, series: [], xaxis: { categories: [] } };
    
    const competitors = calculationResults.vendorResults
      .filter((v: VendorResult) => v.vendorId !== 'portnox')
      .sort((a: VendorResult, b: VendorResult) => b.totalTco - a.totalTco);
    
    if (competitors.length === 0) {
      return {
        chart: {
          type: 'area',
          height,
          fontFamily: 'Nunito, sans-serif'
        },
        title: {
          text: '5-Year Savings Projection',
          align: 'center'
        },
        subtitle: {
          text: 'No competitors selected for comparison.',
          align: 'center'
        },
        series: [],
        xaxis: {
          categories: []
        }
      };
    }
    
    const topCompetitor = competitors[0];
    
    // Prepare categories (years)
    const categories = ['Initial', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];
    
    // Prepare series data
    const portnoxCosts = [
      portnox.cumulativeCosts.initial,
      portnox.cumulativeCosts.year1,
      portnox.cumulativeCosts.year2,
      portnox.cumulativeCosts.year3,
      portnox.cumulativeCosts.year4,
      portnox.cumulativeCosts.year5
    ];
    
    const competitorCosts = [
      topCompetitor.cumulativeCosts.initial,
      topCompetitor.cumulativeCosts.year1,
      topCompetitor.cumulativeCosts.year2,
      topCompetitor.cumulativeCosts.year3,
      topCompetitor.cumulativeCosts.year4,
      topCompetitor.cumulativeCosts.year5
    ];
    
    // Calculate savings
    const savings = competitorCosts.map((cost, index) => cost - portnoxCosts[index]);
    
    // Calculate cumulative savings
    const cumulativeSavings = [];
    let runningTotal = 0;
    
    for (const value of savings) {
      runningTotal += value;
      cumulativeSavings.push(Math.round(runningTotal));
    }
    
    return {
      chart: {
        type: 'area',
        height,
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: false
        }
      },
      title: {
        text: '5-Year Cumulative Savings Projection',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 'bold'
        }
      },
      subtitle: {
        text: `Compared to ${topCompetitor.name}`,
        align: 'center'
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      dataLabels: {
        enabled: true,
        formatter: function(val: number) {
          return formatCurrency(val);
        },
        style: {
          colors: ['#333']
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0.1,
          stops: [0, 90, 100]
        }
      },
      colors: ['#2BD25B'],
      xaxis: {
        categories: categories,
        labels: {
          style: {
            fontWeight: 'bold'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Cumulative Savings ($)'
        },
        labels: {
          formatter: function(val: number) {
            return formatCurrency(val);
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(val: number) {
            return formatCurrency(val);
          }
        }
      },
      grid: {
        borderColor: '#e0e0e0',
        strokeDashArray: 5
      },
      markers: {
        size: 5,
        hover: {
          size: 7
        }
      },
      series: [
        {
          name: 'Cumulative Savings',
          data: cumulativeSavings
        }
      ]
    };
  }, [calculationResults, height]);
  
  return (
    <div className="chart-container">
      <Chart
        options={chartOptions}
        series={(chartOptions.series as any) || []}
        type="area"
        height={height}
      />
      {calculationResults && calculationResults.vendorResults && calculationResults.vendorResults.length > 1 && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h4 className="text-md font-medium mb-2">Long-term Savings Analysis</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            The cumulative savings projection demonstrates the growing financial advantage of Portnox Cloud 
            over traditional NAC solutions. Initial savings from hardware elimination are enhanced by reduced 
            operational costs year after year, resulting in significant long-term financial benefits.
          </p>
        </div>
      )}
    </div>
  );
};

export default SavingsProjectionChart;
