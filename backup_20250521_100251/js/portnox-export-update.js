// Add report generator to App state
App.state.reportGenerator = null;

// Initialize report generator
App.init = function() {
  console.log('Initializing Portnox TCO Analyzer...');
  
  // Initialize Calculator
  this.state.calculator = new TcoCalculator(this.state.config);
  
  // Initialize Chart Loader
  this.state.chartLoader = new ChartLoader().init();
  
  // Initialize Report Generator
  this.state.reportGenerator = new ReportGenerator();
  
  // Set up event listeners
  this.setupEventListeners();
  
  // Initialize UI state
  this.initUIState();
  
  console.log('Portnox TCO Analyzer initialized successfully.');
};

// Update export report function
App.exportReport = function() {
  console.log('Exporting report...');
  
  if (!this.state.results) {
    this.showToast('Please calculate TCO before exporting a report.', 'warning');
    return;
  }
  
  // Show loading overlay
  this.showLoadingOverlay();
  
  // Generate PDF report
  this.state.reportGenerator.generateReport(
    this.state.results,
    this.state.config,
    this.state.selectedVendors
  )
  .then(() => {
    // Hide loading overlay
    this.hideLoadingOverlay();
    
    // Show success toast
    this.showToast('Report exported successfully!', 'success');
  })
  .catch(error => {
    console.error('Error exporting report:', error);
    
    // Hide loading overlay
    this.hideLoadingOverlay();
    
    // Show error toast
    this.showToast('Error exporting report. Please try again.', 'error');
  });
};
