/**
 * Vendor Data Module
 * Contains data for all NAC vendors for comparison
 */
const VendorData = {
  // Vendor display names
  vendorNames: {
    'portnox': 'Portnox Cloud',
    'cisco': 'Cisco ISE',
    'aruba': 'Aruba ClearPass',
    'forescout': 'Forescout',
    'fortinac': 'FortiNAC',
    'juniper': 'Juniper Mist',
    'securew2': 'SecureW2',
    'nps': 'Microsoft NPS',
    'arista': 'Arista Agni',
    'foxpass': 'Foxpass',
    'noNac': 'No NAC Solution'
  },
  
  // Vendor colors for charts
  vendorColors: {
    'portnox': '#36B37E',
    'cisco': '#0D5BD9',
    'aruba': '#A44CFE',
    'forescout': '#FF8C3B',
    'fortinac': '#0088FE',
    'juniper': '#7E57C2',
    'securew2': '#00ACC1',
    'nps': '#00A8E8',
    'arista': '#8D99AE',
    'foxpass': '#EC7063',
    'noNac': '#FF5252'
  },
  
  // TCO data for 3 years (Year 1, Year 2, Year 3) in USD
  tcoData: {
    'portnox': [180000, 150000, 145000],
    'cisco': [350000, 250000, 260000],
    'aruba': [320000, 240000, 250000],
    'forescout': [310000, 230000, 240000],
    'fortinac': [290000, 220000, 230000],
    'juniper': [300000, 230000, 235000],
    'securew2': [200000, 180000, 170000],
    'nps': [150000, 170000, 190000],
    'noNac': [50000, 60000, 70000]
  },
  
  // Cumulative cost over time (Initial, Month 3, Month 6, Month 9, Year 1, Year 2, Year 3)
  cumulativeData: {
    'portnox': [70000, 90000, 110000, 130000, 150000, 300000, 445000],
    'cisco': [120000, 180000, 240000, 310000, 350000, 600000, 860000],
    'aruba': [100000, 160000, 220000, 290000, 320000, 560000, 810000],
    'forescout': [110000, 170000, 230000, 280000, 310000, 540000, 780000],
    'fortinac': [100000, 150000, 210000, 270000, 290000, 510000, 740000],
    'juniper': [110000, 165000, 220000, 275000, 300000, 530000, 765000],
    'securew2': [80000, 110000, 140000, 170000, 200000, 380000, 550000],
    'nps': [70000, 90000, 110000, 130000, 150000, 320000, 510000],
    'noNac': [10000, 20000, 30000, 40000, 50000, 110000, 180000]
  },
  
  // Cost breakdown by category (percentages)
  breakdownData: {
    'portnox': [
      { name: 'Subscription', value: 70 },
      { name: 'Implementation', value: 15 },
      { name: 'Support', value: 10 },
      { name: 'Training', value: 5 }
    ],
    'cisco': [
      { name: 'Hardware', value: 35 },
      { name: 'Software', value: 25 },
      { name: 'Implementation', value: 20 },
      { name: 'Maintenance', value: 15 },
      { name: 'Training', value: 5 }
    ],
    'aruba': [
      { name: 'Hardware', value: 30 },
      { name: 'Software', value: 28 },
      { name: 'Implementation', value: 22 },
      { name: 'Maintenance', value: 13 },
      { name: 'Training', value: 7 }
    ],
    'forescout': [
      { name: 'Hardware', value: 30 },
      { name: 'Software', value: 30 },
      { name: 'Implementation', value: 20 },
      { name: 'Maintenance', value: 15 },
      { name: 'Training', value: 5 }
    ],
    'fortinac': [
      { name: 'Hardware', value: 25 },
      { name: 'Software', value: 30 },
      { name: 'Implementation', value: 25 },
      { name: 'Maintenance', value: 15 },
      { name: 'Training', value: 5 }
    ]
  },
  
  // Implementation data (days per phase: Planning, Installation, Configuration, Testing, Training, Deployment)
  implementationData: {
    'portnox': [10, 5, 15, 10, 5, 10],
    'cisco': [30, 45, 60, 30, 20, 45],
    'aruba': [25, 40, 55, 25, 15, 40],
    'forescout': [20, 40, 50, 25, 15, 40],
    'fortinac': [25, 35, 45, 20, 15, 30],
    'juniper': [20, 30, 45, 25, 15, 35],
    'securew2': [15, 10, 20, 15, 10, 15],
    'nps': [15, 15, 30, 20, 10, 20]
  },
  
  // Feature scores (0-100) for different categories
  // Categories: Cloud Support, API Integration, Scalability, Security, User Experience, Zero Trust, Mobile Support
  featureData: {
    'portnox': [100, 90, 95, 95, 90, 100, 90],
    'cisco': [50, 60, 70, 80, 60, 40, 50],
    'aruba': [60, 70, 75, 85, 65, 45, 65],
    'forescout': [55, 75, 70, 90, 70, 50, 60],
    'fortinac': [50, 65, 75, 80, 60, 40, 55],
    'juniper': [65, 70, 75, 80, 75, 50, 70],
    'securew2': [90, 75, 85, 75, 80, 70, 85],
    'nps': [30, 40, 65, 60, 40, 30, 30],
    'noNac': [0, 0, 0, 10, 0, 0, 0]
  },
  
  // Compliance coverage scores (0-100) for different frameworks
  // Frameworks: NIST, ISO 27001, HIPAA, PCI DSS, GDPR
  complianceData: {
    'portnox': [95, 90, 100, 95, 85],
    'cisco': [70, 65, 60, 75, 50],
    'aruba': [75, 70, 65, 80, 60],
    'forescout': [65, 60, 70, 75, 55],
    'fortinac': [60, 55, 65, 70, 50],
    'juniper': [65, 60, 70, 75, 55],
    'securew2': [80, 75, 85, 80, 70],
    'nps': [45, 40, 50, 55, 35],
    'noNac': [10, 10, 10, 10, 10]
  },
  
  // ROI data over time (Year 1, Year 2, Year 3) in USD
  roiData: {
    'portnox': [20000, 150000, 280000],
    'cisco': [-30000, 20000, 75000],
    'aruba': [-20000, 30000, 85000],
    'forescout': [-25000, 25000, 80000],
    'fortinac': [-15000, 35000, 90000],
    'juniper': [-20000, 30000, 85000],
    'securew2': [10000, 100000, 200000],
    'nps': [0, 50000, 100000],
    'noNac': [-100000, -150000, -200000]
  },
  
  // Risk scores (lower is better) for different categories
  // Categories: Breach Risk, Compliance, Visibility, Management, Uptime
  riskData: {
    'portnox': [30, 20, 15, 25, 10],
    'cisco': [70, 60, 55, 65, 40],
    'aruba': [65, 55, 50, 60, 35],
    'forescout': [60, 50, 40, 55, 30],
    'fortinac': [65, 55, 45, 60, 35],
    'juniper': [60, 50, 45, 55, 30],
    'securew2': [40, 30, 35, 40, 25],
    'nps': [80, 70, 75, 65, 50],
    'noNac': [100, 90, 95, 90, 80]
  },
  
  // Detailed cost components for TCO calculator
  costComponents: {
    'portnox': {
      hardware: 0,
      software: 300000,
      implementation: 30000,
      maintenance: 45000,
      personnel: 54000
    },
    'cisco': {
      hardware: 175000,
      software: 250000,
      implementation: 120000,
      maintenance: 180000,
      personnel: 180000
    },
    'aruba': {
      hardware: 160000,
      software: 240000,
      implementation: 110000,
      maintenance: 170000,
      personnel: 162000
    },
    'forescout': {
      hardware: 150000,
      software: 235000,
      implementation: 105000,
      maintenance: 160000,
      personnel: 144000
    },
    'fortinac': {
      hardware: 130000,
      software: 200000,
      implementation: 100000,
      maintenance: 150000,
      personnel: 144000
    },
    'juniper': {
      hardware: 140000,
      software: 220000,
      implementation: 105000,
      maintenance: 155000,
      personnel: 144000
    },
    'securew2': {
      hardware: 0,
      software: 250000,
      implementation: 45000,
      maintenance: 60000,
      personnel: 72000
    },
    'nps': {
      hardware: 50000,
      software: 0,
      implementation: 90000,
      maintenance: 45000,
      personnel: 216000
    },
    'noNac': {
      hardware: 0,
      software: 0,
      implementation: 0,
      maintenance: 0,
      personnel: 180000
    }
  },
  
  // Implementation timelines in days
  implementationTimelines: {
    'portnox': 45,
    'cisco': 180,
    'aruba': 160,
    'forescout': 150,
    'fortinac': 140,
    'juniper': 145,
    'securew2': 60,
    'nps': 90,
    'noNac': 0
  },
  
  // FTE requirements (full-time equivalent)
  fteRequirements: {
    'portnox': 0.15,
    'cisco': 0.5,
    'aruba': 0.45,
    'forescout': 0.4,
    'fortinac': 0.4,
    'juniper': 0.4,
    'securew2': 0.2,
    'nps': 0.6,
    'noNac': 0.5
  },
  
  // Value drivers for ROI analysis
  valueDrivers: {
    'portnox': [
      { name: 'Cost Reduction', value: 40 },
      { name: 'Operational Efficiency', value: 25 },
      { name: 'Risk Mitigation', value: 20 },
      { name: 'Agility', value: 15 }
    ],
    'cisco': [
      { name: 'Cost Reduction', value: 20 },
      { name: 'Operational Efficiency', value: 15 },
      { name: 'Risk Mitigation', value: 45 },
      { name: 'Agility', value: 20 }
    ],
    'aruba': [
      { name: 'Cost Reduction', value: 25 },
      { name: 'Operational Efficiency', value: 20 },
      { name: 'Risk Mitigation', value: 40 },
      { name: 'Agility', value: 15 }
    ]
  },
  
  // Benefit categories with estimated values
  benefitDetails: {
    'portnox': [
      { category: 'Cost Avoidance', description: 'Hardware, implementation, and maintenance savings', value: 400000 },
      { category: 'Operational Efficiency', description: 'Reduced FTE requirements for management', value: 126000 },
      { category: 'Faster Deployment', description: 'Accelerated time-to-value and productivity', value: 75000 },
      { category: 'Security Improvement', description: 'Reduced breach risk and compliance violations', value: 125000 },
      { category: 'Future-Proofing', description: 'Automatic updates and scalability benefits', value: 50000 }
    ]
  },
  
  // Feature details with comparison data
  featureDetails: {
    'Cloud-Based Architecture': {
      'portnox': { value: 'Full', score: 100 },
      'cisco': { value: 'Limited', score: 50 },
      'aruba': { value: 'Limited', score: 60 },
      'forescout': { value: 'Limited', score: 55 },
      'fortinac': { value: 'Limited', score: 50 },
      'juniper': { value: 'Limited', score: 65 },
      'securew2': { value: 'Full', score: 90 },
      'nps': { value: 'None', score: 30 },
      'noNac': { value: 'None', score: 0 }
    },
    'Zero Trust Security': {
      'portnox': { value: 'Full', score: 100 },
      'cisco': { value: 'Partial', score: 40 },
      'aruba': { value: 'Partial', score: 45 },
      'forescout': { value: 'Partial', score: 50 },
      'fortinac': { value: 'Partial', score: 40 },
      'juniper': { value: 'Partial', score: 50 },
      'securew2': { value: 'Partial', score: 70 },
      'nps': { value: 'Limited', score: 30 },
      'noNac': { value: 'None', score: 0 }
    },
    'Multi-Factor Authentication': {
      'portnox': { value: 'Yes', score: 100 },
      'cisco': { value: 'Yes', score: 100 },
      'aruba': { value: 'Yes', score: 100 },
      'forescout': { value: 'Yes', score: 100 },
      'fortinac': { value: 'Yes', score: 100 },
      'juniper': { value: 'Yes', score: 100 },
      'securew2': { value: 'Yes', score: 100 },
      'nps': { value: 'Limited', score: 60 },
      'noNac': { value: 'No', score: 0 }
    },
    'Scalability': {
      'portnox': { value: 'Simple', score: 95 },
      'cisco': { value: 'Complex', score: 70 },
      'aruba': { value: 'Complex', score: 75 },
      'forescout': { value: 'Complex', score: 70 },
      'fortinac': { value: 'Moderate', score: 75 },
      'juniper': { value: 'Moderate', score: 75 },
      'securew2': { value: 'Simple', score: 85 },
      'nps': { value: 'Limited', score: 65 },
      'noNac': { value: 'None', score: 0 }
    }
  },
  
  // Calculate TCO based on organization parameters
  calculateTCO: function(vendor, params) {
    const { deviceCount, yearsToProject, fteCost, fteAllocation, maintenancePercentage } = params;
    const baseTCO = this.costComponents[vendor];
    
    // Scale costs based on device count
    const scaleFactor = deviceCount / 2500; // Base calculations are for 2500 devices
    
    let hardware = baseTCO.hardware * scaleFactor;
    let software = baseTCO.software * scaleFactor;
    let implementation = baseTCO.implementation * (0.5 + (0.5 * scaleFactor)); // Implementation scales non-linearly
    let maintenance = baseTCO.maintenance * scaleFactor * (maintenancePercentage / 18); // Adjust for maintenance percentage
    let personnel = baseTCO.personnel * (fteCost / 120000) * (fteAllocation / 50); // Adjust for FTE cost and allocation
    
    // Special case for Portnox with volume discount
    if (vendor === 'portnox' && params.portnoxDiscount) {
      software = software * (1 - (params.portnoxDiscount / 100));
    }
    
    // Adjust for years to project
    if (yearsToProject !== 3) {
      const yearlyFactor = yearsToProject / 3;
      maintenance = maintenance * yearlyFactor;
      personnel = personnel * yearlyFactor;
      software = software * yearlyFactor;
    }
    
    return {
      hardware,
      software,
      implementation,
      maintenance,
      personnel,
      total: hardware + software + implementation + maintenance + personnel
    };
  }
};

// Make available globally
window.VendorData = VendorData;
