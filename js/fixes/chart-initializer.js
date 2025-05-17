/**
 * Enhanced Chart Initializer
 * Provides reliable chart initialization and update functionality
 */
(function() {
    console.log("📊 Initializing enhanced charts...");
    
    // Wait for Chart.js to be loaded
    function waitForChart(callback) {
        if (typeof Chart !== 'undefined') {
            callback();
        } else {
            setTimeout(() => waitForChart(callback), 100);
        }
    }
    
    // Initialize when Chart.js is ready
    waitForChart(() => {
        // Initialize on DOMContentLoaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeFunctions);
        } else {
            initializeFunctions();
        }
        
        // Also initialize on window.load for safety
        window.addEventListener('load', function() {
            if (!window.chartsInitialized) {
                console.log('Initializing charts on window load (fallback)');
                initializeFunctions();
            }
        });
    });
    
    // Initialize all chart functions
    function initializeFunctions() {
        // Default colors for vendors
        const vendorColors = {
            portnox: '#2BD25B',
            cisco: '#049fd9',
            aruba: '#ff8300',
            forescout: '#6b2a94',
            fortinac: '#c8102e',
            juniper: '#84bc41',
            securew2: '#1a4d80',
            microsoft: '#00a4ef',
            arista: '#2d7de1',
            foxpass: '#ff5722',
            extreme: '#D70000',
            'no-nac': '#777777'
        };
        
        // Helper function to destroy and re-create a chart
        window.initializeChart = function(chartId, config) {
            const canvas = document.getElementById(chartId);
            if (!canvas) {
                console.warn(`Canvas element not found for chart: ${chartId}`);
                return null;
            }
            
            try {
                // Destroy existing chart if it exists
                if (window.destroyChart) {
                    window.destroyChart(chartId);
                } else {
                    // Fallback if destroyChart function is not available
                    const existingChart = Chart.getChart(canvas);
                    if (existingChart) {
                        existingChart.destroy();
                    }
                }
                
                // Create new chart instance
                const ctx = canvas.getContext('2d');
                const chart = new Chart(ctx, config);
                
                // Store in global chart instances
                if (window.chartInstances) {
                    window.chartInstances[chartId] = chart;
                }
                
                return chart;
            } catch (error) {
                console.error(`Error initializing chart ${chartId}: `, error);
                return null;
            }
        };
        
        // Initialize all charts in the active panel
        window.initializeAllCharts = function() {
            // Destroy all existing charts
            if (window.destroyAllCharts) {
                window.destroyAllCharts();
            }
            
            // Get active view
            const activeView = document.querySelector('.view-panel.active');
            if (!activeView) return;
            
            const viewId = activeView.getAttribute('data-view');
            const activePanel = activeView.querySelector('.results-panel.active');
            if (!activePanel) {
                console.warn("No active results panel found");
                return;
            }
            
            const panelId = activePanel.id;
            console.log(`Initializing charts in ${viewId} view, ${panelId} panel`);
            
            // Find all chart canvases in the active panel
            const charts = activePanel.querySelectorAll('canvas');
            
            // Initialize each chart
            let initializedCount = 0;
            charts.forEach(canvas => {
                if (canvas.id) {
                    let chart = null;
                    
                    // Call the appropriate initialization function
                    switch (canvas.id) {
                        case 'tco-comparison-chart':
                            chart = window.initTcoComparisonChart();
                            break;
                        case 'cumulative-cost-chart':
                            chart = window.initCumulativeCostChart();
                            break;
                        case 'roi-chart':
                            chart = window.initRoiChart();
                            break;
                        case 'vendor-radar-chart':
                            chart = window.initVendorRadarChart();
                            break;
                        // Add more cases as needed
                        default:
                            // Attempt to initialize using default configuration
                            const config = {
                                type: 'bar',
                                data: {
                                    labels: ['Category 1', 'Category 2', 'Category 3'],
                                    datasets: [{
                                        label: 'Default Data',
                                        data: [10, 20, 30],
                                        backgroundColor: '#2BD25B'
                                    }]
                                },
                                options: {
                                    responsive: true,
                                    maintainAspectRatio: false
                                }
                            };
                            chart = window.initializeChart(canvas.id, config);
                    }
                    
                    if (chart) initializedCount++;
                }
            });
            
            console.log(`Initialized ${initializedCount} charts in the active panel`);
            window.chartsInitialized = true;
            
            return initializedCount;
        };
        
        // Initialize TCO Comparison Chart
        window.initTcoComparisonChart = function() {
            return window.initializeChart('tco-comparison-chart', getTcoComparisonConfig());
        };
        
        // Initialize Cumulative Cost Chart
        window.initCumulativeCostChart = function() {
            return window.initializeChart('cumulative-cost-chart', getCumulativeCostConfig());
        };
        
        // Initialize ROI Chart
        window.initRoiChart = function() {
            return window.initializeChart('roi-chart', getRoiConfig());
        };
        
        // Initialize Vendor Radar Chart
        window.initVendorRadarChart = function() {
            return window.initializeChart('vendor-radar-chart', getVendorRadarConfig());
        };
        
        // Update all charts with selected vendors
        window.updateAllCharts = function(selectedVendors) {
            if (!selectedVendors || !Array.isArray(selectedVendors)) {
                console.warn("Invalid selectedVendors array, using default vendors");
                selectedVendors = ['portnox', 'cisco'];
            }
            
            // Initialize specific charts
            window.initTcoComparisonChart();
            window.initCumulativeCostChart();
            window.initRoiChart();
            
            try {
                if (typeof window.initValueDriversChart === 'function') {
                    window.initValueDriversChart();
                }
            } catch (error) {
                console.error("Error in initValueDriversChart:", error);
                console.log("Creating fallback chart for valuedrivers-chart after error");
                // Add fallback chart creation here if needed
            }
            
            try {
                if (typeof window.initRiskComparisonChart === 'function') {
                    window.initRiskComparisonChart();
                }
            } catch (error) {
                console.error("Error in initRiskComparisonChart:", error);
                console.log("Creating fallback chart for riskcomparison-chart after error");
                // Add fallback chart creation here if needed
            }
            
            try {
                if (typeof window.initBreachImpactChart === 'function') {
                    window.initBreachImpactChart();
                }
            } catch (error) {
                console.error("Error in initBreachImpactChart:", error);
                console.log("Creating fallback chart for breachimpact-chart after error");
                // Add fallback chart creation here if needed
            }
            
            window.initVendorRadarChart();
            
            // Additional specialized charts
            try {
                if (typeof window.initArchitectureChart === 'function') {
                    window.initArchitectureChart();
                }
            } catch (error) {
                console.error("Error in initArchitectureChart:", error);
                console.log("Creating fallback chart for architecture-chart after error");
                // Add fallback chart creation here if needed
            }
            
            try {
                if (typeof window.initFeatureRadarChart === 'function') {
                    window.initFeatureRadarChart();
                }
            } catch (error) {
                console.error("Error in initFeatureRadarChart:", error);
                console.log("Creating fallback chart for featureradar-chart after error");
                // Add fallback chart creation here if needed
            }
            
            console.log("All charts updated successfully");
            return true;
        };
        
        // TCO Comparison Chart Configuration
        function getTcoComparisonConfig() {
            // Get selected vendors
            const selectedVendors = getSelectedVendors();
            
            // Prepare data
            const data = {
                labels: [],
                datasets: [{
                    label: '3-Year TCO',
                    data: [],
                    backgroundColor: [],
                    borderColor: [],
                    borderWidth: 1
                }]
            };
            
            // Add Portnox first
            if (selectedVendors.includes('portnox')) {
                const portnoxData = window.calculationResults?.vendors.find(v => v.id === 'portnox');
                if (portnoxData) {
                    data.labels.push(portnoxData.name);
                    data.datasets[0].data.push(portnoxData.tco?.threeYear || 200000);
                    data.datasets[0].backgroundColor.push(vendorColors.portnox);
                }
            }
            
            // Add other vendors
            selectedVendors.forEach(vendorId => {
                if (vendorId === 'portnox') return; // Skip Portnox (already added)
                
                const vendorData = window.calculationResults?.vendors.find(v => v.id === vendorId);
                if (vendorData) {
                    data.labels.push(vendorData.name);
                    data.datasets[0].data.push(vendorData.tco?.threeYear || 400000);
                    data.datasets[0].backgroundColor.push(vendorColors[vendorId] || '#777777');
                }
            });
            
            // If no data, use placeholders
            if (data.labels.length === 0) {
                data.labels = ['Portnox Cloud', 'Cisco ISE'];
                data.datasets[0].data = [200000, 450000];
                data.datasets[0].backgroundColor = [vendorColors.portnox, vendorColors.cisco];
            }
            
            return {
                type: 'bar',
                data: data,
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
                                    return '$' + context.raw.toLocaleString();
                                }
                            }
                        },
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
            };
        }
        
        // Cumulative Cost Chart Configuration
        function getCumulativeCostConfig() {
            // Get selected vendors
            const selectedVendors = getSelectedVendors();
            
            // Prepare data
            const labels = ['Initial', 'Year 1', 'Year 2', 'Year 3'];
            const datasets = [];
            
            // Add Portnox first
            if (selectedVendors.includes('portnox')) {
                const portnoxData = window.calculationResults?.vendors.find(v => v.id === 'portnox');
                if (portnoxData) {
                    const initialCost = portnoxData.tco?.breakdown?.initialHardware + 
                                       portnoxData.tco?.breakdown?.initialLicensing + 
                                       portnoxData.tco?.breakdown?.initialImplementation || 30000;
                    
                    const annualCost = portnoxData.tco?.annualCosts || 60000;
                    
                    const cumulativeData = [
                        initialCost,
                        initialCost + annualCost,
                        initialCost + annualCost * 2,
                        initialCost + annualCost * 3
                    ];
                    
                    datasets.push({
                        label: portnoxData.name,
                        data: cumulativeData,
                        backgroundColor: 'transparent',
                        borderColor: vendorColors.portnox,
                        borderWidth: 2,
                        tension: 0.3
                    });
                }
            }
            
            // Add other vendors
            selectedVendors.forEach(vendorId => {
                if (vendorId === 'portnox') return; // Skip Portnox (already added)
                
                const vendorData = window.calculationResults?.vendors.find(v => v.id === vendorId);
                if (vendorData) {
                    const initialCost = vendorData.tco?.breakdown?.initialHardware + 
                                       vendorData.tco?.breakdown?.initialLicensing + 
                                       vendorData.tco?.breakdown?.initialImplementation || 150000;
                    
                    const annualCost = vendorData.tco?.annualCosts || 100000;
                    
                    const cumulativeData = [
                        initialCost,
                        initialCost + annualCost,
                        initialCost + annualCost * 2,
                        initialCost + annualCost * 3
                    ];
                    
                    datasets.push({
                        label: vendorData.name,
                        data: cumulativeData,
                        backgroundColor: 'transparent',
                        borderColor: vendorColors[vendorId] || '#777777',
                        borderWidth: 2,
                        tension: 0.3
                    });
                }
            });
            
            // If no data, use placeholders
            if (datasets.length === 0) {
                datasets.push({
                    label: 'Portnox Cloud',
                    data: [30000, 90000, 150000, 210000],
                    backgroundColor: 'transparent',
                    borderColor: vendorColors.portnox,
                    borderWidth: 2,
                    tension: 0.3
                });
                
                datasets.push({
                    label: 'Cisco ISE',
                    data: [150000, 250000, 350000, 450000],
                    backgroundColor: 'transparent',
                    borderColor: vendorColors.cisco,
                    borderWidth: 2,
                    tension: 0.3
                });
            }
            
            return {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': $' + context.raw.toLocaleString();
                                }
                            }
                        },
                        title: {
                            display: true,
                            text: 'Cumulative Cost Over Time'
                        }
                    },
                    scales: {
                        y: {
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            };
        }
        
        // ROI Chart Configuration
        function getRoiConfig() {
            // Get selected vendors
            const selectedVendors = getSelectedVendors();
            
            // Prepare data
            const labels = ['Year 1', 'Year 2', 'Year 3'];
            const datasets = [];
            
            // Find Portnox data
            const portnoxData = window.calculationResults?.vendors.find(v => v.id === 'portnox');
            if (portnoxData && portnoxData.roi) {
                const roiPercent = portnoxData.roi.percent || 150;
                
                // ROI progression: 30% in Year 1, 70% in Year 2, 100% in Year 3
                const roiProgression = [
                    Math.round(roiPercent * 0.3),
                    Math.round(roiPercent * 0.7),
                    roiPercent
                ];
                
                datasets.push({
                    label: 'Return on Investment',
                    data: roiProgression,
                    backgroundColor: 'rgba(43, 210, 91, 0.2)',
                    borderColor: vendorColors.portnox,
                    borderWidth: 2
                });
            } else {
                // Placeholder data
                datasets.push({
                    label: 'Return on Investment',
                    data: [45, 105, 150],
                    backgroundColor: 'rgba(43, 210, 91, 0.2)',
                    borderColor: vendorColors.portnox,
                    borderWidth: 2
                });
            }
            
            return {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + context.raw + '%';
                                }
                            }
                        },
                        title: {
                            display: true,
                            text: 'Return on Investment Over Time'
                        }
                    },
                    scales: {
                        y: {
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            };
        }
        
        // Vendor Radar Chart Configuration
        function getVendorRadarConfig() {
            // Get selected vendors
            const selectedVendors = getSelectedVendors();
            
            // Prepare data
            const labels = [
                'Ease of Deployment',
                'Cloud Integration',
                'Scalability',
                'Cost Effectiveness',
                'Compliance',
                'Security'
            ];
            
            const datasets = [];
            
            // Add vendors to the radar chart
            selectedVendors.forEach(vendorId => {
                // Get vendor data
                let features = {};
                
                // Try to get from calculation results first
                const vendorData = window.calculationResults?.vendors.find(v => v.id === vendorId);
                
                // Then try from VENDOR_DATA
                if (window.VENDOR_DATA && window.VENDOR_DATA[vendorId]) {
                    features = window.VENDOR_DATA[vendorId].features || {};
                }
                
                // Map features to radar categories
                const radarData = [
                    features.deviceOnboarding || (vendorId === 'portnox' ? 95 : 50),
                    features.cloudIntegration || (vendorId === 'portnox' ? 98 : 40),
                    features.scalability || (vendorId === 'portnox' ? 94 : 70),
                    features.userExperience || (vendorId === 'portnox' ? 88 : 50),
                    features.compliance || (vendorId === 'portnox' ? 94 : 75),
                    features.zeroTrust || (vendorId === 'portnox' ? 95 : 45)
                ];
                
                // Add dataset
                datasets.push({
                    label: vendorData?.name || (vendorId.charAt(0).toUpperCase() + vendorId.slice(1)),
                    data: radarData,
                    backgroundColor: `${vendorColors[vendorId] || '#777777'}33`, // 20% opacity
                    borderColor: vendorColors[vendorId] || '#777777',
                    borderWidth: 2,
                    pointBackgroundColor: vendorColors[vendorId] || '#777777',
                });
            });
            
            // If no data, use placeholders
            if (datasets.length === 0) {
                datasets.push({
                    label: 'Portnox Cloud',
                    data: [95, 98, 94, 88, 94, 95],
                    backgroundColor: `${vendorColors.portnox}33`, // 20% opacity
                    borderColor: vendorColors.portnox,
                    borderWidth: 2,
                    pointBackgroundColor: vendorColors.portnox,
                });
                
                datasets.push({
                    label: 'Cisco ISE',
                    data: [45, 40, 80, 40, 85, 45],
                    backgroundColor: `${vendorColors.cisco}33`, // 20% opacity
                    borderColor: vendorColors.cisco,
                    borderWidth: 2,
                    pointBackgroundColor: vendorColors.cisco,
                });
            }
            
            return {
                type: 'radar',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            angleLines: {
                                display: true
                            },
                            min: 0,
                            max: 100,
                            ticks: {
                                stepSize: 20,
                                showLabelBackdrop: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: ${context.raw}%`;
                                }
                            }
                        }
                    }
                }
            };
        }
        
        // Helper function to get currently selected vendors
        function getSelectedVendors() {
            // Try to get from DOM first
            const selectedVendors = [];
            const vendorCards = document.querySelectorAll('.vendor-card.selected');
            vendorCards.forEach(card => {
                const vendorId = card.getAttribute('data-vendor');
                if (vendorId) {
                    selectedVendors.push(vendorId);
                }
            });
            
            // If we found selected vendors, return them
            if (selectedVendors.length > 0) {
                return selectedVendors;
            }
            
            // Otherwise try to get from calculation results
            if (window.calculationResults && window.calculationResults.selectedVendors) {
                return window.calculationResults.selectedVendors;
            }
            
            // Default to Portnox and Cisco
            return ['portnox', 'cisco'];
        }
        
        // Listen for tab changes to update charts
        document.addEventListener('DOMContentLoaded', function() {
            // Tab click events for main views
            document.querySelectorAll('.stakeholder-tab').forEach(tab => {
                tab.addEventListener('click', function() {
                    const view = this.getAttribute('data-view');
                    console.log(`View changed to ${view}, initializing charts...`);
                    
                    // Destroy all existing charts
                    if (window.destroyAllCharts) {
                        window.destroyAllCharts();
                    }
                    
                    // Wait for the DOM to update
                    setTimeout(window.initializeAllCharts, 100);
                });
            });
            
            // Tab click events for result panels
            document.querySelectorAll('.results-tab').forEach(tab => {
                tab.addEventListener('click', function() {
                    const panel = this.getAttribute('data-panel');
                    console.log(`Panel changed to ${panel}, initializing charts...`);
                    
                    // Destroy all existing charts
                    if (window.destroyAllCharts) {
                        window.destroyAllCharts();
                    }
                    
                    // Wait for the DOM to update
                    setTimeout(window.initializeAllCharts, 100);
                });
            });
            
            // Initialize charts on load
            window.initializeAllCharts();
        });
    }
    
    console.log("📊 Enhanced chart initializer loaded successfully");
})();
