/**
 * Vendor Data for Portnox Total Cost Analyzer
 * Contains detailed information about NAC vendors
 */

const VENDORS = {
  'portnox': {
    name: 'Portnox Cloud',
    logo: 'img/vendors/portnox-logo.png',
    architecture: 'cloud',
    description: 'Cloud-native NAC solution with zero infrastructure requirements',
    features: {
      cloudIntegration: true,
      legacyDevices: true,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: true,
      agentless: true,
      aiThreatPrevention: true,
      zeroDayProtection: true,
      multiCloud: true,
      hybridEnvironment: true,
      automatedRemediation: true
    },
    strengths: [
      'Zero infrastructure requirements',
      'Rapid deployment (3 weeks average)',
      'Automatic updates and scaling',
      'Global coverage',
      'Lowest TCO',
      'Agentless architecture',
      'Cloud-native design',
      'Continuous compliance monitoring'
    ],
    weaknesses: [
      'Newer to enterprise market',
      'Limited on-premises options'
    ],
    bestFor: [
      'Organizations seeking cost-effective NAC',
      'Multi-site deployments',
      'Cloud-first organizations',
      'Hybrid work environments',
      'Organizations with limited IT resources'
    ]
  },
  
  'cisco': {
    name: 'Cisco ISE',
    logo: 'img/vendors/cisco-logo.png',
    architecture: 'on-premises',
    description: 'Enterprise on-premises NAC solution with extensive integration capabilities',
    features: {
      cloudIntegration: false,
      legacyDevices: true,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: true,
      agentless: false,
      aiThreatPrevention: false,
      zeroDayProtection: false,
      multiCloud: false,
      hybridEnvironment: true,
      automatedRemediation: true
    },
    strengths: [
      'Extensive integration with Cisco ecosystem',
      'Mature solution with large install base',
      'Strong enterprise support',
      'Comprehensive policy management',
      'Scalable for large enterprises'
    ],
    weaknesses: [
      'High implementation and maintenance costs',
      'Complex deployment and management',
      'Requires dedicated IT staff',
      'Long implementation timeframes (3-4 months)'
    ],
    bestFor: [
      'Large enterprises with substantial IT resources',
      'Organizations with extensive Cisco infrastructure',
      'Complex network environments',
      'Organizations requiring deep customization'
    ]
  },
  
  'aruba': {
    name: 'Aruba ClearPass',
    logo: 'img/vendors/aruba-logo.png',
    architecture: 'on-premises',
    description: 'On-premises NAC solution with strong wireless capabilities',
    features: {
      cloudIntegration: false,
      legacyDevices: true,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: true,
      agentless: false,
      aiThreatPrevention: false,
      zeroDayProtection: false,
      multiCloud: false,
      hybridEnvironment: false,
      automatedRemediation: true
    },
    strengths: [
      'Strong wireless integration',
      'Good BYOD support',
      'Solid device profiling',
      'Integration with HP ecosystem',
      'Context-aware policy management'
    ],
    weaknesses: [
      'Limited cloud management capabilities',
      'High hardware costs',
      'Complex implementation',
      'Moderate learning curve'
    ],
    bestFor: [
      'Organizations with Aruba wireless infrastructure',
      'Mid-size to large enterprises',
      'Environments with extensive wireless needs',
      'Organizations with sufficient IT staff'
    ]
  },
  
  'forescout': {
    name: 'Forescout',
    logo: 'img/vendors/forescout-logo.png',
    architecture: 'on-premises',
    description: 'On-premises NAC solution with strong device discovery capabilities',
    features: {
      cloudIntegration: false,
      legacyDevices: true,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: false,
      agentless: true,
      aiThreatPrevention: false,
      zeroDayProtection: false,
      multiCloud: false,
      hybridEnvironment: false,
      automatedRemediation: true
    },
    strengths: [
      'Excellent device discovery',
      'Strong IoT security',
      'Agentless architecture',
      'Good legacy device support',
      'Strong compliance capabilities'
    ],
    weaknesses: [
      'High acquisition costs',
      'Limited cloud capabilities',
      'Complex licensing model',
      'Performance challenges at scale'
    ],
    bestFor: [
      'Organizations with diverse device types',
      'Environments with many IoT devices',
      'Organizations requiring strong device visibility',
      'Mid-size to large enterprises'
    ]
  },
  
  'fortinac': {
    name: 'FortiNAC',
    logo: 'img/vendors/fortinac-logo.png',
    architecture: 'on-premises',
    description: 'On-premises NAC solution integrated with Fortinet security ecosystem',
    features: {
      cloudIntegration: false,
      legacyDevices: true,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: false,
      agentless: false,
      aiThreatPrevention: false,
      zeroDayProtection: false,
      multiCloud: false,
      hybridEnvironment: false,
      automatedRemediation: true
    },
    strengths: [
      'Integration with Fortinet products',
      'Solid IoT protection',
      'Good device profiling',
      'Security fabric integration',
      'Moderate learning curve'
    ],
    weaknesses: [
      'Limited cloud management',
      'Restricted third-party integrations',
      'Complex policies for multi-vendor environments',
      'Moderate deployment complexity'
    ],
    bestFor: [
      'Organizations with Fortinet infrastructure',
      'Mid-size enterprises',
      'Organizations wanting unified security vendor',
      'Environments with moderate complexity'
    ]
  },
  
  'juniper': {
    name: 'Juniper Mist',
    logo: 'img/vendors/juniper-logo.png',
    architecture: 'hybrid',
    description: 'Cloud-managed NAC with on-premises components and strong AI capabilities',
    features: {
      cloudIntegration: true,
      legacyDevices: false,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: true,
      agentless: true,
      aiThreatPrevention: true,
      zeroDayProtection: false,
      multiCloud: false,
      hybridEnvironment: true,
      automatedRemediation: true
    },
    strengths: [
      'Strong AI-driven insights',
      'Excellent wireless management',
      'Cloud-managed architecture',
      'Good user experience',
      'Solid troubleshooting capabilities'
    ],
    weaknesses: [
      'Limited legacy device support',
      'Less mature NAC capabilities',
      'Primarily focused on wireless',
      'More limited enterprise deployments'
    ],
    bestFor: [
      'Organizations with Juniper infrastructure',
      'Wireless-focused environments',
      'Organizations valuing AI insights',
      'Mid-size enterprises with modern infrastructure'
    ]
  },
  
  'securew2': {
    name: 'SecureW2',
    logo: 'img/vendors/securew2-logo.png',
    architecture: 'cloud',
    description: 'Cloud-based identity and access management focused on certificate-based authentication',
    features: {
      cloudIntegration: true,
      legacyDevices: false,
      byod: true,
      iot: false,
      wireless: true,
      remoteUsers: true,
      agentless: false,
      aiThreatPrevention: false,
      zeroDayProtection: false,
      multiCloud: true,
      hybridEnvironment: true,
      automatedRemediation: false
    },
    strengths: [
      'Strong certificate-based authentication',
      'Good cloud integration',
      'Solid identity management',
      'Modern architecture',
      'Easier deployment than traditional NAC'
    ],
    weaknesses: [
      'More limited NAC feature set',
      'Less comprehensive device management',
      'Limited legacy device support',
      'Less mature solution'
    ],
    bestFor: [
      'Organizations focusing on identity-first security',
      'Cloud-first environments',
      'Organizations using certificate-based authentication',
      'Environments with primarily modern devices'
    ]
  },
  
  'microsoft': {
    name: 'Microsoft NPS',
    logo: 'img/vendors/microsoft-logo.png',
    architecture: 'on-premises',
    description: 'Basic on-premises RADIUS server built into Windows Server',
    features: {
      cloudIntegration: false,
      legacyDevices: true,
      byod: false,
      iot: false,
      wireless: true,
      remoteUsers: false,
      agentless: false,
      aiThreatPrevention: false,
      zeroDayProtection: false,
      multiCloud: false,
      hybridEnvironment: false,
      automatedRemediation: false
    },
    strengths: [
      'Included with Windows Server',
      'Familiar to Windows administrators',
      'Basic authentication capabilities',
      'Low additional licensing cost',
      'Integration with Active Directory'
    ],
    weaknesses: [
      'Very limited NAC capabilities',
      'No advanced features',
      'Limited device visibility',
      'Poor IoT and BYOD support',
      'Minimal automation'
    ],
    bestFor: [
      'Small organizations with limited requirements',
      'Windows-centric environments',
      'Organizations needing basic authentication only',
      'Environments with limited budget'
    ]
  },
  
  'arista': {
    name: 'Arista CloudVision',
    logo: 'img/vendors/arista-logo.png',
    architecture: 'hybrid',
    description: 'Hybrid network management with NAC capabilities focused on campus networks',
    features: {
      cloudIntegration: true,
      legacyDevices: false,
      byod: true,
      iot: true,
      wireless: true,
      remoteUsers: false,
      agentless: true,
      aiThreatPrevention: false,
      zeroDayProtection: false,
      multiCloud: false,
      hybridEnvironment: true,
      automatedRemediation: false
    },
    strengths: [
      'Good network visibility',
      'Strong integration with Arista switches',
      'Solid campus network support',
      'Centralized management',
      'Analytical capabilities'
    ],
    weaknesses: [
      'Limited traditional NAC features',
      'Less mature solution for NAC use cases',
      'More focused on network management than security',
      'Moderate complexity'
    ],
    bestFor: [
      'Organizations with Arista infrastructure',
      'Campus network environments',
      'Organizations wanting integrated network management',
      'Mid-size to large enterprises'
    ]
  },
  
  'foxpass': {
    name: 'Foxpass',
    logo: 'img/vendors/foxpass-logo.png',
    architecture: 'cloud',
    description: 'Cloud-based RADIUS and LDAP server with basic NAC capabilities',
    features: {
      cloudIntegration: true,
      legacyDevices: false,
      byod: true,
      iot: false,
      wireless: true,
      remoteUsers: false,
      agentless: true,
      aiThreatPrevention: false,
      zeroDayProtection: false,
      multiCloud: true,
      hybridEnvironment: false,
      automatedRemediation: false
    },
    strengths: [
      'Simple cloud-based solution',
      'Easy deployment',
      'Good for basic authentication',
      'SSO capabilities',
      'User-friendly interface'
    ],
    weaknesses: [
      'Limited enterprise NAC features',
      'Basic device profiling',
      'Limited security automation',
      'Less mature for large enterprises'
    ],
    bestFor: [
      'Small to mid-size organizations',
      'Cloud-first environments',
      'Organizations needing basic wireless authentication',
      'Environments with limited complexity'
    ]
  },
  
  'no-nac': {
    name: 'No NAC',
    logo: 'img/vendors/no-nac-icon.png',
    architecture: 'none',
    description: 'No network access control solution in place',
    features: {
      cloudIntegration: false,
      legacyDevices: false,
      byod: false,
      iot: false,
      wireless: false,
      remoteUsers: false,
      agentless: false,
      aiThreatPrevention: false,
      zeroDayProtection: false,
      multiCloud: false,
      hybridEnvironment: false,
      automatedRemediation: false
    },
    strengths: [
      'No upfront investment',
      'No implementation effort',
      'No maintenance overhead',
      'No complexity'
    ],
    weaknesses: [
      'No device visibility',
      'No access control',
      'No security enforcement',
      'No compliance capabilities',
      'High security risk',
      'Vulnerable to unauthorized access',
      'No protection against malicious devices'
    ],
    bestFor: [
      'Not recommended for any organization',
      'Extremely high-risk approach',
      'Fails to meet basic security requirements',
      'Non-compliant with most regulations'
    ]
  }
};

// Export vendor data if in a module context
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VENDORS };
}
