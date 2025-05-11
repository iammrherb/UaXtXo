/**
 * Chart Manager - Properly handles chart lifecycle
 */

class ChartManager {
    constructor() {
        this.charts = {};
    }
    
    createOrUpdateChart(canvasId, config) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return null;
        
        // Destroy existing chart
        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
            delete this.charts[canvasId];
        }
        
        // Create new chart
        this.charts[canvasId] = new Chart(canvas, config);
        return this.charts[canvasId];
    }
    
    destroyChart(canvasId) {
        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
            delete this.charts[canvasId];
        }
    }
    
    destroyAllCharts() {
        Object.keys(this.charts).forEach(id => {
            this.destroyChart(id);
        });
    }
}

// Global chart manager instance
window.chartManager = new ChartManager();
