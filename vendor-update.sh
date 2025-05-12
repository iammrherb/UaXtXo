#!/bin/bash

# Enhanced NAC TCO Analyzer Update Script
# Version: 2.1
# A more targeted and comprehensive update to fix chart errors and enhance functionality,
# ensuring compatibility with your specific environment and including all requested vendors.

set -e

# Color codes for console output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_DIR="$(pwd)"
JS_DIR="${APP_DIR}/js"
CSS_DIR="${APP_DIR}/css"
DATA_DIR="${APP_DIR}/data"
IMG_DIR="${APP_DIR}/img/vendors"
BACKUP_DIR="${APP_DIR}/backup_$(date +%Y%m%d_%H%M%S)"

# Create necessary directories
mkdir -p "${BACKUP_DIR}" "${DATA_DIR}/vendors" "${DATA_DIR}/compliance" "${DATA_DIR}/industry" "${IMG_DIR}"

# Log function
log() {
  echo -e "${GREEN}[INFO]${NC} $1"
}

# Warning function
warn() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Error function
error() {
  echo -e "${RED}[ERROR]${NC} $1"
  exit 1
}

# Detect application structure
detect_structure() {
  log "Detecting application structure..."
  
  # Check for common files to determine structure
  if [ -f "${APP_DIR}/index.html" ]; then
    log "Found index.html"
  else
    error "index.html not found. Please run this script from the application root directory."
  fi
  
  # Check for JS directory
  if [ -d "${JS_DIR}" ]; then
    log "Found JS directory at ${JS_DIR}"
  else
    log "Creating JS directory at ${JS_DIR}"
    mkdir -p "${JS_DIR}"
  fi
  
  # Check for CSS directory
  if [ -d "${CSS_DIR}" ]; then
    log "Found CSS directory at ${CSS_DIR}"
  else
    log "Creating CSS directory at ${CSS_DIR}"
    mkdir -p "${CSS_DIR}"
  fi
  
  # Check for specific JS files and create a structure map
  STRUCTURE_MAP="app_structure.txt"
  echo "Application Structure Map ($(date))" > "${BACKUP_DIR}/${STRUCTURE_MAP}"
  echo "------------------------------------" >> "${BACKUP_DIR}/${STRUCTURE_MAP}"

  # Check for chart-related files
  for file in chart.js charts.js chart-manager.js canvas-fixer.js chart-fix.js; do
    if [ -f "${JS_DIR}/${file}" ]; then
      echo "[FOUND] ${JS_DIR}/${file}" >> "${BACKUP_DIR}/${STRUCTURE_MAP}"
      cp "${JS_DIR}/${file}" "${BACKUP_DIR}/"
    else
      echo "[MISSING] ${JS_DIR}/${file}" >> "${BACKUP_DIR}/${STRUCTURE_MAP}"
    fi
  done
  
  # Check for wizard-related files
  for file in wizard.js wizard-manager.js wizard-fix.js; do
    if [ -f "${JS_DIR}/${file}" ]; then
      echo "[FOUND] ${JS_DIR}/${file}" >> "${BACKUP_DIR}/${STRUCTURE_MAP}"
      cp "${JS_DIR}/${file}" "${BACKUP_DIR}/"
    else
      echo "[MISSING] ${JS_DIR}/${file}" >> "${BACKUP_DIR}/${STRUCTURE_MAP}"
    fi
  done
  
  # Check for data files
  for file in data-integration.js app-controller.js main.js init.js; do
    if [ -f "${JS_DIR}/${file}" ]; then
      echo "[FOUND] ${JS_DIR}/${file}" >> "${BACKUP_DIR}/${STRUCTURE_MAP}"
      cp "${JS_DIR}/${file}" "${BACKUP_DIR}/"
    else
      echo "[MISSING] ${JS_DIR}/${file}" >> "${BACKUP_DIR}/${STRUCTURE_MAP}"
    fi
  done
  
  log "Application structure detection completed. Structure map saved to ${BACKUP_DIR}/${STRUCTURE_MAP}"
}

# Backup existing files
backup_files() {
  log "Creating backup of critical files..."
  
  # Backup HTML file
  if [ -f "${APP_DIR}/index.html" ]; then
    cp "${APP_DIR}/index.html" "${BACKUP_DIR}/"
    log "Backed up index.html"
  fi
  
  # Backup JS files - use find to get all JS files
  find "${JS_DIR}" -name "*.js" -exec cp {} "${BACKUP_DIR}/" \; 2>/dev/null || warn "No JS files found"
  
  # Backup CSS files - use find to get all CSS files
  find "${CSS_DIR}" -name "*.css" -exec cp {} "${BACKUP_DIR}/" \; 2>/dev/null || warn "No CSS files found"
  
  # Backup data files if they exist
  if [ -d "${DATA_DIR}" ]; then
    mkdir -p "${BACKUP_DIR}/data"
    cp -r "${DATA_DIR}"/* "${BACKUP_DIR}/data/" 2>/dev/null || warn "No data files found"
  fi
  
  log "Backup completed: ${BACKUP_DIR}"
}

# Fix JavaScript chart errors
fix_chart_js_errors() {
  log "Fixing JavaScript chart errors..."
  
  # First, check for existing chart files to determine best approach
  HAS_CHART_JS=false
  CHART_JS_FILE=""
  
  # Look for Chart.js library or chart-related files
  for file in chart.min.js chart.js charts.js chart-manager.js; do
    if [ -f "${JS_DIR}/${file}" ]; then
      HAS_CHART_JS=true
      CHART_JS_FILE="${file}"
      log "Found Chart.js file: ${CHART_JS_FILE}"
      break
    fi
  done
  
  # Create a Chart.js utility functions file
  cat > "${JS_DIR}/chart-utilities.js" << 'EOF'
/**
 * Chart Utilities
 * Provides common functions for chart management and error resolution
 * Version: 2.1
 */

(function() {
  // Create a namespace for chart utilities
  window.ChartUtils = window.ChartUtils || {};
  
  // Track all chart instances
  window.ChartUtils.instances = {};
  
  // Log function with prefix
  function log(message) {
    console.log(`[Chart Utils] ${message}`);
  }
  
  // Initialize the utilities
  function init() {
    log('Initializing chart utilities...');
    
    // Check if Chart.js is available
    if (typeof Chart === 'undefined') {
      console.warn('[Chart Utils] Chart.js not found. Utils will wait for it to load.');
      
      // Watch for Chart.js to become available
      const checkInterval = setInterval(() => {
        if (typeof Chart !== 'undefined') {
          log('Chart.js detected, initializing utilities...');
          clearInterval(checkInterval);
          setupChartPatches();
        }
      }, 100);
      
      // Give up after 5 seconds
      setTimeout(() => {
        if (typeof Chart === 'undefined') {
          clearInterval(checkInterval);
          console.error('[Chart Utils] Chart.js was not loaded after 5 seconds');
        }
      }, 5000);
    } else {
      setupChartPatches();
    }
  }
  
  // Set up Chart.js patches
  function setupChartPatches() {
    log('Setting up Chart.js patches...');
    
    // Patch for getChart utility if not present
    if (typeof Chart.getChart !== 'function') {
      Chart.getChart = function(canvas) {
        if (typeof canvas === 'string') {
          canvas = document.getElementById(canvas);
        }
        
        if (!canvas) return null;
        
        return Object.values(Chart.instances || {}).find(chart => 
          chart.canvas === canvas
        );
      };
      
      log('Added Chart.getChart method');
    }
    
    // Patch for safe destroy
    window.ChartUtils.destroyChart = function(canvasId) {
      const chart = Chart.getChart(canvasId);
      if (chart) {
        chart.destroy();
        log(`Destroyed chart: ${canvasId}`);
        return true;
      }
      return false;
    };
    
    // Patch for safely initializing a chart
    window.ChartUtils.initializeChart = function(canvasId, config) {
      try {
        // First, ensure any existing chart is destroyed
        window.ChartUtils.destroyChart(canvasId);
        
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
          console.warn(`[Chart Utils] Canvas element not found: ${canvasId}`);
          return null;
        }
        
        // Create new chart
        const ctx = canvas.getContext('2d');
        const newChart = new Chart(ctx, config);
        
        // Store in our instance tracker
        window.ChartUtils.instances[canvasId] = newChart;
        
        log(`Successfully initialized chart: ${canvasId}`);
        return newChart;
      } catch (error) {
        console.error(`[Chart Utils] Error initializing chart ${canvasId}:`, error);
        return null;
      }
    };
    
    // Patch for refreshing a chart
    window.ChartUtils.refreshChart = function(canvasId) {
      const chart = Chart.getChart(canvasId);
      if (chart) {
        chart.update();
        log(`Refreshed chart: ${canvasId}`);
        return true;
      }
      return false;
    };
    
    // Patch for destroying all charts
    window.ChartUtils.destroyAllCharts = function() {
      Object.keys(window.ChartUtils.instances).forEach(id => {
        window.ChartUtils.destroyChart(id);
      });
      log('Destroyed all charts');
    };
    
    // Create global aliases for backward compatibility
    window.initializeChart = window.ChartUtils.initializeChart;
    window.destroyChart = window.ChartUtils.destroyChart;
    window.refreshChart = window.ChartUtils.refreshChart;
    
    log('Chart.js patches successfully applied');
  }
  
  // Initialize Chart Utilities
  init();
  
  // Set up event listeners for tab changes
  document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.result-tab');
    tabButtons.forEach(button => {
      button.addEventListener('click', function(event) {
        const tabName = this.getAttribute('data-tab');
        log(`Tab changed to: ${tabName}`);
        
        // Small delay to let the DOM update
        setTimeout(() => {
          const activePanel = document.querySelector('.result-panel.active');
          if (activePanel) {
            const canvases = activePanel.querySelectorAll('canvas');
            canvases.forEach(canvas => {
              window.ChartUtils.refreshChart(canvas.id);
            });
          }
        }, 100);
      });
    });
    
    log('Tab change handlers installed');
  });
})();
EOF

  # Create a specialized chart initializers file with all chart types
  cat > "${JS_DIR}/chart-initializers.js" << 'EOF'
/**
 * Chart Initializers
 * Contains factory functions for all chart types used in the TCO Analyzer
 * Version: 2.1
 */

(function() {
  // Create a namespace for chart initializers
  window.ChartFactory = window.ChartFactory || {};
  
  // Helper function to convert hex color to rgba
  function hexToRgba(hex, alpha) {
    if (!hex) return `rgba(54, 162, 235, ${alpha || 1})`;
    
    // Handle shorthand hex (e.g. #ABC)
    if (hex.length === 4) {
      hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }
    
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  // Format currency values
  function formatCurrency(value) {
    if (typeof value !== 'number') return '$0';
    return '$' + value.toLocaleString();
  }
  
  // TCO Comparison Chart
  window.ChartFactory.createTcoComparisonChart = function(canvasId, data) {
    if (!data || !data.vendors || !data.vendors.length) {
      console.error('Invalid data for TCO comparison chart');
      return null;
    }
    
    return window.ChartUtils.initializeChart(canvasId, {
      type: 'bar',
      data: {
        labels: data.vendors,
        datasets: [
          {
            label: 'Initial Cost',
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            data: data.initialCosts,
            stack: 'Stack 0'
          },
          {
            label: 'Operational Cost',
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            data: data.operationalCosts,
            stack: 'Stack 0'
          },
          {
            label: 'Maintenance Cost',
            backgroundColor: 'rgba(255, 206, 86, 0.6)',
            data: data.maintenanceCosts,
            stack: 'Stack 0'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false
            }
          },
          y: {
            stacked: true,
            title: {
              display: true,
              text: 'Cost ($)'
            },
            ticks: {
              callback: function(value) {
                return formatCurrency(value);
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Total Cost of Ownership by Solution'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
              },
              footer: function(tooltipItems) {
                let total = 0;
                tooltipItems.forEach(item => {
                  total += item.parsed.y;
                });
                return 'Total: ' + formatCurrency(total);
              }
            }
          }
        }
      }
    });
  };
  
  // Breakdown Chart (Pie/Doughnut)
  window.ChartFactory.createBreakdownChart = function(canvasId, data, title, type) {
    if (!data || !data.labels || !data.values) {
      console.error('Invalid data for breakdown chart');
      return null;
    }
    
    return window.ChartUtils.initializeChart(canvasId, {
      type: type || 'pie',
      data: {
        labels: data.labels,
        datasets: [{
          data: data.values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: !!title,
            text: title || ''
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.parsed || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ${formatCurrency(value)} (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  };
  
  // Cumulative Cost Chart
  window.ChartFactory.createCumulativeCostChart = function(canvasId, data) {
    if (!data || !data.years || !data.solutions) {
      console.error('Invalid data for cumulative cost chart');
      return null;
    }
    
    return window.ChartUtils.initializeChart(canvasId, {
      type: 'line',
      data: {
        labels: data.years,
        datasets: data.solutions.map(solution => ({
          label: solution.name,
          data: solution.cumulativeCosts,
          borderColor: solution.color,
          backgroundColor: hexToRgba(solution.color, 0.1),
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Year'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Cumulative Cost ($)'
            },
            ticks: {
              callback: function(value) {
                return formatCurrency(value);
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Cumulative Cost Over Time'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                const value = context.parsed.y || 0;
                return `${label}: ${formatCurrency(value)}`;
              }
            }
          }
        }
      }
    });
  };
  
  // Implementation Comparison Chart
  window.ChartFactory.createImplementationChart = function(canvasId, data) {
    if (!data || !data.vendors || !data.implementationTimes) {
      console.error('Invalid data for implementation comparison chart');
      return null;
    }
    
    return window.ChartUtils.initializeChart(canvasId, {
      type: 'bar',
      data: {
        labels: data.vendors,
        datasets: [{
          label: 'Implementation Time (Days)',
          data: data.implementationTimes,
          backgroundColor: data.colors || 'rgba(75, 192, 192, 0.6)'
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Implementation Time Comparison'
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
  };
  
  // Feature Comparison Radar Chart
  window.ChartFactory.createFeatureComparisonChart = function(canvasId, data) {
    if (!data || !data.features || !data.vendors) {
      console.error('Invalid data for feature comparison chart');
      return null;
    }
    
    return window.ChartUtils.initializeChart(canvasId, {
      type: 'radar',
      data: {
        labels: data.features,
        datasets: data.vendors.map((vendor, index) => ({
          label: vendor.name,
          data: vendor.scores,
          backgroundColor: hexToRgba(vendor.color, 0.2),
          borderColor: vendor.color,
          pointBackgroundColor: vendor.color
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0,
            max: 10,
            ticks: {
              stepSize: 2
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Feature Comparison'
          }
        }
      }
    });
  };
  
  // ROI Comparison Chart
  window.ChartFactory.createRoiChart = function(canvasId, data) {
    if (!data || !data.vendors || !data.roiValues) {
      console.error('Invalid data for ROI chart');
      return null;
    }
    
    return window.ChartUtils.initializeChart(canvasId, {
      type: 'bar',
      data: {
        labels: data.vendors,
        datasets: [{
          label: '3-Year ROI (%)',
          data: data.roiValues,
          backgroundColor: data.colors || 'rgba(54, 162, 235, 0.6)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Return on Investment (3 Years)'
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'ROI (%)'
            }
          }
        }
      }
    });
  };
  
  // Industry Compliance Radar Chart
  window.ChartFactory.createIndustryComplianceChart = function(canvasId, data) {
    if (!data || !data.frameworks || !data.vendors) {
      console.error('Invalid data for industry compliance chart');
      return null;
    }
    
    return window.ChartUtils.initializeChart(canvasId, {
      type: 'radar',
      data: {
        labels: data.frameworks,
        datasets: data.vendors.map((vendor, index) => ({
          label: vendor.name,
          data: vendor.compliance,
          backgroundColor: hexToRgba(vendor.color, 0.2),
          borderColor: vendor.color,
          pointBackgroundColor: vendor.color
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: (data.industryName ? data.industryName + ' - ' : '') + 'Compliance Coverage'
          }
        }
      }
    });
  };
  
  // Risk Reduction Chart
  window.ChartFactory.createRiskReductionChart = function(canvasId, data) {
    if (!data || !data.categories || !data.vendors) {
      console.error('Invalid data for risk reduction chart');
      return null;
    }
    
    return window.ChartUtils.initializeChart(canvasId, {
      type: 'bar',
      data: {
        labels: data.categories,
        datasets: data.vendors.map((vendor, index) => ({
          label: vendor.name,
          data: vendor.reductions,
          backgroundColor: hexToRgba(vendor.color, 0.6)
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 0,
            max: 100,
            title: {
              display: true,
              text: 'Risk Reduction (%)'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Security Risk Reduction by Category'
          }
        }
      }
    });
  };
  
  // Sensitivity Analysis Chart
  window.ChartFactory.createSensitivityChart = function(canvasId, data) {
    if (!data || !data.values || !data.vendors) {
      console.error('Invalid data for sensitivity chart');
      return null;
    }
    
    return window.ChartUtils.initializeChart(canvasId, {
      type: 'line',
      data: {
        labels: data.values,
        datasets: data.vendors.map((vendor, index) => ({
          label: vendor.name,
          data: vendor.results,
          borderColor: vendor.color,
          backgroundColor: hexToRgba(vendor.color, 0.1),
          borderWidth: 2,
          fill: false,
          tension: 0.4
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: data.xAxisLabel || 'Value'
            }
          },
          y: {
            title: {
              display: true,
              text: data.yAxisLabel || 'Result'
            },
            ticks: {
              callback: function(value) {
                if (data.isCurrency) {
                  return formatCurrency(value);
                }
                return value;
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Sensitivity Analysis: ' + (data.title || 'Parameter Impact')
          }
        }
      }
    });
  };
  
  console.log('Chart initializers loaded successfully');
})();
EOF

  # Fix wizard.js if it exists
  if [ -f "${JS_DIR}/wizard.js" ]; then
    log "Fixing wizard.js syntax error..."
    # Make a backup of the original file
    cp "${JS_DIR}/wizard.js" "${JS_DIR}/wizard.js.bak"
    
    # Fix the syntax error on line 899 (comma to semicolon)
    sed -i.bak '899s/,/;/' "${JS_DIR}/wizard.js" || warn "Failed to fix wizard.js syntax error"
  else
    log "Creating wizard-utilities.js for wizard functionality..."
    
    # Create a new wizard utilities file
    cat > "${JS_DIR}/wizard-utilities.js" << 'EOF'
/**
 * Wizard Utilities
 * Provides enhanced wizard functionality and navigation
 * Version: 2.1
 */

(function() {
  // Create namespace for wizard utilities
  window.WizardUtils = window.WizardUtils || {};
  
  // Track wizard state
  window.WizardUtils.state = {
    currentStep: 1,
    totalSteps: 5,
    isComplete: false
  };
  
  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', init);
  
  function init() {
    console.log('[Wizard Utils] Initializing wizard utilities...');
    
    // Find wizard elements
    const nextButton = document.getElementById('next-step');
    const prevButton = document.getElementById('prev-button') || document.getElementById('prev-step');
    const wizardSteps = document.querySelectorAll('.wizard-step');
    
    if (!nextButton || !prevButton) {
      console.warn('[Wizard Utils] Navigation buttons not found, attempting to create them');
      createNavigationButtons();
      return;
    }
    
    if (!wizardSteps || wizardSteps.length === 0) {
      console.warn('[Wizard Utils] Wizard steps not found');
      return;
    }
    
    // Set total steps
    window.WizardUtils.state.totalSteps = wizardSteps.length;
    
    // Add enhanced click handlers
    addNavigationHandlers(nextButton, prevButton, wizardSteps);
    
    // Initialize progress indicators
    initializeProgressIndicators(wizardSteps.length);
    
    console.log(`[Wizard Utils] Wizard initialized with ${wizardSteps.length} steps`);
  }
  
  function createNavigationButtons() {
    // Find wizard container to append buttons
    const wizardContainer = document.querySelector('.wizard-container') || 
                           document.querySelector('.calculator-container') || 
                           document.body;
    
    // Create navigation container if it doesn't exist
    let navContainer = document.querySelector('.wizard-navigation');
    if (!navContainer) {
      navContainer = document.createElement('div');
      navContainer.className = 'wizard-navigation';
      wizardContainer.appendChild(navContainer);
    }
    
    // Create previous button if it doesn't exist
    let prevButton = document.getElementById('prev-step');
    if (!prevButton) {
      prevButton = document.createElement('button');
      prevButton.id = 'prev-step';
      prevButton.className = 'btn btn-outline';
      prevButton.innerHTML = '<i class="fas fa-chevron-left"></i> Previous';
      prevButton.setAttribute('disabled', 'disabled');
      navContainer.appendChild(prevButton);
    }
    
    // Create next button if it doesn't exist
    let nextButton = document.getElementById('next-step');
    if (!nextButton) {
      nextButton = document.createElement('button');
      nextButton.id = 'next-step';
      nextButton.className = 'btn btn-primary';
      nextButton.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
      navContainer.appendChild(nextButton);
    }
    
    // Find wizard steps again
    const wizardSteps = document.querySelectorAll('.wizard-step');
    if (wizardSteps && wizardSteps.length > 0) {
      // Add navigation handlers
      addNavigationHandlers(nextButton, prevButton, wizardSteps);
      
      // Initialize progress indicators
      initializeProgressIndicators(wizardSteps.length);
      
      console.log('[Wizard Utils] Created navigation buttons and initialized wizard');
    } else {
      console.warn('[Wizard Utils] Created navigation buttons but wizard steps not found');
    }
  }
  
  function addNavigationHandlers(nextButton, prevButton, wizardSteps) {
    // Next button handler
    nextButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Find current active step
      const activeStep = document.querySelector('.wizard-step.active');
      if (!activeStep) return;
      
      // Get current step number
      const currentStep = parseInt(activeStep.getAttribute('data-step'), 10) || 
                         window.WizardUtils.state.currentStep;
      
      if (isNaN(currentStep)) return;
      
      // Don't proceed if this is the last step
      if (currentStep >= wizardSteps.length) return;
      
      // Find next step
      const nextStep = document.querySelector(`.wizard-step[data-step="${currentStep + 1}"]`);
      if (!nextStep) return;
      
      // Update step display
      activeStep.classList.remove('active');
      nextStep.classList.add('active');
      
      // Update state
      window.WizardUtils.state.currentStep = currentStep + 1;
      
      // Update buttons
      prevButton.removeAttribute('disabled');
      if (currentStep + 1 >= wizardSteps.length) {
        this.textContent = 'Calculate';
        this.classList.add('btn-calculate');
      }
      
      // Update progress
      updateProgress(currentStep + 1, wizardSteps.length);
      
      // Dispatch step change event
      const event = new CustomEvent('wizardStepChange', {
        detail: { 
          currentStep: currentStep + 1,
          totalSteps: wizardSteps.length
        }
      });
      document.dispatchEvent(event);
    });
    
    // Previous button handler
    prevButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Find current active step
      const activeStep = document.querySelector('.wizard-step.active');
      if (!activeStep) return;
      
      // Get current step number
      const currentStep = parseInt(activeStep.getAttribute('data-step'), 10) || 
                         window.WizardUtils.state.currentStep;
      
      if (isNaN(currentStep) || currentStep <= 1) return;
      
      // Find previous step
      const prevStep = document.querySelector(`.wizard-step[data-step="${currentStep - 1}"]`);
      if (!prevStep) return;
      
      // Update step display
      activeStep.classList.remove('active');
      prevStep.classList.add('active');
      
      // Update state
      window.WizardUtils.state.currentStep = currentStep - 1;
      
      // Update buttons
      nextButton.textContent = 'Next';
      nextButton.classList.remove('btn-calculate');
      if (currentStep - 1 <= 1) {
        this.setAttribute('disabled', 'disabled');
      }
      
      // Update progress
      updateProgress(currentStep - 1, wizardSteps.length);
      
      // Dispatch step change event
      const event = new CustomEvent('wizardStepChange', {
        detail: { 
          currentStep: currentStep - 1,
          totalSteps: wizardSteps.length
        }
      });
      document.dispatchEvent(event);
    });
    
    // Also handle calculate click if it exists separately
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', function() {
        // Switch from wizard to results
        const wizardContainer = document.getElementById('wizard-container');
        const resultsContainer = document.getElementById('results-container');
        
        if (wizardContainer && resultsContainer) {
          wizardContainer.classList.add('hidden');
          resultsContainer.classList.remove('hidden');
          
          // Update state
          window.WizardUtils.state.isComplete = true;
          
          // Trigger window resize to ensure charts render properly
          window.dispatchEvent(new Event('resize'));
          
          // Dispatch wizard complete event
          const event = new CustomEvent('wizardComplete', {
            detail: { totalSteps: wizardSteps.length }
          });
          document.dispatchEvent(event);
        }
      });
    }
  }
  
  function initializeProgressIndicators(totalSteps) {
    // Find progress container
    const progressSteps = document.getElementById('progress-steps');
    if (!progressSteps) return;
    
    // Clear existing indicators
    progressSteps.innerHTML = '';
    
    // Create step indicators
    for (let i = 1; i <= totalSteps; i++) {
      const step = document.createElement('div');
      step.className = `progress-step ${i === 1 ? 'active' : ''}`;
      step.setAttribute('data-step', i);
      
      const stepNumber = document.createElement('div');
      stepNumber.className = 'step-number';
      stepNumber.textContent = i;
      
      step.appendChild(stepNumber);
      progressSteps.appendChild(step);
    }
    
    // Initialize progress fill
    updateProgress(1, totalSteps);
  }
  
  function updateProgress(currentStep, totalSteps) {
    const progressFill = document.getElementById('wizard-progress-fill');
    const stepIndicators = document.querySelectorAll('.progress-step');
    
    if (progressFill) {
      const percentage = (currentStep / totalSteps) * 100;
      progressFill.style.width = `${percentage}%`;
    }
    
    if (stepIndicators.length > 0) {
      stepIndicators.forEach((indicator, index) => {
        if (index + 1 < currentStep) {
          indicator.classList.add('completed');
          indicator.classList.remove('active');
        } else if (index + 1 === currentStep) {
          indicator.classList.add('active');
          indicator.classList.remove('completed');
        } else {
          indicator.classList.remove('active', 'completed');
        }
      });
    }
  }
  
  // Public methods
  window.WizardUtils.goToStep = function(stepNumber) {
    const wizardSteps = document.querySelectorAll('.wizard-step');
    if (!wizardSteps || wizardSteps.length === 0) return false;
    
    if (stepNumber < 1 || stepNumber > wizardSteps.length) return false;
    
    // Find target step
    const targetStep = document.querySelector(`.wizard-step[data-step="${stepNumber}"]`);
    if (!targetStep) return false;
    
    // Hide current active step
    const activeStep = document.querySelector('.wizard-step.active');
    if (activeStep) {
      activeStep.classList.remove('active');
    }
    
    // Show target step
    targetStep.classList.add('active');
    
    // Update state
    window.WizardUtils.state.currentStep = stepNumber;
    
    // Update progress
    updateProgress(stepNumber, wizardSteps.length);
    
    // Update buttons
    const nextButton = document.getElementById('next-step');
    const prevButton = document.getElementById('prev-step');
    
    if (prevButton) {
      if (stepNumber <= 1) {
        prevButton.setAttribute('disabled', 'disabled');
      } else {
        prevButton.removeAttribute('disabled');
      }
    }
    
    if (nextButton) {
      if (stepNumber >= wizardSteps.length) {
        nextButton.textContent = 'Calculate';
        nextButton.classList.add('btn-calculate');
      } else {
        nextButton.textContent = 'Next';
        nextButton.classList.remove('btn-calculate');
      }
    }
    
    // Dispatch step change event
    const event = new CustomEvent('wizardStepChange', {
      detail: { 
        currentStep: stepNumber,
        totalSteps: wizardSteps.length
      }
    });
    document.dispatchEvent(event);
    
    return true;
  };
  
  // Complete wizard and show results
  window.WizardUtils.complete = function() {
    const wizardContainer = document.getElementById('wizard-container');
    const resultsContainer = document.getElementById('results-container');
    
    if (wizardContainer && resultsContainer) {
      wizardContainer.classList.add('hidden');
      resultsContainer.classList.remove('hidden');
      
      // Update state
      window.WizardUtils.state.isComplete = true;
      
      // Trigger window resize to ensure charts render properly
      window.dispatchEvent(new Event('resize'));
      
      // Dispatch wizard complete event
      const event = new CustomEvent('wizardComplete', {
        detail: { totalSteps: window.WizardUtils.state.totalSteps }
      });
      document.dispatchEvent(event);
      
      return true;
    }
    
    return false;
  };
  
  // Reset wizard to first step
  window.WizardUtils.reset = function() {
    const wizardContainer = document.getElementById('wizard-container');
    const resultsContainer = document.getElementById('results-container');
    
    if (wizardContainer && resultsContainer) {
      wizardContainer.classList.remove('hidden');
      resultsContainer.classList.add('hidden');
      
      // Go to first step
      window.WizardUtils.goToStep(1);
      
      // Update state
      window.WizardUtils.state.isComplete = false;
      
      return true;
    }
    
    return false;
  };
})();
EOF
  fi
  
  # Fix app-controller.js if it exists
  if [ -f "${JS_DIR}/app-controller.js" ]; then
    log "Fixing app-controller.js syntax error..."
    # Make a backup of the original file
    cp "${JS_DIR}/app-controller.js" "${JS_DIR}/app-controller.js.bak"
    
    # Fix the syntax error on line 192 (unexpected identifier 'i')
    sed -i.bak '192s/i/index/' "${JS_DIR}/app-controller.js" || warn "Failed to fix app-controller.js syntax error"
  fi

  log "JavaScript chart fixes created successfully"
}

# Create enhanced data for all vendors
create_enhanced_vendor_data() {
  log "Creating enhanced vendor data..."
  
  # Create vendor-data.js with all requested vendors
  cat > "${DATA_DIR}/vendors/vendor-data.js" << 'EOF'
/**
 * Comprehensive NAC Vendor Comparison Data 
 * Includes detailed information on features, pricing, and TCO for all major NAC vendors
 * Version: 2.1
 */

window.VendorData = {
  vendors: [
    {
      id: "portnox",
      name: "Portnox",
      description: "Cloud-native NAC solution with rapid deployment and low TCO",
      logo: "portnox-logo.svg",
      color: "#1E88E5",
      type: "cloud",
      badge: "Cloud Native",
      keyFeatures: [
        "True cloud-native architecture",
        "Zero hardware requirements",
        "Rapid deployment (hours to days)",
        "Advanced IoT fingerprinting (260K+ devices)",
        "Continuous compliance monitoring"
      ],
      deploymentOptions: ["cloud"],
      pricing: {
        model: "Subscription",
        initialCost: 0,
        perDeviceMonthly: 4.00,
        yearlyDiscount: 0.20,
        implementationCost: 5000,
        maintenanceCost: 0
      },
      implementation: {
        timeSmall: 1,  // days
        timeMedium: 3, // days
        timeLarge: 7,  // days
        complexity: "low",
        professionalServices: "minimal",
        trainingRequired: "minimal"
      },
      operationalOverhead: {
        fteRequirement: 0.2,
        maintainedBy: "vendor",
        upgradeCadence: "automatic",
        downtimePerYear: 0
      },
      featureScores: {
        deviceVisibility: 8,
        policyManagement: 9,
        guestAccess: 8,
        byodSupport: 9,
        cloudIntegration: 10,
        automatedRemediation: 9,
        thirdPartyIntegration: 9,
        scalability: 9,
        easeOfUse: 9,
        reporting: 8
      },
      complianceSupport: {
        hipaa: "full",
        pciDss: "full",
        gdpr: "full",
        nistCsf: "full",
        iso27001: "full",
        soc2: "full",
        ccpa: "partial",
        glba: "full",
        ferpa: "full",
        fisma: "full",
        nercCip: "full",
        cmmc: "full",
        hitrust: "full",
        disaStig: "full",
        nist800171: "full",
        sox: "partial"
      },
      industrySuitability: {
        healthcare: 9.5,
        financial: 9.0,
        retail: 9.5,
        education: 9.5,
        government: 8.5,
        manufacturing: 9.0
      },
      roi: {
        threeYear: 145,
        paybackPeriod: 8 // months
      }
    },
    {
      id: "cisco",
      name: "Cisco ISE",
      description: "Comprehensive on-premises NAC solution with extensive Cisco ecosystem integration",
      logo: "cisco-logo.svg",
      color: "#E53935",
      type: "on-premises",
      badge: "Market Leader",
      keyFeatures: [
        "Comprehensive feature set",
        "Deep Cisco integration",
        "Advanced TACACS+ support",
        "Advanced policy controls",
        "Extensive ecosystem integrations"
      ],
      deploymentOptions: ["on-premises", "cloud-hosted"],
      pricing: {
        model: "Subscription tiers",
        initialCost: 50000,
        perDeviceYearly: 40,
        implementationCost: 75000,
        maintenanceCost: 20000
      },
      implementation: {
        timeSmall: 14,   // days
        timeMedium: 45,  // days
        timeLarge: 120,  // days
        complexity: "high",
        professionalServices: "required",
        trainingRequired: "extensive"
      },
      operationalOverhead: {
        fteRequirement: 1.0,
        maintainedBy: "customer",
        upgradeCadence: "twice yearly",
        downtimePerYear: 16 // hours
      },
      featureScores: {
        deviceVisibility: 8,
        policyManagement: 9,
        guestAccess: 8,
        byodSupport: 8,
        cloudIntegration: 6,
        automatedRemediation: 8,
        thirdPartyIntegration: 9,
        scalability: 9,
        easeOfUse: 5,
        reporting: 8
      },
      complianceSupport: {
        hipaa: "full",
        pciDss: "full",
        gdpr: "partial",
        nistCsf: "full",
        iso27001: "full",
        soc2: "partial",
        ccpa: "partial",
        glba: "full",
        ferpa: "partial",
        fisma: "full",
        nercCip: "full",
        cmmc: "full",
        hitrust: "full",
        disaStig: "full",
        nist800171: "full",
        sox: "partial"
      },
      industrySuitability: {
        healthcare: 8.5,
        financial: 9.0,
        retail: 8.5,
        education: 8.0,
        government: 9.0,
        manufacturing: 8.5
      },
      roi: {
        threeYear: 87,
        paybackPeriod: 22 // months
      }
    },
    {
      id: "aruba",
      name: "Aruba ClearPass",
      description: "Full-featured NAC solution with excellent guest management capabilities",
      logo: "aruba-logo.svg",
      color: "#FB8C00",
      type: "on-premises",
      badge: null,
      keyFeatures: [
        "Superior guest management",
        "Multi-vendor support",
        "Wireless integration",
        "Extensive device profiling",
        "Flexible deployment options"
      ],
      deploymentOptions: ["on-premises", "cloud-hosted"],
      pricing: {
        model: "Perpetual or subscription",
        initialCost: 40000,
        perDeviceYearly: 35,
        implementationCost: 60000,
        maintenanceCost: 15000
      },
      implementation: {
        timeSmall: 10,   // days
        timeMedium: 35,  // days
        timeLarge: 90,   // days
        complexity: "medium-high",
        professionalServices: "recommended",
        trainingRequired: "moderate"
      },
      operationalOverhead: {
        fteRequirement: 0.7,
        maintainedBy: "customer",
        upgradeCadence: "quarterly",
        downtimePerYear: 12 // hours
      },
      featureScores: {
        deviceVisibility: 8,
        policyManagement: 8,
        guestAccess: 9,
        byodSupport: 9,
        cloudIntegration: 7,
        automatedRemediation: 8,
        thirdPartyIntegration: 8,
        scalability: 8,
        easeOfUse: 6,
        reporting: 8
      },
      complianceSupport: {
        hipaa: "full",
        pciDss: "full",
        gdpr: "partial",
        nistCsf: "full",
        iso27001: "full",
        soc2: "partial",
        ccpa: "partial",
        glba: "full",
        ferpa: "partial",
        fisma: "full",
        nercCip: "full",
        cmmc: "partial",
        hitrust: "full",
        disaStig: "partial",
        nist800171: "full",
        sox: "partial"
      },
      industrySuitability: {
        healthcare: 8.5,
        financial: 8.5,
        retail: 8.0,
        education: 8.5,
        government: 8.5,
        manufacturing: 8.0
      },
      roi: {
        threeYear: 78,
        paybackPeriod: 24 // months
      }
    },
    {
      id: "forescout",
      name: "Forescout",
      description: "Specialized device visibility and control with OT/IoT expertise",
      logo: "forescout-logo.svg",
      color: "#7E57C2",
      type: "on-premises",
      badge: null,
      keyFeatures: [
        "Superior device discovery",
        "Agentless operation",
        "OT/IoT security focus",
        "Advanced device profiling",
        "Strong operational technology support"
      ],
      deploymentOptions: ["on-premises", "cloud-hosted"],
      pricing: {
        model: "Subscription (moving from perpetual)",
        initialCost: 45000,
        perDeviceYearly: 50,
        implementationCost: 70000,
        maintenanceCost: 18000
      },
      implementation: {
        timeSmall: 10,   // days
        timeMedium: 25,  // days
        timeLarge: 75,   // days
        complexity: "medium-high",
        professionalServices: "recommended",
        trainingRequired: "moderate"
      },
      operationalOverhead: {
        fteRequirement: 0.8,
        maintainedBy: "customer",
        upgradeCadence: "quarterly",
        downtimePerYear: 10 // hours
      },
      featureScores: {
        deviceVisibility: 10,
        policyManagement: 8,
        guestAccess: 7,
        byodSupport: 7,
        cloudIntegration: 6,
        automatedRemediation: 9,
        thirdPartyIntegration: 9,
        scalability: 8,
        easeOfUse: 6,
        reporting: 9
      },
      complianceSupport: {
        hipaa: "full",
        pciDss: "full",
        gdpr: "partial",
        nistCsf: "full",
        iso27001: "full",
        soc2: "partial",
        ccpa: "partial",
        glba: "partial",
        ferpa: "partial",
        fisma: "full",
        nercCip: "full",
        cmmc: "partial",
        hitrust: "partial",
        disaStig: "partial",
        nist800171: "full",
        sox: "partial"
      },
      industrySuitability: {
        healthcare: 8.0,
        financial: 8.0,
        retail: 8.5,
        education: 7.5,
        government: 8.5,
        manufacturing: 9.5
      },
      roi: {
        threeYear: 65,
        paybackPeriod: 20 // months
      }
    },
    {
      id: "fortinac",
      name: "FortiNAC",
      description: "NAC solution with strong security fabric integration",
      logo: "fortinac-logo.svg",
      color: "#43A047",
      type: "on-premises",
      badge: null,
      keyFeatures: [
        "Fortinet Security Fabric integration",
        "Network access control",
        "IoT device discovery",
        "Endpoint protection",
        "Automated response capabilities"
      ],
      deploymentOptions: ["on-premises", "cloud-hosted"],
      pricing: {
        model: "Tiered (BASE/PLUS/PRO)",
        initialCost: 30000,
        perDeviceYearly: 30,
        implementationCost: 45000,
        maintenanceCost: 12000
      },
      implementation: {
        timeSmall: 14,   // days
        timeMedium: 30,  // days
        timeLarge: 60,   // days
        complexity: "medium",
        professionalServices: "recommended",
        trainingRequired: "moderate"
      },
      operationalOverhead: {
        fteRequirement: 0.6,
        maintainedBy: "customer",
        upgradeCadence: "quarterly",
        downtimePerYear: 8 // hours
      },
      featureScores: {
        deviceVisibility: 8,
        policyManagement: 7,
        guestAccess: 7,
        byodSupport: 7,
        cloudIntegration: 6,
        automatedRemediation: 7,
        thirdPartyIntegration: 7,
        scalability: 7,
        easeOfUse: 6,
        reporting: 7
      },
      complianceSupport: {
        hipaa: "partial",
        pciDss: "full",
        gdpr: "partial",
        nistCsf: "partial",
        iso27001: "partial",
        soc2: "partial",
        ccpa: "partial",
        glba: "partial",
        ferpa: "partial",
        fisma: "partial",
        nercCip: "partial",
        cmmc: "partial",
        hitrust: "partial",
        disaStig: "partial",
        nist800171: "partial",
        sox: "partial"
      },
      industrySuitability: {
        healthcare: 8.0,
        financial: 8.5,
        retail: 8.0,
        education: 7.0,
        government: 8.0,
        manufacturing: 8.5
      },
      roi: {
        threeYear: 92,
        paybackPeriod: 18 // months
      }
    },
    {
      id: "nps",
      name: "Microsoft NPS",
      description: "Basic authentication service included with Windows Server",
      logo: "microsoft-logo.svg",
      color: "#00897B",
      type: "on-premises",
      badge: null,
      keyFeatures: [
        "Windows integration",
        "Basic RADIUS functionality",
        "Minimal cost",
        "Simple setup",
        "Native Windows authentication"
      ],
      deploymentOptions: ["on-premises"],
      pricing: {
        model: "Included with Windows Server",
        initialCost: 5000,
        perDeviceYearly: 0,
        implementationCost: 15000,
        maintenanceCost: 5000
      },
      implementation: {
        timeSmall: 5,    // days
        timeMedium: 14,  // days
        timeLarge: 28,   // days
        complexity: "low-medium",
        professionalServices: "optional",
        trainingRequired: "minimal"
      },
      operationalOverhead: {
        fteRequirement: 0.3,
        maintainedBy: "customer",
        upgradeCadence: "with Windows updates",
        downtimePerYear: 6 // hours
      },
      featureScores: {
        deviceVisibility: 4,
        policyManagement: 5,
        guestAccess: 3,
        byodSupport: 3,
        cloudIntegration: 2,
        automatedRemediation: 2,
        thirdPartyIntegration: 3,
        scalability: 5,
        easeOfUse: 4,
        reporting: 3
      },
      complianceSupport: {
        hipaa: "partial",
        pciDss: "partial",
        gdpr: "none",
        nistCsf: "partial",
        iso27001: "partial",
        soc2: "none",
        ccpa: "none",
        glba: "partial",
        ferpa: "partial",
        fisma: "partial",
        nercCip: "none",
        cmmc: "none",
        hitrust: "none",
        disaStig: "none",
        nist800171: "partial",
        sox: "none"
      },
      industrySuitability: {
        healthcare: 5.0,
        financial: 5.0,
        retail: 5.5,
        education: 6.0,
        government: 6.0,
        manufacturing: 5.0
      },
      roi: {
        threeYear: 60,
        paybackPeriod: 15 // months
      }
    },
    {
      id: "securew2",
      name: "SecureW2",
      description: "Cloud-based certificate management and authentication",
      logo: "securew2-logo.svg",
      color: "#5E35B1",
      type: "cloud",
      badge: null,
      keyFeatures: [
        "Certificate expertise",
        "Cloud identity integration",
        "Passwordless authentication",
        "BYOD onboarding",
        "Eduroam support"
      ],
      deploymentOptions: ["cloud"],
      pricing: {
        model: "Subscription",
        initialCost: 0,
        perDeviceYearly: 31,
        implementationCost: 15000,
        maintenanceCost: 0
      },
      implementation: {
        timeSmall: 3,    // days
        timeMedium: 7,   // days
        timeLarge: 14,   // days
        complexity: "low-medium",
        professionalServices: "optional",
        trainingRequired: "moderate"
      },
      operationalOverhead: {
        fteRequirement: 0.25,
        maintainedBy: "vendor",
        upgradeCadence: "automatic",
        downtimePerYear: 2 // hours
      },
      featureScores: {
        deviceVisibility: 6,
        policyManagement: 7,
        guestAccess: 7,
        byodSupport: 9,
        cloudIntegration: 9,
        automatedRemediation: 6,
        thirdPartyIntegration: 6,
        scalability: 8,
        easeOfUse: 8,
        reporting: 7
      },
      complianceSupport: {
        hipaa: "partial",
        pciDss: "partial",
        gdpr: "partial",
        nistCsf: "partial",
        iso27001: "partial",
        soc2: "partial",
        ccpa: "none",
        glba: "partial",
        ferpa: "partial",
        fisma: "partial",
        nercCip: "none",
        cmmc: "partial",
        hitrust: "partial",
        disaStig: "partial",
        nist800171: "partial",
        sox: "none"
      },
      industrySuitability: {
        healthcare: 7.0,
        financial: 7.5,
        retail: 7.0,
        education: 9.0,
        government: 7.0,
        manufacturing: 6.5
      },
      roi: {
        threeYear: 95,
        paybackPeriod: 12 // months
      }
    },
    {
      id: "foxpass",
      name: "Foxpass",
      description: "Cloud-based authentication and directory services",
      logo: "foxpass-logo.svg",
      color: "#FF5722",
      type: "cloud",
      badge: null,
      keyFeatures: [
        "Cloud LDAP and RADIUS",
        "Two-factor authentication",
        "SSH key management",
        "Team management",
        "Directory synchronization"
      ],
      deploymentOptions: ["cloud"],
      pricing: {
        model: "Per-user subscription",
        initialCost: 0,
        perUserMonthly: 3.00,
        implementationCost: 5000,
        maintenanceCost: 0
      },
      implementation: {
        timeSmall: 2,    // days
        timeMedium: 5,   // days
        timeLarge: 10,   // days
        complexity: "low",
        professionalServices: "optional",
        trainingRequired: "minimal"
      },
      operationalOverhead: {
        fteRequirement: 0.2,
        maintainedBy: "vendor",
        upgradeCadence: "automatic",
        downtimePerYear: 1 // hours
      },
      featureScores: {
        deviceVisibility: 5,
        policyManagement: 6,
        guestAccess: 6,
        byodSupport: 7,
        cloudIntegration: 8,
        automatedRemediation: 5,
        thirdPartyIntegration: 6,
        scalability: 7,
        easeOfUse: 8,
        reporting: 6
      },
      complianceSupport: {
        hipaa: "partial",
        pciDss: "partial",
        gdpr: "partial",
        nistCsf: "partial",
        iso27001: "partial",
        soc2: "partial",
        ccpa: "none",
        glba: "partial",
        ferpa: "partial",
        fisma: "partial",
        nercCip: "none",
        cmmc: "none",
        hitrust: "none",
        disaStig: "none",
        nist800171: "partial",
        sox: "none"
      },
      industrySuitability: {
        healthcare: 6.0,
        financial: 6.5,
        retail: 7.0,
        education: 7.5,
        government: 6.0,
        manufacturing: 6.0
      },
      roi: {
        threeYear: 85,
        paybackPeriod: 10 // months
      }
    },
    {
      id: "arista",
      name: "Arista Agni",
      description: "Policy-based network management and secure access",
      logo: "arista-logo.svg",
      color: "#3949AB",
      type: "on-premises",
      badge: null,
      keyFeatures: [
        "Network access control",
        "Policy-based automation",
        "Wired and wireless management",
        "Integration with Arista portfolio",
        "Endpoint compliance checking"
      ],
      deploymentOptions: ["on-premises"],
      pricing: {
        model: "Subscription",
        initialCost: 35000,
        perDeviceYearly: 32,
        implementationCost: 50000,
        maintenanceCost: 12000
      },
      implementation: {
        timeSmall: 10,   // days
        timeMedium: 25,  // days
        timeLarge: 60,   // days
        complexity: "medium",
        professionalServices: "recommended",
        trainingRequired: "moderate"
      },
      operationalOverhead: {
        fteRequirement: 0.6,
        maintainedBy: "customer",
        upgradeCadence: "quarterly",
        downtimePerYear: 8 // hours
      },
      featureScores: {
	  deviceVisibility: 7,
        policyManagement: 8,
        guestAccess: 7,
        byodSupport: 7,
        cloudIntegration: 6,
        automatedRemediation: 7,
        thirdPartyIntegration: 7,
        scalability: 8,
        easeOfUse: 6,
        reporting: 7
      },
      complianceSupport: {
        hipaa: "partial",
        pciDss: "partial",
        gdpr: "partial",
        nistCsf: "partial",
        iso27001: "partial",
        soc2: "partial",
        ccpa: "none",
        glba: "partial",
        ferpa: "partial",
        fisma: "partial",
        nercCip: "partial",
        cmmc: "partial",
        hitrust: "partial",
        disaStig: "partial",
        nist800171: "partial",
        sox: "partial"
      },
      industrySuitability: {
        healthcare: 7.5,
        financial: 7.5,
        retail: 7.5,
        education: 7.0,
        government: 7.5,
        manufacturing: 7.5
      },
      roi: {
        threeYear: 75,
        paybackPeriod: 20 // months
      }
    },
    {
      id: "juniper",
      name: "Juniper Mist NAC",
      description: "AI-driven NAC solution for wired and wireless networks",
      logo: "juniper-logo.svg",
      color: "#8BC34A",
      type: "cloud",
      badge: null,
      keyFeatures: [
        "AI-driven operations",
        "Cloud management",
        "Wired and wireless integration",
        "Marvis Virtual Network Assistant",
        "User engagement analytics"
      ],
      deploymentOptions: ["cloud"],
      pricing: {
        model: "Subscription",
        initialCost: 10000,
        perDeviceYearly: 35,
        implementationCost: 30000,
        maintenanceCost: 5000
      },
      implementation: {
        timeSmall: 7,    // days
        timeMedium: 15,  // days
        timeLarge: 30,   // days
        complexity: "medium",
        professionalServices: "recommended",
        trainingRequired: "moderate"
      },
      operationalOverhead: {
        fteRequirement: 0.4,
        maintainedBy: "hybrid",
        upgradeCadence: "automatic",
        downtimePerYear: 4 // hours
      },
      featureScores: {
        deviceVisibility: 8,
        policyManagement: 8,
        guestAccess: 8,
        byodSupport: 8,
        cloudIntegration: 9,
        automatedRemediation: 8,
        thirdPartyIntegration: 7,
        scalability: 8,
        easeOfUse: 8,
        reporting: 9
      },
      complianceSupport: {
        hipaa: "partial",
        pciDss: "partial",
        gdpr: "partial",
        nistCsf: "partial",
        iso27001: "partial",
        soc2: "partial",
        ccpa: "partial",
        glba: "partial",
        ferpa: "partial",
        fisma: "partial",
        nercCip: "partial",
        cmmc: "partial",
        hitrust: "partial",
        disaStig: "partial",
        nist800171: "partial",
        sox: "partial"
      },
      industrySuitability: {
        healthcare: 8.0,
        financial: 8.0,
        retail: 8.5,
        education: 8.5,
        government: 7.5,
        manufacturing: 7.5
      },
      roi: {
        threeYear: 85,
        paybackPeriod: 15 // months
      }
    }
  ],
  
  // Create TCO calculation function
  calculateTCO: function(vendor, deviceCount, years, additionalParams) {
    const v = this.vendors.find(v => v.id === vendor);
    if (!v) return null;
    
    // Set default values
    additionalParams = additionalParams || {};
    const fteCostPerYear = additionalParams.fteCostPerYear || 150000;
    const volumeDiscount = Math.min((deviceCount >= 5000 ? 0.3 : deviceCount >= 1000 ? 0.15 : 0), additionalParams.volumeDiscount || 0);
    
    // Calculate costs
    let initialCost = v.pricing.initialCost;
    let implementationCost = v.pricing.implementationCost;
    let annualLicenseCost = 0;
    
    // Calculate annual licensing cost based on pricing model
    if (v.pricing.perDeviceMonthly) {
      // Apply volume and yearly discounts for monthly pricing
      const effectiveMonthlyRate = v.pricing.perDeviceMonthly * (1 - volumeDiscount) * (1 - (v.pricing.yearlyDiscount || 0));
      annualLicenseCost = effectiveMonthlyRate * 12 * deviceCount;
    } else if (v.pricing.perDeviceYearly) {
      // Apply volume discount for yearly pricing
      annualLicenseCost = v.pricing.perDeviceYearly * deviceCount * (1 - volumeDiscount);
    } else if (v.pricing.perUserMonthly) {
      // For user-based pricing, assume users = 80% of devices
      const userCount = Math.ceil(deviceCount * 0.8);
      const effectiveMonthlyRate = v.pricing.perUserMonthly * (1 - volumeDiscount);
      annualLicenseCost = effectiveMonthlyRate * 12 * userCount;
    }
    
    // Adjust implementation cost based on device count
    if (deviceCount >= 5000) {
      implementationCost *= 1.5;
    } else if (deviceCount >= 1000) {
      implementationCost *= 1.2;
    }
    
    // Calculate FTE costs based on vendor's FTE requirement
    const annualFteCost = v.operationalOverhead.fteRequirement * fteCostPerYear;
    
    // Calculate maintenance costs (if applicable)
    const annualMaintenanceCost = v.pricing.maintenanceCost;
    
    // Calculate total cost for each year
    const yearlyBreakdown = [];
    let cumulativeCost = 0;
    
    for (let i = 0; i < years; i++) {
      let yearlyCost = 0;
      
      // Add initial costs only in first year
      if (i === 0) {
        yearlyCost += initialCost + implementationCost;
      }
      
      // Add annual costs
      yearlyCost += annualLicenseCost + annualMaintenanceCost + annualFteCost;
      
      // Apply annual increases (license increases ~5% per year)
      if (i > 0) {
        yearlyCost *= 1.05;
      }
      
      cumulativeCost += yearlyCost;
      yearlyBreakdown.push({
        year: i + 1,
        cost: yearlyCost,
        cumulativeCost: cumulativeCost
      });
    }
    
    // Calculate cost components
    const totalInitialCost = initialCost + implementationCost;
    const totalOperationalCost = annualFteCost * years;
    const totalMaintenanceCost = (annualLicenseCost + annualMaintenanceCost) * years;
    const totalCost = totalInitialCost + totalOperationalCost + totalMaintenanceCost;
    
    // Return TCO calculation
    return {
      vendor: v.name,
      deviceCount: deviceCount,
      years: years,
      totalCost: totalCost,
      totalInitialCost: totalInitialCost,
      totalOperationalCost: totalOperationalCost,
      totalMaintenanceCost: totalMaintenanceCost,
      yearlyBreakdown: yearlyBreakdown,
      costPerDevice: totalCost / deviceCount,
      costPerDevicePerMonth: (totalCost / deviceCount) / (years * 12)
    };
  },
  
  // Get comparison data for visualization
  getComparisonData: function(deviceCount, years, additionalParams) {
    const results = {
      vendors: [],
      initialCosts: [],
      operationalCosts: [],
      maintenanceCosts: [],
      totalCosts: [],
      costPerDevice: [],
      colors: []
    };
    
    this.vendors.forEach(vendor => {
      const tco = this.calculateTCO(vendor.id, deviceCount, years, additionalParams);
      if (tco) {
        results.vendors.push(vendor.name);
        results.initialCosts.push(tco.totalInitialCost);
        results.operationalCosts.push(tco.totalOperationalCost);
        results.maintenanceCosts.push(tco.totalMaintenanceCost);
        results.totalCosts.push(tco.totalCost);
        results.costPerDevice.push(tco.costPerDevice);
        results.colors.push(vendor.color);
      }
    });
    
    return results;
  },
  
  // Get feature comparison data
  getFeatureComparisonData: function() {
    const features = [
      "Device Visibility",
      "Policy Management",
      "Guest Access",
      "BYOD Support",
      "Cloud Integration",
      "Automated Remediation",
      "Third-Party Integration",
      "Scalability",
      "Ease of Use",
      "Reporting"
    ];
    
    const vendorData = this.vendors.map(vendor => {
      return {
        name: vendor.name,
        color: vendor.color,
        scores: [
          vendor.featureScores.deviceVisibility,
          vendor.featureScores.policyManagement,
          vendor.featureScores.guestAccess,
          vendor.featureScores.byodSupport,
          vendor.featureScores.cloudIntegration,
          vendor.featureScores.automatedRemediation,
          vendor.featureScores.thirdPartyIntegration,
          vendor.featureScores.scalability,
          vendor.featureScores.easeOfUse,
          vendor.featureScores.reporting
        ]
      };
    });
    
    return {
      features: features,
      vendors: vendorData
    };
  },
  
  // Get implementation time comparison data
  getImplementationComparisonData: function(organizationSize) {
    const timeProperty = organizationSize === 'large' ? 'timeLarge' : 
                        organizationSize === 'medium' ? 'timeMedium' : 'timeSmall';
    
    return {
      vendors: this.vendors.map(v => v.name),
      implementationTimes: this.vendors.map(v => v.implementation[timeProperty]),
      colors: this.vendors.map(v => v.color)
    };
  },
  
  // Get ROI comparison data
  getRoiComparisonData: function() {
    return {
      vendors: this.vendors.map(v => v.name),
      roiValues: this.vendors.map(v => v.roi.threeYear),
      paybackPeriods: this.vendors.map(v => v.roi.paybackPeriod),
      colors: this.vendors.map(v => v.color)
    };
  },
  
  // Get deployment type breakdown
  getDeploymentTypeBreakdown: function() {
    const types = {
      cloud: 0,
      onPremises: 0,
      hybrid: 0
    };
    
    this.vendors.forEach(v => {
      if (v.type === 'cloud') {
        types.cloud++;
      } else if (v.type === 'on-premises') {
        types.onPremises++;
      } else {
        types.hybrid++;
      }
    });
    
    return {
      labels: ['Cloud-Native', 'On-Premises', 'Hybrid'],
      values: [types.cloud, types.onPremises, types.hybrid]
    };
  }
};
EOF
  
  log "Enhanced vendor data created successfully"
}

# Create industry and compliance data
create_industry_compliance_data() {
  log "Creating industry and compliance data..."
  
  # Create industry-data.js
  cat > "${DATA_DIR}/industry/industry-data.js" << 'EOF'
/**
 * Industry-specific NAC Requirements and Data
 * Enhanced data for TCO analysis and visualization
 * Version: 2.1
 */

window.IndustryData = {
  industries: {
    healthcare: {
      name: "Healthcare",
      icon: "fa-hospital",
      description: "Healthcare organizations face unique challenges in securing medical devices, patient data, and maintaining compliance with strict regulations like HIPAA while ensuring easy access for clinical staff.",
      challenges: [
        "Legacy medical devices with limited security capabilities",
        "Protected Health Information (PHI) security requirements",
        "Diverse user roles requiring different access privileges",
        "Need for 24/7 availability with minimal downtime",
        "IoMT (Internet of Medical Things) security"
      ],
      keyRequirements: [
        "Medical device identification and security",
        "PHI data protection and access control",
        "Clinical workflow optimization",
        "Guest network for patients and visitors",
        "Continuous compliance monitoring"
      ],
      benchmarks: {
        breachCost: "$9.8 million avg. per breach",
        implementationTime: "16-24 weeks (traditional) / 2-3 weeks (cloud)",
        fteCost: "$185,000 annually",
        downtimeImpact: "$690,000 per hour"
      },
      recommendations: "Healthcare organizations should prioritize solutions with strong medical device fingerprinting, HIPAA compliance automation, and minimal disruption to clinical workflows. Cloud-native solutions reduce implementation complexity and provide faster value realization.",
      complianceFrameworks: ["HIPAA", "HITECH", "HITRUST", "FDA Medical Device Regulations", "GDPR (for international)"],
      riskFactors: {
        breachProbability: 0.328, // 32.8% annual breach probability
        recordCost: 511,         // $511 per record
        downTimeImpact: 690000   // $690,000 per hour
      },
      cloudAdoption: "62%",      // Current cloud adoption rate
      recommendedVendors: ["portnox", "forescout", "aruba", "cisco"]
    },
    financial: {
      name: "Financial Services",
      icon: "fa-university",
      description: "Financial institutions must balance robust security with operational efficiency while managing complex regulatory requirements and protecting high-value targets from sophisticated threats.",
      challenges: [
        "High-value target for sophisticated threat actors",
        "Complex environment with numerous third-party integrations",
        "Significant regulatory penalties for non-compliance",
        "Legacy banking systems requiring specialized protection",
        "Protection of sensitive financial data"
      ],
      keyRequirements: [
        "Segmentation of cardholder data environments",
        "Multi-factor authentication for privileged access",
        "Detailed audit trails for regulatory examinations",
        "Protection for SWIFT and payment systems",
        "Third-party vendor access control"
      ],
      benchmarks: {
        breachCost: "$6.08 million avg. per breach",
        implementationTime: "12-20 weeks (traditional) / 2-3 weeks (cloud)",
        fteCost: "$210,000 annually",
        downtimeImpact: "$950,000 per hour"
      },
      recommendations: "Financial institutions should evaluate solutions with robust segmentation capabilities, detailed audit logging, and strong third-party access controls. Regulatory compliance requirements often necessitate comprehensive solutions, but cloud-native options can reduce complexity.",
      complianceFrameworks: ["PCI DSS", "SOX", "GLBA", "FFIEC Guidelines", "GDPR", "NYDFS Cybersecurity Regulation"],
      riskFactors: {
        breachProbability: 0.297, // 29.7% annual breach probability
        recordCost: 402,         // $402 per record
        downTimeImpact: 950000   // $950,000 per hour
      },
      cloudAdoption: "58%",      // Current cloud adoption rate
      recommendedVendors: ["cisco", "portnox", "aruba", "fortinac"]
    },
    retail: {
      name: "Retail",
      icon: "fa-shopping-cart",
      description: "Retail organizations balance customer experience with data protection across distributed locations, managing POS systems, guest WiFi, and seasonal staffing fluctuations with limited IT resources.",
      challenges: [
        "Distributed retail locations with limited IT staff",
        "Legacy POS systems requiring specialized protection",
        "Seasonal staffing requiring rapid onboarding/offboarding",
        "Public WiFi networks adjacent to payment systems",
        "High-volume customer data handling"
      ],
      keyRequirements: [
        "PCI DSS compliance for cardholder data protection",
        "Point-of-sale system security",
        "Guest WiFi management with promotional opportunities",
        "Support for seasonal staffing fluctuations",
        "Multi-site management with centralized reporting"
      ],
      benchmarks: {
        breachCost: "$4.24 million avg. per breach",
        implementationTime: "8-16 weeks (traditional) / 1-2 weeks (cloud)",
        fteCost: "$140,000 annually",
        downtimeImpact: "$320,000 per hour"
      },
      recommendations: "Retail organizations should focus on solutions that provide simplified multi-site management, easy guest access capabilities, and strong PCI DSS compliance. Cloud-based solutions are particularly valuable for distributed retail environments with limited IT resources.",
      complianceFrameworks: ["PCI DSS", "CCPA/CPRA", "GDPR"],
      riskFactors: {
        breachProbability: 0.236, // 23.6% annual breach probability
        recordCost: 218,         // $218 per record
        downTimeImpact: 320000   // $320,000 per hour
      },
      cloudAdoption: "70%",      // Current cloud adoption rate
      recommendedVendors: ["portnox", "juniper", "fortinac", "aruba"]
    },
    education: {
      name: "Education",
      icon: "fa-graduation-cap",
      description: "Educational institutions manage diverse user populations and device types with seasonal enrollment fluctuations, limited budgets, and growing security requirements while maintaining an open learning environment.",
      challenges: [
        "Large BYOD environment with limited control over devices",
        "Seasonal network usage patterns with enrollment spikes",
        "Open campus environments requiring segmented access",
        "Limited IT resources and budget constraints",
        "Balancing academic freedom with security requirements"
      ],
      keyRequirements: [
        "Student data protection (FERPA compliance)",
        "Secure BYOD support for students, faculty, and staff",
        "Visitor network management with easy self-registration",
        "Seasonal scaling capabilities for enrollment fluctuations",
        "Research network protection with specialized policies"
      ],
      benchmarks: {
        breachCost: "$3.85 million avg. per breach",
        implementationTime: "10-18 weeks (traditional) / 1-2 weeks (cloud)",
        fteCost: "$150,000 annually",
        downtimeImpact: "$175,000 per hour"
      },
      recommendations: "Educational institutions should prioritize solutions with strong BYOD onboarding capabilities, guest network management, and simplified administration. Cloud-based solutions with minimal hardware requirements help address budget constraints while improving manageability.",
      complianceFrameworks: ["FERPA", "GDPR", "COPPA", "CIPA", "HIPAA (for medical schools)"],
      riskFactors: {
        breachProbability: 0.246, // 24.6% annual breach probability
        recordCost: 187,         // $187 per record
        downTimeImpact: 175000   // $175,000 per hour
      },
      cloudAdoption: "75%",      // Current cloud adoption rate
      recommendedVendors: ["portnox", "securew2", "aruba", "juniper"]
    },
    government: {
      name: "Government",
      icon: "fa-landmark",
      description: "Government agencies manage sensitive information with strict compliance requirements, legacy systems, and complex authentication needs across multiple security domains.",
      challenges: [
        "Advanced persistent threats targeting government systems",
        "Legacy systems with extended lifecycle requirements",
        "Complex multi-level security requirements",
        "Strict regulatory compliance mandates",
        "Budget constraints with long procurement cycles"
      ],
      keyRequirements: [
        "FedRAMP/StateRAMP compliance for cloud deployments",
        "FIPS 140-2 validated cryptography for data protection",
        "PIV/CAC smart card integration for secure authentication",
        "Advanced persistent threat (APT) protection",
        "Detailed audit logging for security investigations"
      ],
      benchmarks: {
        breachCost: "$5.1 million avg. per breach",
        implementationTime: "18-30 weeks (traditional) / 3-6 weeks (cloud)",
        fteCost: "$195,000 annually",
        downtimeImpact: "$220,000 per hour"
      },
      recommendations: "Government organizations should evaluate solutions with strong compliance capabilities, support for PIV/CAC authentication, and comprehensive audit features. While traditional on-premises deployments remain common, cloud solutions with appropriate certifications are gaining acceptance.",
      complianceFrameworks: ["FISMA", "NIST 800-53", "CJIS", "CMMC", "FedRAMP"],
      riskFactors: {
        breachProbability: 0.267, // 26.7% annual breach probability
        recordCost: 272,         // $272 per record
        downTimeImpact: 220000   // $220,000 per hour
      },
      cloudAdoption: "48%",      // Current cloud adoption rate
      recommendedVendors: ["cisco", "portnox", "aruba", "forescout"]
    },
    manufacturing: {
      name: "Manufacturing",
      icon: "fa-industry",
      description: "Manufacturing environments blend IT and OT systems with critical production equipment, industrial IoT devices, and strict uptime requirements requiring specialized security approaches.",
      challenges: [
        "Legacy industrial equipment with minimal security features",
        "Operational technology with 24/7 uptime requirements",
        "Specialized industrial protocols requiring monitoring",
        "Supply chain vulnerabilities from third-party integrations",
        "Physical security integration requirements"
      ],
      keyRequirements: [
        "OT/IT network segmentation with industrial protocol support",
        "Legacy industrial system protection without agent requirements",
        "Production continuity with non-disruptive security",
        "ICS/SCADA system protection with specialized policies",
        "Supply chain security integration"
      ],
      benchmarks: {
        breachCost: "$5.56 million avg. per breach",
        implementationTime: "12-24 weeks (traditional) / 2-4 weeks (cloud)",
        fteCost: "$165,000 annually",
        downtimeImpact: "$570,000 per hour"
      },
      recommendations: "Manufacturing organizations should prioritize solutions with strong OT/IT security capabilities, agentless device discovery, and minimal production disruption. Cloud solutions with local enforcement points can provide the necessary uptime protection while simplifying management.",
      complianceFrameworks: ["IEC 62443", "NIST 800-82", "NERC CIP", "CMMC", "ISO 27001"],
      riskFactors: {
        breachProbability: 0.257, // 25.7% annual breach probability
        recordCost: 241,         // $241 per record
        downTimeImpact: 570000   // $570,000 per hour
      },
      cloudAdoption: "65%",      // Current cloud adoption rate
      recommendedVendors: ["forescout", "portnox", "fortinac", "cisco"]
    }
  },
  
  // Get industry-specific data
  getIndustryData: function(industryId) {
    return this.industries[industryId] || null;
  },
  
  // Generate industry-specific TCO comparison
  getIndustryTcoComparison: function(industryId, deviceCount, years) {
    const industry = this.getIndustryData(industryId);
    if (!industry) return null;
    
    // Get TCO comparison data from VendorData
    const tcoData = window.VendorData.getComparisonData(deviceCount, years);
    
    // Apply industry-specific adjustments
    // This factors in industry-specific requirements that may impact costs
    const adjustedData = {
      ...tcoData,
      initialCosts: [...tcoData.initialCosts],
      operationalCosts: [...tcoData.operationalCosts],
      maintenanceCosts: [...tcoData.maintenanceCosts],
      totalCosts: [...tcoData.totalCosts]
    };
    
    // Apply industry-specific cost factors
    for (let i = 0; i < tcoData.vendors.length; i++) {
      const vendorName = tcoData.vendors[i].toLowerCase();
      let vendorId = '';
      
      // Map vendor name to ID
      if (vendorName.includes('portnox')) vendorId = 'portnox';
      else if (vendorName.includes('cisco')) vendorId = 'cisco';
      else if (vendorName.includes('aruba')) vendorId = 'aruba';
      else if (vendorName.includes('forescout')) vendorId = 'forescout';
      else if (vendorName.includes('fortinac')) vendorId = 'fortinac';
      else if (vendorName.includes('nps')) vendorId = 'nps';
      else if (vendorName.includes('securew2')) vendorId = 'securew2';
      else if (vendorName.includes('juniper')) vendorId = 'juniper';
      else if (vendorName.includes('foxpass')) vendorId = 'foxpass';
      else if (vendorName.includes('arista')) vendorId = 'arista';
      
      // Get vendor's suitability score for this industry (0-10)
      const vendorObj = window.VendorData.vendors.find(v => v.id === vendorId);
      if (!vendorObj) continue;
      
      const suitabilityScore = vendorObj.industrySuitability[industryId] || 7.5;
      
      // Apply adjustment factor based on suitability
      // Higher suitability means lower total cost (better fit = less customization)
      const adjustmentFactor = 1 - ((suitabilityScore - 7.5) * 0.03);
      
      // Apply adjustment to costs
      adjustedData.operationalCosts[i] *= adjustmentFactor;
      adjustedData.maintenanceCosts[i] *= adjustmentFactor;
      
      // Recalculate total costs
      adjustedData.totalCosts[i] = adjustedData.initialCosts[i] + 
                                  adjustedData.operationalCosts[i] + 
                                  adjustedData.maintenanceCosts[i];
    }
    
    return adjustedData;
  },
  
  // Get industry-specific compliance data
  getIndustryComplianceData: function(industryId) {
    const industry = this.getIndustryData(industryId);
    if (!industry) return null;
    
    // Get compliance frameworks for this industry
    const frameworks = industry.complianceFrameworks;
    
    // Get vendor compliance scores for these frameworks
    const vendorData = [];
    
    window.VendorData.vendors.forEach(vendor => {
      const compliance = [];
      
      frameworks.forEach(framework => {
        // Convert framework name to ID (lowercase, no spaces)
        const frameworkId = framework.toLowerCase()
                                    .replace(/[\s-]/g, '')
                                    .replace('/', '')
                                    .replace('(', '')
                                    .replace(')', '');
        
        // Get compliance score for this vendor and framework
        let score = 0;
        
        // Map framework name to compliance property
        const complianceMap = {
          'hipaa': 'hipaa',
          'hitech': 'hipaa', // Map HITECH to HIPAA
          'hitrust': 'hitrust',
          'fdamedicaldeviceregulations': 'hipaa', // Map FDA to HIPAA
          'gdpr': 'gdpr',
          'pcidss': 'pciDss',
          'sox': 'sox',
          'glba': 'glba',
          'ffiecguidelines': 'glba', // Map FFIEC to GLBA
          'nydfscybersecurityregulation': 'glba', // Map NYDFS to GLBA
          'ccpacpra': 'ccpa',
          'ferpa': 'ferpa',
          'coppa': 'ferpa', // Map COPPA to FERPA
          'cipa': 'ferpa', // Map CIPA to FERPA
          'fisma': 'fisma',
          'nist80053': 'fisma', // Map NIST 800-53 to FISMA
          'cjis': 'fisma', // Map CJIS to FISMA
          'cmmc': 'cmmc',
          'fedramp': 'fisma', // Map FedRAMP to FISMA
          'iec62443': 'nercCip', // Map IEC 62443 to NERC CIP
          'nist80082': 'nist800171', // Map NIST 800-82 to NIST 800-171
          'nerccip': 'nercCip',
          'iso27001': 'iso27001'
        };
        
        // Get compliance property
        const complianceProp = complianceMap[frameworkId] || frameworkId;
        
        // Map compliance level to score
        if (vendor.complianceSupport[complianceProp] === 'full') {
          score = 95;
        } else if (vendor.complianceSupport[complianceProp] === 'partial') {
          score = 70;
        } else {
          score = 40;
        }
        
        compliance.push(score);
      });
      
      vendorData.push({
        name: vendor.name,
        color: vendor.color,
        compliance: compliance
      });
    });
    
    return {
      industryName: industry.name,
      frameworks: frameworks,
      vendors: vendorData
    };
  },
  
  // Get risk analysis data for an industry
  getIndustryRiskAnalysis: function(industryId) {
    const industry = this.getIndustryData(industryId);
    if (!industry) return null;
    
    // Risk categories
    const categories = [
      "Unauthorized Access",
      "Data Breaches",
      "Compliance Violations",
      "Operational Disruption",
      "Lateral Movement"
    ];
    
    // Get vendor risk reduction capabilities
    const vendorData = [];
    
    window.VendorData.vendors.forEach(vendor => {
      // Calculate risk reduction scores based on feature scores and suitability
      const suitabilityScore = vendor.industrySuitability[industryId] || 7.0;
      
      // Calculate risk reduction scores for each category
      // Formula combines feature scores and industry suitability
      const unauthorizedAccess = Math.round((vendor.featureScores.policyManagement * 0.4 + 
                               vendor.featureScores.deviceVisibility * 0.3 + 
                               vendor.featureScores.byodSupport * 0.3) * 
                               (suitabilityScore / 8.5) * 10);
      
      const dataBreaches = Math.round((vendor.featureScores.policyManagement * 0.3 + 
                         vendor.featureScores.cloudIntegration * 0.3 + 
                         vendor.featureScores.thirdPartyIntegration * 0.4) * 
                         (suitabilityScore / 8.5) * 10);
      
      const complianceViolations = Math.round((vendor.featureScores.reporting * 0.4 + 
                                vendor.featureScores.policyManagement * 0.3 + 
                                vendor.featureScores.deviceVisibility * 0.3) * 
                                (suitabilityScore / 8.5) * 10);
      
      const operationalDisruption = Math.round((vendor.featureScores.automatedRemediation * 0.4 + 
                                  vendor.featureScores.easeOfUse * 0.3 + 
                                  vendor.featureScores.scalability * 0.3) * 
                                  (suitabilityScore / 8.5) * 10);
      
      const lateralMovement = Math.round((vendor.featureScores.policyManagement * 0.4 + 
                            vendor.featureScores.automatedRemediation * 0.3 + 
                            vendor.featureScores.deviceVisibility * 0.3) * 
                            (suitabilityScore / 8.5) * 10);
      
      vendorData.push({
        name: vendor.name,
        color: vendor.color,
        reductions: [
          Math.min(unauthorizedAccess, 95), // Cap at 95%
          Math.min(dataBreaches, 95),
          Math.min(complianceViolations, 95),
          Math.min(operationalDisruption, 95),
          Math.min(lateralMovement, 95)
        ]
      });
    });
    
    return {
      industryName: industry.name,
      categories: categories,
      vendors: vendorData
    };
  }
};
EOF

  # Create compliance-data.js
  cat > "${DATA_DIR}/compliance/compliance-data.js" << 'EOF'
/**
 * Compliance Framework Mapping and Requirements
 * Enhanced data for TCO analysis and visualization
 * Version: 2.1
 */

window.ComplianceData = {
  frameworks: [
    {
      id: "hipaa",
      name: "HIPAA",
      fullName: "Health Insurance Portability and Accountability Act",
      category: "Healthcare",
      description: "U.S. legislation that provides data privacy and security provisions for safeguarding medical information.",
      year: 1996,
      nacRelevance: "High",
      regions: ["United States"],
      penalties: "Up to $1.5 million per violation category per year",
      keyRequirements: [
        "Access controls and authentication",
        "Audit controls and logging",
        "Transmission security",
        "Device and media controls",
        "Risk analysis and management"
      ],
      controlMapping: [
        {
          controlId: "164.312(a)(1)",
          controlName: "Access Control",
          requirement: "Implement technical policies and procedures for electronic information systems that maintain electronic protected health information to allow access only to those persons or software programs that have been granted access rights.",
          nacRelevance: "Critical"
        },
        {
          controlId: "164.312(b)",
          controlName: "Audit Controls",
          requirement: "Implement hardware, software, and/or procedural mechanisms that record and examine activity in information systems that contain or use electronic protected health information.",
          nacRelevance: "Critical"
        },
        {
          controlId: "164.312(c)(1)",
          controlName: "Integrity",
          requirement: "Implement policies and procedures to protect electronic protected health information from improper alteration or destruction.",
          nacRelevance: "High"
        },
        {
          controlId: "164.312(d)",
          controlName: "Person or Entity Authentication",
          requirement: "Implement procedures to verify that a person or entity seeking access to electronic protected health information is the one claimed.",
          nacRelevance: "Critical"
        },
        {
          controlId: "164.312(e)(1)",
          controlName: "Transmission Security",
          requirement: "Implement technical security measures to guard against unauthorized access to electronic protected health information that is being transmitted over an electronic communications network.",
          nacRelevance: "High"
        }
      ],
      vendorCapabilities: {
        portnox: {
          coverage: 95,
          keyAdvantages: [
            "Automatic device identification for medical equipment",
            "Comprehensive audit logging for compliance evidence",
            "Secure network access controls for PHI protection",
            "Role-based access policies for healthcare environments",
            "Automated compliance reporting for audits"
          ]
        },
        cisco: {
          coverage: 85,
          keyAdvantages: [
            "Detailed policy control for PHI access",
            "Advanced network segmentation",
            "Integration with Cisco security ecosystem",
            "Comprehensive auditing capabilities",
            "Mature device profiling for medical devices"
          ]
        },
        aruba: {
          coverage: 85,
          keyAdvantages: [
            "Strong healthcare customer base",
            "ClearPass Device Insight for medical device discovery",
            "Integration with clinical workflows",
            "Strong guest access for patient networks",
            "Detailed audit capabilities"
          ]
        },
        forescout: {
          coverage: 80,
          keyAdvantages: [
            "Superior medical device discovery",
            "Agentless approach ideal for medical devices",
            "Strong OT security for medical environments",
            "Detailed device classification",
            "Risk-based policy enforcement"
          ]
        }
      }
    },
    {
      id: "pci-dss",
      name: "PCI DSS",
      fullName: "Payment Card Industry Data Security Standard",
      category: "Financial",
      description: "Information security standard for organizations that handle branded credit cards.",
      year: 2004,
      nacRelevance: "High",
      regions: ["Global"],
      penalties: "Fines from $5,000 to $500,000, plus potential suspension of card processing",
      keyRequirements: [
        "Secure network architecture",
        "Cardholder data protection",
        "Vulnerability management",
        "Strong access control measures",
        "Network monitoring and testing"
      ],
      controlMapping: [
        {
          controlId: "1.3",
          controlName: "Network Segmentation",
          requirement: "Prohibit direct public access between the Internet and any system component in the cardholder data environment.",
          nacRelevance: "Critical"
        },
        {
          controlId: "7.2",
          controlName: "Access Control",
          requirement: "Establish an access control system(s) for systems components that restricts access based on a user's need to know, and is set to 'deny all' unless specifically allowed.",
          nacRelevance: "Critical"
        },
        {
          controlId: "8.1",
          controlName: "Identification and Authentication",
          requirement: "Define and implement policies and procedures to ensure proper user identification management for non-consumer users and administrators on all system components.",
          nacRelevance: "Critical"
        },
        {
          controlId: "9.1",
          controlName: "Physical Access",
          requirement: "Use appropriate facility entry controls to limit and monitor physical access to systems in the cardholder data environment.",
          nacRelevance: "Medium"
        },
        {
          controlId: "10.2",
          controlName: "Audit Logging",
          requirement: "Implement automated audit trails for all system components to reconstruct events for all system components.",
          nacRelevance: "High"
        },
        {
          controlId: "11.4",
          controlName: "Intrusion Detection",
          requirement: "Use intrusion-detection and/or intrusion-prevention techniques to detect and/or prevent intrusions into the network.",
          nacRelevance: "High"
        }
      ],
      vendorCapabilities: {
        portnox: {
          coverage: 90,
          keyAdvantages: [
            "Network segmentation for cardholder data environments",
            "Automatic enforcement of security policies for POS systems",
            "Real-time monitoring of device compliance",
            "Continuous validation of network security controls",
            "Simplified audit preparation with detailed reporting"
          ]
        },
        cisco: {
          coverage: 90,
          keyAdvantages: [
            "Mature segmentation capabilities",
            "Integration with Cisco security stack",
            "Advanced policy controls for PCI environments",
            "Strong audit trail capabilities",
            "Market leadership in PCI environments"
          ]
        },
        aruba: {
          coverage: 80,
          keyAdvantages: [
            "Retail-focused policy templates",
            "Advanced guest management for retail",
            "Wireless security for retail environments",
            "Integration with retail management systems",
            "Context-aware policy enforcement"
          ]
        },
        fortinac: {
          coverage: 85,
          keyAdvantages: [
            "Integration with Fortinet Security Fabric",
            "Cost-effective PCI compliance",
            "Automated remediation capabilities",
            "Strong endpoint protection integration",
            "Threat response automation"
          ]
        }
      }
    },
    {
      id: "gdpr",
      name: "GDPR",
      fullName: "General Data Protection Regulation",
      category: "Privacy",
      description: "Regulation on data protection and privacy in the European Union and the European Economic Area.",
      year: 2018,
      nacRelevance: "Medium",
      regions: ["European Union", "EEA", "Companies serving EU citizens"],
      penalties: "Up to €20 million or 4% of global annual revenue, whichever is higher",
      keyRequirements: [
        "Lawful basis for processing data",
        "Data subject consent",
        "Data protection by design",
        "Security of processing",
        "Breach notification"
      ],
      controlMapping: [
        {
          controlId: "Art. 25",
          controlName: "Data Protection by Design",
          requirement: "Implement appropriate technical and organizational measures for ensuring that, by default, only personal data which are necessary for each specific purpose of the processing are processed.",
          nacRelevance: "High"
        },
        {
          controlId: "Art. 32",
          controlName: "Security of Processing",
          requirement: "Implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including the pseudonymization and encryption of personal data.",
          nacRelevance: "Critical"
        },
        {
          controlId: "Art. 33",
          controlName: "Breach Notification",
          requirement: "In the case of a personal data breach, notify the appropriate supervisory authority without undue delay and, where feasible, not later than 72 hours after having become aware of it.",
          nacRelevance: "Medium"
        },
        {
          controlId: "Art. 35",
          controlName: "Data Protection Impact Assessment",
          requirement: "Where processing is likely to result in a high risk to the rights and freedoms of natural persons, the controller shall, prior to the processing, carry out an assessment of the impact of the envisaged processing operations on the protection of personal data.",
          nacRelevance: "Medium"
        }
      ],
      vendorCapabilities: {
        portnox: {
          coverage: 95,
          keyAdvantages: [
            "Granular access controls for personal data systems",
            "Detailed audit trails for data access events",
            "Network segmentation to protect sensitive data environments",
            "Risk-based authentication for processors of personal data",
            "Rapid response capabilities for data breach scenarios"
          ]
        },
        cisco: {
          coverage: 75,
          keyAdvantages: [
            "Advanced network segmentation",
            "Strong audit capabilities for data access",
            "Integration with Cisco privacy solutions",
            "Policy enforcement across distributed environments",
            "Support for international deployments"
          ]
        },
        aruba: {
          coverage: 75,
          keyAdvantages: [
            "Role-based access control for data protection",
            "Data visibility and access monitoring",
            "User-entity behavioral analytics",
            "Strong guest identity management",
            "Dynamic network segmentation"
          ]
        },
        securew2: {
          coverage: 70,
          keyAdvantages: [
            "Certificate-based identity verification",
            "Strong authentication protocols",
            "Cloud identity integration",
            "Passwordless authentication reducing breach risks",
            "Simplified identity management"
          ]
        }
      }
    },
    {
      id: "nist-csf",
      name: "NIST CSF",
      fullName: "NIST Cybersecurity Framework",
      category: "Cybersecurity",
      description: "Voluntary framework consisting of standards, guidelines, and best practices to manage cybersecurity risk.",
      year: 2014,
      nacRelevance: "High",
      regions: ["United States", "Global Adoption"],
      penalties: "No direct penalties (compliance framework)",
      keyRequirements: [
        "Identify security risks",
        "Protect critical infrastructure",
        "Detect cybersecurity events",
        "Respond to detected events",
        "Recover from cybersecurity incidents"
      ],
      controlMapping: [
        {
          controlId: "ID.AM",
          controlName: "Asset Management",
          requirement: "The data, personnel, devices, systems, and facilities that enable the organization to achieve business purposes are identified and managed consistent with their relative importance to organizational objectives and the organization's risk strategy.",
          nacRelevance: "Critical"
        },
        {
          controlId: "PR.AC",
          controlName: "Access Control",
          requirement: "Access to physical and logical assets and associated facilities is limited to authorized users, processes, and devices, and is managed consistent with the assessed risk of unauthorized access to authorized activities and transactions.",
          nacRelevance: "Critical"
        },
        {
          controlId: "PR.DS",
          controlName: "Data Security",
          requirement: "Information and records (data) are managed consistent with the organization's risk strategy to protect the confidentiality, integrity, and availability of information.",
          nacRelevance: "High"
        },
        {
          controlId: "DE.CM",
          controlName: "Continuous Monitoring",
          requirement: "The information system and assets are monitored to identify cybersecurity events and verify the effectiveness of protective measures.",
          nacRelevance: "High"
        },
        {
          controlId: "RS.MI",
          controlName: "Mitigation",
          requirement: "Activities are performed to prevent expansion of an event, mitigate its effects, and resolve the incident.",
          nacRelevance: "Medium"
        }
      ],
      vendorCapabilities: {
        portnox: {
          coverage: 90,
          keyAdvantages: [
            "Comprehensive device visibility aligned with Identify function",
            "Network access controls implementing Protect function",
            "Real-time monitoring supporting Detect function",
            "Automated response capabilities for Response function",
            "Resilient architecture contributing to Recover function"
          ]
        },
        cisco: {
          coverage: 90,
          keyAdvantages: [
            "Comprehensive security ecosystem alignment",
            "Advanced threat detection and response",
            "Extensive integration capabilities",
            "Mature security policy framework",
            "Enterprise-scale security architecture"
          ]
        },
        forescout: {
          coverage: 85,
          keyAdvantages: [
            "Superior asset discovery capabilities",
            "Deep device visibility and context",
            "Agentless monitoring approach",
            "Automated threat response",
            "Strong integration with security tools"
          ]
        },
        fortinac: {
          coverage: 80,
          keyAdvantages: [
            "Integration with broader Fortinet ecosystem",
            "Unified security management",
            "Automated threat response",
            "Event correlation capabilities",
            "Multi-vendor device support"
          ]
        }
      }
    },
    {
      id: "cmmc",
      name: "CMMC 2.0",
      fullName: "Cybersecurity Maturity Model Certification",
      category: "Defense",
      description: "Unified standard for implementing cybersecurity across the Defense Industrial Base.",
      year: 2020,
      nacRelevance: "High",
      regions: ["United States"],
      penalties: "Loss of eligibility for defense contracts",
      keyRequirements: [
        "Access Control",
        "Asset Management",
        "Audit and Accountability",
        "Configuration Management",
        "Identification and Authentication"
      ],
      controlMapping: [
        {
          controlId: "AC.L2-3.1.1",
          controlName: "Access Control",
          requirement: "Limit information system access to authorized users, processes acting on behalf of authorized users, and devices (including other information systems).",
          nacRelevance: "Critical"
        },
        {
          controlId: "AC.L2-3.1.2",
          controlName: "Transaction Authorization",
          requirement: "Limit information system access to the types of transactions and functions that authorized users are permitted to execute.",
          nacRelevance: "Critical"
        },
        {
          controlId: "IA.L2-3.5.1",
          controlName: "Identification",
          requirement: "Identify information system users, processes acting on behalf of users, and devices.",
          nacRelevance: "Critical"
        },
        {
          controlId: "IA.L2-3.5.2",
          controlName: "Authentication",
          requirement: "Authenticate (or verify) the identities of users, processes, or devices, as a prerequisite to allowing access to organizational information systems.",
          nacRelevance: "Critical"
        },
        {
          controlId: "SC.L2-3.13.1",
          controlName: "Network Segmentation",
          requirement: "Monitor, control, and protect communications (i.e., information transmitted or received by organizational information systems) at the external boundaries and key internal boundaries of information systems.",
          nacRelevance: "High"
        }
      ],
      vendorCapabilities: {
        portnox: {
          coverage: 85,
          keyAdvantages: [
            "Implementation of access control practices (AC.1.001-AC.3.014)",
            "Support for identification and authentication (IA.1.076-IA.3.083)",
            "System and communications protection capabilities (SC.1.175-SC.5.208)",
            "Audit and accountability features (AU.2.041-AU.3.046)",
            "System and information integrity controls (SI.1.210-SI.5.222)"
          ]
        },
        cisco: {
          coverage: 90,
          keyAdvantages: [
            "Comprehensive security controls for defense contractors",
            "Advanced segmentation for CUI protection",
            "Mature authentication framework",
            "Policy enforcement across distributed environments",
            "Strong audit capabilities for verification"
          ]
        },
        aruba: {
          coverage: 85,
          keyAdvantages: [
            "Dynamic segmentation for CUI",
            "Role-based access control",
            "Zero trust network implementation",
            "Device compliance verification",
            "Military-grade encryption support"
          ]
        },
        forescout: {
          coverage: 80,
          keyAdvantages: [
            "Continuous monitoring of connected devices",
            "Agentless device discovery",
            "Advanced compliance validation",
            "Network segmentation enforcement",
            "Real-time remediation actions"
          ]
        }
      }
    }
  ],
  
  // Get framework by ID
  getFramework: function(frameworkId) {
    return this.frameworks.find(f => f.id === frameworkId) || null;
  },
  
  // Get all frameworks
  getAllFrameworks: function() {
    return this.frameworks;
  },
  
  // Get frameworks by category
  getFrameworksByCategory: function(category) {
    return this.frameworks.filter(f => f.category === category);
  },
  
  // Get frameworks relevant to an industry
  getFrameworksForIndustry: function(industryId) {
    switch(industryId) {
      case 'healthcare':
        return this.frameworks.filter(f => 
          ['hipaa', 'nist-csf'].includes(f.id)
        );
      case 'financial':
        return this.frameworks.filter(f => 
          ['pci-dss', 'nist-csf', 'gdpr'].includes(f.id)
        );
      case 'retail':
        return this.frameworks.filter(f => 
          ['pci-dss', 'gdpr'].includes(f.id)
        );
      case 'education':
        return this.frameworks.filter(f => 
          ['gdpr', 'nist-csf'].includes(f.id)
        );
      case 'government':
        return this.frameworks.filter(f => 
          ['cmmc', 'nist-csf'].includes(f.id)
        );
      case 'manufacturing':
        return this.frameworks.filter(f => 
          ['nist-csf', 'cmmc'].includes(f.id)
        );
      default:
        return this.frameworks;
    }
  },
  
  // Get vendor support for a framework
  getVendorSupport: function(frameworkId) {
    const framework = this.getFramework(frameworkId);
    if (!framework) return null;
    
    return framework.vendorCapabilities;
  },
  
  // Get NAC-specific controls for a framework
  getNacControls: function(frameworkId) {
    const framework = this.getFramework(frameworkId);
    if (!framework) return null;
    
    return framework.controlMapping || [];
  },
  
  // Get compliance coverage data for visualization
  getComplianceCoverageData: function() {
    // Prepare data structure for visualization
    const frameworkNames = this.frameworks.map(f => f.name);
    const vendorData = [];
    
    // Get vendor compliance scores for each framework
    window.VendorData.vendors.forEach(vendor => {
      const coverage = [];
      
      this.frameworks.forEach(framework => {
        // Map compliance level to score
        let score = 0;
        if (vendor.complianceSupport[framework.id] === 'full') {
          score = 95;
        } else if (vendor.complianceSupport[framework.id] === 'partial') {
          score = 70;
        } else {
          score = 40;
        }
        
        coverage.push(score);
      });
      
      vendorData.push({
        name: vendor.name,
        color: vendor.color,
        compliance: coverage
      });
    });
    
    return {
      frameworks: frameworkNames,
      vendors: vendorData
    };
  }
};
EOF

  log "Industry and compliance data created successfully"
}

# Create industry and compliance tabs
create_industry_compliance_tab() {
  log "Creating industry and compliance tab..."
  
  # Create CSS for industry and compliance tab
  cat > "${CSS_DIR}/industry-compliance.css" << 'EOF'
/* Industry & Compliance Tab Styles */

.industry-compliance-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.panel-controls {
  display: flex;
  gap: 1rem;
  background-color: var(--bg-light, #f8f9fa);
  padding: 1rem;
  border-radius: 0.5rem;
  flex-wrap: wrap;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.control-group label {
  font-weight: 500;
  white-space: nowrap;
}

.industry-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.industry-icon {
  background-color: var(--primary-color-light, rgba(30, 136, 229, 0.1));
  color: var(--primary-color, #1e88e5);
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
}

.industry-title {
  flex: 1;
}

.industry-title h2 {
  margin: 0 0 0.25rem 0;
  color: var(--primary-color, #1e88e5);
}

.industry-title .subtitle {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-light, #6c757d);
}

.industry-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.info-card, .recommendation-card {
  background-color: var(--bg-light, #f8f9fa);
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.info-card h3, .recommendation-card h3 {
  margin-top: 0;
  color: var(--primary-color, #1e88e5);
  font-size: 1.1rem;
  border-bottom: 1px solid var(--border-color, #dee2e6);
  padding-bottom: 0.5rem;
}

.bullet-list {
  margin: 0;
  padding-left: 1.5rem;
}

.bullet-list li {
  margin-bottom: 0.5rem;
}

.benchmark-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
}

.benchmark-item {
  display: flex;
  flex-direction: column;
}

.benchmark-label {
  font-size: 0.8rem;
  color: var(--text-light, #6c757d);
}

.benchmark-value {
  font-weight: 500;
  font-size: 0.95rem;
}

.compliance-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.compliance-badge {
  background-color: var(--primary-color-light, rgba(30, 136, 229, 0.1));
  color: var(--primary-color, #1e88e5);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
}

.note {
  font-size: 0.8rem;
  color: var(--text-light, #6c757d);
  font-style: italic;
}

.recommended-vendors {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.vendor-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid;
  border-radius: 0.5rem;
  padding: 0.5rem;
  min-width: 100px;
  text-align: center;
}

.vendor-name {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.vendor-score {
  font-size: 0.8rem;
  background-color: rgba(0,0,0,0.05);
  padding: 0.1rem 0.5rem;
  border-radius: 1rem;
}

.chart-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.chart-card {
  background-color: var(--bg-light, #f8f9fa);
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chart-card h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: var(--primary-color, #1e88e5);
}

.chart-container {
  height: 300px;
  position: relative;
}

.compliance-header {
  margin-bottom: 1.5rem;
}

.compliance-header h2 {
  margin: 0 0 0.5rem 0;
  color: var(--primary-color, #1e88e5);
}

.compliance-header .full-name {
  font-weight: normal;
  font-size: 0.9rem;
  color: var(--text-light, #6c757d);
}

.compliance-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.meta-item {
  font-size: 0.9rem;
}

.meta-label {
  font-weight: 500;
  margin-right: 0.25rem;
}

.meta-value {
  color: var(--text-light, #6c757d);
}

.meta-value.high {
  color: var(--success-color, #28a745);
}

.meta-value.medium {
  color: var(--warning-color, #ffc107);
}

.meta-value.low {
  color: var(--text-light, #6c757d);
}

.meta-value.critical {
  color: var(--danger-color, #dc3545);
  font-weight: 500;
}

.framework-description {
  margin: 0;
  font-size: 0.95rem;
}

.controls-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

.controls-table th {
  background-color: var(--primary-color-light, rgba(30, 136, 229, 0.1));
  color: var(--primary-color, #1e88e5);
  font-weight: 500;
  text-align: left;
  padding: 0.75rem;
  font-size: 0.9rem;
}

.controls-table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--border-color, #dee2e6);
  font-size: 0.9rem;
}

.controls-table td.critical {
  color: var(--danger-color, #dc3545);
  font-weight: 500;
}

.controls-table td.high {
  color: var(--warning-color, #ffc107);
  font-weight: 500;
}

.controls-table td.medium {
  color: var(--success-color, #28a745);
}

.controls-table td.low {
  color: var(--text-light, #6c757d);
}

.capability-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.capability-card {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.capability-card h4 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.coverage-meter {
  margin-bottom: 1rem;
}

.coverage-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

.coverage-bar {
  height: 0.5rem;
  background-color: var(--border-color, #dee2e6);
  border-radius: 0.25rem;
  overflow: hidden;
}

.coverage-fill {
  height: 100%;
  border-radius: 0.25rem;
}

.key-advantages h5 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: var(--text-light, #6c757d);
}

.key-advantages ul {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.9rem;
}

.key-advantages li {
  margin-bottom: 0.25rem;
}

.placeholder-message {
  background-color: var(--bg-light, #f8f9fa);
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  color: var(--text-light, #6c757d);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .panel-controls {
    flex-direction: column;
  }
  
  .control-group {
    width: 100%;
  }
  
  .chart-row {
    grid-template-columns: 1fr;
  }
  
  .industry-cards {
    grid-template-columns: 1fr;
  }
  
  .capability-cards {
    grid-template-columns: 1fr;
  }
  
  .industry-header {
    flex-direction: column;
    text-align: center;
  }
  
  .industry-icon {
    margin: 0 auto;
  }
}
EOF

  # Create JavaScript for industry and compliance tab
  cat > "${JS_DIR}/industry-compliance-tab.js" << 'EOF'
/**
 * Industry & Compliance Tab
 * Provides detailed industry insights and compliance information
 * Version: 2.1
 */

(function() {
  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', initIndustryComplianceTab);
  
  function initIndustryComplianceTab() {
    console.log('Initializing Industry & Compliance Tab...');
    
    // Add tab to the main tabs if it doesn't exist
    addIndustryTab();
    
    // Add event listeners for industry and compliance selectors
    addEventListeners();
  }
  
  function addIndustryTab() {
    const tabsContainer = document.querySelector('.results-tabs');
    if (!tabsContainer) {
      console.warn('Results tabs container not found');
      return;
    }
    
    // Check if tab already exists
    if (document.querySelector('.result-tab[data-tab="industry"]')) {
      console.log('Industry tab already exists');
      return;
    }
    
    // Create industry tab
    const industryTab = document.createElement('button');
    industryTab.className = 'result-tab';
    industryTab.setAttribute('data-tab', 'industry');
    industryTab.textContent = 'Industry & Compliance';
    
    // Add tab at the appropriate position (before sensitivity or risk if they exist)
    const sensitivityTab = document.querySelector('.result-tab[data-tab="sensitivity"]');
    const riskTab = document.querySelector('.result-tab[data-tab="risk"]');
    
    if (sensitivityTab) {
      tabsContainer.insertBefore(industryTab, sensitivityTab);
    } else if (riskTab) {
      tabsContainer.insertBefore(industryTab, riskTab);
    } else {
      tabsContainer.appendChild(industryTab);
    }
    
    // Create industry panel
    const resultsContent = document.querySelector('.results-content');
    if (!resultsContent) {
      console.warn('Results content container not found');
      return;
    }
    
    const industryPanel = document.createElement('div');
    industryPanel.className = 'result-panel';
    industryPanel.id = 'industry-panel';
    
    // Create industry panel content
    industryPanel.innerHTML = `
      <div class="industry-compliance-container">
        <div class="panel-controls">
          <div class="control-group">
            <label for="industry-selector">Industry:</label>
            <select id="industry-selector" class="form-select">
              <option value="">Select Industry...</option>
              <option value="healthcare">Healthcare</option>
              <option value="financial">Financial Services</option>
              <option value="retail">Retail</option>
              <option value="education">Education</option>
              <option value="government">Government</option>
              <option value="manufacturing">Manufacturing</option>
            </select>
          </div>
          
          <div class="control-group">
            <label for="compliance-selector">Compliance Framework:</label>
            <select id="compliance-selector" class="form-select">
              <option value="">Select Framework...</option>
              <option value="hipaa">HIPAA</option>
              <option value="pci-dss">PCI DSS</option>
              <option value="gdpr">GDPR</option>
              <option value="nist-csf">NIST CSF</option>
              <option value="cmmc">CMMC 2.0</option>
            </select>
          </div>
        </div>
        
        <div class="industry-overview" id="industry-overview">
          <div class="placeholder-message">
            <p>Select an industry to view detailed requirements, challenges, and security considerations.</p>
          </div>
        </div>
        
        <div class="industry-charts">
          <div class="chart-row">
            <div class="chart-card">
              <h3>Industry-Specific TCO Comparison</h3>
              <div class="chart-container">
                <canvas id="industry-tco-chart"></canvas>
              </div>
            </div>
            
            <div class="chart-card">
              <h3>Compliance Coverage</h3>
              <div class="chart-container">
                <canvas id="industry-compliance-chart"></canvas>
              </div>
            </div>
          </div>
        </div>
        
        <div class="compliance-details" id="compliance-details">
          <div class="placeholder-message">
            <p>Select a compliance framework to view detailed requirements and controls.</p>
          </div>
        </div>
      </div>
    `;
    
    // Add panel to content
    resultsContent.appendChild(industryPanel);
    
    console.log('Industry tab and panel added');
  }
  
  function addEventListeners() {
    // Add click listener for tab
    const industryTab = document.querySelector('.result-tab[data-tab="industry"]');
    if (industryTab) {
      industryTab.addEventListener('click', function() {
        // Make tab active
        document.querySelectorAll('.result-tab').forEach(tab => {
          tab.classList.remove('active');
        });
        this.classList.add('active');
        
        // Show panel
        document.querySelectorAll('.result-panel').forEach(panel => {
          panel.classList.remove('active');
        });
        document.getElementById('industry-panel').classList.add('active');
      });
    }
    
    // Add change listener for industry selector
    const industrySelector = document.getElementById('industry-selector');
    if (industrySelector) {
      industrySelector.addEventListener('change', function() {
        updateIndustryView(this.value);
      });
    }
    
    // Add change listener for compliance selector
    const complianceSelector = document.getElementById('compliance-selector');
    if (complianceSelector) {
      complianceSelector.addEventListener('change', function() {
        updateComplianceView(this.value);
      });
    }
  }
  
  function updateIndustryView(industryId) {
    if (!industryId) return;
    
    console.log(`Updating industry view for: ${industryId}`);
    
    // Verify that required global data is available
    if (typeof window.IndustryData === 'undefined' || typeof window.VendorData === 'undefined') {
      console.error('Required global data not available');
      return;
    }
    
    // Get industry data
    const industry = window.IndustryData.getIndustryData(industryId);
    if (!industry) {
      console.warn(`Industry data not found for ${industryId}`);
      return;
    }
    
    // Update industry overview
    const overview = document.getElementById('industry-overview');
    if (overview) {
      overview.innerHTML = `
        <div class="industry-header">
          <div class="industry-icon">
            <i class="fas ${industry.icon} fa-3x"></i>
          </div>
          <div class="industry-title">
            <h2>${industry.name}</h2>
            <p class="subtitle">${industry.description}</p>
          </div>
        </div>
        
        <div class="industry-cards">
          <div class="info-card">
            <h3>Key Challenges</h3>
            <ul class="bullet-list">
              ${industry.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
            </ul>
          </div>
          
          <div class="info-card">
            <h3>Key Requirements</h3>
            <ul class="bullet-list">
              ${industry.keyRequirements.map(req => `<li>${req}</li>`).join('')}
            </ul>
          </div>
        </div>
        
        <div class="industry-cards">
          <div class="info-card">
            <h3>Industry Benchmarks</h3>
            <div class="benchmark-grid">
              <div class="benchmark-item">
                <div class="benchmark-label">Average Breach Cost</div>
                <div class="benchmark-value">${industry.benchmarks.breachCost}</div>
              </div>
              <div class="benchmark-item">
                <div class="benchmark-label">Implementation Time</div>
                <div class="benchmark-value">${industry.benchmarks.implementationTime}</div>
              </div>
              <div class="benchmark-item">
                <div class="benchmark-label">IT Staff Cost</div>
                <div class="benchmark-value">${industry.benchmarks.fteCost}</div>
              </div>
              <div class="benchmark-item">
                <div class="benchmark-label">Downtime Impact</div>
                <div class="benchmark-value">${industry.benchmarks.downtimeImpact}</div>
              </div>
            </div>
          </div>
          
          <div class="info-card">
            <h3>Compliance Requirements</h3>
            <div class="compliance-list">
              ${industry.complianceFrameworks.map(framework => 
                `<div class="compliance-badge">${framework}</div>`
              ).join('')}
            </div>
            <p class="note">Select a framework above for detailed requirements</p>
          </div>
        </div>
        
        <div class="recommendation-card">
          <h3>Industry Recommendations</h3>
          <p>${industry.recommendations}</p>
          <div class="vendor-recommendation">
            <h4>Recommended Vendors for ${industry.name}</h4>
            <div class="recommended-vendors">
              ${industry.recommendedVendors.map(vendorId => {
                const vendor = window.VendorData.vendors.find(v => v.id === vendorId);
                if (!vendor) return '';
                return `
                  <div class="vendor-badge" style="border-color: ${vendor.color}">
                    <div class="vendor-name">${vendor.name}</div>
                    <div class="vendor-score">${vendor.industrySuitability[industryId] || 7.5}/10</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      `;
    }
    
    // Update compliance framework options
    updateComplianceOptions(industryId);
    
    // Create industry TCO comparison chart
    createIndustryTcoChart(industryId);
    
    // Create industry compliance chart
    createIndustryComplianceChart(industryId);
  }
  
  function updateComplianceOptions(industryId) {
    const selector = document.getElementById('compliance-selector');
    if (!selector) return;
    
    // Clear existing options except the first one
    while (selector.options.length > 1) {
      selector.remove(1);
    }
    
    // Get frameworks for this industry
    const frameworks = window.ComplianceData.getFrameworksForIndustry(industryId);
    
    // Add framework options
    frameworks.forEach(framework => {
      const option = document.createElement('option');
      option.value = framework.id;
      option.textContent = framework.name;
      selector.appendChild(option);
    });
  }
  
  function updateComplianceView(frameworkId) {
    if (!frameworkId) return;
    
    console.log(`Updating compliance view for: ${frameworkId}`);
    
    // Get framework data
    const framework = window.ComplianceData.getFramework(frameworkId);
    if (!framework) {
      console.warn(`Compliance framework data not found for ${frameworkId}`);
      return;
    }
    
    // Update compliance details
    const details = document.getElementById('compliance-details');
    if (details) {
      details.innerHTML = `
        <div class="compliance-header">
          <h2>${framework.name} <span class="full-name">(${framework.fullName})</span></h2>
          <div class="compliance-meta">
            <div class="meta-item">
              <span class="meta-label">Category:</span>
              <span class="meta-value">${framework.category}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Established:</span>
              <span class="meta-value">${framework.year}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">NAC Relevance:</span>
              <span class="meta-value ${framework.nacRelevance.toLowerCase()}">${framework.nacRelevance}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Potential Penalties:</span>
              <span class="meta-value">${framework.penalties}</span>
            </div>
          </div>
          <p class="framework-description">${framework.description}</p>
        </div>
        
        <div class="compliance-content">
          <div class="control-mapping">
            <h3>Key Controls Addressed by NAC</h3>
            <table class="controls-table">
              <thead>
                <tr>
                  <th>Control ID</th>
                  <th>Control Name</th>
                  <th>Requirement</th>
                  <th>NAC Relevance</th>
                </tr>
              </thead>
              <tbody>
                ${framework.controlMapping.map(control => `
                  <tr>
                    <td>${control.controlId}</td>
                    <td>${control.controlName}</td>
                    <td>${control.requirement}</td>
                    <td class="${control.nacRelevance.toLowerCase()}">${control.nacRelevance}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          
          <div class="vendor-capabilities">
            <h3>Vendor Capabilities for ${framework.name}</h3>
            <div class="capability-cards">
              ${Object.entries(framework.vendorCapabilities || {}).map(([vendorId, capability]) => {
                const vendor = window.VendorData.vendors.find(v => v.id === vendorId);
                if (!vendor) return '';
                return `
                  <div class="capability-card" style="border-top: 4px solid ${vendor.color}">
                    <h4>${vendor.name}</h4>
                    <div class="coverage-meter">
                      <div class="coverage-label">Coverage: ${capability.coverage}%</div>
                      <div class="coverage-bar">
                        <div class="coverage-fill" style="width: ${capability.coverage}%; background-color: ${vendor.color}"></div>
                      </div>
                    </div>
                    <div class="key-advantages">
                      <h5>Key Advantages</h5>
                      <ul>
                        ${capability.keyAdvantages.map(adv => `<li>${adv}</li>`).join('')}
                      </ul>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      `;
    }
  }
  
  function createIndustryTcoChart(industryId) {
    // Check if chart utilities are available
    if (typeof window.ChartFactory === 'undefined' || typeof window.ChartUtils === 'undefined') {
      console.warn('Chart utilities not available, using fallback method');
      createIndustryTcoChartFallback(industryId);
      return;
    }
    
    // Get comparison data for this industry
    const data = window.IndustryData.getIndustryTcoComparison(industryId, 1000, 3);
    if (!data) return;
    
    // Use chart factory to create chart
    window.ChartFactory.createTcoComparisonChart('industry-tco-chart', {
      vendors: data.vendors,
      initialCosts: data.initialCosts,
      operationalCosts: data.operationalCosts,
      maintenanceCosts: data.maintenanceCosts
    });
  }
  
  // Fallback method if chart factory isn't available
  function createIndustryTcoChartFallback(industryId) {
    // Get comparison data for this industry
    const data = window.IndustryData.getIndustryTcoComparison(industryId, 1000, 3);
    if (!data) return;
    
    // Check if basic initializeChart function is available
    if (typeof window.initializeChart !== 'function') {
      console.error('No chart initialization function available');
      return;
    }
    
    // Prepare chart data
    const chartData = {
      labels: data.vendors,
      datasets: [
        {
          label: 'Initial Cost',
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          data: data.initialCosts,
          stack: 'Stack 0'
        },
        {
          label: 'Operational Cost',
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          data: data.operationalCosts,
          stack: 'Stack 0'
        },
        {
          label: 'Maintenance Cost',
          backgroundColor: 'rgba(255, 206, 86, 0.6)',
          data: data.maintenanceCosts,
          stack: 'Stack 0'
        }
      ]
    };
    
    // Create chart
    window.initializeChart('industry-tco-chart', {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false
            }
          },
          y: {
            stacked: true,
            title: {
              display: true,
              text: 'Cost ($)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: `Industry-Specific TCO Comparison (${window.IndustryData.getIndustryData(industryId).name})`
          },
          tooltip: {
            callbacks: {
              footer: (tooltipItems) => {
                let total = 0;
                tooltipItems.forEach(item => {
                  total += item.parsed.y;
                });
                return 'Total: $' + total.toLocaleString();
              }
            }
          }
        }
      }
    });
  }
  
  function createIndustryComplianceChart(industryId) {
    // Get compliance data for this industry
    const data = window.IndustryData.getIndustryComplianceData(industryId);
    if (!data) return;
    
    // Check if chart utilities are available
    if (typeof window.ChartFactory !== 'undefined' && typeof window.ChartFactory.createIndustryComplianceChart === 'function') {
      window.ChartFactory.createIndustryComplianceChart('industry-compliance-chart', data);
      return;
    }
    
    // Fallback: use basic chart initialization
    if (typeof window.initializeChart !== 'function') {
      console.error('No chart initialization function available');
      return;
    }
    
    // Create chart
    window.initializeChart('industry-compliance-chart', {
      type: 'radar',
      data: {
        labels: data.frameworks,
        datasets: data.vendors.map(vendor => ({
          label: vendor.name,
          data: vendor.compliance,
          backgroundColor: hexToRgba(vendor.color, 0.2),
          borderColor: vendor.color,
          pointBackgroundColor: vendor.color
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: data.industryName + ' - Compliance Coverage'
          }
        }
      }
    });
  }
  
  // Helper function to convert hex color to rgba
  function hexToRgba(hex, alpha) {
    if (!hex) return `rgba(54, 162, 235, ${alpha || 1})`;
    
    // Handle shorthand hex (e.g. #ABC)
    if (hex.length === 4) {
      hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }
    
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  // Expose functions for external use
  window.IndustryComplianceTab = {
    updateIndustryView: updateIndustryView,
    updateComplianceView: updateComplianceView
  };
})();
EOF

  log "Industry and compliance tab created successfully"
}

# Create master integration file
create_integration_file() {
  log "Creating master integration file..."
  
  # Create master integration file that loads all components
  cat > "${JS_DIR}/nac-tco-enhancer.js" << 'EOF'
/**
 * NAC TCO Enhancer
 * Master integration file for NAC Total Cost Analyzer
 * Version: 2.1
 */

(function() {
  // Configuration
  const config = {
    debug: true,
    appVersion: '2.1.0',
    components: [
      { name: 'chart-utilities.js', required: true },
      { name: 'chart-initializers.js', required: true },
      { name: 'wizard-utilities.js', required: true },
      { name: 'vendor-data.js', required: true, path: 'data/vendors/' },
      { name: 'industry-data.js', required: true, path: 'data/industry/' },
      { name: 'compliance-data.js', required: true, path: 'data/compliance/' },
      { name: 'industry-compliance-tab.js', required: false }
    ],
    styles: [
      { name: 'industry-compliance.css', required: false }
    ]
  };
  
  // Logger
  const logger = {
    info: function(message) {
      if (config.debug) {
        console.log(`[NAC TCO Enhancer] ${message}`);
      }
    },
    error: function(message, err) {
      console.error(`[NAC TCO Enhancer] ERROR: ${message}`, err);
    },
    warn: function(message) {
      console.warn(`[NAC TCO Enhancer] WARNING: ${message}`);
    }
  };
  
  // Load a JavaScript file
  function loadScript(url) {
    return new Promise((resolve, reject) => {
      logger.info(`Loading script: ${url}`);
      
      const script = document.createElement('script');
      script.src = url;
      script.addEventListener('load', () => {
        logger.info(`Loaded script: ${url}`);
        resolve();
      });
      script.addEventListener('error', (e) => {
        logger.error(`Failed to load script: ${url}`, e);
        reject(new Error(`Failed to load script: ${url}`));
      });
      document.head.appendChild(script);
    });
  }
  
  // Load a CSS file
  function loadStyle(url) {
    return new Promise((resolve, reject) => {
      logger.info(`Loading stylesheet: ${url}`);
      
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.addEventListener('load', () => {
        logger.info(`Loaded stylesheet: ${url}`);
        resolve();
      });
      link.addEventListener('error', (e) => {
        logger.error(`Failed to load stylesheet: ${url}`, e);
        reject(new Error(`Failed to load stylesheet: ${url}`));
      });
      document.head.appendChild(link);
    });
  }
  
  // Load all components
  async function loadComponents() {
    logger.info(`Starting component loading (version ${config.appVersion})...`);
    
    // Track load results
    const results = {
      success: [],
      failed: [],
      skipped: []
    };
    
    // Load required components first
    for (const component of config.components) {
      if (component.required) {
        try {
          const path = component.path || 'js/';
          await loadScript(`${path}${component.name}`);
          results.success.push(component.name);
        } catch (err) {
          results.failed.push(component.name);
          logger.error(`Failed to load required component: ${component.name}`, err);
          throw new Error(`Failed to load required component: ${component.name}`);
        }
      }
    }
    
    // Then load optional components
    for (const component of config.components) {
      if (!component.required) {
        try {
          const path = component.path || 'js/';
          await loadScript(`${path}${component.name}`);
          results.success.push(component.name);
        } catch (err) {
          results.skipped.push(component.name);
          logger.warn(`Skipped optional component: ${component.name}`);
        }
      }
    }
    
    // Load stylesheets
    for (const style of config.styles) {
      try {
        await loadStyle(`css/${style.name}`);
        results.success.push(style.name);
      } catch (err) {
        if (style.required) {
          results.failed.push(style.name);
          logger.error(`Failed to load required stylesheet: ${style.name}`, err);
        } else {
          results.skipped.push(style.name);
          logger.warn(`Skipped optional stylesheet: ${style.name}`);
        }
      }
    }
    
    logger.info(`Component loading completed: ${results.success.length} loaded, ${results.skipped.length} skipped, ${results.failed.length} failed`);
    return results;
  }
  
  // Verify component availability
  function verifyComponents() {
    const requiredGlobals = [
      { name: 'ChartUtils', type: 'object' },
      { name: 'ChartFactory', type: 'object' },
      { name: 'WizardUtils', type: 'object' },
      { name: 'VendorData', type: 'object' },
      { name: 'IndustryData', type: 'object' },
      { name: 'ComplianceData', type: 'object' }
    ];
    
    const missingComponents = [];
    
    requiredGlobals.forEach(component => {
      if (typeof window[component.name] !== component.type) {
        missingComponents.push(component.name);
        logger.error(`Missing required global: ${component.name}`);
      }
    });
    
    return {
      success: missingComponents.length === 0,
      missing: missingComponents
    };
  }
  
  // Initialize the TCO Analyzer enhancements
  async function initialize() {
    try {
      logger.info('Starting initialization...');
      
      // Load required components
      await loadComponents();
      
      // Verify components were loaded correctly
      const verification = verifyComponents();
      if (!verification.success) {
        throw new Error(`Missing required components: ${verification.missing.join(', ')}`);
      }
      
      // Initialize charts
      initializeCharts();
      
      // Set up global API
      setupGlobalApi();
      
      // Trigger initialization complete event
      const event = new CustomEvent('nacTcoEnhancerReady', {
        detail: { version: config.appVersion }
      });
      document.dispatchEvent(event);
      
      logger.info('Initialization completed successfully');
      return true;
    } catch (err) {
      logger.error('Initialization failed', err);
      // Show error notification to user
      showErrorNotification('Failed to initialize NAC TCO Enhancer. Please refresh the page or contact support.');
      return false;
    }
  }
  
  // Initialize charts
  function initializeCharts() {
    logger.info('Initializing charts...');
    
    // Make sure chart factory is available
    if (typeof ChartFactory === 'undefined') {
      logger.error('Chart Factory not available');
      return;
    }
    
    // Find all chart containers
    const chartContainers = document.querySelectorAll('.chart-container');
    if (chartContainers.length === 0) {
      logger.info('No chart containers found in DOM');
      return;
    }
    
    // Initialize available charts
    chartContainers.forEach(container => {
      const canvas = container.querySelector('canvas');
      if (!canvas) return;
      
      const chartId = canvas.id;
      if (!chartId) return;
      
      logger.info(`Found chart: ${chartId}`);
      
      // Initialize based on chart type
      if (chartId === 'tco-comparison-chart') {
        initializeTcoComparisonChart();
      } else if (chartId === 'current-breakdown-chart' || chartId === 'alternative-breakdown-chart') {
        initializeBreakdownChart(chartId);
      } else if (chartId === 'cumulative-cost-chart') {
        initializeCumulativeCostChart();
      } else if (chartId === 'feature-comparison-chart') {
        initializeFeatureComparisonChart();
      } else if (chartId === 'implementation-comparison-chart') {
        initializeImplementationComparisonChart();
      } else if (chartId === 'roi-chart') {
        initializeRoiComparisonChart();
      }
    });
    
    logger.info('Chart initialization completed');
  }
  
  // Initialize TCO comparison chart
  function initializeTcoComparisonChart() {
    if (!ChartFactory.createTcoComparisonChart) return;
    
    // Get sample data for demonstration
    const sampleData = getSampleTcoData();
    ChartFactory.createTcoComparisonChart('tco-comparison-chart', sampleData);
  }
  
  // Initialize breakdown charts
  function initializeBreakdownChart(chartId) {
    if (!ChartFactory.createBreakdownChart) return;
    
    const title = chartId === 'current-breakdown-chart' ? 
      'Current Solution Cost Breakdown' : 
      'Portnox Cloud Cost Breakdown';
    
    // Get sample data for demonstration
    const sampleData = getSampleBreakdownData(chartId);
    ChartFactory.createBreakdownChart(chartId, sampleData, title);
  }
  
  // Initialize cumulative cost chart
  function initializeCumulativeCostChart() {
    if (!ChartFactory.createCumulativeCostChart) return;
    
    // Get sample data for demonstration
    const sampleData = getSampleCumulativeData();
    ChartFactory.createCumulativeCostChart('cumulative-cost-chart', sampleData);
  }
  
  // Initialize feature comparison chart
  function initializeFeatureComparisonChart() {
    if (!ChartFactory.createFeatureComparisonChart) return;
    
    // Use VendorData if available
    if (VendorData && VendorData.getFeatureComparisonData) {
      const data = VendorData.getFeatureComparisonData();
      ChartFactory.createFeatureComparisonChart('feature-comparison-chart', data);
    } else {
      // Fallback to sample data
      const sampleData = getSampleFeatureData();
      ChartFactory.createFeatureComparisonChart('feature-comparison-chart', sampleData);
    }
  }
  
  // Initialize implementation comparison chart
  function initializeImplementationComparisonChart() {
    if (!ChartFactory.createImplementationChart) return;
    
    // Use VendorData if available
    if (VendorData && VendorData.getImplementationComparisonData) {
      const data = VendorData.getImplementationComparisonData('medium');
      ChartFactory.createImplementationChart('implementation-comparison-chart', data);
    } else {
      // Fallback to sample data
      const sampleData = getSampleImplementationData();
      ChartFactory.createImplementationChart('implementation-comparison-chart', sampleData);
    }
  }
  
  // Initialize ROI comparison chart
  function initializeRoiComparisonChart() {
    if (!ChartFactory.createRoiChart) return;
    
    // Use VendorData if available
    if (VendorData && VendorData.getRoiComparisonData) {
      const data = VendorData.getRoiComparisonData();
      ChartFactory.createRoiChart('roi-chart', data);
    } else {
      // Fallback to sample data
      const sampleData = getSampleRoiData();
      ChartFactory.createRoiChart('roi-chart', sampleData);
    }
  }
  
  // Set up global API for TCO Analyzer
  function setupGlobalApi() {
    // Create global namespace
    window.NacTcoAnalyzer = {
      version: config.appVersion,
      
      // TCO calculations
      calculateTco: function(vendor, deviceCount, years, additionalParams) {
        if (typeof VendorData !== 'undefined' && typeof VendorData.calculateTCO === 'function') {
          return VendorData.calculateTCO(vendor, deviceCount, years, additionalParams);
        }
        logger.warn('VendorData.calculateTCO not available');
        return null;
      },
      
      // Comparison data generation
      getComparisonData: function(deviceCount, years, additionalParams) {
        if (typeof VendorData !== 'undefined' && typeof VendorData.getComparisonData === 'function') {
          return VendorData.getComparisonData(deviceCount, years, additionalParams);
        }
        logger.warn('VendorData.getComparisonData not available');
        return null;
      },
      
      // Industry analysis
      getIndustryData: function(industryId) {
        if (typeof IndustryData !== 'undefined' && typeof IndustryData.getIndustryData === 'function') {
          return IndustryData.getIndustryData(industryId);
        }
        logger.warn('IndustryData.getIndustryData not available');
        return null;
      },
      
      // Compliance analysis
      getComplianceData: function(frameworkId) {
        if (typeof ComplianceData !== 'undefined' && typeof ComplianceData.getFramework === 'function') {
          return ComplianceData.getFramework(frameworkId);
        }
        logger.warn('ComplianceData.getFramework not available');
        return null;
      },
      
      // Chart creation
      createChart: function(type, canvasId, data, options) {
        if (typeof ChartFactory === 'undefined') {
          logger.warn('ChartFactory not available');
          return null;
        }
        
        // Map chart type to factory method
        const factoryMethod = {
          'tco': ChartFactory.createTcoComparisonChart,
          'breakdown': ChartFactory.createBreakdownChart,
          'cumulative': ChartFactory.createCumulativeCostChart,
          'feature': ChartFactory.createFeatureComparisonChart,
          'implementation': ChartFactory.createImplementationChart,
          'roi': ChartFactory.createRoiChart,
          'compliance': ChartFactory.createIndustryComplianceChart,
          'risk': ChartFactory.createRiskReductionChart,
          'sensitivity': ChartFactory.createSensitivityChart
        }[type];
        
        if (typeof factoryMethod !== 'function') {
          logger.warn(`Unknown chart type: ${type}`);
          return null;
        }
        
        return factoryMethod(canvasId, data, options);
      },
      
      // Refresh charts
      refreshCharts: function() {
        if (typeof ChartUtils !== 'undefined' && typeof ChartUtils.instances === 'object') {
          Object.keys(ChartUtils.instances).forEach(chartId => {
            logger.info(`Refreshing chart: ${chartId}`);
            ChartUtils.refreshChart(chartId);
          });
          return true;
        }
        logger.warn('ChartUtils not available');
        return false;
      }
    };
    
    logger.info('Global API set up successfully');
  }
  
  // Show error notification to user
  function showErrorNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-icon">
          <i class="fas fa-exclamation-circle"></i>
        </div>
        <div class="notification-message">${message}</div>
        <button class="notification-close">&times;</button>
      </div>
    `;
    
    // Style the notification
    const style = document.createElement('style');
    style.textContent = `
      .error-notification {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        background-color: #f8d7da;
        color: #721c24;
        padding: 10px 15px;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        max-width: 90%;
        animation: slide-in 0.3s ease-out;
      }
      .notification-content {
        display: flex;
        align-items: center;
      }
      .notification-icon {
        margin-right: 10px;
        font-size: 24px;
      }
      .notification-close {
        margin-left: 15px;
        background: none;
        border: none;
        color: #721c24;
        font-size: 20px;
        cursor: pointer;
      }
      @keyframes slide-in {
        0% { transform: translate(-50%, -100%); opacity: 0; }
        100% { transform: translate(-50%, 0); opacity: 1; }
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Add close button functionality
    const closeButton = notification.querySelector('.notification-close');
    if (closeButton) {
      closeButton.addEventListener('click', function() {
        notification.remove();
      });
    }
    
    // Auto-close after 10 seconds
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.remove();
      }
    }, 10000);
  }
  
  // Helper functions for sample data
  function getSampleTcoData() {
    return {
      vendors: ['Portnox', 'Cisco ISE', 'Aruba ClearPass', 'Forescout', 'FortiNAC'],
      initialCosts: [5000, 125000, 100000, 115000, 75000],
      operationalCosts: [36000, 150000, 105000, 120000, 90000],
      maintenanceCosts: [84000, 210000, 180000, 195000, 150000]
    };
  }
  
  function getSampleBreakdownData(chartId) {
    if (chartId === 'current-breakdown-chart') {
      return {
        labels: ['Hardware', 'Software', 'Implementation', 'Staffing', 'Maintenance'],
        values: [120000, 150000, 80000, 210000, 60000]
      };
    } else {
      return {
        labels: ['Subscription', 'Implementation', 'Staffing', 'Maintenance'],
        values: [96000, 5000, 36000, 0]
      };
    }
  }
  
  function getSampleCumulativeData() {
    return {
      years: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
      solutions: [
        {
          name: 'Portnox',
          color: '#1E88E5',
          cumulativeCosts: [125000, 220000, 315000, 410000, 505000]
        },
        {
          name: 'Cisco ISE',
          color: '#E53935',
          cumulativeCosts: [300000, 450000, 600000, 750000, 900000]
        },
        {
          name: 'Aruba ClearPass',
          color: '#FB8C00',
          cumulativeCosts: [250000, 375000, 500000, 625000, 750000]
        }
      ]
    };
  }
  
  function getSampleFeatureData() {
    return {
      features: [
        'Device Visibility',
        'Policy Management',
        'Guest Access',
        'BYOD Support',
        'Cloud Integration',
        'Automated Remediation',
        'Third-Party Integration',
        'Scalability',
        'Ease of Use',
        'Reporting'
      ],
      vendors: [
        {
          name: 'Portnox',
          color: '#1E88E5',
          scores: [8, 9, 8, 9, 10, 9, 9, 9, 9, 8]
        },
        {
          name: 'Cisco ISE',
          color: '#E53935',
          scores: [8, 9, 8, 8, 6, 8, 9, 9, 5, 8]
        },
        {
          name: 'Aruba ClearPass',
          color: '#FB8C00',
          scores: [8, 8, 9, 9, 7, 8, 8, 8, 6, 8]
        }
      ]
    };
  }
  
  function getSampleImplementationData() {
    return {
      vendors: ['Portnox', 'Cisco ISE', 'Aruba ClearPass', 'Forescout', 'FortiNAC'],
      implementationTimes: [3, 45, 35, 25, 30],
      colors: ['#1E88E5', '#E53935', '#FB8C00', '#7E57C2', '#43A047']
    };
  }
  
  function getSampleRoiData() {
    return {
      vendors: ['Portnox', 'Cisco ISE', 'Aruba ClearPass', 'Forescout', 'FortiNAC'],
      roiValues: [145, 87, 78, 65, 92],
      colors: ['#1E88E5', '#E53935', '#FB8C00', '#7E57C2', '#43A047']
    };
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    // DOM already loaded, initialize immediately
    initialize();
  }
})();
EOF

  log "Master integration file created successfully"
}

# Update HTML to include the enhancement script
update_html() {
  log "Updating HTML to include enhancement scripts..."
  
  # Create backup of index.html
  cp "${APP_DIR}/index.html" "${BACKUP_DIR}/index.html"
  
  # Check if index.html has proper closing body tag
  if grep -q "</body>" "${APP_DIR}/index.html"; then
    # Add enhancement scripts before closing body tag
    sed -i.bak '/<\/body>/i \
    <!-- NAC TCO Analyzer Enhancements -->\
    <link rel="stylesheet" href="css/industry-compliance.css">\
    <script src="js/nac-tco-enhancer.js"></script>' "${APP_DIR}/index.html"
    
    log "HTML updated successfully"
  else
    warn "Could not find </body> tag in index.html"
    
    # Attempt to add scripts at the end of the file
    echo '
<!-- NAC TCO Analyzer Enhancements -->
<link rel="stylesheet" href="css/industry-compliance.css">
<script src="js/nac-tco-enhancer.js"></script>
</body>
</html>' >> "${APP_DIR}/index.html"
    
    warn "Added scripts at the end of index.html - please verify"
  fi
}

# Create custom fonts for vendor logos
create_vendor_logos() {
  log "Checking vendor logo directory..."
  
  # Create vendor logos directory if it doesn't exist
  if [ ! -d "${IMG_DIR}" ]; then
    mkdir -p "${IMG_DIR}"
    log "Created vendor logos directory at ${IMG_DIR}"
  fi
  
  # Check for existing logos
  MISSING_LOGOS=""
  for vendor in "portnox" "cisco" "aruba" "forescout" "fortinac" "microsoft" "securew2" "foxpass" "arista" "juniper"; do
    if [ ! -f "${IMG_DIR}/${vendor}-logo.svg" ]; then
      MISSING_LOGOS="${MISSING_LOGOS} ${vendor}"
    fi
  done
  
  if [ -n "$MISSING_LOGOS" ]; then
    warn "Missing vendor logos:${MISSING_LOGOS}"
    log "Creating placeholder logos for missing vendors..."
    
    # Create a basic placeholder SVG for each missing logo
    for vendor in $MISSING_LOGOS; do
      case $vendor in
        portnox)
          COLOR="#1E88E5"
          ;;
        cisco)
          COLOR="#E53935"
          ;;
        aruba)
          COLOR="#FB8C00"
          ;;
        forescout)
          COLOR="#7E57C2"
          ;;
        fortinac)
          COLOR="#43A047"
          ;;
        microsoft)
          COLOR="#00897B"
          ;;
        securew2)
          COLOR="#5E35B1"
          ;;
        foxpass)
          COLOR="#FF5722"
          ;;
        arista)
          COLOR="#3949AB"
          ;;
        juniper)
          COLOR="#8BC34A"
          ;;
        *)
          COLOR="#607D8B"
          ;;
      esac
      
      # Create a simple SVG placeholder
      cat > "${IMG_DIR}/${vendor}-logo.svg" << EOF
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60">
  <rect width="200" height="60" rx="5" fill="${COLOR}" opacity="0.2"/>
  <text x="100" y="35" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="${COLOR}" font-weight="bold">${vendor^}</text>
</svg>
EOF
      
      log "Created placeholder logo for ${vendor}"
    done
  else
    log "All vendor logos found"
  fi
}

# Main execution function
main() {
  log "Starting NAC TCO Analyzer Enhancement Script (V2.1)"
  
  # Step 1: Detect application structure
  detect_structure
  
  # Step 2: Backup existing files
  backup_files
  
  # Step 3: Fix JavaScript chart errors
  fix_chart_js_errors
  
  # Step 4: Create enhanced vendor data
  create_enhanced_vendor_data
  
  # Step 5: Create industry and compliance data
  create_industry_compliance_data
  
  # Step 6: Create industry and compliance tab
  create_industry_compliance_tab
  
  # Step 7: Create master integration file
  create_integration_file
  
  # Step 8: Create vendor logos
  create_vendor_logos
  
  # Step 9: Update HTML to include enhancement script
  update_html
  
  # Final message
  echo -e "${GREEN}NAC TCO Analyzer enhancement completed successfully!${NC}"
  echo -e "${BLUE}Enhancements summary:${NC}"
  echo "• Fixed chart initialization and canvas reuse errors"
  echo "• Added comprehensive data for ALL requested vendors:"
  echo "  - Portnox, Cisco ISE, Aruba ClearPass, Forescout, FortiNAC"
  echo "  - Microsoft NPS, SecureW2, Foxpass, Arista Agni, Juniper Mist NAC"
  echo "• Created detailed industry analysis with benchmarks and requirements:"
  echo "  - Healthcare, Financial Services, Retail, Education, Government, Manufacturing"
  echo "• Added compliance framework mapping with control mappings:"
  echo "  - HIPAA, PCI DSS, GDPR, NIST CSF, CMMC 2.0"
  echo "• Implemented new visualizations with detailed comparisons"
  echo "• Added interactive Industry & Compliance tab"
  echo "• Created comprehensive master integration file"
  echo -e "\n${YELLOW}Next steps:${NC}"
  echo "1. Launch your application in a browser"
  echo "2. Verify all charts are displaying correctly"
  echo "3. Check the new Industry & Compliance tab functionality"
  echo "4. Review the enhanced comparison data between vendors"
  echo "5. Explore the compliance framework mappings"
  echo -e "\n${GREEN}Backup created at: ${BACKUP_DIR}${NC}"
}

# Run the script
main
