/**
 * COMPREHENSIVE VENDOR DATABASE
 * Complete TCO analysis including ALL hidden costs
 */

window.ComprehensiveVendorDatabase = {
    // ==================== PORTNOX CLEAR ====================
    portnox: {
        id: "portnox",
        name: "Portnox CLEAR",
        company: "Portnox",
        category: "cloud-native",
        architecture: "Pure SaaS Zero Trust",
        score: 94,
        badges: ["Cloud Native", "Zero Trust", "Automated"],
        
        deployment: {
            time: 4, // hours
            timeDisplay: "4 hours",
            method: "100% Cloud SaaS",
            complexity: "Simple",
            professionalServices: 0,
            training: 0,
            prerequisites: "None"
        },
        
        pricing: {
            model: "All-inclusive subscription",
            transparent: true,
            perDevice: {
                list: 5.00,
                negotiated: 3.50,
                volume: {
                    "1000": 3.50,
                    "5000": 2.50,
                    "10000": 2.00,
                    "25000": 1.50
                }
            }
        },
        
        licensing: {
            // EVERYTHING INCLUDED - NO ADD-ONS
            authentication: {
                "802.1X": { included: true, cost: 0 },
                "MAC-Auth": { included: true, cost: 0 },
                "Certificate": { included: true, cost: 0 },
                "MFA": { included: true, cost: 0 },
                "SAML/OAuth": { included: true, cost: 0 },
                "LDAP/AD": { included: true, cost: 0 }
            },
            networkAccess: {
                "Wired NAC": { included: true, cost: 0 },
                "Wireless NAC": { included: true, cost: 0 },
                "VPN Integration": { included: true, cost: 0 },
                "Guest Portal": { included: true, cost: 0 },
                "Captive Portal": { included: true, cost: 0 },
                "Self-Service": { included: true, cost: 0 }
            },
            deviceManagement: {
                "BYOD Onboarding": { included: true, cost: 0 },
                "IoT Security": { included: true, cost: 0 },
                "Mobile Security": { included: true, cost: 0 },
                "Device Profiling": { included: true, cost: 0 },
                "Risk Assessment": { included: true, cost: 0 },
                "Compliance": { included: true, cost: 0 },
                "Posture Assessment": { included: true, cost: 0 }
            },
            advanced: {
                "Zero Trust": { included: true, cost: 0 },
                "Microsegmentation": { included: true, cost: 0 },
                "AI/ML Analytics": { included: true, cost: 0 },
                "Threat Detection": { included: true, cost: 0 },
                "SIEM Integration": { included: true, cost: 0 },
                "API Access": { included: true, cost: 0 },
                "Dashboards": { included: true, cost: 0 }
            }
        },
        
        infrastructure: {
            servers: { required: false, cost: 0 },
            appliances: { required: false, cost: 0 },
            database: { required: false, cost: 0 },
            loadBalancer: { required: false, cost: 0 },
            haPair: { required: false, cost: 0 },
            certificateAuthority: { required: false, cost: 0 },
            vmLicenses: { required: false, cost: 0 },
            backupSolution: { required: false, cost: 0 }
        },
        
        operations: {
            fte: 0.25,
            automation: 95,
            maintenanceWindows: 0,
            patching: "Automatic cloud updates",
            endOfLife: "N/A - Continuous updates"
        },
        
        hiddenCosts: {
            total: 0,
            breakdown: {
                networkRedesign: 0,
                downtime: 0,
                integration: 0,
                scaling: 0,
                consulting: 0,
                training: 0,
                migration: 0
            }
        }
    },
    
    // ==================== CISCO ISE ====================
    cisco: {
        id: "cisco",
        name: "Cisco ISE",
        company: "Cisco Systems",
        category: "legacy-onprem",
        architecture: "On-premise hardware",
        score: 73,
        badges: ["Legacy", "Complex"],
        
        deployment: {
            time: 2160, // 90 days
            timeDisplay: "90 days",
            method: "On-premise appliances",
            complexity: "Very Complex",
            professionalServices: 275000,
            training: 25000,
            prerequisites: "Complete network redesign, PKI, AD"
        },
        
        pricing: {
            model: "Perpetual + Subscription",
            transparent: false,
            perDevice: {
                base: 95,
                plus: 195,
                apex: 295,
                deviceAdmin: 125,
                total: 710 // All required
            }
        },
        
        licensing: {
            core: {
                "Base License": { included: false, cost: 95, perDevice: true, required: true },
                "Plus License": { included: false, cost: 195, perDevice: true, required: true },
                "Apex License": { included: false, cost: 295, perDevice: true, required: true },
                "Device Admin": { included: false, cost: 125, perDevice: true, required: true }
            },
            features: {
                "pxGrid Controller": { included: false, cost: 50000, annual: 10000 },
                "pxGrid Nodes": { included: false, cost: 25000, quantity: 2, annual: 5000 },
                "Profiling Feed": { included: false, cost: 35000, annual: 7000 },
                "TrustSec": { included: false, cost: 45, perDevice: true },
                "Stealthwatch": { included: false, cost: 75000, annual: 15000 },
                "AnyConnect": { included: false, cost: 65, perDevice: true },
                "TACACS+": { included: false, cost: 125, perDevice: true },
                "Guest Portal": { included: false, cost: 35, perDevice: true },
                "BYOD Portal": { included: false, cost: 75, perDevice: true },
                "Posture Module": { included: false, cost: 85, perDevice: true },
                "Threat-Centric NAC": { included: false, cost: 125000, annual: 25000 },
                "MDM Connector": { included: false, cost: 55, perDevice: true }
            }
        },
        
        infrastructure: {
            primaryAppliance: { required: true, model: "SNS-3695", cost: 95000, quantity: 2, annual: 19000 },
            secondaryAppliance: { required: true, model: "SNS-3615", cost: 65000, quantity: 4, annual: 13000 },
            monitoringNode: { required: true, model: "SNS-3615", cost: 65000, quantity: 2, annual: 13000 },
            database: { required: true, type: "Oracle/MSSQL", cost: 50000, annual: 10000, licensing: 25000 },
            loadBalancer: { required: true, type: "F5 Big-IP", cost: 75000, quantity: 2, annual: 15000 },
            certificateAuthority: { required: true, type: "Microsoft CA", cost: 50000, implementation: 25000 },
            vmwareLicenses: { required: true, cost: 30000, annual: 6000 },
            backupInfrastructure: { required: true, cost: 45000, annual: 9000 },
            sanStorage: { required: true, cost: 80000, annual: 16000 },
            dedicatedNetwork: { required: true, cost: 60000 },
            monitoringTools: { required: true, cost: 35000, annual: 7000 }
        },
        
        support: {
            smartNet: { percentage: 0.12, required: true },
            solutionSupport: { percentage: 0.28, required: true },
            tac: { cost: 50000, annual: true }
        },
        
        operations: {
            fte: 2.5,
            automation: 25,
            maintenanceWindows: 32, // hours/year
            patching: "Quarterly 8-hour windows",
            endOfLife: "Hardware refresh every 5 years"
        },
        
        hiddenCosts: {
            total: 1085000,
            breakdown: {
                networkRedesign: 150000,
                segmentationProject: 200000,
                certificateInfrastructure: 75000,
                downtimeImpact: 100000,
                integrationComplexity: 125000,
                scalingComplexity: 150000,
                consultingOverruns: 175000,
                staffAugmentation: 240000,
                trainingBackfill: 50000,
                upgradeCycles: 80000,
                troubleshooting: 120000,
                vendorLockIn: 200000
            }
        }
    },
    
    // ==================== ARUBA CLEARPASS ====================
    aruba: {
        id: "aruba",
        name: "Aruba ClearPass",
        company: "HPE Aruba",
        category: "legacy-onprem",
        architecture: "Physical/Virtual",
        score: 74,
        badges: ["Modular", "Complex"],
        
        deployment: {
            time: 1800, // 75 days
            timeDisplay: "75 days",
            method: "Physical/Virtual appliances",
            complexity: "Complex",
            professionalServices: 155000,
            training: 15000,
            prerequisites: "AD, PKI, network prep"
        },
        
        pricing: {
            model: "Modular perpetual",
            transparent: false,
            perDevice: {
                platform: 125,
                onboard: 95,
                guest: 75,
                onguard: 145,
                insight: 195,
                total: 635
            }
        },
        
        licensing: {
            core: {
                "Policy Manager": { included: false, cost: 125, perDevice: true, required: true },
                "AAA License": { included: false, cost: 45, perDevice: true, required: true }
            },
            modules: {
                "Onboard": { included: false, cost: 95, perDevice: true, required: true },
                "Guest": { included: false, cost: 75, perDevice: true, required: true },
                "OnGuard": { included: false, cost: 145, perDevice: true, required: true },
                "Insight": { included: false, cost: 195, perDevice: true },
                "Device Insight": { included: false, cost: 95, perDevice: true },
                "Wireless": { included: false, cost: 35, perDevice: true },
                "Wired": { included: false, cost: 35, perDevice: true },
                "IoT Profiling": { included: false, cost: 55, perDevice: true },
                "TACACS+": { included: false, cost: 65, perDevice: true },
                "IntroSpect UEBA": { included: false, cost: 165, perDevice: true }
            },
            connectors: {
                "Exchange": { included: false, cost: 15000 },
                "Intune": { included: false, cost: 25000 },
                "VMware AirWatch": { included: false, cost: 25000 },
                "ServiceNow": { included: false, cost: 35000 },
                "Splunk": { included: false, cost: 25000 }
            }
        },
        
        infrastructure: {
            hardware5k: { required: true, model: "CP-HW-5K", cost: 42000, quantity: 2, annual: 8400 },
            hardware25k: { required: false, model: "CP-HW-25K", cost: 85000, quantity: 1, annual: 17000 },
            virtualAppliance: { required: true, cost: 8000, quantity: 2, annual: 1600 },
            insightAppliance: { required: false, cost: 125000, annual: 25000 },
            database: { required: true, type: "PostgreSQL", cost: 25000, annual: 5000 },
            loadBalancer: { required: true, cost: 45000, quantity: 2 },
            certificateServices: { required: true, cost: 35000, implementation: 15000 }
        },
        
        operations: {
            fte: 1.5,
            automation: 40,
            maintenanceWindows: 24,
            patching: "Quarterly 6-hour windows",
            endOfLife: "Hardware refresh every 5 years"
        },
        
        hiddenCosts: {
            total: 365000,
            breakdown: {
                moduleIntegration: 50000,
                certificateServices: 35000,
                loadBalancing: 45000,
                annualUpgrades: 40000,
                downtimeImpact: 60000,
                complexityOverhead: 75000,
                customization: 60000
            }
        }
    },
    
    // ==================== MICROSOFT NPS/INTUNE ====================
    microsoft: {
        id: "microsoft",
        name: "Microsoft NPS/Intune",
        company: "Microsoft",
        category: "hybrid",
        architecture: "Hybrid Cloud",
        score: 81,
        badges: ["Hybrid", "Microsoft"],
        
        deployment: {
            time: 720, // 30 days
            timeDisplay: "30 days",
            method: "Hybrid (On-prem + Cloud)",
            complexity: "Moderate",
            professionalServices: 45000,
            training: 8000,
            prerequisites: "Windows Server, Azure AD"
        },
        
        pricing: {
            model: "Subscription",
            transparent: true,
            perDevice: {
                intuneStandalone: 12,
                m365E3: 36,
                m365E5: 57
            }
        },
        
        licensing: {
            core: {
                "Windows Server CAL": { included: false, cost: 45, perDevice: true },
                "Intune": { included: false, cost: 12, perDevice: true },
                "Azure AD P1": { included: false, cost: 6, perDevice: true },
                "Conditional Access": { included: false, cost: 9, perDevice: true },
                "Defender for Endpoint": { included: false, cost: 12, perDevice: true }
            },
            features: {
                "RADIUS Extension": { included: false, cost: 15000 },
                "Certificate Services": { included: false, cost: 25000 },
                "Azure MFA": { included: false, cost: 6, perUser: true }
            }
        },
        
        infrastructure: {
            windowsServer: { required: true, cost: 6000, quantity: 2, annual: 1200 },
            azureCompute: { required: true, monthly: 500 },
            database: { required: false, cost: 0 },
            certificateServices: { required: true, cost: 25000 }
        },
        
        operations: {
            fte: 1.0,
            automation: 60,
            maintenanceWindows: 2,
            patching: "Automatic",
            endOfLife: "Continuous updates"
        },
        
        hiddenCosts: {
            total: 165000,
            breakdown: {
                limitedNACFeatures: 50000,
                customDevelopment: 75000,
                thirdPartyTools: 40000
            }
        }
    },
    
    // ==================== FORESCOUT ====================
    forescout: {
        id: "forescout",
        name: "Forescout eyeSight",
        company: "Forescout",
        category: "agentless",
        architecture: "On-premise",
        score: 74,
        badges: ["Agentless", "Visibility"],
        
        deployment: {
            time: 1440, // 60 days
            timeDisplay: "60 days",
            method: "Physical/Virtual appliances",
            complexity: "Moderate",
            professionalServices: 85000,
            training: 12000,
            prerequisites: "Network access, SPAN ports"
        },
        
        pricing: {
            model: "Subscription",
            transparent: false,
            perDevice: {
                annual: 65,
                triennial: 55
            }
        },
        
        licensing: {
            core: {
                "Base Platform": { included: false, cost: 65, perDevice: true },
                "Compliance Module": { included: false, cost: 25, perDevice: true },
                "Network Access": { included: false, cost: 20, perDevice: true },
                "Device Cloud": { included: false, cost: 15, perDevice: true },
                "IoT Module": { included: false, cost: 20, perDevice: true },
                "Threat Protection": { included: false, cost: 30, perDevice: true }
            }
        },
        
        infrastructure: {
            enterpriseAppliance: { required: true, cost: 125000, capacity: 10000 },
            countryManager: { required: true, cost: 50000 },
            database: { required: true, cost: 20000, annual: 4000 }
        },
        
        operations: {
            fte: 1.25,
            automation: 60,
            maintenanceWindows: 16,
            patching: "Quarterly",
            endOfLife: "Hardware refresh every 5 years"
        },
        
        hiddenCosts: {
            total: 180000,
            breakdown: {
                agentlessLimitations: 40000,
                integrationComplexity: 60000,
                scalingIssues: 80000
            }
        }
    },
    
    // ==================== JUNIPER MIST ====================
    juniper: {
        id: "juniper",
        name: "Juniper Mist Access Assurance",
        company: "Juniper Networks",
        category: "cloud-managed",
        architecture: "Cloud-managed",
        score: 80,
        badges: ["Cloud Managed", "AI-Driven"],
        
        deployment: {
            time: 840, // 35 days
            timeDisplay: "35 days",
            method: "Cloud with on-prem components",
            complexity: "Moderate",
            professionalServices: 65000,
            training: 10000,
            prerequisites: "Juniper infrastructure preferred"
        },
        
        pricing: {
            model: "Subscription",
            transparent: true,
            perDevice: {
                wired: 72,
                wireless: 84,
                iot: 36
            }
        },
        
        licensing: {
            assurance: {
                "Wired Assurance": { included: false, cost: 72, perDevice: true },
                "Wireless Assurance": { included: false, cost: 84, perDevice: true },
                "IoT Assurance": { included: false, cost: 36, perDevice: true },
                "Marvis VNA": { included: false, cost: 24, perDevice: true },
                "Premium Analytics": { included: false, cost: 36, perDevice: true }
            }
        },
        
        infrastructure: {
            mistEdge: { required: false, cost: 0 },
            onPremConnector: { required: true, cost: 15000 }
        },
        
        operations: {
            fte: 0.75,
            automation: 75,
            maintenanceWindows: 0,
            patching: "Cloud automatic",
            endOfLife: "N/A - Cloud service"
        },
        
        hiddenCosts: {
            total: 55000,
            breakdown: {
                juniperLockIn: 30000,
                limitedThirdParty: 25000
            }
        }
    },
    
    // ==================== ARISTA CLOUDVISION ====================
    arista: {
        id: "arista",
        name: "Arista CloudVision",
        company: "Arista Networks",
        category: "cloud-managed",
        architecture: "Cloud-managed",
        score: 78,
        badges: ["Automated", "Cloud Managed"],
        
        deployment: {
            time: 720, // 30 days
            timeDisplay: "30 days",
            method: "Cloud-managed",
            complexity: "Moderate",
            professionalServices: 55000,
            training: 8000,
            prerequisites: "Arista switches preferred"
        },
        
        pricing: {
            model: "Subscription",
            transparent: true,
            perDevice: {
                standard: 48,
                advanced: 72,
                cognitive: 96
            }
        },
        
        licensing: {
            cloudvision: {
                "CVP Base": { included: false, cost: 48, perDevice: true },
                "Advanced Features": { included: false, cost: 24, perDevice: true },
                "Cognitive Campus": { included: false, cost: 24, perDevice: true }
            }
        },
        
        infrastructure: {
            cvpAppliance: { required: false, cost: 0 },
            onPremOption: { required: false, cost: 35000 }
        },
        
        operations: {
            fte: 0.75,
            automation: 80,
            maintenanceWindows: 0,
            patching: "Automatic",
            endOfLife: "N/A - Cloud service"
        },
        
        hiddenCosts: {
            total: 40000,
            breakdown: {
                aristaLockIn: 25000,
                limitedNACFeatures: 15000
            }
        }
    },
    
    // ==================== SECUREW2 ====================
    securew2: {
        id: "securew2",
        name: "SecureW2",
        company: "SecureW2",
        category: "cloud-radius",
        architecture: "Cloud RADIUS",
        score: 76,
        badges: ["Cloud Native", "Certificate-based"],
        
        deployment: {
            time: 336, // 14 days
            timeDisplay: "14 days",
            method: "Pure Cloud",
            complexity: "Simple",
            professionalServices: 15000,
            training: 0,
            prerequisites: "None"
        },
        
        pricing: {
            model: "Per-user subscription",
            transparent: true,
            perUser: {
                annual: 24
            }
        },
        
        licensing: {
            core: {
                "Cloud RADIUS": { included: true, cost: 0 },
                "Certificate Management": { included: true, cost: 0 },
                "Device Certificates": { included: false, cost: 12, perDevice: true },
                "Managed PKI": { included: false, cost: 5000, annual: true }
            }
        },
        
        infrastructure: {
            required: false
        },
        
        operations: {
            fte: 0.25,
            automation: 85,
            maintenanceWindows: 0,
            patching: "Automatic",
            endOfLife: "N/A - Cloud service"
        },
        
        hiddenCosts: {
            total: 180000,
            breakdown: {
                limitedNACFeatures: 80000,
                noGuestPortal: 40000,
                noCompliance: 60000
            }
        }
    },
    
    // ==================== EXTREMECLOUD IQ ====================
    extreme: {
        id: "extreme",
        name: "ExtremeCloud IQ",
        company: "Extreme Networks",
        category: "cloud-managed",
        architecture: "Cloud-managed",
        score: 74,
        badges: ["Cloud Managed"],
        
        deployment: {
            time: 672, // 28 days
            timeDisplay: "28 days",
            method: "Cloud-managed",
            complexity: "Moderate",
            professionalServices: 45000,
            training: 7000,
            prerequisites: "Extreme infrastructure preferred"
        },
        
        pricing: {
            model: "Subscription",
            transparent: true,
            perDevice: {
                pilot: 24,
                connect: 48,
                copilot: 72
            }
        },
        
        licensing: {
            extremeiq: {
                "Connect": { included: false, cost: 48, perDevice: true },
                "CoPilot": { included: false, cost: 24, perDevice: true },
                "Guest Essentials": { included: false, cost: 12, perDevice: true }
            }
        },
        
        infrastructure: {
            required: false
        },
        
        operations: {
            fte: 0.5,
            automation: 70,
            maintenanceWindows: 0,
            patching: "Automatic",
            endOfLife: "N/A - Cloud service"
        },
        
        hiddenCosts: {
            total: 35000,
            breakdown: {
                vendorLockIn: 20000,
                limitedFeatures: 15000
            }
        }
    },
    
    // ==================== FOXPASS ====================
    foxpass: {
        id: "foxpass",
        name: "Foxpass",
        company: "Foxpass",
        category: "cloud-radius",
        architecture: "Cloud RADIUS",
        score: 72,
        badges: ["Cloud Native", "Simple"],
        
        deployment: {
            time: 336, // 14 days
            timeDisplay: "14 days",
            method: "Cloud RADIUS",
            complexity: "Simple",
            professionalServices: 5000,
            training: 0,
            prerequisites: "None"
        },
        
        pricing: {
            model: "Per-user subscription",
            transparent: true,
            perUser: {
                monthly: 3,
                annual: 30
            }
        },
        
        licensing: {
            core: {
                "RADIUS": { included: true, cost: 0 },
                "LDAP": { included: true, cost: 0 },
                "VPN": { included: true, cost: 0 }
            }
        },
        
        infrastructure: {
            required: false
        },
        
        operations: {
            fte: 0.25,
            automation: 80,
            maintenanceWindows: 0,
            patching: "Automatic",
            endOfLife: "N/A - Cloud service"
        },
        
        hiddenCosts: {
            total: 265000,
            breakdown: {
                basicRadiusOnly: 100000,
                noDeviceProfiling: 50000,
                noCompliance: 75000,
                noGuestAccess: 40000
            }
        }
    },
    
    // ==================== FORTINET FortiNAC ====================
    fortinet: {
        id: "fortinet",
        name: "FortiNAC",
        company: "Fortinet",
        category: "security-integrated",
        architecture: "Physical/Virtual/Cloud",
        score: 68,
        badges: ["Security Suite"],
        
        deployment: {
            time: 1080, // 45 days
            timeDisplay: "45 days",
            method: "Physical/Virtual/Cloud",
            complexity: "Complex",
            professionalServices: 75000,
            training: 10000,
            prerequisites: "Fortinet ecosystem preferred"
        },
        
        pricing: {
            model: "Perpetual + subscription",
            transparent: false,
            perDevice: {
                base: 40,
                plus: 65,
                enterprise: 95
            }
        },
        
        licensing: {
            core: {
                "Base": { included: false, cost: 40, perDevice: true },
                "Plus": { included: false, cost: 65, perDevice: true },
                "IoT": { included: false, cost: 25, perDevice: true },
                "Compliance": { included: false, cost: 35, perDevice: true }
            }
        },
        
        infrastructure: {
            fnac400f: { required: true, cost: 28000, capacity: 5000 },
            database: { required: true, cost: 15000, annual: 3000 }
        },
        
        operations: {
            fte: 1.0,
            automation: 50,
            maintenanceWindows: 16,
            patching: "Quarterly",
            endOfLife: "Hardware refresh every 5 years"
        },
        
        hiddenCosts: {
            total: 75000,
            breakdown: {
                fortinetDependency: 40000,
                integrationLimitations: 35000
            }
        }
    },
    
    // ==================== RADIUS-as-a-Service ====================
    radiusaas: {
        id: "radiusaas",
        name: "RADIUS-as-a-Service",
        company: "Generic Cloud RADIUS",
        category: "cloud-radius",
        architecture: "Cloud RADIUS",
        score: 68,
        badges: ["Cloud Native", "Basic"],
        
        deployment: {
            time: 168, // 7 days
            timeDisplay: "7 days",
            method: "Cloud RADIUS",
            complexity: "Simple",
            professionalServices: 0,
            training: 0,
            prerequisites: "None"
        },
        
        pricing: {
            model: "Subscription",
            transparent: true,
            perDevice: {
                monthly: 2.50,
                annual: 25
            }
        },
        
        licensing: {
            core: {
                "Basic RADIUS": { included: true, cost: 0 },
                "Advanced Features": { included: false, cost: 10, perDevice: true }
            }
        },
        
        infrastructure: {
            required: false
        },
        
        operations: {
            fte: 0.25,
            automation: 75,
            maintenanceWindows: 0,
            patching: "Automatic",
            endOfLife: "N/A - Cloud service"
        },
        
        hiddenCosts: {
            total: 185000,
            breakdown: {
                limitedFeatures: 100000,
                noCompliance: 85000
            }
        }
    },
    
    // ==================== PULSE SECURE ====================
    pulse: {
        id: "pulse",
        name: "Pulse Policy Secure",
        company: "Ivanti",
        category: "legacy-vpn",
        architecture: "Appliance-based",
        score: 66,
        badges: ["VPN-focused"],
        
        deployment: {
            time: 1080, // 45 days
            timeDisplay: "45 days",
            method: "Physical/Virtual appliances",
            complexity: "Complex",
            professionalServices: 65000,
            training: 10000,
            prerequisites: "Network infrastructure"
        },
        
        pricing: {
            model: "Perpetual + support",
            transparent: false,
            perDevice: {
                appliance: 85,
                support: 25
            }
        },
        
        licensing: {
            core: {
                "Base NAC": { included: false, cost: 85, perDevice: true },
                "Advanced NAC": { included: false, cost: 45, perDevice: true },
                "Guest Access": { included: false, cost: 35, perDevice: true }
            }
        },
        
        infrastructure: {
            appliance: { required: true, cost: 45000, quantity: 2 },
            database: { required: true, cost: 20000 }
        },
        
        operations: {
            fte: 1.25,
            automation: 35,
            maintenanceWindows: 20,
            patching: "Quarterly",
            endOfLife: "Hardware refresh every 5 years"
        },
        
        hiddenCosts: {
            total: 95000,
            breakdown: {
                vpnFocus: 45000,
                limitedNAC: 50000
            }
        }
    },
    
    // ==================== PACKETFENCE ====================
    packetfence: {
        id: "packetfence",
        name: "PacketFence",
        company: "Inverse Inc",
        category: "open-source",
        architecture: "On-premise",
        score: 49,
        badges: ["Open Source"],
        
        deployment: {
            time: 1440, // 60 days
            timeDisplay: "60 days",
            method: "On-premise",
            complexity: "Very Complex",
            professionalServices: 150000, // External consultants
            training: 20000,
            prerequisites: "Linux expertise required"
        },
        
        pricing: {
            model: "Open source + support",
            transparent: true,
            perDevice: {
                software: 0,
                support: 35
            }
        },
        
        licensing: {
            core: {
                "Software": { included: true, cost: 0 },
                "Support": { included: false, cost: 35, perDevice: true }
            }
        },
        
        infrastructure: {
            servers: { required: true, cost: 45000, quantity: 3 },
            database: { required: true, cost: 15000 },
            loadBalancer: { required: true, cost: 35000 }
        },
        
        operations: {
            fte: 2.0,
            automation: 20,
            maintenanceWindows: 32,
            patching: "Manual",
            endOfLife: "Self-managed"
        },
        
        hiddenCosts: {
            total: 405000,
            breakdown: {
                implementation: 150000,
                customization: 100000,
                maintenance: 75000,
                lackOfSupport: 80000
            }
        }
    }
};

// Export for use
window.VendorDatabase = window.ComprehensiveVendorDatabase;
console.log('✅ Comprehensive Vendor Database loaded with', Object.keys(window.ComprehensiveVendorDatabase).length, 'vendors');
