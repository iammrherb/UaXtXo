/**
 * Chart configuration for Portnox Total Cost Analyzer
 * Central configuration for all charts used in the application
 */

const ChartConfig = {
  colors: {
    vendors: {
      portnox: '#1a5a96',
      cisco: '#00bceb',
      aruba: '#f7931e',
      forescout: '#7a2a90',
      fortinac: '#e31837',
      juniper: '#84bd00',
      securew2: '#0078d7',
      microsoft: '#00a4ef',
      arista: '#2196f3',
      foxpass: '#ff9900',
      extreme: '#00c389',
      'no-nac': '#777777'
    },
    chart: [
      '#1a5a96', '#2ecc71', '#f39c12', '#e74c3c',
      '#9b59b6', '#3498db', '#1abc9c', '#d35400',
      '#34495e', '#27ae60', '#c0392b', '#8e44ad'
    ],
    positive: '#2ecc71',
    negative: '#e74c3c',
    neutral: '#f39c12',
    background: '#f9f9f9',
    text: '#333333'
  },
  
  defaults: {
    fontFamily: "'Nunito', sans-serif",
    fontSize: 13,
    tooltipFontSize: 12,
    borderWidth: 2,
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    },
    responsiveAnimationDuration: 500,
    hover: {
      mode: 'nearest',
      intersect: true
    },
    tooltips: {
      mode: 'index',
      intersect: false,
      backgroundColor: 'rgba(50, 50, 50, 0.95)',
      titleFontFamily: "'Nunito', sans-serif",
      bodyFontFamily: "'Nunito', sans-serif",
      titleFontSize: 13,
      bodyFontSize: 12,
      xPadding: 10,
      yPadding: 10,
      cornerRadius: 4,
      displayColors: true
    },
    legend: {
      position: 'bottom',
      labels: {
        fontFamily: "'Nunito', sans-serif",
        fontSize: 12,
        padding: 20,
        usePointStyle: true,
        boxWidth: 8
      }
    }
  },
  
  // Get color for a vendor
  getVendorColor: function(vendorId) {
    return this.colors.vendors[vendorId] || this.colors.chart[0];
  },
  
  // Get array of colors for multiple vendors
  getVendorColors: function(vendorIds) {
    return vendorIds.map(id => this.getVendorColor(id));
  },
  
  // Format currency values
  formatCurrency: function(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  },
  
  // Format percentage values
  formatPercentage: function(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    }).format(value / 100);
  },
  
  // Format number values with commas
  formatNumber: function(value) {
    return new Intl.NumberFormat('en-US').format(value);
  },
  
  // Calculate lighter/darker shades of a color
  adjustColor: function(hex, percent) {
    // Convert hex to RGB
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    
    // Adjust
    r = Math.min(255, Math.max(0, Math.round(r * (1 + percent / 100))));
    g = Math.min(255, Math.max(0, Math.round(g * (1 + percent / 100))));
    b = Math.min(255, Math.max(0, Math.round(b * (1 + percent / 100))));
    
    // Convert back to hex
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
};

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ChartConfig };
}
