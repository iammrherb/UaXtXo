#!/bin/bash

# Compliance Report Generator & Enhanced Industry Details
# Adds downloadable reports and more specific compliance mappings

echo "📄 Creating compliance report generator..."

# Create compliance report generator
cat > js/views/compliance-report-generator.js << 'EOF'
/**
 * Compliance Report Generator
 * Creates downloadable compliance reports
 */

window.ComplianceReportGenerator = {
    
    generateReport(industry, deviceCount, results) {
        const data = window.ComplianceFrameworkData;
        const ind = data.industries[industry];
        const timestamp = new Date().toISOString();
        
        // Generate comprehensive report
        const report = {
            metadata: {
                generatedAt: timestamp,
                industry: ind.name,
                deviceCount: deviceCount,
                organization: 'Executive Compliance Report'
            },
            
            executiveSummary: this.generateExecutiveSummary(industry, deviceCount, results),
            
            frameworkAnalysis: this.generateFrameworkAnalysis(ind, data),
            
            controlMapping: this.generateControlMapping(ind, data),
            
            costBenefit: this.generateCostBenefit(industry, deviceCount, results),
            
            recommendations: this.generateRecommendations(ind),
            
            implementationPlan: this.generateImplementationPlan(ind)
        };
        
        return report;
    },
    
    generateExecutiveSummary(industry, deviceCount, results) {
        const ind = window.ComplianceFrameworkData.industries[industry];
        const savings = window.ComplianceFrameworkData.calculateComplianceSavings(industry, deviceCount);
        
        return {
            overview: `${ind.name} organization with ${deviceCount} devices requiring compliance across ${ind.primaryFrameworks.length} frameworks`,
            
            keyFindings: [
                `Current compliance posture creates ${ind.avgBreachCost ? '$' + (ind.avgBreachCost/1000000).toFixed(1) + 'M' : 'significant'} breach exposure`,
                `Portnox reduces compliance risk by 75% across all frameworks`,
                `Annual compliance savings of $${Math.round(savings/1000)}K expected`,
                `Implementation achievable within 90 days`
            ],
            
            criticalMetrics: {
                currentComplianceScore: 35,
                projectedComplianceScore: 94,
                riskReduction: 75,
                auditReadiness: 95,
                roi: Math.round((savings / (results.portnox?.year1?.tco?.total || 50000)) * 100)
            }
        };
    },
    
    generateFrameworkAnalysis(ind, data) {
        const analysis = {};
        
        ind.primaryFrameworks.forEach(fw => {
            const framework = data.frameworks[fw];
            if (!framework) return;
            
            analysis[fw] = {
                name: framework.name,
                version: framework.version,
                criticalControls: Object.keys(framework.criticalControls || {}).length,
                portnoxCoverage: this.calculateAverageCoverage(framework),
                violationRisk: framework.violationCosts,
                specificRequirements: this.getFrameworkRequirements(fw)
            };
        });
        
        return analysis;
    },
    
    calculateAverageCoverage(framework) {
        const controls = Object.values(framework.criticalControls || {});
        if (controls.length === 0) return 0;
        
        const total = controls.reduce((sum, ctrl) => sum + ctrl.portnoxSupport, 0);
        return Math.round(total / controls.length);
    },
    
    getFrameworkRequirements(framework) {
        const requirements = {
            'nist-csf': [
                'Continuous asset inventory',
                'Identity and access management',
                'Network segmentation',
                'Security monitoring',
                'Incident response automation'
            ],
            'cmmc': [
                'CUI protection',
                'Access control enforcement',
                'System monitoring',
                'Configuration management',
                'Security assessment'
            ],
            'hipaa': [
                'PHI access controls',
                'Audit logging',
                'Encryption enforcement',
                'User authentication',
                'Risk assessments'
            ],
            'iso27001': [
                'Information security policy',
                'Asset management',
                'Access control',
                'Cryptography',
                'Incident management'
            ],
            'pci-dss': [
                'Network segmentation',
                'Access control',
                'Regular monitoring',
                'Vulnerability management',
                'Strong authentication'
            ]
        };
        
        return requirements[framework] || [];
    },
    
    generateControlMapping(ind, data) {
        const mapping = [];
        
        // Common controls across frameworks
        const commonControls = [
            {
                control: 'Device Visibility & Inventory',
                frameworks: ind.primaryFrameworks,
                portnoxCapability: 'Automated discovery and classification',
                complianceImpact: 95
            },
            {
                control: 'Access Control Management',
                frameworks: ind.primaryFrameworks,
                portnoxCapability: 'Policy-based NAC with Zero Trust',
                complianceImpact: 98
            },
            {
                control: 'Network Segmentation',
                frameworks: ind.primaryFrameworks.filter(fw => ['pci-dss', 'nerc-cip', 'cmmc'].includes(fw)),
                portnoxCapability: 'Dynamic VLAN assignment',
                complianceImpact: 100
            },
            {
                control: 'Audit & Logging',
                frameworks: ind.primaryFrameworks,
                portnoxCapability: 'Centralized logging with SIEM integration',
                complianceImpact: 92
            },
            {
                control: 'Incident Response',
                frameworks: ind.primaryFrameworks,
                portnoxCapability: 'Automated threat containment',
                complianceImpact: 88
            }
        ];
        
        return commonControls.filter(ctrl => ctrl.frameworks.length > 0);
    },
    
    generateCostBenefit(industry, deviceCount, results) {
        const ind = window.ComplianceFrameworkData.industries[industry];
        const savings = window.ComplianceFrameworkData.calculateComplianceSavings(industry, deviceCount);
        const portnoxCost = results.portnox?.year1?.tco?.total || 50000;
        
        return {
            costs: {
                currentState: {
                    annualBreachRisk: Math.round(ind.avgBreachCost * 0.15),
                    auditCosts: deviceCount * 50,
                    remediationCosts: deviceCount * 25,
                    complianceStaff: 150000,
                    total: Math.round(ind.avgBreachCost * 0.15 + deviceCount * 75 + 150000)
                },
                withPortnox: {
                    solution: portnoxCost,
                    reducedBreachRisk: Math.round(ind.avgBreachCost * 0.15 * 0.25),
                    reducedAuditCosts: Math.round(deviceCount * 50 * 0.7),
                    reducedRemediation: Math.round(deviceCount * 25 * 0.5),
                    total: Math.round(portnoxCost + (ind.avgBreachCost * 0.15 * 0.25) + (deviceCount * 50 * 0.7) + (deviceCount * 25 * 0.5))
                }
            },
            savings: {
                annual: savings,
                threeYear: savings * 3,
                roi: Math.round((savings / portnoxCost) * 100),
                paybackMonths: Math.round(portnoxCost / (savings / 12))
            }
        };
    },
    
    generateRecommendations(ind) {
        const recommendations = [
            {
                priority: 'Critical',
                recommendation: `Implement Portnox CLEAR to address ${ind.primaryFrameworks.length} compliance frameworks`,
                impact: 'Reduces breach risk by 75% and audit costs by 30%',
                timeline: 'Immediate'
            },
            {
                priority: 'High',
                recommendation: 'Enable automated compliance controls for all critical assets',
                impact: 'Achieves 95% control automation',
                timeline: '30 days'
            },
            {
                priority: 'High',
                recommendation: 'Configure continuous compliance monitoring',
                impact: 'Real-time compliance visibility',
                timeline: '60 days'
            },
            {
                priority: 'Medium',
                recommendation: 'Integrate with existing security tools',
                impact: 'Unified compliance management',
                timeline: '90 days'
            }
        ];
        
        // Add industry-specific recommendations
        if (ind.specificRequirements) {
            Object.values(ind.specificRequirements).forEach(req => {
                recommendations.push({
                    priority: 'High',
                    recommendation: req.requirement,
                    impact: `${req.complianceImpact}% compliance improvement`,
                    timeline: '60 days'
                });
            });
        }
        
        return recommendations;
    },
    
    generateImplementationPlan(ind) {
        return {
            phase1: {
                name: 'Foundation (Days 1-30)',
                tasks: [
                    'Deploy Portnox CLEAR platform',
                    'Discover and inventory all devices',
                    'Map current compliance gaps',
                    'Define compliance policies'
                ]
            },
            phase2: {
                name: 'Configuration (Days 31-60)',
                tasks: [
                    'Configure framework-specific controls',
                    'Implement network segmentation',
                    'Enable automated remediation',
                    'Set up compliance reporting'
                ]
            },
            phase3: {
                name: 'Validation (Days 61-90)',
                tasks: [
                    'Run compliance assessments',
                    'Generate audit reports',
                    'Train compliance team',
                    'Document procedures'
                ]
            },
            phase4: {
                name: 'Optimization (Ongoing)',
                tasks: [
                    'Fine-tune policies',
                    'Expand coverage',
                    'Maintain compliance',
                    'Prepare for audits'
                ]
            }
        };
    },
    
    // Generate downloadable report
    downloadReport(industry, deviceCount, results) {
        const report = this.generateReport(industry, deviceCount, results);
        
        // Create HTML report
        const html = this.generateHTMLReport(report);
        
        // Create blob and download
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Portnox_Compliance_Report_${industry}_${new Date().toISOString().split('T')[0]}.html`;
        a.click();
        URL.revokeObjectURL(url);
    },
    
    generateHTMLReport(report) {
        return `
<!DOCTYPE html>
<html>
<head>
    <title>Portnox Compliance Report - ${report.metadata.industry}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            padding: 20px;
            background: #00D4AA;
            color: white;
            margin-bottom: 30px;
        }
        .section {
            margin-bottom: 30px;
            padding: 20px;
            background: #f5f5f5;
            border-radius: 8px;
        }
        h1, h2, h3 { color: #1E293B; }
        .metric {
            display: inline-block;
            margin: 10px 20px;
            padding: 10px;
            background: white;
            border-radius: 5px;
        }
        .metric-value {
            font-size: 24px;
            font-weight: bold;
            color: #00D4AA;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th { background: #334155; color: white; }
        .recommendation {
            margin: 10px 0;
            padding: 15px;
            background: white;
            border-left: 4px solid #00D4AA;
        }
        .priority-critical { border-left-color: #DC2626; }
        .priority-high { border-left-color: #F59E0B; }
        @media print {
            body { margin: 0; padding: 10px; }
            .section { break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Portnox Zero Trust NAC</h1>
        <h2>Compliance Analysis Report</h2>
        <p>${report.metadata.industry} | ${report.metadata.deviceCount} Devices | ${new Date(report.metadata.generatedAt).toLocaleDateString()}</p>
    </div>
    
    <div class="section">
        <h2>Executive Summary</h2>
        <p>${report.executiveSummary.overview}</p>
        
        <div class="metrics">
            <div class="metric">
                <div>Compliance Score</div>
                <div class="metric-value">${report.executiveSummary.criticalMetrics.projectedComplianceScore}%</div>
            </div>
            <div class="metric">
                <div>Risk Reduction</div>
                <div class="metric-value">${report.executiveSummary.criticalMetrics.riskReduction}%</div>
            </div>
            <div class="metric">
                <div>ROI</div>
                <div class="metric-value">${report.executiveSummary.criticalMetrics.roi}%</div>
            </div>
        </div>
        
        <h3>Key Findings</h3>
        <ul>
            ${report.executiveSummary.keyFindings.map(f => `<li>${f}</li>`).join('')}
        </ul>
    </div>
    
    <div class="section">
        <h2>Framework Compliance Analysis</h2>
        <table>
            <tr>
                <th>Framework</th>
                <th>Version</th>
                <th>Critical Controls</th>
                <th>Portnox Coverage</th>
                <th>Max Penalty</th>
            </tr>
            ${Object.entries(report.frameworkAnalysis).map(([key, fw]) => `
                <tr>
                    <td>${fw.name}</td>
                    <td>${fw.version || 'Current'}</td>
                    <td>${fw.criticalControls}</td>
                    <td>${fw.portnoxCoverage}%</td>
                    <td>$${fw.violationRisk?.maximum ? (fw.violationRisk.maximum/1000000).toFixed(1) + 'M' : 'Varies'}</td>
                </tr>
            `).join('')}
        </table>
    </div>
    
    <div class="section">
        <h2>Cost-Benefit Analysis</h2>
        <h3>Annual Costs Comparison</h3>
        <table>
            <tr>
                <th>Cost Category</th>
                <th>Current State</th>
                <th>With Portnox</th>
                <th>Savings</th>
            </tr>
            <tr>
                <td>Breach Risk Exposure</td>
                <td>$${(report.costBenefit.costs.currentState.annualBreachRisk/1000).toFixed(0)}K</td>
                <td>$${(report.costBenefit.costs.withPortnox.reducedBreachRisk/1000).toFixed(0)}K</td>
                <td>$${((report.costBenefit.costs.currentState.annualBreachRisk - report.costBenefit.costs.withPortnox.reducedBreachRisk)/1000).toFixed(0)}K</td>
            </tr>
            <tr>
                <td>Audit Costs</td>
                <td>$${(report.costBenefit.costs.currentState.auditCosts/1000).toFixed(0)}K</td>
                <td>$${(report.costBenefit.costs.withPortnox.reducedAuditCosts/1000).toFixed(0)}K</td>
                <td>$${((report.costBenefit.costs.currentState.auditCosts - report.costBenefit.costs.withPortnox.reducedAuditCosts)/1000).toFixed(0)}K</td>
            </tr>
            <tr>
                <td><strong>Total</strong></td>
                <td><strong>$${(report.costBenefit.costs.currentState.total/1000).toFixed(0)}K</strong></td>
                <td><strong>$${(report.costBenefit.costs.withPortnox.total/1000).toFixed(0)}K</strong></td>
                <td><strong>$${(report.costBenefit.savings.annual/1000).toFixed(0)}K</strong></td>
            </tr>
        </table>
    </div>
    
    <div class="section">
        <h2>Recommendations</h2>
        ${report.recommendations.map(rec => `
            <div class="recommendation priority-${rec.priority.toLowerCase()}">
                <h4>${rec.priority}: ${rec.recommendation}</h4>
                <p><strong>Impact:</strong> ${rec.impact}</p>
                <p><strong>Timeline:</strong> ${rec.timeline}</p>
            </div>
        `).join('')}
    </div>
    
    <div class="section">
        <h2>Implementation Plan</h2>
        ${Object.values(report.implementationPlan).map(phase => `
            <div>
                <h3>${phase.name}</h3>
                <ul>
                    ${phase.tasks.map(task => `<li>${task}</li>`).join('')}
                </ul>
            </div>
        `).join('')}
    </div>
    
    <div style="text-align: center; margin-top: 50px; color: #666;">
        <p>This report was generated by Portnox CLEAR Compliance Analysis Platform</p>
        <p>For more information, visit www.portnox.com or contact your Portnox representative</p>
    </div>
</body>
</html>
        `;
    }
};

// Add report button to compliance module
window.addEventListener('DOMContentLoaded', function() {
    const addReportButton = setInterval(() => {
        if (window.complianceModule) {
            clearInterval(addReportButton);
            
            // Add download button to the render method
            const originalRender = window.complianceModule.render;
            window.complianceModule.render = function(container, results) {
                originalRender.call(this, container, results);
                
                // Add download button
                setTimeout(() => {
                    const header = container.querySelector('.compliance-header');
                    if (header && !header.querySelector('.download-report-btn')) {
                        const btn = document.createElement('button');
                        btn.className = 'download-report-btn';
                        btn.innerHTML = '<i class="fas fa-download"></i> Download Compliance Report';
                        btn.onclick = () => {
                            window.ComplianceReportGenerator.downloadReport(
                                this.platform.config.industry,
                                this.platform.config.deviceCount,
                                results
                            );
                        };
                        header.appendChild(btn);
                    }
                }, 100);
            };
        }
    }, 100);
});

console.log('📄 Compliance report generator loaded');
EOF

# Add button styles
cat >> css/compliance-enhanced.css << 'EOF'

/* Report Download Button */
.download-report-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background: #00D4AA;
    color: #1E293B;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
}

.download-report-btn:hover {
    background: #10B981;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 212, 170, 0.4);
}

.download-report-btn i {
    font-size: 1.125rem;
}

/* Compliance Score Cards */
.compliance-score-card {
    background: linear-gradient(135deg, #334155 0%, #1E293B 100%);
    padding: 25px;
    border-radius: 12px;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.compliance-score-card::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 212, 170, 0.1) 0%, transparent 70%);
    animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.1); opacity: 0.8; }
}

.compliance-score-value {
    font-size: 3rem;
    font-weight: 700;
    color: #00D4AA;
    margin: 10px 0;
}

.compliance-score-label {
    color: #94A3B8;
    font-size: 1rem;
}

/* Industry Specific Badges */
.industry-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(59, 130, 246, 0.1);
    color: #3B82F6;
    padding: 8px 16px;
    border-radius: 24px;
    font-size: 0.875rem;
    font-weight: 500;
    border: 1px solid rgba(59, 130, 246, 0.3);
    margin: 5px;
}

.industry-badge i {
    font-size: 1rem;
}

/* Compliance Checklist */
.compliance-checklist {
    background: #334155;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
}

.checklist-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid rgba(71, 85, 105, 0.3);
}

.checklist-item:last-child {
    border-bottom: none;
}

.checklist-item i {
    color: #00D4AA;
    font-size: 1.25rem;
}

.checklist-item.incomplete i {
    color: #64748B;
}

.checklist-item .item-text {
    flex: 1;
    color: #CBD5E1;
}

.checklist-item .item-status {
    color: #00D4AA;
    font-weight: 500;
}

.checklist-item.incomplete .item-status {
    color: #F59E0B;
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .download-report-btn {
        position: static;
        margin: 20px auto;
        width: 100%;
        justify-content: center;
    }
    
    .compliance-header {
        position: relative;
        padding-bottom: 80px;
    }
}
EOF

# Add the report generator to index.html
sed -i '/<script src="\.\/js\/views\/compliance-visualizations\.js"><\/script>/a\    <script src="./js/views/compliance-report-generator.js"></script>' index.html

# Commit the report generator
git add -A
git commit -m "Added Compliance Report Generator and Enhanced Details

- Downloadable HTML compliance reports
- Comprehensive framework analysis
- Industry-specific control mappings
- Cost-benefit calculations
- Implementation roadmap
- Executive summary generation
- Framework violation costs
- Automated recommendations
- Print-friendly report format
- Industry badges and indicators"

echo "✅ Compliance module fully enhanced!"
echo ""
echo "Complete features now include:"
echo ""
echo "📊 FRAMEWORKS COVERED:"
echo "- NIST Cybersecurity Framework 2.0"
echo "- CMMC 2.0 (all levels)"
echo "- HIPAA Security Rule"
echo "- ISO/IEC 27001:2022"
echo "- PCI-DSS 4.0"
echo "- GDPR"
echo "- SOX"
echo "- NERC CIP"
echo "- FERPA"
echo "- And more..."
echo ""
echo "🏢 INDUSTRIES SUPPORTED:"
echo "- Healthcare (HIPAA, HITECH)"
echo "- Financial Services (SOX, PCI-DSS)"
echo "- Defense (CMMC, NIST 800-171)"
echo "- Retail (PCI-DSS, CCPA)"
echo "- Manufacturing (IEC 62443)"
echo "- Government (FISMA, FedRAMP)"
echo "- Education (FERPA, COPPA)"
echo "- Energy (NERC CIP)"
echo ""
echo "📈 VISUALIZATIONS:"
echo "- Framework coverage comparison"
echo "- Control satisfaction heatmaps"
echo "- Violation cost analysis"
echo "- Compliance maturity radar"
echo "- Implementation timeline"
echo "- Framework score gauges"
echo ""
echo "💰 COST ANALYSIS:"
echo "- Violation penalty calculations"
echo "- Audit cost reduction"
echo "- Breach risk mitigation"
echo "- Compliance ROI"
echo ""
echo "📄 REPORT GENERATION:"
echo "- One-click downloadable reports"
echo "- Executive summaries"
echo "- Implementation plans"
echo "- Print-friendly format"
echo ""
echo "The Compliance tab is now a comprehensive compliance management platform!"
