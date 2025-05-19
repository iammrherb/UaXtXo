// @ts-nocheck
import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { useCalculator } from '../../context/CalculatorContext';
import { formatCurrency } from '../../utils/formatters';

interface RoiChartProps {
  height?: number;
}

// Define VendorResult interface
interface VendorResult {
  vendorId: string;
  name: string;
  roi: number;
  totalTco: number;
  totalSavings: number;
}

const RoiChart: React.FC<RoiChartProps> = ({ height = 350 }) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  
  // Use any type to bypass TypeScript checking for chart options
  const chartOptions: any = useMemo(() => {
    if (!calculationResults || !calculationResults.vendorResults || calculationResults.vendorResults.length === 0) {
      return {
        chart: {
          type: 'bar',
          height,
          fontFamily: 'Nunito, sans-serif',
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
          }
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
      .sort((a: VendorResult, b: VendorResult) => {
        if (a.vendorId === 'portnox') return -1;
        if (b.vendorId === 'portnox') return 1;
        return b.roi - a.roi;
      });
    
    // Prepare categories and data
    const categories = sortedVendors.map((vendor: VendorResult) => vendor.name);
    const roiData = sortedVendors.map((vendor: VendorResult) => Math.round(vendor.roi));
    
    // Good/Average thresholds
    const excellentThreshold = 200; // 200%+ ROI is excellent
    const goodThreshold = 100; // 100%+ ROI is good
    
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
          borderRadius: 8,
          dataLabels: {
            position: 'top',
          },
          barHeight: '70%',
          distributed: true
        }
      },
      colors: sortedVendors.map((vendor: VendorResult) => {
        if (vendor.vendorId === 'portnox') return '#2BD25B';
        if (vendor.roi >= excellentThreshold) return '#4CAF50';
        if (vendor.roi >= goodThreshold) return '#FFC107';
        return '#FF5252';
      }),
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val + '%';
        },
        offsetX: 5,
        style: {
          fontSize: '12px',
          colors: ['#000'],
          fontWeight: 'bold'
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 4,
          borderRadius: 4,
          borderWidth: 1,
          dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 1,
            opacity: 0.1
          }
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: categories,
        labels: {
          formatter: function (val: number) {
            return val + '%';
          },
          style: {
            fontSize: '12px'
          }
        },
        title: {
          text: 'Return on Investment (%)',
          style: {
            fontSize: '14px',
            fontWeight: 'bold'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Solutions',
          style: {
            fontSize: '14px',
            fontWeight: 'bold'
          }
        }
      },
      title: {
        text: '3-Year ROI Comparison',
        align: 'center',
        style: {
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#333'
        }
      },
      subtitle: {
        text: 'Higher percentage indicates better return on investment',
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
            return val + '% ROI';
          }
        },
        custom: function({series, seriesIndex, dataPointIndex, w}: any) {
          const vendor = sortedVendors[dataPointIndex];
          
          // For default tooltip fallback if vendor data is missing
          if (!vendor) {
            return `
              <div class="bg-white p-3 rounded-lg shadow-md">
                <div>${w.globals.labels[dataPointIndex]}</div>
                <div>ROI: ${series[seriesIndex][dataPointIndex]}%</div>
              </div>
            `;
          }
          
          // Create rating text and color
          let ratingText = "Poor";
          let ratingColor = "text-red-600";
          
          if (vendor.roi >= excellentThreshold) {
            ratingText = "Excellent";
            ratingColor = "text-green-600";
          } else if (vendor.roi >= goodThreshold) {
            ratingText = "Good";
            ratingColor = "text-yellow-600";
          }
          
          return `
            <div class="bg-white p-3 rounded-lg shadow-md border border-gray-200" style="min-width: 200px;">
              <div class="font-bold text-lg mb-2">${vendor.name}</div>
              <div class="mb-1">ROI: <span class="font-bold">${Math.round(vendor.roi)}%</span></div>
              <div class="mb-1">Total Cost: <span class="font-bold">${formatCurrency(vendor.totalTco)}</span></div>
              <div class="mb-1">Total Savings: <span class="font-bold">${formatCurrency(vendor.totalSavings)}</span></div>
              <div class="mt-2 ${ratingColor} font-bold text-right">${ratingText}</div>
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
      annotations: {
        xaxis: [
          {
            x: 100,
            borderColor: '#FFC107',
            label: {
              borderColor: '#FFC107',
              style: {
                color: '#fff',
                background: '#FFC107'
              },
              text: 'Good ROI'
            }
          },
          {
            x: 200,
            borderColor: '#4CAF50',
            label: {
              borderColor: '#4CAF50',
              style: {
                color: '#fff',
                background: '#4CAF50'
              },
              text: 'Excellent ROI'
            }
          }
        ]
      },
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
    
    // Sort vendors by ROI (Portnox always first)
    const sortedVendors = [...calculationResults.vendorResults]
      .sort((a: VendorResult, b: VendorResult) => {
        if (a.vendorId === 'portnox') return -1;
        if (b.vendorId === 'portnox') return 1;
        return b.roi - a.roi;
      });
    
    // Prepare ROI data
    const roiData = sortedVendors.map((vendor: VendorResult) => Math.round(vendor.roi));
    
    return [{
      name: 'ROI (%)',
      data: roiData
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

export default RoiChart;
