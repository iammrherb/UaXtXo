#!/bin/bash
# Enhanced NAC TCO Calculator Fix Script
# This script resolves all identified issues including logo problems, chart loading,
# class redeclaration, and enhances visuals and comparison information

# Color formatting
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║         Enhanced NAC TCO Calculator Fix Script         ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"

# Create necessary directories
mkdir -p img
mkdir -p js/components

# 1. Fix logo issues - create a proper Portnox logo in SVG format
echo -e "\n${YELLOW}[1/7] Creating proper logo files...${NC}"

# Create SVG Portnox logo
cat > img/logo.svg << 'EOL'
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="50" viewBox="0 0 200 50">
  <style>
    .logo-text { fill: #1B67B2; font-family: Arial, sans-serif; font-weight: bold; }
    .accent { fill: #2BD25B; }
  </style>
  <rect x="5" y="10" width="30" height="30" rx="5" fill="#1B67B2"/>
  <circle cx="20" cy="25" r="8" fill="#2BD25B"/>
  <text x="45" y="32" class="logo-text" font-size="20">Portnox</text>
  <path class="accent" d="M45 35 h75" stroke="#2BD25B" stroke-width="2"/>
</svg>
EOL

# Convert SVG to PNG using node.js or a data URL approach if available
cat > img/create-logo-png.js << 'EOL'
// Node.js script to create a PNG from SVG (only used if available)
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

// Create a data URL for the logo which will be used as a fallback
const svgContent = fs.readFileSync('img/logo.svg', 'utf8');
const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;

// Write this to a JavaScript file that can be included
fs.writeFileSync('img/logo-fallback.js', `
// Fallback for logo loading
document.addEventListener('DOMContentLoaded', function() {
  const logoImg = document.querySelector('.logo img');
  if (logoImg) {
    logoImg.onerror = function() {
      this.onerror = null;
      this.src = "${dataUrl}";
    };
  }
});
`);

try {
  // Try to create a PNG if canvas is available
  const canvas = createCanvas(200, 50);
  const ctx = canvas.getContext('2d');
  
  // Draw the logo (simplified version)
  ctx.fillStyle = '#1B67B2';
  ctx.fillRect(5, 10, 30, 30);
  
  ctx.fillStyle = '#2BD25B';
  ctx.beginPath();
  ctx.arc(20, 25, 8, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = '#1B67B2';
  ctx.font = 'bold 20px Arial';
  ctx.fillText('Portnox', 45, 32);
  
  ctx.strokeStyle = '#2BD25B';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(45, 35);
  ctx.lineTo(120, 35);
  ctx.stroke();
  
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('img/logo.png', buffer);
  console.log('Created logo.png successfully');
} catch (e) {
  console.log('Could not create PNG - will use SVG fallback instead');
}
EOL

# Create an HTML fallback mechanism
cat > img/logo-fallback.html << 'EOL'
<!-- Include this right after the opening <body> tag -->
<script>
// Immediate execution to handle logo loading
(function() {
  // Create base64 encoded SVG
  const svgLogo = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="50" viewBox="0 0 200 50"><style>.logo-text{fill:#1B67B2;font-family:Arial,sans-serif;font-weight:bold}.accent{fill:#2BD25B}</style><rect x="5" y="10" width="30" height="30" rx="5" fill="#1B67B2"/><circle cx="20" cy="25" r="8" fill="#2BD25B"/><text x="45" y="32" class="logo-text" font-size="20">Portnox</text><path class="accent" d="M45 35 h75" stroke="#2BD25B" stroke-width="2"/></svg>';
  const svgDataUrl = 'data:image/svg+xml;base64,' + btoa(svgLogo);
  
  // Set up a listener to replace broken logo
  document.addEventListener('DOMContentLoaded', function() {
    const logoImg = document.querySelector('.logo img');
    if (logoImg) {
      logoImg.onerror = function() {
        console.log('Logo image failed to load, applying SVG replacement');
        this.onerror = null;
        this.src = svgDataUrl;
      };
    }
  });
})();
</script>
EOL

# Adjust logo size in HTML
if [ -f "index.html" ]; then
  # Update logo image reference to use SVG where available
  sed -i 's/<img src="img\/logo.png" alt="Portnox Logo"[^>]*>/<img src="img\/logo.svg" onerror="this.src='\''img\/logo.png'\''" alt="Portnox Logo" style="height:40px; width:auto;">/' index.html
  
  # Insert the fallback script right after <body> tag
  sed -i '/<body>/r img/logo-fallback.html' index.html
  
  # Adjust logo styles
  cat > css/logo-fixes.css << 'EOL'
/* Logo enhancements */
.logo img {
  height: 40px;
  width: auto;
  object-fit: contain;
  transition: all 0.2s ease;
}

.logo h1 {
  margin-left: 10px;
  color: #1B67B2;
  font-size: 1.5rem;
}

/* Vendor card logo enhancements */
.vendor-card img {
  height: 40px; /* Increased from 30px */
  width: auto;
  max-width: 90%;
  margin-bottom: var(--spacing-md);
  object-fit: contain;
  transition: all 0.3s ease;
}

/* Specific adjustments for certain vendor logos */
.vendor-card[data-vendor="aruba"] img,
.vendor-card[data-vendor="forescout"] img {
  height: 45px; /* Even larger for these specific vendors */
}

/* Improve logo display in report generation */
.report-header-logo {
  height: 50px;
  width: auto;
}
EOL

  # Add the CSS file to the HTML
  sed -i '/<link rel="stylesheet" href="css\/styles.css">/a \  <link rel="stylesheet" href="css\/logo-fixes.css">' index.html
  
  echo -e "${GREEN}✓ Updated logo handling in HTML and added CSS enhancements${NC}"
else
  echo -e "${RED}✗ index.html not found - cannot update logo references${NC}"
fi

# 2. Fix Calculator class redeclaration issue
echo -e "\n${YELLOW}[2/7] Fixing Calculator class redeclaration issue...${NC}"
cat > js/components/calculator.js << 'EOL'
/**
 * TCO Calculator Class
 * Enhanced implementation with proper class declaration to avoid redeclaration issues
 */
// Check if Calculator class already exists to prevent redeclaration
if (typeof Calculator === 'undefined') {
  class Calculator {
    constructor() {
      this.results = null;
      this.resultsAvailable = false;
    }
    
    /**
     * Calculate TCO for all vendors
     */
    calculate() {
      try {
        // Show loading indicator
        if (window.loadingManager) {
          window.loadingManager.show('results-container', 'Calculating TCO...');
        }
        
        // Validate inputs
        if (!this.validateInputs()) {
          // Hide loading indicator
          if (window.loadingManager) {
            window.loadingManager.hide('results-container');
          }
          
          if (window.notificationManager) {
            window.notificationManager.error('Please check the input values and try again.');
          }
          
          return false;
        }
        
        // Get values from form
        const deviceCount = parseInt(document.getElementById('device-count').value) || 1000;
        const orgSize = document.getElementById('organization-size').value;
        const yearsToProject = parseInt(document.getElementById('years-to-project').value) || 3;
        const currentVendor = window.uiController ? window.uiController.activeVendor : 'cisco';
        
        // Calculate TCO for all vendors
        const results = {
          deviceCount,
          orgSize,
          yearsToProject,
          multipleLocations: document.getElementById('multiple-locations').checked,
          locationCount: parseInt(document.getElementById('location-count').value) || 1,
          complexAuthentication: document.getElementById('complex-authentication').checked,
          legacyDevices: document.getElementById('legacy-devices').checked,
          legacyPercentage: parseInt(document.getElementById('legacy-percentage').value) || 0,
          cloudIntegration: document.getElementById('cloud-integration').checked,
          customPolicies: document.getElementById('custom-policies').checked,
          policyComplexity: document.getElementById('policy-complexity').value
        };
        
        // Calculate vendor TCOs
        Object.keys(window.vendorData).forEach(vendor => {
          const vendorResult = this.calculateVendorTCO(vendor, currentVendor, orgSize, deviceCount, yearsToProject);
          vendorResult.vendorName = window.vendorData[vendor].name;
          results[vendor] = vendorResult;
        });
        
        // Calculate implementation times
        const implementationResults = {};
        Object.keys(window.vendorData).forEach(vendor => {
          const vendorData = window.vendorData[vendor];
          if (vendorData[orgSize] && vendorData[orgSize].implementationTimeline) {
            const timeline = vendorData[orgSize].implementationTimeline;
            implementationResults[vendor] = Object.values(timeline).reduce((a, b) => a + b, 0);
          }
        });
        results.implementationResults = implementationResults;
        
        // Store results
        this.results = results;
        this.resultsAvailable = true;
        
        // Hide loading indicator
        if (window.loadingManager) {
          window.loadingManager.hide('results-container');
        }
        
        // Update UI
        if (window.uiController) {
          window.uiController.updateResults(results);
        }
        
        // Update charts
        if (window.chartBuilder) {
          window.chartBuilder.updateTCOComparisonChart(results);
          window.chartBuilder.updateCumulativeCostChart(results);
          window.chartBuilder.updateBreakdownCharts(currentVendor, 'portnox');
          window.chartBuilder.updateFeatureComparisonChart(currentVendor);
          window.chartBuilder.updateImplementationComparisonChart(results);
          window.chartBuilder.updateROIChart(results);
        }
        
        // Update benefit cards
        this.updateBenefitCards(results);
        
        // Show success notification
        if (window.notificationManager) {
          window.notificationManager.success('TCO calculation completed successfully');
        }
        
        return true;
      } catch (error) {
        console.error('Error calculating TCO:', error);
        
        // Hide loading indicator
        if (window.loadingManager) {
          window.loadingManager.hide('results-container');
        }
        
        // Show error notification
        if (window.notificationManager) {
          window.notificationManager.error('Error calculating TCO: ' + error.message);
        } else {
          alert('Error calculating TCO: ' + error.message);
        }
        
        return false;
      }
    }
    
    /**
     * Validate form inputs
     */
    validateInputs() {
      // Check if validation manager is available
      if (window.validationManager) {
        return window.validationManager.validateAll();
      }
      
      // Simple validation if validation manager is not available
      let isValid = true;
      
      const deviceCount = document.getElementById('device-count');
      if (!deviceCount || isNaN(deviceCount.value) || deviceCount.value <= 0) {
        console.error('Invalid device count');
        isValid = false;
      }
      
      const yearsToProject = document.getElementById('years-to-project');
      if (!yearsToProject || isNaN(yearsToProject.value) || yearsToProject.value <= 0 || yearsToProject.value > 10) {
        console.error('Invalid years to project');
        isValid = false;
      }
      
      // Check location count if multiple locations is selected
      const multipleLocations = document.getElementById('multiple-locations');
      const locationCount = document.getElementById('location-count');
      if (multipleLocations && multipleLocations.checked && locationCount) {
        if (isNaN(locationCount.value) || locationCount.value < 2) {
          console.error('Invalid location count');
          isValid = false;
        }
      }
      
      return isValid;
    }
    
    /**
     * Calculate TCO for a specific vendor
     */
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
        const complexityMultiplier = window.calculateComplexityMultiplier(vendor, window.vendorData[vendor].cloudBased);
        
        // Get cost multipliers from custom settings if available
        const customHardwareMultiplier = parseFloat(document.getElementById('custom-hardware-cost')?.value) || 1.0;
        const customLicensingMultiplier = parseFloat(document.getElementById('custom-licensing-cost')?.value) || 1.0;
        const customMaintenanceMultiplier = parseFloat(document.getElementById('custom-maintenance-cost')?.value) || 1.0;
        const customImplementationMultiplier = parseFloat(document.getElementById('custom-implementation-cost')?.value) || 1.0;
        const customTrainingMultiplier = parseFloat(document.getElementById('training-cost-multiplier')?.value) || 1.0;
        
        // Get custom FTE costs if available
        const customNetworkAdminSalary = parseFloat(document.getElementById('network-admin-salary')?.value) || 120000;
        const customSecurityAdminSalary = parseFloat(document.getElementById('security-admin-salary')?.value) || 135000;
        const customSystemAdminSalary = parseFloat(document.getElementById('system-admin-salary')?.value) || 110000;
        const customHelpdeskSalary = parseFloat(document.getElementById('helpdesk-salary')?.value) || 75000;
        
        // Get custom downtime cost if available
        const customDowntimeCost = parseFloat(document.getElementById('downtime-cost')?.value) || 5000;
        
        // Calculate initial costs with custom multipliers
        const initialHardware = vendorInfo.initialHardware * customHardwareMultiplier;
        const networkRedesign = vendorInfo.networkRedesign;
        const implementation = vendorInfo.implementation * customImplementationMultiplier;
        const training = vendorInfo.training * customTrainingMultiplier;
        
        const totalInitialCosts = (initialHardware + networkRedesign + implementation + training) * complexityMultiplier;
        
        // Calculate annual costs with custom multipliers
        const annualMaintenance = vendorInfo.annualMaintenance * customMaintenanceMultiplier;
        const annualLicensing = vendorInfo.annualLicensing * customLicensingMultiplier;
        
        // Use custom FTE costs for calculation
        const fteCosts = {
          networkAdmin: customNetworkAdminSalary,
          securityAdmin: customSecurityAdminSalary,
          systemAdmin: customSystemAdminSalary,
          helpDesk: customHelpdeskSalary
        };
        
        let fteCost = 0;
        for (const [role, amount] of Object.entries(vendorInfo.fteAllocation)) {
          fteCost += fteCosts[role] * amount;
        }
        
        const downtimeCost = vendorInfo.annualDowntime * customDowntimeCost;
        
        const annualCosts = (annualMaintenance + annualLicensing + fteCost + downtimeCost) * complexityMultiplier;
        
        // Calculate TCO
        const totalTCO = totalInitialCosts + (annualCosts * yearsToProject);
        
        // Calculate migration cost (if different from current vendor)
        let migrationCost = 0;
        if (vendor !== currentVendor) {
          const migrationFactor = this.getMigrationFactor(currentVendor, vendor);
          migrationCost = implementation * complexityMultiplier * migrationFactor;
        }
        
        // Calculate savings vs current solution
        let totalSavings = 0;
        let savingsPercentage = 0;
        let annualSavings = 0;
        
        if (vendor !== currentVendor) {
          const currentVendorInfo = window.vendorData[currentVendor][orgSize];
          const currentComplexity = window.calculateComplexityMultiplier(currentVendor, window.vendorData[currentVendor].cloudBased);
          
          // Apply the same custom multipliers to current vendor for fair comparison
          const currentInitialHardware = currentVendorInfo.initialHardware * customHardwareMultiplier;
          const currentNetworkRedesign = currentVendorInfo.networkRedesign;
          const currentImplementation = currentVendorInfo.implementation * customImplementationMultiplier;
          const currentTraining = currentVendorInfo.training * customTrainingMultiplier;
          
          const currentInitial = (currentInitialHardware + currentNetworkRedesign + 
                                currentImplementation + currentTraining) * currentComplexity;
          
          const currentAnnualMaintenance = currentVendorInfo.annualMaintenance * customMaintenanceMultiplier;
          const currentAnnualLicensing = currentVendorInfo.annualLicensing * customLicensingMultiplier;
          
          // Calculate current FTE cost with custom salaries
          let currentFteCost = 0;
          for (const [role, amount] of Object.entries(currentVendorInfo.fteAllocation)) {
            currentFteCost += fteCosts[role] * amount;
          }
          
          const currentDowntimeCost = currentVendorInfo.annualDowntime * customDowntimeCost;
          
          const currentAnnual = (currentAnnualMaintenance + currentAnnualLicensing + 
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
          hardwareCost: initialHardware * complexityMultiplier,
          networkRedesignCost: networkRedesign * complexityMultiplier,
          implementationCost: implementation * complexityMultiplier,
          trainingCost: training * complexityMultiplier,
          migrationCost,
          maintenanceCost: annualMaintenance * complexityMultiplier,
          licensingCost: annualLicensing * complexityMultiplier,
          fteCost: fteCost * complexityMultiplier,
          annualDowntimeCost: downtimeCost * complexityMultiplier,
          totalCosts: totalTCO + migrationCost,
          // Add benefit indicators for on-prem vs cloud comparison
          cloudBenefits: {
            hardwareElimination: window.vendorData[vendor].cloudBased ? 100 : 0,
            maintenanceReduction: window.vendorData[vendor].cloudBased ? 75 : 0,
            deploymentSpeed: window.vendorData[vendor].cloudBased ? 4 : 1,
            scalabilityScore: window.vendorData[vendor].cloudBased ? 5 : 2,
            updatesScore: window.vendorData[vendor].cloudBased ? 5 : 2,
            remoteAccessScore: window.vendorData[vendor].cloudBased ? 5 : 3
          }
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
    
    /**
     * Get migration factor between vendors
     */
    getMigrationFactor(fromVendor, toVendor) {
      if (!fromVendor || !toVendor) return 0.5;
      
      if (window.migrationFactors && 
          window.migrationFactors[fromVendor] && 
          window.migrationFactors[fromVendor][toVendor]) {
        return window.migrationFactors[fromVendor][toVendor];
      }
      
      return 0.5; // Default factor
    }
    
    /**
     * Update benefit cards in UI
     */
    updateBenefitCards(results) {
      if (!window.portnoxBenefits || !results) return;
      
      const benefitsGrid = document.querySelector('.benefits-grid');
      if (!benefitsGrid) return;
      
      benefitsGrid.innerHTML = '';
      
      window.portnoxBenefits.forEach(benefit => {
        const card = document.createElement('div');
        card.className = 'benefit-card';
        
        const icon = document.createElement('div');
        icon.className = 'benefit-icon';
        icon.innerHTML = `<i class="fas fa-${benefit.icon}"></i>`;
        
        const content = document.createElement('div');
        content.className = 'benefit-content';
        
        const title = document.createElement('h5');
        title.textContent = benefit.title;
        
        const description = document.createElement('p');
        description.textContent = benefit.description;
        
        const metric = document.createElement('div');
        metric.className = 'benefit-metric';
        metric.textContent = benefit.metric;
        
        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(metric);
        
        card.appendChild(icon);
        card.appendChild(content);
        
        benefitsGrid.appendChild(card);
      });
    }
  }
  
  // Assign the Calculator class to the window
  window.Calculator = Calculator;
}
EOL
echo -e "${GREEN}✓ Fixed Calculator class redeclaration issue${NC}"

# 3. Fix UI Controller redeclaration issue
echo -e "\n${YELLOW}[3/7] Fixing UIController class issues...${NC}"
cat > js/components/ui-controller.js << 'EOL'
/**
 * UI Controller Class for TCO Calculator
 * Enhanced version with improved report generation
 */
// Check if UIController class already exists to prevent redeclaration
if (typeof UIController === 'undefined') {
  class UIController {
    constructor() {
      this.activeVendor = 'cisco';
      this.activeView = 'financial';
      this.initEventListeners();
    }
    
    /**
     * Initialize event listeners
     */
    initEventListeners() {
      // Vendor card selection
      document.querySelectorAll('.vendor-card').forEach(card => {
        card.addEventListener('click', () => {
          const vendor = card.getAttribute('data-vendor');
          if (vendor) {
            this.setActiveVendor(vendor);
          }
        });
        
        // Keyboard accessibility
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const vendor = card.getAttribute('data-vendor');
            if (vendor) {
              this.setActiveVendor(vendor);
            }
          }
        });
      });
      
      // Multiple locations checkbox
      const multipleLocations = document.getElementById('multiple-locations');
      const locationCountContainer = document.getElementById('location-count-container');
      
      if (multipleLocations && locationCountContainer) {
        multipleLocations.addEventListener('change', () => {
          locationCountContainer.classList.toggle('hidden', !multipleLocations.checked);
        });
      }
      
      // Legacy devices checkbox
      const legacyDevices = document.getElementById('legacy-devices');
      const legacyPercentageContainer = document.getElementById('legacy-percentage-container');
      
      if (legacyDevices && legacyPercentageContainer) {
        legacyDevices.addEventListener('change', () => {
          legacyPercentageContainer.classList.toggle('hidden', !legacyDevices.checked);
        });
      }
      
      // Custom policies checkbox
      const customPolicies = document.getElementById('custom-policies');
      const policyComplexityContainer = document.getElementById('policy-complexity-container');
      
      if (customPolicies && policyComplexityContainer) {
        customPolicies.addEventListener('change', () => {
          policyComplexityContainer.classList.toggle('hidden', !customPolicies.checked);
        });
      }
      
      // Industry template selector
      const industrySelector = document.getElementById('industry-selector');
      if (industrySelector) {
        industrySelector.addEventListener('change', () => {
          this.applyIndustryTemplate(industrySelector.value);
        });
        
        // Populate industry selector options
        if (window.industryTemplates) {
          industrySelector.innerHTML = '<option value="none">Select an industry...</option>';
          
          Object.keys(window.industryTemplates).forEach(key => {
            const template = window.industryTemplates[key];
            const option = document.createElement('option');
            option.value = key;
            option.textContent = template.name;
            industrySelector.appendChild(option);
          });
        }
      }
      
      // Audience selector
      const audienceSelector = document.getElementById('audience-selector');
      if (audienceSelector) {
        audienceSelector.addEventListener('change', () => {
          this.setActiveView(audienceSelector.value);
        });
      }
      
      // Guided tour button
      const guidedTourBtn = document.getElementById('guided-tour-btn');
      if (guidedTourBtn) {
        guidedTourBtn.addEventListener('click', () => {
          if (window.GuidedTour) {
            const tour = new GuidedTour();
            tour.startTour();
          } else {
            console.warn('GuidedTour not available');
          }
        });
      }
      
      // Export buttons
      const exportCsvBtn = document.getElementById('export-csv-btn');
      if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', () => {
          this.exportToCSV();
        });
      }
      
      const exportPdfBtn = document.getElementById('export-pdf-btn');
      if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', () => {
          this.exportToPDF();
        });
      }
      
      // Chart type toggle buttons
      document.querySelectorAll('.chart-type-toggle').forEach(button => {
        button.addEventListener('click', () => {
          const chartId = button.getAttribute('data-chart-id');
          const chartType = button.getAttribute('data-chart-type');
          
          if (chartId && chartType && window.chartBuilder && window.chartBuilder.charts[chartId]) {
            // Update active state on buttons
            const toggles = document.querySelectorAll(`.chart-type-toggle[data-chart-id="${chartId}"]`);
            toggles.forEach(t => t.classList.remove('active'));
            button.classList.add('active');
            
            // Update chart type
            window.chartBuilder.charts[chartId].config.type = chartType;
            window.chartBuilder.charts[chartId].update();
          }
        });
      });
    }
    
    /**
     * Set active vendor
     */
    setActiveVendor(vendor) {
      if (!vendor || !window.vendorData[vendor]) {
        console.error(`Invalid vendor: ${vendor}`);
        return;
      }
      
      // Update active vendor
      this.activeVendor = vendor;
      
      // Update UI
      document.querySelectorAll('.vendor-card').forEach(card => {
        const cardVendor = card.getAttribute('data-vendor');
        card.classList.toggle('active', cardVendor === vendor);
        
        // Update ARIA attributes
        if (cardVendor === vendor) {
          card.setAttribute('aria-selected', 'true');
        } else {
          card.setAttribute('aria-selected', 'false');
        }
      });
      
      // Update vendor name placeholders
      const vendorName = window.vendorData[vendor].name;
      document.querySelectorAll('.vendor-name-placeholder').forEach(el => {
        el.textContent = vendorName;
      });
      
      // Update table headers
      const tcoComparisonVendor = document.getElementById('tco-comparison-vendor');
      if (tcoComparisonVendor) {
        tcoComparisonVendor.textContent = vendorName;
      }
      
      const annualComparisonVendor = document.getElementById('annual-comparison-vendor');
      if (annualComparisonVendor) {
        annualComparisonVendor.textContent = vendorName;
      }
      
      const implementationComparisonVendor = document.getElementById('implementation-comparison-vendor');
      if (implementationComparisonVendor) {
        implementationComparisonVendor.textContent = vendorName;
      }
      
      // If we have results, update them for the new vendor
      if (window.calculator && window.calculator.resultsAvailable) {
        this.updateResults(window.calculator.results);
        
        // Update charts
        if (window.chartBuilder) {
          window.chartBuilder.updateFeatureComparisonChart(vendor);
          window.chartBuilder.updateBreakdownCharts(vendor, 'portnox');
          window.chartBuilder.updateROIChart(window.calculator.results);
        }
      }
    }
    
    /**
     * Set active view (audience)
     */
    setActiveView(view) {
      this.activeView = view;
      
      // Update UI based on view
      const resultsContainer = document.querySelector('.results-container');
      if (resultsContainer) {
        resultsContainer.className = 'results-container ' + view + '-view';
      }
      
      // Update visibility of sections based on view
      const sections = {
        'executive': ['summary-tab', 'implementation-tab'],
        'financial': ['summary-tab', 'financial-tab', 'implementation-tab'],
        'technical': ['summary-tab', 'financial-tab', 'implementation-tab', 'comparison-tab', 'migration-tab']
      };
      
      // Show/hide sections based on view
      document.querySelectorAll('.tab-button').forEach(tab => {
        const tabId = tab.getAttribute('data-tab');
        const isVisible = !sections[view] || sections[view].includes(tabId);
        tab.style.display = isVisible ? '' : 'none';
      });
      
      // If current active tab is not visible in this view, switch to first visible tab
      const activeTab = document.querySelector('.tab-button.active');
      if (activeTab && activeTab.style.display === 'none') {
        const firstVisibleTab = document.querySelector('.tab-button:not([style*="display: none"])');
        if (firstVisibleTab && window.tabManager) {
          window.tabManager.setActiveTab(firstVisibleTab.getAttribute('data-tab'));
        }
      }
      
      // Update chart visibility based on view
      this.updateChartVisibility(view);
    }
    
    /**
     * Update chart visibility based on view
     */
    updateChartVisibility(view) {
      // Define which charts to show for each view
      const chartVisibility = {
        'executive': ['tco-comparison-chart', 'roi-chart'],
        'financial': ['tco-comparison-chart', 'cumulative-cost-chart', 'roi-chart'],
        'technical': ['tco-comparison-chart', 'cumulative-cost-chart', 'feature-comparison-chart', 'implementation-comparison-chart', 'roi-chart']
      };
      
      // Show/hide chart containers
      document.querySelectorAll('.chart-container').forEach(container => {
        const chartId = container.querySelector('canvas')?.id;
        if (chartId) {
          const isVisible = !chartVisibility[view] || chartVisibility[view].includes(chartId);
          container.closest('.result-card').style.display = isVisible ? '' : 'none';
        }
      });
    }
    
    /**
     * Update UI with calculation results
     */
    updateResults(results) {
      if (!results) return;
      
      const currentVendor = this.activeVendor;
      const currentVendorResults = results[currentVendor];
      const portnoxResults = results['portnox'];
      
      if (!currentVendorResults || !portnoxResults) {
        console.error('Missing vendor results');
        return;
      }
      
      // Update summary metrics
      const savingsAmount = document.getElementById('portnox-savings-amount');
      if (savingsAmount) {
        savingsAmount.textContent = window.formatCurrency(portnoxResults.totalSavings);
      }
      
      const savingsPercentage = document.getElementById('portnox-savings-percentage');
      if (savingsPercentage) {
        savingsPercentage.textContent = window.formatPercentage(portnoxResults.savingsPercentage);
      }
      
      const implementationTime = document.getElementById('portnox-implementation-time');
      if (implementationTime && results.implementationResults) {
        const currentTime = results.implementationResults[currentVendor] || 0;
        const portnoxTime = results.implementationResults['portnox'] || 0;
        const timeSaved = currentTime - portnoxTime;
        
        if (timeSaved > 0) {
          implementationTime.textContent = `${timeSaved} days`;
        } else {
          implementationTime.textContent = 'N/A';
        }
      }
      
      // Update comparison highlights
      const comparisonSavings = document.getElementById('comparison-savings');
      if (comparisonSavings) {
        comparisonSavings.textContent = window.formatCurrency(portnoxResults.totalSavings);
        
        // Update progress bar
        const progressBar = comparisonSavings.closest('.metric-container')?.querySelector('.progress');
        if (progressBar) {
          const percentage = Math.min(portnoxResults.savingsPercentage, 100);
          progressBar.style.width = `${percentage}%`;
        }
      }
      
      const comparisonImplementation = document.getElementById('comparison-implementation');
      if (comparisonImplementation && results.implementationResults) {
        const currentTime = results.implementationResults[currentVendor] || 0;
        const portnoxTime = results.implementationResults['portnox'] || 0;
        const timeSaved = currentTime - portnoxTime;
        
        if (timeSaved > 0) {
          comparisonImplementation.textContent = `${timeSaved} days`;
          
          // Update progress bar
          const progressBar = comparisonImplementation.closest('.metric-container')?.querySelector('.progress');
          if (progressBar) {
            const percentage = Math.min((timeSaved / currentTime) * 100, 100);
            progressBar.style.width = `${percentage}%`;
          }
        } else {
          comparisonImplementation.textContent = '0 days';
          
          // Reset progress bar
          const progressBar = comparisonImplementation.closest('.metric-container')?.querySelector('.progress');
          if (progressBar) {
            progressBar.style.width = '0%';
          }
        }
      }
      
      // Update cloud vs. on-premises comparison metrics
      this.updateCloudComparison(results);
      
      // Update TCO summary table
      this.updateTCOSummaryTable(results);
      
      // Update annual costs table
      this.updateAnnualCostsTable(results);
      
      // Update implementation table
      this.updateImplementationTable(results);
      
      // Update industry-specific metrics
      this.updateIndustryMetrics(results);
    }
    
    /**
     * Update cloud vs. on-premises comparison
     */
    updateCloudComparison(results) {
      const comparisonTableBody = document.getElementById('cloud-comparison-table-body');
      if (!comparisonTableBody) return;
      
      const currentVendor = this.activeVendor;
      const currentVendorResults = results[currentVendor];
      const portnoxResults = results['portnox'];
      
      if (!currentVendorResults || !portnoxResults) return;
      
      // Clear table
      comparisonTableBody.innerHTML = '';
      
      // Create rows for comparison
      const comparisonPoints = [
        {
          feature: 'Deployment Model',
          onPrem: 'Hardware appliances requiring rack space, power, cooling',
          cloud: 'SaaS solution, no hardware requirements'
        },
        {
          feature: 'Initial Setup',
          onPrem: '2-4 weeks typical setup time',
          cloud: 'Same-day deployment'
        },
        {
          feature: 'Redundancy',
          onPrem: 'Requires additional hardware and complex configuration',
          cloud: 'Built-in cloud redundancy across regions'
        },
        {
          feature: 'Updates & Patching',
          onPrem: 'Manual update process requiring maintenance windows',
          cloud: 'Automatic updates without downtime'
        },
        {
          feature: 'Scalability',
          onPrem: 'Requires hardware sizing and potential additional purchases',
          cloud: 'Unlimited elastic scaling without additional hardware'
        },
        {
          feature: 'Multi-Location Support',
          onPrem: 'Requires hardware at each site or complex VPN tunnels',
          cloud: 'Single cloud instance for all sites'
        },
        {
          feature: 'Remote Access',
          onPrem: 'Requires VPN or additional appliances',
          cloud: 'Native anywhere access'
        },
        {
          feature: 'Disaster Recovery',
          onPrem: 'Requires separate DR site and complex replication',
          cloud: 'Built-in geo-redundancy and automatic failover'
        },
        {
          feature: 'Administrator Overhead',
          onPrem: 'High maintenance requirements (patching, upgrades, backups)',
          cloud: 'Minimal administration focused on policy management'
        },
        {
          feature: 'Implementation Complexity',
          onPrem: 'Complex network integration requiring specialized expertise',
          cloud: 'Simple cloud connector model with guided setup'
        },
        {
          feature: 'Cost Model',
          onPrem: 'High upfront costs plus ongoing maintenance (CapEx heavy)',
          cloud: 'Subscription-based with minimal upfront costs (OpEx model)'
        },
        {
          feature: 'Security Updates',
          onPrem: 'Manual security patches requiring planning and testing',
          cloud: 'Automatic security updates ensuring latest protections'
        }
      ];
      
      // Create and append rows
      comparisonPoints.forEach(point => {
        const row = document.createElement('tr');
        
        const featureCell = document.createElement('td');
        featureCell.textContent = point.feature;
        
        const onPremCell = document.createElement('td');
        onPremCell.textContent = point.onPrem;
        
        const cloudCell = document.createElement('td');
        cloudCell.textContent = point.cloud;
        cloudCell.className = 'cloud-benefit';
        
        row.appendChild(featureCell);
        row.appendChild(onPremCell);
        row.appendChild(cloudCell);
        
        comparisonTableBody.appendChild(row);
      });
      
      // Update architecture diagrams
      this.updateArchitectureDiagrams();
    }
    
    /**
     * Update architecture diagrams
     */
    updateArchitectureDiagrams() {
      const onPremDiagram = document.querySelector('.on-prem-diagram');
      const cloudDiagram = document.querySelector('.cloud-diagram');
      
      if (!onPremDiagram || !cloudDiagram) return;
      
      // Create SVG for on-premises architecture
      onPremDiagram.innerHTML = `
        <svg width="100%" height="300" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
          <style>
            .diagram-box { fill: #f5f7fa; stroke: #1B67B2; stroke-width: 2; }
            .diagram-text { font-family: Arial; font-size: 12px; fill: #202020; }
            .diagram-title { font-family: Arial; font-size: 14px; font-weight: bold; fill: #1B67B2; }
            .diagram-line { stroke: #888; stroke-width: 1.5; stroke-dasharray: 5,5; }
            .diagram-arrow { stroke: #888; stroke-width: 1.5; fill: none; marker-end: url(#arrowhead); }
            .diagram-server { fill: #ddd; stroke: #888; stroke-width: 1; }
          </style>
          
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#888" />
            </marker>
          </defs>
          
          <!-- Headquarters -->
          <rect x="50" y="50" width="200" height="100" rx="5" class="diagram-box" />
          <text x="150" y="30" text-anchor="middle" class="diagram-title">Headquarters</text>
          
          <!-- NAC Server -->
          <rect x="70" y="70" width="60" height="20" rx="2" class="diagram-server" />
          <text x="100" y="85" text-anchor="middle" class="diagram-text">NAC Primary</text>
          
          <!-- Redundant NAC Server -->
          <rect x="70" y="100" width="60" height="20" rx="2" class="diagram-server" />
          <text x="100" y="115" text-anchor="middle" class="diagram-text">NAC Backup</text>
          
          <!-- Management Server -->
          <rect x="170" y="70" width="60" height="20" rx="2" class="diagram-server" />
          <text x="200" y="85" text-anchor="middle" class="diagram-text">Management</text>
          
          <!-- Database Server -->
          <rect x="170" y="100" width="60" height="20" rx="2" class="diagram-server" />
          <text x="200" y="115" text-anchor="middle" class="diagram-text">Database</text>
          
          <!-- Remote Site -->
          <rect x="350" y="50" width="200" height="100" rx="5" class="diagram-box" />
          <text x="450" y="30" text-anchor="middle" class="diagram-title">Remote Site</text>
          
          <!-- Remote NAC Server -->
          <rect x="370" y="70" width="60" height="20" rx="2" class="diagram-server" />
          <text x="400" y="85" text-anchor="middle" class="diagram-text">NAC Server</text>
          
          <!-- Remote Management -->
          <rect x="470" y="70" width="60" height="20" rx="2" class="diagram-server" />
          <text x="500" y="85" text-anchor="middle" class="diagram-text">Management</text>
          
          <!-- Connection between HQ and Remote -->
          <path d="M250 100 H300 Q325 100, 325 125 T350 150 H400" class="diagram-arrow" />
          <path d="M350 100 H300 Q275 100, 275 125 T250 150 H200" class="diagram-arrow" />
          
          <!-- DR Site -->
          <rect x="200" y="200" width="200" height="75" rx="5" class="diagram-box" />
          <text x="300" y="180" text-anchor="middle" class="diagram-title">DR Site</text>
          
          <!-- DR NAC Server -->
          <rect x="220" y="220" width="60" height="20" rx="2" class="diagram-server" />
          <text x="250" y="235" text-anchor="middle" class="diagram-text">NAC DR</text>
          
          <!-- DR Database -->
          <rect x="320" y="220" width="60" height="20" rx="2" class="diagram-server" />
          <text x="350" y="235" text-anchor="middle" class="diagram-text">DB DR</text>
          
          <!-- Connection to DR -->
          <path d="M150 150 Q200 175, 250 200" class="diagram-arrow" />
          <path d="M450 150 Q400 175, 350 200" class="diagram-arrow" />
        </svg>
      `;
      
      // Create SVG for cloud architecture
      cloudDiagram.innerHTML = `
        <svg width="100%" height="300" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
          <style>
            .diagram-box { fill: #f5f7fa; stroke: #1B67B2; stroke-width: 2; }
            .diagram-text { font-family: Arial; font-size: 12px; fill: #202020; }
            .diagram-title { font-family: Arial; font-size: 14px; font-weight: bold; fill: #1B67B2; }
            .diagram-line { stroke: #888; stroke-width: 1.5; stroke-dasharray: 5,5; }
            .diagram-arrow { stroke: #888; stroke-width: 1.5; fill: none; marker-end: url(#cloud-arrowhead); }
            .diagram-cloud { fill: #e6fff0; stroke: #2BD25B; stroke-width: 2; }
            .diagram-connector { fill: #ddd; stroke: #888; stroke-width: 1; }
          </style>
          
          <defs>
            <marker id="cloud-arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#888" />
            </marker>
          </defs>
          
          <!-- Cloud Service -->
          <ellipse cx="300" cy="100" rx="120" ry="60" class="diagram-cloud" />
          <text x="300" y="85" text-anchor="middle" class="diagram-title">Portnox Cloud</text>
          <text x="300" y="105" text-anchor="middle" class="diagram-text">Globally Distributed</text>
          <text x="300" y="125" text-anchor="middle" class="diagram-text">Fully Redundant</text>
          
          <!-- Headquarters -->
          <rect x="50" y="200" width="150" height="80" rx="5" class="diagram-box" />
          <text x="125" y="190" text-anchor="middle" class="diagram-title">Headquarters</text>
          
          <!-- Cloud Connector -->
          <rect x="95" y="220" width="60" height="20" rx="2" class="diagram-connector" />
          <text x="125" y="235" text-anchor="middle" class="diagram-text">Connector</text>
          
          <!-- Branch Office 1 -->
          <rect x="225" y="200" width="150" height="80" rx="5" class="diagram-box" />
          <text x="300" y="190" text-anchor="middle" class="diagram-title">Branch Office 1</text>
          
          <!-- Cloud Connector -->
          <rect x="270" y="220" width="60" height="20" rx="2" class="diagram-connector" />
          <text x="300" y="235" text-anchor="middle" class="diagram-text">Connector</text>
          
          <!-- Branch Office 2 -->
          <rect x="400" y="200" width="150" height="80" rx="5" class="diagram-box" />
          <text x="475" y="190" text-anchor="middle" class="diagram-title">Branch Office 2</text>
          
          <!-- Cloud Connector -->
          <rect x="445" y="220" width="60" height="20" rx="2" class="diagram-connector" />
          <text x="475" y="235" text-anchor="middle" class="diagram-text">Connector</text>
          
          <!-- Connections to Cloud -->
          <path d="M125 220 Q175 180, 225 150" class="diagram-arrow" />
          <path d="M300 220 V170" class="diagram-arrow" />
          <path d="M475 220 Q425 180, 375 150" class="diagram-arrow" />
          
          <!-- Administrator -->
          <circle cx="300" cy="270" r="15" fill="#ddd" stroke="#888" />
          <path d="M300 285 V290 Q285 300, 300 310 T315 290 V285" fill="#ddd" stroke="#888" />
          <text x="300" y="330" text-anchor="middle" class="diagram-text">Administrator</text>
          
          <!-- Connection from admin to cloud -->
          <path d="M300 255 Q350 220, 350 170" class="diagram-arrow" />
        </svg>
      `;
    }
    
    /**
     * Update TCO summary table
     */
    updateTCOSummaryTable(results) {
      const tableBody = document.getElementById('tco-summary-table-body');
      if (!tableBody) return;
      
      const currentVendor = this.activeVendor;
      const currentResults = results[currentVendor];
      const portnoxResults = results['portnox'];
      
      if (!currentResults || !portnoxResults) return;
      
      // Clear table
      tableBody.innerHTML = '';
      
      // Create rows for each cost component
      const createRow = (label, currentCost, portnoxCost) => {
        const row = document.createElement('tr');
        
        const labelCell = document.createElement('td');
        labelCell.textContent = label;
        
        const currentCell = document.createElement('td');
        currentCell.textContent = window.formatCurrency(currentCost);
        
        const portnoxCell = document.createElement('td');
        portnoxCell.textContent = window.formatCurrency(portnoxCost);
        
        const savingsCell = document.createElement('td');
        const savings = currentCost - portnoxCost;
        savingsCell.textContent = window.formatCurrency(savings);
        
        if (savings > 0) {
          savingsCell.classList.add('positive-savings');
        } else if (savings < 0) {
          savingsCell.classList.add('negative-savings');
        }
        
        row.appendChild(labelCell);
        row.appendChild(currentCell);
        row.appendChild(portnoxCell);
        row.appendChild(savingsCell);
        
        return row;
      };
      
      // Hardware costs
      tableBody.appendChild(createRow(
        'Hardware Costs',
        currentResults.hardwareCost,
        portnoxResults.hardwareCost
      ));
      
      // Network redesign
      tableBody.appendChild(createRow(
        'Network Redesign',
        currentResults.networkRedesignCost,
        portnoxResults.networkRedesignCost
      ));
      
      // Implementation
      tableBody.appendChild(createRow(
        'Implementation',
        currentResults.implementationCost,
        portnoxResults.implementationCost
      ));
      
      // Training
      tableBody.appendChild(createRow(
        'Training',
        currentResults.trainingCost,
        portnoxResults.trainingCost
      ));
      
      // Migration costs (only for Portnox)
      tableBody.appendChild(createRow(
        'Migration Costs',
        0,
        portnoxResults.migrationCost
      ));
      
      // Maintenance
      tableBody.appendChild(createRow(
        `Maintenance (${results.yearsToProject} years)`,
        currentResults.maintenanceCost * results.yearsToProject,
        portnoxResults.maintenanceCost * results.yearsToProject
      ));
      
      // Licensing
      tableBody.appendChild(createRow(
        `Licensing (${results.yearsToProject} years)`,
        currentResults.licensingCost * results.yearsToProject,
        portnoxResults.licensingCost * results.yearsToProject
      ));
      
      // Personnel
      tableBody.appendChild(createRow(
        `Personnel (${results.yearsToProject} years)`,
        currentResults.fteCost * results.yearsToProject,
        portnoxResults.fteCost * results.yearsToProject
      ));
      
      // Downtime
      tableBody.appendChild(createRow(
        `Downtime (${results.yearsToProject} years)`,
        currentResults.annualDowntimeCost * results.yearsToProject,
        portnoxResults.annualDowntimeCost * results.yearsToProject
      ));
      
      // Total row
      const totalRow = document.createElement('tr');
      totalRow.className = 'total-row';
      
      const totalLabelCell = document.createElement('td');
      totalLabelCell.textContent = `Total ${results.yearsToProject}-Year TCO`;
      
      const totalCurrentCell = document.createElement('td');
      totalCurrentCell.textContent = window.formatCurrency(currentResults.totalCosts);
      
      const totalPortnoxCell = document.createElement('td');
      totalPortnoxCell.textContent = window.formatCurrency(portnoxResults.totalCosts);
      
      const totalSavingsCell = document.createElement('td');
      totalSavingsCell.textContent = window.formatCurrency(portnoxResults.totalSavings);
      
      if (portnoxResults.totalSavings > 0) {
        totalSavingsCell.classList.add('positive-savings');
      } else if (portnoxResults.totalSavings < 0) {
        totalSavingsCell.classList.add('negative-savings');
      }
      
      totalRow.appendChild(totalLabelCell);
      totalRow.appendChild(totalCurrentCell);
      totalRow.appendChild(totalPortnoxCell);
      totalRow.appendChild(totalSavingsCell);
      
      tableBody.appendChild(totalRow);
    }
    
    /**
     * Update annual costs table
     */
    updateAnnualCostsTable(results) {
      const tableBody = document.getElementById('annual-costs-table-body');
      if (!tableBody) return;
      
      const currentVendor = this.activeVendor;
      const currentResults = results[currentVendor];
      const portnoxResults = results['portnox'];
      
      if (!currentResults || !portnoxResults) return;
      
      // Clear table
      tableBody.innerHTML = '';
      
      // Create rows for each cost component
      const createRow = (label, currentCost, portnoxCost) => {
        const row = document.createElement('tr');
        
        const labelCell = document.createElement('td');
        labelCell.textContent = label;
        
        const currentCell = document.createElement('td');
        currentCell.textContent = window.formatCurrency(currentCost);
        
        const portnoxCell = document.createElement('td');
        portnoxCell.textContent = window.formatCurrency(portnoxCost);
        
        const savingsCell = document.createElement('td');
        const savings = currentCost - portnoxCost;
        savingsCell.textContent = window.formatCurrency(savings);
        
        if (savings > 0) {
          savingsCell.classList.add('positive-savings');
        } else if (savings < 0) {
          savingsCell.classList.add('negative-savings');
        }
        
        row.appendChild(labelCell);
        row.appendChild(currentCell);
        row.appendChild(portnoxCell);
        row.appendChild(savingsCell);
        
        return row;
      };
      
      // Maintenance
      tableBody.appendChild(createRow(
        'Maintenance',
        currentResults.maintenanceCost,
        portnoxResults.maintenanceCost
      ));
      
      // Licensing
      tableBody.appendChild(createRow(
        'Licensing',
        currentResults.licensingCost,
        portnoxResults.licensingCost
      ));
      
      // Personnel
      tableBody.appendChild(createRow(
        'Personnel (FTE)',
        currentResults.fteCost,
        portnoxResults.fteCost
      ));
      
      // Downtime
      tableBody.appendChild(createRow(
        'Downtime',
        currentResults.annualDowntimeCost,
        portnoxResults.annualDowntimeCost
      ));
      
      // Total row
      const totalRow = document.createElement('tr');
      totalRow.className = 'total-row';
      
      const totalLabelCell = document.createElement('td');
      totalLabelCell.textContent = 'Total Annual Cost';
      
      const totalCurrentCell = document.createElement('td');
      totalCurrentCell.textContent = window.formatCurrency(currentResults.annualCosts);
      
      const totalPortnoxCell = document.createElement('td');
      totalPortnoxCell.textContent = window.formatCurrency(portnoxResults.annualCosts);
      
      const totalSavingsCell = document.createElement('td');
      const annualSavings = currentResults.annualCosts - portnoxResults.annualCosts;
      totalSavingsCell.textContent = window.formatCurrency(annualSavings);
      
      if (annualSavings > 0) {
        totalSavingsCell.classList.add('positive-savings');
      } else if (annualSavings < 0) {
        totalSavingsCell.classList.add('negative-savings');
      }
      
      totalRow.appendChild(totalLabelCell);
      totalRow.appendChild(totalCurrentCell);
      totalRow.appendChild(totalPortnoxCell);
      totalRow.appendChild(totalSavingsCell);
      
      tableBody.appendChild(totalRow);
    }
    
    /**
     * Update implementation table
     */
    updateImplementationTable(results) {
      const tableBody = document.getElementById('implementation-table-body');
      if (!tableBody) return;
      
      // Get vendor data
      const currentVendor = this.activeVendor;
      const orgSize = results.orgSize;
      
      const currentVendorData = window.vendorData[currentVendor];
      const portnoxData = window.vendorData['portnox'];
      
      if (!currentVendorData || !portnoxData || 
          !currentVendorData[orgSize] || !portnoxData[orgSize] ||
          !currentVendorData[orgSize].implementationTimeline || 
          !portnoxData[orgSize].implementationTimeline) {
        return;
      }
      
      const currentTimeline = currentVendorData[orgSize].implementationTimeline;
      const portnoxTimeline = portnoxData[orgSize].implementationTimeline;
      
      // Clear table
      tableBody.innerHTML = '';
      
      // Combine all phases from both vendors
      const phases = new Set([
        ...Object.keys(currentTimeline),
        ...Object.keys(portnoxTimeline)
      ]);
      
      // Create rows for each phase
      phases.forEach(phase => {
        const currentDays = currentTimeline[phase] || 0;
        const portnoxDays = portnoxTimeline[phase] || 0;
        const timeSaved = currentDays - portnoxDays;
        
        const row = document.createElement('tr');
        
        const phaseCell = document.createElement('td');
        phaseCell.className = 'phase-name';
        phaseCell.textContent = phase.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        
        const currentCell = document.createElement('td');
        currentCell.textContent = `${currentDays} days`;
        
        const portnoxCell = document.createElement('td');
        portnoxCell.textContent = `${portnoxDays} days`;
        
        const savingsCell = document.createElement('td');
        
        if (timeSaved > 0) {
          savingsCell.textContent = `${timeSaved} days`;
          savingsCell.classList.add('positive-savings');
        } else if (timeSaved < 0) {
          savingsCell.textContent = `${Math.abs(timeSaved)} days longer`;
          savingsCell.classList.add('negative-savings');
        } else {
          savingsCell.textContent = 'No difference';
        }
        
        row.appendChild(phaseCell);
        row.appendChild(currentCell);
        row.appendChild(portnoxCell);
        row.appendChild(savingsCell);
        
        tableBody.appendChild(row);
      });
      
      // Add total row
      const totalRow = document.createElement('tr');
      totalRow.className = 'total-row';
      
      const totalLabelCell = document.createElement('td');
      totalLabelCell.textContent = 'Total Implementation Time';
      
      const currentTotalDays = Object.values(currentTimeline).reduce((sum, days) => sum + days, 0);
      const totalCurrentCell = document.createElement('td');
      totalCurrentCell.textContent = `${currentTotalDays} days`;
      
      const portnoxTotalDays = Object.values(portnoxTimeline).reduce((sum, days) => sum + days, 0);
      const totalPortnoxCell = document.createElement('td');
      totalPortnoxCell.textContent = `${portnoxTotalDays} days`;
      
      const totalSavingsCell = document.createElement('td');
      const totalTimeSaved = currentTotalDays - portnoxTotalDays;
      
      if (totalTimeSaved > 0) {
        totalSavingsCell.textContent = `${totalTimeSaved} days`;
        totalSavingsCell.classList.add('positive-savings');
      } else if (totalTimeSaved < 0) {
        totalSavingsCell.textContent = `${Math.abs(totalTimeSaved)} days longer`;
        totalSavingsCell.classList.add('negative-savings');
      } else {
        totalSavingsCell.textContent = 'No difference';
      }
      
      totalRow.appendChild(totalLabelCell);
      totalRow.appendChild(totalCurrentCell);
      totalRow.appendChild(totalPortnoxCell);
      totalRow.appendChild(totalSavingsCell);
      
      tableBody.appendChild(totalRow);
    }
    
    /**
     * Update industry-specific metrics
     */
    updateIndustryMetrics(results) {
      const metricsContainer = document.getElementById('industry-specific-metrics');
      if (!metricsContainer) return;
      
      const selectedIndustry = document.getElementById('industry-selector')?.value;
      if (!selectedIndustry || selectedIndustry === 'none' || !window.industryTemplates[selectedIndustry]) {
        metricsContainer.classList.add('hidden');
        return;
      }
      
      const industry = window.industryTemplates[selectedIndustry];
      
      // Create industry metrics card
      metricsContainer.innerHTML = `
        <div class="result-card">
          <h3>${industry.name} Industry Benefits</h3>
          <div class="industry-metrics-grid">
            <div class="industry-metric">
              <h4>Compliance Benefits</h4>
              <ul>
                ${industry.complianceInfo.keyRequirements.map(req => `<li>${req}</li>`).join('')}
              </ul>
            </div>
            <div class="industry-metric">
              <h4>Cost Comparison</h4>
              <p>Industry Average TCO: ${window.formatCurrency(industry.benchmarks.averageTCO)}</p>
              <p>Your Portnox TCO: ${window.formatCurrency(results.portnox.totalCosts)}</p>
              <p>Cost Savings: ${window.formatCurrency(industry.benchmarks.averageTCO - results.portnox.totalCosts)}</p>
            </div>
            <div class="industry-metric">
              <h4>Implementation Time</h4>
              <p>Industry Average: ${industry.benchmarks.implementationTime} days</p>
              <p>With Portnox Cloud: ${results.implementationResults.portnox} days</p>
              <p>Time Saved: ${industry.benchmarks.implementationTime - results.implementationResults.portnox} days</p>
            </div>
          </div>
          <div class="industry-details">
            <p>${industry.complianceInfo.details}</p>
          </div>
        </div>
      `;
      
      metricsContainer.classList.remove('hidden');
    }
    
    /**
     * Apply industry template
     */
    applyIndustryTemplate(templateKey) {
      if (templateKey === 'none' || !window.industryTemplates) return;
      
      const template = window.industryTemplates[templateKey];
      if (!template || !template.defaults) return;
      
      const defaults = template.defaults;
      
      // Apply default values to form fields
      if (defaults.deviceCount) {
        document.getElementById('device-count').value = defaults.deviceCount;
      }
      
      if (defaults.yearsToProject) {
        document.getElementById('years-to-project').value = defaults.yearsToProject;
      }
      
      const multipleLocations = document.getElementById('multiple-locations');
      if (multipleLocations) {
        multipleLocations.checked = !!defaults.multipleLocations;
        
        // Handle dependent field
        const locationCountContainer = document.getElementById('location-count-container');
        if (locationCountContainer) {
          locationCountContainer.classList.toggle('hidden', !defaults.multipleLocations);
        }
      }
      
      if (defaults.locationCount) {
        document.getElementById('location-count').value = defaults.locationCount;
      }
      
      const complexAuthentication = document.getElementById('complex-authentication');
      if (complexAuthentication) {
        complexAuthentication.checked = !!defaults.complexAuthentication;
      }
      
      const legacyDevices = document.getElementById('legacy-devices');
      if (legacyDevices) {
        legacyDevices.checked = !!defaults.legacyDevices;
        
        // Handle dependent field
        const legacyPercentageContainer = document.getElementById('legacy-percentage-container');
        if (legacyPercentageContainer) {
          legacyPercentageContainer.classList.toggle('hidden', !defaults.legacyDevices);
        }
      }
      
      if (defaults.legacyPercentage) {
        document.getElementById('legacy-percentage').value = defaults.legacyPercentage;
        
        // Update displayed value
        const legacyPercentageValue = document.getElementById('legacy-percentage-value');
        if (legacyPercentageValue) {
          legacyPercentageValue.textContent = defaults.legacyPercentage + '%';
        }
      }
      
      const cloudIntegration = document.getElementById('cloud-integration');
      if (cloudIntegration) {
        cloudIntegration.checked = !!defaults.cloudIntegration;
      }
      
      const customPolicies = document.getElementById('custom-policies');
      if (customPolicies) {
        customPolicies.checked = !!defaults.customPolicies;
        
        // Handle dependent field
        const policyComplexityContainer = document.getElementById('policy-complexity-container');
        if (policyComplexityContainer) {
          policyComplexityContainer.classList.toggle('hidden', !defaults.customPolicies);
        }
      }
      
      if (defaults.policyComplexity) {
        document.getElementById('policy-complexity').value = defaults.policyComplexity;
      }
      
      // Update compliance info if available
      this.updateComplianceInfo(template);
      
      // Update benchmarks if available
      this.updateBenchmarks(template);
      
      // Show success notification
      if (window.notificationManager) {
        window.notificationManager.success(`Applied ${template.name} industry template`);
      }
      
      // Run calculation with new values
      if (window.calculator) {
        window.calculator.calculate();
      }
    }
    
    /**
     * Update compliance info
     */
    updateComplianceInfo(template) {
      if (!template.complianceInfo) return;
      
      const container = document.getElementById('compliance-info-container');
      if (!container) return;
      
      // Create compliance info card
      container.innerHTML = `
        <div class="compliance-info-card">
          <h3>${template.complianceInfo.title}</h3>
          <p>${template.complianceInfo.details}</p>
          <ul class="compliance-requirements">
            ${template.complianceInfo.keyRequirements.map(req => `<li>${req}</li>`).join('')}
          </ul>
        </div>
      `;
      
      // Show container
      container.classList.remove('hidden');
    }
    
    /**
     * Update benchmarks
     */
    updateBenchmarks(template) {
      if (!template.benchmarks) return;
      
      const container = document.getElementById('industry-benchmarks-container');
      if (!container) return;
      
      // Create benchmarks card
      container.innerHTML = `
        <div class="benchmarks-card">
          <h3>${template.name} Industry Benchmarks</h3>
          <div class="benchmark-metrics">
            <div class="benchmark-metric">
              <label>Average TCO:</label>
              <div class="benchmark-value">${window.formatCurrency(template.benchmarks.averageTCO)}</div>
            </div>
            <div class="benchmark-metric">
              <label>Typical Implementation Time:</label>
              <div class="benchmark-value">${template.benchmarks.implementationTime} days</div>
            </div>
            <div class="benchmark-metric">
              <label>Average Annual FTE Cost:</label>
              <div class="benchmark-value">${window.formatCurrency(template.benchmarks.fteCost)}</div>
            </div>
          </div>
        </div>
      `;
      
      // Show container
      container.classList.remove('hidden');
    }
    
    /**
     * Export results to CSV
     */
    exportToCSV() {
      if (!window.calculator || !window.calculator.results) {
        if (window.notificationManager) {
          window.notificationManager.warn('No results to export');
        } else {
          alert('No results to export');
        }
        return;
      }
      
      try {
        const results = window.calculator.results;
        const currentVendor = this.activeVendor;
        
        // Create CSV content
        let csv = [];
        
        // Add header
        csv.push(['NAC Solution TCO Comparison']);
        csv.push([`Generated on ${new Date().toLocaleDateString()}`]);
        csv.push([]);
        
        // Add organization details
        csv.push(['Organization Details']);
        csv.push(['Device Count', results.deviceCount]);
        csv.push(['Organization Size', results.orgSize.charAt(0).toUpperCase() + results.orgSize.slice(1)]);
        csv.push(['Years Projected', results.yearsToProject]);
        csv.push(['Multiple Locations', results.multipleLocations ? 'Yes' : 'No']);
        if (results.multipleLocations) {
          csv.push(['Location Count', results.locationCount]);
        }
        csv.push(['Complex Authentication', results.complexAuthentication ? 'Yes' : 'No']);
        csv.push(['Legacy Devices', results.legacyDevices ? 'Yes' : 'No']);
        if (results.legacyDevices) {
          csv.push(['Legacy Percentage', `${results.legacyPercentage}%`]);
        }
        csv.push(['Cloud Integration', results.cloudIntegration ? 'Yes' : 'No']);
        csv.push(['Custom Policies', results.customPolicies ? 'Yes' : 'No']);
        if (results.customPolicies) {
          csv.push(['Policy Complexity', results.policyComplexity.charAt(0).toUpperCase() + results.policyComplexity.slice(1)]);
        }
        csv.push([]);
        
        // Add TCO summary
        csv.push(['TCO Summary']);
        
        // Column headers for vendors
        const vendors = Object.keys(results).filter(key => 
          typeof results[key] === 'object' && 
          results[key] !== null && 
          key !== 'implementationResults' &&
          window.vendorData[key]
        );
        
        const vendorNames = ['Cost Component', ...vendors.map(v => window.vendorData[v].name)];
        csv.push(vendorNames);
        
        // Add cost components
        csv.push(['Hardware Costs', ...vendors.map(v => results[v].hardwareCost)]);
        csv.push(['Network Redesign', ...vendors.map(v => results[v].networkRedesignCost)]);
        csv.push(['Implementation', ...vendors.map(v => results[v].implementationCost)]);
        csv.push(['Training', ...vendors.map(v => results[v].trainingCost)]);
        csv.push(['Migration Costs', ...vendors.map(v => results[v].migrationCost || 0)]);
        csv.push([`Maintenance (${results.yearsToProject} years)`, ...vendors.map(v => results[v].maintenanceCost * results.yearsToProject)]);
        csv.push([`Licensing (${results.yearsToProject} years)`, ...vendors.map(v => results[v].licensingCost * results.yearsToProject)]);
        csv.push([`Personnel (${results.yearsToProject} years)`, ...vendors.map(v => results[v].fteCost * results.yearsToProject)]);
        csv.push([`Downtime (${results.yearsToProject} years)`, ...vendors.map(v => results[v].annualDowntimeCost * results.yearsToProject)]);
        csv.push([`Total ${results.yearsToProject}-Year TCO`, ...vendors.map(v => results[v].totalCosts)]);
        csv.push([]);
        
        // Add annual costs
        csv.push(['Annual Operating Costs']);
        csv.push(['Cost Category', ...vendors.map(v => window.vendorData[v].name)]);
        csv.push(['Maintenance', ...vendors.map(v => results[v].maintenanceCost)]);
        csv.push(['Licensing', ...vendors.map(v => results[v].licensingCost)]);
        csv.push(['Personnel (FTE)', ...vendors.map(v => results[v].fteCost)]);
        csv.push(['Downtime', ...vendors.map(v => results[v].annualDowntimeCost)]);
        csv.push(['Total Annual Cost', ...vendors.map(v => results[v].annualCosts)]);
        csv.push([]);
        
        // Add implementation times
        if (results.implementationResults) {
          csv.push(['Implementation Times']);
          csv.push(['Vendor', 'Days']);
          
          Object.keys(results.implementationResults).forEach(vendor => {
            if (window.vendorData[vendor]) {
              csv.push([window.vendorData[vendor].name, results.implementationResults[vendor]]);
            }
          });
        }
        
        // Format CSV
        const csvContent = csv.map(row => {
          return row.map(cell => {
            // Format numbers as currency if needed
            if (typeof cell === 'number') {
              return window.formatCurrency(cell).replace(/\$/g, '');
            }
            
            // Escape commas in text
            if (typeof cell === 'string' && cell.includes(',')) {
              return `"${cell}"`;
            }
            
            return cell;
          }).join(',');
        }).join('\n');
        
        // Create download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `NAC_TCO_Comparison_${new Date().toISOString().slice(0, 10)}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success notification
        if (window.notificationManager) {
          window.notificationManager.success('CSV file exported successfully');
        }
      } catch (error) {
        console.error('Error exporting to CSV:', error);
        
        // Show error notification
        if (window.notificationManager) {
          window.notificationManager.error('Error exporting CSV: ' + error.message);
        } else {
          alert('Error exporting CSV: ' + error.message);
        }
      }
    }
    
    /**
     * Export results to PDF
     */
    exportToPDF() {
      if (!window.calculator || !window.calculator.results) {
        if (window.notificationManager) {
          window.notificationManager.warn('No results to export');
        } else {
          alert('No results to export');
        }
        return;
      }
      
      try {
        // Check if PDF generator is available
        if (window.PDFReportGenerator) {
          const generator = new PDFReportGenerator();
          const results = window.calculator.results;
          const currentVendor = this.activeVendor;
          
          // Get report type
          const reportType = document.getElementById('report-type')?.value || 'complete';
          
          // Generate PDF
          const doc = generator.generateReport(results, currentVendor, reportType);
          
          // Save PDF
          doc.save(`NAC_TCO_Report_${reportType}_${new Date().toISOString().slice(0, 10)}.pdf`);
          
          // Show success notification
          if (window.notificationManager) {
            window.notificationManager.success('PDF report exported successfully');
          }
        } else {
          // Basic PDF generation if PDFReportGenerator is not available
          if (typeof jsPDF !== 'undefined') {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            doc.text('NAC TCO Comparison Report', 105, 15, { align: 'center' });
            doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 25, { align: 'center' });
            
            // Add basic content
            doc.text('Please see the web application for detailed results.', 20, 40);
            
            // Save PDF
            doc.save(`NAC_TCO_Basic_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
            
            // Show success notification
            if (window.notificationManager) {
              window.notificationManager.success('Basic PDF report exported successfully');
            }
          } else {
            throw new Error('PDF generation library not available');
          }
        }
      } catch (error) {
        console.error('Error exporting to PDF:', error);
        
        // Show error notification
        if (window.notificationManager) {
          window.notificationManager.error('Error exporting PDF: ' + error.message);
        } else {
          alert('Error exporting PDF: ' + error.message);
        }
      }
    }
  }
  
  // Assign the UIController class to the window
  window.UIController = UIController;
}
EOL
echo -e "${GREEN}✓ Fixed UIController class redeclaration issue${NC}"

# 4. Add enhanced chart capabilities for ROI and feature comparison
echo -e "\n${YELLOW}[4/7] Enhancing chart implementations...${NC}"
cat > js/chart-enhancements.js << 'EOL'
/**
 * Chart enhancement functions for the NAC TCO Calculator
 * Ensures all charts are properly initialized and rendered
 */
document.addEventListener('DOMContentLoaded', function() {
  // Fix for chart canvas elements not being found
  function ensureChartCanvases() {
    // List of required chart canvas IDs
    const requiredCharts = [
      'tco-comparison-chart',
      'cumulative-cost-chart',
      'current-breakdown-chart',
      'alternative-breakdown-chart',
      'feature-comparison-chart',
      'implementation-comparison-chart',
      'roi-chart'
    ];
    
    // Check each canvas and create if missing
    requiredCharts.forEach(chartId => {
      if (!document.getElementById(chartId)) {
        console.log(`Creating missing chart canvas: ${chartId}`);
        
        // Find container - if not found, create a container in the results section
        let container = document.querySelector(`.chart-container:has(#${chartId})`);
        if (!container) {
          // Find a parent container to append to
          const resultsSection = document.querySelector('.results-grid') || document.querySelector('.results-container');
          if (!resultsSection) return;
          
          // Create a new result card
          const card = document.createElement('div');
          card.className = 'result-card';
          
          // Create title based on chart ID
          const title = document.createElement('h3');
          title.textContent = chartId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').replace('Chart', '');
          
          // Create chart container
          container = document.createElement('div');
          container.className = 'chart-container';
          
          // Assemble card
          card.appendChild(title);
          card.appendChild(container);
          
          // Add to results section
          resultsSection.appendChild(card);
        }
        
        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.id = chartId;
        container.appendChild(canvas);
      }
    });
    
    console.log('All chart canvases are available');
  }
  
  // Fix for ROI chart specifically
  function ensureROIChart() {
    const chartBuilder = window.chartBuilder;
    if (!chartBuilder) return;
    
    if (!chartBuilder.charts.roi) {
      // Try to initialize ROI chart
      try {
        chartBuilder.initROIChart();
        console.log('ROI chart initialized');
      } catch (e) {
        console.error('Error initializing ROI chart:', e);
      }
    }
  }
  
  // Wait for chart builder to be initialized
  function waitForChartBuilder(callback, attempts = 0) {
    if (window.chartBuilder) {
      callback();
    } else if (attempts < 10) {
      setTimeout(() => waitForChartBuilder(callback, attempts + 1), 500);
    } else {
      console.error('Chart builder not available after multiple attempts');
    }
  }
  
  // Run chart fixes
  waitForChartBuilder(() => {
    ensureChartCanvases();
    ensureROIChart();
    
    // Update charts if results are available
    if (window.calculator && window.calculator.resultsAvailable) {
      const results = window.calculator.results;
      const activeVendor = window.uiController ? window.uiController.activeVendor : 'cisco';
      
      window.chartBuilder.updateTCOComparisonChart(results);
      window.chartBuilder.updateCumulativeCostChart(results);
      window.chartBuilder.updateBreakdownCharts(activeVendor, 'portnox');
      window.chartBuilder.updateFeatureComparisonChart(activeVendor);
      window.chartBuilder.updateImplementationComparisonChart(results);
      window.chartBuilder.updateROIChart(results);
    }
  });
});
EOL

# Add chart enhancement script to index.html
if [ -f "index.html" ]; then
  # Add the script before the closing body tag
  sed -i 's/<\/body>/  <script src="js\/chart-enhancements.js"><\/script>\n<\/body>/' index.html
  echo -e "${GREEN}✓ Added chart enhancement script to index.html${NC}"
else
  echo -e "${RED}✗ index.html not found - cannot add chart enhancement script${NC}"
fi

# 5. Enhance On-Prem vs Cloud comparison section
echo -e "\n${YELLOW}[5/7] Enhancing On-Prem vs Cloud comparison...${NC}"
cat > css/comparison-enhancements.css << 'EOL'
/* Enhanced styling for Cloud vs. On-Premises comparison */
.comparison-table-container {
  margin-bottom: 20px;
}

.comparison-table-container .data-table th {
  background-color: #1B67B2;
  color: white;
  padding: 12px;
}

.comparison-table-container .data-table th:nth-child(3) {
  background-color: #2BD25B;
}

.comparison-table-container .data-table tr td:nth-child(3) {
  color: #1CA43F;
  font-weight: 500;
}

.cloud-benefit {
  position: relative;
}

.cloud-benefit::before {
  content: "✓";
  color: #2BD25B;
  font-weight: bold;
  margin-right: 5px;
}

.architecture-diagram-container {
  margin-top: 30px;
}

.architecture-diagram {
  width: 100%;
  height: 300px;
  margin-bottom: 15px;
  background-color: #f8f9fa;
  border-radius: 5px;
  padding: 10px;
}

.architecture-notes {
  padding-left: 20px;
  margin-top: 10px;
}

.architecture-notes li {
  margin-bottom: 5px;
  color: #505050;
}

/* Enhanced industry metrics styling */
.industry-metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.industry-metric {
  background-color: #f8f9fa;
  border-radius: 5px;
  padding: 15px;
  border-left: 4px solid #1B67B2;
}

.industry-metric h4 {
  color: #1B67B2;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.industry-metric ul {
  padding-left: 20px;
  margin-bottom: 0;
}

.industry-details {
  margin-top: 15px;
  padding: 15px;
  border-top: 1px solid #e0e0e0;
  color: #505050;
}

/* Key comparison metrics card enhancement */
.comparison-highlight-card {
  background: linear-gradient(135deg, rgba(27, 103, 178, 0.1) 0%, rgba(43, 210, 91, 0.1) 100%);
  border: 1px solid rgba(43, 210, 91, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.comparison-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.metric-container {
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.metric-label {
  font-size: 1rem;
  color: #1B67B2;
  margin-bottom: 5px;
  font-weight: 500;
}

.metric-value {
  font-size: 1.8rem;
  font-weight: 600;
  color: #2BD25B;
  margin-bottom: 10px;
}

.progress-bar {
  height: 8px;
  background-color: rgba(43, 210, 91, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 5px;
}

.progress {
  height: 100%;
  background-color: #2BD25B;
  border-radius: 4px;
  transition: width 1s ease-in-out;
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #707070;
}

/* Benefits grid enhancement */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.benefit-card {
  display: flex;
  gap: 15px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(43, 210, 91, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.benefit-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.benefit-icon {
  font-size: 1.8rem;
  color: #2BD25B;
  min-width: 30px;
  text-align: center;
}

.benefit-content h5 {
  font-size: 1rem;
  margin-bottom: 5px;
  color: #1B67B2;
  font-weight: 600;
}

.benefit-content p {
  font-size: 0.9rem;
  color: #505050;
  margin-bottom: 8px;
  line-height: 1.4;
}

.benefit-metric {
  font-size: 1rem;
  font-weight: 600;
  color: #2BD25B;
}

/* View-specific styling */
.financial-view .results-container {
  /* Financial view specific styles */
}

.executive-view .results-container {
  /* Executive view specific styles */
}

.technical-view .results-container {
  /* Technical view specific styles */
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .comparison-metrics,
  .benefits-grid,
  .industry-metrics-grid {
    grid-template-columns: 1fr;
  }
  
  .benefit-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .benefit-icon {
    margin-bottom: 10px;
  }
}
EOL

# Add the CSS file to the HTML
if [ -f "index.html" ]; then
  sed -i '/<link rel="stylesheet" href="css\/styles.css">/a \  <link rel="stylesheet" href="css\/comparison-enhancements.css">' index.html
  echo -e "${GREEN}✓ Added comparison enhancement styles to index.html${NC}"
else
  echo -e "${RED}✗ index.html not found - cannot add comparison enhancement styles${NC}"
fi

# 6. Enhance report generation
echo -e "\n${YELLOW}[6/7] Adding enhanced report generation...${NC}"
cat > js/reports/report-enhancement.js << 'EOL'
/**
 * Enhanced report generation for different user views
 */
document.addEventListener('DOMContentLoaded', function() {
  // Fix for missing report-type selector
  const reportTypeSelector = document.getElementById('report-type');
  if (!reportTypeSelector) {
    const exportOptions = document.querySelector('.export-options');
    if (exportOptions) {
      // Create report type selector
      const select = document.createElement('select');
      select.id = 'report-type';
      select.className = 'form-select';
      
      // Add options
      const options = [
        { value: 'complete', label: 'Complete Report' },
        { value: 'executive', label: 'Executive Summary' },
        { value: 'financial', label: 'Financial Analysis' },
        { value: 'technical', label: 'Technical Report' }
      ];
      
      options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.label;
        select.appendChild(opt);
      });
      
      // Add to export options
      exportOptions.appendChild(select);
      console.log('Added report type selector');
    }
  }
  
  // Fix for PDF report generation
  if (typeof window.PDFReportGenerator === 'undefined') {
    // Basic implementation of PDFReportGenerator
    class BasicPDFReportGenerator {
      constructor() {
        // Check if jsPDF is available
        if (typeof jsPDF === 'undefined') {
          console.warn('jsPDF library not available');
        }
      }
      
      generateReport(results, currentVendor, reportType = 'complete') {
        if (!results || !results[currentVendor] || !results['portnox']) {
          throw new Error('Invalid results data');
        }
        
        // Create PDF document
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
          compress: true
        });
        
        // Add title and header
        doc.setFontSize(20);
        doc.setTextColor(27, 103, 178); // Primary color
        
        let title = 'NAC Solution TCO Analysis';
        switch (reportType) {
          case 'executive':
            title = 'NAC Solution Executive Summary';
            break;
          case 'financial':
            title = 'NAC Solution Financial Analysis';
            break;
          case 'technical':
            title = 'NAC Solution Technical Report';
            break;
        }
        
        doc.text(title, 105, 20, { align: 'center' });
        
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100); // Gray
        doc.text(`Comparing ${results[currentVendor].vendorName} vs. Portnox Cloud`, 105, 30, { align: 'center' });
        doc.text(`Generated ${new Date().toLocaleDateString()}`, 105, 38, { align: 'center' });
        
        // Add organization info
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('Organization Details', 20, 50);
        
        // Add organization details
        doc.setFontSize(10);
        doc.text(`Device Count: ${results.deviceCount}`, 20, 60);
        doc.text(`Organization Size: ${results.orgSize.charAt(0).toUpperCase() + results.orgSize.slice(1)}`, 20, 67);
        doc.text(`Years Projected: ${results.yearsToProject}`, 20, 74);
        
        // Add basic cost comparison
        doc.setFontSize(14);
        doc.setTextColor(27, 103, 178);
        doc.text('Cost Comparison', 20, 90);
        
        // Add simple table with TCO
        const currentVendorResults = results[currentVendor];
        const portnoxResults = results['portnox'];
        
        const headers = ['Cost Component', currentVendorResults.vendorName, 'Portnox Cloud', 'Savings'];
        const data = [
          ['Initial Costs', 
            window.formatCurrency(currentVendorResults.totalInitialCosts), 
            window.formatCurrency(portnoxResults.totalInitialCosts),
            window.formatCurrency(currentVendorResults.totalInitialCosts - portnoxResults.totalInitialCosts)
          ],
          ['Ongoing Costs', 
            window.formatCurrency(currentVendorResults.annualCosts * results.yearsToProject), 
            window.formatCurrency(portnoxResults.annualCosts * results.yearsToProject),
            window.formatCurrency(currentVendorResults.annualCosts * results.yearsToProject - portnoxResults.annualCosts * results.yearsToProject)
          ],
          ['Total TCO', 
            window.formatCurrency(currentVendorResults.totalCosts), 
            window.formatCurrency(portnoxResults.totalCosts),
            window.formatCurrency(portnoxResults.totalSavings)
          ]
        ];
        
        // Add table
        doc.autoTable({
          head: [headers],
          body: data,
          startY: 95,
          theme: 'grid',
          styles: {
            fontSize: 9
          },
          headStyles: {
            fillColor: [27, 103, 178],
            textColor: [255, 255, 255],
            fontStyle: 'bold'
          }
        });
        
        // Add footer with page number
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFontSize(10);
          doc.setTextColor(100, 100, 100);
          doc.text('Portnox Cloud NAC Solution', 20, 285);
          doc.text(`Page ${i} of ${pageCount}`, 180, 285);
        }
        
        return doc;
      }
    }
    
    // Register the generator
    window.PDFReportGenerator = BasicPDFReportGenerator;
    console.log('Registered basic PDF report generator');
  }
});
EOL

# Add report enhancement script to index.html
if [ -f "index.html" ]; then
  # Add the script before the closing body tag
  sed -i 's/<\/body>/  <script src="js\/reports\/report-enhancement.js"><\/script>\n<\/body>/' index.html
  echo -e "${GREEN}✓ Added report enhancement script to index.html${NC}"
else
  echo -e "${RED}✗ index.html not found - cannot add report enhancement script${NC}"
fi

# 7. Ensure proper script loading order and prevent multiple initializations
echo -e "\n${YELLOW}[7/7] Updating script loading order in index.html...${NC}"
if [ -f "index.html" ]; then
  # Create initialization order fix script
  cat > js/init-order-fix.js << 'EOL'
/**
 * Initialization order fix for TCO Calculator
 * Ensures components are initialized in the correct order and only once
 */
document.addEventListener('DOMContentLoaded', function() {
  // Component initialization status tracking
  window._initStatus = {
    domCache: false,
    tabManager: false,
    notificationManager: false,
    loadingManager: false,
    validationManager: false,
    uiController: false,
    chartBuilder: false,
    calculator: false
  };
  
  // Original console.log to preserve logging
  const originalConsoleLog = console.log;
  
  // Override console.log to track initializations
  console.log = function() {
    const message = arguments[0];
    
    // Check for initialization messages
    if (typeof message === 'string') {
      if (message.includes('DOM Cache initialized')) {
        window._initStatus.domCache = true;
      } else if (message.includes('Tab Manager initialized')) {
        window._initStatus.tabManager = true;
      } else if (message.includes('Notification Manager initialized')) {
        window._initStatus.notificationManager = true;
      } else if (message.includes('Loading Manager initialized')) {
        window._initStatus.loadingManager = true;
      } else if (message.includes('Validation Manager initialized')) {
        window._initStatus.validationManager = true;
      } else if (message.includes('UI Controller initialized')) {
        window._initStatus.uiController = true;
      } else if (message.includes('Chart Builder initialized')) {
        window._initStatus.chartBuilder = true;
      } else if (message.includes('Calculator initialized')) {
        window._initStatus.calculator = true;
      }
    }
    
    // Call original console.log
    return originalConsoleLog.apply(console, arguments);
  };
  
  // Initialize components if not already initialized
  setTimeout(function() {
    // Check and initialize each component
    if (!window._initStatus.domCache && !window.domCache) {
      console.log('DOM Cache not initialized, initializing now...');
      window.domCache = new DOMCache();
      window.domCache.init();
      console.log('DOM Cache initialized');
    }
    
    if (!window._initStatus.tabManager && !window.tabManager) {
      console.log('Tab Manager not initialized, initializing now...');
      window.tabManager = new TabManager();
      console.log('Tab Manager initialized');
    }
    
    if (!window._initStatus.notificationManager && !window.notificationManager) {
      console.log('Notification Manager not initialized, initializing now...');
      window.notificationManager = new NotificationManager();
      console.log('Notification Manager initialized');
    }
    
    if (!window._initStatus.loadingManager && !window.loadingManager) {
      console.log('Loading Manager not initialized, initializing now...');
      window.loadingManager = new LoadingManager();
      console.log('Loading Manager initialized');
    }
    
    if (!window._initStatus.validationManager && !window.validationManager) {
      console.log('Validation Manager not initialized, initializing now...');
      window.validationManager = new ValidationManager();
      console.log('Validation Manager initialized');
    }
    
    if (!window._initStatus.uiController && !window.uiController) {
      console.log('UI Controller not initialized, initializing now...');
      window.uiController = new UIController();
      console.log('UI Controller initialized');
    }
    
    if (!window._initStatus.chartBuilder && !window.chartBuilder) {
      console.log('Chart Builder not initialized, initializing now...');
      window.chartBuilder = new ChartBuilder();
      window.chartBuilder.initCharts();
      console.log('Chart Builder initialized');
    }
    
    if (!window._initStatus.calculator && !window.calculator) {
      console.log('Calculator not initialized, initializing now...');
      window.calculator = new Calculator();
      console.log('Calculator initialized');
    }
    
    // Set default active vendor if not already set
    if (window.uiController && !window.uiController.activeVendor) {
      window.uiController.setActiveVendor('cisco');
      console.log('Active vendor set to Cisco');
    }
    
    // Run initial calculation if needed and not already running
    if (window.calculator && !window._calculationRunning) {
      window._calculationRunning = true;
      console.log('Running initial calculation...');
      try {
        window.calculator.calculate();
        console.log('Initial calculation completed');
      } catch (err) {
        console.error('Error during initial calculation:', err);
        if (window.notificationManager) {
          window.notificationManager.error('Error calculating TCO. Please try again.');
        }
      }
      window._calculationRunning = false;
    }
  }, 500); // Delay to ensure all scripts are loaded
});
EOL

  # Add the script to index.html
  sed -i 's/<script src="js\/main.js"><\/script>/<script src="js\/init-order-fix.js"><\/script>\n  <script src="js\/main.js"><\/script>/' index.html
  echo -e "${GREEN}✓ Added initialization order fix script to index.html${NC}"
else
  echo -e "${RED}✗ index.html not found - cannot add initialization order fix script${NC}"
fi

echo -e "\n${GREEN}✅ Enhanced fix script completed successfully!${NC}"
echo -e "The following issues have been fixed:"
echo -e "  1. Created SVG and fallback logo handling to ensure logos display properly"
echo -e "  2. Fixed Calculator class redeclaration issue"
echo -e "  3. Fixed UIController class redeclaration issue"
echo -e "  4. Enhanced chart implementations with dynamic canvas creation"
echo -e "  5. Improved On-Prem vs Cloud comparison with better visuals"
echo -e "  6. Enhanced report generation for different views"
echo -e "  7. Fixed script loading order and initialization issues"
echo -e "\nPlease refresh your application to see the changes."
