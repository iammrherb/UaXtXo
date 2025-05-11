/**
 * Industry Data
 * Industry-specific configurations and compliance requirements
 */

const industryData = {
    healthcare: {
        name: "Healthcare",
        description: "Healthcare providers, hospitals, clinics, and medical facilities",
        icon: "fa-hospital",
        averageDevices: 2500,
        complianceFrameworks: ['HIPAA', 'HITECH', 'FDA', 'ISO 27001', 'NIST CSF', 'GDPR', 'SOC 2'],
        securityPriority: "critical",
        riskFactors: {
            dataBreachCost: 4.45, // Million USD
            regulatoryPenalties: 2.1,
            reputationImpact: 9,
            downtime: 8
        },
        specificRequirements: [
            "Medical device connectivity",
            "Patient data protection",
            "Emergency access procedures",
            "Audit trail requirements",
            "Encryption requirements"
        ]
    },
    financial: {
        name: "Financial Services",
        description: "Banks, insurance companies, investment firms, and fintech",
        icon: "fa-university",
        averageDevices: 5000,
        complianceFrameworks: ['PCI DSS', 'SOX', 'GLBA', 'ISO 27001', 'NIST CSF', 'GDPR', 'SOC 2', 'FFIEC', 'FINRA'],
        securityPriority: "critical",
        riskFactors: {
            dataBreachCost: 5.85,
            regulatoryPenalties: 3.5,
            reputationImpact: 10,
            downtime: 9
        },
        specificRequirements: [
            "Transaction security",
            "Customer data protection",
            "Fraud prevention",
            "Real-time monitoring",
            "Multi-factor authentication"
        ]
    },
    retail: {
        name: "Retail",
        description: "Retail stores, e-commerce, hospitality, and consumer services",
        icon: "fa-shopping-cart",
        averageDevices: 1500,
        complianceFrameworks: ['PCI DSS', 'GDPR', 'CCPA', 'ISO 27001', 'SOC 2'],
        securityPriority: "high",
        riskFactors: {
            dataBreachCost: 3.28,
            regulatoryPenalties: 1.2,
            reputationImpact: 7,
            downtime: 7
        },
        specificRequirements: [
            "POS system security",
            "Guest WiFi management",
            "Inventory system access",
            "Mobile device support",
            "Seasonal scaling"
        ]
    },
    education: {
        name: "Education",
        description: "Schools, universities, research institutions, and online learning",
        icon: "fa-graduation-cap",
        averageDevices: 10000,
        complianceFrameworks: ['FERPA', 'COPPA', 'GDPR', 'ISO 27001', 'NIST CSF', 'CIPA'],
        securityPriority: "high",
        riskFactors: {
            dataBreachCost: 3.86,
            regulatoryPenalties: 0.8,
            reputationImpact: 6,
            downtime: 5
        },
        specificRequirements: [
            "Student data protection",
            "BYOD support",
            "Research data security",
            "Content filtering",
            "Remote learning access"
        ]
    },
    government: {
        name: "Government",
        description: "Federal, state, and local government agencies",
        icon: "fa-landmark",
        averageDevices: 3000,
        complianceFrameworks: ['FISMA', 'FedRAMP', 'NIST 800-53', 'NIST 800-171', 'CMMC', 'ITAR', 'StateRAMP'],
        securityPriority: "critical",
        riskFactors: {
            dataBreachCost: 5.25,
            regulatoryPenalties: 2.8,
            reputationImpact: 9,
            downtime: 8
        },
        specificRequirements: [
            "Classified information handling",
            "Security clearance verification",
            "Air-gapped networks",
            "Continuous monitoring",
            "Audit compliance"
        ]
    },
    manufacturing: {
        name: "Manufacturing",
        description: "Industrial manufacturing, supply chain, and logistics",
        icon: "fa-industry",
        averageDevices: 2000,
        complianceFrameworks: ['ISO 27001', 'NIST CSF', 'GDPR', 'SOC 2', 'ISO 9001', 'CMMC', 'IEC 62443'],
        securityPriority: "high",
        riskFactors: {
            dataBreachCost: 4.47,
            regulatoryPenalties: 1.5,
            reputationImpact: 7,
            downtime: 9
        },
        specificRequirements: [
            "OT/IT convergence",
            "Industrial IoT security",
            "Supply chain protection",
            "Production continuity",
            "IP protection"
        ]
    },
    technology: {
        name: "Technology",
        description: "Software companies, IT services, and tech startups",
        icon: "fa-laptop-code",
        averageDevices: 1000,
        complianceFrameworks: ['ISO 27001', 'SOC 2', 'GDPR', 'CCPA', 'NIST CSF', 'ISO 27017', 'ISO 27018'],
        securityPriority: "high",
        riskFactors: {
            dataBreachCost: 5.04,
            regulatoryPenalties: 1.8,
            reputationImpact: 8,
            downtime: 7
        },
        specificRequirements: [
            "Source code protection",
            "Development environment security",
            "Cloud infrastructure access",
            "API security",
            "Remote work support"
        ]
    },
    hospitality: {
        name: "Hospitality",
        description: "Hotels, restaurants, tourism, and entertainment",
        icon: "fa-hotel",
        averageDevices: 800,
        complianceFrameworks: ['PCI DSS', 'GDPR', 'CCPA', 'ISO 27001'],
        securityPriority: "medium",
        riskFactors: {
            dataBreachCost: 2.94,
            regulatoryPenalties: 0.9,
            reputationImpact: 6,
            downtime: 6
        },
        specificRequirements: [
            "Guest WiFi management",
            "POS security",
            "Reservation system access",
            "Mobile check-in support",
            "Seasonal capacity"
        ]
    },
    energy: {
        name: "Energy & Utilities",
        description: "Power generation, utilities, oil & gas",
        icon: "fa-bolt",
        averageDevices: 1500,
        complianceFrameworks: ['NERC CIP', 'ISO 27001', 'NIST CSF', 'IEC 62443', 'TSA Pipeline'],
        securityPriority: "critical",
        riskFactors: {
            dataBreachCost: 4.65,
            regulatoryPenalties: 2.2,
            reputationImpact: 8,
            downtime: 10
        },
        specificRequirements: [
            "Critical infrastructure protection",
            "SCADA system security",
            "Remote site access",
            "Emergency response",
            "Grid security"
        ]
    }
};

// Export for use in other modules
window.industryData = industryData;
