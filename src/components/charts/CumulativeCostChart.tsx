import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { useCalculator } from '../../context/CalculatorContext';
import { formatCurrency } from '../../utils/formatters';

interface CumulativeCostChartProps {
  height?: number;
}

const CumulativeCostChart: React.FC<CumulativeCostChartProps> = ({ height = 350 }) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  
  const chartOptions = useMemo(() => {
    if (!calculationResults || !calculationResults.vendorResults || calculationResults.vendorResults.length === 0) {
      return {
        chart: {
          type: 'line',
          height,
          fontFamily: 'Nunito, sans-serif',
          toolbar: {
            show: false
          }
        },
        title: {
          text: 'Cumulative Cost Comparison'
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
        },
        series: []
      };
    }
    
    // Limit to top 4 vendors + Portnox for better readability
    const portnox = calculationResults.vendorResults.find(r => r.vendorId === 'portnox');
    const otherVendors = calculationResults.vendorResults
      .filter(r => r.vendorId !== 'portnox')
      .sort((a, b) => a.totalTco - b.totalTco)
      .slice(0, 4);
    
    const displayVendors = portnox ? [portnox, ...otherVendors] : otherVendors;
    
    // Prepare series data
    const series = displayVendors.map(vendor => ({
      name: vendor.name,
      data: [
        Math.round(vendor.cumulativeCosts.initial),
        Math.round(vendor.cumulativeCosts.year1),
        Math.round(vendor.cumulativeCosts.year2),
        Math.round(vendor.cumulativeCosts.year3)
      ]
    }));
    
    // Calculate max cost for y-axis scaling
    const competitors = displayVendors.filter(v => v.vendorId !== 'portnox');
    let maxCost = 0;
    
    if (portnox) {
      maxCost = portnox.cumulativeCosts.year3;
    }
    
    if (competitors.length > 0) {
      const competitorMaxCost = Math.max(
        ...competitors.map((c: typeof portnox) => c.cumulativeCosts.year3)
      );
      maxCost = Math.max(maxCost, competitorMaxCost);
    }
    
    // Add 10% padding to the max cost
    const yAxisMax = maxCost * 1.1;
    
    return {
      chart: {
        type: 'line',
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
        dropShadow: {
          enabled: true,
          opacity: 0.3,
          blur: 5,
          left: 0,
          top: 0
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
        }
      },
      colors: displayVendors.map(vendor => 
        vendor.vendorId === 'portnox' ? '#2BD25B' : '#1B67B2'
      ),
      stroke: {
        width: displayVendors.map(vendor => 
          vendor.vendorId === 'portnox' ? 4 : 2
        ),
        curve: 'smooth'
      },
      markers: {
        size: 5,
        colors: displayVendors.map(vendor => 
          vendor.vendorId === 'portnox' ? '#2BD25B' : '#1B67B2'
        ),
        strokeWidth: 0
      },
      xaxis: {
        categories: ['Initial', 'Year 1', 'Year 2', 'Year 3']
      },
      yaxis: {
        title: {
          text: 'Cumulative Cost ($)'
        },
        min: 0,
        max: yAxisMax,
        tickAmount: 5,
        labels: {
          formatter: (val: number) => {
            return '$' + new Intl.NumberFormat('en-US').format(val);
          }
        }
      },
      title: {
        text: 'Cumulative Cost Comparison',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 'bold'
        }
      },
      tooltip: {
        y: {
          formatter: (val: number) => {
            return '$' + new Intl.NumberFormat('en-US').format(val);
          }
        }
      },
      legend: {
        position: 'top'
      },
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
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.5,
          opacityFrom: 0.7,
          opacityTo: 0.2,
          stops: [0, 90, 100]
        }
      },
      series
    };
  }, [calculationResults, height]);
  
  return (
    <div className="chart-container">
      <Chart
        options={chartOptions}
        series={chartOptions.series || []}
        type="line"
        height={height}
      />
    </div>
  );
};

export default CumulativeCostChart;
