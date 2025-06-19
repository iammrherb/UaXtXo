/**
 * Risk & Compliance Analysis View
 * Deep dive into security, risk mitigation, and compliance coverage
 */

class RiskComplianceAnalysis {
    constructor(platform) {
        this.platform = platform;
        this.vendorData = window.ComprehensiveVendorDatabase;
        this.complianceData = window.ComplianceFrameworkDatabase;
        this.riskData = window.RiskInsuranceDatabase;
    }
    
    render(container) {
        const config = this.platform.configuration;
        const results = this.platform.calculationResults;
        
        container.innerHTML = `
            <div class="risk-compliance-view">
                <h1>Risk & Compliance Analysis</h1>
                <p class="subtitle">
                    ${config.industry.charAt(0).toUpperCase() + config.industry.slice(1)} Industry Risk Profile | 
                    ${config.complianceFrameworks.join(', ')} Compliance Requirements
                </p>
                
                <!-- Executive Risk Summary -->
                <div class="risk-summary-section">
                    ${this.renderExecutiveRiskSummary(config, results)}
                </div>
                
                <!-- Industry Risk Analysis -->
                <div class="industry-risk-section">
                    <h2>Industry-Specific Risk Analysis</h2>
                    ${this.renderIndustryRiskAnalysis(config, results)}
                </div>
                
                <!-- Compliance Coverage Matrix -->
                <div class="compliance-matrix-section">
                    <h2>Compliance Framework Coverage</h2>
                    ${this.renderComplianceMatrix(config, results)}
                </div>
                
                <!-- Cyber Insurance Impact -->
                <div class="insurance-impact-section">
                    <h2>Cyber Insurance Impact Analysis</h2>
                    ${this.renderInsuranceImpact(config, results)}
                </div>
                
                <!-- Security Capabilities Comparison -->
                <div class="security-capabilities-section">
                    <h2>Security Capabilities Deep Dive</h2>
                    ${this.renderSecurityCapabilities(results)}
                </div>
            </div>
        `;
        
        // Render charts
        setTimeout(() => {
            this.renderRiskCharts(config, results);
        }, 100);
    }
    
    renderExecutiveRiskSummary(config, results) {
        const industryData = this.riskData.industries[config.industry];
        const portnoxImpact = this.riskData.calculateRiskImpact(config.industry, 'portnox', config.devices, config.years);
        
        return `
            <div class="risk-summary-cards">
                <div class="risk-card critical">
                    <div class="risk-icon">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <div class="risk-content">
                        <h3>Industry Breach Risk</h3>
                        <div class="risk-value">${Math.round(industryData.breachProbability * 100)}%</div>
                        <div class="risk-label">Annual Probability</div>
                        <div class="risk-cost">Avg Cost: ${this.formatCurrency(industryData.avgBreachCost)}</div>
                    </div>
                </div>
                
                <div class="risk-card mitigation">
                    <div class="risk-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="risk-content">
                        <h3>Portnox Risk Reduction</h3>
                        <div class="risk-value">${Math.round(portnoxImpact.savings.percentageReduction)}%</div>
                        <div class="risk-label">Risk Mitigation</div>
                        <div class="risk-cost">Value: ${this.formatCurrency(portnoxImpact.savings.totalAnnualSavings)}/yr</div>
                    </div>
                </div>
                
                <div class="risk-card ransomware">
                    <div class="risk-icon">
                        <i class="fas fa-lock"></i>
                    </div>
                    <div class="risk-content">
                        <h3>Ransomware Protection</h3>
                        <div class="risk-value">${Math.round(industryData.ransomwareProbability * 100)}%</div>
                        <div class="risk-label">Industry Risk</div>
                        <div class="risk-cost">Portnox: 90% Prevention</div>
                    </div>
                </div>
                
                <div class="risk-card insurance">
                    <div class="risk-icon">
                        <i class="fas fa-umbrella"></i>
                    </div>
                    <div class="risk-content">
                        <h3>Insurance Premium Impact</h3>
                        <div class="risk-value">${Math.round(portnoxImpact.savings.premiumReduction / 
                            portnoxImpact.withoutNAC.insurancePremium * 100)}%</div>
                        <div class="risk-label">Premium Reduction</div>
                        <div class="risk-cost">Savings: ${this.formatCurrency(portnoxImpact.savings.premiumReduction)}/yr</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderIndustryRiskAnalysis(config, results) {
        const industryData = this.riskData.industries[config.industry];
        
        return `
            <div class="industry-risk-grid">
                <div class="risk-profile">
                    <h3>${industryData.name} Risk Profile</h3>
                    <div class="risk-metrics">
                        <div class="metric-row">
                            <span class="metric-label">Average Breach Cost:</span>
                            <span class="metric-value">${this.formatCurrency(industryData.avgBreachCost)}</span>
                        </div>
                        <div class="metric-row">
                            <span class="metric-label">Breach Probability:</span>
                            <span class="metric-value">${Math.round(industryData.breachProbability * 100)}% annually</span>
                        </div>
                        <div class="metric-row">
                            <span class="metric-label">Downtime Cost:</span>
                            <span class="metric-value">${this.formatCurrency(industryData.avgDowntimeCost)}/hour</span>
                        </div>
                        <div class="metric-row">
                            <span class="metric-label">Ransomware Risk:</span>
                            <span class="metric-value">${Math.round(industryData.ransomwareProbability * 100)}%</span>
                        </div>
                    </div>
                    
                    <h4>Top Industry Risks</h4>
                    <ul class="risk-list">
                        ${industryData.topRisks.map(risk => `<li>${risk}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="mitigation-comparison">
                    <h3>Risk Mitigation Comparison</h3>
                    <canvas id="risk-mitigation-chart" height="300"></canvas>
                </div>
                
                <div class="financial-impact">
                    <h3>3-Year Risk Financial Impact</h3>
                    <canvas id="risk-financial-chart" height="300"></canvas>
                </div>
            </div>
        `;
    }
    
    renderComplianceMatrix(config, results) {
        const frameworks = config.complianceFrameworks || ['SOC 2', 'ISO 27001', 'HIPAA'];
        const vendors = this.platform.selectedVendors;
        
        return `
            <div class="compliance-matrix-container">
                <table class="compliance-matrix">
                    <thead>
                        <tr>
                            <th>Compliance Framework</th>
                            ${vendors.map(vendorId => {
                                const vendor = this.vendorData[vendorId];
                                return `<th>${vendor.shortName}</th>`;
                            }).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${frameworks.map(framework => {
                            return `
                                <tr>
                                    <td class="framework-name">
                                        <strong>${framework}</strong>
                                        <br><small>${this.getFrameworkDescription(framework)}</small>
                                    </td>
                                    ${vendors.map(vendorId => {
                                        const score = this.complianceData.calculateComplianceScore(vendorId, 
                                            framework.toLowerCase().replace(/\s+/g, ''));
                                        const cssClass = score >= 90 ? 'excellent' : 
                                                       score >= 75 ? 'good' : 
                                                       score >= 60 ? 'fair' : 'poor';
                                        
                                        return `
                                            <td class="compliance-score ${cssClass}">
                                                <div class="score-value">${score}%</div>
                                                <div class="score-bar">
                                                    <div class="score-fill" style="width: ${score}%"></div>
                                                </div>
                                                ${vendorId === 'portnox' ? 
                                                    '<div class="automation-badge">95% Automated</div>' : ''}
                                            </td>
                                        `;
                                    }).join('')}
                                </tr>
                            `;
                        }).join('')}
                        
                        <tr class="summary-row">
                            <td><strong>Overall Compliance Score</strong></td>
                            ${vendors.map(vendorId => {
                                const summary = this.complianceData.getComplianceSummary(vendorId);
                                return `
                                    <td class="overall-score">
                                        <div class="score-value">${summary.overallScore}%</div>
                                        ${summary.certifications.length > 0 ? 
                                            `<div class="certifications">
                                                <i class="fas fa-certificate"></i> 
                                                ${summary.certifications.length} Certified
                                            </div>` : ''}
                                    </td>
                                `;
                            }).join('')}
                        </tr>
                    </tbody>
                </table>
                
                <div class="compliance-insights">
                    <h3>Compliance Insights</h3>
                    <div class="insight-cards">
                        <div class="insight-card">
                            <i class="fas fa-robot"></i>
                            <h4>Automation Advantage</h4>
                            <p>Portnox automates 95% of compliance tasks, reducing audit preparation 
                               from weeks to hours</p>
                        </div>
                        <div class="insight-card">
                            <i class="fas fa-file-alt"></i>
                            <h4>Real-Time Reporting</h4>
                            <p>Continuous compliance monitoring with one-click audit reports and 
                               automated evidence collection</p>
                        </div>
                        <div class="insight-card">
                            <i class="fas fa-check-double"></i>
                            <h4>Multi-Framework Support</h4>
                            <p>Single platform addressing all major compliance frameworks without 
                               additional modules or costs</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderInsuranceImpact(config, results) {
        const industryData = this.riskData.industries[config.industry];
        const vendors = this.platform.selectedVendors;
        
        return `
            <div class="insurance-impact-grid">
                <div class="premium-comparison">
                    <h3>Annual Cyber Insurance Premium Impact</h3>
                    <table class="insurance-table">
                        <thead>
                            <tr>
                                <th>Vendor</th>
                                <th>Base Premium</th>
                                <th>NAC Factor</th>
                                <th>Adjusted Premium</th>
                                <th>Annual Savings</th>
                                <th>3-Year Savings</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${vendors.map(vendorId => {
                                const impact = this.riskData.calculateRiskImpact(
                                    config.industry, vendorId, config.devices, config.years
                                );
                                const basePremium = industryData.cyberInsurance.avgPremium;
                                const factor = industryData.cyberInsurance.premiumFactors[
                                    vendorId === 'portnox' ? 'portnoxNAC' : 'legacyNAC'
                                ];
                                const adjustedPremium = basePremium * factor;
                                const savings = basePremium - adjustedPremium;
                                
                                return `
                                    <tr class="${vendorId === 'portnox' ? 'winner-row' : ''}">
                                        <td>${this.vendorData[vendorId].shortName}</td>
                                        <td>${this.formatCurrency(basePremium)}</td>
                                        <td>${factor}x</td>
                                        <td>${this.formatCurrency(adjustedPremium)}</td>
                                        <td class="savings">${this.formatCurrency(savings)}</td>
                                        <td class="savings">${this.formatCurrency(savings * 3)}</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div class="insurance-requirements">
                    <h3>Insurer Requirements Met</h3>
                    <div class="requirements-grid">
                        ${this.renderInsuranceRequirements()}
                    </div>
                </div>
                
                <div class="claim-impact">
                    <h3>Claims & Coverage Impact</h3>
                    <canvas id="insurance-coverage-chart" height="250"></canvas>
                </div>
            </div>
        `;
    }
    
    renderInsuranceRequirements() {
        const requirements = [
            { name: 'Multi-Factor Authentication', portnox: true, others: 'partial' },
            { name: 'Network Segmentation', portnox: true, others: 'partial' },
            { name: 'Continuous Monitoring', portnox: true, others: false },
            { name: 'Automated Incident Response', portnox: true, others: false },
            { name: 'Zero Trust Architecture', portnox: true, others: false },
            { name: 'Regular Security Updates', portnox: true, others: 'manual' },
            { name: 'Compliance Certifications', portnox: true, others: 'partial' },
            { name: 'Risk Assessment', portnox: true, others: 'partial' }
        ];
        
        return requirements.map(req => `
            <div class="requirement-item">
                <span class="req-name">${req.name}</span>
                <span class="req-status portnox">
                    <i class="fas fa-check-circle"></i> Portnox
                </span>
                <span class="req-status others ${req.others === true ? 'met' : req.others === 'partial' ? 'partial' : 'not-met'}">
                    ${req.others === true ? '<i class="fas fa-check-circle"></i>' :
                      req.others === 'partial' ? '<i class="fas fa-adjust"></i>' :
                      '<i class="fas fa-times-circle"></i>'} Others
                </span>
            </div>
        `).join('');
    }
    
    renderSecurityCapabilities(results) {
        return `
            <div class="security-capabilities-grid">
                <div class="capability-comparison">
                    <h3>Zero Trust Implementation</h3>
                    <canvas id="zero-trust-comparison" height="300"></canvas>
                </div>
                
                <div class="threat-detection">
                    <h3>Threat Detection & Response</h3>
                    <canvas id="threat-response-chart" height="300"></canvas>
                </div>
                
                <div class="security-scores">
                    <h3>Overall Security Effectiveness</h3>
                    ${this.renderSecurityScoreCards(results)}
                </div>
            </div>
        `;
    }
    
    renderSecurityScoreCards(results) {
        const vendors = this.platform.selectedVendors;
        
        return `
            <div class="security-score-cards">
                ${vendors.map(vendorId => {
                    const vendor = this.vendorData[vendorId];
                    const security = vendor.security || {};
                    const score = security.zeroTrust?.score || 50;
                    
                    return `
                        <div class="security-score-card ${vendorId === 'portnox' ? 'winner' : ''}">
                            <h4>${vendor.shortName}</h4>
                            <div class="overall-score">
                                <div class="score-circle" style="--score: ${score}">
                                    <span>${score}</span>
                                </div>
                                <span class="score-label">Security Score</span>
                            </div>
                            <div class="capability-scores">
                                <div class="cap-item">
                                    <span>Zero Trust</span>
                                    <span>${security.zeroTrust?.native ? '✓ Native' : '✗ Bolt-on'}</span>
                                </div>
                                <div class="cap-item">
                                    <span>AI Detection</span>
                                    <span>${security.threatDetection?.aiPowered ? '✓ Yes' : '✗ No'}</span>
                                </div>
                                <div class="cap-item">
                                    <span>Auto Response</span>
                                    <span>${security.incidentResponse?.automated ? '✓ Yes' : '✗ No'}</span>
                                </div>
                                <div class="cap-item">
                                    <span>MTTR</span>
                                    <span>${security.incidentResponse?.mttr || 'N/A'} min</span>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
    
    formatCurrency(value) {
        if (value === 0) return '$0';
        if (Math.abs(value) < 1000) return '$' + value.toFixed(0);
        if (Math.abs(value) < 1000000) return '$' + (value/1000).toFixed(0) + 'K';
        return '$' + (value/1000000).toFixed(1) + 'M';
    }
    
    getFrameworkDescription(framework) {
        const descriptions = {
            'SOC 2': 'Security, Availability, Confidentiality',
            'ISO 27001': 'Information Security Management',
            'HIPAA': 'Healthcare Data Protection',
            'GDPR': 'EU Data Privacy',
            'PCI DSS': 'Payment Card Security',
            'NIST CSF': 'Cybersecurity Framework'
        };
        return descriptions[framework] || '';
    }
    
    renderRiskCharts(config, results) {
        // Risk Mitigation Comparison
        this.renderRiskMitigationChart(config, results);
        
        // Financial Impact Chart
        this.renderRiskFinancialChart(config, results);
        
        // Insurance Coverage Chart
        this.renderInsuranceCoverageChart(config, results);
        
        // Zero Trust Comparison
        this.renderZeroTrustChart(results);
        
        // Threat Response Chart
        this.renderThreatResponseChart(results);
    }
    
    renderRiskMitigationChart(config, results) {
        const ctx = document.getElementById('risk-mitigation-chart');
        if (!ctx) return;
        
        const vendors = this.platform.selectedVendors;
        const categories = ['Breach Prevention', 'Ransomware Protection', 'Insider Threat', 'Compliance', 'Downtime'];
        
        const datasets = vendors.map(vendorId => {
            const mitigation = this.riskData.riskMitigation[vendorId] || 
                              this.riskData.riskMitigation['cloud-radius'];
            
            return {
                label: this.vendorData[vendorId].shortName,
                data: [
                    mitigation.breachProbabilityReduction * 100,
                    mitigation.ransomwareProtection * 100,
                    mitigation.insiderThreatMitigation * 100,
                    mitigation.complianceViolationReduction * 100,
                    mitigation.downtimeReduction * 100
                ],
                backgroundColor: vendorId === 'portnox' ? 'rgba(0, 212, 170, 0.8)' : undefined,
                borderColor: vendorId === 'portnox' ? '#00D4AA' : undefined,
                borderWidth: vendorId === 'portnox' ? 3 : 2
            };
        });
        
        ChartManager.createChart(ctx, {
            type: 'radar',
            data: {
                labels: categories,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            callback: value => value + '%'
                        }
                    }
                }
            }
        });
    }
    
    renderRiskFinancialChart(config, results) {
        const ctx = document.getElementById('risk-financial-chart');
        if (!ctx) return;
        
        const vendors = this.platform.selectedVendors;
        const data = vendors.map(vendorId => {
            const impact = this.riskData.calculateRiskImpact(config.industry, vendorId, config.devices, config.years);
            return {
                vendor: this.vendorData[vendorId].shortName,
                withoutNAC: impact.withoutNAC.totalAnnualCost * 3,
                withNAC: impact.withNAC.totalAnnualCost * 3,
                savings: impact.savings.threeYearSavings
            };
        });
        
        ChartManager.createChart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.vendor),
                datasets: [
                    {
                        label: 'Risk Cost Without NAC',
                        data: data.map(d => d.withoutNAC),
                        backgroundColor: '#EF4444'
                    },
                    {
                        label: 'Risk Cost With NAC',
                        data: data.map(d => d.withNAC),
                        backgroundColor: '#10B981'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => '$' + (value/1000000).toFixed(1) + 'M'
                        }
                    }
                }
            }
        });
    }
}

window.RiskComplianceAnalysis = RiskComplianceAnalysis;
console.log('✅ Risk & Compliance Analysis loaded');
