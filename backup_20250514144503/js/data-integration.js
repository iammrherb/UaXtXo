/**
 * Data Integration Script
 * Ensures all data models are properly integrated and accessible
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log("Data Integration: Starting data model integration...");
  
  // Ensure industry data is available
  if (!window.IndustryData && typeof window.enhancedIndustryTemplates !== 'undefined') {
    window.IndustryData = {
      industries: {},
      breachMetrics: {},
      fteRequirements: {}
    };
    
    // Extract industry data from enhanced templates
    for (const [id, template] of Object.entries(window.enhancedIndustryTemplates)) {
      window.IndustryData.industries[id] = {
        title: template.name,
        description: template.description,
        icon: `fas fa-${id === 'healthcare' ? 'hospital' : id === 'financial' ? 'university' : id === 'education' ? 'graduation-cap' : 'building'}`,
        implementationTime: `${template.benchmarks?.implementationTime || "12-24"} weeks`,
        cloudSavings: `${template.benchmarks?.cloudSavingsPercentage || "30-40"}%`,
        cloudAdoption: `${id === 'healthcare' ? '62' : id === 'financial' ? '58' : id === 'education' ? '75' : '65'}%`
      };
      
      // Extract breach metrics if available
      if (template.benchmarks) {
        window.IndustryData.breachMetrics[id] = {
          averageBreachCost: template.benchmarks.averageTCO,
          annualProbability: 0.25,
          recordCost: 200
        };
      }
      
      // Set default FTE requirements
      window.IndustryData.fteRequirements[id] = {
        cloudNac: 0.15,
        onPremiseNac: 0.4
      };
    }
    
    console.log("Data Integration: Created IndustryData from enhancedIndustryTemplates");
  }
  
  // Ensure vendor comparison data is available
  if (!window.VendorComparisonData) {
    // Create basic vendor comparison data if not available
    window.VendorComparisonData = {
      featureRatings: {
        cisco: {
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
        aruba: {
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
        forescout: {
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
        fortinac: {
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
        nps: {
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
        securew2: {
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
        portnox: {
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
        }
      },
      descriptions: {
        cisco: "Comprehensive on-premises NAC solution with extensive features, strong Cisco ecosystem integration, and advanced enterprise controls.",
        aruba: "Full-featured NAC with excellent guest management, strong wireless capabilities, and good multi-vendor support.",
        forescout: "Specialized agentless NAC with superior device discovery and classification, particularly strong in IoT/OT environments.",
        fortinac: "Part of the Fortinet Security Fabric with good integration and protection for Fortinet environments.",
        nps: "Basic NAC functionality included with Windows Server, providing simple authentication with minimal features.",
        securew2: "Cloud-focused solution specializing in certificate-based authentication and passwordless access.",
        portnox: "True cloud-native NAC with rapid deployment, zero hardware requirements, and comprehensive security features.",
        noNac: "No dedicated network access control solution in place, relying on basic security controls."
      }
    };
    
    console.log("Data Integration: Created basic VendorComparisonData");
  }
  
  // Create NoNacBaseline if not available
  if (!window.NoNacBaseline) {
    window.NoNacBaseline = {
      calculateTotalCost: function(params) {
        // Simple calculation for no NAC scenario
        const { deviceCount, yearsToProject } = params;
        
        const breachRisk = {
          annualExpectedLoss: deviceCount * 80,
          yearlyLosses: Array(yearsToProject).fill().map((_, i) => deviceCount * 80 * (1 + i * 0.05)),
          cumulativeLoss: 0,
          breachProbability: 0.3
        };
        
        // Calculate cumulative loss
        breachRisk.cumulativeLoss = breachRisk.yearlyLosses.reduce((sum, val) => sum + val, 0);
        
        const complianceRisk = {
          totalAnnualRisk: deviceCount * 30,
          yearlyRisks: Array(yearsToProject).fill().map((_, i) => deviceCount * 30 * (1 + i * 0.1)),
          cumulativeRisk: 0
        };
        
        // Calculate cumulative risk
        complianceRisk.cumulativeRisk = complianceRisk.yearlyRisks.reduce((sum, val) => sum + val, 0);
        
        const operationalInefficiency = {
          annualInefficiency: deviceCount * 50,
          yearlyInefficiencies: Array(yearsToProject).fill().map((_, i) => deviceCount * 50 * (1 + i * 0.03)),
          cumulativeInefficiency: 0
        };
        
        // Calculate cumulative inefficiency
        operationalInefficiency.cumulativeInefficiency = operationalInefficiency.yearlyInefficiencies.reduce((sum, val) => sum + val, 0);
        
        const staffingCosts = {
          fteWithoutNac: deviceCount / 1000 * 0.6,
          annualStaffingCost: deviceCount / 1000 * 0.6 * 140000,
          yearlyStaffingCosts: Array(yearsToProject).fill().map((_, i) => deviceCount / 1000 * 0.6 * 140000 * (1 + i * 0.035)),
          cumulativeStaffingCost: 0
        };
        
        // Calculate cumulative staffing cost
        staffingCosts.cumulativeStaffingCost = staffingCosts.yearlyStaffingCosts.reduce((sum, val) => sum + val, 0);
        
        return {
          breachRisk,
          complianceRisk,
          operationalInefficiency,
          staffingCosts,
          totalAnnualCost: 
            breachRisk.annualExpectedLoss + 
            complianceRisk.totalAnnualRisk + 
            operationalInefficiency.annualInefficiency +
            staffingCosts.annualStaffingCost,
          yearlyTotals: Array(yearsToProject).fill().map((_, i) => 
            breachRisk.yearlyLosses[i] + 
            complianceRisk.yearlyRisks[i] + 
            operationalInefficiency.yearlyInefficiencies[i] +
            staffingCosts.yearlyStaffingCosts[i]
          ),
          cumulativeTotal: 
            breachRisk.cumulativeLoss + 
            complianceRisk.cumulativeRisk + 
            operationalInefficiency.cumulativeInefficiency +
            staffingCosts.cumulativeStaffingCost
        };
      },
      getMitigationFactors: function() {
        return {
          breachLikelihood: 0.75,
          breachScope: 0.50,
          detectionTime: 0.20,
          complianceRisk: 0.85
        };
      }
    };
    
    console.log("Data Integration: Created NoNacBaseline for cost calculations");
  }
  
  // Create compliance frameworks if not available
  if (!window.ComplianceFrameworks) {
    window.ComplianceFrameworks = {
      frameworks: {
        hipaa: {
          name: "HIPAA",
          description: "Health Insurance Portability and Accountability Act requires safeguards for protected health information (PHI).",
          nacRequirements: "Network segmentation to separate systems with ePHI, multi-factor authentication for access to systems with ePHI, detailed audit trails, and automated compliance monitoring.",
          applicableIndustries: ["healthcare", "other"]
        },
        pci: {
          name: "PCI DSS",
          description: "Payment Card Industry Data Security Standard protects cardholder data with specific security requirements.",
          nacRequirements: "Network segmentation for cardholder data environments, secure authentication including MFA, tracking and monitoring all access to network resources, and regular testing of security systems.",
          applicableIndustries: ["retail", "hospitality", "financial", "healthcare", "education", "other"]
        },
        gdpr: {
          name: "GDPR",
          description: "General Data Protection Regulation governs data protection and privacy in the EU with global implications.",
          nacRequirements: "Appropriate technical measures to secure personal data, strong authentication mechanisms, detailed logs of access activities, and data access controls.",
          applicableIndustries: ["all"]
        }
      },
      getFramework: function(id) {
        return this.frameworks[id] || null;
      },
      getFrameworksForIndustry: function(industry) {
        const result = [];
        
        for (const [id, framework] of Object.entries(this.frameworks)) {
          if (framework.applicableIndustries.includes(industry) || framework.applicableIndustries.includes("all")) {
            result.push({
              id,
              ...framework
            });
          }
        }
        
        return result;
      }
    };
    
    console.log("Data Integration: Created ComplianceFrameworks for compliance analysis");
  }
  
  console.log("Data Integration: Data model integration completed");
});
