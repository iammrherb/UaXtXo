import type { IndustryId } from "@/types/common"

export interface ComplianceRequirement {
  id: string
  name: string
  description: string
  portnoxFeatureMapping?: string[]
  portnoxCoveragePercent?: number
}

export interface ComplianceStandard {
  id: string
  name: string
  fullName: string
  description: string
  categories: string[]
  applicableIndustries: IndustryId[]
  requirements: ComplianceRequirement[]
}

export const complianceStandardsList: ComplianceStandard[] = [
  {
    id: "hipaa",
    name: "HIPAA",
    fullName: "Health Insurance Portability and Accountability Act",
    description: "US law protecting sensitive patient health information (PHI).",
    categories: ["Data Privacy", "Security", "Breach Notification"],
    applicableIndustries: ["healthcare", "insurance", "technology"],
    requirements: [
      {
        id: "phi_access_control",
        name: "PHI Access Control",
        description:
          "Implement technical policies and procedures for electronic information systems that maintain electronic protected health information to allow access only to those persons or software programs that have been granted access rights.",
        portnoxCoveragePercent: 95,
      },
      {
        id: "audit_controls",
        name: "Audit Controls",
        description:
          "Implement hardware, software, and/or procedural mechanisms that record and examine activity in information systems that contain or use electronic protected health information.",
        portnoxCoveragePercent: 90,
      },
    ],
  },
  {
    id: "pci_dss",
    name: "PCI-DSS",
    fullName: "Payment Card Industry Data Security Standard",
    description: "Security standards for organizations that handle branded credit cards.",
    categories: ["Payment Security", "Network Security", "Data Protection"],
    applicableIndustries: ["financial_services", "retail", "technology", "telecommunications"],
    requirements: [
      {
        id: "firewall_config",
        name: "Firewall Configuration",
        description: "Install and maintain a firewall configuration to protect cardholder data.",
        portnoxCoveragePercent: 85,
      },
      {
        id: "secure_passwords",
        name: "Secure Passwords",
        description: "Do not use vendor-supplied defaults for system passwords and other security parameters.",
        portnoxCoveragePercent: 90,
      },
    ],
  },
  {
    id: "sox",
    name: "SOX",
    fullName: "Sarbanes-Oxley Act",
    description: "US law to protect investors from fraudulent accounting activities by corporations.",
    categories: ["Financial Reporting", "Internal Controls", "Corporate Governance"],
    applicableIndustries: ["financial_services", "technology"],
    requirements: [
      {
        id: "internal_controls_report",
        name: "Internal Controls Report",
        description:
          "Section 302 requires principal officers to certify the accuracy of their financial reports and the effectiveness of internal controls.",
        portnoxCoveragePercent: 80,
      },
    ],
  },
  {
    id: "gdpr",
    name: "GDPR",
    fullName: "General Data Protection Regulation",
    description:
      "EU regulation on data protection and privacy for all individuals within the European Union and the European Economic Area.",
    categories: ["Data Privacy", "Data Protection", "Consent Management"],
    applicableIndustries: [
      "technology",
      "retail",
      "financial_services",
      "healthcare",
      "education",
      "manufacturing",
      "telecommunications",
      "legal_services",
      "insurance",
    ],
    requirements: [
      {
        id: "data_subject_rights",
        name: "Data Subject Rights",
        description: "Uphold rights such as access, rectification, erasure, and data portability.",
        portnoxCoveragePercent: 75,
      },
      {
        id: "data_breach_notification_gdpr",
        name: "Data Breach Notification (GDPR)",
        description: "Notify supervisory authorities of data breaches within 72 hours.",
        portnoxCoveragePercent: 95,
      },
    ],
  },
  {
    id: "iso27001",
    name: "ISO 27001",
    fullName: "ISO/IEC 27001 – Information security management",
    description: "International standard for information security management systems (ISMS).",
    categories: ["Information Security", "Risk Management", "ISMS"],
    applicableIndustries: [
      "technology",
      "financial_services",
      "healthcare",
      "manufacturing",
      "government",
      "telecommunications",
    ],
    requirements: [
      {
        id: "isms_establishment",
        name: "ISMS Establishment",
        description: "Establish, implement, maintain, and continually improve an ISMS.",
        portnoxCoveragePercent: 85,
      },
      {
        id: "risk_assessment_treatment",
        name: "Risk Assessment and Treatment",
        description: "Conduct information security risk assessments and select appropriate risk treatment options.",
        portnoxCoveragePercent: 90,
      },
    ],
  },
]

export const getComplianceStandardById = (id: string): ComplianceStandard | undefined => {
  return complianceStandardsList.find((standard) => standard.id === id)
}
