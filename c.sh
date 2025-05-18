#!/bin/bash

# Script to add a comprehensive executive summary report to the Portnox TCO Analyzer

echo "===== Portnox TCO Analyzer Executive Summary Enhancement ====="

# Define the report component path
REPORTS_DIR="src/components/reports"
EXEC_REPORT_PATH="${REPORTS_DIR}/ExecutiveSummaryReport.tsx"

# Ensure the reports directory exists
mkdir -p "$REPORTS_DIR"

# Create the executive summary report component
cat > "$EXEC_REPORT_PATH" << 'EOF'
import React from 'react';
import { useCalculator } from '../../context/CalculatorContext';
import { VendorResult } from '../../utils/calculationEngine';
import { formatCurrency, formatPercentage, formatDays } from '../../utils/formatters';

interface ExecutiveSummaryReportProps {
  className?: string;
  exportable?: boolean;
}

const ExecutiveSummaryReport: React.FC<ExecutiveSummaryReportProps> = ({ 
  className = '',
  exportable = false
}) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  
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
  
  // Get top competitor if available
  const topCompetitor = competitors.length > 0 ? competitors[0] : null;
  
  // Prepare document class for exportable version
  const documentClass = exportable ? 'max-w-4xl mx-auto bg-white p-8' : `bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm ${className}`;
  
  return (
    <div className={documentClass}>
      {/* Report Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Executive Summary</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Network Access Control Solution Comparison
            </p>
          </div>
          {!exportable && (
            <div>
              <button 
                className="btn btn-outline flex items-center text-sm"
                onClick={() => window.print()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                </svg>
                Export PDF
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Key Findings Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Key Findings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-medium text-green-700 dark:text-green-400 mb-2">Financial Benefits</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-white">{formatCurrency(calculationResults.executiveSummary.totalSavings)}</strong> total savings over 3 years ({calculationResults.executiveSummary.savingsPercentage}% reduction)
                </span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-white">{formatCurrency(calculationResults.financialSummary.annualSavings)}</strong> annual cost reduction vs. alternatives
                </span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-white">{Math.round(portnox.roi)}%</strong> ROI over 3 years
                </span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-white">{calculationResults.executiveSummary.paybackPeriod} months</strong> payback period
                </span>
              </li>
            </ul>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-medium text-blue-700 dark:text-blue-400 mb-2">Strategic Advantages</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-white">{calculationResults.executiveSummary.riskReduction}%</strong> security posture improvement
                </span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-white">{calculationResults.executiveSummary.implementationTime} days</strong> to deployment (75% faster than alternatives)
                </span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-white">Zero hardware</strong> required (cloud-native architecture)
                </span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-white">Continuous security updates</strong> vs. periodic patching
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Cost Comparison Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Total Cost of Ownership</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                  Solution
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                  3-Year TCO
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                  Savings vs. Portnox
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                  Implementation Time
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                  ROI
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Portnox Row */}
              <tr className="bg-green-50 dark:bg-green-900/10">
                <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100 border-r border-gray-200 dark:border-gray-700">
                  {portnox.name}
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Best Value
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-right text-gray-900 dark:text-gray-100 font-medium border-r border-gray-200 dark:border-gray-700">
                  {formatCurrency(portnox.totalTco)}
                </td>
                <td className="py-3 px-4 text-sm text-right text-green-600 dark:text-green-400 font-medium border-r border-gray-200 dark:border-gray-700">
                  -
                </td>
                <td className="py-3 px-4 text-sm text-right text-gray-900 dark:text-gray-100 border-r border-gray-200 dark:border-gray-700">
                  {portnox.implementationDays} days
                </td>
                <td className="py-3 px-4 text-sm text-right text-gray-900 dark:text-gray-100 font-medium">
                  {Math.round(portnox.roi)}%
                </td>
              </tr>
              
              {/* Competitor Rows */}
              {competitors.map((competitor: VendorResult, index: number) => {
                const comparisonData = calculationResults.comparisonResults[competitor.vendorId];
                return (
                  <tr key={competitor.vendorId} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/30' : ''}>
                    <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                      {competitor.name}
                      {competitor.badge && (
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${competitor.badgeClass}`}>
                          {competitor.badge}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-right text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                      {formatCurrency(competitor.totalTco)}
                    </td>
                    <td className="py-3 px-4 text-sm text-right text-red-600 dark:text-red-400 font-medium border-r border-gray-200 dark:border-gray-700">
                      +{formatCurrency(comparisonData.savings)} ({Math.round(comparisonData.savingsPercentage)}%)
                    </td>
                    <td className="py-3 px-4 text-sm text-right text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                      {competitor.implementationDays} days
                    </td>
                    <td className="py-3 px-4 text-sm text-right text-gray-700 dark:text-gray-300">
                      {Math.round(competitor.roi)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Cost Structure Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Cost Structure Comparison</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-green-600 dark:text-green-400">Portnox Cloud</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Subscription Costs:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {formatCurrency(portnox.subscriptionCost)}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Implementation:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {formatCurrency(portnox.implementationCost)}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Operational Costs:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {formatCurrency(portnox.staffingCost)}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Hardware & Infrastructure:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {formatCurrency(portnox.hardwareCost + portnox.infrastructureCost)}
                </span>
              </li>
              <li className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Total 3-Year TCO:</span>
                <span className="text-sm font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(portnox.totalTco)}
                </span>
              </li>
            </ul>
          </div>
          
          {topCompetitor && (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">{topCompetitor.name}</h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {topCompetitor.pricing?.model === 'subscription' ? 'Subscription Costs:' : 'License & Maintenance:'}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {formatCurrency(topCompetitor.subscriptionCost + topCompetitor.licenseCost + topCompetitor.maintenanceCost)}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Implementation:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {formatCurrency(topCompetitor.implementationCost)}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Operational Costs:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {formatCurrency(topCompetitor.staffingCost)}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Hardware & Infrastructure:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {formatCurrency(topCompetitor.hardwareCost + topCompetitor.infrastructureCost)}
                  </span>
                </li>
                <li className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Total 3-Year TCO:</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {formatCurrency(topCompetitor.totalTco)}
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {/* Business Benefits Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Business Benefits</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500 shadow-sm">
            <h3 className="text-md font-medium mb-2 text-blue-600 dark:text-blue-400">Financial Impact</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Portnox Cloud delivers {formatCurrency(calculationResults.executiveSummary.totalSavings)} in 3-year savings 
              through eliminated hardware costs, simplified deployment, and reduced operational overhead.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-purple-500 shadow-sm">
            <h3 className="text-md font-medium mb-2 text-purple-600 dark:text-purple-400">Operational Efficiency</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Cloud-native architecture reduces IT workload by 75%, with no hardware to maintain 
              and a simplified management interface that requires minimal specialized training.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-green-500 shadow-sm">
            <h3 className="text-md font-medium mb-2 text-green-600 dark:text-green-400">Security Enhancement</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {calculationResults.executiveSummary.riskReduction}% security improvement with continuous 
              updates and real-time monitoring, reducing breach probability and Mean Time to Respond.
            </p>
          </div>
        </div>
      </div>
      
      {/* Competitive Advantages Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Competitive Advantages</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                  Capability
                </th>
                <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                  Portnox Cloud
                </th>
                {competitors.slice(0, 2).map((competitor: VendorResult) => (
                  <th key={competitor.vendorId} className="py-3 px-4 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                    {competitor.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                  Cloud Architecture
                </td>
                <td className="py-3 px-4 text-sm text-center text-gray-900 dark:text-gray-100 font-medium border-r border-gray-200 dark:border-gray-700">
                  <span className="text-green-600 dark:text-green-400">Native</span>
                </td>
                {competitors.slice(0, 2).map((competitor: VendorResult) => (
                  <td key={competitor.vendorId} className="py-3 px-4 text-sm text-center text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                    {competitor.featureScores.cloudNative >= 8 ? 'Native' : 
                     competitor.featureScores.cloudNative >= 5 ? 'Partial' : 'Limited'}
                  </td>
                ))}
              </tr>
              
              <tr className="bg-gray-50 dark:bg-gray-700/30">
                <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                  Deployment Time
                </td>
                <td className="py-3 px-4 text-sm text-center text-gray-900 dark:text-gray-100 font-medium border-r border-gray-200 dark:border-gray-700">
                  <span className="text-green-600 dark:text-green-400">{portnox.implementationDays} days</span>
                </td>
                {competitors.slice(0, 2).map((competitor: VendorResult) => (
                  <td key={competitor.vendorId} className="py-3 px-4 text-sm text-center text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                    {competitor.implementationDays} days
                  </td>
                ))}
              </tr>
              
              <tr>
                <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                  Hardware Requirements
                </td>
                <td className="py-3 px-4 text-sm text-center text-gray-900 dark:text-gray-100 font-medium border-r border-gray-200 dark:border-gray-700">
                  <span className="text-green-600 dark:text-green-400">None</span>
                </td>
                {competitors.slice(0, 2).map((competitor: VendorResult) => (
                  <td key={competitor.vendorId} className="py-3 px-4 text-sm text-center text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                    {competitor.hardwareCost > 0 ? 
                      competitor.hardwareCost > 100000 ? 'Significant' : 'Moderate' 
                      : 'Minimal'}
                  </td>
                ))}
              </tr>
              
              <tr className="bg-gray-50 dark:bg-gray-700/30">
                <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                  Management Complexity
                </td>
                <td className="py-3 px-4 text-sm text-center text-gray-900 dark:text-gray-100 font-medium border-r border-gray-200 dark:border-gray-700">
                  <span className="text-green-600 dark:text-green-400">Low</span>
                </td>
                {competitors.slice(0, 2).map((competitor: VendorResult) => (
                  <td key={competitor.vendorId} className="py-3 px-4 text-sm text-center text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                    {competitor.managementComplexity <= 4 ? 'Low' : 
                     competitor.managementComplexity <= 7 ? 'Medium' : 'High'}
                  </td>
                ))}
              </tr>
              
              <tr>
                <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                  Zero Trust Implementation
                </td>
                <td className="py-3 px-4 text-sm text-center text-gray-900 dark:text-gray-100 font-medium border-r border-gray-200 dark:border-gray-700">
                  <span className="text-green-600 dark:text-green-400">Comprehensive</span>
                </td>
                {competitors.slice(0, 2).map((competitor: VendorResult) => (
                  <td key={competitor.vendorId} className="py-3 px-4 text-sm text-center text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                    {competitor.featureScores.zeroTrust >= 8 ? 'Comprehensive' : 
                     competitor.featureScores.zeroTrust >= 5 ? 'Partial' : 'Limited'}
                  </td>
                ))}
              </tr>
              
              <tr className="bg-gray-50 dark:bg-gray-700/30">
                <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                  Continuous Updates
                </td>
                <td className="py-3 px-4 text-sm text-center text-gray-900 dark:text-gray-100 font-medium border-r border-gray-200 dark:border-gray-700">
                  <span className="text-green-600 dark:text-green-400">Automatic</span>
                </td>
                {competitors.slice(0, 2).map((competitor: VendorResult) => (
                  <td key={competitor.vendorId} className="py-3 px-4 text-sm text-center text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                    {competitor.deployment === 'cloud' ? 'Automatic' : 
                     competitor.deployment === 'hybrid' ? 'Semi-Automatic' : 'Manual'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Recommendations Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Recommendations</h2>
        
        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Based on comprehensive analysis of financial metrics, security capabilities, and operational impact, 
            Portnox Cloud offers the highest value for network access control implementation with:
          </p>
          
          <ol className="space-y-2 text-gray-700 dark:text-gray-300 list-decimal list-inside ml-4">
            <li>
              <span className="font-medium text-gray-900 dark:text-gray-100">Lowest Total Cost of Ownership</span> – 
              {formatCurrency(calculationResults.executiveSummary.totalSavings)} savings over 3 years compared to alternatives
            </li>
            <li>
              <span className="font-medium text-gray-900 dark:text-gray-100">Fastest Time to Security</span> – 
              75% faster deployment with no hardware requirements
            </li>
            <li>
              <span className="font-medium text-gray-900 dark:text-gray-100">Reduced Operational Burden</span> – 
              Cloud-native architecture eliminates maintenance overhead
            </li>
            <li>
              <span className="font-medium text-gray-900 dark:text-gray-100">Enhanced Security Posture</span> – 
              Continuous updates and automated threat response
            </li>
            <li>
              <span className="font-medium text-gray-900 dark:text-gray-100">Future-Proof Architecture</span> – 
              Evolving platform with no hardware refresh cycles
            </li>
          </ol>
        </div>
      </div>
      
      {/* Next Steps Section */}
      <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Recommended Next Steps</h2>
        
        <ol className="space-y-2 text-gray-700 dark:text-gray-300 list-decimal list-inside ml-4 mb-4">
          <li>Schedule a Portnox Cloud demonstration focused on your specific use cases</li>
          <li>Identify pilot deployment opportunities for rapid security improvement</li>
          <li>Develop phased implementation plan to maximize immediate ROI</li>
          <li>Review customization options for your specific environment</li>
        </ol>
        
        <div className="mt-4 flex justify-center">
          <button className="bg-portnox-primary text-white px-6 py-2 rounded-md font-medium hover:bg-opacity-90 shadow-sm">
            Request Demonstration
          </button>
        </div>
      </div>
      
      {/* Footer */}
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center pt-4 border-t border-gray-200 dark:border-gray-700">
        <p>Analysis based on current market rates and organizational requirements as of {new Date().toLocaleDateString()}.</p>
        <p>Results may vary based on specific implementation details and market conditions.</p>
      </div>
    </div>
  );
};

export default ExecutiveSummaryReport;
EOF

echo "Created ExecutiveSummaryReport component"

# Create integration script for the executive summary report
cat > "integrate-executive-report.sh" << 'EOF'
#!/bin/bash

# Script to integrate the executive summary report into the Portnox TCO Analyzer

# Define paths
EXEC_VIEW_PATH="src/components/views/executive/ExecutiveView.tsx"
DASHBOARD_PATH="src/components/views/Dashboard.tsx"

# Check if files exist
if [ ! -f "$EXEC_VIEW_PATH" ]; then
  echo "Error: Executive view file not found at $EXEC_VIEW_PATH"
  exit 1
fi

if [ ! -f "$DASHBOARD_PATH" ]; then
  echo "Error: Dashboard file not found at $DASHBOARD_PATH"
  exit 1
fi

# Create backups
cp "$EXEC_VIEW_PATH" "${EXEC_VIEW_PATH}.bak"
echo "Created backup at ${EXEC_VIEW_PATH}.bak"

cp "$DASHBOARD_PATH" "${DASHBOARD_PATH}.bak"
echo "Created backup at ${DASHBOARD_PATH}.bak"

# Add import to ExecutiveView
sed -i '/import VendorRadarChart/a import ExecutiveSummaryReport from '\''../../reports/ExecutiveSummaryReport'\'';' "$EXEC_VIEW_PATH"

# Add Report tab to ExecutiveView
sed -i '/{ id: '\''comparison'\'', label: '\''Vendor Comparison'\'' }/a \ \ \ \ { id: '\''report'\'', label: '\''Executive Report'\'' },' "$EXEC_VIEW_PATH"

# Add report content section to ExecutiveView
if ! grep -q "activeTab === 'report'" "$EXEC_VIEW_PATH"; then
  # Find the last tab and add the report tab after it
  sed -i '/activeTab === '\''comparison'\'' && (/,/^        )}$/a \
        {activeTab === '\''report'\'' && (\
          <div className="executive-report">\
            <ExecutiveSummaryReport className="mt-4" />\
          </div>\
        )}' "$EXEC_VIEW_PATH"
  
  echo "Added report tab to ExecutiveView"
fi

# Add report button to Dashboard
sed -i '/Export PDF/a \              <button className="btn btn-outline flex items-center text-sm ml-2" onClick={() => handleViewChange('\''executive'\'') || setTimeout(() => setActiveTab('\''report'\''), 100)}>\
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">\
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />\
                </svg>\
                Executive Report\
              </button>' "$DASHBOARD_PATH"

echo "Added report button to Dashboard"

# Add CSS print styles for report
if [ ! -f "src/reportStyles.css" ]; then
  echo "Creating print styles for report..."
  cat > "src/reportStyles.css" << 'EOCSS'
/* Print styles for executive report */
@media print {
  /* Hide non-report elements */
  header, footer, nav, .sidebar, .stakeholder-tabs, .action-buttons, button {
    display: none !important;
  }
  
  /* Adjust main content */
  .content-area {
    padding: 0 !important;
    margin: 0 !important;
    width: 100% !important;
  }
  
  /* Adjust report container */
  .executive-report {
    padding: 0 !important;
    margin: 0 !important;
  }
  
  /* Ensure proper colors */
  body {
    background-color: white !important;
    color: black !important;
  }
  
  /* Fix tables */
  table {
    break-inside: auto !important;
  }
  
  tr {
    break-inside: avoid !important;
    break-after: auto !important;
  }
  
  td, th {
    break-inside: avoid !important;
  }
  
  /* Page breaks */
  h2 {
    break-before: auto !important;
    break-after: avoid !important;
  }
  
  /* Remove shadows and effects that don't print well */
  .shadow-sm, .shadow, .shadow-md, .shadow-lg, .shadow-xl {
    box-shadow: none !important;
  }
}
EOCSS

  # Import print styles in index.tsx
  sed -i '/import '\''\.\/index\.css'\'';/a import '\''\.\/reportStyles\.css'\'';' "src/index.tsx"
  echo "Created print styles for report"
fi

# Offer to commit changes
echo "Would you like to commit these changes? (y/n)"
read COMMIT_CHANGES

if [ "$COMMIT_CHANGES" = "y" ]; then
  git add "src/components/reports/ExecutiveSummaryReport.tsx"
  git add "src/reportStyles.css"
  git add "src/index.tsx"
  git add "$EXEC_VIEW_PATH"
  git add "$DASHBOARD_PATH"
  git commit -m "Add comprehensive executive summary report for TCO analysis"
  echo "Changes committed successfully"
fi
EOF

chmod +x integrate-executive-report.sh
echo "Created integration script: integrate-executive-report.sh"

echo "===== Portnox TCO Analyzer Executive Summary Enhancement Complete ====="
echo "Run ./integrate-executive-report.sh to add the executive report to the application"
