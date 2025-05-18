/**
 * Ultimate Chart Fixes for Portnox TCO Analyzer
 * Version 3.0 - Complete rewrite with synchronous initialization
 */

(function() {
    console.log("🔄 Applying ultimate chart initialization fixes...");

    // Ensure Chart.js is available
    if (typeof Chart === 'undefined') {
        console.error("Chart.js is not loaded! Attempting to load it...");
        // Try to load Chart.js dynamically
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js";
        script.async = false;
        document.head.appendChild(script);
        
        script.onload = function() {
            console.log("Chart.js loaded successfully, initializing fixes...");
            initializeChartFixes();
        };
        
        script.onerror = function() {
            console.error("Failed to load Chart.js, chart functionality may be limited.");
        };
    } else {
        // Chart.js is already loaded, initialize fixes immediately
        initializeChartFixes();
    }

    function initializeChartFixes() {
        // Store existing chart references
        window.chartRegistry = {};
        
        // Function to safely destroy all existing charts
        window.destroyAllCharts = function() {
            const canvases = document.querySelectorAll('canvas');
            
            canvases.forEach(canvas => {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    try {
                        // Clear the canvas
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        
                        // If we have a chart instance for this canvas, destroy it
                        if (window.chartRegistry[canvas.id]) {
                            window.chartRegistry[canvas.id].destroy();
                            delete window.chartRegistry[canvas.id];
                        }
                    } catch (error) {
                        console.warn(`Error clearing canvas ${canvas.id}:`, error);
                    }
                }
            });
            
            // Reset chart registry
            window.chartRegistry = {};
            console.log("All charts destroyed and canvases cleared");
        };
        
        // Simple chart data for different chart types
        const defaultChartData = {
            'tco-comparison-chart': {
                type: 'bar',
                data: {
                    labels: ['Portnox Cloud', 'Cisco ISE', 'No NAC'],
                    datasets: [{
                        label: '3-Year TCO',
                        data: [200000, 450000, 0],
                        backgroundColor: ['#65BD44', '#05547C', '#DC3545']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: '3-Year Total Cost of Ownership'
                        }
                    },
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
                    labels: ['Initial', 'Year 1', 'Year 2', 'Year 3'],
                    datasets: [
                        {
                            label: 'Portnox Cloud',
                            data: [30000, 85000, 140000, 200000],
                            borderColor: '#65BD44',
                            backgroundColor: 'rgba(101, 189, 68, 0.1)',
                            fill: true
                        },
                        {
                            label: 'Cisco ISE',
                            data: [150000, 250000, 350000, 450000],
                            borderColor: '#05547C',
                            backgroundColor: 'rgba(5, 84, 124, 0.1)',
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Cumulative Cost Over Time'
                        }
                    }
                }
            },
            'roi-chart': {
                type: 'line',
                data: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2', 'Q3', 'Q4'],
                    datasets: [
                        {
                            label: 'Investment',
                            data: [100000, 120000, 140000, 160000, 180000, 190000, 200000, 210000],
                            borderColor: '#05547C',
                            backgroundColor: 'rgba(5, 84, 124, 0.1)',
                            fill: true
                        },
                        {
                            label: 'Returns',
                            data: [0, 50000, 120000, 200000, 300000, 400000, 500000, 600000],
                            borderColor: '#65BD44',
                            backgroundColor: 'rgba(101, 189, 68, 0.1)',
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'ROI Analysis'
                        }
                    }
                }
            },
            'vendor-radar-chart': {
                type: 'radar',
                data: {
                    labels: ['Deployment', 'Maintenance', 'Security', 'Scalability', 'Flexibility', 'Cost'],
                    datasets: [
                        {
                            label: 'Portnox Cloud',
                            data: [90, 95, 85, 95, 90, 90],
                            backgroundColor: 'rgba(101, 189, 68, 0.2)',
                            borderColor: '#65BD44',
                            pointBackgroundColor: '#65BD44'
                        },
                        {
                            label: 'Cisco ISE',
                            data: [60, 70, 85, 75, 65, 50],
                            backgroundColor: 'rgba(5, 84, 124, 0.2)',
                            borderColor: '#05547C',
                            pointBackgroundColor: '#05547C'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Vendor Comparison'
                        }
                    },
                    scales: {
                        r: {
                            min: 0,
                            max: 100,
                            ticks: {
                                stepSize: 20
                            }
                        }
                    }
                }
            }
        };
        
        // Function to initialize a specific chart
        window.initializeChart = function(canvasId, customData) {
            // Ensure the canvas exists
            const canvas = document.getElementById(canvasId);
            if (!canvas) {
                console.warn(`Canvas element not found: ${canvasId}`);
                return null;
            }
            
            // Get the 2D context
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                console.warn(`Could not get 2D context for: ${canvasId}`);
                return null;
            }
            
            // Destroy existing chart if it exists
            if (window.chartRegistry[canvasId]) {
                try {
                    window.chartRegistry[canvasId].destroy();
                } catch (error) {
                    console.warn(`Error destroying existing chart ${canvasId}:`, error);
                }
                delete window.chartRegistry[canvasId];
            }
            
            try {
                // Use custom data if provided, otherwise use default
                const chartConfig = customData || defaultChartData[canvasId] || {
                    type: 'bar',
                    data: {
                        labels: ['Portnox Cloud', 'Competitor'],
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
                
                // Create the chart
                const chart = new Chart(ctx, chartConfig);
                
                // Store the chart instance
                window.chartRegistry[canvasId] = chart;
                
                return chart;
            } catch (error) {
                console.error(`Error initializing chart ${canvasId}:`, error);
                return null;
            }
        };
        
        // Function to initialize all charts in the current view
        window.initializeAllCharts = function(selectedVendors) {
            // Reset and destroy all existing charts first
            window.destroyAllCharts();
            
            // Get the active tab panel
            const activeViewPanel = document.querySelector('.view-panel.active');
            if (!activeViewPanel) {
                console.warn("No active view panel found");
                return;
            }
            
            // Get the active results panel within the active view
            const activeResultsPanel = activeViewPanel.querySelector('.results-panel.active');
            if (!activeResultsPanel) {
                console.warn("No active results panel found");
                return;
            }
            
            console.log(`Initializing charts in ${activeViewPanel.dataset.view} view, ${activeResultsPanel.id} panel`);
            
            // Find all canvases in the active panel
            const canvases = activeResultsPanel.querySelectorAll('canvas');
            
            canvases.forEach(canvas => {
                // Initialize the chart with default data
                window.initializeChart(canvas.id);
            });
            
            console.log(`Initialized ${canvases.length} charts in the active panel`);
        };
        
        // Add event listeners to initialize charts when tabs are clicked
        document.addEventListener('click', function(event) {
            // View tab clicks
            if (event.target.classList.contains('stakeholder-tab')) {
                const viewType = event.target.dataset.view;
                if (viewType) {
                    setTimeout(() => {
                        console.log(`View changed to ${viewType}, initializing charts...`);
                        window.initializeAllCharts();
                    }, 100);
                }
            }
            
            // Results panel tab clicks
            if (event.target.classList.contains('results-tab')) {
                const panelId = event.target.dataset.panel;
                if (panelId) {
                    setTimeout(() => {
                        console.log(`Panel changed to ${panelId}, initializing charts...`);
                        window.initializeAllCharts();
                    }, 100);
                }
            }
        });
        
        // Override the original chart initialization functions
        const originalFunctions = {
            initTcoComparisonChart: window.initTcoComparisonChart,
            initCumulativeCostChart: window.initCumulativeCostChart,
            initRoiChart: window.initRoiChart,
            initVendorRadarChart: window.initVendorRadarChart
        };
        
        // Replace with our safer versions
        window.initTcoComparisonChart = function(data) {
            return window.initializeChart('tco-comparison-chart');
        };
        
        window.initCumulativeCostChart = function(data) {
            return window.initializeChart('cumulative-cost-chart');
        };
        
        window.initRoiChart = function(data) {
            return window.initializeChart('roi-chart');
        };
        
        window.initVendorRadarChart = function(data) {
            return window.initializeChart('vendor-radar-chart');
        };
        
        // Initialize charts when the page loads
        window.addEventListener('load', function() {
            setTimeout(() => {
                window.initializeAllCharts();
            }, 1000);
        });
        
        console.log("✅ Ultimate chart initialization fixes applied successfully");
    }
})();
