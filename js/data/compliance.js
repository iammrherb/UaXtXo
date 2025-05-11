// Compliance Frameworks Data
const ComplianceData = {
    frameworks: {
        HIPAA: {
            name: 'HIPAA',
            fullName: 'Health Insurance Portability and Accountability Act',
            industry: 'healthcare',
            requirements: [
                'Access controls',
                'Audit controls',
                'Integrity controls',
                'Transmission security'
            ]
        },
        'PCI DSS': {
            name: 'PCI DSS',
            fullName: 'Payment Card Industry Data Security Standard',
            industry: 'financial',
            requirements: [
                'Network segmentation',
                'Access control',
                'Regular security testing',
                'Information security policy'
            ]
        },
        SOX: {
            name: 'SOX',
            fullName: 'Sarbanes-Oxley Act',
            industry: 'financial',
            requirements: [
                'Internal controls',
                'Audit trails',
                'Access management',
                'Change management'
            ]
        },
        FERPA: {
            name: 'FERPA',
            fullName: 'Family Educational Rights and Privacy Act',
            industry: 'education',
            requirements: [
                'Access controls',
                'Audit logs',
                'Data encryption',
                'Consent management'
            ]
        },
        FISMA: {
            name: 'FISMA',
            fullName: 'Federal Information Security Management Act',
            industry: 'government',
            requirements: [
                'Risk assessment',
                'Security controls',
                'Continuous monitoring',
                'Incident response'
            ]
        },
        'ISO 27001': {
            name: 'ISO 27001',
            fullName: 'Information Security Management System',
            industry: 'all',
            requirements: [
                'Risk management',
                'Asset management',
                'Access control',
                'Incident management'
            ]
        },
        GDPR: {
            name: 'GDPR',
            fullName: 'General Data Protection Regulation',
            industry: 'all',
            requirements: [
                'Data protection',
                'Access controls',
                'Data breach notification',
                'Privacy by design'
            ]
        }
    },

    getFrameworksByIndustry(industry) {
        return Object.values(this.frameworks).filter(
            framework => framework.industry === industry || framework.industry === 'all'
        );
    },

    getFramework(name) {
        return this.frameworks[name] || null;
    }
};

// Export for use
window.ComplianceData = ComplianceData;
