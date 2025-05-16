// Chart Initialization Fix
// Fixes the "Canvas already in use" error by properly destroying charts before reinitializing

(function() {
    console.log("🔄 Initializing chart fixes...");
    
    // Object to store all chart instances
    window.chartInstances = {};
    
    // Function to safely destroy a chart before reinitialization
    function safelyDestroyChart(chartId) {
        if (window.chartInstances[chartId] && window.chartInstances[chartId] instanceof Chart) {
            window.chartInstances[chartId].destroy();
            console.log(`Chart ${chartId} safely destroyed before reinitialization`);
        }
    }
    
    // Override the original chart initialization functions
    const originalInitTcoComparisonChart = window.initTcoComparisonChart || function() {};
    window.initTcoComparisonChart = function(vendors, data) {
        const chartId = 'tco-comparison-chart';
        safelyDestroyChart(chartId);
        
        const ctx = document.getElementById(chartId).getContext('2d');
        window.chartInstances[chartId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: vendors.map(v => v.name),
                datasets: [{
                    label: '3-Year TCO ($)',
                    data: vendors.map(v => v.threeYearTCO),
                    backgroundColor: vendors.map((v, i) => 
                        v.name.includes('Portnox') ? '#2E5BFF' : 
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
                    },
                    datalabels: {
                        color: '#fff',
                        font: {
                            weight: 'bold'
                        },
                        formatter: function(value) {
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
        });
        
        console.log(`TCO Comparison Chart initialized with ${vendors.length} vendors`);
    };
    
    // Fix other chart initializations similarly
    const chartFunctions = [
        'initCumulativeCostChart', 
        'initRoiChart', 
        'initValueDriversChart',
        'initRiskComparisonChart',
        'initBreachImpactChart', 
        'initInsuranceImpactChart',
        'initVendorRadarChart',
        'initCostStructureChart',
        'initCostProjectionChart',
        'initNistFrameworkChart',
        'initArchitectureChart',
        'initFeatureRadarChart'
    ];
    
    chartFunctions.forEach(functionName => {
        const original = window[functionName] || function() {};
        window[functionName] = function(vendors, data) {
            // Extract chart ID from function name
            const chartId = functionName
                .replace('init', '')
                .replace(/([A-Z])/g, '-$1')
                .toLowerCase()
                .substring(1) + '-chart';
            
            safelyDestroyChart(chartId);
            original(vendors, data);
            
            // If the original function didn't implement chart instance tracking, add it here
            const canvas = document.getElementById(chartId);
            if (canvas && canvas.chart && !window.chartInstances[chartId]) {
                window.chartInstances[chartId] = canvas.chart;
            }
        };
    });
    
    // Add refresh charts function
    window.refreshAllCharts = function(vendors, data) {
        console.log("Refreshing all charts with updated data...");
        chartFunctions.forEach(functionName => {
            if (typeof window[functionName] === 'function') {
                window[functionName](vendors, data);
            }
        });
    };
    
    console.log("🔄 Chart fixes initialized successfully");
})();
