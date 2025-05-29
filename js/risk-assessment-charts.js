// Risk Assessment Charts Implementation
console.log("🛡️ Implementing risk assessment charts...");

window.RiskAssessmentCharts = {
    render: function(container) {
        if (!container) return;
        
        container.innerHTML = `
            <div class="risk-dashboard">
                <h2>Risk Assessment & Security Analysis</h2>
                
                <div class="risk-summary">
                    <div class="risk-meter">
                        <h3>Overall Risk Score</h3>
                        <div class="meter-container">
                            <div class="risk-gauge">
                                <div class="gauge-bg"></div>
                                <div class="gauge-fill" style="transform: rotate(45deg);"></div>
                                <div class="gauge-center">
                                    <span class="risk-value">22%</span>
                                    <span class="risk-label">LOW RISK</span>
                                </div>
                            </div>
                            <p>With Portnox CLEAR</p>
                        </div>
                    </div>
                    
                    <div class="risk-comparison">
                        <div class="comparison-item">
                            <h4>Without NAC</h4>
                            <div class="risk-bar high">
                                <div class="bar-fill" style="width: 85%;"></div>
                                <span>85%</span>
                            </div>
                        </div>
                        <div class="comparison-item">
                            <h4>With Portnox</h4>
                            <div class="risk-bar low">
                                <div class="bar-fill" style="width: 22%;"></div>
                                <span>22%</span>
                            </div>
                        </div>
                        <div class="comparison-item">
                            <h4>Risk Reduction</h4>
                            <div class="reduction-value">74%</div>
                        </div>
                    </div>
                </div>
                
                <div class="charts-grid">
                    <div class="chart-container">
                        <h3>Risk by Category</h3>
                        <div id="risk-category-chart" style="height: 350px;"></div>
                    </div>
                    
                    <div class="chart-container">
                        <h3>Threat Detection Timeline</h3>
                        <div id="threat-timeline-chart" style="height: 350px;"></div>
                    </div>
                    
                    <div class="chart-container">
                        <h3>Security Posture Comparison</h3>
                        <div id="security-posture-chart" style="height: 350px;"></div>
                    </div>
                    
                    <div class="chart-container">
                        <h3>Financial Impact Analysis</h3>
                        <div id="financial-impact-chart" style="height: 350px;"></div>
                    </div>
                </div>
                
                <div class="security-recommendations">
                    <h3>Security Recommendations</h3>
                    <div class="security-grid">
                        <div class="security-card critical">
                            <i class="fas fa-exclamation-circle"></i>
                            <h4>Critical Priority</h4>
                            <p>Implement Zero Trust NAC immediately to reduce unauthorized access risk by 82%.</p>
                        </div>
                        <div class="security-card high">
                            <i class="fas fa-shield-alt"></i>
                            <h4>High Priority</h4>
                            <p>Enable automated threat response to reduce incident response time from 73 hours to 5 minutes.</p>
                        </div>
                        <div class="security-card medium">
                            <i class="fas fa-lock"></i>
                            <h4>Medium Priority</h4>
                            <p>Implement continuous compliance monitoring to prevent regulatory violations.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Render charts
        this.renderRiskCategoryChart();
        this.renderThreatTimelineChart();
        this.renderSecurityPostureChart();
        this.renderFinancialImpactChart();
    },
    
    renderRiskCategoryChart: function() {
        if (typeof Highcharts === 'undefined') return;
        
        Highcharts.chart('risk-category-chart', {
            chart: { type: 'radar' },
            title: { text: null },
            xAxis: {
                categories: ['Unauthorized Access', 'Data Breach', 'Malware', 'Compliance', 'Insider Threat', 'IoT Security'],
                tickmarkPlacement: 'on',
                lineWidth: 0
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0,
                max: 100
            },
            series: [{
                name: 'Without NAC',
                data: [85, 75, 80, 70, 65, 90],
                color: '#dc3545',
                fillOpacity: 0.3
            }, {
                name: 'With Portnox',
                data: [15, 10, 20, 15, 12, 25],
                color: '#00a652',
                fillOpacity: 0.3
            }],
            credits: { enabled: false }
        });
    },
    
    renderThreatTimelineChart: function() {
        if (typeof Highcharts === 'undefined') return;
        
        Highcharts.chart('threat-timeline-chart', {
            chart: { type: 'area' },
            title: { text: null },
            xAxis: {
                categories: ['0h', '1h', '2h', '4h', '8h', '16h', '24h', '48h', '72h']
            },
            yAxis: {
                title: { text: 'Threat Spread (%)' }
            },
            series: [{
                name: 'Without Protection',
                data: [5, 15, 35, 60, 80, 90, 95, 98, 100],
                color: '#dc3545'
            }, {
                name: 'With Portnox',
                data: [5, 5, 5, 8, 10, 12, 15, 18, 20],
                color: '#00a652'
            }],
            plotOptions: {
                area: {
                    fillOpacity: 0.3
                }
            },
            credits: { enabled: false }
        });
    },
    
    renderSecurityPostureChart: function() {
        if (typeof Highcharts === 'undefined') return;
        
        Highcharts.chart('security-posture-chart', {
            chart: { type: 'column' },
            title: { text: null },
            xAxis: {
                categories: ['Portnox', 'Cisco ISE', 'Aruba', 'Forescout', 'FortiNAC']
            },
            yAxis: {
                title: { text: 'Security Score' },
                max: 100
            },
            series: [{
                name: 'Zero Trust',
                data: [95, 85, 80, 85, 75]
            }, {
                name: 'Automation',
                data: [90, 75, 70, 80, 70]
            }, {
                name: 'AI/ML',
                data: [85, 70, 65, 75, 60]
            }],
            colors: ['#00a652', '#007bff', '#ffc107'],
            credits: { enabled: false }
        });
    },
    
    renderFinancialImpactChart: function() {
        if (typeof Highcharts === 'undefined') return;
        
        Highcharts.chart('financial-impact-chart', {
            chart: { type: 'pie' },
            title: { text: null },
            series: [{
                name: 'Cost',
                data: [
                    { name: 'Breach Prevention Savings', y: 1200000, color: '#00a652' },
                    { name: 'Compliance Cost Reduction', y: 150000, color: '#007bff' },
                    { name: 'Insurance Premium Savings', y: 60000, color: '#17a2b8' },
                    { name: 'Operational Efficiency', y: 175000, color: '#ffc107' },
                    { name: 'Downtime Prevention', y: 280000, color: '#28a745' }
                ]
            }],
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: ${point.y:,.0f}'
                    }
                }
            },
            credits: { enabled: false }
        });
    }
};

// Add styles
const riskStyles = document.createElement('style');
riskStyles.textContent = `
    .risk-dashboard {
        padding: 2rem;
    }
    
    .risk-summary {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 2rem;
        margin: 2rem 0;
    }
    
    .risk-meter {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .risk-gauge {
        position: relative;
        width: 150px;
        height: 150px;
        margin: 1rem auto;
    }
    
    .gauge-bg {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: conic-gradient(
            from 180deg,
            #dc3545 0deg,
            #ffc107 120deg,
            #00a652 240deg,
            transparent 240deg
        );
    }
    
    .gauge-center {
        position: absolute;
        inset: 20px;
        background: white;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    
    .risk-value {
        font-size: 2rem;
        font-weight: 700;
        color: #00a652;
    }
    
    .risk-label {
        font-size: 0.875rem;
        color: #6c757d;
    }
    
    .risk-comparison {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        display: flex;
        gap: 2rem;
        align-items: center;
    }
    
    .comparison-item {
        flex: 1;
    }
    
    .risk-bar {
        position: relative;
        height: 30px;
        background: #f0f0f0;
        border-radius: 15px;
        margin: 0.5rem 0;
        overflow: hidden;
    }
    
    .risk-bar.high .bar-fill {
        background: #dc3545;
    }
    
    .risk-bar.low .bar-fill {
        background: #00a652;
    }
    
    .bar-fill {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        transition: width 0.5s ease;
    }
    
    .risk-bar span {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-weight: 600;
        z-index: 1;
    }
    
    .reduction-value {
        font-size: 3rem;
        font-weight: 700;
        color: #00a652;
        text-align: center;
    }
    
    .security-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-top: 1.5rem;
    }
    
    .security-card {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        border-left: 4px solid;
    }
    
    .security-card.critical {
        border-left-color: #dc3545;
    }
    
    .security-card.high {
        border-left-color: #ffc107;
    }
    
    .security-card.medium {
        border-left-color: #17a2b8;
    }
    
    .security-card i {
        font-size: 2rem;
        margin-bottom: 1rem;
        display: block;
    }
    
    .security-card.critical i {
        color: #dc3545;
    }
    
    .security-card.high i {
        color: #ffc107;
    }
    
    .security-card.medium i {
        color: #17a2b8;
    }
`;
document.head.appendChild(riskStyles);
