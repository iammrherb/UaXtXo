/**
 * TCO Calculator
 * Processes TCO calculations based on user inputs and vendor data
 */
class TcoCalculator {
  constructor() {
    // Initialize with default values
    this.industryData = window.IndustryData || {};
    this.vendorData = window.VendorComparisonData || {};
    this.complianceData = window.ComplianceFrameworks || {};
    this.enhancedIndustryTemplates = window.enhancedIndustryTemplates || {};
    this.noNacBaseline = window.NoNacBaseline || null;
    
    // Results storage
    this.calculationResults = {
      currentSolution: {},
      portnoxSolution: {},
      savings: {},
      roi: {},
      breakeven: null,
      riskReduction: 0
    };
    
    console.log("TCO Calculator initialized");
  }
  
  /**
   * Calculate TCO based on user inputs
   * @param {Object} params - User input parameters
   * @returns {Object} - Complete calculation results
   */
  calculateTco(params) {
    console.log("Calculating TCO with parameters:", params);
    
    // Extract parameters
    const {
      currentVendor,
      deviceCount,
      industry,
      yearsToProject,
      locationsCount,
      hasByod,
      hasLegacyDevices,
      legacyPercentage,
      hasCloudIntegration,
      fteCost,
      maintenancePercentage,
      implementationDays,
      consultingRate,
      usersToTrain,
      trainingCostPerUser,
      portnoxPricePerDevice,
      portnoxDiscount
    } = params;
    
    // Calculate current solution costs
    this.calculateCurrentSolutionCosts(params);
    
    // Calculate Portnox solution costs
    this.calculatePortnoxSolutionCosts(params);
    
    // Calculate savings
    this.calculateSavings();
    
    // Calculate ROI
    this.calculateRoi();
    
    // Calculate breakeven point
    this.calculateBreakeven();
    
    // Calculate risk reduction
    this.calculateRiskReduction(params);
    
    // Return complete results
    return this.calculationResults;
  }
  
  /**
   * Calculate costs for current solution
   * @param {Object} params - User input parameters
   */
  calculateCurrentSolutionCosts(params) {
    const {
      currentVendor,
      deviceCount,
      industry,
      yearsToProject,
      locationsCount,
      hasByod,
      hasLegacyDevices,
      legacyPercentage,
      hasCloudIntegration,
      fteCost,
      maintenancePercentage,
      implementationDays,
      consultingRate
    } = params;
    
    // Default values for unknown vendors
    let hardwareCosts = 0;
    let licensingCosts = 0;
    let implementationCosts = 0;
    let maintenanceCosts = 0;
    let personnelCosts = 0;
    
    // No NAC solution
    if (currentVendor === 'noNac') {
      if (this.noNacBaseline) {
        // Use the sophisticated breach cost model if available
        const noNacParams = {
          industry: industry,
          organizationSize: deviceCount < 1000 ? 'small' : deviceCount < 5000 ? 'medium' : 'large',
          deviceCount: deviceCount,
          hasMultipleLocations: locationsCount > 1,
          locationCount: locationsCount,
          legacyPercentage: legacyPercentage,
          yearsToProject: yearsToProject
        };
        
        const noNacCosts = this.noNacBaseline.calculateTotalCost(noNacParams);
        
        // Distribute costs into categories
        hardwareCosts = 0;
        licensingCosts = 0;
        implementationCosts = 0;
        maintenanceCosts = noNacCosts.operationalInefficiency.cumulativeInefficiency;
        personnelCosts = noNacCosts.staffingCosts.cumulativeStaffingCost;
        
        // Store breach and compliance risks for later use
        this.calculationResults.currentSolution.breachRisk = noNacCosts.breachRisk;
        this.calculationResults.currentSolution.complianceRisk = noNacCosts.complianceRisk;
      } else {
        // Simplified model if noNacBaseline is not available
        personnelCosts = fteCost * 0.5 * yearsToProject; // Ad-hoc network management
        maintenanceCosts = deviceCount * 50 * yearsToProject; // Basic troubleshooting costs
      }
    } 
    // On-premises NAC solutions
    else if (['cisco', 'aruba', 'forescout', 'fortinac'].includes(currentVendor)) {
      // Get vendor-specific cost factors
      const costFactors = this.getVendorCostFactors(currentVendor);
      
      // Calculate hardware costs
      hardwareCosts = deviceCount * costFactors.hardwareCost;
      
      // Adjust for multiple locations
      if (locationsCount > 1) {
        hardwareCosts *= (1 + ((locationsCount - 1) * costFactors.locationFactor));
      }
      
      // Calculate licensing costs
      licensingCosts = deviceCount * costFactors.licensingCost * yearsToProject;
      
      // Calculate implementation costs
      implementationCosts = costFactors.baseImplementationCost + (deviceCount * costFactors.implementationPerDevice);
      
      // Calculate maintenance costs
      maintenanceCosts = (hardwareCosts * (maintenancePercentage / 100)) * yearsToProject;
      
      // Calculate personnel costs - FTE requirements
      const fteRequired = this.calculateFteRequirements(currentVendor, deviceCount, locationsCount);
      personnelCosts = fteRequired * fteCost * yearsToProject;
    }
    // Lighter cloud or hybrid solutions
    else if (['nps', 'securew2'].includes(currentVendor)) {
      // Get vendor-specific cost factors
      const costFactors = this.getVendorCostFactors(currentVendor);
      
      // Calculate hardware costs (minimal for these solutions)
      hardwareCosts = deviceCount * costFactors.hardwareCost;
      
      // Calculate licensing costs
      licensingCosts = deviceCount * costFactors.licensingCost * yearsToProject;
      
      // Calculate implementation costs
      implementationCosts = costFactors.baseImplementationCost + (deviceCount * costFactors.implementationPerDevice);
      
      // Calculate maintenance costs (minimal for these solutions)
      maintenanceCosts = (hardwareCosts * (maintenancePercentage / 100)) * yearsToProject;
      
      // Calculate personnel costs - FTE requirements
      const fteRequired = this.calculateFteRequirements(currentVendor, deviceCount, locationsCount);
      personnelCosts = fteRequired * fteCost * yearsToProject;
    }
    
    // Store results
    this.calculationResults.currentSolution = {
      hardware: hardwareCosts,
      licensing: licensingCosts,
      implementation: implementationCosts,
      maintenance: maintenanceCosts,
      personnel: personnelCosts,
      total: hardwareCosts + licensingCosts + implementationCosts + maintenanceCosts + personnelCosts
    };
    
    console.log("Current solution costs calculated:", this.calculationResults.currentSolution);
  }
  
  /**
   * Calculate costs for Portnox Cloud solution
   * @param {Object} params - User input parameters
   */
  calculatePortnoxSolutionCosts(params) {
    const {
      deviceCount,
      industry,
      yearsToProject,
      locationsCount,
      hasByod,
      fteCost,
      implementationDays,
      consultingRate,
      usersToTrain,
      trainingCostPerUser,
      portnoxPricePerDevice,
      portnoxDiscount
    } = params;
    
    // Calculate effective price per device with discount
    const effectivePrice = portnoxPricePerDevice * (1 - (portnoxDiscount / 100));
    
    // No hardware costs for cloud-native solution
    const hardwareCosts = 0;
    
    // Calculate licensing costs
    const annualLicensing = deviceCount * effectivePrice * 12; // Monthly to annual
    const licensingCosts = annualLicensing * yearsToProject;
    
    // Calculate implementation costs
    const implementationCosts = implementationDays * consultingRate;
    
    // Calculate training costs
    const trainingCosts = usersToTrain * trainingCostPerUser;
    
    // No ongoing maintenance costs for cloud-native solution
    const maintenanceCosts = 0;
    
    // Calculate personnel costs - FTE requirements
    const fteRequired = this.calculateFteRequirements('portnox', deviceCount, locationsCount);
    const personnelCosts = fteRequired * fteCost * yearsToProject;
    
    // Store results
    this.calculationResults.portnoxSolution = {
      hardware: hardwareCosts,
      licensing: licensingCosts,
      implementation: implementationCosts + trainingCosts,
      maintenance: maintenanceCosts,
      personnel: personnelCosts,
      total: hardwareCosts + licensingCosts + implementationCosts + trainingCosts + maintenanceCosts + personnelCosts,
      effectivePrice: effectivePrice,
      annualLicensing: annualLicensing
    };
    
    console.log("Portnox solution costs calculated:", this.calculationResults.portnoxSolution);
  }
  
  /**
   * Calculate savings between current solution and Portnox Cloud
   */
  calculateSavings() {
    const current = this.calculationResults.currentSolution;
    const portnox = this.calculationResults.portnoxSolution;
    
    // Calculate category-specific savings
    const hardwareSavings = current.hardware - portnox.hardware;
    const licensingSavings = current.licensing - portnox.licensing;
    const implementationSavings = current.implementation - portnox.implementation;
    const maintenanceSavings = current.maintenance - portnox.maintenance;
    const personnelSavings = current.personnel - portnox.personnel;
    
    // Calculate total savings
    const totalSavings = current.total - portnox.total;
    
    // Calculate savings percentage
    const savingsPercentage = (totalSavings / current.total) * 100;
    
    // Store results
    this.calculationResults.savings = {
      hardware: hardwareSavings,
      licensing: licensingSavings,
      implementation: implementationSavings,
      maintenance: maintenanceSavings,
      personnel: personnelSavings,
      total: totalSavings,
      percentage: savingsPercentage
    };
    
    console.log("Savings calculated:", this.calculationResults.savings);
  }
  
  /**
   * Calculate ROI for Portnox solution
   */
  calculateRoi() {
    const savings = this.calculationResults.savings;
    const portnox = this.calculationResults.portnoxSolution;
    
    // Calculate ROI percentage
    const roi = (savings.total / portnox.total) * 100;
    
    // Calculate annualized ROI
    const yearlyRoi = [];
    const yearsToProject = portnox.licensing / portnox.annualLicensing;
    
    for (let year = 1; year <= yearsToProject; year++) {
      // Simple linear model for yearly savings
      const yearlyInvestment = year === 1 
        ? portnox.implementation + portnox.annualLicensing + (portnox.personnel / yearsToProject)
        : portnox.annualLicensing + (portnox.personnel / yearsToProject);
      
      const yearlySavings = (savings.total / yearsToProject);
      const yearlyRoiValue = (yearlySavings / yearlyInvestment) * 100;
      
      yearlyRoi.push({
        year: year,
        investment: yearlyInvestment,
        savings: yearlySavings,
        roi: yearlyRoiValue
      });
    }
    
    // Store results
    this.calculationResults.roi = {
      total: roi,
      yearly: yearlyRoi
    };
    
    console.log("ROI calculated:", this.calculationResults.roi);
  }
  
  /**
   * Calculate breakeven point for Portnox solution
   */
  calculateBreakeven() {
    const current = this.calculationResults.currentSolution;
    const portnox = this.calculationResults.portnoxSolution;
    
    // Get yearly costs for both solutions
    const yearsToProject = portnox.licensing / portnox.annualLicensing;
    
    // Initial costs (year 0)
    const currentInitial = current.implementation;
    const portnoxInitial = portnox.implementation;
    
    // Yearly operational costs
    const currentYearly = (current.licensing + current.maintenance + current.personnel) / yearsToProject;
    const portnoxYearly = portnox.annualLicensing + (portnox.personnel / yearsToProject);
    
    // Monthly operational costs
    const currentMonthly = currentYearly / 12;
    const portnoxMonthly = portnoxYearly / 12;
    
    // Calculate monthly cumulative costs
    const monthlyCosts = [];
    let currentCumulative = currentInitial;
    let portnoxCumulative = portnoxInitial;
    let breakeven = null;
    
    for (let month = 1; month <= yearsToProject * 12; month++) {
      currentCumulative += currentMonthly;
      portnoxCumulative += portnoxMonthly;
      
      monthlyCosts.push({
        month: month,
        current: currentCumulative,
        portnox: portnoxCumulative
      });
      
      // Check for breakeven point
      if (breakeven === null && portnoxCumulative <= currentCumulative) {
        breakeven = month;
      }
    }
    
    // Store results
    this.calculationResults.breakeven = {
      month: breakeven,
      monthlyCosts: monthlyCosts
    };
    
    console.log("Breakeven calculated:", this.calculationResults.breakeven);
  }
  
  /**
   * Calculate risk reduction with Portnox solution
   * @param {Object} params - User input parameters
   */
  calculateRiskReduction(params) {
    const { currentVendor, industry } = params;
    
    let riskReduction = 0;
    
    // If NoNacBaseline is available and current solution is no NAC
    if (this.noNacBaseline && currentVendor === 'noNac') {
      // Get mitigation factors from NoNacBaseline
      const mitigationFactors = this.noNacBaseline.getMitigationFactors();
      
      // Calculate risk reduction percentage
      const breachLikelihoodReduction = (1 - mitigationFactors.breachLikelihood) * 100;
      const breachScopeReduction = (1 - mitigationFactors.breachScope) * 100;
      const detectionTimeReduction = (1 - mitigationFactors.detectionTime) * 100;
      const complianceRiskReduction = (1 - mitigationFactors.complianceRisk) * 100;
      
      // Overall risk reduction - weighted average
      riskReduction = (
        (breachLikelihoodReduction * 0.3) +
        (breachScopeReduction * 0.3) +
        (detectionTimeReduction * 0.2) +
        (complianceRiskReduction * 0.2)
      );
    } 
    // If current solution is an existing NAC
    else if (currentVendor !== 'portnox') {
      // Get comparison data from vendor data
      if (this.vendorData && this.vendorData.featureRatings) {
        const currentRatings = this.vendorData.featureRatings[currentVendor] || {};
        const portnoxRatings = this.vendorData.featureRatings.portnox || {};
        
        // Calculate improvement in key security metrics
        const securityMetrics = [
          'deviceVisibility',
          'policyManagement',
          'automatedRemediation',
          'thirdPartyIntegration'
        ];
        
        let improvementSum = 0;
        let metricsCount = 0;
        
        securityMetrics.forEach(metric => {
          if (currentRatings[metric] && portnoxRatings[metric]) {
            const improvement = portnoxRatings[metric] - currentRatings[metric];
            if (improvement > 0) {
              improvementSum += improvement;
              metricsCount++;
            }
          }
        });
        
        if (metricsCount > 0) {
          // Average improvement in security metrics
          const avgImprovement = improvementSum / metricsCount;
          
          // Scale to percentage (maximum improvement would be 10 points on 1-10 scale)
          riskReduction = (avgImprovement / 10) * 100;
        }
      }
    }
    
    // Store result
    this.calculationResults.riskReduction = riskReduction;
    
    console.log("Risk reduction calculated:", riskReduction);
  }
  
  /**
   * Calculate FTE requirements based on vendor, device count, and locations
   * @param {string} vendor - Vendor name
   * @param {number} deviceCount - Number of devices
   * @param {number} locationsCount - Number of locations
   * @returns {number} - FTE requirements
   */
  calculateFteRequirements(vendor, deviceCount, locationsCount) {
    // Get industry FTE data if available
    const fteData = this.industryData && this.industryData.fteRequirements
      ? this.industryData.fteRequirements
      : null;
    
    // Base FTE requirements per 1000 devices
    let baseFte = 0;
    
    if (vendor === 'portnox') {
      // Cloud-native solutions require less FTE
      baseFte = fteData ? 0.15 : 0.15;
    } else if (['cisco', 'aruba', 'forescout'].includes(vendor)) {
      // Enterprise on-prem solutions require more FTE
      baseFte = fteData ? 0.4 : 0.4;
    } else if (['fortinac', 'securew2'].includes(vendor)) {
      // Hybrid solutions require moderate FTE
      baseFte = fteData ? 0.3 : 0.3;
    } else if (vendor === 'nps') {
      // Basic solutions still require some management
      baseFte = fteData ? 0.25 : 0.25;
    }
    
    // Calculate FTE based on device count
    let fteRequired = (deviceCount / 1000) * baseFte;
    
    // Adjust for multiple locations
    if (locationsCount > 1) {
      // Each additional location adds overhead
      fteRequired *= (1 + (Math.log10(locationsCount) * 0.2));
    }
    
    return fteRequired;
  }
  
  /**
   * Get vendor-specific cost factors
   * @param {string} vendor - Vendor name
   * @returns {Object} - Cost factors
   */
  getVendorCostFactors(vendor) {
    // Default cost factors
    const defaultFactors = {
      hardwareCost: 0,
      licensingCost: 0,
      baseImplementationCost: 0,
      implementationPerDevice: 0,
      locationFactor: 0.1
    };
    
    // Vendor-specific cost factors
    const vendorFactors = {
      cisco: {
        hardwareCost: 22,
        licensingCost: 48,
        baseImplementationCost: 150000,
        implementationPerDevice: 15,
        locationFactor: 0.15
      },
      aruba: {
        hardwareCost: 20,
        licensingCost: 45,
        baseImplementationCost: 125000,
        implementationPerDevice: 12,
        locationFactor: 0.12
      },
      forescout: {
        hardwareCost: 25,
        licensingCost: 50,
        baseImplementationCost: 140000,
        implementationPerDevice: 14,
        locationFactor: 0.14
      },
      fortinac: {
        hardwareCost: 18,
        licensingCost: 40,
        baseImplementationCost: 110000,
        implementationPerDevice: 10,
        locationFactor: 0.1
      },
      nps: {
        hardwareCost: 5,
        licensingCost: 10,
        baseImplementationCost: 50000,
        implementationPerDevice: 5,
        locationFactor: 0.05
      },
      securew2: {
        hardwareCost: 2,
        licensingCost: 35,
        baseImplementationCost: 75000,
        implementationPerDevice: 8,
        locationFactor: 0.08
      },
      portnox: {
        hardwareCost: 0,
        licensingCost: 0, // Set separately
        baseImplementationCost: 0, // Set separately
        implementationPerDevice: 0,
        locationFactor: 0
      }
    };
    
    return vendorFactors[vendor] || defaultFactors;
  }
}

// Initialize TCO Calculator when document is ready
document.addEventListener('DOMContentLoaded', function() {
  window.tcoCalculator = new TcoCalculator();
});
