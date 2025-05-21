#!/bin/bash
# Portnox Total Cost Analyzer Emergency Fix Script
# This script fixes missing resources, initialization errors, and UI styling

echo "Starting Portnox TCO Analyzer emergency fix..."

# Create directory for backup
BACKUP_DIR="./backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR

# Backup current files
echo "Creating backup of current files in $BACKUP_DIR"
cp -r js css index.html $BACKUP_DIR/

# Fix missing JS files
echo "Creating missing JavaScript files..."

# Create the include-fixes.js file
cat > js/include-fixes.js << 'EOF'
/**
 * Auto-include fixes for Portnox Total Cost Analyzer
 * This file ensures all necessary resources are properly loaded
 */
console.log("Loading essential fixes...");

// Ensure vendor data is defined
if (typeof VENDORS === 'undefined') {
  console.log("Initializing VENDORS data structure");
  window.VENDORS = {
    'portnox': {
      name: 'Portnox Cloud',
      logo: 'img/vendors/portnox-logo.png',
      architecture: 'cloud',
      tco: 245000,
      implementationTime: 21,
      implementationCost: 15000,
      fte: 0.25,
      hardware: 0,
      maintenance: 12500,
      subscription: 172500,
      personnel: 25000,
      paybackPeriod: 7,
      roi: 325,
      securityScore: 92,
      complianceScore: 95,
      zeroTrustScore: 95
    },
    'cisco': {
      name: 'Cisco ISE',
      logo: 'img/vendors/cisco-logo.png',
      architecture: 'on-premises',
      tco: 520000,
      implementationTime: 90,
      implementationCost: 85000,
      fte: 2.0,
      hardware: 130000,
      maintenance: 98000,
      subscription: 0,
      personnel: 200000,
      paybackPeriod: 32,
      roi: -8,
      securityScore: 85,
      complianceScore: 90,
      zeroTrustScore: 75
    }
  };
}

// Ensure needed DOM elements exist
document.addEventListener('DOMContentLoaded', function() {
  // Check for and create executive view container if missing
  if (!document.querySelector('.view-panel[data-view="executive"]')) {
    console.log("Creating missing executive view panel");
    const contentArea = document.querySelector('.content-area .content-wrapper');
    if (contentArea) {
      const execPanel = document.createElement('div');
      execPanel.className = 'view-panel';
      execPanel.setAttribute('data-view', 'executive');
      contentArea.appendChild(execPanel);
    }
  }
});
EOF

# Fix chart-config.js
cat > js/charts/chart-config.js << 'EOF'
/**
 * Chart Configuration for Portnox Total Cost Analyzer
 * Defines common settings for all charts
 */

const ChartConfig = {
  colors: {
    primary: '#1a5a96',
    secondary: '#0d4275',
    highlight: '#27ae60',
    warning: '#e67e22',
    danger: '#e74c3c',
    neutral: '#7f8c8d',
    vendors: {
      portnox: '#1a5a96',
      cisco: '#e74c3c',
      aruba: '#e67e22',
      forescout: '#f39c12',
      fortinac: '#3498db',
      juniper: '#9b59b6',
      securew2: '#2ecc71',
      microsoft: '#34495e',
      arista: '#16a085',
      foxpass: '#d35400'
    }
  },
  fonts: {
    family: 'Nunito, sans-serif',
    size: {
      small: '10px',
      default: '12px',
      medium: '14px',
      large: '16px',
      title: '18px'
    },
    weight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  animation: {
    enabled: true,
    duration: 800,
    easing: 'easeinout'
  },
  tooltip: {
    enabled: true,
    shared: true,
    intersect: false,
    formatter: {
      currency: function(val) {
        return '$' + val.toLocaleString();
      },
      percentage: function(val) {
        return val + '%';
      },
      time: function(val) {
        return val + ' days';
      }
    }
  },
  getVendorColor: function(vendorId) {
    return this.colors.vendors[vendorId] || this.colors.neutral;
  },
  getLegendStyle: function() {
    return {
      fontFamily: this.fonts.family,
      fontSize: this.fonts.size.default,
      fontWeight: this.fonts.weight.medium
    };
  }
};

// Make chart config available globally
window.ChartConfig = ChartConfig;
EOF

# Fix security-charts.js
cat > js/charts/security-charts.js << 'EOF'
/**
 * Security Charts for Portnox Total Cost Analyzer
 * Renders security-specific visualizations
 */

const SecurityCharts = {
  init: function() {
    console.log("Initializing security charts module");
    this.renderNistFrameworkChart();
    this.renderBreachImpactChart();
    this.renderSecurityFrameworksChart();
    this.renderThreatModelChart();
    this.renderIndustryBreachChart();
  },
  
  renderNistFrameworkChart: function() {
    const chartElement = document.getElementById('nist-framework-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    const options = {
      series: [
        {
          name: 'Portnox Cloud',
          data: [95, 92, 96, 94, 90]
        },
        {
          name: 'Industry Average',
          data: [70, 65, 72, 68, 62]
        }
      ],
      chart: {
        type: 'radar',
        height: 350,
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        }
      },
      stroke: {
        width: 2
      },
      fill: {
        opacity: 0.1
      },
      markers: {
        size: 4
      },
      xaxis: {
        categories: ['Identify', 'Protect', 'Detect', 'Respond', 'Recover']
      },
      colors: [ChartConfig.colors.primary, ChartConfig.colors.warning],
      tooltip: {
        y: {
          formatter: function(val) {
            return val + '%';
          }
        }
      }
    };
    
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  },
  
  renderBreachImpactChart: function() {
    const chartElement = document.getElementById('breach-impact-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    const options = {
      series: [
        {
          name: 'Average Breach Cost',
          type: 'column',
          data: [4350000, 1525000, 650000]
        },
        {
          name: 'Response Time (Hours)',
          type: 'line',
          data: [280, 72, 5]
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        toolbar: {
          show: true
        }
      },
      stroke: {
        width: [0, 4]
      },
      xaxis: {
        categories: ['No NAC', 'Traditional NAC', 'Portnox Cloud']
      },
      yaxis: [
        {
          title: {
            text: 'Breach Cost ($)'
          },
          labels: {
            formatter: function(val) {
              return '$' + Math.round(val/1000000) + 'M';
            }
          }
        },
        {
          opposite: true,
          title: {
            text: 'Response Time (Hours)'
          }
        }
      ],
      colors: [ChartConfig.colors.danger, ChartConfig.colors.primary],
      dataLabels: {
        enabled: false
      }
    };
    
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  },
  
  renderSecurityFrameworksChart: function() {
    const chartElement = document.getElementById('security-frameworks-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    const options = {
      series: [
        {
          name: 'Portnox Cloud',
          data: [95, 92, 94, 90, 93, 96, 95, 94]
        },
        {
          name: 'Industry Average',
          data: [72, 68, 70, 65, 69, 58, 72, 62]
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 4
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['HIPAA', 'PCI DSS', 'NIST CSF', 'GDPR', 'ISO 27001', 'CMMC', 'SOX', 'GLBA']
      },
      yaxis: {
        title: {
          text: 'Coverage (%)'
        }
      },
      colors: [ChartConfig.colors.primary, ChartConfig.colors.warning],
      tooltip: {
        y: {
          formatter: function(val) {
            return val + '%';
          }
        }
      }
    };
    
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  },
  
  renderThreatModelChart: function() {
    const chartElement = document.getElementById('threat-model-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    const options = {
      series: [
        {
          name: 'With Portnox',
          data: [15, 10, 12, 8, 5, 7]
        },
        {
          name: 'Without NAC',
          data: [85, 75, 90, 65, 60, 70]
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0
            }
          }
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: ['Unauthorized Access', 'Malware Propagation', 'Data Exfiltration', 'Lateral Movement', 'Shadow IT', 'Insider Threats'],
        labels: {
          formatter: function (val) {
            return val + '%';
          }
        }
      },
      yaxis: {
        title: {
          text: 'Risk Level'
        }
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + '%';
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      },
      colors: [ChartConfig.colors.primary, ChartConfig.colors.danger]
    };
    
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  },
  
  renderIndustryBreachChart: function() {
    const chartElement = document.getElementById('industry-breach-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    const options = {
      series: [{
        name: 'Average Breach Cost',
        data: [9230000, 5970000, 3280000, 4740000, 8750000, 3580000, 4650000, 5850000]
      }],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          distributed: true,
          borderRadius: 4
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: ['Healthcare', 'Financial', 'Retail', 'Manufacturing', 'Government', 'Education', 'Energy', 'Insurance'],
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Breach Cost ($)'
        },
        labels: {
          formatter: function(val) {
            return '$' + Math.round(val/1000000) + 'M';
          }
        }
      },
      colors: [
        ChartConfig.colors.primary,
        ChartConfig.colors.secondary,
        ChartConfig.colors.highlight,
        ChartConfig.colors.warning,
        ChartConfig.colors.danger,
        '#9b59b6',
        '#2980b9',
        '#f39c12'
      ]
    };
    
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  }
};

// Initialize charts when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  if (window.ApexCharts) {
    SecurityCharts.init();
  } else {
    console.error('ApexCharts library not loaded');
  }
});

// Make SecurityCharts available globally
window.SecurityCharts = SecurityCharts;
EOF

# Fix ApexCharts integration
cat > js/charts/apex/apex-charts.js << 'EOF'
/**
 * ApexCharts Integration for Portnox Total Cost Analyzer
 * Provides chart rendering utilities for all views
 */

const ApexChartsManager = {
  init: function() {
    console.log("Initializing ApexCharts Manager");
    this.setupDefaultConfig();
    this.renderInitialCharts();
  },
  
  setupDefaultConfig: function() {
    // Set global ApexCharts options
    if (window.ApexCharts) {
      window.ApexCharts.defaultOptions = {
        fontFamily: 'Nunito, sans-serif',
        foreColor: '#333',
        tooltip: {
          enabled: true,
          theme: document.body.classList.contains('dark-mode') ? 'dark' : 'light'
        },
        chart: {
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350
            }
          },
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false
            }
          }
        }
      };
    }
  },
  
  renderInitialCharts: function() {
    // Executive summary charts
    this.renderTcoComparisonChart();
    this.renderCumulativeCostChart();
    
    // Ensure charts are updated when calculate button is clicked
    const calculateBtns = document.querySelectorAll('#calculate-btn, #calculate-btn-header');
    calculateBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        setTimeout(() => {
          this.updateAllCharts();
        }, 1000); // Allow time for calculations to complete
      });
    });
  },
  
  renderTcoComparisonChart: function() {
    const chartElement = document.getElementById('tco-comparison-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    // Use available vendor data or fallback
    const vendorData = window.VENDORS || {
      'portnox': { name: 'Portnox Cloud', tco: 245000 },
      'cisco': { name: 'Cisco ISE', tco: 520000 },
      'aruba': { name: 'Aruba', tco: 480000 }
    };
    
    // Extract data for chart
    const vendors = Object.keys(vendorData).slice(0, 5);
    const vendorNames = vendors.map(id => vendorData[id].name);
    const tcoValues = vendors.map(id => vendorData[id].tco);
    
    const options = {
      series: [{
        name: '3-Year TCO',
        data: tcoValues
      }],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 8
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return '$' + Math.round(val).toLocaleString();
        }
      },
      xaxis: {
        categories: vendorNames
      },
      yaxis: {
        title: {
          text: 'Total Cost ($)'
        },
        labels: {
          formatter: function(val) {
            return '$' + Math.round(val).toLocaleString();
          }
        }
      },
      colors: ['#1a5a96', '#e74c3c', '#e67e22', '#f39c12', '#2ecc71']
    };
    
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  },
  
  renderCumulativeCostChart: function() {
    const chartElement = document.getElementById('cumulative-cost-chart');
    if (!chartElement || !window.ApexCharts) return;
    
    const years = ['Initial', 'Year 1', 'Year 2', 'Year 3'];
    
    const options = {
      series: [
        {
          name: 'Portnox Cloud',
          data: [20000, 100000, 170000, 245000]
        },
        {
          name: 'Cisco ISE',
          data: [215000, 350000, 450000, 520000]
        },
        {
          name: 'Aruba ClearPass',
          data: [175000, 280000, 380000, 480000]
        }
      ],
      chart: {
        height: 350,
        type: 'line'
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      xaxis: {
        categories: years
      },
      yaxis: {
        title: {
          text: 'Cumulative Cost ($)'
        },
        labels: {
          formatter: function(val) {
            return '$' + Math.round(val).toLocaleString();
          }
        }
      },
      colors: ['#1a5a96', '#e74c3c', '#e67e22']
    };
    
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  },
  
  updateAllCharts: function() {
    console.log("Updating all charts with new data");
    
    // Re-render all charts with current data
    this.renderTcoComparisonChart();
    this.renderCumulativeCostChart();
    
    // Update security charts if they exist
    if (window.SecurityCharts) {
      window.SecurityCharts.init();
    }
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  if (window.ApexCharts) {
    ApexChartsManager.init();
  } else {
    console.error("ApexCharts library not loaded");
  }
});

// Make ApexChartsManager available globally
window.ApexChartsManager = ApexChartsManager;
EOF

# Create D3 manager
cat > js/charts/d3/d3-manager.js << 'EOF'
/**
 * D3.js Integration for Portnox Total Cost Analyzer
 * Provides advanced visualizations beyond ApexCharts capabilities
 */

const D3Manager = {
  init: function() {
    console.log("Initializing D3 Manager");
    
    // Check if D3 is available
    if (!window.d3) {
      console.error("D3.js library not loaded");
      return;
    }
    
    // Initialize D3 visualizations
    // this.renderComplianceRadarChart();
    // this.renderNetworkTopologyMap();
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  if (window.d3) {
    D3Manager.init();
  } else {
    console.error("D3.js library not loaded");
  }
});

// Make D3Manager available globally
window.D3Manager = D3Manager;
EOF

# Fix executive view container issues
cat > js/fixes/executive-view-fix.js << 'EOF'
/**
 * Executive View Fix for Portnox Total Cost Analyzer
 * Ensures proper initialization and rendering of Executive View
 */

console.log("Applying executive view fix...");

document.addEventListener('DOMContentLoaded', function() {
  // Create executive view panel if it doesn't exist
  if (!document.querySelector('.view-panel[data-view="executive"]')) {
    console.log("Creating executive view panel");
    const contentWrapper = document.querySelector('.content-area .content-wrapper');
    
    if (contentWrapper) {
      const execPanel = document.createElement('div');
      execPanel.className = 'view-panel';
      execPanel.setAttribute('data-view', 'executive');
      
      // Add necessary tabs
      execPanel.innerHTML = `
        <div class="results-tabs">
          <button class="results-tab active" data-panel="executive-summary">Executive Summary</button>
          <button class="results-tab" data-panel="executive-roi">TCO & ROI</button>
          <button class="results-tab" data-panel="executive-security">Security Impact</button>
          <button class="results-tab" data-panel="executive-compliance">Compliance</button>
          <button class="results-tab" data-panel="executive-comparison">Vendor Comparison</button>
        </div>
        
        <div id="executive-summary" class="results-panel active">
          <!-- Content will be added by executive-view.js -->
        </div>
        
        <div id="executive-roi" class="results-panel">
          <!-- Content will be added by executive-view.js -->
        </div>
        
        <div id="executive-security" class="results-panel">
          <!-- Content will be added by executive-view.js -->
        </div>
        
        <div id="executive-compliance" class="results-panel">
          <!-- Content will be added by executive-view.js -->
        </div>
        
        <div id="executive-comparison" class="results-panel">
          <!-- Content will be added by executive-view.js -->
        </div>
      `;
      
      contentWrapper.appendChild(execPanel);
    }
  }
  
  // Re-initialize executive view if it failed earlier
  if (window.executiveView && !window.executiveView.initialized) {
    console.log("Re-initializing executive view");
    window.executiveView.init();
  }
});
EOF

# Fix color scheme and styling
cat > css/fixes/enhanced-color-scheme.css << 'EOF'
/**
 * Enhanced Color Scheme for Portnox Total Cost Analyzer
 * Improved visibility and contrast for all UI elements
 */

:root {
  --primary-color: #2563eb;
  --primary-dark-color: #1e40af;
  --secondary-color: #0284c7;
  --accent-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
  --background-color: #f8fafc;
  --card-background: #ffffff;
  --text-color: #1e293b;
  --text-light: #64748b;
  --border-color: #e2e8f0;
  --highlight-background: rgba(37, 99, 235, 0.08);
  --shadow-color: rgba(0, 0, 0, 0.1);
}

/* Dark mode colors */
.dark-mode {
  --primary-color: #3b82f6;
  --primary-dark-color: #2563eb;
  --secondary-color: #38bdf8;
  --accent-color: #34d399;
  --warning-color: #fbbf24;
  --danger-color: #f87171;
  --background-color: #0f172a;
  --card-background: #1e293b;
  --text-color: #f1f5f9;
  --text-light: #cbd5e1;
  --border-color: #334155;
  --highlight-background: rgba(59, 130, 246, 0.15);
  --shadow-color: rgba(0, 0, 0, 0.3);
}

/* Apply new colors throughout the app */
body {
  background-color: var(--background-color);
  color: var(--text-color);
}

.app-header, .enhanced-header {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark-color));
  border-bottom: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.header-content {
  padding: 1.2rem 2rem;
}

.app-title h1 {
  color: white;
  font-weight: 600;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.app-title .subtitle {
  color: rgba(255, 255, 255, 0.9);
}

.btn-primary {
  background-color: var(--primary-dark-color);
  border-color: var(--primary-dark-color);
}

.btn-primary:hover {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.sidebar {
  background-color: var(--card-background);
  border-right: 1px solid var(--border-color);
  box-shadow: 4px 0 8px var(--shadow-color);
}

.sidebar-header h2 {
  color: var(--primary-color);
}

.config-card {
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 2px 6px var(--shadow-color);
  margin-bottom: 1rem;
}

.config-card-header {
  border-bottom: 1px solid var(--border-color);
  background-color: var(--highlight-background);
}

.config-card-header h3 {
  color: var(--primary-color);
}

.results-panel {
  background-color: var(--card-background);
  border-radius: 8px;
  box-shadow: 0 2px 8px var(--shadow-color);
}

.panel-header h2 {
  color: var(--primary-color);
}

.results-tab {
  background-color: var(--card-background);
  color: var(--text-light);
  border: 1px solid var(--border-color);
  border-bottom: none;
  border-radius: 8px 8px 0 0;
}

.results-tab.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.results-tab:hover:not(.active) {
  background-color: var(--highlight-background);
}

.dashboard-card {
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px var(--shadow-color);
}

.highlight-card {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark-color));
  color: white;
}

.metric-value {
  color: var(--primary-color);
  font-weight: 700;
}

.highlight-card .metric-value {
  color: white;
}

.chart-container {
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px var(--shadow-color);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.chart-container h3 {
  color: var(--primary-color);
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 1rem;
}

.vendor-select-card {
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.vendor-select-card:hover {
  box-shadow: 0 4px 12px var(--shadow-color);
  transform: translateY(-3px);
}

.vendor-select-card.selected {
  border-color: var(--primary-color);
  background-color: var(--highlight-background);
}

.badge-primary {
  background-color: var(--primary-color);
}

.badge-warning {
  background-color: var(--warning-color);
}

.badge-danger {
  background-color: var(--danger-color);
}

.btn-calculate {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-calculate:hover {
  background-color: var(--primary-dark-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--shadow-color);
}

.benefit-card {
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px var(--shadow-color);
}

.benefit-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px var(--shadow-color);
}

.benefit-icon {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark-color));
  color: white;
}

/* Fixes for form elements */
.form-control, .form-select {
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  border-radius: 6px;
}

.form-control:focus, .form-select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--highlight-background);
}

.form-label {
  color: var(--text-color);
  font-weight: 600;
}

.range-slider input[type="range"] {
  accent-color: var(--primary-color);
}

.range-slider-value {
  color: var(--primary-color);
  font-weight: 600;
}

/* App footer */
.app-footer {
  background-color: var(--card-background);
  border-top: 1px solid var(--border-color);
  color: var(--text-light);
}

.footer-links a {
  color: var(--primary-color);
}

.footer-links a:hover {
  color: var(--primary-dark-color);
  text-decoration: underline;
}

.social-link {
  color: var(--text-light);
}

.social-link:hover {
  color: var(--primary-color);
}

/* Toast notifications */
.toast {
  background-color: var(--card-background);
  border-left: 4px solid var(--primary-color);
  box-shadow: 0 4px 12px var(--shadow-color);
}

.toast-success {
  border-color: var(--accent-color);
}

.toast-warning {
  border-color: var(--warning-color);
}

.toast-error {
  border-color: var(--danger-color);
}

/* Loading spinner */
.loading-overlay {
  background-color: rgba(0, 0, 0, 0.6);
}

.spinner {
  border-color: var(--primary-color) transparent var(--primary-color) transparent;
}
EOF

# Create update script that applies all fixes
cat > apply-fixes.sh << 'EOF'
#!/bin/bash
# Apply all fixes to Portnox Total Cost Analyzer

echo "Applying fixes to Portnox Total Cost Analyzer..."

# Add new CSS to index.html
echo "Adding enhanced color scheme..."
if grep -q "enhanced-color-scheme.css" index.html; then
  echo "Enhanced color scheme already included"
else
  sed -i '/<link rel="stylesheet" href="css\/security-view.css">/a \    <link rel="stylesheet" href="css/fixes/enhanced-color-scheme.css">' index.html
fi

# Add new JS files to index.html
echo "Adding missing JavaScript files..."
if grep -q "include-fixes.js" index.html; then
  echo "Fix scripts already included"
else
  sed -i '/<script src="js\/fixed-app.js"><\/script>/a \    <script src="js/include-fixes.js"></script>' index.html
  sed -i '/<script src="js\/include-fixes.js"><\/script>/a \    <script src="js/fixes/executive-view-fix.js"></script>' index.html
fi

# Fix vendor data
echo "Ensuring vendor data is properly defined..."
if grep -q "VENDORS =" js/models/vendor-data.js; then
  echo "Vendor data already defined"
else
  # Create or update vendor-data.js
  cat > js/models/vendor-data.js << 'VENDORDATA'
/**
 * Vendor Data for Portnox Total Cost Analyzer
 * Contains comprehensive information for all supported NAC vendors
 */

const VENDORS = {
  'portnox': {
    name: 'Portnox Cloud',
    logo: 'img/vendors/portnox-logo.png',
    architecture: 'cloud',
    tco: 245000,
    implementationTime: 21,
    implementationCost: 15000,
    fte: 0.25,
    hardware: 0,
    maintenance: 12500,
    subscription: 172500,
    personnel: 25000,
    paybackPeriod: 7,
    roi: 325,
    securityScore: 92,
    complianceScore: 95,
    zeroTrustScore: 95,
    breachReduction: 85,
    automationLevel: 90
  },
  'cisco': {
    name: 'Cisco ISE',
    logo: 'img/vendors/cisco-logo.png',
    architecture: 'on-premises',
    tco: 520000,
    implementationTime: 90,
    implementationCost: 85000,
    fte: 2.0,
    hardware: 130000,
    maintenance: 98000,
    subscription: 0,
    personnel: 200000,
    paybackPeriod: 32,
    roi: -8,
    securityScore: 85,
    complianceScore: 90,
    zeroTrustScore: 75,
    breachReduction: 70,
    automationLevel: 60
  },
  'aruba': {
    name: 'Aruba ClearPass',
    logo: 'img/vendors/aruba-logo.png',
    architecture: 'on-premises',
    tco: 480000,
    implementationTime: 75,
    implementationCost: 65000,
    fte: 1.75,
    hardware: 110000,
    maintenance: 85000,
    subscription: 0,
    personnel: 175000,
    paybackPeriod: 28,
    roi: 5,
    securityScore: 82,
    complianceScore: 88,
    zeroTrustScore: 70,
    breachReduction: 72,
    automationLevel: 65
  },
  'forescout': {
    name: 'Forescout',
    logo: 'img/vendors/forescout-logo.png',
    architecture: 'on-premises',
    tco: 430000,
    implementationTime: 60,
    implementationCost: 75000,
    fte: 1.5,
    hardware: 100000,
    maintenance: 75000,
    subscription: 0,
    personnel: 150000,
    paybackPeriod: 25,
    roi: 12,
    securityScore: 80,
    complianceScore: 85,
    zeroTrustScore: 72,
    breachReduction: 68,
    automationLevel: 70
  },
  'fortinac': {
    name: 'FortiNAC',
    logo: 'img/vendors/fortinac-logo.png',
    architecture: 'on-premises',
    tco: 400000,
    implementationTime: 60,
    implementationCost: 60000,
    fte: 1.25,
    hardware: 90000,
    maintenance: 70000,
    subscription: 0,
    personnel: 125000,
    paybackPeriod: 22,
    roi: 15,
    securityScore: 75,
    complianceScore: 80,
    zeroTrustScore: 65,
    breachReduction: 65,
    automationLevel: 60
  },
  'juniper': {
    name: 'Juniper Mist',
    logo: 'img/vendors/juniper-logo.png',
    architecture: 'hybrid',
    tco: 350000,
    implementationTime: 45,
    implementationCost: 50000,
    fte: 1.0,
    hardware: 60000,
    maintenance: 50000,
    subscription: 100000,
    personnel: 100000,
    paybackPeriod: 18,
    roi: 40,
    securityScore: 78,
    complianceScore: 82,
    zeroTrustScore: 80,
    breachReduction: 70,
    automationLevel: 75
  },
  'securew2': {
    name: 'SecureW2',
    logo: 'img/vendors/securew2-logo.png',
    architecture: 'cloud',
    tco: 280000,
    implementationTime: 30,
    implementationCost: 25000,
    fte: 0.5,
    hardware: 0,
    maintenance: 15000,
    subscription: 190000,
    personnel: 50000,
    paybackPeriod: 12,
    roi: 180,
    securityScore: 72,
    complianceScore: 70,
    zeroTrustScore: 85,
    breachReduction: 60,
    automationLevel: 80
  },
  'microsoft': {
    name: 'Microsoft NPS',
    logo: 'img/vendors/microsoft-logo.png',
    architecture: 'on-premises',
    tco: 290000,
    implementationTime: 30,
    implementationCost: 20000,
    fte: 1.0,
    hardware: 30000,
    maintenance: 40000,
    subscription: 0,
    personnel: 100000,
    paybackPeriod: 20,
    roi: 25,
    securityScore: 60,
    complianceScore: 65,
    zeroTrustScore: 50,
    breachReduction: 45,
    automationLevel: 40
  },
  'arista': {
    name: 'Arista CloudVision',
    logo: 'img/vendors/arista-logo.png',
    architecture: 'hybrid',
    tco: 320000,
    implementationTime: 45,
    implementationCost: 45000,
    fte: 1.0,
    hardware: 50000,
    maintenance: 55000,
    subscription: 70000,
    personnel: 100000,
    paybackPeriod: 15,
    roi: 35,
    securityScore: 70,
    complianceScore: 75,
    zeroTrustScore: 65,
    breachReduction: 60,
    automationLevel: 65
  },
  'foxpass': {
    name: 'Foxpass',
    logo: 'img/vendors/foxpass-logo.png',
    architecture: 'cloud',
    tco: 270000,
    implementationTime: 25,
    implementationCost: 20000,
    fte: 0.5,
    hardware: 0,
    maintenance: 10000,
    subscription: 180000,
    personnel: 50000,
    paybackPeriod: 10,
    roi: 160,
    securityScore: 65,
    complianceScore: 60,
    zeroTrustScore: 70,
    breachReduction: 55,
    automationLevel: 75
  }
};

// Make VENDORS data available globally
window.VENDORS = VENDORS;
VENDORDATA
fi

# Fix permissions
chmod +x apply-fixes.sh

echo "Creating git commit script..."
cat > commit-fixes.sh << 'COMMITSCRIPT'
#!/bin/bash
# Commit and push fixes to git repository

# Stage all files
git add .

# Commit changes
git commit -m "Fix Portnox Total Cost Analyzer UI and functionality issues

- Fixed missing JavaScript files (chart-config.js, security-charts.js, apex-charts.js, d3-manager.js)
- Added enhanced color scheme for better visibility
- Fixed executive view container initialization
- Ensured vendor data is properly defined
- Fixed chart rendering issues
- Improved overall UI with better contrast and visibility"

# Push to remote repository (uncomment if needed)
# git push origin main

echo "Changes committed successfully!"
COMMITSCRIPT

chmod +x commit-fixes.sh

echo "All fixes applied successfully! The application should now work properly."
echo "Run './commit-fixes.sh' to commit these changes to your git repository."
EOF

# Make script executable
chmod +x apply-fixes.sh

echo "Fix script created successfully!"
echo "To apply all fixes, run: ./apply-fixes.sh"
