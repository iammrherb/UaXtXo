/**
 * Wizard Fix Script
 * Provides fixes for the wizard component
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log("Wizard Fix: Applying patches to wizard functionality...");
  
  // Check if wizard.js has been loaded
  if (typeof window.wizardManager !== 'undefined') {
    // Fix CountUp reference in updateSummaryMetrics
    const originalUpdateSummaryMetrics = window.wizardManager.updateSummaryMetrics;
    
    window.wizardManager.updateSummaryMetrics = function(results) {
      try {
        if (typeof CountUp !== 'undefined') {
          // Use original method if CountUp is available
          originalUpdateSummaryMetrics.call(this, results);
        } else {
          // Fallback implementation
          console.log("Using fallback for updating metrics (CountUp not available)");
          
          // Simple function to update metrics directly
          const updateMetric = function(id, value, prefix, suffix) {
            const element = document.getElementById(id);
            if (element) {
              if (typeof value === 'number') {
                element.textContent = prefix + value.toLocaleString() + suffix;
              } else {
                element.textContent = prefix + value + suffix;
              }
            }
          };
          
          // Update metrics if results are available
          if (results) {
            updateMetric('total-savings', Math.round(results.savings.total), '$', '');
            updateMetric('savings-percentage', Math.round(results.savings.percentage), '', '%');
            updateMetric('breakeven-point', results.breakeven.month > 0 ? results.breakeven.month : 'Immediate', '', ' months');
            updateMetric('risk-reduction', Math.round(results.riskReduction), '', '%');
            updateMetric('implementation-time', '75% less', '', '');
          }
        }
      } catch (error) {
        console.error("Error updating summary metrics:", error);
      }
    };
    
    console.log("Wizard Fix: Applied patches to wizard functionality");
  } else {
    console.warn("Wizard Fix: wizard.js not loaded, patches not applied");
  }
});
