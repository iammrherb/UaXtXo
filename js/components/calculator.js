/**
 * TCO Calculator for computing cost comparisons and ROI
 */

class Calculator {
  constructor() {
    this.results = null;
    this.resultsAvailable = false;
  }

  calculate() {
    const currentVendor = window.uiController.activeVendor;
    const deviceCount = parseInt(document.getElementById('device-count').value) || 1000;
    const orgSize = document.getElementById('organization-size').value;
    const yearsToProject = parseInt(document.getElementById('years-to-project').value) || 3;
    
    // Calculate TCO for all vendors
    const tcoResults = {};
    const implementationResults = {};
    
    Object.keys(vendorData).forEach(vendor => {
      const result = this.calculateVendorTCO(vendor, currentVendor, orgSize, deviceCount, yearsToProject);
      tcoResults[vendor] = result;
      
      // Calculate implementation time
      implementationResults[vendor] = this.calculateImplementationTime(vendor, orgSize);
    });
    
    // Add metadata to results
    tcoResults.yearsToProject = yearsToProject;
    tcoResults.deviceCount = deviceCount;
    tcoResults.orgSize = orgSize;
    tcoResults.implementationResults = implementationResults;
    
    // Store results
    this.results = tcoResults;
    this.resultsAvailable = true;
    
    // Update charts and UI
    this.updateUI();
    
    return tcoResults;
  }

  calculateVendorTCO(vendor, currentVendor, orgSize, deviceCount, yearsToProject) {
    const vendorInfo = vendorData[vendor][orgSize];
    const complexityMultiplier = calculateComplexityMultiplier(vendor, vendorData[vendor].cloudBased);
    
    // Calculate initial costs
    const initialHardware = vendorInfo.initialHardware;
    const networkRedesign = vendorInfo.networkRedesign;
    const implementation = vendorInfo.implementation;
    const training = vendorInfo.training;
    
    const totalInitialCosts = (initialHardware + networkRedesign + implementation + training) * complexityMultiplier;
    
    // Calculate annual costs
    const annualMaintenance = vendorInfo.annualMaintenance;
    const annualLicensing = vendorInfo.annualLicensing;
    const fteCost = calculateFTECosts(vendorInfo.fteAllocation);
    const downtimeCost = vendorInfo.annualDowntime * 5000; // Assuming $5000 per hour of downtime
    
    const annualCosts = (annualMaintenance + annualLicensing + fteCost + downtimeCost) * complexityMultiplier;
    
    // Calculate TCO
    const totalTCO = totalInitialCosts + (annualCosts * yearsToProject);
    
    // Calculate migration cost (if different from current vendor)
    let migrationCost = 0;
    if (vendor !== currentVendor) {
      const migrationFactor = calculateMigrationFactor(currentVendor, vendor);
      migrationCost = implementation * complexityMultiplier * migrationFactor;
    }
    
    // Calculate savings vs current solution
    let totalSavings = 0;
    let savingsPercentage = 0;
    let annualSavings = 0;
    
    if (vendor !== currentVendor) {
      const currentVendorInfo = vendorData[currentVendor][orgSize];
      const currentComplexity = calculateComplexityMultiplier(currentVendor, vendorData[currentVendor].cloudBased);
      
      const currentInitial = (currentVendorInfo.initialHardware + currentVendorInfo.networkRedesign + 
                             currentVendorInfo.implementation + currentVendorInfo.training) * currentComplexity;
      
      const currentAnnual = (currentVendorInfo.annualMaintenance + currentVendorInfo.annualLicensing + 
                            calculateFTECosts(currentVendorInfo.fteAllocation) + 
                            currentVendorInfo.annualDowntime * 5000) * currentComplexity;
      
      const currentTCO = currentInitial + (currentAnnual * yearsToProject);
      
      totalSavings = currentTCO - totalTCO - migrationCost;
      savingsPercentage = (totalSavings / currentTCO) * 100;
      annualSavings = currentAnnual - annualCosts;
    }
    
    // Create cost breakdown
    const costBreakdown = {
      hardware: initialHardware * complexityMultiplier,
      networkRedesign: networkRedesign * complexityMultiplier,
      implementation: implementation * complexityMultiplier,
      training: training * complexityMultiplier,
      maintenance: annualMaintenance * yearsToProject * complexityMultiplier,
      licensing: annualLicensing * yearsToProject * complexityMultiplier,
      personnel: fteCost * yearsToProject * complexityMultiplier,
      downtime: downtimeCost * yearsToProject * complexityMultiplier
    };
    
    return {
      totalTCO,
      totalInitialCosts,
      annualCosts,
      migrationCost,
      totalSavings,
      savingsPercentage,
      annualSavings,
      costBreakdown
    };
  }

  calculateImplementationTime(vendor, orgSize) {
    const vendorInfo = vendorData[vendor][orgSize];
    const timeline = vendorInfo.implementationTimeline;
    const complexityMultiplier = calculateComplexityMultiplier(vendor, vendorData[vendor].cloudBased);
    
    // Calculate total implementation time
    let totalDays = 0;
    for (const phase in timeline) {
      totalDays += timeline[phase];
    }
    
    return totalDays * complexityMultiplier;
  }

  updateUI() {
    if (!this.results || !window.chartBuilder || !window.uiController) return;
    
    // Update charts
    window.chartBuilder.updateTCOComparisonChart(this.results);
    window.chartBuilder.updateCumulativeCostChart(this.results);
    window.chartBuilder.updateBreakdownCharts(window.uiController.activeVendor, 'portnox');
    
    // Update TCO summary table
    window.uiController.populateTCOSummaryTable(this.results);
    
    // Update Portnox advantage section
    window.uiController.updatePortnoxAdvantageSection(this.results);
  }
}
