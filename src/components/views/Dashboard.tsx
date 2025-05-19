// @ts-nocheck
import React, { useEffect } from 'react';
import { useCalculator } from '../../context/CalculatorContext';
import { useCalculations } from '../../hooks/useCalculations';

const Dashboard: React.FC = () => {
  const { state } = useCalculator();
  const { runCalculations } = useCalculations();
  const { calculationResults, deviceCount, selectedVendors } = state;

  // Run calculations when inputs change
  useEffect(() => {
    if (deviceCount > 0 && selectedVendors.length > 0) {
      runCalculations();
    }
  }, [deviceCount, selectedVendors, runCalculations]);

  return (
    <div className="dashboard p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">TCO Dashboard</h1>
        <p className="text-gray-600">
          View your calculated Total Cost of Ownership and key metrics
        </p>
      </div>

      {calculationResults ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Simple inline cards instead of importing SummaryCard */}
          <div className="p-4 rounded-lg shadow-sm bg-blue-100">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">Total Devices</h3>
                <div className="text-2xl font-bold">{deviceCount}</div>
              </div>
              <div className="text-3xl">🖥️</div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg shadow-sm bg-green-100">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">Vendors Compared</h3>
                <div className="text-2xl font-bold">{selectedVendors.length}</div>
              </div>
              <div className="text-3xl">🏢</div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg shadow-sm bg-purple-100">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">Potential Savings</h3>
                <div className="text-2xl font-bold">
                  {calculationResults.potentialSavings 
                    ? `$${Math.round(calculationResults.potentialSavings).toLocaleString()}`
                    : 'N/A'}
                </div>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </div>
        </div>
      ) : (
        /* Simple inline calculation status */
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <div className={`w-4 h-4 rounded-full mr-2 ${deviceCount > 0 && selectedVendors.length > 0 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <h3 className="text-lg font-semibold">
              {deviceCount > 0 && selectedVendors.length > 0 ? 'Ready to Calculate' : 'Missing Information'}
            </h3>
          </div>
          
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={() => runCalculations()}
            disabled={!(deviceCount > 0 && selectedVendors.length > 0)}
          >
            Run Calculations
          </button>
        </div>
      )}

      <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
        <p>
          This dashboard provides an overview of your TCO calculation results. 
          Use the navigation menu to explore detailed reports including financial analysis, 
          security impact, and vendor comparisons.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
