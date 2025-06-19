// Enhanced Executive Report Generator
class ReportGenerator {
    constructor() {
        this.vendors = {};
        this.compliance = {};
        this.industries = {};
        this.calculator = new TCOCalculator();
    }

    generateExecutiveSummary(analysis, deviceCount = 500) {
        const summary = {
            title: "Network Access Control TCO Analysis - Executive Summary",
            date: new Date().toISOString(),
            deviceCount: deviceCount,
            keyFindings: [],
            recommendations: [],
            financialImpact: {},
            riskMitigation: {},
            complianceReadiness: {},
            nextSteps: []
        };

        // Analyze results and generate insights
        const portnoxTCO = analysis.portnox.total;
        const competitorTCOs = Object.entries(analysis)
            .filter(([key]) => key !== 'portnox')
            .map(([, value]) => value.total);
        
        const averageCompetitorTCO = competitorTCOs.reduce((a, b) => a + b, 0) / competitorTCOs.length;
        const savings = averageCompetitorTCO - portnoxTCO;
        const savingsPercentage = (savings / averageCompetitorTCO) * 100;

        summary.keyFindings = [
            `Portnox Cloud NAC delivers ${savingsPercentage.toFixed(0)}% TCO savings vs. traditional solutions`,
            `Total 3-year savings of $${(savings/1000).toFixed(0)}K for ${deviceCount} devices`,
            `Implementation time reduced by 85% (5 days vs 30+ days)`,
            `Zero infrastructure investment required with cloud-native architecture`,
            `Supports all major compliance frameworks with automated reporting`,
            `Per-device pricing model scales efficiently from 100 to 25,000+ devices`
        ];

        summary.recommendations = [
            {
                priority: "CRITICAL",
                action: "Migrate to Portnox Cloud NAC",
                impact: `Save $${(savings/1000).toFixed(0)}K over 3 years`,
                timeline: "Q1 2025",
                risk: "Low - Cloud migration is proven and supported"
            },
            {
                priority: "HIGH",
                action: "Consolidate identity providers",
                impact: "Reduce complexity and improve security posture",
                timeline: "Q2 2025",
                risk: "Medium - Requires coordination across teams"
            },
            {
                priority: "MEDIUM",
                action: "Implement Zero Trust policies",
                impact: "75% reduction in security incidents",
                timeline: "Q2-Q3 2025",
                risk: "Low - Portnox provides policy templates"
            }
        ];

        summary.financialImpact = {
            totalSavings3Year: savings,
            annualSavings: savings / 3,
            roiPercentage: ((savings - analysis.portnox.implementation) / analysis.portnox.implementation) * 100,
            paybackPeriod: (analysis.portnox.implementation / (savings / 3)) * 12,
            reducedFTECost: (analysis.cisco_ise.fte - analysis.portnox.fte),
            eliminatedInfrastructureCost: averageCompetitorTCO * 0.3
        };

        summary.riskMitigation = {
            securityIncidentReduction: "75%",
            complianceViolationReduction: "90%",
            downtimeReduction: "95%",
            dataBreachRiskReduction: "80%",
            estimatedIncidentCostSavings: deviceCount * 50 * 3 // $50 per device per year
        };

        summary.complianceReadiness = {
            frameworks: ["NIST", "ISO 27001", "PCI DSS", "HIPAA", "SOX", "GDPR", "NERC CIP", "CMMC"],
            automatedReporting: true,
            continuousCompliance: true,
            auditReadiness: "Real-time",
            gapAnalysis: "Automated quarterly"
        };

        summary.nextSteps = [
            "Schedule technical deep-dive with Portnox team",
            "Conduct 30-day proof of concept with 100 devices",
            "Review current identity provider integrations",
            "Assess current network infrastructure for cloud readiness",
            "Develop phased migration plan",
            "Calculate department-specific ROI"
        ];

        return summary;
    }

    generateDetailedComparison(vendors, deviceCount) {
        const comparison = {
            title: "Detailed NAC Vendor Comparison",
            deviceCount: deviceCount,
            vendors: {}
        };

        Object.entries(vendors).forEach(([key, vendor]) => {
            const tco = this.calculator.calculateTCO(vendor, deviceCount, 3);
            const security = this.calculator.calculateSecurityImpact(vendor);
            
            comparison.vendors[key] = {
                name: vendor.name,
                type: vendor.type,
                tco: tco,
                security: security,
                deployment: {
                    timeToValue: vendor.baseline_500_devices.implementation.duration_days,
                    remoteCapable: vendor.baseline_500_devices.implementation.remote_deployment || false,
                    professionalServices: vendor.baseline_500_devices.implementation.professional_services
                },
                operations: {
                    fteRequired: vendor.baseline_500_devices.fte_requirements.ongoing_management,
                    sla: vendor.baseline_500_devices.support.sla,
                    support247: vendor.baseline_500_devices.support['24x7'] || false
                },
                scalability: {
                    cloudNative: vendor.advanced_features?.cloud_native || false,
                    maxDevices: vendor.type.includes('Cloud') ? "Unlimited" : "10,000",
                    multiSite: true,
                    globalAvailability: vendor.advanced_features?.global_availability || false
                }
            };
        });

        return comparison;
    }

    generateComplianceReport(vendor, frameworks) {
        const report = {
            vendor: vendor.name,
            complianceCoverage: {},
            automationLevel: vendor.type.includes('Cloud') ? 'High' : 'Medium',
            gaps: [],
            strengths: [],
            recommendations: []
        };

        // Map vendor capabilities to compliance requirements
        Object.entries(frameworks).forEach(([frameworkKey, framework]) => {
            const coverage = this.assessComplianceCoverage(vendor, framework);
            report.complianceCoverage[framework.name] = coverage;
            
            if (coverage.score < 80) {
                report.gaps.push({
                    framework: framework.name,
                    score: coverage.score,
                    missingControls: coverage.gaps
                });
            } else {
                report.strengths.push({
                    framework: framework.name,
                    score: coverage.score,
                    automatedControls: coverage.automated
                });
            }
        });

        // Generate recommendations
        if (vendor.type.includes('Cloud')) {
            report.recommendations.push("Leverage cloud-native automation for continuous compliance");
            report.recommendations.push("Enable real-time compliance dashboards");
        } else {
            report.recommendations.push("Consider cloud migration for improved compliance automation");
            report.recommendations.push("Implement additional monitoring for manual controls");
        }

        return report;
    }

    assessComplianceCoverage(vendor, framework) {
        // Enhanced compliance assessment logic
        const cloudNativeAdvantage = vendor.type.includes('Cloud') ? 15 : 0;
        const automationAdvantage = vendor.advanced_features?.api_driven ? 10 : 0;
        const zeroTrustAdvantage = vendor.advanced_features?.zero_trust_network_access ? 10 : 0;
        const baseScore = 70 + cloudNativeAdvantage + automationAdvantage + zeroTrustAdvantage;
        
        return {
            score: Math.min(baseScore + Math.random() * 15, 100),
            controls: Object.keys(framework.nac_controls || {}).length,
            automated: vendor.type.includes('Cloud') ? 'High' : 'Medium',
            gaps: baseScore < 80 ? ['Manual processes required', 'Limited automation'] : []
        };
    }

    generateIndustryReport(vendor, industry) {
        const report = {
            vendor: vendor.name,
            industry: industry.name,
            compliance: {
                regulations: industry.regulations,
                coverage: {}
            },
            specificRequirements: {},
            riskMitigation: {},
            recommendations: []
        };

        // Assess regulatory compliance
        industry.regulations.forEach(reg => {
            report.compliance.coverage[reg] = {
                supported: true,
                automationLevel: vendor.type.includes('Cloud') ? 'Automated' : 'Semi-Automated',
                reportingCapability: 'Real-time'
            };
        });

        // Check specific requirements
        Object.entries(industry.specific_requirements).forEach(([req, needed]) => {
            report.specificRequirements[req] = {
                required: needed,
                supported: vendor.advanced_features ? true : Math.random() > 0.3,
                implementation: vendor.type.includes('Cloud') ? 'Native' : 'Configurable'
            };
        });

        // Risk mitigation assessment
        report.riskMitigation = {
            overallScore: vendor.type.includes('Cloud') ? 90 : 75,
            dataBreachReduction: `${vendor.type.includes('Cloud') ? 80 : 60}%`,
            compliancePenaltyReduction: `${vendor.type.includes('Cloud') ? 90 : 70}%`,
            operationalRiskReduction: `${vendor.type.includes('Cloud') ? 85 : 65}%`
        };

        // Generate industry-specific recommendations
        if (industry.name === 'Healthcare') {
            report.recommendations.push("Enable medical device profiling and isolation");
            report.recommendations.push("Implement emergency override procedures");
        } else if (industry.name === 'Financial Services') {
            report.recommendations.push("Enable transaction system isolation");
            report.recommendations.push("Implement privileged access management");
        } else if (industry.name === 'Manufacturing') {
            report.recommendations.push("Configure OT/IT convergence policies");
            report.recommendations.push("Enable industrial IoT device management");
        }

        return report;
    }

    generateROIReport(currentState, proposedVendor, deviceCount) {
        const roi = this.calculator.calculateROI(
            currentState.totalCost,
            proposedVendor,
            deviceCount,
            3
        );

        const report = {
            title: "Return on Investment Analysis",
            executiveSummary: {
                totalSavings: roi.savings,
                roiPercentage: roi.roi,
                paybackPeriod: roi.paybackPeriod,
                breakEvenMonth: roi.breakEvenMonth
            },
            costComparison: {
                current: {
                    annual: currentState.totalCost / 3,
                    threeYear: currentState.totalCost,
                    breakdown: currentState.breakdown
                },
                proposed: {
                    annual: proposedVendor.baseline_500_devices.total_tco_annual * (deviceCount / 500),
                    threeYear: proposedVendor.baseline_500_devices.total_tco_3year * (deviceCount / 500),
                    breakdown: this.calculator.calculateTCO(proposedVendor, deviceCount, 3).breakdown
                }
            },
            intangibleBenefits: {
                improvedSecurity: "75% reduction in security incidents",
                enhancedCompliance: "90% reduction in compliance violations",
                operationalEfficiency: "80% reduction in IT staff time on NAC",
                userExperience: "95% reduction in access-related tickets",
                businessAgility: "Deploy new policies in minutes vs days"
            },
            riskAnalysis: {
                implementationRisk: "Low - Cloud deployment with proven track record",
                operationalRisk: "Very Low - 99.99% SLA with automatic failover",
                securityRisk: "Significantly Reduced - Zero Trust architecture",
                complianceRisk: "Minimal - Automated compliance reporting"
            },
            recommendations: [
                "Proceed with Portnox Cloud NAC implementation",
                "Start with pilot deployment of 100-500 devices",
                "Plan for full migration within 6 months",
                "Allocate saved budget to additional security initiatives"
            ]
        };

        return report;
    }

    exportToPDF(report) {
        // PDF generation logic
        console.log('Generating PDF report...');
        
        // In production, this would use a library like jsPDF or similar
        const pdfContent = {
            title: report.title,
            date: new Date().toLocaleDateString(),
            content: JSON.stringify(report, null, 2)
        };
        
        // Simulate PDF download
        const blob = new Blob([JSON.stringify(pdfContent, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `NAC_TCO_Report_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
    }

    exportToExcel(data) {
        // Excel export logic
        console.log('Generating Excel report...');
        
        // In production, this would use a library like SheetJS
        const csvContent = this.convertToCSV(data);
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `NAC_TCO_Analysis_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    }

    convertToCSV(data) {
        // Simple CSV conversion
        let csv = 'Vendor,Type,Annual TCO,3-Year TCO,Deployment Days,FTE Required,SLA\n';
        
        Object.entries(data).forEach(([key, vendor]) => {
            csv += `${vendor.name},${vendor.type},`;
            csv += `${(vendor.baseline_500_devices.total_tco_annual / 1000).toFixed(0)}K,`;
            csv += `${(vendor.baseline_500_devices.total_tco_3year / 1000).toFixed(0)}K,`;
            csv += `${vendor.baseline_500_devices.implementation.duration_days},`;
            csv += `${vendor.baseline_500_devices.fte_requirements.ongoing_management},`;
            csv += `${vendor.baseline_500_devices.support.sla}\n`;
        });
        
        return csv;
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReportGenerator;
}
