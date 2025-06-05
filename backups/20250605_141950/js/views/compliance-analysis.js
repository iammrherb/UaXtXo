/**
 * Compliance Analysis Module
 * Comprehensive compliance assessment and framework alignment
 */

class ComplianceAnalysis {
    constructor(platform) {
        this.platform = platform;
        this.frameworks = window.ComplianceFrameworkMappings;
        this.vendorData = window.ComprehensiveVendorDatabase;
    }
    
    render(container) {
        if (!container) return;
        
        const industry = this.platform.config.industry;
        const selectedFrameworks = this.platform.config.complianceFrameworks;
        
        container.innerHTML = `
            <div class="compliance-analysis">
                <!-- Executive Compliance Summary -->
                <div class="executive-compliance-summary">
                    <h2>Executive Compliance Dashboard</h2>
                    <div class="compliance-overview-grid">
                        ${this.renderComplianceOverview(industry)}
                    </div>
                </div>
                
                <!-- Framework Readiness Matrix -->
                <div class="framework-readiness-section">
                    <h3>Compliance Framework Readiness Assessment</h3>
                    <div class="readiness-matrix">
                        ${this.renderFrameworkMatrix()}
                    </div>
                </div>
                
                <!-- Industry-Specific Requirements -->
                <div class="industry-requirements-section">
                    <h3>${this.getIndustryName(industry)} Compliance Requirements</h3>
                    <div class="requirements-grid">
                        ${this.renderIndustryRequirements(industry)}
                    </div>
                </div>
                
                <!-- Compliance Cost Analysis -->
                <div class="compliance-cost-section">
                    <h3>Compliance Cost Impact Analysis</h3>
                    <div class="cost-analysis-grid">
                        <div class="chart-container">
                            <h4>Annual Compliance Costs by Vendor</h4>
                            <div id="compliance-cost-chart" style="height: 400px;"></div>
                        </div>
                        <div class="chart-container">
                            <h4>Audit Readiness Timeline</h4>
                            <div id="audit-timeline-chart" style="height: 400px;"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Compliance Automation Features -->
                <div class="automation-features-section">
                    <h3>Compliance Automation Capabilities</h3>
                    ${this.renderAutomationFeatures()}
                </div>
                
                <!-- Risk & Penalty Analysis -->
                <div class="penalty-analysis-section">
                    <h3>Non-Compliance Risk & Penalty Analysis</h3>
                    ${this.renderPenaltyAnalysis()}
                </div>
                
                <!-- Compliance Recommendations -->
                <div class="compliance-recommendations">
                    <h3>Strategic Compliance Recommendations</h3>
                    ${this.renderComplianceRecommendations(industry)}
                </div>
            </div>
        `;
        
        // Render charts
        setTimeout(() => {
            this.renderComplianceCharts();
        }, 100);
    }
    
    renderComplianceOverview(industry) {
        const requirements = this.frameworks.industryRequirements[industry];
        const portnoxScore = this.calculateOverallComplianceScore('portnox', industry);
        const avgCompetitorScore = this.calculateAverageCompetitorScore(industry);
        
        return `
            <div class="compliance-card primary">
                <div class="icon"><i class="fas fa-industry"></i></div>
                <h4>Industry</h4>
                <div class="value">${this.getIndustryName(industry)}</div>
                <p>Primary: ${requirements.primary.map(f => f.toUpperCase()).join(', ')}</p>
            </div>
            <div class="compliance-card success">
                <div class="icon"><i class="fas fa-check-double"></i></div>
                <h4>Portnox Compliance Score</h4>
                <div class="value">${portnoxScore}%</div>
                <p>Automated compliance ready</p>
            </div>
            <div class="compliance-card warning">
                <div class="icon"><i class="fas fa-chart-bar"></i></div>
                <h4>Industry Average</h4>
                <div class="value">${avgCompetitorScore}%</div>
                <p>Manual processes required</p>
            </div>
            <div class="compliance-card info">
                <div class="icon"><i class="fas fa-clock"></i></div>
                <h4>Audit Prep Time</h4>
                <div class="value">2 hrs</div>
                <p>vs. 2 weeks industry avg</p>
            </div>
        `;
    }
    
    renderFrameworkMatrix() {
        const frameworks = ['pci-dss', 'hipaa', 'gdpr', 'sox', 'iso27001', 'nist-csf', 'fedramp', 'cmmc'];
        const vendors = Object.keys(this.platform.calculationResults);
        
        let html = '<table class="framework-matrix-table"><thead><tr><th>Vendor</th>';
        
        frameworks.forEach(fw => {
            html += `<th>${fw.toUpperCase()}</th>`;
        });
        
        html += '<th>Overall</th></tr></thead><tbody>';
        
        vendors.forEach(vendor => {
            const vendorData = this.vendorData[vendor];
            if (!vendorData) return;
            
            html += `<tr class="${vendor === 'portnox' ? 'portnox-row' : ''}">`;
            html += `<td>${vendorData.name}</td>`;
            
            let totalScore = 0;
            frameworks.forEach(fw => {
                const score = vendorData.compliance[fw] || 0;
                totalScore += score;
                html += `<td class="score-cell ${this.getScoreClass(score)}">
                    <div class="score-value">${score}%</div>
                    <div class="score-bar" style="width: ${score}%"></div>
                </td>`;
            });
            
            const avgScore = Math.round(totalScore / frameworks.length);
            html += `<td class="overall-score ${this.getScoreClass(avgScore)}">${avgScore}%</td>`;
            html += '</tr>';
        });
        
        html += '</tbody></table>';
        return html;
    }
    
    renderIndustryRequirements(industry) {
        const requirements = this.frameworks.industryRequirements[industry];
        const nacControls = this.frameworks.nacControlCategories;
        
        return `
            <div class="requirements-details">
                <div class="primary-frameworks">
                    <h4>Primary Compliance Frameworks</h4>
                    <div class="framework-list">
                        ${requirements.primary.map(fw => `
                            <div class="framework-item">
                                <i class="fas fa-certificate"></i>
                                <span>${fw.toUpperCase()}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="specific-requirements">
                    <h4>Industry-Specific Requirements</h4>
                    <ul class="requirement-list">
                        ${requirements.specificRequirements.map(req => `
                            <li>
                                <i class="fas fa-check-circle"></i>
                                <span>${req}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="nac-controls-mapping">
                    <h4>NAC Control Mappings</h4>
                    <div class="control-grid">
                        ${Object.entries(nacControls).map(([key, control]) => `
                            <div class="control-item">
                                <h5>${this.formatControlName(key)}</h5>
                                <p>${control.description}</p>
                                <div class="framework-tags">
                                    ${requirements.primary.filter(fw => control.frameworks[fw]).map(fw => `
                                        <span class="tag">${fw.toUpperCase()}</span>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    renderAutomationFeatures() {
        const vendors = Object.keys(this.platform.calculationResults);
        const automation = this.frameworks.vendorComplianceAutomation;
        
        return `
            <div class="automation-comparison">
                <table class="automation-table">
                    <thead>
                        <tr>
                            <th>Feature</th>
                            ${vendors.map(v => `<th>${this.vendorData[v]?.name || v}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Automated Reporting</td>
                            ${vendors.map(v => `
                                <td class="feature-cell">
                                    ${automation[v]?.automatedReporting ? 
                                        '<i class="fas fa-check-circle success"></i>' : 
                                        '<i class="fas fa-times-circle error"></i>'}
                                </td>
                            `).join('')}
                        </tr>
                        <tr>
                            <td>Continuous Compliance</td>
                            ${vendors.map(v => `
                                <td class="feature-cell">
                                    ${automation[v]?.continuousCompliance ? 
                                        '<i class="fas fa-check-circle success"></i>' : 
                                        '<i class="fas fa-times-circle error"></i>'}
                                </td>
                            `).join('')}
                        </tr>
                        <tr>
                            <td>Pre-Built Policies</td>
                            ${vendors.map(v => `
                                <td class="feature-cell">
                                    ${automation[v]?.preBuiltPolicies ? 
                                        '<i class="fas fa-check-circle success"></i>' : 
                                        '<i class="fas fa-times-circle error"></i>'}
                                </td>
                            `).join('')}
                        </tr>
                        <tr>
                            <td>Real-Time Alerts</td>
                            ${vendors.map(v => `
                                <td class="feature-cell">
                                    ${automation[v]?.realTimeAlerts ? 
                                        '<i class="fas fa-check-circle success"></i>' : 
                                        '<i class="fas fa-times-circle error"></i>'}
                                </td>
                            `).join('')}
                        </tr>
                        <tr>
                            <td>Compliance Dashboard</td>
                            ${vendors.map(v => `
                                <td class="feature-cell">
                                    ${automation[v]?.complianceDashboard ? 
                                        '<i class="fas fa-check-circle success"></i>' : 
                                        '<i class="fas fa-times-circle error"></i>'}
                                </td>
                            `).join('')}
                        </tr>
                        <tr class="automation-score-row">
                            <td><strong>Automation Score</strong></td>
                            ${vendors.map(v => `
                                <td class="score-cell">
                                    <strong>${automation[v]?.automationScore || 0}%</strong>
                                </td>
                            `).join('')}
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }
    
    renderPenaltyAnalysis() {
        const penalties = {
            'gdpr': { max: 20000000, typical: 500000, probability: 0.15 },
            'hipaa': { max: 2000000, typical: 250000, probability: 0.20 },
            'pci-dss': { max: 500000, typical: 100000, probability: 0.25 },
            'sox': { max: 5000000, typical: 1000000, probability: 0.10 },
            'ccpa': { max: 7500, typical: 2500, probability: 0.18 }
        };
        
        const selectedFrameworks = this.platform.config.complianceFrameworks;
        let totalRisk = 0;
        let portnoxReduction = 0;
        
        return `
            <div class="penalty-grid">
                ${selectedFrameworks.map(fw => {
                    const penalty = penalties[fw] || { max: 100000, typical: 50000, probability: 0.15 };
                    const annualRisk = penalty.typical * penalty.probability;
                    const withPortnox = annualRisk * 0.15; // 85% reduction
                    
                    totalRisk += annualRisk;
                    portnoxReduction += (annualRisk - withPortnox);
                    
                    return `
                        <div class="penalty-card">
                            <h4>${fw.toUpperCase()}</h4>
                            <div class="penalty-details">
                                <div class="detail">
                                    <span>Max Penalty:</span>
                                    <strong>$${(penalty.max / 1000000).toFixed(1)}M</strong>
                                </div>
                                <div class="detail">
                                    <span>Typical Fine:</span>
                                    <strong>$${(penalty.typical / 1000).toFixed(0)}K</strong>
                                </div>
                                <div class="detail">
                                    <span>Annual Risk:</span>
                                    <strong class="risk">$${(annualRisk / 1000).toFixed(0)}K</strong>
                                </div>
                                <div class="detail highlight">
                                    <span>With Portnox:</span>
                                    <strong class="savings">$${(withPortnox / 1000).toFixed(0)}K</strong>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
                
                <div class="penalty-summary">
                    <h4>Total Compliance Risk Reduction</h4>
                    <div class="summary-value">
                        <div class="label">Annual Savings</div>
                        <div class="value">$${Math.round(portnoxReduction / 1000)}K</div>
                    </div>
                    <div class="summary-value">
                        <div class="label">Risk Reduction</div>
                        <div class="value">85%</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderComplianceRecommendations(industry) {
        const requirements = this.frameworks.industryRequirements[industry];
        
        return `
            <div class="recommendation-grid">
                <div class="recommendation immediate">
                    <div class="priority">Immediate Action</div>
                    <h4>Deploy Portnox Automated Compliance</h4>
                    <p>Achieve ${requirements.primary.map(f => f.toUpperCase()).join(', ')} compliance within 30 days with pre-configured policies and automated reporting.</p>
                    <ul>
                        <li>Pre-built ${industry} compliance templates</li>
                        <li>Automated evidence collection</li>
                        <li>Real-time compliance dashboard</li>
                    </ul>
                </div>
                
                <div class="recommendation short-term">
                    <div class="priority">30-Day Goal</div>
                    <h4>Enable Continuous Compliance Monitoring</h4>
                    <p>Transition from periodic audits to continuous compliance with real-time monitoring and automated remediation.</p>
                    <ul>
                        <li>Automated policy enforcement</li>
                        <li>Drift detection and correction</li>
                        <li>Audit trail automation</li>
                    </ul>
                </div>
                
                <div class="recommendation long-term">
                    <div class="priority">Strategic Initiative</div>
                    <h4>Compliance-as-Code Implementation</h4>
                    <p>Integrate compliance requirements into your infrastructure automation for DevSecOps alignment.</p>
                    <ul>
                        <li>API-driven compliance checks</li>
                        <li>CI/CD pipeline integration</li>
                        <li>Automated remediation workflows</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    renderComplianceCharts() {
        this.renderComplianceCostChart();
        this.renderAuditTimelineChart();
    }
    
    renderComplianceCostChart() {
        const container = document.getElementById('compliance-cost-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const vendors = [];
        const complianceCosts = [];
        const auditCosts = [];
        const penaltyCosts = [];
        
        Object.entries(this.platform.calculationResults).forEach(([key, result]) => {
            if (result && result.vendor) {
                vendors.push(result.vendor.name);
                
                // Calculate compliance-related costs
                const isPortnox = key === 'portnox';
                const baseFTE = isPortnox ? 0.1 : 0.5; // FTE for compliance
                const auditPrep = isPortnox ? 2000 : 20000; // Audit prep costs
                const penaltyRisk = isPortnox ? 5000 : 50000; // Penalty risk
                
                complianceCosts.push(baseFTE * this.platform.config.fteCost);
                auditCosts.push(auditPrep * this.platform.config.complianceAuditFrequency);
                penaltyCosts.push(penaltyRisk);
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
                    text: 'Annual Cost ($)',
                    style: { color: '#CBD5E1' }
                },
                labels: {
                    formatter: function() {
                        return '$' + Math.round(this.value / 1000) + 'K';
                    },
                    style: { color: '#CBD5E1' }
                },
                stackLabels: {
                    enabled: true,
                    style: { 
                        fontWeight: 'bold',
                        color: '#FFFFFF'
                    },
                    formatter: function() {
                        return '$' + Math.round(this.total / 1000) + 'K';
                    }
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    borderRadius: 5
                }
            },
            series: [
                {
                    name: 'Compliance Management',
                    data: complianceCosts,
                    color: '#6366F1'
                },
                {
                    name: 'Audit Preparation',
                    data: auditCosts,
                    color: '#F59E0B'
                },
                {
                    name: 'Penalty Risk',
                    data: penaltyCosts,
                    color: '#EF4444'
                }
            ],
            legend: {
                itemStyle: { color: '#CBD5E1' }
            },
            credits: { enabled: false }
        });
    }
    
    renderAuditTimelineChart() {
        const container = document.getElementById('audit-timeline-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const categories = ['Initial Assessment', 'Policy Implementation', 'Evidence Collection', 
                          'Gap Remediation', 'Audit Preparation', 'Audit Complete'];
        
        const portnoxData = [1, 2, 3, 4, 5, 7]; // Days
        const competitorData = [7, 21, 35, 56, 70, 90]; // Days
        
        Highcharts.chart(container, {
            chart: {
                type: 'line',
                backgroundColor: '#1E293B'
            },
            title: { text: null },
            xAxis: {
                categories: categories,
                labels: { 
                    style: { color: '#CBD5E1' },
                    rotation: -45
                }
            },
            yAxis: {
                title: { 
                    text: 'Days to Complete',
                    style: { color: '#CBD5E1' }
                },
                labels: { style: { color: '#CBD5E1' } }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return this.y + ' days';
                        },
                        style: { color: '#FFFFFF' }
                    }
                }
            },
            series: [
                {
                    name: 'Portnox CLEAR',
                    data: portnoxData,
                    color: '#00D4AA',
                    lineWidth: 3
                },
                {
                    name: 'Industry Average',
                    data: competitorData,
                    color: '#94A3B8',
                    dashStyle: 'dash'
                }
            ],
            legend: {
                itemStyle: { color: '#CBD5E1' }
            },
            credits: { enabled: false }
        });
    }
    
    // Helper methods
    calculateOverallComplianceScore(vendor, industry) {
        const vendorData = this.vendorData[vendor];
        if (!vendorData) return 0;
        
        const requirements = this.frameworks.industryRequirements[industry];
        const primaryFrameworks = requirements.primary;
        
        let totalScore = 0;
        primaryFrameworks.forEach(fw => {
            totalScore += vendorData.compliance[fw] || 0;
        });
        
        return Math.round(totalScore / primaryFrameworks.length);
    }
    
    calculateAverageCompetitorScore(industry) {
        const competitors = Object.keys(this.vendorData).filter(v => v !== 'portnox');
        let totalScore = 0;
        let count = 0;
        
        competitors.forEach(vendor => {
            totalScore += this.calculateOverallComplianceScore(vendor, industry);
            count++;
        });
        
        return count > 0 ? Math.round(totalScore / count) : 0;
    }
    
    getScoreClass(score) {
        if (score >= 90) return 'excellent';
        if (score >= 80) return 'good';
        if (score >= 70) return 'fair';
        return 'poor';
    }
    
    getIndustryName(industry) {
        const names = {
            'healthcare': 'Healthcare',
            'finance': 'Financial Services',
            'retail': 'Retail',
            'technology': 'Technology',
            'manufacturing': 'Manufacturing',
            'government': 'Government',
            'education': 'Education'
        };
        return names[industry] || 'Technology';
    }
    
    formatControlName(key) {
        return key.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
}

// Export for platform use
window.ComplianceAnalysis = ComplianceAnalysis;

console.log('✅ Compliance Analysis module loaded');
