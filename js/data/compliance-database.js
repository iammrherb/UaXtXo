// Comprehensive Compliance Framework Database
window.ComplianceDatabase = {
    // HEALTHCARE FRAMEWORKS
    'HIPAA': {
        id: 'hipaa',
        name: 'HIPAA',
        fullName: 'Health Insurance Portability and Accountability Act',
        category: 'Healthcare',
        region: 'United States',
        
        overview: {
            purpose: 'Protect patient health information privacy and security',
            scope: 'Covered entities and business associates',
            enforcer: 'HHS Office for Civil Rights',
            established: 1996,
            lastUpdated: 2013
        },
        
        requirements: {
            administrative: {
                'Security Officer': { required: true, nacControl: 'Role-based access' },
                'Workforce Training': { required: true, nacControl: 'User awareness' },
                'Access Management': { required: true, nacControl: 'Identity management' },
                'Workforce Clearance': { required: true, nacControl: 'User vetting' },
                'Risk Assessment': { required: true, nacControl: 'Continuous monitoring' }
            },
            physical: {
                'Facility Access': { required: true, nacControl: 'Physical security integration' },
                'Workstation Use': { required: true, nacControl: 'Device control' },
                'Device Controls': { required: true, nacControl: 'Asset management' }
            },
            technical: {
                'Access Control': { required: true, nacControl: '802.1X, RBAC' },
                'Audit Controls': { required: true, nacControl: 'Logging and monitoring' },
                'Integrity Controls': { required: true, nacControl: 'Data protection' },
                'Transmission Security': { required: true, nacControl: 'Encryption' }
            }
        },
        
        nacMapping: {
            'Unique User Identification': ['802.1X authentication', 'Device certificates'],
            'Automatic Logoff': ['Session timeout', 'Idle detection'],
            'Encryption and Decryption': ['Data in transit encryption', 'VPN'],
            'Audit Logging': ['Centralized logging', 'SIEM integration'],
            'Access Control': ['Network segmentation', 'Microsegmentation'],
            'Person Authentication': ['MFA', 'Certificate-based auth'],
            'Device Authentication': ['Device profiling', 'Fingerprinting'],
            'Security Incident Response': ['Automated response', 'Quarantine']
        },
        
        penalties: {
            tiers: [
                { violation: 'Unknowing', min: 100, max: 50000 },
                { violation: 'Reasonable Cause', min: 1000, max: 100000 },
                { violation: 'Willful Neglect - Corrected', min: 10000, max: 250000 },
                { violation: 'Willful Neglect - Not Corrected', min: 50000, max: 1500000 }
            ],
            annualMax: 1500000,
            criminalPenalties: true
        }
    },
    
    'PCI DSS': {
        id: 'pcidss',
        name: 'PCI DSS',
        fullName: 'Payment Card Industry Data Security Standard',
        category: 'Financial',
        region: 'Global',
        
        overview: {
            purpose: 'Protect cardholder data and reduce credit card fraud',
            scope: 'Any entity that processes, stores, or transmits cardholder data',
            enforcer: 'PCI Security Standards Council',
            established: 2004,
            currentVersion: '4.0'
        },
        
        requirements: {
            'Build and Maintain Secure Networks': {
                '1.1': { requirement: 'Firewall configuration standards', nacControl: 'Network segmentation' },
                '1.2': { requirement: 'Restrict connections', nacControl: 'Access control lists' },
                '2.1': { requirement: 'Change defaults', nacControl: 'Configuration management' },
                '2.2': { requirement: 'Harden systems', nacControl: 'Security baselines' }
            },
            'Protect Cardholder Data': {
                '3.1': { requirement: 'Data retention', nacControl: 'Data classification' },
                '3.4': { requirement: 'Encrypt storage', nacControl: 'Encryption policies' },
                '4.1': { requirement: 'Encrypt transmission', nacControl: 'VPN/TLS enforcement' }
            },
            'Vulnerability Management': {
                '5.1': { requirement: 'Anti-malware', nacControl: 'Endpoint protection' },
                '5.2': { requirement: 'Update anti-malware', nacControl: 'Automated updates' },
                '6.1': { requirement: 'Patch management', nacControl: 'Vulnerability scanning' }
            },
            'Access Control': {
                '7.1': { requirement: 'Limit access', nacControl: 'Role-based access' },
                '7.2': { requirement: 'Establish access control', nacControl: 'Identity management' },
                '8.1': { requirement: 'Unique IDs', nacControl: '802.1X authentication' },
                '8.2': { requirement: 'Authentication', nacControl: 'Multi-factor auth' }
            },
            'Monitoring and Testing': {
                '10.1': { requirement: 'Audit trails', nacControl: 'Centralized logging' },
                '10.2': { requirement: 'Log events', nacControl: 'Event correlation' },
                '11.1': { requirement: 'Test security', nacControl: 'Penetration testing' }
            },
            'Security Policies': {
                '12.1': { requirement: 'Security policy', nacControl: 'Policy enforcement' },
                '12.2': { requirement: 'Risk assessment', nacControl: 'Continuous assessment' }
            }
        },
        
        nacMapping: {
            'Network Segmentation': ['VLAN segregation', 'Microsegmentation', 'Zero Trust zones'],
            'Access Control': ['802.1X', 'MAB', 'Guest isolation'],
            'Monitoring': ['Real-time alerts', 'Anomaly detection', 'Behavioral analysis'],
            'Vulnerability Management': ['Asset discovery', 'Patch status', 'Risk scoring'],
            'Incident Response': ['Automated containment', 'Forensic data', 'Quarantine'],
            'Compliance Reporting': ['Automated reports', 'Evidence collection', 'Audit trails']
        },
        
        penalties: {
            fines: { min: 5000, max: 100000, frequency: 'monthly' },
            increasedFees: true,
            terminationRisk: true,
            brandDamage: 'Severe'
        }
    },
    
    'GDPR': {
        id: 'gdpr',
        name: 'GDPR',
        fullName: 'General Data Protection Regulation',
        category: 'Privacy',
        region: 'European Union',
        
        overview: {
            purpose: 'Protect EU citizens\' personal data and privacy',
            scope: 'Any organization processing EU residents\' data',
            enforcer: 'National Data Protection Authorities',
            established: 2018,
            extraterritorial: true
        },
        
        requirements: {
            principles: {
                'Lawfulness': { requirement: 'Legal basis for processing', nacControl: 'Access justification' },
                'Purpose Limitation': { requirement: 'Specific purposes', nacControl: 'Data classification' },
                'Data Minimization': { requirement: 'Necessary data only', nacControl: 'Access restrictions' },
                'Accuracy': { requirement: 'Keep data accurate', nacControl: 'Data governance' },
                'Storage Limitation': { requirement: 'Limited retention', nacControl: 'Automated deletion' },
                'Security': { requirement: 'Appropriate security', nacControl: 'Comprehensive security' },
                'Accountability': { requirement: 'Demonstrate compliance', nacControl: 'Audit trails' }
            },
            rights: {
                'Access': { requirement: 'Right to access data', nacControl: 'Data discovery' },
                'Rectification': { requirement: 'Right to correct', nacControl: 'Update mechanisms' },
                'Erasure': { requirement: 'Right to delete', nacControl: 'Data removal' },
                'Portability': { requirement: 'Data transfer', nacControl: 'Export capabilities' },
                'Object': { requirement: 'Opt-out rights', nacControl: 'Consent management' }
            },
            technical: {
                'Privacy by Design': { requirement: 'Built-in privacy', nacControl: 'Zero Trust architecture' },
                'Data Protection': { requirement: 'Pseudonymization', nacControl: 'Encryption' },
                'Breach Notification': { requirement: '72-hour notice', nacControl: 'Incident detection' },
                'Impact Assessment': { requirement: 'DPIA required', nacControl: 'Risk assessment' }
            }
        },
        
        nacMapping: {
            'Access Control': ['Identity verification', 'Purpose-based access', 'Consent tracking'],
            'Data Security': ['Encryption at rest/transit', 'Anonymization', 'Secure deletion'],
            'Monitoring': ['Access logging', 'Data flow tracking', 'Anomaly detection'],
            'Incident Response': ['Breach detection', 'Automated alerts', '72-hour compliance'],
            'Consent Management': ['User preferences', 'Opt-in/out tracking', 'Purpose limitation'],
            'Data Governance': ['Classification', 'Retention policies', 'Cross-border controls']
        },
        
        penalties: {
            tiers: [
                { level: 'Lower', amount: '2% of global revenue or €10M' },
                { level: 'Higher', amount: '4% of global revenue or €20M' }
            ],
            factors: ['Nature of breach', 'Negligence', 'Mitigation', 'Cooperation'],
            reputational: 'Severe'
        }
    },
    
    'SOC 2': {
        id: 'soc2',
        name: 'SOC 2',
        fullName: 'Service Organization Control 2',
        category: 'Security Standard',
        region: 'Global',
        
        overview: {
            purpose: 'Verify service provider security controls',
            scope: 'Service organizations storing customer data',
            enforcer: 'AICPA',
            types: ['Type I - Point in time', 'Type II - Period of time'],
            trustPrinciples: 5
        },
        
        requirements: {
            security: {
                'CC6.1': { control: 'Logical access controls', nacControl: 'Identity management' },
                'CC6.2': { control: 'New user access', nacControl: 'Provisioning workflow' },
                'CC6.3': { control: 'User access removal', nacControl: 'Deprovisioning' },
                'CC6.6': { control: 'Logical access security', nacControl: 'Network segmentation' },
                'CC6.7': { control: 'Transmission protection', nacControl: 'Encryption' },
                'CC6.8': { control: 'Incident prevention', nacControl: 'IDS/IPS' }
            },
            availability: {
                'A1.1': { control: 'Capacity planning', nacControl: 'Resource monitoring' },
                'A1.2': { control: 'Environmental protection', nacControl: 'Redundancy' },
                'A1.3': { control: 'Recovery procedures', nacControl: 'Failover' }
            },
            confidentiality: {
                'C1.1': { control: 'Confidential information', nacControl: 'Data classification' },
                'C1.2': { control: 'Disposal', nacControl: 'Secure deletion' }
            },
            processingIntegrity: {
                'PI1.1': { control: 'Processing accuracy', nacControl: 'Validation controls' },
                'PI1.2': { control: 'Complete processing', nacControl: 'Transaction monitoring' }
            },
            privacy: {
                'P1.1': { control: 'Privacy notice', nacControl: 'Consent management' },
                'P2.1': { control: 'Choice and consent', nacControl: 'Preference center' }
            }
        },
        
        nacMapping: {
            'Access Control': ['Role-based access', 'Privileged access management', 'Session control'],
            'Network Security': ['Segmentation', 'Firewall rules', 'IDS/IPS integration'],
            'Data Protection': ['Encryption', 'DLP', 'Classification enforcement'],
            'Monitoring': ['Continuous monitoring', 'Log aggregation', 'SIEM integration'],
            'Incident Management': ['Detection', 'Response automation', 'Forensics'],
            'Change Management': ['Configuration control', 'Approval workflows', 'Rollback']
        }
    },
    
    'ISO 27001': {
        id: 'iso27001',
        name: 'ISO 27001',
        fullName: 'ISO/IEC 27001:2022',
        category: 'Security Standard',
        region: 'International',
        
        overview: {
            purpose: 'Information security management system standard',
            scope: 'Any organization',
            enforcer: 'Certification bodies',
            currentVersion: '2022',
            controls: 93
        },
        
        requirements: {
            organizational: {
                'A.5': { domain: 'Organizational controls', controls: 37 },
                'A.6': { domain: 'People controls', controls: 8 },
                'A.7': { domain: 'Physical controls', controls: 14 },
                'A.8': { domain: 'Technological controls', controls: 34 }
            },
            mandatory: {
                'Context': { requirement: 'Understand organization', nacControl: 'Asset inventory' },
                'Leadership': { requirement: 'Management commitment', nacControl: 'Policy enforcement' },
                'Planning': { requirement: 'Risk assessment', nacControl: 'Risk scoring' },
                'Support': { requirement: 'Resources and awareness', nacControl: 'Training tracking' },
                'Operation': { requirement: 'Risk treatment', nacControl: 'Control implementation' },
                'Evaluation': { requirement: 'Monitoring and audit', nacControl: 'Continuous assessment' },
                'Improvement': { requirement: 'Corrective action', nacControl: 'Incident learning' }
            }
        },
        
        nacMapping: {
            'Access Control': ['A.5.15 - Access control', 'A.5.16 - Identity management', 'A.5.17 - Authentication'],
            'Asset Management': ['A.5.9 - Inventory', 'A.5.10 - Acceptable use', 'A.5.11 - Return of assets'],
            'Network Security': ['A.8.20 - Networks security', 'A.8.21 - Network services', 'A.8.22 - Segregation'],
            'Operations Security': ['A.8.1 - User endpoints', 'A.8.9 - Configuration', 'A.8.10 - Information deletion'],
            'Incident Management': ['A.5.24 - Planning', 'A.5.25 - Assessment', 'A.5.26 - Response'],
            'Compliance': ['A.5.31 - Legal requirements', 'A.5.32 - IP rights', 'A.5.33 - Records protection']
        }
    },
    
    'NIST 800-53': {
        id: 'nist80053',
        name: 'NIST 800-53',
        fullName: 'Security and Privacy Controls for Information Systems',
        category: 'Government',
        region: 'United States',
        
        overview: {
            purpose: 'Security controls for federal information systems',
            scope: 'Federal agencies and contractors',
            enforcer: 'NIST',
            currentRevision: 5,
            controls: 1000
        },
        
        controlFamilies: {
            'AC': {
                name: 'Access Control',
                controls: 25,
                nacMapping: ['Network access', 'Account management', 'Privilege management']
            },
            'AU': {
                name: 'Audit and Accountability',
                controls: 16,
                nacMapping: ['Log collection', 'Analysis', 'Retention']
            },
            'CA': {
                name: 'Assessment and Authorization',
                controls: 9,
                nacMapping: ['Security assessments', 'Continuous monitoring']
            },
            'CM': {
                name: 'Configuration Management',
                controls: 14,
                nacMapping: ['Baseline configs', 'Change control', 'Asset inventory']
            },
            'IA': {
                name: 'Identification and Authentication',
                controls: 12,
                nacMapping: ['User identification', 'Device authentication', 'MFA']
            },
            'SC': {
                name: 'System and Communications Protection',
                controls: 51,
                nacMapping: ['Network segmentation', 'Boundary protection', 'Encryption']
            }
        },
        
        impactLevels: {
            low: { controls: 'Baseline', nacRequirements: 'Basic' },
            moderate: { controls: 'Enhanced', nacRequirements: 'Advanced' },
            high: { controls: 'Maximum', nacRequirements: 'Comprehensive' }
        }
    },
    
    'CMMC': {
        id: 'cmmc',
        name: 'CMMC',
        fullName: 'Cybersecurity Maturity Model Certification',
        category: 'Government',
        region: 'United States',
        
        overview: {
            purpose: 'Protect defense industrial base',
            scope: 'DoD contractors',
            enforcer: 'CMMC Accreditation Body',
            version: '2.0',
            levels: 3
        },
        
        levels: {
            1: {
                name: 'Foundational',
                practices: 17,
                focus: 'Basic cyber hygiene',
                nacRequirements: ['Basic access control', 'Device identification']
            },
            2: {
                name: 'Advanced',
                practices: 110,
                focus: 'CUI protection',
                nacRequirements: ['Advanced access control', 'Network segmentation', 'Monitoring']
            },
            3: {
                name: 'Expert',
                practices: 110,
                focus: 'APT protection',
                nacRequirements: ['Zero Trust', 'Continuous monitoring', 'Advanced threat protection']
            }
        },
        
        domains: {
            'AC': { name: 'Access Control', l1: 4, l2: 22, l3: 22 },
            'AU': { name: 'Audit and Accountability', l1: 0, l2: 9, l3: 9 },
            'CM': { name: 'Configuration Management', l1: 0, l2: 9, l3: 9 },
            'IA': { name: 'Identification and Authentication', l1: 2, l2: 11, l3: 11 },
            'SC': { name: 'System and Communications', l1: 2, l2: 16, l3: 16 }
        }
    },
    
    'NERC CIP': {
        id: 'nerccip',
        name: 'NERC CIP',
        fullName: 'North American Electric Reliability Corporation Critical Infrastructure Protection',
        category: 'Critical Infrastructure',
        region: 'North America',
        
        overview: {
            purpose: 'Secure electric grid',
            scope: 'Bulk electric system',
            enforcer: 'NERC/FERC',
            standards: 11,
            fines: 'Up to $1M per day'
        },
        
        standards: {
            'CIP-002': {
                name: 'BES Cyber System Categorization',
                nacControl: 'Asset classification and inventory'
            },
            'CIP-003': {
                name: 'Security Management Controls',
                nacControl: 'Policy enforcement and access control'
            },
            'CIP-004': {
                name: 'Personnel & Training',
                nacControl: 'User access management and training'
            },
            'CIP-005': {
                name: 'Electronic Security Perimeters',
                nacControl: 'Network segmentation and perimeter control'
            },
            'CIP-006': {
                name: 'Physical Security',
                nacControl: 'Physical access integration'
            },
            'CIP-007': {
                name: 'System Security Management',
                nacControl: 'Configuration and patch management'
            },
            'CIP-008': {
                name: 'Incident Reporting',
                nacControl: 'Incident detection and response'
            },
            'CIP-009': {
                name: 'Recovery Planning',
                nacControl: 'Backup and recovery procedures'
            },
            'CIP-010': {
                name: 'Configuration Management',
                nacControl: 'Change detection and monitoring'
            },
            'CIP-011': {
                name: 'Information Protection',
                nacControl: 'Data classification and protection'
            }
        }
    },
    
    'FedRAMP': {
        id: 'fedramp',
        name: 'FedRAMP',
        fullName: 'Federal Risk and Authorization Management Program',
        category: 'Government',
        region: 'United States',
        
        overview: {
            purpose: 'Standardize cloud security for government',
            scope: 'Cloud service providers',
            enforcer: 'FedRAMP PMO',
            baselines: 3,
            controls: 'NIST 800-53 based'
        },
        
        impactLevels: {
            low: {
                controls: 125,
                nacRequirements: ['Basic monitoring', 'Access control', 'Logging']
            },
            moderate: {
                controls: 325,
                nacRequirements: ['Continuous monitoring', 'Advanced access', 'Encryption']
            },
            high: {
                controls: 421,
                nacRequirements: ['Real-time monitoring', 'Zero Trust', 'Advanced analytics']
            }
        },
        
        continuousMonitoring: {
            monthly: ['Vulnerability scans', 'Access reviews', 'Log analysis'],
            annually: ['Penetration testing', 'Risk assessment', 'Control assessment'],
            ongoing: ['Configuration monitoring', 'Incident response', 'Change control']
        }
    },
    
    // Additional frameworks...
    'CCPA': {
        id: 'ccpa',
        name: 'CCPA',
        fullName: 'California Consumer Privacy Act',
        category: 'Privacy',
        region: 'California, USA',
        overview: {
            purpose: 'Protect California residents\' personal information',
            scope: 'Businesses meeting thresholds',
            enforcer: 'California Attorney General',
            established: 2020
        }
    },
    
    'FERPA': {
        id: 'ferpa',
        name: 'FERPA',
        fullName: 'Family Educational Rights and Privacy Act',
        category: 'Education',
        region: 'United States',
        overview: {
            purpose: 'Protect student education records',
            scope: 'Educational institutions',
            enforcer: 'Department of Education',
            established: 1974
        }
    },
    
    'GLBA': {
        id: 'glba',
        name: 'GLBA',
        fullName: 'Gramm-Leach-Bliley Act',
        category: 'Financial',
        region: 'United States',
        overview: {
            purpose: 'Protect financial information',
            scope: 'Financial institutions',
            enforcer: 'FTC, SEC, Banking regulators',
            established: 1999
        }
    },
    
    'TISAX': {
        id: 'tisax',
        name: 'TISAX',
        fullName: 'Trusted Information Security Assessment Exchange',
        category: 'Automotive',
        region: 'Germany/Global',
        overview: {
            purpose: 'Automotive industry information security',
            scope: 'Automotive suppliers',
            enforcer: 'ENX Association',
            established: 2017
        }
    }
};

// Compliance analysis methods
window.ComplianceDatabase.analyzeCompliance = function(frameworkId, vendorId) {
    const framework = this[frameworkId];
    const vendor = window.VendorDatabase[vendorId];
    
    if (!framework || !vendor) return null;
    
    return {
        coverage: this.calculateCoverage(framework, vendor),
        gaps: this.identifyGaps(framework, vendor),
        implementation: this.getImplementation(framework, vendor),
        automation: this.assessAutomation(framework, vendor)
    };
};

window.ComplianceDatabase.calculateCoverage = function(framework, vendor) {
    let covered = 0;
    let total = 0;
    
    // Check if vendor explicitly supports this framework
    if (vendor.features.compliance.frameworks.includes(framework.name)) {
        covered = 0.95; // 95% coverage for explicitly supported
    } else {
        // Calculate based on control mapping
        if (framework.nacMapping) {
            Object.keys(framework.nacMapping).forEach(control => {
                total++;
                if (this.vendorSupportsControl(vendor, control)) {
                    covered += 1;
                }
            });
            covered = total > 0 ? covered / total : 0;
        } else {
            covered = 0.5; // Default 50% for basic support
        }
    }
    
    return {
        percentage: Math.round(covered * 100),
        rating: covered >= 0.9 ? 'Excellent' : 
               covered >= 0.7 ? 'Good' : 
               covered >= 0.5 ? 'Adequate' : 'Poor'
    };
};

window.ComplianceDatabase.vendorSupportsControl = function(vendor, control) {
    // Simplified check - real implementation would be more detailed
    const vendorCapabilities = {
        portnox: 0.95, // Excellent coverage
        cisco: 0.70,
        aruba: 0.65,
        others: 0.50
    };
    
    return Math.random() < (vendorCapabilities[vendor.id] || vendorCapabilities.others);
};

console.log('[ComplianceDatabase] Loaded ' + Object.keys(window.ComplianceDatabase).filter(k => typeof window.ComplianceDatabase[k] === 'object').length + ' frameworks');
