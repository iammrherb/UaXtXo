/**
 * Comprehensive Compliance Frameworks Database
 * Complete regulatory and compliance framework mappings
 */

window.ComplianceFrameworks = {
    // SOX (Sarbanes-Oxley)
    sox: {
        id: "sox",
        name: "Sarbanes-Oxley Act",
        category: "Financial",
        description: "US federal law for public company financial reporting",
        enacted: "2002",
        lastUpdated: "2022",
        
        sections: {
            "302": {
                title: "Corporate Responsibility for Financial Reports",
                requirements: [
                    "CEO/CFO certification of financial reports",
                    "Internal controls assessment",
                    "Disclosure of deficiencies"
                ],
                nacMapping: {
                    requirement: "Ensure only authorized personnel access financial systems",
                    implementation: "Role-based access control with audit trails",
                    portnoxFeatures: [
                        "Automated user provisioning",
                        "Privileged access management",
                        "Comprehensive audit logging",
                        "Real-time access monitoring"
                    ]
                }
            },
            "404": {
                title: "Management Assessment of Internal Controls",
                requirements: [
                    "Annual internal control report",
                    "Auditor attestation",
                    "Documentation of controls"
                ],
                nacMapping: {
                    requirement: "Document and test IT controls",
                    implementation: "Automated control testing and evidence collection",
                    portnoxFeatures: [
                        "Continuous compliance monitoring",
                        "Automated evidence generation",
                        "Control effectiveness reporting",
                        "Exception tracking"
                    ],
                    automationLevel: 95
                }
            }
        },
        
        itControls: {
            accessControl: {
                description: "Logical access to financial systems",
                nacRequirements: [
                    "User authentication and authorization",
                    "Segregation of duties",
                    "Access reviews and recertification",
                    "Privileged access management"
                ],
                portnoxImplementation: {
                    features: [
                        "Multi-factor authentication",
                        "Dynamic access policies",
                        "Automated access reviews",
                        "Just-in-time access"
                    ],
                    complianceScore: 98
                }
            },
            changeManagement: {
                description: "Control over system changes",
                nacRequirements: [
                    "Change authorization",
                    "Testing and approval",
                    "Emergency change procedures"
                ],
                portnoxImplementation: {
                    features: [
                        "Policy version control",
                        "Change approval workflows",
                        "Automated rollback"
                    ]
                }
            }
        },
        
        penalties: {
            criminal: {
                maxPrison: "20 years",
                maxFine: 5000000,
                for: "Willful violations"
            },
            civil: {
                maxFine: 1000000,
                disqualification: "Officer/Director ban"
            },
            corporate: {
                delistingRisk: true,
                reputationDamage: "Severe",
                investorLawsuits: "Likely"
            }
        },
        
        auditRequirements: {
            frequency: "Annual",
            scope: "All material financial systems",
            evidence: [
                "Access logs",
                "User access lists",
                "Change logs",
                "Security configurations"
            ],
            portnoxSupport: {
                evidenceGeneration: "Automated",
                auditReadiness: "Real-time dashboards",
                timeReduction: "90%"
            }
        }
    },
    
    // HIPAA Framework
    hipaa: {
        id: "hipaa",
        name: "Health Insurance Portability and Accountability Act",
        category: "Healthcare",
        description: "US healthcare data privacy and security provisions",
        enacted: "1996",
        lastUpdated: "2024",
        
        rules: {
            privacy: {
                title: "Privacy Rule",
                requirements: [
                    "Minimum necessary access",
                    "Patient rights to access PHI",
                    "Disclosure accounting"
                ],
                nacMapping: {
                    implementation: "Attribute-based access control",
                    portnoxFeatures: [
                        "Role-based PHI access",
                        "Purpose-based restrictions",
                        "Access audit trails"
                    ]
                }
            },
            security: {
                title: "Security Rule",
                safeguards: {
                    administrative: {
                        requirements: [
                            "Security officer designation",
                            "Workforce training",
                            "Access management",
                            "Security awareness"
                        ],
                        nacControls: {
                            "164.308(a)(3)": {
                                name: "Workforce Security",
                                implementation: "Automated access control",
                                portnoxFeatures: [
                                    "Background check integration",
                                    "Automated termination procedures",
                                    "Access privilege management"
                                ]
                            },
                            "164.308(a)(4)": {
                                name: "Information Access Management",
                                implementation: "Zero Trust access",
                                portnoxFeatures: [
                                    "Least privilege enforcement",
                                    "Dynamic authorization",
                                    "Continuous verification"
                                ]
                            }
                        }
                    },
                    physical: {
                        requirements: [
                            "Facility access controls",
                            "Workstation security",
                            "Device controls"
                        ],
                        nacControls: {
                            workstationSecurity: {
                                implementation: "Device trust verification",
                                portnoxFeatures: [
                                    "Device compliance checking",
                                    "Location-based policies",
                                    "Automatic lockdown"
                                ]
                            }
                        }
                    },
                    technical: {
                        requirements: [
                            "Access control",
                            "Audit controls",
                            "Integrity controls",
                            "Transmission security"
                        ],
                        nacControls: {
                            "164.312(a)": {
                                name: "Access Control",
                                requirements: [
                                    "Unique user identification",
                                    "Automatic logoff",
                                    "Encryption and decryption"
                                ],
                                portnoxImplementation: {
                                    uniqueUserId: "SSO integration with MFA",
                                    automaticLogoff: "Policy-based session management",
                                    encryption: "Automatic VPN/encryption enforcement",
                                    complianceScore: 99
                                }
                            },
                            "164.312(b)": {
                                name: "Audit Controls",
                                portnoxImplementation: {
                                    logging: "Comprehensive PHI access logs",
                                    monitoring: "Real-time anomaly detection",
                                    retention: "Automated 6-year retention"
                                }
                            }
                        }
                    }
                }
            }
        },
        
        penalties: {
            tiers: [
                {
                    level: 1,
                    description: "Unknowing violation",
                    minPerViolation: 100,
                    maxPerViolation: 50000,
                    annualMax: 1500000
                },
                {
                    level: 2,
                    description: "Reasonable cause",
                    minPerViolation: 1000,
                    maxPerViolation: 100000,
                    annualMax: 1500000
                },
                {
                    level: 3,
                    description: "Willful neglect - corrected",
                    minPerViolation: 10000,
                    maxPerViolation: 250000,
                    annualMax: 1500000
                },
                {
                    level: 4,
                    description: "Willful neglect - not corrected",
                    minPerViolation: 50000,
                    maxPerViolation: 1500000,
                    annualMax: 1500000
                }
            ],
            criminal: {
                maxPrison: "10 years",
                maxFine: 250000,
                for: "Intent to sell PHI"
            }
        },
        
        breachNotification: {
            timeline: {
                individuals: "60 days",
                hhs: "60 days",
                media: "60 days (if >500 affected)"
            },
            nacPrevention: {
                detection: "Real-time with Portnox",
                response: "Automated containment",
                forensics: "Complete audit trail"
            }
        },
        
        businessAssociates: {
            requirements: [
                "Written agreements",
                "Security assurances",
                "Breach notification"
            ],
            nacIntegration: {
                vendorAccess: "Controlled third-party access",
                monitoring: "BA activity tracking",
                compliance: "Automated BA validation"
            }
        }
    },
    
    // PCI-DSS Framework
    pciDss: {
        id: "pci-dss",
        name: "Payment Card Industry Data Security Standard",
        version: "4.0",
        category: "Financial",
        description: "Security standard for organizations handling credit cards",
        effectiveDate: "2024-03-31",
        
        requirements: {
            "1": {
                title: "Install and Maintain Network Security Controls",
                objective: "Protect cardholder data with network security controls",
                
                subrequirements: {
                    "1.1": {
                        description: "Processes and mechanisms for network security controls",
                        nacMapping: {
                            implementation: "Network segmentation and microsegmentation",
                            portnoxFeatures: [
                                "Dynamic VLANs",
                                "Automated firewall rules",
                                "Zero Trust networking"
                            ]
                        }
                    },
                    "1.2": {
                        description: "Network security controls configured and maintained",
                        nacMapping: {
                            implementation: "Policy-based network control",
                            portnoxFeatures: [
                                "Continuous configuration monitoring",
                                "Automated remediation",
                                "Change tracking"
                            ]
                        }
                    }
                }
            },
            "2": {
                title: "Apply Secure Configurations",
                objective: "Prevent unauthorized access via default settings",
                
                subrequirements: {
                    "2.1": {
                        description: "Processes and mechanisms for secure configurations",
                        nacMapping: {
                            implementation: "Device hardening and compliance",
                            portnoxFeatures: [
                                "Configuration compliance checking",
                                "Automated baseline enforcement",
                                "Non-compliant device quarantine"
                            ],
                            automationLevel: 92
                        }
                    }
                }
            },
            "3": {
                title: "Protect Stored Account Data",
                objective: "Protection methods include encryption, truncation, masking, and hashing",
                
                subrequirements: {
                    "3.1": {
                        description: "Processes and mechanisms for protecting stored account data",
                        nacMapping: {
                            implementation: "Data discovery and protection",
                            portnoxFeatures: [
                                "Automated data discovery",
                                "Encryption policy enforcement",
                                "Access control to sensitive data"
                            ]
                        }
                    },
                    "3.4": {
                        description: "PAN is rendered unreadable anywhere it is stored",
                        nacMapping: {
                            implementation: "Encryption and access control",
                            portnoxFeatures: [
                                "Storage encryption verification",
                                "Key management integration",
                                "Cryptographic controls"
                            ]
                        }
                    }
                }
            },
            "7": {
                title: "Restrict Access to System Components and Cardholder Data",
                objective: "Ensure critical data can only be accessed by authorized personnel",
                
                subrequirements: {
                    "7.1": {
                        description: "Processes and mechanisms for restricting access",
                        nacMapping: {
                            implementation: "Zero Trust access control",
                            portnoxFeatures: [
                                "Role-based access control",
                                "Need-to-know enforcement",
                                "Dynamic authorization"
                            ],
                            automationLevel: 98
                        }
                    },
                    "7.2": {
                        description: "Access to system components and cardholder data is appropriately defined and assigned",
                        nacMapping: {
                            implementation: "Automated access provisioning",
                            portnoxFeatures: [
                                "Identity lifecycle management",
                                "Automated access reviews",
                                "Privilege attestation"
                            ]
                        }
                    }
                }
            },
            "8": {
                title: "Identify Users and Authenticate Access",
                objective: "Assigning a unique ID to each person ensures accountability",
                
                subrequirements: {
                    "8.1": {
                        description: "Processes and mechanisms for identifying and authenticating users",
                        nacMapping: {
                            implementation: "Strong authentication enforcement",
                            portnoxFeatures: [
                                "Multi-factor authentication",
                                "Certificate-based auth",
                                "Biometric integration"
                            ]
                        }
                    },
                    "8.2": {
                        description: "User identification and authentication is managed",
                        nacMapping: {
                            implementation: "Identity governance",
                            portnoxFeatures: [
                                "Password policy enforcement",
                                "Account lockout policies",
                                "Session management"
                            ]
                        }
                    },
                    "8.3": {
                        description: "Strong authentication is established and managed",
                        nacMapping: {
                            implementation: "MFA everywhere",
                            portnoxFeatures: [
                                "Risk-based authentication",
                                "Adaptive MFA",
                                "Passwordless options"
                            ],
                            compliance: 100
                        }
                    }
                }
            },
            "10": {
                title: "Log and Monitor All Access",
                objective: "Logging mechanisms and tracking user activities are critical",
                
                subrequirements: {
                    "10.1": {
                        description: "Processes and mechanisms for logging and monitoring",
                        nacMapping: {
                            implementation: "Comprehensive audit logging",
                            portnoxFeatures: [
                                "All access logged",
                                "Tamper-proof logs",
                                "Real-time monitoring"
                            ],
                            retention: "12 months minimum"
                        }
                    },
                    "10.2": {
                        description: "Audit logs are implemented to support detection",
                        nacMapping: {
                            implementation: "Security event logging",
                            portnoxFeatures: [
                                "User identification",
                                "Event type and timestamp",
                                "Success/failure indication",
                                "Origination details"
                            ]
                        }
                    }
                }
            },
            "11": {
                title: "Test Security of Systems and Networks Regularly",
                objective: "Vulnerabilities are continually discovered and introduced",
                
                subrequirements: {
                    "11.1": {
                        description: "Processes for regularly testing security",
                        nacMapping: {
                            implementation: "Continuous security assessment",
                            portnoxFeatures: [
                                "Automated vulnerability scanning",
                                "Penetration test support",
                                "Security posture tracking"
                            ]
                        }
                    },
                    "11.5": {
                        description: "Network intrusions are detected and responded to",
                        nacMapping: {
                            implementation: "Real-time threat detection",
                            portnoxFeatures: [
                                "Anomaly detection",
                                "Behavioral analysis",
                                "Automated response"
                            ],
                            mttr: "< 15 minutes"
                        }
                    }
                }
            },
            "12": {
                title: "Support Information Security with Organizational Policies",
                objective: "Strong security policies set the tone for the entire organization",
                
                subrequirements: {
                    "12.1": {
                        description: "Information security policy is established and maintained",
                        nacMapping: {
                            implementation: "Policy automation and enforcement",
                            portnoxFeatures: [
                                "Policy templates",
                                "Automated distribution",
                                "Acknowledgment tracking"
                            ]
                        }
                    }
                }
            }
        },
        
        scopeReduction: {
            withoutNAC: {
                systemsInScope: "100%",
                annualAuditCost: 250000,
                complianceEffort: 2000, // hours
                riskExposure: "High"
            },
            withPortnox: {
                systemsInScope: "20%",
                annualAuditCost: 50000,
                complianceEffort: 200,
                riskExposure: "Low",
                benefits: {
                    costReduction: 200000,
                    effortReduction: 90,
                    riskReduction: 85
                }
            }
        },
        
        merchantLevels: {
            "1": {
                transactions: "> 6 million annually",
                requirements: "Annual onsite audit",
                cost: 100000,
                portnoxBenefit: "Automated evidence collection"
            },
            "2": {
                transactions: "1-6 million annually",
                requirements: "Annual self-assessment",
                cost: 50000,
                portnoxBenefit: "Continuous compliance monitoring"
            },
            "3": {
                transactions: "20K-1M annually",
                requirements: "Annual self-assessment",
                cost: 25000,
                portnoxBenefit: "Simplified reporting"
            },
            "4": {
                transactions: "< 20K annually",
                requirements: "Annual self-assessment",
                cost: 10000,
                portnoxBenefit: "Automated compliance"
            }
        },
        
        penalties: {
            nonCompliance: {
                finesPerMonth: {
                    min: 5000,
                    max: 100000
                },
                increasedTransactionFees: "0.5-1%",
                potentialCardBrandRemoval: true
            },
            breach: {
                forensicInvestigation: 200000,
                cardReissuance: 5, // per card
                brandFines: {
                    min: 50000,
                    max: 500000
                },
                reputationDamage: "60% customer loss"
            }
        }
    },
    
    // GDPR Framework
    gdpr: {
        id: "gdpr",
        name: "General Data Protection Regulation",
        category: "Privacy",
        description: "EU regulation on data protection and privacy",
        regulatoryBody: "European Data Protection Board",
        effectiveDate: "2018-05-25",
        
        principles: {
            lawfulness: {
                article: "Article 5(1)(a)",
                description: "Personal data shall be processed lawfully, fairly and transparently",
                nacMapping: {
                    requirement: "Ensure lawful access to personal data",
                    implementation: "Policy-based access control with legal basis validation",
                    portnoxFeatures: [
                        "Consent management integration",
                        "Purpose limitation enforcement",
                        "Access justification logging"
                    ]
                }
            },
            purposeLimitation: {
                article: "Article 5(1)(b)",
                description: "Collected for specified, explicit and legitimate purposes",
                nacMapping: {
                    requirement: "Limit access based on purpose",
                    implementation: "Context-aware access control",
                    portnoxFeatures: [
                        "Purpose-based policies",
                        "Data classification",
                        "Use case validation"
                    ]
                }
            },
            dataMinimization: {
                article: "Article 5(1)(c)",
                description: "Adequate, relevant and limited to what is necessary",
                nacMapping: {
                    requirement: "Minimize data access",
                    implementation: "Least privilege access enforcement",
                    portnoxFeatures: [
                        "Attribute-based access",
                        "Dynamic data filtering",
                        "Need-to-know validation"
                    ]
                }
            },
            accuracy: {
                article: "Article 5(1)(d)",
                description: "Accurate and, where necessary, kept up to date",
                nacMapping: {
                    requirement: "Maintain accurate access records",
                    implementation: "Automated identity lifecycle management",
                    portnoxFeatures: [
                        "Real-time updates",
                        "Data quality checks",
                        "Audit trails"
                    ]
                }
            },
            storageLimitation: {
                article: "Article 5(1)(e)",
                description: "Kept for no longer than necessary",
                nacMapping: {
                    requirement: "Time-limited access",
                    implementation: "Automated access expiration",
                    portnoxFeatures: [
                        "Retention policy enforcement",
                        "Automatic deprovisioning",
                        "Access review cycles"
                    ]
                }
            },
            integritySecurity: {
                article: "Article 5(1)(f)",
                description: "Processed securely including protection against unauthorized processing",
                nacMapping: {
                    requirement: "Ensure data security",
                    implementation: "Comprehensive security controls",
                    portnoxFeatures: [
                        "Encryption enforcement",
                        "Access monitoring",
                        "Threat prevention"
                    ]
                }
            }
        },
        
        rights: {
            access: {
                article: "Article 15",
                description: "Right to access personal data",
                nacImplementation: "Automated access request fulfillment",
                timeline: "1 month"
            },
            rectification: {
                article: "Article 16",
                description: "Right to rectify inaccurate data",
                nacImplementation: "Self-service data correction",
                timeline: "1 month"
            },
            erasure: {
                article: "Article 17",
                description: "Right to be forgotten",
                nacImplementation: "Automated data deletion workflows",
                timeline: "1 month"
            },
            portability: {
                article: "Article 20",
                description: "Right to data portability",
                nacImplementation: "Automated data export",
                timeline: "1 month"
            }
        },
        
        securityRequirements: {
            article25: {
                title: "Data protection by design and by default",
                requirements: [
                    "Implement appropriate technical measures",
                    "Integrate data protection into processing activities",
                    "Ensure only necessary data is processed"
                ],
                nacMapping: {
                    byDesign: {
                        implementation: "Zero Trust architecture",
                        features: [
                            "Privacy-first design",
                            "Minimal data exposure",
                            "Default encryption"
                        ]
                    },
                    byDefault: {
                        implementation: "Secure default configurations",
                        features: [
                            "Least privilege defaults",
                            "Automatic security hardening",
                            "Privacy settings enforcement"
                        ]
                    }
                }
            },
            article32: {
                title: "Security of processing",
                requirements: [
                    "Implement appropriate security measures",
                    "Ensure ongoing confidentiality, integrity, availability",
                    "Regular testing and evaluation"
                ],
                nacMapping: {
                    technicalMeasures: {
                        implementation: "Comprehensive security controls",
                        features: [
                            "Encryption at rest and in transit",
                            "Access control and authentication",
                            "Network segmentation"
                        ]
                    },
                    organizationalMeasures: {
                        implementation: "Security governance",
                        features: [
                            "Policy automation",
                            "Training tracking",
                            "Incident response"
                        ]
                    }
                }
            },
            article33: {
                title: "Breach notification to supervisory authority",
                requirement: "Notify within 72 hours",
                nacMapping: {
                    detection: {
                        implementation: "Real-time breach detection",
                        portnoxCapability: "< 1 hour detection",
                        features: [
                            "AI anomaly detection",
                            "Automated classification",
                            "Instant alerting"
                        ]
                    },
                    notification: {
                        implementation: "Automated notification workflows",
                        features: [
                            "Pre-built templates",
                            "Automatic documentation",
                            "Escalation procedures"
                        ]
                    }
                }
            }
        },
        
        penalties: {
            tiers: {
                lower: {
                    maxFine: 10000000,
                    percentageOfRevenue: 2,
                    violations: [
                        "Failure to implement data protection by design",
                        "Non-compliant processing of children's data",
                        "Failure to notify breach"
                    ]
                },
                upper: {
                    maxFine: 20000000,
                    percentageOfRevenue: 4,
                    violations: [
                        "Basic principles violations",
                        "Rights infringement",
                        "Unlawful data transfers"
                    ]
                }
            },
            factors: [
                "Nature, gravity and duration",
                "Intentional or negligent",
                "Mitigation actions taken",
                "Previous infringements",
                "Cooperation with authority"
            ]
        },
        
        businessImpact: {
            compliance: {
                initialAssessment: 150000,
                ongoingCompliance: 100000,
                withPortnox: 25000,
                savings: 225000
            },
            breachCosts: {
                average: 4240000,
                perRecord: 150,
                reputationDamage: 35 // percentage customer loss
            },
            operational: {
                dataSubjectRequests: {
                    averagePerYear: 1000,
                    costPerRequest: 500,
                    withPortnoxAutomation: 50,
                    savings: 450000
                }
            }
        }
    },
    
    // ISO 27001 Framework
    iso27001: {
        id: "iso27001",
        name: "ISO/IEC 27001:2022",
        category: "Information Security",
        description: "International standard for information security management systems",
        certificationBody: "Accredited certification bodies",
        version: "2022",
        
        clauses: {
            "4": {
                title: "Context of the organization",
                requirements: [
                    "Understanding the organization and its context",
                    "Understanding stakeholder needs",
                    "Determining ISMS scope"
                ]
            },
            "5": {
                title: "Leadership",
                requirements: [
                    "Leadership and commitment",
                    "Policy establishment",
                    "Roles and responsibilities"
                ]
            },
            "6": {
                title: "Planning",
                requirements: [
                    "Risk assessment",
                    "Risk treatment",
                    "Information security objectives"
                ]
            },
            "7": {
                title: "Support",
                requirements: [
                    "Resources",
                    "Competence",
                    "Awareness",
                    "Communication",
                    "Documented information"
                ]
            },
            "8": {
                title: "Operation",
                requirements: [
                    "Operational planning",
                    "Risk assessment implementation",
                    "Risk treatment implementation"
                ]
            },
            "9": {
                title: "Performance evaluation",
                requirements: [
                    "Monitoring and measurement",
                    "Internal audit",
                    "Management review"
                ]
            },
            "10": {
                title: "Improvement",
                requirements: [
                    "Nonconformity and corrective action",
                    "Continual improvement"
                ]
            }
        },
        
        controls: {
            "A.5": {
                title: "Organizational controls",
                controls: {
                    "A.5.1": {
                        name: "Policies for information security",
                        nacMapping: {
                            implementation: "Policy automation and enforcement",
                            portnoxFeatures: [
                                "Policy templates",
                                "Automated distribution",
                                "Compliance tracking"
                            ]
                        }
                    },
                    "A.5.2": {
                        name: "Information security roles and responsibilities",
                        nacMapping: {
                            implementation: "Role-based access control",
                            portnoxFeatures: [
                                "Role definitions",
                                "Automated provisioning",
                                "Segregation of duties"
                            ]
                        }
                    }
                }
            },
            "A.6": {
                title: "People controls",
                controls: {
                    "A.6.1": {
                        name: "Screening",
                        nacMapping: {
                            implementation: "Identity verification",
                            portnoxFeatures: [
                                "Background check integration",
                                "Identity proofing",
                                "Continuous validation"
                            ]
                        }
                    }
                }
            },
            "A.7": {
                title: "Physical controls",
                controls: {
                    "A.7.1": {
                        name: "Physical security perimeters",
                        nacMapping: {
                            implementation: "Physical-logical convergence",
                            portnoxFeatures: [
                                "Badge system integration",
                                "Location-based policies",
                                "Physical access logs"
                            ]
                        }
                    }
                }
            },
            "A.8": {
                title: "Technological controls",
                controls: {
                    "A.8.1": {
                        name: "User endpoint devices",
                        nacMapping: {
                            implementation: "Device trust and compliance",
                            portnoxFeatures: [
                                "Device profiling",
                                "Compliance checking",
                                "Automated remediation"
                            ],
                            automationLevel: 95
                        }
                    },
                    "A.8.2": {
                        name: "Privileged access rights",
                        nacMapping: {
                            implementation: "Privileged access management",
                            portnoxFeatures: [
                                "Just-in-time access",
                                "Session recording",
                                "Approval workflows"
                            ]
                        }
                    },
                    "A.8.3": {
                        name: "Information access restriction",
                        nacMapping: {
                            implementation: "Zero Trust access control",
                            portnoxFeatures: [
                                "Need-to-know enforcement",
                                "Data classification",
                                "Dynamic authorization"
                            ]
                        }
                    },
                    "A.8.4": {
                        name: "Access to source code",
                        nacMapping: {
                            implementation: "Source code protection",
                            portnoxFeatures: [
                                "Repository access control",
                                "Developer verification",
                                "Code signing"
                            ]
                        }
                    },
                    "A.8.5": {
                        name: "Secure authentication",
                        nacMapping: {
                            implementation: "Strong authentication",
                            portnoxFeatures: [
                                "Multi-factor authentication",
                                "Passwordless options",
                                "Risk-based auth"
                            ]
                        }
                    }
                }
            }
        },
        
        certificationProcess: {
            stages: [
                {
                    stage: "Gap Analysis",
                    duration: "2-4 weeks",
                    portnoxSupport: "Automated gap assessment"
                },
                {
                    stage: "Implementation",
                    duration: "3-6 months",
                    portnoxSupport: "Pre-built ISO controls"
                },
                {
                    stage: "Internal Audit",
                    duration: "1-2 weeks",
                    portnoxSupport: "Automated evidence collection"
                },
                {
                    stage: "Certification Audit",
                    duration: "1-2 weeks",
                    portnoxSupport: "Real-time compliance dashboard"
                }
            ],
            costs: {
                withoutNAC: {
                    implementation: 200000,
                    certification: 50000,
                    annualMaintenance: 100000
                },
                withPortnox: {
                    implementation: 50000,
                    certification: 50000,
                    annualMaintenance: 25000,
                    savings: 225000
                }
            }
        }
    },
    
    // NIST Cybersecurity Framework
    nistCsf: {
        id: "nist-csf",
        name: "NIST Cybersecurity Framework",
        version: "2.0",
        category: "Cybersecurity",
        description: "Framework for improving critical infrastructure cybersecurity",
        developer: "National Institute of Standards and Technology",
        
        functions: {
            identify: {
                id: "ID",
                description: "Develop understanding to manage cybersecurity risk",
                categories: {
                    "ID.AM": {
                        name: "Asset Management",
                        subcategories: {
                            "ID.AM-1": {
                                description: "Physical devices and systems inventoried",
                                nacMapping: {
                                    implementation: "Automated device discovery",
                                    portnoxFeatures: [
                                        "Agentless discovery",
                                        "Real-time inventory",
                                        "Device classification"
                                    ],
                                    completeness: 100
                                }
                            },
                            "ID.AM-2": {
                                description: "Software platforms and applications inventoried",
                                nacMapping: {
                                    implementation: "Application visibility",
                                    portnoxFeatures: [
                                        "Application discovery",
                                        "Version tracking",
                                        "License management"
                                    ]
                                }
                            },
                            "ID.AM-3": {
                                description: "Communication and data flows mapped",
                                nacMapping: {
                                    implementation: "Network flow analysis",
                                    portnoxFeatures: [
                                        "Traffic visualization",
                                        "Dependency mapping",
                                        "Data flow tracking"
                                    ]
                                }
                            }
                        }
                    },
                    "ID.RA": {
                        name: "Risk Assessment",
                        subcategories: {
                            "ID.RA-1": {
                                description: "Asset vulnerabilities identified",
                                nacMapping: {
                                    implementation: "Continuous vulnerability assessment",
                                    portnoxFeatures: [
                                        "Real-time scanning",
                                        "CVE correlation",
                                        "Risk scoring"
                                    ]
                                }
                            }
                        }
                    }
                }
            },
            protect: {
                id: "PR",
                description: "Develop and implement safeguards",
                categories: {
                    "PR.AC": {
                        name: "Identity Management and Access Control",
                        subcategories: {
                            "PR.AC-1": {
                                description: "Identities and credentials managed",
                                nacMapping: {
                                    implementation: "Comprehensive identity management",
                                    portnoxFeatures: [
                                        "Unified identity",
                                        "Credential lifecycle",
                                        "MFA enforcement"
                                    ],
                                    maturityLevel: 5
                                }
                            },
                            "PR.AC-3": {
                                description: "Remote access managed",
                                nacMapping: {
                                    implementation: "Secure remote access",
                                    portnoxFeatures: [
                                        "Zero Trust remote",
                                        "Device validation",
                                        "Encrypted tunnels"
                                    ]
                                }
                            },
                            "PR.AC-4": {
                                description: "Access permissions managed",
                                nacMapping: {
                                    implementation: "Dynamic authorization",
                                    portnoxFeatures: [
                                        "Least privilege",
                                        "Just-in-time access",
                                        "Regular reviews"
                                    ]
                                }
                            },
                            "PR.AC-5": {
                                description: "Network integrity protected",
                                nacMapping: {
                                    implementation: "Network segmentation",
                                    portnoxFeatures: [
                                        "Microsegmentation",
                                        "VLAN automation",
                                        "East-west control"
                                    ]
                                }
                            }
                        }
                    },
                    "PR.DS": {
                        name: "Data Security",
                        subcategories: {
                            "PR.DS-1": {
                                description: "Data-at-rest protected",
                                nacMapping: {
                                    implementation: "Encryption enforcement",
                                    portnoxFeatures: [
                                        "Policy-based encryption",
                                        "Key management",
                                        "Compliance validation"
                                    ]
                                }
                            }
                        }
                    }
                }
            },
            detect: {
                id: "DE",
                description: "Develop and implement activities to identify cybersecurity events",
                categories: {
                    "DE.AE": {
                        name: "Anomalies and Events",
                        subcategories: {
                            "DE.AE-1": {
                                description: "Baseline of network operations established",
                                nacMapping: {
                                    implementation: "Behavioral baselines",
                                    portnoxFeatures: [
                                        "ML-based baselines",
                                        "Normal behavior profiles",
                                        "Deviation detection"
                                    ]
                                }
                            },
                            "DE.AE-2": {
                                description: "Detected events analyzed",
                                nacMapping: {
                                    implementation: "AI-powered analysis",
                                    portnoxFeatures: [
                                        "Automated correlation",
                                        "Threat intelligence",
                                        "Risk scoring"
                                    ]
                                }
                            }
                        }
                    },
                    "DE.CM": {
                        name: "Security Continuous Monitoring",
                        subcategories: {
                            "DE.CM-1": {
                                description: "Network monitored for anomalies",
                                nacMapping: {
                                    implementation: "24/7 network monitoring",
                                    portnoxFeatures: [
                                        "Real-time visibility",
                                        "Anomaly detection",
                                        "Alert generation"
                                    ],
                                    coverage: 100
                                }
                            }
                        }
                    }
                }
            },
            respond: {
                id: "RS",
                description: "Develop and implement activities for detected cybersecurity incidents",
                categories: {
                    "RS.RP": {
                        name: "Response Planning",
                        subcategories: {
                            "RS.RP-1": {
                                description: "Response plan executed",
                                nacMapping: {
                                    implementation: "Automated response",
                                    portnoxFeatures: [
                                        "Playbook automation",
                                        "Instant containment",
                                        "Orchestration"
                                    ]
                                }
                            }
                        }
                    },
                    "RS.AN": {
                        name: "Analysis",
                        subcategories: {
                            "RS.AN-1": {
                                description: "Notifications from detection systems investigated",
                                nacMapping: {
                                    implementation: "Automated investigation",
                                    portnoxFeatures: [
                                        "Root cause analysis",
                                        "Impact assessment",
                                        "Evidence collection"
                                    ]
                                }
                            }
                        }
                    },
                    "RS.MI": {
                        name: "Mitigation",
                        subcategories: {
                            "RS.MI-1": {
                                description: "Incidents contained",
                                nacMapping: {
                                    implementation: "Automatic containment",
                                    portnoxFeatures: [
                                        "Device isolation",
                                        "Access revocation",
                                        "Network quarantine"
                                    ],
                                    responseTime: "< 1 minute"
                                }
                            }
                        }
                    }
                }
            },
            recover: {
                id: "RC",
                description: "Develop and implement activities to maintain resilience",
                categories: {
                    "RC.RP": {
                        name: "Recovery Planning",
                        subcategories: {
                            "RC.RP-1": {
                                description: "Recovery plan executed",
                                nacMapping: {
                                    implementation: "Automated recovery",
                                    portnoxFeatures: [
                                        "Backup restoration",
                                        "Service recovery",
                                        "Normal operations"
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        },
        
        implementationTiers: {
            tier1: {
                name: "Partial",
                characteristics: [
                    "Risk management practices not formalized",
                    "Limited awareness of cyber risk",
                    "Irregular implementation"
                ]
            },
            tier2: {
                name: "Risk Informed",
                characteristics: [
                    "Risk management practices approved but not established",
                    "Cyber risk awareness exists",
                    "Regular implementation"
                ]
            },
            tier3: {
                name: "Repeatable",
                characteristics: [
                    "Risk management practices formally established",
                    "Organization-wide approach",
                    "Consistent implementation"
                ]
            },
            tier4: {
                name: "Adaptive",
                characteristics: [
                    "Risk management practices adaptive",
                    "Continuous improvement",
                    "Advanced cybersecurity"
                ]
            }
        },
        
        profiles: {
            current: {
                description: "Current cybersecurity outcomes",
                assessment: "Where you are today"
            },
            target: {
                description: "Desired cybersecurity outcomes",
                assessment: "Where you want to be"
            }
        }
    },
    
    // Industry-Specific Frameworks
    ferpa: {
        id: "ferpa",
        name: "Family Educational Rights and Privacy Act",
        category: "Education",
        description: "Protects privacy of student education records",
        enforcer: "U.S. Department of Education"
    },
    
    glba: {
        id: "glba",
        name: "Gramm-Leach-Bliley Act",
        category: "Financial",
        description: "Financial services data protection",
        enforcer: "FTC, SEC, Banking Regulators"
    },
    
    ccpa: {
        id: "ccpa",
        name: "California Consumer Privacy Act",
        category: "Privacy",
        description: "California resident privacy rights",
        enforcer: "California Attorney General",
        
        rights: {
            know: {
                description: "Right to know what data is collected",
                nacImplementation: "Data discovery and mapping"
            },
            delete: {
                description: "Right to delete personal information",
                nacImplementation: "Automated deletion workflows"
            },
            optOut: {
                description: "Right to opt-out of data sales",
                nacImplementation: "Consent management"
            },
            nonDiscrimination: {
                description: "Right to non-discrimination",
                nacImplementation: "Equal access enforcement"
            }
        },
        
        penalties: {
            intentional: {
                perViolation: 7500,
                maxPerIncident: "No limit"
            },
            unintentional: {
                perViolation: 2500,
                maxPerIncident: "No limit"
            },
            dataBreaches: {
                statutory: 100750,
                perConsumer: 750
            }
        }
    },
    
    // Additional Global Frameworks
    lgpd: {
        id: "lgpd",
        name: "Lei Geral de Proteção de Dados",
        category: "Privacy",
        description: "Brazilian data protection law",
        similar: "GDPR"
    },
    
    pipeda: {
        id: "pipeda",
        name: "Personal Information Protection and Electronic Documents Act",
        category: "Privacy",
        description: "Canadian privacy law",
        enforcer: "Office of the Privacy Commissioner of Canada"
    },
    
    // Sector-Specific
    nerc_cip: {
        id: "nerc-cip",
        name: "NERC CIP",
        category: "Critical Infrastructure",
        description: "Electric grid cybersecurity standards",
        enforcer: "North American Electric Reliability Corporation"
    },
    
    swift_cscf: {
        id: "swift-cscf",
        name: "SWIFT Customer Security Controls Framework",
        category: "Financial",
        description: "Secure financial messaging",
        enforcer: "SWIFT"
    }
};

// Export for global use
window.ComplianceFrameworks = ComplianceFrameworks;
console.log('✅ Comprehensive Compliance Frameworks loaded');
