#!/bin/bash

# Phase 3: Enhanced Views with Industry, Risk, Security, and Compliance
echo "📊 Phase 3: Creating Enhanced Views..."
echo "====================================="

# Create Industry Analysis View
cat > js/views/industry-view.js << 'EOF'
/**
 * Industry Analysis View
 * Industry-specific TCO and compliance requirements
 */
(function() {
    window.IndustryView = {
        industries: {
            healthcare: {
                name: "Healthcare",
                icon: "fa-hospital",
                regulations: ["HIPAA", "HITECH", "FDA 21 CFR Part 11"],
                avgDevices: 3500,
                avgUsers: 2500,
                criticalFactors: {
                    compliance: 0.35,
                    security: 0.30,
                    availability: 0.20,
                    cost: 0.15
                },
                riskMultiplier: 1.5,
                breachCost: 4500000,
                downtimeHour: 25000
            },
            finance: {
                name: "Financial Services",
                icon: "fa-university",
                regulations: ["PCI DSS", "SOX", "GLBA", "FINRA"],
                avgDevices: 5000,
                avgUsers: 4000,
                criticalFactors: {
                    security: 0.40,
                    compliance: 0.30,
                    availability: 0.20,
                    cost: 0.10
                },
                riskMultiplier: 2.0,
                breachCost: 5800000,
                downtimeHour: 50000
            },
            education: {
                name: "Education",
                icon: "fa-graduation-cap",
                regulations: ["FERPA", "COPPA", "CIPA"],
                avgDevices: 8000,
                avgUsers: 10000,
                criticalFactors: {
                    cost: 0.35,
                    scalability: 0.25,
                    compliance: 0.20,
                    security: 0.20
                },
                riskMultiplier: 1.2,
                breachCost: 2500000,
                downtimeHour: 10000
            },
            government: {
                name: "Government",
                icon: "fa-landmark",
                regulations: ["NIST 800-53", "FedRAMP", "CMMC", "FIPS 140-2"],
                avgDevices: 10000,
                avgUsers: 8000,
                criticalFactors: {
                    security: 0.35,
                    compliance: 0.35,
                    availability: 0.20,
                    cost: 0.10
                },
                riskMultiplier: 2.5,
                breachCost: 8000000,
                downtimeHour: 75000
            },
            manufacturing: {
                name: "Manufacturing",
                icon: "fa-industry",
                regulations: ["ISO 27001", "NIST CSF", "TISAX"],
                avgDevices: 5000,
                avgUsers: 3000,
                criticalFactors: {
                    availability: 0.35,
                    security: 0.25,
                    cost: 0.25,
                    compliance: 0.15
                },
                riskMultiplier: 1.3,
                breachCost: 3500000,
                downtimeHour: 35000
            },
            retail: {
                name: "Retail",
                icon: "fa-shopping-cart",
                regulations: ["PCI DSS", "CCPA", "GDPR"],
                avgDevices: 3000,
                avgUsers: 2000,
                criticalFactors: {
                    cost: 0.30,
                    security: 0.30,
                    availability: 0.25,
                    compliance: 0.15
                },
                riskMultiplier: 1.4,
                breachCost: 3000000,
                downtimeHour: 20000
            }
        },

        render() {
            return `
                <div class="industry-view">
                    <div class="view-header">
                        <h1>Industry Analysis</h1>
                        <p class="view-subtitle">Industry-specific TCO impact and compliance requirements</p>
                    </div>
                    <div class="loading-container">
                        <div class="loading-spinner"></div>
                        <p>Loading industry analysis...</p>
                    </div>
                </div>
            `;
        },

        renderComplete() {
            const VendorDataManager = window.ModuleLoader.get('VendorDataManager');
            const ConfigManager = window.ModuleLoader.get('ConfigManager');
            
            if (!VendorDataManager || !ConfigManager) {
                return this.render();
            }

            const selectedIndustry = ConfigManager.get('industry', 'technology');
            const config = ConfigManager.get('defaults');

            return `
                <div class="industry-view">
                    <div class="view-header">
                        <h1>Industry Analysis</h1>
                        <p class="view-subtitle">Industry-specific TCO impact and compliance requirements</p>
                    </div>

                    <div class="industry-selector">
                        <h2>Select Your Industry</h2>
                        <div class="industry-cards">
                            ${Object.entries(this.industries).map(([key, industry]) => `
                                <div class="industry-card ${selectedIndustry === key ? 'selected' : ''}" 
                                     onclick="IndustryView.selectIndustry('${key}')">
                                    <i class="fas ${industry.icon}"></i>
                                    <h3>${industry.name}</h3>
                                    <div class="industry-stats">
                                        <span>Avg ${industry.avgDevices.toLocaleString()} devices</span>
                                        <span>${industry.regulations.length} regulations</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    ${this.renderIndustryAnalysis(selectedIndustry)}
                    ${this.renderComplianceMatrix(selectedIndustry)}
                    ${this.renderIndustryTCO(selectedIndustry)}
                    ${this.renderRiskComparison(selectedIndustry)}
                </div>
            `;
        },

        renderIndustryAnalysis(industryKey) {
            const industry = this.industries[industryKey];
            if (!industry) return '';

            return `
                <div class="industry-analysis-section">
                    <h2>${industry.name} Requirements</h2>
                    <div class="requirements-grid">
                        <div class="requirement-card">
                            <h3>Compliance Frameworks</h3>
                            <ul class="compliance-list">
                                ${industry.regulations.map(reg => `
                                    <li>
                                        <i class="fas fa-check-circle text-success"></i>
                                        ${reg}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>

                        <div class="requirement-card">
                            <h3>Critical Success Factors</h3>
                            <div class="factors-chart">
                                ${Object.entries(industry.criticalFactors).map(([factor, weight]) => `
                                    <div class="factor-row">
                                        <span class="factor-name">${this.formatFactorName(factor)}</span>
                                        <div class="factor-bar">
                                            <div class="factor-fill" style="width: ${weight * 100}%"></div>
                                        </div>
                                        <span class="factor-value">${(weight * 100).toFixed(0)}%</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="requirement-card">
                            <h3>Risk Profile</h3>
                            <div class="risk-metrics">
                                <div class="risk-item">
                                    <span class="risk-label">Risk Multiplier</span>
                                    <span class="risk-value">${industry.riskMultiplier}x</span>
                                </div>
                                <div class="risk-item">
                                    <span class="risk-label">Avg Breach Cost</span>
                                    <span class="risk-value">${this.formatCurrency(industry.breachCost)}</span>
                                </div>
                                <div class="risk-item">
                                    <span class="risk-label">Downtime Cost/Hour</span>
                                    <span class="risk-value">${this.formatCurrency(industry.downtimeHour)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        renderComplianceMatrix(industryKey) {
            const industry = this.industries[industryKey];
            const VendorDataManager = window.ModuleLoader.get('VendorDataManager');
            const vendors = VendorDataManager.getAllVendors();

            return `
                <div class="compliance-matrix-section">
                    <h2>Vendor Compliance Coverage</h2>
                    <div class="compliance-table-container">
                        <table class="compliance-matrix">
                            <thead>
                                <tr>
                                    <th>Vendor</th>
                                    ${industry.regulations.map(reg => `<th>${reg}</th>`).join('')}
                                    <th>Coverage</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${vendors.map(vendor => {
                                    const coverage = this.calculateComplianceCoverage(vendor, industry.regulations);
                                    return `
                                        <tr class="${vendor.id === 'portnox' ? 'highlight' : ''}">
                                            <td>${vendor.name}</td>
                                            ${industry.regulations.map(reg => `
                                                <td class="compliance-cell">
                                                    ${this.getComplianceStatus(vendor, reg)}
                                                </td>
                                            `).join('')}
                                            <td>
                                                <div class="coverage-badge coverage-${this.getCoverageClass(coverage)}">
                                                    ${coverage}%
                                                </div>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        },

        renderIndustryTCO(industryKey) {
            const industry = this.industries[industryKey];
            const VendorDataManager = window.ModuleLoader.get('VendorDataManager');
            const ConfigManager = window.ModuleLoader.get('ConfigManager');
            
            // Calculate with industry-specific parameters
            const industryConfig = {
                ...ConfigManager.get('defaults'),
                devices: industry.avgDevices,
                users: industry.avgUsers,
                riskMultiplier: industry.riskMultiplier
            };

            const vendors = ['portnox', 'cisco', 'aruba', 'forescout'];
            const results = vendors.map(vendorId => {
                const vendor = VendorDataManager.getVendor(vendorId);
                const tco = VendorDataManager.calculateTCO(vendorId, industryConfig);
                
                // Add industry-specific costs
                const complianceCost = this.calculateComplianceCost(vendor, industry);
                const riskCost = this.calculateRiskCost(vendor, industry);
                
                return {
                    vendor,
                    tco,
                    complianceCost,
                    riskCost,
                    totalCost: tco.total + complianceCost + riskCost
                };
            });

            return `
                <div class="industry-tco-section">
                    <h2>${industry.name} TCO Analysis</h2>
                    <div class="tco-comparison-cards">
                        ${results.map(result => `
                            <div class="tco-card ${result.vendor.id === 'portnox' ? 'highlight' : ''}">
                                <h3>${result.vendor.name}</h3>
                                <div class="tco-breakdown">
                                    <div class="tco-line">
                                        <span>Base TCO</span>
                                        <span>${this.formatCurrency(result.tco.total)}</span>
                                    </div>
                                    <div class="tco-line">
                                        <span>Compliance Cost</span>
                                        <span>${this.formatCurrency(result.complianceCost)}</span>
                                    </div>
                                    <div class="tco-line">
                                        <span>Risk-Adjusted Cost</span>
                                        <span>${this.formatCurrency(result.riskCost)}</span>
                                    </div>
                                    <div class="tco-line total">
                                        <span>Total Industry TCO</span>
                                        <span>${this.formatCurrency(result.totalCost)}</span>
                                    </div>
                                    <div class="tco-per-device">
                                        ${this.formatCurrency(result.totalCost / industry.avgDevices)} per device
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        renderRiskComparison(industryKey) {
            const industry = this.industries[industryKey];
            
            return `
                <div class="risk-comparison-section">
                    <h2>Risk & Security Impact</h2>
                    <div class="risk-analysis">
                        <div class="chart-container">
                            <canvas id="industry-risk-chart" height="300"></canvas>
                        </div>
                        <div class="risk-summary">
                            <h3>Industry Risk Factors</h3>
                            <p>In ${industry.name}, the average data breach costs ${this.formatCurrency(industry.breachCost)} 
                            and each hour of downtime costs ${this.formatCurrency(industry.downtimeHour)}.</p>
                            
                            <p>Portnox CLEAR reduces breach risk by 85% through native Zero Trust architecture and 
                            continuous verification, potentially saving ${this.formatCurrency(industry.breachCost * 0.85)} 
                            in breach prevention.</p>
                            
                            <div class="risk-calculations">
                                <h4>Annual Risk Exposure Comparison</h4>
                                <ul>
                                    <li>Legacy NAC: ${this.formatCurrency(industry.breachCost * 0.15)}</li>
                                    <li>Portnox CLEAR: ${this.formatCurrency(industry.breachCost * 0.025)}</li>
                                    <li>Annual Savings: ${this.formatCurrency(industry.breachCost * 0.125)}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        selectIndustry(industryKey) {
            const ConfigManager = window.ModuleLoader.get('ConfigManager');
            ConfigManager.set('industry', industryKey);
            
            // Update the view
            const UI = window.ModuleLoader.get('UIManager');
            if (UI) UI.refreshCurrentView();
        },

        calculateComplianceCoverage(vendor, regulations) {
            const vendorFrameworks = vendor.compliance?.frameworks || [];
            const covered = regulations.filter(reg => 
                vendorFrameworks.some(framework => 
                    framework.includes(reg) || reg.includes(framework)
                )
            ).length;
            
            return Math.round((covered / regulations.length) * 100);
        },

        getComplianceStatus(vendor, regulation) {
            const vendorFrameworks = vendor.compliance?.frameworks || [];
            const isCompliant = vendorFrameworks.some(framework => 
                framework.includes(regulation) || regulation.includes(framework)
            );
            
            if (isCompliant) {
                return '<i class="fas fa-check-circle text-success"></i>';
            } else if (vendor.compliance?.automation > 70) {
                return '<i class="fas fa-exclamation-circle text-warning" title="Partial with automation"></i>';
            } else {
                return '<i class="fas fa-times-circle text-danger"></i>';
            }
        },

        getCoverageClass(coverage) {
            if (coverage >= 90) return 'excellent';
            if (coverage >= 70) return 'good';
            if (coverage >= 50) return 'average';
            return 'poor';
        },

        calculateComplianceCost(vendor, industry) {
            const coverage = this.calculateComplianceCoverage(vendor, industry.regulations);
            const automationLevel = vendor.compliance?.automation || 20;
            
            // Base compliance cost
            let baseCost = 50000 * industry.regulations.length;
            
            // Adjust based on coverage and automation
            const coverageMultiplier = 1 - (coverage / 100 * 0.7);
            const automationMultiplier = 1 - (automationLevel / 100 * 0.5);
            
            return baseCost * coverageMultiplier * automationMultiplier;
        },

        calculateRiskCost(vendor, industry) {
            const breachReduction = vendor.security?.breachReduction || 0.3;
            const uptime = vendor.operational?.uptime || 99.0;
            
            // Annual breach risk cost
            const breachRisk = industry.breachCost * 0.15 * (1 - breachReduction);
            
            // Annual downtime cost
            const downtimeHours = (100 - uptime) / 100 * 8760;
            const downtimeCost = downtimeHours * industry.downtimeHour;
            
            return (breachRisk + downtimeCost) * industry.riskMultiplier;
        },

        formatFactorName(factor) {
            return factor.charAt(0).toUpperCase() + factor.slice(1);
        },

        formatCurrency(amount) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(amount);
        }
    };
})();
EOF

echo "✓ Created Industry Analysis View"

# Create Risk & Security View
cat > js/views/risk-security-view.js << 'EOF'
/**
 * Risk & Security Analysis View
 * Comprehensive security posture and risk assessment
 */
(function() {
    window.RiskSecurityView = {
        render() {
            return `
                <div class="risk-security-view">
                    <div class="view-header">
                        <h1>Risk & Security Analysis</h1>
                        <p class="view-subtitle">Zero Trust maturity, threat protection, and security ROI</p>
                    </div>
                    <div class="loading-container">
                        <div class="loading-spinner"></div>
                        <p>Analyzing security posture...</p>
                    </div>
                </div>
            `;
        },

        renderComplete() {
            const VendorDataManager = window.ModuleLoader.get('VendorDataManager');
            const ConfigManager = window.ModuleLoader.get('ConfigManager');
            
            if (!VendorDataManager || !ConfigManager) {
                return this.render();
            }

            const config = ConfigManager.get('defaults');
            const selectedVendors = ConfigManager.get('selectedVendors', ['portnox', 'cisco', 'aruba']);

            return `
                <div class="risk-security-view">
                    <div class="view-header">
                        <h1>Risk & Security Analysis</h1>
                        <p class="view-subtitle">Zero Trust maturity, threat protection, and security ROI</p>
                    </div>

                    ${this.renderSecurityScores(selectedVendors)}
                    ${this.renderZeroTrustMaturity(selectedVendors)}
                    ${this.renderThreatProtection(selectedVendors)}
                    ${this.renderSecurityROI(selectedVendors, config)}
                    ${this.renderCyberInsuranceImpact(selectedVendors)}
                </div>
            `;
        },

        renderSecurityScores(vendorIds) {
            const VendorDataManager = window.ModuleLoader.get('VendorDataManager');
            
            return `
                <div class="security-scores-section">
                    <h2>Security Effectiveness Score</h2>
                    <div class="security-cards">
                        ${vendorIds.map(vendorId => {
                            const vendor = VendorDataManager.getVendor(vendorId);
                            const scores = this.calculateSecurityScores(vendor);
                            
                            return `
                                <div class="security-card ${vendor.id === 'portnox' ? 'highlight' : ''}">
                                    <h3>${vendor.name}</h3>
                                    <div class="overall-score">
                                        <div class="score-circle score-${this.getScoreClass(scores.overall)}">
                                            <span class="score-value">${scores.overall}</span>
                                            <span class="score-label">Overall</span>
                                        </div>
                                    </div>
                                    <div class="score-breakdown">
                                        <div class="score-item">
                                            <span>Zero Trust</span>
                                            <div class="score-bar">
                                                <div class="score-fill" style="width: ${scores.zeroTrust}%"></div>
                                            </div>
                                            <span>${scores.zeroTrust}/100</span>
                                        </div>
                                        <div class="score-item">
                                            <span>Threat Detection</span>
                                            <div class="score-bar">
                                                <div class="score-fill" style="width: ${scores.threatDetection}%"></div>
                                            </div>
                                            <span>${scores.threatDetection}/100</span>
                                        </div>
                                        <div class="score-item">
                                            <span>Response Time</span>
                                            <div class="score-bar">
                                                <div class="score-fill" style="width: ${scores.responseTime}%"></div>
                                            </div>
                                            <span>${scores.responseTime}/100</span>
                                        </div>
                                        <div class="score-item">
                                            <span>Automation</span>
                                            <div class="score-bar">
                                                <div class="score-fill" style="width: ${scores.automation}%"></div>
                                            </div>
                                            <span>${scores.automation}/100</span>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        },

        renderZeroTrustMaturity(vendorIds) {
            const VendorDataManager = window.ModuleLoader.get('VendorDataManager');
            
            const principles = [
                { id: 'identity', name: 'Identity Verification', icon: 'fa-user-check' },
                { id: 'device', name: 'Device Trust', icon: 'fa-laptop-medical' },
                { id: 'network', name: 'Network Segmentation', icon: 'fa-network-wired' },
                { id: 'application', name: 'Application Access', icon: 'fa-shield-alt' },
                { id: 'data', name: 'Data Protection', icon: 'fa-database' },
                { id: 'visibility', name: 'Visibility & Analytics', icon: 'fa-eye' },
                { id: 'automation', name: 'Automation & Orchestration', icon: 'fa-robot' }
            ];

            return `
                <div class="zero-trust-section">
                    <h2>Zero Trust Maturity Assessment</h2>
                    <div class="maturity-grid">
                        ${vendorIds.map(vendorId => {
                            const vendor = VendorDataManager.getVendor(vendorId);
                            const maturity = this.assessZeroTrustMaturity(vendor);
                            
                            return `
                                <div class="maturity-card ${vendor.id === 'portnox' ? 'highlight' : ''}">
                                    <h3>${vendor.name}</h3>
                                    <div class="maturity-level">
                                        <span class="level-badge level-${maturity.level.toLowerCase()}">
                                            ${maturity.level}
                                        </span>
                                        <span class="level-score">${maturity.score}%</span>
                                    </div>
                                    <div class="principles-grid">
                                        ${principles.map(principle => `
                                            <div class="principle-item">
                                                <i class="fas ${principle.icon}"></i>
                                                <span>${principle.name}</span>
                                                <div class="maturity-indicator maturity-${maturity.principles[principle.id]}">
                                                    ${this.getMaturityIcon(maturity.principles[principle.id])}
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        },

        renderThreatProtection(vendorIds) {
            const VendorDataManager = window.ModuleLoader.get('VendorDataManager');
            
            return `
                <div class="threat-protection-section">
                    <h2>Threat Protection Capabilities</h2>
                    <div class="threat-comparison">
                        <table class="threat-table">
                            <thead>
                                <tr>
                                    <th>Threat Vector</th>
                                    ${vendorIds.map(id => {
                                        const vendor = VendorDataManager.getVendor(id);
                                        return `<th>${vendor.name}</th>`;
                                    }).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                ${this.getThreatVectors().map(threat => `
                                    <tr>
                                        <td>
                                            <i class="fas ${threat.icon} text-danger"></i>
                                            ${threat.name}
                                        </td>
                                        ${vendorIds.map(id => {
                                            const vendor = VendorDataManager.getVendor(id);
                                            const protection = this.getThreatProtection(vendor, threat.id);
                                            return `
                                                <td>
                                                    <div class="protection-level protection-${protection.level}">
                                                        ${protection.icon}
                                                        <span>${protection.description}</span>
                                                    </div>
                                                </td>
                                            `;
                                        }).join('')}
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        },

        renderSecurityROI(vendorIds, config) {
            const VendorDataManager = window.ModuleLoader.get('VendorDataManager');
            
            // Calculate security ROI for each vendor
            const roiData = vendorIds.map(vendorId => {
                const vendor = VendorDataManager.getVendor(vendorId);
                return {
                    vendor,
                    roi: this.calculateSecurityROI(vendor, config)
                };
            });

            return `
                <div class="security-roi-section">
                    <h2>Security Investment ROI</h2>
                    <div class="roi-grid">
                        ${roiData.map(data => `
                            <div class="roi-card ${data.vendor.id === 'portnox' ? 'highlight' : ''}">
                                <h3>${data.vendor.name}</h3>
                                <div class="roi-metrics">
                                    <div class="roi-metric">
                                        <span class="metric-label">Breach Risk Reduction</span>
                                        <span class="metric-value">${(data.vendor.security?.breachReduction * 100 || 30).toFixed(0)}%</span>
                                    </div>
                                    <div class="roi-metric">
                                        <span class="metric-label">Annual Risk Mitigation</span>
                                        <span class="metric-value">${this.formatCurrency(data.roi.riskMitigation)}</span>
                                    </div>
                                    <div class="roi-metric">
                                        <span class="metric-label">Incident Response Savings</span>
                                        <span class="metric-value">${this.formatCurrency(data.roi.incidentSavings)}</span>
                                    </div>
                                    <div class="roi-metric">
                                        <span class="metric-label">Productivity Gains</span>
                                        <span class="metric-value">${this.formatCurrency(data.roi.productivityGains)}</span>
                                    </div>
                                    <div class="roi-total">
                                        <span>Total Security ROI</span>
                                        <span>${this.formatCurrency(data.roi.total)}</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        renderCyberInsuranceImpact(vendorIds) {
            const VendorDataManager = window.ModuleLoader.get('VendorDataManager');
            
            return `
                <div class="insurance-impact-section">
                    <h2>Cyber Insurance Impact</h2>
                    <div class="insurance-comparison">
                        ${vendorIds.map(vendorId => {
                            const vendor = VendorDataManager.getVendor(vendorId);
                            const impact = this.calculateInsuranceImpact(vendor);
                            
                            return `
                                <div class="insurance-card ${vendor.id === 'portnox' ? 'highlight' : ''}">
                                    <h3>${vendor.name}</h3>
                                    <div class="insurance-metrics">
                                        <div class="premium-reduction">
                                            <i class="fas fa-percentage"></i>
                                            <div>
                                                <span class="metric-value">${impact.premiumReduction}%</span>
                                                <span class="metric-label">Premium Reduction</span>
                                            </div>
                                        </div>
                                        <div class="coverage-improvement">
                                            <i class="fas fa-shield-alt"></i>
                                            <div>
                                                <span class="metric-value">${impact.coverageIncrease}%</span>
                                                <span class="metric-label">Coverage Increase</span>
                                            </div>
                                        </div>
                                        <div class="annual-savings">
                                            <i class="fas fa-dollar-sign"></i>
                                            <div>
                                                <span class="metric-value">${this.formatCurrency(impact.annualSavings)}</span>
                                                <span class="metric-label">Annual Savings</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="insurance-factors">
                                        <h4>Key Factors</h4>
                                        <ul>
                                            ${impact.factors.map(factor => `
                                                <li>
                                                    <i class="fas fa-check text-success"></i>
                                                    ${factor}
                                                </li>
                                            `).join('')}
                                        </ul>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        },

        calculateSecurityScores(vendor) {
            const zeroTrust = vendor.security?.zeroTrust?.score || 50;
            const threatDetection = vendor.security?.threatDetection?.accuracy || 70;
            const responseTime = vendor.security?.mttr ? 
                Math.max(0, 100 - (vendor.security.mttr / 240) * 100) : 50;
            const automation = vendor.operational?.automation || 30;
            
            const overall = Math.round((zeroTrust + threatDetection + responseTime + automation) / 4);
            
            return {
                overall,
                zeroTrust,
                threatDetection,
                responseTime,
                automation
            };
        },

        assessZeroTrustMaturity(vendor) {
            const principles = {
                identity: vendor.features?.core?.['802.1X Authentication'] ? 'high' : 'low',
                device: vendor.features?.core?.['Device Profiling'] ? 'high' : 'medium',
                network: vendor.features?.zeroTrust?.['Microsegmentation'] ? 'high' : 'low',
                application: vendor.features?.zeroTrust?.['Contextual Access'] ? 'high' : 'low',
                data: vendor.compliance?.automation > 80 ? 'high' : 'medium',
                visibility: vendor.features?.zeroTrust?.['Behavioral Analytics'] ? 'high' : 'low',
                automation: vendor.operational?.automation > 80 ? 'high' : 'low'
            };
            
            const highCount = Object.values(principles).filter(v => v === 'high').length;
            const score = Math.round((highCount / 7) * 100);
            
            let level = 'Initial';
            if (score >= 90) level = 'Advanced';
            else if (score >= 70) level = 'Defined';
            else if (score >= 50) level = 'Developing';
            
            return { principles, score, level };
        },

        getThreatVectors() {
            return [
                { id: 'malware', name: 'Malware & Ransomware', icon: 'fa-virus' },
                { id: 'insider', name: 'Insider Threats', icon: 'fa-user-secret' },
                { id: 'lateral', name: 'Lateral Movement', icon: 'fa-project-diagram' },
                { id: 'credential', name: 'Credential Theft', icon: 'fa-key' },
                { id: 'iot', name: 'IoT/OT Attacks', icon: 'fa-microchip' },
                { id: 'supply', name: 'Supply Chain', icon: 'fa-link' }
            ];
        },

        getThreatProtection(vendor, threatId) {
            const protectionMap = {
                portnox: {
                    malware: { level: 'high', icon: '🛡️', description: 'AI-based detection' },
                    insider: { level: 'high', icon: '🛡️', description: 'Behavioral analytics' },
                    lateral: { level: 'high', icon: '🛡️', description: 'Microsegmentation' },
                    credential: { level: 'high', icon: '🛡️', description: 'Continuous verification' },
                    iot: { level: 'high', icon: '🛡️', description: 'Agentless profiling' },
                    supply: { level: 'medium', icon: '⚠️', description: 'Risk assessment' }
                },
                cisco: {
                    malware: { level: 'medium', icon: '⚠️', description: 'Basic detection' },
                    insider: { level: 'low', icon: '❌', description: 'Limited visibility' },
                    lateral: { level: 'medium', icon: '⚠️', description: 'TrustSec required' },
                    credential: { level: 'low', icon: '❌', description: 'Static policies' },
                    iot: { level: 'medium', icon: '⚠️', description: 'Profile library' },
                    supply: { level: 'low', icon: '❌', description: 'Manual process' }
                }
            };
            
            return protectionMap[vendor.id]?.[threatId] || 
                   { level: 'low', icon: '❌', description: 'Limited' };
        },

        calculateSecurityROI(vendor, config) {
            const avgBreachCost = 4500000;
            const breachProbability = 0.15; // 15% annual probability
            const breachReduction = vendor.security?.breachReduction || 0.3;
            
            // Risk mitigation value
            const riskMitigation = avgBreachCost * breachProbability * breachReduction;
            
            // Incident response savings (faster MTTR)
            const incidentsPerYear = 12;
            const avgIncidentCost = 50000;
            const mttrReduction = vendor.security?.mttr ? 
                Math.max(0.5, 1 - (vendor.security.mttr / 240)) : 0.3;
            const incidentSavings = incidentsPerYear * avgIncidentCost * mttrReduction;
            
            // Productivity gains from automation
            const automationLevel = vendor.operational?.automation || 30;
            const fteSavings = (automationLevel / 100) * 2.5 * 120000;
            
            return {
                riskMitigation,
                incidentSavings,
                productivityGains: fteSavings,
                total: riskMitigation + incidentSavings + fteSavings
            };
        },

        calculateInsuranceImpact(vendor) {
            const baseFactors = [];
            let premiumReduction = 0;
            let coverageIncrease = 0;
            
            // Zero Trust implementation
            if (vendor.security?.zeroTrust?.native) {
                premiumReduction += 15;
                coverageIncrease += 20;
                baseFactors.push('Native Zero Trust architecture');
            }
            
            // Compliance certifications
            if (vendor.compliance?.certifications?.['SOC 2 Type II']) {
                premiumReduction += 10;
                coverageIncrease += 10;
                baseFactors.push('SOC 2 Type II certified');
            }
            
            // Continuous monitoring
            if (vendor.features?.zeroTrust?.['Continuous Verification']) {
                premiumReduction += 8;
                coverageIncrease += 15;
                baseFactors.push('Continuous verification');
            }
            
            // Incident response capability
            if (vendor.security?.mttr < 60) {
                premiumReduction += 12;
                baseFactors.push('Rapid incident response (<1hr)');
            }
            
            // Calculate annual savings (based on $100k baseline premium)
            const basePremium = 100000;
            const annualSavings = basePremium * (premiumReduction / 100);
            
            return {
                premiumReduction,
                coverageIncrease,
                annualSavings,
                factors: baseFactors
            };
        },

        getScoreClass(score) {
            if (score >= 90) return 'excellent';
            if (score >= 75) return 'good';
            if (score >= 60) return 'average';
            return 'poor';
        },

        getMaturityIcon(level) {
            const icons = {
                high: '✅',
                medium: '⚠️',
                low: '❌'
            };
            return icons[level] || '❌';
        },

        formatCurrency(amount) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(amount);
        }
    };
})();
EOF

echo "✓ Created Risk & Security View"

# Create Enhanced Compliance View
cat > js/views/compliance-analysis-view.js << 'EOF'
/**
 * Compliance Analysis View
 * Comprehensive compliance framework coverage and automation
 */
(function() {
    window.ComplianceAnalysisView = {
        frameworks: {
            // Healthcare
            hipaa: {
                name: "HIPAA",
                category: "Healthcare",
                requirements: 54,
                controls: {
                    "Access Control": 15,
                    "Audit Controls": 8,
                    "Integrity Controls": 6,
                    "Transmission Security": 7,
                    "Administrative Safeguards": 18
                }
            },
            hitech: {
                name: "HITECH",
                category: "Healthcare",
                requirements: 23,
                controls: {
                    "Breach Notification": 8,
                    "Encryption": 5,
                    "Access Monitoring": 10
                }
            },
            
            // Financial
            pcidss: {
                name: "PCI DSS",
                category: "Financial",
                requirements: 12,
                controls: {
                    "Network Security": 4,
                    "Access Control": 3,
                    "Monitoring": 2,
                    "Policy": 3
                }
            },
            sox: {
                name: "SOX",
                category: "Financial",
                requirements: 11,
                controls: {
                    "Internal Controls": 5,
                    "Access Management": 3,
                    "Audit Trail": 3
                }
            },
            glba: {
                name: "GLBA",
                category: "Financial",
                requirements: 16,
                controls: {
                    "Safeguards Rule": 8,
                    "Privacy Rule": 5,
                    "Pretexting Protection": 3
                }
            },
            
            // Government
            nist80053: {
                name: "NIST 800-53",
                category: "Government",
                requirements: 325,
                controls: {
                    "Access Control": 25,
                    "Audit and Accountability": 16,
                    "System and Communications": 44,
                    "Identification and Authentication": 11
                }
            },
            fedramp: {
                name: "FedRAMP",
                category: "Government",
                requirements: 125,
                controls: {
                    "Low Impact": 125,
                    "Moderate Impact": 325,
                    "High Impact": 421
                }
            },
            cmmc: {
                name: "CMMC",
                category: "Government",
                requirements: 171,
                controls: {
                    "Level 1": 17,
                    "Level 2": 72,
                    "Level 3": 58,
                    "Level 4": 16,
                    "Level 5": 8
                }
            },
            
            // Privacy
            gdpr: {
                name: "GDPR",
                category: "Privacy",
                requirements: 99,
                controls: {
                    "Lawfulness": 15,
                    "Rights of Data Subject": 25,
                    "Security": 32,
                    "Accountability": 27
                }
            },
            ccpa: {
                name: "CCPA",
                category: "Privacy",
                requirements: 45,
                controls: {
                    "Consumer Rights": 20,
                    "Business Obligations": 15,
                    "Data Security": 10
                }
            },
            
            // Industry Standards
            iso27001: {
                name: "ISO 27001",
                category: "Industry Standard",
                requirements: 114,
                controls: {
                    "Organizational": 37,
                    "People": 8,
                    "Physical": 15,
                    "Technological": 34
                }
            },
            soc2: {
                name: "SOC 2",
                category: "Industry Standard",
                requirements: 64,
                controls: {
                    "Security": 20,
                    "Availability": 12,
                    "Confidentiality": 15,
                    "Privacy": 17
                }
            }
        },

        render() {
            return `
                <div class="compliance-analysis-view">
                    <div class="view-header">
                        <h1>Compliance Analysis</h1>
                        <p class="view-subtitle">Framework coverage, automation, and audit readiness</p>
                    </div>
                    <div class="loading-container">
                        <div class="loading-spinner"></div>
                        <p>Loading compliance analysis...</p>
                    </div>
                </div>
            `;
        },

        renderComplete() {
            const VendorDataManager = window.ModuleLoader.get('VendorDataManager');
            const ConfigManager = window.ModuleLoader.get('ConfigManager');
            
            if (!VendorDataManager || !ConfigManager) {
                return this.render();
            }

            const selectedFrameworks = ConfigManager.get('complianceFrameworks', 
                ['hipaa', 'pcidss', 'gdpr', 'soc2']);

            return `
                <div class="compliance-analysis-view">
                    <div class="view-header">
                        <h1>Compliance Analysis</h1>
                        <p class="view-subtitle">Framework coverage, automation, and audit readiness</p>
                    </div>

                    ${this.renderFrameworkSelector(selectedFrameworks)}
                    ${this.renderComplianceDashboard(selectedFrameworks)}
                    ${this.renderAutomationComparison()}
                    ${this.renderAuditReadiness()}
                    ${this.renderComplianceCostAnalysis(selectedFrameworks)}
                </div>
            `;
        },

        renderFrameworkSelector(selectedFrameworks) {
            const categories = {};
            Object.entries(this.frameworks).forEach(([key, framework]) => {
                if (!categories[framework.category]) {
                    categories[framework.category] = [];
                }
                categories[framework.category].push({ key, ...framework });
            });

            return `
                <div class="framework-selector-section">
                    <h2>Select Compliance Frameworks</h2>
                    <div class="framework-categories">
                        ${Object.entries(categories).map(([category, frameworks]) => `
                            <div class="framework-category">
                                <h3>${category}</h3>
                                <div class="framework-pills">
                                    ${frameworks.map(framework => `
                                        <div class="framework-pill ${selectedFrameworks.includes(framework.key) ? 'selected' : ''}"
                                             onclick="ComplianceAnalysisView.toggleFramework('${framework.key}')">
                                            <span>${framework.name}</span>
                                            <span class="requirement-count">${framework.requirements} controls</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        renderComplianceDashboard(selectedFrameworks) {
            const VendorDataManager = window.ModuleLoader.get('VendorDataManager');
            const vendors = ['portnox', 'cisco', 'aruba', 'forescout'];
            
            return `
                <div class="compliance-dashboard-section">
                    <h2>Compliance Coverage Analysis</h2>
                    <div class="compliance-matrix">
                        <table class="compliance-coverage-table">
                            <thead>
                                <tr>
                                    <th>Vendor</th>
                                    ${selectedFrameworks.map(fw => `
                                        <th>${this.frameworks[fw].name}</th>
                                    `).join('')}
                                    <th>Overall Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${vendors.map(vendorId => {
                                    const vendor = VendorDataManager.getVendor(vendorId);
                                    const scores = this.calculateFrameworkScores(vendor, selectedFrameworks);
                                    
                                    return `
                                        <tr class="${vendor.id === 'portnox' ? 'highlight' : ''}">
                                            <td>${vendor.name}</td>
                                            ${selectedFrameworks.map(fw => `
                                                <td>
                                                    <div class="compliance-score score-${this.getScoreClass(scores[fw])}">
                                                        ${scores[fw]}%
                                                    </div>
                                                </td>
                                            `).join('')}
                                            <td>
                                                <div class="overall-compliance-score score-${this.getScoreClass(scores.overall)}">
                                                    ${scores.overall}%
                                                </div>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="compliance-details">
                        ${vendors.map(vendorId => {
                            const vendor = VendorDataManager.getVendor(vendorId);
                            return this.renderVendorComplianceDetails(vendor, selectedFrameworks);
                        }).join('')}
                    </div>
                </div>
            `;
        },

        renderVendorComplianceDetails(vendor, frameworks) {
            const gaps = this.identifyComplianceGaps(vendor, frameworks);
            
            return `
                <div class="vendor-compliance-detail ${vendor.id === 'portnox' ? 'highlight' : ''}">
                    <h3>${vendor.name} Compliance Details</h3>
                    <div class="compliance-strengths">
                        <h4>Strengths</h4>
                        <ul>
                            ${vendor.compliance?.certifications ? 
                                Object.keys(vendor.compliance.certifications).map(cert => `
                                    <li><i class="fas fa-check text-success"></i> ${cert} Certified</li>
                                `).join('') : 
                                '<li>Limited certifications</li>'
                            }
                            ${vendor.compliance?.automation > 80 ? 
                                '<li><i class="fas fa-check text-success"></i> High automation level</li>' : ''
                            }
                        </ul>
                    </div>
                    <div class="compliance-gaps">
                        <h4>Gaps & Recommendations</h4>
                        <ul>
                            ${gaps.map(gap => `
                                <li><i class="fas fa-exclamation-triangle text-warning"></i> ${gap}</li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            `;
        },

        renderAutomationComparison() {
            const VendorDataManager = window.ModuleLoader.get('VendorDataManager');
            const vendors = ['portnox', 'cisco', 'aruba', 'forescout'];
            
            const automationData = vendors.map(vendorId => {
                const vendor = VendorDataManager.getVendor(vendorId);
                return {
                    vendor,
                    automation: this.calculateAutomationMetrics(vendor)
                };
            });

            return `
                <div class="automation-comparison-section">
                    <h2>Compliance Automation Analysis</h2>
                    <div class="automation-cards">
                        ${automationData.map(data => `
                            <div class="automation-card ${data.vendor.id === 'portnox' ? 'highlight' : ''}">
                                <h3>${data.vendor.name}</h3>
                                <div class="automation-metrics">
                                    <div class="metric-row">
                                        <span>Evidence Collection</span>
                                        <div class="progress-bar">
                                            <div class="progress-fill" style="width: ${data.automation.evidenceCollection}%"></div>
                                        </div>
                                        <span>${data.automation.evidenceCollection}%</span>
                                    </div>
                                    <div class="metric-row">
                                        <span>Report Generation</span>
                                        <div class="progress-bar">
                                            <div class="progress-fill" style="width: ${data.automation.reporting}%"></div>
                                        </div>
                                        <span>${data.automation.reporting}%</span>
                                    </div>
                                    <div class="metric-row">
                                        <span>Control Validation</span>
                                        <div class="progress-bar">
                                            <div class="progress-fill" style="width: ${data.automation.validation}%"></div>
                                        </div>
                                        <span>${data.automation.validation}%</span>
                                    </div>
                                    <div class="metric-row">
                                        <span>Remediation</span>
                                        <div class="progress-bar">
                                            <div class="progress-fill" style="width: ${data.automation.remediation}%"></div>
                                        </div>
                                        <span>${data.automation.remediation}%</span>
                                    </div>
                                </div>
                                <div class="automation-savings">
                                    <h4>Annual Savings</h4>
                                    <div class="savings-value">${this.formatCurrency(data.automation.annualSavings)}</div>
                                    <div class="savings-detail">${data.automation.hoursSaved} hours saved</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        renderAuditReadiness() {
            const VendorDataManager = window.ModuleLoader.get('VendorDataManager');
            const vendors = ['portnox', 'cisco', 'aruba'];
            
            return `
                <div class="audit-readiness-section">
                    <h2>Audit Readiness Assessment</h2>
                    <div class="audit-timeline">
                        <h3>Time to Audit Readiness</h3>
                        <div class="timeline-chart">
                            ${vendors.map(vendorId => {
                                const vendor = VendorDataManager.getVendor(vendorId);
                                const readiness = this.calculateAuditReadiness(vendor);
                                
                                return `
                                    <div class="timeline-row">
                                        <div class="vendor-name">${vendor.name}</div>
                                        <div class="timeline-bar">
                                            <div class="readiness-phases">
                                                <div class="phase deployment" style="width: ${readiness.deployment}%">
                                                    <span>Deploy</span>
                                                </div>
                                                <div class="phase configuration" style="width: ${readiness.configuration}%">
                                                    <span>Configure</span>
                                                </div>
                                                <div class="phase validation" style="width: ${readiness.validation}%">
                                                    <span>Validate</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="timeline-total">${readiness.totalDays} days</div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    
                    <div class="audit-capabilities">
                        <h3>Audit Support Features</h3>
                        <table class="audit-features-table">
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    ${vendors.map(id => `<th>${VendorDataManager.getVendor(id).name}</th>`).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                ${this.getAuditFeatures().map(feature => `
                                    <tr>
                                        <td>${feature.name}</td>
                                        ${vendors.map(vendorId => {
                                            const vendor = VendorDataManager.getVendor(vendorId);
                                            const hasFeature = this.hasAuditFeature(vendor, feature.id);
                                            return `
                                                <td class="feature-cell">
                                                    ${hasFeature ? 
                                                        '<i class="fas fa-check text-success"></i>' : 
                                                        '<i class="fas fa-times text-danger"></i>'
                                                    }
                                                </td>
                                            `;
                                        }).join('')}
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        },

        renderComplianceCostAnalysis(frameworks) {
            const VendorDataManager = window.ModuleLoader.get('VendorDataManager');
            const ConfigManager = window.ModuleLoader.get('ConfigManager');
            const config = ConfigManager.get('defaults');
            
            const vendors = ['portnox', 'cisco', 'aruba'];
            const costAnalysis = vendors.map(vendorId => {
                const vendor = VendorDataManager.getVendor(vendorId);
                return {
                    vendor,
                    costs: this.calculateComplianceCosts(vendor, frameworks, config)
                };
            });

            return `
                <div class="compliance-cost-section">
                    <h2>Compliance Cost Analysis</h2>
                    <div class="cost-comparison-grid">
                        ${costAnalysis.map(analysis => `
                            <div class="compliance-cost-card ${analysis.vendor.id === 'portnox' ? 'highlight' : ''}">
                                <h3>${analysis.vendor.name}</h3>
                                <div class="cost-breakdown">
                                    <div class="cost-item">
                                        <span>Initial Assessment</span>
                                        <span>${this.formatCurrency(analysis.costs.assessment)}</span>
                                    </div>
                                    <div class="cost-item">
                                        <span>Implementation</span>
                                        <span>${this.formatCurrency(analysis.costs.implementation)}</span>
                                    </div>
                                    <div class="cost-item">
                                        <span>Annual Audits</span>
                                        <span>${this.formatCurrency(analysis.costs.annualAudit)}</span>
                                    </div>
                                    <div class="cost-item">
                                        <span>Ongoing Maintenance</span>
                                        <span>${this.formatCurrency(analysis.costs.maintenance)}</span>
                                    </div>
                                    <div class="cost-item">
                                        <span>Gap Remediation</span>
                                        <span>${this.formatCurrency(analysis.costs.remediation)}</span>
                                    </div>
                                    <div class="cost-total">
                                        <span>3-Year Total</span>
                                        <span>${this.formatCurrency(analysis.costs.total)}</span>
                                    </div>
                                </div>
                                <div class="cost-savings">
                                    ${analysis.vendor.id === 'portnox' ? 
                                        `<div class="savings-highlight">
                                            Save ${this.formatCurrency(costAnalysis[1].costs.total - analysis.costs.total)}
                                            vs ${costAnalysis[1].vendor.name}
                                        </div>` : ''
                                    }
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        toggleFramework(frameworkKey) {
            const ConfigManager = window.ModuleLoader.get('ConfigManager');
            const selected = ConfigManager.get('complianceFrameworks', []);
            
            const index = selected.indexOf(frameworkKey);
            if (index > -1) {
                selected.splice(index, 1);
            } else {
                selected.push(frameworkKey);
            }
            
            ConfigManager.set('complianceFrameworks', selected);
            const UI = window.ModuleLoader.get('UIManager');
            if (UI) UI.refreshCurrentView();
        },

        calculateFrameworkScores(vendor, frameworks) {
            const scores = {};
            let totalScore = 0;
            
            frameworks.forEach(fw => {
                const framework = this.frameworks[fw];
                let score = 50; // Base score
                
                // Check if vendor explicitly supports this framework
                if (vendor.compliance?.frameworks?.includes(framework.name)) {
                    score = 95;
                } else {
                    // Calculate based on automation and features
                    score += (vendor.compliance?.automation || 0) * 0.3;
                    score += vendor.compliance?.auditReporting ? 10 : 0;
                    score += vendor.compliance?.continuousCompliance ? 10 : 0;
                }
                
                scores[fw] = Math.min(100, Math.round(score));
                totalScore += scores[fw];
            });
            
            scores.overall = Math.round(totalScore / frameworks.length);
            return scores;
        },

        identifyComplianceGaps(vendor, frameworks) {
            const gaps = [];
            
            frameworks.forEach(fw => {
                const framework = this.frameworks[fw];
                if (!vendor.compliance?.frameworks?.includes(framework.name)) {
                    gaps.push(`${framework.name} not explicitly supported`);
                }
            });
            
            if (vendor.compliance?.automation < 50) {
                gaps.push('Low automation level increases compliance effort');
            }
            
            if (!vendor.compliance?.continuousCompliance) {
                gaps.push('Lacks continuous compliance monitoring');
            }
            
            return gaps.length > 0 ? gaps : ['Full compliance coverage'];
        },

        calculateAutomationMetrics(vendor) {
            const baseAutomation = vendor.compliance?.automation || 20;
            
            const metrics = {
                evidenceCollection: Math.min(100, baseAutomation * 1.2),
                reporting: vendor.compliance?.auditReporting ? 90 : 20,
                validation: vendor.compliance?.continuousCompliance ? 85 : 30,
                remediation: Math.min(100, baseAutomation * 0.8)
            };
            
            // Calculate time savings
            const annualAuditHours = 500;
            const automationLevel = Object.values(metrics).reduce((a, b) => a + b) / 4;
            const hoursSaved = Math.round(annualAuditHours * (automationLevel / 100));
            const annualSavings = hoursSaved * 150; // $150/hour for compliance work
            
            return {
                ...metrics,
                hoursSaved,
                annualSavings
            };
        },

        calculateAuditReadiness(vendor) {
           const deploymentDays = vendor.deployment.time / 24;
           const configurationDays = vendor.compliance?.automation > 80 ? 5 : 30;
           const validationDays = vendor.compliance?.continuousCompliance ? 7 : 45;
           
           const totalDays = deploymentDays + configurationDays + validationDays;
           
           return {
               deployment: (deploymentDays / totalDays) * 100,
               configuration: (configurationDays / totalDays) * 100,
               validation: (validationDays / totalDays) * 100,
               totalDays: Math.round(totalDays)
           };
       },

       getAuditFeatures() {
           return [
               { id: 'realtime_reporting', name: 'Real-time Compliance Reporting' },
               { id: 'automated_evidence', name: 'Automated Evidence Collection' },
               { id: 'continuous_monitoring', name: 'Continuous Compliance Monitoring' },
               { id: 'role_based_access', name: 'Role-based Access Control' },
               { id: 'audit_trail', name: 'Comprehensive Audit Trail' },
               { id: 'policy_templates', name: 'Pre-built Policy Templates' },
               { id: 'gap_analysis', name: 'Automated Gap Analysis' },
               { id: 'remediation_workflow', name: 'Remediation Workflows' }
           ];
       },

       hasAuditFeature(vendor, featureId) {
           const featureMap = {
               portnox: {
                   realtime_reporting: true,
                   automated_evidence: true,
                   continuous_monitoring: true,
                   role_based_access: true,
                   audit_trail: true,
                   policy_templates: true,
                   gap_analysis: true,
                   remediation_workflow: true
               },
               cisco: {
                   realtime_reporting: false,
                   automated_evidence: false,
                   continuous_monitoring: false,
                   role_based_access: true,
                   audit_trail: true,
                   policy_templates: false,
                   gap_analysis: false,
                   remediation_workflow: false
               },
               aruba: {
                   realtime_reporting: false,
                   automated_evidence: false,
                   continuous_monitoring: false,
                   role_based_access: true,
                   audit_trail: true,
                   policy_templates: true,
                   gap_analysis: false,
                   remediation_workflow: false
               }
           };
           
           return featureMap[vendor.id]?.[featureId] || false;
       },

       calculateComplianceCosts(vendor, frameworks, config) {
           const frameworkCount = frameworks.length;
           const devices = config.devices;
           
           // Base costs
           let assessment = frameworkCount * 25000;
           let implementation = frameworkCount * 50000;
           let annualAudit = frameworkCount * 15000;
           let maintenance = frameworkCount * 20000;
           let remediation = frameworkCount * 30000;
           
           // Adjust based on vendor capabilities
           const automationFactor = 1 - (vendor.compliance?.automation || 20) / 100;
           
           assessment *= automationFactor;
           implementation *= automationFactor;
           maintenance *= automationFactor * 0.5;
           
           // Add complexity for legacy systems
           if (vendor.category === 'legacy-enterprise') {
               implementation *= 1.5;
               maintenance *= 1.8;
               remediation *= 2.0;
           }
           
           // Calculate 3-year total
           const total = assessment + implementation + (annualAudit * 3) + (maintenance * 3) + remediation;
           
           return {
               assessment: Math.round(assessment),
               implementation: Math.round(implementation),
               annualAudit: Math.round(annualAudit),
               maintenance: Math.round(maintenance),
               remediation: Math.round(remediation),
               total: Math.round(total)
           };
       },

       getScoreClass(score) {
           if (score >= 90) return 'excellent';
           if (score >= 75) return 'good';
           if (score >= 60) return 'average';
           return 'poor';
       },

       formatCurrency(amount) {
           return new Intl.NumberFormat('en-US', {
               style: 'currency',
               currency: 'USD',
               minimumFractionDigits: 0,
               maximumFractionDigits: 0
           }).format(amount);
       }
   };
})();
EOF

echo "✓ Created Enhanced Compliance Analysis View"

# Update navigation to include new views
cat > js/navigation-update.js << 'EOF'
// Add this to your UI Manager navigation items
const additionalNavItems = [
   { id: 'industry', label: 'Industry', icon: 'fa-building' },
   { id: 'risk-security', label: 'Risk & Security', icon: 'fa-shield-virus' },
   { id: 'compliance-analysis', label: 'Compliance', icon: 'fa-clipboard-check' }
];
EOF

echo "✓ Phase 3 Complete: Enhanced views created"
echo ""
echo "New views added:"
echo "✓ Industry Analysis - Industry-specific TCO and requirements"
echo "✓ Risk & Security - Zero Trust maturity and threat protection"
echo "✓ Compliance Analysis - Framework coverage and automation"
echo ""
