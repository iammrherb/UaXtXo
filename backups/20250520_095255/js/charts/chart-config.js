/**
 * Enhanced Chart Configuration for Portnox Total Cost Analyzer
 * Central configuration for all charts with improved styling and readability
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
    text: '#333333',
    // Add gradient definitions for enhanced visuals
    gradients: {
      primary: ['#1a5a96', '#0d4275'],
      secondary: ['#2ecc71', '#25a25a'],
      warning: ['#f39c12', '#d68910'],
      danger: ['#e74c3c', '#c0392b']
    }
  },
  
  themes: {
    light: {
      background: '#f9f9f9',
      cardBackground: '#ffffff',
      textColor: '#333333',
      textLight: '#666666',
      borderColor: '#e0e0e0',
      gridColor: 'rgba(0, 0, 0, 0.05)'
    },
    dark: {
      background: '#121212',
      cardBackground: '#1e1e1e',
      textColor: '#e0e0e0',
      textLight: '#b0b0b0',
      borderColor: '#333333',
      gridColor: 'rgba(255, 255, 255, 0.05)'
    }
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
      cornerRadius: 8,
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
  
  // Enhanced ApexCharts default theme
  apexTheme: {
    chart: {
      background: 'transparent',
      fontFamily: "'Nunito', sans-serif",
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    colors: ['#1a5a96', '#2ecc71', '#f39c12', '#e74c3c', 
             '#9b59b6', '#3498db', '#1abc9c', '#d35400'],
    grid: {
      borderColor: 'rgba(0, 0, 0, 0.05)',
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
      }
    },
    tooltip: {
      enabled: true,
      theme: 'light',
      style: {
        fontSize: '12px',
        fontFamily: "'Nunito', sans-serif"
      }
    },
    xaxis: {
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: "'Nunito', sans-serif"
        }
      },
      axisBorder: {
        color: 'rgba(0, 0, 0, 0.1)'
      },
      axisTicks: {
        color: 'rgba(0, 0, 0, 0.1)'
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: "'Nunito', sans-serif"
        }
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '70%'
      },
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontFamily: "'Nunito', sans-serif",
              fontSize: '14px'
            },
            value: {
              fontFamily: "'Nunito', sans-serif",
              fontSize: '20px',
              fontWeight: 600
            },
            total: {
              show: true,
              fontFamily: "'Nunito', sans-serif",
              fontSize: '18px',
              fontWeight: 600
            }
          }
        }
      },
      radialBar: {
        dataLabels: {
          name: {
            fontFamily: "'Nunito', sans-serif",
            fontSize: '14px'
          },
          value: {
            fontFamily: "'Nunito', sans-serif",
            fontSize: '20px',
            fontWeight: 600
          },
          total: {
            show: true,
            fontFamily: "'Nunito', sans-serif",
            fontSize: '16px',
            fontWeight: 600
          }
        }
      }
    },
    dataLabels: {
      style: {
        fontFamily: "'Nunito', sans-serif",
        fontSize: '12px',
        fontWeight: 600
      }
    },
    legend: {
      fontFamily: "'Nunito', sans-serif",
      fontSize: '12px',
      itemMargin: {
        horizontal: 10,
        vertical: 5
      }
    }
  },
  
  // Enhanced D3 theme
  d3Theme: {
    fontFamily: "'Nunito', sans-serif",
    fontSize: 12,
    axisStyles: {
      strokeWidth: 1,
      strokeColor: 'rgba(0, 0, 0, 0.1)',
      textColor: '#666666',
      fontSize: 12
    },
    tooltipStyles: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: 'rgba(0, 0, 0, 0.1)',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      fontFamily: "'Nunito', sans-serif",
      fontSize: 12,
      padding: 10,
      borderRadius: 8
    },
    transitionDuration: 700
  },
  
  // Get color for a vendor
  getVendorColor: function(vendorId) {
    return this.colors.vendors[vendorId] || this.colors.chart[0];
  },
  
  // Get array of colors for multiple vendors
  getVendorColors: function(vendorIds) {
    return vendorIds.map(id => this.getVendorColor(id));
  },
  
  // Get gradient for a vendor
  getVendorGradient: function(vendorId) {
    if (vendorId === 'portnox') {
      return this.getGradient(this.colors.vendors.portnox, this.adjustColor(this.colors.vendors.portnox, -10));
    }
    
    return this.getGradient(this.getVendorColor(vendorId), this.adjustColor(this.getVendorColor(vendorId), -10));
  },
  
  // Create gradient string for CSS
  getGradient: function(startColor, endColor, angle = 135) {
    return `linear-gradient(${angle}deg, ${startColor}, ${endColor})`;
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
  },
  
  // Generate transparency variants of a color
  getTransparentColor: function(color, opacity) {
    // Convert hex to RGB
    const hexToRgb = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return [r, g, b];
    };
    
    if (color.startsWith('#')) {
      const [r, g, b] = hexToRgb(color);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    
    return color;
  },
  
  // Get current theme colors based on dark mode
  getCurrentTheme: function() {
    return document.body.classList.contains('dark-mode') ? this.themes.dark : this.themes.light;
  },
  
  // Update chart theme for dark/light mode
  updateChartTheme: function(isDarkMode) {
    if (isDarkMode) {
      this.apexTheme.chart.foreColor = this.themes.dark.textColor;
      this.apexTheme.tooltip.theme = 'dark';
      this.apexTheme.grid.borderColor = this.themes.dark.gridColor;
      this.apexTheme.xaxis.axisBorder.color = this.themes.dark.borderColor;
      this.apexTheme.xaxis.axisTicks.color = this.themes.dark.borderColor;
      
      this.d3Theme.axisStyles.strokeColor = 'rgba(255, 255, 255, 0.1)';
      this.d3Theme.axisStyles.textColor = this.themes.dark.textLight;
      this.d3Theme.tooltipStyles.backgroundColor = 'rgba(30, 30, 30, 0.95)';
      this.d3Theme.tooltipStyles.borderColor = this.themes.dark.borderColor;
    } else {
      this.apexTheme.chart.foreColor = this.themes.light.textColor;
      this.apexTheme.tooltip.theme = 'light';
      this.apexTheme.grid.borderColor = this.themes.light.gridColor;
      this.apexTheme.xaxis.axisBorder.color = this.themes.light.borderColor;
      this.apexTheme.xaxis.axisTicks.color = this.themes.light.borderColor;
      
      this.d3Theme.axisStyles.strokeColor = 'rgba(0, 0, 0, 0.1)';
      this.d3Theme.axisStyles.textColor = this.themes.light.textLight;
      this.d3Theme.tooltipStyles.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      this.d3Theme.tooltipStyles.borderColor = this.themes.light.borderColor;
    }
  }
};

// Initialize theme based on current setting
ChartConfig.updateChartTheme(document.body.classList.contains('dark-mode'));

// Update theme on dark mode toggle
window.addEventListener('themechange', (event) => {
  const isDarkMode = event.detail.theme === 'dark';
  ChartConfig.updateChartTheme(isDarkMode);
});

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ChartConfig };
}
