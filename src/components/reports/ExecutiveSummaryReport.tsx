// @ts-nocheck
import React from 'react';
import { useCalculator } from '../../context/CalculatorContext';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

const ExecutiveSummaryReport: React.FC = () => {
  const { state } = useCalculator();
  const { calculationResults } = state;

  // Safe extraction of organization name
  const organizationName = state.organizationName || 'Your Organization';
  
  if (!calculationResults || !calculationResults.vendorResults) {
    return (
      <div className="executive-summary p-6 bg-gray-50 rounded-xl text-center">
        <div className="text-4xl mb-4">📊</div>
        <h2 className="text-2xl font-bold mb-2">No Calculation Results Available</h2>
        <p className="text-gray-600 mb-4">
          Please complete the calculator form and run calculations to generate an executive summary.
        </p>
      </div>
    );
  }

  // Find Portnox result
  const portnoxResult = calculationResults.vendorResults.find(vendor => vendor.vendorId === 'portnox');
  
  // If Portnox is not in the results, show a message
  if (!portnoxResult) {
    return (
      <div className="executive-summary p-6 bg-gray-50 rounded-xl text-center">
        <div className="text-4xl mb-4">❓</div>
        <h2 className="text-2xl font-bold mb-2">Portnox Not Selected</h2>
        <p className="text-gray-600 mb-4">
          Please include Portnox in your vendor selection to generate a complete executive summary.
        </p>
      </div>
    );
  }

  // Get competitors (all non-Portnox vendors)
  const competitors = calculationResults.vendorResults.filter(vendor => vendor.vendorId !== 'portnox');
  
  // Calculate average competitor values
  const avgCompetitorTco = competitors.length > 0
    ? competitors.reduce((sum, vendor) => sum + vendor.totalTco, 0) / competitors.length
    : 0;
  
  const avgCompetitorRoi = competitors.length > 0
    ? competitors.reduce((sum, vendor) => sum + vendor.roi, 0) / competitors.length
    : 0;
  
  const avgCompetitorSecurity = competitors.length > 0
    ? competitors.reduce((sum, vendor) => sum + vendor.securityImprovement, 0) / competitors.length
    : 0;
  
  // Calculate potential savings
  const potentialSavings = avgCompetitorTco > 0 ? avgCompetitorTco - portnoxResult.totalTco : 0;

  return (
    <div className="executive-summary">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">Executive Summary</h1>
        <p className="text-gray-600">
          This report provides a high-level overview of the Total Cost of Ownership (TCO) analysis 
          for {organizationName}, comparing Portnox Cloud-Native NAC with other solutions.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="bg-gray-50 p-6 rounded-xl mb-8">
        <h2 className="text-xl font-bold mb-4">Key Findings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-500">
            <div className="text-sm font-medium text-gray-500">3-Year TCO Savings</div>
            <div className="text-2xl font-bold text-gray-800">{formatCurrency(potentialSavings)}</div>
            <div className="text-sm text-gray-600 mt-1">compared to average competitor</div>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-500">
            <div className="text-sm font-medium text-gray-500">Return on Investment</div>
            <div className="text-2xl font-bold text-gray-800">{formatPercentage(portnoxResult.roi)}</div>
            <div className="text-sm text-gray-600 mt-1">
              {portnoxResult.roi > avgCompetitorRoi ? 
                `${formatPercentage(portnoxResult.roi - avgCompetitorRoi)} higher than competitors` : 
                'Industry-leading ROI'}
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-purple-500">
            <div className="text-sm font-medium text-gray-500">Security Improvement</div>
            <div className="text-2xl font-bold text-gray-800">{portnoxResult.securityImprovement}%</div>
            <div className="text-sm text-gray-600 mt-1">
              {portnoxResult.securityImprovement > avgCompetitorSecurity ? 
                `${Math.round(portnoxResult.securityImprovement - avgCompetitorSecurity)}% higher than competitors` : 
                'Enhanced security posture'}
            </div>
          </div>
        </div>
      </div>

      {/* Cost Comparison Table */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Cost Comparison</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Vendor
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  3-Year TCO
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  ROI
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Payback Period
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Security Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Portnox Row */}
              <tr className="bg-green-50">
                <td className="py-3 px-4 text-sm font-medium text-gray-900 border-r border-gray-200">
                  {portnoxResult.name}
                  {portnoxResult.badge && (
                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${portnoxResult.badgeClass}`}>
                      {portnoxResult.badge}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700 border-r border-gray-200">
                  {formatCurrency(portnoxResult.totalTco)}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700 border-r border-gray-200">
                  {formatPercentage(portnoxResult.roi)}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700 border-r border-gray-200">
                  {portnoxResult.paybackPeriod} months
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {portnoxResult.securityImprovement}%
                </td>
              </tr>
              
              {/* Competitor Rows */}
              {competitors.map(competitor => (
                <tr key={competitor.vendorId}>
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                    {competitor.name}
                    {competitor.badge && (
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${competitor.badgeClass}`}>
                        {competitor.badge}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                    {formatCurrency(competitor.totalTco)}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                    {formatPercentage(competitor.roi)}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                    {competitor.paybackPeriod} months
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                    {competitor.securityImprovement}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-blue-50 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-3">Recommendation</h2>
        <p className="mb-4">
          Based on this analysis, Portnox Cloud-Native NAC provides {organizationName} with the best 
          combination of cost-effectiveness and security capabilities:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Lower TCO:</strong> Save approximately {formatCurrency(potentialSavings)} over 3 years</li>
          <li><strong>Higher ROI:</strong> {formatPercentage(portnoxResult.roi)} return on investment</li>
          <li><strong>Faster Implementation:</strong> {portnoxResult.implementationDays} days vs. industry average of 45+ days</li>
          <li><strong>Better Security:</strong> {portnoxResult.securityImprovement}% risk reduction</li>
        </ul>
        <p>
          We recommend proceeding with Portnox Cloud-Native NAC to achieve these benefits while 
          strengthening your network security posture.
        </p>
      </div>
    </div>
  );
};

export default ExecutiveSummaryReport;
