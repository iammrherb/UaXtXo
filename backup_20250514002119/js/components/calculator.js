/**
 * Calculator Component for Total Cost Analyzer
 * Provides TCO calculations and comparison
 */

const Calculator = (function() {
  // Default calculation parameters
  const defaultParams = {
    deviceCount: 2500,
    years: 3,
    fte: {
      cost: 120000,
      allocation: 0.5
    },
    maintenance: {
      percentage: 18,
      downtime: 10000
    },
    implementation: {
      consultingRate: 2000,
      days: 60
    },
    training: {
      costPerUser: 500,
      users: 20
    },
    portnox: {
      costPerDevice: 4,
      discount: 20
    }
  };
  
  // Calculate TCO
  function calculateTCO(params) {
    // Merge user parameters with defaults
    const calculationParams = mergeParams(params);
    
    // Calculate current solution costs
    const currentSolution = calculateCurrentSolutionCosts(calculationParams);
    
    // Calculate Portnox Cloud costs
    const portnoxCloud = calculatePortnoxCloudCosts(calculationParams);
    
    // Calculate savings and ROI
    const savings = calculateSavingsAndROI(currentSolution, portnoxCloud, calculationParams);
    
    // Return complete results
    return {
      params: calculationParams,
      currentSolution,
      portnoxCloud,
      savings
    };
  }
  
  // Merge user parameters with defaults
  function mergeParams(params = {}) {
    const result = {...defaultParams};
    
    // Merge top-level parameters
    if (params.deviceCount) result.deviceCount = parseInt(params.deviceCount);
    if (params.years) result.years = parseInt(params.years);
    
    // Merge nested parameters
    if (params.fte) {
      if (params.fte.cost) result.fte.cost = parseInt(params.fte.cost);
      if (params.fte.allocation) result.fte.allocation = parseFloat(params.fte.allocation);
    }
    
    if (params.maintenance) {
      if (params.maintenance.percentage) result.maintenance.percentage = parseFloat(params.maintenance.percentage);
      if (params.maintenance.downtime) result.maintenance.downtime = parseInt(params.maintenance.downtime);
    }
    
    if (params.implementation) {
      if (params.implementation.consultingRate) result.implementation.consultingRate = parseInt(params.implementation.consultingRate);
      if (params.implementation.days) result.implementation.days = parseInt(params.implementation.days);
    }
    
    if (params.training) {
      if (params.training.costPerUser) result.training.costPerUser = parseInt(params.training.costPerUser);
      if (params.training.users) result.training.users = parseInt(params.training.users);
    }
    
    if (params.portnox) {
      if (params.portnox.costPerDevice) result.portnox.costPerDevice = parseFloat(params.portnox.costPerDevice);
      if (params.portnox.discount) result.portnox.discount = parseFloat(params.portnox.discount);
    }
    
    return result;
  }
  
  // Calculate current solution costs
  function calculateCurrentSolutionCosts(params) {
    // Get vendor-specific details
    const vendorDetails = getVendorDetails(params.vendor);
    
    // Hardware costs
    const hardwareCost = vendorDetails.hardwareRequired ? 
      params.deviceCount * vendorDetails.hardwareCostPerDevice : 0;
    
    // Software license costs
    const licenseCost = params.deviceCount * vendorDetails.licenseCostPerDevice;
    
    // Implementation costs
    const implementationDays = params.implementation.days;
    const implementationCost = implementationDays * params.implementation.consultingRate;
    
    // Training costs
    const trainingCost = params.training.users * params.training.costPerUser;
    
    // Annual maintenance costs
    const annualMaintenance = (hardwareCost + licenseCost) * (params.maintenance.percentage / 100);
    
    // Personnel costs
    const annualPersonnelCost = params.fte.cost * params.fte.allocation;
    
    // Downtime costs (assumes current solution has more downtime)
    const annualDowntimeCost = vendorDetails.estimatedDowntimeHours * params.maintenance.downtime;
    
    // Total costs for first year
    const firstYearCosts = hardwareCost + licenseCost + implementationCost + 
      trainingCost + annualMaintenance + annualPersonnelCost + annualDowntimeCost;
    
    // Calculate recurring annual costs
    const annualRecurringCosts = annualMaintenance + annualPersonnelCost + annualDowntimeCost;
    
    // Calculate total costs for specified years
    const totalCosts = firstYearCosts + (annualRecurringCosts * (params.years - 1));
    
    // Return detailed cost breakdown
    return {
      hardware: hardwareCost,
      licenses: licenseCost,
      implementation: implementationCost,
      training: trainingCost,
      maintenance: annualMaintenance * params.years,
      personnel: annualPersonnelCost * params.years,
      downtime: annualDowntimeCost * params.years,
      firstYear: firstYearCosts,
      recurring: annualRecurringCosts,
      total: totalCosts
    };
  }
  
  // Calculate Portnox Cloud costs
  function calculatePortnoxCloudCosts(params) {
    // Calculate effective cost per device with discount
    const effectiveCostPerDevice = params.portnox.costPerDevice * (1 - params.portnox.discount / 100);
    
    // Annual subscription cost
    const annualSubscription = params.deviceCount * effectiveCostPerDevice * 12;
    
    // Implementation costs (drastically reduced for cloud solution)
    const implementationDays = Math.max(5, Math.round(params.implementation.days * 0.25));
    const implementationCost = implementationDays * params.implementation.consultingRate;
    
    // Training costs (reduced for cloud solution)
    const trainingUsers = Math.max(5, Math.round(params.training.users * 0.75));
    const trainingCost = trainingUsers * params.training.costPerUser;
    
    // Personnel costs (reduced for cloud solution)
    const annualPersonnelCost = params.fte.cost * (params.fte.allocation * 0.5);
    
    // Downtime costs (assumes cloud solution has less downtime)
    const annualDowntimeCost = 2 * params.maintenance.downtime;
    
    // Total costs for first year
    const firstYearCosts = annualSubscription + implementationCost + 
      trainingCost + annualPersonnelCost + annualDowntimeCost;
    
    // Calculate recurring annual costs
    const annualRecurringCosts = annualSubscription + annualPersonnelCost + annualDowntimeCost;
    
    // Calculate total costs for specified years
    const totalCosts = firstYearCosts + (annualRecurringCosts * (params.years - 1));
    
    // Return detailed cost breakdown
    return {
      hardware: 0, // No hardware costs for cloud solution
      licenses: annualSubscription * params.years,
      implementation: implementationCost,
      training: trainingCost,
      maintenance: 0, // Maintenance included in subscription
      personnel: annualPersonnelCost * params.years,
      downtime: annualDowntimeCost * params.years,
      firstYear: firstYearCosts,
      recurring: annualRecurringCosts,
      total: totalCosts
    };
  }
  
  // Calculate savings and ROI
  function calculateSavingsAndROI(currentSolution, portnoxCloud, params) {
    // Calculate total savings
    const totalSavings = currentSolution.total - portnoxCloud.total;
    
    // Calculate savings percentage
    const savingsPercentage = Math.round((totalSavings / currentSolution.total) * 100);
    
    // Calculate ROI
    const investment = portnoxCloud.firstYear;
    const gains = totalSavings;
    const roi = Math.round((gains / investment) * 100);
    
    // Calculate monthly costs
    const currentMonthly = [];
    const portnoxMonthly = [];
    const savingsMonthly = [];
    
    // First month (initial implementation)
    currentMonthly.push(currentSolution.hardware + currentSolution.licenses + 
      currentSolution.implementation + currentSolution.training);
    portnoxMonthly.push(portnoxCloud.implementation + portnoxCloud.training);
    savingsMonthly.push(currentMonthly[0] - portnoxMonthly[0]);
    
    // Subsequent months
    const currentMonthlyRecurring = currentSolution.recurring / 12;
    const portnoxMonthlyRecurring = portnoxCloud.recurring / 12;
    
    for (let month = 1; month < params.years * 12; month++) {
      currentMonthly.push(currentMonthly[month - 1] + currentMonthlyRecurring);
      portnoxMonthly.push(portnoxMonthly[month - 1] + portnoxMonthlyRecurring);
      savingsMonthly.push(currentMonthly[month] - portnoxMonthly[month]);
    }
    
    // Find break-even point
    let breakEvenMonth = params.years * 12; // Default to end of analysis period
    for (let month = 0; month < savingsMonthly.length; month++) {
      if (savingsMonthly[month] >= 0) {
        breakEvenMonth = month;
        break;
      }
    }
    
    // Return savings and ROI details
    return {
      total: totalSavings,
      percentage: savingsPercentage,
      roi: roi,
      breakEvenMonth: breakEvenMonth,
      currentMonthly: currentMonthly,
      portnoxMonthly: portnoxMonthly,
      savingsMonthly: savingsMonthly
    };
  }
  
  // Get vendor-specific details
  function getVendorDetails(vendorId) {
    // Default vendor details
    const defaultVendor = {
      name: 'Generic NAC Solution',
      hardwareRequired: true,
      hardwareCostPerDevice: 40,
      licenseCostPerDevice: 60,
      estimatedDowntimeHours: 24
    };
    
    // Vendor-specific details
    const vendors = {
      'cisco': {
        name: 'Cisco ISE',
        hardwareRequired: true,
        hardwareCostPerDevice: 45,
        licenseCostPerDevice: 75,
        estimatedDowntimeHours: 24
      },
      'aruba': {
        name: 'Aruba ClearPass',
        hardwareRequired: true,
        hardwareCostPerDevice: 40,
        licenseCostPerDevice: 65,
        estimatedDowntimeHours: 20
      },
      'forescout': {
        name: 'Forescout',
        hardwareRequired: true,
        hardwareCostPerDevice: 35,
        licenseCostPerDevice: 70,
        estimatedDowntimeHours: 18
      },
      'fortinac': {
        name: 'FortiNAC',
        hardwareRequired: true,
        hardwareCostPerDevice: 30,
        licenseCostPerDevice: 60,
        estimatedDowntimeHours: 22
      },
      'nps': {
        name: 'Microsoft NPS',
        hardwareRequired: true,
        hardwareCostPerDevice: 15,
        licenseCostPerDevice: 10,
        estimatedDowntimeHours: 30
      },
      'securew2': {
        name: 'SecureW2',
        hardwareRequired: false,
        hardwareCostPerDevice: 0,
        licenseCostPerDevice: 40,
        estimatedDowntimeHours: 12
      },
      'noNac': {
        name: 'No NAC Solution',
        hardwareRequired: false,
        hardwareCostPerDevice: 0,
        licenseCostPerDevice: 0,
        estimatedDowntimeHours: 48
      }
    };
    
    // Return vendor details or default
    return vendors[vendorId] || defaultVendor;
  }
  
  // Return public API
  return {
    calculateTCO
  };
})();
