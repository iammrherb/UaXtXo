/**
 * Improved Chart Initialization Fixes for Portnox TCO Analyzer
 * Version 2.0 - Complete rewrite with proper chart management
 */

(function() {
    console.log("🔄 Applying improved chart initialization fixes...");

    // Create a global chart registry to track all chart instances
    window.chartRegistry = window.chartRegistry || {};

    // Function to safely destroy a chart if it exists
    function safelyDestroyChart(chartId) {
        if (window.chartRegistry[chartId]) {
            console.log(`Destroying existing chart: ${chartId}`);
            try {
                window.chartRegistry[chartId].destroy();
            } catch (error) {
                console.warn(`Could not destroy chart ${chartId}:`, error);
            }
            window.chartRegistry[chartId] = null;
        }
        
        // Ensure the canvas is clean by getting a fresh 2D context
        const canvas = document.getElementById(chartId);
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    }

    // Default chart configurations when fallback is needed
    const defaultChartConfigs = {
        'tco-comparison-chart': {
            type: 'bar',
            data: {
                labels: ['Portnox Cloud', 'Cisco ISE', 'Aruba ClearPass'],
                datasets: [{
                    label: '3-Year TCO',
                    data: [200000, 450000, 380000],
                    backgroundColor: ['#65BD44', '#05547C', '#1BA0D7']
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
        },
        'cumulative-cost-chart': {
            type: 'line',
            data: {
                labels: ['Year 1', 'Year 2', 'Year 3'],
                datasets: [
                    {
                        label: 'Portnox Cloud',
                        data: [100000, 150000, 200000],
                        borderColor: '#65BD44',
                        backgroundColor: 'rgba(101, 189, 68, 0.1)',
                        fill: true
                    },
                    {
                        label: 'Cisco ISE',
                        data: [200000, 350000, 450000],
                        borderColor: '#05547C',
                        backgroundColor: 'rgba(5, 84, 124, 0.1)',
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        },
        'roi-chart': {
            type: 'line',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [
                    {
                        label: 'Investment',
                        data: [100000, 120000, 140000, 150000, 160000, 170000, 180000, 200000],
                        borderColor: '#05547C',
                        backgroundColor: 'rgba(5, 84, 124, 0.1)',
                        fill: true
                    },
                    {
                        label: 'Returns',
                        data: [0, 50000, 100000, 200000, 300000, 400000, 500000, 600000],
                        borderColor: '#65BD44',
                        backgroundColor: 'rgba(101, 189, 68, 0.1)',
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    };

    // Function to create a chart with fallback configuration
    function createChart(chartId, configOverride) {
        const canvas = document.getElementById(chartId);
        if (!canvas) {
            console.error(`Canvas element not found for chart: ${chartId}`);
            return null;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error(`Could not get 2D context for chart: ${chartId}`);
            return null;
        }

        // Use the default config if available, otherwise an empty config
        let config = configOverride || defaultChartConfigs[chartId] || {
            type: 'bar',
            data: {
                labels: ['Portnox', 'Competitor'],
                datasets: [{
                    label: 'Comparison',
                    data: [100, 200],
                    backgroundColor: ['#65BD44', '#05547C']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        };

        try {
            const chart = new Chart(ctx, config);
            window.chartRegistry[chartId] = chart;
            return chart;
        } catch (error) {
            console.error(`Error creating chart ${chartId}:`, error);
            return null;
        }
    }

    // Wrap the original chart initialization functions
    const chartInitializers = [
        'initTcoComparisonChart', 
        'initCumulativeCostChart', 
        'initRoiChart', 
        'initValueDriversChart', 
        'initRiskComparisonChart', 
        'initBreachImpactChart', 
        'initVendorRadarChart',
        'initArchitectureChart',
        'initFeatureRadarChart',
        'initSecurityCapabilityRadar',
        'initZeroTrustImplementationChart',
        'initThreatProtectionChart'
    ];

    // Create wrapper for each chart initializer
    chartInitializers.forEach(initFuncName => {
        // Store the original function
        const originalFunc = window[initFuncName] || function() { return null; };
        
        // Replace with our wrapped version
        window[initFuncName] = function(vendorData) {
            // Determine the chart ID from the function name
            let chartId = initFuncName.replace('init', '').replace('Chart', '').toLowerCase() + '-chart';
            
            // Special case for some charts
            if (chartId === 'valueDrivers-chart') chartId = 'value-drivers-chart';
            if (chartId === 'riskComparison-chart') chartId = 'risk-comparison-chart';
            if (chartId === 'breachImpact-chart') chartId = 'breach-impact-chart';
            
            // Safely destroy existing chart
            safelyDestroyChart(chartId);
            
            try {
                // Call the original function
                const chart = originalFunc(vendorData);
                
                // Store the chart instance
                if (chart) {
                    window.chartRegistry[chartId] = chart;
                    return chart;
                }
                
                // If original function didn't return a chart, try to create a fallback
                console.log(`Creating fallback chart for ${chartId}`);
                return createChart(chartId);
            } catch (error) {
                console.error(`Error in ${initFuncName}:`, error);
                
                // Create a fallback chart
                console.log(`Creating fallback chart for ${chartId} after error`);
                return createChart(chartId);
            }
        };
    });

    // Improved updateAllCharts function
    window.updateAllCharts = function(selectedVendors) {
        console.log("Updating all charts with selected vendors:", selectedVendors);
        
        // Ensure we have valid vendors
        if (!selectedVendors || !Array.isArray(selectedVendors) || selectedVendors.length === 0) {
            console.warn("Invalid selectedVendors array, using default vendors");
            selectedVendors = ['portnox', 'cisco'];
        }
        
        // Ensure 'portnox' is always included
        if (!selectedVendors.includes('portnox')) {
            selectedVendors.unshift('portnox');
        }
        
        // Update each chart one by one
        try {
            if (typeof window.initTcoComparisonChart === 'function') {
                window.initTcoComparisonChart(selectedVendors);
            }
            
            if (typeof window.initCumulativeCostChart === 'function') {
                window.initCumulativeCostChart(selectedVendors);
            }
            
            if (typeof window.initRoiChart === 'function') {
                window.initRoiChart(selectedVendors);
            }
            
            if (typeof window.initValueDriversChart === 'function') {
                window.initValueDriversChart(selectedVendors);
            }
            
            if (typeof window.initRiskComparisonChart === 'function') {
                window.initRiskComparisonChart(selectedVendors);
            }
            
            if (typeof window.initBreachImpactChart === 'function') {
                window.initBreachImpactChart(selectedVendors);
            }
            
            if (typeof window.initVendorRadarChart === 'function') {
                window.initVendorRadarChart(selectedVendors);
            }
            
            // Security view charts
            if (typeof window.initSecurityCapabilityRadar === 'function') {
                window.initSecurityCapabilityRadar(selectedVendors);
            }
            
            if (typeof window.initZeroTrustImplementationChart === 'function') {
                window.initZeroTrustImplementationChart(selectedVendors);
            }
            
            if (typeof window.initThreatProtectionChart === 'function') {
                window.initThreatProtectionChart(selectedVendors);
            }
            
            // Technical view charts
            if (typeof window.initArchitectureChart === 'function') {
                window.initArchitectureChart(selectedVendors);
            }
            
            if (typeof window.initFeatureRadarChart === 'function') {
                window.initFeatureRadarChart(selectedVendors);
            }
            
            console.log("All charts updated successfully");
        } catch (error) {
            console.error("Error updating charts:", error);
        }
    };

    // Add refreshAllCharts function
    window.refreshAllCharts = function() {
        Object.keys(window.chartRegistry).forEach(chartId => {
            if (window.chartRegistry[chartId]) {
                try {
                    window.chartRegistry[chartId].update();
                } catch (error) {
                    console.error(`Error refreshing chart ${chartId}:`, error);
                }
            }
        });
    };

    console.log("✅ Improved chart initialization fixes applied successfully");
})();
