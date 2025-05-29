/**
 * Vendor Data Initialization
 */
console.log("🚀 Initializing vendor data...");

// Define vendor pricing data
window.vendorPricingData = {
    portnox: {
        name: "Portnox CLEAR",
        type: "cloud",
        perDeviceMonthly: 3.50,
        implementation: 15000,
        annualSupport: 0,
        fteRequired: 0.25,
        deploymentDays: 21
    },
    cisco: {
        name: "Cisco ISE",
        type: "on-premise",
        perDeviceMonthly: 8.50,
        implementation: 85000,
        annualSupport: 18000,
        fteRequired: 2.0,
        deploymentDays: 90,
        hardwareCost: 125000
    },
    aruba: {
        name: "Aruba ClearPass",
        type: "hybrid",
        perDeviceMonthly: 7.25,
        implementation: 65000,
        annualSupport: 15000,
        fteRequired: 1.5,
        deploymentDays: 75,
        hardwareCost: 95000
    },
    forescout: {
        name: "Forescout",
        type: "on-premise",
        perDeviceMonthly: 6.75,
        implementation: 55000,
        annualSupport: 12000,
        fteRequired: 1.25,
        deploymentDays: 60,
        hardwareCost: 85000
    },
    fortinet: {
        name: "FortiNAC",
        type: "on-premise",
        perDeviceMonthly: 5.50,
        implementation: 45000,
        annualSupport: 10000,
        fteRequired: 1.0,
        deploymentDays: 45,
        hardwareCost: 75000
    },
    microsoft: {
        name: "Microsoft NPS/Intune",
        type: "cloud",
        perDeviceMonthly: 4.50,
        implementation: 35000,
        annualSupport: 8000,
        fteRequired: 1.0,
        deploymentDays: 30
    },
    juniper: {
        name: "Juniper Mist Access Assurance",
        type: "cloud",
        perDeviceMonthly: 5.25,
        implementation: 40000,
        annualSupport: 0,
        fteRequired: 0.75,
        deploymentDays: 35
    },
    arista: {
        name: "Arista CloudVision",
        type: "cloud",
        perDeviceMonthly: 4.75,
        implementation: 38000,
        annualSupport: 0,
        fteRequired: 0.75,
        deploymentDays: 30
    },
    extreme: {
        name: "ExtremeCloud IQ",
        type: "cloud",
        perDeviceMonthly: 4.25,
        implementation: 32000,
        annualSupport: 0,
        fteRequired: 0.5,
        deploymentDays: 28
    },
    foxpass: {
        name: "Foxpass",
        type: "cloud",
        perDeviceMonthly: 2.50,
        implementation: 10000,
        annualSupport: 0,
        fteRequired: 0.25,
        deploymentDays: 14
    },
    securew2: {
        name: "SecureW2",
        type: "cloud",
        perDeviceMonthly: 3.00,
        implementation: 15000,
        annualSupport: 0,
        fteRequired: 0.25,
        deploymentDays: 14
    },
    packetfence: {
        name: "PacketFence",
        type: "open-source",
        perDeviceMonthly: 0,
        implementation: 25000,
        annualSupport: 20000,
        fteRequired: 2.0,
        deploymentDays: 60,
        hardwareCost: 50000
    },
    radiussaas: {
        name: "RADIUS-as-a-Service",
        type: "cloud",
        perDeviceMonthly: 2.25,
        implementation: 8000,
        annualSupport: 0,
        fteRequired: 0.25,
        deploymentDays: 7
    },
    pulse: {
        name: "Pulse Policy Secure",
        type: "hybrid",
        perDeviceMonthly: 5.75,
        implementation: 48000,
        annualSupport: 11000,
        fteRequired: 1.25,
        deploymentDays: 45,
        hardwareCost: 65000
    }
};

// Define vendor capabilities
window.vendorCapabilities = {
    portnox: {
        cloudNative: 100,
        zeroTrust: 95,
        automation: 90,
        aiMl: 85,
        compliance: 92,
        userExperience: 95,
        support: 95,
        innovation: 90,
        scalability: 100,
        integration: 90
    },
    cisco: {
        cloudNative: 40,
        zeroTrust: 85,
        automation: 75,
        aiMl: 70,
        compliance: 95,
        userExperience: 65,
        support: 80,
        innovation: 70,
        scalability: 75,
        integration: 90
    },
    aruba: {
        cloudNative: 60,
        zeroTrust: 80,
        automation: 70,
        aiMl: 65,
        compliance: 90,
        userExperience: 70,
        support: 75,
        innovation: 75,
        scalability: 80,
        integration: 85
    },
    forescout: {
        cloudNative: 50,
        zeroTrust: 85,
        automation: 80,
        aiMl: 75,
        compliance: 85,
        userExperience: 70,
        support: 70,
        innovation: 70,
        scalability: 70,
        integration: 80
    },
    fortinet: {
        cloudNative: 45,
        zeroTrust: 75,
        automation: 70,
        aiMl: 60,
        compliance: 85,
        userExperience: 65,
        support: 75,
        innovation: 65,
        scalability: 70,
        integration: 85
    },
    microsoft: {
        cloudNative: 90,
        zeroTrust: 80,
        automation: 75,
        aiMl: 80,
        compliance: 85,
        userExperience: 75,
        support: 70,
        innovation: 85,
        scalability: 90,
        integration: 95
    },
    juniper: {
        cloudNative: 85,
        zeroTrust: 80,
        automation: 80,
        aiMl: 75,
        compliance: 80,
        userExperience: 75,
        support: 70,
        innovation: 80,
        scalability: 85,
        integration: 80
    },
    arista: {
        cloudNative: 90,
        zeroTrust: 75,
        automation: 85,
        aiMl: 70,
        compliance: 75,
        userExperience: 70,
        support: 65,
        innovation: 75,
        scalability: 85,
        integration: 75
    },
    extreme: {
        cloudNative: 85,
        zeroTrust: 70,
        automation: 75,
        aiMl: 65,
        compliance: 75,
        userExperience: 70,
        support: 65,
        innovation: 70,
        scalability: 80,
        integration: 75
    },
    foxpass: {
        cloudNative: 100,
        zeroTrust: 65,
        automation: 70,
        aiMl: 50,
        compliance: 70,
        userExperience: 80,
        support: 60,
        innovation: 65,
        scalability: 75,
        integration: 70
    },
    securew2: {
        cloudNative: 100,
        zeroTrust: 70,
        automation: 75,
        aiMl: 55,
        compliance: 75,
        userExperience: 80,
        support: 65,
        innovation: 70,
        scalability: 80,
        integration: 75
    },
    packetfence: {
        cloudNative: 20,
        zeroTrust: 60,
        automation: 50,
        aiMl: 40,
        compliance: 65,
        userExperience: 50,
        support: 45,
        innovation: 55,
        scalability: 60,
        integration: 70
    },
    radiussaas: {
        cloudNative: 100,
        zeroTrust: 60,
        automation: 65,
        aiMl: 45,
        compliance: 65,
        userExperience: 75,
        support: 55,
        innovation: 60,
        scalability: 80,
        integration: 65
    },
    pulse: {
        cloudNative: 50,
        zeroTrust: 75,
        automation: 65,
        aiMl: 55,
        compliance: 80,
        userExperience: 60,
        support: 65,
        innovation: 60,
        scalability: 70,
        integration: 75
    }
};

// Create VendorCalculator class
window.VendorCalculator = class VendorCalculator {
    constructor() {
        this.vendors = window.vendorPricingData;
        this.capabilities = window.vendorCapabilities;
        console.log("✅ VendorCalculator initialized with", Object.keys(this.vendors).length, "vendors");
    }
    
    calculateVendorTCO(vendorKey, config) {
        const vendor = this.vendors[vendorKey];
        const capabilities = this.capabilities[vendorKey];
        
        if (!vendor) {
            console.error(`Vendor ${vendorKey} not found!`);
            return null;
        }
        
        const deviceCount = config.deviceCount || 1000;
        const years = config.analysisPeriod || 3;
        const fteCost = config.fteCost || 100000;
        
        const monthlyLicense = vendor.perDeviceMonthly * deviceCount;
        const annualLicense = monthlyLicense * 12;
        const totalLicense = annualLicense * years;
        
        const implementationCost = vendor.implementation;
        const supportCost = vendor.annualSupport * years;
        const hardwareCost = vendor.hardwareCost || 0;
        const operationalCost = vendor.fteRequired * fteCost * years;
        const trainingCost = vendor.type === 'on-premise' ? 25000 : 10000;
        const maintenanceCost = hardwareCost > 0 ? (hardwareCost * 0.15 * years) : 0;
        
        const totalTCO = totalLicense + implementationCost + supportCost + 
                        hardwareCost + operationalCost + trainingCost + maintenanceCost;
        
        const overallScore = this.calculateOverallScore(capabilities);
        const securityScore = Math.round((capabilities.zeroTrust + capabilities.compliance) / 2);
        
        const annualSavings = this.calculateAnnualSavings(vendorKey, config);
        const roi = Math.round((annualSavings * years - totalTCO) / totalTCO * 100);
        const paybackMonths = totalTCO > 0 ? Math.round(totalTCO / (annualSavings / 12)) : 0;
        
        return {
            key: vendorKey,
            name: vendor.name,
            type: vendor.type,
            score: overallScore,
            tco: {
                total: totalTCO,
                tco: totalTCO,
                monthly: totalTCO / (years * 12),
                annual: totalTCO / years,
                perDevice: totalTCO / deviceCount,
                perDeviceMonthly: vendor.perDeviceMonthly,
                breakdown: {
                    license: totalLicense,
                    implementation: implementationCost,
                    support: supportCost,
                    hardware: hardwareCost,
                    operational: operationalCost,
                    training: trainingCost,
                    maintenance: maintenanceCost
                }
            },
            costs: {
                tco3Year: totalTCO,
                license: annualLicense,
                implementation: implementationCost,
                operational: operationalCost / years,
                total: totalTCO
            },
            metrics: {
                implementationDays: vendor.deploymentDays,
                fteRequired: vendor.fteRequired,
                securityScore: securityScore,
                cloudNative: capabilities.cloudNative === 100,
                zeroTrustScore: capabilities.zeroTrust,
                automationLevel: capabilities.automation
            },
            capabilities: capabilities,
            roi: {
                roi: roi,
                annualSavings: annualSavings,
                paybackMonths: paybackMonths > 0 ? paybackMonths : 6,
                savingsPercent: 0
            },
            risk: {
                score: 100 - securityScore,
                breachReduction: Math.round(securityScore * 0.3),
                riskReduction: Math.round(securityScore * 0.3)
            }
        };
    }
    
    calculateOverallScore(capabilities) {
        const weights = {
            cloudNative: 0.15,
            zeroTrust: 0.20,
            automation: 0.15,
            aiMl: 0.10,
            compliance: 0.15,
            userExperience: 0.10,
            support: 0.05,
            innovation: 0.05,
            scalability: 0.05
        };
        
        let score = 0;
        for (const [key, weight] of Object.entries(weights)) {
            score += (capabilities[key] || 0) * weight;
        }
        
        return Math.round(score);
    }
    
    calculateAnnualSavings(vendorKey, config) {
        const vendor = this.vendors[vendorKey];
        const baseSavings = 50000;
        const avgFTE = 1.5;
        const fteSavings = (avgFTE - vendor.fteRequired) * (config.fteCost || 100000);
        const breachRisk = 0.05;
        const breachCost = config.breachCost || 4350000;
        const securityScore = this.capabilities[vendorKey].zeroTrust / 100;
        const breachSavings = breachCost * breachRisk * securityScore;
        
        return baseSavings + fteSavings + breachSavings;
    }
    
    generateVendorComparison(config) {
        console.log("🔄 Generating vendor comparison with config:", config);
        const comparison = {};
        
        for (const vendorKey of Object.keys(this.vendors)) {
            comparison[vendorKey] = this.calculateVendorTCO(vendorKey, config);
        }
        
        const avgTCO = Object.values(comparison)
            .filter(v => v.key !== 'portnox')
            .reduce((sum, v) => sum + v.tco.total, 0) / (Object.keys(comparison).length - 1);
        
        for (const vendor of Object.values(comparison)) {
            vendor.roi.savingsPercent = Math.round((1 - vendor.tco.total / avgTCO) * 100);
        }
        
        console.log("✅ Vendor comparison complete");
        return comparison;
    }
    
    setPortnoxPricing(pricePerDevice) {
        this.vendors.portnox.perDeviceMonthly = pricePerDevice;
        console.log(`💰 Portnox pricing updated to $${pricePerDevice}/device/month`);
    }
};

// Create global instance
window.vendorCalculator = new window.VendorCalculator();
console.log("✅ Vendor calculator created successfully");
