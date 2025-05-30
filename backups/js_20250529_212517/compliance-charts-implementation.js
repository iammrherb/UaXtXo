// Compliance Charts Implementation
console.log("📊 Implementing compliance charts...");

window.ComplianceCharts = {
    render: function(container) {
        if (!container) return;
        
        container.innerHTML = `
            <div class="compliance-dashboard">
                <h2>Compliance & Regulatory Analysis</h2>
                
                <div class="compliance-overview">
                    <div class="compliance-score-card">
                        <h3>Overall Compliance Score</h3>
                        <div class="score-display">
                            <div class="score-circle">
                                <svg width="120" height="120">
                                    <circle cx="60" cy="60" r="54" fill="none" stroke="#e0e0e0" stroke-width="12"/>
                                    <circle cx="60" cy="60" r="54" fill="none" stroke="#00a652" stroke-width="12"
                                            stroke-dasharray="339" stroke-dashoffset="34" transform="rotate(-90 60 60)"/>
                                </svg>
                                <div class="score-text">94%</div>
                            </div>
                            <p>Portnox CLEAR - Industry Leading</p>
                        </div>
                    </div>
                    
                    <div class="compliance-stats">
                        <div class="stat-item">
                            <div class="stat-value">6</div>
                            <div class="stat-label">Frameworks Covered</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">45+</div>
                            <div class="stat-label">Controls Automated</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">60%</div>
                            <div class="stat-label">Audit Time Saved</div>
                        </div>
                    </div>
                </div>
                
                <div class="charts-grid">
                    <div class="chart-container">
                        <h3>Compliance Coverage by Framework</h3>
                        <div id="compliance-coverage-chart" style="height: 350px;"></div>
                    </div>
                    
                    <div class="chart-container">
                        <h3>Vendor Compliance Comparison</h3>
                        <div id="vendor-compliance-chart" style="height: 350px;"></div>
                    </div>
                    
                    <div class="chart-container">
                        <h3>Compliance Cost Analysis</h3>
                        <div id="compliance-cost-chart" style="height: 350px;"></div>
                    </div>
                    
                    <div class="chart-container">
                        <h3>Regulatory Readiness Timeline</h3>
                        <div id="compliance-timeline-chart" style="height: 350px;"></div>
                    </div>
                </div>
                
                <div class="compliance-recommendations">
                    <h3>Strategic Recommendations</h3>
                    <div class="recommendations-grid">
                        <div class="recommendation-card">
                            <div class="rec-icon" style="background: #00a652;">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <h4>Immediate Action</h4>
                            <p>Deploy Portnox for instant GDPR, HIPAA, and PCI-DSS compliance with pre-configured policies.</p>
                        </div>
                        <div class="recommendation-card">
                            <div class="rec-icon" style="background: #007bff;">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <h4>Cost Optimization</h4>
                            <p>Reduce compliance costs by 60% through automated reporting and continuous monitoring.</p>
                        </div>
                        <div class="recommendation-card">
                            <div class="rec-icon" style="background: #ffc107;">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <h4>Risk Mitigation</h4>
                            <p>Eliminate 75% of compliance violations through real-time policy enforcement.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Render charts
        this.renderComplianceCoverageChart();
        this.renderVendorComplianceChart();
        this.renderComplianceCostChart();
        this.renderComplianceTimelineChart();
    },
    
    renderComplianceCoverageChart: function() {
        if (typeof Highcharts === 'undefined') return;
        
        Highcharts.chart('compliance-coverage-chart', {
            chart: { type: 'column' },
            title: { text: null },
            xAxis: {
                categories: ['GDPR', 'HIPAA', 'PCI-DSS', 'SOX', 'ISO-27001', 'NIST']
            },
            yAxis: {
                title: { text: 'Coverage (%)' },
                max: 100
            },
            series: [{
                name: 'Portnox',
                data: [95, 93, 94, 92, 96, 95],
                color: '#00a652'
            }, {
                name: 'Industry Average',
                data: [78, 75, 80, 77, 82, 79],
                color: '#6c757d'
            }],
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true,
                        format: '{y}%'
                    }
                }
            },
            credits: { enabled: false }
        });
    },
    
    renderVendorComplianceChart: function() {
        if (typeof Highcharts === 'undefined') return;
        
        Highcharts.chart('vendor-compliance-chart', {
            chart: { type: 'bar' },
            title: { text: null },
            xAxis: {
                categories: ['Portnox', 'Cisco ISE', 'Aruba', 'Forescout', 'FortiNAC']
            },
            yAxis: {
                title: { text: 'Overall Compliance Score' },
                max: 100
            },
            series: [{
                name: 'Compliance Score',
                data: [
                    { y: 94, color: '#00a652' },
                    { y: 88, color: '#6c757d' },
                    { y: 85, color: '#6c757d' },
                    { y: 82, color: '#6c757d' },
                    { y: 80, color: '#6c757d' }
                ]
            }],
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        format: '{y}%'
                    }
                }
            },
            legend: { enabled: false },
            credits: { enabled: false }
        });
    },
    
    renderComplianceCostChart: function() {
        if (typeof Highcharts === 'undefined') return;
        
        Highcharts.chart('compliance-cost-chart', {
            chart: { type: 'waterfall' },
            title: { text: null },
            xAxis: {
                categories: ['Current Cost', 'Automation', 'Reporting', 'Audits', 'Violations', 'With Portnox']
            },
            yAxis: {
                title: { text: 'Annual Cost ($)' }
            },
            series: [{
                name: 'Cost Impact',
                data: [
                    { y: 250000, color: '#dc3545' },
                    { y: -75000, color: '#00a652' },
                    { y: -50000, color: '#00a652' },
                    { y: -40000, color: '#00a652' },
                    { y: -35000, color: '#00a652' },
                    { isSum: true, color: '#007bff' }
                ]
            }],
            credits: { enabled: false }
        });
    },
    
    renderComplianceTimelineChart: function() {
        if (typeof Highcharts === 'undefined') return;
        
        Highcharts.chart('compliance-timeline-chart', {
            chart: { type: 'line' },
            title: { text: null },
            xAxis: {
                categories: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6']
            },
            yAxis: {
                title: { text: 'Compliance Readiness (%)' },
                max: 100
            },
            series: [{
                name: 'Portnox',
                data: [40, 65, 80, 90, 95, 98],
                color: '#00a652'
            }, {
                name: 'Traditional NAC',
                data: [10, 20, 30, 45, 55, 65],
                color: '#6c757d'
            }],
            credits: { enabled: false }
        });
    }
};

// Add styles
const complianceStyles = document.createElement('style');
complianceStyles.textContent = `
    .compliance-dashboard {
        padding: 2rem;
    }
    
    .compliance-overview {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 2rem;
        margin: 2rem 0;
    }
    
    .compliance-score-card {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .score-circle {
        position: relative;
        width: 120px;
        height: 120px;
        margin: 1rem auto;
    }
    
    .score-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2rem;
        font-weight: 700;
        color: #00a652;
    }
    
    .compliance-stats {
        display: flex;
        gap: 2rem;
        align-items: center;
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .stat-item {
        flex: 1;
        text-align: center;
    }
    
    .stat-value {
        font-size: 2.5rem;
        font-weight: 700;
        color: #00a652;
    }
    
    .stat-label {
        color: #6c757d;
        margin-top: 0.5rem;
    }
    
    .charts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 2rem;
        margin: 2rem 0;
    }
    
    .chart-container {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .chart-container h3 {
        margin: 0 0 1rem 0;
        color: #333;
    }
    
    .recommendations-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-top: 1.5rem;
    }
    
    .recommendation-card {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .rec-icon {
        width: 50px;
        height: 50px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }
`;
document.head.appendChild(complianceStyles);
