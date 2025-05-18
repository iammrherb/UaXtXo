import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { useCalculator } from '../../context/CalculatorContext';
import { VendorResult } from '../../utils/calculationEngine';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface CompetitiveAdvantageChartProps {
  height?: number;
}

const CompetitiveAdvantageChart: React.FC<CompetitiveAdvantageChartProps> = ({ height = 350 }) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  
  const chartOptions = useMemo(() => {
    if (!calculationResults || !calculationResults.vendorResults) {
      return {
        chart: {
          type: 'radar',
          height,
          fontFamily: 'Nunito, sans-serif',
          toolbar: {
            show: false
          }
        },
        title: {
          text: 'Competitive Advantage Analysis',
          align: 'center'
        },
        subtitle: {
          text: 'No data available. Please calculate results first.',
          align: 'center'
        },
        series: [],
        labels: []
      };
    }
    
    // Get Portnox and top 2 competitors
    const portnox = calculationResults.vendorResults.find((v: VendorResult) => v.vendorId === 'portnox');
    if (!portnox) return { chart: { type: 'radar' }, series: [], labels: [] };
    
    const competitors = calculationResults.vendorResults
      .filter((v: VendorResult) => v.vendorId !== 'portnox')
      .sort((a: VendorResult, b: VendorResult) => b.totalTco - a.totalTco)
      .slice(0, 2);
    
    // Define key competitive advantages to highlight
    const categories = [
      'Cloud Architecture', 
      'Zero Trust', 
      'Deployment Speed', 
      'Management Simplicity',
      'Total Cost',
      'Risk Reduction',
      'Feature Coverage',
      'Future Readiness'
    ];
    
    // Map feature scores to competitive advantages
    // Scale from 0-10 to 0-100 for better visualization
    const portnoxData = [
      portnox.featureScores.cloudNative * 10,
      portnox.featureScores.zeroTrust * 10,
      portnox.featureScores.deploymentSpeed * 10,
      portnox.featureScores.managementSimplicity * 10,
      100 - ((portnox.totalTco / (competitors[0]?.totalTco || portnox.totalTco * 1.5)) * 100),
      portnox.securityImprovement,
      portnox.featureScores.thirdPartyIntegration * 10,
      90 // Future readiness - scored high for cloud solutions
    ];
    
    // Generate series for competitive chart
    const series = [
      {
        name: portnox.name,
        data: portnoxData
      }
    ];
    
    // Add series for each competitor
    competitors.forEach((competitor: VendorResult) => {
      const competitorData = [
        competitor.featureScores.cloudNative * 10,
        competitor.featureScores.zeroTrust * 10,
        competitor.featureScores.deploymentSpeed * 10,
        competitor.featureScores.managementSimplicity * 10,
        100 - ((competitor.totalTco / (competitors[0]?.totalTco || competitor.totalTco)) * 100),
        competitor.securityImprovement,
        competitor.featureScores.thirdPartyIntegration * 10,
        competitor.deployment === 'cloud' ? 80 : 
          competitor.deployment === 'hybrid' ? 60 : 40
      ];
      
      series.push({
        name: competitor.name,
        data: competitorData
      });
    });
    
    return {
      chart: {
        type: 'radar',
        height,
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        },
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: false
        }
      },
      title: {
        text: 'Competitive Advantage Analysis',
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
        opacity: 0.15
      },
      markers: {
        size: 5,
        hover: {
          size: 8
        }
      },
      colors: ['#2BD25B', '#1B67B2', '#FF8042'],
      xaxis: {
        categories: categories
      },
      yaxis: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        radar: {
          size: 130,
          polygons: {
            strokeColors: '#e9e9e9',
            fill: {
              colors: ['#f8f8f8', '#fff']
            }
          }
        }
      },
      tooltip: {
        y: {
          formatter: (val: number) => `${val.toFixed(1)}%`
        }
      },
      legend: {
        position: 'bottom'
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 320
            }
          }
        }
      ],
      series
    };
  }, [calculationResults, height]);
  
  return (
    <div className="chart-container">
      <Chart
        options={chartOptions}
        series={chartOptions.series || []}
        type="radar"
        height={height}
      />
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 className="text-md font-medium mb-2">Competitive Analysis Insights</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Portnox Cloud demonstrates significant advantages in cloud architecture, deployment speed,
          and management simplicity—key factors that directly impact total cost of ownership and
          operational overhead. The cloud-native approach eliminates hardware costs and complex
          upgrades while providing built-in scalability and continuous security improvements.
        </p>
      </div>
    </div>
  );
};

export default CompetitiveAdvantageChart;
