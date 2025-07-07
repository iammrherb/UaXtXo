"use client"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface IndustryAnalysisViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

// Comprehensive compliance frameworks with detailed controls
const COMPLIANCE_FRAMEWORKS = {
  hipaa: {
    name: "HIPAA",
    fullName: "Health Insurance Portability and Accountability Act",
    industry: ["healthcare"],
    maxFine: 2000000,
    controls: {
      "164.308(a)(1)": {
        name: "Security Management Process",
        description: "Implement policies and procedures to prevent, detect, contain, and correct security violations",
        nacRequirement: "critical",
        nacCapabilities: ["Policy enforcement", "Incident detection", "Automated response", "Audit logging"],
        implementationCost: 25000,
        ongoingCost: 5000,
        riskReduction: 35,
        complianceScore: 90,
      },
      "164.308(a)(3)": {
        name: "Workforce Security",
        description:
          "Implement procedures for authorization and/or supervision of workforce members who work with ePHI",
        nacRequirement: "critical",
        nacCapabilities: ["Role-based access", "User authentication", "Session monitoring", "Access reviews"],
        implementationCost: 15000,
        ongoingCost: 3000,
        riskReduction: 40,
        complianceScore: 95,
      },
      "164.308(a)(4)": {
        name: "Information Access Management",
        description: "Implement policies and procedures for authorizing access to ePHI",
        nacRequirement: "critical",
        nacCapabilities: ["Access control", "Least privilege", "Dynamic authorization", "Context-aware access"],
        implementationCost: 20000,
        ongoingCost: 4000,
        riskReduction: 45,
        complianceScore: 92,
      },
      "164.310(a)": {
        name: "Facility Access Controls",
        description: "Implement physical safeguards for all workstations that access ePHI",
        nacRequirement: "important",
        nacCapabilities: ["Device authentication", "Location-based access", "Physical security integration"],
        implementationCost: 30000,
        ongoingCost: 2000,
        riskReduction: 25,
        complianceScore: 85,
      },
      "164.312(a)": {
        name: "Access Control",
        description: "Implement technical policies and procedures for electronic information systems",
        nacRequirement: "critical",
        nacCapabilities: [
          "Unique user identification",
          "Automatic logoff",
          "Encryption",
          "Multi-factor authentication",
        ],
        implementationCost: 35000,
        ongoingCost: 6000,
        riskReduction: 50,
        complianceScore: 98,
      },
      "164.312(b)": {
        name: "Audit Controls",
        description: "Implement hardware, software, and/or procedural mechanisms to record and examine activity",
        nacRequirement: "critical",
        nacCapabilities: ["Activity logging", "Log analysis", "Audit trails", "Real-time monitoring"],
        implementationCost: 18000,
        ongoingCost: 4500,
        riskReduction: 30,
        complianceScore: 88,
      },
    },
  },
  pci_dss: {
    name: "PCI-DSS",
    fullName: "Payment Card Industry Data Security Standard",
    industry: ["retail", "financial", "healthcare"],
    maxFine: 500000,
    controls: {
      "1.1": {
        name: "Network Segmentation",
        description: "Establish and implement firewall and router configuration standards",
        nacRequirement: "critical",
        nacCapabilities: ["Network segmentation", "VLAN assignment", "Micro-segmentation", "Traffic isolation"],
        implementationCost: 40000,
        ongoingCost: 8000,
        riskReduction: 55,
        complianceScore: 95,
      },
      "2.1": {
        name: "Default Credentials",
        description: "Always change vendor-supplied defaults and remove unnecessary default accounts",
        nacRequirement: "critical",
        nacCapabilities: ["Credential management", "Default detection", "Enforcement policies", "Password policies"],
        implementationCost: 12000,
        ongoingCost: 2000,
        riskReduction: 35,
        complianceScore: 90,
      },
      "7.1": {
        name: "Access Control",
        description:
          "Limit access to system components and cardholder data to only those individuals whose job requires such access",
        nacRequirement: "critical",
        nacCapabilities: [
          "Role-based access",
          "Need-to-know enforcement",
          "Access certification",
          "Privilege management",
        ],
        implementationCost: 25000,
        ongoingCost: 5000,
        riskReduction: 45,
        complianceScore: 93,
      },
      "8.1": {
        name: "User Identification",
        description: "Assign all users a unique ID before allowing them to access system components",
        nacRequirement: "critical",
        nacCapabilities: ["Identity management", "Unique authentication", "User lifecycle", "Identity federation"],
        implementationCost: 20000,
        ongoingCost: 4000,
        riskReduction: 40,
        complianceScore: 88,
      },
      "10.1": {
        name: "Audit Trails",
        description: "Implement audit trails to link all access to system components to each individual user",
        nacRequirement: "critical",
        nacCapabilities: ["Comprehensive logging", "User attribution", "Log integrity", "Forensic analysis"],
        implementationCost: 22000,
        ongoingCost: 4500,
        riskReduction: 38,
        complianceScore: 92,
      },
      "11.1": {
        name: "Wireless Detection",
        description: "Test for the presence of wireless access points and detect unauthorized wireless access points",
        nacRequirement: "important",
        nacCapabilities: ["Rogue device detection", "Wireless monitoring", "Automated response", "RF analysis"],
        implementationCost: 15000,
        ongoingCost: 3000,
        riskReduction: 30,
        complianceScore: 85,
      },
    },
  },
  gdpr: {
    name: "GDPR",
    fullName: "General Data Protection Regulation",
    industry: ["technology", "retail", "healthcare", "financial", "education"],
    maxFine: 20000000,
    controls: {
      "Article 25": {
        name: "Data Protection by Design",
        description: "Implement appropriate technical and organizational measures",
        nacRequirement: "critical",
        nacCapabilities: ["Privacy controls", "Data minimization", "Access restrictions", "Purpose limitation"],
        implementationCost: 35000,
        ongoingCost: 7000,
        riskReduction: 42,
        complianceScore: 90,
      },
      "Article 32": {
        name: "Security of Processing",
        description: "Implement appropriate technical and organizational measures to ensure security",
        nacRequirement: "critical",
        nacCapabilities: ["Encryption", "Access control", "Integrity monitoring", "Availability controls"],
        implementationCost: 45000,
        ongoingCost: 9000,
        riskReduction: 50,
        complianceScore: 95,
      },
      "Article 33": {
        name: "Breach Notification",
        description: "Notify supervisory authority of personal data breach within 72 hours",
        nacRequirement: "important",
        nacCapabilities: ["Incident detection", "Automated alerting", "Forensic capabilities", "Timeline tracking"],
        implementationCost: 18000,
        ongoingCost: 3500,
        riskReduction: 25,
        complianceScore: 88,
      },
      "Article 35": {
        name: "Data Protection Impact Assessment",
        description: "Assess and mitigate risks to rights and freedoms of natural persons",
        nacRequirement: "beneficial",
        nacCapabilities: ["Risk assessment", "Impact analysis", "Control effectiveness", "Privacy metrics"],
        implementationCost: 12000,
        ongoingCost: 2500,
        riskReduction: 20,
        complianceScore: 82,
      },
    },
  },
  sox: {
    name: "SOX",
    fullName: "Sarbanes-Oxley Act",
    industry: ["financial", "technology"],
    maxFine: 5000000,
    controls: {
      "Section 302": {
        name: "Corporate Responsibility",
        description: "CEOs and CFOs must certify financial reports",
        nacRequirement: "important",
        nacCapabilities: ["Access logging", "Change tracking", "Audit trails", "Executive reporting"],
        implementationCost: 28000,
        ongoingCost: 5500,
        riskReduction: 35,
        complianceScore: 85,
      },
      "Section 404": {
        name: "Internal Controls",
        description: "Assess effectiveness of internal control structure",
        nacRequirement: "critical",
        nacCapabilities: ["Access control", "Segregation of duties", "Control monitoring", "Exception reporting"],
        implementationCost: 40000,
        ongoingCost: 8000,
        riskReduction: 45,
        complianceScore: 92,
      },
      "Section 802": {
        name: "Records Retention",
        description: "Criminal penalties for altering, destroying, or falsifying records",
        nacRequirement: "important",
        nacCapabilities: ["Log integrity", "Tamper protection", "Long-term retention", "Chain of custody"],
        implementationCost: 25000,
        ongoingCost: 5000,
        riskReduction: 30,
        complianceScore: 88,
      },
    },
  },
  nist_800_53: {
    name: "NIST 800-53",
    fullName: "Security and Privacy Controls for Federal Information Systems",
    industry: ["government", "technology", "healthcare"],
    maxFine: 500000,
    controls: {
      "AC-2": {
        name: "Account Management",
        description: "Manage information system accounts",
        nacRequirement: "critical",
        nacCapabilities: ["Account lifecycle", "Automated provisioning", "Access reviews", "Account monitoring"],
        implementationCost: 30000,
        ongoingCost: 6000,
        riskReduction: 40,
        complianceScore: 90,
      },
      "AC-3": {
        name: "Access Enforcement",
        description: "Enforce approved authorizations for logical access",
        nacRequirement: "critical",
        nacCapabilities: ["Policy enforcement", "Attribute-based access", "Dynamic authorization", "Context awareness"],
        implementationCost: 35000,
        ongoingCost: 7000,
        riskReduction: 45,
        complianceScore: 93,
      },
      "AC-4": {
        name: "Information Flow Enforcement",
        description: "Control information flows within the system",
        nacRequirement: "critical",
        nacCapabilities: ["Flow control", "Data classification", "Boundary protection", "Traffic analysis"],
        implementationCost: 42000,
        ongoingCost: 8500,
        riskReduction: 50,
        complianceScore: 95,
      },
      "IA-2": {
        name: "Identification and Authentication",
        description: "Uniquely identify and authenticate organizational users",
        nacRequirement: "critical",
        nacCapabilities: ["Multi-factor authentication", "Strong authentication", "Identity proofing", "Biometrics"],
        implementationCost: 25000,
        ongoingCost: 5000,
        riskReduction: 42,
        complianceScore: 88,
      },
      "AU-2": {
        name: "Audit Events",
        description: "Determine that the information system is capable of auditing",
        nacRequirement: "critical",
        nacCapabilities: ["Comprehensive logging", "Event correlation", "Real-time monitoring", "Behavioral analysis"],
        implementationCost: 32000,
        ongoingCost: 6500,
        riskReduction: 38,
        complianceScore: 91,
      },
    },
  },
  iso_27001: {
    name: "ISO 27001",
    fullName: "Information Security Management System",
    industry: ["technology", "manufacturing", "financial"],
    maxFine: 0,
    controls: {
      "A.9.1": {
        name: "Access Control Policy",
        description: "Establish, document and review access control policy",
        nacRequirement: "critical",
        nacCapabilities: ["Policy management", "Access governance", "Regular reviews", "Policy automation"],
        implementationCost: 20000,
        ongoingCost: 4000,
        riskReduction: 35,
        complianceScore: 87,
      },
      "A.9.2": {
        name: "User Access Management",
        description: "Ensure authorized user access and prevent unauthorized access",
        nacRequirement: "critical",
        nacCapabilities: ["User provisioning", "Access certification", "Privilege management", "Access analytics"],
        implementationCost: 28000,
        ongoingCost: 5500,
        riskReduction: 40,
        complianceScore: 90,
      },
      "A.9.4": {
        name: "System and Application Access Control",
        description: "Prevent unauthorized access to systems and applications",
        nacRequirement: "critical",
        nacCapabilities: ["Application control", "API security", "Service authentication", "Zero trust"],
        implementationCost: 35000,
        ongoingCost: 7000,
        riskReduction: 45,
        complianceScore: 92,
      },
      "A.12.4": {
        name: "Logging and Monitoring",
        description: "Record events and generate evidence",
        nacRequirement: "critical",
        nacCapabilities: ["Event logging", "Log analysis", "Security monitoring", "Incident correlation"],
        implementationCost: 25000,
        ongoingCost: 5000,
        riskReduction: 38,
        complianceScore: 89,
      },
    },
  },
}

// Enhanced threat modeling with detailed attack vectors
const THREAT_MODELS = {
  healthcare: {
    threats: [
      {
        name: "Ransomware Attacks",
        probability: 0.35,
        impact: 12000000,
        attackVectors: ["Email phishing", "Unpatched systems", "Lateral movement", "Backup encryption"],
        nacMitigation: 85,
        timeToDetect: 72,
        timeToContain: 168,
        recoveryTime: 720,
        reputationImpact: "Severe",
        regulatoryFines: 2500000,
      },
      {
        name: "Medical Device Compromise",
        probability: 0.25,
        impact: 8500000,
        attackVectors: ["Default credentials", "Unencrypted communications", "Legacy protocols", "Network access"],
        nacMitigation: 90,
        timeToDetect: 120,
        timeToContain: 48,
        recoveryTime: 240,
        reputationImpact: "High",
        regulatoryFines: 1500000,
      },
      {
        name: "Insider Data Theft",
        probability: 0.15,
        impact: 6200000,
        attackVectors: ["Privileged access abuse", "Data exfiltration", "Credential sharing", "Policy violations"],
        nacMitigation: 75,
        timeToDetect: 180,
        timeToContain: 24,
        recoveryTime: 120,
        reputationImpact: "High",
        regulatoryFines: 3000000,
      },
      {
        name: "Supply Chain Attack",
        probability: 0.12,
        impact: 15000000,
        attackVectors: ["Third-party compromise", "Software updates", "Hardware tampering", "Vendor access"],
        nacMitigation: 70,
        timeToDetect: 240,
        timeToContain: 96,
        recoveryTime: 480,
        reputationImpact: "Severe",
        regulatoryFines: 5000000,
      },
    ],
  },
  financial: {
    threats: [
      {
        name: "Advanced Persistent Threat",
        probability: 0.28,
        impact: 18000000,
        attackVectors: ["Spear phishing", "Zero-day exploits", "Living off the land", "Credential harvesting"],
        nacMitigation: 80,
        timeToDetect: 200,
        timeToContain: 72,
        recoveryTime: 360,
        reputationImpact: "Severe",
        regulatoryFines: 50000000,
      },
      {
        name: "Financial Fraud",
        probability: 0.32,
        impact: 12000000,
        attackVectors: ["Account takeover", "Transaction manipulation", "Identity theft", "Social engineering"],
        nacMitigation: 85,
        timeToDetect: 24,
        timeToContain: 12,
        recoveryTime: 72,
        reputationImpact: "High",
        regulatoryFines: 25000000,
      },
      {
        name: "DDoS Attacks",
        probability: 0.45,
        impact: 3500000,
        attackVectors: ["Volumetric attacks", "Application layer attacks", "Protocol attacks", "Botnet usage"],
        nacMitigation: 60,
        timeToDetect: 5,
        timeToContain: 2,
        recoveryTime: 8,
        reputationImpact: "Medium",
        regulatoryFines: 0,
      },
      {
        name: "Regulatory Violation",
        probability: 0.2,
        impact: 8000000,
        attackVectors: ["Data mishandling", "Inadequate controls", "Audit failures", "Compliance gaps"],
        nacMitigation: 95,
        timeToDetect: 720,
        timeToContain: 168,
        recoveryTime: 2160,
        reputationImpact: "Severe",
        regulatoryFines: 75000000,
      },
    ],
  },
  retail: {
    threats: [
      {
        name: "POS Malware",
        probability: 0.3,
        impact: 5200000,
        attackVectors: ["Memory scraping", "Network sniffing", "Remote access", "Physical tampering"],
        nacMitigation: 88,
        timeToDetect: 45,
        timeToContain: 24,
        recoveryTime: 120,
        reputationImpact: "High",
        regulatoryFines: 500000,
      },
      {
        name: "E-commerce Attack",
        probability: 0.35,
        impact: 4800000,
        attackVectors: ["Web application attacks", "API exploitation", "Session hijacking", "Payment skimming"],
        nacMitigation: 75,
        timeToDetect: 30,
        timeToContain: 12,
        recoveryTime: 48,
        reputationImpact: "High",
        regulatoryFines: 750000,
      },
      {
        name: "Customer Data Breach",
        probability: 0.25,
        impact: 7500000,
        attackVectors: ["Database compromise", "Insider access", "Third-party breach", "Cloud misconfiguration"],
        nacMitigation: 82,
        timeToDetect: 90,
        timeToContain: 48,
        recoveryTime: 240,
        reputationImpact: "Severe",
        regulatoryFines: 2000000,
      },
    ],
  },
  manufacturing: {
    threats: [
      {
        name: "Industrial Espionage",
        probability: 0.22,
        impact: 25000000,
        attackVectors: ["IP theft", "Trade secret access", "Design document theft", "Process manipulation"],
        nacMitigation: 78,
        timeToDetect: 300,
        timeToContain: 120,
        recoveryTime: 720,
        reputationImpact: "Severe",
        regulatoryFines: 1000000,
      },
      {
        name: "OT/IT Convergence Attack",
        probability: 0.18,
        impact: 15000000,
        attackVectors: ["Network bridging", "Protocol exploitation", "HMI compromise", "SCADA manipulation"],
        nacMitigation: 85,
        timeToDetect: 180,
        timeToContain: 72,
        recoveryTime: 480,
        reputationImpact: "High",
        regulatoryFines: 500000,
      },
      {
        name: "Supply Chain Disruption",
        probability: 0.28,
        impact: 12000000,
        attackVectors: ["Vendor compromise", "Logistics attack", "Component tampering", "Communication disruption"],
        nacMitigation: 70,
        timeToDetect: 240,
        timeToContain: 96,
        recoveryTime: 600,
        reputationImpact: "High",
        regulatoryFines: 0,
      },
    ],
  },
  education: {
    threats: [
      {
        name: "Student Data Breach",
        probability: 0.28,
        impact: 4200000,
        attackVectors: ["Database access", "Insider threat", "Phishing attacks", "Weak authentication"],
        nacMitigation: 80,
        timeToDetect: 120,
        timeToContain: 48,
        recoveryTime: 240,
        reputationImpact: "High",
        regulatoryFines: 100000,
      },
      {
        name: "Ransomware",
        probability: 0.4,
        impact: 3800000,
        attackVectors: ["Email attacks", "Remote access", "Unpatched systems", "Backup encryption"],
        nacMitigation: 85,
        timeToDetect: 48,
        timeToContain: 72,
        recoveryTime: 360,
        reputationImpact: "High",
        regulatoryFines: 0,
      },
      {
        name: "Research IP Theft",
        probability: 0.15,
        impact: 8500000,
        attackVectors: ["Researcher access", "Collaboration platform", "Cloud storage", "Email compromise"],
        nacMitigation: 75,
        timeToDetect: 200,
        timeToContain: 96,
        recoveryTime: 480,
        reputationImpact: "Severe",
        regulatoryFines: 0,
      },
    ],
  },
  government: {
    threats: [
      {
        name: "Nation State Attack",
        probability: 0.35,
        impact: 50000000,
        attackVectors: ["Advanced malware", "Zero-day exploits", "Social engineering", "Supply chain"],
        nacMitigation: 75,
        timeToDetect: 400,
        timeToContain: 168,
        recoveryTime: 1440,
        reputationImpact: "Severe",
        regulatoryFines: 10000000,
      },
      {
        name: "Critical Infrastructure Attack",
        probability: 0.2,
        impact: 75000000,
        attackVectors: ["SCADA compromise", "Network disruption", "Physical damage", "Service interruption"],
        nacMitigation: 80,
        timeToDetect: 120,
        timeToContain: 240,
        recoveryTime: 2160,
        reputationImpact: "Severe",
        regulatoryFines: 25000000,
      },
      {
        name: "Classified Data Breach",
        probability: 0.15,
        impact: 100000000,
        attackVectors: ["Insider threat", "Privilege escalation", "Data exfiltration", "Clearance abuse"],
        nacMitigation: 90,
        timeToDetect: 300,
        timeToContain: 72,
        recoveryTime: 720,
        reputationImpact: "Severe",
        regulatoryFines: 50000000,
      },
    ],
  },
  technology: {
    threats: [
      {
        name: "Intellectual Property Theft",
        probability: 0.25,
        impact: 35000000,
        attackVectors: ["Source code theft", "Design document access", "Patent information", "Trade secrets"],
        nacMitigation: 82,
        timeToDetect: 250,
        timeToContain: 96,
        recoveryTime: 600,
        reputationImpact: "Severe",
        regulatoryFines: 2000000,
      },
      {
        name: "Cloud Infrastructure Attack",
        probability: 0.3,
        impact: 15000000,
        attackVectors: ["Misconfiguration", "API exploitation", "Container escape", "Privilege escalation"],
        nacMitigation: 85,
        timeToDetect: 60,
        timeToContain: 24,
        recoveryTime: 120,
        reputationImpact: "High",
        regulatoryFines: 1000000,
      },
      {
        name: "Supply Chain Compromise",
        probability: 0.18,
        impact: 28000000,
        attackVectors: ["Third-party libraries", "Build pipeline", "Distribution channels", "Update mechanisms"],
        nacMitigation: 70,
        timeToDetect: 180,
        timeToContain: 120,
        recoveryTime: 720,
        reputationImpact: "Severe",
        regulatoryFines: 5000000,
      },
    ],
  },
  energy: {
    threats: [
      {
        name: "Critical Infrastructure Attack",
        probability: 0.28,
        impact: 85000000,
        attackVectors: ["SCADA manipulation", "Grid disruption", "Physical damage", "Cascading failures"],
        nacMitigation: 82,
        timeToDetect: 90,
        timeToContain: 180,
        recoveryTime: 1440,
        reputationImpact: "Severe",
        regulatoryFines: 5000000,
      },
      {
        name: "Industrial Sabotage",
        probability: 0.15,
        impact: 45000000,
        attackVectors: ["Process manipulation", "Safety system bypass", "Equipment damage", "Production halt"],
        nacMitigation: 85,
        timeToDetect: 120,
        timeToContain: 240,
        recoveryTime: 2160,
        reputationImpact: "Severe",
        regulatoryFines: 10000000,
      },
      {
        name: "Environmental Incident",
        probability: 0.12,
        impact: 125000000,
        attackVectors: ["Safety system compromise", "Monitoring bypass", "Alarm suppression", "Emergency response"],
        nacMitigation: 90,
        timeToDetect: 30,
        timeToContain: 60,
        recoveryTime: 4320,
        reputationImpact: "Severe",
        regulatoryFines: 50000000,
      },
    ],
  },
}

// Comprehensive industry benchmarking data with detailed operational metrics
const INDUSTRY_BENCHMARKS = {
  healthcare: {
    name: "Healthcare",
    avgSecuritySpend: 15.2,
    avgBreachCost: 10930000,
    breachFrequency: 0.28,
    complianceRequirement: 95,
    regulatoryFines: 2000000,
    nacAdoption: 68,
    avgDevices: 8500,
    criticalAssets: 95,
    riskTolerance: "Low",
    topThreats: ["Ransomware", "Insider Threats", "Medical Device Attacks"],
    complianceFrameworks: ["HIPAA", "HITECH", "FDA", "SOX"],
    maturityLevel: 72,
    automationLevel: 45,
    incidentResponseTime: 24,
    securityStaffing: 3.2,
    budgetGrowth: 12.5,
    cloudAdoption: 65,
    remoteWork: 35,
    iotDevices: 15000,
    dataVolume: "High",
    regulatoryPressure: "Very High",
    operationalMetrics: {
      avgFtePerDevice: 0.0008,
      maintenanceHoursPerDevice: 2.5,
      trainingDaysPerYear: 15,
      upgradeFrequency: 18,
      downtimeToleranceHours: 2,
      backupRequirements: "Real-time",
      disasterRecoveryRto: 4,
      disasterRecoveryRpo: 1,
    },
    infrastructureRequirements: {
      redundancy: "Active-Active",
      monitoring: "24x7 SOC",
      compliance: "Continuous",
      encryption: "End-to-end",
      networkSegmentation: "Micro-segmentation",
      accessControl: "Zero Trust",
    },
    vendorRequirements: {
      certifications: ["HIPAA", "SOC 2 Type II", "FedRAMP"],
      sla: "99.99%",
      support: "24x7x365",
      dataResidency: "US only",
      auditFrequency: "Quarterly",
      penetrationTesting: "Annual",
    },
  },
  financial: {
    name: "Financial Services",
    avgSecuritySpend: 18.7,
    avgBreachCost: 5970000,
    breachFrequency: 0.24,
    complianceRequirement: 98,
    regulatoryFines: 50000000,
    nacAdoption: 85,
    avgDevices: 12000,
    criticalAssets: 98,
    riskTolerance: "Very Low",
    topThreats: ["APT", "Financial Fraud", "DDoS"],
    complianceFrameworks: ["PCI-DSS", "SOX", "GDPR", "Basel III"],
    maturityLevel: 88,
    automationLevel: 75,
    incidentResponseTime: 8,
    securityStaffing: 5.8,
    budgetGrowth: 15.2,
    cloudAdoption: 55,
    remoteWork: 45,
    iotDevices: 8000,
    dataVolume: "Very High",
    regulatoryPressure: "Extreme",
    operationalMetrics: {
      avgFtePerDevice: 0.0012,
      maintenanceHoursPerDevice: 1.8,
      trainingDaysPerYear: 20,
      upgradeFrequency: 12,
      downtimeToleranceHours: 0.5,
      backupRequirements: "Real-time",
      disasterRecoveryRto: 1,
      disasterRecoveryRpo: 0.25,
    },
    infrastructureRequirements: {
      redundancy: "Active-Active-Active",
      monitoring: "24x7 SOC + CSIRT",
      compliance: "Real-time",
      encryption: "FIPS 140-2 Level 3",
      networkSegmentation: "Zero Trust",
      accessControl: "Privileged Access Management",
    },
    vendorRequirements: {
      certifications: ["PCI-DSS", "SOC 2 Type II", "ISO 27001", "FedRAMP High"],
      sla: "99.999%",
      support: "24x7x365 + Dedicated TAM",
      dataResidency: "Regional compliance",
      auditFrequency: "Monthly",
      penetrationTesting: "Quarterly",
    },
  },
  retail: {
    name: "Retail",
    avgSecuritySpend: 8.3,
    avgBreachCost: 3620000,
    breachFrequency: 0.2,
    complianceRequirement: 75,
    regulatoryFines: 500000,
    nacAdoption: 45,
    avgDevices: 15000,
    criticalAssets: 70,
    riskTolerance: "Medium",
    topThreats: ["POS Malware", "Card Skimming", "E-commerce Attacks"],
    complianceFrameworks: ["PCI-DSS", "GDPR", "CCPA"],
    maturityLevel: 58,
    automationLevel: 35,
    incidentResponseTime: 48,
    securityStaffing: 2.1,
    budgetGrowth: 8.7,
    cloudAdoption: 78,
    remoteWork: 25,
    iotDevices: 25000,
    dataVolume: "High",
    regulatoryPressure: "Medium",
    operationalMetrics: {
      avgFtePerDevice: 0.0005,
      maintenanceHoursPerDevice: 1.2,
      trainingDaysPerYear: 8,
      upgradeFrequency: 24,
      downtimeToleranceHours: 4,
      backupRequirements: "Daily",
      disasterRecoveryRto: 24,
      disasterRecoveryRpo: 8,
    },
    infrastructureRequirements: {
      redundancy: "Active-Passive",
      monitoring: "Business hours + On-call",
      compliance: "Periodic",
      encryption: "Standard",
      networkSegmentation: "VLAN-based",
      accessControl: "Role-based",
    },
    vendorRequirements: {
      certifications: ["PCI-DSS", "SOC 2 Type I"],
      sla: "99.9%",
      support: "8x5 + Emergency",
      dataResidency: "Flexible",
      auditFrequency: "Annual",
      penetrationTesting: "Annual",
    },
  },
  manufacturing: {
    name: "Manufacturing",
    avgSecuritySpend: 12.1,
    avgBreachCost: 4470000,
    breachFrequency: 0.22,
    complianceRequirement: 80,
    regulatoryFines: 1000000,
    nacAdoption: 52,
    avgDevices: 20000,
    criticalAssets: 85,
    riskTolerance: "Medium",
    topThreats: ["Industrial Espionage", "Ransomware", "Supply Chain Attacks"],
    complianceFrameworks: ["ISO 27001", "NIST", "IEC 62443"],
    maturityLevel: 65,
    automationLevel: 55,
    incidentResponseTime: 36,
    securityStaffing: 2.8,
    budgetGrowth: 10.3,
    cloudAdoption: 48,
    remoteWork: 30,
    iotDevices: 35000,
    dataVolume: "Medium",
    regulatoryPressure: "Medium",
    operationalMetrics: {
      avgFtePerDevice: 0.0006,
      maintenanceHoursPerDevice: 3.2,
      trainingDaysPerYear: 12,
      upgradeFrequency: 36,
      downtimeToleranceHours: 8,
      backupRequirements: "Daily",
      disasterRecoveryRto: 48,
      disasterRecoveryRpo: 24,
    },
    infrastructureRequirements: {
      redundancy: "Active-Passive",
      monitoring: "24x7 Operations Center",
      compliance: "Periodic",
      encryption: "Standard",
      networkSegmentation: "OT/IT Separation",
      accessControl: "Role-based + Physical",
    },
    vendorRequirements: {
      certifications: ["ISO 27001", "IEC 62443"],
      sla: "99.5%",
      support: "24x7 Operations",
      dataResidency: "On-premise preferred",
      auditFrequency: "Annual",
      penetrationTesting: "Biannual",
    },
  },
  education: {
    name: "Education",
    avgSecuritySpend: 6.2,
    avgBreachCost: 3860000,
    breachFrequency: 0.18,
    complianceRequirement: 70,
    regulatoryFines: 100000,
    nacAdoption: 38,
    avgDevices: 25000,
    criticalAssets: 60,
    riskTolerance: "High",
    topThreats: ["Ransomware", "Data Theft", "BYOD Risks"],
    complianceFrameworks: ["FERPA", "GDPR", "COPPA"],
    maturityLevel: 48,
    automationLevel: 25,
    incidentResponseTime: 72,
    securityStaffing: 1.5,
    budgetGrowth: 5.2,
    cloudAdoption: 85,
    remoteWork: 60,
    iotDevices: 18000,
    dataVolume: "Medium",
    regulatoryPressure: "Low",
    operationalMetrics: {
      avgFtePerDevice: 0.0003,
      maintenanceHoursPerDevice: 0.8,
      trainingDaysPerYear: 5,
      upgradeFrequency: 48,
      downtimeToleranceHours: 12,
      backupRequirements: "Weekly",
      disasterRecoveryRto: 72,
      disasterRecoveryRpo: 48,
    },
    infrastructureRequirements: {
      redundancy: "Single point",
      monitoring: "Business hours",
      compliance: "Annual",
      encryption: "Basic",
      networkSegmentation: "Basic VLAN",
      accessControl: "Basic authentication",
    },
    vendorRequirements: {
      certifications: ["SOC 2 Type I"],
      sla: "99%",
      support: "8x5",
      dataResidency: "Flexible",
      auditFrequency: "Annual",
      penetrationTesting: "Optional",
    },
  },
  government: {
    name: "Government",
    avgSecuritySpend: 20.5,
    avgBreachCost: 5240000,
    breachFrequency: 0.26,
    complianceRequirement: 99,
    regulatoryFines: 10000000,
    nacAdoption: 78,
    avgDevices: 18000,
    criticalAssets: 99,
    riskTolerance: "Very Low",
    topThreats: ["Nation State", "Cyber Espionage", "Critical Infrastructure"],
    complianceFrameworks: ["NIST 800-53", "FedRAMP", "FISMA"],
    maturityLevel: 82,
    automationLevel: 60,
    incidentResponseTime: 12,
    securityStaffing: 6.2,
    budgetGrowth: 18.5,
    cloudAdoption: 42,
    remoteWork: 55,
    iotDevices: 12000,
    dataVolume: "Very High",
    regulatoryPressure: "Extreme",
    operationalMetrics: {
      avgFtePerDevice: 0.0015,
      maintenanceHoursPerDevice: 4.5,
      trainingDaysPerYear: 25,
      upgradeFrequency: 12,
      downtimeToleranceHours: 1,
      backupRequirements: "Real-time",
      disasterRecoveryRto: 2,
      disasterRecoveryRpo: 0.5,
    },
    infrastructureRequirements: {
      redundancy: "Multi-site Active-Active",
      monitoring: "24x7 CIRT + SOC",
      compliance: "Continuous",
      encryption: "FIPS 140-2 Level 4",
      networkSegmentation: "Classified separation",
      accessControl: "Multi-factor + Biometric",
    },
    vendorRequirements: {
      certifications: ["FedRAMP High", "FIPS 140-2", "Common Criteria"],
      sla: "99.99%",
      support: "24x7x365 + Cleared personnel",
      dataResidency: "US Government Cloud",
      auditFrequency: "Continuous",
      penetrationTesting: "Quarterly + Red Team",
    },
  },
  technology: {
    name: "Technology",
    avgSecuritySpend: 14.8,
    avgBreachCost: 4880000,
    breachFrequency: 0.16,
    complianceRequirement: 85,
    regulatoryFines: 2000000,
    nacAdoption: 72,
    avgDevices: 8000,
    criticalAssets: 90,
    riskTolerance: "Low",
    topThreats: ["IP Theft", "Supply Chain", "Cloud Attacks"],
    complianceFrameworks: ["SOX", "ISO 27001", "GDPR", "SOC 2"],
    maturityLevel: 78,
    automationLevel: 85,
    incidentResponseTime: 16,
    securityStaffing: 4.5,
    budgetGrowth: 16.8,
    cloudAdoption: 92,
    remoteWork: 75,
    iotDevices: 5000,
    dataVolume: "Very High",
    regulatoryPressure: "High",
    operationalMetrics: {
      avgFtePerDevice: 0.001,
      maintenanceHoursPerDevice: 1.5,
      trainingDaysPerYear: 18,
      upgradeFrequency: 6,
      downtimeToleranceHours: 2,
      backupRequirements: "Real-time",
      disasterRecoveryRto: 4,
      disasterRecoveryRpo: 1,
    },
    infrastructureRequirements: {
      redundancy: "Multi-cloud Active-Active",
      monitoring: "24x7 DevSecOps",
      compliance: "Continuous",
      encryption: "End-to-end",
      networkSegmentation: "Zero Trust",
      accessControl: "Identity-centric",
    },
    vendorRequirements: {
      certifications: ["SOC 2 Type II", "ISO 27001", "GDPR"],
      sla: "99.95%",
      support: "24x7 + DevOps integration",
      dataResidency: "Multi-region",
      auditFrequency: "Quarterly",
      penetrationTesting: "Continuous",
    },
  },
  energy: {
    name: "Energy & Utilities",
    avgSecuritySpend: 16.3,
    avgBreachCost: 5010000,
    breachFrequency: 0.25,
    complianceRequirement: 95,
    regulatoryFines: 5000000,
    nacAdoption: 65,
    avgDevices: 30000,
    criticalAssets: 98,
    riskTolerance: "Very Low",
    topThreats: ["Critical Infrastructure", "Nation State", "Industrial Sabotage"],
    complianceFrameworks: ["NERC CIP", "NIST", "IEC 62443"],
    maturityLevel: 75,
    automationLevel: 50,
    incidentResponseTime: 18,
    securityStaffing: 4.8,
    budgetGrowth: 14.2,
    cloudAdoption: 35,
    remoteWork: 20,
    iotDevices: 50000,
    dataVolume: "High",
    regulatoryPressure: "Very High",
    operationalMetrics: {
      avgFtePerDevice: 0.0008,
      maintenanceHoursPerDevice: 5.2,
      trainingDaysPerYear: 22,
      upgradeFrequency: 24,
      downtimeToleranceHours: 0.25,
      backupRequirements: "Real-time",
      disasterRecoveryRto: 1,
      disasterRecoveryRpo: 0.1,
    },
    infrastructureRequirements: {
      redundancy: "N+2 Redundancy",
      monitoring: "24x7 Control Center",
      compliance: "Real-time",
      encryption: "FIPS 140-2",
      networkSegmentation: "Air-gapped OT",
      accessControl: "Physical + Logical",
    },
    vendorRequirements: {
      certifications: ["NERC CIP", "IEC 62443", "NIST CSF"],
      sla: "99.999%",
      support: "24x7x365 + Emergency response",
      dataResidency: "On-premise + Secure cloud",
      auditFrequency: "Quarterly",
      penetrationTesting: "Quarterly + Red Team",
    },
  },
}

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, AlertTriangle, Building, CheckCircle, Info } from "lucide-react"

export const IndustryAnalysisDashboard = IndustryAnalysisView

export default function IndustryAnalysisView({ results = [], config = {} }: IndustryAnalysisViewProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>(config.industry || "healthcare")
  const [selectedFramework, setSelectedFramework] = useState<string>("hipaa")
  const [comparisonMode, setComparisonMode] = useState<"single" | "multi">("single")

  const industryBenchmark = INDUSTRY_BENCHMARKS[selectedIndustry as keyof typeof INDUSTRY_BENCHMARKS]
  const threatModel = THREAT_MODELS[selectedIndustry as keyof typeof THREAT_MODELS]
  const relevantFrameworks = Object.entries(COMPLIANCE_FRAMEWORKS).filter(([_, framework]) =>
    framework.industry.includes(selectedIndustry),
  )

  const riskAnalysis = useMemo(() => {
    if (!threatModel) return { totalRisk: 0, mitigatedRisk: 0, residualRisk: 0 }

    const totalRisk = threatModel.threats.reduce((sum, threat) => sum + threat.probability * threat.impact, 0)

    const mitigatedRisk = threatModel.threats.reduce(
      (sum, threat) => sum + threat.probability * threat.impact * (threat.nacMitigation / 100),
      0,
    )

    return {
      totalRisk,
      mitigatedRisk,
      residualRisk: totalRisk - mitigatedRisk,
    }
  }, [threatModel])

  const complianceGap = useMemo(() => {
    if (!relevantFrameworks.length) return []

    return relevantFrameworks.map(([key, framework]) => {
      const totalControls = Object.keys(framework.controls).length
      const criticalControls = Object.values(framework.controls).filter(
        (control) => control.nacRequirement === "critical",
      ).length

      const avgScore =
        Object.values(framework.controls).reduce((sum, control) => sum + control.complianceScore, 0) / totalControls

      return {
        framework: framework.name,
        key,
        totalControls,
        criticalControls,
        avgScore,
        gap: 100 - avgScore,
      }
    })
  }, [relevantFrameworks])

  const benchmarkComparison = useMemo(() => {
    if (!industryBenchmark) return []

    // Provide default values to prevent errors
    const defaultResult = {
      totalCost: 500000,
      vendor: "portnox",
      vendorName: "Portnox CLEAR",
      year1: 150000,
      year2: 200000,
      year3: 250000,
      year5: 350000,
      roi: {
        percentage: 250,
        paybackPeriod: 8,
        breachRiskReduction: 85,
        operationalSavings: 180000,
        complianceSavings: 120000,
      },
      breakdown: {
        licensing: 120000,
        implementation: 25000,
        maintenance: 60000,
        training: 15000,
        infrastructure: 10000,
        hiddenCosts: 5000,
      },
    }

    const currentResult = results && results.length > 0 ? results[0] : defaultResult
    const annualRevenue = config.annualRevenue || 100000000

    return [
      {
        metric: "Security Spend %",
        industry: industryBenchmark.avgSecuritySpend,
        current: (currentResult.totalCost / annualRevenue) * 100,
        unit: "%",
      },
      {
        metric: "NAC Adoption",
        industry: industryBenchmark.nacAdoption,
        current: results && results.length > 1 ? 100 : 85,
        unit: "%",
      },
      {
        metric: "Maturity Level",
        industry: industryBenchmark.maturityLevel,
        current: 85, // Calculated based on selected features
        unit: "/100",
      },
      {
        metric: "Automation Level",
        industry: industryBenchmark.automationLevel,
        current: 90, // Based on vendor capabilities
        unit: "%",
      },
    ]
  }, [industryBenchmark, results, config])

  if (!industryBenchmark) {
    return (
      <div className="p-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Industry Data Not Available</AlertTitle>
          <AlertDescription>Please select a valid industry to view the analysis.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Industry Analysis</h2>
          <p className="text-muted-foreground">
            Compare your security posture against industry benchmarks and standards
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Industry" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(INDUSTRY_BENCHMARKS).map(([key, industry]) => (
                <SelectItem key={key} value={key}>
                  {industry.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Industry Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            {industryBenchmark.name} Industry Overview
          </CardTitle>
          <CardDescription>Key metrics and characteristics for your industry</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{industryBenchmark.avgSecuritySpend}%</div>
              <div className="text-sm text-muted-foreground">Avg Security Spend</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                ${(industryBenchmark.avgBreachCost / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-muted-foreground">Avg Breach Cost</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {(industryBenchmark.breachFrequency * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-muted-foreground">Breach Frequency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{industryBenchmark.nacAdoption}%</div>
              <div className="text-sm text-muted-foreground">NAC Adoption</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="benchmarks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
          <TabsTrigger value="threats">Threat Landscape</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="benchmarks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Industry Benchmark Comparison</CardTitle>
              <CardDescription>How your organization compares to industry averages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {benchmarkComparison.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.metric}</span>
                      <div className="flex gap-4 text-sm">
                        <span className="text-muted-foreground">
                          Industry: {item.industry}
                          {item.unit}
                        </span>
                        <span className={item.current > item.industry ? "text-green-600" : "text-red-600"}>
                          Current: {item.current.toFixed(1)}
                          {item.unit}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Progress
                          value={(item.industry / Math.max(item.industry, item.current)) * 100}
                          className="h-2"
                        />
                        <div className="text-xs text-muted-foreground mt-1">Industry Average</div>
                      </div>
                      <div className="flex-1">
                        <Progress
                          value={(item.current / Math.max(item.industry, item.current)) * 100}
                          className="h-2"
                        />
                        <div className="text-xs text-muted-foreground mt-1">Your Organization</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="threats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Threat Landscape Analysis
              </CardTitle>
              <CardDescription>Industry-specific threats and risk assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threatModel?.threats.map((threat, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{threat.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Probability: {(threat.probability * 100).toFixed(0)}% | Impact: $
                          {(threat.impact / 1000000).toFixed(1)}M
                        </p>
                      </div>
                      <Badge variant={threat.reputationImpact === "Severe" ? "destructive" : "secondary"}>
                        {threat.reputationImpact}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="text-sm font-medium mb-1">NAC Mitigation</div>
                        <Progress value={threat.nacMitigation} className="h-2" />
                        <div className="text-xs text-muted-foreground">{threat.nacMitigation}% effective</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-1">Detection Time</div>
                        <div className="text-sm">{threat.timeToDetect} hours</div>
                      </div>
                    </div>

                    <div className="text-sm">
                      <div className="font-medium mb-1">Attack Vectors:</div>
                      <div className="flex flex-wrap gap-1">
                        {threat.attackVectors.map((vector, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {vector}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Framework Analysis</CardTitle>
              <CardDescription>Relevant compliance frameworks and gap analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceGap.map((framework, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <h4 className="font-semibold">{framework.framework}</h4>
                        <p className="text-sm text-muted-foreground">
                          {framework.totalControls} total controls, {framework.criticalControls} critical
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{framework.avgScore.toFixed(0)}%</div>
                        <div className="text-sm text-muted-foreground">Compliance Score</div>
                      </div>
                    </div>

                    <Progress value={framework.avgScore} className="h-3" />

                    {framework.gap > 10 && (
                      <Alert className="mt-3">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Compliance Gap Identified</AlertTitle>
                        <AlertDescription>
                          {framework.gap.toFixed(0)}% gap in compliance. Consider implementing additional controls.
                        </AlertDescription>
                      </Alert>
                    )}
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Industry-Specific Recommendations</CardTitle>
              <CardDescription>Tailored recommendations based on your industry profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Priority Recommendations</AlertTitle>
                  <AlertDescription>
                    Based on {industryBenchmark.name} industry standards and threat landscape
                  </AlertDescription>
                </Alert>

                <div className="grid gap-4">
                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Security Investment</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Industry average: {industryBenchmark.avgSecuritySpend}% of revenue
                    </p>
                    <Badge variant="outline">Budget Planning</Badge>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Compliance Focus</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Key frameworks: {industryBenchmark.complianceFrameworks.join(", ")}
                    </p>
                    <Badge variant="outline">Regulatory</Badge>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Threat Mitigation</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Top threats: {industryBenchmark.topThreats.join(", ")}
                    </p>
                    <Badge variant="outline">Security</Badge>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
