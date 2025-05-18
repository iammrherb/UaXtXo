import React, { useState } from 'react';
import { useCalculator } from '../../../context/CalculatorContext';
import DashboardCard from '../../ui/DashboardCard';
import TabPanel from '../../ui/TabPanel';
import TcoComparisonChart from '../../charts/TcoComparisonChart';
import TcoBreakdownChart from '../../charts/TcoBreakdownChart';
import SavingsProjectionChart from '../../charts/SavingsProjectionChart';
import FinancialReport from '../../reports/FinancialReport';
import { formatCurrency, formatPercentage } from '../../../utils/formatters';
import { VendorResult } from '../../../utils/calculationEngine';

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
    { id: 'report', label: 'Financial Report' }
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
    .filter((v: VendorResult) => v.vendorId !== 'portnox')
    .sort((a: VendorResult, b: VendorResult) => b.totalTco - a.totalTco)[0];
  
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
            
            {/* Financial Benefits Summary */}
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
            
            {/* TCO Breakdown Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <TcoBreakdownChart height={400} vendorId="portnox" />
              </div>
              {topCompetitor && (
                <div>
                  <TcoBreakdownChart height={400} vendorId={topCompetitor.vendorId} />
                </div>
              )}
            </div>
            
            {/* Cost Comparison Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Cost Component Comparison</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Cost Component
                      </th>
                      <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Portnox Cloud
                      </th>
                      {topCompetitor && (
                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          {topCompetitor.name}
                        </th>
                      )}
                      <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Savings
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        Licenses & Subscriptions
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-300">
                        {formatCurrency(portnox.licenseCost + portnox.subscriptionCost)}
                      </td>
                      {topCompetitor && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-300">
                          {formatCurrency(topCompetitor.licenseCost + topCompetitor.subscriptionCost)}
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 dark:text-green-400">
                        {topCompetitor ? 
                          formatCurrency((topCompetitor.licenseCost + topCompetitor.subscriptionCost) - 
                            (portnox.licenseCost + portnox.subscriptionCost)) : 
                          'N/A'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        Implementation
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-300">
                        {formatCurrency(portnox.implementationCost)}
                      </td>
                      {topCompetitor && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-300">
                          {formatCurrency(topCompetitor.implementationCost)}
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 dark:text-green-400">
                        {topCompetitor ? 
                          formatCurrency(topCompetitor.implementationCost - portnox.implementationCost) : 
                          'N/A'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        Maintenance
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-300">
                        {formatCurrency(portnox.maintenanceCost)}
                      </td>
                      {topCompetitor && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-300">
                          {formatCurrency(topCompetitor.maintenanceCost)}
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 dark:text-green-400">
                        {topCompetitor ? 
                          formatCurrency(topCompetitor.maintenanceCost - portnox.maintenanceCost) : 
                          'N/A'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        Operations
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-300">
                        {formatCurrency(portnox.staffingCost)}
                      </td>
                      {topCompetitor && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-300">
                          {formatCurrency(topCompetitor.staffingCost)}
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 dark:text-green-400">
                        {topCompetitor ? 
                          formatCurrency(topCompetitor.staffingCost - portnox.staffingCost) : 
                          'N/A'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        Hardware & Infrastructure
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-300">
                        {formatCurrency(portnox.hardwareCost + portnox.infrastructureCost)}
                      </td>
                      {topCompetitor && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-300">
                          {formatCurrency(topCompetitor.hardwareCost + topCompetitor.infrastructureCost)}
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 dark:text-green-400">
                        {topCompetitor ? 
                          formatCurrency((topCompetitor.hardwareCost + topCompetitor.infrastructureCost) - 
                            (portnox.hardwareCost + portnox.infrastructureCost)) : 
                          'N/A'}
                      </td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        Total 3-Year TCO
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right text-gray-900 dark:text-white">
                        {formatCurrency(portnox.totalTco)}
                      </td>
                      {topCompetitor && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right text-gray-900 dark:text-white">
                          {formatCurrency(topCompetitor.totalTco)}
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right text-green-600 dark:text-green-400">
                        {topCompetitor ? 
                          formatCurrency(topCompetitor.totalTco - portnox.totalTco) : 
                          'N/A'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'roi' && (
          <div className="roi-analysis">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This section provides ROI analysis and payback period calculation for Portnox implementation.
            </p>
            
            {/* ROI Analysis Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">ROI Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <h4 className="text-md font-medium mb-2">Return on Investment (3-Year)</h4>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4">
                        <div 
                          className="bg-portnox-primary h-4 rounded-full" 
                          style={{ width: `${Math.min(100, Math.round(portnox.roi))}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-xl font-bold text-portnox-primary">{Math.round(portnox.roi)}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total Investment:</span>
                      <span className="float-right font-medium text-gray-900 dark:text-gray-100">
                        {formatCurrency(portnox.totalTco)}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total Benefits:</span>
                      <span className="float-right font-medium text-gray-900 dark:text-gray-100">
                        {formatCurrency(portnox.totalSavings)}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Net Value:</span>
                      <span className="float-right font-medium text-green-600 dark:text-green-400">
                        {formatCurrency(portnox.totalSavings - portnox.totalTco)}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">ROI:</span>
                      <span className="float-right font-bold text-portnox-primary">
                        {Math.round(portnox.roi)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium mb-2">Payback Period</h4>
                  <div className="text-center py-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-3xl font-bold text-portnox-primary">{Math.round(portnox.paybackPeriod)}</span>
                    <span className="text-xl font-medium text-gray-700 dark:text-gray-300"> months</span>
                    
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Time to positive return on investment
                    </div>
                    
                    {topCompetitor && (
                      <div className="mt-4 text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Compared to </span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">{topCompetitor.name}: </span>
                        <span className="font-medium text-green-600 dark:text-green-400">
                          {Math.round(topCompetitor.paybackPeriod - portnox.paybackPeriod)} months faster
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* ROI Components Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">ROI Components</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Benefit Category
                      </th>
                      <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        3-Year Value
                      </th>
                      <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Annual Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                        <div className="font-medium">Risk Reduction</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Decreased probability and impact of security incidents</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-300">
                        {formatCurrency(portnox.riskReductionValue)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-300">
                        {formatCurrency(portnox.riskReductionValue / 3)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                        <div className="font-medium">Compliance Savings</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Reduced audit preparation time and resources</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-300">
                        {formatCurrency(portnox.complianceSavings)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-300">
                        {formatCurrency(portnox.complianceSavings / 3)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                        <div className="font-medium">Productivity Gains</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Reduced management overhead and simplified operations</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-300">
                        {formatCurrency(portnox.productivityGains)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-300">
                        {formatCurrency(portnox.productivityGains / 3)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                        <div className="font-medium">Insurance Premium Reduction</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Lower cyber insurance costs due to improved security posture</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-300">
                        {formatCurrency(portnox.insuranceSavings)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-300">
                        {formatCurrency(portnox.insuranceSavings / 3)}
                      </td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        Total Benefits
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right text-green-600 dark:text-green-400">
                        {formatCurrency(portnox.totalSavings)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right text-green-600 dark:text-green-400">
                        {formatCurrency(portnox.totalSavings / 3)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'projections' && (
          <div className="cost-projections">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This section provides cost projections over multiple time periods.
            </p>
            
            {/* Cost Projection Chart */}
            <div className="mb-6">
              <SavingsProjectionChart height={350} />
            </div>
            
            {/* Cumulative Costs Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Cumulative Cost Comparison</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Solution
                      </th>
                      <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Initial
                      </th>
                      <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Year 1
                      </th>
                      <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Year 2
                      </th>
                      <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Year 3
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {/* Portnox Row */}
                    <tr className="bg-green-50 dark:bg-green-900/10">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        {portnox.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-100">
                        {formatCurrency(portnox.cumulativeCosts.initial)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-100">
                        {formatCurrency(portnox.cumulativeCosts.year1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-100">
                        {formatCurrency(portnox.cumulativeCosts.year2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-100 font-medium">
                        {formatCurrency(portnox.cumulativeCosts.year3)}
                      </td>
                    </tr>
                    
                    {/* Competitor Rows */}
                    {calculationResults.vendorResults
                      .filter((v: VendorResult) => v.vendorId !== 'portnox')
                      .sort((a: VendorResult, b: VendorResult) => b.totalTco - a.totalTco)
                      .map((competitor: VendorResult, index: number) => (
                        <tr key={competitor.vendorId} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/30' : ''}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                            {competitor.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700 dark:text-gray-300">
                            {formatCurrency(competitor.cumulativeCosts.initial)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700 dark:text-gray-300">
                            {formatCurrency(competitor.cumulativeCosts.year1)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700 dark:text-gray-300">
                            {formatCurrency(competitor.cumulativeCosts.year2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700 dark:text-gray-300">
                            {formatCurrency(competitor.cumulativeCosts.year3)}
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'report' && (
          <div className="financial-report">
            <FinancialReport />
          </div>
        )}
      </TabPanel>
    </div>
  );
};

export default FinancialView;
