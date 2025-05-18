import React, { useState, useEffect, useRef } from 'react';
import { useCalculator } from '../../context/CalculatorContext';
import { complianceFrameworks, ComplianceFramework } from '../../api/vendorData';
import { VendorResult, CalculationResults } from '../../utils/calculationEngine';
import { formatPercentage } from '../../utils/formatters';

interface ComplianceFlowVisualProps {
  height?: number;
}

const ComplianceFlowVisual: React.FC<ComplianceFlowVisualProps> = ({ height = 500 }) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!calculationResults || !calculationResults.vendorResults) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center" style={{ height }}>
        <div className="text-5xl mb-4">📋</div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Compliance Analysis</h3>
        <p className="text-gray-600 dark:text-gray-400">
          No data available. Please calculate results first.
        </p>
      </div>
    );
  }
  
  // Get Portnox and other vendors
  const portnox = calculationResults.vendorResults.find((v: VendorResult) => v.vendorId === 'portnox');
  if (!portnox) return null;
  
  const competitors = calculationResults.vendorResults
    .filter((v: VendorResult) => v.vendorId !== 'portnox')
    .sort((a: VendorResult, b: VendorResult) => (b.complianceScores?.overall || 0) - (a.complianceScores?.overall || 0))
    .slice(0, 2);
  
  // All vendors for comparison
  const allVendors = [portnox, ...competitors];
  
  // Framework colors with gradient variants
  const frameworkColors: Record<string, {primary: string, light: string, dark: string}> = {
    pci: {
      primary: '#EC4899',
      light: '#FBCFE8',
      dark: '#BE185D'
    },
    hipaa: {
      primary: '#8B5CF6',
      light: '#DDD6FE',
      dark: '#5B21B6'
    },
    nist: {
      primary: '#3B82F6',
      light: '#BFDBFE',
      dark: '#1D4ED8'
    },
    gdpr: {
      primary: '#10B981',
      light: '#A7F3D0',
      dark: '#065F46'
    },
    iso: {
      primary: '#F59E0B',
      light: '#FDE68A',
      dark: '#B45309'
    },
    cmmc: {
      primary: '#EF4444',
      light: '#FCA5A5',
      dark: '#B91C1C'
    },
    ferpa: {
      primary: '#6366F1',
      light: '#C7D2FE',
      dark: '#4338CA'
    },
    sox: {
      primary: '#14B8A6',
      light: '#99F6E4',
      dark: '#0F766E'
    }
  };
  
  // Framework icons
  const frameworkIcons: Record<string, string> = {
    pci: '💳',
    hipaa: '🏥',
    nist: '🔐',
    gdpr: '🇪🇺',
    iso: '🌐',
    cmmc: '🛡️',
    ferpa: '🎓',
    sox: '📊'
  };
  
  // Helper function to get compliance score
  const getComplianceScore = (vendor: VendorResult, frameworkId: string): number => {
    if (!vendor.complianceScores) return 0;
    return vendor.complianceScores[frameworkId] || 0;
  };
  
  // Sort frameworks by relevance
  const sortedFrameworks = Object.entries(complianceFrameworks)
    .sort(([, a], [, b]) => b.nacRelevance - a.nacRelevance);
  
  // CSS for animations
  const fadeInAnimation = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out forwards;
    }
  `;
  
  return (
    <div 
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
      style={{ height: 'auto', minHeight: height, overflow: 'hidden' }}
      ref={containerRef}
    >
      {/* Add styles for animations */}
      <style>
        {fadeInAnimation}
      </style>
    
      <h3 className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">
        <span className="mr-2">📋</span>
        Compliance Framework Coverage
      </h3>
      
      {/* Frameworks navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {sortedFrameworks.map(([id, framework]) => (
          <button
            key={id}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
              selectedFramework === id
                ? 'text-white shadow-md scale-110'
                : 'text-gray-700 dark:text-gray-300 hover:bg-opacity-30 bg-opacity-15'
            }`}
            style={{
              backgroundColor: selectedFramework === id 
                ? frameworkColors[id]?.primary 
                : frameworkColors[id]?.light,
              color: selectedFramework === id 
                ? 'white' 
                : frameworkColors[id]?.dark
            }}
            onClick={() => setSelectedFramework(selectedFramework === id ? null : id)}
          >
            <span className="mr-1">{frameworkIcons[id] || '📝'}</span> {framework.name}
          </button>
        ))}
      </div>
      
      {/* Selected framework details */}
      {selectedFramework && (
        <div className="mb-6 p-4 rounded-lg transition-all duration-500 animate-fadeIn"
          style={{ 
            backgroundColor: `${frameworkColors[selectedFramework]?.light}40`,
            borderLeft: `4px solid ${frameworkColors[selectedFramework]?.primary}`
          }}
        >
          <h4 className="text-md font-medium mb-1"
            style={{ color: frameworkColors[selectedFramework]?.dark }}
          >
            {complianceFrameworks[selectedFramework].fullName}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {complianceFrameworks[selectedFramework].description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <h5 className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Key Requirements</h5>
              <ul className="text-xs text-gray-600 dark:text-gray-400 list-disc pl-5 space-y-1">
                {complianceFrameworks[selectedFramework].requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Control Areas</h5>
              <ul className="text-xs text-gray-600 dark:text-gray-400 list-disc pl-5 space-y-1">
                {complianceFrameworks[selectedFramework].controlAreas.slice(0, 4).map((area, idx) => (
                  <li key={idx}>{area}</li>
                ))}
                {complianceFrameworks[selectedFramework].controlAreas.length > 4 && (
                  <li>+ {complianceFrameworks[selectedFramework].controlAreas.length - 4} more</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {/* Interactive compliance visualization */}
      <div className="relative mb-6 overflow-hidden p-1">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded"></div>
        
        {/* Main flow visualization */}
        <div className="flex flex-col space-y-6 mt-6">
          {sortedFrameworks.map(([id, framework], index) => {
            const isActive = selectedFramework === id;
            const frameworkColor = frameworkColors[id] || {primary: '#4B5563', light: '#E5E7EB', dark: '#374151'};
            
            return (
              <div key={id} className={`transition-all duration-500 ${
                isActive ? 'scale-105' : (selectedFramework && !isActive) ? 'opacity-50' : 'opacity-100'
              }`}>
                <div className="flex items-center mb-1">
                  <span className="text-lg mr-2">{frameworkIcons[id] || '📝'}</span>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">{framework.name}</h4>
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">({framework.nacRelevance}/10 relevance)</span>
                </div>
                
                {/* Flow chart for each framework */}
                <div className="flex items-center">
                  <div className="w-24 flex-shrink-0">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br shadow-md flex items-center justify-center"
                      style={{ 
                        backgroundImage: `linear-gradient(135deg, ${frameworkColor.primary}, ${frameworkColor.dark})`,
                        transform: `scale(${animationComplete ? 1 : 0.5})`,
                        transition: 'transform 0.5s ease-out',
                        transitionDelay: `${index * 100}ms`
                      }}
                    >
                      <span className="text-white text-2xl">{frameworkIcons[id] || '📝'}</span>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    {/* Flow lines */}
                    <div className="relative h-20">
                      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 transform -translate-y-1/2"></div>
                      
                      {/* Animated vendor markers */}
                      {allVendors.map((vendor, vIndex) => {
                        const score = getComplianceScore(vendor, id);
                        const position = `${Math.min(98, Math.max(1, score))}%`;
                        const isPortnox = vendor.vendorId === 'portnox';
                        
                        return (
                          <div 
                            key={vendor.vendorId}
                            className={`absolute h-10 flex flex-col items-center justify-center transition-all transform ${
                              animationComplete ? 'opacity-100' : 'opacity-0'
                            }`}
                            style={{ 
                              left: animationComplete ? position : '0%',
                              top: '50%',
                              transform: 'translate(-50%, -50%)',
                              transitionProperty: 'left, opacity',
                              transitionDuration: '1s',
                              transitionDelay: `${(index * 0.1) + (vIndex * 0.2)}s`,
                              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                              zIndex: isPortnox ? 10 : 5
                            }}
                          >
                            {/* Vendor marker */}
                            <div 
                              className={`h-8 w-8 rounded-full flex items-center justify-center mb-1 ${
                                isPortnox 
                                  ? 'bg-portnox-primary text-white border-2 border-white dark:border-gray-800 shadow-lg'
                                  : 'bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600'
                              }`}
                            >
                              <div className="h-6 w-6 rounded-full overflow-hidden flex items-center justify-center bg-white">
                                <img 
                                  src={`/img/vendors/${vendor.vendorId}-logo.png`} 
                                  alt={vendor.name}
                                  className="max-h-full max-w-full object-contain"
                                  onError={(e) => {
                                    const imgElement = e.target as HTMLImageElement;
                                    imgElement.src = '/img/vendors/default-logo.png';
                                  }}
                                />
                              </div>
                            </div>
                            
                            {/* Score label */}
                            <div className={`text-xs font-bold whitespace-nowrap ${
                              isPortnox ? 'text-portnox-primary' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {score}%
                            </div>
                          </div>
                        );
                      })}
                      
                      {/* Score markers */}
                      {[0, 25, 50, 75, 100].map(mark => (
                        <div 
                          key={`mark-${mark}`} 
                          className="absolute h-3 w-0.5 bg-gray-300 dark:bg-gray-600"
                          style={{ 
                            left: `${mark}%`,
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 dark:text-gray-500">
                            {mark}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Optional: Framework requirements met */}
                {isActive && (
                  <div className="ml-24 mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400 animate-fadeIn">
                    {framework.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-start">
                        <span className="text-green-500 mr-1 mt-0.5">✓</span>
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center mb-4 space-x-4">
        {allVendors.map(vendor => (
          <div key={vendor.vendorId} className="flex items-center">
            <div className={`h-3 w-3 rounded-full mr-1 ${
              vendor.vendorId === 'portnox' ? 'bg-portnox-primary' : 'bg-gray-400 dark:bg-gray-500'
            }`}></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">{vendor.name}</span>
          </div>
        ))}
      </div>
      
      {/* Key insights */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 className="text-md font-medium mb-2 text-blue-700 dark:text-blue-400">Compliance Insights</h4>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Portnox Cloud provides strong compliance coverage across all major frameworks, with particular 
          strengths in {sortedFrameworks.slice(0, 3).map(([id]) => complianceFrameworks[id].name).join(', ')}.
          The cloud-native architecture enables continuous compliance monitoring and automated reporting,
          reducing the manual effort required for audits by up to 65%.
        </p>
      </div>
    </div>
  );
};

export default ComplianceFlowVisual;
