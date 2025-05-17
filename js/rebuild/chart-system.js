/**
 * Standalone Chart System for Portnox TCO Analyzer
 * This is a clean implementation not dependent on the existing broken code
 */
(function() {
    console.log("📊 Initializing standalone chart system...");
    
    // Store chart instances
    window.PORTNOX_CHARTS = window.PORTNOX_CHARTS || {};
    
    // Chart registry to keep track of all chart instances
    const chartRegistry = {};
    
    // Chart colors for vendors
    const getVendorColor = function(vendorId) {
        const vendorData = window.PORTNOX_DATA?.vendors[vendorId];
        return vendorData?.color || '#777777';
    };
    
    // Safely destroy a chart if it exists
    const destroyChart = function(canvasId) {
        if (chartRegistry[canvasId]) {
            try {
                chartRegistry[canvasId].destroy();
                console.log(`Chart destroyed: ${canvasId}`);
            } catch (e) {
                console.error(`Error destroying chart ${canvasId}:`, e);
            }
            delete chartRegistry[canvasId];
        } else {
            // Try using Chart.getChart() as fallback
            try {
                const chart = Chart.getChart(canvasId);
                if (chart) {
                    chart.destroy();
                    console.log(`Chart destroyed via Chart.getChart(): ${canvasId}`);
                }
            } catch (e) {
                // Ignore errors
            }
        }
        
        // Clear canvas
        const canvas = document.getElementById(canvasId);
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    };
    
    // Destroy all charts
    const destroyAllCharts = function() {
        Object.keys(chartRegistry).forEach(canvasId => {
            destroyChart(canvasId);
        });
        console.log("All charts destroyed");
    };
    
    // Create a chart and register it
    const createChart = function(canvasId, type, data, options) {
        // Destroy existing chart
        destroyChart(canvasId);
        
        // Get canvas element
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            console.error(`Canvas element not found: ${canvasId}`);
            return null;
        }
        
        try {
            // Create chart
            const ctx = canvas.getContext('2d');
            const chart = new Chart(ctx, {
                type: type,
                data: data,
                options: options || {}
            });
            
            // Register chart
            chartRegistry[canvasId] = chart;
            console.log(`Chart created: ${canvasId}`);
            
            return chart;
        } catch (e) {
            console.error(`Error creating chart ${canvasId}:`, e);
            return null;
        }
    };
    
    // Format currency
    const formatCurrency = function(value) {
        return '$' + value.toLocaleString();
    };
    
    // Format percentage
    const formatPercentage = function(value) {
        return Math.round(value) + '%';
    };
    
    // Format number
    const formatNumber = function(value) {
        return value.toLocaleString();
    };
    
    // Create a TCO comparison chart
    const createTcoComparisonChart = function(canvasId, selectedVendors, data) {
        if (!canvasId || !selectedVendors || !Array.isArray(selectedVendors) || selectedVendors.length === 0) {
            return null;
        }
        
        const vendorData = window.PORTNOX_DATA?.vendors;
        if (!vendorData) return null;
        
        const results = data || window.PORTNOX_DATA.calculations.calculateAll(selectedVendors);
        if (!results || !results.vendors || results.vendors.length === 0) return null;
        
        const labels = [];
        const tcoValues = [];
        const colors = [];
        
        results.vendors.forEach(vendor => {
            const vendorInfo = vendorData[vendor.id];
            if (vendorInfo) {
                labels.push(vendorInfo.name);
                tcoValues.push(vendor.tco.threeYearTCO);
                colors.push(getVendorColor(vendor.id));
            }
        });
        
        const chartData = {
            labels: labels,
            datasets: [{
                label: '3-Year Total Cost of Ownership',
                data: tcoValues,
                backgroundColor: colors,
                borderColor: colors.map(c => c + '88'),
                borderWidth: 1
            }]
        };
        
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            return '3-Year TCO: ' + formatCurrency(value);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    },
                    title: {
                        display: true,
                        text: 'Total Cost ($)'
                    }
                }
            }
        };
        
        return createChart(canvasId, 'bar', chartData, options);
    };
    
    // Create a TCO breakdown chart
    const createTcoBreakdownChart = function(canvasId, selectedVendors, data) {
        if (!canvasId || !selectedVendors || !Array.isArray(selectedVendors) || selectedVendors.length === 0) {
            return null;
        }
        
        const vendorData = window.PORTNOX_DATA?.vendors;
        if (!vendorData) return null;
        
        const results = data || window.PORTNOX_DATA.calculations.calculateAll(selectedVendors);
        if (!results || !results.vendors || results.vendors.length === 0) return null;
        
        // Prepare data
        const labels = [];
        const initialCosts = [];
        const annualCosts = [];
        const personnelCosts = [];
        
        results.vendors.forEach(vendor => {
            const vendorInfo = vendorData[vendor.id];
            if (vendorInfo) {
                labels.push(vendorInfo.name);
                
                // Initial costs (hardware, licensing, implementation)
                initialCosts.push(
                    vendor.tco.initialHardware + 
                    vendor.tco.initialLicensing + 
                    vendor.tco.initialImplementation
                );
                
                // Annual costs (maintenance, support, subscription)
                const annualTotal = 
                    (vendor.tco.annualMaintenance + 
                     vendor.tco.annualSupport + 
                     vendor.tco.annualOperations + 
                     vendor.tco.annualSubscription) * 
                    (window.PORTNOX_DATA.settings.yearsToProject || 3);
                
                annualCosts.push(annualTotal);
                
                // Personnel costs
                personnelCosts.push(vendor.tco.annualPersonnel * (window.PORTNOX_DATA.settings.yearsToProject || 3));
            }
        });
        
        const chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Initial Costs',
                    data: initialCosts,
                    backgroundColor: '#2D7DE1',
                    stack: 'Stack 0'
                },
                {
                    label: 'Annual Costs (3 Years)',
                    data: annualCosts,
                    backgroundColor: '#65BD44',
                    stack: 'Stack 0'
                },
                {
                    label: 'Personnel Costs (3 Years)',
                    data: personnelCosts,
                    backgroundColor: '#FF8300',
                    stack: 'Stack 0'
                }
            ]
        };
        
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            return context.dataset.label + ': ' + formatCurrency(value);
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    },
                    title: {
                        display: true,
                        text: 'Cost Breakdown ($)'
                    }
                }
            }
        };
        
        return createChart(canvasId, 'bar', chartData, options);
    };
    
    // Create a cumulative cost chart
    const createCumulativeCostChart = function(canvasId, selectedVendors, data) {
        if (!canvasId || !selectedVendors || !Array.isArray(selectedVendors) || selectedVendors.length === 0) {
            return null;
        }
        
        const vendorData = window.PORTNOX_DATA?.vendors;
        if (!vendorData) return null;
        
        const results = data || window.PORTNOX_DATA.calculations.calculateAll(selectedVendors);
        if (!results || !results.vendors || results.vendors.length === 0) return null;
        
        const years = window.PORTNOX_DATA.settings.yearsToProject || 3;
        const labels = ['Initial'];
        for (let i = 1; i <= years; i++) {
            labels.push(`Year ${i}`);
        }
        
        const datasets = [];
        
        results.vendors.forEach(vendor => {
            const vendorInfo = vendorData[vendor.id];
            if (vendorInfo) {
                const initialCost = vendor.tco.totalInitialCost;
                const annualCost = vendor.tco.totalAnnualCost;
                
                const data = [initialCost];
                let cumulative = initialCost;
                
                for (let i = 1; i <= years; i++) {
                    cumulative += annualCost;
                    data.push(cumulative);
                }
                
                datasets.push({
                    label: vendorInfo.name,
                    data: data,
                    borderColor: getVendorColor(vendor.id),
                    backgroundColor: 'transparent',
                    tension: 0.4
                });
            }
        });
        
        const chartData = {
            labels: labels,
            datasets: datasets
        };
        
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            return context.dataset.label + ': ' + formatCurrency(value);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    },
                    title: {
                        display: true,
                        text: 'Cumulative Cost ($)'
                    }
                }
            }
        };
        
        return createChart(canvasId, 'line', chartData, options);
    };
    
    // Create ROI chart
    const createRoiChart = function(canvasId, selectedVendors, data) {
        if (!canvasId || !selectedVendors || !Array.isArray(selectedVendors) || selectedVendors.length === 0) {
            return null;
        }
        
        const vendorData = window.PORTNOX_DATA?.vendors;
        if (!vendorData) return null;
        
        const results = data || window.PORTNOX_DATA.calculations.calculateAll(selectedVendors);
        if (!results || !results.vendors || results.vendors.length === 0) return null;
        
        // We focus on Portnox's ROI vs competitors
        const portnoxIndex = results.vendors.findIndex(v => v.id === 'portnox');
        if (portnoxIndex < 0) return null;
        
        const portnox = results.vendors[portnoxIndex];
        const competitors = results.vendors.filter(v => v.id !== 'portnox');
        
        // Prepare data for ROI comparison
        const labels = [];
        const roiValues = [];
        const colors = [];
        
        competitors.forEach(competitor => {
            const vendorInfo = vendorData[competitor.id];
            if (vendorInfo) {
                // Calculate ROI for Portnox vs this competitor
                const roi = window.PORTNOX_DATA.calculations.calculateROI('portnox', competitor.id);
                if (roi) {
                    labels.push(`vs. ${vendorInfo.name}`);
                    roiValues.push(roi.roi);
                    colors.push('#65BD44');
                }
            }
        });
        
        // If no comparisons, just show Portnox's general ROI
        if (roiValues.length === 0 && portnox.roi) {
            labels.push('ROI');
            roiValues.push(portnox.roi.roi);
            colors.push('#65BD44');
        }
        
        const chartData = {
            labels: labels,
            datasets: [{
                label: 'Return on Investment (%)',
                data: roiValues,
                backgroundColor: colors
            }]
        };
        
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            return 'ROI: ' + formatPercentage(value);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatPercentage(value);
                        }
                    },
                    title: {
                        display: true,
                        text: 'Return on Investment (%)'
                    }
                }
            }
        };
        
        return createChart(canvasId, 'bar', chartData, options);
    };
    
    // Create vendor radar chart
    const createVendorRadarChart = function(canvasId, selectedVendors) {
        if (!canvasId || !selectedVendors || !Array.isArray(selectedVendors) || selectedVendors.length === 0) {
            return null;
        }
        
        const vendorData = window.PORTNOX_DATA?.vendors;
        if (!vendorData) return null;
        
        // Define radar categories
        const categories = [
            'Zero Trust',
            'Cloud Integration',
            'Scalability',
            'Multi-Vendor Support',
            'Remote Access',
            'Cost Effectiveness',
            'Ease of Deployment'
        ];
        
        const datasets = [];
        
        selectedVendors.forEach(vendorId => {
            const vendor = vendorData[vendorId];
            if (vendor) {
                const color = getVendorColor(vendorId);
                
                datasets.push({
                    label: vendor.name,
                    data: [
                        vendor.features.zeroTrust,
                        vendor.features.cloudIntegration,
                        vendor.features.scalability,
                        vendor.features.multiVendor,
                        vendor.features.remoteAccess,
                        vendor.features.costEffectiveness,
                        vendor.features.easeOfDeployment
                    ],
                    backgroundColor: color + '33',
                    borderColor: color,
                    pointBackgroundColor: color,
                    pointRadius: 4
                });
            }
        });
        
        const chartData = {
            labels: categories,
            datasets: datasets
        };
        
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    beginAtZero: true,
                    ticks: {
                        stepSize: 20,
                        showLabelBackdrop: false
                    }
                }
            }
        };
        
        return createChart(canvasId, 'radar', chartData, options);
    };
    
    // Create risk comparison chart
    const createRiskComparisonChart = function(canvasId, selectedVendors, data) {
        if (!canvasId || !selectedVendors || !Array.isArray(selectedVendors) || selectedVendors.length === 0) {
            return null;
        }
        
        const vendorData = window.PORTNOX_DATA?.vendors;
        if (!vendorData) return null;
        
        const results = data || window.PORTNOX_DATA.calculations.calculateAll(selectedVendors);
        if (!results || !results.vendors || results.vendors.length === 0) return null;
        
        // Prepare data
        const labels = [];
        const riskReductionValues = [];
        const colors = [];
        
        results.vendors.forEach(vendor => {
            const vendorInfo = vendorData[vendor.id];
            if (vendorInfo) {
                labels.push(vendorInfo.name);
                riskReductionValues.push(vendor.risk.riskReduction);
                colors.push(getVendorColor(vendor.id));
            }
        });
        
        const chartData = {
            labels: labels,
            datasets: [{
                label: 'Risk Reduction (%)',
                data: riskReductionValues,
                backgroundColor: colors
            }]
        };
        
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            return 'Risk Reduction: ' + formatPercentage(value);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return formatPercentage(value);
                        }
                    },
                    title: {
                        display: true,
                        text: 'Risk Reduction (%)'
                    }
                }
            }
        };
        
        return createChart(canvasId, 'bar', chartData, options);
    };
    
    // Create deployment time comparison chart
    const createDeploymentTimeChart = function(canvasId, selectedVendors) {
        if (!canvasId || !selectedVendors || !Array.isArray(selectedVendors) || selectedVendors.length === 0) {
            return null;
        }
        
        const vendorData = window.PORTNOX_DATA?.vendors;
        if (!vendorData) return null;
        
        // Map deployment times to numeric values
        const deploymentTimeMap = {
            'Hours': 1,
            'Hours to Days': 3,
            'Days': 7,
            'Days to Weeks': 14,
            'Weeks': 30,
            'Weeks to Months': 60,
            'Months': 90,
            'N/A': 0
        };
        
        // Prepare data
        const labels = [];
        const deploymentTimeValues = [];
        const colors = [];
        
        selectedVendors.forEach(vendorId => {
            const vendor = vendorData[vendorId];
            if (vendor) {
                labels.push(vendor.name);
                deploymentTimeValues.push(deploymentTimeMap[vendor.deploymentTime] || 0);
                colors.push(getVendorColor(vendorId));
            }
        });
        
        const chartData = {
            labels: labels,
            datasets: [{
                label: 'Deployment Time (Days)',
                data: deploymentTimeValues,
                backgroundColor: colors
            }]
        };
        
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const vendorId = selectedVendors[context.dataIndex];
                            const vendor = vendorData[vendorId];
                            return 'Deployment Time: ' + (vendor ? vendor.deploymentTime : '');
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Approximate Time (Days)'
                    }
                }
            }
        };
        
        return createChart(canvasId, 'bar', chartData, options);
    };
    
    // Create security comparison chart
    const createSecurityComparisonChart = function(canvasId, selectedVendors) {
        if (!canvasId || !selectedVendors || !Array.isArray(selectedVendors) || selectedVendors.length === 0) {
            return null;
        }
        
        const vendorData = window.PORTNOX_DATA?.vendors;
        if (!vendorData) return null;
        
        // Define security categories
        const categories = [
            'Zero Trust',
            'Endpoint Visibility',
            'Threat Response',
            'Automation',
            'Compliance'
        ];
        
        const datasets = [];
        
        selectedVendors.forEach(vendorId => {
            const vendor = vendorData[vendorId];
            if (vendor) {
                const color = getVendorColor(vendorId);
                
                datasets.push({
                    label: vendor.name,
                    data: [
                        vendor.features.zeroTrust,
                        vendor.features.endpointVisibility,
                        vendor.features.threatResponse,
                        vendor.features.automation,
                        vendor.features.compliance
                    ],
                    backgroundColor: color + '33',
                    borderColor: color,
                    pointBackgroundColor: color,
                    pointRadius: 4
                });
            }
        });
        
        const chartData = {
            labels: categories,
            datasets: datasets
        };
        
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    beginAtZero: true,
                    ticks: {
                        stepSize: 20,
                        showLabelBackdrop: false
                    }
                }
            }
        };
        
        return createChart(canvasId, 'radar', chartData, options);
    };
    
    // Create payback period chart
    const createPaybackPeriodChart = function(canvasId, selectedVendors, data) {
        if (!canvasId || !selectedVendors || !Array.isArray(selectedVendors) || selectedVendors.length === 0) {
            return null;
        }
        
        const vendorData = window.PORTNOX_DATA?.vendors;
        if (!vendorData) return null;
        
        const results = data || window.PORTNOX_DATA.calculations.calculateAll(selectedVendors);
        if (!results || !results.vendors || results.vendors.length === 0) return null;
        
        // We focus on Portnox's payback periods vs competitors
        const portnoxIndex = results.vendors.findIndex(v => v.id === 'portnox');
        if (portnoxIndex < 0) return null;
        
        const portnox = results.vendors[portnoxIndex];
        
        // Prepare data
        const labels = [];
        const paybackValues = [];
        const colors = [];
        
        results.vendors.forEach(vendor => {
            const vendorInfo = vendorData[vendor.id];
            if (vendorInfo && vendor.roi && vendor.roi.paybackPeriod) {
                labels.push(vendorInfo.name);
                paybackValues.push(vendor.roi.paybackPeriod);
                colors.push(getVendorColor(vendor.id));
            }
        });
        
        const chartData = {
            labels: labels,
            datasets: [{
                label: 'Payback Period (Months)',
                data: paybackValues,
                backgroundColor: colors
            }]
        };
        
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            return 'Payback Period: ' + Math.round(value) + ' months';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Months to ROI'
                    }
                }
            }
        };
        
        return createChart(canvasId, 'bar', chartData, options);
    };
    
    // Create all charts for the active view
    const createAllCharts = function(selectedVendors, data) {
        console.log("Creating all charts for selected vendors:", selectedVendors);
        
        // Get active view
        const activeView = document.querySelector('.view-panel.active');
        if (!activeView) {
            console.warn("No active view found");
            return;
        }
        
        const viewId = activeView.getAttribute('data-view');
        console.log("Active view:", viewId);
        
        // Get active panel
        const activePanel = activeView.querySelector('.results-panel.active');
        if (!activePanel) {
            console.warn("No active panel found");
            return;
        }
        
        const panelId = activePanel.id;
        console.log("Active panel:", panelId);
        
        // Destroy any existing charts to prevent conflicts
        destroyAllCharts();
        
        // Executive view
        if (viewId === 'executive') {
            if (panelId === 'executive-summary') {
                createTcoComparisonChart('tco-comparison-chart', selectedVendors, data);
                createCumulativeCostChart('cumulative-cost-chart', selectedVendors, data);
            } else if (panelId === 'executive-roi') {
                createRoiChart('roi-chart', selectedVendors, data);
                createPaybackPeriodChart('payback-period-chart', selectedVendors, data);
            } else if (panelId === 'executive-risk') {
                createRiskComparisonChart('risk-comparison-chart', selectedVendors, data);
                createSecurityComparisonChart('security-comparison-chart', selectedVendors, data);
            } else if (panelId === 'executive-comparison') {
                createVendorRadarChart('vendor-radar-chart', selectedVendors);
                createDeploymentTimeChart('deployment-time-chart', selectedVendors);
            }
        }
        // Financial view
        else if (viewId === 'financial') {
            if (panelId === 'financial-overview') {
                createTcoComparisonChart('cost-structure-chart', selectedVendors, data);
                createCumulativeCostChart('cost-projection-chart', selectedVendors, data);
            } else if (panelId === 'financial-tco') {
                createTcoBreakdownChart('tco-breakdown-chart', selectedVendors, data);
            } else if (panelId === 'financial-roi') {
                createRoiChart('financial-roi-chart', selectedVendors, data);
            }
        }
        // Security view
        else if (viewId === 'security') {
            if (panelId === 'security-posture') {
                createSecurityComparisonChart('security-posture-chart', selectedVendors);
            } else if (panelId === 'security-risk') {
                createRiskComparisonChart('security-risk-chart', selectedVendors, data);
            }
        }
        // Technical view
        else if (viewId === 'technical') {
            if (panelId === 'technical-overview') {
                createVendorRadarChart('feature-radar-chart', selectedVendors);
            }
        }
        
        console.log("All charts created successfully");
    };
    
    // Update dashboard metrics
    const updateDashboardMetrics = function(selectedVendors, data) {
        console.log("Updating dashboard metrics for selected vendors:", selectedVendors);
        
        const vendorData = window.PORTNOX_DATA?.vendors;
        if (!vendorData) return;
        
        const results = data || window.PORTNOX_DATA.calculations.calculateAll(selectedVendors);
        if (!results || !results.vendors || results.vendors.length === 0) return;
        
        // Find Portnox for baseline
        const portnoxIndex = results.vendors.findIndex(v => v.id === 'portnox');
        if (portnoxIndex < 0) return;
        
        const portnox = results.vendors[portnoxIndex];
        
        // Find first competitor for comparison
        let competitor = null;
        for (let i = 0; i < results.vendors.length; i++) {
            if (results.vendors[i].id !== 'portnox') {
                competitor = results.vendors[i];
                break;
            }
        }
        
        // If no competitor found, we can't show comparison metrics
        if (!competitor) return;
        
        // Update executive summary metrics
        updateExecutiveSummaryMetrics(portnox, competitor);
        
        // Update financial metrics
        updateFinancialMetrics(portnox, competitor);
        
        // Update security metrics
        updateSecurityMetrics(portnox, competitor);
        
        console.log("Dashboard metrics updated successfully");
    };
    
    // Update executive summary metrics
    const updateExecutiveSummaryMetrics = function(portnox, competitor) {
        // Total savings
        const savingsElement = document.getElementById('total-savings');
        if (savingsElement && portnox.roi && portnox.roi.savings) {
            savingsElement.textContent = formatCurrency(portnox.roi.savings);
        }
        
        // Savings percentage
        const savingsPercentageElement = document.getElementById('savings-percentage');
        if (savingsPercentageElement && portnox.roi && portnox.roi.savingsPercentage && competitor) {
            savingsPercentageElement.textContent = `${Math.round(portnox.roi.savingsPercentage)}% reduction vs. ${competitor.name}`;
        }
        
        // Payback period
        const paybackElement = document.getElementById('payback-period');
        if (paybackElement && portnox.roi && portnox.roi.paybackPeriod) {
            const months = Math.round(portnox.roi.paybackPeriod);
            paybackElement.textContent = `${months} months`;
        }
        
        // Risk reduction
        const riskElement = document.getElementById('risk-reduction-total');
        if (riskElement && portnox.risk && portnox.risk.riskReduction) {
            riskElement.textContent = `${portnox.risk.riskReduction}%`;
        }
        
        // Implementation time
        const timeElement = document.getElementById('implementation-time');
        if (timeElement) {
            const deploymentTime = vendorData[portnox.id]?.deploymentTime || 'Days';
            if (deploymentTime === 'Days') {
                timeElement.textContent = '21 days';
            } else if (deploymentTime.includes('Days')) {
                timeElement.textContent = '14-21 days';
            } else if (deploymentTime === 'Hours') {
                timeElement.textContent = '2-3 days';
            } else if (deploymentTime.includes('Hours')) {
                timeElement.textContent = '3-7 days';
            } else {
                timeElement.textContent = deploymentTime;
            }
        }
        
        // Implementation comparison
        const timeComparisonElement = document.getElementById('implementation-comparison');
        if (timeComparisonElement && competitor) {
            const competitorDeployment = vendorData[competitor.id]?.deploymentTime || 'Weeks';
            if (competitorDeployment.includes('Month')) {
                timeComparisonElement.textContent = '85% faster than on-premises';
            } else if (competitorDeployment.includes('Week')) {
                timeComparisonElement.textContent = '75% faster than on-premises';
            } else {
                timeComparisonElement.textContent = '50% faster than alternatives';
            }
        }
    };
    
    // Update financial metrics
    const updateFinancialMetrics = function(portnox, competitor) {
        // Total TCO
        const tcoElement = document.getElementById('portnox-tco');
        if (tcoElement && portnox.tco && portnox.tco.threeYearTCO) {
            tcoElement.textContent = formatCurrency(portnox.tco.threeYearTCO);
        }
        
        // TCO comparison
        const tcoComparisonElement = document.getElementById('tco-comparison');
        if (tcoComparisonElement && competitor && competitor.tco && competitor.tco.threeYearTCO) {
            tcoComparisonElement.textContent = `vs. ${formatCurrency(competitor.tco.threeYearTCO)} (${competitor.name})`;
        }
        
        // Annual subscription
        const subscriptionElement = document.getElementById('annual-subscription');
        if (subscriptionElement && portnox.tco && portnox.tco.annualSubscription) {
            subscriptionElement.textContent = formatCurrency(portnox.tco.annualSubscription);
        }
        
        // Implementation cost
        const implementationElement = document.getElementById('implementation-cost');
        if (implementationElement && portnox.tco && portnox.tco.initialImplementation) {
            implementationElement.textContent = formatCurrency(portnox.tco.initialImplementation);
        }
        
        // Operational cost
        const operationalElement = document.getElementById('operational-cost');
        if (operationalElement && portnox.tco && portnox.tco.annualOperations) {
            operationalElement.textContent = formatCurrency(portnox.tco.annualOperations);
        }
        
        // 3-year ROI
        const roiElement = document.getElementById('three-year-roi');
        if (roiElement && portnox.roi && portnox.roi.roi) {
            roiElement.textContent = `${Math.round(portnox.roi.roi)}%`;
        }
        
        // Annual savings
        const annualSavingsElement = document.getElementById('annual-savings');
        if (annualSavingsElement && portnox.roi && portnox.roi.savings) {
            const annualSavings = portnox.roi.savings / 3; // 3-year savings divided by 3
            annualSavingsElement.textContent = formatCurrency(annualSavings);
        }
    };
    
    // Update security metrics
    const updateSecurityMetrics = function(portnox, competitor) {
        // Security improvement
        const improvementElement = document.getElementById('security-improvement');
        if (improvementElement && portnox.risk && portnox.risk.riskReduction) {
            improvementElement.textContent = `${portnox.risk.riskReduction}%`;
        }
        
        // Breach probability
        const breachProbabilityElement = document.getElementById('breach-probability');
        if (breachProbabilityElement) {
            breachProbabilityElement.textContent = 'Low';
        }
        
        // Compliance coverage
        const complianceCoverageElement = document.getElementById('compliance-coverage');
        if (complianceCoverageElement && portnox.id) {
            const complianceScore = vendorData[portnox.id]?.features?.compliance || 90;
            complianceCoverageElement.textContent = `${complianceScore}%`;
        }
        
        // Mean time to respond
        const mttrElement = document.getElementById('mttr');
        if (mttrElement && portnox.risk && portnox.risk.mttr) {
            mttrElement.textContent = `${portnox.risk.mttr} min`;
        } else if (mttrElement) {
            mttrElement.textContent = '30 min';
        }
    };
    
    // Add event listeners for tab switching
    const addTabListeners = function() {
        // View tabs
        document.querySelectorAll('.stakeholder-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const view = this.getAttribute('data-view');
                if (!view) return;
                
                // Update active class for tabs
                document.querySelectorAll('.stakeholder-tab').forEach(t => {
                    t.classList.remove('active');
                });
                document.querySelectorAll(`.stakeholder-tab[data-view="${view}"]`).forEach(t => {
                    t.classList.add('active');
                });
                
                // Update active class for view panels
                document.querySelectorAll('.view-panel').forEach(panel => {
                    if (panel.getAttribute('data-view') === view) {
                        panel.classList.add('active');
                    } else {
                        panel.classList.remove('active');
                    }
                });
                
                // Create charts for the new view
                setTimeout(() => {
                    const selectedVendors = getSelectedVendors();
                    createAllCharts(selectedVendors);
                }, 100);
            });
        });
        
        // Results tabs
        document.querySelectorAll('.results-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const panel = this.getAttribute('data-panel');
                if (!panel) return;
                
                // Get parent view panel
                const viewPanel = this.closest('.view-panel');
                if (!viewPanel) return;
                
                // Update active class for tabs
                viewPanel.querySelectorAll('.results-tab').forEach(t => {
                    t.classList.remove('active');
                });
                this.classList.add('active');
                
                // Update active class for result panels
                viewPanel.querySelectorAll('.results-panel').forEach(p => {
                    if (p.id === panel) {
                        p.classList.add('active');
                    } else {
                        p.classList.remove('active');
                    }
                });
                
                // Create charts for the new panel
                setTimeout(() => {
                    const selectedVendors = getSelectedVendors();
                    createAllCharts(selectedVendors);
                }, 100);
            });
        });
    };
    
    // Add event listeners for vendor selection
    const addVendorSelectionListeners = function() {
        document.querySelectorAll('.vendor-card').forEach(card => {
            card.addEventListener('click', function() {
                const vendorId = this.getAttribute('data-vendor');
                if (!vendorId) return;
                
                // Portnox should always be selected
                if (vendorId === 'portnox') {
                    this.classList.add('selected');
                    return;
                }
                
                // Toggle selection for other vendors
                this.classList.toggle('selected');
                
                // Update charts and metrics with selected vendors
                const selectedVendors = getSelectedVendors();
                
                // Make sure at least one vendor is selected
                if (selectedVendors.length === 0) {
                    this.classList.add('selected');
                    return;
                }
                
                // Make sure Portnox is always selected
                if (!selectedVendors.includes('portnox')) {
                    const portnoxCard = document.querySelector('.vendor-card[data-vendor="portnox"]');
                    if (portnoxCard) {
                        portnoxCard.classList.add('selected');
                        selectedVendors.push('portnox');
                    }
                }
                
                createAllCharts(selectedVendors);
                updateDashboardMetrics(selectedVendors);
            });
        });
        
        // Ensure Portnox is always selected initially
        const portnoxCard = document.querySelector('.vendor-card[data-vendor="portnox"]');
        if (portnoxCard && !portnoxCard.classList.contains('selected')) {
            portnoxCard.classList.add('selected');
        }
        
        // Ensure at least one competitor is selected initially
        const selectedCompetitors = document.querySelectorAll('.vendor-card.selected:not([data-vendor="portnox"])');
        if (selectedCompetitors.length === 0) {
            const ciscoCard = document.querySelector('.vendor-card[data-vendor="cisco"]');
            if (ciscoCard) {
                ciscoCard.classList.add('selected');
            } else {
                // Select the first non-Portnox vendor as fallback
                const firstCompetitor = document.querySelector('.vendor-card:not([data-vendor="portnox"])');
                if (firstCompetitor) {
                    firstCompetitor.classList.add('selected');
                }
            }
        }
    };
    
    // Add event listeners for calculate button
    const addCalculateButtonListeners = function() {
        const calculateBtn = document.getElementById('calculate-btn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', function() {
                // Show loading overlay if available
                const loadingOverlay = document.getElementById('loading-overlay');
                if (loadingOverlay) {
                    loadingOverlay.style.display = 'flex';
                }
                
                // Update parameters from UI inputs
                updateSettings();
                
                // Get selected vendors
                const selectedVendors = getSelectedVendors();
                
                // Calculate results
                const results = window.PORTNOX_DATA.calculations.calculateAll(selectedVendors);
                
                // Update charts and metrics
                setTimeout(() => {
                    createAllCharts(selectedVendors, results);
                    updateDashboardMetrics(selectedVendors, results);
                    
                    // Hide loading overlay
                    if (loadingOverlay) {
                        loadingOverlay.style.display = 'none';
                    }
                    
                    // Show success toast if available
                    if (window.showToast) {
                        window.showToast('Calculation completed successfully', 'success');
                    }
                }, 500);
            });
        }
        
        // Header calculate button
        const headerCalculateBtn = document.getElementById('calculate-btn-header');
        if (headerCalculateBtn) {
            headerCalculateBtn.addEventListener('click', function() {
                // Click the main calculate button
                if (calculateBtn) {
                    calculateBtn.click();
                }
            });
        }
    };
    
    // Get currently selected vendors
    const getSelectedVendors = function() {
        const selectedCards = document.querySelectorAll('.vendor-card.selected');
        const selectedVendors = Array.from(selectedCards).map(card => 
            card.getAttribute('data-vendor')
        ).filter(Boolean);
        
        // Make sure at least one vendor is selected
        if (selectedVendors.length === 0) {
            return ['portnox', 'cisco'];
        }
        
        // Make sure Portnox is always included
        if (!selectedVendors.includes('portnox')) {
            selectedVendors.unshift('portnox');
        }
        
        return selectedVendors;
    };
    
    // Update settings from UI inputs
    const updateSettings = function() {
        const settings = window.PORTNOX_DATA.settings;
        
        // Device count
        const deviceCountInput = document.getElementById('device-count');
        if (deviceCountInput) {
            settings.deviceCount = parseInt(deviceCountInput.value) || 500;
        }
        
        // Locations
        const locationsInput = document.getElementById('locations');
        if (locationsInput) {
            settings.locations = parseInt(locationsInput.value) || 2;
        }
        
        // Years to project
        const yearsInput = document.getElementById('years-to-project');
        if (yearsInput) {
            settings.yearsToProject = parseInt(yearsInput.value) || 3;
        }
        
        // Portnox base price
        const priceInput = document.getElementById('portnox-base-price');
        if (priceInput) {
            settings.basePrice = parseFloat(priceInput.value) || 3.0;
        }
        
        // Volume discount
        const discountInput = document.getElementById('portnox-discount');
        if (discountInput) {
            settings.volumeDiscount = parseInt(discountInput.value) / 100 || 0.15;
        }
        
        // FTE cost
        const fteCostInput = document.getElementById('fte-cost');
        if (fteCostInput) {
            settings.fteCost = parseInt(fteCostInput.value) || 100000;
        }
        
        // Risk reduction
        const riskReductionInput = document.getElementById('risk-reduction');
        if (riskReductionInput) {
            settings.riskReduction = parseInt(riskReductionInput.value) / 100 || 0.35;
        }
        
        // Insurance reduction
        const insuranceReductionInput = document.getElementById('insurance-reduction');
        if (insuranceReductionInput) {
            settings.insuranceReduction = parseInt(insuranceReductionInput.value) / 100 || 0.10;
        }
        
        // Downtime cost
        const downtimeCostInput = document.getElementById('downtime-cost');
        if (downtimeCostInput) {
            settings.downtimeCost = parseInt(downtimeCostInput.value) || 5000;
        }
        
        // Industry risk factor
        const industrySelect = document.getElementById('industry-select');
        if (industrySelect) {
            const industry = industrySelect.value;
            if (industry === 'healthcare' || industry === 'financial' || industry === 'government') {
                settings.industryRiskFactor = 1.5;
            } else if (industry === 'retail' || industry === 'education') {
                settings.industryRiskFactor = 1.2;
            } else {
                settings.industryRiskFactor = 1.0;
            }
        }
        
        // Risk profile
        const riskProfileSelect = document.getElementById('risk-profile');
        if (riskProfileSelect) {
            const riskProfile = riskProfileSelect.value;
            if (riskProfile === 'high') {
                settings.riskCostPerDevice = 150;
            } else if (riskProfile === 'elevated') {
                settings.riskCostPerDevice = 120;
            } else if (riskProfile === 'regulated') {
                settings.riskCostPerDevice = 180;
            } else {
                settings.riskCostPerDevice = 100;
            }
        }
        
        console.log("Settings updated:", settings);
    };
    
    // Update input value displays
    const updateInputValueDisplays = function() {
        document.querySelectorAll('input[type="range"]').forEach(slider => {
            const valueElement = document.getElementById(`${slider.id}-value`);
            if (valueElement) {
                // Update value display
                updateValueDisplay(slider, valueElement);
                
                // Add input event listener
                slider.addEventListener('input', function() {
                    updateValueDisplay(this, valueElement);
                });
            }
        });
    };
    
    // Update value display for a slider
    const updateValueDisplay = function(slider, valueElement) {
        let value = slider.value;
        
        if (slider.id === 'portnox-base-price') {
            valueElement.textContent = `$${parseFloat(value).toFixed(2)}`;
        } else if (slider.id.includes('percentage') || slider.id.includes('discount') || 
                  slider.id === 'fte-allocation' || slider.id === 'risk-reduction' || 
                  slider.id === 'insurance-reduction') {
            valueElement.textContent = `${value}%`;
        } else if (slider.id === 'fte-cost' || slider.id === 'downtime-cost') {
            valueElement.textContent = `$${parseInt(value).toLocaleString()}`;
        } else {
            valueElement.textContent = value;
        }
    };
    
    // Initialize chart system
    const initializeChartSystem = function() {
        console.log("Initializing chart system...");
        
        // Add tab event listeners
        addTabListeners();
        
        // Add vendor selection listeners
        addVendorSelectionListeners();
        
        // Add calculate button listeners
        addCalculateButtonListeners();
        
        // Update input value displays
        updateInputValueDisplays();
        
        // Get selected vendors
        const selectedVendors = getSelectedVendors();
        console.log("Selected vendors:", selectedVendors);
        
        // Create initial charts
        createAllCharts(selectedVendors);
        
        // Update dashboard metrics
        updateDashboardMetrics(selectedVendors);
        
        console.log("Chart system initialized successfully");
    };
    
    // Expose public API
    window.PORTNOX_CHARTS = {
        destroyChart,
        destroyAllCharts,
        createChart,
        createTcoComparisonChart,
        createTcoBreakdownChart,
        createCumulativeCostChart,
        createRoiChart,
        createVendorRadarChart,
        createRiskComparisonChart,
        createDeploymentTimeChart,
        createSecurityComparisonChart,
        createPaybackPeriodChart,
        createAllCharts,
        updateDashboardMetrics,
        getSelectedVendors,
        updateSettings,
        initializeChartSystem
    };
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeChartSystem);
    } else {
        initializeChartSystem();
    }
    
    // Also initialize on window load as fallback
    window.addEventListener('load', initializeChartSystem);
})();
