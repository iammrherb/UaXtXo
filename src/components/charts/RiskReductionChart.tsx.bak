import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useCalculator } from '../../context/CalculatorContext';

interface RiskReductionChartProps {
  height?: number;
}

// Define vendor result interface
interface VendorResult {
  vendorId: string;
  name: string;
  securityImprovement: number;
  [key: string]: any;
}

// Define chart series type
interface ChartSeries {
  name: string;
  data: number[];
}

const RiskReductionChart: React.FC<RiskReductionChartProps> = ({ height = 350 }) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  
  const { chartOptions, series } = useMemo(() => {
    if (!calculationResults || !calculationResults.vendorResults || calculationResults.vendorResults.length === 0) {
      return {
        chartOptions: {
          chart: {
            type: 'bar' as const,
            height,
            fontFamily: 'Nunito, sans-serif'
          },
          title: {
            text: 'Risk Reduction Comparison'
          },
          subtitle: {
            text: 'No data available. Please calculate results first.'
          },
          xaxis: {
            categories: []
          }
        } as ApexOptions,
        series: [] as ChartSeries[]
      };
    }
    
    // Sort vendors by risk reduction (highest first)
    const sortedVendors = [...calculationResults.vendorResults]
      .sort((a: VendorResult, b: VendorResult) => b.securityImprovement - a.securityImprovement);
    
    // Prepare data
    const categories = sortedVendors.map((vendor: VendorResult) => vendor.name);
    const data = sortedVendors.map((vendor: VendorResult) => Math.round(vendor.securityImprovement));
    const colors = sortedVendors.map((vendor: VendorResult) => 
      vendor.vendorId === 'portnox' ? '#2BD25B' : 
      vendor.vendorId === 'no-nac' ? '#E74C3C' : '#1B67B2'
    );
    
    return {
      chartOptions: {
        chart: {
          type: 'bar' as const,
          height,
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
          fontFamily: 'Nunito, sans-serif'
        },
        plotOptions: {
          bar: {
            distributed: true, // Different colors for each bar
            columnWidth: '60%',
            borderRadius: 6,
            dataLabels: {
              position: 'top'
            }
          }
        },
        colors,
        dataLabels: {
          enabled: true,
          formatter: function (val: number) {
            return val + '%';
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#000']
          }
        },
        xaxis: {
          categories,
          position: 'bottom',
          labels: {
            rotate: -45,
            style: {
              fontSize: '12px'
            }
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          title: {
            text: 'Risk Reduction (%)'
          },
          labels: {
            formatter: (val: number) => `${val}%`
          }
        },
        title: {
          text: 'Security Risk Reduction by Solution',
          align: 'center',
          style: {
            fontSize: '18px',
            fontWeight: 'bold'
          }
        },
        tooltip: {
          y: {
            formatter: function (val: number) {
              return val + '% risk reduction';
            }
          }
        },
        grid: {
          borderColor: '#e0e0e0',
          strokeDashArray: 5
        }
      } as ApexOptions,
      series: [{
        name: 'Risk Reduction',
        data
      }] as ChartSeries[]
    };
  }, [calculationResults, height]);
  
  return (
    <div className="chart-container">
      <Chart
        options={chartOptions}
        series={series}
        type="bar"
        height={height}
      />
    </div>
  );
};

export default RiskReductionChart;
