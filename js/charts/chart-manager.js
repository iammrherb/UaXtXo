// Chart Manager - Professional Enterprise Charts
class ChartManager {
    constructor() {
        this.charts = {};
        this.defaultOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    padding: 12,
                    cornerRadius: 4,
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 13 },
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
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            }
        };
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.createAllCharts());
        } else {
            this.createAllCharts();
        }
    }

    createAllCharts() {
        // Financial Charts
        this.createTCOComparisonChart();
        this.createCostBreakdownChart();
        this.createCashFlowChart();
        this.createCumulativeCostChart();
        
        // Technical Charts
        this.createCapabilityRadarChart();
        this.createImplementationTimelineChart();
        
        // Security Charts
        this.createSecurityPostureChart();
        this.createRiskReductionChart();
        
        // Vendor Comparison Charts
        this.createVendorComparisonRadar();
        
        // Compliance Charts
        this.createComplianceScoreChart();
        
        // Update data tables
        this.updateDataTables();
    }

    createTCOComparisonChart() {
        const ctx = document.getElementById('tco-comparison-chart');
        if (!ctx) return;

        this.charts.tcoComparison = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Year 1', 'Year 2', 'Year 3', '3-Year Total'],
                datasets: [{
                    label: 'Current Solution',
                    data: [350000, 280000, 295000, 925000],
                    backgroundColor: '#ea4335',
                    borderRadius: 4
                }, {
                    label: 'Portnox Cloud',
                    data: [210000, 96000, 96000, 402000],
                    backgroundColor: '#34a853',
                    borderRadius: 4
                }]
            },
            options: {
                ...this.defaultOptions,
                plugins: {
                    ...this.defaultOptions.plugins,
                    title: {
                        display: true,
                        text: 'Total Cost Comparison - 35% Reduction with Portnox',
                        padding: 20,
                        font: { size: 16, weight: 'bold' }
                    },
                    datalabels: {
                        anchor: 'end',
                        align: 'top',
                        formatter: (value) => `$${value.toLocaleString()}`,
                        font: { weight: 'bold' }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => `$${value.toLocaleString()}`
                        }
                    }
                }
            }
        });
    }

    createCostBreakdownChart() {
        const ctx = document.getElementById('cost-breakdown-chart');
        if (!ctx) return;

        this.charts.costBreakdown = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Personnel', 'Licensing', 'Hardware', 'Maintenance', 'Implementation'],
                datasets: [{
                    data: [240000, 180000, 150000, 135000, 125000],
                    backgroundColor: [
                        '#0E4296',
                        '#00A4E4',
                        '#6CBE45',
                        '#FFC107',
                        '#DC3545'
                    ]
                }]
            },
            options: {
                ...this.defaultOptions,
                plugins: {
                    ...this.defaultOptions.plugins,
                    legend: {
                        position: 'right'
                    },
                    datalabels: {
                        formatter: (value, ctx) => {
                            const sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / sum) * 100).toFixed(1) + '%';
                            return `${percentage}\n$${value.toLocaleString()}`;
                        },
                        color: '#fff',
                        font: { weight: 'bold' }
                    }
                }
            }
        });
    }

    createCashFlowChart() {
        const ctx = document.getElementById('cash-flow-chart');
        if (!ctx) return;

        this.charts.cashFlow = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Initial', 'Month 6', 'Month 12', 'Month 18', 'Month 24', 'Month 30', 'Month 36'],
                datasets: [{
                    label: 'Current Solution',
                    data: [-275000, -340000, -425000, -510000, -595000, -680000, -765000],
                    borderColor: '#ea4335',
                    backgroundColor: 'rgba(234, 67, 53, 0.1)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Portnox Cloud',
                    data: [-25000, -73000, -121000, -169000, -217000, -265000, -313000],
                    borderColor: '#34a853',
                    backgroundColor: 'rgba(52, 168, 83, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                ...this.defaultOptions,
                plugins: {
                    ...this.defaultOptions.plugins,
                    title: {
                        display: true,
                        text: 'Cash Flow Impact Analysis',
                        padding: 20,
                        font: { size: 16, weight: 'bold' }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: value => `${value < 0 ? '-' : ''}$${Math.abs(value).toLocaleString()}`
                        }
                    }
                }
            }
        });
    }

    createCumulativeCostChart() {
        const ctx = document.getElementById('cumulative-cost-chart');
        if (!ctx) return;

        const months = Array.from({length: 37}, (_, i) => `Month ${i}`);
        const currentSolution = months.map((_, i) => i * 25000);
        const portnoxCloud = months.map((_, i) => i * 11000);

        this.charts.cumulativeCost = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Current Solution',
                    data: currentSolution,
                    borderColor: '#ea4335',
                    backgroundColor: 'rgba(234, 67, 53, 0.1)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Portnox Cloud',
                    data: portnoxCloud,
                    borderColor: '#34a853',
                    backgroundColor: 'rgba(52, 168, 83, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                ...this.defaultOptions,
                plugins: {
                    ...this.defaultOptions.plugins,
                    title: {
                        display: true,
                        text: 'Cumulative Cost Over 3 Years',
                        padding: 20,
                        font: { size: 16, weight: 'bold' }
                    },
                    datalabels: {
                        display: false // Too cluttered for line chart
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => `$${value.toLocaleString()}`
                        }
                    }
                }
            }
        });
    }

    createCapabilityRadarChart() {
        const ctx = document.getElementById('capability-radar-chart');
        if (!ctx) return;

        this.charts.capabilityRadar = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    'Cloud Native',
                    'Zero Trust',
                    'Scalability',
                    'API Integration',
                    'Automation',
                    'User Experience',
                    'Deployment Speed',
                    'Maintenance'
                ],
                datasets: [{
                    label: 'Current Solution',
                    data: [3, 5, 6, 7, 5, 6, 4, 3],
                    backgroundColor: 'rgba(234, 67, 53, 0.2)',
                    borderColor: '#ea4335',
                    pointBackgroundColor: '#ea4335'
                }, {
                    label: 'Portnox Cloud',
                    data: [10, 10, 10, 9, 9, 9, 10, 10],
                    backgroundColor: 'rgba(52, 168, 83, 0.2)',
                    borderColor: '#34a853',
                    pointBackgroundColor: '#34a853'
                }]
            },
            options: {
                ...this.defaultOptions,
                plugins: {
                    ...this.defaultOptions.plugins,
                    datalabels: {
                        display: false
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                            stepSize: 2
                        }
                    }
                }
            }
        });
    }

    createImplementationTimelineChart() {
        const ctx = document.getElementById('implementation-timeline-chart');
        if (!ctx) return;

        this.charts.implementationTimeline = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Planning', 'Hardware Setup', 'Configuration', 'Testing', 'Deployment', 'Training'],
                datasets: [{
                    label: 'Current Solution (Days)',
                    data: [14, 21, 14, 14, 21, 14],
                    backgroundColor: '#ea4335'
                }, {
                    label: 'Portnox Cloud (Days)',
                    data: [3, 0, 5, 2, 3, 1],
                    backgroundColor: '#34a853'
                }]
            },
            options: {
                ...this.defaultOptions,
                indexAxis: 'y',
                plugins: {
                    ...this.defaultOptions.plugins,
                    title: {
                        display: true,
                        text: 'Implementation Timeline Comparison',
                        padding: 20,
                        font: { size: 16, weight: 'bold' }
                    },
                    datalabels: {
                        anchor: 'end',
                        align: 'end',
                        formatter: (value) => `${value} days`,
                        font: { weight: 'bold' }
                    }
                }
            }
        });
    }

    createSecurityPostureChart() {
        const ctx = document.getElementById('security-posture-chart');
        if (!ctx) return;

        this.charts.securityPosture = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    'Access Control',
                    'Network Segmentation',
                    'Device Visibility',
                    'Policy Enforcement',
                    'Threat Detection',
                    'Compliance Automation',
                    'Incident Response'
                ],
                datasets: [{
                    label: 'Current State',
                    data: [6, 5, 6, 6, 5, 4, 5],
                    backgroundColor: 'rgba(234, 67, 53, 0.2)',
                    borderColor: '#ea4335',
                    pointBackgroundColor: '#ea4335'
                }, {
                    label: 'With Portnox',
                    data: [9, 10, 10, 9, 9, 10, 9],
                    backgroundColor: 'rgba(52, 168, 83, 0.2)',
                    borderColor: '#34a853',
                    pointBackgroundColor: '#34a853'
                }]
            },
            options: {
                ...this.defaultOptions,
                plugins: {
                    ...this.defaultOptions.plugins,
                    title: {
                        display: true,
                        text: 'Security Posture Enhancement',
                        padding: 20,
                        font: { size: 16, weight: 'bold' }
                    },
                    datalabels: {
                        display: false
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                            stepSize: 2
                        }
                    }
                }
            }
        });
    }

    createRiskReductionChart() {
        const ctx = document.getElementById('risk-reduction-chart');
        if (!ctx) return;

        this.charts.riskReduction = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Unauthorized Access', 'Data Breaches', 'Compliance Violations', 'Insider Threats', 'Malware Attacks'],
                datasets: [{
                    label: 'Risk Level (Current)',
                    data: [8, 7, 6, 6, 7],
                    backgroundColor: '#ea4335'
                }, {
                    label: 'Risk Level (Portnox)',
                    data: [2, 2, 1, 2, 2],
                    backgroundColor: '#34a853'
                }]
            },
            options: {
                ...this.defaultOptions,
                indexAxis: 'y',
                plugins: {
                    ...this.defaultOptions.plugins,
                    title: {
                        display: true,
                        text: 'Risk Reduction Analysis - 68% Average Reduction',
                        padding: 20,
                        font: { size: 16, weight: 'bold' }
                    },
                    datalabels: {
                        anchor: 'end',
                        align: 'end',
                        formatter: (value) => `Level ${value}`,
                        font: { weight: 'bold' }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    createVendorComparisonRadar() {
        const ctx = document.getElementById('vendor-comparison-radar');
        if (!ctx) return;

        this.charts.vendorComparison = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    'Total Cost of Ownership',
                    'Technical Capabilities',
                    'Security Features',
                    'Implementation Speed',
                    'Scalability',
                    'Support & Service',
                    'Innovation',
                    'Future-Readiness'
                ],
                datasets: [{
                    label: 'Current Vendor',
                    data: [6, 7, 7, 5, 6, 7, 6, 5],
                    backgroundColor: 'rgba(234, 67, 53, 0.2)',
                    borderColor: '#ea4335',
                    pointBackgroundColor: '#ea4335'
                }, {
                    label: 'Portnox',
                    data: [9, 9, 10, 10, 10, 9, 10, 10],
                    backgroundColor: 'rgba(52, 168, 83, 0.2)',
                    borderColor: '#34a853',
                    pointBackgroundColor: '#34a853'
                }]
            },
            options: {
                ...this.defaultOptions,
                plugins: {
                    ...this.defaultOptions.plugins,
                    title: {
                        display: true,
                        text: 'Comprehensive Vendor Comparison - Portnox scores 9.4/10 vs. 6.5/10',
                        padding: 20,
                        font: { size: 16, weight: 'bold' }
                    },
                    datalabels: {
                        display: false
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                            stepSize: 2
                        }
                    }
                }
            }
        });
    }

    createComplianceScoreChart() {
        const ctx = document.getElementById('compliance-score-chart');
        if (!ctx) return;

        this.charts.complianceScore = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['ISO 27001', 'NIST', 'PCI DSS', 'HIPAA', 'GDPR', 'SOX', 'CMMC'],
                datasets: [{
                    label: 'Current Coverage %',
                    data: [65, 70, 60, 68, 72, 65, 55],
                    backgroundColor: '#ea4335',
                    barPercentage: 0.8
                }, {
                    label: 'Portnox Coverage %',
                    data: [95, 98, 92, 96, 94, 95, 90],
                    backgroundColor: '#34a853',
                    barPercentage: 0.8
                }]
            },
            options: {
                ...this.defaultOptions,
                plugins: {
                    ...this.defaultOptions.plugins,
                    title: {
                        display: true,
                        text: 'Compliance Framework Coverage',
                        padding: 20,
                        font: { size: 16, weight: 'bold' }
                    },
                    datalabels: {
                        anchor: 'end',
                        align: 'top',
                        formatter: (value) => `${value}%`,
                        font: { weight: 'bold' }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: value => `${value}%`
                        }
                    }
                }
            }
        });
    }

    updateDataTables() {
        this.updateCostBreakdownTable();
    }

    updateCostBreakdownTable() {
        const table = document.getElementById('cost-breakdown-table');
        if (!table) return;

        const tbody = table.querySelector('tbody');
        const data = [
            { category: 'Capital Expenditure', current: 150000, portnox: 0 },
            { category: 'Annual Licensing', current: 105000, portnox: 96000 },
            { category: 'Maintenance & Support', current: 45000, portnox: 0 },
            { category: 'Implementation Costs', current: 125000, portnox: 25000 },
            { category: 'Personnel (3-year)', current: 360000, portnox: 36000 },
            { category: 'Training & Onboarding', current: 25000, portnox: 5000 },
            { category: 'Downtime & Risk Costs', current: 115000, portnox: 12000 },
            { category: 'Total (3-year)', current: 925000, portnox: 402000 }
        ];

        tbody.innerHTML = data.map(row => {
            const savings = row.current - row.portnox;
            const percentage = ((savings / row.current) * 100).toFixed(1);
            
            return `
                <tr${row.category === 'Total (3-year)' ? ' style="font-weight: bold; background: #f8f9fa;"' : ''}>
                    <td>${row.category}</td>
                    <td>${row.current.toLocaleString()}</td>
                    <td>${row.portnox.toLocaleString()}</td>
                    <td>${savings.toLocaleString()}</td>
                    <td>${percentage}%</td>
                </tr>
            `;
        }).join('');
    }

    destroy() {
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.charts = {};
    }
}

// Initialize Chart Manager
window.chartManager = new ChartManager();
