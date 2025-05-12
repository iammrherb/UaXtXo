/**
 * Industry-specific NAC Requirements and Data
 * Enhanced data for TCO analysis and visualization
 * Version: 2.1
 */

window.IndustryData = {
  industries: {
    healthcare: {
      name: "Healthcare",
      icon: "fa-hospital",
      description: "Healthcare organizations face unique challenges in securing medical devices, patient data, and maintaining compliance with strict regulations like HIPAA while ensuring easy access for clinical staff.",
      challenges: [
        "Legacy medical devices with limited security capabilities",
        "Protected Health Information (PHI) security requirements",
        "Diverse user roles requiring different access privileges",
        "Need for 24/7 availability with minimal downtime",
        "IoMT (Internet of Medical Things) security"
      ],
      keyRequirements: [
        "Medical device identification and security",
        "PHI data protection and access control",
        "Clinical workflow optimization",
        "Guest network for patients and visitors",
        "Continuous compliance monitoring"
      ],
      benchmarks: {
        breachCost: "$9.8 million avg. per breach",
        implementationTime: "16-24 weeks (traditional) / 2-3 weeks (cloud)",
        fteCost: "$185,000 annually",
        downtimeImpact: "$690,000 per hour"
      },
      recommendations: "Healthcare organizations should prioritize solutions with strong medical device fingerprinting, HIPAA compliance automation, and minimal disruption to clinical workflows. Cloud-native solutions reduce implementation complexity and provide faster value realization.",
      complianceFrameworks: ["HIPAA", "HITECH", "HITRUST", "FDA Medical Device Regulations", "GDPR (for international)"],
      riskFactors: {
        breachProbability: 0.328, // 32.8% annual breach probability
        recordCost: 511,         // $511 per record
        downTimeImpact: 690000   // $690,000 per hour
      },
      cloudAdoption: "62%",      // Current cloud adoption rate
      recommendedVendors: ["portnox", "forescout", "aruba", "cisco"]
    },
    financial: {
      name: "Financial Services",
      icon: "fa-university",
      description: "Financial institutions must balance robust security with operational efficiency while managing complex regulatory requirements and protecting high-value targets from sophisticated threats.",
      challenges: [
        "High-value target for sophisticated threat actors",
        "Complex environment with numerous third-party integrations",
        "Significant regulatory penalties for non-compliance",
        "Legacy banking systems requiring specialized protection",
        "Protection of sensitive financial data"
      ],
      keyRequirements: [
        "Segmentation of cardholder data environments",
        "Multi-factor authentication for privileged access",
        "Detailed audit trails for regulatory examinations",
        "Protection for SWIFT and payment systems",
        "Third-party vendor access control"
      ],
      benchmarks: {
        breachCost: "$6.08 million avg. per breach",
        implementationTime: "12-20 weeks (traditional) / 2-3 weeks (cloud)",
        fteCost: "$210,000 annually",
        downtimeImpact: "$950,000 per hour"
      },
      recommendations: "Financial institutions should evaluate solutions with robust segmentation capabilities, detailed audit logging, and strong third-party access controls. Regulatory compliance requirements often necessitate comprehensive solutions, but cloud-native options can reduce complexity.",
      complianceFrameworks: ["PCI DSS", "SOX", "GLBA", "FFIEC Guidelines", "GDPR", "NYDFS Cybersecurity Regulation"],
      riskFactors: {
        breachProbability: 0.297, // 29.7% annual breach probability
        recordCost: 402,         // $402 per record
        downTimeImpact: 950000   // $950,000 per hour
      },
      cloudAdoption: "58%",      // Current cloud adoption rate
      recommendedVendors: ["cisco", "portnox", "aruba", "fortinac"]
    },
    retail: {
      name: "Retail",
      icon: "fa-shopping-cart",
      description: "Retail organizations balance customer experience with data protection across distributed locations, managing POS systems, guest WiFi, and seasonal staffing fluctuations with limited IT resources.",
      challenges: [
        "Distributed retail locations with limited IT staff",
        "Legacy POS systems requiring specialized protection",
        "Seasonal staffing requiring rapid onboarding/offboarding",
        "Public WiFi networks adjacent to payment systems",
        "High-volume customer data handling"
      ],
      keyRequirements: [
        "PCI DSS compliance for cardholder data protection",
        "Point-of-sale system security",
        "Guest WiFi management with promotional opportunities",
        "Support for seasonal staffing fluctuations",
        "Multi-site management with centralized reporting"
      ],
      benchmarks: {
        breachCost: "$4.24 million avg. per breach",
        implementationTime: "8-16 weeks (traditional) / 1-2 weeks (cloud)",
        fteCost: "$140,000 annually",
        downtimeImpact: "$320,000 per hour"
      },
      recommendations: "Retail organizations should focus on solutions that provide simplified multi-site management, easy guest access capabilities, and strong PCI DSS compliance. Cloud-based solutions are particularly valuable for distributed retail environments with limited IT resources.",
      complianceFrameworks: ["PCI DSS", "CCPA/CPRA", "GDPR"],
      riskFactors: {
        breachProbability: 0.236, // 23.6% annual breach probability
        recordCost: 218,         // $218 per record
        downTimeImpact: 320000   // $320,000 per hour
      },
      cloudAdoption: "70%",      // Current cloud adoption rate
      recommendedVendors: ["portnox", "juniper", "fortinac", "aruba"]
    },
    education: {
      name: "Education",
      icon: "fa-graduation-cap",
      description: "Educational institutions manage diverse user populations and device types with seasonal enrollment fluctuations, limited budgets, and growing security requirements while maintaining an open learning environment.",
      challenges: [
        "Large BYOD environment with limited control over devices",
        "Seasonal network usage patterns with enrollment spikes",
        "Open campus environments requiring segmented access",
        "Limited IT resources and budget constraints",
        "Balancing academic freedom with security requirements"
      ],
      keyRequirements: [
        "Student data protection (FERPA compliance)",
        "Secure BYOD support for students, faculty, and staff",
        "Visitor network management with easy self-registration",
        "Seasonal scaling capabilities for enrollment fluctuations",
        "Research network protection with specialized policies"
      ],
      benchmarks: {
        breachCost: "$3.85 million avg. per breach",
        implementationTime: "10-18 weeks (traditional) / 1-2 weeks (cloud)",
        fteCost: "$150,000 annually",
        downtimeImpact: "$175,000 per hour"
      },
      recommendations: "Educational institutions should prioritize solutions with strong BYOD onboarding capabilities, guest network management, and simplified administration. Cloud-based solutions with minimal hardware requirements help address budget constraints while improving manageability.",
      complianceFrameworks: ["FERPA", "GDPR", "COPPA", "CIPA", "HIPAA (for medical schools)"],
      riskFactors: {
        breachProbability: 0.246, // 24.6% annual breach probability
        recordCost: 187,         // $187 per record
        downTimeImpact: 175000   // $175,000 per hour
      },
      cloudAdoption: "75%",      // Current cloud adoption rate
      recommendedVendors: ["portnox", "securew2", "aruba", "juniper"]
    },
    government: {
      name: "Government",
      icon: "fa-landmark",
      description: "Government agencies manage sensitive information with strict compliance requirements, legacy systems, and complex authentication needs across multiple security domains.",
      challenges: [
        "Advanced persistent threats targeting government systems",
        "Legacy systems with extended lifecycle requirements",
        "Complex multi-level security requirements",
        "Strict regulatory compliance mandates",
        "Budget constraints with long procurement cycles"
      ],
      keyRequirements: [
        "FedRAMP/StateRAMP compliance for cloud deployments",
        "FIPS 140-2 validated cryptography for data protection",
        "PIV/CAC smart card integration for secure authentication",
        "Advanced persistent threat (APT) protection",
        "Detailed audit logging for security investigations"
      ],
      benchmarks: {
        breachCost: "$5.1 million avg. per breach",
        implementationTime: "18-30 weeks (traditional) / 3-6 weeks (cloud)",
        fteCost: "$195,000 annually",
        downtimeImpact: "$220,000 per hour"
      },
      recommendations: "Government organizations should evaluate solutions with strong compliance capabilities, support for PIV/CAC authentication, and comprehensive audit features. While traditional on-premises deployments remain common, cloud solutions with appropriate certifications are gaining acceptance.",
      complianceFrameworks: ["FISMA", "NIST 800-53", "CJIS", "CMMC", "FedRAMP"],
      riskFactors: {
        breachProbability: 0.267, // 26.7% annual breach probability
        recordCost: 272,         // $272 per record
        downTimeImpact: 220000   // $220,000 per hour
      },
      cloudAdoption: "48%",      // Current cloud adoption rate
      recommendedVendors: ["cisco", "portnox", "aruba", "forescout"]
    },
    manufacturing: {
      name: "Manufacturing",
      icon: "fa-industry",
      description: "Manufacturing environments blend IT and OT systems with critical production equipment, industrial IoT devices, and strict uptime requirements requiring specialized security approaches.",
      challenges: [
        "Legacy industrial equipment with minimal security features",
        "Operational technology with 24/7 uptime requirements",
        "Specialized industrial protocols requiring monitoring",
        "Supply chain vulnerabilities from third-party integrations",
        "Physical security integration requirements"
      ],
      keyRequirements: [
        "OT/IT network segmentation with industrial protocol support",
        "Legacy industrial system protection without agent requirements",
        "Production continuity with non-disruptive security",
        "ICS/SCADA system protection with specialized policies",
        "Supply chain security integration"
      ],
      benchmarks: {
        breachCost: "$5.56 million avg. per breach",
        implementationTime: "12-24 weeks (traditional) / 2-4 weeks (cloud)",
        fteCost: "$165,000 annually",
        downtimeImpact: "$570,000 per hour"
      },
      recommendations: "Manufacturing organizations should prioritize solutions with strong OT/IT security capabilities, agentless device discovery, and minimal production disruption. Cloud solutions with local enforcement points can provide the necessary uptime protection while simplifying management.",
      complianceFrameworks: ["IEC 62443", "NIST 800-82", "NERC CIP", "CMMC", "ISO 27001"],
      riskFactors: {
        breachProbability: 0.257, // 25.7% annual breach probability
        recordCost: 241,         // $241 per record
        downTimeImpact: 570000   // $570,000 per hour
      },
      cloudAdoption: "65%",      // Current cloud adoption rate
      recommendedVendors: ["forescout", "portnox", "fortinac", "cisco"]
    }
  },
  
  // Get industry-specific data
  getIndustryData: function(industryId) {
    return this.industries[industryId] || null;
  },
  
  // Generate industry-specific TCO comparison
  getIndustryTcoComparison: function(industryId, deviceCount, years) {
    const industry = this.getIndustryData(industryId);
    if (!industry) return null;
    
    // Get TCO comparison data from VendorData
    const tcoData = window.VendorData.getComparisonData(deviceCount, years);
    
    // Apply industry-specific adjustments
    // This factors in industry-specific requirements that may impact costs
    const adjustedData = {
      ...tcoData,
      initialCosts: [...tcoData.initialCosts],
      operationalCosts: [...tcoData.operationalCosts],
      maintenanceCosts: [...tcoData.maintenanceCosts],
      totalCosts: [...tcoData.totalCosts]
    };
    
    // Apply industry-specific cost factors
    for (let i = 0; i < tcoData.vendors.length; i++) {
      const vendorName = tcoData.vendors[i].toLowerCase();
      let vendorId = '';
      
      // Map vendor name to ID
      if (vendorName.includes('portnox')) vendorId = 'portnox';
      else if (vendorName.includes('cisco')) vendorId = 'cisco';
      else if (vendorName.includes('aruba')) vendorId = 'aruba';
      else if (vendorName.includes('forescout')) vendorId = 'forescout';
      else if (vendorName.includes('fortinac')) vendorId = 'fortinac';
      else if (vendorName.includes('nps')) vendorId = 'nps';
      else if (vendorName.includes('securew2')) vendorId = 'securew2';
      else if (vendorName.includes('juniper')) vendorId = 'juniper';
      else if (vendorName.includes('foxpass')) vendorId = 'foxpass';
      else if (vendorName.includes('arista')) vendorId = 'arista';
      
      // Get vendor's suitability score for this industry (0-10)
      const vendorObj = window.VendorData.vendors.find(v => v.id === vendorId);
      if (!vendorObj) continue;
      
      const suitabilityScore = vendorObj.industrySuitability[industryId] || 7.5;
      
      // Apply adjustment factor based on suitability
      // Higher suitability means lower total cost (better fit = less customization)
      const adjustmentFactor = 1 - ((suitabilityScore - 7.5) * 0.03);
      
      // Apply adjustment to costs
      adjustedData.operationalCosts[i] *= adjustmentFactor;
      adjustedData.maintenanceCosts[i] *= adjustmentFactor;
      
      // Recalculate total costs
      adjustedData.totalCosts[i] = adjustedData.initialCosts[i] + 
                                  adjustedData.operationalCosts[i] + 
                                  adjustedData.maintenanceCosts[i];
    }
    
    return adjustedData;
  },
  
  // Get industry-specific compliance data
  getIndustryComplianceData: function(industryId) {
    const industry = this.getIndustryData(industryId);
    if (!industry) return null;
    
    // Get compliance frameworks for this industry
    const frameworks = industry.complianceFrameworks;
    
    // Get vendor compliance scores for these frameworks
    const vendorData = [];
    
    window.VendorData.vendors.forEach(vendor => {
      const compliance = [];
      
      frameworks.forEach(framework => {
        // Convert framework name to ID (lowercase, no spaces)
        const frameworkId = framework.toLowerCase()
                                    .replace(/[\s-]/g, '')
                                    .replace('/', '')
                                    .replace('(', '')
                                    .replace(')', '');
        
        // Get compliance score for this vendor and framework
        let score = 0;
        
        // Map framework name to compliance property
        const complianceMap = {
          'hipaa': 'hipaa',
          'hitech': 'hipaa', // Map HITECH to HIPAA
          'hitrust': 'hitrust',
          'fdamedicaldeviceregulations': 'hipaa', // Map FDA to HIPAA
          'gdpr': 'gdpr',
          'pcidss': 'pciDss',
          'sox': 'sox',
          'glba': 'glba',
          'ffiecguidelines': 'glba', // Map FFIEC to GLBA
          'nydfscybersecurityregulation': 'glba', // Map NYDFS to GLBA
          'ccpacpra': 'ccpa',
          'ferpa': 'ferpa',
          'coppa': 'ferpa', // Map COPPA to FERPA
          'cipa': 'ferpa', // Map CIPA to FERPA
          'fisma': 'fisma',
          'nist80053': 'fisma', // Map NIST 800-53 to FISMA
          'cjis': 'fisma', // Map CJIS to FISMA
          'cmmc': 'cmmc',
          'fedramp': 'fisma', // Map FedRAMP to FISMA
          'iec62443': 'nercCip', // Map IEC 62443 to NERC CIP
          'nist80082': 'nist800171', // Map NIST 800-82 to NIST 800-171
          'nerccip': 'nercCip',
          'iso27001': 'iso27001'
        };
        
        // Get compliance property
        const complianceProp = complianceMap[frameworkId] || frameworkId;
        
        // Map compliance level to score
        if (vendor.complianceSupport[complianceProp] === 'full') {
          score = 95;
        } else if (vendor.complianceSupport[complianceProp] === 'partial') {
          score = 70;
        } else {
          score = 40;
        }
        
        compliance.push(score);
      });
      
      vendorData.push({
        name: vendor.name,
        color: vendor.color,
        compliance: compliance
      });
    });
    
    return {
      industryName: industry.name,
      frameworks: frameworks,
      vendors: vendorData
    };
  },
  
  // Get risk analysis data for an industry
  getIndustryRiskAnalysis: function(industryId) {
    const industry = this.getIndustryData(industryId);
    if (!industry) return null;
    
    // Risk categories
    const categories = [
      "Unauthorized Access",
      "Data Breaches",
      "Compliance Violations",
      "Operational Disruption",
      "Lateral Movement"
    ];
    
    // Get vendor risk reduction capabilities
    const vendorData = [];
    
    window.VendorData.vendors.forEach(vendor => {
      // Calculate risk reduction scores based on feature scores and suitability
      const suitabilityScore = vendor.industrySuitability[industryId] || 7.0;
      
      // Calculate risk reduction scores for each category
      // Formula combines feature scores and industry suitability
      const unauthorizedAccess = Math.round((vendor.featureScores.policyManagement * 0.4 + 
                               vendor.featureScores.deviceVisibility * 0.3 + 
                               vendor.featureScores.byodSupport * 0.3) * 
                               (suitabilityScore / 8.5) * 10);
      
      const dataBreaches = Math.round((vendor.featureScores.policyManagement * 0.3 + 
                         vendor.featureScores.cloudIntegration * 0.3 + 
                         vendor.featureScores.thirdPartyIntegration * 0.4) * 
                         (suitabilityScore / 8.5) * 10);
      
      const complianceViolations = Math.round((vendor.featureScores.reporting * 0.4 + 
                                vendor.featureScores.policyManagement * 0.3 + 
                                vendor.featureScores.deviceVisibility * 0.3) * 
                                (suitabilityScore / 8.5) * 10);
      
      const operationalDisruption = Math.round((vendor.featureScores.automatedRemediation * 0.4 + 
                                  vendor.featureScores.easeOfUse * 0.3 + 
                                  vendor.featureScores.scalability * 0.3) * 
                                  (suitabilityScore / 8.5) * 10);
      
      const lateralMovement = Math.round((vendor.featureScores.policyManagement * 0.4 + 
                            vendor.featureScores.automatedRemediation * 0.3 + 
                            vendor.featureScores.deviceVisibility * 0.3) * 
                            (suitabilityScore / 8.5) * 10);
      
      vendorData.push({
        name: vendor.name,
        color: vendor.color,
        reductions: [
          Math.min(unauthorizedAccess, 95), // Cap at 95%
          Math.min(dataBreaches, 95),
          Math.min(complianceViolations, 95),
          Math.min(operationalDisruption, 95),
          Math.min(lateralMovement, 95)
        ]
      });
    });
    
    return {
      industryName: industry.name,
      categories: categories,
      vendors: vendorData
    };
  }
};
