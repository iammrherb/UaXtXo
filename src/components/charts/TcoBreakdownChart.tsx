// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useCalculator } from '../../context/CalculatorContext';
import { formatCurrency } from '../../utils/formatters';
// @ts-ignore
import Chart from 'react-apexcharts';

interface TcoBreakdownChartProps {
  vendorId?: string;
  height?: number;
}

// Define vendor result interface
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
  badge?: string;
  badgeClass?: string;
  deployment: string;
  implementationDays: number;
  roi: number;
  paybackPeriod: number;
  cumulativeCosts: {
    initial: number;
    year1: number;
    year2: number;
    year3: number;
    year4?: number;
    year5?: number;
  };
}

// Categories and their visual properties
const CATEGORIES = {
  licenses: {
    name: 'Licenses & Subscriptions',
    description: 'Software licenses or subscription fees for accessing the NAC solution',
    icon: '💾',
    color: '#8884d8',
    details: 'Includes all costs related to licensing the software, whether through perpetual licenses or ongoing subscriptions.'
  },
  maintenance: {
    name: 'Maintenance & Support',
    description: 'Annual fees for maintenance, updates, and technical support',
    icon: '🔧',
    color: '#ffc658',
    details: 'Covers ongoing support, security updates, bug fixes, and access to newer versions of the software.'
  },
  implementation: {
    name: 'Implementation',
    description: 'Professional services for deployment and configuration',
    icon: '🚀',
    color: '#82ca9d',
    details: 'One-time costs associated with installing, configuring, and integrating the solution with existing systems.'
  },
  operations: {
    name: 'IT Operations',
    description: 'Staffing and management costs for ongoing administration',
    icon: '👥',
    color: '#ff8042',
    details: 'Represents the portion of IT staff time (FTE) required to manage and operate the solution on an ongoing basis.'
  },
  hardware: {
    name: 'Hardware',
    description: 'Physical appliances and servers required for the solution',
    icon: '🖥️',
    color: '#d0021b',
    details: 'Includes servers, appliances, and other physical infrastructure needed to run on-premises solutions.'
  },
  infrastructure: {
    name: 'Infrastructure',
    description: 'Data center costs including power, cooling, and rack space',
    icon: '🏢',
    color: '#00c3ff',
    details: 'Ongoing costs associated with hosting and maintaining physical infrastructure in data centers.'
  }
};

// Create a type for category keys
type CategoryKey = keyof typeof CATEGORIES;

const TcoBreakdownChart: React.FC<TcoBreakdownChartProps> = ({ 
  vendorId = 'portnox', 
  height = 400 
}) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
  const [chartData, setChartData] = useState<{series: number[], labels: string[], colors: string[]}>({
    series: [],
    labels: [],
    colors: []
  });
  const [vendorData, setVendorData] = useState<VendorResult | null>(null);
  const [hasData, setHasData] = useState<boolean>(false);
  
  // Process vendor data and prepare chart data
  useEffect(() => {
    if (!calculationResults || !calculationResults.vendorResults) {
      setHasData(false);
      return;
    }
    
    const vendor = calculationResults.vendorResults.find((v: VendorResult) => v.vendorId === vendorId);
    if (!vendor) {
      setHasData(false);
      return;
    }
    
    setVendorData(vendor);
    setHasData(true);
    
    const series: number[] = [];
    const labels: string[] = [];
    const colors: string[] = [];
    
    // Check each category
    Object.entries(CATEGORIES).forEach(([key, category]) => {
      const value = vendor.costBreakdown[key as keyof typeof vendor.costBreakdown];
      if (value > 0) {
        series.push(value);
        labels.push(category.name);
        colors.push(category.color);
      }
    });
    
    setChartData({ series, labels, colors });
    
    // Auto-select the largest category
    if (series.length > 0) {
      let maxIndex = 0;
      let maxValue = 0;
      series.forEach((value, index) => {
        if (value > maxValue) {
          maxValue = value;
          maxIndex = index;
        }
      });
      
      const categoryKeys = Object.keys(CATEGORIES) as CategoryKey[];
      let categoryIndex = 0;
      for (const key of categoryKeys) {
        if (vendor.costBreakdown[key as keyof typeof vendor.costBreakdown] > 0) {
          if (categoryIndex === maxIndex) {
            setSelectedCategory(key);
            break;
          }
          categoryIndex++;
        }
      }
    }
  }, [calculationResults, vendorId]);
  
  // No data placeholder
  if (!hasData || !vendorData) {
    return (
      <div className="chart-container bg-white rounded-lg p-8 text-center shadow-sm">
        <div className="text-xl font-bold mb-4">TCO Breakdown Analysis</div>
        <div className="text-gray-500 mb-6">No data available for this vendor</div>
        <div className="w-40 h-40 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      </div>
    );
  }
  
  return (
    <div className="chart-container">
      <div className="chart-header text-center mb-6">
        <h3 className="text-xl font-bold">
          {vendorData?.name} TCO Breakdown Analysis
          {vendorData?.badge && (
            <span className={`ml-2 text-sm px-2 py-1 rounded ${vendorData?.badgeClass || 'bg-blue-100 text-blue-800'}`}>
              {vendorData?.badge}
            </span>
          )}
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          Total Cost of Ownership over 3 years: <span className="font-bold">{formatCurrency(vendorData?.totalTco || 0)}</span>
        </p>
      </div>

      <div className="chart-content grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut Chart */}
        <div className="chart-panel bg-white rounded-lg p-6 shadow-sm">
          <div className="chart-title font-bold text-gray-700 mb-4">Cost Distribution</div>
          <Chart
            type="donut"
            options={{
              chart: {
                type: 'donut'
              },
              labels: chartData.labels,
              colors: chartData.colors,
              dataLabels: {
                formatter: function(val: any) {
                  return (typeof val === 'number' ? val.toFixed(1) : '0') + '%';
                }
              },
              legend: {
                position: 'bottom'
              },
              tooltip: {
                y: {
                  formatter: function(val: any) {
                    return formatCurrency(val);
                  }
                }
              },
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true,
                      total: {
                        show: true,
                        label: 'Total TCO',
                        formatter: function() {
                          return formatCurrency(vendorData?.totalTco || 0);
                        }
                      }
                    }
                  }
                }
              }
            }}
            series={chartData.series}
            height={320}
          />
          
          {/* Key Insights */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="font-bold text-gray-700 mb-2">Key Cost Insights</div>
            <div className="text-sm text-gray-600">
              <div className="flex items-start mb-1">
                <div className="text-blue-500 mr-2">•</div>
                <div>
                  {chartData.series.length > 0 ? 
                    `${chartData.labels[0]} represents the largest cost factor at ${formatCurrency(chartData.series[0])} (${(chartData.series[0] / (vendorData?.totalTco || 1) * 100).toFixed(1)}% of total TCO).` : 
                    'No significant cost factors identified.'}
                </div>
              </div>
              <div className="flex items-start mb-1">
                <div className="text-blue-500 mr-2">•</div>
                <div>
                  {vendorData?.deployment === 'cloud' ? 
                    'Cloud deployment eliminates hardware and infrastructure costs.' : 
                    'On-premises deployment increases costs with hardware and infrastructure requirements.'}
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-blue-500 mr-2">•</div>
                <div>
                  {vendorData?.costBreakdown.operations < (vendorData?.totalTco || 0) * 0.2 ? 
                    'Low operational costs indicate simplified management and administration.' : 
                    'High operational costs suggest complex management requirements.'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cost Categories */}
        <div className="categories-panel bg-white rounded-lg p-6 shadow-sm">
          <div className="panel-title font-bold text-gray-700 mb-4">Cost Categories</div>
          
          <div className="categories-grid space-y-3">
            {Object.entries(CATEGORIES).map(([key, category]) => {
              const value = vendorData?.costBreakdown[key as keyof typeof vendorData.costBreakdown] || 0;
              if (value <= 0) return null;
              
              const percentage = (value / (vendorData?.totalTco || 1)) * 100;
              const isSelected = selectedCategory === key;
              
              return (
                <div 
                  key={key}
                  className={`category-item p-3 rounded-lg transition-all duration-300 cursor-pointer ${
                    isSelected ? 'shadow-md' : 'shadow-sm hover:shadow'
                  }`}
                  style={{
                    borderLeft: `4px solid ${category.color}`,
                    backgroundColor: isSelected ? `${category.color}10` : 'white'
                  }}
                  onClick={() => setSelectedCategory(isSelected ? null : key as CategoryKey)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">{category.icon}</span>
                      <div>
                        <h4 className="font-bold text-sm text-gray-800">{category.name}</h4>
                        <p className="text-xs text-gray-500 hidden md:block">{category.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-800">{formatCurrency(value)}</div>
                      <div className="text-xs text-gray-500">{percentage.toFixed(1)}% of total</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
                    <div 
                      className="h-2 rounded-full transition-all duration-700" 
                      style={{ 
                        width: `${percentage}%`, 
                        backgroundColor: category.color,
                        boxShadow: isSelected ? `0 0 8px ${category.color}` : 'none'
                      }}
                    ></div>
                  </div>
                  
                  {isSelected && (
                    <div className="mt-3 text-xs text-gray-600 p-2 bg-gray-50 rounded">
                      {category.details}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Cost by Year Visualization */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="font-bold text-gray-700 mb-3">Cost Distribution by Year</div>
            <div className="grid grid-cols-4 gap-2">
              <div className="text-center bg-gray-50 p-2 rounded">
                <div className="text-xs text-gray-500">Initial</div>
                <div className="font-bold text-sm">{formatCurrency(vendorData?.cumulativeCosts.initial || 0)}</div>
              </div>
              <div className="text-center bg-gray-50 p-2 rounded">
                <div className="text-xs text-gray-500">Year 1</div>
                <div className="font-bold text-sm">{formatCurrency((vendorData?.cumulativeCosts.year1 || 0) - (vendorData?.cumulativeCosts.initial || 0))}</div>
              </div>
              <div className="text-center bg-gray-50 p-2 rounded">
                <div className="text-xs text-gray-500">Year 2</div>
                <div className="font-bold text-sm">{formatCurrency((vendorData?.cumulativeCosts.year2 || 0) - (vendorData?.cumulativeCosts.year1 || 0))}</div>
              </div>
              <div className="text-center bg-gray-50 p-2 rounded">
                <div className="text-xs text-gray-500">Year 3</div>
                <div className="font-bold text-sm">{formatCurrency((vendorData?.cumulativeCosts.year3 || 0) - (vendorData?.cumulativeCosts.year2 || 0))}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Detailed Category Analysis */}
      {selectedCategory && (
        <div className="detailed-analysis mt-6 bg-white rounded-lg p-6 shadow-sm">
          <div className="analysis-header flex items-center border-b border-gray-100 pb-4 mb-4">
            <div 
              className="category-icon mr-4 text-3xl bg-gray-50 p-3 rounded-full"
              style={{ color: CATEGORIES[selectedCategory].color }}
            >
              {CATEGORIES[selectedCategory].icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{CATEGORIES[selectedCategory].name} Analysis</h3>
              <p className="text-sm text-gray-600">{CATEGORIES[selectedCategory].description}</p>
            </div>
          </div>
          
          {/* Cost Stats Grid */}
          <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="stat-card p-4 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500">Total Cost</div>
              <div className="text-lg font-bold text-gray-800">
                {formatCurrency(vendorData?.costBreakdown[selectedCategory] || 0)}
              </div>
            </div>
            
            <div className="stat-card p-4 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500">Percentage of TCO</div>
              <div className="text-lg font-bold text-gray-800">
                {(((vendorData?.costBreakdown[selectedCategory] || 0) / (vendorData?.totalTco || 1)) * 100).toFixed(1)}%
              </div>
            </div>
            
            <div className="stat-card p-4 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500">Annual Cost</div>
              <div className="text-lg font-bold text-gray-800">
                {formatCurrency((vendorData?.costBreakdown[selectedCategory] || 0) / 3)}
              </div>
            </div>
            
            <div className="stat-card p-4 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500">Cost Per Device</div>
              <div className="text-lg font-bold text-gray-800">
                {formatCurrency((vendorData?.costBreakdown[selectedCategory] || 0) / (state.deviceCount || 500))}
              </div>
            </div>
          </div>
          
          {/* Conditional Category Analysis */}
          {selectedCategory === 'licenses' && (
            <div className="category-specific-analysis bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-800 mb-2">License Model Analysis</h4>
              <div className="flex flex-col md:flex-row mb-4 gap-4">
                <div className="flex-1 bg-white p-3 rounded shadow-sm">
                  <div className="text-center font-bold mb-2">Subscription Model</div>
                  <div className="pros-cons">
                    <div className="text-sm mb-1"><span className="text-green-600 font-bold">✓</span> Predictable annual costs</div>
                    <div className="text-sm mb-1"><span className="text-green-600 font-bold">✓</span> Lower upfront investment</div>
                    <div className="text-sm mb-1"><span className="text-green-600 font-bold">✓</span> Continuous updates included</div>
                    <div className="text-sm"><span className="text-green-600 font-bold">✓</span> Easier budgeting (OpEx)</div>
                  </div>
                </div>
                <div className="flex-1 bg-white p-3 rounded shadow-sm">
                  <div className="text-center font-bold mb-2">Perpetual Model</div>
                  <div className="pros-cons">
                    <div className="text-sm mb-1"><span className="text-red-600 font-bold">✗</span> High upfront costs</div>
                    <div className="text-sm mb-1"><span className="text-red-600 font-bold">✗</span> Ongoing maintenance fees</div>
                    <div className="text-sm mb-1"><span className="text-red-600 font-bold">✗</span> Updates may cost extra</div>
                    <div className="text-sm"><span className="text-red-600 font-bold">✗</span> Capital expenditure (CapEx)</div>
                  </div>
                </div>
              </div>
              <div className="text-sm text-blue-800 font-semibold mt-2">
                {(vendorData?.costBreakdown.maintenance || 0) === 0 ?
                  `${vendorData?.name} uses a subscription model, which offers better predictability and eliminates the need for large upfront license purchases.` :
                  `${vendorData?.name} uses a perpetual licensing model, which requires significant upfront investment and ongoing maintenance fees.`
                }
              </div>
            </div>
          )}
          
          {selectedCategory === 'operations' && (
            <div className="category-specific-analysis bg-orange-50 p-4 rounded-lg">
              <h4 className="font-bold text-orange-800 mb-2">Operational Efficiency Analysis</h4>
              <div className="flex items-center justify-center mb-4">
                <div className="w-full max-w-md bg-white p-4 rounded shadow-sm">
                  <div className="text-center mb-3">Full-Time Equivalent (FTE) Allocation</div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200">
                          FTE Required
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-orange-600">
                          {((vendorData?.costBreakdown.operations || 0) / (state.costParameters?.fteCost || 100000)).toFixed(2)} FTE
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-orange-200">
                      <div style={{
                        width: `${Math.min(((vendorData?.costBreakdown.operations || 0) / (state.costParameters?.fteCost || 100000)) * 100, 100)}%`
                      }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"></div>
                    </div>
                    <div className="text-xs text-gray-600">
                      {(vendorData?.costBreakdown.operations || 0) / (state.costParameters?.fteCost || 100000) <= 0.25 ?
                        "Low FTE allocation indicates minimal operational overhead and simplified management." :
                        (vendorData?.costBreakdown.operations || 0) / (state.costParameters?.fteCost || 100000) <= 0.5 ?
                        "Moderate FTE allocation suggests reasonable operational requirements." :
                        "High FTE allocation indicates significant operational complexity and management overhead."
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-sm text-orange-800 font-semibold mt-2">
                {(vendorData?.costBreakdown.operations || 0) < (vendorData?.totalTco || 1) * 0.2 ?
                  `${vendorData?.name} requires minimal operational overhead, allowing IT staff to focus on strategic initiatives rather than solution management.` :
                  `${vendorData?.name} requires significant operational resources, which increases total cost of ownership beyond the direct software and hardware expenses.`
                }
              </div>
            </div>
          )}
          
          {selectedCategory === 'hardware' && (
            <div className="category-specific-analysis bg-red-50 p-4 rounded-lg">
              <h4 className="font-bold text-red-800 mb-2">Hardware Investment Analysis</h4>
              <div className="flex flex-col md:flex-row mb-4 gap-4">
                <div className="flex-1 bg-white p-3 rounded shadow-sm">
                  <div className="text-center font-bold mb-2">Cloud Solution</div>
                  <div className="pros-cons">
                    <div className="text-sm mb-1"><span className="text-green-600 font-bold">✓</span> No hardware investment</div>
                    <div className="text-sm mb-1"><span className="text-green-600 font-bold">✓</span> No infrastructure costs</div>
                    <div className="text-sm mb-1"><span className="text-green-600 font-bold">✓</span> Automatic scaling</div>
                    <div className="text-sm"><span className="text-green-600 font-bold">✓</span> Reduced deployment time</div>
                  </div>
                </div>
                <div className="flex-1 bg-white p-3 rounded shadow-sm">
                  <div className="text-center font-bold mb-2">On-Premises Solution</div>
                  <div className="pros-cons">
                    <div className="text-sm mb-1"><span className="text-red-600 font-bold">✗</span> Hardware purchase required</div>
                    <div className="text-sm mb-1"><span className="text-red-600 font-bold">✗</span> Infrastructure costs</div>
                    <div className="text-sm mb-1"><span className="text-red-600 font-bold">✗</span> Hardware refresh cycles</div>
                    <div className="text-sm"><span className="text-red-600 font-bold">✗</span> Longer deployment time</div>
                  </div>
                </div>
              </div>
              <div className="text-sm text-red-800 font-semibold mt-2">
                {(vendorData?.costBreakdown.hardware || 0) === 0 ?
                  `${vendorData?.name} is a cloud-native solution that eliminates hardware costs entirely, reducing total cost of ownership and simplifying deployment.` :
                  `${vendorData?.name} requires significant hardware investment (${formatCurrency(vendorData?.costBreakdown.hardware || 0)}), increasing both initial costs and long-term TCO.`
                }
              </div>
            </div>
          )}
          
          {selectedCategory === 'implementation' && (
            <div className="category-specific-analysis bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-green-800 mb-2">Implementation Analysis</h4>
              <div className="bg-white p-4 rounded shadow-sm mb-4">
                <div className="text-center mb-3">Implementation Timeline</div>
                <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden mb-2">
                  {["Planning", "Installation", "Configuration", "Testing", "Go-Live"].map((phase, index) => (
                    <div 
                      key={phase}
                      className="absolute top-0 h-full flex items-center justify-center text-xs font-bold"
                      style={{
                        left: `${index * 20}%`,
                        width: '20%',
                        backgroundColor: [
                          '#90cdf4', // blue-300
                          '#9ae6b4', // green-300
                          '#fbd38d', // yellow-300
                          '#feb2b2', // red-300
                          '#e9d8fd'  // purple-300
                        ][index],
                        borderRight: index < 4 ? '1px dashed white' : 'none'
                      }}
                    >
                      {phase}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-5 gap-0 text-center text-xs text-gray-500">
                  <div>Day 1</div>
                  <div>Day {Math.round((vendorData?.implementationDays || 60) * 0.25)}</div>
                  <div>Day {Math.round((vendorData?.implementationDays || 60) * 0.5)}</div>
                  <div>Day {Math.round((vendorData?.implementationDays || 60) * 0.75)}</div>
                  <div>Day {vendorData?.implementationDays || 60}</div>
                </div>
              </div>
              <div className="text-sm text-green-800 font-semibold mt-2">
                {(vendorData?.implementationDays || 60) < 30 ?
                  `${vendorData?.name} offers rapid deployment in just ${vendorData?.implementationDays} days, significantly reducing time to value compared to traditional solutions.` :
                  `${vendorData?.name} requires ${vendorData?.implementationDays} days for full implementation, representing a significant timeline for deployment.`
                }
              </div>
            </div>
          )}
          
          {/* Insights and Recommendations */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <h4 className="font-bold text-gray-700 mb-2">Insights & Recommendations</h4>
            <div className="text-sm text-gray-600">
              {selectedCategory === 'licenses' && (
                (vendorData?.costBreakdown.maintenance || 0) > 0 ? 
                  <p>Consider subscription-based alternatives to reduce upfront costs and achieve better predictability. Subscription models typically offer better long-term value and include updates and maintenance.</p> :
                  <p>The subscription model used by {vendorData?.name} provides optimal cost distribution over time and includes all updates and maintenance, eliminating unexpected costs.</p>
              )}
              
              {selectedCategory === 'maintenance' && (
                (vendorData?.costBreakdown.maintenance || 0) > (vendorData?.totalTco || 1) * 0.15 ? 
                  <p>High maintenance costs (${formatCurrency(vendorData?.costBreakdown.maintenance || 0)}) suggest this solution has significant ongoing support requirements, which impacts long-term TCO.</p> :
                  <p>Maintenance costs are well-optimized, representing a small portion of the total TCO and providing good value for the support received.</p>
              )}
              
              {selectedCategory === 'operations' && (
                (vendorData?.costBreakdown.operations || 0) > (vendorData?.totalTco || 1) * 0.25 ? 
                  <p>High operational costs indicate complex management needs. Consider solutions with lower operational requirements to reduce long-term TCO.</p> :
                  <p>The low operational overhead of {vendorData?.name} translates to significant cost savings over time and allows IT staff to focus on strategic initiatives rather than system management.</p>
              )}
              
              {selectedCategory === 'hardware' && (
                (vendorData?.costBreakdown.hardware || 0) > 0 ? 
                  <p>Hardware costs represent a significant capital expenditure. Cloud-based alternatives eliminate these costs entirely and provide better scalability.</p> :
                  <p>The cloud-native architecture of {vendorData?.name} eliminates hardware costs entirely, reducing capital expenditure and providing better scalability and flexibility.</p>
              )}
              
              {selectedCategory === 'implementation' && (
                (vendorData?.implementationDays || 60) > 45 ? 
                  <p>The extended implementation timeline increases both direct costs and delays time to value. Consider solutions with faster deployment options.</p> :
                  <p>The rapid implementation timeline of {vendorData?.name} accelerates time to value and reduces deployment costs compared to traditional alternatives.</p>
              )}
              
              {selectedCategory === 'infrastructure' && (
                (vendorData?.costBreakdown.infrastructure || 0) > 0 ? 
                  <p>Ongoing infrastructure costs add significant expense over time. Cloud solutions eliminate these costs entirely and reduce operational complexity.</p> :
                  <p>By eliminating infrastructure costs, {vendorData?.name} provides substantial savings over the solution lifecycle while reducing management complexity.</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Overall Value Analysis */}
      <div className="value-analysis mt-6 bg-white rounded-lg p-6 shadow-sm">
        <div className="section-title font-bold text-gray-700 mb-4 text-lg">TCO Value Analysis</div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="value-card bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <div className="flex items-center mb-2">
              <div className="text-green-500 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="font-bold text-green-800">License Efficiency</div>
            </div>
            <div className="text-sm text-green-700">
              {(vendorData?.costBreakdown.maintenance || 0) === 0 ? 
                "Subscription model provides optimal cost distribution over time, with no large upfront payments required." : 
                "Perpetual licensing model requires significant upfront investment and ongoing maintenance fees."
              }
            </div>
            <div className="mt-2 font-bold text-green-800 text-right">
              {(vendorData?.costBreakdown.maintenance || 0) === 0 ? "Excellent" : "Suboptimal"}
            </div>
          </div>
          
          <div className="value-card bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-center mb-2">
              <div className="text-blue-500 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="font-bold text-blue-800">Operational Efficiency</div>
            </div>
            <div className="text-sm text-blue-700">
              {(vendorData?.costBreakdown.operations || 0) < (vendorData?.totalTco || 1) * 0.2 ? 
                "Low operational overhead minimizes FTE costs and allows IT staff to focus on strategic initiatives." : 
                "High operational requirements increase total cost of ownership and management complexity."
              }
            </div>
            <div className="mt-2 font-bold text-blue-800 text-right">
              {(vendorData?.costBreakdown.operations || 0) < (vendorData?.totalTco || 1) * 0.2 ? "High" : "Low"}
            </div>
          </div>
          
          <div className="value-card bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
            <div className="flex items-center mb-2">
              <div className="text-purple-500 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                </svg>
              </div>
              <div className="font-bold text-purple-800">Deployment Model</div>
            </div>
            <div className="text-sm text-purple-700">
              {vendorData?.deployment === 'cloud' ? 
                "Cloud-native architecture eliminates hardware and infrastructure costs while providing better scalability." : 
                "On-premises deployment requires significant hardware investment and infrastructure costs."
              }
            </div>
            <div className="mt-2 font-bold text-purple-800 text-right">
              {vendorData?.deployment === 'cloud' ? "Optimal" : "Traditional"}
            </div>
          </div>
        </div>
        
        {/* Overall Value Statement */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="text-gray-700">
            <p className="mb-2">
              <strong>Overall Value Assessment:</strong> {
                vendorData?.deployment === 'cloud' && (vendorData?.costBreakdown.maintenance || 0) === 0 && (vendorData?.costBreakdown.operations || 0) < (vendorData?.totalTco || 1) * 0.2 ? 
                  `${vendorData?.name} offers excellent TCO value with its cloud-native architecture, subscription model, and low operational requirements.` :
                  vendorData?.deployment === 'cloud' ? 
                    `${vendorData?.name} provides good TCO value through its cloud architecture, eliminating hardware and infrastructure costs.` :
                    `${vendorData?.name} has a traditional TCO structure with significant costs across hardware, implementation, and operations.`
              }
            </p>
            <p>
              <strong>ROI Analysis:</strong> With a projected ROI of {Math.round(vendorData?.roi || 0)}% and a payback period of {Math.round(vendorData?.paybackPeriod || 0)} months, 
              {(vendorData?.roi || 0) > 150 ? 
                " this solution provides exceptional return on investment." : 
                (vendorData?.roi || 0) > 100 ? 
                  " this solution provides good return on investment." : 
                  " this solution provides modest return on investment."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TcoBreakdownChart;
