#!/bin/bash

# TCO Calculator Restoration and Enhancement Script
# This script restores the calculator's core functionality and applies targeted improvements

# Set up colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting TCO Calculator restoration and enhancement...${NC}"

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
mkdir -p css
mkdir -p img

# STEP 1: Restore critical files with minimal changes
echo -e "\n${YELLOW}Restoring core functionality...${NC}"

# First, restore the original helpers.js
cat > js/utils/helpers.js << 'EOL'
/**
 * Utility functions for the TCO Calculator
 */

// Format currency - make globally available for chart tooltips
window.formatCurrency = function(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};

// Format percentage
function formatPercentage(value) {
  return `${value.toFixed(1)}%`;
}

// Calculate complexity multiplier based on settings
function calculateComplexityMultiplier(vendor, cloudBased) {
  let multiplier = 1.0;
  
  // Cloud vendors are less affected by complexity factors
  const cloudReductionFactor = cloudBased ? 0.4 : 1.0;
  
  if (document.getElementById('multiple-locations')?.checked) {
    // Additional 10% per location beyond the first, up to a max of 100% extra
    const locationCount = parseInt(document.getElementById('location-count')?.value) || 1;
    multiplier += Math.min(0.1 * (locationCount - 1), 1.0) * cloudReductionFactor;
  }
  
  if (document.getElementById('complex-authentication')?.checked) {
    multiplier += 0.15 * cloudReductionFactor;
  }
  
  if (document.getElementById('legacy-devices')?.checked) {
    // Additional 0-30% based on percentage of legacy devices
    const legacyPercentage = parseInt(document.getElementById('legacy-percentage')?.value) || 10;
    multiplier += (legacyPercentage / 100) * 0.3 * cloudReductionFactor;
  }
  
  if (document.getElementById('cloud-integration')?.checked) {
    // Cloud vendors handle this better
    multiplier += 0.1 * cloudReductionFactor;
  }
  
  if (document.getElementById('custom-policies')?.checked) {
    // Different multipliers based on policy complexity
    const policyComplexity = document.getElementById('policy-complexity')?.value || 'medium';
    if (policyComplexity === 'low') {
      multiplier += 0.05 * cloudReductionFactor;
    } else if (policyComplexity === 'medium') {
      multiplier += 0.15 * cloudReductionFactor;
    } else if (policyComplexity === 'high') {
      multiplier += 0.25 * cloudReductionFactor;
    }
  }
  
  return multiplier;
}

// Calculate migration complexity factor
function calculateMigrationFactor(fromVendor, toVendor) {
  if (!fromVendor || !toVendor) return 0.5; // Default factor
  
  const migrationFactors = {
    cisco: {
      aruba: 0.7,
      forescout: 0.6,
      nps: 0.5,
      portnox: 0.3
    },
    aruba: {
      cisco: 0.7,
      forescout: 0.6,
      nps: 0.5,
      portnox: 0.3
    },
    forescout: {
      cisco: 0.7,
      aruba: 0.6,
      nps: 0.5,
      portnox: 0.3
    },
    nps: {
      cisco: 0.8,
      aruba: 0.7,
      forescout: 0.7,
      portnox: 0.3
    },
    portnox: {
      cisco: 0.8,
      aruba: 0.7,
      forescout: 0.7,
      nps: 0.6
    }
  };
  
  if (fromVendor === toVendor) {
    return 0; // Same vendor has no migration cost
  }
  
  if (migrationFactors[fromVendor] && migrationFactors[fromVendor][toVendor]) {
    return migrationFactors[fromVendor][toVendor];
  }
  
  return 0.5; // Default factor if not found
}

// Get FTE costs
function calculateFTECosts(allocation) {
  if (!allocation) return 0;
  
  const fteCosts = {
    networkAdmin: 120000,
    securityAdmin: 135000,
    systemAdmin: 110000,
    helpDesk: 75000
  };
  
  let totalCost = 0;
  for (const [role, amount] of Object.entries(allocation)) {
    totalCost += fteCosts[role] * amount;
  }
  
  return totalCost;
}

// Function to toggle visibility of an element
function toggleVisibility(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.toggle('hidden');
  }
}

// Function to set active tab
window.setActiveTab = function(tabId) {
  // Hide all tab panes
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.remove('active');
  });
  
  // Remove active class from all tab buttons
  document.querySelectorAll('.tab-button').forEach(button => {
    button.classList.remove('active');
  });
  
  // Show selected tab pane
  const selectedPane = document.getElementById(tabId);
  if (selectedPane) {
    selectedPane.classList.add('active');
  }
  
  // Add active class to selected tab button
  document.querySelectorAll(`.tab-button[data-tab="${tabId}"]`).forEach(button => {
    button.classList.add('active');
  });
}

// Function to set active sub tab
window.setActiveSubTab = function(subtabId) {
  // Hide all sub tab panes
  document.querySelectorAll('.sub-tab-pane').forEach(pane => {
    pane.classList.remove('active');
  });
  
  // Remove active class from all sub tab buttons
  document.querySelectorAll('.sub-tab-button').forEach(button => {
    button.classList.remove('active');
  });
  
  // Show selected sub tab pane
  const selectedPane = document.getElementById(subtabId);
  if (selectedPane) {
    selectedPane.classList.add('active');
  }
  
  // Add active class to selected sub tab button
  document.querySelectorAll(`.sub-tab-button[data-subtab="${subtabId}"]`).forEach(button => {
    button.classList.add('active');
  });
}

// Function to create a HTML element with class and text
function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text) {
    element.textContent = text;
  }
  return element;
}
EOL

# Restore Calculator.js with original functionality
cat > js/components/calculator.js << 'EOL'
/**
 * TCO Calculator for computing cost comparisons and ROI
 */

class Calculator {
  constructor() {
    this.results = null;
    this.resultsAvailable = false;
  }

  calculate() {
    try {
      if (!window.vendorData) {
        console.error("Vendor data not available");
        return null;
      }
      
      const currentVendor = window.uiController.activeVendor;
      const deviceCount = parseInt(document.getElementById('device-count').value) || 1000;
      const orgSize = document.getElementById('organization-size').value;
      const yearsToProject = parseInt(document.getElementById('years-to-project').value) || 3;
      
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
      
      return tcoResults;
    } catch (error) {
      console.error("Error in calculator.calculate():", error);
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
      }
    } catch (error) {
      console.error("Error updating UI with calculation results:", error);
    }
  }
}
EOL

# Restore chart-builder.js with original functionality
cat > js/charts/chart-builder.js << 'EOL'
/**
 * Chart Builder for creating and updating charts
 */

class ChartBuilder {
  constructor() {
    this.charts = {};
    this.chartColors = {
      cisco: '#049fd9',      // Cisco blue
      aruba: '#ff8300',      // Aruba orange
      forescout: '#005daa',  // Forescout blue
      nps: '#00a4ef',        // Microsoft blue
      portnox: '#2bd25b'     // Green
    };
  }

  initCharts() {
    this.initTCOComparisonChart();
    this.initCumulativeCostChart();
    this.initBreakdownCharts('cisco', 'portnox');
  }

  initTCOComparisonChart() {
    const ctx = document.getElementById('tco-comparison-chart');
    if (!ctx) return;
    
    const ctxCanvas = ctx.getContext('2d');
    if (!ctxCanvas) return;
    
    this.charts.tcoComparison = new Chart(ctxCanvas, {
      type: 'bar',
      data: {
        labels: ['Cisco ISE', 'Aruba ClearPass', 'Forescout', 'Microsoft NPS', 'Portnox Cloud'],
        datasets: [
          {
            label: 'Initial Costs',
            data: [0, 0, 0, 0, 0],
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Ongoing Costs',
            data: [0, 0, 0, 0, 0],
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            },
            title: {
              display: true,
              text: 'Cost ($)'
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(context.parsed.y);
                }
                return label;
              }
            }
          }
        }
      }
    });
  }

  updateTCOComparisonChart(results) {
    if (!this.charts.tcoComparison || !results) return;
    
    // Safely get vendors
    const vendors = Object.keys(window.vendorData || {});
    if (!vendors.length) return;
    
    const labels = vendors.map(vendor => window.vendorData[vendor].name);
    const initialCostsData = vendors.map(vendor => {
      return results[vendor] ? results[vendor].totalInitialCosts + (results[vendor].migrationCost || 0) : 0;
    });
    const ongoingCostsData = vendors.map(vendor => {
      return results[vendor] ? results[vendor].annualCosts * results.yearsToProject : 0;
    });
    
    this.charts.tcoComparison.data.labels = labels;
    this.charts.tcoComparison.data.datasets[0].data = initialCostsData;
    this.charts.tcoComparison.data.datasets[1].data = ongoingCostsData;
    this.charts.tcoComparison.update();
  }

  initCumulativeCostChart() {
    const ctx = document.getElementById('cumulative-cost-chart');
    if (!ctx) return;
    
    const ctxCanvas = ctx.getContext('2d');
    if (!ctxCanvas) return;
    
    this.charts.cumulativeCost = new Chart(ctxCanvas, {
      type: 'line',
      data: {
        labels: ['Initial', 'Year 1', 'Year 2', 'Year 3'],
        datasets: []
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            },
            title: {
              display: true,
              text: 'Cumulative Cost ($)'
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(context.parsed.y);
                }
                return label;
              }
            }
          }
        }
      }
    });
  }

  updateCumulativeCostChart(results) {
    if (!this.charts.cumulativeCost || !results) return;
    
    // Safely get vendors
    const vendors = Object.keys(window.vendorData || {});
    if (!vendors.length) return;
    
    const yearsToProject = results.yearsToProject || 3;
    
    // Generate labels
    const labels = ['Initial'];
    for (let i = 1; i <= yearsToProject; i++) {
      labels.push(`Year ${i}`);
    }
    
    // Create datasets for each vendor
    const datasets = [];
    
    vendors.forEach(vendor => {
      if (!results[vendor]) return;
      
      const vendorColor = this.chartColors[vendor] || '#888888';
      const data = [];
      
      // Initial costs
      const initialCost = results[vendor].totalInitialCosts + (results[vendor].migrationCost || 0);
      data.push(initialCost);
      
      // Cumulative costs for each year
      for (let i = 1; i <= yearsToProject; i++) {
        data.push(initialCost + (results[vendor].annualCosts * i));
      }
      
      datasets.push({
        label: window.vendorData[vendor].name,
        data: data,
        backgroundColor: vendorColor,
        borderColor: vendorColor,
        borderWidth: vendor === 'portnox' || vendor === window.uiController.activeVendor ? 3 : 2,
        tension: 0.1
      });
    });
    
    this.charts.cumulativeCost.data.labels = labels;
    this.charts.cumulativeCost.data.datasets = datasets;
    this.charts.cumulativeCost.update();
  }

  initBreakdownCharts(currentVendor, altVendor) {
    const currentCtx = document.getElementById('current-breakdown-chart');
    const altCtx = document.getElementById('alternative-breakdown-chart');
    
    if (!currentCtx || !altCtx) return;
    
    const currentCtxCanvas = currentCtx.getContext('2d');
    const altCtxCanvas = altCtx.getContext('2d');
    
    if (!currentCtxCanvas || !altCtxCanvas) return;
    
    const pieOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
              return `${label}: ${window.formatCurrency(value)} (${percentage}%)`;
            }
          }
        }
      }
    };
    
    // Create placeholder charts, to be updated with actual data
    this.charts.currentBreakdown = new Chart(currentCtxCanvas, {
      type: 'pie',
      data: {
        labels: ['Hardware', 'Network Redesign', 'Implementation', 'Training', 'Maintenance', 'Licensing', 'Personnel', 'Downtime'],
        datasets: [{
          data: [0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: [
            '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
            '#8884d8', '#82ca9d', '#ffc658', '#ff8042'
          ]
        }]
      },
      options: pieOptions
    });
    
    this.charts.altBreakdown = new Chart(altCtxCanvas, {
      type: 'pie',
      data: {
        labels: ['Hardware', 'Network Redesign', 'Implementation', 'Training', 'Maintenance', 'Licensing', 'Personnel', 'Downtime'],
        datasets: [{
          data: [0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: [
            '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
            '#8884d8', '#82ca9d', '#ffc658', '#ff8042'
          ]
        }]
      },
      options: pieOptions
    });
  }

  updateBreakdownCharts(currentVendor, altVendor) {
    if (!this.charts.currentBreakdown || !this.charts.altBreakdown || !window.calculator || !window.calculator.results) return;
    
    const results = window.calculator.results;
    
    const createBreakdownData = (vendor) => {
      // Check if vendor exists in results
      const vendorResults = results[vendor];
      if (!vendorResults || !vendorResults.costBreakdown) {
        console.warn(`No cost breakdown data found for vendor: ${vendor}`);
        return [0, 0, 0, 0, 0, 0, 0, 0];
      }
      
      // Create breakdown data from costBreakdown object
      return [
        vendorResults.costBreakdown.hardware || 0,
        vendorResults.costBreakdown.networkRedesign || 0,
        vendorResults.costBreakdown.implementation || 0,
        vendorResults.costBreakdown.training || 0,
        vendorResults.costBreakdown.maintenance || 0,
        vendorResults.costBreakdown.licensing || 0,
        vendorResults.costBreakdown.personnel || 0,
        vendorResults.costBreakdown.downtime || 0
      ];
    };
    
    // Update charts
    try {
      this.charts.currentBreakdown.data.datasets[0].data = createBreakdownData(currentVendor);
      this.charts.currentBreakdown.update();
    } catch (err) {
      console.error("Error updating current breakdown chart:", err);
    }
    
    try {
      this.charts.altBreakdown.data.datasets[0].data = createBreakdownData(altVendor);
      this.charts.altBreakdown.update();
    } catch (err) {
      console.error("Error updating alternative breakdown chart:", err);
    }
  }
}
EOL

# Restore UI Controller with original functionality
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
      } else {
        card.classList.remove('active');
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
    if (!results) return;
    
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
  
  exportToCSV() {
    alert('Export to CSV functionality not implemented yet.');
  }
  
  exportToPDF() {
    alert('Export to PDF functionality not implemented yet.');
  }
}
EOL

# Restore main.js with original functionality
cat > js/main.js << 'EOL'
/**
 * Main JavaScript file for the TCO Calculator
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing TCO Calculator...');
  
  try {
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
    
    // Add calculate button event listener
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', function() {
        window.calculator.calculate();
      });
    }
    
    // Pre-calculate for initial state after a short delay to ensure DOM is ready
    setTimeout(() => {
      try {
        window.calculator.calculate();
        console.log('Initial calculation completed');
      } catch (err) {
        console.error('Error during initial calculation:', err);
      }
    }, 500);
    
    console.log('TCO Calculator initialized and ready');
  } catch (error) {
    console.error('Error initializing TCO Calculator:', error);
  }
});
EOL

# Restore vendor-data.js
cat > js/vendors/vendor-data.js << 'EOL'
/**
 * Vendor data and comparison information
 */

// Make sure vendorData is globally accessible
window.vendorData = {
  cisco: {
    name: 'Cisco ISE',
    logo: 'img/cisco-logo.png',
    cloudBased: false,
    description: 'Enterprise-grade on-premises NAC solution with extensive Cisco ecosystem integration',
    small: {
      initialHardware: 75000,
      annualMaintenance: 25000,
      annualLicensing: 40000,
      networkRedesign: 15000,
      implementation: 35000,
      training: 10000,
      annualDowntime: 24,
      // FTE allocation by role (fraction of full-time)
      fteAllocation: {
        networkAdmin: 0.4,
        securityAdmin: 0.3,
        systemAdmin: 0.2,
        helpDesk: 0.1
      },
      // Implementation timeline in days
      implementationTimeline: {
        planning: 14,
        hardwareDeployment: 10, 
        initialConfiguration: 15,
        testing: 21,
        policyDefinition: 14,
        pilotDeployment: 10,
        fullDeployment: 30,
        postDeploymentTuning: 15
      }
    },
    medium: {
      initialHardware: 150000,
      annualMaintenance: 50000,
      annualLicensing: 100000,
      networkRedesign: 25000,
      implementation: 60000,
      training: 15000,
      annualDowntime: 36,
      fteAllocation: {
        networkAdmin: 0.6,
        securityAdmin: 0.5,
        systemAdmin: 0.3,
        helpDesk: 0.1
      },
      implementationTimeline: {
        planning: 21,
        hardwareDeployment: 15, 
        initialConfiguration: 21,
        testing: 28,
        policyDefinition: 21,
        pilotDeployment: 14,
        fullDeployment: 45,
        postDeploymentTuning: 21
      }
    },
    large: {
      initialHardware: 300000,
      annualMaintenance: 100000,
      annualLicensing: 250000,
      networkRedesign: 50000,
      implementation: 120000,
      training: 30000,
      annualDowntime: 48,
      fteAllocation: {
        networkAdmin: 0.8,
        securityAdmin: 0.7,
        systemAdmin: 0.4,
        helpDesk: 0.1
      },
      implementationTimeline: {
        planning: 30,
        hardwareDeployment: 21, 
        initialConfiguration: 30,
        testing: 35,
        policyDefinition: 30,
        pilotDeployment: 21,
        fullDeployment: 60,
        postDeploymentTuning: 30
      }
    }
  },
  aruba: {
    name: 'Aruba ClearPass',
    logo: 'img/aruba-logo.png',
    cloudBased: false,
    description: 'Comprehensive NAC solution with strong multi-vendor support and policy management',
    small: {
      initialHardware: 65000,
      annualMaintenance: 20000,
      annualLicensing: 35000,
      networkRedesign: 12000,
      implementation: 30000,
      training: 9000,
      annualDowntime: 20,
      fteAllocation: {
        networkAdmin: 0.35,
        securityAdmin: 0.25,
        systemAdmin: 0.2,
        helpDesk: 0.1
      },
      implementationTimeline: {
        planning: 10,
        hardwareDeployment: 8, 
        initialConfiguration: 12,
        testing: 18,
        policyDefinition: 12,
        pilotDeployment: 8,
        fullDeployment: 25,
        postDeploymentTuning: 12
      }
    },
    medium: {
      initialHardware: 130000,
      annualMaintenance: 45000,
      annualLicensing: 90000,
      networkRedesign: 20000,
      implementation: 50000,
      training: 12000,
      annualDowntime: 30,
      fteAllocation: {
        networkAdmin: 0.5,
        securityAdmin: 0.4,
        systemAdmin: 0.3,
        helpDesk: 0.1
      },
      implementationTimeline: {
        planning: 14,
        hardwareDeployment: 12, 
        initialConfiguration: 18,
        testing: 24,
        policyDefinition: 18,
        pilotDeployment: 12,
        fullDeployment: 40,
        postDeploymentTuning: 18
      }
    },
    large: {
      initialHardware: 280000,
      annualMaintenance: 90000,
      annualLicensing: 225000,
      networkRedesign: 40000,
      implementation: 100000,
      training: 25000,
      annualDowntime: 40,
      fteAllocation: {
        networkAdmin: 0.7,
        securityAdmin: 0.5,
        systemAdmin: 0.4,
        helpDesk: 0.1
      },
      implementationTimeline: {
        planning: 21,
        hardwareDeployment: 18, 
        initialConfiguration: 25,
        testing: 30,
        policyDefinition: 25,
        pilotDeployment: 16,
        fullDeployment: 55,
        postDeploymentTuning: 25
      }
    }
  },
  forescout: {
    name: 'Forescout',
    logo: 'img/forescout-logo.png',
    cloudBased: false,
    description: 'Visibility-focused NAC solution with strong device discovery and classification',
    small: {
      initialHardware: 70000,
      annualMaintenance: 22000,
      annualLicensing: 38000,
      networkRedesign: 10000,
      implementation: 32000,
      training: 8000,
      annualDowntime: 18,
      fteAllocation: {
        networkAdmin: 0.3,
        securityAdmin: 0.3,
        systemAdmin: 0.2,
        helpDesk: 0.1
      },
      implementationTimeline: {
        planning: 12,
        hardwareDeployment: 8, 
        initialConfiguration: 14,
        testing: 16,
        policyDefinition: 12,
        pilotDeployment: 7,
        fullDeployment: 20,
        postDeploymentTuning: 10
      }
    },
    medium: {
      initialHardware: 140000,
      annualMaintenance: 48000,
      annualLicensing: 95000,
      networkRedesign: 18000,
      implementation: 45000,
      training: 14000,
      annualDowntime: 28,
      fteAllocation: {
        networkAdmin: 0.45,
        securityAdmin: 0.45,
        systemAdmin: 0.3,
        helpDesk: 0.1
      },
      implementationTimeline: {
        planning: 16,
        hardwareDeployment: 12, 
        initialConfiguration: 18,
        testing: 20,
        policyDefinition: 18,
        pilotDeployment: 10,
        fullDeployment: 35,
        postDeploymentTuning: 15
      }
    },
    large: {
      initialHardware: 290000,
      annualMaintenance: 95000,
      annualLicensing: 230000,
      networkRedesign: 35000,
      implementation: 90000,
      training: 25000,
      annualDowntime: 36,
      fteAllocation: {
        networkAdmin: 0.6,
        securityAdmin: 0.6,
        systemAdmin: 0.4,
        helpDesk: 0.1
      },
      implementationTimeline: {
        planning: 24,
        hardwareDeployment: 18, 
        initialConfiguration: 24,
        testing: 25,
        policyDefinition: 24,
        pilotDeployment: 14,
        fullDeployment: 45,
        postDeploymentTuning: 20
      }
    }
  },
  nps: {
    name: 'Microsoft NPS',
    logo: 'img/microsoft-logo.png',
    cloudBased: false,
    description: 'Basic Windows-based RADIUS server with limited NAC functionality',
    small: {
      initialHardware: 15000,
      annualMaintenance: 5000,
      annualLicensing: 0,
      networkRedesign: 8000,
      implementation: 20000,
      training: 5000,
      annualDowntime: 30,
      fteAllocation: {
        networkAdmin: 0.2,
        securityAdmin: 0.1,
        systemAdmin: 0.4,
        helpDesk: 0.1
      },
      implementationTimeline: {
        planning: 10,
        hardwareDeployment: 5, 
        initialConfiguration: 7,
        testing: 10,
        policyDefinition: 7,
        pilotDeployment: 5,
        fullDeployment: 15,
        postDeploymentTuning: 8
      }
    },
    medium: {
      initialHardware: 30000,
      annualMaintenance: 10000,
      annualLicensing: 0,
      networkRedesign: 15000,
      implementation: 30000,
      training: 8000,
      annualDowntime: 48,
      fteAllocation: {
        networkAdmin: 0.3,
        securityAdmin: 0.2,
        systemAdmin: 0.6,
        helpDesk: 0.1
      },
      implementationTimeline: {
        planning: 15,
        hardwareDeployment: 8, 
        initialConfiguration: 10,
        testing: 15,
        policyDefinition: 10,
        pilotDeployment: 7,
        fullDeployment: 25,
        postDeploymentTuning: 12
      }
    },
    large: {
      initialHardware: 60000,
      annualMaintenance: 20000,
      annualLicensing: 0,
      networkRedesign: 25000,
      implementation: 50000,
      training: 15000,
      annualDowntime: 72,
      fteAllocation: {
        networkAdmin: 0.4,
        securityAdmin: 0.3,
        systemAdmin: 0.8,
        helpDesk: 0.2
      },
      implementationTimeline: {
        planning: 20,
        hardwareDeployment: 12, 
        initialConfiguration: 15,
        testing: 20,
        policyDefinition: 15,
        pilotDeployment: 10,
        fullDeployment: 35,
        postDeploymentTuning: 18
      }
    }
  },
  portnox: {
    name: 'Portnox Cloud',
    logo: 'img/portnox-logo.png',
    cloudBased: true,
    description: 'Cloud-native NAC solution with zero-trust approach and simplified deployment',
    small: {
      initialHardware: 0,
      annualMaintenance: 5000,
      annualLicensing: 25000,
      networkRedesign: 2000,
      implementation: 5000,
      training: 2000,
      annualDowntime: 4,
      fteAllocation: {
        networkAdmin: 0.1,
        securityAdmin: 0.1,
        systemAdmin: 0.025,
        helpDesk: 0.025
      },
      implementationTimeline: {
        planning: 3,
        cloudAccountSetup: 1, 
        initialConfiguration: 2,
        testing: 3,
        policyDefinition: 3,
        pilotDeployment: 2,
        fullDeployment: 4,
        postDeploymentTuning: 2
      }
    },
    medium: {
      initialHardware: 0,
      annualMaintenance: 7500,
      annualLicensing: 60000,
      networkRedesign: 4000,
      implementation: 10000,
      training: 4000,
      annualDowntime: 6,
      fteAllocation: {
        networkAdmin: 0.2,
        securityAdmin: 0.15,
        systemAdmin: 0.05,
        helpDesk: 0.05
      },
      implementationTimeline: {
        planning: 5,
        cloudAccountSetup: 1, 
        initialConfiguration: 3,
        testing: 4,
        policyDefinition: 4,
        pilotDeployment: 3,
        fullDeployment: 7,
        postDeploymentTuning: 3
      }
    },
    large: {
      initialHardware: 0,
      annualMaintenance: 10000,
      annualLicensing: 150000,
      networkRedesign: 8000,
      implementation: 20000,
      training: 8000,
      annualDowntime: 8,
      fteAllocation: {
        networkAdmin: 0.3,
        securityAdmin: 0.25,
        systemAdmin: 0.1,
        helpDesk: 0.1
      },
      implementationTimeline: {
        planning: 8,
        cloudAccountSetup: 1, 
        initialConfiguration: 5,
        testing: 7,
        policyDefinition: 7,
        pilotDeployment: 5,
        fullDeployment: 14,
        postDeploymentTuning: 5
      }
    }
  }
};

// Portnox benefits data - make globally available
window.portnoxBenefits = [
  {
    title: "Zero Hardware Costs",
    description: "Eliminate capital expenditure on NAC appliances and associated server infrastructure",
    icon: "??",
    metric: "100% savings"
  },
  {
    title: "Reduced Implementation Time",
    description: "Get up and running 70-85% faster than traditional NAC solutions",
    icon: "??",
    metric: "75% faster"
  },
  {
    title: "Lower IT Staffing Requirements",
    description: "Decrease NAC administration overhead by up to 80%",
    icon: "??",
    metric: "$180,000/year"
  },
  {
    title: "Reduced Downtime",
    description: "Minimize business disruption with significantly fewer outages",
    icon: "??",
    metric: "85% reduction"
  },
  {
    title: "Automated Updates",
    description: "Eliminate maintenance windows and manual update processes",
    icon: "??",
    metric: "Zero downtime updates"
  },
  {
    title: "Faster ROI",
    description: "Achieve return on investment in a fraction of the time",
    icon: "??",
    metric: "0.8 years"
  }
];
EOL

# STEP 2: Restore CSS with original styles
echo -e "\n${YELLOW}Restoring original CSS...${NC}"
cat > css/styles.css << 'EOL'
/* Base styles and variables */
:root {
    --primary-color: #1B67B2;
    --primary-dark: #0A4D91;
    --primary-light: #3F88D5;
    --accent-color: #2BD25B;
    --accent-dark: #1CA43F;
    --accent-light: #5EE588;
    --danger-color: #B54369;
    --warning-color: #C77F1A;
    --text-primary: #202020;
    --text-secondary: #505050;
    --text-light: #707070;
    --text-white: #FFFFFF;
    --bg-light: #F5F7FA;
    --bg-white: #FFFFFF;
    --border-color: #E0E0E0;
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.1);
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --spacing-xxl: 48px;
    --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Reset and base styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--font-family);
    color: var(--text-primary);
    background-color: var(--bg-light);
    line-height: 1.5;
}

.hidden {
    display: none !important;
}

/* Layout */
.app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.app-header {
    background-color: var(--bg-white);
    border-bottom: 1px solid var(--border-color);
    padding: var(--spacing-md) var(--spacing-xl);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: var(--shadow-sm);
}

.logo {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.logo img {
    height: 40px;
    width: auto;
    object-fit: contain;
}

.logo h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--primary-color);
}

.header-actions {
    display: flex;
    gap: var(--spacing-sm);
}

.calculator-container {
    display: flex;
    flex: 1;
    padding: var(--spacing-xl);
    gap: var(--spacing-xl);
}

.sidebar {
    width: 350px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.results-container {
    flex: 1;
    background-color: var(--bg-white);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.app-footer {
    background-color: var(--bg-white);
    border-top: 1px solid var(--border-color);
    padding: var(--spacing-md) var(--spacing-xl);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer-links {
    display: flex;
    gap: var(--spacing-md);
}

.footer-links a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.9rem;
}

.footer-links a:hover {
    color: var(--primary-color);
    text-decoration: underline;
}

/* Cards and Input Containers */
.vendor-selection-card,
.organization-inputs,
.portnox-spotlight {
    background-color: var(--bg-white);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    padding: var(--spacing-md);
}

.vendor-selection-card h3,
.organization-inputs h3,
.portnox-spotlight h3 {
    margin-bottom: var(--spacing-md);
    color: var(--text-primary);
    font-size: 1.2rem;
    font-weight: 600;
}

.vendor-options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
}

.vendor-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-md);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.vendor-card.active {
    border-color: var(--primary-color);
    background-color: rgba(27, 103, 178, 0.05);
    box-shadow: var(--shadow-sm);
}

.vendor-card img {
    height: 30px;
    width: auto;
    margin-bottom: var(--spacing-sm);
    object-fit: contain;
}

.vendor-card span {
    font-size: 0.9rem;
    color: var(--text-secondary);
    text-align: center;
}

.input-group {
    margin-bottom: var(--spacing-md);
}

.input-group label {
    display: block;
    margin-bottom: var(--spacing-xs);
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.input-group input,
.input-group select {
    width: 100%;
    padding: var(--spacing-sm);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: 1rem;
}

.checkbox-group {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}

.checkbox-group input[type="checkbox"] {
    width: auto;
}

.range-container {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}

.range-container input[type="range"] {
    flex: 1;
}

.advanced-options-toggle {
    margin-bottom: var(--spacing-md);
}

.advanced-options-panel {
    border-top: 1px solid var(--border-color);
    padding-top: var(--spacing-md);
}

.portnox-spotlight {
    background: linear-gradient(135deg, #F0F9FF 0%, #E6FFF0 100%);
    border: 1px solid rgba(43, 210, 91, 0.2);
}

.portnox-spotlight p {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-md);
    font-size: 0.95rem;
}

.potential-savings-container {
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: var(--radius-sm);
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-md);
}

.savings-metric {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-sm);
}

.savings-metric:last-child {
    margin-bottom: 0;
}

.savings-metric label {
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.savings-amount {
    color: var(--accent-dark);
    font-weight: 600;
}

/* Buttons */
.btn {
    cursor: pointer;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-sm);
    font-size: 0.95rem;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease-in-out;
    gap: var(--spacing-sm);
}

.btn i {
    font-size: 0.9rem;
}

.btn-primary {
    background-color: var(--accent-color);
    color: var(--text-white);
    border: none;
}

.btn-primary:hover {
    background-color: var(--accent-dark);
}

.btn-outline {
    background-color: transparent;
    color: var(--text-secondary);
    border: 1px solid var(--border-color);
}

.btn-outline:hover {
    background-color: var(--bg-light);
    border-color: var(--text-secondary);
}

.btn-text {
    background-color: transparent;
    color: var(--primary-color);
    border: none;
    padding: var(--spacing-xs) 0;
}

.btn-text:hover {
    color: var(--primary-dark);
    text-decoration: underline;
}

#calculate-btn {
    width: 100%;
    padding: var(--spacing-md);
    font-weight: 600;
}

/* Tabs */
.tabs {
    display: flex;
    border-bottom: 1px solid var(--border-color);
    background-color: var(--bg-light);
}

.tab-button {
    padding: var(--spacing-md) var(--spacing-lg);
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    cursor: pointer;
    font-weight: 500;
    color: var(--text-secondary);
    transition: all 0.2s ease-in-out;
}

.tab-button:hover {
    color: var(--primary-color);
}

.tab-button.active {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
}

.tab-content {
    flex: 1;
    overflow: auto;
    padding: var(--spacing-md);
}

.tab-pane {
    display: none;
}

.tab-pane.active {
    display: block;
}

/* Sub-tabs */
.sub-tabs {
    display: flex;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: var(--spacing-md);
}

.sub-tab-button {
    padding: var(--spacing-sm) var(--spacing-md);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
    color: var(--text-secondary);
    transition: all 0.2s ease-in-out;
}

.sub-tab-button:hover {
    color: var(--primary-color);
}

.sub-tab-button.active {
    color: var(--primary-color);
    font-weight: 500;
    position: relative;
}

.sub-tab-button.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--primary-color);
}

.sub-tab-pane {
    display: none;
}

.sub-tab-pane.active {
    display: block;
}

/* Charts and Result Cards */
.results-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
}

.result-card {
    background-color: var(--bg-white);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-md);
}

.result-card h3 {
    font-size: 1.1rem;
    margin-bottom: var(--spacing-md);
    color: var(--text-primary);
}

.chart-container {
    height: 260px;
    position: relative;
}

/* Tables */
.table-container {
    overflow-x: auto;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
}

.data-table th,
.data-table td {
    padding: var(--spacing-sm) var(--spacing-md);
    text-align: left;
    border-bottom: 1px solid var(--border-color);
}

.data-table th {
    background-color: var(--bg-light);
    font-weight: 600;
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.data-table td {
    font-size: 0.95rem;
}

.data-table tr:hover td {
    background-color: rgba(27, 103, 178, 0.05);
}

/* Comparison Highlight Card */
.comparison-highlight-card {
    background: linear-gradient(135deg, rgba(27, 103, 178, 0.05) 0%, rgba(43, 210, 91, 0.05) 100%);
    border: 1px solid rgba(43, 210, 91, 0.2);
    border-radius: var(--radius-md);
    padding: var(--spacing-lg);
}

.comparison-highlight-card h3 {
    color: var(--primary-color);
    margin-bottom: var(--spacing-md);
}

.comparison-metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
}

.metric-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.metric-label {
    font-size: 0.9rem;
    color: var(--text-secondary);
}

.metric-value {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--accent-dark);
}

.progress-bar {
    height: 8px;
    background-color: rgba(43, 210, 91, 0.1);
    border-radius: 4px;
    overflow: hidden;
    margin: var(--spacing-xs) 0;
}

.progress {
    height: 100%;
    background-color: var(--accent-color);
}

.progress-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: var(--text-light);
}

.key-benefits h4 {
    margin-bottom: var(--spacing-md);
    font-size: 1rem;
    color: var(--text-primary);
}

.benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-md);
}

.benefit-card {
    display: flex;
    gap: var(--spacing-sm);
    background-color: rgba(255, 255, 255, 0.7);
    padding: var(--spacing-md);
    border-radius: var(--radius-sm);
    border: 1px solid rgba(43, 210, 91, 0.1);
}

.benefit-icon {
    font-size: 1.5rem;
    color: var(--accent-color);
}

.benefit-content h5 {
    font-size: 0.95rem;
    margin-bottom: var(--spacing-xs);
    color: var(--text-primary);
}

.benefit-content p {
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-bottom: var(--spacing-xs);
}

.benefit-metric {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--accent-dark);
}

/* Export buttons */
.export-options {
    display: flex;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
}

/* Enhanced table styles */
.current-vendor {
    background-color: rgba(27, 103, 178, 0.1);
}

.portnox-vendor {
    background-color: rgba(43, 210, 91, 0.1);
}

/* Responsive Adjustments */
@media (max-width: 1100px) {
    .calculator-container {
        flex-direction: column;
    }

    .sidebar {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
}

@media (max-width: 768px) {
    .results-grid {
        grid-template-columns: 1fr;
    }

    .comparison-metrics {
        grid-template-columns: 1fr;
    }

    .benefits-grid {
        grid-template-columns: 1fr;
    }

    .app-header {
        flex-direction: column;
        gap: var(--spacing-md);
        padding: var(--spacing-md);
    }

    .header-actions {
        width: 100%;
        justify-content: center;
    }

    .tabs {
        overflow-x: auto;
        white-space: nowrap;
    }
}

@media (max-width: 480px) {
    .calculator-container {
        padding: var(--spacing-md);
    }

    .vendor-options {
        grid-template-columns: 1fr;
    }
    
    .export-options {
        flex-direction: column;
    }
}
EOL

# STEP 3: Restore basic HTML structure
echo -e "\n${YELLOW}Creating basic HTML file...${NC}"
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
    <script src="js/vendors/vendor-data.js"></script>
    <script src="js/charts/chart-builder.js"></script>
    <script src="js/components/calculator.js"></script>
    <script src="js/components/ui-controller.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
EOL

# STEP 4: Create placeholder logos if they don't exist
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

# STEP 5: Add simple targeted enhancements
echo -e "\n${YELLOW}Adding targeted enhancements...${NC}"

# Add annual costs table functionality to UI Controller
cat >> js/components/ui-controller.js << 'EOL'

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
      
      // Populate cells
      row.innerHTML = `
        <td>${category.name}</td>
        <td>${window.formatCurrency(current)}</td>
        <td>${window.formatCurrency(portnox)}</td>
        <td>${window.formatCurrency(savings)} (${savingsPercentage.toFixed(1)}%)</td>
      `;
      
      // Add to table
      tableBody.appendChild(row);
    });
  }
EOL

# Update calculator.updateUI to also update annual costs table
sed -i 's/window.uiController.updatePortnoxAdvantageSection(this.results);/window.uiController.updatePortnoxAdvantageSection(this.results);\n        window.uiController.updateAnnualCostsTable(this.results);/g' js/components/calculator.js 2>/dev/null
# For macOS compatibility
sed -i '' 's/window.uiController.updatePortnoxAdvantageSection(this.results);/window.uiController.updatePortnoxAdvantageSection(this.results);\n        window.uiController.updateAnnualCostsTable(this.results);/g' js/components/calculator.js 2>/dev/null

# Add implementation table functionality to UIController
cat >> js/components/ui-controller.js << 'EOL'

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
    
    // Populate cells
    row.innerHTML = `
      <td>Total Implementation Time</td>
      <td>${currentDays.toFixed(1)} days</td>
      <td>${portnoxDays.toFixed(1)} days</td>
      <td>${timeSavings.toFixed(1)} days (${savingsPercentage.toFixed(1)}%)</td>
    `;
    
    // Add to table
    tableBody.appendChild(row);
  }
EOL

# Update calculator.updateUI to also update implementation table
sed -i 's/window.uiController.updateAnnualCostsTable(this.results);/window.uiController.updateAnnualCostsTable(this.results);\n        window.uiController.updateImplementationTable(this.results);/g' js/components/calculator.js 2>/dev/null
# For macOS compatibility
sed -i '' 's/window.uiController.updateAnnualCostsTable(this.results);/window.uiController.updateAnnualCostsTable(this.results);\n        window.uiController.updateImplementationTable(this.results);/g' js/components/calculator.js 2>/dev/null

# Add debugging output to confirm proper initialization
cat >> js/main.js << 'EOL'

// Add initialization info to the UI
function addDebugInfo() {
  try {
    const resultsContainer = document.querySelector('.results-container');
    if (!resultsContainer) return;
    
    const debugInfo = document.createElement('div');
    debugInfo.id = 'debug-info';
    debugInfo.style.display = 'none';
    debugInfo.innerHTML = `
      <p>UI Controller: ${window.uiController ? 'Initialized' : 'Not initialized'}</p>
      <p>Chart Builder: ${window.chartBuilder ? 'Initialized' : 'Not initialized'}</p>
      <p>Calculator: ${window.calculator ? 'Initialized' : 'Not initialized'}</p>
      <p>Active Vendor: ${window.uiController?.activeVendor || 'None'}</p>
      <p>Calculation Results: ${window.calculator?.resultsAvailable ? 'Available' : 'Not available'}</p>
    `;
    
    resultsContainer.appendChild(debugInfo);
    
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

// Call the debug function after initialization
setTimeout(addDebugInfo, 1000);
EOL

echo -e "${GREEN}Targeted enhancements added successfully${NC}"

# Final summary
echo -e "\n${GREEN}TCO Calculator Restoration and Enhancement Completed${NC}"
echo -e "\n${YELLOW}Summary of Changes:${NC}"
echo -e "  1. Restored core functionality with original code"
echo -e "  2. Added annual costs table implementation"
echo -e "  3. Added implementation timeline table"
echo -e "  4. Added debug information tool for troubleshooting"
echo -e "  5. Created placeholder vendor logos"

echo -e "\n${YELLOW}Next Steps:${NC}"
echo -e "  1. Open index.html in your browser to test the calculator"
echo -e "  2. Verify that all sections appear correctly"
echo -e "  3. Check that calculations work properly"
echo -e "  4. Enable debug info link in footer if you encounter issues"

echo -e "\n${GREEN}The TCO Calculator should now be functioning correctly!${NC}"
echo -e "${YELLOW}Test thoroughly before making additional enhancements.${NC}"
