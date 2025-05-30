/**
 * Risk and Security Analysis Module
 * Comprehensive security posture and risk assessment
 */

class RiskSecurityModule {
    constructor(platform) {
        this.platform = platform;
        this.chartInstances = {};
        console.log('🛡️ Risk & Security Module initialized');
    }
    
    render(container, calculationResults) {
        if (!container || !calculationResults) return;
        
        console.log('🎨 Rendering Risk & Security Analysis...');
        
        container.innerHTML = `
            <div class="risk-security-dashboard">
                <!-- Risk Overview Header -->
                ${this.renderRiskOverview(calculationResults)}
                
                <!-- Security Posture Section -->
                <div class="risk-section security-posture-section">
                    <div class="section-header">
                        <h2><i class="fas fa-shield-alt"></i> Security Posture Analysis</h2>
                        <span class="section-subtitle">Zero Trust maturity and security capabilities assessment</span>
                    </div>
                    
                    <div class="chart-row">
                        <!-- Security Maturity Radar -->
                        <div class="chart-wrapper large">
                            <h3>Security Maturity Assessment</h3>
                            <div id="security-maturity-radar" style="height: 450px;"></div>
                        </div>
                        
                        <!-- Zero Trust Score Gauge -->
                        <div class="chart-wrapper">
                            <h3>Zero Trust Readiness Score</h3>
                            <div id="zero-trust-gauge" style="height: 450px;"></div>
                        </div>
                    </div>
                    
                    <div class="chart-row">
                        <!-- Attack Surface Comparison -->
                        <div class="chart-wrapper">
                            <h3>Attack Surface Reduction</h3>
                            <div id="attack-surface-chart" style="height: 350px;"></div>
                        </div>
                        
                        <!-- Security Controls Heatmap -->
                        <div class="chart-wrapper">
                            <h3>Security Controls Coverage</h3>
                            <div id="security-controls-heatmap" style="height: 350px;"></div>
                        </div>
                        
                        <!-- Vulnerability Timeline -->
                        <div class="chart-wrapper">
                            <h3>Vulnerability Window Analysis</h3>
                            <div id="vulnerability-timeline" style="height: 350px;"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Breach Impact Analysis Section -->
                <div class="risk-section breach-impact-section">
                    <div class="section-header">
                        <h2><i class="fas fa-exclamation-triangle"></i> Breach Impact & Risk Analysis</h2>
                        <span class="section-subtitle">Financial and operational impact of security incidents</span>
                    </div>
                    
                    <div class="chart-row">
                        <!-- Breach Cost Projection -->
                        <div class="chart-wrapper large">
                            <h3>Breach Cost Impact Over Time</h3>
                            <div id="breach-cost-projection" style="height: 400px;"></div>
                        </div>
                        
                        <!-- Risk Probability Matrix -->
                        <div class="chart-wrapper">
                            <h3>Risk Probability Matrix</h3>
                            <div id="risk-probability-matrix" style="height: 400px;"></div>
                        </div>
                    </div>
                    
                    <div class="chart-row">
                        <!-- Incident Response Time -->
                        <div class="chart-wrapper">
                            <h3>Incident Response Efficiency</h3>
                            <div id="incident-response-time" style="height: 350px;"></div>
                        </div>
                        
                        <!-- Recovery Time Analysis -->
                        <div class="chart-wrapper">
                            <h3>Recovery Time Comparison</h3>
                            <div id="recovery-time-analysis" style="height: 350px;"></div>
                        </div>
                        
                        <!-- Risk Mitigation ROI -->
                        <div class="chart-wrapper">
                            <h3>Risk Mitigation ROI</h3>
                            <div id="risk-mitigation-roi" style="height: 350px;"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Compliance & Audit Risk Section -->
                <div class="risk-section compliance-risk-section">
                    <div class="section-header">
                        <h2><i class="fas fa-balance-scale"></i> Compliance Risk Assessment</h2>
                        <span class="section-subtitle">Regulatory compliance gaps and audit readiness</span>
                    </div>
                    
                    <div class="chart-row">
                        <!-- Compliance Risk Scorecard -->
                        <div class="chart-wrapper">
                            <h3>Compliance Risk Scorecard</h3>
                            <div id="compliance-risk-scorecard" style="height: 400px;"></div>
                        </div>
                        
                        <!-- Audit Readiness Timeline -->
                        <div class="chart-wrapper">
                            <h3>Audit Readiness Timeline</h3>
                            <div id="audit-readiness-timeline" style="height: 400px;"></div>
                        </div>
                        
                        <!-- Penalty Risk Analysis -->
                        <div class="chart-wrapper">
                            <h3>Regulatory Penalty Risk</h3>
                            <div id="penalty-risk-analysis" style="height: 400px;"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Operational Risk Section -->
                <div class="risk-section operational-risk-section">
                    <div class="section-header">
                        <h2><i class="fas fa-network-wired"></i> Operational Risk Analysis</h2>
                        <span class="section-subtitle">Downtime, availability, and business continuity risks</span>
                    </div>
                    
                    <div class="chart-row">
                        <!-- Downtime Risk Analysis -->
                        <div class="chart-wrapper">
                            <h3>Downtime Risk Profile</h3>
                            <div id="downtime-risk-analysis" style="height: 350px;"></div>
                        </div>
                        
                        <!-- Business Continuity Score -->
                        <div class="chart-wrapper">
                            <h3>Business Continuity Readiness</h3>
                            <div id="business-continuity-score" style="height: 350px;"></div>
                        </div>
                        
                        <!-- Operational Risk Trends -->
                        <div class="chart-wrapper">
                            <h3>Operational Risk Trends</h3>
                            <div id="operational-risk-trends" style="height: 350px;"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Risk Mitigation Strategies -->
                <div class="risk-section mitigation-section">
                    <div class="section-header">
                        <h2><i class="fas fa-shield-check"></i> Risk Mitigation Strategies</h2>
                        <span class="section-subtitle">Recommended actions and their impact</span>
                    </div>
                    
                    ${this.renderMitigationStrategies(calculationResults)}
                </div>
                
                <!-- Executive Risk Summary -->
                <div class="risk-section executive-summary-section">
                    <div class="section-header">
                        <h2><i class="fas fa-chart-pie"></i> Executive Risk Summary</h2>
                        <span class="section-subtitle">Key findings and recommendations</span>
                    </div>
                    
                    ${this.renderExecutiveRiskSummary(calculationResults)}
                </div>
            </div>
        `;
        
        // Render all charts after DOM is ready
        setTimeout(() => {
            this.renderAllCharts(calculationResults);
        }, 100);
    }
    
    renderRiskOverview(results) {
        const portnox = results.portnox;
        if (!portnox) return '';
        
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
        
        // Security Posture Charts
        this.renderSecurityMaturityRadar(results);
        this.renderZeroTrustGauge(results);
        this.renderAttackSurfaceChart(results);
        this.renderSecurityControlsHeatmap(results);
        this.renderVulnerabilityTimeline(results);
        
        // Breach Impact Charts
        this.renderBreachCostProjection(results);
        this.renderRiskProbabilityMatrix(results);
        this.renderIncidentResponseTime(results);
        this.renderRecoveryTimeAnalysis(results);
        this.renderRiskMitigationROI(results);
        
        // Compliance Risk Charts
        this.renderComplianceRiskScorecard(results);
        this.renderAuditReadinessTimeline(results);
        this.renderPenaltyRiskAnalysis(results);
        
        // Operational Risk Charts
        this.renderDowntimeRiskAnalysis(results);
        this.renderBusinessContinuityScore(results);
        this.renderOperationalRiskTrends(results);
    }
    
    // Security Posture Charts
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
        const industryAvg = [75, 70, 65, 60, 55, 70, 50, 55];
        
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
            }, {
                name: 'Industry Benchmark',
                data: industryAvg,
                pointPlacement: 'on',
                color: '#94A3B8',
                lineWidth: 2,
                dashStyle: 'dash'
            }],
            plotOptions: {
                series: {
                    marker: { radius: 4 }
                }
            },
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
        const competitorScore = 45;
        
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
                    [0.1, '#EF4444'], // red
                    [0.5, '#F59E0B'], // yellow
                    [0.9, '#00D4AA'] // green
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
                },
                tooltip: {
                    valueSuffix: '% Zero Trust Maturity'
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
                title: { 
                    text: 'Attack Surface Score',
                    style: { color: '#CBD5E1' }
                },
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
                style: { color: '#F8FAFC' },
                formatter: function() {
                    const reduction = currentRisk[this.point.index] - this.y;
                    return '<b>' + this.x + '</b><br/>' +
                           this.series.name + ': ' + this.y + '<br/>' +
                           (this.series.name === 'With Portnox' ? 
                            'Reduction: ' + reduction + ' points' : '');
                }
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
                style: { color: '#F8FAFC' },
                formatter: function() {
                    return '<b>' + this.series.yAxis.categories[this.point.y] + '</b><br/>' +
                           this.series.xAxis.categories[this.point.x] + ': <b>' + this.point.value + '%</b>';
                }
            },
            credits: { enabled: false }
        });
    }
    
    renderVulnerabilityTimeline(results) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentVulns = [45, 48, 52, 49, 55, 58, 62, 60, 65, 63, 67, 70];
        const withPortnox = [45, 35, 25, 18, 15, 12, 10, 8, 6, 5, 4, 3];
        
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
                title: { 
                    text: 'Open Vulnerabilities',
                    style: { color: '#CBD5E1' }
                },
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
    
    // Breach Impact Charts
    renderBreachCostProjection(results) {
        const years = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];
        const withoutProtection = [];
        const withPortnox = [];
        
        const baseBreachCost = this.platform.config.breachCost;
        const annualProbability = this.platform.config.annualBreachProbability;
        
        years.forEach((year, index) => {
            const yearNum = index + 1;
            const inflationFactor = Math.pow(1.05, yearNum - 1);
            
            // Without protection - increasing probability over time
            const unprotectedProb = Math.min(annualProbability * (1 + index * 0.1), 0.5);
            withoutProtection.push(Math.round(baseBreachCost * inflationFactor * unprotectedProb));
            
            // With Portnox - decreasing probability over time
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
                title: { 
                    text: 'Expected Breach Cost ($)',
                    style: { color: '#CBD5E1' }
                },
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
                style: { color: '#F8FAFC' },
                formatter: function() {
                    const savings = withoutProtection[this.point.index] - this.y;
                    return '<b>' + this.x + '</b><br/>' +
                           this.series.name + ': $' + Math.round(this.y / 1000) + 'K<br/>' +
                           (this.series.name === 'With Portnox' ? 
                            'Savings: $' + Math.round(savings / 1000) + 'K' : '');
                }
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
            { x: 2, y: 4, z: 70, name: 'Supply Chain', color: '#EF4444' },
            { x: 4, y: 1, z: 20, name: 'DDoS', color: '#3B82F6' },
            // With Portnox
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
                        return ['', 'Very Low', 'Low', 'Medium', 'High', 'Very High'][this.value];
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
                        return ['', 'Low', 'Medium', 'High', 'Critical'][this.value];
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
                style: { color: '#F8FAFC' },
                formatter: function() {
                    return '<b>' + this.point.name + '</b><br/>' +
                           'Probability: ' + ['', 'Very Low', 'Low', 'Medium', 'High', 'Very High'][this.x] + '<br/>' +
                           'Impact: ' + ['', 'Low', 'Medium', 'High', 'Critical'][this.y];
                }
            },
            credits: { enabled: false }
        });
    }
    
    renderIncidentResponseTime(results) {
        const phases = ['Detection', 'Triage', 'Containment', 'Eradication', 'Recovery'];
        const currentTime = [240, 180, 360, 480, 720]; // minutes
        const withPortnox = [5, 15, 30, 60, 120]; // minutes
        
        Highcharts.chart('incident-response-time', {
            chart: {
                type: 'bar',
                backgroundColor: '#334155'
            },
            title: { text: null },
            xAxis: {
                categories: phases,
                labels: { style: { color: '#CBD5E1' } }
            },
            yAxis: {
                title: { 
                    text: 'Response Time (minutes)',
                    style: { color: '#CBD5E1' }
                },
                labels: { style: { color: '#CBD5E1' } },
                type: 'logarithmic'
            },
            series: [{
                name: 'Current Process',
                data: currentTime,
                color: '#EF4444'
            }, {
                name: 'With Portnox Automation',
                data: withPortnox,
                color: '#00D4AA'
            }],
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return this.y + ' min';
                        },
                        style: { color: '#FFFFFF' }
                    }
                }
            },
            tooltip: {
                backgroundColor: '#1E293B',
                style: { color: '#F8FAFC' },
                formatter: function() {
                    const improvement = ((currentTime[this.point.index] - this.y) / currentTime[this.point.index] * 100).toFixed(0);
                    return '<b>' + this.x + '</b><br/>' +
                           this.series.name + ': ' + this.y + ' minutes<br/>' +
                           (this.series.name === 'With Portnox Automation' ? 
                            'Improvement: ' + improvement + '%' : '');
                }
            },
            legend: {
                itemStyle: { color: '#CBD5E1' },
                itemHoverStyle: { color: '#F8FAFC' }
            },
            credits: { enabled: false }
        });
    }
    
    renderRecoveryTimeAnalysis(results) {
        const scenarios = ['Minor Incident', 'Major Breach', 'Ransomware', 'System Compromise'];
        const rtoData = [];
        const rpoData = [];
        
        scenarios.forEach(scenario => {
            let baseRTO, baseRPO;
            switch(scenario) {
                case 'Minor Incident':
                    baseRTO = 4; baseRPO = 1; break;
                case 'Major Breach':
                    baseRTO = 24; baseRPO = 4; break;
                case 'Ransomware':
                    baseRTO = 72; baseRPO = 8; break;
                case 'System Compromise':
                    baseRTO = 120; baseRPO = 24; break;
            }
            
            rtoData.push({
                name: scenario,
                current: baseRTO,
                withPortnox: baseRTO * 0.3
            });
            
            rpoData.push({
                name: scenario,
                current: baseRPO,
                withPortnox: baseRPO * 0.2
            });
        });
        
        Highcharts.chart('recovery-time-analysis', {
            chart: {
                backgroundColor: '#334155'
            },
            title: { text: null },
            xAxis: {
                categories: scenarios,
                labels: { style: { color: '#CBD5E1' } }
            },
            yAxis: [{
                title: { 
                    text: 'Recovery Time (Hours)',
                    style: { color: '#CBD5E1' }
                },
                labels: { style: { color: '#CBD5E1' } }
            }, {
                title: { 
                    text: 'Recovery Point (Hours)',
                    style: { color: '#CBD5E1' }
                },
                labels: { style: { color: '#CBD5E1' } },
                opposite: true
            }],
            series: [{
                type: 'column',
                name: 'RTO - Current',
                data: rtoData.map(d => d.current),
                color: '#EF4444',
                yAxis: 0
            }, {
                type: 'column',
                name: 'RTO - With Portnox',
                data: rtoData.map(d => d.withPortnox),
                color: '#00D4AA',
                yAxis: 0
            }, {
                type: 'line',
                name: 'RPO - With Portnox',
                data: rpoData.map(d => d.withPortnox),
                color: '#3B82F6',
                yAxis: 1,
                marker: { radius: 5 }
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
    
    renderRiskMitigationROI(results) {
        const investments = ['Zero Trust NAC', 'Automation', 'Training', 'Compliance', 'Monitoring'];
        const investmentCost = [50000, 20000, 15000, 25000, 30000];
        const riskReduction = [250000, 100000, 50000, 150000, 80000];
        const roiData = [];
        
        investments.forEach((inv, idx) => {
            const roi = ((riskReduction[idx] - investmentCost[idx]) / investmentCost[idx]) * 100;
            roiData.push(Math.round(roi));
        });
        
        Highcharts.chart('risk-mitigation-roi', {
            chart: {
                type: 'waterfall',
                backgroundColor: '#334155'
            },
            title: { text: null },
            xAxis: {
                type: 'category',
                labels: { style: { color: '#CBD5E1' } }
            },
            yAxis: {
                title: { 
                    text: 'ROI %',
                    style: { color: '#CBD5E1' }
                },
                labels: { style: { color: '#CBD5E1' } }
            },
            series: [{
                upColor: '#00D4AA',
                color: '#EF4444',
                data: investments.map((inv, idx) => ({
                    name: inv,
                    y: roiData[idx]
                })),
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return this.y + '%';
                    },
                    style: { color: '#FFFFFF' }
                }
            }],
            tooltip: {
                backgroundColor: '#1E293B',
                style: { color: '#F8FAFC' },
                formatter: function() {
                    return '<b>' + this.x + '</b><br/>' +
                           'ROI: ' + this.y + '%<br/>' +
                           'Investment: $' + Math.round(investmentCost[investments.indexOf(this.x)] / 1000) + 'K<br/>' +
                           'Risk Reduction: $' + Math.round(riskReduction[investments.indexOf(this.x)] / 1000) + 'K';
                }
            },
            legend: { enabled: false },
            credits: { enabled: false }
        });
    }
    
    // Compliance Risk Charts
    renderComplianceRiskScorecard(results) {
        const frameworks = ['SOX', 'GDPR', 'HIPAA', 'PCI DSS', 'ISO 27001'];
        const currentScore = [45, 50, 40, 55, 60];
        const withPortnox = [95, 92, 94, 96, 98];
        
        Highcharts.chart('compliance-risk-scorecard', {
            chart: {
                type: 'column',
                backgroundColor: '#334155'
            },
            title: { text: null },
            xAxis: {
                categories: frameworks,
                labels: { style: { color: '#CBD5E1' } }
            },
            yAxis: {
                title: { 
                    text: 'Compliance Score',
                    style: { color: '#CBD5E1' }
                },
                labels: { style: { color: '#CBD5E1' } },
                max: 100
            },
            series: [{
                name: 'Current State',
                data: currentScore,
                color: '#F59E0B'
            }, {
                name: 'With Portnox',
                data: withPortnox,
                color: '#00D4AA'
            }],
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true,
                        format: '{y}%',
                        style: { color: '#FFFFFF' }
                    }
                }
            },
            tooltip: {
                backgroundColor: '#1E293B',
                style: { color: '#F8FAFC' },
                valueSuffix: '% compliant'
            },
            legend: {
                itemStyle: { color: '#CBD5E1' },
                itemHoverStyle: { color: '#F8FAFC' }
            },
            credits: { enabled: false }
        });
    }
    
    renderAuditReadinessTimeline(results) {
        const milestones = [
            { x: 0, y: 20, name: 'Current State' },
            { x: 1, y: 40, name: 'Initial Deploy' },
            { x: 3, y: 60, name: 'Policy Setup' },
            { x: 6, y: 80, name: 'Full Integration' },
            { x: 9, y: 90, name: 'Audit Ready' },
            { x: 12, y: 95, name: 'Certified' }
        ];
        
        Highcharts.chart('audit-readiness-timeline', {
            chart: {
                type: 'spline',
                backgroundColor: '#334155'
            },
            title: { text: null },
            xAxis: {
                title: { 
                    text: 'Months',
                    style: { color: '#CBD5E1' }
                },
                labels: { style: { color: '#CBD5E1' } },
                max: 12
            },
            yAxis: {
                title: { 
                    text: 'Audit Readiness %',
                    style: { color: '#CBD5E1' }
                },
                labels: { style: { color: '#CBD5E1' } },
                max: 100
            },
            series: [{
                name: 'Readiness Progress',
                data: milestones,
                color: '#00D4AA',
                marker: {
                    radius: 6,
                    fillColor: '#FFFFFF',
                    lineWidth: 2,
                    lineColor: '#00D4AA'
                }
            }],
            plotOptions: {
                spline: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        style: { 
                            color: '#CBD5E1',
                            fontSize: '10px'
                        },
                        y: -10
                    }
                }
            },
            tooltip: {
                backgroundColor: '#1E293B',
                style: { color: '#F8FAFC' },
                formatter: function() {
                    return '<b>' + this.point.name + '</b><br/>' +
                           'Month ' + this.x + ': ' + this.y + '% ready';
                }
            },
            credits: { enabled: false }
        });
    }
    
    renderPenaltyRiskAnalysis(results) {
        const frameworks = ['SOX', 'GDPR', 'HIPAA', 'PCI DSS'];
        const maxPenalties = [25000000, 20000000, 1500000, 500000];
        const currentRisk = [];
        const mitigatedRisk = [];
        
        frameworks.forEach((framework, idx) => {
            const baseRisk = maxPenalties[idx] * 0.02; // 2% risk
            currentRisk.push(Math.round(baseRisk));
            mitigatedRisk.push(Math.round(baseRisk * 0.1)); // 90% reduction
        });
        
        Highcharts.chart('penalty-risk-analysis', {
            chart: {
                type: 'column',
                backgroundColor: '#334155'
            },
            title: { text: null },
            xAxis: {
                categories: frameworks,
                labels: { style: { color: '#CBD5E1' } }
            },
            yAxis: {
                title: { 
                    text: 'Annual Penalty Risk ($)',
                    style: { color: '#CBD5E1' }
                },
                labels: {
                    formatter: function() {
                        return '$' + Math.round(this.value / 1000) + 'K';
                    },
                    style: { color: '#CBD5E1' }
                },
                type: 'logarithmic'
            },
            series: [{
                name: 'Current Risk Exposure',
                data: currentRisk,
                color: '#EF4444'
            }, {
                name: 'With Portnox Controls',
                data: mitigatedRisk,
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
                style: { color: '#F8FAFC' },
                formatter: function() {
                    const reduction = currentRisk[this.point.index] - this.y;
                    return '<b>' + this.x + '</b><br/>' +
                           this.series.name + ': $' + Math.round(this.y / 1000) + 'K<br/>' +
                           'Max Penalty: $' + Math.round(maxPenalties[this.point.index] / 1000000) + 'M<br/>' +
                           (this.series.name.includes('Portnox') ? 
                            'Risk Reduction: $' + Math.round(reduction / 1000) + 'K' : '');
                }
            },
            legend: {
                itemStyle: { color: '#CBD5E1' },
                itemHoverStyle: { color: '#F8FAFC' }
            },
            credits: { enabled: false }
        });
    }
    
    // Operational Risk Charts
    renderDowntimeRiskAnalysis(results) {
        const causes = ['Network Failure', 'Security Incident', 'Config Error', 'Hardware Failure', 'Software Bug'];
        const frequency = [12, 6, 24, 4, 18]; // incidents per year
        const avgDowntime = [4, 8, 2, 6, 3]; // hours per incident
        const withPortnox = [2, 1, 0.5, 4, 1]; // reduced incidents
        
        const annualDowntime = [];
        const reducedDowntime = [];
        
        causes.forEach((cause, idx) => {
            annualDowntime.push(frequency[idx] * avgDowntime[idx]);
            reducedDowntime.push(withPortnox[idx] * avgDowntime[idx] * 0.5); // Also faster resolution
        });
        
        Highcharts.chart('downtime-risk-analysis', {
            chart: {
                type: 'bar',
                backgroundColor: '#334155'
            },
            title: { text: null },
            xAxis: {
                categories: causes,
                labels: { style: { color: '#CBD5E1' } }
            },
            yAxis: {
                title: { 
                    text: 'Annual Downtime (Hours)',
                    style: { color: '#CBD5E1' }
                },
                labels: { style: { color: '#CBD5E1' } }
            },
            series: [{
                name: 'Current State',
                data: annualDowntime,
                color: '#EF4444'
            }, {
                name: 'With Portnox',
                data: reducedDowntime,
                color: '#00D4AA'
            }],
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        format: '{y}h',
                        style: { color: '#FFFFFF' }
                    }
                }
            },
            tooltip: {
                backgroundColor: '#1E293B',
                style: { color: '#F8FAFC' },
                formatter: function() {
                    const costPerHour = this.series.chart.userOptions.downtimeCost || 2500;
                    const cost = this.y * costPerHour;
                    return '<b>' + this.x + '</b><br/>' +
                           this.series.name + ': ' + this.y + ' hours/year<br/>' +
                           'Cost Impact: $' + Math.round(cost / 1000) + 'K';
                }
            },
            legend: {
                itemStyle: { color: '#CBD5E1' },
                itemHoverStyle: { color: '#F8FAFC' }
            },
            credits: { enabled: false },
            downtimeCost: this.platform.config.downtimeCostPerHour
        });
    }
    
    renderBusinessContinuityScore(results) {
        const categories = ['RTO', 'RPO', 'Redundancy', 'Automation', 'Documentation', 'Testing'];
        const currentScores = [40, 35, 50, 30, 45, 25];
        const portnoxScores = [85, 90, 80, 95, 88, 92];
        
        Highcharts.chart('business-continuity-score', {
            chart: {
                polar: true,
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
                labels: { enabled: false }
            },
            series: [{
                name: 'Current State',
                data: currentScores,
                pointPlacement: 'on',
                color: '#F59E0B',
                fillOpacity: 0.2
            }, {
                name: 'With Portnox',
                data: portnoxScores,
                pointPlacement: 'on',
                color: '#00D4AA',
                fillOpacity: 0.3
            }],
            tooltip: {
                backgroundColor: '#1E293B',
                style: { color: '#F8FAFC' },
                pointFormat: '<b>{point.y}%</b> readiness'
            },
            legend: {
                itemStyle: { color: '#CBD5E1' },
                itemHoverStyle: { color: '#F8FAFC' }
            },
            credits: { enabled: false }
        });
    }
    
    renderOperationalRiskTrends(results) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const riskScore = [75, 78, 72, 70, 65, 60, 55, 48, 42, 35, 30, 25];
        const incidents = [8, 10, 7, 6, 5, 4, 3, 3, 2, 2, 1, 1];
        const availability = [96.5, 96.0, 97.0, 97.5, 98.0, 98.5, 99.0, 99.2, 99.5, 99.6, 99.8, 99.9];
        
        Highcharts.chart('operational-risk-trends', {
            chart: {
                backgroundColor: '#334155'
            },
            title: { text: null },
            xAxis: {
                categories: months,
                labels: { style: { color: '#CBD5E1' } }
            },
            yAxis: [{
                title: { 
                    text: 'Risk Score',
                    style: { color: '#CBD5E1' }
                },
                labels: { style: { color: '#CBD5E1' } }
            }, {
                title: { 
                    text: 'Availability %',
                    style: { color: '#CBD5E1' }
                },
                labels: { style: { color: '#CBD5E1' } },
                opposite: true,
                min: 95,
                max: 100
            }],
            series: [{
                name: 'Risk Score',
                type: 'area',
                data: riskScore,
                color: '#EF4444',
                fillOpacity: 0.3,
                yAxis: 0
            }, {
                name: 'Incidents',
                type: 'column',
                data: incidents,
                color: '#F59E0B',
                yAxis: 0
            }, {
                name: 'Availability',
                type: 'line',
                data: availability,
                color: '#00D4AA',
                yAxis: 1,
                marker: { radius: 4 }
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
    
    // Helper Methods
    calculateRiskMetrics(results) {
        const portnox = results.portnox;
        const competitor = Object.values(results).find(r => r !== portnox) || portnox;
        
        return {
            riskReduction: 65,
            breachSavings: Math.round((this.platform.config.breachCost * 0.65) / 1000),
            mttrImprovement: 75,
            zeroTrustScore: 92
        };
    }
    
    renderMitigationStrategies(results) {
        return `
            <div class="mitigation-strategies-grid">
                <div class="strategy-card priority-critical">
                    <div class="strategy-header">
                        <i class="fas fa-exclamation-circle"></i>
                        <h3>Critical Priority</h3>
                    </div>
                    <ul>
                        <li>Deploy Zero Trust NAC immediately</li>
                        <li>Enable continuous device monitoring</li>
                        <li>Implement automated threat response</li>
                    </ul>
                    <div class="strategy-impact">
                        <span>Risk Reduction: 45%</span>
                        <span>Timeline: 30 days</span>
                    </div>
                </div>
                
                <div class="strategy-card priority-high">
                    <div class="strategy-header">
                        <i class="fas fa-shield-alt"></i>
                        <h3>High Priority</h3>
                    </div>
                    <ul>
                        <li>Strengthen identity verification</li>
                        <li>Enhance network segmentation</li>
                        <li>Deploy advanced analytics</li>
                    </ul>
                    <div class="strategy-impact">
                        <span>Risk Reduction: 25%</span>
                        <span>Timeline: 60 days</span>
                    </div>
                </div>
                
                <div class="strategy-card priority-medium">
                    <div class="strategy-header">
                        <i class="fas fa-tasks"></i>
                        <h3>Medium Priority</h3>
                    </div>
                    <ul>
                        <li>Improve incident response procedures</li>
                        <li>Enhance compliance automation</li>
                        <li>Expand security training</li>
                    </ul>
                    <div class="strategy-impact">
                        <span>Risk Reduction: 15%</span>
                        <span>Timeline: 90 days</span>
                    </div>
                </div>
            </div>
        `;
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

// Initialize Risk & Security Module
window.riskSecurityModule = new RiskSecurityModule(window.platform);
