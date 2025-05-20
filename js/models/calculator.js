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
    
    // If networkRequirements is provided, merge it specially
    if (newConfig.networkRequirements) {
      this.config.networkRequirements = {
        ...this.config.networkRequirements,
        ...newConfig.networkRequirements
      };
    }
    
    // If costParameters is provided, merge it specially
    if (newConfig.costParameters) {
      this.config.costParameters = {
        ...this.config.costParameters,
        ...newConfig.costParameters
      };
    }
    
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
      
    } else if (vendor.architecture === 'none') {
      // No NAC solution (baseline)
      
      // Personnel costs for basic network security
      const annualPersonnelCost = fteCost * (vendor.fte.required * (fteAllocation / 100));
      result.breakdown.personnel = annualPersonnelCost * years;
      
      // Downtime costs (higher due to security incidents)
      const annualDowntimeCost = vendor.maintenance.downtime * downtimeCost;
      result.breakdown.downtime = annualDowntimeCost * years;
      
      // No initial costs
      result.initialCosts = 0;
      result.annualCosts = annualPersonnelCost + annualDowntimeCost;
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
  
  // Calculate ROI for a vendor compared to baseline
  calculateRoi(vendorTco, baselineTco) {
    if (!vendorTco || !baselineTco) return null;
    
    const { years, costParameters } = this.config;
    const { riskReduction, insuranceReduction } = costParameters;
    
    // Calculate direct cost savings compared to baseline
    const costSavings = baselineTco.totalTco - vendorTco.totalTco;
    
    // Calculate additional benefits
    
    // Risk reduction benefit (avoided breaches)
    const industryBreachCost = this.getIndustryBreachCost();
    const breachProbability = this.getBreachProbability();
    const riskReductionBenefit = industryBreachCost * breachProbability * (riskReduction / 100) * years;
    
    // Insurance premium reduction
    const annualInsurancePremium = this.getInsurancePremium();
    const insuranceSavings = annualInsurancePremium * (insuranceReduction / 100) * years;
    
    // Productivity improvement
    const productivityBenefit = this.config.deviceCount * 50 * years; // $50 per device per year in productivity gains
    
    // Compliance automation savings
    const complianceSavings = this.config.complianceRequirements.length * 10000 * years; // $10K per compliance standard per year
    
    // Calculate total benefits
    const totalBenefits = costSavings + riskReductionBenefit + insuranceSavings + productivityBenefit + complianceSavings;
    
    // Calculate ROI percentage
    const investment = vendorTco.totalTco;
    const roiPercentage = (totalBenefits / investment) * 100;
    
    // Calculate payback period in months
    const monthlyBenefits = totalBenefits / (years * 12);
    const paybackPeriod = (investment / monthlyBenefits);
    
    return {
      vendorId: vendorTco.vendorId,
      vendorName: vendorTco.vendorName,
      costSavings,
      riskReductionBenefit,
      insuranceSavings,
      productivityBenefit,
      complianceSavings,
      totalBenefits,
      investment,
      roiPercentage,
      paybackPeriod,
      annualSavings: totalBenefits / years
    };
  }
  
  // Helper methods for calculating ROI components
  getIndustryBreachCost() {
    const { industry } = this.config;
    const industryCosts = {
      healthcare: 9800000,
      financial: 6300000,
      technology: 5200000,
      energy: 4750000,
      retail: 3800000,
      education: 4000000,
      government: 8200000,
      manufacturing: 4350000,
      '': 4500000 // default
    };
    
    return industryCosts[industry] || industryCosts[''];
  }
  
  getBreachProbability() {
    const { riskProfile } = this.config;
    const probabilities = {
      standard: 0.15,
      elevated: 0.25,
      high: 0.35,
      regulated: 0.40
    };
    
    return probabilities[riskProfile] || probabilities.standard;
  }
  
  getInsurancePremium() {
    const { cybersecurityInsurance, deviceCount } = this.config;
    
    // Base premium per device
    const basePremiums = {
      none: 0,
      basic: 15,
      standard: 25,
      comprehensive: 40
    };
    
    return (basePremiums[cybersecurityInsurance] || basePremiums.standard) * deviceCount;
  }
  
  // Calculate security scores
  calculateSecurityScores(vendorTco, noNacTco) {
    if (!vendorTco) return null;
    
    const vendor = VENDORS[vendorTco.vendorId];
    const noNacVendor = VENDORS['no-nac'];
    
    if (!vendor) return null;
    
    // Calculate security improvement vs no NAC
    const zeroTrustImprovement = ((vendor.security.zeroTrustScore - noNacVendor.security.zeroTrustScore) / 
                                (10 - noNacVendor.security.zeroTrustScore)) * 100;
    
    const deviceAuthImprovement = ((vendor.security.deviceAuthScore - noNacVendor.security.deviceAuthScore) / 
                                 (10 - noNacVendor.security.deviceAuthScore)) * 100;
    
    const riskAssessmentImprovement = ((vendor.security.riskAssessmentScore - noNacVendor.security.riskAssessmentScore) / 
                                     (10 - noNacVendor.security.riskAssessmentScore)) * 100;
    
    const remediationImprovement = ((noNacVendor.security.remediationSpeed - vendor.security.remediationSpeed) / 
                                  noNacVendor.security.remediationSpeed) * 100;
    
    // Overall security improvement
    const overallImprovement = (zeroTrustImprovement + deviceAuthImprovement + 
                              riskAssessmentImprovement + remediationImprovement) / 4;
    
    // Calculate compliance coverage
    let complianceCoverage = 0;
    let availableComplianceCount = 0;
    
    for (const compliance of this.config.complianceRequirements) {
      availableComplianceCount++;
      if (vendor.compliance[compliance]) {
        complianceCoverage++;
      }
    }
    
    const complianceCoveragePercent = availableComplianceCount > 0 ? 
      (complianceCoverage / availableComplianceCount) * 100 : 100;
    
    // Determine breach probability level
    const breachProbability = this.getBreachProbabilityLevel(vendor.security.zeroTrustScore);
    
    return {
      vendorId: vendorTco.vendorId,
      vendorName: vendorTco.vendorName,
      securityScores: {
        zeroTrust: vendor.security.zeroTrustScore * 10, // Scale to 0-100
        deviceAuth: vendor.security.deviceAuthScore * 10,
        riskAssessment: vendor.security.riskAssessmentScore * 10,
        remediationSpeed: vendor.security.remediationSpeed // Minutes
      },
      improvements: {
        zeroTrust: zeroTrustImprovement,
        deviceAuth: deviceAuthImprovement,
        riskAssessment: riskAssessmentImprovement,
        remediation: remediationImprovement,
        overall: overallImprovement
      },
      compliance: {
        coverage: complianceCoveragePercent,
        supported: Object.keys(vendor.compliance).filter(c => vendor.compliance[c])
      },
      risk: {
        breachProbability,
        mttr: vendor.security.remediationSpeed // Mean time to respond (minutes)
      }
    };
  }
  
  getBreachProbabilityLevel(zeroTrustScore) {
    if (zeroTrustScore >= 9) return 'Very Low';
    if (zeroTrustScore >= 8) return 'Low';
    if (zeroTrustScore >= 6) return 'Medium';
    if (zeroTrustScore >= 4) return 'High';
    return 'Very High';
  }
  
  // Main calculation method
  calculate(selectedVendors) {
    if (!selectedVendors || !Array.isArray(selectedVendors) || selectedVendors.length === 0) {
      throw new Error('No vendors selected for calculation');
    }
    
    this.results.vendors = {};
    
    // Always include Portnox and No NAC for comparison
    const allVendors = [...new Set([...selectedVendors, 'portnox', 'no-nac'])];
    
    // Calculate TCO for each vendor
    for (const vendorId of allVendors) {
      const vendor = VENDORS[vendorId];
      if (vendor) {
        const tco = this.calculateVendorTco(vendor);
        this.results.vendors[vendorId] = tco;
      }
    }
    
    // Use No NAC as baseline for comparisons
    const baselineTco = this.results.vendors['no-nac'];
    
    // Calculate ROI for each vendor compared to baseline
    this.results.roi = {};
    for (const vendorId in this.results.vendors) {
      if (vendorId !== 'no-nac') {
        const vendorTco = this.results.vendors[vendorId];
        this.results.roi[vendorId] = this.calculateRoi(vendorTco, baselineTco);
      }
    }
    
    // Calculate security scores for each vendor
    this.results.security = {};
    for (const vendorId in this.results.vendors) {
      if (vendorId !== 'no-nac') {
        const vendorTco = this.results.vendors[vendorId];
        this.results.security[vendorId] = this.calculateSecurityScores(vendorTco, baselineTco);
      }
    }
    
    // Prepare comparison data
    this.prepareComparisonData();
    
    return this.results;
  }
  
  prepareComparisonData() {
    const { vendors, roi, security } = this.results;
    
    this.results.comparison = {
      tco: {},
      features: {},
      implementation: {},
      security: {}
    };
    
    // TCO comparison
    const tcoData = {};
    for (const vendorId in vendors) {
      tcoData[vendorId] = vendors[vendorId].totalTco;
    }
    this.results.comparison.tco = tcoData;
    
    // Implementation time comparison
    const implementationData = {};
    for (const vendorId in vendors) {
      implementationData[vendorId] = vendors[vendorId].implementation.time;
    }
    this.results.comparison.implementation = implementationData;
    
    // Security comparison
    const securityData = {};
    for (const vendorId in security) {
      securityData[vendorId] = security[vendorId].improvements.overall;
    }
    this.results.comparison.security = securityData;
    
    // Feature coverage comparison
    const featureData = {};
    for (const vendorId in vendors) {
      const vendor = VENDORS[vendorId];
      if (vendor) {
        const featureCount = Object.values(vendor.features).filter(v => v).length;
        const featurePercentage = (featureCount / Object.keys(vendor.features).length) * 100;
        featureData[vendorId] = featurePercentage;
      }
    }
    this.results.comparison.features = featureData;
    
    return this.results.comparison;
  }
}

// Export calculator for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TcoCalculator };
}
