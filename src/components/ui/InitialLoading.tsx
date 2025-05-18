import React from 'react';

const InitialLoading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 z-50">
      <div className="text-center">
        <div className="animate-spin mb-4 h-12 w-12 border-4 border-t-portnox-primary border-r-transparent border-b-portnox-primary border-l-transparent rounded-full mx-auto"></div>
        <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">Loading Portnox TCO Analyzer</h2>
        <p className="text-gray-600 dark:text-gray-400">Please wait while we initialize the application...</p>
      </div>
    </div>
  );
};

export default InitialLoading;
