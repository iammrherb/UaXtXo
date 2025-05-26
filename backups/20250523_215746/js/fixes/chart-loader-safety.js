/**
 * Chart.js Loader Safety
 * Ensures Chart.js is loaded before platform initialization
 */

(function() {
    // Prevent multiple executions
    if (window._chartLoaderInitialized) return;
    window._chartLoaderInitialized = true;
    
    let retries = 0;
    const maxRetries = 10;
    
    function checkChartJs() {
        if (typeof Chart !== 'undefined') {
            console.log("✅ Chart.js is loaded and ready");
            
            // Set safe defaults for Chart.js v4
            try {
                if (Chart.defaults) {
                    Chart.defaults.responsive = true;
                    Chart.defaults.maintainAspectRatio = false;
                    
                    // Set color defaults safely
                    if (Chart.defaults.plugins && Chart.defaults.plugins.legend) {
                        Chart.defaults.plugins.legend.labels = Chart.defaults.plugins.legend.labels || {};
                        Chart.defaults.plugins.legend.labels.color = '#b8c5d6';
                    }
                    
                    if (Chart.defaults.plugins && Chart.defaults.plugins.tooltip) {
                        Chart.defaults.plugins.tooltip.titleColor = '#ffffff';
                        Chart.defaults.plugins.tooltip.bodyColor = '#b8c5d6';
                    }
                }
            } catch (e) {
                console.warn("Could not set Chart.js defaults:", e);
            }
            
            // Dispatch event to signal Chart.js is ready
            window.dispatchEvent(new Event('chartjs-ready'));
            return; // Stop checking
        } else if (retries < maxRetries) {
            retries++;
            console.log(`⏳ Waiting for Chart.js... (attempt ${retries}/${maxRetries})`);
            setTimeout(checkChartJs, 500);
        } else {
            console.error("❌ Chart.js failed to load after maximum retries");
        }
    }
    
    // Start checking once
    checkChartJs();
})();
