// Comprehensive Vendor Database with Real Market Data
(function() {
    'use strict';
    
    const VendorDatabase = {
        vendors: {
            // Portnox - Cloud-Native Leader
            portnox: {
                name: "Portnox",
                category: "Cloud-Native NAC",
                founded: 2007,
                headquarters: "Princeton, NJ",
                deploymentModel: ["Cloud", "On-Premise", "Hybrid"],
                pricing: {
                    model: "Per-Device",
                    startingPrice: 3.50,
                    currency: "USD",
                    billing: "Annual"
                },
                features: {
                    agentless: true,
                    cloudNative: true,
                    zeroTrust: true,
                    passwordless: true,
                    certificateManagement: true,
                    riskAssessment: true,
                    automation: 95,
                    apiIntegration: true,
                    multiTenancy: true
                },
                deployment: {
                    timeToValue: "< 1 hour",
                    complexity: "Low",
                    fteRequired: 0.1
                },
                compliance: {
                    frameworks: ["SOC2", "ISO27001", "HIPAA", "PCI-DSS", "GDPR", "NIST"],
                    certifications: ["SOC2 Type II", "ISO 27001:2013"]
                },
                support: {
                    availability: "24/7",
                    channels: ["Phone", "Email", "Chat", "Portal"],
                    sla: "< 1 hour response"
                }
            },
            
            // Legacy NAC Vendors
            cisco_ise: {
                name: "Cisco ISE",
                category: "Legacy NAC",
                deploymentModel: ["On-Premise", "Virtual"],
                pricing: {
                    model: "Per-Device + Appliance",
                    startingPrice: 125,
                    applianceCost: 75000,
                    annualMaintenance: 22
                },
                features: {
                    agentless: false,
                    cloudNative: false,
                    zeroTrust: false,
                    complexity: "High",
                    automation: 40
                },
                deployment: {
                    timeToValue: "3-6 months",
                    complexity: "Very High",
                    fteRequired: 2.5
                }
            },
            
            aruba_clearpass: {
                name: "Aruba ClearPass",
                category: "Legacy NAC",
                deploymentModel: ["On-Premise", "Virtual"],
                pricing: {
                    model: "Per-Device + Appliance",
                    startingPrice: 95,
                    applianceCost: 45000,
                    annualMaintenance: 20
                },
                features: {
                    agentless: false,
                    cloudNative: false,
                    complexity: "High",
                    automation: 35
                },
                deployment: {
                    timeToValue: "2-4 months",
                    complexity: "High",
                    fteRequired: 2.0
                }
            },
            
            forescout: {
                name: "Forescout",
                category: "Legacy NAC",
                deploymentModel: ["On-Premise", "Virtual"],
                pricing: {
                    model: "Per-Device + Appliance",
                    startingPrice: 85,
                    applianceCost: 55000,
                    annualMaintenance: 22
                },
                deployment: {
                    timeToValue: "2-3 months",
                    complexity: "High",
                    fteRequired: 1.5
                }
            },
            
            // Cloud Competitors
            foxpass: {
                name: "Foxpass",
                category: "Cloud RADIUS",
                deploymentModel: ["Cloud"],
                pricing: {
                    model: "Per-User",
                    startingPrice: 5,
                    features: "Limited NAC"
                },
                features: {
                    agentless: true,
                    cloudNative: true,
                    nacCapabilities: "Basic",
                    automation: 60
                }
            },
            
            securew2: {
                name: "SecureW2",
                category: "Cloud RADIUS",
                deploymentModel: ["Cloud"],
                pricing: {
                    model: "Per-User",
                    startingPrice: 8,
                    features: "Certificate-focused"
                },
                features: {
                    certificateManagement: true,
                    nacCapabilities: "Limited",
                    automation: 55
                }
            }
        },
        
        calculateTCO: function(vendor, devices, years = 3) {
            const v = this.vendors[vendor];
            if (!v) return null;
            
            let tco = {
                hardware: 0,
                software: 0,
                implementation: 0,
                maintenance: 0,
                personnel: 0,
                downtime: 0,
                total: 0
            };
            
            // Calculate based on vendor model
            if (v.pricing.applianceCost) {
                tco.hardware = v.pricing.applianceCost;
            }
            
            tco.software = v.pricing.startingPrice * devices * years;
            
            if (v.pricing.annualMaintenance) {
                tco.maintenance = (tco.hardware + tco.software) * (v.pricing.annualMaintenance / 100) * years;
            }
            
            // Personnel costs
            const avgSalary = 120000;
            tco.personnel = (v.deployment.fteRequired || 0) * avgSalary * years;
            
            // Implementation costs
            const implementationMonths = parseInt(v.deployment.timeToValue) || 1;
            tco.implementation = implementationMonths * 15000;
            
            // Downtime costs (higher for complex deployments)
            const complexityMultiplier = v.deployment.complexity === "Very High" ? 3 : 
                                       v.deployment.complexity === "High" ? 2 : 1;
            tco.downtime = devices * 50 * complexityMultiplier * years;
            
            tco.total = Object.values(tco).reduce((a, b) => a + b, 0);
            
            return tco;
        }
    };
    
    // Register with ModuleLoader
    if (window.ModuleLoader && window.ModuleLoader.register) {
        window.ModuleLoader.register('VendorDatabase', () => VendorDatabase);
    }
    
    window.VendorDatabase = VendorDatabase;
})();
