/**
 * Chart Configuration for Portnox Total Cost Analyzer
 * Provides central configuration for all chart visualizations
 */

// Global chart colors
const PORTNOX_CHART_COLORS = {
  primary: '#1a5a96',
  primaryLight: 'rgba(26, 90, 150, 0.2)',
  primaryDark: '#0d4275',
  secondary: '#2ecc71',
  secondaryLight: 'rgba(46, 204, 113, 0.2)',
  secondaryDark: '#27ae60',
  warning: '#f39c12',
  warningLight: 'rgba(243, 156, 18, 0.2)',
  warningDark: '#e67e22',
  danger: '#e74c3c',
  dangerLight: 'rgba(231, 76, 60, 0.2)',
  dangerDark: '#c0392b',
  info: '#3498db',
  infoLight: 'rgba(52, 152, 219, 0.2)',
  infoDark: '#2980b9',
  purple: '#9b59b6',
  purpleLight: 'rgba(155, 89, 182, 0.2)',
  purpleDark: '#8e44ad',
  gray: '#95a5a6',
  grayLight: 'rgba(149, 165, 166, 0.2)',
  grayDark: '#7f8c8d'
};

// Font settings
const PORTNOX_CHART_FONT_FAMILY = 'Nunito, sans-serif';

// Animation settings
const PORTNOX_CHART_ANIMATIONS = {
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
};

// Common chart options for ApexCharts
const PORTNOX_APEX_COMMON_OPTIONS = {
  chart: {
    fontFamily: CHART_FONT_FAMILY,
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false
      }
    },
    animations: CHART_ANIMATIONS
  },
  tooltip: {
    style: {
      fontSize: '12px',
      fontFamily: CHART_FONT_FAMILY
    }
  },
  grid: {
    borderColor: 'rgba(0, 0, 0, 0.1)',
    row: {
      colors: ['rgba(0, 0, 0, 0.02)', 'transparent'],
      opacity: 0.5
    }
  },
  legend: {
    fontFamily: CHART_FONT_FAMILY,
    fontSize: '13px'
  }
};

// Dark mode overrides for ApexCharts
const PORTNOX_APEX_DARK_MODE_OVERRIDES = {
  chart: {
    foreColor: 'rgba(255, 255, 255, 0.8)'
  },
  grid: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    row: {
      colors: ['rgba(255, 255, 255, 0.05)', 'transparent'],
      opacity: 0.5
    }
  },
  tooltip: {
    style: {
      fontSize: '12px',
      fontFamily: CHART_FONT_FAMILY
    },
    theme: 'dark'
  }
};

// Reactive chart updates based on dark mode
function updateChartsForDarkMode(isDarkMode) {
  // Update ApexCharts if available
  if (window.apexChartManager && window.apexChartManager.charts) {
    for (const chartId in window.apexChartManager.charts) {
      const chart = window.apexChartManager.charts[chartId];
      
      if (isDarkMode) {
        chart.updateOptions(APEX_DARK_MODE_OVERRIDES);
      } else {
        chart.updateOptions({
          chart: {
            foreColor: '#333'
          },
          grid: {
            borderColor: 'rgba(0, 0, 0, 0.1)',
            row: {
              colors: ['rgba(0, 0, 0, 0.02)', 'transparent'],
              opacity: 0.5
            }
          },
          tooltip: {
            theme: 'light'
          }
        });
      }
    }
  }
  
  // Update D3 charts if available
  if (window.d3Manager && window.d3Manager.charts) {
    for (const chartId in window.d3Manager.charts) {
      const container = window.d3Manager.charts[chartId];
      
      // Re-render D3 charts by calling the appropriate method
      if (chartId.includes('nist')) {
        window.d3Manager.createNistFrameworkChart({}, container.id, chartId);
      } else if (chartId.includes('threat')) {
        window.d3Manager.createThreatModelVisualization({}, container.id, chartId);
      } else if (chartId.includes('vendor')) {
        window.d3Manager.createVendorHeatmap({}, container.id, chartId);
      }
    }
  }
}

// Initialize dark mode listener
document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      const isDarkMode = document.body.classList.contains('dark-mode');
      updateChartsForDarkMode(isDarkMode);
    });
    
    // Initialize with current state
    const isDarkMode = document.body.classList.contains('dark-mode');
    updateChartsForDarkMode(isDarkMode);
  }
});
