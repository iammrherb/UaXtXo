// Comprehensive Vendor Database - All 13 Vendors with Complete Pricing
window.VendorDatabase = {
    // PORTNOX CLEAR - Cloud-Native Zero Trust Leader
    portnox: {
        id: 'portnox',
        name: 'Portnox CLEAR',
        vendor: 'Portnox',
        category: 'Cloud-Native Zero Trust NAC',
        deployment: 'Pure Cloud SaaS',
        featured: true,
        
        pricing: {
            model: 'Simple Per-Device',
            transparency: 'Full',
            perDevice: {
                monthly: 4.00,
                annual: 3.40,
                triennial: 2.80,
                fiveYear: 2.20
            },
            volumeDiscounts: {
                100: 0,
                500: 5,
                1000: 10,
                2500: 15,
                5000: 20,
                10000: 25,
                25000: 30,
                50000: 35
            },
            addOns: {
                'Advanced Threat Protection': { perDevice: 1.50, description: 'AI-powered threat detection with behavioral analytics' },
                'Compliance Automation Suite': { perDevice: 1.00, description: 'Automated compliance reporting and continuous monitoring' },
                'Incident Response Orchestration': { perDevice: 0.75, description: 'Automated incident response workflows' }
            }
        },
        
        costs: {
            hardware: 0,
            implementation: 0,
            training: 0,
            support: 0,
            hidden: 0,
            infrastructure: 0,
            certificates: 0,
            integration: 0,
            downtime: 0
        },
        
        deployment: {
            time: 4, // hours
            model: 'Cloud',
            complexity: 'Simple',
            professionalServices: false,
            requiresHardware: false,
            requiresInfrastructure: false
        },
        
        features: {
            zeroTrust: { 
                native: true, 
                score: 98,
                capabilities: {
                    'Continuous Verification': true,
                    'Risk-Based Access': true,
                    'Microsegmentation': true,
                    'Identity-Centric': true,
                    'Device Trust': true,
                    'Contextual Access': true,
                    'Behavioral Analytics': true,
                    'Threat Intelligence': true
                }
            },
            cloudNative: true,
            automation: 95,
            compliance: {
                frameworks: ['SOC 2 Type II', 'ISO 27001', 'ISO 27017', 'ISO 27018', 'HIPAA', 'GDPR', 'PCI DSS', 
                            'NIST 800-53', 'NIST CSF', 'FedRAMP Ready', 'CMMC L1-L3', 'CCPA', 'FERPA', 'GLBA', 
                            'NERC CIP', 'TISAX', 'CIS Controls v8', 'SWIFT CSP', 'UK Cyber Essentials Plus', 
                            'Australia ASD Essential 8', 'Singapore PDPA', 'Japan PIPA', 'Brazil LGPD',
                            'Canada PIPEDA', 'HITRUST CSF', 'StateRAMP', 'CJIS', 'IRS 1075', 'FTI'],
                automation: 95,
                continuousCompliance: true,
                auditReporting: 'Real-time'
            },
            security: {
                aiThreatDetection: true,
                mlBehavioralAnalysis: true,
                mttr: 5, // minutes
                accuracy: 99.5,
                falsePositiveRate: 0.1,
                threatIntelligence: 'Real-time feeds',
                incidentResponse: 'Automated'
            }
        },
        
        operational: {
            fteRequired: 0.25,
            maintenanceWindows: 0,
            updates: 'Continuous',
            uptime: 99.99,
            supportSLA: '15 minutes',
            scalability: 'Unlimited'
        },
        
        riskReduction: {
            breachProbability: 0.85,
            complianceViolation: 0.90,
            operationalRisk: 0.80,
            reputationalRisk: 0.75
        },
        
        cyberInsurance: {
            premiumReduction: 35,
            coverageIncrease: 50,
            deductibleReduction: 40
        }
    },
    
    // CISCO ISE - Legacy Enterprise NAC
    cisco: {
        id: 'cisco',
        name: 'Cisco ISE',
        vendor: 'Cisco Systems',
        category: 'Legacy Enterprise NAC',
        deployment: 'On-Premise',
        
        pricing: {
            model: 'Complex Tiered + Hardware',
            transparency: 'Low',
            licenses: {
                base: { perpetual: 295, features: 'Basic 802.1X only' },
                plus: { perpetual: 495, features: 'Adds Profiling, Guest' },
                apex: { perpetual: 695, features: 'Full features', required: true },
                deviceAdmin: { perpetual: 125, features: 'TACACS+' }
            },
            hardware: {
                'SNS-3515': { cost: 28000, capacity: 2000, support: 5040 },
                'SNS-3595': { cost: 55000, capacity: 5000, support: 9900 },
                'SNS-3615': { cost: 95000, capacity: 10000, support: 17100 },
                'SNS-3655': { cost: 145000, capacity: 20000, support: 26100 }
            },
            maintenance: { 
                smartNet: 0.18,
                software: 0.22
            },
            addOns: {
                'pxGrid Controller': { cost: 50000, required: true },
                'TrustSec Licenses': { cost: 35000, required: true },
                'StealthWatch Integration': { cost: 75000 },
                'AnyConnect Licenses': { perUser: 45 },
                'Umbrella Integration': { cost: 40000 },
                'Secure Network Analytics': { cost: 85000 }
            }
        },
        
        costs: {
            implementation: 120000,
            training: 19980,
            hidden: 315000,
            infrastructure: 85000,
            certificates: 35000,
            integration: 125000,
            downtime: 175000
        },
        
        deployment: {
            time: 2160, // 90 days
            model: 'On-Premise',
            complexity: 'Very Complex',
            professionalServices: true,
            requiresHardware: true,
            requiresInfrastructure: true
        },
        
        features: {
            zeroTrust: { 
                native: false, 
                score: 65,
                capabilities: {
                    'Continuous Verification': false,
                    'Risk-Based Access': 'Limited',
                    'Microsegmentation': true,
                    'Identity-Centric': true,
                    'Device Trust': 'Basic',
                    'Contextual Access': 'Limited',
                    'Behavioral Analytics': false,
                    'Threat Intelligence': 'Manual'
                }
            },
            cloudNative: false,
            automation: 25,
            compliance: {
                frameworks: ['SOC 2', 'ISO 27001', 'HIPAA', 'PCI DSS', 'NIST', 'FedRAMP', 'FIPS 140-2'],
                automation: 30,
                continuousCompliance: false,
                auditReporting: 'Manual'
            },
            security: {
                aiThreatDetection: false,
                mlBehavioralAnalysis: false,
                mttr: 240,
                accuracy: 85,
                falsePositiveRate: 15,
                threatIntelligence: 'Periodic updates',
                incidentResponse: 'Manual'
            }
        },
        
        operational: {
            fteRequired: 2.5,
            maintenanceWindows: 12,
            updates: 'Quarterly',
            uptime: 99.5,
            supportSLA: '4 hours',
            scalability: 'Hardware limited'
        },
        
        riskReduction: {
            breachProbability: 0.60,
            complianceViolation: 0.55,
            operationalRisk: 0.40,
            reputationalRisk: 0.45
        },
        
        cyberInsurance: {
            premiumReduction: 10,
            coverageIncrease: 15,
            deductibleReduction: 5
        }
    },
    
    // ARUBA CLEARPASS
    aruba: {
        id: 'aruba',
        name: 'Aruba ClearPass',
        vendor: 'HPE Aruba',
        category: 'Legacy Enterprise NAC',
        deployment: 'On-Premise/Virtual',
        
        pricing: {
            model: 'Modular Licensing',
            transparency: 'Medium',
            modules: {
                base: { perpetual: 225, name: 'Policy Manager Base' },
                onboard: { perpetual: 125, name: 'Onboard Module' },
                guest: { perpetual: 95, name: 'Guest Module' },
                onguard: { perpetual: 175, name: 'OnGuard Health' },
                insight: { perpetual: 195, name: 'Insight Analytics' },
                deviceInsight: { perpetual: 150, name: 'Device Insight' }
            },
            totalPerDevice: 965, // All modules
            hardware: {
                'C1000V': { cost: 8000, capacity: 1000, type: 'Virtual' },
                'CP-HW-5K': { cost: 35000, capacity: 5000 },
                'CP-HW-10K': { cost: 55000, capacity: 10000 },
                'CP-HW-25K': { cost: 95000, capacity: 25000 }
            },
            maintenance: { annual: 0.20 }
        },
        
        costs: {
            implementation: 45000,
            training: 6000,
            hidden: 125000,
            infrastructure: 45000,
            certificates: 15000,
            integration: 55000,
            downtime: 85000
        },
        
        deployment: {
            time: 1008, // 42 days
            model: 'Hybrid',
            complexity: 'Complex',
            professionalServices: true,
            requiresHardware: true,
            requiresInfrastructure: true
        },
        
        features: {
            zeroTrust: { native: false, score: 60 },
            cloudNative: false,
            automation: 35,
            compliance: {
                frameworks: ['SOC 2', 'ISO 27001', 'HIPAA', 'PCI DSS', 'GDPR'],
                automation: 35,
                continuousCompliance: false,
                auditReporting: 'Scheduled'
            },
            security: {
                aiThreatDetection: false,
                mlBehavioralAnalysis: false,
                mttr: 180,
                accuracy: 82,
                falsePositiveRate: 18,
                threatIntelligence: 'Manual updates',
                incidentResponse: 'Semi-manual'
            }
        },
        
        operational: {
            fteRequired: 1.5,
            maintenanceWindows: 8,
            updates: 'Quarterly',
            uptime: 99.7,
            supportSLA: '4 hours',
            scalability: 'Appliance limited'
        },
        
        riskReduction: {
            breachProbability: 0.55,
            complianceViolation: 0.50,
            operationalRisk: 0.45,
            reputationalRisk: 0.40
        },
        
        cyberInsurance: {
            premiumReduction: 8,
            coverageIncrease: 10,
            deductibleReduction: 5
        }
    },
    
    // FORESCOUT
    forescout: {
        id: 'forescout',
        name: 'Forescout eyeSight',
        vendor: 'Forescout',
        category: 'Agentless NAC',
        deployment: 'On-Premise/Hybrid',
        
        pricing: {
            model: 'Platform + Modules',
            transparency: 'Low',
            platform: { 
                base: 30000, 
                perDevice: 85,
                subscription: 'Annual'
            },
            modules: {
                connect: { cost: 15000, name: 'eyeConnect' },
                control: { cost: 20000, name: 'eyeControl' },
                extended: { cost: 15000, name: 'eyeExtended' },
                cloud: { cost: 15000, name: 'Cloud Visibility' },
                ot: { cost: 25000, name: 'OT Security' },
                compliance: { cost: 18000, name: 'Compliance Module' }
            },
            hardware: {
                'CT-1000': { cost: 20000, capacity: 1000 },
                'CT-5000': { cost: 45000, capacity: 5000 },
                'CT-10K': { cost: 75000, capacity: 10000 },
                'Enterprise Manager': { cost: 35000 }
            }
        },
        
        costs: {
            implementation: 60000,
            training: 8000,
            hidden: 95000,
            infrastructure: 35000,
            certificates: 10000,
            integration: 45000,
            downtime: 65000
        },
        
        deployment: {
            time: 1344, // 56 days
            model: 'On-Premise',
            complexity: 'Medium-Complex',
            professionalServices: true,
            requiresHardware: true,
            requiresInfrastructure: true
        },
        
        features: {
            zeroTrust: { native: false, score: 55 },
            cloudNative: false,
            automation: 45,
            compliance: {
                frameworks: ['SOC 2', 'ISO 27001', 'HIPAA', 'NIST'],
                automation: 40,
                continuousCompliance: false,
                auditReporting: 'Periodic'
            },
            security: {
                aiThreatDetection: false,
                mlBehavioralAnalysis: 'Limited',
                mttr: 120,
                accuracy: 80,
                falsePositiveRate: 20,
                threatIntelligence: 'Subscription based',
                incidentResponse: 'Workflow based'
            }
        },
        
        operational: {
            fteRequired: 1.25,
            maintenanceWindows: 6,
            updates: 'Quarterly',
            uptime: 99.8,
            supportSLA: '4 hours',
            scalability: 'Scale-out architecture'
        },
        
        riskReduction: {
            breachProbability: 0.50,
            complianceViolation: 0.45,
            operationalRisk: 0.50,
            reputationalRisk: 0.45
        },
        
        cyberInsurance: {
            premiumReduction: 7,
            coverageIncrease: 8,
            deductibleReduction: 3
        }
    },
    
    // Continue with remaining vendors...
    // EXTREME NETWORKS
    extreme: {
        id: 'extreme',
        name: 'ExtremeControl',
        vendor: 'Extreme Networks',
        category: 'Legacy Enterprise NAC',
        deployment: 'On-Premise',
        
        pricing: {
            model: 'Tiered Licensing',
            transparency: 'Medium',
            tiers: {
                base: { perpetual: 195 },
                advanced: { perpetual: 295 },
                enterprise: { perpetual: 385 }
            },
            hardware: {
                'NAC-S4': { cost: 25000, capacity: 5000 },
                'NAC-S6': { cost: 45000, capacity: 10000 },
                'NAC-S8': { cost: 75000, capacity: 25000 }
            },
            maintenance: { annual: 0.18 }
        },
        
        costs: {
            implementation: 35000,
            training: 5000,
            hidden: 75000,
            infrastructure: 25000,
            certificates: 8000,
            integration: 30000,
            downtime: 55000
        },
        
        deployment: {
            time: 720, // 30 days
            model: 'On-Premise',
            complexity: 'Medium',
            professionalServices: true,
            requiresHardware: true,
            requiresInfrastructure: true
        },
        
        features: {
            zeroTrust: { native: false, score: 50 },
            cloudNative: false,
            automation: 40,
            compliance: {
                frameworks: ['SOC 2', 'ISO 27001', 'HIPAA'],
                automation: 25,
                continuousCompliance: false,
                auditReporting: 'Manual'
            },
            security: {
                aiThreatDetection: false,
                mlBehavioralAnalysis: false,
                mttr: 150,
                accuracy: 78,
                falsePositiveRate: 22,
                threatIntelligence: 'Basic',
                incidentResponse: 'Manual'
            }
        },
        
        operational: {
            fteRequired: 1.25,
            maintenanceWindows: 6,
            updates: 'Quarterly',
            uptime: 99.5,
            supportSLA: '8 hours',
            scalability: 'Hardware dependent'
        },
        
        riskReduction: {
            breachProbability: 0.45,
            complianceViolation: 0.40,
            operationalRisk: 0.55,
            reputationalRisk: 0.50
        },
        
        cyberInsurance: {
            premiumReduction: 5,
            coverageIncrease: 5,
            deductibleReduction: 2
        }
    },
    
    // ARISTA
    arista: {
        id: 'arista',
        name: 'Arista CloudVision',
        vendor: 'Arista Networks',
        category: 'Network-Centric NAC',
        deployment: 'Hybrid',
        
        pricing: {
            model: 'Subscription',
            transparency: 'Medium',
            subscription: { 
                annual: 144,
                perDevice: true
            },
            modules: {
                wifi: { cost: 25000, name: 'WiFi Module' },
                studio: { cost: 35000, name: 'CV Studio' },
                cognitive: { cost: 45000, name: 'Cognitive Campus' }
            }
        },
        
        costs: {
            implementation: 40000,
            training: 6000,
            hidden: 50000,
            infrastructure: 15000,
            certificates: 5000,
            integration: 35000,
            downtime: 45000
        },
        
        deployment: {
            time: 672, // 28 days
            model: 'Hybrid',
            complexity: 'Medium',
            professionalServices: true,
            requiresHardware: false,
            requiresInfrastructure: 'Partial'
        },
        
        features: {
            zeroTrust: { native: false, score: 58 },
            cloudNative: false,
            automation: 60,
            compliance: {
                frameworks: ['SOC 2', 'ISO 27001', 'HIPAA', 'PCI DSS'],
                automation: 45,
                continuousCompliance: false,
                auditReporting: 'Scheduled'
            },
            security: {
                aiThreatDetection: false,
                mlBehavioralAnalysis: 'Basic',
                mttr: 90,
                accuracy: 83,
                falsePositiveRate: 17,
                threatIntelligence: 'Network focused',
                incidentResponse: 'Workflow based'
            }
        },
        
        operational: {
            fteRequired: 1.0,
            maintenanceWindows: 4,
            updates: 'Monthly',
            uptime: 99.8,
            supportSLA: '4 hours',
            scalability: 'Cloud scale'
        },
        
        riskReduction: {
            breachProbability: 0.52,
            complianceViolation: 0.48,
            operationalRisk: 0.48,
            reputationalRisk: 0.42
        },
        
        cyberInsurance: {
            premiumReduction: 6,
            coverageIncrease: 7,
            deductibleReduction: 3
        }
    },
    
    // JUNIPER
    juniper: {
        id: 'juniper',
        name: 'Juniper Mist Access',
        vendor: 'Juniper Networks',
        category: 'AI-Driven NAC',
        deployment: 'Cloud',
        
        pricing: {
            model: 'Subscription',
            transparency: 'High',
            subscription: { 
                annual: 96,
                perDevice: true
            },
            addOns: {
                'Premium Analytics': { perDevice: 24 },
                'Virtual Network Assistant': { perDevice: 36 },
                'User Engagement': { perDevice: 18 }
            }
        },
        
        costs: {
            implementation: 20000,
            training: 3000,
            hidden: 25000,
            infrastructure: 0,
            certificates: 2000,
            integration: 15000,
            downtime: 20000
        },
        
        deployment: {
            time: 168, // 7 days
            model: 'Cloud',
            complexity: 'Simple',
            professionalServices: false,
            requiresHardware: false,
            requiresInfrastructure: false
        },
        
        features: {
            zeroTrust: { native: false, score: 70 },
            cloudNative: true,
            automation: 75,
            compliance: {
                frameworks: ['SOC 2', 'ISO 27001', 'HIPAA', 'GDPR', 'CCPA'],
                automation: 60,
                continuousCompliance: 'Partial',
                auditReporting: 'Automated'
            },
            security: {
                aiThreatDetection: true,
                mlBehavioralAnalysis: true,
                mttr: 30,
                accuracy: 88,
                falsePositiveRate: 12,
                threatIntelligence: 'AI-driven',
                incidentResponse: 'AI-assisted'
            }
        },
        
        operational: {
            fteRequired: 0.75,
            maintenanceWindows: 2,
            updates: 'Continuous',
            uptime: 99.9,
            supportSLA: '1 hour',
            scalability: 'Unlimited cloud'
        },
        
        riskReduction: {
            breachProbability: 0.68,
            complianceViolation: 0.65,
            operationalRisk: 0.60,
            reputationalRisk: 0.55
        },
        
        cyberInsurance: {
            premiumReduction: 12,
            coverageIncrease: 18,
            deductibleReduction: 10
        }
    },
    
    // FORTINET
    fortinet: {
        id: 'fortinet',
        name: 'FortiNAC',
        vendor: 'Fortinet',
        category: 'Security-Focused NAC',
        deployment: 'On-Premise/Virtual',
        
        pricing: {
            model: 'Perpetual + Support',
            transparency: 'Medium',
            perpetual: 145,
            hardware: {
                'FNAC-500D': { cost: 15000, capacity: 5000 },
                'FNAC-1000D': { cost: 35000, capacity: 10000 },
                'FNAC-3000D': { cost: 65000, capacity: 30000 }
            },
            maintenance: { annual: 0.20 },
            fabricIntegration: {
                'FortiGate': { discount: 0.15 },
                'FortiSwitch': { discount: 0.10 },
                'FortiAP': { discount: 0.10 }
            }
        },
        
        costs: {
            implementation: 30000,
            training: 4000,
            hidden: 60000,
            infrastructure: 20000,
            certificates: 5000,
            integration: 25000,
            downtime: 40000
        },
        
        deployment: {
            time: 504, // 21 days
            model: 'Hybrid',
            complexity: 'Medium',
            professionalServices: true,
            requiresHardware: 'Optional',
            requiresInfrastructure: true
        },
        
        features: {
            zeroTrust: { native: false, score: 52 },
            cloudNative: false,
            automation: 50,
            compliance: {
                frameworks: ['SOC 2', 'ISO 27001', 'PCI DSS', 'HIPAA'],
                automation: 40,
                continuousCompliance: false,
                auditReporting: 'Template based'
            },
            security: {
                aiThreatDetection: false,
                mlBehavioralAnalysis: false,
                mttr: 60,
                accuracy: 85,
                falsePositiveRate: 15,
                threatIntelligence: 'FortiGuard Labs',
                incidentResponse: 'Fabric integrated'
            }
        },
        
        operational: {
            fteRequired: 1.0,
            maintenanceWindows: 6,
            updates: 'Monthly',
            uptime: 99.8,
            supportSLA: '4 hours',
            scalability: 'Appliance scale'
        },
        
        riskReduction: {
            breachProbability: 0.48,
            complianceViolation: 0.42,
            operationalRisk: 0.52,
            reputationalRisk: 0.48
        },
        
        cyberInsurance: {
            premiumReduction: 6,
            coverageIncrease: 6,
            deductibleReduction: 4
        }
    },
    
    // MICROSOFT
    microsoft: {
        id: 'microsoft',
        name: 'Microsoft NPS/NAP',
        vendor: 'Microsoft',
        category: 'Basic RADIUS',
        deployment: 'On-Premise',
        
        pricing: {
            model: 'Windows Server CALs',
            transparency: 'High',
            serverLicense: 6155,
            deviceCal: 74,
            userCal: 102,
            azureIntegration: {
                'Azure AD Premium': 6,
                'Defender for Identity': 5.50,
                'Conditional Access': 'Included'
            }
        },
        
        costs: {
            implementation: 15000,
            training: 2000,
            hidden: 40000,
            infrastructure: 10000,
            certificates: 3000,
            integration: 8000,
            downtime: 35000
        },
        
        deployment: {
            time: 168, // 7 days
            model: 'On-Premise',
            complexity: 'Simple',
            professionalServices: false,
            requiresHardware: 'Servers',
            requiresInfrastructure: true
        },
        
        features: {
            zeroTrust: { native: false, score: 30 },
            cloudNative: false,
            automation: 15,
            compliance: {
                frameworks: ['Basic Windows', 'Limited compliance'],
                automation: 10,
                continuousCompliance: false,
                auditReporting: 'Manual'
            },
            security: {
                aiThreatDetection: false,
                mlBehavioralAnalysis: false,
                mttr: 480,
                accuracy: 70,
                falsePositiveRate: 30,
                threatIntelligence: 'Windows Updates',
                incidentResponse: 'Manual'
            }
        },
        
        operational: {
            fteRequired: 1.5,
            maintenanceWindows: 12,
            updates: 'Manual patches',
            uptime: 99.0,
            supportSLA: '24 hours',
            scalability: 'Limited'
        },
        
        riskReduction: {
            breachProbability: 0.30,
            complianceViolation: 0.25,
            operationalRisk: 0.65,
            reputationalRisk: 0.60
        },
        
        cyberInsurance: {
            premiumReduction: 2,
            coverageIncrease: 0,
            deductibleReduction: 0
        }
    },
    
    // PACKETFENCE
    packetfence: {
        id: 'packetfence',
        name: 'PacketFence',
        vendor: 'Inverse Inc.',
        category: 'Open Source NAC',
        deployment: 'On-Premise',
        
        pricing: {
            model: 'Support Subscriptions',
            transparency: 'High',
            support: { 
                community: 0,
                enterprise: 15000,
                premium: 25000
            },
            addOns: {
                'Custom Development': { hourly: 200 },
                'Training': { daily: 2000 },
                'Health Check': { cost: 5000 }
            }
        },
        
        costs: {
            hardware: 20000,
            implementation: 50000,
            training: 8000,
            hidden: 80000,
            infrastructure: 15000,
            certificates: 5000,
            integration: 40000,
            downtime: 60000
        },
        
        deployment: {
            time: 1440, // 60 days
            model: 'On-Premise',
            complexity: 'Very Complex',
            professionalServices: true,
            requiresHardware: true,
            requiresInfrastructure: true
        },
        
        features: {
            zeroTrust: { native: false, score: 40 },
            cloudNative: false,
            automation: 20,
            compliance: {
                frameworks: ['Basic', 'Custom possible'],
                automation: 15,
                continuousCompliance: false,
                auditReporting: 'Manual'
            },
            security: {
                aiThreatDetection: false,
                mlBehavioralAnalysis: false,
                mttr: 360,
                accuracy: 75,
                falsePositiveRate: 25,
                threatIntelligence: 'Community',
                incidentResponse: 'Manual'
            }
        },
        
        operational: {
            fteRequired: 2.0,
            maintenanceWindows: 12,
            updates: 'Manual',
            uptime: 99.0,
            supportSLA: 'Best effort',
            scalability: 'Manual scaling'
        },
        
        riskReduction: {
            breachProbability: 0.35,
            complianceViolation: 0.30,
            operationalRisk: 0.70,
            reputationalRisk: 0.65
        },
        
        cyberInsurance: {
            premiumReduction: 0,
            coverageIncrease: 0,
            deductibleReduction: 0
        }
    },
    
    // CLOUD RADIUS VENDORS
    foxpass: {
        id: 'foxpass',
        name: 'Foxpass (Okta)',
        vendor: 'Okta',
        category: 'Cloud RADIUS',
        deployment: 'Cloud',
        
        pricing: {
            model: 'Per-User Monthly',
            transparency: 'High',
            perUser: 6.00,
            minimum: 250,
            limitations: {
                'Device visibility': false,
                'Device profiling': false,
                'Guest access': false,
                'BYOD management': false,
                'Compliance': 'Limited',
                'Zero Trust': false
            }
        },
        
        costs: {
            implementation: 5000,
            training: 1000,
            hidden: 200000, // No device support forces user-based
            infrastructure: 0,
            certificates: 1000,
            integration: 10000,
            downtime: 15000
        },
        
        deployment: {
            time: 24, // 1 day
            model: 'Cloud',
            complexity: 'Simple',
            professionalServices: false,
            requiresHardware: false,
            requiresInfrastructure: false
        },
        
        features: {
            zeroTrust: { native: false, score: 35 },
            cloudNative: true,
            automation: 30,
            compliance: {
                frameworks: ['SOC 2', 'Basic RADIUS'],
                automation: 20,
                continuousCompliance: false,
                auditReporting: 'None'
            },
            security: {
                aiThreatDetection: false,
                mlBehavioralAnalysis: false,
                mttr: 120,
                accuracy: 72,
                falsePositiveRate: 28,
                threatIntelligence: 'None',
                incidentResponse: 'Manual'
            }
        },
        
        operational: {
            fteRequired: 0.5,
            maintenanceWindows: 0,
            updates: 'Continuous',
            uptime: 99.5,
            supportSLA: '24 hours',
            scalability: 'User-based only'
        },
        
        riskReduction: {
            breachProbability: 0.32,
            complianceViolation: 0.35,
            operationalRisk: 0.45,
            reputationalRisk: 0.50
        },
        
        cyberInsurance: {
            premiumReduction: 3,
            coverageIncrease: 2,
            deductibleReduction: 1
        }
    },
    
    securew2: {
        id: 'securew2',
        name: 'SecureW2',
        vendor: 'SecureW2',
        category: 'Cloud RADIUS + PKI',
        deployment: 'Cloud',
        
        pricing: {
            model: 'Complex Bundle Pricing',
            transparency: 'Low',
            perUser: 10.00,
            onboarding: 12500,
            bundles: {
                'JoinNow Basic': { perUser: 8, setup: 10000 },
                'JoinNow Plus': { perUser: 12, setup: 15000 },
                'JoinNow Enterprise': { perUser: 18, setup: 25000 }
            },
            certificates: {
                perCert: 12,
                renewal: 6
            }
        },
        
        costs: {
            implementation: 12500,
            training: 2000,
            hidden: 175000, // Certificate management complexity
            infrastructure: 0,
            certificates: 25000,
            integration: 20000,
            downtime: 25000
        },
        
        deployment: {
            time: 72, // 3 days
            model: 'Cloud',
            complexity: 'Medium',
            professionalServices: true,
            requiresHardware: false,
            requiresInfrastructure: false
        },
        
        features: {
            zeroTrust: { native: false, score: 38 },
            cloudNative: true,
            automation: 40,
            compliance: {
                frameworks: ['SOC 2', 'ISO 27001', 'Certificate-based'],
                automation: 30,
                continuousCompliance: false,
                auditReporting: 'Basic'
            },
            security: {
                aiThreatDetection: false,
                mlBehavioralAnalysis: false,
                mttr: 90,
                accuracy: 75,
                falsePositiveRate: 25,
                threatIntelligence: 'None',
                incidentResponse: 'Certificate based'
            }
        },
        
        operational: {
            fteRequired: 0.75,
            maintenanceWindows: 0,
            updates: 'Continuous',
            uptime: 99.7,
            supportSLA: '8 hours',
            scalability: 'Certificate limited'
        },
        
        riskReduction: {
            breachProbability: 0.35,
            complianceViolation: 0.38,
            operationalRisk: 0.42,
            reputationalRisk: 0.45
        },
        
        cyberInsurance: {
            premiumReduction: 4,
            coverageIncrease: 3,
            deductibleReduction: 2
        }
    },
    
    radiusaas: {
        id: 'radiusaas',
        name: 'RADIUS-as-a-Service',
        vendor: 'Various',
        category: 'Generic Cloud RADIUS',
        deployment: 'Cloud',
        
        pricing: {
            model: 'Per-User',
            transparency: 'Medium',
            perUser: 5.00,
            minimum: 250,
            limitations: {
                'NAC features': 'None',
                'Device management': false,
                'Compliance': false,
                'Zero Trust': false,
                'Visibility': false,
                'Policy control': 'Basic RADIUS'
            }
        },
        
        costs: {
            implementation: 3000,
            training: 1000,
            hidden: 150000, // Limited functionality
            infrastructure: 0,
            certificates: 500,
            integration: 5000,
            downtime: 20000
        },
        
        deployment: {
            time: 16, // hours
            model: 'Cloud',
            complexity: 'Simple',
            professionalServices: false,
            requiresHardware: false,
            requiresInfrastructure: false
        },
        
        features: {
            zeroTrust: { native: false, score: 32 },
            cloudNative: true,
            automation: 25,
            compliance: {
                frameworks: ['Basic RADIUS auth only'],
                automation: 15,
                continuousCompliance: false,
                auditReporting: 'None'
            },
            security: {
                aiThreatDetection: false,
                mlBehavioralAnalysis: false,
                mttr: 180,
                accuracy: 70,
                falsePositiveRate: 30,
                threatIntelligence: 'None',
                incidentResponse: 'Manual'
            }
        },
        
        operational: {
            fteRequired: 0.5,
            maintenanceWindows: 0,
            updates: 'Continuous',
            uptime: 99.5,
            supportSLA: 'Best effort',
            scalability: 'User-based only'
        },
        
        riskReduction: {
            breachProbability: 0.28,
            complianceViolation: 0.30,
            operationalRisk: 0.50,
            reputationalRisk: 0.55
        },
        
        cyberInsurance: {
            premiumReduction: 1,
            coverageIncrease: 0,
            deductibleReduction: 0
        }
    }
};

// Calculation methods
window.VendorDatabase.calculateTCO = function(vendorId, config) {
    const vendor = this[vendorId];
    if (!vendor) return null;
    
    const devices = config.devices || 2500;
    const users = config.users || Math.ceil(devices * 0.6);
    const years = config.years || 3;
    
    let tco = {
        hardware: 0,
        software: 0,
        implementation: 0,
        training: 0,
        support: 0,
        operations: 0,
        hidden: 0,
        infrastructure: 0,
        certificates: 0,
        integration: 0,
        downtime: 0,
        total: 0
    };
    
    // Calculate based on vendor type
    if (vendorId === 'portnox') {
        // Simple Portnox calculation
        const baseRate = vendor.pricing.perDevice.monthly;
        const discount = this.getVolumeDiscount(devices, vendor.pricing.volumeDiscounts);
        const effectiveRate = baseRate * (1 - discount / 100);
        
        // Contract term discount
        let termDiscount = 0;
        if (years >= 5) termDiscount = 0.45;
        else if (years >= 3) termDiscount = 0.30;
        else if (years >= 1) termDiscount = 0.15;
        
        const finalRate = effectiveRate * (1 - termDiscount);
        tco.software = devices * finalRate * 12 * years;
        
        // Add any selected add-ons
        if (config.addOns && vendor.pricing.addOns) {
            Object.entries(config.addOns).forEach(([addon, enabled]) => {
                if (enabled && vendor.pricing.addOns[addon]) {
                    tco.software += devices * vendor.pricing.addOns[addon].perDevice * 12 * years;
                }
            });
        }
        
    } else if (['foxpass', 'securew2', 'radiusaas'].includes(vendorId)) {
        // Cloud RADIUS - user-based pricing
        tco.software = users * vendor.pricing.perUser * 12 * years;
        
        if (vendor.pricing.minimum) {
            const minCost = vendor.pricing.minimum * vendor.pricing.perUser * 12 * years;
            tco.software = Math.max(tco.software, minCost);
        }
        
        if (vendor.pricing.onboarding) {
            tco.implementation = vendor.pricing.onboarding;
        }
        
        // Certificate costs for SecureW2
        if (vendorId === 'securew2') {
            tco.certificates = devices * vendor.pricing.certificates.perCert * years;
        }
        
    } else {
        // Traditional vendors
        if (vendor.pricing.licenses) {
            // Complex licensing (Cisco, etc)
            if (vendorId === 'cisco') {
                // Apex licenses required
                tco.software = devices * vendor.pricing.licenses.apex.perpetual;
                
                // Add required modules
                Object.entries(vendor.pricing.addOns).forEach(([module, details]) => {
                    if (details.required) {
                        tco.software += details.cost;
                    }
                });
                
                // AnyConnect licenses
                tco.software += users * vendor.pricing.addOns['AnyConnect Licenses'].perUser;
            } else {
                // Other perpetual models
                const licenseType = vendor.pricing.licenses.apex || 
                                   vendor.pricing.licenses.enterprise ||
                                   vendor.pricing.licenses.base;
                tco.software = devices * licenseType.perpetual;
            }
            
            // Add maintenance
            if (vendor.pricing.maintenance) {
                const maintRate = vendor.pricing.maintenance.annual || 
                                 vendor.pricing.maintenance.software ||
                                 0.20;
                tco.support = tco.software * maintRate * years;
            }
            
        } else if (vendor.pricing.modules) {
            // Modular pricing (Aruba)
            tco.software = devices * (vendor.pricing.totalPerDevice || 
                Object.values(vendor.pricing.modules).reduce((sum, m) => sum + m.perpetual, 0));
            
            tco.support = tco.software * vendor.pricing.maintenance.annual * years;
            
        } else if (vendor.pricing.subscription) {
            // Subscription model
            tco.software = devices * vendor.pricing.subscription.annual * years;
            
        } else if (vendor.pricing.perpetual) {
            // Simple perpetual
            tco.software = devices * vendor.pricing.perpetual;
            tco.support = tco.software * (vendor.pricing.maintenance?.annual || 0.20) * years;
            
        } else if (vendorId === 'microsoft') {
            // Microsoft CALs
            tco.software = vendor.pricing.serverLicense + (devices * vendor.pricing.deviceCal);
            tco.support = tco.software * 0.20 * years;
        }
        
        // Hardware costs
        if (vendor.pricing.hardware && vendor.deployment.requiresHardware) {
            const hardwareOptions = Object.values(vendor.pricing.hardware)
                .sort((a, b) => a.capacity - b.capacity);
            
            let hardwareNeeded = [];
            let remainingDevices = devices;
            
            // Calculate hardware requirements
            for (let i = hardwareOptions.length - 1; i >= 0 && remainingDevices > 0; i--) {
                const hw = hardwareOptions[i];
                const units = Math.floor(remainingDevices / hw.capacity);
                if (units > 0) {
                    hardwareNeeded.push({ hw, units });
                    remainingDevices -= units * hw.capacity;
                }
            }
            
            // Add remaining devices
            if (remainingDevices > 0) {
                const smallestHw = hardwareOptions[0];
                hardwareNeeded.push({ hw: smallestHw, units: 1 });
            }
            
            // Calculate cost with redundancy
            hardwareNeeded.forEach(({ hw, units }) => {
                tco.hardware += hw.cost * units * 2; // 2x for redundancy
                if (hw.support) {
                    tco.support += hw.support * units * 2 * years;
                }
            });
        }
    }
    
    // Add standard costs from vendor data
    Object.entries(vendor.costs).forEach(([key, value]) => {
        if (tco.hasOwnProperty(key) && tco[key] === 0) {
            tco[key] = value;
        }
    });
    
    // Operations (FTE)
    const fteRequired = vendor.operational?.fteRequired || 1;
    const avgSalary = config.avgITSalary || 120000;
    tco.operations = fteRequired * avgSalary * years;
    
    // Hardware for open source
    if (vendorId === 'packetfence' && !tco.hardware) {
        tco.hardware = vendor.costs.hardware || 20000;
    }
    
    // Risk-adjusted costs
    if (config.includeRiskCosts) {
        const breachCost = config.avgBreachCost || 4350000;
        const breachProb = 0.15; // 15% annual probability
        const riskReduction = vendor.riskReduction?.breachProbability || 0.30;
        
        tco.riskMitigation = -1 * (breachCost * breachProb * riskReduction * years);
    }
    
    // Calculate total
    tco.total = Object.values(tco).reduce((sum, cost) => sum + (cost || 0), 0);
    
    // Per device/month
    tco.perDevicePerMonth = tco.total / (devices * years * 12);
    
    return tco;
};

window.VendorDatabase.getVolumeDiscount = function(devices, discountTable) {
    if (!discountTable) return 0;
    
    let discount = 0;
    Object.entries(discountTable).forEach(([threshold, disc]) => {
        if (devices >= parseInt(threshold)) {
            discount = disc;
        }
    });
    
    return discount;
};

window.VendorDatabase.calculateROI = function(vendorId, tco, config) {
    const vendor = this[vendorId];
    const annualBreachCost = config.avgBreachCost || 4350000;
    const breachProbability = config.breachProbability || 0.15;
    
    // Risk reduction value
    const riskReduction = vendor.riskReduction?.breachProbability || 0.30;
    const annualSecurityValue = annualBreachCost * breachProbability * riskReduction;
    
    // Operational savings
    const baselineFTE = 2.5; // Industry average
    const fteSavings = (baselineFTE - vendor.operational.fteRequired) * (config.avgITSalary || 120000);
    
    // Compliance automation value
    const complianceHours = 500; // Annual compliance effort
    const complianceRate = 150; // $/hour
    const automationSavings = complianceHours * complianceRate * (vendor.features.compliance.automation / 100);
    
    // Downtime reduction
    const downtimeHours = (100 - vendor.operational.uptime) / 100 * 8760;
    const downtimeCost = config.downtimeCostPerHour || 25000;
    const downtimeSavings = downtimeHours * downtimeCost * 0.5; // Assume 50% reduction
    
    const totalAnnualValue = annualSecurityValue + fteSavings + automationSavings + downtimeSavings;
    const annualCost = tco.total / config.years;
    
    const roi = ((totalAnnualValue - annualCost) / annualCost) * 100;
    const paybackMonths = annualCost > 0 ? Math.round(annualCost / (totalAnnualValue / 12)) : 0;
    
    return {
        percentage: Math.round(roi),
        annualValue: totalAnnualValue,
        paybackMonths: paybackMonths > 0 ? paybackMonths : 'Immediate',
        securityValue: annualSecurityValue,
        operationalValue: fteSavings,
        complianceValue: automationSavings,
        downtimeValue: downtimeSavings
    };
};

// Make globally available
window.MasterVendorDatabase = window.VendorDatabase;
console.log('[VendorDatabase] Loaded ' + Object.keys(window.VendorDatabase).filter(k => typeof window.VendorDatabase[k] === 'object').length + ' vendors');
