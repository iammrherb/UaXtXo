/**
 * Tab and Chart Fixes
 * Ensures proper chart rendering and tab functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("🔧 Applying tab and chart fixes...");
    
    // Check if Chart.js is loaded before applying fixes
    if (typeof Chart !== 'undefined') {
        // Fix for Chart.js responsive issues
        Chart.defaults.responsive = true;
        Chart.defaults.maintainAspectRatio = false;
        
        // Override default colors for better visibility
        if (Chart.defaults.color !== undefined) {
            Chart.defaults.color = '#b8c5d6';
        }
        if (Chart.defaults.borderColor !== undefined) {
            Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
        }
        
        // Fix grid colors if the properties exist
        if (Chart.defaults.scales && Chart.defaults.scales.linear && Chart.defaults.scales.linear.grid) {
            Chart.defaults.scales.linear.grid.color = 'rgba(255, 255, 255, 0.05)';
        }
        if (Chart.defaults.scales && Chart.defaults.scales.category && Chart.defaults.scales.category.grid) {
            Chart.defaults.scales.category.grid.color = 'rgba(255, 255, 255, 0.05)';
        }
        
        console.log("✅ Tab and chart fixes applied");
    } else {
        console.warn("⚠️ Chart.js not loaded yet, retrying in 1 second...");
        
        // Retry after a delay
        setTimeout(function() {
            if (typeof Chart !== 'undefined') {
                // Apply the fixes
                Chart.defaults.responsive = true;
                Chart.defaults.maintainAspectRatio = false;
                
                // For Chart.js v4, the structure is different
                if (Chart.defaults.elements) {
                    Chart.defaults.elements.line.borderColor = 'rgba(255, 255, 255, 0.1)';
                    Chart.defaults.elements.arc.borderColor = 'rgba(255, 255, 255, 0.1)';
                }
                
                if (Chart.defaults.plugins && Chart.defaults.plugins.legend && Chart.defaults.plugins.legend.labels) {
                    Chart.defaults.plugins.legend.labels.color = '#b8c5d6';
                }
                
                console.log("✅ Tab and chart fixes applied (retry successful)");
            } else {
                console.error("❌ Chart.js still not available");
            }
        }, 1000);
    }
});
