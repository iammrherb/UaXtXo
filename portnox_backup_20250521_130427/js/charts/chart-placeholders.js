/**
 * Chart Placeholders for Portnox Total Cost Analyzer
 * Creates placeholders for charts that will be filled with real data
 */

class ChartPlaceholders {
  constructor() {
    this.charts = {};
  }
  
  /**
   * Initialize chart placeholders
   */
  init() {
    this.createPlaceholders();
  }
  
  /**
   * Create placeholders for all chart containers
   */
  createPlaceholders() {
    const chartContainers = document.querySelectorAll('.chart-wrapper');
    
    chartContainers.forEach(container => {
      const id = container.id || container.parentNode.id;
      
      if (!id) return;
      
      // Clear existing content
      container.innerHTML = '';
      
      // Create placeholder
      const placeholder = document.createElement('div');
      placeholder.className = 'chart-placeholder';
      
      const icon = document.createElement('i');
      icon.className = this.getIconForChart(id);
      placeholder.appendChild(icon);
      
      const text = document.createElement('p');
      text.textContent = 'Chart will appear here after calculation';
      placeholder.appendChild(text);
      
      container.appendChild(placeholder);
    });
  }
  
  /**
   * Get appropriate icon for chart type
   */
  getIconForChart(id) {
    if (id.includes('tco') || id.includes('cost')) {
      return 'fas fa-chart-line';
    } else if (id.includes('roi')) {
      return 'fas fa-chart-pie';
    } else if (id.includes('risk') || id.includes('security')) {
      return 'fas fa-shield-alt';
    } else if (id.includes('comparison')) {
      return 'fas fa-chart-bar';
    } else if (id.includes('radar')) {
      return 'fas fa-chart-area';
    } else {
      return 'fas fa-chart-bar';
    }
  }
  
  /**
   * Create a basic TCO comparison chart with Chart.js
   */
  createBasicTcoChart(elementId, data) {
    const element = document.getElementById(elementId);
    if (!element || !data || !data.vendors) return;
    
    // Clear placeholder
    element.innerHTML = '';
    
    const vendors = Object.keys(data.vendors).filter(v => v !== 'no-nac');
    const vendorNames = vendors.map(v => VENDORS[v].name);
    const tcoValues = vendors.map(v => data.vendors[v].totalTco);
    
    // Define colors
    const colors = {
      portnox: '#1a5a96',
      cisco: '#00bceb',
      aruba: '#f7931e',
      forescout: '#7a2a90',
      fortinac: '#e31837',
      juniper: '#84bd00',
      securew2: '#0078d7',
      microsoft: '#00a4ef',
      arista: '#2196f3',
      foxpass: '#ff9900'
    };
    
    const backgroundColors = vendors.map(v => colors[v] || '#777777');
    
    // Create chart
    const chart = new Chart(element, {
      type: 'bar',
      data: {
        labels: vendorNames,
        datasets: [{
          label: '3-Year TCO',
          data: tcoValues,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map(c => this.adjustColor(c, -10)),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(context.raw);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(value);
              }
            }
          }
        }
      }
    });
    
    this.charts[elementId] = chart;
    return chart;
  }
  
  /**
   * Helper function to adjust color lightness
   */
  adjustColor(hex, percent) {
    // Convert hex to RGB
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    
    // Adjust
    r = Math.min(255, Math.max(0, r + percent));
    g = Math.min(255, Math.max(0, g + percent));
    b = Math.min(255, Math.max(0, b + percent));
    
    // Convert back to hex
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.chartPlaceholders = new ChartPlaceholders();
  window.chartPlaceholders.init();
});
