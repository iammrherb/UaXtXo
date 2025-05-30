/**
 * Comprehensive Risk Assessment with Business Impact Analysis
 */

class ComprehensiveRiskAssessment {
    constructor() {
        this.riskFactors = {
            'unauthorized_access': {
                name: 'Unauthorized Network Access',
                description: 'Risk of unauthorized devices or users gaining network access',
                probability: { withoutNAC: 85, withPortnox: 15 },
                impact: { financial: 250000, operational: 'High', reputational: 'High' },
                mitigation: '802.1X authentication, continuous device profiling, guest isolation'
            },
            'data_breach': {
                name: 'Data Breach',
                description: 'Risk of sensitive data exposure or theft',
                probability: { withoutNAC: 60, withPortnox: 10 },
                impact: { financial: 4350000, operational: 'Critical', reputational: 'Critical' },
                mitigation: 'Network segmentation, encryption enforcement, access controls'
            },
            'malware_infection': {
                name: 'Malware/Ransomware',
                description: 'Risk of malware spreading through network',
                probability: { withoutNAC: 70, withPortnox: 20 },
                impact: { financial: 1200000, operational: 'Critical', reputational: 'High' },
                mitigation: 'Device health checks, isolation of infected devices, automated remediation'
            },
            'compliance_violation': {
                name: 'Compliance Violations',
                description: 'Risk of regulatory non-compliance and penalties',
                probability: { withoutNAC: 75, withPortnox: 15 },
                impact: { financial: 500000, operational: 'Medium', reputational: 'High' },
                mitigation: 'Automated compliance reporting, policy enforcement, audit trails'
            },
            'insider_threat': {
                name: 'Insider Threats',
                description: 'Risk from malicious or negligent insiders',
                probability: { withoutNAC: 45, withPortnox: 12 },
                impact: { financial: 800000, operational: 'High', reputational: 'Medium' },
                mitigation: 'Behavior analytics, privileged access management, activity monitoring'
            },
            'iot_vulnerability': {
                name: 'IoT/OT Security Gaps',
                description: 'Risk from unmanaged IoT and OT devices',
                probability: { withoutNAC: 90, withPortnox: 25 },
                impact: { financial: 600000, operational: 'High', reputational: 'Medium' },
                mitigation: 'IoT discovery and profiling, segmentation, policy-based controls'
            },
            'shadow_it': {
                name: 'Shadow IT',
                description: 'Risk from unauthorized applications and services',
                probability: { withoutNAC: 80, withPortnox: 20 },
                impact: { financial: 300000, operational: 'Medium', reputational: 'Low' },
                mitigation: 'Application visibility, BYOD policies, cloud app controls'
            },
            'supply_chain': {
                name: 'Supply Chain Attacks',
                description: 'Risk from compromised vendors or partners',
                probability: { withoutNAC: 55, withPortnox: 18 },
                impact: { financial: 950000, operational: 'High', reputational: 'High' },
                mitigation: 'Vendor network isolation, certificate validation, third-party controls'
            },
            'zero_day': {
                name: 'Zero-Day Exploits',
                description: 'Risk from unknown vulnerabilities',
                probability: { withoutNAC: 40, withPortnox: 15 },
                impact: { financial: 1500000, operational: 'Critical', reputational: 'High' },
                mitigation: 'Behavioral analysis, microsegmentation, rapid containment'
            },
            'physical_security': {
                name: 'Physical Security Breaches',
                description: 'Risk from physical access to network resources',
                probability: { withoutNAC: 50, withPortnox: 10 },
                impact: { financial: 400000, operational: 'Medium', reputational: 'Medium' },
                mitigation: 'Port security, location-based policies, visitor management'
            }
        };
        
        this.businessImpacts = {
            'operational_disruption': {
                name: 'Operational Disruption',
                withoutNAC: { hours: 72, cost: 150000 },
                withPortnox: { hours: 4, cost: 15000 }
            },
            'customer_trust': {
                name: 'Customer Trust Impact',
                withoutNAC: { loss: '25%', recovery: '18 months' },
                withPortnox: { loss: '5%', recovery: '3 months' }
            },
            'regulatory_fines': {
                name: 'Regulatory Penalties',
                withoutNAC: { probability: '60%', avgFine: 750000 },
                withPortnox: { probability: '10%', avgFine: 50000 }
            },
            'insurance_premiums': {
                name: 'Cyber Insurance',
                withoutNAC: { annual: 125000, deductible: 500000 },
                withPortnox: { annual: 65000, deductible: 100000 }
            }
        };
    }
    
    render(container) {
        container.innerHTML = `
            <div class="risk-assessment-comprehensive">
                <div class="risk-overview">
                    <h3>Enterprise Risk Assessment Dashboard</h3>
                    <div class="risk-summary-cards">
                        <div class="risk-card critical">
                            <h4>Overall Risk Score</h4>
                            <div class="risk-comparison">
                                <div class="risk-item">
                                    <span class="label">Without NAC</span>
                                    <span class="score high">85/100</span>
                                </div>
                                <div class="risk-item">
                                    <span class="label">With Portnox</span>
                                    <span class="score low">22/100</span>
                                </div>
                            </div>
                            <p class="risk-reduction">74% Risk Reduction</p>
                        </div>
                        
                        <div class="risk-card financial">
                            <h4>Annual Risk Exposure</h4>
                            <div class="risk-comparison">
                                <div class="risk-item">
                                    <span class="label">Without NAC</span>
                                    <span class="amount">$${this.calculateTotalExposure(false).toLocaleString()}</span>
                                </div>
                                <div class="risk-item">
                                    <span class="label">With Portnox</span>
                                    <span class="amount">$${this.calculateTotalExposure(true).toLocaleString()}</span>
                                </div>
                            </div>
                            <p class="savings">Savings: $${(this.calculateTotalExposure(false) - this.calculateTotalExposure(true)).toLocaleString()}</p>
                        </div>
                        
                        <div class="risk-card insurance">
                            <h4>Cyber Insurance Impact</h4>
                            <div class="insurance-details">
                                <p><strong>Premium Reduction:</strong> 48%</p>
                                <p><strong>Deductible Reduction:</strong> 80%</p>
                                <p><strong>Annual Savings:</strong> $${(this.businessImpacts.insurance_premiums.withoutNAC.annual - this.businessImpacts.insurance_premiums.withPortnox.annual).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="risk-matrix-section">
                    <h3>Risk Factor Analysis</h3>
                    <div id="risk-matrix-heatmap"></div>
                </div>
                
                <div class="risk-factors-detail">
                    <h3>Detailed Risk Factors</h3>
                    <div class="risk-factors-grid">
                        ${Object.entries(this.riskFactors).map(([key, risk]) => `
                            <div class="risk-factor-card">
                                <h4>${risk.name}</h4>
                                <p class="description">${risk.description}</p>
                                
                                <div class="probability-chart">
                                    <div class="prob-bar without-nac" style="width: ${risk.probability.withoutNAC}%">
                                        <span>Without NAC: ${risk.probability.withoutNAC}%</span>
                                    </div>
                                    <div class="prob-bar with-portnox" style="width: ${risk.probability.withPortnox}%">
                                        <span>With Portnox: ${risk.probability.withPortnox}%</span>
                                    </div>
                                </div>
                                
                                <div class="impact-details">
                                    <h5>Potential Impact:</h5>
                                    <ul>
                                        <li>Financial: $${risk.impact.financial.toLocaleString()}</li>
                                        <li>Operational: ${risk.impact.operational}</li>
                                        <li>Reputational: ${risk.impact.reputational}</li>
                                    </ul>
                                </div>
                                
                                <div class="mitigation">
                                    <h5>Portnox Mitigation:</h5>
                                    <p>${risk.mitigation}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="business-impact-section">
                    <h3>Business Impact Analysis</h3>
                    <div class="impact-charts">
                        <div id="operational-impact-chart" class="chart-container"></div>
                        <div id="financial-impact-chart" class="chart-container"></div>
                    </div>
                </div>
                
                <div class="incident-response-section">
                    <h3>Incident Response Capabilities</h3>
                    <div class="response-metrics">
                        <div class="metric-card">
                            <h4>Mean Time to Detect (MTTD)</h4>
                            <p class="without">Without NAC: 206 days</p>
                            <p class="with">With Portnox: <span class="highlight">< 1 minute</span></p>
                        </div>
                        <div class="metric-card">
                            <h4>Mean Time to Respond (MTTR)</h4>
                            <p class="without">Without NAC: 73 hours</p>
                            <p class="with">With Portnox: <span class="highlight">< 5 minutes</span></p>
                        </div>
                        <div class="metric-card">
                            <h4>Containment Success Rate</h4>
                            <p class="without">Without NAC: 45%</p>
                            <p class="with">With Portnox: <span class="highlight">98%</span></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.renderRiskMatrix();
        this.renderBusinessImpactCharts();
    }
    
    calculateTotalExposure(withPortnox) {
        let total = 0;
        Object.values(this.riskFactors).forEach(risk => {
            const probability = withPortnox ? risk.probability.withPortnox : risk.probability.withoutNAC;
            total += (risk.impact.financial * probability / 100);
        });
        return Math.round(total);
    }
    
    renderRiskMatrix() {
        // Implementation for risk matrix heatmap
        const risks = Object.entries(this.riskFactors).map(([key, risk]) => ({
            name: risk.name,
            withoutNAC: risk.probability.withoutNAC,
            withPortnox: risk.probability.withPortnox,
            impact: risk.impact.financial
        }));
        
        // Render heatmap chart here
    }
    
    renderBusinessImpactCharts() {
        // Implementation for business impact charts
    }
}

window.comprehensiveRiskAssessment = new ComprehensiveRiskAssessment();
console.log("✅ Comprehensive risk assessment initialized");
