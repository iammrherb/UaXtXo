/**
 * Feature Comparison Processor
 * Processes vendor feature comparison data
 */
class FeatureComparisonProcessor {
  constructor() {
    // Initialize with data from global objects
    this.vendorData = window.VendorComparisonData || {};
    
    // Store processed data
    this.processedData = {
      featureRatings: {},
      benefits: {},
      descriptions: {}
    };
    
    // Initialize
    this.processVendorData();
    
    console.log("Feature Comparison Processor initialized");
  }
  
  /**
   * Process vendor feature data
   */
  processVendorData() {
    // Process feature ratings
    if (this.vendorData.featureRatings) {
      this.processedData.featureRatings = this.vendorData.featureRatings;
    }
    
    // Process vendor benefits
    if (this.vendorData.benefits) {
      this.processedData.benefits = this.vendorData.benefits;
    }
    
    // Process vendor descriptions
    if (this.vendorData.descriptions) {
      this.processedData.descriptions = this.vendorData.descriptions;
    }
    
    console.log("Vendor feature data processed");
  }
  
  /**
   * Get feature comparison data between vendors
   * @param {string} currentVendor - Current vendor identifier
   * @param {string} alternativeVendor - Alternative vendor identifier (default: 'portnox')
   * @returns {Object} - Feature comparison data
   */
  getFeatureComparison(currentVendor, alternativeVendor = 'portnox') {
    const currentRatings = this.processedData.featureRatings[currentVendor] || {};
    const alternativeRatings = this.processedData.featureRatings[alternativeVendor] || {};
    
    // Get all feature categories
    const allFeatures = new Set([
      ...Object.keys(currentRatings),
      ...Object.keys(alternativeRatings)
    ]);
    
    // Create comparison data
    const comparisonData = {
      labels: [],
      current: [],
      alternative: [],
      differences: []
    };
    
    // Format feature labels for display
    const formatFeatureLabel = (feature) => {
      return feature
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
    };
    
    // Process each feature
    Array.from(allFeatures).forEach(feature => {
      const currentValue = currentRatings[feature] || 0;
      const alternativeValue = alternativeRatings[feature] || 0;
      const difference = alternativeValue - currentValue;
      
      comparisonData.labels.push(formatFeatureLabel(feature));
      comparisonData.current.push(currentValue);
      comparisonData.alternative.push(alternativeValue);
      comparisonData.differences.push(difference);
    });
    
    // Get vendor benefits
    const currentBenefits = this.processedData.benefits[currentVendor] || [];
    const alternativeBenefits = this.processedData.benefits[alternativeVendor] || [];
    
    // Get vendor descriptions
    const currentDescription = this.processedData.descriptions[currentVendor] || '';
    const alternativeDescription = this.processedData.descriptions[alternativeVendor] || '';
    
    return {
      featureComparison: comparisonData,
      vendorBenefits: {
        current: currentBenefits,
        alternative: alternativeBenefits
      },
      vendorDescriptions: {
        current: currentDescription,
        alternative: alternativeDescription
      }
    };
  }
}

// Initialize processor when document is ready
document.addEventListener('DOMContentLoaded', function() {
  window.featureComparisonProcessor = new FeatureComparisonProcessor();
});
