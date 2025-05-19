import React, { useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useCalculator } from '../../context/CalculatorContext';
import { formatCurrency } from '../../utils/formatters';

interface TcoBreakdownChartProps {
  vendorId?: string;
  height?: number;
}

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
  deployment: string;
}

// Define chart data item type
interface ChartDataItem {
  name: string;
  value: number;
  color: string;
  key: string;
  icon: string;
  description: string;
}

const COLORS: Record<string, string> = {
  licenses: '#8884d8',
  maintenance: '#ffc658',
  implementation: '#82ca9d',
  operations: '#ff8042',
  hardware: '#d0021b', 
  infrastructure: '#00c3ff'
};

const ICONS: Record<string, string> = {
  licenses: '💾',
  maintenance: '🔧',
  implementation: '🚀',
  operations: '👥',
  hardware: '🖥️',
  infrastructure: '🏢'
};

const DESCRIPTIONS: Record<string, string> = {
  licenses: 'Software licenses or subscription fees',
  maintenance: 'Annual maintenance and support',
  implementation: 'One-time professional services',
  operations: 'Ongoing operational staffing',
  hardware: 'Physical servers and appliances',
  infrastructure: 'Data center and power costs'
};

// Customize the appearance of active segments
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={-20} textAnchor="middle" fill="#333" style={{ fontSize: '14px', fontWeight: 'bold' }}>
        {payload.name}
      </text>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#333" style={{ fontSize: '16px', fontWeight: 'bold' }}>
        {formatCurrency(value)}
      </text>
      <text x={cx} y={cy} dy={28} textAnchor="middle" fill="#666" style={{ fontSize: '13px' }}>
        {`${(percent * 100).toFixed(1)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        strokeWidth={0}
        stroke={fill}
        style={{ filter: 'drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2))' }}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius - 6}
        outerRadius={innerRadius - 2}
        fill={fill}
      />
    </g>
  );
};

interface CategoryBarProps {
  name: string;
  value: number;
  total: number;
  color: string;
  icon: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ 
  name, value, total, color, icon, description, isActive, onClick 
}) => {
  const percent = total > 0 ? (value / total) * 100 : 0;
  
  return (
    <div 
      className={`category-bar p-3 rounded-lg transition-all duration-300 mb-2 cursor-pointer hover:shadow-md
                 ${isActive ? 'shadow-md' : 'shadow-sm'}`}
      style={{ 
        borderLeft: `4px solid ${color}`,
        backgroundColor: isActive ? `${color}15` : 'white'
      }}
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center">
          <span className="text-xl mr-2">{icon}</span>
          <h4 className="font-bold text-sm">{name}</h4>
        </div>
        <div className="text-right">
          <div className="font-bold">{formatCurrency(value)}</div>
          <div className="text-sm text-gray-500">{percent.toFixed(1)}%</div>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
        <div 
          className="h-2.5 rounded-full transition-all duration-500" 
          style={{ width: `${percent}%`, backgroundColor: color }}
        ></div>
      </div>
      
      {isActive && (
        <div className="mt-2 text-sm text-gray-600 pt-2 border-t border-gray-100">
          {description}
        </div>
      )}
    </div>
  );
};

const TcoBreakdownChart: React.FC<TcoBreakdownChartProps> = ({ 
  vendorId = 'portnox', 
  height = 400 
}) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Find vendor data
  const vendorData = React.useMemo(() => {
    if (!calculationResults?.vendorResults) return null;
    return calculationResults.vendorResults.find(
      (vendor: VendorResult) => vendor.vendorId === vendorId
    );
  }, [calculationResults, vendorId]);

  // Prepare data for charts
  const chartData = React.useMemo<ChartDataItem[]>(() => {
    if (!vendorData) return [];

    const result: ChartDataItem[] = [];
    
    Object.entries(vendorData.costBreakdown).forEach(([key, value]: [string, number]) => {
      if (key in COLORS) {
        result.push({
          name: key.charAt(0).toUpperCase() + key.slice(1),
          value,
          color: COLORS[key],
          key,
          icon: ICONS[key],
          description: DESCRIPTIONS[key]
        });
      }
    });
    
    return result
      .filter(item => item.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [vendorData]);

  // Handlers for pie chart interactions
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
    setActiveCategory(chartData[index]?.key || null);
  };
  
  const onPieLeave = () => {
    setActiveIndex(null);
  };

  // Toggle category selection
  const toggleCategory = (key: string) => {
    setActiveCategory(prevCategory => prevCategory === key ? null : key);
    
    // Also update the pie chart active index
    const index = chartData.findIndex(item => item.key === key);
    setActiveIndex(index !== -1 ? index : null);
  };

  if (!vendorData || chartData.length === 0) {
    return (
      <div className="chart-container p-4 text-center">
        <div className="text-xl font-bold mb-2">TCO Breakdown</div>
        <div className="text-gray-500">No data available</div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <div className="chart-header text-center mb-4">
        <h3 className="text-xl font-bold">{vendorData.name} TCO Breakdown</h3>
        <p className="text-gray-600">
          Total Cost of Ownership: <span className="font-bold">{formatCurrency(vendorData.totalTco)}</span>
        </p>
      </div>

      <div className="chart-content grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="chart-panel bg-white rounded-lg p-4 shadow-sm">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeIndex={activeIndex !== null ? activeIndex : undefined}
                  activeShape={renderActiveShape}
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                  paddingAngle={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      stroke="none"
                      style={{ 
                        filter: activeIndex === index ? 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))' : 'none',
                        cursor: 'pointer' 
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend 
                  verticalAlign="bottom"
                  iconType="circle"
                  iconSize={10}
                  formatter={(value: string) => <span style={{ color: '#333', fontSize: '12px' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="breakdown-panel">
          <div className="category-title mb-3 font-bold text-sm text-gray-600">COST CATEGORIES</div>
          <div className="category-list">
            {chartData.map((item) => (
              <CategoryBar
                key={item.key}
                name={item.name}
                value={item.value}
                total={vendorData.totalTco}
                color={item.color}
                icon={item.icon}
                description={item.description}
                isActive={activeCategory === item.key}
                onClick={() => toggleCategory(item.key)}
              />
            ))}
          </div>
          
          {/* TCO Insights */}
          <div className="tco-insights mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <h4 className="font-bold text-blue-800 mb-2">TCO Insights</h4>
            <ul className="text-sm text-blue-800">
              <li className="mb-1">• {vendorData.deployment === 'cloud' ? 
                'Cloud deployment eliminates hardware costs' : 
                'On-premises deployment requires significant hardware investment'}</li>
              <li className="mb-1">• {chartData.find(item => item.key === 'operations')?.value > vendorData.totalTco * 0.3 ? 
                'High operational costs suggest complex management' : 
                'Low operational costs indicate simplified management'}</li>
              <li>• {chartData.find(item => item.key === 'implementation')?.value > vendorData.totalTco * 0.2 ? 
                'Implementation costs are significant - consider long-term ROI' : 
                'Quick implementation provides faster time to value'}</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Detailed analysis section */}
      {activeCategory && (
        <div className="detailed-analysis mt-6 p-6 bg-white rounded-lg shadow-sm border-t-2" 
             style={{ borderColor: COLORS[activeCategory] }}>
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">{ICONS[activeCategory]}</span>
            <div>
              <h3 className="text-xl font-bold">{activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Breakdown</h3>
              <p className="text-gray-600">{DESCRIPTIONS[activeCategory]}</p>
            </div>
          </div>
          
          <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="stat-card p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Total</div>
              <div className="text-xl font-bold">
                {formatCurrency(vendorData.costBreakdown[activeCategory as keyof typeof vendorData.costBreakdown])}
              </div>
            </div>
            
            <div className="stat-card p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Percentage</div>
              <div className="text-xl font-bold">
                {((vendorData.costBreakdown[activeCategory as keyof typeof vendorData.costBreakdown] / vendorData.totalTco) * 100).toFixed(1)}%
              </div>
            </div>
            
            <div className="stat-card p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Annual Cost</div>
              <div className="text-xl font-bold">
                {formatCurrency(vendorData.costBreakdown[activeCategory as keyof typeof vendorData.costBreakdown] / 3)}
              </div>
            </div>
            
            <div className="stat-card p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Cost Per Device</div>
              <div className="text-xl font-bold">
                {formatCurrency(vendorData.costBreakdown[activeCategory as keyof typeof vendorData.costBreakdown] / 500)} {/* Assuming 500 devices */}
              </div>
            </div>
          </div>
          
          <div className="analysis-content">
            {/* Custom content based on category */}
            {activeCategory === 'licenses' && (
              <div className="license-analysis">
                <h4 className="font-bold mb-2">License Model Analysis</h4>
                <p className="mb-4">
                  {vendorData.costBreakdown.maintenance > 0 ? 
                    "This solution uses a perpetual licensing model with annual maintenance fees." : 
                    "This solution uses a subscription model with predictable annual costs."}
                </p>
                <div className="flex justify-center my-4">
                  <div className="relative w-full max-w-md h-8 bg-gray-200 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-green-500" style={{ 
                      width: '100%', 
                      clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)'
                    }}></div>
                    <div className="absolute top-0 left-0 h-full flex items-center justify-center w-full text-xs font-bold text-white">
                      Subscription Model
                    </div>
                  </div>
                  <div className="mx-4 text-center">vs</div>
                  <div className="relative w-full max-w-md h-8 bg-gray-200 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-blue-500" style={{ 
                      width: '100%', 
                      clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)'
                    }}></div>
                    <div className="absolute top-0 left-0 h-full flex items-center justify-center w-full text-xs font-bold text-white">
                      Perpetual Model
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeCategory === 'implementation' && (
              <div className="implementation-analysis">
                <h4 className="font-bold mb-2">Implementation Timeline</h4>
                <div className="relative h-16 bg-gray-100 rounded-lg mt-4 mb-6">
                  <div className="absolute top-0 left-0 h-full w-1/4 bg-blue-200 flex items-center justify-center text-xs font-bold rounded-l-lg">
                    Planning
                  </div>
                  <div className="absolute top-0 left-1/4 h-full w-1/4 bg-green-200 flex items-center justify-center text-xs font-bold">
                    Setup
                  </div>
                  <div className="absolute top-0 left-2/4 h-full w-1/4 bg-yellow-200 flex items-center justify-center text-xs font-bold">
                    Configuration
                  </div>
                  <div className="absolute top-0 left-3/4 h-full w-1/4 bg-purple-200 flex items-center justify-center text-xs font-bold rounded-r-lg">
                    Testing
                  </div>
                </div>
                <p>
                  {vendorData.deployment === 'cloud' ? 
                    "Cloud deployment significantly reduces implementation time and complexity." : 
                    "On-premises deployment requires more extensive implementation services."}
                </p>
              </div>
            )}
            
            {activeCategory === 'operations' && (
              <div className="operations-analysis">
                <h4 className="font-bold mb-2">Operational Efficiency</h4>
                <div className="mt-4 mb-6 flex items-center justify-center">
                  <div className="gauge-container relative w-48 h-24 overflow-hidden">
                    <div className="gauge-background absolute w-48 h-48 rounded-full border-8 border-gray-200"></div>
                    <div className="gauge-fill absolute w-48 h-48 rounded-full border-8 border-transparent border-t-green-500 border-r-green-500" 
                         style={{ transform: 'rotate(45deg)' }}></div>
                    <div className="gauge-center absolute w-36 h-36 bg-white rounded-full top-6 left-6"></div>
                    <div className="gauge-value absolute w-full text-center top-12 text-xl font-bold">FTE</div>
                    <div className="gauge-percentage absolute w-full text-center top-20 text-sm">0.25</div>
                  </div>
                </div>
                <p>
                  Operations costs reflect the full-time equivalent (FTE) staffing required to manage the solution.
                  {vendorData.costBreakdown.operations < vendorData.totalTco * 0.2 ? 
                    " This solution requires minimal operational overhead." : 
                    " This solution has significant operational requirements."}
                </p>
              </div>
            )}
            
            {activeCategory === 'hardware' && (
              <div className="hardware-analysis">
                <h4 className="font-bold mb-2">Hardware Requirements</h4>
                <div className="server-visualization flex justify-center my-6">
                  {[...Array(vendorData.costBreakdown.hardware > 100000 ? 5 : 
                          vendorData.costBreakdown.hardware > 50000 ? 3 : 
                          vendorData.costBreakdown.hardware > 0 ? 1 : 0)].map((_, i) => (
                    <div key={i} className="server-icon mx-2 p-4 bg-gray-100 rounded-lg text-center">
                      <div className="text-3xl">🖥️</div>
                      <div className="text-xs mt-1">Server {i+1}</div>
                    </div>
                  ))}
                  {vendorData.costBreakdown.hardware === 0 && (
                    <div className="no-servers p-6 bg-green-50 rounded-lg text-center">
                      <div className="text-3xl">☁️</div>
                      <div className="text-sm mt-2 font-bold text-green-700">No hardware required</div>
                      <div className="text-xs mt-1 text-green-600">Cloud-based solution</div>
                    </div>
                  )}
                </div>
                <p>
                  {vendorData.costBreakdown.hardware === 0 ? 
                    "This cloud-based solution eliminates the need for dedicated hardware, reducing capital expenditure and simplifying deployment." : 
                    "This solution requires significant hardware investment for on-premises deployment, increasing initial costs and deployment complexity."}
                </p>
              </div>
            )}
            
            {/* Default analysis */}
            {!['licenses', 'implementation', 'operations', 'hardware'].includes(activeCategory) && (
              <div className="default-analysis">
                <p>
                  {activeCategory === 'maintenance' ? 
                    "Maintenance costs cover ongoing software updates, bug fixes, and technical support to ensure the solution remains current and effective." : 
                    "Infrastructure costs include ongoing expenses for power, cooling, rack space, and data center facilities required for on-premises components."}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TcoBreakdownChart;
