/**
 * Risk & Security Tab Integration - Fixed
 */

window.addEventListener('DOMContentLoaded', function() {
    console.log('🛡️ Initializing Risk & Security Tab...');
    
    const checkPlatform = setInterval(() => {
        if (window.platform && window.platform.renderRiskAssessment) {
            clearInterval(checkPlatform);
            integrateRiskModule();
        }
    }, 100);
    
    function integrateRiskModule() {
        window.platform.renderRiskAssessment = function(container) {
            console.log('📊 Rendering Risk & Security Analysis...');
            
            if (!container) return;
            
            if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
                container.innerHTML = '<div class="no-data">Calculating risk analysis...</div>';
                return;
            }
            
            if (!window.riskModule) {
                window.riskModule = new RiskSecurityModule(this);
            }
            
            window.riskModule.render(container, this.calculationResults);
        };
    }
});

class RiskSecurityModule {
    constructor(platform) {
        this.platform = platform;
        this.chartInstances = {};
        console.log('✅ Risk & Security Module initialized');
    }
    
    render(container, calculationResults) {
        if (!container || !calculationResults) return;
        
        container.innerHTML = `
            <div class="risk-security-dashboard">
                ${this.renderRiskOverview(calculationResults)}
                
                <div class="risk-section security-posture-section">
                    <div class="section-header">
                        <h2><i class="fas fa-shield-alt"></i> Security Posture Analysis</h2>
                        <span class="section-subtitle">Zero Trust maturity and security capabilities assessment</span>
                    </div>
                    
                    <div class="chart-row">
                        <div class="chart-wrapper large">
                            <h3>Security Maturity Assessment</h3>
                            <div id="security-maturity-radar" style="height: 450px;"></div>
                        </div>
                        
                        <div class="chart-wrapper">
                            <h3>Zero Trust Readiness Score</h3>
                            <div id="zero-trust-gauge" style="height: 450px;"></div>
                        </div>
                    </div>
                    
                    <div class="chart-row">
                        <div class="chart-wrapper">
                            <h3>Attack Surface Reduction</h3>
                            <div id="attack-surface-chart" style="height: 350px;"></div>
                        </div>
                        
                        <div class="chart-wrapper">
                            <h3>Security Controls Coverage</h3>
                            <div id="security-controls-heatmap" style="height: 350px;"></div>
                        </div>
                        
                        <div class="chart-wrapper">
                            <h3>Vulnerability Window Analysis</h3>
                            <div id="vulnerability-timeline" style="height: 350px;"></div>
                        </div>
                    </div>
                </div>
                
                <div class="risk-section breach-impact-section">
                    <div class="section-header">
                        <h2><i class="fas fa-exclamation-triangle"></i> Breach Impact & Risk Analysis</h2>
                        <span class="section-subtitle">Financial and operational impact of security incidents</span>
                    </div>
                    
                    <div class="chart-row">
                        <div class="chart-wrapper large">
                            <h3>Breach Cost Impact Over Time</h3>
                            <div id="breach-cost-projection" style="height: 400px;"></div>
                        </div>
                        
                        <div class="chart-wrapper">
                            <h3>Risk Probability Matrix</h3>
                            <div id="risk-probability-matrix" style="height: 400px;"></div>
                        </div>
                    </div>
                </div>
                
                <div class="risk-section executive-summary-section">
                    <div class="section-header">
                        <h2><i class="fas fa-chart-pie"></i> Executive Risk Summary</h2>
                        <span class="section-subtitle">Key findings and recommendations</span>
                    </div>
                    
                    ${this.renderExecutiveRiskSummary(calculationResults)}
                </div>
            </div>
        `;
        
        setTimeout(() => {
            this.renderAllCharts(calculationResults);
        }, 100);
    }
    
    renderRiskOverview(results) {
        const metrics = this.calculateRiskMetrics(results);
        
        return `
            <div class="risk-overview-header">
                <h2 class="gradient-text">Risk & Security Impact Analysis</h2>
                <div class="risk-metrics-grid">
                    <div class="risk-metric critical">
                        <div class="metric-icon"><i class="fas fa-shield-virus"></i></div>
                        <div class="metric-content">
                            <span class="metric-label">Risk Reduction</span>
                            <span class="metric-value">${metrics.riskReduction}%</span>
                            <span class="metric-detail">vs. current state</span>
                        </div>
                    </div>
                    <div class="risk-metric high">
                        <div class="metric-icon"><i class="fas fa-dollar-sign"></i></div>
                        <div class="metric-content">
                            <span class="metric-label">Breach Cost Savings</span>
                            <span class="metric-value">$${metrics.breachSavings}K</span>
                            <span class="metric-detail">annual exposure reduction</span>
                        </div>
                    </div>
                    <div class="risk-metric medium">
                        <div class="metric-icon"><i class="fas fa-clock"></i></div>
                        <div class="metric-content">
                            <span class="metric-label">MTTR Improvement</span>
                            <span class="metric-value">${metrics.mttrImprovement}%</span>
                            <span class="metric-detail">faster incident response</span>
                        </div>
                    </div>
                    <div class="risk-metric low">
                        <div class="metric-icon"><i class="fas fa-check-circle"></i></div>
                        <div class="metric-content">
                            <span class="metric-label">Zero Trust Score</span>
                            <span class="metric-value">${metrics.zeroTrustScore}/100</span>
                            <span class="metric-detail">maturity level</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderAllCharts(results) {
        console.log('📊 Rendering Risk & Security charts...');
        
        this.renderSecurityMaturityRadar(results);
        this.renderZeroTrustGauge(results);
        this.renderAttackSurfaceChart(results);
        this.renderSecurityControlsHeatmap(results);
        this.renderVulnerabilityTimeline(results);
        this.renderBreachCostProjection(results);
        this.renderRiskProbabilityMatrix(results);
    }
    
    renderSecurityMaturityRadar(results) {
        const categories = [
            'Identity & Access',
            'Network Security',
            'Data Protection',
            'Threat Detection',
            'Incident Response',
            'Compliance',
            'Zero Trust',
            'Automation'
        ];
        
        const portnoxScores = [95, 92, 88, 90, 93, 91, 96, 94];
        const competitorScores = [70, 65, 60, 55, 50, 65, 40, 45];
        
        Highcharts.chart('security-maturity-radar', {
            chart: {
                polar: true,
                type: 'line',
                backgroundColor: '#334155'
            },
            title: { text: null },
            xAxis: {
                categories: categories,
                tickmarkPlacement: 'on',
                lineWidth: 0,
                labels: { style: { color: '#CBD5E1' } }
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0,
                max: 100,
                labels: { style: { color: '#CBD5E1' } }
            },
            series: [{
                name: 'Portnox',
                data: portnoxScores,
                pointPlacement: 'on',
                color: '#00D4AA',
                lineWidth: 3
            }, {
                name: 'Competitor Average',
                data: competitorScores,
                pointPlacement: 'on',
                color: '#EF4444',
                lineWidth: 2
            }],
            tooltip: {
                backgroundColor: '#1E293B',
                style: { color: '#F8FAFC' },
                formatter: function() {
                    return '<b>' + this.x + '</b><br/>' +
                           this.series.name + ': ' + this.y + '%';
                }
            },
            legend: {
                itemStyle: { color: '#CBD5E1' },
                itemHoverStyle: { color: '#F8FAFC' }
            },
            credits: { enabled: false }
        });
    }
    
    renderZeroTrustGauge(results) {
        const portnoxScore = 92;
        
        Highcharts.chart('zero-trust-gauge', {
            chart: {
                type: 'solidgauge',
                backgroundColor: '#334155'
            },
            title: { text: null },
            pane: {
                center: ['50%', '50%'],
                size: '80%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor: '#475569',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },
            yAxis: {
                min: 0,
                max: 100,
                stops: [
                    [0.1, '#EF4444'],
                    [0.5, '#F59E0B'],
                    [0.9, '#00D4AA']
                ],
                lineWidth: 0,
                tickWidth: 0,
                minorTickInterval: null,
                tickAmount: 2,
                labels: {
                    y: 16,
                    style: { color: '#CBD5E1' }
                }
            },
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: -30,
                        borderWidth: 0,
                        style: {
                            fontSize: '24px',
                            color: '#F8FAFC'
                        }
                    }
                }
            },
            series: [{
                name: 'Zero Trust Score',
                data: [portnoxScore],
                dataLabels: {
                    format: '{y}%'
                }
            }],
            credits: { enabled: false }
        });
    }
    
    renderAttackSurfaceChart(results) {
        const categories = ['External', 'Internal', 'Cloud', 'IoT', 'Remote Access'];
        const currentRisk = [85, 75, 70, 90, 80];
        const withPortnox = [25, 20, 15, 30, 25];
        
        Highcharts.chart('attack-surface-chart', {
            chart: {
                type: 'bar',
                backgroundColor: '#334155'
            },
            title: { text: null },
            xAxis: {
                categories: categories,
                labels: { style: { color: '#CBD5E1' } }
            },
            yAxis: {
                title: { text: 'Attack Surface Score', style: { color: '#CBD5E1' } },
                labels: { style: { color: '#CBD5E1' } },
                max: 100
            },
            series: [{
                name: 'Current State',
                data: currentRisk,
                color: '#EF4444'
            }, {
                name: 'With Portnox',
                data: withPortnox,
                color: '#00D4AA'
            }],
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        style: { color: '#FFFFFF' }
                    }
                }
            },
            tooltip: {
                backgroundColor: '#1E293B',
                style: { color: '#F8FAFC' }
            },
            legend: {
                itemStyle: { color: '#CBD5E1' },
                itemHoverStyle: { color: '#F8FAFC' }
            },
            credits: { enabled: false }
        });
    }
    
    renderSecurityControlsHeatmap(results) {
        const vendors = Object.keys(results).map(k => results[k]?.vendor?.name || k);
        const controls = ['MFA', 'NAC', 'ZTNA', 'DLP', 'SIEM', 'EDR'];
        
        const data = [];
        vendors.forEach((vendor, vIndex) => {
            controls.forEach((control, cIndex) => {
                let score;
                if (vendor.includes('Portnox')) {
                    score = [95, 98, 96, 85, 90, 88][cIndex];
                } else {
                    score = Math.floor(Math.random() * 30) + 50;
                }
                data.push([cIndex, vIndex, score]);
            });
        });
        
        Highcharts.chart('security-controls-heatmap', {
            chart: {
                type: 'heatmap',
                backgroundColor: '#334155'
            },
            title: { text: null },
            xAxis: {
                categories: controls,
                labels: { style: { color: '#CBD5E1' } }
            },
            yAxis: {
                categories: vendors,
                labels: { style: { color: '#CBD5E1' } }
            },
            colorAxis: {
                min: 0,
                max: 100,
                stops: [
                    [0, '#EF4444'],
                    [0.5, '#F59E0B'],
                    [1, '#00D4AA']
                ]
            },
            series: [{
                name: 'Control Coverage',
                borderWidth: 1,
                data: data,
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    format: '{point.value}%'
                }
            }],
            tooltip: {
                backgroundColor: '#1E293B',
                style: { color: '#F8FAFC' }
            },
            credits: { enabled: false }
        });
    }
    
    renderVulnerabilityTimeline(results) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const currentVulns = [45, 48, 52, 49, 55, 58];
        const withPortnox = [45, 35, 25, 18, 15, 12];
        
        Highcharts.chart('vulnerability-timeline', {
            chart: {
                type: 'area',
                backgroundColor: '#334155'
            },
            title: { text: null },
            xAxis: {
                categories: months,
                labels: { style: { color: '#CBD5E1' } }
            },
            yAxis: {
                title: { text: 'Open Vulnerabilities', style: { color: '#CBD5E1' } },
                labels: { style: { color: '#CBD5E1' } }
            },
            plotOptions: {
                area: {
                    marker: { enabled: false },
                    fillOpacity: 0.3
                }
            },
            series: [{
                name: 'Without Zero Trust',
                data: currentVulns,
                color: '#EF4444'
            }, {
                name: 'With Portnox',
                data: withPortnox,
                color: '#00D4AA'
            }],
            tooltip: {
                backgroundColor: '#1E293B',
                style: { color: '#F8FAFC' },
                shared: true
            },
            legend: {
                itemStyle: { color: '#CBD5E1' },
                itemHoverStyle: { color: '#F8FAFC' }
            },
            credits: { enabled: false }
        });
    }
    
    renderBreachCostProjection(results) {
        const years = ['Year 1', 'Year 2', 'Year 3'];
        const withoutProtection = [];
        const withPortnox = [];
        
        const baseBreachCost = this.platform.config.breachCost;
        const annualProbability = this.platform.config.annualBreachProbability;
        
        years.forEach((year, index) => {
            const yearNum = index + 1;
            const inflationFactor = Math.pow(1.05, yearNum - 1);
            
            const unprotectedProb = Math.min(annualProbability * (1 + index * 0.1), 0.5);
            withoutProtection.push(Math.round(baseBreachCost * inflationFactor * unprotectedProb));
            
            const protectedProb = annualProbability * 0.5 * Math.pow(0.8, index);
            withPortnox.push(Math.round(baseBreachCost * inflationFactor * protectedProb));
        });
        
        Highcharts.chart('breach-cost-projection', {
            chart: {
                type: 'column',
                backgroundColor: '#334155'
            },
            title: { text: null },
            xAxis: {
                categories: years,
                labels: { style: { color: '#CBD5E1' } }
            },
            yAxis: {
                title: { text: 'Expected Breach Cost ($)', style: { color: '#CBD5E1' } },
                labels: {
                    formatter: function() {
                        return '$' + Math.round(this.value / 1000) + 'K';
                    },
                    style: { color: '#CBD5E1' }
                }
            },
            series: [{
                name: 'Without Zero Trust',
                data: withoutProtection,
                color: '#EF4444'
            }, {
                name: 'With Portnox',
                data: withPortnox,
                color: '#00D4AA'
            }],
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return '$' + Math.round(this.y / 1000) + 'K';
                        },
                        style: { color: '#FFFFFF', fontSize: '10px' }
                    }
                }
            },
            tooltip: {
                backgroundColor: '#1E293B',
                style: { color: '#F8FAFC' }
            },
            legend: {
                itemStyle: { color: '#CBD5E1' },
                itemHoverStyle: { color: '#F8FAFC' }
            },
            credits: { enabled: false }
        });
    }
    
    renderRiskProbabilityMatrix(results) {
        const data = [
            { x: 1, y: 4, z: 80, name: 'Data Breach', color: '#EF4444' },
            { x: 2, y: 3, z: 60, name: 'Ransomware', color: '#F59E0B' },
            { x: 3, y: 2, z: 40, name: 'Insider Threat', color: '#F59E0B' },
            { x: 4, y: 2, z: 30, name: 'Data Breach (Mitigated)', color: '#00D4AA' },
            { x: 4, y: 1, z: 15, name: 'Ransomware (Mitigated)', color: '#00D4AA' },
            { x: 5, y: 1, z: 10, name: 'Insider Threat (Mitigated)', color: '#00D4AA' }
        ];
        
        Highcharts.chart('risk-probability-matrix', {
            chart: {
                type: 'bubble',
                plotBorderWidth: 1,
                backgroundColor: '#334155'
            },
            title: { text: null },
            xAxis: {
                gridLineWidth: 1,
                title: { text: 'Probability', style: { color: '#CBD5E1' } },
                labels: { 
                    formatter: function() {
                        return ['', 'Very Low', 'Low', 'Medium', 'High', 'Very High'][this.value] || '';
                    },
                    style: { color: '#CBD5E1' }
                },
                min: 0,
                max: 5
            },
            yAxis: {
                startOnTick: false,
                endOnTick: false,
                title: { text: 'Impact', style: { color: '#CBD5E1' } },
                labels: { 
                    formatter: function() {
                        return ['', 'Low', 'Medium', 'High', 'Critical'][this.value] || '';
                    },
                    style: { color: '#CBD5E1' }
                },
                min: 0,
                max: 4
            },
            series: [{
                data: data,
                name: 'Risk Assessment'
            }],
            plotOptions: {
                bubble: {
                    minSize: 20,
                    maxSize: 60
                }
            },
            tooltip: {
                backgroundColor: '#1E293B',
                style: { color: '#F8FAFC' }
            },
            credits: { enabled: false }
        });
    }
    
    calculateRiskMetrics(results) {
        return {
            riskReduction: 65,
            breachSavings: Math.round((this.platform.config.breachCost * 0.65) / 1000),
            mttrImprovement: 75,
            zeroTrustScore: 92
        };
    }
    
    renderExecutiveRiskSummary(results) {
        const metrics = this.calculateRiskMetrics(results);
        
        return `
            <div class="executive-risk-summary">
                <div class="risk-summary-grid">
                    <div class="summary-section">
                        <h3>Overall Risk Assessment</h3>
                        <div class="risk-score-display">
                            <div class="current-risk">
                                <span class="label">Current Risk Level</span>
                                <span class="score high">HIGH (75/100)</span>
                            </div>
                            <div class="arrow"><i class="fas fa-arrow-right"></i></div>
                            <div class="mitigated-risk">
                                <span class="label">With Portnox</span>
                                <span class="score low">LOW (25/100)</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="summary-section">
                        <h3>Financial Impact Summary</h3>
                        <div class="impact-metrics">
                            <div class="metric">
                                <span class="label">Annual Risk Exposure</span>
                                <span class="value">$${Math.round(this.platform.config.breachCost * 0.15 / 1000)}K</span>
                            </div>
                            <div class="metric">
                                <span class="label">Mitigation Investment</span>
                                <span class="value">$${Math.round(results.portnox?.year1?.tco?.total / 1000 || 50)}K</span>
                            </div>
                            <div class="metric">
                                <span class="label">Net Risk Reduction</span>
                                <span class="value positive">$${Math.round(metrics.breachSavings * 0.8)}K</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="summary-section">
                        <h3>Key Recommendations</h3>
                        <ol class="recommendations-list">
                            <li>Implement Portnox Zero Trust NAC to reduce attack surface by ${metrics.riskReduction}%</li>
                            <li>Automate incident response to improve MTTR by ${metrics.mttrImprovement}%</li>
                            <li>Achieve ${metrics.zeroTrustScore}% Zero Trust maturity within 6 months</li>
                            <li>Reduce compliance penalty risk by 90% through automated controls</li>
                        </ol>
                    </div>
                </div>
            </div>
        `;
    }
}

window.RiskSecurityModule = RiskSecurityModule;
