/**
 * Comprehensive Compliance Framework Mappings for NAC Solutions
 * Maps NAC capabilities to specific compliance requirements across all major frameworks
 */

window.ComplianceFrameworkMappings = {
    // NAC Control Categories and their compliance mappings
    nacControlCategories: {
        'device_identification': {
            description: 'Automated device discovery and classification',
            frameworks: {
                'pci-dss': ['1.1.2', '2.1', '2.4', '11.5'],
                'hipaa': ['164.308(a)(1)', '164.308(a)(4)', '164.312(a)(1)'],
                'gdpr': ['Article 32', 'Article 25'],
                'sox': ['Section 404', 'COBIT DS5.10'],
                'iso27001': ['A.8.1', 'A.9.1.2', 'A.12.6.1'],
                'nist-csf': ['ID.AM-1', 'ID.AM-2', 'PR.AC-1'],
                'fedramp': ['AC-2', 'CM-8', 'IA-3'],
                'cmmc': ['AC.1.001', 'AC.1.002', 'IA.1.076']
            }
        },
        'access_control': {
            description: 'Policy-based network access enforcement',
            frameworks: {
                'pci-dss': ['7.1', '7.2', '8.1', '8.2'],
                'hipaa': ['164.308(a)(3)', '164.308(a)(4)', '164.312(a)(1)'],
                'gdpr': ['Article 32(1)(b)', 'Article 25'],
                'sox': ['Section 404', 'COBIT DS5.3'],
                'iso27001': ['A.9.1', 'A.9.2', 'A.9.4'],
                'nist-csf': ['PR.AC-1', 'PR.AC-3', 'PR.AC-4'],
                'fedramp': ['AC-2', 'AC-3', 'AC-17'],
                'cmmc': ['AC.2.005', 'AC.2.007', 'AC.2.008']
            }
        },
        'network_segmentation': {
            description: 'Dynamic microsegmentation and isolation',
            frameworks: {
                'pci-dss': ['1.2', '1.3', '2.3', '3.4.1'],
                'hipaa': ['164.308(a)(4)(ii)(A)', '164.312(e)(1)'],
                'gdpr': ['Article 32(1)', 'Article 25'],
                'sox': ['Section 404', 'COBIT DS5.9'],
                'iso27001': ['A.13.1', 'A.13.2', 'A.14.1.2'],
                'nist-csf': ['PR.AC-5', 'PR.PT-3', 'PR.PT-4'],
                'fedramp': ['SC-7', 'SC-32', 'AC-4'],
                'cmmc': ['AC.3.018', 'SC.3.177', 'SC.3.180']
            }
        },
        'continuous_monitoring': {
            description: 'Real-time visibility and anomaly detection',
            frameworks: {
                'pci-dss': ['10.1', '10.2', '10.5', '11.5'],
                'hipaa': ['164.308(a)(1)(ii)(D)', '164.312(b)'],
                'gdpr': ['Article 32(1)(d)', 'Article 33'],
                'sox': ['Section 404', 'COBIT ME2.1'],
                'iso27001': ['A.12.4', 'A.16.1', 'A.18.2.3'],
                'nist-csf': ['DE.AE-1', 'DE.CM-1', 'DE.CM-7'],
                'fedramp': ['AU-2', 'AU-12', 'SI-4'],
                'cmmc': ['AU.2.041', 'AU.2.042', 'SI.2.217']
            }
        },
        'threat_response': {
            description: 'Automated threat detection and response',
            frameworks: {
                'pci-dss': ['12.10.1', '11.5', '10.6.1'],
                'hipaa': ['164.308(a)(6)', '164.308(a)(7)'],
                'gdpr': ['Article 33', 'Article 34'],
                'sox': ['Section 404', 'COBIT DS5.5'],
                'iso27001': ['A.16.1', 'A.12.2', 'A.12.6'],
                'nist-csf': ['RS.RP-1', 'RS.AN-1', 'DE.DP-4'],
                'fedramp': ['IR-4', 'IR-6', 'SI-3'],
                'cmmc': ['IR.2.092', 'IR.2.093', 'SI.3.218']
            }
        },
        'compliance_reporting': {
            description: 'Automated compliance reporting and audit trails',
            frameworks: {
                'pci-dss': ['10.7', '12.8.5', '12.10.6'],
                'hipaa': ['164.308(a)(1)(ii)(D)', '164.316(b)'],
                'gdpr': ['Article 30', 'Article 5(2)'],
                'sox': ['Section 404', 'Section 302'],
                'iso27001': ['A.18.2', 'A.12.7', 'A.5.1.2'],
                'nist-csf': ['ID.GV-3', 'ID.RA-3', 'RS.CO-3'],
                'fedramp': ['AU-6', 'CA-7', 'PM-14'],
                'cmmc': ['AU.3.046', 'CA.2.157', 'CA.2.159']
            }
        },
        'guest_management': {
            description: 'Secure guest and contractor access',
            frameworks: {
                'pci-dss': ['8.1.8', '7.1.4', '12.3'],
                'hipaa': ['164.308(a)(3)(ii)(A)', '164.308(a)(4)'],
                'gdpr': ['Article 32', 'Article 29'],
                'sox': ['Section 404', 'COBIT DS5.11'],
                'iso27001': ['A.9.1.2', 'A.9.2.6', 'A.11.1.2'],
                'nist-csf': ['PR.AC-2', 'PR.MA-1', 'PR.PT-2'],
                'fedramp': ['AC-2(5)', 'PE-2', 'PE-3'],
                'cmmc': ['AC.2.013', 'PE.2.120', 'PE.3.134']
            }
        }
    },
    
    // Industry-specific compliance requirements
    industryRequirements: {
        'healthcare': {
            primary: ['hipaa', 'nist-csf'],
            secondary: ['iso27001', 'gdpr'],
            specificRequirements: [
                'PHI encryption in transit and at rest',
                'Medical device isolation and monitoring',
                'Emergency access procedures',
                'Minimum necessary access controls',
                'Business Associate Agreement compliance'
            ]
        },
        'finance': {
            primary: ['pci-dss', 'sox', 'nist-csf'],
            secondary: ['iso27001', 'gdpr'],
            specificRequirements: [
                'Cardholder data environment segmentation',
                'Financial system access controls',
                'Trading floor network isolation',
                'Privileged user monitoring',
                'Change management controls'
            ]
        },
        'government': {
            primary: ['fedramp', 'cmmc', 'nist-csf'],
            secondary: ['iso27001'],
            specificRequirements: [
                'Controlled Unclassified Information (CUI) protection',
                'FIPS 140-2 encryption requirements',
                'Continuous monitoring requirements',
                'Supply chain risk management',
                'Incident response within 1 hour'
            ]
        },
        'retail': {
            primary: ['pci-dss', 'gdpr'],
            secondary: ['sox', 'iso27001'],
            specificRequirements: [
                'POS system segmentation',
                'Customer data protection',
                'Store network isolation',
                'Third-party vendor access control',
                'E-commerce platform security'
            ]
        },
        'technology': {
            primary: ['sox', 'iso27001', 'gdpr'],
            secondary: ['nist-csf'],
            specificRequirements: [
                'Source code access control',
                'Development environment isolation',
                'CI/CD pipeline security',
                'Cloud workload protection',
                'API security controls'
            ]
        },
        'manufacturing': {
            primary: ['iso27001', 'nist-csf'],
            secondary: ['gdpr'],
            specificRequirements: [
                'OT/IT network segmentation',
                'SCADA system protection',
                'Supply chain security',
                'Industrial IoT device management',
                'Production environment isolation'
            ]
        },
        'education': {
            primary: ['ferpa', 'gdpr'],
            secondary: ['iso27001', 'nist-csf'],
            specificRequirements: [
                'Student data protection',
                'Research network isolation',
                'BYOD policy enforcement',
                'Guest lecturer access',
                'Campus-wide visibility'
            ]
        }
    },
    
    // Compliance automation capabilities by vendor
    vendorComplianceAutomation: {
        'portnox': {
            automatedReporting: true,
            continuousCompliance: true,
            preBuiltPolicies: true,
            auditTrails: true,
            realTimeAlerts: true,
            complianceDashboard: true,
            automationScore: 98
        },
        'cisco_ise': {
            automatedReporting: true,
            continuousCompliance: false,
            preBuiltPolicies: true,
            auditTrails: true,
            realTimeAlerts: true,
            complianceDashboard: false,
            automationScore: 75
        },
        'aruba_clearpass': {
            automatedReporting: true,
            continuousCompliance: false,
            preBuiltPolicies: true,
            auditTrails: true,
            realTimeAlerts: false,
            complianceDashboard: false,
            automationScore: 70
        },
        'forescout': {
            automatedReporting: true,
            continuousCompliance: true,
            preBuiltPolicies: false,
            auditTrails: true,
            realTimeAlerts: true,
            complianceDashboard: true,
            automationScore: 78
        }
    },
    
    // Calculate compliance readiness score
    calculateComplianceScore(vendor, framework, industry) {
        const vendorData = window.ComprehensiveVendorDatabase[vendor];
        if (!vendorData) return 0;
        
        const baseScore = vendorData.compliance[framework] || 0;
        const automationBonus = this.vendorComplianceAutomation[vendor]?.automationScore || 0;
        const industryBonus = this.industryRequirements[industry]?.primary.includes(framework) ? 10 : 0;
        
        return Math.min(100, baseScore + (automationBonus * 0.1) + industryBonus);
    }
};

// Export globally
window.ComplianceFrameworks = window.ComplianceFrameworkMappings;

console.log('✅ Compliance Framework Mappings loaded');
