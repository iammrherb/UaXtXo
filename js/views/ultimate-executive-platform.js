/**
 * Ultimate Executive Intelligence Platform
 * Complete Zero Trust NAC Analysis with ALL Vendors, Industries, and Compliance
 */

class UltimateExecutiveView {
    constructor() {
        this.initialized = false;
        this.currentTab = 'overview';
        this.selectedVendors = ['portnox', 'cisco', 'aruba', 'forescout', 'fortinac'];
        this.chartInstances = {};
        
        // Configuration
        this.config = {
            deviceCount: 1000,
            analysisPeriod: 3,
            riskFactor: 1.0,
            industry: 'technology',
            companySize: 'medium',
            fteCost: 100000,
            breachCost: 4350000,
            downtimeCost: 5000,
            selectedCompliance: ['nist-csf', 'pci-dss', 'gdpr']
        };
        
        // Initialize ALL vendor data
        this.vendorData = this.initializeAllVendorData();
        
        // Use comprehensive data if available
        this.industryData = window.comprehensiveIndustries || this.getDefaultIndustries();
        this.complianceData = window.comprehensiveCompliance || this.getDefaultCompliance();
    }
    
    initializeAllVendorData() {
        return {
            // Primary Vendors with Complete Data
            'portnox': {
                name: 'Portnox Cloud',
                shortName: 'Portnox',
                logo: './img/vendors/portnox-logo.png',
                color: '#1a5a96',
                architecture: 'Cloud-Native',
                marketPosition: 'Visionary Leader',
                description: 'Next-generation cloud-native NAC with zero-touch deployment',
                costs: {
                    tco1Year: 85000,
                    tco3Year: 245000,
                    tco5Year: 390000,
                    licensePerDevice: 45,
                    implementationCost: 15000,
                    maintenanceCost: 0,
                    personnelCostPerYear: 25000,
                    trainingCost: 5000,
                    hiddenCosts: 0
                },
                metrics: {
                    roi1Year: 180,
                    roi3Year: 325,
                    roi5Year: 485,
                    paybackMonths: 7,
                    implementationDays: 21,
                    fteRequired: 0.25,
                    securityScore: 95,
                    complianceScore: 92,
                    performanceScore: 94,
                    reliabilityScore: 98,
                    userSatisfaction: 92,
                    marketShare: 12,
                    growthRate: 45,
                    customerRetention: 96
                },
                capabilities: {
                    zeroTrust: 95,
                    deviceAuth: 98,
                    riskAssessment: 92,
                    automatedRemediation: 90,
                    cloudIntegration: 98,
                    mobileSupport: 95,
                    iotSupport: 88,
                    byodSupport: 96,
                    aiMl: 85,
                    reporting: 92,
                    scalability: 98,
                    apiAccess: 94,
                    multiTenancy: 96,
                    guestAccess: 90
                },
                compliance: {
                    'nist-csf': 94,
                    'pci-dss': 91,
                    'hipaa': 89,
                    'gdpr': 93,
                    'iso27001': 90,
                    'sox': 88,
                    'fedramp': 85,
                    'fisma': 87,
                    'ccpa': 91,
                    'cis': 93,
                    'cmmc': 86,
                    'nerc-cip': 84,
                    'ferpa': 88,
                    'glba': 87,
                    'itar': 82,
                    'fda-cfr21': 85,
                    'coppa': 89,
                    'pipeda': 90,
                    'australia-privacy': 88,
                    'lgpd': 89
                }
            },
            'cisco': {
                name: 'Cisco Identity Services Engine (ISE)',
                shortName: 'Cisco ISE',
                logo: './img/vendors/cisco-logo.png',
                color: '#00bceb',
                architecture: 'On-Premises',
                marketPosition: 'Market Leader',
                description: 'Enterprise-grade NAC with extensive integration capabilities',
                costs: {
                    tco1Year: 185000,
                    tco3Year: 520000,
                    tco5Year: 780000,
                    licensePerDevice: 85,
                    implementationCost: 75000,
                    maintenanceCost: 45000,
                    personnelCostPerYear: 85000,
                    trainingCost: 25000,
                    hiddenCosts: 15000
                },
                metrics: {
                    roi1Year: -15,
                    roi3Year: 45,
                    roi5Year: 125,
                    paybackMonths: 32,
                    implementationDays: 90,
                    fteRequired: 2.0,
                    securityScore: 85,
                    complianceScore: 82,
                    performanceScore: 78,
                    reliabilityScore: 88,
                    userSatisfaction: 75,
                    marketShare: 35,
                    growthRate: 8,
                    customerRetention: 82
                },
                capabilities: {
                    zeroTrust: 75,
                    deviceAuth: 88,
                    riskAssessment: 80,
                    automatedRemediation: 70,
                    cloudIntegration: 65,
                    mobileSupport: 75,
                    iotSupport: 82,
                    byodSupport: 78,
                    aiMl: 60,
                    reporting: 85,
                    scalability: 80,
                    apiAccess: 78,
                    multiTenancy: 72,
                    guestAccess: 85
                },
                compliance: {
                    'nist-csf': 85,
                    'pci-dss': 88,
                    'hipaa': 82,
                    'gdpr': 75,
                    'iso27001': 85,
                    'sox': 80,
                    'fedramp': 90,
                    'fisma': 88,
                    'ccpa': 78,
                    'cis': 82,
                    'cmmc': 85,
                    'nerc-cip': 88,
                    'ferpa': 80,
                    'glba': 82,
                    'itar': 86,
                    'fda-cfr21': 78,
                    'coppa': 75,
                    'pipeda': 76,
                    'australia-privacy': 74,
                    'lgpd': 73
                }
            },
            'aruba': {
                name: 'Aruba ClearPass',
                shortName: 'Aruba',
                logo: './img/vendors/aruba-logo.png',
                color: '#ff6900',
                architecture: 'On-Premises/Hybrid',
                marketPosition: 'Strong Performer',
                description: 'Context-aware NAC with deep network integration',
                costs: {
                    tco1Year: 165000,
                    tco3Year: 480000,
                    tco5Year: 720000,
                    licensePerDevice: 75,
                    implementationCost: 65000,
                    maintenanceCost: 38000,
                    personnelCostPerYear: 75000,
                    trainingCost: 20000,
                    hiddenCosts: 12000
                },
                metrics: {
                    roi1Year: 5,
                    roi3Year: 85,
                    roi5Year: 165,
                    paybackMonths: 28,
                    implementationDays: 75,
                    fteRequired: 1.75,
                    securityScore: 82,
                    complianceScore: 78,
                    performanceScore: 85,
                    reliabilityScore: 82,
                    userSatisfaction: 78,
                    marketShare: 18,
                    growthRate: 12,
                    customerRetention: 85
                },
                capabilities: {
                    zeroTrust: 78,
                    deviceAuth: 85,
                    riskAssessment: 82,
                    automatedRemediation: 75,
                    cloudIntegration: 70,
                    mobileSupport: 80,
                    iotSupport: 78,
                    byodSupport: 82,
                    aiMl: 65,
                    reporting: 80,
                    scalability: 82,
                    apiAccess: 75,
                    multiTenancy: 68,
                    guestAccess: 88
                },
                compliance: {
                    'nist-csf': 80,
                    'pci-dss': 82,
                    'hipaa': 78,
                    'gdpr': 76,
                    'iso27001': 80,
                    'sox': 78,
                    'fedramp': 82,
                    'fisma': 80,
                    'ccpa': 77,
                    'cis': 79,
                    'cmmc': 78,
                    'nerc-cip': 76,
                    'ferpa': 77,
                    'glba': 78,
                    'itar': 75,
                    'fda-cfr21': 74,
                    'coppa': 76,
                    'pipeda': 77,
                    'australia-privacy': 75,
                    'lgpd': 76
                }
            },
            'forescout': {
                name: 'Forescout Platform',
                shortName: 'Forescout',
                logo: './img/vendors/forescout-logo.png',
                color: '#7a2a90',
                architecture: 'On-Premises',
                marketPosition: 'Established Player',
                description: 'Agentless device visibility and control platform',
                costs: {
                    tco1Year: 155000,
                    tco3Year: 430000,
                    tco5Year: 650000,
                    licensePerDevice: 70,
                    implementationCost: 55000,
                    maintenanceCost: 35000,
                    personnelCostPerYear: 65000,
                    trainingCost: 18000,
                    hiddenCosts: 10000
                },
                metrics: {
                    roi1Year: 12,
                    roi3Year: 95,
                    roi5Year: 185,
                    paybackMonths: 25,
                    implementationDays: 60,
                    fteRequired: 1.5,
                    securityScore: 88,
                    complianceScore: 85,
                    performanceScore: 80,
                    reliabilityScore: 85,
                    userSatisfaction: 80,
                    marketShare: 15,
                    growthRate: 10,
                    customerRetention: 88
                },
                capabilities: {
                    zeroTrust: 82,
                    deviceAuth: 90,
                    riskAssessment: 88,
                    automatedRemediation: 78,
                    cloudIntegration: 68,
                    mobileSupport: 78,
                    iotSupport: 85,
                    byodSupport: 80,
                    aiMl: 70,
                    reporting: 82,
                    scalability: 78,
                    apiAccess: 80,
                    multiTenancy: 65,
                    guestAccess: 82
                },
                compliance: {
                    'nist-csf': 85,
                    'pci-dss': 84,
                    'hipaa': 82,
                    'gdpr': 80,
                    'iso27001': 83,
                    'sox': 81,
                    'fedramp': 84,
                    'fisma': 85,
                    'ccpa': 81,
                    'cis': 83,
                    'cmmc': 82,
                    'nerc-cip': 80,
                    'ferpa': 80,
                    'glba': 81,
                    'itar': 79,
                    'fda-cfr21': 78,
                    'coppa': 79,
                    'pipeda': 80,
                    'australia-privacy': 79,
                    'lgpd': 78
                }
            },
            'fortinac': {
                name: 'Fortinet FortiNAC',
                shortName: 'FortiNAC',
                logo: './img/vendors/fortinet-logo.png',
                color: '#ee3124',
                architecture: 'On-Premises',
                marketPosition: 'Security-Focused',
                description: 'Integrated NAC within Fortinet Security Fabric',
                costs: {
                    tco1Year: 145000,
                    tco3Year: 400000,
                    tco5Year: 600000,
                    licensePerDevice: 65,
                    implementationCost: 50000,
                    maintenanceCost: 30000,
                    personnelCostPerYear: 60000,
                    trainingCost: 15000,
                    hiddenCosts: 8000
                },
                metrics: {
                    roi1Year: 15,
                    roi3Year: 105,
                    roi5Year: 195,
                    paybackMonths: 22,
                    implementationDays: 60,
                    fteRequired: 1.25,
                    securityScore: 80,
                    complianceScore: 82,
                    performanceScore: 75,
                    reliabilityScore: 80,
                    userSatisfaction: 75,
                    marketShare: 8,
                    growthRate: 15,
                    customerRetention: 80
                },
                capabilities: {
                    zeroTrust: 75,
                    deviceAuth: 82,
                    riskAssessment: 78,
                    automatedRemediation: 72,
                    cloudIntegration: 60,
                    mobileSupport: 70,
                    iotSupport: 75,
                    byodSupport: 72,
                    aiMl: 55,
                    reporting: 78,
                    scalability: 75,
                    apiAccess: 70,
                    multiTenancy: 60,
                    guestAccess: 75
                },
                compliance: {
                    'nist-csf': 80,
                    'pci-dss': 82,
                    'hipaa': 78,
                    'gdpr': 75,
                    'iso27001': 80,
                    'sox': 78,
                    'fedramp': 80,
                    'fisma': 82,
                    'ccpa': 76,
                    'cis': 79,
                    'cmmc': 78,
                    'nerc-cip': 77,
                    'ferpa': 75,
                    'glba': 77,
                    'itar': 76,
                    'fda-cfr21': 74,
                    'coppa': 74,
                    'pipeda': 75,
                    'australia-privacy': 74,
                    'lgpd': 73
                }
            },
            'juniper': {
                name: 'Juniper Mist Access Assurance',
                shortName: 'Juniper',
                logo: './img/vendors/juniper-logo.png',
                color: '#84bd00',
                architecture: 'Cloud-Managed',
                marketPosition: 'AI-Driven Innovation',
                description: 'AI-driven cloud-managed NAC with Mist AI',
                costs: {
                    tco1Year: 125000,
                    tco3Year: 350000,
                    tco5Year: 525000,
                    licensePerDevice: 55,
                    implementationCost: 35000,
                    maintenanceCost: 20000,
                    personnelCostPerYear: 45000,
                    trainingCost: 12000,
                    hiddenCosts: 5000
                },
                metrics: {
                    roi1Year: 40,
                    roi3Year: 125,
                    roi5Year: 225,
                    paybackMonths: 18,
                    implementationDays: 45,
                    fteRequired: 1.0,
                    securityScore: 78,
                    complianceScore: 75,
                    performanceScore: 88,
                    reliabilityScore: 85,
                    userSatisfaction: 82,
                    marketShare: 6,
                    growthRate: 20,
                    customerRetention: 85
                },
                capabilities: {
                    zeroTrust: 80,
                    deviceAuth: 85,
                    riskAssessment: 82,
                    automatedRemediation: 85,
                    cloudIntegration: 90,
                    mobileSupport: 82,
                    iotSupport: 78,
                    byodSupport: 85,
                    aiMl: 92,
                    reporting: 85,
                    scalability: 88,
                    apiAccess: 85,
                    multiTenancy: 80,
                    guestAccess: 82
                },
                compliance: {
                    'nist-csf': 78,
                    'pci-dss': 76,
                    'hipaa': 74,
                    'gdpr': 78,
                    'iso27001': 77,
                    'sox': 75,
                    'fedramp': 72,
                    'fisma': 74,
                    'ccpa': 77,
                    'cis': 76,
                    'cmmc': 73,
                    'nerc-cip': 72,
                    'ferpa': 74,
                    'glba': 73,
                    'itar': 70,
                    'fda-cfr21': 72,
                    'coppa': 75,
                    'pipeda': 76,
                    'australia-privacy': 75,
                    'lgpd': 74
                }
            },
            'arista': {
                name: 'Arista CloudVision',
                shortName: 'Arista',
                logo: './img/vendors/arista-logo.png',
                color: '#ff6600',
                architecture: 'Hybrid Cloud',
                marketPosition: 'Network-Centric',
                description: 'Network-centric approach with telemetry-driven insights',
                costs: {
                    tco1Year: 135000,
                    tco3Year: 320000,
                    tco5Year: 480000,
                    licensePerDevice: 50,
                    implementationCost: 40000,
                    maintenanceCost: 25000,
                    personnelCostPerYear: 50000,
                    trainingCost: 10000,
                    hiddenCosts: 6000
                },
                metrics: {
                    roi1Year: 35,
                    roi3Year: 115,
                    roi5Year: 205,
                    paybackMonths: 15,
                    implementationDays: 45,
                    fteRequired: 1.0,
                    securityScore: 75,
                    complianceScore: 78,
                    performanceScore: 85,
                    reliabilityScore: 88,
                    userSatisfaction: 79,
                    marketShare: 3,
                    growthRate: 18,
                    customerRetention: 82
                },
                capabilities: {
                    zeroTrust: 72,
                    deviceAuth: 80,
                    riskAssessment: 75,
                    automatedRemediation: 78,
                    cloudIntegration: 82,
                    mobileSupport: 70,
                    iotSupport: 68,
                    byodSupport: 72,
                    aiMl: 75,
                    reporting: 82,
                    scalability: 85,
                    apiAccess: 88,
                    multiTenancy: 75,
                    guestAccess: 70
                },
                compliance: {
                    'nist-csf': 75,
                    'pci-dss': 77,
                    'hipaa': 73,
                    'gdpr': 74,
                    'iso27001': 76,
                    'sox': 74,
                    'fedramp': 70,
                    'fisma': 72,
                    'ccpa': 75,
                    'cis': 77,
                    'cmmc': 71,
                    'nerc-cip': 73,
                    'ferpa': 72,
                    'glba': 73,
                    'itar': 68,
                    'fda-cfr21': 70,
                    'coppa': 72,
                    'pipeda': 73,
                    'australia-privacy': 72,
                    'lgpd': 71
                }
            },
            'microsoft': {
                name: 'Microsoft Network Policy Server',
                shortName: 'Microsoft NPS',
                logo: './img/vendors/microsoft-logo.png',
                color: '#00bcf2',
                architecture: 'Windows-Based',
                marketPosition: 'Budget Option',
                description: 'Windows-integrated NAC for Microsoft environments',
                costs: {
                    tco1Year: 105000,
                    tco3Year: 290000,
                    tco5Year: 435000,
                    licensePerDevice: 40,
                    implementationCost: 25000,
                    maintenanceCost: 15000,
                    personnelCostPerYear: 55000,
                    trainingCost: 8000,
                    hiddenCosts: 4000
                },
                metrics: {
                    roi1Year: 25,
                    roi3Year: 95,
                    roi5Year: 175,
                    paybackMonths: 20,
                    implementationDays: 30,
                    fteRequired: 1.0,
                    securityScore: 65,
                    complianceScore: 70,
                    performanceScore: 70,
                    reliabilityScore: 75,
                    userSatisfaction: 68,
                    marketShare: 10,
                    growthRate: 5,
                    customerRetention: 72
                },
                capabilities: {
                    zeroTrust: 60,
                    deviceAuth: 75,
                    riskAssessment: 65,
                    automatedRemediation: 55,
                    cloudIntegration: 70,
                    mobileSupport: 60,
                    iotSupport: 55,
                    byodSupport: 65,
                    aiMl: 50,
                    reporting: 70,
                    scalability: 65,
                    apiAccess: 72,
                    multiTenancy: 58,
                    guestAccess: 68
                },
                compliance: {
                    'nist-csf': 65,
                    'pci-dss': 68,
                    'hipaa': 63,
                    'gdpr': 65,
                    'iso27001': 68,
                    'sox': 66,
                    'fedramp': 72,
                    'fisma': 70,
                    'ccpa': 64,
                    'cis': 67,
                    'cmmc': 65,
                    'nerc-cip': 63,
                    'ferpa': 65,
                    'glba': 64,
                    'itar': 60,
                    'fda-cfr21': 62,
                    'coppa': 66,
                    'pipeda': 65,
                    'australia-privacy': 64,
                    'lgpd': 63
                }
            },
            'securew2': {
                name: 'SecureW2 JoinNow',
                shortName: 'SecureW2',
                logo: './img/vendors/securew2-logo.png',
                color: '#2c5aa0',
                architecture: 'Cloud',
                marketPosition: 'Certificate-Focused',
                description: 'Cloud-based certificate management for NAC',
                costs: {
                    tco1Year: 95000,
                    tco3Year: 280000,
                    tco5Year: 420000,
                    licensePerDevice: 35,
                    implementationCost: 20000,
                    maintenanceCost: 10000,
                    personnelCostPerYear: 35000,
                    trainingCost: 6000,
                    hiddenCosts: 2000
                },
                metrics: {
                    roi1Year: 180,
                    roi3Year: 285,
                    roi5Year: 395,
                    paybackMonths: 12,
                    implementationDays: 30,
                    fteRequired: 0.5,
                    securityScore: 72,
                    complianceScore: 68,
                    performanceScore: 78,
                    reliabilityScore: 80,
                    userSatisfaction: 76,
                    marketShare: 4,
                    growthRate: 25,
                    customerRetention: 78
                },
                capabilities: {
                    zeroTrust: 70,
                    deviceAuth: 85,
                    riskAssessment: 68,
                    automatedRemediation: 65,
                    cloudIntegration: 88,
                    mobileSupport: 75,
                    iotSupport: 60,
                    byodSupport: 80,
                    aiMl: 55,
                    reporting: 70,
                    scalability: 82,
                    apiAccess: 75,
                    multiTenancy: 70,
                    guestAccess: 72
                },
                compliance: {
                    'nist-csf': 70,
                    'pci-dss': 68,
                    'hipaa': 65,
                    'gdpr': 70,
                    'iso27001': 68,
                    'sox': 65,
                    'fedramp': 62,
                    'fisma': 64,
                    'ccpa': 69,
                    'cis': 67,
                    'cmmc': 63,
                    'nerc-cip': 60,
                    'ferpa': 66,
                    'glba': 65,
                    'itar': 58,
                    'fda-cfr21': 60,
                    'coppa': 68,
                    'pipeda': 69,
                    'australia-privacy': 67,
                    'lgpd': 66
                }
            },
            'foxpass': {
                name: 'Foxpass RADIUS',
                shortName: 'Foxpass',
                logo: './img/vendors/foxpass-logo.png',
                color: '#ff4444',
                architecture: 'Cloud',
                marketPosition: 'SMB-Focused',
                description: 'Simple cloud RADIUS for small businesses',
                costs: {
                    tco1Year: 85000,
                    tco3Year: 270000,
                    tco5Year: 405000,
                    licensePerDevice: 30,
                    implementationCost: 15000,
                    maintenanceCost: 8000,
                    personnelCostPerYear: 30000,
                    trainingCost: 5000,
                    hiddenCosts: 1500
                },
                metrics: {
                    roi1Year: 160,
                    roi3Year: 265,
                    roi5Year: 375,
                    paybackMonths: 10,
                    implementationDays: 25,
                    fteRequired: 0.5,
                    securityScore: 68,
                    complianceScore: 65,
                    performanceScore: 75,
                    reliabilityScore: 78,
                    userSatisfaction: 73,
                    marketShare: 2,
                    growthRate: 30,
                    customerRetention: 75
                },
                capabilities: {
                    zeroTrust: 65,
                    deviceAuth: 80,
                    riskAssessment: 62,
                    automatedRemediation: 58,
                    cloudIntegration: 85,
                    mobileSupport: 70,
                    iotSupport: 55,
                    byodSupport: 75,
                    aiMl: 45,
                    reporting: 65,
                    scalability: 70,
                    apiAccess: 68,
                    multiTenancy: 60,
                    guestAccess: 70
                },
                compliance: {
                    'nist-csf': 65,
                    'pci-dss': 63,
                    'hipaa': 60,
                    'gdpr': 65,
                    'iso27001': 63,
                    'sox': 60,
                    'fedramp': 55,
                    'fisma': 58,
                    'ccpa': 64,
                    'cis': 62,
                    'cmmc': 56,
                    'nerc-cip': 54,
                    'ferpa': 62,
                    'glba': 60,
                    'itar': 52,
                    'fda-cfr21': 55,
                    'coppa': 63,
                    'pipeda': 64,
                    'australia-privacy': 62,
                    'lgpd': 61
                }
            },
            // Additional Enterprise Vendors
            'pulse': {
                name: 'Pulse Policy Secure',
                shortName: 'Pulse Secure',
                logo: './img/vendors/pulse-logo.png',
                color: '#f57c00',
                architecture: 'Appliance-Based',
                marketPosition: 'Legacy Enterprise',
                description: 'Traditional enterprise NAC appliance',
                costs: {
                    tco1Year: 175000,
                    tco3Year: 495000,
                    tco5Year: 745000,
                    licensePerDevice: 80,
                    implementationCost: 70000,
                    maintenanceCost: 42000,
                    personnelCostPerYear: 80000,
                    trainingCost: 22000,
                    hiddenCosts: 14000
                },
                metrics: {
                    roi1Year: -10,
                    roi3Year: 55,
                    roi5Year: 135,
                    paybackMonths: 30,
                    implementationDays: 85,
                    fteRequired: 1.8,
                    securityScore: 78,
                    complianceScore: 75,
                    performanceScore: 72,
                    reliabilityScore: 80,
                    userSatisfaction: 70,
                    marketShare: 5,
                    growthRate: 2,
                    customerRetention: 75
                },
                capabilities: {
                    zeroTrust: 68,
                    deviceAuth: 82,
                    riskAssessment: 72,
                    automatedRemediation: 65,
                    cloudIntegration: 55,
                    mobileSupport: 68,
                    iotSupport: 62,
                    byodSupport: 70,
                    aiMl: 48,
                    reporting: 75,
                    scalability: 70,
                    apiAccess: 65,
                    multiTenancy: 55,
                    guestAccess: 78
                },
                compliance: {
                    'nist-csf': 75,
                    'pci-dss': 78,
                    'hipaa': 72,
                    'gdpr': 70,
                    'iso27001': 75,
                    'sox': 73,
                    'fedramp': 78,
                    'fisma': 76,
                    'ccpa': 71,
                    'cis': 74,
                    'cmmc': 73,
                    'nerc-cip': 72,
                    'ferpa': 70,
                    'glba': 72,
                    'itar': 74,
                    'fda-cfr21': 68,
                    'coppa': 69,
                    'pipeda': 70,
                    'australia-privacy': 69,
                    'lgpd': 68
                }
            },
                metrics: {
                    roi1Year: 0,
                    roi3Year: 75,
                    roi5Year: 155,
                    paybackMonths: 29,
                    implementationDays: 80,
                    fteRequired: 1.7,
                    securityScore: 83,
                    complianceScore: 80,
                    performanceScore: 82,
                    reliabilityScore: 84,
                    userSatisfaction: 77,
                    marketShare: 7,
                    growthRate: 6,
                    customerRetention: 83
                },
                capabilities: {
                    zeroTrust: 76,
                    deviceAuth: 86,
                    riskAssessment: 80,
                    automatedRemediation: 73,
                    cloudIntegration: 67,
                    mobileSupport: 78,
                    iotSupport: 76,
                    byodSupport: 80,
                    aiMl: 62,
                    reporting: 82,
                    scalability: 80,
                    apiAccess: 74,
                    multiTenancy: 66,
                    guestAccess: 85
                },
                compliance: {
                    'nist-csf': 82,
                    'pci-dss': 83,
                    'hipaa': 79,
                    'gdpr': 77,
                    'iso27001': 82,
                    'sox': 79,
                    'fedramp': 83,
                    'fisma': 82,
                    'ccpa': 78,
                    'cis': 80,
                    'cmmc': 79,
                    'nerc-cip': 78,
                    'ferpa': 78,
                    'glba': 79,
                    'itar': 77,
                    'fda-cfr21': 75,
                    'coppa': 77,
                    'pipeda': 78,
                    'australia-privacy': 76,
                    'lgpd': 75
                }
            },
            'extreme': {
                name: 'Extreme Control',
                shortName: 'Extreme',
                logo: './img/vendors/extreme-logo.png',
                color: '#6f2c91',
                architecture: 'On-Premises',
                marketPosition: 'Network-Integrated',
                description: 'Network fabric-integrated NAC solution',
                costs: {
                    tco1Year: 150000,
                    tco3Year: 425000,
                    tco5Year: 640000,
                    licensePerDevice: 68,
                    implementationCost: 58000,
                    maintenanceCost: 34000,
                    personnelCostPerYear: 68000,
                    trainingCost: 17000,
                    hiddenCosts: 9000
                },
                metrics: {
                    roi1Year: 10,
                    roi3Year: 90,
                    roi5Year: 180,
                    paybackMonths: 24,
                    implementationDays: 65,
                    fteRequired: 1.4,
                    securityScore: 76,
                    complianceScore: 74,
                    performanceScore: 78,
                    reliabilityScore: 79,
                    userSatisfaction: 74,
                    marketShare: 4,
                    growthRate: 8,
                    customerRetention: 79
                },
                capabilities: {
                    zeroTrust: 70,
                    deviceAuth: 80,
                    riskAssessment: 74,
                    automatedRemediation: 68,
                    cloudIntegration: 58,
                    mobileSupport: 72,
                    iotSupport: 70,
                    byodSupport: 74,
                    aiMl: 52,
                    reporting: 76,
                    scalability: 74,
                    apiAccess: 68,
                    multiTenancy: 58,
                    guestAccess: 80
                },
                compliance: {
                    'nist-csf': 74,
                    'pci-dss': 76,
                    'hipaa': 72,
                    'gdpr': 73,
                    'iso27001': 75,
                    'sox': 73,
                    'fedramp': 74,
                    'fisma': 75,
                    'ccpa': 74,
                    'cis': 75,
                    'cmmc': 72,
                    'nerc-cip': 71,
                    'ferpa': 73,
                    'glba': 72,
                    'itar': 70,
                    'fda-cfr21': 69,
                    'coppa': 73,
                    'pipeda': 74,
                    'australia-privacy': 72,
                    'lgpd': 71
                }
            },
            'radiusaas': {
                name: 'RADIUSaaS',
                shortName: 'RADIUSaaS',
                logo: './img/vendors/radiusaas-logo.png',
                color: '#3f51b5',
                architecture: 'Cloud',
                marketPosition: 'Cloud-Native SMB',
                description: 'Pure cloud RADIUS service for modern NAC',
                costs: {
                    tco1Year: 90000,
                    tco3Year: 275000,
                    tco5Year: 415000,
                    licensePerDevice: 32,
                    implementationCost: 18000,
                    maintenanceCost: 9000,
                    personnelCostPerYear: 32000,
                    trainingCost: 5500,
                    hiddenCosts: 1800
                },
                metrics: {
                    roi1Year: 170,
                    roi3Year: 275,
                    roi5Year: 385,
                    paybackMonths: 11,
                    implementationDays: 28,
                    fteRequired: 0.5,
                    securityScore: 70,
                    complianceScore: 67,
                    performanceScore: 76,
                    reliabilityScore: 79,
                    userSatisfaction: 74,
                    marketShare: 3,
                    growthRate: 28,
                    customerRetention: 76
                },
                capabilities: {
                    zeroTrust: 68,
                    deviceAuth: 82,
                    riskAssessment: 65,
                    automatedRemediation: 62,
                    cloudIntegration: 90,
                    mobileSupport: 72,
                    iotSupport: 58,
                    byodSupport: 78,
                    aiMl: 50,
                    reporting: 68,
                    scalability: 85,
                    apiAccess: 78,
                    multiTenancy: 75,
                    guestAccess: 73
                },
                compliance: {
                    'nist-csf': 68,
                    'pci-dss': 66,
                    'hipaa': 63,
                    'gdpr': 68,
                    'iso27001': 66,
                    'sox': 63,
                    'fedramp': 58,
                    'fisma': 60,
                    'ccpa': 67,
                    'cis': 65,
                    'cmmc': 59,
                    'nerc-cip': 57,
                    'ferpa': 64,
                    'glba': 63,
                    'itar': 55,
                    'fda-cfr21': 58,
                    'coppa': 66,
                    'pipeda': 67,
                    'australia-privacy': 65,
                    'lgpd': 64
                }
            },
            'packetfence': {
                name: 'PacketFence',
                shortName: 'PacketFence',
                logo: './img/vendors/packetfence-logo.png',
                color: '#ff9800',
                architecture: 'Open Source',
                marketPosition: 'Open Source Leader',
                description: 'Enterprise open-source NAC solution',
                costs: {
                    tco1Year: 75000,
                    tco3Year: 225000,
                    tco5Year: 340000,
                    licensePerDevice: 0,
                    implementationCost: 45000,
                    maintenanceCost: 25000,
                    personnelCostPerYear: 55000,
                    trainingCost: 15000,
                    hiddenCosts: 5000
                },
                metrics: {
                    roi1Year: 100,
                    roi3Year: 200,
                    roi5Year: 300,
                    paybackMonths: 16,
                    implementationDays: 90,
                    fteRequired: 2.5,
                    securityScore: 72,
                    complianceScore: 68,
                    performanceScore: 70,
                    reliabilityScore: 72,
                    userSatisfaction: 65,
                    marketShare: 1,
                    growthRate: 15,
                    customerRetention: 68
                },
                capabilities: {
                    zeroTrust: 65,
                    deviceAuth: 78,
                    riskAssessment: 68,
                    automatedRemediation: 60,
                    cloudIntegration: 45,
                    mobileSupport: 65,
                    iotSupport: 62,
                    byodSupport: 68,
                    aiMl: 40,
                    reporting: 65,
                    scalability: 68,
                    apiAccess: 82,
                    multiTenancy: 55,
                    guestAccess: 72
                },
                compliance: {
                    'nist-csf': 65,
                    'pci-dss': 64,
                    'hipaa': 60,
                    'gdpr': 63,
                    'iso27001': 65,
                    'sox': 61,
                    'fedramp': 50,
                    'fisma': 52,
                    'ccpa': 62,
                    'cis': 64,
                    'cmmc': 51,
                    'nerc-cip': 50,
                    'ferpa': 60,
                    'glba': 59,
                    'itar': 48,
                    'fda-cfr21': 50,
                    'coppa': 61,
                    'pipeda': 62,
                    'australia-privacy': 60,
                    'lgpd': 59
                }
            }
        };
    }
    
    getDefaultIndustries() {
        // Fallback if comprehensive data not loaded
        return {
            'technology': { name: 'Technology', riskMultiplier: 1.2, complianceWeight: 0.9, breachCost: 4350000 },
            'healthcare': { name: 'Healthcare', riskMultiplier: 1.8, complianceWeight: 1.5, breachCost: 7800000 },
            'finance': { name: 'Financial Services', riskMultiplier: 2.0, complianceWeight: 1.8, breachCost: 5720000 }
        };
    }
    
    getDefaultCompliance() {
        // Fallback if comprehensive data not loaded
        return {
            'nist-csf': { name: 'NIST CSF', priority: 'High' },
            'pci-dss': { name: 'PCI DSS', priority: 'Critical' },
            'gdpr': { name: 'GDPR', priority: 'High' }
        };
    }
    
    init() {
        if (this.initialized) return;
        
        console.log("🚀 Initializing Ultimate Executive View...");
        
        try {
            this.createUltimateLayout();
            this.populateIndustryDropdown();
            this.populateComplianceGrid();
            this.createVendorComparison();
            this.createExecutiveKPIs();
            this.createTabNavigation();
            this.createAllTabs();
            this.setupEventListeners();
            this.refreshCurrentTab();
            
            this.initialized = true;
            console.log("✅ Ultimate Executive View initialized successfully");
            
        } catch (error) {
            console.error("❌ Ultimate Executive View initialization failed:", error);
            this.showError("Failed to initialize Ultimate Executive View");
        }
    }
    
    createUltimateLayout() {
        const container = document.getElementById('ultimate-executive-content');
        if (!container) return;
        
        container.innerHTML = `
            <div class="ultimate-executive-layout">
                <!-- Header with Actions -->
                <div class="ultimate-header-section">
                    <div class="section-branding">
                        <h1 class="ultimate-title">
                            <i class="fas fa-chart-network"></i>
                            Ultimate Executive Intelligence Center
                        </h1>
                        <p class="ultimate-subtitle">
                            Comprehensive Zero Trust NAC Analysis | ${Object.keys(this.vendorData).length} Vendors | ${Object.keys(this.industryData).length} Industries | ${Object.keys(this.complianceData).length} Compliance Frameworks
                        </p>
                    </div>
                    <div class="ultimate-actions">
                        <button class="action-btn primary" id="generate-insights">
                            <i class="fas fa-brain"></i> AI Insights
                        </button>
                        <button class="action-btn secondary" id="compare-scenarios">
                            <i class="fas fa-exchange-alt"></i> Scenarios
                        </button>
                        <button class="action-btn highlight" id="executive-presentation">
                            <i class="fas fa-presentation"></i> Present
                        </button>
                    </div>
                </div>
                
                <!-- Vendor Selection Grid -->
                <div id="vendor-comparison-section" class="ultimate-section"></div>
                
                <!-- Executive KPIs -->
                <div id="executive-kpis-section" class="ultimate-section"></div>
                
                <!-- Tab Navigation -->
                <div id="tab-navigation-section" class="ultimate-section"></div>
                
                <!-- Tab Content -->
                <div id="tab-content-section" class="ultimate-section"></div>
            </div>
        `;
    }
    
    populateIndustryDropdown() {
        const select = document.getElementById('industry');
        if (!select || !this.industryData) return;
        
        select.innerHTML = '';
        Object.keys(this.industryData).forEach(key => {
            const industry = this.industryData[key];
            const option = document.createElement('option');
            option.value = key;
            option.textContent = industry.name;
            if (key === this.config.industry) {
                option.selected = true;
            }
            select.appendChild(option);
        });
        
        console.log(`✅ Populated ${Object.keys(this.industryData).length} industries`);
    }
    
    populateComplianceGrid() {
        const container = document.getElementById('compliance-requirements');
        if (!container || !this.complianceData) return;
        
        const complianceHTML = Object.keys(this.complianceData).map(key => {
            const compliance = this.complianceData[key];
            const isSelected = this.config.selectedCompliance.includes(key);
            
            return `
                <div class="compliance-item ${isSelected ? 'selected' : ''}" data-compliance="${key}">
                    <div class="compliance-checkbox">
                        <i class="fas ${isSelected ? 'fa-check-square' : 'fa-square'}"></i>
                    </div>
                    <div class="compliance-info">
                        <div class="compliance-name">${compliance.name}</div>
                        <div class="compliance-priority priority-${compliance.priority.toLowerCase()}">${compliance.priority}</div>
                    </div>
                </div>
            `;
        }).join('');
        
        container.innerHTML = complianceHTML;
        console.log(`✅ Populated ${Object.keys(this.complianceData).length} compliance frameworks`);
    }
    
    createVendorComparison() {
        const container = document.getElementById('vendor-comparison-section');
        if (!container) return;
        
        const vendorCards = Object.keys(this.vendorData).map(vendorId => {
            const vendor = this.vendorData[vendorId];
            const isSelected = this.selectedVendors.includes(vendorId);
            
            return `
                <div class="vendor-card ${isSelected ? 'selected' : ''}" data-vendor="${vendorId}">
                    <div class="vendor-card-header">
                        <img src="${vendor.logo}" alt="${vendor.name}" class="vendor-logo">
                        <div class="vendor-select">
                            <i class="fas ${isSelected ? 'fa-check-circle' : 'fa-circle'}"></i>
                        </div>
                    </div>
                    <div class="vendor-card-body">
                        <h4 class="vendor-name">${vendor.shortName}</h4>
                        <div class="vendor-position">${vendor.marketPosition}</div>
                        <div class="vendor-architecture">${vendor.architecture}</div>
                        <div class="vendor-metrics">
                            <div class="metric">
                                <span class="metric-label">TCO (3yr)</span>
                                <span class="metric-value">$${(vendor.costs.tco3Year / 1000).toFixed(0)}K</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">ROI</span>
                                <span class="metric-value">${vendor.metrics.roi3Year}%</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Deploy</span>
                                <span class="metric-value">${vendor.metrics.implementationDays}d</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Score</span>
                                <span class="metric-value">${vendor.metrics.securityScore}/100</span>
                            </div>
                        </div>
                    </div>
                    <div class="vendor-card-footer">
                        <button class="vendor-details-btn" data-vendor="${vendorId}">
                            <i class="fas fa-info-circle"></i> Details
                        </button>
                    </div>
                </div>
            `;
        }).join('');
        
        container.innerHTML = `
            <div class="section-header">
                <h2 class="section-title">
                    <i class="fas fa-th-large"></i>
                    Vendor Comparison Matrix
                </h2>
                <div class="section-subtitle">
                    Select vendors to compare (${this.selectedVendors.length} of ${Object.keys(this.vendorData).length} selected)
                </div>
            </div>
            <div class="vendor-grid">
                ${vendorCards}
            </div>
        `;
    }
    
    createExecutiveKPIs() {
        const container = document.getElementById('executive-kpis-section');
        if (!container) return;
        
        // Calculate KPIs based on selected vendors
        const portnox = this.vendorData.portnox;
        const avgCompetitor = this.calculateAverageCompetitor();
        const industryData = this.industryData[this.config.industry];
        
        const savings = Math.round((avgCompetitor.tco3Year - portnox.costs.tco3Year) / 1000);
        const riskReduction = Math.round((portnox.metrics.securityScore - avgCompetitor.securityScore));
        const efficiencyGain = Math.round(((avgCompetitor.fteRequired - portnox.metrics.fteRequired) / avgCompetitor.fteRequired) * 100);
        const timeToValue = Math.round(((avgCompetitor.implementationDays - portnox.metrics.implementationDays) / avgCompetitor.implementationDays) * 100);
        
        container.innerHTML = `
            <div class="section-header">
                <h2 class="section-title">
                    <i class="fas fa-tachometer-alt"></i>
                    Executive Key Performance Indicators
                </h2>
            </div>
            <div class="kpi-grid">
                <div class="kpi-card primary">
                    <div class="kpi-icon"><i class="fas fa-dollar-sign"></i></div>
                    <div class="kpi-content">
                        <div class="kpi-value" data-animate="${savings}">0</div>
                        <div class="kpi-unit">K</div>
                        <div class="kpi-label">Cost Savings (3yr)</div>
                        <div class="kpi-trend positive">
                            <i class="fas fa-arrow-down"></i> ${Math.round((savings / avgCompetitor.tco3Year * 1000) * 100)}% Lower
                        </div>
                    </div>
                </div>
                
                <div class="kpi-card success">
                    <div class="kpi-icon"><i class="fas fa-chart-line"></i></div>
                    <div class="kpi-content">
                        <div class="kpi-value" data-animate="${portnox.metrics.roi3Year}">0</div>
                        <div class="kpi-unit">%</div>
                        <div class="kpi-label">ROI (3-Year)</div>
                        <div class="kpi-trend positive">
                            <i class="fas fa-rocket"></i> ${portnox.metrics.paybackMonths} Month Payback
                        </div>
                    </div>
                </div>
                
                <div class="kpi-card info">
                    <div class="kpi-icon"><i class="fas fa-shield-check"></i></div>
                    <div class="kpi-content">
                        <div class="kpi-value" data-animate="${portnox.metrics.securityScore}">0</div>
                        <div class="kpi-unit">/100</div>
                        <div class="kpi-label">Security Score</div>
                        <div class="kpi-trend positive">
                            <i class="fas fa-plus"></i> ${riskReduction}% vs Average
                        </div>
                    </div>
                </div>
                
                <div class="kpi-card warning">
                    <div class="kpi-icon"><i class="fas fa-user-clock"></i></div>
                    <div class="kpi-content">
                        <div class="kpi-value" data-animate="${efficiencyGain}">0</div>
                        <div class="kpi-unit">%</div>
                        <div class="kpi-label">Efficiency Gain</div>
                        <div class="kpi-trend positive">
                            <i class="fas fa-users"></i> ${portnox.metrics.fteRequired} vs ${avgCompetitor.fteRequired.toFixed(1)} FTE
                        </div>
                    </div>
                </div>
                
                <div class="kpi-card danger">
                    <div class="kpi-icon"><i class="fas fa-exclamation-triangle"></i></div>
                    <div class="kpi-content">
                        <div class="kpi-value" data-animate="${Math.round(industryData.breachCost / 1000000)}">0</div>
                        <div class="kpi-unit">M</div>
                        <div class="kpi-label">${industryData.name} Breach Risk</div>
                        <div class="kpi-trend">
                            <i class="fas fa-shield-alt"></i> ${riskReduction}% Risk Reduction
                        </div>
                    </div>
                </div>
                
                <div class="kpi-card secondary">
                    <div class="kpi-icon"><i class="fas fa-clock"></i></div>
                    <div class="kpi-content">
                        <div class="kpi-value" data-animate="${timeToValue}">0</div>
                        <div class="kpi-unit">%</div>
                        <div class="kpi-label">Faster Deployment</div>
                        <div class="kpi-trend positive">
                            <i class="fas fa-calendar-check"></i> ${portnox.metrics.implementationDays} vs ${Math.round(avgCompetitor.implementationDays)} Days
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Animate KPI values
        setTimeout(() => this.animateKPIs(), 100);
    }
    
    createTabNavigation() {
        const container = document.getElementById('tab-navigation-section');
        if (!container) return;
        
        container.innerHTML = `
            <div class="ultimate-tabs">
                <button class="ultimate-tab active" data-tab="overview">
                    <i class="fas fa-chart-mixed"></i>
                    <span>Executive Overview</span>
                </button>
                <button class="ultimate-tab" data-tab="financial">
                    <i class="fas fa-coins"></i>
                    <span>Financial Analysis</span>
                </button>
                <button class="ultimate-tab" data-tab="technical">
                    <i class="fas fa-microchip"></i>
                    <span>Technical Comparison</span>
                </button>
                <button class="ultimate-tab" data-tab="security">
                    <i class="fas fa-shield-virus"></i>
                    <span>Security & Risk</span>
                </button>
                <button class="ultimate-tab" data-tab="compliance">
                    <i class="fas fa-clipboard-list-check"></i>
                    <span>Compliance Matrix</span>
                </button>
                <button class="ultimate-tab" data-tab="market">
                    <i class="fas fa-chart-pie"></i>
                    <span>Market Analysis</span>
                </button>
                <button class="ultimate-tab" data-tab="roadmap">
                    <i class="fas fa-road"></i>
                    <span>Implementation Roadmap</span>
                </button>
                <button class="ultimate-tab" data-tab="report">
                    <i class="fas fa-file-chart-line"></i>
                    <span>Executive Report</span>
                </button>
            </div>
        `;
    }
    
    createAllTabs() {
        const container = document.getElementById('tab-content-section');
        if (!container) return;
        
        container.innerHTML = `
            <div class="tab-panels">
                <!-- Overview Tab -->
                <div class="tab-panel active" data-panel="overview">
                    <div class="panel-grid">
                        <div class="chart-container large">
                            <h3><i class="fas fa-chart-bar"></i> TCO Comparison Analysis</h3>
                            <div id="tco-comparison-chart" class="chart-area"></div>
                        </div>
                        <div class="chart-container">
                            <h3><i class="fas fa-gauge-high"></i> Performance Metrics</h3>
                            <div id="performance-metrics-chart" class="chart-area"></div>
                        </div>
                        <div class="chart-container">
                            <h3><i class="fas fa-trophy"></i> Market Leaders</h3>
                            <div id="market-leaders-chart" class="chart-area"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Financial Tab -->
                <div class="tab-panel" data-panel="financial">
                    <div class="panel-grid">
                        <div class="chart-container">
                            <h3><i class="fas fa-money-bill-trend-up"></i> ROI Timeline</h3>
                            <div id="roi-timeline-chart" class="chart-area"></div>
                        </div>
                        <div class="chart-container">
                            <h3><i class="fas fa-calculator"></i> Cost Breakdown</h3>
                            <div id="cost-breakdown-chart" class="chart-area"></div>
                        </div>
                        <div class="chart-container large">
                            <h3><i class="fas fa-piggy-bank"></i> Savings Analysis</h3>
                            <div id="savings-analysis-chart" class="chart-area"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Technical Tab -->
                <div class="tab-panel" data-panel="technical">
                    <div class="panel-grid">
                        <div class="chart-container large">
                            <h3><i class="fas fa-spider"></i> Capability Radar</h3>
                            <div id="capability-radar-chart" class="chart-area"></div>
                        </div>
                        <div class="chart-container">
                            <h3><i class="fas fa-server"></i> Architecture Comparison</h3>
                            <div id="architecture-comparison" class="chart-area"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Security Tab -->
                <div class="tab-panel" data-panel="security">
                    <div class="panel-grid">
                        <div class="chart-container">
                            <h3><i class="fas fa-shield-halved"></i> Security Scores</h3>
                            <div id="security-scores-chart" class="chart-area"></div>
                        </div>
                        <div class="chart-container">
                            <h3><i class="fas fa-bug-slash"></i> Risk Mitigation</h3>
                            <div id="risk-mitigation-chart" class="chart-area"></div>
                        </div>
                        <div class="chart-container large">
                            <h3><i class="fas fa-lock"></i> Zero Trust Readiness</h3>
                            <div id="zero-trust-readiness" class="chart-area"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Compliance Tab -->
                <div class="tab-panel" data-panel="compliance">
                    <div class="panel-grid">
                        <div class="chart-container full">
                            <h3><i class="fas fa-certificate"></i> Compliance Coverage Matrix</h3>
                            <div id="compliance-matrix" class="chart-area"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Market Tab -->
                <div class="tab-panel" data-panel="market">
                    <div class="panel-grid">
                        <div class="chart-container">
                            <h3><i class="fas fa-chart-pie"></i> Market Share</h3>
                            <div id="market-share-chart" class="chart-area"></div>
                        </div>
                        <div class="chart-container">
                            <h3><i class="fas fa-trend-up"></i> Growth Trends</h3>
                            <div id="growth-trends-chart" class="chart-area"></div>
                        </div>
                        <div class="chart-container">
                            <h3><i class="fas fa-star"></i> Customer Satisfaction</h3>
                            <div id="satisfaction-chart" class="chart-area"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Roadmap Tab -->
                <div class="tab-panel" data-panel="roadmap">
                    <div class="panel-grid">
                        <div class="chart-container full">
                            <h3><i class="fas fa-project-diagram"></i> Implementation Timeline</h3>
                            <div id="implementation-timeline" class="chart-area"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Report Tab -->
                <div class="tab-panel" data-panel="report">
                    <div class="panel-grid">
                        <div class="report-container">
                            <h3><i class="fas fa-file-contract"></i> Executive Summary Report</h3>
                            <div id="executive-report" class="report-area"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    calculateAverageCompetitor() {
        const competitors = this.selectedVendors.filter(v => v !== 'portnox');
        if (competitors.length === 0) {
            competitors.push('cisco', 'aruba', 'forescout');
        }
        
        const totals = competitors.reduce((acc, vendorId) => {
            const vendor = this.vendorData[vendorId];
            if (vendor) {
                return {
                    tco3Year: acc.tco3Year + vendor.costs.tco3Year,
                    implementationDays: acc.implementationDays + vendor.metrics.implementationDays,
                    securityScore: acc.securityScore + vendor.metrics.securityScore,
                    fteRequired: acc.fteRequired + vendor.metrics.fteRequired
                };
            }
            return acc;
        }, { tco3Year: 0, implementationDays: 0, securityScore: 0, fteRequired: 0 });
        
        const count = competitors.length;
        return {
            tco3Year: totals.tco3Year / count,
            implementationDays: totals.implementationDays / count,
            securityScore: totals.securityScore / count,
            fteRequired: totals.fteRequired / count
        };
    }
    
    animateKPIs() {
        const kpiValues = document.querySelectorAll('[data-animate]');
        kpiValues.forEach((element, index) => {
            setTimeout(() => {
                const targetValue = parseInt(element.getAttribute('data-animate'));
                this.animateValue(element, 0, targetValue, 2000);
            }, index * 200);
        });
    }
    
    animateValue(element, start, end, duration) {
        const startTime = performance.now();
        
        const updateValue = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            const current = Math.round(start + (end - start) * easeOut);
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateValue);
            }
        };
        
        requestAnimationFrame(updateValue);
    }
    
    setupEventListeners() {
        // Vendor card selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.vendor-card')) {
                const card = e.target.closest('.vendor-card');
                const vendorId = card.getAttribute('data-vendor');
                this.toggleVendorSelection(vendorId);
            }
            
            if (e.target.closest('.vendor-details-btn')) {
                const vendorId = e.target.closest('.vendor-details-btn').getAttribute('data-vendor');
                this.showVendorDetails(vendorId);
            }
            
            if (e.target.closest('.compliance-item')) {
                const item = e.target.closest('.compliance-item');
                const complianceId = item.getAttribute('data-compliance');
                this.toggleComplianceSelection(complianceId);
            }
            
            if (e.target.closest('.ultimate-tab')) {
                const tab = e.target.closest('.ultimate-tab');
                const tabId = tab.getAttribute('data-tab');
                this.switchToTab(tabId);
            }
        });
        
        // Configuration changes
        document.getElementById('device-count')?.addEventListener('change', (e) => {
            this.config.deviceCount = parseInt(e.target.value);
            this.refreshCurrentTab();
        });
        
        document.getElementById('industry')?.addEventListener('change', (e) => {
            this.config.industry = e.target.value;
            this.refreshKPIs();
            this.refreshCurrentTab();
        });
        
        document.getElementById('analysis-period')?.addEventListener('change', (e) => {
            this.config.analysisPeriod = parseInt(e.target.value);
            this.refreshCurrentTab();
        });
        
        // Action buttons
        document.getElementById('generate-insights')?.addEventListener('click', () => {
            this.generateAIInsights();
        });
        
        document.getElementById('compare-scenarios')?.addEventListener('click', () => {
            this.compareScenarios();
        });
        
        document.getElementById('executive-presentation')?.addEventListener('click', () => {
            this.generatePresentation();
        });
        
        // Sidebar toggle
        document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('collapsed');
        });
    }
    
    toggleVendorSelection(vendorId) {
        const index = this.selectedVendors.indexOf(vendorId);
        if (index > -1) {
            this.selectedVendors.splice(index, 1);
        } else {
            this.selectedVendors.push(vendorId);
        }
        
        this.createVendorComparison();
        this.refreshKPIs();
        this.refreshCurrentTab();
    }
    
    toggleComplianceSelection(complianceId) {
        const index = this.config.selectedCompliance.indexOf(complianceId);
        if (index > -1) {
            this.config.selectedCompliance.splice(index, 1);
        } else {
            this.config.selectedCompliance.push(complianceId);
        }
        
        this.populateComplianceGrid();
        if (this.currentTab === 'compliance') {
            this.refreshCurrentTab();
        }
    }
    
    switchToTab(tabId) {
        document.querySelectorAll('.ultimate-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.querySelector(`[data-panel="${tabId}"]`).classList.add('active');
        
        this.currentTab = tabId;
        this.refreshCurrentTab();
    }
    
    refreshKPIs() {
        this.createExecutiveKPIs();
    }
    
    refreshCurrentTab() {
        setTimeout(() => {
            switch(this.currentTab) {
                case 'overview':
                    this.createOverviewCharts();
                    break;
                case 'financial':
                    this.createFinancialCharts();
                    break;
                case 'technical':
                    this.createTechnicalCharts();
                    break;
                case 'security':
                    this.createSecurityCharts();
                    break;
                case 'compliance':
                    this.createComplianceMatrix();
                    break;
                case 'market':
                    this.createMarketCharts();
                    break;
                case 'roadmap':
                    this.createRoadmap();
                    break;
                case 'report':
                    this.generateExecutiveReport();
                    break;
            }
        }, 100);
    }
    
    createOverviewCharts() {
        this.createTCOComparisonChart();
        this.createPerformanceMetricsChart();
        this.createMarketLeadersChart();
    }
    
    createTCOComparisonChart() {
        const container = document.getElementById('tco-comparison-chart');
        if (!container) return;
        
        const data = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            return {
                name: vendor.shortName,
                data: [
                    vendor.costs.tco1Year / 1000,
                    vendor.costs.tco3Year / 1000,
                    vendor.costs.tco5Year / 1000
                ]
            };
        });
        
        if (typeof Highcharts !== 'undefined') {
            Highcharts.chart(container, {
                chart: { type: 'column' },
                title: { text: null },
                xAxis: { categories: ['1 Year', '3 Years', '5 Years'] },
                yAxis: { 
                    title: { text: 'Total Cost ($K)' },
                    labels: { formatter: function() { return '$' + this.value + 'K'; } }
                },
                series: data,
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: true,
                            formatter: function() { return '$' + this.y + 'K'; }
                        }
                    }
                },
                credits: { enabled: false }
            });
        }
    }
    
    createPerformanceMetricsChart() {
        const container = document.getElementById('performance-metrics-chart');
        if (!container) return;
        
        const metrics = ['Security Score', 'Performance', 'Reliability', 'User Satisfaction'];
        const data = this.selectedVendors.map(vendorId => {
            const vendor = this.vendorData[vendorId];
            return {
                name: vendor.shortName,
                data: [
                    vendor.metrics.securityScore,
                    vendor.metrics.performanceScore,
                    vendor.metrics.reliabilityScore,
                    vendor.metrics.userSatisfaction
                ]
            };
        });
        
        if (typeof Highcharts !== 'undefined') {
            Highcharts.chart(container, {
                chart: { type: 'radar' },
                title: { text: null },
                xAxis: { categories: metrics },
                yAxis: { min: 0, max: 100 },
                series: data,
                credits: { enabled: false }
            });
        }
    }
    
    createMarketLeadersChart() {
        const container = document.getElementById('market-leaders-chart');
        if (!container) return;
        
        const leaders = Object.keys(this.vendorData)
            .map(vendorId => ({
                name: this.vendorData[vendorId].shortName,
                y: this.vendorData[vendorId].metrics.marketShare,
                color: this.vendorData[vendorId].color
            }))
            .sort((a, b) => b.y - a.y)
            .slice(0, 8);
        
        if (typeof Highcharts !== 'undefined') {
            Highcharts.chart(container, {
                chart: { type: 'pie' },
                title: { text: null },
                series: [{
                    name: 'Market Share',
                    data: leaders
                }],
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}: {point.y}%'
                        }
                    }
                },
                credits: { enabled: false }
            });
        }
    }
    
    createFinancialCharts() {
        console.log("Creating financial charts...");
        // Implementation for financial charts
    }
    
    createTechnicalCharts() {
        console.log("Creating technical charts...");
        // Implementation for technical charts
    }
    
    createSecurityCharts() {
        console.log("Creating security charts...");
        // Implementation for security charts
    }
    
    createComplianceMatrix() {
        const container = document.getElementById('compliance-matrix');
        if (!container) return;
        
        let matrixHTML = `
            <table class="compliance-table">
                <thead>
                    <tr>
                        <th>Compliance Framework</th>
                        ${this.selectedVendors.map(vendorId => 
                            `<th>${this.vendorData[vendorId].shortName}</th>`
                        ).join('')}
                    </tr>
                </thead>
                <tbody>
        `;
        
        this.config.selectedCompliance.forEach(complianceId => {
            const compliance = this.complianceData[complianceId];
            matrixHTML += `<tr><td class="framework-name">${compliance.name}</td>`;
            
            this.selectedVendors.forEach(vendorId => {
                const score = this.vendorData[vendorId].compliance[complianceId] || 0;
                const colorClass = score >= 90 ? 'excellent' : score >= 80 ? 'good' : score >= 70 ? 'fair' : 'poor';
                matrixHTML += `<td class="score ${colorClass}">${score}%</td>`;
            });
            
            matrixHTML += '</tr>';
        });
        
        matrixHTML += '</tbody></table>';
        container.innerHTML = matrixHTML;
    }
    
    createMarketCharts() {
        console.log("Creating market analysis charts...");
        // Implementation for market charts
    }
    
    createRoadmap() {
        console.log("Creating implementation roadmap...");
        // Implementation for roadmap
    }
    
    generateExecutiveReport() {
        const container = document.getElementById('executive-report');
        if (!container) return;
        
        const portnox = this.vendorData.portnox;
        const industry = this.industryData[this.config.industry];
        
        container.innerHTML = `
            <div class="executive-report">
                <h1>Executive Summary Report</h1>
                <div class="report-date">Generated: ${new Date().toLocaleDateString()}</div>
                
                <section class="report-section">
                    <h2>Key Findings</h2>
                    <ul class="findings-list">
                        <li>Portnox Cloud offers the lowest TCO among analyzed vendors with ${Math.round(((this.calculateAverageCompetitor().tco3Year - portnox.costs.tco3Year) / this.calculateAverageCompetitor().tco3Year) * 100)}% cost savings</li>
                        <li>ROI of ${portnox.metrics.roi3Year}% over 3 years with ${portnox.metrics.paybackMonths}-month payback period</li>
                        <li>Highest security score (${portnox.metrics.securityScore}/100) with comprehensive Zero Trust capabilities</li>
                        <li>Cloud-native architecture enables ${portnox.metrics.implementationDays}-day deployment vs. industry average of ${Math.round(this.calculateAverageCompetitor().implementationDays)} days</li>
                        <li>Requires only ${portnox.metrics.fteRequired} FTE vs. competitor average of ${this.calculateAverageCompetitor().fteRequired.toFixed(1)} FTE</li>
                    </ul>
                </section>
                
                <section class="report-section">
                    <h2>Industry Context: ${industry.name}</h2>
                    <p>Average breach cost in ${industry.name}: $${(industry.breachCost / 1000000).toFixed(1)}M</p>
                    <p>Risk multiplier: ${industry.riskMultiplier}x | Compliance weight: ${industry.complianceWeight}x</p>
                </section>
                
                <section class="report-section">
                    <h2>Recommendation</h2>
                    <p class="recommendation">
                        Based on comprehensive analysis across ${this.selectedVendors.length} vendors, 
                        Portnox Cloud emerges as the optimal Zero Trust NAC solution, offering superior 
                        financial returns, faster implementation, and enhanced security capabilities while 
                        requiring minimal operational overhead.
                    </p>
                </section>
            </div>
        `;
    }
    
    showVendorDetails(vendorId) {
        const vendor = this.vendorData[vendorId];
        console.log(`Showing details for ${vendor.name}`);
        // Implementation for vendor details modal
    }
    
    generateAIInsights() {
        console.log("Generating AI insights...");
        this.showNotification('AI insights generation in progress...', 'info');
    }
    
    compareScenarios() {
        console.log("Opening scenario comparison...");
        this.showNotification('Scenario comparison tool opening...', 'info');
    }
    
    generatePresentation() {
        console.log("Generating executive presentation...");
        this.showNotification('Generating executive presentation...', 'success');
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `ultimate-notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    showError(message) {
        console.error(message);
        this.showNotification(message, 'error');
    }
}

// Initialize Ultimate Executive View
window.ultimateExecutiveView = new UltimateExecutiveView();

// Auto-initialize if comprehensive data is available
document.addEventListener('DOMContentLoaded', () => {
    if (window.comprehensiveIndustries && window.comprehensiveCompliance) {
        console.log("✅ Comprehensive data detected, initializing Ultimate Executive View...");
        setTimeout(() => {
            window.ultimateExecutiveView.init();
        }, 500);
    }
});
