/**
 * Comprehensive NAC Vendor Comparison Data 
 * Includes detailed information on features, pricing, and TCO for all major NAC vendors
 * Version: 2.1
 */

window.VendorData = {
  vendors: [
    {
      id: "portnox",
      name: "Portnox",
      description: "Cloud-native NAC solution with rapid deployment and low TCO",
      logo: "portnox-logo.svg",
      color: "#1E88E5",
      type: "cloud",
      badge: "Cloud Native",
      keyFeatures: [
        "True cloud-native architecture",
        "Zero hardware requirements",
        "Rapid deployment (hours to days)",
        "Advanced IoT fingerprinting (260K+ devices)",
        "Continuous compliance monitoring"
      ],
      deploymentOptions: ["cloud"],
      pricing: {
        model: "Subscription",
        initialCost: 0,
        perDeviceMonthly: 4.00,
        yearlyDiscount: 0.20,
        implementationCost: 5000,
        maintenanceCost: 0
      },
      implementation: {
        timeSmall: 1,  // days
        timeMedium: 3, // days
        timeLarge: 7,  // days
        complexity: "low",
        professionalServices: "minimal",
        trainingRequired: "minimal"
      },
      operationalOverhead: {
        fteRequirement: 0.2,
        maintainedBy: "vendor",
        upgradeCadence: "automatic",
        downtimePerYear: 0
      },
      featureScores: {
        deviceVisibility: 8,
        policyManagement: 9,
        guestAccess: 8,
        byodSupport: 9,
        cloudIntegration: 10,
        automatedRemediation: 9,
        thirdPartyIntegration: 9,
        scalability: 9,
        easeOfUse: 9,
        reporting: 8
      },
      complianceSupport: {
        hipaa: "full",
        pciDss: "full",
        gdpr: "full",
        nistCsf: "full",
        iso27001: "full",
        soc2: "full",
        ccpa: "partial",
        glba: "full",
        ferpa: "full",
        fisma: "full",
        nercCip: "full",
        cmmc: "full",
        hitrust: "full",
        disaStig: "full",
        nist800171: "full",
        sox: "partial"
      },
      industrySuitability: {
        healthcare: 9.5,
        financial: 9.0,
        retail: 9.5,
        education: 9.5,
        government: 8.5,
        manufacturing: 9.0
      },
      roi: {
        threeYear: 145,
        paybackPeriod: 8 // months
      }
    },
    {
      id: "cisco",
      name: "Cisco ISE",
      description: "Comprehensive on-premises NAC solution with extensive Cisco ecosystem integration",
      logo: "cisco-logo.svg",
      color: "#E53935",
      type: "on-premises",
      badge: "Market Leader",
      keyFeatures: [
        "Comprehensive feature set",
        "Deep Cisco integration",
        "Advanced TACACS+ support",
        "Advanced policy controls",
        "Extensive ecosystem integrations"
      ],
      deploymentOptions: ["on-premises", "cloud-hosted"],
      pricing: {
        model: "Subscription tiers",
        initialCost: 50000,
        perDeviceYearly: 40,
        implementationCost: 75000,
        maintenanceCost: 20000
      },
      implementation: {
        timeSmall: 14,   // days
        timeMedium: 45,  // days
        timeLarge: 120,  // days
        complexity: "high",
        professionalServices: "required",
        trainingRequired: "extensive"
      },
      operationalOverhead: {
        fteRequirement: 1.0,
        maintainedBy: "customer",
        upgradeCadence: "twice yearly",
        downtimePerYear: 16 // hours
      },
      featureScores: {
        deviceVisibility: 8,
        policyManagement: 9,
        guestAccess: 8,
        byodSupport: 8,
        cloudIntegration: 6,
        automatedRemediation: 8,
        thirdPartyIntegration: 9,
        scalability: 9,
        easeOfUse: 5,
        reporting: 8
      },
      complianceSupport: {
        hipaa: "full",
        pciDss: "full",
        gdpr: "partial",
        nistCsf: "full",
        iso27001: "full",
        soc2: "partial",
        ccpa: "partial",
        glba: "full",
        ferpa: "partial",
        fisma: "full",
        nercCip: "full",
        cmmc: "full",
        hitrust: "full",
        disaStig: "full",
        nist800171: "full",
        sox: "partial"
      },
      industrySuitability: {
        healthcare: 8.5,
        financial: 9.0,
        retail: 8.5,
        education: 8.0,
        government: 9.0,
        manufacturing: 8.5
      },
      roi: {
        threeYear: 87,
        paybackPeriod: 22 // months
      }
    },
    {
      id: "aruba",
      name: "Aruba ClearPass",
      description: "Full-featured NAC solution with excellent guest management capabilities",
      logo: "aruba-logo.svg",
      color: "#FB8C00",
      type: "on-premises",
      badge: null,
      keyFeatures: [
        "Superior guest management",
        "Multi-vendor support",
        "Wireless integration",
        "Extensive device profiling",
        "Flexible deployment options"
      ],
      deploymentOptions: ["on-premises", "cloud-hosted"],
      pricing: {
        model: "Perpetual or subscription",
        initialCost: 40000,
        perDeviceYearly: 35,
        implementationCost: 60000,
        maintenanceCost: 15000
      },
      implementation: {
        timeSmall: 10,   // days
        timeMedium: 35,  // days
        timeLarge: 90,   // days
        complexity: "medium-high",
        professionalServices: "recommended",
        trainingRequired: "moderate"
      },
      operationalOverhead: {
        fteRequirement: 0.7,
        maintainedBy: "customer",
        upgradeCadence: "quarterly",
        downtimePerYear: 12 // hours
      },
      featureScores: {
        deviceVisibility: 8,
        policyManagement: 8,
        guestAccess: 9,
        byodSupport: 9,
        cloudIntegration: 7,
        automatedRemediation: 8,
        thirdPartyIntegration: 8,
        scalability: 8,
        easeOfUse: 6,
        reporting: 8
      },
      complianceSupport: {
        hipaa: "full",
        pciDss: "full",
        gdpr: "partial",
        nistCsf: "full",
        iso27001: "full",
        soc2: "partial",
        ccpa: "partial",
        glba: "full",
        ferpa: "partial",
        fisma: "full",
        nercCip: "full",
        cmmc: "partial",
        hitrust: "full",
        disaStig: "partial",
        nist800171: "full",
        sox: "partial"
      },
      industrySuitability: {
        healthcare: 8.5,
        financial: 8.5,
        retail: 8.0,
        education: 8.5,
        government: 8.5,
        manufacturing: 8.0
      },
      roi: {
        threeYear: 78,
        paybackPeriod: 24 // months
      }
    },
    {
      id: "forescout",
      name: "Forescout",
      description: "Specialized device visibility and control with OT/IoT expertise",
      logo: "forescout-logo.svg",
      color: "#7E57C2",
      type: "on-premises",
      badge: null,
      keyFeatures: [
        "Superior device discovery",
        "Agentless operation",
        "OT/IoT security focus",
        "Advanced device profiling",
        "Strong operational technology support"
      ],
      deploymentOptions: ["on-premises", "cloud-hosted"],
      pricing: {
        model: "Subscription (moving from perpetual)",
        initialCost: 45000,
        perDeviceYearly: 50,
        implementationCost: 70000,
        maintenanceCost: 18000
      },
      implementation: {
        timeSmall: 10,   // days
        timeMedium: 25,  // days
        timeLarge: 75,   // days
        complexity: "medium-high",
        professionalServices: "recommended",
        trainingRequired: "moderate"
      },
      operationalOverhead: {
        fteRequirement: 0.8,
        maintainedBy: "customer",
        upgradeCadence: "quarterly",
        downtimePerYear: 10 // hours
      },
      featureScores: {
        deviceVisibility: 10,
        policyManagement: 8,
        guestAccess: 7,
        byodSupport: 7,
        cloudIntegration: 6,
        automatedRemediation: 9,
        thirdPartyIntegration: 9,
        scalability: 8,
        easeOfUse: 6,
        reporting: 9
      },
      complianceSupport: {
        hipaa: "full",
        pciDss: "full",
        gdpr: "partial",
        nistCsf: "full",
        iso27001: "full",
        soc2: "partial",
        ccpa: "partial",
        glba: "partial",
        ferpa: "partial",
        fisma: "full",
        nercCip: "full",
        cmmc: "partial",
        hitrust: "partial",
        disaStig: "partial",
        nist800171: "full",
        sox: "partial"
      },
      industrySuitability: {
        healthcare: 8.0,
        financial: 8.0,
        retail: 8.5,
        education: 7.5,
        government: 8.5,
        manufacturing: 9.5
      },
      roi: {
        threeYear: 65,
        paybackPeriod: 20 // months
      }
    },
    {
      id: "fortinac",
      name: "FortiNAC",
      description: "NAC solution with strong security fabric integration",
      logo: "fortinac-logo.svg",
      color: "#43A047",
      type: "on-premises",
      badge: null,
      keyFeatures: [
        "Fortinet Security Fabric integration",
        "Network access control",
        "IoT device discovery",
        "Endpoint protection",
        "Automated response capabilities"
      ],
      deploymentOptions: ["on-premises", "cloud-hosted"],
      pricing: {
        model: "Tiered (BASE/PLUS/PRO)",
        initialCost: 30000,
        perDeviceYearly: 30,
        implementationCost: 45000,
        maintenanceCost: 12000
      },
      implementation: {
        timeSmall: 14,   // days
        timeMedium: 30,  // days
        timeLarge: 60,   // days
        complexity: "medium",
        professionalServices: "recommended",
        trainingRequired: "moderate"
      },
      operationalOverhead: {
        fteRequirement: 0.6,
        maintainedBy: "customer",
        upgradeCadence: "quarterly",
        downtimePerYear: 8 // hours
      },
      featureScores: {
        deviceVisibility: 8,
        policyManagement: 7,
        guestAccess: 7,
        byodSupport: 7,
        cloudIntegration: 6,
        automatedRemediation: 7,
        thirdPartyIntegration: 7,
        scalability: 7,
        easeOfUse: 6,
        reporting: 7
      },
      complianceSupport: {
        hipaa: "partial",
        pciDss: "full",
        gdpr: "partial",
        nistCsf: "partial",
        iso27001: "partial",
        soc2: "partial",
        ccpa: "partial",
        glba: "partial",
        ferpa: "partial",
        fisma: "partial",
        nercCip: "partial",
        cmmc: "partial",
        hitrust: "partial",
        disaStig: "partial",
        nist800171: "partial",
        sox: "partial"
      },
      industrySuitability: {
        healthcare: 8.0,
        financial: 8.5,
        retail: 8.0,
        education: 7.0,
        government: 8.0,
        manufacturing: 8.5
      },
      roi: {
        threeYear: 92,
        paybackPeriod: 18 // months
      }
    },
    {
      id: "nps",
      name: "Microsoft NPS",
      description: "Basic authentication service included with Windows Server",
      logo: "microsoft-logo.svg",
      color: "#00897B",
      type: "on-premises",
      badge: null,
      keyFeatures: [
        "Windows integration",
        "Basic RADIUS functionality",
        "Minimal cost",
        "Simple setup",
        "Native Windows authentication"
      ],
      deploymentOptions: ["on-premises"],
      pricing: {
        model: "Included with Windows Server",
        initialCost: 5000,
        perDeviceYearly: 0,
        implementationCost: 15000,
        maintenanceCost: 5000
      },
      implementation: {
        timeSmall: 5,    // days
        timeMedium: 14,  // days
        timeLarge: 28,   // days
        complexity: "low-medium",
        professionalServices: "optional",
        trainingRequired: "minimal"
      },
      operationalOverhead: {
        fteRequirement: 0.3,
        maintainedBy: "customer",
        upgradeCadence: "with Windows updates",
        downtimePerYear: 6 // hours
      },
      featureScores: {
        deviceVisibility: 4,
        policyManagement: 5,
        guestAccess: 3,
        byodSupport: 3,
        cloudIntegration: 2,
        automatedRemediation: 2,
        thirdPartyIntegration: 3,
        scalability: 5,
        easeOfUse: 4,
        reporting: 3
      },
      complianceSupport: {
        hipaa: "partial",
        pciDss: "partial",
        gdpr: "none",
        nistCsf: "partial",
        iso27001: "partial",
        soc2: "none",
        ccpa: "none",
        glba: "partial",
        ferpa: "partial",
        fisma: "partial",
        nercCip: "none",
        cmmc: "none",
        hitrust: "none",
        disaStig: "none",
        nist800171: "partial",
        sox: "none"
      },
      industrySuitability: {
        healthcare: 5.0,
        financial: 5.0,
        retail: 5.5,
        education: 6.0,
        government: 6.0,
        manufacturing: 5.0
      },
      roi: {
        threeYear: 60,
        paybackPeriod: 15 // months
      }
    },
    {
      id: "securew2",
      name: "SecureW2",
      description: "Cloud-based certificate management and authentication",
      logo: "securew2-logo.svg",
      color: "#5E35B1",
      type: "cloud",
      badge: null,
      keyFeatures: [
        "Certificate expertise",
        "Cloud identity integration",
        "Passwordless authentication",
        "BYOD onboarding",
        "Eduroam support"
      ],
      deploymentOptions: ["cloud"],
      pricing: {
        model: "Subscription",
        initialCost: 0,
        perDeviceYearly: 31,
        implementationCost: 15000,
        maintenanceCost: 0
      },
      implementation: {
        timeSmall: 3,    // days
        timeMedium: 7,   // days
        timeLarge: 14,   // days
        complexity: "low-medium",
        professionalServices: "optional",
        trainingRequired: "moderate"
      },
      operationalOverhead: {
        fteRequirement: 0.25,
        maintainedBy: "vendor",
        upgradeCadence: "automatic",
        downtimePerYear: 2 // hours
      },
      featureScores: {
        deviceVisibility: 6,
        policyManagement: 7,
        guestAccess: 7,
        byodSupport: 9,
        cloudIntegration: 9,
        automatedRemediation: 6,
        thirdPartyIntegration: 6,
        scalability: 8,
        easeOfUse: 8,
        reporting: 7
      },
      complianceSupport: {
        hipaa: "partial",
        pciDss: "partial",
        gdpr: "partial",
        nistCsf: "partial",
        iso27001: "partial",
        soc2: "partial",
        ccpa: "none",
        glba: "partial",
        ferpa: "partial",
        fisma: "partial",
        nercCip: "none",
        cmmc: "partial",
        hitrust: "partial",
        disaStig: "partial",
        nist800171: "partial",
        sox: "none"
      },
      industrySuitability: {
        healthcare: 7.0,
        financial: 7.5,
        retail: 7.0,
        education: 9.0,
        government: 7.0,
        manufacturing: 6.5
      },
      roi: {
        threeYear: 95,
        paybackPeriod: 12 // months
      }
    },
    {
      id: "foxpass",
      name: "Foxpass",
      description: "Cloud-based authentication and directory services",
      logo: "foxpass-logo.svg",
      color: "#FF5722",
      type: "cloud",
      badge: null,
      keyFeatures: [
        "Cloud LDAP and RADIUS",
        "Two-factor authentication",
        "SSH key management",
        "Team management",
        "Directory synchronization"
      ],
      deploymentOptions: ["cloud"],
      pricing: {
        model: "Per-user subscription",
        initialCost: 0,
        perUserMonthly: 3.00,
        implementationCost: 5000,
        maintenanceCost: 0
      },
      implementation: {
        timeSmall: 2,    // days
        timeMedium: 5,   // days
        timeLarge: 10,   // days
        complexity: "low",
        professionalServices: "optional",
        trainingRequired: "minimal"
      },
      operationalOverhead: {
        fteRequirement: 0.2,
        maintainedBy: "vendor",
        upgradeCadence: "automatic",
        downtimePerYear: 1 // hours
      },
      featureScores: {
        deviceVisibility: 5,
        policyManagement: 6,
        guestAccess: 6,
        byodSupport: 7,
        cloudIntegration: 8,
        automatedRemediation: 5,
        thirdPartyIntegration: 6,
        scalability: 7,
        easeOfUse: 8,
        reporting: 6
      },
      complianceSupport: {
        hipaa: "partial",
        pciDss: "partial",
        gdpr: "partial",
        nistCsf: "partial",
        iso27001: "partial",
        soc2: "partial",
        ccpa: "none",
        glba: "partial",
        ferpa: "partial",
        fisma: "partial",
        nercCip: "none",
        cmmc: "none",
        hitrust: "none",
        disaStig: "none",
        nist800171: "partial",
        sox: "none"
      },
      industrySuitability: {
        healthcare: 6.0,
        financial: 6.5,
        retail: 7.0,
        education: 7.5,
        government: 6.0,
        manufacturing: 6.0
      },
      roi: {
        threeYear: 85,
        paybackPeriod: 10 // months
      }
    },
    {
      id: "arista",
      name: "Arista Agni",
      description: "Policy-based network management and secure access",
      logo: "arista-logo.svg",
      color: "#3949AB",
      type: "on-premises",
      badge: null,
      keyFeatures: [
        "Network access control",
        "Policy-based automation",
        "Wired and wireless management",
        "Integration with Arista portfolio",
        "Endpoint compliance checking"
      ],
      deploymentOptions: ["on-premises"],
      pricing: {
        model: "Subscription",
        initialCost: 35000,
        perDeviceYearly: 32,
        implementationCost: 50000,
        maintenanceCost: 12000
      },
      implementation: {
        timeSmall: 10,   // days
        timeMedium: 25,  // days
        timeLarge: 60,   // days
        complexity: "medium",
        professionalServices: "recommended",
        trainingRequired: "moderate"
      },
      operationalOverhead: {
        fteRequirement: 0.6,
        maintainedBy: "customer",
        upgradeCadence: "quarterly",
        downtimePerYear: 8 // hours
      },
      featureScores: {
	  deviceVisibility: 7,
        policyManagement: 8,
        guestAccess: 7,
        byodSupport: 7,
        cloudIntegration: 6,
        automatedRemediation: 7,
        thirdPartyIntegration: 7,
        scalability: 8,
        easeOfUse: 6,
        reporting: 7
      },
      complianceSupport: {
        hipaa: "partial",
        pciDss: "partial",
        gdpr: "partial",
        nistCsf: "partial",
        iso27001: "partial",
        soc2: "partial",
        ccpa: "none",
        glba: "partial",
        ferpa: "partial",
        fisma: "partial",
        nercCip: "partial",
        cmmc: "partial",
        hitrust: "partial",
        disaStig: "partial",
        nist800171: "partial",
        sox: "partial"
      },
      industrySuitability: {
        healthcare: 7.5,
        financial: 7.5,
        retail: 7.5,
        education: 7.0,
        government: 7.5,
        manufacturing: 7.5
      },
      roi: {
        threeYear: 75,
        paybackPeriod: 20 // months
      }
    },
    {
      id: "juniper",
      name: "Juniper Mist NAC",
      description: "AI-driven NAC solution for wired and wireless networks",
      logo: "juniper-logo.svg",
      color: "#8BC34A",
      type: "cloud",
      badge: null,
      keyFeatures: [
        "AI-driven operations",
        "Cloud management",
        "Wired and wireless integration",
        "Marvis Virtual Network Assistant",
        "User engagement analytics"
      ],
      deploymentOptions: ["cloud"],
      pricing: {
        model: "Subscription",
        initialCost: 10000,
        perDeviceYearly: 35,
        implementationCost: 30000,
        maintenanceCost: 5000
      },
      implementation: {
        timeSmall: 7,    // days
        timeMedium: 15,  // days
        timeLarge: 30,   // days
        complexity: "medium",
        professionalServices: "recommended",
        trainingRequired: "moderate"
      },
      operationalOverhead: {
        fteRequirement: 0.4,
        maintainedBy: "hybrid",
        upgradeCadence: "automatic",
        downtimePerYear: 4 // hours
      },
      featureScores: {
        deviceVisibility: 8,
        policyManagement: 8,
        guestAccess: 8,
        byodSupport: 8,
        cloudIntegration: 9,
        automatedRemediation: 8,
        thirdPartyIntegration: 7,
        scalability: 8,
        easeOfUse: 8,
        reporting: 9
      },
      complianceSupport: {
        hipaa: "partial",
        pciDss: "partial",
        gdpr: "partial",
        nistCsf: "partial",
        iso27001: "partial",
        soc2: "partial",
        ccpa: "partial",
        glba: "partial",
        ferpa: "partial",
        fisma: "partial",
        nercCip: "partial",
        cmmc: "partial",
        hitrust: "partial",
        disaStig: "partial",
        nist800171: "partial",
        sox: "partial"
      },
      industrySuitability: {
        healthcare: 8.0,
        financial: 8.0,
        retail: 8.5,
        education: 8.5,
        government: 7.5,
        manufacturing: 7.5
      },
      roi: {
        threeYear: 85,
        paybackPeriod: 15 // months
      }
    }
  ],
  
  // Create TCO calculation function
  calculateTCO: function(vendor, deviceCount, years, additionalParams) {
    const v = this.vendors.find(v => v.id === vendor);
    if (!v) return null;
    
    // Set default values
    additionalParams = additionalParams || {};
    const fteCostPerYear = additionalParams.fteCostPerYear || 150000;
    const volumeDiscount = Math.min((deviceCount >= 5000 ? 0.3 : deviceCount >= 1000 ? 0.15 : 0), additionalParams.volumeDiscount || 0);
    
    // Calculate costs
    let initialCost = v.pricing.initialCost;
    let implementationCost = v.pricing.implementationCost;
    let annualLicenseCost = 0;
    
    // Calculate annual licensing cost based on pricing model
    if (v.pricing.perDeviceMonthly) {
      // Apply volume and yearly discounts for monthly pricing
      const effectiveMonthlyRate = v.pricing.perDeviceMonthly * (1 - volumeDiscount) * (1 - (v.pricing.yearlyDiscount || 0));
      annualLicenseCost = effectiveMonthlyRate * 12 * deviceCount;
    } else if (v.pricing.perDeviceYearly) {
      // Apply volume discount for yearly pricing
      annualLicenseCost = v.pricing.perDeviceYearly * deviceCount * (1 - volumeDiscount);
    } else if (v.pricing.perUserMonthly) {
      // For user-based pricing, assume users = 80% of devices
      const userCount = Math.ceil(deviceCount * 0.8);
      const effectiveMonthlyRate = v.pricing.perUserMonthly * (1 - volumeDiscount);
      annualLicenseCost = effectiveMonthlyRate * 12 * userCount;
    }
    
    // Adjust implementation cost based on device count
    if (deviceCount >= 5000) {
      implementationCost *= 1.5;
    } else if (deviceCount >= 1000) {
      implementationCost *= 1.2;
    }
    
    // Calculate FTE costs based on vendor's FTE requirement
    const annualFteCost = v.operationalOverhead.fteRequirement * fteCostPerYear;
    
    // Calculate maintenance costs (if applicable)
    const annualMaintenanceCost = v.pricing.maintenanceCost;
    
    // Calculate total cost for each year
    const yearlyBreakdown = [];
    let cumulativeCost = 0;
    
    for (let i = 0; i < years; i++) {
      let yearlyCost = 0;
      
      // Add initial costs only in first year
      if (i === 0) {
        yearlyCost += initialCost + implementationCost;
      }
      
      // Add annual costs
      yearlyCost += annualLicenseCost + annualMaintenanceCost + annualFteCost;
      
      // Apply annual increases (license increases ~5% per year)
      if (i > 0) {
        yearlyCost *= 1.05;
      }
      
      cumulativeCost += yearlyCost;
      yearlyBreakdown.push({
        year: i + 1,
        cost: yearlyCost,
        cumulativeCost: cumulativeCost
      });
    }
    
    // Calculate cost components
    const totalInitialCost = initialCost + implementationCost;
    const totalOperationalCost = annualFteCost * years;
    const totalMaintenanceCost = (annualLicenseCost + annualMaintenanceCost) * years;
    const totalCost = totalInitialCost + totalOperationalCost + totalMaintenanceCost;
    
    // Return TCO calculation
    return {
      vendor: v.name,
      deviceCount: deviceCount,
      years: years,
      totalCost: totalCost,
      totalInitialCost: totalInitialCost,
      totalOperationalCost: totalOperationalCost,
      totalMaintenanceCost: totalMaintenanceCost,
      yearlyBreakdown: yearlyBreakdown,
      costPerDevice: totalCost / deviceCount,
      costPerDevicePerMonth: (totalCost / deviceCount) / (years * 12)
    };
  },
  
  // Get comparison data for visualization
  getComparisonData: function(deviceCount, years, additionalParams) {
    const results = {
      vendors: [],
      initialCosts: [],
      operationalCosts: [],
      maintenanceCosts: [],
      totalCosts: [],
      costPerDevice: [],
      colors: []
    };
    
    this.vendors.forEach(vendor => {
      const tco = this.calculateTCO(vendor.id, deviceCount, years, additionalParams);
      if (tco) {
        results.vendors.push(vendor.name);
        results.initialCosts.push(tco.totalInitialCost);
        results.operationalCosts.push(tco.totalOperationalCost);
        results.maintenanceCosts.push(tco.totalMaintenanceCost);
        results.totalCosts.push(tco.totalCost);
        results.costPerDevice.push(tco.costPerDevice);
        results.colors.push(vendor.color);
      }
    });
    
    return results;
  },
  
  // Get feature comparison data
  getFeatureComparisonData: function() {
    const features = [
      "Device Visibility",
      "Policy Management",
      "Guest Access",
      "BYOD Support",
      "Cloud Integration",
      "Automated Remediation",
      "Third-Party Integration",
      "Scalability",
      "Ease of Use",
      "Reporting"
    ];
    
    const vendorData = this.vendors.map(vendor => {
      return {
        name: vendor.name,
        color: vendor.color,
        scores: [
          vendor.featureScores.deviceVisibility,
          vendor.featureScores.policyManagement,
          vendor.featureScores.guestAccess,
          vendor.featureScores.byodSupport,
          vendor.featureScores.cloudIntegration,
          vendor.featureScores.automatedRemediation,
          vendor.featureScores.thirdPartyIntegration,
          vendor.featureScores.scalability,
          vendor.featureScores.easeOfUse,
          vendor.featureScores.reporting
        ]
      };
    });
    
    return {
      features: features,
      vendors: vendorData
    };
  },
  
  // Get implementation time comparison data
  getImplementationComparisonData: function(organizationSize) {
    const timeProperty = organizationSize === 'large' ? 'timeLarge' : 
                        organizationSize === 'medium' ? 'timeMedium' : 'timeSmall';
    
    return {
      vendors: this.vendors.map(v => v.name),
      implementationTimes: this.vendors.map(v => v.implementation[timeProperty]),
      colors: this.vendors.map(v => v.color)
    };
  },
  
  // Get ROI comparison data
  getRoiComparisonData: function() {
    return {
      vendors: this.vendors.map(v => v.name),
      roiValues: this.vendors.map(v => v.roi.threeYear),
      paybackPeriods: this.vendors.map(v => v.roi.paybackPeriod),
      colors: this.vendors.map(v => v.color)
    };
  },
  
  // Get deployment type breakdown
  getDeploymentTypeBreakdown: function() {
    const types = {
      cloud: 0,
      onPremises: 0,
      hybrid: 0
    };
    
    this.vendors.forEach(v => {
      if (v.type === 'cloud') {
        types.cloud++;
      } else if (v.type === 'on-premises') {
        types.onPremises++;
      } else {
        types.hybrid++;
      }
    });
    
    return {
      labels: ['Cloud-Native', 'On-Premises', 'Hybrid'],
      values: [types.cloud, types.onPremises, types.hybrid]
    };
  }
};
