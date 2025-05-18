import React, { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useCalculator } from '../../context/CalculatorContext';
import { formatCurrency } from '../../utils/formatters';
import { CalculationResults } from '../../utils/calculationEngine';

interface TcoComparisonChartProps {
  height?: number;
}

// Define vendor result interface
interface VendorResult {
  vendorId: string;
  name: string;
  hardwareCost: number;
  infrastructureCost: number;
  implementationCost: number;
  staffingCost: number;
  licenseCost: number;
  subscriptionCost: number;
  maintenanceCost: number;
  totalTco: number;
  [key: string]: any;
}

// Define chart options interface
interface HighchartsOptions {
  chart: {
    type: string;
    height?: number;
    style?: {
      fontFamily: string;
    };
  };
  title: {
    text: string;
  };
  subtitle?: {
    text: string;
  };
  xAxis: {
    categories: string[];
    crosshair?: boolean;
  };
  yAxis: {
    min: number;
    title: {
      text: string;
    };
    labels?: {
      formatter?: () => string;
    };
  };
  tooltip?: {
    headerFormat: string;
    pointFormat: string;
    footerFormat: string;
    shared: boolean;
    useHTML: boolean;
  };
  plotOptions?: {
    bar?: {
      stacking: string;
      dataLabels?: {
        enabled: boolean;
      }
    };
    series?: {
      animation?: {
        duration: number;
      }
    };
  };
  legend?: {
    align: string;
    verticalAlign: string;
    layout: string;
  };
  series: Array<{
    name: string;
    data: number[];
    color?: string;
  }>;
  credits?: {
    enabled: boolean;
  };
}

const TcoComparisonChart: React.FC<TcoComparisonChartProps> = ({ height = 400 }) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  
  const chartOptions = useMemo<HighchartsOptions>(() => {
    if (!calculationResults || !calculationResults.vendorResults || calculationResults.vendorResults.length === 0) {
      return {
        chart: {
          type: 'bar',
          height,
          style: {
            fontFamily: 'Nunito, sans-serif'
          }
        },
        title: {
          text: '3-Year TCO Comparison'
        },
        subtitle: {
          text: 'No data available. Please calculate results first.'
        },
        xAxis: {
          categories: []
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Total Cost ($)'
          }
        },
        series: []
      };
    }
    
    // Sort vendors by TCO (Portnox always first)
    const sortedVendors = [...calculationResults.vendorResults]
      .sort((a: VendorResult, b: VendorResult) => {
        if (a.vendorId === 'portnox') return -1;
        if (b.vendorId === 'portnox') return 1;
        return a.totalTco - b.totalTco;
      });
    
    // Prepare category data
    const categories = sortedVendors.map((result: VendorResult) => result.name);
    
    // Prepare series data
    const hardwareData = sortedVendors.map((result: VendorResult) => result.hardwareCost + result.infrastructureCost);
    const implementationData = sortedVendors.map((result: VendorResult) => result.implementationCost);
    const operationsData = sortedVendors.map((result: VendorResult) => result.staffingCost);
    const licensesData = sortedVendors.map((result: VendorResult) => result.licenseCost + result.subscriptionCost + result.maintenanceCost);
    
    // Custom colors
    const colors = {
      hardware: '#FF8042',
      implementation: '#82CA9D',
      operations: '#FFC658',
      licenses: '#8884D8'
    };
    
    return {
      chart: {
        type: 'bar',
        height,
        style: {
          fontFamily: 'Nunito, sans-serif'
        }
      },
      title: {
        text: '3-Year TCO Comparison by Cost Category'
      },
      xAxis: {
        categories,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Total Cost ($)'
        },
        labels: {
          formatter: function(this: Highcharts.AxisLabelsFormatterContextObject): string {
            return '$' + Highcharts.numberFormat(this.value as number, 0, '.', ',');
          }
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>${point.y:,.0f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        bar: {
          stacking: 'normal',
          dataLabels: {
            enabled: false
          }
        },
        series: {
          animation: {
            duration: 1000
          }
        }
      },
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal'
      },
      series: [
        {
          name: 'Hardware & Infrastructure',
          data: hardwareData,
          color: colors.hardware
        },
        {
          name: 'Implementation',
          data: implementationData,
          color: colors.implementation
        },
        {
          name: 'Operations',
          data: operationsData,
          color: colors.operations
        },
        {
          name: 'Licenses & Maintenance',
          data: licensesData,
          color: colors.licenses
        }
      ],
      credits: {
        enabled: false
      }
    };
  }, [calculationResults, height]);
  
  return (
    <div className="chart-container">
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
    </div>
  );
};

export default TcoComparisonChart;
