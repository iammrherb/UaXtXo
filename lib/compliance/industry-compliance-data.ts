export interface ComplianceControl {
  id: string;
  name: string;
  description: string;
  nacRequirement: 'critical' | 'important' | 'beneficial';
  nacCapabilities: string[];
}

export interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  controls: ComplianceControl[];
  penalties: {
    maxFine: number;
    revenuePercentage?: number;
    description: string;
  };
  auditFrequency: 'annual' | 'biannual' | 'continuous';
}

export interface IndustryRiskProfile {
  dataBreachCost: number;
  breachProbability: number;
  regulatoryExposure: 'high' | 'medium' | 'low';
  cyberInsuranceRequirements: {
    minimumCoverage: number;
    typicalPremium: number;
    nacDiscountAvailable: number;
  };
  threatLandscape: {
    externalThreats: number; // 0-100
    insiderThreats: number; // 0-100
    supplyChainRisks: number; // 0-100
    ransomwareRisk: number; // 0-100
  };
}

export interface IndustryCompliance {
  industry: string;
  description: string;
  frameworks: ComplianceFramework[];
  riskProfile: IndustryRiskProfile;
  nacBenefits: {
    complianceCoverage: number; // percentage
    auditSimplification: number; // percentage reduction in audit time
    incidentReduction: number; // percentage
  };
  criticalUseCases: string[];
}

// Comprehensive compliance frameworks database
export const complianceFrameworks: Record<string, ComplianceFramework> = {
  hipaa: {
    id: 'hipaa',
    name: 'HIPAA (Health Insurance Portability and Accountability Act)',
    description: 'U.S. healthcare data protection regulation',
    controls: [
      {
        id: '164.308(a)(1)',
        name: 'Security Management Process',
        description: 'Implement policies and procedures to prevent, detect, contain, and correct security violations',
        nacRequirement: 'critical',
        nacCapabilities: ['Risk assessment', 'Policy enforcement', 'Incident detection']
      },
      {
        id: '164.308(a)(3)',
        name: 'Workforce Security',
        description: 'Implement procedures for authorization and/or supervision of workforce members who work with ePHI',
        nacRequirement: 'critical',
        nacCapabilities: ['Role-based access', 'User authentication', 'Session monitoring']
      },
      {
        id: '164.308(a)(4)',
        name: 'Information Access Management',
        description: 'Implement policies and procedures for authorizing access to ePHI',
        nacRequirement: 'critical',
        nacCapabilities: ['Access control', 'Least privilege', 'Access reviews']
      },
      {
        id: '164.310(a)',
        name: 'Facility Access Controls',
        description: 'Implement physical safeguards for all workstations that access ePHI',
        nacRequirement: 'important',
        nacCapabilities: ['Device authentication', 'Location-based access', 'Physical security integration']
      },
      {
        id: '164.312(a)',
        name: 'Access Control',
        description: 'Implement technical policies and procedures for electronic information systems',
        nacRequirement: 'critical',
        nacCapabilities: ['Unique user identification', 'Automatic logoff', 'Encryption']
      },
      {
        id: '164.312(b)',
        name: 'Audit Controls',
        description: 'Implement hardware, software, and/or procedural mechanisms to record and examine activity',
        nacRequirement: 'critical',
        nacCapabilities: ['Activity logging', 'Log analysis', 'Audit trails']
      }
    ],
    penalties: {
      maxFine: 2000000,
      description: 'Per violation category per year, with criminal penalties possible'
    },
    auditFrequency: 'continuous'
  },

  pci_dss: {
    id: 'pci_dss',
    name: 'PCI-DSS (Payment Card Industry Data Security Standard)',
    description: 'Global standard for organizations that handle credit card data',
    controls: [
      {
        id: '1.1',
        name: 'Network Segmentation',
        description: 'Establish and implement firewall and router configuration standards',
        nacRequirement: 'critical',
        nacCapabilities: ['Network segmentation', 'VLAN assignment', 'Micro-segmentation']
      },
      {
        id: '2.1',
        name: 'Default Credentials',
        description: 'Always change vendor-supplied defaults and remove unnecessary default accounts',
        nacRequirement: 'critical',
        nacCapabilities: ['Credential management', 'Default detection', 'Enforcement policies']
      },
      {
        id: '7.1',
        name: 'Access Control',
        description: 'Limit access to system components and cardholder data to only those individuals whose job requires such access',
        nacRequirement: 'critical',
        nacCapabilities: ['Role-based access', 'Need-to-know enforcement', 'Access certification']
      },
      {
        id: '8.1',
        name: 'User Identification',
        description: 'Assign all users a unique ID before allowing them to access system components',
        nacRequirement: 'critical',
        nacCapabilities: ['Identity management', 'Unique authentication', 'User lifecycle']
      },
      {
        id: '10.1',
        name: 'Audit Trails',
        description: 'Implement audit trails to link all access to system components to each individual user',
        nacRequirement: 'critical',
        nacCapabilities: ['Comprehensive logging', 'User attribution', 'Log integrity']
      },
      {
        id: '11.1',
        name: 'Wireless Detection',
        description: 'Test for the presence of wireless access points and detect unauthorized wireless access points',
        nacRequirement: 'important',
        nacCapabilities: ['Rogue device detection', 'Wireless monitoring', 'Automated response']
      }
    ],
    penalties: {
      maxFine: 500000,
      description: 'Per incident, plus potential loss of card processing privileges'
    },
    auditFrequency: 'annual'
  },

  gdpr: {
    id: 'gdpr',
    name: 'GDPR (General Data Protection Regulation)',
    description: 'EU data protection and privacy regulation',
    controls: [
      {
        id: 'Article 25',
        name: 'Data Protection by Design',
        description: 'Implement appropriate technical and organizational measures',
        nacRequirement: 'critical',
        nacCapabilities: ['Privacy controls', 'Data minimization', 'Access restrictions']
      },
      {
        id: 'Article 32',
        name: 'Security of Processing',
        description: 'Implement appropriate technical and organizational measures to ensure security',
        nacRequirement: 'critical',
        nacCapabilities: ['Encryption', 'Access control', 'Integrity monitoring']
      },
      {
        id: 'Article 33',
        name: 'Breach Notification',
        description: 'Notify supervisory authority of personal data breach within 72 hours',
        nacRequirement: 'important',
        nacCapabilities: ['Incident detection', 'Automated alerting', 'Forensic capabilities']
      },
      {
        id: 'Article 35',
        name: 'Data Protection Impact Assessment',
        description: 'Assess and mitigate risks to rights and freedoms of natural persons',
        nacRequirement: 'beneficial',
        nacCapabilities: ['Risk assessment', 'Impact analysis', 'Control effectiveness']
      }
    ],
    penalties: {
      maxFine: 20000000,
      revenuePercentage: 4,
      description: 'Higher of €20M or 4% of global annual revenue'
    },
    auditFrequency: 'continuous'
  },

  sox: {
    id: 'sox',
    name: 'SOX (Sarbanes-Oxley Act)',
    description: 'U.S. federal law for corporate financial reporting',
    controls: [
      {
        id: 'Section 302',
        name: 'Corporate Responsibility',
        description: 'CEOs and CFOs must certify financial reports',
        nacRequirement: 'important',
        nacCapabilities: ['Access logging', 'Change tracking', 'Audit trails']
      },
      {
        id: 'Section 404',
        name: 'Internal Controls',
        description: 'Assess effectiveness of internal control structure',
        nacRequirement: 'critical',
        nacCapabilities: ['Access control', 'Segregation of duties', 'Control monitoring']
      },
      {
        id: 'Section 802',
        name: 'Records Retention',
        description: 'Criminal penalties for altering, destroying, or falsifying records',
        nacRequirement: 'important',
        nacCapabilities: ['Log integrity', 'Tamper protection', 'Long-term retention']
      }
    ],
    penalties: {
      maxFine: 5000000,
      description: 'Plus up to 20 years imprisonment for violations'
    },
    auditFrequency: 'annual'
  },

  nist_800_53: {
    id: 'nist_800_53',
    name: 'NIST 800-53',
    description: 'Security and privacy controls for federal information systems',
    controls: [
      {
        id: 'AC-2',
        name: 'Account Management',
        description: 'Manage information system accounts',
        nacRequirement: 'critical',
        nacCapabilities: ['Account lifecycle', 'Automated provisioning', 'Access reviews']
      },
      {
        id: 'AC-3',
        name: 'Access Enforcement',
        description: 'Enforce approved authorizations for logical access',
        nacRequirement: 'critical',
        nacCapabilities: ['Policy enforcement', 'Attribute-based access', 'Dynamic authorization']
      },
      {
        id: 'AC-4',
        name: 'Information Flow Enforcement',
        description: 'Control information flows within the system',
        nacRequirement: 'critical',
        nacCapabilities: ['Flow control', 'Data classification', 'Boundary protection']
      },
      {
        id: 'IA-2',
        name: 'Identification and Authentication',
        description: 'Uniquely identify and authenticate organizational users',
        nacRequirement: 'critical',
        nacCapabilities: ['Multi-factor authentication', 'Strong authentication', 'Identity proofing']
      },
      {
        id: 'AU-2',
        name: 'Audit Events',
        description: 'Determine that the information system is capable of auditing',
        nacRequirement: 'critical',
        nacCapabilities: ['Comprehensive logging', 'Event correlation', 'Real-time monitoring']
      }
    ],
    penalties: {
      maxFine: 500000,
      description: 'Varies by agency and severity'
    },
    auditFrequency: 'continuous'
  },

  iso_27001: {
    id: 'iso_27001',
    name: 'ISO 27001',
    description: 'International standard for information security management',
    controls: [
      {
        id: 'A.9.1',
        name: 'Access Control Policy',
        description: 'Establish, document and review access control policy',
        nacRequirement: 'critical',
        nacCapabilities: ['Policy management', 'Access governance', 'Regular reviews']
      },
      {
        id: 'A.9.2',
        name: 'User Access Management',
        description: 'Ensure authorized user access and prevent unauthorized access',
        nacRequirement: 'critical',
        nacCapabilities: ['User provisioning', 'Access certification', 'Privilege management']
      },
      {
        id: 'A.9.4',
        name: 'System and Application Access Control',
        description: 'Prevent unauthorized access to systems and applications',
        nacRequirement: 'critical',
        nacCapabilities: ['Application control', 'API security', 'Service authentication']
      },
      {
        id: 'A.12.4',
        name: 'Logging and Monitoring',
        description: 'Record events and generate evidence',
        nacRequirement: 'critical',
        nacCapabilities: ['Event logging', 'Log analysis', 'Security monitoring']
      }
    ],
    penalties: {
      maxFine: 0,
      description: 'Loss of certification and business impact'
    },
    auditFrequency: 'annual'
  }
};

// Industry-specific compliance and risk profiles
export const industryComplianceData: Record<string, IndustryCompliance> = {
  healthcare: {
    industry: 'Healthcare',
    description: 'Hospitals, clinics, insurance companies, and healthcare technology providers',
    frameworks: [
      complianceFrameworks.hipaa,
      complianceFrameworks.gdpr,
      complianceFrameworks.iso_27001
    ],
    riskProfile: {
      dataBreachCost: 10930000,
      breachProbability: 0.28,
      regulatoryExposure: 'high',
      cyberInsuranceRequirements: {
        minimumCoverage: 10000000,
        typicalPremium: 250000,
        nacDiscountAvailable: 30
      },
      threatLandscape: {
        externalThreats: 85,
        insiderThreats: 70,
        supplyChainRisks: 75,
        ransomwareRisk: 95
      }
    },
    nacBenefits: {
      complianceCoverage: 92,
      auditSimplification: 65,
      incidentReduction: 78
    },
    criticalUseCases: [
      'Medical device security and segmentation',
      'Electronic Health Record (EHR) access control',
      'Guest and patient WiFi isolation',
      'Telehealth endpoint security',
      'IoMT device management',
      'Privileged access for medical staff'
    ]
  },

  financial_services: {
    industry: 'Financial Services',
    description: 'Banks, credit unions, insurance companies, investment firms',
    frameworks: [
      complianceFrameworks.pci_dss,
      complianceFrameworks.sox,
      complianceFrameworks.gdpr,
      complianceFrameworks.iso_27001
    ],
    riskProfile: {
      dataBreachCost: 5970000,
      breachProbability: 0.24,
      regulatoryExposure: 'high',
      cyberInsuranceRequirements: {
        minimumCoverage: 25000000,
        typicalPremium: 400000,
        nacDiscountAvailable: 25
      },
      threatLandscape: {
        externalThreats: 95,
        insiderThreats: 80,
        supplyChainRisks: 70,
        ransomwareRisk: 85
      }
    },
    nacBenefits: {
      complianceCoverage: 88,
      auditSimplification: 70,
      incidentReduction: 82
    },
    criticalUseCases: [
      'ATM and kiosk network security',
      'Trading floor access control',
      'Customer data protection',
      'Branch network segmentation',
      'Third-party vendor access',
      'Privileged user monitoring'
    ]
  },

  retail: {
    industry: 'Retail',
    description: 'Physical stores, e-commerce, hospitality, restaurants',
    frameworks: [
      complianceFrameworks.pci_dss,
      complianceFrameworks.gdpr,
      complianceFrameworks.iso_27001
    ],
    riskProfile: {
      dataBreachCost: 3620000,
      breachProbability: 0.20,
      regulatoryExposure: 'medium',
      cyberInsuranceRequirements: {
        minimumCoverage: 5000000,
        typicalPremium: 150000,
        nacDiscountAvailable: 20
      },
      threatLandscape: {
        externalThreats: 80,
        insiderThreats: 65,
        supplyChainRisks: 60,
        ransomwareRisk: 75
      }
    },
    nacBenefits: {
      complianceCoverage: 85,
      auditSimplification: 60,
      incidentReduction: 72
    },
    criticalUseCases: [
      'POS system security',
      'Guest WiFi management',
      'Store network segmentation',
      'Inventory system access',
      'Vendor and contractor access',
      'BYOD for store employees'
    ]
  },

  manufacturing: {
    industry: 'Manufacturing',
    description: 'Industrial manufacturing, automotive, aerospace, pharmaceuticals',
    frameworks: [
      complianceFrameworks.iso_27001,
      complianceFrameworks.nist_800_53
    ],
    riskProfile: {
      dataBreachCost: 4470000,
      breachProbability: 0.22,
      regulatoryExposure: 'medium',
      cyberInsuranceRequirements: {
        minimumCoverage: 10000000,
        typicalPremium: 200000,
        nacDiscountAvailable: 22
      },
      threatLandscape: {
        externalThreats: 75,
        insiderThreats: 60,
        supplyChainRisks: 85,
        ransomwareRisk: 80
      }
    },
    nacBenefits: {
      complianceCoverage: 78,
      auditSimplification: 55,
      incidentReduction: 75
    },
    criticalUseCases: [
      'OT/IT network segmentation',
      'Industrial IoT security',
      'Supply chain partner access',
      'Intellectual property protection',
      'Production system isolation',
      'Remote maintenance access'
    ]
  },

  education: {
    industry: 'Education',
    description: 'K-12 schools, universities, research institutions',
    frameworks: [
      complianceFrameworks.gdpr,
      complianceFrameworks.iso_27001
    ],
    riskProfile: {
      dataBreachCost: 3860000,
      breachProbability: 0.18,
      regulatoryExposure: 'low',
      cyberInsuranceRequirements: {
        minimumCoverage: 5000000,
        typicalPremium: 100000,
        nacDiscountAvailable: 18
      },
      threatLandscape: {
        externalThreats: 70,
        insiderThreats: 55,
        supplyChainRisks: 50,
        ransomwareRisk: 85
      }
    },
    nacBenefits: {
      complianceCoverage: 75,
      auditSimplification: 50,
      incidentReduction: 68
    },
    criticalUseCases: [
      'Student and faculty BYOD',
      'Research network isolation',
      'Guest and visitor access',
      'Campus-wide WiFi security',
      'Library and lab access',
      'Remote learning security'
    ]
  },

  government: {
    industry: 'Government',
    description: 'Federal, state, and local government agencies',
    frameworks: [
      complianceFrameworks.nist_800_53,
      complianceFrameworks.iso_27001
    ],
    riskProfile: {
      dataBreachCost: 5240000,
      breachProbability: 0.26,
      regulatoryExposure: 'high',
      cyberInsuranceRequirements: {
        minimumCoverage: 20000000,
        typicalPremium: 300000,
        nacDiscountAvailable: 28
      },
      threatLandscape: {
        externalThreats: 95,
        insiderThreats: 75,
        supplyChainRisks: 80,
        ransomwareRisk: 90
      }
    },
    nacBenefits: {
      complianceCoverage: 90,
      auditSimplification: 68,
      incidentReduction: 80
    },
    criticalUseCases: [
      'Classified network separation',
      'Citizen service portals',
      'Inter-agency collaboration',
      'Critical infrastructure protection',
      'Emergency response systems',
      'Public WiFi services'
    ]
  },

  technology: {
    industry: 'Technology',
    description: 'Software companies, SaaS providers, tech startups',
    frameworks: [
      complianceFrameworks.sox,
      complianceFrameworks.iso_27001,
      complianceFrameworks.gdpr
    ],
    riskProfile: {
      dataBreachCost: 4880000,
      breachProbability: 0.16,
      regulatoryExposure: 'medium',
      cyberInsuranceRequirements: {
        minimumCoverage: 15000000,
        typicalPremium: 180000,
        nacDiscountAvailable: 24
      },
      threatLandscape: {
        externalThreats: 85,
        insiderThreats: 70,
        supplyChainRisks: 65,
        ransomwareRisk: 70
      }
    },
    nacBenefits: {
      complianceCoverage: 82,
      auditSimplification: 62,
      incidentReduction: 76
    },
    criticalUseCases: [
      'Development environment security',
      'Production system access',
      'API and service authentication',
      'Customer data isolation',
      'Remote workforce security',
      'DevOps pipeline protection'
    ]
  },

  energy_utilities: {
    industry: 'Energy & Utilities',
    description: 'Power generation, oil & gas, water treatment, renewable energy',
    frameworks: [
      complianceFrameworks.nist_800_53,
      complianceFrameworks.iso_27001
    ],
    riskProfile: {
      dataBreachCost: 5010000,
      breachProbability: 0.25,
      regulatoryExposure: 'high',
      cyberInsuranceRequirements: {
        minimumCoverage: 20000000,
        typicalPremium: 350000,
        nacDiscountAvailable: 26
      },
      threatLandscape: {
        externalThreats: 90,
        insiderThreats: 65,
        supplyChainRisks: 75,
        ransomwareRisk: 88
      }
    },
    nacBenefits: {
      complianceCoverage: 86,
      auditSimplification: 64,
      incidentReduction: 79
    },
    criticalUseCases: [
      'SCADA system protection',
      'Critical infrastructure segmentation',
      'Field device security',
      'Vendor and contractor access',
      'Control room authentication',
      'Smart grid security'
    ]
  }
};

// Calculate compliance score for a vendor
export function calculateComplianceScore(
  vendor: string, // Vendor ID, not used in this simplified version but good for future extension
  framework: ComplianceFramework,
  vendorCapabilities: string[] // Abstract list of what the vendor can do
): {
  score: number;
  coveredControls: string[];
  gaps: string[];
} {
  const coveredControls: string[] = [];
  const gaps: string[] = [];

  framework.controls.forEach(control => {
    // Simplified: check if any of the NAC capabilities for a control are met by the vendor
    // In a real scenario, vendorCapabilities would be a more structured object/map
    const isCovered = control.nacCapabilities.some(cap =>
        vendorCapabilities.some(vCap => vCap.toLowerCase().includes(cap.toLowerCase()))
    );

    if (isCovered) {
      coveredControls.push(control.id);
    } else if (control.nacRequirement === 'critical') {
      gaps.push(`${control.id}: ${control.name} (Requires: ${control.nacCapabilities.join(', ')})`);
    }
  });

  const criticalControls = framework.controls.filter(c => c.nacRequirement === 'critical');
  const importantControls = framework.controls.filter(c => c.nacRequirement === 'important');

  let criticalCoverage = 0;
  if (criticalControls.length > 0) {
    criticalCoverage = coveredControls.filter(id =>
      criticalControls.some(c => c.id === id)
    ).length / criticalControls.length;
  } else {
    criticalCoverage = 1; // If no critical controls, 100% covered for this part
  }

  let importantCoverage = 0;
  if (importantControls.length > 0) {
    importantCoverage = coveredControls.filter(id =>
      importantControls.some(c => c.id === id)
    ).length / importantControls.length;
  } else {
    importantCoverage = 1; // If no important controls, 100% covered
  }

  const score = (criticalCoverage * 0.7 + importantCoverage * 0.3) * 100;

  return {
    score: Math.round(score),
    coveredControls,
    gaps
  };
}

// Calculate potential cost savings from compliance
export function calculateComplianceSavings(
  industryData: IndustryCompliance, // Changed from IndustryCompliance to industryData for clarity
  vendorOverallComplianceScore: number // A single score representing vendor's overall compliance ability (0-100)
): {
  penaltyReduction: number;
  auditCostSavings: number;
  insuranceSavings: number;
  totalSavings: number;
} {
  // Calculate potential penalty avoidance
  // Consider the highest potential fine among the relevant frameworks for the industry
  const maxPenalty = Math.max(...industryData.frameworks.map(f => f.penalties.maxFine));
  // Simplified: assume penalty risk is proportional to (100 - complianceScore)
  // And a 10% annual probability of such a penalty occurring if not compliant.
  const penaltyReductionFactor = vendorOverallComplianceScore / 100;
  const penaltyReduction = maxPenalty * penaltyReductionFactor * 0.1;

  // Audit cost savings
  // Assume a base audit cost per framework and savings based on NAC's simplification benefits
  const baseAuditCostPerFramework = 50000; // Example base cost
  const totalBaseAuditCost = baseAuditCostPerFramework * industryData.frameworks.length;
  const auditCostSavings = totalBaseAuditCost * (industryData.nacBenefits.auditSimplification / 100);

  // Insurance premium reduction
  const insuranceSavings = industryData.riskProfile.cyberInsuranceRequirements.typicalPremium *
    (industryData.riskProfile.cyberInsuranceRequirements.nacDiscountAvailable / 100) *
    (vendorOverallComplianceScore / 100); // Prorate discount by compliance score

  return {
    penaltyReduction,
    auditCostSavings,
    insuranceSavings,
    totalSavings: penaltyReduction + auditCostSavings + insuranceSavings
  };
}

// Zero Trust maturity assessment
export interface ZeroTrustMaturity {
  identityVerification: number; // 0-100
  deviceSecurity: number; // 0-100
  networkSegmentation: number; // 0-100
  applicationSecurity: number; // 0-100
  dataProtection: number; // 0-100
  visibilityAnalytics: number; // 0-100
  automationOrchestration: number; // 0-100
  overallMaturity: number; // 0-100
}

// A more detailed mapping of vendor features to Zero Trust capabilities
const zeroTrustCapabilityMapping = {
  identityVerification: { mfa: 30, continuous_verification: 40, risk_based_auth: 30, 'Unique user identification': 20, 'Identity management': 15 },
  deviceSecurity: { device_compliance: 35, device_trust: 35, endpoint_detection: 30, 'Device authentication': 25, 'Posture Assessment': 20 },
  networkSegmentation: { micro_segmentation: 40, dynamic_vlan: 30, software_defined_perimeter: 30, 'Network segmentation': 25, 'Flow control': 15 },
  applicationSecurity: { app_control: 35, api_security: 35, saml_oauth: 30, 'Application control': 20 },
  dataProtection: { encryption: 35, dlp_integration: 35, data_classification: 30 },
  visibilityAnalytics: { behavior_analytics: 35, threat_intelligence: 35, real_time_monitoring: 30, 'Activity logging': 20, 'Log analysis': 20 },
  automationOrchestration: { automated_response: 35, policy_automation: 35, workflow_integration: 30, 'Policy enforcement': 25 }
};


export function assessZeroTrustMaturity(vendorFeatures: Record<string, boolean | string[] | object>): ZeroTrustMaturity {
  const scores: Record<keyof ZeroTrustMaturity, number> = {
    identityVerification: 0,
    deviceSecurity: 0,
    networkSegmentation: 0,
    applicationSecurity: 0,
    dataProtection: 0,
    visibilityAnalytics: 0,
    automationOrchestration: 0,
    overallMaturity: 0 // Will be calculated
  };

  // Helper to check if a feature is present and true (for boolean features)
  const hasFeature = (featureName: string) => !!vendorFeatures[featureName];

  for (const pillar in zeroTrustCapabilityMapping) {
    let pillarScore = 0;
    const capabilities = zeroTrustCapabilityMapping[pillar as keyof typeof zeroTrustCapabilityMapping];
    for (const capName in capabilities) {
      // This simplistic check assumes vendorFeatures keys match capName or similar
      // A more robust solution would map specific vendor features to these abstract capabilities
      if (hasFeature(capName) || (typeof vendorFeatures.securityFeatures === 'object' && vendorFeatures.securityFeatures && vendorFeatures.securityFeatures[capName])) {
        pillarScore += capabilities[capName];
      }
    }
    scores[pillar as keyof ZeroTrustMaturity] = Math.min(100, pillarScore); // Cap at 100
  }

  const categories = Object.keys(scores).filter(k => k !== 'overallMaturity') as (keyof Omit<ZeroTrustMaturity, 'overallMaturity'>)[];
  const totalScore = categories.reduce((acc, key) => acc + scores[key], 0);
  scores.overallMaturity = Math.round(totalScore / categories.length);

  return scores;
}
