/**
 * Feature comparison chart fix
 * Ensures proper feature comparison between vendors
 */
document.addEventListener('DOMContentLoaded', function() {
  // Check if the chart builder is available
  if (!window.chartBuilder) return;
  
  // Store original method for reference
  const originalUpdateFeatureComparisonChart = window.chartBuilder.updateFeatureComparisonChart;
  
  // Replace with enhanced version
  window.chartBuilder.updateFeatureComparisonChart = function(vendorId) {
    try {
      if (!vendorId) return;
      
      const featureChart = this.charts.featureComparison;
      if (!featureChart) return;
      
      // Define enhanced feature set with more detailed metrics
      const featureSet = [
        { name: 'Deployment Simplicity', portnox: 9.5, cisco: 5, aruba: 5.5, forescout: 6, nps: 7, fortinac: 6, securew2: 7.5 },
        { name: 'Hardware Footprint', portnox: 10, cisco: 3, aruba: 4, forescout: 4.5, nps: 6, fortinac: 4.5, securew2: 7 },
        { name: 'Multi-Site Support', portnox: 9.5, cisco: 5.5, aruba: 6, forescout: 6, nps: 5, fortinac: 5.5, securew2: 7 },
        { name: 'Authentication Options', portnox: 9, cisco: 7.5, aruba: 8, forescout: 7, nps: 6, fortinac: 7, securew2: 8 },
        { name: 'Cloud Integration', portnox: 10, cisco: 5, aruba: 6, forescout: 6.5, nps: 5.5, fortinac: 6, securew2: 8 },
        { name: 'Legacy Device Support', portnox: 8.5, cisco: 7, aruba: 7, forescout: 8, nps: 6, fortinac: 7, securew2: 7 },
        { name: 'Automatic Updates', portnox: 10, cisco: 3, aruba: 3.5, forescout: 4, nps: 3, fortinac: 4, securew2: 7 },
        { name: 'Reporting & Analytics', portnox: 9, cisco: 7, aruba: 7.5, forescout: 8, nps: 5, fortinac: 6.5, securew2: 7 },
        { name: 'Scalability', portnox: 9.5, cisco: 6, aruba: 6.5, forescout: 7, nps: 5, fortinac: 6, securew2: 7.5 },
        { name: 'Operational Simplicity', portnox: 9, cisco: 4.5, aruba: 5, forescout: 5.5, nps: 6, fortinac: 5.5, securew2: 7 }
      ];
      
      // Extract data for the selected vendor and Portnox
      const labels = featureSet.map(feature => feature.name);
      const vendorData = featureSet.map(feature => feature[vendorId] || 0);
      const portnoxData = featureSet.map(feature => feature.portnox || 0);
      
      // Update chart
      featureChart.data.labels = labels;
      featureChart.data.datasets[0].data = portnoxData;
      featureChart.data.datasets[1].data = vendorData;
      featureChart.data.datasets[0].label = 'Portnox Cloud';
      featureChart.data.datasets[1].label = window.vendorData[vendorId]?.name || vendorId;
      
      featureChart.update();
    } catch (error) {
      console.error('Error updating feature comparison chart:', error);
      
      // Fall back to original method
      if (typeof originalUpdateFeatureComparisonChart === 'function') {
        originalUpdateFeatureComparisonChart.call(this, vendorId);
      }
    }
  };
  
  console.log('Enhanced feature comparison chart functionality');
});
