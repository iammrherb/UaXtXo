/**
 * Industry & Compliance Framework Data
 * Comprehensive regulatory and industry-specific requirements
 */

const INDUSTRY_DATA = {
  'healthcare': {
    name: 'Healthcare',
    icon: 'fa-hospital',
    description: 'Hospitals, clinics, medical device manufacturers, and healthcare providers',
    avgDevices: 2500,
    
    keyRequirements: [
      'Patient data protection (PHI)',
      'Medical device security',
      'Remote access for physicians',
      'Guest network isolation',
      'Compliance reporting'
    ],
    
    complianceFrameworks: {
      'HIPAA': { required: true, penalty: 1900000, priority: 'Critical' },
      'HITECH': { required: true, penalty: 1500000, priority: 'Critical' },
      'FDA': { required: false, penalty: 500000, priority: 'High' },
      'GDPR': { required: true, penalty: 20000000, priority: 'Critical' },
      'ISO 27001': { required: false, penalty: 0, priority: 'Medium' },
      'NIST CSF': { required: false, penalty: 0, priority: 'High' }
    },
    
    cyberInsurance: {
      basePremium: 125000,
      withoutNAC: 250000,
      withNAC: 75000,
      breachDeductible: 100000,
      coverage: 10000000
    },
    
    breachStatistics: {
      avgCostPerRecord: 499,
      avgRecordsBreached: 25000,
      avgBreachCost: 10930000,
      breachProbability: 0.28,
      breachProbabilityWithNAC: 0.06
    },
    
    threatVectors: [
      { name: 'Ransomware', impact: 95, frequency: 85, nacMitigation: 88 },
      { name: 'Insider Threats', impact: 88, frequency: 72, nacMitigation: 92 },
      { name: 'Medical Device Attacks', impact: 92, frequency: 68, nacMitigation: 85 },
      { name: 'Phishing', impact: 82, frequency: 90, nacMitigation: 78 },
      { name: 'Supply Chain', impact: 85, frequency: 65, nacMitigation: 82 }
    ]
  },
  
  'finance': {
    name: 'Financial Services',
    icon: 'fa-university',
    description: 'Banks, credit unions, insurance companies, and financial institutions',
    avgDevices: 5000,
    
    keyRequirements: [
      'Transaction security',
      'Customer data protection',
      'Regulatory compliance',
      'Third-party access control',
      'Fraud prevention'
    ],
    
    complianceFrameworks: {
      'PCI DSS': { required: true, penalty: 500000, priority: 'Critical' },
      'SOX': { required: true, penalty: 1000000, priority: 'Critical' },
      'GLBA': { required: true, penalty: 100000, priority: 'High' },
      'GDPR': { required: true, penalty: 20000000, priority: 'Critical' },
      'CCPA': { required: true, penalty: 7500, priority: 'High' },
      'ISO 27001': { required: false, penalty: 0, priority: 'High' },
      'NIST CSF': { required: true, penalty: 0, priority: 'Critical' }
    },
    
    cyberInsurance: {
      basePremium: 200000,
      withoutNAC: 400000,
      withNAC: 120000,
      breachDeductible: 250000,
      coverage: 50000000
    },
    
    breachStatistics: {
      avgCostPerRecord: 165,
      avgRecordsBreached: 100000,
      avgBreachCost: 5970000,
      breachProbability: 0.25,
      breachProbabilityWithNAC: 0.05
    },
    
    threatVectors: [
      { name: 'Financial Fraud', impact: 98, frequency: 88, nacMitigation: 90 },
      { name: 'APT Groups', impact: 95, frequency: 75, nacMitigation: 85 },
      { name: 'Insider Trading', impact: 92, frequency: 65, nacMitigation: 88 },
      { name: 'DDoS Attacks', impact: 85, frequency: 82, nacMitigation: 75 },
      { name: 'Supply Chain', impact: 88, frequency: 70, nacMitigation: 82 }
    ]
  },
  
  'education': {
    name: 'Education',
    icon: 'fa-graduation-cap',
    description: 'K-12 schools, universities, and educational institutions',
    avgDevices: 8000,
    
    keyRequirements: [
      'Student data protection',
      'BYOD support',
      'Guest network access',
      'Content filtering',
      'Remote learning'
    ],
    
    complianceFrameworks: {
      'FERPA': { required: true, penalty: 100000, priority: 'Critical' },
      'COPPA': { required: true, penalty: 43792, priority: 'High' },
      'GDPR': { required: false, penalty: 20000000, priority: 'Medium' },
      'CCPA': { required: true, penalty: 7500, priority: 'Medium' },
      'ISO 27001': { required: false, penalty: 0, priority: 'Low' }
    },
    
    cyberInsurance: {
      basePremium: 75000,
      withoutNAC: 150000,
      withNAC: 45000,
      breachDeductible: 50000,
      coverage: 5000000
    },
    
    breachStatistics: {
      avgCostPerRecord: 112,
      avgRecordsBreached: 50000,
      avgBreachCost: 3860000,
      breachProbability: 0.22,
      breachProbabilityWithNAC: 0.05
    },
    
    threatVectors: [
      { name: 'Ransomware', impact: 92, frequency: 85, nacMitigation: 88 },
      { name: 'Student Data Theft', impact: 85, frequency: 72, nacMitigation: 85 },
      { name: 'Cheating/Grade Changes', impact: 75, frequency: 68, nacMitigation: 90 },
      { name: 'DDoS Attacks', impact: 80, frequency: 78, nacMitigation: 72 },
      { name: 'Inappropriate Content', impact: 70, frequency: 82, nacMitigation: 65 }
    ]
  },
  
  'government': {
    name: 'Government',
    icon: 'fa-landmark',
    description: 'Federal, state, and local government agencies',
    avgDevices: 10000,
    
    keyRequirements: [
      'Classified data protection',
      'Citizen data privacy',
      'Compliance with federal standards',
      'Supply chain security',
      'Critical infrastructure protection'
    ],
    
    complianceFrameworks: {
      'FedRAMP': { required: true, penalty: 0, priority: 'Critical' },
      'FISMA': { required: true, penalty: 0, priority: 'Critical' },
      'NIST 800-171': { required: true, penalty: 0, priority: 'Critical' },
      'CJIS': { required: false, penalty: 0, priority: 'High' },
      'IRS 1075': { required: false, penalty: 0, priority: 'High' },
      'ITAR': { required: false, penalty: 10000000, priority: 'Critical' }
    },
    
    cyberInsurance: {
      basePremium: 300000,
      withoutNAC: 600000,
      withNAC: 180000,
      breachDeductible: 500000,
      coverage: 100000000
    },
    
    breachStatistics: {
      avgCostPerRecord: 150,
      avgRecordsBreached: 500000,
      avgBreachCost: 8640000,
      breachProbability: 0.30,
      breachProbabilityWithNAC: 0.07
    },
    
    threatVectors: [
      { name: 'Nation-State Attacks', impact: 98, frequency: 85, nacMitigation: 82 },
      { name: 'Espionage', impact: 95, frequency: 78, nacMitigation: 85 },
      { name: 'Critical Infrastructure', impact: 98, frequency: 72, nacMitigation: 88 },
      { name: 'Supply Chain', impact: 92, frequency: 80, nacMitigation: 85 },
      { name: 'Insider Threats', impact: 90, frequency: 75, nacMitigation: 92 }
    ]
  },
  
  'retail': {
    name: 'Retail',
    icon: 'fa-shopping-cart',
    description: 'Retail stores, e-commerce, and hospitality',
    avgDevices: 3000,
    
    keyRequirements: [
      'POS system security',
      'Customer data protection',
      'Guest WiFi isolation',
      'Inventory system protection',
      'Multi-location management'
    ],
    
    complianceFrameworks: {
      'PCI DSS': { required: true, penalty: 500000, priority: 'Critical' },
      'GDPR': { required: true, penalty: 20000000, priority: 'Critical' },
      'CCPA': { required: true, penalty: 7500, priority: 'High' },
      'SOX': { required: false, penalty: 1000000, priority: 'Medium' },
      'ISO 27001': { required: false, penalty: 0, priority: 'Medium' }
    },
    
    cyberInsurance: {
      basePremium: 100000,
      withoutNAC: 200000,
      withNAC: 60000,
      breachDeductible: 75000,
      coverage: 20000000
    },
    
    breachStatistics: {
      avgCostPerRecord: 148,
      avgRecordsBreached: 75000,
      avgBreachCost: 3620000,
      breachProbability: 0.20,
      breachProbabilityWithNAC: 0.04
    },
    
    threatVectors: [
      { name: 'POS Malware', impact: 95, frequency: 82, nacMitigation: 90 },
      { name: 'Card Skimming', impact: 88, frequency: 75, nacMitigation: 85 },
      { name: 'E-commerce Attacks', impact: 85, frequency: 88, nacMitigation: 78 },
      { name: 'Supply Chain', impact: 82, frequency: 70, nacMitigation: 80 },
      { name: 'Insider Threats', impact: 80, frequency: 68, nacMitigation: 88 }
    ]
  },
  
  'manufacturing': {
    name: 'Manufacturing',
    icon: 'fa-industry',
    description: 'Manufacturing plants, industrial facilities, and supply chain',
    avgDevices: 5000,
    
    keyRequirements: [
      'OT/IT convergence security',
      'Intellectual property protection',
      'Supply chain security',
      'IoT device management',
      'Production continuity'
    ],
    
    complianceFrameworks: {
      'ISO 27001': { required: true, penalty: 0, priority: 'High' },
      'NIST CSF': { required: true, penalty: 0, priority: 'High' },
      'GDPR': { required: false, penalty: 20000000, priority: 'Medium' },
      'ITAR': { required: false, penalty: 10000000, priority: 'Critical' },
      'CMMC': { required: false, penalty: 0, priority: 'High' }
    },
    
    cyberInsurance: {
      basePremium: 150000,
      withoutNAC: 300000,
      withNAC: 90000,
      breachDeductible: 150000,
      coverage: 30000000
    },
    
    breachStatistics: {
      avgCostPerRecord: 157,
      avgRecordsBreached: 50000,
      avgBreachCost: 4240000,
      breachProbability: 0.24,
      breachProbabilityWithNAC: 0.05
    },
    
    threatVectors: [
      { name: 'Industrial Espionage', impact: 95, frequency: 75, nacMitigation: 85 },
      { name: 'Ransomware', impact: 92, frequency: 85, nacMitigation: 88 },
      { name: 'Supply Chain', impact: 90, frequency: 78, nacMitigation: 82 },
      { name: 'IoT Attacks', impact: 88, frequency: 82, nacMitigation: 90 },
      { name: 'Sabotage', impact: 85, frequency: 65, nacMitigation: 85 }
    ]
  },
  
  'technology': {
    name: 'Technology',
    icon: 'fa-microchip',
    description: 'Software companies, IT services, and technology providers',
    avgDevices: 2000,
    
    keyRequirements: [
      'Source code protection',
      'Developer access control',
      'Cloud security',
      'API security',
      'Remote work support'
    ],
    
    complianceFrameworks: {
      'SOC 2': { required: true, penalty: 0, priority: 'Critical' },
      'ISO 27001': { required: true, penalty: 0, priority: 'Critical' },
      'GDPR': { required: true, penalty: 20000000, priority: 'Critical' },
      'CCPA': { required: true, penalty: 7500, priority: 'High' },
      'NIST CSF': { required: false, penalty: 0, priority: 'High' }
    },
    
    cyberInsurance: {
      basePremium: 125000,
      withoutNAC: 250000,
      withNAC: 75000,
      breachDeductible: 100000,
      coverage: 25000000
    },
    
    breachStatistics: {
      avgCostPerRecord: 183,
      avgRecordsBreached: 100000,
      avgBreachCost: 4880000,
      breachProbability: 0.26,
      breachProbabilityWithNAC: 0.05
    },
    
    threatVectors: [
      { name: 'Supply Chain', impact: 95, frequency: 85, nacMitigation: 82 },
      { name: 'Zero-Day Exploits', impact: 92, frequency: 72, nacMitigation: 75 },
      { name: 'IP Theft', impact: 90, frequency: 78, nacMitigation: 85 },
      { name: 'APT Groups', impact: 88, frequency: 75, nacMitigation: 82 },
      { name: 'Insider Threats', impact: 85, frequency: 70, nacMitigation: 90 }
    ]
  }
};

const COMPLIANCE_FRAMEWORKS = {
  'HIPAA': {
    name: 'Health Insurance Portability and Accountability Act',
    shortName: 'HIPAA',
    description: 'US healthcare data protection regulation',
    region: 'US',
    icon: 'fa-hospital',
    
    requirements: {
      'Access Control': { nacSupport: 98, description: 'Unique user identification and automatic logoff' },
      'Audit Controls': { nacSupport: 95, description: 'Hardware, software, and procedural mechanisms' },
      'Integrity': { nacSupport: 92, description: 'PHI not improperly altered or destroyed' },
      'Transmission Security': { nacSupport: 94, description: 'PHI transmitted electronically is protected' },
      'Device Controls': { nacSupport: 96, description: 'Receipt and removal of hardware and media' }
    },
    
    penalties: {
      tier1: { min: 100, max: 50000, description: 'Unknowing violation' },
      tier2: { min: 1000, max: 100000, description: 'Reasonable cause' },
      tier3: { min: 10000, max: 250000, description: 'Willful neglect - corrected' },
      tier4: { min: 50000, max: 1500000, description: 'Willful neglect - not corrected' }
    }
  },
  
  'PCI DSS': {
    name: 'Payment Card Industry Data Security Standard',
    shortName: 'PCI DSS',
    description: 'Credit card data protection standard',
    region: 'Global',
    icon: 'fa-credit-card',
    
    requirements: {
      'Network Segmentation': { nacSupport: 95, description: 'Isolate cardholder data environment' },
      'Access Control': { nacSupport: 98, description: 'Restrict access to cardholder data' },
      'Authentication': { nacSupport: 96, description: 'Assign unique ID to each person' },
      'Monitoring': { nacSupport: 94, description: 'Track and monitor all access' },
      'Testing': { nacSupport: 90, description: 'Regularly test security systems' }
    },
    
    penalties: {
      level1: { min: 5000, max: 100000, description: 'Per month for non-compliance' },
      level2: { min: 25, max: 100, description: 'Per transaction fee' },
      level3: { min: 50000, max: 500000, description: 'Data breach fine' },
      level4: { min: 0, max: 0, description: 'Loss of card processing ability' }
    }
  },
  
  'GDPR': {
    name: 'General Data Protection Regulation',
    shortName: 'GDPR',
    description: 'EU data protection and privacy regulation',
    region: 'EU',
    icon: 'fa-globe-europe',
    
    requirements: {
      'Data Protection': { nacSupport: 94, description: 'Protection by design and default' },
      'Access Rights': { nacSupport: 92, description: 'Right to access and data portability' },
      'Consent': { nacSupport: 88, description: 'Lawful basis for processing' },
      'Breach Notification': { nacSupport: 90, description: '72-hour breach notification' },
      'Privacy Impact': { nacSupport: 86, description: 'Data protection impact assessments' }
    },
    
    penalties: {
      tier1: { min: 0, max: 10000000, description: 'Up to €10M or 2% of turnover' },
      tier2: { min: 0, max: 20000000, description: 'Up to €20M or 4% of turnover' }
    }
  },
  
  'SOC 2': {
    name: 'Service Organization Control 2',
    shortName: 'SOC 2',
    description: 'Service provider data security standard',
    region: 'Global',
    icon: 'fa-certificate',
    
    requirements: {
      'Security': { nacSupport: 96, description: 'Protection against unauthorized access' },
      'Availability': { nacSupport: 92, description: 'System availability for operation' },
      'Processing Integrity': { nacSupport: 90, description: 'System processing is complete' },
      'Confidentiality': { nacSupport: 94, description: 'Information designated as confidential' },
      'Privacy': { nacSupport: 88, description: 'Personal information collection and use' }
    },
    
    penalties: {
      business: { min: 0, max: 0, description: 'Loss of business and reputation' },
      legal: { min: 0, max: 0, description: 'Potential lawsuits from clients' }
    }
  },
  
  'ISO 27001': {
    name: 'ISO/IEC 27001',
    shortName: 'ISO 27001',
    description: 'Information security management system standard',
    region: 'Global',
    icon: 'fa-shield-alt',
    
    requirements: {
      'Risk Assessment': { nacSupport: 92, description: 'Information security risk assessment' },
      'Access Control': { nacSupport: 96, description: 'Limit access to information' },
      'Cryptography': { nacSupport: 88, description: 'Proper use of cryptography' },
      'Operations Security': { nacSupport: 90, description: 'Correct and secure operations' },
      'Incident Management': { nacSupport: 94, description: 'Information security incidents' }
    },
    
    penalties: {
      certification: { min: 0, max: 0, description: 'Loss of certification' },
      business: { min: 0, max: 0, description: 'Loss of business opportunities' }
    }
  },
  
  'NIST CSF': {
    name: 'NIST Cybersecurity Framework',
    shortName: 'NIST CSF',
    description: 'Cybersecurity risk management framework',
    region: 'US',
    icon: 'fa-flag-usa',
    
    requirements: {
      'Identify': { nacSupport: 92, description: 'Asset management and risk assessment' },
      'Protect': { nacSupport: 96, description: 'Access control and data security' },
      'Detect': { nacSupport: 95, description: 'Anomalies and events detection' },
      'Respond': { nacSupport: 94, description: 'Response planning and communications' },
      'Recover': { nacSupport: 90, description: 'Recovery planning and improvements' }
    },
    
    penalties: {
      federal: { min: 0, max: 0, description: 'Required for federal contractors' },
      business: { min: 0, max: 0, description: 'Industry best practice expectation' }
    }
  },
  
  'FedRAMP': {
    name: 'Federal Risk and Authorization Management Program',
    shortName: 'FedRAMP',
    description: 'US government cloud security standard',
    region: 'US',
    icon: 'fa-cloud',
    
    requirements: {
      'Access Control': { nacSupport: 95, description: 'Account management and separation' },
      'Audit': { nacSupport: 92, description: 'Audit events and review' },
      'Security Assessment': { nacSupport: 88, description: 'Control assessments' },
      'Incident Response': { nacSupport: 90, description: 'Incident handling and monitoring' },
      'System Integrity': { nacSupport: 94, description: 'Flaw remediation and protection' }
    },
    
    penalties: {
      authorization: { min: 0, max: 0, description: 'Loss of authorization to operate' },
      contracts: { min: 0, max: 0, description: 'Ineligible for federal contracts' }
    }
  },
  
  'CCPA': {
    name: 'California Consumer Privacy Act',
    shortName: 'CCPA',
    description: 'California privacy rights law',
    region: 'US - California',
    icon: 'fa-user-shield',
    
    requirements: {
      'Consumer Rights': { nacSupport: 88, description: 'Right to know, delete, opt-out' },
      'Data Inventory': { nacSupport: 90, description: 'Categories of personal information' },
      'Security': { nacSupport: 92, description: 'Reasonable security procedures' },
      'Vendor Management': { nacSupport: 86, description: 'Service provider agreements' },
      'Privacy Policy': { nacSupport: 84, description: 'Comprehensive privacy policy' }
    },
    
    penalties: {
      violation: { min: 2500, max: 7500, description: 'Per violation' },
      breach: { min: 100, max: 750, description: 'Per consumer per incident' }
    }
  }
};

// Risk calculation functions
function calculateRiskScore(industry, hasNAC = false) {
  const industryData = INDUSTRY_DATA[industry];
  if (!industryData) return 0;
  
  let riskScore = 0;
  
  // Base risk from threat vectors
  industryData.threatVectors.forEach(threat => {
    const baseRisk = (threat.impact * threat.frequency) / 100;
    const mitigation = hasNAC ? (threat.nacMitigation / 100) : 0;
    riskScore += baseRisk * (1 - mitigation);
  });
  
  // Breach probability factor
  const breachProb = hasNAC ? 
    industryData.breachStatistics.breachProbabilityWithNAC : 
    industryData.breachStatistics.breachProbability;
  
  riskScore *= breachProb;
  
  return Math.round(riskScore);
}

function calculateCyberInsurancePremium(industry, deviceCount, hasNAC = false) {
  const industryData = INDUSTRY_DATA[industry];
  if (!industryData) return 0;
  
  const basePremium = hasNAC ? 
    industryData.cyberInsurance.withNAC : 
    industryData.cyberInsurance.withoutNAC;
  
  // Scale by device count
  const deviceFactor = deviceCount / industryData.avgDevices;
  
  return Math.round(basePremium * deviceFactor);
}

function calculateBreachCost(industry, deviceCount, hasNAC = false) {
  const industryData = INDUSTRY_DATA[industry];
  if (!industryData) return 0;
  
  const stats = industryData.breachStatistics;
  const breachProb = hasNAC ? stats.breachProbabilityWithNAC : stats.breachProbability;
  
  // Scale breach size by device count
  const deviceFactor = deviceCount / industryData.avgDevices;
  const estimatedRecords = stats.avgRecordsBreached * deviceFactor;
  
  const breachCost = estimatedRecords * stats.avgCostPerRecord;
  const expectedCost = breachCost * breachProb;
  
  return {
    breachProbability: breachProb,
    potentialCost: Math.round(breachCost),
    expectedAnnualCost: Math.round(expectedCost),
    recordsAtRisk: Math.round(estimatedRecords)
  };
}

// Export for global use
window.INDUSTRY_DATA = INDUSTRY_DATA;
window.COMPLIANCE_FRAMEWORKS = COMPLIANCE_FRAMEWORKS;
window.calculateRiskScore = calculateRiskScore;
window.calculateCyberInsurancePremium = calculateCyberInsurancePremium;
window.calculateBreachCost = calculateBreachCost;

console.log('✅ Industry and compliance data loaded');
