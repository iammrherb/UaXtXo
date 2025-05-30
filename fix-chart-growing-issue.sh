#!/bin/bash

# Fix for Chart Growing and Multiple Render Issues
# This script aggressively fixes the chart rendering problems

echo "🔨 Applying aggressive fix for chart growing issues..."

# Fix 1: Replace the chart manager with a more robust version
cat > js/views/chart-manager-v2.js << 'EOF'
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
EOF

# Fix 2: Update the render methods to be more defensive
cat > js/views/safe-chart-renders.js << 'EOF'
/**
 * Safe Chart Renders - Defensive rendering with proper cleanup
 */

window.addEventListener('DOMContentLoaded', function() {
    console.log('🛡️ Applying safe chart renders...');
    
    let renderFixApplied = false;
    
    const applySafeRenders = () => {
        if (renderFixApplied || !window.platform || !window.ChartManager) {
            if (!renderFixApplied) {
                setTimeout(applySafeRenders, 100);
            }
            return;
        }
        
        renderFixApplied = true;
        console.log('🔧 Applying safe render overrides...');
        
        // Override Financial Overview renders
        const originalRenderFinancial = window.platform.renderFinancialOverview;
        window.platform.renderFinancialOverview = function(container) {
            if (!container) return;
            
            // Clear any existing content first
            container.innerHTML = '';
            
            // Call original render
            originalRenderFinancial.call(this, container);
            
            // Defer chart renders to ensure DOM is ready
            setTimeout(() => {
                // Only render if we're still on the financial tab
                if (this.activeTab === 'financial-overview') {
                    this.renderTCOComparison();
                    this.renderROITimeline();
                }
            }, 100);
        };
        
        // Safe TCO Comparison render
        window.platform.renderTCOComparison = function() {
            if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
                console.log('No calculation results for TCO chart');
                return;
            }
            
            window.ChartManager.renderChart('tco-comparison-chart', (container) => {
                const categories = [];
                const data = [];
                
                Object.entries(this.calculationResults).forEach(([key, result]) => {
                    if (result && result.vendor && result.year3) {
                        categories.push(result.vendor.name);
                        data.push({
                            y: result.year3.tco.total,
                            color: key === 'portnox' ? '#00D4AA' : '#94A3B8'
                        });
                    }
                });
                
                if (categories.length === 0) {
                    container.innerHTML = '<div class="no-data">No vendor data available</div>';
                    return null;
                }
                
                return Highcharts.chart(container, {
                    chart: {
                        type: 'column',
                        backgroundColor: '#334155',
                        animation: false,
                        reflow: true
                    },
                    title: { text: null },
                    xAxis: {
                        categories: categories,
                        labels: { style: { color: '#CBD5E1' } }
                    },
                    yAxis: {
                        title: { 
                            text: 'Total Cost ($)',
                            style: { color: '#CBD5E1' }
                        },
                        labels: {
                            formatter: function() {
                                return '$' + Math.round(this.value / 1000) + 'K';
                            },
                            style: { color: '#CBD5E1' }
                        }
                    },
                    plotOptions: {
                        column: {
                            borderRadius: 8,
                            dataLabels: {
                                enabled: true,
                                formatter: function() {
                                    return '$' + Math.round(this.y / 1000) + 'K';
                                },
                                style: { color: '#FFFFFF', textOutline: '2px #334155' }
                            }
                        }
                    },
                    series: [{
                        name: '3-Year TCO',
                        data: data
                    }],
                    credits: { enabled: false },
                    exporting: { enabled: false }
                });
            }, { height: '400px' });
        };
        
        // Safe ROI Timeline render
        window.platform.renderROITimeline = function() {
            if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
                console.log('No calculation results for ROI chart');
                return;
            }
            
            window.ChartManager.renderChart('roi-timeline-chart', (container) => {
                const series = [];
                
                Object.entries(this.calculationResults).forEach(([key, result]) => {
                    if (result && result.vendor) {
                        const monthlyData = [];
                        const implementation = result.year1?.tco?.breakdown?.implementation || 0;
                        const monthlyBenefit = (result.year3?.roi?.dollarValue || 0) / 36;
                        
                        let cumulative = -implementation;
                        
                        for (let month = 0; month <= 36; month++) {
                            if (month > 0) cumulative += monthlyBenefit;
                            monthlyData.push([month, Math.round(cumulative)]);
                        }
                        
                        series.push({
                            name: result.vendor.name,
                            data: monthlyData,
                            color: key === 'portnox' ? '#00D4AA' : null
                        });
                    }
                });
                
                return Highcharts.chart(container, {
                    chart: {
                        type: 'line',
                        backgroundColor: '#334155',
                        animation: false,
                        reflow: true
                    },
                    title: { text: null },
                    xAxis: {
                        title: { 
                            text: 'Months',
                            style: { color: '#CBD5E1' }
                        },
                        labels: { style: { color: '#CBD5E1' } }
                    },
                    yAxis: {
                        title: { 
                            text: 'Cumulative Value ($)',
                            style: { color: '#CBD5E1' }
                        },
                        labels: {
                            formatter: function() {
                                return '$' + Math.round(this.value / 1000) + 'K';
                            },
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
                    credits: { enabled: false },
                    exporting: { enabled: false }
                });
            }, { height: '400px' });
        };
        
        // Ensure we clean up charts when switching tabs
        const originalSwitchTab = window.platform.switchTab;
        window.platform.switchTab = function(tabName) {
            // Destroy all charts before switching
            window.ChartManager.destroyAll();
            
            // Call original switch
            originalSwitchTab.call(this, tabName);
        };
    };
    
    applySafeRenders();
});
EOF

# Fix 3: Add stricter CSS constraints
cat > css/chart-constraints.css << 'EOF'
/* Strict Chart Container Constraints */
.chart-container {
    position: relative !important;
    overflow: hidden !important;
    width: 100% !important;
    height: 400px !important;
    max-height: 400px !important;
    min-height: 400px !important;
    box-sizing: border-box !important;
}

/* Prevent any expansion */
.chart-container * {
    max-width: 100% !important;
    max-height: 100% !important;
}

/* Fixed dimensions for specific charts */
#tco-comparison-chart,
#roi-timeline-chart {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    overflow: hidden !important;
}

/* Highcharts specific constraints */
.highcharts-root {
    position: relative !important;
    width: 100% !important;
    height: 100% !important;
    overflow: hidden !important;
}

.highcharts-container {
    position: relative !important;
    overflow: hidden !important;
    width: 100% !important;
    height: 100% !important;
}

/* Prevent SVG from growing */
.highcharts-root svg {
    width: 100% !important;
    height: 100% !important;
    max-width: 100% !important;
    max-height: 100% !important;
    overflow: hidden !important;
}

/* No data message styling */
.no-data {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #94A3B8;
    font-size: 16px;
    text-align: center;
}

/* Loading state */
.chart-container.loading {
    background: #334155;
    display: flex;
    align-items: center;
    justify-content: center;
}

.chart-container.loading::after {
    content: "Loading chart...";
    color: #94A3B8;
    font-size: 14px;
}

/* Prevent layout shifts */
.chart-grid,
.chart-row {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 1fr;
}

.chart-wrapper {
    min-height: 400px;
    max-height: 400px;
    overflow: hidden;
}

.chart-wrapper.large {
    grid-column: span 2;
}
EOF

# Fix 4: Create initialization controller
cat > js/views/init-controller.js << 'EOF'
/**
 * Initialization Controller - Manages startup sequence
 */

window.InitController = {
    initialized: false,
    componentsReady: {
        platform: false,
        vendors: false,
        calculations: false,
        dom: false
    },
    
    checkReady() {
        return Object.values(this.componentsReady).every(v => v);
    },
    
    markReady(component) {
        this.componentsReady[component] = true;
        console.log(`✅ ${component} ready`);
        
        if (this.checkReady() && !this.initialized) {
            this.initialized = true;
            this.onReady();
        }
    },
    
    onReady() {
        console.log('🚀 All components ready, starting application...');
        
        // Ensure we're on financial overview
        if (window.platform && window.platform.activeTab !== 'financial-overview') {
            window.platform.switchTab('financial-overview');
        }
    }
};

// Monitor initialization
document.addEventListener('DOMContentLoaded', () => {
    window.InitController.markReady('dom');
    
    // Monitor platform
    const checkPlatform = setInterval(() => {
        if (window.platform && window.platform.calculationResults) {
            clearInterval(checkPlatform);
            window.InitController.markReady('platform');
        }
    }, 100);
    
    // Monitor calculations
    const checkCalculations = setInterval(() => {
        if (window.platform && window.platform.calculationResults && 
            Object.keys(window.platform.calculationResults).length > 0) {
            clearInterval(checkCalculations);
            window.InitController.markReady('calculations');
        }
    }, 100);
});
EOF

# Fix 5: Update index.html with new files
# Remove old chart manager and render fix
sed -i '/chart-manager.js/d' index.html
sed -i '/chart-render-fix.js/d' index.html

# Add new files in correct order
sed -i '/<\/body>/i\    <!-- Enhanced Chart Management -->\
    <script src="./js/views/init-controller.js"></script>\
    <script src="./js/views/chart-manager-v2.js"></script>\
    <script src="./js/views/safe-chart-renders.js"></script>' index.html

# Add new CSS
sed -i '/<link rel="stylesheet" href="\.\/css\/chart-stability\.css">/a\    <link rel="stylesheet" href="./css/chart-constraints.css">' index.html

# Fix 6: Remove problematic logo reference
find . -name "*.js" -type f -exec sed -i 's/aruba_clearpass-logo\.png/aruba-logo\.png/g' {} \;

# Commit the fixes
git add -A
git commit -m "Aggressive fix for chart growing and rendering issues

- Created ChartManagerV2 with container clearing and retry logic
- Added safe render methods with proper cleanup
- Implemented strict CSS constraints to prevent growth
- Added initialization controller for proper sequencing
- Fixed missing logo reference
- Charts now properly destroyed and recreated
- Container dimensions strictly enforced"

echo "✅ Aggressive chart fix applied!"
echo ""
echo "Key improvements:"
echo "1. ChartManagerV2 - Completely clears containers before rendering"
echo "2. Safe renders - Defensive coding with proper error handling"
echo "3. Strict CSS - Prevents any chart expansion beyond 400px"
echo "4. Init controller - Ensures proper startup sequence"
echo "5. Tab switching - Destroys all charts when changing tabs"
echo ""
echo "Charts should now:"
echo "- Stay within fixed 400px height"
echo "- Not grow or duplicate"
echo "- Render only when containers exist"
echo "- Clean up properly on tab switches"
