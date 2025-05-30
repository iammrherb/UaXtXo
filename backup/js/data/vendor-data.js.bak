/**
 * Comprehensive Vendor Data for Portnox Total Cost Analyzer
 * Contains detailed information on all NAC vendors, their features, costs, and technical specifications
 */

const VENDORS = {
  'portnox': {
    name: 'Portnox Cloud',
    shortName: 'Portnox',
    logoUrl: './img/vendors/portnox.png',
    cloudNative: true,
    architecture: 'cloud',
    deployment: {
      timeToValue: 1, // Days
      complexity: 'Low',
      requiresHardware: false,
      requiresAgents: false,
      remoteWorkSupport: true,
      cloudManaged: true
    },
    costs: {
      pricing: 'subscription',
      licensePerDevice: 50,
      hardware: 0,
      implementation: 15000,
      maintenance: 0,
      yearlySubscription: 172000,
      personnel: 25000,
      training: 5000,
      tco3Year: 245000
    },
    security: {
      zeroTrust: 95,
      deviceAuth: 90,
      riskAssessment: 95,
      remediationSpeed: 15,
      complianceCoverage: 95,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: true,
      automatedResponse: true
    },
    compliance: {
      pciDss: 95,
      hipaa: 95,
      gdpr: 90,
      nist: 95,
      iso27001: 95,
      sox: 90,
      cmmc: 90,
      frameworks: [
        {name: 'NIST CSF', coverage: 95, details: {identify: 92, protect: 96, detect: 95, respond: 94, recover: 90}},
        {name: 'PCI DSS', coverage: 95},
        {name: 'HIPAA', coverage: 95},
        {name: 'GDPR', coverage: 90},
        {name: 'ISO 27001', coverage: 90},
        {name: 'SOX', coverage: 90},
      ]
    },
    features: {
      byod: true,
      iot: true,
      wireless: true,
      wired: true,
      vpn: true,
      cloudIntegration: true,
      legacyDevices: true,
      remoteUsers: true,
      mdm: true,
      siem: true,
      sso: true,
      api: true,
      automatedProvisioning: true,
      dashboards: true,
      customReporting: true,
      userPortal: true
    },
    integration: {
      azure: true,
      googleWorkspace: true,
      aws: true,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: true,
      siem: true,
      ticketing: true,
      cmdb: true
    },
    technical: {
      maxDevices: 'Unlimited',
      performanceImpact: 'Minimal',
      scalability: 'Highly Scalable',
      reliability: 99.99,
      redundancy: 'Built-in',
      disasterRecovery: 'Automatic',
      updateFrequency: 'Continuous'
    },
    customers: {
      industries: ['Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Government', 'Education'],
      companySize: ['Small', 'Medium', 'Enterprise'],
      geoLocations: ['North America', 'Europe', 'Asia Pacific', 'Latin America']
    },
    differentiators: [
      'True cloud-native architecture with zero on-premises footprint',
      'Rapid deployment with time-to-value measured in hours',
      'Continuous updates and security enhancements without downtime',
      'Comprehensive Zero Trust Network Access capabilities',
      'Built-in scalability and multi-tenancy'
    ]
  },
  
  'cisco': {
    name: 'Cisco ISE',
    shortName: 'Cisco',
    logoUrl: './img/vendors/cisco.png',
    cloudNative: false,
    architecture: 'on-premises',
    deployment: {
      timeToValue: 90, // Days
      complexity: 'High',
      requiresHardware: true,
      requiresAgents: true,
      remoteWorkSupport: true,
      cloudManaged: false
    },
    costs: {
      pricing: 'perpetual',
      licensePerDevice: 60,
      hardware: 130000,
      implementation: 85000,
      maintenance: 98000,
      yearlySubscription: 0,
      personnel: 200000,
      training: 20000,
      tco3Year: 520000
    },
    security: {
      zeroTrust: 80,
      deviceAuth: 85,
      riskAssessment: 82,
      remediationSpeed: 45,
      complianceCoverage: 90,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: true,
      automatedResponse: true
    },
    compliance: {
      pciDss: 90,
      hipaa: 90,
      gdpr: 85,
      nist: 90,
      iso27001: 90,
      sox: 85,
      cmmc: 90,
      frameworks: [
        {name: 'NIST CSF', coverage: 90, details: {identify: 88, protect: 92, detect: 90, respond: 85, recover: 82}},
        {name: 'PCI DSS', coverage: 90},
        {name: 'HIPAA', coverage: 90},
        {name: 'GDPR', coverage: 85},
        {name: 'ISO 27001', coverage: 90},
        {name: 'SOX', coverage: 85},
      ]
    },
    features: {
      byod: true,
      iot: true,
      wireless: true,
      wired: true,
      vpn: true,
      cloudIntegration: true,
      legacyDevices: true,
      remoteUsers: true,
      mdm: true,
      siem: true,
      sso: true,
      api: true,
      automatedProvisioning: true,
      dashboards: true,
      customReporting: true,
      userPortal: true
    },
    integration: {
      azure: true,
      googleWorkspace: false,
      aws: true,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: true,
      siem: true,
      ticketing: true,
      cmdb: true
    },
    technical: {
      maxDevices: '100,000+',
      performanceImpact: 'Moderate',
      scalability: 'Enterprise-grade',
      reliability: 99.9,
      redundancy: 'Manual Configuration',
      disasterRecovery: 'Manual',
      updateFrequency: 'Quarterly'
    },
    customers: {
      industries: ['Finance', 'Healthcare', 'Government', 'Education', 'Manufacturing'],
      companySize: ['Large', 'Enterprise'],
      geoLocations: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East']
    },
    differentiators: [
      'Deep integration with Cisco networking infrastructure',
      'Extensive feature set for large enterprise deployments',
      'Mature product with long history in the market',
      'Strong professional services and support ecosystem',
      'Comprehensive policy management capabilities'
    ]
  },
  
  'aruba': {
    name: 'Aruba ClearPass',
    shortName: 'Aruba',
    logoUrl: './img/vendors/aruba.png',
    cloudNative: false,
    architecture: 'on-premises',
    deployment: {
      timeToValue: 60, // Days
      complexity: 'High',
      requiresHardware: true,
      requiresAgents: true,
      remoteWorkSupport: true,
      cloudManaged: false
    },
    costs: {
      pricing: 'perpetual',
      licensePerDevice: 55,
      hardware: 110000,
      implementation: 65000,
      maintenance: 85000,
      yearlySubscription: 0,
      personnel: 175000,
      training: 15000,
      tco3Year: 480000
    },
    security: {
      zeroTrust: 80,
      deviceAuth: 85,
      riskAssessment: 80,
      remediationSpeed: 40,
      complianceCoverage: 85,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: true,
      automatedResponse: true
    },
    compliance: {
      pciDss: 90,
      hipaa: 85,
      gdpr: 80,
      nist: 85,
      iso27001: 85,
      sox: 80,
      cmmc: 85,
      frameworks: [
        {name: 'NIST CSF', coverage: 85, details: {identify: 85, protect: 90, detect: 85, respond: 80, recover: 80}},
        {name: 'PCI DSS', coverage: 90},
        {name: 'HIPAA', coverage: 85},
        {name: 'GDPR', coverage: 80},
        {name: 'ISO 27001', coverage: 85},
        {name: 'SOX', coverage: 80},
      ]
    },
    features: {
      byod: true,
      iot: true,
      wireless: true,
      wired: true,
      vpn: true,
      cloudIntegration: true,
      legacyDevices: true,
      remoteUsers: true,
      mdm: true,
      siem: true,
      sso: true,
      api: true,
      automatedProvisioning: true,
      dashboards: true,
      customReporting: true,
      userPortal: true
    },
    integration: {
      azure: true,
      googleWorkspace: false,
      aws: false,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: true,
      siem: true,
      ticketing: true,
      cmdb: true
    },
    technical: {
      maxDevices: '75,000+',
      performanceImpact: 'Moderate',
      scalability: 'Enterprise-grade',
      reliability: 99.9,
      redundancy: 'Manual Configuration',
      disasterRecovery: 'Manual',
      updateFrequency: 'Quarterly'
    },
    customers: {
      industries: ['Healthcare', 'Government', 'Education', 'Retail', 'Manufacturing'],
      companySize: ['Medium', 'Large', 'Enterprise'],
      geoLocations: ['North America', 'Europe', 'Asia Pacific']
    },
    differentiators: [
      'Tight integration with Aruba wireless infrastructure',
      'Strong focus on BYOD and guest networking',
      'Role-based access control capabilities',
      'Extensive device profiling database',
      'Context-aware policy enforcement'
    ]
  },
  
  'forescout': {
    name: 'Forescout Platform',
    shortName: 'Forescout',
    logoUrl: './img/vendors/forescout.png',
    cloudNative: false,
    architecture: 'hybrid',
    deployment: {
      timeToValue: 75, // Days
      complexity: 'High',
      requiresHardware: true,
      requiresAgents: false,
      remoteWorkSupport: true,
      cloudManaged: false
    },
    costs: {
      pricing: 'perpetual',
      licensePerDevice: 65,
      hardware: 100000,
      implementation: 75000,
      maintenance: 75000,
      yearlySubscription: 0,
      personnel: 150000,
      training: 15000,
      tco3Year: 430000
    },
    security: {
      zeroTrust: 85,
      deviceAuth: 85,
      riskAssessment: 90,
      remediationSpeed: 35,
      complianceCoverage: 85,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: true,
      automatedResponse: true
    },
    compliance: {
      pciDss: 90,
      hipaa: 85,
      gdpr: 80,
      nist: 85,
      iso27001: 85,
      sox: 85,
      cmmc: 85,
      frameworks: [
        {name: 'NIST CSF', coverage: 85, details: {identify: 90, protect: 85, detect: 90, respond: 80, recover: 75}},
        {name: 'PCI DSS', coverage: 90},
        {name: 'HIPAA', coverage: 85},
        {name: 'GDPR', coverage: 80},
        {name: 'ISO 27001', coverage: 85},
        {name: 'SOX', coverage: 85},
      ]
    },
    features: {
      byod: true,
      iot: true,
      wireless: true,
      wired: true,
      vpn: true,
      cloudIntegration: true,
      legacyDevices: true,
      remoteUsers: true,
      mdm: true,
      siem: true,
      sso: true,
      api: true,
      automatedProvisioning: true,
      dashboards: true,
      customReporting: true,
      userPortal: true
    },
    integration: {
      azure: true,
      googleWorkspace: false,
      aws: true,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: true,
      siem: true,
      ticketing: true,
      cmdb: true
    },
    technical: {
      maxDevices: '60,000+',
      performanceImpact: 'Low',
      scalability: 'Enterprise-grade',
      reliability: 99.9,
      redundancy: 'Manual Configuration',
      disasterRecovery: 'Manual',
      updateFrequency: 'Quarterly'
    },
    customers: {
      industries: ['Healthcare', 'Finance', 'Government', 'Critical Infrastructure', 'Manufacturing'],
      companySize: ['Large', 'Enterprise'],
      geoLocations: ['North America', 'Europe', 'Asia Pacific', 'Middle East']
    },
    differentiators: [
      'Agentless device discovery and classification',
      'Extensive IoT device support and visibility',
      'Strong OT/ICS security capabilities',
      'Network segmentation orchestration',
      'Comprehensive device visibility across network segments'
    ]
  },
  
  'fortinac': {
    name: 'FortiNAC',
    shortName: 'FortiNAC',
    logoUrl: './img/vendors/fortinac.png',
    cloudNative: false,
    architecture: 'hybrid',
    deployment: {
      timeToValue: 60, // Days
      complexity: 'Moderate',
      requiresHardware: true,
      requiresAgents: false,
      remoteWorkSupport: true,
      cloudManaged: false
    },
    costs: {
      pricing: 'perpetual',
      licensePerDevice: 45,
      hardware: 90000,
      implementation: 60000,
      maintenance: 65000,
      yearlySubscription: 0,
      personnel: 140000,
      training: 12000,
      tco3Year: 385000
    },
    security: {
      zeroTrust: 80,
      deviceAuth: 80,
      riskAssessment: 75,
      remediationSpeed: 35,
      complianceCoverage: 80,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: true,
      automatedResponse: true
    },
    compliance: {
      pciDss: 85,
      hipaa: 80,
      gdpr: 75,
      nist: 80,
      iso27001: 80,
      sox: 80,
      cmmc: 85,
      frameworks: [
        {name: 'NIST CSF', coverage: 80, details: {identify: 80, protect: 85, detect: 80, respond: 75, recover: 75}},
        {name: 'PCI DSS', coverage: 85},
        {name: 'HIPAA', coverage: 80},
        {name: 'GDPR', coverage: 75},
        {name: 'ISO 27001', coverage: 80},
        {name: 'SOX', coverage: 80},
      ]
    },
    features: {
      byod: true,
      iot: true,
      wireless: true,
      wired: true,
      vpn: true,
      cloudIntegration: true,
      legacyDevices: true,
      remoteUsers: true,
      mdm: true,
      siem: true,
      sso: true,
      api: true,
      automatedProvisioning: true,
      dashboards: true,
      customReporting: true,
      userPortal: true
    },
    integration: {
      azure: true,
      googleWorkspace: false,
      aws: false,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: true,
      siem: true,
      ticketing: true,
      cmdb: false
    },
    technical: {
      maxDevices: '50,000+',
      performanceImpact: 'Moderate',
      scalability: 'Enterprise-grade',
      reliability: 99.9,
      redundancy: 'Manual Configuration',
      disasterRecovery: 'Manual',
      updateFrequency: 'Quarterly'
    },
    customers: {
      industries: ['Government', 'Education', 'Healthcare', 'Retail', 'Manufacturing'],
      companySize: ['Medium', 'Large', 'Enterprise'],
      geoLocations: ['North America', 'Europe', 'Asia Pacific', 'Latin America']
    },
    differentiators: [
      'Integrated with Fortinet Security Fabric',
      'Strong focus on IoT security',
      'Good automation and orchestration capabilities',
      'Integration with FortiSOAR for incident response',
      'Rogue device detection and mitigation'
    ]
  },
  
  'juniper': {
    name: 'Juniper NAC',
    shortName: 'Juniper',
    logoUrl: './img/vendors/juniper.png',
    cloudNative: false,
    architecture: 'on-premises',
    deployment: {
      timeToValue: 60, // Days
      complexity: 'Moderate',
      requiresHardware: true,
      requiresAgents: true,
      remoteWorkSupport: true,
      cloudManaged: false
    },
    costs: {
      pricing: 'perpetual',
      licensePerDevice: 50,
      hardware: 95000,
      implementation: 70000,
      maintenance: 70000,
      yearlySubscription: 0,
      personnel: 150000,
      training: 15000,
      tco3Year: 410000
    },
    security: {
      zeroTrust: 75,
      deviceAuth: 80,
      riskAssessment: 75,
      remediationSpeed: 40,
      complianceCoverage: 80,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: true,
      automatedResponse: true
    },
    compliance: {
      pciDss: 85,
      hipaa: 80,
      gdpr: 75,
      nist: 80,
      iso27001: 80,
      sox: 75,
      cmmc: 80,
      frameworks: [
        {name: 'NIST CSF', coverage: 80, details: {identify: 75, protect: 85, detect: 80, respond: 75, recover: 75}},
        {name: 'PCI DSS', coverage: 85},
        {name: 'HIPAA', coverage: 80},
        {name: 'GDPR', coverage: 75},
        {name: 'ISO 27001', coverage: 80},
        {name: 'SOX', coverage: 75},
      ]
    },
    features: {
      byod: true,
      iot: true,
      wireless: true,
      wired: true,
      vpn: true,
      cloudIntegration: true,
      legacyDevices: true,
      remoteUsers: true,
      mdm: true,
      siem: true,
      sso: true,
      api: true,
      automatedProvisioning: true,
      dashboards: true,
      customReporting: true,
      userPortal: true
    },
    integration: {
      azure: true,
      googleWorkspace: false,
      aws: false,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: true,
      siem: true,
      ticketing: true,
      cmdb: false
    },
    technical: {
      maxDevices: '50,000+',
      performanceImpact: 'Moderate',
      scalability: 'Enterprise-grade',
      reliability: 99.9,
      redundancy: 'Manual Configuration',
      disasterRecovery: 'Manual',
      updateFrequency: 'Quarterly'
    },
    customers: {
      industries: ['Service Providers', 'Finance', 'Government', 'Education', 'Healthcare'],
      companySize: ['Medium', 'Large', 'Enterprise'],
      geoLocations: ['North America', 'Europe', 'Asia Pacific']
    },
    differentiators: [
      'Deep integration with Juniper networking components',
      'Strong security fabric cross-product integration',
      'Good policy enforcement mechanisms',
      'Integration with Juniper's security intelligence',
      'Suitable for service provider environments'
    ]
  }
};

// Make it globally available
window.VENDORS = VENDORS;

/**
 * Compliance Framework Data
 * Contains detailed information on compliance frameworks
 */
const COMPLIANCE_FRAMEWORKS = {
  'nist-csf': {
    name: 'NIST Cybersecurity Framework',
    shortName: 'NIST CSF',
    description: 'The NIST Cybersecurity Framework (CSF) provides a policy framework of computer security guidance for how organizations can assess and improve their ability to prevent, detect, and respond to cyber attacks.',
    version: '1.1',
    categories: [
      {
        id: 'identify',
        name: 'Identify',
        description: 'Develop organizational understanding to manage cybersecurity risk to systems, people, assets, data, and capabilities.',
        subcategories: ['Asset Management', 'Business Environment', 'Governance', 'Risk Assessment', 'Risk Management Strategy']
      },
      {
        id: 'protect',
        name: 'Protect',
        description: 'Develop and implement appropriate safeguards to ensure delivery of critical services.',
        subcategories: ['Identity Management', 'Access Control', 'Awareness and Training', 'Data Security', 'Protective Technology']
      },
      {
        id: 'detect',
        name: 'Detect',
        description: 'Develop and implement appropriate activities to identify the occurrence of a cybersecurity event.',
        subcategories: ['Anomalies and Events', 'Security Continuous Monitoring', 'Detection Processes']
      },
      {
        id: 'respond',
        name: 'Respond',
        description: 'Develop and implement appropriate activities to take action regarding a detected cybersecurity incident.',
        subcategories: ['Response Planning', 'Communications', 'Analysis', 'Mitigation', 'Improvements']
      },
      {
        id: 'recover',
        name: 'Recover',
        description: 'Develop and implement appropriate activities to maintain plans for resilience and to restore any capabilities or services that were impaired due to a cybersecurity incident.',
        subcategories: ['Recovery Planning', 'Improvements', 'Communications']
      }
    ]
  },
  'pci-dss': {
    name: 'Payment Card Industry Data Security Standard',
    shortName: 'PCI DSS',
    description: 'The Payment Card Industry Data Security Standard (PCI DSS) is an information security standard for organizations that handle branded credit cards from the major card schemes.',
    version: '4.0',
    categories: [
      {id: 'secure-network', name: 'Build and Maintain a Secure Network'},
      {id: 'protect-data', name: 'Protect Cardholder Data'},
      {id: 'vulnerability-mgmt', name: 'Maintain a Vulnerability Management Program'},
      {id: 'access-control', name: 'Implement Strong Access Control Measures'},
      {id: 'monitoring', name: 'Regularly Monitor and Test Networks'},
      {id: 'policy', name: 'Maintain an Information Security Policy'}
    ]
  },
  'hipaa': {
    name: 'Health Insurance Portability and Accountability Act',
    shortName: 'HIPAA',
    description: 'The Health Insurance Portability and Accountability Act (HIPAA) sets the standard for protecting sensitive patient data.',
    version: '2023',
    categories: [
      {id: 'privacy', name: 'Privacy Rule'},
      {id: 'security', name: 'Security Rule'},
      {id: 'breach', name: 'Breach Notification Rule'},
      {id: 'enforcement', name: 'Enforcement Rule'}
    ]
  },
  'gdpr': {
    name: 'General Data Protection Regulation',
    shortName: 'GDPR',
    description: 'The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection and privacy for all individuals within the European Union and the European Economic Area.',
    version: '2018',
    categories: [
      {id: 'lawfulness', name: 'Lawfulness, Fairness, and Transparency'},
      {id: 'purpose', name: 'Purpose Limitation'},
      {id: 'minimization', name: 'Data Minimization'},
      {id: 'accuracy', name: 'Accuracy'},
      {id: 'storage', name: 'Storage Limitation'},
      {id: 'integrity', name: 'Integrity and Confidentiality'},
      {id: 'accountability', name: 'Accountability'}
    ]
  },
  'iso27001': {
    name: 'ISO/IEC 27001 - Information Security Management',
    shortName: 'ISO 27001',
    description: 'ISO/IEC 27001 is an international standard on how to manage information security.',
    version: '2022',
    categories: [
      {id: 'security-policy', name: 'Information Security Policies'},
      {id: 'organization', name: 'Organization of Information Security'},
      {id: 'human', name: 'Human Resource Security'},
      {id: 'asset', name: 'Asset Management'},
      {id: 'access', name: 'Access Control'},
      {id: 'cryptography', name: 'Cryptography'},
      {id: 'physical', name: 'Physical and Environmental Security'},
      {id: 'operations', name: 'Operations Security'},
      {id: 'communications', name: 'Communications Security'},
      {id: 'acquisition', name: 'System Acquisition, Development and Maintenance'}
    ]
  }
};

// Make it globally available
window.COMPLIANCE_FRAMEWORKS = COMPLIANCE_FRAMEWORKS;

/**
 * Industry Data
 * Contains information specific to different industries
 */
const INDUSTRY_DATA = {
  'healthcare': {
    name: 'Healthcare',
    key_regulations: ['HIPAA', 'HITRUST', 'FDA', 'GDPR'],
    avg_breach_cost: 10100000,
    security_priorities: ['Patient Data Protection', 'Medical Device Security', 'Regulatory Compliance', 'Zero Trust'],
    statistics: {
      breach_likelihood: 0.32,
      devices_per_bed: 15,
      iot_percentage: 0.65,
      average_recovery_time: 236
    },
    recommended_vendors: ['portnox', 'cisco', 'forescout'],
    use_cases: [
      'Medical device security and inventory',
      'Clinical workstation protection',
      'Patient data privacy compliance',
      'Remote clinician access'
    ]
  },
  'finance': {
    name: 'Financial Services',
    key_regulations: ['PCI DSS', 'SOX', 'GLBA', 'GDPR', 'NY-DFS'],
    avg_breach_cost: 15000000,
    security_priorities: ['Fraud Prevention', 'Data Protection', 'Continuous Monitoring', 'Zero Trust'],
    statistics: {
      breach_likelihood: 0.38,
      employee_devices: 2.3,
      iot_percentage: 0.35,
      average_recovery_time: 185
    },
    recommended_vendors: ['portnox', 'cisco', 'aruba'],
    use_cases: [
      'Trading floor security',
      'Mobile banking employee security',
      'Financial data protection',
      'Regulatory compliance'
    ]
  },
  'manufacturing': {
    name: 'Manufacturing',
    key_regulations: ['NIST CSF', 'IEC 62443', 'CMMC', 'GDPR'],
    avg_breach_cost: 8200000,
    security_priorities: ['OT Security', 'IP Protection', 'Supply Chain', 'Zero Trust'],
    statistics: {
      breach_likelihood: 0.28,
      ot_it_ratio: 2.8,
      iot_percentage: 0.78,
      average_recovery_time: 265
    },
    recommended_vendors: ['portnox', 'forescout', 'fortinac'],
    use_cases: [
      'OT/IT convergence security',
      'Production line device protection',
      'Supply chain access management',
      'Legacy systems integration'
    ]
  },
  'retail': {
    name: 'Retail',
    key_regulations: ['PCI DSS', 'CCPA', 'GDPR'],
    avg_breach_cost: 6500000,
    security_priorities: ['Payment Security', 'Customer Data', 'IoT Security', 'Zero Trust'],
    statistics: {
      breach_likelihood: 0.32,
      pos_devices_ratio: 5.3,
      iot_percentage: 0.62,
      average_recovery_time: 210
    },
    recommended_vendors: ['portnox', 'aruba', 'fortinac'],
    use_cases: [
      'POS terminal security',
      'In-store digital experience protection',
      'Customer data privacy',
      'Inventory system access'
    ]
  },
  'government': {
    name: 'Government',
    key_regulations: ['FISMA', 'FedRAMP', 'CMMC', 'NIST SP 800-53'],
    avg_breach_cost: 12300000,
    security_priorities: ['Critical Infrastructure', 'Citizen Data', 'Zero Trust', 'Compliance'],
    statistics: {
      breach_likelihood: 0.40,
      classified_systems: 0.21,
      iot_percentage: 0.38,
      average_recovery_time: 287
    },
    recommended_vendors: ['portnox', 'cisco', 'forescout'],
    use_cases: [
      'Secure government facility access',
      'Classified and unclassified network separation',
      'BYOD for government employees',
      'Contractor and visitor management'
    ]
  },
  'education': {
    name: 'Education',
    key_regulations: ['FERPA', 'COPPA', 'GDPR', 'HIPAA'],
    avg_breach_cost: 4800000,
    security_priorities: ['Student Data Protection', 'Research Security', 'Open Network Security', 'Zero Trust'],
    statistics: {
      breach_likelihood: 0.35,
      student_devices: 3.2,
      iot_percentage: 0.52,
      average_recovery_time: 195
    },
    recommended_vendors: ['portnox', 'aruba', 'juniper'],
    use_cases: [
      'BYOD for students and faculty',
      'Research network protection',
      'Campus-wide access control',
      'Student data privacy'
    ]
  }
};

// Make it globally available
window.INDUSTRY_DATA = INDUSTRY_DATA;
