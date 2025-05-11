/**
 * Dashboard Controller
 * Manages the main dashboard UI and data presentation
 */

const DashboardController = (function() {
    let currentData = null;
    let chartInstances = {};
    
    function initialize(wizardState) {
        // Calculate all metrics
        const tcoResults = TCOCalculator.calculate(wizardState);
        const roiResults = ROICalculator.calculate(tcoResults, wizardState);
        const riskResults = RiskCalculator.calculate(tcoResults, wizardState);
        const sensitivityResults = SensitivityCalculator.calculate(tcoResults, wizardState);
        
        currentData = {
            wizardState,
            tcoResults,
            roiResults,
            riskResults,
            sensitivityResults
        };
        
        // Update UI
        updateExecutiveSummary();
        updateVendorComparison();
        initializeCharts();
        setupEventListeners();
    }
    
    function updateExecutiveSummary() {
        // Update vendor comparison info
        const comparisonInfo = document.getElementById('vendor-comparison-info');
        if (comparisonInfo) {
            let html = '<h3>Comparing:</h3><div class="vendor-tags">';
            currentData.wizardState.selectedVendors.forEach(vendorId => {
                const vendor = currentData.tcoResults.vendors[vendorId];
                html += `<span class="vendor-tag">${vendor.vendorName}</span>`;
            });
            html += '<span class="vendor-tag highlight">vs. Portnox Cloud</span>';
            html += '</div>';
            comparisonInfo.innerHTML = html;
        }
        
        // Update KPIs
        updateKPIs();
    }
    
    function updateKPIs() {
        const kpiGrid = document.getElementById('kpi-grid');
        if (!kpiGrid) return;
        
        // Calculate aggregate metrics
        let totalSavings = 0;
        let avgROI = 0;
        let avgPayback = 0;
        let avgRiskReduction = 0;
        let count = 0;
        
        currentData.wizardState.selectedVendors.forEach(vendorId => {
            if (vendorId !== 'portnox') {
                const savings = currentData.tcoResults.savings[vendorId];
                const roi = currentData.roiResults[vendorId];
                const risk = currentData.riskResults.comparisons[vendorId];
                
                if (savings) {
                    totalSavings += savings.totalSavings;
                    avgROI += roi.roi;
                    avgPayback += roi.paybackPeriod;
                    avgRiskReduction += risk.overall.reduction;
                    count++;
                }
            }
        });
        
        if (count > 0) {
            avgROI /= count;
            avgPayback /= count;
            avgRiskReduction /= count;
        }
        
        // Create KPI cards
        const kpis = [
            {
                icon: 'fa-chart-line',
                title: 'Average TCO Reduction',
                value: `${Math.round(avgRiskReduction)}%`,
                detail: `Total Savings: $${(totalSavings / 1000000).toFixed(2)}M`,
                trend: 'Portnox Advantage'
            },
            {
                icon: 'fa-calendar-check',
                title: 'Average ROI',
                value: `${Math.round(avgROI)}%`,
                detail: `Payback: ${Math.round(avgPayback)} months`,
                trend: 'Investment Return'
            },
            {
                icon: 'fa-shield-check',
                title: 'Risk Reduction',
                value: `${Math.round(avgRiskReduction)}%`,
                detail: 'Security posture improvement',
                trend: 'Enhanced Protection'
            },
            {
                icon: 'fa-rocket',
                title: 'Deployment Speed',
                value: '76% Faster',
                detail: 'vs. traditional NAC solutions',
                trend: 'Time to Value'
            }
        ];
        
        let html = '';
        kpis.forEach(kpi => {
            html += `
                <div class="kpi-card">
                    <div class="kpi-icon">
                        <i class="fas ${kpi.icon}"></i>
                    </div>
                    <div class="kpi-content">
                        <h3>${kpi.title}</h3>
                        <div class="kpi-value">${kpi.value}</div>
                        <div class="kpi-detail">${kpi.detail}</div>
                        <div class="kpi-trend positive">
                            <i class="fas fa-arrow-up"></i> ${kpi.trend}
                        </div>
                    </div>
                </div>
            `;
        });
        
        kpiGrid.innerHTML = html;
    }
    
    function initializeCharts() {
        // TCO Comparison Chart
        createTCOComparisonChart();
        
        // Cost Breakdown Chart
        createCostBreakdownChart();
        
        // ROI Analysis Chart
        createROIChart();
        
        // Risk Comparison Chart
        createRiskChart();
        
        // Sensitivity Analysis Charts
        createSensitivityCharts();
    }
    
    function createTCOComparisonChart() {
        const ctx = document.getElementById('tco-comparison-chart');
        if (!ctx) return;
        
        const data = currentData.tcoResults.charts.tcoComparison;
        
        chartInstances.tcoComparison = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Total Cost of Ownership Comparison'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => `$${(value / 1000000).toFixed(2)}M`
                        }
                    }
                }
            }
        });
    }
    
    function createCostBreakdownChart() {
        const ctx = document.getElementById('cost-breakdown-chart');
        if (!ctx) return;
        
        const data = currentData.tcoResults.charts.costBreakdown;
        
        chartInstances.costBreakdown = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Cumulative Cost Over Time'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => `$${(value / 1000).toFixed(0)}K`
                        }
                    }
                }
            }
        });
    }
    
    function createROIChart() {
        const ctx = document.getElementById('roi-analysis-chart');
        if (!ctx) return;
        
        const labels = [];
        const roiData = [];
        const paybackData = [];
        
        Object.keys(currentData.roiResults).forEach(vendorId => {
            const vendor = currentData.tcoResults.vendors[vendorId];
            const roi = currentData.roiResults[vendorId];
            
            labels.push(vendor.vendorName);
            roiData.push(roi.roi);
            paybackData.push(roi.paybackPeriod);
        });
        
        chartInstances.roi = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'ROI (%)',
                        data: roiData,
                        backgroundColor: '#2BD25B',
                        yAxisID: 'y'
                    },
                    {
                        label: 'Payback (months)',
                        data: paybackData,
                        backgroundColor: '#1B67B2',
                        yAxisID: 'y1'
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
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'ROI (%)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        position: 'right',
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Payback (months)'
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                }
            }
        });
    }
    
    function createRiskChart() {
        const ctx = document.getElementById('risk-comparison-chart');
        if (!ctx) return;
        
        const labels = ['Security', 'Operational', 'Compliance', 'Financial', 'Overall'];
        const datasets = [];
        
        Object.keys(currentData.riskResults.vendors).forEach(vendorId => {
            const vendor = currentData.tcoResults.vendors[vendorId];
            const risks = currentData.riskResults.vendors[vendorId];
            
            datasets.push({
                label: vendor.vendorName,
                data: labels.map(l => risks[l.toLowerCase()]),
                backgroundColor: vendorId === 'portnox' ? '#2BD25B' : '#1B67B2',
                borderColor: vendorId === 'portnox' ? '#2BD25B' : '#1B67B2',
                fill: false
            });
        });
        
        chartInstances.risk = new Chart(ctx, {
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
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
    
    function createSensitivityCharts() {
        // Tornado Chart
        const tornadoCtx = document.getElementById('sensitivity-tornado-chart');
        if (tornadoCtx) {
            const data = currentData.sensitivityResults.charts.tornado;
            
            chartInstances.tornado = new Chart(tornadoCtx, {
                type: 'bar',
                data: data,
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Sensitivity Analysis - Factor Impact'
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Impact on TCO (%)'
                            }
                        }
                    }
                }
            });
        }
        
        // Scenario Chart
        const scenarioCtx = document.getElementById('sensitivity-scenario-chart');
        if (scenarioCtx) {
            const data = currentData.sensitivityResults.charts.scenario;
            
            chartInstances.scenario = new Chart(scenarioCtx, {
                type: 'line',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Scenario Analysis'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: value => `${(value / 1000).toFixed(0)}K`
                            }
                        }
                    }
                }
            });
        }
    }
    
    function updateVendorComparison() {
        // Update vendor comparison table
        const table = document.getElementById('vendor-comparison-table');
        if (!table) return;
        
        let html = `
            <thead>
                <tr>
                    <th>Metric</th>
        `;
        
        // Add headers for each vendor
        Object.values(currentData.tcoResults.vendors).forEach(vendor => {
            html += `<th>${vendor.vendorName}</th>`;
        });
        
        html += `
                </tr>
            </thead>
            <tbody>
        `;
        
        // Add comparison rows
        const metrics = [
            { label: 'Total TCO', key: 'totalTCO', format: v => `${(v / 1000000).toFixed(2)}M` },
            { label: 'Initial Cost', key: 'totalInitial', format: v => `${(v / 1000).toFixed(0)}K` },
            { label: 'Annual Cost', key: 'totalAnnual', format: v => `${(v / 1000).toFixed(0)}K` },
            { label: 'Deployment Time', key: 'deploymentTime', format: v => `${v} days`, metric: true },
            { label: 'FTEs Required', key: 'ftesRequired', format: v => v.toFixed(1), metric: true },
            { label: 'Security Score', key: 'securityScore', format: v => `${v}/10`, metric: true }
        ];
        
        metrics.forEach(metric => {
            html += `<tr><td>${metric.label}</td>`;
            
            Object.values(currentData.tcoResults.vendors).forEach(vendor => {
                let value;
                if (metric.metric) {
                    value = vendor.metrics[metric.key];
                } else {
                    value = vendor[metric.key];
                }
                
                const formattedValue = metric.format(value || 0);
                const highlight = vendor.vendorId === 'portnox' && metric.key === 'totalTCO' ? 'highlight' : '';
                html += `<td class="${highlight}">${formattedValue}</td>`;
            });
            
            html += '</tr>';
        });
        
        html += '</tbody>';
        table.innerHTML = html;
    }
    
    function setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.dataset.tab;
                switchTab(tabName);
            });
        });
        
        // Export functionality
        const exportBtn = document.getElementById('export-report');
        if (exportBtn) {
            exportBtn.addEventListener('click', exportReport);
        }
    }
    
    function switchTab(tabName) {
        // Remove active class from all tabs and sections
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.analysis-section').forEach(s => s.classList.remove('active'));
        
        // Add active class to selected tab and section
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}-analysis`).classList.add('active');
        
        // Refresh charts if needed
        if (chartInstances[tabName]) {
            chartInstances[tabName].update();
        }
    }
    
    function exportReport() {
        // Create comprehensive report
        const report = generateReport();
        
        // Convert to PDF or Excel format
        // This would integrate with a library like jsPDF or SheetJS
        console.log('Export functionality to be implemented');
    }
    
    function generateReport() {
        return {
            executiveSummary: generateExecutiveSummary(),
            tcoAnalysis: currentData.tcoResults,
            roiAnalysis: currentData.roiResults,
            riskAnalysis: currentData.riskResults,
            sensitivityAnalysis: currentData.sensitivityResults,
            recommendations: generateRecommendations()
        };
    }
    
    function generateExecutiveSummary() {
        // Generate executive summary based on analysis
        return {
            selectedVendors: currentData.wizardState.selectedVendors,
            keyFindings: [],
            recommendations: []
        };
    }
    
    function generateRecommendations() {
        // Generate recommendations based on analysis
        const recommendations = [];
        
        // Add recommendation logic
        
        return recommendations;
    }
    
    function loadDefaultData() {
        // Load default comparison if no wizard data
        const defaultState = {
            selectedVendors: ['cisco'],
            industry: 'technology',
            complianceFrameworks: ['ISO 27001', 'SOC 2'],
            customCompliance: [],
            costConfig: {
                deviceCount: 1000,
                yearsToProject: 3,
                portnoxCostPerDevice: 4.00,
                implementationMonths: 3,
                supportLevel: 'standard'
            },
            sensitivityFactors: {
                itStaffCost: 0,
                hardwareCost: 0,
                energyCost: 0,
                downtime: 0,
                security: 0
            }
        };
        
        initialize(defaultState);
    }
    
    // Public API
    return {
        initialize,
        loadDefaultData,
        updateKPIs,
        switchTab
    };
})();

// Export for use in other modules
window.DashboardController = DashboardController;
