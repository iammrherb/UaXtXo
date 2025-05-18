/**
 * Chart Fix Module
 * Properly manages chart lifecycle to prevent "Canvas already in use" errors
 */
(function() {
    console.log("🔄 Initializing enhanced chart management...");
    
    // Store chart instances for proper management
    window.chartInstances = {};
    
    // Destroy all charts safely
    window.destroyAllCharts = function() {
        console.log("Destroying all charts safely...");
        
        // Get all chart canvases
        const canvases = document.querySelectorAll('canvas');
        
        canvases.forEach(canvas => {
            destroyChartOnCanvas(canvas.id);
        });
        
        // Clear the chart instances storage
        window.chartInstances = {};
        console.log("All charts destroyed successfully");
    };
    
    // Destroy chart on a specific canvas
    window.destroyChartOnCanvas = function(canvasId) {
        if (!canvasId) return;
        
        // Try different methods to destroy charts
        try {
            // Method 1: Using our stored instances
            if (window.chartInstances[canvasId]) {
                window.chartInstances[canvasId].destroy();
                delete window.chartInstances[canvasId];
                console.log(`Chart destroyed (stored instance): ${canvasId}`);
                return;
            }
            
            // Method 2: Using Chart.js getChart method
            const chartInstance = Chart.getChart(canvasId);
            if (chartInstance) {
                chartInstance.destroy();
                console.log(`Chart destroyed (Chart.getChart): ${canvasId}`);
                return;
            }
            
            // Method 3: Using legacy chartjs method
            if (window[canvasId + "Chart"]) {
                window[canvasId + "Chart"].destroy();
                window[canvasId + "Chart"] = null;
                console.log(`Chart destroyed (window variable): ${canvasId}`);
                return;
            }
            
        } catch (error) {
            console.warn(`Error destroying chart ${canvasId}:`, error);
        }
    };
    
    // Create or update chart safely
    window.createChart = function(canvasId, config) {
        // First ensure any existing chart is destroyed
        destroyChartOnCanvas(canvasId);
        
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            console.warn(`Canvas element not found for chart: ${canvasId}`);
            return null;
        }
        
        try {
            // Create new chart
            const ctx = canvas.getContext('2d');
            const chart = new Chart(ctx, config);
            
            // Store the chart instance
            window.chartInstances[canvasId] = chart;
            
            console.log(`Chart created: ${canvasId}`);
            return chart;
        } catch (error) {
            console.error(`Error creating chart ${canvasId}:`, error);
            return null;
        }
    };
    
    // Initialize vendor comparison charts
    window.initVendorComparisonCharts = function(selectedVendors) {
        console.log(`Initializing vendor comparison charts for vendors: ${selectedVendors.join(', ')}`);
        
        // Destroy all charts first to prevent duplicates
        destroyAllCharts();
        
        // Get the active view and panel
        const activeView = document.querySelector('.view-panel.active');
        const activePanel = activeView ? activeView.querySelector('.results-panel.active') : null;
        
        if (!activeView || !activePanel) {
            console.warn("No active view or panel found");
            return;
        }
        
        console.log(`Active view: ${activeView.dataset.view}, Active panel: ${activePanel.id}`);
        
        // Initialize charts based on the active panel
        const canvases = activePanel.querySelectorAll('canvas');
        
        if (canvases.length === 0) {
            console.log("No chart canvases found in the active panel");
            return;
        }
        
        // Initialize each chart in the active panel
        let initializedCount = 0;
        
        canvases.forEach(canvas => {
            if (!canvas.id) return;
            
            // Call the appropriate chart initialization function based on canvas ID
            const chartId = canvas.id;
            let chartCreated = false;
            
            // Executive Summary charts
            if (chartId === 'tco-comparison-chart') {
                chartCreated = initTcoComparisonChart(chartId, selectedVendors);
            } 
            else if (chartId === 'cumulative-cost-chart') {
                chartCreated = initCumulativeCostChart(chartId, selectedVendors);
            }
            else if (chartId === 'roi-chart') {
                chartCreated = initRoiChart(chartId, selectedVendors);
            }
            else if (chartId === 'value-drivers-chart') {
                chartCreated = initValueDriversChart(chartId, selectedVendors);
            }
            else if (chartId === 'vendor-radar-chart') {
                chartCreated = initVendorRadarChart(chartId, selectedVendors);
            }
            // Technical charts
            else if (chartId === 'architecture-chart') {
                chartCreated = initArchitectureChart(chartId, selectedVendors);
            }
            else if (chartId === 'feature-radar-chart') {
                chartCreated = initFeatureRadarChart(chartId, selectedVendors);
            }
            // Security charts
            else if (chartId === 'security-capability-radar') {
                chartCreated = initSecurityCapabilityRadar(chartId, selectedVendors);
            }
            
            if (chartCreated) {
                initializedCount++;
            }
        });
        
        console.log(`Initialized ${initializedCount} charts in the active panel`);
        
        // Update dashboard metrics
        updateDashboardMetrics(selectedVendors);
        
        return initializedCount;
    };
    
    // Update all metrics that display in the dashboard cards
    function updateDashboardMetrics(selectedVendors) {
        console.log("Updating dashboard metrics...");
        
        // Get vendor data
        const portnoxData = getVendorData('portnox');
        
        // Find the main competitor (first non-Portnox vendor)
        let competitorId = null;
        let competitorData = null;
        
        for (const vendorId of selectedVendors) {
            if (vendorId !== 'portnox') {
                competitorId = vendorId;
                competitorData = getVendorData(vendorId);
                break;
            }
        }
        
        if (!portnoxData) {
            console.warn("Portnox data not found!");
            return;
        }
        
        // Calculate TCO values
        const portnoxTco = calculateTco(portnoxData);
        let competitorTco = competitorData ? calculateTco(competitorData) : 0;
        const savings = competitorTco - portnoxTco;
        const savingsPercentage = competitorTco > 0 ? Math.round((savings / competitorTco) * 100) : 0;
        
        // Update executive summary metrics
        const elements = {
            // Total savings
            'total-savings': savings > 0 ? formatCurrency(savings) : "N/A",
            'savings-percentage': competitorId ? `${savingsPercentage}% reduction vs. ${getVendorName(competitorId)}` : "N/A",
            
            // Payback period
            'payback-period': portnoxData.paybackMonths ? `${portnoxData.paybackMonths} months` : "7 months",
            
            // Risk reduction  
            'risk-reduction-total': `${portnoxData.features?.riskReduction || 58}%`,
            
            // Implementation time
            'implementation-time': `${portnoxData.implementationDays || 21} days`,
            'implementation-comparison': `${portnoxData.implementationSavingsPercent || 75}% faster than on-premises`,
            
            // TCO values
            'portnox-tco': formatCurrency(portnoxTco),
            'tco-comparison': competitorId ? `vs. ${formatCurrency(competitorTco)} (${getVendorName(competitorId)})` : "N/A",
            
            // Other financial metrics
            'annual-subscription': formatCurrency(portnoxData.annualCosts?.licensing || 45000),
            'implementation-cost': formatCurrency(portnoxData.initialCosts?.implementation || 15000),
            'operational-cost': formatCurrency(portnoxData.annualCosts?.personnel || 40000),
            
            // ROI metrics
            'three-year-roi': `${portnoxData.roi || 287}%`,
            'annual-savings': formatCurrency(savings / 3),
            'productivity-value': formatCurrency(portnoxData.productivityGains || 130000),
        };
        
        // Update all elements
        for (const [id, value] of Object.entries(elements)) {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        }
        
        console.log("Dashboard metrics updated successfully");
    }
    
    // Helper function to get vendor data
    function getVendorData(vendorId) {
        if (!vendorId) return null;
        
        // Try different possible sources of vendor data
        if (window.vendorData && window.vendorData[vendorId]) {
            return window.vendorData[vendorId];
        }
        
        if (window.vendorDetails && window.vendorDetails[vendorId]) {
            return window.vendorDetails[vendorId];
        }
        
        return null;
    }
    
    // Helper function to get vendor name
    function getVendorName(vendorId) {
        const data = getVendorData(vendorId);
        return data ? data.name : vendorId;
    }
    
    // Helper function to calculate TCO
    function calculateTco(vendorData) {
        if (!vendorData) return 0;
        
        let initialCosts = 0;
        let annualCosts = 0;
        
        // Calculate initial costs
        if (vendorData.initialCosts) {
            initialCosts += (vendorData.initialCosts.hardware || 0);
            initialCosts += (vendorData.initialCosts.software || 0);
            initialCosts += (vendorData.initialCosts.implementation || 0);
        } else {
            // Backward compatibility
            initialCosts += (vendorData.initialHardware || 0);
            initialCosts += (vendorData.initialSoftware || 0);
            initialCosts += (vendorData.initialImplementation || 0);
        }
        
        // Calculate annual costs for 3 years
        if (vendorData.annualCosts) {
            annualCosts += (vendorData.annualCosts.licensing || 0) * 3;
            annualCosts += (vendorData.annualCosts.maintenance || 0) * 3;
            annualCosts += (vendorData.annualCosts.support || 0) * 3;
            annualCosts += (vendorData.annualCosts.personnel || 0) * 3;
        } else {
            // Backward compatibility
            annualCosts += (vendorData.annualLicensing || 0) * 3;
            annualCosts += (vendorData.annualMaintenance || 0) * 3;
            annualCosts += (vendorData.annualSupport || 0) * 3;
            annualCosts += (vendorData.annualPersonnel || 0) * 3;
        }
        
        return initialCosts + annualCosts;
    }
    
    // Helper function to format currency
    function formatCurrency(value) {
        return '$' + Math.round(value).toLocaleString();
    }
    
    // TCO Comparison Chart
    function initTcoComparisonChart(canvasId, selectedVendors) {
        const labels = [];
        const datasets = [];
        const colors = ['#65BD44', '#05547C', '#FF9800', '#9C27B0', '#607D8B'];
        
        // Prepare data for each vendor
        selectedVendors.forEach((vendorId, index) => {
            const vendorData = getVendorData(vendorId);
            if (!vendorData) return;
            
            labels.push(vendorData.name);
            
            // Calculate costs
            let initialHardware = 0;
            let initialSoftware = 0;
            let implementation = 0;
            let licensing = 0;
            let maintenance = 0;
            let personnel = 0;
            
            if (vendorData.initialCosts) {
                initialHardware = vendorData.initialCosts.hardware || 0;
                initialSoftware = vendorData.initialCosts.software || 0;
                implementation = vendorData.initialCosts.implementation || 0;
            } else {
                initialHardware = vendorData.initialHardware || 0;
                initialSoftware = vendorData.initialSoftware || 0;
                implementation = vendorData.initialImplementation || 0;
            }
            
            if (vendorData.annualCosts) {
                licensing = (vendorData.annualCosts.licensing || 0) * 3;
                maintenance = (vendorData.annualCosts.maintenance || 0) * 3;
                personnel = (vendorData.annualCosts.personnel || 0) * 3;
            } else {
                licensing = (vendorData.annualLicensing || 0) * 3;
                maintenance = (vendorData.annualMaintenance || 0) * 3;
                personnel = (vendorData.annualPersonnel || 0) * 3;
            }
            
            // Add datasets for stacked bar chart
            datasets.push({
                label: 'Hardware',
                backgroundColor: '#FF6384',
                data: Array(selectedVendors.length).fill(0),
                stack: 'Stack ' + index
            });
            datasets[datasets.length - 1].data[index] = initialHardware;
            
            datasets.push({
                label: 'Software/Licensing',
                backgroundColor: '#36A2EB',
                data: Array(selectedVendors.length).fill(0),
                stack: 'Stack ' + index
            });
            datasets[datasets.length - 1].data[index] = initialSoftware + licensing;
            
            datasets.push({
                label: 'Implementation',
                backgroundColor: '#FFCE56',
                data: Array(selectedVendors.length).fill(0),
                stack: 'Stack ' + index
            });
            datasets[datasets.length - 1].data[index] = implementation;
            
            datasets.push({
                label: 'Maintenance',
                backgroundColor: '#4BC0C0',
                data: Array(selectedVendors.length).fill(0),
                stack: 'Stack ' + index
            });
            datasets[datasets.length - 1].data[index] = maintenance;
            
            datasets.push({
                label: 'Personnel',
                backgroundColor: '#9966FF',
                data: Array(selectedVendors.length).fill(0),
                stack: 'Stack ' + index
            });
            datasets[datasets.length - 1].data[index] = personnel;
        });
        
        // Create chart configuration
        const config = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: '3-Year TCO ($)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': $' + context.raw.toLocaleString();
                            }
                        }
                    },
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: '3-Year Total Cost of Ownership Comparison'
                    }
                }
            }
        };
        
        return createChart(canvasId, config);
    }
    
    // Cumulative Cost Chart
    function initCumulativeCostChart(canvasId, selectedVendors) {
        const datasets = [];
        const colors = ['#65BD44', '#05547C', '#FF9800', '#9C27B0', '#607D8B'];
        
        // Labels for quarters over 3 years
        const labels = ['Initial', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12'];
        
        // Prepare data for each vendor
        selectedVendors.forEach((vendorId, index) => {
            const vendorData = getVendorData(vendorId);
            if (!vendorData) return;
            
            // Calculate initial costs
            let initialCosts = 0;
            let quarterlyLicensing = 0;
            let quarterlyMaintenance = 0;
            let quarterlyPersonnel = 0;
            
            if (vendorData.initialCosts) {
                initialCosts += (vendorData.initialCosts.hardware || 0);
                initialCosts += (vendorData.initialCosts.software || 0);
                initialCosts += (vendorData.initialCosts.implementation || 0);
            } else {
                initialCosts += (vendorData.initialHardware || 0);
                initialCosts += (vendorData.initialSoftware || 0);
                initialCosts += (vendorData.initialImplementation || 0);
            }
            
            if (vendorData.annualCosts) {
                quarterlyLicensing = (vendorData.annualCosts.licensing || 0) / 4;
                quarterlyMaintenance = (vendorData.annualCosts.maintenance || 0) / 4;
                quarterlyPersonnel = (vendorData.annualCosts.personnel || 0) / 4;
            } else {
                quarterlyLicensing = (vendorData.annualLicensing || 0) / 4;
                quarterlyMaintenance = (vendorData.annualMaintenance || 0) / 4;
                quarterlyPersonnel = (vendorData.annualPersonnel || 0) / 4;
            }
            
            const quarterlyCost = quarterlyLicensing + quarterlyMaintenance + quarterlyPersonnel;
            
            // Calculate cumulative costs for each quarter
            const cumulativeCosts = [initialCosts];
            
            for (let i = 1; i < labels.length; i++) {
                cumulativeCosts.push(cumulativeCosts[i-1] + quarterlyCost);
                
                // Add hardware refresh in Q9 (year 3) for on-premises vendors
                if (i === 9 && initialCosts > 20000) {
                    cumulativeCosts[i] += initialCosts * 0.5; // 50% of initial hardware cost
                }
            }
            
            // Create dataset
            datasets.push({
                label: vendorData.name,
                data: cumulativeCosts,
                borderColor: colors[index % colors.length],
                backgroundColor: 'rgba(' + hexToRgb(colors[index % colors.length]) + ', 0.1)',
                fill: true,
                tension: 0.4
            });
        });
        
        // Create chart configuration
        const config = {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Cumulative Cost ($)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': $' + context.raw.toLocaleString();
                            }
                        }
                    },
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Cumulative Cost Over 3 Years'
                    }
                }
            }
        };
        
        return createChart(canvasId, config);
    }
    
    // ROI Chart
    function initRoiChart(canvasId, selectedVendors) {
        // Find Portnox in the selected vendors
        if (!selectedVendors.includes('portnox')) {
            console.warn("Portnox not in selected vendors, cannot create ROI chart");
            return false;
        }
        
        const portnoxData = getVendorData('portnox');
        if (!portnoxData) {
            console.warn("Portnox data not found, cannot create ROI chart");
            return false;
        }
        
        // Calculate ROI over time
        const labels = ['Initial', 'Month 3', 'Month 6', 'Month 9', 'Month 12', 'Month 18', 'Month 24', 'Month 30', 'Month 36'];
        
        // Cost data (negative values for investment)
        const initialInvestment = -1 * (
            (portnoxData.initialCosts?.software || portnoxData.initialSoftware || 30000) + 
            (portnoxData.initialCosts?.implementation || portnoxData.initialImplementation || 15000)
        );
        
        // Let's calculate the monthly savings compared to an on-premises solution
        const competitorId = selectedVendors.find(v => v !== 'portnox');
        let monthlySavings = 15000; // Default if no competitor selected
        
        if (competitorId) {
            const competitorData = getVendorData(competitorId);
            if (competitorData) {
                const competitorTco = calculateTco(competitorData);
                const portnoxTco = calculateTco(portnoxData);
                const totalSavings = competitorTco - portnoxTco;
                monthlySavings = totalSavings / 36; // 3 years = 36 months
            }
        }
        
        // Calculate cumulative ROI over time
        const cumulativeData = [initialInvestment];
        for (let i = 1; i < labels.length; i++) {
            const months = parseInt(labels[i].split(' ')[1]);
            cumulativeData.push(initialInvestment + (monthlySavings * months));
        }
        
        // Add ROI percentage for each point
        const roiPercentages = cumulativeData.map(value => {
            if (value <= 0 || initialInvestment === 0) return 0;
            return Math.round((value / Math.abs(initialInvestment)) * 100);
        });
        
        // Create datasets
        const datasets = [
            {
                label: 'Cumulative Return ($)',
                data: cumulativeData,
                borderColor: '#65BD44',
                backgroundColor: 'rgba(101, 189, 68, 0.1)',
                fill: true,
                tension: 0.4,
                yAxisID: 'y'
            },
            {
                label: 'ROI (%)',
                data: roiPercentages,
                borderColor: '#FF9800',
                backgroundColor: 'rgba(255, 152, 0, 0.1)',
                borderDash: [5, 5],
                fill: false,
                tension: 0.4,
                yAxisID: 'y1'
            }
        ];
        
        // Mark the break-even point
        const breakEvenIndex = cumulativeData.findIndex(value => value >= 0);
        if (breakEvenIndex > 0) {
            datasets.push({
                label: 'Break-Even Point',
                data: Array(labels.length).fill(null),
                pointBackgroundColor: '#FF5722',
                pointBorderColor: '#FF5722',
                pointRadius: 8,
                pointHoverRadius: 10,
                showLine: false,
                yAxisID: 'y'
            });
            
            datasets[2].data[breakEvenIndex] = cumulativeData[breakEvenIndex];
        }
        
        // Create chart configuration
        const config = {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Cumulative Return ($)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    },
                    y1: {
                        position: 'right',
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'ROI (%)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                if (context.dataset.label === 'Cumulative Return ($)') {
                                    return context.dataset.label + ': $' + context.raw.toLocaleString();
                                } else if (context.dataset.label === 'ROI (%)') {
                                    return context.dataset.label + ': ' + context.raw + '%';
                                } else if (context.dataset.label === 'Break-Even Point') {
                                    return 'Break-Even Point: $' + context.raw.toLocaleString();
                                }
                                return context.dataset.label + ': ' + context.raw;
                            }
                        }
                    },
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Return on Investment Over Time'
                    }
                }
            }
        };
        
        return createChart(canvasId, config);
    }
    
    // Value Drivers Chart
    function initValueDriversChart(canvasId, selectedVendors) {
        const portnoxData = getVendorData('portnox');
        if (!portnoxData) {
            console.warn("Portnox data not found, cannot create Value Drivers chart");
            return false;
        }
        
        // Define the value drivers and their contributions to ROI
        const valueDrivers = [
            { name: 'Hardware Elimination', value: 80000 },
            { name: 'Operational Efficiency', value: 125000 },
            { name: 'Reduced Implementation', value: 35000 },
            { name: 'Maintenance Savings', value: 60000 },
            { name: 'Risk Reduction', value: 85000 },
            { name: 'Compliance Automation', value: 92000 }
        ];
        
        // Sort by value in descending order
        valueDrivers.sort((a, b) => b.value - a.value);
        
        // Create chart configuration
        const config = {
            type: 'horizontalBar',
            data: {
                labels: valueDrivers.map(d => d.name),
                datasets: [{
                    label: '3-Year Value ($)',
                    data: valueDrivers.map(d => d.value),
                    backgroundColor: [
                        '#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336', '#607D8B'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Value ($)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': $' + context.raw.toLocaleString();
                            }
                        }
                    },
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Value Drivers - 3-Year Contribution'
                    }
                }
            }
        };
        
        return createChart(canvasId, config);
    }
    
    // Vendor Radar Chart
    function initVendorRadarChart(canvasId, selectedVendors) {
        const datasets = [];
        const colors = ['#65BD44', '#05547C', '#FF9800', '#9C27B0', '#607D8B'];
        
        // Define categories for the radar chart
        const categories = [
            'Cloud Architecture',
            'Zero Trust Security',
            'Deployment Speed',
            'Cost Efficiency',
            'Scalability',
            'Operational Efficiency',
            'Integration Capabilities',
            'User Experience'
        ];
        
        // Score each vendor in each category
        selectedVendors.forEach((vendorId, index) => {
            const vendorData = getVendorData(vendorId);
            if (!vendorData) return;
            
            // Calculate scores based on vendor features
            const scores = [
                vendorId === 'portnox' ? 95 : (vendorData.features?.cloudNative || 40),
                vendorId === 'portnox' ? 90 : (vendorData.features?.zeroTrust || 50),
                vendorId === 'portnox' ? 95 : (vendorData.features?.deploymentSpeed || 45),
                vendorId === 'portnox' ? 85 : (vendorData.features?.costEfficiency || 55),
                vendorId === 'portnox' ? 90 : (vendorData.features?.scalability || 50),
                vendorId === 'portnox' ? 85 : (vendorData.features?.operationalEfficiency || 60),
                vendorId === 'portnox' ? 85 : (vendorData.features?.integration || 65),
                vendorId === 'portnox' ? 90 : (vendorData.features?.userExperience || 55)
            ];
            
            // Create dataset
            datasets.push({
                label: vendorData.name,
                data: scores,
                backgroundColor: 'rgba(' + hexToRgb(colors[index % colors.length]) + ', 0.2)',
                borderColor: colors[index % colors.length],
                pointBackgroundColor: colors[index % colors.length],
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: colors[index % colors.length],
                pointRadius: 4
            });
        });
        
        // Create chart configuration
        const config = {
            type: 'radar',
            data: {
                labels: categories,
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
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            stepSize: 20,
                            display: false
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.raw;
                            }
                        }
                    },
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Vendor Capabilities Comparison'
                    }
                }
            }
        };
        
        return createChart(canvasId, config);
    }
    
    // Architecture Chart
    function initArchitectureChart(canvasId, selectedVendors) {
        // This is a comparison between cloud and on-premises architecture
        
        // Define categories for comparison
        const categories = [
            'Deployment Complexity',
            'Infrastructure Requirements',
            'Scalability',
            'Maintenance Effort',
            'Upgrade Complexity',
            'Remote Access',
            'Multi-location Support',
            'Disaster Recovery'
        ];
        
        // Create datasets (cloud vs on-premises)
        const datasets = [
            {
                label: 'Cloud-Native (Portnox)',
                data: [10, 5, 95, 10, 5, 95, 90, 95],
                backgroundColor: 'rgba(101, 189, 68, 0.2)',
                borderColor: '#65BD44',
                pointBackgroundColor: '#65BD44',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#65BD44',
                pointRadius: 4
            },
            {
                label: 'On-Premises NAC',
                data: [85, 90, 40, 80, 85, 40, 50, 45],
                backgroundColor: 'rgba(5, 84, 124, 0.2)',
                borderColor: '#05547C',
                pointBackgroundColor: '#05547C',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#05547C',
                pointRadius: 4
            }
        ];
        
        // Create chart configuration
        const config = {
            type: 'radar',
            data: {
                labels: categories,
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
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            stepSize: 20,
                            display: false
                        },
                        pointLabels: {
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                let interpretation;
                                
                                if (context.datasetIndex === 0) { // Cloud-Native
                                    interpretation = value < 50 ? 'Low (Better)' : 'High (Better)';
                                } else { // On-Premises
                                    interpretation = value < 50 ? 'Low (Better)' : 'High (Worse)';
                                }
                                
                                return context.dataset.label + ': ' + value + ' - ' + interpretation;
                            }
                        }
                    },
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Cloud vs. On-Premises Architecture Comparison'
                    }
                }
            }
        };
        
        return createChart(canvasId, config);
    }
    
    // Feature Radar Chart
    function initFeatureRadarChart(canvasId, selectedVendors) {
        const datasets = [];
        const colors = ['#65BD44', '#05547C', '#FF9800', '#9C27B0', '#607D8B'];
        
        // Define feature categories
        const categories = [
            'Authentication Methods',
            'Device Visibility',
            'Cloud Integration',
            'Multi-Vendor Support',
            'Automated Remediation',
            'Remote Access',
            'IoT Support',
            'API Extensibility'
        ];
        
        // Score each vendor on features
        selectedVendors.forEach((vendorId, index) => {
            const vendorData = getVendorData(vendorId);
            if (!vendorData) return;
            
            // Calculate scores based on vendor features
            // Portnox has optimal scores
            const scores = [
                vendorId === 'portnox' ? 90 : (vendorData.features?.authentication || 70),
                vendorId === 'portnox' ? 95 : (vendorData.features?.endpointVisibility || 75),
                vendorId === 'portnox' ? 95 : (vendorData.features?.cloudIntegration || 40),
                vendorId === 'portnox' ? 85 : (vendorData.features?.multiVendor || 65),
                vendorId === 'portnox' ? 90 : (vendorData.features?.automation || 55),
                vendorId === 'portnox' ? 95 : (vendorData.features?.remoteAccess || 45),
                vendorId === 'portnox' ? 80 : (vendorData.features?.iotSupport || 60),
                vendorId === 'portnox' ? 90 : (vendorData.features?.apiExtensibility || 50)
            ];
            
            // Create dataset
            datasets.push({
                label: vendorData.name,
                data: scores,
                backgroundColor: 'rgba(' + hexToRgb(colors[index % colors.length]) + ', 0.2)',
                borderColor: colors[index % colors.length],
                pointBackgroundColor: colors[index % colors.length],
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: colors[index % colors.length],
                pointRadius: 4
            });
        });
        
        // Create chart configuration
        const config = {
            type: 'radar',
            data: {
                labels: categories,
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
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            stepSize: 20,
                            display: false
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.raw;
                            }
                        }
                    },
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Feature Comparison'
                    }
                }
            }
        };
        
        return createChart(canvasId, config);
    }
    
    // Security Capability Radar
    function initSecurityCapabilityRadar(canvasId, selectedVendors) {
        const datasets = [];
        const colors = ['#65BD44', '#05547C', '#FF9800', '#9C27B0', '#607D8B'];
        
        // Define security categories
        const categories = [
            'Authentication Strength',
            'Device Visibility',
            'Access Control',
            'Risk Assessment',
            'Network Segmentation',
            'Posture Assessment',
            'Threat Detection',
            'Automated Response',
            'Scalability'
        ];
        
        // Add industry average
        datasets.push({
            label: 'Industry Average',
            data: [55, 60, 50, 45, 55, 40, 50, 35, 45],
            backgroundColor: 'rgba(255, 193, 7, 0.2)',
            borderColor: '#FFC107',
            borderDash: [5, 5],
            pointBackgroundColor: '#FFC107',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#FFC107',
            pointRadius: 3
        });
        
        // Score each vendor on security capabilities
        selectedVendors.forEach((vendorId, index) => {
            const vendorData = getVendorData(vendorId);
            if (!vendorData) return;
            
            // Calculate scores based on vendor features
            // Portnox has optimal scores
            const scores = [
                vendorId === 'portnox' ? 90 : (vendorData.features?.authentication || 70),
                vendorId === 'portnox' ? 95 : (vendorData.features?.endpointVisibility || 60),
                vendorId === 'portnox' ? 85 : (vendorData.features?.accessControl || 75),
                vendorId === 'portnox' ? 90 : (vendorData.features?.riskAssessment || 50),
                vendorId === 'portnox' ? 80 : (vendorData.features?.networkSegmentation || 65),
                vendorId === 'portnox' ? 85 : (vendorData.features?.postureAssessment || 55),
                vendorId === 'portnox' ? 80 : (vendorData.features?.threatDetection || 60),
                vendorId === 'portnox' ? 90 : (vendorData.features?.automation || 45),
                vendorId === 'portnox' ? 95 : (vendorData.features?.scalability || 50)
            ];
            
            // Create dataset
            datasets.push({
                label: vendorData.name,
                data: scores,
                backgroundColor: 'rgba(' + hexToRgb(colors[index % colors.length]) + ', 0.2)',
                borderColor: colors[index % colors.length],
                pointBackgroundColor: colors[index % colors.length],
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: colors[index % colors.length],
                pointRadius: 4
            });
        });
        
        // Create chart configuration
        const config = {
            type: 'radar',
            data: {
                labels: categories,
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
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            stepSize: 20,
                            display: false
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.raw;
                            }
                        }
                    },
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Security Capabilities Comparison'
                    }
                }
            }
        };
        
        return createChart(canvasId, config);
    }
    
    // Helper function to convert hex color to RGB for opacity support
    function hexToRgb(hex) {
        // Remove the # if present
        hex = hex.replace('#', '');
        
        // Parse the hex values
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        return r + ',' + g + ',' + b;
    }
    
    // Attach event listeners for tab switching
    function attachEventListeners() {
        console.log("Attaching event listeners for chart updates...");
        
        // View tabs
        const viewTabs = document.querySelectorAll('.stakeholder-tab');
        viewTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const view = this.dataset.view;
                console.log(`View changed to ${view}, initializing charts...`);
                
                // Small delay to ensure DOM is updated
                setTimeout(() => {
                    // Get active panel in this view
                    const activePanel = document.querySelector(`.view-panel[data-view="${view}"] .results-panel.active`);
                    if (activePanel) {
                        // Get selected vendors
                        const selectedVendors = getSelectedVendors();
                        
                        // Initialize charts in the active panel
                        initVendorComparisonCharts(selectedVendors);
                    }
                }, 100);
            });
        });
        
        // Panel tabs
        const panelTabs = document.querySelectorAll('.results-tab');
        panelTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const panel = this.dataset.panel;
                console.log(`Panel changed to ${panel}, initializing charts...`);
                
                // Small delay to ensure DOM is updated
                setTimeout(() => {
                    // Get selected vendors
                    const selectedVendors = getSelectedVendors();
                    
                    // Initialize charts in the newly activated panel
                    initVendorComparisonCharts(selectedVendors);
                }, 100);
            });
        });
        
        // Vendor selection
        const vendorCards = document.querySelectorAll('.vendor-card');
        vendorCards.forEach(card => {
            card.addEventListener('click', function() {
                // Small delay to ensure selection state is updated
                setTimeout(() => {
                    // Get selected vendors
                    const selectedVendors = getSelectedVendors();
                    
                    // Update charts
                    initVendorComparisonCharts(selectedVendors);
                }, 100);
            });
        });
        
        // Calculate button
        const calculateButtons = document.querySelectorAll('#calculate-btn, #calculate-btn-header');
        calculateButtons.forEach(button => {
            button.addEventListener('click', function() {
                console.log("Calculate button clicked, updating charts...");
                
                // Get selected vendors
                const selectedVendors = getSelectedVendors();
                
                // Destroy existing charts
                destroyAllCharts();
                
                // Update charts
                initVendorComparisonCharts(selectedVendors);
            });
        });
        
        console.log("Event listeners attached successfully");
    }
    
    // Helper function to get selected vendors
    function getSelectedVendors() {
        const selectedCards = document.querySelectorAll('.vendor-card.selected');
        const vendors = Array.from(selectedCards).map(card => card.dataset.vendor);
        
        // Ensure Portnox is always included
        if (!vendors.includes('portnox')) {
            vendors.unshift('portnox');
        }
        
        console.log(`Selected vendors: ${vendors.join(', ')}`);
        return vendors;
    }
    
    // Initialize the module
    function init() {
        console.log("Initializing chart fixes...");
        
        // Add event listeners for chart updates
        attachEventListeners();
        
        // Get selected vendors
        const selectedVendors = getSelectedVendors();
        
        // Initialize charts for the active panel
        initVendorComparisonCharts(selectedVendors);
        
        console.log("Chart fixes initialized successfully");
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
