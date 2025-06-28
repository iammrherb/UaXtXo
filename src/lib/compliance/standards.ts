import type { IndustryId } from "@/types/common";

export interface ComplianceRequirement {
  id: string; // e.g., "access_control", "audit_logging"
  name: string; // e.g., "Access Control", "Audit Logging"
  description: string;
  portnoxFeatureMapping?: string[]; // Names of Portnox features that address this
  portnoxCoveragePercent?: number; // How much Portnox covers this specific requirement
}

export interface ComplianceStandard {
  id: string; // e.g., "hipaa"
  name: string; // e.g., "HIPAA"
  fullName: string; // e.g., "Health Insurance Portability and Accountability Act"
  description: string;
  categories: string[]; // e.g., ["Security", "Privacy", "Data Integrity"]
  applicableIndustries: IndustryId[];
  requirements: ComplianceRequirement[]; // List of detailed requirements
  // Future fields: regionFocus (e.g., "US", "EU", "Global"), version, linkToOfficialDoc
}

export const complianceStandardsList: ComplianceStandard[] = [
  // Healthcare
  {
    id: "hipaa",
    name: "HIPAA",
    fullName: "Health Insurance Portability and Accountability Act",
    description: "US law protecting sensitive patient health information (PHI).",
    categories: ["Data Privacy", "Security", "Breach Notification"],
    applicableIndustries: ["healthcare", "insurance", "technology"], // Tech companies handling PHI
    requirements: [
      { id: "phi_access_control", name: "PHI Access Control", description: "Implement technical policies and procedures for electronic information systems that maintain electronic protected health information to allow access only to those persons or software programs that have been granted access rights as specified in § 164.308(a)(4)." },
      { id: "audit_controls", name: "Audit Controls", description: "Implement hardware, software, and/or procedural mechanisms that record and examine activity in information systems that contain or use electronic protected health information." },
      { id: "integrity_controls", name: "Integrity Controls", description: "Implement policies and procedures to protect electronic protected health information from improper alteration or destruction." },
      { id: "transmission_security", name: "Transmission Security", description: "Implement technical security measures to guard against unauthorized access to electronic protected health information that is being transmitted over an electronic communications network." },
    ],
  },
  {
    id: "hitech",
    name: "HITECH",
    fullName: "Health Information Technology for Economic and Clinical Health Act",
    description: "Strengthens HIPAA rules by increasing penalties for violations and promoting health information technology.",
    categories: ["Data Privacy", "Security", "Breach Notification"],
    applicableIndustries: ["healthcare", "insurance"],
    requirements: [
        {id: "breach_notification_rules", name: "Breach Notification Rules", description: "Specifies requirements for notifying individuals and HHS of breaches of unsecured PHI."},
        {id: "business_associate_liability", name: "Business Associate Liability", description: "Extends HIPAA's privacy and security provisions to business associates."},
    ],
  },
  // Financial Services
  {
    id: "pci_dss",
    name: "PCI-DSS",
    fullName: "Payment Card Industry Data Security Standard",
    description: "Security standards for organizations that handle branded credit cards.",
    categories: ["Payment Security", "Network Security", "Data Protection"],
    applicableIndustries: ["financial_services", "retail", "technology", "telecommunications"],
    requirements: [
        {id: "firewall_config", name: "Firewall Configuration", description: "Install and maintain a firewall configuration to protect cardholder data."},
        {id: "secure_passwords", name: "Secure Passwords", description: "Do not use vendor-supplied defaults for system passwords and other security parameters."},
        {id: "protect_cardholder_data", name: "Protect Cardholder Data", description: "Protect stored cardholder data."},
        {id: "encrypt_transmission", name: "Encrypt Transmission", description: "Encrypt transmission of cardholder data across open, public networks."},
    ],
  },
  {
    id: "sox",
    name: "SOX",
    fullName: "Sarbanes-Oxley Act",
    description: "US law to protect investors from fraudulent accounting activities by corporations.",
    categories: ["Financial Reporting", "Internal Controls", "Corporate Governance"],
    applicableIndustries: ["financial_services", "technology"], // Any publicly traded company
    requirements: [
        {id: "internal_controls_report", name: "Internal Controls Report", description: "Section 302 requires principal officers to certify the accuracy of their financial reports and the effectiveness of internal controls."},
        {id: "corporate_responsibility_financial_reports", name: "Corporate Responsibility for Financial Reports", description: "Section 404 requires management and the external auditor to report on the adequacy of the company's internal control over financial reporting (ICFR)."},
    ],
  },
  {
    id: "glba",
    name: "GLBA",
    fullName: "Gramm-Leach-Bliley Act",
    description: "Requires financial institutions to explain their information-sharing practices and safeguard sensitive data.",
    categories: ["Data Privacy", "Financial Information Security"],
    applicableIndustries: ["financial_services", "insurance"],
    requirements: [
        {id: "financial_privacy_rule", name: "Financial Privacy Rule", description: "Governs the collection and disclosure of customers’ personal financial information by financial institutions."},
        {id: "safeguards_rule", name: "Safeguards Rule", description: "Requires financial institutions to develop, implement, and maintain a comprehensive information security program."},
    ],
  },
  // Government
  {
    id: "fedramp",
    name: "FedRAMP",
    fullName: "Federal Risk and Authorization Management Program",
    description: "Standardized approach to security assessment, authorization, and continuous monitoring for cloud products and services used by the U.S. government.",
    categories: ["Cloud Security", "Government Security", "Risk Management"],
    applicableIndustries: ["government", "technology"], // Cloud Service Providers to government
    requirements: [
        {id: "access_control_fedramp", name: "Access Control (FedRAMP)", description: "Establish and manage access controls for systems processing federal information."},
        {id: "continuous_monitoring_fedramp", name: "Continuous Monitoring (FedRAMP)", description: "Implement continuous monitoring processes to maintain security posture."},
    ],
  },
  {
    id: "fisma",
    name: "FISMA",
    fullName: "Federal Information Security Management Act",
    description: "US legislation that defines a comprehensive framework to protect government information, operations, and assets.",
    categories: ["Information Security", "Government Security", "Risk Management"],
    applicableIndustries: ["government"],
    requirements: [
        {id: "risk_management_framework", name: "Risk Management Framework (RMF)", description: "Develop, document, and implement an agency-wide information security program."},
        {id: "security_awareness_training", name: "Security Awareness Training", description: "Provide security awareness training to personnel, including contractors."},
    ],
  },
  {
    id: "cmmc",
    name: "CMMC",
    fullName: "Cybersecurity Maturity Model Certification",
    description: "Framework to protect sensitive unclassified information within the Defense Industrial Base (DIB).",
    categories: ["Cybersecurity", "Defense Contracts", "Supply Chain Security"],
    applicableIndustries: ["government", "manufacturing", "technology"], // Defense contractors
    requirements: [
        {id: "cmmc_level_1", name: "CMMC Level 1 Practices", description: "Basic cyber hygiene practices."},
        {id: "cmmc_level_2", name: "CMMC Level 2 Practices", description: "Intermediate cyber hygiene, aligned with NIST SP 800-171."},
        {id: "cmmc_level_3", name: "CMMC Level 3 Practices", description: "Advanced/progressive cyber hygiene, based on NIST SP 800-172."},
    ],
  },
  // Education
  {
    id: "ferpa",
    name: "FERPA",
    fullName: "Family Educational Rights and Privacy Act",
    description: "US federal law that protects the privacy of student education records.",
    categories: ["Student Data Privacy", "Education Records"],
    applicableIndustries: ["education"],
    requirements: [
        {id: "student_records_access", name: "Student Records Access", description: "Parents or eligible students have the right to inspect and review the student's education records."},
        {id: "disclosure_consent", name: "Disclosure Consent", description: "Schools must have written permission from the parent or eligible student to release any information from a student's education record."},
    ],
  },
  // Generic/Cross-Industry
  {
    id: "gdpr",
    name: "GDPR",
    fullName: "General Data Protection Regulation",
    description: "EU regulation on data protection and privacy for all individuals within the European Union and the European Economic Area.",
    categories: ["Data Privacy", "Data Protection", "Consent Management"],
    applicableIndustries: ["technology", "retail", "financial_services", "healthcare", "education", "manufacturing", "telecommunications", "legal_services", "insurance"], // Any org processing EU citizen data
    requirements: [
        {id: "data_subject_rights", name: "Data Subject Rights", description: "Uphold rights such as access, rectification, erasure, and data portability."},
        {id: "data_protection_officer", name: "Data Protection Officer (DPO)", description: "Appoint a DPO in certain circumstances."},
        {id: "data_breach_notification_gdpr", name: "Data Breach Notification (GDPR)", description: "Notify supervisory authorities of data breaches within 72 hours."},
    ],
  },
  {
    id: "iso27001",
    name: "ISO 27001",
    fullName: "ISO/IEC 27001 – Information security management",
    description: "International standard for information security management systems (ISMS).",
    categories: ["Information Security", "Risk Management", "ISMS"],
    applicableIndustries: ["technology", "financial_services", "healthcare", "manufacturing", "government", "telecommunications"],
    requirements: [
        {id: "isms_establishment", name: "ISMS Establishment", description: "Establish, implement, maintain, and continually improve an ISMS."},
        {id: "risk_assessment_treatment", name: "Risk Assessment and Treatment", description: "Conduct information security risk assessments and select appropriate risk treatment options."},
        {id: "annex_a_controls", name: "Annex A Controls", description: "Implement controls from Annex A as applicable."},
    ],
  },
  // Manufacturing
  {
    id: "iec62443",
    name: "IEC 62443",
    fullName: "IEC 62443 - Security for industrial automation and control systems (IACS)",
    description: "International series of standards for the cybersecurity of Industrial Automation and Control Systems (IACS).",
    categories: ["OT Security", "Industrial Control Systems", "Cybersecurity"],
    applicableIndustries: ["manufacturing", "energy_utilities"],
    requirements: [
        {id: "security_program_requirements", name: "Security Program Requirements for IACS Asset Owners", description: "Defines the elements of a cybersecurity management system for IACS asset owners."},
        {id: "zone_conduit_design", name: "Zone and Conduit Design Requirements", description: "Specifies requirements for segmenting IACS into zones and conduits."},
    ],
  },
  // Energy/Utilities
  {
    id: "nerc_cip",
    name: "NERC CIP",
    fullName: "NERC Critical Infrastructure Protection standards",
    description: "Mandatory standards to ensure the reliability of the North American bulk power system.",
    categories: ["Critical Infrastructure", "Energy Security", "Grid Reliability"],
    applicableIndustries: ["energy_utilities"],
    requirements: [
        {id: "bes_cyber_system_categorization", name: "BES Cyber System Categorization", description: "Identify and categorize BES Cyber Systems."},
        {id: "security_management_controls_nerc", name: "Security Management Controls (NERC)", description: "Implement security management controls to protect BES Cyber Systems."},
        {id: "incident_reporting_response_planning", name: "Incident Reporting and Response Planning", description: "Develop and implement incident response plans."},
    ],
  },
  // Technology (additional)
  {
    id: "soc2",
    name: "SOC 2",
    fullName: "System and Organization Controls 2",
    description: "Reporting framework for service organizations to report on non-financial internal controls relevant to security, availability, processing integrity, confidentiality, and privacy.",
    categories: ["Service Organization Controls", "Trust Services Criteria"],
    applicableIndustries: ["technology", "financial_services", "healthcare"], // SaaS, Cloud providers
    requirements: [
        {id: "tsc_security", name: "Trust Services Criterion - Security", description: "The system is protected against unauthorized access (both physical and logical)."},
        {id: "tsc_availability", name: "Trust Services Criterion - Availability", description: "The system is available for operation and use as committed or agreed."},
        {id: "tsc_confidentiality", name: "Trust Services Criterion - Confidentiality", description: "Information designated as confidential is protected as committed or agreed."},
    ],
  },
  // Retail (additional)
   {
    id: "ccpa",
    name: "CCPA/CPRA",
    fullName: "California Consumer Privacy Act / California Privacy Rights Act",
    description: "California state statute intended to enhance privacy rights and consumer protection for residents of California.",
    categories: ["Data Privacy", "Consumer Rights"],
    applicableIndustries: ["retail", "technology", "financial_services", "healthcare", "education"], // Any org doing business in California
    requirements: [
        {id: "right_to_know", name: "Right to Know", description: "Consumers have the right to know what personal information is being collected about them."},
        {id: "right_to_delete", name: "Right to Delete", description: "Consumers have the right to request the deletion of their personal information."},
        {id: "right_to_opt_out", name: "Right to Opt-Out", description: "Consumers have the right to opt-out of the sale of their personal information."},
    ],
  },
  // Pharmaceuticals
  {
    id: "fda_21_cfr_part_11",
    name: "FDA 21 CFR Part 11",
    fullName: "FDA Title 21 CFR Part 11",
    description: "FDA regulations on electronic records and electronic signatures (ERES).",
    categories: ["Electronic Records", "Electronic Signatures", "Data Integrity"],
    applicableIndustries: ["pharmaceuticals", "healthcare"], // Life sciences, biotech
    requirements: [
        {id: "electronic_signatures", name: "Electronic Signatures", description: "Ensure electronic signatures are trustworthy, reliable, and generally equivalent to paper records."},
        {id: "audit_trails_fda", name: "Audit Trails (FDA)", description: "Use secure, computer-generated, time-stamped audit trails to independently record the date and time of operator entries and actions that create, modify, or delete electronic records."},
    ],
  },
  // Telecommunications
  {
    id: "cpni",
    name: "CPNI",
    fullName: "Customer Proprietary Network Information",
    description: "FCC rules protecting customer information obtained by telecommunications carriers.",
    categories: ["Customer Data Privacy", "Telecommunications Regulation"],
    applicableIndustries: ["telecommunications"],
    requirements: [
        {id: "cpni_protection", name: "CPNI Protection", description: "Carriers must take reasonable measures to discover and protect against attempts to gain unauthorized access to CPNI."},
        {id: "customer_authentication_cpni", name: "Customer Authentication (CPNI)", description: "Authenticate customers before disclosing CPNI."},
    ],
  },
  // Legal Services
  {
    id: "aba_model_rules",
    name: "ABA Model Rules",
    fullName: "ABA Model Rules of Professional Conduct",
    description: "Ethical guidelines for lawyers, including duties of confidentiality and competence in technology.",
    categories: ["Legal Ethics", "Client Confidentiality", "Data Security"],
    applicableIndustries: ["legal_services"],
    requirements: [
        {id: "client_confidentiality", name: "Client Confidentiality", description: "Rule 1.6: A lawyer shall not reveal information relating to the representation of a client unless the client gives informed consent."},
        {id: "technological_competence", name: "Technological Competence", description: "Comment to Rule 1.1: Lawyers should keep abreast of changes in the law and its practice, including the benefits and risks associated with relevant technology."},
    ],
  },
   // Insurance
  {
    id: "naic_model_laws",
    name: "NAIC Model Laws",
    fullName: "NAIC Insurance Data Security Model Law",
    description: "Model law by the National Association of Insurance Commissioners to establish standards for data security and breach notification for insurance licensees.",
    categories: ["Data Security", "Insurance Regulation", "Breach Notification"],
    applicableIndustries: ["insurance"],
    requirements: [
        {id: "info_security_program", name: "Information Security Program", description: "Develop, implement, and maintain a comprehensive written information security program."},
        {id: "incident_response_plan_naic", name: "Incident Response Plan (NAIC)", description: "Establish a written incident response plan designed to promptly respond to, and recover from, any Cybersecurity Event."},
    ],
  },
];

// Helper to get a standard by ID
export const getComplianceStandardById = (id: string): ComplianceStandard | undefined => {
  return complianceStandardsList.find(standard => standard.id === id);
};

console.log("Compliance standards data module loaded with detailed structures.");
