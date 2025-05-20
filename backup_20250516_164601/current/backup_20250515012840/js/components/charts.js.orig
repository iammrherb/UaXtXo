/**
 * Charts Component for Total Cost Analyzer
 * Handles chart creation and updates
 */
const ChartsManager = (function() {
    // Chart instances
    const charts = {};
    
    // Chart colors
    const chartColors = {
        primary: '#2B82EC',
        secondary: '#65BD44',
        tertiary: '#F7941D',
        quaternary: '#9E2A2B',
        success: '#65BD44',
        warning: '#F7941D',
        danger: '#DC3545',
        neutral: '#6C757D',
        light: '#F8F9FA',
        dark: '#343A40',
        portnox: '#05547C',
        cisco: '#1BA0D7',
        aruba: '#F7941D',
        forescout: '#FF6A39',
        fortinac: '#EE3124',
        nps: '#00A4EF',
        securew2: '#7F52FF',
        noNac: '#6C757D'
    };
    
    // Initialize charts
    function initCharts() {
        destroyExistingCharts();
    console.log('Initializing charts...');
        
        // Configure Chart.js defaults
        if (typeof Chart !== 'undefined') {
            Chart.defaults.font.family = "'Inter', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
            Chart.defaults.color = '#495057';
            
            // Register plugin if available
            if (typeof ChartDataLabels !== 'undefined') {
                Chart.register(ChartDataLabels);
            }
        } else {
            console.warn('Chart.js not loaded');
            return;
        }
        
        // Initialize TCO comparison chart
    // Destroy existing charts before initialization to prevent "Canvas already in use" error
    function destroyExistingCharts() {
        if (window.Chart) {
            const chartIds = [
                "tco-comparison-chart",
                "current-breakdown-chart",
                "alternative-breakdown-chart",
                "cumulative-cost-chart",
                "feature-comparison-chart",
                "implementation-comparison-chart",
                "industry-compliance-chart",
                "roi-chart",
                "risk-analysis-chart",
                "sensitivity-chart",
                "sensitivity-chart-sidebar"
            ];
            
            chartIds.forEach(id => {
                const canvas = document.getElementById(id);
                if (canvas) {
                    const existingChart = Chart.getChart(canvas);
                    if (existingChart) {
                        existingChart.destroy();
                    }
                }
            });
        }
    }
        initTcoComparisonChart();
        
        // Initialize breakdown charts
        initBreakdownCharts();
        
        // Initialize cumulative cost chart
        initCumulativeCostChart();
        
        // Initialize feature comparison chart
        initFeatureComparisonChart();
        
        // Initialize implementation comparison chart
        initImplementationChart();
        
        // Initialize compliance chart
        initComplianceChart();
        
        // Initialize ROI chart
        initRoiChart();
        
        // Initialize risk analysis chart
        initRiskAnalysisChart();
        
        console.log('Charts initialized');
    }
    
    // Initialize TCO comparison chart
    // Destroy existing charts before initialization to prevent "Canvas already in use" error
    function destroyExistingCharts() {
        if (window.Chart) {
            const chartIds = [
                "tco-comparison-chart",
                "current-breakdown-chart",
                "alternative-breakdown-chart",
                "cumulative-cost-chart",
                "feature-comparison-chart",
                "implementation-comparison-chart",
                "industry-compliance-chart",
                "roi-chart",
                "risk-analysis-chart",
                "sensitivity-chart",
                "sensitivity-chart-sidebar"
            ];
            
            chartIds.forEach(id => {
                const canvas = document.getElementById(id);
                if (canvas) {
                    const existingChart = Chart.getChart(canvas);
                    if (existingChart) {
                        existingChart.destroy();
                    }
                }
            });
        }
    }
    function initTcoComparisonChart() {
        const ctx = document.getElementById('tco-comparison-chart');
        if (!ctx) return;
        
        charts.tcoComparison = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['1 Year', '3 Years', '5 Years'],
                datasets: [
                    {
                        label: 'Current Solution',
                        backgroundColor: chartColors.quaternary,
                        data: [0, 0, 0]
                    },
                    {
                        label: 'Portnox Cloud',
                        backgroundColor: chartColors.portnox,
                        data: [0, 0, 0]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    },
                    datalabels: {
                        color: '#fff',
                        anchor: 'center',
                        align: 'center',
                        formatter: function(value) {
                            return new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                            }).format(value);
                        },
                        font: {
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(value);
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Initialize breakdown charts
    function initBreakdownCharts() {
        // Current solution breakdown
        const currentCtx = document.getElementById('current-breakdown-chart');
        if (currentCtx) {
            charts.currentBreakdown = new Chart(currentCtx, {
                type: 'doughnut',
                data: {
                    labels: [
                        'License',
                        'Hardware',
                        'Implementation',
                        'Personnel',
                        'Maintenance',
                        'Training'
                    ],
                    datasets: [{
                        data: [0, 0, 0, 0, 0, 0],
                        backgroundColor: [
                            chartColors.primary,
                            chartColors.secondary,
                            chartColors.tertiary,
                            chartColors.quaternary,
                            chartColors.warning,
                            chartColors.danger
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                boxWidth: 15,
                                padding: 15
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.raw;
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = Math.round((value / total) * 100);
                                    
                                    return `${label}: ${new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(value)} (${percentage}%)`;
                                }
                            }
                        }
                    }
                }
            });
        }
        
        // Portnox breakdown
        const portnoxCtx = document.getElementById('alternative-breakdown-chart');
        if (portnoxCtx) {
            charts.portnoxBreakdown = new Chart(portnoxCtx, {
                type: 'doughnut',
                data: {
                    labels: [
                        'License',
                        'Hardware',
                        'Implementation',
                        'Personnel',
                        'Maintenance',
                        'Training'
                    ],
                    datasets: [{
                        data: [0, 0, 0, 0, 0, 0],
                        backgroundColor: [
                            chartColors.primary,
                            chartColors.secondary,
                            chartColors.tertiary,
                            chartColors.quaternary,
                            chartColors.warning,
                            chartColors.danger
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                boxWidth: 15,
                                padding: 15
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.raw;
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = Math.round((value / total) * 100);
                                    
                                    return `${label}: ${new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(value)} (${percentage}%)`;
                                }
                            }
                        }
                    }
                }
            });
        }
    }
    
    // Initialize cumulative cost chart
    function initCumulativeCostChart() {
        const ctx = document.getElementById('cumulative-cost-chart');
        if (!ctx) return;
        
        charts.cumulativeCost = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
                datasets: [
                    {
                        label: 'Current Solution',
                        backgroundColor: 'rgba(158, 42, 43, 0.1)',
                        borderColor: chartColors.quaternary,
                        pointBackgroundColor: chartColors.quaternary,
                        borderWidth: 2,
                        fill: true,
                        data: [0, 0, 0, 0, 0]
                    },
                    {
                        label: 'Portnox Cloud',
                        backgroundColor: 'rgba(5, 84, 124, 0.1)',
                        borderColor: chartColors.portnox,
                        pointBackgroundColor: chartColors.portnox,
                        borderWidth: 2,
                        fill: true,
                        data: [0, 0, 0, 0, 0]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(value);
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Initialize feature comparison chart
    function initFeatureComparisonChart() {
        const ctx = document.getElementById('feature-comparison-chart');
        if (!ctx) return;
        
        charts.featureComparison = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    'Authentication Methods',
                    'Device Discovery',
                    'Cloud Capabilities',
                    'Deployment Speed',
                    'Ease of Management',
                    'IoT Support',
                    'Integration Capabilities',
                    'Scalability'
                ],
                datasets: [
                    {
                        label: 'Current Solution',
                        backgroundColor: 'rgba(158, 42, 43, 0.2)',
                        borderColor: chartColors.quaternary,
                        pointBackgroundColor: chartColors.quaternary,
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: chartColors.quaternary,
                        data: [0, 0, 0, 0, 0, 0, 0, 0]
                    },
                    {
                        label: 'Portnox Cloud',
                        backgroundColor: 'rgba(5, 84, 124, 0.2)',
                        borderColor: chartColors.portnox,
                        pointBackgroundColor: chartColors.portnox,
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: chartColors.portnox,
                        data: [0, 0, 0, 0, 0, 0, 0, 0]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        ticks: {
                            beginAtZero: true,
                            max: 100,
                            stepSize: 20
                        }
                    }
                }
            }
        });
    }
    
    // Initialize implementation comparison chart
    function initImplementationChart() {
        const ctx = document.getElementById('implementation-comparison-chart');
        if (!ctx) return;
        
        charts.implementationComparison = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [
                    'Planning & Design',
                    'Setup & Configuration',
                    'Testing & Validation',
                    'Pilot Deployment',
                    'Full Deployment',
                    'Total'
                ],
                datasets: [
                    {
                        label: 'Current Solution',
                        backgroundColor: chartColors.quaternary,
                        data: [0, 0, 0, 0, 0, 0]
                    },
                    {
                        label: 'Portnox Cloud',
                        backgroundColor: chartColors.portnox,
                        data: [0, 0, 0, 0, 0, 0]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y + ' days';
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Days'
                        }
                    }
                }
            }
        });
    }
    
    // Initialize compliance chart
    function initComplianceChart() {
        const ctx = document.getElementById('industry-compliance-chart');
        if (!ctx) return;
        
        charts.complianceChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    'PCI DSS',
                    'HIPAA',
                    'GDPR',
                    'NIST 800-53',
                    'ISO 27001',
                    'SOC 2'
                ],
                datasets: [
                    {
                        label: 'Current Solution',
                        backgroundColor: 'rgba(158, 42, 43, 0.2)',
                        borderColor: chartColors.quaternary,
                        pointBackgroundColor: chartColors.quaternary,
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: chartColors.quaternary,
                        data: [0, 0, 0, 0, 0, 0]
                    },
                    {
                        label: 'Portnox Cloud',
                        backgroundColor: 'rgba(5, 84, 124, 0.2)',
                        borderColor: chartColors.portnox,
                        pointBackgroundColor: chartColors.portnox,
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: chartColors.portnox,
                        data: [0, 0, 0, 0, 0, 0]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        ticks: {
                            beginAtZero: true,
                            max: 100,
                            stepSize: 20
                        }
                    }
                }
            }
        });
    }
    
    // Initialize ROI chart
    function initRoiChart() {
        const ctx = document.getElementById('roi-chart');
        if (!ctx) return;
        
        charts.roiChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Month 0', 'Month 3', 'Month 6', 'Month 9', 'Month 12', 'Month 15', 'Month 18', 'Month 21', 'Month 24', 'Month 27', 'Month 30', 'Month 33', 'Month 36'],
                datasets: [
                    {
                        label: 'Current Solution',
                        borderColor: chartColors.quaternary,
                        backgroundColor: 'rgba(158, 42, 43, 0.1)',
                        fill: true,
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    },
                    {
                        label: 'Portnox Cloud',
                        borderColor: chartColors.portnox,
                        backgroundColor: 'rgba(5, 84, 124, 0.1)',
                        fill: true,
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    },
                    {
                        label: 'Break-even Point',
                        borderColor: chartColors.success,
                        backgroundColor: 'transparent',
                        borderDash: [5, 5],
                        borderWidth: 2,
                        pointRadius: 0,
                        pointHoverRadius: 0,
                        fill: false,
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(value);
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Initialize risk analysis chart
    function initRiskAnalysisChart() {
        const ctx = document.getElementById('risk-analysis-chart');
        if (!ctx) return;
        
        charts.riskAnalysisChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    'Breach Likelihood',
                    'Data Exposure Risk',
                    'Lateral Movement Risk',
                    'Detection Speed',
                    'Response Capability',
                    'Compliance Risk'
                ],
                datasets: [
                    {
                        label: 'Current Solution',
                        backgroundColor: 'rgba(158, 42, 43, 0.2)',
                        borderColor: chartColors.quaternary,
                        pointBackgroundColor: chartColors.quaternary,
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: chartColors.quaternary,
                        data: [0, 0, 0, 0, 0, 0]
                    },
                    {
                        label: 'Portnox Cloud',
                        backgroundColor: 'rgba(5, 84, 124, 0.2)',
                        borderColor: chartColors.portnox,
                        pointBackgroundColor: chartColors.portnox,
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: chartColors.portnox,
                        data: [0, 0, 0, 0, 0, 0]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        ticks: {
                            beginAtZero: true,
                            max: 100,
                            stepSize: 20
                        },
                        pointLabels: {
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Update charts with calculation results
    function updateCharts(results) {
        console.log('Updating charts with results:', results);
        
        // Update TCO comparison chart
        if (charts.tcoComparison) {
            const currentCosts = results.currentVendorCosts;
            const portnoxCosts = results.portnoxCosts;
            
            charts.tcoComparison.data.datasets[0].label = results.vendor.name;
            charts.tcoComparison.data.datasets[0].data = [
                currentCosts.annual,
                currentCosts.annual * 3,
                currentCosts.annual * 5
            ];
            
            charts.tcoComparison.data.datasets[1].data = [
                portnoxCosts.annual,
                portnoxCosts.annual * 3,
                portnoxCosts.annual * 5
            ];
            
            charts.tcoComparison.update();
        }
        
        // Update breakdown charts
        if (charts.currentBreakdown) {
            const breakdown = results.currentVendorCosts.breakdown;
            charts.currentBreakdown.data.datasets[0].data = [
                breakdown.license,
                breakdown.hardware,
                breakdown.implementation,
                breakdown.personnel,
                breakdown.maintenance,
                breakdown.training
            ];
            charts.currentBreakdown.update();
        }
        
        if (charts.portnoxBreakdown) {
            const breakdown = results.portnoxCosts.breakdown;
            charts.portnoxBreakdown.data.datasets[0].data = [
                breakdown.license,
                breakdown.hardware,
                breakdown.implementation,
                breakdown.personnel,
                breakdown.maintenance,
                breakdown.training
            ];
            charts.portnoxBreakdown.update();
        }
        
        // Update cumulative cost chart
        if (charts.cumulativeCost) {
            const currentAnnual = results.currentVendorCosts.annual;
            const portnoxAnnual = results.portnoxCosts.annual;
            
            charts.cumulativeCost.data.datasets[0].label = results.vendor.name;
            charts.cumulativeCost.data.datasets[0].data = [
                currentAnnual,
                currentAnnual * 2,
                currentAnnual * 3,
                currentAnnual * 4,
                currentAnnual * 5
            ];
            
            charts.cumulativeCost.data.datasets[1].data = [
                portnoxAnnual,
                portnoxAnnual * 2,
                portnoxAnnual * 3,
                portnoxAnnual * 4,
                portnoxAnnual * 5
            ];
            
            charts.cumulativeCost.update();
        }
        
        // Update feature comparison chart
        if (charts.featureComparison) {
            // Scores based on vendor (scaled to 0-100)
            const vendorScores = getFeatureScores(results.vendor.name);
            const portnoxScores = getFeatureScores('Portnox Cloud');
            
            charts.featureComparison.data.datasets[0].label = results.vendor.name;
            charts.featureComparison.data.datasets[0].data = vendorScores;
            charts.featureComparison.data.datasets[1].data = portnoxScores;
            
            charts.featureComparison.update();
        }
        
        // Update implementation comparison chart
        if (charts.implementationComparison) {
            const currentTimeline = results.currentVendorCosts.implementationTimeline;
            const portnoxTimeline = results.portnoxCosts.implementationTimeline;
            
            const currentPhases = (currentTimeline && currentTimeline.phases ? currentTimeline.phases : []);
            const portnoxPhases = (portnoxTimeline && portnoxTimeline.phases ? portnoxTimeline.phases : []);
            
            charts.implementationComparison.data.datasets[0].label = results.vendor.name;
            charts.implementationComparison.data.datasets[0].data = [
                currentPhases[0].duration,
                currentPhases[1].duration,
                currentPhases[2].duration,
                currentPhases[3].duration,
                currentPhases[4].duration,
                currentTimeline.days
            ];
            
            charts.implementationComparison.data.datasets[1].data = [
                portnoxPhases[0].duration,
                portnoxPhases[1].duration,
                portnoxPhases[2].duration,
                portnoxPhases[3].duration,
                portnoxPhases[4].duration,
                portnoxTimeline.days
            ];
            
            charts.implementationComparison.update();
        }
        
        // Update compliance chart
        if (charts.complianceChart) {
            // Compliance scores based on vendor
            const vendorScores = getComplianceScores(results.vendor.name, results.params.industry);
            const portnoxScores = getComplianceScores('Portnox Cloud', results.params.industry);
            
            charts.complianceChart.data.datasets[0].label = results.vendor.name;
            charts.complianceChart.data.datasets[0].data = vendorScores;
            charts.complianceChart.data.datasets[1].data = portnoxScores;
            
            charts.complianceChart.update();
        }
        
        // Update ROI chart
        if (charts.roiChart) {
            const breakEvenMonth = results.savings.breakEvenMonths;
            const currentAnnual = results.currentVendorCosts.annual;
            const portnoxAnnual = results.portnoxCosts.annual;
            const portnoxImplementation = results.portnoxCosts.breakdown.implementation * 12; // Convert to monthly
            
            // Generate monthly cumulative data for 36 months
            const currentData = [];
            const portnoxData = [];
            const breakEvenLine = [];
            
            for (let i = 0; i < 13; i++) {
                // Current solution: monthly cost accumulates linearly
                currentData.push(currentAnnual / 12 * i);
                
                // Portnox: initial implementation cost plus monthly costs
                portnoxData.push(i === 0 ? portnoxImplementation : portnoxImplementation + (portnoxAnnual / 12 * i));
                
                // Break-even line: horizontal line at break-even point
                breakEvenLine.push(i === 0 ? 0 : null);
            }
            
            // Set break-even point
            if (breakEvenMonth > 0 && breakEvenMonth <= 36) {
                const breakEvenValue = portnoxData[Math.ceil(breakEvenMonth / 3)];
                const monthIndex = Math.ceil(breakEvenMonth / 3);
                breakEvenLine[monthIndex] = breakEvenValue;
            }
            
            charts.roiChart.data.datasets[0].label = results.vendor.name;
            charts.roiChart.data.datasets[0].data = currentData;
            charts.roiChart.data.datasets[1].data = portnoxData;
            charts.roiChart.data.datasets[2].data = breakEvenLine;
            
            charts.roiChart.update();
        }
        
        // Update risk analysis chart
        if (charts.riskAnalysisChart) {
            // Risk scores based on vendor (inverted scale - higher is better/lower risk)
            const vendorRiskScores = getRiskScores(results.vendor.name);
            const portnoxRiskScores = getRiskScores('Portnox Cloud');
            
            charts.riskAnalysisChart.data.datasets[0].label = results.vendor.name;
            charts.riskAnalysisChart.data.datasets[0].data = vendorRiskScores;
            charts.riskAnalysisChart.data.datasets[1].data = portnoxRiskScores;
            
            charts.riskAnalysisChart.update();
        }
    }
    
    // Get feature scores for a vendor
    function getFeatureScores(vendor) {
        // Feature scores for each vendor (0-100 scale)
        const vendorFeatureScores = {
            'Cisco ISE': [90, 80, 60, 40, 50, 75, 85, 80],
            'Aruba ClearPass': [85, 75, 65, 50, 60, 70, 80, 75],
            'Forescout': [75, 95, 60, 45, 55, 90, 75, 70],
            'FortiNAC': [80, 70, 55, 55, 65, 65, 70, 75],
            'Microsoft NPS': [50, 40, 30, 60, 40, 35, 45, 50],
            'SecureW2': [75, 60, 90, 70, 80, 50, 65, 85],
            'Portnox Cloud': [85, 90, 95, 95, 90, 85, 80, 95],
            'No NAC Solution': [0, 0, 0, 0, 0, 0, 0, 0]
        };
        
        return vendorFeatureScores[vendor] || [50, 50, 50, 50, 50, 50, 50, 50];
    }
    
    // Get compliance scores for a vendor
    function getComplianceScores(vendor, industry) {
        // Compliance scores for each vendor (0-100 scale)
        const vendorComplianceScores = {
            'Cisco ISE': [80, 75, 70, 85, 80, 75],
            'Aruba ClearPass': [75, 70, 65, 80, 75, 70],
            'Forescout': [80, 80, 70, 80, 75, 75],
            'FortiNAC': [75, 75, 70, 80, 75, 70],
            'Microsoft NPS': [60, 55, 55, 70, 65, 60],
            'SecureW2': [70, 70, 75, 75, 70, 65],
            'Portnox Cloud': [90, 95, 90, 95, 95, 90],
            'No NAC Solution': [10, 10, 10, 10, 10, 10]
        };
        
        // Industry-specific adjustments
        const industryAdjustments = {
            'healthcare': [0, 10, 0, 0, 0, 0], // Higher HIPAA compliance
            'financial': [10, 0, 5, 0, 0, 5], // Higher PCI compliance
            'government': [0, 0, 0, 10, 5, 0], // Higher NIST compliance
            'retail': [10, 0, 5, 0, 0, 0] // Higher PCI compliance
        };
        
        const baseScores = vendorComplianceScores[vendor] || [50, 50, 50, 50, 50, 50];
        const adjustments = industryAdjustments[industry] || [0, 0, 0, 0, 0, 0];
        
        // Apply adjustments, keeping within 0-100 range
        return baseScores.map((score, i) => Math.min(100, Math.max(0, score + adjustments[i])));
    }
    
    // Get risk scores for a vendor
    function getRiskScores(vendor) {
        // Risk scores for each vendor (0-100 scale where higher is better/lower risk)
        const vendorRiskScores = {
            'Cisco ISE': [75, 80, 85, 70, 75, 80],
            'Aruba ClearPass': [70, 75, 80, 65, 70, 75],
            'Forescout': [75, 85, 80, 80, 75, 70],
            'FortiNAC': [70, 75, 75, 65, 70, 70],
            'Microsoft NPS': [50, 55, 60, 45, 50, 55],
            'SecureW2': [75, 70, 65, 70, 65, 70],
            'Portnox Cloud': [85, 90, 85, 90, 85, 90],
            'No NAC Solution': [10, 10, 10, 10, 10, 10]
        };
        
        return vendorRiskScores[vendor] || [50, 50, 50, 50, 50, 50];
    }
    
    // Public API
    return {
        initCharts,
        updateCharts,
        charts,
        chartColors
    };
})();

// Initialize charts when document is ready
document.addEventListener('DOMContentLoaded', function() {
    ChartsManager.initCharts();
});
