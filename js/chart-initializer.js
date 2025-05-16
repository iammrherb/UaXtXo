// Chart Initialization Script

// Define chart colors
const chartColors = {
    portnox: '#2c3e50',
    cisco: '#049fd9',
    aruba: '#ff8300',
    forescout: '#6b2a94',
    fortinac: '#c8102e',
    microsoft: '#00a4ef',
    securew2: '#1a4d80',
    noNac: '#f44336',
    year1: '#2ecc71',
    year2: '#3498db',
    year3: '#9b59b6',
    hardware: '#e74c3c',
    software: '#f39c12',
    maintenance: '#16a085',
    implementation: '#2980b9',
    operational: '#8e44ad'
};

// Initialize charts after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing charts...');
    
    // Set Chart.js defaults
    if (Chart) {
        Chart.defaults.font.family = "'Nunito', sans-serif";
        Chart.defaults.color = '#555';
        Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(0,0,0,0.7)';
        Chart.defaults.plugins.legend.position = 'bottom';
    }
    
    // Initialize placeholder charts
    initTcoComparisonChart();
    initCumulativeCostChart();
    initRoiChart();
    initValueDriversChart();
    initRiskComparisonChart();
    initBreachImpactChart();
    initInsuranceImpactChart();
    initVendorRadarChart();
    initCostStructureChart();
    initCostProjectionChart();
    initNistFrameworkChart();
    initArchitectureChart();
    initFeatureRadarChart();
});

// Initialize TCO comparison chart
function initTcoComparisonChart() {
    const ctx = document.getElementById('tco-comparison-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Portnox Cloud', 'Cisco ISE', 'Aruba ClearPass', 'Forescout'],
            datasets: [{
                label: 'Total 3-Year TCO',
                data: [202500, 450000, 375000, 325000],
                backgroundColor: [
                    chartColors.portnox,
                    chartColors.cisco,
                    chartColors.aruba,
                    chartColors.forescout
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Total Cost ($)'
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
                            return 'TCO: $' + context.raw.toLocaleString();
                        }
                    }
                },
                datalabels: {
                    display: true,
                    color: 'white',
                    font: {
                        weight: 'bold'
                    },
                    formatter: function(value) {
                        return '$' + value.toLocaleString();
                    }
                }
            }
        }
    });
}

// Initialize cumulative cost chart
function initCumulativeCostChart() {
    const ctx = document.getElementById('cumulative-cost-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Initial', 'Year 1', 'Year 2', 'Year 3'],
            datasets: [
                {
                    label: 'Portnox Cloud',
                    data: [15500, 66500, 134500, 202500],
                    borderColor: chartColors.portnox,
                    backgroundColor: 'rgba(44, 62, 80, 0.1)',
                    fill: true,
                    tension: 0.1
                },
                {
                    label: 'Cisco ISE',
                    data: [125000, 225000, 337500, 450000],
                    borderColor: chartColors.cisco,
                    backgroundColor: 'rgba(4, 159, 217, 0.1)',
                    fill: true,
                    tension: 0.1
                },
                {
                    label: 'Aruba ClearPass',
                    data: [95000, 188333, 281666, 375000],
                    borderColor: chartColors.aruba,
                    backgroundColor: 'rgba(255, 131, 0, 0.1)',
                    fill: true,
                    tension: 0.1
                }
            ]
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
                }
            }
        }
    });
}

// Initialize ROI chart
function initRoiChart() {
    const ctx = document.getElementById('roi-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Year 1', 'Year 2', 'Year 3', 'Cumulative'],
            datasets: [{
                label: 'Return on Investment (%)',
                data: [85, 195, 287, 287],
                backgroundColor: [
                    chartColors.year1,
                    chartColors.year2,
                    chartColors.year3,
                    '#3498db'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'ROI (%)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'ROI: ' + context.raw + '%';
                        }
                    }
                },
                datalabels: {
                    display: true,
                    color: 'white',
                    font: {
                        weight: 'bold'
                    },
                    formatter: function(value) {
                        return value + '%';
                    }
                }
            }
        }
    });
}

// Initialize value drivers chart
function initValueDriversChart() {
    const ctx = document.getElementById('value-drivers-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Hardware Savings',
                'License Savings',
                'IT Staff Efficiency',
                'Maintenance Reduction',
                'Risk Mitigation'
            ],
            datasets: [{
                data: [105000, 85000, 125000, 55000, 85000],
                backgroundColor: [
                    chartColors.hardware,
                    chartColors.software,
                    chartColors.operational,
                    chartColors.maintenance,
                    chartColors.implementation
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return context.label + ': $' + value.toLocaleString() + ' (' + percentage + '%)';
                        }
                    }
                },
                datalabels: {
                    display: true,
                    color: 'white',
                    font: {
                        weight: 'bold',
                        size: 11
                    },
                    formatter: function(value, context) {
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = Math.round((value / total) * 100);
                        return percentage + '%';
                    }
                }
            }
        }
    });
}

// Initialize risk comparison chart
function initRiskComparisonChart() {
    const ctx = document.getElementById('risk-comparison-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Data Breach Risk',
                'Compliance Risk',
                'Unauthorized Access',
                'Device Security',
                'Incident Detection',
                'Response Time'
            ],
            datasets: [
                {
                    label: 'Portnox Cloud',
                    data: [25, 20, 15, 20, 15, 15],
                    backgroundColor: 'rgba(44, 62, 80, 0.2)',
                    borderColor: chartColors.portnox,
                    pointBackgroundColor: chartColors.portnox,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: chartColors.portnox
                },
                {
                    label: 'No NAC',
                    data: [85, 90, 95, 80, 90, 95],
                    backgroundColor: 'rgba(244, 67, 54, 0.2)',
                    borderColor: chartColors.noNac,
                    pointBackgroundColor: chartColors.noNac,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: chartColors.noNac
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
                        display: false,
                        maxTicksLimit: 5
                    },
                    min: 0,
                    max: 100,
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
                            return context.dataset.label + ': ' + context.raw + '% Risk Level';
                        }
                    }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Initialize breach impact chart
function initBreachImpactChart() {
    const ctx = document.getElementById('breach-impact-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['No NAC', 'Basic NAC', 'Portnox Cloud'],
            datasets: [
                {
                    label: 'Potential Breach Cost',
                    data: [4850000, 3250000, 1650000],
                    backgroundColor: chartColors.hardware,
                    barPercentage: 0.6
                },
                {
                    label: 'Annual Risk Value',
                    data: [980000, 450000, 180000],
                    backgroundColor: chartColors.implementation,
                    barPercentage: 0.6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: false
                },
                y: {
                    stacked: false,
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Cost ($)'
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
                }
            }
        }
    });
}

// Initialize insurance impact chart
function initInsuranceImpactChart() {
    const ctx = document.getElementById('insurance-impact-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Without NAC', 'With Portnox'],
            datasets: [{
                label: 'Annual Premium',
                data: [165000, 148500],
                backgroundColor: [
                    chartColors.noNac,
                    chartColors.portnox
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Annual Premium ($)'
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
                            return 'Premium: $' + context.raw.toLocaleString();
                        }
                    }
                },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'end',
                    color: function(context) {
                        return context.dataIndex === 0 ? '#555' : '#555';
                    },
                    formatter: function(value) {
                        return '$' + value.toLocaleString();
                    }
                }
            }
        }
    });
}

// Initialize vendor radar chart
function initVendorRadarChart() {
    const ctx = document.getElementById('vendor-radar-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Cloud Architecture',
                'Ease of Implementation',
                'Cost Efficiency',
                'Device Visibility',
                'Policy Management',
                'Zero Trust Support',
                'Operational Simplicity',
                'Scalability',
                'Vendor Integrations'
            ],
            datasets: [
                {
                    label: 'Portnox Cloud',
                    data: [10, 9, 9, 8, 9, 9, 9, 9, 9],
                    backgroundColor: 'rgba(44, 62, 80, 0.2)',
                    borderColor: chartColors.portnox,
                    pointBackgroundColor: chartColors.portnox,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: chartColors.portnox
                },
                {
                    label: 'Cisco ISE',
                    data: [5, 4, 5, 8, 9, 7, 5, 9, 9],
                    backgroundColor: 'rgba(4, 159, 217, 0.2)',
                    borderColor: chartColors.cisco,
                    pointBackgroundColor: chartColors.cisco,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: chartColors.cisco
                },
                {
                    label: 'Aruba ClearPass',
                    data: [6, 5, 6, 8, 8, 7, 6, 8, 8],
                    backgroundColor: 'rgba(255, 131, 0, 0.2)',
                    borderColor: chartColors.aruba,
                    pointBackgroundColor: chartColors.aruba,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: chartColors.aruba
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
                        display: false,
                        maxTicksLimit: 5
                    },
                    min: 0,
                    max: 10,
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
                            return context.dataset.label + ': ' + context.raw + '/10';
                        }
                    }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Initialize cost structure chart
function initCostStructureChart() {
    const ctx = document.getElementById('cost-structure-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Portnox Cloud', 'Cisco ISE', 'Aruba ClearPass', 'Forescout'],
            datasets: [
                {
                    label: 'Hardware',
                    data: [0, 120000, 90000, 80000],
                    backgroundColor: chartColors.hardware
                },
                {
                    label: 'Software & Licensing',
                    data: [153000, 130000, 120000, 105000],
                    backgroundColor: chartColors.software
                },
                {
                    label: 'Implementation',
                    data: [15500, 80000, 60000, 50000],
                    backgroundColor: chartColors.implementation
                },
                {
                    label: 'Maintenance',
                    data: [0, 45000, 40000, 35000],
                    backgroundColor: chartColors.maintenance
                },
                {
                    label: 'Operational',
                    data: [34000, 75000, 65000, 55000],
                    backgroundColor: chartColors.operational
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Cost ($)'
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
                }
            }
        }
    });
}

// Initialize cost projection chart
function initCostProjectionChart() {
    const ctx = document.getElementById('cost-projection-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Initial', 'Year 1', 'Year 2', 'Year 3'],
            datasets: [
                {
                    label: 'Portnox Cloud',
                    data: [15500, 66500, 134500, 202500],
                    borderColor: chartColors.portnox,
                    backgroundColor: 'rgba(44, 62, 80, 0.1)',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Cisco ISE',
                    data: [125000, 225000, 337500, 450000],
                    borderColor: chartColors.cisco,
                    backgroundColor: 'rgba(4, 159, 217, 0.1)',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Aruba ClearPass',
                    data: [95000, 188333, 281666, 375000],
                    borderColor: chartColors.aruba,
                    backgroundColor: 'rgba(255, 131, 0, 0.1)',
                    fill: false,
                    tension: 0.1
                }
            ]
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
                }
            }
        }
    });
}

// Initialize NIST framework chart
function initNistFrameworkChart() {
    const ctx = document.getElementById('nist-framework-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Identify',
                'Protect',
                'Detect',
                'Respond',
                'Recover'
            ],
            datasets: [
                {
                    label: 'Portnox Cloud',
                    data: [90, 95, 85, 90, 80],
                    backgroundColor: 'rgba(44, 62, 80, 0.2)',
                    borderColor: chartColors.portnox,
                    pointBackgroundColor: chartColors.portnox,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: chartColors.portnox
                },
                {
                    label: 'No NAC',
                    data: [30, 25, 20, 15, 25],
                    backgroundColor: 'rgba(244, 67, 54, 0.2)',
                    borderColor: chartColors.noNac,
                    pointBackgroundColor: chartColors.noNac,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: chartColors.noNac
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
                        display: false,
                        maxTicksLimit: 5
                    },
                    min: 0,
                    max: 100,
                    pointLabels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '% Coverage';
                        }
                    }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Initialize architecture chart
function initArchitectureChart() {
    const ctx = document.getElementById('architecture-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Deployment Time', 'Infrastructure Cost', 'Maintenance Effort', 'Scaling Complexity', 'Update Process'],
            datasets: [
                {
                    label: 'Portnox Cloud (SaaS)',
                    data: [10, 5, 5, 5, 5],
                    backgroundColor: chartColors.portnox
                },
                {
                    label: 'Traditional NAC (On-Premises)',
                    data: [90, 85, 80, 75, 90],
                    backgroundColor: chartColors.cisco
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Relative Effort/Cost (%)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });
}

// Initialize feature radar chart
function initFeatureRadarChart() {
    const ctx = document.getElementById('feature-radar-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Device Visibility',
                'Policy Management',
                'Guest Access',
                'BYOD Support',
                'Cloud Integration',
                'Automated Remediation',
                'Third-Party Integration',
                'Scalability',
                'Ease of Use',
                'Reporting'
            ],
            datasets: [
                {
                    label: 'Portnox Cloud',
                    data: [8, 9, 8, 9, 10, 9, 9, 9, 9, 8],
                    backgroundColor: 'rgba(44, 62, 80, 0.2)',
                    borderColor: chartColors.portnox,
                    pointBackgroundColor: chartColors.portnox,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: chartColors.portnox
                },
                {
                    label: 'Cisco ISE',
                    data: [8, 9, 8, 8, 6, 8, 9, 9, 5, 8],
                    backgroundColor: 'rgba(4, 159, 217, 0.2)',
                    borderColor: chartColors.cisco,
                    pointBackgroundColor: chartColors.cisco,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: chartColors.cisco
                },
                {
                    label: 'Aruba ClearPass',
                    data: [8, 8, 9, 9, 7, 8, 8, 8, 6, 8],
                    backgroundColor: 'rgba(255, 131, 0, 0.2)',
                    borderColor: chartColors.aruba,
                    pointBackgroundColor: chartColors.aruba,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: chartColors.aruba
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
                        display: false,
                        maxTicksLimit: 5
                    },
                    min: 0,
                    max: 10,
                    pointLabels: {
                        font: {
                            size: 11
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '/10';
                        }
                    }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}
