import React from 'react';
import { useCalculator } from '../../context/CalculatorContext';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Define interface for vendor result
interface VendorResult {
  vendorId: string;
  name: string;
  totalTco: number;
  cumulativeCosts: {
    initial: number;
    year1: number;
    year2: number;
    year3: number;
  };
  costBreakdown: {
    licenses: number;
    maintenance: number;
    implementation: number;
    operations: number;
    hardware: number;
    infrastructure: number;
  };
  roi: number;
  paybackPeriod: number;
  savings: number;
  totalSavings: number;
  npv: number;
  irr: number;
  implementationDays: number;
  securityImprovement: number;
}

// Define interface for comparison result
interface ComparisonResult {
  tcoSavings: number;
  tcoSavingsPercentage: number;
  implementationSavings: number;
  implementationSavingsPercentage: number;
  operationalSavings: number;
  operationalSavingsPercentage: number;
  securityAdvantage: number;
  paybackAdvantage: number;
  roiAdvantage: number;
}

// Define the component props
interface FinancialReportProps {
  reportTitle?: string;
}

const FinancialReport: React.FC<FinancialReportProps> = ({ reportTitle = "TCO Financial Analysis" }) => {
  const { state } = useCalculator();
  const { calculationResults, organizationName, scenarioName, scenarioDescription } = state;

  // If no calculation results yet, show a message
  if (!calculationResults || !calculationResults.vendorResults || calculationResults.vendorResults.length === 0) {
    return (
      <div className="report-container p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">No Results Available</h2>
        <p className="mb-4">Please run the TCO calculation to generate financial analysis.</p>
        <Link 
          to="/calculator"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Return to Calculator
        </Link>
      </div>
    );
  }

  // Get the Portnox result
  const portnox = calculationResults.vendorResults.find(
    (vendor: VendorResult) => vendor.vendorId === 'portnox'
  );

  // Get the competitors (all non-Portnox vendors)
  const competitors = calculationResults.vendorResults.filter(
    (vendor: VendorResult) => vendor.vendorId !== 'portnox'
  );

  // If no Portnox data, show error
  if (!portnox) {
    return (
      <div className="report-container p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Portnox Data Missing</h2>
        <p className="mb-4">The calculation did not include Portnox data, which is required for comparison.</p>
        <Link 
          to="/calculator"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Return to Calculator
        </Link>
      </div>
    );
  }

  // Calculate average competitor values
  const avgCompetitorTco = competitors.length > 0
    ? competitors.reduce((sum: number, vendor: VendorResult) => sum + vendor.totalTco, 0) / competitors.length
    : portnox.totalTco * 1.5;

  const avgCompetitorImplementation = competitors.length > 0
    ? competitors.reduce((sum: number, vendor: VendorResult) => sum + vendor.implementationDays, 0) / competitors.length
    : portnox.implementationDays * 3;

  // Format the date
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const deviceCount = state.deviceCount || 1000;
  const costPerDevice = portnox.totalTco / deviceCount;
  const avgCompetitorCostPerDevice = avgCompetitorTco / deviceCount;

  return (
    <div className="financial-report print:py-0">
      <Helmet>
        <title>{reportTitle} | Portnox Total Cost of Ownership Analysis</title>
      </Helmet>

      {/* Report Header */}
      <div className="report-header p-6 bg-white rounded-lg shadow-sm mb-6 print:shadow-none print:p-2">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{reportTitle}</h1>
            <h2 className="text-lg text-gray-600">
              {organizationName ? organizationName : 'Organization'} - {scenarioName ? scenarioName : 'TCO Analysis'}
            </h2>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
          <div className="portnox-logo">
            <img
              src="/images/portnox-logo.png"
              alt="Portnox Logo"
              className="h-10"
            />
          </div>
        </div>

        {scenarioDescription && (
          <div className="scenario-description text-sm text-gray-600 border-t border-gray-200 pt-4 mt-4">
            <h3 className="font-semibold mb-2">Scenario Description:</h3>
            <p>{scenarioDescription}</p>
          </div>
        )}
      </div>

      {/* Executive Summary */}
      <div className="executive-summary p-6 bg-white rounded-lg shadow-sm mb-6 print:shadow-none print:p-2">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Executive Summary</h2>
        
        <div className="summary-highlights grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="highlight-card p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-center mb-2">
              <div className="text-blue-500 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-lg font-bold text-blue-800">Total Cost Savings</div>
            </div>
            <div className="highlight-value text-3xl font-bold text-blue-900 mb-2">
              {formatCurrency(avgCompetitorTco - portnox.totalTco)}
            </div>
            <div className="highlight-details text-sm text-blue-700">
              {formatPercentage((avgCompetitorTco - portnox.totalTco) / avgCompetitorTco)} lower
              3-year TCO compared to the average competitor.
            </div>
          </div>
          
          <div className="highlight-card p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <div className="flex items-center mb-2">
              <div className="text-green-500 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-lg font-bold text-green-800">Return on Investment</div>
            </div>
            <div className="highlight-value text-3xl font-bold text-green-900 mb-2">
              {formatPercentage(portnox.roi / 100, false)}
            </div>
            <div className="highlight-details text-sm text-green-700">
              {portnox.paybackPeriod < 12 ? 'Fast' : 'Expected'} payback period of {Math.round(portnox.paybackPeriod)} months.
              {portnox.roi > 200 && ' Exceptional return on investment.'}
            </div>
          </div>
        </div>
        
        <div className="summary-text mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Key Findings</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Portnox delivers a 3-year TCO of {formatCurrency(portnox.totalTco)}, 
              {avgCompetitorTco > portnox.totalTco 
                ? ` which is ${formatCurrency(avgCompetitorTco - portnox.totalTco)} less than the average competitor cost of ${formatCurrency(avgCompetitorTco)}.`
                : `.`}
            </li>
            <li>
              Per-device cost with Portnox is {formatCurrency(costPerDevice)} compared to the average competitor 
              cost of {formatCurrency(avgCompetitorCostPerDevice)}, representing a 
              {formatPercentage((avgCompetitorCostPerDevice - costPerDevice) / avgCompetitorCostPerDevice)} reduction.
            </li>
            <li>
              Portnox implementation time is {Math.round(portnox.implementationDays)} days, compared to the competitor 
              average of {Math.round(avgCompetitorImplementation)} days, enabling faster time to value.
            </li>
            <li>
              Security improvements with Portnox are projected to be {Math.round(portnox.securityImprovement)}%, 
              which can reduce breach risk and associated costs.
            </li>
          </ul>
        </div>
        
        <div className="summary-conclusion text-gray-700">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Conclusion</h3>
          <p className="mb-2">
            The financial analysis demonstrates that Portnox offers a compelling total cost of ownership advantage 
            compared to alternative solutions. The cloud-native architecture eliminates hardware and infrastructure costs,
            while the subscription model provides predictable expenses without requiring large upfront investments.
          </p>
          <p>
            With faster implementation, lower operational overhead, and strong security capabilities, Portnox delivers 
            both financial savings and strategic value. The detailed analysis in this report provides a comprehensive 
            view of the cost factors and business benefits.
          </p>
        </div>
      </div>

      {/* TCO Comparison */}
      <div className="tco-comparison p-6 bg-white rounded-lg shadow-sm mb-6 print:shadow-none print:p-2">
        <h2 className="text-xl font-bold mb-4 text-gray-800">TCO Comparison</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Vendor
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white">
                  Total 3-Year TCO
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white">
                  Cost Per Device
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white">
                  Implementation
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white">
                  Licenses
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white">
                  Maintenance
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white">
                  Operations
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white">
                  Hardware
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white">
                  Infrastructure
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Portnox Row */}
              <tr className="bg-green-50 dark:bg-green-900/10">
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white">
                  <span className="font-bold">{portnox.name}</span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(portnox.totalTco)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-800 dark:text-gray-200">
                  {formatCurrency(portnox.totalTco / deviceCount)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-800 dark:text-gray-200">
                  {formatCurrency(portnox.costBreakdown.implementation)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-800 dark:text-gray-200">
                  {formatCurrency(portnox.costBreakdown.licenses)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-800 dark:text-gray-200">
                  {formatCurrency(portnox.costBreakdown.maintenance)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-800 dark:text-gray-200">
                  {formatCurrency(portnox.costBreakdown.operations)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-800 dark:text-gray-200">
                  {formatCurrency(portnox.costBreakdown.hardware)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-800 dark:text-gray-200">
                  {formatCurrency(portnox.costBreakdown.infrastructure)}
                </td>
              </tr>

              {/* Competitor Rows */}
              {competitors.map((competitor: VendorResult, index: number) => {
                const comparisonData = calculationResults.comparisonResults[competitor.vendorId];
                return (
                  <tr key={competitor.vendorId} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/30' : ''}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white">
                      {competitor.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-800 dark:text-gray-200">
                      {formatCurrency(competitor.totalTco)}
                      <div className="text-xs text-red-600 dark:text-red-400">
                        +{formatCurrency(competitor.totalTco - portnox.totalTco)}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-800 dark:text-gray-200">
                      {formatCurrency(competitor.totalTco / deviceCount)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-800 dark:text-gray-200">
                      {formatCurrency(competitor.costBreakdown.implementation)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-800 dark:text-gray-200">
                      {formatCurrency(competitor.costBreakdown.licenses)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-800 dark:text-gray-200">
                      {formatCurrency(competitor.costBreakdown.maintenance)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-800 dark:text-gray-200">
                      {formatCurrency(competitor.costBreakdown.operations)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-800 dark:text-gray-200">
                      {formatCurrency(competitor.costBreakdown.hardware)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-800 dark:text-gray-200">
                      {formatCurrency(competitor.costBreakdown.infrastructure)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Direct Comparisons */}
      <div className="direct-comparisons p-6 bg-white rounded-lg shadow-sm mb-6 print:shadow-none print:p-2">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Direct Comparison Results</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Competitor
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white">
                  TCO Savings
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white">
                  Implementation Savings
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white">
                  Operations Savings
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white">
                  ROI Advantage
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white">
                  Payback Advantage
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white">
                  Security Advantage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {competitors.map((competitor: VendorResult, index: number) => {
                const comparison = calculationResults.comparisonResults[competitor.vendorId] as ComparisonResult;
                if (!comparison) return null;
                
                return (
                  <tr key={competitor.vendorId} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/30' : ''}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white">
                      {competitor.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-800 dark:text-gray-200">
                      <div className="font-medium text-green-600 dark:text-green-400">
                        {formatCurrency(comparison.tcoSavings)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {formatPercentage(comparison.tcoSavingsPercentage)} lower
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-800 dark:text-gray-200">
                      <div className="font-medium text-green-600 dark:text-green-400">
                        {formatCurrency(comparison.implementationSavings)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {formatPercentage(comparison.implementationSavingsPercentage)} lower
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-800 dark:text-gray-200">
                      <div className="font-medium text-green-600 dark:text-green-400">
                        {formatCurrency(comparison.operationalSavings)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {formatPercentage(comparison.operationalSavingsPercentage)} lower
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-800 dark:text-gray-200">
                      <div className="font-medium text-green-600 dark:text-green-400">
                        +{Math.round(comparison.roiAdvantage)}%
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        higher ROI
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-800 dark:text-gray-200">
                      <div className="font-medium text-green-600 dark:text-green-400">
                        {Math.round(comparison.paybackAdvantage)} months
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        faster payback
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-800 dark:text-gray-200">
                      <div className="font-medium text-green-600 dark:text-green-400">
                        +{Math.round(comparison.securityAdvantage)}%
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        better security
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="financial-metrics p-6 bg-white rounded-lg shadow-sm mb-6 print:shadow-none print:p-2">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Financial Metrics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="metric-card p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Return on Investment (ROI)</h3>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {formatPercentage(portnox.roi / 100, false)}
            </div>
            <p className="text-sm text-gray-600">
              ROI measures the profitability of an investment relative to its cost. Portnox delivers a strong return on investment
              due to its lower TCO and significant business benefits.
            </p>
          </div>
          
          <div className="metric-card p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Payback Period</h3>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {Math.round(portnox.paybackPeriod)} months
            </div>
            <p className="text-sm text-gray-600">
              The payback period indicates how quickly the investment will be recovered through savings and benefits.
              A shorter payback period means faster time to value.
            </p>
          </div>
          
          <div className="metric-card p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Net Present Value (NPV)</h3>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {formatCurrency(portnox.npv)}
            </div>
            <p className="text-sm text-gray-600">
              NPV represents the present value of all future cash flows generated by the investment.
              A positive NPV indicates a financially beneficial investment.
            </p>
          </div>
        </div>
        
        <div className="savings-breakdown mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Savings Breakdown</h3>
          <p className="text-sm text-gray-600 mb-4">
            The total cost savings of {formatCurrency(avgCompetitorTco - portnox.totalTco)} over 3 years comes from multiple areas:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="savings-item p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800">Implementation</h4>
              <div className="text-2xl font-bold text-blue-700">
                {formatCurrency(avgCompetitorImplementation * state.costParameters.implementationDayCost - portnox.costBreakdown.implementation)}
              </div>
              <div className="text-xs text-blue-600">
                Savings from faster and simpler deployment
              </div>
            </div>
            
            <div className="savings-item p-3 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800">Hardware & Infrastructure</h4>
              <div className="text-2xl font-bold text-green-700">
                {formatCurrency(
                  competitors.reduce((sum, c) => sum + c.costBreakdown.hardware + c.costBreakdown.infrastructure, 0) / competitors.length
                  - (portnox.costBreakdown.hardware + portnox.costBreakdown.infrastructure)
                )}
              </div>
              <div className="text-xs text-green-600">
                Savings from cloud architecture
              </div>
            </div>
            
            <div className="savings-item p-3 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800">Operational</h4>
              <div className="text-2xl font-bold text-purple-700">
                {formatCurrency(
                  competitors.reduce((sum, c) => sum + c.costBreakdown.operations, 0) / competitors.length
                  - portnox.costBreakdown.operations
                )}
              </div>
              <div className="text-xs text-purple-600">
                Reduced staffing and management costs
              </div>
            </div>
            
            <div className="savings-item p-3 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-800">License & Maintenance</h4>
              <div className="text-2xl font-bold text-yellow-700">
                {formatCurrency(
                  competitors.reduce((sum, c) => sum + c.costBreakdown.licenses + c.costBreakdown.maintenance, 0) / competitors.length
                  - (portnox.costBreakdown.licenses + portnox.costBreakdown.maintenance)
                )}
              </div>
              <div className="text-xs text-yellow-600">
                Optimized licensing and support costs
              </div>
            </div>
          </div>
        </div>
        
        <div className="additional-benefits">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Additional Financial Benefits</h3>
          <p className="text-sm text-gray-600 mb-4">
            Beyond the direct cost savings, Portnox provides additional financial benefits that enhance the total value proposition:
          </p>
          
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <span className="font-semibold">Reduced security risk:</span> The {Math.round(portnox.securityImprovement)}% security improvement
              can significantly reduce the potential costs associated with security breaches.
            </li>
            <li>
              <span className="font-semibold">Scalability:</span> The cloud-native architecture allows for easy and cost-effective scaling
              as your organization grows, without additional infrastructure investments.
            </li>
            <li>
              <span className="font-semibold">Predictable costs:</span> Subscription-based pricing eliminates unexpected costs and provides
              better budget predictability.
            </li>
            <li>
              <span className="font-semibold">Faster time to value:</span> Quicker implementation means security benefits and operational
              efficiencies are realized sooner.
            </li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <div className="conclusion p-6 bg-white rounded-lg shadow-sm print:shadow-none print:p-2">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Conclusion and Recommendations</h2>
        
        <div className="text-gray-700 space-y-4">
          <p>
            Based on the comprehensive financial analysis, Portnox demonstrates a compelling total cost of ownership advantage
            over competing solutions. The {formatPercentage((avgCompetitorTco - portnox.totalTco) / avgCompetitorTco)} lower TCO,
            combined with a strong ROI of {formatPercentage(portnox.roi / 100, false)} and a payback period of just {Math.round(portnox.paybackPeriod)} months,
            makes Portnox an economically advantageous choice.
          </p>
          
          <p>
            The cloud-native architecture eliminates hardware and infrastructure costs while reducing operational overhead.
            The subscription model provides predictable, manageable expenses without requiring large upfront capital investments.
            Implementation is {Math.round((avgCompetitorImplementation - portnox.implementationDays) / avgCompetitorImplementation * 100)}% faster
            than competing solutions, accelerating time to value.
          </p>
          
          <p>
            From both a financial and operational perspective, Portnox offers a superior value proposition for organizations
            seeking to implement a robust network access control solution with optimal total cost of ownership.
          </p>
          
          <div className="recommendation mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold mb-2 text-blue-800">Recommendation</h3>
            <p className="text-blue-700">
              Based on this analysis, we recommend proceeding with the Portnox solution to achieve optimal total cost of ownership,
              faster implementation, and significant operational savings while enhancing security posture. The ROI and payback period
              metrics strongly support this investment decision.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="report-footer text-center text-xs text-gray-500 mt-6 print:mt-2">
        <p>Confidential Financial Analysis | Portnox TCO Calculator | Generated on {formattedDate}</p>
      </div>
    </div>
  );
};

export default FinancialReport;
