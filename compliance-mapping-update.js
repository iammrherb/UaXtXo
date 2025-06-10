/**
 * Compliance Mapping Update for Portnox TCO Analyzer
 * Maps NAC controls to all major compliance frameworks
 */

const COMPLIANCE_MAPPINGS = {
    frameworks: [
        'SOC2', 'ISO27001', 'NIST', 'PCI-DSS', 'HIPAA', 
        'GDPR', 'CCPA', 'FedRAMP', 'CIS', 'NERC-CIP',
        'SOX', 'FISMA', 'CMMC'
    ],
    
    nacControls: {
        'Network Access Control': {
            frameworks: ['SOC2', 'ISO27001', 'NIST', 'PCI-DSS', 'HIPAA'],
            controls: {
                'SOC2': ['CC6.1', 'CC6.6'],
                'ISO27001': ['A.9.1.2', 'A.13.1.1'],
                'NIST': ['AC-2', 'AC-3', 'AC-4'],
                'PCI-DSS': ['1.1.4', '1.2.1', '2.1'],
                'HIPAA': ['164.312(a)(1)', '164.312(a)(2)']
            }
        },
        'Device Authentication': {
            frameworks: ['SOC2', 'ISO27001', 'NIST', 'PCI-DSS', 'HIPAA'],
            controls: {
                'SOC2': ['CC6.1'],
                'ISO27001': ['A.9.2.1', 'A.9.2.4'],
                'NIST': ['IA-2', 'IA-3', 'IA-5'],
                'PCI-DSS': ['8.1', '8.2', '8.3'],
                'HIPAA': ['164.312(d)']
            }
        },
        'Network Segmentation': {
            frameworks: ['SOC2', 'ISO27001', 'NIST', 'PCI-DSS'],
            controls: {
                'SOC2': ['CC6.6'],
                'ISO27001': ['A.13.1.3'],
                'NIST': ['SC-7', 'SC-32'],
                'PCI-DSS': ['1.2.3', '1.3.1']
            }
        },
        'Continuous Monitoring': {
            frameworks: ['SOC2', 'ISO27001', 'NIST', 'FedRAMP'],
            controls: {
                'SOC2': ['CC7.1'],
                'ISO27001': ['A.12.4.1'],
                'NIST': ['CA-7', 'SI-4'],
                'FedRAMP': ['CA-7', 'SI-4']
            }
        },
        'Incident Response': {
            frameworks: ['SOC2', 'ISO27001', 'NIST', 'HIPAA'],
            controls: {
                'SOC2': ['CC7.3', 'CC7.4'],
                'ISO27001': ['A.16.1.1', 'A.16.1.4'],
                'NIST': ['IR-4', 'IR-5', 'IR-6'],
                'HIPAA': ['164.308(a)(6)']
            }
        }
    },
    
    industrySpecific: {
        'Healthcare': ['HIPAA', 'SOC2', 'ISO27001'],
        'Financial': ['PCI-DSS', 'SOX', 'SOC2', 'ISO27001'],
        'Government': ['FedRAMP', 'FISMA', 'NIST', 'CMMC'],
        'Energy': ['NERC-CIP', 'ISO27001', 'NIST'],
        'Retail': ['PCI-DSS', 'SOC2', 'CCPA', 'GDPR'],
        'Technology': ['SOC2', 'ISO27001', 'GDPR', 'CCPA'],
        'Manufacturing': ['ISO27001', 'NIST', 'CMMC'],
        'Education': ['FERPA', 'COPPA', 'GDPR', 'ISO27001']
    }
};

// Export for use
window.ComplianceMappings = COMPLIANCE_MAPPINGS;
