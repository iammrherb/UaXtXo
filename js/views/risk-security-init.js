/**
 * Risk & Security Analysis Module
 * Comprehensive security posture and risk assessment
 */

class RiskSecurityAnalysis {
    constructor(platform) {
        this.platform = platform;
        this.vendorData = window.ComprehensiveVendorDatabase || {};
        
        // Industry-specific risk multipliers
        this.industryRiskFactors = {
            'healthcare': {
                dataBreachCost: 1.8,
                complianceRisk: 2.0,
                downtimeCost: 1.5,
                regulatoryPenalty: 2.2
            },
            'finance': {
                dataBreachCost: 2.0,
                complianceRisk: 2.5,
                downtimeCost: 2.0,
                regulatoryPenalty: 3.0
            },
            'retail': {
                dataBreachCost: 1.2,
                complianceRisk: 1.3,
                downtimeCost: 1.8,
                regulatoryPenalty: 1.5
            },
            'technology': {
                dataBreachCost: 1.5,
                complianceRisk: 1.4,
                downtimeCost: 1.3,
                regulatoryPenalty: 1.6
            },
            'manufacturing': {
                dataBreachCost: 1.3,
                complianceRisk: 1.2,
                downtimeCost: 1.7,
                regulatoryPenalty: 1.3
            },
            'government': {
                dataBreachCost: 1.6,
                complianceRisk: 2.0,
                downtimeCost: 1.4,
                regulatoryPenalty: 2.5
            },
            'education': {
                dataBreachCost: 1.1,
                complianceRisk: 1.2,
                downtimeCost: 1.0,
                regulatoryPenalty: 1.1
            }
        };
    }
    
    render(container) {
        if (!container) return;
        
        const results = this.platform.calculationResults;
        if (!results) {
            container.innerHTML = '<div class="no-data">No calculation results available</div>';
            return;
        }
        
        container.innerHTML = `
            <div class="risk-security-analysis">
                <!-- Executive Risk Summary -->
                <div class="executive-risk-summary">
                    <h2>Executive Risk & Security Summary</h2>
                    <div class="risk-summary-grid">
                        ${this.renderRiskSummaryCards()}
                    </div>
                </div>
                
                <!-- Threat Landscape Analysis -->
                <div class="threat-landscape-section">
                    <h3>Current Threat Landscape & Mitigation</h3>
                    <div class="threat-grid">
                        <div class="chart-container">
                            <h4>Risk Reduction by Vendor</h4>
                            <div id="risk-reduction-chart" style="height: 400px;"></div>
                        </div>
                        <div class="chart-container">
                            <h4>Security Posture Comparison</h4>
                            <div id="security-posture-radar" style="height: 400px;"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Breach Impact Analysis -->
                <div class="breach-impact-section">
                    <h3>Data Breach Financial Impact Analysis</h3>
                    <div class="breach-analysis-grid">
                        <div class="chart-container">
                            <h4>Potential Breach Costs Over 3 Years</h4>
                            <div id="breach-cost-comparison" style="height: 400px;"></div>
                        </div>
                        <div class="breach-scenarios">
                            <h4>Breach Scenario Analysis</h4>
                            ${this.renderBreachScenarios()}
                        </div>
                    </div>
                </div>
                
                <!-- Zero Trust Maturity -->
                <div class="zero-trust-section">
                    <h3>Zero Trust Architecture Maturity</h3>
                    <div class="zero-trust-grid">
                        <div class="chart-container">
                            <h4>Zero Trust Implementation Score</h4>
                            <div id="zero-trust-maturity" style="height: 400px;"></div>
                        </div>
                        <div class="zt-principles">
                            <h4>Zero Trust Principles Coverage</h4>
                            ${this.renderZeroTrustPrinciples()}
                        </div>
                    </div>
                </div>
                
                <!-- Cyber Insurance Impact -->
                <div class="insurance-impact-section">
                    <h3>Cyber Insurance Premium Impact</h3>
                    ${this.renderInsuranceImpact()}
                </div>
                
                <!-- Risk Mitigation Recommendations -->
                <div class="risk-recommendations">
                    <h3>Risk Mitigation Strategy</h3>
                    ${this.renderRiskRecommendations()}
                </div>
            </div>
        `;
        
        // Render charts after DOM update
        setTimeout(() => {
            this.renderRiskCharts();
        }, 100);
    }
    
    renderRiskSummaryCards() {
        const portnox = this.platform.calculationResults.portnox;
        const industryFactor = this.industryRiskFactors[this.platform.config.industry] || this.industryRiskFactors.technology;
        
        // Calculate risk metrics
        const baseBreachCost = this.platform.config.breachCost;
        const adjustedBreachCost = baseBreachCost * industryFactor.dataBreachCost;
        const riskReduction = 0.65; // 65% risk reduction with Portnox
        const annualSavings = adjustedBreachCost * this.platform.config.annualBreachProbability * riskReduction;
        
        return `
            <div class="risk-card critical">
                <div class="risk-icon"><i class="fas fa-shield-virus"></i></div>
                <h4>Annual Risk Exposure</h4>
                <div class="risk-value">$${Math.round(adjustedBreachCost * this.platform.config.annualBreachProbability / 1000)}K</div>
                <p>Without proper NAC protection</p>
            </div>
            <div class="risk-card warning">
                <div class="risk-icon"><i class="fas fa-chart-line"></i></div>
                <h4>Risk Reduction</h4>
                <div class="risk-value">${Math.round(riskReduction * 100)}%</div>
                <p>With Portnox Zero Trust NAC</p>
            </div>
            <div class="risk-card success">
                <div class="risk-icon"><i class="fas fa-piggy-bank"></i></div>
                <h4>Annual Risk Savings</h4>
                <div class="risk-value">$${Math.round(annualSavings / 1000)}K</div>
                <p>Prevented breach costs</p>
            </div>
            <div class="risk-card info">
                <div class="risk-icon"><i class="fas fa-clock"></i></div>
                <h4>Mean Time to Detect</h4>
                <div class="risk-value">< 1 min</div>
                <p>Real-time threat detection</p>
            </div>
        `;
    }
    
    renderBreachScenarios() {
        const scenarios = [
            {
                type: 'Ransomware Attack',
                probability: '23%',
                avgCost: '$4.54M',
                portnoxMitigation: '91% Prevention',
                icon: 'fa-lock'
            },
            {
                type: 'Insider Threat',
                probability: '34%',
                avgCost: '$15.38M',
                portnoxMitigation: '87% Detection',
                icon: 'fa-user-secret'
            },
            {
                type: 'Supply Chain',
                probability: '17%',
                avgCost: '$4.46M',
                portnoxMitigation: '94% Isolation',
                icon: 'fa-link'
            },
            {
                type: 'Phishing/Social',
                probability: '16%',
                avgCost: '$4.91M',
                portnoxMitigation: '89% Containment',
                icon: 'fa-envelope'
            }
        ];
        
        return scenarios.map(scenario => `
            <div class="breach-scenario-card">
                <div class="scenario-header">
                    <i class="fas ${scenario.icon}"></i>
                    <h5>${scenario.type}</h5>
                </div>
                <div class="scenario-metrics">
                    <div class="metric">
                        <span class="label">Probability</span>
                        <span class="value">${scenario.probability}</span>
                    </div>
                    <div class="metric">
                        <span class="label">Avg Cost</span>
                        <span class="value">${scenario.avgCost}</span>
                    </div>
                    <div class="metric highlight">
                        <span class="label">Portnox Protection</span>
                        <span class="value">${scenario.portnoxMitigation}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    renderZeroTrustPrinciples() {
        const principles = [
            { name: 'Never Trust, Always Verify', portnoxScore: 98, industryAvg: 72 },
            { name: 'Least Privilege Access', portnoxScore: 95, industryAvg: 68 },
            { name: 'Assume Breach', portnoxScore: 94, industryAvg: 65 },
            { name: 'Verify Explicitly', portnoxScore: 97, industryAvg: 70 },
            { name: 'Continuous Monitoring', portnoxScore: 96, industryAvg: 74 },
            { name: 'Microsegmentation', portnoxScore: 93, industryAvg: 58 }
        ];
        
        return principles.map(principle => `
            <div class="zt-principle">
                <h5>${principle.name}</h5>
                <div class="score-comparison">
                    <div class="score-bar">
                        <div class="bar portnox" style="width: ${principle.portnoxScore}%">
                            <span>Portnox: ${principle.portnoxScore}%</span>
                        </div>
                    </div>
                    <div class="score-bar">
                        <div class="bar industry" style="width: ${principle.industryAvg}%">
                            <span>Industry: ${principle.industryAvg}%</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    renderInsuranceImpact() {
        const basePremium = this.platform.config.cyberInsurancePremium;
        const portnoxReduction = 0.25; // 25% premium reduction
        const competitorReduction = 0.10; // 10% average
        
        return `
            <div class="insurance-grid">
                <div class="insurance-card">
                    <h4>Current Annual Premium</h4>
                    <div class="premium-value">$${basePremium.toLocaleString()}</div>
                    <p>Without advanced NAC protection</p>
                </div>
                <div class="insurance-card portnox-highlight">
                    <h4>With Portnox Protection</h4>
                    <div class="premium-value">$${Math.round(basePremium * (1 - portnoxReduction)).toLocaleString()}</div>
                    <p>Annual savings: $${Math.round(basePremium * portnoxReduction).toLocaleString()}</p>
                </div>
                <div class="insurance-card">
                    <h4>Industry Average NAC</h4>
                    <div class="premium-value">$${Math.round(basePremium * (1 - competitorReduction)).toLocaleString()}</div>
                    <p>Annual savings: $${Math.round(basePremium * competitorReduction).toLocaleString()}</p>
                </div>
            </div>
        `;
    }
    
    renderRiskRecommendations() {
        return `
            <div class="recommendation-grid">
                <div class="recommendation priority-1">
                    <div class="priority-badge">Priority 1</div>
                    <h4>Immediate Zero Trust Deployment</h4>
                    <p>Deploy Portnox CLEAR to immediately reduce breach risk by 65% and achieve insurance premium reduction within 90 days.</p>
                    <div class="impact-metrics">
                        <span><i class="fas fa-shield-alt"></i> Risk: -65%</span>
                        <span><i class="fas fa-dollar-sign"></i> Savings: $${Math.round(this.platform.config.breachCost * 0.1 * 0.65 / 1000)}K/yr</span>
                        <span><i class="fas fa-clock"></i> Time: 7 days</span>
                    </div>
                </div>
                <div class="recommendation priority-2">
                    <div class="priority-badge">Priority 2</div>
                    <h4>Enable AI-Powered Threat Detection</h4>
                    <p>Activate Portnox's AI/ML capabilities for predictive threat analysis and automated response.</p>
                    <div class="impact-metrics">
                        <span><i class="fas fa-brain"></i> Detection: +40%</span>
                        <span><i class="fas fa-tachometer-alt"></i> MTTD: -80%</span>
                        <span><i class="fas fa-user-cog"></i> FTE: -0.5</span>
                    </div>
                </div>
                <div class="recommendation priority-3">
                    <div class="priority-badge">Priority 3</div>
                    <h4>Implement Microsegmentation</h4>
                    <p>Use dynamic segmentation to limit lateral movement and contain potential breaches.</p>
                    <div class="impact-metrics">
                        <span><i class="fas fa-project-diagram"></i> Containment: +85%</span>
                        <span><i class="fas fa-virus-slash"></i> Spread: -90%</span>
                        <span><i class="fas fa-check-circle"></i> Compliance: +30%</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderRiskCharts() {
        this.renderRiskReductionChart();
        this.renderSecurityPostureRadar();
        this.renderBreachCostComparison();
        this.renderZeroTrustMaturity();
    }
    
    renderRiskReductionChart() {
        const container = document.getElementById('risk-reduction-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const categories = [];
        const riskScores = [];
        
        Object.entries(this.platform.calculationResults).forEach(([key, result]) => {
            if (result && result.vendor) {
                categories.push(result.vendor.name);
                const baseRisk = 100;
                const reduction = result.vendor.metrics.securityScore * 0.8;
                riskScores.push(baseRisk - reduction);
            }
        });
        
        Highcharts.chart(container, {
            chart: {
                type: 'column',
                backgroundColor: '#1E293B'
            },
            title: { text: null },
            xAxis: {
                categories: categories,
                labels: { style: { color: '#CBD5E1' } }
            },
            yAxis: {
                title: { 
                    text: 'Residual Risk Score',
                    style: { color: '#CBD5E1' }
                },
                labels: { style: { color: '#CBD5E1' } },
                max: 100
            },
            plotOptions: {
                column: {
                    borderRadius: 8,
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return Math.round(this.y) + '%';
                        },
                        style: { color: '#FFFFFF' }
                    }
                }
            },
            series: [{
                name: 'Risk Level',
                data: riskScores.map((score, index) => ({
                    y: score,
                    color: score < 30 ? '#10B981' : score < 50 ? '#F59E0B' : '#EF4444'
                }))
            }],
            credits: { enabled: false },
            legend: { enabled: false }
        });
    }
    
    renderSecurityPostureRadar() {
        const container = document.getElementById('security-posture-radar');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const categories = [
            'Device Visibility',
            'Threat Detection',
            'Automated Response',
            'Zero Trust',
            'Compliance',
            'Cloud Security'
        ];
        
        const series = [];
        
        Object.entries(this.platform.calculationResults).forEach(([key, result]) => {
            if (result && result.vendor) {
                const capabilities = result.vendor.capabilities;
                series.push({
                    name: result.vendor.name,
                    data: [
                        capabilities.deviceVisibility || 0,
                        capabilities.threatResponse || 0,
                        result.vendor.metrics.automationLevel || 0,
                        result.vendor.metrics.zeroTrustScore || 0,
                        Object.values(result.vendor.compliance).reduce((a, b) => a + b, 0) / Object.keys(result.vendor.compliance).length,
                        capabilities.cloudIntegration || 0
                    ],
                    pointPlacement: 'on'
                });
            }
        });
        
        Highcharts.chart(container, {
            chart: {
                polar: true,
                type: 'line',
                backgroundColor: '#1E293B'
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
            plotOptions: {
                line: {
                    dataLabels: { enabled: false },
                    enableMouseTracking: true
                }
            },
            series: series,
            legend: {
                align: 'center',
                verticalAlign: 'bottom',
                itemStyle: { color: '#CBD5E1' }
            },
            credits: { enabled: false }
        });
    }
    
    renderBreachCostComparison() {
        const container = document.getElementById('breach-cost-comparison');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const industryFactor = this.industryRiskFactors[this.platform.config.industry] || this.industryRiskFactors.technology;
        const baseBreachCost = this.platform.config.breachCost * industryFactor.dataBreachCost;
        const breachProbability = this.platform.config.annualBreachProbability;
        
        const series = [];
        
        Object.entries(this.platform.calculationResults).forEach(([key, result]) => {
            if (result && result.vendor) {
                const monthlyData = [];
                let cumulative = 0;
                const riskReduction = result.vendor.metrics.securityScore / 100 * 0.8;
                
                for (let month = 0; month <= 36; month++) {
                    const monthlyRisk = (baseBreachCost * breachProbability * (1 - riskReduction)) / 12;
                    cumulative += monthlyRisk;
                    monthlyData.push([month, Math.round(cumulative)]);
                }
                
                series.push({
                    name: result.vendor.name,
                    data: monthlyData,
                    color: key === 'portnox' ? '#10B981' : null
                });
            }
        });
        
        Highcharts.chart(container, {
            chart: {
                type: 'area',
                backgroundColor: '#1E293B'
            },
            title: { text: null },
            xAxis: {
                title: { 
                    text: 'Months',
                    style: { color: '#CBD5E1' }
                },
                labels: { style: { color: '#CBD5E1' } }
            },
            yAxis: {
                title: { 
                    text: 'Cumulative Risk Exposure ($)',
                    style: { color: '#CBD5E1' }
                },
                labels: {
                    formatter: function() {
                        return '$' + Math.round(this.value / 1000) + 'K';
                    },
                    style: { color: '#CBD5E1' }
                }
            },
            plotOptions: {
                area: {
                    fillOpacity: 0.3,
                    marker: { enabled: false }
                }
            },
            series: series,
            legend: {
                itemStyle: { color: '#CBD5E1' }
            },
            credits: { enabled: false }
        });
    }
    
    renderZeroTrustMaturity() {
        const container = document.getElementById('zero-trust-maturity');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const vendors = [];
        const scores = [];
        
        Object.entries(this.platform.calculationResults).forEach(([key, result]) => {
            if (result && result.vendor) {
                vendors.push(result.vendor.name);
                scores.push({
                    y: result.vendor.metrics.zeroTrustScore || 0,
                    color: key === 'portnox' ? '#00D4AA' : '#64748B'
                });
            }
        });
        
        Highcharts.chart(container, {
            chart: {
                type: 'bar',
                backgroundColor: '#1E293B'
            },
            title: { text: null },
            xAxis: {
                categories: vendors,
                labels: { style: { color: '#CBD5E1' } }
            },
            yAxis: {
                min: 0,
                max: 100,
                title: { 
                    text: 'Zero Trust Maturity Score',
                    style: { color: '#CBD5E1' }
                },
                labels: { style: { color: '#CBD5E1' } }
            },
            plotOptions: {
                bar: {
                    borderRadius: 8,
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return this.y + '%';
                        },
                        style: { color: '#FFFFFF' }
                    }
                }
            },
            series: [{
                name: 'Zero Trust Score',
                data: scores
            }],
            legend: { enabled: false },
            credits: { enabled: false }
        });
    }
}

// Export for use in platform
window.RiskSecurityAnalysis = RiskSecurityAnalysis;

console.log('✅ Risk & Security Analysis module loaded');
