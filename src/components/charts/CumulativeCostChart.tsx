import React, { useState, useEffect, useRef } from 'react';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { useCalculator } from '../../context/CalculatorContext';
import { formatCurrency } from '../../utils/formatters';
import { VendorResult } from '../../utils/calculationEngine';

interface CumulativeCostChartProps {
  height?: number;
}

const CumulativeCostChart: React.FC<CumulativeCostChartProps> = ({ height = 350 }) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  const [animated, setAnimated] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  
  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Get chart data from calculation results
  const prepareChartData = () => {
    if (!calculationResults || !calculationResults.vendorResults) {
      const emptyOptions: ApexOptions = {
        chart: {
          type: 'area',
          height,
          fontFamily: 'Nunito, sans-serif',
          toolbar: {
            show: false
          },
          animations: {
            enabled: true,
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
        title: {
          text: 'Cumulative Cost Comparison',
          align: 'center',
          style: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#263238'
          }
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
      return emptyOptions;
    }
    
    // Get Portnox and competitors
    const portnox = calculationResults.vendorResults.find((v: VendorResult) => v.vendorId === 'portnox');
    if (!portnox) {
      return {
        chart: {
          type: 'area',
          height
        },
        series: [],
        xaxis: {
          categories: []
        }
      } as ApexOptions;
    }
    
    const competitors = calculationResults.vendorResults
      .filter((v: VendorResult) => v.vendorId !== 'portnox')
      .sort((a: VendorResult, b: VendorResult) => b.totalTco - a.totalTco)
      .slice(0, 3); // Limit to top 3 competitors for visual clarity
    
    // Prepare categories (years)
    const categories = ['Initial', 'Year 1', 'Year 2', 'Year 3'];
    
    // Prepare series data
    const portnoxCosts = [
      portnox.cumulativeCosts.initial,
      portnox.cumulativeCosts.year1,
      portnox.cumulativeCosts.year2,
      portnox.cumulativeCosts.year3
    ];
    
    // Calculate savings vs top competitor
    const topCompetitor = competitors[0];
    const savings = topCompetitor ? [
      topCompetitor.cumulativeCosts.initial - portnox.cumulativeCosts.initial,
      topCompetitor.cumulativeCosts.year1 - portnox.cumulativeCosts.year1,
      topCompetitor.cumulativeCosts.year2 - portnox.cumulativeCosts.year2,
      topCompetitor.cumulativeCosts.year3 - portnox.cumulativeCosts.year3
    ] : [];
    
    // Generate series
    const series = [
      {
        name: portnox.name,
        data: animated ? portnoxCosts : portnoxCosts.map(() => 0),
        type: 'area'
      }
    ];
    
    // Add savings area if there's a competitor
    if (topCompetitor) {
      series.push({
        name: 'Cumulative Savings',
        data: animated ? savings : savings.map(() => 0),
        type: 'area'
      });
    }
    
    // Add competitor lines
    competitors.forEach((competitor: VendorResult) => {
      const competitorCosts = [
        competitor.cumulativeCosts.initial,
        competitor.cumulativeCosts.year1,
        competitor.cumulativeCosts.year2,
        competitor.cumulativeCosts.year3
      ];
      
      series.push({
        name: competitor.name,
        data: animated ? competitorCosts : competitorCosts.map(() => 0),
        type: 'line'
      });
    });
    
    // Calculate the max value for y-axis
    const maxCost = Math.max(
      ...competitors.map(c => c.cumulativeCosts.year3),
      portnox.cumulativeCosts.year3
    );
    
    // Create annotations for key points
    const annotations: ApexOptions['annotations'] = {
      points: []
    };
    
    // Add final points annotation
    if (portnox) {
      annotations.points?.push({
        x: 'Year 3',
        y: portnox.cumulativeCosts.year3,
        marker: {
          size: 6,
          fillColor: '#2BD25B',
          strokeColor: '#fff',
          radius: 2
        },
        label: {
          borderColor: '#2BD25B',
          offsetY: 0,
          style: {
            color: '#fff',
            background: '#2BD25B'
          },
          text: `${formatCurrency(portnox.cumulativeCosts.year3)}`
        }
      });
    }
    
    if (topCompetitor) {
      annotations.points?.push({
        x: 'Year 3',
        y: topCompetitor.cumulativeCosts.year3,
        marker: {
          size: 6,
          fillColor: '#1B67B2',
          strokeColor: '#fff',
          radius: 2
        },
        label: {
          borderColor: '#1B67B2',
          offsetY: 0,
          style: {
            color: '#fff',
            background: '#1B67B2'
          },
          text: `${formatCurrency(topCompetitor.cumulativeCosts.year3)}`
        }
      });
      
      // Add savings annotation
      annotations.points?.push({
        x: 'Year 3',
        y: portnox.cumulativeCosts.year3 + (savings[3] / 2),
        marker: {
          size: 0,
          strokeWidth: 0
        },
        label: {
          borderColor: '#00E396',
          offsetY: 0,
          style: {
            color: '#fff',
            background: '#00E396'
          },
          text: `${formatCurrency(savings[3])} Savings`
        }
      });
    }
    
    const options: ApexOptions = {
      chart: {
        type: 'line',
        height,
        stacked: false,
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: false
        },
        animations: {
          enabled: true,
          speed: 1000,
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
      colors: ['#2BD25B', '#00E396', '#1B67B2', '#FF8042', '#7E36AF'],
      title: {
        text: 'Cumulative Cost Comparison',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#263238'
        }
      },
      stroke: {
        width: [4, 0, 3, 3, 3],
        curve: 'smooth',
        dashArray: [0, 0, 0, 0]
      },
      fill: {
        type: ['gradient', 'gradient', 'solid', 'solid', 'solid'],
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.5,
          opacityFrom: 0.7,
          opacityTo: 0.2,
          stops: [0, 100]
        }
      },
      xaxis: {
        categories: categories,
        title: {
          text: 'Time Period',
          style: {
            fontSize: '12px',
            fontWeight: 'normal'
          }
        },
        labels: {
          style: {
            fontWeight: 'bold',
            colors: '#424242'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Cumulative Cost ($)',
          style: {
            fontSize: '12px',
            fontWeight: 'normal'
          }
        },
        min: 0,
        max: maxCost * 1.1, // Add some padding to the top
        tickAmount: 5,
        labels: {
          formatter: (val: number) => formatCurrency(val),
          style: {
            colors: '#424242'
          }
        }
      },
      markers: {
        size: 4,
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: {
          size: 7
        }
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (val: number) => formatCurrency(val)
        }
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        offsetY: 5
      },
      grid: {
        borderColor: '#e0e0e0',
        row: {
          colors: ['#f8f8f8', 'transparent'],
          opacity: 0.5
        }
      },
      annotations: annotations
    };
    
    return options;
  };
  
  const chartOptions = prepareChartData();
  
  if (!calculationResults || !calculationResults.vendorResults) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center" ref={chartRef}>
        <div className="text-5xl mb-4">📊</div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Cumulative Cost Analysis</h3>
        <p className="text-gray-600 dark:text-gray-400">
          No data available. Please calculate results first.
        </p>
      </div>
    );
  }
  
  const portnox = calculationResults.vendorResults.find((v: VendorResult) => v.vendorId === 'portnox');
  if (!portnox) return null;
  
  const competitors = calculationResults.vendorResults
    .filter((v: VendorResult) => v.vendorId !== 'portnox')
    .sort((a: VendorResult, b: VendorResult) => b.totalTco - a.totalTco)
    .slice(0, 1);
  
  const topCompetitor = competitors[0];
  const savings = topCompetitor ? 
    topCompetitor.cumulativeCosts.year3 - portnox.cumulativeCosts.year3 : 0;
  const savingsPercentage = topCompetitor ? 
    (savings / topCompetitor.cumulativeCosts.year3) * 100 : 0;
  
  return (
    <div className="chart-container bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm" ref={chartRef}>
      <Chart
        options={chartOptions}
        series={(chartOptions.series as any) || []}
        type="line"
        height={height}
      />
      
      {/* Key Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="text-md font-medium mb-1 text-green-800 dark:text-green-400">Total 3-Year Savings</h4>
          <div className="text-2xl font-bold text-green-600 dark:text-green-300 mb-1">
            {formatCurrency(savings)}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            vs. {topCompetitor?.name || 'alternatives'}
          </p>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="text-md font-medium mb-1 text-blue-800 dark:text-blue-400">TCO Reduction</h4>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-300 mb-1">
            {Math.round(savingsPercentage)}%
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Lower 3-year total cost of ownership
          </p>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h4 className="text-md font-medium mb-1 text-purple-800 dark:text-purple-400">Annual Cost</h4>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-300 mb-1">
            {formatCurrency(portnox.totalTco / 3)}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Average per year
          </p>
        </div>
      </div>
      
      {/* Explanation */}
      <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <h4 className="text-md font-medium mb-2 text-gray-800 dark:text-gray-200">Cost Analysis Insights</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Portnox Cloud delivers significantly lower total cost of ownership compared to traditional NAC solutions. The key savings drivers include:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start">
            <div className="text-green-500 mr-2 mt-0.5">✓</div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">No hardware costs</span>
              <span className="text-gray-600 dark:text-gray-400"> - Cloud architecture eliminates appliance expenditures</span>
            </div>
          </div>
          <div className="flex items-start">
            <div className="text-green-500 mr-2 mt-0.5">✓</div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Lower implementation costs</span>
              <span className="text-gray-600 dark:text-gray-400"> - 75% faster deployment with less professional services</span>
            </div>
          </div>
          <div className="flex items-start">
            <div className="text-green-500 mr-2 mt-0.5">✓</div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Reduced IT staffing requirements</span>
              <span className="text-gray-600 dark:text-gray-400"> - Simplified management requires fewer resources</span>
            </div>
          </div>
          <div className="flex items-start">
            <div className="text-green-500 mr-2 mt-0.5">✓</div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Predictable subscription model</span>
              <span className="text-gray-600 dark:text-gray-400"> - No surprise upgrade or maintenance costs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CumulativeCostChart;
