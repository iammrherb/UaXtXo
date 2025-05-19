import React from 'react';
import { useCalculator } from '../../context/CalculatorContext';
import { formatCurrency, formatDate, formatPercentage } from '../../utils/formatters';
import CompetitorComparisonChart from '../charts/CompetitorComparisonChart';
import CumulativeCostChart from '../charts/CumulativeCostChart';
import RoiChart from '../charts/RoiChart';
import PaybackPeriodChart from '../charts/PaybackPeriodChart';
import TcoBreakdownChart from '../charts/TcoBreakdownChart';

const FinancialReport: React.FC = () => {
  const { state } = useCalculator();
  const { calculationResults } = state;

  // Safely extract the organization name using the correct property
  const organizationName = state.organizationName || 'Your Organization';
  const scenarioName = state.scenario?.name || 'TCO Analysis';
  const scenarioDescription = state.scenario?.description || '';
  const reportDate = new Date();

  // Find Portnox result
  const portnoxResult = calculationResults?.vendorResults?.find(vendor => vendor.vendorId === 'portnox');

  // Calculate average competitor values
  const competitorResults = calculationResults?.vendorResults?.filter(vendor => vendor.vendorId !== 'portnox') || [];
  
  const avgCompetitorTco = competitorResults.length > 0
    ? competitorResults.reduce((sum, vendor) => sum + vendor.totalTco, 0) / competitorResults.length
    : 0;
  
  const avgCompetitorRoi = competitorResults.length > 0
    ? competitorResults.reduce((sum, vendor) => sum + vendor.roi, 0) / competitorResults.length
    : 0;
  
  const avgCompetitorPayback = competitorResults.length > 0
    ? competitorResults.reduce((sum, vendor) => sum + vendor.paybackPeriod, 0) / competitorResults.length
    : 0;

  // Calculate potential savings
  const potentialSavings = portnoxResult && avgCompetitorTco > 0
    ? avgCompetitorTco - portnoxResult.totalTco
    : 0;

  // Calculate ROI improvement
  const roiImprovement = portnoxResult && avgCompetitorRoi > 0
    ? portnoxResult.roi - avgCompetitorRoi
    : 0;

  return (
    <div className="financial-report">
      <div className="report-header mb-8">
        <h1 className="text-3xl font-bold mb-2">Financial Analysis Report</h1>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{scenarioName}</h2>
            <p className="text-gray-600">{scenarioDescription}</p>
          </div>
          <div className="text-right">
            <div className="text-gray-700">Prepared for: <span className="font-semibold">{organizationName}</span></div>
            <div className="text-gray-500 text-sm">Generated on: {formatDate(reportDate)}</div>
          </div>
        </div>
      </div>

      {calculationResults && portnoxResult ? (
        <>
          <div className="report-highlights mb-8 bg-gray-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Executive Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="highlight-card bg-white p-5 rounded-lg shadow-md border-l-4 border-green-500">
                <div className="text-sm font-medium text-gray-500">3-Year TCO Savings</div>
                <div className="text-2xl font-bold text-gray-800">{formatCurrency(potentialSavings)}</div>
                <div className="text-sm text-gray-600 mt-1">
                  vs. average competitor cost of {formatCurrency(avgCompetitorTco)}
                </div>
              </div>
              
              <div className="highlight-card bg-white p-5 rounded-lg shadow-md border-l-4 border-blue-500">
                <div className="text-sm font-medium text-gray-500">Return on Investment</div>
                <div className="text-2xl font-bold text-gray-800">{formatPercentage(portnoxResult.roi)}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {roiImprovement > 0 ? `${formatPercentage(roiImprovement)} higher than competitors` : 'Industry leading ROI'}
                </div>
              </div>
              
              <div className="highlight-card bg-white p-5 rounded-lg shadow-md border-l-4 border-purple-500">
                <div className="text-sm font-medium text-gray-500">Payback Period</div>
                <div className="text-2xl font-bold text-gray-800">{portnoxResult.paybackPeriod.toFixed(1)} months</div>
                <div className="text-sm text-gray-600 mt-1">
                  {avgCompetitorPayback - portnoxResult.paybackPeriod > 0 
                    ? `${(avgCompetitorPayback - portnoxResult.paybackPeriod).toFixed(1)} months faster than competitors`
                    : 'Quick return on investment'}
                </div>
              </div>
            </div>
          </div>

          <div className="chart-section mb-10">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">Total Cost of Ownership</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="chart-container">
                <CompetitorComparisonChart height={350} />
              </div>
              <div className="chart-container">
                <TcoBreakdownChart vendorId="portnox" height={350} />
              </div>
            </div>
          </div>

          <div className="chart-section mb-10">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">Financial Benefits</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="chart-container">
                <RoiChart height={350} />
              </div>
              <div className="chart-container">
                <PaybackPeriodChart height={350} />
              </div>
            </div>
          </div>

          <div className="chart-section mb-10">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">Long-Term Cost Analysis</h2>
            <div className="chart-container">
              <CumulativeCostChart height={400} />
            </div>
            <div className="text-gray-600 mt-4 text-sm">
              <p>
                <strong>Note:</strong> The chart above shows the cumulative costs over a 3-year period,
                including initial implementation, licensing, maintenance, and operational costs.
                Portnox provides significant savings over time compared to traditional NAC solutions.
              </p>
            </div>
          </div>

          <div className="report-conclusion bg-gray-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Conclusion</h2>
            <p className="mb-4">
              Based on this financial analysis, implementing Portnox Cloud-Native NAC would provide 
              {organizationName} with significant financial benefits:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Lower Total Cost of Ownership:</strong> Save approximately {formatCurrency(potentialSavings)} over 3 years</li>
              <li><strong>Superior ROI:</strong> {formatPercentage(portnoxResult.roi)} return on investment</li>
              <li><strong>Quick Payback:</strong> Recoup your investment in just {portnoxResult.paybackPeriod.toFixed(1)} months</li>
              <li><strong>Reduced Operational Costs:</strong> Cloud-native approach eliminates hardware expenses and reduces management overhead</li>
            </ul>
            <p>
              These financial benefits, combined with Portnox's superior security capabilities and 
              simplified deployment model, make it the recommended solution for {organizationName}'s
              network access control requirements.
            </p>
          </div>
        </>
      ) : (
        <div className="no-data-message bg-gray-50 p-8 rounded-xl text-center">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-xl font-semibold mb-2">No calculation results available</h3>
          <p className="text-gray-600 mb-4">Please complete the TCO calculator form to generate a financial analysis report.</p>
        </div>
      )}
    </div>
  );
};

export default FinancialReport;
