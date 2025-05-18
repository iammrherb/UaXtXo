import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { useCalculator } from '../../context/CalculatorContext';

interface RiskReductionChartProps {
  height?: number;
}

const RiskReductionChart: React.FC<RiskReductionChartProps> = ({ height = 350 }) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  
  const chartOptions = useMemo(() => {
    if (!calculationResults || !calculationResults.vendorResults || calculationResults.vendorResults.length === 0) {
      return {
        chart: {
          type: 'bar',
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
        },
        series: []
      };
    }
    
    // Sort vendors by risk reduction (highest first)
    const sortedVendors = [...calculationResults.vendorResults]
      .sort((a, b) => b.securityImprovement - a.securityImprovement);
    
    // Prepare data
    const categories = sortedVendors.map(vendor => vendor.name);
    const data = sortedVendors.map(vendor => Math.round(vendor.securityImprovement));
    const colors = sortedVendors.map(vendor => 
      vendor.vendorId === 'portnox' ? '#2BD25B' : 
      vendor.vendorId === 'no-nac' ? '#E74C3C' : '#1B67B2'
    );
    
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
      },
      series: [{
        name: 'Risk Reduction',
        data
      }]
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

export default RiskReductionChart;
