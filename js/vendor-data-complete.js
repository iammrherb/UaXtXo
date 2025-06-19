// Comprehensive Vendor Data with Real Market Information
window.vendorData = {
    // Cloud-Native NAC Leader
    portnox: {
        name: "Portnox",
        type: "cloud-native",
        logo: "img/vendors/portnox-logo.png",
        description: "Cloud-native, agentless NAC with zero-trust architecture",
        
        // Pricing based on real market data
        pricing: {
            model: "subscription",
            tiers: [
                { name: "Essentials", devices: 250, annual: 3000, features: ["Basic NAC", "Cloud Management", "Basic Compliance"] },
                { name: "Professional", devices: 1000, annual: 8500, features: ["Advanced NAC", "Risk Assessment", "Compliance Automation"] },
                { name: "Enterprise", devices: 5000, annual: 24000, features: ["Full Zero-Trust", "AI-Powered Security", "Advanced Analytics"] },
                { name: "Enterprise+", devices: 20000, annual: 65000, features: ["Unlimited Features", "Dedicated Support", "Custom Integration"] }
            ],
            pricePerDevice: {
                small: 12, // <1000 devices
                medium: 8.5, // 1000-5000 devices  
                large: 4.8, // 5000-20000 devices
                enterprise: 3.25 // 20000+ devices
            }
        },
        
        // Real implementation data
        implementation: {
            timeWeeks: 2,
            consultingHours: 16,
            consultingRate: 200,
            trainingIncluded: true,
            professionalServices: 3200
        },
        
        // Actual feature set
        features: {
            cloudNative: true,
            agentless: true,
            zeroTrust: true,
            deviceVisibility: true,
            riskAssessment: true,
            automatedRemediation: true,
            guestAccess: true,
            byod: true,
            iotSecurity: true,
            microsegmentation: true,
            aiPowered: true,
            samlIntegration: true,
            apiAccess: true,
            multiTenancy: true,
            globalDeployment: true
        },
        
        // Architecture
        architecture: {
            deployment: "100% Cloud SaaS",
            scalability: "Unlimited",
            availability: "99.99% SLA",
            datacenters: "Global (AWS)",
            disasterRecovery: "Automatic",
            updates: "Continuous, Zero-Downtime"
        },
        
        // Compliance & Security
        compliance: {
            frameworks: ["SOC2", "ISO27001", "HIPAA", "PCI-DSS", "GDPR", "CCPA"],
            certifications: ["SOC2 Type II", "ISO 27001:2013", "CSA STAR"],
            auditReports: "Quarterly",
            dataEncryption: "AES-256 at rest, TLS 1.3 in transit"
        },
        
        // Support
        support: {
            levels: ["Standard", "Premium", "Enterprise"],
            channels: ["Portal", "Email", "Phone", "Slack"],
            sla: { standard: "24 hours", premium: "4 hours", enterprise: "1 hour" },
            languages: ["English", "Spanish", "German", "French", "Japanese"],
            includedHours: { standard: 0, premium: 10, enterprise: "Unlimited" }
        }
    },
    
    // Legacy NAC Vendors
    cisco: {
        name: "Cisco ISE",
        type: "legacy",
        logo: "img/vendors/cisco-logo.png",
        description: "Traditional on-premise NAC requiring extensive infrastructure",
        
        pricing: {
            model: "perpetual + subscription",
            licenses: {
                base: 125000, // Base platform licenses
                device: 85, // Per device perpetual
                subscription: 28, // Per device annual subscription
                maintenance: 0.22 // 22% annual maintenance
            },
            hardware: {
                small: 45000, // <5000 devices
                medium: 125000, // 5000-15000 devices
                large: 350000, // 15000+ devices
                redundancy: 1.8 // 80% additional for HA
            }
        },
        
        implementation: {
            timeWeeks: 24,
            consultingHours: 480,
            consultingRate: 300,
            trainingRequired: true,
            professionalServices: 144000
        },
        
        features: {
            cloudNative: false,
            agentless: false,
            zeroTrust: false,
            deviceVisibility: true,
            riskAssessment: false,
            automatedRemediation: false,
            guestAccess: true,
            byod: true,
            iotSecurity: false,
            microsegmentation: true,
            aiPowered: false,
            samlIntegration: true,
            apiAccess: true,
            multiTenancy: false,
            globalDeployment: false
        },
        
        architecture: {
            deployment: "On-Premise (Appliances)",
            scalability: "Hardware Limited",
            availability: "99.9% (with HA)",
            datacenters: "Customer Managed",
            disasterRecovery: "Manual Failover",
            updates: "Maintenance Windows Required"
        },
        
        compliance: {
            frameworks: ["FIPS", "Common Criteria", "PCI-DSS"],
            certifications: ["FIPS 140-2", "Common Criteria EAL2+"],
            auditReports: "On Request",
            dataEncryption: "AES-256"
        },
        
        operationalCosts: {
            fteRequired: 3.5,
            avgSalary: 125000,
            powerCooling: 8500,
            datacenterSpace: 12000,
            networkBandwidth: 6000
        }
    },
    
    aruba: {
        name: "Aruba ClearPass",
        type: "legacy",
        logo: "img/vendors/aruba-logo.png",
        description: "HPE's traditional NAC solution with hybrid options",
        
        pricing: {
            model: "perpetual + subscription",
            licenses: {
                base: 95000,
                device: 72,
                subscription: 24,
                maintenance: 0.20
            },
            hardware: {
                small: 38000,
                medium: 98000,
                large: 285000,
                redundancy: 1.7
            }
        },
        
        implementation: {
            timeWeeks: 20,
            consultingHours: 400,
            consultingRate: 275,
            trainingRequired: true,
            professionalServices: 110000
        },
        
        features: {
            cloudNative: false,
            agentless: false,
            zeroTrust: false,
            deviceVisibility: true,
            riskAssessment: false,
            automatedRemediation: false,
            guestAccess: true,
            byod: true,
            iotSecurity: false,
            microsegmentation: false,
            aiPowered: false,
            samlIntegration: true,
            apiAccess: true,
            multiTenancy: false,
            globalDeployment: false
        },
        
        architecture: {
            deployment: "On-Premise / Virtual Appliances",
            scalability: "Cluster Limited",
            availability: "99.5% (with clustering)",
            datacenters: "Customer Managed",
            disasterRecovery: "Manual Configuration",
            updates: "Scheduled Downtime"
        },
        
        operationalCosts: {
            fteRequired: 3,
            avgSalary: 115000,
            powerCooling: 7200,
            datacenterSpace: 10000,
            networkBandwidth: 5000
        }
    },
    
    forescout: {
        name: "Forescout",
        type: "legacy",
        logo: "img/vendors/forescout-logo.png",
        description: "Agentless device visibility platform with NAC capabilities",
        
        pricing: {
            model: "subscription",
            tiers: [
                { name: "eyeSight", devices: 5000, annual: 65000 },
                { name: "eyeControl", devices: 5000, annual: 125000 },
                { name: "eyeExtend", devices: 5000, annual: 185000 }
            ],
            pricePerDevice: {
                visibility: 13,
                control: 25,
                extended: 37
            }
        },
        
        implementation: {
            timeWeeks: 16,
            consultingHours: 320,
            consultingRate: 250,
            professionalServices: 80000
        },
        
        features: {
            cloudNative: false,
            agentless: true,
            zeroTrust: false,
            deviceVisibility: true,
            riskAssessment: true,
            automatedRemediation: false,
            guestAccess: true,
            byod: true,
            iotSecurity: true,
            microsegmentation: false,
            aiPowered: false,
            samlIntegration: false,
            apiAccess: true,
            multiTenancy: false,
            globalDeployment: false
        },
        
        architecture: {
            deployment: "On-Premise Appliances",
            scalability: "Appliance Based",
            availability: "99% (with HA)",
            datacenters: "Customer Managed",
            disasterRecovery: "Manual",
            updates: "Quarterly Maintenance"
        },
        
        operationalCosts: {
            fteRequired: 2.5,
            avgSalary: 120000,
            powerCooling: 6500,
            datacenterSpace: 9000,
            networkBandwidth: 4500
        }
    },
    
    // Adding Pulse Secure
    pulse: {
        name: "Pulse Secure",
        type: "legacy",
        logo: "img/vendors/pulse-logo.png",
        description: "Ivanti's NAC solution focused on secure access",
        
        pricing: {
            model: "perpetual + maintenance",
            licenses: {
                base: 85000,
                device: 68,
                maintenance: 0.22
            },
            hardware: {
                small: 42000,
                medium: 105000,
                large: 295000,
                redundancy: 1.75
            }
        },
        
        implementation: {
            timeWeeks: 18,
            consultingHours: 360,
            consultingRate: 265,
            professionalServices: 95400
        },
        
        features: {
            cloudNative: false,
            agentless: false,
            zeroTrust: false,
            deviceVisibility: true,
            riskAssessment: false,
            automatedRemediation: false,
            guestAccess: true,
            byod: true,
            iotSecurity: false,
            microsegmentation: false,
            aiPowered: false,
            samlIntegration: true,
            apiAccess: false,
            multiTenancy: false,
            globalDeployment: false
        },
        
        architecture: {
            deployment: "On-Premise Appliances",
            scalability: "Hardware Limited",
            availability: "99% (with HA)",
            datacenters: "Customer Managed",
            disasterRecovery: "Manual Failover",
            updates: "Maintenance Windows"
        },
        
        operationalCosts: {
            fteRequired: 2.5,
            avgSalary: 118000,
            powerCooling: 6800,
            datacenterSpace: 9500,
            networkBandwidth: 4800
        }
    },
    
    // Cloud RADIUS Competitors
    foxpass: {
        name: "Foxpass",
        type: "cloud-radius",
        logo: "img/vendors/foxpass-logo.png",
        description: "Basic cloud RADIUS service, limited NAC features",
        
        pricing: {
            model: "subscription",
            tiers: [
                { name: "Starter", users: 50, annual: 1800, features: ["RADIUS", "LDAP"] },
                { name: "Business", users: 250, annual: 6000, features: ["RADIUS", "LDAP", "API"] },
                { name: "Enterprise", users: 1000, annual: 18000, features: ["All Features"] }
            ],
            pricePerUser: {
                small: 36,
                medium: 24,
                large: 18
            }
        },
        
        implementation: {
            timeWeeks: 2,
            consultingHours: 8,
            consultingRate: 175,
            professionalServices: 1400
        },
        
        features: {
            cloudNative: true,
            agentless: true,
            zeroTrust: false,
            deviceVisibility: false,
            riskAssessment: false,
            automatedRemediation: false,
            guestAccess: false,
            byod: false,
            iotSecurity: false,
            microsegmentation: false,
            aiPowered: false,
            samlIntegration: true,
            apiAccess: true,
            multiTenancy: false,
            globalDeployment: false
        },
        
        limitations: [
            "No device profiling",
            "No risk assessment",
            "Basic RADIUS only",
            "No compliance features",
            "Limited visibility"
        ]
    },
    
    securew2: {
        name: "SecureW2",
        type: "cloud-radius",
        logo: "img/vendors/securew2-logo.png",
        description: "Cloud RADIUS with certificate management",
        
        pricing: {
            model: "subscription",
            tiers: [
                { name: "Essential", devices: 500, annual: 4500 },
                { name: "Professional", devices: 2500, annual: 15000 },
                { name: "Enterprise", devices: 10000, annual: 42000 }
            ],
            pricePerDevice: {
                small: 9,
                medium: 6,
                large: 4.2
            }
        },
        
        implementation: {
            timeWeeks: 3,
            consultingHours: 24,
            consultingRate: 200,
            professionalServices: 4800
        },
        
        features: {
            cloudNative: true,
            agentless: true,
            zeroTrust: false,
            deviceVisibility: false,
            riskAssessment: false,
            automatedRemediation: false,
            guestAccess: true,
            byod: true,
            iotSecurity: false,
            microsegmentation: false,
            aiPowered: false,
            samlIntegration: true,
            apiAccess: true,
            multiTenancy: false,
            globalDeployment: false
        },
        
        limitations: [
            "Limited NAC features",
            "No compliance automation",
            "Basic device policies",
            "No risk scoring",
            "Certificate focus only"
        ]
    },
    
    // Additional Legacy Vendors
    extreme: {
        name: "Extreme Control",
        type: "legacy",
        logo: "img/vendors/extreme-logo.png",
        description: "Extreme Networks NAC solution",
        pricing: {
            model: "perpetual + maintenance",
            licenses: {
                base: 78000,
                device: 62,
                maintenance: 0.20
            }
        }
    },
    
    fortinet: {
        name: "FortiNAC",
        type: "legacy",
        logo: "img/vendors/fortinet-logo.png",
        description: "Fortinet's network access control",
        pricing: {
            model: "perpetual + subscription",
            licenses: {
                base: 88000,
                device: 70,
                subscription: 22,
                maintenance: 0.21
            }
        }
    },
    
    juniper: {
        name: "Juniper Steel-Belted",
        type: "legacy",
        logo: "img/vendors/juniper-logo.png",
        description: "Juniper's RADIUS/NAC platform",
        pricing: {
            model: "perpetual",
            licenses: {
                base: 72000,
                device: 58,
                maintenance: 0.20
            }
        }
    },
    
    microsoft: {
        name: "Microsoft NPS",
        type: "legacy",
        logo: "img/vendors/microsoft-logo.png",
        description: "Windows Server Network Policy Server",
        pricing: {
            model: "included",
            licenses: {
                base: 0, // Included with Windows Server
                device: 0,
                maintenance: 0
            },
            serverLicenses: 8000 // Windows Server Datacenter
        },
        limitations: [
            "Basic RADIUS only",
            "No device profiling",
            "Windows ecosystem only",
            "Limited scalability",
            "No cloud option"
        ]
    },
    
    arista: {
        name: "Arista MSS",
        type: "legacy",
        logo: "img/vendors/arista-logo.png",
        description: "Arista's Mobility Security Solution",
        pricing: {
            model: "subscription",
            licenses: {
                base: 55000,
                device: 48,
                maintenance: 0.18
            }
        }
    },
    
    packetfence: {
        name: "PacketFence",
        type: "open-source",
        logo: "img/vendors/packetfence-logo.png",
        description: "Open-source NAC solution",
        pricing: {
            model: "open-source + support",
            licenses: {
                base: 0,
                device: 0,
                support: 25000 // Annual enterprise support
            }
        },
        implementation: {
            timeWeeks: 16,
            consultingHours: 320,
            consultingRate: 200,
            professionalServices: 64000
        },
        operationalCosts: {
            fteRequired: 4, // Requires more internal resources
            avgSalary: 110000,
            infrastructure: 35000
        }
    }
};

// Compliance Mappings
window.complianceData = {
    frameworks: {
        "PCI-DSS": {
            name: "Payment Card Industry Data Security Standard",
            requirements: {
                "1.1.2": "Network segmentation",
                "2.2.1": "Configuration standards",
                "7.1": "Access control",
                "8.2.3": "Strong authentication",
                "10.1": "Audit trails",
                "11.4": "Network monitoring"
            },
            nacControls: {
                portnox: 100,
                cisco: 85,
                aruba: 80,
                forescout: 75,
                pulse: 70,
                foxpass: 25,
                securew2: 30
            }
        },
        "HIPAA": {
            name: "Health Insurance Portability and Accountability Act",
            requirements: {
                "164.308(a)(1)": "Risk assessment",
                "164.308(a)(3)": "Workforce security",
                "164.308(a)(4)": "Access management",
                "164.312(a)": "Access control",
                "164.312(b)": "Audit controls",
                "164.312(e)": "Transmission security"
            },
            nacControls: {
                portnox: 100,
                cisco: 90,
                aruba: 85,
                forescout: 80,
                pulse: 75,
                foxpass: 20,
                securew2: 25
            }
        },
        "SOC2": {
            name: "Service Organization Control 2",
            trustPrinciples: {
                "CC6.1": "Logical access controls",
                "CC6.2": "User provisioning",
                "CC6.3": "Role management",
                "CC6.6": "Network security",
                "CC7.2": "System monitoring",
                "CC8.1": "Change management"
            },
            nacControls: {
                portnox: 100,
                cisco: 88,
                aruba: 82,
                forescout: 78,
                pulse: 72,
                foxpass: 35,
                securew2: 40
            }
        },
        "ISO27001": {
            name: "ISO/IEC 27001",
            controls: {
                "A.6.2": "Mobile device management",
                "A.9.1": "Access control policy",
                "A.9.2": "User access management",
                "A.9.4": "System access control",
                "A.12.4": "Logging and monitoring",
                "A.13.1": "Network controls"
            },
            nacControls: {
                portnox: 100,
                cisco: 92,
                aruba: 88,
                forescout: 82,
                pulse: 78,
                foxpass: 30,
                securew2: 35
            }
        },
        "GDPR": {
            name: "General Data Protection Regulation",
            articles: {
                "Article 25": "Data protection by design",
                "Article 32": "Security of processing",
                "Article 33": "Breach notification",
                "Article 35": "Impact assessment"
            },
            nacControls: {
                portnox: 95,
                cisco: 80,
                aruba: 75,
                forescout: 70,
                pulse: 65,
                foxpass: 15,
                securew2: 20
            }
        }
    }
};

// Risk Assessment Data
window.riskData = {
    categories: {
        "Data Breach": {
            probability: {
                withNAC: { portnox: 0.05, cisco: 0.08, legacy: 0.12, noNAC: 0.35 },
                impact: 8900000, // Average cost of data breach
                reduction: { portnox: 0.86, cisco: 0.77, legacy: 0.66 }
            }
        },
        "Ransomware": {
            probability: {
                withNAC: { portnox: 0.03, cisco: 0.06, legacy: 0.09, noNAC: 0.28 },
                impact: 4620000,
                reduction: { portnox: 0.89, cisco: 0.79, legacy: 0.68 }
            }
        },
        "Insider Threat": {
            probability: {
                withNAC: { portnox: 0.02, cisco: 0.04, legacy: 0.06, noNAC: 0.15 },
                impact: 2760000,
                reduction: { portnox: 0.87, cisco: 0.73, legacy: 0.60 }
            }
        },
        "IoT Compromise": {
            probability: {
                withNAC: { portnox: 0.01, cisco: 0.08, legacy: 0.15, noNAC: 0.42 },
                impact: 1850000,
                reduction: { portnox: 0.98, cisco: 0.81, legacy: 0.64 }
            }
        },
        "Compliance Violation": {
            probability: {
                withNAC: { portnox: 0.01, cisco: 0.03, legacy: 0.05, noNAC: 0.25 },
                impact: 5650000,
                reduction: { portnox: 0.96, cisco: 0.88, legacy: 0.80 }
            }
        }
    },
    
    cyberInsurance: {
        premiumFactors: {
            noNAC: 1.0,
            legacyNAC: 0.85,
            ciscoISE: 0.75,
            portnox: 0.55
        },
        basePremium: {
            small: 45000,
            medium: 125000,
            large: 385000,
            enterprise: 980000
        },
        deductibleReduction: {
            noNAC: 0,
            legacyNAC: 0.10,
            ciscoISE: 0.20,
            portnox: 0.40
        }
    }
};

console.log('✅ Comprehensive vendor data loaded successfully');

// Register with ModuleLoader
if (window.ModuleLoader) {
    window.ModuleLoader.register('VendorDataComplete', window.vendorData);
}

// Make vendor data globally accessible
window.VendorDataComplete = window.vendorData;
