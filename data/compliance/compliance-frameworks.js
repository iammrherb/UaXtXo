/**
 * Compliance Frameworks Data
 * Contains details about compliance frameworks and NAC requirements
 */
const ComplianceFrameworks = {
    // Framework definitions with NAC requirements
    frameworks: {
        hipaa: {
            name: "HIPAA",
            description: "Health Insurance Portability and Accountability Act requires safeguards for protected health information (PHI).",
            nacRequirements: "Network segmentation to separate systems with ePHI, multi-factor authentication for access to systems with ePHI, detailed audit trails, and automated compliance monitoring.",
            applicableIndustries: ["healthcare", "other"]
        },
        pci: {
            name: "PCI DSS",
            description: "Payment Card Industry Data Security Standard protects cardholder data with specific security requirements.",
            nacRequirements: "Network segmentation for cardholder data environments, secure authentication including MFA, tracking and monitoring all access to network resources, and regular testing of security systems.",
            applicableIndustries: ["retail", "hospitality", "financial", "healthcare", "education", "other"]
        },
        gdpr: {
            name: "GDPR",
            description: "General Data Protection Regulation governs data protection and privacy in the EU with global implications.",
            nacRequirements: "Appropriate technical measures to secure personal data, strong authentication mechanisms, detailed logs of access activities, and data access controls.",
            applicableIndustries: ["all"]
        },
        cmmc: {
            name: "CMMC 2.0",
            description: "Cybersecurity Maturity Model Certification is required for Defense Industrial Base contractors.",
            nacRequirements: "Limit system access to authorized users and devices, multi-factor authentication for all network access, monitor and control remote access sessions.",
            applicableIndustries: ["government", "manufacturing", "technology", "other"]
        },
        glba: {
            name: "GLBA",
            description: "Gramm-Leach-Bliley Act requires financial institutions to protect customer data.",
            nacRequirements: "Multi-factor authentication for remote access and privileged accounts, review of access privileges for users with sensitive data access, continuous monitoring of network access.",
            applicableIndustries: ["financial", "other"]
        },
        fedramp: {
            name: "FedRAMP",
            description: "Federal Risk and Authorization Management Program standardizes cloud security for government.",
            nacRequirements: "Secure network access controls aligned with NIST guidelines, zero-trust architecture implementation, continuous monitoring of network access.",
            applicableIndustries: ["government", "technology", "other"]
        },
        ferpa: {
            name: "FERPA",
            description: "Family Educational Rights and Privacy Act protects student education records.",
            nacRequirements: "Protection of student data, separation of administrative and student networks, controlled access to education records.",
            applicableIndustries: ["education", "other"]
        },
        nist: {
            name: "NIST CSF",
            description: "National Institute of Standards and Technology Cybersecurity Framework provides security guidelines.",
            nacRequirements: "Implement identification and authentication controls, access control policies, continuous monitoring, and network segmentation.",
            applicableIndustries: ["all"]
        },
        nist800171: {
            name: "NIST 800-171",
            description: "Protecting Controlled Unclassified Information in non-federal systems.",
            nacRequirements: "Limit system access to authorized users, control the flow of CUI, employ principle of least privilege, limit unsuccessful logon attempts.",
            applicableIndustries: ["government", "manufacturing", "technology", "other"]
        },
        iso27001: {
            name: "ISO 27001",
            description: "International standard for information security management systems.",
            nacRequirements: "Access control policy, user registration and deregistration, secure log-on procedures, network controls and segregation.",
            applicableIndustries: ["all"]
        }
    },
    
    // Get framework by ID
    getFramework: function(id) {
        return this.frameworks[id] || null;
    },
    
    // Get frameworks applicable to an industry
    getFrameworksForIndustry: function(industry) {
        const result = [];
        
        for (const [id, framework] of Object.entries(this.frameworks)) {
            if (framework.applicableIndustries.includes(industry) || framework.applicableIndustries.includes("all")) {
                result.push({
                    id,
                    ...framework
                });
            }
        }
        
        return result;
    }
};
