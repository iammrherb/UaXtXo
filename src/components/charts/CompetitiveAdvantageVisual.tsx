// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { useCalculator } from '../../context/CalculatorContext';
import { VendorResult } from '../../utils/calculationEngine';
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
                    ? 'border-portnox-primary' 
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
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-portnox-primary text-white py-1 px-4 rounded-full text-xs font-bold shadow-md">
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
                      isPortnox ? 'text-portnox-primary' : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {Math.round(overallScore)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${isPortnox ? 'bg-portnox-primary' : 'bg-portnox-secondary'}`}
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
                          <span>{calculationResults.executiveSummary.savingsPercentage}% lower TCO vs alternatives</span>
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
