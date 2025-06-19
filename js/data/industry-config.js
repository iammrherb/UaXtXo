/**
 * Industry-specific configurations and requirements
 */
ModuleLoader.register('IndustryConfig', [], function() {
    const industries = {
        financial: {
            name: "Financial Services",
            icon: "fa-university",
            requirements: {
                compliance: ["PCI DSS", "SOX", "GLBA", "ISO 27001"],
                security: {
                    mfaRequired: true,
                    encryptionLevel: "FIPS 140-2",
                    auditFrequency: "continuous"
                },
                availability: 99.99,
                dataRetention: 7 // years
            },
            riskProfile: "high",
            typicalSize: {
                devices: 5000,
                users: 3000,
                locations: 10
            }
        },
        
        healthcare: {
            name: "Healthcare",
            icon: "fa-hospital",
            requirements: {
                compliance: ["HIPAA", "HITRUST", "ISO 27001"],
                security: {
                    mfaRequired: true,
                    encryptionLevel: "AES-256",
                    auditFrequency: "quarterly"
                },
                availability: 99.99,
                dataRetention: 7
            },
            riskProfile: "high",
            typicalSize: {
                devices: 3000,
                users: 2000,
                locations: 5
            }
        },
        
        government: {
            name: "Government",
            icon: "fa-landmark",
            requirements: {
                compliance: ["FedRAMP", "NIST 800-53", "CMMC"],
                security: {
                    mfaRequired: true,
                    encryptionLevel: "FIPS 140-2",
                    auditFrequency: "continuous"
                },
                availability: 99.99,
                dataRetention: 10
            },
            riskProfile: "critical",
            typicalSize: {
                devices: 10000,
                users: 8000,
                locations: 20
            }
        },
        
        education: {
            name: "Education",
            icon: "fa-graduation-cap",
            requirements: {
                compliance: ["FERPA", "COPPA", "ISO 27001"],
                security: {
                    mfaRequired: false,
                    encryptionLevel: "AES-256",
                    auditFrequency: "annual"
                },
                availability: 99.9,
                dataRetention: 5
            },
            riskProfile: "medium",
            typicalSize: {
                devices: 5000,
                users: 10000,
                locations: 3
            }
        },
        
        retail: {
            name: "Retail",
            icon: "fa-shopping-cart",
            requirements: {
                compliance: ["PCI DSS", "GDPR", "CCPA"],
                security: {
                    mfaRequired: true,
                    encryptionLevel: "AES-256",
                    auditFrequency: "quarterly"
                },
                availability: 99.9,
                dataRetention: 3
            },
            riskProfile: "high",
            typicalSize: {
                devices: 2000,
                users: 1000,
                locations: 25
            }
        },
        
        manufacturing: {
            name: "Manufacturing",
            icon: "fa-industry",
            requirements: {
                compliance: ["ISO 27001", "NIST"],
                security: {
                    mfaRequired: false,
                    encryptionLevel: "AES-256",
                    auditFrequency: "annual"
                },
                availability: 99.5,
                dataRetention: 3
            },
            riskProfile: "medium",
            typicalSize: {
                devices: 3000,
                users: 1500,
                locations: 8
            }
        },
        
        technology: {
            name: "Technology",
            icon: "fa-microchip",
            requirements: {
                compliance: ["SOC 2", "ISO 27001", "GDPR"],
                security: {
                    mfaRequired: true,
                    encryptionLevel: "AES-256",
                    auditFrequency: "continuous"
                },
                availability: 99.99,
                dataRetention: 5
            },
            riskProfile: "high",
            typicalSize: {
                devices: 2500,
                users: 1500,
                locations: 5
            }
        },
        
        energy: {
            name: "Energy & Utilities",
            icon: "fa-bolt",
            requirements: {
                compliance: ["NERC CIP", "ISO 27001"],
                security: {
                    mfaRequired: true,
                    encryptionLevel: "AES-256",
                    auditFrequency: "continuous"
                },
                availability: 99.99,
                dataRetention: 7
            },
            riskProfile: "critical",
            typicalSize: {
                devices: 5000,
                users: 2000,
                locations: 15
            }
        }
    };
    
    return {
        industries,
        getIndustry: (id) => industries[id],
        getAllIndustries: () => industries
    };
});
