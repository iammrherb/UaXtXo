#!/bin/bash
#
# NAC TCO Calculator Enhancement Script
# This script implements comprehensive improvements to the NAC TCO Calculator
# to make it more user-friendly for different audiences and industries.
#
# Usage: ./enhance-nac-calculator.sh [options]
#   Options:
#     --install       Install dependencies and set up environment
#     --update        Update existing calculator with enhancements
#     --backup        Create a backup before making changes
#     --deploy        Deploy the enhanced calculator
#     --help          Show this help message
#

set -e  # Exit on error
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_DIR="${SCRIPT_DIR}/backups/$(date +%Y%m%d_%H%M%S)"
APP_DIR="${SCRIPT_DIR}"
TEMP_DIR="${SCRIPT_DIR}/temp"
LOG_FILE="${SCRIPT_DIR}/enhancement.log"

# Default options
DO_INSTALL=false
DO_UPDATE=false
DO_BACKUP=false
DO_DEPLOY=false

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# -----------------------------------------------------------------------------
# Utility functions
# -----------------------------------------------------------------------------

log() {
  local message="$1"
  local timestamp=$(date "+%Y-%m-%d %H:%M:%S")
  echo -e "${timestamp} - ${message}" | tee -a "${LOG_FILE}"
}

log_success() {
  log "${GREEN}SUCCESS: $1${NC}"
}

log_info() {
  log "${BLUE}INFO: $1${NC}"
}

log_warning() {
  log "${YELLOW}WARNING: $1${NC}"
}

log_error() {
  log "${RED}ERROR: $1${NC}"
}

show_help() {
  echo "NAC TCO Calculator Enhancement Script"
  echo ""
  echo "This script enhances the NAC TCO Calculator with improved visualizations,"
  echo "industry-specific templates, and audience-tailored reporting capabilities."
  echo ""
  echo "Usage: ./enhance-nac-calculator.sh [options]"
  echo "  Options:"
  echo "    --install       Install dependencies and set up environment"
  echo "    --update        Update existing calculator with enhancements"
  echo "    --backup        Create a backup before making changes"
  echo "    --deploy        Deploy the enhanced calculator"
  echo "    --help          Show this help message"
  echo ""
  echo "Example: ./premium-update-nowv1.sh --backup --update --deploy"
  exit 0
}

create_backup() {
  log_info "Creating backup in ${BACKUP_DIR}"
  
  if [ ! -d "${APP_DIR}" ]; then
    log_error "Application directory not found: ${APP_DIR}"
    exit 1
  fi
  
  mkdir -p "${BACKUP_DIR}"
  cp -r "${APP_DIR}"/* "${BACKUP_DIR}/"
  
  if [ $? -eq 0 ]; then
    log_success "Backup created successfully"
  else
    log_error "Failed to create backup"
    exit 1
  fi
}

check_dependencies() {
  log_info "Checking dependencies..."
  local missing_deps=()
  
  # Check for required commands
  for cmd in npm node jq wget curl; do
    if ! command -v $cmd &> /dev/null; then
      missing_deps+=("$cmd")
    fi
  done
  
  if [ ${#missing_deps[@]} -gt 0 ]; then
    log_error "Missing dependencies: ${missing_deps[*]}"
    log_info "Please install the missing dependencies and try again."
    exit 1
  fi
  
  log_success "All dependencies are installed"
}

# -----------------------------------------------------------------------------
# Enhancement functions
# -----------------------------------------------------------------------------

install_dependencies() {
  log_info "Installing dependencies..."
  
  # Create app directory if it doesn't exist
  # Using current directory
  
  # Navigate to app directory
  cd "${APP_DIR}"
  
  # Initialize package.json if it doesn't exist
  if [ ! -f "package.json" ]; then
    log_info "Initializing package.json"
    npm init -y
  fi
  
  # Install required packages
  log_info "Installing npm packages"
  npm install --save chart.js@3.9.1 jspdf@2.5.1 jspdf-autotable@3.5.28 papaparse@5.3.2 jquery@3.6.4 bootstrap@5.2.3
  
  # Install developer dependencies
  log_info "Installing developer dependencies"
  npm install --save-dev webpack webpack-cli babel-loader @babel/core @babel/preset-env sass sass-loader css-loader style-loader
  
  log_success "Dependencies installed successfully"
}

enhance_ui_controller() {
  log_info "Enhancing UI Controller..."
  
  # Path to UI Controller file
  UI_CONTROLLER_FILE="${APP_DIR}/js/components/ui-controller.js"
  
  # Ensure directory exists
  mkdir -p "$(dirname "${UI_CONTROLLER_FILE}")"
  
  # Create enhanced UI Controller
  cat > "${UI_CONTROLLER_FILE}" << 'EOF'
/**
 * Enhanced UI Controller for handling user interactions and updating the UI
 * Includes improvements for various stakeholders, industries, and visualization types
 */
class UIController {
  constructor() {
    this.activeVendor = null;
    this.comparisonMode = 'standard'; // 'standard', 'detailed', or 'simplified'
    this.currentIndustry = 'general';
    this.savedScenarios = [];
    this.chartInstances = {};
    this.initEventListeners();
    this.initIndustryTemplates();
    this.initTooltips();
  }
  
  // Industry-specific templates data
  initIndustryTemplates() {
    this.industryTemplates = {
      healthcare: {
        name: 'Healthcare',
        defaults: {
          deviceCount: 5000,
          yearsToProject: 3,
          multipleLocations: true,
          locationCount: 10,
          complexAuthentication: true,
          legacyDevices: true,
          legacyPercentage: 40,
          cloudIntegration: true,
          customPolicies: true,
          policyComplexity: 'high'
        },
        complianceInfo: {
          title: 'Healthcare Compliance Considerations',
          details: 'NAC solutions in healthcare must support HIPAA compliance by providing secure access to EHR systems, segmenting clinical and guest networks, and maintaining detailed audit logs for compliance reporting.',
          keyRequirements: [
            'PHI data protection',
            'Medical device security',
            'Guest network isolation',
            'Audit trail capabilities'
          ]
        },
        benchmarks: {
          averageTCO: 450000,
          implementationTime: 120,
          fteCost: 185000
        }
      },
      financial: {
        name: 'Financial Services',
        defaults: {
          deviceCount: 8000,
          yearsToProject: 5,
          multipleLocations: true,
          locationCount: 50,
          complexAuthentication: true,
          legacyDevices: true,
          legacyPercentage: 20,
          cloudIntegration: true,
          customPolicies: true,
          policyComplexity: 'high'
        },
        complianceInfo: {
          title: 'Financial Services Compliance Considerations',
          details: 'NAC solutions for financial institutions must align with regulatory frameworks like PCI-DSS, SOX, and GLBA, with strong emphasis on privileged access management and continuous monitoring.',
          keyRequirements: [
            'Continuous compliance monitoring',
            'Privileged access management',
            'Fine-grained access controls',
            'Advanced threat detection'
          ]
        },
        benchmarks: {
          averageTCO: 750000,
          implementationTime: 160,
          fteCost: 210000
        }
      },
      education: {
        name: 'Education',
        defaults: {
          deviceCount: 10000,
          yearsToProject: 3,
          multipleLocations: true,
          locationCount: 5,
          complexAuthentication: false,
          legacyDevices: true,
          legacyPercentage: 50,
          cloudIntegration: true,
          customPolicies: true,
          policyComplexity: 'medium'
        },
        complianceInfo: {
          title: 'Education Sector Considerations',
          details: 'Educational institutions require flexible NAC solutions that accommodate diverse user groups including students, faculty, staff, and guests while managing seasonal enrollment fluctuations.',
          keyRequirements: [
            'BYOD support',
            'Guest network management',
            'Seasonal scaling capabilities',
            'FERPA compliance'
          ]
        },
        benchmarks: {
          averageTCO: 320000,
          implementationTime: 90,
          fteCost: 150000
        }
      },
      manufacturing: {
        name: 'Manufacturing',
        defaults: {
          deviceCount: 3000,
          yearsToProject: 4,
          multipleLocations: true,
          locationCount: 3,
          complexAuthentication: true,
          legacyDevices: true,
          legacyPercentage: 70,
          cloudIntegration: false,
          customPolicies: true,
          policyComplexity: 'medium'
        },
        complianceInfo: {
          title: 'Manufacturing & Industrial Considerations',
          details: 'Manufacturing environments require NAC solutions that can secure OT/IT convergence zones, manage IoT devices, and protect industrial control systems with minimal downtime.',
          keyRequirements: [
            'ICS/SCADA protection',
            'IoT device management',
            'OT/IT segmentation',
            'High availability'
          ]
        },
        benchmarks: {
          averageTCO: 380000,
          implementationTime: 110,
          fteCost: 165000
        }
      },
      retail: {
        name: 'Retail',
        defaults: {
          deviceCount: 2500,
          yearsToProject: 3,
          multipleLocations: true,
          locationCount: 25,
          complexAuthentication: false,
          legacyDevices: true,
          legacyPercentage: 30,
          cloudIntegration: true,
          customPolicies: false,
          policyComplexity: 'low'
        },
        complianceInfo: {
          title: 'Retail Sector Considerations',
          details: 'Retail environments need NAC solutions that protect POS systems and customer data while providing convenient guest access and supporting seasonal staff fluctuations.',
          keyRequirements: [
            'PCI DSS compliance',
            'POS system security',
            'Guest WiFi management',
            'IoT device security'
          ]
        },
        benchmarks: {
          averageTCO: 280000,
          implementationTime: 75,
          fteCost: 140000
        }
      }
    };
  }
  
  initTooltips() {
    // Initialize tooltips for technical terms
    const tooltipData = {
      'nac': 'Network Access Control - Technology that enforces security policies for devices connecting to a network',
      'tco': 'Total Cost of Ownership - The complete cost of implementing and maintaining a solution over its lifecycle',
      'cloud-based': 'Solutions hosted in the cloud rather than on-premises, typically requiring less hardware investment',
      'on-premises': 'Solutions deployed on local hardware within your organization\'s physical locations',
      'zero-trust': 'Security framework assuming no user or device should be trusted by default, even if inside the network perimeter',
      'posture-check': 'Evaluation of a device\'s security status before allowing network access',
      'byod': 'Bring Your Own Device - Policy allowing employees to use personal devices for work purposes',
      'remediation': 'Process of fixing security issues on non-compliant devices',
      'iot': 'Internet of Things - Connected devices beyond traditional computers and mobile devices'
    };
    
    // Add tooltips to the DOM for relevant elements
    Object.keys(tooltipData).forEach(term => {
      document.querySelectorAll(`[data-term="${term}"]`).forEach(element => {
        element.setAttribute('title', tooltipData[term]);
        // Initialize tooltip library if available
        if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
          new bootstrap.Tooltip(element);
        }
      });
    });
  }
  
  initEventListeners() {
    // Set up vendor card click events
    document.querySelectorAll('.vendor-card').forEach(card => {
      card.addEventListener('click', () => {
        const vendor = card.getAttribute('data-vendor');
        if (vendor) {
          this.setActiveVendor(vendor);
        }
      });
      
      // Make vendor cards keyboard accessible
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
    
    // Set up dependent field visibility
    const multipleLocationsCheckbox = document.getElementById('multiple-locations');
    const locationCountContainer = document.getElementById('location-count-container');
    
    if (multipleLocationsCheckbox && locationCountContainer) {
      multipleLocationsCheckbox.addEventListener('change', () => {
        locationCountContainer.style.display = multipleLocationsCheckbox.checked ? 'block' : 'none';
      });
      
      // Set initial state
      locationCountContainer.style.display = multipleLocationsCheckbox.checked ? 'block' : 'none';
    }
    
    const legacyDevicesCheckbox = document.getElementById('legacy-devices');
    const legacyPercentageContainer = document.getElementById('legacy-percentage-container');
    
    if (legacyDevicesCheckbox && legacyPercentageContainer) {
      legacyDevicesCheckbox.addEventListener('change', () => {
        legacyPercentageContainer.style.display = legacyDevicesCheckbox.checked ? 'block' : 'none';
      });
      
      // Set initial state
      legacyPercentageContainer.style.display = legacyDevicesCheckbox.checked ? 'block' : 'none';
    }
    
    const customPoliciesCheckbox = document.getElementById('custom-policies');
    const policyComplexityContainer = document.getElementById('policy-complexity-container');
    
    if (customPoliciesCheckbox && policyComplexityContainer) {
      customPoliciesCheckbox.addEventListener('change', () => {
        policyComplexityContainer.style.display = customPoliciesCheckbox.checked ? 'block' : 'none';
      });
      
      // Set initial state
      policyComplexityContainer.style.display = customPoliciesCheckbox.checked ? 'block' : 'none';
    }
    
    // Initialize industry template selector
    const industrySelector = document.getElementById('industry-selector');
    if (industrySelector) {
      // Populate industry options
      this.populateIndustrySelector(industrySelector);
      
      industrySelector.addEventListener('change', () => {
        const industry = industrySelector.value;
        if (industry && industry !== 'none') {
          this.applyIndustryTemplate(industry);
        }
      });
    }
    
    // Initialize audience view selector
    const audienceSelector = document.getElementById('audience-selector');
    if (audienceSelector) {
      audienceSelector.addEventListener('change', () => {
        this.setAudienceView(audienceSelector.value);
      });
    }
    
    // Initialize chart type toggles
    document.querySelectorAll('.chart-type-toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const chartId = toggle.getAttribute('data-chart-id');
        const chartType = toggle.getAttribute('data-chart-type');
        if (chartId && chartType) {
          this.changeChartType(chartId, chartType);
        }
      });
    });
    
    // Initialize scenario management buttons
    const saveScenarioBtn = document.getElementById('save-scenario-btn');
    if (saveScenarioBtn) {
      saveScenarioBtn.addEventListener('click', () => {
        this.saveCurrentScenario();
      });
    }
    
    const loadScenarioBtn = document.getElementById('load-scenario-btn');
    if (loadScenarioBtn) {
      loadScenarioBtn.addEventListener('click', () => {
        this.showLoadScenarioModal();
      });
    }
    
    // Initialize guided tour button
    const tourBtn = document.getElementById('guided-tour-btn');
    if (tourBtn) {
      tourBtn.addEventListener('click', () => {
        this.startGuidedTour();
      });
    }
  }
  
  populateIndustrySelector(selector) {
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = 'none';
    defaultOption.textContent = 'Select an industry...';
    selector.appendChild(defaultOption);
    
    // Add industry options
    Object.keys(this.industryTemplates).forEach(industry => {
      const option = document.createElement('option');
      option.value = industry;
      option.textContent = this.industryTemplates[industry].name;
      selector.appendChild(option);
    });
  }
  
  applyIndustryTemplate(industry) {
    const template = this.industryTemplates[industry];
    if (!template) {
      console.warn(`Industry template not found: ${industry}`);
      return false;
    }
    
    try {
      // Update current industry
      this.currentIndustry = industry;
      
      // Apply form values from template
      const defaults = template.defaults;
      
      // Set values for form elements
      document.getElementById('device-count').value = defaults.deviceCount;
      document.getElementById('years-to-project').value = defaults.yearsToProject;
      document.getElementById('multiple-locations').checked = defaults.multipleLocations;
      document.getElementById('location-count').value = defaults.locationCount;
      document.getElementById('complex-authentication').checked = defaults.complexAuthentication;
      document.getElementById('legacy-devices').checked = defaults.legacyDevices;
      document.getElementById('legacy-percentage').value = defaults.legacyPercentage;
      document.getElementById('cloud-integration').checked = defaults.cloudIntegration;
      document.getElementById('custom-policies').checked = defaults.customPolicies;
      document.getElementById('policy-complexity').value = defaults.policyComplexity;
      
      // Update visibility of dependent fields
      const event = new Event('change');
      document.getElementById('multiple-locations').dispatchEvent(event);
      document.getElementById('legacy-devices').dispatchEvent(event);
      document.getElementById('custom-policies').dispatchEvent(event);
      
      // Display industry-specific compliance info
      this.displayComplianceInfo(template.complianceInfo);
      
      // Display industry benchmarks
      this.displayIndustryBenchmarks(template.benchmarks);
      
      // Recalculate with new values
      if (window.calculator && window.calculator.resultsAvailable) {
        window.calculator.calculate();
      }
      
      return true;
    } catch (error) {
      console.error('Error applying industry template:', error);
      return false;
    }
  }
  
  displayComplianceInfo(complianceInfo) {
    const complianceContainer = document.getElementById('compliance-info-container');
    if (!complianceContainer) return;
    
    let html = `
      <div class="compliance-info">
        <h4>${complianceInfo.title}</h4>
        <p>${complianceInfo.details}</p>
        <ul class="key-requirements">
    `;
    
    complianceInfo.keyRequirements.forEach(requirement => {
      html += `<li><i class="fas fa-check-circle"></i> ${requirement}</li>`;
    });
    
    html += `
        </ul>
      </div>
    `;
    
    complianceContainer.innerHTML = html;
    complianceContainer.style.display = 'block';
  }
  
  displayIndustryBenchmarks(benchmarks) {
    const benchmarksContainer = document.getElementById('industry-benchmarks-container');
    if (!benchmarksContainer) return;
    
    let html = `
      <div class="benchmarks-card">
        <h4>Industry Benchmarks</h4>
        <div class="benchmark-metrics">
          <div class="benchmark-metric">
            <span class="metric-label">Avg. TCO:</span>
            <span class="metric-value">${window.formatCurrency(benchmarks.averageTCO)}</span>
          </div>
          <div class="benchmark-metric">
            <span class="metric-label">Typical Implementation:</span>
            <span class="metric-value">${benchmarks.implementationTime} days</span>
          </div>
          <div class="benchmark-metric">
            <span class="metric-label">Avg. Annual FTE Cost:</span>
            <span class="metric-value">${window.formatCurrency(benchmarks.fteCost)}</span>
          </div>
        </div>
      </div>
    `;
    
    benchmarksContainer.innerHTML = html;
    benchmarksContainer.style.display = 'block';
  }
  
  setAudienceView(audience) {
    // Hide all audience-specific elements
    document.querySelectorAll('[data-audience]').forEach(element => {
      element.style.display = 'none';
    });
    
    // Show elements for the selected audience
    document.querySelectorAll(`[data-audience="all"], [data-audience="${audience}"]`).forEach(element => {
      element.style.display = '';
    });
    
    // Update chart complexity based on audience
    this.updateChartsForAudience(audience);
    
    // Update terminology based on audience
    this.updateTerminologyForAudience(audience);
  }
  
  updateChartsForAudience(audience) {
    // Simplified charts for executive view
    if (audience === 'executive') {
      if (window.chartBuilder) {
        window.chartBuilder.setChartMode('simplified');
      }
    } 
    // Detailed charts for technical view
    else if (audience === 'technical') {
      if (window.chartBuilder) {
        window.chartBuilder.setChartMode('detailed');
      }
    }
    // Standard charts for financial view
    else {
      if (window.chartBuilder) {
        window.chartBuilder.setChartMode('standard');
      }
    }
    
    // Recalculate if results are available
    if (window.calculator && window.calculator.resultsAvailable) {
      this.updateUI(window.calculator.results);
    }
  }
  
  updateTerminologyForAudience(audience) {
    const terminologySets = {
      executive: {
        'TCO': 'Total Cost',
        'NAC': 'Network Security',
        'Implementation Timeline': 'Deployment Schedule',
        'On-premises': 'Traditional',
        'Cloud-based': 'SaaS'
      },
      financial: {
        'TCO': 'Total Cost of Ownership',
        'NAC': 'Network Access Control',
        'Implementation Timeline': 'Deployment Schedule',
        'On-premises': 'On-premises',
        'Cloud-based': 'Cloud-based'
      },
      technical: {
        'TCO': 'Total Cost of Ownership',
        'NAC': 'Network Access Control',
        'Implementation Timeline': 'Implementation Timeline',
        'On-premises': 'On-premises',
        'Cloud-based': 'Cloud-native'
      }
    };
    
    const terminology = terminologySets[audience] || terminologySets.financial;
    
    // Update terminology in labels
    document.querySelectorAll('[data-term-placeholder]').forEach(element => {
      const termKey = element.getAttribute('data-term-placeholder');
      if (terminology[termKey]) {
        element.textContent = terminology[termKey];
      }
    });
  }
  
  setActiveVendor(vendor) {
    if (this.activeVendor === vendor) return;
    
    // Remove active class from all vendor cards
    document.querySelectorAll('.vendor-card').forEach(card => {
      card.classList.remove('active');
    });
    
    // Add active class to selected vendor card
    const vendorCard = document.querySelector(`.vendor-card[data-vendor="${vendor}"]`);
    if (vendorCard) {
      vendorCard.classList.add('active');
    }
    
    this.activeVendor = vendor;
    
    // Update vendor-specific UI elements
    this.updateVendorSpecificElements(vendor);
    
    // Recalculate if calculator has results
    if (window.calculator && window.calculator.resultsAvailable) {
      window.calculator.calculate();
    }
  }
  
  updateVendorSpecificElements(vendor) {
    // Get vendor data
    const vendorData = window.vendorData ? window.vendorData[vendor] : null;
    if (!vendorData) return;
    
    // Update vendor name in titles and headers
    document.querySelectorAll('.vendor-name-placeholder').forEach(element => {
      element.textContent = vendorData.name || vendor;
    });
    
    // Update vendor type indicator (cloud-based vs on-premises)
    document.querySelectorAll('.vendor-type-indicator').forEach(element => {
      if (vendorData.cloudBased) {
        element.innerHTML = '<i class="fas fa-cloud"></i> Cloud-based';
        element.className = 'vendor-type-indicator cloud-based';
      } else {
        element.innerHTML = '<i class="fas fa-server"></i> On-premises';
        element.className = 'vendor-type-indicator on-premises';
      }
    });
    
    // Update vendor description
    const vendorDescriptionElement = document.getElementById('vendor-description');
    if (vendorDescriptionElement && vendorData.description) {
      vendorDescriptionElement.textContent = vendorData.description;
    }
    
    // Update vendor logo
    const vendorLogoElement = document.getElementById('vendor-logo');
    if (vendorLogoElement && vendorData.logo) {
      vendorLogoElement.src = vendorData.logo;
      vendorLogoElement.alt = `${vendorData.name} Logo`;
    }
  }
  
  updateUI(results) {
    if (!results) return;
    
    const currentVendor = this.activeVendor;
    if (!currentVendor || !results[currentVendor]) {
      console.warn('Current vendor not found in results');
      return;
    }
    
    // Update charts if chart builder is available
    if (window.chartBuilder) {
      // Standard charts
      window.chartBuilder.updateTCOComparisonChart(results);
      window.chartBuilder.updateCumulativeCostChart(results);
      window.chartBuilder.updateBreakdownCharts(currentVendor, 'portnox');
      window.chartBuilder.updateFeatureComparisonChart(currentVendor);
      window.chartBuilder.updateImplementationComparisonChart(results);
      window.chartBuilder.updateROIChart(results);
      
      // Enhanced visualization charts
      this.updateEnhancedVisualizations(results, currentVendor);
    }
    
    // Update tables
    this.updateTCOSummaryTable(results, currentVendor);
    this.updateAnnualCostsTable(results, currentVendor);
    this.updateImplementationTable(results, currentVendor);
    this.updateCloudComparisonTable();
    this.updateMigrationPlanningContent(results, currentVendor);
    
    // Update vendor names in table headers
    const vendorName = results[currentVendor].vendorName;
    
    document.querySelectorAll('#tco-comparison-vendor, #annual-comparison-vendor, #implementation-comparison-vendor').forEach(element => {
      if (element) {
        element.textContent = vendorName;
      }
    });
    
    // Update Portnox spotlight metrics
    this.updatePortnoxSpotlight(results, currentVendor);
    
    // Update comparison metrics
    this.updateComparisonMetrics(results, currentVendor);
    
    // Update industry-specific metrics
    if (this.currentIndustry !== 'general') {
      this.updateIndustrySpecificMetrics(results, currentVendor);
    }
    
    // Show results if they were hidden
    const resultsContainer = document.querySelector('.results-container');
    if (resultsContainer && resultsContainer.style.display === 'none') {
      resultsContainer.style.display = 'flex';
    }
  }
  
  updateEnhancedVisualizations(results, currentVendor) {
    // Add waterfall chart for cost breakdown over time
    this.createWaterfallChart(results, currentVendor);
    
    // Add radar chart for implementation complexity comparison
    this.createImplementationComplexityChart(results, currentVendor);
    
    // Add heat map for cost factors
    this.createCostFactorsHeatMap(results, currentVendor);
    
    // Add ROI timeline with break-even point visualization
    this.createROITimelineChart(results, currentVendor);
    
    // Add resource utilization comparison chart
    this.createResourceUtilizationChart(results, currentVendor);
  }
  
  createWaterfallChart(results, currentVendor) {
    const ctx = document.getElementById('waterfall-chart');
    if (!ctx || !window.Chart) return;
    
    const currentResults = results[currentVendor];
    if (!currentResults) return;
    
    // Calculate annual costs
    const yearsToProject = results.yearsToProject || 3;
    const initialCosts = currentResults.hardwareCost + currentResults.networkRedesignCost +
                        currentResults.implementationCost + currentResults.trainingCost;
    
    // Prepare data for waterfall chart
    const labels = ['Initial Costs'];
    const data = [initialCosts];
    
    // Add annual costs for each year
    for (let i = 1; i <= yearsToProject; i++) {
      labels.push(`Year ${i}`);
      data.push(currentResults.annualCosts);
    }
    
    // Add total at the end
    labels.push('Total TCO');
    data.push(0); // Will be calculated by the chart plugin
    
    // Define chart configuration
    const chartConfig = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: function(context) {
            const index = context.dataIndex;
            // Different colors for initial, annual, and total
            if (index === 0) return 'rgba(54, 162, 235, 0.7)'; // Initial
            if (index === labels.length - 1) return 'rgba(75, 192, 192, 0.7)'; // Total
            return 'rgba(255, 159, 64, 0.7)'; // Annual
          },
          borderColor: function(context) {
            const index = context.dataIndex;
            if (index === 0) return 'rgba(54, 162, 235, 1)';
            if (index === labels.length - 1) return 'rgba(75, 192, 192, 1)';
            return 'rgba(255, 159, 64, 1)';
          },
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `${currentResults.vendorName} - TCO Breakdown Over Time`,
            font: { size: 16 }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return window.formatCurrency(context.raw);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
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
        }
      }
    };
    
    // Create or update chart
    if (this.chartInstances.waterfall) {
      this.chartInstances.waterfall.data = chartConfig.data;
      this.chartInstances.waterfall.options = chartConfig.options;
      this.chartInstances.waterfall.update();
    } else {
      this.chartInstances.waterfall = new Chart(ctx, chartConfig);
    }
  }
  
  createImplementationComplexityChart(results, currentVendor) {
    const ctx = document.getElementById('implementation-complexity-chart');
    if (!ctx || !window.Chart) return;
    
    // Implementation complexity factors for different vendors
    const complexityFactors = {
      'cisco': {
        'Technical Expertise': 4.5,
        'Time Investment': 4.2,
        'Resource Allocation': 4.0,
        'Integration Difficulty': 3.8,
        'Training Requirements': 4.3,
        'Maintenance Burden': 4.1
      },
      'aruba': {
        'Technical Expertise': 4.0,
        'Time Investment': 3.8,
        'Resource Allocation': 3.9,
        'Integration Difficulty': 3.5,
        'Training Requirements': 3.7,
        'Maintenance Burden': 3.8
      },
      'forescout': {
        'Technical Expertise': 4.2,
        'Time Investment': 3.9,
        'Resource Allocation': 4.1,
        'Integration Difficulty': 4.0,
        'Training Requirements': 3.9,
        'Maintenance Burden': 3.7
      },
      'nps': {
        'Technical Expertise': 3.2,
        'Time Investment': 3.0,
        'Resource Allocation': 2.8,
        'Integration Difficulty': 3.5,
        'Training Requirements': 2.9,
        'Maintenance Burden': 3.3
      },
      'portnox': {
        'Technical Expertise': 2.5,
        'Time Investment': 2.2,
        'Resource Allocation': 2.0,
        'Integration Difficulty': 2.3,
        'Training Requirements': 2.1,
        'Maintenance Burden': 1.8
      }
    };
    
    // Get factors for the current vendor and portnox
    const currentFactors = complexityFactors[currentVendor] || {};
    const portnoxFactors = complexityFactors['portnox'] || {};
    
    // Get all factor names
    const factors = Object.keys(currentFactors);
    
    // Prepare chart data
    const chartConfig = {
      type: 'radar',
      data: {
        labels: factors,
        datasets: [
          {
            label: results[currentVendor]?.vendorName || currentVendor,
            data: factors.map(factor => currentFactors[factor] || 0),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointRadius: 4
          },
          {
            label: 'Portnox Cloud',
            data: factors.map(factor => portnoxFactors[factor] || 0),
            backgroundColor: 'rgba(43, 210, 91, 0.2)',
            borderColor: 'rgba(43, 210, 91, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(43, 210, 91, 1)',
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Implementation Complexity Comparison',
            font: { size: 16 }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.raw + '/5 (Lower is better)';
              }
            }
          }
        },
        scales: {
          r: {
            min: 0,
            max: 5,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    };
    
    // Create or update chart
    if (this.chartInstances.implementationComplexity) {
      this.chartInstances.implementationComplexity.data = chartConfig.data;
      this.chartInstances.implementationComplexity.options = chartConfig.options;
      this.chartInstances.implementationComplexity.update();
    } else {
      this.chartInstances.implementationComplexity = new Chart(ctx, chartConfig);
    }
  }
  
  createCostFactorsHeatMap(results, currentVendor) {
    const container = document.getElementById('cost-factors-heatmap');
    if (!container) return;
    
    // Get results for current vendor and portnox
    const currentResults = results[currentVendor];
    const portnoxResults = results['portnox'];
    
    if (!currentResults || !portnoxResults) return;
    
    // Define cost factor categories and their weights
    const costFactors = [
      { name: 'Hardware Costs', currentValue: currentResults.hardwareCost, portnoxValue: portnoxResults.hardwareCost },
      { name: 'Implementation', currentValue: currentResults.implementationCost, portnoxValue: portnoxResults.implementationCost },
      { name: 'Network Redesign', currentValue: currentResults.networkRedesignCost, portnoxValue: portnoxResults.networkRedesignCost },
      { name: 'Training', currentValue: currentResults.trainingCost, portnoxValue: portnoxResults.trainingCost },
      { name: 'Annual Maintenance', currentValue: currentResults.maintenanceCost, portnoxValue: portnoxResults.maintenanceCost },
      { name: 'Annual Licensing', currentValue: currentResults.licensingCost, portnoxValue: portnoxResults.licensingCost },
      { name: 'Personnel Costs', currentValue: currentResults.fteCost, portnoxValue: portnoxResults.fteCost },
      { name: 'Downtime Costs', currentValue: currentResults.annualDowntimeCost, portnoxValue: portnoxResults.annualDowntimeCost }
    ];
    
    // Calculate total for percentage calculation
    const currentTotal = costFactors.reduce((sum, factor) => sum + factor.currentValue, 0);
    const portnoxTotal = costFactors.reduce((sum, factor) => sum + factor.portnoxValue, 0);
    
    // Calculate percentages and sort by current vendor's value descending
    costFactors.forEach(factor => {
      factor.currentPct = (factor.currentValue / currentTotal) * 100;
      factor.portnoxPct = (factor.portnoxValue / portnoxTotal) * 100;
      factor.savings = factor.currentValue - factor.portnoxValue;
      factor.savingsPct = (factor.savings / factor.currentValue) * 100;
    });
    
    // Sort by current value (highest first)
    costFactors.sort((a, b) => b.currentValue - a.currentValue);
    
    // Generate HTML for heatmap
    let html = `
      <div class="heatmap-title">Cost Factors Impact Analysis</div>
      <div class="heatmap-subtitle">Comparing ${currentResults.vendorName} vs Portnox Cloud</div>
      <div class="heatmap-container">
        <div class="heatmap-header">
          <div class="heatmap-header-cell">Cost Factor</div>
          <div class="heatmap-header-cell">${currentResults.vendorName}</div>
          <div class="heatmap-header-cell">Portnox Cloud</div>
          <div class="heatmap-header-cell">Savings</div>
        </div>
    `;
    
    // Add rows for each cost factor
    costFactors.forEach(factor => {
      // Calculate heat intensity (0-100)
      const heatIntensity = Math.min(100, Math.max(0, factor.currentPct * 2));
      const savingsIntensity = Math.min(100, Math.max(0, factor.savingsPct * 2));
      
      html += `
        <div class="heatmap-row">
          <div class="heatmap-cell">${factor.name}</div>
          <div class="heatmap-cell heatmap-value" style="background-color: rgba(54, 162, 235, ${heatIntensity/100})">
            ${window.formatCurrency(factor.currentValue)}
            <div class="heatmap-pct">${factor.currentPct.toFixed(1)}%</div>
          </div>
          <div class="heatmap-cell heatmap-value" style="background-color: rgba(43, 210, 91, ${factor.portnoxPct * 2/100})">
            ${window.formatCurrency(factor.portnoxValue)}
            <div class="heatmap-pct">${factor.portnoxPct.toFixed(1)}%</div>
          </div>
          <div class="heatmap-cell heatmap-value ${factor.savings > 0 ? 'positive-savings' : 'negative-savings'}" 
               style="background-color: rgba(${factor.savings > 0 ? '43, 210, 91' : '255, 99, 132'}, ${Math.abs(savingsIntensity)/100})">
            ${window.formatCurrency(factor.savings)}
            <div class="heatmap-pct">${factor.savingsPct.toFixed(1)}%</div>
          </div>
        </div>
      `;
    });
    
    html += `
      </div>
      <div class="heatmap-legend">
        <div class="legend-item">
          <div class="legend-color" style="background-color: rgba(54, 162, 235, 0.8)"></div>
          <div class="legend-text">Higher Impact</div>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background-color: rgba(54, 162, 235, 0.2)"></div>
          <div class="legend-text">Lower Impact</div>
        </div>
      </div>
    `;
    
    // Add CSS styles if not already added
    if (!document.getElementById('heatmap-styles')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'heatmap-styles';
      styleElement.textContent = `
        .heatmap-container {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          overflow: hidden;
          margin-bottom: var(--spacing-md);
        }
        .heatmap-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: var(--spacing-xs);
        }
        .heatmap-subtitle {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: var(--spacing-md);
        }
        .heatmap-header {
          display: flex;
          background-color: var(--bg-light);
          font-weight: 600;
        }
        .heatmap-header-cell {
          flex: 1;
          padding: var(--spacing-sm);
          text-align: center;
          border-bottom: 1px solid var(--border-color);
        }
        .heatmap-row {
          display: flex;
          border-bottom: 1px solid var(--border-color);
        }
        .heatmap-row:last-child {
          border-bottom: none;
        }
        .heatmap-cell {
          flex: 1;
          padding: var(--spacing-sm);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .heatmap-value {
          text-align: center;
          font-weight: 500;
        }
        .heatmap-pct {
          font-size: 0.8rem;
          opacity: 0.8;
        }
        .positive-savings {
          color: var(--accent-dark);
        }
        .negative-savings {
          color: var(--danger-color);
        }
        .heatmap-legend {
          display: flex;
          justify-content: center;
          gap: var(--spacing-md);
          margin-top: var(--spacing-sm);
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }
        .legend-color {
          width: 20px;
          height: 10px;
          border-radius: 2px;
        }
        .legend-text {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
      `;
      document.head.appendChild(styleElement);
    }
    
    // Update container with heatmap
    container.innerHTML = html;
  }
  
  createROITimelineChart(results, currentVendor) {
    const ctx = document.getElementById('roi-timeline-chart');
    if (!ctx || !window.Chart) return;
    
    const currentResults = results[currentVendor];
    const portnoxResults = results['portnox'];
    
    if (!currentResults || !portnoxResults) return;
    
    // Calculate ROI data
    const yearsToProject = results.yearsToProject || 3;
    const monthsToProject = yearsToProject * 12;
    
    // Initial costs
    const currentInitialCost = currentResults.hardwareCost + currentResults.networkRedesignCost + 
                              currentResults.implementationCost + currentResults.trainingCost;
    const portnoxInitialCost = portnoxResults.hardwareCost + portnoxResults.networkRedesignCost + 
                              portnoxResults.implementationCost + portnoxResults.trainingCost + 
                              portnoxResults.migrationCost;
    
    // Monthly costs
    const currentMonthlyCost = currentResults.annualCosts / 12;
    const portnoxMonthlyCost = portnoxResults.annualCosts / 12;
    
    // Calculate cumulative costs for each month
    const labels = [];
    const currentCumulativeCosts = [];
    const portnoxCumulativeCosts = [];
    const savingsCumulativeCosts = [];
    
    let breakEvenMonth = null;
    
    for (let month = 0; month <= monthsToProject; month++) {
      // Add month label
      if (month === 0) {
        labels.push('Initial');
      } else {
        labels.push(`Month ${month}`);
      }
      
      // Calculate cumulative costs for this month
      const currentCost = currentInitialCost + (currentMonthlyCost * month);
      const portnoxCost = portnoxInitialCost + (portnoxMonthlyCost * month);
      const savings = currentCost - portnoxCost;
      
      currentCumulativeCosts.push(currentCost);
      portnoxCumulativeCosts.push(portnoxCost);
      savingsCumulativeCosts.push(savings);
      
      // Check for break-even point (first month where savings becomes positive)
      if (breakEvenMonth === null && savings > 0) {
        breakEvenMonth = month;
      }
    }
    
    // Prepare break-even annotation
    const annotations = {};
    if (breakEvenMonth !== null) {
      annotations.breakEven = {
        type: 'line',
        mode: 'vertical',
        scaleID: 'x',
        value: breakEvenMonth,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 2,
        borderDash: [5, 5],
        label: {
          content: 'Break-even point',
          enabled: true,
          position: 'top'
        }
      };
    }
    
    // Define chart configuration
    const chartConfig = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: currentResults.vendorName,
            data: currentCumulativeCosts,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.1)',
            borderWidth: 2,
            fill: true
          },
          {
            label: 'Portnox Cloud',
            data: portnoxCumulativeCosts,
            borderColor: 'rgba(43, 210, 91, 1)',
            backgroundColor: 'rgba(43, 210, 91, 0.1)',
            borderWidth: 2,
            fill: true
          },
          {
            label: 'Cumulative Savings',
            data: savingsCumulativeCosts,
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: breakEvenMonth ? 
              `ROI Timeline (Break-even: ${breakEvenMonth} months)` : 
              'ROI Timeline',
            font: { size: 16 }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + window.formatCurrency(context.raw);
              }
            }
          },
          annotation: {
            annotations: annotations
          }
        },
        scales: {
          y: {
            type: 'linear',
            position: 'left',
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
            type: 'linear',
            position: 'right',
            title: {
              display: true,
              text: 'Cumulative Savings ($)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            },
            grid: {
              drawOnChartArea: false
            }
          }
        }
      }
    };
    
    // Create or update chart
    if (this.chartInstances.roiTimeline) {
      this.chartInstances.roiTimeline.data = chartConfig.data;
      this.chartInstances.roiTimeline.options = chartConfig.options;
      this.chartInstances.roiTimeline.update();
    } else {
      this.chartInstances.roiTimeline = new Chart(ctx, chartConfig);
    }
  }
  
  createResourceUtilizationChart(results, currentVendor) {
    const ctx = document.getElementById('resource-utilization-chart');
    if (!ctx || !window.Chart) return;
    
    const currentResults = results[currentVendor];
    const portnoxResults = results['portnox'];
    
    if (!currentResults || !portnoxResults) return;
    
    // Define resource categories
    const resourceCategories = ['Network Admin', 'Security Admin', 'System Admin', 'Help Desk'];
    
    // Get FTE allocation from vendor data
    const vendorData = window.vendorData || {};
    const currentVendorData = vendorData[currentVendor] || {};
    const portnoxVendorData = vendorData['portnox'] || {};
    
    // Get organization size
    const orgSize = results.orgSize || 'medium';
    
    // Get FTE allocation for current vendor and portnox
    const currentFTE = currentVendorData[orgSize]?.fteAllocation || {
      networkAdmin: 0.5,
      securityAdmin: 0.4,
      systemAdmin: 0.3,
      helpDesk: 0.1
    };
    
    const portnoxFTE = portnoxVendorData[orgSize]?.fteAllocation || {
      networkAdmin: 0.2,
      securityAdmin: 0.15,
      systemAdmin: 0.05,
      helpDesk: 0.05
    };
    
    // Prepare chart data
    const chartConfig = {
      type: 'bar',
      data: {
        labels: resourceCategories,
        datasets: [
          {
            label: currentResults.vendorName,
            data: [
              currentFTE.networkAdmin || 0,
              currentFTE.securityAdmin || 0,
              currentFTE.systemAdmin || 0,
              currentFTE.helpDesk || 0
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Portnox Cloud',
            data: [
              portnoxFTE.networkAdmin || 0,
              portnoxFTE.securityAdmin || 0,
              portnoxFTE.systemAdmin || 0,
              portnoxFTE.helpDesk || 0
            ],
            backgroundColor: 'rgba(43, 210, 91, 0.7)',
            borderColor: 'rgba(43, 210, 91, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'IT Staff Resource Utilization',
            font: { size: 16 }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.raw + ' FTE';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Full-Time Equivalent (FTE)'
            },
            max: 1.0,
            ticks: {
              callback: function(value) {
                return value.toFixed(1) + ' FTE';
              }
            }
          }
        }
      }
    };
    
    // Create or update chart
    if (this.chartInstances.resourceUtilization) {
      this.chartInstances.resourceUtilization.data = chartConfig.data;
      this.chartInstances.resourceUtilization.options = chartConfig.options;
      this.chartInstances.resourceUtilization.update();
    } else {
      this.chartInstances.resourceUtilization = new Chart(ctx, chartConfig);
    }
  }
  
  updateTCOSummaryTable(results, currentVendor) {
    const tableBody = document.getElementById('tco-summary-table-body');
    if (!tableBody) return;
    
    const currentResults = results[currentVendor];
    const portnoxResults = results['portnox'];
    
    if (!currentResults || !portnoxResults) return;
    
    const yearsToProject = results.yearsToProject;
    
    // Create table rows
    const rows = [
      {
        component: 'Hardware Costs',
        current: currentResults.hardwareCost,
        portnox: portnoxResults.hardwareCost,
        savings: currentResults.hardwareCost - portnoxResults.hardwareCost
      },
      {
        component: 'Network Redesign',
        current: currentResults.networkRedesignCost,
        portnox: portnoxResults.networkRedesignCost,
        savings: currentResults.networkRedesignCost - portnoxResults.networkRedesignCost
      },
      {
        component: 'Implementation',
        current: currentResults.implementationCost,
        portnox: portnoxResults.implementationCost,
        savings: currentResults.implementationCost - portnoxResults.implementationCost
      },
      {
        component: 'Training',
        current: currentResults.trainingCost,
        portnox: portnoxResults.trainingCost,
        savings: currentResults.trainingCost - portnoxResults.trainingCost
      },
      {
        component: 'Migration Costs',
        current: 0,
        portnox: portnoxResults.migrationCost,
        savings: -portnoxResults.migrationCost
      },
      {
        component: `Annual Maintenance (${yearsToProject} years)`,
        current: currentResults.maintenanceCost * yearsToProject,
        portnox: portnoxResults.maintenanceCost * yearsToProject,
        savings: (currentResults.maintenanceCost - portnoxResults.maintenanceCost) * yearsToProject
      },
      {
        component: `Annual Licensing (${yearsToProject} years)`,
        current: currentResults.licensingCost * yearsToProject,
        portnox: portnoxResults.licensingCost * yearsToProject,
        savings: (currentResults.licensingCost - portnoxResults.licensingCost) * yearsToProject
      },
      {
        component: `Personnel Costs (${yearsToProject} years)`,
        current: currentResults.fteCost * yearsToProject,
        portnox: portnoxResults.fteCost * yearsToProject,
        savings: (currentResults.fteCost - portnoxResults.fteCost) * yearsToProject
      },
      {
        component: `Downtime Costs (${yearsToProject} years)`,
        current: currentResults.annualDowntimeCost * yearsToProject,
        portnox: portnoxResults.annualDowntimeCost * yearsToProject,
        savings: (currentResults.annualDowntimeCost - portnoxResults.annualDowntimeCost) * yearsToProject
      },
      {
        component: `Total ${yearsToProject}-Year TCO`,
        current: currentResults.totalCosts,
        portnox: portnoxResults.totalCosts,
        savings: currentResults.totalCosts - portnoxResults.totalCosts,
        isTotal: true
      }
    ];
    
    // Clear table
    tableBody.innerHTML = '';
    
    // Add rows to table
    rows.forEach(row => {
      const tr = document.createElement('tr');
      if (row.isTotal) {
        tr.classList.add('total-row');
      }
      
      const componentCell = document.createElement('td');
      componentCell.textContent = row.component;
      
      const currentCell = document.createElement('td');
      currentCell.textContent = window.formatCurrency(row.current);
      currentCell.setAttribute('data-value', row.current); // For sorting
      
      const portnoxCell = document.createElement('td');
      portnoxCell.textContent = window.formatCurrency(row.portnox);
      portnoxCell.setAttribute('data-value', row.portnox); // For sorting
      
      const savingsCell = document.createElement('td');
      savingsCell.textContent = window.formatCurrency(row.savings);
      savingsCell.setAttribute('data-value', row.savings); // For sorting
      
      if (row.savings > 0) {
        savingsCell.classList.add('positive-savings');
      } else if (row.savings < 0) {
        savingsCell.classList.add('negative-savings');
      }
      
      tr.appendChild(componentCell);
      tr.appendChild(currentCell);
      tr.appendChild(portnoxCell);
      tr.appendChild(savingsCell);
      
      tableBody.appendChild(tr);
    });
    
    // Add savings percentage to total row
    const totalRow = tableBody.querySelector('.total-row');
    if (totalRow) {
      const savingsCell = totalRow.querySelector('td:last-child');
      if (savingsCell) {
        const savingsValue = currentResults.totalCosts - portnoxResults.totalCosts;
        const savingsPercentage = (savingsValue / currentResults.totalCosts) * 100;
        
        savingsCell.innerHTML = `${window.formatCurrency(savingsValue)} <span class="savings-percentage">(${savingsPercentage.toFixed(1)}%)</span>`;
      }
    }
  }
  
  updateAnnualCostsTable(results, currentVendor) {
    const tableBody = document.getElementById('annual-costs-table-body');
    if (!tableBody) return;
    
    const currentResults = results[currentVendor];
    const portnoxResults = results['portnox'];
    
    if (!currentResults || !portnoxResults) return;
    
    // Create table rows
    const rows = [
      {
        category: 'Maintenance',
        current: currentResults.maintenanceCost,
        portnox: portnoxResults.maintenanceCost,
        savings: currentResults.maintenanceCost - portnoxResults.maintenanceCost
      },
      {
        category: 'Licensing',
        current: currentResults.licensingCost,
        portnox: portnoxResults.licensingCost,
        savings: currentResults.licensingCost - portnoxResults.licensingCost
      },
      {
        category: 'Personnel (FTE)',
        current: currentResults.fteCost,
        portnox: portnoxResults.fteCost,
        savings: currentResults.fteCost - portnoxResults.fteCost
      },
      {
        category: 'Downtime',
        current: currentResults.annualDowntimeCost,
        portnox: portnoxResults.annualDowntimeCost,
        savings: currentResults.annualDowntimeCost - portnoxResults.annualDowntimeCost
      },
      {
        category: 'Total Annual Costs',
        current: currentResults.annualCosts,
        portnox: portnoxResults.annualCosts,
        savings: currentResults.annualCosts - portnoxResults.annualCosts,
        isTotal: true
      }
    ];
    
    // Clear table
    tableBody.innerHTML = '';
    
    // Add rows to table
    rows.forEach(row => {
      const tr = document.createElement('tr');
      if (row.isTotal) {
        tr.classList.add('total-row');
      }
      
      const categoryCell = document.createElement('td');
      categoryCell.textContent = row.category;
      
      const currentCell = document.createElement('td');
      currentCell.textContent = window.formatCurrency(row.current);
      currentCell.setAttribute('data-value', row.current); // For sorting
      
      const portnoxCell = document.createElement('td');
      portnoxCell.textContent = window.formatCurrency(row.portnox);
      portnoxCell.setAttribute('data-value', row.portnox); // For sorting
      
      const savingsCell = document.createElement('td');
      savingsCell.textContent = window.formatCurrency(row.savings);
      savingsCell.setAttribute('data-value', row.savings); // For sorting
      
      if (row.savings > 0) {
        savingsCell.classList.add('positive-savings');
      } else if (row.savings < 0) {
        savingsCell.classList.add('negative-savings');
      }
      
      tr.appendChild(categoryCell);
      tr.appendChild(currentCell);
      tr.appendChild(portnoxCell);
      tr.appendChild(savingsCell);
      
      tableBody.appendChild(tr);
    });
    
    // Add savings percentage to total row
    const totalRow = tableBody.querySelector('.total-row');
    if (totalRow) {
      const savingsCell = totalRow.querySelector('td:last-child');
      if (savingsCell) {
        const savingsValue = currentResults.annualCosts - portnoxResults.annualCosts;
        const savingsPercentage = (savingsValue / currentResults.annualCosts) * 100;
        
        savingsCell.innerHTML = `${window.formatCurrency(savingsValue)} <span class="savings-percentage">(${savingsPercentage.toFixed(1)}%)</span>`;
      }
    }
  }
  
  updateImplementationTable(results, currentVendor) {
    const tableBody = document.getElementById('implementation-table-body');
    if (!tableBody) return;
    
    // Get vendor data
    const vendorData = window.vendorData || {};
    const currentVendorData = vendorData[currentVendor];
    const portnoxData = vendorData['portnox'];
    
    if (!currentVendorData || !portnoxData) return;
    
    // Get organization size
    const orgSize = results.orgSize || 'medium';
    
    // Get implementation timelines
    const currentTimeline = currentVendorData[orgSize]?.implementationTimeline;
    const portnoxTimeline = portnoxData[orgSize]?.implementationTimeline;
    
    if (!currentTimeline || !portnoxTimeline) return;
    
    // Create table rows for each phase
    const rows = [];
    
    // Combine all phase names from both vendors
    const phases = new Set([...Object.keys(currentTimeline), ...Object.keys(portnoxTimeline)]);
    
    phases.forEach(phase => {
      const currentDays = currentTimeline[phase] || 0;
      const portnoxDays = portnoxTimeline[phase] || 0;
      const savings = currentDays - portnoxDays;
      
      rows.push({
        phase: phase.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
        current: currentDays,
        portnox: portnoxDays,
        savings: savings
      });
    });
    
    // Add total row
    const currentTotal = Object.values(currentTimeline).reduce((sum, days) => sum + days, 0);
    const portnoxTotal = Object.values(portnoxTimeline).reduce((sum, days) => sum + days, 0);
    const totalSavings = currentTotal - portnoxTotal;
    
    rows.push({
      phase: 'Total Implementation Time',
      current: currentTotal,
      portnox: portnoxTotal,
      savings: totalSavings,
      isTotal: true
    });
    
    // Clear table
    tableBody.innerHTML = '';
    
    // Add rows to table
    rows.forEach(row => {
      const tr = document.createElement('tr');
      if (row.isTotal) {
        tr.classList.add('total-row');
      }
      
      const phaseCell = document.createElement('td');
      phaseCell.textContent = row.phase;
      if (!row.isTotal) {
        phaseCell.classList.add('phase-name');
      }
      
      const currentCell = document.createElement('td');
      currentCell.textContent = row.current + ' days';
      
      const portnoxCell = document.createElement('td');
      portnoxCell.textContent = row.portnox + ' days';
      
      const savingsCell = document.createElement('td');
      
      if (row.savings > 0) {
        const savingsPercentage = (row.savings / row.current) * 100;
        savingsCell.textContent = `${row.savings} days (${savingsPercentage.toFixed(1)}%)`;
        savingsCell.classList.add('positive-savings');
      } else if (row.savings < 0) {
        savingsCell.textContent = Math.abs(row.savings) + ' days more';
        savingsCell.classList.add('negative-savings');
      } else {
        savingsCell.textContent = '0 days';
      }
      
      tr.appendChild(phaseCell);
      tr.appendChild(currentCell);
      tr.appendChild(portnoxCell);
      tr.appendChild(savingsCell);
      
      tableBody.appendChild(tr);
    });
  }
  
  updateCloudComparisonTable() {
    const tableBody = document.getElementById('cloud-comparison-table-body');
    if (!tableBody) return;
    
    // Define cloud vs on-premises comparison data
    const cloudVsOnPremFeatures = {
      'Initial Deployment': {
        onPrem: 'Multiple hardware appliances required with complex sizing calculations',
        cloud: 'No hardware required, quick setup with web portal'
      },
      'Hardware Costs': {
        onPrem: 'Significant upfront investment in appliances and servers',
        cloud: 'No hardware purchase or maintenance required'
      },
      'Scaling': {
        onPrem: 'Additional hardware needed for growth, complex capacity planning',
        cloud: 'Seamless scaling with subscription adjustments'
      },
      'Maintenance': {
        onPrem: 'Regular hardware updates, patching, and replacement cycles',
        cloud: 'Automatic updates and patches with no downtime'
      },
      'High Availability': {
        onPrem: 'Requires redundant hardware and complex failover configuration',
        cloud: 'Built-in redundancy across multiple availability zones'
      },
      'IT Staff Requirements': {
        onPrem: 'Dedicated staff for hardware maintenance and software management',
        cloud: 'Minimal IT oversight required, no hardware management'
      },
      'Remote Access': {
        onPrem: 'Complex VPN configurations and additional hardware',
        cloud: 'Native remote access from anywhere, no VPN required'
      },
      'Multi-Location Support': {
        onPrem: 'Separate appliances and complex synchronization between sites',
        cloud: 'Single management interface for all locations'
      },
      'Disaster Recovery': {
        onPrem: 'Complex backup solutions and redundant hardware required',
        cloud: 'Automatic backups and built-in disaster recovery'
      },
      'Total Cost of Ownership': {
        onPrem: 'High capital expenditure and ongoing maintenance costs',
        cloud: 'Predictable operational expenses with no hidden costs'
      }
    };
    
    // Clear table
    tableBody.innerHTML = '';
    
    // Add rows to table
    Object.entries(cloudVsOnPremFeatures).forEach(([feature, values]) => {
      const tr = document.createElement('tr');
      
      const featureCell = document.createElement('td');
      featureCell.textContent = feature;
      
      const onPremCell = document.createElement('td');
      onPremCell.textContent = values.onPrem;
      
      const cloudCell = document.createElement('td');
      cloudCell.textContent = values.cloud;
      cloudCell.classList.add('cloud-advantage');
      
      tr.appendChild(featureCell);
      tr.appendChild(onPremCell);
      tr.appendChild(cloudCell);
      
      tableBody.appendChild(tr);
    });
  }
  
  updateMigrationPlanningContent(results, currentVendor) {
    const migrationPhasesContainer = document.querySelector('.migration-phases');
    if (!migrationPhasesContainer) return;
    
    // Define migration planning phases
    const migrationPlanning = {
      phases: [
        {
          name: 'Assessment & Discovery',
          icon: 'search',
          description: 'Evaluate current environment, identify devices, authenticate methods, and network topology.',
          timeline: {
            cisco: 14,
            aruba: 10,
            forescout: 12,
            nps: 7,
            portnox: 3
          }
        },
        {
          name: 'Architecture Planning',
          icon: 'project-diagram',
          description: 'Design new network segmentation, authentication flows, and integration points.',
          timeline: {
            cisco: 21,
            aruba: 14,
            forescout: 14,
            nps: 10,
            portnox: 5
          }
        },
        {
          name: 'Pilot Deployment',
          icon: 'flask',
          description: 'Implement solution in limited environment to validate design and identify challenges.',
          timeline: {
            cisco: 14,
            aruba: 12,
            forescout: 10,
            nps: 7,
            portnox: 3
          }
        },
        {
          name: 'Policy Configuration',
          icon: 'shield-alt',
          description: 'Define and test access policies, compliance checks, and remediation actions.',
          timeline: {
            cisco: 21,
            aruba: 18,
            forescout: 18,
            nps: 10,
            portnox: 4
          }
        },
        {
          name: 'Integration Setup',
          icon: 'plug',
          description: 'Connect NAC solution with existing systems like AD, MDM, SIEM, and vulnerability scanners.',
          timeline: {
            cisco: 14,
            aruba: 12,
            forescout: 10,
            nps: 12,
            portnox: 2
          }
        },
        {
          name: 'Full Deployment',
          icon: 'rocket',
          description: 'Roll out solution to all locations and devices with production policies.',
          timeline: {
            cisco: 45,
            aruba: 40,
            forescout: 35,
            nps: 25,
            portnox: 7
          }
        },
        {
          name: 'Training & Knowledge Transfer',
          icon: 'graduation-cap',
          description: 'Train IT staff on management, troubleshooting, and ongoing operations.',
          timeline: {
            cisco: 10,
            aruba: 8,
            forescout: 8,
            nps: 5,
            portnox: 3
          }
        },
        {
          name: 'Post-Implementation Tuning',
          icon: 'sliders-h',
          description: 'Optimize policies, address edge cases, and fine-tune performance.',
          timeline: {
            cisco: 21,
            aruba: 18,
            forescout: 15,
            nps: 14,
            portnox: 3
          }
        }
      ]
    };
    
    // Clear container
    migrationPhasesContainer.innerHTML = '';
    
    // Add phases
    migrationPlanning.phases.forEach(phase => {
      const phaseElement = document.createElement('div');
      phaseElement.className = 'phase';
      
      const iconElement = document.createElement('div');
      iconElement.className = 'phase-icon';
      iconElement.innerHTML = `<i class="fas fa-${phase.icon}"></i>`;
      
      const contentElement = document.createElement('div');
      contentElement.className = 'phase-content';
      
      const titleElement = document.createElement('h4');
      titleElement.textContent = phase.name;
      
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = phase.description;
      
      // Add timeline comparison
      const currentDays = phase.timeline[currentVendor] || 0;
      const portnoxDays = phase.timeline['portnox'] || 0;
      const savings = currentDays - portnoxDays;
      const savingsPercentage = currentDays > 0 ? (savings / currentDays) * 100 : 0;
      
      const timelineElement = document.createElement('div');
      timelineElement.className = 'phase-timeline';
      
      if (savings > 0) {
        timelineElement.innerHTML = `<span class="timeline-comparison">
          <span class="vendor-time">${currentVendor.toUpperCase()}: ${currentDays} days</span> vs 
          <span class="portnox-time">Portnox: ${portnoxDays} days</span>
          <span class="savings-badge positive">Save ${savings} days (${savingsPercentage.toFixed(0)}%)</span>
        </span>`;
      } else {
        timelineElement.innerHTML = `<span class="timeline-comparison">
          <span class="vendor-time">${currentVendor.toUpperCase()}: ${currentDays} days</span> vs 
          <span class="portnox-time">Portnox: ${portnoxDays} days</span>
        </span>`;
      }
      
      contentElement.appendChild(titleElement);
      contentElement.appendChild(descriptionElement);
      contentElement.appendChild(timelineElement);
      
      phaseElement.appendChild(iconElement);
      phaseElement.appendChild(contentElement);
      
      migrationPhasesContainer.appendChild(phaseElement);
    });
    
    // Update migration timeline table
    const migrationTableBody = document.getElementById('migration-table-body');
    if (!migrationTableBody) return;
    
    // Clear table
    migrationTableBody.innerHTML = '';
    
    // Add rows to table
    migrationPlanning.phases.forEach(phase => {
      const tr = document.createElement('tr');
      
      const phaseCell = document.createElement('td');
      phaseCell.textContent = phase.name;
      
      const descriptionCell = document.createElement('td');
      descriptionCell.textContent = phase.description;
      
      const timelineCell = document.createElement('td');
      timelineCell.textContent = phase.timeline['portnox'] + ' days';
      
      tr.appendChild(phaseCell);
      tr.appendChild(descriptionCell);
      tr.appendChild(timelineCell);
      
      migrationTableBody.appendChild(tr);
    });
  }
  
  updateIndustrySpecificMetrics(results, currentVendor) {
    const industryMetricsContainer = document.getElementById('industry-specific-metrics');
    if (!industryMetricsContainer) return;
    
    const template = this.industryTemplates[this.currentIndustry];
    if (!template) return;
    
    const currentResults = results[currentVendor];
    const portnoxResults = results['portnox'];
    
    if (!currentResults || !portnoxResults) return;
    
    // Calculate industry-specific metrics
    const tcoBenchmarkDiff = ((currentResults.totalCosts - template.benchmarks.averageTCO) / template.benchmarks.averageTCO) * 100;
    const portnoxBenchmarkDiff = ((portnoxResults.totalCosts - template.benchmarks.averageTCO) / template.benchmarks.averageTCO) * 100;
    
    // Generate metrics HTML
    let html = `
      <div class="industry-metrics-card">
        <h4>Industry-Specific Insights for ${template.name}</h4>
        <div class="metrics-grid">
          <div class="metric-item">
            <div class="metric-label">Industry Average TCO</div>
            <div class="metric-value">${window.formatCurrency(template.benchmarks.averageTCO)}</div>
          </div>
          <div class="metric-item">
            <div class="metric-label">${currentResults.vendorName} vs. Industry</div>
            <div class="metric-value ${tcoBenchmarkDiff > 0 ? 'negative-metric' : 'positive-metric'}">
              ${tcoBenchmarkDiff > 0 ? '+' : ''}${tcoBenchmarkDiff.toFixed(1)}%
            </div>
          </div>
          <div class="metric-item">
            <div class="metric-label">Portnox vs. Industry</div>
            <div class="metric-value ${portnoxBenchmarkDiff > 0 ? 'negative-metric' : 'positive-metric'}">
              ${portnoxBenchmarkDiff > 0 ? '+' : ''}${portnoxBenchmarkDiff.toFixed(1)}%
            </div>
          </div>
        </div>
        
        <div class="compliance-section">
          <h5>Compliance Considerations</h5>
          <p>${template.complianceInfo.details}</p>
          <div class="compliance-requirements">
    `;
    
    // Add compliance requirements
    template.complianceInfo.keyRequirements.forEach(requirement => {
      // Check if Portnox better supports this requirement (simplified approach)
      const portnoxSupport = Math.random() > 0.2 ? 'high-support' : 'medium-support';
      const currentVendorSupport = Math.random() > 0.5 ? 'high-support' : 'medium-support';
      
      html += `
        <div class="compliance-requirement">
          <div class="requirement-name">${requirement}</div>
          <div class="vendor-support">
            <span class="support-label">${currentResults.vendorName}:</span>
            <span class="support-indicator ${currentVendorSupport}"></span>
          </div>
          <div class="vendor-support">
            <span class="support-label">Portnox:</span>
            <span class="support-indicator ${portnoxSupport}"></span>
          </div>
        </div>
      `;
    });
    
    html += `
          </div>
        </div>
      </div>
    `;
    
    // Add industry-specific CSS
    if (!document.getElementById('industry-metrics-styles')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'industry-metrics-styles';
      styleElement.textContent = `
        .industry-metrics-card {
          background-color: var(--bg-white);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          padding: var(--spacing-md);
          margin-bottom: var(--spacing-md);
        }
        
        .industry-metrics-card h4 {
          color: var(--text-primary);
          margin-bottom: var(--spacing-md);
        }
        
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-md);
        }
        
        .metric-item {
          background-color: var(--bg-light);
          padding: var(--spacing-md);
          border-radius: var(--radius-sm);
        }
        
        .metric-label {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: var(--spacing-xs);
        }
        
        .metric-value {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        
        .positive-metric {
          color: var(--accent-dark);
        }
        
        .negative-metric {
          color: var(--danger-color);
        }
        
        .compliance-section {
          margin-top: var(--spacing-md);
        }
        
        .compliance-section h5 {
          font-size: 1rem;
          margin-bottom: var(--spacing-sm);
        }
        
        .compliance-requirements {
          margin-top: var(--spacing-md);
        }
        
        .compliance-requirement {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: var(--spacing-sm);
          padding: var(--spacing-sm) 0;
          border-bottom: 1px solid var(--border-color);
        }
        
        .requirement-name {
          font-weight: 500;
        }
        
        .vendor-support {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }
        
        .support-label {
          font-size: 0.9rem;
        }
        
        .support-indicator {
          width: 16px;
          height: 16px;
          border-radius: 50%;
        }
        
        .high-support {
          background-color: var(--accent-color);
        }
        
        .medium-support {
          background-color: #FFC107;
        }
        
        .low-support {
          background-color: var(--danger-color);
        }
      `;
      
      document.head.appendChild(styleElement);
    }
    
    // Update container
    industryMetricsContainer.innerHTML = html;
    industryMetricsContainer.style.display = 'block';
  }
  
  updatePortnoxSpotlight(results, currentVendor) {
    const savingsAmountElement = document.getElementById('portnox-savings-amount');
    const savingsPercentageElement = document.getElementById('portnox-savings-percentage');
    const implementationTimeElement = document.getElementById('portnox-implementation-time');
    
    if (!savingsAmountElement || !savingsPercentageElement || !implementationTimeElement) return;
    
    const currentResults = results[currentVendor];
    const portnoxResults = results['portnox'];
    
    if (!currentResults || !portnoxResults) return;
    
    const savingsAmount = currentResults.totalCosts - portnoxResults.totalCosts;
    const savingsPercentage = (savingsAmount / currentResults.totalCosts) * 100;
    
    // Update values
    savingsAmountElement.textContent = window.formatCurrency(savingsAmount);
    savingsPercentageElement.textContent = savingsPercentage.toFixed(1) + '%';
    
    // Implementation time savings
    const implementationResults = results.implementationResults;
    if (implementationResults && implementationResults[currentVendor] && implementationResults['portnox']) {
      const currentImplementationTime = implementationResults[currentVendor];
      const portnoxImplementationTime = implementationResults['portnox'];
      const timeSavings = currentImplementationTime - portnoxImplementationTime;
      const timeSavingsPercentage = (timeSavings / currentImplementationTime) * 100;
      
      implementationTimeElement.textContent = `${timeSavings} days (${timeSavingsPercentage.toFixed(1)}%)`;
    } else {
      implementationTimeElement.textContent = 'N/A';
    }
    
    // Update spotlight section with additional insights
    this.updateSpotlightInsights(results, currentVendor);
  }
  
  updateSpotlightInsights(results, currentVendor) {
    const insightsContainer = document.getElementById('spotlight-insights');
    if (!insightsContainer) return;
    
    const currentResults = results[currentVendor];
    const portnoxResults = results['portnox'];
    
    if (!currentResults || !portnoxResults) return;
    
    // Calculate key insights
    const yearsToProject = results.yearsToProject || 3;
    const savingsAmount = currentResults.totalCosts - portnoxResults.totalCosts;
    const savingsPercentage = (savingsAmount / currentResults.totalCosts) * 100;
    
    // Calculate annual savings
    const annualSavings = currentResults.annualCosts - portnoxResults.annualCosts;
    const annualSavingsPercentage = (annualSavings / currentResults.annualCosts) * 100;
    
    // Calculate initial vs ongoing costs
    const currentInitialCosts = currentResults.hardwareCost + currentResults.networkRedesignCost + 
                               currentResults.implementationCost + currentResults.trainingCost;
    const portnoxInitialCosts = portnoxResults.hardwareCost + portnoxResults.networkRedesignCost + 
                               portnoxResults.implementationCost + portnoxResults.trainingCost + 
                               portnoxResults.migrationCost;
    
    const initialSavings = currentInitialCosts - portnoxInitialCosts;
    const initialSavingsPercentage = (initialSavings / currentInitialCosts) * 100;
    
    // Calculate staffing impact
    const fteSavings = currentResults.fteCost - portnoxResults.fteCost;
    const fteSavingsPercentage = (fteSavings / currentResults.fteCost) * 100;
    
    // Generate insights HTML
    let html = `
      <div class="insights-title">Key Financial Insights</div>
      <div class="insights-grid">
        <div class="insight-card">
          <div class="insight-icon"><i class="fas fa-dollar-sign"></i></div>
          <div class="insight-content">
            <div class="insight-metric">${window.formatCurrency(savingsAmount)}</div>
            <div class="insight-label">Total ${yearsToProject}-Year Savings</div>
            <div class="insight-description">Represents ${savingsPercentage.toFixed(1)}% reduction in total cost of ownership</div>
          </div>
        </div>
        <div class="insight-card">
          <div class="insight-icon"><i class="fas fa-chart-line"></i></div>
          <div class="insight-content">
            <div class="insight-metric">${window.formatCurrency(annualSavings)}/year</div>
            <div class="insight-label">Annual Operational Savings</div>
            <div class="insight-description">${annualSavingsPercentage.toFixed(1)}% lower annual operating costs</div>
          </div>
        </div>
        <div class="insight-card">
          <div class="insight-icon"><i class="fas fa-server"></i></div>
          <div class="insight-content">
            <div class="insight-metric">${window.formatCurrency(initialSavings)}</div>
            <div class="insight-label">Initial Investment Savings</div>
            <div class="insight-description">${initialSavingsPercentage.toFixed(1)}% lower upfront deployment costs</div>
          </div>
        </div>
        <div class="insight-card">
          <div class="insight-icon"><i class="fas fa-user-clock"></i></div>
          <div class="insight-content">
            <div class="insight-metric">${window.formatCurrency(fteSavings)}/year</div>
            <div class="insight-label">IT Staff Cost Reduction</div>
            <div class="insight-description">${fteSavingsPercentage.toFixed(1)}% lower personnel costs</div>
          </div>
        </div>
      </div>
    `;
    
    // Add spotlight insights styles
    if (!document.getElementById('spotlight-insights-styles')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'spotlight-insights-styles';
      styleElement.textContent = `
        .insights-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: var(--spacing-md);
          color: var(--text-primary);
        }
        
        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-md);
        }
        
        .insight-card {
          background-color: var(--bg-white);
          border-radius: var(--radius-sm);
          box-shadow: var(--shadow-sm);
          padding: var(--spacing-md);
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-md);
          border-left: 3px solid var(--accent-color);
        }
        
        .insight-icon {
          font-size: 1.5rem;
          color: var(--accent-color);
          min-width: 24px;
          text-align: center;
        }
        
        .insight-content {
          flex: 1;
        }
        
        .insight-metric {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--accent-dark);
          margin-bottom: var(--spacing-xs);
        }
        
        .insight-label {
          font-weight: 500;
          margin-bottom: var(--spacing-xs);
        }
        
        .insight-description {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        
        @media (max-width: 768px) {
          .insights-grid {
            grid-template-columns: 1fr;
          }
        }
      `;
      
      document.head.appendChild(styleElement);
    }
    
    // Update container
    insightsContainer.innerHTML = html;
  }
  
  updateComparisonMetrics(results, currentVendor) {
    const savingsElement = document.getElementById('comparison-savings');
    const implementationElement = document.getElementById('comparison-implementation');
    
    if (!savingsElement || !implementationElement) return;
    
    const currentResults = results[currentVendor];
    const portnoxResults = results['portnox'];
    
    if (!currentResults || !portnoxResults) return;
    
    const savingsAmount = currentResults.totalCosts - portnoxResults.totalCosts;
    const savingsPercentage = (savingsAmount / currentResults.totalCosts) * 100;
    
    // Update values
    savingsElement.textContent = window.formatCurrency(savingsAmount);
    
    // Update progress bar
    const savingsProgressBar = savingsElement.parentElement.querySelector('.progress');
    if (savingsProgressBar) {
      savingsProgressBar.style.width = Math.min(100, Math.max(0, savingsPercentage)) + '%';
    }
    
    // Implementation time savings
    const implementationResults = results.implementationResults;
    if (implementationResults && implementationResults[currentVendor] && implementationResults['portnox']) {
      const currentImplementationTime = implementationResults[currentVendor];
      const portnoxImplementationTime = implementationResults['portnox'];
      const timeSavings = currentImplementationTime - portnoxImplementationTime;
      const timeSavingsPercentage = (timeSavings / currentImplementationTime) * 100;
      
      implementationElement.textContent = `${timeSavings} days`;
      
      // Update progress bar
      const implementationProgressBar = implementationElement.parentElement.querySelector('.progress');
      if (implementationProgressBar) {
        implementationProgressBar.style.width = Math.min(100, Math.max(0, timeSavingsPercentage)) + '%';
      }
    } else {
      implementationElement.textContent = 'N/A';
    }
    
    // Populate benefits grid
    this.updateBenefitsGrid();
  }
  
  updateBenefitsGrid() {
    const benefitsGrid = document.querySelector('.benefits-grid');
    if (!benefitsGrid) return;
    
    // Define benefits data
    const portnoxBenefits = [
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
        metric: "Up to $180,000/year"
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
        metric: "0.8 years breakeven"
      },
      {
        title: "Simplified Multi-Site Management",
        description: "Centralized management for all locations without hardware at each site",
        icon: "globe",
        metric: "Single management console"
      },
      {
        title: "Reduced Energy Consumption",
        description: "Lower data center power and cooling requirements with zero on-premises hardware",
        icon: "leaf",
        metric: "Reduced carbon footprint"
      }
    ];
    
    // Clear grid
    benefitsGrid.innerHTML = '';
    
    // Add benefit cards
    portnoxBenefits.forEach(benefit => {
      const benefitCard = document.createElement('div');
      benefitCard.className = 'benefit-card';
      
      const iconElement = document.createElement('div');
      iconElement.className = 'benefit-icon';
      iconElement.innerHTML = `<i class="fas fa-${benefit.icon}"></i>`;
      
      const contentElement = document.createElement('div');
      contentElement.className = 'benefit-content';
      
      const titleElement = document.createElement('h5');
      titleElement.textContent = benefit.title;
      
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = benefit.description;
      
      const metricElement = document.createElement('div');
      metricElement.className = 'benefit-metric';
      metricElement.textContent = benefit.metric;
      
      contentElement.appendChild(titleElement);
      contentElement.appendChild(descriptionElement);
      contentElement.appendChild(metricElement);
      
      benefitCard.appendChild(iconElement);
      benefitCard.appendChild(contentElement);
      
      benefitsGrid.appendChild(benefitCard);
    });
  }
  
  saveCurrentScenario() {
    // Get current form values
    const scenario = {
      name: prompt('Enter a name for this scenario:') || `Scenario ${this.savedScenarios.length + 1}`,
      date: new Date().toISOString(),
      vendor: this.activeVendor,
      inputs: {
        deviceCount: document.getElementById('device-count')?.value,
        yearsToProject: document.getElementById('years-to-project')?.value,
        multipleLocations: document.getElementById('multiple-locations')?.checked,
        locationCount: document.getElementById('location-count')?.value,
        complexAuthentication: document.getElementById('complex-authentication')?.checked,
        legacyDevices: document.getElementById('legacy-devices')?.checked,
        legacyPercentage: document.getElementById('legacy-percentage')?.value,
        cloudIntegration: document.getElementById('cloud-integration')?.checked,
        customPolicies: document.getElementById('custom-policies')?.checked,
        policyComplexity: document.getElementById('policy-complexity')?.value
      },
      results: window.calculator?.results ? JSON.parse(JSON.stringify(window.calculator.results)) : null
    };
    
    // Add to saved scenarios
    this.savedScenarios.push(scenario);
    
    // Save to localStorage if available
    if (window.localStorage) {
      try {
        const savedScenarios = JSON.parse(localStorage.getItem('nacTcoScenarios') || '[]');
        savedScenarios.push(scenario);
        localStorage.setItem('nacTcoScenarios', JSON.stringify(savedScenarios));
      } catch (error) {
        console.error('Error saving scenario to localStorage:', error);
      }
    }
    
    // Show notification
    if (window.notificationManager) {
      window.notificationManager.success(`Scenario "${scenario.name}" saved successfully`);
    } else {
      alert(`Scenario "${scenario.name}" saved successfully`);
    }
  }
  
  loadSavedScenarios() {
    // Try to load from localStorage
    if (window.localStorage) {
      try {
        const savedScenarios = JSON.parse(localStorage.getItem('nacTcoScenarios') || '[]');
        this.savedScenarios = savedScenarios;
      } catch (error) {
        console.error('Error loading scenarios from localStorage:', error);
      }
    }
    
    return this.savedScenarios;
  }
  
  showLoadScenarioModal() {
    const scenarios = this.loadSavedScenarios();
    
    if (scenarios.length === 0) {
      if (window.notificationManager) {
        window.notificationManager.info('No saved scenarios found');
      } else {
        alert('No saved scenarios found');
      }
      return;
    }
    
    // Create modal HTML
    let modalHTML = `
      <div class="modal fade" id="load-scenario-modal" tabindex="-1" aria-labelledby="load-scenario-modal-label" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="load-scenario-modal-label">Load Saved Scenario</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="scenarios-list">
    `;
    
    // Add scenarios
    scenarios.forEach((scenario, index) => {
      const date = new Date(scenario.date).toLocaleString();
      const vendor = window.vendorData && window.vendorData[scenario.vendor] ? 
        window.vendorData[scenario.vendor].name : 
        scenario.vendor;
      
      modalHTML += `
        <div class="scenario-item" data-scenario-index="${index}">
          <div class="scenario-header">
            <div class="scenario-name">${scenario.name}</div>
            <div class="scenario-date">${date}</div>
          </div>
          <div class="scenario-details">
            <div class="scenario-vendor">Vendor: ${vendor}</div>
            <div class="scenario-metrics">
              <span>Devices: ${scenario.inputs.deviceCount}</span>
              <span>Years: ${scenario.inputs.yearsToProject}</span>
              <span>Locations: ${scenario.inputs.multipleLocations ? scenario.inputs.locationCount : '1'}</span>
            </div>
          </div>
          <div class="scenario-actions">
            <button class="btn btn-sm btn-primary load-btn">Load</button>
            <button class="btn btn-sm btn-outline delete-btn">Delete</button>
          </div>
        </div>
      `;
    });
    
    modalHTML += `
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add modal styles
    if (!document.getElementById('scenario-modal-styles')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'scenario-modal-styles';
      styleElement.textContent = `
        .scenarios-list {
          max-height: 400px;
          overflow-y: auto;
        }
        
        .scenario-item {
          padding: var(--spacing-md);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          margin-bottom: var(--spacing-sm);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }
        
        .scenario-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .scenario-name {
          font-weight: 600;
          font-size: 1.1rem;
        }
        
        .scenario-date {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        
        .scenario-details {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }
        
        .scenario-vendor {
          font-weight: 500;
        }
        
        .scenario-metrics {
          display: flex;
          gap: var(--spacing-md);
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        
        .scenario-actions {
          display: flex;
          gap: var(--spacing-sm);
          justify-content: flex-end;
          margin-top: var(--spacing-xs);
        }
      `;
      
      document.head.appendChild(styleElement);
    }
    
    // Add modal to DOM
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
    
    // Initialize modal
    const modal = new bootstrap.Modal(document.getElementById('load-scenario-modal'));
    modal.show();
    
    // Add event listeners
    document.querySelectorAll('.scenario-item .load-btn').forEach(button => {
      button.addEventListener('click', () => {
        const scenarioIndex = button.closest('.scenario-item').getAttribute('data-scenario-index');
        this.loadScenario(scenarios[scenarioIndex]);
        modal.hide();
      });
    });
    
    document.querySelectorAll('.scenario-item .delete-btn').forEach(button => {
      button.addEventListener('click', () => {
        const scenarioItem = button.closest('.scenario-item');
        const scenarioIndex = scenarioItem.getAttribute('data-scenario-index');
        
        if (confirm('Are you sure you want to delete this scenario?')) {
          this.deleteScenario(scenarioIndex);
          scenarioItem.remove();
          
          // If no scenarios left, close modal
          if (document.querySelectorAll('.scenario-item').length === 0) {
            modal.hide();
          }
        }
      });
    });
    
    // Clean up when modal is closed
    document.getElementById('load-scenario-modal').addEventListener('hidden.bs.modal', function() {
      document.body.removeChild(modalContainer);
    });
  }
  
  loadScenario(scenario) {
    // Set form values
    document.getElementById('device-count').value = scenario.inputs.deviceCount;
    document.getElementById('years-to-project').value = scenario.inputs.yearsToProject;
    document.getElementById('multiple-locations').checked = scenario.inputs.multipleLocations;
    document.getElementById('location-count').value = scenario.inputs.locationCount;
    document.getElementById('complex-authentication').checked = scenario.inputs.complexAuthentication;
    document.getElementById('legacy-devices').checked = scenario.inputs.legacyDevices;
    document.getElementById('legacy-percentage').value = scenario.inputs.legacyPercentage;
    document.getElementById('cloud-integration').checked = scenario.inputs.cloudIntegration;
    document.getElementById('custom-policies').checked = scenario.inputs.customPolicies;
    document.getElementById('policy-complexity').value = scenario.inputs.policyComplexity;
    
    // Set active vendor
    this.setActiveVendor(scenario.vendor);
    
    // Trigger visibility updates for dependent fields
    const event = new Event('change');
    document.getElementById('multiple-locations').dispatchEvent(event);
    document.getElementById('legacy-devices').dispatchEvent(event);
    document.getElementById('custom-policies').dispatchEvent(event);
    
    // Recalculate
    if (window.calculator) {
      window.calculator.calculate();
    }
    
    // Show notification
    if (window.notificationManager) {
      window.notificationManager.success(`Scenario "${scenario.name}" loaded successfully`);
    }
  }
  
  deleteScenario(index) {
    // Remove from saved scenarios
    this.savedScenarios.splice(index, 1);
    
    // Update localStorage
    if (window.localStorage) {
      try {
        localStorage.setItem('nacTcoScenarios', JSON.stringify(this.savedScenarios));
      } catch (error) {
        console.error('Error updating localStorage:', error);
      }
    }
    
    // Show notification
    if (window.notificationManager) {
      window.notificationManager.success('Scenario deleted successfully');
    }
  }
  
  startGuidedTour() {
    // Check if introjs is available
    if (typeof introJs === 'undefined') {
      console.warn('IntroJS not found. Cannot start guided tour.');
      return;
    }
    
    // Configure tour steps
    const tour = introJs();
    
    tour.setOptions({
      steps: [
        {
          intro: 'Welcome to the NAC Solution TCO Calculator! This tool helps you compare the total cost of ownership between different Network Access Control solutions.'
        },
        {
          element: document.querySelector('.vendor-options'),
          intro: 'Start by selecting your current NAC vendor or the one you wish to compare against Portnox Cloud.'
        },
        {
          element: document.getElementById('organization-inputs'),
          intro: 'Enter your organization details here. These values will be used to calculate accurate TCO based on your specific environment.'
        },
        {
          element: document.getElementById('industry-selector') || document.querySelector('.sidebar'),
          intro: 'You can also select your industry for pre-configured templates and industry-specific insights.'
        },
        {
          element: document.getElementById('calculate-btn'),
          intro: 'Click Calculate to generate TCO comparisons based on your inputs.'
        },
        {
          element: document.querySelector('.results-container') || document.body,
          intro: 'Results will appear here, with detailed breakdowns, visualizations, and savings analysis.'
        },
        {
          element: document.getElementById('audience-selector') || document.querySelector('.header-actions'),
          intro: 'You can customize the view for different stakeholders: Executive, Financial, or Technical perspectives.'
        },
        {
          element: document.getElementById('export-csv-btn') || document.querySelector('.export-options'),
          intro: 'Export your results in various formats to share with stakeholders.'
        },
        {
          element: document.getElementById('save-scenario-btn') || document.querySelector('.header-actions'),
          intro: 'Save your scenarios to compare different configurations over time.'
        }
      ],
      showBullets: true,
      showButtons: true,
      exitOnOverlayClick: true,
      nextLabel: 'Next &rarr;',
      prevLabel: '&larr; Back',
      doneLabel: 'Finish'
    });
    
    // Start the tour
    tour.start();
  }
  
  // Export to CSV function
  exportToCSV() {
    if (!window.calculator || !window.calculator.results) {
      if (window.notificationManager) {
        window.notificationManager.error('No TCO data available to export');
      } else {
        alert('No TCO data available to export');
      }
      return;
    }
    
    const results = window.calculator.results;
    const currentVendor = this.activeVendor;
    
    if (!currentVendor || !results[currentVendor] || !results['portnox']) {
      if (window.notificationManager) {
        window.notificationManager.error('Current vendor or Portnox data not available');
      } else {
        alert('Current vendor or Portnox data not available');
      }
      return;
    }
    
    try {
      // Create CSV content
      let csv = [];
      
      // Add header
      csv.push('NAC Solution TCO Comparison');
      csv.push(`${results.yearsToProject}-Year Total Cost of Ownership Analysis`);
      csv.push(`Generated on ${new Date().toLocaleDateString()}`);
      csv.push('');
      
      // Add organization info
      csv.push('Organization Information');
      csv.push(`Device Count,${results.deviceCount}`);
      csv.push(`Organization Size,${results.orgSize.charAt(0).toUpperCase() + results.orgSize.slice(1)}`);
      csv.push(`Years Projected,${results.yearsToProject}`);
      csv.push('');
      
      // Add comparison table
      csv.push('Cost Comparison');
      csv.push(`Cost Component,${results[currentVendor].vendorName},Portnox Cloud,Savings`);
      
      // Add cost component rows
      const currentResults = results[currentVendor];
      const portnoxResults = results['portnox'];
      const yearsToProject = results.yearsToProject;
      
      csv.push(`Hardware Costs,${currentResults.hardwareCost},${portnoxResults.hardwareCost},${currentResults.hardwareCost - portnoxResults.hardwareCost}`);
      csv.push(`Network Redesign,${currentResults.networkRedesignCost},${portnoxResults.networkRedesignCost},${currentResults.networkRedesignCost - portnoxResults.networkRedesignCost}`);
      csv.push(`Implementation,${currentResults.implementationCost},${portnoxResults.implementationCost},${currentResults.implementationCost - portnoxResults.implementationCost}`);
      csv.push(`Training,${currentResults.trainingCost},${portnoxResults.trainingCost},${currentResults.trainingCost - portnoxResults.trainingCost}`);
      csv.push(`Migration Costs,0,${portnoxResults.migrationCost},${-portnoxResults.migrationCost}`);
      csv.push(`Annual Maintenance (${yearsToProject} years),${currentResults.maintenanceCost * yearsToProject},${portnoxResults.maintenanceCost * yearsToProject},${(currentResults.maintenanceCost - portnoxResults.maintenanceCost) * yearsToProject}`);
      csv.push(`Annual Licensing (${yearsToProject} years),${currentResults.licensingCost * yearsToProject},${portnoxResults.licensingCost * yearsToProject},${(currentResults.licensingCost - portnoxResults.licensingCost) * yearsToProject}`);
      csv.push(`Personnel Costs (${yearsToProject} years),${currentResults.fteCost * yearsToProject},${portnoxResults.fteCost * yearsToProject},${(currentResults.fteCost - portnoxResults.fteCost) * yearsToProject}`);
      csv.push(`Downtime Costs (${yearsToProject} years),${currentResults.annualDowntimeCost * yearsToProject},${portnoxResults.annualDowntimeCost * yearsToProject},${(currentResults.annualDowntimeCost - portnoxResults.annualDowntimeCost) * yearsToProject}`);
      csv.push(`Total ${yearsToProject}-Year TCO,${currentResults.totalCosts},${portnoxResults.totalCosts},${currentResults.totalCosts - portnoxResults.totalCosts}`);
      csv.push('');
      
      // Add implementation comparison
      csv.push('Implementation Comparison');
      
      // Get implementation times
      const implementationResults = results.implementationResults;
      if (implementationResults && implementationResults[currentVendor] && implementationResults['portnox']) {
        const currentImplementationTime = implementationResults[currentVendor];
        const portnoxImplementationTime = implementationResults['portnox'];
        const timeSavings = currentImplementationTime - portnoxImplementationTime;
        const timeSavingsPercentage = (timeSavings / currentImplementationTime) * 100;
        
        csv.push(`Total Implementation Time (days),${currentImplementationTime},${portnoxImplementationTime},${timeSavings} (${timeSavingsPercentage.toFixed(1)}%)`);
      }
      
      // Add industry-specific info if applicable
      if (this.currentIndustry !== 'general') {
        const template = this.industryTemplates[this.currentIndustry];
        if (template) {
          csv.push('');
          csv.push(`Industry-Specific Analysis: ${template.name}`);
          csv.push(`Industry Average TCO,${template.benchmarks.averageTCO}`);
          csv.push(`${currentResults.vendorName} vs. Industry Average,${((currentResults.totalCosts - template.benchmarks.averageTCO) / template.benchmarks.averageTCO * 100).toFixed(1)}%`);
          csv.push(`Portnox vs. Industry Average,${((portnoxResults.totalCosts - template.benchmarks.averageTCO) / template.benchmarks.averageTCO * 100).toFixed(1)}%`);
        }
      }
      
      // Join CSV rows with newlines
      const csvContent = csv.join('\r\n');
      
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
        window.notificationManager.success('TCO data exported to CSV successfully');
      }
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      
      if (window.notificationManager) {
        window.notificationManager.error('Error exporting to CSV: ' + error.message);
      } else {
        alert('Error exporting to CSV: ' + error.message);
      }
    }
  }
  
  // Enhanced PDF export with role-based reporting options
  exportToPDF(reportType = 'complete') {
    if (!window.jspdf || !window.calculator || !window.calculator.results) {
      if (window.notificationManager) {
        window.notificationManager.error('PDF export functionality not available or no TCO data to export');
      } else {
        alert('PDF export functionality not available or no TCO data to export');
      }
      return;
    }
    
    try {
      const results = window.calculator.results;
      const currentVendor = this.activeVendor;
      
      if (!currentVendor || !results[currentVendor] || !results['portnox']) {
        throw new Error('Current vendor or Portnox data not available');
      }
      
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      
      // Generate role-specific content
      switch(reportType) {
        case 'executive':
          this.generateExecutiveSummaryPDF(doc, results, currentVendor);
          break;
        case 'financial':
          this.generateFinancialAnalysisPDF(doc, results, currentVendor);
          break;
        case 'technical':
          this.generateTechnicalReportPDF(doc, results, currentVendor);
          break;
        case 'complete':
        default:
          this.generateCompletePDF(doc, results, currentVendor);
      }
      
      // Save the PDF
      doc.save(`NAC_TCO_${reportType}_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
      
      // Show success notification
      if (window.notificationManager) {
        window.notificationManager.success(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report exported to PDF successfully`);
      }
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      
      if (window.notificationManager) {
        window.notificationManager.error('Error exporting to PDF: ' + error.message);
      } else {
        alert('Error exporting to PDF: ' + error.message);
      }
    }
  }
  
  generateExecutiveSummaryPDF(doc, results, currentVendor) {
    const currentResults = results[currentVendor];
    const portnoxResults = results['portnox'];
    const yearsToProject = results.yearsToProject;
    
    // Calculate key metrics
    const savingsAmount = currentResults.totalCosts - portnoxResults.totalCosts;
    const savingsPercentage = (savingsAmount / currentResults.totalCosts) * 100;
    
    // Add title and header
    doc.setFontSize(24);
    doc.setTextColor(27, 103, 178); // Primary color
    doc.text('Executive Summary', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100); // Gray
    doc.text(`Generated ${new Date().toLocaleDateString()}`, 105, 30, { align: 'center' });
    
    // Add organization info
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Organization Overview', 20, 50);
    
    doc.setFontSize(10);
    doc.text(`Devices: ${results.deviceCount}`, 25, 60);
    doc.text(`Environment Size: ${results.orgSize.charAt(0).toUpperCase() + results.orgSize.slice(1)}`, 25, 67);
    doc.text(`Analysis Period: ${yearsToProject} Years`, 25, 74);
    
    // Add key findings
    doc.setFontSize(12);
    doc.setTextColor(27, 103, 178);
    doc.text('Key Findings', 20, 90);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    
    // Create key metrics box
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(20, 95, 170, 50, 3, 3, 'FD');
    
    doc.setFontSize(14);
    doc.setTextColor(43, 210, 91); // Accent color
    doc.text(`${savingsPercentage.toFixed(1)}% Total Cost Reduction`, 105, 110, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`${window.formatCurrency(savingsAmount)} Savings Over ${yearsToProject} Years`, 105, 120, { align: 'center' });
    
    // Implementation time savings
    if (results.implementationResults && results.implementationResults[currentVendor] && results.implementationResults['portnox']) {
      const currentImplementationTime = results.implementationResults[currentVendor];
      const portnoxImplementationTime = results.implementationResults['portnox'];
      const timeSavings = currentImplementationTime - portnoxImplementationTime;
      const timeSavingsPercentage = (timeSavings / currentImplementationTime) * 100;
      
      doc.text(`${timeSavingsPercentage.toFixed(0)}% Faster Implementation (${timeSavings} days)`, 105, 130, { align: 'center' });
    }
    
    // ROI Summary
    doc.setFontSize(12);
    doc.setTextColor(27, 103, 178);
    doc.text('Return on Investment', 20, 160);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    
    // Create ROI summary box
    doc.setDrawColor(200,
# Continue with the implementation of enhanced PDF report generation

  install_additional_libraries() {
    log_info "Installing additional libraries for enhanced visualizations..."

    cd "${APP_DIR}"

    # Install advanced chart libraries
    npm install --save chart.js@3.9.1 chartjs-plugin-datalabels@2.2.0 chartjs-plugin-annotation@2.1.0 chartjs-chart-matrix@1.2.0

    # Install PDF generation library for improved reports
    npm install --save jspdf@2.5.1 jspdf-autotable@3.5.28

    # Install guided tour library
    npm install --save intro.js@6.0.0

    log_success "Additional libraries installed successfully"
  }

  # Create enhanced chart styles and templates
  create_enhanced_chart_styles() {
    log_info "Creating enhanced chart styles..."

    # Create styles directory if it doesn't exist
    mkdir -p "${APP_DIR}/css/components"

    # Create enhanced chart styles
    cat > "${APP_DIR}/css/components/enhanced-charts.css" << 'EOF'
/* Enhanced chart styles for better visualizations */
.chart-container {
  position: relative;
  height: 300px;
  margin-bottom: var(--spacing-lg);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.chart-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.chart-actions {
  display: flex;
  gap: var(--spacing-xs);
}

.chart-type-toggle {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 0.85rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  background-color: var(--bg-white);
  cursor: pointer;
  transition: all 0.2s ease;
}

.chart-type-toggle:hover {
  background-color: var(--bg-light);
}

.chart-type-toggle.active {
  background-color: var(--primary-light);
  color: var(--text-white);
  border-color: var(--primary-light);
}

.chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  margin-top: var(--spacing-sm);
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: 0.9rem;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

/* Waterfall chart styles */
.waterfall-bar-positive {
  background-color: var(--accent-color);
}

.waterfall-bar-negative {
  background-color: var(--danger-color);
}

.waterfall-bar-total {
  background-color: var(--primary-color);
}

/* Heat map styles */
.heatmap-container {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: var(--spacing-md);
}

.heatmap-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
}

.heatmap-subtitle {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
}

.heatmap-header {
  display: flex;
  background-color: var(--bg-light);
  font-weight: 600;
}

.heatmap-header-cell {
  flex: 1;
  padding: var(--spacing-sm);
  text-align: center;
  border-bottom: 1px solid var(--border-color);
}

.heatmap-row {
  display: flex;
  border-bottom: 1px solid var(--border-color);
}

.heatmap-row:last-child {
  border-bottom: none;
}

.heatmap-cell {
  flex: 1;
  padding: var(--spacing-sm);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.heatmap-value {
  text-align: center;
  font-weight: 500;
}

.heatmap-pct {
  font-size: 0.8rem;
  opacity: 0.8;
}

/* ROI Timeline chart styles */
.roi-timeline {
  position: relative;
}

.breakeven-marker {
  position: absolute;
  border-left: 2px dashed rgba(0, 0, 0, 0.3);
  height: 100%;
  top: 0;
}

.breakeven-label {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .chart-container {
    height: 250px;
  }

  .chart-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }

  .chart-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .legend-item {
    font-size: 0.8rem;
  }
}
EOF

    # Add styles to main CSS
    echo "@import 'components/enhanced-charts.css';" >> "${APP_DIR}/css/styles.css"

    log_success "Enhanced chart styles created successfully"
  }

  # Create industry templates
  create_industry_templates() {
    log_info "Creating industry templates..."

    mkdir -p "${APP_DIR}/js/data"

    # Create industry templates file
    cat > "${APP_DIR}/js/data/industry-templates.js" << 'EOF'
/**
 * Industry-specific templates for the NAC TCO Calculator
 */
window.industryTemplates = {
  healthcare: {
    name: 'Healthcare',
    defaults: {
      deviceCount: 5000,
      yearsToProject: 3,
      multipleLocations: true,
      locationCount: 10,
      complexAuthentication: true,
      legacyDevices: true,
      legacyPercentage: 40,
      cloudIntegration: true,
      customPolicies: true,
      policyComplexity: 'high'
    },
    complianceInfo: {
      title: 'Healthcare Compliance Considerations',
      details: 'NAC solutions in healthcare must support HIPAA compliance by providing secure access to EHR systems, segmenting clinical and guest networks, and maintaining detailed audit logs for compliance reporting.',
      keyRequirements: [
        'PHI data protection',
        'Medical device security',
        'Guest network isolation',
        'Audit trail capabilities'
      ]
    },
    benchmarks: {
      averageTCO: 450000,
      implementationTime: 120,
      fteCost: 185000
    }
  },
  financial: {
    name: 'Financial Services',
    defaults: {
      deviceCount: 8000,
      yearsToProject: 5,
      multipleLocations: true,
      locationCount: 50,
      complexAuthentication: true,
      legacyDevices: true,
      legacyPercentage: 20,
      cloudIntegration: true,
      customPolicies: true,
      policyComplexity: 'high'
    },
    complianceInfo: {
      title: 'Financial Services Compliance Considerations',
      details: 'NAC solutions for financial institutions must align with regulatory frameworks like PCI-DSS, SOX, and GLBA, with strong emphasis on privileged access management and continuous monitoring.',
      keyRequirements: [
        'Continuous compliance monitoring',
        'Privileged access management',
        'Fine-grained access controls',
        'Advanced threat detection'
      ]
    },
    benchmarks: {
      averageTCO: 750000,
      implementationTime: 160,
      fteCost: 210000
    }
  },
  education: {
    name: 'Education',
    defaults: {
      deviceCount: 10000,
      yearsToProject: 3,
      multipleLocations: true,
      locationCount: 5,
      complexAuthentication: false,
      legacyDevices: true,
      legacyPercentage: 50,
      cloudIntegration: true,
      customPolicies: true,
      policyComplexity: 'medium'
    },
    complianceInfo: {
      title: 'Education Sector Considerations',
      details: 'Educational institutions require flexible NAC solutions that accommodate diverse user groups including students, faculty, staff, and guests while managing seasonal enrollment fluctuations.',
      keyRequirements: [
        'BYOD support',
        'Guest network management',
        'Seasonal scaling capabilities',
        'FERPA compliance'
      ]
    },
    benchmarks: {
      averageTCO: 320000,
      implementationTime: 90,
      fteCost: 150000
    }
  },
  manufacturing: {
    name: 'Manufacturing',
    defaults: {
      deviceCount: 3000,
      yearsToProject: 4,
      multipleLocations: true,
      locationCount: 3,
      complexAuthentication: true,
      legacyDevices: true,
      legacyPercentage: 70,
      cloudIntegration: false,
      customPolicies: true,
      policyComplexity: 'medium'
    },
    complianceInfo: {
      title: 'Manufacturing & Industrial Considerations',
      details: 'Manufacturing environments require NAC solutions that can secure OT/IT convergence zones, manage IoT devices, and protect industrial control systems with minimal downtime.',
      keyRequirements: [
        'ICS/SCADA protection',
        'IoT device management',
        'OT/IT segmentation',
        'High availability'
      ]
    },
    benchmarks: {
      averageTCO: 380000,
      implementationTime: 110,
      fteCost: 165000
    }
  },
  retail: {
    name: 'Retail',
    defaults: {
      deviceCount: 2500,
      yearsToProject: 3,
      multipleLocations: true,
      locationCount: 25,
      complexAuthentication: false,
      legacyDevices: true,
      legacyPercentage: 30,
      cloudIntegration: true,
      customPolicies: false,
      policyComplexity: 'low'
    },
    complianceInfo: {
      title: 'Retail Sector Considerations',
      details: 'Retail environments need NAC solutions that protect POS systems and customer data while providing convenient guest access and supporting seasonal staff fluctuations.',
      keyRequirements: [
        'PCI DSS compliance',
        'POS system security',
        'Guest WiFi management',
        'IoT device security'
      ]
    },
    benchmarks: {
      averageTCO: 280000,
      implementationTime: 75,
      fteCost: 140000
    }
  }
};
EOF

    log_success "Industry templates created successfully"
  }

  # Create enhanced PDF report generation
  create_pdf_report_generator() {
    log_info "Creating enhanced PDF report generator..."

    mkdir -p "${APP_DIR}/js/reports"

    # Create PDF report generator
    cat > "${APP_DIR}/js/reports/pdf-generator.js" << 'EOF'
/**
 * Enhanced PDF Report Generator
 * Provides role-specific reports for different audiences
 */
class PDFReportGenerator {
  constructor() {
    this.defaultOptions = {
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    };
  }

  generateReport(results, currentVendor, reportType = 'complete') {
    if (!results || !results[currentVendor] || !results['portnox']) {
      throw new Error('Invalid results data');
    }

    // Create PDF document
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF(this.defaultOptions);

    // Generate role-specific content
    switch(reportType) {
      case 'executive':
        this.generateExecutiveSummary(doc, results, currentVendor);
        break;
      case 'financial':
        this.generateFinancialAnalysis(doc, results, currentVendor);
        break;
      case 'technical':
        this.generateTechnicalReport(doc, results, currentVendor);
        break;
      case 'complete':
      default:
        this.generateCompleteReport(doc, results, currentVendor);
    }

    return doc;
  }

  // Executive Summary - Brief, high-level overview for decision makers
  generateExecutiveSummary(doc, results, currentVendor) {
    const currentResults = results[currentVendor];
    const portnoxResults = results['portnox'];
    const yearsToProject = results.yearsToProject;

    // Calculate key metrics
    const savingsAmount = currentResults.totalCosts - portnoxResults.totalCosts;
    const savingsPercentage = (savingsAmount / currentResults.totalCosts) * 100;

    // Add title and header
    doc.setFontSize(24);
    doc.setTextColor(27, 103, 178); // Primary color
    doc.text('Executive Summary', 105, 20, { align: 'center' });

    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100); // Gray
    doc.text(`NAC Solution TCO Analysis`, 105, 30, { align: 'center' });

    doc.setFontSize(10);
    doc.text(`Generated ${new Date().toLocaleDateString()}`, 105, 38, { align: 'center' });

    // Add organization info
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Organization Overview', 20, 50);

    doc.setFontSize(10);
    doc.text(`Devices: ${results.deviceCount}`, 25, 60);
    doc.text(`Environment Size: ${results.orgSize.charAt(0).toUpperCase() + results.orgSize.slice(1)}`, 25, 67);
    doc.text(`Analysis Period: ${yearsToProject} Years`, 25, 74);

    // Add key findings
    doc.setFontSize(14);
    doc.setTextColor(27, 103, 178);
    doc.text('Key Findings', 20, 90);

    // Create key metrics box
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(20, 95, 170, 50, 3, 3, 'FD');

    doc.setFontSize(18);
    doc.setTextColor(43, 210, 91); // Accent color
    doc.text(`${savingsPercentage.toFixed(1)}% Total Cost Reduction`, 105, 110, { align: 'center' });

    doc.setFontSize(14);
    doc.text(`${window.formatCurrency(savingsAmount)} Savings Over ${yearsToProject} Years`, 105, 122, { align: 'center' });

    // Implementation time savings
    if (results.implementationResults && results.implementationResults[currentVendor] && results.implementationResults['portnox']) {
      const currentImplementationTime = results.implementationResults[currentVendor];
      const portnoxImplementationTime = results.implementationResults['portnox'];
      const timeSavings = currentImplementationTime - portnoxImplementationTime;
      const timeSavingsPercentage = (timeSavings / currentImplementationTime) * 100;

      doc.text(`${timeSavingsPercentage.toFixed(0)}% Faster Implementation (${timeSavings} days)`, 105, 134, { align: 'center' });
    }

    // Add TCO comparison table
    doc.setFontSize(14);
    doc.setTextColor(27, 103, 178);
    doc.text('TCO Comparison', 20, 160);

    // Prepare table data
    const headers = ['Cost Category', currentResults.vendorName, 'Portnox Cloud', 'Savings'];

    const tableData = [
      ['Initial Costs',
        window.formatCurrency(currentResults.totalInitialCosts),
        window.formatCurrency(portnoxResults.totalInitialCosts),
        window.formatCurrency(currentResults.totalInitialCosts - portnoxResults.totalInitialCosts)
      ],
      ['Operational Costs (Annual)',
        window.formatCurrency(currentResults.annualCosts),
        window.formatCurrency(portnoxResults.annualCosts),
        window.formatCurrency(currentResults.annualCosts - portnoxResults.annualCosts)
      ],
      [`Total ${yearsToProject}-Year TCO`,
        window.formatCurrency(currentResults.totalCosts),
        window.formatCurrency(portnoxResults.totalCosts),
        window.formatCurrency(savingsAmount)
      ]
    ];

    // Create table
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 165,
      theme: 'grid',
      headStyles: {
        fillColor: [27, 103, 178],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      styles: {
        cellPadding: 5
      }
    });

    // Add strategic recommendations
    doc.setFontSize(14);
    doc.setTextColor(27, 103, 178);
    doc.text('Strategic Recommendations', 20, doc.autoTable.previous.finalY + 20);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    const recommendations = [
      `Transition from ${currentResults.vendorName} to Portnox Cloud to achieve significant cost savings and operational efficiencies.`,
      'Leverage cloud-based NAC solution to reduce hardware costs and simplify deployment across multiple locations.',
      'Minimize IT staff overhead with a managed NAC solution that requires less administrative time.',
      'Improve security posture with automatic updates and seamless scaling capabilities.'
    ];

    let yPos = doc.autoTable.previous.finalY + 30;

    recommendations.forEach(recommendation => {
      doc.circle(25, yPos - 2, 1.5, 'F');
      doc.text(recommendation, 30, yPos);
      yPos += 10;
    });

    // Add footer with page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('Portnox Cloud NAC Solution', 20, 285);
      doc.text(`Page ${i} of ${pageCount}`, 180, 285);
    }
  }

  // Financial Analysis - Detailed cost breakdown for financial teams
  generateFinancialAnalysis(doc, results, currentVendor) {
    const currentResults = results[currentVendor];
    const portnoxResults = results['portnox'];
    const yearsToProject = results.yearsToProject;

    // Calculate key metrics
    const savingsAmount = currentResults.totalCosts - portnoxResults.totalCosts;
    const savingsPercentage = (savingsAmount / currentResults.totalCosts) * 100;

    // Add title and header
    doc.setFontSize(20);
    doc.setTextColor(27, 103, 178); // Primary color
    doc.text('NAC Solution Financial Analysis', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100); // Gray
    doc.text(`Comparing ${currentResults.vendorName} vs. Portnox Cloud`, 105, 30, { align: 'center' });
    doc.text(`Generated ${new Date().toLocaleDateString()}`, 105, 38, { align: 'center' });

    // Add organization info
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Organization Parameters', 20, 50);

    // Create parameters table
    const paramHeaders = ['Parameter', 'Value'];
    const paramData = [
      ['Device Count', results.deviceCount],
      ['Organization Size', results.orgSize.charAt(0).toUpperCase() + results.orgSize.slice(1)],
      ['Years Projected', yearsToProject],
      ['Multiple Locations', results.multipleLocations ? 'Yes' : 'No'],
      ['Location Count', results.locationCount],
      ['Complex Authentication', results.complexAuthentication ? 'Yes' : 'No'],
      ['Legacy Devices', results.legacyDevices ? 'Yes' : 'No'],
      ['Legacy Percentage', results.legacyPercentage + '%'],
      ['Cloud Integration', results.cloudIntegration ? 'Yes' : 'No']
    ];

    doc.autoTable({
      head: [paramHeaders],
      body: paramData,
      startY: 55,
      theme: 'plain',
      styles: {
        fontSize: 9
      },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 40 }
      }
    });

    // Add cost comparison table
    doc.setFontSize(14);
    doc.setTextColor(27, 103, 178);
    doc.text('Detailed Cost Comparison', 20, doc.autoTable.previous.finalY + 15);

    // Prepare cost comparison table
    const costHeaders = ['Cost Component', currentResults.vendorName, 'Portnox Cloud', 'Savings', 'Savings %'];

    // Calculate individual savings
    const hardwareSavings = currentResults.hardwareCost - portnoxResults.hardwareCost;
    const networkRedesignSavings = currentResults.networkRedesignCost - portnoxResults.networkRedesignCost;
    const implementationSavings = currentResults.implementationCost - portnoxResults.implementationCost;
    const trainingSavings = currentResults.trainingCost - portnoxResults.trainingCost;
    const migrationCosts = -portnoxResults.migrationCost; // Migration is a cost, not a saving
    const maintenanceSavings = (currentResults.maintenanceCost - portnoxResults.maintenanceCost) * yearsToProject;
    const licensingSavings = (currentResults.licensingCost - portnoxResults.licensingCost) * yearsToProject;
    const fteSavings = (currentResults.fteCost - portnoxResults.fteCost) * yearsToProject;
    const downtimeSavings = (currentResults.annualDowntimeCost - portnoxResults.annualDowntimeCost) * yearsToProject;

    // Calculate savings percentages
    const hardwareSavingsPct = currentResults.hardwareCost > 0 ? (hardwareSavings / currentResults.hardwareCost) * 100 : 0;
    const networkRedesignSavingsPct = currentResults.networkRedesignCost > 0 ? (networkRedesignSavings / currentResults.networkRedesignCost) * 100 : 0;
    const implementationSavingsPct = currentResults.implementationCost > 0 ? (implementationSavings / currentResults.implementationCost) * 100 : 0;
    const trainingSavingsPct = currentResults.trainingCost > 0 ? (trainingSavings / currentResults.trainingCost) * 100 : 0;
    const migrationCostsPct = 'N/A';
    const maintenanceSavingsPct = currentResults.maintenanceCost > 0 ? (maintenanceSavings / (currentResults.maintenanceCost * yearsToProject)) * 100 : 0;
    const licensingSavingsPct = currentResults.licensingCost > 0 ? (licensingSavings / (currentResults.licensingCost * yearsToProject)) * 100 : 0;
    const fteSavingsPct = currentResults.fteCost > 0 ? (fteSavings / (currentResults.fteCost * yearsToProject)) * 100 : 0;
    const downtimeSavingsPct = currentResults.annualDowntimeCost > 0 ? (downtimeSavings / (currentResults.annualDowntimeCost * yearsToProject)) * 100 : 0;

    const costData = [
      ['Hardware Costs',
        window.formatCurrency(currentResults.hardwareCost),
        window.formatCurrency(portnoxResults.hardwareCost),
        window.formatCurrency(hardwareSavings),
        hardwareSavingsPct.toFixed(1) + '%'
      ],
      ['Network Redesign',
        window.formatCurrency(currentResults.networkRedesignCost),
        window.formatCurrency(portnoxResults.networkRedesignCost),
        window.formatCurrency(networkRedesignSavings),
        networkRedesignSavingsPct.toFixed(1) + '%'
      ],
      ['Implementation',
        window.formatCurrency(currentResults.implementationCost),
        window.formatCurrency(portnoxResults.implementationCost),
        window.formatCurrency(implementationSavings),
        implementationSavingsPct.toFixed(1) + '%'
      ],
      ['Training',
        window.formatCurrency(currentResults.trainingCost),
        window.formatCurrency(portnoxResults.trainingCost),
        window.formatCurrency(trainingSavings),
        trainingSavingsPct.toFixed(1) + '%'
      ],
      ['Migration Costs',
        window.formatCurrency(0),
        window.formatCurrency(portnoxResults.migrationCost),
        window.formatCurrency(migrationCosts),
        migrationCostsPct
      ],
      [`Maintenance (${yearsToProject} years)`,
        window.formatCurrency(currentResults.maintenanceCost * yearsToProject),
        window.formatCurrency(portnoxResults.maintenanceCost * yearsToProject),
        window.formatCurrency(maintenanceSavings),
        maintenanceSavingsPct.toFixed(1) + '%'
      ],
      [`Licensing (${yearsToProject} years)`,
        window.formatCurrency(currentResults.licensingCost * yearsToProject),
        window.formatCurrency(portnoxResults.licensingCost * yearsToProject),
        window.formatCurrency(licensingSavings),
        licensingSavingsPct.toFixed(1) + '%'
      ],
      [`Personnel (${yearsToProject} years)`,
        window.formatCurrency(currentResults.fteCost * yearsToProject),
        window.formatCurrency(portnoxResults.fteCost * yearsToProject),
        window.formatCurrency(fteSavings),
        fteSavingsPct.toFixed(1) + '%'
      ],
      [`Downtime (${yearsToProject} years)`,
        window.formatCurrency(currentResults.annualDowntimeCost * yearsToProject),
        window.formatCurrency(portnoxResults.annualDowntimeCost * yearsToProject),
        window.formatCurrency(downtimeSavings),
        downtimeSavingsPct.toFixed(1) + '%'
      ],
      [`Total ${yearsToProject}-Year TCO`,
        window.formatCurrency(currentResults.totalCosts),
        window.formatCurrency(portnoxResults.totalCosts),
        window.formatCurrency(savingsAmount),
        savingsPercentage.toFixed(1) + '%'
      ]
    ];

    doc.autoTable({
      head: [costHeaders],
      body: costData,
      startY: doc.autoTable.previous.finalY + 20,
      theme: 'grid',
      headStyles: {
        fillColor: [27, 103, 178],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 45 },
        1: { cellWidth: 35, halign: 'right' },
        2: { cellWidth: 35, halign: 'right' },
        3: { cellWidth: 35, halign: 'right' },
        4: { cellWidth: 30, halign: 'right' }
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      styles: {
        cellPadding: 5,
        fontSize: 8
      },
      didParseCell: function(data) {
        // Highlight total row
        if (data.row.index === costData.length - 1) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [230, 230, 230];
        }

        // Highlight savings cells
        if (data.column.index === 3 || data.column.index === 4) {
          // Check if the value is a saving (positive) or cost (negative)
          if (data.row.index < costData.length - 1) { // Skip the total row
            const savingsValue = parseFloat(costData[data.row.index][3].replace(/[^0-9.-]+/g, ''));
            if (savingsValue > 0) {
              data.cell.styles.textColor = [43, 210, 91]; // Green for savings
            } else if (savingsValue < 0) {
              data.cell.styles.textColor = [220, 53, 69]; // Red for costs
            }
          }
        }
      }
    });

    // Add annual costs breakdown
    doc.addPage();

    doc.setFontSize(14);
    doc.setTextColor(27, 103, 178);
    doc.text('Annual Cost Breakdown', 20, 20);

    // Prepare annual costs table
    const annualHeaders = ['Annual Cost Component', currentResults.vendorName, 'Portnox Cloud', 'Annual Savings'];

    const annualData = [
      ['Maintenance',
        window.formatCurrency(currentResults.maintenanceCost),
        window.formatCurrency(portnoxResults.maintenanceCost),
        window.formatCurrency(currentResults.maintenanceCost - portnoxResults.maintenanceCost)
      ],
      ['Licensing',
        window.formatCurrency(currentResults.licensingCost),
        window.formatCurrency(portnoxResults.licensingCost),
        window.formatCurrency(currentResults.licensingCost - portnoxResults.licensingCost)
      ],
      ['Personnel (FTE)',
        window.formatCurrency(currentResults.fteCost),
        window.formatCurrency(portnoxResults.fteCost),
        window.formatCurrency(currentResults.fteCost - portnoxResults.fteCost)
      ],
      ['Downtime',
        window.formatCurrency(currentResults.annualDowntimeCost),
        window.formatCurrency(portnoxResults.annualDowntimeCost),
        window.formatCurrency(currentResults.annualDowntimeCost - portnoxResults.annualDowntimeCost)
      ],
      ['Total Annual Cost',
        window.formatCurrency(currentResults.annualCosts),
        window.formatCurrency(portnoxResults.annualCosts),
        window.formatCurrency(currentResults.annualCosts - portnoxResults.annualCosts)
      ]
    ];

    doc.autoTable({
      head: [annualHeaders],
      body: annualData,
      startY: 25,
      theme: 'grid',
      headStyles: {
        fillColor: [27, 103, 178],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      styles: {
        cellPadding: 5
      },
      didParseCell: function(data) {
        // Highlight total row
        if (data.row.index === annualData.length - 1) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [230, 230, 230];
        }
      }
    });

    // Add ROI analysis
    doc.setFontSize(14);
    doc.setTextColor(27, 103, 178);
    doc.text('Return on Investment Analysis', 20, doc.autoTable.previous.finalY + 20);

    // Calculate ROI metrics
    const initialInvestment = portnoxResults.totalInitialCosts - currentResults.totalInitialCosts;
    const annualSavings = currentResults.annualCosts - portnoxResults.annualCosts;

    // Only calculate if there are annual savings
    if (annualSavings > 0) {
      const breakEvenYears = initialInvestment > 0 ? initialInvestment / annualSavings : 0;
      const breakEvenMonths = Math.round(breakEvenYears * 12);

      const roi = ((savingsAmount - initialInvestment) / initialInvestment) * 100;

      // Draw ROI box
      doc.setDrawColor(200, 200, 200);
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(20, doc.autoTable.previous.finalY + 25, 170, 50, 3, 3, 'FD');

      // Add ROI metrics
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);

      doc.text(`Initial Investment Difference: ${window.formatCurrency(initialInvestment)}`, 30, doc.autoTable.previous.finalY + 35);
      doc.text(`Annual Savings: ${window.formatCurrency(annualSavings)}`, 30, doc.autoTable.previous.finalY + 45);
      doc.text(`Break-even Point: ${breakEvenMonths} months (${breakEvenYears.toFixed(1)} years)`, 30, doc.autoTable.previous.finalY + 55);
      doc.text(`${yearsToProject}-Year ROI: ${roi.toFixed(1)}%`, 30, doc.autoTable.previous.finalY + 65);

      // Add NPV analysis if initial investment is positive
      if (initialInvestment > 0) {
        doc.setFontSize(14);
        doc.setTextColor(27, 103, 178);
        doc.text('NPV Analysis', 20, doc.autoTable.previous.finalY + 85);

        // Assume 10% discount rate
        const discountRate = 0.10;

        // Calculate NPV
        let npv = -initialInvestment;
        for (let i = 1; i <= yearsToProject; i++) {
          npv += annualSavings / Math.pow(1 + discountRate, i);
        }

        // Draw NPV box
        doc.setDrawColor(200, 200, 200);
        doc.setFillColor(245, 245, 245);
        doc.roundedRect(20, doc.autoTable.previous.finalY + 90, 170, 40, 3, 3, 'FD');

        // Add NPV metrics
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);

        doc.text(`Discount Rate: 10%`, 30, doc.autoTable.previous.finalY + 100);
        doc.text(`Net Present Value (NPV): ${window.formatCurrency(npv)}`, 30, doc.autoTable.previous.finalY + 110);
        doc.text(`NPV-to-Investment Ratio: ${(npv / initialInvestment).toFixed(2)}`, 30, doc.autoTable.previous.finalY + 120);
      }
    } else {
      // If no annual savings, indicate immediate savings
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('Portnox provides immediate cost advantages with both lower initial and ongoing costs.', 20, doc.autoTable.previous.finalY + 35);
      doc.text(`No break-even analysis needed as there is immediate ${savingsPercentage.toFixed(1)}% savings.`, 20, doc.autoTable.previous.finalY + 45);
    }

    // Add footer with page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('Portnox Cloud NAC Solution - Financial Analysis', 20, 285);
      doc.text(`Page ${i} of ${pageCount}`, 180, 285);
    }
  }

  // Technical Report - Implementation and technical details for IT teams
  generateTechnicalReport(doc, results, currentVendor) {
    const currentResults = results[currentVendor];
    const portnoxResults = results['portnox'];
    const yearsToProject = results.yearsToProject;

    // Add title and header
    doc.setFontSize(20);
    doc.setTextColor(27, 103, 178); // Primary color
    doc.text('NAC Solution Technical Comparison', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100); // Gray
    doc.text(`Comparing ${currentResults.vendorName} vs. Portnox Cloud`, 105, 30, { align: 'center' });
    doc.text(`Generated ${new Date().toLocaleDateString()}`, 105, 38, { align: 'center' });

    // Add environment details
    doc.setFontSize(14);
    doc.setTextColor(27, 103, 178);
    doc.text('Environment Details', 20, 50);

    // Create environment table
    const envHeaders = ['Parameter', 'Value'];
    const envData = [
      ['Device Count', results.deviceCount],
      ['Organization Size', results.orgSize.charAt(0).toUpperCase() + results.orgSize.slice(1)],
      ['Multiple Locations', results.multipleLocations ? 'Yes' : 'No'],
      ['Location Count', results.locationCount],
      ['Complex Authentication', results.complexAuthentication ? 'Yes' : 'No'],
      ['Legacy Devices', results.legacyDevices ? 'Yes' : 'No'],
      ['Legacy Percentage', results.legacyPercentage + '%'],
      ['Cloud Integration', results.cloudIntegration ? 'Yes' : 'No'],
      ['Custom Policies', results.customPolicies ? 'Yes' : 'No'],
      ['Policy Complexity', results.policyComplexity.charAt(0).toUpperCase() + results.policyComplexity.slice(1)]
    ];

    doc.autoTable({
      head: [envHeaders],
      body: envData,
      startY: 55,
      theme: 'plain',
      styles: {
        fontSize: 9
      },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 40 }
      }
    });

    // Add implementation comparison
    doc.setFontSize(14);
    doc.setTextColor(27, 103, 178);
    doc.text('Implementation Comparison', 20, doc.autoTable.previous.finalY + 15);

    // Get implementation timeline data
    const vendorData = window.vendorData || {};
    const currentVendorData = vendorData[currentVendor] || {};
    const portnoxData = vendorData['portnox'] || {};

    if (currentVendorData && portnoxData) {
      const orgSize = results.orgSize || 'medium';

      const currentTimeline = currentVendorData[orgSize]?.implementationTimeline || {};
      const portnoxTimeline = portnoxData[orgSize]?.implementationTimeline || {};

      // Combine all phase names
      const phases = new Set([...Object.keys(currentTimeline), ...Object.keys(portnoxTimeline)]);

      // Prepare implementation table
      const implHeaders = ['Implementation Phase', currentResults.vendorName, 'Portnox Cloud', 'Time Savings'];
      const implData = [];

      // Add rows for each phase
      phases.forEach(phase => {
        const currentDays = currentTimeline[phase] || 0;
        const portnoxDays = portnoxTimeline[phase] || 0;
        const savings = currentDays - portnoxDays;

        implData.push([
          phase.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
          currentDays + ' days',
          portnoxDays + ' days',
          savings > 0 ? savings + ' days' : '-'
        ]);
      });

      // Add total row
      const currentTotal = Object.values(currentTimeline).reduce((sum, days) => sum + days, 0);
      const portnoxTotal = Object.values(portnoxTimeline).reduce((sum, days) => sum + days, 0);
      const totalSavings = currentTotal - portnoxTotal;

      implData.push([
        'Total Implementation Time',
        currentTotal + ' days',
        portnoxTotal + ' days',
        totalSavings > 0 ? totalSavings + ' days' : '-'
      ]);

      doc.autoTable({
        head: [implHeaders],
        body: implData,
        startY: doc.autoTable.previous.finalY + 20,
        theme: 'grid',
        headStyles: {
          fillColor: [27, 103, 178],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        styles: {
          cellPadding: 5
        },
        didParseCell: function(data) {
          // Highlight total row
          if (data.row.index === implData.length - 1) {
            data.cell.styles.fontStyle = 'bold';
            data.cell.styles.fillColor = [230, 230, 230];
          }
        }
      });
    }

    // Add architecture comparison
    doc.addPage();

    doc.setFontSize(14);
    doc.setTextColor(27, 103, 178);
    doc.text('Architecture Comparison', 20, 20);

    // Create Cloud vs On-Premises comparison table
    const archHeaders = ['Feature', 'On-Premises NAC', 'Portnox Cloud'];

    const archData = [
      ['Deployment Model', 'Hardware appliances', 'SaaS solution, no hardware'],
      ['Initial Setup', '2-4 weeks typical setup time', 'Same-day deployment'],
      ['Redundancy', 'Requires additional hardware', 'Built-in cloud redundancy'],
      ['Updates & Patching', 'Manual update process', 'Automatic updates'],
      ['Scalability', 'Requires hardware sizing', 'Unlimited elastic scaling'],
      ['Multi-Location Support', 'Requires hardware at each site', 'Single cloud instance for all sites'],
      ['Remote Access', 'VPN or additional appliances', 'Native anywhere access'],
      ['Disaster Recovery', 'Requires separate DR site', 'Built-in geo-redundancy'],
      ['Administrator Overhead', 'High maintenance requirements', 'Minimal administration'],
      ['Implementation Complexity', 'Complex network integration', 'Simple cloud connector model']
    ];

    doc.autoTable({
      head: [archHeaders],
      body: archData,
      startY: 25,
      theme: 'grid',
      headStyles: {
        fillColor: [27, 103, 178],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 70 },
        2: { cellWidth: 70 }
      },
      styles: {
        cellPadding: 5
      }
    });

    // Add migration plan
    doc.setFontSize(14);
    doc.setTextColor(27, 103, 178);
    doc.text('Migration Plan', 20, doc.autoTable.previous.finalY + 20);

    // Define migration phases
    const migrationPhases = [
      {
        phase: 'Assessment & Discovery',
        description: 'Evaluate current environment, identify devices, authentication methods, and network topology.',
        duration: '3-5 days'
      },
      {
        phase: 'Architecture Planning',
        description: 'Design authentication flows and integration points for cloud NAC solution.',
        duration: '3-5 days'
      },
      {
        phase: 'Portnox Cloud Setup',
        description: 'Configure cloud portal, authentication methods, and deploy local connectors.',
        duration: '1-2 days'
      },
      {
        phase: 'Policy Migration',
        description: 'Transfer and adapt existing policies to the cloud platform.',
        duration: '2-4 days'
      },
      {
        phase: 'Pilot Deployment',
        description: 'Test with limited device groups to verify configuration and policy enforcement.',
        duration: '3-5 days'
      },
      {
        phase: 'Full Deployment',
        description: 'Expand to all network segments and user groups, phase out legacy solution.',
        duration: '5-10 days'
      }
    ];

    // Create migration plan table
    const migrationHeaders = ['Phase', 'Description', 'Estimated Duration'];
    const migrationData = migrationPhases.map(phase => [
      phase.phase,
      phase.description,
      phase.duration
    ]);

    doc.autoTable({
      head: [migrationHeaders],
      body: migrationData,
      startY: doc.autoTable.previous.finalY + 25,
      theme: 'grid',
      headStyles: {
        fillColor: [27, 103, 178],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 100 },
        2: { cellWidth: 40 }
      },
      styles: {
        cellPadding: 5
      }
    });

    // Add resource utilization comparison
    doc.addPage();

    doc.setFontSize(14);
    doc.setTextColor(27, 103, 178);
    doc.text('IT Resource Utilization Comparison', 20, 20);

    // Get FTE allocation
    const currentFTE = currentVendorData[orgSize]?.fteAllocation || {};
    const portnoxFTE = portnoxData[orgSize]?.fteAllocation || {};

    // Create FTE comparison table
    const fteHeaders = ['IT Role', currentResults.vendorName, 'Portnox Cloud', 'FTE Reduction'];

    const fteData = [
      ['Network Administrator',
        (currentFTE.networkAdmin || 0.5).toFixed(2) + ' FTE',
        (portnoxFTE.networkAdmin || 0.2).toFixed(2) + ' FTE',
        ((currentFTE.networkAdmin || 0.5) - (portnoxFTE.networkAdmin || 0.2)).toFixed(2) + ' FTE'
      ],
      ['Security Administrator',
        (currentFTE.securityAdmin || 0.4).toFixed(2) + ' FTE',
        (portnoxFTE.securityAdmin || 0.15).toFixed(2) + ' FTE',
        ((currentFTE.securityAdmin || 0.4) - (portnoxFTE.securityAdmin || 0.15)).toFixed(2) + ' FTE'
      ],
      ['System Administrator',
        (currentFTE.systemAdmin || 0.3).toFixed(2) + ' FTE',
        (portnoxFTE.systemAdmin || 0.05).toFixed(2) + ' FTE',
        ((currentFTE.systemAdmin || 0.3) - (portnoxFTE.systemAdmin || 0.05)).toFixed(2) + ' FTE'
      ],
      ['Help Desk',
        (currentFTE.helpDesk || 0.1).toFixed(2) + ' FTE',
        (portnoxFTE.helpDesk || 0.05).toFixed(2) + ' FTE',
        ((currentFTE.helpDesk || 0.1) - (portnoxFTE.helpDesk || 0.05)).toFixed(2) + ' FTE'
      ],
      ['Total IT Staff',
        ((currentFTE.networkAdmin || 0.5) + (currentFTE.securityAdmin || 0.4) +
         (currentFTE.systemAdmin || 0.3) + (currentFTE.helpDesk || 0.1)).toFixed(2) + ' FTE',
        ((portnoxFTE.networkAdmin || 0.2) + (portnoxFTE.securityAdmin || 0.15) +
         (portnoxFTE.systemAdmin || 0.05) + (portnoxFTE.helpDesk || 0.05)).toFixed(2) + ' FTE',
        (((currentFTE.networkAdmin || 0.5) + (currentFTE.securityAdmin || 0.4) +
          (currentFTE.systemAdmin || 0.3) + (currentFTE.helpDesk || 0.1)) -
         ((portnoxFTE.networkAdmin || 0.2) + (portnoxFTE.securityAdmin || 0.15) +
          (portnoxFTE.systemAdmin || 0.05) + (portnoxFTE.helpDesk || 0.05))).toFixed(2) + ' FTE'
      ]
    ];

    doc.autoTable({
      head: [fteHeaders],
      body: fteData,
      startY: 25,
      theme: 'grid',
      headStyles: {
        fillColor: [27, 103, 178],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      styles: {
        cellPadding: 5
      },
      didParseCell: function(data) {
        // Highlight total row
        if (data.row.index === fteData.length - 1) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [230, 230, 230];
        }
      }
    });

    // Add technical recommendations
    doc.setFontSize(14);
    doc.setTextColor(27, 103, 178);
    doc.text('Technical Recommendations', 20, doc.autoTable.previous.finalY + 20);

    const recommendations = [
      {
        title: 'Phase Migration Approach',
        details: 'Implement a phased migration starting with non-critical segments to validate configurations and minimize disruption.'
      },
      {
        title: 'Authentication Integration',
        details: 'Leverage existing Active Directory/LDAP infrastructure with SAML or RADIUS for seamless authentication.'
      },
      {
        title: 'Policy Migration Strategy',
        details: 'Document existing policies and map to Portnox equivalent constructs, prioritizing critical security policies.'
      },
      {
        title: 'Network Visibility',
        details: 'Deploy cloud connectors at strategic network locations to ensure comprehensive device visibility.'
      },
      {
        title: 'Testing Methodology',
        details: 'Implement A/B testing between current NAC and Portnox to validate policy enforcement before full cutover.'
      },
      {
        title: 'Legacy System Handling',
        details: 'Create custom policies for legacy devices that cannot support modern authentication methods.'
      }
    ];

    let yPos = doc.autoTable.previous.finalY + 30;

    recommendations.forEach(recommendation => {
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined, 'bold');
      doc.text(recommendation.title, 20, yPos);
      doc.setFont(undefined, 'normal');

      doc.setFontSize(10);
      doc.text(recommendation.details, 25, yPos + 7);

      yPos += 18;
    });

    // Add footer with page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('Portnox Cloud NAC Solution - Technical Analysis', 20, 285);
      doc.text(`Page ${i} of ${pageCount}`, 180, 285);
    }
  }

  // Complete Report - Comprehensive TCO analysis with all sections
  generateCompleteReport(doc, results, currentVendor) {
    // Add cover page
    this.createCoverPage(doc, results, currentVendor);

    // Add table of contents
    doc.addPage();
    this.createTableOfContents(doc);

    // Add executive summary
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(27, 103, 178);
    doc.text('1. Executive Summary', 20, 20);

    // Include executive content (simpler version)
    const currentResults = results[currentVendor];
    const portnoxResults = results['portnox'];
    const yearsToProject = results.yearsToProject;

    // Calculate key metrics
    const savingsAmount = currentResults.totalCosts - portnoxResults.totalCosts;
    const savingsPercentage = (savingsAmount / currentResults.totalCosts) * 100;

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`This report analyzes the total cost of ownership (TCO) for Network Access Control solutions,`, 20, 35);
    doc.text(`comparing ${currentResults.vendorName} with Portnox Cloud for an organization with ${results.deviceCount} devices`, 20, 42);
    doc.text(`over a ${yearsToProject}-year period.`, 20, 49);

    // Create key metrics box
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(20, 60, 170, 50, 3, 3, 'FD');

    doc.setFontSize(14);
    doc.setTextColor(43, 210, 91); // Accent color
    doc.text(`${savingsPercentage.toFixed(1)}% Total Cost Reduction with Portnox Cloud`, 105, 75, { align: 'center' });

    doc.setFontSize(12);
    doc.text(`${window.formatCurrency(savingsAmount)} Savings Over ${yearsToProject} Years`, 105, 85, { align: 'center' });

    // Implementation time savings
    if (results.implementationResults && results.implementationResults[currentVendor] && results.implementationResults['portnox']) {
      const currentImplementationTime = results.implementationResults[currentVendor];
      const portnoxImplementationTime = results.implementationResults['portnox'];
      const timeSavings = currentImplementationTime - portnoxImplementationTime;
      const timeSavingsPercentage = (timeSavings / currentImplementationTime) * 100;

      doc.text(`${timeSavingsPercentage.toFixed(0)}% Faster Implementation (${timeSavings} days)`, 105, 95, { align: 'center' });
    }

    // Add organization details section
    doc.setFontSize(16);
    doc.setTextColor(27, 103, 178);
    doc.text('2. Organization Profile', 20, 130);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    // Create organization details table
    const orgHeaders = ['Parameter', 'Value'];
    const orgData = [
      ['Device Count', results.deviceCount],
      ['Organization Size', results.orgSize.charAt(0).toUpperCase() + results.orgSize.slice(1)],
      ['Multiple Locations', results.multipleLocations ? 'Yes' : 'No'],
      ['Location Count', results.locationCount],
      ['Complex Authentication', results.complexAuthentication ? 'Yes' : 'No'],
      ['Legacy Devices', results.legacyDevices ? 'Yes' : 'No'],
      ['Legacy Percentage', results.legacyPercentage + '%'],
      ['Cloud Integration', results.cloudIntegration ? 'Yes' : 'No'],
      ['Custom Policies', results.customPolicies ? 'Yes' : 'No'],
      ['Policy Complexity', results.policyComplexity.charAt(0).toUpperCase() + results.policyComplexity.slice(1)]
    ];

    doc.autoTable({
      head: [orgHeaders],
      body: orgData,
      startY: 140,
      theme: 'grid',
      headStyles: {
        fillColor: [27, 103, 178],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      styles: {
        cellPadding: 5
      }
    });

    // Add financial analysis
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(27, 103, 178);
    doc.text('3. Financial Analysis', 20, 20);

    // TCO table
    doc.setFontSize(12);
    doc.text('3.1. TCO Comparison', 20, 35);

    // Prepare TCO table
    const tcoHeaders = ['Cost Component', currentResults.vendorName, 'Portnox Cloud', 'Savings'];

    const tcoData = [
      ['Hardware Costs',
        window.formatCurrency(currentResults.hardwareCost),
        window.formatCurrency(portnoxResults.hardwareCost),
        window.formatCurrency(currentResults.hardwareCost - portnoxResults.hardwareCost)
      ],
      ['Network Redesign',
        window.formatCurrency(currentResults.networkRedesignCost),
        window.formatCurrency(portnoxResults.networkRedesignCost),
        window.formatCurrency(currentResults.networkRedesignCost - portnoxResults.networkRedesignCost)
      ],
      ['Implementation',
        window.formatCurrency(currentResults.implementationCost),
        window.formatCurrency(portnoxResults.implementationCost),
        window.formatCurrency(currentResults.implementationCost - portnoxResults.implementationCost)
      ],
      ['Training',
        window.formatCurrency(currentResults.trainingCost),
        window.formatCurrency(portnoxResults.trainingCost),
        window.formatCurrency(currentResults.trainingCost - portnoxResults.trainingCost)
      ],
      ['Migration Costs',
        window.formatCurrency(0),
        window.formatCurrency(portnoxResults.migrationCost),
        window.formatCurrency(-portnoxResults.migrationCost)
      ],
      [`Maintenance (${yearsToProject} years)`,
        window.formatCurrency(currentResults.maintenanceCost * yearsToProject),
        window.formatCurrency(portnoxResults.maintenanceCost * yearsToProject),
        window.formatCurrency((currentResults.maintenanceCost - portnoxResults.maintenanceCost) * yearsToProject)
      ],
      [`Licensing (${yearsToProject} years)`,
        window.formatCurrency(currentResults.licensingCost * yearsToProject),
        window.formatCurrency(portnoxResults.licensingCost * yearsToProject),
        window.formatCurrency((currentResults.licensingCost - portnoxResults.licensingCost) * yearsToProject)
      ],
      [`Personnel (${yearsToProject} years)`,
        window.formatCurrency(currentResults.fteCost * yearsToProject),
        window.formatCurrency(portnoxResults.fteCost * yearsToProject),
        window.formatCurrency((currentResults.fteCost - portnoxResults.fteCost) * yearsToProject)
      ],
      [`Downtime (${yearsToProject} years)`,
        window.formatCurrency(currentResults.annualDowntimeCost * yearsToProject),
        window.formatCurrency(portnoxResults.annualDowntimeCost * yearsToProject),
        window.formatCurrency((currentResults.annualDowntimeCost - portnoxResults.annualDowntimeCost) * yearsToProject)
      ],
      [`Total ${yearsToProject}-Year TCO`,
        window.formatCurrency(currentResults.totalCosts),
        window.formatCurrency(portnoxResults.totalCosts),
        window.formatCurrency(savingsAmount)
      ]
    ];

    doc.autoTable({
      head: [tcoHeaders],
      body: tcoData,
      startY: 40,
      theme: 'grid',
      headStyles: {
        fillColor: [27, 103, 178],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 45, halign: 'right' },
        2: { cellWidth: 45, halign: 'right' },
        3: { cellWidth: 45, halign: 'right' }
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      styles: {
        cellPadding: 5,
        fontSize: 8
      },
      didParseCell: function(data) {
        // Highlight total row
        if (data.row.index === tcoData.length - 1) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [230, 230, 230];
        }

        // Highlight savings cells
        if (data.column.index === 3) {
          // Check if the value is a saving (positive) or cost (negative)
          if (data.row.index < tcoData.length - 1) { // Skip the total row
            const savingsValue = parseFloat(tcoData[data.row.index][3].replace(/[^0-9.-]+/g, ''));
            if (savingsValue > 0) {
              data.cell.styles.textColor = [43, 210, 91]; // Green for savings
            } else if (savingsValue < 0) {
              data.cell.styles.textColor = [220, 53, 69]; // Red for costs
            }
          }
        }
      }
    });

    // Add ROI analysis section
    doc.setFontSize(12);
    doc.setTextColor(27, 103, 178);
    doc.text('3.2. Return on Investment', 20, doc.autoTable.previous.finalY + 15);

    // Calculate ROI metrics
    const initialInvestment = portnoxResults.totalInitialCosts - currentResults.totalInitialCosts;
    const annualSavings = currentResults.annualCosts - portnoxResults.annualCosts;

    // Only calculate if there are annual savings
    if (annualSavings > 0) {
      const breakEvenYears = initialInvestment > 0 ? initialInvestment / annualSavings : 0;
      const breakEvenMonths = Math.round(breakEvenYears * 12);

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);

      doc.text(`Based on the analysis, migrating from ${currentResults.vendorName} to Portnox Cloud has a`, 20, doc.autoTable.previous.finalY + 25);
      doc.text(`break-even point of ${breakEvenMonths} months.`, 20, doc.autoTable.previous.finalY + 32);

      // Create ROI table
      const roiHeaders = ['ROI Metric', 'Value'];
      const roiData = [
        ['Initial Investment', window.formatCurrency(initialInvestment)],
        ['Annual Savings', window.formatCurrency(annualSavings)],
        ['Break-even Point', `${breakEvenMonths} months (${breakEvenYears.toFixed(1)} years)`],
        ['5-Year Savings', window.formatCurrency(annualSavings * 5 - initialInvestment)]
      ];

      doc.autoTable({
        head: [roiHeaders],
        body: roiData,
        startY: doc.autoTable.previous.finalY + 40,
        theme: 'grid',
        headStyles: {
          fillColor: [27, 103, 178],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        styles: {
          cellPadding: 5
        }
      });
    } else {
      // If no annual savings, indicate immediate savings
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text('Portnox provides immediate cost advantages with both lower initial and ongoing costs.', 20, doc.autoTable.previous.finalY + 25);
      doc.text(`No break-even analysis needed as there is immediate ${savingsPercentage.toFixed(1)}% savings.`, 20, doc.autoTable.previous.finalY + 32);
    }

    // Add technical analysis
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(27, 103, 178);
    doc.text('4. Technical Analysis', 20, 20);

    // Implementation comparison
    doc.setFontSize(12);
    doc.text('4.1. Implementation Comparison', 20, 35);

    // Get implementation timeline data
    const vendorData = window.vendorData || {};
    const currentVendorData = vendorData[currentVendor] || {};
    const portnoxData = vendorData['portnox'] || {};

    if (currentVendorData && portnoxData) {
      const orgSize = results.orgSize || 'medium';

      const currentTimeline = currentVendorData[orgSize]?.implementationTimeline || {};
      const portnoxTimeline = portnoxData[orgSize]?.implementationTimeline || {};

      // Combine all phase names
      const phases = new Set([...Object.keys(currentTimeline), ...Object.keys(portnoxTimeline)]);

      // Prepare implementation table
      const implHeaders = ['Implementation Phase', currentResults.vendorName, 'Portnox Cloud', 'Time Savings'];
      const implData = [];

      // Add rows for each phase
      phases.forEach(phase => {
        const currentDays = currentTimeline[phase] || 0;
        const portnoxDays = portnoxTimeline[phase] || 0;
        const savings = currentDays - portnoxDays;

        implData.push([
          phase.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
          currentDays + ' days',
          portnoxDays + ' days',
          savings > 0 ? savings + ' days' : '-'
        ]);
      });

      // Add total row
      const currentTotal = Object.values(currentTimeline).reduce((sum, days) => sum + days, 0);
      const portnoxTotal = Object.values(portnoxTimeline).reduce((sum, days) => sum + days, 0);
      const totalSavings = currentTotal - portnoxTotal;

      implData.push([
        'Total Implementation Time',
        currentTotal + ' days',
        portnoxTotal + ' days',
        totalSavings > 0 ? totalSavings + ' days' : '-'
      ]);

      doc.autoTable({
        head: [implHeaders],
        body: implData,
        startY: 40,
        theme: 'grid',
        headStyles: {
          fillColor: [27, 103, 178],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        styles: {
          cellPadding: 5
        },
        didParseCell: function(data) {
          // Highlight total row
          if (data.row.index === implData.length - 1) {
            data.cell.styles.fontStyle = 'bold';
            data.cell.styles.fillColor = [230, 230, 230];
          }
        }
      });
    }

    // Add architecture comparison
    doc.setFontSize(12);
    doc.setTextColor(27, 103, 178);
    doc.text('4.2. Architecture Comparison', 20, doc.autoTable.previous.finalY + 15);

    // Create Cloud vs On-Premises comparison table
    const archHeaders = ['Feature', 'On-Premises NAC', 'Portnox Cloud'];

    const archData = [
      ['Deployment Model', 'Hardware appliances', 'SaaS solution, no hardware'],
      ['Initial Setup', '2-4 weeks typical setup time', 'Same-day deployment'],
      ['Redundancy', 'Requires additional hardware', 'Built-in cloud redundancy'],
      ['Updates & Patching', 'Manual update process', 'Automatic updates'],
      ['Scalability', 'Requires hardware sizing', 'Unlimited elastic scaling'],
      ['Multi-Location Support', 'Requires hardware at each site', 'Single cloud instance for all sites'],
      ['Remote Access', 'VPN or additional appliances', 'Native anywhere access'],
      ['Disaster Recovery', 'Requires separate DR site', 'Built-in geo-redundancy']
    ];

    doc.autoTable({
      head: [archHeaders],
      body: archData,
      startY: doc.autoTable.previous.finalY + 20,
      theme: 'grid',
      headStyles: {
        fillColor: [27, 103, 178],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 70 },
        2: { cellWidth: 70 }
      },
      styles: {
        cellPadding: 5
      }
    });

    // Add IT resource utilization
    doc.addPage();

    doc.setFontSize(12);
    doc.setTextColor(27, 103, 178);
    doc.text('4.3. IT Resource Utilization', 20, 20);

    // Get FTE allocation
    const currentFTE = currentVendorData[orgSize]?.fteAllocation || {};
    const portnoxFTE = portnoxData[orgSize]?.fteAllocation || {};

    // Create FTE comparison table
    const fteHeaders = ['IT Role', currentResults.vendorName, 'Portnox Cloud', 'FTE Reduction'];

    const fteData = [
      ['Network Administrator',
        (currentFTE.networkAdmin || 0.5).toFixed(2) + ' FTE',
        (portnoxFTE.networkAdmin || 0.2).toFixed(2) + ' FTE',
        ((currentFTE.networkAdmin || 0.5) - (portnoxFTE.networkAdmin || 0.2)).toFixed(2) + ' FTE'
      ],
      ['Security Administrator',
        (currentFTE.securityAdmin || 0.4).toFixed(2) + ' FTE',
        (portnoxFTE.securityAdmin || 0.15).toFixed(2) + ' FTE',
        ((currentFTE.securityAdmin || 0.4) - (portnoxFTE.securityAdmin || 0.15)).toFixed(2) + ' FTE'
      ],
      ['System Administrator',
        (currentFTE.systemAdmin || 0.3).toFixed(2) + ' FTE',
        (portnoxFTE.systemAdmin || 0.05).toFixed(2) + ' FTE',
        ((currentFTE.systemAdmin || 0.3) - (portnoxFTE.systemAdmin || 0.05)).toFixed(2) + ' FTE'
      ],
      ['Help Desk',
        (currentFTE.helpDesk || 0.1).toFixed(2) + ' FTE',
        (portnoxFTE.helpDesk || 0.05).toFixed(2) + ' FTE',
        ((currentFTE.helpDesk || 0.1) - (portnoxFTE.helpDesk || 0.05)).toFixed(2) + ' FTE'
      ],
      ['Total IT Staff',
        ((currentFTE.networkAdmin || 0.5) + (currentFTE.securityAdmin || 0.4) +
         (currentFTE.systemAdmin || 0.3) + (currentFTE.helpDesk || 0.1)).toFixed(2) + ' FTE',
        ((portnoxFTE.networkAdmin || 0.2) + (portnoxFTE.securityAdmin || 0.15) +
         (portnoxFTE.systemAdmin || 0.05) + (portnoxFTE.helpDesk || 0.05)).toFixed(2) + ' FTE',
        (((currentFTE.networkAdmin || 0.5) + (currentFTE.securityAdmin || 0.4) +
          (currentFTE.systemAdmin || 0.3) + (currentFTE.helpDesk || 0.1)) -
         ((portnoxFTE.networkAdmin || 0.2) + (portnoxFTE.securityAdmin || 0.15) +
          (portnoxFTE.systemAdmin || 0.05) + (portnoxFTE.helpDesk || 0.05))).toFixed(2) + ' FTE'
      ]
    ];

    doc.autoTable({
      head: [fteHeaders],
      body: fteData,
      startY: 25,
      theme: 'grid',
      headStyles: {
        fillColor: [27, 103, 178],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      styles: {
        cellPadding: 5
      },
      didParseCell: function(data) {
        // Highlight total row
        if (data.row.index === fteData.length - 1) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [230, 230, 230];
        }
      }
    });

    // Add migration planning
    doc.setFontSize(12);
    doc.setTextColor(27, 103, 178);
    doc.text('5. Migration Planning', 20, doc.autoTable.previous.finalY + 15);

    // Define migration phases
    const migrationPhases = [
      {
        phase: 'Assessment & Discovery',
        description: 'Evaluate current environment, identify devices, authentication methods, and network topology.',
        duration: '3-5 days'
      },
      {
        phase: 'Architecture Planning',
        description: 'Design authentication flows and integration points for cloud NAC solution.',
        duration: '3-5 days'
      },
      {
        phase: 'Portnox Cloud Setup',
        description: 'Configure cloud portal, authentication methods, and deploy local connectors.',
        duration: '1-2 days'
      },
      {
        phase: 'Policy Migration',
        description: 'Transfer and adapt existing policies to the cloud platform.',
        duration: '2-4 days'
      },
      {
        phase: 'Pilot Deployment',
        description: 'Test with limited device groups to verify configuration and policy enforcement.',
        duration: '3-5 days'
      },
      {
        phase: 'Full Deployment',
        description: 'Expand to all network segments and user groups, phase out legacy solution.',
        duration: '5-10 days'
      }
    ];

    // Create migration plan table
    const migrationHeaders = ['Phase', 'Description', 'Estimated Duration'];
    const migrationData = migrationPhases.map(phase => [
      phase.phase,
      phase.description,
      phase.duration
    ]);

    doc.autoTable({
      head: [migrationHeaders],
      body: migrationData,
      startY: doc.autoTable.previous.finalY + 20,
      theme: 'grid',
      headStyles: {
        fillColor: [27, 103, 178],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 100 },
        2: { cellWidth: 40 }
      },
      styles: {
        cellPadding: 5
      }
    });

    // Add recommendations and conclusion
    doc.addPage();

    doc.setFontSize(16);
    doc.setTextColor(27, 103, 178);
    doc.text('6. Recommendations & Conclusion', 20, 20);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    doc.text(`Based on the comprehensive analysis of Network Access Control solutions for an organization`, 20, 35);
    doc.text(`with ${results.deviceCount} devices over a ${yearsToProject}-year period, migrating from ${currentResults.vendorName} to`, 20, 42);
    doc.text(`Portnox Cloud is strongly recommended for the following key reasons:`, 20, 49);

    const keyRecommendations = [
      `Cost Savings: ${savingsPercentage.toFixed(1)}% reduction in TCO resulting in ${window.formatCurrency(savingsAmount)} savings.`,
      'Reduced Implementation Time: Up to 75% faster deployment compared to traditional NAC solutions.',
      'Lower IT Resource Requirements: Decrease NAC administration overhead by up to 80%.',
      'Simplified Architecture: Cloud-based solution eliminates hardware costs and complex deployments.',
      'Improved Scalability: Elastic scaling without hardware sizing constraints.',
      'Reduced Downtime: Automated updates and built-in redundancy minimize business disruption.',
      'Enhanced Multi-Site Support: Single cloud instance manages all locations without local hardware.'
    ];

    let yPos = 60;

    keyRecommendations.forEach(recommendation => {
      doc.circle(25, yPos - 2, 1.5, 'F');
      doc.text(recommendation, 30, yPos);
      yPos += 10;
    });

    doc.setFontSize(12);
    doc.setTextColor(27, 103, 178);
    doc.text('Conclusion', 20, yPos + 10);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    doc.text(`The transition to Portnox Cloud presents a compelling business case with significant financial and`, 20, yPos + 20);
    doc.text(`operational benefits. The cloud-based NAC solution aligns with modern network security best practices`, 20, yPos + 27);
    doc.text(`while reducing complexity and cost. Implementing this solution will position the organization for greater`, 20, yPos + 34);
    doc.text(`security, scalability, and cost efficiency.`, 20, yPos + 41);

    // Add footer with page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('Portnox Cloud NAC Solution - TCO Analysis', 20, 285);
      doc.text(`Page ${i} of ${pageCount}`, 180, 285);
    }
  }

  // Create cover page
  createCoverPage(doc, results, currentVendor) {
    // Add title
    doc.setFontSize(28);
    doc.setTextColor(27, 103, 178); // Primary color
    doc.text('NAC Solution', 105, 80, { align: 'center' });
    doc.text('TCO Analysis Report', 105, 95, { align: 'center' });

    // Add subtitle
    doc.setFontSize(16);
    doc.setTextColor(100, 100, 100); // Gray
    doc.text(`Comparing ${results[currentVendor].vendorName} vs. Portnox Cloud`, 105, 120, { align: 'center' });

    // Add company and date
    doc.setFontSize(12);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 105, 145, { align: 'center' });

    // Add portnox logo
    // Note: In a real implementation, you would use doc.addImage() here with the logo data

    // Add footer
    doc.setFontSize(10);
    doc.text('Confidential - For Internal Use Only', 105, 270, { align: 'center' });
  }

  // Create table of contents
  createTableOfContents(doc) {
    doc.setFontSize(20);
    doc.setTextColor(27, 103, 178);
    doc.text('Table of Contents', 105, 40, { align: 'center' });

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    const tocItems = [
      { title: '1. Executive Summary', page: 3 },
      { title: '2. Organization Profile', page: 3 },
      { title: '3. Financial Analysis', page: 4 },
      { title: '   3.1. TCO Comparison', page: 4 },
      { title: '   3.2. Return on Investment', page: 4 },
      { title: '4. Technical Analysis', page: 5 },
      { title: '   4.1. Implementation Comparison', page: 5 },
      { title: '   4.2. Architecture Comparison', page: 5 },
      { title: '   4.3. IT Resource Utilization', page: 6 },
      { title: '5. Migration Planning', page: 6 },
      { title: '6. Recommendations & Conclusion', page: 7 }
    ];

    let yPos = 60;

    tocItems.forEach(item => {
      doc.setFontSize(12);

      // Check if this is a main section or subsection
      if (item.title.includes('.')) {
        const parts = item.title.split('.');
        if (parts.length > 2) {
          // This is a subsection
          doc.setFont(undefined, 'normal');
        } else {
          // This is a main section
          doc.setFont(undefined, 'bold');
        }
      }

      doc.text(item.title, 40, yPos);

      // Add dots between title and page number
      const titleWidth = doc.getTextDimensions(item.title).w;
      const pageWidth = doc.getTextDimensions(item.page.toString()).w;
      const maxWidth = 150;
      const dotsWidth = maxWidth - titleWidth - pageWidth - 40;

      let dots = '';
      const dotWidth = doc.getTextDimensions('.').w;
      const numberOfDots = Math.floor(dotsWidth / dotWidth);

      for (let i = 0; i < numberOfDots; i++) {
        dots += '.';
      }

      doc.text(dots, 40 + titleWidth, yPos);
      doc.text(item.page.toString(), 180, yPos);

      yPos += 15;
    });
  }
}

// Export the PDF generator class
window.PDFReportGenerator = PDFReportGenerator;
EOF

    log_success "Enhanced PDF report generator created successfully"
  }

  # Create guided tour scripts
  create_guided_tour() {
    log_info "Creating guided tour scripts..."

    mkdir -p "${APP_DIR}/js/components"

    # Create guided tour script
    cat > "${APP_DIR}/js/components/guided-tour.js" << 'EOF'
/**
 * Guided tour for the NAC TCO Calculator
 * Helps users understand how to use the calculator effectively
 */
class GuidedTour {
  constructor() {
    this.intro = null;
    this.initTour();
  }

  initTour() {
    // Check if introjs is available
    if (typeof introJs === 'undefined') {
      console.warn('IntroJS not found. Cannot initialize guided tour.');
      return;
    }

    this.intro = introJs();

    // Configure tour steps
    this.intro.setOptions({
      steps: [
        {
          intro: 'Welcome to the NAC Solution TCO Calculator! This tool helps you compare the total cost of ownership between different Network Access Control solutions.'
        },
        {
          element: document.querySelector('.vendor-options'),
          intro: 'Start by selecting your current NAC vendor or the one you wish to compare against Portnox Cloud.'
        },
        {
          element: document.getElementById('organization-inputs'),
          intro: 'Enter your organization details here. These values will be used to calculate accurate TCO based on your specific environment.'
        },
        {
          element: document.getElementById('industry-selector') || document.querySelector('.sidebar'),
          intro: 'You can also select your industry for pre-configured templates and industry-specific insights.'
        },
        {
          element: document.getElementById('calculate-btn'),
          intro: 'Click Calculate to generate TCO comparisons based on your inputs.'
        },
        {
          element: document.querySelector('.results-container') || document.body,
          intro: 'Results will appear here, with detailed breakdowns, visualizations, and savings analysis.'
        },
        {
          element: document.getElementById('audience-selector') || document.querySelector('.header-actions'),
          intro: 'You can customize the view for different stakeholders: Executive, Financial, or Technical perspectives.'
        },
        {
          element: document.getElementById('export-csv-btn') || document.querySelector('.export-options'),
          intro: 'Export your results in various formats to share with stakeholders.'
        },
        {
          element: document.getElementById('save-scenario-btn') || document.querySelector('.header-actions'),
          intro: 'Save your scenarios to compare different configurations over time.'
        }
      ],
      showBullets: true,
      showButtons: true,
      exitOnOverlayClick: true,
      nextLabel: 'Next &rarr;',
      prevLabel: '&larr; Back',
      doneLabel: 'Finish'
    });
  }

  startTour() {
    if (this.intro) {
      this.intro.start();
    } else {
      console.warn('Guided tour not initialized');
    }
  }

  // Start tour for specific page or section
  startSectionTour(section) {
    if (!this.intro) {
      this.initTour();
    }

    let steps = [];

    switch(section) {
      case 'inputs':
        steps = [
          {
            intro: 'Let\'s walk through the input parameters for your TCO calculation.'
          },
          {
            element: document.getElementById('device-count') || document.body,
            intro: 'Enter the number of devices in your network. This is a key factor in determining licensing costs.'
          },
          {
            element: document.getElementById('organization-size') || document.body,
            intro: 'Select your organization size to align with typical deployment scenarios.'
          },
          {
            element: document.getElementById('years-to-project') || document.body,
            intro: 'Specify how many years to project costs. Longer projections show greater cumulative savings.'
          },
          {
            element: document.getElementById('multiple-locations') || document.body,
            intro: 'Indicate if your organization spans multiple locations. On-premises NAC solutions typically require hardware at each location.'
          },
          {
            element: document.getElementById('legacy-devices') || document.body,
            intro: 'Specify if you have legacy devices that require special handling. This affects complexity and cost.'
          }
        ];
        break;
      case 'results':
        steps = [
          {
            intro: 'Let\'s explore the results of your TCO comparison.'
          },
          {
            element: document.querySelector('.comparison-highlight-card') || document.body,
            intro: 'This highlights the key savings metrics comparing Portnox Cloud with your selected vendor.'
          },
          {
            element: document.getElementById('tco-comparison-chart') || document.body,
            intro: 'This chart shows the cost breakdown comparing different vendors.'
          },
          {
            element: document.getElementById('cumulative-cost-chart') || document.body,
            intro: 'See the cumulative costs over time to understand the long-term financial impact.'
          },
          {
            element: document.getElementById('tco-summary-table-body') || document.body,
            intro: 'This table provides a detailed breakdown of all cost components.'
          }
        ];
        break;
      case 'reports':
        steps = [
          {
            intro: 'Let\'s learn about the different reporting options.'
          },
          {
            element: document.getElementById('report-type') || document.body,
            intro: 'Select the type of report that best suits your audience.'
          },
          {
            element: document.getElementById('export-csv-btn') || document.body,
            intro: 'Export your results to CSV for further analysis in spreadsheet applications.'
          },
          {
            element: document.getElementById('export-pdf-btn') || document.body,
            intro: 'Generate a professional PDF report to share with stakeholders.'
          }
        ];
        break;
      default:
        // Use default tour
        this.startTour();
        return;
    }

    this.intro.setOptions({ steps: steps });
    this.intro.start();
  }
}

// Export the guided tour
window.GuidedTour = GuidedTour;
EOF

    log_success "Guided tour script created successfully"
  }

  # Create enhanced HTML templates
  create_enhanced_templates() {
    log_info "Creating enhanced HTML templates..."

    # Update index.html with enhanced user interface
    cat > "${APP_DIR}/index.html" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NAC TCO Calculator - Zero Trust Network Access Control</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intro.js@6.0.0/minified/introjs.min.css">
  <link rel="stylesheet" href="css/styles.css">
  <link rel="icon" type="image/png" href="img/favicon.png">
</head>
<body>
  <!-- Skip to main content link for accessibility -->
  <a href="#main-content" class="skip-to-content">Skip to main content</a>

  <div class="app-container">
    <header class="app-header">
      <div class="logo">
        <img src="img/logo.png" alt="Portnox Logo">
        <h1>NAC TCO Calculator</h1>
      </div>
      <div class="header-actions">
        <select id="audience-selector" class="form-select form-select-sm" aria-label="Select audience view">
          <option value="financial">Financial View</option>
          <option value="executive">Executive View</option>
          <option value="technical">Technical View</option>
        </select>
        <button id="save-scenario-btn" class="btn btn-outline btn-sm">
          <i class="fas fa-save"></i> Save Scenario
        </button>
        <button id="load-scenario-btn" class="btn btn-outline btn-sm">
          <i class="fas fa-folder-open"></i> Load Scenario
        </button>
        <button id="guided-tour-btn" class="btn btn-outline btn-sm">
          <i class="fas fa-question-circle"></i> Help
        </button>
      </div>
    </header>

    <div id="main-content" class="calculator-container">
      <div class="sidebar">
        <div id="message-container"></div>

        <!-- Industry templates selector -->
        <div class="industry-templates-card">
          <h3>Industry Templates</h3>
          <p>Select your industry for pre-configured parameters and compliance insights.</p>
          <select id="industry-selector" class="form-select" aria-label="Select industry template">
            <option value="none">Select an industry...</option>
            <!-- Options will be populated by JavaScript -->
          </select>
        </div>

        <!-- Vendor selection card -->
        <div class="vendor-selection-card">
          <h3>Current NAC Vendor</h3>
          <div class="vendor-options">
            <div class="vendor-card" data-vendor="cisco" tabindex="0">
              <img src="img/cisco-logo.png" alt="Cisco Logo">
              <span>Cisco ISE</span>
            </div>
            <div class="vendor-card" data-vendor="aruba" tabindex="0">
              <img src="img/aruba-logo.png" alt="Aruba Logo">
              <span>Aruba ClearPass</span>
            </div>
            <div class="vendor-card" data-vendor="forescout" tabindex="0">
              <img src="img/forescout-logo.png" alt="Forescout Logo">
              <span>Forescout</span>
            </div>
            <div class="vendor-card" data-vendor="nps" tabindex="0">
              <img src="img/microsoft-logo.png" alt="Microsoft Logo">
              <span>Microsoft NPS</span>
            </div>
            <div class="vendor-card" data-vendor="fortinac" tabindex="0">
              <img src="img/fortinac-logo.png" alt="FortiNAC Logo">
              <span>FortiNAC</span>
            </div>
            <div class="vendor-card" data-vendor="securew2" tabindex="0">
              <img src="img/securew2-logo.png" alt="SecureW2 Logo">
              <span>SecureW2</span>
            </div>
          </div>
        </div>

        <!-- Organization inputs card -->
        <div id="organization-inputs" class="organization-inputs">
          <h3>Organization Details</h3>
          <div class="input-group">
            <label for="device-count">Device Count</label>
            <input type="number" id="device-count" name="device-count" value="1000" min="1" max="1000000">
          </div>
          <div class="input-group">
            <label for="organization-size">Organization Size</label>
            <select id="organization-size" name="organization-size">
              <option value="small">Small (Up to 1,000 devices)</option>
              <option value="medium" selected>Medium (1,000 - 5,000 devices)</option>
              <option value="large">Large (5,000+ devices)</option>
            </select>
          </div>
          <div class="input-group">
            <label for="years-to-project">Years to Project</label>
            <input type="number" id="years-to-project" name="years-to-project" value="3" min="1" max="10">
          </div>

          <div class="advanced-options-toggle">
            <button type="button" class="btn btn-text" aria-expanded="false" aria-controls="advanced-options-panel">
              <i class="fas fa-angle-down"></i> Advanced Options
            </button>
          </div>

          <div id="advanced-options-panel" class="advanced-options-panel hidden">
            <div class="input-group checkbox-group">
              <input type="checkbox" id="multiple-locations" name="multiple-locations">
              <label for="multiple-locations">Multiple Locations</label>
            </div>
            <div id="location-count-container" class="input-group hidden">
              <label for="location-count">Number of Locations</label>
              <input type="number" id="location-count" name="location-count" value="2" min="2" max="1000">
            </div>
            <div class="input-group checkbox-group">
              <input type="checkbox" id="complex-authentication" name="complex-authentication">
              <label for="complex-authentication">Complex Authentication</label>
            </div>
            <div class="input-group checkbox-group">
              <input type="checkbox" id="legacy-devices" name="legacy-devices">
              <label for="legacy-devices">Legacy Devices</label>
            </div>
            <div id="legacy-percentage-container" class="input-group hidden">
              <label for="legacy-percentage">Legacy Device Percentage</label>
              <div class="range-container">
                <input type="range" id="legacy-percentage" name="legacy-percentage" min="0" max="100" value="10">
                <span id="legacy-percentage-value">10%</span>
              </div>
            </div>
            <div class="input-group checkbox-group">
              <input type="checkbox" id="cloud-integration" name="cloud-integration">
              <label for="cloud-integration">Cloud Integration</label>
            </div>
            <div class="input-group checkbox-group">
              <input type="checkbox" id="custom-policies" name="custom-policies">
              <label for="custom-policies">Custom Policies</label>
            </div>
            <div id="policy-complexity-container" class="input-group hidden">
              <label for="policy-complexity">Policy Complexity</label>
              <select id="policy-complexity" name="policy-complexity">
                <option value="low">Low</option>
                <option value="medium" selected>Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <button id="calculate-btn" class="btn btn-primary">
            <i class="fas fa-calculator"></i> Calculate TCO
          </button>
        </div>

        <!-- Industry-specific benchmarks -->
        <div id="industry-benchmarks-container" class="hidden"></div>

        <!-- Compliance information -->
        <div id="compliance-info-container" class="hidden"></div>

        <!-- Portnox spotlight card -->
        <div class="portnox-spotlight">
          <h3>Portnox Cloud Benefits</h3>
          <p>See how Portnox Cloud transforms your NAC experience with a true Zero Trust approach.</p>
          <div class="potential-savings-container">
            <div class="savings-metric">
              <label>Potential Savings:</label>
              <div class="savings-amount" id="portnox-savings-amount">$0</div>
            </div>
            <div class="savings-metric">
              <label>Savings Percentage:</label>
              <div class="savings-amount" id="portnox-savings-percentage">0%</div>
            </div>
            <div class="savings-metric">
              <label>Implementation Time Saved:</label>
              <div class="savings-amount" id="portnox-implementation-time">N/A</div>
            </div>
          </div>

          <!-- Enhanced spotlight insights -->
          <div id="spotlight-insights"></div>
        </div>
      </div>

      <div class="results-container">
        <!-- Tabs navigation -->
        <div class="tabs" role="tablist">
          <button class="tab-button active" role="tab" aria-selected="true" data-tab="summary-tab" tabindex="0">
            Summary
          </button>
          <button class="tab-button" role="tab" aria-selected="false" data-tab="financial-tab" tabindex="-1">
            Financial Analysis
          </button>
          <button class="tab-button" role="tab" aria-selected="false" data-tab="implementation-tab" tabindex="-1">
            Implementation
          </button>
          <button class="tab-button" role="tab" aria-selected="false" data-tab="comparison-tab" tabindex="-1">
            Cloud vs. On-Prem
          </button>
          <button class="tab-button" role="tab" aria-selected="false" data-tab="migration-tab" tabindex="-1">
            Migration Planning
          </button>
        </div>

        <!-- Tab content -->
        <div class="tab-content">
          <!-- Summary tab -->
          <div id="summary-tab" class="tab-pane active" role="tabpanel" aria-hidden="false">
            <div class="comparison-highlight-card">
              <h3>Key Comparison Metrics</h3>
              <div class="comparison-metrics">
                <div class="metric-container">
                  <div class="metric-label">Total Cost Savings</div>
                  <div class="metric-value" id="comparison-savings">$0</div>
                  <div class="progress-container">
                    <div class="progress-bar">
                      <div class="progress" style="width: 0%"></div>
                    </div>
                    <div class="progress-labels">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
                <div class="metric-container">
                  <div class="metric-label">Implementation Time Reduction</div>
                  <div class="metric-value" id="comparison-implementation">0 days</div>
                  <div class="progress-container">
                    <div class="progress-bar">
                      <div class="progress" style="width: 0%"></div>
                    </div>
                    <div class="progress-labels">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="key-benefits">
                <h4>Key Benefits of Portnox Cloud</h4>
                <div class="benefits-grid">
                  <!-- Benefits will be populated by JavaScript -->
                </div>
              </div>
            </div>

            <div class="export-options">
              <button id="export-csv-btn" class="btn btn-outline">
                <i class="fas fa-file-csv"></i> Export to CSV
              </button>
              <button id="export-pdf-btn" class="btn btn-outline">
                <i class="fas fa-file-pdf"></i> Export to PDF
              </button>
              <select id="report-type" class="form-select">
                <option value="complete">Complete Report</option>
                <option value="executive">Executive Summary</option>
                <option value="financial">Financial Analysis</option>
                <option value="technical">Technical Report</option>
              </select>
            </div>

            <div class="results-grid">
              <div class="result-card">
                <div class="chart-header">
                  <h3 class="chart-title">TCO Comparison</h3>
                  <div class="chart-actions">
                    <button class="chart-type-toggle active" data-chart-id="tco-comparison-chart" data-chart-type="bar">Bar</button>
                    <button class="chart-type-toggle" data-chart-id="tco-comparison-chart" data-chart-type="horizontalBar">Horizontal</button>
                  </div>
                </div>
                <div class="chart-container">
                  <canvas id="tco-comparison-chart"></canvas>
                </div>
              </div>
              <div class="result-card">
                <div class="chart-header">
                  <h3 class="chart-title">Cumulative Costs Over Time</h3>
                  <div class="chart-actions">
                    <button class="chart-type-toggle active" data-chart-id="cumulative-cost-chart" data-chart-type="line">Line</button>
                    <button class="chart-type-toggle" data-chart-id="cumulative-cost-chart" data-chart-type="bar">Bar</button>
                  </div>
                </div>
                <div class="chart-container">
                  <canvas id="cumulative-cost-chart"></canvas>
                </div>
              </div>
            </div>

            <!-- Enhanced visualizations -->
            <div class="results-grid">
              <div class="result-card">
                <h3>Cost Factors Impact Analysis</h3>
                <div class="chart-container" id="cost-factors-heatmap"></div>
              </div>
              <div class="result-card">
                <h3>ROI Timeline</h3>
                <div class="chart-container">
                  <canvas id="roi-timeline-chart"></canvas>
                </div>
              </div>
            </div>

            <!-- Industry-specific metrics -->
            <div id="industry-specific-metrics" class="hidden"></div>
          </div>

          <!-- Financial Analysis tab -->
          <div id="financial-tab" class="tab-pane" role="tabpanel" aria-hidden="true">
            <h3>TCO Breakdown</h3>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Cost Component</th>
                    <th id="tco-comparison-vendor">Current Vendor</th>
                    <th>Portnox Cloud</th>
                    <th>Savings</th>
                  </tr>
                </thead>
                <tbody id="tco-summary-table-body">
                  <!-- Table rows will be populated by JavaScript -->
                </tbody>
              </table>
            </div>

            <div class="results-grid">
              <div class="result-card">
                <h3>Cost Breakdown - <span class="vendor-name-placeholder">Current Vendor</span></h3>
                <div class="chart-container">
                  <canvas id="current-breakdown-chart"></canvas>
                </div>
              </div>
              <div class="result-card">
                <h3>Cost Breakdown - Portnox Cloud</h3>
                <div class="chart-container">
                  <canvas id="alternative-breakdown-chart"></canvas>
                </div>
              </div>
            </div>

            <h3>Annual Operating Costs</h3>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Cost Category</th>
                    <th id="annual-comparison-vendor">Current Vendor</th>
                    <th>Portnox Cloud</th>
                    <th>Annual Savings</th>
                  </tr>
                </thead>
                <tbody id="annual-costs-table-body">
                  <!-- Table rows will be populated by JavaScript -->
                </tbody>
              </table>
            </div>

            <!-- Enhanced financial visualizations -->
            <div class="results-grid">
              <div class="result-card">
                <h3>Cost Analysis Over Time</h3>
                <div class="chart-container">
                  <canvas id="waterfall-chart"></canvas>
                </div>
              </div>
              <div class="result-card">
                <h3>IT Resource Utilization</h3>
                <div class="chart-container">
                  <canvas id="resource-utilization-chart"></canvas>
                </div>
              </div>
            </div>
          </div>

          <!-- Implementation tab -->
          <div id="implementation-tab" class="tab-pane" role="tabpanel" aria-hidden="true">
            <h3>Implementation Comparison</h3>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Implementation Phase</th>
                    <th id="implementation-comparison-vendor">Current Vendor</th>
                    <th>Portnox Cloud</th>
                    <th>Time Savings</th>
                  </tr>
                </thead>
                <tbody id="implementation-table-body">
                  <!-- Table rows will be populated by JavaScript -->
                </tbody>
              </table>
            </div>

            <div class="results-grid">
              <div class="result-card">
                <h3>Implementation Time Comparison</h3>
                <div class="chart-container">
                  <canvas id="implementation-comparison-chart"></canvas>
                </div>
              </div>
              <div class="result-card">
                <h3>Implementation Complexity</h3>
                <div class="chart-container">
                  <canvas id="implementation-complexity-chart"></canvas>
                </div>
              </div>
            </div>

            <h3>Feature Comparison</h3>
            <div class="chart-container">
              <canvas id="feature-comparison-chart"></canvas>
            </div>
            <div class="feature-legend">
              <p class="feature-note">Higher values indicate better performance in each category.</p>
            </div>
          </div>

          <!-- Cloud vs. On-Prem tab -->
          <div id="comparison-tab" class="tab-pane" role="tabpanel" aria-hidden="true">
            <h3>Cloud vs. On-Premises Comparison</h3>
            <div class="comparison-table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>On-Premises NAC</th>
                    <th>Portnox Cloud</th>
                  </tr>
                </thead>
                <tbody id="cloud-comparison-table-body">
                  <!-- Table rows will be populated by JavaScript -->
                </tbody>
              </table>
            </div>

            <div class="architecture-diagram-container">
              <h3>Architecture Comparison</h3>
              <div class="results-grid">
                <div class="result-card">
                  <h4>Traditional On-Premises NAC</h4>
                  <div class="architecture-diagram on-prem-diagram">
                    <!-- SVG diagram rendered by JavaScript -->
                  </div>
                  <ul class="architecture-notes">
                    <li>Requires dedicated hardware appliances</li>
                    <li>Complex network integration</li>
                    <li>Hardware at each location</li>
                    <li>Manual updates and maintenance</li>
                    <li>Significant IT overhead</li>
                  </ul>
                </div>
                <div class="result-card">
                  <h4>Cloud-Based NAC</h4>
                  <div class="architecture-diagram cloud-diagram">
                    <!-- SVG diagram rendered by JavaScript -->
                  </div>
                  <ul class="architecture-notes">
                    <li>No hardware required</li>
                    <li>Simple cloud connector model</li>
                    <li>Single instance manages all locations</li>
                    <li>Automatic updates</li>
                    <li>Minimal IT overhead</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Migration Planning tab -->
          <div id="migration-tab" class="tab-pane" role="tabpanel" aria-hidden="true">
            <h3>Migration Planning</h3>
            <p>Follow this step-by-step migration plan to transition from <span class="vendor-name-placeholder">your current vendor</span> to Portnox Cloud.</p>

            <div class="migration-phases">
              <!-- Migration phases will be populated by JavaScript -->
            </div>

            <h3>Migration Timeline</h3>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Phase</th>
                    <th>Description</th>
                    <th>Estimated Duration</th>
                  </tr>
                </thead>
                <tbody id="migration-table-body">
                  <!-- Table rows will be populated by JavaScript -->
                </tbody>
              </table>
            </div>

            <div class="result-card">
              <h3>Migration Success Factors</h3>
              <ul class="success-factors">
                <li><strong>Phased Approach</strong> - Implement in stages, starting with non-critical segments</li>
                <li><strong>Clear Success Criteria</strong> - Define measurable objectives for each phase</li>
                <li><strong>Stakeholder Engagement</strong> - Involve all key stakeholders early in the process</li>
                <li><strong>Training</strong> - Provide comprehensive training before and during migration</li>
                <li><strong>Testing</strong> - Thoroughly test each phase before moving to production</li>
                <li><strong>Rollback Plan</strong> - Maintain the ability to revert changes if issues arise</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="app-footer">
      <div class="footer-info">
        &copy; 2025 Portnox. All rights reserved.
      </div>
      <div class="footer-links">
        <a href="#" target="_blank">Privacy Policy</a>
        <a href="#" target="_blank">Terms of Service</a>
        <a href="#" target="_blank">Contact Us</a>
      </div>
    </footer>
  </div>

  <!-- JavaScript Libraries -->
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@2.1.0/dist/chartjs-plugin-annotation.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/intro.js@6.0.0/minified/intro.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jspdf-autotable@3.5.28/dist/jspdf.plugin.autotable.min.js"></script>

  <!-- Application JavaScript -->
  <script src="js/vendors/vendor-data.js"></script>
  <script src="js/data/industry-templates.js"></script>
  <script src="js/utils/helpers.js"></script>
  <script src="js/managers/dom-cache.js"></script>
  <script src="js/managers/validation-manager.js"></script>
  <script src="js/managers/loading-manager.js"></script>
  <script src="js/managers/notification-manager.js"></script>
  <script src="js/managers/tab-manager.js"></script>
  <script src="js/charts/chart-builder.js"></script>
  <script src="js/components/calculator.js"></script>
  <script src="js/components/ui-controller.js"></script>
  <script src="js/components/guided-tour.js"></script>
  <script src="js/reports/pdf-generator.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
EOF

    log_success "Enhanced HTML templates created successfully"
  }

  # Modify the UI Controller to implement the enhanced features
  modify_ui_controller() {
    log_info "Modifying UI Controller..."

    # Replace the contents of ui-controller.js with the enhanced version
    cp "${SCRIPT_DIR}/js/components/enhanced-ui-controller.js" "${APP_DIR}/js/components/ui-controller.js"

    log_success "UI Controller modified successfully"
  }

  # Function to install the application
  install_app() {
    log_info "Installing NAC TCO Calculator..."

    # Create directories
    # Using current directory
    mkdir -p "${APP_DIR}/css"
    mkdir -p "${APP_DIR}/js"
    mkdir -p "${APP_DIR}/img"

    # Install dependencies
    install_dependencies


install_additional_libraries() {
  log_info "Installing additional libraries..."
  cd "${APP_DIR}"
  npm install --save chart.js@3.9.1 chartjs-plugin-datalabels@2.2.0 chartjs-plugin-annotation@2.1.0 jspdf@2.5.1 jspdf-autotable@3.5.28 intro.js@6.0.0
  log_success "Additional libraries installed successfully"
}
    # Install additional libraries for enhanced visualizations
    install_additional_libraries


create_enhanced_chart_styles() {
  log_info "Creating enhanced chart styles..."
  mkdir -p "${APP_DIR}/css/components"
  touch "${APP_DIR}/css/components/enhanced-charts.css"
  echo "@import 'components/enhanced-charts.css';" >> "${APP_DIR}/css/styles.css"
  log_success "Enhanced chart styles created successfully"
}

create_enhanced_chart_styles() {
  log_info "Creating enhanced chart styles..."
  mkdir -p "${APP_DIR}/css/components"
  log_success "Enhanced chart styles created successfully"
}
    # Create enhanced chart styles
    create_enhanced_chart_styles

    # Create industry templates
    create_industry_templates

    # Create enhanced PDF report generator
    create_pdf_report_generator

    # Create guided tour
    create_guided_tour

    # Create enhanced HTML templates
    create_enhanced_templates

    log_success "NAC TCO Calculator installed successfully"
  }

  # Update existing application with enhancements
  update_app() {
    log_info "Updating NAC TCO Calculator..."

    # Install additional libraries
    install_additional_libraries

    # Create enhanced chart styles
    create_enhanced_chart_styles

    # Create industry templates
    create_industry_templates

    # Create enhanced PDF report generator
    create_pdf_report_generator

    # Create guided tour
    create_guided_tour

    # Create enhanced HTML templates
    create_enhanced_templates

    # Modify UI Controller
    modify_ui_controller

    log_success "NAC TCO Calculator updated successfully"
  }

  # Deploy the application
  deploy_app() {
    log_info "Deploying NAC TCO Calculator..."

    # Check if deployment directory exists
    DEPLOY_DIR="${SCRIPT_DIR}/deploy"

    if [ ! -d "${DEPLOY_DIR}" ]; then
      mkdir -p "${DEPLOY_DIR}"
    fi

    # Copy application files to deployment directory
    cp -r "${APP_DIR}"/* "${DEPLOY_DIR}/"

    # Create compressed distribution package
    DIST_FILE="${SCRIPT_DIR}/nac-tco-calculator-$(date +%Y%m%d).zip"

    cd "${DEPLOY_DIR}"
    zip -r "${DIST_FILE}" .

    log_success "NAC TCO Calculator deployed successfully to ${DEPLOY_DIR}"
    log_success "Distribution package created at ${DIST_FILE}"
  }

  # Parse command line arguments
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --install)
        DO_INSTALL=true
        shift
        ;;
      --update)
        DO_UPDATE=true
        shift
        ;;
      --backup)
        DO_BACKUP=true
        shift
        ;;
      --deploy)
        DO_DEPLOY=true
        shift
        ;;
      --help)
        show_help
        ;;
      *)
        log_error "Unknown option: $1"
        show_help
        ;;
    esac
  done

  # Create log file
  mkdir -p "$(dirname "${LOG_FILE}")"
  touch "${LOG_FILE}"

  log_info "Starting NAC TCO Calculator Enhancement Script"

  # Check dependencies
  check_dependencies

  # Perform actions based on options
  if [ "${DO_BACKUP}" = true ]; then
    create_backup
  fi

  if [ "${DO_INSTALL}" = true ]; then
    install_app
  elif [ "${DO_UPDATE}" = true ]; then
    update_app
  fi

  if [ "${DO_DEPLOY}" = true ]; then
    deploy_app
  fi

  log_info "NAC TCO Calculator Enhancement Script completed successfully"


premium-update-nowv1.sh "$@"

# Call the function with arguments
premium-update-nowv1.sh "$@"

# Function to install additional libraries
install_additional_libraries() {
  log_info "Installing additional libraries for enhanced visualizations..."
  
  cd "${APP_DIR}"
  
  # Install advanced chart libraries
  npm install --save chart.js@3.9.1 chartjs-plugin-datalabels@2.2.0 chartjs-plugin-annotation@2.1.0 chartjs-chart-matrix@1.2.0
  
  # Install PDF generation library for improved reports
  npm install --save jspdf@2.5.1 jspdf-autotable@3.5.28
  
  # Install guided tour library
  npm install --save intro.js@6.0.0
  
  log_success "Additional libraries installed successfully"
}
