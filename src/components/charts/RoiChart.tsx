import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useCalculator } from '../../context/CalculatorContext';
import { formatCurrency } from '../../utils/formatters';
import { CalculationResults } from '../../utils/calculationEngine';

interface RoiChartProps {
  height?: number;
}

// Define vendor result interface
interface VendorResult {
  vendorId: string;
  name: string;
  roi: number;
  [key: string]: any;
}

// Define chart series type
interface ChartSeries {
  name: string;
  data: number[];
}

const RoiChart: React.FC<RoiChartProps> = ({ height = 350 }) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  
  const { chartOptions, series } = useMemo(() => {
    if (!calculationResults || !calculationResults.vendorResults || calculationResults.vendorResults.length === 0) {
      return {
        chartOptions: {
          chart: {
            type: 'bar' as const as const,
            height,
            fontFamily: 'Nunito, sans-serif'
          },
          title: {
            text: 'ROI Comparison'
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
    
    // Sort vendors by ROI (Portnox always first)
    const sortedVendors = [...calculationResults.vendorResults]
      .sort((a: VendorResult, b: VendorResult) => {
        if (a.vendorId === 'portnox') return -1;
        if (b.vendorId === 'portnox') return 1;
        return b.roi - a.roi;
      });
    
    // Prepare series data
    const categories = sortedVendors.map((vendor: VendorResult) => vendor.name);
    const data = sortedVendors.map((vendor: VendorResult) => Math.round(vendor.roi));
    
    return {
      chartOptions: {
        chart: {
          type: 'bar' as const as const,
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
            horizontal: true,
            borderRadius: 6,
            dataLabels: {
              position: 'top',
            },
            barHeight: '70%'
          }
        },
        colors: sortedVendors.map((vendor: VendorResult) => 
          vendor.vendorId === 'portnox' ? '#2BD25B' : '#1B67B2'
        ),
        dataLabels: {
          enabled: true,
          formatter: function (val: number) {
            return val + '%';
          },
          offsetX: 5,
          style: {
            fontSize: '12px',
            colors: ['#000']
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff']
        },
        xaxis: {
          categories,
          labels: {
            formatter: function (val: any) {
              return val + '%';
            }
          }
        },
        yaxis: {
          title: {
            text: 'Solutions'
          }
        },
        title: {
          text: '3-Year ROI Comparison',
          align: 'center',
          style: {
            fontSize: '18px',
            fontWeight: 'bold'
          }
        },
        tooltip: {
          y: {
            formatter: function (val: number) {
              return val + '%';
            }
          }
        }
      } as ApexOptions,
      series: [{
        name: 'ROI (%)',
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

export default RoiChart;
