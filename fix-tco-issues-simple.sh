#!/bin/bash
# Simple NAC TCO Calculator Fix Script
# This script fixes all identified issues without syntax errors

# Color formatting
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting NAC TCO Calculator fix script...${NC}"

# 1. Fix logo loading issue in HTML
echo -e "${YELLOW}[1/4] Fixing logo loading issue...${NC}"
if [ -f "index.html" ]; then
  # Add error handler to logo image
  sed -i 's/<img src="img\/logo.png" alt="Portnox Logo">/<img src="img\/logo.png" alt="Portnox Logo" onerror="this.onerror=null; this.style.display='\''none'\''; document.querySelector('\''\.logo h1'\'').style.marginLeft='\''0'\'';">/' index.html
  echo -e "${GREEN}✓ Updated index.html with error handling for logo${NC}"
else
  echo -e "${RED}✗ index.html not found${NC}"
fi

# 2. Create Calculator class
echo -e "${YELLOW}[2/4] Creating Calculator class...${NC}"
mkdir -p js/components

cat > js/components/calculator.js << 'EOL'
/**
 * TCO Calculator Class
 */
class Calculator {
  constructor() {
    this.results = null;
    this.resultsAvailable = false;
  }
  
  calculate() {
    try {
      // Show loading
      if (window.loadingManager) {
        window.loadingManager.show('results-container', 'Calculating TCO...');
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
      
      // Calculate TCO for each vendor
      Object.keys(window.vendorData).forEach(vendor => {
        const vendorResult = this.calculateVendorTCO(vendor, currentVendor, orgSize, deviceCount, yearsToProject);
        vendorResult.vendorName = window.vendorData[vendor].name;
        results[vendor] = vendorResult;
      });
      
      // Store results
      this.results = results;
      this.resultsAvailable = true;
      
      // Hide loading
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
      }
      
      return true;
    } catch (error) {
      console.error('Error calculating TCO:', error);
      
      // Hide loading
      if (window.loadingManager) {
        window.loadingManager.hide('results-container');
      }
      
      return false;
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
        totalCosts: totalTCO + migrationCost
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
  
  getMigrationFactor(fromVendor, toVendor) {
    if (!fromVendor || !toVendor) return 0.5;
    
    if (window.migrationFactors && 
        window.migrationFactors[fromVendor] && 
        window.migrationFactors[fromVendor][toVendor]) {
      return window.migrationFactors[fromVendor][toVendor];
    }
    
    return 0.5; // Default factor
  }
}
EOL
echo -e "${GREEN}✓ Created Calculator class${NC}"

# 3. Create UIController class
echo -e "${YELLOW}[3/4] Creating UIController class...${NC}"
cat > js/components/ui-controller.js << 'EOL'
/**
 * UI Controller Class
 */
class UIController {
  constructor() {
    this.activeVendor = 'cisco';
    this.initEventListeners();
  }
  
  initEventListeners() {
    // Vendor card selection
    document.querySelectorAll('.vendor-card').forEach(card => {
      card.addEventListener('click', () => {
        const vendor = card.getAttribute('data-vendor');
        if (vendor) {
          this.setActiveVendor(vendor);
        }
      });
    });
    
    // Toggle controls for advanced options
    const multipleLocations = document.getElementById('multiple-locations');
    const locationCountContainer = document.getElementById('location-count-container');
    
    if (multipleLocations && locationCountContainer) {
      multipleLocations.addEventListener('change', () => {
        locationCountContainer.classList.toggle('hidden', !multipleLocations.checked);
      });
    }
    
    const legacyDevices = document.getElementById('legacy-devices');
    const legacyPercentageContainer = document.getElementById('legacy-percentage-container');
    
    if (legacyDevices && legacyPercentageContainer) {
      legacyDevices.addEventListener('change', () => {
        legacyPercentageContainer.classList.toggle('hidden', !legacyDevices.checked);
      });
    }
    
    const customPolicies = document.getElementById('custom-policies');
    const policyComplexityContainer = document.getElementById('policy-complexity-container');
    
    if (customPolicies && policyComplexityContainer) {
      customPolicies.addEventListener('change', () => {
        policyComplexityContainer.classList.toggle('hidden', !customPolicies.checked);
      });
    }
  }
  
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
    
    // Update charts if results are available
    if (window.calculator && window.calculator.resultsAvailable) {
      if (window.chartBuilder) {
        window.chartBuilder.updateFeatureComparisonChart(vendor);
        window.chartBuilder.updateBreakdownCharts(vendor, 'portnox');
      }
    }
  }
  
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
    
    // Update tables
    this.updateTCOSummaryTable(results);
    this.updateAnnualCostsTable(results);
  }
  
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
    
    // Add each cost component row
    tableBody.appendChild(createRow('Hardware', currentResults.hardwareCost, portnoxResults.hardwareCost));
    tableBody.appendChild(createRow('Implementation', currentResults.implementationCost, portnoxResults.implementationCost));
    tableBody.appendChild(createRow('Training', currentResults.trainingCost, portnoxResults.trainingCost));
    tableBody.appendChild(createRow('Annual Costs', currentResults.annualCosts, portnoxResults.annualCosts));
    tableBody.appendChild(createRow('Total TCO', currentResults.totalTCO, portnoxResults.totalTCO));
  }
  
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
    
    // Add each cost component row
    tableBody.appendChild(createRow('Maintenance', currentResults.maintenanceCost, portnoxResults.maintenanceCost));
    tableBody.appendChild(createRow('Licensing', currentResults.licensingCost, portnoxResults.licensingCost));
    tableBody.appendChild(createRow('Personnel', currentResults.fteCost, portnoxResults.fteCost));
    tableBody.appendChild(createRow('Total Annual Cost', currentResults.annualCosts, portnoxResults.annualCosts));
  }
  
  // Export functions
  exportToCSV() {
    console.log("Export to CSV function called");
    if (window.exportTableToCSV) {
      window.exportTableToCSV('tco-summary-table-body', 'NAC_TCO_Comparison.csv');
    }
  }
  
  exportToPDF() {
    console.log("Export to PDF function called");
    // Basic PDF export implementation
    if (window.jspdf) {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      doc.text('NAC TCO Comparison Report', 105, 15, { align: 'center' });
      doc.save("NAC_TCO_Comparison.pdf");
    }
  }
}
EOL
echo -e "${GREEN}✓ Created UIController class${NC}"

# 4. Ensure proper script loading order
echo -e "${YELLOW}[4/4] Fixing script loading order in index.html...${NC}"
if [ -f "index.html" ]; then
  # Ensure Calculator is loaded before UIController
  sed -i 's/js\/components\/ui-controller.js/js\/components\/calculator.js"><\/script>\n  <script src="js\/components\/ui-controller.js/' index.html
  echo -e "${GREEN}✓ Fixed script loading order in index.html${NC}"
else
  echo -e "${RED}✗ index.html not found${NC}"
fi

echo -e "\n${GREEN}✅ Fix script completed successfully!${NC}"
echo -e "The following issues have been fixed:"
echo -e "  1. Added error handling for missing logo image"
echo -e "  2. Created Calculator class implementation"
echo -e "  3. Created UIController class implementation"
echo -e "  4. Fixed script loading order in index.html"
echo -e "\nPlease refresh your application to see the changes."
