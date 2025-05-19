// @ts-nocheck
import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { useCalculator } from '../../context/CalculatorContext';
import { formatCurrency, formatPercentage, formatDays } from '../../utils/formatters';
import { ApexOptions } from 'apexcharts';

interface ExecutiveSummaryChartProps {
  height?: number;
}

// Define the interface for vendor results
interface VendorResult {
  vendorId: string;
  name: string;
  totalTco: number;
  implementationDays: number;
  roi: number;
  paybackPeriod: number;
  securityImprovement: number;
}

const ExecutiveSummaryChart: React.FC<ExecutiveSummaryChartProps> = ({ height = 350 }) => {
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
          text: 'Executive Summary'
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
    
    // Get Portnox results
    const portnox = calculationResults.vendorResults.find((r: VendorResult) => r.vendorId === 'portnox');
    
    if (!portnox) return {
      chart: {
        type: 'bar' as const,
        height,
        fontFamily: 'Nunito, sans-serif'
      },
      title: {
        text: 'Executive Summary'
      },
      subtitle: {
        text: 'No Portnox data available.'
      },
      xaxis: {
        categories: []
      },
      series: []
    };
    
    // Get competitors (all non-Portnox vendors)
    const competitors = calculationResults.vendorResults.filter((r: VendorResult) => r.vendorId !== 'portnox');
    
    // Average competitor values
    const avgCompetitorTco = competitors.length > 0
      ? competitors.reduce((sum: number, vendor: VendorResult) => sum + vendor.totalTco, 0) / competitors.length
      : portnox.totalTco * 1.5;
    
    const avgCompetitorImplementation = competitors.length > 0
      ? competitors.reduce((sum: number, vendor: VendorResult) => sum + vendor.implementationDays, 0) / competitors.length
      : portnox.implementationDays * 3;
    
    const avgCompetitorRoi = competitors.length > 0
      ? competitors.reduce((sum: number, vendor: VendorResult) => sum + vendor.roi, 0) / competitors.length
      : portnox.roi / 2;
    
    const avgCompetitorPayback = competitors.length > 0
      ? competitors.reduce((sum: number, vendor: VendorResult) => sum + vendor.paybackPeriod, 0) / competitors.length
      : portnox.paybackPeriod * 2.5;
    
    const avgCompetitorSecurity = competitors.length > 0
      ? competitors.reduce((sum: number, vendor: VendorResult) => sum + vendor.securityImprovement, 0) / competitors.length
      : portnox.securityImprovement / 1.5;
    
    // Calculate comparison metrics
    const categories = ['TCO Savings', 'Implementation', 'ROI', 'Payback', 'Security'];
    
    const seriesData = [
      {
        name: 'Portnox Advantage',
        data: [
          Math.round(avgCompetitorTco - portnox.totalTco), // TCO Savings
          Math.round(avgCompetitorImplementation - portnox.implementationDays), // Implementation Days Saved
          Math.round(portnox.roi - avgCompetitorRoi), // ROI Difference
          Math.round(avgCompetitorPayback - portnox.paybackPeriod), // Payback Period Reduction
          Math.round(portnox.securityImprovement - avgCompetitorSecurity) // Security Improvement
        ]
      }
    ];
    
    return {
      chart: {
        type: 'bar' as const,
        height,
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false
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
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '60%',
          borderRadius: 8,
          distributed: true,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val: number, opts: any) {
          const metric = categories[opts.dataPointIndex];
          if (metric === 'TCO Savings') return formatCurrency(val);
          if (metric === 'Implementation') return `${val} days`;
          if (metric === 'ROI') return `${val}%`;
          if (metric === 'Payback') return `${val} months`;
          if (metric === 'Security') return `${val}%`;
          return val.toString();
        },
        style: {
          fontSize: '12px',
          colors: ['#333']
        }
      },
      title: {
        text: 'Portnox Competitive Advantages',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 'bold'
        }
      },
      subtitle: {
        text: 'Comparison with Average Competitor',
        align: 'center'
      },
      colors: ['#2BD25B', '#2BD25B', '#2BD25B', '#2BD25B', '#2BD25B'],
      xaxis: {
        categories: categories,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      grid: {
        show: false
      },
      tooltip: {
        y: {
          formatter: function(val: number, opts: any) {
            const metric = categories[opts.dataPointIndex];
            if (metric === 'TCO Savings') return formatCurrency(val);
            if (metric === 'Implementation') return `${val} days faster implementation`;
            if (metric === 'ROI') return `${val}% higher ROI`;
            if (metric === 'Payback') return `${val} months quicker payback`;
            if (metric === 'Security') return `${val}% better security`;
            return val.toString();
          }
        }
      }
    };
  }, [calculationResults, height]);
  
  // Get series data
  const series = useMemo(() => {
    if (!calculationResults || !calculationResults.vendorResults || calculationResults.vendorResults.length === 0) {
      return [];
    }
    
    // Get Portnox results
    const portnox = calculationResults.vendorResults.find((r: VendorResult) => r.vendorId === 'portnox');
    
    if (!portnox) return [];
    
    // Get competitors (all non-Portnox vendors)
    const competitors = calculationResults.vendorResults.filter((r: VendorResult) => r.vendorId !== 'portnox');
    
    // Average competitor values
    const avgCompetitorTco = competitors.length > 0
      ? competitors.reduce((sum: number, vendor: VendorResult) => sum + vendor.totalTco, 0) / competitors.length
      : portnox.totalTco * 1.5;
    
    const avgCompetitorImplementation = competitors.length > 0
      ? competitors.reduce((sum: number, vendor: VendorResult) => sum + vendor.implementationDays, 0) / competitors.length
      : portnox.implementationDays * 3;
    
    const avgCompetitorRoi = competitors.length > 0
      ? competitors.reduce((sum: number, vendor: VendorResult) => sum + vendor.roi, 0) / competitors.length
      : portnox.roi / 2;
    
    const avgCompetitorPayback = competitors.length > 0
      ? competitors.reduce((sum: number, vendor: VendorResult) => sum + vendor.paybackPeriod, 0) / competitors.length
      : portnox.paybackPeriod * 2.5;
    
    const avgCompetitorSecurity = competitors.length > 0
      ? competitors.reduce((sum: number, vendor: VendorResult) => sum + vendor.securityImprovement, 0) / competitors.length
      : portnox.securityImprovement / 1.5;
    
    return [
      {
        name: 'Portnox Advantage',
        data: [
          Math.round(avgCompetitorTco - portnox.totalTco), // TCO Savings
          Math.round(avgCompetitorImplementation - portnox.implementationDays), // Implementation Days Saved
          Math.round(portnox.roi - avgCompetitorRoi), // ROI Difference
          Math.round(avgCompetitorPayback - portnox.paybackPeriod), // Payback Period Reduction
          Math.round(portnox.securityImprovement - avgCompetitorSecurity) // Security Improvement
        ]
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

export default ExecutiveSummaryChart;
