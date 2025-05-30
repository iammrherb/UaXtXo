/**
 * Chart Manager - Handles chart lifecycle and prevents multiple renders
 */

window.ChartManager = {
    charts: {},
    renderQueue: {},
    isRendering: {},
    
    // Destroy existing chart before creating new one
    destroyChart(containerId) {
        if (this.charts[containerId]) {
            try {
                this.charts[containerId].destroy();
                delete this.charts[containerId];
                console.log(`🗑️ Destroyed chart in ${containerId}`);
            } catch (e) {
                console.warn(`Failed to destroy chart in ${containerId}:`, e);
            }
        }
    },
    
    // Register a chart instance
    registerChart(containerId, chartInstance) {
        this.destroyChart(containerId); // Cleanup any existing chart
        this.charts[containerId] = chartInstance;
        console.log(`📊 Registered chart in ${containerId}`);
    },
    
    // Safe chart render with debouncing
    renderChart(containerId, renderFunction, delay = 100) {
        // Clear any pending render
        if (this.renderQueue[containerId]) {
            clearTimeout(this.renderQueue[containerId]);
        }
        
        // Prevent concurrent renders
        if (this.isRendering[containerId]) {
            console.log(`⏳ Skipping render for ${containerId} - already rendering`);
            return;
        }
        
        // Queue the render
        this.renderQueue[containerId] = setTimeout(() => {
            const container = document.getElementById(containerId);
            if (!container) {
                console.warn(`Container ${containerId} not found`);
                return;
            }
            
            // Mark as rendering
            this.isRendering[containerId] = true;
            
            try {
                // Destroy existing chart first
                this.destroyChart(containerId);
                
                // Create new chart
                const chart = renderFunction(container);
                if (chart) {
                    this.registerChart(containerId, chart);
                }
            } catch (e) {
                console.error(`Error rendering chart ${containerId}:`, e);
            } finally {
                // Clear rendering flag
                this.isRendering[containerId] = false;
                delete this.renderQueue[containerId];
            }
        }, delay);
    },
    
    // Destroy all charts
    destroyAll() {
        Object.keys(this.charts).forEach(id => this.destroyChart(id));
    },
    
    // Check if container has an active chart
    hasChart(containerId) {
        return !!this.charts[containerId];
    }
};

// Make sure ChartManager is available globally
window.ChartManager = window.ChartManager || ChartManager;
console.log('📊 Chart Manager initialized');
