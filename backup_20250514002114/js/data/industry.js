/**
 * Industry Data for Total Cost Analyzer
 * Contains industry-specific information and requirements
 */
const IndustryData = {
    healthcare: {
        name: 'Healthcare',
        icon: 'fa-hospital',
        description: 'Healthcare organizations must protect sensitive patient data and medical devices while ensuring compliance with regulations like HIPAA.',
        challenges: [
            'Protecting patient health information (PHI)',
            'Securing diverse medical devices',
            'Meeting strict regulatory requirements',
            'Managing guest access in clinical settings',
            'Supporting modern healthcare technology'
        ],
        requirements: [
            {
                name: 'Identity Verification',
                description: 'Strong authentication for clinical staff accessing patient records',
                importance: 'critical'
            },
            {
                name: 'Device Security',
                description: 'Protection for medical devices and clinical workstations',
                importance: 'critical'
            },
            {
                name: 'Network Segmentation',
                description: 'Isolation of clinical, guest, and IoT networks',
                importance: 'high'
            },
            {
                name: 'Compliance Tracking',
                description: 'Automated PHI protection and HIPAA compliance tracking',
                importance: 'critical'
            },
            {
                name: 'Audit Logging',
                description: 'Detailed access logging for regulatory compliance',
                importance: 'high'
            },
            {
                name: 'Incident Response',
                description: 'Rapid containment of compromised medical systems',
                importance: 'high'
            }
        ],
        regulations: ['HIPAA', 'HITECH', 'FDA Medical Device Regulations'],
        vendorStrengths: {
            portnox: [
                'Cloud-native deployment dramatically reduces IT burden',
                'Built-in HIPAA compliance controls and reporting',
                'AI-powered medical device fingerprinting and classification',
                'Rapid deployment and simplified management',
                'Continuous cloud-based updates'
            ],
            cisco: [
                'Comprehensive healthcare profile library',
                'Strong integration with clinical systems',
                'Advanced segmentation capabilities',
                'Detailed compliance reporting',
                'Enterprise-grade security'
            ],
            aruba: [
                'Strong wireless integration for clinical mobility',
                'Guest management for patient and visitor access',
                'Device profiling for medical equipment',
                'Healthcare-specific policy templates',
                'Integration with healthcare systems'
            ],
            forescout: [
                'Superior medical device discovery and classification',
                'Agentless approach for medical devices',
                'Comprehensive visibility for clinical networks',
                'Automated compliance checks',
                'Advanced IoT security'
            ]
        }
    },
    
    financial: {
        name: 'Financial Services',
        icon: 'fa-landmark',
        description: 'Financial institutions must protect sensitive financial data and transactions while complying with stringent industry regulations.',
        challenges: [
            'Protecting customer financial data',
            'Preventing fraud and unauthorized access',
            'Meeting complex regulatory requirements',
            'Securing mission-critical financial systems',
            'Defending against sophisticated threats'
        ],
        requirements: [
            {
                name: 'Multi-Factor Authentication',
                description: 'Strong MFA for all financial system access',
                importance: 'critical'
            },
            {
                name: 'Insider Threat Protection',
                description: 'Prevention of unauthorized data access by employees',
                importance: 'critical'
            },
            {
                name: 'Transaction Security',
                description: 'Secure access to payment processing systems',
                importance: 'critical'
            },
            {
                name: 'Regulatory Compliance',
                description: 'Automated PCI DSS and compliance reporting',
                importance: 'high'
            },
            {
                name: 'Continuous Monitoring',
                description: '24/7 monitoring of all network access and activity',
                importance: 'high'
            },
            {
                name: 'Breach Prevention',
                description: 'Real-time threat detection and response',
                importance: 'critical'
            }
        ],
        regulations: ['PCI DSS', 'SOX', 'GLBA', 'FFIEC'],
        vendorStrengths: {
            portnox: [
                'Cloud-native architecture reduces infrastructure costs by 65%',
                'Built-in compliance reporting and continuous controls',
                'Strong integration with financial security systems',
                'Automated remediation capabilities',
                'Rapid deployment and simple management'
            ],
            cisco: [
                'Enterprise-grade security for financial institutions',
                'Advanced policy controls for transaction systems',
                'Detailed compliance reporting',
                'Integration with financial security tools',
                'Comprehensive segmentation capabilities'
            ],
            aruba: [
                'Flexible policy enforcement for financial environments',
                'Strong BYOD and mobile banking support',
                'Integration with financial security systems',
                'Detailed audit logging and reporting',
                'Advanced guest management'
            ],
            forescout: [
                'Superior visibility for financial environments',
                'Agentless approach for ATMs and financial devices',
                'Real-time compliance monitoring',
                'Advanced threat detection',
                'Comprehensive device control'
            ]
        }
    },
    
    education: {
        name: 'Education',
        icon: 'fa-graduation-cap',
        description: 'Educational institutions must secure diverse network environments with limited IT resources while supporting BYOD and protecting student data.',
        challenges: [
            'Managing extensive BYOD environments',
            'Protecting student data (FERPA compliance)',
            'Securing diverse networks with limited resources',
            'Supporting academic freedom while ensuring security',
            'Managing seasonal access pattern changes'
        ],
        requirements: [
            {
                name: 'BYOD Management',
                description: 'Secure access for student and faculty personal devices',
                importance: 'critical'
            },
            {
                name: 'Student Data Protection',
                description: 'Safeguards for student personal and academic information',
                importance: 'critical'
            },
            {
                name: 'Campus Network Segmentation',
                description: 'Isolation between academic, administrative, and residential networks',
                importance: 'high'
            },
            {
                name: 'Resource Efficiency',
                description: 'Low administrative overhead for limited IT staff',
                importance: 'high'
            },
            {
                name: 'Guest Access Management',
                description: 'Secure, simple visitor access for campus events',
                importance: 'medium'
            },
            {
                name: 'Research Network Protection',
                description: 'Security for sensitive research data and systems',
                importance: 'high'
            }
        ],
        regulations: ['FERPA', 'COPPA', 'CIPA', 'State data protection laws'],
        vendorStrengths: {
            portnox: [
                'Cloud-native deployment ideal for limited IT resources',
                'Rapid implementation without hardware investment',
                'Self-service options for BYOD onboarding',
                'Simple management for limited IT staff',
                '75% lower administrative overhead'
            ],
            cisco: [
                'Comprehensive campus network protection',
                'Advanced policy controls for complex environments',
                'Detailed segmentation capabilities',
                'Extensive guest management features',
                'Integration with campus systems'
            ],
            aruba: [
                'Excellent wireless integration for campus mobility',
                'Advanced guest management and BYOD support',
                'Integration with education applications',
                'Built-in policy templates for educational use',
                'Flexible deployment options'
            ],
            securew2: [
                'Certificate-based authentication for BYOD',
                'Eduroam support and integration',
                'Cloud-based deployment model',
                'Reduced complexity for limited IT staff',
                'Simplified BYOD onboarding'
            ]
        }
    },
    
    government: {
        name: 'Government',
        icon: 'fa-landmark',
        description: 'Government agencies must meet strict compliance requirements while protecting sensitive data and maintaining public service continuity.',
        challenges: [
            'Meeting stringent security mandates',
            'Protecting sensitive government data',
            'Operating with budget constraints',
            'Securing legacy systems',
            'Managing complex agency networks'
        ],
        requirements: [
            {
                name: 'Regulatory Compliance',
                description: 'Adherence to NIST 800-53, FISMA, and FedRAMP',
                importance: 'critical'
            },
            {
                name: 'Citizen Data Protection',
                description: 'Safeguards for personally identifiable information',
                importance: 'critical'
            },
            {
                name: 'Advanced Threat Protection',
                description: 'Defense against sophisticated cyber attacks',
                importance: 'high'
            },
            {
                name: 'Continuous Monitoring',
                description: 'Real-time visibility and security reporting',
                importance: 'high'
            },
            {
                name: 'Zero Trust Implementation',
                description: 'Comprehensive identity and device verification',
                importance: 'high'
            },
            {
                name: 'Incident Response',
                description: 'Rapid detection and remediation of security incidents',
                importance: 'high'
            }
        ],
        regulations: ['FISMA', 'NIST 800-53', 'FedRAMP', 'CJIS'],
        vendorStrengths: {
            portnox: [
                'Cloud-native deployment with FedRAMP compliance',
                '40-60% lower TCO than traditional NAC solutions',
                'Rapid deployment without hardware procurement',
                'Simplified management for limited IT resources',
                'Continuous compliance monitoring and reporting'
            ],
            cisco: [
                'Comprehensive security controls for federal networks',
                'Strong integration with government security tools',
                'Advanced segmentation capabilities',
                'Detailed compliance reporting',
                'Enterprise-grade security with federal certifications'
            ],
            aruba: [
                'Flexible policy enforcement for government environments',
                'Federal certifications and compliance',
                'Integration with government security systems',
                'Support for federal identity standards',
                'Advanced threat protection'
            ],
            forescout: [
                'Superior visibility for complex government networks',
                'Agentless approach for specialized government systems',
                'Real-time compliance monitoring',
                'Continuous diagnostics and mitigation (CDM) capabilities',
                'Advanced threat detection'
            ]
        }
    },
    
    manufacturing: {
        name: 'Manufacturing',
        icon: 'fa-industry',
        description: 'Manufacturing organizations must secure operational technology (OT) and IT environments while protecting intellectual property and ensuring production continuity.',
        challenges: [
            'Securing OT/IT convergence',
            'Protecting industrial control systems',
            'Maintaining production continuity',
            'Defending intellectual property',
            'Managing complex supply chains'
        ],
        requirements: [
            {
                name: 'OT/IT Convergence',
                description: 'Secure integration of operational and information technology',
                importance: 'critical'
            },
            {
                name: 'ICS/SCADA Security',
                description: 'Protection for industrial control systems',
                importance: 'critical'
            },
            {
                name: 'Production Continuity',
                description: 'Minimizing security impacts on production systems',
                importance: 'critical'
            },
            {
                name: 'IP Protection',
                description: 'Safeguards for manufacturing intellectual property',
                importance: 'high'
            },
            {
                name: 'IoT Device Security',
                description: 'Protection for smart manufacturing equipment and sensors',
                importance: 'high'
            },
            {
                name: 'Supply Chain Security',
                description: 'Secure integration with suppliers and partners',
                importance: 'medium'
            }
        ],
        regulations: ['IEC 62443', 'NIST 800-82', 'ISO 27001'],
        vendorStrengths: {
            portnox: [
                'Cloud-native deployment with minimal production impact',
                'OT device fingerprinting and security',
                'Simplified deployment and management',
                '40-60% lower TCO than traditional solutions',
                'Continuous updates without production disruption'
            ],
            cisco: [
                'Comprehensive OT/IT security capabilities',
                'Advanced segmentation for production networks',
                'Integration with industrial security systems',
                'Detailed policy controls for manufacturing',
                'Enterprise-grade security for IP protection'
            ],
            forescout: [
                'Superior OT/ICS device discovery and classification',
                'Agentless approach ideal for OT environments',
                'Comprehensive visibility across IT/OT networks',
                'Specialized OT security capabilities',
                'Real-time monitoring of industrial systems'
            ],
            fortinac: [
                'Integration with Fortinet Security Fabric',
                'OT-specific security capabilities',
                'Protection for manufacturing intellectual property',
                'Industrial protocol support',
                'Simplified security operations'
            ]
        }
    },
    
    retail: {
        name: 'Retail',
        icon: 'fa-shopping-cart',
        description: 'Retail organizations must secure customer data, POS systems, and maintain PCI compliance while supporting diverse device types.',
        challenges: [
            'Protecting customer payment data',
            'Securing point-of-sale systems',
            'Managing diverse store networks',
            'Supporting retail IoT devices',
            'Maintaining regulatory compliance'
        ],
        requirements: [
            {
                name: 'POS System Security',
                description: 'Secure point-of-sale terminals and payment systems',
                importance: 'critical'
            },
            {
                name: 'Customer Data Protection',
                description: 'Safeguards for customer payment and personal information',
                importance: 'critical'
            },
            {
                name: 'Store Network Isolation',
                description: 'Segmentation between customer, POS, and corporate networks',
                importance: 'high'
            },
            {
                name: 'IoT Device Management',
                description: 'Security for smart retail devices and digital signage',
                importance: 'medium'
            },
            {
                name: 'PCI Compliance',
                description: 'Continuous PCI DSS compliance monitoring and reporting',
                importance: 'critical'
            },
            {
                name: 'Guest Wi-Fi Security',
                description: 'Secure customer Wi-Fi separated from business operations',
                importance: 'high'
            }
        ],
        regulations: ['PCI DSS', 'Consumer protection laws', 'Data breach notification laws'],
        vendorStrengths: {
            portnox: [
                'Cloud-native deployment ideal for distributed retail',
                'PCI DSS compliance monitoring and reporting',
                'Simplified management for retail IT teams',
                '40-60% lower TCO than traditional solutions',
                'Rapid deployment across multiple locations'
            ],
            cisco: [
                'Comprehensive security for retail environments',
                'Advanced PCI DSS segmentation capabilities',
                'Detailed policy controls for retail networks',
                'Integration with retail security systems',
                'Enterprise-grade security for multi-location retail'
            ],
            aruba: [
                'Excellent wireless security for retail environments',
                'Strong guest WiFi capabilities',
                'PCI DSS compliance features',
                'Integration with retail applications',
                'Policy enforcement for retail networks'
            ],
            fortinac: [
                'Integration with Fortinet Security Fabric',
                'PCI DSS compliance capabilities',
                'Protection for retail networks',
                'IoT security for retail devices',
                'Support for multi-location environments'
            ]
        }
    },
    
    technology: {
        name: 'Technology',
        icon: 'fa-laptop-code',
        description: 'Technology companies need to secure development environments, protect intellectual property, and support flexible work models.',
        challenges: [
            'Protecting valuable intellectual property',
            'Securing complex development environments',
            'Supporting remote and hybrid work',
            'Securing cloud and on-premises resources',
            'Managing BYOD and flexible devices'
        ],
        requirements: [
            {
                name: 'IP Protection',
                description: 'Safeguards for source code and product designs',
                importance: 'critical'
            },
            {
                name: 'Development Environment Security',
                description: 'Secure access to development tools and repositories',
                importance: 'high'
            },
            {
                name: 'Remote Access Security',
                description: 'Secure connections for distributed teams',
                importance: 'high'
            },
            {
                name: 'Cloud Resource Protection',
                description: 'Security for cloud infrastructure and services',
                importance: 'high'
            },
            {
                name: 'BYOD Management',
                description: 'Support for employee-owned devices and flexible work',
                importance: 'medium'
            },
            {
                name: 'Data Loss Prevention',
                description: 'Prevention of unauthorized data exfiltration',
                importance: 'critical'
            }
        ],
        regulations: ['SOC 2', 'ISO 27001', 'GDPR', 'CCPA'],
        vendorStrengths: {
            portnox: [
                'Cloud-native deployment aligns with tech infrastructure',
                'Supports distributed workforce security',
                'Rapid deployment and simplified management',
                'Continuous cloud-based updates without maintenance',
                'Strong integration with cloud identity providers'
            ],
            cisco: [
                'Comprehensive security for technology environments',
                'Advanced policy controls for complex networks',
                'Detailed segmentation capabilities',
                'Integration with development security tools',
                'Enterprise-grade security for IP protection'
            ],
            aruba: [
                'Strong BYOD support for tech companies',
                'Flexible policy enforcement',
                'Integration with development tools',
                'Support for mobile workforce',
                'Advanced guest management'
            ],
            securew2: [
                'Certificate-based authentication for security',
                'Cloud-based deployment model',
                'Simplified management for tech companies',
                'Integration with cloud identity',
                'Support for modern authentication'
            ]
        }
    },
    
    energy: {
        name: 'Energy & Utilities',
        icon: 'fa-bolt',
        description: 'Energy and utilities organizations must secure critical infrastructure while meeting regulatory requirements and ensuring operational continuity.',
        challenges: [
            'Protecting critical infrastructure',
            'Securing operational technology (OT)',
            'Meeting regulatory requirements',
            'Defending against nation-state threats',
            'Ensuring operational continuity'
        ],
        requirements: [
            {
                name: 'Critical Infrastructure Protection',
                description: 'Security for energy production and distribution systems',
                importance: 'critical'
            },
            {
                name: 'OT/SCADA Security',
                description: 'Protection for industrial control systems',
                importance: 'critical'
            },
            {
                name: 'Regulatory Compliance',
                description: 'Adherence to NERC CIP and other regulations',
                importance: 'critical'
            },
            {
                name: 'Advanced Threat Protection',
                description: 'Defense against sophisticated attackers',
                importance: 'high'
            },
            {
                name: 'Operational Continuity',
                description: 'Ensuring security without disrupting operations',
                importance: 'critical'
            },
            {
                name: 'Remote Site Security',
                description: 'Protection for distributed energy infrastructure',
                importance: 'high'
            }
        ],
        regulations: ['NERC CIP', 'TSA Security Directives', 'NIS Directive', 'NIST 800-82'],
        vendorStrengths: {
            portnox: [
                'Cloud-native deployment with minimal operational impact',
                'OT device fingerprinting and security',
                'Simplified deployment across distributed infrastructure',
                'Continuous updates without operational disruption',
                'Lower TCO than traditional solutions'
            ],
            cisco: [
                'Comprehensive security for critical infrastructure',
                'Advanced segmentation for OT/IT networks',
                'Integration with energy security systems',
                'Detailed policy controls for critical systems',
                'Enterprise-grade security with regulatory compliance'
            ],
            forescout: [
                'Superior OT/ICS device discovery and classification',
                'Agentless approach ideal for critical infrastructure',
                'Comprehensive visibility across energy networks',
                'Specialized OT security capabilities',
                'Real-time monitoring of critical systems'
            ],
            fortinac: [
                'Integration with Fortinet Security Fabric',
                'OT-specific security capabilities',
                'Protection for energy distribution networks',
                'Industrial protocol support',
                'Simplified security operations'
            ]
        }
    }
};

// Make industry data available globally
window.industryData = IndustryData;
