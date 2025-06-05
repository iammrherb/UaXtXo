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
