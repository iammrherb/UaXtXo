import React, { useState } from 'react';
import { useCalculator } from '../../../context/CalculatorContext';
import DashboardCard from '../../ui/DashboardCard';
import TabPanel from '../../ui/TabPanel';
import VendorRadarChart from '../../charts/VendorRadarChart';
import RiskReductionChart from '../../charts/RiskReductionChart';
import SecurityImpactChart from '../../charts/SecurityImpactChart';
import ComplianceRadarChart from '../../charts/ComplianceRadarChart';
import { formatCurrency, formatPercentage, formatMinutes } from '../../../utils/formatters';
import { VendorResult } from '../../../utils/calculationEngine';
import { CalculationResults } from '../../../utils/calculationEngine';

const SecurityView: React.FC = () => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  const [activeTab, setActiveTab] = useState('posture');
  
  // Define tabs
  const tabs = [
    { id: 'posture', label: 'Security Posture' },
    { id: 'compliance', label: 'Compliance Coverage' },
    { id: 'risk', label: 'Risk Assessment' },
    { id: 'threat', label: 'Threat Protection' },
    { id: 'comparison', label: 'Security Comparison' }
  ];
  
  if (!calculationResults) {
    return <div>No calculation data available. Please calculate first.</div>;
  }
  
  const portnox = calculationResults.vendorResults.find((v: VendorResult) => v.vendorId === 'portnox');
  if (!portnox) {
    return <div>Portnox data not found in calculation results.</div>;
  }
  
  // Find the "no-nac" option if available for comparison
  const noNac = calculationResults.vendorResults.find((v: VendorResult) => v.vendorId === 'no-nac');
  
  // Get average competitor for comparison (excluding no-nac)
  const competitors = calculationResults.vendorResults
    .filter(v => v.vendorId !== 'portnox' && v.vendorId !== 'no-nac');
  
  const avgMeanTimeToRespond = competitors.length > 0
    ? competitors.reduce((sum, v) => sum + v.meanTimeToRespond, 0) / competitors.length
    : 0;
  
  return (
    <div className="security-view">
      <TabPanel
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        {activeTab === 'posture' && (
          <div className="security-posture">
            {/* Security Posture Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <DashboardCard
                title="Zero Trust Readiness"
                value="92%"
                subtitle="vs. 45% (Industry Average)"
                highlight={true}
              />
              
              <DashboardCard
                title="Device Authentication"
                value="100%"
                subtitle="Complete device visibility"
              />
              
              <DashboardCard
                title="Risk Assessment"
                value="Real-time"
                subtitle="Continuous monitoring"
              />
              
              <DashboardCard
                title="Remediation Speed"
                value={formatMinutes(portnox.meanTimeToRespond)}
                subtitle={`vs. ${formatMinutes(avgMeanTimeToRespond)} (competitors avg.)`}
              />
            </div>
            
            {/* Security Posture Comparison */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Security Posture Assessment</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="text-md font-medium mb-2">Zero Trust Implementation</h4>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                          <div className="bg-portnox-primary h-3 rounded-full" style={{ width: `${portnox.featureScores.zeroTrust * 10}%` }}></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">{portnox.featureScores.zeroTrust * 10}%</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                        Portnox provides comprehensive zero trust implementation with continuous verification and device authentication.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="text-md font-medium mb-2">Threat Detection</h4>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                          <div className="bg-portnox-primary h-3 rounded-full" style={{ width: `${portnox.featureScores.threatPrevention * 10}%` }}></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">{portnox.featureScores.threatPrevention * 10}%</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                        Real-time threat detection with automated response capabilities for immediate remediation.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="text-md font-medium mb-2">Device Discovery</h4>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                          <div className="bg-portnox-primary h-3 rounded-full" style={{ width: `${portnox.featureScores.deviceDiscovery * 10}%` }}></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">{portnox.featureScores.deviceDiscovery * 10}%</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                        Complete visibility across all network devices with detailed profiling capabilities.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-3">NIST Cybersecurity Framework Alignment</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs">Identify</span>
                          <span className="text-xs">90%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs">Protect</span>
                          <span className="text-xs">95%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs">Detect</span>
                          <span className="text-xs">85%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs">Respond</span>
                          <span className="text-xs">90%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs">Recover</span>
                          <span className="text-xs">80%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-portnox-primary bg-opacity-10 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-portnox-primary">Key Security Benefits</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-portnox-primary flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Continuous access verification for every device</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-portnox-primary flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Automated threat remediation and quarantine</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-portnox-primary flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Integrated risk assessment for all devices</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-portnox-primary flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Real-time security posture monitoring</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Vendor Radar Chart */}
            <div className="mb-6">
              <VendorRadarChart height={400} width={600} />
            </div>
          </div>
        )}
        
        {activeTab === 'compliance' && (
          <div className="compliance-coverage">
            {/* Compliance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <DashboardCard
                title="Compliance Coverage"
                value={`${Math.round(portnox.featureScores.compliance * 10)}%`}
                subtitle="Key regulatory frameworks"
                highlight={true}
              />
              
              <DashboardCard
                title="Automated Controls"
                value="85%"
                subtitle="vs. 40% (industry average)"
              />
              
              <DashboardCard
                title="Audit Readiness"
                value="On-demand"
                subtitle="Real-time compliance reporting"
              />
              
              <DashboardCard
                title="Compliance Cost Savings"
                value={formatCurrency(portnox.complianceSavings)}
                subtitle="3-year audit efficiency"
              />
            </div>
            
            {/* Compliance Radar Chart */}
            <div className="mb-6">
              <ComplianceRadarChart height={400} width={600} />
            </div>
            
            {/* Compliance Framework Details */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Regulatory Compliance Support</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-md font-medium flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z" clipRule="evenodd" />
                    </svg>
                    PCI DSS
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Comprehensive support for Payment Card Industry Data Security Standard requirements.
                  </p>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                    <span className="ml-2 text-xs font-medium">90%</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-md font-medium flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    HIPAA
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Strong controls for healthcare organizations with protected health information.
                  </p>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="ml-2 text-xs font-medium">85%</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-md font-medium flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    NIST 800-53
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Advanced security controls for federal information systems and organizations.
                  </p>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                      <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                    <span className="ml-2 text-xs font-medium">95%</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-md font-medium flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    GDPR
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Essential controls for EU data protection and privacy regulations.
                  </p>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="ml-2 text-xs font-medium">85%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'risk' && (
          <div className="risk-assessment">
            {/* Risk Assessment Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <DashboardCard
                title="Risk Reduction"
                value={`${Math.round(portnox.securityImprovement)}%`}
                subtitle={`vs. baseline security`}
                highlight={true}
              />
              
              <DashboardCard
                title="Security Controls"
                value="92%"
                subtitle="Control implementation score"
              />
              
              <DashboardCard
                title="Threat Prevention"
                value={`${portnox.featureScores.threatPrevention * 10}%`}
                subtitle="Threat mitigation capability"
              />
              
              <DashboardCard
                title="Financial Impact"
                value={formatCurrency(calculationResults.riskAssessment.financialRiskReduction)}
                subtitle="Risk mitigation value"
              />
            </div>
            
            {/* Risk Reduction Chart */}
            <div className="mb-6">
              <RiskReductionChart height={350} />
            </div>
            
            {/* Risk Assessment Details */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Risk Assessment Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border-b border-gray-200 dark:border-gray-700">
                    <h4 className="text-md font-medium text-red-700 dark:text-red-400">Without NAC</h4>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Risk Level</span>
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">High</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Breach Probability</span>
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">32%</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Response Time</span>
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">8+ hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Potential Losses</span>
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">$500K+</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-b border-gray-200 dark:border-gray-700">
                    <h4 className="text-md font-medium text-yellow-700 dark:text-yellow-400">Legacy NAC</h4>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Risk Level</span>
                      <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Medium</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Breach Probability</span>
                      <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">18%</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Response Time</span>
                      <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">1-4 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Potential Losses</span>
                      <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">$150-300K</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border-b border-gray-200 dark:border-gray-700">
                    <h4 className="text-md font-medium text-green-700 dark:text-green-400">Portnox Cloud</h4>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Risk Level</span>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">Low</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Breach Probability</span>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">8%</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Response Time</span>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">&lt; 45 min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Potential Losses</span>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">$35-85K</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">Cyber Insurance Impact</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  Implementing Portnox can reduce cybersecurity insurance premiums by an average of 10-15% by demonstrating strong security controls and continuous monitoring capabilities.
                </p>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="ml-2 text-xs font-medium">85% compliance with insurance requirements</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'threat' && (
          <div className="threat-protection">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This section provides detailed analysis of threat protection capabilities.
            </p>
            
            {/* Simple placeholder for now - will be extended in Phase 5 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Threat Protection Details</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Detailed threat protection analysis and charts will be implemented in Phase 5.
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'comparison' && (
          <div className="security-comparison">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This section provides a detailed comparison of security capabilities across vendors.
            </p>
            
            {/* Simple placeholder for now - will be extended in Phase 5 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Security Comparison Details</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Detailed security comparison charts and analysis will be implemented in Phase 5.
              </p>
            </div>
          </div>
        )}
      </TabPanel>
    </div>
  );
};

export default SecurityView;
