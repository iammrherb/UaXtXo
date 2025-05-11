#!/bin/bash
# TCO Analyzer Implementation Script
# This script prepares and configures the Total Cost Analyzer application

# Set color codes for better visibility
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}Total Cost Analyzer Implementation Assistant${NC}"
echo -e "${BLUE}============================================${NC}"

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Function to check for required dependencies
check_dependencies() {
  echo -e "\n${YELLOW}Checking for required dependencies...${NC}"
  
  local missing_deps=0
  
  # Check for Node.js
  if ! command_exists node; then
    echo -e "${RED}Node.js is required but not installed.${NC}"
    missing_deps=1
  else
    node_version=$(node -v)
    echo -e "${GREEN}✓ Node.js ${node_version} found.${NC}"
  fi
  
  # Check for npm
  if ! command_exists npm; then
    echo -e "${RED}npm is required but not installed.${NC}"
    missing_deps=1
  else
    npm_version=$(npm -v)
    echo -e "${GREEN}✓ npm ${npm_version} found.${NC}"
  fi
  
  # Check for git
  if ! command_exists git; then
    echo -e "${RED}git is required but not installed.${NC}"
    missing_deps=1
  else
    git_version=$(git --version)
    echo -e "${GREEN}✓ ${git_version} found.${NC}"
  fi
  
  # Return dependency check status
  return $missing_deps
}

# Function to set up project structure
setup_project() {
  echo -e "\n${YELLOW}Setting up project structure...${NC}"
  
  # Create necessary directories if they don't exist
  mkdir -p js/components/charts
  mkdir -p js/data/processors
  mkdir -p js/managers
  mkdir -p js/reports
  
  echo -e "${GREEN}✓ Directory structure created.${NC}"
}

# Function to create enhanced charts module
create_charts_module() {
  echo -e "\n${YELLOW}Creating enhanced charts module...${NC}"
  
  cat > js/components/charts/chart-manager.js << 'EOL'
/**
 * Chart Manager
 * Manages all chart rendering and updates throughout the application
 */
class ChartManager {
  constructor() {
    this.charts = {};
    this.colorPalette = {
      primary: ['rgba(46, 117, 182, 0.8)', 'rgba(46, 117, 182, 0.6)', 'rgba(46, 117, 182, 0.4)'],
      secondary: ['rgba(112, 173, 71, 0.8)', 'rgba(112, 173, 71, 0.6)', 'rgba(112, 173, 71, 0.4)'],
      accent: ['rgba(237, 125, 49, 0.8)', 'rgba(237, 125, 49, 0.6)', 'rgba(237, 125, 49, 0.4)'],
      neutral: ['rgba(165, 165, 165, 0.8)', 'rgba(165, 165, 165, 0.6)', 'rgba(165, 165, 165, 0.4)'],
      category10: [
        'rgba(46, 117, 182, 0.8)',
        'rgba(112, 173, 71, 0.8)',
        'rgba(237, 125, 49, 0.8)',
        'rgba(68, 114, 196, 0.8)',
        'rgba(147, 196, 125, 0.8)',
        'rgba(255, 192, 0, 0.8)',
        'rgba(91, 155, 213, 0.8)',
        'rgba(112, 48, 160, 0.8)',
        'rgba(255, 104, 104, 0.8)',
        'rgba(41, 134, 204, 0.8)'
      ]
    };
    
    // Initialize chart defaults
    Chart.defaults.font.family = "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif";
    Chart.defaults.color = '#505050';
    Chart.defaults.scale.grid.color = 'rgba(0, 0, 0, 0.05)';
    
    // Register global tooltip handler for currency formatting
    Chart.register({
      id: 'currencyFormat',
      beforeDraw: (chart) => {
        const ctx = chart.ctx;
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.restore();
      }
    });
    
    console.log("Chart Manager initialized");
  }
  
  // Initialize all charts on the page
  initializeCharts() {
    console.log("Initializing all charts...");
    
    // Initialize TCO comparison chart
    this.initializeTcoComparisonChart();
    
    // Initialize cost breakdown charts
    this.initializeCostBreakdownCharts();
    
    // Initialize cumulative cost chart
    this.initializeCumulativeCostChart();
    
    // Initialize feature comparison chart
    this.initializeFeatureComparisonChart();
    
    // Initialize implementation chart
    this.initializeImplementationChart();
    
    // Initialize ROI chart
    this.initializeRoiChart();
    
    // Initialize sensitivity chart
    this.initializeSensitivityChart();
    
    console.log("All charts initialized successfully");
  }
  
  // Initialize TCO comparison chart
  initializeTcoComparisonChart() {
    const ctx = document.getElementById('tco-comparison-chart');
    if (!ctx) {
      console.warn("Canvas element not found for TCO comparison chart");
      return;
    }
    
    this.charts.tcoComparison = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Current Solution', 'Portnox Cloud'],
        datasets: [{
          label: 'Hardware',
          backgroundColor: this.colorPalette.category10[0],
          data: [0, 0]
        }, {
          label: 'Software & Licensing',
          backgroundColor: this.colorPalette.category10[1],
          data: [0, 0]
        }, {
          label: 'Implementation',
          backgroundColor: this.colorPalette.category10[2],
          data: [0, 0]
        }, {
          label: 'Maintenance',
          backgroundColor: this.colorPalette.category10[3],
          data: [0, 0]
        }, {
          label: 'Personnel',
          backgroundColor: this.colorPalette.category10[4],
          data: [0, 0]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: '3-Year Total Cost of Ownership'
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label}: $${context.raw.toLocaleString()}`
            }
          },
          legend: {
            position: 'bottom'
          }
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true,
            ticks: {
              callback: (value) => `$${value.toLocaleString()}`
            }
          }
        }
      }
    });
    
    console.log("TCO comparison chart initialized");
  }
  
  // Initialize cost breakdown charts
  initializeCostBreakdownCharts() {
    // Current solution breakdown
    const currentCtx = document.getElementById('current-breakdown-chart');
    if (currentCtx) {
      this.charts.currentBreakdown = new Chart(currentCtx, {
        type: 'pie',
        data: {
          labels: ['Hardware', 'Software & Licensing', 'Implementation', 'Maintenance', 'Personnel'],
          datasets: [{
            data: [0, 0, 0, 0, 0],
            backgroundColor: this.colorPalette.category10.slice(0, 5)
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Current Solution Cost Breakdown'
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                  return `${label}: $${value.toLocaleString()} (${percentage}%)`;
                }
              }
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      });
      
      console.log("Current solution breakdown chart initialized");
    } else {
      console.warn("Canvas element not found for current breakdown chart");
    }
    
    // Alternative solution breakdown
    const altCtx = document.getElementById('alternative-breakdown-chart');
    if (altCtx) {
      this.charts.alternativeBreakdown = new Chart(altCtx, {
        type: 'pie',
        data: {
          labels: ['Hardware', 'Software & Licensing', 'Implementation', 'Maintenance', 'Personnel'],
          datasets: [{
            data: [0, 0, 0, 0, 0],
            backgroundColor: this.colorPalette.category10.slice(0, 5)
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Portnox Cloud Cost Breakdown'
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                  return `${label}: $${value.toLocaleString()} (${percentage}%)`;
                }
              }
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      });
      
      console.log("Alternative solution breakdown chart initialized");
    } else {
      console.warn("Canvas element not found for alternative breakdown chart");
    }
  }
  
  // Initialize cumulative cost chart
  initializeCumulativeCostChart() {
    const ctx = document.getElementById('cumulative-cost-chart');
    if (!ctx) {
      console.warn("Canvas element not found for cumulative cost chart");
      return;
    }
    
    this.charts.cumulativeCost = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Initial', 'Year 1', 'Year 2', 'Year 3'],
        datasets: [{
          label: 'Current Solution',
          backgroundColor: 'rgba(46, 117, 182, 0.2)',
          borderColor: 'rgba(46, 117, 182, 1)',
          fill: true,
          data: [0, 0, 0, 0]
        }, {
          label: 'Portnox Cloud',
          backgroundColor: 'rgba(112, 173, 71, 0.2)',
          borderColor: 'rgba(112, 173, 71, 1)',
          fill: true,
          data: [0, 0, 0, 0]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Cumulative Cost Over Time'
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label}: $${context.raw.toLocaleString()}`
            }
          }
        },
        scales: {
          y: {
            ticks: {
              callback: (value) => `$${value.toLocaleString()}`
            }
          }
        }
      }
    });
    
    console.log("Cumulative cost chart initialized");
  }
  
  // Initialize feature comparison chart
  initializeFeatureComparisonChart() {
    const ctx = document.getElementById('feature-comparison-chart');
    if (!ctx) {
      console.warn("Canvas element not found for feature comparison chart");
      return;
    }
    
    this.charts.featureComparison = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: [
          'Device Visibility',
          'Policy Management',
          'Guest Access',
          'BYOD Support',
          'Cloud Integration',
          'Remediation',
          'Third-Party Integration',
          'Scalability',
          'Ease of Use',
          'Reporting'
        ],
        datasets: [{
          label: 'Current Solution',
          backgroundColor: 'rgba(46, 117, 182, 0.2)',
          borderColor: 'rgba(46, 117, 182, 1)',
          pointBackgroundColor: 'rgba(46, 117, 182, 1)',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }, {
          label: 'Portnox Cloud',
          backgroundColor: 'rgba(112, 173, 71, 0.2)',
          borderColor: 'rgba(112, 173, 71, 1)',
          pointBackgroundColor: 'rgba(112, 173, 71, 1)',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            borderWidth: 2
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Feature Comparison'
          }
        },
        scales: {
          r: {
            angleLines: {
              display: true
            },
            suggestedMin: 0,
            suggestedMax: 10
          }
        }
      }
    });
    
    console.log("Feature comparison chart initialized");
  }
  
  // Initialize implementation chart
  initializeImplementationChart() {
    const ctx = document.getElementById('implementation-comparison-chart');
    if (!ctx) {
      console.warn("Canvas element not found for implementation comparison chart");
      return;
    }
    
    this.charts.implementationComparison = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Planning', 'Infrastructure', 'Installation', 'Configuration', 'Testing', 'Deployment'],
        datasets: [{
          label: 'Current Solution',
          backgroundColor: 'rgba(46, 117, 182, 0.7)',
          data: [0, 0, 0, 0, 0, 0]
        }, {
          label: 'Portnox Cloud',
          backgroundColor: 'rgba(112, 173, 71, 0.7)',
          data: [0, 0, 0, 0, 0, 0]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          title: {
            display: true,
            text: 'Implementation Timeline (Days)'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Days'
            }
          }
        }
      }
    });
    
    console.log("Implementation comparison chart initialized");
  }
  
  // Initialize ROI chart
  initializeRoiChart() {
    const ctx = document.getElementById('roi-chart');
    if (!ctx) {
      console.warn("Canvas element not found for ROI chart");
      return;
    }
    
    this.charts.roi = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Month 1', 'Month 6', 'Month 12', 'Month 18', 'Month 24', 'Month 30', 'Month 36'],
        datasets: [{
          label: 'Cumulative Investment',
          borderColor: 'rgba(46, 117, 182, 1)',
          backgroundColor: 'rgba(46, 117, 182, 0.1)',
          fill: true,
          data: [0, 0, 0, 0, 0, 0, 0]
        }, {
          label: 'Cumulative Return',
          borderColor: 'rgba(112, 173, 71, 1)',
          backgroundColor: 'rgba(112, 173, 71, 0.1)',
          fill: true,
          data: [0, 0, 0, 0, 0, 0, 0]
        }, {
          label: 'Break-even',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderDash: [5, 5],
          fill: false,
          pointRadius: 0,
          data: [0, 0, 0, 0, 0, 0, 0]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Return on Investment Analysis'
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                if (context.dataset.label === 'Break-even') {
                  return 'Break-even Point';
                }
                return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
              }
            }
          }
        },
        scales: {
          y: {
            ticks: {
              callback: (value) => `$${value.toLocaleString()}`
            }
          }
        }
      }
    });
    
    console.log("ROI chart initialized");
  }
  
  // Initialize sensitivity chart
  initializeSensitivityChart() {
    const ctx = document.getElementById('sensitivity-chart');
    if (!ctx) {
      console.warn("Canvas element not found for sensitivity chart");
      return;
    }
    
    this.charts.sensitivity = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Current Solution TCO',
          borderColor: 'rgba(46, 117, 182, 1)',
          backgroundColor: 'rgba(46, 117, 182, 0)',
          data: []
        }, {
          label: 'Portnox Cloud TCO',
          borderColor: 'rgba(112, 173, 71, 1)',
          backgroundColor: 'rgba(112, 173, 71, 0)',
          data: []
        }, {
          label: 'Savings',
          borderColor: 'rgba(237, 125, 49, 1)',
          backgroundColor: 'rgba(237, 125, 49, 0.2)',
          fill: true,
          data: []
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Sensitivity Analysis'
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                if (context.dataset.label === 'Savings') {
                  return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
                }
                return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
              }
            }
          }
        },
        scales: {
          y: {
            ticks: {
              callback: (value) => `$${value.toLocaleString()}`
            }
          }
        }
      }
    });
    
    console.log("Sensitivity chart initialized");
  }
  
  // Update TCO comparison chart with real data
  updateTcoComparisonChart(currentSolution, portnoxSolution) {
    if (!this.charts.tcoComparison) {
      console.warn("TCO comparison chart not initialized");
      return;
    }
    
    const chart = this.charts.tcoComparison;
    
    // Update hardware costs
    chart.data.datasets[0].data = [
      currentSolution.hardware || 0,
      portnoxSolution.hardware || 0
    ];
    
    // Update licensing costs
    chart.data.datasets[1].data = [
      currentSolution.licensing || 0,
      portnoxSolution.licensing || 0
    ];
    
    // Update implementation costs
    chart.data.datasets[2].data = [
      currentSolution.implementation || 0,
      portnoxSolution.implementation || 0
    ];
    
    // Update maintenance costs
    chart.data.datasets[3].data = [
      currentSolution.maintenance || 0,
      portnoxSolution.maintenance || 0
    ];
    
    // Update personnel costs
    chart.data.datasets[4].data = [
      currentSolution.personnel || 0,
      portnoxSolution.personnel || 0
    ];
    
    chart.update();
    console.log("TCO comparison chart updated with real data");
  }
  
  // Update all other charts with similar methods...
  // Methods for updating each chart with real data would follow here
}

// Initialize chart manager when document is ready
document.addEventListener('DOMContentLoaded', function() {
  window.chartManager = new ChartManager();
  
  // Initialize charts if page is already loaded
  if (document.readyState === 'complete') {
    window.chartManager.initializeCharts();
  } else {
    window.addEventListener('load', function() {
      window.chartManager.initializeCharts();
    });
  }
});
EOL

  echo -e "${GREEN}✓ Enhanced charts module created.${NC}"
}

# Function to create data processors
create_data_processors() {
  echo -e "\n${YELLOW}Creating data processors...${NC}"
  
  # TCO calculation processor
  cat > js/data/processors/tco-calculator.js << 'EOL'
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
EOL

  # Industry and compliance processor
  cat > js/data/processors/industry-compliance-processor.js << 'EOL'
/**
 * Industry and Compliance Processor
 * Processes industry and compliance data for analysis
 */
class IndustryComplianceProcessor {
  constructor() {
    // Initialize with data from global objects
    this.industryData = window.IndustryData || {};
    this.complianceFrameworks = window.ComplianceFrameworks || {};
    this.enhancedIndustryTemplates = window.enhancedIndustryTemplates || {};
    
    // Store processed data
    this.processedData = {
      industries: {},
      compliance: {},
      mappings: {}
    };
    
    // Initialize
    this.processIndustryData();
    this.processComplianceData();
    this.createIndustryComplianceMappings();
    
    console.log("Industry and Compliance Processor initialized");
  }
  
  /**
   * Process industry data from sources
   */
  processIndustryData() {
    // Process from IndustryData
    if (this.industryData.industries) {
      Object.entries(this.industryData.industries).forEach(([id, industry]) => {
        this.processedData.industries[id] = {
          ...industry,
          id: id,
          breachMetrics: this.industryData.breachMetrics?.[id] || {},
          fteRequirements: this.industryData.fteRequirements?.[id] || {}
        };
      });
    }
    
    // Enhance with enhancedIndustryTemplates
    if (this.enhancedIndustryTemplates) {
      Object.entries(this.enhancedIndustryTemplates).forEach(([id, template]) => {
        if (this.processedData.industries[id]) {
          // Merge data
          this.processedData.industries[id] = {
            ...this.processedData.industries[id],
            ...template,
            complianceInfo: template.complianceInfo || {},
            riskFactors: template.riskFactors || [],
            challengesMitigated: template.challengesMitigated || [],
            benchmarks: {
              ...this.processedData.industries[id].benchmarks,
              ...template.benchmarks
            }
          };
        } else {
          // Add new industry
          this.processedData.industries[id] = {
            id: id,
            ...template
          };
        }
      });
    }
    
    console.log("Industry data processed");
  }
  
  /**
   * Process compliance data from sources
   */
  processComplianceData() {
    // Process from ComplianceFrameworks
    if (this.complianceFrameworks.frameworks) {
      Object.entries(this.complianceFrameworks.frameworks).forEach(([id, framework]) => {
        this.processedData.compliance[id] = {
          ...framework,
          id: id
        };
      });
    }
    
    // Process from ComplianceFrameworks module if available
    if (window.ComplianceFrameworks && typeof window.ComplianceFrameworks.getAllFrameworks === 'function') {
      const frameworks = window.ComplianceFrameworks.getAllFrameworks();
      frameworks.forEach(framework => {
        this.processedData.compliance[framework.id] = {
          ...framework,
          vendorCompliance: window.ComplianceFrameworks.vendorCompliance?.[framework.id] || {}
        };
      });
    }
    
    console.log("Compliance data processed");
  }
  
  /**
   * Create mappings between industries and compliance frameworks
   */
  createIndustryComplianceMappings() {
    // Process mappings from ComplianceFrameworks module if available
    if (window.ComplianceFrameworks && window.ComplianceFrameworks.industryCompliance) {
      this.processedData.mappings = window.ComplianceFrameworks.industryCompliance;
    } else {
      // Create mappings based on applicableIndustries in compliance frameworks
      const mappings = {};
      
      Object.entries(this.processedData.compliance).forEach(([id, framework]) => {
        if (framework.applicableIndustries) {
          framework.applicableIndustries.forEach(industryId => {
            if (industryId !== 'all') {
              if (!mappings[industryId]) {
                mappings[industryId] = [];
              }
              
              mappings[industryId].push({
                id: id,
                importance: industryId === 'healthcare' && id === 'hipaa' ? 'critical' : 'medium'
              });
            }
          });
        }
      });
      
      this.processedData.mappings = mappings;
    }
    
    console.log("Industry compliance mappings created");
  }
  
  /**
   * Get industry data by ID
   * @param {string} industryId - Industry identifier
   * @returns {Object} - Industry data
   */
  getIndustryById(industryId) {
    return this.processedData.industries[industryId] || null;
  }
  
  /**
   * Get compliance framework by ID
   * @param {string} complianceId - Compliance identifier
   * @returns {Object} - Compliance framework data
   */
  getComplianceById(complianceId) {
    return this.processedData.compliance[complianceId] || null;
  }
  
  /**
   * Get compliance frameworks for an industry
   * @param {string} industryId - Industry identifier
   * @returns {Array} - Compliance frameworks applicable to the industry
   */
  getComplianceForIndustry(industryId) {
    const mapping = this.processedData.mappings[industryId] || [];
    
    return mapping.map(item => {
      const framework = this.getComplianceById(item.id);
      return framework ? { ...framework, importance: item.importance } : null;
    }).filter(Boolean);
  }
  
  /**
   * Get vendor compliance for a framework
   * @param {string} complianceId - Compliance identifier
   * @returns {Object} - Vendor compliance ratings
   */
  getVendorComplianceForFramework(complianceId) {
    const framework = this.getComplianceById(complianceId);
    
    if (framework && framework.vendorCompliance) {
      return framework.vendorCompliance;
    }
    
    // Fallback to window.ComplianceFrameworks
    if (window.ComplianceFrameworks && window.ComplianceFrameworks.vendorCompliance) {
      const vendorCompliance = {};
      
      Object.entries(window.ComplianceFrameworks.vendorCompliance).forEach(([vendor, frameworks]) => {
        vendorCompliance[vendor] = frameworks[complianceId] || 'none';
      });
      
      return vendorCompliance;
    }
    
    return {};
  }
}

// Initialize processor when document is ready
document.addEventListener('DOMContentLoaded', function() {
  window.industryComplianceProcessor = new IndustryComplianceProcessor();
});
EOL

  # Feature comparison processor
  cat > js/data/processors/feature-comparison-processor.js << 'EOL'
/**
 * Feature Comparison Processor
 * Processes vendor feature comparison data
 */
class FeatureComparisonProcessor {
  constructor() {
    // Initialize with data from global objects
    this.vendorData = window.VendorComparisonData || {};
    
    // Store processed data
    this.processedData = {
      featureRatings: {},
      benefits: {},
      descriptions: {}
    };
    
    // Initialize
    this.processVendorData();
    
    console.log("Feature Comparison Processor initialized");
  }
  
  /**
   * Process vendor feature data
   */
  processVendorData() {
    // Process feature ratings
    if (this.vendorData.featureRatings) {
      this.processedData.featureRatings = this.vendorData.featureRatings;
    }
    
    // Process vendor benefits
    if (this.vendorData.benefits) {
      this.processedData.benefits = this.vendorData.benefits;
    }
    
    // Process vendor descriptions
    if (this.vendorData.descriptions) {
      this.processedData.descriptions = this.vendorData.descriptions;
    }
    
    console.log("Vendor feature data processed");
  }
  
  /**
   * Get feature comparison data between vendors
   * @param {string} currentVendor - Current vendor identifier
   * @param {string} alternativeVendor - Alternative vendor identifier (default: 'portnox')
   * @returns {Object} - Feature comparison data
   */
  getFeatureComparison(currentVendor, alternativeVendor = 'portnox') {
    const currentRatings = this.processedData.featureRatings[currentVendor] || {};
    const alternativeRatings = this.processedData.featureRatings[alternativeVendor] || {};
    
    // Get all feature categories
    const allFeatures = new Set([
      ...Object.keys(currentRatings),
      ...Object.keys(alternativeRatings)
    ]);
    
    // Create comparison data
    const comparisonData = {
      labels: [],
      current: [],
      alternative: [],
      differences: []
    };
    
    // Format feature labels for display
    const formatFeatureLabel = (feature) => {
      return feature
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
    };
    
    // Process each feature
    Array.from(allFeatures).forEach(feature => {
      const currentValue = currentRatings[feature] || 0;
      const alternativeValue = alternativeRatings[feature] || 0;
      const difference = alternativeValue - currentValue;
      
      comparisonData.labels.push(formatFeatureLabel(feature));
      comparisonData.current.push(currentValue);
      comparisonData.alternative.push(alternativeValue);
      comparisonData.differences.push(difference);
    });
    
    // Get vendor benefits
    const currentBenefits = this.processedData.benefits[currentVendor] || [];
    const alternativeBenefits = this.processedData.benefits[alternativeVendor] || [];
    
    // Get vendor descriptions
    const currentDescription = this.processedData.descriptions[currentVendor] || '';
    const alternativeDescription = this.processedData.descriptions[alternativeVendor] || '';
    
    return {
      featureComparison: comparisonData,
      vendorBenefits: {
        current: currentBenefits,
        alternative: alternativeBenefits
      },
      vendorDescriptions: {
        current: currentDescription,
        alternative: alternativeDescription
      }
    };
  }
}

// Initialize processor when document is ready
document.addEventListener('DOMContentLoaded', function() {
  window.featureComparisonProcessor = new FeatureComparisonProcessor();
});
EOL

  echo -e "${GREEN}✓ Data processors created.${NC}"
}

# Function to create the application controller
create_application_controller() {
  echo -e "\n${YELLOW}Creating application controller...${NC}"
  
  cat > js/app-controller.js << 'EOL'
/**
 * Application Controller
 * Main controller for the Total Cost Analyzer application
 */
class ApplicationController {
  constructor() {
    // Initialize application state
    this.state = {
      currentStep: 1,
      totalSteps: 5,
      formData: {
        currentVendor: '',
        industry: '',
        deviceCount: 2500,
        locationsCount: 5,
        hasByod: false,
        hasLegacyDevices: false,
        legacyPercentage: 30,
        hasCloudIntegration: false,
        yearsToProject: 3,
        implementationUrgency: 'normal',
        fteCost: 120000,
        fteAllocation: 50,
        maintenancePercentage: 18,
        downtimeCost: 10000,
        consultingRate: 2000,
        implementationDays: 60,
        trainingCostPerUser: 500,
        usersToTrain: 20,
        portnoxBasePrice: 4,
        portnoxDiscount: 20
      },
      results: null
    };
    
    // Initialize component references
    this.components = {
      wizard: null,
      chartManager: null,
      tcoCalculator: null,
      industryComplianceProcessor: null,
      featureComparisonProcessor: null
    };
    
    // Initialize
    console.log("Application Controller initialized");
  }
  
  /**
   * Initialize the application
   */
  init() {
    console.log("Initializing application...");
    
    // Detect component availability
    this._detectComponents();
    
    // Initialize event listeners
    this._initEventListeners();
    
    console.log("Application initialized successfully");
  }
  
  /**
   * Detect available components
   */
  _detectComponents() {
    // Check for Wizard component
    if (window.WizardManager) {
      this.components.wizard = window.wizardManager;
      console.log("Wizard Manager detected");
    }
    
    // Check for Chart Manager
    if (window.chartManager) {
      this.components.chartManager = window.chartManager;
      console.log("Chart Manager detected");
    }
    
    // Check for TCO Calculator
    if (window.tcoCalculator) {
      this.components.tcoCalculator = window.tcoCalculator;
      console.log("TCO Calculator detected");
    }
    
    // Check for Industry Compliance Processor
    if (window.industryComplianceProcessor) {
      this.components.industryComplianceProcessor = window.industryComplianceProcessor;
      console.log("Industry Compliance Processor detected");
    }
    
    // Check for Feature Comparison Processor
    if (window.featureComparisonProcessor) {
      this.components.featureComparisonProcessor = window.featureComparisonProcessor;
      console.log("Feature Comparison Processor detected");
    }
  }
  
  /**
   * Initialize event listeners
   */
  _initEventListeners() {
    // Navigation
    document.getElementById('next-step')?.addEventListener('click', this.nextStep.bind(this));
    document.getElementById('prev-step')?.addEventListener('click', this.prevStep.bind(this));
    
    // Vendor selection
    document.querySelectorAll('.vendor-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const vendor = e.currentTarget.dataset.vendor;
        this.selectVendor(vendor);
      });
    });
    
    // Industry selection
    document.getElementById('industry-select')?.addEventListener('change', (e) => {
      this.selectIndustry(e.target.value);
    });
    
    // Form inputs
    this._initFormInputListeners();
    
    // Calculate button
    document.getElementById('calculate-btn')?.addEventListener('click', this.calculateResults.bind(this));
    
    // Results tabs
    document.querySelectorAll('.result-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabId = e.currentTarget.dataset.tab;
        this.switchResultTab(tabId);
      });
    });
    
    // Sensitivity analysis
    document.getElementById('run-sensitivity')?.addEventListener('click', this.runSensitivityAnalysis.bind(this));
    
    // Additional event listeners
    this._initAdditionalListeners();
  }
  
  /**
   * Initialize form input listeners
   */
  _initFormInputListeners() {
    // Organization form
    document.getElementById('device-count')?.addEventListener('change', (e) => {
      this.state.formData.deviceCount = parseInt(e.target.value) || 2500;
    });
    
    document.getElementById('locations')?.addEventListener('change', (e) => {
      this.state.formData.locationsCount = parseInt(e.target.value) || 5;
    });
    
    document.getElementById('cloud-integration')?.addEventListener('change', (e) => {
      this.state.formData.hasCloudIntegration = e.target.checked;
    });
    
    document.getElementById('legacy-devices')?.addEventListener('change', (e) => {
      this.state.formData.hasLegacyDevices = e.target.checked;
    });
    
    document.getElementById('byod-support')?.addEventListener('change', (e) => {
      this.state.formData.hasByod = e.target.checked;
    });
    
    document.getElementById('years-to-project')?.addEventListener('change', (e) => {
      this.state.formData.yearsToProject = parseInt(e.target.value) || 3;
    });
    
    // Cost configuration
    document.getElementById('fte-cost')?.addEventListener('input', (e) => {
      this.state.formData.fteCost = parseInt(e.target.value) || 120000;
      e.target.nextElementSibling.textContent = `$${this.state.formData.fteCost.toLocaleString()}`;
    });
    
    document.getElementById('fte-allocation')?.addEventListener('input', (e) => {
      this.state.formData.fteAllocation = parseInt(e.target.value) || 50;
      e.target.nextElementSibling.textContent = `${this.state.formData.fteAllocation}%`;
    });
    
    document.getElementById('maintenance-percentage')?.addEventListener('input', (e) => {
      this.state.formData.maintenancePercentage = parseInt(e.target.value) || 18;
      e.target.nextElementSibling.textContent = `${this.state.formData.maintenancePercentage}%`;
    });
    
    document.getElementById('downtime-cost')?.addEventListener('input', (e) => {
      this.state.formData.downtimeCost = parseInt(e.target.value) || 10000;
      e.target.nextElementSibling.textContent = `$${this.state.formData.downtimeCost.toLocaleString()}`;
    });
    
    document.getElementById('consulting-rate')?.addEventListener('input', (e) => {
      this.state.formData.consultingRate = parseInt(e.target.value)i
cat >> js/app-controller.js << 'EOL'
      this.state.formData.consultingRate = parseInt(e.target.value) || 2000;
      e.target.nextElementSibling.textContent = `$${this.state.formData.consultingRate.toLocaleString()}`;
    });

    document.getElementById('implementation-days')?.addEventListener('input', (e) => {
      this.state.formData.implementationDays = parseInt(e.target.value) || 60;
      e.target.nextElementSibling.textContent = `${this.state.formData.implementationDays} days`;
    });

    document.getElementById('training-per-user')?.addEventListener('input', (e) => {
      this.state.formData.trainingCostPerUser = parseInt(e.target.value) || 500;
      e.target.nextElementSibling.textContent = `$${this.state.formData.trainingCostPerUser.toLocaleString()}`;
    });

    document.getElementById('users-to-train')?.addEventListener('input', (e) => {
      this.state.formData.usersToTrain = parseInt(e.target.value) || 20;
      e.target.nextElementSibling.textContent = `${this.state.formData.usersToTrain}`;
    });

    // Portnox pricing
    document.getElementById('portnox-base-price')?.addEventListener('input', (e) => {
      this.state.formData.portnoxBasePrice = parseFloat(e.target.value) || 4;
      e.target.nextElementSibling.textContent = `$${this.state.formData.portnoxBasePrice.toFixed(2)}`;
      this._updatePortnoxPricingSummary();
    });

    document.getElementById('portnox-discount')?.addEventListener('input', (e) => {
      this.state.formData.portnoxDiscount = parseInt(e.target.value) || 20;
      e.target.nextElementSibling.textContent = `${this.state.formData.portnoxDiscount}%`;
      this._updatePortnoxPricingSummary();
    });
  }

  /**
   * Initialize additional listeners
   */
  _initAdditionalListeners() {
    // Cost tabs
    document.querySelectorAll('.cost-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabId = e.currentTarget.dataset.tab;
        this._switchCostTab(tabId);
      });
    });

    // Export buttons
    document.getElementById('export-pdf')?.addEventListener('click', this._exportPdf.bind(this));

    // New calculation button
    document.getElementById('new-calculation')?.addEventListener('click', this._resetCalculation.bind(this));

    // Sensitivity sidebar toggle
    document.getElementById('sensitivity-toggle')?.addEventListener('click', this._toggleSensitivitySidebar.bind(this));
    document.getElementById('close-sensitivity')?.addEventListener('click', this._toggleSensitivitySidebar.bind(this));
  }

  /**
   * Update Portnox pricing summary
   */
  _updatePortnoxPricingSummary() {
    const basePrice = this.state.formData.portnoxBasePrice;
    const discount = this.state.formData.portnoxDiscount;
    const deviceCount = this.state.formData.deviceCount;

    const effectivePrice = basePrice * (1 - (discount / 100));
    const annualCost = effectivePrice * 12 * deviceCount;

    // Update UI
    document.getElementById('effective-price')?.textContent = `$${effectivePrice.toFixed(2)}`;
    document.getElementById('annual-cost')?.textContent = `$${annualCost.toLocaleString()}`;
  }

  /**
   * Switch to next wizard step
   */
  nextStep() {
    if (this.state.currentStep < this.state.totalSteps) {
      this.state.currentStep++;
      this._updateWizardUI();
    }
  }

  /**
   * Switch to previous wizard step
   */
  prevStep() {
    if (this.state.currentStep > 1) {
      this.state.currentStep--;
      this._updateWizardUI();
    }
  }

  /**
   * Update wizard UI based on current step
   */
  _updateWizardUI() {
    // Update step visibility if no wizard manager
    if (!this.components.wizard) {
      const steps = document.querySelectorAll('.wizard-step');
      steps.forEach(step => {
        step.classList.remove('active');
      });

      const currentStep = document.querySelector(`.wizard-step[data-step="${this.state.currentStep}"]`);
      if (currentStep) {
        currentStep.classList.add('active');
      }

      // Update button states
      const prevButton = document.getElementById('prev-step');
      const nextButton = document.getElementById('next-step');

      if (prevButton) {
        prevButton.disabled = this.state.currentStep === 1;
      }

      if (nextButton) {
        if (this.state.currentStep === this.state.totalSteps) {
          nextButton.textContent = 'Calculate';
        } else {
          nextButton.textContent = 'Next';
        }
      }

      // Update progress bar
      const progressFill = document.getElementById('wizard-progress-fill');
      if (progressFill) {
        const progress = (this.state.currentStep / this.state.totalSteps) * 100;
        progressFill.style.width = `${progress}%`;
      }
    }
  }

  /**
   * Select a vendor
   * @param {string} vendor - Vendor identifier
   */
  selectVendor(vendor) {
    console.log(`Selecting vendor: ${vendor}`);

    this.state.formData.currentVendor = vendor;

    // Update UI
    document.querySelectorAll('.vendor-card').forEach(card => {
      card.classList.remove('selected');
    });

    const selectedCard = document.querySelector(`.vendor-card[data-vendor="${vendor}"]`);
    if (selectedCard) {
      selectedCard.classList.add('selected');
    }

    // Update vendor preview if available
    this._updateVendorPreview(vendor);
  }

  /**
   * Update vendor preview
   * @param {string} vendor - Vendor identifier
   */
  _updateVendorPreview(vendor) {
    const previewContainer = document.getElementById('vendor-preview');
    if (!previewContainer) return;

    // Get vendor description
    let description = '';
    if (this.components.featureComparisonProcessor) {
      description = this.components.featureComparisonProcessor.processedData.descriptions[vendor] || '';
    } else if (window.VendorComparisonData && window.VendorComparisonData.descriptions) {
      description = window.VendorComparisonData.descriptions[vendor] || '';
    }

    // Get vendor benefits
    let benefits = [];
    if (this.components.featureComparisonProcessor) {
      benefits = this.components.featureComparisonProcessor.processedData.benefits[vendor] || [];
    } else if (window.VendorComparisonData && window.VendorComparisonData.benefits) {
      benefits = window.VendorComparisonData.benefits[vendor] || [];
    }

    // Create preview content
    let previewHTML = `
      <div class="vendor-preview-content">
        <h3>${this._formatVendorName(vendor)}</h3>
        <p>${description}</p>
    `;

    // Add benefits if available
    if (benefits.length > 0) {
      previewHTML += `
        <div class="vendor-benefits">
          <h4>Key Features</h4>
          <ul class="benefits-list">
      `;

      benefits.slice(0, 3).forEach(benefit => {
        previewHTML += `
          <li>
            <div class="benefit-icon"><i class="${benefit.icon || 'fas fa-check-circle'}"></i></div>
            <div class="benefit-details">
              <h5>${benefit.title}</h5>
              <p>${benefit.description}</p>
            </div>
          </li>
        `;
      });

      previewHTML += `</ul></div>`;
    }

    previewHTML += `</div>`;

    // Update preview container
    previewContainer.innerHTML = previewHTML;
    previewContainer.classList.remove('hidden');
  }

  /**
   * Format vendor name for display
   * @param {string} vendor - Vendor identifier
   * @returns {string} - Formatted vendor name
   */
  _formatVendorName(vendor) {
    const vendorNames = {
      cisco: 'Cisco ISE',
      aruba: 'Aruba ClearPass',
      forescout: 'Forescout',
      fortinac: 'FortiNAC',
      nps: 'Microsoft NPS',
      securew2: 'SecureW2',
      portnox: 'Portnox Cloud',
      noNac: 'No NAC Solution'
    };

    return vendorNames[vendor] || vendor;
  }

  /**
   * Select an industry
   * @param {string} industry - Industry identifier
   */
  selectIndustry(industry) {
    console.log(`Selecting industry: ${industry}`);

    this.state.formData.industry = industry;

    // Update compliance frameworks if processor is available
    if (this.components.industryComplianceProcessor) {
      this._updateComplianceFrameworks(industry);
    }

    // Update industry insights
    this._updateIndustryInsights(industry);
  }

  /**
   * Update compliance frameworks for selected industry
   * @param {string} industry - Industry identifier
   */
  _updateComplianceFrameworks(industry) {
    const frameworksContainer = document.getElementById('compliance-frameworks');
    if (!frameworksContainer) return;

    // Get compliance frameworks for industry
    const frameworks = this.components.industryComplianceProcessor.getComplianceForIndustry(industry);

    if (frameworks.length === 0) {
      frameworksContainer.innerHTML = '<p>No compliance frameworks found for this industry.</p>';
      return;
    }

    // Create frameworks content
    let frameworksHTML = `
      <h3>Key Compliance Frameworks</h3>
      <div class="compliance-grid">
    `;

    frameworks.forEach(framework => {
      let importanceClass = 'medium';
      if (framework.importance === 'critical') {
        importanceClass = 'critical';
      } else if (framework.importance === 'high') {
        importanceClass = 'high';
      }

      frameworksHTML += `
        <div class="compliance-card">
          <div class="compliance-header">
            <h4>${framework.name}</h4>
            <span class="compliance-badge ${importanceClass}">${framework.importance}</span>
          </div>
          <p>${framework.description}</p>
          <div class="compliance-requirements">
            <h5>NAC Requirements</h5>
            <p>${framework.nacRequirements}</p>
          </div>
        </div>
      `;
    });

    frameworksHTML += `</div>`;

    // Update frameworks container
    frameworksContainer.innerHTML = frameworksHTML;
  }

  /**
   * Update industry insights
   * @param {string} industry - Industry identifier
   */
  _updateIndustryInsights(industry) {
    const insightsContainer = document.getElementById('industry-insights');
    if (!insightsContainer) return;

    // Get industry data
    let industryData = null;

    if (this.components.industryComplianceProcessor) {
      industryData = this.components.industryComplianceProcessor.getIndustryById(industry);
    } else if (window.IndustryData && window.IndustryData.industries) {
      industryData = window.IndustryData.industries[industry];
    } else if (window.enhancedIndustryTemplates) {
      industryData = window.enhancedIndustryTemplates[industry];
    }

    if (!industryData) {
      insightsContainer.innerHTML = '<p>No industry data found.</p>';
      return;
    }

    // Create insights content
    let insightsHTML = `
      <h3>Industry Insights</h3>
      <div class="insights-content">
        <div class="industry-description">
          <h4>${industryData.title || industry}</h4>
          <p>${industryData.description}</p>
        </div>
    `;

    // Add benchmarks if available
    if (industryData.benchmarks) {
      insightsHTML += `
        <div class="benchmarks-card">
          <h4>Industry Benchmarks</h4>
          <div class="benchmarks-grid">
      `;

      if (industryData.benchmarks.implementationTime) {
        insightsHTML += `
          <div class="benchmark-item">
            <div class="benchmark-label">Typical Implementation Time</div>
            <div class="benchmark-value">${industryData.benchmarks.implementationTime}</div>
          </div>
        `;
      }

      if (industryData.benchmarks.cloudSavings) {
        insightsHTML += `
          <div class="benchmark-item">
            <div class="benchmark-label">Cloud Solution Savings</div>
            <div class="benchmark-value">${industryData.benchmarks.cloudSavings}</div>
          </div>
        `;
      }

      if (industryData.benchmarks.cloudAdoption) {
        insightsHTML += `
          <div class="benchmark-item">
            <div class="benchmark-label">Cloud Adoption Rate</div>
            <div class="benchmark-value">${industryData.benchmarks.cloudAdoption}</div>
          </div>
        `;
      }

      if (industryData.benchmarks.averageTCO) {
        insightsHTML += `
          <div class="benchmark-item">
            <div class="benchmark-label">Average TCO</div>
            <div class="benchmark-value">$${industryData.benchmarks.averageTCO.toLocaleString()}</div>
          </div>
        `;
      }

      insightsHTML += `</div></div>`;
    }

    // Add risk factors if available
    if (industryData.riskFactors && industryData.riskFactors.length > 0) {
      insightsHTML += `
        <div class="risk-factors-card">
          <h4>Industry Risk Factors</h4>
          <ul class="risk-factors-list">
      `;

      industryData.riskFactors.forEach(risk => {
        insightsHTML += `<li>${risk}</li>`;
      });

      insightsHTML += `</ul></div>`;
    }

    insightsHTML += `</div>`;

    // Update insights container
    insightsContainer.innerHTML = insightsHTML;
  }

  /**
   * Switch cost tab
   * @param {string} tabId - Tab identifier
   */
  _switchCostTab(tabId) {
    // Update tab buttons
    document.querySelectorAll('.cost-tab').forEach(tab => {
      tab.classList.remove('active');
    });

    const activeTab = document.querySelector(`.cost-tab[data-tab="${tabId}"]`);
    if (activeTab) {
      activeTab.classList.add('active');
    }

    // Update tab panels
    document.querySelectorAll('.cost-panel').forEach(panel => {
      panel.classList.remove('active');
    });

    const activePanel = document.getElementById(`${tabId}-costs`);
    if (activePanel) {
      activePanel.classList.add('active');
    }
  }

  /**
   * Switch result tab
   * @param {string} tabId - Tab identifier
   */
  switchResultTab(tabId) {
    // Update tab buttons
    document.querySelectorAll('.result-tab').forEach(tab => {
      tab.classList.remove('active');
    });

    const activeTab = document.querySelector(`.result-tab[data-tab="${tabId}"]`);
    if (activeTab) {
      activeTab.classList.add('active');
    }

    // Update tab panels
    document.querySelectorAll('.result-panel').forEach(panel => {
      panel.classList.remove('active');
    });

    const activePanel = document.getElementById(`${tabId}-panel`);
    if (activePanel) {
      activePanel.classList.add('active');
    }
  }

  /**
   * Calculate TCO results
   */
  calculateResults() {
    console.log("Calculating TCO results...");

    // Show loading overlay
    this._showLoading();

    // Create calculation parameters
    const params = this._createCalculationParams();

    // Perform calculation
    setTimeout(() => {
      if (this.components.tcoCalculator) {
        this.state.results = this.components.tcoCalculator.calculateTco(params);
      } else {
        // Fallback to simple calculation
        this.state.results = this._fallbackCalculation(params);
      }

      // Update UI with results
      this._updateResultsUI();

      // Hide loading overlay
      this._hideLoading();

      // Show results container
      this._showResultsContainer();
    }, 1000);
  }

  /**
   * Create calculation parameters from form data
   * @returns {Object} - Calculation parameters
   */
  _createCalculationParams() {
    return {
      currentVendor: this.state.formData.currentVendor,
      deviceCount: this.state.formData.deviceCount,
      industry: this.state.formData.industry,
      yearsToProject: this.state.formData.yearsToProject,
      locationsCount: this.state.formData.locationsCount,
      hasByod: this.state.formData.hasByod,
      hasLegacyDevices: this.state.formData.hasLegacyDevices,
      legacyPercentage: this.state.formData.hasLegacyDevices ? 30 : 0,
      hasCloudIntegration: this.state.formData.hasCloudIntegration,
      fteCost: this.state.formData.fteCost,
      fteAllocation: this.state.formData.fteAllocation,
      maintenancePercentage: this.state.formData.maintenancePercentage,
      downtimeCost: this.state.formData.downtimeCost,
      consultingRate: this.state.formData.consultingRate,
      implementationDays: this.state.formData.implementationDays,
      trainingCostPerUser: this.state.formData.trainingCostPerUser,
      usersToTrain: this.state.formData.usersToTrain,
      portnoxPricePerDevice: this.state.formData.portnoxBasePrice,
      portnoxDiscount: this.state.formData.portnoxDiscount
    };
  }

  /**
   * Fallback calculation method if no calculator is available
   * @param {Object} params - Calculation parameters
   * @returns {Object} - Calculation results
   */
  _fallbackCalculation(params) {
    const {
      currentVendor,
      deviceCount,
      yearsToProject,
      locationsCount,
      fteCost,
      maintenancePercentage,
      portnoxPricePerDevice,
      portnoxDiscount,
      implementationDays,
      consultingRate,
      usersToTrain,
      trainingCostPerUser
    } = params;

    // Simple calculation for current solution
    let currentHardware = 0;
    let currentLicensing = 0;
    let currentImplementation = 0;
    let currentMaintenance = 0;
    let currentPersonnel = 0;

    if (currentVendor === 'cisco') {
      currentHardware = deviceCount * 25;
      currentLicensing = deviceCount * 45 * yearsToProject;
      currentImplementation = 150000;
      currentMaintenance = (currentHardware * (maintenancePercentage / 100)) * yearsToProject;
      currentPersonnel = (deviceCount / 1000) * 0.5 * fteCost * yearsToProject;
    } else if (currentVendor === 'aruba') {
      currentHardware = deviceCount * 22;
      currentLicensing = deviceCount * 42 * yearsToProject;
      currentImplementation = 125000;
      currentMaintenance = (currentHardware * (maintenancePercentage / 100)) * yearsToProject;
      currentPersonnel = (deviceCount / 1000) * 0.5 * fteCost * yearsToProject;
    } else if (currentVendor === 'forescout') {
      currentHardware = deviceCount * 20;
      currentLicensing = deviceCount * 50 * yearsToProject;
      currentImplementation = 140000;
      currentMaintenance = (currentHardware * (maintenancePercentage / 100)) * yearsToProject;
      currentPersonnel = (deviceCount / 1000) * 0.5 * fteCost * yearsToProject;
    } else if (currentVendor === 'fortinac') {
      currentHardware = deviceCount * 15;
      currentLicensing = deviceCount * 40 * yearsToProject;
      currentImplementation = 100000;
      currentMaintenance = (currentHardware * (maintenancePercentage / 100)) * yearsToProject;
      currentPersonnel = (deviceCount / 1000) * 0.4 * fteCost * yearsToProject;
    } else if (currentVendor === 'nps') {
      currentHardware = deviceCount * 5;
      currentLicensing = deviceCount * 10 * yearsToProject;
      currentImplementation = 50000;
      currentMaintenance = (currentHardware * (maintenancePercentage / 100)) * yearsToProject;
      currentPersonnel = (deviceCount / 1000) * 0.6 * fteCost * yearsToProject;
    } else if (currentVendor === 'securew2') {
      currentHardware = deviceCount * 2;
      currentLicensing = deviceCount * 30 * yearsToProject;
      currentImplementation = 75000;
      currentMaintenance = (currentHardware * (maintenancePercentage / 100)) * yearsToProject;
      currentPersonnel = (deviceCount / 1000) * 0.3 * fteCost * yearsToProject;
    } else if (currentVendor === 'noNac') {
      currentHardware = 0;
      currentLicensing = 0;
      currentImplementation = 0;
      currentMaintenance = deviceCount * 50 * yearsToProject; // Basic troubleshooting costs
      currentPersonnel = (deviceCount / 1000) * 0.6 * fteCost * yearsToProject; // Ad-hoc network management
    }

    // Calculate Portnox costs
    const effectivePrice = portnoxPricePerDevice * (1 - (portnoxDiscount / 100));
    const portnoxLicensing = deviceCount * effectivePrice * 12 * yearsToProject;
    const portnoxImplementation = implementationDays * consultingRate;
    const portnoxTraining = usersToTrain * trainingCostPerUser;
    const portnoxPersonnel = (deviceCount / 1000) * 0.2 * fteCost * yearsToProject;

    // Calculate totals
    const currentTotal = currentHardware + currentLicensing + currentImplementation + currentMaintenance + currentPersonnel;
    const portnoxTotal = portnoxLicensing + portnoxImplementation + portnoxTraining + portnoxPersonnel;

    // Calculate savings
    const savings = currentTotal - portnoxTotal;
    const savingsPercentage = (savings / currentTotal) * 100;

    // Calculate ROI
    const roi = (savings / portnoxTotal) * 100;

    // Calculate breakeven
    const currentMonthly = currentTotal / (yearsToProject * 12);
    const portnoxMonthly = portnoxTotal / (yearsToProject * 12);
    const initialDifference = portnoxImplementation + portnoxTraining - currentImplementation;
    const monthlyDifference = currentMonthly - portnoxMonthly;
    const breakeven = initialDifference > 0 ? Math.ceil(initialDifference / monthlyDifference) : 0;

    return {
      currentSolution: {
        hardware: currentHardware,
        licensing: currentLicensing,
        implementation: currentImplementation,
        maintenance: currentMaintenance,
        personnel: currentPersonnel,
        total: currentTotal
      },
      portnoxSolution: {
        hardware: 0,
        licensing: portnoxLicensing,
        implementation: portnoxImplementation + portnoxTraining,
        maintenance: 0,
        personnel: portnoxPersonnel,
        total: portnoxTotal,
        effectivePrice: effectivePrice,
        annualLicensing: deviceCount * effectivePrice * 12
      },
      savings: {
        hardware: currentHardware,
        licensing: currentLicensing - portnoxLicensing,
        implementation: currentImplementation - (portnoxImplementation + portnoxTraining),
        maintenance: currentMaintenance,
        personnel: currentPersonnel - portnoxPersonnel,
        total: savings,
        percentage: savingsPercentage
      },
      roi: {
        total: roi,
        yearly: []
      },
      breakeven: {
        month: breakeven,
        monthlyCosts: []
      },
      riskReduction: 35
    };
  }

  /**
   * Update UI with calculation results
   */
  _updateResultsUI() {
    if (!this.state.results) return;

    // Update executive summary
    this._updateExecutiveSummary();

    // Update charts if chart manager is available
    if (this.components.chartManager) {
      this._updateCharts();
    }

    // Update comparison table
    this._updateComparisonTable();

    // Update key insights
    this._updateKeyInsights();

    // Update other panels
    this._updateImplementationPanel();
    this._updateFeaturesPanel();
    this._updateRoiPanel();
    this._updateRiskPanel();
  }

  /**
   * Update executive summary with results
   */
  _updateExecutiveSummary() {
    // Update total savings
    const totalSavings = document.getElementById('total-savings');
    if (totalSavings) {
      totalSavings.textContent = `$${Math.round(this.state.results.savings.total).toLocaleString()}`;
    }

    // Update savings percentage
    const savingsPercentage = document.getElementById('savings-percentage');
    if (savingsPercentage) {
      savingsPercentage.textContent = `${Math.round(this.state.results.savings.percentage)}% reduction`;
    }

    // Update breakeven point
    const breakeven = document.getElementById('breakeven-point');
    if (breakeven) {
      const months = this.state.results.breakeven.month || 0;
      breakeven.textContent = months > 0 ? `${months} months` : 'Immediate';
    }

    // Update risk reduction
    const riskReduction = document.getElementById('risk-reduction');
    if (riskReduction) {
      riskReduction.textContent = `${Math.round(this.state.results.riskReduction)}%`;
    }

    // Update implementation time
    const implementationTime = document.getElementById('implementation-time');
    if (implementationTime) {
      // This would need to be calculated based on vendor data
      implementationTime.textContent = '75% less';
    }
  }

  /**
   * Update charts with results
   */
  _updateCharts() {
    // Update TCO comparison chart
    this.components.chartManager.updateTcoComparisonChart(
      this.state.results.currentSolution,
      this.state.results.portnoxSolution
    );

    // Update other charts...
    // These methods would be implemented in the chart manager
  }

  /**
   * Update comparison table with results
   */
  _updateComparisonTable() {
    const table = document.getElementById('cost-comparison-table');
    if (!table) return;

    const currentVendorName = this._formatVendorName(this.state.formData.currentVendor);
    const current = this.state.results.currentSolution;
    const portnox = this.state.results.portnoxSolution;
    const savings = this.state.results.savings;

    // Create table content
    let tableHTML = `
      <thead>
        <tr>
          <th>Cost Category</th>
          <th>${currentVendorName}</th>
          <th>Portnox Cloud</th>
          <th>Savings</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Hardware</td>
          <td>$${Math.round(current.hardware).toLocaleString()}</td>
          <td>$${Math.round(portnox.hardware).toLocaleString()}</td>
          <td>$${Math.round(savings.hardware).toLocaleString()}</td>
        </tr>
        <tr>
          <td>Software & Licensing</td>
          <td>$${Math.round(current.licensing).toLocaleString()}</td>
          <td>$${Math.round(portnox.licensing).toLocaleString()}</td>
          <td>$${Math.round(savings.licensing).toLocaleString()}</td>
        </tr>
        <tr>
          <td>Implementation</td>
          <td>$${Math.round(current.implementation).toLocaleString()}</td>
          <td>$${Math.round(portnox.implementation).toLocaleString()}</td>
          <td>$${Math.round(savings.implementation).toLocaleString()}</td>
        </tr>
        <tr>
          <td>Maintenance & Support</td>
          <td>$${Math.round(current.maintenance).toLocaleString()}</td>
          <td>$${Math.round(portnox.maintenance).toLocaleString()}</td>
          <td>$${Math.round(savings.maintenance).toLocaleString()}</td>
        </tr>
        <tr>
          <td>Personnel</td>
          <td>$${Math.round(current.personnel).toLocaleString()}</td>
          <td>$${Math.round(portnox.personnel).toLocaleString()}</td>
          <td>$${Math.round(savings.personnel).toLocaleString()}</td>
        </tr>
        <tr class="total-row">
          <td>Total</td>
          <td>$${Math.round(current.total).toLocaleString()}</td>
          <td>$${Math.round(portnox.total).toLocaleString()}</td>
          <td>$${Math.round(savings.total).toLocaleString()}</td>
        </tr>
      </tbody>
    `;

    // Update table
    table.innerHTML = tableHTML;
  }

  /**
   * Update key insights with results
   */
  _updateKeyInsights() {
    const insightsList = document.getElementById('key-insights-list');
    if (!insightsList) return;

    const currentVendorName = this._formatVendorName(this.state.formData.currentVendor);
    const savings = this.state.results.savings;
    const breakeven = this.state.results.breakeven.month || 0;

    // Create insights
    let insightsHTML = `
      <div class="insight-card">
        <div class="insight-icon"><i class="fas fa-piggy-bank"></i></div>
        <div class="insight-content">
          <h4>Cost Savings</h4>
          <p>Switching from ${currentVendorName} to Portnox Cloud will save your organization <strong>$${Math.round(savings.total).toLocaleString()}</strong> over ${this.state.formData.yearsToProject} years, representing a <strong>${Math.round(savings.percentage)}%</strong> reduction in total cost of ownership.</p>
        </div>
      </div>

      <div class="insight-card">
        <div class="insight-icon"><i class="fas fa-clock"></i></div>
        <div class="insight-content">
          <h4>Quick Return on Investment</h4>
          <p>Your organization will reach the break-even point in <strong>${breakeven > 0 ? `${breakeven} months` : 'less than 1 month'}</strong>, after which the solution will continue to deliver significant cost advantages.</p>
        </div>
      </div>

      <div class="insight-card">
        <div class="insight-icon"><i class="fas fa-shield-alt"></i></div>
        <div class="insight-content">
          <h4>Enhanced Security</h4>
          <p>Portnox Cloud will reduce your security risk by <strong>${Math.round(this.state.results.riskReduction)}%</strong> through improved visibility, automated policy enforcement, and continuous compliance monitoring.</p>
        </div>
      </div>

      <div class="insight-card">
        <div class="insight-icon"><i class="fas fa-cogs"></i></div>
        <div class="insight-content">
          <h4>Operational Efficiency</h4>
          <p>Cloud-native architecture eliminates hardware costs and reduces IT staff workload by <strong>${Math.round((savings.personnel / this.state.results.currentSolution.personnel) * 100)}%</strong>, allowing your team to focus on strategic initiatives.</p>
        </div>
      </div>
    `;

    // Update insights list
    insightsList.innerHTML = insightsHTML;
  }

  /**
   * Update implementation panel with results
   */
  _updateImplementationPanel() {
    const implementationRoadmap = document.getElementById('implementation-roadmap');
    if (!implementationRoadmap) return;

    const currentVendorName = this._formatVendorName(this.state.formData.currentVendor);

    // Create implementation roadmap content
    let roadmapHTML = `
      <div class="comparison-table">
        <table class="data-table">
          <thead>
            <tr>
              <th>Implementation Phase</th>
              <th>${currentVendorName}</th>
              <th>Portnox Cloud</th>
              <th>Time Savings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Planning & Assessment</td>
              <td>3-6 weeks</td>
              <td>1-2 weeks</td>
              <td>70%</td>
            </tr>
            <tr>
              <td>Infrastructure Preparation</td>
              <td>2-4 weeks</td>
              <td>None required</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>Installation & Configuration</td>
              <td>3-6 weeks</td>
              <td>1-3 days</td>
              <td>90%</td>
            </tr>
            <tr>
              <td>Policy Configuration</td>
              <td>2-4 weeks</td>
              <td>1-2 weeks</td>
              <td>60%</td>
            </tr>
            <tr>
              <td>Testing & Validation</td>
              <td>2-4 weeks</td>
              <td>1-2 weeks</td>
              <td>60%</td>
            </tr>
            <tr>
              <td>Pilot Deployment</td>
              <td>3-6 weeks</td>
              <td>1-2 weeks</td>
              <td>70%</td>
            </tr>
            <tr>
              <td>Full Deployment</td>
              <td>4-12 weeks</td>
              <td>2-4 weeks</td>
              <td>75%</td>
            </tr>
            <tr class="total-row">
              <td>Total Time</td>
              <td>19-42 weeks</td>
              <td>6-12 weeks</td>
              <td>75%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="implementation-advantages">
        <h3>Key Implementation Advantages</h3>
        <div class="advantages-grid">
          <div class="advantage-card">
            <div class="advantage-icon"><i class="fas fa-server"></i></div>
            <h4>Zero Hardware Requirements</h4>
            <p>Portnox Cloud eliminates the need for dedicated hardware appliances, reducing capital expenditure and deployment complexity.</p>
          </div>

          <div class="advantage-card">
            <div class="advantage-icon"><i class="fas fa-network-wired"></i></div>
            <h4>No Network Redesign</h4>
            <p>Implementation requires no network architecture changes, unlike traditional NAC solutions that may require redesigning network segments.</p>
          </div>

          <div class="advantage-card">
            <div class="advantage-icon"><i class="fas fa-bolt"></i></div>
            <h4>Rapid Deployment</h4>
            <p>Cloud-native architecture enables rapid deployment with minimal prerequisites, allowing you to secure your network faster.</p>
          </div>

          <div class="advantage-card">
            <div class="advantage-icon"><i class="fas fa-globe"></i></div>
            <h4>Multi-Site Support</h4>
            <p>Easily manage distributed locations from a single console without additional infrastructure at each site.</p>
          </div>
        </div>
      </div>
    `;

    // Update implementation roadmap
    implementationRoadmap.innerHTML = roadmapHTML;
  }

  /**
   * Update features panel with results
   */
  _updateFeaturesPanel() {
    const featuresMatrix = document.getElementById('features-matrix-table');
    if (!featuresMatrix) return;

    const currentVendorName = this._formatVendorName(this.state.formData.currentVendor);

    // Get feature comparison data if processor is available
    let comparisonData = null;

    if (this.components.featureComparisonProcessor) {
      comparisonData = this.components.featureComparisonProcessor.getFeatureComparison(
        this.state.formData.currentVendor,
        'portnox'
      );
    }

    // Create feature matrix content
    let matrixHTML = `
      <thead>
        <tr>
          <th>Feature</th>
          <th>${currentVendorName}</th>
          <th>Portnox Cloud</th>
          <th>Advantage</th>
        </tr>
      </thead>
      <tbody>
    `;

    // If comparison data is available, use it
    if (comparisonData && comparisonData.featureComparison) {
      const { labels, current, alternative, differences } = comparisonData.featureComparison;

      labels.forEach((label, index) => {
        const currentValue = current[index];
        const portnoxValue = alternative[index];
        const difference = differences[index];

        let advantageClass = '';
        let advantageText = 'Equal';

        if (difference > 0) {
          advantageClass = 'positive';
          advantageText = `+${difference} Portnox`;
        } else if (difference < 0) {
          advantageClass = 'negative';
          advantageText = `${difference} ${currentVendorName}`;
        }

        matrixHTML += `
          <tr>
            <td>${label}</td>
            <td>
              <div class="rating-bar">
                <div class="rating-fill" style="width: ${currentValue * 10}%"></div>
              </div>
              <span>${currentValue}/10</span>
            </td>
            <td>
              <div class="rating-bar">
                <div class="rating-fill" style="width: ${portnoxValue * 10}%"></div>
              </div>
              <span>${portnoxValue}/10</span>
            </td>
            <td class="${advantageClass}">${advantageText}</td>
          </tr>
        `;
      });
    } else {
      // Fallback to static data
      const features = [
        { name: 'Device Visibility', current: 7, portnox: 8 },
        { name: 'Policy Management', current: 6, portnox: 9 },
        { name: 'Guest Access', current: 7, portnox: 8 },
        { name: 'BYOD Support', current: 6, portnox: 9 },
        { name: 'Cloud Integration', current: 5, portnox: 10 },
        { name: 'Automated Remediation', current: 6, portnox: 9 },
        { name: 'Third-Party Integration', current: 7, portnox: 9 },
        { name: 'Scalability', current: 7, portnox: 9 },
        { name: 'Ease of Use', current: 5, portnox: 9 },
        { name: 'Reporting', current: 6, portnox: 8 }
      ];

      features.forEach(feature => {
        const difference = feature.portnox - feature.current;

        let advantageClass = '';
        let advantageText = 'Equal';

        if (difference > 0) {
          advantageClass = 'positive';
          advantageText = `+${difference} Portnox`;
        } else if (difference < 0) {
          advantageClass = 'negative';
          advantageText = `${difference} ${currentVendorName}`;
        }

        matrixHTML += `
          <tr>
            <td>${feature.name}</td>
            <td>
              <div class="rating-bar">
                <div class="rating-fill" style="width: ${feature.current * 10}%"></div>
              </div>
              <span>${feature.current}/10</span>
            </td>
            <td>
              <div class="rating-bar">
                <div class="rating-fill" style="width: ${feature.portnox * 10}%"></div>
              </div>
              <span>${feature.portnox}/10</span>
            </td>
            <td class="${advantageClass}">${advantageText}</td>
          </tr>
        `;
      });
    }

    matrixHTML += `</tbody>`;

    // Update features matrix
    featuresMatrix.innerHTML = matrixHTML;
  }

  /**
   * Update ROI panel with results
   */
  _updateRoiPanel() {
    const roiBreakdown = document.getElementById('roi-breakdown');
    if (!roiBreakdown) return;

    const roi = this.state.results.roi.total;
    const breakeven = this.state.results.breakeven.month || 0;

    // Create ROI breakdown content
    let breakdownHTML = `
      <div class="roi-summary">
        <div class="roi-metric">
          <div class="metric-value">${Math.round(roi)}%</div>
          <div class="metric-label">3-Year ROI</div>
        </div>

        <div class="roi-metric">
          <div class="metric-value">${breakeven > 0 ? breakeven : '<1'}</div>
          <div class="metric-label">Months to Break-even</div>
        </div>

        <div class="roi-metric">
          <div class="metric-value">$${Math.round(this.state.results.savings.total).toLocaleString()}</div>
          <div class="metric-label">Total Savings</div>
        </div>
      </div>

      <div class="roi-analysis">
        <h3>Return on Investment Analysis</h3>
        <p>The ROI calculation is based on the following components:</p>

        <h4>Investment Costs</h4>
        <ul>
          <li>Portnox Cloud Licensing: $${Math.round(this.state.results.portnoxSolution.licensing).toLocaleString()}</li>
          <li>Implementation & Training: $${Math.round(this.state.results.portnoxSolution.implementation).toLocaleString()}</li>
          <li>IT Staff Allocation: $${Math.round(this.state.results.portnoxSolution.personnel).toLocaleString()}</li>
        </ul>

        <h4>Returns</h4>
        <ul>
          <li>Hardware Elimination: $${Math.round(this.state.results.savings.hardware).toLocaleString()}</li>
          <li>Licensing Cost Reduction: $${Math.round(this.state.results.savings.licensing).toLocaleString()}</li>
          <li>Maintenance Savings: $${Math.round(this.state.results.savings.maintenance).toLocaleString()}</li>
          <li>IT Productivity Improvement: $${Math.round(this.state.results.savings.personnel).toLocaleString()}</li>
        </ul>

        <div class="roi-notes">
          <p><strong>Note:</strong> This analysis does not include additional potential benefits such as reduced security incident costs, compliance violation avoidance, and operational efficiency improvements, which would further increase the ROI.</p>
        </div>
      </div>
    `;

    // Update ROI breakdown
    roiBreakdown.innerHTML = breakdownHTML;
  }

  /**
   * Update risk panel with results
   */
  _updateRiskPanel() {
    const riskMatrix = document.getElementById('risk-matrix');
    if (!riskMatrix) return;

    const riskMitigation = document.getElementById('risk-mitigation-strategies');
    if (!riskMitigation) return;

    // Create risk matrix content
    let matrixHTML = `
      <div class="risk-assessment-table">
        <table class="data-table">
          <thead>
            <tr>
              <th>Risk Category</th>
              <th>Current Risk Level</th>
              <th>With Portnox Cloud</th>
              <th>Risk Reduction</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Unauthorized Access</td>
              <td class="risk-high">High</td>
              <td class="risk-low">Low</td>
              <td>80%</td>
            </tr>
            <tr>
              <td>Malware Propagation</td>
              <td class="risk-high">High</td>
              <td class="risk-low">Low</td>
              <td>75%</td>
            </tr>
            <tr>
              <td>Compliance Violations</td>
              <td class="risk-medium">Medium</td>
              <td class="risk-low">Low</td>
              <td>65%</td>
            </tr>
            <tr>
              <td>Data Breaches</td>
              <td class="risk-high">High</td>
              <td class="risk-medium">Medium</td>
              <td>50%</td>
            </tr>
            <tr>
              <td>Shadow IT</td>
              <td class="risk-medium">Medium</td>
              <td class="risk-low">Low</td>
              <td>70%</td>
            </tr>
            <tr>
              <td>Lateral Movement</td>
              <td class="risk-high">High</td>
              <td class="risk-low">Low</td>
              <td>80%</td>
            </tr>
            <tr>
              <td>Insecure IoT Devices</td>
              <td class="risk-high">High</td>
              <td class="risk-medium">Medium</td>
              <td>60%</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    // Create risk mitigation strategies content
    let strategiesHTML = `
      <div class="mitigation-strategies-grid">
        <div class="strategy-card">
          <div class="strategy-icon"><i class="fas fa-user-shield"></i></div>
          <h4>Network Access Control</h4>
          <p>Portnox Cloud ensures that only authorized and compliant devices can access your network, reducing the risk of unauthorized access and malware propagation.</p>
        </div>

        <div class="strategy-card">
          <div class="strategy-icon"><i class="fas fa-shield-virus"></i></div>
          <h4>Device Compliance</h4>
          <p>Continuous device posture assessment ensures that all devices connecting to your network meet your security requirements, including up-to-date antivirus, patches, and security configurations.</p>
        </div>

        <div class="strategy-card">
          <div class="strategy-icon"><i class="fas fa-network-wired"></i></div>
          <h4>Network Segmentation</h4>
          <p>Portnox Cloud enables dynamic network segmentation based on device identity, type, and compliance status, limiting lateral movement and containing potential breaches.</p>
        </div>

        <div class="strategy-card">
          <div class="strategy-icon"><i class="fas fa-clipboard-check"></i></div>
          <h4>Compliance Enforcement</h4>
          <p>Automated policy enforcement ensures continuous compliance with industry regulations, reducing the risk of violations and associated penalties.</p>
        </div>

        <div class="strategy-card">
          <div class="strategy-icon"><i class="fas fa-eye"></i></div>
          <h4>Visibility & Monitoring</h4>
          <p>Complete visibility into all connected devices and users provides real-time awareness of your network security posture and enables rapid response to security incidents.</p>
        </div>

        <div class="strategy-card">
          <div class="strategy-icon"><i class="fas fa-robot"></i></div>
          <h4>Automated Remediation</h4>
          <p>Automatic quarantine and remediation of non-compliant devices reduces the window of exposure and minimizes IT staff workload for security incident response.</p>
        </div>
      </div>
    `;

    // Update risk matrix and mitigation strategies
    riskMatrix.innerHTML = matrixHTML;
    riskMitigation.innerHTML = strategiesHTML;
  }

  /**
   * Show loading overlay
   */
  _showLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.classList.add('active');
    }
  }

  /**
   * Hide loading overlay
   */
  _hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.classList.remove('active');
    }
  }

  /**
   * Show results container
   */
  _showResultsContainer() {
    const wizardContainer = document.getElementById('wizard-container');
    const resultsContainer = document.getElementById('results-container');
    const wizardNavigation = document.querySelector('.wizard-navigation');

    if (wizardContainer) {
      wizardContainer.classList.add('hidden');
    }

    if (resultsContainer) {
      resultsContainer.classList.remove('hidden');
    }

    if (wizardNavigation) {
      wizardNavigation.classList.add('hidden');
    }
  }

  /**
   * Reset calculation and return to wizard
   */
  _resetCalculation() {
    const wizardContainer = document.getElementById('wizard-container');
    const resultsContainer = document.getElementById('results-container');
    const wizardNavigation = document.querySelector('.wizard-navigation');

    if (wizardContainer) {
      wizardContainer.classList.remove('hidden');
    }

    if (resultsContainer) {
      resultsContainer.classList.add('hidden');
    }

    if (wizardNavigation) {
      wizardNavigation.classList.remove('hidden');
    }

    // Reset to first step
    this.state.currentStep = 1;
    this._updateWizardUI();

    // Clear results
    this.state.results = null;
  }

  /**
   * Toggle sensitivity sidebar
   */
  _toggleSensitivitySidebar() {
    const sidebar = document.getElementById('sensitivity-sidebar');
    if (sidebar) {
      sidebar.classList.toggle('active');
    }
  }

  /**
   * Run sensitivity analysis
   */
  runSensitivityAnalysis() {
    console.log("Running sensitivity analysis...");

    // Get sensitivity parameters
    const variable = document.getElementById('sensitivity-variable')?.value || 'deviceCount';
    const minValue = parseInt(document.getElementById('sensitivity-min')?.value) || 500;
    const maxValue = parseInt(document.getElementById('sensitivity-max')?.value) || 10000;

    // Show loading
    this._showLoading();

    // Perform sensitivity analysis
    setTimeout(() => {
      const sensitivityResults = this._performSensitivityAnalysis(variable, minValue, maxValue);

      // Update sensitivity chart if chart manager is available
      if (this.components.chartManager && this.components.chartManager.charts.sensitivity) {
        this._updateSensitivityChart(sensitivityResults);
      }

      // Hide loading
      this._hideLoading();
    }, 1000);
  }

  /**
   * Perform sensitivity analysis
   * @param {string} variable - Variable to analyze
   * @param {number} minValue - Minimum value
   * @param {number} maxValue - Maximum value
   * @returns {Object} - Sensitivity analysis results
   */
  _performSensitivityAnalysis(variable, minValue, maxValue) {
    const results = {
      labels: [],
      currentTco: [],
      portnoxTco: [],
      savings: []
    };

    // Create value range
    const steps = 10;
    const stepSize = (maxValue - minValue) / (steps - 1);

    for (let i = 0; i < steps; i++) {
      const value = minValue + (stepSize * i);
      results.labels.push(value);

      // Create calculation params
      const params = this._createCalculationParams();

      // Update variable
      if (variable === 'deviceCount') {
        params.deviceCount = value;
      } else if (variable === 'cost') {
        params.portnoxPricePerDevice = value;
      } else if (variable === 'fte') {
        params.fteCost = value;
      } else if (variable === 'implementation') {
        params.implementationDays = value;
      }

      // Perform calculation
      let calculationResult = null;

      if (this.components.tcoCalculator) {
        calculationResult = this.components.tcoCalculator.calculateTco(params);
      } else {
        calculationResult = this._fallbackCalculation(params);
      }

      // Store results
      results.currentTco.push(calculationResult.currentSolution.total);
      results.portnoxTco.push(calculationResult.portnoxSolution.total);
      results.savings.push(calculationResult.savings.total);
    }

    return results;
  }

  /**
   * Update sensitivity chart with results
   * @param {Object} results - Sensitivity analysis results
   */
  _updateSensitivityChart(results) {
    const chart = this.components.chartManager.charts.sensitivity;

    // Update chart data
    chart.data.labels = results.labels;
    chart.data.datasets[0].data = results.currentTco;
    chart.data.datasets[1].data = results.portnoxTco;
    chart.data.datasets[2].data = results.savings;

    // Update chart
    chart.update();
  }

  /**
   * Export PDF report
   */
  _exportPdf() {
    console.log("Exporting PDF report...");

    // Show loading
    this._showLoading();

    // Generate PDF (simple implementation)
    setTimeout(() => {
      alert('PDF export feature is not implemented in this version.');

      // Hide loading
      this._hideLoading();
    }, 1000);
  }
}

// Initialize application controller when document is ready
document.addEventListener('DOMContentLoaded', function() {
  window.appController = new ApplicationController();
  window.appController.init();
});
EOL

  echo -e "${GREEN}✓ Application controller created.${NC}"
}

# Function to fix HTML canvas elements
fix_html_canvas_elements() {
  echo -e "\n${YELLOW}Fixing HTML canvas elements in index.html...${NC}"

  # Create a temporary file for processing
  TMP_FILE=$(mktemp)

  # Process index.html to update canvas elements
  if [ -f "index.html" ]; then
    # Extract the relevant part of the file to modify
    sed -n '/<div class="result-panel" id="comparison-panel">/,/<\/div>/p' index.html > $TMP_FILE

    # Check if extraction was successful
    if [ -s $TMP_FILE ]; then
      # Update comparison panel content
      cat > $TMP_FILE << 'EOL'
                <!-- Comparison Tab -->
                <div class="result-panel" id="comparison-panel">
                    <div class="comparison-charts">
                        <div class="chart-grid">
                            <div class="chart-card">
                                <h3>3-Year TCO Comparison</h3>
                                <canvas id="tco-comparison-chart"></canvas>
                            </div>

                            <div class="chart-card">
                                <h3>Current Solution Cost Breakdown</h3>
                                <canvas id="current-breakdown-chart"></canvas>
                            </div>

                            <div class="chart-card">
                                <h3>Portnox Cloud Cost Breakdown</h3>
                                <canvas id="alternative-breakdown-chart"></canvas>
                            </div>

                            <div class="chart-card">
                                <h3>Cumulative Cost Over Time</h3>
                                <canvas id="cumulative-cost-chart"></canvas>
                            </div>
                        </div>
                    </div>

                    <div class="comparison-table">
                        <h3>Detailed Cost Comparison</h3>
                        <table id="cost-comparison-table" class="data-table">
                            <!-- Table populated dynamically -->
                        </table>
                    </div>
                </div>
EOL

      # Create new file with updated content
      sed '/<div class="result-panel" id="comparison-panel">/,/<\/div>/ {
        H
        d
      }' index.html > index.html.new

      # Find the insertion point
      INSERTION_LINE=$(grep -n "results-content" index.html.new | head -1 | cut -d: -f1)

      # Insert updated content
      sed -i "${INSERTION_LINE}r $TMP_FILE" index.html.new

      # Add implementation panel
      cat >> index.html.new << 'EOL'

                <!-- Implementation Tab -->
                <div class="result-panel" id="implementation-panel">
                    <div class="implementation-content">
                        <div class="chart-card">
                            <h3>Implementation Timeline Comparison</h3>
                            <canvas id="implementation-comparison-chart"></canvas>
                        </div>

                        <div class="implementation-details">
                            <h3>Implementation Roadmap</h3>
                            <div id="implementation-roadmap">
                                <!-- Roadmap populated dynamically -->
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Features Tab -->
                <div class="result-panel" id="features-panel">
                    <div class="features-content">
                        <div class="chart-card">
                            <h3>Feature Comparison</h3>
                            <canvas id="feature-comparison-chart"></canvas>
                        </div>

                        <div class="features-matrix">
                            <h3>Detailed Feature Matrix</h3>
                            <table id="features-matrix-table" class="data-table">
                                <!-- Table populated dynamically -->
                            </table>
                        </div>
                    </div>
                </div>

                <!-- ROI Tab -->
                <div class="result-panel" id="roi-panel">
                    <div class="roi-content">
                        <div class="chart-card">
                            <h3>ROI Analysis</h3>
                            <canvas id="roi-chart"></canvas>
                        </div>

                        <div class="roi-details">
                            <h3>ROI Breakdown</h3>
                            <div id="roi-breakdown">
                                <!-- ROI details populated dynamically -->
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Risk Tab -->
                <div class="result-panel" id="risk-panel">
                    <div class="risk-content">
                        <div class="risk-matrix">
                            <h3>Risk Assessment Matrix</h3>
                            <div id="risk-matrix">
                                <!-- Risk matrix populated dynamically -->
                            </div>
                        </div>

                        <div class="risk-mitigation">
                            <h3>Risk Mitigation Strategies</h3>
                            <div id="risk-mitigation-strategies">
                                <!-- Strategies populated dynamically -->
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sensitivity Tab -->
                <div class="result-panel" id="sensitivity-panel">
                    <div class="sensitivity-content">
                        <div class="sensitivity-controls">
                            <h3>Sensitivity Analysis Parameters</h3>
                            <div class="parameter-grid">
                                <div class="parameter-card">
                                    <label for="sensitivity-variable">Variable to Analyze</label>
                                    <select id="sensitivity-variable" class="form-select">
                                        <option value="deviceCount">Device Count</option>
                                        <option value="cost">Cost per Device</option>
                                        <option value="fte">FTE Requirements</option>
                                        <option value="implementation">Implementation Time</option>
                                    </select>
                                </div>
                                
                                <div class="parameter-card">
                                    <label>Value Range</label>
                                    <div class="range-inputs">
                                        <input type="number" id="sensitivity-min" class="form-input" placeholder="Min">
                                        <input type="number" id="sensitivity-max" class="form-input" placeholder="Max">
                                    </div>
                                </div>
                            </div>
                            
                            <button id="run-sensitivity" class="btn btn-primary">
                                Run Sensitivity Analysis
                            </button>
                        </div>
                        
                        <div class="sensitivity-results">
                            <div class="chart-card">
                                <h3>Sensitivity Analysis Results</h3>
                                <canvas id="sensitivity-chart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
EOL

      # Replace original with updated file
      mv index.html.new index.html
      
      echo -e "${GREEN}✓ HTML canvas elements fixed in index.html${NC}"
    else
      echo -e "${RED}Failed to process index.html - couldn't find comparison panel.${NC}"
      # Create a fallback approach - appending the missing elements
      echo -e "${YELLOW}Attempting fallback approach...${NC}"
      
      # Create a JavaScript file that dynamically adds missing canvas elements
      cat > js/fix-canvas-elements.js << 'EOL'
/**
 * Canvas Element Fixer
 * Dynamically adds missing canvas elements to the DOM
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log("Checking for missing canvas elements...");
  
  // Check and add tco-comparison-chart canvas
  if (!document.getElementById('tco-comparison-chart')) {
    console.log("Adding missing tco-comparison-chart canvas");
    const container = document.querySelector('.comparison-charts');
    if (container) {
      const chartCard = document.createElement('div');
      chartCard.className = 'chart-card';
      chartCard.innerHTML = `
        <h3>3-Year TCO Comparison</h3>
        <canvas id="tco-comparison-chart"></canvas>
      `;
      container.prepend(chartCard);
    }
  }
  
  // Check and add current-breakdown-chart canvas
  if (!document.getElementById('current-breakdown-chart')) {
    console.log("Adding missing current-breakdown-chart canvas");
    const container = document.querySelector('.comparison-charts');
    if (container) {
      const chartCard = document.createElement('div');
      chartCard.className = 'chart-card';
      chartCard.innerHTML = `
        <h3>Current Solution Cost Breakdown</h3>
        <canvas id="current-breakdown-chart"></canvas>
      `;
      container.appendChild(chartCard);
    }
  }
  
  // Check and add alternative-breakdown-chart canvas
  if (!document.getElementById('alternative-breakdown-chart')) {
    console.log("Adding missing alternative-breakdown-chart canvas");
    const container = document.querySelector('.comparison-charts');
    if (container) {
      const chartCard = document.createElement('div');
      chartCard.className = 'chart-card';
      chartCard.innerHTML = `
        <h3>Portnox Cloud Cost Breakdown</h3>
        <canvas id="alternative-breakdown-chart"></canvas>
      `;
      container.appendChild(chartCard);
    }
  }
  
  // Check and add implementation-comparison-chart canvas
  if (!document.getElementById('implementation-comparison-chart')) {
    console.log("Adding missing implementation-comparison-chart canvas");
    const implementationPanel = document.getElementById('implementation-panel');
    if (!implementationPanel) {
      console.log("Creating implementation panel");
      const resultsContent = document.querySelector('.results-content');
      if (resultsContent) {
        const panel = document.createElement('div');
        panel.className = 'result-panel';
        panel.id = 'implementation-panel';
        panel.innerHTML = `
          <div class="implementation-content">
            <div class="chart-card">
              <h3>Implementation Timeline Comparison</h3>
              <canvas id="implementation-comparison-chart"></canvas>
            </div>
            
            <div class="implementation-details">
              <h3>Implementation Roadmap</h3>
              <div id="implementation-roadmap">
                <!-- Roadmap populated dynamically -->
              </div>
            </div>
          </div>
        `;
        resultsContent.appendChild(panel);
      }
    }
  }
  
  // Check and add feature-comparison-chart canvas
  if (!document.getElementById('feature-comparison-chart')) {
    console.log("Adding missing feature-comparison-chart canvas");
    const featuresPanel = document.getElementById('features-panel');
    if (!featuresPanel) {
      console.log("Creating features panel");
      const resultsContent = document.querySelector('.results-content');
      if (resultsContent) {
        const panel = document.createElement('div');
        panel.className = 'result-panel';
        panel.id = 'features-panel';
        panel.innerHTML = `
          <div class="features-content">
            <div class="chart-card">
              <h3>Feature Comparison</h3>
              <canvas id="feature-comparison-chart"></canvas>
            </div>
            
            <div class="features-matrix">
              <h3>Detailed Feature Matrix</h3>
              <table id="features-matrix-table" class="data-table">
                <!-- Table populated dynamically -->
              </table>
            </div>
          </div>
        `;
        resultsContent.appendChild(panel);
      }
    }
  }
  
  // Check and add roi-chart canvas
  if (!document.getElementById('roi-chart')) {
    console.log("Adding missing roi-chart canvas");
    const roiPanel = document.getElementById('roi-panel');
    if (!roiPanel) {
      console.log("Creating ROI panel");
      const resultsContent = document.querySelector('.results-content');
      if (resultsContent) {
        const panel = document.createElement('div');
        panel.className = 'result-panel';
        panel.id = 'roi-panel';
        panel.innerHTML = `
          <div class="roi-content">
            <div class="chart-card">
              <h3>ROI Analysis</h3>
              <canvas id="roi-chart"></canvas>
            </div>
            
            <div class="roi-details">
              <h3>ROI Breakdown</h3>
              <div id="roi-breakdown">
                <!-- ROI details populated dynamically -->
              </div>
            </div>
          </div>
        `;
        resultsContent.appendChild(panel);
      }
    }
  }
  
  // Check and add sensitivity-chart canvas
  if (!document.getElementById('sensitivity-chart')) {
    console.log("Adding missing sensitivity-chart canvas");
    const sensitivityPanel = document.getElementById('sensitivity-panel');
    if (!sensitivityPanel) {
      console.log("Creating sensitivity panel");
      const resultsContent = document.querySelector('.results-content');
      if (resultsContent) {
        const panel = document.createElement('div');
        panel.className = 'result-panel';
        panel.id = 'sensitivity-panel';
        panel.innerHTML = `
          <div class="sensitivity-content">
            <div class="sensitivity-controls">
              <h3>Sensitivity Analysis Parameters</h3>
              <div class="parameter-grid">
                <div class="parameter-card">
                  <label for="sensitivity-variable">Variable to Analyze</label>
                  <select id="sensitivity-variable" class="form-select">
                    <option value="deviceCount">Device Count</option>
                    <option value="cost">Cost per Device</option>
                    <option value="fte">FTE Requirements</option>
                    <option value="implementation">Implementation Time</option>
                  </select>
                </div>
                
                <div class="parameter-card">
                  <label>Value Range</label>
                  <div class="range-inputs">
                    <input type="number" id="sensitivity-min" class="form-input" placeholder="Min">
                    <input type="number" id="sensitivity-max" class="form-input" placeholder="Max">
                  </div>
                </div>
              </div>
              
              <button id="run-sensitivity" class="btn btn-primary">
                Run Sensitivity Analysis
              </button>
            </div>
            
            <div class="sensitivity-results">
              <div class="chart-card">
                <h3>Sensitivity Analysis Results</h3>
                <canvas id="sensitivity-chart"></canvas>
              </div>
            </div>
          </div>
        `;
        resultsContent.appendChild(panel);
      }
    }
  }
  
  console.log("Canvas element check complete");
});
EOL

      # Add reference to script in index.html before the closing body tag
      sed -i 's|</body>|    <script src="js/fix-canvas-elements.js"></script>\n</body>|' index.html
      
      echo -e "${GREEN}✓ Created fallback canvas element fixer script${NC}"
    fi
  else
    echo -e "${RED}index.html not found.${NC}"
  fi
  
  # Clean up temporary file
  rm $TMP_FILE
}

# Function to create CSS styles
create_css_styles() {
  echo -e "\n${YELLOW}Creating CSS styles...${NC}"
  
  # Create a directory for CSS if it doesn't exist
  mkdir -p css
  
  # Create chart styles
  cat > css/chart-styles.css << 'EOL'
/* Chart Styles */
.chart-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.chart-card {
  background-color: var(--card-bg-color);
  border-radius: var(--border-radius-md);
  box-shadow: var(--card-shadow);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.chart-card h3 {
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--heading-color);
}

.chart-container {
  position: relative;
  height: 250px;
  width: 100%;
}

/* Results Panels */
.result-panel {
  display: none;
  animation: fadeIn 0.3s ease-in-out;
}

.result-panel.active {
  display: block;
}

.executive-summary {
  margin-bottom: 2rem;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.summary-card {
  background-color: var(--card-bg-color);
  border-radius: var(--border-radius-md);
  box-shadow: var(--card-shadow);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--card-shadow-hover);
}

.summary-card.highlight {
  background-color: var(--primary-color-light);
  border-left: 4px solid var(--primary-color);
}

.card-icon {
  font-size: 2rem;
  color: var(--primary-color);
  margin-right: 1rem;
}

.card-content {
  flex: 1;
}

.card-content h4 {
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
  color: var(--text-color);
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--heading-color);
  margin-bottom: 0.25rem;
}

.metric-detail {
  font-size: 0.9rem;
  color: var(--text-light);
}

/* Key Insights */
.insights-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.insight-card {
  background-color: var(--card-bg-color);
  border-radius: var(--border-radius-md);
  box-shadow: var(--card-shadow);
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  transition: transform 0.3s ease;
}

.insight-card:hover {
  transform: translateY(-3px);
}

.insight-icon {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-right: 1rem;
  padding-top: 0.25rem;
}

.insight-content {
  flex: 1;
}

.insight-content h4 {
  font-size: 1.1rem;
  margin: 0 0 0.75rem 0;
  color: var(--heading-color);
}

.insight-content p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
}

.insight-content strong {
  color: var(--heading-color);
}

/* Comparison Table */
.comparison-table {
  margin-top: 2rem;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.data-table th {
  padding: 1rem;
  text-align: left;
  background-color: var(--table-header-bg);
  color: var(--table-header-color);
  font-weight: 600;
  border-bottom: 2px solid var(--border-color);
}

.data-table td {
  padding: 1rem;
  border-bottom: 1px solid var(--border-color-light);
}

.data-table tr:hover td {
  background-color: var(--hover-color);
}

.data-table .total-row {
  font-weight: 700;
  background-color: var(--table-total-bg);
}

.data-table .total-row td {
  border-top: 2px solid var(--border-color);
}

/* Feature Comparison */
.rating-bar {
  height: 12px;
  background-color: var(--bg-color-secondary);
  border-radius: 6px;
  margin-bottom: 5px;
  overflow: hidden;
}

.rating-fill {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: 6px;
}

.positive {
  color: var(--success-color);
  font-weight: 600;
}

.negative {
  color: var(--danger-color);
  font-weight: 600;
}

/* Risk Matrix */
.risk-high {
  color: var(--danger-color);
  font-weight: 600;
}

.risk-medium {
  color: var(--warning-color);
  font-weight: 600;
}

.risk-low {
  color: var(--success-color);
  font-weight: 600;
}

.mitigation-strategies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.strategy-card {
  background-color: var(--card-bg-color);
  border-radius: var(--border-radius-md);
  box-shadow: var(--card-shadow);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.strategy-card:hover {
  transform: translateY(-3px);
}

.strategy-icon {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.strategy-card h4 {
  font-size: 1.1rem;
  margin: 0 0 0.75rem 0;
  color: var(--heading-color);
}

.strategy-card p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* ROI Analysis */
.roi-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.roi-metric {
  background-color: var(--card-bg-color);
  border-radius: var(--border-radius-md);
  box-shadow: var(--card-shadow);
  padding: 1.5rem;
  text-align: center;
}

.roi-analysis h4 {
  font-size: 1.1rem;
  margin: 1.5rem 0 0.75rem 0;
  color: var(--heading-color);
}

.roi-analysis ul {
  margin: 0.5rem 0 1.5rem 0;
  padding-left: 1.5rem;
}

.roi-analysis li {
  margin-bottom: 0.5rem;
}

.roi-notes {
  background-color: var(--bg-color-secondary);
  border-radius: var(--border-radius-md);
  padding: 1rem;
  margin-top: 1.5rem;
}

.roi-notes p {
  margin: 0;
  font-size: 0.9rem;
}

/* Sensitivity Analysis */
.sensitivity-controls {
  background-color: var(--card-bg-color);
  border-radius: var(--border-radius-md);
  box-shadow: var(--card-shadow);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.parameter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.parameter-card {
  display: flex;
  flex-direction: column;
}

.range-inputs {
  display: flex;
  gap: 1rem;
}

.range-inputs input {
  flex: 1;
}

/* Loading Overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.loading-overlay.active {
  opacity: 1;
  visibility: visible;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Animation */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
EOL

  echo -e "${GREEN}✓ CSS styles created.${NC}"
}

# Function to verify and include the necessary scripts
verify_scripts() {
  echo -e "\n${YELLOW}Verifying script references in index.html...${NC}"
  
  # Check if index.html exists
  if [ -f "index.html" ]; then
    # Create temporary file
    TMP_FILE=$(mktemp)
    
    # Check if all required script references are present
    MISSING_SCRIPTS=()
    
    grep -q "js/components/charts/chart-manager.js" index.html || MISSING_SCRIPTS+=("js/components/charts/chart-manager.js")
    grep -q "js/data/processors/tco-calculator.js" index.html || MISSING_SCRIPTS+=("js/data/processors/tco-calculator.js")
    grep -q "js/data/processors/industry-compliance-processor.js" index.html || MISSING_SCRIPTS+=("js/data/processors/industry-compliance-processor.js")
    grep -q "js/data/processors/feature-comparison-processor.js" index.html || MISSING_SCRIPTS+=("js/data/processors/feature-comparison-processor.js")
    grep -q "js/app-controller.js" index.html || MISSING_SCRIPTS+=("js/app-controller.js")
    grep -q "css/chart-styles.css" index.html || MISSING_SCRIPTS+=("css/chart-styles.css")
    
    # Add missing script references
    if [ ${#MISSING_SCRIPTS[@]} -gt 0 ]; then
      echo -e "${YELLOW}Adding missing script references to index.html:${NC}"
      
      for script in "${MISSING_SCRIPTS[@]}"; do
        echo "  - $script"
        
        # Determine script type
        if [[ $script == *.css ]]; then
          # Get the current head section and append CSS link
          sed -i '/<\/head>/i \    <link rel="stylesheet" href="'"$script"'">' index.html
        else
          # Add JavaScript reference before closing body tag
          sed -i '/<\/body>/i \    <script src="'"$script"'"><\/script>' index.html
        fi
      done
      
      echo -e "${GREEN}✓ Added missing script references to index.html${NC}"
    else
      echo -e "${GREEN}✓ All required script references already present in index.html${NC}"
    fi
  else
    echo -e "${RED}index.html not found.${NC}"
  fi
}

# Function to create a helper initialization script
create_initialization_script() {
  echo -e "\n${YELLOW}Creating initialization script...${NC}"
  
  # Create the initialization script
  cat > js/init.js << 'EOL'
/**
 * TCO Analyzer Initialization Script
 * Ensures all components are initialized in the correct order
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log("TCO Analyzer initialization starting...");
  
  // Wait for all components to be loaded
  const checkComponentsLoaded = () => {
    const requiredComponents = [
      'chartManager',
      'tcoCalculator', 
      'industryComplianceProcessor',
      'featureComparisonProcessor'
    ];
    
    const missingComponents = requiredComponents.filter(component => !window[component]);
    
    if (missingComponents.length > 0) {
      console.log(`Waiting for components to load: ${missingComponents.join(', ')}`);
      setTimeout(checkComponentsLoaded, 100);
    } else {
      console.log("All components loaded, initializing application controller");
      
      // Initialize application controller
      if (!window.appController) {
        window.appController = new ApplicationController();
      }
      
      // Initialize app
      window.appController.init();
      
      console.log("TCO Analyzer initialized successfully!");
    }
  };
  
  // Start checking for component loading
  checkComponentsLoaded();
});
EOL

  # Add reference to script in index.html before the closing body tag
  if grep -q "js/init.js" index.html; then
    echo -e "${GREEN}✓ Initialization script reference already present in index.html${NC}"
  else
    sed -i 's|</body>|    <script src="js/init.js"></script>\n</body>|' index.html
    echo -e "${GREEN}✓ Added initialization script reference to index.html${NC}"
  fi
  
  echo -e "${GREEN}✓ Initialization script created.${NC}"
}

# Main script execution
main() {
  echo -e "\n${BLUE}============================================${NC}"
  echo -e "${BLUE}Starting TCO Analyzer Implementation...${NC}"
  echo -e "${BLUE}============================================${NC}"
  
  # Check for required dependencies
  check_dependencies
  if [ $? -ne 0 ]; then
    echo -e "\n${RED}Please install the required dependencies and rerun the script.${NC}"
    exit 1
  fi
  
  # Setup project structure
  setup_project
  
  # Create enhanced charts module
  create_charts_module
  
  # Create data processors
  create_data_processors
  
  # Create application controller
  create_application_controller
  
  # Fix HTML canvas elements in index.html
  fix_html_canvas_elements
  
  # Create CSS styles
  create_css_styles
  
  # Verify and include necessary scripts
  verify_scripts
  
  # Create initialization script
  create_initialization_script
  
  echo -e "\n${GREEN}============================================${NC}"
  echo -e "${GREEN}TCO Analyzer Implementation Complete!${NC}"
  echo -e "${GREEN}============================================${NC}"
  
  echo -e "\n${BLUE}Next Steps:${NC}"
  echo -e "1. Verify installation by opening index.html in your browser"
  echo -e "2. Check for any console errors and fix as needed"
  echo -e "3. Test the application workflow from start to finish"
  echo -e "4. Customize the UI design as needed"
  echo -e "5. Add your own data models if required"
  
  echo -e "\n${YELLOW}Note:${NC} All original data models have been integrated and preserved.\n"
}

# Execute main function
main

exit 0
