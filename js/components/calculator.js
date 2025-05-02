  calculateVendorTCO(vendor, currentVendor, orgSize, deviceCount, yearsToProject) {
    try {
      if (!window.vendorData[vendor] || !window.vendorData[vendor][orgSize]) {
        console.error(`Invalid vendor or organization size: ${vendor}, ${orgSize}`);
        return {
          totalTCO: 0,
          totalInitialCosts: 0,
          annualCosts: 0,
          migrationCost: 0,
          totalSavings: 0,
          savingsPercentage: 0,
          annualSavings: 0,
          costBreakdown: {
            hardware: 0,
            networkRedesign: 0,
            implementation: 0,
            training: 0,
            maintenance: 0,
            licensing: 0,
            personnel: 0,
            downtime: 0
          }
        };
      }
      
      const vendorInfo = window.vendorData[vendor][orgSize];
      const complexityMultiplier = calculateComplexityMultiplier(vendor, window.vendorData[vendor].cloudBased);
      
      // Get cost multipliers from custom settings if available
      const customHardwareMultiplier = parseFloat(document.getElementById('custom-hardware-cost')?.value) || 1.0;
      const customLicensingMultiplier = parseFloat(document.getElementById('custom-licensing-cost')?.value) || 1.0;
      const customMaintenanceMultiplier = parseFloat(document.getElementById('custom-maintenance-cost')?.value) || 1.0;
      const customImplementationMultiplier = parseFloat(document.getElementById('custom-implementation-cost')?.value) || 1.0;
      const customTrainingMultiplier = parseFloat(document.getElementById('training-cost-multiplier')?.value) || 1.0;
      
      // Get custom FTE costs if available
      const customNetworkAdminSalary = parseFloat(document.getElementById('network-admin-salary')?.value) || 120000;
      const customSecurityAdminSalary = parseFloat(document.getElementById('security-admin-salary')?.value) || 135000;
      const customSystemAdminSalary = parseFloat(document.getElementById('system-admin-salary')?.value) || 110000;
      const customHelpdeskSalary = parseFloat(document.getElementById('helpdesk-salary')?.value) || 75000;
      
      // Get custom downtime cost if available
      const customDowntimeCost = parseFloat(document.getElementById('downtime-cost')?.value) || 5000;
      
      // Calculate initial costs with custom multipliers
      const initialHardware = vendorInfo.initialHardware * customHardwareMultiplier;
      const networkRedesign = vendorInfo.networkRedesign;
      const implementation = vendorInfo.implementation * customImplementationMultiplier;
      const training = vendorInfo.training * customTrainingMultiplier;
      
      const totalInitialCosts = (initialHardware + networkRedesign + implementation + training) * complexityMultiplier;
      
      // Calculate annual costs with custom multipliers
      const annualMaintenance = vendorInfo.annualMaintenance * customMaintenanceMultiplier;
      const annualLicensing = vendorInfo.annualLicensing * customLicensingMultiplier;
      
      // Use custom FTE costs for calculation
      const fteCosts = {
        networkAdmin: customNetworkAdminSalary,
        securityAdmin: customSecurityAdminSalary,
        systemAdmin: customSystemAdminSalary,
        helpDesk: customHelpdeskSalary
      };
      
      let fteCost = 0;
      for (const [role, amount] of Object.entries(vendorInfo.fteAllocation)) {
        fteCost += fteCosts[role] * amount;
      }
      
      const downtimeCost = vendorInfo.annualDowntime * customDowntimeCost;
      
      const annualCosts = (annualMaintenance + annualLicensing + fteCost + downtimeCost) * complexityMultiplier;
      
      // Calculate TCO
      const totalTCO = totalInitialCosts + (annualCosts * yearsToProject);
      
      // Calculate migration cost (if different from current vendor)
      let migrationCost = 0;
      if (vendor !== currentVendor) {
        const migrationFactor = this.getMigrationFactor(currentVendor, vendor);
        migrationCost = implementation * complexityMultiplier * migrationFactor;
      }
      
      // Calculate savings vs current solution
      let totalSavings = 0;
      let savingsPercentage = 0;
      let annualSavings = 0;
      
      if (vendor !== currentVendor) {
        const currentVendorInfo = window.vendorData[currentVendor][orgSize];
        const currentComplexity = calculateComplexityMultiplier(currentVendor, window.vendorData[currentVendor].cloudBased);
        
        // Apply the same custom multipliers to current vendor for fair comparison
        const currentInitialHardware = currentVendorInfo.initialHardware * customHardwareMultiplier;
        const currentNetworkRedesign = currentVendorInfo.networkRedesign;
        const currentImplementation = currentVendorInfo.implementation * customImplementationMultiplier;
        const currentTraining = currentVendorInfo.training * customTrainingMultiplier;
        
        const currentInitial = (currentInitialHardware + currentNetworkRedesign + 
                              currentImplementation + currentTraining) * currentComplexity;
        
        const currentAnnualMaintenance = currentVendorInfo.annualMaintenance * customMaintenanceMultiplier;
        const currentAnnualLicensing = currentVendorInfo.annualLicensing * customLicensingMultiplier;
        
        // Calculate current FTE cost with custom salaries
        let currentFteCost = 0;
        for (const [role, amount] of Object.entries(currentVendorInfo.fteAllocation)) {
          currentFteCost += fteCosts[role] * amount;
        }
        
        const currentDowntimeCost = currentVendorInfo.annualDowntime * customDowntimeCost;
        
        const currentAnnual = (currentAnnualMaintenance + currentAnnualLicensing + 
                              currentFteCost + currentDowntimeCost) * currentComplexity;
        
        const currentTCO = currentInitial + (currentAnnual * yearsToProject);
        
        totalSavings = currentTCO - totalTCO - migrationCost;
        savingsPercentage = currentTCO > 0 ? (totalSavings / currentTCO) * 100 : 0;
        annualSavings = currentAnnual - annualCosts;
      }
      
      // Create cost breakdown
      const costBreakdown = {
        hardware: initialHardware * complexityMultiplier,
        networkRedesign: networkRedesign * complexityMultiplier,
        implementation: implementation * complexityMultiplier,
        training: training * complexityMultiplier,
        maintenance: annualMaintenance * yearsToProject * complexityMultiplier,
        licensing: annualLicensing * yearsToProject * complexityMultiplier,
        personnel: fteCost * yearsToProject * complexityMultiplier,
        downtime: downtimeCost * yearsToProject * complexityMultiplier
      };
      
      return {
        totalTCO,
        totalInitialCosts,
        annualCosts,
        migrationCost,
        totalSavings,
        savingsPercentage,
        annualSavings,
        costBreakdown
      };
    } catch (error) {
      console.error(`Error calculating TCO for vendor ${vendor}:`, error);
      return {
        totalTCO: 0,
        totalInitialCosts: 0,
        annualCosts: 0,
        migrationCost: 0,
        totalSavings: 0,
        savingsPercentage: 0,
        annualSavings: 0,
        costBreakdown: {
          hardware: 0,
          networkRedesign: 0,
          implementation: 0,
          training: 0,
          maintenance: 0,
          licensing: 0,
          personnel: 0,
          downtime: 0
        }
      };
    }
  }
