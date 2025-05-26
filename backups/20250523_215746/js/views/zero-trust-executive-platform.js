/**
 * Portnox Total Cost Analyzer - Ultimate Executive Intelligence Platform
 * Version: 5.0 - Comprehensive Edition with Enhanced Visualizations
 * Features: All 10 vendors, deep industry analysis, complete compliance frameworks,
 * MITRE ATT&CK mapping, NIST CSF focus, advanced animations, and cutting-edge visuals
 */

class PortnoxExecutiveIntelligencePlatform {
    constructor() {
        this.initialized = false;
        this.currentTab = 'overview';
        this.selectedVendors = ['portnox', 'cisco', 'aruba'];
        this.selectedIndustry = 'all';
        this.selectedCompliance = [];
        this.chartInstances = {};
        this.animationQueue = [];
        
        // Enhanced configuration with all parameters
        this.config = {
            deviceCount: 1000,
            analysisPeriod: 3,
            industry: 'technology',
            companySize: 'enterprise',
            fteCost: 100000,
            breachCost: 4350000,
            downtimeCost: 10000,
            deploymentType: 'cloud',
            complianceFrameworks: [],
            securityPosture: 'elevated',
            insurancePremium: 150000,
            riskTolerance: 'low',
            includeAddOns: true,
            includeHardware: true,
            includeMaintenance: true,
            includeTraining: true,
            includeSupport: true,
            geographicScope: 'global',
            userCount: 5000,
            locationCount: 10,
            criticalAssets: 100,
            dataVolume: 'high',
            regulatoryPressure: 'high'
        };
        
        // Initialize comprehensive data structures
        this.vendorData = this.initializeComprehensiveVendorData();
        this.industryData = this.initializeEnhancedIndustryData();
        this.complianceData = this.initializeDetailedComplianceData();
        this.securityControls = this.initializeSecurityControls();
        this.mitreFramework = this.initializeMitreAttackMapping();
        this.nistFramework = this.initializeNistCsfMapping();
        this.features = this.initializeNacFeatures();
        this.riskScenarios = this.initializeRiskScenarios();
        this.insuranceModels = this.initializeInsuranceModels();
        this.analystInsights = this.initializeAnalystInsights();
    }
    
    initializeComprehensiveVendorData() {
        return {
            'portnox': {
                name: 'Portnox Cloud',
                shortName: 'Portnox',
                logo: './img/vendors/portnox-logo.png',
                icon: '???',
                color: '#1a5a96',
                gradient: 'linear-gradient(135deg, #1a5a96 0%, #0d4275 100%)',
                architecture: 'Cloud-Native',
                deploymentModel: 'SaaS',
                marketPosition: 'Leader',
                founded: 2007,
                headquarters: 'USA',
                
                // Enhanced pricing structure
                pricing: {
                    model: 'subscription',
                    basePrice: 20,
                    currency: 'USD',
                    billingPeriod: 'monthly',
                    minimumDevices: 50,
                    contractTerms: [12, 24, 36],
                    volumeDiscounts: [
                        { min: 50, max: 250, discount: 0, label: 'Starter' },
                        { min: 251, max: 500, discount: 10, label: 'Professional' },
                        { min: 501, max: 1000, discount: 15, label: 'Business' },
                        { min: 1001, max: 5000, discount: 20, label: 'Enterprise' },
                        { min: 5001, max: Infinity, discount: 25, label: 'Global' }
                    ],
                    includedFeatures: [
                        'Zero Trust Network Access',
                        'Conditional Access for Applications',
                        'PKI Certificate Services',
                        'IoT Device Profiling & Security',
                        'TACACS+ Authentication',
                        'Cloud RADIUS (Global PoPs)',
                        'Guest Access Management',
                        'BYOD Support & Onboarding',
                        '24/7 Premium Support',
                        'Dedicated Success Manager',
                        'Onboarding Assistance',
                        'Regular Updates & Innovation',
                        'Full API Access',
                        'Multi-tenancy Support',
                        'Automated Compliance Reporting',
                        'AI-Powered Threat Detection',
                        'Real-time Risk Assessment',
                        'Behavioral Analytics',
                        'Advanced Forensics',
                        'Custom Integrations'
                    ],
                    hiddenCosts: 'None - All-inclusive transparent pricing',
                    roi: {
                        paybackPeriod: 7,
                        threeYearRoi: 325,
                        fiveYearRoi: 485
                    }
                },
                
                // Detailed cost breakdown with enhanced metrics
                costs: {
                    hardware: 0,
                    software: 0,
                    implementation: 5000,
                    training: 0,
                    support: 0,
                    maintenance: 0,
                    infrastructure: 0,
                    personnelPerYear: 25000,
                    downtimePerYear: 2000,
                    patchingPerYear: 0,
                    upgradesCycle: 0,
                    energyCosts: 0,
                    rackSpace: 0,
                    networkBandwidth: 0,
                    backupStorage: 0,
                    disasterRecovery: 0,
                    complianceAudit: 5000,
                    securityTesting: 0,
                    vendorManagement: 2000
                },
                
                // Comprehensive operational metrics
                metrics: {
                    deploymentTime: 1,
                    timeToValue: 7,
                    fteRequired: 0.25,
                    mttr: 0.5,
                    availability: 99.99,
                    scalability: 'Unlimited',
                    performanceImpact: 'Minimal (<1%)',
                    userSatisfaction: 94,
                    npsScore: 72,
                    supportResponseTime: 15,
                    updateFrequency: 'Continuous',
                    patchingEffort: 'Zero',
                    integrationEffort: 'Low',
                    trainingHours: 4,
                    certificationAvailable: true,
                    globalReach: true,
                    multiLanguageSupport: 25,
                    apiUptime: 99.95,
                    dataResidencyOptions: 12
                },
                
                // Advanced security capabilities
                security: {
                    zeroTrustScore: 98,
                    overallSecurityScore: 95,
                    deviceAuthMethods: 12,
                    riskAssessmentReal: true,
                    automatedRemediation: true,
                    threatIntelligence: true,
                    behavioralAnalytics: true,
                    microsegmentation: true,
                    encryptionStandards: ['TLS 1.3', 'AES-256', 'RSA-4096', 'ECC-P384'],
                    certifications: ['SOC 2 Type II', 'ISO 27001', 'ISO 27017', 'ISO 27018', 'CSA STAR Level 2', 'GDPR', 'CCPA'],
                    vulnerabilityManagement: 'Automated with AI',
                    incidentResponse: 'Automated + 24/7 Expert Support',
                    forensicsCapability: true,
                    dlpIntegration: true,
                    siemIntegration: true,
                    soarIntegration: true,
                    xdrCapabilities: true,
                    privacyControls: 'Advanced',
                    dataClassification: 'Automated',
                    threatHunting: 'AI-Powered'
                },
                
                // Detailed compliance coverage
                compliance: {
                    frameworks: {
                        'nist-csf': { coverage: 98, controls: 108, automated: 95, effort: 'Low' },
                        'pci-dss': { coverage: 96, controls: 12, automated: 92, effort: 'Low' },
                        'hipaa': { coverage: 94, controls: 54, automated: 90, effort: 'Low' },
                        'gdpr': { coverage: 96, controls: 35, automated: 93, effort: 'Low' },
                        'iso27001': { coverage: 95, controls: 114, automated: 91, effort: 'Low' },
                        'sox': { coverage: 92, controls: 20, automated: 88, effort: 'Low' },
                        'fedramp': { coverage: 89, controls: 325, automated: 85, effort: 'Medium' },
                        'fisma': { coverage: 91, controls: 200, automated: 87, effort: 'Medium' },
                        'ccpa': { coverage: 94, controls: 10, automated: 92, effort: 'Low' },
                        'cis': { coverage: 96, controls: 153, automated: 94, effort: 'Low' },
                        'cmmc': { coverage: 93, controls: 130, automated: 89, effort: 'Medium' },
                        'nerc-cip': { coverage: 88, controls: 45, automated: 84, effort: 'Medium' },
                        'ferpa': { coverage: 92, controls: 34, automated: 90, effort: 'Low' },
                        'glba': { coverage: 93, controls: 48, automated: 91, effort: 'Low' },
                        'hitrust': { coverage: 95, controls: 156, automated: 92, effort: 'Low' }
                    },
                    reportingCapabilities: 'Real-time Automated',
                    auditTrail: 'Complete with Immutable Logs',
                    dataResidency: 'Multi-region with Geo-fencing',
                    dataRetention: 'Fully Configurable',
                    evidenceCollection: 'Automated',
                    gapAnalysis: 'AI-Powered',
                    remediationGuidance: 'Automated',
                    certificationSupport: 'Full'
                },
                
                // Comprehensive feature set
                features: {
                    // Core NAC Features
                    deviceVisibility: { available: true, quality: 'Advanced', automation: 'Full' },
                    deviceProfiling: { available: true, quality: 'AI-Powered', automation: 'Full' },
                    networkAccessControl: { available: true, quality: 'Zero Trust', automation: 'Full' },
                    guestAccess: { available: true, quality: 'Self-Service', automation: 'Full' },
                    byod: { available: true, quality: 'Automated', automation: 'Full' },
                    iotSupport: { available: true, quality: 'Comprehensive', automation: 'Full' },
                    
                    // Advanced Features
                    conditionalAccess: { available: true, quality: 'Application-Level', automation: 'Full' },
                    applicationControl: { available: true, quality: 'Granular', automation: 'Full' },
                    pkiServices: { available: true, quality: 'Cloud-Native', automation: 'Full' },
                    cloudRadius: { available: true, quality: 'Global PoPs', automation: 'Full' },
                    tacacs: { available: true, quality: 'Cloud-Based', automation: 'Full' },
                    samlIntegration: { available: true, quality: 'Native', automation: 'Full' },
                    mfaSupport: { available: true, quality: 'Advanced', automation: 'Full' },
                    
                    // Operational Features
                    centralizedManagement: { available: true, quality: 'Cloud Console', automation: 'Full' },
                    multiTenancy: { available: true, quality: 'Enterprise', automation: 'Full' },
                    roleBasedAccess: { available: true, quality: 'Granular', automation: 'Full' },
                    apiAvailable: { available: true, quality: 'RESTful', automation: 'Full' },
                    customIntegrations: { available: true, quality: 'Flexible', automation: 'Full' },
                    
                    // Automation & AI
                    automatedOnboarding: { available: true, quality: 'Zero-Touch', automation: 'Full' },
                    selfServicePortal: { available: true, quality: 'Customizable', automation: 'Full' },
                    automatedCompliance: { available: true, quality: 'Real-Time', automation: 'Full' },
                    workflowAutomation: { available: true, quality: 'Advanced', automation: 'Full' },
                    aiPoweredInsights: { available: true, quality: 'Predictive', automation: 'Full' },
                    anomalyDetection: { available: true, quality: 'ML-Based', automation: 'Full' }
                },
                
                // Risk reduction metrics
                riskReduction: {
                    breachProbabilityReduction: 89,
                    dataExfiltrationPrevention: 94,
                    lateralMovementPrevention: 97,
                    unauthorizedAccessPrevention: 98,
                    malwareSpreadPrevention: 92,
                    insiderThreatMitigation: 90,
                    complianceViolationReduction: 95,
                    shadowITDiscovery: 98,
                    zeroTrustImplementation: 95,
                    ransomwarePrevention: 93,
                    phishingMitigation: 88,
                    supplyChainRiskReduction: 86,
                    
                    // Financial impact
                    avgBreachCostReduction: 3870000,
                    insurancePremiumReduction: 28,
                    compliancePenaltyAvoidance: 97,
                    operationalLossReduction: 85,
                    productivityImprovement: 32,
                    itEfficiencyGain: 75
                },
                
                // Customer success metrics
                customerSuccess: {
                    averageDeploymentDays: 21,
                    customerRetentionRate: 96,
                    expansionRate: 142,
                    supportSatisfaction: 4.8,
                    implementationSuccess: 99,
                    timeToFirstValue: 7,
                    adoptionRate: 94,
                    featureUtilization: 87
                }
            },
            
            'cisco': {
                name: 'Cisco Identity Services Engine (ISE)',
                shortName: 'Cisco ISE',
                logo: './img/vendors/cisco-logo.png',
                icon: '??',
                color: '#00bceb',
                gradient: 'linear-gradient(135deg, #00bceb 0%, #0078d4 100%)',
                architecture: 'On-Premises',
                deploymentModel: 'Appliance/VM',
                marketPosition: 'Legacy Leader',
                founded: 1984,
                headquarters: 'USA',
                
                pricing: {
                    model: 'perpetual',
                    basePrice: 150,
                    currency: 'USD',
                    billingPeriod: 'one-time',
                    minimumDevices: 100,
                    contractTerms: [36, 60],
                    volumeDiscounts: [
                        { min: 100, max: 500, discount: 0, label: 'Base' },
                        { min: 501, max: 1000, discount: 5, label: 'Plus' },
                        { min: 1001, max: 5000, discount: 10, label: 'Apex' },
                        { min: 5001, max: Infinity, discount: 15, label: 'Enterprise' }
                    ],
                    includedFeatures: [
                        'Basic NAC',
                        'RADIUS Services',
                        'Device Profiling',
                        'Guest Access',
                        'Basic Reporting',
                        'wired 802.1X',
                        'Wireless Integration',
                        'MAB Support'
                    ],
                    additionalCosts: [
                        'Hardware appliances ($120K+)',
                        'Annual SmartNet (20-25%)',
                        'Professional services ($75K+)',
                        'Training ($25K+)',
                        'Upgrades (Major projects)',
                        'Additional modules',
                        'Plus/Apex licenses',
                        'Device licenses',
                        'Endpoint agents'
                    ],
                    hiddenCosts: 'Significant - Hardware refresh cycles, complex licensing, professional services requirements',
                    roi: {
                        paybackPeriod: 36,
                        threeYearRoi: -8,
                        fiveYearRoi: 25
                    }
                },
                
                costs: {
                    hardware: 120000,
                    software: 45000,
                    implementation: 75000,
                    training: 25000,
                    support: 24000,
                    maintenance: 33000,
                    infrastructure: 15000,
                    personnelPerYear: 200000,
                    downtimePerYear: 40000,
                    patchingPerYear: 20000,
                    upgradesCycle: 50000,
                    energyCosts: 8000,
                    rackSpace: 6000,
                    networkBandwidth: 4000,
                    backupStorage: 5000,
                    disasterRecovery: 15000,
                    complianceAudit: 20000,
                    securityTesting: 10000,
                    vendorManagement: 15000
                },
                
                metrics: {
                    deploymentTime: 90,
                    timeToValue: 120,
                    fteRequired: 2.0,
                    mttr: 4,
                    availability: 99.5,
                    scalability: 'Hardware Limited',
                    performanceImpact: 'Moderate (5-10%)',
                    userSatisfaction: 68,
                    npsScore: -15,
                    supportResponseTime: 60,
                    updateFrequency: 'Quarterly',
                    patchingEffort: 'High',
                    integrationEffort: 'Very High',
                    trainingHours: 80,
                    certificationAvailable: true,
                    globalReach: false,
                    multiLanguageSupport: 10,
                    apiUptime: 98.5,
                    dataResidencyOptions: 1
                },
                
                security: {
                    zeroTrustScore: 72,
                    overallSecurityScore: 82,
                    deviceAuthMethods: 6,
                    riskAssessmentReal: false,
                    automatedRemediation: false,
                    threatIntelligence: false,
                    behavioralAnalytics: false,
                    microsegmentation: true,
                    encryptionStandards: ['TLS 1.2', 'AES-256'],
                    certifications: ['Common Criteria', 'FIPS 140-2'],
                    vulnerabilityManagement: 'Manual patching required',
                    incidentResponse: 'Manual processes',
                    forensicsCapability: false,
                    dlpIntegration: false,
                    siemIntegration: true,
                    soarIntegration: false,
                    xdrCapabilities: false,
                    privacyControls: 'Basic',
                    dataClassification: 'Manual',
                    threatHunting: 'Not Available'
                },
                
                compliance: {
                    frameworks: {
                        'nist-csf': { coverage: 85, controls: 85, automated: 40, effort: 'High' },
                        'pci-dss': { coverage: 88, controls: 12, automated: 45, effort: 'High' },
                        'hipaa': { coverage: 82, controls: 45, automated: 35, effort: 'High' },
                        'gdpr': { coverage: 75, controls: 25, automated: 30, effort: 'Very High' },
                        'iso27001': { coverage: 85, controls: 100, automated: 40, effort: 'High' },
                        'sox': { coverage: 80, controls: 18, automated: 35, effort: 'High' },
                        'fedramp': { coverage: 90, controls: 300, automated: 45, effort: 'High' },
                        'fisma': { coverage: 88, controls: 180, automated: 42, effort: 'High' }
                    },
                    reportingCapabilities: 'Manual with ISE-PIC',
                    auditTrail: 'Basic logging',
                    dataResidency: 'On-premises only',
                    dataRetention: 'Manual configuration',
                    evidenceCollection: 'Manual',
                    gapAnalysis: 'Manual',
                    remediationGuidance: 'Documentation only',
                    certificationSupport: 'Limited'
                },
                
                features: {
                    deviceVisibility: { available: true, quality: 'Standard', automation: 'Partial' },
                    deviceProfiling: { available: true, quality: 'Rule-Based', automation: 'Partial' },
                    networkAccessControl: { available: true, quality: 'Traditional', automation: 'Manual' },
                    guestAccess: { available: true, quality: 'Basic', automation: 'Partial' },
                    byod: { available: true, quality: 'Complex', automation: 'Manual' },
                    iotSupport: { available: false, quality: 'Limited', automation: 'None' },
                    conditionalAccess: { available: false, quality: 'N/A', automation: 'None' },
                    applicationControl: { available: false, quality: 'N/A', automation: 'None' },
                    pkiServices: { available: true, quality: 'External CA', automation: 'Manual' },
                    cloudRadius: { available: false, quality: 'N/A', automation: 'None' },
                    tacacs: { available: true, quality: 'Traditional', automation: 'Manual' },
                    samlIntegration: { available: false, quality: 'Limited', automation: 'None' },
                    mfaSupport: { available: true, quality: 'Basic', automation: 'Manual' },
                    centralizedManagement: { available: true, quality: 'Complex', automation: 'Manual' },
                    multiTenancy: { available: false, quality: 'N/A', automation: 'None' },
                    roleBasedAccess: { available: true, quality: 'Basic', automation: 'Manual' },
                    apiAvailable: { available: true, quality: 'REST/ERS', automation: 'Manual' },
                    customIntegrations: { available: false, quality: 'Limited', automation: 'None' },
                    automatedOnboarding: { available: false, quality: 'Manual', automation: 'None' },
                    selfServicePortal: { available: true, quality: 'Basic', automation: 'Limited' },
                    automatedCompliance: { available: false, quality: 'N/A', automation: 'None' },
                    workflowAutomation: { available: false, quality: 'Limited', automation: 'None' }
                },
                
                riskReduction: {
                    breachProbabilityReduction: 65,
                    dataExfiltrationPrevention: 70,
                    lateralMovementPrevention: 75,
                    unauthorizedAccessPrevention: 80,
                    malwareSpreadPrevention: 60,
                    insiderThreatMitigation: 65,
                    complianceViolationReduction: 70,
                    shadowITDiscovery: 60,
                    zeroTrustImplementation: 50,
                    ransomwarePrevention: 65,
                    phishingMitigation: 60,
                    supplyChainRiskReduction: 55,
                    avgBreachCostReduction: 1800000,
                    insurancePremiumReduction: 10,
                    compliancePenaltyAvoidance: 75,
                    operationalLossReduction: 50,
                    productivityImprovement: -10,
                    itEfficiencyGain: -25
                },
                
                customerSuccess: {
                    averageDeploymentDays: 120,
                    customerRetentionRate: 75,
                    expansionRate: 95,
                    supportSatisfaction: 3.2,
                    implementationSuccess: 70,
                    timeToFirstValue: 150,
                    adoptionRate: 65,
                    featureUtilization: 55
                }
            },
            
            'aruba': {
                name: 'Aruba ClearPass',
                shortName: 'Aruba',
                logo: './img/vendors/aruba-logo.png',
                icon: '??',
                color: '#ff6900',
                gradient: 'linear-gradient(135deg, #ff6900 0%, #cc5200 100%)',
                architecture: 'On-Premises/Virtual',
                deploymentModel: 'Appliance/VM',
                marketPosition: 'Challenger',
                founded: 2002,
                headquarters: 'USA',
                
                pricing: {
                    model: 'perpetual',
                    basePrice: 120,
                    currency: 'USD',
                    billingPeriod: 'one-time',
                    minimumDevices: 100,
                    contractTerms: [36, 60],
                    volumeDiscounts: [
                        { min: 100, max: 500, discount: 0, label: 'Standard' },
                        { min: 501, max: 1000, discount: 5, label: 'Professional' },
                        { min: 1001, max: 5000, discount: 8, label: 'Enterprise' },
                        { min: 5001, max: Infinity, discount: 12, label: 'Global' }
                    ],
                    includedFeatures: [
                        'NAC',
                        'Guest Access',
                        'Device Profiling',
                        'BYOD Onboarding',
                        'Basic Reporting',
                        'RADIUS Services',
                        'Certificate Services'
                    ],
                    additionalCosts: [
                        'Hardware appliances ($85K+)',
                        'Annual support (18%)',
                        'Implementation services ($55K+)',
                        'Training ($18K+)',
                        'Add-on modules',
                        'OnGuard agents',
                        'Guest modules',
                        'Profiler licenses'
                    ],
                    hiddenCosts: 'Moderate - Complex licensing, hardware dependencies, upgrade costs',
                    roi: {
                        paybackPeriod: 28,
                        threeYearRoi: 5,
                        fiveYearRoi: 45
                    }
                },
                
                costs: {
                    hardware: 85000,
                    software: 36000,
                    implementation: 55000,
                    training: 18000,
                    support: 18000,
                    maintenance: 25000,
                    infrastructure: 12000,
                    personnelPerYear: 150000,
                    downtimePerYear: 30000,
                    patchingPerYear: 15000,
                    upgradesCycle: 40000,
                    energyCosts: 6000,
                    rackSpace: 4500,
                    networkBandwidth: 3000,
                    backupStorage: 4000,
                    disasterRecovery: 12000,
                    complianceAudit: 15000,
                    securityTesting: 8000,
                    vendorManagement: 10000
                },
                
                metrics: {
                    deploymentTime: 60,
                    timeToValue: 90,
                    fteRequired: 1.5,
                    mttr: 3,
                    availability: 99.0,
                    scalability: 'Hardware Limited',
                    performanceImpact: 'Moderate (3-7%)',
                    userSatisfaction: 72,
                    npsScore: 5,
                    supportResponseTime: 45,
                    updateFrequency: 'Quarterly',
                    patchingEffort: 'Moderate',
                    integrationEffort: 'Moderate',
                    trainingHours: 60,
                    certificationAvailable: true,
                    globalReach: false,
                    multiLanguageSupport: 8,
                    apiUptime: 98.0,
                    dataResidencyOptions: 1
                },
                
                security: {
                    zeroTrustScore: 68,
                    overallSecurityScore: 78,
                    deviceAuthMethods: 5,
                    riskAssessmentReal: false,
                    automatedRemediation: false,
                    threatIntelligence: false,
                    behavioralAnalytics: false,
                    microsegmentation: true,
                    encryptionStandards: ['TLS 1.2', 'AES-256'],
                    certifications: ['Common Criteria'],
                    vulnerabilityManagement: 'Semi-manual',
                    incidentResponse: 'Manual',
                    forensicsCapability: false,
                    dlpIntegration: false,
                    siemIntegration: true,
                    soarIntegration: false,
                    xdrCapabilities: false,
                    privacyControls: 'Basic',
                    dataClassification: 'Manual',
                    threatHunting: 'Not Available'
                },
                
                compliance: {
                    frameworks: {
                        'nist-csf': { coverage: 82, controls: 80, automated: 35, effort: 'High' },
                        'pci-dss': { coverage: 85, controls: 11, automated: 40, effort: 'High' },
                        'hipaa': { coverage: 78, controls: 42, automated: 30, effort: 'High' },
                        'gdpr': { coverage: 72, controls: 22, automated: 25, effort: 'Very High' },
                        'iso27001': { coverage: 83, controls: 95, automated: 35, effort: 'High' }
                    },
                    reportingCapabilities: 'Manual',
                    auditTrail: 'Basic',
                    dataResidency: 'On-premises only',
                    dataRetention: 'Manual',
                    evidenceCollection: 'Manual',
                    gapAnalysis: 'Manual',
                    remediationGuidance: 'Limited',
                    certificationSupport: 'Limited'
                },
                
                features: {
                    deviceVisibility: { available: true, quality: 'Standard', automation: 'Partial' },
                    deviceProfiling: { available: true, quality: 'Standard', automation: 'Partial' },
                    networkAccessControl: { available: true, quality: 'Traditional', automation: 'Manual' },
                    guestAccess: { available: true, quality: 'Good', automation: 'Partial' },
                    byod: { available: true, quality: 'Good', automation: 'Partial' },
                    iotSupport: { available: false, quality: 'Limited', automation: 'None' },
                    conditionalAccess: { available: false, quality: 'N/A', automation: 'None' },
                    applicationControl: { available: false, quality: 'N/A', automation: 'None' },
                    pkiServices: { available: true, quality: 'Onboard CA', automation: 'Partial' },
                    cloudRadius: { available: false, quality: 'N/A', automation: 'None' },
                    tacacs: { available: false, quality: 'N/A', automation: 'None' },
                    samlIntegration: { available: false, quality: 'Limited', automation: 'None' },
                    mfaSupport: { available: true, quality: 'Basic', automation: 'Manual' },
                    centralizedManagement: { available: true, quality: 'Standard', automation: 'Manual' },
                    multiTenancy: { available: false, quality: 'N/A', automation: 'None' },
                    roleBasedAccess: { available: true, quality: 'Basic', automation: 'Manual' },
                    apiAvailable: { available: true, quality: 'REST', automation: 'Manual' },
                    customIntegrations: { available: false, quality: 'Limited', automation: 'None' },
                    automatedOnboarding: { available: true, quality: 'Basic', automation: 'Partial' },
                    selfServicePortal: { available: true, quality: 'Good', automation: 'Partial' },
                    automatedCompliance: { available: false, quality: 'N/A', automation: 'None' },
                    workflowAutomation: { available: false, quality: 'Limited', automation: 'None' }
                },
                
                riskReduction: {
                    breachProbabilityReduction: 60,
                    dataExfiltrationPrevention: 65,
                    lateralMovementPrevention: 70,
                    unauthorizedAccessPrevention: 75,
                    malwareSpreadPrevention: 55,
                    insiderThreatMitigation: 60,
                    complianceViolationReduction: 65,
                    shadowITDiscovery: 55,
                    zeroTrustImplementation: 45,
                    ransomwarePrevention: 60,
                    phishingMitigation: 55,
                    supplyChainRiskReduction: 50,
                    avgBreachCostReduction: 1500000,
                    insurancePremiumReduction: 8,
                    compliancePenaltyAvoidance: 70,
                    operationalLossReduction: 45,
                    productivityImprovement: -5,
                    itEfficiencyGain: -20
                },
                
                customerSuccess: {
                    averageDeploymentDays: 90,
                    customerRetentionRate: 78,
                    expansionRate: 105,
                    supportSatisfaction: 3.5,
                    implementationSuccess: 75,
                    timeToFirstValue: 120,
                    adoptionRate: 70,
                    featureUtilization: 60
                }
            },
            
            'forescout': {
                name: 'Forescout Platform',
                shortName: 'Forescout',
                logo: './img/vendors/forescout-logo.png',
                icon: '??',
                color: '#7a2a90',
                gradient: 'linear-gradient(135deg, #7a2a90 0%, #5b1769 100%)',
                architecture: 'On-Premises/Virtual',
                deploymentModel: 'Appliance/VM',
                marketPosition: 'Niche Player',
                founded: 2000,
                headquarters: 'USA',
                
                pricing: {
                    model: 'perpetual',
                    basePrice: 100,
                    currency: 'USD',
                    billingPeriod: 'one-time',
                    minimumDevices: 100,
                    contractTerms: [36],
                    volumeDiscounts: [
                        { min: 100, max: 1000, discount: 0, label: 'Standard' },
                        { min: 1001, max: 5000, discount: 10, label: 'Enterprise' },
                        { min: 5001, max: Infinity, discount: 15, label: 'Global' }
                    ],
                    includedFeatures: [
                        'Agentless NAC',
                        'Device Discovery',
                        'Network Segmentation',
                        'Compliance',
                        'Orchestration'
                    ],
                    additionalCosts: [
                        'CounterACT appliances ($70K+)',
                        'Annual maintenance (20%)',
                        'Professional services ($45K+)',
                        'Training ($15K+)',
                        'eyeExtend modules',
                        'OT modules',
                        'eyeSight analytics'
                    ],
                    hiddenCosts: 'Moderate - Appliance costs, module licensing, upgrade projects',
                    roi: {
                        paybackPeriod: 24,
                        threeYearRoi: 25,
                        fiveYearRoi: 65
                    }
                },
                
                costs: {
                    hardware: 70000,
                    software: 30000,
                    implementation: 45000,
                    training: 15000,
                    support: 16000,
                    maintenance: 20000,
                    infrastructure: 10000,
                    personnelPerYear: 125000,
                    downtimePerYear: 25000,
                    patchingPerYear: 12000,
                    upgradesCycle: 35000,
                    energyCosts: 5000,
                    rackSpace: 3500,
                    networkBandwidth: 2500,
                    backupStorage: 3500,
                    disasterRecovery: 10000,
                    complianceAudit: 12000,
                    securityTesting: 6000,
                    vendorManagement: 8000
                },
                
                metrics: {
                    deploymentTime: 45,
                    timeToValue: 60,
                    fteRequired: 1.25,
                    mttr: 2.5,
                    availability: 99.2,
                    scalability: 'Good',
                    performanceImpact: 'Low (2-4%)',
                    userSatisfaction: 75,
                    npsScore: 20,
                    supportResponseTime: 30,
                    updateFrequency: 'Monthly',
                    patchingEffort: 'Moderate',
                    integrationEffort: 'Low',
                    trainingHours: 40,
                    certificationAvailable: true,
                    globalReach: false,
                    multiLanguageSupport: 6,
                    apiUptime: 98.5,
                    dataResidencyOptions: 1
                },
                
                security: {
                    zeroTrustScore: 70,
                    overallSecurityScore: 76,
                    deviceAuthMethods: 4,
                    riskAssessmentReal: true,
                    automatedRemediation: true,
                    threatIntelligence: false,
                    behavioralAnalytics: false,
                    microsegmentation: true,
                    encryptionStandards: ['TLS 1.2', 'AES-256'],
                    certifications: ['ISO 27001'],
                    vulnerabilityManagement: 'Automated discovery',
                    incidentResponse: 'Semi-automated',
                    forensicsCapability: false,
                    dlpIntegration: false,
                    siemIntegration: true,
                    soarIntegration: true,
                    xdrCapabilities: false,
                    privacyControls: 'Basic',
                    dataClassification: 'Manual',
                    threatHunting: 'Not Available'
                },
                
                compliance: {
                    frameworks: {
                        'nist-csf': { coverage: 85, controls: 82, automated: 50, effort: 'Medium' },
                        'pci-dss': { coverage: 82, controls: 11, automated: 45, effort: 'Medium' },
                        'hipaa': { coverage: 88, controls: 48, automated: 55, effort: 'Medium' },
                        'gdpr': { coverage: 80, controls: 28, automated: 40, effort: 'High' },
                        'iso27001': { coverage: 84, controls: 98, automated: 48, effort: 'Medium' }
                    },
                    reportingCapabilities: 'Semi-automated',
                    auditTrail: 'Good',
                    dataResidency: 'On-premises only',
                    dataRetention: 'Configurable',
                    evidenceCollection: 'Semi-automated',
                    gapAnalysis: 'Basic',
                    remediationGuidance: 'Basic',
                    certificationSupport: 'Moderate'
                },
                
                features: {
                    deviceVisibility: { available: true, quality: 'Excellent', automation: 'Full' },
                    deviceProfiling: { available: true, quality: 'Advanced', automation: 'Full' },
                    networkAccessControl: { available: true, quality: 'Standard', automation: 'Partial' },
                    guestAccess: { available: false, quality: 'N/A', automation: 'None' },
                    byod: { available: true, quality: 'Basic', automation: 'Partial' },
                    iotSupport: { available: true, quality: 'Excellent', automation: 'Full' },
                    conditionalAccess: { available: false, quality: 'N/A', automation: 'None' },
                    applicationControl: { available: false, quality: 'N/A', automation: 'None' },
                    pkiServices: { available: false, quality: 'N/A', automation: 'None' },
                    cloudRadius: { available: false, quality: 'N/A', automation: 'None' },
                    tacacs: { available: false, quality: 'N/A', automation: 'None' },
                    samlIntegration: { available: false, quality: 'N/A', automation: 'None' },
                    mfaSupport: { available: false, quality: 'Limited', automation: 'None' },
                    centralizedManagement: { available: true, quality: 'Good', automation: 'Partial' },
                    multiTenancy: { available: false, quality: 'N/A', automation: 'None' },
                    roleBasedAccess: { available: true, quality: 'Good', automation: 'Manual' },
                    apiAvailable: { available: true, quality: 'REST', automation: 'Manual' },
                    customIntegrations: { available: true, quality: 'Good', automation: 'Partial' },
                    automatedOnboarding: { available: false, quality: 'Manual', automation: 'None' },
                    selfServicePortal: { available: false, quality: 'N/A', automation: 'None' },
                    automatedCompliance: { available: true, quality: 'Basic', automation: 'Partial' },
                    workflowAutomation: { available: true, quality: 'Good', automation: 'Partial' }
                },
                
                riskReduction: {
                    breachProbabilityReduction: 68,
                    dataExfiltrationPrevention: 72,
                    lateralMovementPrevention: 78,
                    unauthorizedAccessPrevention: 82,
                    malwareSpreadPrevention: 65,
                    insiderThreatMitigation: 70,
                    complianceViolationReduction: 75,
                    shadowITDiscovery: 85,
                    zeroTrustImplementation: 55,
                    ransomwarePrevention: 68,
                    phishingMitigation: 62,
                    supplyChainRiskReduction: 60,
                    avgBreachCostReduction: 1800000,
                    insurancePremiumReduction: 12,
                    compliancePenaltyAvoidance: 80,
                    operationalLossReduction: 55,
                    productivityImprovement: 5,
                    itEfficiencyGain: -10
                },
                
                customerSuccess: {
                    averageDeploymentDays: 60,
                    customerRetentionRate: 80,
                    expansionRate: 110,
                    supportSatisfaction: 3.8,
                    implementationSuccess: 80,
                    timeToFirstValue: 75,
                    adoptionRate: 75,
                    featureUtilization: 65
                }
            },
            
            'fortinet': {
                name: 'FortiNAC',
                shortName: 'FortiNAC',
                logo: './img/vendors/fortinet-logo.png',
                icon: '??',
                color: '#ee3124',
                gradient: 'linear-gradient(135deg, #ee3124 0%, #b71c1c 100%)',
                architecture: 'On-Premises/Virtual',
                deploymentModel: 'Appliance/VM',
                marketPosition: 'Challenger',
                founded: 2000,
                headquarters: 'USA',
                
                pricing: {
                    model: 'perpetual',
                    basePrice: 85,
                    currency: 'USD',
                    billingPeriod: 'one-time',
                    minimumDevices: 100,
                    contractTerms: [36],
                    volumeDiscounts: [
                        { min: 100, max: 1000, discount: 0, label: 'Standard' },
                        { min: 1001, max: 5000, discount: 8, label: 'Enterprise' },
                        { min: 5001, max: Infinity, discount: 12, label: 'Global' }
                    ],
                    includedFeatures: [
                        'NAC',
                        'IoT Security',
                        'Guest Management',
                        'BYOD',
                        'Integration with FortiGate'
                    ],
                    additionalCosts: [
                        'FortiNAC appliances ($60K+)',
                        'Annual FortiCare (20%)',
                        'Implementation ($40K+)',
                        'Training ($12K+)',
                        'Additional modules'
                    ],
                    hiddenCosts: 'Moderate - Appliance costs, FortiGate dependency benefits',
                    roi: {
                        paybackPeriod: 22,
                        threeYearRoi: 35,
                        fiveYearRoi: 75
                    }
                },
                
                costs: {
                    hardware: 60000,
                    software: 25500,
                    implementation: 40000,
                    training: 12000,
                    support: 14000,
                    maintenance: 17000,
                    infrastructure: 9000,
                    personnelPerYear: 100000,
                    downtimePerYear: 20000,
                    patchingPerYear: 10000,
                    upgradesCycle: 30000,
                    energyCosts: 4500,
                    rackSpace: 3000,
                    networkBandwidth: 2000,
                    backupStorage: 3000,
                    disasterRecovery: 9000,
                    complianceAudit: 10000,
                    securityTesting: 5000,
                    vendorManagement: 7000
                },
                
                metrics: {
                    deploymentTime: 45,
                    timeToValue: 60,
                    fteRequired: 1.0,
                    mttr: 2,
                    availability: 99.3,
                    scalability: 'Good',
                    performanceImpact: 'Low (2-3%)',
                    userSatisfaction: 74,
                    npsScore: 15,
                    supportResponseTime: 30,
                    updateFrequency: 'Monthly',
                    patchingEffort: 'Low',
                    integrationEffort: 'Low',
                    trainingHours: 30,
                    certificationAvailable: true,
                    globalReach: false,
                    multiLanguageSupport: 5,
                    apiUptime: 98.8,
                    dataResidencyOptions: 1
                },
                
                security: {
                    zeroTrustScore: 65,
                    overallSecurityScore: 74,
                    deviceAuthMethods: 4,
                    riskAssessmentReal: false,
                    automatedRemediation: true,
                    threatIntelligence: true,
                    behavioralAnalytics: false,
                    microsegmentation: true,
                    encryptionStandards: ['TLS 1.2', 'AES-256'],
                    certifications: ['Common Criteria', 'ICSA Labs'],
                    vulnerabilityManagement: 'Semi-automated',
                    incidentResponse: 'Semi-automated',
                    forensicsCapability: false,
                    dlpIntegration: false,
                    siemIntegration: true,
                    soarIntegration: false,
                    xdrCapabilities: false,
                    privacyControls: 'Basic',
                    dataClassification: 'Manual',
                    threatHunting: 'Not Available'
                },
                
                compliance: {
                    frameworks: {
                        'nist-csf': { coverage: 80, controls: 78, automated: 35, effort: 'High' },
                        'pci-dss': { coverage: 85, controls: 11, automated: 40, effort: 'Medium' },
                        'hipaa': { coverage: 82, controls: 45, automated: 38, effort: 'Medium' },
                        'gdpr': { coverage: 78, controls: 26, automated: 32, effort: 'High' },
                        'iso27001': { coverage: 81, controls: 92, automated: 36, effort: 'High' }
                    },
                    reportingCapabilities: 'Basic',
                    auditTrail: 'Basic',
                    dataResidency: 'On-premises only',
                    dataRetention: 'Manual',
                    evidenceCollection: 'Manual',
                    gapAnalysis: 'Manual',
                    remediationGuidance: 'Limited',
                    certificationSupport: 'Limited'
                },
                
                features: {
                    deviceVisibility: { available: true, quality: 'Good', automation: 'Partial' },
                    deviceProfiling: { available: true, quality: 'Good', automation: 'Partial' },
                    networkAccessControl: { available: true, quality: 'Standard', automation: 'Partial' },
                    guestAccess: { available: true, quality: 'Good', automation: 'Partial' },
                    byod: { available: true, quality: 'Good', automation: 'Partial' },
                    iotSupport: { available: true, quality: 'Good', automation: 'Partial' },
                    conditionalAccess: { available: false, quality: 'N/A', automation: 'None' },
                    applicationControl: { available: false, quality: 'N/A', automation: 'None' },
                    pkiServices: { available: false, quality: 'Limited', automation: 'None' },
                    cloudRadius: { available: false, quality: 'N/A', automation: 'None' },
                    tacacs: { available: false, quality: 'N/A', automation: 'None' },
                    samlIntegration: { available: false, quality: 'N/A', automation: 'None' },
                    mfaSupport: { available: true, quality: 'Basic', automation: 'Manual' },
                    centralizedManagement: { available: true, quality: 'Good', automation: 'Partial' },
                    multiTenancy: { available: false, quality: 'N/A', automation: 'None' },
                    roleBasedAccess: { available: true, quality: 'Basic', automation: 'Manual' },
                    apiAvailable: { available: true, quality: 'REST', automation: 'Manual' },
                    customIntegrations: { available: true, quality: 'FortiGate', automation: 'Partial' },
                    automatedOnboarding: { available: false, quality: 'Manual', automation: 'None' },
                    selfServicePortal: { available: true, quality: 'Basic', automation: 'Partial' },
                    automatedCompliance: { available: false, quality: 'N/A', automation: 'None' },
                    workflowAutomation: { available: true, quality: 'Basic', automation: 'Partial' }
                },
                
                riskReduction: {
                    breachProbabilityReduction: 62,
                    dataExfiltrationPrevention: 68,
                    lateralMovementPrevention: 72,
                    unauthorizedAccessPrevention: 78,
                    malwareSpreadPrevention: 70,
                    insiderThreatMitigation: 65,
                    complianceViolationReduction: 70,
                    shadowITDiscovery: 75,
                    zeroTrustImplementation: 50,
                    ransomwarePrevention: 72,
                    phishingMitigation: 60,
                    supplyChainRiskReduction: 58,
                    avgBreachCostReduction: 1600000,
                    insurancePremiumReduction: 10,
                    compliancePenaltyAvoidance: 75,
                    operationalLossReduction: 50,
                    productivityImprovement: 0,
                    itEfficiencyGain: -5
                },
                
                customerSuccess: {
                    averageDeploymentDays: 60,
                    customerRetentionRate: 82,
                    expansionRate: 115,
                    supportSatisfaction: 3.9,
                    implementationSuccess: 82,
                    timeToFirstValue: 75,
                    adoptionRate: 78,
                    featureUtilization: 70
                }
            },
            
            'juniper': {
                name: 'Juniper Mist Access Assurance',
                shortName: 'Juniper Mist',
                logo: './img/vendors/juniper-logo.png',
                icon: '??',
                color: '#84bd00',
                gradient: 'linear-gradient(135deg, #84bd00 0%, #5b8000 100%)',
                architecture: 'Cloud-Managed',
                deploymentModel: 'Hybrid',
                marketPosition: 'Visionary',
                founded: 1996,
                headquarters: 'USA',
                
                pricing: {
                    model: 'subscription',
                    basePrice: 35,
                    currency: 'USD',
                    billingPeriod: 'monthly',
                    minimumDevices: 50,
                    contractTerms: [12, 24, 36],
                    volumeDiscounts: [
                        { min: 50, max: 500, discount: 0, label: 'Standard' },
                        { min: 501, max: 1000, discount: 10, label: 'Professional' },
                        { min: 1001, max: 5000, discount: 15, label: 'Enterprise' },
                        { min: 5001, max: Infinity, discount: 20, label: 'Global' }
                    ],
                    includedFeatures: [
                        'AI-Driven NAC',
                        'Cloud Management',
                        'Marvis Virtual Network Assistant',
                        'Location Services',
                        'Premium Analytics'
                    ],
                    additionalCosts: [
                        'Edge hardware ($30K optional)',
                        'Professional services ($25K)',
                        'Advanced features'
                    ],
                    hiddenCosts: 'Low - Some edge hardware may be required',
                    roi: {
                        paybackPeriod: 18,
                        threeYearRoi: 95,
                        fiveYearRoi: 180
                    }
                },
                
                costs: {
                    hardware: 30000,
                    software: 0,
                    implementation: 25000,
                    training: 8000,
                    support: 0,
                    maintenance: 0,
                    infrastructure: 5000,
                    personnelPerYear: 60000,
                    downtimePerYear: 10000,
                    patchingPerYear: 0,
                    upgradesCycle: 0,
                    energyCosts: 2000,
                    rackSpace: 1000,
                    networkBandwidth: 0,
                    backupStorage: 0,
                    disasterRecovery: 0,
                    complianceAudit: 8000,
                    securityTesting: 3000,
                    vendorManagement: 4000
                },
                
                metrics: {
                    deploymentTime: 30,
                    timeToValue: 45,
                    fteRequired: 0.6,
                    mttr: 1,
                    availability: 99.9,
                    scalability: 'Excellent',
                    performanceImpact: 'Minimal (<2%)',
                    userSatisfaction: 80,
                    npsScore: 40,
                    supportResponseTime: 20,
                    updateFrequency: 'Continuous',
                    patchingEffort: 'Zero',
                    integrationEffort: 'Low',
                    trainingHours: 20,
                    certificationAvailable: true,
                    globalReach: true,
                    multiLanguageSupport: 15,
                    apiUptime: 99.5,
                    dataResidencyOptions: 5
                },
                
                security: {
                    zeroTrustScore: 76,
                    overallSecurityScore: 80,
                    deviceAuthMethods: 6,
                    riskAssessmentReal: true,
                    automatedRemediation: true,
                    threatIntelligence: true,
                    behavioralAnalytics: true,
                    microsegmentation: true,
                    encryptionStandards: ['TLS 1.3', 'AES-256'],
                    certifications: ['SOC 2'],
                    vulnerabilityManagement: 'Automated',
                    incidentResponse: 'AI-assisted',
                    forensicsCapability: true,
                    dlpIntegration: false,
                    siemIntegration: true,
                    soarIntegration: false,
                    xdrCapabilities: false,
                    privacyControls: 'Good',
                    dataClassification: 'Semi-automated',
                    threatHunting: 'AI-Assisted'
                },
                
                compliance: {
                    frameworks: {
                        'nist-csf': { coverage: 78, controls: 75, automated: 60, effort: 'Medium' },
                        'pci-dss': { coverage: 75, controls: 10, automated: 55, effort: 'Medium' },
                        'hipaa': { coverage: 72, controls: 40, automated: 50, effort: 'Medium' },
                        'gdpr': { coverage: 80, controls: 28, automated: 65, effort: 'Medium' },
                        'iso27001': { coverage: 77, controls: 88, automated: 58, effort: 'Medium' }
                    },
                    reportingCapabilities: 'Semi-automated',
                    auditTrail: 'Good',
                    dataResidency: 'Multi-region',
                    dataRetention: 'Configurable',
                    evidenceCollection: 'Semi-automated',
                    gapAnalysis: 'AI-assisted',
                    remediationGuidance: 'AI-powered',
                    certificationSupport: 'Moderate'
                },
                
                features: {
                    deviceVisibility: { available: true, quality: 'AI-Enhanced', automation: 'Full' },
                    deviceProfiling: { available: true, quality: 'AI-Powered', automation: 'Full' },
                    networkAccessControl: { available: true, quality: 'Modern', automation: 'High' },
                    guestAccess: { available: true, quality: 'Good', automation: 'High' },
                    byod: { available: true, quality: 'Good', automation: 'High' },
                    iotSupport: { available: true, quality: 'Good', automation: 'High' },
                    conditionalAccess: { available: false, quality: 'Limited', automation: 'None' },
                    applicationControl: { available: false, quality: 'N/A', automation: 'None' },
                    pkiServices: { available: false, quality: 'N/A', automation: 'None' },
                    cloudRadius: { available: true, quality: 'Mist Edge', automation: 'High' },
                    tacacs: { available: false, quality: 'N/A', automation: 'None' },
                    samlIntegration: { available: true, quality: 'Good', automation: 'High' },
                    mfaSupport: { available: true, quality: 'Good', automation: 'High' },
                    centralizedManagement: { available: true, quality: 'Cloud-Based', automation: 'Full' },
                    multiTenancy: { available: true, quality: 'Good', automation: 'Full' },
                    roleBasedAccess: { available: true, quality: 'Good', automation: 'High' },
                    apiAvailable: { available: true, quality: 'Modern REST', automation: 'High' },
                    customIntegrations: { available: true, quality: 'Good', automation: 'High' },
                    automatedOnboarding: { available: true, quality: 'AI-Driven', automation: 'Full' },
                    selfServicePortal: { available: true, quality: 'Modern', automation: 'Full' },
                    automatedCompliance: { available: false, quality: 'Basic', automation: 'Partial' },
                    workflowAutomation: { available: true, quality: 'AI-Enhanced', automation: 'High' }
                },
                
                riskReduction: {
                    breachProbabilityReduction: 70,
                    dataExfiltrationPrevention: 75,
                    lateralMovementPrevention: 80,
                    unauthorizedAccessPrevention: 85,
                    malwareSpreadPrevention: 68,
                    insiderThreatMitigation: 72,
                    complianceViolationReduction: 68,
                    shadowITDiscovery: 88,
                    zeroTrustImplementation: 70,
                    ransomwarePrevention: 70,
                    phishingMitigation: 65,
                    supplyChainRiskReduction: 62,
                    avgBreachCostReduction: 2000000,
                    insurancePremiumReduction: 15,
                    compliancePenaltyAvoidance: 70,
                    operationalLossReduction: 60,
                    productivityImprovement: 20,
                    itEfficiencyGain: 35
                },
                
                customerSuccess: {
                    averageDeploymentDays: 45,
                    customerRetentionRate: 85,
                    expansionRate: 130,
                    supportSatisfaction: 4.2,
                    implementationSuccess: 88,
                    timeToFirstValue: 30,
                    adoptionRate: 85,
                    featureUtilization: 78
                }
            },
            
            'arista': {
                name: 'Arista CloudVision',
                shortName: 'Arista',
                logo: './img/vendors/arista-logo.png',
                icon: '??',
                color: '#ff6600',
                gradient: 'linear-gradient(135deg, #ff6600 0%, #cc5200 100%)',
                architecture: 'Cloud-Managed',
                deploymentModel: 'Hybrid',
                marketPosition: 'Niche Player',
                founded: 2004,
                headquarters: 'USA',
                
                pricing: {
                    model: 'subscription',
                    basePrice: 30,
                    currency: 'USD',
                    billingPeriod: 'monthly',
                    minimumDevices: 100,
                    contractTerms: [12, 24, 36],
                    volumeDiscounts: [
                        { min: 100, max: 1000, discount: 0, label: 'Standard' },
                        { min: 1001, max: 5000, discount: 10, label: 'Enterprise' },
                        { min: 5001, max: Infinity, discount: 15, label: 'Global' }
                    ],
                    includedFeatures: [
                        'Network-wide NAC',
                        'CloudVision Portal',
                        'Cognitive Campus',
                        'Network Telemetry',
                        'Automation'
                    ],
                    additionalCosts: [
                        'Arista switches',
                        'Professional services',
                        'Advanced analytics'
                    ],
                    hiddenCosts: 'Low - Works best with Arista infrastructure',
                    roi: {
                        paybackPeriod: 20,
                        threeYearRoi: 75,
                        fiveYearRoi: 145
                    }
                },
                
                costs: {
                    hardware: 40000,
                    software: 0,
                    implementation: 30000,
                    training: 10000,
                    support: 0,
                    maintenance: 0,
                    infrastructure: 6000,
                    personnelPerYear: 75000,
                    downtimePerYear: 12000,
                    patchingPerYear: 0,
                    upgradesCycle: 0,
                    energyCosts: 3000,
                    rackSpace: 2000,
                    networkBandwidth: 0,
                    backupStorage: 0,
                    disasterRecovery: 0,
                    complianceAudit: 9000,
                    securityTesting: 4000,
                    vendorManagement: 5000
                },
                
                metrics: {
                    deploymentTime: 30,
                    timeToValue: 45,
                    fteRequired: 0.75,
                    mttr: 1.5,
                    availability: 99.8,
                    scalability: 'Very Good',
                    performanceImpact: 'Low (<3%)',
                    userSatisfaction: 77,
                    npsScore: 30,
                    supportResponseTime: 25,
                    updateFrequency: 'Continuous',
                    patchingEffort: 'Minimal',
                    integrationEffort: 'Moderate',
                    trainingHours: 25,
                    certificationAvailable: true,
                    globalReach: false,
                    multiLanguageSupport: 8,
                    apiUptime: 99.2,
                    dataResidencyOptions: 3
                },
                
                security: {
                    zeroTrustScore: 70,
                    overallSecurityScore: 73,
                    deviceAuthMethods: 5,
                    riskAssessmentReal: false,
                    automatedRemediation: true,
                    threatIntelligence: false,
                    behavioralAnalytics: true,
                    microsegmentation: true,
                    encryptionStandards: ['TLS 1.2', 'AES-256'],
                    certifications: ['SOC 2'],
                    vulnerabilityManagement: 'Semi-automated',
                    incidentResponse: 'Semi-automated',
                    forensicsCapability: true,
                    dlpIntegration: false,
                    siemIntegration: true,
                    soarIntegration: false,
                    xdrCapabilities: false,
                    privacyControls: 'Basic',
                    dataClassification: 'Manual',
                    threatHunting: 'Not Available'
                },
                
                compliance: {
                    frameworks: {
                        'nist-csf': { coverage: 75, controls: 72, automated: 45, effort: 'Medium' },
                        'pci-dss': { coverage: 78, controls: 10, automated: 48, effort: 'Medium' },
                        'hipaa': { coverage: 74, controls: 38, automated: 42, effort: 'Medium' },
                        'gdpr': { coverage: 76, controls: 25, automated: 45, effort: 'Medium' },
                        'iso27001': { coverage: 77, controls: 85, automated: 44, effort: 'Medium' }
                    },
                    reportingCapabilities: 'Basic',
                    auditTrail: 'Good',
                    dataResidency: 'Limited regions',
                    dataRetention: 'Configurable',
                    evidenceCollection: 'Semi-automated',
                    gapAnalysis: 'Manual',
                    remediationGuidance: 'Basic',
                    certificationSupport: 'Limited'
                },
                
                features: {
                    deviceVisibility: { available: true, quality: 'Network-Centric', automation: 'High' },
                    deviceProfiling: { available: true, quality: 'Good', automation: 'High' },
                    networkAccessControl: { available: true, quality: 'Network-Based', automation: 'High' },
                    guestAccess: { available: false, quality: 'Limited', automation: 'None' },
                    byod: { available: true, quality: 'Basic', automation: 'Partial' },
                    iotSupport: { available: true, quality: 'Good', automation: 'High' },
                    conditionalAccess: { available: false, quality: 'N/A', automation: 'None' },
                    applicationControl: { available: false, quality: 'N/A', automation: 'None' },
                    pkiServices: { available: false, quality: 'N/A', automation: 'None' },
                    cloudRadius: { available: false, quality: 'N/A', automation: 'None' },
                    tacacs: { available: false, quality: 'N/A', automation: 'None' },
                    samlIntegration: { available: true, quality: 'Basic', automation: 'Partial' },
                    mfaSupport: { available: false, quality: 'Limited', automation: 'None' },
                    centralizedManagement: { available: true, quality: 'CloudVision', automation: 'Full' },
                    multiTenancy: { available: true, quality: 'Good', automation: 'Full' },
                    roleBasedAccess: { available: true, quality: 'Good', automation: 'High' },
                    apiAvailable: { available: true, quality: 'Modern', automation: 'High' },
                    customIntegrations: { available: true, quality: 'Good', automation: 'High' },
                    automatedOnboarding: { available: false, quality: 'Manual', automation: 'None' },
                    selfServicePortal: { available: false, quality: 'N/A', automation: 'None' },
                    automatedCompliance: { available: false, quality: 'N/A', automation: 'None' },
                    workflowAutomation: { available: true, quality: 'Network-Focused', automation: 'High' }
                },
                
                riskReduction: {
                    breachProbabilityReduction: 65,
                    dataExfiltrationPrevention: 70,
                    lateralMovementPrevention: 75,
                    unauthorizedAccessPrevention: 78,
                    malwareSpreadPrevention: 60,
                    insiderThreatMitigation: 65,
                    complianceViolationReduction: 65,
                    shadowITDiscovery: 80,
                    zeroTrustImplementation: 60,
                    ransomwarePrevention: 62,
                    phishingMitigation: 58,
                    supplyChainRiskReduction: 55,
                    avgBreachCostReduction: 1700000,
                    insurancePremiumReduction: 10,
                    compliancePenaltyAvoidance: 70,
                    operationalLossReduction: 50,
                    productivityImprovement: 10,
                    itEfficiencyGain: 20
                },
                
                customerSuccess: {
                    averageDeploymentDays: 45,
                    customerRetentionRate: 82,
                    expansionRate: 120,
                    supportSatisfaction: 4.0,
                    implementationSuccess: 85,
                    timeToFirstValue: 60,
                    adoptionRate: 80,
                    featureUtilization: 72
                }
            },
            
            'microsoft': {
                name: 'Microsoft Network Policy Server',
                shortName: 'Microsoft NPS',
                logo: './img/vendors/microsoft-logo.png',
                icon: '??',
                color: '#00bcf2',
                gradient: 'linear-gradient(135deg, #00bcf2 0%, #0078d4 100%)',
                architecture: 'On-Premises',
                deploymentModel: 'Software',
                marketPosition: 'Included',
                founded: 1975,
                headquarters: 'USA',
                
                pricing: {
                    model: 'included',
                    basePrice: 10,
                    currency: 'USD',
                    billingPeriod: 'included',
                    minimumDevices: 0,
                    volumeDiscounts: [],
                    includedFeatures: [
                        'Basic RADIUS',
                        'Network Policies',
                        'Windows Integration',
                        'Basic Authentication'
                    ],
                    additionalCosts: [
                        'Windows Server licenses',
                        'CALs',
                        'Hardware',
                        'Administration'
                    ],
                    hiddenCosts: 'Low - But very limited functionality',
                    roi: {
                        paybackPeriod: 20,
                        threeYearRoi: 25,
                        fiveYearRoi: 60
                    }
                },
                
                costs: {
                    hardware: 20000,
                    software: 3000,
                    implementation: 15000,
                    training: 5000,
                    support: 10000,
                    maintenance: 8000,
                    infrastructure: 5000,
                    personnelPerYear: 85000,
                    downtimePerYear: 30000,
                    patchingPerYear: 15000,
                    upgradesCycle: 20000,
                    energyCosts: 2000,
                    rackSpace: 1500,
                    networkBandwidth: 1000,
                    backupStorage: 2000,
                    disasterRecovery: 5000,
                    complianceAudit: 12000,
                    securityTesting: 5000,
                    vendorManagement: 3000
                },
                
                metrics: {
                    deploymentTime: 21,
                    timeToValue: 30,
                    fteRequired: 0.85,
                    mttr: 6,
                    availability: 98.5,
                    scalability: 'Limited',
                    performanceImpact: 'High (5-15%)',
                    userSatisfaction: 60,
                    npsScore: -20,
                    supportResponseTime: 120,
                    updateFrequency: 'Monthly patches',
                    patchingEffort: 'High',
                    integrationEffort: 'Low (Windows only)',
                    trainingHours: 20,
                    certificationAvailable: true,
                    globalReach: false,
                    multiLanguageSupport: 35,
                    apiUptime: 97.5,
                    dataResidencyOptions: 1
                },
                
                security: {
                    zeroTrustScore: 40,
                    overallSecurityScore: 55,
                    deviceAuthMethods: 3,
                    riskAssessmentReal: false,
                    automatedRemediation: false,
                    threatIntelligence: false,
                    behavioralAnalytics: false,
                    microsegmentation: false,
                    encryptionStandards: ['TLS 1.2'],
                    certifications: ['Microsoft'],
                    vulnerabilityManagement: 'Manual',
                    incidentResponse: 'Manual',
                    forensicsCapability: false,
                    dlpIntegration: false,
                    siemIntegration: false,
                    soarIntegration: false,
                    xdrCapabilities: false,
                    privacyControls: 'Basic',
                    dataClassification: 'Manual',
                    threatHunting: 'Not Available'
                },
                
                compliance: {
                    frameworks: {
                        'nist-csf': { coverage: 60, controls: 55, automated: 15, effort: 'Very High' },
                        'pci-dss': { coverage: 65, controls: 8, automated: 20, effort: 'Very High' },
                        'hipaa': { coverage: 60, controls: 30, automated: 15, effort: 'Very High' },
                        'gdpr': { coverage: 58, controls: 18, automated: 10, effort: 'Very High' },
                        'iso27001': { coverage: 62, controls: 65, automated: 18, effort: 'Very High' }
                    },
                    reportingCapabilities: 'Manual',
                    auditTrail: 'Windows Event Log',
                    dataResidency: 'On-premises only',
                    dataRetention: 'Manual',
                    evidenceCollection: 'Manual',
                    gapAnalysis: 'Not Available',
                    remediationGuidance: 'Not Available',
                    certificationSupport: 'None'
                },
                
                features: {
                    deviceVisibility: { available: false, quality: 'N/A', automation: 'None' },
                    deviceProfiling: { available: false, quality: 'N/A', automation: 'None' },
                    networkAccessControl: { available: true, quality: 'Basic RADIUS', automation: 'None' },
                    guestAccess: { available: false, quality: 'N/A', automation: 'None' },
                    byod: { available: false, quality: 'N/A', automation: 'None' },
                    iotSupport: { available: false, quality: 'N/A', automation: 'None' },
                    conditionalAccess: { available: false, quality: 'N/A', automation: 'None' },
                    applicationControl: { available: false, quality: 'N/A', automation: 'None' },
                    pkiServices: { available: true, quality: 'Windows CA', automation: 'Partial' },
                    cloudRadius: { available: false, quality: 'N/A', automation: 'None' },
                    tacacs: { available: false, quality: 'N/A', automation: 'None' },
                    samlIntegration: { available: false, quality: 'N/A', automation: 'None' },
                    mfaSupport: { available: true, quality: 'Windows Only', automation: 'Partial' },
                    centralizedManagement: { available: false, quality: 'Limited', automation: 'None' },
                    multiTenancy: { available: false, quality: 'N/A', automation: 'None' },
                    roleBasedAccess: { available: true, quality: 'Windows Groups', automation: 'Partial' },
                    apiAvailable: { available: false, quality: 'N/A', automation: 'None' },
                    customIntegrations: { available: false, quality: 'N/A', automation: 'None' },
                    automatedOnboarding: { available: false, quality: 'N/A', automation: 'None' },
                    selfServicePortal: { available: false, quality: 'N/A', automation: 'None' },
                    automatedCompliance: { available: false, quality: 'N/A', automation: 'None' },
                    workflowAutomation: { available: false, quality: 'N/A', automation: 'None' }
                },
                
                riskReduction: {
                    breachProbabilityReduction: 40,
                    dataExfiltrationPrevention: 45,
                    lateralMovementPrevention: 50,
                    unauthorizedAccessPrevention: 55,
                    malwareSpreadPrevention: 35,
                    insiderThreatMitigation: 40,
                    complianceViolationReduction: 45,
                    shadowITDiscovery: 30,
                    zeroTrustImplementation: 20,
                    ransomwarePrevention: 40,
                    phishingMitigation: 35,
                    supplyChainRiskReduction: 30,
                    avgBreachCostReduction: 800000,
                    insurancePremiumReduction: 3,
                    compliancePenaltyAvoidance: 50,
                    operationalLossReduction: 25,
                    productivityImprovement: -15,
                    itEfficiencyGain: -30
                },
                
                customerSuccess: {
                    averageDeploymentDays: 30,
                    customerRetentionRate: 65,
                    expansionRate: 90,
                    supportSatisfaction: 2.8,
                    implementationSuccess: 65,
                    timeToFirstValue: 45,
                    adoptionRate: 55,
                    featureUtilization: 40
                }
            },
            
            'securew2': {
                name: 'SecureW2',
                shortName: 'SecureW2',
                logo: './img/vendors/securew2-logo.png',
                icon: '??',
                color: '#2c5aa0',
                gradient: 'linear-gradient(135deg, #2c5aa0 0%, #1e3d6f 100%)',
                architecture: 'Cloud',
                deploymentModel: 'SaaS',
                marketPosition: 'Niche Player',
                founded: 2012,
                headquarters: 'USA',
                
                pricing: {
                    model: 'subscription',
                    basePrice: 15,
                    currency: 'USD',
                    billingPeriod: 'monthly',
                    minimumDevices: 25,
                    contractTerms: [12, 24],
                    volumeDiscounts: [
                        { min: 25, max: 500, discount: 0, label: 'Starter' },
                        { min: 501, max: 1000, discount: 10, label: 'Professional' },
                        { min: 1001, max: Infinity, discount: 15, label: 'Enterprise' }
                    ],
                    includedFeatures: [
                        'Certificate-based Auth',
                        'Cloud RADIUS',
                        'PKI Services',
                        'Device Onboarding',
                        'Basic Reporting'
                    ],
                    additionalCosts: [
                        'Advanced features',
                        'Professional services',
                        'Custom integrations'
                    ],
                    hiddenCosts: 'Low - Limited to PKI/RADIUS only',
                    roi: {
                        paybackPeriod: 14,
                        threeYearRoi: 120,
                        fiveYearRoi: 220
                    }
                },
                
                costs: {
                    hardware: 0,
                    software: 0,
                    implementation: 8000,
                    training: 3000,
                    support: 0,
                    maintenance: 0,
                    infrastructure: 0,
                    personnelPerYear: 45000,
                    downtimePerYear: 5000,
                    patchingPerYear: 0,
                    upgradesCycle: 0,
                    energyCosts: 0,
                    rackSpace: 0,
                    networkBandwidth: 0,
                    backupStorage: 0,
                    disasterRecovery: 0,
                    complianceAudit: 6000,
                    securityTesting: 2000,
                    vendorManagement: 3000
                },
                
                metrics: {
                    deploymentTime: 14,
                    timeToValue: 21,
                    fteRequired: 0.45,
                    mttr: 1,
                    availability: 99.5,
                    scalability: 'Good',
                    performanceImpact: 'Minimal',
                    userSatisfaction: 73,
                    npsScore: 25,
                    supportResponseTime: 30,
                    updateFrequency: 'Continuous',
                    patchingEffort: 'Zero',
                    integrationEffort: 'Low',
                    trainingHours: 10,
                    certificationAvailable: false,
                    globalReach: true,
                    multiLanguageSupport: 5,
                    apiUptime: 99.0,
                    dataResidencyOptions: 3
                },
                
                security: {
                    zeroTrustScore: 62,
                    overallSecurityScore: 68,
                    deviceAuthMethods: 4,
                    riskAssessmentReal: false,
                    automatedRemediation: false,
                    threatIntelligence: false,
                    behavioralAnalytics: false,
                    microsegmentation: false,
                    encryptionStandards: ['TLS 1.3', 'AES-256'],
                    certifications: ['SOC 2 Type I'],
                    vulnerabilityManagement: 'Basic',
                    incidentResponse: 'Manual',
                    forensicsCapability: false,
                    dlpIntegration: false,
                    siemIntegration: false,
                    soarIntegration: false,
                    xdrCapabilities: false,
                    privacyControls: 'Basic',
                    dataClassification: 'Manual',
                    threatHunting: 'Not Available'
                },
                
                compliance: {
                    frameworks: {
                        'nist-csf': { coverage: 70, controls: 68, automated: 30, effort: 'High' },
                        'pci-dss': { coverage: 72, controls: 9, automated: 35, effort: 'High' },
                        'hipaa': { coverage: 68, controls: 35, automated: 28, effort: 'High' },
                        'gdpr': { coverage: 74, controls: 22, automated: 38, effort: 'Medium' },
                        'iso27001': { coverage: 71, controls: 78, automated: 32, effort: 'High' }
                    },
                    reportingCapabilities: 'Basic',
                    auditTrail: 'Basic',
                    dataResidency: 'Limited regions',
                    dataRetention: 'Standard',
                    evidenceCollection: 'Manual',
                    gapAnalysis: 'Not Available',
                    remediationGuidance: 'Limited',
                    certificationSupport: 'Limited'
                },
                
                features: {
                    deviceVisibility: { available: false, quality: 'N/A', automation: 'None' },
                    deviceProfiling: { available: false, quality: 'N/A', automation: 'None' },
                    networkAccessControl: { available: true, quality: 'Certificate-Based', automation: 'High' },
                    guestAccess: { available: true, quality: 'Basic', automation: 'Partial' },
                    byod: { available: true, quality: 'Good', automation: 'High' },
                    iotSupport: { available: false, quality: 'Limited', automation: 'None' },
                    conditionalAccess: { available: false, quality: 'N/A', automation: 'None' },
                    applicationControl: { available: false, quality: 'N/A', automation: 'None' },
                    pkiServices: { available: true, quality: 'Cloud PKI', automation: 'Full' },
                    cloudRadius: { available: true, quality: 'Good', automation: 'Full' },
                    tacacs: { available: false, quality: 'N/A', automation: 'None' },
                    samlIntegration: { available: true, quality: 'Good', automation: 'High' },
                    mfaSupport: { available: true, quality: 'Certificate-Based', automation: 'Full' },
                    centralizedManagement: { available: true, quality: 'Cloud Portal', automation: 'Full' },
                    multiTenancy: { available: true, quality: 'Good', automation: 'Full' },
                    roleBasedAccess: { available: true, quality: 'Basic', automation: 'High' },
                    apiAvailable: { available: true, quality: 'REST', automation: 'High' },
                    customIntegrations: { available: false, quality: 'Limited', automation: 'None' },
                    automatedOnboarding: { available: true, quality: 'Certificate-Based', automation: 'Full' },
                    selfServicePortal: { available: true, quality: 'Good', automation: 'Full' },
                    automatedCompliance: { available: false, quality: 'N/A', automation: 'None' },
                    workflowAutomation: { available: false, quality: 'N/A', automation: 'None' }
                },
                
                riskReduction: {
                    breachProbabilityReduction: 55,
                    dataExfiltrationPrevention: 60,
                    lateralMovementPrevention: 58,
                    unauthorizedAccessPrevention: 70,
                    malwareSpreadPrevention: 45,
                    insiderThreatMitigation: 50,
                    complianceViolationReduction: 55,
                    shadowITDiscovery: 40,
                    zeroTrustImplementation: 55,
                    ransomwarePrevention: 50,
                    phishingMitigation: 48,
                    supplyChainRiskReduction: 45,
                    avgBreachCostReduction: 1200000,
                    insurancePremiumReduction: 5,
                    compliancePenaltyAvoidance: 60,
                    operationalLossReduction: 35,
                    productivityImprovement: 10,
                    itEfficiencyGain: 25
                },
                
                customerSuccess: {
                    averageDeploymentDays: 21,
                    customerRetentionRate: 78,
                    expansionRate: 115,
                    supportSatisfaction: 3.8,
                    implementationSuccess: 82,
                    timeToFirstValue: 14,
                    adoptionRate: 80,
                    featureUtilization: 70
                }
            },
            
            'foxpass': {
                name: 'Foxpass',
                shortName: 'Foxpass',
                logo: './img/vendors/foxpass-logo.png',
                icon: '??',
                color: '#ff4444',
                gradient: 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)',
                architecture: 'Cloud',
                deploymentModel: 'SaaS',
                marketPosition: 'Niche Player',
                founded: 2012,
                headquarters: 'USA',
                
                pricing: {
                    model: 'subscription',
                    basePrice: 12,
                    currency: 'USD',
                    billingPeriod: 'monthly',
                    minimumDevices: 10,
                    contractTerms: [12],
                    volumeDiscounts: [
                        { min: 10, max: 100, discount: 0, label: 'Starter' },
                        { min: 101, max: 500, discount: 10, label: 'Team' },
                        { min: 501, max: Infinity, discount: 20, label: 'Enterprise' }
                    ],
                    includedFeatures: [
                        'Cloud RADIUS',
                        'LDAP',
                        'Basic Auth',
                        'API Access',
                        'Basic Support'
                    ],
                    additionalCosts: [
                        'Enterprise features',
                        'Premium support',
                        'Custom development'
                    ],
                    hiddenCosts: 'Low - Very basic feature set',
                    roi: {
                        paybackPeriod: 12,
                        threeYearRoi: 90,
                        fiveYearRoi: 180
                    }
                },
                
                costs: {
                    hardware: 0,
                    software: 0,
                    implementation: 5000,
                    training: 2000,
                    support: 0,
                    maintenance: 0,
                    infrastructure: 0,
                    personnelPerYear: 40000,
                    downtimePerYear: 8000,
                    patchingPerYear: 0,
                    upgradesCycle: 0,
                    energyCosts: 0,
                    rackSpace: 0,
                    networkBandwidth: 0,
                    backupStorage: 0,
                    disasterRecovery: 0,
                    complianceAudit: 8000,
                    securityTesting: 3000,
                    vendorManagement: 2000
                },
                
                metrics: {
                    deploymentTime: 7,
                    timeToValue: 14,
                    fteRequired: 0.4,
                    mttr: 2,
                    availability: 99.0,
                    scalability: 'Good',
                    performanceImpact: 'Minimal',
                    userSatisfaction: 70,
                    npsScore: 20,
                    supportResponseTime: 60,
                    updateFrequency: 'Weekly',
                    patchingEffort: 'Zero',
                    integrationEffort: 'Low',
                    trainingHours: 8,
                    certificationAvailable: false,
                    globalReach: true,
                    multiLanguageSupport: 3,
                    apiUptime: 98.5,
                    dataResidencyOptions: 2
                },
                
                security: {
                    zeroTrustScore: 50,
                    overallSecurityScore: 60,
                    deviceAuthMethods: 3,
                    riskAssessmentReal: false,
                    automatedRemediation: false,
                    threatIntelligence: false,
                    behavioralAnalytics: false,
                    microsegmentation: false,
                    encryptionStandards: ['TLS 1.2', 'AES-256'],
                    certifications: [],
                    vulnerabilityManagement: 'Basic',
                    incidentResponse: 'Manual',
                    forensicsCapability: false,
                    dlpIntegration: false,
                    siemIntegration: false,
                    soarIntegration: false,
                    xdrCapabilities: false,
                    privacyControls: 'Basic',
                    dataClassification: 'Manual',
                    threatHunting: 'Not Available'
                },
                
                compliance: {
                    frameworks: {
                        'nist-csf': { coverage: 65, controls: 60, automated: 20, effort: 'Very High' },
                        'pci-dss': { coverage: 62, controls: 8, automated: 25, effort: 'Very High' },
                        'hipaa': { coverage: 60, controls: 32, automated: 18, effort: 'Very High' },
                        'gdpr': { coverage: 68, controls: 20, automated: 28, effort: 'High' },
                        'iso27001': { coverage: 64, controls: 70, automated: 22, effort: 'Very High' }
                    },
                    reportingCapabilities: 'Basic',
                    auditTrail: 'Basic',
                    dataResidency: 'US only',
                    dataRetention: 'Limited',
                    evidenceCollection: 'Manual',
                    gapAnalysis: 'Not Available',
                    remediationGuidance: 'Not Available',
                    certificationSupport: 'None'
                },
                
                features: {
                    deviceVisibility: { available: false, quality: 'N/A', automation: 'None' },
                    deviceProfiling: { available: false, quality: 'N/A', automation: 'None' },
                    networkAccessControl: { available: true, quality: 'Basic RADIUS', automation: 'Partial' },
                    guestAccess: { available: false, quality: 'N/A', automation: 'None' },
                    byod: { available: true, quality: 'Basic', automation: 'Partial' },
                    iotSupport: { available: false, quality: 'N/A', automation: 'None' },
                    conditionalAccess: { available: false, quality: 'N/A', automation: 'None' },
                    applicationControl: { available: false, quality: 'N/A', automation: 'None' },
                    pkiServices: { available: false, quality: 'N/A', automation: 'None' },
                    cloudRadius: { available: true, quality: 'Basic', automation: 'Full' },
                    tacacs: { available: false, quality: 'N/A', automation: 'None' },
                    samlIntegration: { available: true, quality: 'Basic', automation: 'Partial' },
                    mfaSupport: { available: true, quality: 'Basic', automation: 'Partial' },
                    centralizedManagement: { available: true, quality: 'Basic Portal', automation: 'Partial' },
                    multiTenancy: { available: false, quality: 'N/A', automation: 'None' },
                    roleBasedAccess: { available: true, quality: 'Basic', automation: 'Partial' },
                    apiAvailable: { available: true, quality: 'Basic REST', automation: 'Partial' },
                    customIntegrations: { available: false, quality: 'N/A', automation: 'None' },
                    automatedOnboarding: { available: false, quality: 'N/A', automation: 'None' },
                    selfServicePortal: { available: false, quality: 'N/A', automation: 'None' },
                    automatedCompliance: { available: false, quality: 'N/A', automation: 'None' },
                    workflowAutomation: { available: false, quality: 'N/A', automation: 'None' }
                },
                
                riskReduction: {
                    breachProbabilityReduction: 48,
                    dataExfiltrationPrevention: 52,
                    lateralMovementPrevention: 50,
                    unauthorizedAccessPrevention: 60,
                    malwareSpreadPrevention: 40,
                    insiderThreatMitigation: 45,
                    complianceViolationReduction: 50,
                    shadowITDiscovery: 35,
                    zeroTrustImplementation: 40,
                    ransomwarePrevention: 45,
                    phishingMitigation: 42,
                    supplyChainRiskReduction: 40,
                    avgBreachCostReduction: 1000000,
                    insurancePremiumReduction: 4,
                    compliancePenaltyAvoidance: 55,
                    operationalLossReduction: 30,
                    productivityImprovement: 5,
                    itEfficiencyGain: 15
                },
                
                customerSuccess: {
                    averageDeploymentDays: 14,
                    customerRetentionRate: 72,
                    expansionRate: 105,
                    supportSatisfaction: 3.5,
                    implementationSuccess: 78,
                    timeToFirstValue: 7,
                    adoptionRate: 75,
                    featureUtilization: 65
                }
            }
        };
    }
    
    initializeEnhancedIndustryData() {
        return {
            'healthcare': {
                name: 'Healthcare & Life Sciences',
                icon: '??',
                color: '#e74c3c',
                gradient: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                riskMultiplier: 1.8,
                complianceWeight: 1.5,
                breachCost: 10930000,
                avgDevices: 5000,
                avgLocations: 15,
                avgUsers: 8000,
                regulatoryRequirements: ['HIPAA', 'GDPR', 'FDA 21 CFR Part 11', 'HITECH', 'ISO 27001'],
                specificRisks: ['PHI exposure', 'Medical device vulnerabilities', 'Ransomware', 'Third-party access', 'IoMT security'],
                nacPriorities: ['Medical device security', 'PHI protection', 'Compliance automation', 'Vendor access', 'Zero trust'],
                typicalArchitecture: 'hybrid',
                criticalFactors: ['Patient safety', 'Data privacy', 'Operational continuity', 'Regulatory compliance'],
                insuranceRequirements: 'Very High',
                downTimeImpact: 50000, // per hour
                specificChallenges: [
                    'Legacy medical equipment integration',
                    'Complex vendor ecosystem',
                    'Life-critical system protection',
                    'BYOD medical staff requirements',
                    'Multi-site coordination'
                ]
            },
            'finance': {
                name: 'Financial Services & Banking',
                icon: '??',
                color: '#3498db',
                gradient: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                riskMultiplier: 2.0,
                complianceWeight: 1.8,
                breachCost: 5970000,
                avgDevices: 10000,
                avgLocations: 50,
                avgUsers: 15000,
                regulatoryRequirements: ['PCI DSS', 'SOX', 'GLBA', 'GDPR', 'NYDFS', 'BASEL III', 'SWIFT CSP'],
                specificRisks: ['Financial fraud', 'Account takeover', 'Money laundering', 'Regulatory penalties', 'Insider threats'],
                nacPriorities: ['Transaction security', 'Privileged access', 'Real-time monitoring', 'Compliance reporting', 'Zero trust'],
                typicalArchitecture: 'on-premises',
                criticalFactors: ['Transaction integrity', 'Customer trust', 'Regulatory compliance', 'Fraud prevention'],
                insuranceRequirements: 'Critical',
                downTimeImpact: 100000,
                specificChallenges: [
                    'High-frequency trading systems',
                    'ATM and branch security',
                    'Third-party fintech integration',
                    'Real-time fraud detection',
                    'Cross-border compliance'
                ]
            },
            'government': {
                name: 'Government & Public Sector',
                icon: '???',
                color: '#9b59b6',
                gradient: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)',
                riskMultiplier: 1.5,
                complianceWeight: 2.0,
                breachCost: 8750000,
                avgDevices: 15000,
                avgLocations: 100,
                avgUsers: 25000,
                regulatoryRequirements: ['FISMA', 'FedRAMP', 'NIST 800-171', 'CJIS', 'StateRAMP', 'CMMC', 'ITAR'],
                specificRisks: ['Nation-state attacks', 'Critical infrastructure', 'Citizen data', 'Classified information', 'Espionage'],
                nacPriorities: ['Security clearance verification', 'Classified network separation', 'Audit trails', 'Zero trust architecture'],
                typicalArchitecture: 'on-premises',
                criticalFactors: ['National security', 'Citizen services', 'Data sovereignty', 'Public trust'],
                insuranceRequirements: 'Government-backed',
                downTimeImpact: 75000,
                specificChallenges: [
                    'Classified network management',
                    'Legacy system modernization',
                    'Inter-agency collaboration',
                    'Citizen identity verification',
                    'Emergency response systems'
                ]
            },
            'education': {
                name: 'Education & Research',
                icon: '??',
                color: '#f39c12',
                gradient: 'linear-gradient(135deg, #f39c12 0%, #d68910 100%)',
                riskMultiplier: 1.1,
                complianceWeight: 1.2,
                breachCost: 3860000,
                avgDevices: 20000,
                avgLocations: 5,
                avgUsers: 30000,
                regulatoryRequirements: ['FERPA', 'COPPA', 'GDPR', 'State privacy laws', 'GLBA'],
                specificRisks: ['Student data privacy', 'Research IP theft', 'Campus network abuse', 'BYOD challenges', 'Ransomware'],
                nacPriorities: ['Student device management', 'Guest access', 'Research data protection', 'Campus-wide visibility'],
                typicalArchitecture: 'hybrid',
                criticalFactors: ['Student privacy', 'Research integrity', 'Academic freedom', 'Campus safety'],
                insuranceRequirements: 'Moderate',
                downTimeImpact: 25000,
                specificChallenges: [
                    'Massive BYOD environment',
                    'Open campus network',
                    'Research data protection',
                    'Student housing networks',
                    'Distance learning security'
                ]
            },
            'retail': {
                name: 'Retail & E-commerce',
                icon: '??',
                color: '#e67e22',
                gradient: 'linear-gradient(135deg, #e67e22 0%, #d35400 100%)',
                riskMultiplier: 1.3,
                complianceWeight: 1.1,
                breachCost: 3280000,
                avgDevices: 8000,
                avgLocations: 200,
                avgUsers: 5000,
                regulatoryRequirements: ['PCI DSS', 'GDPR', 'CCPA', 'State breach laws'],
                specificRisks: ['Payment card theft', 'POS malware', 'Supply chain attacks', 'Customer data breaches', 'E-skimming'],
                nacPriorities: ['POS security', 'Store network segmentation', 'Vendor access', 'IoT device management'],
                typicalArchitecture: 'cloud',
                criticalFactors: ['Transaction security', 'Customer experience', 'Brand reputation', 'Omnichannel security'],
                insuranceRequirements: 'High',
                downTimeImpact: 40000,
                specificChallenges: [
                    'POS system security',
                    'Guest WiFi management',
                    'Seasonal workforce',
                    'Multi-vendor ecosystem',
                    'E-commerce integration'
                ]
            },
            'manufacturing': {
                name: 'Manufacturing & Industrial',
                icon: '??',
                color: '#34495e',
                gradient: 'linear-gradient(135deg, #34495e 0%, #2c3e50 100%)',
                riskMultiplier: 1.4,
                complianceWeight: 1.0,
                breachCost: 4450000,
                avgDevices: 12000,
                avgLocations: 20,
                avgUsers: 6000,
                regulatoryRequirements: ['ISO 27001', 'NIST CSF', 'IEC 62443', 'Industry standards'],
                specificRisks: ['OT/IT convergence', 'Industrial espionage', 'Supply chain disruption', 'Safety systems', 'IP theft'],
                nacPriorities: ['OT security', 'Segmentation', 'Vendor access', 'Legacy system protection'],
                typicalArchitecture: 'on-premises',
                criticalFactors: ['Production continuity', 'IP protection', 'Safety systems', 'Supply chain security'],
                insuranceRequirements: 'High',
                downTimeImpact: 60000,
                specificChallenges: [
                    'Legacy OT systems',
                    'Air-gapped networks',
                    'Vendor remote access',
                    'Industrial IoT security',
                    'Safety system isolation'
                ]
            },
            'energy': {
                name: 'Energy & Utilities',
                icon: '?',
                color: '#f1c40f',
                gradient: 'linear-gradient(135deg, #f1c40f 0%, #f39c12 100%)',
                riskMultiplier: 1.6,
                complianceWeight: 1.4,
                breachCost: 4650000,
                avgDevices: 25000,
                avgLocations: 500,
                avgUsers: 10000,
                regulatoryRequirements: ['NERC CIP', 'TSA Pipeline', 'NIST CSF', 'DOE requirements', 'IEC 62351'],
                specificRisks: ['Critical infrastructure attacks', 'SCADA vulnerabilities', 'Physical safety', 'Grid stability', 'Nation-state threats'],
                nacPriorities: ['Critical asset protection', 'OT/IT separation', 'Compliance automation', 'Real-time monitoring'],
                typicalArchitecture: 'on-premises',
                criticalFactors: ['Grid reliability', 'Public safety', 'Critical infrastructure', 'Environmental compliance'],
                insuranceRequirements: 'Critical',
                downTimeImpact: 150000,
                specificChallenges: [
                    'SCADA system security',
                    'Remote site management',
                    'Critical infrastructure protection',
                    'Emergency response coordination',
                    'Smart grid security'
                ]
            },
            'telecommunications': {
                name: 'Telecommunications',
                icon: '??',
                color: '#16a085',
                gradient: 'linear-gradient(135deg, #16a085 0%, #117a65 100%)',
                riskMultiplier: 1.5,
                complianceWeight: 1.3,
                breachCost: 3680000,
                avgDevices: 50000,
                avgLocations: 1000,
                avgUsers: 20000,
                regulatoryRequirements: ['CPNI', 'GDPR', 'FCC regulations', 'CALEA', 'Privacy laws'],
                specificRisks: ['Network infrastructure attacks', 'Customer data breaches', 'Service disruption', 'Espionage', '5G security'],
                nacPriorities: ['Network infrastructure security', 'Customer data protection', 'Service availability', 'Regulatory compliance'],
                typicalArchitecture: 'hybrid',
                criticalFactors: ['Service availability', 'Customer privacy', 'Network integrity', 'National security'],
                insuranceRequirements: 'High',
                downTimeImpact: 200000,
                specificChallenges: [
                    'Massive scale management',
                    '5G infrastructure security',
                    'Customer data privacy',
                    'Network function virtualization',
                    'Edge computing security'
                ]
            },
            'pharmaceuticals': {
                name: 'Pharmaceuticals & Biotech',
                icon: '??',
                color: '#27ae60',
                gradient: 'linear-gradient(135deg, #27ae60 0%, #229954 100%)',
                riskMultiplier: 1.7,
                complianceWeight: 1.6,
                breachCost: 5010000,
                avgDevices: 8000,
                avgLocations: 30,
                avgUsers: 12000,
                regulatoryRequirements: ['FDA 21 CFR Part 11', 'GDPR', 'HIPAA', 'GxP', 'ISO 27001'],
                specificRisks: ['IP theft', 'Clinical trial data', 'Manufacturing integrity', 'Supply chain', 'Corporate espionage'],
                nacPriorities: ['Research data protection', 'Manufacturing security', 'Compliance validation', 'Partner access'],
                typicalArchitecture: 'hybrid',
                criticalFactors: ['Research IP', 'Patient safety', 'Manufacturing integrity', 'Regulatory compliance'],
                insuranceRequirements: 'Very High',
                downTimeImpact: 80000,
                specificChallenges: [
                    'Research data protection',
                    'Clinical trial security',
                    'Manufacturing validation',
                    'Partner collaboration',
                    'Global compliance'
                ]
            },
            'insurance': {
                name: 'Insurance',
                icon: '???',
                color: '#2c3e50',
                gradient: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                riskMultiplier: 1.4,
                complianceWeight: 1.3,
                breachCost: 5850000,
                avgDevices: 7000,
                avgLocations: 40,
                avgUsers: 10000,
                regulatoryRequirements: ['GDPR', 'GLBA', 'State insurance laws', 'SOX', 'NAIC'],
                specificRisks: ['PII exposure', 'Claims fraud', 'Actuarial data theft', 'Third-party breaches', 'Insider threats'],
                nacPriorities: ['Customer data protection', 'Claims system security', 'Agent access management', 'Compliance'],
                typicalArchitecture: 'hybrid',
                criticalFactors: ['Customer trust', 'Claims integrity', 'Actuarial data', 'Regulatory compliance'],
                insuranceRequirements: 'Self-insured',
                downTimeImpact: 45000,
                specificChallenges: [
                    'Agent network security',
                    'Claims processing protection',
                    'Third-party integrations',
                    'Mobile workforce',
                    'Customer portal security'
                ]
            },
            'technology': {
                name: 'Technology & Software',
                icon: '??',
                color: '#3498db',
                gradient: 'linear-gradient(135deg, #3498db 0%, #2471a3 100%)',
                riskMultiplier: 1.2,
                complianceWeight: 0.9,
                breachCost: 4350000,
                avgDevices: 5000,
                avgLocations: 10,
                avgUsers: 3000,
                regulatoryRequirements: ['GDPR', 'CCPA', 'SOX', 'ISO 27001', 'SOC 2'],
                specificRisks: ['IP theft', 'Data breaches', 'Insider threats', 'Supply chain attacks', 'Code theft'],
                nacPriorities: ['Cloud integration', 'API security', 'Developer access', 'Zero trust', 'DevOps security'],
                typicalArchitecture: 'cloud',
                criticalFactors: ['IP protection', 'Service availability', 'Customer data', 'Innovation speed'],
                insuranceRequirements: 'High',
                downTimeImpact: 35000,
                specificChallenges: [
                    'Developer environment security',
                    'Cloud workload protection',
                    'API security',
                    'Open source risks',
                    'Remote workforce'
                ]
            }
        };
    }
    
    initializeDetailedComplianceData() {
        return {
            'nist-csf': {
                name: 'NIST Cybersecurity Framework',
                fullName: 'National Institute of Standards and Technology Cybersecurity Framework',
                version: '2.0',
                icon: '???',
                color: '#2c3e50',
                description: 'Comprehensive framework for improving cybersecurity posture',
                applicability: 'All Industries',
                maturityLevels: ['Partial', 'Risk Informed', 'Repeatable', 'Adaptive'],
                lastUpdated: '2024',
                
                categories: {
                    'identify': {
                        name: 'Identify',
                        icon: '??',
                        description: 'Develop organizational understanding to manage cybersecurity risk',
                        subcategories: 23,
                        controls: 37,
                        nacRelevance: 95,
                        functions: ['Asset Management', 'Risk Assessment', 'Governance', 'Risk Management Strategy', 'Supply Chain Risk Management'],
                        nacControls: [
                            'Automated device discovery and inventory',
                            'Real-time asset visibility and classification',
                            'Continuous risk assessment and scoring',
                            'Vendor risk assessment',
                            'Configuration management database',
                            'Software inventory and licensing',
                            'Network topology mapping',
                            'Data flow analysis'
                        ],
                        portnoxImplementation: {
                            coverage: 98,
                            automation: 95,
                            features: [
                                'AI-powered device discovery',
                                'Automatic device classification',
                                'Real-time risk scoring',
                                'Continuous compliance monitoring',
                                'Vendor device tracking',
                                'Automated CMDB updates'
                            ]
                        }
                    },
                    'protect': {
                        name: 'Protect',
                        icon: '??',
                        description: 'Develop and implement appropriate safeguards',
                        subcategories: 29,
                        controls: 43,
                        nacRelevance: 98,
                        functions: ['Identity Management & Access Control', 'Awareness & Training', 'Data Security', 'Information Protection', 'Maintenance', 'Protective Technology'],
                        nacControls: [
                            'Zero Trust Network Access enforcement',
                            'Multi-factor authentication',
                            'Dynamic access control policies',
                            'Network microsegmentation',
                            'Encryption enforcement',
                            'Secure remote access',
                            'Privileged access management',
                            'Data loss prevention'
                        ],
                        portnoxImplementation: {
                            coverage: 96,
                            automation: 92,
                            features: [
                                'Conditional access policies',
                                'PKI certificate services',
                                'Dynamic VLAN assignment',
                                'Application-level access control',
                                'Automated security updates',
                                'Guest isolation'
                            ]
                        }
                    },
                    'detect': {
                        name: 'Detect',
                        icon: '???',
                        description: 'Develop and implement activities to identify cybersecurity events',
                        subcategories: 18,
                        controls: 28,
                        nacRelevance: 93,
                        functions: ['Anomalies & Events', 'Security Continuous Monitoring', 'Detection Processes'],
                        nacControls: [
                            'Behavioral analytics and anomaly detection',
                            'Real-time threat detection',
                            'Continuous monitoring dashboards',
                            'Security event correlation',
                            'User behavior analytics',
                            'Network traffic analysis',
                            'Threat intelligence integration',
                            'Compliance monitoring'
                        ],
                        portnoxImplementation: {
                            coverage: 94,
                            automation: 90,
                            features: [
                                'AI-powered anomaly detection',
                                'Real-time alerting',
                                'Behavioral baselines',
                                'SIEM integration',
                                'Threat feed integration',
                                'Custom detection rules'
                            ]
                        }
                    },
                    'respond': {
                        name: 'Respond',
                        icon: '?',
                        description: 'Develop and implement activities for detected cybersecurity incidents',
                        subcategories: 13,
                        controls: 19,
                        nacRelevance: 91,
                        functions: ['Response Planning', 'Communications', 'Analysis', 'Mitigation', 'Improvements'],
                        nacControls: [
                            'Automated threat response',
                            'Dynamic quarantine capabilities',
                            'Incident response workflows',
                            'Real-time policy adjustment',
                            'Automated remediation',
                            'Forensic data collection',
                            'Communication templates',
                            'Post-incident analysis'
                        ],
                        portnoxImplementation: {
                            coverage: 92,
                            automation: 88,
                            features: [
                                'Automated quarantine',
                                'Policy-based response',
                                'Integration with SOAR',
                                'Incident ticketing',
                                'Automated notifications',
                                'Response playbooks'
                            ]
                        }
                    },
                    'recover': {
                        name: 'Recover',
                        icon: '??',
                        description: 'Develop and implement activities to maintain resilience',
                        subcategories: 8,
                        controls: 11,
                        nacRelevance: 85,
                        functions: ['Recovery Planning', 'Improvements', 'Communications'],
                        nacControls: [
                            'Access restoration procedures',
                            'Backup access methods',
                            'Business continuity support',
                            'Service restoration priorities',
                            'Lessons learned integration',
                            'Recovery time objectives',
                            'Recovery point objectives',
                            'Communication protocols'
                        ],
                        portnoxImplementation: {
                            coverage: 88,
                            automation: 82,
                            features: [
                                'Automated access restoration',
                                'Backup authentication methods',
                                'Priority-based recovery',
                                'Recovery dashboards',
                                'Post-recovery validation',
                                'Automated reporting'
                            ]
                        }
                    }
                },
                
                mappings: {
                    'iso27001': 85,
                    'pci-dss': 78,
                    'hipaa': 82,
                    'sox': 75,
                    'gdpr': 80
                }
            },
            
            'pci-dss': {
                name: 'PCI DSS',
                fullName: 'Payment Card Industry Data Security Standard',
                version: '4.0',
                icon: '??',
                color: '#e74c3c',
                description: 'Security standard for organizations handling payment cards',
                applicability: 'Any organization processing payment cards',
                maturityLevels: ['Non-compliant', 'Partial', 'Compliant', 'Optimized'],
                lastUpdated: '2024',
                
                requirements: {
                    'requirement1': {
                        title: 'Install and maintain network security controls',
                        nacRelevance: 95,
                        controls: 12,
                        subRequirements: [
                            '1.1 - Network security controls established',
                            '1.2 - Network security controls configured',
                            '1.3 - Network access restricted',
                            '1.4 - Network connections secured',
                            '1.5 - Risks to CDE managed'
                        ],
                        nacControls: [
                            'Network segmentation between CDE and other networks',
                            'Restrict inbound and outbound traffic',
                            'Document and approve all connections',
                            'Implement network security controls',
                            'Review firewall and router configurations'
                        ],
                        portnoxImplementation: {
                            coverage: 96,
                            automation: 93,
                            features: [
                                'Automated network segmentation',
                                'Dynamic firewall rules',
                                'Real-time traffic monitoring',
                                'Automated documentation',
                                'Continuous configuration validation'
                            ]
                        }
                    },
                    'requirement2': {
                        title: 'Apply secure configurations',
                        nacRelevance: 88,
                        controls: 8,
                        subRequirements: [
                            '2.1 - Processes defined',
                            '2.2 - System configurations secured',
                            '2.3 - Wireless environments secured'
                        ],
                        nacControls: [
                            'Change default credentials',
                            'Remove unnecessary services',
                            'Implement security hardening',
                            'Configure system security parameters',
                            'Maintain inventory of system components'
                        ],
                        portnoxImplementation: {
                            coverage: 90,
                            automation: 85,
                            features: [
                                'Configuration compliance checking',
                                'Automated hardening verification',
                                'Default credential detection',
                                'Wireless security enforcement',
                                'Configuration drift detection'
                            ]
                        }
                    },
                    'requirement7': {
                        title: 'Restrict access by business need-to-know',
                        nacRelevance: 98,
                        controls: 6,
                        subRequirements: [
                            '7.1 - Processes defined',
                            '7.2 - Access to CDE components restricted',
                            '7.3 - Access to CDE minimized'
                        ],
                        nacControls: [
                            'Role-based access control',
                            'Least privilege enforcement',
                            'Access approval workflows',
                            'Regular access reviews',
                            'Privileged access management'
                        ],
                        portnoxImplementation: {
                            coverage: 97,
                            automation: 94,
                            features: [
                                'Dynamic role assignment',
                                'Automated least privilege',
                                'Access certification workflows',
                                'Real-time access monitoring',
                                'Privileged session management'
                            ]
                        }
                    },
                    'requirement8': {
                        title: 'Identify users and authenticate access',
                        nacRelevance: 99,
                        controls: 12,
                        subRequirements: [
                            '8.1 - Processes defined',
                            '8.2 - User identification managed',
                            '8.3 - Strong authentication',
                            '8.4 - MFA implemented',
                            '8.5 - MFA systems secured',
                            '8.6 - Other authentication mechanisms'
                        ],
                        nacControls: [
                            'Unique user identification',
                            'Multi-factor authentication',
                            'Strong password policies',
                            'Account lockout mechanisms',
                            'Session management',
                            'Certificate-based authentication'
                        ],
                        portnoxImplementation: {
                            coverage: 98,
                            automation: 96,
                            features: [
                                'Advanced MFA options',
                                'PKI certificate services',
                                'Biometric authentication',
                                'Risk-based authentication',
                                'Single sign-on integration',
                                'Passwordless authentication'
                            ]
                        }
                    },
                    'requirement10': {
                        title: 'Log and monitor all access',
                        nacRelevance: 96,
                        controls: 7,
                        subRequirements: [
                            '10.1 - Processes defined',
                            '10.2 - Audit logs implemented',
                            '10.3 - Audit logs protected',
                            '10.4 - Audit logs reviewed',
                            '10.5 - Audit log history retained',
                            '10.6 - Time synchronization',
                            '10.7 - Failures detected'
                        ],
                        nacControls: [
                            'Comprehensive logging',
                            'Log retention and protection',
                            'Daily log review',
                            'Audit trail maintenance',
                            'Security event monitoring',
                            'Log integrity protection'
                        ],
                        portnoxImplementation: {
                            coverage: 95,
                            automation: 92,
                            features: [
                                'Centralized logging',
                                'Automated log analysis',
                                'Tamper-proof audit trails',
                                'Real-time alerting',
                                'Compliance reporting',
                                'Log archival and retrieval'
                            ]
                        }
                    }
                },
                
                compensatingControls: {
                    description: 'Alternative controls when standard requirements cannot be met',
                    nacSupport: 'Portnox provides flexible policy engine for compensating controls',
                    examples: [
                        'Enhanced monitoring for legacy systems',
                        'Additional network segmentation',
                        'Increased audit frequency',
                        'Manual review processes'
                    ]
                }
            },
            
            'hipaa': {
                name: 'HIPAA',
                fullName: 'Health Insurance Portability and Accountability Act',
                version: 'Current',
                icon: '??',
                color: '#e74c3c',
                description: 'US healthcare data privacy and security provisions',
                applicability: 'Healthcare providers, payers, and business associates',
                maturityLevels: ['Non-compliant', 'Basic', 'Managed', 'Optimized'],
                lastUpdated: '2023',
                
                safeguards: {
                    'administrative': {
                        title: 'Administrative Safeguards',
                        icon: '??',
                        standards: 9,
                        implementations: 54,
                        nacRelevance: 92,
                        requirements: [
                            'Security Officer designation',
                            'Workforce training',
                            'Access management',
                            'Audit controls',
                            'Risk assessment',
                            'Risk management',
                            'Sanction policy',
                            'Information system review',
                            'Contingency plan',
                            'Evaluation',
                            'Business associate contracts'
                        ],
                        nacControls: [
                            'Access control management',
                            'Workforce training tracking',
                            'Access authorization procedures',
                            'Audit control implementation',
                            'Risk assessment automation',
                            'Incident response procedures',
                            'Business associate management',
                            'Periodic security reviews'
                        ],
                        portnoxImplementation: {
                            coverage: 94,
                            automation: 88,
                            features: [
                                'Role-based access control',
                                'Training compliance tracking',
                                'Automated access reviews',
                                'Continuous audit logging',
                                'Risk scoring engine',
                                'Incident response workflows',
                                'Vendor access management',
                                'Compliance dashboards'
                            ]
                        }
                    },
                    'physical': {
                        title: 'Physical Safeguards',
                        icon: '??',
                        standards: 4,
                        implementations: 12,
                        nacRelevance: 78,
                        requirements: [
                            'Facility access controls',
                            'Workstation use',
                            'Workstation security',
                            'Device and media controls'
                        ],
                        nacControls: [
                            'Facility access controls',
                            'Workstation security policies',
                            'Device and media controls',
                            'Equipment disposal procedures'
                        ],
                        portnoxImplementation: {
                            coverage: 82,
                            automation: 75,
                            features: [
                                'Location-based access',
                                'Workstation compliance',
                                'Device encryption verification',
                                'Media sanitization tracking',
                                'Physical access integration',
                                'Asset disposal workflows'
                            ]
                        }
                    },
                    'technical': {
                        title: 'Technical Safeguards',
                        icon: '??',
                        standards: 5,
                        implementations: 18,
                        nacRelevance: 98,
                        requirements: [
                            'Access control',
                            'Audit logs',
                            'Integrity',
                            'Transmission security',
                            'Encryption'
                        ],
                        nacControls: [
                            'Unique user identification',
                            'Automatic logoff',
                            'Encryption and decryption',
                            'Audit logs',
                            'Integrity controls',
                            'Transmission security',
                            'Access termination procedures',
                            'ePHI access tracking'
                        ],
                        portnoxImplementation: {
                            coverage: 96,
                            automation: 93,
                            features: [
                                'Multi-factor authentication',
                                'Session timeout enforcement',
                                'Encryption verification',
                                'Comprehensive audit trails',
                                'Data integrity monitoring',
                                'Secure communications',
                                'Automated de-provisioning',
                                'PHI access monitoring'
                            ]
                        }
                    }
                },
                
                breachNotification: {
                    timeframe: '60 days',
                    requirements: ['Risk assessment', 'Individual notification', 'Media notification', 'HHS notification'],
                    nacSupport: 'Automated breach detection and reporting capabilities'
                }
            },
            
            'gdpr': {
                name: 'GDPR',
                fullName: 'General Data Protection Regulation',
                version: 'Current',
                icon: '????',
                color: '#3498db',
                description: 'EU data protection and privacy regulation',
                applicability: 'Organizations processing EU resident data',
                maturityLevels: ['Non-compliant', 'Basic', 'Substantial', 'Comprehensive'],
                lastUpdated: '2018',
                
                principles: {
                    'lawfulness': {
                        title: 'Lawfulness, fairness and transparency',
                        articles: ['5', '6', '7', '8', '9'],
                        nacRelevance: 85,
                        requirements: [
                            'Legal basis for processing',
                            'Consent management',
                            'Transparent processing',
                            'Fair processing',
                            'Purpose limitation'
                        ],
                        nacControls: [
                            'Consent management systems',
                            'Purpose limitation enforcement',
                            'Transparent access policies',
                            'Processing activity records',
                            'Legal basis documentation'
                        ],
                        portnoxImplementation: {
                            coverage: 88,
                            automation: 82,
                            features: [
                                'Consent tracking',
                                'Purpose-based access',
                                'Transparency reports',
                                'Processing logs',
                                'Legal basis validation'
                            ]
                        }
                    },
                    'minimization': {
                        title: 'Data minimization',
                        articles: ['5'],
                        nacRelevance: 90,
                        requirements: [
                            'Adequate data collection',
                            'Relevant data only',
                            'Limited to purpose',
                            'Data inventory',
                            'Retention policies'
                        ],
                        nacControls: [
                            'Least privilege access',
                            'Need-to-know enforcement',
                            'Data access restrictions',
                            'Retention policy enforcement',
                            'Data inventory management'
                        ],
                        portnoxImplementation: {
                            coverage: 92,
                            automation: 88,
                            features: [
                                'Granular access control',
                                'Data classification',
                                'Automated retention',
                                'Access justification',
                                'Data flow mapping'
                            ]
                        }
                    },
                    'accuracy': {
                        title: 'Accuracy',
                        articles: ['5'],
                        nacRelevance: 75,
                        requirements: [
                            'Data accuracy',
                            'Up-to-date information',
                            'Correction procedures',
                            'Verification processes'
                        ],
                        nacControls: [
                            'Data validation controls',
                            'Update procedures',
                            'Correction workflows',
                            'Accuracy verification'
                        ],
                        portnoxImplementation: {
                            coverage: 80,
                            automation: 72,
                            features: [
                                'Data validation rules',
                                'Update tracking',
                                'Correction audit trails',
                                'Verification workflows'
                            ]
                        }
                    },
                    'security': {
                        title: 'Integrity and confidentiality',
                        articles: ['5', '32', '33', '34'],
                        nacRelevance: 98,
                        requirements: [
                            'Appropriate security',
                            'Confidentiality',
                            'Integrity',
                            'Availability',
                            'Resilience',
                            'Breach notification'
                        ],
                        nacControls: [
                            'Encryption enforcement',
                            'Access control',
                            'Network security',
                            'Incident detection and response',
                            'Security monitoring',
                            'Breach procedures'
                        ],
                        portnoxImplementation: {
                            coverage: 96,
                            automation: 94,
                            features: [
                                'End-to-end encryption',
                                'Zero trust access',
                                'Continuous monitoring',
                                'Automated response',
                                'Breach detection',
                                'Incident workflows'
                            ]
                        }
                    },
                    'accountability': {
                        title: 'Accountability',
                        articles: ['5', '24', '25', '26', '27', '28'],
                        nacRelevance: 95,
                        requirements: [
                            'Demonstrate compliance',
                            'Records of processing',
                            'Data protection by design',
                            'Privacy by default',
                            'Controller responsibilities',
                            'Processor obligations'
                        ],
                        nacControls: [
                            'Audit logging',
                            'Compliance reporting',
                            'Data processing records',
                            'Access certification',
                            'Privacy controls',
                            'Vendor management'
                        ],
                        portnoxImplementation: {
                            coverage: 94,
                            automation: 90,
                            features: [
                                'Comprehensive audit trails',
                                'Automated reporting',
                                'Processing documentation',
                                'Certification workflows',
                                'Privacy by design',
                                'Vendor assessments'
                            ]
                        }
                    }
                },
                
                rights: {
                    'access': {
                        title: 'Right of access',
                        article: '15',
                        timeframe: '1 month',
                        nacSupport: 'Access logs and activity reports'
                    },
                    'rectification': {
                        title: 'Right to rectification',
                        article: '16',
                        timeframe: '1 month',
                        nacSupport: 'Update user attributes and access'
                    },
                    'erasure': {
                        title: 'Right to erasure',
                        article: '17',
                        timeframe: '1 month',
                        nacSupport: 'Remove user access and logs'
                    },
                    'portability': {
                        title: 'Data portability',
                        article: '20',
                        timeframe: '1 month',
                        nacSupport: 'Export access data'
                    },
                    'object': {
                        title: 'Right to object',
                        article: '21',
                        timeframe: 'Immediately',
                        nacSupport: 'Modify processing permissions'
                    }
                },
                
                penalties: {
                    maximum: '€20 million or 4% of global turnover',
                    factors: ['Nature of infringement', 'Intentional or negligent', 'Mitigation actions', 'Previous infringements'],
                    nacMitigation: 'Comprehensive compliance automation reduces penalty risk'
                }
            },
            
            'iso27001': {
                name: 'ISO 27001',
                fullName: 'ISO/IEC 27001:2022 Information Security Management',
                version: '2022',
                icon: '??',
                color: '#27ae60',
                description: 'International standard for information security management',
                applicability: 'All organizations',
                maturityLevels: ['Initial', 'Managed', 'Defined', 'Quantitatively Managed', 'Optimizing'],
                lastUpdated: '2022',
                
                clauses: {
                    'clause4': {
                        title: 'Context of the organization',
                        requirements: 4,
                        nacRelevance: 75,
                        focus: ['Understanding context', 'Stakeholder needs', 'ISMS scope', 'ISMS establishment']
                    },
                    'clause5': {
                        title: 'Leadership',
                        requirements: 3,
                        nacRelevance: 70,
                        focus: ['Leadership commitment', 'Policy', 'Roles and responsibilities']
                    },
                    'clause6': {
                        title: 'Planning',
                        requirements: 2,
                        nacRelevance: 80,
                        focus: ['Risk assessment', 'Risk treatment', 'Security objectives']
                    },
                    'clause7': {
                        title: 'Support',
                        requirements: 5,
                        nacRelevance: 85,
                        focus: ['Resources', 'Competence', 'Awareness', 'Communication', 'Documentation']
                    },
                    'clause8': {
                        title: 'Operation',
                        requirements: 3,
                        nacRelevance: 95,
                        focus: ['Operational planning', 'Risk assessment', 'Risk treatment']
                    },
                    'clause9': {
                        title: 'Performance evaluation',
                        requirements: 3,
                        nacRelevance: 90,
                        focus: ['Monitoring', 'Internal audit', 'Management review']
                    },
                    'clause10': {
                        title: 'Improvement',
                        requirements: 2,
                        nacRelevance: 85,
                        focus: ['Nonconformity', 'Continual improvement']
                    }
                },
                
                controls: {
                    'A5': {
                        title: 'Organizational controls',
                        controls: 37,
                        nacRelevance: 85,
                        categories: [
                            'Policies for information security',
                            'Information security roles',
                            'Segregation of duties',
                            'Management responsibilities',
                            'Contact with authorities',
                            'Contact with special interest groups',
                            'Threat intelligence',
                            'Information security in project management',
                            'Inventory of information'
                        ],
                        nacImplementation: {
                            coverage: 88,
                            examples: [
                                'Policy enforcement through NAC',
                                'Role-based access control',
                                'Automated segregation of duties',
                                'Threat intelligence integration',
                                'Asset inventory automation'
                            ]
                        }
                    },
                    'A6': {
                        title: 'People controls',
                        controls: 8,
                        nacRelevance: 82,
                        categories: [
                            'Screening',
                            'Terms and conditions',
                            'Information security awareness',
                            'Disciplinary process',
                            'Responsibilities after termination',
                            'Confidentiality agreements',
                            'Remote working',
                            'Information security event reporting'
                        ],
                        nacImplementation: {
                            coverage: 85,
                            examples: [
                                'Background check verification',
                                'Training compliance tracking',
                                'Remote access controls',
                                'Automated de-provisioning',
                                'Security awareness integration'
                            ]
                        }
                    },
                    'A7': {
                        title: 'Physical controls',
                        controls: 14,
                        nacRelevance: 70,
                        categories: [
                            'Physical security perimeters',
                            'Physical entry',
                            'Securing offices',
                            'Physical monitoring',
                            'Protection against threats',
                            'Working in secure areas',
                            'Clear desk and screen',
                            'Equipment siting',
                            'Security of assets off-premises'
                        ],
                        nacImplementation: {
                            coverage: 75,
                            examples: [
                                'Location-based access control',
                                'Physical access integration',
                                'Device location tracking',
                                'Screen lock enforcement',
                                'Asset tracking'
                            ]
                        }
                    },
                    'A8': {
                        title: 'Technological controls',
                        controls: 34,
                        nacRelevance: 96,
                        categories: [
                            'User endpoint devices',
                            'Privileged access rights',
                            'Information access restriction',
                            'Access control',
                            'Authentication',
                            'Capacity management',
                            'Protection against malware',
                            'Technical vulnerability management',
                            'Configuration management',
                            'Information deletion',
                            'Data masking',
                            'Data leakage prevention',
                            'Information backup',
                            'Redundancy',
                            'Logging and monitoring',
                            'Network security',
                            'Security of applications',
                            'Secure development',
                            'Security testing'
                        ],
                        nacImplementation: {
                            coverage: 95,
                            examples: [
                                'Endpoint compliance verification',
                                'Privileged access management',
                                'Dynamic access control',
                                'Multi-factor authentication',
                                'Anti-malware verification',
                                'Vulnerability scanning',
                                'Configuration compliance',
                                'Network segmentation',
                                'Application access control',
                                'Comprehensive logging'
                            ]
                        }
                    }
                },
                
                certification: {
                    process: ['Gap assessment', 'Implementation', 'Internal audit', 'Certification audit', 'Surveillance audits'],
                    timeline: '6-12 months',
                    validity: '3 years',
                    nacBenefits: 'Automated compliance evidence and continuous monitoring'
                }
            },
            
            'sox': {
                name: 'SOX',
                fullName: 'Sarbanes-Oxley Act',
                version: 'Current',
                icon: '??',
                color: '#9b59b6',
                description: 'US federal law for corporate financial reporting',
                applicability: 'Public companies in the US',
                maturityLevels: ['Ad-hoc', 'Repeatable', 'Defined', 'Managed', 'Optimized'],
                lastUpdated: '2002',
                
                sections: {
                    'section302': {
                        title: 'Corporate Responsibility',
                        requirements: [
                            'CEO/CFO certification',
                            'Internal controls establishment',
                            'Evaluation of controls',
                            'Disclosure of deficiencies',
                            'Fraud disclosure'
                        ],
                        nacControls: [
                            'Access certification',
                            'Segregation of duties',
                            'Audit trails',
                            'Change management',
                            'Periodic reviews'
                        ],
                        portnoxImplementation: {
                            coverage: 90,
                            automation: 85,
                            features: [
                                'Automated access reviews',
                                'SoD enforcement',
                                'Complete audit trails',
                                'Change tracking',
                                'Compliance dashboards'
                            ]
                        }
                    },
                    'section404': {
                        title: 'Internal Controls',
                        requirements: [
                            'Management assessment',
                            'Control documentation',
                            'Control testing',
                            'Auditor attestation',
                            'Material weakness disclosure'
                        ],
                        nacControls: [
                            'Access control documentation',
                            'Control testing evidence',
                            'Continuous monitoring',
                            'Automated compliance reporting',
                            'Control effectiveness metrics'
                        ],
                        portnoxImplementation: {
                            coverage: 92,
                            automation: 88,
                            features: [
                                'Control documentation',
                                'Automated testing',
                                'Real-time monitoring',
                                'Evidence collection',
                                'Effectiveness tracking'
                            ]
                        }
                    },
                    'section409': {
                        title: 'Real-time Disclosure',
                        requirements: [
                            'Rapid disclosure',
                            'Material changes',
                            'Financial condition',
                            'Operations changes'
                        ],
                        nacControls: [
                            'Real-time monitoring',
                            'Automated alerts',
                            'Change detection',
                            'Rapid reporting'
                        ],
                        portnoxImplementation: {
                            coverage: 88,
                            automation: 90,
                            features: [
                                'Real-time dashboards',
                                'Automated alerting',
                                'Change monitoring',
                                'Instant reporting'
                            ]
                        }
                    }
                },
                
                itgc: {
                    title: 'IT General Controls',
                    categories: [
                        'Access to programs and data',
                        'Program changes',
                        'Program development',
                        'Computer operations'
                    ],
                    nacRelevance: 95,
                    controls: [
                        'User access management',
                        'Privileged access',
                        'Change management',
                        'Segregation of duties',
                        'Security monitoring'
                    ]
                }
            },
            
            'cmmc': {
                name: 'CMMC',
                fullName: 'Cybersecurity Maturity Model Certification',
                version: '2.0',
                icon: '???',
                color: '#e67e22',
                description: 'US DoD cybersecurity standard for contractors',
                applicability: 'Defense Industrial Base',
                maturityLevels: ['Level 1 - Foundational', 'Level 2 - Advanced', 'Level 3 - Expert'],
                lastUpdated: '2024',
                
                levels: {
                    'level1': {
                        title: 'Foundational',
                        practices: 17,
                        focus: 'Federal Contract Information (FCI)',
                        requirements: 'Annual self-assessment',
                        nacControls: [
                            'Basic access control',
                            'User identification',
                            'Device identification',
                            'Information protection',
                            'System boundaries'
                        ],
                        portnoxImplementation: {
                            coverage: 98,
                            automation: 95,
                            features: [
                                'Automated access control',
                                'Device discovery',
                                'User authentication',
                                'Network boundaries',
                                'FCI protection'
                            ]
                        }
                    },
                    'level2': {
                        title: 'Advanced',
                        practices: 110,
                        focus: 'Controlled Unclassified Information (CUI)',
                        requirements: 'Third-party assessment',
                        nacControls: [
                            'Multi-factor authentication',
                            'Least privilege',
                            'Secure configurations',
                            'Audit logging',
                            'Incident response',
                            'Risk assessment',
                            'Security awareness',
                            'System monitoring'
                        ],
                        portnoxImplementation: {
                            coverage: 94,
                            automation: 90,
                            features: [
                                'Advanced MFA',
                                'Dynamic privileges',
                                'Configuration compliance',
                                'Comprehensive logging',
                                'Automated response',
                                'Risk scoring',
                                'Training tracking',
                                'Continuous monitoring'
                            ]
                        }
                    },
                    'level3': {
                        title: 'Expert',
                        practices: 130,
                        focus: 'Advanced Persistent Threats',
                        requirements: 'Government assessment',
                        nacControls: [
                            'Advanced threat protection',
                            'Behavioral analytics',
                            'Enhanced monitoring',
                            'Proactive threat hunting',
                            'Advanced incident response',
                            'Supply chain security',
                            'Enhanced access controls',
                            'Advanced authentication'
                        ],
                        portnoxImplementation: {
                            coverage: 91,
                            automation: 87,
                            features: [
                                'AI threat detection',
                                'User behavior analytics',
                                'Advanced monitoring',
                                'Threat intelligence',
                                'Automated hunting',
                                'Vendor risk management',
                                'Zero trust architecture',
                                'Biometric authentication'
                            ]
                        }
                    }
                },
                
                domains: {
                    'AC': { name: 'Access Control', practices: 22 },
                    'AT': { name: 'Awareness and Training', practices: 5 },
                    'AU': { name: 'Audit and Accountability', practices: 16 },
                    'CA': { name: 'Configuration Management', practices: 9 },
                    'IA': { name: 'Identification and Authentication', practices: 11 },
                    'IR': { name: 'Incident Response', practices: 10 },
                    'MA': { name: 'Maintenance', practices: 6 },
                    'MP': { name: 'Media Protection', practices: 8 },
                    'PE': { name: 'Physical Protection', practices: 17 },
                    'PS': { name: 'Personnel Security', practices: 7 },
                    'RA': { name: 'Risk Assessment', practices: 8 },
                    'SC': { name: 'System Communications', practices: 16 },
                    'SI': { name: 'System Information Integrity', practices: 8 },
                    'SR': { name: 'Supply Chain Risk Management', practices: 8 }
                }
            },
            
            'nerc-cip': {
                name: 'NERC CIP',
                fullName: 'North American Electric Reliability Corporation Critical Infrastructure Protection',
                version: 'Version 7',
                icon: '?',
                color: '#f39c12',
                description: 'Cybersecurity standards for bulk electric systems',
                applicability: 'Electric utilities and grid operators',
                maturityLevels: ['Low Impact', 'Medium Impact', 'High Impact'],
                lastUpdated: '2024',
                
                standards: {
                    'CIP-002': {
                        title: 'BES Cyber System Categorization',
                        requirements: 2,
                        focus: 'Identify and categorize BES Cyber Systems',
                        nacRelevance: 85
                    },
                    'CIP-003': {
                        title: 'Security Management Controls',
                        requirements: 7,
                        focus: 'Security policies and access controls',
                        nacRelevance: 90
                    },
                    'CIP-004': {
                        title: 'Personnel & Training',
                        requirements: 6,
                        focus: 'Personnel risk assessment and training',
                        nacRelevance: 88,
                        nacControls: [
                            'Personnel risk assessment',
                            'Training verification',
                            'Access management',
                            'Quarterly reviews',
                            'Access revocation'
                        ],
                        portnoxImplementation: {
                            coverage: 90,
                            automation: 85,
                            features: [
                                'Background check tracking',
                                'Training compliance',
                                'Role-based access',
                                'Automated reviews',
                                'Instant revocation'
                            ]
                        }
                    },
                    'CIP-005': {
                        title: 'Electronic Security Perimeters',
                        requirements: 3,
                        focus: 'ESP identification and access points',
                        nacRelevance: 98,
                        nacControls: [
                            'Electronic access points',
                            'Perimeter monitoring',
                            'Access control',
                            'Remote access management',
                            'Vendor access'
                        ],
                        portnoxImplementation: {
                            coverage: 96,
                            automation: 92,
                            features: [
                                'ESP enforcement',
                                'Real-time monitoring',
                                'Granular access control',
                                'Secure remote access',
                                'Vendor management'
                            ]
                        }
                    },
                    'CIP-006': {
                        title: 'Physical Security',
                        requirements: 3,
                        focus: 'Physical access controls',
                        nacRelevance: 75
                    },
                    'CIP-007': {
                        title: 'System Security Management',
                        requirements: 5,
                        focus: 'System hardening and monitoring',
                        nacRelevance: 95,
                        nacControls: [
                            'Security patches',
                            'Malware prevention',
                            'Security event monitoring',
                            'System access control',
                            'Authentication management'
                        ],
                        portnoxImplementation: {
                            coverage: 93,
                            automation: 88,
                            features: [
                                'Patch verification',
                                'Anti-malware checking',
                                'Event monitoring',
                                'Access enforcement',
                                'Strong authentication'
                            ]
                        }
                    },
                    'CIP-008': {
                        title: 'Incident Reporting and Response',
                        requirements: 3,
                        focus: 'Incident response planning',
                        nacRelevance: 85
                    },
                    'CIP-009': {
                        title: 'Recovery Plans',
                        requirements: 3,
                        focus: 'BES Cyber System recovery',
                        nacRelevance: 80
                    },
                    'CIP-010': {
                        title: 'Configuration Management',
                        requirements: 4,
                        focus: 'Configuration change management',
                        nacRelevance: 92
                    },
                    'CIP-011': {
                        title: 'Information Protection',
                        requirements: 2,
                        focus: 'BES Cyber System Information protection',
                        nacRelevance: 88
                    },
                    'CIP-013': {
                        title: 'Supply Chain Risk Management',
                        requirements: 3,
                        focus: 'Vendor risk management',
                        nacRelevance: 85
                    }
                }
            },
            
            'ferpa': {
                name: 'FERPA',
                fullName: 'Family Educational Rights and Privacy Act',
                version: 'Current',
                icon: '??',
                color: '#f39c12',
                description: 'US education records privacy law',
                applicability: 'Educational institutions',
                maturityLevels: ['Basic', 'Developing', 'Mature', 'Advanced'],
                lastUpdated: '2023',
                
                requirements: {
                    'consent': {
                        title: 'Consent Requirements',
                        focus: 'Written consent for disclosure',
                        nacControls: [
                            'Consent tracking',
                            'Access approval',
                            'Disclosure logging',
                            'Parent/student access'
                        ]
                    },
                    'directory': {
                        title: 'Directory Information',
                        focus: 'Public information management',
                        nacControls: [
                            'Information classification',
                            'Opt-out management',
                            'Access controls',
                            'Publication controls'
                        ]
                    },
                    'access': {
                        title: 'Access Rights',
                        focus: 'Parent and eligible student access',
                        nacControls: [
                            'Identity verification',
                            'Access logging',
                            'Record access',
                            'Amendment procedures'
                        ]
                    },
                    'security': {
                        title: 'Security Requirements',
                        focus: 'Reasonable security measures',
                        nacControls: [
                            'Access control',
                            'Encryption',
                            'Audit trails',
                            'Incident response'
                        ]
                    }
                },
                
                portnoxImplementation: {
                    coverage: 92,
                    automation: 88,
                    features: [
                        'Role-based access for faculty/staff',
                        'Student record protection',
                        'Parent access management',
                        'Consent workflow automation',
                        'Comprehensive audit trails',
                        'Directory information controls'
                    ]
                }
            },
            
            'glba': {
                name: 'GLBA',
                fullName: 'Gramm-Leach-Bliley Act',
                version: 'Current',
                icon: '??',
                color: '#3498db',
                description: 'US financial privacy and security law',
                applicability: 'Financial institutions',
                maturityLevels: ['Non-compliant', 'Basic', 'Managed', 'Optimized'],
                lastUpdated: '2023',
                
                rules: {
                    'privacy': {
                        title: 'Privacy Rule',
                        requirements: [
                            'Privacy notices',
                            'Opt-out procedures',
                            'Information sharing limits',
                            'Customer consent'
                        ],
                        nacControls: [
                            'Access restrictions',
                            'Consent management',
                            'Sharing controls',
                            'Privacy enforcement'
                        ]
                    },
                    'safeguards': {
                        title: 'Safeguards Rule',
                        requirements: [
                            'Written security plan',
                            'Risk assessment',
                            'Employee training',
                            'Service provider oversight',
                            'Program monitoring'
                        ],
                        nacControls: [
                            'Access control',
                            'Risk assessment',
                            'Training tracking',
                            'Vendor management',
                            'Continuous monitoring'
                        ],
                        portnoxImplementation: {
                            coverage: 93,
                            automation: 89,
                            features: [
                                'Comprehensive access control',
                                'Automated risk scoring',
                                'Training compliance',
                                'Vendor access management',
                                'Real-time monitoring'
                            ]
                        }
                    },
                    'pretexting': {
                        title: 'Pretexting Protection',
                        requirements: [
                            'Customer authentication',
                            'Access restrictions',
                            'Fraud prevention',
                            'Incident response'
                        ],
                        nacControls: [
                            'Strong authentication',
                            'Access verification',
                            'Anomaly detection',
                            'Incident workflows'
                        ]
                    }
                }
            },
            
            'hitrust': {
                name: 'HITRUST CSF',
                fullName: 'Health Information Trust Alliance Common Security Framework',
                version: '11.2',
                icon: '??',
                color: '#2ecc71',
                description: 'Healthcare industry security framework',
                applicability: 'Healthcare organizations',
                maturityLevels: ['Basic', 'Managed', 'Optimized'],
                lastUpdated: '2024',
                
                domains: {
                    'access': {
                        title: 'Access Control',
                        controls: 156,
                        nacRelevance: 96,
                        categories: [
                            'User access management',
                            'User responsibilities',
                            'Network access control',
                            'Application access control',
                            'Mobile device access'
                        ]
                    },
                    'awareness': {
                        title: 'Awareness & Training',
                        controls: 42,
                        nacRelevance: 78,
                        categories: [
                            'Security awareness',
                            'Training programs',
                            'Competency verification'
                        ]
                    },
                    'audit': {
                        title: 'Audit Logging & Monitoring',
                        controls: 68,
                        nacRelevance: 92,
                        categories: [
                            'Audit logging',
                            'Monitoring',
                            'Log protection',
                            'Clock synchronization'
                        ]
                    },
                    'certification': {
                        title: 'Certification & Accreditation',
                        controls: 35,
                        nacRelevance: 85,
                        categories: [
                            'Risk assessment',
                            'Security authorization',
                            'Continuous monitoring'
                        ]
                    }
                },
                
                implementation: {
                    levels: {
                        '1': 'Policy',
                        '2': 'Procedure',
                        '3': 'Implementation',
                        '4': 'Testing',
                        '5': 'Integration'
                    },
                    scoring: 'Maturity-based scoring model',
                    certification: '2-year validity with interim assessment'
                }
            },
            
            'cis': {
                name: 'CIS Controls',
                fullName: 'Center for Internet Security Critical Security Controls',
                version: 'v8',
                icon: '??',
                color: '#34495e',
                description: 'Prioritized cybersecurity best practices',
                applicability: 'All organizations',
                maturityLevels: ['IG1 - Essential', 'IG2 - Enhanced', 'IG3 - Expert'],
                lastUpdated: '2023',
                
                controls: {
                    'control1': {
                        title: 'Inventory and Control of Enterprise Assets',
                        safeguards: 6,
                        nacRelevance: 98,
                        ig1: 4,
                        ig2: 5,
                        ig3: 6,
                        nacImplementation: [
                            'Automated asset discovery',
                            'Hardware inventory',
                            'Software inventory',
                            'Unauthorized asset detection',
                            'Asset information updates',
                            'Address unauthorized assets'
                        ]
                    },
                    'control2': {
                        title: 'Inventory and Control of Software Assets',
                        safeguards: 7,
                        nacRelevance: 85,
                        ig1: 4,
                        ig2: 6,
                        ig3: 7
                    },
                    'control3': {
                        title: 'Data Protection',
                        safeguards: 14,
                        nacRelevance: 82,
                        ig1: 6,
                        ig2: 11,
                        ig3: 14
                    },
                    'control4': {
                        title: 'Secure Configuration of Enterprise Assets',
                        safeguards: 12,
                        nacRelevance: 90,
                        ig1: 4,
                        ig2: 10,
                        ig3: 12
                    },
                    'control5': {
                        title: 'Account Management',
                        safeguards: 6,
                        nacRelevance: 95,
                        ig1: 4,
                        ig2: 5,
                        ig3: 6
                    },
                    'control6': {
                        title: 'Access Control Management',
                        safeguards: 8,
                        nacRelevance: 98,
                        ig1: 4,
                        ig2: 7,
                        ig3: 8
                    },
                    'control7': {
                        title: 'Continuous Vulnerability Management',
                        safeguards: 7,
                        nacRelevance: 88,
                        ig1: 4,
                        ig2: 6,
                        ig3: 7
                    },
                    'control8': {
                        title: 'Audit Log Management',
                        safeguards: 13,
                        nacRelevance: 92,
                        ig1: 3,
                        ig2: 8,
                        ig3: 13
                    },
                    'control9': {
                        title: 'Email and Web Browser Protections',
                        safeguards: 7,
                        nacRelevance: 75,
                        ig1: 2,
                        ig2: 5,
                        ig3: 7
                    },
                    'control10': {
                        title: 'Malware Defenses',
                        safeguards: 7,
                        nacRelevance: 85,
                        ig1: 2,
                        ig2: 5,
                        ig3: 7
                    },
                    'control11': {
                        title: 'Data Recovery',
                        safeguards: 5,
                        nacRelevance: 78,
                        ig1: 4,
                        ig2: 4,
                        ig3: 5
                    },
                    'control12': {
                        title: 'Network Infrastructure Management',
                        safeguards: 8,
                        nacRelevance: 94,
                        ig1: 2,
                        ig2: 6,
                        ig3: 8
                    },
                    'control13': {
                        title: 'Network Monitoring and Defense',
                        safeguards: 11,
                        nacRelevance: 96,
                        ig1: 0,
                        ig2: 5,
                        ig3: 11
                    },
                    'control14': {
                        title: 'Security Awareness and Skills Training',
                        safeguards: 9,
                        nacRelevance: 80,
                        ig1: 4,
                        ig2: 7,
                        ig3: 9
                    },
                    'control15': {
                        title: 'Service Provider Management',
                        safeguards: 7,
                        nacRelevance: 86,
                        ig1: 4,
                        ig2: 5,
                        ig3: 7
                    },
                    'control16': {
                        title: 'Application Software Security',
                        safeguards: 14,
                        nacRelevance: 88,
                        ig1: 3,
                        ig2: 9,
                        ig3: 14
                    },
                    'control17': {
                        title: 'Incident Response Management',
                        safeguards: 9,
                        nacRelevance: 90,
                        ig1: 3,
                        ig2: 4,
                        ig3: 9
                    },
                    'control18': {
                        title: 'Penetration Testing',
                        safeguards: 5,
                        nacRelevance: 75,
                        ig1: 0,
                        ig2: 2,
                        ig3: 5
                    }
                },
                
                portnoxImplementation: {
                    ig1Coverage: 95,
                    ig2Coverage: 92,
                    ig3Coverage: 88,
                    keyFeatures: [
                        'Automated asset discovery and inventory',
                        'Continuous configuration monitoring',
                        'Real-time access control',
                        'Comprehensive audit logging',
                        'Network segmentation enforcement',
                        'Vulnerability assessment integration'
                    ]
                }
            }
        };
    }
    
    initializeSecurityControls() {
        return {
            'access-control': {
                name: 'Access Control',
                icon: '??',
                description: 'Limit information system access to authorized users, processes, and devices',
                objectives: [
                    'Ensure only authorized users can access resources',
                    'Implement least privilege principle',
                    'Monitor and control access continuously',
                    'Prevent unauthorized access attempts'
                ],
                nacImplementation: {
                    'portnox': {
                        implementation: 'Cloud-based zero trust with continuous verification and risk-based access',
                        effectiveness: 98,
                        automation: 95,
                        features: [
                            'Conditional access policies',
                            'Risk-based authentication',
                            'Real-time policy enforcement',
                            'Dynamic privilege adjustment',
                            'Session monitoring',
                            'Behavioral analytics'
                        ],
                        differentiators: [
                            'No infrastructure required',
                            'Application-level access control',
                            'AI-powered risk assessment',
                            'Cross-platform support'
                        ]
                    },
                    'cisco': {
                        implementation: 'Policy-based access control with ISE using 802.1X and MAB',
                        effectiveness: 85,
                        automation: 60,
                        features: [
                            '802.1X authentication',
                            'MAC Authentication Bypass',
                            'Web authentication',
                            'Guest portal',
                            'Posture assessment',
                            'TrustSec integration'
                        ],
                        limitations: [
                            'Complex deployment',
                            'Hardware dependencies',
                            'Limited cloud integration',
                            'Manual policy management'
                        ]
                    },
                    'generic': {
                        implementation: 'Basic network access control with standard authentication',
                        effectiveness: 70,
                        automation: 40,
                        features: [
                            'Standard authentication',
                            'Static policies',
                            'Basic monitoring',
                            'Manual enforcement'
                        ]
                    }
                },
                complianceMapping: {
                    'nist-csf': ['PR.AC-1', 'PR.AC-3', 'PR.AC-4', 'PR.AC-5'],
                    'pci-dss': ['7.1', '7.2', '8.1', '8.2', '8.3'],
                    'hipaa': ['164.308(a)(4)', '164.312(a)(1)'],
                    'iso27001': ['A.9.1', 'A.9.2', 'A.9.3', 'A.9.4']
                },
                metrics: {
                    'unauthorized-access-attempts': {
                        baseline: 1000,
                        withNac: 50,
                        reduction: '95%'
                    },
                    'time-to-detect': {
                        baseline: '4 hours',
                        withNac: '< 1 minute',
                        improvement: '99.6%'
                    },
                    'false-positives': {
                        baseline: '15%',
                        withNac: '2%',
                        improvement: '87%'
                    }
                }
            },
            
            'device-visibility': {
                name: 'Asset Visibility & Inventory',
                icon: '???',
                description: 'Maintain accurate inventory of all network-connected devices and their security posture',
                objectives: [
                    'Discover all connected devices',
                    'Classify and profile devices',
                    'Track device lifecycle',
                    'Identify unauthorized devices'
                ],
                nacImplementation: {
                    'portnox': {
                        implementation: 'Agentless discovery with AI-powered profiling and continuous monitoring',
                        effectiveness: 96,
                        automation: 98,
                        features: [
                            'Real-time discovery',
                            'AI device classification',
                            'Automated profiling',
                            'Risk scoring',
                            'Vendor identification',
                            'IoT fingerprinting'
                        ],
                        differentiators: [
                            'No agents required',
                            'ML-based classification',
                            'Cloud-based intelligence',
                            'Instant discovery'
                        ]
                    },
                    'cisco': {
                        implementation: 'Device profiling with manual classification and periodic scanning',
                        effectiveness: 80,
                        automation: 55,
                        features: [
                            'DHCP fingerprinting',
                            'NMAP scanning',
                            'HTTP profiling',
                            'RADIUS probes',
                            'Manual classification',
                            'Profiler policies'
                        ],
                        limitations: [
                            'Requires manual tuning',
                            'Limited IoT support',
                            'Delayed discovery',
                            'Complex configuration'
                        ]
                    },
                    'forescout': {
                        implementation: 'Agentless discovery with passive and active scanning',
                        effectiveness: 88,
                        automation: 75,
                        features: [
                            'Passive monitoring',
                            'Active scanning',
                            'Device classification',
                            'OS fingerprinting',
                            'Application discovery',
                            'Network mapping'
                        ]
                    }
                },
                complianceMapping: {
                    'nist-csf': ['ID.AM-1', 'ID.AM-2', 'ID.AM-3', 'ID.AM-4'],
                    'cis': ['1.1', '1.2', '1.3', '1.4'],
                    'cmmc': ['AM.1.001', 'AM.1.002', 'AM.1.003'],
                    'iso27001': ['A.8.1', 'A.8.2', 'A.8.3']
                },
                metrics: {
                    'unknown-devices': {
                        baseline: '25%',
                        withNac: '0%',
                        reduction: '100%'
                    },
                    'discovery-time': {
                        baseline: '48 hours',
                        withNac: '< 30 seconds',
                        improvement: '99.9%'
                    },
                    'classification-accuracy': {
                        baseline: '60%',
                        withNac: '95%',
                        improvement: '58%'
                    }
                }
            },
            
            'network-segmentation': {
                name: 'Network Segmentation & Microsegmentation',
                icon: '??',
                description: 'Isolate network segments based on risk, function, and compliance requirements',
                objectives: [
                    'Implement zero trust segmentation',
                    'Isolate critical assets',
                    'Prevent lateral movement',
                    'Enforce compliance boundaries'
                ],
                nacImplementation: {
                    'portnox': {
                        implementation: 'Dynamic microsegmentation with zero trust policies and real-time enforcement',
                        effectiveness: 95,
                        automation: 93,
                        features: [
                            'User-based segmentation',
                            'Device-based segmentation',
                            'Application-aware policies',
                            'Dynamic VLAN assignment',
                            'Cloud workload protection',
                            'East-west traffic control'
                        ],
                        differentiators: [
                            'No network changes required',
                            'Application-layer segmentation',
                            'Cloud-native approach',
                            'Instant policy updates'
                        ]
                    },
                    'cisco': {
                        implementation: 'VLAN-based segmentation with TrustSec and SGT tagging',
                        effectiveness: 82,
                        automation: 65,
                        features: [
                            'Static VLANs',
                            'SGT tagging',
                            'TrustSec policies',
                            'SDA integration',
                            'ACL enforcement',
                            'SGACL policies'
                        ],
                        limitations: [
                            'Network redesign required',
                            'Hardware dependencies',
                            'Complex management',
                            'Limited flexibility'
                        ]
                    }
                },
                complianceMapping: {
                    'pci-dss': ['1.1', '1.2', '1.3'],
                    'nerc-cip': ['CIP-005-6'],
                    'nist-csf': ['PR.AC-5', 'PR.PT-4'],
                    'zero-trust': ['Never trust, always verify']
                },
                metrics: {
                    'lateral-movement': {
                        baseline: '85% possible',
                        withNac: '3% possible',
                        reduction: '96%'
                    },
                    'breach-containment': {
                        baseline: '4 hours',
                        withNac: '5 minutes',
                        improvement: '98.8%'
                    },
                    'policy-deployment': {
                        baseline: '2 weeks',
                        withNac: 'Instant',
                        improvement: '99.9%'
                    }
                }
            },
            
            'continuous-monitoring': {
                name: 'Continuous Monitoring & Analytics',
                icon: '??',
                description: 'Monitor and analyze security events, user behavior, and compliance in real-time',
                objectives: [
                    'Real-time threat detection',
                    'Behavioral analytics',
                    'Compliance monitoring',
                    'Anomaly detection'
                ],
                nacImplementation: {
                    'portnox': {
                        implementation: 'AI-driven continuous monitoring with predictive analytics and automated insights',
                        effectiveness: 94,
                        automation: 91,
                        features: [
                            'Real-time analytics',
                            'ML-based anomaly detection',
                            'Behavioral baselines',
                            'Risk scoring engine',
                            'Predictive analytics',
                            'Custom dashboards'
                        ],
                        differentiators: [
                            'AI-powered insights',
                            'Predictive capabilities',
                            'Cloud-scale processing',
                            'Zero false positives'
                        ]
                    },
                    'cisco': {
                        implementation: 'Event monitoring with manual analysis and basic reporting',
                        effectiveness: 75,
                        automation: 45,
                        features: [
                            'Log collection',
                            'Basic alerting',
                            'Manual investigation',
                            'Static reports',
                            'Event correlation',
                            'ISE-PIC integration'
                        ],
                        limitations: [
                            'Reactive approach',
                            'High false positives',
                            'Manual correlation',
                            'Limited analytics'
                        ]
                    }
                },
                complianceMapping: {
                    'nist-csf': ['DE.AE-1', 'DE.CM-1', 'DE.CM-3', 'DE.CM-7'],
                    'sox': ['Section 404 monitoring'],
                    'pci-dss': ['10.1', '10.2', '10.3'],
                    'hipaa': ['164.308(a)(1)(ii)(D)']
                },
                metrics: {
                    'threat-detection-time': {
                        baseline: '200 days',
                        withNac: '< 1 minute',
                        improvement: '99.9%'
                    },
                    'false-positive-rate': {
                        baseline: '40%',
                        withNac: '2%',
                        improvement: '95%'
                    },
                    'compliance-visibility': {
                        baseline: '20%',
                        withNac: '100%',
                        improvement: '400%'
                    }
                }
            },
            
            'incident-response': {
                name: 'Automated Incident Response',
                icon: '?',
                description: 'Detect, respond to, and recover from security incidents with automated workflows',
                objectives: [
                    'Rapid threat containment',
                    'Automated remediation',
                    'Forensic data collection',
                    'Recovery procedures'
                ],
                nacImplementation: {
                    'portnox': {
                        implementation: 'Automated response with self-healing capabilities and AI-driven remediation',
                        effectiveness: 92,
                        automation: 90,
                        features: [
                            'Auto-quarantine',
                            'Policy-based response',
                            'Self-healing networks',
                            'Automated workflows',
                            'Forensic collection',
                            'Integration with SOAR'
                        ],
                        differentiators: [
                            'Zero human intervention',
                            'AI-driven decisions',
                            'Instant remediation',
                            'Self-documenting'
                        ]
                    },
                    'cisco': {
                        implementation: 'Manual response with Change of Authorization (CoA) support',
                        effectiveness: 70,
                        automation: 35,
                        features: [
                            'Manual quarantine',
                            'CoA support',
                            'Basic remediation',
                            'pxGrid integration',
                            'Manual workflows',
                            'Limited automation'
                        ],
                        limitations: [
                            'Slow response time',
                            'Manual processes',
                            'Limited integration',
                            'No self-healing'
                        ]
                    }
                },
                complianceMapping: {
                    'nist-csf': ['RS.RP-1', 'RS.CO-1', 'RS.AN-1', 'RS.MI-1'],
                    'iso27001': ['A.16.1'],
                    'pci-dss': ['12.10'],
                    'cmmc': ['IR.2.092', 'IR.2.093']
                },
                metrics: {
                    'mttr': {
                        baseline: '23 days',
                        withNac: '30 minutes',
                        improvement: '99.9%'
                    },
                    'containment-time': {
                        baseline: '4 hours',
                        withNac: '< 1 minute',
                        improvement: '99.6%'
                    },
                    'automation-rate': {
                        baseline: '10%',
                        withNac: '95%',
                        improvement: '850%'
                    }
                }
            },
            
            'zero-trust': {
                name: 'Zero Trust Architecture',
                icon: '??',
                description: 'Implement comprehensive zero trust principles across the network',
                objectives: [
                    'Never trust, always verify',
                    'Assume breach mindset',
                    'Verify explicitly',
                    'Least privilege access'
                ],
                nacImplementation: {
                    'portnox': {
                        implementation: 'Native zero trust architecture with continuous verification',
                        effectiveness: 95,
                        automation: 94,
                        features: [
                            'Continuous verification',
                            'Risk-based access',
                            'Microsegmentation',
                            'Identity-centric security',
                            'Context-aware policies',
                            'Encrypted communications'
                        ],
                        differentiators: [
                            'Built for zero trust',
                            'No implicit trust',
                            'Continuous adaptation',
                            'Cloud-native design'
                        ]
                    },
                    'traditional': {
                        implementation: 'Perimeter-based security with limited zero trust capabilities',
                        effectiveness: 50,
                        automation: 30,
                        features: [
                            'Perimeter defense',
                            'Static trust zones',
                            'Limited verification',
                            'Network-centric',
                            'Implicit trust',
                            'Binary decisions'
                        ],
                        limitations: [
                            'Castle-and-moat model',
                            'Implicit trust issues',
                            'Limited visibility',
                            'Static policies'
                        ]
                    }
                },
                complianceMapping: {
                    'nist': ['SP 800-207'],
                    'dod': ['Zero Trust Reference Architecture'],
                    'cisa': ['Zero Trust Maturity Model'],
                    'executive-order': ['EO 14028']
                },
                metrics: {
                    'trust-assumptions': {
                        baseline: '80%',
                        withNac: '0%',
                        reduction: '100%'
                    },
                    'verification-frequency': {
                        baseline: 'Once at login',
                        withNac: 'Continuous',
                        improvement: 'Infinite'
                    },
                    'attack-surface': {
                        baseline: '100%',
                        withNac: '5%',
                        reduction: '95%'
                    }
                }
            }
        };
    }
    
    initializeMitreAttackMapping() {
        return {
            'initial-access': {
                name: 'Initial Access',
                id: 'TA0001',
                icon: '??',
                description: 'Techniques used to gain initial foothold',
                techniques: {
                    'T1078': {
                        name: 'Valid Accounts',
                        description: 'Adversaries may steal credentials of specific user accounts',
                        nacMitigation: {
                            effectiveness: 95,
                            controls: [
                                'Multi-factor authentication',
                                'Continuous verification',
                                'Risk-based authentication',
                                'Behavioral analytics',
                                'Privileged access management'
                            ],
                            portnoxFeatures: [
                                'Advanced MFA with biometrics',
                                'Continuous risk assessment',
                                'AI-powered anomaly detection',
                                'Certificate-based authentication',
                                'Zero trust verification'
                            ]
                        }
                    },
                    'T1133': {
                        name: 'External Remote Services',
                        description: 'Adversaries may leverage external-facing remote services',
                        nacMitigation: {
                            effectiveness: 92,
                            controls: [
                                'VPN replacement with ZTNA',
                                'Device trust verification',
                                'Location-based access',
                                'Encrypted tunnels',
                                'Session monitoring'
                            ]
                        }
                    },
                    'T1566': {
                        name: 'Phishing',
                        description: 'Adversaries may send phishing messages',
                        nacMitigation: {
                            effectiveness: 85,
                            controls: [
                                'Device health verification',
                                'Application control',
                                'User training tracking',
                                'Email security integration',
                                'Endpoint compliance'
                            ]
                        }
                    },
                    'T1199': {
                        name: 'Trusted Relationship',
                        description: 'Adversaries may breach third-party infrastructure',
                        nacMitigation: {
                            effectiveness: 90,
                            controls: [
                                'Vendor access management',
                                'Third-party risk assessment',
                                'Temporary access controls',
                                'Activity monitoring',
                                'Least privilege enforcement'
                            ]
                        }
                    }
                }
            },
            
            'execution': {
                name: 'Execution',
                id: 'TA0002',
                icon: '??',
                description: 'Techniques used to run malicious code',
                techniques: {
                    'T1059': {
                        name: 'Command and Scripting Interpreter',
                        description: 'Adversaries may abuse command and script interpreters',
                        nacMitigation: {
                            effectiveness: 80,
                            controls: [
                                'Application whitelisting verification',
                                'Script execution monitoring',
                                'Endpoint compliance checking',
                                'Behavioral analysis',
                                'Process monitoring'
                            ]
                        }
                    }
                }
            },
            
            'persistence': {
                name: 'Persistence',
                id: 'TA0003',
                icon: '??',
                description: 'Techniques used to maintain foothold',
                techniques: {
                    'T1136': {
                        name: 'Create Account',
                        description: 'Adversaries may create accounts to maintain access',
                        nacMitigation: {
                            effectiveness: 93,
                            controls: [
                                'Account creation monitoring',
                                'Privileged account management',
                                'Automated account review',
                                'Anomaly detection',
                                'Approval workflows'
                            ]
                        }
                    },
                    'T1098': {
                        name: 'Account Manipulation',
                        description: 'Adversaries may manipulate accounts to maintain access',
                        nacMitigation: {
                            effectiveness: 91,
                            controls: [
                                'Permission change monitoring',
                                'Role modification alerts',
                                'Periodic access review',
                                'Audit trail analysis',
                                'Automated rollback'
                            ]
                        }
                    }
                }
            },
            
            'privilege-escalation': {
                name: 'Privilege Escalation',
                id: 'TA0004',
                icon: '??',
                description: 'Techniques used to gain higher-level permissions',
                techniques: {
                    'T1068': {
                        name: 'Exploitation for Privilege Escalation',
                        description: 'Adversaries may exploit vulnerabilities to elevate privileges',
                        nacMitigation: {
                            effectiveness: 87,
                            controls: [
                                'Vulnerability assessment integration',
                                'Patch compliance verification',
                                'Exploit detection',
                                'Privilege monitoring',
                                'Automated remediation'
                            ]
                        }
                    }
                }
            },
            
            'defense-evasion': {
                name: 'Defense Evasion',
                id: 'TA0005',
                icon: '??',
                description: 'Techniques used to avoid detection',
                techniques: {
                    'T1036': {
                        name: 'Masquerading',
                        description: 'Adversaries may attempt to manipulate features',
                        nacMitigation: {
                            effectiveness: 85,
                            controls: [
                                'File integrity monitoring',
                                'Process verification',
                                'Certificate validation',
                                'Behavioral analysis',
                                'Anomaly detection'
                            ]
                        }
                    }
                }
            },
            
            'credential-access': {
                name: 'Credential Access',
                id: 'TA0006',
                icon: '??',
                description: 'Techniques used to steal credentials',
                techniques: {
                    'T1110': {
                        name: 'Brute Force',
                        description: 'Adversaries may use brute force techniques',
                        nacMitigation: {
                            effectiveness: 96,
                            controls: [
                                'Account lockout policies',
                                'Failed attempt monitoring',
                                'Progressive delays',
                                'CAPTCHA integration',
                                'Automated blocking'
                            ]
                        }
                    },
                    'T1555': {
                        name: 'Credentials from Password Stores',
                        description: 'Adversaries may search for stored credentials',
                        nacMitigation: {
                            effectiveness: 88,
                            controls: [
                                'Credential vault integration',
                                'Certificate-based auth',
                                'Passwordless authentication',
                                'Secure storage verification',
                                'Access monitoring'
                            ]
                        }
                    }
                }
            },
            
            'discovery': {
                name: 'Discovery',
                id: 'TA0007',
                icon: '??',
                description: 'Techniques used to gain knowledge about the system',
                techniques: {
                    'T1018': {
                        name: 'Remote System Discovery',
                        description: 'Adversaries may attempt to get a listing of systems',
                        nacMitigation: {
                            effectiveness: 92,
                            controls: [
                                'Network scanning detection',
                                'Discovery attempt alerts',
                                'Honey tokens',
                                'Deception technology',
                                'Behavioral monitoring'
                            ]
                        }
                    },
                    'T1049': {
                        name: 'System Network Connections Discovery',
                        description: 'Adversaries may attempt to get network connections',
                        nacMitigation: {
                            effectiveness: 90,
                            controls: [
                                'Connection monitoring',
                                'Netstat detection',
                                'Anomalous queries',
                                'API monitoring',
                                'Automated response'
                            ]
                        }
                    }
                }
            },
            
            'lateral-movement': {
                name: 'Lateral Movement',
                id: 'TA0008',
                icon: '??',
                description: 'Techniques used to move through environment',
                techniques: {
                    'T1021': {
                        name: 'Remote Services',
                        description: 'Adversaries may use remote services to move laterally',
                        nacMitigation: {
                            effectiveness: 95,
                            controls: [
                                'Microsegmentation enforcement',
                                'East-west traffic control',
                                'Service access monitoring',
                                'Jump server requirements',
                                'Session recording'
                            ],
                            portnoxFeatures: [
                                'Dynamic microsegmentation',
                                'Zero trust policies',
                                'Real-time access decisions',
                                'Automated containment',
                                'Full session visibility'
                            ]
                        }
                    },
                    'T1534': {
                        name: 'Internal Spearphishing',
                        description: 'Adversaries may use internal spearphishing',
                        nacMitigation: {
                            effectiveness: 85,
                            controls: [
                                'Email behavior analysis',
                                'Internal traffic monitoring',
                                'User awareness tracking',
                                'Anomaly detection',
                                'Rapid containment'
                            ]
                        }
                    }
                }
            },
            
            'collection': {
                name: 'Collection',
                id: 'TA0009',
                icon: '??',
                description: 'Techniques used to gather data of interest',
                techniques: {
                    'T1039': {
                        name: 'Data from Network Shared Drive',
                        description: 'Adversaries may search network shares',
                        nacMitigation: {
                            effectiveness: 88,
                            controls: [
                                'File access monitoring',
                                'Unusual access patterns',
                                'Data classification enforcement',
                                'DLP integration',
                                'Access logging'
                            ]
                        }
                    }
                }
            },
            
            'exfiltration': {
                name: 'Exfiltration',
                id: 'TA0010',
                icon: '??',
                description: 'Techniques used to steal data',
                techniques: {
                    'T1041': {
                        name: 'Exfiltration Over C2 Channel',
                        description: 'Adversaries may steal data over command and control channel',
                        nacMitigation: {
                            effectiveness: 90,
                            controls: [
                                'Egress traffic monitoring',
                                'Data volume anomalies',
                                'Encrypted traffic inspection',
                                'Destination reputation',
                                'Automated blocking'
                            ]
                        }
                    },
                    'T1567': {
                        name: 'Exfiltration Over Web Service',
                        description: 'Adversaries may use web services for exfiltration',
                        nacMitigation: {
                            effectiveness: 87,
                            controls: [
                                'Cloud service monitoring',
                                'Upload detection',
                                'Service blocking',
                                'Data tagging',
                                'Policy enforcement'
                            ]
                        }
                    }
                }
            },
            
            'impact': {
                name: 'Impact',
                id: 'TA0040',
                icon: '??',
                description: 'Techniques used to disrupt availability or compromise integrity',
                techniques: {
                    'T1486': {
                        name: 'Data Encrypted for Impact',
                        description: 'Adversaries may encrypt data to interrupt availability',
                        nacMitigation: {
                            effectiveness: 92,
                            controls: [
                                'Ransomware detection',
                                'Encryption behavior monitoring',
                                'Rapid isolation',
                                'Backup verification',
                                'Recovery procedures'
                            ],
                            portnoxFeatures: [
                                'AI-based ransomware detection',
                                'Instant device quarantine',
                                'Automated backup triggers',
                                'Network isolation',
                                'Recovery orchestration'
                            ]
                        }
                    },
                    'T1489': {
                        name: 'Service Stop',
                        description: 'Adversaries may stop critical services',
                        nacMitigation: {
                            effectiveness: 85,
                            controls: [
                                'Service monitoring',
                                'Critical service protection',
                                'Automated restart',
                                'Access restrictions',
                                'Alert generation'
                            ]
                        }
                    }
                }
            }
        };
    }
    
    initializeNistCsfMapping() {
        // This is a continuation of the NIST CSF data with enhanced mapping
        return {
            version: '2.0',
            coreStructure: {
                functions: 6,
                categories: 23,
                subcategories: 108,
                informativeReferences: 'Multiple'
            },
            implementationTiers: {
                'tier1': {
                    name: 'Partial',
                    characteristics: [
                        'Risk management practices not formalized',
                        'Limited awareness of cybersecurity risk',
                        'Irregular implementation',
                        'Reactive approach'
                    ]
                },
                'tier2': {
                    name: 'Risk Informed',
                    characteristics: [
                        'Risk management practices approved by management',
                        'Organizational cybersecurity risk awareness',
                        'Regular but not consistent implementation',
                        'Some proactive elements'
                    ]
                },
                'tier3': {
                    name: 'Repeatable',
                    characteristics: [
                        'Formal risk management practices',
                        'Organization-wide approach',
                        'Consistent implementation',
                        'Proactive and adaptive'
                    ]
                },
                'tier4': {
                    name: 'Adaptive',
                    characteristics: [
                        'Risk management part of culture',
                        'Continuous improvement',
                        'Advanced cybersecurity technologies',
                        'Predictive indicators'
                    ]
                }
            },
            profiles: {
                'current': 'Where the organization is today',
                'target': 'Where the organization wants to be',
                'gap': 'Difference requiring action'
            }
        };
    }
    
    initializeNacFeatures() {
        return {
            'core-features': {
                'device-visibility': {
                    name: 'Device Visibility & Discovery',
                    category: 'Core',
                    icon: '???',
                    description: 'Discover and profile all connected devices in real-time',
                    businessValue: 'Complete visibility into network assets eliminates shadow IT',
                    technicalDetails: {
                        methods: ['Passive monitoring', 'Active probing', 'API integration', 'Agent-based', 'Flow analysis'],
                        protocols: ['DHCP', 'DNS', 'HTTP', 'SNMP', 'WMI', 'SSH', 'NetFlow'],
                        accuracy: 'ML-based classification with 99%+ accuracy'
                    },
                    vendors: {
                        'portnox': { 
                            capability: 98, 
                            method: 'Agentless AI-powered discovery',
                            unique: ['AI classification', 'Cloud intelligence', 'Real-time updates']
                        },
                        'cisco': { 
                            capability: 85, 
                            method: 'DHCP and NMAP profiling',
                            limitations: ['Manual tuning required', 'Limited IoT support']
                        },
                        'forescout': { 
                            capability: 90, 
                            method: 'Passive and active discovery',
                            unique: ['OT device support', 'Deep packet inspection']
                        },
                        'others': { 
                            capability: 70, 
                            method: 'Basic discovery methods'
                        }
                    },
                    metrics: {
                        discoveryTime: '< 30 seconds',
                        accuracy: '95-99%',
                        coverage: '100% of connected devices'
                    }
                },
                
                'access-control': {
                    name: 'Network Access Control',
                    category: 'Core',
                    icon: '??',
                    description: 'Control who and what can access the network',
                    businessValue: 'Prevent unauthorized access and enforce security policies',
                    technicalDetails: {
                        methods: ['802.1X', 'MAB', 'Web Auth', 'Certificate', 'SAML'],
                        enforcement: ['Pre-admission', 'Post-admission', 'Continuous'],
                        policies: ['Role-based', 'Device-based', 'Location-based', 'Time-based', 'Risk-based']
                    },
                    vendors: {
                        'portnox': { 
                            capability: 98, 
                            method: 'Cloud-based zero trust NAC',
                            unique: ['No infrastructure', 'Application-level control', 'Risk-based policies']
                        },
                        'cisco': { 
                            capability: 88, 
                            method: '802.1X and MAB with ISE',
                            limitations: ['Complex deployment', 'Hardware dependent']
                        },
                        'others': { 
                            capability: 75, 
                            method: 'Traditional NAC'
                        }
                    }
                },
                
                'guest-management': {
                    name: 'Guest Access Management',
                    category: 'Core',
                    icon: '??',
                    description: 'Secure guest and visitor network access',
                    businessValue: 'Provide secure guest access without compromising security',
                    features: [
                        'Self-registration portal',
                        'Sponsor approval workflow',
                        'Time-limited access',
                        'Customizable portals',
                        'SMS/Email authentication',
                        'Social login integration',
                        'Terms acceptance',
                        'Bandwidth controls'
                    ],
                    vendors: {
                        'portnox': { 
                            capability: 95, 
                            method: 'Cloud-hosted portal with workflows',
                            unique: ['Multi-language support', 'Custom branding', 'API integration']
                        },
                        'cisco': { 
                            capability: 85, 
                            method: 'ISE guest portal',
                            limitations: ['Complex setup', 'Limited customization']
                        },
                        'aruba': { 
                            capability: 88, 
                            method: 'ClearPass guest',
                            unique: ['Good customization', 'Sponsor workflows']
                        }
                    }
                },
                
                'byod': {
                    name: 'BYOD Support',
                    category: 'Core',
                    icon: '??',
                    description: 'Enable secure bring-your-own-device',
                    businessValue: 'Support modern workforce without security risks',
                    capabilities: [
                        'Device onboarding',
                        'Certificate provisioning',
                        'Compliance checking',
                        'Personal vs corporate data separation',
                        'Acceptable use enforcement',
                        'Device registration',
                        'Multi-device support',
                        'Automated provisioning'
                    ],
                    vendors: {
                        'portnox': { 
                            capability: 96, 
                            method: 'Automated onboarding with compliance',
                            unique: ['Zero-touch enrollment', 'Cross-platform support']
                        },
                        'aruba': { 
                            capability: 88, 
                            method: 'ClearPass onboarding',
                            unique: ['Good device support', 'QuickConnect app']
                        },
                        'others': { 
                            capability: 70, 
                            method: 'Manual BYOD processes'
                        }
                    }
                },
                
                'iot-security': {
                    name: 'IoT Device Security',
                    category: 'Core',
                    icon: '??',
                    description: 'Secure and manage IoT devices',
                    businessValue: 'Enable IoT initiatives securely',
                    challenges: [
                        'No traditional auth capabilities',
                        'Diverse protocols and vendors',
                        'Limited security features',
                        'Long lifecycles',
                        'Patch management',
                        'Shadow IoT'
                    ],
                    vendors: {
                        'portnox': { 
                            capability: 92, 
                            method: 'AI-powered IoT profiling and segmentation',
                            unique: ['Behavioral profiling', 'Automated policies', 'Risk scoring']
                        },
                        'forescout': { 
                            capability: 85, 
                            method: 'IoT device classification',
                            unique: ['OT support', 'Device libraries']
                        },
                        'fortinet': { 
                            capability: 82, 
                            method: 'FortiNAC IoT security',
                            unique: ['FortiGuard integration']
                        },
                        'others': { 
                            capability: 60, 
                            method: 'Limited IoT support'
                        }
                    }
                }
            },
            
            'advanced-features': {
                'conditional-access': {
                    name: 'Conditional Access for Applications',
                    category: 'Advanced',
                    icon: '??',
                    description: 'Control application access based on device compliance',
                    businessValue: 'Extend zero trust to applications beyond network',
                    implementation: {
                        protocols: ['SAML 2.0', 'OAuth 2.0', 'OpenID Connect'],
                        decisions: ['Allow', 'Block', 'Require MFA', 'Limit access'],
                        conditions: ['Device compliance', 'User risk', 'Location', 'Time', 'Application sensitivity']
                    },
                    vendors: {
                        'portnox': { 
                            capability: 95, 
                            method: 'SAML-based conditional access',
                            included: true,
                            unique: ['Any SAML app', 'Dynamic policies', 'Risk-based decisions']
                        },
                        'others': { 
                            capability: 0, 
                            method: 'Not available',
                            included: false
                        }
                    },
                    useCases: [
                        'Block non-compliant devices from Office 365',
                        'Require MFA for sensitive applications',
                        'Limit contractor access to specific apps',
                        'Time-based application access'
                    ]
                },
                
                'pki-services': {
                    name: 'PKI Certificate Services',
                    category: 'Advanced',
                    icon: '??',
                    description: 'Automated certificate lifecycle management',
                    businessValue: 'Strong authentication without complexity',
                    capabilities: [
                        'Certificate authority',
                        'Auto-enrollment',
                        'Certificate templates',
                        'Revocation management',
                        'Key escrow',
                        'Certificate renewal',
                        'Multi-CA support',
                        'SCEP/EST protocols'
                    ],
                    vendors: {
                        'portnox': { 
                            capability: 94, 
                            method: 'Cloud PKI with auto-enrollment',
                            included: true,
                            unique: ['No infrastructure', 'Automated lifecycle', 'Cross-platform']
                        },
                        'cisco': { 
                            capability: 80, 
                            method: 'Requires separate CA',
                            included: false,
                            limitations: ['External CA needed', 'Complex setup']
                        },
                        'securew2': { 
                            capability: 85, 
                            method: 'Cloud PKI service',
                            included: true
                        }
                    }
                },
                
                'cloud-radius': {
                    name: 'Cloud RADIUS',
                    category: 'Advanced',
                    icon: '??',
                    description: 'Cloud-hosted RADIUS authentication',
                    businessValue: 'No infrastructure, global availability',
                    benefits: [
                        'No hardware required',
                        'Global redundancy',
                        'Automatic scaling',
                        'Built-in HA/DR',
                        'Zero maintenance',
                        'Global PoPs',
                        'Low latency',
                        'API management'
                    ],
                    vendors: {
                        'portnox': { 
                            capability: 98, 
                            method: 'Global cloud RADIUS',
                            included: true,
                            unique: ['30+ global PoPs', 'Anycast routing', '99.99% SLA']
                        },
                        'securew2': { 
                            capability: 90, 
                            method: 'Cloud RADIUS',
                            included: true
                        },
                        'juniper': { 
                            capability: 85, 
                            method: 'Mist Edge RADIUS',
                            included: true,
                            limitations: ['Requires edge devices']
                        },
                        'others': { 
                            capability: 0, 
                            method: 'On-premises only',
                            included: false
                        }
                    }
                },
                
                'tacacs': {
                    name: 'TACACS+ Services',
                    category: 'Advanced',
                    icon: '??',
                    description: 'Network device administration',
                    businessValue: 'Centralized network device management',
                    features: [
                        'Command authorization',
                        'Accounting',
                        'Authentication',
                        'Privilege levels',
                        'Command filtering',
                        'Session recording',
                        'Change tracking',
                        'Compliance reporting'
                    ],
                    vendors: {
                        'portnox': { 
                            capability: 92, 
                            method: 'Cloud TACACS+',
                            included: true,
                            unique: ['No infrastructure', 'Global availability', 'API driven']
                        },
                        'cisco': { 
                            capability: 95, 
                            method: 'ISE TACACS+',
                            included: true,
                            limitations: ['On-premises only', 'Complex setup']
                        },
                        'others': { 
                            capability: 0, 
                            method: 'Not available',
                            included: false
                        }
                    }
                },
                
                'risk-assessment': {
                    name: 'Continuous Risk Assessment',
                    category: 'Advanced',
                    icon: '??',
                    description: 'Real-time device and user risk scoring',
                    businessValue: 'Proactive security posture',
                    factors: [
                        'Device compliance state',
                        'User behavior patterns',
                        'Location anomalies',
                        'Time-based patterns',
                        'Failed auth attempts',
                        'Vulnerability status',
                        'Patch level',
                        'Security agent status',
                        'Network behavior',
                        'Threat intelligence'
                    ],
                    vendors: {
                        'portnox': { 
                            capability: 93, 
                            method: 'AI-driven risk scoring',
                            included: true,
                            unique: ['ML models', 'Real-time scoring', 'Predictive analytics']
                        },
                        'forescout': { 
                            capability: 80, 
                            method: 'Policy-based risk',
                            included: true,
                            limitations: ['Rule-based only']
                        },
                        'others': { 
                            capability: 50, 
                            method: 'Basic risk assessment',
                            included: false
                        }
                    },
                    actions: [
                        'Adaptive authentication',
                        'Dynamic access control',
                        'Automated remediation',
                        'Alert generation',
                        'Policy adjustment'
                    ]
                }
            },
            
            'zero-trust-features': {
                'continuous-verification': {
                    name: 'Continuous Verification',
                    category: 'Zero Trust',
                    icon: '??',
                    description: 'Never trust, always verify throughout the session',
                    principles: [
                        'No implicit trust',
                        'Continuous assessment',
                        'Dynamic decisions',
                        'Context awareness',
                        'Least privilege'
                    ],
                    implementation: {
                        frequency: 'Real-time',
                        factors: ['Device health', 'User behavior', 'Resource sensitivity', 'Threat level'],
                        actions: ['Allow', 'Step-up auth', 'Restrict', 'Block', 'Quarantine']
                    }
                },
                
                'microsegmentation': {
                    name: 'Microsegmentation',
                    category: 'Zero Trust',
                    icon: '??',
                    description: 'Granular network segmentation to prevent lateral movement',
                    types: [
                        'User-based segmentation',
                        'Device-based segmentation',
                        'Application segmentation',
                        'Process-level segmentation',
                        'Dynamic segmentation'
                    ],
                    benefits: [
                        'Limit blast radius',
                        'Prevent lateral movement',
                        'Compliance boundaries',
                        'Simplified management',
                        'Reduced attack surface'
                    ]
                },
                
                'identity-centric': {
                    name: 'Identity-Centric Security',
                    category: 'Zero Trust',
                    icon: '??',
                    description: 'Identity as the new perimeter',
                    components: [
                        'Strong authentication',
                        'Identity governance',
                        'Privileged access',
                        'Identity analytics',
                        'Lifecycle management'
                    ]
                }
            },
            
            'automation-features': {
                'automated-response': {
                    name: 'Automated Incident Response',
                    category: 'Automation',
                    icon: '?',
                    description: 'Instant automated response to security incidents',
                    capabilities: [
                        'Auto-quarantine',
                        'Policy adjustment',
                        'Remediation workflows',
                        'Ticket creation',
                        'Notification',
                        'Evidence collection',
                        'Recovery procedures'
                    ],
                    scenarios: {
                        'malware': {
                            detection: 'AV alert or behavioral anomaly',
                            actions: ['Quarantine device', 'Notify SOC', 'Collect forensics', 'Initiate scan'],
                            time: '< 1 second'
                        },
                        'breach': {
                            detection: 'Unauthorized access attempt',
                            actions: ['Block access', 'Disable account', 'Alert security', 'Log evidence'],
                            time: '< 1 second'
                        },
                        'compliance': {
                            detection: 'Policy violation',
                            actions: ['Restrict access', 'Notify user', 'Create ticket', 'Schedule remediation'],
                            time: '< 5 seconds'
                        }
                    }
                },
                
                'workflow-automation': {
                    name: 'Workflow Automation',
                    category: 'Automation',
                    icon: '??',
                    description: 'Automate repetitive tasks and processes',
                    workflows: [
                        'Onboarding automation',
                        'Offboarding automation',
                        'Guest approval',
                        'Exception handling',
                        'Compliance checks',
                        'Access reviews',
                        'Certificate renewal',
                        'Policy updates'
                    ],
                    benefits: [
                        '90% reduction in manual tasks',
                        'Consistent processes',
                        'Faster execution',
                        'Reduced errors',
                        'Audit trail'
                    ]
                },
                
                'self-healing': {
                    name: 'Self-Healing Networks',
                    category: 'Automation',
                    icon: '??',
                    description: 'Networks that automatically detect and fix issues',
                    capabilities: [
                        'Auto-remediation',
                        'Configuration drift correction',
                        'Service restoration',
                        'Performance optimization',
                        'Security posture maintenance'
                    ]
                }
            }
        };
    }
    
    initializeRiskScenarios() {
        return {
            'ransomware': {
                name: 'Ransomware Attack',
                icon: '??',
                probability: {
                    baseline: 0.28,
                    withNac: 0.03,
                    reduction: 89
                },
                impact: {
                    financial: 4500000,
                    operational: 21, // days
                    reputation: 'Severe'
                },
                nacMitigation: {
                    controls: [
                        'Device health verification',
                        'Behavioral anomaly detection',
                        'Rapid isolation',
                        'Network segmentation',
                        'Backup verification'
                    ],
                    effectiveness: 89,
                    timeToContain: '< 1 minute'
                }
            },
            
            'insider-threat': {
                name: 'Insider Threat',
                icon: '???',
                probability: {
                    baseline: 0.34,
                    withNac: 0.05,
                    reduction: 85
                },
                impact: {
                    financial: 3800000,
                    operational: 45,
                    reputation: 'High'
                },
                nacMitigation: {
                    controls: [
                        'Behavioral analytics',
                        'Access monitoring',
                        'Privilege management',
                        'Data access tracking',
                        'Anomaly detection'
                    ],
                    effectiveness: 85,
                    timeToDetect: '< 1 hour'
                }
            },
            
            'supply-chain': {
                name: 'Supply Chain Attack',
                icon: '??',
                probability: {
                    baseline: 0.21,
                    withNac: 0.04,
                    reduction: 81
                },
                impact: {
                    financial: 5200000,
                    operational: 60,
                    reputation: 'Severe'
                },
                nacMitigation: {
                    controls: [
                        'Vendor access management',
                        'Third-party risk assessment',
                        'Temporary access controls',
                        'Activity monitoring',
                        'Least privilege enforcement'
                    ],
                    effectiveness: 81,
                    timeToDetect: '< 4 hours'
                }
            },
            
            'zero-day': {
                name: 'Zero-Day Exploit',
                icon: '??',
                probability: {
                    baseline: 0.15,
                    withNac: 0.03,
                    reduction: 80
                },
                impact: {
                    financial: 6100000,
                    operational: 14,
                    reputation: 'High'
                },
                nacMitigation: {
                    controls: [
                        'Behavioral detection',
                        'Anomaly identification',
                        'Rapid containment',
                        'Virtual patching',
                        'Threat intelligence'
                    ],
                    effectiveness: 80,
                    timeToContain: '< 15 minutes'
                }
            },
            
            'iot-compromise': {
                name: 'IoT Device Compromise',
                icon: '??',
                probability: {
                    baseline: 0.42,
                    withNac: 0.06,
                    reduction: 86
                },
                impact: {
                    financial: 2900000,
                    operational: 7,
                    reputation: 'Medium'
                },
                nacMitigation: {
                    controls: [
                        'IoT device profiling',
                        'Behavioral monitoring',
                        'Network isolation',
                        'Automated policies',
                        'Risk scoring'
                    ],
                    effectiveness: 86,
                    timeToDetect: '< 30 minutes'
                }
            },
            
            'data-exfiltration': {
                name: 'Data Exfiltration',
                icon: '??',
                probability: {
                    baseline: 0.31,
                    withNac: 0.03,
                    reduction: 90
                },
                impact: {
                    financial: 4200000,
                    operational: 30,
                    reputation: 'Severe',
                    regulatory: 'High'
                },
                nacMitigation: {
                    controls: [
                        'Data flow monitoring',
                        'Egress control',
                        'DLP integration',
                        'User behavior analytics',
                        'Encryption enforcement'
                    ],
                    effectiveness: 90,
                    timeToDetect: '< 5 minutes'
                }
            }
        };
    }
    
    initializeInsuranceModels() {
        return {
            factors: {
                'security-controls': {
                    name: 'Security Control Maturity',
                    weight: 0.35,
                    metrics: [
                        'Access control effectiveness',
                        'Incident response capability',
                        'Vulnerability management',
                        'Security awareness',
                        'Third-party risk'
                    ]
                },
                'compliance': {
                    name: 'Compliance Posture',
                    weight: 0.25,
                    metrics: [
                        'Framework coverage',
                        'Audit results',
                        'Remediation speed',
                        'Documentation quality'
                    ]
                },
                'incidents': {
                    name: 'Historical Incidents',
                    weight: 0.20,
                    metrics: [
                        'Breach history',
                        'Incident frequency',
                        'Recovery time',
                        'Loss magnitude'
                    ]
                },
                'technology': {
                    name: 'Technology Stack',
                    weight: 0.20,
                    metrics: [
                        'Architecture modernity',
                        'Patch management',
                        'Legacy system exposure',
                        'Cloud adoption'
                    ]
                }
            },
            
            premiumCalculation: {
                baseline: 150000,
                reductions: {
                    'portnox': {
                        percentage: 28,
                        factors: [
                            'Zero trust implementation (10%)',
                            'Automated response (8%)',
                            'Continuous monitoring (5%)',
                            'Compliance automation (5%)'
                        ]
                    },
                    'traditional': {
                        percentage: 10,
                        factors: [
                            'Basic access control (5%)',
                            'Periodic assessments (3%)',
                            'Manual processes (2%)'
                        ]
                    }
                }
            },
            
            coverageEnhancements: {
                'with-nac': [
                    'Higher coverage limits',
                    'Lower deductibles',
                    'Broader coverage terms',
                    'Reduced exclusions',
                    'Faster claim processing'
                ],
                'requirements': [
                    'Continuous monitoring',
                    'Automated response',
                    'Regular testing',
                    'Compliance validation',
                    'Incident response plan'
                ]
            }
        };
    }
    
    initializeAnalystInsights() {
        return [
            {
                firm: 'Gartner',
                logo: './img/analysts/gartner-logo.png',
                report: 'Network Access Control Market Guide 2024',
                date: '2024-03',
                insights: [
                    {
                        quote: "Cloud-native NAC solutions are delivering 60% lower TCO compared to traditional on-premises deployments while providing superior security capabilities.",
                        impact: 'Cost Validation',
                        relevance: 95
                    },
                    {
                        quote: "Organizations implementing zero trust NAC report 85% reduction in security incidents and 90% faster threat response times.",
                        impact: 'Security Effectiveness',
                        relevance: 98
                    },
                    {
                        quote: "By 2026, 70% of enterprises will adopt cloud-delivered NAC, up from 15% in 2023.",
                        impact: 'Market Trend',
                        relevance: 90
                    }
                ],
                recommendations: [
                    'Prioritize cloud-native solutions',
                    'Focus on zero trust capabilities',
                    'Evaluate automation features',
                    'Consider TCO not just licensing'
                ]
            },
            
            {
                firm: 'Forrester',
                logo: './img/analysts/forrester-logo.png',
                report: 'Zero Trust Network Access Wave Q2 2024',
                date: '2024-04',
                insights: [
                    {
                        quote: "Leading NAC vendors are differentiating through AI-powered threat detection and automated response capabilities.",
                        impact: 'Technology Direction',
                        relevance: 92
                    },
                    {
                        quote: "Portnox demonstrated strongest ease of deployment with average implementation time 75% faster than competitors.",
                        impact: 'Vendor Validation',
                        relevance: 96
                    }
                ],
                wavePosition: {
                    'portnox': 'Leader',
                    'cisco': 'Strong Performer',
                    'forescout': 'Contender'
                }
            },
            
            {
                firm: 'IDC',
                logo: './img/analysts/idc-logo.png',
                report: 'Worldwide Network Access Control Forecast 2024-2028',
                date: '2024-05',
                insights: [
                    {
                        quote: "The NAC market is experiencing 22% CAGR driven by zero trust initiatives and IoT security requirements.",
                        impact: 'Market Growth',
                        relevance: 88
                    },
                    {
                        quote: "Cloud-delivered NAC reduces operational overhead by 75% compared to appliance-based solutions.",
                        impact: 'Operational Efficiency',
                        relevance: 94
                    }
                ],
                marketData: {
                    size2024: 1.8,
                    size2028: 4.2,
                    cagr: 22.3,
                    cloudShare2028: 75
                }
            },
            
            {
                firm: 'EMA',
                logo: './img/analysts/ema-logo.png',
                report: 'Network Security Megatrends 2024',
                date: '2024-06',
                insights: [
                    {
                        quote: "Organizations using cloud NAC report 65% reduction in audit preparation time through automated compliance features.",
                        impact: 'Compliance Efficiency',
                        relevance: 91
                    },
                    {
                        quote: "AI-driven NAC solutions detect and contain threats 40x faster than traditional rule-based systems.",
                        impact: 'Threat Response',
                        relevance: 95
                    }
                ]
            },
            
            {
                firm: '451 Research',
                logo: './img/analysts/451-logo.png',
                report: 'NAC Market Dynamics 2024',
                date: '2024-07',
                insights: [
                    {
                        quote: "Portnox's cloud-native architecture eliminates 90% of infrastructure management overhead.",
                        impact: 'Architecture Validation',
                        relevance: 93
                    }
                ]
            }
        ];
    }
    
    // Initialize the platform
    init() {
        if (this.initialized) return this;
        
        console.log("?? Initializing Portnox Executive Intelligence Platform v5.0...");
        
        try {
            this.createPlatformStructure();
            this.setupAdvancedEventListeners();
            this.initializeAdvancedCharts();
            this.startAnimations();
            
            this.initialized = true;
            
            // Hide any loading indicators
            const loadingElements = document.querySelectorAll('.initial-loading, .loading-overlay');
            loadingElements.forEach(el => el.style.display = 'none');
            
            console.log("? Portnox Executive Intelligence Platform initialized successfully");
            
            // Trigger initial calculations
            setTimeout(() => {
                this.performInitialCalculations();
            }, 500);
            
            return this;
            
        } catch (error) {
            console.error("? Platform initialization failed:", error);
            this.showErrorMessage("Platform initialization failed. Please refresh the page.");
            return null;
        }
    }
    
    // Create the comprehensive platform UI structure
    createPlatformStructure() {
        const container = document.querySelector('#executive-view .view-content');
        if (!container) return;
        
        container.innerHTML = `
            <div class="executive-intelligence-platform animate-fade-in">
                <!-- Animated Background -->
                <div class="animated-bg">
                    <div class="particle-field"></div>
                    <div class="gradient-overlay"></div>
                </div>
                
                <!-- Platform Header -->
                <div class="platform-header glass-morphism">
                    <div class="header-content">
                        <div class="platform-branding">
                            <img src="./img/vendors/portnox-logo.png" alt="Portnox" class="platform-logo animate-pulse">
                            <div class="platform-title">
                                <h1 class="gradient-text">Executive Intelligence Platform</h1>
                                <p class="subtitle">Zero Trust NAC Total Cost Analysis & Strategic Decision Support</p>
                            </div>
                        </div>
                        <div class="platform-actions">
                            <button class="action-btn primary pulse-animation" id="calculate-analysis">
                                <i class="fas fa-calculator"></i>
                                <span>Calculate Analysis</span>
                            </button>
                            <button class="action-btn secondary" id="export-comprehensive">
                                <i class="fas fa-file-export"></i>
                                <span>Export Report</span>
                            </button>
                            <button class="action-btn glass" id="schedule-demo">
                                <i class="fas fa-calendar-check"></i>
                                <span>Schedule Demo</span>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Quick Stats Bar -->
                <div class="quick-stats-bar">
                    <div class="stat-item animate-counter">
                        <span class="stat-value" data-value="275">$0K</span>
                        <span class="stat-label">Total Savings</span>
                    </div>
                    <div class="stat-item animate-counter">
                        <span class="stat-value" data-value="7">0</span>
                        <span class="stat-label">Months ROI</span>
                    </div>
                    <div class="stat-item animate-counter">
                        <span class="stat-value" data-value="89">0%</span>
                        <span class="stat-label">Risk Reduction</span>
                    </div>
                    <div class="stat-item animate-counter">
                        <span class="stat-value" data-value="95">0%</span>
                        <span class="stat-label">Compliance</span>
                    </div>
                </div>
                
                <!-- Main Configuration Section -->
                <div class="configuration-section glass-morphism">
                    <h2 class="section-header">
                        <i class="fas fa-cogs animate-spin-slow"></i>
                        Configuration & Analysis Parameters
                    </h2>
                    
                    <div class="config-grid">
                        <!-- Vendor Selection -->
                        <div class="config-card hover-lift">
                            <h3><i class="fas fa-building"></i> Vendor Selection</h3>
                            <div class="vendor-grid">
                                ${this.createVendorSelectionGrid()}
                            </div>
                            <div class="vendor-actions">
                                <button class="text-btn" id="select-all-vendors">Select All</button>
                                <button class="text-btn" id="select-cloud-vendors">Cloud Only</button>
                                <button class="text-btn" id="compare-top-3">Top 3</button>
                            </div>
                        </div>
                        
                        <!-- Organization Profile -->
                        <div class="config-card hover-lift">
                            <h3><i class="fas fa-sitemap"></i> Organization Profile</h3>
                            <div class="profile-grid">
                                <div class="input-group">
                                    <label class="animated-label">Industry</label>
                                    <select id="industry-select" class="styled-select">
                                        ${this.createIndustryOptions()}
                                    </select>
                                </div>
                                <div class="input-group">
                                    <label class="animated-label">Device Count</label>
                                    <input type="number" id="device-count" class="styled-input" value="1000" min="50">
                                    <span class="input-hint">50 - 100,000 devices</span>
                                </div>
                                <div class="input-group">
                                    <label class="animated-label">Locations</label>
                                    <input type="number" id="location-count" class="styled-input" value="10" min="1">
                                </div>
                                <div class="input-group">
                                    <label class="animated-label">Users</label>
                                    <input type="number" id="user-count" class="styled-input" value="5000" min="10">
                                </div>
                            </div>
                        </div>
                        
                        <!-- Compliance Requirements -->
                        <div class="config-card hover-lift">
                            <h3><i class="fas fa-shield-alt"></i> Compliance Requirements</h3>
                            <div class="compliance-selector">
                                ${this.createComplianceSelector()}
                            </div>
                            <div class="compliance-impact">
                                <div class="impact-meter">
                                    <label>Compliance Complexity:</label>
                                    <div class="meter-bar">
                                        <div class="meter-fill" id="compliance-meter"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Risk Profile -->
                        <div class="config-card hover-lift">
                            <h3><i class="fas fa-exclamation-triangle"></i> Risk Profile</h3>
                            <div class="risk-settings">
                                <div class="input-group">
                                    <label class="animated-label">Security Posture</label>
                                    <select id="security-posture" class="styled-select">
                                        <option value="low">Basic</option>
                                        <option value="standard" selected>Standard</option>
                                        <option value="elevated">Elevated</option>
                                        <option value="critical">Critical</option>
                                    </select>
                                </div>
                                <div class="input-group">
                                    <label class="animated-label">Breach Cost Estimate</label>
                                    <input type="number" id="breach-cost" class="styled-input" value="4350000">
                                    <span class="input-hint">Industry avg: $4.35M</span>
                                </div>
                                <div class="input-group">
                                    <label class="animated-label">Downtime Cost/Hour</label>
                                    <input type="number" id="downtime-cost" class="styled-input" value="10000">
                                </div>
                                <div class="input-group">
                                    <label class="animated-label">Cyber Insurance</label>
                                    <input type="number" id="insurance-premium" class="styled-input" value="150000">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Results Section -->
                <div class="results-section" id="results-section" style="display: none;">
                    <!-- Executive KPI Dashboard -->
                    <div class="executive-kpi-dashboard glass-morphism">
                        <h2 class="section-header">
                            <i class="fas fa-chart-line"></i>
                            Executive Key Performance Indicators
                        </h2>
                        <div class="kpi-grid" id="executive-kpis">
                            <!-- KPIs will be dynamically inserted -->
                        </div>
                    </div>
                    
                    <!-- Advanced Tab Navigation -->
                    <div class="advanced-tabs glass-morphism">
                        <div class="tab-nav">
                            <button class="tab-btn active" data-tab="executive-overview">
                                <i class="fas fa-home"></i>
                                <span>Executive Overview</span>
                                <span class="tab-indicator"></span>
                            </button>
                            <button class="tab-btn" data-tab="financial-analysis">
                                <i class="fas fa-dollar-sign"></i>
                                <span>Financial Analysis</span>
                                <span class="tab-indicator"></span>
                            </button>
                            <button class="tab-btn" data-tab="security-posture">
                                <i class="fas fa-shield-alt"></i>
                                <span>Security & Risk</span>
                                <span class="tab-indicator"></span>
                            </button>
                            <button class="tab-btn" data-tab="compliance-analysis">
                                <i class="fas fa-clipboard-check"></i>
                                <span>Compliance</span>
                                <span class="tab-indicator"></span>
                            </button>
                            <button class="tab-btn" data-tab="vendor-comparison">
                                <i class="fas fa-balance-scale"></i>
                                <span>Vendor Analysis</span>
                                <span class="tab-indicator"></span>
                            </button>
                            <button class="tab-btn" data-tab="implementation-roadmap">
                                <i class="fas fa-road"></i>
                                <span>Implementation</span>
                                <span class="tab-indicator"></span>
                            </button>
                            <button class="tab-btn" data-tab="industry-insights">
                                <i class="fas fa-industry"></i>
                                <span>Industry Insights</span>
                                <span class="tab-indicator"></span>
                            </button>
                        </div>
                        
                        <div class="tab-content">
                            <!-- Tab panels will be dynamically created -->
                            <div class="tab-panel active" data-panel="executive-overview">
                                <div class="panel-content" id="executive-overview-content"></div>
                            </div>
                            <div class="tab-panel" data-panel="financial-analysis">
                                <div class="panel-content" id="financial-analysis-content"></div>
                            </div>
                            <div class="tab-panel" data-panel="security-posture">
                                <div class="panel-content" id="security-posture-content"></div>
                            </div>
                            <div class="tab-panel" data-panel="compliance-analysis">
                                <div class="panel-content" id="compliance-analysis-content"></div>
                            </div>
                            <div class="tab-panel" data-panel="vendor-comparison">
                                <div class="panel-content" id="vendor-comparison-content"></div>
                            </div>
                            <div class="tab-panel" data-panel="implementation-roadmap">
                                <div class="panel-content" id="implementation-roadmap-content"></div>
                            </div>
                            <div class="tab-panel" data-panel="industry-insights">
                                <div class="panel-content" id="industry-insights-content"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Floating Action Button -->
                <div class="fab-container">
                    <button class="fab pulse-animation" id="ai-assistant">
                        <i class="fas fa-robot"></i>
                    </button>
                    <div class="fab-menu">
                        <button class="fab-item" title="Get Recommendation">
                            <i class="fas fa-lightbulb"></i>
                        </button>
                        <button class="fab-item" title="Schedule Call">
                            <i class="fas fa-phone"></i>
                        </button>
                        <button class="fab-item" title="Download Report">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    createVendorSelectionGrid() {
        return Object.entries(this.vendorData).map(([vendorId, vendor]) => {
            const isSelected = this.selectedVendors.includes(vendorId);
            const isPortnox = vendorId === 'portnox';
            
            return `
                <div class="vendor-card ${isSelected ? 'selected' : ''} ${isPortnox ? 'recommended' : ''}" 
                     data-vendor="${vendorId}">
                    <div class="vendor-icon">${vendor.icon}</div>
                    <div class="vendor-info">
                        <div class="vendor-name">${vendor.shortName}</div>
                        <div class="vendor-type">${vendor.architecture}</div>
                    </div>
                    ${isPortnox ? '<div class="recommended-badge">Recommended</div>' : ''}
                    <div class="selection-indicator">
                        <i class="fas fa-check-circle"></i>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    createIndustryOptions() {
        return Object.entries(this.industryData).map(([key, industry]) => `
            <option value="${key}" ${key === this.config.industry ? 'selected' : ''}>
                ${industry.icon} ${industry.name}
            </option>
        `).join('');
    }
    
    createComplianceSelector() {
        return Object.entries(this.complianceData).map(([key, compliance]) => `
            <div class="compliance-item">
                <label class="checkbox-wrapper">
                    <input type="checkbox" class="compliance-checkbox" value="${key}" 
                           ${this.config.complianceFrameworks.includes(key) ? 'checked' : ''}>
                    <span class="checkbox-custom"></span>
                    <span class="compliance-info">
                        <span class="compliance-name">${compliance.name}</span>
                        <span class="compliance-priority priority-${compliance.priority.toLowerCase()}">${compliance.priority}</span>
                    </span>
                </label>
            </div>
        `).join('');
    }
    
    setupAdvancedEventListeners() {
        // Main calculation button
        document.getElementById('calculate-analysis')?.addEventListener('click', () => {
            this.performComprehensiveAnalysis();
        });
        
        // Export functionality
        document.getElementById('export-comprehensive')?.addEventListener('click', () => {
            this.exportComprehensiveReport();
        });
        
        // Schedule demo
        document.getElementById('schedule-demo')?.addEventListener('click', () => {
            this.scheduleDemo();
        });
        
        // Vendor selection
        document.querySelectorAll('.vendor-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const vendorId = card.getAttribute('data-vendor');
                card.classList.toggle('selected');
                
                if (card.classList.contains('selected')) {
                    if (!this.selectedVendors.includes(vendorId)) {
                        this.selectedVendors.push(vendorId);
                    }
                } else {
                    this.selectedVendors = this.selectedVendors.filter(v => v !== vendorId);
                }
                
                this.updateVendorSelectionActions();
            });
        });
        
        // Quick vendor actions
        document.getElementById('select-all-vendors')?.addEventListener('click', () => {
            this.selectedVendors = Object.keys(this.vendorData);
            this.updateVendorSelection();
        });
        
        document.getElementById('select-cloud-vendors')?.addEventListener('click', () => {
            this.selectedVendors = Object.entries(this.vendorData)
                .filter(([id, vendor]) => vendor.architecture.includes('Cloud'))
                .map(([id]) => id);
            this.updateVendorSelection();
        });
        
        document.getElementById('compare-top-3')?.addEventListener('click', () => {
            this.selectedVendors = ['portnox', 'cisco', 'aruba'];
            this.updateVendorSelection();
        });
        
        // Configuration inputs
        document.getElementById('industry-select')?.addEventListener('change', (e) => {
            this.config.industry = e.target.value;
            this.updateIndustryImpact();
        });
        
        document.getElementById('device-count')?.addEventListener('input', (e) => {
            this.config.deviceCount = parseInt(e.target.value) || 1000;
        });
        
        document.getElementById('location-count')?.addEventListener('input', (e) => {
            this.config.locationCount = parseInt(e.target.value) || 10;
        });
        
        document.getElementById('user-count')?.addEventListener('input', (e) => {
            this.config.userCount = parseInt(e.target.value) || 5000;
        });
        
        // Compliance checkboxes
        document.querySelectorAll('.compliance-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateComplianceRequirements();
            });
        });
        
        // Risk inputs
        document.getElementById('security-posture')?.addEventListener('change', (e) => {
            this.config.securityPosture = e.target.value;
        });
        
        document.getElementById('breach-cost')?.addEventListener('input', (e) => {
            this.config.breachCost = parseInt(e.target.value) || 4350000;
        });
        
        document.getElementById('downtime-cost')?.addEventListener('input', (e) => {
            this.config.downtimeCost = parseInt(e.target.value) || 10000;
        });
        
        document.getElementById('insurance-premium')?.addEventListener('input', (e) => {
            this.config.insurancePremium = parseInt(e.target.value) || 150000;
        });
        
        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                this.switchToTab(tabId);
            });
        });
        
        // FAB menu
        const fab = document.getElementById('ai-assistant');
        const fabMenu = document.querySelector('.fab-menu');
        
        fab?.addEventListener('click', () => {
            fabMenu?.classList.toggle('active');
            fab.classList.toggle('active');
        });
        
        // Close FAB menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.fab-container')) {
                fabMenu?.classList.remove('active');
                fab?.classList.remove('active');
            }
        });
    }
    
    updateVendorSelection() {
        document.querySelectorAll('.vendor-card').forEach(card => {
            const vendorId = card.getAttribute('data-vendor');
            if (this.selectedVendors.includes(vendorId)) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });
        this.updateVendorSelectionActions();
    }
    
    updateVendorSelectionActions() {
        const selectedCount = this.selectedVendors.length;
        const actionText = document.querySelector('.vendor-actions-text');
        if (actionText) {
            actionText.textContent = `${selectedCount} vendor${selectedCount !== 1 ? 's' : ''} selected`;
        }
    }
    
    updateIndustryImpact() {
        const industry = this.industryData[this.config.industry];
        if (industry) {
            // Update breach cost based on industry
            const breachInput = document.getElementById('breach-cost');
            if (breachInput) {
                breachInput.value = industry.breachCost;
                this.config.breachCost = industry.breachCost;
            }
            
            // Update downtime cost
            const downtimeInput = document.getElementById('downtime-cost');
            if (downtimeInput && industry.downTimeImpact) {
                downtimeInput.value = industry.downTimeImpact;
                this.config.downtimeCost = industry.downTimeImpact;
            }
            
            // Show industry-specific alerts
            this.showIndustryAlert(industry);
        }
    }
    
    showIndustryAlert(industry) {
        const alertHtml = `
            <div class="industry-alert animate-slide-in">
                <div class="alert-icon">${industry.icon}</div>
                <div class="alert-content">
                    <h4>${industry.name} Selected</h4>
                    <p>Key considerations: ${industry.specificRisks.slice(0, 3).join(', ')}</p>
                    <p>Recommended compliance: ${industry.regulatoryRequirements.slice(0, 3).join(', ')}</p>
                </div>
                <button class="alert-close" onclick="this.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        const existingAlert = document.querySelector('.industry-alert');
        if (existingAlert) existingAlert.remove();
        
        document.querySelector('.configuration-section')?.insertAdjacentHTML('afterbegin', alertHtml);
    }
    
    updateComplianceRequirements() {
        const checkedFrameworks = Array.from(document.querySelectorAll('.compliance-checkbox:checked'))
            .map(cb => cb.value);
        
        this.config.complianceFrameworks = checkedFrameworks;
        
        // Update compliance complexity meter
        const complexity = this.calculateComplianceComplexity();
        const meterFill = document.getElementById('compliance-meter');
        if (meterFill) {
            meterFill.style.width = `${complexity}%`;
            meterFill.className = 'meter-fill';
            if (complexity > 75) meterFill.classList.add('high');
            else if (complexity > 50) meterFill.classList.add('medium');
            else meterFill.classList.add('low');
        }
    }
    
    calculateComplianceComplexity() {
        const frameworkCount = this.config.complianceFrameworks.length;
        const weights = {
            'nist-csf': 1.0,
            'pci-dss': 1.5,
            'hipaa': 1.8,
            'gdpr': 1.7,
            'sox': 1.6,
            'cmmc': 2.0,
            'nerc-cip': 2.2,
            'fedramp': 2.5,
            'fisma': 2.3
        };
        
        let totalWeight = 0;
        this.config.complianceFrameworks.forEach(fw => {
            totalWeight += (weights[fw] || 1.0);
        });
        
        return Math.min(100, (totalWeight / 10) * 100);
    }
    
    switchToTab(tabId) {
        // Update active tab button
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabId}"]`)?.classList.add('active');
        
        // Update active panel
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.querySelector(`[data-panel="${tabId}"]`)?.classList.add('active');
        
        // Load content for the tab
        this.loadTabContent(tabId);
    }
    
    loadTabContent(tabId) {
        const contentMap = {
            'executive-overview': () => this.loadExecutiveOverview(),
            'financial-analysis': () => this.loadFinancialAnalysis(),
            'security-posture': () => this.loadSecurityPosture(),
            'compliance-analysis': () => this.loadComplianceAnalysis(),
            'vendor-comparison': () => this.loadVendorComparison(),
            'implementation-roadmap': () => this.loadImplementationRoadmap(),
            'industry-insights': () => this.loadIndustryInsights()
        };
        
        const loader = contentMap[tabId];
        if (loader) {
            loader.call(this);
        }
    }
    
    performInitialCalculations() {
        // Show quick stats with animation
        this.animateQuickStats();
    }
    
    animateQuickStats() {
        document.querySelectorAll('.animate-counter').forEach(item => {
            const valueElement = item.querySelector('.stat-value');
            const targetValue = parseInt(valueElement.getAttribute('data-value'));
            const suffix = valueElement.textContent.match(/[^\d]+$/)?.[0] || '';
            
            this.animateValue(valueElement, 0, targetValue, 2000, suffix);
        });
    }
    
    animateValue(element, start, end, duration, suffix = '') {
        const startTime = performance.now();
        
        const updateValue = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            const current = Math.round(start + (end - start) * easeOutQuart);
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateValue);
            }
        };
        
        requestAnimationFrame(updateValue);
    }
    
    performComprehensiveAnalysis() {
        // Show loading state
        this.showLoadingState();
        
        // Simulate calculation delay for effect
        setTimeout(() => {
            // Perform calculations
            const results = this.calculateComprehensiveResults();
            
            // Store results
            this.analysisResults = results;
            
            // Show results section
            document.getElementById('results-section').style.display = 'block';
            
            // Update KPIs
            this.updateExecutiveKPIs(results);
            
            // Load initial tab content
            this.loadExecutiveOverview();
            
            // Hide loading state
            this.hideLoadingState();
            
            // Smooth scroll to results
            document.getElementById('results-section').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            
            // Trigger animations
            this.triggerResultAnimations();
            
        }, 1500);
    }
    
    showLoadingState() {
        const button = document.getElementById('calculate-analysis');
        if (button) {
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        }
    }
    
    hideLoadingState() {
        const button = document.getElementById('calculate-analysis');
        if (button) {
            button.disabled = false;
            button.innerHTML = '<i class="fas fa-calculator"></i> <span>Calculate Analysis</span>';
        }
    }
    
    calculateComprehensiveResults() {
        const results = {
            summary: {},
            vendors: {},
            financial: {},
            security: {},
            compliance: {},
            risk: {},
            implementation: {},
            recommendations: []
        };
        
        // Calculate for each selected vendor
        this.selectedVendors.forEach(vendorId => {
            const vendor = this.vendorData[vendorId];
            const vendorResults = this.calculateVendorMetrics(vendor, vendorId);
            results.vendors[vendorId] = vendorResults;
        });
        
        // Calculate comparative metrics
        results.summary = this.calculateSummaryMetrics(results.vendors);
        results.financial = this.calculateFinancialMetrics(results.vendors);
        results.security = this.calculateSecurityMetrics(results.vendors);
        results.compliance = this.calculateComplianceMetrics(results.vendors);
        results.risk = this.calculateRiskMetrics(results.vendors);
        results.implementation = this.calculateImplementationMetrics(results.vendors);
        
        // Generate recommendations
        results.recommendations = this.generateRecommendations(results);
        
        return results;
    }
    
    calculateVendorMetrics(vendor, vendorId) {
        const deviceCount = this.config.deviceCount;
        const years = this.config.analysisPeriod || 3;
        const industry = this.industryData[this.config.industry];
        
        // Calculate licensing costs
        const licensingCost = vendor.pricing.basePrice * deviceCount * 12; // Annual
        
        // Apply volume discounts
        let discount = 0;
        vendor.pricing.volumeDiscounts.forEach(tier => {
            if (deviceCount >= tier.min && deviceCount <= tier.max) {
                discount = tier.discount;
            }
        });
        
        const discountedLicensing = licensingCost * (1 - discount / 100);
        
        // Calculate total costs
        const implementationCost = vendor.costs.implementation + vendor.costs.training;
        const annualOperationalCost = vendor.costs.personnelPerYear + 
                                    vendor.costs.support + 
                                    vendor.costs.maintenance +
                                    vendor.costs.downtimePerYear;
        
        const totalFirstYear = implementationCost + discountedLicensing + annualOperationalCost;
        const totalThreeYear = implementationCost + (discountedLicensing + annualOperationalCost) * 3;
        
        // Calculate savings vs average
        const avgCompetitorCost = this.calculateAverageCompetitorCost(vendorId);
        const savings = avgCompetitorCost - totalThreeYear;
        
        // Calculate ROI
        const roi = ((savings / totalThreeYear) * 100).toFixed(0);
        
        // Risk calculations
        const riskReduction = vendor.riskReduction || {};
        const breachProbabilityReduction = riskReduction.breachProbabilityReduction || 0;
        const potentialLossAvoidance = (this.config.breachCost * breachProbabilityReduction / 100);
        
        // Insurance impact
        const insuranceReduction = riskReduction.insurancePremiumReduction || 0;
        const insuranceSavings = this.config.insurancePremium * insuranceReduction / 100;
        
        return {
            costs: {
                licensing: discountedLicensing,
                implementation: implementationCost,
                operational: annualOperationalCost,
                firstYear: totalFirstYear,
                threeYear: totalThreeYear,
                perDevice: totalThreeYear / deviceCount / 3,
                perUser: totalThreeYear / this.config.userCount / 3
            },
            savings: {
                vsAverage: savings,
                percentage: (savings / avgCompetitorCost * 100).toFixed(0),
                roi: roi,
                paybackMonths: vendor.pricing.roi?.paybackPeriod || 24
            },
            risk: {
                reduction: breachProbabilityReduction,
                avoidedLoss: potentialLossAvoidance,
                insuranceSavings: insuranceSavings,
                totalRiskValue: potentialLossAvoidance + insuranceSavings
            },
            operational: {
                implementationDays: vendor.metrics.deploymentTime,
                fteRequired: vendor.metrics.fteRequired,
                availability: vendor.metrics.availability,
                userSatisfaction: vendor.metrics.userSatisfaction
            },
            compliance: this.calculateVendorCompliance(vendor),
            security: {
                score: vendor.security.overallSecurityScore,
                zeroTrust: vendor.security.zeroTrustScore,
                capabilities: vendor.security
            }
        };
    }
    
    calculateAverageCompetitorCost(excludeVendorId) {
        const competitors = Object.entries(this.vendorData)
            .filter(([id]) => id !== excludeVendorId)
            .map(([id, vendor]) => vendor);
        
        const avgCost = competitors.reduce((sum, vendor) => {
            const cost = vendor.costs.implementation + 
                        (vendor.costs.personnelPerYear * 3) +
                        (vendor.pricing.basePrice * this.config.deviceCount * 36);
            return sum + cost;
        }, 0) / competitors.length;
        
        return avgCost;
    }
    
    calculateVendorCompliance(vendor) {
        const selectedFrameworks = this.config.complianceFrameworks;
        let totalCoverage = 0;
        let totalAutomation = 0;
        let count = 0;
        
        selectedFrameworks.forEach(framework => {
            const compliance = vendor.compliance.frameworks[framework];
            if (compliance) {
                totalCoverage += compliance.coverage;
                totalAutomation += compliance.automated;
                count++;
            }
        });
        
        return {
            averageCoverage: count > 0 ? totalCoverage / count : 0,
            averageAutomation: count > 0 ? totalAutomation / count : 0,
            frameworks: vendor.compliance.frameworks
        };
    }
    
    calculateSummaryMetrics(vendorResults) {
        const portnoxResults = vendorResults['portnox'];
        const competitorResults = Object.entries(vendorResults)
            .filter(([id]) => id !== 'portnox')
            .map(([id, results]) => results);
        
        const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + r.costs.threeYear, 0) / competitorResults.length;
        const avgCompetitorROI = competitorResults.reduce((sum, r) => sum + parseInt(r.savings.roi), 0) / competitorResults.length;
        
        return {
            totalSavings: avgCompetitorCost - portnoxResults.costs.threeYear,
            percentageSavings: ((avgCompetitorCost - portnoxResults.costs.threeYear) / avgCompetitorCost * 100).toFixed(0),
            roiImprovement: portnoxResults.savings.roi - avgCompetitorROI,
            paybackPeriod: portnoxResults.savings.paybackMonths,
            riskReduction: portnoxResults.risk.reduction,
            complianceCoverage: portnoxResults.compliance.averageCoverage
        };
    }
    
    calculateFinancialMetrics(vendorResults) {
        return {
            tcoComparison: Object.entries(vendorResults).map(([id, results]) => ({
                vendor: this.vendorData[id].shortName,
                firstYear: results.costs.firstYear,
                threeYear: results.costs.threeYear,
                perDevice: results.costs.perDevice,
                roi: results.savings.roi
            })),
            savingsBreakdown: {
                licensing: this.calculateLicensingSavings(vendorResults),
                operational: this.calculateOperationalSavings(vendorResults),
                risk: this.calculateRiskSavings(vendorResults),
                total: this.calculateTotalSavings(vendorResults)
            }
        };
    }
    
    calculateSecurityMetrics(vendorResults) {
        return Object.entries(vendorResults).map(([id, results]) => ({
            vendor: this.vendorData[id].shortName,
            securityScore: results.security.score,
            zeroTrustScore: results.security.zeroTrust,
            riskReduction: results.risk.reduction,
            capabilities: results.security.capabilities
        }));
    }
    
    calculateComplianceMetrics(vendorResults) {
        return Object.entries(vendorResults).map(([id, results]) => ({
            vendor: this.vendorData[id].shortName,
            coverage: results.compliance.averageCoverage,
            automation: results.compliance.averageAutomation,
            frameworks: results.compliance.frameworks
        }));
    }
    
    calculateRiskMetrics(vendorResults) {
        const scenarios = this.riskScenarios;
        const metrics = {};
        
        Object.entries(scenarios).forEach(([scenarioId, scenario]) => {
            metrics[scenarioId] = {
                name: scenario.name,
                baseline: scenario.probability.baseline,
                withNac: {},
                impact: scenario.impact
            };
            
            Object.entries(vendorResults).forEach(([vendorId, results]) => {
                const vendor = this.vendorData[vendorId];
                const effectiveness = scenario.nacMitigation.effectiveness * 
                                    (vendor.security.overallSecurityScore / 100);
                
                metrics[scenarioId].withNac[vendorId] = {
                    probability: scenario.probability.baseline * (1 - effectiveness / 100),
                    reduction: effectiveness,
                    financialImpact: scenario.impact.financial * (1 - effectiveness / 100)
                };
            });
        });
        
        return metrics;
    }
    
    calculateImplementationMetrics(vendorResults) {
        return Object.entries(vendorResults).map(([id, results]) => ({
            vendor: this.vendorData[id].shortName,
            deploymentDays: results.operational.implementationDays,
            fteRequired: results.operational.fteRequired,
            complexity: this.calculateImplementationComplexity(id),
            milestones: this.generateImplementationMilestones(id)
        }));
    }
    
    calculateImplementationComplexity(vendorId) {
        const vendor = this.vendorData[vendorId];
        let complexity = 0;
        
        // Architecture complexity
        if (vendor.architecture.includes('On-Premises')) complexity += 40;
        else if (vendor.architecture.includes('Hybrid')) complexity += 20;
        else complexity += 10;
        
        // Integration complexity
        complexity += (100 - vendor.metrics.integrationEffort) / 2;
        
        // Training complexity
        complexity += vendor.metrics.trainingHours / 2;
        
        return Math.min(100, complexity);
    }
    
    generateImplementationMilestones(vendorId) {
        const vendor = this.vendorData[vendorId];
        const milestones = [];
        
        if (vendor.architecture.includes('Cloud')) {
            milestones.push(
                { week: 1, task: 'Account setup and initial configuration' },
                { week: 1, task: 'Network integration planning' },
                { week: 2, task: 'Pilot deployment (10% of devices)' },
                { week: 3, task: 'Policy configuration and testing' },
                { week: 4, task: 'Full deployment rollout' }
            );
        } else {
            milestones.push(
                { week: 1, task: 'Hardware procurement and setup' },
                { week: 3, task: 'Software installation and configuration' },
                { week: 5, task: 'Network integration and testing' },
                { week: 8, task: 'Pilot deployment' },
                { week: 12, task: 'Full deployment complete' }
            );
        }
        
        return milestones;
    }
    
    calculateLicensingSavings(vendorResults) {
        const portnox = vendorResults['portnox'];
        const competitors = Object.entries(vendorResults)
            .filter(([id]) => id !== 'portnox')
            .map(([id, results]) => results);
        
        const avgLicensing = competitors.reduce((sum, r) => sum + r.costs.licensing, 0) / competitors.length;
        return avgLicensing - portnox.costs.licensing;
    }
    
    calculateOperationalSavings(vendorResults) {
        const portnox = vendorResults['portnox'];
        const competitors = Object.entries(vendorResults)
            .filter(([id]) => id !== 'portnox')
            .map(([id, results]) => results);
        
        const avgOperational = competitors.reduce((sum, r) => sum + r.costs.operational * 3, 0) / competitors.length;
        return avgOperational - (portnox.costs.operational * 3);
    }
    
    calculateRiskSavings(vendorResults) {
        const portnox = vendorResults['portnox'];
        return portnox.risk.totalRiskValue;
    }
    
    calculateTotalSavings(vendorResults) {
        return this.calculateLicensingSavings(vendorResults) +
               this.calculateOperationalSavings(vendorResults) +
               this.calculateRiskSavings(vendorResults);
    }
    
    generateRecommendations(results) {
        const recommendations = [];
        
        // Primary recommendation
        recommendations.push({
            priority: 'High',
            title: 'Adopt Portnox Cloud for Maximum ROI',
            description: `Based on your analysis, Portnox Cloud delivers ${results.summary.percentageSavings}% cost savings with a ${results.summary.paybackPeriod}-month payback period.`,
            impact: 'Financial',
            action: 'Schedule a demonstration to validate fit'
        });
        
        // Compliance recommendation
        if (this.config.complianceFrameworks.length > 2) {
            recommendations.push({
                priority: 'High',
                title: 'Leverage Automated Compliance',
                description: 'With multiple compliance requirements, Portnox\'s automated compliance reporting can save 40+ hours monthly.',
                impact: 'Operational',
                action: 'Review compliance automation features'
            });
        }
        
        // Security recommendation
        if (results.summary.riskReduction > 80) {
            recommendations.push({
                priority: 'Medium',
                title: 'Enhance Cyber Insurance Position',
                description: `${results.summary.riskReduction}% risk reduction qualifies for premium reductions up to 28%.`,
                impact: 'Risk',
                action: 'Discuss with insurance provider'
            });
        }
        
        // Industry-specific recommendation
        const industry = this.industryData[this.config.industry];
        if (industry.specificChallenges.length > 0) {
            recommendations.push({
                priority: 'Medium',
                title: `Address ${industry.name} Challenges`,
                description: `Focus on: ${industry.specificChallenges[0]}`,
                impact: 'Strategic',
                action: 'Review industry-specific features'
            });
        }
        
        return recommendations;
    }
    
    updateExecutiveKPIs(results) {
        const kpiContainer = document.getElementById('executive-kpis');
        if (!kpiContainer) return;
        
        const kpis = [
            {
                icon: 'fa-piggy-bank',
                value: Math.round(results.summary.totalSavings / 1000),
                suffix: 'K',
                label: 'Total Savings',
                sublabel: '3-Year TCO Reduction',
                trend: `${results.summary.percentageSavings}% Lower`,
                color: 'success'
            },
            {
                icon: 'fa-chart-line',
                value: results.vendors['portnox'].savings.roi,
                suffix: '%',
                label: 'ROI',
                sublabel: '3-Year Return',
                trend: `${results.summary.paybackPeriod} Month Payback`,
                color: 'primary'
            },
            {
                icon: 'fa-shield-alt',
                value: results.summary.riskReduction,
                suffix: '%',
                label: 'Risk Reduction',
                sublabel: 'Security Improvement',
                trend: 'Enterprise Grade',
                color: 'warning'
            },
            {
                icon: 'fa-clipboard-check',
                value: Math.round(results.summary.complianceCoverage),
                suffix: '%',
                label: 'Compliance',
                sublabel: 'Automated Coverage',
                trend: `${this.config.complianceFrameworks.length} Frameworks`,
                color: 'info'
            },
            {
                icon: 'fa-clock',
                value: results.vendors['portnox'].operational.implementationDays,
                suffix: ' Days',
                label: 'Time to Value',
                sublabel: 'Implementation Speed',
                trend: '75% Faster',
                color: 'secondary'
            },
            {
                icon: 'fa-users',
                value: results.vendors['portnox'].operational.fteRequired,
                suffix: ' FTE',
                label: 'Resources',
                sublabel: 'IT Staff Required',
                trend: '87% Reduction',
                color: 'danger'
            }
        ];
        
        kpiContainer.innerHTML = kpis.map((kpi, index) => `
            <div class="kpi-card hover-lift animate-fade-in-up" style="animation-delay: ${index * 0.1}s">
                <div class="kpi-header">
                    <div class="kpi-icon bg-${kpi.color}">
                        <i class="fas ${kpi.icon}"></i>
                    </div>
                    <div class="kpi-trend ${kpi.color}">
                        <i class="fas fa-arrow-up"></i>
                        ${kpi.trend}
                    </div>
                </div>
                <div class="kpi-body">
                    <div class="kpi-value">
                        <span class="value-number" data-value="${kpi.value}">0</span>
                        <span class="value-suffix">${kpi.suffix}</span>
                    </div>
                    <div class="kpi-label">${kpi.label}</div>
                    <div class="kpi-sublabel">${kpi.sublabel}</div>
                </div>
                <div class="kpi-footer">
                    <div class="kpi-sparkline" id="sparkline-${index}"></div>
                </div>
            </div>
        `).join('');
        
        // Animate KPI values
        setTimeout(() => {
            document.querySelectorAll('.value-number').forEach(element => {
                const targetValue = parseInt(element.getAttribute('data-value'));
                this.animateValue(element, 0, targetValue, 1500);
            });
            
            // Create mini sparklines
            this.createSparklines(results);
        }, 100);
    }
    
    createSparklines(results) {
        // Create small trend charts for each KPI
        // This would use a charting library like Chart.js or D3.js
        // For now, we'll create simple CSS-based sparklines
        document.querySelectorAll('.kpi-sparkline').forEach((container, index) => {
            const data = this.generateSparklineData(index);
            container.innerHTML = `
                <svg viewBox="0 0 100 30" class="sparkline-svg">
                    <polyline points="${data}" fill="none" stroke="currentColor" stroke-width="2"/>
                </svg>
            `;
        });
    }
    
    generateSparklineData(index) {
        // Generate sample trend data for sparklines
        const points = [];
        for (let i = 0; i <= 10; i++) {
            const x = i * 10;
            const y = 25 - (Math.random() * 20 + i * 1.5);
            points.push(`${x},${y}`);
        }
        return points.join(' ');
    }
    
    triggerResultAnimations() {
        // Add animation classes to elements
        document.querySelectorAll('.animate-fade-in-up').forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animated');
            }, index * 100);
        });
        
        // Animate progress bars
        document.querySelectorAll('.progress-bar').forEach(bar => {
            const width = bar.getAttribute('data-width') || '0';
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 500);
        });
        
        // Animate counters
        this.animateAllCounters();
    }
    
    animateAllCounters() {
        document.querySelectorAll('[data-animate-value]').forEach(element => {
            const targetValue = parseInt(element.getAttribute('data-animate-value'));
            const suffix = element.getAttribute('data-suffix') || '';
            this.animateValue(element, 0, targetValue, 2000, suffix);
        });
    }
    
    // Tab content loaders
    loadExecutiveOverview() {
        const container = document.getElementById('executive-overview-content');
        if (!container || !this.analysisResults) return;
        
        const results = this.analysisResults;
        const portnoxData = results.vendors['portnox'];
        
        container.innerHTML = `
            <div class="executive-overview-layout">
                <!-- Key Insights -->
                <div class="insights-section glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-lightbulb"></i>
                        Executive Insights
                    </h3>
                    <div class="insights-grid">
                        <div class="insight-card">
                            <div class="insight-icon"><i class="fas fa-dollar-sign"></i></div>
                            <div class="insight-content">
                                <h4>Significant Cost Reduction</h4>
                                <p>Portnox Cloud delivers <strong>${results.summary.percentageSavings}% lower TCO</strong> compared to traditional NAC solutions, saving <strong>$${Math.round(results.summary.totalSavings / 1000)}K</strong> over 3 years.</p>
                            </div>
                        </div>
                        <div class="insight-card">
                            <div class="insight-icon"><i class="fas fa-rocket"></i></div>
                            <div class="insight-content">
                                <h4>Rapid Time to Value</h4>
                                <p>Implementation in <strong>${portnoxData.operational.implementationDays} days</strong> vs industry average of 75 days, with <strong>${results.summary.paybackPeriod}-month payback</strong> period.</p>
                            </div>
                        </div>
                        <div class="insight-card">
                            <div class="insight-icon"><i class="fas fa-shield-check"></i></div>
                            <div class="insight-content">
                                <h4>Enhanced Security Posture</h4>
                                <p><strong>${results.summary.riskReduction}% risk reduction</strong> with comprehensive zero trust implementation, potentially avoiding <strong>$${Math.round(portnoxData.risk.avoidedLoss / 1000000)}M</strong> in breach costs.</p>
                            </div>
                        </div>
                        <div class="insight-card">
                            <div class="insight-icon"><i class="fas fa-cogs"></i></div>
                            <div class="insight-content">
                                <h4>Operational Excellence</h4>
                                <p>Requires only <strong>${portnoxData.operational.fteRequired} FTE</strong> vs industry average of 1.5 FTE, freeing IT resources for strategic initiatives.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Visual Comparison Charts -->
                <div class="charts-row">
                    <div class="chart-container glass-morphism hover-lift">
                        <h3 class="chart-title">
                            <i class="fas fa-chart-bar"></i>
                            3-Year TCO Comparison
                        </h3>
                        <div id="tco-comparison-chart" class="chart-wrapper"></div>
                    </div>
                    
                    <div class="chart-container glass-morphism hover-lift">
                        <h3 class="chart-title">
                            <i class="fas fa-chart-pie"></i>
                            Cost Breakdown Analysis
                        </h3>
                        <div id="cost-breakdown-chart" class="chart-wrapper"></div>
                    </div>
                </div>
                
                <!-- Recommendations -->
                <div class="recommendations-section glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-tasks"></i>
                        Strategic Recommendations
                    </h3>
                    <div class="recommendations-grid">
                        ${results.recommendations.map(rec => `
                            <div class="recommendation-card priority-${rec.priority.toLowerCase()}">
                                <div class="rec-header">
                                    <span class="priority-badge">${rec.priority} Priority</span>
                                    <span class="impact-badge">${rec.impact}</span>
                                </div>
                                <h4>${rec.title}</h4>
                                <p>${rec.description}</p>
                                <div class="rec-action">
                                    <strong>Next Step:</strong> ${rec.action}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Quick Actions -->
                <div class="quick-actions glass-morphism">
                    <button class="action-btn primary" onclick="window.portnoxPlatform.scheduleDemo()">
                        <i class="fas fa-calendar-plus"></i>
                        Schedule Executive Briefing
                    </button>
                    <button class="action-btn secondary" onclick="window.portnoxPlatform.exportExecutiveSummary()">
                        <i class="fas fa-file-pdf"></i>
                        Download Executive Summary
                    </button>
                    <button class="action-btn glass" onclick="window.portnoxPlatform.shareResults()">
                        <i class="fas fa-share-alt"></i>
                        Share Results
                    </button>
                </div>
            </div>
        `;
        
        // Create charts
        setTimeout(() => {
            this.createTCOComparisonChart();
            this.createCostBreakdownChart();
        }, 100);
    }
    
    loadFinancialAnalysis() {
        const container = document.getElementById('financial-analysis-content');
        if (!container || !this.analysisResults) return;
        
        const results = this.analysisResults;
        
        container.innerHTML = `
            <div class="financial-analysis-layout">
                <!-- Financial Summary Cards -->
                <div class="financial-summary-grid">
                    <div class="summary-card glass-morphism hover-lift">
                        <div class="card-icon"><i class="fas fa-chart-line"></i></div>
                        <div class="card-content">
                            <h4>Total Cost of Ownership</h4>
                            <div class="metric-value">$${Math.round(results.vendors['portnox'].costs.threeYear / 1000)}K</div>
                            <div class="metric-comparison">
                                <span class="positive">? ${results.summary.percentageSavings}%</span> vs competitors
                            </div>
                        </div>
                    </div>
                    
                    <div class="summary-card glass-morphism hover-lift">
                        <div class="card-icon"><i class="fas fa-percentage"></i></div>
                        <div class="card-content">
                            <h4>Return on Investment</h4>
                            <div class="metric-value">${results.vendors['portnox'].savings.roi}%</div>
                            <div class="metric-comparison">
                                <span class="positive">? ${results.summary.roiImprovement}%</span> vs average
                            </div>
                        </div>
                    </div>
                    
                    <div class="summary-card glass-morphism hover-lift">
                        <div class="card-icon"><i class="fas fa-calendar-alt"></i></div>
                        <div class="card-content">
                            <h4>Payback Period</h4>
                            <div class="metric-value">${results.summary.paybackPeriod} months</div>
                            <div class="metric-comparison">
                                <span class="positive">3x faster</span> than traditional NAC
                            </div>
                        </div>
                    </div>
                    
                    <div class="summary-card glass-morphism hover-lift">
                        <div class="card-icon"><i class="fas fa-piggy-bank"></i></div>
                        <div class="card-content">
                            <h4>Risk-Adjusted Savings</h4>
                            <div class="metric-value">$${Math.round((results.summary.totalSavings + results.vendors['portnox'].risk.totalRiskValue) / 1000)}K</div>
                            <div class="metric-comparison">
                                Including avoided losses
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Detailed Cost Analysis -->
                <div class="cost-analysis-section glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-coins"></i>
                        Detailed Cost Analysis
                    </h3>
                    <div class="cost-comparison-table">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Cost Component</th>
                                    ${this.selectedVendors.map(id => `
                                        <th>${this.vendorData[id].shortName}</th>
                                    `).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Software Licensing</td>
                                    ${this.selectedVendors.map(id => `
                                        <td>$${Math.round(results.vendors[id].costs.licensing / 1000)}K</td>
                                    `).join('')}
                                </tr>
                                <tr>
                                    <td>Implementation</td>
                                    ${this.selectedVendors.map(id => `
                                        <td>$${Math.round(results.vendors[id].costs.implementation / 1000)}K</td>
                                    `).join('')}
                                </tr>
                                <tr>
                                    <td>Annual Operations</td>
                                    ${this.selectedVendors.map(id => `
                                        <td>$${Math.round(results.vendors[id].costs.operational / 1000)}K</td>
                                    `).join('')}
                                </tr>
                                <tr>
                                    <td>3-Year Personnel</td>
                                    ${this.selectedVendors.map(id => `
                                        <td>$${Math.round(results.vendors[id].costs.operational * 3 * 0.6 / 1000)}K</td>
                                    `).join('')}
                                </tr>
                                <tr class="total-row">
                                    <td>3-Year Total</td>
                                    ${this.selectedVendors.map(id => `
                                        <td class="${id === 'portnox' ? 'highlight' : ''}">
                                            $${Math.round(results.vendors[id].costs.threeYear / 1000)}K
                                        </td>
                                    `).join('')}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- Financial Charts -->
                <div class="charts-row">
                    <div class="chart-container glass-morphism hover-lift">
                        <h3 class="chart-title">
                            <i class="fas fa-chart-area"></i>
                            Cumulative Cost Over Time
                        </h3>
                        <div id="cumulative-cost-chart" class="chart-wrapper"></div>
                    </div>
                    
                    <div class="chart-container glass-morphism hover-lift">
                        <h3 class="chart-title">
                            <i class="fas fa-chart-bar"></i>
                            ROI Progression
                        </h3>
                        <div id="roi-progression-chart" class="chart-wrapper"></div>
                    </div>
                </div>
                
                <!-- Hidden Costs Analysis -->
                <div class="hidden-costs-section glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-eye-slash"></i>
                        Hidden Cost Analysis
                    </h3>
                    <div class="hidden-costs-grid">
                        <div class="cost-item">
                            <h4>Infrastructure Costs</h4>
                            <p>Portnox: <strong>$0</strong> (Cloud-native)</p>
                            <p>Traditional: <strong>$85K+</strong> (Hardware, power, cooling)</p>
                        </div>
                        <div class="cost-item">
                            <h4>Upgrade Cycles</h4>
                            <p>Portnox: <strong>Included</strong> (Continuous updates)</p>
                            <p>Traditional: <strong>$50K+</strong> every 3 years</p>
                        </div>
                        <div class="cost-item">
                            <h4>Scalability Costs</h4>
                            <p>Portnox: <strong>Linear</strong> (Pay per device)</p>
                            <p>Traditional: <strong>Step function</strong> (Hardware limits)</p>
                        </div>
                        <div class="cost-item">
                            <h4>Downtime Impact</h4>
                            <p>Portnox: <strong>$20K/year</strong> (99.99% SLA)</p>
                            <p>Traditional: <strong>$200K+/year</strong> (Maintenance windows)</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Create financial charts
        setTimeout(() => {
            this.createCumulativeCostChart();
            this.createROIProgressionChart();
        }, 100);
    }
    
    loadSecurityPosture() {
        const container = document.getElementById('security-posture-content');
        if (!container || !this.analysisResults) return;
        
        const results = this.analysisResults;
        
        container.innerHTML = `
            <div class="security-posture-layout">
                <!-- Security Score Overview -->
                <div class="security-overview glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-shield-alt"></i>
                        Security Posture Comparison
                    </h3>
                    <div class="security-scores-grid">
                        ${this.selectedVendors.map(vendorId => {
                            const vendor = this.vendorData[vendorId];
                            const score = vendor.security.overallSecurityScore;
                            return `
                                <div class="security-score-card ${vendorId === 'portnox' ? 'highlighted' : ''}">
                                    <div class="vendor-header">
                                        <img src="${vendor.logo}" alt="${vendor.shortName}" class="vendor-logo-small">
                                        <h4>${vendor.shortName}</h4>
                                    </div>
                                    <div class="score-visual">
                                        <div class="score-circle" data-score="${score}">
                                            <svg viewBox="0 0 200 200">
                                                <circle cx="100" cy="100" r="90" fill="none" stroke="#e0e0e0" stroke-width="20"/>
                                                <circle cx="100" cy="100" r="90" fill="none" stroke="${this.getScoreColor(score)}" 
                                                        stroke-width="20" stroke-dasharray="${score * 5.65} 565" 
                                                        transform="rotate(-90 100 100)"/>
                                            </svg>
                                            <div class="score-text">${score}</div>
                                        </div>
                                    </div>
                                    <div class="score-details">
                                        <div class="detail-item">
                                            <span>Zero Trust:</span>
                                            <strong>${vendor.security.zeroTrustScore}%</strong>
                                        </div>
                                        <div class="detail-item">
                                            <span>Risk Reduction:</span>
                                            <strong>${vendor.riskReduction?.breachProbabilityReduction || 0}%</strong>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <!-- Threat Mitigation Analysis -->
                <div class="threat-analysis glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-exclamation-triangle"></i>
                        Threat Mitigation Effectiveness
                    </h3>
                    <div class="threat-matrix">
                        ${Object.entries(this.riskScenarios).map(([scenarioId, scenario]) => {
                            const portnoxMitigation = results.risk[scenarioId].withNac['portnox'];
                            return `
                                <div class="threat-card">
                                    <div class="threat-header">
                                        <span class="threat-icon">${scenario.icon}</span>
                                        <h4>${scenario.name}</h4>
                                    </div>
                                    <div class="threat-metrics">
                                        <div class="metric">
                                            <label>Baseline Risk:</label>
                                            <span class="risk-value high">${(scenario.probability.baseline * 100).toFixed(0)}%</span>
                                        </div>
                                        <div class="metric">
                                            <label>With Portnox:</label>
                                            <span class="risk-value low">${(portnoxMitigation.probability * 100).toFixed(0)}%</span>
                                        </div>
                                        <div class="metric">
                                            <label>Risk Reduction:</label>
                                            <span class="risk-value positive">${portnoxMitigation.reduction.toFixed(0)}%</span>
                                        </div>
                                        <div class="metric">
                                            <label>Potential Loss Avoided:</label>
                                            <span class="risk-value">$${Math.round(scenario.impact.financial - portnoxMitigation.financialImpact) / 1000}K</span>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <!-- Security Features Comparison -->
                <div class="features-comparison glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-check-circle"></i>
                        Security Capabilities Matrix
                    </h3>
                    <div class="comparison-table-wrapper">
                        <table class="comparison-table">
                            <thead>
                                <tr>
                                    <th>Security Feature</th>
                                    ${this.selectedVendors.map(id => `
                                        <th>${this.vendorData[id].shortName}</th>
                                    `).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                ${this.getSecurityFeatures().map(feature => `
                                    <tr>
                                        <td>${feature.name}</td>
                                        ${this.selectedVendors.map(id => {
                                            const vendor = this.vendorData[id];
                                            const hasFeature = vendor.security[feature.key];
                                            return `
                                                <td class="feature-cell">
                                                    ${hasFeature ? 
                                                        `<i class="fas fa-check-circle text-success"></i>` : 
                                                        `<i class="fas fa-times-circle text-danger"></i>`
                                                    }
                                                </td>
                                            `;
                                        }).join('')}
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- MITRE ATT&CK Coverage -->
                <div class="mitre-coverage glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-chess-board"></i>
                        MITRE ATT&CK Framework Coverage
                    </h3>
                    <div class="mitre-heatmap" id="mitre-heatmap"></div>
                </div>
                
                <!-- Insurance Impact -->
                <div class="insurance-impact glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-umbrella"></i>
                        Cyber Insurance Impact
                    </h3>
                    <div class="insurance-grid">
                        <div class="insurance-card">
                            <h4>Premium Reduction</h4>
                            <div class="premium-comparison">
                                <div class="premium-item">
                                    <label>Current Premium:</label>
                                    <span>$${this.config.insurancePremium.toLocaleString()}</span>
                                </div>
                                <div class="premium-item">
                                    <label>With Portnox NAC:</label>
                                    <span class="positive">$${Math.round(this.config.insurancePremium * 0.72).toLocaleString()}</span>
                                </div>
                                <div class="premium-item highlight">
                                    <label>Annual Savings:</label>
                                    <span>$${Math.round(this.config.insurancePremium * 0.28).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                        <div class="insurance-card">
                            <h4>Coverage Enhancements</h4>
                            <ul class="coverage-list">
                                <li><i class="fas fa-check"></i> Higher coverage limits</li>
                                <li><i class="fas fa-check"></i> Lower deductibles</li>
                                <li><i class="fas fa-check"></i> Broader coverage terms</li>
                                <li><i class="fas fa-check"></i> Faster claim processing</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Create security visualizations
        setTimeout(() => {
            this.createMitreHeatmap();
            this.animateSecurityScores();
        }, 100);
    }
    
    loadComplianceAnalysis() {
        const container = document.getElementById('compliance-analysis-content');
        if (!container || !this.analysisResults) return;
        
        const results = this.analysisResults;
        
        container.innerHTML = `
            <div class="compliance-analysis-layout">
                <!-- Compliance Overview -->
                <div class="compliance-overview glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-clipboard-check"></i>
                        Compliance Framework Coverage
                    </h3>
                    <div class="compliance-summary">
                        <p>Based on your selected frameworks: <strong>${this.config.complianceFrameworks.map(fw => this.complianceData[fw]?.name).join(', ')}</strong></p>
                    </div>
                    <div class="compliance-comparison-chart" id="compliance-comparison-chart"></div>
                </div>
                
                <!-- Framework Details -->
                ${this.config.complianceFrameworks.map(frameworkId => {
                    const framework = this.complianceData[frameworkId];
                    return `
                        <div class="framework-detail glass-morphism hover-lift">
                            <h3 class="section-title">
                                ${framework.icon} ${framework.name}
                            </h3>
                            <div class="framework-coverage">
                                ${this.selectedVendors.map(vendorId => {
                                    const vendor = this.vendorData[vendorId];
                                    const compliance = vendor.compliance.frameworks[frameworkId] || {};
                                    return `
                                        <div class="vendor-compliance-card ${vendorId === 'portnox' ? 'highlighted' : ''}">
                                            <h4>${vendor.shortName}</h4>
                                            <div class="compliance-metrics">
                                                <div class="metric">
                                                    <label>Coverage:</label>
                                                    <div class="progress-bar-container">
                                                        <div class="progress-bar" style="width: ${compliance.coverage || 0}%"></div>
                                                        <span class="progress-text">${compliance.coverage || 0}%</span>
                                                    </div>
                                                </div>
                                                <div class="metric">
                                                    <label>Automation:</label>
                                                    <div class="progress-bar-container">
                                                        <div class="progress-bar automation" style="width: ${compliance.automated || 0}%"></div>
                                                        <span class="progress-text">${compliance.automated || 0}%</span>
                                                    </div>
                                                </div>
                                                <div class="metric">
                                                    <label>Effort Required:</label>
                                                    <span class="effort-badge effort-${(compliance.effort || 'high').toLowerCase()}">${compliance.effort || 'High'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
                
                <!-- Automation Benefits -->
                <div class="automation-benefits glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-robot"></i>
                        Compliance Automation Benefits
                    </h3>
                    <div class="benefits-grid">
                        <div class="benefit-card">
                            <div class="benefit-icon"><i class="fas fa-clock"></i></div>
                            <h4>Time Savings</h4>
                            <div class="benefit-value">40+ hours/month</div>
                            <p>Automated reporting and evidence collection</p>
                        </div>
                        <div class="benefit-card">
                            <div class="benefit-icon"><i class="fas fa-exclamation-circle"></i></div>
                            <h4>Reduced Errors</h4>
                            <div class="benefit-value">95% reduction</div>
                            <p>Eliminate manual configuration mistakes</p>
                        </div>
                        <div class="benefit-card">
                            <div class="benefit-icon"><i class="fas fa-file-alt"></i></div>
                            <h4>Audit Readiness</h4>
                            <div class="benefit-value">Always ready</div>
                            <p>Real-time compliance dashboards</p>
                        </div>
                        <div class="benefit-card">
                            <div class="benefit-icon"><i class="fas fa-dollar-sign"></i></div>
                            <h4>Cost Reduction</h4>
                            <div class="benefit-value">$125K/year</div>
                            <p>Reduced audit and compliance costs</p>
                        </div>
                    </div>
                </div>
                
                <!-- Compliance Roadmap -->
                <div class="compliance-roadmap glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-road"></i>
                        Compliance Implementation Roadmap
                    </h3>
                    <div class="roadmap-timeline">
                        <div class="timeline-item">
                            <div class="timeline-marker">1</div>
                            <div class="timeline-content">
                                <h4>Week 1-2: Initial Assessment</h4>
                                <p>Gap analysis and current state documentation</p>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-marker">2</div>
                            <div class="timeline-content">
                                <h4>Week 3-4: Policy Configuration</h4>
                                <p>Implement compliance-specific policies</p>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-marker">3</div>
                            <div class="timeline-content">
                                <h4>Week 5-6: Testing & Validation</h4>
                                <p>Verify controls and generate reports</p>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-marker">4</div>
                            <div class="timeline-content">
                                <h4>Week 7-8: Full Deployment</h4>
                                <p>Production rollout and monitoring</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Create compliance visualizations
        setTimeout(() => {
            this.createComplianceComparisonChart();
            this.animateProgressBars();
        }, 100);
    }
    
    loadVendorComparison() {
        const container = document.getElementById('vendor-comparison-content');
        if (!container || !this.analysisResults) return;
        
        container.innerHTML = `
            <div class="vendor-comparison-layout">
                <!-- Vendor Matrix -->
                <div class="vendor-matrix glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-table"></i>
                        Comprehensive Vendor Comparison Matrix
                    </h3>
                    <div class="matrix-table-wrapper">
                        <table class="vendor-matrix-table">
                            <thead>
                                <tr>
                                    <th class="category-header">Category</th>
                                    <th class="metric-header">Metric</th>
                                    ${this.selectedVendors.map(id => `
                                        <th class="vendor-header ${id === 'portnox' ? 'highlighted' : ''}">
                                            <img src="${this.vendorData[id].logo}" alt="${this.vendorData[id].shortName}">
                                            <span>${this.vendorData[id].shortName}</span>
                                        </th>
                                    `).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                ${this.generateVendorMatrixRows()}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- Feature Comparison Radar -->
                <div class="feature-radar glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-chart-radar"></i>
                        Feature Capability Analysis
                    </h3>
                    <div id="feature-radar-chart" class="chart-wrapper"></div>
                </div>
                
                <!-- Vendor Strengths & Weaknesses -->
                <div class="vendor-analysis glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-balance-scale-right"></i>
                        Vendor Strengths & Considerations
                    </h3>
                    <div class="vendor-cards-grid">
                        ${this.selectedVendors.map(vendorId => {
                            const vendor = this.vendorData[vendorId];
                            const strengths = this.getVendorStrengths(vendorId);
                            const weaknesses = this.getVendorWeaknesses(vendorId);
                            
                            return `
                                <div class="vendor-analysis-card ${vendorId === 'portnox' ? 'recommended' : ''}">
                                    <div class="vendor-header">
                                        <img src="${vendor.logo}" alt="${vendor.shortName}">
                                        <h4>${vendor.name}</h4>
                                        ${vendorId === 'portnox' ? '<span class="recommended-badge">RECOMMENDED</span>' : ''}
                                    </div>
                                    <div class="strengths">
                                        <h5><i class="fas fa-plus-circle"></i> Strengths</h5>
                                        <ul>
                                            ${strengths.map(s => `<li>${s}</li>`).join('')}
                                        </ul>
                                    </div>
                                    <div class="weaknesses">
                                        <h5><i class="fas fa-minus-circle"></i> Considerations</h5>
                                        <ul>
                                            ${weaknesses.map(w => `<li>${w}</li>`).join('')}
                                        </ul>
                                    </div>
                                    <div class="best-for">
                                        <h5><i class="fas fa-bullseye"></i> Best For</h5>
                                        <p>${this.getVendorBestFor(vendorId)}</p>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <!-- Market Positioning -->
                <div class="market-positioning glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-chart-scatter"></i>
                        Market Positioning Analysis
                    </h3>
                    <div id="market-positioning-chart" class="chart-wrapper"></div>
                </div>
            </div>
        `;
        
        // Create vendor comparison visualizations
        setTimeout(() => {
            this.createFeatureRadarChart();
            this.createMarketPositioningChart();
        }, 100);
    }
    
    loadImplementationRoadmap() {
        const container = document.getElementById('implementation-roadmap-content');
        if (!container || !this.analysisResults) return;
        
        const portnoxImplementation = this.analysisResults.implementation.find(i => i.vendor === 'Portnox');
        
        container.innerHTML = `
            <div class="implementation-roadmap-layout">
                <!-- Implementation Overview -->
                <div class="implementation-overview glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-project-diagram"></i>
                        Portnox Cloud Implementation Strategy
                    </h3>
                    <div class="overview-grid">
                        <div class="overview-card">
                            <div class="card-icon"><i class="fas fa-calendar-alt"></i></div>
                            <h4>Total Duration</h4>
                            <div class="card-value">${portnoxImplementation?.deploymentDays || 21} Days</div>
                            <p>From kickoff to full production</p>
                        </div>
                        <div class="overview-card">
                            <div class="card-icon"><i class="fas fa-users"></i></div>
                            <h4>Resource Requirements</h4>
                            <div class="card-value">${portnoxImplementation?.fteRequired || 0.25} FTE</div>
                            <p>Minimal IT staff involvement</p>
                        </div>
                        <div class="overview-card">
                            <div class="card-icon"><i class="fas fa-tachometer-alt"></i></div>
                            <h4>Complexity Level</h4>
                            <div class="card-value">Low</div>
                            <p>Cloud-native simplicity</p>
                        </div>
                        <div class="overview-card">
                            <div class="card-icon"><i class="fas fa-chart-line"></i></div>
                            <h4>Time to First Value</h4>
                            <div class="card-value">7 Days</div>
                            <p>Initial security improvements</p>
                        </div>
                    </div>
                </div>
                
                <!-- Detailed Timeline -->
                <div class="implementation-timeline glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-stream"></i>
                        Implementation Timeline
                    </h3>
                    <div class="timeline-gantt" id="implementation-gantt"></div>
                    
                    <div class="phase-details">
                        ${this.generateImplementationPhases()}
                    </div>
                </div>
                
                <!-- Prerequisites Checklist -->
                <div class="prerequisites glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-clipboard-list"></i>
                        Prerequisites & Preparation
                    </h3>
                    <div class="checklist-grid">
                        <div class="checklist-section">
                            <h4>Technical Requirements</h4>
                            <ul class="checklist">
                                <li><i class="fas fa-check-square"></i> Network diagram and VLAN documentation</li>
                                <li><i class="fas fa-check-square"></i> Firewall rules for cloud connectivity</li>
                                <li><i class="fas fa-check-square"></i> RADIUS/LDAP integration details</li>
                                <li><i class="fas fa-check-square"></i> Certificate authority access (if using PKI)</li>
                            </ul>
                        </div>
                        <div class="checklist-section">
                            <h4>Organizational Requirements</h4>
                            <ul class="checklist">
                                <li><i class="fas fa-check-square"></i> Executive sponsorship secured</li>
                                <li><i class="fas fa-check-square"></i> IT team briefed on project</li>
                                <li><i class="fas fa-check-square"></i> Change management process defined</li>
                                <li><i class="fas fa-check-square"></i> Communication plan prepared</li>
                            </ul>
                        </div>
                        <div class="checklist-section">
                            <h4>Policy Decisions</h4>
                            <ul class="checklist">
                                <li><i class="fas fa-check-square"></i> Access control policies defined</li>
                                <li><i class="fas fa-check-square"></i> Guest access requirements</li>
                                <li><i class="fas fa-check-square"></i> BYOD policy established</li>
                                <li><i class="fas fa-check-square"></i> Compliance requirements identified</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <!-- Success Factors -->
                <div class="success-factors glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-trophy"></i>
                        Critical Success Factors
                    </h3>
                    <div class="factors-grid">
                        <div class="factor-card">
                            <div class="factor-icon"><i class="fas fa-users"></i></div>
                            <h4>Stakeholder Engagement</h4>
                            <p>Regular communication and involvement of key stakeholders throughout the implementation</p>
                        </div>
                        <div class="factor-card">
                            <div class="factor-icon"><i class="fas fa-chart-line"></i></div>
                            <h4>Phased Approach</h4>
                            <p>Start with pilot group, validate success, then expand to full organization</p>
                        </div>
                        <div class="factor-card">
                            <div class="factor-icon"><i class="fas fa-graduation-cap"></i></div>
                            <h4>Training & Adoption</h4>
                            <p>Comprehensive training for IT staff and end-user communication</p>
                        </div>
                        <div class="factor-card">
                            <div class="factor-icon"><i class="fas fa-sync-alt"></i></div>
                            <h4>Continuous Optimization</h4>
                            <p>Regular policy reviews and adjustments based on analytics</p>
                        </div>
                    </div>
                </div>
                
                <!-- Post-Implementation -->
                <div class="post-implementation glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-rocket"></i>
                        Post-Implementation Optimization
                    </h3>
                    <div class="optimization-timeline">
                        <div class="opt-phase">
                            <h4>Month 1-2: Stabilization</h4>
                            <ul>
                                <li>Monitor system performance</li>
                                <li>Fine-tune policies</li>
                                <li>Address user feedback</li>
                                <li>Expand device coverage</li>
                            </ul>
                        </div>
                        <div class="opt-phase">
                            <h4>Month 3-6: Enhancement</h4>
                            <ul>
                                <li>Implement advanced features</li>
                                <li>Integrate additional systems</li>
                                <li>Optimize compliance reporting</li>
                                <li>Expand automation</li>
                            </ul>
                        </div>
                        <div class="opt-phase">
                            <h4>Month 6+: Innovation</h4>
                            <ul>
                                <li>Leverage AI insights</li>
                                <li>Implement zero trust fully</li>
                                <li>Advanced threat hunting</li>
                                <li>Continuous improvement</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Create implementation visualizations
        setTimeout(() => {
            this.createImplementationGantt();
        }, 100);
    }
    
    loadIndustryInsights() {
        const container = document.getElementById('industry-insights-content');
        if (!container || !this.analysisResults) return;
        
        const industry = this.industryData[this.config.industry];
        
        container.innerHTML = `
            <div class="industry-insights-layout">
                <!-- Industry Overview -->
                <div class="industry-overview glass-morphism hover-lift">
                    <h3 class="section-title">
                        ${industry.icon} ${industry.name} Industry Analysis
                    </h3>
                    <div class="industry-metrics">
                        <div class="metric-card">
                            <label>Average Breach Cost</label>
                            <div class="metric-value">$${(industry.breachCost / 1000000).toFixed(1)}M</div>
                        </div>
                        <div class="metric-card">
                            <label>Risk Multiplier</label>
                            <div class="metric-value">${industry.riskMultiplier}x</div>
                        </div>
                        <div class="metric-card">
                            <label>Compliance Weight</label>
                            <div class="metric-value">${industry.complianceWeight}x</div>
                        </div>
                        <div class="metric-card">
                            <label>Downtime Impact</label>
                            <div class="metric-value">$${industry.downTimeImpact?.toLocaleString()}/hr</div>
                        </div>
                    </div>
                </div>
                
                <!-- Industry-Specific Challenges -->
                <div class="industry-challenges glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-exclamation-triangle"></i>
                        Industry-Specific Challenges
                    </h3>
                    <div class="challenges-grid">
                        ${industry.specificChallenges.map(challenge => `
                            <div class="challenge-card">
                                <div class="challenge-icon"><i class="fas fa-puzzle-piece"></i></div>
                                <h4>${challenge}</h4>
                                <p>${this.getChallengeSolution(challenge)}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Regulatory Requirements -->
                <div class="regulatory-requirements glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-gavel"></i>
                        Regulatory Compliance Requirements
                    </h3>
                    <div class="regulations-grid">
                        ${industry.regulatoryRequirements.map(reg => {
                            const compliance = this.complianceData[reg.toLowerCase().replace(/\s+/g, '-')] || {};
                            return `
                                <div class="regulation-card">
                                    <h4>${reg}</h4>
                                    <p>${compliance.description || 'Industry-specific regulation'}</p>
                                    <div class="portnox-coverage">
                                        <span class="coverage-label">Portnox Coverage:</span>
                                        <span class="coverage-value">${this.getPortnoxComplianceCoverage(reg)}%</span>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <!-- Industry Best Practices -->
                <div class="best-practices glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-award"></i>
                        NAC Best Practices for ${industry.name}
                    </h3>
                    <div class="practices-list">
                        ${industry.nacPriorities.map((priority, index) => `
                            <div class="practice-item">
                                <div class="practice-number">${index + 1}</div>
                                <div class="practice-content">
                                    <h4>${priority}</h4>
                                    <p>${this.getBestPracticeDetail(priority, industry.name)}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Analyst Insights -->
                <div class="analyst-insights glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-chart-line"></i>
                        Industry Analyst Insights
                    </h3>
                    <div class="analyst-cards">
                        ${this.analystInsights.filter(insight => 
                            insight.insights.some(i => i.relevance > 85)
                        ).slice(0, 3).map(analyst => `
                            <div class="analyst-card">
                                <div class="analyst-header">
                                    <img src="${analyst.logo}" alt="${analyst.firm}" class="analyst-logo">
                                    <div class="analyst-info">
                                        <h4>${analyst.firm}</h4>
                                        <p>${analyst.report}</p>
                                    </div>
                                </div>
                                <div class="analyst-quote">
                                    <i class="fas fa-quote-left"></i>
                                    <p>${analyst.insights[0].quote}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Peer Comparison -->
                <div class="peer-comparison glass-morphism hover-lift">
                    <h3 class="section-title">
                        <i class="fas fa-building"></i>
                        How You Compare to ${industry.name} Peers
                    </h3>
                    <div class="comparison-metrics">
                        <div class="comparison-item">
                            <label>Device Count</label>
                            <div class="comparison-bar">
                                <div class="industry-avg" style="width: 60%">
                                    <span>Industry Avg: ${industry.avgDevices}</span>
                                </div>
                                <div class="your-value" style="left: ${(this.config.deviceCount / industry.avgDevices * 60)}%">
                                    <span>You: ${this.config.deviceCount}</span>
                                </div>
                            </div>
                        </div>
                        <div class="comparison-item">
                            <label>Security Maturity</label>
                            <div class="comparison-bar">
                                <div class="industry-avg" style="width: 45%">
                                    <span>Industry Avg: Medium</span>
                                </div>
                                <div class="your-value" style="left: 85%">
                                    <span>With Portnox: Advanced</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Helper methods for content generation
    getSecurityFeatures() {
        return [
            { key: 'zeroTrustScore', name: 'Zero Trust Architecture' },
            { key: 'riskAssessmentReal', name: 'Real-time Risk Assessment' },
            { key: 'automatedRemediation', name: 'Automated Remediation' },
            { key: 'threatIntelligence', name: 'Threat Intelligence' },
            { key: 'behavioralAnalytics', name: 'Behavioral Analytics' },
            { key: 'microsegmentation', name: 'Microsegmentation' },
            { key: 'dlpIntegration', name: 'DLP Integration' },
            { key: 'siemIntegration', name: 'SIEM Integration' },
            { key: 'xdrCapabilities', name: 'XDR Capabilities' },
            { key: 'forensicsCapability', name: 'Forensics Capability' }
        ];
    }
    
    getScoreColor(score) {
        if (score >= 90) return '#4CAF50';
        if (score >= 80) return '#8BC34A';
        if (score >= 70) return '#FFC107';
        if (score >= 60) return '#FF9800';
        return '#F44336';
    }
    
    generateVendorMatrixRows() {
        const categories = [
            {
                name: 'Financial',
                metrics: [
                    { key: 'tco3Year', label: '3-Year TCO', format: 'currency' },
                    { key: 'roi', label: 'ROI (%)', format: 'percentage' },
                    { key: 'paybackMonths', label: 'Payback Period', format: 'months' },
                    { key: 'perDeviceCost', label: 'Cost per Device', format: 'currency' }
                ]
            },
            {
                name: 'Operational',
                metrics: [
                    { key: 'deploymentTime', label: 'Deployment Time', format: 'days' },
                    { key: 'fteRequired', label: 'FTE Required', format: 'number' },
                    { key: 'availability', label: 'Availability', format: 'percentage' },
                    { key: 'maintenanceEffort', label: 'Maintenance Effort', format: 'text' }
                ]
            },
            {
                name: 'Security',
                metrics: [
                    { key: 'securityScore', label: 'Security Score', format: 'score' },
                    { key: 'zeroTrustScore', label: 'Zero Trust Score', format: 'score' },
                    { key: 'riskReduction', label: 'Risk Reduction', format: 'percentage' },
                    { key: 'threatResponse', label: 'Threat Response', format: 'text' }
                ]
            },
            {
                name: 'Architecture',
                metrics: [
                    { key: 'deploymentModel', label: 'Deployment Model', format: 'text' },
                    { key: 'scalability', label: 'Scalability', format: 'text' },
                    { key: 'cloudNative', label: 'Cloud Native', format: 'boolean' },
                    { key: 'globalAvailability', label: 'Global Availability', format: 'boolean' }
                ]
            }
        ];
        
        let rows = '';
        categories.forEach(category => {
            category.metrics.forEach((metric, index) => {
                rows += '<tr>';
                if (index === 0) {
                    rows += `<td rowspan="${category.metrics.length}" class="category-cell">${category.name}</td>`;
                }
                rows += `<td class="metric-cell">${metric.label}</td>`;
                
                this.selectedVendors.forEach(vendorId => {
                    const value = this.getVendorMetricValue(vendorId, metric);
                    const isWinner = this.isMetricWinner(vendorId, metric, this.selectedVendors);
                    rows += `<td class="value-cell ${isWinner ? 'winner' : ''} ${vendorId === 'portnox' ? 'portnox-cell' : ''}">${value}</td>`;
                });
                
                rows += '</tr>';
            });
        });
        
        return rows;
    }
    
    getVendorMetricValue(vendorId, metric) {
        const vendor = this.vendorData[vendorId];
        const results = this.analysisResults?.vendors[vendorId];
        
        let value;
        switch (metric.key) {
            case 'tco3Year':
                value = results?.costs.threeYear || 0;
                return '$' + Math.round(value / 1000) + 'K';
            case 'roi':
                return (results?.savings.roi || 0) + '%';
            case 'paybackMonths':
                return (results?.savings.paybackMonths || 0) + ' months';
            case 'perDeviceCost':
                value = results?.costs.perDevice || 0;
                return '$' + Math.round(value);
            case 'deploymentTime':
                return vendor.metrics.deploymentTime + ' days';
            case 'fteRequired':
                return vendor.metrics.fteRequired;
            case 'availability':
                return vendor.metrics.availability + '%';
            case 'maintenanceEffort':
                return vendor.metrics.patchingEffort || 'High';
            case 'securityScore':
                return vendor.security.overallSecurityScore + '/100';
            case 'zeroTrustScore':
                return vendor.security.zeroTrustScore + '/100';
            case 'riskReduction':
                return (vendor.riskReduction?.breachProbabilityReduction || 0) + '%';
            case 'threatResponse':
                return vendor.security.automatedRemediation ? 'Automated' : 'Manual';
            case 'deploymentModel':
                return vendor.deploymentModel;
            case 'scalability':
                return vendor.metrics.scalability || 'Limited';
            case 'cloudNative':
                return vendor.architecture.includes('Cloud') ? '?' : '?';
            case 'globalAvailability':
                return vendor.metrics.globalReach ? '?' : '?';
            default:
                return 'N/A';
        }
    }
    
    isMetricWinner(vendorId, metric, vendorList) {
        // Logic to determine if this vendor has the best value for this metric
        if (vendorId === 'portnox') {
            // Portnox wins most metrics in this scenario
            return ['tco3Year', 'roi', 'paybackMonths', 'deploymentTime', 'fteRequired', 
                   'securityScore', 'zeroTrustScore', 'riskReduction'].includes(metric.key);
        }
        return false;
    }
    
    getVendorStrengths(vendorId) {
        const strengths = {
            'portnox': [
                'Lowest TCO with 53% cost savings',
                'Fastest implementation (21 days)',
                'Highest security score (95/100)',
                'Cloud-native architecture',
                'Minimal resource requirements (0.25 FTE)',
                'Comprehensive compliance automation'
            ],
            'cisco': [
                'Market leader position',
                'Extensive feature set',
                'Large ecosystem',
                'Enterprise-grade capabilities',
                'Mature platform'
            ],
            'aruba': [
                'Good BYOD capabilities',
                'Strong wireless integration',
                'HPE ecosystem benefits',
                'Established vendor'
            ],
            'forescout': [
                'Excellent device visibility',
                'Agentless discovery',
                'OT/IoT device support',
                'Good integration options'
            ],
            'fortinet': [
                'Security fabric integration',
                'Good threat intelligence',
                'Unified management',
                'Strong firewall integration'
            ]
        };
        
        return strengths[vendorId] || ['Standard NAC capabilities'];
    }
    
    getVendorWeaknesses(vendorId) {
        const weaknesses = {
            'portnox': [
                'Newer player in market',
                'Less brand recognition vs legacy vendors'
            ],
            'cisco': [
                'High complexity and cost',
                'Requires significant expertise',
                'Long implementation time',
                'Hardware dependencies',
                'High operational overhead'
            ],
            'aruba': [
                'Limited cloud capabilities',
                'Complex licensing',
                'Hardware requirements',
                'Higher TCO'
            ],
            'forescout': [
                'Limited NAC features',
                'No cloud RADIUS',
                'Complex deployment',
                'Higher costs'
            ],
            'fortinet': [
                'Best with Fortinet stack',
                'Limited standalone value',
                'On-premises focused'
            ]
        };
        
        return weaknesses[vendorId] || ['Legacy architecture limitations'];
    }
    
    getVendorBestFor(vendorId) {
        const bestFor = {
            'portnox': 'Organizations seeking modern cloud-native NAC with lowest TCO, fastest deployment, and comprehensive security',
            'cisco': 'Large enterprises with existing Cisco infrastructure and dedicated security teams',
            'aruba': 'Organizations with HPE/Aruba wireless infrastructure seeking integrated solutions',
            'forescout': 'Environments requiring deep device visibility and OT/IoT discovery',
            'fortinet': 'Organizations with existing Fortinet security fabric deployment'
        };
        
        return bestFor[vendorId] || 'Specific use cases';
    }
    
    generateImplementationPhases() {
        return `
            <div class="phase-card">
                <div class="phase-header">
                    <div class="phase-number">1</div>
                    <h4>Planning & Design (Week 1)</h4>
                </div>
                <div class="phase-content">
                    <ul>
                        <li>Kickoff meeting and requirements gathering</li>
                        <li>Network assessment and documentation review</li>
                        <li>Policy design and approval</li>
                        <li>Integration planning</li>
                    </ul>
                </div>
            </div>
            
            <div class="phase-card">
                <div class="phase-header">
                    <div class="phase-number">2</div>
                    <h4>Initial Configuration (Week 2)</h4>
                </div>
                <div class="phase-content">
                    <ul>
                        <li>Portnox Cloud account setup</li>
                        <li>Network integration configuration</li>
                        <li>Authentication source integration (AD/LDAP)</li>
                        <li>Initial policy configuration</li>
                    </ul>
                </div>
            </div>
            
            <div class="phase-card">
                <div class="phase-header">
                    <div class="phase-number">3</div>
                    <h4>Pilot Deployment (Week 3)</h4>
                </div>
                <div class="phase-content">
                    <ul>
                        <li>Deploy to pilot group (10% of devices)</li>
                        <li>Monitor and collect feedback</li>
                        <li>Policy refinement</li>
                        <li>User communication</li>
                    </ul>
                </div>
            </div>
            
            <div class="phase-card">
                <div class="phase-header">
                    <div class="phase-number">4</div>
                    <h4>Full Rollout (Week 4)</h4>
                </div>
                <div class="phase-content">
                    <ul>
                        <li>Phased deployment to all devices</li>
                        <li>Help desk enablement</li>
                        <li>Monitoring and optimization</li>
                        <li>Documentation and handover</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    getChallengeSolution(challenge) {
        const solutions = {
            'Legacy medical equipment integration': 'Portnox provides agentless NAC with MAC authentication bypass for devices that cannot support 802.1X',
            'Complex vendor ecosystem': 'Centralized vendor access management with time-limited, audited access',
            'Life-critical system protection': 'Microsegmentation and continuous monitoring without impacting device operation',
            'BYOD medical staff requirements': 'Automated BYOD onboarding with compliance checking and certificate deployment',
            'Multi-site coordination': 'Cloud-based centralized management across all locations',
            'High-frequency trading systems': 'Ultra-low latency enforcement with no inline deployment required',
            'ATM and branch security': 'Secure segmentation of financial devices with real-time monitoring',
            'Third-party fintech integration': 'API-based access control with granular permissions',
            'Real-time fraud detection': 'Behavioral analytics and anomaly detection integration',
            'Cross-border compliance': 'Multi-region deployment with data residency controls'
        };
        
        return solutions[challenge] || 'Portnox provides flexible policies to address this challenge';
    }
    
    getBestPracticeDetail(practice, industryName) {
        const details = {
            'Medical device security': 'Implement device profiling and segmentation to isolate medical devices while maintaining clinical workflow efficiency',
            'PHI protection': 'Enforce encryption and access controls for all devices accessing patient health information',
            'Compliance automation': 'Leverage automated reporting for HIPAA, HITECH, and other healthcare regulations',
            'Vendor access': 'Implement time-limited, audited access for medical device vendors and third parties',
            'Zero trust': 'Deploy continuous verification of all devices and users accessing clinical systems',
            'Cloud integration': 'Enable secure API-based integrations with cloud services and SaaS applications',
            'API security': 'Implement OAuth and certificate-based authentication for all API access',
            'Developer access': 'Provide flexible, secure access for development environments with isolation',
            'DevOps security': 'Integrate NAC with CI/CD pipelines for automated security validation'
        };
        
        return details[practice] || `Implement ${practice} best practices specific to ${industryName}`;
    }
    
    getPortnoxComplianceCoverage(regulation) {
        const coverage = {
            'HIPAA': 94,
            'GDPR': 96,
            'PCI DSS': 96,
            'SOX': 92,
            'NIST': 98,
            'ISO 27001': 95,
            'CMMC': 93,
            'NERC CIP': 88,
            'FedRAMP': 89,
            'FISMA': 91
        };
        
        return coverage[regulation] || 90;
    }
    
    // Chart creation methods
    createTCOComparisonChart() {
        const container = document.getElementById('tco-comparison-chart');
        if (!container) return;
        
        const data = this.selectedVendors.map(vendorId => ({
            name: this.vendorData[vendorId].shortName,
            value: this.analysisResults.vendors[vendorId].costs.threeYear,
            color: this.vendorData[vendorId].color
        }));
        
        // Here you would use your preferred charting library (Highcharts, Chart.js, etc.)
        // For this example, I'll create a simple bar chart visualization
        container.innerHTML = `
            <div class="simple-bar-chart">
                ${data.map(item => `
                    <div class="bar-item">
                        <div class="bar-label">${item.name}</div>
                        <div class="bar-container">
                            <div class="bar" style="width: ${(item.value / Math.max(...data.map(d => d.value))) * 100}%; background: ${item.color}">
                                <span class="bar-value">$${Math.round(item.value / 1000)}K</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    createCostBreakdownChart() {
        const container = document.getElementById('cost-breakdown-chart');
        if (!container) return;
        
        const portnoxCosts = this.analysisResults.vendors['portnox'].costs;
        const breakdown = [
            { label: 'Licensing', value: portnoxCosts.licensing * 3, color: '#3498db' },
            { label: 'Implementation', value: portnoxCosts.implementation, color: '#e74c3c' },
            { label: 'Operations', value: portnoxCosts.operational * 3, color: '#f39c12' },
            { label: 'Training', value: this.vendorData['portnox'].costs.training, color: '#27ae60' }
        ];
        
        const total = breakdown.reduce((sum, item) => sum + item.value, 0);
        
        container.innerHTML = `
            <div class="pie-chart-container">
                <div class="pie-chart">
                    ${breakdown.map((item, index) => {
                        const percentage = (item.value / total * 100).toFixed(1);
                        const rotation = breakdown.slice(0, index).reduce((sum, i) => sum + (i.value / total * 360), 0);
                        return `
                            <div class="pie-slice" style="
                                transform: rotate(${rotation}deg);
                                --percentage: ${percentage}%;
                                --color: ${item.color};
                            "></div>
                        `;
                    }).join('')}
                </div>
                <div class="pie-legend">
                    ${breakdown.map(item => `
                        <div class="legend-item">
                            <span class="legend-color" style="background: ${item.color}"></span>
                            <span class="legend-label">${item.label}</span>
                            <span class="legend-value">$${Math.round(item.value / 1000)}K (${(item.value / total * 100).toFixed(1)}%)</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    createCumulativeCostChart() {
        // Implementation for cumulative cost chart
        const container = document.getElementById('cumulative-cost-chart');
        if (!container) return;
        
        // This would typically use a line chart from your charting library
        container.innerHTML = '<p>Cumulative cost visualization would be rendered here</p>';
    }
    
    createROIProgressionChart() {
        // Implementation for ROI progression chart
        const container = document.getElementById('roi-progression-chart');
        if (!container) return;
        
        container.innerHTML = '<p>ROI progression visualization would be rendered here</p>';
    }
    
    createMitreHeatmap() {
        // Implementation for MITRE ATT&CK heatmap
        const container = document.getElementById('mitre-heatmap');
        if (!container) return;
        
        container.innerHTML = '<p>MITRE ATT&CK coverage heatmap would be rendered here</p>';
    }
    
    createComplianceComparisonChart() {
        // Implementation for compliance comparison chart
        const container = document.getElementById('compliance-comparison-chart');
        if (!container) return;
        
        container.innerHTML = '<p>Compliance comparison visualization would be rendered here</p>';
    }
    
    createFeatureRadarChart() {
        // Implementation for feature radar chart
        const container = document.getElementById('feature-radar-chart');
        if (!container) return;
        
        container.innerHTML = '<p>Feature capability radar chart would be rendered here</p>';
    }
    
    createMarketPositioningChart() {
        // Implementation for market positioning chart
        const container = document.getElementById('market-positioning-chart');
        if (!container) return;
        
        container.innerHTML = '<p>Market positioning scatter plot would be rendered here</p>';
    }
    
    createImplementationGantt() {
        // Implementation for Gantt chart
        const container = document.getElementById('implementation-gantt');
        if (!container) return;
        
        container.innerHTML = '<p>Implementation Gantt chart would be rendered here</p>';
    }
    
    animateSecurityScores() {
        // Animate the circular progress indicators
        document.querySelectorAll('.score-circle').forEach(circle => {
            const score = parseInt(circle.getAttribute('data-score'));
            const circumference = 2 * Math.PI * 90;
            const offset = circumference - (score / 100 * circumference);
            
            setTimeout(() => {
                const progressCircle = circle.querySelector('circle:last-child');
                if (progressCircle) {
                    progressCircle.style.strokeDashoffset = offset;
                }
            }, 500);
        });
    }
    
    animateProgressBars() {
        document.querySelectorAll('.progress-bar').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
                bar.style.transition = 'width 1.5s ease-out';
            }, 100);
        });
    }
    
    // Export and action methods
    exportComprehensiveReport() {
        console.log('Exporting comprehensive report...');
        // Implementation for report export
        this.showNotification('Generating comprehensive report...', 'info');
        
        // Simulate report generation
        setTimeout(() => {
            this.showNotification('Report generated successfully!', 'success');
            // Here you would trigger the actual download
        }, 2000);
    }
    
    exportExecutiveSummary() {
        console.log('Exporting executive summary...');
        this.showNotification('Generating executive summary...', 'info');
    }
    
    scheduleDemo() {
        console.log('Opening demo scheduler...');
        // Here you would open a calendar integration or form
        window.open('https://www.portnox.com/request-demo/', '_blank');
    }
    
    shareResults() {
        console.log('Sharing results...');
        // Implementation for sharing functionality
        if (navigator.share) {
            navigator.share({
                title: 'Portnox NAC Analysis Results',
                text: 'Check out my Zero Trust NAC analysis results',
                url: window.location.href
            });
        } else {
            this.showNotification('Copy link to share: ' + window.location.href, 'info');
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type} animate-slide-in`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
    
    showErrorMessage(message) {
        const container = document.querySelector('#executive-view .view-content');
        if (container) {
            container.innerHTML = `
                <div class="error-message glass-morphism">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h2>Error</h2>
                    <p>${message}</p>
                    <button onclick="location.reload()" class="action-btn primary">
                        <i class="fas fa-redo"></i> Reload
                    </button>
                </div>
            `;
        }
    }
    
    startAnimations() {
        // Add initial animation classes
        document.querySelectorAll('.animate-fade-in').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 100);
        });
        
        // Setup intersection observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.hover-lift').forEach(el => {
            observer.observe(el);
        });
    }
    
    initializeAdvancedCharts() {
        // This method would initialize any chart libraries
        console.log('Charts would be initialized here with actual charting library');
    }
}

// Initialize the platform
document.addEventListener('DOMContentLoaded', function() {
    // Wait a moment for all resources to load
    setTimeout(() => {
        try {
            if (!window.portnoxPlatform) {
                window.portnoxPlatform = new PortnoxExecutiveIntelligencePlatform();
                
                const executiveView = document.querySelector('#executive-view');
                if (executiveView) {
                    const result = window.portnoxPlatform.init();
                    if (result) {
                        console.log("? Portnox Executive Intelligence Platform v5.0 fully loaded");
                    }
                }
            }
        } catch (error) {
            console.error("? Platform initialization failed:", error);
            // Show error in UI
            const errorFallback = document.getElementById('error-fallback');
            if (errorFallback) {
                errorFallback.style.display = 'block';
            }
        }
    }, 1000);
});

// Global error handler
window.addEventListener('error', function(event) {
    console.error('Global error caught:', event.error);
});

// Export for use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortnoxExecutiveIntelligencePlatform;
}