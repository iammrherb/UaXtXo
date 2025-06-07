/**
 * Risk & Security View
 * Comprehensive security posture and risk analysis
 */

class RiskSecurityView {
    constructor() {
        this.charts = {};
        this.riskData = null;
    }
    
    initialize() {
        if (window.controller) {
            window.controller.registerView('risk-security', this);
        }
    }
    
    render(container) {
        container.innerHTML = `
            <div class="risk-security-dashboard animate-fadeIn">
                <!-- Header -->
                <section class="view-header">
                    <h2>Risk & Security Analysis</h2>
                    <p>Comprehensive security posture assessment and risk mitigation strategies</p>
                </section>
                
                <!-- Risk Score Overview -->
                <section class="risk-overview">
                    <div class="risk-score-container">
                        <div class="overall-risk-score">
                            <h3>Organization Risk Score</h3>
                            <div class="risk-gauge" id="risk-gauge-chart"></div>
                        </div>
                        
                        <div class="risk-metrics">
                            <div class="risk-metric">
                                <i class="fas fa-shield-virus"></i>
                                <h4>Current Risk Level</h4>
                                <div class="value high" id="current-risk">High</div>
                                <p>Without proper NAC</p>
                            </div>
                            
                            <div class="risk-metric">
                                <i class="fas fa-shield-check"></i>
                                <h4>With Portnox</h4>
                                <div class="value low" id="portnox-risk">Low</div>
                                <p>85% risk reduction</p>
                            </div>
                            
                            <div class="risk-metric">
                                <i class="fas fa-dollar-sign"></i>
                                <h4>Annual Risk Cost</h4>
                                <div class="value" id="risk-cost">$0</div>
                                <p>Potential breach impact</p>
                            </div>
                            
                            <div class="risk-metric">
                                <i class="fas fa-percentage"></i>
                                <h4>Breach Probability</h4>
                                <div class="value" id="breach-probability">0%</div>
                                <p>Next 12 months</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Threat Landscape -->
                <section class="threat-landscape">
                    <h3>Threat Landscape Analysis</h3>
                    <div class="threats-grid">
                        <div class="threat-card critical">
                            <i class="fas fa-user-secret"></i>
                            <h4>Insider Threats</h4>
                            <div class="threat-level">Critical</div>
                            <p>Unauthorized access by employees or contractors</p>
                            <div class="mitigation">
                                <strong>Portnox Mitigation:</strong> Zero Trust verification, continuous monitoring
                            </div>
                        </div>
                        
                        <div class="threat-card high">
                            <i class="fas fa-laptop-house"></i>
                            <h4>BYOD Risks</h4>
                            <div class="threat-level">High</div>
                            <p>Unmanaged personal devices accessing corporate resources</p>
                            <div class="mitigation">
                                <strong>Portnox Mitigation:</strong> Device profiling, compliance enforcement
                            </div>
                        </div>
                        
                        <div class="threat-card high">
                            <i class="fas fa-virus"></i>
                            <h4>Malware/Ransomware</h4>
                            <div class="threat-level">High</div>
                            <p>Malicious software spreading through network</p>
                            <div class="mitigation">
                                <strong>Portnox Mitigation:</strong> Automatic quarantine, micro-segmentation
                            </div>
                        </div>
                        
                        <div class="threat-card medium">
                            <i class="fas fa-wifi"></i>
                            <h4>Rogue Devices</h4>
                            <div class="threat-level">Medium</div>
                            <p>Unauthorized devices connecting to network</p>
                            <div class="mitigation">
                                <strong>Portnox Mitigation:</strong> Real-time detection, auto-blocking
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Security Controls Comparison -->
                <section class="security-controls">
                    <h3>Security Controls Effectiveness</h3>
                    <div class="controls-comparison" id="controls-comparison-chart"></div>
                </section>
                
                <!-- Attack Surface Analysis -->
                <section class="attack-surface">
                    <h3>Attack Surface Reduction</h3>
                    <div class="surface-visualization">
                        <div class="surface-chart" id="attack-surface-chart"></div>
                        <div class="surface-details">
                            <h4>Attack Vector Analysis</h4>
                            <div class="vector-list">
                                <div class="vector-item">
                                    <span class="vector-name">Network Access</span>
                                    <div class="reduction-bar">
                                        <div class="reduction-fill" style="width: 90%"></div>
                                    </div>
                                    <span class="reduction-value">90% reduced</span>
                                </div>
                                <div class="vector-item">
                                    <span class="vector-name">Device Vulnerabilities</span>
                                    <div class="reduction-bar">
                                        <div class="reduction-fill" style="width: 85%"></div>
                                    </div>
                                    <span class="reduction-value">85% reduced</span>
                                </div>
                                <div class="vector-item">
                                    <span class="vector-name">User Credentials</span>
                                    <div class="reduction-bar">
                                        <div class="reduction-fill" style="width: 95%"></div>
                                    </div>
                                    <span class="reduction-value">95% reduced</span>
                                </div>
                                <div class="vector-item">
                                    <span class="vector-name">Lateral Movement</span>
                                    <div class="reduction-bar">
                                        <div class="reduction-fill" style="width: 98%"></div>
                                    </div>
                                    <span class="reduction-value">98% reduced</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Incident Response -->
                <section class="incident-response">
                    <h3>Incident Response Capabilities</h3>
                    <div class="response-metrics">
                        <div class="response-card">
                            <i class="fas fa-clock"></i>
                            <h4>Detection Time</h4>
                            <div class="comparison">
                                <div class="vendor-metric">
                                    <span>Without NAC</span>
                                    <span class="value">197 days</span>
                                </div>
                                <div class="vendor-metric highlight">
                                    <span>With Portnox</span>
                                    <span class="value">&lt; 1 minute</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="response-card">
                            <i class="fas fa-shield-alt"></i>
                            <h4>Containment Time</h4>
                            <div class="comparison">
                                <div class="vendor-metric">
                                    <span>Manual Process</span>
                                    <span class="value">4+ hours</span>
                                </div>
                                <div class="vendor-metric highlight">
                                    <span>Portnox Auto</span>
                                    <span class="value">Instant</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="response-card">
                            <i class="fas fa-search"></i>
                            <h4>Investigation</h4>
                            <div class="comparison">
                                <div class="vendor-metric">
                                    <span>Manual Logs</span>
                                    <span class="value">Days</span>
                                </div>
                                <div class="vendor-metric highlight">
                                    <span>AI Analysis</span>
                                    <span class="value">Minutes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Security Maturity -->
                <section class="security-maturity">
                    <h3>Security Maturity Assessment</h3>
                    <div class="maturity-radar" id="maturity-radar-chart"></div>
                </section>
                
                <!-- Risk Mitigation ROI -->
                <section class="risk-roi">
                    <h3>Risk Mitigation ROI</h3>
                    <div class="risk-roi-calculator">
                        <div class="roi-inputs">
                            <h4>Industry Risk Factors</h4>
                            <div class="risk-factor">
                                <span>Average breach cost in your industry</span>
                                <span class="value" id="industry-breach-cost">$0</span>
                            </div>
                            <div class="risk-factor">
                                <span>Breach probability (annual)</span>
                                <span class="value" id="breach-prob-annual">0%</span>
                            </div>
                            <div class="risk-factor">
                                <span>Risk reduction with Portnox</span>
                                <span class="value">85%</span>
                            </div>
                        </div>
                        
                        <div class="roi-results">
                            <h4>Risk Mitigation Value</h4>
                            <div class="roi-metric highlight">
                                <span>Annual Risk Avoidance</span>
                                <span class="value" id="annual-risk-avoidance">$0</span>
                            </div>
                            <div class="roi-metric">
                                <span>3-Year Risk Avoidance</span>
                                <span class="value" id="three-year-avoidance">$0</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
        
        this.updateCalculations();
    }
    
    onSettingsUpdate(settings) {
        this.updateCalculations();
    }
    
    onCalculationsUpdate(settings) {
        this.updateCalculations();
    }
    
    updateCalculations() {
        if (!window.controller) return;
        
        const risk = window.controller.calculateRisk();
        const settings = window.controller.organizationSettings;
        const industry = window.controller.industries[settings.industry];
        
        this.riskData = risk;
        
        // Update risk metrics
        this.updateRiskMetrics(risk, industry);
        
        // Render charts
        this.renderRiskGauge(risk);
        this.renderControlsComparison();
        this.renderAttackSurfaceChart();
        this.renderMaturityRadar();
        
        // Update ROI calculations
        this.updateRiskROI(risk, industry);
    }
    
    updateRiskMetrics(risk, industry) {
        // Current risk level
        const currentRiskEl = document.getElementById('current-risk');
        if (currentRiskEl) {
            const riskLevel = risk.baseRisk > 0.7 ? 'Critical' : 
                             risk.baseRisk > 0.5 ? 'High' : 
                             risk.baseRisk > 0.3 ? 'Medium' : 'Low';
            currentRiskEl.textContent = riskLevel;
            currentRiskEl.className = `value ${riskLevel.toLowerCase()}`;
        }
        
        // Risk cost
        const riskCostEl = document.getElementById('risk-cost');
        if (riskCostEl) {
            riskCostEl.textContent = '$' + this.formatNumber(risk.annualRiskCost);
        }
        
        // Breach probability
        const breachProbEl = document.getElementById('breach-probability');
        if (breachProbEl) {
            breachProbEl.textContent = Math.round(risk.baseRisk * 100) + '%';
        }
        
        // Industry breach cost
        const industryCostEl = document.getElementById('industry-breach-cost');
        if (industryCostEl) {
            industryCostEl.textContent = '$' + this.formatNumber(industry.avgBreachCost);
        }
        
        // Annual breach probability
        const annualProbEl = document.getElementById('breach-prob-annual');
        if (annualProbEl) {
            annualProbEl.textContent = Math.round(risk.baseRisk * 100) + '%';
        }
    }
    
    renderRiskGauge(risk) {
        const container = document.getElementById('risk-gauge-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const riskScore = Math.round(risk.baseRisk * 100);
        const portnoxScore = Math.round(risk.withPortnox * 100);
        
        this.charts.riskGauge = Highcharts.chart(container, {
            chart: {
                type: 'solidgauge',
                backgroundColor: 'transparent',
                height: 250
            },
            title: null,
            pane: {
                center: ['50%', '85%'],
                size: '140%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },
            yAxis: {
                min: 0,
                max: 100,
                stops: [
                    [0.1, '#10b981'], // green
                    [0.5, '#f59e0b'], // yellow
                    [0.9, '#ef4444']  // red
                ],
                lineWidth: 0,
                tickWidth: 0,
                minorTickInterval: null,
                tickAmount: 2,
                labels: {
                    y: 16,
                    style: { color: '#a6acbb' }
                }
            },
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: -40,
                        borderWidth: 0,
                        useHTML: true,
                        format: '<div style="text-align:center">' +
                                '<span style="font-size:3rem;color:#ffffff">{y}%</span><br/>' +
                                '<span style="font-size:1rem;color:#a6acbb">Risk Score</span>' +
                                '</div>'
                    }
                }
            },
            series: [{
                name: 'Risk Score',
                data: [riskScore],
                tooltip: {
                    valueSuffix: '% risk'
                }
            }],
            credits: { enabled: false }
        });
    }
    
    renderControlsComparison() {
        const container = document.getElementById('controls-comparison-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const categories = [
            'Access Control',
            'Device Trust',
            'Network Segmentation', 
            'Threat Detection',
            'Incident Response',
            'Compliance Automation',
            'Visibility',
            'Policy Enforcement'
        ];
        
        const portnoxScores = [98, 95, 97, 96, 99, 94, 100, 98];
        const legacyScores = [70, 60, 75, 50, 40, 30, 65, 70];
        const baselineScores = [20, 15, 25, 10, 10, 5, 30, 20];
        
        this.charts.controls = Highcharts.chart(container, {
            chart: {
                type: 'bar',
                backgroundColor: 'transparent',
                height: 400
            },
            title: {
                text: 'Security Control Effectiveness Comparison',
                style: { color: '#ffffff' }
            },
            xAxis: {
                categories: categories,
                labels: { style: { color: '#a6acbb' } }
            },
            yAxis: {
                min: 0,
                max: 100,
                title: {
                    text: 'Effectiveness (%)',
                    style: { color: '#a6acbb' }
                },
                labels: { style: { color: '#a6acbb' } }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        style: { color: '#ffffff' },
                        formatter: function() {
                            return this.y + '%';
                        }
                    }
                }
            },
            series: [{
                name: 'Portnox',
                data: portnoxScores,
                color: '#00e5e6'
            }, {
                name: 'Legacy NAC',
                data: legacyScores,
                color: '#f59e0b'
            }, {
                name: 'No NAC',
                data: baselineScores,
                color: '#ef4444'
            }],
            legend: {
                itemStyle: { color: '#a6acbb' }
            },
            credits: { enabled: false }
        });
    }
    
    renderAttackSurfaceChart() {
        const container = document.getElementById('attack-surface-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        this.charts.attackSurface = Highcharts.chart(container, {
            chart: {
                type: 'area',
                backgroundColor: 'transparent',
                height: 300
            },
            title: {
                text: 'Attack Surface Over Time',
                style: { color: '#ffffff' }
            },
            xAxis: {
                categories: ['Current', 'Month 1', 'Month 2', 'Month 3', 'Month 6', 'Month 12'],
                labels: { style: { color: '#a6acbb' } }
            },
            yAxis: {
                title: {
                    text: 'Attack Surface Index',
                    style: { color: '#a6acbb' }
                },
                labels: { style: { color: '#a6acbb' } }
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },
            series: [{
                name: 'Without NAC',
                data: [100, 105, 110, 115, 125, 140],
                color: '#ef4444'
            }, {
                name: 'With Legacy NAC',
                data: [100, 85, 75, 70, 68, 65],
                color: '#f59e0b'
            }, {
                name: 'With Portnox',
                data: [100, 50, 30, 20, 15, 10],
                color: '#10b981'
            }],
            legend: {
                itemStyle: { color: '#a6acbb' }
            },
            credits: { enabled: false }
        });
    }
    
    renderMaturityRadar() {
        const container = document.getElementById('maturity-radar-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        this.charts.maturity = Highcharts.chart(container, {
            chart: {
                polar: true,
                type: 'area',
                backgroundColor: 'transparent',
                height: 400
            },
            title: {
                text: 'Security Maturity Comparison',
                style: { color: '#ffffff' }
            },
            pane: {
                size: '80%'
            },
            xAxis: {
                categories: [
                    'Identity Management',
                    'Access Control',
                    'Asset Management',
                    'Threat Detection',
                    'Incident Response',
                    'Vulnerability Management',
                    'Compliance',
                    'Risk Management'
                ],
                tickmarkPlacement: 'on',
                lineWidth: 0,
                labels: { style: { color: '#a6acbb' } }
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0,
                max: 5,
                labels: { style: { color: '#a6acbb' } }
            },
            series: [{
                name: 'Current State',
                data: [2, 2, 1, 1, 1, 2, 2, 2],
                color: '#ef4444',
                fillOpacity: 0.3
            }, {
                name: 'With Legacy NAC',
                data: [3, 3, 3, 2, 2, 3, 3, 3],
                color: '#f59e0b',
                fillOpacity: 0.3
            }, {
                name: 'With Portnox',
                data: [5, 5, 5, 5, 5, 4, 5, 5],
                color: '#00e5e6',
                fillOpacity: 0.3
            }],
            legend: {
                itemStyle: { color: '#a6acbb' }
            },
            credits: { enabled: false }
        });
    }
    
    updateRiskROI(risk, industry) {
        // Annual risk avoidance
        const annualAvoidance = risk.annualRiskCost * 0.85; // 85% reduction
        const annualEl = document.getElementById('annual-risk-avoidance');
        if (annualEl) {
            annualEl.textContent = '$' + this.formatNumber(annualAvoidance);
        }
        
        // 3-year avoidance
        const threeYearEl = document.getElementById('three-year-avoidance');
        if (threeYearEl) {
            threeYearEl.textContent = '$' + this.formatNumber(annualAvoidance * 3);
        }
    }
    
    formatNumber(num) {
        return Math.round(num).toLocaleString();
    }
}

// Initialize and register
const riskSecurityView = new RiskSecurityView();
riskSecurityView.initialize();

// Export for global access
window.riskSecurityView = riskSecurityView;

console.log('✅ Risk & Security View loaded');
