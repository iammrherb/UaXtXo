import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { useCalculator } from '../../context/CalculatorContext';
import { VendorResult } from '../../utils/calculationEngine';
import { formatCurrency } from '../../utils/formatters';

interface TcoBreakdownChartProps {
  height?: number;
  vendorId?: string;
}

const TcoBreakdownChart: React.FC<TcoBreakdownChartProps> = ({ 
  height = 350,
  vendorId = 'portnox'
}) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  
  const chartOptions = useMemo(() => {
    if (!calculationResults || !calculationResults.vendorResults) {
      return {
        chart: {
          type: 'donut',
          height,
          fontFamily: 'Nunito, sans-serif'
        },
        title: {
          text: 'TCO Breakdown',
          align: 'center'
        },
        subtitle: {
          text: 'No data available. Please calculate results first.',
          align: 'center'
        },
        series: [],
        labels: []
      };
    }
    
    // Get vendor data
    const vendor = calculationResults.vendorResults.find((v: VendorResult) => v.vendorId === vendorId);
    if (!vendor) {
      return {
        chart: {
          type: 'donut',
          height,
          fontFamily: 'Nunito, sans-serif'
        },
        title: {
          text: 'TCO Breakdown',
          align: 'center'
        },
        subtitle: {
          text: `Vendor ${vendorId} not found in calculation results.`,
          align: 'center'
        },
        series: [],
        labels: []
      };
    }
    
    // Prepare data for breakdown chart
    const labels = ['Licenses & Subscriptions', 'Maintenance', 'Implementation', 'Operations', 'Hardware', 'Infrastructure'];
    const series = [
      vendor.licenseCost + vendor.subscriptionCost,
      vendor.maintenanceCost,
      vendor.implementationCost,
      vendor.staffingCost,
      vendor.hardwareCost,
      vendor.infrastructureCost
    ];
    
    // Filter out zero values
    const filteredLabels = [];
    const filteredSeries = [];
    
    for (let i = 0; i < series.length; i++) {
      if (series[i] > 0) {
        filteredLabels.push(labels[i]);
        filteredSeries.push(Math.round(series[i]));
      }
    }
    
    // Get total
    const total = filteredSeries.reduce((sum, val) => sum + val, 0);
    
    return {
      chart: {
        type: 'donut',
        height,
        fontFamily: 'Nunito, sans-serif'
      },
      title: {
        text: `${vendor.name} TCO Breakdown`,
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 'bold'
        }
      },
      subtitle: {
        text: `3-Year Total Cost: ${formatCurrency(total)}`,
        align: 'center',
        style: {
          fontSize: '14px'
        }
      },
      labels: filteredLabels,
      series: filteredSeries,
      colors: ['#8884D8', '#82CA9D', '#FFBB28', '#FF8042', '#D14B5A', '#6E7E9C'],
      dataLabels: {
        enabled: true,
        formatter: function(val: number, opts: any) {
          return `${Math.round(val)}%`;
        }
      },
      legend: {
        position: 'bottom',
        formatter: function(seriesName: string, opts: any) {
          return `${seriesName}: ${formatCurrency(filteredSeries[opts.seriesIndex])}`;
        }
      },
      tooltip: {
        y: {
          formatter: function(val: number) {
            return formatCurrency(val);
          }
        }
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                showAlways: true,
                formatter: function(w: any) {
                  return formatCurrency(total);
                },
                label: '3-Year TCO'
              }
            }
          }
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '100%'
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }, [calculationResults, height, vendorId]);
  
  return (
    <div className="chart-container">
      <Chart
        options={chartOptions}
        series={chartOptions.series || []}
        type="donut"
        height={height}
      />
      {calculationResults && calculationResults.vendorResults && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h4 className="text-md font-medium mb-2">TCO Breakdown Analysis</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This breakdown highlights the distribution of costs over a 3-year period. 
            Cloud-native solutions like Portnox eliminate hardware and infrastructure costs 
            while significantly reducing operational overhead and implementation costs.
          </p>
        </div>
      )}
    </div>
  );
};

export default TcoBreakdownChart;
