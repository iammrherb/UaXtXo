// Comprehensive Industry Database with All Verticals
window.IndustryDatabase = {
    // HEALTHCARE
    healthcare: {
        id: 'healthcare',
        name: 'Healthcare',
        icon: 'fa-hospital',
        description: 'Hospitals, clinics, medical practices, and healthcare providers',
        
        characteristics: {
            avgDevices: 3500,
            avgUsers: 2500,
            deviceGrowth: 15, // % annual
            mobilityLevel: 'Very High',
            iotDevices: 35, // % of total
            criticalSystems: 85 // % critical
        },
        
        regulations: {
            primary: ['HIPAA', 'HITECH', 'FDA 21 CFR Part 11'],
            secondary: ['HITRUST CSF', 'Meaningful Use', 'GDPR', 'State Privacy Laws'],
            emerging: ['IoMT Security', 'Telehealth Compliance', 'AI/ML in Healthcare']
        },
        
        compliance: {
            auditFrequency: 'Annual',
            penaltyRange: { min: 100, max: 50000000 },
            breachNotification: 60, // days
            dataRetention: 6, // years
            encryptionRequired: true,
            accessControlLevel: 'Strict'
        },
        
        risks: {
            breachCost: 10930000, // Average healthcare breach
            breachProbability: 0.28, // Highest among industries
            ransomwareTarget: 0.35,
            insiderThreat: 0.58,
            downtimeCostHour: 45000,
            reputationImpact: 'Severe'
        },
        
        nacRequirements: {
            patientDataProtection: 'Critical',
            medicalDeviceVisibility: 'Critical',
            guestNetworkIsolation: 'High',
            byodManagement: 'High',
            iotSecurity: 'Critical',
            vendorAccess: 'High',
            emergencyAccess: 'Critical',
            complianceReporting: 'Critical'
        }
    },
    
    // FINANCIAL SERVICES
    finance: {
        id: 'finance',
        name: 'Financial Services',
        icon: 'fa-university',
        description: 'Banks, insurance, investment firms, and fintech',
        
        characteristics: {
            avgDevices: 5000,
            avgUsers: 4000,
            deviceGrowth: 12,
            mobilityLevel: 'High',
            iotDevices: 15,
            criticalSystems: 95
        },
        
        regulations: {
            primary: ['PCI DSS', 'SOX', 'GLBA', 'FINRA', 'SEC'],
            secondary: ['FFIEC', 'Basel III', 'Dodd-Frank', 'GDPR', 'CCPA'],
            emerging: ['Open Banking', 'Cryptocurrency', 'Digital Identity']
        },
        
        compliance: {
            auditFrequency: 'Quarterly',
            penaltyRange: { min: 1000, max: 100000000 },
            breachNotification: 30,
            dataRetention: 7,
            encryptionRequired: true,
            accessControlLevel: 'Very Strict'
        },
        
        risks: {
            breachCost: 5970000,
            breachProbability: 0.19,
            ransomwareTarget: 0.22,
            insiderThreat: 0.45,
            downtimeCostHour: 75000,
            reputationImpact: 'Severe'
        },
        
        nacRequirements: {
            transactionSecurity: 'Critical',
            privilegedAccessManagement: 'Critical',
            vendorRiskManagement: 'Critical',
            dataClassification: 'Critical',
            anomalyDetection: 'Critical',
            auditTrail: 'Critical',
            realTimeMonitoring: 'Critical',
            zeroTrust: 'Critical'
        }
    },
    
    // GOVERNMENT
    government: {
        id: 'government',
        name: 'Government',
        icon: 'fa-landmark',
        description: 'Federal, state, and local government agencies',
        
        characteristics: {
            avgDevices: 10000,
            avgUsers: 8000,
            deviceGrowth: 8,
            mobilityLevel: 'Medium',
            iotDevices: 20,
            criticalSystems: 90
        },
        
        regulations: {
            primary: ['NIST 800-53', 'FedRAMP', 'FISMA', 'CMMC', 'FIPS 140-2'],
            secondary: ['CJIS', 'IRS 1075', 'StateRAMP', 'ITAR', 'EAR'],
            emerging: ['Zero Trust Mandate', 'Supply Chain', 'Quantum-Safe Crypto']
        },
        
        compliance: {
            auditFrequency: 'Continuous',
            penaltyRange: { min: 5000, max: 'Criminal' },
            breachNotification: 7,
            dataRetention: 10,
            encryptionRequired: true,
            accessControlLevel: 'Maximum'
        },
        
        risks: {
            breachCost: 8760000,
            breachProbability: 0.16,
            ransomwareTarget: 0.42,
            insiderThreat: 0.35,
            downtimeCostHour: 100000,
            reputationImpact: 'National Security'
        },
        
        nacRequirements: {
            clearanceLevelAccess: 'Critical',
            airGapCapability: 'High',
            supplyChainSecurity: 'Critical',
            continuousMonitoring: 'Critical',
            incidentResponse: 'Critical',
            dataClassification: 'Critical',
            crossDomainSolution: 'High',
            quantumReadiness: 'Emerging'
        }
    },
    
    // EDUCATION
    education: {
        id: 'education',
        name: 'Education',
        icon: 'fa-graduation-cap',
        description: 'K-12 schools, universities, and educational institutions',
        
        characteristics: {
            avgDevices: 8000,
            avgUsers: 10000,
            deviceGrowth: 20,
            mobilityLevel: 'Very High',
            iotDevices: 30,
            criticalSystems: 60
        },
        
        regulations: {
            primary: ['FERPA', 'COPPA', 'CIPA'],
            secondary: ['State Privacy Laws', 'Title IX', 'ADA Compliance'],
            emerging: ['Student Privacy', 'EdTech Regulations', 'AI in Education']
        },
        
        compliance: {
            auditFrequency: 'Annual',
            penaltyRange: { min: 100, max: 5000000 },
            breachNotification: 60,
            dataRetention: 5,
            encryptionRequired: true,
            accessControlLevel: 'Moderate'
        },
        
        risks: {
            breachCost: 3860000,
            breachProbability: 0.22,
            ransomwareTarget: 0.45,
            insiderThreat: 0.25,
            downtimeCostHour: 15000,
            reputationImpact: 'High'
        },
        
        nacRequirements: {
            studentDataProtection: 'Critical',
            byodPrograms: 'Critical',
            guestAccess: 'Critical',
            contentFiltering: 'High',
            remotelearning: 'Critical',
            iotManagement: 'High',
            costEfficiency: 'Critical',
            easyManagement: 'Critical'
        }
    },
    
    // RETAIL
    retail: {
        id: 'retail',
        name: 'Retail',
        icon: 'fa-shopping-cart',
        description: 'Retail stores, e-commerce, and hospitality',
        
        characteristics: {
            avgDevices: 3000,
            avgUsers: 2000,
            deviceGrowth: 25,
            mobilityLevel: 'High',
            iotDevices: 40,
            criticalSystems: 70
        },
        
        regulations: {
            primary: ['PCI DSS', 'CCPA', 'GDPR'],
            secondary: ['State Privacy Laws', 'FTC Regulations', 'ADA'],
            emerging: ['Biometric Privacy', 'AI/ML Regulations', 'Sustainability']
        },
        
        compliance: {
            auditFrequency: 'Annual',
            penaltyRange: { min: 1000, max: 20000000 },
            breachNotification: 30,
            dataRetention: 3,
            encryptionRequired: true,
            accessControlLevel: 'Moderate'
        },
        
        risks: {
            breachCost: 3620000,
            breachProbability: 0.20,
            ransomwareTarget: 0.28,
            insiderThreat: 0.40,
            downtimeCostHour: 35000,
            reputationImpact: 'High'
        },
        
        nacRequirements: {
            posSystemSecurity: 'Critical',
            guestWiFi: 'Critical',
            inventorySystemAccess: 'High',
            vendorAccess: 'High',
            iotDevices: 'Critical',
            mobilePayments: 'Critical',
            customerDataProtection: 'Critical',
            multiSiteManagement: 'High'
        }
    },
    
    // MANUFACTURING
    manufacturing: {
        id: 'manufacturing',
        name: 'Manufacturing',
        icon: 'fa-industry',
        description: 'Industrial manufacturing, automotive, and production',
        
        characteristics: {
            avgDevices: 5000,
            avgUsers: 3000,
            deviceGrowth: 18,
            mobilityLevel: 'Medium',
            iotDevices: 45,
            criticalSystems: 80
        },
        
        regulations: {
            primary: ['ISO 27001', 'NIST CSF', 'TISAX', 'IEC 62443'],
            secondary: ['Industry 4.0', 'Supply Chain Security', 'Environmental'],
            emerging: ['Digital Twin Security', 'AI/Robotics', 'Sustainability']
        },
        
        compliance: {
            auditFrequency: 'Annual',
            penaltyRange: { min: 5000, max: 25000000 },
            breachNotification: 72,
            dataRetention: 5,
            encryptionRequired: true,
            accessControlLevel: 'High'
        },
        
        risks: {
            breachCost: 4470000,
            breachProbability: 0.18,
            ransomwareTarget: 0.38,
            insiderThreat: 0.30,
            downtimeCostHour: 50000,
            reputationImpact: 'High'
        },
        
        nacRequirements: {
            otSecurity: 'Critical',
            scadaSystems: 'Critical',
            supplyChainAccess: 'Critical',
            ipProtection: 'Critical',
            remoteVendorAccess: 'High',
            productionContinuity: 'Critical',
            qualitySystemAccess: 'High',
            segmentation: 'Critical'
        }
    },
    
    // ENERGY & UTILITIES
    energy: {
        id: 'energy',
        name: 'Energy & Utilities',
        icon: 'fa-bolt',
        description: 'Power generation, oil & gas, water utilities',
        
        characteristics: {
            avgDevices: 7500,
            avgUsers: 5000,
            deviceGrowth: 15,
            mobilityLevel: 'Low',
            iotDevices: 55,
            criticalSystems: 95
        },
        
        regulations: {
            primary: ['NERC CIP', 'TSA Pipeline', 'IEC 62443', 'ISO 27001'],
            secondary: ['FERC', 'DOE', 'EPA', 'State PUC'],
            emerging: ['Grid Modernization', 'Renewable Integration', 'Cyber-Physical']
        },
        
        compliance: {
            auditFrequency: 'Continuous',
            penaltyRange: { min: 10000, max: 1000000 },
            breachNotification: 24,
            dataRetention: 7,
            encryptionRequired: true,
            accessControlLevel: 'Maximum'
        },
        
        risks: {
            breachCost: 4830000,
            breachProbability: 0.17,
            ransomwareTarget: 0.48,
            insiderThreat: 0.32,
            downtimeCostHour: 150000,
            reputationImpact: 'Critical Infrastructure'
        },
        
        nacRequirements: {
            criticalInfraProtection: 'Critical',
            scadaSecurity: 'Critical',
            remoteSubstations: 'Critical',
            vendorAccess: 'Critical',
            physicalSecurity: 'Critical',
            incidentResponse: 'Critical',
            redundancy: 'Critical',
            airgapCapability: 'High'
        }
    },
    
    // TECHNOLOGY
    technology: {
        id: 'technology',
        name: 'Technology',
        icon: 'fa-microchip',
        description: 'Software, SaaS, IT services, and tech companies',
        
        characteristics: {
            avgDevices: 2500,
            avgUsers: 1500,
            deviceGrowth: 30,
            mobilityLevel: 'Very High',
            iotDevices: 25,
            criticalSystems: 85
        },
        
        regulations: {
            primary: ['SOC 2', 'ISO 27001', 'GDPR', 'CCPA'],
            secondary: ['HIPAA (for health tech)', 'PCI DSS', 'Privacy Shield'],
            emerging: ['AI Ethics', 'Data Sovereignty', 'Quantum Security']
        },
        
        compliance: {
            auditFrequency: 'Annual',
            penaltyRange: { min: 1000, max: 20000000 },
            breachNotification: 72,
            dataRetention: 3,
            encryptionRequired: true,
            accessControlLevel: 'High'
        },
        
        risks: {
            breachCost: 4880000,
            breachProbability: 0.15,
            ransomwareTarget: 0.25,
            insiderThreat: 0.38,
            downtimeCostHour: 40000,
            reputationImpact: 'Very High'
        },
        
        nacRequirements: {
            developmentEnvironment: 'Critical',
            cloudAccess: 'Critical',
            byod: 'Critical',
            contractorAccess: 'Critical',
            apiSecurity: 'Critical',
            cicdPipeline: 'High',
            remoteWork: 'Critical',
            zeroTrust: 'Critical'
        }
    },
    
    // TRANSPORTATION & LOGISTICS
    transportation: {
        id: 'transportation',
        name: 'Transportation & Logistics',
        icon: 'fa-truck',
        description: 'Airlines, shipping, trucking, rail, and logistics',
        
        characteristics: {
            avgDevices: 4500,
            avgUsers: 3500,
            deviceGrowth: 22,
            mobilityLevel: 'Very High',
            iotDevices: 50,
            criticalSystems: 85
        },
        
        regulations: {
            primary: ['TSA', 'DOT', 'FAA', 'Maritime Security'],
            secondary: ['Customs', 'International Trade', 'Environmental'],
            emerging: ['Autonomous Vehicles', 'Drone Delivery', 'Supply Chain']
        },
        
        compliance: {
            auditFrequency: 'Annual',
            penaltyRange: { min: 5000, max: 50000000 },
            breachNotification: 24,
            dataRetention: 5,
            encryptionRequired: true,
            accessControlLevel: 'High'
        },
        
        risks: {
            breachCost: 4030000,
            breachProbability: 0.19,
            ransomwareTarget: 0.35,
            insiderThreat: 0.28,
            downtimeCostHour: 65000,
            reputationImpact: 'High'
        },
        
        nacRequirements: {
            fleetManagement: 'Critical',
            mobileWorkforce: 'Critical',
            warehouseSystems: 'Critical',
            customerDataProtection: 'High',
            partnerIntegration: 'Critical',
            realTimeTracking: 'Critical',
            crossBorderCompliance: 'High',
            iotSensors: 'Critical'
        }
    },
    
    // TELECOMMUNICATIONS
    telecommunications: {
        id: 'telecommunications',
        name: 'Telecommunications',
        icon: 'fa-signal',
        description: 'Telecom providers, ISPs, and communications',
        
        characteristics: {
            avgDevices: 15000,
            avgUsers: 8000,
            deviceGrowth: 25,
            mobilityLevel: 'High',
            iotDevices: 35,
            criticalSystems: 95
        },
        
        regulations: {
            primary: ['FCC', 'CPNI', 'CALEA', 'Privacy Laws'],
            secondary: ['State PUC', 'International', 'Net Neutrality'],
            emerging: ['5G Security', 'IoT Regulations', 'Data Localization']
        },
        
        compliance: {
            auditFrequency: 'Quarterly',
            penaltyRange: { min: 10000, max: 100000000 },
            breachNotification: 30,
            dataRetention: 2,
            encryptionRequired: true,
            accessControlLevel: 'Very High'
        },
        
        risks: {
            breachCost: 3790000,
            breachProbability: 0.17,
            ransomwareTarget: 0.30,
            insiderThreat: 0.35,
            downtimeCostHour: 85000,
            reputationImpact: 'Very High'
        },
        
        nacRequirements: {
            networkInfraProtection: 'Critical',
            customerDataPrivacy: 'Critical',
            lawfulIntercept: 'Required',
            vendorAccess: 'Critical',
            networkSegmentation: 'Critical',
            dos_ddosProtection: 'Critical',
            regulatoryCompliance: 'Critical',
            scale: 'Massive'
        }
    },
    
    // HOSPITALITY
    hospitality: {
        id: 'hospitality',
        name: 'Hospitality',
        icon: 'fa-bed',
        description: 'Hotels, resorts, restaurants, and entertainment',
        
        characteristics: {
            avgDevices: 2500,
            avgUsers: 1500,
            deviceGrowth: 20,
            mobilityLevel: 'Very High',
            iotDevices: 35,
            criticalSystems: 65
        },
        
        regulations: {
            primary: ['PCI DSS', 'GDPR', 'CCPA', 'ADA'],
            secondary: ['Health Codes', 'Liquor Laws', 'Gaming Regulations'],
            emerging: ['Contactless', 'Health Passports', 'Sustainability']
        },
        
        compliance: {
            auditFrequency: 'Annual',
            penaltyRange: { min: 1000, max: 10000000 },
            breachNotification: 60,
            dataRetention: 2,
            encryptionRequired: true,
            accessControlLevel: 'Moderate'
        },
        
        risks: {
            breachCost: 2940000,
            breachProbability: 0.23,
            ransomwareTarget: 0.32,
            insiderThreat: 0.42,
            downtimeCostHour: 25000,
            reputationImpact: 'High'
        },
        
        nacRequirements: {
            guestWiFi: 'Critical',
            staffAccess: 'Critical',
            posSystemSecurity: 'Critical',
            propertyManagement: 'Critical',
            iotRoomControls: 'High',
            vendorAccess: 'High',
            multiPropertyManagement: 'High',
            brandStandards: 'High'
        }
    },
    
    // MEDIA & ENTERTAINMENT
    media: {
        id: 'media',
        name: 'Media & Entertainment',
        icon: 'fa-film',
        description: 'Broadcasting, streaming, gaming, and content creation',
        
        characteristics: {
            avgDevices: 3500,
            avgUsers: 2500,
            deviceGrowth: 28,
            mobilityLevel: 'High',
            iotDevices: 30,
            criticalSystems: 75
        },
        
        regulations: {
            primary: ['COPPA', 'DMCA', 'FCC', 'GDPR'],
            secondary: ['Content Ratings', 'Advertising Standards', 'Royalties'],
            emerging: ['Streaming Rights', 'AI Content', 'Virtual Worlds']
        },
        
        compliance: {
            auditFrequency: 'Annual',
            penaltyRange: { min: 5000, max: 50000000 },
            breachNotification: 72,
            dataRetention: 3,
            encryptionRequired: true,
            accessControlLevel: 'High'
        },
        
        risks: {
            breachCost: 5040000,
            breachProbability: 0.16,
            ransomwareTarget: 0.28,
            insiderThreat: 0.45,
            downtimeCostHour: 45000,
            reputationImpact: 'Very High'
        },
        
        nacRequirements: {
            contentProtection: 'Critical',
            studioAccess: 'Critical',
            remoteProduction: 'Critical',
            vendorCollaboration: 'Critical',
            distributionSecurity: 'Critical',
            digitalRightsManagement: 'Critical',
            talentDeviceAccess: 'High',
            audienceDataProtection: 'High'
        }
    },
    
    // REAL ESTATE
    realestate: {
        id: 'realestate',
        name: 'Real Estate',
        icon: 'fa-building',
        description: 'Property management, REITs, and development',
        
        characteristics: {
            avgDevices: 1500,
            avgUsers: 1000,
            deviceGrowth: 15,
            mobilityLevel: 'High',
            iotDevices: 40,
            criticalSystems: 60
        },
        
        regulations: {
            primary: ['Fair Housing', 'CCPA', 'GDPR', 'Financial Regulations'],
            secondary: ['State Real Estate Laws', 'Environmental', 'Zoning'],
            emerging: ['Smart Buildings', 'PropTech', 'Virtual Tours']
        },
        
        compliance: {
            auditFrequency: 'Annual',
            penaltyRange: { min: 1000, max: 5000000 },
            breachNotification: 60,
            dataRetention: 7,
            encryptionRequired: true,
            accessControlLevel: 'Moderate'
        },
        
        risks: {
            breachCost: 2450000,
            breachProbability: 0.14,
            ransomwareTarget: 0.22,
            insiderThreat: 0.35,
            downtimeCostHour: 15000,
            reputationImpact: 'Moderate'
        },
        
        nacRequirements: {
            tenantDataProtection: 'Critical',
            buildingSystemAccess: 'Critical',
            vendorAccess: 'High',
            smartBuildingIot: 'High',
            propertyManagement: 'High',
            mobileWorkforce: 'High',
            physicalAccessIntegration: 'High',
            multiSiteManagement: 'Critical'
        }
    },
    
    // NON-PROFIT
    nonprofit: {
        id: 'nonprofit',
        name: 'Non-Profit',
        icon: 'fa-hands-helping',
        description: 'Charitable organizations, NGOs, and foundations',
        
        characteristics: {
            avgDevices: 500,
            avgUsers: 750,
            deviceGrowth: 10,
            mobilityLevel: 'Medium',
            iotDevices: 15,
            criticalSystems: 50
        },
        
        regulations: {
            primary: ['IRS 501(c)', 'State Charity Laws', 'GDPR', 'CCPA'],
            secondary: ['Grant Compliance', 'Donor Privacy', 'Financial Transparency'],
            emerging: ['Digital Fundraising', 'Volunteer Management', 'Impact Measurement']
        },
        
        compliance: {
            auditFrequency: 'Annual',
            penaltyRange: { min: 500, max: 1000000 },
            breachNotification: 60,
            dataRetention: 7,
            encryptionRequired: true,
            accessControlLevel: 'Moderate'
        },
        
        risks: {
            breachCost: 1830000,
            breachProbability: 0.18,
            ransomwareTarget: 0.35,
            insiderThreat: 0.25,
            downtimeCostHour: 5000,
            reputationImpact: 'Very High'
        },
        
        nacRequirements: {
            donorDataProtection: 'Critical',
            volunteerAccess: 'High',
            costEffectiveness: 'Critical',
            easeOfUse: 'Critical',
            remoteWork: 'High',
            grantCompliance: 'High',
            minimalItStaff: 'Critical',
            cloudBased: 'Critical'
        }
    },
    
    // AGRICULTURE
    agriculture: {
        id: 'agriculture',
        name: 'Agriculture',
        icon: 'fa-seedling',
        description: 'Farming, ranching, and agricultural technology',
        
        characteristics: {
            avgDevices: 1200,
            avgUsers: 500,
            deviceGrowth: 35,
            mobilityLevel: 'High',
            iotDevices: 60,
            criticalSystems: 70
        },
        
        regulations: {
            primary: ['USDA', 'FDA Food Safety', 'EPA', 'State Agriculture'],
            secondary: ['Organic Certification', 'Water Rights', 'Land Use'],
            emerging: ['Precision Ag', 'Drone Regulations', 'Gene Editing']
        },
        
        compliance: {
            auditFrequency: 'Seasonal',
            penaltyRange: { min: 1000, max: 5000000 },
            breachNotification: 72,
            dataRetention: 5,
            encryptionRequired: false,
            accessControlLevel: 'Basic'
        },
        
        risks: {
            breachCost: 1620000,
            breachProbability: 0.12,
            ransomwareTarget: 0.25,
            insiderThreat: 0.20,
            downtimeCostHour: 10000,
            reputationImpact: 'Moderate'
        },
        
        nacRequirements: {
            fieldDeviceConnectivity: 'Critical',
            iotSensorManagement: 'Critical',
            remoteMonitoring: 'Critical',
            supplyChainIntegration: 'High',
            weatherDataAccess: 'High',
            equipmentConnectivity: 'Critical',
            ruralConnectivity: 'Critical',
            costSensitive: 'Critical'
        }
    }
};

// Industry analysis methods
window.IndustryDatabase.analyzeIndustry = function(industryId, config) {
    const industry = this[industryId];
    if (!industry) return null;
    
    return {
        complianceRequirements: this.getComplianceRequirements(industry),
        riskProfile: this.calculateRiskProfile(industry, config),
        nacPriorities: this.getNACPriorities(industry),
        vendorSuitability: this.assessVendorSuitability(industry, config)
    };
};

window.IndustryDatabase.getComplianceRequirements = function(industry) {
    const requirements = [];
    
    // Primary regulations
    industry.regulations.primary.forEach(reg => {
        requirements.push({
            name: reg,
            priority: 'Critical',
            features: this.getRegulationFeatures(reg)
        });
    });
    
    // Secondary regulations
    industry.regulations.secondary.forEach(reg => {
        requirements.push({
            name: reg,
            priority: 'High',
            features: this.getRegulationFeatures(reg)
        });
    });
    
    return requirements;
};

window.IndustryDatabase.getRegulationFeatures = function(regulation) {
    const featureMap = {
        'HIPAA': ['Encryption', 'Access Control', 'Audit Logging', 'Risk Assessment', 'Breach Notification'],
        'PCI DSS': ['Network Segmentation', 'Access Control', 'Encryption', 'Monitoring', 'Vulnerability Management'],
        'GDPR': ['Data Mapping', 'Consent Management', 'Right to Delete', 'Privacy by Design', 'DPO'],
        'SOC 2': ['Security Controls', 'Availability', 'Confidentiality', 'Privacy', 'Processing Integrity'],
        'NIST 800-53': ['Access Control', 'Audit', 'Configuration Management', 'Incident Response', 'Risk Assessment'],
        'FedRAMP': ['Continuous Monitoring', 'Vulnerability Scanning', 'Security Controls', 'POA&M', 'Authorization'],
        'CMMC': ['Access Control', 'Incident Response', 'Media Protection', 'Recovery', 'Risk Management'],
        'NERC CIP': ['Critical Asset ID', 'Security Management', 'Personnel & Training', 'Electronic Security', 'Physical Security']
    };
    
    return featureMap[regulation] || ['Compliance Controls Required'];
};

window.IndustryDatabase.calculateRiskProfile = function(industry, config) {
    const devices = config.devices || industry.characteristics.avgDevices;
    const breachCost = industry.risks.breachCost;
    const breachProb = industry.risks.breachProbability;
    
    return {
        annualRiskExposure: breachCost * breachProb,
        ransomwareRisk: industry.risks.ransomwareTarget,
        insiderThreatRisk: industry.risks.insiderThreat,
        downtimeImpact: industry.risks.downtimeCostHour * 24 * 3, // 3-day outage
        overallRiskScore: Math.round(
            (breachProb * 40) + 
            (industry.risks.ransomwareTarget * 30) + 
            (industry.risks.insiderThreat * 20) + 
            (industry.characteristics.criticalSystems / 100 * 10)
        )
    };
};

window.IndustryDatabase.getNACPriorities = function(industry) {
    const priorities = [];
    
    Object.entries(industry.nacRequirements).forEach(([feature, priority]) => {
        priorities.push({
            feature,
            priority,
            score: priority === 'Critical' ? 10 : priority === 'High' ? 7 : 5
        });
    });
    
    return priorities.sort((a, b) => b.score - a.score);
};

window.IndustryDatabase.assessVendorSuitability = function(industry, config) {
    const priorities = this.getNACPriorities(industry);
    const vendors = config.vendors || ['portnox', 'cisco', 'aruba'];
    
    const assessments = {};
    
    vendors.forEach(vendorId => {
        let score = 0;
        let matches = [];
        
        priorities.forEach(priority => {
            const vendorScore = this.getVendorFeatureScore(vendorId, priority.feature);
            score += vendorScore * priority.score;
            
            if (vendorScore >= 0.8) {
                matches.push(priority.feature);
            }
        });
        
        assessments[vendorId] = {
            score: Math.round(score / priorities.length),
            matches,
            recommendation: score > 80 ? 'Highly Recommended' : 
                          score > 60 ? 'Recommended' : 
                          score > 40 ? 'Adequate' : 'Not Recommended'
        };
    });
    
    return assessments;
};

window.IndustryDatabase.getVendorFeatureScore = function(vendorId, feature) {
    // Simplified scoring - in real implementation would check vendor capabilities
    const scores = {
        portnox: 0.95, // Excellent for most features
        cisco: 0.70,   // Good but complex
        aruba: 0.65,   // Good for specific use cases
        forescout: 0.60,
        others: 0.50
    };
    
    return scores[vendorId] || scores.others;
};

console.log('[IndustryDatabase] Loaded ' + Object.keys(window.IndustryDatabase).filter(k => typeof window.IndustryDatabase[k] === 'object').length + ' industries');
