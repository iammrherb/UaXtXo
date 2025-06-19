/**
 * Comprehensive Compliance Framework Database
 * Includes all major frameworks with detailed control mappings
 */

window.ComplianceFrameworkDatabase = {
    // SOC 2 Type II
    'soc2': {
        id: 'soc2',
        name: 'SOC 2 Type II',
        fullName: 'Service Organization Control 2 Type II',
        category: 'Security Audit',
        description: 'AICPA framework for security, availability, processing integrity, confidentiality, and privacy',
        
        trustServiceCriteria: {
            'CC1': {
                name: 'Control Environment',
                nacControls: [
                    'Role-based access control',
                    'Segregation of duties',
                    'Management oversight',
                    'Security awareness training'
                ]
            },
            'CC2': {
                name: 'Communication and Information',
                nacControls: [
                    'Security policy documentation',
                    'Incident communication procedures',
                    'Change management notifications',
                    'Compliance reporting'
                ]
            },
            'CC3': {
                name: 'Risk Assessment',
                nacControls: [
                    'Continuous risk monitoring',
                    'Vulnerability assessments',
                    'Threat intelligence integration',
                    'Risk-based access decisions'
                ]
            },
            'CC4': {
                name: 'Monitoring Activities',
                nacControls: [
                    'Real-time activity monitoring',
                    'Anomaly detection',
                    'Compliance monitoring',
                    'Performance monitoring'
                ]
            },
            'CC5': {
                name: 'Control Activities',
                nacControls: [
                    'Access control enforcement',
                    'Network segmentation',
                    'Device authentication',
                    'Policy enforcement'
                ]
            },
            'CC6': {
                name: 'Logical and Physical Access Controls',
                nacControls: [
                    'Multi-factor authentication',
                    'Zero Trust verification',
                    'Device trust assessment',
                    'Privileged access management'
                ]
            },
            'CC7': {
                name: 'System Operations',
                nacControls: [
                    'Configuration management',
                    'Change control',
                    'Capacity management',
                    'Backup and recovery'
                ]
            },
            'CC8': {
                name: 'Change Management',
                nacControls: [
                    'Change approval workflows',
                    'Testing procedures',
                    'Rollback capabilities',
                    'Documentation requirements'
                ]
            },
            'CC9': {
                name: 'Risk Mitigation',
                nacControls: [
                    'Automated remediation',
                    'Incident response',
                    'Business continuity',
                    'Disaster recovery'
                ]
            }
        },
        
        vendorCompliance: {
            'portnox': {
                certified: true,
                certificationDate: '2023-01-15',
                coverage: 100,
                automationLevel: 95,
                evidence: 'Automated evidence collection and reporting'
            },
            'cisco': {
                certified: false,
                coverage: 75,
                automationLevel: 30,
                evidence: 'Manual evidence collection required'
            },
            'aruba': {
                certified: false,
                coverage: 70,
                automationLevel: 25
            }
        }
    },
    
    // ISO 27001
    'iso27001': {
        id: 'iso27001',
        name: 'ISO 27001',
        fullName: 'ISO/IEC 27001:2022',
        category: 'Information Security',
        description: 'International standard for information security management systems',
        
        controls: {
            'A.5': {
                name: 'Organizational controls',
                nacRelevant: [
                    'A.5.1 - Policies for information security',
                    'A.5.2 - Information security roles and responsibilities',
                    'A.5.3 - Segregation of duties',
                    'A.5.7 - Threat intelligence',
                    'A.5.9 - Inventory of information and other associated assets'
                ]
            },
            'A.6': {
                name: 'People controls',
                nacRelevant: [
                    'A.6.1 - Screening',
                    'A.6.2 - Terms and conditions of employment',
                    'A.6.3 - Information security awareness',
                    'A.6.6 - Confidentiality agreements'
                ]
            },
            'A.7': {
                name: 'Physical controls',
                nacRelevant: [
                    'A.7.1 - Physical security perimeters',
                    'A.7.2 - Physical entry',
                    'A.7.7 - Clear desk and clear screen',
                    'A.7.9 - Security of assets off-premises'
                ]
            },
            'A.8': {
                name: 'Technological controls',
                nacRelevant: [
                    'A.8.1 - User endpoint devices',
                    'A.8.2 - Privileged access rights',
                    'A.8.3 - Information access restriction',
                    'A.8.4 - Access to source code',
                    'A.8.5 - Secure authentication',
                    'A.8.6 - Capacity management',
                    'A.8.7 - Protection against malware',
                    'A.8.8 - Management of technical vulnerabilities',
                    'A.8.9 - Configuration management',
                    'A.8.10 - Information deletion',
                    'A.8.12 - Data leakage prevention',
                    'A.8.15 - Logging',
                    'A.8.16 - Monitoring activities',
                    'A.8.18 - Use of privileged utility programs',
                    'A.8.19 - Installation of software on operational systems',
                    'A.8.20 - Networks security',
                    'A.8.21 - Security of network services',
                    'A.8.22 - Segregation of networks',
                    'A.8.23 - Web filtering',
                    'A.8.24 - Use of cryptography'
                ]
            }
        },
        
        vendorCompliance: {
            'portnox': {
                certified: true,
                coverage: 96,
                certificationNumber: 'ISO/IEC 27001:2022 #12345',
                automatedControls: 114
            }
        }
    },
    
    // HIPAA
    'hipaa': {
        id: 'hipaa',
        name: 'HIPAA',
        fullName: 'Health Insurance Portability and Accountability Act',
        category: 'Healthcare',
        description: 'US healthcare privacy and security requirements',
        
        safeguards: {
            'administrative': {
                name: 'Administrative Safeguards',
                requirements: [
                    '164.308(a)(1) - Security Management Process',
                    '164.308(a)(2) - Assigned Security Responsibility',
                    '164.308(a)(3) - Workforce Security',
                    '164.308(a)(4) - Information Access Management',
                    '164.308(a)(5) - Security Awareness and Training',
                    '164.308(a)(6) - Security Incident Procedures',
                    '164.308(a)(7) - Contingency Plan',
                    '164.308(a)(8) - Evaluation'
                ],
                nacImplementation: [
                    'Risk assessments and management',
                    'Role-based access control',
                    'User access reviews',
                    'Training tracking and enforcement',
                    'Incident detection and response',
                    'Audit logging and monitoring'
                ]
            },
            'physical': {
                name: 'Physical Safeguards',
                requirements: [
                    '164.310(a) - Facility Access Controls',
                    '164.310(b) - Workstation Use',
                    '164.310(c) - Workstation Security',
                    '164.310(d) - Device and Media Controls'
                ],
                nacImplementation: [
                    'Device location tracking',
                    'Workstation access control',
                    'Device compliance checking',
                    'Media encryption enforcement'
                ]
            },
            'technical': {
                name: 'Technical Safeguards',
                requirements: [
                    '164.312(a) - Access Control',
                    '164.312(b) - Audit Controls',
                    '164.312(c) - Integrity',
                    '164.312(d) - Person or Entity Authentication',
                    '164.312(e) - Transmission Security'
                ],
                nacImplementation: [
                    'Unique user identification',
                    'Automatic logoff',
                    'Encryption and decryption',
                    'Audit logs',
                    'Authentication mechanisms',
                    'Transmission encryption'
                ]
            }
        },
        
        vendorCompliance: {
            'portnox': {
                baaReady: true,
                coverage: 94,
                attestation: 'Third-party HIPAA assessment completed'
            }
        }
    },
    
    // GDPR
    'gdpr': {
        id: 'gdpr',
        name: 'GDPR',
        fullName: 'General Data Protection Regulation',
        category: 'Privacy',
        description: 'EU data protection and privacy regulation',
        
        articles: {
            'Article 5': {
                name: 'Principles relating to processing',
                nacRelevance: [
                    'Lawfulness, fairness and transparency',
                    'Purpose limitation',
                    'Data minimisation',
                    'Accuracy',
                    'Storage limitation',
                    'Integrity and confidentiality'
                ]
            },
            'Article 25': {
                name: 'Data protection by design and default',
                nacRelevance: [
                    'Technical and organizational measures',
                    'Privacy by default settings',
                    'Minimization of data processing'
                ]
            },
            'Article 32': {
                name: 'Security of processing',
                nacRelevance: [
                    'Pseudonymization and encryption',
                    'Confidentiality, integrity, availability',
                    'Resilience of systems',
                    'Regular testing and evaluation'
                ]
            }
        }
    },
    
    // PCI DSS
    'pcidss': {
        id: 'pcidss',
        name: 'PCI DSS',
        fullName: 'Payment Card Industry Data Security Standard v4.0',
        category: 'Financial',
        description: 'Security standards for payment card data',
        
        requirements: {
            'Requirement 1': {
                name: 'Network Security Controls',
                nacControls: [
                    'Network segmentation',
                    'Restrict inbound/outbound traffic',
                    'Document all connections'
                ]
            },
            'Requirement 2': {
                name: 'Apply Secure Configurations',
                nacControls: [
                    'Change default credentials',
                    'Develop configuration standards',
                    'Inventory all system components'
                ]
            },
            'Requirement 7': {
                name: 'Restrict Access by Business Need',
                nacControls: [
                    'Limit access to system components',
                    'Establish access control systems',
                    'Ensure appropriate access rights'
                ]
            },
            'Requirement 8': {
                name: 'Identify Users and Authenticate Access',
                nacControls: [
                    'Unique user IDs',
                    'Strong authentication',
                    'Multi-factor authentication',
                    'Password policies'
                ]
            },
            'Requirement 10': {
                name: 'Log and Monitor Access',
                nacControls: [
                    'Log all access attempts',
                    'Record all actions',
                    'Protect log data',
                    'Review logs daily'
                ]
            }
        }
    },
    
    // NIST Cybersecurity Framework
    'nist-csf': {
        id: 'nist-csf',
        name: 'NIST CSF',
        fullName: 'NIST Cybersecurity Framework 2.0',
        category: 'Cybersecurity',
        
        functions: {
            'IDENTIFY': {
                categories: [
                    'Asset Management (ID.AM)',
                    'Business Environment (ID.BE)',
                    'Governance (ID.GV)',
                    'Risk Assessment (ID.RA)',
                    'Risk Management Strategy (ID.RM)',
                    'Supply Chain Risk Management (ID.SC)'
                ]
            },
            'PROTECT': {
                categories: [
                    'Identity Management and Access Control (PR.AC)',
                    'Awareness and Training (PR.AT)',
                    'Data Security (PR.DS)',
                    'Information Protection (PR.IP)',
                    'Maintenance (PR.MA)',
                    'Protective Technology (PR.PT)'
                ]
            },
            'DETECT': {
                categories: [
                    'Anomalies and Events (DE.AE)',
                    'Security Continuous Monitoring (DE.CM)',
                    'Detection Processes (DE.DP)'
                ]
            },
            'RESPOND': {
                categories: [
                    'Response Planning (RS.RP)',
                    'Communications (RS.CO)',
                    'Analysis (RS.AN)',
                    'Mitigation (RS.MI)',
                    'Improvements (RS.IM)'
                ]
            },
            'RECOVER': {
                categories: [
                    'Recovery Planning (RC.RP)',
                    'Improvements (RC.IM)',
                    'Communications (RC.CO)'
                ]
            }
        }
    },
    
    // Calculate compliance score for a vendor
    calculateComplianceScore: function(vendorId, frameworkId) {
        const framework = this[frameworkId];
        if (!framework) return 0;
        
        const vendorData = framework.vendorCompliance?.[vendorId];
        if (!vendorData) {
            // Default scores based on vendor capabilities
            if (vendorId === 'portnox') return 95;
            if (vendorId === 'cisco') return 75;
            if (vendorId === 'aruba') return 70;
            return 50;
        }
        
        return vendorData.coverage || 0;
    },
    
    // Get compliance summary for executive reporting
    getComplianceSummary: function(vendorId) {
        const frameworks = ['soc2', 'iso27001', 'hipaa', 'gdpr', 'pcidss', 'nist-csf'];
        const scores = {};
        let totalScore = 0;
        
        frameworks.forEach(fw => {
            scores[fw] = this.calculateComplianceScore(vendorId, fw);
            totalScore += scores[fw];
        });
        
        return {
            overallScore: Math.round(totalScore / frameworks.length),
            frameworkScores: scores,
            certifications: this.getVendorCertifications(vendorId),
            automationLevel: vendorId === 'portnox' ? 95 : 20
        };
    },
    
    getVendorCertifications: function(vendorId) {
        const certs = [];
        Object.values(this).forEach(framework => {
            if (framework.vendorCompliance?.[vendorId]?.certified) {
                certs.push(framework.name);
            }
        });
        return certs;
    }
};

Object.freeze(window.ComplianceFrameworkDatabase);
console.log('✅ Compliance Framework Database loaded');
