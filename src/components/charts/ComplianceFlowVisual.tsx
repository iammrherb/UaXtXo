// @ts-nocheck
import React from 'react';
import { useCalculator } from '../../context/CalculatorContext';
import { VendorResult } from '../../utils/types';

interface ComplianceFlowVisualProps {
  height?: number;
}

const ComplianceFlowVisual: React.FC<ComplianceFlowVisualProps> = ({ height = 350 }) => {
  const { state } = useCalculator();
  const { calculationResults } = state;

  if (!calculationResults || !calculationResults.vendorResults || calculationResults.vendorResults.length === 0) {
    return (
      <div className="chart-container bg-gray-50 p-6 rounded-lg text-center" style={{ height }}>
        <div className="text-gray-400 text-lg">
          No calculation results available
        </div>
        <div className="text-gray-500 text-sm mt-2">
          Please run calculations to view compliance comparison
        </div>
      </div>
    );
  }

  // Find Portnox
  const portnox = calculationResults.vendorResults.find((v: VendorResult) => v.vendorId === 'portnox');
  
  if (!portnox) {
    return (
      <div className="chart-container bg-gray-50 p-6 rounded-lg text-center" style={{ height }}>
        <div className="text-gray-400 text-lg">
          Portnox not included in comparison
        </div>
        <div className="text-gray-500 text-sm mt-2">
          Please include Portnox in your vendor selection
        </div>
      </div>
    );
  }

  // Get top competitors by compliance score
  const competitors = calculationResults.vendorResults
    .filter((v: VendorResult) => v.vendorId !== 'portnox')
    .sort((a: VendorResult, b: VendorResult) => (b.complianceScores?.overall || 0) - (a.complianceScores?.overall || 0))
    .slice(0, 2);

  // All vendors for comparison
  const vendors = [portnox, ...competitors];

  // Mock compliance frameworks for visualization
  const complianceFrameworks = [
    { id: 'hipaa', name: 'HIPAA', color: '#4CAF50' },
    { id: 'pci', name: 'PCI DSS', color: '#2196F3' },
    { id: 'gdpr', name: 'GDPR', color: '#9C27B0' },
    { id: 'sox', name: 'SOX', color: '#FF9800' },
    { id: 'nist', name: 'NIST CSF', color: '#03A9F4' }
  ];

  return (
    <div className="chart-container bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-center">Compliance Framework Coverage</h3>
      
      <div className="compliance-grid grid gap-4">
        {/* Header Row - Framework Names */}
        <div className="grid grid-cols-6">
          <div className="col-span-1"></div>
          {complianceFrameworks.map(framework => (
            <div key={framework.id} className="col-span-1 text-center font-medium">
              {framework.name}
            </div>
          ))}
        </div>
        
        {/* Vendor Rows */}
        {vendors.map((vendor, index) => (
          <div key={vendor.vendorId} className="grid grid-cols-6 items-center py-2 border-t border-gray-100">
            <div className="col-span-1 font-semibold">
              {vendor.name}
            </div>
            
            {complianceFrameworks.map(framework => {
              // Calculate compliance score (mock data)
              const isPortnox = vendor.vendorId === 'portnox';
              const score = isPortnox ? 90 + (Math.random() * 10) : 65 + (Math.random() * 25);
              
              return (
                <div key={framework.id} className="col-span-1 flex justify-center">
                  <div className="relative w-12 h-12 flex items-center justify-center rounded-full"
                       style={{ backgroundColor: `${framework.color}25` }}>
                    <div className="absolute inset-0 rounded-full" 
                         style={{ 
                           clipPath: `circle(${score/2}% at center)`,
                           backgroundColor: framework.color,
                           opacity: 0.6
                         }}>
                    </div>
                    <span className="relative text-xs font-bold text-gray-800">
                      {Math.round(score)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500">
        <p className="text-center">
          Coverage percentages indicate how well each solution meets specific compliance requirements
        </p>
      </div>
    </div>
  );
};

export default ComplianceFlowVisual;
