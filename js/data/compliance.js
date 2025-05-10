// Comprehensive Compliance Frameworks Data
const ComplianceData = {
    frameworks: {
        // Healthcare
        HIPAA: {
            name: 'HIPAA',
            fullName: 'Health Insurance Portability and Accountability Act',
            description: 'Protects sensitive patient health information',
            icon: '🏥',
            industries: ['healthcare'],
            requirements: [
                'Access controls',
                'Audit controls',
                'Integrity controls',
                'Transmission security',
                'Encryption requirements'
            ],
            severity: 'critical'
        },
        HITECH: {
            name: 'HITECH',
            fullName: 'Health Information Technology for Economic and Clinical Health Act',
            description: 'Strengthens HIPAA enforcement and breach notification',
            icon: '⚕️',
            industries: ['healthcare'],
            requirements: [
                'Enhanced breach notification',
                'Increased penalties',
                'EHR compliance',
                'Meaningful use requirements'
            ],
            severity: 'high'
        },
        
        // Financial
        'PCI DSS': {
            name: 'PCI DSS',
            fullName: 'Payment Card Industry Data Security Standard',
            description: 'Secures credit card transactions and cardholder data',
            icon: '💳',
            industries: ['financial', 'retail', 'hospitality'],
            requirements: [
                'Network segmentation',
                'Access control',
                'Regular security testing',
                'Information security policy',
                'Encryption of cardholder data'
            ],
            severity: 'critical'
        },
        SOX: {
            name: 'SOX',
            fullName: 'Sarbanes-Oxley Act',
            description: 'Financial reporting and corporate governance requirements',
            icon: '📊',
            industries: ['financial'],
            requirements: [
                'Internal controls',
                'Audit trails',
                'Access management',
                'Change management',
                'Financial data integrity'
            ],
            severity: 'high'
        },
        GLBA: {
            name: 'GLBA',
            fullName: 'Gramm-Leach-Bliley Act',
            description: 'Financial privacy and data protection',
            icon: '🏦',
            industries: ['financial'],
            requirements: [
                'Customer privacy protection',
                'Information security program',
                'Risk assessment',
                'Employee training'
            ],
            severity: 'high'
        },
        
        // Government
        FISMA: {
            name: 'FISMA',
            fullName: 'Federal Information Security Management Act',
            description: 'Federal government information security',
            icon: '🏛️',
            industries: ['government'],
            requirements: [
                'Risk assessment',
                'Security controls',
                'Continuous monitoring',
                'Incident response',
                'Security authorization'
            ],
            severity: 'critical'
        },
        FedRAMP: {
            name: 'FedRAMP',
            fullName: 'Federal Risk and Authorization Management Program',
            description: 'Cloud security assessment for federal agencies',
            icon: '☁️',
            industries: ['government', 'technology'],
            requirements: [
                'Security assessment',
                'Cloud security controls',
                'Continuous monitoring',
                'Authorization process'
            ],
            severity: 'high'
        },
        CMMC: {
            name: 'CMMC',
            fullName: 'Cybersecurity Maturity Model Certification',
            description: 'DoD contractor cybersecurity requirements',
            icon: '🛡️',
            industries: ['government', 'defense', 'manufacturing'],
            requirements: [
                'Access control',
                'Incident response',
                'Risk management',
                'Security assessment',
                'System integrity'
            ],
            severity: 'critical'
        },
        
        // General Standards
        'ISO 27001': {
            name: 'ISO 27001',
            fullName: 'Information Security Management System',
            description: 'International information security standard',
            icon: '🔐',
            industries: ['all'],
            requirements: [
                'Risk management',
                'Asset management',
                'Access control',
                'Incident management',
                'Business continuity'
            ],
            severity: 'high'
        },
        'NIST CSF': {
            name: 'NIST CSF',
            fullName: 'NIST Cybersecurity Framework',
            description: 'Voluntary framework for managing cybersecurity risk',
            icon: '📋',
            industries: ['all'],
            requirements: [
                'Identify assets',
                'Protect systems',
                'Detect events',
                'Respond to incidents',
                'Recover operations'
            ],
            severity: 'medium'
        },
        CIS: {
            name: 'CIS Controls',
            fullName: 'Center for Internet Security Critical Security Controls',
            description: 'Prioritized cybersecurity best practices',
            icon: '🔧',
            industries: ['all'],
            requirements: [
                'Inventory management',
                'Data protection',
                'Secure configuration',
                'Access management',
                'Malware defense'
            ],
            severity: 'high'
        },
        
        // Privacy Regulations
        GDPR: {
            name: 'GDPR',
            fullName: 'General Data Protection Regulation',
            description: 'EU data protection and privacy regulation',
            icon: '🇪🇺',
            industries: ['all'],
            requirements: [
                'Consent management',
                'Data protection',
                'Breach notification',
                'Privacy by design',
                'Right to erasure'
            ],
            severity: 'critical'
        },
        CCPA: {
            name: 'CCPA',
            fullName: 'California Consumer Privacy Act',
            description: 'California state privacy law',
            icon: '🐻',
            industries: ['all'],
            requirements: [
                'Consumer rights',
                'Data disclosure',
                'Opt-out mechanisms',
                'Data inventory',
                'Security measures'
            ],
            severity: 'high'
        },
        
        // Education
        FERPA: {
            name: 'FERPA',
            fullName: 'Family Educational Rights and Privacy Act',
            description: 'Student education records privacy',
            icon: '🎓',
            industries: ['education'],
            requirements: [
                'Access controls',
                'Audit logs',
                'Data encryption',
                'Consent management',
                'Directory information'
            ],
            severity: 'high'
        },
        COPPA: {
            name: 'COPPA',
            fullName: 'Children\'s Online Privacy Protection Act',
            description: 'Children\'s online privacy protection',
            icon: '👶',
            industries: ['education', 'technology'],
            requirements: [
                'Parental consent',
                'Data minimization',
                'Disclosure requirements',
                'Data deletion rights'
            ],
            severity: 'high'
        },
        
        // Industry Specific
        'NERC CIP': {
            name: 'NERC CIP',
            fullName: 'NERC Critical Infrastructure Protection',
            description: 'Electric grid cybersecurity standards',
            icon: '⚡',
            industries: ['energy'],
            requirements: [
                'Critical asset identification',
                'Security management',
                'Personnel training',
                'Electronic security',
                'Incident reporting'
            ],
            severity: 'critical'
        },
        'IEC 62443': {
            name: 'IEC 62443',
            fullName: 'Industrial Automation and Control Systems Security',
            description: 'Industrial control systems security standard',
            icon: '🏭',
            industries: ['manufacturing', 'energy'],
            requirements: [
                'Security levels',
                'Zone segmentation',
                'Access control',
                'System hardening',
                'Security monitoring'
            ],
            severity: 'high'
        },
        'FDA 21 CFR Part 11': {
            name: 'FDA 21 CFR Part 11',
            fullName: 'FDA Electronic Records and Signatures',
            description: 'FDA requirements for electronic records',
            icon: '💊',
            industries: ['healthcare', 'pharmaceutical'],
            requirements: [
                'Electronic signatures',
                'Audit trails',
                'Record retention',
                'System validation',
                'Access controls'
            ],
            severity: 'high'
        }
    },

    getFrameworksByIndustry(industry) {
        return Object.values(this.frameworks).filter(framework => 
            framework.industries.includes(industry) || framework.industries.includes('all')
        );
    },

    getFramework(name) {
        return this.frameworks[name] || null;
    },

    getSeverityColor(severity) {
        const colors = {
            critical: '#ef4444',
            high: '#f59e0b',
            medium: '#3b82f6',
            low: '#10b981'
        };
        return colors[severity] || colors.medium;
    },

    getSeverityIcon(severity) {
        const icons = {
            critical: '🚨',
            high: '⚠️',
            medium: '📊',
            low: '✓'
        };
        return icons[severity] || icons.medium;
    }
};

// Export for use
window.ComplianceData = ComplianceData;
