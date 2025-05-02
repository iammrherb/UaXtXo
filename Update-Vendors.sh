#!/bin/bash

# Enhanced NAC TCO Calculator Update Script
# This script updates the NAC TCO Calculator with FortiNAC and SecureW2 integration
# and enhanced visualizations

echo "Starting NAC TCO Calculator Enhancement Process..."

# Download new vendor logos if they don't exist
echo "Checking for vendor logos..."
if [ ! -f "img/fortinac-logo.png" ]; then
    echo "Downloading FortiNAC logo..."
    curl -s -o img/fortinac-logo.png https://cdn.example.com/images/fortinac-logo.png > /dev/null 2>&1 || \
        echo "Created placeholder for FortiNAC logo - please replace with actual logo"
    
    # Create placeholder if download fails
    if [ ! -f "img/fortinac-logo.png" ]; then
        echo "Creating placeholder for FortiNAC logo..."
        echo "# This is a placeholder file - replace with actual logo" > img/fortinac-logo.png
    fi
fi

if [ ! -f "img/securew2-logo.png" ]; then
    echo "Downloading SecureW2 logo..."
    curl -s -o img/securew2-logo.png https://cdn.example.com/images/securew2-logo.png > /dev/null 2>&1 || \
        echo "Created placeholder for SecureW2 logo - please replace with actual logo"
    
    # Create placeholder if download fails
    if [ ! -f "img/securew2-logo.png" ]; then
        echo "Creating placeholder for SecureW2 logo..."
        echo "# This is a placeholder file - replace with actual logo" > img/securew2-logo.png
    fi
fi

# Update vendor-data.js with new vendors
echo "Updating vendor data with FortiNAC and SecureW2..."
mkdir -p js/vendors
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
  fortinac: {
    name: 'FortiNAC',
    logo: 'img/fortinac-logo.png',
    cloudBased: false,
    description: 'Network access control solution with strong security ecosystem integration',
    small: {
      initialHardware: 68000,
      annualMaintenance: 21000,
      annualLicensing: 36000,
      networkRedesign: 11000,
      implementation: 30000,
      training: 8500,
      annualDowntime: 19,
      fteAllocation: {
        networkAdmin: 0.35,
        securityAdmin: 0.3,
        systemAdmin: 0.2,
        helpDesk: 0.1
      },
      implementationTimeline: {
        planning: 11,
        hardwareDeployment: 9, 
        initialConfiguration: 12,
        testing: 18,
        policyDefinition: 13,
        pilotDeployment: 8,
        fullDeployment: 22,
        postDeploymentTuning: 12
      }
    },
    medium: {
      initialHardware: 135000,
      annualMaintenance: 46000,
      annualLicensing: 92000,
      networkRedesign: 19000,
      implementation: 48000,
      training: 14000,
      annualDowntime: 26,
      fteAllocation: {
        networkAdmin: 0.48,
        securityAdmin: 0.45,
        systemAdmin: 0.25,
        helpDesk: 0.1
      },
      implementationTimeline: {
        planning: 15,
        hardwareDeployment: 12, 
        initialConfiguration: 18,
        testing: 21,
        policyDefinition: 17,
        pilotDeployment: 11,
        fullDeployment: 35,
        postDeploymentTuning: 16
      }
    },
    large: {
      initialHardware: 275000,
      annualMaintenance: 92000,
      annualLicensing: 220000,
      networkRedesign: 38000,
      implementation: 95000,
      training: 24000,
      annualDowntime: 34,
      fteAllocation: {
        networkAdmin: 0.65,
        securityAdmin: 0.55,
        systemAdmin: 0.38,
        helpDesk: 0.1
      },
      implementationTimeline: {
        planning: 22,
        hardwareDeployment: 17, 
        initialConfiguration: 24,
        testing: 28,
        policyDefinition: 22,
        pilotDeployment: 15,
        fullDeployment: 50,
        postDeploymentTuning: 22
      }
    }
  },
  securew2: {
    name: 'SecureW2',
    logo: 'img/securew2-logo.png',
    cloudBased: true,
    description: 'Cloud-based certificate and identity management with NAC capabilities',
    small: {
      initialHardware: 5000,
      annualMaintenance: 8000,
      annualLicensing: 28000,
      networkRedesign: 4000,
      implementation: 8000,
      training: 3000,
      annualDowntime: 6,
      fteAllocation: {
        networkAdmin: 0.15,
        securityAdmin: 0.15,
        systemAdmin: 0.05,
        helpDesk: 0.03
      },
      implementationTimeline: {
        planning: 4,
        cloudAccountSetup: 1, 
        initialConfiguration: 3,
        testing: 4,
        policyDefinition: 4,
        pilotDeployment: 3,
        fullDeployment: 5,
        postDeploymentTuning: 3
      }
    },
    medium: {
      initialHardware: 8000,
      annualMaintenance: 10000,
      annualLicensing: 65000,
      networkRedesign: 6000,
      implementation: 15000,
      training: 5000,
      annualDowntime: 8,
      fteAllocation: {
        networkAdmin: 0.25,
        securityAdmin: 0.2,
        systemAdmin: 0.08,
        helpDesk: 0.05
      },
      implementationTimeline: {
        planning: 6,
        cloudAccountSetup: 1, 
        initialConfiguration: 4,
        testing: 6,
        policyDefinition: 5,
        pilotDeployment: 4,
        fullDeployment: 8,
        postDeploymentTuning: 4
      }
    },
    large: {
      initialHardware: 12000,
      annualMaintenance: 15000,
      annualLicensing: 160000,
      networkRedesign: 10000,
      implementation: 25000,
      training: 10000,
      annualDowntime: 10,
      fteAllocation: {
        networkAdmin: 0.35,
        securityAdmin: 0.3,
        systemAdmin: 0.15,
        helpDesk: 0.12
      },
      implementationTimeline: {
        planning: 9,
        cloudAccountSetup: 1, 
        initialConfiguration: 7,
        testing: 8,
        policyDefinition: 8,
        pilotDeployment: 6,
        fullDeployment: 15,
        postDeploymentTuning: 7
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
    icon: "coins",
    metric: "100% savings"
  },
  {
    title: "Reduced Implementation Time",
    description: "Get up and running 70-85% faster than traditional NAC solutions",
    icon: "rocket",
    metric: "75% faster"
  },
  {
    title: "Lower IT Staffing Requirements",
    description: "Decrease NAC administration overhead by up to 80%",
    icon: "user-cog",
    metric: "$180,000/year"
  },
  {
    title: "Reduced Downtime",
    description: "Minimize business disruption with significantly fewer outages",
    icon: "business-time",
    metric: "85% reduction"
  },
  {
    title: "Automated Updates",
    description: "Eliminate maintenance windows and manual update processes",
    icon: "cloud-upload-alt",
    metric: "Zero downtime updates"
  },
  {
    title: "Faster ROI",
    description: "Achieve return on investment in a fraction of the time",
    icon: "chart-line",
    metric: "0.8 years"
  }
];

// Enhanced migration factor data
window.migrationFactors = {
  cisco: {
    aruba: 0.7,
    forescout: 0.6,
    nps: 0.5,
    fortinac: 0.65,
    securew2: 0.4,
    portnox: 0.3
  },
  aruba: {
    cisco: 0.7,
    forescout: 0.6,
    nps: 0.5,
    fortinac: 0.6,
    securew2: 0.4,
    portnox: 0.3
  },
  forescout: {
    cisco: 0.7,
    aruba: 0.6,
    nps: 0.5,
    fortinac: 0.6,
    securew2: 0.4,
    portnox: 0.3
  },
  nps: {
    cisco: 0.8,
    aruba: 0.7,
    forescout: 0.7,
    fortinac: 0.7,
    securew2: 0.5,
    portnox: 0.3
  },
  fortinac: {
    cisco: 0.7,
    aruba: 0.6,
    forescout: 0.6,
    nps: 0.5,
    securew2: 0.4,
    portnox: 0.3
  },
  securew2: {
    cisco: 0.6,
    aruba: 0.6,
    forescout: 0.6,
    nps: 0.5,
    fortinac: 0.5,
    portnox: 0.2
  },
  portnox: {
    cisco: 0.8,
    aruba: 0.7,
    forescout: 0.7,
    nps: 0.6,
    fortinac: 0.7,
    securew2: 0.3
  }
};
EOL

# Update chart-builder.js with enhanced visualizations
echo "Enhancing chart visualizations..."
mkdir -p js/charts
cat > js/charts/chart-builder.js << 'EOL'
/**
 * Enhanced Chart Builder for creating and updating charts
 * Includes better mobile responsiveness, accessibility, and radar chart for feature comparison
 */

class ChartBuilder {
  constructor() {
    this.charts = {};
    this.chartDefaults = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 12,
            padding: 15,
            usePointStyle: true,
            pointStyle: 'square'
          }
        },
        tooltip: {
          enabled: true,
          mode: 'index',
          intersect: false,
          padding: 10,
          bodySpacing: 5,
          titleFont: {
            size: 14
          },
          bodyFont: {
            size: 13
          },
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += window.formatCurrency(context.parsed.y);
              }
              return label;
            }
          }
        }
      }
    };
    
    this.chartColors = {
      cisco: '#049fd9',      // Cisco blue
      aruba: '#ff8300',      // Aruba orange
      forescout: '#005daa',  // Forescout blue
      nps: '#00a4ef',        // Microsoft blue
      fortinac: '#ee3124',   // FortiNAC red
      securew2: '#8bc53f',   // SecureW2 green
      portnox: '#2bd25b',    // Portnox green
      neutral: '#888888'     // Neutral gray
    };
    
    this.breakdownColors = [
      '#1B67B2', // Primary blue
      '#4D44AB', // Purple
      '#568C1C', // Green
      '#C77F1A', // Orange
      '#B54369', // Pink
      '#1CA43F', // Darker green
      '#5E5E5E', // Dark gray
      '#8884d8'  // Lavender
    ];
    
    this.isMobile = window.innerWidth < 768;
    
    // Listen for window resize to update mobile state
    window.addEventListener('resize', () => {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth < 768;
      
      // If mobile state changed, update charts
      if (wasMobile !== this.isMobile) {
        this.updateAllCharts();
      }
    });
  }
  
  updateAllCharts() {
    Object.values(this.charts).forEach(chart => {
      if (chart && typeof chart.update === 'function') {
        chart.update();
      }
    });
  }
  
  initCharts() {
    this.initTCOComparisonChart();
    this.initCumulativeCostChart();
    this.initBreakdownCharts('cisco', 'portnox');
    this.initFeatureComparisonChart();
    this.initImplementationComparisonChart();
    this.initROIChart();
  }
  
  initTCOComparisonChart() {
    const ctx = document.getElementById('tco-comparison-chart');
    if (!ctx) {
      console.warn('TCO Comparison chart canvas element not found');
      return;
    }
    
    const ctxCanvas = ctx.getContext('2d');
    if (!ctxCanvas) {
      console.warn('Could not get 2D context for TCO Comparison chart');
      return;
    }
    
    // Define chart configuration
    const chartConfig = {
      type: 'bar',
      data: {
        labels: ['Cisco ISE', 'Aruba ClearPass', 'Forescout', 'Microsoft NPS', 'FortiNAC', 'SecureW2', 'Portnox Cloud'],
        datasets: [
          {
            label: 'Initial Costs',
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            stack: 'Stack 0'
          },
          {
            label: 'Migration Costs',
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: 'rgba(255, 159, 64, 0.7)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
            stack: 'Stack 0'
          },
          {
            label: 'Ongoing Costs',
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            stack: 'Stack 0'
          }
        ]
      },
      options: {
        ...this.chartDefaults,
        indexAxis: this.isMobile ? 'y' : 'x', // Horizontal bars on mobile
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false
            },
            ticks: {
              autoSkip: false,
              maxRotation: this.isMobile ? 0 : 45,
              minRotation: 0
            },
            title: {
              display: !this.isMobile,
              text: 'Vendors'
            }
          },
          y: {
            stacked: true,
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
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
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Total Cost of Ownership Comparison',
            font: {
              size: 16
            },
            padding: {
              top: 10,
              bottom: 20
            }
          },
          datalabels: {
            display: false
          }
        }
      }
    };
    
    // Create the chart
    this.charts.tcoComparison = new Chart(ctxCanvas, chartConfig);
  }
  
  updateTCOComparisonChart(results) {
    if (!this.charts.tcoComparison || !results) {
      console.warn('TCO Comparison chart or results not available');
      return;
    }
    
    // Safely get vendors
    const vendors = Object.keys(window.vendorData || {});
    if (!vendors.length) {
      console.warn('No vendor data available');
      return;
    }
    
    const labels = vendors.map(vendor => window.vendorData[vendor].name);
    const initialCostsData = vendors.map(vendor => {
      return results[vendor] ? results[vendor].totalInitialCosts : 0;
    });
    const migrationCostsData = vendors.map(vendor => {
      return results[vendor] ? results[vendor].migrationCost || 0 : 0;
    });
    const ongoingCostsData = vendors.map(vendor => {
      return results[vendor] ? results[vendor].annualCosts * results.yearsToProject : 0;
    });
    
    // Update chart data
    this.charts.tcoComparison.data.labels = labels;
    this.charts.tcoComparison.data.datasets[0].data = initialCostsData;
    this.charts.tcoComparison.data.datasets[1].data = migrationCostsData;
    this.charts.tcoComparison.data.datasets[2].data = ongoingCostsData;
    
    // Update title to include years
    const chartTitle = `Total Cost of Ownership Comparison (${results.yearsToProject} Years)`;
    this.charts.tcoComparison.options.plugins.title.text = chartTitle;
    
    // Update indexAxis based on mobile state
    this.charts.tcoComparison.options.indexAxis = this.isMobile ? 'y' : 'x';
    
    // Update chart
    this.charts.tcoComparison.update();
  }
  
  initCumulativeCostChart() {
    const ctx = document.getElementById('cumulative-cost-chart');
    if (!ctx) {
      console.warn('Cumulative Cost chart canvas element not found');
      return;
    }
    
    const ctxCanvas = ctx.getContext('2d');
    if (!ctxCanvas) {
      console.warn('Could not get 2D context for Cumulative Cost chart');
      return;
    }
    
    // Define chart configuration
    const chartConfig = {
      type: 'line',
      data: {
        labels: ['Initial', 'Year 1', 'Year 2', 'Year 3'],
        datasets: []
      },
      options: {
        ...this.chartDefaults,
        elements: {
          line: {
            tension: 0.1,
            borderWidth: 2
          },
          point: {
            radius: 3,
            hoverRadius: 6
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            title: {
              display: !this.isMobile,
              text: 'Timeline'
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
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
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Cumulative Costs Over Time',
            font: {
              size: 16
            },
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    };
    
    // Create the chart
    this.charts.cumulativeCost = new Chart(ctxCanvas, chartConfig);
  }
  
  updateCumulativeCostChart(results) {
    if (!this.charts.cumulativeCost || !results) {
      console.warn('Cumulative Cost chart or results not available');
      return;
    }
    
    // Safely get vendors
    const vendors = Object.keys(window.vendorData || {});
    if (!vendors.length) {
      console.warn('No vendor data available');
      return;
    }
    
    const yearsToProject = results.yearsToProject || 3;
    const currentVendor = window.uiController ? window.uiController.activeVendor : null;
    
    // Generate labels
    const labels = ['Initial'];
    for (let i = 1; i <= yearsToProject; i++) {
      labels.push(`Year ${i}`);
    }
    
    // Create datasets for each vendor
    const datasets = [];
    
    vendors.forEach(vendor => {
      if (!results[vendor]) return;
      
      const vendorColor = this.chartColors[vendor] || this.chartColors.neutral;
      const isCurrentVendor = vendor === currentVendor;
      const isPortnox = vendor === 'portnox';
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
        borderWidth: (isCurrentVendor || isPortnox) ? 3 : 2,
        pointRadius: (isCurrentVendor || isPortnox) ? 4 : 3,
        pointHoverRadius: 7,
        tension: 0.1,
        // Dashed line for anything except current vendor and Portnox
        borderDash: (!isCurrentVendor && !isPortnox) ? [5, 5] : []
      });
    });
    
    // Update chart data
    this.charts.cumulativeCost.data.labels = labels;
    this.charts.cumulativeCost.data.datasets = datasets;
    
    // Update chart
    this.charts.cumulativeCost.update();
  }
  
  initBreakdownCharts(currentVendor, altVendor) {
    const currentCtx = document.getElementById('current-breakdown-chart');
    const altCtx = document.getElementById('alternative-breakdown-chart');
    
    if (!currentCtx || !altCtx) {
      console.warn('Breakdown chart canvas elements not found');
      return;
    }
    
    const currentCtxCanvas = currentCtx.getContext('2d');
    const altCtxCanvas = altCtx.getContext('2d');
    
    if (!currentCtxCanvas || !altCtxCanvas) {
      console.warn('Could not get 2D context for breakdown charts');
      return;
    }
    
    // Common pie chart options
    const pieOptions = {
      ...this.chartDefaults,
      cutout: '35%', // Make it a doughnut chart for better visibility
      plugins: {
        ...this.chartDefaults.plugins,
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
        },
        datalabels: {
          display: context => {
            // Only show labels for segments that are at least 5% of the total
            const data = context.dataset.data;
            const total = data.reduce((a, b) => a + b, 0);
            return context.dataIndex >= 0 && (data[context.dataIndex] / total) >= 0.05;
          },
          formatter: (value, context) => {
            const data = context.dataset.data;
            const total = data.reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(0) : '0';
            return percentage + '%';
          },
          color: '#fff',
          font: {
            weight: 'bold'
          }
        }
      }
    };
    
    // Labels common to both charts
    const labels = [
      'Hardware', 
      'Network Redesign', 
      'Implementation', 
      'Training', 
      'Maintenance', 
      'Licensing', 
      'Personnel', 
      'Downtime'
    ];
    
    // Create placeholder charts, to be updated with actual data
    this.charts.currentBreakdown = new Chart(currentCtxCanvas, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: [0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: this.breakdownColors,
          borderWidth: 1,
          borderColor: '#ffffff'
        }]
      },
      options: {
        ...pieOptions,
        plugins: {
          ...pieOptions.plugins,
          title: {
            display: true,
            text: window.vendorData[currentVendor]?.name || 'Current Solution',
            font: {
              size: 16
            },
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
    
    this.charts.altBreakdown = new Chart(altCtxCanvas, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: [0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: this.breakdownColors,
          borderWidth: 1,
          borderColor: '#ffffff'
        }]
      },
      options: {
        ...pieOptions,
        plugins: {
          ...pieOptions.plugins,
          title: {
            display: true,
            text: window.vendorData[altVendor]?.name || 'Alternative Solution',
            font: {
              size: 16
            },
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }
  
  updateBreakdownCharts(currentVendor, altVendor) {
    if (!this.charts.currentBreakdown || !this.charts.altBreakdown || !window.calculator || !window.calculator.results) {
      console.warn('Breakdown charts or results not available');
      return;
    }
    
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
    
    // Update chart titles
    this.charts.currentBreakdown.options.plugins.title.text = window.vendorData[currentVendor]?.name || 'Current Solution';
    this.charts.altBreakdown.options.plugins.title.text = window.vendorData[altVendor]?.name || 'Alternative Solution';
    
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
  
  // Add new feature comparison radar chart
  initFeatureComparisonChart() {
    const ctx = document.getElementById('feature-comparison-chart');
    if (!ctx) {
      console.warn('Feature comparison chart canvas element not found');
      return;
    }
    
    const ctxCanvas = ctx.getContext('2d');
    if (!ctxCanvas) {
      console.warn('Could not get 2D context for feature comparison chart');
      return;
    }
    
    // Define feature scores for each vendor (1-5 scale)
    const featureScores = {
      cisco: {
        'Security': 4.5, 
        'Ease of Deployment': 2.5, 
        'Scalability': 4.0, 
        'Cost Efficiency': 2.0, 
        'Visibility': 4.0, 
        'Integration': 4.5
      },
      aruba: {
        'Security': 4.0, 
        'Ease of Deployment': 3.0, 
        'Scalability': 4.0, 
        'Cost Efficiency': 2.5, 
        'Visibility': 4.0, 
        'Integration': 4.0
      },
      forescout: {
        'Security': 4.0, 
        'Ease of Deployment': 2.5, 
        'Scalability': 3.5, 
        'Cost Efficiency': 2.0, 
        'Visibility': 5.0, 
        'Integration': 3.5
      },
      nps: {
        'Security': 3.0, 
        'Ease of Deployment': 3.5, 
        'Scalability': 2.5, 
        'Cost Efficiency': 4.5, 
        'Visibility': 2.0, 
        'Integration': 2.5
      },
      fortinac: {
        'Security': 4.2, 
        'Ease of Deployment': 3.0, 
        'Scalability': 3.8, 
        'Cost Efficiency': 2.5, 
        'Visibility': 4.0, 
        'Integration': 4.3
      },
      securew2: {
        'Security': 4.0, 
        'Ease of Deployment': 4.5, 
        'Scalability': 3.5, 
        'Cost Efficiency': 3.5, 
        'Visibility': 3.0, 
        'Integration': 3.2
      },
      portnox: {
        'Security': 4.2, 
        'Ease of Deployment': 4.8, 
        'Scalability': 4.0, 
        'Cost Efficiency': 4.5, 
        'Visibility': 4.0, 
        'Integration': 4.0
      }
    };
    
    // Get feature names
    const features = Object.keys(featureScores.cisco);
    
    // Initialize datasets
    const datasets = [];
    
    // Only include current vendor and Portnox initially
    const currentVendor = window.uiController ? window.uiController.activeVendor : 'cisco';
    
    // Add current vendor dataset
    if (featureScores[currentVendor]) {
      datasets.push({
        label: window.vendorData[currentVendor]?.name || 'Current Vendor',
        data: features.map(f => featureScores[currentVendor][f]),
        backgroundColor: `${this.chartColors[currentVendor]}40`,
        borderColor: this.chartColors[currentVendor],
        borderWidth: 2,
        pointBackgroundColor: this.chartColors[currentVendor],
        pointRadius: 4
      });
    }
    
    // Add Portnox dataset
    datasets.push({
      label: 'Portnox Cloud',
      data: features.map(f => featureScores.portnox[f]),
      backgroundColor: `${this.chartColors.portnox}40`,
      borderColor: this.chartColors.portnox,
      borderWidth: 2,
      pointBackgroundColor: this.chartColors.portnox,
      pointRadius: 4
    });
    
    // Create chart
    this.charts.featureComparison = new Chart(ctxCanvas, {
      type: 'radar',
      data: {
        labels: features,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              display: true
            },
            suggestedMin: 0,
            suggestedMax: 5,
            ticks: {
              stepSize: 1,
              callback: function(value) {
                return value === 0 ? '' : value;
              }
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'Feature Comparison',
            font: {
              size: 16
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.raw + '/5';
              }
            }
          }
        }
      }
    });
  }
  
  updateFeatureComparisonChart(currentVendor) {
    if (!this.charts.featureComparison) {
      console.warn('Feature comparison chart not available');
      return;
    }
    
    // Define feature scores for each vendor (1-5 scale)
    const featureScores = {
      cisco: {
        'Security': 4.5, 
        'Ease of Deployment': 2.5, 
        'Scalability': 4.0, 
        'Cost Efficiency': 2.0, 
        'Visibility': 4.0, 
        'Integration': 4.5
      },
      aruba: {
        'Security': 4.0, 
        'Ease of Deployment': 3.0, 
        'Scalability': 4.0, 
        'Cost Efficiency': 2.5, 
        'Visibility': 4.0, 
        'Integration': 4.0
      },
      forescout: {
        'Security': 4.0, 
        'Ease of Deployment': 2.5, 
        'Scalability': 3.5, 
        'Cost Efficiency': 2.0, 
        'Visibility': 5.0, 
        'Integration': 3.5
      },
      nps: {
        'Security': 3.0, 
        'Ease of Deployment': 3.5, 
        'Scalability': 2.5, 
        'Cost Efficiency': 4.5, 
        'Visibility': 2.0, 
        'Integration': 2.5
      },
      fortinac: {
        'Security': 4.2, 
        'Ease of Deployment': 3.0, 
        'Scalability': 3.8, 
        'Cost Efficiency': 2.5, 
        'Visibility': 4.0, 
        'Integration': 4.3
      },
      securew2: {
        'Security': 4.0, 
        'Ease of Deployment': 4.5, 
        'Scalability': 3.5, 
        'Cost Efficiency': 3.5, 
        'Visibility': 3.0, 
        'Integration': 3.2
      },
      portnox: {
        'Security': 4.2, 
        'Ease of Deployment': 4.8, 
        'Scalability': 4.0, 
        'Cost Efficiency': 4.5, 
        'Visibility': 4.0, 
        'Integration': 4.0
      }
    };
    
    const features = Object.keys(featureScores.cisco);
    
    // Create dataset for current vendor
    const datasets = [];
    
    if (featureScores[currentVendor]) {
      datasets.push({
        label: window.vendorData[currentVendor]?.name || 'Current Vendor',
        data: features.map(f => featureScores[currentVendor][f]),
        backgroundColor: `${this.chartColors[currentVendor]}40`,
        borderColor: this.chartColors[currentVendor],
        borderWidth: 2,
        pointBackgroundColor: this.chartColors[currentVendor],
        pointRadius: 4
      });
    }
    
    // Add Portnox dataset
    datasets.push({
      label: 'Portnox Cloud',
      data: features.map(f => featureScores.portnox[f]),
      backgroundColor: `${this.chartColors.portnox}40`,
      borderColor: this.chartColors.portnox,
      borderWidth: 2,
      pointBackgroundColor: this.chartColors.portnox,
      pointRadius: 4
    });
    
    // Update chart
    this.charts.featureComparison.data.datasets = datasets;
    this.charts.featureComparison.update();
  }
  
  // New implementation comparison chart
  initImplementationComparisonChart() {
    const ctx = document.getElementById('implementation-comparison-chart');
    if (!ctx) {
      console.warn('Implementation comparison chart canvas element not found');
      return;
    }
    
    const ctxCanvas = ctx.getContext('2d');
    if (!ctxCanvas) {
      console.warn('Could not get 2D context for implementation comparison chart');
      return;
    }
    
    // Get all vendors
    const vendors = Object.keys(window.vendorData || {});
    
    // Get implementation times in days (using medium size as default)
    const implementationTimes = vendors.map(vendor => {
      if (!window.vendorData[vendor] || !window.vendorData[vendor].medium || !window.vendorData[vendor].medium.implementationTimeline) {
        return 0;
      }
      
      const timeline = window.vendorData[vendor].medium.implementationTimeline;
      return Object.values(timeline).reduce((a, b) => a + b, 0);
    });
    
    // Prepare background colors
    const backgroundColors = vendors.map(vendor => this.chartColors[vendor] || this.chartColors.neutral);
    
    // Create chart
    this.charts.implementationComparison = new Chart(ctxCanvas, {
      type: 'bar',
      data: {
        labels: vendors.map(vendor => window.vendorData[vendor]?.name || vendor),
        datasets: [{
          label: 'Implementation Time (Days)',
          data: implementationTimes,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors,
          borderWidth: 1
        }]
      },
      options: {
        ...this.chartDefaults,
        indexAxis: this.isMobile ? 'y' : 'x',
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Days'
            }
          }
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Implementation Time Comparison',
            font: {
              size: 16
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.raw + ' days';
              }
            }
          }
        }
      }
    });
  }
  
  updateImplementationComparisonChart(results) {
    if (!this.charts.implementationComparison) {
      console.warn('Implementation comparison chart not available');
      return;
    }
    
    const currentVendor = window.uiController ? window.uiController.activeVendor : null;
    
    // If we have actual implementation results, use those
    if (results && results.implementationResults) {
      const vendors = Object.keys(results.implementationResults);
      
      const implementationTimes = vendors.map(vendor => {
        return results.implementationResults[vendor] || 0;
      });
      
      const backgroundColors = vendors.map(vendor => {
        const baseColor = this.chartColors[vendor] || this.chartColors.neutral;
        return vendor === currentVendor ? baseColor : `${baseColor}80`;
      });
      
      this.charts.implementationComparison.data.labels = vendors.map(vendor => window.vendorData[vendor]?.name || vendor);
      this.charts.implementationComparison.data.datasets[0].data = implementationTimes;
      this.charts.implementationComparison.data.datasets[0].backgroundColor = backgroundColors;
      this.charts.implementationComparison.data.datasets[0].borderColor = backgroundColors;
    } else {
      // Use default implementation times from vendor data
      const vendors = Object.keys(window.vendorData || {});
      
      const orgSize = document.getElementById('organization-size')?.value || 'medium';
      
      // Get implementation times in days
      const implementationTimes = vendors.map(vendor => {
        if (!window.vendorData[vendor] || !window.vendorData[vendor][orgSize] || !window.vendorData[vendor][orgSize].implementationTimeline) {
          return 0;
        }
        
        const timeline = window.vendorData[vendor][orgSize].implementationTimeline;
        return Object.values(timeline).reduce((a, b) => a + b, 0);
      });
      
      // Prepare background colors
      const backgroundColors = vendors.map(vendor => {
        const baseColor = this.chartColors[vendor] || this.chartColors.neutral;
        return vendor === currentVendor ? baseColor : `${baseColor}80`;
      });
      
      this.charts.implementationComparison.data.labels = vendors.map(vendor => window.vendorData[vendor]?.name || vendor);
      this.charts.implementationComparison.data.datasets[0].data = implementationTimes;
      this.charts.implementationComparison.data.datasets[0].backgroundColor = backgroundColors;
      this.charts.implementationComparison.data.datasets[0].borderColor = backgroundColors;
    }
    
    // Update indexAxis based on mobile state
    this.charts.implementationComparison.options.indexAxis = this.isMobile ? 'y' : 'x';
    
    // Update chart
    this.charts.implementationComparison.update();
  }
  
  // New ROI chart
  initROIChart() {
    const ctx = document.getElementById('roi-chart');
    if (!ctx) {
      console.warn('ROI chart canvas element not found');
      return;
    }
    
    const ctxCanvas = ctx.getContext('2d');
    if (!ctxCanvas) {
      console.warn('Could not get 2D context for ROI chart');
      return;
    }
    
    // Initialize with empty data
    this.charts.roi = new Chart(ctxCanvas, {
      type: 'line',
      data: {
        labels: ['Initial', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
        datasets: [
          {
            label: 'Status Quo Costs',
            data: [],
            borderColor: this.chartColors.neutral,
            backgroundColor: `${this.chartColors.neutral}20`,
            borderWidth: 2,
            fill: true
          },
          {
            label: 'Portnox Costs',
            data: [],
            borderColor: this.chartColors.portnox,
            backgroundColor: `${this.chartColors.portnox}20`,
            borderWidth: 2,
            fill: true
          },
          {
            label: 'Cumulative Savings',
            data: [],
            borderColor: '#28a745',
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        ...this.chartDefaults,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cumulative Cost ($)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          },
          y1: {
            beginAtZero: true,
            position: 'right',
            grid: {
              drawOnChartArea: false
            },
            title: {
              display: true,
              text: 'Cumulative Savings ($)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        },
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          ...this.chartDefaults.plugins,
          title: {
            display: true,
            text: 'Return on Investment Analysis',
            font: {
              size: 16
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += '$' + context.parsed.y.toLocaleString();
                }
                return label;
              }
            }
          }
        }
      }
    });
  }
  
  updateROIChart(results) {
    if (!this.charts.roi || !results) {
      console.warn('ROI chart or results not available');
      return;
    }
    
    const currentVendor = window.uiController ? window.uiController.activeVendor : null;
    
    if (!currentVendor || !results[currentVendor] || !results['portnox']) {
      console.warn('Missing data for ROI chart');
      return;
    }
    
    // Project for 5 years
    const years = 5;
    
    // Calculate cumulative costs for current vendor and Portnox
    const currentVendorData = [];
    const portnoxData = [];
    const savingsData = [];
    
    // Calculate breakeven point
    const currentInitialCost = results[currentVendor].totalInitialCosts;
    const portnoxInitialCost = results['portnox'].totalInitialCosts + results['portnox'].migrationCost;
    const currentAnnualCost = results[currentVendor].annualCosts;
    const portnoxAnnualCost = results['portnox'].annualCosts;
    
    // Initial costs
    currentVendorData.push(currentInitialCost);
    portnoxData.push(portnoxInitialCost);
    savingsData.push(0);
    
    // Project costs and savings
    let cumulativeSavings = currentInitialCost - portnoxInitialCost;
    
    for (let i = 1; i <= years; i++) {
      const currentTotal = currentInitialCost + (currentAnnualCost * i);
      const portnoxTotal = portnoxInitialCost + (portnoxAnnualCost * i);
      
      cumulativeSavings += (currentAnnualCost - portnoxAnnualCost);
      
      currentVendorData.push(currentTotal);
      portnoxData.push(portnoxTotal);
      savingsData.push(cumulativeSavings);
    }
    
    // Update chart data
    this.charts.roi.data.datasets[0].data = currentVendorData;
    this.charts.roi.data.datasets[0].label = `${window.vendorData[currentVendor]?.name || 'Current'} Costs`;
    this.charts.roi.data.datasets[0].borderColor = this.chartColors[currentVendor] || this.chartColors.neutral;
    this.charts.roi.data.datasets[0].backgroundColor = `${this.chartColors[currentVendor] || this.chartColors.neutral}20`;
    
    this.charts.roi.data.datasets[1].data = portnoxData;
    this.charts.roi.data.datasets[2].data = savingsData;
    
    // Calculate breakeven point if savings exist
    if (cumulativeSavings > 0) {
      const yearlySavings = currentAnnualCost - portnoxAnnualCost;
      const initialDiff = portnoxInitialCost - currentInitialCost;
      
      // Only calculate if there are annual savings
      if (yearlySavings > 0) {
        const breakEvenYears = initialDiff > 0 ? initialDiff / yearlySavings : 0;
        
        // Update chart title with breakeven point if relevant
        if (breakEvenYears > 0) {
          const breakEvenText = breakEvenYears < 1 ? 
            `${Math.round(breakEvenYears * 12)} months` : 
            `${breakEvenYears.toFixed(1)} years`;
          
          this.charts.roi.options.plugins.title.text = `Return on Investment Analysis (Breakeven: ${breakEvenText})`;
        } else {
          this.charts.roi.options.plugins.title.text = 'Return on Investment Analysis (Immediate Savings)';
        }
      } else {
        this.charts.roi.options.plugins.title.text = 'Return on Investment Analysis';
      }
    } else {
      this.charts.roi.options.plugins.title.text = 'Return on Investment Analysis';
    }
    
    // Update chart
    this.charts.roi.update();
  }
}
EOL

# Update the calculator.js to handle new vendors
echo "Updating calculator.js to support the new vendors..."
mkdir -p js/components
cat > js/components/calculator.js << 'EOL'
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
        const migrationFactor = this.getMigrationFactor(currentVendor, vendor);
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
EOL

# Update UI Controller to support new vendors
echo "Updating UI Controller to support new vendors..."
cat > js/components/ui-controller.js << 'EOL'
/**
 * Enhanced UI Controller for managing interface elements and user interactions
 * Updated to support FortiNAC and SecureW2
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
      
      // Update feature comparison chart if available
      if (typeof window.chartBuilder.updateFeatureComparisonChart === 'function') {
        window.chartBuilder.updateFeatureComparisonChart(vendor);
      }
      
      // Update implementation comparison chart if available
      if (typeof window.chartBuilder.updateImplementationComparisonChart === 'function') {
        window.chartBuilder.updateImplementationComparisonChart(window.calculator.results);
      }
      
      // Update ROI chart if available
      if (typeof window.chartBuilder.updateROIChart === 'function') {
        window.chartBuilder.updateROIChart(window.calculator.results);
      }
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
    
    // Update benefit cards with actual icons
    if (window.portnoxBenefits) {
      const benefitsGrid = document.querySelector('.benefits-grid');
      if (benefitsGrid) {
        benefitsGrid.innerHTML = '';
        
        window.portnoxBenefits.forEach(benefit => {
          const benefitCard = document.createElement('div');
          benefitCard.className = 'benefit-card';
          
          benefitCard.innerHTML = `
            <div class="benefit-icon"><i class="fas fa-${benefit.icon}"></i></div>
            <div class="benefit-content">
              <h5>${benefit.title}</h5>
              <p>${benefit.description}</p>
              <span class="benefit-metric">${benefit.metric}</span>
            </div>
          `;
          
          benefitsGrid.appendChild(benefitCard);
        });
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
    
    // Add detailed phase breakdown if available
    if (window.vendorData[currentVendor] && window.vendorData['portnox']) {
      const orgSize = results.orgSize || 'medium';
      
      if (window.vendorData[currentVendor][orgSize] && 
          window.vendorData[currentVendor][orgSize].implementationTimeline &&
          window.vendorData['portnox'][orgSize].implementationTimeline) {
        
        const currentTimeline = window.vendorData[currentVendor][orgSize].implementationTimeline;
        const portnoxTimeline = window.vendorData['portnox'][orgSize].implementationTimeline;
        
        // Get all unique phases
        const allPhases = new Set();
        Object.keys(currentTimeline).forEach(phase => allPhases.add(phase));
        Object.keys(portnoxTimeline).forEach(phase => allPhases.add(phase));
        
        // Create complexity multiplier for accurate timing
        const currentComplexity = window.calculateComplexityMultiplier(currentVendor, window.vendorData[currentVendor].cloudBased);
        const portnoxComplexity = window.calculateComplexityMultiplier('portnox', true);
        
        // Add phase rows
        Array.from(allPhases).forEach(phase => {
          const phaseRow = document.createElement('tr');
          
          // Format phase name
          const phaseName = phase
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
          
          // Get phase duration
          const currentPhaseDays = (currentTimeline[phase] || 0) * currentComplexity;
          const portnoxPhaseDays = (portnoxTimeline[phase] || 0) * portnoxComplexity;
          
          // Calculate savings
          const phaseTimeSavings = currentPhaseDays - portnoxPhaseDays;
          const phaseSavingsPercentage = currentPhaseDays > 0 ? (phaseTimeSavings / currentPhaseDays) * 100 : 0;
          
          // Add classes for savings
          const phaseSavingsClass = phaseTimeSavings > 0 ? 'positive-savings' : (phaseTimeSavings < 0 ? 'negative-savings' : '');
          
          // Populate cells
          phaseRow.innerHTML = `
            <td class="phase-name">— ${phaseName}</td>
            <td>${currentPhaseDays.toFixed(1)} days</td>
            <td>${portnoxPhaseDays.toFixed(1)} days</td>
            <td class="${phaseSavingsClass}">${phaseTimeSavings.toFixed(1)} days (${phaseSavingsPercentage.toFixed(1)}%)</td>
          `;
          
          // Add to table
          tableBody.appendChild(phaseRow);
        });
      }
    }
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

# Add CSS updates for new features
echo "Adding CSS updates for new features..."
cat >> css/styles.css << 'EOL'
/* Enhanced styles for NAC TCO Calculator */

/* Feature comparison chart container */
.feature-legend {
    margin-top: 20px;
    text-align: center;
}

.feature-note {
    font-size: 0.85rem;
    color: var(--text-secondary);
    font-style: italic;
}

/* Migration strategy phases */
.migration-phases {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    margin-top: var(--spacing-lg);
}

.phase {
    display: flex;
    gap: var(--spacing-md);
    background-color: var(--bg-white);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    border-left: 4px solid var(--primary-color);
}

.phase-icon {
    font-size: 1.75rem;
    color: var(--primary-color);
    min-width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.phase-content {
    flex: 1;
}

.phase-content h4 {
    margin-bottom: var(--spacing-xs);
    color: var(--text-primary);
    font-size: 1.1rem;
}

.phase-content p {
    color: var(--text-secondary);
    margin-bottom: 0;
    font-size: 0.95rem;
}

/* Phase rows in implementation table */
.phase-name {
    font-style: italic;
    color: var(--text-secondary);
}

/* Cloud vs On-Premises comparison table */
.comparison-table-container {
    overflow-x: auto;
}

.comparison-table-container .data-table {
    min-width: 100%;
    border-collapse: collapse;
}

.comparison-table-container .data-table th,
.comparison-table-container .data-table td {
    padding: var(--spacing-md);
    text-align: left;
    border-bottom: 1px solid var(--border-color);
}

.comparison-table-container .data-table th {
    background-color: var(--bg-light);
    font-weight: 600;
}

.comparison-table-container .data-table th:nth-child(3) {
    color: var(--accent-color);
}

.comparison-table-container .data-table tr td:nth-child(3) {
    color: var(--accent-dark);
    font-weight: 500;
}

@media (max-width: 768px) {
    .phase {
        flex-direction: column;
        gap: var(--spacing-sm);
        align-items: flex-start;
    }
    
    .migration-phases {
        gap: var(--spacing-md);
    }
}
EOL

# Update the index.html file to add the new vendor cards and chart elements
echo "Updating index.html to display new vendors and charts..."
cat > index.html.new << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="NAC Solution TCO Calculator - Compare costs between different Network Access Control solutions">
    <title>NAC Solution TCO Calculator</title>
    <link rel="stylesheet" href="libs/fontawesome/css/all.min.css">
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
                <a href="sensitivity.html" class="btn btn-outline">Sensitivity Analysis</a>
            </div>
        </header>
        
        <div class="calculator-container">
            <div class="sidebar" aria-label="Calculator Inputs">
                <div class="vendor-selection-card">
                    <h3>Current NAC Solution</h3>
                    <div class="vendor-options" role="radiogroup" aria-label="Select your current NAC vendor">
                        <div class="vendor-card" data-vendor="cisco" role="radio" aria-checked="false" tabindex="0">
                            <img src="img/cisco-logo.png" alt="Cisco">
                            <span>Cisco ISE</span>
                        </div>
                        <div class="vendor-card" data-vendor="aruba" role="radio" aria-checked="false" tabindex="0">
                            <img src="img/aruba-logo.png" alt="Aruba">
                            <span>Aruba ClearPass</span>
                        </div>
                        <div class="vendor-card" data-vendor="forescout" role="radio" aria-checked="false" tabindex="0">
                            <img src="img/forescout-logo.png" alt="Forescout">
                            <span>Forescout</span>
                        </div>
                        <div class="vendor-card" data-vendor="nps" role="radio" aria-checked="false" tabindex="0">
                            <img src="img/microsoft-logo.png" alt="Microsoft">
                            <span>Microsoft NPS</span>
                        </div>
                        <div class="vendor-card" data-vendor="fortinac" role="radio" aria-checked="false" tabindex="0">
                            <img src="img/fortinac-logo.png" alt="FortiNAC">
                            <span>FortiNAC</span>
                        </div>
                        <div class="vendor-card" data-vendor="securew2" role="radio" aria-checked="false" tabindex="0">
                            <img src="img/securew2-logo.png" alt="SecureW2">
                            <span>SecureW2</span>
                        </div>
                    </div>
                </div>
                
                <div class="organization-inputs">
                    <h3>Organization Details</h3>
                    <form id="calculator-form">
                        <div class="input-group">
                            <label for="organization-size">Organization Size</label>
                            <select id="organization-size" aria-describedby="org-size-tip">
                                <option value="small">Small (500-1000 endpoints)</option>
                                <option value="medium" selected>Medium (1000-5000 endpoints)</option>
                                <option value="large">Large (5000+ endpoints)</option>
                            </select>
                            <div id="org-size-tip" class="tooltip">
                                <i class="fas fa-info-circle"></i>
                                <span class="tooltip-text">Select the size that best matches your organization's scale</span>
                            </div>
                        </div>
                        <div class="input-group">
                            <label for="device-count">Number of Devices</label>
                            <input type="number" id="device-count" value="2500" min="100" aria-describedby="device-count-tip">
                            <div id="device-count-tip" class="tooltip">
                                <i class="fas fa-info-circle"></i>
                                <span class="tooltip-text">The total number of devices that will be managed by your NAC solution</span>
                            </div>
                        </div>
                        <div class="input-group">
                            <label for="years-to-project">Years to Project</label>
                            <input type="number" id="years-to-project" value="3" min="1" max="10" aria-describedby="years-tip">
                            <div id="years-tip" class="tooltip">
                                <i class="fas fa-info-circle"></i>
                                <span class="tooltip-text">The number of years to project costs into the future</span>
                            </div>
                        </div>
                        
                        <div class="advanced-options-toggle">
                            <button type="button" class="btn btn-text" aria-expanded="false" aria-controls="advanced-options-panel">
                                Advanced Options <i class="fas fa-angle-down"></i>
                            </button>
                        </div>
                        
                        <div id="advanced-options-panel" class="advanced-options-panel hidden" aria-labelledby="advanced-options-heading">
                            <h4 id="advanced-options-heading" class="sr-only">Advanced Options</h4>
                            
                            <div class="input-group checkbox-group">
                                <input type="checkbox" id="multiple-locations" aria-describedby="locations-tip">
                                <label for="multiple-locations">Multiple Locations</label>
                                <div id="locations-tip" class="tooltip">
                                    <i class="fas fa-info-circle"></i>
                                    <span class="tooltip-text">Check if your NAC solution needs to support multiple physical locations</span>
                                </div>
                            </div>
                            
                            <div class="input-group">
                                <label for="location-count">Number of Locations</label>
                                <input type="number" id="location-count" value="3" min="1">
                            </div>
                            
                            <div class="input-group checkbox-group">
                                <input type="checkbox" id="complex-authentication" aria-describedby="auth-tip">
                                <label for="complex-authentication">Complex Authentication</label>
                                <div id="auth-tip" class="tooltip">
                                    <i class="fas fa-info-circle"></i>
                                    <span class="tooltip-text">Check if you require multi-factor authentication or complex authentication chains</span>
                                </div>
                            </div>
                            
                            <div class="input-group checkbox-group">
                                <input type="checkbox" id="legacy-devices" aria-describedby="legacy-tip">
                                <label for="legacy-devices">Legacy Devices</label>
                                <div id="legacy-tip" class="tooltip">
                                    <i class="fas fa-info-circle"></i>
                                    <span class="tooltip-text">Check if your environment includes legacy devices that require special handling</span>
                                </div>
                            </div>
                            
                            <div class="input-group">
                                <label for="legacy-percentage">Legacy Device Percentage</label>
                                <div class="range-container">
                                    <input type="range" id="legacy-percentage" min="0" max="100" value="30" aria-valuemin="0" aria-valuemax="100" aria-valuenow="30">
                                    <span id="legacy-percentage-value">30%</span>
                                </div>
                            </div>
                            
                            <div class="input-group checkbox-group">
                                <input type="checkbox" id="cloud-integration" aria-describedby="cloud-tip">
                                <label for="cloud-integration">Cloud Integration</label>
                                <div id="cloud-tip" class="tooltip">
                                    <i class="fas fa-info-circle"></i>
                                    <span class="tooltip-text">Check if you require integration with cloud services</span>
                                </div>
                            </div>
                            
                            <div class="input-group checkbox-group">
                                <input type="checkbox" id="custom-policies" aria-describedby="policies-tip">
                                <label for="custom-policies">Custom Policies</label>
                                <div id="policies-tip" class="tooltip">
                                    <i class="fas fa-info-circle"></i>
                                    <span class="tooltip-text">Check if you need to implement custom security policies</span>
                                </div>
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
                        
                        <button id="calculate-btn" type="button" class="btn btn-primary">
                            <i class="fas fa-calculator"></i> Calculate TCO
                        </button>
                    </form>
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
            
            <div id="results-container" class="results-container" aria-label="Calculation Results" tabindex="-1">
                <div class="tabs" role="tablist" aria-label="Results Tabs">
                    <button class="tab-button active" id="tab-comparison" role="tab" aria-selected="true" aria-controls="comparison-tab" data-tab="comparison-tab" tabindex="0">Comparison</button>
                    <button class="tab-button" id="tab-details" role="tab" aria-selected="false" aria-controls="details-tab" data-tab="details-tab" tabindex="-1">Details</button>
                    <button class="tab-button" id="tab-implementation" role="tab" aria-selected="false" aria-controls="implementation-tab" data-tab="implementation-tab" tabindex="-1">Implementation</button>
                    <button class="tab-button" id="tab-features" role="tab" aria-selected="false" aria-controls="features-tab" data-tab="features-tab" tabindex="-1">Features</button>
                    <button class="tab-button" id="tab-roi" role="tab" aria-selected="false" aria-controls="roi-tab" data-tab="roi-tab" tabindex="-1">ROI</button>
                </div>
                
                <div class="tab-content">
                    <div id="message-container"></div>
                    <div class="export-options">
                        <button id="export-csv-btn" class="btn btn-outline"><i class="fas fa-file-csv"></i> Export CSV</button>
                        <button id="export-pdf-btn" class="btn btn-outline"><i class="fas fa-file-pdf"></i> Export PDF</button>
                    </div>
                    
                    <div id="comparison-tab" class="tab-pane active" role="tabpanel" aria-labelledby="tab-comparison">
                        <div class="results-grid">
                            <div class="result-card">
                                <h3>Total Cost of Ownership</h3>
                                <div class="chart-container" aria-label="TCO Comparison Chart">
                                    <canvas id="tco-comparison-chart"></canvas>
                                </div>
                            </div>
                            <div class="result-card">
                                <h3>Cumulative Costs Over Time</h3>
                                <div class="chart-container" aria-label="Cumulative Cost Chart">
                                    <canvas id="cumulative-cost-chart"></canvas>
                                </div>
                            </div>
                        </div>
                        
                        <div class="result-card">
                            <h3>TCO Summary</h3>
                            <div class="table-container">
                                <table class="data-table" id="tco-summary-table">
                                    <caption class="sr-only">TCO Summary by Vendor</caption>
                                    <thead>
                                        <tr>
                                            <th scope="col">Vendor</th>
                                            <th scope="col">Initial Costs</th>
                                            <th scope="col">Annual Costs</th>
                                            <th scope="col">Migration Costs</th>
                                            <th scope="col">Total TCO</th>
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
                                    <div class="progress-bar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
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
                                    <div class="progress-bar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
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
                                    <!-- Populated dynamically by JavaScript -->
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="details-tab" class="tab-pane" role="tabpanel" aria-labelledby="tab-details">
                        <div class="sub-tabs" role="tablist" aria-label="Cost Details Tabs">
                            <button class="sub-tab-button active" id="subtab-cost-breakdown" role="tab" aria-selected="true" aria-controls="cost-breakdown" data-subtab="cost-breakdown" tabindex="0">Cost Breakdown</button>
                            <button class="sub-tab-button" id="subtab-annual-costs" role="tab" aria-selected="false" aria-controls="annual-costs" data-subtab="annual-costs" tabindex="-1">Annual Costs</button>
                        </div>
                        
                        <div id="cost-breakdown" class="sub-tab-pane active" role="tabpanel" aria-labelledby="subtab-cost-breakdown">
                            <div class="results-grid">
                                <div class="result-card">
                                    <h3>Current Solution Cost Breakdown</h3>
                                    <div class="chart-container" aria-label="Current Solution Cost Breakdown Chart">
                                        <canvas id="current-breakdown-chart"></canvas>
                                    </div>
                                </div>
                                <div class="result-card">
                                    <h3>Portnox Cloud Cost Breakdown</h3>
                                    <div class="chart-container" aria-label="Portnox Cloud Cost Breakdown Chart">
                                        <canvas id="alternative-breakdown-chart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div id="annual-costs" class="sub-tab-pane" role="tabpanel" aria-labelledby="subtab-annual-costs">
                            <div class="result-card">
                                <h3>Annual Cost Comparison</h3>
                                <div class="table-container">
                                    <table class="data-table">
                                        <caption class="sr-only">Annual Cost Comparison Between Current Solution and Portnox Cloud</caption>
                                        <thead>
                                            <tr>
                                                <th scope="col">Cost Category</th>
                                                <th scope="col">Current Solution</th>
                                                <th scope="col">Portnox Cloud</th>
                                                <th scope="col">Savings</th>
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
                    
                    <div id="implementation-tab" class="tab-pane" role="tabpanel" aria-labelledby="tab-implementation">
                        <div class="result-card">
                            <h3>Implementation Timeline Comparison</h3>
                            <div class="chart-container" aria-label="Implementation Comparison Chart">
                                <canvas id="implementation-comparison-chart"></canvas>
                            </div>
                        </div>
                        
                        <div class="result-card">
                            <h3>Implementation Breakdown</h3>
                            <div class="table-container">
                                <table class="data-table">
                                    <caption class="sr-only">Implementation Timeline Comparison Between Current Solution and Portnox Cloud</caption>
                                    <thead>
                                        <tr>
                                            <th scope="col">Phase</th>
                                            <th scope="col">Current Solution (days)</th>
                                            <th scope="col">Portnox Cloud (days)</th>
                                            <th scope="col">Time Savings</th>
                                        </tr>
                                    </thead>
                                    <tbody id="implementation-table-body">
                                        <!-- Populated by JavaScript -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <div id="features-tab" class="tab-pane" role="tabpanel" aria-labelledby="tab-features">
                        <div class="result-card">
                            <h3>Feature Comparison</h3>
                            <div class="chart-container" aria-label="Feature Comparison Chart" style="height: 400px;">
                                <canvas id="feature-comparison-chart"></canvas>
                            </div>
                            <div class="feature-legend">
                                <p class="feature-note">Feature scores based on analysis of vendor documentation, product reviews, and customer feedback.</p>
                            </div>
                        </div>
                        
                        <div class="result-card">
                            <h3>Cloud vs On-Premises Comparison</h3>
                            <div class="comparison-table-container">
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>Feature</th>
                                            <th>On-Premises NAC</th>
                                            <th>Cloud-Native NAC</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Infrastructure Costs</td>
                                            <td>High (servers, appliances, etc.)</td>
                                            <td>Minimal to None</td>
                                        </tr>
                                        <tr>
                                            <td>Deployment Time</td>
                                            <td>Weeks to Months</td>
                                            <td>Days to Weeks</td>
                                        </tr>
                                        <tr>
                                            <td>Scalability</td>
                                            <td>Requires Additional Hardware</td>
                                            <td>Elastic Scaling</td>
                                        </tr>
                                        <tr>
                                            <td>Updates & Maintenance</td>
                                            <td>Manual, Scheduled Downtime</td>
                                            <td>Automatic, Zero Downtime</td>
                                        </tr>
                                        <tr>
                                            <td>Remote Access</td>
                                            <td>Requires VPN or Complex Setup</td>
                                            <td>Native, Secure Cloud Access</td>
                                        </tr>
                                        <tr>
                                            <td>IT Overhead</td>
                                            <td>High (0.5-2.0 FTE)</td>
                                            <td>Low (0.1-0.5 FTE)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <div id="roi-tab" class="tab-pane" role="tabpanel" aria-labelledby="tab-roi">
                        <div class="result-card">
                            <h3>Return on Investment Analysis</h3>
                            <div class="chart-container" aria-label="ROI Analysis Chart" style="height: 400px;">
                                <canvas id="roi-chart"></canvas>
                            </div>
                        </div>
                        
                        <div class="result-card">
                            <h3>Migration Strategy</h3>
                            <div class="migration-phases">
                                <div class="phase">
                                    <div class="phase-icon"><i class="fas fa-search"></i></div>
                                    <div class="phase-content">
                                        <h4>Assessment & Planning</h4>
                                        <p>Define scope, evaluate current infrastructure, set project timeline, and identify stakeholders.</p>
                                    </div>
                                </div>
                                <div class="phase">
                                    <div class="phase-icon"><i class="fas fa-project-diagram"></i></div>
                                    <div class="phase-content">
                                        <h4>Pilot Deployment</h4>
                                        <p>Implement Portnox Cloud in a controlled environment to validate deployment, test policies, and train administrators.</p>
                                    </div>
                                </div>
                                <div class="phase">
                                    <div class="phase-icon"><i class="fas fa-users"></i></div>
                                    <div class="phase-content">
                                        <h4>Phased Rollout</h4>
                                        <p>Deploy to non-critical segments first, then gradually expand to more sensitive areas based on pilot learnings.</p>
                                    </div>
                                </div>
                                <div class="phase">
                                    <div class="phase-icon"><i class="fas fa-chart-line"></i></div>
                                    <div class="phase-content">
                                        <h4>Full Adoption & Optimization</h4>
                                        <p>Complete organization-wide deployment, refine policies, and optimize configurations for maximum effectiveness.</p>
                                    </div>
                                </div>
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
    <script src="libs/charts/chart.min.js"></script>
    
    <!-- Core JavaScript -->
    <script src="js/utils/helpers.js"></script>
    <script src="js/managers/dom-cache.js"></script>
    <script src="js/managers/tab-manager.js"></script>
    <script src="js/managers/validation-manager.js"></script>
    <script src="js/managers/notification-manager.js"></script>
    <script src="js/managers/loading-manager.js"></script>
    
    <!-- Application Components -->
    <script src="js/vendors/vendor-data.js"></script>
    <script src="js/charts/chart-builder.js"></script>
    <script src="js/components/calculator.js"></script>
    <script src="js/components/ui-controller.js"></script>
    
    <!-- Main Entry Point -->
    <script src="js/main.js"></script>
</body>
</html>
# Move the new index.html file into place
mv index.html.new index.html

echo "NAC TCO Calculator Enhancement Script completed successfully!"
echo "The script has updated the calculator with FortiNAC and SecureW2 support,"
echo "as well as added new visualizations like Feature Radar Chart and ROI Analysis."
echo ""
echo "NOTE: You'll need to replace the FortiNAC and SecureW2 logo placeholders with actual logo files."

# Make the script executable
chmod +x Update-Vendors.sh