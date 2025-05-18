import React, { useState } from 'react';
import { useCalculator } from '../../context/CalculatorContext';
import { VendorResult } from '../../utils/calculationEngine';
import { formatCurrency, formatPercentage, formatNumber, formatDays } from '../../utils/formatters';
import TcoBreakdownChart from '../charts/TcoBreakdownChart';
import SavingsProjectionChart from '../charts/SavingsProjectionChart';

interface FinancialReportProps {
  className?: string;
  exportable?: boolean;
}

const FinancialReport: React.FC<FinancialReportProps> = ({ 
  className = '',
  exportable = false
}) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  const [timeframe, setTimeframe] = useState<'1-year'|'3-year'|'5-year'>('3-year');
  
  if (!calculationResults) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <p className="text-gray-600 dark:text-gray-400">
          No calculation data available. Please calculate first.
        </p>
      </div>
    );
  }

  // Get Portnox data
  const portnox = calculationResults.vendorResults.find((v: VendorResult) => v.vendorId === 'portnox');
  if (!portnox) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <p className="text-gray-600 dark:text-gray-400">
          Portnox data not found in calculation results.
        </p>
      </div>
    );
  }
  
  // Get competitors for comparison
  const competitors = calculationResults.vendorResults
    .filter((v: VendorResult) => v.vendorId !== 'portnox')
    .sort((a: VendorResult, b: VendorResult) => b.totalTco - a.totalTco);
  
  // Calculate time-adjusted metrics based on selected timeframe
  const timeframeMultiplier = timeframe === '1-year' ? 1/3 : timeframe === '5-year' ? 5/3 : 1;
  
  const adjustMetric = (value: number) => Math.round(value * timeframeMultiplier);
  
  const selectedTimeframeLabel = timeframe === '1-year' ? '1-Year' : timeframe === '3-year' ? '3-Year' : '5-Year';
  
  // Calculate annual and monthly costs
  const annualCost = portnox.totalTco / 3;
  const monthlyCost = annualCost / 12;
  
  // Calculate 5-year projections (extending beyond the 3-year calculation)
  const fiveYearTco = portnox.cumulativeCosts.year3 * (5/3);
  const fiveYearSavings = calculationResults.executiveSummary.totalSavings * (5/3);
  
  // Extension factors for subscription and operational costs after year 3
  const year4Factor = 1.03; // 3% increase for year 4
  const year5Factor = 1.06; // 6% increase for year 5
  
  // Estimated costs for years 4 and 5
  const year4Cost = annualCost * year4Factor;
  const year5Cost = annualCost * year5Factor;
  
  // Calculate projected ROI at different timeframes
  const oneYearRoi = (portnox.totalSavings / 3) / (portnox.totalTco / 3) * 100;
  const threeYearRoi = portnox.roi;
  const fiveYearRoi = (fiveYearSavings / fiveYearTco) * 100;
  
  // Prepare document class for exportable version
  const documentClass = exportable ? 'max-w-5xl mx-auto bg-white p-8' : `bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm ${className}`;
  
  return (
    <div className={documentClass}>
      {/* Report Header */}
      <div className="mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/img/vendors/portnox-logo.png" alt="Portnox Logo" className="h-10 mr-4" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Analysis Report</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                NAC Solution Cost Analysis and Projections
              </p>
            </div>
          </div>
          
          {!exportable && (
            <div className="flex space-x-2">
              <button 
                className="btn btn-outline flex items-center text-sm"
                onClick={() => window.print()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                </svg>
                Print Report
              </button>
              <button 
                className="btn btn-outline flex items-center text-sm"
                onClick={() => alert('Export functionality will be implemented in a future update.')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Export PDF
              </button>
            </div>
          )}
        </div>
        
        {/* Timeframe Selector */}
        <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium text-gray-700 dark:text-gray-300">Report Details: </span>
              Generated on {new Date().toLocaleDateString()} | Data Version: {state.costParameters.portnoxBasePricePerDevice.toFixed(2)}
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Timeframe:</span>
              <div className="flex rounded-md border border-gray-300 dark:border-gray-600 overflow-hidden">
                <button 
                  className={`px-3 py-1 text-sm ${timeframe === '1-year' ? 'bg-portnox-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                  onClick={() => setTimeframe('1-year')}
                >
                  1-Year
                </button>
                <button 
                  className={`px-3 py-1 text-sm ${timeframe === '3-year' ? 'bg-portnox-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                  onClick={() => setTimeframe('3-year')}
                >
                  3-Year
                </button>
                <button 
                  className={`px-3 py-1 text-sm ${timeframe === '5-year' ? 'bg-portnox-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                  onClick={() => setTimeframe('5-year')}
                >
                  5-Year
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Executive Summary Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
          Executive Summary
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-100 dark:border-green-800">
            <h3 className="text-lg font-medium text-green-700 dark:text-green-400 mb-2">
              {selectedTimeframeLabel} TCO
            </h3>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {formatCurrency(adjustMetric(portnox.totalTco))}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {formatCurrency(monthlyCost)} per month
            </div>
            {timeframe !== '1-year' && (
              <div className="mt-2 pt-2 border-t border-green-100 dark:border-green-800">
                <div className="text-sm flex justify-between">
                  <span>Annual Cost:</span>
                  <span className="font-medium">{formatCurrency(annualCost)}</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
            <h3 className="text-lg font-medium text-blue-700 dark:text-blue-400 mb-2">
              {selectedTimeframeLabel} Savings
            </h3>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {formatCurrency(adjustMetric(calculationResults.executiveSummary.totalSavings))}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              vs. traditional NAC solutions
            </div>
            {timeframe !== '1-year' && (
              <div className="mt-2 pt-2 border-t border-blue-100 dark:border-blue-800">
                <div className="text-sm flex justify-between">
                  <span>Annual Savings:</span>
                  <span className="font-medium">{formatCurrency(calculationResults.financialSummary.annualSavings)}</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-100 dark:border-purple-800">
            <h3 className="text-lg font-medium text-purple-700 dark:text-purple-400 mb-2">
              {selectedTimeframeLabel} ROI
            </h3>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {timeframe === '1-year' ? 
                Math.round(oneYearRoi) : 
                timeframe === '3-year' ? 
                  Math.round(threeYearRoi) : 
                  Math.round(fiveYearRoi)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Return on Investment
            </div>
            <div className="mt-2 pt-2 border-t border-purple-100 dark:border-purple-800">
              <div className="text-sm flex justify-between">
                <span>Payback Period:</span>
                <span className="font-medium">{Math.round(portnox.paybackPeriod)} months</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This report presents a comprehensive financial analysis of Portnox Cloud compared to traditional NAC solutions. 
            The {selectedTimeframeLabel.toLowerCase()} analysis demonstrates that Portnox offers superior financial benefits with:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm space-y-1 ml-2">
              <li><span className="font-medium">{calculationResults.executiveSummary.savingsPercentage}% lower TCO</span> compared to traditional solutions</li>
              <li><span className="font-medium">{Math.round(competitors[0]?.implementationDays / portnox.implementationDays)}x faster deployment</span> (time-to-security)</li>
              <li><span className="font-medium">Zero hardware costs</span> with cloud-native architecture</li>
              <li><span className="font-medium">{Math.round(calculationResults.securitySummary.riskReduction)}% risk reduction</span> with continuous security updates</li>
            </ul>
            
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm space-y-1 ml-2">
              <li><span className="font-medium">{Math.round(threeYearRoi)}% ROI</span> over 3 years ({Math.round(fiveYearRoi)}% over 5 years)</li>
              <li><span className="font-medium">{Math.round(portnox.paybackPeriod)} month</span> payback period</li>
              <li><span className="font-medium">{Math.round(100 - (portnox.staffingCost / competitors[0]?.staffingCost * 100))}% reduced</span> operational overhead</li>
              <li><span className="font-medium">Predictable subscription model</span> with no surprise upgrade costs</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Cost Breakdown & Comparison Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
          {selectedTimeframeLabel} Cost Breakdown & Comparison
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-md font-medium mb-3 text-gray-700 dark:text-gray-300">
              Portnox Cloud Cost Breakdown
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="relative" style={{ height: '220px' }}>
                <TcoBreakdownChart height={220} vendorId="portnox" />
              </div>
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subscription:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {formatCurrency(adjustMetric(portnox.subscriptionCost))} 
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                        ({Math.round(portnox.subscriptionCost / portnox.totalTco * 100)}%)
                      </span>
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Implementation:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {formatCurrency(portnox.implementationCost)}
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                        ({Math.round(portnox.implementationCost / portnox.totalTco * 100)}%)
                      </span>
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Operational:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {formatCurrency(adjustMetric(portnox.staffingCost))}
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                        ({Math.round(portnox.staffingCost / portnox.totalTco * 100)}%)
                      </span>
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Hardware & Infrastructure:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {formatCurrency(adjustMetric(portnox.hardwareCost + portnox.infrastructureCost))}
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                        ({Math.round((portnox.hardwareCost + portnox.infrastructureCost) / portnox.totalTco * 100)}%)
                      </span>
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="font-medium text-gray-800 dark:text-gray-200">Total {selectedTimeframeLabel} TCO:</span>
                    <span className="font-bold text-portnox-primary">
                      {formatCurrency(adjustMetric(portnox.totalTco))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {competitors.length > 0 && (
            <div>
              <h3 className="text-md font-medium mb-3 text-gray-700 dark:text-gray-300">
                {competitors[0].name} Cost Breakdown
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="relative" style={{ height: '220px' }}>
                  <TcoBreakdownChart height={220} vendorId={competitors[0].vendorId} />
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">License & Maintenance:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {formatCurrency(adjustMetric(competitors[0].licenseCost + competitors[0].maintenanceCost))}
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                          ({Math.round((competitors[0].licenseCost + competitors[0].maintenanceCost) / competitors[0].totalTco * 100)}%)
                        </span>
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Implementation:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {formatCurrency(competitors[0].implementationCost)}
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                          ({Math.round(competitors[0].implementationCost / competitors[0].totalTco * 100)}%)
                        </span>
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Operational:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {formatCurrency(adjustMetric(competitors[0].staffingCost))}
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                          ({Math.round(competitors[0].staffingCost / competitors[0].totalTco * 100)}%)
                        </span>
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Hardware & Infrastructure:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {formatCurrency(adjustMetric(competitors[0].hardwareCost + competitors[0].infrastructureCost))}
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                          ({Math.round((competitors[0].hardwareCost + competitors[0].infrastructureCost) / competitors[0].totalTco * 100)}%)
                        </span>
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-700">
                      <span className="font-medium text-gray-800 dark:text-gray-200">Total {selectedTimeframeLabel} TCO:</span>
                      <span className="font-bold text-gray-900 dark:text-gray-100">
                        {formatCurrency(adjustMetric(competitors[0].totalTco))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Total Cost Comparison Chart */}
        <div className="mb-6">
          <h3 className="text-md font-medium mb-3 text-gray-700 dark:text-gray-300">
            {selectedTimeframeLabel} TCO Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-r border-gray-200 dark:border-gray-700">
                    Solution
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-r border-gray-200 dark:border-gray-700">
                    {selectedTimeframeLabel} TCO
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-r border-gray-200 dark:border-gray-700">
                    Annual Cost
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-r border-gray-200 dark:border-gray-700">
                    Cost Per Device
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                    Savings vs Portnox
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {/* Portnox Row */}
                <tr className="bg-green-50 dark:bg-green-900/10">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700">
                    {portnox.name}
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Best Value
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-medium text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700">
                    {formatCurrency(adjustMetric(portnox.totalTco))}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700">
                    {formatCurrency(portnox.totalTco / 3)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700">
                    {formatCurrency((portnox.totalTco / 3) / state.deviceCount)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-medium text-green-600 dark:text-green-400">
                    -
                  </td>
                </tr>
                
                {/* Competitor Rows */}
                {competitors.map((competitor, index) => {
                  const comparisonData = calculationResults.comparisonResults[competitor.vendorId];
                  return (
                    <tr key={competitor.vendorId} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/30' : ''}>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {competitor.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {formatCurrency(adjustMetric(competitor.totalTco))}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {formatCurrency(competitor.totalTco / 3)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {formatCurrency((competitor.totalTco / 3) / state.deviceCount)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-red-600 dark:text-red-400">
                        +{formatCurrency(adjustMetric(comparisonData.savings))} ({Math.round(comparisonData.savingsPercentage)}%)
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Projected Costs & Savings Over Time */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
          Projected Costs & Savings Over Time
        </h2>
        
        <div className="mb-6">
          <div className="mb-6 relative" style={{ height: '360px' }}>
            <SavingsProjectionChart height={360} />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <h3 className="py-3 px-4 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium text-sm">
              5-Year Cost & Savings Projection
            </h3>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Year
                      </th>
                      <th className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Portnox Cost
                      </th>
                      <th className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Competitor Cost
                      </th>
                      <th className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Annual Savings
                      </th>
                      <th className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Cumulative Savings
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Initial Investment */}
                    <tr className="bg-gray-50 dark:bg-gray-700/30">
                      <td className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Initial
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-gray-700 dark:text-gray-300">
                        {formatCurrency(portnox.cumulativeCosts.initial)}
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-gray-700 dark:text-gray-300">
                        {formatCurrency(competitors[0]?.cumulativeCosts.initial || 0)}
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-green-600 dark:text-green-400">
                        {formatCurrency((competitors[0]?.cumulativeCosts.initial || 0) - portnox.cumulativeCosts.initial)}
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-green-600 dark:text-green-400 font-medium">
                        {formatCurrency((competitors[0]?.cumulativeCosts.initial || 0) - portnox.cumulativeCosts.initial)}
                      </td>
                    </tr>
                    
                    {/* Year 1 */}
                    <tr>
                      <td className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Year 1
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-gray-700 dark:text-gray-300">
                        {formatCurrency(portnox.cumulativeCosts.year1)}
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-gray-700 dark:text-gray-300">
                        {formatCurrency(competitors[0]?.cumulativeCosts.year1 || 0)}
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-green-600 dark:text-green-400">
                        {formatCurrency((competitors[0]?.cumulativeCosts.year1 || 0) - portnox.cumulativeCosts.year1)}
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-green-600 dark:text-green-400 font-medium">
                        {formatCurrency((competitors[0]?.cumulativeCosts.year1 || 0) - portnox.cumulativeCosts.year1)}
                      </td>
                    </tr>
                    
                    {/* Year 2 */}
                    <tr className="bg-gray-50 dark:bg-gray-700/30">
                      <td className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Year 2
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-gray-700 dark:text-gray-300">
                        {formatCurrency(portnox.cumulativeCosts.year2)}
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-gray-700 dark:text-gray-300">
                        {formatCurrency(competitors[0]?.cumulativeCosts.year2 || 0)}
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-green-600 dark:text-green-400">
                        {formatCurrency((competitors[0]?.cumulativeCosts.year2 || 0) - portnox.cumulativeCosts.year2)}
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-green-600 dark:text-green-400 font-medium">
                        {formatCurrency((competitors[0]?.cumulativeCosts.year2 || 0) - portnox.cumulativeCosts.year2)}
                      </td>
                    </tr>
                    
                    {/* Year 3 */}
                    <tr>
                      <td className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Year 3
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-gray-700 dark:text-gray-300">
                        {formatCurrency(portnox.cumulativeCosts.year3)}
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-gray-700 dark:text-gray-300">
                        {formatCurrency(competitors[0]?.cumulativeCosts.year3 || 0)}
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-green-600 dark:text-green-400">
                        {formatCurrency((competitors[0]?.cumulativeCosts.year3 || 0) - portnox.cumulativeCosts.year3)}
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-green-600 dark:text-green-400 font-medium">
                        {formatCurrency((competitors[0]?.cumulativeCosts.year3 || 0) - portnox.cumulativeCosts.year3)}
                      </td>
                    </tr>
                    
                    {/* Year 4 (Projected) */}
                    <tr className="bg-gray-50 dark:bg-gray-700/30">
                      <td className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Year 4 (Projected)
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-gray-700 dark:text-gray-300">
                        {formatCurrency(portnox.cumulativeCosts.year3 + year4Cost)}
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-gray-700 dark:text-gray-300">
                        {formatCurrency((competitors[0]?.cumulativeCosts.year3 || 0) + (year4Cost * 1.15))}
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-green-600 dark:text-green-400">
                        {formatCurrency(((competitors[0]?.cumulativeCosts.year3 || 0) + (year4Cost * 1.15)) - (portnox.cumulativeCosts.year3 + year4Cost))}
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-green-600 dark:text-green-400 font-medium">
                        {formatCurrency(((competitors[0]?.cumulativeCosts.year3 || 0) - portnox.cumulativeCosts.year3) + ((year4Cost * 1.15) - year4Cost))}
                      </td>
                    </tr>
                    
                    {/* Year 5 (Projected) */}
                    <tr>
                      <td className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Year 5 (Projected)
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-gray-700 dark:text-gray-300">
                        {formatCurrency(portnox.cumulativeCosts.year3 + year4Cost + year5Cost)}
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-gray-700 dark:text-gray-300">
                        {formatCurrency((competitors[0]?.cumulativeCosts.year3 || 0) + (year4Cost * 1.15) + (year5Cost * 1.25))}
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-green-600 dark:text-green-400">
                        {formatCurrency(((competitors[0]?.cumulativeCosts.year3 || 0) + (year4Cost * 1.15) + (year5Cost * 1.25)) - (portnox.cumulativeCosts.year3 + year4Cost + year5Cost))}
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-green-600 dark:text-green-400 font-medium">
                        {formatCurrency(((competitors[0]?.cumulativeCosts.year3 || 0) - portnox.cumulativeCosts.year3) + ((year4Cost * 1.15) - year4Cost) + ((year5Cost * 1.25) - year5Cost))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                <p>* Year 4-5 projections include estimated 3% annual subscription increase for Portnox and 5-10% maintenance/upgrade costs for on-premises solutions</p>
                <p>* Hardware refresh costs for on-premises solutions may apply in years 4-5 (not included in projection)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Budget Impact Analysis */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
          Budget Impact Analysis
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <h3 className="py-3 px-4 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium text-sm">
              Capital vs. Operational Expense
            </h3>
            <div className="p-4">
              <div className="flex flex-col space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Portnox Cloud (100% OpEx)</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{formatCurrency(portnox.totalTco)}</span>
                  </div>
                  <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>OpEx: 100%</span>
                    <span>CapEx: 0%</span>
                  </div>
                </div>
                
                {competitors.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{competitors[0].name}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{formatCurrency(competitors[0].totalTco)}</span>
                    </div>
                    <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
                      <div className="h-full bg-blue-500" style={{ width: `${Math.round((competitors[0].staffingCost + competitors[0].maintenanceCost) / competitors[0].totalTco * 100)}%` }}></div>
                      <div className="h-full bg-red-500" style={{ width: `${Math.round((competitors[0].licenseCost + competitors[0].hardwareCost + competitors[0].implementationCost) / competitors[0].totalTco * 100)}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>OpEx: {Math.round((competitors[0].staffingCost + competitors[0].maintenanceCost) / competitors[0].totalTco * 100)}%</span>
                      <span>CapEx: {Math.round((competitors[0].licenseCost + competitors[0].hardwareCost + competitors[0].implementationCost) / competitors[0].totalTco * 100)}%</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Budgeting Benefits:</span> Portnox Cloud's 100% operational expense model provides:
                </p>
                <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1 ml-2">
                  <li>Predictable monthly subscription costs</li>
                  <li>No upfront capital investment</li>
                  <li>Simplified financial planning</li>
                  <li>Reduced financial risk</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <h3 className="py-3 px-4 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium text-sm">
              Financial KPIs & Metrics
            </h3>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Return on Investment (3-Year)</span>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{Math.round(portnox.roi)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${Math.min(100, Math.round(portnox.roi))}%` }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Return on Investment (5-Year)</span>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{Math.round(fiveYearRoi)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${Math.min(100, Math.round(fiveYearRoi / 2))}%` }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Payback Period</span>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{Math.round(portnox.paybackPeriod)} months</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${Math.min(100, Math.round(100 - (portnox.paybackPeriod / 24 * 100)))}%` }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">TCO Reduction vs. Competitors</span>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{calculationResults.executiveSummary.savingsPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${Math.min(100, calculationResults.executiveSummary.savingsPercentage)}%` }}></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <table className="min-w-full text-sm">
                    <tbody>
                      <tr>
                        <td className="py-2 text-gray-600 dark:text-gray-400">Net Present Value (NPV) - 3 Year:</td>
                        <td className="py-2 text-right font-medium text-gray-900 dark:text-gray-100">
                          {formatCurrency(portnox.totalSavings - portnox.totalTco)}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-600 dark:text-gray-400">Net Present Value (NPV) - 5 Year:</td>
                        <td className="py-2 text-right font-medium text-gray-900 dark:text-gray-100">
                          {formatCurrency(fiveYearSavings - fiveYearTco)}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-600 dark:text-gray-400">Cost Per Device (Annual):</td>
                        <td className="py-2 text-right font-medium text-gray-900 dark:text-gray-100">
                          {formatCurrency(annualCost / state.deviceCount)}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-600 dark:text-gray-400">Investment Efficiency Ratio:</td>
                        <td className="py-2 text-right font-medium text-gray-900 dark:text-gray-100">
                          {(portnox.totalSavings / portnox.totalTco).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recommendations & Budget Considerations */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
          Recommendations & Budget Considerations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-md font-medium mb-3 text-gray-700 dark:text-gray-300">
              Budget Recommendations
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Based on the financial analysis, we recommend the following budget allocations 
                for Portnox Cloud implementation:
              </p>
              
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Timeframe</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Budget Allocation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-3 py-2 text-gray-600 dark:text-gray-400">Initial Setup (One-time)</td>
                    <td className="px-3 py-2 text-right font-medium text-gray-900 dark:text-gray-100">
                      {formatCurrency(portnox.implementationCost)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-gray-600 dark:text-gray-400">Year 1 Subscription</td>
                    <td className="px-3 py-2 text-right font-medium text-gray-900 dark:text-gray-100">
                      {formatCurrency(portnox.subscriptionCost / 3)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-gray-600 dark:text-gray-400">Year 1 Operational</td>
                    <td className="px-3 py-2 text-right font-medium text-gray-900 dark:text-gray-100">
                      {formatCurrency(portnox.staffingCost / 3)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-gray-600 dark:text-gray-400">Year 1 Total</td>
                    <td className="px-3 py-2 text-right font-medium text-portnox-primary">
                      {formatCurrency(portnox.implementationCost + (portnox.subscriptionCost / 3) + (portnox.staffingCost / 3))}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-gray-600 dark:text-gray-400">Year 2 Budget</td>
                    <td className="px-3 py-2 text-right font-medium text-gray-900 dark:text-gray-100">
                      {formatCurrency((portnox.subscriptionCost / 3) + (portnox.staffingCost / 3))}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-gray-600 dark:text-gray-400">Year 3 Budget</td>
                    <td className="px-3 py-2 text-right font-medium text-gray-900 dark:text-gray-100">
                      {formatCurrency((portnox.subscriptionCost / 3) + (portnox.staffingCost / 3))}
                    </td>
                  </tr>
                </tbody>
                <tfoot className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <td className="px-3 py-2 font-medium text-gray-700 dark:text-gray-300">3-Year Total Budget</td>
                    <td className="px-3 py-2 text-right font-bold text-portnox-primary">
                      {formatCurrency(portnox.totalTco)}
                    </td>
                  </tr>
                </tfoot>
              </table>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Monthly Subscription:</span> {formatCurrency(monthlyCost)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span className="font-medium">Per-Device Monthly Cost:</span> {formatCurrency(monthlyCost / state.deviceCount)}
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium mb-3 text-gray-700 dark:text-gray-300">
              Budget Planning Considerations
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">Implementation Timeline</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Portnox Cloud can be fully implemented in {portnox.implementationDays} days, 
                    allowing for rapid deployment and quick time-to-value.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">Financial Benefits</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1 ml-2">
                    <li>Shift from capital to operational expenditure</li>
                    <li>Elimination of hardware refresh cycles</li>
                    <li>Reduced maintenance and support costs</li>
                    <li>Lower training and specialized staffing costs</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">Risk Mitigation</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1 ml-2">
                    <li>Predictable subscription model eliminates surprise costs</li>
                    <li>No hardware failure risk or replacement costs</li>
                    <li>Continuous updates maintain security posture</li>
                    <li>Reduced risk of implementation failure</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">Procurement Recommendations</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1 ml-2">
                    <li>Annual subscription plan for optimal pricing</li>
                    <li>Professional services package for implementation</li>
                    <li>3-year agreement for maximum cost stability</li>
                    <li>Include training and knowledge transfer services</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="text-md font-medium mb-2 text-gray-800 dark:text-gray-200">Financial Decision Timeline</h3>
          
          <div className="relative pb-12">
            {/* Timeline Line */}
            <div className="absolute h-full w-0.5 bg-gray-200 dark:bg-gray-600 left-6 top-0"></div>
            
            {/* Month 1: Purchase & Implementation */}
            <div className="mb-8 flex">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-portnox-primary flex items-center justify-center relative z-10">
                <span className="text-white font-bold">1</span>
              </div>
              <div className="ml-4 pt-2">
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">Month 1: Purchase & Implementation</h4>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Initial investment of {formatCurrency(portnox.implementationCost)} for implementation and first month subscription.
                </p>
              </div>
            </div>
            
            {/* Month 4: Operational Efficiency */}
            <div className="mb-8 flex">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center relative z-10">
                <span className="text-white font-bold">4</span>
              </div>
              <div className="ml-4 pt-2">
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">Month 4: Operational Efficiency</h4>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Operational costs reduced as staff efficiency improves. Estimated monthly savings of {formatCurrency(portnox.productivityGains / 36)} begin.
                </p>
              </div>
            </div>
            
            {/* Month 7: Breakeven Point */}
            <div className="mb-8 flex">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center relative z-10">
                <span className="text-white font-bold">{Math.round(portnox.paybackPeriod)}</span>
              </div>
              <div className="ml-4 pt-2">
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">Month {Math.round(portnox.paybackPeriod)}: Breakeven Point</h4>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Investment fully recovered through combined cost savings and operational benefits.
                </p>
              </div>
            </div>
            
            {/* Year 1: Full ROI */}
            <div className="flex">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center relative z-10">
                <span className="text-white font-bold">12</span>
              </div>
              <div className="ml-4 pt-2">
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">Year 1: Full ROI Realized</h4>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Full first-year ROI of {Math.round(oneYearRoi)}% achieved, with annual savings of {formatCurrency(calculationResults.financialSummary.annualSavings)}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Report Footer */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 text-xs text-gray-500 dark:text-gray-400 text-center flex justify-between items-center">
        <div className="flex items-center">
          <img src="/img/vendors/portnox-logo.png" alt="Portnox Logo" className="h-6 mr-2" />
          <span>Portnox Total Cost Analyzer | Financial Report</span>
        </div>
        <div>
          Generated: {new Date().toLocaleDateString()} | Page 1 of 1
        </div>
      </div>
    </div>
  );
};

export default FinancialReport;
