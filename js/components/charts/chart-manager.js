/**
 * Chart Manager - Handles all chart initializations and updates
 */
class ChartManager {
    constructor() {
        this.charts = {};
        this.initialized = false;
        this.chartColors = {
            portnox: 'rgba(27, 103, 178, 1)',
            ciscoISE: 'rgba(49, 66, 89, 1)',
            arubaClearPass: 'rgba(145, 61, 136, 1)',
            forescout: 'rgba(96, 178, 172, 1)',
            fortinac: 'rgba(224, 113, 98, 1)',
            nps: 'rgba(119, 144, 176, 1)',
            securew2: 'rgba(73, 162, 138, 1)',
            hardware: 'rgba(255, 99, 71, 0.7)',
            software: 'rgba(54, 162, 235, 0.7)',
            personnel: 'rgba(255, 206, 86, 0.7)',
            maintenance: 'rgba(75, 192, 192, 0.7)',
            implementation: 'rgba(153, 102, 255, 0.7)',
            training: 'rgba(255, 159, 64, 0.7)',
            operations: 'rgba(199, 199, 199, 0.7)'
        };
        
        console.log("Chart Manager initialized");
    }
    
    /**
     * Initialize all charts
     */
    initializeCharts() {
        console.log("Initializing all charts...");
        
        try {
            // Destroy any existing charts before reinitializing
            this.destroyAllCharts();
            
            // TCO Comparison tab charts
            this.initializeTcoComparisonChart();
            this.initializeCostBreakdownCharts();
            this.initializeCumulativeCostChart();
            
            // Feature comparison chart
            this.initializeFeatureComparisonChart();
            
            // Implementation comparison chart
            this.initializeImplementationComparisonChart();
            
            // ROI chart
            this.initializeROIChart();
            
            // Sensitivity chart
            this.initializeSensitivityChart();
            
            this.initialized = true;
            console.log("All charts initialized successfully");
        } catch (error) {
            console.error("Error initializing charts:", error);
        }
    }
    
    /**
     * Destroy all existing charts
     */
    destroyAllCharts() {
        // Destroy any existing charts to prevent canvas reuse errors
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
     * Get chart instance by ID
     */
    getChart(chartId) {
        return this.charts[chartId] || null;
    }
    
    /**
     * Initialize TCO comparison chart
     */
    initializeTcoComparisonChart() {
        const canvas = document.getElementById('tco-comparison-chart');
        if (!canvas) {
            console.warn("Canvas element not found for chart: tco-comparison-chart");
            return;
        }
        
        try {
            const ctx = canvas.getContext('2d');
            
            // Sample data - would come from actual calculator
            const tcoData = {
                labels: ['Cisco ISE', 'Aruba ClearPass', 'Forescout', 'FortiNAC', 'Portnox Cloud'],
                datasets: [
                    {
                        label: '3-Year TCO ($)',
                        data: [650000, 500000, 580000, 450000, 180000],
                        backgroundColor: [
                            this.chartColors.ciscoISE,
                            this.chartColors.arubaClearPass,
                            this.chartColors.forescout,
                            this.chartColors.fortinac,
                            this.chartColors.portnox
                        ],
                        borderColor: 'rgba(255, 255, 255, 0.6)',
                        borderWidth: 1
                    }
                ]
            };
            
            this.charts['tcoComparison'] = new Chart(ctx, {
                type: 'bar',
                data: tcoData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
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
                    }
                }
            });
            
            console.log("TCO comparison chart initialized");
        } catch (error) {
            console.error("Error initializing TCO comparison chart:", error);
        }
    }
    
    /**
     * Initialize cost breakdown charts
     */
    initializeCostBreakdownCharts() {
        this.initializeCurrentBreakdownChart();
        this.initializeAlternativeBreakdownChart();
    }
    
    /**
     * Initialize current solution breakdown chart
     */
    initializeCurrentBreakdownChart() {
        const canvas = document.getElementById('current-breakdown-chart');
        if (!canvas) {
            console.warn("Canvas element not found for chart: current-breakdown-chart");
            return;
        }
        
        try {
            const ctx = canvas.getContext('2d');
            
            // Sample data - would come from actual calculator
            const breakdownData = {
                labels: ['Hardware', 'Software', 'Implementation', 'Maintenance', 'Personnel'],
                datasets: [{
                    data: [150000, 200000, 75000, 100000, 125000],
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
            
            this.charts['currentBreakdown'] = new Chart(ctx, {
                type: 'doughnut',
                data: breakdownData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '60%',
                    plugins: {
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
                    }
                }
            });
            
            console.log("Current breakdown chart initialized");
        } catch (error) {
            console.error("Error initializing current breakdown chart:", error);
        }
    }
    
    /**
     * Initialize Portnox solution breakdown chart
     */
    initializeAlternativeBreakdownChart() {
        const canvas = document.getElementById('alternative-breakdown-chart');
        if (!canvas) {
            console.warn("Canvas element not found for chart: alternative-breakdown-chart");
            return;
        }
        
        try {
            const ctx = canvas.getContext('2d');
            
            // Sample data - would come from actual calculator
            const breakdownData = {
                labels: ['Software', 'Implementation', 'Maintenance', 'Personnel'],
                datasets: [{
                    data: [96000, 10000, 24000, 50000],
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
            
            this.charts['alternativeBreakdown'] = new Chart(ctx, {
                type: 'doughnut',
                data: breakdownData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '60%',
                    plugins: {
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
                    }
                }
            });
            
            console.log("Alternative breakdown chart initialized");
        } catch (error) {
            console.error("Error initializing alternative breakdown chart:", error);
        }
    }
    
    /**
     * Initialize cumulative cost chart
     */
    initializeCumulativeCostChart() {
        const canvas = document.getElementById('cumulative-cost-chart');
        if (!canvas) {
            console.warn("Canvas element not found for chart: cumulative-cost-chart");
            return;
        }
        
        try {
            const ctx = canvas.getContext('2d');
            
            // Sample data - would come from actual calculator
            const timeLabels = ['Initial', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12'];
            
            const cumulativeData = {
                labels: timeLabels,
                datasets: [
                    {
                        label: 'Current Solution',
                        data: [250000, 290000, 330000, 370000, 410000, 450000, 490000, 530000, 570000, 610000, 650000, 690000, 730000],
                        borderColor: this.chartColors.ciscoISE,
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
                ]
            };
            
            this.charts['cumulativeCost'] = new Chart(ctx, {
                type: 'line',
                data: cumulativeData,
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
                    }
                }
            });
            
            console.log("Cumulative cost chart initialized");
        } catch (error) {
            console.error("Error initializing cumulative cost chart:", error);
        }
    }
    
    /**
     * Initialize feature comparison chart
     */
    initializeFeatureComparisonChart() {
        const canvas = document.getElementById('feature-comparison-chart');
        if (!canvas) {
            console.warn("Canvas element not found for chart: feature-comparison-chart");
            return;
        }
        
        try {
            const ctx = canvas.getContext('2d');
            
            // Sample data - would come from actual feature comparison
            const featureData = {
                labels: [
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
                ],
                datasets: [
                    {
                        label: 'Cisco ISE',
                        data: [3, 2, 4, 9, 6, 3, 2, 7, 6, 7],
                        backgroundColor: 'rgba(49, 66, 89, 0.6)',
                        borderColor: this.chartColors.ciscoISE,
                        borderWidth: 1,
                        pointRadius: 4,
                        pointBackgroundColor: this.chartColors.ciscoISE
                    },
                    {
                        label: 'Aruba ClearPass',
                        data: [4, 3, 5, 8, 7, 4, 3, 8, 7, 7],
                        backgroundColor: 'rgba(145, 61, 136, 0.6)',
                        borderColor: this.chartColors.arubaClearPass,
                        borderWidth: 1,
                        pointRadius: 4,
                        pointBackgroundColor: this.chartColors.arubaClearPass
                    },
                    {
                        label: 'Forescout',
                        data: [3, 3, 4, 10, 6, 4, 3, 7, 6, 8],
                        backgroundColor: 'rgba(96, 178, 172, 0.6)',
                        borderColor: this.chartColors.forescout,
                        borderWidth: 1,
                        pointRadius: 4,
                        pointBackgroundColor: this.chartColors.forescout
                    },
                    {
                        label: 'Portnox Cloud',
                        data: [10, 9, 9, 9, 10, 9, 9, 10, 10, 9],
                        backgroundColor: 'rgba(27, 103, 178, 0.6)',
                        borderColor: this.chartColors.portnox,
                        borderWidth: 2,
                        pointRadius: 4,
                        pointBackgroundColor: this.chartColors.portnox
                    }
                ]
            };
            
            this.charts['featureComparison'] = new Chart(ctx, {
                type: 'radar',
                data: featureData,
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
                    }
                }
            });
            
            console.log("Feature comparison chart initialized");
        } catch (error) {
            console.warn("Error initializing feature comparison chart:", error);
        }
    }
    
    /**
     * Initialize implementation comparison chart
     */
    initializeImplementationComparisonChart() {
        const canvas = document.getElementById('implementation-comparison-chart');
        if (!canvas) {
            console.warn("Canvas element not found for chart: implementation-comparison-chart");
            return;
        }
        
        try {
            const ctx = canvas.getContext('2d');
            
            // Sample data - would come from actual implementation timelines
            const implementationData = {
                labels: [
                    'Planning & Design',
                    'Hardware Procurement',
                    'Software Installation',
                    'Network Integration',
                    'Policy Configuration',
                    'Testing & Validation',
                    'Deployment & Rollout',
                    'Knowledge Transfer'
                ],
                datasets: [
                    {
                        label: 'Cisco ISE (Days)',
                        data: [30, 21, 7, 14, 21, 14, 30, 5],
                        backgroundColor: this.chartColors.ciscoISE,
                        barPercentage: 0.6,
                        categoryPercentage: 0.8
                    },
                    {
                        label: 'Aruba ClearPass (Days)',
                        data: [21, 14, 5, 10, 14, 10, 21, 4],
                        backgroundColor: this.chartColors.arubaClearPass,
                        barPercentage: 0.6,
                        categoryPercentage: 0.8
                    },
                    {
                        label: 'Forescout (Days)',
                        data: [21, 14, 5, 7, 10, 7, 14, 3],
                        backgroundColor: this.chartColors.forescout,
                        barPercentage: 0.6,
                        categoryPercentage: 0.8
                    },
                    {
                        label: 'Portnox Cloud (Days)',
                        data: [1, 0, 0.5, 1, 2, 1, 2, 0.5],
                        backgroundColor: this.chartColors.portnox,
                        barPercentage: 0.6,
                        categoryPercentage: 0.8
                    }
                ]
            };
            
            this.charts['implementationComparison'] = new Chart(ctx, {
                type: 'bar',
                data: implementationData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    scales: {
                        x: {
                            stacked: true,
                            title: {
                                display: true,
                                text: 'Days Required'
                            },
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        y: {
                            stacked: true,
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
                    }
                }
            });
            
            console.log("Implementation comparison chart initialized");
        } catch (error) {
            console.warn("Error initializing implementation comparison chart:", error);
        }
    }
    
    /**
     * Initialize ROI chart
     */
    initializeROIChart() {
        const canvas = document.getElementById('roi-chart');
        if (!canvas) {
            console.warn("Canvas element not found for chart: roi-chart");
            return;
        }
        
        try {
            const ctx = canvas.getContext('2d');
            
            // Sample data - would come from actual ROI calculations
            const quarterLabels = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12'];
            
            const roiData = {
                labels: quarterLabels,
                datasets: [
                    {
                        label: 'Cumulative Savings',
                        data: [40000, 90000, 150000, 220000, 300000, 390000, 490000, 600000, 720000, 850000, 990000, 1150000],
                        borderColor: this.chartColors.portnox,
                        backgroundColor: 'rgba(27, 103, 178, 0.7)',
                        type: 'bar'
                    },
                    {
                        label: 'ROI (%)',
                        data: [-80, -60, -30, 0, 30, 70, 110, 160, 210, 270, 330, 400],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        type: 'line',
                        yAxisID: 'y1',
                        tension: 0.4,
                        pointRadius: 4,
                        pointBackgroundColor: 'rgba(75, 192, 192, 1)'
                    }
                ]
            };
            
            this.charts['roi'] = new Chart(ctx, {
                type: 'bar',
                data: roiData,
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
                    }
                }
            });
            
            console.log("ROI chart initialized");
        } catch (error) {
            console.warn("Error initializing ROI chart:", error);
        }
    }
    
    /**
     * Initialize sensitivity chart
     */
    initializeSensitivityChart() {
        const canvas = document.getElementById('sensitivity-chart');
        if (!canvas) {
            console.warn("Canvas element not found for chart: sensitivity-chart");
            return;
        }
        
        try {
            const ctx = canvas.getContext('2d');
            
            // Sample data - would come from sensitivity analysis
            const deviceCounts = [500, 1000, 2000, 3000, 5000, 7500, 10000];
            
            const sensitivityData = {
                labels: deviceCounts,
                datasets: [
                    {
                        label: 'Current Solution TCO',
                        data: [350000, 650000, 1200000, 1800000, 2900000, 4200000, 5500000],
                        borderColor: this.chartColors.ciscoISE,
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
            
            this.charts['sensitivity'] = new Chart(ctx, {
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
                    }
                }
            });
            
            console.log("Sensitivity chart initialized");
        } catch (error) {
            console.warn("Error initializing sensitivity chart:", error);
        }
    }

    /**
     * Initialize industry compliance comparison chart
     */
    initializeIndustryComplianceChart() {
        const canvas = document.getElementById('industry-compliance-chart');
        if (!canvas) {
            console.warn("Canvas element not found for chart: industry-compliance-chart");
            return;
        }
        
        try {
            const ctx = canvas.getContext('2d');
            
            // Sample data for industry compliance
            const complianceData = {
                labels: ['Healthcare', 'Financial', 'Government', 'Education', 'Retail', 'Manufacturing'],
                datasets: [
                    {
                        label: 'Cisco ISE',
                        data: [85, 90, 92, 80, 85, 78],
                        backgroundColor: this.chartColors.ciscoISE,
                        barPercentage: 0.7,
                        categoryPercentage: 0.8
                    },
                    {
                        label: 'Aruba ClearPass',
                        data: [80, 85, 88, 82, 80, 75],
                        backgroundColor: this.chartColors.arubaClearPass,
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
            
            this.charts['industryCompliance'] = new Chart(ctx, {
                type: 'bar',
                data: complianceData,
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
                    }
                }
            });
            
            console.log("Industry compliance chart initialized");
        } catch (error) {
            console.warn("Error initializing industry compliance chart:", error);
        }
    }
}

// Initialize chart manager when document is ready
document.addEventListener('DOMContentLoaded', function() {
    window.chartManager = new ChartManager();
});
