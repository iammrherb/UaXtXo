// Compliance Database Module
defineModule('ComplianceDatabase', [], function() {
    'use strict';

    const frameworks = {
        'hipaa': {
            id: 'hipaa',
            name: 'HIPAA',
            description: 'Health Insurance Portability and Accountability Act',
            controls: ['Access Control', 'Audit Controls', 'Integrity', 'Transmission Security']
        },
        'pci-dss': {
            id: 'pci-dss',
            name: 'PCI-DSS',
            description: 'Payment Card Industry Data Security Standard',
            controls: ['Network Segmentation', 'Access Control', 'Monitoring', 'Vulnerability Management']
        },
        'gdpr': {
            id: 'gdpr',
            name: 'GDPR',
            description: 'General Data Protection Regulation',
            controls: ['Data Protection', 'Access Rights', 'Consent Management', 'Breach Notification']
        },
        'sox': {
            id: 'sox',
            name: 'SOX',
            description: 'Sarbanes-Oxley Act',
            controls: ['Access Controls', 'Change Management', 'Audit Trail', 'Segregation of Duties']
        },
        'iso27001': {
            id: 'iso27001',
            name: 'ISO 27001',
            description: 'Information Security Management System',
            controls: ['Access Control', 'Asset Management', 'Incident Response', 'Business Continuity']
        },
        'nist': {
            id: 'nist',
            name: 'NIST 800-53',
            description: 'NIST Security and Privacy Controls',
            controls: ['Access Control', 'Audit and Accountability', 'System Protection', 'Incident Response']
        }
    };

    const vendorCompliance = {
        'portnox': {
            frameworks: ['hipaa', 'pci-dss', 'gdpr', 'sox', 'iso27001', 'nist'],
            certifications: ['SOC2 Type II', 'ISO 27001', 'GDPR Compliant'],
            auditReadiness: 95
        },
        'cisco-ise': {
            frameworks: ['hipaa', 'pci-dss', 'sox', 'nist'],
            certifications: ['Common Criteria'],
            auditReadiness: 75
        },
        'aruba-clearpass': {
            frameworks: ['hipaa', 'pci-dss', 'nist'],
            certifications: ['Common Criteria'],
            auditReadiness: 70
        },
        'forescout': {
            frameworks: ['hipaa', 'pci-dss', 'sox', 'nist'],
            certifications: ['Common Criteria'],
            auditReadiness: 72
        }
    };

    return {
        getFrameworks: () => Object.values(frameworks),
        getFramework: (id) => frameworks[id],
        getVendorCompliance: (vendorId) => vendorCompliance[vendorId] || {},
        compareCompliance: (vendorIds) => {
            return vendorIds.map(id => ({
                vendorId: id,
                compliance: vendorCompliance[id] || {}
            }));
        }
    };
});
