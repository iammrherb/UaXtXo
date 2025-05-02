/**
 * Enhanced TCO Calculator for computing cost comparisons and ROI
 * Updated to support FortiNAC and SecureW2
 */

class Calculator {
  constructor() {
    this.results = null;
    this.resultsAvailable = false;
    this.isCalculating = false;
  }

  calculate() {
    // Prevent multiple calculations at once
    if (this.isCalculating) {
      console.log('Calculation already in progress');
      return null;
    }
    
    this.isCalculating = true;
    
    // Show loading indicator
    this.showLoading();
    
    try {
      if (!window.vendorData) {
        console.error("Vendor data not available");
        this.hideLoading();
        this.isCalculating = false;
        return null;
      }
      
      const currentVendor = window.uiController.activeVendor;
      const deviceCount = parseInt(document.getElementById('device-count').value) || 1000;
      const orgSize = document.getElementById('organization-size').value;
      const yearsToProject = parseInt(document.getElementById('years-to-project').value) || 3;
      
      console.log(`Calculating TCO for ${currentVendor}, ${deviceCount} devices, ${orgSize} org, ${yearsToProject} years`);
      
      // Calculate TCO for all vendors
      const tcoResults = {};
      const implementationResults = {};
      
      Object.keys(window.vendorData).forEach(vendor => {
  // This section will be replaced by the updated calculateVendorTCO function

  // This section will be replaced by the updated calculateVendorTCO function

  calculateImplementationTime(vendor, orgSize) {
    try {
      if (!window.vendorData[vendor] || !window.vendorData[vendor][orgSize] || !window.vendorData[vendor][orgSize].implementationTimeline) {
        return 0;
      }
      
      const vendorInfo = window.vendorData[vendor][orgSize];
      const timeline = vendorInfo.implementationTimeline;
      const complexityMultiplier = calculateComplexityMultiplier(vendor, window.vendorData[vendor].cloudBased);
      
      // Calculate total implementation time
      let totalDays = 0;
      for (const phase in timeline) {
        totalDays += timeline[phase];
      }
      
      return totalDays * complexityMultiplier;
    } catch (error) {
      console.error(`Error calculating implementation time for vendor ${vendor}:`, error);
      return 0;
    }
  }

  getMigrationFactor(fromVendor, toVendor) {
    // Use global migration factors if available
    if (window.migrationFactors && 
        window.migrationFactors[fromVendor] && 
        window.migrationFactors[fromVendor][toVendor]) {
      return window.migrationFactors[fromVendor][toVendor];
    }
    
    // Fallback to default migration factors
    return window.calculateMigrationFactor ? 
      window.calculateMigrationFactor(fromVendor, toVendor) : 0.5;
  }

  updateUI() {
    try {
      if (!this.results) return;
      
      // Update charts
      if (window.chartBuilder) {
        window.chartBuilder.updateTCOComparisonChart(this.results);
        window.chartBuilder.updateCumulativeCostChart(this.results);
        window.chartBuilder.updateBreakdownCharts(window.uiController.activeVendor, 'portnox');
        
        // Update new charts if they exist
        if (typeof window.chartBuilder.updateFeatureComparisonChart === 'function') {
          window.chartBuilder.updateFeatureComparisonChart(window.uiController.activeVendor);
        }
        
        if (typeof window.chartBuilder.updateImplementationComparisonChart === 'function') {
          window.chartBuilder.updateImplementationComparisonChart(this.results);
        }
        
        if (typeof window.chartBuilder.updateROIChart === 'function') {
          window.chartBuilder.updateROIChart(this.results);
        }
      }
      
      // Update TCO summary table
      if (window.uiController) {
        window.uiController.populateTCOSummaryTable(this.results);
        window.uiController.updatePortnoxAdvantageSection(this.results);
        
        // Update additional tables if implemented
        if (typeof window.uiController.updateAnnualCostsTable === 'function') {
          window.uiController.updateAnnualCostsTable(this.results);
        }
        
        if (typeof window.uiController.updateImplementationTable === 'function') {
          window.uiController.updateImplementationTable(this.results);
        }
      }
      
      // Show success message
      this.showSuccess("TCO calculation completed successfully");
    } catch (error) {
      console.error("Error updating UI with calculation results:", error);
      this.showError("Error updating results: " + error.message);
    }
  }
  
  // Show loading indicator
  showLoading() {
    const resultsContainer = document.querySelector('.results-container');
    if (!resultsContainer) return;
    
    // Check if loading overlay already exists
    let loadingOverlay = resultsContainer.querySelector('.loading-overlay');
    if (loadingOverlay) return;
    
    // Create loading overlay
    loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
      <div class="spinner"></div>
      <div class="loading-text">Calculating TCO...</div>
    `;
    
    resultsContainer.appendChild(loadingOverlay);
  }
  
  // Hide loading indicator
  hideLoading() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.parentNode.removeChild(loadingOverlay);
    }
  }
  
  // Show error message
  showError(message) {
    const messageContainer = document.getElementById('message-container');
    if (!messageContainer) return;
    
    messageContainer.innerHTML = `
      <div class="error-message-box">
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
        <button class="close-error"><i class="fas fa-times"></i></button>
      </div>
    `;
    
    // Add close button functionality
    const closeBtn = messageContainer.querySelector('.close-error');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        messageContainer.innerHTML = '';
      });
    }
  }
  
  // Show success message
  showSuccess(message) {
    const messageContainer = document.getElementById('message-container');
    if (!messageContainer) return;
    
    messageContainer.innerHTML = `
      <div class="success-message-box">
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
        <button class="close-error"><i class="fas fa-times"></i></button>
      </div>
    `;
    
    // Add close button functionality
    const closeBtn = messageContainer.querySelector('.close-error');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        messageContainer.innerHTML = '';
      });
    }
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      if (messageContainer.querySelector('.success-message-box')) {
        messageContainer.innerHTML = '';
      }
    }, 3000);
  }
}
