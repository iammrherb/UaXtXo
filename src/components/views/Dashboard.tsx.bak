import React, { useState } from 'react';
import { useCalculator } from '../../context/CalculatorContext';
import { useCalculations } from '../../hooks/useCalculations';
import { useToast } from '../../context/ToastContext';
import LoadingOverlay from '../ui/LoadingOverlay';
import ExecutiveView from './executive/ExecutiveView';
import FinancialView from './financial/FinancialView';
import SecurityView from './security/SecurityView';
import TechnicalView from './technical/TechnicalView';

const Dashboard: React.FC = () => {
  const { state, dispatch } = useCalculator();
  const { performCalculation, isCalculated } = useCalculations();
  const { addToast } = useToast();
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Handle view switching
  const handleViewChange = (view: string) => {
    dispatch({ type: 'SET_VIEW', payload: view });
  };
  
  // Handle calculate button click
  const handleCalculate = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      try {
        const results = performCalculation();
        setIsCalculating(false);
        
        if (results) {
          addToast('Calculation completed successfully!', 'success');
        }
      } catch (error) {
        setIsCalculating(false);
        addToast('Error during calculation. Please try again.', 'error');
        console.error('Calculation error:', error);
      }
    }, 1000);
  };
  
  // Render the active view based on current state
  const renderActiveView = () => {
    switch (state.currentView) {
      case 'financial':
        return <FinancialView />;
      case 'security':
        return <SecurityView />;
      case 'technical':
        return <TechnicalView />;
      case 'executive':
      default:
        return <ExecutiveView />;
    }
  };
  
  return (
    <div className="dashboard p-4">
      {/* Stakeholder Tabs */}
      <div className="stakeholder-tabs mb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex overflow-x-auto space-x-1">
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
              state.currentView === 'executive'
                ? 'border-portnox-primary text-portnox-primary dark:border-portnox-primary dark:text-portnox-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => handleViewChange('executive')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
            Executive
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
              state.currentView === 'financial'
                ? 'border-portnox-primary text-portnox-primary dark:border-portnox-primary dark:text-portnox-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => handleViewChange('financial')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
            Financial
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
              state.currentView === 'security'
                ? 'border-portnox-primary text-portnox-primary dark:border-portnox-primary dark:text-portnox-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => handleViewChange('security')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Security
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
              state.currentView === 'technical'
                ? 'border-portnox-primary text-portnox-primary dark:border-portnox-primary dark:text-portnox-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => handleViewChange('technical')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Technical
          </button>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="action-buttons mb-6 flex justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {state.currentView === 'executive' && 'Executive Dashboard'}
          {state.currentView === 'financial' && 'Financial Analysis'}
          {state.currentView === 'security' && 'Security Assessment'}
          {state.currentView === 'technical' && 'Technical Evaluation'}
        </h1>
        
        <div className="flex space-x-2">
          <button
            className="btn btn-primary flex items-center"
            onClick={handleCalculate}
            disabled={isCalculating}
          >
            {isCalculating ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Calculating...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v6a1 1 0 102 0V8z" clipRule="evenodd" />
                </svg>
                Calculate
              </>
            )}
          </button>
          
          <button className="btn btn-outline flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
            Export
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="main-dashboard-content">
        {isCalculated ? (
          renderActiveView()
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              No calculation data available
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Configure your options in the sidebar and click the Calculate button to generate the TCO analysis.
            </p>
            <button 
              className="btn btn-primary"
              onClick={handleCalculate}
            >
              Calculate Now
            </button>
          </div>
        )}
      </div>
      
      {/* Loading Overlay */}
      <LoadingOverlay isLoading={isCalculating} />
    </div>
  );
};

export default Dashboard;
