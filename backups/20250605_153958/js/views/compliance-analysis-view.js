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
