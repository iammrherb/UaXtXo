import { CalculatorState } from '../context/CalculatorContext';

// Create mock calculation results for testing
export const createMockCalculationResults = () => {
  const baseVendorResult = {
    vendorId: 'portnox',
    name: 'Portnox Cloud',
    description: 'Cloud-native NAC',
    logo: '/img/vendors/portnox-logo.png',
    badge: 'Best Value',
    badgeClass: 'badge-primary',
    deployment: 'cloud',
    totalTco: 202500,
    annualTco: 67500,
    implementationDays: 21,
    implementationCost: 15500,
    subscriptionCost: 153000,
    licenseCost: 0,
    maintenanceCost: 0,
    staffingCost: 34000,
    hardwareCost: 0,
    infrastructureCost: 0,
    riskReductionValue: 85000,
    complianceSavings: 92000,
    productivityGains: 130000,
    insuranceSavings: 28000,
    totalSavings: 335000,
    roi: 287,
    paybackPeriod: 7,
    securityImprovement: 74,
    costBreakdown: {
      licenses: 153000,
      maintenance: 0,
      implementation: 15500,
      operations: 34000,
      hardware: 0,
      infrastructure: 0
    },
    cumulativeCosts: {
      initial: 15500,
      year1: 67500,
      year2: 135000,
      year3: 202500,
      year4: 270000,
      year5: 337500
    },
    meanTimeToRespond: 45,
    operationalImpact: 'Low',
    managementComplexity: 3,
    featureScores: {
      cloudNative: 10,
      zeroTrust: 9,
      deploymentSpeed: 10,
      managementSimplicity: 9,
      scalability: 10,
      remoteAccess: 9,
      compliance: 8,
      costEffectiveness: 10,
      threatPrevention: 8,
      deviceDiscovery: 9,
      userExperience: 9,
      thirdPartyIntegration: 8
    },
    complianceScores: {
      pci: 90,
      hipaa: 85,
      nist: 95,
      gdpr: 85,
      iso: 80,
      cmmc: 90,
      ferpa: 75,
      sox: 80
    }
  };
  
  const ciscoResult = {
    ...baseVendorResult,
    vendorId: 'cisco',
    name: 'Cisco ISE',
    description: 'Enterprise NAC',
    badge: 'Complex',
    badgeClass: 'badge-warning',
    logo: '/img/vendors/cisco-logo.png',
    deployment: 'on-premises',
    totalTco: 450000,
    annualTco: 150000,
    implementationDays: 90,
    implementationCost: 120000,
    subscriptionCost: 0,
    licenseCost: 85000,
    maintenanceCost: 51000,
    staffingCost: 150000,
    hardwareCost: 120000,
    infrastructureCost: 54000,
    riskReductionValue: 75000,
    complianceSavings: 72000,
    productivityGains: 60000,
    insuranceSavings: 24000,
    totalSavings: 231000,
    roi: 125,
    paybackPeriod: 18,
    securityImprovement: 65,
    costBreakdown: {
      licenses: 85000,
      maintenance: 51000,
      implementation: 120000,
      operations: 150000,
      hardware: 120000,
      infrastructure: 54000
    },
    cumulativeCosts: {
      initial: 205000,
      year1: 285000,
      year2: 368000,
      year3: 450000,
      year4: 532000,
      year5: 615000
    },
    meanTimeToRespond: 90,
    operationalImpact: 'High',
    managementComplexity: 8,
    featureScores: {
      cloudNative: 4,
      zeroTrust: 7,
      deploymentSpeed: 3,
      managementSimplicity: 4,
      scalability: 8,
      remoteAccess: 6,
      compliance: 9,
      costEffectiveness: 3,
      threatPrevention: 8,
      deviceDiscovery: 8,
      userExperience: 5,
      thirdPartyIntegration: 9
    },
    complianceScores: {
      pci: 95,
      hipaa: 90,
      nist: 95,
      gdpr: 85,
      iso: 90,
      cmmc: 95,
      ferpa: 80,
      sox: 95
    }
  };
  
  const arubaResult = {
    ...baseVendorResult,
    vendorId: 'aruba',
    name: 'Aruba ClearPass',
    description: 'Policy manager',
    logo: '/img/vendors/aruba-logo.png',
    badge: '',
    badgeClass: '',
    deployment: 'on-premises',
    totalTco: 380000,
    annualTco: 126667,
    implementationDays: 75,
    implementationCost: 90000,
    subscriptionCost: 0,
    licenseCost: 70000,
    maintenanceCost: 37800,
    staffingCost: 112500,
    hardwareCost: 90000,
    infrastructureCost: 40500,
    riskReductionValue: 70000,
    complianceSavings: 64000,
    productivityGains: 56250,
    insuranceSavings: 21000,
    totalSavings: 211250,
    roi: 140,
    paybackPeriod: 15,
    securityImprovement: 60,
    featureScores: {
      cloudNative: 5,
      zeroTrust: 6,
      deploymentSpeed: 4,
      managementSimplicity: 5,
      scalability: 7,
      remoteAccess: 7,
      compliance: 8,
      costEffectiveness: 5,
      threatPrevention: 7,
      deviceDiscovery: 8,
      userExperience: 6,
      thirdPartyIntegration: 7
    }
  };
  
  return {
    vendorResults: [
      baseVendorResult,
      ciscoResult,
      arubaResult
    ],
    comparisonResults: {
      cisco: {
        savings: 247500,
        savingsPercentage: 55,
        roi: 162,
        paybackPeriod: 11,
        implementationDifference: 69,
        implementationPercentage: 76.67,
        featureDifferences: {
          cloudNative: 6,
          zeroTrust: 2,
          deploymentSpeed: 7,
          managementSimplicity: 5,
          scalability: 2,
          remoteAccess: 3,
          compliance: -1,
          costEffectiveness: 7
        }
      },
      aruba: {
        savings: 177500,
        savingsPercentage: 46.71,
        roi: 147,
        paybackPeriod: 8,
        implementationDifference: 54,
        implementationPercentage: 72,
        featureDifferences: {
          cloudNative: 5,
          zeroTrust: 3,
          deploymentSpeed: 6,
          managementSimplicity: 4,
          scalability: 3,
          remoteAccess: 2,
          compliance: 0,
          costEffectiveness: 5
        }
      }
    },
    executiveSummary: {
      totalSavings: 247000,
      savingsPercentage: 48,
      paybackPeriod: 7,
      riskReduction: 58,
      implementationTime: 21,
      topAdvantages: [
        'Cloud-native architecture eliminates hardware costs',
        'Rapid deployment reduces time-to-security by 75%',
        'Lower management overhead saves significant IT resources',
        'Continuous updates ensure latest security capabilities'
      ],
      topRisks: [
        'Staying with legacy NAC solutions increases breach risk',
        'Hardware-based solutions face obsolescence and upgrade cycles',
        'Complex solutions require specialized staffing and training',
        'On-premises deployments delay security improvements'
      ]
    },
    financialSummary: {
      annualSavings: 82333,
      fiveYearTco: 337500,
      costAvoidance: 370500,
      breakEvenPoint: 7
    },
    securitySummary: {
      riskReduction: 74,
      threatPreventionImprovement: 80,
      meanTimeToRespondImprovement: 45,
      complianceCoverage: 80,
      topSecurityBenefits: [
        'Real-time visibility of all network-connected devices',
        'Immediate quarantine of non-compliant devices',
        'Continuous monitoring of device security posture',
        'Automated enforcement of security policies'
      ]
    },
    riskAssessment: {
      baselineRisk: 500000,
      mitigatedRisk: 100000,
      financialRiskReduction: 85000,
      complianceRiskReduction: 92000,
      operationalRiskReduction: 130000
    },
    sensitivities: {
      deviceCountImpact: [
        { count: 500, tco: 202500 },
        { count: 1000, tco: 350000 },
        { count: 2500, tco: 750000 },
        { count: 5000, tco: 1250000 },
        { count: 10000, tco: 2500000 }
      ],
      fteCostImpact: [
        { cost: 75000, tco: 177500 },
        { cost: 100000, tco: 202500 },
        { cost: 125000, tco: 227500 },
        { cost: 150000, tco: 252500 },
        { cost: 175000, tco: 277500 }
      ],
      breachProbabilityImpact: [
        { probability: 0.1, savings: 28333 },
        { probability: 0.2, savings: 56667 },
        { probability: 0.3, savings: 85000 },
        { probability: 0.4, savings: 113333 },
        { probability: 0.5, savings: 141667 }
      ]
    }
  };
};

// Create a mock state for testing
export const createMockState = (): CalculatorState => {
  return {
    selectedVendors: ['portnox', 'cisco', 'aruba'],
    industry: 'financial',
    complianceRequirements: {
      pci: true,
      hipaa: false,
      nist: true,
      gdpr: true,
      iso: true,
      cmmc: false,
      ferpa: false,
      sox: true
    },
    riskProfile: 'regulated',
    organizationSize: 'medium',
    deviceCount: 3000,
    locations: 5,
    networkRequirements: {
      cloudIntegration: true,
      legacyDevices: true,
      byodSupport: true,
      iotSupport: true,
      wirelessSupport: true,
      remoteWork: true
    },
    yearsToProject: 3,
    costParameters: {
      portnoxBasePricePerDevice: 3.00,
      portnoxDiscount: 15,
      fteCost: 100000,
      fteAllocation: 25,
      maintenancePercentage: 18,
      downtimeCost: 5000,
      riskReduction: 35,
      insuranceReduction: 10,
    },
    currentView: 'executive',
    currentPanel: 'executive-summary',
    calculationResults: createMockCalculationResults()
  };
};
