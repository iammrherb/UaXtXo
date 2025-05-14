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
            return true;
        }
        return false;
    }
    
    // Function to create and track a new chart
    function createAndTrackChart(canvasId, config) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            console.warn(`Canvas element not found for chart: ${canvasId}`);
            return null;
        }
        
        // Ensure any existing chart is destroyed
        destroyChartIfExists(canvasId);
        
        // Create new chart instance
        const ctx = canvas.getContext('2d');
        const chart = new Chart(ctx, config);
        
        // Store reference
        window.chartInstances[canvasId] = chart;
        
        return chart;
    }
    
    // Add global chart creation helper
    window.createChart = createAndTrackChart;
    
    // Add global chart destruction helper
    window.destroyChart = destroyChartIfExists;
    
    // Override chart initialization methods if ChartManager exists
    if (window.ChartManager) {
        const originalMethods = {
            initializeTcoComparisonChart: window.ChartManager.initializeTcoComparisonChart,
            initializeCurrentBreakdownChart: window.ChartManager.initializeCurrentBreakdownChart,
            initializeAlternativeBreakdownChart: window.ChartManager.initializeAlternativeBreakdownChart,
            initializeCumulativeCostChart: window.ChartManager.initializeCumulativeCostChart
        };
        
        // Override methods with versions that destroy existing charts
        if (originalMethods.initializeTcoComparisonChart) {
            window.ChartManager.initializeTcoComparisonChart = function() {
                destroyChartIfExists('tco-comparison-chart');
                return originalMethods.initializeTcoComparisonChart.apply(this, arguments);
            };
        }
        
        if (originalMethods.initializeCurrentBreakdownChart) {
            window.ChartManager.initializeCurrentBreakdownChart = function() {
                destroyChartIfExists('current-breakdown-chart');
                return originalMethods.initializeCurrentBreakdownChart.apply(this, arguments);
            };
        }
        
        if (originalMethods.initializeAlternativeBreakdownChart) {
            window.ChartManager.initializeAlternativeBreakdownChart = function() {
                destroyChartIfExists('alternative-breakdown-chart');
                return originalMethods.initializeAlternativeBreakdownChart.apply(this, arguments);
            };
        }
        
        if (originalMethods.initializeCumulativeCostChart) {
            window.ChartManager.initializeCumulativeCostChart = function() {
                destroyChartIfExists('cumulative-cost-chart');
                return originalMethods.initializeCumulativeCostChart.apply(this, arguments);
            };
        }
    }
    
    console.log("Chart Destroyer: Initialized successfully");
})();
