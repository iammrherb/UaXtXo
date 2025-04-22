/**
 * Main JavaScript file for the TCO Calculator
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize UI Controller
  window.uiController = new UIController();
  
  // Initialize Chart Builder
  window.chartBuilder = new ChartBuilder();
  window.chartBuilder.initCharts();
  
  // Initialize Calculator
  window.calculator = new Calculator();
  
  // Set default active vendor
  window.uiController.setActiveVendor('cisco');
  
  // Pre-calculate for initial state
  window.calculator.calculate();
  
  console.log('TCO Calculator initialized and ready');
});
