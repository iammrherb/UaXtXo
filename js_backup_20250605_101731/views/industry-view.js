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
