/**
 * Enhanced chart configurations to highlight Portnox's competitive advantages
 * Designed for executive, financial, technical, security, and compliance audiences
 */
document.addEventListener('DOMContentLoaded', function() {
    // Set Portnox-specific chart theme and colors
    const portnoxColors = {
        primary: '#1b67b2',
        secondary: '#65BD44',
        accent: '#05547C',
        warning: '#f59e0b',
        danger: '#ef4444',
        neutral: '#64748b',
        competitors: {
            cisco: '#049fd9',
            aruba: '#f78e1e',
            forescout: '#d64000',
            fortinac: '#ee3124',
            nps: '#7fba00',
            securew2: '#00b2e3'
        }
    };
    
    // Ensure Chart.js is available
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }
    
    // Set default chart options
    Chart.defaults.font.family = '"Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    Chart.defaults.color = '#333';
    Chart.defaults.responsive = true;
    Chart.defaults.maintainAspectRatio = false;
    
    // Custom plugin to add colored background to charts
    const chartBackgroundPlugin = {
        id: 'chartBackgroundPlugin',
        beforeDraw: (chart) => {
            const ctx = chart.canvas.getContext('2d');
            ctx.save();
            ctx.fillStyle = '#f8f9fa';
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
        }
    };
    
    // Register the plugin
    Chart.register(chartBackgroundPlugin);
    
    // Enhanced TCO Comparison Chart
    function createTcoComparisonChart() {
        const ctx = document.getElementById('tco-comparison-chart');
        if (!ctx) return;
        
        // Sample data - will be replaced with actual data from calculations
        const data = {
            labels: ['Initial Cost', 'Implementation', 'Training', 'Maintenance', 'Staff', 'Total'],
            datasets: [
                {
                    label: 'Current Solution',
                    data: [100000, 75000, 30000, 50000, 120000, 375000],
                    backgroundColor: portnoxColors.neutral,
                    borderColor: portnoxColors.neutral,
                    borderWidth: 1
                },
                {
                    label: 'Portnox Cloud',
                    data: [48000, 10000, 5000, 0, 30000, 93000],
                    backgroundColor: portnoxColors.primary,
                    borderColor: portnoxColors.primary,
                    borderWidth: 1
                }
            ]
        };
        
        const options = {
            indexAxis: 'y',
            plugins: {
                title: {
                    display: true,
                    text: '3-Year TCO Comparison',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
                        }
                    }
                },
                datalabels: {
                    color: '#fff',
                    anchor: 'center',
                    align: 'center',
                    formatter: function(value) {
                        if (value < 20000) return ''; // Don't show small values
                        return '$' + (value/1000).toFixed(0) + 'K';
                    },
                    font: {
                        weight: 'bold'
                    }
                }
            },
            scales: {
                x: {
                    stacked: false,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                },
                y: {
                    stacked: false,
                    grid: {
                        display: false
                    }
                }
            }
        };
        
        // Create chart if canvas exists
        try {
            new Chart(ctx, {
                type: 'bar',
                data: data,
                options: options,
                plugins: [ChartDataLabels]
            });
        } catch (e) {
            console.error('Error creating TCO comparison chart:', e);
        }
    }
    
    // Feature Comparison Radar Chart
    function createFeatureComparisonChart() {
        const ctx = document.getElementById('feature-comparison-chart');
        if (!ctx) return;
        
        // Sample data - will be replaced with actual data
        const data = {
            labels: [
                'Deployment Speed', 
                'Cloud Native', 
                'Management Ease', 
                'Automatic Updates',
                'TCO', 
                'Device Visibility',
                'Multi-Vendor Support'
            ],
            datasets: [
                {
                    label: 'Portnox Cloud',
                    data: [95, 100, 90, 100, 95, 90, 85],
                    backgroundColor: 'rgba(27, 103, 178, 0.2)',
                    borderColor: portnoxColors.primary,
                    borderWidth: 2,
                    pointBackgroundColor: portnoxColors.primary,
                    pointRadius: 4
                },
                {
                    label: 'Current Solution',
                    data: [40, 30, 45, 35, 35, 70, 65],
                    backgroundColor: 'rgba(100, 116, 139, 0.2)',
                    borderColor: portnoxColors.neutral,
                    borderWidth: 2,
                    pointBackgroundColor: portnoxColors.neutral,
                    pointRadius: 4
                }
            ]
        };
        
        const options = {
            plugins: {
                title: {
                    display: true,
                    text: 'Feature Comparison',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
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
            },
            scales: {
                r: {
                    angleLines: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        stepSize: 20
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    pointLabels: {
                        font: {
                            size: 12
                        }
                    }
                }
            }
        };
        
        // Create chart if canvas exists
        try {
            new Chart(ctx, {
                type: 'radar',
                data: data,
                options: options
            });
        } catch (e) {
            console.error('Error creating feature comparison chart:', e);
        }
    }
    
    // Implementation Timeline Comparison Chart
    function createImplementationComparisonChart() {
        const ctx = document.getElementById('implementation-comparison-chart');
        if (!ctx) return;
        
        // Sample data - will be replaced with actual data
        const data = {
            labels: ['Hardware Procurement', 'Software Installation', 'Initial Configuration', 'Network Integration', 'Testing', 'Documentation', 'Staff Training', 'Go-Live'],
            datasets: [
                {
                    label: 'Current Solution (Days)',
                    data: [30, 14, 21, 14, 7, 7, 14, 5],
                    backgroundColor: portnoxColors.neutral,
                    borderColor: portnoxColors.neutral,
                    borderWidth: 1,
                    stack: 'Stack 0'
                },
                {
                    label: 'Portnox Cloud (Days)',
                    data: [0, 0.5, 1, 0.5, 1, 0.5, 1, 0.5],
                    backgroundColor: portnoxColors.primary,
                    borderColor: portnoxColors.primary,
                    borderWidth: 1,
                    stack: 'Stack 1'
                }
            ]
        };
        
        const options = {
            indexAxis: 'y',
            plugins: {
                title: {
                    display: true,
                    text: 'Implementation Timeline Comparison (Days)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const days = context.raw;
                            return `${context.dataset.label}: ${days} day${days !== 1 ? 's' : ''}`;
                        }
                    }
                },
                datalabels: {
                    color: '#fff',
                    anchor: 'center',
                    align: 'center',
                    formatter: function(value) {
                        if (value < 3) return ''; // Don't show small values
                        return value;
                    },
                    font: {
                        weight: 'bold'
                    }
                }
            },
            scales: {
                x: {
                    stacked: false,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    title: {
                        display: true,
                        text: 'Days'
                    }
                },
                y: {
                    stacked: false,
                    grid: {
                        display: false
                    }
                }
            }
        };
        
        // Create chart if canvas exists
        try {
            new Chart(ctx, {
                type: 'bar',
                data: data,
                options: options,
                plugins: [ChartDataLabels]
            });
        } catch (e) {
            console.error('Error creating implementation comparison chart:', e);
        }
    }
    
    // ROI Analysis Chart
    function createRoiAnalysisChart() {
        const ctx = document.getElementById('roi-chart');
        if (!ctx) return;
        
        // Sample data - will be replaced with actual data
        const data = {
            labels: ['Year 1', 'Year 2', 'Year 3'],
            datasets: [
                {
                    label: 'Current Solution Cost',
                    data: [125000, 125000, 125000],
                    backgroundColor: portnoxColors.neutral,
                    borderColor: portnoxColors.neutral,
                    borderWidth: 1,
                    type: 'bar'
                },
                {
                    label: 'Portnox Cloud Cost',
                    data: [48000, 30000, 15000],
                    backgroundColor: portnoxColors.primary,
                    borderColor: portnoxColors.primary,
                    borderWidth: 1,
                    type: 'bar'
                },
                {
                    label: 'Cumulative Savings',
                    data: [77000, 172000, 282000],
                    borderColor: portnoxColors.secondary,
                    backgroundColor: 'rgba(101, 189, 68, 0.2)',
                    borderWidth: 2,
                    type: 'line',
                    fill: true,
                    tension: 0.4,
                    yAxisID: 'y1'
                }
            ]
        };
        
        const options = {
            plugins: {
                title: {
                    display: true,
                    text: 'ROI Analysis',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
                        }
                    }
                },
                datalabels: {
                    display: function(context) {
                        return context.datasetIndex < 2; // Only show for bars
                    },
                    color: '#fff',
                    anchor: 'center',
                    align: 'center',
                    formatter: function(value) {
                        return '$' + (value/1000).toFixed(0) + 'K';
                    },
                    font: {
                        weight: 'bold'
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    },
                    title: {
                        display: true,
                        text: 'Annual Cost'
                    }
                },
                y1: {
                    position: 'right',
                    grid: {
                        display: false
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    },
                    title: {
                        display: true,
                        text: 'Cumulative Savings'
                    }
                }
            }
        };
        
        // Create chart if canvas exists
        try {
            new Chart(ctx, {
                type: 'bar',
                data: data,
                options: options,
                plugins: [ChartDataLabels]
            });
        } catch (e) {
            console.error('Error creating ROI analysis chart:', e);
        }
    }
    
    // Compliance Framework Coverage Chart
    function createComplianceFrameworkChart() {
        const ctx = document.getElementById('industry-compliance-chart');
        if (!ctx) return;
        
        // Sample data - will be replaced with actual data
        const data = {
            labels: ['HIPAA', 'PCI DSS', 'NIST 800-53', 'GDPR', 'ISO 27001'],
            datasets: [
                {
                    label: 'Portnox Cloud',
                    data: [95, 90, 95, 90, 95],
                    backgroundColor: 'rgba(27, 103, 178, 0.2)',
                    borderColor: portnoxColors.primary,
                    borderWidth: 2,
                    pointBackgroundColor: portnoxColors.primary,
                    pointRadius: 4
                },
                {
                    label: 'Industry Average',
                    data: [75, 70, 65, 60, 70],
                    backgroundColor: 'rgba(100, 116, 139, 0.2)',
                    borderColor: portnoxColors.neutral,
                    borderWidth: 2,
                    pointBackgroundColor: portnoxColors.neutral,
                    pointRadius: 4
                }
            ]
        };
        
        const options = {
            plugins: {
                title: {
                    display: true,
                    text: 'Compliance Framework Coverage',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
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
            },
            scales: {
                r: {
                    angleLines: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        stepSize: 20
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    pointLabels: {
                        font: {
                            size: 12
                        }
                    }
                }
            }
        };
        
        // Create chart if canvas exists
        try {
            new Chart(ctx, {
                type: 'radar',
                data: data,
                options: options
            });
        } catch (e) {
            console.error('Error creating compliance framework chart:', e);
        }
    }
    
    // Create Key Insights section
    function createKeyInsights() {
        const insightsContainer = document.getElementById('key-insights-list');
        if (!insightsContainer) return;
        
        // Insights based on Portnox competitive advantages
        const insights = [
            {
                title: "Cost Efficiency",
                content: "Portnox Cloud delivers a 40-60% lower TCO over 3 years compared to traditional NAC solutions by eliminating hardware costs, simplifying implementation, and reducing IT resource requirements."
            },
            {
                title: "Implementation Speed",
                content: "Deploy Portnox Cloud in hours to days versus the 2-6 month implementation timeline required for traditional NAC solutions, accelerating your security posture improvement and reducing project risk."
            },
            {
                title: "Resource Optimization",
                content: "Portnox requires approximately 80% less IT staffing compared to traditional NAC solutions, freeing your team to focus on strategic initiatives rather than system management."
            },
            {
                title: "Cloud-Native Architecture",
                content: "True cloud-native design eliminates infrastructure management, provides automatic scaling, and delivers continuous updates without maintenance windows or downtime."
            },
            {
                title: "Advanced IoT Security",
                content: "AI-powered device fingerprinting recognizes over 260,000 unique IoT devices across 27,000 brands with 95% accuracy, providing superior visibility and control."
            }
        ];
        
        // Create HTML for insights
        let insightsHTML = '';
        insights.forEach(insight => {
            insightsHTML += `
                <div class="insight-card">
                    <div class="insight-header">
                        <h4>${insight.title}</h4>
                        <div class="insight-icon">
                            <i class="fas fa-lightbulb"></i>
                        </div>
                    </div>
                    <p>${insight.content}</p>
                </div>
            `;
        });
        
        // Add to container
        insightsContainer.innerHTML = insightsHTML;
    }
    
    // Initialize charts when tabs are clicked
    document.querySelectorAll('.result-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Initialize appropriate charts based on tab
            switch(tabId) {
                case 'overview':
                    createKeyInsights();
                    break;
                case 'comparison':
                    createTcoComparisonChart();
                    break;
                case 'implementation':
                    createImplementationComparisonChart();
                    break;
                case 'features':
                    createFeatureComparisonChart();
                    break;
                case 'industry':
                    createComplianceFrameworkChart();
                    break;
                case 'roi':
                    createRoiAnalysisChart();
                    break;
            }
        });
    });
    
    // Initialize default overview tab
    createKeyInsights();
});
