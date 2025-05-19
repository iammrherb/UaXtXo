// @ts-nocheck
import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { useCalculator } from '../../context/CalculatorContext';

interface RiskReductionChartProps {
  height?: number;
}

// Define VendorResult interface
interface VendorResult {
  vendorId: string;
  name: string;
  securityImprovement: number;
  riskReductionValue: number;
  featureScores: {
    threatPrevention: number;
    zeroTrust: number;
    deviceDiscovery: number;
  };
}

const RiskReductionChart: React.FC<RiskReductionChartProps> = ({ height = 350 }) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  
  // Use any type to bypass TypeScript checking for chart options
  const chartOptions: any = useMemo(() => {
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
      .sort((a: VendorResult, b: VendorResult) => b.securityImprovement - a.securityImprovement);
    
    // Prepare data
    const categories = sortedVendors.map((vendor: VendorResult) => vendor.name);
    const data = sortedVendors.map((vendor: VendorResult) => Math.round(vendor.securityImprovement));
    
    // Generate color palette with gradient
    const generateColors = () => {
      return sortedVendors.map((vendor: VendorResult, index: number) => {
        if (vendor.vendorId === 'portnox') return '#2BD25B';
        if (vendor.vendorId === 'no-nac') return '#E74C3C';
        
        // For others, create a gradient from blue to teal based on position
        const blueBase = 27 + (index * 10);  // 27, 37, 47, etc.
        return `#1${blueBase}7B2`;
      });
    };
    
    // Base risk level (without NAC)
    const noNacVendor = sortedVendors.find((v: VendorResult) => v.vendorId === 'no-nac');
    const baseRiskLevel = noNacVendor ? 0 : 25; // Baseline if no reference vendor
    
    // Add trend line for minimum acceptable security level
    const minimumSecurityLevel = 50; // Industry standard minimum
    
    // Create point annotations for Portnox only
    const pointAnnotations = [];
    const portnoxIndex = sortedVendors.findIndex((v: VendorResult) => v.vendorId === 'portnox');
    
    if (portnoxIndex !== -1) {
      const portnox = sortedVendors[portnoxIndex];
      pointAnnotations.push({
        x: portnox.name,
        y: portnox.securityImprovement,
        marker: {
          size: 6,
          fillColor: '#fff',
          strokeColor: '#2BD25B',
          strokeWidth: 2,
          radius: 2
        },
        label: {
          borderColor: '#2BD25B',
          style: {
            color: '#fff',
            background: '#2BD25B',
            padding: {
              left: 10,
              right: 10,
              top: 2,
              bottom: 2
            }
          },
          text: 'Recommended'
        }
      });
    }
    
    return {
      chart: {
        type: 'bar',
        height,
        stacked: false,
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false
          },
          export: {
            svg: {
              filename: 'risk-reduction-chart'
            },
            png: {
              filename: 'risk-reduction-chart'
            },
            csv: {
              filename: 'risk-reduction-data'
            }
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000,
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
          blur: 3,
          left: 0,
          top: 3
        },
        fontFamily: 'Nunito, sans-serif',
        background: 'transparent'
      },
      plotOptions: {
        bar: {
          distributed: true,
          columnWidth: '70%',
          borderRadius: 10,
          dataLabels: {
            position: 'top'
          },
          barHeight: '85%'
        }
      },
      colors: generateColors(),
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val + '%';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#444'],
          fontWeight: 'bold'
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 4,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: '#f0f0f0',
          opacity: 0.9
        }
      },
      states: {
        hover: {
          filter: {
            type: 'lighten',
            value: 0.12
          }
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'darken',
            value: 0.35
          }
        }
      },
      stroke: {
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories,
        position: 'bottom',
        labels: {
          rotate: -45,
          style: {
            fontSize: '12px',
            fontWeight: 'bold'
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        title: {
          text: 'Security Solutions',
          offsetY: 80,
          style: {
            fontSize: '14px',
            fontWeight: 'bold'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Security Risk Reduction (%)'
        },
        labels: {
          formatter: (val: number) => `${val}%`
        },
        min: 0,
        max: 100,
        tickAmount: 5
      },
      title: {
        text: 'Security Risk Reduction Comparison',
        align: 'center',
        style: {
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#333'
        },
        offsetY: 10
      },
      subtitle: {
        text: 'Higher percentage indicates better protection against security threats',
        align: 'center',
        style: {
          fontSize: '14px',
          color: '#666'
        },
        offsetY: 30
      },
      tooltip: {
        custom: function({series, seriesIndex, dataPointIndex, w}: any) {
          const vendor = sortedVendors[dataPointIndex];
          
          // For default tooltip fallback if vendor data is missing
          if (!vendor) {
            return `
              <div class="bg-white p-3 rounded-lg shadow-md">
                <div>${w.globals.labels[dataPointIndex]}</div>
                <div>Risk Reduction: ${series[seriesIndex][dataPointIndex]}%</div>
              </div>
            `;
          }
          
          // Calculate threat prevention score out of 100
          const threatScore = vendor.featureScores?.threatPrevention * 10 || 0;
          const zeroTrustScore = vendor.featureScores?.zeroTrust * 10 || 0;
          const discoveryScore = vendor.featureScores?.deviceDiscovery * 10 || 0;
          
          // Create rating text and color
          let ratingText = "Poor";
          let ratingColor = "text-red-600";
          
          if (vendor.securityImprovement >= 75) {
            ratingText = "Excellent";
            ratingColor = "text-green-600";
          } else if (vendor.securityImprovement >= 50) {
            ratingText = "Good";
            ratingColor = "text-blue-600";
          } else if (vendor.securityImprovement >= 30) {
            ratingText = "Average";
            ratingColor = "text-yellow-600";
          }
          
          // Create financial savings display
          const financialSavings = vendor.riskReductionValue ? 
            `$${(vendor.riskReductionValue / 1000).toFixed(0)}K` : 'N/A';
          
          return `
            <div class="bg-white p-3 rounded-lg shadow-md border border-gray-200" style="min-width: 200px;">
              <div class="font-bold text-lg mb-2">${vendor.name}</div>
              <div class="mb-1">Risk Reduction: <span class="font-bold">${Math.round(vendor.securityImprovement)}%</span></div>
              <div class="mb-1">Financial Impact: <span class="font-bold">${financialSavings}</span></div>
              <div class="mt-3 mb-1 font-bold text-sm">Capability Scores:</div>
              <div class="grid grid-cols-2 gap-1">
                <div class="text-xs">Threat Prevention:</div>
                <div class="text-xs flex items-center">
                  <div class="bg-gray-200 h-2 w-16 rounded overflow-hidden mr-1">
                    <div class="bg-blue-500 h-full" style="width: ${threatScore}%"></div>
                  </div>
                  ${threatScore}%
                </div>
                <div class="text-xs">Zero Trust:</div>
                <div class="text-xs flex items-center">
                  <div class="bg-gray-200 h-2 w-16 rounded overflow-hidden mr-1">
                    <div class="bg-purple-500 h-full" style="width: ${zeroTrustScore}%"></div>
                  </div>
                  ${zeroTrustScore}%
                </div>
                <div class="text-xs">Device Discovery:</div>
                <div class="text-xs flex items-center">
                  <div class="bg-gray-200 h-2 w-16 rounded overflow-hidden mr-1">
                    <div class="bg-green-500 h-full" style="width: ${discoveryScore}%"></div>
                  </div>
                  ${discoveryScore}%
                </div>
              </div>
              <div class="mt-2 ${ratingColor} font-bold text-right">${ratingText}</div>
            </div>
          `;
        }
      },
      grid: {
        borderColor: '#e0e0e0',
        strokeDashArray: 5,
        padding: {
          top: 0,
          right: 10,
          bottom: 30,
          left: 10
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.2,
          opacityFrom: 1,
          opacityTo: 0.85,
          stops: [0, 90, 100]
        }
      },
      annotations: {
        yaxis: [
          {
            y: minimumSecurityLevel,
            borderColor: '#FFC107',
            label: {
              borderColor: '#FFC107',
              style: {
                color: '#fff',
                background: '#FFC107'
              },
              text: 'Industry Minimum'
            }
          }
        ],
        points: pointAnnotations
      }
    };
  }, [calculationResults, height]);
  
  // Get series data
  const series = useMemo(() => {
    if (!calculationResults || !calculationResults.vendorResults || calculationResults.vendorResults.length === 0) {
      return [];
    }
    
    // Sort vendors by risk reduction (highest first)
    const sortedVendors = [...calculationResults.vendorResults]
      .sort((a: VendorResult, b: VendorResult) => b.securityImprovement - a.securityImprovement);
    
    // Prepare data
    const data = sortedVendors.map((vendor: VendorResult) => Math.round(vendor.securityImprovement));
    
    return [{
      name: 'Risk Reduction',
      data
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

export default RiskReductionChart;
