import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { useCalculator } from '../../context/CalculatorContext';
import { formatCurrency } from '../../utils/formatters';

interface PaybackPeriodChartProps {
  height?: number;
}

const PaybackPeriodChart: React.FC<PaybackPeriodChartProps> = ({ height = 350 }) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  
  const chartOptions = useMemo(() => {
    if (!calculationResults || !calculationResults.vendorResults || !calculationResults.comparisonResults) {
      return {
        chart: {
          type: 'bar',
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
        },
        series: []
      };
    }
    
    // Get Portnox result
    const portnox = calculationResults.vendorResults.find(r => r.vendorId === 'portnox');
    if (!portnox) return { chart: { type: 'bar' }, series: [] };
    
    // Create comparison data
    const competitors = calculationResults.vendorResults
      .filter(r => r.vendorId !== 'portnox')
      .sort((a, b) => a.paybackPeriod - b.paybackPeriod)
      .slice(0, 5); // Limit to top 5 for better readability
    
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
        categories: [portnox.name, ...competitors.map(c => c.name)],
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
      },
      series: [{
        name: 'Payback Period',
        data: [
          Math.round(portnox.paybackPeriod),
          ...competitors.map(c => Math.round(c.paybackPeriod))
        ]
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

export default PaybackPeriodChart;
