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
