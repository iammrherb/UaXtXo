import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { useCalculator } from '../../context/CalculatorContext';
import { formatCurrency } from '../../utils/formatters';
import { ApexOptions } from 'apexcharts';

interface PaybackPeriodChartProps {
  height?: number;
}

// Define interface for vendor results
interface VendorResult {
  vendorId: string;
  name: string;
  paybackPeriod: number;
  roi: number;
  totalTco: number;
  totalSavings: number;
}

const PaybackPeriodChart: React.FC<PaybackPeriodChartProps> = ({ height = 350 }) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  
  const chartOptions = useMemo<ApexOptions>(() => {
    if (!calculationResults || !calculationResults.vendorResults || calculationResults.vendorResults.length === 0) {
      return {
        chart: {
          type: 'bar' as const,
          height,
          fontFamily: 'Nunito, sans-serif',
          toolbar: {
            show: false
          }
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
        yaxis: {
          title: {
            text: 'Months to Breakeven'
          }
        }
      };
    }
    
    // Get Portnox result
    const portnox = calculationResults.vendorResults.find((r: VendorResult) => r.vendorId === 'portnox');
    if (!portnox) return {
      chart: {
        type: 'bar' as const,
        height,
        fontFamily: 'Nunito, sans-serif'
      },
      title: {
        text: 'Payback Period Comparison'
      },
      subtitle: {
        text: 'No Portnox data available.'
      },
      xaxis: {
        categories: []
      }
    };
    
    // Create comparison data
    const competitors = calculationResults.vendorResults
      .filter((r: VendorResult) => r.vendorId !== 'portnox')
      .sort((a: VendorResult, b: VendorResult) => a.paybackPeriod - b.paybackPeriod)
      .slice(0, 5); // Limit to top 5 for better readability
    
    // Combine Portnox first, then competitors
    const displayVendors = [portnox, ...competitors];
    
    // Prepare categories and data
    const categories = displayVendors.map((vendor: VendorResult) => vendor.name);
    const paybackData = displayVendors.map((vendor: VendorResult) => Math.round(vendor.paybackPeriod));
    
    // Calculate threshold lines for good/average/poor payback periods
    const goodThreshold = 6; // 6 months or less is excellent
    const averageThreshold = 12; // 6-12 months is average
    
    // Generate threshold annotations
    const annotations = {
      yaxis: [
        {
          y: goodThreshold,
          borderColor: '#2BD25B',
          label: {
            borderColor: '#2BD25B',
            style: {
              color: '#fff',
              background: '#2BD25B'
            },
            text: 'Excellent'
          }
        },
        {
          y: averageThreshold,
          borderColor: '#FFC107',
          label: {
            borderColor: '#FFC107',
            style: {
              color: '#fff',
              background: '#FFC107'
            },
            text: 'Average'
          }
        }
      ]
    };
    
    return {
      chart: {
        type: 'bar' as const,
        height,
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true
          }
        },
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
          opacity: 0.2,
          blur: 3,
          left: 0,
          top: 0
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 10,
          dataLabels: {
            position: 'top',
          },
          barHeight: '70%',
          distributed: true
        }
      },
      colors: displayVendors.map((vendor: VendorResult) => {
        if (vendor.vendorId === 'portnox') return '#2BD25B';
        if (vendor.paybackPeriod <= goodThreshold) return '#4CAF50';
        if (vendor.paybackPeriod <= averageThreshold) return '#FFC107';
        return '#FF5252';
      }),
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
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: categories,
        title: {
          text: 'Months to Breakeven',
          style: {
            fontSize: '14px',
            fontWeight: 600
          }
        }
      },
      yaxis: {
        title: {
          text: 'Solutions',
          style: {
            fontSize: '14px',
            fontWeight: 600
          }
        }
      },
      title: {
        text: 'Investment Payback Period Comparison',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#333'
        }
      },
      subtitle: {
        text: 'Time to positive return on investment (lower is better)',
        align: 'center',
        style: {
          fontSize: '14px',
          color: '#666'
        }
      },
      tooltip: {
        theme: 'light',
        y: {
          formatter: function (val: number) {
            return val + ' months to breakeven';
          }
        },
        custom: function({series, seriesIndex, dataPointIndex, w}: any) {
          const vendor = displayVendors[dataPointIndex];
          let statusClass = 'text-red-500';
          let statusText = 'Poor';
          
          if (vendor.paybackPeriod <= goodThreshold) {
            statusClass = 'text-green-500';
            statusText = 'Excellent';
          } else if (vendor.paybackPeriod <= averageThreshold) {
            statusClass = 'text-yellow-500';
            statusText = 'Average';
          }
          
          return `
            <div class="bg-white p-3 rounded-lg shadow-md border border-gray-200">
              <div class="font-bold text-lg mb-1">${vendor.name}</div>
              <div class="text-sm mb-2">Payback Period: <span class="font-bold">${Math.round(vendor.paybackPeriod)} months</span></div>
              <div class="text-sm">ROI: <span class="font-bold">${Math.round(vendor.roi)}%</span></div>
              <div class="text-sm">Annual Savings: <span class="font-bold">${formatCurrency(vendor.totalSavings / 3)}</span></div>
              <div class="mt-2 ${statusClass} font-bold">${statusText}</div>
            </div>
          `;
        }
      },
      grid: {
        borderColor: '#f1f1f1',
        xaxis: {
          lines: {
            show: true
          }
        },
        padding: {
          top: 10,
          right: 10,
          bottom: 10,
          left: 10
        }
      },
      legend: {
        show: false
      },
      annotations: annotations,
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [0, 100]
        }
      }
    };
  }, [calculationResults, height]);
  
  // Get series data
  const series = useMemo(() => {
    if (!calculationResults || !calculationResults.vendorResults || calculationResults.vendorResults.length === 0) {
      return [];
    }
    
    // Get Portnox result
    const portnox = calculationResults.vendorResults.find((r: VendorResult) => r.vendorId === 'portnox');
    if (!portnox) return [];
    
    // Create comparison data
    const competitors = calculationResults.vendorResults
      .filter((r: VendorResult) => r.vendorId !== 'portnox')
      .sort((a: VendorResult, b: VendorResult) => a.paybackPeriod - b.paybackPeriod)
      .slice(0, 5); // Limit to top 5 for better readability
    
    // Combine Portnox first, then competitors
    const displayVendors = [portnox, ...competitors];
    
    // Prepare data
    const paybackData = displayVendors.map((vendor: VendorResult) => Math.round(vendor.paybackPeriod));
    
    return [{
      name: 'Payback Period',
      data: paybackData
    }];
  }, [calculationResults]);
  
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
