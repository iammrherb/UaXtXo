// COMPLETE Compliance Framework Database
window.AllComplianceData = {
    frameworks: {
        // Payment Card Industry
        "PCI-DSS": {
            fullName: "Payment Card Industry Data Security Standard",
            version: "4.0",
            authority: "PCI Security Standards Council",
            scope: "Organizations handling payment card data",
            
            requirements: {
                "1": {
                    title: "Install and maintain network security controls",
                    subrequirements: {
                        "1.1": "Processes and mechanisms for installing and maintaining network security controls",
                        "1.2": "Network security controls configured to deny all traffic by default",
                        "1.3": "Network access to and from cardholder data environment restricted",
                        "1.4": "Network connections between trusted and untrusted networks controlled",
                        "1.5": "Risks to CDE from computing devices managed"
                    },
                    nacControls: {
                        portnox: ["Automated policy enforcement", "Zero-trust architecture", "Microsegmentation"],
                        cisco: ["Firewall integration", "VLAN assignment", "ACL management"],
                        legacy: ["Basic network segmentation", "Manual policy configuration"]
                    }
                },
                "2": {
                    title: "Apply secure configurations",
                    subrequirements: {
                        "2.1": "Processes and mechanisms for applying secure configurations",
                        "2.2": "System components configured and managed securely",
                        "2.3": "Wireless environments configured and managed securely"
                    }
                },
                "7": {
                    title: "Restrict access by business need to know",
                    nacControls: {
                        portnox: ["Role-based access", "Dynamic policies", "Real-time enforcement"],
                        cisco: ["802.1X authentication", "MAB", "Guest portals"]
                    }
                },
                "8": {
                    title: "Identify and authenticate access",
                    nacControls: {
                        portnox: ["MFA integration", "Certificate auth", "Biometric support"],
                        cisco: ["RADIUS/TACACS+", "AD integration", "Certificate services"]
                    }
                },
                "10": {
                    title: "Log and monitor all access",
                    nacControls: {
                        portnox: ["Centralized logging", "Real-time alerts", "Forensic analysis"],
                        cisco: ["Syslog integration", "ISE reports", "Third-party SIEM"]
                    }
                }
            },
            
            complianceMapping: {
                portnox: {
                    coverage: 98,
                    automated: 95,
                    gaps: ["Physical security controls"],
                    strengths: ["Automated compliance reporting", "Continuous monitoring", "Real-time enforcement"]
                },
                cisco: {
                    coverage: 90,
                    automated: 70,
                    gaps: ["Cloud workload protection", "Automated remediation"],
                    strengths: ["Mature platform", "Extensive integration", "Detailed logging"]
                }
            }
        },
        
        // Healthcare
        "HIPAA": {
            fullName: "Health Insurance Portability and Accountability Act",
            authority: "U.S. Department of Health and Human Services",
            scope: "Healthcare providers, plans, and clearinghouses",
            
            safeguards: {
                administrative: {
                    "164.308(a)(1)": {
                        title: "Security management process",
                        requirements: ["Risk analysis", "Risk management", "Sanction policy", "Information system review"],
                        nacControls: {
                            portnox: ["Automated risk scoring", "Continuous assessment", "Policy violation alerts"],
                            cisco: ["Periodic assessments", "Manual review processes"]
                        }
                    },
                    "164.308(a)(3)": {
                        title: "Workforce security",
                        requirements: ["Authorization procedures", "Workforce clearance", "Termination procedures"],
                        nacControls: {
                            portnox: ["Automated deprovisioning", "Role-based access", "Real-time updates"],
                            cisco: ["Manual processes", "Scheduled updates"]
                        }
                    },
                    "164.308(a)(4)": {
                        title: "Information access management",
                        requirements: ["Access authorization", "Access establishment", "Access modification"],
                        nacControls: {
                            portnox: ["Dynamic access control", "Automated provisioning", "Audit trails"],
                            cisco: ["Static policies", "Manual provisioning"]
                        }
                    }
                },
                physical: {
                    "164.310(a)": {
                        title: "Facility access controls",
                        nacControls: {
                            portnox: ["Integration with physical security", "Location-based policies"],
                            cisco: ["Basic facility controls"]
                        }
                    }
                },
                technical: {
                    "164.312(a)": {
                        title: "Access control",
                        requirements: ["Unique user identification", "Automatic logoff", "Encryption"],
                        nacControls: {
                            portnox: ["User/device identification", "Session management", "Encrypted communications"],
                            cisco: ["User authentication", "Session timeouts"]
                        }
                    },
                    "164.312(b)": {
                        title: "Audit controls",
                        nacControls: {
                            portnox: ["Comprehensive logging", "Tamper-proof logs", "Real-time monitoring"],
                            cisco: ["System logging", "Report generation"]
                        }
                    }
                }
            },
            
            complianceMapping: {
                portnox: {
                    coverage: 99,
                    automated: 96,
                    certifications: ["HIPAA compliant infrastructure", "BAA available"],
                    features: ["PHI protection", "Audit trails", "Access controls", "Encryption"]
                },
                cisco: {
                    coverage: 88,
                    automated: 65,
                    certifications: ["HIPAA capable"],
                    features: ["Access control", "Logging", "Authentication"]
                }
            }
        },
        
        // SOC 2
        "SOC2": {
            fullName: "Service Organization Control 2",
            authority: "AICPA (American Institute of CPAs)",
            scope: "Service organizations storing customer data",
            
            trustServiceCriteria: {
                security: {
                    "CC6.1": {
                        title: "Logical and physical access controls",
                        nacControls: {
                            portnox: ["Cloud-native access control", "Zero-trust enforcement", "Continuous monitoring"],
                            cisco: ["Traditional access control", "Periodic reviews"]
                        }
                    },
                    "CC6.2": {
                        title: "New user provisioning",
                        nacControls: {
                            portnox: ["Automated onboarding", "Role-based templates", "Approval workflows"],
                            cisco: ["Manual provisioning", "Static assignments"]
                        }
                    },
                    "CC6.3": {
                        title: "User access removal",
                        nacControls: {
                            portnox: ["Instant deprovisioning", "Automated workflows", "Audit trails"],
                            cisco: ["Manual removal", "Scheduled reviews"]
                        }
                    },
                    "CC6.6": {
                        title: "Logical access security",
                        nacControls: {
                            portnox: ["AI-powered threat detection", "Behavioral analysis", "Real-time response"],
                            cisco: ["Rule-based detection", "Manual response"]
                        }
                    },
                    "CC6.7": {
                        title: "System monitoring",
                        nacControls: {
                            portnox: ["24/7 monitoring", "Automated alerts", "Predictive analytics"],
                            cisco: ["Periodic monitoring", "Threshold alerts"]
                        }
                    }
                },
                availability: {
                    "A1.1": {
                        title: "System availability",
                        nacControls: {
                            portnox: ["99.99% SLA", "Auto-scaling", "Global redundancy"],
                            cisco: ["Customer-managed availability"]
                        }
                    }
                },
                confidentiality: {
                    "C1.1": {
                        title: "Confidential information protection",
                        nacControls: {
                            portnox: ["End-to-end encryption", "Data classification", "DLP integration"],
                            cisco: ["Basic encryption", "Manual classification"]
                        }
                    }
                },
                processingIntegrity: {
                    "PI1.1": {
                        title: "Processing integrity",
                        nacControls: {
                            portnox: ["Data validation", "Transaction monitoring", "Error detection"],
                            cisco: ["Basic validation"]
                        }
                    }
                },
                privacy: {
                    "P1.1": {
                        title: "Privacy notice",
                        nacControls: {
                            portnox: ["Privacy by design", "Consent management", "Data minimization"],
                            cisco: ["Privacy policies"]
                        }
                    }
                }
            },
            
            complianceMapping: {
                portnox: {
                    coverage: 100,
                    type: "Type II",
                    automated: 98,
                    certification: "SOC 2 Type II Certified",
                    auditFrequency: "Annual",
                    lastAudit: "2024"
                },
                cisco: {
                    coverage: 85,
                    type: "Customer responsibility",
                    automated: 60,
                    certification: "SOC 2 capable"
                }
            }
        },
        
        // ISO Standards
        "ISO27001": {
            fullName: "ISO/IEC 27001:2022 Information Security Management",
            authority: "International Organization for Standardization",
            scope: "Information security management systems",
            
            controls: {
                "5": {
                    title: "Organizational controls",
                    controls: {
                        "5.1": "Policies for information security",
                        "5.2": "Information security roles and responsibilities",
                        "5.3": "Segregation of duties",
                        "5.4": "Management responsibilities"
                    }
                },
                "6": {
                    title: "People controls",
                    controls: {
                        "6.1": "Screening",
                        "6.2": "Terms and conditions of employment",
                        "6.3": "Information security awareness",
                        "6.4": "Disciplinary process"
                    }
                },
                "7": {
                    title: "Physical controls",
                    controls: {
                        "7.1": "Physical security perimeters",
                        "7.2": "Physical entry",
                        "7.3": "Securing offices and facilities",
                        "7.4": "Physical security monitoring"
                    }
                },
                "8": {
                    title: "Technological controls",
                    controls: {
                        "8.1": "User endpoint devices",
                        "8.2": "Privileged access rights",
                        "8.3": "Information access restriction",
                        "8.4": "Access to source code",
                        "8.5": "Secure authentication",
                        "8.6": "Capacity management",
                        "8.7": "Protection against malware",
                        "8.8": "Management of technical vulnerabilities",
                        "8.9": "Configuration management",
                        "8.10": "Information deletion",
                        "8.11": "Data masking",
                        "8.12": "Data leakage prevention",
                        "8.13": "Information backup",
                        "8.14": "Redundancy of information processing",
                        "8.15": "Logging",
                        "8.16": "Monitoring activities",
                        "8.17": "Clock synchronization",
                        "8.18": "Use of privileged utility programs",
                        "8.19": "Installation of software",
                        "8.20": "Networks security",
                        "8.21": "Security of network services",
                        "8.22": "Segregation of networks",
                        "8.23": "Web filtering",
                        "8.24": "Use of cryptography",
                        "8.25": "Secure development life cycle",
                        "8.26": "Application security requirements",
                        "8.27": "Secure system architecture",
                        "8.28": "Secure coding",
                        "8.29": "Security testing in development",
                        "8.30": "Outsourced development",
                        "8.31": "Separation of environments",
                        "8.32": "Change management",
                        "8.33": "Test information",
                        "8.34": "Protection of information systems during audit"
                    },
                    nacControls: {
                        portnox: [
                            "Comprehensive endpoint control (8.1)",
                            "Dynamic privilege management (8.2)",
                            "Granular access restriction (8.3)",
                            "Strong authentication with MFA (8.5)",
                            "Real-time malware protection (8.7)",
                            "Automated vulnerability management (8.8)",
                            "Configuration compliance (8.9)",
                            "Data protection and DLP (8.12)",
                            "Centralized logging (8.15)",
                            "Continuous monitoring (8.16)",
                            "Advanced network security (8.20)",
                            "Microsegmentation (8.22)",
                            "Encryption enforcement (8.24)"
                        ],
                        cisco: [
                            "Basic endpoint control (8.1)",
                            "Static privilege assignment (8.2)",
                            "Network access control (8.3)",
                            "RADIUS authentication (8.5)",
                            "Network monitoring (8.16)",
                            "VLAN segmentation (8.22)"
                        ]
                    }
                }
            },
            
            complianceMapping: {
                portnox: {
                    coverage: 97,
                    certification: "ISO 27001:2022 Certified",
                    automated: 92,
                    scope: "Full ISMS certification"
                },
                cisco: {
                    coverage: 90,
                    certification: "ISO 27001 aligned",
                    automated: 65,
                    scope: "Supports customer certification"
                }
            }
        },
        
        "ISO27017": {
            fullName: "ISO/IEC 27017:2015 Cloud Security",
            authority: "International Organization for Standardization",
            scope: "Cloud service providers and customers",
            
            cloudControls: {
                "CLD.6.3": "Shared administration of virtual machines",
                "CLD.8.1": "Cloud service customer assets",
                "CLD.9.5": "Segregation in virtual environments",
                "CLD.12.1": "Responsibilities for cloud services",
                "CLD.12.3": "Supply chain relationships"
            },
            
            complianceMapping: {
                portnox: {
                    coverage: 95,
                    certification: "ISO 27017 Certified",
                    cloudNative: true
                },
                cisco: {
                    coverage: 40,
                    certification: "Not applicable",
                    cloudNative: false
                }
            }
        },
        
        "ISO27018": {
            fullName: "ISO/IEC 27018:2019 Privacy in Cloud",
            authority: "International Organization for Standardization",
            scope: "PII protection in cloud",
            
            complianceMapping: {
                portnox: {
                    coverage: 94,
                    certification: "ISO 27018 Certified",
                    privacyFeatures: ["Data minimization", "Purpose limitation", "Consent management"]
                }
            }
        },
        
        // GDPR
        "GDPR": {
            fullName: "General Data Protection Regulation",
            authority: "European Union",
            scope: "Organizations processing EU personal data",
            
            articles: {
                "5": {
                    title: "Principles",
                    requirements: ["Lawfulness", "Purpose limitation", "Data minimization", "Accuracy", "Storage limitation", "Security", "Accountability"]
                },
                "25": {
                    title: "Data protection by design and default",
                    nacControls: {
                        portnox: ["Privacy by design architecture", "Default security settings", "Minimal data collection"],
                        cisco: ["Manual privacy configuration"]
                    }
                },
                "32": {
                    title: "Security of processing",
                    requirements: ["Encryption", "Confidentiality", "Integrity", "Availability", "Resilience"],
                    nacControls: {
                        portnox: ["End-to-end encryption", "Access controls", "Audit trails", "Resilient architecture"],
                        cisco: ["Basic security controls"]
                    }
                },
                "33": {
                    title: "Breach notification",
                    nacControls: {
                        portnox: ["Automated breach detection", "72-hour notification capability", "Incident management"],
                        cisco: ["Manual breach detection"]
                    }
                },
                "35": {
                    title: "Data protection impact assessment",
                    nacControls: {
                        portnox: ["Built-in DPIA tools", "Risk assessment", "Privacy controls"],
                        cisco: ["Manual DPIA process"]
                    }
                }
            },
            
            rights: {
                "15": "Right of access",
                "16": "Right to rectification",
                "17": "Right to erasure",
                "18": "Right to restriction",
                "20": "Right to portability",
                "21": "Right to object"
            },
            
            complianceMapping: {
                portnox: {
                    coverage: 96,
                    features: ["EU data residency", "Privacy controls", "Data subject rights", "DPO support"],
                    certifications: ["GDPR compliant", "EU-US Data Privacy Framework"]
                },
                cisco: {
                    coverage: 82,
                    features: ["Basic privacy controls"],
                    certifications: ["GDPR capable"]
                }
            }
        },
        
        // CCPA
        "CCPA": {
            fullName: "California Consumer Privacy Act",
            authority: "State of California",
            scope: "Businesses collecting California residents' data",
            
            rights: {
                "1798.100": "Right to know",
                "1798.105": "Right to delete",
                "1798.110": "Right to know categories",
                "1798.115": "Right to know information",
                "1798.120": "Right to opt-out",
                "1798.125": "Right to non-discrimination"
            },
            
            complianceMapping: {
                portnox: {
                    coverage: 93,
                    features: ["Data discovery", "Access controls", "Deletion capabilities", "Audit trails"]
                }
            }
        },
        
        // NIST
        "NIST-CSF": {
            fullName: "NIST Cybersecurity Framework",
            authority: "National Institute of Standards and Technology",
            version: "2.0",
            scope: "Critical infrastructure cybersecurity",
            
            functions: {
                identify: {
                    categories: ["Asset Management", "Risk Assessment", "Risk Management Strategy"],
                    nacControls: {
                        portnox: ["Automated asset discovery", "Continuous risk scoring", "Dynamic policies"],
                        cisco: ["Manual asset management", "Periodic assessments"]
                    }
                },
                protect: {
                    categories: ["Access Control", "Data Security", "Protective Technology"],
                    nacControls: {
                        portnox: ["Zero-trust access", "Encryption", "Advanced threat protection"],
                        cisco: ["Traditional access control", "Basic protection"]
                    }
                },
                detect: {
                    categories: ["Anomalies", "Continuous Monitoring", "Detection Processes"],
                    nacControls: {
                        portnox: ["AI-powered detection", "Real-time monitoring", "Automated workflows"],
                        cisco: ["Rule-based detection", "Periodic monitoring"]
                    }
                },
                respond: {
                    categories: ["Response Planning", "Communications", "Mitigation"],
                    nacControls: {
                        portnox: ["Automated response", "Real-time alerts", "Auto-remediation"],
                        cisco: ["Manual response", "Alert generation"]
                    }
                },
                recover: {
                    categories: ["Recovery Planning", "Improvements", "Communications"],
                    nacControls: {
                        portnox: ["Cloud resilience", "Automatic recovery", "Continuous improvement"],
                        cisco: ["Manual recovery processes"]
                    }
                }
            }
        },
        
        // FedRAMP
        "FedRAMP": {
            fullName: "Federal Risk and Authorization Management Program",
            authority: "U.S. Federal Government",
            scope: "Cloud services for federal agencies",
            
            impactLevels: {
                low: { controls: 125, baseline: "NIST 800-53 Low" },
                moderate: { controls: 325, baseline: "NIST 800-53 Moderate" },
                high: { controls: 421, baseline: "NIST 800-53 High" }
            },
            
            complianceMapping: {
                portnox: {
                    coverage: 88,
                    status: "FedRAMP Ready",
                    targetLevel: "Moderate"
                }
            }
        },
        
        // Industry Specific
        "NERC-CIP": {
            fullName: "NERC Critical Infrastructure Protection",
            authority: "North American Electric Reliability Corporation",
            scope: "Bulk electric system cybersecurity",
            
            standards: {
                "CIP-002": "BES Cyber System Categorization",
                "CIP-003": "Security Management Controls",
                "CIP-004": "Personnel & Training",
                "CIP-005": "Electronic Security Perimeters",
                "CIP-006": "Physical Security",
                "CIP-007": "System Security Management",
                "CIP-008": "Incident Reporting",
                "CIP-009": "Recovery Plans",
                "CIP-010": "Configuration Management",
                "CIP-011": "Information Protection"
            },
            
            complianceMapping: {
                portnox: {
                    coverage: 90,
                    features: ["ESP management", "Access control", "Change management", "Logging"]
                }
            }
        },
        
        "HITRUST": {
            fullName: "Health Information Trust Alliance",
            authority: "HITRUST Alliance",
            scope: "Healthcare information security",
            
            complianceMapping: {
                portnox: {
                    coverage: 92,
                    certification: "HITRUST Ready"
                }
            }
        },
        
        // Financial
        "SOX": {
            fullName: "Sarbanes-Oxley Act",
            authority: "U.S. Congress",
            scope: "Public company financial reporting",
            
            sections: {
                "302": "Corporate responsibility for financial reports",
                "404": "Management assessment of internal controls",
                "409": "Real-time disclosures",
                "802": "Criminal penalties for document alteration"
            },
            
            itControls: {
                accessControl: "Restrict access to financial systems",
                changeManagement: "Control changes to financial systems",
                auditTrails: "Maintain audit trails"
            },
            
            complianceMapping: {
                portnox: {
                    coverage: 94,
                    features: ["Access control", "Audit trails", "Change tracking", "Segregation of duties"]
                }
            }
        },
        
        "GLBA": {
            fullName: "Gramm-Leach-Bliley Act",
            authority: "U.S. Congress",
            scope: "Financial institutions customer data protection",
            
            safeguards: {
                administrative: ["Risk assessment", "Employee training", "Vendor management"],
                technical: ["Access controls", "Encryption", "Monitoring"],
                physical: ["Facility security", "Device controls"]
            }
        },
        
        "Basel-III": {
            fullName: "Basel III International Regulatory Framework",
            authority: "Basel Committee on Banking Supervision",
            scope: "Banking sector regulation",
            
            operationalRisk: {
                cyberRisk: "Cybersecurity risk management",
                dataProtection: "Customer data protection",
                systemResilience: "Operational resilience"
            }
        },
        
        // State and Regional
        "StateRAMP": {
            fullName: "State Risk and Authorization Management Program",
            authority: "StateRAMP PMO",
            scope: "Cloud services for state and local government",
            
            complianceMapping: {
                portnox: {
                    coverage: 85,
                    status: "StateRAMP Ready"
                }
            }
        },
        
        "LGPD": {
            fullName: "Lei Geral de Proteção de Dados",
            authority: "Brazil",
            scope: "Brazilian data protection law",
            
            complianceMapping: {
                portnox: {
                    coverage: 91,
                    features: ["Data residency options", "Privacy controls"]
                }
            }
        },
        
        "PIPEDA": {
            fullName: "Personal Information Protection and Electronic Documents Act",
            authority: "Canada",
            scope: "Canadian privacy law"
        },
        
        "APRA": {
            fullName: "Australian Prudential Regulation Authority",
            authority: "Australia",
            scope: "Australian financial services"
        }
    },
    
    // Compliance requirement categories
    requirementCategories: {
        accessControl: {
            name: "Access Control",
            frameworks: ["PCI-DSS", "HIPAA", "SOC2", "ISO27001", "NIST-CSF"],
            requirements: [
                "User authentication",
                "Role-based access",
                "Least privilege",
                "Access reviews",
                "Privileged access management"
            ]
        },
        
        dataProtection: {
            name: "Data Protection",
            frameworks: ["GDPR", "CCPA", "HIPAA", "PCI-DSS"],
            requirements: [
                "Encryption at rest",
                "Encryption in transit",
                "Data classification",
                "Data retention",
                "Data disposal"
            ]
        },
        
        monitoring: {
            name: "Monitoring & Logging",
            frameworks: ["PCI-DSS", "HIPAA", "SOC2", "NIST-CSF"],
            requirements: [
                "Activity logging",
                "Log retention",
                "Real-time monitoring",
                "Anomaly detection",
                "Incident alerting"
            ]
        },
        
        incidentResponse: {
            name: "Incident Response",
            frameworks: ["NIST-CSF", "GDPR", "SOC2"],
            requirements: [
                "Incident detection",
                "Response procedures",
                "Breach notification",
                "Forensics capability",
                "Recovery planning"
            ]
        },
        
        riskManagement: {
            name: "Risk Management",
            frameworks: ["ISO27001", "NIST-CSF", "SOC2"],
            requirements: [
                "Risk assessment",
                "Risk treatment",
                "Risk monitoring",
                "Third-party risk",
                "Continuous improvement"
            ]
        }
    },
    
    // Industry-specific compliance requirements
    industryRequirements: {
        healthcare: {
            primary: ["HIPAA", "HITRUST"],
            secondary: ["ISO27001", "SOC2", "NIST-CSF"],
            specific: ["PHI protection", "Medical device security", "Interoperability"]
        },
        
        finance: {
            primary: ["PCI-DSS", "SOX", "GLBA", "Basel-III"],
            secondary: ["ISO27001", "SOC2", "NIST-CSF"],
            specific: ["Transaction security", "Fraud prevention", "AML compliance"]
        },
        
        retail: {
            primary: ["PCI-DSS", "CCPA", "GDPR"],
            secondary: ["SOC2", "ISO27001"],
            specific: ["Payment security", "Customer data protection", "Supply chain"]
        },
        
        government: {
            primary: ["FedRAMP", "FISMA", "StateRAMP"],
            secondary: ["NIST-CSF", "ISO27001"],
            specific: ["Classified data", "Citizen privacy", "Transparency"]
        },
        
        education: {
            primary: ["FERPA", "COPPA", "GDPR"],
            secondary: ["ISO27001", "NIST-CSF"],
            specific: ["Student data", "Research data", "Minor protection"]
        },
        
        energy: {
            primary: ["NERC-CIP", "ICS-CERT"],
            secondary: ["ISO27001", "NIST-CSF"],
            specific: ["OT security", "Critical infrastructure", "Grid resilience"]
        },
        
        manufacturing: {
            primary: ["ISO27001", "NIST-CSF", "IEC-62443"],
            secondary: ["SOC2", "GDPR"],
            specific: ["IP protection", "OT/IT convergence", "Supply chain"]
        }
    }
};

console.log('✅ Complete compliance framework data loaded');
