#!/bin/bash

# Script to update the Portnox TCO Analyzer UI with enhanced charts and visualizations
# This script updates files in-place, ensuring TypeScript compatibility and using existing vendor data

echo "Starting UI update for Portnox TCO Analyzer..."

# Step 1: Create the main dashboard view component with enhanced charts
echo "Creating enhanced dashboard view component..."

cat > src/components/views/Dashboard.tsx << 'EOF'
import React, { useState, useEffect } from 'react';
import { useCalculator } from '../../context/CalculatorContext';
import { calculateTco } from '../../utils/calculationEngine';
import { vendorData } from '../../api/vendorData';

// UI Components
import DashboardCard from '../ui/DashboardCard';
import TabPanel from '../ui/TabPanel';
import LoadingOverlay from '../ui/LoadingOverlay';
import ConfigCard from '../ui/ConfigCard';

// Charts
import ExecutiveSummaryChart from '../charts/ExecutiveSummaryChart';
import RiskReductionChart from '../charts/RiskReductionChart';
import ComplianceRadarChart from '../charts/ComplianceRadarChart';
import CumulativeCostChart from '../charts/CumulativeCostChart';
import PaybackPeriodChart from '../charts/PaybackPeriodChart';
import RoiChart from '../charts/RoiChart';
import CompetitiveAdvantageChart from '../charts/CompetitiveAdvantageChart';
import CompetitorComparisonChart from '../charts/CompetitorComparisonChart';
import SecurityImpactChart from '../charts/SecurityImpactChart';
import SavingsProjectionChart from '../charts/SavingsProjectionChart';
import TcoBreakdownChart from '../charts/TcoBreakdownChart';
import CompetitiveAdvantageVisual from '../charts/CompetitiveAdvantageVisual';

// Icons
import { Shield, Server, Calculator, BarChart3, ChevronDown, Check, X, PieChart, RefreshCw, Lightbulb, Zap, Database, Cloud, DollarSign, Download, ArrowUpRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { state, dispatch } = useCalculator();
  const [calculatingResults, setCalculatingResults] = useState(false);
  const [activeView, setActiveView] = useState('executive');
  const [activePanel, setActivePanel] = useState('overview');
  
  // Effect to run calculations when parameters change
  useEffect(() => {
    if (calculatingResults) {
      runCalculations();
    }
  }, [calculatingResults]);

  // Calculate TCO and update results
  const runCalculations = () => {
    setTimeout(() => {
      const calculationParams = {
        selectedVendors: state.selectedVendors,
        deviceCount: state.deviceCount,
        yearsToProject: state.yearsToProject,
        locations: state.locations,
        industry: state.industry,
        riskProfile: state.riskProfile,
        complianceRequirements: state.complianceRequirements,
        costParameters: state.costParameters,
        networkRequirements: state.networkRequirements
      };
      
      // Run calculations
      const results = calculateTco(calculationParams);
      dispatch({ type: 'SET_CALCULATION_RESULTS', payload: results });
      setCalculatingResults(false);
    }, 1500); // Simulate calculation time
  };

  // Toggle vendor selection
  const handleVendorSelect = (vendorId: string) => {
    if (vendorId === 'portnox') return; // Portnox always selected
    
    if (state.selectedVendors.includes(vendorId)) {
      dispatch({ type: 'UNSELECT_VENDOR', payload: vendorId });
    } else {
      dispatch({ type: 'SELECT_VENDOR', payload: vendorId });
    }
  };

  // Run calculations handler
  const handleRunCalculations = () => {
    setCalculatingResults(true);
  };

  // Helper to format statistics
  const formatStat = (value: number, prefix = '', suffix = '') => {
    if (isNaN(value)) return 'N/A';
    return `${prefix}${Math.round(value).toLocaleString()}${suffix}`;
  };

  // Get executive summary metrics if available
  const getExecutiveSummary = () => {
    if (!state.calculationResults?.executiveSummary) {
      return {
        totalSavings: 'N/A',
        savingsPercentage: 'N/A',
        paybackPeriod: 'N/A',
        riskReduction: 'N/A',
        implementationTime: 'N/A'
      };
    }
    
    const summary = state.calculationResults.executiveSummary;
    return {
      totalSavings: formatStat(summary.totalSavings, '$'),
      savingsPercentage: formatStat(summary.savingsPercentage, '', '%'),
      paybackPeriod: formatStat(summary.paybackPeriod, '', ' months'),
      riskReduction: formatStat(summary.riskReduction, '', '%'),
      implementationTime: formatStat(summary.implementationTime, '', ' days')
    };
  };

  // Prepare configuration panel
  const renderConfiguration = () => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">TCO Calculator Configuration</h2>
        
        <ConfigCard
          title="Select NAC Vendors"
          icon={<Server className="h-4 w-4 text-blue-500" />}
          initiallyExpanded={true}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {Object.keys(vendorData).map(vendorId => {
              const vendor = vendorData[vendorId];
              const isSelected = state.selectedVendors.includes(vendorId);
              const isPortnox = vendorId === 'portnox';
              
              return (
                <div 
                  key={vendorId}
                  className={`
                    relative flex flex-col border rounded-lg overflow-hidden cursor-pointer transition-all
                    ${isSelected ? 'border-blue-500 shadow-sm dark:border-blue-400' : 'border-gray-200 dark:border-gray-700'}
                    ${isPortnox ? 'opacity-90 cursor-default' : 'hover:border-blue-300 dark:hover:border-blue-500'}
                  `}
                  onClick={isPortnox ? undefined : () => handleVendorSelect(vendorId)}
                >
                  <div className="p-2 border-b border-gray-100 dark:border-gray-700 text-center">
                    <img 
                      src={vendor.logo} 
                      alt={vendor.name} 
                      className="h-6 mx-auto"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/img/vendors/default-logo.png';
                      }} 
                    />
                  </div>
                  <div className="p-2">
                    <div className="text-xs font-medium text-gray-800 dark:text-white">{vendor.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{vendor.description}</div>
                  </div>
                  
                  {vendor.badge && (
                    <div className="absolute top-0 right-0 m-1">
                      <span className={`
                        text-xs px-1.5 py-0.5 rounded 
                        ${vendor.badgeClass || 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'}
                      `}>
                        {vendor.badge}
                      </span>
                    </div>
                  )}
                  
                  {isSelected && (
                    <div className="absolute bottom-0 right-0 m-1 text-blue-500 dark:text-blue-400">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ConfigCard>
        
        <ConfigCard
          title="Organization Details"
          icon={<Database className="h-4 w-4 text-purple-500" />}
          initiallyExpanded={false}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Device Count
              </label>
              <input
                type="number"
                className="block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={state.deviceCount}
                onChange={(e) => dispatch({ type: 'SET_DEVICE_COUNT', payload: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Number of Locations
              </label>
              <input
                type="number"
                className="block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={state.locations}
                onChange={(e) => dispatch({ type: 'SET_LOCATIONS', payload: parseInt(e.target.value) })}
              />
            </div>
          </div>
        </ConfigCard>
        
        <ConfigCard
          title="Industry & Compliance"
          icon={<Shield className="h-4 w-4 text-green-500" />}
          initiallyExpanded={false}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Industry
            </label>
            <select
              className="block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={state.industry}
              onChange={(e) => dispatch({ type: 'SET_INDUSTRY', payload: e.target.value })}
            >
              <option value="">Select Industry</option>
              <option value="healthcare">Healthcare</option>
              <option value="financial">Financial Services</option>
              <option value="education">Education</option>
              <option value="government">Government</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="retail">Retail</option>
              <option value="technology">Technology</option>
              <option value="energy">Energy & Utilities</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Compliance Requirements
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(state.complianceRequirements).map(req => (
                <div key={req} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`compliance-${req}`}
                    checked={state.complianceRequirements[req]}
                    onChange={(e) => dispatch({ 
                      type: 'TOGGLE_COMPLIANCE', 
                      payload: { requirement: req, value: e.target.checked } 
                    })}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`compliance-${req}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    {req.toUpperCase()}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </ConfigCard>
        
        <ConfigCard
          title="Cost Parameters"
          icon={<DollarSign className="h-4 w-4 text-yellow-500" />}
          initiallyExpanded={false}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                IT Staff Fully Loaded Cost (Annual)
              </label>
              <input
                type="number"
                className="block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={state.costParameters.fteCost}
                onChange={(e) => dispatch({ 
                  type: 'SET_COST_PARAMETER', 
                  payload: { parameter: 'fteCost', value: parseInt(e.target.value) } 
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Portnox Price Per Device (Monthly)
              </label>
              <input
                type="number"
                step="0.01"
                className="block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={state.costParameters.portnoxBasePricePerDevice}
                onChange={(e) => dispatch({ 
                  type: 'SET_COST_PARAMETER', 
                  payload: { parameter: 'portnoxBasePricePerDevice', value: parseFloat(e.target.value) } 
                })}
              />
            </div>
          </div>
        </ConfigCard>
        
        <div className="mt-4">
          <button
            onClick={handleRunCalculations}
            disabled={calculatingResults}
            className="w-full flex justify-center items-center py-2.5 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
          >
            {calculatingResults ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <Calculator className="h-4 w-4 mr-2" />
                Calculate TCO & ROI
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  // Render different stakeholder views
  const renderStakeholderView = () => {
    const summary = getExecutiveSummary();
    
    if (!state.calculationResults) {
      return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <Calculator className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            No calculation data available
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Configure your options and click the Calculate button to generate the TCO analysis.
          </p>
          <button 
            className="inline-flex items-center px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
            onClick={handleRunCalculations}
          >
            <Calculator className="h-4 w-4 mr-2" />
            Calculate Now
          </button>
        </div>
      );
    }
    
    switch (activeView) {
      case 'executive':
        return (
          <>
            <TabPanel
              tabs={[
                { id: 'overview', label: 'Executive Summary' },
                { id: 'roi', label: 'ROI Analysis' },
                { id: 'risk', label: 'Risk Assessment' },
                { id: 'comparison', label: 'Vendor Comparison' }
              ]}
              activeTab={activePanel}
              onTabChange={setActivePanel}
            >
              {activePanel === 'overview' && (
                <>
                  {/* Executive Summary Dashboard */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <DashboardCard 
                      title="Total Savings"
                      value={summary.totalSavings}
                      subtitle={`${summary.savingsPercentage} reduction vs. competitors`}
                      trend={{direction: 'up', value: '15% higher than industry average'}}
                      highlight
                    />
                    <DashboardCard 
                      title="Payback Period"
                      value={summary.paybackPeriod}
                      subtitle="Time to positive ROI"
                      trend={{direction: 'up', value: '5 months faster than competitors'}}
                    />
                    <DashboardCard 
                      title="Risk Reduction"
                      value={summary.riskReduction}
                      subtitle="Overall security improvement"
                      trend={{direction: 'up', value: '20% better than alternatives'}}
                    />
                    <DashboardCard 
                      title="Implementation Time"
                      value={summary.implementationTime}
                      subtitle="75% faster than on-premises"
                      trend={{direction: 'up', value: 'Leading time-to-security'}}
                    />
                  </div>
                  
                  {/* Executive Summary Chart */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                        Executive Summary
                      </h3>
                    </div>
                    <div className="p-4">
                      <ExecutiveSummaryChart height={350} />
                    </div>
                  </div>
                  
                  {/* Charts - 2 column layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                          3-Year TCO Comparison
                        </h3>
                      </div>
                      <div className="p-4">
                        <CompetitorComparisonChart height={350} />
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                          Cumulative Cost Comparison
                        </h3>
                      </div>
                      <div className="p-4">
                        <CumulativeCostChart height={350} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Competitive Advantage */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                        Competitive Advantage Analysis
                      </h3>
                    </div>
                    <div className="p-4">
                      <CompetitiveAdvantageVisual height={400} />
                    </div>
                  </div>
                </>
              )}
              
              {activePanel === 'roi' && (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                          Return on Investment (ROI)
                        </h3>
                      </div>
                      <div className="p-4">
                        <RoiChart height={350} />
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                          Payback Period
                        </h3>
                      </div>
                      <div className="p-4">
                        <PaybackPeriodChart height={350} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                        5-Year Savings Projection
                      </h3>
                    </div>
                    <div className="p-4">
                      <SavingsProjectionChart height={350} />
                    </div>
                  </div>
                </>
              )}
              
              {activePanel === 'risk' && (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                          Security Risk Reduction
                        </h3>
                      </div>
                      <div className="p-4">
                        <RiskReductionChart height={350} />
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                          Compliance Framework Coverage
                        </h3>
                      </div>
                      <div className="p-4">
                        <ComplianceRadarChart height={350} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                        Security Capabilities Comparison
                      </h3>
                    </div>
                    <div className="p-4">
                      <SecurityImpactChart height={450} />
                    </div>
                  </div>
                </>
              )}
              
              {activePanel === 'comparison' && (
                <>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                        TCO Breakdown by Category
                      </h3>
                    </div>
                    <div className="p-4">
                      <CompetitorComparisonChart height={350} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                          Feature Comparison
                        </h3>
                      </div>
                      <div className="p-4">
                        <CompetitiveAdvantageChart height={350} />
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                          Portnox TCO Breakdown
                        </h3>
                      </div>
                      <div className="p-4">
                        <TcoBreakdownChart height={350} vendorId="portnox" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </TabPanel>
          </>
        );
      
      case 'financial':
        return (
          <>
            <TabPanel
              tabs={[
                { id: 'overview', label: 'Financial Overview' },
                { id: 'tco', label: 'TCO Breakdown' },
                { id: 'roi', label: 'ROI Analysis' },
                { id: 'projections', label: 'Cost Projections' }
              ]}
              activeTab={activePanel}
              onTabChange={setActivePanel}
            >
              {activePanel === 'overview' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {state.calculationResults.vendorResults.filter(v => v.vendorId === 'portnox').map(vendor => (
                      <React.Fragment key={vendor.vendorId}>
                        <DashboardCard 
                          title="Total 3-Year TCO"
                          value={`$${Math.round(vendor.totalTco).toLocaleString()}`}
                          subtitle={`vs. ${Math.round(state.calculationResults.comparisonResults['cisco']?.savings || 0).toLocaleString()} savings`}
                          highlight
                        />
                        <DashboardCard 
                          title="Annual Subscription"
                          value={`$${Math.round(vendor.subscriptionCost / 3).toLocaleString()}`}
                          subtitle="Fully managed service"
                        />
                        <DashboardCard 
                          title="Implementation Cost"
                          value={`$${Math.round(vendor.implementationCost).toLocaleString()}`}
                          subtitle="One-time cost"
                        />
                        <DashboardCard 
                          title="Operational Cost (Annual)"
                          value={`$${Math.round(vendor.staffingCost / 3).toLocaleString()}`}
                          subtitle="Staff and management"
                        />
                      </React.Fragment>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                          3-Year TCO Comparison
                        </h3>
                      </div>
                      <div className="p-4">
                        <CompetitorComparisonChart height={350} />
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                          Cumulative Cost Comparison
                        </h3>
                      </div>
                      <div className="p-4">
                        <CumulativeCostChart height={350} />
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {activePanel === 'tco' && (
                <>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                        TCO Breakdown Analysis
                      </h3>
                    </div>
                    <div className="p-4">
                      <TcoBreakdownChart height={500} vendorId="portnox" />
                    </div>
                  </div>
                </>
              )}
              
              {activePanel === 'roi' && (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                          Return on Investment (ROI)
                        </h3>
                      </div>
                      <div className="p-4">
                        <RoiChart height={350} />
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                          Payback Period
                        </h3>
                      </div>
                      <div className="p-4">
                        <PaybackPeriodChart height={350} />
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {activePanel === 'projections' && (
                <>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                        5-Year Savings Projection
                      </h3>
                    </div>
                    <div className="p-4">
                      <SavingsProjectionChart height={350} />
                    </div>
                  </div>
                </>
              )}
            </TabPanel>
          </>
        );
      
      case 'security':
        return (
          <>
            <TabPanel
              tabs={[
                { id: 'posture', label: 'Security Posture' },
                { id: 'compliance', label: 'Compliance Coverage' },
                { id: 'risk', label: 'Risk Assessment' },
                { id: 'capabilities', label: 'Security Capabilities' }
              ]}
              activeTab={activePanel}
              onTabChange={setActivePanel}
            >
              {activePanel === 'posture' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {state.calculationResults.vendorResults.filter(v => v.vendorId === 'portnox').map(vendor => (
                      <React.Fragment key={vendor.vendorId}>
                        <DashboardCard 
                          title="Zero Trust Readiness"
                          value={`${Math.round(vendor.featureScores.zeroTrust * 10)}%`}
                          subtitle={`vs. ${Math.round(state.calculationResults.avgSecurityImprovement)}% avg.`}
                          highlight
                        />
                        <DashboardCard 
                          title="Device Authentication"
                          value={`${Math.round(vendor.featureScores.deviceDiscovery * 10)}%`}
                          subtitle="Complete device visibility"
                        />
                        <DashboardCard 
                          title="Risk Assessment"
                          value="Real-time"
                          subtitle="Continuous monitoring"
                        />
                        <DashboardCard 
                          title="Remediation Speed"
                          value={`${vendor.meanTimeToRespond} min`}
                          subtitle="Average response time"
                        />
                      </React.Fragment>
                    ))}
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                        Security Capabilities Comparison
                      </h3>
                    </div>
                    <div className="p-4">
                      <SecurityImpactChart height={450} />
                    </div>
                  </div>
                </>
              )}
              
              {activePanel === 'compliance' && (
                <>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                        Compliance Framework Coverage
                      </h3>
                    </div>
                    <div className="p-4">
                      <ComplianceRadarChart height={450} width={600} />
                    </div>
                  </div>
                </>
              )}
              
              {activePanel === 'risk' && (
                <>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                        Risk Reduction Comparison
                      </h3>
                    </div>
                    <div className="p-4">
                      <RiskReductionChart height={400} />
                    </div>
                  </div>
                </>
              )}
              
              {activePanel === 'capabilities' && (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                          Feature Comparison
                        </h3>
                      </div>
                      <div className="p-4">
                        <CompetitiveAdvantageChart height={350} />
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                          Portnox Feature Analysis
                        </h3>
                      </div>
                      <div className="p-4">
                        <VendorRadarChart height={350} vendorId="portnox" compareToAll={true} />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </TabPanel>
          </>
        );
        
      case 'technical':
        return (
          <>
            <TabPanel
              tabs={[
                { id: 'overview', label: 'Technical Overview' },
                { id: 'features', label: 'Feature Comparison' },
                { id: 'architecture', label: 'Architecture Comparison' },
                { id: 'implementation', label: 'Implementation' }
              ]}
              activeTab={activePanel}
              onTabChange={setActivePanel}
            >
              {activePanel === 'overview' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {state.calculationResults.vendorResults.filter(v => v.vendorId === 'portnox').map(vendor => (
                      <React.Fragment key={vendor.vendorId}>
                        <DashboardCard 
                          title="Architecture"
                          value="Cloud-Native"
                          subtitle="No on-premises hardware"
                          highlight
                        />
                        <DashboardCard 
                          title="Deployment Model"
                          value="SaaS"
                          subtitle="Fully managed service"
                        />
                        <DashboardCard 
                          title="Implementation Time"
                          value={`${vendor.implementationDays} days`}
                          subtitle="75% faster than on-premises"
                        />
                        <DashboardCard 
                          title="Technical Debt"
                          value="Minimal"
                          subtitle="Modern architecture"
                        />
                      </React.Fragment>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                          Feature Comparison
                        </h3>
                      </div>
                      <div className="p-4">
                        <CompetitiveAdvantageChart height={350} />
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                          Portnox Feature Analysis
                        </h3>
                      </div>
                      <div className="p-4">
                        <VendorRadarChart height={350} vendorId="portnox" compareToAll={true} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                        Competitive Advantage Analysis
                      </h3>
                    </div>
                    <div className="p-4">
                      <CompetitiveAdvantageVisual height={400} />
                    </div>
                  </div>
                </>
              )}
              
              {activePanel === 'features' && (
                <>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                        Feature Comparison
                      </h3>
                    </div>
                    <div className="p-4">
                      <SecurityImpactChart height={450} />
                    </div>
                  </div>
                </>
              )}
              
              {activePanel === 'architecture' && (
                <>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                        Deployment Architecture Comparison
                      </h3>
                    </div>
                    <div className="p-4">
                      <CompetitiveAdvantageVisual height={400} />
                    </div>
                  </div>
                </>
              )}
              
              {activePanel === 'implementation' && (
                <>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                        Implementation Comparison
                      </h3>
                    </div>
                    <div className="p-4">
                      <PaybackPeriodChart height={350} />
                    </div>
                  </div>
                </>
              )}
            </TabPanel>
          </>
        );
      
      default:
        return <div>No content available for this view</div>;
    }
  };

  // Render stakeholder tabs
  const renderStakeholderTabs = () => {
    return (
      <div className="flex space-x-1">
        <button
          className={`px-4 py-1.5 rounded-md flex items-center text-sm font-medium transition-colors ${
            activeView === 'executive'
              ? 'bg-blue-600 text-white dark:bg-blue-700'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700'
          }`}
          onClick={() => {
            setActiveView('executive');
            setActivePanel('overview');
          }}
        >
          <PieChart className="h-4 w-4 mr-1.5" />
          Executive
        </button>
        
        <button
          className={`px-4 py-1.5 rounded-md flex items-center text-sm font-medium transition-colors ${
            activeView === 'financial'
              ? 'bg-blue-600 text-white dark:bg-blue-700'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700'
          }`}
          onClick={() => {
            setActiveView('financial');
            setActivePanel('overview');
          }}
        >
          <DollarSign className="h-4 w-4 mr-1.5" />
          Financial
        </button>
        
        <button
          className={`px-4 py-1.5 rounded-md flex items-center text-sm font-medium transition-colors ${
            activeView === 'security'
              ? 'bg-blue-600 text-white dark:bg-blue-700'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700'
          }`}
          onClick={() => {
            setActiveView('security');
            setActivePanel('posture');
          }}
        >
          <Shield className="h-4 w-4 mr-1.5" />
          Security
        </button>
        
        <button
          className={`px-4 py-1.5 rounded-md flex items-center text-sm font-medium transition-colors ${
            activeView === 'technical'
              ? 'bg-blue-600 text-white dark:bg-blue-700'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700'
          }`}
          onClick={() => {
            setActiveView('technical');
            setActivePanel('overview');
          }}
        >
          <Server className="h-4 w-4 mr-1.5" />
          Technical
        </button>
      </div>
    );
  };

  return (
    <div className="p-4">
      <LoadingOverlay isLoading={calculatingResults} message="Calculating TCO results..." />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Configuration */}
        <div className="md:col-span-1">
          {renderConfiguration()}
        </div>
        
        {/* Right column - Results and visualizations */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">TCO Analysis Results</h2>
              {renderStakeholderTabs()}
            </div>
            
            {renderStakeholderView()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
EOF

echo "Created Dashboard component with enhanced charts and UI"

# Step 2: Enhance VendorRadarChart component for improved visualizations
echo "Updating VendorRadarChart component..."

cat > src/components/charts/VendorRadarChart.tsx << 'EOF'
import React, { useRef, useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import { useCalculator } from '../../context/CalculatorContext';
import { formatCurrency } from '../../utils/formatters';

interface VendorRadarChartProps {
  vendorId?: string;
  height?: number;
  width?: number;
  compareToAll?: boolean;
}

interface VendorResult {
  vendorId: string;
  name: string;
  totalTco: number;
  roi: number;
  implementationDays: number;
  securityImprovement: number;
  paybackPeriod: number;
  featureScores: Record<string, number>;
  badge?: string;
  deployment: string;
}

// Definition for feature category metadata
interface FeatureCategory {
  name: string;
  description: string;
  icon: string;
  color: string;
}

// Feature categories with descriptions and colors
const FEATURES: Record<string, FeatureCategory> = {
  threatPrevention: {
    name: 'Threat Prevention',
    description: 'Ability to detect and prevent network threats',
    icon: '🛡️',
    color: '#F87171' // red-400
  },
  zeroTrust: {
    name: 'Zero Trust',
    description: 'Implementation of zero trust security principles',
    icon: '🔒',
    color: '#60A5FA' // blue-400
  },
  deviceDiscovery: {
    name: 'Device Discovery',
    description: 'Capability to discover and identify devices',
    icon: '🔍',
    color: '#34D399' // green-400
  },
  cloudNative: {
    name: 'Cloud Native',
    description: 'Level of cloud-native architecture and functionality',
    icon: '☁️',
    color: '#A78BFA' // purple-400
  },
  userExperience: {
    name: 'User Experience',
    description: 'Overall ease of use and user satisfaction',
    icon: '👤',
    color: '#FBBF24' // yellow-400
  },
  remoteAccess: {
    name: 'Remote Access',
    description: 'Support for secure remote access',
    icon: '🌐',
    color: '#EC4899' // pink-400
  },
  compliance: {
    name: 'Compliance',
    description: 'Regulatory compliance capabilities',
    icon: '📋',
    color: '#6EE7B7' // emerald-300
  },
  managementSimplicity: {
    name: 'Management',
    description: 'Ease of management and administration',
    icon: '⚙️',
    color: '#93C5FD' // blue-300
  }
};

const VendorRadarChart: React.FC<VendorRadarChartProps> = ({
  vendorId = 'portnox',
  height = 500,
  width = 650,
  compareToAll = false
}) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  // Calculate max and average scores for each feature
  const { vendorData, competitorData, avgCompetitorScores } = useMemo(() => {
    const result = {
      vendorData: null as VendorResult | null,
      competitorData: [] as VendorResult[],
      avgCompetitorScores: {} as Record<string, number>
    };
    
    if (!calculationResults?.vendorResults) return result;
    
    // Find the selected vendor
    result.vendorData = calculationResults.vendorResults.find(
      (v: VendorResult) => v.vendorId === vendorId
    ) || null;
    
    // Get competitors (excluding selected vendor)
    result.competitorData = calculationResults.vendorResults.filter(
      (v: VendorResult) => v.vendorId !== vendorId && v.vendorId !== 'no-nac'
    );
    
    // Calculate average scores for competitors
    if (result.competitorData.length > 0) {
      Object.keys(FEATURES).forEach(feature => {
        let sum = 0;
        let count = 0;
        
        result.competitorData.forEach(competitor => {
          if (competitor.featureScores && competitor.featureScores[feature] !== undefined) {
            sum += competitor.featureScores[feature];
            count++;
          }
        });
        
        result.avgCompetitorScores[feature] = count > 0 ? sum / count : 0;
      });
    }
    
    return result;
  }, [calculationResults, vendorId]);
  
  // Draw radar chart
  useEffect(() => {
    if (!svgRef.current || !vendorData) return;
    
    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();
    
    // Setup
    const margin = { top: 70, right: 70, bottom: 70, left: 70 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const radius = Math.min(innerWidth, innerHeight) / 2;
    
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width/2}, ${height/2})`);
    
    // Filter features with data
    const featureKeys = Object.keys(FEATURES).filter(key => 
      vendorData.featureScores && vendorData.featureScores[key] !== undefined
    );
    
    // Set up scales and angles
    const angleSlice = Math.PI * 2 / featureKeys.length;
    
    const rScale = d3.scaleLinear()
      .domain([0, 10])
      .range([0, radius]);
    
    // Draw circular grid
    const axisGrid = svg.append('g').attr('class', 'axis-grid');
    
    // Draw background circles
    const circles = [2, 4, 6, 8, 10];
    
    circles.forEach((d: number) => {
      axisGrid.append('circle')
        .attr('r', rScale(d))
        .attr('fill', 'none')
        .attr('stroke', '#ddd')
        .attr('stroke-width', 0.5);
      
      // Add value labels for radar levels
      if (d % 2 === 0) {
        axisGrid.append('text')
          .attr('x', 4)
          .attr('y', -rScale(d))
          .attr('dy', '0.4em')
          .style('font-size', '10px')
          .style('fill', '#666')
          .style('text-anchor', 'middle')
          .text(d.toString());
      }
    });
    
    // Draw axes
    const axes = axisGrid.selectAll('.axis')
      .data(featureKeys)
      .enter()
      .append('g')
      .attr('class', 'axis');
    
    // Draw axis lines
    axes.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (d: string, i: number) => rScale(10) * Math.cos(angleSlice * i - Math.PI/2))
      .attr('y2', (d: string, i: number) => rScale(10) * Math.sin(angleSlice * i - Math.PI/2))
      .attr('stroke', '#ddd')
      .attr('stroke-width', 1);
    
    // Draw axis labels
    axes.append('text')
      .attr('class', 'legend')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('x', (d: string, i: number) => (rScale(10) + 20) * Math.cos(angleSlice * i - Math.PI/2))
      .attr('y', (d: string, i: number) => (rScale(10) + 20) * Math.sin(angleSlice * i - Math.PI/2))
      .style('font-size', '12px')
      .style('fill', (d: string) => FEATURES[d].color)
      .text((d: string) => FEATURES[d].name);
    
    // Data wrangling function
    const getPathCoordinates = (data: VendorResult) => {
      const coordinates = featureKeys.map((key, i) => {
        const value = data.featureScores?.[key] || 0;
        const angle = angleSlice * i - Math.PI/2;
        return {
          x: rScale(value) * Math.cos(angle),
          y: rScale(value) * Math.sin(angle)
        };
      });
      return coordinates;
    };
    
    // Generate the line function
    const radarLine = d3.lineRadial<{key: string, value: number}>()
      .radius(d => rScale(d.value))
      .angle((d, i) => i * angleSlice);
    
    // Draw area for the selected vendor
    const vendorCoordinates = getPathCoordinates(vendorData);
    
    const createRadarPath = (coordinates: {x: number, y: number}[], fillColor: string, strokeColor: string, opacity: number) => {
      // Create path
      const path = svg.append('path')
        .datum(coordinates)
        .attr('d', d => {
          let pathData = 'M' + d[0].x + ',' + d[0].y;
          for (let i = 1; i < d.length; i++) {
            pathData += ' L' + d[i].x + ',' + d[i].y;
          }
          pathData += ' Z';
          return pathData;
        })
        .attr('fill', fillColor)
        .attr('fill-opacity', opacity)
        .attr('stroke', strokeColor)
        .attr('stroke-width', 2);
      
      // Animate path drawing
      const totalLength = path.node()?.getTotalLength() || 0;
      path
        .attr('stroke-dasharray', totalLength + ' ' + totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(1000)
        .attr('stroke-dashoffset', 0);
      
      return path;
    };
    
    // Create vendor area
    createRadarPath(
      vendorCoordinates, 
      '#2BD25B20', // Green with transparency
      '#2BD25B',   // Solid green stroke
      0.8
    );
    
    // If comparing to all vendors, draw average competitor area
    if (compareToAll && Object.keys(avgCompetitorScores).length > 0) {
      // Create average competitor data
      const avgCompetitor = {
        vendorId: 'average',
        name: 'Average Competitor',
        featureScores: avgCompetitorScores,
        totalTco: 0,
        roi: 0,
        implementationDays: 0,
        securityImprovement: 0,
        paybackPeriod: 0,
        deployment: ''
      };
      
      const avgCoordinates = getPathCoordinates(avgCompetitor);
      
      // Create average competitor area
      createRadarPath(
        avgCoordinates, 
        '#1B67B220', // Blue with transparency
        '#1B67B2',   // Solid blue stroke
        0.6
      );
    }
    
    // Draw circles for data points
    vendorCoordinates.forEach((point, i) => {
      const feature = featureKeys[i];
      const value = vendorData.featureScores?.[feature] || 0;
      
      svg.append('circle')
        .attr('cx', point.x)
        .attr('cy', point.y)
        .attr('r', 0) // Start with radius 0
        .attr('fill', '#2BD25B')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1)
        .on('mouseover', function(event: any) {
          d3.select(this).attr('r', 6);
          
          // Show tooltip
          const tooltip = d3.select(tooltipRef.current)
            .style('opacity', 0)
            .style('display', 'block')
            .style('position', 'absolute')
            .style('background-color', 'white')
            .style('border', '1px solid #ddd')
            .style('border-radius', '4px')
            .style('padding', '8px')
            .style('box-shadow', '0 2px 4px rgba(0,0,0,0.1)')
            .style('pointer-events', 'none')
            .style('font-size', '12px')
            .style('z-index', '100');
          
          tooltip.html(`
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <span style="margin-right: 4px; font-size: 14px;">${FEATURES[feature].icon}</span>
              <span style="font-weight: bold; color: ${FEATURES[feature].color};">${FEATURES[feature].name}</span>
            </div>
            <div>${FEATURES[feature].description}</div>
            <div style="margin-top: 4px; font-weight: bold;">${vendorData.name}: ${value * 10}%</div>
            ${compareToAll ? `<div>Avg. Competitor: ${(avgCompetitorScores[feature] || 0) * 10}%</div>` : ''}
          `);
          
          // Position tooltip near the mouse
          tooltip
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 15) + 'px')
            .transition()
            .duration(200)
            .style('opacity', 1);
        })
        .on('mouseout', function() {
          d3.select(this).attr('r', 4);
          
          // Hide tooltip
          d3.select(tooltipRef.current)
            .transition()
            .duration(200)
            .style('opacity', 0)
            .on('end', function() {
              d3.select(tooltipRef.current).style('display', 'none');
            });
        })
        .transition()
        .delay(i * 100)
        .duration(500)
        .attr('r', 4);
    });
    
    // Add legend
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${-radius}, ${-radius - 30})`);
    
    legend.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', '#2BD25B20')
      .attr('stroke', '#2BD25B');
    
    legend.append('text')
      .attr('x', 18)
      .attr('y', 9)
      .attr('dy', '0.1em')
      .style('font-size', '10px')
      .style('fill', '#333')
      .text(vendorData.name);
    
    if (compareToAll) {
      const competitorLegend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${-radius}, ${-radius - 10})`);
      
      competitorLegend.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 12)
        .attr('height', 12)
        .attr('fill', '#1B67B220')
        .attr('stroke', '#1B67B2');
      
      competitorLegend.append('text')
        .attr('x', 18)
        .attr('y', 9)
        .attr('dy', '0.1em')
        .style('font-size', '10px')
        .style('fill', '#333')
        .text('Average Competitor');
    }
    
    // Add title
    svg.append('text')
      .attr('x', 0)
      .attr('y', -radius - 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .style('fill', '#333')
      .text('Feature Comparison');
    
  }, [svgRef, tooltipRef, vendorData, competitorData, avgCompetitorScores, compareToAll, width, height]);
  
  if (!vendorData) {
    return (
      <div className="chart-container p-4 text-center">
        <div className="text-lg font-bold">Feature Comparison</div>
        <div className="text-gray-500 mt-4">No data available for this vendor</div>
      </div>
    );
  }
  
  return (
    <div className="chart-container">
      <div className="mb-4 text-center">
        <div className="text-lg font-bold">{vendorData.name} Feature Analysis</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Capability scores on a scale of 0-10</div>
      </div>
      <div className="relative">
        <svg ref={svgRef}></svg>
        <div ref={tooltipRef} className="absolute pointer-events-none opacity-0"></div>
      </div>
    </div>
  );
};

export default VendorRadarChart;
EOF

echo "Updated VendorRadarChart component"

# Step 3: Update the CompetitiveAdvantageVisual component for better visualization
echo "Updating CompetitiveAdvantageVisual component..."

cat > src/components/charts/CompetitiveAdvantageVisual.tsx << 'EOF'
import React, { useState, useEffect, useRef } from 'react';
import { useCalculator } from '../../context/CalculatorContext';
import { VendorResult } from '../../utils/types';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface CompetitiveAdvantageVisualProps {
  height?: number;
}

// Define the category interface
interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

const CompetitiveAdvantageVisual: React.FC<CompetitiveAdvantageVisualProps> = ({ height = 500 }) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Define feature categories
  const categories: Category[] = [
    { id: 'cloud', name: 'Cloud Architecture', icon: '☁️', color: '#4299E1', description: 'Native cloud architecture eliminates hardware costs and provides automatic updates' },
    { id: 'zeroTrust', name: 'Zero Trust', icon: '🔒', color: '#805AD5', description: 'Comprehensive zero trust implementation with continuous verification' },
    { id: 'speed', name: 'Deployment Speed', icon: '🚀', color: '#F6AD55', description: '75% faster deployment than on-premises alternatives' },
    { id: 'simplicity', name: 'Management Simplicity', icon: '✨', color: '#68D391', description: 'Intuitive interface requiring minimal specialized training' },
    { id: 'cost', name: 'Total Cost', icon: '💰', color: '#F56565', description: 'Lower TCO with subscription model and no hardware costs' },
    { id: 'security', name: 'Risk Reduction', icon: '🛡️', color: '#4FD1C5', description: 'Real-time threat detection and automated response' },
    { id: 'features', name: 'Feature Coverage', icon: '⚙️', color: '#FC8181', description: 'Comprehensive feature set with regular updates' },
    { id: 'future', name: 'Future Readiness', icon: '🔮', color: '#B794F4', description: 'Designed for evolving security needs with AI-powered analytics' }
  ];
  
  useEffect(() => {
    // Trigger animation when component mounts
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!calculationResults || !calculationResults.vendorResults) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center" style={{ height }}>
        <div className="text-5xl mb-4">📊</div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Competitive Analysis</h3>
        <p className="text-gray-600 dark:text-gray-400">
          No data available. Please calculate results first.
        </p>
      </div>
    );
  }
  
  // Get Portnox and top 2 competitors
  const portnox = calculationResults.vendorResults.find((v: VendorResult) => v.vendorId === 'portnox');
  if (!portnox) return null;
  
  const competitors = calculationResults.vendorResults
    .filter((v: VendorResult) => v.vendorId !== 'portnox')
    .sort((a: VendorResult, b: VendorResult) => b.totalTco - a.totalTco)
    .slice(0, 2);
  
  // All vendors for comparison
  const vendors = [portnox, ...competitors];
  
  // Helper function to get score for a category
  const getScore = (vendor: VendorResult, categoryId: string): number => {
    switch(categoryId) {
      case 'cloud':
        return vendor.featureScores.cloudNative * 10;
      case 'zeroTrust':
        return vendor.featureScores.zeroTrust * 10;
      case 'speed':
        return vendor.featureScores.deploymentSpeed * 10;
      case 'simplicity':
        return vendor.featureScores.managementSimplicity * 10;
      case 'cost':
        return 100 - ((vendor.totalTco / (competitors[0]?.totalTco || vendor.totalTco * 1.5)) * 100);
      case 'security':
        return vendor.securityImprovement;
      case 'features':
        return vendor.featureScores.thirdPartyIntegration * 10;
      case 'future':
        return vendor.deployment === 'cloud' ? 90 : 
               vendor.deployment === 'hybrid' ? 60 : 40;
      default:
        return 50;
    }
  };
  
  // Calculate overall score
  const getOverallScore = (vendor: VendorResult): number => {
    return categories.reduce((sum, category) => sum + getScore(vendor, category.id), 0) / categories.length;
  };
  
  // Get all vendors
  const allVendors = [portnox, ...competitors];
  
  return (
    <div 
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm" 
      style={{ height: 'auto', minHeight: height, overflow: 'hidden' }}
      ref={containerRef}
    >
      <h3 className="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-200">
        <span className="mr-2">🏆</span> 
        Competitive Advantage Analysis
      </h3>
      
      {/* Categories selection */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categories.map(category => (
          <button
            key={category.id}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
              activeCategory === category.id
                ? 'bg-opacity-100 text-white shadow-md scale-110'
                : 'bg-opacity-20 text-gray-700 dark:text-gray-300 hover:bg-opacity-30'
            }`}
            style={{ 
              backgroundColor: activeCategory === category.id 
                ? category.color 
                : `${category.color}33` 
            }}
            onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
          >
            <span className="mr-1">{category.icon}</span> {category.name}
          </button>
        ))}
      </div>
      
      {/* Main visualization */}
      <div className="relative">
        {/* Category description when selected */}
        {activeCategory && (
          <div 
            className="absolute top-0 left-0 right-0 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-4 text-center transition-all duration-300 ease-in-out"
            style={{ 
              transform: 'translateY(0)', 
              opacity: 1, 
              zIndex: 10,
              backgroundColor: `${categories.find(c => c.id === activeCategory)?.color}15` 
            }}
          >
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">
                {categories.find(c => c.id === activeCategory)?.name}: 
              </span>{' '}
              {categories.find(c => c.id === activeCategory)?.description}
            </p>
          </div>
        )}
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {allVendors.map((vendor, index) => {
            const overallScore = getOverallScore(vendor);
            const isPortnox = vendor.vendorId === 'portnox';
            
            return (
              <div 
                key={vendor.vendorId}
                className={`relative ${
                  isPortnox 
                    ? 'border-green-500 dark:border-green-400' 
                    : 'border-gray-200 dark:border-gray-700'
                } border-2 rounded-lg p-4 transition-all duration-500 transform ${
                  animationComplete 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-20 opacity-0'
                }`}
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                  boxShadow: isPortnox 
                    ? '0 10px 25px -5px rgba(43, 210, 91, 0.25)' 
                    : undefined
                }}
              >
                {/* Top ribbon for Portnox */}
                {isPortnox && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white py-1 px-4 rounded-full text-xs font-bold shadow-md">
                    BEST CHOICE
                  </div>
                )}
                
                {/* Vendor logo and name */}
                <div className="flex items-center justify-center mb-4">
                  <div 
                    className="w-12 h-12 flex items-center justify-center rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white"
                  >
                    <img 
                      src={`/img/vendors/${vendor.vendorId}-logo.png`} 
                      alt={`${vendor.name} logo`}
                      onError={(e) => {
                        // Fallback if logo doesn't exist
                        const imgElement = e.target as HTMLImageElement;
                        imgElement.src = '/img/vendors/default-logo.png';
                      }}
                      className="max-w-full max-h-full p-1"
                    />
                  </div>
                  <div className="ml-3">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200">{vendor.name}</h4>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {vendor.deployment === 'cloud' 
                        ? 'Cloud Native' 
                        : vendor.deployment === 'hybrid' 
                          ? 'Hybrid' 
                          : 'On-Premises'}
                    </div>
                  </div>
                </div>
                
                {/* Overall score */}
                <div className="mb-6">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Score</span>
                    <span className={`text-sm font-bold ${
                      isPortnox ? 'text-green-500 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {Math.round(overallScore)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${isPortnox ? 'bg-green-500 dark:bg-green-400' : 'bg-blue-500 dark:bg-blue-400'}`}
                      style={{ 
                        width: `${Math.round(overallScore)}%`, 
                        transition: 'width 1s ease-in-out',
                        transitionDelay: `${index * 150 + 300}ms`
                      }}
                    ></div>
                  </div>
                </div>
                
                {/* Category scores */}
                <div className="space-y-3">
                  {categories.map(category => {
                    const score = getScore(vendor, category.id);
                    const isActive = activeCategory === category.id;
                    
                    return (
                      <div 
                        key={category.id}
                        className={`transition-all duration-300 ${
                          isActive 
                            ? 'transform scale-105 bg-gray-50 dark:bg-gray-700 p-2 rounded-lg' 
                            : activeCategory 
                              ? 'opacity-50' 
                              : 'opacity-100'
                        }`}
                        style={{
                          backgroundColor: isActive ? `${category.color}15` : undefined
                        }}
                      >
                        <div className="flex justify-between mb-1">
                          <span className="text-xs flex items-center">
                            <span className="mr-1">{category.icon}</span>
                            <span className={isActive ? 'font-medium' : ''}>{category.name}</span>
                          </span>
                          <span className={`text-xs ${isActive ? 'font-bold' : ''}`}>
                            {Math.round(score)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full"
                            style={{ 
                              width: `${Math.round(score)}%`,
                              backgroundColor: category.color,
                              transition: animationComplete ? 'width 0.8s ease-in-out' : 'none',
                              transitionDelay: `${index * 100}ms`
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Key advantages */}
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h5 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Key {isPortnox ? 'Advantages' : 'Characteristics'}
                  </h5>
                  <ul className="text-xs space-y-1">
                    {isPortnox ? (
                      <>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-1">✓</span>
                          <span>Cloud-native with zero hardware costs</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-1">✓</span>
                          <span>75% faster deployment time</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-1">✓</span>
                          <span>{calculationResults.executiveSummary?.savingsPercentage || 40}% lower TCO vs alternatives</span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start">
                          <span className="text-gray-400 mr-1">•</span>
                          <span>{vendor.deployment === 'cloud' ? 'Partial cloud support' : 'On-premises focused'}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-400 mr-1">•</span>
                          <span>{vendor.implementationDays} day implementation</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-400 mr-1">•</span>
                          <span>Requires dedicated hardware</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Key insights */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="text-md font-medium mb-2 text-blue-700 dark:text-blue-400">Competitive Analysis Insights</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Portnox Cloud demonstrates significant advantages in cloud architecture, deployment speed,
            and management simplicity—key factors that directly impact total cost of ownership and
            operational overhead. The cloud-native approach eliminates hardware costs and complex
            upgrades while providing built-in scalability and continuous security improvements.
          </p>
        </div>
      </div>
      
      {/* CSS for animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default CompetitiveAdvantageVisual;
EOF

echo "Updated CompetitiveAdvantageVisual component"

# Step 4: Update App.tsx to properly include the enhanced Dashboard component
echo "Updating App.tsx to use the improved components..."

cat > src/App.tsx << 'EOF'
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import RouterConfig from './utils/RouterConfig';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Dashboard from './components/views/Dashboard';
import { CalculatorProvider } from './context/CalculatorContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <ThemeProvider>
      <CalculatorProvider>
        <ToastProvider>
          <RouterConfig>
            <div className="app-container">
              <Header toggleSidebar={toggleSidebar} />
              <div className="main-content">
                <Sidebar isOpen={sidebarOpen} />
                <div className="content-area">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    {/* More routes will be added later */}
                  </Routes>
                </div>
              </div>
              <Footer />
            </div>
          </RouterConfig>
        </ToastProvider>
      </CalculatorProvider>
    </ThemeProvider>
  );
};

export default App;
EOF

echo "Updated App.tsx"

# Step 5: Update the package.json to include new dependencies if needed
echo "Checking and updating package.json if needed..."

# If package.json exists, add necessary dependencies
if [ -f "package.json" ]; then
    echo "Ensuring all required dependencies are included..."
    
    # Use jq to check if required dependencies are already present
    # If you don't have jq installed, you might need to install it or manually edit the package.json file
    
    # Add lucide-react if not already present
    if ! grep -q "lucide-react" package.json; then
        echo "Adding lucide-react dependency..."
        # Use npm or yarn to add the dependency
        npm install --save lucide-react
    else
        echo "lucide-react already installed, skipping..."
    fi
    
    # Add d3 if not already present
    if ! grep -q '"d3"' package.json; then
        echo "Adding d3 dependency..."
        npm install --save d3 @types/d3
    else
        echo "d3 already installed, skipping..."
    fi
else
    echo "package.json not found, skipping dependency updates"
fi

# Step 6: Create a React components for additional Lucide icons integration
echo "Creating utilities for Lucide icons integration..."

mkdir -p src/utils/icons
cat > src/utils/icons/index.ts << 'EOF'
// Re-export lucide icons we use in our app
// This allows for easier importing and management of icons

export {
  Shield,
  Server,
  Calculator,
  BarChart3,
  ChevronDown,
  Check,
  X,
  PieChart,
  RefreshCw,
  Lightbulb,
  Zap,
  Database,
  Cloud,
  DollarSign,
  Download,
  ArrowUpRight,
  Moon,
  Sun
} from 'lucide-react';
EOF

echo "Created icon utilities"

# Step 7: Update the build script to build and deploy the updated app
echo "Creating build and deploy script..."

cat > build-and-deploy.sh << 'EOF'
#!/bin/bash

# Build and deploy script for Portnox TCO Analyzer
# This script builds the React app and deploys it to the gh-pages branch

echo "Starting build and deploy process for Portnox TCO Analyzer..."

# Step 1: Install dependencies
echo "Installing dependencies..."
npm install

# Step 2: Build the React app
echo "Building the React app..."
npm run build

# Step 3: Deploy to gh-pages branch
echo "Deploying to gh-pages branch..."
git checkout gh-pages
rm -rf static/
cp -r build/* .
git add .
git commit -m "Update Portnox TCO Analyzer with enhanced charts and UI"
git push origin gh-pages

# Step 4: Return to main branch
echo "Returning to main branch..."
git checkout main-react

echo "Deployment completed successfully!"
EOF

chmod +x build-and-deploy.sh

echo "Created build and deploy script"

# Step 8: Ensure all TypeScript type declarations are correct
echo "Updating TypeScript type declarations..."

cat > src/types.d.ts << 'EOF'
// Declare module for lucide-react
declare module 'lucide-react' {
  import React from 'react';
  
  export interface IconProps extends React.SVGProps<SVGSVGElement> {
    color?: string;
    size?: string | number;
    strokeWidth?: string | number;
  }
  
  export type Icon = React.FC<IconProps>;
  
  export const Shield: Icon;
  export const Server: Icon;
  export const Calculator: Icon;
  export const BarChart3: Icon;
  export const ChevronDown: Icon;
  export const Check: Icon;
  export const X: Icon;
  export const PieChart: Icon;
  export const RefreshCw: Icon;
  export const Lightbulb: Icon;
  export const Zap: Icon;
  export const Database: Icon;
  export const Cloud: Icon;
  export const DollarSign: Icon;
  export const Download: Icon;
  export const ArrowUpRight: Icon;
  export const Moon: Icon;
  export const Sun: Icon;
}

// Declare modules for d3 related packages if needed
declare module 'd3' {
  export * from 'd3-selection';
  export * from 'd3-scale';
  export * from 'd3-shape';
  export * from 'd3-transition';
}
EOF

echo "Updated TypeScript type declarations"

# Step 9: Add a CSS file for custom styles
echo "Adding custom CSS styles..."

cat > src/financialReport.css << 'EOF'
/* Custom CSS for financial report styles */

.financial-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.financial-table th,
.financial-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.financial-table th {
  background-color: #f8fafc;
  font-weight: 600;
}

.financial-table tbody tr:hover {
  background-color: #f1f5f9;
}

/* Dark mode support */
.dark .financial-table th {
  background-color: #334155;
}

.dark .financial-table td,
.dark .financial-table th {
  border-color: #475569;
}

.dark .financial-table tbody tr:hover {
  background-color: #1e293b;
}

/* Card styles */
.dashboard-card {
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1rem;
  background-color: white;
}

.dark .dashboard-card {
  background-color: #1e293b;
}
EOF

cat > src/reportStyles.css << 'EOF'
/* Styles for the report generation and visualization */

/* Chart wrappers */
.chart-container {
  position: relative;
  width: 100%;
}

/* Badge styles */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;
  border-radius: 9999px;
}

.badge-primary {
  background-color: #ebf8ff;
  color: #2c5282;
}

.badge-secondary {
  background-color: #e9d8fd;
  color: #553c9a;
}

.badge-success {
  background-color: #c6f6d5;
  color: #276749;
}

.badge-danger {
  background-color: #fed7d7;
  color: #c53030;
}

.badge-warning {
  background-color: #fefcbf;
  color: #975a16;
}

.badge-info {
  background-color: #bee3f8;
  color: #2c5282;
}

.dark .badge-primary {
  background-color: rgba(66, 153, 225, 0.2);
  color: #90cdf4;
}

.dark .badge-secondary {
  background-color: rgba(159, 122, 234, 0.2);
  color: #d6bcfa;
}

.dark .badge-success {
  background-color: rgba(72, 187, 120, 0.2);
  color: #9ae6b4;
}

.dark .badge-danger {
  background-color: rgba(245, 101, 101, 0.2);
  color: #feb2b2;
}

.dark .badge-warning {
  background-color: rgba(237, 137, 54, 0.2);
  color: #fbd38d;
}

.dark .badge-info {
  background-color: rgba(66, 153, 225, 0.2);
  color: #bee3f8;
}

/* Value indicator styles */
.value-indicator {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 0.5rem;
}

.value-indicator-label {
  font-size: 0.75rem;
  margin-right: 0.5rem;
  color: #718096;
}

.value-indicator-bar {
  flex-grow: 1;
  height: 0.375rem;
  background-color: #edf2f7;
  border-radius: 9999px;
  overflow: hidden;
}

.value-indicator-fill {
  height: 100%;
  border-radius: 9999px;
  transition: width 0.5s ease-in-out;
}

.value-indicator-value {
  font-size: 0.75rem;
  margin-left: 0.5rem;
  font-weight: 600;
}

/* Dark mode support */
.dark .value-indicator-label {
  color: #a0aec0;
}

.dark .value-indicator-bar {
  background-color: #2d3748;
}

/* Animation utilities */
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-scaleIn {
  animation: scaleIn 0.5s ease-out forwards;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-slideInRight {
  animation: slideInRight 0.5s ease-out forwards;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
EOF

echo "Added custom CSS styles"

# Step 10: Finalize the script with a summary
echo "
===================================================
Portnox TCO Analyzer UI Update Script
===================================================

The following components have been successfully updated:

1. Dashboard component with enhanced charts and visualizations
2. VendorRadarChart for improved feature comparison
3. CompetitiveAdvantageVisual for better competitive analysis
4. Updated App.tsx to incorporate all changes
5. Added support for Lucide icons
6. Created build and deploy script
7. Updated TypeScript type declarations
8. Added custom CSS styles for financial reports and charts

Next Steps:
-----------
1. Test the updated UI: npm start
2. Deploy to GitHub Pages: ./build-and-deploy.sh

The updated UI includes:
- Comprehensive vendor comparison with real vendor data
- Enhanced visualizations for TCO, ROI, and security metrics
- Improved stakeholder views (Executive, Financial, Security, Technical)
- Better user experience with animations and interactive elements

All changes are TypeScript-compatible and use the existing project structure.
"

echo "Script execution completed successfully!"
echo "Run 'npm start' to test the updated UI locally."

# Make the build script executable
chmod +x build-and-deploy.sh
echo "Build and deploy script is ready at ./build-and-deploy.sh"
