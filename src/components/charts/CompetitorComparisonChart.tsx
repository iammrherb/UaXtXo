// @ts-nocheck
import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { useCalculator } from '../../context/CalculatorContext';
import { formatCurrency } from '../../utils/formatters';

interface CompetitorComparisonChartProps {
  height?: number;
}

// Define VendorResult interface
interface VendorResult {
  vendorId: string;
  name: string;
  totalTco: number;
  costBreakdown: {
    licenses: number;
    maintenance: number;
    implementation: number;
    operations: number;
    hardware: number;
    infrastructure: number;
  };
}

const CompetitorComparisonChart: React.FC<CompetitorComparisonChartProps> = ({ height = 350 }) => {
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
          toolbar: {
            show: false
          }
        },
        title: {
          text: 'Competitor Comparison'
        },
        subtitle: {
          text: 'No data available. Please calculate results first.'
        },
        xaxis: {
          categories: []
        },
        yaxis: {
          title: {
            text: 'Total Cost ($)'
          }
        }
      };
    }
    
    // Sort vendors by TCO (lowest first)
    const sortedVendors = [...calculationResults.vendorResults]
      .sort((a: VendorResult, b: VendorResult) => a.totalTco - b.totalTco);
    
    // Prepare categories (vendor names) and series data
    const categories = sortedVendors.map((vendor: VendorResult) => vendor.name);
    
    // Create series for stacked bar chart - each cost component
    const licenseData = sortedVendors.map((vendor: VendorResult) => vendor.costBreakdown.licenses || 0);
    const maintenanceData = sortedVendors.map((vendor: VendorResult) => vendor.costBreakdown.maintenance || 0);
    const implementationData = sortedVendors.map((vendor: VendorResult) => vendor.costBreakdown.implementation || 0);
    const operationsData = sortedVendors.map((vendor: VendorResult) => vendor.costBreakdown.operations || 0);
    const hardwareData = sortedVendors.map((vendor: VendorResult) => vendor.costBreakdown.hardware || 0);
    const infrastructureData = sortedVendors.map((vendor: VendorResult) => vendor.costBreakdown.infrastructure || 0);
    
    // Find Portnox vendor index
    const portnoxIndex = sortedVendors.findIndex((vendor: VendorResult) => vendor.vendorId === 'portnox');
    
    return {
      chart: {
        type: 'bar',
        height,
        stacked: true,
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: false
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
          top: 3
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '70%',
          borderRadius: 5,
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#333'
              },
              formatter: function(val: number) {
                return formatCurrency(val);
              }
            }
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            fontSize: '12px'
          },
          rotate: -45,
          rotateAlways: false,
          trim: false
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
          text: 'Total Cost of Ownership (3-Year)',
          style: {
            fontSize: '14px',
            fontWeight: 'bold'
          }
        },
        labels: {
          formatter: function(val: number) {
            return formatCurrency(val);
          }
        }
      },
      title: {
        text: '3-Year TCO Comparison',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#333'
        }
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '13px',
        markers: {
          radius: 12
        }
      },
      tooltip: {
        y: {
          formatter: function(val: number) {
            return formatCurrency(val);
          }
        },
        shared: true,
        intersect: false
      },
      colors: [
        '#8884D8', // Licenses
        '#FFC658', // Maintenance
        '#82CA9D', // Implementation
        '#FF8042', // Operations
        '#F25C78', // Hardware
        '#5CC8FF'  // Infrastructure
      ],
      grid: {
        borderColor: '#e0e0e0',
        strokeDashArray: 5,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 10
        }
      },
      fill: {
        opacity: 1
      },
      annotations: {
        points: portnoxIndex >= 0 ? [
          {
            x: categories[portnoxIndex],
            y: sortedVendors[portnoxIndex].totalTco,
            marker: {
              size: 0
            },
            label: {
              borderColor: '#2BD25B',
              style: {
                color: '#fff',
                background: '#2BD25B'
              },
              text: 'Recommended'
            }
          }
        ] : []
      },
      states: {
        hover: {
          filter: {
            type: 'darken',
            value: 0.1
          }
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'darken',
            value: 0.35
          }
        }
      }
    };
  }, [calculationResults, height]);
  
  // Prepare series data for the chart
  const series = useMemo(() => {
    if (!calculationResults || !calculationResults.vendorResults || calculationResults.vendorResults.length === 0) {
      return [];
    }
    
    // Sort vendors by TCO (lowest first)
    const sortedVendors = [...calculationResults.vendorResults]
      .sort((a: VendorResult, b: VendorResult) => a.totalTco - b.totalTco);
    
    // Create series for stacked bar chart - each cost component
    const licenseData = sortedVendors.map((vendor: VendorResult) => vendor.costBreakdown.licenses || 0);
    const maintenanceData = sortedVendors.map((vendor: VendorResult) => vendor.costBreakdown.maintenance || 0);
    const implementationData = sortedVendors.map((vendor: VendorResult) => vendor.costBreakdown.implementation || 0);
    const operationsData = sortedVendors.map((vendor: VendorResult) => vendor.costBreakdown.operations || 0);
    const hardwareData = sortedVendors.map((vendor: VendorResult) => vendor.costBreakdown.hardware || 0);
    const infrastructureData = sortedVendors.map((vendor: VendorResult) => vendor.costBreakdown.infrastructure || 0);
    
    return [
      {
        name: 'Licenses & Subscriptions',
        data: licenseData
      },
      {
        name: 'Maintenance',
        data: maintenanceData
      },
      {
        name: 'Implementation',
        data: implementationData
      },
      {
        name: 'Operations',
        data: operationsData
      },
      {
        name: 'Hardware',
        data: hardwareData
      },
      {
        name: 'Infrastructure',
        data: infrastructureData
      }
    ];
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

export default CompetitorComparisonChart;
