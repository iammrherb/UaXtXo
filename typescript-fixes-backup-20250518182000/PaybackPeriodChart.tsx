import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useCalculator } from '../../context/CalculatorContext';
import { formatCurrency } from '../../utils/formatters';
import { VendorResult } from '../../utils/calculationEngine';
import { CalculationResults } from '../../utils/calculationEngine';

interface PaybackPeriodChartProps {
  height?: number;
}

// Define vendor result interface
interface VendorResult {
  vendorId: string;
  name: string;
  paybackPeriod: number;
  [key: string]: any;
}

// Define chart series type
interface ChartSeries {
  name: string;
  data: number[];
}

const PaybackPeriodChart: React.FC<PaybackPeriodChartProps> = ({ height = 350 }) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  
  const { chartOptions, series } = useMemo(() => {
    if (!calculationResults || !calculationResults.vendorResults || !calculationResults.comparisonResults) {
      return {
        chartOptions: {
          chart: {
            type: 'bar' as const,
            height,
            fontFamily: 'Nunito, sans-serif'
          },
          title: {
            text: 'Payback Period Comparison'
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
    
    // Get Portnox result
    const portnox = calculationResults.vendorResults.find((r: VendorResult) => r.vendorId === 'portnox');
    if (!portnox) {
      return {
        chartOptions: {
          chart: {
            type: 'bar' as const,
          }
        } as ApexOptions,
        series: [] as ChartSeries[]
      };
    }
    
    // Create comparison data
    const competitors = calculationResults.vendorResults
      .filter((r: VendorResult) => r.vendorId !== 'portnox')
      .sort((a: VendorResult, b: VendorResult) => a.paybackPeriod - b.paybackPeriod)
      .slice(0, 5); // Limit to top 5 for better readability
    
    const categories = [portnox.name, ...competitors.map((c: VendorResult) => c.name)];
    const data = [
      Math.round(portnox.paybackPeriod),
      ...competitors.map((c: VendorResult) => Math.round(c.paybackPeriod))
    ];
    
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
            horizontal: true,
            borderRadius: 6,
            dataLabels: {
              position: 'top',
            },
            barHeight: '70%'
          }
        },
        colors: ['#2BD25B'],
        dataLabels: {
          enabled: true,
          formatter: function (val: number) {
            return val + ' months';
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
          title: {
            text: 'Months to Breakeven'
          }
        },
        yaxis: {
          title: {
            text: 'Solutions'
          }
        },
        title: {
          text: 'Payback Period Comparison',
          align: 'center',
          style: {
            fontSize: '18px',
            fontWeight: 'bold'
          }
        },
        tooltip: {
          y: {
            formatter: function (val: number) {
              return val + ' months';
            }
          }
        }
      } as ApexOptions,
      series: [{
        name: 'Payback Period',
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

export default PaybackPeriodChart;
