// Complete Industry Compliance Module
const CompleteIndustryCompliance = {
    industries: {
        healthcare: {
            name: "Healthcare",
            frameworks: ["HIPAA", "HITECH", "FDA", "ISO13485"],
            requirements: {
                accessControl: "Critical",
                auditLogging: "Critical",
                encryption: "Critical",
                dataIntegrity: "Critical",
                disasterRecovery: "High"
            },
            nacBenefits: {
                portnox: {
                    complianceScore: 98,
                    automationLevel: 95,
                    auditReadiness: 100
                },
                legacy: {
                    complianceScore: 75,
                    automationLevel: 40,
                    auditReadiness: 60
                }
            }
        },
        finance: {
            name: "Financial Services",
            frameworks: ["PCI-DSS", "SOX", "GLBA", "Basel III"],
            requirements: {
                networkSegmentation: "Critical",
                strongAuthentication: "Critical",
                continuousMonitoring: "Critical",
                incidentResponse: "Critical",
                vendorManagement: "High"
            },
            nacBenefits: {
                portnox: {
                    complianceScore: 99,
                    automationLevel: 92,
                    auditReadiness: 98
                },
                legacy: {
                    complianceScore: 80,
                    automationLevel: 45,
                    auditReadiness: 70
                }
            }
        },
        retail: {
            name: "Retail",
            frameworks: ["PCI-DSS", "CCPA", "GDPR"],
            requirements: {
                paymentSecurity: "Critical",
                customerDataProtection: "Critical",
                accessManagement: "High",
                networkSegmentation: "High"
            }
        },
        manufacturing: {
            name: "Manufacturing",
            frameworks: ["ISO27001", "NIST", "IEC62443"],
            requirements: {
                otSecurity: "Critical",
                supplychainSecurity: "High",
                intellectualPropertyProtection: "Critical"
            }
        },
        education: {
            name: "Education",
            frameworks: ["FERPA", "COPPA", "CIPA"],
            requirements: {
                studentDataProtection: "Critical",
                accessControl: "High",
                networkFiltering: "Medium"
            }
        },
        government: {
            name: "Government",
            frameworks: ["FedRAMP", "FISMA", "NIST800-53"],
            requirements: {
                clearanceLevels: "Critical",
                continuousMonitoring: "Critical",
                incidentResponse: "Critical",
                supplyChainSecurity: "Critical"
            }
        }
    },
    
    getIndustryRequirements(industry) {
        return this.industries[industry] || this.industries.healthcare;
    },
    
    calculateComplianceImpact(industry, vendor) {
        const industryData = this.industries[industry];
        if (!industryData) return null;
        
        const isPortnox = vendor === 'portnox';
        const benefits = isPortnox ? 
            industryData.nacBenefits?.portnox : 
            industryData.nacBenefits?.legacy;
            
        return {
            complianceImprovement: benefits?.complianceScore || 0,
            automationSavings: (benefits?.automationLevel || 0) * 1000,
            auditCostReduction: (100 - (benefits?.auditReadiness || 0)) * 500,
            totalBenefit: 0 // Will be calculated
        };
    }
};

// Register with ModuleLoader
if (window.ModuleLoader) {
    window.ModuleLoader.register('CompleteIndustryCompliance', CompleteIndustryCompliance);
}

window.CompleteIndustryCompliance = CompleteIndustryCompliance;
console.log('✅ Complete Industry Compliance module loaded');
