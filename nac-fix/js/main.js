var _tempModule = (function() {
/**
 * Main Application JavaScript for NAC Architecture Designer Pro
 * Handles core functionality, theme switching, and component coordination
 */

const NACDesignerApp = (function() {
  // Configuration
  let config = {
    darkMode: false,
    selectedVendor: 'cisco',
    currentIndustry: 'healthcare',
    deviceCount: 1000,
    implementationTimeframe: '3-years',
    complianceFrameworks: ['hipaa', 'pci-dss', 'nist-csf', 'gdpr', 'iso27001']
  };
  
  // DOM Elements
  let elements = {
    darkModeToggle: null,
    vendorSelectors: null,
    chartContainers: null,
    tabButtons: null,
    tabContents: null
  };
  
  // Initialize application
  function init() {
    // Get DOM elements
    cacheElements();
    
    // Setup event listeners
    setupEventListeners();
    
    // Check for dark mode preference
    checkDarkModePreference();
    
    // Initialize vendor selection
    initVendorSelection();
    
    // Initialize tabs
    initTabs();
    
    // Initialize charts (if ModernCharts is available)
    initCharts();
    
    // Add startup animation
    addStartupAnimation();
    
    console.log('NAC Designer Pro initialized');
  }
  
  // Cache DOM elements
  function cacheElements() {
    elements.darkModeToggle = document.querySelector('#dark-mode-toggle');
    elements.vendorSelectors = document.querySelectorAll('.vendor-selector');
    elements.chartContainers = document.querySelectorAll('.chart-container');
    elements.tabButtons = document.querySelectorAll('.tab-button');
    elements.tabContents = document.querySelectorAll('.tab-content');
  }
  
  // Setup event listeners
  function setupEventListeners() {
    // Dark mode toggle
    if (elements.darkModeToggle) {
      elements.darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    
    // Vendor selectors
    if (elements.vendorSelectors) {
      elements.vendorSelectors.forEach(selector => {
        selector.addEventListener('click', handleVendorSelection);
      });
    }
    
    // Tab buttons
    if (elements.tabButtons) {
      elements.tabButtons.forEach(button => {
        button.addEventListener('click', handleTabClick);
      });
    }
    
    // Listen for wizard completion
    document.addEventListener('wizardComplete', handleWizardCompletion);
    
    // Listen for window resize
    window.addEventListener('resize', handleResize);
  }
  
  // Check if user prefers dark mode
  function checkDarkModePreference() {
    // Check localStorage first
    const storedPreference = localStorage.getItem('darkMode');
    
    if (storedPreference) {
      setDarkMode(storedPreference === 'true');
    } else {
      // Check system preference
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDarkMode);
    }
  }
  
  // Toggle dark mode
  function toggleDarkMode() {
    setDarkMode(!config.darkMode);
  }
  
  // Set dark mode state
  function setDarkMode(isDarkMode) {
    config.darkMode = isDarkMode;
    
    // Update DOM
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    // Update toggle if exists
    if (elements.darkModeToggle) {
      const icon = elements.darkModeToggle.querySelector('i');
      if (icon) {
        if (isDarkMode) {
          icon.classList.remove('fa-moon');
          icon.classList.add('fa-sun');
        } else {
          icon.classList.remove('fa-sun');
          icon.classList.add('fa-moon');
        }
      }
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode);
    
    // Dispatch event for other components
    const event = new CustomEvent('darkModeChanged', {
      detail: { isDarkMode: isDarkMode }
    });
    
    document.dispatchEvent(event);
    
    // Update charts if ModernCharts is available
    if (typeof ModernCharts !== 'undefined' && ModernCharts.updateDarkMode) {
      ModernCharts.updateDarkMode(isDarkMode);
    }
  }
  
  // Initialize vendor selection
  function initVendorSelection() {
    // Set initial vendor
    setSelectedVendor(config.selectedVendor);
  }
  
  // Handle vendor selection
  function handleVendorSelection(event) {
    const vendorId = event.currentTarget.dataset.vendor;
    if (vendorId) {
      setSelectedVendor(vendorId);
    }
  }
  
  // Set selected vendor
  function setSelectedVendor(vendorId) {
    config.selectedVendor = vendorId;
    
    // Update UI
    if (elements.vendorSelectors) {
      elements.vendorSelectors.forEach(selector => {
        if (selector.dataset.vendor === vendorId) {
          selector.classList.add('active');
        } else {
          selector.classList.remove('active');
        }
      });
    }
    
    // Update charts
    updateChartsForVendor(vendorId);
    
    // Update vendor comparison
    updateVendorComparison(vendorId);
  }
  
  // Initialize tabs
  function initTabs() {
    // Set first tab as active
    if (elements.tabButtons && elements.tabButtons.length > 0) {
      const firstTab = elements.tabButtons[0];
      const tabId = firstTab.dataset.tab;
      
      firstTab.classList.add('active');
      
      if (tabId && elements.tabContents) {
        const tabContent = document.querySelector(`#${tabId}`);
        if (tabContent) {
          tabContent.classList.add('active');
        }
      }
    }
  }
  
  // Handle tab click
  function handleTabClick(event) {
    const tabButton = event.currentTarget;
    const tabId = tabButton.dataset.tab;
    
    if (!tabId) return;
    
    // Update active tab button
    if (elements.tabButtons) {
      elements.tabButtons.forEach(button => {
        button.classList.remove('active');
      });
    }
    
    tabButton.classList.add('active');
    
    // Update active tab content
    if (elements.tabContents) {
      elements.tabContents.forEach(content => {
        content.classList.remove('active');
      });
      
      const tabContent = document.querySelector(`#${tabId}`);
      if (tabContent) {
        tabContent.classList.add('active');
        
        // Add animation
        tabContent.classList.add('fade-in');
        setTimeout(() => {
          tabContent.classList.remove('fade-in');
        }, 500);
      }
    }
  }
  
  // Initialize charts
  function initCharts() {
    if (typeof ModernCharts === 'undefined') {
      console.warn('ModernCharts not available');
      return;
    }
    
    // Initialize ModernCharts
    ModernCharts.setup();
    
    // Update charts for selected vendor
    updateChartsForVendor(config.selectedVendor);
  }
  
  // Update charts for a specific vendor
  function updateChartsForVendor(vendorId) {
    if (typeof ModernCharts === 'undefined') return;
    
    console.log(`Updating charts for vendor: ${vendorId}`);
    
    // Sample data - in a real application, this would come from your data service
    const tcoChartData = generateTCOChartData(vendorId);
    const cumulativeChartData = generateCumulativeChartData(vendorId);
    const featureChartData = generateFeatureChartData(vendorId);
    const implementationChartData = generateImplementationChartData(vendorId);
    const roiChartData = generateROIChartData(vendorId);
    
    // Update TCO Comparison Chart
    const tcoComparisonChart = document.getElementById('tco-comparison-chart');
    if (tcoComparisonChart && ModernCharts.charts.tcoComparison) {
      ModernCharts.charts.tcoComparison(tcoComparisonChart, tcoChartData);
    }
    
    // Update Cumulative Cost Chart
    const cumulativeCostChart = document.getElementById('cumulative-cost-chart');
    if (cumulativeCostChart && ModernCharts.charts.cumulativeCost) {
      ModernCharts.charts.cumulativeCost(cumulativeCostChart, cumulativeChartData);
    }
    
    // Update Feature Comparison Chart
    const featureComparisonChart = document.getElementById('feature-comparison-chart');
    if (featureComparisonChart && ModernCharts.charts.featureComparison) {
      ModernCharts.charts.featureComparison(featureComparisonChart, featureChartData);
    }
    
    // Update Implementation Comparison Chart
    const implementationComparisonChart = document.getElementById('implementation-comparison-chart');
    if (implementationComparisonChart && ModernCharts.charts.implementationComparison) {
      ModernCharts.charts.implementationComparison(implementationComparisonChart, implementationChartData);
    }
    
    // Update ROI Chart
    const roiChart = document.getElementById('roi-chart');
    if (roiChart && ModernCharts.charts.roi) {
      ModernCharts.charts.roi(roiChart, roiChartData);
    }
    
    // Update Cost Breakdown Charts
    updateCostBreakdownCharts(vendorId);
    
    // Update Risk Analysis
    updateRiskAnalysis(vendorId);
    
    // Update Compliance Matrix
    updateComplianceMatrix(vendorId);
  }
  
  // Update vendor comparison
  function updateVendorComparison(vendorId) {
    // Update vendor comparison card if VendorAdvantages is available
    if (typeof VendorAdvantages !== 'undefined' && VendorAdvantages.createVendorComparisonCard) {
      VendorAdvantages.createVendorComparisonCard('#vendor-comparison-container', vendorId);
    }
    
    // Update feature matrix if VendorAdvantages is available
    if (typeof VendorAdvantages !== 'undefined' && VendorAdvantages.createFeatureMatrixTable) {
      VendorAdvantages.createFeatureMatrixTable('#feature-matrix-container', ['portnox', vendorId]);
    }
    
    // Update implementation timeline if VendorAdvantages is available
    if (typeof VendorAdvantages !== 'undefined' && VendorAdvantages.createImplementationTimeline) {
      VendorAdvantages.createImplementationTimeline('#implementation-timeline-container', vendorId);
    }
  }
  
  // Update cost breakdown charts
  function updateCostBreakdownCharts(vendorId) {
    if (typeof ModernCharts === 'undefined') return;
    
    // Generate data
    const currentBreakdownData = generateCostBreakdownData(vendorId);
    const portnoxBreakdownData = generateCostBreakdownData('portnox');
    
    // Update Current Solution Breakdown Chart
    const currentBreakdownChart = document.getElementById('current-breakdown-chart');
    if (currentBreakdownChart && ModernCharts.charts.costBreakdown) {
      ModernCharts.charts.costBreakdown(currentBreakdownChart, currentBreakdownData);
    }
    
    // Update Portnox Breakdown Chart
    const portnoxBreakdownChart = document.getElementById('alternative-breakdown-chart');
    if (portnoxBreakdownChart && ModernCharts.charts.costBreakdown) {
      ModernCharts.charts.costBreakdown(portnoxBreakdownChart, portnoxBreakdownData);
    }
  }
  
  // Update risk analysis
  function updateRiskAnalysis(vendorId) {
    // Skip if RiskAnalysis is not available
    if (typeof RiskAnalysis === 'undefined') return;
    
    // Map vendor to NAC type
    let nacType = 'traditional-nac';
    if (vendorId === 'portnox' || vendorId === 'securew2') {
      nacType = 'cloud-nac';
    } else if (vendorId === 'noNac') {
      nacType = 'no-nac';
    }
    
    // Update risk table
    RiskAnalysis.createRiskTable('#risk-table-container', nacType);
    
    // Update risk summary
    RiskAnalysis.createRiskSummary('#risk-summary-container', nacType);
    
    // Update breach impact visualization
    RiskAnalysis.createBreachImpactVisualization('#breach-impact-container', ['no-nac', nacType]);
    
    // Update risk heatmap if ModernCharts is available
    if (typeof ModernCharts !== 'undefined' && ModernCharts.charts.riskHeatmap) {
      const riskHeatmapData = RiskAnalysis.createRiskHeatmapData(nacType);
      ModernCharts.charts.riskHeatmap('#risk-heatmap-container', riskHeatmapData);
    }
  }
  
  // Update compliance matrix
  function updateComplianceMatrix(vendorId) {
    // Skip if ComplianceFrameworks is not available
    if (typeof ComplianceFrameworks === 'undefined') return;
    
    // Create compliance matrix
    ComplianceFrameworks.createComplianceMatrix('#compliance-matrix-container', ['portnox', vendorId]);
    
    // Create industry compliance
    ComplianceFrameworks.createIndustryCompliance('#industry-compliance-container', config.currentIndustry);
    
    // Create framework details for HIPAA (default)
    ComplianceFrameworks.createFrameworkDetailsCard('#framework-details-container', 'hipaa');
  }
  
  // Handle wizard completion
  function handleWizardCompletion(event) {
    console.log('Wizard completed');
    
    // Show results section
    const resultsSection = document.querySelector('#results-section');
    if (resultsSection) {
      resultsSection.classList.remove('hidden');
      
      // Add animation
      resultsSection.classList.add('fade-in');
      setTimeout(() => {
        resultsSection.classList.remove('fade-in');
      }, 500);
      
      // Scroll to results
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Hide wizard section
    const wizardSection = document.querySelector('#wizard-section');
    if (wizardSection) {
      wizardSection.classList.add('hidden');
    }
  }
  
  // Handle window resize
  function handleResize() {
    // Update charts if ModernCharts is available
    if (typeof ModernCharts !== 'undefined') {
      console.log('Resizing charts');
      
      // Force chart updates
      updateChartsForVendor(config.selectedVendor);
    }
  }
  
  // Add startup animation
  function addStartupAnimation() {
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    
    if (header) {
      header.classList.add('fade-in');
      setTimeout(() => {
        header.classList.remove('fade-in');
      }, 500);
    }
    
    if (main) {
      main.classList.add('fade-in-delay-1');
      setTimeout(() => {
        main.classList.remove('fade-in-delay-1');
      }, 800);
    }
  }
  
  // Data Generation Functions - Example implementations, replace with real data
  
  function generateTCOChartData(vendorId) {
    // Example data - replace with actual calculations
    return {
      labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
      datasets: [
        {
          label: 'Current Solution',
          data: [250000, 190000, 180000, 170000, 165000],
          backgroundColor: '#ef4444',
          borderColor: '#ef4444',
          borderWidth: 1
        },
        {
          label: 'Portnox Cloud',
          data: [80000, 85000, 85000, 85000, 85000],
          backgroundColor: '#3b82f6',
          borderColor: '#3b82f6',
          borderWidth: 1
        }
      ]
    };
  }
  
  function generateCumulativeChartData(vendorId) {
    // Example data - replace with actual calculations
    return {
      labels: ['Initial', 'Year 1', 'Year 2', 'Year 3'],
      datasets: [
        {
          label: 'Current Solution',
          data: [250000, 440000, 630000, 800000],
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderColor: '#ef4444',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        },
        {
          label: 'Portnox Cloud',
          data: [25000, 110000, 195000, 280000],
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderColor: '#3b82f6',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }
      ]
    };
  }
  
  function generateCostBreakdownData(vendorId) {
    if (vendorId === 'portnox') {
      return {
        labels: ['Setup', 'Subscription', 'Services', 'Support'],
        datasets: [{
          data: [25000, 160000, 45000, 20000],
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
          borderWidth: 0
        }]
      };
    } else {
      return {
        labels: ['Hardware', 'Software', 'Services', 'Support'],
        datasets: [{
          data: [250000, 190000, 180000, 100000],
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
          borderWidth: 0
        }]
      };
    }
  }
  
  function generateFeatureChartData(vendorId) {
    // Example data - replace with actual ratings
    return {
      labels: ['Deployment Speed', 'Maintenance', 'Scalability', 'Cloud Integration', 'Device Discovery', 'Authentication', 'Policy Management'],
      datasets: [
        {
          label: 'Current Solution',
          data: [3, 4, 6, 4, 7, 8, 7],
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          borderColor: '#ef4444',
          borderWidth: 2,
          pointBackgroundColor: '#ef4444'
        },
        {
          label: 'Portnox Cloud',
          data: [9, 9, 9, 10, 8, 8, 8],
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: '#3b82f6',
          borderWidth: 2,
          pointBackgroundColor: '#3b82f6'
        }
      ]
    };
  }
  
  function generateImplementationChartData(vendorId) {
    // Example data - replace with actual timelines
    return {
      labels: ['Hardware Setup', 'Software Install', 'Configuration', 'Testing', 'Deployment', 'Training'],
      datasets: [
        {
          label: 'Current Solution',
          data: [30, 14, 21, 14, 30, 7],
          backgroundColor: '#ef4444',
          borderColor: '#ef4444',
          borderWidth: 1
        },
        {
          label: 'Portnox Cloud',
          data: [0, 1, 2, 1, 2, 1],
          backgroundColor: '#3b82f6',
          borderColor: '#3b82f6',
          borderWidth: 1
        }
      ]
    };
  }
  
  function generateROIChartData(vendorId) {
    // Example data - replace with actual ROI calculations
    return {
      labels: ['Year 1', 'Year 2', 'Year 3'],
      datasets: [
        {
          label: 'Cumulative Savings',
          data: [140000, 335000, 520000],
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderColor: '#10b981',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        },
        {
          label: 'Implementation Cost',
          data: [25000, 25000, 25000],
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderColor: '#3b82f6',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }
      ]
    };
  }
  
  // Public API
  return {
    init: init,
    setDarkMode: setDarkMode,
    setSelectedVendor: setSelectedVendor,
    updateChartsForVendor: updateChartsForVendor,
    config: config
  };
})();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  NACDesignerApp.init();
});
return window.main;
})();
