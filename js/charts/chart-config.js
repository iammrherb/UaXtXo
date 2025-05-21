/**
 * Chart Configuration for Portnox Total Cost Analyzer
 * Provides centralized configuration for all charts
 */

const ChartConfig = {
  colors: {
    primary: '#1a5a96',
    secondary: '#0d4275',
    highlight: '#27ae60',
    warning: '#e74c3c',
    neutral: '#3498db',
    chart: [
      '#1a5a96', // Portnox Blue
      '#e74c3c', // Cisco Red
      '#e67e22', // Aruba Orange
      '#f39c12', // Forescout Amber
      '#2ecc71', // FortiNAC Green
      '#3498db', // Juniper Blue
      '#9b59b6', // SecureW2 Purple
      '#34495e', // Microsoft Navy
      '#16a085', // Arista Teal
      '#27ae60'  // Foxpass Green
    ]
  },
  
  defaults: {
    fontFamily: '"Nunito", sans-serif',
    fontSize: 12
  },
  
  // Get colors for vendor IDs
  getVendorColor: function(vendorId, opacity) {
    if (opacity === undefined) opacity = 1;
    
    // Map vendor IDs to color indexes
    const vendorColorMap = {
      'portnox': 0,
      'cisco': 1,
      'aruba': 2,
      'forescout': 3,
      'fortinac': 4,
      'juniper': 5,
      'securew2': 6,
      'microsoft': 7,
      'arista': 8,
      'foxpass': 9
    };
    
    const colorIndex = vendorColorMap[vendorId] !== undefined ? vendorColorMap[vendorId] : 0;
    const color = this.colors.chart[colorIndex];
    
    // If opacity is not 1, convert to rgba
    if (opacity < 1) {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';
    }
    
    return color;
  },
  
  // Format currency values
  formatCurrency: function(value) {
    return '$' + value.toLocaleString();
  },
  
  // Format percentage values
  formatPercentage: function(value) {
    return value + '%';
  }
};

// Make it globally available
window.ChartConfig = ChartConfig;
