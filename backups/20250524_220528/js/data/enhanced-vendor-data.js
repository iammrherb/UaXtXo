/**
 * Enhanced Vendor Data for Zero Trust Total Cost Analyzer
 * Comprehensive NAC vendor database with detailed technical, financial, and compliance information
 */

const ENHANCED_VENDORS = {
  'portnox': {
    id: 'portnox',
    name: 'Portnox Cloud',
    shortName: 'Portnox',
    logo: './img/vendors/portnox-logo.png',
    icon: './img/vendors/portnox-icon.png',
    architecture: 'cloud',
    deployment: 'cloud-native',
    
    // Financial Data
    costs: {
      licensing: {
        model: 'subscription',
        perDevicePerMonth: 3.0,
        minimumCommitment: 12,
        discounts: {
          small: 0,
          medium: 15,
          large: 25,
          enterprise: 35
        }
      },
      implementation: {
        baseHours: 40,
        hourlyRate: 200,
        complexity: 'low',
        timeToValue: 1
      },
      hardware: 0,
      maintenance: 0,
      support: 'included'
    },
    
    // Technical Specifications
    technical: {
      maxDevices: 'unlimited',
      architecture: 'multi-tenant-cloud',
      deployment: 'saas',
      agents: false,
      onPremises: false,
      cloudIntegration: true,
      apiFirst: true,
      scalability: 'elastic',
      reliability: 99.99,
      security: {
        encryption: 'AES-256',
        dataResidency: 'configurable',
        soc2: true,
        iso27001: true
      }
    },
    
    // Zero Trust Capabilities
    zeroTrust: {
      score: 95,
      capabilities: {
        deviceAuth: 95,
        userAuth: 95,
        contextualAccess: 95,
        continuousVerification: 95,
        policyEnforcement: 95,
        threatDetection: 90
      }
    },
    
    // Compliance Coverage
    compliance: {
      pciDss: { coverage: 95, details: 'Full PCI DSS compliance support with automated reporting' },
      hipaa: { coverage: 95, details: 'HIPAA-compliant with BAA available' },
      gdpr: { coverage: 90, details: 'GDPR compliance with data residency controls' },
      sox: { coverage: 90, details: 'SOX compliance with audit trail capabilities' },
      nist: { coverage: 95, details: 'NIST Cybersecurity Framework alignment' },
      iso27001: { coverage: 95, details: 'ISO 27001 certified infrastructure' },
      cmmc: { coverage: 90, details: 'CMMC Level 3 ready' },
      fedramp: { coverage: 85, details: 'FedRAMP Moderate in progress' }
    },
    
    // Industry Fit
    industries: {
      healthcare: { fit: 95, reasoning: 'HIPAA compliance, rapid deployment, zero infrastructure' },
      finance: { fit: 90, reasoning: 'SOX/PCI compliance, high security, audit capabilities' },
      retail: { fit: 85, reasoning: 'PCI compliance, BYOD support, guest access' },
      manufacturing: { fit: 88, reasoning: 'IoT support, operational technology integration' },
      education: { fit: 92, reasoning: 'Easy deployment, BYOD, guest access, budget-friendly' },
      government: { fit: 87, reasoning: 'NIST compliance, security controls, audit capabilities' },
      technology: { fit: 95, reasoning: 'API-first, developer-friendly, cloud-native' }
    },
    
    // Implementation Profile
    implementation: {
      timeToValue: 1,
      complexity: 'very-low',
      prerequisites: 'minimal',
      training: 'basic',
      support: 'white-glove'
    },
    
    // Competitive Advantages
    advantages: [
      'True zero-infrastructure deployment',
      'Sub-hour implementation time',
      'Built-in Zero Trust architecture',
      'Continuous compliance monitoring',
      'API-first design for integrations',
      'Predictable subscription pricing',
      'Global cloud availability',
      'Advanced threat detection'
    ]
  },
  
  'cisco': {
    id: 'cisco',
    name: 'Cisco ISE',
    shortName: 'Cisco',
    logo: './img/vendors/cisco-logo.png',
    icon: './img/vendors/cisco-icon.png',
    architecture: 'on-premises',
    deployment: 'traditional',
    
    costs: {
      licensing: {
        model: 'perpetual',
        perDeviceBase: 110,
        maintenancePercentage: 20,
        discounts: {
          small: 0,
          medium: 10,
          large: 20,
          enterprise: 30
        }
      },
      implementation: {
        baseHours: 400,
        hourlyRate: 250,
        complexity: 'high',
        timeToValue: 90
      },
      hardware: {
        small: 120000,
        medium: 250000,
        large: 500000,
        enterprise: 950000
      },
      maintenance: 'required',
      support: 'smartnet'
    },
    
    technical: {
      maxDevices: 100000,
      architecture: 'distributed',
      deployment: 'on-premises',
      agents: true,
      onPremises: true,
      cloudIntegration: false,
      apiFirst: false,
      scalability: 'manual',
      reliability: 99.9,
      security: {
        encryption: 'AES-256',
        dataResidency: 'on-premises',
        soc2: false,
        iso27001: false
      }
    },
    
    zeroTrust: {
      score: 75,
      capabilities: {
        deviceAuth: 85,
        userAuth: 90,
        contextualAccess: 70,
        continuousVerification: 60,
        policyEnforcement: 85,
        threatDetection: 70
      }
    },
    
    compliance: {
      pciDss: { coverage: 90, details: 'Strong PCI compliance with extensive logging' },
      hipaa: { coverage: 85, details: 'HIPAA support with proper configuration' },
      gdpr: { coverage: 80, details: 'Limited GDPR features, manual processes' },
      sox: { coverage: 85, details: 'Good audit capabilities for SOX compliance' },
      nist: { coverage: 85, details: 'Partial NIST framework coverage' },
      iso27001: { coverage: 80, details: 'Basic ISO 27001 support' },
      cmmc: { coverage: 85, details: 'CMMC Level 3 capabilities' },
      fedramp: { coverage: 70, details: 'Limited FedRAMP capabilities' }
    },
    
    industries: {
      healthcare: { fit: 80, reasoning: 'Strong security but complex deployment' },
      finance: { fit: 85, reasoning: 'Enterprise-grade but high TCO' },
      retail: { fit: 75, reasoning: 'Comprehensive but over-engineered for most retail' },
      manufacturing: { fit: 85, reasoning: 'Good for complex industrial environments' },
      education: { fit: 70, reasoning: 'Complex and expensive for education budgets' },
      government: { fit: 90, reasoning: 'Extensive features for government requirements' },
      technology: { fit: 75, reasoning: 'Feature-rich but not cloud-native' }
    },
    
    implementation: {
      timeToValue: 90,
      complexity: 'very-high',
      prerequisites: 'extensive',
      training: 'advanced',
      support: 'professional-services'
    },
    
    advantages: [
      'Comprehensive feature set',
      'Deep Cisco ecosystem integration',
      'Mature product with long track record',
      'Extensive customization options',
      'Strong professional services',
      'Government and enterprise proven'
    ]
  },
  
  'aruba': {
    id: 'aruba',
    name: 'Aruba ClearPass',
    shortName: 'Aruba',
    logo: './img/vendors/aruba-logo.png',
    icon: './img/vendors/aruba-icon.png',
    architecture: 'on-premises',
    deployment: 'traditional',
    
    costs: {
      licensing: {
        model: 'perpetual',
        perDeviceBase: 100,
        maintenancePercentage: 18,
        discounts: {
          small: 0,
          medium: 15,
          large: 25,
          enterprise: 35
        }
      },
      implementation: {
        baseHours: 300,
        hourlyRate: 225,
        complexity: 'high',
        timeToValue: 75
      },
      hardware: {
        small: 90000,
        medium: 180000,
        large: 400000,
        enterprise: 800000
      },
      maintenance: 'required',
      support: 'care-pack'
    },
    
    technical: {
      maxDevices: 75000,
      architecture: 'centralized',
      deployment: 'on-premises',
      agents: true,
      onPremises: true,
      cloudIntegration: false,
      apiFirst: false,
      scalability: 'manual',
      reliability: 99.8,
      security: {
        encryption: 'AES-256',
        dataResidency: 'on-premises',
        soc2: false,
        iso27001: false
      }
    },
    
    zeroTrust: {
      score: 72,
      capabilities: {
        deviceAuth: 80,
        userAuth: 85,
        contextualAccess: 70,
        continuousVerification: 65,
        policyEnforcement: 80,
        threatDetection: 65
      }
    },
    
    compliance: {
      pciDss: { coverage: 85, details: 'Good PCI support with proper configuration' },
      hipaa: { coverage: 80, details: 'HIPAA capabilities with additional setup' },
      gdpr: { coverage: 75, details: 'Basic GDPR support, manual processes' },
      sox: { coverage: 80, details: 'Audit logging for SOX compliance' },
      nist: { coverage: 80, details: 'Partial NIST framework alignment' },
      iso27001: { coverage: 75, details: 'Basic ISO 27001 features' },
      cmmc: { coverage: 80, details: 'CMMC Level 2 capabilities' },
      fedramp: { coverage: 65, details: 'Limited government cloud features' }
    },
    
    industries: {
      healthcare: { fit: 75, reasoning: 'Good wireless focus but complex implementation' },
      finance: { fit: 80, reasoning: 'Strong security but high maintenance' },
      retail: { fit: 85, reasoning: 'Excellent for retail wireless environments' },
      manufacturing: { fit: 80, reasoning: 'Good industrial network support' },
      education: { fit: 85, reasoning: 'Strong education market presence' },
      government: { fit: 75, reasoning: 'Limited government-specific features' },
      technology: { fit: 70, reasoning: 'Traditional architecture, not cloud-ready' }
    },
    
    implementation: {
      timeToValue: 75,
      complexity: 'high',
      prerequisites: 'moderate',
      training: 'advanced',
      support: 'professional-services'
    },
    
    advantages: [
      'Strong wireless integration',
      'Proven in education market',
      'Good device profiling',
      'Comprehensive guest access',
      'Role-based access control',
      'HPE ecosystem integration'
    ]
  },
  
  'forescout': {
    id: 'forescout',
    name: 'Forescout Platform',
    shortName: 'Forescout',
    logo: './img/vendors/forescout-logo.png',
    icon: './img/vendors/forescout-icon.png',
    architecture: 'hybrid',
    deployment: 'distributed',
    
    costs: {
      licensing: {
        model: 'perpetual',
        perDeviceBase: 95,
        maintenancePercentage: 19,
        discounts: {
          small: 0,
          medium: 10,
          large: 20,
          enterprise: 30
        }
      },
      implementation: {
        baseHours: 350,
        hourlyRate: 275,
        complexity: 'high',
        timeToValue: 80
      },
      hardware: {
        small: 85000,
        medium: 170000,
        large: 350000,
        enterprise: 700000
      },
      maintenance: 'required',
      support: 'enterprise'
    },
    
    technical: {
      maxDevices: 60000,
      architecture: 'distributed',
      deployment: 'hybrid',
      agents: false,
      onPremises: true,
      cloudIntegration: true,
      apiFirst: true,
      scalability: 'good',
      reliability: 99.7,
      security: {
        encryption: 'AES-256',
        dataResidency: 'configurable',
        soc2: true,
        iso27001: false
      }
    },
    
    zeroTrust: {
      score: 82,
      capabilities: {
        deviceAuth: 85,
        userAuth: 75,
        contextualAccess: 85,
        continuousVerification: 85,
        policyEnforcement: 85,
        threatDetection: 80
      }
    },
    
    compliance: {
      pciDss: { coverage: 85, details: 'Strong device visibility for PCI compliance' },
      hipaa: { coverage: 80, details: 'Good healthcare device monitoring' },
      gdpr: { coverage: 75, details: 'Basic GDPR data protection features' },
      sox: { coverage: 82, details: 'Comprehensive audit and monitoring' },
      nist: { coverage: 85, details: 'Good NIST framework coverage' },
      iso27001: { coverage: 80, details: 'Security monitoring for ISO compliance' },
      cmmc: { coverage: 85, details: 'Strong CMMC Level 3 support' },
      fedramp: { coverage: 75, details: 'Government deployment options' }
    },
    
    industries: {
      healthcare: { fit: 85, reasoning: 'Excellent IoT and medical device visibility' },
      finance: { fit: 82, reasoning: 'Strong compliance and risk management' },
      retail: { fit: 75, reasoning: 'Good for complex retail environments' },
      manufacturing: { fit: 90, reasoning: 'Excellent OT/IT convergence support' },
      education: { fit: 75, reasoning: 'Good but complex for education' },
      government: { fit: 85, reasoning: 'Strong security and compliance features' },
      technology: { fit: 80, reasoning: 'Good API integration and automation' }
    },
    
    implementation: {
      timeToValue: 80,
      complexity: 'high',
      prerequisites: 'moderate',
      training: 'advanced',
      support: 'professional-services'
    },
    
    advantages: [
      'Agentless device discovery',
      'Comprehensive IoT support',
      'Strong OT/IT integration',
      'Advanced threat detection',
      'Extensive API capabilities',
      'Good compliance reporting'
    ]
  },
  
  'fortinac': {
    id: 'fortinac',
    name: 'FortiNAC',
    shortName: 'FortiNAC',
    logo: './img/vendors/fortinac-logo.png',
    icon: './img/vendors/fortinac-icon.png',
    architecture: 'hybrid',
    deployment: 'distributed',
    
    costs: {
      licensing: {
        model: 'perpetual',
        perDeviceBase: 85,
        maintenancePercentage: 20,
        discounts: {
          small: 0,
          medium: 15,
          large: 25,
          enterprise: 30
        }
      },
      implementation: {
        baseHours: 280,
        hourlyRate: 200,
        complexity: 'moderate',
        timeToValue: 60
      },
      hardware: {
        small: 75000,
        medium: 150000,
        large: 300000,
        enterprise: 600000
      },
      maintenance: 'required',
      support: 'fortiguard'
    },
    
    technical: {
      maxDevices: 50000,
      architecture: 'centralized',
      deployment: 'hybrid',
      agents: false,
      onPremises: true,
      cloudIntegration: true,
      apiFirst: false,
      scalability: 'good',
      reliability: 99.5,
      security: {
        encryption: 'AES-256',
        dataResidency: 'configurable',
        soc2: false,
        iso27001: false
      }
    },
    
    zeroTrust: {
      score: 78,
      capabilities: {
        deviceAuth: 80,
        userAuth: 80,
        contextualAccess: 75,
        continuousVerification: 75,
        policyEnforcement: 80,
        threatDetection: 80
      }
    },
    
    compliance: {
      pciDss: { coverage: 82, details: 'Good PCI support with Fortinet integration' },
      hipaa: { coverage: 78, details: 'Healthcare compliance with proper setup' },
      gdpr: { coverage: 72, details: 'Basic GDPR compliance features' },
      sox: { coverage: 80, details: 'Audit logging and reporting' },
      nist: { coverage: 80, details: 'NIST framework alignment' },
      iso27001: { coverage: 78, details: 'Security controls for ISO compliance' },
      cmmc: { coverage: 82, details: 'CMMC Level 2 capabilities' },
      fedramp: { coverage: 70, details: 'Limited government features' }
    },
    
    industries: {
      healthcare: { fit: 78, reasoning: 'Good security integration but complex' },
      finance: { fit: 80, reasoning: 'Strong security fabric integration' },
      retail: { fit: 82, reasoning: 'Good for retail security requirements' },
      manufacturing: { fit: 85, reasoning: 'Excellent industrial integration' },
      education: { fit: 80, reasoning: 'Good education deployment options' },
      government: { fit: 82, reasoning: 'Strong security focus for government' },
      technology: { fit: 75, reasoning: 'Good but not cloud-native' }
    },
    
    implementation: {
      timeToValue: 60,
      complexity: 'moderate',
      prerequisites: 'moderate',
      training: 'intermediate',
      support: 'vendor'
    },
    
    advantages: [
      'Fortinet Security Fabric integration',
      'Good automation capabilities',
      'Strong IoT security',
      'Competitive pricing',
      'Unified security management',
      'Good partner ecosystem'
    ]
  },
  
  'juniper': {
    id: 'juniper',
    name: 'Juniper NAC',
    shortName: 'Juniper',
    logo: './img/vendors/juniper-logo.png',
    icon: './img/vendors/juniper-icon.png',
    architecture: 'on-premises',
    deployment: 'traditional',
    
    costs: {
      licensing: {
        model: 'perpetual',
        perDeviceBase: 90,
        maintenancePercentage: 18,
        discounts: {
          small: 0,
          medium: 10,
          large: 20,
          enterprise: 25
        }
      },
      implementation: {
        baseHours: 320,
        hourlyRate: 225,
        complexity: 'moderate',
        timeToValue: 70
      },
      hardware: {
        small: 95000,
        medium: 190000,
        large: 380000,
        enterprise: 760000
      },
      maintenance: 'required',
      support: 'jtac'
    },
    
    technical: {
      maxDevices: 50000,
      architecture: 'centralized',
      deployment: 'on-premises',
      agents: true,
      onPremises: true,
      cloudIntegration: false,
      apiFirst: false,
      scalability: 'manual',
      reliability: 99.6,
      security: {
        encryption: 'AES-256',
        dataResidency: 'on-premises',
        soc2: false,
        iso27001: false
      }
    },
    
    zeroTrust: {
      score: 70,
      capabilities: {
        deviceAuth: 75,
        userAuth: 80,
        contextualAccess: 65,
        continuousVerification: 65,
        policyEnforcement: 75,
        threatDetection: 70
      }
    },
    
    compliance: {
      pciDss: { coverage: 80, details: 'Standard PCI compliance features' },
      hipaa: { coverage: 75, details: 'Basic HIPAA support' },
      gdpr: { coverage: 70, details: 'Limited GDPR features' },
      sox: { coverage: 78, details: 'Audit capabilities for SOX' },
      nist: { coverage: 75, details: 'Partial NIST framework support' },
      iso27001: { coverage: 75, details: 'Basic ISO compliance features' },
      cmmc: { coverage: 78, details: 'CMMC Level 2 support' },
      fedramp: { coverage: 68, details: 'Limited government features' }
    },
    
    industries: {
      healthcare: { fit: 72, reasoning: 'Basic healthcare support but limited features' },
      finance: { fit: 78, reasoning: 'Good for financial networks but expensive' },
      retail: { fit: 70, reasoning: 'Limited retail-specific features' },
      manufacturing: { fit: 75, reasoning: 'Good industrial network support' },
      education: { fit: 75, reasoning: 'Suitable for education but complex' },
      government: { fit: 80, reasoning: 'Good government security features' },
      technology: { fit: 72, reasoning: 'Traditional approach, not cloud-ready' }
    },
    
    implementation: {
      timeToValue: 70,
      complexity: 'moderate',
      prerequisites: 'moderate',
      training: 'intermediate',
      support: 'vendor'
    },
    
    advantages: [
      'Juniper ecosystem integration',
      'Solid networking foundation',
      'Good security integration',
      'Established vendor',
      'Service provider focus',
      'Network automation capabilities'
    ]
  },
  
  'securew2': {
    id: 'securew2',
    name: 'SecureW2',
    shortName: 'SecureW2',
    logo: './img/vendors/securew2-logo.png',
    icon: './img/vendors/securew2-icon.png',
    architecture: 'cloud',
    deployment: 'saas',
    
    costs: {
      licensing: {
        model: 'subscription',
        perDevicePerMonth: 3.75,
        minimumCommitment: 12,
        discounts: {
          small: 0,
          medium: 10,
          large: 20,
          enterprise: 25
        }
      },
      implementation: {
        baseHours: 60,
        hourlyRate: 150,
        complexity: 'low',
        timeToValue: 7
      },
      hardware: 0,
      maintenance: 0,
      support: 'included'
    },
    
    technical: {
      maxDevices: 'unlimited',
      architecture: 'cloud',
      deployment: 'saas',
      agents: false,
      onPremises: false,
      cloudIntegration: true,
      apiFirst: true,
      scalability: 'elastic',
      reliability: 99.9,
      security: {
        encryption: 'AES-256',
        dataResidency: 'configurable',
        soc2: true,
        iso27001: true
      }
    },
    
    zeroTrust: {
      score: 82,
      capabilities: {
        deviceAuth: 90,
        userAuth: 85,
        contextualAccess: 75,
        continuousVerification: 80,
        policyEnforcement: 80,
        threatDetection: 75
      }
    },
    
    compliance: {
      pciDss: { coverage: 78, details: 'Good PCI support for wireless environments' },
      hipaa: { coverage: 75, details: 'Basic HIPAA compliance for healthcare' },
      gdpr: { coverage: 80, details: 'Good GDPR compliance with cloud features' },
      sox: { coverage: 70, details: 'Basic audit capabilities' },
      nist: { coverage: 75, details: 'Partial NIST framework alignment' },
      iso27001: { coverage: 75, details: 'ISO compliance through cloud infrastructure' },
      cmmc: { coverage: 70, details: 'CMMC Level 1 capabilities' },
      fedramp: { coverage: 65, details: 'Limited government features' }
    },
    
    industries: {
      healthcare: { fit: 80, reasoning: 'Good for healthcare wireless security' },
      finance: { fit: 75, reasoning: 'Suitable for smaller financial institutions' },
      retail: { fit: 82, reasoning: 'Excellent for retail wireless and BYOD' },
      manufacturing: { fit: 70, reasoning: 'Limited industrial features' },
      education: { fit: 90, reasoning: 'Excellent for education BYOD and wireless' },
      government: { fit: 65, reasoning: 'Limited government-specific features' },
      technology: { fit: 85, reasoning: 'Good cloud-native approach for tech companies' }
    },
    
    implementation: {
      timeToValue: 7,
      complexity: 'low',
      prerequisites: 'minimal',
      training: 'basic',
      support: 'standard'
    },
    
    advantages: [
      'Cloud-based certificate management',
      'Easy wireless deployment',
      'Strong BYOD support',
      'Quick implementation',
      'Education market focus',
      'Competitive pricing'
    ]
  },
  
  'extreme': {
    id: 'extreme',
    name: 'Extreme Networks NAC',
    shortName: 'Extreme',
    logo: './img/vendors/extreme-logo.png',
    icon: './img/vendors/extreme-icon.png',
    architecture: 'hybrid',
    deployment: 'cloud-managed',
    
    costs: {
      licensing: {
        model: 'hybrid',
        perDeviceBase: 75,
        cloudSubscription: 25,
        discounts: {
          small: 0,
          medium: 15,
          large: 20,
          enterprise: 25
        }
      },
      implementation: {
        baseHours: 200,
        hourlyRate: 175,
        complexity: 'moderate',
        timeToValue: 45
      },
      hardware: {
        small: 70000,
        medium: 140000,
        large: 280000,
        enterprise: 560000
      },
      maintenance: 'included',
      support: 'gtac'
    },
    
    technical: {
      maxDevices: 50000,
      architecture: 'hybrid',
      deployment: 'cloud-managed',
      agents: false,
      onPremises: true,
      cloudIntegration: true,
      apiFirst: true,
      scalability: 'good',
      reliability: 99.5,
      security: {
        encryption: 'AES-256',
        dataResidency: 'configurable',
        soc2: true,
        iso27001: false
      }
    },
    
    zeroTrust: {
      score: 75,
      capabilities: {
        deviceAuth: 80,
        userAuth: 78,
        contextualAccess: 72,
        continuousVerification: 70,
        policyEnforcement: 78,
        threatDetection: 72
      }
    },
    
    compliance: {
      pciDss: { coverage: 78, details: 'Good PCI compliance with proper setup' },
      hipaa: { coverage: 75, details: 'Healthcare compliance capabilities' },
      gdpr: { coverage: 72, details: 'Basic GDPR compliance features' },
      sox: { coverage: 75, details: 'Audit and logging capabilities' },
      nist: { coverage: 75, details: 'NIST framework partial coverage' },
      iso27001: { coverage: 72, details: 'Basic ISO compliance support' },
      cmmc: { coverage: 75, details: 'CMMC Level 2 capabilities' },
      fedramp: { coverage: 68, details: 'Limited government features' }
    },
    
    industries: {
      healthcare: { fit: 78, reasoning: 'Good healthcare wireless support' },
      finance: { fit: 75, reasoning: 'Suitable for mid-market finance' },
      retail: { fit: 80, reasoning: 'Good retail wireless solutions' },
      manufacturing: { fit: 82, reasoning: 'Strong industrial network support' },
      education: { fit: 85, reasoning: 'Excellent education market presence' },
      government: { fit: 72, reasoning: 'Limited government-specific features' },
      technology: { fit: 78, reasoning: 'Good cloud management but traditional base' }
    },
    
    implementation: {
      timeToValue: 45,
      complexity: 'moderate',
      prerequisites: 'moderate',
      training: 'intermediate',
      support: 'vendor'
    },
    
    advantages: [
      'Cloud management options',
      'Good education focus',
      'Competitive pricing',
      'Solid wireless integration',
      'Growing IoT capabilities',
      'Partner-friendly approach'
    ]
  },
  
  'foxpass': {
    id: 'foxpass',
    name: 'Foxpass',
    shortName: 'Foxpass',
    logo: './img/vendors/foxpass-logo.png',
    icon: './img/vendors/foxpass-icon.png',
    architecture: 'cloud',
    deployment: 'saas',
    
    costs: {
      licensing: {
        model: 'subscription',
        perDevicePerMonth: 2.5,
        minimumCommitment: 12,
        discounts: {
          small: 0,
          medium: 10,
          large: 15,
          enterprise: 20
        }
      },
      implementation: {
        baseHours: 40,
        hourlyRate: 125,
        complexity: 'very-low',
        timeToValue: 3
      },
      hardware: 0,
      maintenance: 0,
      support: 'email'
    },
    
    technical: {
      maxDevices: 10000,
      architecture: 'cloud',
      deployment: 'saas',
      agents: false,
      onPremises: false,
      cloudIntegration: true,
      apiFirst: true,
      scalability: 'good',
      reliability: 99.9,
      security: {
        encryption: 'AES-256',
        dataResidency: 'us-only',
        soc2: false,
        iso27001: false
      }
    },
    
    zeroTrust: {
      score: 68,
      capabilities: {
        deviceAuth: 75,
        userAuth: 80,
        contextualAccess: 60,
        continuousVerification: 60,
        policyEnforcement: 65,
        threatDetection: 60
      }
    },
    
    compliance: {
      pciDss: { coverage: 65, details: 'Basic PCI compliance features' },
      hipaa: { coverage: 60, details: 'Limited HIPAA support' },
      gdpr: { coverage: 70, details: 'Basic GDPR compliance' },
      sox: { coverage: 60, details: 'Minimal audit capabilities' },
      nist: { coverage: 60, details: 'Limited NIST framework support' },
      iso27001: { coverage: 60, details: 'Basic security controls' },
      cmmc: { coverage: 55, details: 'Limited CMMC capabilities' },
      fedramp: { coverage: 50, details: 'No government features' }
    },
    
    industries: {
      healthcare: { fit: 60, reasoning: 'Limited healthcare-specific features' },
      finance: { fit: 65, reasoning: 'Basic features for smaller financial firms' },
      retail: { fit: 75, reasoning: 'Good for simple retail wireless needs' },
      manufacturing: { fit: 60, reasoning: 'Limited industrial capabilities' },
      education: { fit: 80, reasoning: 'Good for smaller education institutions' },
      government: { fit: 50, reasoning: 'No government-specific features' },
      technology: { fit: 85, reasoning: 'Great for tech startups and SMBs' }
    },
    
    implementation: {
      timeToValue: 3,
      complexity: 'very-low',
      prerequisites: 'minimal',
      training: 'minimal',
      support: 'community'
    },
    
    advantages: [
      'Very simple deployment',
      'Developer-friendly',
      'API-first approach',
      'Cost-effective for SMBs',
      'Quick setup',
      'Cloud-native architecture'
    ]
  },
  
  'microsoft': {
    id: 'microsoft',
    name: 'Microsoft NPS',
    shortName: 'Microsoft',
    logo: './img/vendors/microsoft-logo.png',
    icon: './img/vendors/microsoft-icon.png',
    architecture: 'on-premises',
    deployment: 'traditional',
    
    costs: {
      licensing: {
        model: 'included',
        perDeviceBase: 0,
        windowsServerRequired: true,
        calRequired: true,
        discounts: {
          small: 0,
          medium: 0,
          large: 0,
          enterprise: 0
        }
      },
      implementation: {
        baseHours: 120,
        hourlyRate: 150,
        complexity: 'moderate',
        timeToValue: 30
      },
      hardware: {
        small: 30000,
        medium: 60000,
        large: 120000,
        enterprise: 240000
      },
      maintenance: 'minimal',
      support: 'microsoft'
    },
    
    technical: {
      maxDevices: 25000,
      architecture: 'simple',
      deployment: 'on-premises',
      agents: false,
      onPremises: true,
      cloudIntegration: false,
      apiFirst: false,
      scalability: 'limited',
      reliability: 99.0,
      security: {
        encryption: 'AES-256',
        dataResidency: 'on-premises',
        soc2: false,
        iso27001: false
      }
    },
    
    zeroTrust: {
      score: 45,
      capabilities: {
        deviceAuth: 60,
        userAuth: 70,
        contextualAccess: 30,
        continuousVerification: 25,
        policyEnforcement: 50,
        threatDetection: 30
      }
    },
    
    compliance: {
      pciDss: { coverage: 60, details: 'Basic PCI compliance with additional configuration' },
      hipaa: { coverage: 65, details: 'HIPAA support with proper Windows setup' },
      gdpr: { coverage: 55, details: 'Limited GDPR features' },
      sox: { coverage: 65, details: 'Basic audit logging capabilities' },
      nist: { coverage: 60, details: 'Partial NIST framework coverage' },
      iso27001: { coverage: 65, details: 'Basic ISO compliance through Windows' },
      cmmc: { coverage: 70, details: 'CMMC Level 1 capabilities' },
      fedramp: { coverage: 75, details: 'Government Windows deployments' }
    },
    
    industries: {
      healthcare: { fit: 60, reasoning: 'Basic healthcare support, limited features' },
      finance: { fit: 55, reasoning: 'Too basic for most financial requirements' },
      retail: { fit: 65, reasoning: 'Suitable for very basic retail needs' },
      manufacturing: { fit: 60, reasoning: 'Limited industrial capabilities' },
      education: { fit: 75, reasoning: 'Good for education with existing Windows infrastructure' },
      government: { fit: 70, reasoning: 'Government Windows environments' },
      technology: { fit: 50, reasoning: 'Too basic for modern tech requirements' }
    },
    
    implementation: {
      timeToValue: 30,
      complexity: 'moderate',
      prerequisites: 'windows-infrastructure',
      training: 'basic',
      support: 'microsoft'
    },
    
    advantages: [
      'Included with Windows Server',
      'Familiar Microsoft interface',
      'Active Directory integration',
      'Low acquisition cost',
      'Government-approved',
      'Existing Windows skill base'
    ]
  },
  
  'arista': {
    id: 'arista',
    name: 'Arista CloudVision',
    shortName: 'Arista',
    logo: './img/vendors/arista-logo.png',
    icon: './img/vendors/arista-icon.png',
    architecture: 'hybrid',
    deployment: 'cloud-managed',
    
    costs: {
      licensing: {
        model: 'hybrid',
        perDeviceBase: 80,
        cloudSubscription: 30,
        discounts: {
          small: 0,
          medium: 10,
          large: 20,
          enterprise: 30
        }
      },
      implementation: {
        baseHours: 180,
        hourlyRate: 200,
        complexity: 'moderate',
        timeToValue: 50
      },
      hardware: {
        small: 50000,
        medium: 100000,
        large: 200000,
        enterprise: 400000
      },
      maintenance: 'included',
      support: 'arista-tac'
    },
    
    technical: {
      maxDevices: 40000,
      architecture: 'cloud-managed',
      deployment: 'hybrid',
      agents: false,
      onPremises: true,
      cloudIntegration: true,
      apiFirst: true,
      scalability: 'good',
      reliability: 99.8,
      security: {
        encryption: 'AES-256',
        dataResidency: 'configurable',
        soc2: true,
        iso27001: true
      }
    },
    
    zeroTrust: {
      score: 72,
      capabilities: {
        deviceAuth: 75,
        userAuth: 70,
        contextualAccess: 75,
        continuousVerification: 70,
        policyEnforcement: 75,
        threatDetection: 70
      }
    },
    
    compliance: {
      pciDss: { coverage: 75, details: 'Good PCI compliance with network integration' },
      hipaa: { coverage: 70, details: 'Healthcare compliance with proper setup' },
      gdpr: { coverage: 72, details: 'GDPR compliance through cloud features' },
      sox: { coverage: 75, details: 'Good audit and monitoring capabilities' },
      nist: { coverage: 75, details: 'NIST framework partial coverage' },
      iso27001: { coverage: 78, details: 'ISO compliance through certified cloud' },
      cmmc: { coverage: 75, details: 'CMMC Level 2 capabilities' },
      fedramp: { coverage: 70, details: 'Some government cloud features' }
    },
    
    industries: {
      healthcare: { fit: 72, reasoning: 'Good for healthcare data centers' },
      finance: { fit: 80, reasoning: 'Excellent for financial data centers and trading' },
      retail: { fit: 70, reasoning: 'Good for retail data center environments' },
      manufacturing: { fit: 75, reasoning: 'Good industrial data center support' },
      education: { fit: 68, reasoning: 'Limited education-specific features' },
      government: { fit: 75, reasoning: 'Good government data center support' },
      technology: { fit: 85, reasoning: 'Excellent for tech companies and cloud providers' }
    },
    
    implementation: {
      timeToValue: 50,
      complexity: 'moderate',
      prerequisites: 'arista-infrastructure',
      training: 'intermediate',
      support: 'vendor'
    },
    
    advantages: [
      'Cloud-managed infrastructure',
      'Strong data center focus',
      'Good API integration',
      'Network telemetry',
      'Arista ecosystem integration',
      'Cognitive networking features'
    ]
  }
};

// Industry-specific compliance requirements mapping
const INDUSTRY_COMPLIANCE_MATRIX = {
  healthcare: {
    required: ['hipaa', 'gdpr'],
    recommended: ['nist', 'iso27001'],
    optional: ['sox']
  },
  finance: {
    required: ['pci-dss', 'sox', 'gdpr'],
    recommended: ['nist', 'iso27001'],
    optional: ['cmmc']
  },
  retail: {
    required: ['pci-dss', 'gdpr'],
    recommended: ['nist'],
    optional: ['iso27001']
  },
  manufacturing: {
    required: ['gdpr'],
    recommended: ['nist', 'iso27001'],
    optional: ['cmmc']
  },
  education: {
    required: ['gdpr'],
    recommended: ['nist'],
    optional: ['hipaa', 'iso27001']
  },
  government: {
    required: ['nist', 'cmmc', 'fedramp'],
    recommended: ['iso27001'],
    optional: ['gdpr']
  },
  technology: {
    required: ['gdpr'],
    recommended: ['nist', 'iso27001'],
    optional: ['sox']
  }
};

// TCO calculation factors by company size
const TCO_FACTORS = {
  'very-small': {
    fteMultiplier: 0.5,
    complexityFactor: 0.8,
    supportMultiplier: 1.2
  },
  small: {
    fteMultiplier: 0.75,
    complexityFactor: 0.9,
    supportMultiplier: 1.1
  },
  medium: {
    fteMultiplier: 1.0,
    complexityFactor: 1.0,
    supportMultiplier: 1.0
  },
  large: {
    fteMultiplier: 1.25,
    complexityFactor: 1.1,
    supportMultiplier: 0.9
  },
  enterprise: {
    fteMultiplier: 1.5,
    complexityFactor: 1.2,
    supportMultiplier: 0.8
  }
};

// Make data globally available
window.ENHANCED_VENDORS = ENHANCED_VENDORS;
window.INDUSTRY_COMPLIANCE_MATRIX = INDUSTRY_COMPLIANCE_MATRIX;
window.TCO_FACTORS = TCO_FACTORS;

// Initialize vendor data
document.addEventListener('DOMContentLoaded', function() {
  console.log('Enhanced vendor data loaded:', Object.keys(ENHANCED_VENDORS).length, 'vendors');
});
