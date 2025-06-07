// Comprehensive Compliance Framework and NAC Control Mapping
window.ComplianceNACMapping = {
    // Major compliance frameworks with NAC-relevant controls
    frameworks: {
        // Healthcare Frameworks
        HIPAA: {
            name: "Health Insurance Portability and Accountability Act",
            category: "Healthcare",
            nacControls: {
                "164.308(a)(1)": "Access Control - User identification and authentication",
                "164.308(a)(3)": "Workforce Access Management",
                "164.308(a)(4)": "Access Authorization and Modification",
                "164.308(a)(5)": "Log-in Monitoring and Password Management",
                "164.310(a)(1)": "Facility Access Controls",
                "164.310(b)": "Workstation Use Controls",
                "164.310(c)": "Workstation Security",
                "164.312(a)(1)": "Access Control - Unique User Identification",
                "164.312(a)(2)": "Automatic Logoff",
                "164.312(b)": "Audit Controls",
                "164.312(d)": "Person or Entity Authentication",
                "164.312(e)(1)": "Transmission Security"
            }
        },
        
        // Financial Services
        "PCI DSS": {
            name: "Payment Card Industry Data Security Standard",
            category: "Financial",
            nacControls: {
                "1.1.2": "Network segmentation controls",
                "1.2": "Build firewall and router configurations",
                "1.3": "Prohibit direct public access",
                "2.1": "Change vendor defaults",
                "2.3": "Encrypt non-console administrative access",
                "7.1": "Limit access to system components",
                "7.2": "Establish access control systems",
                "8.1": "Assign unique IDs to each person",
                "8.2": "Authentication methods",
                "8.3": "Multi-factor authentication",
                "8.5": "User identification and authentication",
                "10.1": "Audit trails for access",
                "10.2": "Automated audit trails",
                "11.1": "Test for wireless access points",
                "11.4": "Use intrusion detection/prevention"
            }
        },
        
        SOX: {
            name: "Sarbanes-Oxley Act",
            category: "Financial",
            nacControls: {
                "404": "Access controls for financial systems",
                "302": "Authentication and authorization",
                "409": "Real-time access monitoring",
                "802": "Audit log requirements"
            }
        },
        
        GLBA: {
            name: "Gramm-Leach-Bliley Act",
            category: "Financial",
            nacControls: {
                "501(b)": "Administrative safeguards",
                "Security Rule": "Access controls",
                "Safeguards Rule": "Authentication requirements"
            }
        },
        
        // Government and Defense
        "NIST 800-53": {
            name: "NIST Special Publication 800-53",
            category: "Government",
            nacControls: {
                "AC-2": "Account Management",
                "AC-3": "Access Enforcement",
                "AC-4": "Information Flow Enforcement",
                "AC-5": "Separation of Duties",
                "AC-6": "Least Privilege",
                "AC-7": "Unsuccessful Logon Attempts",
                "AC-11": "Session Lock",
                "AC-17": "Remote Access",
                "AC-19": "Access Control for Mobile Devices",
                "AC-20": "Use of External Information Systems",
                "AU-2": "Audit Events",
                "AU-3": "Content of Audit Records",
                "AU-12": "Audit Generation",
                "IA-2": "Identification and Authentication",
                "IA-3": "Device Identification and Authentication",
                "IA-4": "Identifier Management",
                "IA-5": "Authenticator Management",
                "IA-8": "Identification and Authentication (Non-Organizational Users)",
                "SC-7": "Boundary Protection",
                "SC-17": "Public Key Infrastructure Certificates"
            }
        },
        
        FedRAMP: {
            name: "Federal Risk and Authorization Management Program",
            category: "Government",
            nacControls: {
                "Low": "125 controls including NAC requirements",
                "Moderate": "325 controls with enhanced NAC",
                "High": "421 controls with strict NAC"
            }
        },
        
        CMMC: {
            name: "Cybersecurity Maturity Model Certification",
            category: "Defense",
            nacControls: {
                "AC.1.001": "Limit system access to authorized users",
                "AC.1.002": "Limit system access to authorized transactions",
                "AC.1.003": "Verify and control external connections",
                "AC.1.004": "Control information flows",
                "AC.2.005": "Provide privacy and security notices",
                "AC.2.006": "Limit use of portable storage devices",
                "AC.2.007": "Employ least privilege",
                "AC.2.008": "Limit unsuccessful logon attempts",
                "AC.2.009": "Privacy and security notices for remote access",
                "AC.2.013": "Monitor and control remote access sessions",
                "AC.2.016": "Control flow of CUI",
                "AC.3.017": "Separate duties of individuals",
                "AC.3.018": "Prevent non-privileged users from executing privileged functions",
                "AC.3.021": "Authorize remote execution of privileged commands",
                "IA.1.076": "Identify information system users",
                "IA.1.077": "Authenticate users",
                "IA.2.078": "Enforce minimum password complexity",
                "IA.2.079": "Prohibit password reuse",
                "IA.2.081": "Store and transmit passwords cryptographically protected",
                "IA.3.083": "Use multifactor authentication",
                "IA.3.084": "Employ replay-resistant authentication"
            }
        },
        
        // Privacy Regulations
        GDPR: {
            name: "General Data Protection Regulation",
            category: "Privacy",
            nacControls: {
                "Article 5": "Principles - Security of Processing",
                "Article 25": "Data Protection by Design",
                "Article 32": "Security of Processing - Access Control",
                "Article 33": "Breach Notification",
                "Article 34": "Communication of Breach"
            }
        },
        
        CCPA: {
            name: "California Consumer Privacy Act",
            category: "Privacy",
            nacControls: {
                "1798.150": "Security Procedures and Practices",
                "Reasonable Security": "Access controls and authentication"
            }
        },
        
        // Industry Standards
        "ISO 27001": {
            name: "ISO/IEC 27001:2022",
            category: "International Standard",
            nacControls: {
                "A.5.15": "Access Control",
                "A.5.16": "Identity Management",
                "A.5.17": "Authentication Information",
                "A.5.18": "Access Rights",
                "A.5.19": "Information Security in Supplier Relationships",
                "A.5.20": "Addressing Information Security within Supplier Agreements",
                "A.8.2": "Privileged Access Rights",
                "A.8.3": "Information Access Restriction",
                "A.8.4": "Access to Source Code",
                "A.8.5": "Secure Authentication",
                "A.8.15": "Logging",
                "A.8.16": "Monitoring Activities",
                "A.8.18": "Use of Privileged Utility Programs"
            }
        },
        
        "SOC 2": {
            name: "Service Organization Control 2",
            category: "Industry Standard",
            nacControls: {
                "CC6.1": "Logical and Physical Access Controls",
                "CC6.2": "Prior to Issuing System Credentials",
                "CC6.3": "Entity Manages Point of Access",
                "CC6.6": "Logical Access Security Measures",
                "CC6.7": "Entity Restricts Access",
                "CC6.8": "Entity Prevents Unauthorized Access",
                "CC7.1": "Entity's System Operations",
                "CC7.2": "Entity Monitors System Components"
            }
        },
        
        // Industry-Specific
        NERC_CIP: {
            name: "NERC Critical Infrastructure Protection",
            category: "Energy/Utilities",
            nacControls: {
                "CIP-004": "Personnel & Training - Access Management",
                "CIP-005": "Electronic Security Perimeters",
                "CIP-006": "Physical Security of BES Cyber Systems",
                "CIP-007": "System Security Management"
            }
        },
        
        TISAX: {
            name: "Trusted Information Security Assessment Exchange",
            category: "Automotive",
            nacControls: {
                "1.1": "Access Control Policy",
                "1.2": "User Access Management",
                "1.3": "User Responsibilities",
                "1.4": "Network Access Control"
            }
        },
        
        SWIFT_CSP: {
            name: "SWIFT Customer Security Programme",
            category: "Financial",
            nacControls: {
                "1.1": "SWIFT Environment Protection",
                "2.1": "Internal Data Flow Security",
                "4.1": "Password Policy",
                "4.2": "Multi-factor Authentication",
                "5.1": "Logical Access Control"
            }
        }
    },
    
    // Industry-specific NAC requirements
    industryRequirements: {
        healthcare: {
            primary: ["HIPAA", "ISO 27001", "SOC 2"],
            secondary: ["NIST 800-53", "GDPR"],
            nacPriorities: [
                "Patient data protection",
                "Medical device security",
                "PHI access control",
                "Audit logging for compliance",
                "Encryption of data in transit"
            ]
        },
        
        finance: {
            primary: ["PCI DSS", "SOX", "GLBA", "ISO 27001"],
            secondary: ["SWIFT CSP", "SOC 2", "NIST CSF"],
            nacPriorities: [
                "Cardholder data environment segmentation",
                "Multi-factor authentication",
                "Privileged access management",
                "Real-time monitoring",
                "Fraud prevention"
            ]
        },
        
        government: {
            primary: ["NIST 800-53", "FedRAMP", "CMMC"],
            secondary: ["ISO 27001", "FIPS 140-2"],
            nacPriorities: [
                "Classified network separation",
                "CAC/PIV authentication",
                "Continuous monitoring",
                "Supply chain security",
                "Zero Trust architecture"
            ]
        },
        
        education: {
            primary: ["FERPA", "COPPA", "CIPA"],
            secondary: ["ISO 27001", "NIST CSF"],
            nacPriorities: [
                "Student data protection",
                "BYOD management",
                "Guest network isolation",
                "Content filtering",
                "Identity federation"
            ]
        },
        
        retail: {
            primary: ["PCI DSS", "CCPA", "GDPR"],
            secondary: ["SOC 2", "ISO 27001"],
            nacPriorities: [
                "POS system security",
                "Customer data protection",
                "Store network segmentation",
                "Vendor access control",
                "IoT device management"
            ]
        },
        
        manufacturing: {
            primary: ["ISO 27001", "TISAX", "NIST CSF"],
            secondary: ["IEC 62443", "SOC 2"],
            nacPriorities: [
                "OT/IT network separation",
                "Industrial control system security",
                "Supply chain partner access",
                "IP protection",
                "Remote access security"
            ]
        },
        
        energy: {
            primary: ["NERC CIP", "ISO 27001", "IEC 62443"],
            secondary: ["NIST CSF", "TSA Pipeline"],
            nacPriorities: [
                "Critical infrastructure protection",
                "SCADA security",
                "Electronic security perimeter",
                "Vendor remote access",
                "Incident response"
            ]
        }
    },
    
    // NAC control categories and their compliance mappings
    nacControlCategories: {
        "Identity and Authentication": {
            description: "User and device identification, authentication methods",
            frameworks: ["All frameworks require this"],
            controls: [
                "802.1X authentication",
                "MAC authentication bypass",
                "Certificate-based authentication",
                "Multi-factor authentication",
                "LDAP/AD integration",
                "SAML/OAuth support"
            ]
        },
        
        "Access Control": {
            description: "Authorization, role-based access, least privilege",
            frameworks: ["HIPAA 164.308", "PCI DSS 7.1-7.2", "NIST AC-2 to AC-6"],
            controls: [
                "Role-based access control (RBAC)",
                "Attribute-based access control (ABAC)",
                "Time-based access restrictions",
                "Location-based access",
                "Device trust levels",
                "Dynamic VLAN assignment"
            ]
        },
        
        "Network Segmentation": {
            description: "Microsegmentation, isolation, secure zones",
            frameworks: ["PCI DSS 1.1.2", "NIST SC-7", "NERC CIP-005"],
            controls: [
                "Dynamic VLAN assignment",
                "Software-defined perimeter",
                "Microsegmentation policies",
                "Guest network isolation",
                "IoT device segregation",
                "Quarantine networks"
            ]
        },
        
        "Device Compliance": {
            description: "Posture assessment, health checks, remediation",
            frameworks: ["HIPAA 164.308(a)(5)", "CMMC AC.2.006", "ISO A.8.1"],
            controls: [
                "Antivirus status check",
                "Patch level verification",
                "Firewall status",
                "Disk encryption check",
                "Registry/file checks",
                "Application inventory"
            ]
        },
        
        "Monitoring and Logging": {
            description: "Audit trails, real-time monitoring, forensics",
            frameworks: ["HIPAA 164.312(b)", "PCI DSS 10.1-10.3", "SOX 404"],
            controls: [
                "Authentication logs",
                "Access attempt logging",
                "Configuration change audit",
                "Anomaly detection",
                "Real-time alerts",
                "Log retention policies"
            ]
        },
        
        "Incident Response": {
            description: "Threat containment, automated response, remediation",
            frameworks: ["GDPR Article 33-34", "NIST IR-4", "CMMC IR.2.092"],
            controls: [
                "Automatic quarantine",
                "Port shutdown",
                "Session termination",
                "Threat containment",
                "Automated remediation",
                "Integration with SIEM/SOAR"
            ]
        }
    },
    
    // Calculate vendor compliance score
    calculateVendorCompliance: function(vendor, framework) {
        let score = 0;
        const frameworkData = this.frameworks[framework];
        if (!frameworkData) return 0;
        
        // Check if vendor explicitly supports framework
        if (vendor.compliance?.frameworks?.includes(framework)) {
            score = 95; // High score for explicit support
        } else {
            // Calculate based on control coverage
            const requiredControls = Object.keys(frameworkData.nacControls).length;
            let supportedControls = 0;
            
            // Map vendor features to controls
            if (vendor.features?.core?.["802.1X Authentication"]) supportedControls += 5;
            if (vendor.features?.core?.["Policy Engine"]) supportedControls += 4;
            if (vendor.features?.core?.["Quarantine"]) supportedControls += 3;
            if (vendor.compliance?.automation > 70) supportedControls += 5;
            if (vendor.compliance?.auditReporting) supportedControls += 3;
            
            score = Math.min(95, (supportedControls / requiredControls) * 100);
        }
        
        return Math.round(score);
    },
    
    // Get industry-specific vendor recommendations
    getIndustryRecommendations: function(industry, vendor) {
        const requirements = this.industryRequirements[industry];
        if (!requirements) return { score: 50, gaps: ["Unknown industry"] };
        
        let score = 0;
        const gaps = [];
        
        // Check primary framework support
        requirements.primary.forEach(framework => {
            const frameworkScore = this.calculateVendorCompliance(vendor, framework);
            if (frameworkScore >= 90) {
                score += 30;
            } else if (frameworkScore >= 70) {
                score += 20;
                gaps.push(`Partial ${framework} support`);
            } else {
                gaps.push(`Missing ${framework} compliance`);
            }
        });
        
        // Check NAC priorities
        requirements.nacPriorities.forEach(priority => {
            // Simple mapping - in production would be more sophisticated
            if (priority.includes("Zero Trust") && vendor.features?.zeroTrust?.native) {
                score += 10;
            } else if (priority.includes("Multi-factor") && vendor.features?.core?.["802.1X Authentication"]) {
                score += 5;
            }
        });
        
        return {
            score: Math.min(100, score),
            gaps: gaps.length > 0 ? gaps : ["Fully compliant"]
        };
    }
};

// Make globally available
window.ComplianceMapping = window.ComplianceNACMapping;
