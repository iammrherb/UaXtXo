/**
 * Chart Initialization Fixes for Portnox TCO Analyzer
 * This script fixes issues with chart reuse and initialization
 */

(function() {
    console.log("🔄 Applying chart initialization fixes...");

    // Store chart instances to properly destroy them before reuse
    window.chartInstances = window.chartInstances || {};
    
    // Override the initTcoComparisonChart function to properly destroy existing chart
    const originalInitTcoComparisonChart = window.initTcoComparisonChart || function() {};
    
    window.initTcoComparisonChart = function(vendorData) {
        const chartId = 'tco-comparison-chart';
        
        // Destroy existing chart if it exists
        if (window.chartInstances[chartId]) {
            console.log(`Destroying existing chart: ${chartId}`);
            window.chartInstances[chartId].destroy();
            window.chartInstances[chartId] = null;
        }
        
        // Call the original function
        try {
            const chart = originalInitTcoComparisonChart(vendorData);
            // Store the chart instance
            if (chart) {
                window.chartInstances[chartId] = chart;
            }
            return chart;
        } catch (error) {
            console.error(`Error initializing chart ${chartId}:`, error);
            // Try to initialize with default settings
            const ctx = document.getElementById(chartId)?.getContext('2d');
            if (ctx) {
                try {
                    console.log("Attempting to create chart with default settings");
                    const defaultChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: ['Portnox Cloud', 'Competitor'],
                            datasets: [{
                                label: '3-Year TCO',
                                data: [200000, 350000],
                                backgroundColor: ['#65BD44', '#05547C']
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        callback: function(value) {
                                            return '$' + value.toLocaleString();
                                        }
                                    }
                                }
                            }
                        }
                    });
                    window.chartInstances[chartId] = defaultChart;
                    return defaultChart;
                } catch (fallbackError) {
                    console.error("Failed to create fallback chart:", fallbackError);
                }
            }
        }
    };

    // Apply same fix to other charts
    const chartInitializers = [
        'initCumulativeCostChart', 
        'initRoiChart', 
        'initValueDriversChart', 
        'initRiskComparisonChart', 
        'initBreachImpactChart', 
        'initVendorRadarChart'
    ];

    chartInitializers.forEach(initFuncName => {
        const originalFunc = window[initFuncName] || function() {};
        
        window[initFuncName] = function(vendorData) {
            const chartId = initFuncName.replace('init', '').replace('Chart', '').toLowerCase() + '-chart';
            
            // Destroy existing chart if it exists
            if (window.chartInstances[chartId]) {
                console.log(`Destroying existing chart: ${chartId}`);
                window.chartInstances[chartId].destroy();
                window.chartInstances[chartId] = null;
            }
            
            try {
                const chart = originalFunc(vendorData);
                // Store the chart instance
                if (chart) {
                    window.chartInstances[chartId] = chart;
                }
                return chart;
            } catch (error) {
                console.error(`Error initializing chart ${chartId}:`, error);
            }
        };
    });

    // Fix for window.updateAllCharts
    const originalUpdateAllCharts = window.updateAllCharts || function() {};
    
    window.updateAllCharts = function(selectedVendors) {
        // Validate input
        if (!selectedVendors || !Array.isArray(selectedVendors) || selectedVendors.length === 0) {
            console.warn("Invalid selectedVendors provided to updateAllCharts:", selectedVendors);
            // Fall back to default selection
            selectedVendors = ['portnox', 'cisco'];
        }
        
        try {
            originalUpdateAllCharts(selectedVendors);
        } catch (error) {
            console.error("Error in updateAllCharts:", error);
            // Try to update charts directly
            try {
                if (typeof window.initTcoComparisonChart === 'function') {
                    window.initTcoComparisonChart(selectedVendors);
                }
                // Add other chart updates as needed
            } catch (fallbackError) {
                console.error("Error in fallback chart updates:", fallbackError);
            }
        }
    };

    // Ensure we have a window.refreshAllCharts function
    window.refreshAllCharts = window.refreshAllCharts || function() {
        if (window.chartInstances) {
            Object.keys(window.chartInstances).forEach(chartId => {
                if (window.chartInstances[chartId]) {
                    window.chartInstances[chartId].update();
                }
            });
        }
    };

    console.log("✅ Chart initialization fixes applied");
})();
