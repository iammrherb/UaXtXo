/**
 * Chart Builder Compatibility Layer
 * This script ensures all chart building components can work together
 */

// Create a global ChartBuilder class if it doesn't exist
if (typeof ChartBuilder === 'undefined') {
  console.log('Creating ChartBuilder compatibility layer');
  
  class ChartBuilder {
    constructor() {
      // Set up common properties
      this.chartColors = {
        cisco: 'rgba(0, 133, 202, 1)',      // Cisco blue
        aruba: 'rgba(255, 122, 0, 1)',      // Aruba orange
        forescout: 'rgba(0, 79, 159, 1)',   // Forescout blue
        nps: 'rgba(0, 164, 239, 1)',        // Microsoft blue
        fortinac: 'rgba(238, 49, 36, 1)',   // FortiNAC red
        securew2: 'rgba(139, 197, 63, 1)',  // SecureW2 green
        portnox: 'rgba(43, 210, 91, 1)',    // Portnox green
        neutral: 'rgba(136, 136, 136, 1)'   // Neutral gray
      };
      
      this.isMobile = window.innerWidth < 768;
      
      // Chart defaults
      this.chartDefaults = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              padding: 15
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleFont: {
              size: 13
            },
            bodyFont: {
              size: 13
            },
            padding: 10,
            cornerRadius: 5
          }
        }
      };
      
      // Initialize empty charts object
      this.charts = {};
    }
    
    // Stub methods that can be overridden
    initCharts() {
      console.log('ChartBuilder.initCharts() compatibility stub');
    }
    
    updateTCOComparisonChart() {
      console.log('ChartBuilder.updateTCOComparisonChart() compatibility stub');
    }
    
    updateFeatureComparisonChart() {
      console.log('ChartBuilder.updateFeatureComparisonChart() compatibility stub');
    }
    
    updateCumulativeCostChart() {
      console.log('ChartBuilder.updateCumulativeCostChart() compatibility stub');
    }
    
    updateROIChart() {
      console.log('ChartBuilder.updateROIChart() compatibility stub');
    }
    
    // Helper method to get vendor name
    getVendorName(vendorKey) {
      const vendorNames = {
        cisco: 'Cisco ISE',
        aruba: 'Aruba ClearPass',
        forescout: 'Forescout',
        nps: 'Microsoft NPS',
        fortinac: 'FortiNAC',
        securew2: 'SecureW2',
        portnox: 'Portnox Cloud',
        none: 'No NAC Solution',
        other: 'Other NAC Solution'
      };
      
      return vendorNames[vendorKey] || vendorKey;
    }
  }
  
  // Make it globally available
  window.ChartBuilder = ChartBuilder;
}
