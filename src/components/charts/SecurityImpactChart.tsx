import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { useCalculator } from '../../context/CalculatorContext';
import { VendorResult } from '../../utils/calculationEngine';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface SecurityImpactChartProps {
  height?: number;
}

const SecurityImpactChart: React.FC<SecurityImpactChartProps> = ({ height = 350 }) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  
  const chartOptions = useMemo(() => {
    if (!calculationResults || !calculationResults.vendorResults) {
      return {
        chart: {
          type: 'bar',
          height,
          fontFamily: 'Nunito, sans-serif'
        },
        title: {
          text: 'Security Impact Analysis',
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
    
    // Sort vendors by security improvement (highest first)
    const sortedVendors = [...calculationResults.vendorResults]
      .sort((a: VendorResult, b: VendorResult) => b.securityImprovement - a.securityImprovement);
    
    if (sortedVendors.length === 0) return { chart: { type: 'bar' }, series: [], xaxis: { categories: [] } };
    
    // Prepare categories and data
    const categories = sortedVendors.map(vendor => vendor.name);
    const securityImprovementData = sortedVendors.map(vendor => Math.round(vendor.securityImprovement));
    const meanTimeToRespondData = sortedVendors.map(vendor => vendor.meanTimeToRespond);
    
    // Calculate financial impact
    const riskReductionValues = sortedVendors.map(vendor => Math.round(vendor.riskReductionValue / 1000));
    
    return {
      chart: {
        type: 'bar',
        height,
        stacked: false,
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: false
        }
      },
      title: {
        text: 'Security Impact Comparison',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 'bold'
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 5,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val: number, opts: any) {
          const seriesIndex = opts.seriesIndex;
          if (seriesIndex === 0) return `${val}%`;
          if (seriesIndex === 1) return `${val} min`;
          if (seriesIndex === 2) return `$${val}K`;
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#333']
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories,
        labels: {
          style: {
            fontSize: '12px'
          },
          rotate: -45,
          rotateAlways: false,
          trim: false
        }
      },
      yaxis: [
        {
          title: {
            text: 'Security Improvement (%)'
          },
          labels: {
            formatter: (val: number) => `${val}%`
          }
        },
        {
          opposite: true,
          title: {
            text: 'Mean Time to Respond (min)'
          },
          labels: {
            formatter: (val: number) => `${val} min`
          }
        }
      ],
      colors: ['#2BD25B', '#FF8042', '#1B67B2'],
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val: number, opts: any) {
            const seriesIndex = opts.seriesIndex;
            if (seriesIndex === 0) return `${val}% security improvement`;
            if (seriesIndex === 1) return `${val} minutes to respond`;
            if (seriesIndex === 2) return `$${val}K risk reduction value`;
            return val;
          }
        }
      },
      legend: {
        position: 'bottom'
      },
      series: [
        {
          name: 'Security Improvement',
          data: securityImprovementData,
          type: 'column'
        },
        {
          name: 'Mean Time to Respond',
          data: meanTimeToRespondData,
          type: 'column'
        },
        {
          name: 'Risk Reduction Value (K)',
          data: riskReductionValues,
          type: 'column'
        }
      ]
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
      {calculationResults && calculationResults.vendorResults && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h4 className="text-md font-medium mb-2">Security Impact Insights</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Portnox Cloud delivers superior security improvement with significantly faster threat response times. 
            The cloud-native architecture enables real-time security updates and continuous monitoring, 
            translating to higher risk reduction value and stronger protection against emerging threats. 
            Faster response times directly correlate with reduced breach impact and lower financial risk exposure.
          </p>
        </div>
      )}
    </div>
  );
};

export default SecurityImpactChart;
