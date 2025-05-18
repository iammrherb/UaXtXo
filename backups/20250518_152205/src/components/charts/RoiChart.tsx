import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { useCalculator } from '../../context/CalculatorContext';
import { formatCurrency } from '../../utils/formatters';

interface RoiChartProps {
  height?: number;
}

const RoiChart: React.FC<RoiChartProps> = ({ height = 350 }) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  
  const chartOptions = useMemo(() => {
    if (!calculationResults || !calculationResults.vendorResults || calculationResults.vendorResults.length === 0) {
      return {
        chart: {
          type: 'bar',
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
            horizontal: true
          }
        },
        xaxis: {
          categories: ['No Data Available'],
        },
        title: {
          text: 'ROI Comparison',
          align: 'center',
          style: {
            fontSize: '18px',
            fontWeight: 'bold'
          }
        }
      };
    }
    
    // Sort vendors by ROI (Portnox always first)
    const sortedVendors = [...calculationResults.vendorResults]
      .sort((a, b) => {
        if (a.vendorId === 'portnox') return -1;
        if (b.vendorId === 'portnox') return 1;
        return b.roi - a.roi;
      });
    
    // Prepare series data
    const series = [{
      name: 'ROI (%)',
      data: sortedVendors.map(vendor => Math.round(vendor.roi))
    }];
    
    return {
      chart: {
        type: 'bar',
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
      colors: sortedVendors.map(vendor => 
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
        categories: sortedVendors.map(vendor => vendor.name),
        labels: {
          formatter: function (val: number) {
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
    };
  }, [calculationResults, height]);
  
  return (
    <div className="chart-container">
      <Chart
        options={chartOptions}
        series={chartOptions.series || []}
        type="bar"
        height={height}
      />
    </div>
  );
};

export default RoiChart;
