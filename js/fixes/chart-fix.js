// Chart Initialization Fix
// Fixes the "Canvas already in use" error by properly destroying charts before reinitializing

(function() {
    console.log("🔄 Initializing chart fixes...");
    
    // Object to store all chart instances
    window.chartInstances = window.chartInstances || {};
    
    // Function to safely destroy a chart before reinitialization
    function safelyDestroyChart(chartId) {
        try {
            const canvas = document.getElementById(chartId);
            if (!canvas) {
                console.warn(`Canvas with ID ${chartId} not found`);
                return;
            }
            
            // Check if there's a Chart instance attached to this canvas
            if (canvas.chart instanceof Chart) {
                canvas.chart.destroy();
                console.log(`Chart on canvas ${chartId} destroyed`);
            }
            
            // Also check our tracking object
            if (window.chartInstances[chartId] instanceof Chart) {
                window.chartInstances[chartId].destroy();
                console.log(`Chart instance ${chartId} destroyed from tracking object`);
            }
            
            // Remove any lingering __chartjs__ properties
            delete canvas.__chartjs__;
            
            // Clear any existing content
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            
            // Remove from tracking
            delete window.chartInstances[chartId];
        } catch (error) {
            console.error(`Error destroying chart ${chartId}:`, error);
        }
    }
    
    // Find and destroy all charts
    function destroyAllCharts() {
        // Destroy tracked charts
        Object.keys(window.chartInstances || {}).forEach(chartId => {
            safelyDestroyChart(chartId);
        });
        
        // Find all canvases and destroy any charts attached
        const canvases = document.querySelectorAll('canvas');
        canvases.forEach(canvas => {
            if (canvas.id) {
                safelyDestroyChart(canvas.id);
            }
        });
    }
    
    // Create a non-conflicting chart initialization function
    function createChart(chartId, config) {
        // First safely destroy any existing chart
        safelyDestroyChart(chartId);
        
        // Get canvas
        const canvas = document.getElementById(chartId);
        if (!canvas) {
            console.error(`Canvas with ID ${chartId} not found`);
            return null;
        }
        
        // Create new chart
        try {
            const ctx = canvas.getContext('2d');
            const chart = new Chart(ctx, config);
            
            // Store reference to the chart
            window.chartInstances[chartId] = chart;
            canvas.chart = chart;
            
            console.log(`Chart ${chartId} created successfully`);
            return chart;
        } catch (error) {
            console.error(`Error creating chart ${chartId}:`, error);
            return null;
        }
    }
    
    // Override original chart initialization functions
    window.safelyDestroyChart = safelyDestroyChart;
    window.destroyAllCharts = destroyAllCharts;
    window.createChart = createChart;
    
    // Fix TCO comparison chart
    const originalInitTcoComparisonChart = window.initTcoComparisonChart;
    window.initTcoComparisonChart = function(vendors) {
        const chartId = 'tco-comparison-chart';
        safelyDestroyChart(chartId);
        
        if (!vendors || vendors.length === 0) {
            console.warn("No vendors provided for TCO comparison chart");
            return;
        }
        
        try {
            // Configure chart data
            const chartConfig = {
                type: 'bar',
                data: {
                    labels: vendors.map(v => v.name || "Unknown"),
                    datasets: [{
                        label: '3-Year TCO ($)',
                        data: vendors.map(v => v.threeYearTCO || 0),
                        backgroundColor: vendors.map((v, i) => 
                            (v.name && v.name.includes('Portnox')) ? '#2E5BFF' : 
                            ['#FF6B6B', '#5B8C5A', '#FFAB4C', '#8C5AA7', '#5A8CA7', '#A75A8C'][i % 6]
                        ),
                        borderWidth: 0,
                        borderRadius: 4,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(context.raw);
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                display: true,
                                drawBorder: false,
                            },
                            ticks: {
                                callback: function(value) {
                                    return new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        notation: 'compact',
                                        compactDisplay: 'short',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(value);
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false,
                                drawBorder: false
                            }
                        }
                    }
                }
            };
            
            // Create chart
            createChart(chartId, chartConfig);
            
            console.log(`TCO Comparison Chart initialized with ${vendors.length} vendors`);
        } catch (error) {
            console.error("Error initializing TCO comparison chart:", error);
        }
    };
    
    // Add refresh charts function
    window.refreshAllCharts = function(vendors) {
        console.log("Refreshing all charts with updated data...");
        
        // First destroy all charts to prevent conflicts
        destroyAllCharts();
        
        // Then recreate them one by one
        if (typeof window.initTcoComparisonChart === 'function') {
            window.initTcoComparisonChart(vendors);
        }
        
        // Add other chart initializations here
        if (typeof window.initCumulativeCostChart === 'function') {
            window.initCumulativeCostChart(vendors);
        }
        
        if (typeof window.initRoiChart === 'function') {
            window.initRoiChart(vendors);
        }
        
        if (typeof window.initValueDriversChart === 'function') {
            window.initValueDriversChart(vendors);
        }
        
        console.log("All charts refreshed");
    };
    
    // Override default Chart behavior to prevent conflicts
    const originalAcquireContext = Chart.helpers.acquireContext;
    Chart.helpers.acquireContext = function(canvas) {
        if (canvas.chart) {
            canvas.chart.destroy();
            delete canvas.chart;
        }
        return originalAcquireContext.apply(this, arguments);
    };
    
    console.log("🔄 Chart fixes initialized successfully");
})();
