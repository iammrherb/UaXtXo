/**
 * Complete Industry and Compliance Database
 * All industries and frameworks with detailed mappings
 */

// Extended Industry Database
window.ExtendedIndustryDatabase = {
    healthcare: {
        name: 'Healthcare & Life Sciences',
        avgBreachCost: 10930000,
        breachProbability: 0.32,
        avgDowntimeCost: 11000,
        ransomwareProbability: 0.45,
        avgRansomDemand: 2300000,
        
        subIndustries: [
            'Hospitals & Health Systems',
            'Medical Practices',
            'Pharmaceutical',
            'Medical Devices',
            'Health Insurance',
            'Biotech & Research'
        ],
        
        specificRisks: {
            'PHI Data Breach': 0.85,
            'Medical Device Vulnerabilities': 0.72,
            'Ransomware on Critical Systems': 0.68,
            'Third-Party Vendor Breach': 0.61,
            'Insider Threats': 0.55,
            'Legacy System Exploits': 0.78
        },
        
        complianceRequirements: ['HIPAA', 'GDPR', 'FDA 21 CFR Part 11', 'HITRUST', 'ISO 27799'],
        
        cyberInsurance: {
            avgPremium: 87000,
            avgDeductible: 100000,
            coverageLimits: {
                low: 1000000,
                medium: 5000000,
                high: 10000000
            },
            premiumFactors: {
                noNAC: 1.0,
                legacyNAC: 0.85,
                modernNAC: 0.70,
                portnoxNAC: 0.65
            }
        }
    },
    
    finance: {
        name: 'Financial Services',
        avgBreachCost: 5970000,
        breachProbability: 0.28,
        avgDowntimeCost: 17000,
        ransomwareProbability: 0.38,
        avgRansomDemand: 1800000,
        
        subIndustries: [
            'Banking',
            'Investment Services',
            'Insurance',
            'Credit Unions',
            'Fintech',
            'Cryptocurrency'
        ],
        
        specificRisks: {
            'Account Takeover': 0.82,
            'Wire Fraud': 0.75,
            'ATM/POS Malware': 0.63,
            'Cryptocurrency Theft': 0.71,
            'Supply Chain Attacks': 0.67,
            'API Vulnerabilities': 0.74
        },
        
        complianceRequirements: ['PCI DSS', 'SOX', 'GLBA', 'FFIEC', 'Basel III', 'MiFID II'],
        
        cyberInsurance: {
            avgPremium: 125000,
            avgDeductible: 150000,
            premiumFactors: {
                noNAC: 1.0,
                legacyNAC: 0.80,
                modernNAC: 0.65,
                portnoxNAC: 0.60
            }
        }
    },
    
    government: {
        name: 'Government & Public Sector',
        avgBreachCost: 4910000,
        breachProbability: 0.35,
        avgDowntimeCost: 8500,
        ransomwareProbability: 0.42,
        
        subIndustries: [
            'Federal Government',
            'State & Local',
            'Military & Defense',
            'Intelligence Agencies',
            'Public Utilities',
            'Education (K-12)'
        ],
        
        specificRisks: {
            'Nation-State Attacks': 0.89,
            'Critical Infrastructure': 0.85,
            'Citizen Data Exposure': 0.76,
            'Service Disruption': 0.72,
            'Supply Chain Compromise': 0.68,
            'Zero-Day Exploits': 0.81
        },
        
        complianceRequirements: ['FISMA', 'FedRAMP', 'NIST 800-171', 'CMMC', 'StateRAMP', 'CJIS'],
        
        cyberInsurance: {
            avgPremium: 65000,
            premiumFactors: {
                noNAC: 1.0,
                legacyNAC: 0.82,
                modernNAC: 0.68,
                portnoxNAC: 0.62
            }
        }
    },
    
    technology: {
        name: 'Technology',
        avgBreachCost: 4880000,
        breachProbability: 0.25,
        avgDowntimeCost: 9800,
        
        subIndustries: [
            'Software Development',
            'SaaS Companies',
            'Hardware Manufacturing',
            'Telecommunications',
            'Data Centers',
            'MSPs & MSSPs'
        ],
        
        complianceRequirements: ['SOC 2', 'ISO 27001', 'GDPR', 'CCPA', 'CSA STAR'],
        
        cyberInsurance: {
            avgPremium: 72000,
            premiumFactors: {
                noNAC: 1.0,
                legacyNAC: 0.83,
                modernNAC: 0.67,
                portnoxNAC: 0.61
            }
        }
    },
    
    education: {
        name: 'Education',
        avgBreachCost: 3860000,
        breachProbability: 0.30,
        avgDowntimeCost: 5200,
        
        subIndustries: [
            'Higher Education',
            'K-12 Schools',
            'Online Learning',
            'Research Institutions',
            'Libraries',
            'EdTech'
        ],
        
        complianceRequirements: ['FERPA', 'COPPA', 'GDPR', 'State Privacy Laws'],
        
        cyberInsurance: {
            avgPremium: 45000,
            premiumFactors: {
                noNAC: 1.0,
                legacyNAC: 0.84,
                modernNAC: 0.69,
                portnoxNAC: 0.63
            }
        }
    },
    
    manufacturing: {
        name: 'Manufacturing',
        avgBreachCost: 4470000,
        breachProbability: 0.27,
        avgDowntimeCost: 22000,
        
        subIndustries: [
            'Automotive',
            'Aerospace & Defense',
            'Pharmaceuticals',
            'Food & Beverage',
            'Electronics',
            'Industrial Equipment'
        ],
        
        specificRisks: {
            'OT/IT Convergence': 0.83,
            'Supply Chain Attacks': 0.79,
            'IP Theft': 0.86,
            'Production Disruption': 0.91,
            'Quality System Compromise': 0.74
        },
        
        complianceRequirements: ['ISO 27001', 'NIST', 'Industry-specific (FDA, FAA, etc.)'],
        
        cyberInsurance: {
            avgPremium: 58000,
            premiumFactors: {
                noNAC: 1.0,
                legacyNAC: 0.85,
                modernNAC: 0.70,
                portnoxNAC: 0.64
            }
        }
    },
    
    retail: {
        name: 'Retail',
        avgBreachCost: 3280000,
        breachProbability: 0.26,
        avgDowntimeCost: 7800,
        
        subIndustries: [
            'E-commerce',
            'Brick & Mortar',
            'Omnichannel',
            'Grocery',
            'Fashion',
            'Hospitality'
        ],
        
        complianceRequirements: ['PCI DSS', 'GDPR', 'CCPA', 'State Privacy Laws'],
        
        cyberInsurance: {
            avgPremium: 52000,
            premiumFactors: {
                noNAC: 1.0,
                legacyNAC: 0.86,
                modernNAC: 0.71,
                portnoxNAC: 0.65
            }
        }
    },
    
    energy: {
        name: 'Energy & Utilities',
        avgBreachCost: 4720000,
        breachProbability: 0.31,
        avgDowntimeCost: 25000,
        
        subIndustries: [
            'Electric Power',
            'Oil & Gas',
            'Renewable Energy',
            'Water Utilities',
            'Nuclear',
            'Natural Gas Distribution'
        ],
        
        specificRisks: {
            'Critical Infrastructure Attacks': 0.92,
            'SCADA System Vulnerabilities': 0.88,
            'Nation-State Threats': 0.85,
            'Physical Security Breaches': 0.76
        },
        
        complianceRequirements: ['NERC CIP', 'TSA Pipeline', 'NRC Cyber', 'ICS Security'],
        
        cyberInsurance: {
            avgPremium: 95000,
            premiumFactors: {
                noNAC: 1.0,
                legacyNAC: 0.81,
                modernNAC: 0.66,
                portnoxNAC: 0.60
            }
        }
    },
    
    transportation: {
        name: 'Transportation & Logistics',
        avgBreachCost: 3580000,
        breachProbability: 0.24,
        avgDowntimeCost: 15000,
        
        subIndustries: [
            'Airlines',
            'Shipping & Maritime',
            'Rail',
            'Trucking',
            'Public Transit',
            'Logistics & Supply Chain'
        ],
        
        complianceRequirements: ['TSA Security', 'ISPS Code', 'C-TPAT'],
        
        cyberInsurance: {
            avgPremium: 48000,
            premiumFactors: {
                noNAC: 1.0,
                legacyNAC: 0.87,
                modernNAC: 0.72,
                portnoxNAC: 0.66
            }
        }
    },
    
    telecommunications: {
        name: 'Telecommunications',
        avgBreachCost: 3680000,
        breachProbability: 0.29,
        avgDowntimeCost: 18000,
        
        subIndustries: [
            'Mobile Carriers',
            'Internet Service Providers',
            'Cable & Satellite',
            'VoIP Services',
            '5G Infrastructure',
            'Data Centers'
        ],
        
        complianceRequirements: ['FCC Regulations', 'CPNI', 'GDPR', 'State Privacy Laws'],
        
        cyberInsurance: {
            avgPremium: 68000,
            premiumFactors: {
                noNAC: 1.0,
                legacyNAC: 0.82,
                modernNAC: 0.68,
                portnoxNAC: 0.62
            }
        }
    },
    
    hospitality: {
        name: 'Hospitality & Entertainment',
        avgBreachCost: 2940000,
        breachProbability: 0.23,
        avgDowntimeCost: 6500,
        
        subIndustries: [
            'Hotels & Resorts',
            'Restaurants',
            'Gaming & Casinos',
            'Theme Parks',
            'Event Venues',
            'Travel Agencies'
        ],
        
        complianceRequirements: ['PCI DSS', 'GDPR', 'State Gaming Regulations'],
        
        cyberInsurance: {
            avgPremium: 42000,
            premiumFactors: {
                noNAC: 1.0,
                legacyNAC: 0.88,
                modernNAC: 0.73,
                portnoxNAC: 0.67
            }
        }
    },
    
    legal: {
        name: 'Legal & Professional Services',
        avgBreachCost: 4540000,
        breachProbability: 0.26,
        avgDowntimeCost: 12000,
        
        subIndustries: [
            'Law Firms',
            'Accounting Firms',
            'Consulting',
            'Architecture & Engineering',
            'Marketing Agencies',
            'Real Estate'
        ],
        
        specificRisks: {
            'Client Confidentiality Breach': 0.91,
            'Privileged Information Theft': 0.88,
            'Business Email Compromise': 0.82
        },
        
        complianceRequirements: ['SOX', 'GDPR', 'State Bar Requirements', 'Client NDAs'],
        
        cyberInsurance: {
            avgPremium: 55000,
            premiumFactors: {
                noNAC: 1.0,
                legacyNAC: 0.83,
                modernNAC: 0.69,
                portnoxNAC: 0.63
            }
        }
    }
};

// Extended Compliance Framework Database
window.ExtendedComplianceDatabase = {
    // Healthcare Frameworks
    'hipaa': {
        id: 'hipaa',
        name: 'HIPAA',
        fullName: 'Health Insurance Portability and Accountability Act',
        category: 'Healthcare',
        region: 'United States',
        mandatory: true,
        
        requirements: {
            'Administrative Safeguards': [
                'Security Officer Designation',
                'Workforce Training',
                'Access Management',
                'Security Incident Procedures',
                'Contingency Planning',
                'Regular Evaluations'
            ],
            'Physical Safeguards': [
                'Facility Access Controls',
                'Workstation Use Policies',
                'Device and Media Controls'
            ],
            'Technical Safeguards': [
                'Access Control Systems',
                'Audit Controls',
                'Integrity Controls',
                'Transmission Security'
            ]
        },
        
        nacControls: {
            portnox: {
                coverage: 94,
                automated: [
                    'Access Control',
                    'Audit Logging',
                    'Device Authentication',
                    'Encryption Enforcement',
                    'User Activity Monitoring'
                ]
            }
        },
        
        penalties: {
            min: 100,
            max: 50000,
            annual: 1500000,
            criminal: true
        }
    },
    
    'hitrust': {
        id: 'hitrust',
        name: 'HITRUST CSF',
        fullName: 'Health Information Trust Alliance Common Security Framework',
        category: 'Healthcare',
        region: 'Global',
        
        nacControls: {
            portnox: {
                coverage: 92,
                automated: ['Risk Management', 'Access Control', 'Audit Logging']
            }
        }
    },
    
    // Financial Frameworks
    'pci-dss': {
        id: 'pci-dss',
        name: 'PCI DSS v4.0',
        fullName: 'Payment Card Industry Data Security Standard',
        category: 'Financial',
        region: 'Global',
        mandatory: true,
        
        requirements: {
            'Network Security': [
                'Network Segmentation',
                'Firewall Configuration',
                'Secure Remote Access'
            ],
            'Access Control': [
                'Unique User IDs',
                'Strong Authentication',
                'Least Privilege',
                'Regular Reviews'
            ],
            'Monitoring': [
                'Log All Access',
                'Daily Log Review',
                'Security Testing'
            ]
        },
        
        nacControls: {
            portnox: {
                coverage: 88,
                automated: [
                    'Network Segmentation',
                    'User Authentication',
                    'Access Logging',
                    'Compliance Reporting'
                ]
            }
        },
        
        penalties: {
            finesPerMonth: 100000,
            cardBrandPenalties: 500000,
            lossOfProcessing: true
        }
    },
    
    'sox': {
        id: 'sox',
        name: 'SOX',
        fullName: 'Sarbanes-Oxley Act',
        category: 'Financial',
        region: 'United States',
        
        nacControls: {
            portnox: {
                coverage: 85,
                automated: ['Access Control', 'Audit Trail', 'Change Management']
            }
        }
    },
    
    'glba': {
        id: 'glba',
        name: 'GLBA',
        fullName: 'Gramm-Leach-Bliley Act',
        category: 'Financial',
        region: 'United States',
        
        nacControls: {
            portnox: {
                coverage: 82,
                automated: ['Data Protection', 'Access Control', 'Risk Assessment']
            }
        }
    },
    
    // Government Frameworks
    'fisma': {
        id: 'fisma',
        name: 'FISMA',
        fullName: 'Federal Information Security Management Act',
        category: 'Government',
        region: 'United States',
        
        requirements: {
            'Continuous Monitoring': true,
            'Risk Management': true,
            'Incident Response': true,
            'Configuration Management': true
        },
        
        nacControls: {
            portnox: {
                coverage: 90,
                automated: ['Continuous Monitoring', 'Access Control', 'Configuration Compliance']
            }
        }
    },
    
    'fedramp': {
        id: 'fedramp',
        name: 'FedRAMP',
        fullName: 'Federal Risk and Authorization Management Program',
        category: 'Government',
        region: 'United States',
        
        levels: ['Low', 'Moderate', 'High'],
        
        nacControls: {
            portnox: {
                coverage: 88,
                status: 'Ready',
                automated: ['Access Control', 'Continuous Monitoring', 'Vulnerability Management']
            }
        }
    },
    
    'cmmc': {
        id: 'cmmc',
        name: 'CMMC 2.0',
        fullName: 'Cybersecurity Maturity Model Certification',
        category: 'Government/Defense',
        region: 'United States',
        
        levels: {
            'Level 1': 'Foundational',
            'Level 2': 'Advanced',
            'Level 3': 'Expert'
        },
        
        nacControls: {
            portnox: {
                coverage: 91,
                level2: true,
                level3: true,
                automated: ['Access Control', 'System Monitoring', 'Incident Response']
            }
        }
    },
    
    'nist-800-171': {
        id: 'nist-800-171',
        name: 'NIST SP 800-171',
        fullName: 'Protecting Controlled Unclassified Information',
        category: 'Government',
        region: 'United States',
        
        nacControls: {
            portnox: {
                coverage: 93,
                automated: ['Access Control', 'Audit and Accountability', 'System Monitoring']
            }
        }
    },
    
    // Privacy Frameworks
    'gdpr': {
        id: 'gdpr',
        name: 'GDPR',
        fullName: 'General Data Protection Regulation',
        category: 'Privacy',
        region: 'European Union',
        mandatory: true,
        
        requirements: {
            'Data Protection': [
                'Privacy by Design',
                'Data Minimization',
                'Access Controls',
                'Encryption'
            ],
            'Rights': [
                'Right to Access',
                'Right to Erasure',
                'Data Portability'
            ]
        },
        
        nacControls: {
            portnox: {
                coverage: 89,
                automated: ['Access Control', 'Data Protection', 'Audit Logging', 'User Rights Management']
            }
        },
        
        penalties: {
            max: '4% of global revenue or €20 million'
        }
    },
    
    'ccpa': {
        id: 'ccpa',
        name: 'CCPA/CPRA',
        fullName: 'California Consumer Privacy Act/Rights Act',
        category: 'Privacy',
        region: 'California, US',
        
        nacControls: {
            portnox: {
                coverage: 86,
                automated: ['Access Control', 'Data Discovery', 'User Rights']
            }
        },
        
        penalties: {
            perViolation: 7500,
            dataBreachPerRecord: 750
        }
    },
    
    // Industry Standards
    'iso-27001': {
        id: 'iso-27001',
        name: 'ISO 27001:2022',
        fullName: 'Information Security Management Systems',
        category: 'Security Standard',
        region: 'Global',
        
        controls: 93,
        
        nacControls: {
            portnox: {
                coverage: 96,
                certified: true,
                automated: ['Access Control', 'Asset Management', 'Operations Security']
            }
        }
    },
    
    'soc2': {
        id: 'soc2',
        name: 'SOC 2 Type II',
        fullName: 'Service Organization Control 2',
        category: 'Security Audit',
        region: 'Global',
        
        trustServiceCriteria: [
            'Security',
            'Availability',
            'Processing Integrity',
            'Confidentiality',
            'Privacy'
        ],
        
        nacControls: {
            portnox: {
                coverage: 100,
                certified: true,
                automated: ['All TSC requirements']
            }
        }
    },
    
    'nist-csf': {
        id: 'nist-csf',
        name: 'NIST CSF 2.0',
        fullName: 'NIST Cybersecurity Framework',
        category: 'Security Framework',
        region: 'Global',
        
        functions: ['Identify', 'Protect', 'Detect', 'Respond', 'Recover', 'Govern'],
        
        nacControls: {
            portnox: {
                coverage: 92,
                automated: ['Asset Management', 'Access Control', 'Continuous Monitoring', 'Incident Response']
            }
        }
    },
    
    'cis-controls': {
        id: 'cis-controls',
        name: 'CIS Controls v8',
        fullName: 'Center for Internet Security Controls',
        category: 'Security Controls',
        region: 'Global',
        
        implementationGroups: ['IG1', 'IG2', 'IG3'],
        
        nacControls: {
            portnox: {
                coverage: 88,
                ig1: true,
                ig2: true,
                ig3: true,
                automated: ['Inventory', 'Access Control', 'Continuous Monitoring']
            }
        }
    },
    
    // Industry-Specific
    'nerc-cip': {
        id: 'nerc-cip',
        name: 'NERC CIP',
        fullName: 'North American Electric Reliability Corporation Critical Infrastructure Protection',
        category: 'Energy',
        region: 'North America',
        
        nacControls: {
            portnox: {
                coverage: 87,
                automated: ['Electronic Security Perimeter', 'Access Management', 'Monitoring']
            }
        },
        
        penalties: {
            maxPerDay: 1000000,
            maxPerViolation: 'Up to $1M per day'
        }
    },
    
    'ferpa': {
        id: 'ferpa',
        name: 'FERPA',
        fullName: 'Family Educational Rights and Privacy Act',
        category: 'Education',
        region: 'United States',
        
        nacControls: {
            portnox: {
                coverage: 83,
                automated: ['Access Control', 'Audit Logging', 'Data Protection']
            }
        }
    },
    
    'cjis': {
        id: 'cjis',
        name: 'CJIS Security Policy',
        fullName: 'Criminal Justice Information Services',
        category: 'Law Enforcement',
        region: 'United States',
        
        nacControls: {
            portnox: {
                coverage: 90,
                automated: ['Advanced Authentication', 'Encryption', 'Audit Logging']
            }
        }
    }
};

// Merge with existing databases
Object.assign(window.RiskInsuranceDatabase.industries, window.ExtendedIndustryDatabase);
Object.assign(window.ComplianceFrameworkDatabase, window.ExtendedComplianceDatabase);

console.log('✅ Extended Industry & Compliance Database loaded');
console.log('   Industries:', Object.keys(window.RiskInsuranceDatabase.industries).length);
console.log('   Compliance Frameworks:', Object.keys(window.ComplianceFrameworkDatabase).length);
