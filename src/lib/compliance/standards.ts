export interface ComplianceRequirement {
  id: string // e.g., "access_control", "audit_logging"
  name: string // e.g., "Access Control", "Audit Logging"
  description: string
  portnoxFeatureMapping?: string[] // Names of Portnox features that address this
  portnoxCoveragePercent?: number // How much Portnox covers this specific requirement
}

export interface ComplianceStandard {
  id: string
  name: string
  description: string
}

export const complianceStandardsList: ComplianceStandard[] = [
  // Healthcare
  {
    id: "hipaa",
    name: "HIPAA",
    description: "Health Insurance Portability and Accountability Act",
  },
  {
    id: "hitech",
    name: "HITECH",
    description: "Health Information Technology for Economic and Clinical Health Act",
  },
  // Financial Services
  {
    id: "pci_dss",
    name: "PCI DSS",
    description: "Payment Card Industry Data Security Standard",
  },
  {
    id: "sox",
    name: "SOX",
    description: "Sarbanes-Oxley Act",
  },
  {
    id: "glba",
    name: "GLBA",
    description: "Gramm-Leach-Bliley Act",
  },
  // Government
  {
    id: "fedramp",
    name: "FedRAMP",
    description: "Federal Risk and Authorization Management Program",
  },
  {
    id: "fisma",
    name: "FISMA",
    description: "Federal Information Security Management Act",
  },
  {
    id: "cmmc",
    name: "CMMC",
    description: "Cybersecurity Maturity Model Certification",
  },
  // Education
  {
    id: "ferpa",
    name: "FERPA",
    description: "Family Educational Rights and Privacy Act",
  },
  // Generic/Cross-Industry
  {
    id: "gdpr",
    name: "GDPR",
    description: "General Data Protection Regulation",
  },
  {
    id: "iso_27001",
    name: "ISO 27001",
    description: "International standard for information security management",
  },
  // Manufacturing
  {
    id: "iec62443",
    name: "IEC 62443",
    description: "Security for industrial automation and control systems (IACS)",
  },
  // Energy/Utilities
  {
    id: "nerc_cip",
    name: "NERC CIP",
    description: "Mandatory standards to ensure the reliability of the North American bulk power system",
  },
  // Technology (additional)
  {
    id: "soc2",
    name: "SOC 2",
    description:
      "Reporting framework for service organizations to report on non-financial internal controls relevant to security, availability, processing integrity, confidentiality, and privacy",
  },
  // Retail (additional)
  {
    id: "ccpa",
    name: "CCPA/CPRA",
    description: "California Consumer Privacy Act / California Privacy Rights Act",
  },
  // Pharmaceuticals
  {
    id: "fda_21_cfr_part_11",
    name: "FDA 21 CFR Part 11",
    description: "FDA regulations on electronic records and electronic signatures (ERES)",
  },
  // Telecommunications
  {
    id: "cpni",
    name: "CPNI",
    description: "Customer Proprietary Network Information",
  },
  // Legal Services
  {
    id: "aba_model_rules",
    name: "ABA Model Rules",
    description: "Ethical guidelines for lawyers, including duties of confidentiality and competence in technology",
  },
  // Insurance
  {
    id: "naic_model_laws",
    name: "NAIC Model Laws",
    description:
      "Model law by the National Association of Insurance Commissioners to establish standards for data security and breach notification for insurance licensees",
  },
  {
    id: "nist_800_53",
    name: "NIST 800-53",
    description: "Security and privacy controls for federal information systems",
  },
]

// Helper to get a standard by ID
export const getComplianceStandardById = (standardId: string): ComplianceStandard | undefined => {
  return complianceStandardsList.find((standard) => standard.id === standardId)
}

console.log("Compliance standards data module loaded with detailed structures.")
