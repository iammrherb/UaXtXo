import React, { useState } from 'react';
import { useCalculator } from '../../../context/CalculatorContext';
import DashboardCard from '../../ui/DashboardCard';
import TabPanel from '../../ui/TabPanel';
import TcoComparisonChart from '../../charts/TcoComparisonChart';
import TcoBreakdownChart from '../../charts/TcoBreakdownChart';
import SavingsProjectionChart from '../../charts/SavingsProjectionChart';
import { formatCurrency, formatPercentage } from '../../../utils/formatters';
import { VendorResult } from '../../../utils/calculationEngine';
import { CalculationResults } from '../../../utils/calculationEngine';

const FinancialView: React.FC = () => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  const [activeTab, setActiveTab] = useState('overview');
  
  // Define tabs
  const tabs = [
    { id: 'overview', label: 'Financial Overview' },
    { id: 'tco', label: 'TCO Breakdown' },
    { id: 'roi', label: 'ROI Analysis' },
    { id: 'projections', label: 'Cost Projections' },
    { id: 'sensitivity', label: 'Sensitivity Analysis' }
  ];
  
  if (!calculationResults) {
    return <div>No calculation data available. Please calculate first.</div>;
  }
  
  const portnox = calculationResults.vendorResults.find((v: VendorResult) => v.vendorId === 'portnox');
  if (!portnox) {
    return <div>Portnox data not found in calculation results.</div>;
  }
  
  // Get top competitor for comparison (highest TCO)
  const topCompetitor = calculationResults.vendorResults
    .filter(v => v.vendorId !== 'portnox')
    .sort((a, b) => b.totalTco - a.totalTco)[0];
  
  return (
    <div className="financial-view">
      <TabPanel
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        {activeTab === 'overview' && (
          <div className="financial-overview">
            {/* Financial Overview Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <DashboardCard
                title="Total 3-Year TCO"
                value={formatCurrency(portnox.totalTco)}
                subtitle={`vs. ${formatCurrency(topCompetitor?.totalTco || 0)} (${topCompetitor?.name || 'Competitor'})`}
                highlight={true}
              />
              
              <DashboardCard
                title="Annual Subscription"
                value={formatCurrency(portnox.subscriptionCost / 3)}
                subtitle="Fully managed service"
              />
              
              <DashboardCard
                title="Implementation Cost"
                value={formatCurrency(portnox.implementationCost)}
                subtitle="One-time cost"
              />
              
              <DashboardCard
                title="Operational Cost (Annual)"
                value={formatCurrency(portnox.staffingCost / 3)}
                subtitle="Staff and management"
              />
            </div>
            
            {/* TCO Comparison Chart */}
            <div className="mb-6">
            <div className="mb-6">
              <TcoComparisonChart height={350} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <TcoBreakdownChart height={350} vendorId="portnox" />
              </div>
              <div>
                <SavingsProjectionChart height={350} />
              </div>
            </div>
            
            {/* Simple placeholder for now - will be extended in Phase 5 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Financial Benefits Summary</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Portnox offers substantial financial benefits compared to traditional NAC solutions, with lower upfront costs, 
                reduced operational overhead, and no hardware investments required.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">Direct Cost Savings</h4>
                  <p className="text-sm">No hardware investments, lower licensing costs, and reduced maintenance expenses.</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">Operational Efficiency</h4>
                  <p className="text-sm">75% less IT staff time required for management and maintenance.</p>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-700 dark:text-purple-400 mb-2">Predictable Costs</h4>
                  <p className="text-sm">Subscription-based model with no surprise upgrade or maintenance costs.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'tco' && (
          <div className="tco-breakdown">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This section provides a detailed breakdown of Total Cost of Ownership (TCO) components for Portnox and competitors.
            </p>
            
            {/* Simple placeholder for now - will be extended in Phase 5 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">TCO Breakdown Details</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Detailed TCO breakdown charts and analysis will be implemented in Phase 5.
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'roi' && (
          <div className="roi-analysis">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This section provides ROI analysis and payback period calculation for Portnox implementation.
            </p>
            
            {/* Simple placeholder for now - will be extended in Phase 5 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">ROI Analysis Details</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Detailed ROI analysis charts and calculations will be implemented in Phase 5.
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'projections' && (
          <div className="cost-projections">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This section provides cost projections over the 3-year analysis period.
            </p>
            
            {/* Simple placeholder for now - will be extended in Phase 5 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Cost Projection Details</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Detailed cost projection charts and analysis will be implemented in Phase 5.
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'sensitivity' && (
          <div className="sensitivity-analysis">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This section examines how changes in key variables impact Total Cost of Ownership (TCO) and Return on Investment (ROI).
            </p>
            
            {/* Simple placeholder for now - will be extended in Phase 5 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Sensitivity Analysis Details</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Detailed sensitivity analysis charts and calculations will be implemented in Phase 5.
              </p>
            </div>
          </div>
        )}
      </TabPanel>
    </div>
  );
};

export default FinancialView;
