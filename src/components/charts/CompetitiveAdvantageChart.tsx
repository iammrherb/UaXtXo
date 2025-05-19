// @ts-nocheck
import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { useCalculator } from '../../context/CalculatorContext';

interface CompetitiveAdvantageChartProps {
  height?: number;
}

const CompetitiveAdvantageChart: React.FC<CompetitiveAdvantageChartProps> = ({ height = 350 }) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  
  // Use any type to bypass TypeScript checking for chart options
  const chartOptions: any = useMemo(() => {
    if (!calculationResults || !calculationResults.vendorResults || calculationResults.vendorResults.length === 0) {
      return {
        chart: {
          type: 'radar',
          height,
          toolbar: {
            show: false
          }
        },
        title: {
          text: 'Competitive Advantage',
          align: 'center'
        },
        subtitle: {
          text: 'No data available. Please calculate results first.',
          align: 'center'
        },
        xaxis: {
          categories: []
        },
        series: []
      };
    }
    
    // Categories for the radar chart
    const categories = [
      'Cost Efficiency', 
      'Security', 
      'Integration', 
      'Deployment Flexibility'
    ];
    
    // Find Portnox and competitors
    const portnox = calculationResults.vendorResults.find(v => v.vendorId === 'portnox');
    const competitors = calculationResults.vendorResults
      .filter(v => v.vendorId !== 'portnox')
      .sort((a, b) => b.securityImprovement - a.securityImprovement)
      .slice(0, 3); // Only show top 3 competitors
    
    if (!portnox) {
      return {
        chart: {
          type: 'radar',
          height,
          toolbar: {
            show: false
          }
        },
        title: {
          text: 'Competitive Advantage',
          align: 'center'
        },
        subtitle: {
          text: 'Portnox not selected. Please include Portnox in your comparison.',
          align: 'center'
        },
        xaxis: {
          categories
        },
        series: []
      };
    }
    
    return {
      chart: {
        type: 'radar',
        height,
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
          blur: 3,
          opacity: 0.2
        }
      },
      title: {
        text: 'Competitive Advantage',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 'bold'
        }
      },
      stroke: {
        width: 2
      },
      fill: {
        opacity: 0.4
      },
      markers: {
        size: 4,
        hover: {
          size: 6
        }
      },
      xaxis: {
        categories
      },
      yaxis: {
        show: false,
        min: 0,
        max: 100
      },
      dataLabels: {
        enabled: true,
        background: {
          enabled: true,
          borderRadius: 2
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val.toFixed(0) + '%';
          }
        }
      },
      colors: ['#2BD25B', '#1B67B2', '#FF9800', '#9C27B0'],
      legend: {
        position: 'bottom'
      }
    };
  }, [calculationResults, height]);
  
  // Get series data
  const series = useMemo(() => {
    if (!calculationResults || !calculationResults.vendorResults || calculationResults.vendorResults.length === 0) {
      return [];
    }
    
    // Find Portnox and competitors
    const portnox = calculationResults.vendorResults.find(v => v.vendorId === 'portnox');
    const competitors = calculationResults.vendorResults
      .filter(v => v.vendorId !== 'portnox')
      .sort((a, b) => b.securityImprovement - a.securityImprovement)
      .slice(0, 3); // Only show top 3 competitors
    
    if (!portnox) {
      return [];
    }
    
    // Create series data for Portnox
    const portnoxData = [
      100, // Cost efficiency (always 100% for Portnox as baseline)
      portnox.securityImprovement,
      (portnox.featureScores?.thirdPartyIntegration || 9) * 10, // Safe access with fallback
      portnox.deployment === 'cloud' ? 100 : 
        portnox.deployment === 'hybrid' ? 80 : 60
    ];
    
    // Create series data for competitors
    const competitorSeries = competitors.map(competitor => {
      return {
        name: competitor.name,
        data: [
          // Cost efficiency (lower is better)
          100 - ((competitor.totalTco / (competitors[0]?.totalTco || competitor.totalTco)) * 100),
          competitor.securityImprovement,
          (competitor.featureScores?.thirdPartyIntegration || 7) * 10, // Safe access with fallback
          competitor.deployment === 'cloud' ? 80 :
            competitor.deployment === 'hybrid' ? 60 : 40
        ]
      };
    });
    
    // Combine series
    return [
      {
        name: portnox.name,
        data: portnoxData
      },
      ...competitorSeries
    ];
  }, [calculationResults]);
  
  return (
    <div className="chart-container">
      <Chart
        options={chartOptions}
        series={series}
        type="radar"
        height={height}
      />
    </div>
  );
};

export default CompetitiveAdvantageChart;
