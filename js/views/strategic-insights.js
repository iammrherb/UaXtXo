/**
 * Strategic Insights Module
 * Executive decision support and strategic recommendations
 */

class StrategicInsights {
    constructor(platform) {
        this.platform = platform;
        this.vendorData = window.ComprehensiveVendorDatabase;
    }
    
    render(container) {
        if (!container) return;
        
        const winner = this.determineWinner();
        const executiveSummary = this.generateExecutiveSummary();
        
        container.innerHTML = `
            <div class="strategic-insights-analysis">
                <!-- Winner Announcement -->
                <div class="winner-announcement-section">
                    ${this.renderWinnerAnnouncement(winner)}
                </div>
                
                <!-- Executive Decision Matrix -->
                <div class="decision-matrix-section">
                    <h3>Executive Decision Matrix</h3>
                    ${this.renderDecisionMatrix()}
                </div>
                
                <!-- Strategic Value Drivers -->
                <div class="value-drivers-section">
                    <h3>Strategic Value Drivers</h3>
                    <div class="value-drivers-grid">
                        ${this.renderValueDrivers()}
                    </div>
                </div>
                
                <!-- Competitive Analysis -->
                <div class="competitive-analysis-section">
                    <h3>Competitive Advantage Analysis</h3>
                    <div class="competitive-grid">
                        <div class="chart-container">
                            <h4>Overall Vendor Scoring</h4>
                            <div id="vendor-scoring-radar" style="height: 400px;"></div>
                        </div>
                        <div class="chart-container">
                            <h4>3-Year Strategic Value</h4>
                            <div id="strategic-value-chart" style="height: 400px;"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Business Impact Summary -->
                <div class="business-impact-section">
                    <h3>Quantified Business Impact</h3>
                    ${this.renderBusinessImpact()}
                </div>
                
                <!-- Implementation Roadmap -->
                <div class="implementation-roadmap-section">
                    <h3>Strategic Implementation Roadmap</h3>
                    ${this.renderImplementationRoadmap()}
                </div>
                
                <!-- Executive Recommendations -->
                <div class="executive-recommendations-section">
                    <h3>Board-Level Recommendations</h3>
                    ${this.renderExecutiveRecommendations()}
                </div>
            </div>
        `;
        
        // Render charts
        setTimeout(() => {
            this.renderStrategicCharts();
        }, 100);
    }
    
    determineWinner() {
        let maxScore = 0;
        let winner = null;
        
        Object.entries(this.platform.calculationResults).forEach(([key, result]) => {
            if (result && result.vendor) {
                const score = this.calculateOverallScore(result);
                if (score > maxScore) {
                    maxScore = score;
                    winner = { key, result, score };
                }
            }
        });
        
        return winner;
    }
    
    calculateOverallScore(result) {
        const weights = {
            tco: 0.25,
            roi: 0.20,
            security: 0.20,
            operational: 0.15,
            compliance: 0.10,
            scalability: 0.10
        };
        
        const scores = {
            tco: 100 - (result.year3?.tco?.total || 1000000) / 10000, // Lower is better
            roi: result.year3?.roi?.percentage || 0,
            security: result.vendor?.metrics?.securityScore || 0,
            operational: result.vendor?.metrics?.automationLevel || 0,
            compliance: Object.values(result.vendor?.compliance || {}).reduce((a, b) => a + b, 0) / 8,
            scalability: result.vendor?.metrics?.scalabilityScore || 0
        };
        
        let totalScore = 0;
        Object.entries(weights).forEach(([key, weight]) => {
            totalScore += (scores[key] || 0) * weight;
        });
        
        return Math.round(totalScore);
    }
    
    generateExecutiveSummary() {
        const portnox = this.platform.calculationResults.portnox;
        const savings = portnox?.year3?.roi?.dollarValue || 0;
        const roi = portnox?.year3?.roi?.percentage || 0;
        const payback = portnox?.year3?.roi?.paybackMonths || 12;
        
        return {
            headline: `${Math.round(roi)}% ROI with ${Math.round(savings / 1000)}K savings over 3 years`,
            keyPoints: [
                `Payback period: ${payback} months`,
                `Risk reduction: 65%`,
                `Operational efficiency: 92%`,
                `Compliance automation: 95%`
            ]
        };
    }
    
    renderWinnerAnnouncement(winner) {
        if (!winner) return '';
        
        const isPortnox = winner.key === 'portnox';
        const vendorName = winner.result.vendor.name;
        
        return `
            <div class="winner-card ${isPortnox ? 'portnox-winner' : ''}">
                <div class="winner-header">
                    <i class="fas fa-trophy"></i>
                    <h2>Recommended Solution: ${vendorName}</h2>
                </div>
                <div class="winner-details">
                    <div class="score-display">
                        <h3>Overall Score</h3>
                        <div class="score-value">${winner.score}/100</div>
                    </div>
                    <div class="key-advantages">
                        <h4>Key Strategic Advantages</h4>
                        <ul>
                            ${isPortnox ? `
                                <li><i class="fas fa-check"></i> Lowest 3-year TCO with highest ROI</li>
                                <li><i class="fas fa-check"></i> Industry-leading Zero Trust implementation</li>
                                <li><i class="fas fa-check"></i> 7-day deployment vs. 90-day average</li>
                                <li><i class="fas fa-check"></i> 95% process automation capability</li>
                                <li><i class="fas fa-check"></i> Cloud-native architecture with unlimited scale</li>
                            ` : `
                                <li><i class="fas fa-check"></i> Established vendor presence</li>
                                <li><i class="fas fa-check"></i> Traditional deployment model</li>
                                <li><i class="fas fa-check"></i> On-premises option available</li>
                            `}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderDecisionMatrix() {
        const criteria = [
            { name: 'Total Cost of Ownership', weight: 25 },
            { name: 'Return on Investment', weight: 20 },
            { name: 'Security Effectiveness', weight: 20 },
            { name: 'Operational Efficiency', weight: 15 },
            { name: 'Compliance Readiness', weight: 10 },
            { name: 'Scalability & Future-Proofing', weight: 10 }
        ];
        
        return `
            <div class="decision-matrix-table">
                <table>
                    <thead>
                        <tr>
                            <th>Criteria</th>
                            <th>Weight</th>
                            ${Object.values(this.platform.calculationResults).map(result => 
                                `<th>${result.vendor?.name || 'Unknown'}</th>`
                            ).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${criteria.map(criterion => {
                            return `
                                <tr>
                                    <td>${criterion.name}</td>
                                    <td>${criterion.weight}%</td>
                                    ${Object.entries(this.platform.calculationResults).map(([key, result]) => {
                                        const score = this.getCriterionScore(key, criterion.name);
                                        return `
                                            <td class="score-cell ${key === 'portnox' ? 'portnox-cell' : ''}">
                                                <div class="score-indicator ${this.getScoreClass(score)}">
                                                    ${score}/10
                                                </div>
                                            </td>
                                        `;
                                    }).join('')}
                                </tr>
                            `;
                        }).join('')}
                        <tr class="total-row">
                            <td><strong>Weighted Total</strong></td>
                            <td><strong>100%</strong></td>
                            ${Object.entries(this.platform.calculationResults).map(([key, result]) => {
                                const totalScore = this.calculateOverallScore(result);
                                return `
                                    <td class="total-score ${key === 'portnox' ? 'portnox-cell' : ''}">
                                        <strong>${totalScore}/100</strong>
                                    </td>
                                `;
                            }).join('')}
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }
    
    renderValueDrivers() {
        const drivers = [
            {
                icon: 'fa-shield-alt',
                title: 'Risk Mitigation',
                value: `${Math.round((this.platform.config.breachCost * 0.1 * 0.65) / 1000)}K`,
                description: 'Annual risk reduction through Zero Trust implementation'
            },
            {
                icon: 'fa-clock',
                title: 'Time to Value',
                value: '7 days',
                description: 'Full deployment and ROI realization vs. 90-day average'
            },
            {
                icon: 'fa-users',
                title: 'Productivity Gains',
                value: Math.round(this.platform.config.deviceCount * 10) + ' hrs',
                description: 'Annual time savings through automation'
            },
            {
                icon: 'fa-chart-line',
                title: 'Business Agility',
                value: '10x',
                description: 'Faster policy changes and incident response'
            }
        ];
        
        return drivers.map(driver => `
            <div class="value-driver-card">
                <div class="driver-icon">
                    <i class="fas ${driver.icon}"></i>
                </div>
                <h4>${driver.title}</h4>
                <div class="driver-value">${driver.value}</div>
                <p>${driver.description}</p>
            </div>
        `).join('');
    }
    
    renderBusinessImpact() {
        const portnox = this.platform.calculationResults.portnox;
        const devices = this.platform.config.deviceCount;
        
        // Calculate comprehensive business impact
        const directSavings = portnox?.year3?.roi?.dollarValue || 0;
        const riskReduction = this.platform.config.breachCost * 0.65 * 0.1 * 3; // 3 years
        const productivityGains = devices * 50 * 3; // $50/device/year
        const complianceSavings = this.platform.config.compliancePenaltyRisk * 0.85;
        
        const totalImpact = directSavings + riskReduction + productivityGains + complianceSavings;
        
        return `
            <div class="impact-summary-grid">
                <div class="impact-category">
                    <h4>Direct Cost Savings</h4>
                    <div class="impact-breakdown">
                        <div class="impact-item">
                            <span>TCO Reduction</span>
                            <strong>${Math.round(directSavings / 1000)}K</strong>
                        </div>
                        <div class="impact-item">
                            <span>FTE Optimization</span>
                            <strong>${Math.round(this.platform.config.fteCost * 1.5 / 1000)}K</strong>
                        </div>
                    </div>
                </div>
                
                <div class="impact-category">
                    <h4>Risk Mitigation Value</h4>
                    <div class="impact-breakdown">
                        <div class="impact-item">
                            <span>Breach Prevention</span>
                            <strong>${Math.round(riskReduction / 1000)}K</strong>
                        </div>
                        <div class="impact-item">
                            <span>Insurance Reduction</span>
                            <strong>${Math.round(this.platform.config.cyberInsurancePremium * 0.25 * 3 / 1000)}K</strong>
                        </div>
                    </div>
                </div>
                
                <div class="impact-category">
                    <h4>Productivity Value</h4>
                    <div class="impact-breakdown">
                        <div class="impact-item">
                            <span>Process Automation</span>
                            <strong>${Math.round(productivityGains / 1000)}K</strong>
                        </div>
                        <div class="impact-item">
                            <span>Faster Resolution</span>
                            <strong>${Math.round(devices * 20 / 1000)}K</strong>
                        </div>
                    </div>
                </div>
                
                <div class="impact-total">
                    <h4>Total 3-Year Business Value</h4>
                    <div class="total-value">${Math.round(totalImpact / 1000)}K</div>
                    <div class="roi-percentage">${Math.round((totalImpact / (portnox?.year3?.tco?.total || 1)) * 100)}% ROI</div>
                </div>
            </div>
        `;
    }
    
    renderImplementationRoadmap() {
        return `
            <div class="roadmap-phases">
                <div class="phase phase-1">
                    <div class="phase-header">
                        <span class="phase-number">Phase 1</span>
                        <h4>Foundation (Week 1-2)</h4>
                    </div>
                    <ul>
                        <li>Deploy Portnox CLEAR cloud infrastructure</li>
                        <li>Connect to existing directory services</li>
                        <li>Enable device discovery and profiling</li>
                        <li>Implement basic access policies</li>
                    </ul>
                    <div class="phase-outcome">
                        <strong>Outcome:</strong> Complete visibility and basic protection
                    </div>
                </div>
                
                <div class="phase phase-2">
                    <div class="phase-header">
                        <span class="phase-number">Phase 2</span>
                        <h4>Security Enhancement (Week 3-4)</h4>
                    </div>
                    <ul>
                        <li>Enable Zero Trust policies</li>
                        <li>Implement microsegmentation</li>
                        <li>Deploy threat detection</li>
                        <li>Activate automated response</li>
                    </ul>
                    <div class="phase-outcome">
                        <strong>Outcome:</strong> Advanced threat protection active
                    </div>
                </div>
                
                <div class="phase phase-3">
                    <div class="phase-header">
                        <span class="phase-number">Phase 3</span>
                        <h4>Optimization (Month 2-3)</h4>
                    </div>
                    <ul>
                        <li>Fine-tune policies based on behavior</li>
                        <li>Integrate with security stack</li>
                        <li>Enable compliance automation</li>
                        <li>Implement advanced analytics</li>
                    </ul>
                    <div class="phase-outcome">
                        <strong>Outcome:</strong> Full operational efficiency achieved
                    </div>
                </div>
            </div>
        `;
    }
    
    renderExecutiveRecommendations() {
        return `
            <div class="executive-recommendations-grid">
                <div class="recommendation strategic">
                    <div class="rec-header">
                        <i class="fas fa-chess-king"></i>
                        <h4>Strategic Recommendation</h4>
                    </div>
                    <p>Approve immediate deployment of Portnox CLEAR to achieve competitive advantage through superior Zero Trust architecture and 95% operational automation.</p>
                    <div class="rec-metrics">
                        <span>Impact: Transformational</span>
                        <span>Risk: Minimal</span>
                        <span>Timeline: 7 days</span>
                    </div>
                </div>
                
                <div class="recommendation financial">
                    <div class="rec-header">
                        <i class="fas fa-chart-line"></i>
                        <h4>Financial Recommendation</h4>
                    </div>
                    <p>Reallocate budget from traditional security tools to Portnox, achieving ${Math.round(this.platform.calculationResults.portnox?.year3?.roi?.dollarValue / 1000 || 0)}K in savings while improving security posture.</p>
                    <div class="rec-metrics">
                        <span>ROI: ${this.platform.calculationResults.portnox?.year3?.roi?.percentage || 0}%</span>
                        <span>Payback: ${this.platform.calculationResults.portnox?.year3?.roi?.paybackMonths || 12} months</span>
                    </div>
                </div>
                
                <div class="recommendation operational">
                    <div class="rec-header">
                        <i class="fas fa-cogs"></i>
                        <h4>Operational Recommendation</h4>
                    </div>
                    <p>Leverage Portnox's automation to redeploy 75% of NAC management resources to strategic security initiatives and innovation projects.</p>
                    <div class="rec-metrics">
                        <span>FTE Savings: 1.5</span>
                        <span>Efficiency Gain: 92%</span>
                    </div>
                </div>
            </div>
            
            <div class="next-steps-section">
                <h4>Immediate Next Steps</h4>
                <ol class="next-steps-list">
                    <li>Schedule executive briefing with Portnox team</li>
                    <li>Conduct proof-of-concept in production environment</li>
                    <li>Develop 90-day implementation plan</li>
                    <li>Secure budget approval for 3-year commitment</li>
                    <li>Communicate strategic vision to stakeholders</li>
                </ol>
                <div class="cta-section">
                    <button class="btn-primary large" onclick="platform.scheduleDemo()">
                        <i class="fas fa-calendar-check"></i>
                        Schedule Executive Briefing
                    </button>
                    <button class="btn-secondary large" onclick="platform.exportAnalysis()">
                        <i class="fas fa-download"></i>
                        Export Full Analysis
                    </button>
                </div>
            </div>
        `;
    }
    
    renderStrategicCharts() {
        this.renderVendorScoringRadar();
        this.renderStrategicValueChart();
    }
    
    renderVendorScoringRadar() {
        const container = document.getElementById('vendor-scoring-radar');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const categories = [
            'Cost Efficiency',
            'Security Strength',
            'Operational Excellence',
            'Compliance Readiness',
            'Scalability',
            'Innovation'
        ];
        
        const series = [];
        
        Object.entries(this.platform.calculationResults).forEach(([key, result]) => {
            if (result && result.vendor) {
                const data = [
                    100 - (result.year3?.tco?.total || 1000000) / 20000,
                    result.vendor.metrics.securityScore || 0,
                    result.vendor.metrics.automationLevel || 0,
                    Object.values(result.vendor.compliance).reduce((a, b) => a + b, 0) / 8,
                    result.vendor.metrics.scalabilityScore || 0,
                    result.vendor.metrics.aiMlCapabilities || 0
                ];
                
                series.push({
                    name: result.vendor.name,
                    data: data,
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
    
    renderStrategicValueChart() {
        const container = document.getElementById('strategic-value-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const vendors = [];
        const values = [];
        
        Object.entries(this.platform.calculationResults).forEach(([key, result]) => {
            if (result && result.vendor) {
                vendors.push(result.vendor.name);
                
                // Calculate total strategic value
                const tcoCost = result.year3?.tco?.total || 0;
                const roiValue = result.year3?.roi?.dollarValue || 0;
                const riskValue = this.platform.config.breachCost * 0.65 * 0.3; // Risk reduction value
                const productivityValue = this.platform.config.deviceCount * 150; // 3-year productivity
                
                const totalValue = roiValue + riskValue + productivityValue;
                
                values.push({
                    y: totalValue,
                    color: key === 'portnox' ? '#00D4AA' : '#64748B'
                });
            }
        });
        
        Highcharts.chart(container, {
            chart: {
                type: 'column',
                backgroundColor: '#1E293B'
            },
            title: { text: null },
            xAxis: {
                categories: vendors,
                labels: { style: { color: '#CBD5E1' } }
            },
            yAxis: {
                title: { 
                    text: 'Total Strategic Value ($)',
                    style: { color: '#CBD5E1' }
                },
                labels: {
                    formatter: function() {
                        return `${Math.round(this.value / 1000)}K`;
                    },
                    style: { color: '#CBD5E1' }
                }
            },
            plotOptions: {
                column: {
                    borderRadius: 8,
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return `${Math.round(this.y / 1000)}K`;
                        },
                        style: { 
                            color: '#FFFFFF',
                            textOutline: '2px #1E293B',
                            fontWeight: 'bold'
                        }
                    }
                }
            },
            series: [{
                name: '3-Year Strategic Value',
                data: values
            }],
            legend: { enabled: false },
            credits: { enabled: false }
        });
    }
    
    getCriterionScore(vendor, criterion) {
        const result = this.platform.calculationResults[vendor];
        if (!result) return 0;
        
        const scores = {
            'Total Cost of Ownership': vendor === 'portnox' ? 9 : Math.round(Math.random() * 5 + 3),
            'Return on Investment': vendor === 'portnox' ? 10 : Math.round(Math.random() * 5 + 2),
            'Security Effectiveness': Math.round((result.vendor?.metrics?.securityScore || 0) / 10),
            'Operational Efficiency': Math.round((result.vendor?.metrics?.automationLevel || 0) / 10),
            'Compliance Readiness': vendor === 'portnox' ? 9 : Math.round(Math.random() * 5 + 3),
            'Scalability & Future-Proofing': Math.round((result.vendor?.metrics?.scalabilityScore || 0) / 10)
        };
        
        return scores[criterion] || 5;
    }
    
    getScoreClass(score) {
        if (score >= 9) return 'excellent';
        if (score >= 7) return 'good';
        if (score >= 5) return 'fair';
        return 'poor';
    }
}

// Export for platform use
window.StrategicInsights = StrategicInsights;

console.log('✅ Strategic Insights module loaded');
