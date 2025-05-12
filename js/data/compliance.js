/**
 * Compliance Data for Total Cost Analyzer
 * Contains information about compliance frameworks and requirements
 */
const ComplianceData = {
    frameworks: {
        hipaa: {
            name: 'HIPAA',
            fullName: 'Health Insurance Portability and Accountability Act',
            description: 'Regulations for protecting patient health information in healthcare organizations.',
            industries: ['healthcare'],
            requirements: [
                {
                    category: 'Access Control',
                    description: 'Implementation of technical policies and procedures to control electronic PHI access.',
                    controls: [
                        'Unique user identification (§164.312(a)(2)(i))',
                        'Emergency access procedures (§164.312(a)(2)(ii))',
                        'Automatic logoff (§164.312(a)(2)(iii))',
                        'Encryption and decryption (§164.312(a)(2)(iv))'
                    ]
                },
                {
                    category: 'Audit Controls',
                    description: 'Implementation of mechanisms to record and examine activity in systems containing ePHI.',
                    controls: [
                        'Audit logging and monitoring (§164.312(b))',
                        'Activity review procedures',
                        'System event tracking'
                    ]
                },
                {
                    category: 'Integrity Controls',
                    description: 'Protection of ePHI from improper alteration or destruction.',
                    controls: [
                        'Data integrity mechanisms (§164.312(c)(1))',
                        'Authentication controls (§164.312(d))'
                    ]
                },
                {
                    category: 'Transmission Security',
                    description: 'Protection of ePHI when transmitted over networks.',
                    controls: [
                        'Integrity controls for transmission (§164.312(e)(2)(i))',
                        'Encryption for transmission (§164.312(e)(2)(ii))'
                    ]
                }
            ],
            vendorCapabilities: {
                portnox: {
                    score: 95,
                    strengths: [
                        'Cloud-native implementation of access controls',
                        'Automated ePHI protection through policy enforcement',
                        'Continuous compliance monitoring and reporting',
                        'Detailed audit logging of access events',
                        'Enforcement of encryption requirements'
                    ]
                },
                cisco: {
                    score: 85,
                    strengths: [
                        'Comprehensive access control implementation',
                        'Advanced audit logging capabilities',
                        'Detailed policy enforcement for ePHI protection',
                        'Integration with healthcare security systems',
                        'Robust authentication mechanisms'
                    ]
                },
                aruba: {
                    score: 80,
                    strengths: [
                        'Strong access controls for healthcare environments',
                        'Policy-based ePHI protection',
                        'Healthcare-specific compliance reporting',
                        'Integration with clinical systems',
                        'Wireless security for healthcare mobility'
                    ]
                },
                forescout: {
                    score: 90,
                    strengths: [
                        'Superior medical device discovery and classification',
                        'Real-time compliance monitoring for ePHI systems',
                        'Agentless approach for medical devices',
                        'Automated remediation for non-compliant systems',
                        'Comprehensive visibility for ePHI environments'
                    ]
                }
            }
        },
        
        pci: {
            name: 'PCI DSS',
            fullName: 'Payment Card Industry Data Security Standard',
            description: 'Security standards for organizations that handle branded credit cards from major card schemes.',
            industries: ['retail', 'financial', 'hospitality'],
            requirements: [
                {
                    category: 'Build and Maintain a Secure Network',
                    description: 'Implementation of network security controls to protect cardholder data.',
                    controls: [
                        'Requirement 1: Firewalls and router configuration',
                        'Requirement 2: Change vendor defaults for passwords and security parameters'
                    ]
                },
                {
                    category: 'Protect Cardholder Data',
                    description: 'Protection of stored and transmitted cardholder data.',
                    controls: [
                        'Requirement 3: Protection of stored cardholder data',
                        'Requirement 4: Encryption of cardholder data across open, public networks'
                    ]
                },
                {
                    category: 'Maintain a Vulnerability Management Program',
                    description: 'Regular updates and security assessments.',
                    controls: [
                        'Requirement 5: Anti-virus protection',
                        'Requirement 6: Secure systems and applications'
                    ]
                },
                {
                    category: 'Implement Strong Access Control Measures',
                    description: 'Restrictions on access to cardholder data.',
                    controls: [
                        'Requirement 7: Restrict access to cardholder data by business need-to-know',
                        'Requirement 8: Assign unique ID to each person with computer access',
                        'Requirement 9: Restrict physical access to cardholder data'
                    ]
                },
                {
                    category: 'Regularly Monitor and Test Networks',
                    description: 'Tracking and testing security systems and processes.',
                    controls: [
                        'Requirement 10: Track and monitor all access to network resources and cardholder data',
                        'Requirement 11: Regularly test security systems and processes'
                    ]
                }
            ],
            vendorCapabilities: {
                portnox: {
                    score: 90,
                    strengths: [
                        'Cloud-native implementation of network security controls',
                        'Strong access restriction capabilities',
                        'Continuous monitoring of network access',
                        'Detailed audit logging for compliance reporting',
                        'Automated remediation for non-compliant systems'
                    ]
                },
                cisco: {
                    score: 90,
                    strengths: [
                        'Comprehensive network security controls',
                        'Advanced segmentation for cardholder environments',
                        'Detailed audit logging capabilities',
                        'Integration with payment security systems',
                        'Robust authentication mechanisms'
                    ]
                },
                aruba: {
                    score: 85,
                    strengths: [
                        'Strong access controls for payment environments',
                        'Segmentation capabilities for cardholder data',
                        'Compliance reporting for PCI requirements',
                        'Integration with retail security systems',
                        'Wireless security for payment environments'
                    ]
                },
                fortinac: {
                    score: 80,
                    strengths: [
                        'Integration with Fortinet security ecosystem',
                        'Network segmentation for payment systems',
                        'Access controls for PCI compliance',
                        'Monitoring capabilities for cardholder environments',
                        'Retail-focused security controls'
                    ]
                }
            }
        },
        
        nist: {
            name: 'NIST 800-53',
            fullName: 'NIST Special Publication 800-53',
            description: 'Security and privacy controls for federal information systems and organizations.',
            industries: ['government', 'defense', 'healthcare', 'critical infrastructure'],
            requirements: [
                {
                    category: 'Access Control (AC)',
                    description: 'Limiting system access to authorized users and processes.',
                    controls: [
                        'AC-2: Account Management',
                        'AC-3: Access Enforcement',
                        'AC-17: Remote Access',
                        'AC-19: Access Control for Mobile Devices'
                    ]
                },
                {
                    category: 'Identification and Authentication (IA)',
                    description: 'Identifying system users and processes acting on behalf of users.',
                    controls: [
                        'IA-2: Identification and Authentication (Organizational Users)',
                        'IA-5: Authenticator Management',
                        'IA-8: Identification and Authentication (Non-Organizational Users)'
                    ]
                },
                {
                    category: 'System and Communications Protection (SC)',
                    description: 'Protection of system communications and services.',
                    controls: [
                        'SC-7: Boundary Protection',
                        'SC-8: Transmission Confidentiality and Integrity',
                        'SC-13: Cryptographic Protection'
                    ]
                },
                {
                    category: 'System and Information Integrity (SI)',
                    description: 'Protection of information and system integrity.',
                    controls: [
                        'SI-4: Information System Monitoring',
                        'SI-7: Software, Firmware, and Information Integrity'
                    ]
                }
            ],
            vendorCapabilities: {
                portnox: {
                    score: 95,
                    strengths: [
                        'Cloud-native implementation of access controls',
                        'Comprehensive identity and authentication management',
                        'Continuous monitoring and compliance reporting',
                        'Automated remediation for security vulnerabilities',
                        'FedRAMP-aligned security controls'
                    ]
                },
                cisco: {
                    score: 90,
                    strengths: [
                        'Comprehensive implementation of NIST controls',
                        'Advanced boundary protection capabilities',
                        'Detailed access control enforcement',
                        'Integration with federal security systems',
                        'Robust authentication mechanisms'
                    ]
                },
                aruba: {
                    score: 85,
                    strengths: [
                        'Strong access controls for government environments',
                        'Detailed compliance reporting for NIST requirements',
                        'Integration with federal security systems',
                        'Support for PIV/CAC authentication',
                        'Secure wireless capabilities for government'
                    ]
                },
                forescout: {
                    score: 85,
                    strengths: [
                        'Superior device discovery in government networks',
                        'Real-time compliance monitoring for federal systems',
                        'Integration with CDM requirements',
                        'Comprehensive visibility for government environments',
                        'Automated remediation capabilities'
                    ]
                }
            }
        },
        
        gdpr: {
            name: 'GDPR',
            fullName: 'General Data Protection Regulation',
            description: 'Regulations for data protection and privacy in the European Union.',
            industries: ['all'],
            requirements: [
                {
                    category: 'Lawfulness, Fairness, and Transparency',
                    description: 'Processing personal data lawfully, fairly, and transparently.',
                    controls: [
                        'Article 5: Principles relating to processing of personal data',
                        'Article 6: Lawfulness of processing',
                        'Article 7: Conditions for consent'
                    ]
                },
                {
                    category: 'Data Security',
                    description: 'Ensuring security of personal data processing.',
                    controls: [
                        'Article 32: Security of processing',
                        'Article 33: Notification of data breaches',
                        'Article 34: Communication of breaches to individuals'
                    ]
                },
                {
                    category: 'Data Subject Rights',
                    description: 'Respecting the rights of data subjects.',
                    controls: [
                        'Article 15: Right of access',
                        'Article 16: Right to rectification',
                        'Article 17: Right to erasure',
                        'Article 20: Right to data portability'
                    ]
                },
                {
                    category: 'Accountability and Governance',
                    description: 'Demonstrating compliance with GDPR principles.',
                    controls: [
                        'Article 24: Responsibility of the controller',
                        'Article 30: Records of processing activities',
                        'Article 35: Data protection impact assessments'
                    ]
                }
            ],
            vendorCapabilities: {
                portnox: {
                    score: 90,
                    strengths: [
                        'Cloud-native security controls for data protection',
                        'Access control for personal data systems',
                        'Detailed audit logging for data access',
                        'Breach detection and prevention capabilities',
                        'Privacy-by-design implementation'
                    ]
                },
                cisco: {
                    score: 80,
                    strengths: [
                        'Comprehensive data protection controls',
                        'Advanced segmentation for personal data',
                        'Detailed audit logging capabilities',
                        'Integration with privacy systems',
                        'Data breach prevention and detection'
                    ]
                },
                aruba: {
                    score: 75,
                    strengths: [
                        'Access controls for personal data systems',
                        'Policy enforcement for data protection',
                        'Audit logging for compliance reporting',
                        'Integration with privacy systems',
                        'Wireless security for data protection'
                    ]
                },
                fortinac: {
                    score: 70,
                    strengths: [
                        'Integration with Fortinet security ecosystem',
                        'Network controls for data protection',
                        'Basic compliance reporting',
                        'Access restriction capabilities',
                        'Monitoring for data breaches'
                    ]
                }
            }
        },
        
        iso: {
            name: 'ISO 27001',
            fullName: 'ISO/IEC 27001',
            description: 'International standard for information security management.',
            industries: ['all'],
            requirements: [
                {
                    category: 'Information Security Policies',
                    description: 'Management direction for information security.',
                    controls: [
                        'A.5.1: Management direction for information security'
                    ]
                },
                {
                    category: 'Access Control',
                    description: 'Control of access to information and systems.',
                    controls: [
                        'A.9.1: Business requirements for access control',
                        'A.9.2: User access management',
                        'A.9.3: User responsibilities',
                        'A.9.4: System and application access control'
                    ]
                },
                {
                    category: 'Communications Security',
                    description: 'Security of information in networks and during transfer.',
                    controls: [
                        'A.13.1: Network security management',
                        'A.13.2: Information transfer'
                    ]
                },
                {
                    category: 'Operations Security',
                    description: 'Secure operation of information processing facilities.',
                    controls: [
                        'A.12.1: Operational procedures and responsibilities',
                        'A.12.4: Logging and monitoring',
                        'A.12.6: Technical vulnerability management'
                    ]
                }
            ],
            vendorCapabilities: {
                portnox: {
                    score: 95,
                    strengths: [
                        'Cloud-native implementation of access controls',
                        'Comprehensive network security management',
                        'Continuous monitoring and logging capabilities',
                        'Automated vulnerability management',
                        'Simplified security operations'
                    ]
                },
                cisco: {
                    score: 85,
                    strengths: [
                        'Comprehensive access control implementation',
                        'Advanced network security management',
                        'Detailed logging and monitoring capabilities',
                        'Integration with security management systems',
                        'Robust vulnerability management'
                    ]
                },
                aruba: {
                    score: 80,
                    strengths: [
                        'Strong access controls with flexible policies',
                        'Network security for wireless environments',
                        'Logging and monitoring capabilities',
                        'Integration with security systems',
                        'Policy enforcement for ISO requirements'
                    ]
                },
                forescout: {
                    score: 85,
                    strengths: [
                        'Superior device discovery and classification',
                        'Real-time monitoring of network access',
                        'Comprehensive visibility for security management',
                        'Automated remediation for vulnerabilities',
                        'Detailed compliance reporting'
                    ]
                }
            }
        }
    },
    
    industryCompliance: {
        healthcare: ['hipaa', 'nist', 'gdpr', 'iso'],
        financial: ['pci', 'nist', 'gdpr', 'iso'],
        education: ['gdpr', 'nist', 'iso'],
        government: ['nist', 'iso'],
        manufacturing: ['nist', 'iso'],
        retail: ['pci', 'gdpr', 'iso'],
        technology: ['gdpr', 'iso', 'nist'],
        energy: ['nist', 'iso']
    }
};

// Make compliance data available globally
window.complianceData = ComplianceData;
