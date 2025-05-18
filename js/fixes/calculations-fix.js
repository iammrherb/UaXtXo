/**
 * Enhanced Calculation Logic for Portnox TCO Analyzer
 * Provides accurate and comprehensive TCO, ROI, and risk calculations
 */
(function() {
  // Store calculation results for access by charts and UI
  let calculationResults = {};
  
  // Function to update all calculations based on selected vendors and parameters
  window.updateCalculations = function(selectedVendors) {
    console.log("Updating calculations for selected vendors:", selectedVendors);
    
    if (!selectedVendors || selectedVendors.length === 0) {
      console.error("No vendors selected for calculations");
      return;
    }
    
    // Get configuration parameters from UI
    const config = getConfigParameters();
    
    // Calculate TCO for each vendor
    calculationResults = {};
    selectedVendors.forEach(vendor => {
      const vendorData = window.vendorData[vendor];
      if (!vendorData) {
        console.warn(`Vendor data not found for ${vendor}, using placeholder data`);
        calculationResults[vendor] = calculatePlaceholderData(vendor, config);
      } else {
        calculationResults[vendor] = calculateVendorTCO(vendor, vendorData, config);
      }
    });
    
    // Calculate ROI for Portnox vs. other vendors
    if (selectedVendors.includes('portnox') && selectedVendors.length > 1) {
      calculationResults.roi = calculateROI('portnox', selectedVendors.filter(v => v !== 'portnox'), config);
    }
    
    // Calculate risk reduction
    selectedVendors.forEach(vendor => {
      if (calculationResults[vendor]) {
        calculationResults[vendor].riskAssessment = calculateRiskAssessment(vendor, window.vendorData[vendor], config);
      }
    });
    
    // Update UI with calculation results
    updateUI(selectedVendors);
    
    // Update charts with new data
    if (typeof window.updateAllCharts === 'function') {
      window.updateAllCharts(selectedVendors);
    }
    
    console.log("Calculations updated successfully", calculationResults);
    return calculationResults;
  };
  
  // Function to retrieve calculation results
  window.getCalculatedData = function() {
    return calculationResults;
  };
  
  // Get configuration parameters from UI
  function getConfigParameters() {
    return {
      // Organization parameters
      deviceCount: parseInt(document.getElementById('device-count').value) || 500,
      organizationSize: document.getElementById('organization-size').value || 'small',
      locations: parseInt(document.getElementById('locations').value) || 2,
      yearsToProject: parseInt(document.getElementById('years-to-project').value) || 3,
      
      // Network requirements
      cloudIntegration: document.getElementById('cloud-integration')?.checked || false,
      legacyDevices: document.getElementById('legacy-devices')?.checked || false,
      byodSupport: document.getElementById('byod-support')?.checked || false,
      iotSupport: document.getElementById('iot-support')?.checked || false,
      wirelessSupport: document.getElementById('wireless-support')?.checked || false,
      remoteWork: document.getElementById('remote-work')?.checked || false,
      
      // Industry & compliance
      industry: document.getElementById('industry-select')?.value || '',
      compliance: {
        pci: document.getElementById('compliance-pci')?.checked || false,
        hipaa: document.getElementById('compliance-hipaa')?.checked || false,
        nist: document.getElementById('compliance-nist')?.checked || false,
        gdpr: document.getElementById('compliance-gdpr')?.checked || false,
        iso: document.getElementById('compliance-iso')?.checked || false,
        cmmc: document.getElementById('compliance-cmmc')?.checked || false,
        ferpa: document.getElementById('compliance-ferpa')?.checked || false,
        sox: document.getElementById('compliance-sox')?.checked || false
      },
      riskProfile: document.getElementById('risk-profile')?.value || 'standard',
      cybersecurityInsurance: document.getElementById('cybersecurity-insurance')?.value || 'standard',
      
      // Cost parameters
      portnoxBasePrice: parseFloat(document.getElementById('portnox-base-price')?.value) || 3.0,
      portnoxDiscount: parseInt(document.getElementById('portnox-discount')?.value) || 15,
      fteCost: parseInt(document.getElementById('fte-cost')?.value) || 100000,
      fteAllocation: parseInt(document.getElementById('fte-allocation')?.value) || 25,
      maintenancePercentage: parseInt(document.getElementById('maintenance-percentage')?.value) || 18,
      downtimeCost: parseInt(document.getElementById('downtime-cost')?.value) || 5000,
      riskReduction: parseInt(document.getElementById('risk-reduction')?.value) || 35,
      insuranceReduction: parseInt(document.getElementById('insurance-reduction')?.value) || 10
    };
  }
  
  // Calculate TCO for a specific vendor
  function calculateVendorTCO(vendorId, vendorData, config) {
    // Initialize result object
    const result = {
      vendor: vendorId,
      name: vendorData.name || vendorId,
      hardware: 0,
      software: 0,
      implementation: 0,
      maintenance: 0,
      operations: 0,
      support: 0,
      totalTco: 0,
      yearlyBreakdown: [],
      initialCost: 0,
      year1: 0,
      year2: 0,
      year3: 0,
      year4: 0,
      year5: 0
    };
    
    // Handle special case for Portnox (subscription model)
    if (vendorId === 'portnox') {
      // Calculate subscription cost with volume discount
      const baseMonthlyPrice = config.portnoxBasePrice;
      const volumeDiscount = config.portnoxDiscount / 100;
      const effectiveMonthlyPrice = baseMonthlyPrice * (1 - volumeDiscount);
      const annualSubscription = effectiveMonthlyPrice * 12 * config.deviceCount;
      
      // Implementation cost (fixed + variable based on size)
      const implementationBase = 10000;
      const implementationPerLocation = 2500;
      const implementationCost = implementationBase + (implementationPerLocation * config.locations);
      
      // Calculate operational costs (reduced FTE requirement)
      const fteCost = (config.fteCost * 0.25) / 100 * config.fteAllocation;
      
      // Set initial costs
      result.implementation = implementationCost;
      
      // Set yearly costs
      result.software = annualSubscription;
      result.operations = fteCost;
      
      // No hardware, maintenance, or support costs for cloud solution
      result.hardware = 0;
      result.maintenance = 0;
      result.support = 0;
      
      // Calculate yearly breakdown
      result.initialCost = result.implementation;
      result.year1 = result.software + result.operations;
      result.year2 = result.software + result.operations;
      result.year3 = result.software + result.operations;
      result.year4 = result.software + result.operations;
      result.year5 = result.software + result.operations;
      
      // Calculate total TCO for the projection period
      result.totalTco = result.initialCost + 
        (config.yearsToProject >= 1 ? result.year1 : 0) +
        (config.yearsToProject >= 2 ? result.year2 : 0) +
        (config.yearsToProject >= 3 ? result.year3 : 0) +
        (config.yearsToProject >= 4 ? result.year4 : 0) +
        (config.yearsToProject >= 5 ? result.year5 : 0);
      
      // Build year-by-year breakdown
      for (let i = 0; i <= config.yearsToProject; i++) {
        if (i === 0) {
          result.yearlyBreakdown.push({
            year: 'Initial',
            hardware: 0,
            software: 0,
            implementation: result.implementation,
            maintenance: 0,
            operations: 0,
            support: 0,
            total: result.implementation
          });
        } else {
          result.yearlyBreakdown.push({
            year: `Year ${i}`,
            hardware: 0,
            software: result.software,
            implementation: 0,
            maintenance: 0,
            operations: result.operations,
            support: 0,
            total: result.software + result.operations
          });
        }
      }
    } else if (vendorId === 'no-nac') {
      // No NAC solution - only operational costs and higher risk
      const fteCost = (config.fteCost * 0.5) / 100 * config.fteAllocation;
      
      result.operations = fteCost;
      
      // Zero out other costs
      result.hardware = 0;
      result.software = 0;
      result.implementation = 0;
      result.maintenance = 0;
      result.support = 0;
      
      // Calculate yearly breakdown
      result.initialCost = 0;
      result.year1 = result.operations;
      result.year2 = result.operations;
      result.year3 = result.operations;
      result.year4 = result.operations;
      result.year5 = result.operations;
      
      // Calculate total TCO for the projection period
      result.totalTco = result.initialCost + 
        (config.yearsToProject >= 1 ? result.year1 : 0) +
        (config.yearsToProject >= 2 ? result.year2 : 0) +
        (config.yearsToProject >= 3 ? result.year3 : 0) +
        (config.yearsToProject >= 4 ? result.year4 : 0) +
        (config.yearsToProject >= 5 ? result.year5 : 0);
      
      // Build year-by-year breakdown
      for (let i = 0; i <= config.yearsToProject; i++) {
        if (i === 0) {
          result.yearlyBreakdown.push({
            year: 'Initial',
            hardware: 0,
            software: 0,
            implementation: 0,
            maintenance: 0,
            operations: 0,
            support: 0,
            total: 0
          });
        } else {
          result.yearlyBreakdown.push({
            year: `Year ${i}`,
            hardware: 0,
            software: 0,
            implementation: 0,
            maintenance: 0,
            operations: result.operations,
            support: 0,
            total: result.operations
          });
        }
      }
    } else {
      // Traditional on-premises NAC solutions
      
      // Scale hardware costs based on device count
      const deviceScaleFactor = Math.max(1, Math.log10(config.deviceCount / 1000 + 1));
      
      // Hardware costs (initial)
      let hardwareCost = vendorData.initialCost?.hardware || 85000;
      hardwareCost = hardwareCost * deviceScaleFactor * Math.sqrt(config.locations);
      
      // Software licensing (initial)
      let softwareCost = vendorData.initialCost?.software || 120000;
      softwareCost = softwareCost * deviceScaleFactor;
      
      // Implementation costs
      let implementationCost = vendorData.initialCost?.implementation || 65000;
      implementationCost = implementationCost * Math.sqrt(config.locations);
      
      // Training costs
      const trainingCost = vendorData.initialCost?.training || 25000;
      
      // Annual maintenance (percentage of hardware + software)
      const maintenanceRate = vendorData.annualCost?.maintenancePercentage || config.maintenancePercentage;
      const maintenanceCost = (hardwareCost + softwareCost) * (maintenanceRate / 100);
      
      // Support costs (percentage of hardware + software)
      const supportRate = vendorData.annualCost?.supportPercentage || 12;
      const supportCost = (hardwareCost + softwareCost) * (supportRate / 100);
      
      // Operational costs (FTE)
      const fteRequirement = vendorData.annualCost?.fteRequirement || 1.5;
      const operationsCost = config.fteCost * fteRequirement * (config.fteAllocation / 100);
      
      // Hardware refresh in year 4 (common for on-prem solutions)
      const hardwareRefreshYear = 4;
      const hardwareRefreshCost = hardwareCost * 0.5;
      
      // Set calculated costs
      result.hardware = hardwareCost;
      result.software = softwareCost;
      result.implementation = implementationCost + trainingCost;
      result.maintenance = maintenanceCost;
      result.operations = operationsCost;
      result.support = supportCost;
      
      // Calculate yearly breakdown
      result.initialCost = result.hardware + result.software + result.implementation;
      result.year1 = result.maintenance + result.operations + result.support;
      result.year2 = result.maintenance + result.operations + result.support;
      result.year3 = result.maintenance + result.operations + result.support;
      result.year4 = result.maintenance + result.operations + result.support + 
                   (hardwareRefreshYear === 4 ? hardwareRefreshCost : 0);
      result.year5 = result.maintenance + result.operations + result.support;
      
      // Calculate total TCO for the projection period
      result.totalTco = result.initialCost + 
        (config.yearsToProject >= 1 ? result.year1 : 0) +
        (config.yearsToProject >= 2 ? result.year2 : 0) +
        (config.yearsToProject >= 3 ? result.year3 : 0) +
        (config.yearsToProject >= 4 ? result.year4 : 0) +
        (config.yearsToProject >= 5 ? result.year5 : 0);
      
      // Build year-by-year breakdown
      for (let i = 0; i <= config.yearsToProject; i++) {
        if (i === 0) {
          result.yearlyBreakdown.push({
            year: 'Initial',
            hardware: result.hardware,
            software: result.software,
            implementation: result.implementation,
            maintenance: 0,
            operations: 0,
            support: 0,
            total: result.hardware + result.software + result.implementation
          });
        } else if (i === hardwareRefreshYear && config.yearsToProject >= hardwareRefreshYear) {
          result.yearlyBreakdown.push({
            year: `Year ${i}`,
            hardware: hardwareRefreshCost,
            software: 0,
            implementation: 0,
            maintenance: result.maintenance,
            operations: result.operations,
            support: result.support,
            total: hardwareRefreshCost + result.maintenance + result.operations + result.support
          });
        } else {
          result.yearlyBreakdown.push({
            year: `Year ${i}`,
            hardware: 0,
            software: 0,
            implementation: 0,
            maintenance: result.maintenance,
            operations: result.operations,
            support: result.support,
            total: result.maintenance + result.operations + result.support
          });
        }
      }
    }
    
    return result;
  }
  
  // Calculate placeholder data when vendor information is missing
  function calculatePlaceholderData(vendorId, config) {
    // Create placeholder data based on average values
    return {
      vendor: vendorId,
      name: vendorId.charAt(0).toUpperCase() + vendorId.slice(1),
      hardware: 70000,
      software: 100000,
      implementation: 50000,
      maintenance: 30000,
      operations: 50000,
      support: 20000,
      totalTco: 320000,
      yearlyBreakdown: [
        {
          year: 'Initial',
          hardware: 70000,
          software: 100000,
          implementation: 50000,
          maintenance: 0,
          operations: 0,
          support: 0,
          total: 220000
        },
        {
          year: 'Year 1',
          hardware: 0,
          software: 0,
          implementation: 0,
          maintenance: 30000,
          operations: 50000,
          support: 20000,
          total: 100000
        }
      ],
      initialCost: 220000,
      year1: 100000,
      year2: 100000,
      year3: 100000,
      year4: 120000,
      year5: 100000,
      riskAssessment: {
        securityPostureImprovement: 65,
        breachProbability: 'Medium',
        complianceCoverage: 75,
        meanTimeToRespond: 120,
        riskScore: 70
      }
    };
  }
  
  // Calculate ROI for Portnox compared to other vendors
  function calculateROI(baseVendor, comparisonVendors, config) {
    if (!calculationResults[baseVendor] || comparisonVendors.length === 0) {
      return null;
    }
    
    // Get base vendor costs
    const baseCost = calculationResults[baseVendor].totalTco;
    
    // Get average costs of other vendors
    let totalComparisonCost = 0;
    comparisonVendors.forEach(vendor => {
      if (calculationResults[vendor]) {
        totalComparisonCost += calculationResults[vendor].totalTco;
      }
    });
    const avgComparisonCost = totalComparisonCost / comparisonVendors.length;
    
    // Calculate savings
    const savings = avgComparisonCost - baseCost;
    const savingsPercentage = (savings / avgComparisonCost) * 100;
    
    // Calculate ROI and payback period
    // ROI = (Gain from Investment - Cost of Investment) / Cost of Investment
    const roi = savings / baseCost * 100;
    
    // Calculate approximate payback period in months
    // Assuming linear cost distribution and comparing first year + implementation
    const baseFirstYearCost = calculationResults[baseVendor].initialCost + calculationResults[baseVendor].year1;
    
    // Average first-year costs of comparison vendors
    let totalComparisonFirstYearCost = 0;
    comparisonVendors.forEach(vendor => {
      if (calculationResults[vendor]) {
        totalComparisonFirstYearCost += calculationResults[vendor].initialCost + calculationResults[vendor].year1;
      }
    });
    const avgComparisonFirstYearCost = totalComparisonFirstYearCost / comparisonVendors.length;
    
    // Monthly savings in the first year
    const monthlySavings = (avgComparisonFirstYearCost - baseFirstYearCost) / 12;
    
    // Payback period in months
    const paybackPeriod = monthlySavings > 0 ? 
      Math.ceil(calculationResults[baseVendor].initialCost / monthlySavings) : 
      Infinity;
    
    // Calculate other ROI metrics
    // Productivity gains from easier management
    const productivityGains = config.deviceCount * 15; // $15 per device in productivity
    
    // Compliance savings from automated tools
    const complianceSavings = config.deviceCount * 20; // $20 per device in compliance automation
    
    return {
      savings: savings,
      savingsPercentage: savingsPercentage,
      roi: roi,
      paybackPeriod: paybackPeriod,
      productivityGains: productivityGains,
      complianceSavings: complianceSavings,
      valueDrivers: {
        directCostReduction: savings,
        itStaffEfficiency: calculationResults[baseVendor].operations * config.yearsToProject,
        breachRiskReduction: calculationResults[baseVendor].totalTco * (config.riskReduction / 100),
        complianceAutomation: complianceSavings,
        insurancePremiumReduction: 10000 * config.yearsToProject * (config.insuranceReduction / 100)
      }
    };
  }
  
  // Calculate risk assessment for a specific vendor
  function calculateRiskAssessment(vendorId, vendorData, config) {
    // Default risk metrics for different vendor types
    const riskMetrics = {
      portnox: {
        securityPostureImprovement: 85,
        breachProbability: 'Low',
        complianceCoverage: 95,
        meanTimeToRespond: 45, // minutes
        riskScore: 15 // lower is better
      },
      'traditional': {
        securityPostureImprovement: 75,
        breachProbability: 'Medium-Low',
        complianceCoverage: 85,
        meanTimeToRespond: 120, // minutes
        riskScore: 30
      },
      'no-nac': {
        securityPostureImprovement: 0,
        breachProbability: 'High',
        complianceCoverage: 20,
        meanTimeToRespond: 480, // minutes
        riskScore: 85
      }
    };
    
    // Determine which risk profile to use
    let riskProfile;
    if (vendorId === 'portnox') {
      riskProfile = riskMetrics.portnox;
    } else if (vendorId === 'no-nac') {
      riskProfile = riskMetrics['no-nac'];
    } else {
      riskProfile = riskMetrics.traditional;
    }
    
    // Adjust risk metrics based on config parameters
    let securityPostureImprovement = riskProfile.securityPostureImprovement;
    let complianceCoverage = riskProfile.complianceCoverage;
    let meanTimeToRespond = riskProfile.meanTimeToRespond;
    let riskScore = riskProfile.riskScore;
    
    // Adjust for risk profile
    if (config.riskProfile === 'elevated') {
      securityPostureImprovement -= 5;
      riskScore += 10;
    } else if (config.riskProfile === 'high') {
      securityPostureImprovement -= 10;
      riskScore += 20;
    } else if (config.riskProfile === 'regulated') {
      complianceCoverage += 5;
    }
    
    // Adjust for network requirements
    if (config.byodSupport) {
      riskScore += 5;
    }
    if (config.remoteWork) {
      riskScore += 8;
    }
    if (config.iotSupport) {
      riskScore += 10;
    }
    
    // Adjust for vendor-specific risk reduction capabilities
    if (vendorData && vendorData.riskReduction) {
      // Use vendor-specific risk reduction data if available
      return {
        securityPostureImprovement: securityPostureImprovement,
        breachProbability: riskProfile.breachProbability,
        complianceCoverage: complianceCoverage,
        meanTimeToRespond: meanTimeToRespond,
        riskScore: riskScore,
        riskReduction: vendorData.riskReduction
      };
    }
    
    // Return the calculated risk assessment
    return {
      securityPostureImprovement: securityPostureImprovement,
      breachProbability: riskProfile.breachProbability,
      complianceCoverage: complianceCoverage,
      meanTimeToRespond: meanTimeToRespond,
      riskScore: riskScore
    };
  }
  
  // Update UI with calculation results
  function updateUI(selectedVendors) {
    console.log("Updating UI with calculation results");
    
    // Update TCO metrics
    if (calculationResults.portnox) {
      document.getElementById('portnox-tco').textContent = formatCurrency(calculationResults.portnox.totalTco);
      
      // Find the next most expensive vendor for comparison
      let comparisonVendor = null;
      let maxTco = 0;
      selectedVendors.forEach(vendor => {
        if (vendor !== 'portnox' && calculationResults[vendor] && calculationResults[vendor].totalTco > maxTco) {
          maxTco = calculationResults[vendor].totalTco;
          comparisonVendor = vendor;
        }
      });
      
      if (comparisonVendor) {
        document.getElementById('tco-comparison').textContent = 
          `vs. ${formatCurrency(calculationResults[comparisonVendor].totalTco)} (${calculationResults[comparisonVendor].name})`;
      }
    }
    
    // Update savings metrics
    if (calculationResults.roi) {
      document.getElementById('total-savings').textContent = formatCurrency(calculationResults.roi.savings);
      document.getElementById('savings-percentage').textContent = 
        `${Math.round(calculationResults.roi.savingsPercentage)}% reduction`;
    }
    
    // Update ROI metrics
    if (calculationResults.roi) {
      document.getElementById('three-year-roi').textContent = `${Math.round(calculationResults.roi.roi)}%`;
      document.getElementById('payback-period').textContent = `${calculationResults.roi.paybackPeriod} months`;
      document.getElementById('annual-savings').textContent = formatCurrency(calculationResults.roi.savings / 3);
      document.getElementById('productivity-value').textContent = formatCurrency(calculationResults.roi.productivityGains);
      document.getElementById('compliance-savings').textContent = formatCurrency(calculationResults.roi.complianceSavings);
    }
    
    // Update risk metrics
    if (calculationResults.portnox && calculationResults.portnox.riskAssessment) {
      document.getElementById('risk-reduction-total').textContent = 
        `${calculationResults.portnox.riskAssessment.securityPostureImprovement}%`;
      document.getElementById('security-improvement').textContent = 
        `${calculationResults.portnox.riskAssessment.securityPostureImprovement}%`;
      document.getElementById('breach-probability').textContent = 
        calculationResults.portnox.riskAssessment.breachProbability;
      document.getElementById('compliance-coverage').textContent = 
        `${calculationResults.portnox.riskAssessment.complianceCoverage}%`;
      document.getElementById('mttr').textContent = 
        `${calculationResults.portnox.riskAssessment.meanTimeToRespond} min`;
    }
    
    // Update implementation metrics
    if (calculationResults.portnox) {
      document.getElementById('implementation-time').textContent = "21 days";
      document.getElementById('implementation-comparison').textContent = "75% faster than on-premises";
      document.getElementById('implementation-cost').textContent = formatCurrency(calculationResults.portnox.implementation);
    }
    
    // Update operational metrics
    if (calculationResults.portnox) {
      document.getElementById('operational-cost').textContent = formatCurrency(calculationResults.portnox.operations);
      document.getElementById('annual-subscription').textContent = formatCurrency(calculationResults.portnox.software);
    }
    
    console.log("UI updated with calculation results");
  }
  
  // Format currency values for display
  function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    }).format(value);
  }
  
  // Initialize calculations on page load
  document.addEventListener('DOMContentLoaded', function() {
    // Get selected vendors
    const selectedVendors = Array.from(document.querySelectorAll('.vendor-card.selected'))
      .map(card => card.getAttribute('data-vendor'))
      .filter(Boolean);
    
    // Perform initial calculations
    window.updateCalculations(selectedVendors);
    
    // Add event listeners to recalculate when parameters change
    const parameterInputs = document.querySelectorAll('#cost-config input, #organization-config input, #organization-config select');
    parameterInputs.forEach(input => {
      input.addEventListener('change', function() {
        window.updateCalculations(selectedVendors);
      });
    });
    
    // Add event listener to calculate button
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', function() {
        // Get current selected vendors
        const currentSelectedVendors = Array.from(document.querySelectorAll('.vendor-card.selected'))
          .map(card => card.getAttribute('data-vendor'))
          .filter(Boolean);
        
        window.updateCalculations(currentSelectedVendors);
      });
    }
    
    // Add event listener to header calculate button
    const calculateBtnHeader = document.getElementById('calculate-btn-header');
    if (calculateBtnHeader) {
      calculateBtnHeader.addEventListener('click', function() {
        // Get current selected vendors
        const currentSelectedVendors = Array.from(document.querySelectorAll('.vendor-card.selected'))
          .map(card => card.getAttribute('data-vendor'))
          .filter(Boolean);
        
        window.updateCalculations(currentSelectedVendors);
      });
    }
  });
})();
