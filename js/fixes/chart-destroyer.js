/**
 * Chart Destroyer - Fixes canvas reuse issues
 * This script ensures all charts are properly destroyed before recreating them
 */
(function() {
    console.log("Chart Destroyer: Initializing...");
    
    // Store chart instances globally
    window.chartInstances = window.chartInstances || {};
    
    // Function to destroy chart if it exists
    window.destroyChart = function(canvasId) {
        try {
            // Use Chart.js getChart method if available (newer versions)
            const chart = Chart.getChart(canvasId);
            if (chart) {
                console.log(`Destroying chart on canvas: ${canvasId} (using Chart.getChart)`);
                chart.destroy();
                return true;
            }
            
            // Fall back to our stored instances
            if (window.chartInstances[canvasId]) {
                console.log(`Destroying chart on canvas: ${canvasId} (using stored instance)`);
                window.chartInstances[canvasId].destroy();
                delete window.chartInstances[canvasId];
                return true;
            }
            
            return false;
        } catch (error) {
            console.warn(`Error destroying chart ${canvasId}:`, error);
            // Clean up reference even if destruction fails
            delete window.chartInstances[canvasId];
            return false;
        }
    };
    
    // Function to create and track a new chart
    window.createChart = function(canvasId, config) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            console.warn(`Canvas element not found for chart: ${canvasId}`);
            return null;
        }
        
        // Ensure any existing chart is destroyed
        window.destroyChart(canvasId);
        
        try {
            // Clear the canvas to be extra safe
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Create new chart instance
            const chart = new Chart(ctx, config);
            
            // Store reference
            window.chartInstances[canvasId] = chart;
            
            return chart;
        } catch (error) {
            console.error(`Error creating chart ${canvasId}:`, error);
            return null;
        }
    };
    
    // Function to destroy all charts
    window.destroyAllCharts = function() {
        try {
            // Try to get all charts using Chart.getChart() if available
            if (typeof Chart.getChart === 'function') {
                const canvasElements = document.querySelectorAll('canvas');
                canvasElements.forEach(canvas => {
                    if (canvas.id) {
                        window.destroyChart(canvas.id);
                    }
                });
            }
            
            // Also clean up our stored references
            Object.keys(window.chartInstances).forEach(canvasId => {
                window.destroyChart(canvasId);
            });
            
            console.log("All charts destroyed and canvases cleared");
        } catch (error) {
            console.error("Error destroying all charts:", error);
        }
    };
    
    // Override Chart.js's new keyword to ensure proper cleanup
    const originalChart = Chart;
    
    // Wait for DOM to be fully loaded to apply further fixes
    document.addEventListener('DOMContentLoaded', function() {
        // Add event listeners to tabs to clear charts when switching views
        document.querySelectorAll('.stakeholder-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const viewId = this.getAttribute('data-view');
                console.log(`View changed to ${viewId}, destroying all charts...`);
                window.destroyAllCharts();
            });
        });
        
        // Add event listeners to results tabs
        document.querySelectorAll('.results-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const panelId = this.getAttribute('data-panel');
                console.log(`Panel changed to ${panelId}, destroying all charts...`);
                window.destroyAllCharts();
            });
        });
    });
    
    console.log("Chart Destroyer: Initialized successfully");
})();
