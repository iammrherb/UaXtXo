/**
 * Industry-specific templates for the NAC TCO Calculator
 */
window.industryTemplates = {
  healthcare: {
    name: 'Healthcare',
    defaults: {
      deviceCount: 5000,
      yearsToProject: 3,
      multipleLocations: true,
      locationCount: 10,
      complexAuthentication: true,
      legacyDevices: true,
      legacyPercentage: 40,
      cloudIntegration: true,
      customPolicies: true,
      policyComplexity: 'high'
    },
    complianceInfo: {
      title: 'Healthcare Compliance Considerations',
      details: 'NAC solutions in healthcare must support HIPAA compliance by providing secure access to EHR systems, segmenting clinical and guest networks, and maintaining detailed audit logs for compliance reporting.',
      keyRequirements: [
        'PHI data protection',
        'Medical device security',
        'Guest network isolation',
        'Audit trail capabilities'
      ]
    },
    benchmarks: {
      averageTCO: 450000,
      implementationTime: 120,
      fteCost: 185000
    }
  },
  financial: {
    name: 'Financial Services',
    defaults: {
      deviceCount: 8000,
      yearsToProject: 5,
      multipleLocations: true,
      locationCount: 50,
      complexAuthentication: true,
      legacyDevices: true,
      legacyPercentage: 20,
      cloudIntegration: true,
      customPolicies: true,
      policyComplexity: 'high'
    },
    complianceInfo: {
      title: 'Financial Services Compliance Considerations',
      details: 'NAC solutions for financial institutions must align with regulatory frameworks like PCI-DSS, SOX, and GLBA, with strong emphasis on privileged access management and continuous monitoring.',
      keyRequirements: [
        'Continuous compliance monitoring',
        'Privileged access management',
        'Fine-grained access controls',
        'Advanced threat detection'
      ]
    },
    benchmarks: {
      averageTCO: 750000,
      implementationTime: 160,
      fteCost: 210000
    }
  },
  education: {
    name: 'Education',
    defaults: {
      deviceCount: 10000,
      yearsToProject: 3,
      multipleLocations: true,
      locationCount: 5,
      complexAuthentication: false,
      legacyDevices: true,
      legacyPercentage: 50,
      cloudIntegration: true,
      customPolicies: true,
      policyComplexity: 'medium'
    },
    complianceInfo: {
      title: 'Education Sector Considerations',
      details: 'Educational institutions require flexible NAC solutions that accommodate diverse user groups including students, faculty, staff, and guests while managing seasonal enrollment fluctuations.',
      keyRequirements: [
        'BYOD support',
        'Guest network management',
        'Seasonal scaling capabilities',
        'FERPA compliance'
      ]
    },
    benchmarks: {
      averageTCO: 320000,
      implementationTime: 90,
      fteCost: 150000
    }
  },
  manufacturing: {
    name: 'Manufacturing',
    defaults: {
      deviceCount: 3000,
      yearsToProject: 4,
      multipleLocations: true,
      locationCount: 3,
      complexAuthentication: true,
      legacyDevices: true,
      legacyPercentage: 70,
      cloudIntegration: false,
      customPolicies: true,
      policyComplexity: 'medium'
    },
    complianceInfo: {
      title: 'Manufacturing & Industrial Considerations',
      details: 'Manufacturing environments require NAC solutions that can secure OT/IT convergence zones, manage IoT devices, and protect industrial control systems with minimal downtime.',
      keyRequirements: [
        'ICS/SCADA protection',
        'IoT device management',
        'OT/IT segmentation',
        'High availability'
      ]
    },
    benchmarks: {
      averageTCO: 380000,
      implementationTime: 110,
      fteCost: 165000
    }
  },
  retail: {
    name: 'Retail',
    defaults: {
      deviceCount: 2500,
      yearsToProject: 3,
      multipleLocations: true,
      locationCount: 25,
      complexAuthentication: false,
      legacyDevices: true,
      legacyPercentage: 30,
      cloudIntegration: true,
      customPolicies: false,
      policyComplexity: 'low'
    },
    complianceInfo: {
      title: 'Retail Sector Considerations',
      details: 'Retail environments need NAC solutions that protect POS systems and customer data while providing convenient guest access and supporting seasonal staff fluctuations.',
      keyRequirements: [
        'PCI DSS compliance',
        'POS system security',
        'Guest WiFi management',
        'IoT device security'
      ]
    },
    benchmarks: {
      averageTCO: 280000,
      implementationTime: 75,
      fteCost: 140000
    }
  }
};
