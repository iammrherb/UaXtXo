/**
 * Immediate TcoCalculator initialization
 * Ensures TcoCalculator is available globally
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing TcoCalculator...');
  
  // Create instance if TcoCalculator is available
  if (typeof TcoCalculator !== 'undefined') {
    window.calculator = new TcoCalculator();
    console.log('TcoCalculator initialized successfully');
  } else {
    console.error('TcoCalculator class not found');
    
    // Define a fallback TcoCalculator class
    window.TcoCalculator = class TcoCalculator {
      constructor(config = {}) {
        this.config = config;
        this.results = {
          vendors: {},
          roi: {},
          security: {}
        };
        console.warn('Using fallback TcoCalculator');
      }
      
      updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        return this;
      }
      
      calculateVendorTco(vendorId) {
        // Return dummy data based on vendor
        return this.getDummyVendorData(vendorId);
      }
      
      calculate(selectedVendors) {
        console.log('Calculating with fallback TcoCalculator for', selectedVendors);
        
        // Calculate each vendor
        selectedVendors.forEach(vendorId => {
          this.results.vendors[vendorId] = this.getDummyVendorData(vendorId);
          this.results.roi[vendorId] = this.getDummyRoiData(vendorId);
          this.results.security[vendorId] = this.getDummySecurityData(vendorId);
        });
        
        return this.results;
      }
      
      getDummyVendorData(vendorId) {
        const isPortnox = vendorId === 'portnox';
        const isCisco = vendorId === 'cisco';
        
        return {
          vendorId: vendorId,
          vendorName: vendorId.charAt(0).toUpperCase() + vendorId.slice(1),
          architecture: isPortnox ? 'cloud' : 'on-premises',
          totalTco: isPortnox ? 245000 : (isCisco ? 520000 : 430000),
          initialCosts: isPortnox ? 30000 : 150000,
          annualCosts: isPortnox ? 71666 : 123333,
          implementation: {
            time: isPortnox ? 21 : (isCisco ? 90 : 60),
            cost: isPortnox ? 15000 : 75000
          },
          breakdown: {
            hardware: isPortnox ? 0 : 100000,
            software: isPortnox ? 0 : 80000,
            implementation: isPortnox ? 15000 : 75000,
            maintenance: isPortnox ? 10000 : 50000,
            personnel: isPortnox ? 25000 : 75000,
            downtime: isPortnox ? 5000 : 20000,
            operational: isPortnox ? 10000 : 40000,
            subscription: isPortnox ? 180000 : 80000
          },
          yearlyBreakdown: [
            { year: 1, cost: isPortnox ? 81666 : 173333, cumulativeCost: isPortnox ? 81666 : 173333 },
            { year: 2, cost: isPortnox ? 81666 : 173333, cumulativeCost: isPortnox ? 163332 : 346666 },
            { year: 3, cost: isPortnox ? 81666 : 173333, cumulativeCost: isPortnox ? 245000 : 520000 }
          ]
        };
      }
      
      getDummyRoiData(vendorId) {
        const isPortnox = vendorId === 'portnox';
        
        return {
          costSavings: isPortnox ? 150000 : 50000,
          riskReductionBenefit: isPortnox ? 300000 : 200000,
          productivityBenefit: isPortnox ? 180000 : 120000,
          complianceSavings: isPortnox ? 120000 : 80000,
          insuranceSavings: isPortnox ? 50000 : 30000,
          totalBenefit: isPortnox ? 800000 : 480000,
          roiPercentage: isPortnox ? 226.5 : -7.7,
          paybackPeriod: isPortnox ? 7 : 25,
          npv: isPortnox ? 555000 : -40000
        };
      }
      
      getDummySecurityData(vendorId) {
        const isPortnox = vendorId === 'portnox';
        
        return {
          improvements: {
            overall: isPortnox ? 85 : 75,
            unauthorized: isPortnox ? 95 : 85,
            lateral: isPortnox ? 90 : 80,
            deviceVisibility: isPortnox ? 92 : 82
          },
          securityScores: {
            zeroTrust: isPortnox ? 92 : 85,
            deviceAuth: isPortnox ? 95 : 88,
            riskAssessment: isPortnox ? 90 : 85,
            remediationSpeed: isPortnox ? 5 : 15
          },
          compliance: {
            coverage: isPortnox ? 95 : 90,
            frameworks: 7,
            automationLevel: isPortnox ? 85 : 65,
            auditTimeReduction: isPortnox ? 65 : 40
          },
          threatReduction: {
            unauthorizedAccess: isPortnox ? 95 : 80,
            lateralMovement: isPortnox ? 90 : 70,
            shadowIt: isPortnox ? 95 : 75
          },
          breachCostReduction: isPortnox ? 1200000 : 800000,
          insuranceReduction: isPortnox ? 25 : 15
        };
      }
    };
    
    // Create instance
    window.calculator = new TcoCalculator();
    console.log('Fallback TcoCalculator initialized');
  }
});
