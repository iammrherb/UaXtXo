// Chart Manager - Handles proper chart lifecycle
window.ChartManager = {
    charts: {},
    
    createChart: function(canvasId, config) {
        // Destroy existing chart if present
        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
            delete this.charts[canvasId];
        }
        
        // Get canvas element
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            console.error(`Canvas with ID ${canvasId} not found`);
            return null;
        }
        
        // Create new chart
        try {
            this.charts[canvasId] = new Chart(canvas, config);
            return this.charts[canvasId];
        } catch (error) {
            console.error(`Error creating chart for ${canvasId}:`, error);
            return null;
        }
    },
    
    destroyChart: function(canvasId) {
        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
            delete this.charts[canvasId];
        }
    },
    
    destroyAllCharts: function() {
        Object.keys(this.charts).forEach(canvasId => {
            this.destroyChart(canvasId);
        });
    }
};
