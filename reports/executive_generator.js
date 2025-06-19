// Executive Report Generator with Visualizations
class ExecutiveReportGenerator {
    constructor() {
        this.calculator = new AdvancedTCOCalculator();
    }

    generateComprehensiveReport(vendors, selectedVendors, deviceCount, years) {
        const report = {
            metadata: {
                title: "Network Access Control - Executive Decision Report",
                subtitle: "Comprehensive TCO, Risk & Compliance Analysis",
                generated: new Date().toISOString(),
                preparedFor: "Executive Leadership Team",
                deviceCount: deviceCount,
                analysisperiod: years + " years"
            },
            executiveSummary: this.generateExecutiveSummary(vendors, selectedVendors, deviceCount, years),
            financialAnalysis: this.generateFinancialAnalysis(vendors, selectedVendors, deviceCount, years),
            riskAssessment: this.generateRiskAssessment(vendors, selectedVendors),
            complianceReadiness: this.generateComplianceAnalysis(vendors, selectedVendors),
            operationalImpact: this.generateOperationalAnalysis(vendors, selectedVendors),
            recommendations: this.generateRecommendations(vendors, selectedVendors),
            nextSteps: this.generateNextSteps(),
            appendix: this.generateAppendix(vendors, selectedVendors)
        };
        
        return report;
    }

    generateExecutiveSummary(vendors, selectedVendors, deviceCount, years) {
        const portnox = vendors.portnox;
        const portnoxMetrics = this.calculator.generateExecutiveMetrics(portnox, deviceCount, years);
        
        return {
            keyFindings: [
                {
                    finding: "Portnox delivers immediate and substantial cost savings",
                    detail: `${portnoxMetrics.headline_savings} savings over ${years} years with ${portnoxMetrics.roi_percentage} ROI`,
                    impact: "HIGH",
                    urgency: "IMMEDIATE"
                },
                {
                    finding: "Security posture improvement is dramatic",
                    detail: `${portnoxMetrics.risk_reduction} reduction in security incidents with real-time threat detection`,
                    impact: "CRITICAL",
                    urgency: "HIGH"
                },
                {
                    finding: "Compliance automation eliminates manual processes",
                    detail: `${portnoxMetrics.compliance_score} automated compliance across all major frameworks`,
                    impact: "HIGH",
                    urgency: "MEDIUM"
                },
                {
                    finding: "Deployment is 85% faster than alternatives",
                    detail: `${portnoxMetrics.deployment_time} to full production vs 30+ days for competitors`,
                    impact: "MEDIUM",
                    urgency: "LOW"
                }
            ],
            recommendation: {
                primary: "Proceed with Portnox Cloud NAC implementation",
                rationale: portnoxMetrics.key_message,
                timeline: "Begin proof of concept within 30 days",
                budget_impact: `Net positive cash flow within ${portnoxMetrics.payback_period}`
            },
            riskOfInaction: {
                financial: `${(deviceCount * 1000).toFixed(0)} annual exposure to preventable incidents`,
                security: "Continued vulnerability to ransomware and insider threats",
                compliance: "Increasing regulatory scrutiny and potential fines",
                competitive: "Falling behind industry security standards"
            }
        };
    }

    generateFinancialAnalysis(vendors, selectedVendors, deviceCount, years) {
        const analysis = {
            tcoComparison: {},
            savingsAnalysis: {},
            roiProjections: {},
            breakEvenAnalysis: {}
        };
        
        selectedVendors.forEach(vendorKey => {
            const vendor = vendors[vendorKey];
            const tco = this.calculator.calculateComprehensiveTCO(vendor, deviceCount, years);
            
            analysis.tcoComparison[vendor.name] = {
                baseTCO: tco.baseTCO.total,
                riskAdjustedTCO: tco.totalTCO,
                hiddenCosts: tco.opportunityCosts.total,
                totalSavingsVsIndustry: tco.savings.totalSavings
            };
            
            analysis.roiProjections[vendor.name] = {
                roi: tco.roi.percentage,
                paybackMonths: tco.roi.paybackMonths,
                npv: this.calculateNPV(tco.savings.annualSavings, years, 0.08)
            };
        });
        
        return analysis;
    }

    generateRiskAssessment(vendors, selectedVendors) {
        const assessment = {
            threatMitigation: {},
            incidentPrevention: {},
            businessContinuity: {},
            overallRiskScore: {}
        };
        
        selectedVendors.forEach(vendorKey => {
            const vendor = vendors[vendorKey];
            const riskScore = this.calculator.calculateRiskScore(vendor);
            
            assessment.overallRiskScore[vendor.name] = {
                score: riskScore,
                rating: riskScore > 90 ? "EXCELLENT" : riskScore > 80 ? "GOOD" : riskScore > 70 ? "FAIR" : "POOR",
                keyStrengths: this.identifyStrengths(vendor.risk_profile),
                gaps: this.identifyGaps(vendor.risk_profile)
            };
        });
        
        return assessment;
    }

    generateComplianceAnalysis(vendors, selectedVendors) {
        const analysis = {
            frameworkCoverage: {},
            automationLevel: {},
            auditReadiness: {},
            violationRisk: {}
        };
        
        selectedVendors.forEach(vendorKey => {
            const vendor = vendors[vendorKey];
            const complianceScore = this.calculator.calculateComplianceScore(vendor);
            
            analysis.frameworkCoverage[vendor.name] = {
                score: complianceScore,
                frameworks: vendor.compliance_coverage.frameworks,
                automationLevel: vendor.risk_profile.compliance_automation + "%",
                gaps: this.identifyComplianceGaps(vendor.compliance_coverage)
            };
        });
        
        return analysis;
    }

    generateOperationalAnalysis(vendors, selectedVendors) {
        return {
            deploymentComplexity: this.assessDeploymentComplexity(vendors, selectedVendors),
            staffingRequirements: this.assessStaffingNeeds(vendors, selectedVendors),
            scalability: this.assessScalability(vendors, selectedVendors),
            integration: this.assessIntegrationCapabilities(vendors, selectedVendors)
        };
    }

    generateRecommendations(vendors, selectedVendors) {
        return [
            {
                priority: 1,
                recommendation: "Implement Portnox Cloud NAC as primary security control",
                justification: "Lowest TCO, highest security effectiveness, fastest deployment",
                timeline: "Q1 2025",
                owner: "CISO",
                dependencies: ["Azure AD integration", "Network assessment"]
            },
            {
                priority: 2,
                recommendation: "Develop Zero Trust migration roadmap",
                justification: "Align with industry best practices and regulatory requirements",
                timeline: "Q1-Q2 2025",
                owner: "Security Architecture Team",
                dependencies: ["Portnox deployment", "Policy framework"]
            },
            {
                priority: 3,
                recommendation: "Consolidate identity providers",
                justification: "Simplify access management and improve security posture",
                timeline: "Q2 2025",
                owner: "Identity Team",
                dependencies: ["Vendor assessment", "Migration planning"]
            }
        ];
    }

    generateNextSteps() {
        return [
            {
                step: 1,
                action: "Schedule executive briefing with Portnox",
                timeline: "Within 1 week",
                participants: ["CISO", "CTO", "CFO"],
                outcome: "Alignment on approach and timeline"
            },
            {
                step: 2,
                action: "Conduct technical proof of concept",
                timeline: "Weeks 2-5",
                participants: ["Security team", "Network team", "Portnox engineers"],
                outcome: "Validate capabilities and integration"
            },
            {
                step: 3,
                action: "Develop implementation plan",
                timeline: "Week 6",
                participants: ["Project team", "Stakeholders"],
                outcome: "Detailed project plan with milestones"
            },
            {
                step: 4,
                action: "Secure budget approval",
                timeline: "Week 7",
                participants: ["CFO", "Finance team"],
                outcome: "Approved budget and procurement"
            },
            {
                step: 5,
                action: "Begin phased deployment",
                timeline: "Week 8+",
                participants: ["Implementation team"],
                outcome: "Production deployment"
            }
        ];
    }

    generateAppendix(vendors, selectedVendors) {
        return {
            methodology: "TCO analysis based on 500-device baseline with linear scaling",
            assumptions: [
                "Current market pricing as of 2024",
                "Standard enterprise deployment scenarios",
                "Industry average incident and breach costs",
                "3-year analysis period with 5-year projections"
            ],
            glossary: {
                TCO: "Total Cost of Ownership",
                ROI: "Return on Investment",
                NAC: "Network Access Control",
                ZTNA: "Zero Trust Network Access",
                MTTR: "Mean Time to Respond",
                MTTD: "Mean Time to Detect"
            },
            dataSources: [
                "Gartner NAC Market Guide 2024",
                "Ponemon Cost of Data Breach Report 2024",
                "Vendor published pricing",
                "Industry security benchmarks"
            ]
        };
    }

    // Helper methods
    calculateNPV(annualCashFlow, years, discountRate) {
        let npv = 0;
        for (let i = 1; i <= years; i++) {
            npv += annualCashFlow / Math.pow(1 + discountRate, i);
        }
        return Math.round(npv);
    }

    identifyStrengths(riskProfile) {
        const strengths = [];
        Object.entries(riskProfile).forEach(([key, value]) => {
            if (typeof value === 'number' && value > 90) {
                strengths.push(key.replace(/_/g, ' '));
            }
        });
        return strengths;
    }

    identifyGaps(riskProfile) {
        const gaps = [];
        Object.entries(riskProfile).forEach(([key, value]) => {
            if (typeof value === 'number' && value < 80) {
                gaps.push(key.replace(/_/g, ' '));
            }
        });
        return gaps;
    }

    identifyComplianceGaps(compliance) {
        const gaps = [];
        Object.entries(compliance.frameworks).forEach(([framework, coverage]) => {
            if (coverage.coverage < 90) {
                gaps.push(`${framework}: ${coverage.coverage}% coverage`);
            }
        });
        return gaps;
    }

    assessDeploymentComplexity(vendors, selectedVendors) {
        const assessment = {};
        selectedVendors.forEach(vendorKey => {
            const vendor = vendors[vendorKey];
            assessment[vendor.name] = {
                complexity: vendor.baseline_500_devices.implementation.duration_days > 10 ? "HIGH" : "LOW",
                duration: vendor.baseline_500_devices.implementation.duration_days + " days",
                remoteCapable: vendor.baseline_500_devices.implementation.remote_deployment || false
            };
        });
        return assessment;
    }

    assessStaffingNeeds(vendors, selectedVendors) {
        const assessment = {};
        selectedVendors.forEach(vendorKey => {
            const vendor = vendors[vendorKey];
            assessment[vendor.name] = {
                deployment: vendor.baseline_500_devices.fte_requirements.initial_deployment,
                ongoing: vendor.baseline_500_devices.fte_requirements.ongoing_management,
                annualCost: vendor.baseline_500_devices.fte_requirements.annual_cost
            };
        });
        return assessment;
    }

    assessScalability(vendors, selectedVendors) {
        const assessment = {};
        selectedVendors.forEach(vendorKey => {
            const vendor = vendors[vendorKey];
            assessment[vendor.name] = {
                maxDevices: vendor.type.includes('Cloud') ? "Unlimited" : "10,000",
                scalingModel: vendor.type.includes('Cloud') ? "Linear" : "Step function",
                globalAvailability: vendor.advanced_features?.global_availability || false
            };
        });
        return assessment;
    }

    assessIntegrationCapabilities(vendors, selectedVendors) {
        const assessment = {};
        selectedVendors.forEach(vendorKey => {
            const vendor = vendors[vendorKey];
            assessment[vendor.name] = {
                identityProviders: vendor.organizations_supported?.length || 0,
                apiAvailable: vendor.advanced_features?.api_driven || false,
                cloudNative: vendor.advanced_features?.cloud_native || false
            };
        });
        return assessment;
    }

    exportToHTML(report) {
        // Generate beautiful HTML report
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${report.metadata.title}</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 1200px; margin: 0 auto; padding: 20px; }
                    h1, h2, h3 { color: #0046AD; }
                    .summary { background: #f0f5ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
                    .metric { display: inline-block; margin: 10px 20px; }
                    .metric-value { font-size: 32px; font-weight: bold; color: #0046AD; }
                    .metric-label { font-size: 14px; color: #666; }
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
                    th { background: #0046AD; color: white; }
                    .recommendation { background: #e8f5e9; padding: 15px; border-left: 4px solid #4caf50; margin: 20px 0; }
                    .risk { background: #ffebee; padding: 15px; border-left: 4px solid #f44336; margin: 20px 0; }
                </style>
            </head>
            <body>
                <h1>${report.metadata.title}</h1>
                <h2>${report.metadata.subtitle}</h2>
                <p>Generated: ${new Date(report.metadata.generated).toLocaleString()}</p>
                
                <div class="summary">
                    <h2>Executive Summary</h2>
                    ${this.renderExecutiveSummary(report.executiveSummary)}
                </div>
                
                <h2>Financial Analysis</h2>
                ${this.renderFinancialAnalysis(report.financialAnalysis)}
                
                <h2>Risk Assessment</h2>
                ${this.renderRiskAssessment(report.riskAssessment)}
                
                <h2>Recommendations</h2>
                ${this.renderRecommendations(report.recommendations)}
                
                <h2>Next Steps</h2>
                ${this.renderNextSteps(report.nextSteps)}
            </body>
            </html>
        `;
        
        return html;
    }

    renderExecutiveSummary(summary) {
        let html = '<div class="key-findings">';
        summary.keyFindings.forEach(finding => {
            html += `
                <div class="finding">
                    <h3>${finding.finding}</h3>
                    <p>${finding.detail}</p>
                    <span class="impact">Impact: ${finding.impact}</span>
                    <span class="urgency">Urgency: ${finding.urgency}</span>
                </div>
            `;
        });
        html += '</div>';
        
        html += `
            <div class="recommendation">
                <h3>Primary Recommendation</h3>
                <p><strong>${summary.recommendation.primary}</strong></p>
                <p>${summary.recommendation.rationale}</p>
                <p>Timeline: ${summary.recommendation.timeline}</p>
                <p>Budget Impact: ${summary.recommendation.budget_impact}</p>
            </div>
        `;
        
        return html;
    }

    renderFinancialAnalysis(analysis) {
        let html = '<table>';
        html += '<tr><th>Vendor</th><th>3-Year TCO</th><th>Risk-Adjusted TCO</th><th>ROI</th><th>Payback</th></tr>';
        
        Object.entries(analysis.tcoComparison).forEach(([vendor, data]) => {
            const roi = analysis.roiProjections[vendor];
            html += `
                <tr>
                    <td>${vendor}</td>
                    <td>${(data.baseTCO / 1000).toFixed(0)}K</td>
                    <td>${(data.riskAdjustedTCO / 1000).toFixed(0)}K</td>
                    <td>${roi.roi.toFixed(0)}%</td>
                    <td>${roi.paybackMonths} months</td>
                </tr>
            `;
        });
        
        html += '</table>';
        return html;
    }

    renderRiskAssessment(assessment) {
        let html = '<div class="risk-scores">';
        
        Object.entries(assessment.overallRiskScore).forEach(([vendor, data]) => {
            html += `
                <div class="vendor-risk">
                    <h3>${vendor}</h3>
                    <div class="metric">
                        <div class="metric-value">${data.score}</div>
                        <div class="metric-label">Risk Score</div>
                    </div>
                    <p>Rating: <strong>${data.rating}</strong></p>
                    <p>Strengths: ${data.keyStrengths.join(', ')}</p>
                    ${data.gaps.length > 0 ? `<p>Gaps: ${data.gaps.join(', ')}</p>` : ''}
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }

    renderRecommendations(recommendations) {
        let html = '<ol>';
        
        recommendations.forEach(rec => {
            html += `
                <li>
                    <strong>${rec.recommendation}</strong>
                    <p>${rec.justification}</p>
                    <p>Timeline: ${rec.timeline} | Owner: ${rec.owner}</p>
                </li>
            `;
        });
        
        html += '</ol>';
        return html;
    }

    renderNextSteps(steps) {
        let html = '<table>';
        html += '<tr><th>Step</th><th>Action</th><th>Timeline</th><th>Participants</th><th>Expected Outcome</th></tr>';
        
        steps.forEach(step => {
            html += `
                <tr>
                    <td>${step.step}</td>
                    <td>${step.action}</td>
                    <td>${step.timeline}</td>
                    <td>${step.participants.join(', ')}</td>
                    <td>${step.outcome}</td>
                </tr>
            `;
        });
        
        html += '</table>';
        return html;
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ExecutiveReportGenerator;
}
