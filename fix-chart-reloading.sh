#!/bin/bash

# Fix for Chart Reloading and Multiple Render Issues
# This script prevents charts from reloading/expanding unnecessarily

echo "🔧 Fixing chart reloading and multiple render issues..."

# Fix 1: Create a chart manager to handle chart lifecycle
cat > js/views/chart-manager.js << 'EOF'
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
EOF

# Fix 2: Update chart rendering methods to use ChartManager
cat > js/views/chart-render-fix.js << 'EOF'
/**
 * Chart Render Fix - Updates all chart methods to use ChartManager
 */

window.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Applying chart render fixes...');
    
    // Wait for platform to be ready
    const applyFixes = () => {
        if (!window.platform || !window.ChartManager) {
            setTimeout(applyFixes, 100);
            return;
        }
        
        // Override renderTCOComparison
        const originalRenderTCO = window.platform.renderTCOComparison;
        window.platform.renderTCOComparison = function() {
            window.ChartManager.renderChart('tco-comparison-chart', (container) => {
                if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
                    container.innerHTML = '<p style="text-align: center; color: #94A3B8;">No data available</p>';
                    return null;
                }
                
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
                    container.innerHTML = '<p style="text-align: center; color: #94A3B8;">No data available</p>';
                    return null;
                }
                
                return Highcharts.chart(container, {
                    chart: {
                        type: 'column',
                        backgroundColor: '#334155',
                        animation: false // Disable animation to prevent flashing
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
                                return '$' + (this.value / 1000) + 'K';
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
                    tooltip: {
                        backgroundColor: '#1E293B',
                        style: { color: '#F8FAFC' },
                        formatter: function() {
                            return '<b>' + this.x + '</b><br/>TCO: $' + Math.round(this.y / 1000) + 'K';
                        }
                    },
                    legend: { enabled: false },
                    series: [{
                        name: '3-Year TCO',
                        data: data
                    }],
                    credits: { enabled: false }
                });
            });
        };
        
        // Override renderROITimeline
        const originalRenderROI = window.platform.renderROITimeline;
        window.platform.renderROITimeline = function() {
            window.ChartManager.renderChart('roi-timeline-chart', (container) => {
                if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
                    container.innerHTML = '<p style="text-align: center; color: #94A3B8;">No data available</p>';
                    return null;
                }
                
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
                
                if (series.length === 0) {
                    container.innerHTML = '<p style="text-align: center; color: #94A3B8;">No data available</p>';
                    return null;
                }
                
                return Highcharts.chart(container, {
                    chart: {
                        type: 'line',
                        backgroundColor: '#334155',
                        animation: false
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
                    plotOptions: {
                        line: {
                            marker: { enabled: false }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#1E293B',
                        style: { color: '#F8FAFC' },
                        formatter: function() {
                            return '<b>' + this.series.name + '</b><br/>' +
                                   'Month ' + this.x + ': $' + Math.round(this.y / 1000) + 'K';
                        }
                    },
                    legend: {
                        itemStyle: { color: '#CBD5E1' },
                        itemHoverStyle: { color: '#F8FAFC' }
                    },
                    series: series,
                    credits: { enabled: false }
                });
            });
        };
    };
    
    applyFixes();
});
EOF

# Fix 3: Update the premium-executive-platform.js to prevent multiple calculations
cat > js/views/calculation-debounce.js << 'EOF'
/**
 * Calculation Debounce - Prevents multiple calculations
 */

window.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Applying calculation debounce...');
    
    let initComplete = false;
    
    const applyDebounce = () => {
        if (!window.platform) {
            setTimeout(applyDebounce, 100);
            return;
        }
        
        // Override the calculate method
        const originalCalculate = window.platform.calculate;
        let calculationInProgress = false;
        let pendingCalculation = false;
        
        window.platform.calculate = function() {
            // Skip if initialization is not complete
            if (!initComplete && this.selectedVendors.length === 1) {
                console.log('⏳ Skipping calculation - waiting for initialization');
                return;
            }
            
            // Skip if calculation is already in progress
            if (calculationInProgress) {
                console.log('⏳ Calculation already in progress, queuing...');
                pendingCalculation = true;
                return;
            }
            
            calculationInProgress = true;
            console.log('📊 Starting calculation...');
            
            // Call original calculate
            originalCalculate.call(this);
            
            // Reset flag after a delay
            setTimeout(() => {
                calculationInProgress = false;
                
                // Process pending calculation if any
                if (pendingCalculation) {
                    pendingCalculation = false;
                    this.calculate();
                }
            }, 500);
        };
        
        // Mark initialization complete after initial vendors are added
        setTimeout(() => {
            initComplete = true;
            console.log('✅ Initialization complete');
        }, 2000);
    };
    
    applyDebounce();
});
EOF

# Fix 4: Update platform-init.js to be more careful about adding vendors
cat > js/views/platform-init-fixed.js << 'EOF'
// Platform initialization helper - Fixed
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Platform initialization helper loaded');
    
    // Only add sample vendors once, with proper timing
    let vendorsInitialized = false;
    
    const initializeVendors = () => {
        if (vendorsInitialized || !window.platform) {
            return;
        }
        
        // Check if platform is fully initialized
        if (!window.platform.calculationResults || !window.platform.vendorDatabase) {
            setTimeout(initializeVendors, 500);
            return;
        }
        
        vendorsInitialized = true;
        
        // Add sample vendors only if we have just Portnox
        if (window.platform.selectedVendors.length === 1) {
            console.log('📊 Adding sample competitors...');
            
            // Disable auto-calculation temporarily
            const originalCalculate = window.platform.calculate;
            window.platform.calculate = () => {};
            
            // Add vendors
            const competitors = ['cisco', 'aruba'];
            competitors.forEach(vendor => {
                if (window.platform.vendorDatabase[vendor]) {
                    window.platform.selectedVendors.push(vendor);
                }
            });
            
            // Update UI
            window.platform.updateVendorSelection();
            
            // Re-enable and trigger calculation
            setTimeout(() => {
                window.platform.calculate = originalCalculate;
                window.platform.calculate();
            }, 100);
        }
    };
    
    // Start initialization after a delay
    setTimeout(initializeVendors, 1500);
});
EOF

# Fix 5: Update index.html to include new fixes in correct order
# First, remove the old platform-init.js and chart-timing-fix.js
sed -i '/platform-init.js/d' index.html
sed -i '/chart-timing-fix.js/d' index.html

# Then add all fixes in the correct order before the closing body tag
sed -i '/<\/body>/i\    <!-- Chart Management Fixes -->\
    <script src="./js/views/chart-manager.js"></script>\
    <script src="./js/views/chart-render-fix.js"></script>\
    <script src="./js/views/calculation-debounce.js"></script>\
    <script src="./js/views/platform-init-fixed.js"></script>' index.html

# Fix 6: Add CSS to prevent chart container size changes
cat >> css/chart-stability.css << 'EOF'
/* Chart Stability Fixes */
.chart-container {
    position: relative;
    overflow: hidden;
    min-height: 400px;
}

/* Prevent layout shifts during chart rendering */
.chart-container > div {
    position: absolute !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

/* Ensure consistent sizing */
#tco-comparison-chart,
#roi-timeline-chart,
#breach-cost-projection,
#risk-probability-matrix,
#security-maturity-radar,
#zero-trust-gauge,
#attack-surface-chart,
#security-controls-heatmap,
#vulnerability-timeline,
#compliance-matrix-chart,
#operational-timeline-chart {
    width: 100% !important;
    height: 100% !important;
    position: relative !important;
}

/* Prevent Highcharts from expanding beyond container */
.highcharts-container {
    position: relative !important;
    overflow: hidden !important;
    width: 100% !important;
    height: 100% !important;
    text-align: left;
    line-height: normal;
    z-index: 0;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    font-family: Inter, sans-serif;
    font-size: 12px;
    user-select: none;
    touch-action: manipulation;
    outline: none;
}

/* Loading state for charts */
.chart-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #94A3B8;
    font-size: 14px;
}

.chart-loading:before {
    content: "Loading chart...";
}

/* Prevent animation jank */
.highcharts-series-group {
    will-change: transform;
}
EOF

# Add the new CSS file to index.html
sed -i '/<link rel="stylesheet" href="\.\/css\/risk-security-module\.css">/a\    <link rel="stylesheet" href="./css/chart-stability.css">' index.html

# Remove the old files
rm -f js/views/platform-init.js
rm -f js/views/chart-timing-fix.js

# Commit all fixes
git add -A
git commit -m "Fix chart reloading and multiple render issues

- Created ChartManager to handle chart lifecycle properly
- Implemented chart destruction before re-rendering
- Added debouncing for calculations and chart renders
- Fixed platform initialization timing issues
- Prevented multiple vendor additions during init
- Added CSS to stabilize chart containers
- Disabled animations to prevent visual glitches
- Improved overall performance and stability"

echo "✅ Chart reloading issues have been fixed!"
echo ""
echo "Changes made:"
echo "1. Created ChartManager for proper chart lifecycle management"
echo "2. Charts are now destroyed before re-rendering"
echo "3. Added debouncing to prevent multiple calculations"
echo "4. Fixed initialization timing to prevent race conditions"
echo "5. Stabilized chart containers with CSS"
echo "6. Improved overall rendering performance"
echo ""
echo "The application should now:"
echo "- Load charts only once per view"
echo "- Prevent chart expansion/contraction"
echo "- Avoid multiple calculations on startup"
echo "- Provide smooth transitions between tabs"
