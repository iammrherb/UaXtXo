// Wait for ModuleLoader
(function() {
    function initComplianceDatabase() {
        if (!window.ModuleLoader) {
            setTimeout(initComplianceDatabase, 100);
            return;
        }

// Comprehensive Compliance Database
class ComplianceDatabase {
    constructor() {
        this.frameworks = {
            hipaa: {
                id: 'hipaa',
                name: 'HIPAA',
                fullName: 'Health Insurance Portability and Accountability Act',
                icon: '🏥',
                category: 'Healthcare',
                description: 'US healthcare data protection and privacy requirements',
                nacControls: [
                    {
                        id: '164.308(a)(1)',
                        title: 'Access Control',
                        description: 'Implement technical policies for electronic information systems',
                        nacCapability: 'User authentication and device authorization',
                        required: true
                    },
                    {
                        id: '164.308(a)(3)',
                        title: 'Workforce Security',
                        description: 'Procedures to ensure workforce member access is appropriate',
                        nacCapability: 'Role-based access control and segmentation',
                        required: true
                    },
                    {
                        id: '164.308(a)(4)',
                        title: 'Information Access Management',
                        description: 'Policies for granting access to ePHI',
                        nacCapability: 'Dynamic access policies based on user/device context',
                        required: true
                    },
                    {
                        id: '164.312(a)(1)',
                        title: 'Access Control Technical',
                        description: 'Technical measures to allow only authorized access',
                        nacCapability: '802.1X authentication and encryption',
                        required: true
                    },
                    {
                        id: '164.312(b)',
                        title: 'Audit Controls',
                        description: 'Hardware, software, procedural mechanisms for audit',
                        nacCapability: 'Comprehensive logging and reporting',
                        required: true
                    }
                ]
            },
            
            pci_dss: {
                id: 'pci_dss',
                name: 'PCI-DSS',
                fullName: 'Payment Card Industry Data Security Standard',
                icon: '💳',
                category: 'Financial',
                description: 'Security standards for organizations handling credit cards',
                nacControls: [
                    {
                        id: '1.1.2',
                        title: 'Network Segmentation',
                        description: 'Current network diagram with cardholder data flows',
                        nacCapability: 'VLAN assignment and micro-segmentation',
                        required: true
                    },
                    {
                        id: '2.3',
                        title: 'Encrypt Non-Console Access',
                        description: 'Encrypt all non-console administrative access',
                        nacCapability: 'Certificate-based authentication and encryption',
                        required: true
                    },
                    {
                        id: '7.1',
                        title: 'Limit Access to System Components',
                        description: 'Limit access to system components by business need',
                        nacCapability: 'Role-based network access control',
                        required: true
                    },
                    {
                        id: '8.1',
                        title: 'User Identification',
                        description: 'Assign unique ID to each person with computer access',
                        nacCapability: 'Unique user authentication and tracking',
                        required: true
                    },
                    {
                        id: '10.1',
                        title: 'Audit Trails',
                        description: 'Link all access to system components to users',
                        nacCapability: 'Complete access audit trails',
                        required: true
                    }
                ]
            },
            
            soc2: {
                id: 'soc2',
                name: 'SOC 2',
                fullName: 'Service Organization Control 2',
                icon: '🔒',
                category: 'General',
                description: 'Auditing standard for service organizations',
                nacControls: [
                    {
                        id: 'CC6.1',
                        title: 'Logical and Physical Access Controls',
                        description: 'Implement logical access security measures',
                        nacCapability: 'Network access control and authentication',
                        required: true
                    },
                    {
                        id: 'CC6.2',
                        title: 'Prior to Issuing System Credentials',
                        description: 'Registration and authorization of new users',
                        nacCapability: 'User onboarding and provisioning workflows',
                        required: true
                    },
                    {
                        id: 'CC6.3',
                        title: 'User Access Modification',
                        description: 'Process to modify or remove access',
                        nacCapability: 'Dynamic access control and deprovisioning',
                        required: true
                    },
                    {
                        id: 'CC7.2',
                        title: 'System Monitoring',
                        description: 'Monitor system components for anomalies',
                        nacCapability: 'Real-time network monitoring and alerting',
                        required: true
                    }
                ]
            },
            
            iso27001: {
                id: 'iso27001',
                name: 'ISO 27001',
                fullName: 'ISO/IEC 27001:2013',
                icon: '🌐',
                category: 'International',
                description: 'International information security management standard',
                nacControls: [
                    {
                        id: 'A.9.1',
                        title: 'Access Control Policy',
                        description: 'Business requirements for access control',
                        nacCapability: 'Policy-based network access control',
                        required: true
                    },
                    {
                        id: 'A.9.2',
                        title: 'User Access Management',
                        description: 'Formal user registration and de-registration',
                        nacCapability: 'User lifecycle management',
                        required: true
                    },
                    {
                        id: 'A.9.4',
                        title: 'System and Application Access Control',
                        description: 'Prevent unauthorized access to systems',
                        nacCapability: '802.1X and certificate-based authentication',
                        required: true
                    },
                    {
                        id: 'A.12.4',
                        title: 'Logging and Monitoring',
                        description: 'Recording events and generating evidence',
                        nacCapability: 'Comprehensive audit logging',
                        required: true
                    }
                ]
            },
            
            nist: {
                id: 'nist',
                name: 'NIST',
                fullName: 'NIST Cybersecurity Framework',
                icon: '🛡️',
                category: 'Government',
                description: 'Framework for improving critical infrastructure cybersecurity',
                nacControls: [
                    {
                        id: 'PR.AC-1',
                        title: 'Identity Management',
                        description: 'Identities and credentials are managed',
                        nacCapability: 'Comprehensive identity and device management',
                        required: true
                    },
                    {
                        id: 'PR.AC-3',
                        title: 'Remote Access',
                        description: 'Remote access is managed',
                        nacCapability: 'Secure remote access with posture checking',
                        required: true
                    },
                    {
                        id: 'PR.AC-4',
                        title: 'Access Permissions',
                        description: 'Access permissions with least privilege',
                        nacCapability: 'Least privilege and network segmentation',
                        required: true
                    },
                    {
                        id: 'PR.AC-5',
                        title: 'Network Integrity',
                        description: 'Network integrity is protected',
                        nacCapability: 'Network segmentation and isolation',
                        required: true
                    }
                ]
            },
            
            gdpr: {
                id: 'gdpr',
                name: 'GDPR',
                fullName: 'General Data Protection Regulation',
                icon: '🇪🇺',
                category: 'Privacy',
                description: 'EU data protection and privacy regulation',
                nacControls: [
                    {
                        id: 'Article 32',
                        title: 'Security of Processing',
                        description: 'Appropriate technical and organizational measures',
                        nacCapability: 'Access control and encryption',
                        required: true
                    },
                    {
                        id: 'Article 25',
                        title: 'Data Protection by Design',
                        description: 'Built-in data protection measures',
                        nacCapability: 'Privacy-preserving network access',
                        required: true
                    },
                    {
                        id: 'Article 35',
                        title: 'Data Protection Impact Assessment',
                        description: 'Assessment of high-risk processing',
                        nacCapability: 'Risk-based access control',
                        required: false
                    }
                ]
            },
            
            ccpa: {
                id: 'ccpa',
                name: 'CCPA',
                fullName: 'California Consumer Privacy Act',
                icon: '🐻',
                category: 'Privacy',
                description: 'California state privacy law',
                nacControls: [
                    {
                        id: '1798.150',
                        title: 'Security Breach',
                        description: 'Reasonable security procedures',
                        nacCapability: 'Access control and monitoring',
                        required: true
                    },
                    {
                        id: 'Reasonable Security',
                        title: 'Reasonable Security Measures',
                        description: 'Appropriate safeguards for personal information',
                        nacCapability: 'Network segmentation and access control',
                        required: true
                    }
                ]
            },
            
            ferpa: {
                id: 'ferpa',
                name: 'FERPA',
                fullName: 'Family Educational Rights and Privacy Act',
                icon: '🎓',
                category: 'Education',
                description: 'US student education records privacy law',
                nacControls: [
                    {
                        id: '99.31',
                        title: 'Prior Consent',
                        description: 'Consent before disclosure of education records',
                        nacCapability: 'Role-based access to student data',
                        required: true
                    },
                    {
                        id: '99.35',
                        title: 'Record of Disclosures',
                        description: 'Maintain record of disclosures',
                        nacCapability: 'Audit logging of access',
                        required: true
                    }
                ]
            },
            
            fedramp: {
                id: 'fedramp',
                name: 'FedRAMP',
                fullName: 'Federal Risk and Authorization Management Program',
                icon: '🏛️',
                category: 'Government',
                description: 'US government cloud security requirements',
                nacControls: [
                    {
                        id: 'AC-2',
                        title: 'Account Management',
                        description: 'Manage information system accounts',
                        nacCapability: 'Automated account management',
                        required: true
                    },
                    {
                        id: 'AC-3',
                        title: 'Access Enforcement',
                        description: 'Enforce approved authorizations',
                        nacCapability: 'Policy enforcement points',
                        required: true
                    },
                    {
                        id: 'AC-7',
                        title: 'Unsuccessful Login Attempts',
                        description: 'Limit consecutive invalid login attempts',
                        nacCapability: 'Account lockout and alerting',
                        required: true
                    }
                ]
            },
            
            cmmc: {
                id: 'cmmc',
                name: 'CMMC',
                fullName: 'Cybersecurity Maturity Model Certification',
                icon: '🎯',
                category: 'Defense',
                description: 'US DoD contractor cybersecurity requirements',
                nacControls: [
                    {
                        id: 'AC.1.001',
                        title: 'Limit System Access',
                        description: 'Limit access to authorized users',
                        nacCapability: 'User authentication and authorization',
                        required: true
                    },
                    {
                        id: 'AC.1.002',
                        title: 'Limit System Access to Transactions',
                        description: 'Limit access to types of transactions',
                        nacCapability: 'Role-based access control',
                        required: true
                    },
                    {
                        id: 'AC.2.016',
                        title: 'Control CUI Flow',
                        description: 'Control flow of CUI in accordance with authorizations',
                        nacCapability: 'Data-aware network segmentation',
                        required: true
                    }
                ]
            },
            
            nerc_cip: {
                id: 'nerc_cip',
                name: 'NERC CIP',
                fullName: 'North American Electric Reliability Corporation Critical Infrastructure Protection',
                icon: '⚡',
                category: 'Energy',
                description: 'Electric utility cybersecurity standards',
                nacControls: [
                    {
                        id: 'CIP-005-5',
                        title: 'Electronic Security Perimeter',
                        description: 'Manage electronic access to BES Cyber Systems',
                        nacCapability: 'Network segmentation and access control',
                        required: true
                    },
                    {
                        id: 'CIP-007-5',
                        title: 'System Security Management',
                        description: 'Manage system security through technical controls',
                        nacCapability: 'Device authentication and monitoring',
                        required: true
                    }
                ]
            },
            
            sox: {
                id: 'sox',
                name: 'SOX',
                fullName: 'Sarbanes-Oxley Act',
                icon: '📊',
                category: 'Financial',
                description: 'US public company accounting reform',
                nacControls: [
                    {
                        id: 'Section 404',
                        title: 'Internal Controls',
                        description: 'Assessment of internal controls',
                        nacCapability: 'Access control to financial systems',
                        required: true
                    },
                    {
                        id: 'IT General Controls',
                        title: 'ITGC',
                        description: 'IT controls over financial reporting',
                        nacCapability: 'User access management and monitoring',
                        required: true
                    }
                ]
            },
            
            glba: {
                id: 'glba',
                name: 'GLBA',
                fullName: 'Gramm-Leach-Bliley Act',
                icon: '🏦',
                category: 'Financial',
                description: 'US financial services privacy and security',
                nacControls: [
                    {
                        id: 'Safeguards Rule',
                        title: 'Administrative Safeguards',
                        description: 'Designate employees to coordinate safeguards',
                        nacCapability: 'Access control and user management',
                        required: true
                    },
                    {
                        id: 'Technical Safeguards',
                        title: 'Access Controls',
                        description: 'Implement access controls on customer information',
                        nacCapability: 'Network segmentation and authentication',
                        required: true
                    }
                ]
            }
        };
        
        console.log(`[ComplianceDatabase] Loaded ${Object.keys(this.frameworks).length} frameworks`);
    }
    
    getAll() {
        return this.frameworks;
    }
    
    get(frameworkId) {
        return this.frameworks[frameworkId];
    }
    
    getByCategory(category) {
        return Object.values(this.frameworks).filter(f => f.category === category);
    }
    
    getControls(frameworkId) {
        const framework = this.frameworks[frameworkId];
        return framework ? framework.nacControls : [];
    }
    
    getRequiredControls(frameworkId) {
        const framework = this.frameworks[frameworkId];
        return framework ? framework.nacControls.filter(c => c.required) : [];
    }
    
    assessVendorCompliance(vendorFeatures, frameworkId) {
        const framework = this.frameworks[frameworkId];
        if (!framework) return null;
        
        const assessment = {
            framework: framework.name,
            totalControls: framework.nacControls.length,
            metControls: 0,
            partialControls: 0,
            unmetControls: 0,
            score: 0,
            details: []
        };
        
        // Simple assessment logic - in real implementation would be more sophisticated
        framework.nacControls.forEach(control => {
            let status = 'unmet';
            
            // Check vendor features against control requirements
            if (vendorFeatures.certificateManagement && control.nacCapability.includes('authentication')) {
                status = 'met';
            } else if (vendorFeatures.apiIntegration && control.nacCapability.includes('audit')) {
                status = 'met';
            } else if (vendorFeatures.riskScoring && control.nacCapability.includes('risk')) {
                status = 'met';
            } else if (vendorFeatures.multiVendor) {
                status = 'partial';
            }
            
            assessment.details.push({
                control: control.id,
                title: control.title,
                status: status
            });
            
            if (status === 'met') assessment.metControls++;
            else if (status === 'partial') assessment.partialControls++;
            else assessment.unmetControls++;
        });
        
        assessment.score = Math.round((assessment.metControls / assessment.totalControls) * 100);
        
        return assessment;
    }
}

// Register with ModuleLoader
ModuleLoader.register('ComplianceDatabase', ComplianceDatabase);

// Close the initialization wrapper
    }
    initComplianceDatabase();
})();

// Register with ModuleLoader
if (window.ModuleLoader && window.ComplianceDatabase) {
    window.ModuleLoader.register('ComplianceDatabase', window.ComplianceDatabase);
}
