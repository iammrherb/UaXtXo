/**
 * Chart Initialization Fix
 * Prevents charts from being initialized multiple times
 */
(function() {
    // Store original Chart constructor
    const OriginalChart = window.Chart;
    
    // Track initialized charts by canvas ID
    const initializedCharts = {};
    
    // Override Chart constructor
    window.Chart = function(ctx, config) {
        let canvasId;
        
        // Get canvas ID
        if (typeof ctx === 'string') {
            canvasId = ctx;
        } else if (ctx && ctx.canvas && ctx.canvas.id) {
            canvasId = ctx.canvas.id;
        } else if (ctx && ctx.id) {
            canvasId = ctx.id;
        }
        
        // If this canvas already has a chart, destroy it
        if (canvasId && initializedCharts[canvasId]) {
            console.log(`Destroying existing chart for ${canvasId}`);
            initializedCharts[canvasId].destroy();
            delete initializedCharts[canvasId];
        }
        
        // Create new chart
        const chart = new OriginalChart(ctx, config);
        
        // Store reference if we have a canvas ID
        if (canvasId) {
            initializedCharts[canvasId] = chart;
        }
        
        return chart;
    };
    
    // Copy over static properties
    Object.keys(OriginalChart).forEach(key => {
        window.Chart[key] = OriginalChart[key];
    });
    
    console.log("Chart initialization fix applied");
})();
