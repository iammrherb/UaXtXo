/**
 * Enhanced TCO Calculator for computing cost comparisons and ROI
 * Includes performance improvements and better error handling
 */

class Calculator {
  constructor() {
    this.results = null;
    this.resultsAvailable = false;
    this.isCalculating = false;
    this.lastInputs = {};
    this.eventListeners = {};
    this.cacheEnabled = true;
    this.calculationCount = 0;
  }
  
  // Calculate TCO with progress indicators and validation
  calculate() {
    try {
      if (this.isCalculating) {
        console.warn("Calculation already in progress, please wait");
        return Promise.reject(new Error("Calculation in progress"));
      }
      
      this.isCalculating = true;
      
      // Show loading indicator in results container
      if (window.loadingManager) {
        window.loadingManager.show('results-container', 'Calculating TCO...', {
          showProgress: true
        });
        window.loadingManager.startProgressSimulation('results-container', 3000);
      }
      
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            if (!window.vendorData) {
              throw new Error("Vendor data not available");
            }
            
            // Get input values
            const currentVendor = window.uiController ? window.uiController.activeVendor : 'cisco';
            
            // Use DOM Cache if available for better performance
            const getInputValue = (id, defaultValue) => {
              if (window.domCache) {
                return window.domCache.getInputValue(id) || defaultValue;
              }
              
              const element = document.getElementById(id);
              if (!element) return defaultValue;
              
              if (element.type === 'checkbox') {
                return element.checked;
              } else if (element.type === 'number') {
                return parseInt(element.value) || defaultValue;
              } else {
                return element.value;
              }
            };
            
            const deviceCount = getInputValue('device-count', 1000);
            const orgSize = getInputValue('organization-size', 'medium');
            const yearsToProject = getInputValue('years-to-project', 3);
            
            // Additional inputs
            const multipleLocations = getInputValue('multiple-locations', false);
            const locationCount = getInputValue('location-count', 1);
            const complexAuth = getInputValue('complex-authentication', false);
            const legacyDevices = getInputValue('legacy-devices', false);
            const legacyPercentage = getInputValue('legacy-percentage', 10);
            const cloudIntegration = getInputValue('cloud-integration', false);
            const customPolicies = getInputValue('custom-policies', false);
            const policyComplexity = getInputValue('policy-complexity', 'medium');
            
            // Store input values for caching
            const inputs = {
              currentVendor,
              deviceCount,
              orgSize,
              yearsToProject,
              multipleLocations,
              locationCount,
              complexAuth,
              legacyDevices,
              legacyPercentage,
              cloudIntegration,
              customPolicies,
              policyComplexity
            };
            
            // Check if inputs are the same as last calculation
            if (this.cacheEnabled && this.resultsAvailable && this.resultsMatch(inputs)) {
              if (window.loadingManager) {
                window.loadingManager.completeProgress('results-container');
              }
              this.isCalculating = false;
              this.triggerEvent('calculationComplete', this.results);
              resolve(this.results);
              return;
            }
            
            // Update last inputs
            this.lastInputs = { ...inputs };
            
            // Track calculation progress
            let progress = 0;
            const totalSteps = Object.keys(window.vendorData).length * 2 + 3;
            let currentStep = 0;
            
            const updateProgress = (message) => {
              currentStep++;
              progress = (currentStep / totalSteps) * 100;
              
              if (window.loadingManager) {
                window.loadingManager.updateProgress('results-container', progress);
                window.loadingManager.updateText('results-container', message);
              }
            };
            
            updateProgress('Initializing calculation...');
            
            // Calculate TCO for all vendors
            const tcoResults = {};
            const implementationResults = {};
            
            // Get vendors array
            const vendors = Object.keys(window.vendorData);
            
            // First pass: Calculate basic TCO for all vendors
            vendors.forEach(vendor => {
              updateProgress(`Calculating TCO for ${window.vendorData[vendor].name}...`);
              const result = this.calculateVendorTCO(vendor, currentVendor, orgSize, deviceCount, yearsToProject);
              tcoResults[vendor] = result;
            });
            
            updateProgress('Calculating migration costs...');
            
            // Second pass: Calculate implementation times
            vendors.forEach(vendor => {
              updateProgress(`Calculating implementation time for ${window.vendorData[vendor].name}...`);
              implementationResults[vendor] = this.calculateImplementationTime(vendor, orgSize);
            });
            
            // Add metadata to results
            tcoResults.yearsToProject = yearsToProject;
            tcoResults.deviceCount = deviceCount;
            tcoResults.orgSize = orgSize;
            tcoResults.implementationResults = implementationResults;
            tcoResults.calculationDate = new Date().toISOString();
            tcoResults.calculationId = Date.now().toString(36) + Math.random().toString(36).substring(2);
            
            updateProgress('Finalizing results...');
            
            // Store results
            this.results = tcoResults;
            this.resultsAvailable = true;
            this.calculationCount++;
            
            // Update charts and UI
            this.updateUI();
            
            updateProgress('Calculation complete!');
            
            // Finish loading
            if (window.loadingManager) {
              window.loadingManager.completeProgress('results-container');
            }
            
            // Trigger event
            this.triggerEvent('calculationComplete', tcoResults);
            
            this.isCalculating = false;
            resolve(tcoResults);
          } catch (error) {
            console.error("Error calculating TCO:", error);
            this.isCalculating = false;
            
            // Show error message
            if (window.loadingManager) {
              window.loadingManager.hide('results-container');
            }
            
            if (window.notificationManager) {
              window.notificationManager.error(`Error calculating TCO: ${error.message}`);
            }
            
            reject(error);
          }
        }, 100);
      });
    } catch (error) {
      console.error("Error in calculator.calculate():", error);
      this.isCalculating = false;
      
      // Show error message
      if (window.loadingManager) {
        window.loadingManager.hide('results-container');
      }
      
      if (window.notificationManager) {
        window.notificationManager.error(`Calculation error: ${error.message}`);
      }
      
      return Promise.reject(error);
    }
  }
  
  // Check if current inputs match last calculation
  resultsMatch(inputs) {
    const lastInputs = this.lastInputs;
    
    for (const key in inputs) {
      if (inputs[key] !== lastInputs[key]) {
        return false;
      }
    }
    
    return true;
  }
  
  // Event system for calculator
  on(eventName, callback) {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = [];
    }
    
    this.eventListeners[eventName].push(callback);
    return this;
  }
  
  off(eventName, callback) {
    if (!this.eventListeners[eventName]) return this;
    
    if (callback) {
      this.eventListeners[eventName] = this.eventListeners[eventName]
        .filter(cb => cb !== callback);
    } else {
      this.eventListeners[eventName] = [];
    }
    
    return this;
  }
  
  triggerEvent(eventName, data) {
    if (!this.eventListeners[eventName]) return;
    
    this.eventListeners[eventName].forEach(callback => {
      callback(data);
    });
  }
  
  calculateVendorTCO(vendor, currentVendor, orgSize, deviceCount, yearsToProject) {
    try {
      if (!window.vendorData[vendor] || !window.vendorData[vendor][orgSize]) {
        console.error(`Invalid vendor or organization size: ${vendor}, ${orgSize}`);
        return {
          totalTCO: 0,
          totalInitialCosts: 0,
          annualCosts: 0,
          migrationCost: 0,
          totalSavings: 0,
          savingsPercentage: 0,
          annualSavings: 0,
          costBreakdown: {
            hardware: 0,
            networkRedesign: 0,
            implementation: 0,
            training: 0,
            maintenance: 0,
            licensing: 0,
            personnel: 0,
            downtime: 0
          }
        };
      }
      
      const vendorInfo = window.vendorData[vendor][orgSize];
      const cloudBased = window.vendorData[vendor].cloudBased;
      const complexityMultiplier = window.calculateComplexityMultiplier(vendor, cloudBased);
      
      // Scale costs based on device count relative to organization size
      const deviceMultiplier = this.calculateDeviceMultiplier(orgSize, deviceCount);
      
      // Calculate initial costs
      const initialHardware = vendorInfo.initialHardware * deviceMultiplier;
      const networkRedesign = vendorInfo.networkRedesign * deviceMultiplier;
      const implementation = vendorInfo.implementation * deviceMultiplier;
      const training = vendorInfo.training;
      
      const totalInitialCosts = (initialHardware + networkRedesign + implementation + training) * complexityMultiplier;
      
      // Calculate annual costs
      const annualMaintenance = vendorInfo.annualMaintenance * deviceMultiplier;
      const annualLicensing = vendorInfo.annualLicensing * deviceMultiplier;
      const fteCost = window.calculateFTECosts(vendorInfo.fteAllocation);
      const downtimeCost = vendorInfo.annualDowntime * 5000 * deviceMultiplier; // Assuming $5000 per hour of downtime
      
      const annualCosts = (annualMaintenance + annualLicensing + fteCost + downtimeCost) * complexityMultiplier;
      
      // Calculate TCO
      const totalTCO = totalInitialCosts + (annualCosts * yearsToProject);
      
      // Calculate migration cost (if different from current vendor)
      let migrationCost = 0;
      if (vendor !== currentVendor) {
        const migrationFactor = window.calculateMigrationFactor(currentVendor, vendor);
        migrationCost = implementation * complexityMultiplier * migrationFactor;
      }
      
      // Calculate savings vs current solution
      let totalSavings = 0;
      let savingsPercentage = 0;
      let annualSavings = 0;
      
      if (vendor !== currentVendor) {
        const currentVendorInfo = window.vendorData[currentVendor][orgSize];
        const currentCloudBased = window.vendorData[currentVendor].cloudBased;
        const currentComplexity = window.calculateComplexityMultiplier(currentVendor, currentCloudBased);
        
        const currentInitialHardware = currentVendorInfo.initialHardware * deviceMultiplier;
        const currentNetworkRedesign = currentVendorInfo.networkRedesign * deviceMultiplier;
        const currentImplementation = currentVendorInfo.implementation * deviceMultiplier;
        const currentTraining = currentVendorInfo.training;
        
        const currentInitial = (currentInitialHardware + currentNetworkRedesign + 
                              currentImplementation + currentTraining) * currentComplexity;
        
        const currentMaintenance = currentVendorInfo.annualMaintenance * deviceMultiplier;
        const currentLicensing = currentVendorInfo.annualLicensing * deviceMultiplier;
        const currentFteCost = window.calculateFTECosts(currentVendorInfo.fteAllocation);
        const currentDowntimeCost = currentVendorInfo.annualDowntime * 5000 * deviceMultiplier;
        
        const currentAnnual = (currentMaintenance + currentLicensing + 
                              currentFteCost + currentDowntimeCost) * currentComplexity;
        
        const currentTCO = currentInitial + (currentAnnual * yearsToProject);
        
        totalSavings = currentTCO - totalTCO - migrationCost;
        savingsPercentage = currentTCO > 0 ? (totalSavings / currentTCO) * 100 : 0;
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
        costBreakdown,
        complexityMultiplier,
        deviceMultiplier
      };
    } catch (error) {
      console.error(`Error calculating TCO for vendor ${vendor}:`, error);
      return {
        totalTCO: 0,
        totalInitialCosts: 0,
        annualCosts: 0,
        migrationCost: 0,
        totalSavings: 0,
        savingsPercentage: 0,
        annualSavings: 0,
        costBreakdown: {
          hardware: 0,
          networkRedesign: 0,
          implementation: 0,
          training: 0,
          maintenance: 0,
          licensing: 0,
          personnel: 0,
          downtime: 0
        },
        error: error.message
      };
    }
  }
  
  // Calculate device count multiplier based on org size
  calculateDeviceMultiplier(orgSize, deviceCount) {
    let baseDeviceCount;
    
    // Standard device counts for org sizes
    switch (orgSize) {
      case 'small':
        baseDeviceCount = 500;
        break;
      case 'medium':
        baseDeviceCount = 2500;
        break;
      case 'large':
        baseDeviceCount = 10000;
        break;
      default:
        baseDeviceCount = 2500;
    }
    
    // Scale using square root for diminishing returns on larger scale
    return Math.pow(deviceCount / baseDeviceCount, 0.85);
  }
  
  calculateImplementationTime(vendor, orgSize) {
    try {
      if (!window.vendorData[vendor] || !window.vendorData[vendor][orgSize] || !window.vendorData[vendor][orgSize].implementationTimeline) {
        return {
          totalDays: 0,
          phases: {}
        };
      }
      
      const vendorInfo = window.vendorData[vendor][orgSize];
      const timeline = vendorInfo.implementationTimeline;
      const cloudBased = window.vendorData[vendor].cloudBased;
      const complexityMultiplier = window.calculateComplexityMultiplier(vendor, cloudBased);
      
      // Calculate adjusted timeline for each phase
      const adjustedTimeline = {};
      let totalDays = 0;
      
      for (const phase in timeline) {
        const phaseDays = timeline[phase] * complexityMultiplier;
        adjustedTimeline[phase] = phaseDays;
        totalDays += phaseDays;
      }
      
      return {
        totalDays,
        phases: adjustedTimeline,
        complexityMultiplier
      };
    } catch (error) {
      console.error(`Error calculating implementation time for vendor ${vendor}:`, error);
      return {
        totalDays: 0,
        phases: {},
        error: error.message
      };
    }
  }
  
  updateUI() {
    try {
      if (!this.results) return;
      
      // Update charts
      if (window.chartBuilder) {
        window.chartBuilder.updateTCOComparisonChart(this.results);
        window.chartBuilder.updateCumulativeCostChart(this.results);
        
        // Get current active vendor and portnox for breakdown charts
        const currentVendor = window.uiController ? window.uiController.activeVendor : 'cisco';
        window.chartBuilder.updateBreakdownCharts(currentVendor, 'portnox');
      }
      
      // Update TCO summary table
      if (window.uiController) {
        window.uiController.populateTCOSummaryTable(this.results);
        window.uiController.updateAnnualCostsTable(this.results);
        window.uiController.updateImplementationTable(this.results);
        window.uiController.updatePortnoxAdvantageSection(this.results);
      }
      
      // Show success notification
      if (window.notificationManager && this.calculationCount > 1) {
        window.notificationManager.success('TCO calculation completed successfully');
      }
    } catch (error) {
      console.error("Error updating UI with calculation results:", error);
      
      if (window.notificationManager) {
        window.notificationManager.error(`Error updating UI: ${error.message}`);
      }
    }
  }
  
  // Export results to CSV
  exportResultsToCSV() {
    if (!this.resultsAvailable) {
      if (window.notificationManager) {
        window.notificationManager.warn('No calculation results available to export');
      }
      return false;
    }
    
    try {
      const results = this.results;
      const vendors = Object.keys(window.vendorData);
      
      // Prepare CSV data
      let csvData = [
        ['Vendor', 'Initial Costs', 'Annual Costs', 'Migration Costs', 'Total TCO', 'Savings vs Current', 'Savings %']
      ];
      
      vendors.forEach(vendor => {
        if (!results[vendor]) return;
        
        csvData.push([
          window.vendorData[vendor].name,
          results[vendor].totalInitialCosts.toFixed(2),
          results[vendor].annualCosts.toFixed(2),
          results[vendor].migrationCost.toFixed(2),
          results[vendor].totalTCO.toFixed(2),
          results[vendor].totalSavings.toFixed(2),
          results[vendor].savingsPercentage.toFixed(2)
        ]);
      });
      
      // Create CSV content
      const csvContent = csvData.map(row => row.join(',')).join('\n');
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `nac-tco-comparison-${new Date().toISOString().slice(0, 10)}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      return true;
    } catch (error) {
      console.error('Error exporting results to CSV:', error);
      
      if (window.notificationManager) {
        window.notificationManager.error(`Error exporting to CSV: ${error.message}`);
      }
      
      return false;
    }
  }
  
  // Export detailed results as JSON
  exportResultsAsJSON() {
    if (!this.resultsAvailable) {
      if (window.notificationManager) {
        window.notificationManager.warn('No calculation results available to export');
      }
      return false;
    }
    
    try {
      const jsonData = JSON.stringify(this.results, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `nac-tco-detailed-results-${new Date().toISOString().slice(0, 10)}.json`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      return true;
    } catch (error) {
      console.error('Error exporting results as JSON:', error);
      
      if (window.notificationManager) {
        window.notificationManager.error(`Error exporting to JSON: ${error.message}`);
      }
      
      return false;
    }
  }
}
