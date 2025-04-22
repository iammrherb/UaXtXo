#!/bin/bash
# Comprehensive TCO Calculator Update Script
# This script addresses all issues with the TCO Calculator application

echo "Starting the TCO Calculator update process..."

# Create backups of original files
echo "Creating backups..."
mkdir -p backups
cp -r js backups/ 2>/dev/null || echo "No js directory to backup"
cp -r css backups/ 2>/dev/null || echo "No css directory to backup"
cp index.html backups/ 2>/dev/null || echo "No index.html to backup"

# Create necessary directories
mkdir -p js/charts js/components js/utils js/vendors css img

# Fix the chart-builder.js to handle undefined data correctly
echo "Creating chart-builder.js with error handling..."
cat > js/charts/chart-builder.js << 'EOF'
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
EOF

# Create helpers.js utility file with global formatCurrency function
echo "Creating helpers.js utility file..."
cat > js/utils/helpers.js << 'EOF'
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
function setActiveTab(tabId) {
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
function setActiveSubTab(subtabId) {
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
EOF

# Create vendorData and make sure it's exported globally
echo "Creating vendor-data.js with global exports..."
cat > js/vendors/vendor-data.js << 'EOF'
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
EOF

# Create the UI controller with improved error handling
echo "Creating UI controller..."
cat > js/components/ui-controller.js << 'EOF'
/**
 * UI Controller for handling user interface interactions
 */

class UIController {
  constructor() {
    this.initEventListeners();
    this.initAdvancedOptions();
    this.activeVendor = 'cisco'; // Default active vendor
  }

  initEventListeners() {
    try {
      // Tab buttons
      document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
          const tabId = button.getAttribute('data-tab');
          if (tabId) setActiveTab(tabId);
        });
      });

      // Sub-tab buttons
      document.querySelectorAll('.sub-tab-button').forEach(button => {
        button.addEventListener('click', () => {
          const subtabId = button.getAttribute('data-subtab');
          if (subtabId) setActiveSubTab(subtabId);
        });
      });

      // Advanced options toggle
      const advancedToggle = document.getElementById('advanced-toggle');
      if (advancedToggle) {
        advancedToggle.addEventListener('click', () => {
          toggleVisibility('advanced-options');
          const icon = advancedToggle.querySelector('.fa-chevron-down, .fa-chevron-up');
          if (icon) {
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
          }
        });
      }

      // Vendor cards
      document.querySelectorAll('.vendor-card').forEach(card => {
        card.addEventListener('click', () => {
          const vendor = card.getAttribute('data-vendor');
          if (vendor) this.setActiveVendor(vendor);
        });
      });

      // Conditional display fields
      const multipleLocations = document.getElementById('multiple-locations');
      if (multipleLocations) {
        multipleLocations.addEventListener('change', () => {
          const container = document.querySelector('.location-count-container');
          if (container) {
            container.classList.toggle('hidden', !multipleLocations.checked);
          }
        });
      }

      const legacyDevices = document.getElementById('legacy-devices');
      if (legacyDevices) {
        legacyDevices.addEventListener('change', () => {
          const container = document.querySelector('.legacy-devices-container');
          if (container) {
            container.classList.toggle('hidden', !legacyDevices.checked);
          }
        });
      }

      const customPolicies = document.getElementById('custom-policies');
      if (customPolicies) {
        customPolicies.addEventListener('change', () => {
          const container = document.querySelector('.custom-policies-container');
          if (container) {
            container.classList.toggle('hidden', !customPolicies.checked);
          }
        });
      }

      // Legacy percentage range input
      const legacyPercentage = document.getElementById('legacy-percentage');
      if (legacyPercentage) {
        legacyPercentage.addEventListener('input', () => {
          const display = document.getElementById('legacy-percentage-display');
          if (display) {
            display.textContent = `${legacyPercentage.value}%`;
          }
        });
      }

      // Calculate button
      const calculateBtn = document.getElementById('calculate-btn');
      if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
          // Trigger calculation
          if (window.calculator) {
            window.calculator.calculate();
          }
        });
      }

      // Modal close button
      const closeButton = document.querySelector('.close-button');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          const modal = document.getElementById('results-modal');
          if (modal) {
            modal.classList.add('hidden');
          }
        });
      }

      // Close modal button
      const closeModal = document.getElementById('close-modal');
      if (closeModal) {
        closeModal.addEventListener('click', () => {
          const modal = document.getElementById('results-modal');
          if (modal) {
            modal.classList.add('hidden');
          }
        });
      }
    } catch (error) {
      console.error("Error initializing event listeners:", error);
    }
  }

  initAdvancedOptions() {
    try {
      // Hide conditional containers initially
      const locationContainer = document.querySelector('.location-count-container');
      const legacyContainer = document.querySelector('.legacy-devices-container');
      const policiesContainer = document.querySelector('.custom-policies-container');
      
      if (locationContainer) locationContainer.classList.add('hidden');
      if (legacyContainer) legacyContainer.classList.add('hidden');
      if (policiesContainer) policiesContainer.classList.add('hidden');
      
      // Hide advanced options panel initially
      const advancedPanel = document.getElementById('advanced-options');
      if (advancedPanel) advancedPanel.classList.add('hidden');
    } catch (error) {
      console.error("Error initializing advanced options:", error);
    }
  }

  setActiveVendor(vendor) {
    if (!vendor) return;
    
    try {
      // Remove active class from all vendor cards
      document.querySelectorAll('.vendor-card').forEach(card => {
        card.classList.remove('active');
      });
      
      // Add active class to selected vendor card
      const selectedCard = document.querySelector(`.vendor-card[data-vendor="${vendor}"]`);
      if (selectedCard) {
        selectedCard.classList.add('active');
      }
      
      this.activeVendor = vendor;
      
      // Update UI elements with vendor name
      if (window.vendorData && window.vendorData[vendor]) {
        const vendorName = window.vendorData[vendor].name;
        const currentNameElements = document.querySelectorAll('#current-solution-name, #breakdown-current-solution');
        currentNameElements.forEach(element => {
          if (element) element.textContent = vendorName;
        });
      }
      
      // If calculation is already done, recalculate
      if (window.calculator && window.calculator.resultsAvailable) {
        window.calculator.calculate();
      }
    } catch (error) {
      console.error("Error setting active vendor:", error);
    }
  }

  showResults() {
    try {
      const resultsModal = document.getElementById('results-modal');
      if (resultsModal) {
        resultsModal.classList.remove('hidden');
      }
    } catch (error) {
      console.error("Error showing results:", error);
    }
  }

  updateBenefits() {
    try {
      const benefitsGrid = document.querySelector('.benefits-grid');
      if (!benefitsGrid || !window.portnoxBenefits) return;
      
      // Clear previous benefits
      benefitsGrid.innerHTML = '';
      
      // Add benefit cards
      window.portnoxBenefits.forEach(benefit => {
        const benefitCard = createElement('div', 'benefit-card');
        
        const iconElement = createElement('div', 'benefit-icon');
        iconElement.textContent = benefit.icon;
        
        const contentElement = createElement('div', 'benefit-content');
        
        const titleElement = createElement('h5', '', benefit.title);
        const descElement = createElement('p', '', benefit.description);
        const metricElement = createElement('div', 'benefit-metric', benefit.metric);
        
        contentElement.appendChild(titleElement);
        contentElement.appendChild(descElement);
        contentElement.appendChild(metricElement);
        
        benefitCard.appendChild(iconElement);
        benefitCard.appendChild(contentElement);
        
        benefitsGrid.appendChild(benefitCard);
      });
    } catch (error) {
      console.error("Error updating benefits:", error);
    }
  }

  populateTCOSummaryTable(results) {
    try {
      const tableBody = document.querySelector('#tco-summary-table tbody');
      if (!tableBody || !window.vendorData) return;
      
      // Clear previous rows
      tableBody.innerHTML = '';
      
      const currentVendor = this.activeVendor;
      if (!results[currentVendor]) return;
      
      const currentTCO = results[currentVendor].totalTCO;
      
      // Add a row for each vendor
      Object.keys(window.vendorData).forEach(vendor => {
        const vendorResult = results[vendor];
        if (!vendorResult) return;
        
        const row = document.createElement('tr');
        
        // Highlight current solution and Portnox
        if (vendor === currentVendor) {
          row.classList.add('current-solution');
          row.style.backgroundColor = 'rgba(27, 103, 178, 0.1)';
        } else if (vendor === 'portnox') {
          row.style.backgroundColor = 'rgba(43, 210, 91, 0.1)';
        }
        
        // Make row clickable to set focus vendor
        row.style.cursor = 'pointer';
        row.addEventListener('click', () => {
          const altSolutionName = document.getElementById('breakdown-alt-solution');
          if (altSolutionName && window.vendorData[vendor]) {
            altSolutionName.textContent = window.vendorData[vendor].name;
          }
          
          // Update charts
          if (window.chartBuilder) {
            window.chartBuilder.updateBreakdownCharts(currentVendor, vendor);
          }
        });
        
        // Vendor cell
        const vendorCell = document.createElement('td');
        vendorCell.innerHTML = `
          <div style="display: flex; align-items: center;">
            <img src="${window.vendorData[vendor].logo}" alt="${window.vendorData[vendor].name}" style="height: 25px; margin-right: 10px;">
            <div>
              <div>${window.vendorData[vendor].name}</div>
              <div style="font-size: 0.8rem; color: var(--text-light);">
                ${window.vendorData[vendor].cloudBased ? 
                  '<span style="color: var(--accent-color);">Cloud</span>' : 
                  '<span style="color: var(--primary-color);">On-Premise</span>'}
              </div>
            </div>
          </div>
        `;
        
        // Create and append cells
        row.appendChild(vendorCell);
        
        // TCO cell
        const tcoCell = document.createElement('td');
        tcoCell.innerHTML = `
          <div>${window.formatCurrency(vendorResult.totalTCO)}</div>
          <div style="font-size: 0.8rem; color: var(--text-light);">
            ${window.formatCurrency(vendorResult.totalTCO / results.yearsToProject)}/year
          </div>
        `;
        row.appendChild(tcoCell);
        
        // Initial costs cell
        const initialCell = document.createElement('td');
        initialCell.innerHTML = `
          <div>${window.formatCurrency(vendorResult.totalInitialCosts)}</div>
          ${vendor !== currentVendor ? 
            `<div style="font-size: 0.8rem; color: var(--text-light);">
              +${window.formatCurrency(vendorResult.migrationCost)} migration
            </div>` : 
            ''}
        `;
        row.appendChild(initialCell);
        
        // Annual costs cell
        const annualCell = document.createElement('td');
        annualCell.innerHTML = `
          <div>${window.formatCurrency(vendorResult.annualCosts)}/year</div>
          <div style="font-size: 0.8rem; color: var(--text-light);">
            ${window.formatCurrency(vendorResult.annualCosts * results.yearsToProject)} total
          </div>
        `;
        row.appendChild(annualCell);
        
        // Only show savings columns if comparing to current solution
        if (vendor !== currentVendor) {
          // Savings vs Current cell
          const savingsCell = document.createElement('td');
          const savings = vendorResult.totalSavings;
          savingsCell.innerHTML = `
            <div style="color: ${savings > 0 ? 'var(--accent-dark)' : 'var(--danger-color)'}">
              ${window.formatCurrency(savings)}
            </div>
          `;
          row.appendChild(savingsCell);
          
          // Savings % cell
          const savingsPercentCell = document.createElement('td');
          const savingsPercent = vendorResult.savingsPercentage;
          savingsPercentCell.innerHTML = `
            <div style="color: ${savingsPercent > 0 ? 'var(--accent-dark)' : 'var(--danger-color)'}">
              ${savingsPercent.toFixed(1)}%
            </div>
          `;
          row.appendChild(savingsPercentCell);
        } else {
          // Empty cells for current solution
          const emptyCell1 = document.createElement('td');
          emptyCell1.innerHTML = '<span style="color: var(--text-light);">—</span>';
          row.appendChild(emptyCell1);
          
          const emptyCell2 = document.createElement('td');
          emptyCell2.innerHTML = '<span style="color: var(--text-light);">—</span>';
          row.appendChild(emptyCell2);
        }
        
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error populating TCO summary table:", error);
    }
  }

  updatePortnoxAdvantageSection(results) {
    try {
      if (!results || !results.portnox || !results[this.activeVendor]) return;
      
      const currentVendor = this.activeVendor;
      const currentSolution = results[currentVendor];
      const portnoxSolution = results.portnox;
      
      // Update potential savings
      const savingsAmount = document.getElementById('potential-savings-amount');
      if (savingsAmount) {
        savingsAmount.textContent = window.formatCurrency(portnoxSolution.totalSavings);
      }
      
      // Update implementation time reduction
      const timeReduction = document.getElementById('implementation-time-reduction');
      if (timeReduction && results.implementationResults) {
        const currentTime = results.implementationResults[currentVendor];
        const portnoxTime = results.implementationResults.portnox;
        if (currentTime && portnoxTime && currentTime > 0) {
          const reductionPercentage = ((currentTime - portnoxTime) / currentTime) * 100;
          timeReduction.textContent = `${reductionPercentage.toFixed(0)}%`;
        }
      }
      
      // Update TCO comparison card
      const tcoSavingsAmount = document.getElementById('tco-savings-amount');
      if (tcoSavingsAmount) {
        tcoSavingsAmount.textContent = window.formatCurrency(portnoxSolution.totalSavings);
      }
      
      const savingsPercentage = document.getElementById('savings-percentage');
      if (savingsPercentage) {
        savingsPercentage.textContent = `${portnoxSolution.savingsPercentage.toFixed(1)}% savings`;
      }
      
      // Update the progress bar width
      const savingsProgressBar = document.querySelector('.progress');
      if (savingsProgressBar) {
        savingsProgressBar.style.width = `${Math.min(Math.max(portnoxSolution.savingsPercentage, 0), 100)}%`;
      }
      
      // Update annual cost reduction
      const annualCostReduction = document.getElementById('annual-cost-reduction');
      if (annualCostReduction) {
        annualCostReduction.textContent = `${window.formatCurrency(portnoxSolution.annualSavings)}/year`;
      }
      
      const operatingReductionPercentage = document.getElementById('operating-reduction-percentage');
      if (operatingReductionPercentage && currentSolution.annualCosts > 0) {
        operatingReductionPercentage.textContent = 
          `${((portnoxSolution.annualSavings / currentSolution.annualCosts) * 100).toFixed(1)}% reduction`;
      }
      
      // Update the progress bar width for operating cost reduction
      const operatingProgressBars = document.querySelectorAll('.progress-bar .progress');
      if (operatingProgressBars && operatingProgressBars.length > 1 && currentSolution.annualCosts > 0) {
        const operatingProgressBar = operatingProgressBars[1];
        operatingProgressBar.style.width = 
          `${Math.min(Math.max((portnoxSolution.annualSavings / currentSolution.annualCosts) * 100, 0), 100)}%`;
      }
      
      // Update benefits
      this.updateBenefits();
    } catch (error) {
      console.error("Error updating Portnox advantage section:", error);
    }
  }
}
EOF

# Create the calculator component with improved error handling
echo "Creating calculator component..."
cat > js/components/calculator.js << 'EOF'
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
EOF

# Create main.js with improved initialization and error handling
echo "Creating main.js..."
cat > js/main.js << 'EOF'
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
EOF

# Create script to download vendor logos
echo "Creating logo download script..."
cat > download_logos.sh << 'EOF'
#!/bin/bash
#!/bin/bash
# Script to download vendor logos

echo "Downloading vendor logos..."
mkdir -p img

# Try to download vendor logos - using curl to fetch them from well-known sources
echo "Downloading Cisco logo..."
curl -s -o img/cisco-logo.png "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1200px-Cisco_logo_blue_2016.svg.png" || \
curl -s -o img/cisco-logo.png "https://cdn.worldvectorlogo.com/logos/cisco-2.svg" || \
echo "Failed to download Cisco logo"

echo "Downloading Aruba logo..."
curl -s -o img/aruba-logo.png "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Aruba_networks_logo.svg/1200px-Aruba_networks_logo.svg.png" || \
curl -s -o img/aruba-logo.png "https://cdn.worldvectorlogo.com/logos/aruba-networks.svg" || \
echo "Failed to download Aruba logo"

echo "Downloading Forescout logo..."
curl -s -o img/forescout-logo.png "https://www.forescout.com/wp-content/uploads/2022/06/Forescout-Horizontal-Full-Color-Logo-with-Safe-Area@3x-e1644255614559.png" || \
curl -s -o img/forescout-logo.png "https://cdn.worldvectorlogo.com/logos/forescout.svg" || \
echo "Failed to download Forescout logo"

echo "Downloading Microsoft logo..."
curl -s -o img/microsoft-logo.png "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png" || \
curl -s -o img/microsoft-logo.png "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg" || \
echo "Failed to download Microsoft logo"

echo "Downloading Portnox logo..."
curl -s -o img/portnox-logo.png "https://www.portnox.com/wp-content/uploads/2022/06/Portnox-Logo-Horizontal-2-1024x137.png" || \
curl -s -o img/portnox-logo.png "https://cdn.worldvectorlogo.com/logos/portnox.svg" || \
echo "Failed to download Portnox logo"

# Create placeholder logos if downloads failed
for vendor in cisco aruba forescout microsoft portnox; do
  if [ ! -s "img/${vendor}-logo.png" ]; then
    echo "Creating placeholder for ${vendor} logo..."
    # Create a simple placeholder image with the vendor name
    convert -size 200x50 -background white -fill black -gravity center label:"${vendor^}" "img/${vendor}-logo.png" 2>/dev/null || \
    echo "ERROR: Could not create placeholder logo. Please make sure ImageMagick is installed or manually add logo images to the img/ directory."
  fi
done

echo "Vendor logos processing completed."
EOF

# Make the logo script executable
chmod +x download_logos.sh

# Create updated index.html with proper structure and error handling
echo "Creating index.html..."
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portnox TCO and ROI Calculator</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="app-container">
        <header class="app-header">
            <div class="logo">
                <img src="img/portnox-logo.png" alt="Portnox" id="portnox-logo">
                <h1>Total Cost of Ownership Calculator</h1>
            </div>
            <div class="header-actions">
                <button id="save-btn" class="btn btn-outline">
                    <i class="fas fa-save"></i> Save
                </button>
                <button id="share-btn" class="btn btn-outline">
                    <i class="fas fa-share-alt"></i> Share
                </button>
                <button id="print-btn" class="btn btn-outline">
                    <i class="fas fa-print"></i> Print
                </button>
            </div>
        </header>

        <main class="calculator-container">
            <div class="sidebar">
                <div class="vendor-selection-card">
                    <h3>Current NAC Solution</h3>
                    <div class="vendor-options">
                        <div class="vendor-card active" data-vendor="cisco">
                            <img src="img/cisco-logo.png" alt="Cisco ISE" class="vendor-logo">
                            <span>Cisco ISE</span>
                        </div>
                        <div class="vendor-card" data-vendor="aruba">
                            <img src="img/aruba-logo.png" alt="Aruba ClearPass" class="vendor-logo">
                            <span>Aruba ClearPass</span>
                        </div>
                        <div class="vendor-card" data-vendor="forescout">
                            <img src="img/forescout-logo.png" alt="Forescout" class="vendor-logo">
                            <span>Forescout</span>
                        </div>
                        <div class="vendor-card" data-vendor="nps">
                            <img src="img/microsoft-logo.png" alt="Microsoft NPS" class="vendor-logo">
                            <span>Microsoft NPS</span>
                        </div>
                    </div>
                </div>
                
                <div class="organization-inputs">
                    <h3>Organization Profile</h3>
                    <div class="input-group">
                        <label for="organization-size">Organization Size</label>
                        <select id="organization-size">
                            <option value="small">Small (1-500 devices)</option>
                            <option value="medium" selected>Medium (501-2,500 devices)</option>
                            <option value="large">Large (2,501-10,000 devices)</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label for="device-count">Number of Devices</label>
                        <input type="number" id="device-count" value="1000" min="1">
                    </div>
                    <div class="input-group">
                        <label for="years-to-project">Years to Project</label>
                        <select id="years-to-project">
                            <option value="1">1 Year</option>
                            <option value="2">2 Years</option>
                            <option value="3" selected>3 Years</option>
                            <option value="5">5 Years</option>
                        </select>
                    </div>
                    <div class="advanced-options-toggle">
                        <button id="advanced-toggle" class="btn btn-text">
                            <i class="fas fa-cog"></i> Advanced Options
                            <i class="fas fa-chevron-down"></i>
                        </button>
                    </div>
                    <div id="advanced-options" class="advanced-options-panel">
                        <div class="input-group checkbox-group">
                            <input type="checkbox" id="multiple-locations">
                            <label for="multiple-locations">Multiple Physical Locations</label>
                        </div>
                        <div class="location-count-container">
                            <div class="input-group">
                                <label for="location-count">Number of Locations</label>
                                <input type="number" id="location-count" value="1" min="1">
                            </div>
                        </div>
                        <div class="input-group checkbox-group">
                            <input type="checkbox" id="complex-authentication">
                            <label for="complex-authentication">Complex Authentication Requirements</label>
                        </div>
                        <div class="input-group checkbox-group">
                            <input type="checkbox" id="legacy-devices">
                            <label for="legacy-devices">Legacy Devices to Support</label>
                        </div>
                        <div class="legacy-devices-container">
                            <div class="input-group">
                                <label for="legacy-percentage">Percentage of Legacy Devices</label>
                                <div class="range-container">
                                    <input type="range" id="legacy-percentage" min="1" max="100" value="10">
                                    <span id="legacy-percentage-display">10%</span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group checkbox-group">
                            <input type="checkbox" id="cloud-integration">
                            <label for="cloud-integration">Cloud Service Integrations</label>
                        </div>
                        <div class="input-group checkbox-group">
                            <input type="checkbox" id="custom-policies">
                            <label for="custom-policies">Custom Security Policies</label>
                        </div>
                        <div class="custom-policies-container">
                            <div class="input-group">
                                <label for="policy-complexity">Policy Complexity Level</label>
                                <select id="policy-complexity">
                                    <option value="low">Low</option>
                                    <option value="medium" selected>Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="portnox-spotlight">
                    <h3>Portnox Cloud Advantage</h3>
                    <p>Cloud-native NAC with zero trust, simplified deployment and minimal maintenance overhead</p>
                    <div class="potential-savings-container">
                        <div class="savings-metric">
                            <label>Potential 3-Year Savings</label>
                            <span id="potential-savings-amount" class="savings-amount">$0</span>
                        </div>
                        <div class="savings-metric">
                            <label>Implementation Time Reduction</label>
                            <span id="implementation-time-reduction" class="savings-amount">0%</span>
                        </div>
                    </div>
                    <button id="calculate-btn" class="btn btn-primary">
                        <i class="fas fa-calculator"></i> Calculate ROI
                    </button>
                </div>
            </div>

            <div class="results-container">
                <div class="tabs">
                    <button class="tab-button active" data-tab="tco">TCO Analysis</button>
                    <button class="tab-button" data-tab="timeline">Implementation Timeline</button>
                    <button class="tab-button" data-tab="features">Feature Comparison</button>
                    <button class="tab-button" data-tab="fte">FTE Analysis</button>
                    <button class="tab-button" data-tab="migration">Migration Path</button>
                </div>

                <div class="tab-content">
                    <!-- TCO Tab -->
                    <div id="tco" class="tab-pane active">
                        <div class="sub-tabs">
                            <button class="sub-tab-button active" data-subtab="overview">Overview</button>
                            <button class="sub-tab-button" data-subtab="breakdown">Cost Breakdown</button>
                            <button class="sub-tab-button" data-subtab="comparison">Vendor Comparison</button>
                            <button class="sub-tab-button" data-subtab="roi">ROI Analysis</button>
                        </div>

                        <div class="sub-tab-content">
                            <!-- TCO Overview Section -->
                            <div id="overview" class="sub-tab-pane active">
                                <div class="results-grid">
                                    <div class="result-card">
                                        <h3>TCO Comparison Chart</h3>
                                        <div class="chart-container">
                                            <canvas id="tco-comparison-chart"></canvas>
                                        </div>
                                    </div>
                                    <div class="result-card">
                                        <h3>Cumulative Cost Comparison</h3>
                                        <div class="chart-container">
                                            <canvas id="cumulative-cost-chart"></canvas>
                                        </div>
                                    </div>
                                </div>

                                <div class="result-card">
                                    <h3>TCO Summary Table</h3>
                                    <div class="table-container">
                                        <table id="tco-summary-table" class="data-table">
                                            <thead>
                                                <tr>
                                                    <th>Vendor</th>
                                                    <th>3-Year TCO</th>
                                                    <th>Initial Costs</th>
                                                    <th>Annual Costs</th>
                                                    <th>Savings vs Current</th>
                                                    <th>Savings %</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <!-- Dynamically populated by JavaScript -->
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div class="comparison-highlight-card">
                                    <h3>Portnox Cloud vs <span id="current-solution-name">Cisco ISE</span> Comparison</h3>
                                    <div class="comparison-metrics">
                                        <div class="metric-container">
                                            <span class="metric-label">3-Year TCO Savings</span>
                                            <div class="metric-value-container">
                                                <span id="tco-savings-amount" class="metric-value">$0</span>
                                                <div class="progress-bar">
                                                    <div class="progress" style="width: 0%"></div>
                                                </div>
                                                <div class="progress-labels">
                                                    <span>0%</span>
                                                    <span id="savings-percentage">0% savings</span>
                                                    <span>100%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="metric-container">
                                            <span class="metric-label">Annual Operating Cost Reduction</span>
                                            <div class="metric-value-container">
                                                <span id="annual-cost-reduction" class="metric-value">$0/year</span>
                                                <div class="progress-bar">
                                                    <div class="progress" style="width: 0%"></div>
                                                </div>
                                                <div class="progress-labels">
                                                    <span>0%</span>
                                                    <span id="operating-reduction-percentage">0% reduction</span>
                                                    <span>100%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="key-benefits">
                                        <h4>Key Benefits of Migrating to Portnox Cloud</h4>
                                        <div class="benefits-grid">
                                            <!-- Dynamically filled by JavaScript -->
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Cost Breakdown Section -->
                            <div id="breakdown" class="sub-tab-pane">
                                <div class="results-grid">
                                    <div class="result-card">
                                        <h3>Current Solution: <span id="breakdown-current-solution">Cisco ISE</span></h3>
                                        <div class="chart-container">
                                            <canvas id="current-breakdown-chart"></canvas>
                                        </div>
                                    </div>
                                    <div class="result-card">
                                        <h3>Alternative Solution: <span id="breakdown-alt-solution">Portnox Cloud</span></h3>
                                        <div class="chart-container">
                                            <canvas id="alternative-breakdown-chart"></canvas>
                                        </div>
                                    </div>
                                </div>

                                <div class="result-card">
                                    <h3>Cost Breakdown Across All Vendors</h3>
                                    <div class="table-container">
                                        <table id="cost-breakdown-table" class="data-table">
                                            <thead>
                                                <tr>
                                                    <th>Vendor</th>
                                                    <th>Hardware</th>
                                                    <th>Implementation</th>
                                                    <th>Licensing</th>
                                                    <th>Maintenance</th>
                                                    <th>Personnel</th>
                                                    <th>Downtime</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <!-- Dynamically populated by JavaScript -->
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <!-- Vendor Comparison Section -->
                            <div id="comparison" class="sub-tab-pane">
                                <!-- Content will be dynamically created by JavaScript -->
                                <div class="result-card">
                                    <h3>Loading vendor comparison data...</h3>
                                    <p>Please wait while we prepare the vendor comparison data or click "Calculate ROI" to refresh.</p>
                                </div>
                            </div>

                            <!-- ROI Analysis Section -->
                            <div id="roi" class="sub-tab-pane">
                                <!-- Content will be dynamically created by JavaScript -->
                                <div class="result-card">
                                    <h3>Loading ROI analysis data...</h3>
                                    <p>Please wait while we prepare the ROI analysis data or click "Calculate ROI" to refresh.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Implementation Timeline Tab -->
                    <div id="timeline" class="tab-pane">
                        <div class="result-card">
                            <h3>Implementation Timeline Comparison</h3>
                            <p>Click "Calculate ROI" to view implementation timeline data.</p>
                        </div>
                    </div>

                    <!-- Feature Comparison Tab -->
                    <div id="features" class="tab-pane">
                        <div class="result-card">
                            <h3>Feature Comparison</h3>
                            <p>Click "Calculate ROI" to view feature comparison data.</p>
                        </div>
                    </div>

                    <!-- FTE Analysis Tab -->
                    <div id="fte" class="tab-pane">
                        <div class="result-card">
                            <h3>FTE Resource Analysis</h3>
                            <p>Click "Calculate ROI" to view FTE analysis data.</p>
                        </div>
                    </div>

                    <!-- Migration Path Tab -->
                    <div id="migration" class="tab-pane">
                        <div class="result-card">
                            <h3>Migration Path Analysis</h3>
                            <p>Click "Calculate ROI" to view migration path analysis.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <footer class="app-footer">
            <p>© 2025 Portnox - Network Security Solutions</p>
            <div class="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Contact Us</a>
            </div>
        </footer>
    </div>

    <!-- Modal for results -->
    <div id="results-modal" class="modal hidden">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>TCO Analysis Results</h2>
            <div class="modal-body">
                <div class="results-summary">
                    <!-- Dynamically populated -->
                </div>
            </div>
            <div class="modal-footer">
                <button id="export-pdf" class="btn btn-primary">Export as PDF</button>
                <button id="close-modal" class="btn btn-outline">Close</button>
            </div>
        </div>
    </div>

    <!-- JavaScript files - order matters! -->
    <script src="js/utils/helpers.js"></script>
    <script src="js/vendors/vendor-data.js"></script>
    <script src="js/components/ui-controller.js"></script>
    <script src="js/charts/chart-builder.js"></script>
    <script src="js/components/calculator.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
EOF

# Create basic CSS file
echo "Creating basic CSS file..."
cat > css/styles.css << 'EOF'
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

/* Modal */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background-color: var(--bg-white);
    border-radius: var(--radius-md);
    max-width: 800px;
    width: 90%;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-lg);
}

.modal-content h2 {
    padding: var(--spacing-md) var(--spacing-lg);
    border-bottom: 1px solid var(--border-color);
    font-size: 1.3rem;
}

.close-button {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-lg);
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-secondary);
}

.modal-body {
    padding: var(--spacing-lg);
    overflow-y: auto;
    flex: 1;
}

.modal-footer {
    padding: var(--spacing-md) var(--spacing-lg);
    border-top: 1px solid var(--border-color);
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-md);
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
}
EOF

# Create a main shell script to run the update
echo "Creating main update script..."
cat > update_tco_calculator.sh << 'EOF'
#!/bin/bash
# Main script to run the TCO Calculator update

echo "==============================================="
echo "TCO Calculator Update Script"
echo "==============================================="

# Create necessary directories
echo "Creating required directories..."
mkdir -p js/charts js/components js/utils js/vendors css img

# Update JavaScript files
echo "Updating JavaScript files..."
cp js/charts/chart-builder.js js/charts/chart-builder.js 2>/dev/null
cp js/utils/helpers.js js/utils/helpers.js 2>/dev/null
cp js/vendors/vendor-data.js js/vendors/vendor-data.js 2>/dev/null
cp js/components/ui-controller.js js/components/ui-controller.js 2>/dev/null
cp js/components/calculator.js js/components/calculator.js 2>/dev/null
cp js/main.js js/main.js 2>/dev/null

# Update CSS file
echo "Updating CSS file..."
cp css/styles.css css/styles.css 2>/dev/null

# Update HTML file
echo "Updating HTML file..."
cp index.html index.html 2>/dev/null

# Get vendor logos
echo "Fetching vendor logos..."
./download_logos.sh

echo "==============================================="
echo "TCO Calculator update complete!"
echo "==============================================="
echo 
echo "To run the calculator:"
echo "1. Open index.html in your web browser"
echo "2. If any vendor logos are missing, try running download_logos.sh again"
echo "   or add logo images manually to the img/ directory"
echo "3. Press 'Calculate ROI' to see the TCO analysis"
EOF

chmod +x update_tco_calculator.sh

echo "All update scripts have been created successfully. Run ./update_tco_calculator.sh to apply the changes."