import React from 'react';
import { useCalculator } from '../../context/CalculatorContext';

const CalculationStatus: React.FC = () => {
  const { state } = useCalculator();
  const { deviceCount, selectedVendors } = state;

  const isReadyToCalculate = deviceCount > 0 && selectedVendors.length > 0;

  return (
    <div className="calculation-status bg-gray-50 p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-4">
        <div className={`status-indicator w-4 h-4 rounded-full mr-2 ${isReadyToCalculate ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
        <h3 className="text-lg font-semibold">
          {isReadyToCalculate ? 'Ready to Calculate' : 'Missing Information'}
        </h3>
      </div>

      <div className="status-details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="status-item">
            <div className="text-sm text-gray-600">Device Count</div>
            <div className={`font-medium ${deviceCount > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {deviceCount > 0 ? `${deviceCount} devices` : 'Not specified'}
            </div>
          </div>

          <div className="status-item">
            <div className="text-sm text-gray-600">Vendors Selected</div>
            <div className={`font-medium ${selectedVendors.length > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {selectedVendors.length > 0 ? `${selectedVendors.length} vendors` : 'None selected'}
            </div>
          </div>
        </div>

        {!isReadyToCalculate && (
          <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-md text-sm">
            <p>To run calculations, please complete the missing information.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculationStatus;
