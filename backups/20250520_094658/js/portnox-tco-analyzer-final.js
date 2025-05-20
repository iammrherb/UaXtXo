/**
 * Portnox Total Cost Analyzer - Main Application (Final Integration)
 */

// Update App object with new components
App.init = function() {
  console.log('Initializing Portnox TCO Analyzer...');
  
  // Initialize Calculator
  this.state.calculator = new TcoCalculator(this.state.config);
  
  // Initialize Chart Loader
  this.state.chartLoader = new ChartLoader().init();
  
  // Initialize Report Generator
  this.state.reportGenerator = new ReportGenerator();
  
  // Initialize UI Manager
  this.state.uiManager = new UIManager(this);
  
  // Initialize Theme Manager
  this.state.themeManager = new ThemeManager();
  
  // Initialize Vendor Comparison View
  this.state.vendorComparison = new VendorComparisonView(this);
  this.state.vendorComparison.init('vendor-radar-chart');
  
  // Set up event listeners
  this.setupEventListeners();
  
  // Initialize UI state
  this.initUIState();
  
  // Initialize UI manager after UI state
  this.state.uiManager.init();
  
  console.log('Portnox TCO Analyzer initialized successfully.');
};

// Enhanced calculate method
App.calculate = function() {
  console.log('Calculating TCO and ROI...');
  
  // Show loading overlay with message
  this.state.uiManager.showLoading('Calculating TCO & ROI...');
  
  // Update calculator config
  this.state.calculator.updateConfig(this.state.config);
  
  // Perform calculation with slight delay to allow UI to update
  setTimeout(() => {
    try {
      // Calculate results
      this.state.results = this.state.calculator.calculate(this.state.selectedVendors);
      
      // Pass results to the calculator instance for future reference
      this.state.results.calculator = this.state.calculator;
      
      // Update UI with results
      this.updateResultsUI();
      
      // Update vendor comparison view
      this.state.vendorComparison.update(this.state.results, this.state.selectedVendors);
      
      // Hide loading overlay
      this.state.uiManager.hideLoading();
      
      // Show success toast
      this.state.uiManager.showToast('Calculation completed successfully!', 'success');
      
      console.log('Calculation completed:', this.state.results);
    } catch (error) {
      console.error('Calculation error:', error);
      
      // Hide loading overlay
      this.state.uiManager.hideLoading();
      
      // Show error toast
      this.state.uiManager.showToast('Error during calculation: ' + error.message, 'error');
    }
  }, 800);
};

// Enhanced export report method
App.exportReport = function() {
  console.log('Exporting report...');
  
  if (!this.state.results) {
    this.state.uiManager.showToast('Please calculate TCO before exporting a report.', 'warning');
    return;
  }
  
  // Show loading overlay with message
  this.state.uiManager.showLoading('Generating PDF report...');
  
  // Generate PDF report
  this.state.reportGenerator.generateReport(
    this.state.results,
    this.state.config,
    this.state.selectedVendors
  )
  .then(() => {
    // Hide loading overlay
    this.state.uiManager.hideLoading();
    
    // Show success toast
    this.state.uiManager.showToast('Report exported successfully!', 'success');
  })
  .catch(error => {
    console.error('Error exporting report:', error);
    
    // Hide loading overlay
    this.state.uiManager.hideLoading();
    
    // Show error toast
    this.state.uiManager.showToast('Error exporting report. Please try again.', 'error');
  });
};

// Enhanced toggle dark mode
App.toggleDarkMode = function() {
  this.state.themeManager.toggleDarkMode();
  
  // Update UI components for the new theme
  this.state.uiManager.refreshUI();
  
  // Update charts for the active view
  if (this.state.results) {
    this.updateChartsForActiveView();
  }
};

// Enhanced update UI with results method
App.updateResultsUI = function() {
  if (!this.state.results) return;
  
  console.log('Updating UI with results...');
  
  // Update metrics based on results
  this.updateMetrics();
  
  // Update charts for the active view
  this.updateChartsForActiveView();
  
  // Update UI manager with results
  this.state.uiManager.updateUIWithResults(this.state.results);
  
  console.log('UI updated with results.');
};

// Add enhanced helper functions
App.getVendorById = function(vendorId) {
  return VENDORS[vendorId] || null;
};

App.getTopVendorsByMetric = function(metric, count = 3, lowerIsBetter = true) {
  if (!this.state.results) return [];
  
  const vendors = Object.keys(this.state.results.vendors)
    .filter(v => v !== 'no-nac')
    .map(id => ({
      id,
      name: this.getVendorById(id).name,
      value: this.state.results.vendors[id][metric]
    }));
  
  vendors.sort((a, b) => {
    return lowerIsBetter ?
      a.value - b.value :
      b.value - a.value;
  });
  
  return vendors.slice(0, count);
};

App.confirmAction = function(options) {
  return this.state.uiManager.showConfirmDialog(options);
};
