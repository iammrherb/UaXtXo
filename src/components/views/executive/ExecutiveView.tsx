import React, { useState } from 'react';
import { useCalculator } from '../../../context/CalculatorContext';
import DashboardCard from '../../ui/DashboardCard';
import TabPanel from '../../ui/TabPanel';
import TcoComparisonChart from '../../charts/TcoComparisonChart';
import TcoBreakdownChart from '../../charts/TcoBreakdownChart';
import SavingsProjectionChart from '../../charts/SavingsProjectionChart';
import CompetitiveAdvantageChart from '../../charts/CompetitiveAdvantageChart';
import ExecutiveSummaryChart from '../../charts/ExecutiveSummaryChart';
import CumulativeCostChart from '../../charts/CumulativeCostChart';
import RoiChart from '../../charts/RoiChart';
import VendorRadarChart from '../../charts/VendorRadarChart';
import ExecutiveSummaryReport from '../../reports/ExecutiveSummaryReport';
import PaybackPeriodChart from '../../charts/PaybackPeriodChart';
import { formatCurrency, formatPercentage, formatDays } from '../../../utils/formatters';
import { VendorResult } from '../../../utils/calculationEngine';
import { CalculationResults } from '../../../utils/calculationEngine';

// Define vendor result interface
interface VendorResult {
  vendorId: string;
  name: string;
  roi: number;
  paybackPeriod: number;
  productivityGains: number;
  complianceSavings: number;
  [key: string]: any;
}

// Define calculation results interface
interface CalculationResults {
  vendorResults: VendorResult[];
  executiveSummary: {
    totalSavings: number;
    savingsPercentage: number;
    paybackPeriod: number;
    riskReduction: number;
    implementationTime: number;
    topAdvantages: string[];
    topRisks: string[];
  };
  financialSummary: {
    annualSavings: number;
    fiveYearTco: number;
    costAvoidance: number;
    breakEvenPoint: number;
  };
  securitySummary: {
    riskReduction: number;
    threatPreventionImprovement: number;
    meanTimeToRespondImprovement: number;
    complianceCoverage: number;
    topSecurityBenefits: string[];
  };
  [key: string]: any;
}

const ExecutiveView: React.FC = () => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  const [activeTab, setActiveTab] = useState('summary');
  
  // Define tabs
  const tabs = [
    { id: 'summary', label: 'Executive Summary' },
    { id: 'roi', label: 'ROI Analysis' },
    { id: 'risk', label: 'Risk Assessment' },
    { id: 'comparison', label: 'Vendor Comparison' }
    { id: 'report', label: 'Executive Report' },
  ];
  
  if (!calculationResults) {
    return <div>No calculation data available. Please calculate first.</div>;
  }
  
  // Cast to our interface for better type checking
  const typedResults = calculationResults as CalculationResults;
  
  // Extract executive summary data
  const { executiveSummary, financialSummary, securitySummary } = typedResults;
  
  // Helper function to find Portnox result
  const getPortnoxResult = (): VendorResult | undefined => {
    return typedResults.vendorResults.find((v: VendorResult) => v.vendorId === 'portnox');
  };
  
  const portnoxResult = getPortnoxResult();
  
  return (
    <div className="executive-view">
      <TabPanel
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        {activeTab === 'summary' && (
          <div className="executive-summary">
            {/* Executive Dashboard Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <DashboardCard
                title="Total 3-Year Savings"
                value={formatCurrency(executiveSummary.totalSavings)}
                subtitle={`${executiveSummary.savingsPercentage}% reduction vs. competitors`}
                trend={{
                  value: "15% higher than industry average",
                  direction: "up"
                }}
                highlight={true}
              />
              
              <DashboardCard
                title="Payback Period"
                value={`${executiveSummary.paybackPeriod} months`}
                subtitle="Time to positive ROI"
                trend={{
                  value: "5 months faster than competitors",
                  direction: "up"
                }}
              />
              
              <DashboardCard
                title="Risk Reduction"
                value={`${executiveSummary.riskReduction}%`}
                subtitle="Overall security improvement"
                trend={{
                  value: "20% better than alternatives",
                  direction: "up"
                }}
              />
              
              <DashboardCard
                title="Implementation Time"
                value={`${executiveSummary.implementationTime} days`}
                subtitle="75% faster than on-premises"
                trend={{
                  value: "Leading time-to-security",
                  direction: "up"
                }}
              />
            </div>
            
            {/* TCO Comparison Chart */}
            <div className="mb-6">
              <TcoComparisonChart height={350} />
            </div>
            
            {/* Cumulative Cost Chart */}
            <div className="mb-6">
            <div className="mb-6">
              <ExecutiveSummaryChart height={400} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <TcoComparisonChart height={320} />
              </div>
              <div>
                <TcoBreakdownChart height={320} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <SavingsProjectionChart height={320} />
              </div>
              <div>
                <CompetitiveAdvantageChart height={320} />
              </div>
            </div>
            
            {/* Key Strategic Benefits */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Key Strategic Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="text-portnox-primary dark:text-portnox-primary mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>
                  <h4 className="text-md font-medium mb-1">Cloud-Native Solution</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Zero infrastructure costs, automatic updates, and global scalability</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="text-portnox-primary dark:text-portnox-primary mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-md font-medium mb-1">Rapid Deployment</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">75% faster implementation than on-premises alternatives</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="text-portnox-primary dark:text-portnox-primary mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="text-md font-medium mb-1">Zero Trust Security</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive, continuous device authentication and verification</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="text-portnox-primary dark:text-portnox-primary mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="text-md font-medium mb-1">Future-Proof Solution</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Automatic updates, continuous innovation, and AI-powered security</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'roi' && (
          <div className="roi-analysis">
            {/* ROI Dashboard Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <DashboardCard
                title="3-Year ROI"
                value={`${Math.round(portnoxResult?.roi || 0)}%`}
                subtitle="Return on investment"
                highlight={true}
              />
              
              <DashboardCard
                title="Annual Cost Savings"
                value={formatCurrency(financialSummary.annualSavings)}
                subtitle="Per year vs. traditional solutions"
              />
              
              <DashboardCard
                title="Productivity Gains"
                value={formatCurrency(portnoxResult?.productivityGains || 0)}
                subtitle="Estimated 3-year value"
              />
              
              <DashboardCard
                title="Compliance Savings"
                value={formatCurrency(portnoxResult?.complianceSavings || 0)}
                subtitle="Audit & reporting efficiency"
              />
            </div>
            
            {/* ROI Chart */}
            <div className="mb-6">
              <RoiChart height={350} />
            </div>
            
            {/* Payback Period Chart */}
            <div className="mb-6">
              <PaybackPeriodChart height={350} />
            </div>
            
            {/* Business Value Table */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Business Value</h3>
              <div className="overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Benefit Category</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">3-Year Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Direct Cost Reduction</td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">Hardware, licenses, and maintenance savings</td>
                      <td className="px-4 py-3 text-sm text-right text-portnox-primary font-semibold">$167,000</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">IT Staff Efficiency</td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">Reduced admin time and management overhead</td>
                      <td className="px-4 py-3 text-sm text-right text-portnox-primary font-semibold">$125,000</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Breach Risk Reduction</td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">Lower probability and impact of security incidents</td>
                      <td className="px-4 py-3 text-sm text-right text-portnox-primary font-semibold">$85,000</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Compliance Automation</td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">Streamlined audits and reporting</td>
                      <td className="px-4 py-3 text-sm text-right text-portnox-primary font-semibold">$92,000</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Insurance Premium Reduction</td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">Lower cybersecurity insurance costs</td>
                      <td className="px-4 py-3 text-sm text-right text-portnox-primary font-semibold">$28,000</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Total Business Value</td>
                      <td className="px-4 py-3 text-sm"></td>
                      <td className="px-4 py-3 text-sm text-right text-portnox-primary font-bold">$497,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'risk' && (
          <div className="risk-assessment">
            {/* Risk Dashboard Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <DashboardCard
                title="Security Posture Improvement"
                value={`${executiveSummary.riskReduction}%`}
                subtitle="Enhanced protection vs. no NAC"
                highlight={true}
              />
              
              <DashboardCard
                title="Breach Probability"
                value="Low"
                subtitle="vs. Medium-High (No NAC)"
              />
              
              <DashboardCard
                title="Compliance Coverage"
                value={`${Math.round(securitySummary.complianceCoverage)}%`}
                subtitle="Key frameworks supported"
              />
              
              <DashboardCard
                title="Mean Time to Respond"
                value="45 min"
                subtitle="vs. 4.5 hours (Industry avg.)"
              />
            </div>
            
            {/* Vendor Radar Chart */}
            <div className="mb-6">
              <VendorRadarChart height={400} width={600} />
            </div>
            
            {/* Risk Reduction Chart */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Risk Reduction Impact</h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Implementing Portnox Cloud provides significant risk reduction across multiple dimensions compared to legacy NAC solutions and no NAC at all.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-green-600 dark:text-green-400 font-semibold mb-1">Financial Risk</div>
                    <div className="text-sm">Reduced breach probability leading to ${formatCurrency(typedResults.riskAssessment?.financialRiskReduction || 0)} in risk mitigation value</div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-blue-600 dark:text-blue-400 font-semibold mb-1">Compliance Risk</div>
                    <div className="text-sm">Automated compliance controls with ${formatCurrency(typedResults.riskAssessment?.complianceRiskReduction || 0)} in audit cost avoidance</div>
                  </div>
                  
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-purple-600 dark:text-purple-400 font-semibold mb-1">Operational Risk</div>
                    <div className="text-sm">Simplified management leading to ${formatCurrency(typedResults.riskAssessment?.operationalRiskReduction || 0)} in operational efficiency</div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div className="font-semibold mb-1">Baseline Risk Exposure</div>
                    <div className="text-lg font-bold text-red-500 dark:text-red-400">${formatCurrency(typedResults.riskAssessment?.baselineRisk || 0)}</div>
                  </div>
                  <div className="hidden md:block text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Mitigated Risk Exposure</div>
                    <div className="text-lg font-bold text-green-500 dark:text-green-400">${formatCurrency(typedResults.riskAssessment?.mitigatedRisk || 0)}</div>
                  </div>
                  <div className="hidden md:block text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Risk Reduction</div>
                    <div className="text-lg font-bold text-portnox-primary">
                      {typedResults.riskAssessment ? 
                        Math.round((typedResults.riskAssessment.baselineRisk - typedResults.riskAssessment.mitigatedRisk) / typedResults.riskAssessment.baselineRisk * 100) 
                        : 0}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'comparison' && (
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
          <div className="vendor-comparison">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
            {/* Vendor Radar Chart */}
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
            <div className="mb-6">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
              <VendorRadarChart height={400} width={600} />
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
            </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
            
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
            {/* Competitive Advantages */}
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
            <div className="mb-6">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
              <h3 className="text-lg font-semibold mb-4">Competitive Advantages</h3>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                  <div className="flex items-start mb-2">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    <div className="text-portnox-primary p-2 bg-green-50 dark:bg-green-900/20 rounded-lg mr-3">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      </svg>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    <h4 className="text-md font-medium">Cloud-Native Architecture</h4>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                  </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Unlike on-premises competitors, Portnox requires no hardware investment or complex upgrades.</p>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                  
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                  <div className="space-y-2">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    <div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <div className="flex justify-between mb-1">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                        <span className="text-xs font-medium">Portnox</span>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                        <span className="text-xs font-medium">95%</span>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                        <div className="bg-portnox-primary h-2.5 rounded-full" style={{ width: '95%' }}></div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    <div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <div className="flex justify-between mb-1">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                        <span className="text-xs font-medium">Competitors</span>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                        <span className="text-xs font-medium">30%</span>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                        <div className="bg-portnox-secondary h-2.5 rounded-full" style={{ width: '30%' }}></div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                  </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                  <div className="flex items-start mb-2">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    <div className="text-portnox-primary p-2 bg-green-50 dark:bg-green-900/20 rounded-lg mr-3">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      </svg>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    <h4 className="text-md font-medium">Deployment Speed</h4>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                  </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Portnox deploys in days rather than months, with minimal specialized expertise required.</p>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                  
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                  <div className="space-y-2">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    <div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <div className="flex justify-between mb-1">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                        <span className="text-xs font-medium">Portnox</span>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                        <span className="text-xs font-medium">90%</span>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                        <div className="bg-portnox-primary h-2.5 rounded-full" style={{ width: '90%' }}></div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    <div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <div className="flex justify-between mb-1">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                        <span className="text-xs font-medium">Competitors</span>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                        <span className="text-xs font-medium">35%</span>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                        <div className="bg-portnox-secondary h-2.5 rounded-full" style={{ width: '35%' }}></div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                  </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
              </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
            </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
            
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
            {/* Vendor Strengths Comparison */}
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
            <div className="mb-6">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
              <h3 className="text-lg font-semibold mb-4">Vendor Strengths Comparison</h3>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
              <div className="overflow-x-auto">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                <table className="w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                  <thead className="bg-gray-50 dark:bg-gray-700">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    <tr>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Capability</th>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Portnox</th>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cisco ISE</th>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aruba ClearPass</th>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Forescout</th>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    </tr>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                  </thead>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    <tr>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Cloud Architecture</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm font-semibold text-portnox-primary">Native</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">Partial</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">Partial</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">Limited</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    </tr>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    <tr>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Zero Trust</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm font-semibold text-portnox-primary">Comprehensive</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">Partial</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">Limited</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">Partial</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    </tr>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    <tr>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Deployment Speed</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm font-semibold text-portnox-primary">Days</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">Months</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">Weeks</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">Weeks</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    </tr>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    <tr>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">FTE Requirements</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm font-semibold text-portnox-primary">Minimal</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">High</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">Moderate</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">Moderate</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    </tr>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    <tr>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Remote Access</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm font-semibold text-portnox-primary">Built-in</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">Add-on</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">Limited</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">Limited</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    </tr>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    <tr>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Hardware Footprint</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm font-semibold text-portnox-primary">None</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">Large</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">Medium</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">Medium</td>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                    </tr>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                  </tbody>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
                </table>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
              </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
            </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
          </div>
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
        )}
        {activeTab === 'report' && (
          <div className="executive-report">
            <ExecutiveSummaryReport className="mt-4" />
          </div>
        )}
      </TabPanel>
    </div>
  );
};

export default ExecutiveView;
