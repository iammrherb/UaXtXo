import type { IndustryId } from "@/types/common"

export interface ComplianceRequirement {
  id: string
  name: string
  description: string
  category: "access_control" | "data_protection" | "audit" | "monitoring" | "encryption" | "governance"
  mandatory: boolean
  riskLevel: "low" | "medium" | "high" | "critical"
}

export interface ComplianceStandard {
  id: string
  name: string
  version?: string
  description: string
  applicableIndustries: (IndustryId | "all")[]
  requirements: ComplianceRequirement[]
  certificationRequired: boolean
  auditFrequency: "annual" | "biannual" | "quarterly" | "continuous"
  penaltyRange: {
    min: number
    max: number
    currency: "USD"
  }
}

export const complianceStandards: ComplianceStandard[] = [
  {
    id: "hipaa",
    name: "HIPAA",
    version: "2013",
    description: "Health Insurance Portability and Accountability Act",
    applicableIndustries: ["healthcare", "insurance"],
    certificationRequired: true,
    auditFrequency: "annual",
    penaltyRange: { min: 100, max: 1500000, currency: "USD" },
    requirements: [
      {
        id: "access_control",
        name: "Access Control",
        description: "Implement procedures for granting access to PHI",
        category: "access_control",
        mandatory: true,
        riskLevel: "critical",
      },
      {
        id: "audit_controls",
        name: "Audit Controls",
        description: "Implement hardware, software, and procedural mechanisms for audit",
        category: "audit",
        mandatory: true,
        riskLevel: "high",
      },
      {
        id: "integrity",
        name: "Integrity",
        description: "PHI must not be improperly altered or destroyed",
        category: "data_protection",
        mandatory: true,
        riskLevel: "critical",
      },
      {
        id: "transmission_security",
        name: "Transmission Security",
        description: "Guard against unauthorized access to PHI during transmission",
        category: "encryption",
        mandatory: true,
        riskLevel: "high",
      },
    ],
  },
  {
    id: "pci_dss",
    name: "PCI-DSS",
    version: "4.0",
    description: "Payment Card Industry Data Security Standard",
    applicableIndustries: ["retail", "financial_services", "all"],
    certificationRequired: true,
    auditFrequency: "annual",
    penaltyRange: { min: 5000, max: 100000, currency: "USD" },
    requirements: [
      {
        id: "firewall_configuration",
        name: "Firewall Configuration",
        description: "Install and maintain a firewall configuration",
        category: "access_control",
        mandatory: true,
        riskLevel: "high",
      },
      {
        id: "default_passwords",
        name: "Default Passwords",
        description: "Do not use vendor-supplied defaults for system passwords",
        category: "access_control",
        mandatory: true,
        riskLevel: "critical",
      },
      {
        id: "cardholder_data_protection",
        name: "Cardholder Data Protection",
        description: "Protect stored cardholder data",
        category: "data_protection",
        mandatory: true,
        riskLevel: "critical",
      },
      {
        id: "data_transmission_encryption",
        name: "Data Transmission Encryption",
        description: "Encrypt transmission of cardholder data across open networks",
        category: "encryption",
        mandatory: true,
        riskLevel: "critical",
      },
    ],
  },
  {
    id: "sox",
    name: "SOX",
    version: "2002",
    description: "Sarbanes-Oxley Act",
    applicableIndustries: ["financial_services"],
    certificationRequired: true,
    auditFrequency: "annual",
    penaltyRange: { min: 1000000, max: 25000000, currency: "USD" },
    requirements: [
      {
        id: "internal_controls",
        name: "Internal Controls",
        description: "Establish and maintain internal controls over financial reporting",
        category: "governance",
        mandatory: true,
        riskLevel: "critical",
      },
      {
        id: "audit_trail",
        name: "Audit Trail",
        description: "Maintain comprehensive audit trails for financial systems",
        category: "audit",
        mandatory: true,
        riskLevel: "high",
      },
    ],
  },
  {
    id: "gdpr",
    name: "GDPR",
    version: "2018",
    description: "General Data Protection Regulation",
    applicableIndustries: ["all"],
    certificationRequired: false,
    auditFrequency: "continuous",
    penaltyRange: { min: 10000, max: 20000000, currency: "USD" },
    requirements: [
      {
        id: "data_protection_by_design",
        name: "Data Protection by Design",
        description: "Implement data protection measures from the outset",
        category: "data_protection",
        mandatory: true,
        riskLevel: "high",
      },
      {
        id: "consent_management",
        name: "Consent Management",
        description: "Obtain and manage user consent for data processing",
        category: "governance",
        mandatory: true,
        riskLevel: "medium",
      },
      {
        id: "data_breach_notification",
        name: "Data Breach Notification",
        description: "Notify authorities of data breaches within 72 hours",
        category: "monitoring",
        mandatory: true,
        riskLevel: "critical",
      },
    ],
  },
  {
    id: "iso27001",
    name: "ISO 27001",
    version: "2022",
    description: "Information Security Management Systems",
    applicableIndustries: ["all"],
    certificationRequired: true,
    auditFrequency: "annual",
    penaltyRange: { min: 0, max: 0, currency: "USD" },
    requirements: [
      {
        id: "information_security_policy",
        name: "Information Security Policy",
        description: "Establish and maintain information security policies",
        category: "governance",
        mandatory: true,
        riskLevel: "medium",
      },
      {
        id: "access_control_management",
        name: "Access Control Management",
        description: "Control access to information and information processing facilities",
        category: "access_control",
        mandatory: true,
        riskLevel: "high",
      },
      {
        id: "cryptography",
        name: "Cryptography",
        description: "Ensure proper and effective use of cryptography",
        category: "encryption",
        mandatory: true,
        riskLevel: "high",
      },
    ],
  },
  {
    id: "soc2",
    name: "SOC 2",
    version: "2017",
    description: "Service Organization Control 2",
    applicableIndustries: ["technology", "financial_services", "healthcare"],
    certificationRequired: true,
    auditFrequency: "annual",
    penaltyRange: { min: 0, max: 0, currency: "USD" },
    requirements: [
      {
        id: "security_controls",
        name: "Security Controls",
        description: "Implement controls to protect against unauthorized access",
        category: "access_control",
        mandatory: true,
        riskLevel: "high",
      },
      {
        id: "availability_controls",
        name: "Availability Controls",
        description: "Ensure system availability and performance",
        category: "monitoring",
        mandatory: true,
        riskLevel: "medium",
      },
      {
        id: "processing_integrity",
        name: "Processing Integrity",
        description: "Ensure system processing is complete, valid, accurate, timely, and authorized",
        category: "data_protection",
        mandatory: true,
        riskLevel: "high",
      },
      {
        id: "confidentiality_controls",
        name: "Confidentiality Controls",
        description: "Protect confidential information during processing, storage, and transmission",
        category: "encryption",
        mandatory: false,
        riskLevel: "high",
      },
      {
        id: "privacy_controls",
        name: "Privacy Controls",
        description: "Protect personal information in accordance with privacy commitments",
        category: "data_protection",
        mandatory: false,
        riskLevel: "medium",
      },
    ],
  },
  {
    id: "fedramp",
    name: "FedRAMP",
    version: "2022",
    description: "Federal Risk and Authorization Management Program",
    applicableIndustries: ["government", "technology"],
    certificationRequired: true,
    auditFrequency: "annual",
    penaltyRange: { min: 0, max: 0, currency: "USD" },
    requirements: [
      {
        id: "continuous_monitoring",
        name: "Continuous Monitoring",
        description: "Implement continuous monitoring of security controls",
        category: "monitoring",
        mandatory: true,
        riskLevel: "critical",
      },
      {
        id: "incident_response",
        name: "Incident Response",
        description: "Establish incident response procedures",
        category: "governance",
        mandatory: true,
        riskLevel: "high",
      },
      {
        id: "boundary_protection",
        name: "Boundary Protection",
        description: "Monitor and control communications at external boundaries",
        category: "access_control",
        mandatory: true,
        riskLevel: "high",
      },
    ],
  },
  {
    id: "nerc_cip",
    name: "NERC CIP",
    version: "2023",
    description: "North American Electric Reliability Corporation Critical Infrastructure Protection",
    applicableIndustries: ["energy_utilities"],
    certificationRequired: true,
    auditFrequency: "annual",
    penaltyRange: { min: 25000, max: 1000000, currency: "USD" },
    requirements: [
      {
        id: "cyber_security_controls",
        name: "Cyber Security Controls",
        description: "Implement cyber security controls for critical cyber assets",
        category: "access_control",
        mandatory: true,
        riskLevel: "critical",
      },
      {
        id: "personnel_training",
        name: "Personnel Training",
        description: "Provide cyber security training for personnel",
        category: "governance",
        mandatory: true,
        riskLevel: "medium",
      },
      {
        id: "incident_reporting",
        name: "Incident Reporting",
        description: "Report cyber security incidents to appropriate authorities",
        category: "monitoring",
        mandatory: true,
        riskLevel: "high",
      },
    ],
  },
  {
    id: "ferpa",
    name: "FERPA",
    version: "1974",
    description: "Family Educational Rights and Privacy Act",
    applicableIndustries: ["education"],
    certificationRequired: false,
    auditFrequency: "annual",
    penaltyRange: { min: 0, max: 0, currency: "USD" },
    requirements: [
      {
        id: "educational_record_protection",
        name: "Educational Record Protection",
        description: "Protect the privacy of student educational records",
        category: "data_protection",
        mandatory: true,
        riskLevel: "high",
      },
      {
        id: "directory_information",
        name: "Directory Information",
        description: "Control disclosure of directory information",
        category: "access_control",
        mandatory: true,
        riskLevel: "medium",
      },
    ],
  },
]

export function getComplianceStandardById(id: string): ComplianceStandard | undefined {
  return complianceStandards.find((standard) => standard.id === id)
}

export const complianceStandardsList = complianceStandards
