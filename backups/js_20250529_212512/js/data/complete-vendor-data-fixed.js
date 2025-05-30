/**
 * Complete Vendor Data for Portnox Total Cost Analyzer - Fixed Version
 * Includes shortName property for all vendors
 */

(function() {
    'use strict';
    
    const completeVendorDataFixed = {
        portnox: {
            id: 'portnox',
            name: 'Portnox Cloud',
            shortName: 'Portnox',
            logo: './img/vendors/portnox-logo.png',
            description: 'Cloud-native, agentless Zero Trust NAC platform with industry-leading deployment speed and ROI',
            pros: [
                'Fastest deployment (21 days average)',
                'No infrastructure required - 100% cloud-native',
                'Lowest TCO in market - 53% less than competitors',
                'Agentless architecture - no endpoint software',
                'Comprehensive device visibility and control',
                'Advanced risk-based authentication',
                'Seamless cloud service integration'
            ],
            cons: [
                'Relatively newer player in market',
                'Limited on-premises deployment options'
            ],
            costs: {
                licensing: 65000,
                infrastructure: 0,
                implementation: 15000,
                training: 5000,
                support: 12000,
                operational: 18000,
                total1Year: 115000,
                total3Year: 245000,
                tco3Year: 245000
            },
            metrics: {
                deploymentDays: 21,
                securityScore: 95,
                userSatisfaction: 94,
                supportRating: 96,
                innovationIndex: 98,
                marketGrowth: 145,
                fteRequired: 0.25,
                roi1Year: 142,
                roi3Year: 325,
                paybackMonths: 7
            },
            capabilities: {
                zeroTrust: 98,
                cloudNative: 100,
                agentless: 100,
                byod: 95,
                iotSupport: 97,
                guestAccess: 96,
                compliance: 94,
                automation: 96,
                aiMl: 92,
                threatDetection: 93,
                cloudIntegration: 98,
                automatedRemediation: 96,
                identityIntegration: 94,
                networkSegmentation: 92,
                riskAnalytics: 91
            },
            compliance: {
                'pci-dss': 96,
                'hipaa': 95,
                'gdpr': 97,
                'sox': 94,
                'iso-27001': 96,
                'nist-csf': 95,
                'ccpa': 96,
                'fedramp': 88,
                'cmmc': 90,
                'nerc-cip': 89
            }
        },
        
        'cisco-ise': {
            id: 'cisco-ise',
            name: 'Cisco Identity Services Engine',
            shortName: 'Cisco ISE',
            logo: './img/vendors/cisco-logo.png',
            description: 'Enterprise-grade NAC solution with extensive features but complex deployment',
            pros: [
                'Market leader with extensive features',
                'Deep Cisco ecosystem integration',
                'Mature platform with proven track record',
                'Extensive third-party integrations'
            ],
            cons: [
                'Complex deployment (90+ days)',
                'High infrastructure requirements',
                'Significant operational overhead',
                'Steep learning curve'
            ],
            costs: {
                licensing: 120000,
                infrastructure: 85000,
                implementation: 65000,
                training: 25000,
                support: 35000,
                operational: 75000,
                total1Year: 405000,
                total3Year: 820000,
                tco3Year: 820000
            },
            metrics: {
                deploymentDays: 90,
                securityScore: 88,
                userSatisfaction: 72,
                supportRating: 78,
                innovationIndex: 70,
                marketGrowth: 25,
                fteRequired: 2.0,
                roi1Year: 65,
                roi3Year: 185,
                paybackMonths: 18
            },
            capabilities: {
                zeroTrust: 75,
                cloudNative: 40,
                agentless: 60,
                byod: 85,
                iotSupport: 80,
                guestAccess: 88,
                compliance: 85,
                automation: 70,
                aiMl: 65,
                threatDetection: 82,
                cloudIntegration: 55,
                automatedRemediation: 72,
                identityIntegration: 85,
                networkSegmentation: 88,
                riskAnalytics: 75
            },
            compliance: {
                'pci-dss': 90,
                'hipaa': 88,
                'gdpr': 85,
                'sox': 88,
                'iso-27001': 87,
                'nist-csf': 89,
                'ccpa': 84,
                'fedramp': 82,
                'cmmc': 80,
                'nerc-cip': 85
            }
        },
        
        'aruba-clearpass': {
            id: 'aruba-clearpass',
            name: 'Aruba ClearPass Policy Manager',
            shortName: 'Aruba',
            logo: './img/vendors/aruba-logo.png',
            description: 'Comprehensive policy management platform with strong wireless integration',
            pros: [
                'Excellent wireless integration',
                'Strong policy engine',
                'Good ecosystem support',
                'Flexible deployment options'
            ],
            cons: [
                'Complex configuration',
                'Requires significant expertise',
                'Higher operational costs',
                'Limited cloud capabilities'
            ],
            costs: {
                licensing: 95000,
                infrastructure: 65000,
                implementation: 45000,
                training: 20000,
                support: 28000,
                operational: 60000,
                total1Year: 313000,
                total3Year: 633000,
                tco3Year: 633000
            },
            metrics: {
                deploymentDays: 75,
                securityScore: 85,
                userSatisfaction: 76,
                supportRating: 80,
                innovationIndex: 72,
                marketGrowth: 35,
                fteRequired: 1.5,
                roi1Year: 78,
                roi3Year: 210,
                paybackMonths: 15
            },
            capabilities: {
                zeroTrust: 70,
                cloudNative: 45,
                agentless: 65,
                byod: 88,
                iotSupport: 82,
                guestAccess: 90,
                compliance: 82,
                automation: 68,
                aiMl: 60,
                threatDetection: 78,
                cloudIntegration: 60,
                automatedRemediation: 70,
                identityIntegration: 82,
                networkSegmentation: 85,
                riskAnalytics: 72
            },
            compliance: {
                'pci-dss': 86,
                'hipaa': 84,
                'gdpr': 82,
                'sox': 83,
                'iso-27001': 84,
                'nist-csf': 85,
                'ccpa': 81,
                'fedramp': 78,
                'cmmc': 76,
                'nerc-cip': 80
            }
        },
        
        'forescout': {
            id: 'forescout',
            name: 'Forescout Platform',
            shortName: 'Forescout',
            logo: './img/vendors/forescout-logo.png',
            description: 'Agentless device visibility and control platform with strong IoT support',
            pros: [
                'Excellent device discovery',
                'Strong IoT/OT support',
                'Agentless architecture',
                'Good integration ecosystem'
            ],
            cons: [
                'Limited policy capabilities',
                'Requires additional modules',
                'Complex licensing model',
                'Performance limitations at scale'
            ],
            costs: {
                licensing: 85000,
                infrastructure: 45000,
                implementation: 35000,
                training: 15000,
                support: 25000,
                operational: 50000,
                total1Year: 255000,
                total3Year: 505000,
                tco3Year: 505000
            },
            metrics: {
                deploymentDays: 60,
                securityScore: 82,
                userSatisfaction: 78,
                supportRating: 76,
                innovationIndex: 75,
                marketGrowth: 40,
                fteRequired: 1.25,
                roi1Year: 85,
                roi3Year: 225,
                paybackMonths: 14
            },
            capabilities: {
                zeroTrust: 72,
                cloudNative: 50,
                agentless: 85,
                byod: 75,
                iotSupport: 90,
                guestAccess: 78,
                compliance: 80,
                automation: 72,
                aiMl: 68,
                threatDetection: 80,
                cloudIntegration: 65,
                automatedRemediation: 74,
                identityIntegration: 78,
                networkSegmentation: 82,
                riskAnalytics: 76
            },
            compliance: {
                'pci-dss': 82,
                'hipaa': 80,
                'gdpr': 81,
                'sox': 80,
                'iso-27001': 82,
                'nist-csf': 83,
                'ccpa': 79,
                'fedramp': 76,
                'cmmc': 74,
                'nerc-cip': 78
            }
        },
        
        'fortinet': {
            id: 'fortinet',
            name: 'Fortinet FortiNAC',
            shortName: 'Fortinet',
            logo: './img/vendors/fortinet-logo.png',
            description: 'Security-focused NAC with strong FortiGate integration',
            pros: [
                'Excellent security integration',
                'Strong FortiGate synergy',
                'Good threat intelligence',
                'Competitive pricing'
            ],
            cons: [
                'Best with full Fortinet stack',
                'Limited standalone features',
                'Moderate cloud support',
                'Complex management'
            ],
            costs: {
                licensing: 75000,
                infrastructure: 55000,
                implementation: 40000,
                training: 18000,
                support: 22000,
                operational: 48000,
                total1Year: 258000,
                total3Year: 510000,
                tco3Year: 510000
            },
            metrics: {
                deploymentDays: 65,
                securityScore: 86,
                userSatisfaction: 74,
                supportRating: 77,
                innovationIndex: 70,
                marketGrowth: 45,
                fteRequired: 1.5,
                roi1Year: 80,
                roi3Year: 215,
                paybackMonths: 15
            },
            capabilities: {
                zeroTrust: 74,
                cloudNative: 48,
                agentless: 70,
                byod: 80,
                iotSupport: 78,
                guestAccess: 82,
                compliance: 83,
                automation: 70,
                aiMl: 65,
                threatDetection: 85,
                cloudIntegration: 58,
                automatedRemediation: 75,
                identityIntegration: 80,
                networkSegmentation: 86,
                riskAnalytics: 78
            },
            compliance: {
                'pci-dss': 85,
                'hipaa': 83,
                'gdpr': 82,
                'sox': 82,
                'iso-27001': 84,
                'nist-csf': 85,
                'ccpa': 80,
                'fedramp': 79,
                'cmmc': 77,
                'nerc-cip': 82
            }
        },
        
        'pulsesecure': {
            id: 'pulsesecure',
            name: 'Pulse Secure',
            shortName: 'Pulse',
            logo: './img/vendors/pulse-logo.png',
            description: 'VPN-centric NAC solution with strong remote access capabilities',
            pros: [
                'Excellent VPN integration',
                'Strong remote access',
                'Good mobile support',
                'Reliable platform'
            ],
            cons: [
                'Limited NAC features',
                'Aging architecture',
                'Weak cloud support',
                'Higher maintenance'
            ],
            costs: {
                licensing: 70000,
                infrastructure: 50000,
                implementation: 35000,
                training: 16000,
                support: 20000,
                operational: 45000,
                total1Year: 236000,
                total3Year: 466000,
                tco3Year: 466000
            },
            metrics: {
                deploymentDays: 55,
                securityScore: 78,
                userSatisfaction: 72,
                supportRating: 74,
                innovationIndex: 60,
                marketGrowth: 15,
                fteRequired: 1.25,
                roi1Year: 70,
                roi3Year: 195,
                paybackMonths: 17
            },
            capabilities: {
                zeroTrust: 65,
                cloudNative: 35,
                agentless: 55,
                byod: 78,
                iotSupport: 65,
                guestAccess: 75,
                compliance: 76,
                automation: 60,
                aiMl: 50,
                threatDetection: 72,
                cloudIntegration: 45,
                automatedRemediation: 65,
                identityIntegration: 78,
                networkSegmentation: 75,
                riskAnalytics: 68
            },
            compliance: {
                'pci-dss': 78,
                'hipaa': 76,
                'gdpr': 75,
                'sox': 76,
                'iso-27001': 77,
                'nist-csf': 78,
                'ccpa': 74,
                'fedramp': 72,
                'cmmc': 70,
                'nerc-cip': 74
            }
        },
        
        'arubacentral': {
            id: 'arubacentral',
            name: 'Aruba Central',
            shortName: 'Central',
            logo: './img/vendors/aruba-logo.png',
            description: 'Cloud-managed network access with simplified operations',
            pros: [
                'True cloud management',
                'Simplified operations',
                'Good wireless focus',
                'Modern architecture'
            ],
            cons: [
                'Limited NAC depth',
                'Requires Aruba hardware',
                'Basic policy engine',
                'Limited third-party support'
            ],
            costs: {
                licensing: 60000,
                infrastructure: 25000,
                implementation: 25000,
                training: 12000,
                support: 18000,
                operational: 35000,
                total1Year: 175000,
                total3Year: 355000,
                tco3Year: 355000
            },
            metrics: {
                deploymentDays: 35,
                securityScore: 80,
                userSatisfaction: 82,
                supportRating: 79,
                innovationIndex: 78,
                marketGrowth: 55,
                fteRequired: 0.75,
                roi1Year: 95,
                roi3Year: 245,
                paybackMonths: 12
            },
            capabilities: {
                zeroTrust: 75,
                cloudNative: 80,
                agentless: 75,
                byod: 82,
                iotSupport: 75,
                guestAccess: 85,
                compliance: 78,
                automation: 76,
                aiMl: 70,
                threatDetection: 76,
                cloudIntegration: 82,
                automatedRemediation: 74,
                identityIntegration: 80,
                networkSegmentation: 78,
                riskAnalytics: 72
            },
            compliance: {
                'pci-dss': 80,
                'hipaa': 78,
                'gdpr': 79,
                'sox': 78,
                'iso-27001': 80,
                'nist-csf': 81,
                'ccpa': 77,
                'fedramp': 74,
                'cmmc': 72,
                'nerc-cip': 76
            }
        },
        
        'extreme': {
            id: 'extreme',
            name: 'ExtremeControl',
            shortName: 'Extreme',
            logo: './img/vendors/extreme-logo.png',
            description: 'Unified NAC solution with strong network integration',
            pros: [
                'Good network integration',
                'Unified management',
                'Flexible deployment',
                'Solid feature set'
            ],
            cons: [
                'Smaller market presence',
                'Limited innovation',
                'Complex licensing',
                'Moderate support'
            ],
            costs: {
                licensing: 68000,
                infrastructure: 48000,
                implementation: 38000,
                training: 17000,
                support: 21000,
                operational: 44000,
                total1Year: 236000,
                total3Year: 464000,
                tco3Year: 464000
            },
            metrics: {
                deploymentDays: 58,
                securityScore: 79,
                userSatisfaction: 73,
                supportRating: 75,
                innovationIndex: 65,
                marketGrowth: 20,
                fteRequired: 1.25,
                roi1Year: 72,
                roi3Year: 200,
                paybackMonths: 16
            },
            capabilities: {
                zeroTrust: 68,
                cloudNative: 42,
                agentless: 65,
                byod: 78,
                iotSupport: 72,
                guestAccess: 80,
                compliance: 77,
                automation: 65,
                aiMl: 55,
                threatDetection: 74,
                cloudIntegration: 52,
                automatedRemediation: 68,
                identityIntegration: 76,
                networkSegmentation: 80,
                riskAnalytics: 70
            },
            compliance: {
                'pci-dss': 79,
                'hipaa': 77,
                'gdpr': 76,
                'sox': 77,
                'iso-27001': 78,
                'nist-csf': 79,
                'ccpa': 75,
                'fedramp': 73,
                'cmmc': 71,
                'nerc-cip': 75
            }
        },
        
        'securew2': {
            id: 'securew2',
            name: 'SecureW2',
            shortName: 'SecureW2',
            logo: './img/vendors/securew2-logo.png',
            description: 'Cloud-native 802.1X and certificate management platform',
            pros: [
                'Pure cloud solution',
                'Simple deployment',
                'Strong certificate focus',
                'Good user experience'
            ],
            cons: [
                'Limited NAC features',
                'Narrow focus',
                'Requires integration',
                'Smaller vendor'
            ],
            costs: {
                licensing: 45000,
                infrastructure: 0,
                implementation: 15000,
                training: 8000,
                support: 12000,
                operational: 20000,
                total1Year: 100000,
                total3Year: 200000,
                tco3Year: 200000
            },
            metrics: {
                deploymentDays: 14,
                securityScore: 82,
                userSatisfaction: 86,
                supportRating: 84,
                innovationIndex: 85,
                marketGrowth: 75,
                fteRequired: 0.25,
                roi1Year: 120,
                roi3Year: 280,
                paybackMonths: 10
            },
            capabilities: {
                zeroTrust: 80,
                cloudNative: 95,
                agentless: 90,
                byod: 88,
                iotSupport: 70,
                guestAccess: 82,
                compliance: 80,
                automation: 82,
                aiMl: 65,
                threatDetection: 72,
                cloudIntegration: 90,
                automatedRemediation: 75,
                identityIntegration: 85,
                networkSegmentation: 70,
                riskAnalytics: 68
            },
            compliance: {
                'pci-dss': 82,
                'hipaa': 80,
                'gdpr': 82,
                'sox': 80,
                'iso-27001': 81,
                'nist-csf': 82,
                'ccpa': 80,
                'fedramp': 76,
                'cmmc': 74,
                'nerc-cip': 75
            }
        },
        
        'microsoft-nps': {
            id: 'microsoft-nps',
            name: 'Microsoft Network Policy Server',
            shortName: 'MS NPS',
            logo: './img/vendors/microsoft-logo.png',
            description: 'Windows Server integrated RADIUS and NAC solution',
            pros: [
                'Deep Windows integration',
                'Included with Windows Server',
                'Active Directory native',
                'Familiar management'
            ],
            cons: [
                'Limited NAC features',
                'Windows-centric only',
                'Basic functionality',
                'No cloud option'
            ],
            costs: {
                licensing: 15000,
                infrastructure: 40000,
                implementation: 25000,
                training: 10000,
                support: 15000,
                operational: 35000,
                total1Year: 140000,
                total3Year: 290000,
                tco3Year: 290000
            },
            metrics: {
                deploymentDays: 30,
                securityScore: 70,
                userSatisfaction: 68,
                supportRating: 75,
                innovationIndex: 50,
                marketGrowth: 10,
                fteRequired: 1.0,
                roi1Year: 60,
                roi3Year: 170,
                paybackMonths: 20
            },
            capabilities: {
                zeroTrust: 55,
                cloudNative: 20,
                agentless: 50,
                byod: 65,
                iotSupport: 55,
                guestAccess: 60,
                compliance: 70,
                automation: 50,
                aiMl: 30,
                threatDetection: 60,
                cloudIntegration: 35,
                automatedRemediation: 55,
                identityIntegration: 90,
                networkSegmentation: 65,
                riskAnalytics: 55
            },
            compliance: {
                'pci-dss': 72,
                'hipaa': 70,
                'gdpr': 68,
                'sox': 72,
                'iso-27001': 70,
                'nist-csf': 71,
                'ccpa': 67,
                'fedramp': 65,
                'cmmc': 63,
                'nerc-cip': 68
            }
        },
        
        'radiusaas': {
            id: 'radiusaas',
            name: 'RADIUSaaS',
            shortName: 'RADIUSaaS',
            logo: './img/vendors/radiusaas-logo.png',
            description: 'Cloud RADIUS service with modern authentication',
            pros: [
                'Simple cloud service',
                'Fast deployment',
                'No infrastructure',
                'Cost effective'
            ],
            cons: [
                'Basic NAC features',
                'Limited visibility',
                'Minimal policy engine',
                'Small vendor'
            ],
            costs: {
                licensing: 36000,
                infrastructure: 0,
                implementation: 8000,
                training: 4000,
                support: 8000,
                operational: 12000,
                total1Year: 68000,
                total3Year: 140000,
                tco3Year: 140000
            },
            metrics: {
                deploymentDays: 7,
                securityScore: 75,
                userSatisfaction: 80,
                supportRating: 78,
                innovationIndex: 70,
                marketGrowth: 60,
                fteRequired: 0.25,
                roi1Year: 110,
                roi3Year: 260,
                paybackMonths: 11
            },
            capabilities: {
                zeroTrust: 70,
                cloudNative: 100,
                agentless: 95,
                byod: 80,
                iotSupport: 65,
                guestAccess: 78,
                compliance: 72,
                automation: 70,
                aiMl: 50,
                threatDetection: 65,
                cloudIntegration: 85,
                automatedRemediation: 65,
                identityIntegration: 80,
                networkSegmentation: 60,
                riskAnalytics: 60
            },
            compliance: {
                'pci-dss': 75,
                'hipaa': 73,
                'gdpr': 76,
                'sox': 74,
                'iso-27001': 75,
                'nist-csf': 76,
                'ccpa': 74,
                'fedramp': 70,
                'cmmc': 68,
                'nerc-cip': 70
            }
        },
        
        'packetfence': {
            id: 'packetfence',
            name: 'PacketFence',
            shortName: 'PacketFence',
            logo: './img/vendors/packetfence-logo.png',
            description: 'Open-source NAC solution with enterprise features',
            pros: [
                'Open source/free',
                'Full feature set',
                'Customizable',
                'Active community'
            ],
            cons: [
                'Requires expertise',
                'Limited support',
                'Complex setup',
                'High maintenance'
            ],
            costs: {
                licensing: 0,
                infrastructure: 40000,
                implementation: 50000,
                training: 20000,
                support: 30000,
                operational: 60000,
                total1Year: 200000,
                total3Year: 380000,
                tco3Year: 380000
            },
            metrics: {
                deploymentDays: 90,
                securityScore: 76,
                userSatisfaction: 68,
                supportRating: 65,
                innovationIndex: 72,
                marketGrowth: 25,
                fteRequired: 2.0,
                roi1Year: 50,
                roi3Year: 150,
                paybackMonths: 24
            },
            capabilities: {
                zeroTrust: 65,
                cloudNative: 30,
                agentless: 70,
                byod: 75,
                iotSupport: 70,
                guestAccess: 78,
                compliance: 70,
                automation: 60,
                aiMl: 45,
                threatDetection: 68,
                cloudIntegration: 40,
                automatedRemediation: 62,
                identityIntegration: 72,
                networkSegmentation: 75,
                riskAnalytics: 65
            },
            compliance: {
                'pci-dss': 72,
                'hipaa': 70,
                'gdpr': 71,
                'sox': 70,
                'iso-27001': 72,
                'nist-csf': 73,
                'ccpa': 70,
                'fedramp': 65,
                'cmmc': 63,
                'nerc-cip': 68
            }
        },
        
        'genians': {
            id: 'genians',
            name: 'Genians NAC',
            shortName: 'Genians',
            logo: './img/vendors/genians-logo.png',
            description: 'Comprehensive NAC with strong endpoint visibility',
            pros: [
                'Good device visibility',
                'Competitive pricing',
                'Strong in APAC',
                'Solid features'
            ],
            cons: [
                'Limited US presence',
                'Smaller ecosystem',
                'Language barriers',
                'Support challenges'
            ],
            costs: {
                licensing: 55000,
                infrastructure: 35000,
                implementation: 30000,
                training: 15000,
                support: 18000,
                operational: 38000,
                total1Year: 191000,
                total3Year: 375000,
                tco3Year: 375000
            },
            metrics: {
                deploymentDays: 45,
                securityScore: 78,
                userSatisfaction: 74,
                supportRating: 72,
                innovationIndex: 68,
                marketGrowth: 35,
                fteRequired: 1.0,
                roi1Year: 80,
                roi3Year: 210,
                paybackMonths: 15
            },
            capabilities: {
                zeroTrust: 70,
                cloudNative: 55,
                agentless: 80,
                byod: 78,
                iotSupport: 75,
                guestAccess: 80,
                compliance: 75,
                automation: 68,
                aiMl: 60,
                threatDetection: 75,
                cloudIntegration: 60,
                automatedRemediation: 70,
                identityIntegration: 75,
                networkSegmentation: 78,
                riskAnalytics: 70
            },
            compliance: {
                'pci-dss': 76,
                'hipaa': 74,
                'gdpr': 75,
                'sox': 74,
                'iso-27001': 76,
                'nist-csf': 77,
                'ccpa': 73,
                'fedramp': 70,
                'cmmc': 68,
                'nerc-cip': 72
            }
        },
        
        'hpe-clearpass': {
            id: 'hpe-clearpass',
            name: 'HPE ClearPass',
            shortName: 'HPE',
            logo: './img/vendors/hpe-logo.png',
            description: 'Enterprise policy platform (same as Aruba ClearPass)',
            pros: [
                'Enterprise grade',
                'HPE support',
                'Proven platform',
                'Wide adoption'
            ],
            cons: [
                'Complex deployment',
                'High cost',
                'Legacy architecture',
                'Limited cloud'
            ],
            costs: {
                licensing: 95000,
                infrastructure: 65000,
                implementation: 45000,
                training: 20000,
                support: 28000,
                operational: 60000,
                total1Year: 313000,
                total3Year: 633000,
                tco3Year: 633000
            },
            metrics: {
                deploymentDays: 75,
                securityScore: 85,
                userSatisfaction: 76,
                supportRating: 80,
                innovationIndex: 72,
                marketGrowth: 35,
                fteRequired: 1.5,
                roi1Year: 78,
                roi3Year: 210,
                paybackMonths: 15
            },
            capabilities: {
                zeroTrust: 70,
                cloudNative: 45,
                agentless: 65,
                byod: 88,
                iotSupport: 82,
                guestAccess: 90,
                compliance: 82,
                automation: 68,
                aiMl: 60,
                threatDetection: 78,
                cloudIntegration: 60,
                automatedRemediation: 70,
                identityIntegration: 82,
                networkSegmentation: 85,
                riskAnalytics: 72
            },
            compliance: {
                'pci-dss': 86,
                'hipaa': 84,
                'gdpr': 82,
                'sox': 83,
                'iso-27001': 84,
                'nist-csf': 85,
                'ccpa': 81,
                'fedramp': 78,
                'cmmc': 76,
                'nerc-cip': 80
            }
        },
        
        'auconet-bics': {
            id: 'auconet-bics',
            name: 'Auconet BICS',
            shortName: 'Auconet',
            logo: './img/vendors/auconet-logo.png',
            description: 'Automated network access control with strong compliance focus',
            pros: [
                'Strong automation',
                'Good compliance',
                'European focus',
                'GDPR ready'
            ],
            cons: [
                'Limited US presence',
                'Smaller vendor',
                'Limited integrations',
                'Higher cost'
            ],
            costs: {
                licensing: 72000,
                infrastructure: 45000,
                implementation: 35000,
                training: 18000,
                support: 22000,
                operational: 48000,
                total1Year: 240000,
                total3Year: 480000,
                tco3Year: 480000
            },
            metrics: {
                deploymentDays: 60,
                securityScore: 81,
                userSatisfaction: 75,
                supportRating: 76,
                innovationIndex: 70,
                marketGrowth: 28,
                fteRequired: 1.25,
                roi1Year: 75,
                roi3Year: 205,
                paybackMonths: 16
            },
            capabilities: {
                zeroTrust: 72,
                cloudNative: 50,
                agentless: 75,
                byod: 80,
                iotSupport: 78,
                guestAccess: 82,
                compliance: 85,
                automation: 78,
                aiMl: 65,
                threatDetection: 78,
                cloudIntegration: 58,
                automatedRemediation: 76,
                identityIntegration: 78,
                networkSegmentation: 82,
                riskAnalytics: 74
            },
            compliance: {
                'pci-dss': 84,
                'hipaa': 82,
                'gdpr': 90,
                'sox': 82,
                'iso-27001': 85,
                'nist-csf': 83,
                'ccpa': 80,
                'fedramp': 75,
                'cmmc': 73,
                'nerc-cip': 78
            }
        }
    };

    // Safely expose to global scope
    if (typeof window !== 'undefined') {
        // Clear any existing vendor data
        if (window.completeVendorData) {
            delete window.completeVendorData;
        }
        if (window.vendorData) {
            delete window.vendorData;
        }
        
        // Set new data
        window.completeVendorData = completeVendorDataFixed;
        window.vendorData = completeVendorDataFixed;
        
        // Log success
        console.log(`✅ Loaded ${Object.keys(completeVendorDataFixed).length} vendors with complete data (including shortName)`);
    }
})();
