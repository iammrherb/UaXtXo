/**
 * ChartManager - Comprehensive chart management for TCO Analyzer
 * Handles creation, updating, and destruction of all charts
 */
class ChartManager {
    constructor() {
        this.charts = {};
        this.initialized = false;
        
        // Chart colors
        this.chartColors = {
            portnox: 'rgba(27, 103, 178, 1)',
            portnoxLight: 'rgba(27, 103, 178, 0.7)',
            portnoxLighter: 'rgba(27, 103, 178, 0.2)',
            
            // Vendor colors
            cisco: 'rgba(49, 66, 89, 1)',
            aruba: 'rgba(145, 61, 136, 1)',
            forescout: 'rgba(96, 178, 172, 1)',
            fortinac: 'rgba(224, 113, 98, 1)',
            nps: 'rgba(119, 144, 176, 1)',
            securew2: 'rgba(73, 162, 138, 1)',
            juniper: 'rgba(73, 108, 173, 1)',
            arista: 'rgba(182, 58, 66, 1)',
            foxpass: 'rgba(255, 159, 64, 1)',
            
            // Cost category colors
            hardware: 'rgba(255, 99, 71, 0.7)',
            software: 'rgba(54, 162, 235, 0.7)',
            personnel: 'rgba(255, 206, 86, 0.7)',
            maintenance: 'rgba(75, 192, 192, 0.7)',
            implementation: 'rgba(153, 102, 255, 0.7)',
            training: 'rgba(255, 159, 64, 0.7)',
            operations: 'rgba(199, 199, 199, 0.7)',
            
            // Status colors
            success: 'rgba(46, 184, 92, 1)',
            warning: 'rgba(255, 159, 64, 1)',
            danger: 'rgba(239, 68, 68, 1)',
            info: 'rgba(59, 130, 246, 1)',
            
            // Neutral colors
            gray: 'rgba(156, 163, 175, 1)',
            grayLight: 'rgba(156, 163, 175, 0.5)',
            grayLighter: 'rgba(156, 163, 175, 0.2)'
        };
        
        console.log("Chart Manager initialized");
    }
    
    /**
     * Initialize all charts
     */
    initializeCharts() {
        console.log("Initializing all charts...");
        
        try {
            // First destroy any existing charts to prevent canvas reuse errors
            this.destroyAllCharts();
            
            // Initialize comparison charts
            this.initializeTcoComparisonChart();
            this.initializeCostBreakdownCharts();
            this.initializeCumulativeCostChart();
            
            // Initialize implementation chart
            this.initializeImplementationComparisonChart();
            
            // Initialize feature comparison chart
            this.initializeFeatureComparisonChart();
            
            // Initialize ROI chart
            this.initializeRoiChart();
            
            // Initialize compliance chart
            this.initializeComplianceChart();
            
            // Initialize risk analysis chart
            this.initializeRiskAnalysisChart();
            
            // Initialize sensitivity chart
            this.initializeSensitivityChart();
            
            this.initialized = true;
            console.log("All charts initialized successfully");
            
            return true;
        } catch (error) {
            console.error("Error initializing charts:", error);
            return false;
        }
    }
    
    /**
     * Destroy all existing charts
     */
    destroyAllCharts() {
        // Destroy existing charts to prevent canvas reuse errors
        Object.keys(this.charts).forEach(chartId => {
            if (this.charts[chartId]) {
                try {
                    this.charts[chartId].destroy();
                    console.log(`Destroyed chart: ${chartId}`);
                } catch (error) {
                    console.warn(`Error destroying chart ${chartId}:`, error);
                }
            }
        });
        
        // Reset charts object
        this.charts = {};
    }
    
    /**
     * Get chart data from TCO calculator
     */
    getChartData() {
        // If tcoCalculator is available, get data from there
        if (window.tcoCalculator) {
            // Get calculation parameters
            const params = this.getCalculationParams();
            
            // Calculate comparison
            return window.tcoCalculator.calculateComparison(params);
        }
        
        // Otherwise, return sample data
        return this.getSampleData();
    }
    
    /**
     * Get calculation parameters from UI
     */
    getCalculationParams() {
        // Get selected vendor
        const vendorCards = document.querySelectorAll('.vendor-card');
        let selectedVendor = 'cisco'; // Default
        
        vendorCards.forEach(card => {
            if (card.classList.contains('active')) {
                selectedVendor = card.getAttribute('data-vendor') || 'cisco';
            }
        });
        
        // Get form values
        const deviceCount = parseInt(document.getElementById('device-count')?.value) || 2500;
        const years = parseInt(document.getElementById('years-to-project')?.value) || 3;
        const organizationSize = document.getElementById('organization-size')?.value || 'medium';
        const industry = document.getElementById('industry-select')?.value || 'technology';
        const locations = parseInt(document.getElementById('locations')?.value) || 1;
        const cloudIntegration = document.getElementById('cloud-integration')?.checked || false;
        const legacyDevices = document.getElementById('legacy-devices')?.checked || false;
        const byod = document.getElementById('byod-support')?.checked || false;
        const fteCost = parseFloat(document.getElementById('fte-cost')?.value) || 120000;
        const portnoxDiscount = parseFloat(document.getElementById('portnox-discount')?.value) || 0;
        
        return {
            selectedVendor,
            deviceCount,
            years,
            organizationSize,
            industry,
            locations,
            cloudIntegration,
            legacyDevices,
            byod,
            fteCost,
            discountPercentage: portnoxDiscount
        };
    }
    
    /**
     * Get sample data for charts when calculator not available
     */
    getSampleData() {
        // Sample vendors to compare
        const vendors = ['cisco', 'aruba', 'forescout', 'fortinac', 'nps', 'securew2', 'portnox'];
        
        // Sample TCO data
        const tcoData = {
            cisco: 650000,
            aruba: 500000,
            forescout: 580000,
            fortinac: 450000,
            nps: 280000,
            securew2: 220000,
            portnox: 180000
        };
        
        // Sample cost breakdowns
        const costBreakdowns = {
            cisco: {
                hardware: 150000,
                software: 200000,
                implementation: 75000,
                maintenance: 100000,
                personnel: 125000
            },
            portnox: {
                hardware: 0,
                software: 96000,
                implementation: 10000,
                maintenance: 24000,
                personnel: 50000
            }
        };
        
        // Sample cumulative cost data
        const cumulativeCosts = {
            cisco: [250000, 290000, 330000, 370000, 410000, 450000, 490000, 530000, 570000, 610000, 650000, 690000, 730000],
            portnox: [30000, 45000, 60000, 75000, 90000, 105000, 120000, 135000, 150000, 165000, 180000, 195000, 210000]
        };
        
        // Sample feature ratings
        const featureRatings = {
            cisco: [3, 10, 7, 2, 2, 10, 9, 10, 10, 6, 8, 9, 8],
            aruba: [4, 9, 8, 3, 3, 10, 9, 10, 8, 7, 8, 9, 7],
            forescout: [3, 9, 7, 3, 3, 8, 7, 8, 6, 6, 10, 8, 10],
            portnox: [10, 3, 8, 10, 10, 9, 9, 9, 7, 10, 9, 9, 9]
        };
        
        // Sample implementation timeline
        const implementationTimeline = {
            cisco: {
                planning: 30,
                hardware: 21,
                software: 7,
                integration: 14,
                policy: 21,
                testing: 14,
                deployment: 30,
                training: 5
            },
            aruba: {
                planning: 21,
                hardware: 14,
                software: 5,
                integration: 10,
                policy: 14,
                testing: 10,
                deployment: 21,
                training: 4
            },
            forescout: {
                planning: 21,
                hardware: 14,
                software: 5,
                integration: 7,
                policy: 10,
                testing: 7,
                deployment: 14,
                training: 3
            },
            portnox: {
                planning: 1,
                hardware: 0,
                software: 0.5,
                integration: 1,
                policy: 1,
                testing: 1,
                deployment: 1,
                training: 0.5
            }
        };
        
        // Return sample data
        return {
            vendors,
            tcoData,
            costBreakdowns,
            cumulativeCosts,
            featureRatings,
            implementationTimeline,
            roi: {
                totalSavings: 470000,
                savingsPercentage: 72,
                paybackPeriod: {
                    years: 0,
                    months: 4
                },
                implementationAdvantage: 137
            }
        };
    }
    
    /**
     * Initialize TCO comparison chart
     */
    initializeTcoComparisonChart() {
        const canvas = document.getElementById('tco-comparison-chart');
        if (!canvas) {
            console.warn("Canvas element not found for chart: tco-comparison-chart");
            return null;
        }
        
        try {
            const ctx = canvas.getContext('2d');
            
            // Get data from calculator
            const data = this.getChartData();
            const chartData = {
                labels: [],
                datasets: [{
                    label: '3-Year TCO ($)',
                    data: [],
                    backgroundColor: [],
                    borderColor: 'rgba(255, 255, 255, 0.6)',
                    borderWidth: 1
                }]
            };
            
            // If we have calculated data, use it
            if (data && data.vendors && Array.isArray(data.vendors)) {
                data.vendors.forEach(vendor => {
                    const vendorName = window.EnhancedVendors?.vendors[vendor]?.name || vendor;
                    const vendorTco = data.tcoData?.[vendor] || 0;
                    const vendorColor = this.chartColors[vendor] || this.chartColors.gray;
                    
                    chartData.labels.push(vendorName);
                    chartData.datasets[0].data.push(vendorTco);
                    chartData.datasets[0].backgroundColor.push(vendorColor);
                });
            } else {
                // Sample data as fallback
                chartData.labels = ['Cisco ISE', 'Aruba ClearPass', 'Forescout', 'FortiNAC', 'Microsoft NPS', 'SecureW2', 'Portnox Cloud'];
                chartData.datasets[0].data = [650000, 500000, 580000, 450000, 280000, 220000, 180000];
                chartData.datasets[0].backgroundColor = [
                    this.chartColors.cisco,
                    this.chartColors.aruba,
                    this.chartColors.forescout,
                    this.chartColors.fortinac,
                    this.chartColors.nps,
                    this.chartColors.securew2,
                    this.chartColors.portnox
                ];
            }
            
            // Sort the data in descending order
            const sortedIndices = chartData.datasets[0].data
                .map((value, index) => ({ value, index }))
                .sort((a, b) => b.value - a.value)
                .map(item => item.index);
            
            chartData.labels = sortedIndices.map(index => chartData.labels[index]);
            chartData.datasets[0].data = sortedIndices.map(index => chartData.datasets[0].data[index]);
            chartData.datasets[0].backgroundColor = sortedIndices.map(index => chartData.datasets[0].backgroundColor[index]);
            
            // Create chart
            this.charts.tcoComparison = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                    indexAxis: 'y',
                    scales: {
                        x: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            }
                        }
                    },
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
                        datalabels: {
                            color: 'white',
                            anchor: 'end',
                            align: 'start',
                            formatter: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeOutQuart'
                    }
                }
            });
            
            return this.charts.tcoComparison;
        } catch (error) {
            console.error("Error initializing TCO comparison chart:", error);
            return null;
        }
    }
    
    /**
     * Initialize cost breakdown charts
     */
    initializeCostBreakdownCharts() {
        return {
            current: this.initializeCurrentBreakdownChart(),
            alternative: this.initializeAlternativeBreakdownChart()
        };
    }
    
    /**
     * Initialize current solution breakdown chart
     */
    initializeCurrentBreakdownChart() {
        const canvas = document.getElementById('current-breakdown-chart');
        if (!canvas) {
            console.warn("Canvas element not found for chart: current-breakdown-chart");
            return null;
        }
        
        try {
            const ctx = canvas.getContext('2d');
            
            // Get data from calculator
            const data = this.getChartData();
            const selectedVendor = data.selectedVendor || 'cisco';
            
            // Prepare data
            let chartData = {
                labels: ['Hardware', 'Software', 'Implementation', 'Maintenance', 'Personnel'],
                datasets: [{
                    data: [150000, 200000, 75000, 100000, 125000], // Default
                    backgroundColor: [
                        this.chartColors.hardware,
                        this.chartColors.software,
                        this.chartColors.implementation,
                        this.chartColors.maintenance,
                        this.chartColors.personnel
                    ],
                    borderColor: 'rgba(255, 255, 255, 0.6)',
                    borderWidth: 1
                }]
            };
            
            // If we have calculated data, use it
            if (data && data.results && data.results[selectedVendor]) {
                const vendorData = data.results[selectedVendor];
                
                // We use breakdown percentages to calculate actual values
                const totalCost = vendorData.costs.total;
                const breakdownPercents = vendorData.breakdown;
                
                chartData.datasets[0].data = [
                    vendorData.costs.hardware || (totalCost * breakdownPercents.hardware / 100),
                    vendorData.costs.software || (totalCost * breakdownPercents.software / 100),
                    vendorData.costs.implementation || (totalCost * breakdownPercents.implementation / 100),
                    vendorData.costs.maintenance || (totalCost * breakdownPercents.maintenance / 100),
                    vendorData.costs.personnel || (totalCost * breakdownPercents.personnel / 100)
                ];
            }
            
            // Create chart
            this.charts.currentBreakdown = new Chart(ctx, {
                type: 'doughnut',
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '60%',
                    plugins: {
                        title: {
                            display: true,
                            text: window.EnhancedVendors?.vendors[selectedVendor]?.name || 'Current Solution',
                            font: {
                                size: 16,
                                weight: 'bold'
                            },
                            padding: {
                                bottom: 10
                            }
                        },
                        legend: {
                            position: 'right',
                            labels: {
                                padding: 15,
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context)
								{
                                    const value = context.raw;
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = Math.round((value / total) * 100);
                                    return `$${value.toLocaleString()} (${percentage}%)`;
                                }
                            }
                        },
                        datalabels: {
                            color: 'white',
                            font: {
                                weight: 'bold'
                            },
                            formatter: function(value, context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return percentage >= 5 ? `${percentage}%` : '';
                            }
                        }
                    },
                    animation: {
                        animateRotate: true,
                        animateScale: true,
                        duration: 1000
                    }
                }
            });
            
            return this.charts.currentBreakdown;
        } catch (error) {
            console.error("Error initializing current breakdown chart:", error);
            return null;
        }
    }
    
    /**
     * Initialize alternative breakdown chart
     */
    initializeAlternativeBreakdownChart() {
        const canvas = document.getElementById('alternative-breakdown-chart');
        if (!canvas) {
            console.warn("Canvas element not found for chart: alternative-breakdown-chart");
            return null;
        }
        
        try {
            const ctx = canvas.getContext('2d');
            
            // Get data from calculator
            const data = this.getChartData();
            
            // Prepare data
            let chartData = {
                labels: ['Software', 'Implementation', 'Maintenance', 'Personnel'],
                datasets: [{
                    data: [96000, 10000, 24000, 50000], // Default
                    backgroundColor: [
                        this.chartColors.software,
                        this.chartColors.implementation,
                        this.chartColors.maintenance,
                        this.chartColors.personnel
                    ],
                    borderColor: 'rgba(255, 255, 255, 0.6)',
                    borderWidth: 1
                }]
            };
            
            // If we have calculated data, use it
            if (data && data.results && data.results.portnox) {
                const portnoxData = data.results.portnox;
                
                // We use breakdown percentages to calculate actual values
                const totalCost = portnoxData.costs.total;
                const breakdownPercents = portnoxData.breakdown;
                
                chartData.datasets[0].data = [
                    portnoxData.costs.software || (totalCost * breakdownPercents.software / 100),
                    portnoxData.costs.implementation || (totalCost * breakdownPercents.implementation / 100),
                    portnoxData.costs.maintenance || (totalCost * breakdownPercents.maintenance / 100),
                    portnoxData.costs.personnel || (totalCost * breakdownPercents.personnel / 100)
                ];
            }
            
            // Create chart
            this.charts.alternativeBreakdown = new Chart(ctx, {
                type: 'doughnut',
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '60%',
                    plugins: {
                        title: {
                            display: true,
                            text: 'Portnox Cloud',
                            font: {
                                size: 16,
                                weight: 'bold'
                            },
                            padding: {
                                bottom: 10
                            }
                        },
                        legend: {
                            position: 'right',
                            labels: {
                                padding: 15,
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const value = context.raw;
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = Math.round((value / total) * 100);
                                    return `$${value.toLocaleString()} (${percentage}%)`;
                                }
                            }
                        },
                        datalabels: {
                            color: 'white',
                            font: {
                                weight: 'bold'
                            },
                            formatter: function(value, context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return percentage >= 5 ? `${percentage}%` : '';
                            }
                        }
                    },
                    animation: {
                        animateRotate: true,
                        animateScale: true,
                        duration: 1000
                    }
                }
            });
            
            return this.charts.alternativeBreakdown;
        } catch (error) {
            console.error("Error initializing alternative breakdown chart:", error);
            return null;
        }
    }
    
    /**
     * Initialize cumulative cost chart
     */
    initializeCumulativeCostChart() {
        const canvas = document.getElementById('cumulative-cost-chart');
        if (!canvas) {
            console.warn("Canvas element not found for chart: cumulative-cost-chart");
            return null;
        }
        
        try {
            const ctx = canvas.getContext('2d');
            
            // Get data from calculator
            const data = this.getChartData();
            const selectedVendor = data.selectedVendor || 'cisco';
            
            // Prepare time labels
            const timeLabels = ['Initial', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12'];
            
            // Prepare datasets
            const datasets = [
                {
                    label: window.EnhancedVendors?.vendors[selectedVendor]?.name || 'Current Solution',
                    data: [250000, 290000, 330000, 370000, 410000, 450000, 490000, 530000, 570000, 610000, 650000, 690000, 730000],
                    borderColor: this.chartColors[selectedVendor] || this.chartColors.cisco,
                    backgroundColor: 'rgba(49, 66, 89, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Portnox Cloud',
                    data: [30000, 45000, 60000, 75000, 90000, 105000, 120000, 135000, 150000, 165000, 180000, 195000, 210000],
                    borderColor: this.chartColors.portnox,
                    backgroundColor: 'rgba(27, 103, 178, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }
            ];
            
            // If we have ROI data, use it for cumulative costs
            if (data && data.roi && data.roi.quarterlyAnalysis) {
                const quarterlyData = data.roi.quarterlyAnalysis;
                const currentVendorCosts = [data.roi.initialInvestment];
                const portnoxCosts = [data.roi.initialInvestment];
                
                // Calculate cumulative costs
                for (let i = 0; i < quarterlyData.length; i++) {
                    const quarter = quarterlyData[i];
                    currentVendorCosts.push(currentVendorCosts[i] + ((data.results[selectedVendor].costs.total / 12) * 3));
                    portnoxCosts.push(portnoxCosts[i] + ((data.results.portnox.costs.total / 12) * 3));
                }
                
                datasets[0].data = currentVendorCosts;
                datasets[1].data = portnoxCosts;
            }
            
            // Create chart
            this.charts.cumulativeCost = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: timeLabels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
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
                        }
                    },
                    animation: {
                        duration: 1500
                    }
                }
            });
            
            return this.charts.cumulativeCost;
        } catch (error) {
            console.error("Error initializing cumulative cost chart:", error);
            return null;
        }
    }
    
    /**
     * Initialize feature comparison chart
     */
    initializeFeatureComparisonChart() {
        const canvas = document.getElementById('feature-comparison-chart');
        if (!canvas) {
            console.warn("Canvas element not found for chart: feature-comparison-chart");
            return null;
        }
        
        try {
            const ctx = canvas.getContext('2d');
            
            // Get data from calculator
            const data = this.getChartData();
            const selectedVendor = data.selectedVendor || 'cisco';
            
            // Get Enhanced Vendors for feature data
            const EnhancedVendors = window.EnhancedVendors || {};
            
            // Prepare feature categories and labels
            const featureLabels = [
                'Deployment Speed',
                'Total Cost',
                'Ease of Use',
                'Device Visibility',
                'Cloud Integration',
                'Maintenance Overhead',
                'Implementation Complexity',
                'Multi-Site Support',
                'Scalability',
                'Zero Trust Support'
            ];
            
            // Prepare datasets
            const datasets = [];
            
            // Always include Portnox
            datasets.push({
                label: 'Portnox Cloud',
                data: [10, 9, 9, 9, 10, 9, 9, 10, 10, 9],
                backgroundColor: 'rgba(27, 103, 178, 0.6)',
                borderColor: this.chartColors.portnox,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: this.chartColors.portnox
            });
            
            // Add selected vendor if not Portnox
            if (selectedVendor !== 'portnox') {
                const vendorName = EnhancedVendors.vendors[selectedVendor]?.name || selectedVendor;
                const vendorColor = this.chartColors[selectedVendor] || this.chartColors.gray;
                
                datasets.unshift({
                    label: vendorName,
                    data: [
                        // These values correspond to the feature labels above
                        selectedVendor === 'cisco' ? 3 : (selectedVendor === 'aruba' ? 4 : 5),
                        selectedVendor === 'cisco' ? 2 : (selectedVendor === 'aruba' ? 3 : 4),
                        selectedVendor === 'cisco' ? 4 : (selectedVendor === 'aruba' ? 5 : 5),
                        selectedVendor === 'forescout' ? 10 : (selectedVendor === 'cisco' ? 8 : 7),
                        selectedVendor === 'securew2' ? 9 : (selectedVendor === 'juniper' ? 8 : 6),
                        selectedVendor === 'cisco' ? 3 : (selectedVendor === 'aruba' ? 4 : 5),
                        selectedVendor === 'cisco' ? 2 : (selectedVendor === 'aruba' ? 3 : 4),
                        selectedVendor === 'cisco' ? 7 : (selectedVendor === 'aruba' ? 8 : 6),
                        selectedVendor === 'cisco' ? 6 : (selectedVendor === 'aruba' ? 7 : 6),
                        selectedVendor === 'cisco' ? 7 : (selectedVendor === 'aruba' ? 7 : 6)
                    ],
                    backgroundColor: `rgba(${vendorColor.slice(5, -1)}, 0.6)`,
                    borderColor: vendorColor,
                    borderWidth: 1,
                    pointRadius: 4,
                    pointBackgroundColor: vendorColor
                });
            }
            
            // If enhanced vendors available, use accurate feature data
            if (EnhancedVendors.features && EnhancedVendors.features.ratings) {
                // Clear datasets and rebuild
                datasets.length = 0;
                
                // Map our feature labels to the actual feature IDs
                const featureIds = [
                    'deployment_time',    // Deployment Speed
                    'hardware_reqs',      // Total Cost (inverse of hardware requirements)
                    'impl_complexity',    // Ease of Use (inverse of implementation complexity)
                    'device_fingerprinting', // Device Visibility
                    'cloud_identity',     // Cloud Integration
                    'op_overhead',        // Maintenance Overhead (inverse)
                    'impl_complexity',    // Implementation Complexity (inverse)
                    'multi_site',         // Multi-Site Support
                    'cloud_native',       // Scalability (approximated by cloud native capability)
                    'zero_trust'          // Zero Trust Support
                ];
                
                // Always add Portnox
                const portnoxData = featureIds.map(featureId => {
                    // For inverse features, invert the scale (10 - value)
                    if (['hardware_reqs', 'impl_complexity', 'op_overhead'].includes(featureId)) {
                        return 10 - EnhancedVendors.getFeatureRating('portnox', featureId);
                    }
                    return EnhancedVendors.getFeatureRating('portnox', featureId);
                });
                
                datasets.push({
                    label: 'Portnox Cloud',
                    data: portnoxData,
                    backgroundColor: 'rgba(27, 103, 178, 0.6)',
                    borderColor: this.chartColors.portnox,
                    borderWidth: 2,
                    pointRadius: 4,
                    pointBackgroundColor: this.chartColors.portnox
                });
                
                // Add selected vendor if not Portnox
                if (selectedVendor !== 'portnox') {
                    const vendorName = EnhancedVendors.vendors[selectedVendor]?.name || selectedVendor;
                    const vendorColor = this.chartColors[selectedVendor] || this.chartColors.gray;
                    
                    const vendorData = featureIds.map(featureId => {
                        // For inverse features, invert the scale (10 - value)
                        if (['hardware_reqs', 'impl_complexity', 'op_overhead'].includes(featureId)) {
                            return 10 - EnhancedVendors.getFeatureRating(selectedVendor, featureId);
                        }
                        return EnhancedVendors.getFeatureRating(selectedVendor, featureId);
                    });
                    
                    datasets.unshift({
                        label: vendorName,
                        data: vendorData,
                        backgroundColor: `rgba(${vendorColor.slice(5, -1)}, 0.6)`,
                        borderColor: vendorColor,
                        borderWidth: 1,
                        pointRadius: 4,
                        pointBackgroundColor: vendorColor
                    });
                }
                
                // Add two more vendors for comparison context
                const additionalVendors = ['aruba', 'forescout'].filter(v => v !== selectedVendor && v !== 'portnox');
                
                additionalVendors.forEach(vendor => {
                    const vendorName = EnhancedVendors.vendors[vendor]?.name || vendor;
                    const vendorColor = this.chartColors[vendor] || this.chartColors.gray;
                    
                    const vendorData = featureIds.map(featureId => {
                        // For inverse features, invert the scale (10 - value)
                        if (['hardware_reqs', 'impl_complexity', 'op_overhead'].includes(featureId)) {
                            return 10 - EnhancedVendors.getFeatureRating(vendor, featureId);
                        }
                        return EnhancedVendors.getFeatureRating(vendor, featureId);
                    });
                    
                    datasets.unshift({
                        label: vendorName,
                        data: vendorData,
                        backgroundColor: `rgba(${vendorColor.slice(5, -1)}, 0.3)`,
                        borderColor: vendorColor,
                        borderWidth: 1,
                        pointRadius: 3,
                        pointBackgroundColor: vendorColor
                    });
                });
            }
            
            // Create chart
            this.charts.featureComparison = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: featureLabels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            beginAtZero: true,
                            min: 0,
                            max: 10,
                            ticks: {
                                stepSize: 2,
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
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 15,
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + context.raw + '/10';
                                }
                            }
                        }
                    },
                    animation: {
                        duration: 1000
                    }
                }
            });
            
            console.log("Feature comparison chart initialized");
            return this.charts.featureComparison;
        } catch (error) {
            console.warn("Error initializing feature comparison chart:", error);
            return null;
        }
    }
    
    /**
     * Initialize implementation comparison chart
     */
    initializeImplementationComparisonChart() {
        const canvas = document.getElementById('implementation-comparison-chart');
        if (!canvas) {
            console.warn("Canvas element not found for chart: implementation-comparison-chart");
            return null;
        }
        
        try {
            const ctx = canvas.getContext('2d');
            
            // Get data from calculator
            const data = this.getChartData();
            const selectedVendor = data.selectedVendor || 'cisco';
            
            // Get Enhanced Vendors for implementation data
            const EnhancedVendors = window.EnhancedVendors || {};
            
            // Implementation phases
            const phases = [
                'Planning & Design',
                'Hardware Procurement',
                'Software Installation',
                'Network Integration',
                'Policy Configuration',
                'Testing & Validation',
                'Deployment & Rollout',
                'Knowledge Transfer'
            ];
            
            // Prepare datasets
            let datasets = [];
            
            // If we have implementation data, use it
            if (EnhancedVendors.implementationTimeline && EnhancedVendors.implementationTimeline.phases) {
                const timeline = EnhancedVendors.implementationTimeline.phases;
                
                // Prepare data for selected vendor
                const selectedVendorData = timeline.map(phase => phase[selectedVendor]?.days || 0);
                datasets.push({
                    label: EnhancedVendors.vendors[selectedVendor]?.name || selectedVendor,
                    data: selectedVendorData,
                    backgroundColor: this.chartColors[selectedVendor] || this.chartColors.cisco,
                    barPercentage: 0.6,
                    categoryPercentage: 0.8
                });
                
                // Add portnox data
                const portnoxData = timeline.map(phase => phase.portnox?.days || 0);
                datasets.push({
                    label: 'Portnox Cloud',
                    data: portnoxData,
                    backgroundColor: this.chartColors.portnox,
                    barPercentage: 0.6,
                    categoryPercentage: 0.8
                });
            } else {
                // Fallback implementation data
                datasets = [
                    {
                        label: 'Current Solution',
                        data: [21, 14, 7, 10, 14, 10, 21, 3],
                        backgroundColor: this.chartColors[selectedVendor] || this.chartColors.cisco,
                        barPercentage: 0.6,
                        categoryPercentage: 0.8
                    },
                    {
                        label: 'Portnox Cloud',
                        data: [1, 0, 0.5, 1, 1, 1, 1, 0.5],
                        backgroundColor: this.chartColors.portnox,
                        barPercentage: 0.6,
                        categoryPercentage: 0.8
                    }
                ];
            }
            
            // Create chart
            this.charts.implementationComparison = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: phases,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Days Required'
                            },
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 15,
                                usePointStyle: true,
                                pointStyle: 'rect'
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + context.raw + ' days';
                                }
                            }
                        },
                        datalabels: {
                            display: function(context) {
                                return context.dataset.data[context.dataIndex] > 3;
                            },
                            color: 'white',
                            anchor: 'center',
                            align: 'center',
                            formatter: function(value) {
                                return value + 'd';
                            }
                        }
                    },
                    animation: {
                        duration: 1000
                    }
                }
            });
            
            console.log("Implementation comparison chart initialized");
            return this.charts.implementationComparison;
        } catch (error) {
            console.warn("Error initializing implementation comparison chart:", error);
            return null;
        }
    }
    
    /**
     * Initialize ROI chart
     */
    initializeRoiChart() {
        const canvas = document.getElementById('roi-chart');
        if (!canvas) {
            console.warn("Canvas element not found for chart: roi-chart");
            return null;
        }
        
        try {
            const ctx = canvas.getContext('2d');
            
            // Get data from calculator
            const data = this.getChartData();
            const roi = data.roi || {
                breakEvenMonths: 4,
                quarterlyAnalysis: [
                    { quarter: 'Q1', savings: 40000, roi: -80 },
                    { quarter: 'Q2', savings: 90000, roi: -60 },
                    { quarter: 'Q3', savings: 150000, roi: -30 },
                    { quarter: 'Q4', savings: 220000, roi: 0 },
                    { quarter: 'Q5', savings: 300000, roi: 30 },
                    { quarter: 'Q6', savings: 390000, roi: 70 },
                    { quarter: 'Q7', savings: 490000, roi: 110 },
                    { quarter: 'Q8', savings: 600000, roi: 160 },
                    { quarter: 'Q9', savings: 720000, roi: 210 },
                    { quarter: 'Q10', savings: 850000, roi: 270 },
                    { quarter: 'Q11', savings: 990000, roi: 330 },
                    { quarter: 'Q12', savings: 1150000, roi: 400 }
                ]
            };
            
            // Prepare data
            const quarters = roi.quarterlyAnalysis.map(q => q.quarter);
            const savings = roi.quarterlyAnalysis.map(q => q.savings);
            const roiPercent = roi.quarterlyAnalysis.map(q => q.roi);
            
            // Create chart
            this.charts.roi = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: quarters,
                    datasets: [
                        {
                            label: 'Cumulative Savings',
                            data: savings,
                            borderColor: this.chartColors.portnox,
                            backgroundColor: 'rgba(27, 103, 178, 0.7)',
                            type: 'bar'
                        },
                        {
                            label: 'ROI (%)',
                            data: roiPercent,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            type: 'line',
                            yAxisID: 'y1',
                            tension: 0.4,
                            pointRadius: 4,
                            pointBackgroundColor: 'rgba(75, 192, 192, 1)'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            type: 'linear',
                            position: 'left',
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            },
                            title: {
                                display: true,
                                text: 'Cumulative Savings ($)'
                            }
                        },
                        y1: {
                            type: 'linear',
                            position: 'right',
                            min: -100,
                            max: 500,
                            grid: {
                                drawOnChartArea: false
                            },
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            },
                            title: {
                                display: true,
                                text: 'ROI (%)'
                            }
                        }
                    },
                    plugins: {
                        annotation: {
                            annotations: {
                                breakeven: {
                                    type: 'line',
                                    yMin: 0,
                                    yMax: 0,
                                    borderColor: 'rgba(0, 0, 0, 0.5)',
                                    borderWidth: 2,
                                    borderDash: [5, 5],
                                    label: {
                                        content: 'Break-even Point',
                                        display: true,
                                        position: 'center',
                                        backgroundColor: 'rgba(0, 0, 0, 0.7)'
                                    }
                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    if (context.dataset.label === 'Cumulative Savings') {
                                        return context.dataset.label + ': $' + context.raw.toLocaleString();
                                    } else {
                                        return context.dataset.label + ': ' + context.raw + '%';
                                    }
                                }
                            }
                        }
                    },
                    animation: {
                        duration: 1500
                    }
                }
            });
            
            console.log("ROI chart initialized");
            return this.charts.roi;
        } catch (error) {
            console.warn("Error initializing ROI chart:", error);
            return null;
        }
    }
    
    /**
     * Initialize compliance chart
     */
    initializeComplianceChart() {
        const canvas = document.getElementById('industry-compliance-chart');
        if (!canvas) {
            console.warn("Canvas element not found for chart: industry-compliance-chart");
            return null;
        }
        
        try {
            const ctx = canvas.getContext('2d');
            
            // Get data from calculator
            const data = this.getChartData();
            const industry = data?.params?.industry || 'technology';
            
            // Get industry and compliance data
            const IndustryData = window.IndustryData || {};
            const ComplianceFrameworks = window.ComplianceFrameworks || {};
            
            // Prepare datasets
            let chartData = {
                labels: ['Healthcare', 'Financial', 'Government', 'Education', 'Retail', 'Manufacturing'],
                datasets: [
                    {
                        label: 'Cisco ISE',
                        data: [85, 90, 92, 80, 85, 78],
                        backgroundColor: this.chartColors.cisco,
                        barPercentage: 0.7,
                        categoryPercentage: 0.8
                    },
                    {
                        label: 'Aruba ClearPass',
                        data: [80, 85, 88, 82, 80, 75],
                        backgroundColor: this.chartColors.aruba,
                        barPercentage: 0.7,
                        categoryPercentage: 0.8
                    },
                    {
                        label: 'Forescout',
                        data: [85, 82, 80, 75, 78, 88],
                        backgroundColor: this.chartColors.forescout,
                        barPercentage: 0.7,
                        categoryPercentage: 0.8
                    },
                    {
                        label: 'Portnox Cloud',
                        data: [90, 92, 90, 88, 90, 85],
                        backgroundColor: this.chartColors.portnox,
                        barPercentage: 0.7,
                        categoryPercentage: 0.8
                    }
                ]
            };
            
            // If we have comprehensive compliance data, use it
            if (ComplianceFrameworks.calculateIndustryCompliance) {
                // Get vendor list
                const vendors = ['cisco', 'aruba', 'forescout', 'fortinac', 'portnox'];
                
                // Get industry list
                const industries = Object.keys(IndustryData.industries || {});
                
                // Create datasets
                chartData = {
                    labels: industries.map(id => IndustryData.industries[id]?.name || id),
                    datasets: vendors.map(vendorId => {
                        const vendorName = window.EnhancedVendors?.vendors[vendorId]?.name || vendorId;
                        const vendorColor = this.chartColors[vendorId] || this.chartColors.gray;
                        
                        return {
                            label: vendorName,
                            data: industries.map(industryId => 
                                ComplianceFrameworks.calculateIndustryCompliance(vendorId, industryId)
                            ),
                            backgroundColor: vendorColor,
                            barPercentage: 0.7,
                            categoryPercentage: 0.8
                        };
                    })
                };
            }
            
            // Create chart
            this.charts.compliance = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            title: {
                                display: true,
                                text: 'Compliance Coverage (%)'
                            },
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 15,
                                usePointStyle: true,
                                pointStyle: 'rect'
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + context.raw + '% coverage';
                                }
                            }
                        }
                    },
                    animation: {
                        duration: 1000
                    }
                }
            });
            
            return this.charts.compliance;
        } catch (error) {
            console.warn("Error initializing compliance chart:", error);
            return null;
        }
    }
    
    /**
     * Initialize risk analysis chart
     */
    initializeRiskAnalysisChart() {
        const canvas = document.getElementById('risk-analysis-chart');
        if (!canvas) {
            console.warn("Canvas element not found for chart: risk-analysis-chart");
            return null;
        }
        
        try {
            const ctx = canvas.getContext('2d');
            
            // Get data from calculator
            const data = this.getChartData();
            const industry = data?.params?.industry || 'technology';
            
            // Get industry risk scoring
            const IndustryData = window.IndustryData || {};
            const riskScoring = IndustryData.riskScoring?.[industry] || {
                dataBreachLikelihood: 7,
                dataBreachImpact: 8,
                compliancePenaltyRisk: 6,
                operationalDisruptionRisk: 7,
                reputationalDamageRisk: 8
            };
            
            // Calculate risk reduction based on NAC implementation
            const noNacRisks = [
                riskScoring.dataBreachLikelihood * 10,
                riskScoring.dataBreachImpact * 10,
                riskScoring.compliancePenaltyRisk * 10,
                riskScoring.operationalDisruptionRisk * 10,
                riskScoring.reputationalDamageRisk * 10
            ];
            
            // Traditional NAC provides about 60% risk reduction
            const traditionalNacRisks = noNacRisks.map(risk => risk * 0.4);
            
            // Portnox provides about 75% risk reduction
            const portnoxRisks = noNacRisks.map(risk => risk * 0.25);
            
            // Create chart
            this.charts.riskAnalysis = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: [
                        'Data Breach Likelihood',
                        'Data Breach Impact',
                        'Compliance Penalty Risk',
                        'Operational Disruption',
                        'Reputational Damage'
                    ],
                    datasets: [
                        {
                            label: 'No NAC Solution',
                            data: noNacRisks,
                            backgroundColor: 'rgba(239, 68, 68, 0.5)',
                            borderColor: 'rgba(239, 68, 68, 1)',
                            borderWidth: 1,
                            pointRadius: 3,
                            pointBackgroundColor: 'rgba(239, 68, 68, 1)'
                        },
                        {
                            label: 'Traditional NAC',
                            data: traditionalNacRisks,
                            backgroundColor: 'rgba(245, 158, 11, 0.5)',
                            borderColor: 'rgba(245, 158, 11, 1)',
                            borderWidth: 1,
                            pointRadius: 3,
                            pointBackgroundColor: 'rgba(245, 158, 11, 1)'
                        },
                        {
                            label: 'Portnox Cloud',
                            data: portnoxRisks,
                            backgroundColor: 'rgba(27, 103, 178, 0.5)',
                            borderColor: 'rgba(27, 103, 178, 1)',
                            borderWidth: 2,
                            pointRadius: 4,
                            pointBackgroundColor: 'rgba(27, 103, 178, 1)'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            beginAtZero: true,
                            min: 0,
                            max: 100,
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
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 15,
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + context.raw + '% risk';
                                }
                            }
                        }
                    },
                    animation: {
                        duration: 1000
                    }
                }
            });
            
            return this.charts.riskAnalysis;
        } catch (error) {
            console.warn("Error initializing risk analysis chart:", error);
            return null;
        }
    }
    
    /**
     * Initialize sensitivity chart
     */
    initializeSensitivityChart() {
        const canvas = document.getElementById('sensitivity-chart');
        if (!canvas) {
            console.warn("Canvas element not found for chart: sensitivity-chart");
            return null;
        }
        
        try {
            const ctx = canvas.getContext('2d');
            
            // Default sensitivity data
            const deviceCounts = [500, 1000, 2000, 3000, 5000, 7500, 10000];
            
            const sensitivityData = {
                labels: deviceCounts,
                datasets: [
                    {
                        label: 'Current Solution TCO',
                        data: [350000, 650000, 1200000, 1800000, 2900000, 4200000, 5500000],
                        borderColor: this.chartColors.cisco,
                        backgroundColor: 'rgba(49, 66, 89, 0.1)',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4
                    },
                    {
                        label: 'Portnox Cloud TCO',
                        data: [110000, 180000, 320000, 450000, 700000, 975000, 1200000],
                        borderColor: this.chartColors.portnox,
                        backgroundColor: 'rgba(27, 103, 178, 0.1)',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4
                    },
                    {
                        label: 'Savings',
                        data: [240000, 470000, 880000, 1350000, 2200000, 3225000, 4300000],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        fill: true,
                        tension: 0.4
                    }
                ]
            };
            
            // Get data from calculator if available
            const data = this.getChartData();
            if (data && data.sensitivityAnalysis) {
                sensitivityData.labels = data.sensitivityAnalysis.deviceCount;
                sensitivityData.datasets[0].data = data.sensitivityAnalysis.selectedVendor;
                sensitivityData.datasets[1].data = data.sensitivityAnalysis.portnox;
                sensitivityData.datasets[2].data = data.sensitivityAnalysis.savings;
            }
            
            // Create chart
            this.charts.sensitivity = new Chart(ctx, {
                type: 'line',
                data: sensitivityData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Device Count'
                            },
                            grid: {
                                display: false
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
                        }
                    },
                    animation: {
                        duration: 1500
                    }
                }
            });
            
            return this.charts.sensitivity;
        } catch (error) {
            console.warn("Error initializing sensitivity chart:", error);
            return null;
        }
    }
}

// Initialize chart manager when document is ready
document.addEventListener('DOMContentLoaded', function() {
    window.chartManager = new ChartManager();
});
