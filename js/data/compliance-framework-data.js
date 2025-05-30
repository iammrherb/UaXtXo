/**
 * Comprehensive Compliance Framework Data
 * All industries, frameworks, controls, and costs
 */

window.ComplianceFrameworkData = {
    frameworks: {
        'nist-csf': {
            name: 'NIST Cybersecurity Framework',
            version: '2.0',
            categories: ['Identify', 'Protect', 'Detect', 'Respond', 'Recover'],
            criticalControls: {
                'ID.AM-1': { 
                    control: 'Physical devices and systems inventoried',
                    portnoxSupport: 95,
                    description: 'Automated device discovery and inventory'
                },
                'PR.AC-1': { 
                    control: 'Identities and credentials managed',
                    portnoxSupport: 98,
                    description: 'Identity-based access control'
                },
                'PR.AC-3': { 
                    control: 'Remote access managed',
                    portnoxSupport: 100,
                    description: 'Zero Trust remote access'
                },
                'DE.CM-7': { 
                    control: 'Monitoring for unauthorized devices',
                    portnoxSupport: 100,
                    description: 'Real-time rogue device detection'
                }
            },
            violationCosts: {
                minor: 50000,
                major: 250000,
                critical: 1000000
            }
        },
        'cmmc': {
            name: 'Cybersecurity Maturity Model Certification',
            version: '2.0',
            levels: ['Foundational', 'Advanced', 'Expert'],
            criticalControls: {
                'AC.L1-3.1.1': {
                    control: 'Limit system access to authorized users',
                    portnoxSupport: 100,
                    description: 'Role-based access control'
                },
                'AC.L2-3.1.12': {
                    control: 'Monitor and control remote access sessions',
                    portnoxSupport: 95,
                    description: 'Session monitoring and control'
                },
                'IA.L2-3.5.3': {
                    control: 'Multi-factor authentication',
                    portnoxSupport: 100,
                    description: 'MFA enforcement'
                }
            },
            violationCosts: {
                contractLoss: 5000000,
                remediation: 500000,
                recertification: 250000
            }
        },
        'hipaa': {
            name: 'Health Insurance Portability and Accountability Act',
            categories: ['Administrative', 'Physical', 'Technical'],
            criticalControls: {
                '164.308(a)(1)': {
                    control: 'Access control',
                    portnoxSupport: 98,
                    description: 'User access management'
                },
                '164.312(a)(1)': {
                    control: 'Unique user identification',
                    portnoxSupport: 100,
                    description: 'Individual user accounts'
                },
                '164.312(b)': {
                    control: 'Audit logs',
                    portnoxSupport: 95,
                    description: 'Comprehensive audit trails'
                }
            },
            violationCosts: {
                perRecord: 150,
                minimum: 100000,
                maximum: 50000000,
                average: 1500000
            }
        },
        'iso27001': {
            name: 'ISO/IEC 27001:2022',
            domains: 4,
            controls: 93,
            criticalControls: {
                'A.8.1': {
                    control: 'User access management',
                    portnoxSupport: 97,
                    description: 'User lifecycle management'
                },
                'A.8.3': {
                    control: 'Access rights',
                    portnoxSupport: 95,
                    description: 'Least privilege enforcement'
                },
                'A.8.5': {
                    control: 'Secure authentication',
                    portnoxSupport: 100,
                    description: 'Strong authentication methods'
                }
            },
            certificationCosts: {
                initial: 75000,
                annual: 25000,
                remediation: 50000
            }
        },
        'pci-dss': {
            name: 'Payment Card Industry Data Security Standard',
            version: '4.0',
            requirements: 12,
            criticalControls: {
                '7.1': {
                    control: 'Limit access to system components',
                    portnoxSupport: 98,
                    description: 'Need-to-know access'
                },
                '8.2': {
                    control: 'User authentication management',
                    portnoxSupport: 100,
                    description: 'Strong authentication'
                },
                '10.1': {
                    control: 'Audit trails',
                    portnoxSupport: 95,
                    description: 'User activity logging'
                }
            },
            violationCosts: {
                finesPerMonth: 100000,
                forensics: 250000,
                brandDamage: 2000000
            }
        },
        'gdpr': {
            name: 'General Data Protection Regulation',
            articles: 99,
            criticalControls: {
                'Art.32': {
                    control: 'Security of processing',
                    portnoxSupport: 92,
                    description: 'Technical security measures'
                },
                'Art.25': {
                    control: 'Data protection by design',
                    portnoxSupport: 88,
                    description: 'Privacy-first architecture'
                }
            },
            violationCosts: {
                maxFine: 20000000,
                percentRevenue: 4
            }
        },
        'sox': {
            name: 'Sarbanes-Oxley Act',
            sections: ['302', '404', '409'],
            criticalControls: {
                'IT.1': {
                    control: 'Access controls',
                    portnoxSupport: 96,
                    description: 'Financial system access'
                },
                'IT.2': {
                    control: 'Change management',
                    portnoxSupport: 85,
                    description: 'Configuration control'
                }
            },
            violationCosts: {
                criminal: 5000000,
                civil: 1000000
            }
        }
    },
    
    industries: {
        healthcare: {
            name: 'Healthcare',
            primaryFrameworks: ['hipaa', 'nist-csf', 'iso27001'],
            avgBreachCost: 10930000,
            avgRecords: 42000,
            criticalAssets: ['PHI', 'Medical Devices', 'EHR Systems'],
            specificRequirements: {
                medicalDeviceSegmentation: {
                    requirement: 'Isolate medical devices',
                    portnoxCapability: 'Dynamic VLAN assignment',
                    complianceImpact: 95
                },
                vendorAccess: {
                    requirement: 'Secure vendor remote access',
                    portnoxCapability: 'Time-based access control',
                    complianceImpact: 90
                }
            }
        },
        finance: {
            name: 'Financial Services',
            primaryFrameworks: ['pci-dss', 'sox', 'nist-csf', 'iso27001'],
            avgBreachCost: 5970000,
            avgDowntime: 5.6,
            criticalAssets: ['Card Data', 'Financial Records', 'Trading Systems'],
            specificRequirements: {
                tradingFloorSecurity: {
                    requirement: 'Secure trading terminals',
                    portnoxCapability: 'Device fingerprinting',
                    complianceImpact: 98
                },
                privilegedAccess: {
                    requirement: 'PAM integration',
                    portnoxCapability: 'Just-in-time access',
                    complianceImpact: 92
                }
            }
        },
        defense: {
            name: 'Defense Industrial Base',
            primaryFrameworks: ['cmmc', 'nist-csf', 'nist-800-171'],
            avgContractValue: 25000000,
            clearanceRequirements: true,
            criticalAssets: ['CUI', 'Technical Data', 'ITAR'],
            specificRequirements: {
                cuiProtection: {
                    requirement: 'Protect Controlled Unclassified Information',
                    portnoxCapability: 'Encryption enforcement',
                    complianceImpact: 100
                },
                supplyChain: {
                    requirement: 'Vendor security assessment',
                    portnoxCapability: 'Contractor device control',
                    complianceImpact: 95
                }
            }
        },
        retail: {
            name: 'Retail',
            primaryFrameworks: ['pci-dss', 'gdpr', 'ccpa'],
            avgBreachCost: 3280000,
            posTerminals: true,
            criticalAssets: ['Payment Systems', 'Customer Data', 'Inventory'],
            specificRequirements: {
                posSegmentation: {
                    requirement: 'POS network isolation',
                    portnoxCapability: 'Automatic segmentation',
                    complianceImpact: 100
                },
                guestWifi: {
                    requirement: 'Secure guest access',
                    portnoxCapability: 'Guest portal integration',
                    complianceImpact: 85
                }
            }
        },
        manufacturing: {
            name: 'Manufacturing',
            primaryFrameworks: ['nist-csf', 'iso27001', 'iec-62443'],
            avgBreachCost: 4470000,
            otEnvironments: true,
            criticalAssets: ['SCADA', 'PLCs', 'IP'],
            specificRequirements: {
                otItConvergence: {
                    requirement: 'OT/IT network separation',
                    portnoxCapability: 'Policy-based segmentation',
                    complianceImpact: 95
                },
                vendorMaintenance: {
                    requirement: 'Secure maintenance access',
                    portnoxCapability: 'Temporary access windows',
                    complianceImpact: 90
                }
            }
        },
        government: {
            name: 'Government',
            primaryFrameworks: ['nist-csf', 'fisma', 'fedramp'],
            clearanceRequired: true,
            criticalAssets: ['Classified Data', 'Citizen Records', 'Infrastructure'],
            specificRequirements: {
                citizenDataProtection: {
                    requirement: 'Protect citizen PII',
                    portnoxCapability: 'Data classification enforcement',
                    complianceImpact: 98
                },
                interagencyAccess: {
                    requirement: 'Secure cross-agency access',
                    portnoxCapability: 'Federated authentication',
                    complianceImpact: 88
                }
            }
        },
        education: {
            name: 'Education',
            primaryFrameworks: ['ferpa', 'coppa', 'nist-csf'],
            avgBreachCost: 3860000,
            studentRecords: true,
            criticalAssets: ['Student Data', 'Research', 'Financial Aid'],
            specificRequirements: {
                byod: {
                    requirement: 'Student device management',
                    portnoxCapability: 'BYOD onboarding',
                    complianceImpact: 92
                },
                minorProtection: {
                    requirement: 'K-12 student protection',
                    portnoxCapability: 'Age-appropriate controls',
                    complianceImpact: 95
                }
            }
        },
        energy: {
            name: 'Energy & Utilities',
            primaryFrameworks: ['nerc-cip', 'nist-csf', 'iec-62443'],
            criticalInfrastructure: true,
            avgBreachCost: 4650000,
            criticalAssets: ['SCADA', 'Grid Control', 'Generation'],
            specificRequirements: {
                criticalAssetProtection: {
                    requirement: 'BES cyber system protection',
                    portnoxCapability: 'Critical asset isolation',
                    complianceImpact: 100
                },
                vendorRiskManagement: {
                    requirement: 'Third-party access control',
                    portnoxCapability: 'Vendor risk scoring',
                    complianceImpact: 93
                }
            }
        }
    },
    
    controlMappings: {
        'device-visibility': {
            frameworks: ['nist-csf', 'cmmc', 'iso27001', 'pci-dss'],
            portnoxFeature: 'Continuous device discovery',
            complianceValue: 95,
            costAvoidance: 125000
        },
        'access-control': {
            frameworks: ['all'],
            portnoxFeature: 'Policy-based NAC',
            complianceValue: 98,
            costAvoidance: 450000
        },
        'network-segmentation': {
            frameworks: ['pci-dss', 'nerc-cip', 'iec-62443'],
            portnoxFeature: 'Dynamic VLANs',
            complianceValue: 100,
            costAvoidance: 750000
        },
        'audit-logging': {
            frameworks: ['all'],
            portnoxFeature: 'Centralized logging',
            complianceValue: 92,
            costAvoidance: 200000
        },
        'incident-response': {
            frameworks: ['nist-csf', 'iso27001', 'gdpr'],
            portnoxFeature: 'Automated containment',
            complianceValue: 88,
            costAvoidance: 350000
        }
    },
    
    calculateComplianceSavings(industry, deviceCount) {
        const ind = this.industries[industry];
        if (!ind) return 0;
        
        let totalSavings = 0;
        
        // Framework violation avoidance
        ind.primaryFrameworks.forEach(fw => {
            const framework = this.frameworks[fw];
            if (framework?.violationCosts) {
                const avgCost = framework.violationCosts.average || 
                               framework.violationCosts.major || 
                               framework.violationCosts.minimum || 0;
                // Portnox reduces violation risk by 75%
                totalSavings += avgCost * 0.15 * 0.75; // 15% annual risk * 75% reduction
            }
        });
        
        // Audit cost reduction (30% reduction)
        const auditCosts = deviceCount * 50; // $50/device for compliance audits
        totalSavings += auditCosts * 0.30;
        
        // Remediation cost avoidance
        totalSavings += deviceCount * 25; // $25/device/year in remediation
        
        return Math.round(totalSavings);
    }
};

console.log('📋 Compliance framework data loaded');
