/**
 * Comprehensive Data Enhancement for Zero Trust Executive Platform
 * Extends existing platform with complete industries, compliance, and advanced features
 */

// Extend the existing platform with comprehensive data
if (window.ZeroTrustExecutivePlatform) {
    console.log("🔧 Applying comprehensive data enhancements...");
    
    // Enhanced Industries - Comprehensive Coverage
    const comprehensiveIndustries = {
        'technology': {
            name: 'Technology & Software',
            riskMultiplier: 1.2,
            complianceWeight: 0.9,
            breachCost: 4350000,
            avgDevices: 2500,
            regulatoryRequirements: ['GDPR', 'CCPA', 'SOX', 'ISO 27001'],
            averageDeviceCost: 65,
            fteCostRange: [80000, 150000]
        },
        'healthcare': {
            name: 'Healthcare & Life Sciences',
            riskMultiplier: 1.8,
            complianceWeight: 1.5,
            breachCost: 7800000,
            avgDevices: 1800,
            regulatoryRequirements: ['HIPAA', 'GDPR', 'NIST CSF', 'FDA CFR 21'],
            averageDeviceCost: 85,
            fteCostRange: [75000, 140000]
        },
        'finance': {
            name: 'Financial Services & Banking',
            riskMultiplier: 2.0,
            complianceWeight: 1.8,
            breachCost: 5720000,
            avgDevices: 3200,
            regulatoryRequirements: ['PCI DSS', 'SOX', 'GDPR', 'NIST CSF', 'GLBA'],
            averageDeviceCost: 95,
            fteCostRange: [90000, 180000]
        },
        'government': {
            name: 'Government & Public Sector',
            riskMultiplier: 1.5,
            complianceWeight: 2.0,
            breachCost: 4100000,
            avgDevices: 2800,
            regulatoryRequirements: ['FedRAMP', 'FISMA', 'NIST CSF', 'FIPS 140-2'],
            averageDeviceCost: 75,
            fteCostRange: [70000, 130000]
        },
        'education': {
            name: 'Education & Research',
            riskMultiplier: 1.1,
            complianceWeight: 1.2,
            breachCost: 3200000,
            avgDevices: 1500,
            regulatoryRequirements: ['FERPA', 'GDPR', 'COPPA'],
            averageDeviceCost: 45,
            fteCostRange: [60000, 110000]
        },
        'retail': {
            name: 'Retail & E-commerce',
            riskMultiplier: 1.3,
            complianceWeight: 1.1,
            breachCost: 3800000,
            avgDevices: 2200,
            regulatoryRequirements: ['PCI DSS', 'GDPR', 'CCPA'],
            averageDeviceCost: 55,
            fteCostRange: [65000, 120000]
        },
        'manufacturing': {
            name: 'Manufacturing & Industrial',
            riskMultiplier: 1.4,
            complianceWeight: 1.0,
            breachCost: 4200000,
            avgDevices: 1900,
            regulatoryRequirements: ['ISO 27001', 'NIST CSF', 'IEC 62443'],
            averageDeviceCost: 70,
            fteCostRange: [70000, 125000]
        },
        'energy': {
            name: 'Energy & Utilities',
            riskMultiplier: 1.6,
            complianceWeight: 1.4,
            breachCost: 6500000,
            avgDevices: 2600,
            regulatoryRequirements: ['NERC CIP', 'NIST CSF', 'ISO 27001'],
            averageDeviceCost: 80,
            fteCostRange: [75000, 135000]
        },
        'telecommunications': {
            name: 'Telecommunications',
            riskMultiplier: 1.5,
            complianceWeight: 1.3,
            breachCost: 5100000,
            avgDevices: 3500,
            regulatoryRequirements: ['GDPR', 'CALEA', 'FCC Rules'],
            averageDeviceCost: 90,
            fteCostRange: [80000, 145000]
        },
        'aerospace': {
            name: 'Aerospace & Defense',
            riskMultiplier: 1.7,
            complianceWeight: 1.9,
            breachCost: 6200000,
            avgDevices: 2100,
            regulatoryRequirements: ['CMMC', 'NIST SP 800-171', 'ITAR'],
            averageDeviceCost: 100,
            fteCostRange: [85000, 160000]
        },
        'pharmaceuticals': {
            name: 'Pharmaceuticals & Biotech',
            riskMultiplier: 1.6,
            complianceWeight: 1.7,
            breachCost: 7200000,
            avgDevices: 1600,
            regulatoryRequirements: ['FDA CFR 21', 'HIPAA', 'GDPR', 'GxP'],
            averageDeviceCost: 85,
            fteCostRange: [80000, 150000]
        },
        'automotive': {
            name: 'Automotive & Transportation',
            riskMultiplier: 1.3,
            complianceWeight: 1.1,
            breachCost: 4600000,
            avgDevices: 2400,
            regulatoryRequirements: ['ISO 27001', 'UNECE WP.29', 'GDPR'],
            averageDeviceCost: 75,
            fteCostRange: [70000, 130000]
        },
        'media': {
            name: 'Media & Entertainment',
            riskMultiplier: 1.2,
            complianceWeight: 0.8,
            breachCost: 3900000,
            avgDevices: 1800,
            regulatoryRequirements: ['GDPR', 'CCPA', 'DMCA'],
            averageDeviceCost: 60,
            fteCostRange: [65000, 115000]
        },
        'insurance': {
            name: 'Insurance & Financial Services',
            riskMultiplier: 1.8,
            complianceWeight: 1.6,
            breachCost: 5500000,
            avgDevices: 2700,
            regulatoryRequirements: ['SOX', 'GDPR', 'NAIC', 'PCI DSS'],
            averageDeviceCost: 85,
            fteCostRange: [85000, 155000]
        },
        'real_estate': {
            name: 'Real Estate & Construction',
            riskMultiplier: 1.1,
            complianceWeight: 0.9,
            breachCost: 3400000,
            avgDevices: 1200,
            regulatoryRequirements: ['GDPR', 'CCPA', 'Local Building Codes'],
            averageDeviceCost: 50,
            fteCostRange: [60000, 110000]
        },
        'hospitality': {
            name: 'Hospitality & Travel',
            riskMultiplier: 1.2,
            complianceWeight: 1.0,
            breachCost: 3700000,
            avgDevices: 1500,
            regulatoryRequirements: ['PCI DSS', 'GDPR', 'CCPA'],
            averageDeviceCost: 55,
            fteCostRange: [60000, 115000]
        },
        'legal': {
            name: 'Legal & Professional Services',
            riskMultiplier: 1.4,
            complianceWeight: 1.3,
            breachCost: 4800000,
            avgDevices: 800,
            regulatoryRequirements: ['GDPR', 'CCPA', 'Attorney-Client Privilege'],
            averageDeviceCost: 70,
            fteCostRange: [80000, 140000]
        },
        'nonprofit': {
            name: 'Non-Profit & NGOs',
            riskMultiplier: 1.0,
            complianceWeight: 1.1,
            breachCost: 2800000,
            avgDevices: 600,
            regulatoryRequirements: ['GDPR', 'CCPA', 'IRS Regulations'],
            averageDeviceCost: 40,
            fteCostRange: [50000, 90000]
        }
    };

    // Comprehensive Compliance Frameworks
    const comprehensiveCompliance = {
        'nist-csf': {
            name: 'NIST Cybersecurity Framework',
            priority: 'High',
            categories: ['Identify', 'Protect', 'Detect', 'Respond', 'Recover'],
            applicableIndustries: 'All',
            penaltyRange: '$100K - $10M',
            implementationCost: 150000,
            annualCost: 50000
        },
        'pci-dss': {
            name: 'PCI Data Security Standard',
            priority: 'Critical',
            categories: ['Build', 'Maintain', 'Protect', 'Monitor', 'Test'],
            applicableIndustries: 'Retail, Finance, E-commerce',
            penaltyRange: '$5K - $100K per month',
            implementationCost: 200000,
            annualCost: 75000
        },
        'hipaa': {
            name: 'Health Insurance Portability and Accountability Act',
            priority: 'Critical',
            categories: ['Administrative', 'Physical', 'Technical'],
            applicableIndustries: 'Healthcare, Insurance',
            penaltyRange: '$100 - $50K per violation',
            implementationCost: 180000,
            annualCost: 60000
        },
        'gdpr': {
            name: 'General Data Protection Regulation',
            priority: 'High',
            categories: ['Lawfulness', 'Purpose', 'Minimization', 'Accuracy'],
            applicableIndustries: 'Global (EU data)',
            penaltyRange: '4% of annual revenue',
            implementationCost: 300000,
            annualCost: 100000
        },
        'iso27001': {
            name: 'ISO/IEC 27001 Information Security Management',
            priority: 'Medium',
            categories: ['Context', 'Leadership', 'Planning', 'Support'],
            applicableIndustries: 'All',
            penaltyRange: 'Certification costs',
            implementationCost: 120000,
            annualCost: 40000
        },
        'sox': {
            name: 'Sarbanes-Oxley Act',
            priority: 'High',
            categories: ['Financial', 'IT Controls', 'Documentation'],
            applicableIndustries: 'Public Companies',
            penaltyRange: '$1M - $25M',
            implementationCost: 250000,
            annualCost: 80000
        },
        'fedramp': {
            name: 'Federal Risk and Authorization Management Program',
            priority: 'Critical',
            categories: ['Low', 'Moderate', 'High'],
            applicableIndustries: 'Government Contractors',
            penaltyRange: 'Contract termination',
            implementationCost: 400000,
            annualCost: 120000
        },
        'fisma': {
            name: 'Federal Information Security Management Act',
            priority: 'Critical',
            categories: ['Categorize', 'Select', 'Implement', 'Assess'],
            applicableIndustries: 'Federal Agencies',
            penaltyRange: 'Legal penalties',
            implementationCost: 350000,
            annualCost: 100000
        },
        'ccpa': {
            name: 'California Consumer Privacy Act',
            priority: 'High',
            categories: ['Notice', 'Choice', 'Access', 'Deletion'],
            applicableIndustries: 'California businesses',
            penaltyRange: '$2,500 - $7,500 per violation',
            implementationCost: 150000,
            annualCost: 50000
        },
        'cis': {
            name: 'CIS Critical Security Controls',
            priority: 'Medium',
            categories: ['Basic', 'Foundational', 'Organizational'],
            applicableIndustries: 'All',
            penaltyRange: 'Best practice framework',
            implementationCost: 100000,
            annualCost: 30000
        },
        'cmmc': {
            name: 'Cybersecurity Maturity Model Certification',
            priority: 'Critical',
            categories: ['Level 1', 'Level 2', 'Level 3'],
            applicableIndustries: 'Defense Contractors',
            penaltyRange: 'Contract ineligibility',
            implementationCost: 300000,
            annualCost: 90000
        },
        'nerc-cip': {
            name: 'NERC Critical Infrastructure Protection',
            priority: 'Critical',
            categories: ['Cyber Security', 'Physical Security', 'Personnel'],
            applicableIndustries: 'Electric Utilities',
            penaltyRange: '$1M per day per violation',
            implementationCost: 500000,
            annualCost: 150000
        },
        'ferpa': {
            name: 'Family Educational Rights and Privacy Act',
            priority: 'High',
            categories: ['Privacy', 'Access', 'Disclosure'],
            applicableIndustries: 'Education',
            penaltyRange: 'Funding termination',
            implementationCost: 80000,
            annualCost: 25000
        },
        'glba': {
            name: 'Gramm-Leach-Bliley Act',
            priority: 'High',
            categories: ['Privacy', 'Safeguards', 'Pretexting'],
            applicableIndustries: 'Financial Services',
            penaltyRange: '$100K - $1.5M',
            implementationCost: 200000,
            annualCost: 70000
        },
        'itar': {
            name: 'International Traffic in Arms Regulations',
            priority: 'Critical',
            categories: ['Export Control', 'Technology Transfer', 'Defense Articles'],
            applicableIndustries: 'Defense, Aerospace',
            penaltyRange: '$1M+ criminal penalties',
            implementationCost: 400000,
            annualCost: 120000
        },
        'fda-cfr21': {
            name: 'FDA Code of Federal Regulations Title 21',
            priority: 'Critical',
            categories: ['Part 11', 'Data Integrity', 'Electronic Records'],
            applicableIndustries: 'Pharmaceuticals, Medical Devices',
            penaltyRange: 'Product recalls, fines',
            implementationCost: 250000,
            annualCost: 80000
        },
        'coppa': {
            name: 'Children\'s Online Privacy Protection Act',
            priority: 'High',
            categories: ['Parental Consent', 'Data Collection', 'Privacy Policies'],
            applicableIndustries: 'Online Services, Education',
            penaltyRange: '$43,792 per violation',
            implementationCost: 100000,
            annualCost: 30000
        },
        'pipeda': {
            name: 'Personal Information Protection and Electronic Documents Act',
            priority: 'High',
            categories: ['Consent', 'Collection', 'Use and Disclosure'],
            applicableIndustries: 'Canadian Organizations',
            penaltyRange: 'Up to $100K CAD',
            implementationCost: 120000,
            annualCost: 40000
        },
        'australia-privacy': {
            name: 'Australian Privacy Principles',
            priority: 'High',
            categories: ['Collection', 'Use', 'Disclosure', 'Data Quality'],
            applicableIndustries: 'Australian Organizations',
            penaltyRange: 'Up to $2.2M AUD',
            implementationCost: 150000,
            annualCost: 50000
        },
        'lgpd': {
            name: 'Lei Geral de Proteção de Dados (Brazil)',
            priority: 'High',
            categories: ['Data Processing', 'Data Subject Rights', 'DPO Requirements'],
            applicableIndustries: 'Brazilian Organizations',
            penaltyRange: 'Up to 2% of revenue',
            implementationCost: 180000,
            annualCost: 60000
        }
    };

    // Enhanced Organization Settings
    const organizationSettings = {
        sizes: {
            'startup': {
                name: 'Startup (1-50 employees)',
                deviceMultiplier: 0.7,
                complexityFactor: 0.8,
                avgDeviceCount: 75,
                budgetConstraints: 'High'
            },
            'small': {
                name: 'Small Business (51-250 employees)',
                deviceMultiplier: 0.9,
                complexityFactor: 0.9,
                avgDeviceCount: 200,
                budgetConstraints: 'Medium'
            },
            'medium': {
                name: 'Medium Enterprise (251-1000 employees)',
                deviceMultiplier: 1.0,
                complexityFactor: 1.0,
                avgDeviceCount: 750,
                budgetConstraints: 'Medium'
            },
            'large': {
                name: 'Large Enterprise (1001-5000 employees)',
                deviceMultiplier: 1.2,
                complexityFactor: 1.3,
                avgDeviceCount: 2500,
                budgetConstraints: 'Low'
            },
            'enterprise': {
                name: 'Global Enterprise (5000+ employees)',
                deviceMultiplier: 1.5,
                complexityFactor: 1.6,
                avgDeviceCount: 8000,
                budgetConstraints: 'Very Low'
            }
        },
        regions: {
            'north_america': {
                name: 'North America',
                regulatoryComplexity: 1.2,
                costMultiplier: 1.0,
                primaryRegulations: ['SOX', 'CCPA', 'NIST CSF']
            },
            'europe': {
                name: 'Europe',
                regulatoryComplexity: 1.8,
                costMultiplier: 1.1,
                primaryRegulations: ['GDPR', 'NIS Directive', 'ISO 27001']
            },
            'asia_pacific': {
                name: 'Asia Pacific',
                regulatoryComplexity: 1.3,
                costMultiplier: 0.9,
                primaryRegulations: ['PDPA', 'Cybersecurity Law', 'Privacy Act']
            },
            'latin_america': {
                name: 'Latin America',
                regulatoryComplexity: 1.1,
                costMultiplier: 0.8,
                primaryRegulations: ['LGPD', 'Local Privacy Laws']
            },
            'middle_east_africa': {
                name: 'Middle East & Africa',
                regulatoryComplexity: 1.0,
                costMultiplier: 0.9,
                primaryRegulations: ['Local Cybersecurity Laws']
            }
        },
        deploymentModels: {
            'cloud_first': {
                name: 'Cloud-First Strategy',
                costReduction: 0.15,
                implementationSpeed: 1.8,
                maintenanceReduction: 0.25
            },
            'hybrid': {
                name: 'Hybrid Deployment',
                costReduction: 0.08,
                implementationSpeed: 1.2,
                maintenanceReduction: 0.12
            },
            'on_premises': {
                name: 'On-Premises Only',
                costReduction: 0.0,
                implementationSpeed: 1.0,
                maintenanceReduction: 0.0
            },
            'multi_cloud': {
                name: 'Multi-Cloud Strategy',
                costReduction: 0.12,
                implementationSpeed: 1.5,
                maintenanceReduction: 0.18
            }
        }
    };

    // Add comprehensive debugging
    console.log("📊 Enhanced Data Loaded:");
    console.log(`- Industries: ${Object.keys(comprehensiveIndustries).length}`);
    console.log(`- Compliance Frameworks: ${Object.keys(comprehensiveCompliance).length}`);
    console.log(`- Organization Sizes: ${Object.keys(organizationSettings.sizes).length}`);
    console.log(`- Regions: ${Object.keys(organizationSettings.regions).length}`);
    console.log(`- Deployment Models: ${Object.keys(organizationSettings.deploymentModels).length}`);

    // Expose enhanced data globally
    window.comprehensiveIndustries = comprehensiveIndustries;
    window.comprehensiveCompliance = comprehensiveCompliance;
    window.organizationSettings = organizationSettings;
    
    console.log("✅ Comprehensive data enhancement completed successfully");
} else {
    console.warn("⚠️ ZeroTrustExecutivePlatform not found - enhancement will be applied when platform loads");
}
