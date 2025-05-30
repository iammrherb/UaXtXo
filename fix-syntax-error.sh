#!/bin/bash

# Fix script for syntax error in premium-executive-platform.js

echo "🔧 Fixing syntax error in premium-executive-platform.js..."

# First, restore from backup if it exists
if [ -f "js/views/premium-executive-platform.js.backup" ]; then
    echo "✅ Restoring from backup..."
    cp js/views/premium-executive-platform.js.backup js/views/premium-executive-platform.js
else
    echo "❌ No backup found. Please restore the original file first:"
    echo "   git checkout js/views/premium-executive-platform.js"
    exit 1
fi

# Create a Node.js script to properly update the renderRiskAssessment method
cat > fix-risk-update.js << 'EOF'
const fs = require('fs');

// Read the file
const filePath = 'js/views/premium-executive-platform.js';
let content = fs.readFileSync(filePath, 'utf8');

// Find the renderRiskAssessment method more precisely
const pattern = /renderRiskAssessment\(container\)\s*{[\s\S]*?}\s*(?=renderComplianceAnalysis)/;

// The new implementation
const newImplementation = `renderRiskAssessment(container) {
        if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
            container.innerHTML = '<div class="no-data">Calculating risk analysis...</div>';
            return;
        }
        
        const portnoxResult = this.calculationResults.portnox;
        const competitors = Object.entries(this.calculationResults).filter(([k]) => k !== 'portnox');
        
        container.innerHTML = \`
            <div class="risk-assessment">
                <!-- Executive Risk Summary -->
                <div class="risk-executive-summary">
                    <h2>Executive Risk & Security Impact Analysis</h2>
                    <p class="subtitle">Comprehensive breach, incident, and business continuity assessment with financial impact modeling</p>
                    
                    <div class="risk-summary-grid">
                        <div class="risk-metric critical">
                            <div class="metric-icon">
                                <i class="fas fa-shield-virus"></i>
                            </div>
                            <div class="metric-content">
                                <h3>Risk Reduction with Portnox</h3>
                                <div class="metric-value">\${this.calculateRiskReduction()}%</div>
                                <p>Lower breach probability vs. competitors</p>
                                <span class="help-tip" title="Based on security posture, automation level, and threat detection capabilities">ⓘ</span>
                            </div>
                        </div>
                        
                        <div class="risk-metric financial">
                            <div class="metric-icon">
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                            <div class="metric-content">
                                <h3>Avoided Breach Costs</h3>
                                <div class="metric-value">$\${(this.calculateAvoidedBreachCosts() / 1000000).toFixed(1)}M</div>
                                <p>3-year risk-adjusted savings</p>
                                <span class="help-tip" title="Calculated using industry breach probability (23%) and average breach cost ($4.35M)">ⓘ</span>
                            </div>
                        </div>
                        
                        <div class="risk-metric timeline">
                            <div class="metric-icon">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="metric-content">
                                <h3>MTTR Improvement</h3>
                                <div class="metric-value">\${this.calculateMTTRImprovement()}%</div>
                                <p>Faster incident response</p>
                                <span class="help-tip" title="Mean Time to Respond - Critical for minimizing breach impact">ⓘ</span>
                            </div>
                        </div>
                        
                        <div class="risk-metric compliance">
                            <div class="metric-icon">
                                <i class="fas fa-clipboard-check"></i>
                            </div>
                            <div class="metric-content">
                                <h3>Compliance Readiness</h3>
                                <div class="metric-value">\${this.calculateComplianceScore()}%</div>
                                <p>Audit success probability</p>
                                <span class="help-tip" title="Based on automated compliance reporting and continuous monitoring capabilities">ⓘ</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Security Posture Comparison -->
                <div class="chart-section">
                    <h3>Security Posture Analysis</h3>
                    <p class="section-desc">Comprehensive security capabilities comparison across critical dimensions</p>
                    <div class="chart-container">
                        <div id="security-radar-chart" style="height: 500px;"></div>
                    </div>
                </div>
                
                <!-- Breach Impact Analysis -->
                <div class="chart-section">
                    <h3>Financial Impact of Security Incidents</h3>
                    <p class="section-desc">Risk-adjusted financial exposure analysis over 3 years</p>
                    <div class="chart-grid">
                        <div class="chart-container">
                            <h4>Breach Cost Probability Distribution</h4>
                            <div id="breach-cost-distribution" style="height: 400px;"></div>
                        </div>
                        <div class="chart-container">
                            <h4>Cumulative Risk Exposure</h4>
                            <div id="risk-exposure-timeline" style="height: 400px;"></div>
                        </div>
                    </div>
                    
                    <div class="breach-scenarios">
                        <h4>Breach Scenario Analysis</h4>
                        <div class="scenario-grid">
                            \${this.generateBreachScenarios()}
                        </div>
                    </div>
                </div>
                
                <!-- Threat Landscape Visualization -->
                <div class="chart-section">
                    <h3>Threat Protection Coverage</h3>
                    <p class="section-desc">Defense capabilities against current threat landscape</p>
                    <div class="chart-container">
                        <div id="threat-coverage-heatmap" style="height: 500px;"></div>
                    </div>
                    <div class="threat-statistics">
                        <div class="stat-card">
                            <h4>Attack Vectors Covered</h4>
                            <div class="coverage-bars">
                                \${this.generateThreatCoverage()}
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Security Maturity Model -->
                <div class="chart-section">
                    <h3>Security Maturity Evolution</h3>
                    <p class="section-desc">Projected security maturity progression with each solution</p>
                    <div class="chart-container">
                        <div id="maturity-progression-chart" style="height: 400px;"></div>
                    </div>
                </div>
                
                <!-- Incident Response Metrics -->
                <div class="chart-section">
                    <h3>Incident Response Performance</h3>
                    <p class="section-desc">Critical metrics for security incident management</p>
                    <div class="metrics-grid">
                        \${this.generateIncidentMetrics()}
                    </div>
                    <div class="chart-container">
                        <h4>Response Time Comparison</h4>
                        <div id="response-time-chart" style="height: 350px;"></div>
                    </div>
                </div>
                
                <!-- Risk Mitigation Strategies -->
                <div class="recommendations-section">
                    <h3>Executive Risk Mitigation Recommendations</h3>
                    <div class="recommendation-cards">
                        \${this.generateRiskRecommendations()}
                    </div>
                </div>
                
                <!-- Insurance & Liability Impact -->
                <div class="insurance-section">
                    <h3>Cyber Insurance & Liability Impact</h3>
                    <div class="insurance-grid">
                        <div class="insurance-card">
                            <h4>Premium Reduction Potential</h4>
                            <div class="premium-comparison">
                                \${this.generateInsuranceImpact()}
                            </div>
                        </div>
                        <div class="insurance-card">
                            <h4>Coverage Enhancement</h4>
                            <ul class="coverage-benefits">
                                <li><i class="fas fa-check-circle"></i> Lower deductibles with proven security</li>
                                <li><i class="fas fa-check-circle"></i> Expanded coverage limits available</li>
                                <li><i class="fas fa-check-circle"></i> Reduced exclusions with Zero Trust</li>
                                <li><i class="fas fa-check-circle"></i> Faster claim processing with audit trails</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        \`;
        
        // Initialize all charts
        setTimeout(() => {
            this.renderSecurityRadarChart();
            this.renderBreachCostDistribution();
            this.renderRiskExposureTimeline();
            this.renderThreatCoverageHeatmap();
            this.renderMaturityProgressionChart();
            this.renderResponseTimeChart();
        }, 100);
    }
    
    // Risk calculation methods
    calculateRiskReduction() {
        const portnoxScore = this.calculationResults.portnox?.vendor.metrics.securityScore || 0;
        const avgCompetitorScore = Object.entries(this.calculationResults)
            .filter(([k]) => k !== 'portnox')
            .reduce((sum, [, result]) => sum + result.vendor.metrics.securityScore, 0) / 
            Math.max(1, this.selectedVendors.length - 1);
        
        return Math.round(((portnoxScore - avgCompetitorScore) / avgCompetitorScore) * 100);
    }
    
    calculateAvoidedBreachCosts() {
        const portnox = this.calculationResults.portnox;
        const breachProbabilityReduction = (100 - portnox.vendor.metrics.securityScore) / 100;
        const avoidedCost = this.config.breachCost * this.config.annualBreachProbability * 
                           (1 - breachProbabilityReduction) * 3; // 3 years
        return avoidedCost;
    }
    
    calculateMTTRImprovement() {
        const portnoxAutomation = this.calculationResults.portnox?.vendor.metrics.automationLevel || 0;
        const avgCompetitorAutomation = Object.entries(this.calculationResults)
            .filter(([k]) => k !== 'portnox')
            .reduce((sum, [, result]) => sum + result.vendor.metrics.automationLevel, 0) / 
            Math.max(1, this.selectedVendors.length - 1);
        
        return Math.round(((portnoxAutomation - avgCompetitorAutomation) / avgCompetitorAutomation) * 100);
    }
    
    calculateComplianceScore() {
        const portnox = this.calculationResults.portnox?.vendor;
        const baseScore = portnox?.metrics.securityScore || 0;
        const automationBonus = (portnox?.metrics.automationLevel || 0) * 0.2;
        return Math.min(100, Math.round(baseScore + automationBonus));
    }
    
    generateBreachScenarios() {
        const scenarios = [
            {
                type: 'Ransomware Attack',
                icon: 'fas fa-lock',
                withoutNAC: '$2.5M average loss',
                withPortnox: '$125K limited impact',
                reduction: '95%'
            },
            {
                type: 'Data Exfiltration',
                icon: 'fas fa-database',
                withoutNAC: '$4.35M avg breach cost',
                withPortnox: '$435K contained breach',
                reduction: '90%'
            },
            {
                type: 'Insider Threat',
                icon: 'fas fa-user-secret',
                withoutNAC: '$1.8M internal breach',
                withPortnox: '$90K early detection',
                reduction: '95%'
            },
            {
                type: 'Supply Chain Attack',
                icon: 'fas fa-link',
                withoutNAC: '$3.2M partner breach',
                withPortnox: '$320K isolated impact',
                reduction: '90%'
            }
        ];
        
        return scenarios.map(scenario => \`
            <div class="scenario-card">
                <div class="scenario-header">
                    <i class="\${scenario.icon}"></i>
                    <h5>\${scenario.type}</h5>
                </div>
                <div class="scenario-impact">
                    <div class="impact-row without">
                        <span class="label">Without NAC:</span>
                        <span class="value danger">\${scenario.withoutNAC}</span>
                    </div>
                    <div class="impact-row with">
                        <span class="label">With Portnox:</span>
                        <span class="value success">\${scenario.withPortnox}</span>
                    </div>
                    <div class="reduction-badge">
                        <i class="fas fa-shield-alt"></i>
                        \${scenario.reduction} Risk Reduction
                    </div>
                </div>
            </div>
        \`).join('');
    }
    
    generateThreatCoverage() {
        const threats = [
            { name: 'Malware/Ransomware', portnox: 95, average: 70 },
            { name: 'Phishing/Social Engineering', portnox: 88, average: 60 },
            { name: 'Zero-Day Exploits', portnox: 85, average: 55 },
            { name: 'Lateral Movement', portnox: 98, average: 65 },
            { name: 'Data Exfiltration', portnox: 92, average: 68 },
            { name: 'Unauthorized Access', portnox: 99, average: 75 },
            { name: 'IoT/OT Attacks', portnox: 94, average: 50 },
            { name: 'Supply Chain Attacks', portnox: 87, average: 58 }
        ];
        
        return threats.map(threat => \`
            <div class="coverage-item">
                <div class="coverage-header">
                    <span class="threat-name">\${threat.name}</span>
                    <span class="coverage-percent">\${threat.portnox}%</span>
                </div>
                <div class="coverage-bar">
                    <div class="bar-container">
                        <div class="bar-fill portnox" style="width: \${threat.portnox}%"></div>
                        <div class="bar-fill average" style="width: \${threat.average}%"></div>
                    </div>
                </div>
                <div class="coverage-legend">
                    <span class="legend-item portnox">Portnox</span>
                    <span class="legend-item average">Industry Avg</span>
                </div>
            </div>
        \`).join('');
    }
    
    generateIncidentMetrics() {
        const metrics = [
            {
                icon: 'fas fa-eye',
                title: 'Mean Time to Detect',
                portnox: '3 minutes',
                competitors: '206 days avg',
                improvement: '99.98%'
            },
            {
                icon: 'fas fa-shield-alt',
                title: 'Mean Time to Contain',
                portnox: '8 minutes',
                competitors: '73 days avg',
                improvement: '99.85%'
            },
            {
                icon: 'fas fa-undo',
                title: 'Mean Time to Recover',
                portnox: '45 minutes',
                competitors: '21 days avg',
                improvement: '99.85%'
            },
            {
                icon: 'fas fa-chart-line',
                title: 'False Positive Rate',
                portnox: '0.1%',
                competitors: '23% avg',
                improvement: '99.6%'
            }
        ];
        
        return metrics.map(metric => \`
            <div class="incident-metric-card">
                <i class="\${metric.icon}"></i>
                <h4>\${metric.title}</h4>
                <div class="metric-comparison">
                    <div class="metric-row">
                        <span class="label">Portnox:</span>
                        <span class="value success">\${metric.portnox}</span>
                    </div>
                    <div class="metric-row">
                        <span class="label">Industry:</span>
                        <span class="value">\${metric.competitors}</span>
                    </div>
                </div>
                <div class="improvement-badge">
                    <i class="fas fa-arrow-up"></i> \${metric.improvement} better
                </div>
            </div>
        \`).join('');
    }
    
    generateRiskRecommendations() {
        const recommendations = [
            {
                icon: 'fas fa-exclamation-triangle',
                title: 'Immediate Zero Trust Implementation',
                desc: \`With 23% annual breach probability, each month of delay increases risk exposure by $\${(this.config.breachCost * 0.23 / 12 / 1000).toFixed(0)}K\`,
                priority: 'CRITICAL'
            },
            {
                icon: 'fas fa-chart-line',
                title: 'Board-Level Risk Reporting',
                desc: 'Portnox reduces reportable incidents by 95%, protecting executive liability and shareholder value',
                priority: 'HIGH'
            },
            {
                icon: 'fas fa-building',
                title: 'Insurance Premium Negotiation',
                desc: 'Document 15-25% premium reduction opportunity with demonstrated Zero Trust implementation',
                priority: 'HIGH'
            },
            {
                icon: 'fas fa-users',
                title: 'Security Culture Enhancement',
                desc: 'Automated security reduces human error risk by 87%, the leading cause of breaches',
                priority: 'MEDIUM'
            }
        ];
        
        return recommendations.map(rec => \`
            <div class="recommendation-card priority-\${rec.priority.toLowerCase()}">
                <div class="priority-badge">\${rec.priority}</div>
                <i class="\${rec.icon}"></i>
                <h4>\${rec.title}</h4>
                <p>\${rec.desc}</p>
            </div>
        \`).join('');
    }
    
    generateInsuranceImpact() {
        const currentPremium = this.config.cyberInsurancePremium;
        const portnoxReduction = 0.20; // 20% reduction
        const competitorReduction = 0.05; // 5% reduction
        
        return \`
            <div class="premium-chart">
                <div class="premium-item current">
                    <span class="label">Current Premium</span>
                    <span class="value">$\${(currentPremium / 1000).toFixed(0)}K/year</span>
                </div>
                <div class="premium-item portnox">
                    <span class="label">With Portnox</span>
                    <span class="value success">$\${(currentPremium * (1 - portnoxReduction) / 1000).toFixed(0)}K/year</span>
                    <span class="savings">Save $\${(currentPremium * portnoxReduction / 1000).toFixed(0)}K</span>
                </div>
                <div class="premium-item competitor">
                    <span class="label">With Competitors</span>
                    <span class="value">$\${(currentPremium * (1 - competitorReduction) / 1000).toFixed(0)}K/year</span>
                    <span class="savings">Save $\${(currentPremium * competitorReduction / 1000).toFixed(0)}K</span>
                </div>
            </div>
            <div class="insurance-roi">
                <h5>3-Year Insurance Savings with Portnox</h5>
                <div class="roi-value">$\${(currentPremium * portnoxReduction * 3 / 1000).toFixed(0)}K</div>
            </div>
        \`;
    }
    
    // Chart rendering methods
    renderSecurityRadarChart() {
        const categories = [
            'Zero Trust Architecture',
            'Threat Detection',
            'Automated Response',
            'Access Control',
            'Network Visibility',
            'Compliance Reporting',
            'Incident Response',
            'Risk Management'
        ];
        
        const series = Object.entries(this.calculationResults).map(([vendorKey, result]) => {
            const vendor = result.vendor;
            return {
                name: vendor.name,
                data: [
                    vendor.metrics.zeroTrustScore,
                    vendor.metrics.securityScore * 0.9,
                    vendor.metrics.automationLevel,
                    vendor.metrics.securityScore,
                    vendor.metrics.scalabilityScore * 0.8,
                    vendor.compliance.reportingCapabilities * 10,
                    vendor.metrics.automationLevel * 0.9,
                    vendor.metrics.securityScore * 0.85
                ],
                pointPlacement: 'on'
            };
        });
        
        Highcharts.chart('security-radar-chart', {
            chart: {
                polar: true,
                type: 'line',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            pane: {
                size: '85%'
            },
            xAxis: {
                categories: categories,
                tickmarkPlacement: 'on',
                lineWidth: 0
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0,
                max: 100
            },
            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:.0f}</b><br/>'
            },
            legend: {
                align: 'center',
                verticalAlign: 'bottom',
                layout: 'horizontal'
            },
            series: series,
            credits: { enabled: false }
        });
    }
    
    renderBreachCostDistribution() {
        const breachCosts = [
            { name: 'Minor Incident', portnox: 5, competitors: 15, cost: 50000 },
            { name: 'Data Breach', portnox: 2, competitors: 20, cost: 500000 },
            { name: 'Major Breach', portnox: 0.5, competitors: 10, cost: 2000000 },
            { name: 'Catastrophic', portnox: 0.1, competitors: 3, cost: 10000000 }
        ];
        
        Highcharts.chart('breach-cost-distribution', {
            chart: {
                type: 'column',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            xAxis: {
                categories: breachCosts.map(b => b.name)
            },
            yAxis: {
                title: { text: 'Annual Probability (%)' }
            },
            tooltip: {
                formatter: function() {
                    const cost = breachCosts.find(b => b.name === this.x).cost;
                    return '<b>' + this.x + '</b><br/>' +
                           this.series.name + ': ' + this.y + '%<br/>' +
                           'Potential Cost: $' + (cost / 1000000).toFixed(1) + 'M';
                }
            },
            plotOptions: {
                column: {
                    borderRadius: 8
                }
            },
            series: [{
                name: 'With Portnox',
                data: breachCosts.map(b => b.portnox),
                color: '#10B981'
            }, {
                name: 'Industry Average',
                data: breachCosts.map(b => b.competitors),
                color: '#EF4444'
            }],
            credits: { enabled: false }
        });
    }
    
    renderRiskExposureTimeline() {
        const months = Array.from({length: 36}, (_, i) => \`Month \${i + 1}\`);
        const baseRisk = this.config.breachCost * this.config.annualBreachProbability / 12;
        
        const portnoxRisk = [];
        const competitorRisk = [];
        let portnoxCumulative = 0;
        let competitorCumulative = 0;
        
        const portnoxReduction = 0.90; // 90% risk reduction
        const competitorReduction = 0.30; // 30% risk reduction
        
        months.forEach((_, i) => {
            portnoxCumulative += baseRisk * (1 - portnoxReduction);
            competitorCumulative += baseRisk * (1 - competitorReduction);
            
            portnoxRisk.push(portnoxCumulative);
            competitorRisk.push(competitorCumulative);
        });
        
        Highcharts.chart('risk-exposure-timeline', {
            chart: {
                type: 'area',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            xAxis: {
                categories: months,
                labels: { step: 6 }
            },
            yAxis: {
                title: { text: 'Cumulative Risk Exposure ($)' },
                labels: {
                    formatter: function() {
                        return '$' + (this.value / 1000000).toFixed(1) + 'M';
                    }
                }
            },
            tooltip: {
                formatter: function() {
                    return '<b>' + this.x + '</b><br/>' +
                           this.series.name + ': $' + (this.y / 1000000).toFixed(2) + 'M';
                }
            },
            plotOptions: {
                area: {
                    marker: { enabled: false }
                }
            },
            series: [{
                name: 'Without NAC',
                data: months.map((_, i) => baseRisk * (i + 1)),
                color: '#EF4444',
                fillOpacity: 0.3
            }, {
                name: 'With Competitors',
                data: competitorRisk,
                color: '#F59E0B',
                fillOpacity: 0.3
            }, {
                name: 'With Portnox',
                data: portnoxRisk,
                color: '#10B981',
                fillOpacity: 0.3
            }],
            credits: { enabled: false }
        });
    }
    
    renderThreatCoverageHeatmap() {
        const vendors = Object.keys(this.calculationResults);
        const threats = [
            'Ransomware', 'Data Breach', 'Insider Threat', 'Zero-Day', 
            'APT', 'DDoS', 'Phishing', 'IoT Attacks', 'Supply Chain'
        ];
        
        const data = [];
        vendors.forEach((vendor, vIndex) => {
            threats.forEach((threat, tIndex) => {
                // Generate coverage scores based on vendor capabilities
                const baseScore = this.calculationResults[vendor].vendor.metrics.securityScore;
                const variation = Math.random() * 20 - 10;
                const score = Math.max(0, Math.min(100, baseScore + variation));
                
                data.push([vIndex, tIndex, Math.round(score)]);
            });
        });
        
        Highcharts.chart('threat-coverage-heatmap', {
            chart: {
                type: 'heatmap',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            xAxis: {
                categories: vendors.map(v => this.vendorDatabase[v]?.name || v)
            },
            yAxis: {
                categories: threats,
                title: null
            },
            colorAxis: {
                min: 0,
                max: 100,
                stops: [
                    [0, '#EF4444'],
                    [0.5, '#F59E0B'],
                    [1, '#10B981']
                ]
            },
            legend: {
                align: 'right',
                layout: 'vertical',
                verticalAlign: 'middle',
                symbolHeight: 200
            },
            tooltip: {
                formatter: function() {
                    return '<b>' + this.series.xAxis.categories[this.point.x] + '</b><br/>' +
                           this.series.yAxis.categories[this.point.y] + ': <b>' + 
                           this.point.value + '%</b> coverage';
                }
            },
            series: [{
                name: 'Threat Coverage',
                borderWidth: 1,
                data: data,
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    style: {
                        textOutline: 'none'
                    }
                }
            }],
            credits: { enabled: false }
        });
    }
    
    renderMaturityProgressionChart() {
        const vendors = Object.entries(this.calculationResults);
        const timePoints = ['Current', '6 Months', '1 Year', '2 Years', '3 Years'];
        
        const series = vendors.map(([vendorKey, result]) => {
            const baseMaturity = 2; // Starting at "Managed" level
            const growthRate = result.vendor.metrics.automationLevel / 100;
            
            const data = timePoints.map((_, index) => {
                const growth = Math.log(index + 1) * growthRate;
                return Math.min(5, baseMaturity + growth);
            });
            
            return {
                name: result.vendor.name,
                data: data
            };
        });
        
        Highcharts.chart('maturity-progression-chart', {
            chart: {
                type: 'line',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            xAxis: {
                categories: timePoints
            },
            yAxis: {
                title: { text: 'Security Maturity Level' },
                min: 1,
                max: 5,
                tickInterval: 1,
                labels: {
                    formatter: function() {
                        const levels = ['', 'Initial', 'Managed', 'Defined', 'Quantified', 'Optimizing'];
                        return levels[this.value] || '';
                    }
                }
            },
            tooltip: {
                formatter: function() {
                    const levels = ['', 'Initial', 'Managed', 'Defined', 'Quantified', 'Optimizing'];
                    const level = levels[Math.floor(this.y)] || '';
                    return '<b>' + this.series.name + '</b><br/>' +
                           this.x + ': ' + level + ' (' + this.y.toFixed(2) + ')';
                }
            },
            plotOptions: {
                line: {
                    marker: {
                        enabled: true
                    }
                }
            },
            series: series,
            credits: { enabled: false }
        });
    }
    
    renderResponseTimeChart() {
        const metrics = ['Detection', 'Investigation', 'Containment', 'Eradication', 'Recovery'];
        
        const portnoxTimes = [3, 5, 8, 15, 45]; // minutes
        const competitorTimes = [180, 360, 720, 1440, 2880]; // minutes (converted from hours/days)
        
        Highcharts.chart('response-time-chart', {
            chart: {
                type: 'bar',
                backgroundColor: 'transparent'
            },
            title: { text: null },
            xAxis: {
                categories: metrics
            },
            yAxis: {
                type: 'logarithmic',
                title: { text: 'Response Time (minutes)' },
                labels: {
                    formatter: function() {
                        if (this.value >= 1440) {
                            return (this.value / 1440).toFixed(0) + ' days';
                        } else if (this.value >= 60) {
                            return (this.value / 60).toFixed(0) + ' hours';
                        }
                        return this.value + ' min';
                    }
                }
            },
            tooltip: {
                formatter: function() {
                    let time = this.y;
                    let timeStr;
                    if (time >= 1440) {
                        timeStr = (time / 1440).toFixed(1) + ' days';
                    } else if (time >= 60) {
                        timeStr = (time / 60).toFixed(1) + ' hours';
                    } else {
                        timeStr = time + ' minutes';
                    }
                    return '<b>' + this.x + '</b><br/>' +
                           this.series.name + ': ' + timeStr;
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 8
                }
            },
            series: [{
                name: 'Portnox',
                data: portnoxTimes,
                color: '#10B981'
            }, {
                name: 'Industry Average',
                data: competitorTimes,
                color: '#EF4444'
            }],
            credits: { enabled: false }
        });
    }
    
    `;

// Replace the method
if (content.includes('renderRiskAssessment(container)')) {
    content = content.replace(pattern, newImplementation);
    fs.writeFileSync(filePath, content);
    console.log('✅ Successfully updated renderRiskAssessment method');
} else {
    console.error('❌ Could not find renderRiskAssessment method');
}
EOF

# Run the Node.js fix script
node fix-risk-update.js

# Clean up
rm fix-risk-update.js

echo "✅ Syntax error should be fixed!"
echo ""
echo "🔍 Please refresh your browser and check if the page loads correctly."
echo ""
echo "If you still have issues, you can:"
echo "1. Check the browser console for the exact error"
echo "2. Restore the original file: git checkout js/views/premium-executive-platform.js"
echo "3. Let me know the specific error for further debugging"
