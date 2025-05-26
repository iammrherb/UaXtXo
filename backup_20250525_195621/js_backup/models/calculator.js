/**
 * TCO Calculator for Portnox Total Cost Analyzer
 * Handles all cost and ROI calculations for NAC vendors
 */

class TcoCalculator {
  constructor(config = {}) {
    // Default configuration
    this.config = {
      deviceCount: 500,
      locationCount: 2,
      years: 3,
      organizationSize: 'small', // very-small, small, medium, large, enterprise
      industry: '',
      complianceRequirements: [],
      riskProfile: 'standard', // standard, elevated, high, regulated
      cybersecurityInsurance: 'standard', // none, basic, standard, comprehensive
      networkRequirements: {
        cloudIntegration: false,
        legacyDevices: false,
        byodSupport: true,
        iotSupport: false,
        wirelessSupport: true,
        remoteWork: true
      },
      costParameters: {
        portnoxBasePrice: 3.0, // $ per device per month
        portnoxDiscount: 15,   // % volume discount
        fteCost: 100000,       // $ per year for full-time employee
        fteAllocation: 25,     // % of FTE dedicated to NAC
        maintenancePercentage: 18, // % of license cost for maintenance
        downtimeCost: 5000,    // $ per hour
        riskReduction: 35,     // % reduction in breach risks
        insuranceReduction: 10 // % reduction in insurance premiums
      },
      ...config
    };
    
    // Store results
    this.results = {
      vendors: {},
      comparison: {},
      riskAssessment: {},
      roi: {}
    };
  }
  
  // Update configuration
  updateConfig(newConfig) {
    this.config = {
      ...this.config,
      ...newConfig
    };
    
    return this;
  }
  
  // Calculate TCO for a vendor
  calculateVendorTco(vendor) {
    if (!vendor) return null;
    
    const { deviceCount, years, organizationSize, costParameters } = this.config;
    const { fteCost, fteAllocation, downtimeCost } = costParameters;
    
    let result = {
      vendorId: vendor.id,
      vendorName: vendor.name,
      architecture: vendor.architecture,
      initialCosts: 0,
      annualCosts: 0,
      totalTco: 0,
      implementation: {
        time: vendor.implementation.timeInDays,
        cost: 0
      },
      breakdown: {
        hardware: 0,
        software: 0,
        implementation: 0,
        maintenance: 0,
        personnel: 0,
        downtime: 0,
        operational: 0,
        subscription: 0
      },
      yearlyBreakdown: []
    };
    
    // Calculate costs based on architecture type
    if (vendor.architecture === 'cloud') {
      // Cloud-based solution (subscription)
      let basePrice = vendor.basePrice[organizationSize];
      
      // Apply discount for Portnox
      if (vendor.id === 'portnox' && costParameters.portnoxDiscount) {
        basePrice = basePrice * (1 - (costParameters.portnoxDiscount / 100));
      }
      
      // Annual subscription
      const annualSubscription = basePrice * deviceCount * 12;
      result.breakdown.subscription = annualSubscription * years;
      
      // Implementation
      result.implementation.cost = annualSubscription * (vendor.implementation.costPercentage / 100);
      result.breakdown.implementation = result.implementation.cost;
      
      // Personnel costs (FTE allocation)
      const annualPersonnelCost = fteCost * (vendor.fte.required * (fteAllocation / 100));
      result.breakdown.personnel = annualPersonnelCost * years;
      
      // Downtime costs
      const annualDowntimeCost = vendor.maintenance.downtime * downtimeCost;
      result.breakdown.downtime = annualDowntimeCost * years;
      
      // Calculate operational costs (extra tools, training, etc.)
      const annualOperationalCost = annualSubscription * 0.05; // Estimated at 5% of subscription
      result.breakdown.operational = annualOperationalCost * years;
      
      // Calculate initial and annual costs
      result.initialCosts = result.breakdown.implementation;
      result.annualCosts = annualSubscription + annualPersonnelCost + annualDowntimeCost + annualOperationalCost;
      
    } else if (vendor.architecture === 'on-premises' || vendor.architecture === 'hybrid') {
      // On-premises or hybrid solution
      
      // Hardware costs
      if (vendor.hardware) {
        result.breakdown.hardware = vendor.hardware[organizationSize];
      }
      
      // Software license costs
      const licenseCost = vendor.basePrice[organizationSize] * deviceCount;
      result.breakdown.software = licenseCost;
      
      // Implementation
      result.implementation.cost = licenseCost * (vendor.implementation.costPercentage / 100);
      result.breakdown.implementation = result.implementation.cost;
      
      // Maintenance
      const annualMaintenance = licenseCost * (vendor.maintenance.percentage / 100);
      result.breakdown.maintenance = annualMaintenance * years;
      
      // Personnel costs (FTE allocation)
      const annualPersonnelCost = fteCost * (vendor.fte.required * (fteAllocation / 100));
      result.breakdown.personnel = annualPersonnelCost * years;
      
      // Downtime costs
      const annualDowntimeCost = vendor.maintenance.downtime * downtimeCost;
      result.breakdown.downtime = annualDowntimeCost * years;
      
      // Calculate operational costs (power, cooling, rack space, etc.)
      const annualOperationalCost = result.breakdown.hardware * 0.10 / years; // Estimated at 10% of hardware cost per year
      result.breakdown.operational = annualOperationalCost * years;
      
      // Calculate initial and annual costs
      result.initialCosts = result.breakdown.hardware + result.breakdown.software + result.breakdown.implementation;
      result.annualCosts = annualMaintenance + annualPersonnelCost + annualDowntimeCost + annualOperationalCost;
    }
    
    // Calculate total TCO
    result.totalTco = result.initialCosts + (result.annualCosts * years);
    
    // Create yearly breakdown
    for (let i = 1; i <= years; i++) {
      let yearCost = (i === 1) ? result.initialCosts + result.annualCosts : result.annualCosts;
      result.yearlyBreakdown.push({
        year: i,
        cost: yearCost,
        cumulativeCost: result.initialCosts + (result.annualCosts * i)
      });
    }
    
    return result;
  }
  
  // Main calculation method
  calculate(selectedVendors) {
    if (!selectedVendors || !Array.isArray(selectedVendors) || selectedVendors.length === 0) {
      throw new Error('No vendors selected for calculation');
    }
    
    this.results.vendors = {};
    
    // Calculate TCO for each vendor
    for (const vendorId of selectedVendors) {
      const vendor = VENDORS[vendorId];
      if (vendor) {
        const tco = this.calculateVendorTco(vendor);
        this.results.vendors[vendorId] = tco;
      }
    }
    
    return this.results;
  }
}

// Export calculator for use across the application
window.TcoCalculator = TcoCalculator;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TcoCalculator };
}
