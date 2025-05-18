import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useCalculator } from '../../context/CalculatorContext';
import { formatCurrency } from '../../utils/formatters';

interface CumulativeCostChartProps {
  height?: number;
}

// Define vendor result interface
interface VendorResult {
  vendorId: string;
  name: string;
  totalTco: number;
  cumulativeCosts: {
    initial: number;
    year1: number;
    year2: number;
    year3: number;
    year4?: number;
    year5?: number;
  };
  [key: string]: any;
}

// Define chart series type
interface ChartSeries {
  name: string;
  data: number[];
}

const CumulativeCostChart: React.FC<CumulativeCostChartProps> = ({ height = 350 }) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  
  const { chartOptions, series } = useMemo(() => {
    if (!calculationResults || !calculationResults.vendorResults || calculationResults.vendorResults.length === 0) {
      // Default empty options
      return {
        chartOptions: {
          chart: {
            type: 'line' as const,
            height: height,
            fontFamily: 'Nunito, sans-serif'
          },
          title: {
            text: 'Cumulative Cost Comparison'
          },
          subtitle: {
            text: 'No data available. Please calculate results first.'
          },
          xaxis: {
            categories: []
          },
          yaxis: {
            title: {
              text: 'Total Cost ($)'
            }
          }
        } as ApexOptions,
        series: [] as ChartSeries[]
      };
    }
    
    // Limit to top 4 vendors + Portnox for better readability
    const portnox = calculationResults.vendorResults.find((r: VendorResult) => r.vendorId === 'portnox');
    const otherVendors = calculationResults.vendorResults
      .filter((r: VendorResult) => r.vendorId !== 'portnox')
      .sort((a: VendorResult, b: VendorResult) => a.totalTco - b.totalTco)
      .slice(0, 4);
    
    const displayVendors = portnox ? [portnox, ...otherVendors] : otherVendors;
    
    // Prepare series data
    const seriesData = displayVendors.map((vendor: VendorResult) => ({
      name: vendor.name,
      data: [
        Math.round(vendor.cumulativeCosts.initial),
        Math.round(vendor.cumulativeCosts.year1),
        Math.round(vendor.cumulativeCosts.year2),
        Math.round(vendor.cumulativeCosts.year3)
      ]
    }));
    
    return {
      chartOptions: {
        chart: {
          type: 'line' as const,
          height: height,
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350
            }
          },
          dropShadow: {
            enabled: true,
            opacity: 0.3,
            blur: 5,
            left: 0,
            top: 0
          },
          fontFamily: 'Nunito, sans-serif'
        },
        colors: displayVendors.map((vendor: VendorResult) => 
          vendor.vendorId === 'portnox' ? '#2BD25B' : '#1B67B2'
        ),
        stroke: {
          width: displayVendors.map((vendor: VendorResult) => 
            vendor.vendorId === 'portnox' ? 4 : 2
          ),
          curve: 'smooth'
        },
        markers: {
          size: 5,
          colors: displayVendors.map((vendor: VendorResult) => 
            vendor.vendorId === 'portnox' ? '#2BD25B' : '#1B67B2'
          ),
          strokeWidth: 0
        },
        xaxis: {
          categories: ['Initial', 'Year 1', 'Year 2', 'Year 3']
        },
        yaxis: {
          title: {
            text: 'Cumulative Cost ($)'
          },
          labels: {
            formatter: (val: number) => {
              return '$' + new Intl.NumberFormat('en-US').format(val);
            }
          }
        },
        title: {
          text: 'Cumulative Cost Comparison',
          align: 'center',
          style: {
            fontSize: '18px',
            fontWeight: 'bold'
          }
        },
        tooltip: {
          y: {
            formatter: (val: number) => {
              return '$' + new Intl.NumberFormat('en-US').format(val);
            }
          }
        },
        legend: {
          position: 'top'
        },
        grid: {
          borderColor: '#e0e0e0',
          strokeDashArray: 5
        }
      } as ApexOptions,
      series: seriesData
    };
  }, [calculationResults, height]);
  
  return (
    <div className="chart-container">
      <Chart
        options={chartOptions}
        series={series}
        type="line"
        height={height}
      />
    </div>
  );
};

export default CumulativeCostChart;
