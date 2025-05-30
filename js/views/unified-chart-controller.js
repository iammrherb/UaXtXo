/**
 * Unified Chart Controller - Single point of control for all charts
 */

window.UnifiedChartController = {
    isReady: false,
    queue: [],
    activeCharts: new Map(),
    renderLock: false,
    
    // Initialize when everything is ready
    init() {
        if (this.isReady) return;
        
        console.log('🎯 Initializing Unified Chart Controller');
        this.isReady = true;
        
        // Process any queued renders
        this.processQueue();
        
        // Monitor for tab changes
        this.monitorTabChanges();
    },
    
    // Queue a chart render
    queueRender(chartId, renderFn, options = {}) {
        if (!this.isReady) {
            this.queue.push({ chartId, renderFn, options });
            return;
        }
        
        this.renderChart(chartId, renderFn, options);
    },
    
    // Process queued renders
    processQueue() {
        while (this.queue.length > 0) {
            const { chartId, renderFn, options } = this.queue.shift();
            this.renderChart(chartId, renderFn, options);
        }
    },
    
    // Render a single chart with all safety checks
    renderChart(chartId, renderFn, options = {}) {
        if (this.renderLock) {
            console.log(`🔒 Render locked, queueing ${chartId}`);
            setTimeout(() => this.renderChart(chartId, renderFn, options), 100);
            return;
        }
        
        this.renderLock = true;
        
        try {
            // Get container
            const container = document.getElementById(chartId);
            if (!container) {
                console.log(`📦 Container ${chartId} not found`);
                this.renderLock = false;
                return;
            }
            
            // Check visibility
            if (container.offsetParent === null && !options.forceRender) {
                console.log(`👁️ Container ${chartId} not visible`);
                this.renderLock = false;
                return;
            }
            
            // Destroy existing chart
            this.destroyChart(chartId);
            
            // Prepare container
            container.style.cssText = `
                position: relative !important;
                width: 100% !important;
                height: 400px !important;
                min-height: 400px !important;
                max-height: 400px !important;
                overflow: hidden !important;
            `;
            container.innerHTML = '';
            
            // Create wrapper div
            const wrapper = document.createElement('div');
            wrapper.style.cssText = `
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                width: 100% !important;
                height: 100% !important;
                overflow: hidden !important;
            `;
            container.appendChild(wrapper);
            
            // Render chart
            console.log(`📊 Rendering ${chartId}`);
            const chart = renderFn(wrapper);
            
            if (chart) {
                this.activeCharts.set(chartId, { chart, container, wrapper });
                
                // Force immediate reflow
                requestAnimationFrame(() => {
                    if (chart.reflow) chart.reflow();
                });
            }
            
        } catch (error) {
            console.error(`❌ Error rendering ${chartId}:`, error);
        } finally {
            this.renderLock = false;
        }
    },
    
    // Destroy a chart completely
    destroyChart(chartId) {
        const chartInfo = this.activeCharts.get(chartId);
        if (!chartInfo) return;
        
        try {
            // Destroy Highcharts instance
            if (chartInfo.chart && chartInfo.chart.destroy) {
                chartInfo.chart.destroy();
            }
            
            // Clear container
            if (chartInfo.container) {
                chartInfo.container.innerHTML = '';
                chartInfo.container.style.cssText = '';
            }
            
            this.activeCharts.delete(chartId);
            console.log(`💥 Destroyed ${chartId}`);
            
        } catch (error) {
            console.error(`Error destroying ${chartId}:`, error);
        }
    },
    
    // Destroy all charts
    destroyAll() {
        console.log('💥 Destroying all charts');
        for (const chartId of this.activeCharts.keys()) {
            this.destroyChart(chartId);
        }
    },
    
    // Monitor tab changes
    monitorTabChanges() {
        if (!window.platform) return;
        
        const originalSwitchTab = window.platform.switchTab;
        window.platform.switchTab = (tabName) => {
            console.log(`📑 Switching to tab: ${tabName}`);
            this.destroyAll();
            originalSwitchTab.call(window.platform, tabName);
        };
    }
};

// Auto-initialize when ready
document.addEventListener('DOMContentLoaded', () => {
    const checkReady = setInterval(() => {
        if (window.platform && window.Highcharts) {
            clearInterval(checkReady);
            window.UnifiedChartController.init();
        }
    }, 100);
});

// Replace ChartManager
window.ChartManager = window.UnifiedChartController;
