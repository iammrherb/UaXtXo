// Update App.init to use ChartLoader
App.init = function() {
  console.log('Initializing Portnox TCO Analyzer...');
  
  // Initialize Calculator
  this.state.calculator = new TcoCalculator(this.state.config);
  
  // Initialize Chart Loader
  this.state.chartLoader = new ChartLoader().init();
  
  // Set up event listeners
  this.setupEventListeners();
  
  // Initialize UI state
  this.initUIState();
  
  console.log('Portnox TCO Analyzer initialized successfully.');
};

// Update updateChartsForActiveView to use ChartLoader
App.updateChartsForActiveView = function() {
  const { activeView, results, chartLoader } = this.state;
  
  if (!chartLoader || !results) return;
  
  // Load charts for the active view
  chartLoader.reloadChartsForView(activeView, results);
};
