// Comprehensive Compliance Framework Mappings for NAC
(function() {
    'use strict';
    
    const ComplianceMappings = {
        frameworks: {
            "PCI-DSS": {
                name: "Payment Card Industry Data Security Standard",
                version: "4.0",
                nacControls: {
                    "1.2": "Network segmentation and access control",
                    "2.3": "Secure remote access",
                    "7.1": "Limit access to system components",
                    "8.1": "Unique user identification",
                    "10.1": "Audit trails and logging",
                    "11.1": "Network intrusion detection"
                }
            },
            "HIPAA": {
                name: "Health Insurance Portability and Accountability Act",
                nacControls: {
                    "164.308(a)(3)": "Workforce access authorization",
                    "164.308(a)(4)": "Access control and validation",
                    "164.312(a)(1)": "Unique user identification",
                    "164.312(d)": "Device and media controls",
                    "164.312(e)(1)": "Network transmission security"
                }
            },
            "SOC2": {
                name: "Service Organization Control 2",
                trustPrinciples: {
                    "CC6.1": "Logical and physical access controls",
                    "CC6.2": "User authentication",
                    "CC6.3": "Network segmentation",
                    "CC6.6": "Vulnerability management",
                    "CC7.2": "System monitoring"
                }
            },
            "ISO27001": {
                name: "ISO/IEC 27001:2013",
                controls: {
                    "A.9.1": "Access control policy",
                    "A.9.2": "User access management",
                    "A.9.4": "System and application access control",
                    "A.12.4": "Logging and monitoring",
                    "A.13.1": "Network security management"
                }
            },
            "NIST": {
                name: "NIST Cybersecurity Framework",
                functions: {
                    "ID.AM": "Asset Management",
                    "PR.AC": "Identity Management and Access Control",
                    "PR.DS": "Data Security",
                    "DE.CM": "Security Continuous Monitoring",
                    "RS.AN": "Analysis"
                }
            },
            "GDPR": {
                name: "General Data Protection Regulation",
                articles: {
                    "Article 25": "Data protection by design",
                    "Article 32": "Security of processing",
                    "Article 5(1)(f)": "Integrity and confidentiality"
                }
            }
        },
        
        vendorCompliance: {
            portnox: {
                certified: ["SOC2 Type II", "ISO 27001:2013"],
                supported: ["PCI-DSS", "HIPAA", "NIST", "GDPR", "CIS", "NERC CIP"],
                automatedControls: 156,
                complianceScore: 98
            },
            cisco_ise: {
                certified: ["Common Criteria"],
                supported: ["PCI-DSS", "HIPAA", "NIST"],
                automatedControls: 87,
                complianceScore: 82
            },
            aruba_clearpass: {
                certified: ["Common Criteria"],
                supported: ["PCI-DSS", "HIPAA"],
                automatedControls: 72,
                complianceScore: 78
            }
        }
    };
    
    if (window.ModuleLoader && window.ModuleLoader.register) {
        window.ModuleLoader.register('ComplianceMappings', () => ComplianceMappings);
    }
    
    window.ComplianceMappings = ComplianceMappings;
})();
