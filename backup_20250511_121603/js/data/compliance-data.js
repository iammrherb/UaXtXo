/**
 * Comprehensive Compliance Framework Data
 * Extended list of compliance requirements and mappings
 */

const complianceData = {
    // Healthcare Compliance
    'HIPAA': {
        name: 'HIPAA',
        fullName: 'Health Insurance Portability and Accountability Act',
        description: 'Protects sensitive patient health information',
        category: 'Healthcare',
        requirements: [
            'Access control',
            'Audit controls',
            'Integrity controls',
            'Person or entity authentication',
            'Transmission security'
        ],
        nacControls: [
            'Role-based access control',
            'Multi-factor authentication',
            'Network segmentation',
            'Encryption of data in transit',
            'Comprehensive audit logging'
        ]
    },
    'HITECH': {
        name: 'HITECH',
        fullName: 'Health Information Technology for Economic and Clinical Health Act',
        description: 'Promotes adoption of health information technology',
        category: 'Healthcare',
        requirements: [
            'Meaningful use of EHR',
            'Breach notification',
            'Business associate compliance',
            'Encryption requirements',
            'Audit trail requirements'
        ],
        nacControls: [
            'Electronic health record access control',
            'Automated breach detection',
            'Partner network security',
            'End-to-end encryption',
            'Detailed audit logging'
        ]
    },
    
    // Financial Compliance
    'PCI DSS': {
        name: 'PCI DSS',
        fullName: 'Payment Card Industry Data Security Standard',
        description: 'Secures credit card transactions and cardholder data',
        category: 'Financial',
        requirements: [
            'Build and maintain secure networks',
            'Protect cardholder data',
            'Maintain vulnerability management',
            'Implement strong access control',
            'Regular monitoring and testing'
        ],
        nacControls: [
            'Network segmentation',
            'Access control lists',
            'Device compliance checking',
            'Real-time monitoring',
            'Automated remediation'
        ]
    },
    'SOX': {
        name: 'SOX',
        fullName: 'Sarbanes-Oxley Act',
        description: 'Financial reporting requirements for public companies',
        category: 'Financial',
        requirements: [
            'Internal controls',
            'Financial reporting accuracy',
            'Audit trails',
            'Access controls',
            'Change management'
        ],
        nacControls: [
            'Privileged access management',
            'Change control processes',
            'Audit trail maintenance',
            'Segregation of duties',
            'Access certification'
        ]
    },
    'GLBA': {
        name: 'GLBA',
        fullName: 'Gramm-Leach-Bliley Act',
        description: 'Financial services customer data protection',
        category: 'Financial',
        requirements: [
            'Financial privacy rule',
            'Safeguards rule',
            'Pretexting protection',
            'Customer notice requirements',
            'Information sharing limits'
        ],
        nacControls: [
            'Customer data access control',
            'Security safeguards',
            'Identity verification',
            'Privacy controls',
            'Data sharing restrictions'
        ]
    },
    'FFIEC': {
        name: 'FFIEC',
        fullName: 'Federal Financial Institutions Examination Council',
        description: 'Cybersecurity assessment for financial institutions',
        category: 'Financial',
        requirements: [
            'Cybersecurity maturity',
            'Risk assessment',
            'Controls implementation',
            'Dependency management',
            'Cyber resilience'
        ],
        nacControls: [
            'Maturity-based controls',
            'Risk-based authentication',
            'Security controls monitoring',
            'Third-party access management',
            'Incident response capabilities'
        ]
    },
    'FINRA': {
        name: 'FINRA',
        fullName: 'Financial Industry Regulatory Authority',
        description: 'Securities industry regulations',
        category: 'Financial',
        requirements: [
            'Customer protection',
            'Market integrity',
            'Firm supervision',
            'Transaction reporting',
            'Communications monitoring'
        ],
        nacControls: [
            'Customer data protection',
            'Trading system access control',
            'Supervisory controls',
            'Transaction logging',
            'Communications security'
        ]
    },
    
    // Privacy Regulations
    'GDPR': {
        name: 'GDPR',
        fullName: 'General Data Protection Regulation',
        description: 'Protects EU citizens\' personal data and privacy',
        category: 'Privacy',
        requirements: [
            'Lawful basis for processing',
            'Consent management',
            'Data subject rights',
            'Data protection by design',
            'Security measures'
        ],
        nacControls: [
            'Access control enforcement',
            'Data access logging',
            'Consent-based access',
            'Privacy by design',
            'Encryption capabilities'
        ]
    },
    'CCPA': {
        name: 'CCPA',
        fullName: 'California Consumer Privacy Act',
        description: 'Privacy rights for California residents',
        category: 'Privacy',
        requirements: [
            'Right to know',
            'Right to delete',
            'Right to opt-out',
            'Non-discrimination',
            'Verifiable requests'
        ],
        nacControls: [
            'Personal data discovery',
            'Data deletion capabilities',
            'Opt-out mechanisms',
            'Equal access controls',
            'Identity verification'
        ]
    },
    'LGPD': {
        name: 'LGPD',
        fullName: 'Lei Geral de Proteção de Dados',
        description: 'Brazilian General Data Protection Law',
        category: 'Privacy',
        requirements: [
            'Legal basis for processing',
            'Rights of data subjects',
            'Data protection officer',
            'International transfers',
            'Security measures'
        ],
        nacControls: [
            'Lawful processing controls',
            'Subject rights management',
            'DPO access controls',
            'Cross-border data controls',
            'Security safeguards'
        ]
    },
    'PIPEDA': {
        name: 'PIPEDA',
        fullName: 'Personal Information Protection and Electronic Documents Act',
        description: 'Canadian privacy law',
        category: 'Privacy',
        requirements: [
            'Consent',
            'Limited collection',
            'Limited use',
            'Accuracy',
            'Safeguards'
        ],
        nacControls: [
            'Consent management',
            'Collection controls',
            'Use restrictions',
            'Data accuracy controls',
            'Security safeguards'
        ]
    },
    
    // Government & Defense
    'FISMA': {
        name: 'FISMA',
        fullName: 'Federal Information Security Management Act',
        description: 'US federal government information security requirements',
        category: 'Government',
        requirements: [
            'Security categorization',
            'Security controls',
            'Risk assessment',
            'Certification and accreditation',
            'Continuous monitoring'
        ],
        nacControls: [
            'FIPS-compliant controls',
            'Continuous monitoring',
            'Risk-based authentication',
            'Security assessment',
            'Authorization management'
        ]
    },
    'FedRAMP': {
        name: 'FedRAMP',
        fullName: 'Federal Risk and Authorization Management Program',
        description: 'Cloud security for federal agencies',
        category: 'Government',
        requirements: [
            'Security assessment',
            'Authorization',
            'Continuous monitoring',
            'Incident response',
            'Plan of action'
        ],
        nacControls: [
            'Cloud security controls',
            'Authorization workflows',
            'Continuous monitoring',
            'Incident management',
            'Remediation tracking'
        ]
    },
    'NIST 800-53': {
        name: 'NIST 800-53',
        fullName: 'Security and Privacy Controls for Information Systems',
        description: 'Comprehensive security control catalog',
        category: 'Government',
        requirements: [
            'Access control',
            'Awareness and training',
            'Audit and accountability',
            'Security assessment',
            'Incident response'
        ],
        nacControls: [
            'Complete access control',
            'Security awareness integration',
            'Comprehensive auditing',
            'Assessment automation',
            'Response procedures'
        ]
    },
    'NIST 800-171': {
        name: 'NIST 800-171',
        fullName: 'Protecting Controlled Unclassified Information',
        description: 'CUI protection in non-federal systems',
        category: 'Government',
        requirements: [
            'Access control',
            'Awareness and training',
            'Configuration management',
            'Media protection',
            'System integrity'
        ],
        nacControls: [
            'CUI access control',
            'Security training verification',
            'Configuration compliance',
            'Media access control',
            'Integrity monitoring'
        ]
    },
    'CMMC': {
        name: 'CMMC',
        fullName: 'Cybersecurity Maturity Model Certification',
        description: 'DoD contractor cybersecurity requirements',
        category: 'Defense',
        requirements: [
            'Access control',
            'Awareness and training',
            'Configuration management',
            'Identification and authentication',
            'System and information integrity'
        ],
        nacControls: [
            'Multi-factor authentication',
            'User training integration',
            'Configuration compliance',
            'Strong authentication',
            'Integrity monitoring'
        ]
    },
    'ITAR': {
        name: 'ITAR',
        fullName: 'International Traffic in Arms Regulations',
        description: 'Controls defense-related exports',
        category: 'Defense',
        requirements: [
            'Export controls',
            'Foreign person access',
            'Technical data protection',
            'License compliance',
            'Recordkeeping'
        ],
        nacControls: [
            'Export control enforcement',
            'Nationality-based access',
            'Technical data protection',
            'License verification',
            'Access logging'
        ]
    },
    'StateRAMP': {
        name: 'StateRAMP',
        fullName: 'State Risk and Authorization Management Program',
        description: 'State and local government cloud security',
        category: 'Government',
        requirements: [
            'Security assessment',
            'Authorization',
            'Continuous monitoring',
            'State-specific controls',
            'Interoperability'
        ],
        nacControls: [
            'State-level controls',
            'Authorization management',
            'Monitoring capabilities',
            'State compliance',
            'System integration'
        ]
    },
    
    // Industry Standards
    'ISO 27001': {
        name: 'ISO 27001',
        fullName: 'ISO/IEC 27001 Information Security Management',
        description: 'International standard for information security management',
        category: 'General',
        requirements: [
            'Risk assessment',
            'Security policies',
            'Asset management',
            'Access control',
            'Incident management'
        ],
        nacControls: [
            'Comprehensive access control',
            'Risk-based authentication',
            'Asset inventory',
            'Policy enforcement',
            'Incident response automation'
        ]
    },
    'ISO 27017': {
        name: 'ISO 27017',
        fullName: 'Code of Practice for Cloud Security',
        description: 'Cloud-specific security controls',
        category: 'Cloud',
        requirements: [
            'Shared responsibility',
            'Cloud service controls',
            'Virtual environment security',
            'Cloud monitoring',
            'Cloud incident response'
        ],
        nacControls: [
            'Cloud responsibility mapping',
            'Cloud-native controls',
            'Virtual network security',
            'Cloud visibility',
            'Cloud incident handling'
        ]
    },
    'ISO 27018': {
        name: 'ISO 27018',
        fullName: 'Protection of PII in Public Clouds',
        description: 'Personal data protection in cloud services',
        category: 'Cloud',
        requirements: [
            'PII protection',
            'Transparency',
            'Purpose limitation',
            'Data return',
            'Disclosure limitation'
        ],
        nacControls: [
            'PII access control',
            'Audit transparency',
            'Purpose-based access',
            'Data portability',
            'Disclosure controls'
        ]
    },
    'ISO 27701': {
        name: 'ISO 27701',
        fullName: 'Privacy Information Management System',
        description: 'Privacy management extension to ISO 27001',
        category: 'Privacy',
        requirements: [
            'Privacy controls',
            'PII processing',
            'Privacy risk assessment',
            'Data subject rights',
            'Privacy by design'
        ],
        nacControls: [
            'Privacy-focused controls',
            'PII processing controls',
            'Privacy risk management',
            'Rights management',
            'Privacy architecture'
        ]
    },
    'ISO 9001': {
        name: 'ISO 9001',
        fullName: 'Quality Management Systems',
        description: 'Quality management standard',
        category: 'Quality',
        requirements: [
            'Quality policy',
            'Process approach',
            'Risk-based thinking',
            'Performance evaluation',
            'Continual improvement'
        ],
        nacControls: [
            'Quality control integration',
            'Process controls',
            'Risk management',
            'Performance monitoring',
            'Improvement tracking'
        ]
    },
    'SOC 2': {
        name: 'SOC 2',
        fullName: 'Service Organization Control 2',
        description: 'Security, availability, and confidentiality of systems',
        category: 'General',
        requirements: [
            'Security principle',
            'Availability principle',
            'Confidentiality principle',
            'Processing integrity',
            'Privacy principle'
        ],
        nacControls: [
            'Security controls',
            'Availability monitoring',
            'Confidentiality controls',
            'Data integrity',
            'Privacy controls'
        ]
    },
    'NIST CSF': {
        name: 'NIST CSF',
        fullName: 'NIST Cybersecurity Framework',
        description: 'Framework for improving critical infrastructure cybersecurity',
        category: 'General',
        requirements: [
            'Identify assets',
            'Protect infrastructure',
            'Detect anomalies',
            'Respond to incidents',
            'Recover from events'
        ],
        nacControls: [
            'Asset discovery',
            'Protection mechanisms',
            'Anomaly detection',
            'Automated response',
            'Recovery procedures'
        ]
    },
    
    // Education
    'FERPA': {
        name: 'FERPA',
        fullName: 'Family Educational Rights and Privacy Act',
        description: 'Protects student education records privacy',
        category: 'Education',
        requirements: [
            'Access control to records',
            'Consent for disclosure',
            'Directory information policies',
            'Audit requirements',
            'Data retention'
        ],
        nacControls: [
            'Role-based access control',
            'Consent management',
            'Policy enforcement',
            'Access logging',
            'Retention automation'
        ]
    },
    'COPPA': {
        name: 'COPPA',
        fullName: 'Children\'s Online Privacy Protection Act',
        description: 'Protects children\'s online privacy',
        category: 'Education',
        requirements: [
            'Parental consent',
            'Data minimization',
            'Data deletion',
            'Security measures',
            'Disclosure limitations'
        ],
        nacControls: [
            'Parental consent verification',
            'Minimal data collection',
            'Deletion capabilities',
            'Child data protection',
            'Limited disclosure'
        ]
    },
    'CIPA': {
        name: 'CIPA',
        fullName: 'Children\'s Internet Protection Act',
        description: 'Internet safety for children in schools and libraries',
        category: 'Education',
        requirements: [
            'Content filtering',
            'Internet safety policy',
            'Monitoring',
            'Education',
            'Certification'
        ],
        nacControls: [
            'Content access control',
            'Policy enforcement',
            'Activity monitoring',
            'Safety education integration',
            'Compliance certification'
        ]
    },
    
    // Energy & Utilities
    'NERC CIP': {
        name: 'NERC CIP',
        fullName: 'North American Electric Reliability Corporation Critical Infrastructure Protection',
        description: 'Cybersecurity standards for the bulk electric system',
        category: 'Energy',
        requirements: [
            'Critical cyber asset identification',
            'Security management controls',
            'Personnel and training',
            'Electronic security perimeters',
            'Physical security'
        ],
        nacControls: [
            'Asset classification',
            'Security policy enforcement',
            'Training verification',
            'Network perimeter control',
            'Physical access integration'
        ]
    },
    'IEC 62443': {
        name: 'IEC 62443',
        fullName: 'Industrial Automation and Control Systems Security',
        description: 'Security for industrial automation and control systems',
        category: 'Industrial',
        requirements: [
            'Security levels',
            'Zones and conduits',
            'Risk assessment',
            'System hardening',
            'Security monitoring'
        ],
        nacControls: [
            'Security level enforcement',
            'Zone-based access control',
            'Risk-based controls',
            'System security',
            'OT monitoring'
        ]
    },
    'TSA Pipeline': {
        name: 'TSA Pipeline',
        fullName: 'TSA Pipeline Security Guidelines',
        description: 'Pipeline cybersecurity requirements',
        category: 'Energy',
        requirements: [
            'Cybersecurity coordinator',
            'Cybersecurity evaluation',
            'Incident response',
            'Cybersecurity testing',
            'Security measures'
        ],
        nacControls: [
            'Coordinator access control',
            'Security assessments',
            'Incident management',
            'Security testing',
            'Control implementation'
        ]
    },
    
    // Telecommunications
    'ISO 27011': {
        name: 'ISO 27011',
        fullName: 'Information Security Management for Telecommunications',
        description: 'Telecom-specific security management',
        category: 'Telecom',
        requirements: [
            'Network security',
            'Service delivery',
            'Customer data protection',
            'Infrastructure protection',
            'Regulatory compliance'
        ],
        nacControls: [
            'Telecom network security',
            'Service access control',
            'Customer data protection',
            'Infrastructure access control',
            'Compliance monitoring'
        ]
    },
    
    // Retail
    'PCI PIN': {
        name: 'PCI PIN',
        fullName: 'PIN Transaction Security Requirements',
        description: 'Security for PIN entry devices',
        category: 'Retail',
        requirements: [
            'PIN protection',
            'Device security',
            'Key management',
            'Physical security',
            'Logical security'
        ],
        nacControls: [
            'PIN device access control',
            'Device compliance',
            'Key access control',
            'Physical access integration',
            'Logical access control'
        ]
    },
    
    // Healthcare Specific
    'FDA 21 CFR Part 11': {
        name: 'FDA 21 CFR Part 11',
        fullName: 'Electronic Records and Electronic Signatures',
        description: 'FDA requirements for electronic records and signatures',
        category: 'Healthcare',
        requirements: [
            'Access control',
            'Audit trails',
            'Electronic signatures',
            'Data integrity',
            'System validation'
        ],
        nacControls: [
            'Record access control',
            'Comprehensive audit trails',
            'E-signature support',
            'Integrity controls',
            'Validation support'
        ]
    },
    
    // Transportation
    'TSA Cybersecurity': {
        name: 'TSA Cybersecurity',
        fullName: 'Transportation Security Administration Cybersecurity Requirements',
        description: 'Security for transportation systems',
        category: 'Transportation',
        requirements: [
            'Network segmentation',
            'Access control',
            'Continuous monitoring',
            'Incident response',
            'Recovery planning'
        ],
        nacControls: [
            'Transport network segmentation',
            'Access management',
            'Real-time monitoring',
            'Incident handling',
            'Recovery procedures'
        ]
    }
};

// Compliance categories for grouping
const complianceCategories = {
    'Healthcare': ['HIPAA', 'HITECH', 'FDA 21 CFR Part 11'],
    'Financial': ['PCI DSS', 'SOX', 'GLBA', 'FFIEC', 'FINRA'],
    'Privacy': ['GDPR', 'CCPA', 'LGPD', 'PIPEDA', 'ISO 27701'],
    'Government': ['FISMA', 'FedRAMP', 'NIST 800-53', 'NIST 800-171', 'StateRAMP'],
    'Defense': ['CMMC', 'ITAR'],
    'General': ['ISO 27001', 'SOC 2', 'NIST CSF'],
    'Cloud': ['ISO 27017', 'ISO 27018'],
    'Education': ['FERPA', 'COPPA', 'CIPA'],
    'Energy': ['NERC CIP', 'TSA Pipeline'],
    'Industrial': ['IEC 62443'],
    'Telecom': ['ISO 27011'],
    'Retail': ['PCI PIN'],
    'Transportation': ['TSA Cybersecurity'],
    'Quality': ['ISO 9001']
};

// Compliance by industry mapping
const complianceByIndustry = {
    healthcare: ['HIPAA', 'HITECH', 'FDA 21 CFR Part 11', 'ISO 27001', 'NIST CSF', 'GDPR', 'SOC 2'],
    financial: ['PCI DSS', 'SOX', 'GLBA', 'FFIEC', 'FINRA', 'ISO 27001', 'NIST CSF', 'GDPR', 'SOC 2'],
    retail: ['PCI DSS', 'PCI PIN', 'GDPR', 'CCPA', 'ISO 27001', 'SOC 2'],
    education: ['FERPA', 'COPPA', 'CIPA', 'GDPR', 'ISO 27001', 'NIST CSF'],
    government: ['FISMA', 'FedRAMP', 'NIST 800-53', 'NIST 800-171', 'StateRAMP', 'CMMC'],
    manufacturing: ['ISO 27001', 'NIST CSF', 'GDPR', 'SOC 2', 'ISO 9001', 'CMMC', 'IEC 62443'],
    technology: ['ISO 27001', 'SOC 2', 'GDPR', 'CCPA', 'NIST CSF', 'ISO 27017', 'ISO 27018'],
    hospitality: ['PCI DSS', 'GDPR', 'CCPA', 'ISO 27001'],
    energy: ['NERC CIP', 'ISO 27001', 'NIST CSF', 'IEC 62443', 'TSA Pipeline'],
    transportation: ['TSA Cybersecurity', 'ISO 27001', 'NIST CSF', 'GDPR'],
    telecom: ['ISO 27011', 'ISO 27001', 'SOC 2', 'GDPR', 'NIST CSF'],
    defense: ['CMMC', 'ITAR', 'NIST 800-171', 'FISMA'],
    other: ['ISO 27001', 'NIST CSF', 'GDPR', 'SOC 2']
};

// Compliance scoring function
function calculateComplianceScore(frameworks, vendorCapabilities) {
    let totalScore = 0;
    let maxScore = 0;
    
    frameworks.forEach(framework => {
        const data = complianceData[framework];
        if (data) {
            const controls = data.nacControls.length;
            const supported = vendorCapabilities.filter(cap => 
                data.nacControls.includes(cap)
            ).length;
            
            totalScore += (supported / controls) * 100;
            maxScore += 100;
        }
    });
    
    return maxScore > 0 ? Math.round(totalScore / maxScore * 100) : 0;
}

// Get compliance recommendations for an industry
function getComplianceRecommendations(industry) {
    const frameworks = complianceByIndustry[industry] || complianceByIndustry.other;
    const recommendations = [];
    
    frameworks.forEach(framework => {
        const data = complianceData[framework];
        if (data) {
            recommendations.push({
                framework: framework,
                name: data.name,
                fullName: data.fullName,
                description: data.description,
                category: data.category,
                priority: data.category === 'Healthcare' || data.category === 'Financial' ? 'High' : 'Medium'
            });
        }
    });
    
    return recommendations;
}

// Export for use in other modules
window.complianceData = complianceData;
window.complianceCategories = complianceCategories;
window.complianceByIndustry = complianceByIndustry;
window.calculateComplianceScore = calculateComplianceScore;
window.getComplianceRecommendations = getComplianceRecommendations;
