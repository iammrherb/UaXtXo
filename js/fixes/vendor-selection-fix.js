/**
 * Enhanced Vendor Selection Functionality
 * Improves the vendor selection grid with better UX and validation
 */
(function() {
  // Vendor data with comprehensive comparison metrics
  window.vendorData = {
    portnox: {
      name: 'Portnox Cloud',
      description: 'Cloud-native NAC',
      badge: { text: 'Best Value', type: 'primary' },
      basePrice: 3.00, // per device per month
      initialCost: {
        hardware: 0,
        software: 0,
        implementation: 15000,
        training: 5000
      },
      annualCost: {
        subscription: true,
        maintenancePercentage: 0,
        supportPercentage: 0,
        fteRequirement: 0.25
      },
      implementation: {
        timeInDays: 21,
        complexityRating: 'Low',
        specializedResourcesNeeded: false
      },
      architecture: {
        cloudNative: true,
        onPremises: false,
        hybrid: false,
        saasModel: true,
        microservices: true,
        monolithic: false,
        multiTenant: true,
        singleTenant: false
      },
      ratings: {
        cloudNative: 97,
        deploymentSpeed: 95,
        zeroTrust: 92,
        costEfficiency: 90,
        remoteAccess: 95,
        scalability: 90,
        easeOfManagement: 85,
        integration: 80
      },
      securityCapabilities: {
        deviceAuthentication: 95,
        userAuthentication: 90,
        continuousMonitoring: 95,
        automatedRemediation: 85,
        threatDetection: 80,
        policyEnforcement: 90,
        complianceReporting: 90,
        incidentResponse: 80
      },
      zeroTrustCapabilities: {
        deviceIdentity: 95,
        userIdentity: 90,
        contextualAccess: 90,
        leastPrivilege: 85,
        continuousVerification: 95,
        microsegmentation: 75
      },
      riskReduction: {
        unauthorizedAccess: 90,
        malwarePropagation: 85,
        dataBreach: 80,
        complianceViolations: 90,
        insiderThreats: 75
      },
      features: {
        // Technical features
        radiusServer: true,
        cloud802_1x: true,
        segmentation: true,
        deviceFingerprinting: true,
        riskBasedAccess: true,
        mdm: true,
        edr: true,
        macBypass: true,
        guestPortal: true,
        apiIntegration: true,
        siem: true,
        mfa: true,
        
        // Business features
        flexiblePricing: true,
        noHardwareRequired: true,
        scalableLicensing: true,
        remoteWorkSupport: true,
        autoScaling: true
      }
    },
    cisco: {
      name: 'Cisco ISE',
      description: 'Enterprise NAC',
      badge: { text: 'Complex', type: 'warning' },
      basePrice: null, // Enterprise pricing
      initialCost: {
        hardware: 85000,
        software: 120000,
        implementation: 65000,
        training: 25000
      },
      annualCost: {
        subscription: false,
        maintenancePercentage: 18,
        supportPercentage: 12,
        fteRequirement: 1.5
      },
      implementation: {
        timeInDays: 120,
        complexityRating: 'High',
        specializedResourcesNeeded: true
      },
      architecture: {
        cloudNative: false,
        onPremises: true,
        hybrid: true,
        saasModel: false,
        microservices: false,
        monolithic: true,
        multiTenant: false,
        singleTenant: true
      },
      ratings: {
        cloudNative: 35,
        deploymentSpeed: 30,
        zeroTrust: 75,
        costEfficiency: 40,
        remoteAccess: 60,
        scalability: 80,
        easeOfManagement: 45,
        integration: 80
      },
      securityCapabilities: {
        deviceAuthentication: 90,
        userAuthentication: 85,
        continuousMonitoring: 70,
        automatedRemediation: 75,
        threatDetection: 80,
        policyEnforcement: 85,
        complianceReporting: 80,
        incidentResponse: 75
      },
      zeroTrustCapabilities: {
        deviceIdentity: 80,
        userIdentity: 85,
        contextualAccess: 80,
        leastPrivilege: 80,
        continuousVerification: 70,
        microsegmentation: 85
      },
      riskReduction: {
        unauthorizedAccess: 85,
        malwarePropagation: 80,
        dataBreach: 75,
        complianceViolations: 85,
        insiderThreats: 70
      },
      features: {
        // Technical features
        radiusServer: true,
        cloud802_1x: false,
        segmentation: true,
        deviceFingerprinting: true,
        riskBasedAccess: true,
        mdm: true,
        edr: true,
        macBypass: true,
        guestPortal: true,
        apiIntegration: true,
        siem: true,
        mfa: true,
        
        // Business features
        flexiblePricing: false,
        noHardwareRequired: false,
        scalableLicensing: false,
        remoteWorkSupport: true,
        autoScaling: false
      }
    },
    aruba: {
      name: 'Aruba ClearPass',
      description: 'Policy manager',
      basePrice: null, // Enterprise pricing
      initialCost: {
        hardware: 65000,
        software: 95000,
        implementation: 50000,
        training: 20000
      },
      annualCost: {
        subscription: false,
        maintenancePercentage: 18,
        supportPercentage: 10,
        fteRequirement: 1.2
      },
      implementation: {
        timeInDays: 90,
        complexityRating: 'Medium-High',
        specializedResourcesNeeded: true
      },
      architecture: {
        cloudNative: false,
        onPremises: true,
        hybrid: true,
        saasModel: false,
        microservices: false,
        monolithic: true,
        multiTenant: false,
        singleTenant: true
      },
      ratings: {
        cloudNative: 40,
        deploymentSpeed: 45,
        zeroTrust: 70,
        costEfficiency: 55,
        remoteAccess: 65,
        scalability: 75,
        easeOfManagement: 60,
        integration: 75
      },
      securityCapabilities: {
        deviceAuthentication: 85,
        userAuthentication: 80,
        continuousMonitoring: 75,
        automatedRemediation: 70,
        threatDetection: 75,
        policyEnforcement: 80,
        complianceReporting: 75,
        incidentResponse: 70
      },
      zeroTrustCapabilities: {
        deviceIdentity: 80,
        userIdentity: 80,
        contextualAccess: 75,
        leastPrivilege: 75,
        continuousVerification: 70,
        microsegmentation: 65
      },
      riskReduction: {
        unauthorizedAccess: 80,
        malwarePropagation: 75,
        dataBreach: 70,
        complianceViolations: 80,
        insiderThreats: 65
      },
      features: {
        // Technical features
        radiusServer: true,
        cloud802_1x: false,
        segmentation: true,
        deviceFingerprinting: true,
        riskBasedAccess: true,
        mdm: true,
        edr: true,
        macBypass: true,
        guestPortal: true,
        apiIntegration: true,
        siem: true,
        mfa: true,
        
        // Business features
        flexiblePricing: false,
        noHardwareRequired: false,
        scalableLicensing: false,
        remoteWorkSupport: true,
        autoScaling: false
      }
    },
    forescout: {
      name: 'Forescout',
      description: 'Device visibility',
      basePrice: null, // Enterprise pricing
      initialCost: {
        hardware: 70000,
        software: 110000,
        implementation: 55000,
        training: 22000
      },
      annualCost: {
        subscription: false,
        maintenancePercentage: 20,
        supportPercentage: 12,
        fteRequirement: 1.3
      },
      implementation: {
        timeInDays: 100,
        complexityRating: 'Medium-High',
        specializedResourcesNeeded: true
      },
      architecture: {
        cloudNative: false,
        onPremises: true,
        hybrid: true,
        saasModel: false,
        microservices: false,
        monolithic: true,
        multiTenant: false,
        singleTenant: true
      },
      ratings: {
        cloudNative: 30,
        deploymentSpeed: 35,
        zeroTrust: 75,
        costEfficiency: 45,
        remoteAccess: 60,
        scalability: 70,
        easeOfManagement: 55,
        integration: 80
      },
      securityCapabilities: {
        deviceAuthentication: 80,
        userAuthentication: 70,
        continuousMonitoring: 85,
        automatedRemediation: 75,
        threatDetection: 80,
        policyEnforcement: 75,
        complianceReporting: 75,
        incidentResponse: 70
      },
      zeroTrustCapabilities: {
        deviceIdentity: 85,
        userIdentity: 70,
        contextualAccess: 75,
        leastPrivilege: 70,
        continuousVerification: 80,
        microsegmentation: 65
      },
      riskReduction: {
        unauthorizedAccess: 80,
        malwarePropagation: 75,
        dataBreach: 70,
        complianceViolations: 75,
        insiderThreats: 70
      }
    },
    'no-nac': {
      name: 'No NAC Solution',
      description: 'High risk baseline',
      badge: { text: 'High Risk', type: 'danger' },
      basePrice: 0,
      initialCost: {
        hardware: 0,
        software: 0,
        implementation: 0,
        training: 0
      },
      annualCost: {
        subscription: false,
        maintenancePercentage: 0,
        supportPercentage: 0,
        fteRequirement: 0.5 // Still requires some management
      },
      implementation: {
        timeInDays: 0,
        complexityRating: 'None',
        specializedResourcesNeeded: false
      },
      architecture: {
        cloudNative: false,
        onPremises: false,
        hybrid: false,
        saasModel: false,
        microservices: false,
        monolithic: false,
        multiTenant: false,
        singleTenant: false
      },
      ratings: {
        cloudNative: 0,
        deploymentSpeed: 100, // Instant since nothing to deploy
        zeroTrust: 0,
        costEfficiency: 100, // No direct costs
        remoteAccess: 0,
        scalability: 0,
        easeOfManagement: 0,
        integration: 0
      },
      securityCapabilities: {
        deviceAuthentication: 0,
        userAuthentication: 0,
        continuousMonitoring: 0,
        automatedRemediation: 0,
        threatDetection: 0,
        policyEnforcement: 0,
        complianceReporting: 0,
        incidentResponse: 0
      },
      zeroTrustCapabilities: {
        deviceIdentity: 0,
        userIdentity: 0,
        contextualAccess: 0,
        leastPrivilege: 0,
        continuousVerification: 0,
        microsegmentation: 0
      },
      riskReduction: {
        unauthorizedAccess: 0,
        malwarePropagation: 0,
        dataBreach: 0,
        complianceViolations: 0,
        insiderThreats: 0
      }
    }
  };
  
  // Default to always include Portnox
  const defaultVendor = 'portnox';
  
  // Enhance vendor selection handling
  document.addEventListener('DOMContentLoaded', function() {
    const vendorCards = document.querySelectorAll('.vendor-card');
    
    // Helper function to get currently selected vendors
    const getSelectedVendors = function() {
      return Array.from(document.querySelectorAll('.vendor-card.selected'))
        .map(card => card.getAttribute('data-vendor'))
        .filter(Boolean);
    };
    
    // Helper function to update UI based on vendor selection
    const updateVendorUI = function() {
      const selectedVendors = getSelectedVendors();
      console.log("Selected vendors:", selectedVendors);
      
      // Ensure Portnox is always selected
      if (!selectedVendors.includes(defaultVendor)) {
        const portnoxCard = document.querySelector(`.vendor-card[data-vendor="${defaultVendor}"]`);
        if (portnoxCard && !portnoxCard.classList.contains('selected')) {
          portnoxCard.classList.add('selected');
          selectedVendors.push(defaultVendor);
        }
      }
      
      // Enforce reasonable number of vendors (max 4 for readability)
      if (selectedVendors.length > 4) {
        warn("Maximum 4 vendors can be selected for clear comparison");
        
        // Keep only the first 4 selected vendors
        const excessVendors = selectedVendors.slice(4);
        excessVendors.forEach(vendor => {
          if (vendor !== defaultVendor) { // Never deselect Portnox
            const card = document.querySelector(`.vendor-card[data-vendor="${vendor}"]`);
            if (card) {
              card.classList.remove('selected');
            }
          }
        });
      }
      
      // Update "Selected Vendors" display if it exists
      const vendorDisplay = document.getElementById('selected-vendors-display');
      if (vendorDisplay) {
        vendorDisplay.textContent = selectedVendors
          .map(vendor => window.vendorData[vendor]?.name || vendor)
          .join(', ');
      }
      
      // Trigger a calculation update
      if (typeof window.updateCalculations === 'function') {
        window.updateCalculations(getSelectedVendors());
      }
    };
    
    // Add click event listeners to vendor cards
    vendorCards.forEach(card => {
      card.addEventListener('click', function() {
        const vendor = this.getAttribute('data-vendor');
        if (!vendor) return;
        
        // Toggle selection state, except for Portnox which should always be selected
        if (vendor !== defaultVendor) {
          this.classList.toggle('selected');
        } else if (!this.classList.contains('selected')) {
          // Ensure Portnox is always selected
          this.classList.add('selected');
        }
        
        updateVendorUI();
      });
    });
    
    // Ensure Portnox is selected by default
    const portnoxCard = document.querySelector(`.vendor-card[data-vendor="${defaultVendor}"]`);
    if (portnoxCard && !portnoxCard.classList.contains('selected')) {
      portnoxCard.classList.add('selected');
    }
    
    // Initial UI update
    updateVendorUI();
  });
})();
