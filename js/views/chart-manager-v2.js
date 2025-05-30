/**
 * Chart Manager V2 - Robust chart lifecycle management
 */

window.ChartManagerV2 = {
    charts: {},
    renderAttempts: {},
    maxAttempts: 3,
    
    // Clear a container completely
    clearContainer(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            // Remove all event listeners
            const newContainer = container.cloneNode(false);
            container.parentNode.replaceChild(newContainer, container);
            
            // Ensure container is empty
            newContainer.innerHTML = '';
            
            // Reset size
            newContainer.style.height = '';
            newContainer.style.width = '';
            
            console.log(`🧹 Cleared container: ${containerId}`);
        }
    },
    
    // Destroy chart and clear container
    destroyChart(containerId) {
        // Destroy Highcharts instance
        if (this.charts[containerId]) {
            try {
                if (this.charts[containerId].destroy) {
                    this.charts[containerId].destroy();
                }
                delete this.charts[containerId];
                console.log(`💥 Destroyed chart: ${containerId}`);
            } catch (e) {
                console.warn(`Error destroying chart ${containerId}:`, e);
            }
        }
        
        // Clear the container
        this.clearContainer(containerId);
        
        // Reset attempts
        delete this.renderAttempts[containerId];
    },
    
    // Render chart with retry logic
    renderChart(containerId, renderFunction, options = {}) {
        const attempts = this.renderAttempts[containerId] || 0;
        
        // Check if container exists
        const container = document.getElementById(containerId);
        if (!container) {
            if (attempts < this.maxAttempts) {
                this.renderAttempts[containerId] = attempts + 1;
                console.log(`⏳ Container ${containerId} not found, retry ${attempts + 1}/${this.maxAttempts}`);
                setTimeout(() => {
                    this.renderChart(containerId, renderFunction, options);
                }, 500);
            } else {
                console.error(`❌ Container ${containerId} not found after ${this.maxAttempts} attempts`);
            }
            return;
        }
        
        // Ensure we're on the correct tab/view
        const isVisible = container.offsetParent !== null;
        if (!isVisible && !options.forceRender) {
            console.log(`👁️ Container ${containerId} not visible, skipping render`);
            return;
        }
        
        // Destroy any existing chart
        this.destroyChart(containerId);
        
        // Set fixed dimensions
        container.style.height = options.height || '400px';
        container.style.width = '100%';
        container.style.position = 'relative';
        container.style.overflow = 'hidden';
        
        try {
            // Create the chart
            const chart = renderFunction(container);
            if (chart) {
                this.charts[containerId] = chart;
                console.log(`✅ Rendered chart: ${containerId}`);
                
                // Force a reflow to ensure proper sizing
                setTimeout(() => {
                    if (chart.reflow) {
                        chart.reflow();
                    }
                }, 100);
            }
        } catch (e) {
            console.error(`❌ Error rendering chart ${containerId}:`, e);
        }
        
        // Reset attempts on success
        delete this.renderAttempts[containerId];
    },
    
    // Destroy all charts
    destroyAll() {
        Object.keys(this.charts).forEach(id => this.destroyChart(id));
        this.renderAttempts = {};
    },
    
    // Get chart instance
    getChart(containerId) {
        return this.charts[containerId];
    }
};

// Replace the old ChartManager
window.ChartManager = window.ChartManagerV2;
console.log('📊 Chart Manager V2 initialized');
