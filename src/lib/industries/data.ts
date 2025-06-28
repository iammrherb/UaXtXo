import type { IndustryId } from "@/types/common";
import type { ComplianceStandard } from "@/lib/compliance/standards"; // Assuming this path is correct

export interface Industry {
  id: IndustryId;
  name: string;
  description: string;
  primaryComplianceStandardIds: string[]; // IDs of compliance standards
  secondaryComplianceStandardIds: string[];
  keyRequirementsDesc: string[]; // Text descriptions of key requirements for this industry
  // TODO: Add other industry-specific metrics or factors from ZTCA spec
  // e.g., avgBreachCostMultiplier, complianceComplexityFactor, typicalBudgetRange
}

export const industriesList: Industry[] = [
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Organizations providing medical services, handling patient health information (PHI).",
    primaryComplianceStandardIds: ["hipaa", "hitech"],
    secondaryComplianceStandardIds: ["iso27001", "pci_dss"], // If they process payments
    keyRequirementsDesc: ["PHI protection", "Secure patient data exchange", "Audit trails for PHI access", "Breach notification procedures"],
  },
  {
    id: "financial_services",
    name: "Financial Services",
    description: "Banks, investment firms, insurance companies, and other financial institutions.",
    primaryComplianceStandardIds: ["pci_dss", "sox", "glba"],
    secondaryComplianceStandardIds: ["iso27001", "nist_csf"], // NIST CSF often used
    keyRequirementsDesc: ["Transaction security", "Protection of Non-public Personal Information (NPI)", "Data retention policies", "Fraud prevention"],
  },
  {
    id: "government",
    name: "Government",
    description: "Federal, state, and local government agencies and contractors.",
    primaryComplianceStandardIds: ["fisma", "fedramp"], // FedRAMP for cloud services
    secondaryComplianceStandardIds: ["cmmc", "nist_csf", "state_specific_laws"], // CMMC for defense contractors
    keyRequirementsDesc: ["Protection of CUI (Controlled Unclassified Information)", "Zero Trust Architecture principles", "Continuous monitoring", "Supply chain risk management"],
  },
  {
    id: "education",
    name: "Education",
    description: "Schools, colleges, universities, and educational technology providers.",
    primaryComplianceStandardIds: ["ferpa"],
    secondaryComplianceStandardIds: ["coppa", "gdpr", "pci_dss"], // COPPA for under 13, GDPR if EU students, PCI if payments
    keyRequirementsDesc: ["Student data privacy (education records)", "Protection of minors' data online", "Secure online learning environments"],
  },
  {
    id: "retail",
    name: "Retail",
    description: "Businesses selling goods and services to consumers, both online and offline.",
    primaryComplianceStandardIds: ["pci_dss"],
    secondaryComplianceStandardIds: ["ccpa", "gdpr", "sox"], // SOX if publicly traded
    keyRequirementsDesc: ["Payment card security", "Customer data protection (PII)", "Secure e-commerce transactions", "Inventory system security"],
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    description: "Companies involved in the production of goods, including industrial control systems (ICS).",
    primaryComplianceStandardIds: ["iso27001", "iec62443"],
    secondaryComplianceStandardIds: ["nist_csf", "cmmc"], // CMMC if defense related
    keyRequirementsDesc: ["OT/IT convergence security", "Protection of intellectual property (IP)", "Supply chain security", "Industrial control system integrity"],
  },
  {
    id: "technology",
    name: "Technology",
    description: "Software developers, hardware manufacturers, cloud service providers, IT services.",
    primaryComplianceStandardIds: ["soc2", "iso27001"],
    secondaryComplianceStandardIds: ["gdpr", "ccpa", "pci_dss", "hipaa"], // Depending on services and data handled
    keyRequirementsDesc: ["Data sovereignty and residency", "API security", "Protection of customer data hosted in cloud", "Secure software development lifecycle (SSDLC)"],
  },
  {
    id: "energy_utilities",
    name: "Energy & Utilities",
    description: "Companies involved in the production, transmission, and distribution of energy and utilities.",
    primaryComplianceStandardIds: ["nerc_cip", "iec62443"],
    secondaryComplianceStandardIds: ["iso27001", "nist_csf"],
    keyRequirementsDesc: ["Critical infrastructure protection", "SCADA system security", "Grid reliability and resilience", "Physical security of facilities"],
  },
  {
    id: "pharmaceuticals",
    name: "Pharmaceuticals",
    description: "Companies involved in research, development, manufacturing, and distribution of pharmaceutical drugs.",
    primaryComplianceStandardIds: ["fda_21_cfr_part_11", "gxp"], // GxP is a general term (GMP, GCP, GLP)
    secondaryComplianceStandardIds: ["hipaa", "iso27001", "gdpr"],
    keyRequirementsDesc: ["Electronic records and signatures integrity", "Validation of systems (CSV)", "Protection of clinical trial data", "Intellectual property protection"],
  },
  {
    id: "telecommunications",
    name: "Telecommunications",
    description: "Providers of telecommunication services, including voice, data, and internet.",
    primaryComplianceStandardIds: ["cpni", "gdpr"], // GDPR if operating in EU
    secondaryComplianceStandardIds: ["pci_dss", "iso27001", "nist_csf"],
    keyRequirementsDesc: ["Protection of Customer Proprietary Network Information (CPNI)", "Network security and availability", "Lawful intercept capabilities", "Data privacy for subscribers"],
  },
  {
    id: "legal_services",
    name: "Legal Services",
    description: "Law firms and legal service providers.",
    primaryComplianceStandardIds: ["aba_model_rules"], // Ethical rules rather than specific laws
    secondaryComplianceStandardIds: ["gdpr", "ccpa", "hipaa"], // Depending on client data handled
    keyRequirementsDesc: ["Client confidentiality (attorney-client privilege)", "Secure handling of sensitive case files", "Data retention and disposal policies", "Ethical use of technology"],
  },
  {
    id: "insurance",
    name: "Insurance",
    description: "Companies providing insurance policies and handling claims.",
    primaryComplianceStandardIds: ["naic_model_laws", "glba"],
    secondaryComplianceStandardIds: ["hipaa", "pci_dss", "sox", "gdpr"], // HIPAA if health insurance, PCI for payments, SOX if public
    keyRequirementsDesc: ["Protection of policyholder information (PII, PHI)", "Secure claims processing", "Fraud detection and prevention", "Compliance with state-specific insurance regulations"],
  },
];

export const getIndustryById = (id: IndustryId): Industry | undefined => {
  return industriesList.find(industry => industry.id === id);
};

console.log("Industries data module loaded with initial data.");
