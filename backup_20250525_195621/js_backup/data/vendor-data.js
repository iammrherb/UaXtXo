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
        {name: 'SOX', coverage: 90}
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
        {name: 'SOX', coverage: 85}
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
        {name: 'SOX', coverage: 80}
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
        {name: 'SOX', coverage: 85}
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
        {name: 'SOX', coverage: 80}
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
        {name: 'SOX', coverage: 75}
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
  },
  
  'microsoft': {
    name: 'Microsoft NPS',
    shortName: 'Microsoft',
    logoUrl: './img/vendors/microsoft.png',
    cloudNative: false,
    architecture: 'on-premises',
    deployment: {
      timeToValue: 45,
      complexity: 'Moderate',
      requiresHardware: true,
      requiresAgents: true,
      remoteWorkSupport: false,
      cloudManaged: false
    },
    costs: {
      pricing: 'included',
      licensePerDevice: 0,
      hardware: 30000,
      implementation: 45000,
      maintenance: 40000,
      yearlySubscription: 0,
      personnel: 100000,
      training: 15000,
      tco3Year: 290000
    },
    security: {
      zeroTrust: 60,
      deviceAuth: 70,
      riskAssessment: 60,
      remediationSpeed: 50,
      complianceCoverage: 65,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: false,
      automatedResponse: false
    },
    compliance: {
      pciDss: 70,
      hipaa: 70,
      gdpr: 70,
      nist: 65,
      iso27001: 75,
      sox: 70,
      cmmc: 75,
      frameworks: [
        {name: 'NIST CSF', coverage: 65, details: {identify: 60, protect: 70, detect: 65, respond: 60, recover: 65}},
        {name: 'PCI DSS', coverage: 70},
        {name: 'HIPAA', coverage: 70},
        {name: 'GDPR', coverage: 70},
        {name: 'ISO 27001', coverage: 75},
        {name: 'SOX', coverage: 70}
      ]
    },
    features: {
      byod: false,
      iot: false,
      wireless: true,
      wired: true,
      vpn: true,
      cloudIntegration: false,
      legacyDevices: true,
      remoteUsers: false,
      mdm: false,
      siem: false,
      sso: true,
      api: false,
      automatedProvisioning: false,
      dashboards: false,
      customReporting: false,
      userPortal: false
    },
    integration: {
      azure: true,
      googleWorkspace: false,
      aws: false,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: false,
      siem: false,
      ticketing: false,
      cmdb: false
    },
    technical: {
      maxDevices: '25,000+',
      performanceImpact: 'Moderate',
      scalability: 'Limited',
      reliability: 99.5,
      redundancy: 'Manual Configuration',
      disasterRecovery: 'Manual',
      updateFrequency: 'With Windows Updates'
    },
    customers: {
      industries: ['Government', 'Education', 'Small Business', 'Healthcare'],
      companySize: ['Small', 'Medium'],
      geoLocations: ['North America', 'Europe']
    },
    differentiators: [
      'Included with Windows Server',
      'Tight integration with Active Directory',
      'Low acquisition cost',
      'Familiar Microsoft management interface',
      'Simple deployment for basic use cases'
    ]
  },
  
  'securew2': {
    name: 'SecureW2',
    shortName: 'SecureW2',
    logoUrl: './img/vendors/securew2.png',
    cloudNative: true,
    architecture: 'cloud',
    deployment: {
      timeToValue: 7,
      complexity: 'Low',
      requiresHardware: false,
      requiresAgents: false,
      remoteWorkSupport: true,
      cloudManaged: true
    },
    costs: {
      pricing: 'subscription',
      licensePerDevice: 35,
      hardware: 0,
      implementation: 25000,
      maintenance: 0,
      yearlySubscription: 140000,
      personnel: 50000,
      training: 10000,
      tco3Year: 280000
    },
    security: {
      zeroTrust: 85,
      deviceAuth: 90,
      riskAssessment: 75,
      remediationSpeed: 20,
      complianceCoverage: 75,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: true,
      automatedResponse: false
    },
    compliance: {
      pciDss: 80,
      hipaa: 75,
      gdpr: 80,
      nist: 75,
      iso27001: 75,
      sox: 70,
      cmmc: 70,
      frameworks: [
        {name: 'NIST CSF', coverage: 75, details: {identify: 75, protect: 85, detect: 75, respond: 70, recover: 70}},
        {name: 'PCI DSS', coverage: 80},
        {name: 'HIPAA', coverage: 75},
        {name: 'GDPR', coverage: 80},
        {name: 'ISO 27001', coverage: 75},
        {name: 'SOX', coverage: 70}
      ]
    },
    features: {
      byod: true,
      iot: false,
      wireless: true,
      wired: false,
      vpn: true,
      cloudIntegration: true,
      legacyDevices: false,
      remoteUsers: true,
      mdm: true,
      siem: false,
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
      siem: false,
      ticketing: false,
      cmdb: false
    },
    technical: {
      maxDevices: 'Unlimited',
      performanceImpact: 'Minimal',
      scalability: 'Highly Scalable',
      reliability: 99.9,
      redundancy: 'Built-in',
      disasterRecovery: 'Automatic',
      updateFrequency: 'Continuous'
    },
    customers: {
      industries: ['Education', 'Healthcare', 'Retail', 'Technology'],
      companySize: ['Small', 'Medium', 'Large'],
      geoLocations: ['North America', 'Europe']
    },
    differentiators: [
      'Cloud-based certificate management',
      'Focus on wireless & BYOD security',
      'Simple onboarding experience',
      'No on-premises infrastructure required',
      'Fast deployment and time-to-value'
    ]
  },
  
  'extreme': {
    name: 'Extreme Networks NAC',
    shortName: 'Extreme',
    logoUrl: './img/vendors/extreme.png',
    cloudNative: false,
    architecture: 'hybrid',
    deployment: {
      timeToValue: 45,
      complexity: 'Moderate',
      requiresHardware: true,
      requiresAgents: false,
      remoteWorkSupport: true,
      cloudManaged: true
    },
    costs: {
      pricing: 'hybrid',
      licensePerDevice: 40,
      hardware: 70000,
      implementation: 55000,
      maintenance: 45000,
      yearlySubscription: 80000,
      personnel: 120000,
      training: 15000,
      tco3Year: 320000
    },
    security: {
      zeroTrust: 75,
      deviceAuth: 80,
      riskAssessment: 70,
      remediationSpeed: 30,
      complianceCoverage: 75,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: true,
      automatedResponse: false
    },
    compliance: {
      pciDss: 80,
      hipaa: 75,
      gdpr: 75,
      nist: 75,
      iso27001: 75,
      sox: 70,
      cmmc: 70,
      frameworks: [
        {name: 'NIST CSF', coverage: 75, details: {identify: 70, protect: 80, detect: 75, respond: 70, recover: 70}},
        {name: 'PCI DSS', coverage: 80},
        {name: 'HIPAA', coverage: 75},
        {name: 'GDPR', coverage: 75},
        {name: 'ISO 27001', coverage: 75},
        {name: 'SOX', coverage: 70}
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
      mdm: false,
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
      mdm: false,
      siem: true,
      ticketing: true,
      cmdb: false
    },
    technical: {
      maxDevices: '50,000+',
      performanceImpact: 'Moderate',
      scalability: 'Good',
      reliability: 99.8,
      redundancy: 'Available',
      disasterRecovery: 'Available',
      updateFrequency: 'Quarterly'
    },
    customers: {
      industries: ['Education', 'Manufacturing', 'Healthcare', 'Retail'],
      companySize: ['Medium', 'Large'],
      geoLocations: ['North America', 'Europe', 'Asia Pacific']
    },
    differentiators: [
      'Integration with Extreme management platforms',
      'Cloud management options',
      'Strong wireless network integration',
      'Good IoT device profiling',
      'Campus network focus'
    ]
  },
  
  'foxpass': {
    name: 'Foxpass',
    shortName: 'Foxpass',
    logoUrl: './img/vendors/foxpass.png',
    cloudNative: true,
    architecture: 'cloud',
    deployment: {
      timeToValue: 3,
      complexity: 'Low',
      requiresHardware: false,
      requiresAgents: false,
      remoteWorkSupport: true,
      cloudManaged: true
    },
    costs: {
      pricing: 'subscription',
      licensePerDevice: 20,
      hardware: 0,
      implementation: 20000,
      maintenance: 0,
      yearlySubscription: 80000,
      personnel: 50000,
      training: 5000,
      tco3Year: 270000
    },
    security: {
      zeroTrust: 70,
      deviceAuth: 75,
      riskAssessment: 60,
      remediationSpeed: 25,
      complianceCoverage: 65,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: false,
      automatedResponse: false
    },
    compliance: {
      pciDss: 70,
      hipaa: 65,
      gdpr: 70,
      nist: 60,
      iso27001: 65,
      sox: 60,
      cmmc: 60,
      frameworks: [
        {name: 'NIST CSF', coverage: 60, details: {identify: 60, protect: 70, detect: 60, respond: 55, recover: 55}},
        {name: 'PCI DSS', coverage: 70},
        {name: 'HIPAA', coverage: 65},
        {name: 'GDPR', coverage: 70},
        {name: 'ISO 27001', coverage: 65},
        {name: 'SOX', coverage: 60}
      ]
    },
    features: {
      byod: true,
      iot: false,
      wireless: true,
      wired: true,
      vpn: true,
      cloudIntegration: true,
      legacyDevices: false,
      remoteUsers: true,
      mdm: false,
      siem: false,
      sso: true,
      api: true,
      automatedProvisioning: true,
      dashboards: true,
      customReporting: false,
      userPortal: true
    },
    integration: {
      azure: true,
      googleWorkspace: true,
      aws: true,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: false,
      siem: false,
      ticketing: false,
      cmdb: false
    },
    technical: {
      maxDevices: '10,000+',
      performanceImpact: 'Minimal',
      scalability: 'Good',
      reliability: 99.9,
      redundancy: 'Built-in',
      disasterRecovery: 'Automatic',
      updateFrequency: 'Continuous'
    },
    customers: {
      industries: ['Technology', 'Education', 'Retail', 'Services'],
      companySize: ['Small', 'Medium'],
      geoLocations: ['North America', 'Europe']
    },
    differentiators: [
      'Cloud-based RADIUS and LDAP',
      'Simple deployment and management',
      'Developer-friendly approach',
      'API-first architecture',
      'Affordable for smaller organizations'
    ]
  },
  
  'arista': {
    name: 'Arista CloudVision',
    shortName: 'Arista',
    logoUrl: './img/vendors/arista.png',
    cloudNative: false,
    architecture: 'hybrid',
    deployment: {
      timeToValue: 45,
      complexity: 'Moderate',
      requiresHardware: true,
      requiresAgents: false,
      remoteWorkSupport: false,
      cloudManaged: true
    },
    costs: {
      pricing: 'hybrid',
      licensePerDevice: 35,
      hardware: 50000,
      implementation: 45000,
      maintenance: 35000,
      yearlySubscription: 70000,
      personnel: 110000,
      training: 10000,
      tco3Year: 320000
    },
    security: {
      zeroTrust: 65,
      deviceAuth: 75,
      riskAssessment: 70,
      remediationSpeed: 30,
      complianceCoverage: 70,
      mfa: true,
      certificateSupport: true,
      encryptionLevel: 'AES-256',
      continuousMonitoring: true,
      automatedResponse: false
    },
    compliance: {
      pciDss: 75,
      hipaa: 70,
      gdpr: 75,
      nist: 70,
      iso27001: 75,
      sox: 70,
      cmmc: 70,
      frameworks: [
        {name: 'NIST CSF', coverage: 70, details: {identify: 70, protect: 75, detect: 70, respond: 65, recover: 65}},
        {name: 'PCI DSS', coverage: 75},
        {name: 'HIPAA', coverage: 70},
        {name: 'GDPR', coverage: 75},
        {name: 'ISO 27001', coverage: 75},
        {name: 'SOX', coverage: 70}
      ]
    },
    features: {
      byod: true,
      iot: true,
      wireless: true,
      wired: true,
      vpn: false,
      cloudIntegration: true,
      legacyDevices: true,
      remoteUsers: false,
      mdm: false,
      siem: true,
      sso: true,
      api: true,
      automatedProvisioning: true,
      dashboards: true,
      customReporting: true,
      userPortal: false
    },
    integration: {
      azure: true,
      googleWorkspace: false,
      aws: true,
      activedirectory: true,
      ldap: true,
      radius: true,
      mdm: false,
      siem: true,
      ticketing: false,
      cmdb: false
    },
    technical: {
      maxDevices: '40,000+',
      performanceImpact: 'Low',
      scalability: 'Good',
      reliability: 99.8,
      redundancy: 'Available',
      disasterRecovery: 'Available',
      updateFrequency: 'Quarterly'
    },
    customers: {
      industries: ['Financial Services', 'Technology', 'Cloud Providers', 'Healthcare'],
      companySize: ['Large', 'Enterprise'],
      geoLocations: ['North America', 'Europe', 'Asia Pacific']
    },
    differentiators: [
      'Strong integration with Arista networks',
      'Good for data center environments',
      'Cognitive network management',
      'Network telemetry and analytics',
      'Streaming network state information'
    ]
  },
  
  'no-nac': {
    name: 'No NAC Solution',
    shortName: 'No NAC',
    logoUrl: './img/vendors/no-nac.png',
    cloudNative: false,
    architecture: 'none',
    deployment: {
      timeToValue: 0,
      complexity: 'None',
      requiresHardware: false,
      requiresAgents: false,
      remoteWorkSupport: false,
      cloudManaged: false
    },
    costs: {
      pricing: 'none',
      licensePerDevice: 0,
      hardware: 0,
      implementation: 0,
      maintenance: 0,
      yearlySubscription: 0,
      personnel: 0,
      training: 0,
      tco3Year: 0
    },
    security: {
      zeroTrust: 0,
      deviceAuth: 0,
      riskAssessment: 0,
      remediationSpeed: 120,
      complianceCoverage: 0,
      mfa: false,
      certificateSupport: false,
      encryptionLevel: 'None',
      continuousMonitoring: false,
      automatedResponse: false
    },
    compliance: {
      pciDss: 0,
      hipaa: 0,
      gdpr: 0,
      nist: 0,
      iso27001: 0,
      sox: 0,
      cmmc: 0,
      frameworks: [
        {name: 'NIST CSF', coverage: 0, details: {identify: 0, protect: 0, detect: 0, respond: 0, recover: 0}},
        {name: 'PCI DSS', coverage: 0},
        {name: 'HIPAA', coverage: 0},
        {name: 'GDPR', coverage: 0},
        {name: 'ISO 27001', coverage: 0},
        {name: 'SOX', coverage: 0}
      ]
    },
    features: {
      byod: false,
      iot: false,
      wireless: false,
      wired: false,
      vpn: false,
      cloudIntegration: false,
      legacyDevices: false,
      remoteUsers: false,
      mdm: false,
      siem: false,
      sso: false,
      api: false,
      automatedProvisioning: false,
      dashboards: false,
      customReporting: false,
      userPortal: false
    },
    integration: {
      azure: false,
      googleWorkspace: false,
      aws: false,
      activedirectory: false,
      ldap: false,
      radius: false,
      mdm: false,
      siem: false,
      ticketing: false,
      cmdb: false
    },
    technical: {
      maxDevices: 'N/A',
      performanceImpact: 'None',
      scalability: 'N/A',
      reliability: 0,
      redundancy: 'None',
      disasterRecovery: 'None',
      updateFrequency: 'N/A'
    },
    customers: {
      industries: ['Various'],
      companySize: ['Small'],
      geoLocations: ['Various']
    },
    differentiators: [
      'No upfront costs',
      'No implementation time',
      'No ongoing maintenance',
      'No training required',
      'High security risk'
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
  }
};

// Make it globally available
window.COMPLIANCE_FRAMEWORKS = COMPLIANCE_FRAMEWORKS;
