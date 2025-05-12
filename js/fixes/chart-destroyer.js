/**
 * Chart Destroyer - Fixes canvas reuse issues
 * This script destroys existing chart instances before creating new ones
 */
(function() {
    console.log("Chart Destroyer: Initializing...");
    
    // Store chart instances
    window.chartInstances = window.chartInstances || {};
    
    // Function to destroy chart if it exists
    function destroyChartIfExists(canvasId) {
        if (window.chartInstances[canvasId]) {
            console.log(`Destroying existing chart on canvas: ${canvasId}`);
            window.chartInstances[canvasId].destroy();
            delete window.chartInstances[canvasId];
        }
    }
    
    // Override chart initialization methods
    if (window.Chart) {
        const originalNewChart = window.Chart;
        window.Chart = function(ctx, config) {
            const canvasId = ctx.canvas.id;
            destroyChartIfExists(canvasId);
            const chart = new originalNewChart(ctx, config);
            window.chartInstances[canvasId] = chart;
            return chart;
        };
        
        // Copy prototype and static properties
        Object.keys(originalNewChart).forEach(key => {
            window.Chart[key] = originalNewChart[key];
        });
        window.Chart.prototype = originalNewChart.prototype;
    }
    
    console.log("Chart Destroyer: Initialized successfully");
})();
