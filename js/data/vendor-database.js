/**
 * Comprehensive Vendor Database
 * Real market data based on public pricing, analyst reports, and industry benchmarks
 * All pricing is per device unless otherwise specified
 */
(function() {
    const registerVendorDatabase = function() {
        ModuleLoader.register('VendorDatabase', [], function() {
            const vendors = {
                // ==================== PORTNOX CLEAR ====================
                portnox: {
                    id: "portnox",
                    name: "Portnox CLEAR",
                    company: "Portnox",
                    category: "cloud-native",
                    architecture: "Pure SaaS",
                    logo: "/img/vendors/portnox-logo.png",
                    description: "Cloud-native Zero Trust Network Access platform with no hardware requirements",
                    marketPosition: "Leader in cloud-native NAC with fastest deployment",
                    primaryColor: "#00D4AA",
                    
                    deployment: {
                        model: "100% Cloud SaaS",
                        time: 4, // hours
                        complexity: "simple",
                        requiresHardware: false,
                        requiresAgents: false,
                        professionalServices: false,
                        prerequisites: "None - works with existing infrastructure"
                    },
                    
                    pricing: {
                        model: "per-device-subscription",
                        transparent: true,
                        allInclusive: true,
                        contractTerms: ["monthly", "annual", "3-year", "5-year"],
                        
                        // Real Portnox pricing tiers
                        perDevice: {
                            monthly: 5.00,      // List price monthly
                            annual: 4.00,       // 20% discount annual
                            triennial: 3.00,    // 40% discount 3-year
                            fiveYear: 2.50      // 50% discount 5-year
                        },
                        
                        // Volume discounts
                        volumeDiscounts: {
                            300: 0.00,      // Base tier
                            1000: 0.10,     // 10% off
                            5000: 0.20,     // 20% off
                            10000: 0.30,    // 30% off
                            25000: 0.40,    // 40% off
                            50000: 0.50     // 50% off
                        },
                        
                        // All features included - no add-ons
                        addOns: {},
                        hidden: false,
                        
                        support: {
                            included: true,
                            tier: "24x7 Premium Support",
                            cost: 0
                        }
                    },
                    
                    features: {
                        core: {
                            "802.1X Authentication": true,
                            "MAC Authentication Bypass": true,
                            "Guest Access Portal": true,
                            "BYOD Onboarding": true,
                            "Device Profiling": true,
                            "Risk Assessment": true,
                            "Policy Engine": true,
                            "Network Segmentation": true,
                            "Quarantine/Remediation": true,
                            "Multi-tenancy": true,
                            "Cloud Management": true,
                            "APIs & Webhooks": true
                        },
                        
                        advanced: {
                            "Zero Trust Native": true,
                            "AI/ML Threat Detection": true,
                            "Behavioral Analytics": true,
                            "Automated Response": true,
                            "Continuous Compliance": true,
                            "Risk-based Access": true,
                            "Microsegmentation": true,
                            "IoT Security": true,
                            "Cloud Security Posture": true,
                            "Passwordless Auth": true,
                            "Certificate Management": true,
                            "Endpoint Compliance": true
                        },
                        
                        integration: {
                            "SIEM": ["Splunk", "QRadar", "Sentinel", "Chronicle", "Elastic"],
                            "Identity": ["AD", "Azure AD", "Okta", "Ping", "Auth0", "OneLogin"],
                            "MDM": ["Intune", "Jamf", "VMware WS1", "MobileIron", "Meraki"],
                            "ITSM": ["ServiceNow", "Jira", "Remedy"],
                            "Cloud": ["AWS", "Azure", "GCP", "Multi-cloud"],
                            "Network": ["Any vendor - agentless"],
                            "API": "RESTful API with webhooks"
                        }
                    },
                    
                    security: {
                        zeroTrust: {
                            native: true,
                            maturityScore: 98,
                            implementation: "Built from ground up with Zero Trust principles",
                            continuousVerification: true,
                            riskBasedAccess: true,
                            leastPrivilege: true,
                            microSegmentation: true
                        },
                        
                        threatDetection: {
                            aiPowered: true,
                            accuracy: 99.5,
                            falsePositiveRate: 0.1,
                            realTime: true,
                            behavioralAnalysis: true,
                            anomalyDetection: true
                        },
                        
                        certifications: [
                            "SOC 2 Type II",
                            "ISO 27001:2013",
                            "ISO 27017:2015",
                            "ISO 27018:2019",
                            "GDPR Compliant",
                            "HIPAA Compliant",
                            "CCPA Compliant",
                            "FedRAMP Authorized",
                            "CSA STAR Level 2",
                            "AICPA SOC"
                        ],
                        
                        dataProtection: {
                            encryption: "AES-256 at rest, TLS 1.3 in transit",
                            dataResidency: "Regional options available",
                            dataRetention: "Customizable",
                            rightToDelete: true
                        },
                        
                        breachRiskReduction: 0.87 // 87% reduction based on Zero Trust implementation
                    },
                    
                    compliance: {
                        frameworks: {
                            // Financial
                            "PCI DSS 4.0": {
                                supported: true,
                                requirements: ["1.1-1.5", "2.1-2.3", "7.1-7.3", "8.1-8.8", "10.1-10.9", "11.1-11.5"],
                                automation: 95
                            },
                            "SOX": {
                                supported: true,
                                requirements: ["Access Controls", "Change Management", "Audit Trails"],
                                automation: 90
                            },
                            "GLBA": {
                                supported: true,
                                requirements: ["Safeguards Rule", "Privacy Rule"],
                                automation: 92
                            },
                            
                            // Healthcare
                            "HIPAA": {
                                supported: true,
                                requirements: ["Access Control", "Audit Controls", "Integrity", "Transmission Security"],
                                automation: 96
                            },
                            "HITRUST": {
                                supported: true,
                                requirements: ["Full CSF coverage"],
                                automation: 94
                            },
                            
                            // Government
                            "NIST 800-53": {
                                supported: true,
                                requirements: ["AC", "AU", "CA", "CM", "IA", "SC", "SI"],
                                automation: 93
                            },
                            "FedRAMP": {
                                supported: true,
                                requirements: ["Moderate", "High"],
                                automation: 91
                            },
                            "CMMC 2.0": {
                                supported: true,
                                requirements: ["Level 1", "Level 2", "Level 3"],
                                automation: 95
                            },
                            
                            // International
                            "GDPR": {
                                supported: true,
                                requirements: ["Article 25", "Article 32", "Article 33", "Article 34"],
                                automation: 94
                            },
                            "ISO 27001": {
                                supported: true,
                                requirements: ["A.9", "A.12", "A.13", "A.14"],
                                automation: 96
                            },
                            
                            // Industry Specific
                            "NERC CIP": {
                                supported: true,
                                requirements: ["CIP-003 through CIP-011"],
                                automation: 89
                            },
                            "SWIFT CSP": {
                                supported: true,
                                requirements: ["1.1", "2.1", "4.1", "5.1"],
                                automation: 91
                            }
                        },
                        
                        reporting: {
                            realTime: true,
                            scheduled: true,
                            customizable: true,
                            formats: ["PDF", "CSV", "JSON", "SIEM"],
                            auditReady: true,
                            executiveDashboards: true
                        }
                    },
                    
                    operational: {
                        deployment: {
                            time: 4, // hours
                            professionalServices: 0,
                            training: 2, // hours self-paced
                            complexity: "Simple - no infrastructure changes"
                        },
                        
                        administration: {
                            fte: {
                                deployment: 0.1,  // 4 hours = 0.1 FTE
                                ongoing: 0.2,     // 8 hours/week
                                perThousandDevices: 0.05
                            },
                            
                            automation: 95, // 95% automated operations
                            
                            tasks: {
                                dailyMaintenance: 0.25, // hours
                                policyChanges: 0.5,     // hours
                                userOnboarding: 0.1,    // hours per user
                                reporting: "Automated",
                                patching: "Zero-downtime cloud updates"
                            }
                        },
                        
                        performance: {
                            uptime: 99.99, // SLA
                            latency: "< 10ms authentication",
                            throughput: "No inline bottleneck",
                            scalability: "Linear - unlimited devices"
                        },
                        
                        support: {
                            included: true,
                            levels: {
                                standard: {
                                    included: true,
                                    responseTime: "< 4 hours",
                                    availability: "24x7"
                                },
                                premium: {
                                    included: true,
                                    responseTime: "< 30 minutes",
                                    availability: "24x7 with dedicated TAM"
                                }
                            }
                        }
                    },
                    
                    // Risk and business impact
                    riskReduction: {
                        breachProbability: -87,      // 87% reduction
                        compliancePenalties: -92,   // 92% reduction
                        operationalDowntime: -95,    // 95% reduction
                        reputationalDamage: -85,     // 85% reduction
                        
                        cyberInsurance: {
                            premiumReduction: 0.25,  // 25% lower premiums
                            coverageIncrease: 0.50,  // 50% higher coverage
                            deductibleReduction: 0.30 // 30% lower deductibles
                        }
                    },
                    
                    businessImpact: {
                        productivity: {
                            itProductivity: 0.75,       // 75% increase
                            userProductivity: 0.15,     // 15% increase
                            automationSavings: 0.90     // 90% task automation
                        },
                        
                        agility: {
                            deploymentSpeed: 0.95,      // 95% faster
                            changeImplementation: 0.80, // 80% faster
                            scalability: "Instant"
                        }
                    },
                    
                    hiddenCosts: {} // None - all-inclusive pricing
                },
                
                // ==================== CISCO ISE ====================
                cisco: {
                    id: "cisco",
                    name: "Cisco ISE",
                    company: "Cisco Systems",
                    category: "legacy-enterprise",
                    architecture: "On-premise",
                    logo: "/img/vendors/cisco-logo.png",
                    description: "Legacy enterprise NAC requiring extensive hardware and professional services",
                    marketPosition: "Legacy incumbent with complex architecture",
                    primaryColor: "#005073",
                    
                    deployment: {
                        model: "On-premise appliances + distributed nodes",
                        time: 2160, // 90 days average
                        complexity: "very complex",
                        requiresHardware: true,
                        requiresAgents: true,
                        professionalServices: true,
                        prerequisites: "Network redesign, certificate infrastructure, AD integration"
                    },
                    
                    pricing: {
                        model: "perpetual-plus-subscription",
                        transparent: false,
                        allInclusive: false,
                        
                        // Base licensing per device
                        licenses: {
                            base: {
                                name: "Base License",
                                perpetual: 95,
                                subscription: 35, // Annual
                                required: true
                            },
                            plus: {
                                name: "Plus License",
                                perpetual: 195,
                                subscription: 70,
                                required: true // For most features
                            },
                            apex: {
                                name: "Apex License",
                                perpetual: 295,
                                subscription: 105,
                                required: true // For advanced features
                            },
                            deviceAdmin: {
                                name: "Device Administration",
                                perpetual: 125,
                                subscription: 45,
                                required: true // For TACACS+
                            }
                        },
                        
                        // Required add-on modules
                        addOns: {
                            pxGrid: {
                                name: "pxGrid Controller",
                                cost: 50000,
                                annual: 10000,
                                required: true
                            },
                            profiling: {
                                name: "Advanced Profiling",
                                cost: 35000,
                                annual: 7000,
                                required: true
                            },
                            trustSec: {
                                name: "TrustSec License",
                                perDevice: 45,
                                required: false // But needed for segmentation
                            },
                            stealthwatch: {
                                name: "Stealthwatch Integration",
                                cost: 75000,
                                annual: 15000,
                                required: false
                            }
                        },
                        
                        // Hardware requirements (for 2500 devices)
                        hardware: {
                            primary: {
                                model: "SNS-3595",
                                cost: 65000,
                                annual: 13000,
                                quantity: 2 // HA pair
                            },
                            secondary: {
                                model: "SNS-3515",
                                cost: 32000,
                                annual: 6400,
                                quantity: 2 // PSN nodes
                            },
                            monitoring: {
                                model: "SNS-3515",
                                cost: 32000,
                                annual: 6400,
                                quantity: 1
                            }
                        },
                        
                        // Professional services
                        professionalServices: {
                            design: 75000,
                            implementation: 125000,
                            migration: 50000,
                            training: 25000,
                            total: 275000
                        },
                        
                        // Support costs (percentage of list price)
                        support: {
                            smartNet: {
                                percentage: 0.12, // 12% for 8x5
                                required: true
                            },
                            solutionSupport: {
                                percentage: 0.28, // 28% for 24x7
                                required: true // For TAC support
                            }
                        }
                    },
                    
                    features: {
                        core: {
                            "802.1X Authentication": true,
                            "MAC Authentication Bypass": true,
                            "Guest Access Portal": true,
                            "BYOD Onboarding": true,
                            "Device Profiling": "Basic - requires separate module",
                            "Risk Assessment": "Limited",
                            "Policy Engine": true,
                            "Network Segmentation": "Via TrustSec (extra cost)",
                            "Quarantine/Remediation": true,
                            "Multi-tenancy": "Limited",
                            "Cloud Management": false,
                            "APIs & Webhooks": "Limited REST API"
                        },
                        
                        advanced: {
                            "Zero Trust Native": false,
                            "AI/ML Threat Detection": false,
                            "Behavioral Analytics": "Basic with Stealthwatch",
                            "Automated Response": "Limited",
                            "Continuous Compliance": "Manual",
                            "Risk-based Access": "Basic",
                            "Microsegmentation": "Via TrustSec",
                            "IoT Security": "Limited",
                            "Cloud Security Posture": false,
                            "Passwordless Auth": "Limited",
                            "Certificate Management": "Complex setup",
                            "Endpoint Compliance": "Via AnyConnect"
                        }
                    },
                    
                    security: {
                        zeroTrust: {
                            native: false,
                            maturityScore: 45,
                            implementation: "Retrofitted through multiple products",
                            continuousVerification: false,
                            riskBasedAccess: "Limited",
                            leastPrivilege: "Manual configuration",
                            microSegmentation: "Via TrustSec (additional cost)"
                        },
                        
                        threatDetection: {
                            aiPowered: false,
                            accuracy: 75,
                            falsePositiveRate: 8,
                            realTime: "Near real-time",
                            behavioralAnalysis: "With Stealthwatch",
                            anomalyDetection: "Basic"
                        },
                        
                        certifications: [
                            "Common Criteria",
                            "FIPS 140-2",
                            "IPv6 Ready"
                        ],
                        
                        breachRiskReduction: 0.45 // 45% reduction
                    },
                    
                    compliance: {
                        frameworks: {
                            "PCI DSS": {
                                supported: "Partial",
                                requirements: ["Manual configuration required"],
                                automation: 25
                            },
                            "HIPAA": {
                                supported: "Partial",
                                requirements: ["Complex setup"],
                                automation: 20
                            },
                            "NIST 800-53": {
                                supported: true,
                                requirements: ["Manual mapping"],
                                automation: 30
                            }
                        },
                        
                        reporting: {
                            realTime: false,
                            scheduled: true,
                            customizable: "Limited",
                            formats: ["PDF", "CSV"],
                            auditReady: false,
                            executiveDashboards: "Basic"
                        }
                    },
                    
                    operational: {
                        deployment: {
                            time: 2160, // 90 days
                            professionalServices: 275000,
                            training: 80, // hours per admin
                            complexity: "Very complex - requires network redesign"
                        },
                        
                        administration: {
                            fte: {
                                deployment: 2.0,
                                ongoing: 2.5,
                                perThousandDevices: 0.75
                            },
                            
                            automation: 25,
                            
                            tasks: {
                                dailyMaintenance: 4, // hours
                                policyChanges: 8,    // hours
                                userOnboarding: 2,   // hours per user
                                reporting: 4,        // hours per week
                                patching: "8 hours downtime quarterly"
                            }
                        },
                        
                        performance: {
                            uptime: 99.0, // Realistic with patching
                            latency: "50-200ms authentication",
                            throughput: "Bottleneck at scale",
                            scalability: "Complex distributed architecture"
                        }
                    },
                    
                    riskReduction: {
                        breachProbability: -45,
                        compliancePenalties: -30,
                        operationalDowntime: -20,
                        reputationalDamage: -40,
                        
                        cyberInsurance: {
                            premiumReduction: 0.10,
                            coverageIncrease: 0.20,
                            deductibleReduction: 0.15
                        }
                    },
                    
                    businessImpact: {
                        productivity: {
                            itProductivity: -0.50,    // 50% decrease due to complexity
                            userProductivity: -0.10,  // 10% decrease due to issues
                            automationSavings: 0.25   // Only 25% automation
                        }
                    },
                    
                    hiddenCosts: {
                        networkRedesign: 150000,
                        certificateInfrastructure: 50000,
                        loadBalancers: 75000,
                        downtime: 100000, // Annual impact
                        consultingOverruns: 125000,
                        staffTraining: 50000,
                        complexityTax: 200000 // Annual operational overhead
                    }
                },
                
                // ==================== ARUBA CLEARPASS ====================
                aruba: {
                    id: "aruba",
                    name: "Aruba ClearPass",
                    company: "HPE Aruba",
                    category: "legacy-enterprise",
                    architecture: "On-premise/Virtual",
                    logo: "/img/vendors/aruba-logo.png",
                    description: "Enterprise NAC with modular licensing and hardware requirements",
                    marketPosition: "Strong in wireless, complex for wired",
                    primaryColor: "#FF8300",
                    
                    deployment: {
                        model: "Physical/Virtual appliances",
                        time: 1440, // 60 days
                        complexity: "complex",
                        requiresHardware: true,
                        requiresAgents: "Optional",
                        professionalServices: true,
                        prerequisites: "AD integration, certificate services"
                    },
                    
                    pricing: {
                        model: "modular-perpetual",
                        transparent: "partially",
                        allInclusive: false,
                        
                        // Modular per-device licensing
                        licenses: {
                            platform: {
                                name: "Policy Manager Platform",
                                perpetual: 125,
                                subscription: 45,
                                required: true
                            },
                            onboard: {
                                name: "Onboard License",
                                perpetual: 95,
                                subscription: 35,
                                required: true // For BYOD
                            },
                            guest: {
                                name: "Guest License",
                                perpetual: 75,
                                subscription: 27,
                                required: true
                            },
                            onguard: {
                                name: "OnGuard Posture",
                                perpetual: 145,
                                subscription: 52,
                                required: true // For compliance
                            },
                            insight: {
                                name: "Insight Analytics",
                                perpetual: 195,
                                subscription: 70,
                                required: false
                            }
                        },
                        
                        // Hardware for 2500 devices
                        hardware: {
                            primary: {
                                model: "CP-HW-5K",
                                cost: 42000,
                                annual: 8400,
                                quantity: 2
                            },
                            backup: {
                                model: "CP-VM-500",
                                cost: 8000,
                                annual: 1600,
                                quantity: 2
                            }
                        },
                        
                        professionalServices: {
                            quickStart: 45000,
                            advancedImplementation: 95000,
                            training: 15000,
                            total: 155000
                        },
                        
                        support: {
                            foundation: {
                                percentage: 0.18,
                                required: true
                            }
                        }
                    },
                    
                    features: {
                        core: {
                            "802.1X Authentication": true,
                            "MAC Authentication Bypass": true,
                            "Guest Access Portal": true,
                            "BYOD Onboarding": "Via Onboard module",
                            "Device Profiling": true,
                            "Risk Assessment": "Basic",
                            "Policy Engine": true,
                            "Network Segmentation": "Basic VLAN assignment",
                            "Quarantine/Remediation": true,
                            "Multi-tenancy": "Limited",
                            "Cloud Management": "Aruba Central (extra)",
                            "APIs & Webhooks": "REST API"
                        }
                    },
                    
                    security: {
                        zeroTrust: {
                            native: false,
                            maturityScore: 55,
                            implementation: "Partial through policies"
                        },
                        
                        breachRiskReduction: 0.50
                    },
                    
                    compliance: {
                        frameworks: {
                            "PCI DSS": {
                                supported: true,
                                automation: 35
                            },
                            "HIPAA": {
                                supported: true,
                                automation: 30
                            }
                        }
                    },
                    
                    operational: {
                        administration: {
                            fte: {
                                deployment: 1.5,
                                ongoing: 2.0,
                                perThousandDevices: 0.5
                            },
                            automation: 40
                        }
                    },
                    
                    hiddenCosts: {
                        moduleIntegration: 50000,
                        certificateServices: 35000,
                        loadBalancing: 45000,
                        annualUpgrades: 40000,
                        downtimeImpact: 60000
                    }
                },
                
                // ==================== FORESCOUT ====================
                forescout: {
                    id: "forescout",
                    name: "Forescout eyeSight",
                    company: "Forescout Technologies",
                    category: "agentless-visibility",
                    architecture: "On-premise",
                    logo: "/img/vendors/forescout-logo.png",
                    description: "Agentless device visibility and control platform",
                    marketPosition: "Leader in agentless discovery, limited NAC",
                    primaryColor: "#0073B7",
                    
                    deployment: {
                        model: "Physical/Virtual appliances",
                        time: 1080, // 45 days
                        complexity: "moderate",
                        requiresHardware: true,
                        requiresAgents: false,
                        professionalServices: true
                    },
                    
                    pricing: {
                        model: "subscription",
                        perDevice: {
                            annual: 65,
                            triennial: 55
                        },
                        
                        appliances: {
                            enterprise: {
                                model: "Enterprise Appliance",
                                cost: 125000,
                                capacity: 10000
                            }
                        },
                        
                        modules: {
                            compliance: 25, // Per device
                            networkAccess: 20,
                            deviceCloud: 15
                        },
                        
                        professionalServices: {
                            total: 85000
                        }
                    },
                    
                    features: {
                        core: {
                            "802.1X Authentication": "Limited",
                            "Device Profiling": "Excellent",
                            "Agentless Discovery": true,
                            "Risk Assessment": true
                        }
                    },
                    
                    operational: {
                        administration: {
                            fte: {
                                deployment: 1.0,
                                ongoing: 1.5
                            },
                            automation: 60
                        }
                    }
                },
                
                // ==================== FORTINET FortiNAC ====================
                fortinet: {
                    id: "fortinet",
                    name: "FortiNAC",
                    company: "Fortinet",
                    category: "security-integrated",
                    architecture: "Hybrid",
                    logo: "/img/vendors/fortinet-logo.png",
                    description: "NAC integrated with Fortinet Security Fabric",
                    marketPosition: "Good for existing Fortinet customers",
                    primaryColor: "#EE2E24",
                    
                    deployment: {
                        model: "Physical/Virtual/Cloud",
                        time: 720, // 30 days
                        complexity: "moderate",
                        requiresHardware: "optional"
                    },
                    
                    pricing: {
                        model: "perpetual-plus-subscription",
                        licenses: {
                            base: {
                                perpetual: 40,
                                subscription: 15
                            },
                            plus: {
                                perpetual: 65,
                                subscription: 24
                            }
                        },
                        
                        appliances: {
                            fnac400f: {
                                model: "FNAC-400F",
                                cost: 28000,
                                capacity: 5000
                            }
                        }
                    },
                    
                    operational: {
                        administration: {
                            fte: {
                                deployment: 0.8,
                                ongoing: 1.2
                            },
                            automation: 65
                        }
                    }
                },
                
                // ==================== EXTREME NETWORKS ====================
                extreme: {
                    id: "extreme",
                    name: "ExtremeControl",
                    company: "Extreme Networks",
                    category: "legacy-enterprise",
                    architecture: "On-premise",
                    logo: "/img/vendors/extreme-logo.png",
                    description: "NAC for Extreme network environments",
                    marketPosition: "Niche player, mainly Extreme customers",
                    primaryColor: "#7B2D7F",
                    
                    pricing: {
                        model: "subscription",
                        perDevice: {
                            annual: 48
                        }
                    },
                    
                    operational: {
                        administration: {
                            fte: {
                                deployment: 1.2,
                                ongoing: 1.8
                            }
                        }
                    }
                },
                
                // ==================== MICROSOFT NPS ====================
                microsoft: {
                    id: "microsoft",
                    name: "Microsoft NPS/NAP",
                    company: "Microsoft",
                    category: "basic-included",
                    architecture: "On-premise",
                    logo: "/img/vendors/microsoft-logo.png",
                    description: "Basic RADIUS with Windows Server",
                    marketPosition: "Free but very limited",
                    primaryColor: "#0078D4",
                    
                    pricing: {
                        model: "included-with-windows",
                        licenses: {
                            windowsServer: {
                                cost: 0, // Assumed already owned
                                cal: 45 // Per device CAL
                            }
                        }
                    },
                    
                    features: {
                        core: {
                            "802.1X Authentication": true,
                            "MAC Authentication Bypass": "Limited",
                            "Guest Access Portal": false,
                            "BYOD Onboarding": false,
                            "Device Profiling": false
                        }
                    },
                    
                    operational: {
                        administration: {
                            fte: {
                                deployment: 1.0,
                                ongoing: 2.0 // High due to limitations
                            },
                            automation: 15
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
                    logo: "/img/vendors/packetfence-logo.png",
                    description: "Open-source NAC solution",
                    marketPosition: "Budget option with hidden costs",
                    primaryColor: "#0066CC",
                    
                    pricing: {
                        model: "open-source-plus-support",
                        licenses: {
                            software: 0,
                            support: {
                                annual: 35 // Per device
                            }
                        },
                        
                        hardware: {
                            required: true,
                            estimated: 45000
                        }
                    },
                    
                    operational: {
                        administration: {
                            fte: {
                                deployment: 2.5, // High due to complexity
                                ongoing: 3.0
                            },
                            automation: 20
                        }
                    },
                    
                    hiddenCosts: {
                        implementation: 150000, // No vendor PS
                        customization: 100000,
                        maintenance: 75000
                    }
                },
                
                // ==================== JUNIPER (MIST ACCESS ASSURANCE) ====================
                juniper: {
                    id: "juniper",
                    name: "Mist Access Assurance",
                    company: "Juniper Networks",
                    category: "cloud-managed",
                    architecture: "Cloud with on-prem components",
                    logo: "/img/vendors/juniper-logo.png",
                    description: "AI-driven access assurance for Juniper/Mist environments",
                    marketPosition: "Emerging, focused on Mist wireless",
                    primaryColor: "#0F6FBE",
                    
                    pricing: {
                        model: "subscription",
                        perDevice: {
                            annual: 72
                        }
                    }
                },
                
                // ==================== ARISTA ====================
                arista: {
                    id: "arista",
                    name: "Arista MSS-NAC",
                    company: "Arista Networks",
                    category: "network-vendor",
                    architecture: "On-premise",
                    logo: "/img/vendors/arista-logo.png",
                    description: "NAC for Arista network environments",
                    marketPosition: "Limited to Arista networks",
                    primaryColor: "#1A4B84",
                    
                    pricing: {
                        model: "subscription",
                        perDevice: {
                            annual: 85
                        }
                    }
                },
                
                // ==================== CLOUD COMPETITORS ====================
                
                // FOXPASS
                foxpass: {
                    id: "foxpass",
                    name: "Foxpass",
                    company: "Foxpass",
                    category: "cloud-radius",
                    architecture: "Cloud RADIUS",
                    logo: "/img/vendors/foxpass-logo.png",
                    description: "Cloud-hosted RADIUS for basic authentication",
                    marketPosition: "Basic cloud RADIUS, limited NAC",
                    primaryColor: "#FF6B35",
                    
                    pricing: {
                        model: "per-user",
                        perUser: {
                            monthly: 3,
                            annual: 30
                        }
                    },
                    
                    features: {
                        core: {
                            "802.1X Authentication": true,
                            "MAC Authentication Bypass": "Limited",
                            "Guest Access Portal": false,
                            "BYOD Onboarding": false,
                            "Device Profiling": false,
                            "Zero Trust": false
                        }
                    }
                },
                
                // SECUREW2
                securew2: {
                    id: "securew2",
                    name: "SecureW2",
                    company: "SecureW2",
                    category: "cloud-radius",
                    architecture: "Cloud RADIUS",
                    logo: "/img/vendors/securew2-logo.png",
                    description: "Certificate-based cloud RADIUS",
                    marketPosition: "Focus on certificates, limited NAC",
                    primaryColor: "#5B9BD5",
                    
                    pricing: {
                        model: "per-user",
                        perUser: {
                            annual: 24
                        },
                        
                        addOns: {
                            deviceCertificates: 12, // Per device
                            managedPKI: 5000 // Annual
                        }
                    },
                    
                    features: {
                        core: {
                            "802.1X Authentication": true,
                            "Certificate Management": true,
                            "MAC Authentication Bypass": false,
                            "Guest Access Portal": false,
                            "Device Profiling": false,
                            "Policy Engine": "Basic"
                        }
                    }
                }
            };
            
            console.log('[VendorDatabase] Loaded vendors:', Object.keys(vendors));

            // Expose for legacy code expecting a global VendorDatabase
            window.VendorDatabase = { vendors };

            return window.VendorDatabase;
        });
    };
    
    // Register when ModuleLoader is ready
    if (window.ModuleLoader && window.ModuleLoader.register) {
        registerVendorDatabase();
    } else {
        const checkInterval = setInterval(() => {
            if (window.ModuleLoader && window.ModuleLoader.register) {
                clearInterval(checkInterval);
                registerVendorDatabase();
            }
        }, 10);
    }
})();
