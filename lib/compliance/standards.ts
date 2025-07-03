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

export const complianceStandards: { [key: string]: ComplianceStandard } = {
  hipaa: {
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
  pci_dss: {
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
  soc2: {
    id: "soc2",
    name: "SOC 2",
    description: "System and Organization Controls 2",
    applicableIndustries: ["all"],
    certificationRequired: true,
    auditFrequency: "biannual",
    penaltyRange: { min: 5000, max: 100000, currency: "USD" },
    requirements: [],
  },
  iso27001: {
    id: "iso27001",
    name: "ISO 27001",
    description: "Information Security Management",
    applicableIndustries: ["all"],
    certificationRequired: true,
    auditFrequency: "annual",
    penaltyRange: { min: 10000, max: 200000, currency: "USD" },
    requirements: [],
  },
  // Other standards omitted for brevity but assume they are here
}
