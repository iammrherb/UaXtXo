#!/bin/bash

# TCO Calculator Error Fix and Enhancement Script
# This script fixes the Maximum Call Stack Size Exceeded error and adds targeted enhancements

# Set up colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting TCO Calculator Fix and Enhancement Script...${NC}"

# Create a backup of current files
echo -e "\n${YELLOW}Creating backup of current files...${NC}"
BACKUP_DIR="backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR
cp -r js/* $BACKUP_DIR/ 2>/dev/null
cp -r css/* $BACKUP_DIR/ 2>/dev/null
cp index.html $BACKUP_DIR/ 2>/dev/null

echo -e "${GREEN}Backup created in $BACKUP_DIR${NC}"

# Create necessary directories if they don't exist
mkdir -p js/utils
mkdir -p js/components
mkdir -p js/charts
mkdir -p js/vendors
mkdir -p js/managers
mkdir -p css
mkdir -p img

# STEP 1: Fix DOMCache recursion issue
echo -e "\n${YELLOW}Fixing DOMCache recursion issue...${NC}"
cat > js/managers/dom-cache.js << 'EOL'
/**
 * Simple DOM cache to improve performance
 */
class DOMCache {
  constructor() {
    this.elements = {};
    this.initialized = false;
  }
  
  init() {
    if (this.initialized) return;
    
    // Set initialized flag FIRST to prevent recursion
    this.initialized = true;
    
    // Cache frequently accessed elements
    this.cacheElement('device-count');
    this.cacheElement('organization-size');
    this.cacheElement('years-to-project');
    this.cacheElement('multiple-locations');
    this.cacheElement('location-count');
    this.cacheElement('complex-authentication');
    this.cacheElement('legacy-devices');
    this.cacheElement('legacy-percentage');
    this.cacheElement('cloud-integration');
    this.cacheElement('custom-policies');
    this.cacheElement('policy-complexity');
    this.cacheElement('calculate-btn');
    this.cacheElement('results-container');
    this.cacheElement('tco-summary-table-body');
    this.cacheElement('annual-costs-table-body');
    this.cacheElement('implementation-table-body');
    this.cacheElement('portnox-savings-amount');
    this.cacheElement('portnox-savings-percentage');
    this.cacheElement('portnox-implementation-time');
    this.cacheElement('comparison-savings');
    this.cacheElement('comparison-implementation');
    this.cacheElement('legacy-percentage-value');
    
    // Cache vendor cards
    document.querySelectorAll('.vendor-card').forEach(card => {
      const vendor = card.getAttribute('data-vendor');
      if (vendor) {
        this.elements[`vendor-card-${vendor}`] = card;
      }
    });
    
    // Setup range input display AFTER all elements are cached
    this.setupRangeValueDisplay();
  }
  
  // Separated the setup function from init to avoid recursion
  setupRangeValueDisplay() {
    const rangeInput = document.getElementById('legacy-percentage');
    const valueDisplay = document.getElementById('legacy-percentage-value');
    
    if (rangeInput && valueDisplay) {
      // Set initial value
      valueDisplay.textContent = rangeInput.value + '%';
      
      // Update value on input
      rangeInput.addEventListener('input', () => {
        valueDisplay.textContent = rangeInput.value + '%';
      });
    }
  }
  
  cacheElement(id) {
    const element = document.getElementById(id);
    if (element) {
      this.elements[id] = element;
    }
  }
  
  get(id) {
    // If not initialized, initialize first
    if (!this.initialized) {
      this.init();
    }
    
    // Return cached element if available
    if (this.elements[id]) {
      return this.elements[id];
    }
    
    // If not cached, try to get and cache it
    this.cacheElement(id);
    return this.elements[id];
  }
  
  // Helper methods for common operations
  getInputValue(id) {
    const element = this.get(id);
    if (!element) return null;
    
    if (element.type === 'checkbox') {
      return element.checked;
    } else if (element.type === 'number') {
      return parseFloat(element.value) || 0;
    } else {
      return element.value;
    }
  }
  
  setInputValue(id, value) {
    const element = this.get(id);
    if (!element) return;
    
    if (element.type === 'checkbox') {
      element.checked = Boolean(value);
    } else {
      element.value = value;
    }
  }
}
EOL

echo -e "${GREEN}DOMCache fixed successfully${NC}"

# STEP 2: Update main.js to properly initialize components
echo -e "\n${YELLOW}Updating main.js with proper initialization...${NC}"
cat > js/main.js << 'EOL'
/**
 * Main JavaScript file for the TCO Calculator
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing TCO Calculator...');
  
  try {
    // Initialize DOM Cache first to prevent conflicts
    window.domCache = new DOMCache();
    window.domCache.init();
    console.log('DOM Cache initialized');
    
    // Initialize UI Controller
    window.uiController = new UIController();
    console.log('UI Controller initialized');
    
    // Initialize Chart Builder
    window.chartBuilder = new ChartBuilder();
    window.chartBuilder.initCharts();
    console.log('Chart Builder initialized');
    
    // Initialize Calculator
    window.calculator = new Calculator();
    console.log('Calculator initialized');
    
    // Set default active vendor
    window.uiController.setActiveVendor('cisco');
    console.log('Active vendor set to Cisco');
    
    // Add calculate button event listener
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', function() {
        console.log('Calculate button clicked');
        window.calculator.calculate();
      });
    }
    
    // Add export button listeners
    initExportButtons();
    
    // Pre-calculate for initial state after a delay to ensure DOM is ready
    setTimeout(() => {
      try {
        console.log('Running initial calculation...');
        window.calculator.calculate();
        console.log('Initial calculation completed');
      } catch (err) {
        console.error('Error during initial calculation:', err);
        showError('Error calculating TCO. Please try again.');
      }
    }, 800); // Increased delay for better reliability
    
    console.log('TCO Calculator initialized and ready');
    
    // Add debug info after 1 second
    setTimeout(addDebugInfo, 1000);
  } catch (error) {
    console.error('Error initializing TCO Calculator:', error);
    showError('Error initializing calculator. Please refresh the page.');
  }
});

// Function to initialize export buttons
function initExportButtons() {
  const exportCsvBtn = document.getElementById('export-csv-btn');
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', function() {
      if (window.uiController && typeof window.uiController.exportToCSV === 'function') {
        window.uiController.exportToCSV();
      } else {
        alert('Export to CSV functionality is not available');
      }
    });
  }
  
  const exportPdfBtn = document.getElementById('export-pdf-btn');
  if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', function() {
      if (window.uiController && typeof window.uiController.exportToPDF === 'function') {
        window.uiController.exportToPDF();
      } else {
        alert('Export to PDF functionality is not available');
      }
    });
  }
}

// Function to show an error message
function showError(message) {
  const messageContainer = document.getElementById('message-container');
  if (messageContainer) {
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
}

// Add initialization info to the UI for debugging
function addDebugInfo() {
  try {
    const resultsContainer = document.querySelector('.results-container');
    if (!resultsContainer) return;
    
    const debugInfo = document.createElement('div');
    debugInfo.id = 'debug-info';
    debugInfo.style.display = 'none';
    debugInfo.style.padding = '10px';
    debugInfo.style.margin = '10px';
    debugInfo.style.border = '1px solid #ccc';
    debugInfo.style.borderRadius = '4px';
    debugInfo.style.backgroundColor = '#f9f9f9';
    
    debugInfo.innerHTML = `
      <h3>Debug Information</h3>
      <p>DOM Cache: ${window.domCache ? 'Initialized' : 'Not initialized'}</p>
      <p>UI Controller: ${window.uiController ? 'Initialized' : 'Not initialized'}</p>
      <p>Chart Builder: ${window.chartBuilder ? 'Initialized' : 'Not initialized'}</p>
      <p>Calculator: ${window.calculator ? 'Initialized' : 'Not initialized'}</p>
      <p>Active Vendor: ${window.uiController?.activeVendor || 'None'}</p>
      <p>Calculation Results: ${window.calculator?.resultsAvailable ? 'Available' : 'Not available'}</p>
      <p>Browser: ${navigator.userAgent}</p>
      <button id="refresh-debug" class="btn btn-outline">Refresh Debug Info</button>
    `;
    
    resultsContainer.appendChild(debugInfo);
    
    // Add refresh button functionality
    const refreshBtn = document.getElementById('refresh-debug');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', function() {
        const debugInfo = document.getElementById('debug-info');
        if (debugInfo) {
          debugInfo.innerHTML = `
            <h3>Debug Information</h3>
            <p>DOM Cache: ${window.domCache ? 'Initialized' : 'Not initialized'}</p>
            <p>UI Controller: ${window.uiController ? 'Initialized' : 'Not initialized'}</p>
            <p>Chart Builder: ${window.chartBuilder ? 'Initialized' : 'Not initialized'}</p>
            <p>Calculator: ${window.calculator ? 'Initialized' : 'Not initialized'}</p>
            <p>Active Vendor: ${window.uiController?.activeVendor || 'None'}</p>
            <p>Calculation Results: ${window.calculator?.resultsAvailable ? 'Available' : 'Not available'}</p>
            <p>Browser: ${navigator.userAgent}</p>
            <button id="refresh-debug" class="btn btn-outline">Refresh Debug Info</button>
          `;
          
          // Re-add click event
          document.getElementById('refresh-debug').addEventListener('click', arguments.callee);
        }
      });
    }
    
    // Add debug toggle to footer
    const footer = document.querySelector('.footer-links');
    if (footer) {
      const debugLink = document.createElement('a');
      debugLink.href = '#';
      debugLink.textContent = 'Debug Info';
      debugLink.addEventListener('click', function(e) {
        e.preventDefault();
        const debugInfo = document.getElementById('debug-info');
        if (debugInfo) {
          debugInfo.style.display = debugInfo.style.display === 'none' ? 'block' : 'none';
        }
      });
      
      footer.appendChild(debugLink);
    }
  } catch (err) {
    console.error('Error adding debug info:', err);
  }
}
EOL

echo -e "${GREEN}main.js updated successfully${NC}"

# STEP 3: Add error message styling to CSS
echo -e "\n${YELLOW}Adding error message styling to CSS...${NC}"
cat >> css/styles.css << 'EOL'

/* Error message styling */
#message-container {
    margin-bottom: var(--spacing-md);
}

.error-message-box {
    background-color: rgba(181, 67, 105, 0.1);
    border-left: 4px solid var(--danger-color);
    padding: var(--spacing-md);
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-md);
}

.error-message-box i {
    color: var(--danger-color);
    margin-right: var(--spacing-sm);
    font-size: 1.2rem;
}

.error-message-box span {
    flex: 1;
    color: var(--danger-color);
}

.close-error {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: var(--spacing-xs);
}

.close-error:hover {
    color: var(--text-primary);
}

/* Success message */
.success-message-box {
    background-color: rgba(43, 210, 91, 0.1);
    border-left: 4px solid var(--accent-color);
    padding: var(--spacing-md);
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-md);
}

.success-message-box i {
    color: var(--accent-color);
    margin-right: var(--spacing-sm);
    font-size: 1.2rem;
}

.success-message-box span {
    flex: 1;
    color: var(--accent-dark);
}

/* Debug info styling */
#debug-info {
    margin-top: var(--spacing-md);
    background-color: var(--bg-light);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
}

#debug-info h3 {
    margin-bottom: var(--spacing-md);
    font-size: 1.1rem;
}

#debug-info p {
    font-family: monospace;
    margin-bottom: var(--spacing-xs);
}

#debug-info button {
    margin-top: var(--spacing-md);
}

/* Enhanced vendor cards */
.vendor-card {
    transition: all 0.2s ease-in-out;
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-sm);
}

.vendor-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.vendor-card.active {
    transform: translateY(-2px);
    border-color: var(--primary-color);
    background-color: rgba(27, 103, 178, 0.05);
    box-shadow: var(--shadow-md);
}

/* Loading indicator */
.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top-color: var(--accent-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: var(--spacing-md);
}

.loading-text {
    color: var(--text-secondary);
    font-size: 0.9rem;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* Enhanced mobile responsiveness */
@media (max-width: 768px) {
    .tab-button {
        padding: var(--spacing-sm) var(--spacing-md);
        font-size: 0.9rem;
    }
    
    .chart-container {
        height: 300px;
    }
    
    .result-card h3 {
        font-size: 1rem;
    }
    
    .metric-value {
        font-size: 1.2rem;
    }
}

@media (max-width: 480px) {
    .calculator-container {
        padding: var(--spacing-sm);
        gap: var(--spacing-md);
    }
    
    .vendor-options {
        grid-template-columns: 1fr;
    }
    
    .results-grid {
        grid-template-columns: 1fr;
    }
    
    .chart-container {
        height: 250px;
    }
}
EOL

echo -e "${GREEN}CSS styles added successfully${NC}"

# STEP 4: Create a loading indicator function and update Calculator.js
echo -e "\n${YELLOW}Updating Calculator.js to show loading indicator...${NC}"
cat > js/components/calculator.js << 'EOL'
/**
 * TCO Calculator for computing cost comparisons and ROI
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
      
      // Hide loading indicator
      this.hideLoading();
      this.isCalculating = false;
      
      return tcoResults;
    } catch (error) {
      console.error("Error in calculator.calculate():", error);
      
      // Hide loading indicator
      this.hideLoading();
      this.isCalculating = false;
      
      // Show error message
      this.showError("Error calculating TCO: " + error.message);
      
      return null;
    }
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
      const complexityMultiplier = calculateComplexityMultiplier(vendor, window.vendorData[vendor].cloudBased);
      
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
        const currentVendorInfo = window.vendorData[currentVendor][orgSize];
        const currentComplexity = calculateComplexityMultiplier(currentVendor, window.vendorData[currentVendor].cloudBased);
        
        const currentInitial = (currentVendorInfo.initialHardware + currentVendorInfo.networkRedesign + 
                              currentVendorInfo.implementation + currentVendorInfo.training) * currentComplexity;
        
        const currentAnnual = (currentVendorInfo.annualMaintenance + currentVendorInfo.annualLicensing + 
                              calculateFTECosts(currentVendorInfo.fteAllocation) + 
                              currentVendorInfo.annualDowntime * 5000) * currentComplexity;
        
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
        costBreakdown
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
        }
      };
    }
  }

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

  updateUI() {
    try {
      if (!this.results) return;
      
      // Update charts
      if (window.chartBuilder) {
        window.chartBuilder.updateTCOComparisonChart(this.results);
        window.chartBuilder.updateCumulativeCostChart(this.results);
        window.chartBuilder.updateBreakdownCharts(window.uiController.activeVendor, 'portnox');
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
EOL

echo -e "${GREEN}Calculator.js updated successfully${NC}"

# STEP 5: Update UI Controller with additional table functionality
echo -e "\n${YELLOW}Updating UI Controller with enhanced functionality...${NC}"
cat > js/components/ui-controller.js << 'EOL'
/**
 * UI Controller for managing interface elements and user interactions
 */

class UIController {
  constructor() {
    this.activeVendor = null;
    this.init();
  }
  
  init() {
    // Initialize vendor selection
    document.querySelectorAll('.vendor-card').forEach(card => {
      const vendor = card.getAttribute('data-vendor');
      
      if (!vendor) return;
      
      // Add click event listener
      card.addEventListener('click', () => {
        this.setActiveVendor(vendor);
      });
      
      // Add keyboard accessibility
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-pressed', 'false');
      
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.setActiveVendor(vendor);
        }
      });
    });
    
    // Initialize advanced options toggle
    const advancedOptionsToggle = document.querySelector('.advanced-options-toggle button');
    const advancedOptionsPanel = document.getElementById('advanced-options-panel');
    
    if (advancedOptionsToggle && advancedOptionsPanel) {
      advancedOptionsToggle.addEventListener('click', () => {
        toggleVisibility('advanced-options-panel');
        
        // Update the icon
        const icon = advancedOptionsToggle.querySelector('i');
        if (icon) {
          if (advancedOptionsPanel.classList.contains('hidden')) {
            icon.className = 'fas fa-angle-down';
          } else {
            icon.className = 'fas fa-angle-up';
          }
        }
      });
    }
    
    // Initialize tab navigation
    document.querySelectorAll('.tab-button').forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        if (tabId) {
          window.setActiveTab(tabId);
        }
      });
    });
    
    // Initialize sub-tab navigation
    document.querySelectorAll('.sub-tab-button').forEach(button => {
      button.addEventListener('click', () => {
        const subtabId = button.getAttribute('data-subtab');
        if (subtabId) {
          window.setActiveSubTab(subtabId);
        }
      });
    });
    
    // Initialize range input value displays
    document.getElementById('legacy-percentage')?.addEventListener('input', (e) => {
      const value = e.target.value;
      document.getElementById('legacy-percentage-value').textContent = `${value}%`;
    });
    
    // Initialize conditional displays
    document.getElementById('multiple-locations')?.addEventListener('change', function() {
      const locationCountInput = document.getElementById('location-count').closest('.input-group');
      locationCountInput.style.display = this.checked ? 'block' : 'none';
    });
    
    document.getElementById('legacy-devices')?.addEventListener('change', function() {
      const legacyPercentageInput = document.getElementById('legacy-percentage').closest('.input-group');
      legacyPercentageInput.style.display = this.checked ? 'block' : 'none';
    });
    
    document.getElementById('custom-policies')?.addEventListener('change', function() {
      const policyComplexityInput = document.getElementById('policy-complexity').closest('.input-group');
      policyComplexityInput.style.display = this.checked ? 'block' : 'none';
    });
    
    // Set initial states for conditional inputs
    const multipleLocations = document.getElementById('multiple-locations');
    if (multipleLocations) {
      const locationCountInput = document.getElementById('location-count').closest('.input-group');
      locationCountInput.style.display = multipleLocations.checked ? 'block' : 'none';
    }
    
    const legacyDevices = document.getElementById('legacy-devices');
    if (legacyDevices) {
      const legacyPercentageInput = document.getElementById('legacy-percentage').closest('.input-group');
      legacyPercentageInput.style.display = legacyDevices.checked ? 'block' : 'none';
    }
    
    const customPolicies = document.getElementById('custom-policies');
    if (customPolicies) {
      const policyComplexityInput = document.getElementById('policy-complexity').closest('.input-group');
      policyComplexityInput.style.display = customPolicies.checked ? 'block' : 'none';
    }
  }
  
  setActiveVendor(vendor) {
    if (this.activeVendor === vendor) return;
    
    this.activeVendor = vendor;
    
    // Update vendor cards UI
    document.querySelectorAll('.vendor-card').forEach(card => {
      const cardVendor = card.getAttribute('data-vendor');
      
      if (cardVendor === vendor) {
        card.classList.add('active');
        card.setAttribute('aria-pressed', 'true');
      } else {
        card.classList.remove('active');
        card.setAttribute('aria-pressed', 'false');
      }
    });
    
    // Update charts if results are available
    if (window.chartBuilder && window.calculator && window.calculator.resultsAvailable) {
      window.chartBuilder.updateBreakdownCharts(vendor, 'portnox');
    }
    
    // Update comparison section
    this.updatePortnoxAdvantageSection();
    
    // Recalculate if results are available
    if (window.calculator && window.calculator.resultsAvailable) {
      window.calculator.calculate();
    }
  }
  
  populateTCOSummaryTable(results) {
    if (!results) return;
    
    const tableBody = document.getElementById('tco-summary-table-body');
    if (!tableBody) return;
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Get vendors
    const vendors = Object.keys(window.vendorData || {});
    if (!vendors.length) return;
    
    // Create rows for each vendor
    vendors.forEach(vendor => {
      if (!results[vendor]) return;
      
      const vendorName = window.vendorData[vendor].name;
      const initialCosts = results[vendor].totalInitialCosts;
      const annualCosts = results[vendor].annualCosts;
      const migrationCost = results[vendor].migrationCost || 0;
      const totalTCO = results[vendor].totalTCO;
      
      // Create row element
      const row = document.createElement('tr');
      
      // Add classes for highlighting
      if (vendor === this.activeVendor) {
        row.classList.add('current-vendor');
      }
      
      if (vendor === 'portnox') {
        row.classList.add('portnox-vendor');
      }
      
      // Populate cells
      row.innerHTML = `
        <td>${vendorName}</td>
        <td>${window.formatCurrency(initialCosts)}</td>
        <td>${window.formatCurrency(annualCosts)}/year</td>
        <td>${window.formatCurrency(migrationCost)}</td>
        <td>${window.formatCurrency(totalTCO)}</td>
      `;
      
      // Add to table
      tableBody.appendChild(row);
    });
  }
  
  updatePortnoxAdvantageSection(results) {
    if (!results) {
      if (!window.calculator || !window.calculator.results) return;
      results = window.calculator.results;
    }
    
    if (this.activeVendor === 'portnox') {
      document.querySelectorAll('.portnox-spotlight, .comparison-highlight-card').forEach(element => {
        element.classList.add('hidden');
      });
      return;
    } else {
      document.querySelectorAll('.portnox-spotlight, .comparison-highlight-card').forEach(element => {
        element.classList.remove('hidden');
      });
    }
    
    if (!results[this.activeVendor] || !results['portnox']) return;
    
    // Calculate savings
    const totalSavings = results['portnox'].totalSavings;
    const savingsPercentage = results['portnox'].savingsPercentage;
    
    // Update savings display
    const savingsAmountElement = document.getElementById('portnox-savings-amount');
    if (savingsAmountElement) {
      savingsAmountElement.textContent = window.formatCurrency(totalSavings);
    }
    
    const savingsPercentageElement = document.getElementById('portnox-savings-percentage');
    if (savingsPercentageElement) {
      savingsPercentageElement.textContent = `${savingsPercentage.toFixed(1)}%`;
    }
    
    // Calculate implementation time savings
    const implementationResults = results.implementationResults;
    
    if (implementationResults && implementationResults[this.activeVendor] && implementationResults['portnox']) {
      const currentImplementation = implementationResults[this.activeVendor];
      const portnoxImplementation = implementationResults['portnox'];
      
      const timeSavings = currentImplementation - portnoxImplementation;
      const timeSavingsPercentage = currentImplementation > 0 
        ? (timeSavings / currentImplementation) * 100 
        : 0;
      
      const implementationTimeElement = document.getElementById('portnox-implementation-time');
      if (implementationTimeElement) {
        implementationTimeElement.textContent = `${timeSavingsPercentage.toFixed(1)}%`;
      }
    }
    
    // Update comparison section
    const comparisonSavingsElement = document.getElementById('comparison-savings');
    if (comparisonSavingsElement) {
      comparisonSavingsElement.textContent = window.formatCurrency(totalSavings);
    }
    
    const savingsProgressBar = document.querySelector('.comparison-metrics:first-child .progress');
    if (savingsProgressBar) {
      savingsProgressBar.style.width = `${Math.min(100, savingsPercentage)}%`;
    }
    
    const savingsProgressLabels = document.querySelector('.comparison-metrics:first-child .progress-labels');
    if (savingsProgressLabels) {
      savingsProgressLabels.innerHTML = `
        <span>0%</span>
        <span>${savingsPercentage.toFixed(1)}% Savings</span>
      `;
    }
    
    // Update implementation progress
    if (implementationResults && implementationResults[this.activeVendor] && implementationResults['portnox']) {
      const currentImplementation = implementationResults[this.activeVendor];
      const portnoxImplementation = implementationResults['portnox'];
      
      const timeSavings = currentImplementation - portnoxImplementation;
      const timeSavingsPercentage = currentImplementation > 0 
        ? (timeSavings / currentImplementation) * 100 
        : 0;
      
      const comparisonImplementationElement = document.getElementById('comparison-implementation');
      if (comparisonImplementationElement) {
        comparisonImplementationElement.textContent = `${timeSavingsPercentage.toFixed(1)}%`;
      }
      
      const implementationProgressBar = document.querySelector('.comparison-metrics:nth-child(2) .progress');
      if (implementationProgressBar) {
        implementationProgressBar.style.width = `${Math.min(100, timeSavingsPercentage)}%`;
      }
      
      const implementationProgressLabels = document.querySelector('.comparison-metrics:nth-child(2) .progress-labels');
      if (implementationProgressLabels) {
        implementationProgressLabels.innerHTML = `
          <span>0%</span>
          <span>${timeSavingsPercentage.toFixed(1)}% Faster</span>
        `;
      }
    }
  }
  
  // Update annual costs table
  updateAnnualCostsTable(results) {
    if (!results) return;
    
    const tableBody = document.getElementById('annual-costs-table-body');
    if (!tableBody) return;
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Get current vendor and portnox data
    const currentVendor = this.activeVendor;
    
    if (!results[currentVendor] || !results['portnox']) return;
    
    // Cost categories
    const categories = [
      { id: 'maintenance', name: 'Maintenance' },
      { id: 'licensing', name: 'Licensing' },
      { id: 'personnel', name: 'Personnel' },
      { id: 'downtime', name: 'Downtime Costs' },
      { id: 'total', name: 'Total Annual Costs' }
    ];
    
    // Calculate annual costs
    const currentAnnual = {
      maintenance: results[currentVendor].costBreakdown.maintenance / results.yearsToProject,
      licensing: results[currentVendor].costBreakdown.licensing / results.yearsToProject,
      personnel: results[currentVendor].costBreakdown.personnel / results.yearsToProject,
      downtime: results[currentVendor].costBreakdown.downtime / results.yearsToProject
    };
    
    const portnoxAnnual = {
      maintenance: results['portnox'].costBreakdown.maintenance / results.yearsToProject,
      licensing: results['portnox'].costBreakdown.licensing / results.yearsToProject,
      personnel: results['portnox'].costBreakdown.personnel / results.yearsToProject,
      downtime: results['portnox'].costBreakdown.downtime / results.yearsToProject
    };
    
    // Calculate totals
    currentAnnual.total = currentAnnual.maintenance + currentAnnual.licensing + 
                          currentAnnual.personnel + currentAnnual.downtime;
    
    portnoxAnnual.total = portnoxAnnual.maintenance + portnoxAnnual.licensing + 
                           portnoxAnnual.personnel + portnoxAnnual.downtime;
    
    // Create rows
    categories.forEach(category => {
      const current = currentAnnual[category.id];
      const portnox = portnoxAnnual[category.id];
      const savings = current - portnox;
      const savingsPercentage = current > 0 ? (savings / current) * 100 : 0;
      
      // Create row
      const row = document.createElement('tr');
      
      // Add classes for total row
      if (category.id === 'total') {
        row.classList.add('total-row');
      }
      
      // Add classes for savings
      const savingsClass = savings > 0 ? 'positive-savings' : (savings < 0 ? 'negative-savings' : '');
      
      // Populate cells
      row.innerHTML = `
        <td>${category.name}</td>
        <td>${window.formatCurrency(current)}</td>
        <td>${window.formatCurrency(portnox)}</td>
        <td class="${savingsClass}">${window.formatCurrency(savings)} (${savingsPercentage.toFixed(1)}%)</td>
      `;
      
      // Add to table
      tableBody.appendChild(row);
    });
  }
  
  // Update implementation table
  updateImplementationTable(results) {
    if (!results) return;
    
    const tableBody = document.getElementById('implementation-table-body');
    if (!tableBody) return;
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Get implementation data
    const implementationResults = results.implementationResults;
    if (!implementationResults) return;
    
    const currentVendor = this.activeVendor;
    
    if (!implementationResults[currentVendor] || !implementationResults['portnox']) return;
    
    const currentImplementation = implementationResults[currentVendor];
    const portnoxImplementation = implementationResults['portnox'];
    
    // Add total row
    const row = document.createElement('tr');
    
    // Format values
    const currentDays = currentImplementation;
    const portnoxDays = portnoxImplementation;
    const timeSavings = currentDays - portnoxDays;
    const savingsPercentage = currentDays > 0 ? (timeSavings / currentDays) * 100 : 0;
    
    // Add classes for savings
    const savingsClass = timeSavings > 0 ? 'positive-savings' : (timeSavings < 0 ? 'negative-savings' : '');
    
    // Populate cells
    row.innerHTML = `
      <td>Total Implementation Time</td>
      <td>${currentDays.toFixed(1)} days</td>
      <td>${portnoxDays.toFixed(1)} days</td>
      <td class="${savingsClass}">${timeSavings.toFixed(1)} days (${savingsPercentage.toFixed(1)}%)</td>
    `;
    
    // Add to table
    tableBody.appendChild(row);
  }
  
  // Export to CSV
  exportToCSV() {
    if (!window.calculator || !window.calculator.resultsAvailable) {
      alert('No calculation results to export. Please calculate TCO first.');
      return;
    }
    
    try {
      const results = window.calculator.results;
      const vendors = Object.keys(window.vendorData);
      
      // Prepare CSV data
      let csvData = "Vendor,Initial Costs,Annual Costs,Migration Costs,Total TCO,Savings vs Current,Savings %\n";
      
      vendors.forEach(vendor => {
        if (!results[vendor]) return;
        
        const row = [
          window.vendorData[vendor].name,
          results[vendor].totalInitialCosts.toFixed(2),
          results[vendor].annualCosts.toFixed(2),
          results[vendor].migrationCost ? results[vendor].migrationCost.toFixed(2) : '0.00',
          results[vendor].totalTCO.toFixed(2),
          results[vendor].totalSavings ? results[vendor].totalSavings.toFixed(2) : '0.00',
          results[vendor].savingsPercentage ? results[vendor].savingsPercentage.toFixed(2) : '0.00'
        ];
        
        csvData += row.join(',') + '\n';
      });
      
      // Create download link
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'tco_comparison.csv');
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      this.showSuccess('CSV file exported successfully');
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      this.showError('Error exporting to CSV: ' + error.message);
    }
  }
  
  // Export to PDF - placeholder
  exportToPDF() {
    alert('PDF export functionality is not available yet.');
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
}
EOL

echo -e "${GREEN}UI Controller updated successfully${NC}"

# STEP 6: Update HTML with message container
echo -e "\n${YELLOW}Updating HTML with message container...${NC}"
# Check if index.html exists and modify it
if [ -f "index.html" ]; then
    # Update Message Container
    sed -i 's/<div class="tab-content">/<div class="tab-content">\n                    <div id="message-container"><\/div>/g' index.html 2>/dev/null
    # For macOS compatibility
    sed -i '' 's/<div class="tab-content">/<div class="tab-content">\n                    <div id="message-container"><\/div>/g' index.html 2>/dev/null
    
    # Add DOMCache script
    sed -i 's/<script src="js\/utils\/helpers.js"><\/script>/<script src="js\/utils\/helpers.js"><\/script>\n    <script src="js\/managers\/dom-cache.js"><\/script>/g' index.html 2>/dev/null
    # For macOS compatibility
    sed -i '' 's/<script src="js\/utils\/helpers.js"><\/script>/<script src="js\/utils\/helpers.js"><\/script>\n    <script src="js\/managers\/dom-cache.js"><\/script>/g' index.html 2>/dev/null
    
    echo -e "${GREEN}HTML updated successfully${NC}"
else
    echo -e "${YELLOW}index.html not found, creating a new one...${NC}"
    
    cat > index.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NAC Solution TCO Calculator</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div class="app-container">
        <header class="app-header">
            <div class="logo">
                <img src="img/portnox-logo.png" alt="Portnox Logo">
                <h1>NAC Solution TCO Calculator</h1>
            </div>
            <div class="header-actions">
                <a href="#" class="btn btn-outline">Sensitivity Analysis</a>
            </div>
        </header>
        
        <div class="calculator-container">
            <div class="sidebar">
                <div class="vendor-selection-card">
                    <h3>Current NAC Solution</h3>
                    <div class="vendor-options">
                        <div class="vendor-card" data-vendor="cisco">
                            <img src="img/cisco-logo.png" alt="Cisco">
                            <span>Cisco ISE</span>
                        </div>
                        <div class="vendor-card" data-vendor="aruba">
                            <img src="img/aruba-logo.png" alt="Aruba">
                            <span>Aruba ClearPass</span>
                        </div>
                        <div class="vendor-card" data-vendor="forescout">
                            <img src="img/forescout-logo.png" alt="Forescout">
                            <span>Forescout</span>
                        </div>
                        <div class="vendor-card" data-vendor="nps">
                            <img src="img/microsoft-logo.png" alt="Microsoft">
                            <span>Microsoft NPS</span>
                        </div>
                    </div>
                </div>
                
                <div class="organization-inputs">
                    <h3>Organization Details</h3>
                    <div class="input-group">
                        <label for="organization-size">Organization Size</label>
                        <select id="organization-size">
                            <option value="small">Small (500-1000 endpoints)</option>
                            <option value="medium" selected>Medium (1000-5000 endpoints)</option>
                            <option value="large">Large (5000+ endpoints)</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label for="device-count">Number of Devices</label>
                        <input type="number" id="device-count" value="2500" min="100">
                    </div>
                    <div class="input-group">
                        <label for="years-to-project">Years to Project</label>
                        <input type="number" id="years-to-project" value="3" min="1" max="10">
                    </div>
                    
                    <div class="advanced-options-toggle">
                        <button class="btn btn-text">Advanced Options <i class="fas fa-angle-down"></i></button>
                    </div>
                    
                    <div id="advanced-options-panel" class="advanced-options-panel hidden">
                        <div class="input-group checkbox-group">
                            <input type="checkbox" id="multiple-locations">
                            <label for="multiple-locations">Multiple Locations</label>
                        </div>
                        
                        <div class="input-group">
                            <label for="location-count">Number of Locations</label>
                            <input type="number" id="location-count" value="3" min="1">
                        </div>
                        
                        <div class="input-group checkbox-group">
                            <input type="checkbox" id="complex-authentication">
                            <label for="complex-authentication">Complex Authentication</label>
                        </div>
                        
                        <div class="input-group checkbox-group">
                            <input type="checkbox" id="legacy-devices">
                            <label for="legacy-devices">Legacy Devices</label>
                        </div>
                        
                        <div class="input-group">
                            <label for="legacy-percentage">Legacy Device Percentage</label>
                            <div class="range-container">
                                <input type="range" id="legacy-percentage" min="0" max="100" value="30">
                                <span id="legacy-percentage-value">30%</span>
                            </div>
                        </div>
                        
                        <div class="input-group checkbox-group">
                            <input type="checkbox" id="cloud-integration">
                            <label for="cloud-integration">Cloud Integration</label>
                        </div>
                        
                        <div class="input-group checkbox-group">
                            <input type="checkbox" id="custom-policies">
                            <label for="custom-policies">Custom Policies</label>
                        </div>
                        
                        <div class="input-group">
                            <label for="policy-complexity">Policy Complexity</label>
                            <select id="policy-complexity">
                                <option value="low">Low</option>
                                <option value="medium" selected>Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                    
                    <button id="calculate-btn" class="btn btn-primary">Calculate TCO</button>
                </div>
                
                <div class="portnox-spotlight">
                    <h3>Portnox Cloud Advantage</h3>
                    <p>Portnox Cloud offers a zero-hardware, cloud-native NAC solution that dramatically reduces implementation time and ongoing maintenance costs.</p>
                    
                    <div class="potential-savings-container">
                        <div class="savings-metric">
                            <label>Potential Savings:</label>
                            <span id="portnox-savings-amount" class="savings-amount">$0</span>
                        </div>
                        <div class="savings-metric">
                            <label>Savings Percentage:</label>
                            <span id="portnox-savings-percentage" class="savings-amount">0.0%</span>
                        </div>
                        <div class="savings-metric">
                            <label>Implementation Time Reduction:</label>
                            <span id="portnox-implementation-time" class="savings-amount">0.0%</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="results-container">
                <div class="tabs">
                    <button class="tab-button active" data-tab="comparison-tab">Comparison</button>
                    <button class="tab-button" data-tab="details-tab">Details</button>
                    <button class="tab-button" data-tab="implementation-tab">Implementation</button>
                </div>
                
                <div class="tab-content">
                    <div id="message-container"></div>
                    
                    <div class="export-options">
                        <button id="export-csv-btn" class="btn btn-outline"><i class="fas fa-file-csv"></i> Export CSV</button>
                        <button id="export-pdf-btn" class="btn btn-outline"><i class="fas fa-file-pdf"></i> Export PDF</button>
                    </div>
                    
                    <div id="comparison-tab" class="tab-pane active">
                        <div class="results-grid">
                            <div class="result-card">
                                <h3>Total Cost of Ownership</h3>
                                <div class="chart-container">
                                    <canvas id="tco-comparison-chart"></canvas>
                                </div>
                            </div>
                            <div class="result-card">
                                <h3>Cumulative Costs Over Time</h3>
                                <div class="chart-container">
                                    <canvas id="cumulative-cost-chart"></canvas>
                                </div>
                            </div>
                        </div>
                        
                        <div class="result-card">
                            <h3>TCO Summary</h3>
                            <div class="table-container">
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>Vendor</th>
                                            <th>Initial Costs</th>
                                            <th>Annual Costs</th>
                                            <th>Migration Costs</th>
                                            <th>Total TCO</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tco-summary-table-body">
                                        <!-- Populated by JavaScript -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div class="comparison-highlight-card">
                            <h3>Why Portnox Cloud?</h3>
                            
                            <div class="comparison-metrics">
                                <div class="metric-container">
                                    <span class="metric-label">Cost Savings vs Current Solution</span>
                                    <span id="comparison-savings" class="metric-value">$0</span>
                                    <div class="progress-bar">
                                        <div class="progress" style="width: 0%"></div>
                                    </div>
                                    <div class="progress-labels">
                                        <span>0%</span>
                                        <span>0% Savings</span>
                                    </div>
                                </div>
                                
                                <div class="metric-container">
                                    <span class="metric-label">Implementation Time Reduction</span>
                                    <span id="comparison-implementation" class="metric-value">0%</span>
                                    <div class="progress-bar">
                                        <div class="progress" style="width: 0%"></div>
                                    </div>
                                    <div class="progress-labels">
                                        <span>0%</span>
                                        <span>0% Faster</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="key-benefits">
                                <h4>Key Benefits</h4>
                                <div class="benefits-grid">
                                    <div class="benefit-card">
                                        <div class="benefit-icon"><i class="fas fa-coins"></i></div>
                                        <div class="benefit-content">
                                            <h5>Zero Hardware Costs</h5>
                                            <p>Cloud-native solution eliminates infrastructure expenses</p>
                                            <span class="benefit-metric">100% hardware savings</span>
                                        </div>
                                    </div>
                                    
                                    <div class="benefit-card">
                                        <div class="benefit-icon"><i class="fas fa-rocket"></i></div>
                                        <div class="benefit-content">
                                            <h5>Rapid Deployment</h5>
                                            <p>Get up and running in days instead of months</p>
                                            <span class="benefit-metric">75% faster implementation</span>
                                        </div>
                                    </div>
                                    
                                    <div class="benefit-card">
                                        <div class="benefit-icon"><i class="fas fa-user-cog"></i></div>
                                        <div class="benefit-content">
                                            <h5>Lower IT Burden</h5>
                                            <p>Reduce administrative overhead significantly</p>
                                            <span class="benefit-metric">80% less staff time</span>
                                        </div>
                                    </div>
                                    
                                    <div class="benefit-card">
                                        <div class="benefit-icon"><i class="fas fa-cloud-upload-alt"></i></div>
                                        <div class="benefit-content">
                                            <h5>Automatic Updates</h5>
                                            <p>Always up-to-date without maintenance windows</p>
                                            <span class="benefit-metric">Zero downtime updates</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="details-tab" class="tab-pane">
                        <div class="sub-tabs">
                            <button class="sub-tab-button active" data-subtab="cost-breakdown">Cost Breakdown</button>
                            <button class="sub-tab-button" data-subtab="annual-costs">Annual Costs</button>
                        </div>
                        
                        <div id="cost-breakdown" class="sub-tab-pane active">
                            <div class="results-grid">
                                <div class="result-card">
                                    <h3>Current Solution Cost Breakdown</h3>
                                    <div class="chart-container">
                                        <canvas id="current-breakdown-chart"></canvas>
                                    </div>
                                </div>
                                <div class="result-card">
                                    <h3>Portnox Cloud Cost Breakdown</h3>
                                    <div class="chart-container">
                                        <canvas id="alternative-breakdown-chart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div id="annual-costs" class="sub-tab-pane">
                            <div class="result-card">
                                <h3>Annual Cost Comparison</h3>
                                <div class="table-container">
                                    <table class="data-table">
                                        <thead>
                                            <tr>
                                                <th>Cost Category</th>
                                                <th>Current Solution</th>
                                                <th>Portnox Cloud</th>
                                                <th>Savings</th>
                                            </tr>
                                        </thead>
                                        <tbody id="annual-costs-table-body">
                                            <!-- Populated by JavaScript -->
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="implementation-tab" class="tab-pane">
                        <div class="result-card">
                            <h3>Implementation Timeline Comparison</h3>
                            <div class="table-container">
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>Phase</th>
                                            <th>Current Solution (days)</th>
                                            <th>Portnox Cloud (days)</th>
                                            <th>Time Savings</th>
                                        </tr>
                                    </thead>
                                    <tbody id="implementation-table-body">
                                        <!-- Populated by JavaScript -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <footer class="app-footer">
            <div class="copyright">
                &copy; 2025 Portnox | All Rights Reserved
            </div>
            <div class="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Contact Us</a>
            </div>
        </footer>
    </div>
    
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>
    
    <!-- Application JavaScript -->
    <script src="js/utils/helpers.js"></script>
    <script src="js/managers/dom-cache.js"></script>
    <script src="js/vendors/vendor-data.js"></script>
    <script src="js/charts/chart-builder.js"></script>
    <script src="js/components/calculator.js"></script>
    <script src="js/components/ui-controller.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
EOL

    echo -e "${GREEN}New index.html created successfully${NC}"
fi

# STEP 7: Create placeholder logos if they don't exist
echo -e "\n${YELLOW}Creating placeholder logos if they don't exist...${NC}"

# Create Cisco logo placeholder if it doesn't exist
if [ ! -f "img/cisco-logo.png" ]; then
    echo "Creating Cisco logo placeholder..."
    cat > img/cisco-logo.png << 'EOL'
<svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <text x="25" y="35" font-family="Arial" font-size="20" fill="#049fd9" font-weight="bold">CISCO</text>
</svg>
EOL
fi

# Create Aruba logo placeholder if it doesn't exist
if [ ! -f "img/aruba-logo.png" ]; then
    echo "Creating Aruba logo placeholder..."
    cat > img/aruba-logo.png << 'EOL'
<svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <text x="25" y="35" font-family="Arial" font-size="20" fill="#ff8300" font-weight="bold">ARUBA</text>
</svg>
EOL
fi

# Create Forescout logo placeholder if it doesn't exist
if [ ! -f "img/forescout-logo.png" ]; then
    echo "Creating Forescout logo placeholder..."
    cat > img/forescout-logo.png << 'EOL'
<svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <text x="15" y="35" font-family="Arial" font-size="18" fill="#005daa" font-weight="bold">FORESCOUT</text>
</svg>
EOL
fi

# Create Microsoft logo placeholder if it doesn't exist
if [ ! -f "img/microsoft-logo.png" ]; then
    echo "Creating Microsoft logo placeholder..."
    cat > img/microsoft-logo.png << 'EOL'
<svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <text x="15" y="35" font-family="Arial" font-size="18" fill="#00a4ef" font-weight="bold">MICROSOFT</text>
</svg>
EOL
fi

# Create Portnox logo placeholder if it doesn't exist
if [ ! -f "img/portnox-logo.png" ]; then
    echo "Creating Portnox logo placeholder..."
    cat > img/portnox-logo.png << 'EOL'
<svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <text x="20" y="35" font-family="Arial" font-size="18" fill="#2bd25b" font-weight="bold">PORTNOX</text>
</svg>
EOL
fi

echo -e "${GREEN}Placeholder logos created successfully${NC}"

# Final summary
echo -e "\n${GREEN}TCO Calculator Fix and Enhancement Script Completed${NC}"
echo -e "\n${YELLOW}Summary of Changes:${NC}"
echo -e "  1. Fixed DOMCache recursion issue - Maximum Call Stack Size Exceeded Error"
echo -e "  2. Fixed JavaScript initialization sequence"
echo -e "  3. Added error handling and user feedback messages"
echo -e "  4. Enhanced tables with additional data points"
echo -e "  5. Added loading indicators during calculations"
echo -e "  6. Improved mobile responsiveness and styling"
echo -e "  7. Added debugging tools for troubleshooting"
echo -e "  8. Implemented CSV export functionality"

echo -e "\n${YELLOW}Next Steps:${NC}"
echo -e "  1. Open index.html in your browser to test the calculator"
echo -e "  2. Check that all sections appear correctly"
echo -e "  3. Test calculations with different inputs"
echo -e "  4. Try exporting to CSV"
echo -e "  5. If needed, use the debug link in the footer to help with troubleshooting"

echo -e "\n${GREEN}The TCO Calculator should now be functioning correctly!${NC}"
