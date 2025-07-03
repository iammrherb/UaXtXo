export interface ComplianceStandard {
  id: string
  name: string
  description: string
  category: "security" | "privacy" | "financial" | "healthcare" | "government"
  applicableIndustries: string[]
  requirements: ComplianceRequirement[]
  severity: "low" | "medium" | "high" | "critical"
  lastUpdated: string
}

export interface ComplianceRequirement {
  id: string
  name: string
  description: string
  category: string
  mandatory: boolean
  riskLevel: number
  implementationCost: number
  timeToImplement: string
  validationMethod: string
}

export const complianceStandards: ComplianceStandard[] = [
  {
    id: "soc2",
    name: "SOC 2",
    description:
      "Service Organization Control 2 - Security, Availability, Processing Integrity, Confidentiality, Privacy",
    category: "security",
    applicableIndustries: ["all"],
    severity: "high",
    lastUpdated: "2024-01-01",
    requirements: [
      {
        id: "soc2-cc6.1",
        name: "Logical and Physical Access Controls",
        description:
          "The entity implements logical and physical access controls to protect against threats from sources outside its system boundaries",
        category: "access_control",
        mandatory: true,
        riskLevel: 8,
        implementationCost: 25000,
        timeToImplement: "3-6 months",
        validationMethod: "audit",
      },
      {
        id: "soc2-cc6.2",
        name: "System Access Monitoring",
        description:
          "Prior to issuing system credentials and granting system access, the entity registers and authorizes new internal and external users",
        category: "monitoring",
        mandatory: true,
        riskLevel: 7,
        implementationCost: 15000,
        timeToImplement: "2-4 months",
        validationMethod: "audit",
      },
    ],
  },
  {
    id: "iso27001",
    name: "ISO 27001",
    description: "International standard for information security management systems",
    category: "security",
    applicableIndustries: ["all"],
    severity: "high",
    lastUpdated: "2024-01-01",
    requirements: [
      {
        id: "iso27001-a5.1",
        name: "Information Security Policies",
        description:
          "A set of policies for information security shall be defined, approved by management, published and communicated to employees and relevant external parties",
        category: "governance",
        mandatory: true,
        riskLevel: 6,
        implementationCost: 10000,
        timeToImplement: "1-3 months",
        validationMethod: "certification",
      },
    ],
  },
  {
    id: "hipaa",
    name: "HIPAA",
    description: "Health Insurance Portability and Accountability Act",
    category: "healthcare",
    applicableIndustries: ["healthcare", "insurance"],
    severity: "critical",
    lastUpdated: "2024-01-01",
    requirements: [
      {
        id: "hipaa-164.312",
        name: "Technical Safeguards",
        description: "Implement technical policies and procedures for electronic information systems that maintain PHI",
        category: "technical",
        mandatory: true,
        riskLevel: 9,
        implementationCost: 50000,
        timeToImplement: "6-12 months",
        validationMethod: "assessment",
      },
    ],
  },
  {
    id: "pci-dss",
    name: "PCI DSS",
    description: "Payment Card Industry Data Security Standard",
    category: "financial",
    applicableIndustries: ["retail", "ecommerce", "financial"],
    severity: "critical",
    lastUpdated: "2024-01-01",
    requirements: [
      {
        id: "pci-req1",
        name: "Install and maintain firewall configuration",
        description: "Install and maintain a firewall configuration to protect cardholder data",
        category: "network_security",
        mandatory: true,
        riskLevel: 8,
        implementationCost: 30000,
        timeToImplement: "2-4 months",
        validationMethod: "scan",
      },
    ],
  },
  {
    id: "gdpr",
    name: "GDPR",
    description: "General Data Protection Regulation",
    category: "privacy",
    applicableIndustries: ["all"],
    severity: "high",
    lastUpdated: "2024-01-01",
    requirements: [
      {
        id: "gdpr-art32",
        name: "Security of Processing",
        description: "Implement appropriate technical and organizational measures to ensure security of processing",
        category: "data_protection",
        mandatory: true,
        riskLevel: 7,
        implementationCost: 40000,
        timeToImplement: "4-8 months",
        validationMethod: "assessment",
      },
    ],
  },
]

export function getStandardById(id: string): ComplianceStandard | undefined {
  return complianceStandards.find((standard) => standard.id === id)
}

export function getStandardsByIndustry(industry: string): ComplianceStandard[] {
  return complianceStandards.filter(
    (standard) => standard.applicableIndustries.includes(industry) || standard.applicableIndustries.includes("all"),
  )
}

export function getRequirementById(standardId: string, requirementId: string): ComplianceRequirement | undefined {
  const standard = getStandardById(standardId)
  return standard?.requirements.find((req) => req.id === requirementId)
}
