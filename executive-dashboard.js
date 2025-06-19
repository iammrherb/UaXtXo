// Executive Dashboard for Portnox TCO Analyzer
(function() {
    'use strict';
    
    const ExecutiveDashboard = {
        generateReport: function(companySize, industry) {
            const devices = companySize === 'enterprise' ? 10000 : 
                           companySize === 'midsize' ? 2500 : 500;
            
            // Calculate TCO for all vendors
            const vendors = ['portnox', 'cisco_ise', 'aruba_clearpass', 'forescout'];
            const tcoResults = {};
            
            vendors.forEach(v => {
                tcoResults[v] = window.VendorDatabase.calculateTCO(v, devices, 3);
            });
            
            // Calculate savings
            const portnoxTCO = tcoResults.portnox.total;
            const avgLegacyTCO = (tcoResults.cisco_ise.total + 
                                 tcoResults.aruba_clearpass.total + 
                                 tcoResults.forescout.total) / 3;
            
            const savings = avgLegacyTCO - portnoxTCO;
            const savingsPercent = (savings / avgLegacyTCO * 100).toFixed(1);
            
            return {
                summary: {
                    totalSavings: savings,
                    savingsPercent: savingsPercent,
                    roiMonths: 6,
                    deploymentTime: "< 1 day vs 3-6 months",
                    fteReduction: 2.0
                },
                keyMetrics: {
                    operationalEfficiency: {
                        automation: "95% vs 40% industry average",
                        ticketReduction: "87% reduction in IT tickets",
                        mttr: "5 min vs 2 hours"
                    },
                    security: {
                        visibilityImprovement: "100% device visibility",
                        complianceAutomation: "156 automated controls",
                        riskReduction: "92% reduction in unauthorized access"
                    },
                    business: {
                        productivityGain: "$" + (devices * 125).toLocaleString(),
                        downtimeReduction: "99.9% uptime vs 95%",
                        cyberInsuranceSavings: "15-20% premium reduction"
                    }
                },
                competitiveAdvantages: {
                    "Cloud-Native Architecture": "No hardware, instant scaling",
                    "Zero Trust Ready": "Continuous verification built-in",
                    "Agentless Deployment": "No endpoint software required",
                    "AI-Powered Automation": "Self-healing network access",
                    "Unified Platform": "NAC + ZTNA + Risk in one solution"
                },
                industrySpecific: this.getIndustryBenefits(industry),
                recommendations: [
                    "Immediate POC recommended - 30 min deployment",
                    "Phase out legacy NAC over 6-12 months",
                    "Leverage automation for 90% reduction in manual tasks",
                    "Integrate with existing security stack via APIs"
                ]
            };
        },
        
        getIndustryBenefits: function(industry) {
            const benefits = {
                healthcare: {
                    compliance: "HIPAA-ready with automated controls",
                    iotSupport: "Medical device profiling and segmentation",
                    patientSafety: "Zero downtime for critical systems"
                },
                finance: {
                    compliance: "PCI-DSS Level 1 ready",
                    fraudPrevention: "Real-time anomaly detection",
                    auditTrail: "Complete forensic capabilities"
                },
                manufacturing: {
                    otSecurity: "IT/OT convergence support",
                    scalability: "Support for 100k+ devices",
                    uptime: "No production interruption"
                },
                retail: {
                    posProtection: "POS system isolation",
                    guestAccess: "Secure customer WiFi",
                    multiSite: "Centralized multi-location management"
                },
                education: {
                    byod: "Student device onboarding",
                    chromebook: "Full ChromeOS support",
                    budgetFriendly: "80% cost reduction"
                }
            };
            
            return benefits[industry] || benefits.finance;
        }
    };
    
    if (window.ModuleLoader && window.ModuleLoader.register) {
        window.ModuleLoader.register('ExecutiveDashboard', () => ExecutiveDashboard);
    }
    
    window.ExecutiveDashboard = ExecutiveDashboard;
})();
