// Better Risk Assessment without compliance heatmap
document.addEventListener('DOMContentLoaded', function() {
    if (window.dashboard) {
        window.dashboard.renderRiskAnalysis = function(container) {
            container.innerHTML = `
                <div class="risk-analysis-enhanced">
                    <h2 class="section-title">Comprehensive Risk & Security Assessment</h2>
                    <p class="section-description">Advanced threat protection analysis showing Portnox's superior security posture and risk mitigation capabilities</p>
                    
                    <!-- Risk Score Cards -->
                    <div class="risk-score-grid">
                        <div class="risk-score-card critical">
                            <div class="risk-score-header">
                                <h3>Overall Security Score</h3>
                                <i class="fas fa-info-circle tooltip-trigger" 
                                   data-tooltip="Composite score based on 25+ security metrics including Zero Trust readiness, threat detection, and incident response capabilities"></i>
                            </div>
                            <div class="risk-score-value">94/100</div>
                            <div class="risk-score-comparison">
                                <span>Industry Average: 72/100</span>
                                <span class="improvement">+30% better</span>
                            </div>
                        </div>
                        
                        <div class="risk-score-card">
                            <div class="risk-score-header">
                                <h3>Breach Prevention Rate</h3>
                                <i class="fas fa-info-circle tooltip-trigger" 
                                   data-tooltip="Percentage of attempted breaches prevented through automated threat response and Zero Trust policies"></i>
                            </div>
                            <div class="risk-score-value">99.7%</div>
                            <div class="risk-score-comparison">
                                <span>Traditional NAC: 85%</span>
                                <span class="improvement">+17% improvement</span>
                            </div>
                        </div>
                        
                        <div class="risk-score-card">
                            <div class="risk-score-header">
                                <h3>Mean Time to Detect</h3>
                                <i class="fas fa-info-circle tooltip-trigger" 
                                   data-tooltip="Average time to detect security threats using AI-powered anomaly detection"></i>
                            </div>
                            <div class="risk-score-value">< 2 min</div>
                            <div class="risk-score-comparison">
                                <span>Industry: 197 days</span>
                                <span class="improvement">99% faster</span>
                            </div>
                        </div>
                        
                        <div class="risk-score-card">
                            <div class="risk-score-header">
                                <h3>Compliance Coverage</h3>
                                <i class="fas fa-info-circle tooltip-trigger" 
                                   data-tooltip="Percentage of major compliance frameworks supported out-of-the-box"></i>
                            </div>
                            <div class="risk-score-value">92%</div>
                            <div class="risk-score-comparison">
                                <span>20+ frameworks</span>
                                <span class="improvement">Auto-mapped</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Risk Analysis Charts -->
                    <div class="risk-charts-container">
                        <div class="chart-container">
                            <div class="chart-header">
                                <h3>Threat Coverage Analysis</h3>
                                <i class="fas fa-info-circle tooltip-trigger" 
                                   data-tooltip="Comparison of threat detection and prevention capabilities across different attack vectors"></i>
                            </div>
                            <div id="threat-coverage-radar" style="height: 400px;"></div>
                        </div>
                        
                        <div class="chart-container">
                            <div class="chart-header">
                                <h3>Cost of Breach Impact Analysis</h3>
                                <i class="fas fa-info-circle tooltip-trigger" 
                                   data-tooltip="Financial impact analysis showing potential cost savings from breach prevention"></i>
                            </div>
                            <div id="breach-cost-impact" style="height: 400px;"></div>
                        </div>
                        
                        <div class="chart-container">
                            <div class="chart-header">
                                <h3>Security Maturity Timeline</h3>
                                <i class="fas fa-info-circle tooltip-trigger" 
                                   data-tooltip="Projected security posture improvement over time with Portnox implementation"></i>
                            </div>
                            <div id="security-maturity-timeline" style="height: 400px;"></div>
                        </div>
                        
                        <div class="chart-container">
                            <div class="chart-header">
                                <h3>Risk Reduction by Category</h3>
                                <i class="fas fa-info-circle tooltip-trigger" 
                                   data-tooltip="Percentage risk reduction across different threat categories"></i>
                            </div>
                            <div id="risk-reduction-chart" style="height: 400px;"></div>
                        </div>
                    </div>
                </div>
            `;
            
            // Initialize enhanced risk charts
            setTimeout(() => {
                this.renderEnhancedRiskCharts();
                this.initializeTooltips();
            }, 100);
        };
        
        window.dashboard.renderEnhancedRiskCharts = function() {
            // Threat Coverage Radar
            if (document.getElementById('threat-coverage-radar')) {
                Highcharts.chart('threat-coverage-radar', {
                    chart: {
                        polar: true,
                        type: 'line'
                    },
                    title: { text: null },
                    xAxis: {
                        categories: ['Malware', 'Ransomware', 'Insider Threats', 
                                    'IoT Attacks', 'Zero-Day', 'Phishing', 
                                    'DDoS', 'Data Exfiltration'],
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
                        name: 'Portnox',
                        data: [98, 96, 94, 97, 92, 95, 91, 96],
                        color: '#10b981',
                        pointPlacement: 'on'
                    }, {
                        name: 'Industry Average',
                        data: [75, 72, 65, 60, 55, 78, 80, 70],
                        color: '#6b7280',
                        pointPlacement: 'on'
                    }],
                    credits: { enabled: false }
                });
            }
            
            // More charts...
        };
    }
});
