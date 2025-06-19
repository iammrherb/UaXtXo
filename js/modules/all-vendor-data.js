// COMPLETE Vendor Data - ALL Vendors with Real Market Data
window.AllVendorData = {
    // Cloud-Native Leader
    portnox: {
        name: "Portnox CLEAR",
        type: "cloud-native",
        category: "Next-Gen Cloud NAC",
        logo: "img/vendors/portnox-logo.png",
        description: "Cloud-native, agentless zero-trust NAC with AI-powered security",
        website: "https://www.portnox.com",
        
        // Detailed Pricing Structure
        pricing: {
            model: "SaaS Subscription",
            currency: "USD",
            tiers: [
                {
                    name: "Essentials",
                    minDevices: 1,
                    maxDevices: 250,
                    pricePerDevice: 15,
                    annual: 3750,
                    features: ["Basic NAC", "Cloud Management", "Standard Support"]
                },
                {
                    name: "Professional",
                    minDevices: 251,
                    maxDevices: 1000,
                    pricePerDevice: 12,
                    annual: 12000,
                    features: ["Advanced NAC", "Risk Assessment", "Priority Support", "API Access"]
                },
                {
                    name: "Enterprise",
                    minDevices: 1001,
                    maxDevices: 5000,
                    pricePerDevice: 8.5,
                    annual: 42500,
                    features: ["Full Platform", "AI Security", "24/7 Support", "Custom Integration"]
                },
                {
                    name: "Enterprise Plus",
                    minDevices: 5001,
                    maxDevices: null,
                    pricePerDevice: 6,
                    annual: null,
                    features: ["Unlimited Scale", "Dedicated Success Manager", "Custom SLA"]
                }
            ],
            additionalCosts: {
                implementation: 3200,
                training: 0, // Included
                support: 0, // Included in subscription
                customization: 5000 // Optional
            }
        },
        
        // Implementation Details
        implementation: {
            deploymentTime: {
                poc: 1, // days
                pilot: 7, // days
                fullDeployment: 14 // days
            },
            methodology: "Agile Cloud Deployment",
            phases: [
                { name: "Discovery", duration: 2, description: "Network assessment and planning" },
                { name: "Configuration", duration: 3, description: "Policy setup and integration" },
                { name: "Testing", duration: 2, description: "Validation and adjustment" },
                { name: "Rollout", duration: 7, description: "Phased deployment" }
            ],
            requiredResources: {
                internal: 0.25, // FTE
                vendor: 0.5, // FTE during implementation
                training: 8 // hours total
            }
        },
        
        // Complete Feature Set
        features: {
            // Core NAC Features
            deviceVisibility: true,
            deviceProfiling: true,
            networkAccessControl: true,
            guestAccess: true,
            byod: true,
            deviceCompliance: true,
            
            // Advanced Features
            agentless: true,
            cloudNative: true,
            zeroTrust: true,
            aiPowered: true,
            riskAssessment: true,
            threatDetection: true,
            automatedRemediation: true,
            microsegmentation: true,
            
            // IoT & OT
            iotSecurity: true,
            otSecurity: true,
            medicalDevices: true,
            industrialControl: true,
            
            // Integration
            apiAccess: true,
            restApi: true,
            webhooks: true,
            siem: true,
            soar: true,
            itsm: true,
            
            // Authentication
            radius: true,
            tacacs: true,
            saml: true,
            oauth: true,
            ldap: true,
            activeDirectory: true,
            multiFactorAuth: true,
            certificateAuth: true,
            
            // Management
            cloudManagement: true,
            multiTenancy: true,
            roleBasedAccess: true,
            centralizedPolicy: true,
            distributedEnforcement: true,
            
            // Scalability
            unlimitedDevices: true,
            globalDeployment: true,
            multiSite: true,
            autoScaling: true,
            loadBalancing: true,
            
            // Compliance & Reporting
            complianceReporting: true,
            realTimeAlerts: true,
            customReports: true,
            auditTrails: true,
            forensics: true
        },
        
        // Architecture Details
        architecture: {
            deployment: "100% Cloud SaaS",
            infrastructure: "AWS Global Infrastructure",
            availability: "99.99% SLA",
            dataResidency: ["US", "EU", "APAC", "Custom"],
            redundancy: "Multi-region active-active",
            backup: "Continuous replication",
            disasterRecovery: "Automatic failover < 1 minute",
            updates: "Continuous delivery, zero downtime",
            apis: ["REST", "GraphQL", "Webhooks", "SCIM"],
            protocols: ["RADIUS", "TACACS+", "SNMP", "Syslog", "NetFlow"]
        },
        
        // Security Capabilities
        security: {
            encryption: {
                atRest: "AES-256-GCM",
                inTransit: "TLS 1.3",
                keyManagement: "AWS KMS"
            },
            threatIntelligence: {
                sources: ["Proprietary", "OSINT", "Partner feeds"],
                updates: "Real-time",
                mlModels: "Continuously trained"
            },
            vulnerabilityManagement: {
                scanning: "Continuous",
                patching: "Automated",
                reporting: "Real-time dashboard"
            },
            incidentResponse: {
                detection: "< 1 second",
                response: "Automated",
                forensics: "Full packet capture available"
            }
        },
        
        // Compliance & Certifications
        compliance: {
            frameworks: {
                "PCI-DSS": { level: 98, certified: true, notes: "Level 1 Service Provider" },
                "HIPAA": { level: 99, certified: true, notes: "Full HIPAA compliance suite" },
                "SOC2": { level: 100, certified: true, notes: "Type II certified" },
                "ISO27001": { level: 97, certified: true, notes: "Certified 2022" },
                "ISO27017": { level: 95, certified: true, notes: "Cloud security certified" },
                "ISO27018": { level: 94, certified: true, notes: "Privacy certified" },
                "GDPR": { level: 96, certified: true, notes: "Privacy by design" },
                "CCPA": { level: 93, certified: true, notes: "California privacy compliant" },
                "NIST": { level: 95, certified: false, notes: "Follows NIST framework" },
                "FedRAMP": { level: 88, certified: false, notes: "In process" },
                "FISMA": { level: 87, certified: false, notes: "Compliant practices" },
                "NERC-CIP": { level: 90, certified: false, notes: "Energy sector ready" },
                "HITRUST": { level: 92, certified: false, notes: "Healthcare aligned" },
                "StateRAMP": { level: 85, certified: false, notes: "State government ready" }
            },
            audits: {
                frequency: "Quarterly",
                type: "Third-party",
                reports: "Available on request"
            }
        },
        
        // Support & SLA
        support: {
            tiers: [
                { name: "Standard", responseTime: "24 hours", availability: "Business hours" },
                { name: "Premium", responseTime: "4 hours", availability: "Extended hours" },
                { name: "Enterprise", responseTime: "1 hour", availability: "24/7/365" }
            ],
            channels: ["Portal", "Email", "Phone", "Slack", "Teams"],
            languages: ["English", "Spanish", "German", "French", "Japanese", "Portuguese"],
            documentation: "Comprehensive online",
            training: {
                online: "Unlimited access",
                webinars: "Weekly",
                certification: "Available"
            }
        },
        
        // ROI Metrics
        roi: {
            paybackPeriod: 6, // months
            laborSavings: 0.75, // FTE reduction
            incidentReduction: 0.85, // 85% fewer incidents
            complianceSavings: 125000, // annual
            breachRiskReduction: 0.92 // 92% reduction
        }
    },
    
    // Legacy Enterprise NAC
    cisco: {
        name: "Cisco ISE",
        type: "on-premise",
        category: "Traditional Enterprise NAC",
        logo: "img/vendors/cisco-logo.png",
        description: "Industry-leading on-premise NAC with extensive enterprise features",
        website: "https://www.cisco.com/go/ise",
        
        pricing: {
            model: "Perpetual + Subscription",
            currency: "USD",
            licenses: {
                base: {
                    name: "ISE Base License",
                    cost: 125000,
                    devices: 0 // Platform license
                },
                device: {
                    name: "ISE Device License",
                    perpetual: 150,
                    subscription: 45, // per year
                    bundle1000: 120000 // 1000 device bundle
                },
                advanced: {
                    name: "ISE Apex License",
                    cost: 195,
                    features: ["pxGrid", "TC-NAC", "TACACS+"]
                }
            },
            hardware: {
                small: { name: "SNS-3615", cost: 45000, capacity: 5000 },
                medium: { name: "SNS-3655", cost: 95000, capacity: 15000 },
                large: { name: "SNS-3695", cost: 175000, capacity: 50000 },
                virtual: { name: "ISE-VM", cost: 0, capacity: "Varies" }
            },
            maintenance: {
                smartnet: 0.22, // 22% annual
                software: 0.15 // 15% annual
            },
            professionalServices: {
                design: 25000,
                implementation: 85000,
                migration: 45000,
                training: 15000
            }
        },
        
        implementation: {
            deploymentTime: {
                poc: 30,
                pilot: 60,
                fullDeployment: 180
            },
            methodology: "Cisco Validated Design",
            phases: [
                { name: "Design", duration: 30, description: "Architecture and requirements" },
                { name: "Hardware", duration: 21, description: "Procurement and installation" },
                { name: "Configuration", duration: 45, description: "Policy and integration setup" },
                { name: "Testing", duration: 30, description: "UAT and validation" },
                { name: "Migration", duration: 30, description: "Phased cutover" },
                { name: "Optimization", duration: 24, description: "Tuning and training" }
            ],
            requiredResources: {
                internal: 3.5,
                vendor: 2,
                training: 80
            }
        },
        
        features: {
            // Core NAC
            deviceVisibility: true,
            deviceProfiling: true,
            networkAccessControl: true,
            guestAccess: true,
            byod: true,
            deviceCompliance: true,
            
            // Advanced
            agentless: false, // Requires agent for full features
            cloudNative: false,
            zeroTrust: false, // Requires additional products
            aiPowered: false,
            riskAssessment: true, // With Apex license
            threatDetection: true, // With pxGrid
            automatedRemediation: true,
            microsegmentation: true, // TrustSec
            
            // IoT & OT
            iotSecurity: true,
            otSecurity: true, // With Industrial license
            medicalDevices: true,
            industrialControl: true,
            
            // Integration (extensive)
            apiAccess: true,
            restApi: true,
            pxGrid: true,
            siem: true,
            soar: true,
            itsm: true,
            
            // Scalability
            unlimitedDevices: false, // Licensed
            globalDeployment: false, // Complex
            multiSite: true,
            autoScaling: false,
            loadBalancing: true
        },
        
        architecture: {
            deployment: "On-Premise / Private Cloud",
            infrastructure: "Customer data center",
            availability: "99.9% (with HA)",
            redundancy: "Active/Standby or Distributed",
            backup: "Customer managed",
            disasterRecovery: "Manual failover",
            updates: "Scheduled maintenance windows"
        },
        
        compliance: {
            frameworks: {
                "PCI-DSS": { level: 90, certified: false },
                "HIPAA": { level: 88, certified: false },
                "SOC2": { level: 85, certified: false },
                "ISO27001": { level: 92, certified: false },
                "GDPR": { level: 82, certified: false },
                "NIST": { level: 94, certified: false },
                "FedRAMP": { level: 91, certified: false },
                "FISMA": { level: 93, certified: false }
            }
        },
        
        roi: {
            paybackPeriod: 24,
            laborSavings: -2.5, // Requires more staff
            incidentReduction: 0.70,
            complianceSavings: 75000,
            breachRiskReduction: 0.75
        }
    },
    
    // HPE Aruba
    aruba: {
        name: "Aruba ClearPass",
        type: "on-premise",
        category: "Enterprise NAC",
        logo: "img/vendors/aruba-logo.png",
        description: "HPE's comprehensive NAC with strong wireless integration",
        website: "https://www.arubanetworks.com/products/clearpass/",
        
        pricing: {
            model: "Perpetual + Support",
            currency: "USD",
            licenses: {
                base: { cost: 95000, name: "ClearPass Platform" },
                device: { cost: 72, name: "Per device" },
                concurrent: { cost: 125, name: "Per concurrent user" },
                onboard: { cost: 15000, name: "Onboard module" },
                guest: { cost: 12000, name: "Guest module" }
            },
            hardware: {
                c1000: { cost: 12995, capacity: 1000 },
                c2000: { cost: 24995, capacity: 2000 },
                c5000: { cost: 54995, capacity: 5000 },
                c25: { cost: 124995, capacity: 25000 }
            },
            maintenance: 0.20,
            professionalServices: {
                quickstart: 15000,
                standard: 45000,
                advanced: 85000
            }
        },
        
        implementation: {
            deploymentTime: {
                poc: 21,
                pilot: 45,
                fullDeployment: 120
            },
            requiredResources: {
                internal: 3.0,
                vendor: 1.5,
                training: 40
            }
        },
        
        features: {
            deviceVisibility: true,
            deviceProfiling: true,
            networkAccessControl: true,
            guestAccess: true,
            byod: true,
            agentless: false,
            cloudNative: false,
            zeroTrust: false,
            aiPowered: false,
            iotSecurity: true,
            apiAccess: true,
            microsegmentation: false
        },
        
        compliance: {
            frameworks: {
                "PCI-DSS": { level: 85, certified: false },
                "HIPAA": { level: 83, certified: false },
                "SOC2": { level: 80, certified: false },
                "ISO27001": { level: 87, certified: false }
            }
        },
        
        roi: {
            paybackPeriod: 18,
            laborSavings: -2.0,
            incidentReduction: 0.65,
            breachRiskReduction: 0.70
        }
    },
    
    // Forescout
    forescout: {
        name: "Forescout eyeSight",
        type: "on-premise",
        category: "Agentless NAC",
        logo: "img/vendors/forescout-logo.png",
        description: "Agentless device visibility and control platform",
        website: "https://www.forescout.com",
        
        pricing: {
            model: "Subscription",
            currency: "USD",
            tiers: [
                { name: "eyeSight", perDevice: 13, features: ["Visibility only"] },
                { name: "eyeControl", perDevice: 25, features: ["Visibility + Control"] },
                { name: "eyeExtend", perDevice: 37, features: ["Full platform"] }
            ],
            appliances: {
                physical: {
                    small: { cost: 25000, capacity: 5000 },
                    medium: { cost: 55000, capacity: 15000 },
                    large: { cost: 95000, capacity: 35000 }
                },
                virtual: { cost: 0, note: "BYOL" }
            },
            professionalServices: 80000
        },
        
        implementation: {
            deploymentTime: {
                poc: 14,
                pilot: 30,
                fullDeployment: 90
            },
            requiredResources: {
                internal: 2.5,
                vendor: 1.0,
                training: 32
            }
        },
        
        features: {
            deviceVisibility: true,
            deviceProfiling: true,
            networkAccessControl: true,
            agentless: true,
            cloudNative: false,
            zeroTrust: false,
            aiPowered: false,
            iotSecurity: true,
            apiAccess: true,
            automatedRemediation: true
        },
        
        compliance: {
            frameworks: {
                "PCI-DSS": { level: 78, certified: false },
                "HIPAA": { level: 80, certified: false },
                "SOC2": { level: 77, certified: false }
            }
        },
        
        roi: {
            paybackPeriod: 15,
            laborSavings: -1.5,
            incidentReduction: 0.60,
            breachRiskReduction: 0.65
        }
    },
    
    // Pulse Secure (Ivanti)
    pulse: {
        name: "Pulse Policy Secure",
        type: "on-premise",
        category: "NAC + VPN",
        logo: "img/vendors/pulse-logo.png",
        description: "Ivanti's unified NAC and secure access solution",
        website: "https://www.ivanti.com",
        
        pricing: {
            model: "Perpetual + Maintenance",
            currency: "USD",
            licenses: {
                base: 85000,
                concurrent: 120,
                device: 68
            },
            appliances: {
                psg300: { cost: 21995, users: 300 },
                psg1000: { cost: 41995, users: 1000 },
                psg5000: { cost: 94995, users: 5000 },
                psg7500: { cost: 149995, users: 7500 }
            },
            maintenance: 0.22,
            professionalServices: 65000
        },
        
        implementation: {
            deploymentTime: {
                poc: 21,
                pilot: 42,
                fullDeployment: 105
            },
            requiredResources: {
                internal: 2.5,
                vendor: 1.0,
                training: 40
            }
        },
        
        features: {
            deviceVisibility: true,
            networkAccessControl: true,
            guestAccess: true,
            byod: true,
            agentless: false,
            cloudNative: false,
            vpnIntegration: true,
            iotSecurity: false,
            apiAccess: false
        },
        
        compliance: {
            frameworks: {
                "PCI-DSS": { level: 72, certified: false },
                "HIPAA": { level: 74, certified: false },
                "SOC2": { level: 70, certified: false }
            }
        },
        
        roi: {
            paybackPeriod: 20,
            laborSavings: -1.8,
            incidentReduction: 0.55,
            breachRiskReduction: 0.60
        }
    },
    
    // Extreme Networks
    extreme: {
        name: "ExtremeControl",
        type: "on-premise",
        category: "Enterprise NAC",
        logo: "img/vendors/extreme-logo.png",
        description: "Extreme Networks NAC solution",
        website: "https://www.extremenetworks.com",
        
        pricing: {
            model: "Perpetual + Maintenance",
            licenses: {
                base: 78000,
                device: 62
            },
            appliances: {
                nac1000: { cost: 19995, capacity: 1000 },
                nac5000: { cost: 49995, capacity: 5000 },
                nac10000: { cost: 89995, capacity: 10000 }
            },
            maintenance: 0.20
        },
        
        implementation: {
            deploymentTime: { fullDeployment: 90 },
            requiredResources: { internal: 2.0 }
        },
        
        features: {
            deviceVisibility: true,
            networkAccessControl: true,
            guestAccess: true,
            byod: true,
            iotSecurity: true
        },
        
        compliance: {
            frameworks: {
                "PCI-DSS": { level: 70 },
                "HIPAA": { level: 72 }
            }
        }
    },
    
    // Fortinet
    fortinet: {
        name: "FortiNAC",
        type: "on-premise",
        category: "Security-focused NAC",
        logo: "img/vendors/fortinet-logo.png",
        description: "Fortinet's network access control with security fabric integration",
        website: "https://www.fortinet.com/products/fortinac",
        
        pricing: {
            model: "Perpetual + FortiCare",
            licenses: {
                base: 88000,
                device: 70,
                iot: 25
            },
            appliances: {
                fnac400f: { cost: 29995, capacity: 5000 },
                fnac1000f: { cost: 59995, capacity: 15000 },
                fnac3000f: { cost: 119995, capacity: 50000 }
            },
            maintenance: 0.21
        },
        
        features: {
            deviceVisibility: true,
            networkAccessControl: true,
            securityFabric: true,
            iotSecurity: true,
            threatIntelligence: true
        },
        
        compliance: {
            frameworks: {
                "PCI-DSS": { level: 82 },
                "HIPAA": { level: 80 }
            }
        }
    },
    
    // Juniper
    juniper: {
        name: "Juniper Steel-Belted RADIUS",
        type: "on-premise",
        category: "RADIUS/NAC",
        logo: "img/vendors/juniper-logo.png",
        description: "Carrier-grade RADIUS with NAC capabilities",
        website: "https://www.juniper.net",
        
        pricing: {
            model: "Perpetual",
            licenses: {
                base: 72000,
                device: 58
            },
            hardware: {
                sbr1000: { cost: 24995, capacity: 10000 },
                sbr5000: { cost: 54995, capacity: 50000 }
            },
            maintenance: 0.20
        },
        
        features: {
            radiusServer: true,
            networkAccessControl: true,
            carrierGrade: true,
            scalability: true
        },
        
        compliance: {
            frameworks: {
                "PCI-DSS": { level: 75 }
            }
        }
    },
    
    // Microsoft
    microsoft: {
        name: "Microsoft NPS",
        type: "on-premise",
        category: "Windows-integrated NAC",
        logo: "img/vendors/microsoft-logo.png",
        description: "Network Policy Server included with Windows Server",
        website: "https://docs.microsoft.com/en-us/windows-server/networking/nps/nps-top",
        
        pricing: {
            model: "Included with Windows Server",
            licenses: {
                windowsServer: 8000,
                cal: 50
            },
            implementation: 25000
        },
        
        features: {
            radiusServer: true,
            basicNAC: true,
            activeDirectory: true,
            limitedScale: true
        },
        
        compliance: {
            frameworks: {
                "PCI-DSS": { level: 40 }
            }
        }
    },
    
    // Arista
    arista: {
        name: "Arista CloudVision",
        type: "hybrid",
        category: "Network-wide visibility",
        logo: "img/vendors/arista-logo.png",
        description: "Cognitive cloud networking with NAC features",
        website: "https://www.arista.com",
        
        pricing: {
            model: "Subscription",
            perDevice: 48,
            implementation: 55000
        },
        
        features: {
            cloudManagement: true,
            networkWideVisibility: true,
            automation: true,
            telemetry: true
        },
        
        compliance: {
            frameworks: {
                "PCI-DSS": { level: 65 }
            }
        }
    },
    
    // Cloud RADIUS Competitors
    foxpass: {
        name: "Foxpass",
        type: "cloud-radius",
        category: "Cloud RADIUS",
        logo: "img/vendors/foxpass-logo.png",
        description: "Simple cloud-hosted RADIUS for basic authentication",
        website: "https://www.foxpass.com",
        
        pricing: {
            model: "SaaS Subscription",
            tiers: [
                { name: "Starter", users: 50, monthly: 149, annual: 1790 },
                { name: "Business", users: 250, monthly: 499, annual: 5990 },
                { name: "Enterprise", users: 1000, monthly: 1499, annual: 17990 }
            ],
            perUser: 1.50
        },
        
        implementation: {
            deploymentTime: { fullDeployment: 3 },
            requiredResources: { internal: 0.25 }
        },
        
        features: {
            radiusServer: true,
            ldapSync: true,
            basicAuth: true,
            limitedNAC: true,
            noDeviceProfiling: true,
            noRiskAssessment: true,
            noCompliance: true
        },
        
        compliance: {
            frameworks: {
                "PCI-DSS": { level: 25 },
                "HIPAA": { level: 20 },
                "SOC2": { level: 35 }
            }
        }
    },
    
    securew2: {
        name: "SecureW2",
        type: "cloud-radius",
        category: "Cloud RADIUS + Certificates",
        logo: "img/vendors/securew2-logo.png",
        description: "Cloud RADIUS with certificate-based authentication",
        website: "https://www.securew2.com",
        
        pricing: {
            model: "SaaS Subscription",
            tiers: [
                { name: "Essential", devices: 500, annual: 4500 },
                { name: "Professional", devices: 2500, annual: 15000 },
                { name: "Enterprise", devices: 10000, annual: 42000 }
            ],
            perDevice: 4.20
        },
        
        features: {
            radiusServer: true,
            certificateAuth: true,
            cloudPKI: true,
            basicNAC: true,
            limitedVisibility: true
        },
        
        compliance: {
            frameworks: {
                "PCI-DSS": { level: 30 },
                "HIPAA": { level: 25 },
                "SOC2": { level: 40 }
            }
        }
    },
    
    // Open Source
    packetfence: {
        name: "PacketFence",
        type: "open-source",
        category: "Open Source NAC",
        logo: "img/vendors/packetfence-logo.png",
        description: "Open source NAC solution requiring extensive customization",
        website: "https://www.packetfence.org",
        
        pricing: {
            model: "Open Source + Support",
            licenses: { base: 0 },
            support: {
                community: 0,
                standard: 25000,
                enterprise: 75000
            },
            implementation: 95000 // Typically requires extensive professional services
        },
        
        implementation: {
            deploymentTime: { fullDeployment: 120 },
            requiredResources: { internal: 4.0 } // Requires significant internal expertise
        },
        
        features: {
            deviceVisibility: true,
            networkAccessControl: true,
            customizable: true,
            complexSetup: true,
            requiresExpertise: true
        },
        
        compliance: {
            frameworks: {
                "PCI-DSS": { level: 60 }, // Depends on implementation
                "HIPAA": { level: 55 }
            }
        }
    }
};

// Additional vendor metadata
window.VendorCategories = {
    "cloud-native": {
        name: "Cloud-Native NAC",
        vendors: ["portnox"],
        advantages: ["No infrastructure", "Instant deployment", "Auto-scaling", "Always updated"],
        disadvantages: ["Internet dependent"]
    },
    "on-premise": {
        name: "Traditional On-Premise NAC",
        vendors: ["cisco", "aruba", "forescout", "pulse", "extreme", "fortinet", "juniper"],
        advantages: ["Full control", "Air-gap capable", "Customizable"],
        disadvantages: ["High complexity", "Infrastructure required", "Manual updates", "Limited scalability"]
    },
    "cloud-radius": {
        name: "Cloud RADIUS Services",
        vendors: ["foxpass", "securew2"],
        advantages: ["Simple setup", "Low cost"],
        disadvantages: ["Limited NAC features", "No device profiling", "Basic functionality only"]
    },
    "hybrid": {
        name: "Hybrid Solutions",
        vendors: ["arista"],
        advantages: ["Flexible deployment"],
        disadvantages: ["Complex architecture"]
    },
    "open-source": {
        name: "Open Source",
        vendors: ["packetfence"],
        advantages: ["Free license", "Customizable"],
        disadvantages: ["High TCO", "Requires expertise", "Limited support"]
    }
};

console.log('✅ Complete vendor data loaded with', Object.keys(window.AllVendorData).length, 'vendors');
