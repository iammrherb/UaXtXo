/**
 * Chart Manager Module
 * Manages chart lifecycle and creation for the Portnox TCO Analyzer
 */
(function() {
    console.log("📊 Initializing enhanced chart manager...");

    // Store chart configurations and instances
    window.chartConfigs = {};
    window.chartInstances = {};

    // Initialize a chart
    window.initializeChart = function(canvasId, selectedVendors, options = {}) {
        console.log(`Initializing chart: ${canvasId}`);
        
        // Ensure canvas exists
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            console.error(`Canvas not found: ${canvasId}`);
            return null;
        }
        
        // Find chart type configuration based on canvas ID
        let chartConfig;
        
        switch (canvasId) {
            case 'tco-comparison-chart':
                chartConfig = createTcoComparisonConfig(selectedVendors);
                break;
            case 'cumulative-cost-chart':
                chartConfig = createCumulativeCostConfig(selectedVendors);
                break;
            case 'roi-chart':
                chartConfig = createRoiChartConfig(selectedVendors);
                break;
            case 'value-drivers-chart':
                chartConfig = createValueDriversConfig();
                break;
            case 'risk-comparison-chart':
                chartConfig = createRiskComparisonConfig(selectedVendors);
                break;
            case 'breach-impact-chart':
                chartConfig = createBreachImpactConfig(selectedVendors);
                break;
            case 'insurance-impact-chart':
                chartConfig = createInsuranceImpactConfig();
                break;
            case 'vendor-radar-chart':
                chartConfig = createVendorRadarConfig(selectedVendors);
                break;
            case 'architecture-chart':
                chartConfig = createArchitectureComparisonConfig();
                break;
            case 'feature-radar-chart':
                chartConfig = createFeatureRadarConfig(selectedVendors);
                break;
            case 'security-capability-chart':
                chartConfig = createSecurityCapabilityConfig(selectedVendors);
                break;
            case 'compliance-chart':
                chartConfig = createComplianceChartConfig(selectedVendors);
                break;
            case 'industry-requirements-chart':
                chartConfig = createIndustryRequirementsConfig();
                break;
            default:
                console.warn(`Unknown chart type for canvas: ${canvasId}`);
                return null;
        }
        
        // Store chart config
        window.chartConfigs[canvasId] = chartConfig;
        
        // Create chart
        const chart = createChart(canvasId, chartConfig);
        
        return chart;
    };
    
    // Create chart after ensuring any existing chart is destroyed
    window.createChart = function(canvasId, config) {
        // Ensure any existing chart is destroyed
        if (window.chartInstances[canvasId]) {
            window.chartInstances[canvasId].destroy();
            delete window.chartInstances[canvasId];
        }
        
        // Try different methods to destroy any chart that might exist
        try {
            if (typeof Chart !== 'undefined' && Chart.getChart) {
                const existingChart = Chart.getChart(canvasId);
                if (existingChart) {
                    existingChart.destroy();
                }
            }
        } catch (e) {
            console.warn(`Error trying to destroy chart ${canvasId}:`, e);
        }
        
        try {
            // Get the canvas context
            const canvas = document.getElementById(canvasId);
            if (!canvas) return null;
            
            const ctx = canvas.getContext('2d');
            
            // Create the chart
            const chart = new Chart(ctx, config);
            
            // Store the chart instance
            window.chartInstances[canvasId] = chart;
            
            return chart;
        } catch (error) {
            console.error(`Error creating chart ${canvasId}:`, error);
            return null;
        }
    };
    
    // Destroy all charts
    window.destroyAllCharts = function() {
        console.log("Destroying all charts...");
        
        // Destroy all stored chart instances
        for (const canvasId in window.chartInstances) {
            try {
                window.chartInstances[canvasId].destroy();
            } catch (e) {
                console.warn(`Error destroying chart ${canvasId}:`, e);
            }
        }
        
        // Clear charts object
        window.chartInstances = {};
        
        // Try to destroy charts using Chart.getChart
        try {
            if (typeof Chart !== 'undefined' && Chart.getChart) {
                const canvases = document.querySelectorAll('canvas');
                canvases.forEach(canvas => {
                    if (canvas.id) {
                        const chart = Chart.getChart(canvas.id);
                        if (chart) chart.destroy();
                    }
                });
            }
        } catch (e) {
            console.warn("Error trying to destroy charts with Chart.getChart:", e);
        }
        
        console.log("All charts destroyed successfully");
    };
    
    // Update all charts with new data
    window.updateAllCharts = function(selectedVendors) {
        console.log(`Updating all charts with vendors: ${selectedVendors.join(', ')}...`);
        
        // Verify selectedVendors is valid
        if (!selectedVendors || !Array.isArray(selectedVendors) || selectedVendors.length === 0) {
            console.warn("Invalid selectedVendors, using default");
            selectedVendors = ['portnox', 'no-nac'];
        }
        
        // First destroy all existing charts
        destroyAllCharts();
        
        // Get active view and panel
        const activeView = document.querySelector('.view-panel.active');
        if (!activeView) {
            console.error("No active view found");
            return;
        }
        
        const activePanel = activeView.querySelector('.results-panel.active');
        if (!activePanel) {
            console.error("No active panel found");
            return;
        }
        
        console.log(`Active view: ${activeView.dataset.view}, Active panel: ${activePanel.id}`);
        
        // Initialize charts in the active panel
        const canvases = activePanel.querySelectorAll('canvas');
        let initializedCount = 0;
        
        canvases.forEach(canvas => {
            if (canvas.id) {
                const chart = initializeChart(canvas.id, selectedVendors);
                if (chart) initializedCount++;
            }
        });
        
        console.log(`Updated ${initializedCount} charts successfully`);
        
        // Update dashboard metrics
        updateDashboardMetrics(selectedVendors);
    };
    
    // Update dashboard metrics
    function updateDashboardMetrics(selectedVendors) {
        console.log("Updating dashboard metrics...");
        
        // Ensure we have selected vendors
        if (!selectedVendors || !Array.isArray(selectedVendors) || selectedVendors.length === 0) {
            console.warn("Invalid selectedVendors for dashboard metrics");
            return;
        }
        
        // Get Portnox data
        const portnoxData = getVendorData('portnox');
        if (!portnoxData) {
            console.error("Portnox data not found!");
            return;
        }
        
        // Find main comparison vendor (prefer no-nac if available)
        let comparisonVendorId = 'no-nac';
        if (!selectedVendors.includes('no-nac')) {
            comparisonVendorId = selectedVendors.find(v => v !== 'portnox') || null;
        }
        
        const comparisonData = getVendorData(comparisonVendorId);
        if (!comparisonData) {
            console.warn(`Comparison vendor data not found for ${comparisonVendorId}`);
            return;
        }
        
        // Calculate TCO for each vendor
        const portnoxTco = calculateTco(portnoxData);
        const comparisonTco = calculateTco(comparisonData);
        const savings = comparisonTco - portnoxTco;
        const savingsPercentage = Math.round((savings / comparisonTco) * 100);
        
        // Update UI elements with calculated metrics
        updateMetric('total-savings', formatCurrency(savings));
        updateMetric('savings-percentage', `${savingsPercentage}% reduction vs. ${comparisonData.name}`);
        updateMetric('payback-period', `${portnoxData.paybackMonths || 7} months`);
        updateMetric('risk-reduction-total', `${portnoxData.features?.riskReduction || 58}%`);
        updateMetric('implementation-time', `${portnoxData.implementationDays || 21} days`);
        updateMetric('implementation-comparison', `${portnoxData.implementationSavingsPercent || 75}% faster than on-premises`);
        
        // Financial metrics
        updateMetric('portnox-tco', formatCurrency(portnoxTco));
        updateMetric('tco-comparison', `vs. ${formatCurrency(comparisonTco)} (${comparisonData.name})`);
        updateMetric('annual-subscription', formatCurrency(portnoxData.annualCosts?.licensing || 45000));
        updateMetric('implementation-cost', formatCurrency(portnoxData.initialCosts?.implementation || 15000));
        updateMetric('operational-cost', formatCurrency(portnoxData.annualCosts?.personnel || 25000));
        
        // ROI metrics
        updateMetric('three-year-roi', `${portnoxData.roi || 287}%`);
        updateMetric('annual-savings', formatCurrency(savings / 3));
        updateMetric('productivity-value', formatCurrency(portnoxData.productivityGains || 130000));
        
        // Security metrics
        updateMetric('security-improvement', `${portnoxData.features?.riskReduction || 74}%`);
        updateMetric('compliance-coverage', '93%');
        updateMetric('breach-probability', comparisonVendorId === 'no-nac' ? 'Low vs. High' : 'Low vs. Medium');
        updateMetric('mttr', '52 min');
        
        console.log("Dashboard metrics updated successfully");
    }
    
    // Helper to update metric element if it exists
    function updateMetric(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }
    
    // Format currency values
    function formatCurrency(value) {
        return '$' + Math.round(value).toLocaleString();
    }
    
    // Calculate TCO for a vendor
    function calculateTco(vendorData) {
        if (!vendorData) return 0;
        
        // Get analysis period (years)
        const analysisYears = parseInt(document.getElementById('years-to-project')?.value || 3);
        
        // Calculate initial costs
        let initialCosts = (vendorData.initialCosts?.hardware || 0) + 
                          (vendorData.initialCosts?.software || 0) + 
                          (vendorData.initialCosts?.implementation || 0);
        
        // Calculate annual costs
        let annualCosts = (vendorData.annualCosts?.licensing || 0) + 
                         (vendorData.annualCosts?.maintenance || 0) + 
                         (vendorData.annualCosts?.support || 0) + 
                         (vendorData.annualCosts?.personnel || 0);
        
        // Apply hardware refresh costs for on-premises solutions in year 3
        let refreshCosts = 0;
        if (analysisYears >= 3 && vendorData.architecture === 'On-Premises') {
            refreshCosts = (vendorData.initialCosts?.hardware || 0) * 0.5; // 50% of initial hardware
        }
        
        // Calculate total TCO
        const totalTco = initialCosts + (annualCosts * analysisYears) + refreshCosts;
        
        return totalTco;
    }
    
    // Get vendor data helper
    function getVendorData(vendorId) {
        if (!vendorId) return null;
        
        if (window.vendorData && window.vendorData[vendorId]) {
            return window.vendorData[vendorId];
        }
        
        // Fallback to other potential data sources
        if (window.vendorDetails && window.vendorDetails[vendorId]) {
            return window.vendorDetails[vendorId];
        }
        
        return null;
    }
    
    // Create TCO comparison chart configuration
    function createTcoComparisonConfig(selectedVendors) {
        // Ensure we have vendors to display
        if (!selectedVendors || selectedVendors.length === 0) {
            selectedVendors = ['portnox', 'no-nac'];
        }
        
        // Get analysis period (years)
        const analysisYears = parseInt(document.getElementById('years-to-project')?.value || 3);
        
        // Prepare data
        const vendorNames = [];
        const hardwareCosts = [];
        const softwareCosts = [];
        const implementationCosts = [];
        const licensingCosts = [];
        const maintenanceCosts = [];
        const personnelCosts = [];
        
        selectedVendors.forEach(vendorId => {
            const vendor = getVendorData(vendorId);
            if (!vendor) return;
            
            vendorNames.push(vendor.name);
            
            // Initial costs
            hardwareCosts.push(vendor.initialCosts?.hardware || 0);
            softwareCosts.push(vendor.initialCosts?.software || 0);
            implementationCosts.push(vendor.initialCosts?.implementation || 0);
            
            // Annual costs multiplied by analysis period
            licensingCosts.push((vendor.annualCosts?.licensing || 0) * analysisYears);
            maintenanceCosts.push((vendor.annualCosts?.maintenance || 0) * analysisYears);
            personnelCosts.push((vendor.annualCosts?.personnel || 0) * analysisYears);
            
            // Add hardware refresh for on-premises in year 3
            if (analysisYears >= 3 && vendor.architecture === 'On-Premises') {
                hardwareCosts[hardwareCosts.length - 1] += (vendor.initialCosts?.hardware || 0) * 0.5;
            }
        });
        
        // Create chart configuration
        return {
            type: 'bar',
            data: {
                labels: vendorNames,
                datasets: [
                    {
                        label: 'Hardware',
                        backgroundColor: '#FF6384',
                        data: hardwareCosts
                    },
                    {
                        label: 'Software',
                        backgroundColor: '#36A2EB',
                        data: softwareCosts
                    },
                    {
                        label: 'Implementation',
                        backgroundColor: '#FFCE56',
                        data: implementationCosts
                    },
                    {
                        label: 'Licensing',
                        backgroundColor: '#4BC0C0',
                        data: licensingCosts
                    },
                    {
                        label: 'Maintenance',
                        backgroundColor: '#9966FF',
                        data: maintenanceCosts
                    },
                    {
                        label: 'Personnel',
                        backgroundColor: '#FF9F40',
                        data: personnelCosts
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: `${analysisYears}-Year Total Cost of Ownership`,
                        font: { size: 16 }
                    },
                    tooltip: {
                        mode: 'index',
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': $' + context.raw.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true,
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
    
    // Create cumulative cost chart configuration
    function createCumulativeCostConfig(selectedVendors) {
        // Ensure we have vendors to display
        if (!selectedVendors || selectedVendors.length === 0) {
            selectedVendors = ['portnox', 'no-nac'];
        }
        
        // Get analysis period (years)
        const analysisYears = parseInt(document.getElementById('years-to-project')?.value || 3);
        
        // Prepare data
        const datasets = [];
        const colors = ['#4BC0C0', '#FF6384', '#FFCE56', '#36A2EB', '#9966FF'];
        
        // Generate labels based on quarters for the analysis period
        const labels = ['Initial'];
        for (let i = 1; i <= analysisYears * 4; i++) {
            labels.push(`Q${i}`);
        }
        
        selectedVendors.forEach((vendorId, index) => {
            const vendor = getVendorData(vendorId);
            if (!vendor) return;
            
            // Calculate initial and annual costs
            const initialCost = (vendor.initialCosts?.hardware || 0) + 
                              (vendor.initialCosts?.software || 0) + 
                              (vendor.initialCosts?.implementation || 0);
            
            const quarterlyLicensing = (vendor.annualCosts?.licensing || 0) / 4;
            const quarterlyMaintenance = (vendor.annualCosts?.maintenance || 0) / 4;
            const quarterlySupport = (vendor.annualCosts?.support || 0) / 4;
            const quarterlyPersonnel = (vendor.annualCosts?.personnel || 0) / 4;
            
            const quarterlyCost = quarterlyLicensing + quarterlyMaintenance + quarterlySupport + quarterlyPersonnel;
            
            // Calculate cumulative costs for each quarter
            const cumulativeCosts = [initialCost];
            
            for (let i = 1; i < labels.length; i++) {
                cumulativeCosts.push(cumulativeCosts[i-1] + quarterlyCost);
                
                // Add hardware refresh in Q9 (year 3) for on-premises solutions
                if (i === 9 && vendor.architecture === 'On-Premises') {
                    cumulativeCosts[i] += (vendor.initialCosts?.hardware || 0) * 0.5;
                }
            }
            
            // Create dataset
            datasets.push({
                label: vendor.name,
                data: cumulativeCosts,
                borderColor: colors[index % colors.length],
                backgroundColor: hexToRgba(colors[index % colors.length], 0.1),
                fill: true,
                tension: 0.4
            });
        });
        
        // Create chart configuration
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
                    title: {
                        display: true,
                        text: `Cumulative Cost Over ${analysisYears} Years`,
                        font: { size: 16 }
                    },
                    tooltip: {
                        mode: 'index',
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': $' + context.raw.toLocaleString();
                            }
                        }
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
    
    // Create ROI chart configuration
    function createRoiChartConfig(selectedVendors) {
        // Ensure we have Portnox selected
        if (!selectedVendors || !selectedVendors.includes('portnox')) {
            console.warn("Portnox must be included for ROI chart");
            selectedVendors = ['portnox', 'no-nac'];
        }
        
        // Get comparison vendor (prefer no-nac if available)
        let comparisonVendorId = 'no-nac';
        if (!selectedVendors.includes('no-nac')) {
            comparisonVendorId = selectedVendors.find(v => v !== 'portnox') || 'cisco';
        }
        
        // Get analysis period (years)
        const analysisYears = parseInt(document.getElementById('years-to-project')?.value || 3);
        
        // Get vendor data
        const portnoxData = getVendorData('portnox');
        const comparisonData = getVendorData(comparisonVendorId);
        
        if (!portnoxData || !comparisonData) {
            console.error("Missing vendor data for ROI chart");
            return null;
        }
        
        // Calculate Portnox investment
        const portnoxInvestment = (portnoxData.initialCosts?.software || 0) + 
                               (portnoxData.initialCosts?.implementation || 0);
        
        // Calculate annual costs for both solutions
        const portnoxAnnual = (portnoxData.annualCosts?.licensing || 0) + 
                           (portnoxData.annualCosts?.maintenance || 0) + 
                           (portnoxData.annualCosts?.support || 0) + 
                           (portnoxData.annualCosts?.personnel || 0);
        
        const comparisonAnnual = (comparisonData.annualCosts?.licensing || 0) + 
                              (comparisonData.annualCosts?.maintenance || 0) + 
                              (comparisonData.annualCosts?.support || 0) + 
                              (comparisonData.annualCosts?.personnel || 0);
        
        // Calculate monthly savings
        const monthlySavings = (comparisonAnnual - portnoxAnnual) / 12;
        
        // Initial investment is negative (cost)
        const initialValue = -portnoxInvestment;
        
        // Generate labels for months over the analysis period
        const labels = ['Initial'];
        const months = analysisYears * 12;
        for (let i = 1; i <= months; i++) {
            labels.push(`Month ${i}`);
        }
        
        // Calculate cumulative cashflow and ROI percentage
        const cumulativeCashflow = [initialValue];
        const roiPercentage = [0];
        
        for (let i = 1; i <= months; i++) {
            const newValue = cumulativeCashflow[i-1] + monthlySavings;
            cumulativeCashflow.push(newValue);
            
            // Calculate ROI percentage
            const roi = newValue > 0 ? Math.round((newValue / portnoxInvestment) * 100) : 0;
            roiPercentage.push(roi);
        }
        
        // Find breakeven point
        const breakevenIndex = cumulativeCashflow.findIndex(value => value >= 0);
        const breakevenMonth = breakevenIndex > 0 ? breakevenIndex : null;
        
        // Breakeven point marker dataset
        const breakevenMarker = {
            label: 'Breakeven Point',
            data: Array(labels.length).fill(null),
            pointBackgroundColor: '#FF5722',
            pointBorderColor: '#FF5722',
            pointRadius: 8,
            pointHoverRadius: 10,
            type: 'scatter',
            showLine: false
        };
        
        if (breakevenMonth) {
            breakevenMarker.data[breakevenMonth] = cumulativeCashflow[breakevenMonth];
        }
        
        // Create chart configuration
        return {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Cumulative Cash Flow',
                        data: cumulativeCashflow,
                        borderColor: '#4BC0C0',
                        backgroundColor: hexToRgba('#4BC0C0', 0.1),
                        fill: true,
                        tension: 0.4,
                        yAxisID: 'y'
                    },
                    {
                        label: 'ROI (%)',
                        data: roiPercentage,
                        borderColor: '#FF9800',
                        backgroundColor: 'transparent',
                        borderDash: [5, 5],
                        tension: 0.4,
                        yAxisID: 'y1'
                    },
                    breakevenMarker
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Return on Investment Analysis',
                        font: { size: 16 }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                if (context.dataset.label === 'Cumulative Cash Flow') {
                                    return context.dataset.label + ': $' + context.raw.toLocaleString();
                                } else if (context.dataset.label === 'ROI (%)') {
                                    return context.dataset.label + ': ' + context.raw + '%';
                                } else if (context.dataset.label === 'Breakeven Point') {
                                    return 'Breakeven Point: Month ' + breakevenMonth;
                                }
                                return context.dataset.label + ': ' + context.raw;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Cash Flow ($)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
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
                }
            }
        };
    }
    
    // Create value drivers chart configuration
    function createValueDriversConfig() {
        // Value drivers data
        const valueDrivers = [
            { name: 'Infrastructure Elimination', value: 105000 },
            { name: 'IT Staff Efficiency', value: 125000 },
            { name: 'Faster Deployment', value: 35000 },
            { name: 'Maintenance Savings', value: 60000 },
            { name: 'Risk & Breach Reduction', value: 85000 },
            { name: 'Compliance Automation', value: 92000 }
        ];
        
        // Sort by value descending
        valueDrivers.sort((a, b) => b.value - a.value);
        
        // Create chart configuration
        return {
            type: 'bar',
            data: {
                labels: valueDrivers.map(d => d.name),
                datasets: [{
                    label: '3-Year Value ($)',
                    data: valueDrivers.map(d => d.value),
                    backgroundColor: [
                        '#4BC0C0', '#36A2EB', '#FFCE56', '#FF6384', '#9966FF', '#FF9F40'
                    ]
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Value Drivers - 3-Year Contribution',
                        font: { size: 16 }
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '3-Year Value: $' + context.raw.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    x: {
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
    
    // Create risk comparison chart configuration
    function createRiskComparisonConfig(selectedVendors) {
        // Ensure we have vendors to display
        if (!selectedVendors || selectedVendors.length === 0) {
            selectedVendors = ['portnox', 'no-nac'];
        }
        
        // Risk factors to compare
        const riskFactors = [
            'Data Breach Probability',
            'Lateral Movement Risk',
            'Device Compromise Risk',
            'User Identity Theft',
            'Unauthorized Access',
            'Non-Compliance Risk',
            'IoT Security Risk'
        ];
        
        // Prepare datasets
        const datasets = [];
        const colors = ['#4BC0C0', '#FF6384', '#FFCE56', '#36A2EB', '#9966FF'];
        
        // Add baseline entry
        datasets.push({
            label: 'Industry Baseline',
            data: [65, 70, 65, 60, 70, 65, 80],
            borderColor: '#E0E0E0',
            backgroundColor: hexToRgba('#E0E0E0', 0.1),
            borderDash: [5, 5],
            fill: true
        });
        
        // Add data for each selected vendor
        selectedVendors.forEach((vendorId, index) => {
            const vendor = getVendorData(vendorId);
            if (!vendor) return;
            
            // Determine risk profile based on vendor
            let riskProfile;
            if (vendorId === 'portnox') {
                riskProfile = [25, 20, 25, 15, 15, 20, 30];
            } else if (vendorId === 'no-nac') {
                riskProfile = [90, 95, 85, 80, 90, 95, 90];
            } else {
                // Other vendors have moderate risk reduction but not as good as Portnox
                riskProfile = [45, 40, 50, 35, 45, 45, 55];
            }
            
            datasets.push({
                label: vendor.name,
                data: riskProfile,
                borderColor: colors[index % colors.length],
                backgroundColor: hexToRgba(colors[index % colors.length], 0.2),
                fill: true
            });
        });
        
        // Create chart configuration
        return {
            type: 'radar',
            data: {
                labels: riskFactors,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Security Risk Profile Comparison',
                        font: { size: 16 }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.raw + '% Risk';
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        min: 0,
                        max: 100,
                        ticks: {
                            display: false
                        },
                        pointLabels: {
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            }
        };
    }
    
    // Create breach impact chart configuration
    function createBreachImpactConfig(selectedVendors) {
        // Get industry selection
        const industrySelect = document.getElementById('industry-select');
        const selectedIndustry = industrySelect ? industrySelect.value : 'financial';
        
        // Get industry data
        const industryData = window.industryComplianceData && 
                          window.industryComplianceData[selectedIndustry] ? 
                          window.industryComplianceData[selectedIndustry] : 
                          { name: 'Financial Services', breachCost: 5850000 };
        
        // Calculate breach impact with and without NAC
        const noNacBreachCost = industryData.breachCost || 5850000;
        const withPortnoxCost = Math.round(noNacBreachCost * 0.42); // 58% reduction
        const withOtherNacCost = Math.round(noNacBreachCost * 0.60); // 40% reduction
        
        // Prepare data
        const labels = ['Without NAC', 'With Portnox NAC', 'With Traditional NAC'];
        const breachCosts = [noNacBreachCost, withPortnoxCost, withOtherNacCost];
        
        // Calculate savings
        const portnoxSavings = noNacBreachCost - withPortnoxCost;
        const otherSavings = noNacBreachCost - withOtherNacCost;
        
        // Create chart configuration
        return {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Average Breach Cost',
                    data: breachCosts,
                    backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Breach Impact Analysis',
                        font: { size: 16 }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return 'Avg. Breach Cost: $' + context.raw.toLocaleString();
                            },
                            afterLabel: function(context) {
                                if (context.dataIndex === 1) {
                                    return 'Savings: $' + portnoxSavings.toLocaleString() + 
                                           ' (' + Math.round((portnoxSavings / noNacBreachCost) * 100) + '%)';
                                } else if (context.dataIndex === 2) {
                                    return 'Savings: $' + otherSavings.toLocaleString() + 
                                           ' (' + Math.round((otherSavings / noNacBreachCost) * 100) + '%)';
                                }
                                return null;
                            }
                        }
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
    
    // Create insurance impact chart configuration
    function createInsuranceImpactConfig() {
        // Insurance premium data
        const labels = ['Without NAC', 'With Basic NAC', 'With Portnox NAC'];
        const premiums = [150000, 135000, 120000];
        
        // Calculate savings
        const basicSavings = premiums[0] - premiums[1];
        const portnoxSavings = premiums[0] - premiums[2];
        
        // Create chart configuration
        return {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Annual Premium ($)',
                    data: premiums,
                    backgroundColor: ['#FF6384', '#FFCE56', '#4BC0C0']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Cyber Insurance Premium Impact',
                        font: { size: 16 }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return 'Annual Premium: $' + context.raw.toLocaleString();
                            },
                            afterLabel: function(context) {
                                if (context.dataIndex === 1) {
                                    return 'Savings: $' + basicSavings.toLocaleString() + 
                                           ' (' + Math.round((basicSavings / premiums[0]) * 100) + '%)';
                                } else if (context.dataIndex === 2) {
                                    return 'Savings: $' + portnoxSavings.toLocaleString() + 
                                           ' (' + Math.round((portnoxSavings / premiums[0]) * 100) + '%)';
                                }
                                return null;
                            }
                        }
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
    
    // Create vendor radar chart configuration
    function createVendorRadarConfig(selectedVendors) {
        // Ensure we have vendors to display
        if (!selectedVendors || selectedVendors.length === 0) {
            selectedVendors = ['portnox', 'no-nac'];
        }
        
        // Capability categories to compare
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
        
        // Prepare datasets
        const datasets = [];
        const colors = ['#4BC0C0', '#FF6384', '#FFCE56', '#36A2EB', '#9966FF'];
        
        // Add data for each selected vendor
        selectedVendors.forEach((vendorId, index) => {
            const vendor = getVendorData(vendorId);
            if (!vendor) return;
            
            // Build scores array from vendor features
            const scores = [
                vendor.features?.cloudNative || 0,
                vendor.features?.zeroTrust || 0,
                vendor.features?.deploymentSpeed || 0,
                vendor.features?.costEfficiency || 0,
                vendor.features?.scalability || 0,
                vendor.features?.operationalEfficiency || 0,
                vendor.features?.integration || 0,
                vendor.features?.userExperience || 0
            ];
            
            datasets.push({
                label: vendor.name,
                data: scores,
                borderColor: colors[index % colors.length],
                backgroundColor: hexToRgba(colors[index % colors.length], 0.2),
                pointBackgroundColor: colors[index % colors.length],
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: colors[index % colors.length]
            });
        });
        
        // Create chart configuration
        return {
            type: 'radar',
            data: {
                labels: categories,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Vendor Capabilities Comparison',
                        font: { size: 16 }
                    }
                },
                scales: {
                    r: {
                        min: 0,
                        max: 100,
                        ticks: {
                            display: false
                        },
                        pointLabels: {
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            }
        };
    }
    
    // Create architecture comparison chart configuration
    function createArchitectureComparisonConfig() {
        // Architecture comparison categories
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
        
        // Create chart configuration
        return {
            type: 'radar',
            data: {
                labels: categories,
                datasets: [
                    {
                        label: 'Cloud-Native (Portnox)',
                        data: [10, 5, 95, 10, 5, 95, 90, 95],
                        borderColor: '#4BC0C0',
                        backgroundColor: hexToRgba('#4BC0C0', 0.2),
                        pointBackgroundColor: '#4BC0C0',
                        pointBorderColor: '#fff'
                    },
                    {
                        label: 'On-Premises NAC',
                        data: [85, 90, 40, 80, 85, 40, 50, 45],
                        borderColor: '#FF6384',
                        backgroundColor: hexToRgba('#FF6384', 0.2),
                        pointBackgroundColor: '#FF6384',
                        pointBorderColor: '#fff'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Cloud vs. On-Premises Architecture',
                        font: { size: 16 }
                    },
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
                    }
                },
                scales: {
                    r: {
                        min: 0,
                        max: 100,
                        ticks: {
                            display: false
                        },
                        pointLabels: {
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            }
        };
    }
    
    // Create feature radar chart configuration
    function createFeatureRadarConfig(selectedVendors) {
        // Ensure we have vendors to display
        if (!selectedVendors || selectedVendors.length === 0) {
            selectedVendors = ['portnox', 'no-nac'];
        }
        
        // Feature categories to compare
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
        
        // Prepare datasets
        const datasets = [];
        const colors = ['#4BC0C0', '#FF6384', '#FFCE56', '#36A2EB', '#9966FF'];
        
        // Add data for each selected vendor
        selectedVendors.forEach((vendorId, index) => {
            const vendor = getVendorData(vendorId);
            if (!vendor) return;
            
            // Build scores array from vendor features
            const scores = [
                vendor.features?.authentication || 0,
                vendor.features?.endpointVisibility || 0,
                vendor.features?.cloudIntegration || 0,
                vendor.features?.multiVendor || 0,
                vendor.features?.automation || 0,
                vendor.features?.remoteAccess || 0,
                vendor.features?.iotSupport || 0,
                vendor.features?.apiExtensibility || 0
            ];
            
            datasets.push({
                label: vendor.name,
                data: scores,
                borderColor: colors[index % colors.length],
                backgroundColor: hexToRgba(colors[index % colors.length], 0.2),
                pointBackgroundColor: colors[index % colors.length],
                pointBorderColor: '#fff'
            });
        });
        
        // Create chart configuration
        return {
            type: 'radar',
            data: {
                labels: categories,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Feature Comparison',
                        font: { size: 16 }
                    }
                },
                scales: {
                    r: {
                        min: 0,
                        max: 100,
                        ticks: {
                            display: false
                        },
                        pointLabels: {
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            }
        };
    }
    
    // Create security capability chart configuration
    function createSecurityCapabilityConfig(selectedVendors) {
        // Ensure we have vendors to display
        if (!selectedVendors || selectedVendors.length === 0) {
            selectedVendors = ['portnox', 'no-nac'];
        }
        
        // Security capability categories
        const categories = [
            'Authentication Strength',
            'Device Visibility',
            'Access Control',
            'Risk Assessment',
            'Network Segmentation',
            'Posture Assessment',
            'Threat Detection',
            'Automated Response'
        ];
        
        // Prepare datasets
        const datasets = [];
        const colors = ['#4BC0C0', '#FF6384', '#FFCE56', '#36A2EB', '#9966FF'];
        
        // Add industry average
        datasets.push({
            label: 'Industry Average',
            data: [55, 60, 50, 45, 55, 40, 50, 35],
            borderColor: '#E0E0E0',
            backgroundColor: hexToRgba('#E0E0E0', 0.1),
            borderDash: [5, 5]
        });
        
        // Add data for each selected vendor
        selectedVendors.forEach((vendorId, index) => {
            const vendor = getVendorData(vendorId);
            if (!vendor) return;
            
            // Build scores array from vendor features
            const scores = [
                vendor.features?.authentication || 0,
                vendor.features?.endpointVisibility || 0,
                vendor.features?.accessControl || 0,
                vendor.features?.riskAssessment || 0,
                vendor.features?.networkSegmentation || 0,
                vendor.features?.postureAssessment || 0,
                vendor.features?.threatDetection || 0,
                vendor.features?.automation || 0
            ];
            
            datasets.push({
                label: vendor.name,
                data: scores,
                borderColor: colors[index % colors.length],
                backgroundColor: hexToRgba(colors[index % colors.length], 0.2),
                pointBackgroundColor: colors[index % colors.length],
                pointBorderColor: '#fff'
            });
        });
        
        // Create chart configuration
        return {
            type: 'radar',
            data: {
                labels: categories,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Security Capabilities Assessment',
                        font: { size: 16 }
                    }
                },
                scales: {
                    r: {
                        min: 0,
                        max: 100,
                        ticks: {
                            display: false
                        },
                        pointLabels: {
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            }
        };
    }
    
    // Create compliance chart configuration
    function createComplianceChartConfig(selectedVendors) {
        // Ensure vendors include Portnox
        if (!selectedVendors || !selectedVendors.includes('portnox')) {
            selectedVendors = ['portnox', 'no-nac'];
        }
        
        // Get selected compliance frameworks
        const selectedFrameworks = [];
        const checkboxes = document.querySelectorAll('input[id^="compliance-"]:checked');
        checkboxes.forEach(checkbox => {
            const framework = checkbox.id.replace('compliance-', '');
            if (framework && window.complianceFrameworks && window.complianceFrameworks[framework]) {
                selectedFrameworks.push(framework);
            }
        });
        
        // If no frameworks selected, use defaults
        if (selectedFrameworks.length === 0) {
            selectedFrameworks.push('pci', 'hipaa', 'nist', 'gdpr');
        }
        
        // Prepare data
        const labels = selectedFrameworks.map(f => window.complianceFrameworks[f].name);
        const datasets = [];
        
        // Add Portnox data
        const portnoxData = [];
        selectedFrameworks.forEach(framework => {
            // Calculate average framework rating for Portnox
            const requirements = window.complianceFrameworks[framework].requirements;
            const sum = requirements.reduce((total, req) => total + req.portnoxRating, 0);
            const avg = Math.round(sum / requirements.length);
            portnoxData.push(avg);
        });
        
        datasets.push({
            label: 'Portnox Cloud',
            data: portnoxData,
            backgroundColor: '#4BC0C0',
            borderColor: '#4BC0C0',
            borderWidth: 1
        });
        
        // Add competitors data
        const competitorData = [];
        selectedFrameworks.forEach(framework => {
            // Calculate average framework rating for competitors
            const requirements = window.complianceFrameworks[framework].requirements;
            const sum = requirements.reduce((total, req) => total + req.averageRating, 0);
            const avg = Math.round(sum / requirements.length);
            competitorData.push(avg);
        });
        
        datasets.push({
            label: 'Industry Average',
            data: competitorData,
            backgroundColor: '#FF6384',
            borderColor: '#FF6384',
            borderWidth: 1
        });
        
        // Add no-nac data if selected
        if (selectedVendors.includes('no-nac')) {
            datasets.push({
                label: 'No NAC',
                data: Array(selectedFrameworks.length).fill(5), // Very low compliance
                backgroundColor: '#FFCE56',
                borderColor: '#FFCE56',
                borderWidth: 1
            });
        }
        
        // Create chart configuration
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
                    title: {
                        display: true,
                        text: 'Compliance Framework Coverage',
                        font: { size: 16 }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Coverage Score (%)'
                        }
                    }
                }
            }
        };
    }
    
    // Create industry requirements chart configuration
    function createIndustryRequirementsConfig() {
        // Get selected industry
        const industrySelect = document.getElementById('industry-select');
        const selectedIndustry = industrySelect ? industrySelect.value : '';
        
        // Default to financial if no industry selected
        const industry = (selectedIndustry && window.industryComplianceData && 
                         window.industryComplianceData[selectedIndustry]) ? 
                         window.industryComplianceData[selectedIndustry] : 
                         window.industryComplianceData['financial'];
        
        if (!industry || !industry.requirements) {
            console.error("Industry data not found");
            return null;
        }
        
        // Prepare data
        const labels = industry.requirements.map(req => req.name);
        const portnoxData = industry.requirements.map(req => req.portnoxRating);
        const averageData = industry.requirements.map(req => req.averageRating);
        
        // Create chart configuration
        return {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Portnox Cloud',
                        data: portnoxData,
                        backgroundColor: '#4BC0C0'
                    },
                    {
                        label: 'Industry Average',
                        data: averageData,
                        backgroundColor: '#FF6384'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: `${industry.name} Industry Requirements`,
                        font: { size: 16 }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Capability Score (%)'
                        }
                    }
                }
            }
        };
    }
    
    // Helper function to convert hex color to rgba
    function hexToRgba(hex, alpha) {
        if (!hex) return `rgba(0, 0, 0, ${alpha})`;
        
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    // Attach event handlers
    function attachEventHandlers() {
        console.log("Attaching event handlers...");
        
        // Handle vendor card selection
        const vendorCards = document.querySelectorAll('.vendor-card');
        vendorCards.forEach(card => {
            card.addEventListener('click', handleVendorCardClick);
        });
        
        // Handle calculate button clicks
        const calculateButtons = document.querySelectorAll('#calculate-btn, #calculate-btn-header');
        calculateButtons.forEach(button => {
            button.addEventListener('click', handleCalculateClick);
        });
        
        // Handle view tab changes
        const viewTabs = document.querySelectorAll('.stakeholder-tab');
        viewTabs.forEach(tab => {
            tab.addEventListener('click', handleViewTabClick);
        });
        
        // Handle panel tab changes
        const panelTabs = document.querySelectorAll('.results-tab');
        panelTabs.forEach(tab => {
            tab.addEventListener('click', handlePanelTabClick);
        });
        
        // Handle configuration changes
        const configInputs = document.querySelectorAll('#years-to-project, #device-count, #industry-select');
        configInputs.forEach(input => {
            input.addEventListener('change', handleConfigChange);
        });
        
        // Handle compliance checkbox changes
        const complianceCheckboxes = document.querySelectorAll('input[id^="compliance-"]');
        complianceCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', handleComplianceChange);
        });
        
        console.log("Event handlers attached successfully");
    }
    
    // Handle vendor card click
    function handleVendorCardClick(event) {
        const card = event.currentTarget;
        const vendorId = card.dataset.vendor;
        
        // Toggle selection (except for Portnox)
        if (vendorId !== 'portnox') {
            card.classList.toggle('selected');
        }
        
        // Get currently selected vendors
        const selectedVendors = getSelectedVendors();
        
        // Ensure we don't have too many selected
        const maxVendors = 3;
        if (selectedVendors.length > maxVendors) {
            card.classList.remove('selected');
            showToast(`Maximum ${maxVendors} vendors can be selected at once`, 'warning');
            return;
        }
        
        // Update charts with new selection
        updateAllCharts(selectedVendors);
    }
    
    // Handle calculate button click
    function handleCalculateClick() {
        // Show loading spinner if available
        const spinner = document.getElementById('loading-overlay');
        if (spinner) spinner.style.display = 'flex';
        
        // Get selected vendors
        const selectedVendors = getSelectedVendors();
        
        // Short delay to show spinner
        setTimeout(() => {
            // Update all charts
            updateAllCharts(selectedVendors);
            
            // Hide spinner
            if (spinner) spinner.style.display = 'none';
            
            // Show success toast
            showToast('Analysis completed successfully', 'success');
        }, 800);
    }
    
    // Handle view tab click
    function handleViewTabClick() {
        // Small delay to allow DOM updates
        setTimeout(() => {
            const selectedVendors = getSelectedVendors();
            updateAllCharts(selectedVendors);
        }, 100);
    }
    
    // Handle panel tab click
    function handlePanelTabClick() {
        // Small delay to allow DOM updates
        setTimeout(() => {
            const selectedVendors = getSelectedVendors();
            updateAllCharts(selectedVendors);
        }, 100);
    }
    
    // Handle configuration change
    function handleConfigChange() {
        const selectedVendors = getSelectedVendors();
        updateAllCharts(selectedVendors);
    }
    
    // Handle compliance checkbox change
    function handleComplianceChange() {
        const selectedVendors = getSelectedVendors();
        updateAllCharts(selectedVendors);
    }
    
    // Get currently selected vendors
    function getSelectedVendors() {
        const selectedCards = document.querySelectorAll('.vendor-card.selected');
        let vendors = Array.from(selectedCards).map(card => card.dataset.vendor);
        
        // Ensure Portnox is always included
        if (!vendors.includes('portnox')) {
            vendors.unshift('portnox');
        }
        
        // Default to no-nac comparison if no other vendor selected
        if (vendors.length === 1 && vendors[0] === 'portnox') {
            vendors.push('no-nac');
            
            // Also select the no-nac card in the UI
            const noNacCard = document.querySelector('.vendor-card[data-vendor="no-nac"]');
            if (noNacCard && !noNacCard.classList.contains('selected')) {
                noNacCard.classList.add('selected');
            }
        }
        
        console.log(`Selected vendors: ${vendors.join(', ')}`);
        return vendors;
    }
    
    // Show toast notification
    function showToast(message, type = 'info') {
        console.log(`Toast: ${message} (${type})`);
        
        // Find or create toast container
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerText = message;
        
        // Add toast to container
        toastContainer.appendChild(toast);
        
        // Auto-remove after delay
        setTimeout(() => {
            toast.classList.add('toast-fade-out');
            setTimeout(() => {
                toastContainer.removeChild(toast);
            }, 500);
        }, 3000);
    }
    
    // Initialize the module
    function init() {
        console.log("Initializing Chart Manager...");
        
        // Set default selected vendors if none are selected
        const selectedCards = document.querySelectorAll('.vendor-card.selected');
        if (selectedCards.length === 0) {
            // Select Portnox by default
            const portnoxCard = document.querySelector('.vendor-card[data-vendor="portnox"]');
            if (portnoxCard) portnoxCard.classList.add('selected');
            
            // Select No-NAC as comparison by default
            const noNacCard = document.querySelector('.vendor-card[data-vendor="no-nac"]');
            if (noNacCard) noNacCard.classList.add('selected');
        }
        
        // Attach event handlers
        attachEventHandlers();
        
        // Initialize charts
        const selectedVendors = getSelectedVendors();
        updateAllCharts(selectedVendors);
        
        console.log("Chart Manager initialized successfully");
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
