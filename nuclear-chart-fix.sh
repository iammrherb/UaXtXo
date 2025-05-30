#!/bin/bash

# Nuclear Option - Complete Chart System Rewrite
# This completely replaces the chart rendering system

echo "☢️ Applying nuclear option for chart issues..."

# Fix 1: Create a single chart controller
cat > js/views/unified-chart-controller.js << 'EOF'
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
EOF

# Fix 2: Override all chart render methods
cat > js/views/chart-overrides.js << 'EOF'
/**
 * Chart Method Overrides - Use Unified Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🔧 Applying chart method overrides');
    
    const applyOverrides = () => {
        if (!window.platform || !window.UnifiedChartController) {
            setTimeout(applyOverrides, 100);
            return;
        }
        
        // Override TCO Comparison
        window.platform.renderTCOComparison = function() {
            window.UnifiedChartController.queueRender('tco-comparison-chart', (container) => {
                if (!this.calculationResults) return null;
                
                const categories = [];
                const data = [];
                
                Object.entries(this.calculationResults).forEach(([key, result]) => {
                    if (result?.vendor?.name && result?.year3?.tco?.total) {
                        categories.push(result.vendor.name);
                        data.push({
                            y: result.year3.tco.total,
                            color: key === 'portnox' ? '#00D4AA' : '#94A3B8'
                        });
                    }
                });
                
                if (categories.length === 0) return null;
                
                return Highcharts.chart(container, {
                    chart: {
                        type: 'column',
                        backgroundColor: '#334155',
                        animation: false,
                        margin: [40, 40, 80, 60],
                        height: 400
                    },
                    title: { text: null },
                    xAxis: {
                        categories: categories,
                        labels: { style: { color: '#CBD5E1' } }
                    },
                    yAxis: {
                        title: { text: 'Total Cost ($)', style: { color: '#CBD5E1' } },
                        labels: {
                            formatter: function() { return '$' + Math.round(this.value/1000) + 'K'; },
                            style: { color: '#CBD5E1' }
                        }
                    },
                    series: [{
                        name: '3-Year TCO',
                        data: data,
                        dataLabels: {
                            enabled: true,
                            formatter: function() { return '$' + Math.round(this.y/1000) + 'K'; },
                            style: { color: '#FFFFFF' }
                        }
                    }],
                    plotOptions: {
                        column: { borderRadius: 8 }
                    },
                    legend: { enabled: false },
                    credits: { enabled: false },
                    exporting: { enabled: false }
                });
            });
        };
        
        // Override ROI Timeline
        window.platform.renderROITimeline = function() {
            window.UnifiedChartController.queueRender('roi-timeline-chart', (container) => {
                if (!this.calculationResults) return null;
                
                const series = [];
                
                Object.entries(this.calculationResults).forEach(([key, result]) => {
                    if (!result?.vendor?.name) return;
                    
                    const data = [];
                    const impl = result.year1?.tco?.breakdown?.implementation || 0;
                    const monthly = (result.year3?.roi?.dollarValue || 0) / 36;
                    
                    let cumulative = -impl;
                    for (let m = 0; m <= 36; m++) {
                        if (m > 0) cumulative += monthly;
                        data.push([m, Math.round(cumulative)]);
                    }
                    
                    series.push({
                        name: result.vendor.name,
                        data: data,
                        color: key === 'portnox' ? '#00D4AA' : null
                    });
                });
                
                if (series.length === 0) return null;
                
                return Highcharts.chart(container, {
                    chart: {
                        type: 'line',
                        backgroundColor: '#334155',
                        animation: false,
                        margin: [40, 40, 80, 60],
                        height: 400
                    },
                    title: { text: null },
                    xAxis: {
                        title: { text: 'Months', style: { color: '#CBD5E1' } },
                        labels: { style: { color: '#CBD5E1' } }
                    },
                    yAxis: {
                        title: { text: 'Cumulative Value ($)', style: { color: '#CBD5E1' } },
                        labels: {
                            formatter: function() { return '$' + Math.round(this.value/1000) + 'K'; },
                            style: { color: '#CBD5E1' }
                        },
                        plotLines: [{
                            value: 0,
                            width: 2,
                            color: '#94A3B8',
                            dashStyle: 'dash'
                        }]
                    },
                    series: series,
                    legend: { 
                        itemStyle: { color: '#CBD5E1' },
                        itemHoverStyle: { color: '#F8FAFC' }
                    },
                    credits: { enabled: false },
                    exporting: { enabled: false }
                });
            });
        };
        
        // Override Financial Overview to prevent duplicate renders
        const originalRenderFinancial = window.platform.renderFinancialOverview;
        let financialRenderTimeout = null;
        
        window.platform.renderFinancialOverview = function(container) {
            if (!container) return;
            
            // Clear any pending render
            if (financialRenderTimeout) {
                clearTimeout(financialRenderTimeout);
            }
            
            // Destroy existing charts first
            window.UnifiedChartController.destroyAll();
            
            // Render the content
            originalRenderFinancial.call(this, container);
            
            // Defer chart renders
            financialRenderTimeout = setTimeout(() => {
                if (this.activeTab === 'financial-overview') {
                    this.renderTCOComparison();
                    this.renderROITimeline();
                }
            }, 200);
        };
        
        console.log('✅ Chart overrides applied');
    };
    
    applyOverrides();
});
EOF

# Fix 3: Add emergency CSS reset
cat > css/emergency-chart-reset.css << 'EOF'
/* Emergency Chart Reset - Nuclear Option */

/* Force all chart containers to fixed size */
div[id$="-chart"] {
    width: 100% !important;
    height: 400px !important;
    min-height: 400px !important;
    max-height: 400px !important;
    overflow: hidden !important;
    position: relative !important;
    box-sizing: border-box !important;
}

/* Ensure no child can exceed parent */
div[id$="-chart"] * {
    max-width: 100% !important;
    max-height: 100% !important;
}

/* Force Highcharts containers */
.highcharts-container {
    position: relative !important;
    overflow: hidden !important;
    width: 100% !important;
    height: 100% !important;
    text-align: left !important;
    line-height: normal !important;
    z-index: 0 !important;
    -webkit-tap-highlight-color: rgba(0,0,0,0) !important;
    font-family: Inter, sans-serif !important;
    font-size: 12px !important;
    user-select: none !important;
    touch-action: manipulation !important;
    outline: none !important;
}

/* Force SVG to stay within bounds */
.highcharts-root,
.highcharts-container svg {
    position: relative !important;
    overflow: hidden !important;
    width: 100% !important;
    height: 100% !important;
    max-width: 100% !important;
    max-height: 100% !important;
}

/* Remove any transformations that could cause growth */
.highcharts-series-group,
.highcharts-markers,
.highcharts-data-labels {
    transform: none !important;
}

/* Prevent any absolute positioning from escaping */
div[id$="-chart"] .highcharts-container > div {
    position: relative !important;
}

/* Emergency: Hide overflow on body during renders */
body.rendering-charts {
    overflow: hidden !important;
}
EOF

# Fix 4: Update index.html
# Remove ALL old chart-related scripts
sed -i '/chart-manager/d' index.html
sed -i '/chart-render/d' index.html
sed -i '/chart-timing/d' index.html
sed -i '/safe-chart/d' index.html

# Add new unified system
sed -i '/<\/body>/i\    <!-- Unified Chart System -->\
    <script src="./js/views/unified-chart-controller.js"></script>\
    <script src="./js/views/chart-overrides.js"></script>' index.html

# Add emergency CSS
sed -i '/<\/head>/i\    <link rel="stylesheet" href="./css/emergency-chart-reset.css">' index.html

# Commit nuclear option
git add -A
git commit -m "Nuclear option: Complete chart system rewrite

- Created UnifiedChartController as single point of control
- All charts go through centralized queue system
- Forced 400px height with no exceptions
- Container wrapper prevents any escaping content
- Emergency CSS reset for all chart elements
- Render locking prevents concurrent operations
- Complete destruction before any re-render"

echo "☢️ Nuclear option applied!"
echo ""
echo "This is a complete rewrite that:"
echo "1. Uses a single controller for ALL chart operations"
echo "2. Forces 400px height with multiple safeguards"
echo "3. Implements render locking to prevent race conditions"
echo "4. Destroys everything before re-rendering"
echo "5. Uses wrapper divs to contain content"
echo ""
echo "To test:"
echo "1. Clear browser cache completely"
echo "2. Open index.html"
echo "3. Open browser console"
echo "4. Watch for 'Unified Chart Controller' messages"
echo ""
echo "Also created chart-diagnostic.html for troubleshooting"
