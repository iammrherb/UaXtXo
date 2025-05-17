/**
 * Standalone Vendor Data for Portnox TCO Analyzer
 * This is a clean implementation not dependent on the existing broken code
 */

// Define complete standalone vendor data
window.PORTNOX_DATA = {
    vendors: {
        portnox: {
            id: "portnox",
            name: "Portnox Cloud",
            type: "cloud-native",
            description: "Cloud-native NAC",
            badge: "Best Value",
            badgeClass: "badge-primary",
            logo: "img/vendors/portnox-logo.png",
            logoFallback: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY1QkQ0NCI+UG9ydG5veCBDbG91ZDwvdGV4dD48L3N2Zz4=",
            color: "#65BD44",
            features: {
                zeroTrust: 92,
                endpointVisibility: 95,
                cloudIntegration: 98,
                multiVendor: 90,
                remoteAccess: 96,
                userExperience: 88,
                cloudNative: 100,
                automation: 90,
                threatResponse: 85,
                scalability: 92,
                compliance: 94,
                costEffectiveness: 88,
                easeOfDeployment: 95
            },
            costs: {
                initialHardware: 0,
                initialLicensing: 100000,
                initialImplementation: 20000,
                annualMaintenance: 0,
                annualSupport: 30000,
                annualOperations: 30000,
                fteCost: 80000,
                fteCount: 0.25
            },
            deploymentTime: "Days",
            complexity: "Low",
            riskReduction: 85
        },
        cisco: {
            id: "cisco",
            name: "Cisco ISE",
            type: "on-premises",
            description: "Enterprise NAC",
            badge: "Complex",
            badgeClass: "badge-warning",
            logo: "img/vendors/cisco-logo.png",
            logoFallback: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzA0OWZkOSI+Q2lzY28gSVNFPC90ZXh0Pjwvc3ZnPg==",
            color: "#049fd9",
            features: {
                zeroTrust: 45,
                endpointVisibility: 80,
                cloudIntegration: 50,
                multiVendor: 75,
                remoteAccess: 70,
                userExperience: 60,
                cloudNative: 20,
                automation: 65,
                threatResponse: 75,
                scalability: 80,
                compliance: 85,
                costEffectiveness: 40,
                easeOfDeployment: 40
            },
            costs: {
                initialHardware: 80000,
                initialLicensing: 120000,
                initialImplementation: 60000,
                annualMaintenance: 25000,
                annualSupport: 40000,
                annualOperations: 80000,
                fteCost: 100000,
                fteCount: 1.5
            },
            deploymentTime: "Months",
            complexity: "High",
            riskReduction: 60
        },
        aruba: {
            id: "aruba",
            name: "Aruba ClearPass",
            type: "on-premises",
            description: "Policy manager",
            badge: "",
            badgeClass: "",
            logo: "img/vendors/aruba-logo.png",
            logoFallback: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iI2ZmODMwMCI+QXJ1YmEgQ2xlYXJQYXNzPC90ZXh0Pjwvc3ZnPg==",
            color: "#ff8300",
            features: {
                zeroTrust: 42,
                endpointVisibility: 75,
                cloudIntegration: 55,
                multiVendor: 85,
                remoteAccess: 65,
                userExperience: 65,
                cloudNative: 30,
                automation: 60,
                threatResponse: 70,
                scalability: 78,
                compliance: 80,
                costEffectiveness: 45,
                easeOfDeployment: 50
            },
            costs: {
                initialHardware: 70000,
                initialLicensing: 100000,
                initialImplementation: 50000,
                annualMaintenance: 20000,
                annualSupport: 35000,
                annualOperations: 70000,
                fteCost: 90000,
                fteCount: 1.25
            },
            deploymentTime: "Weeks",
            complexity: "Moderate",
            riskReduction: 65
        },
        forescout: {
            id: "forescout",
            name: "Forescout",
            type: "on-premises",
            description: "Device visibility",
            badge: "",
            badgeClass: "",
            logo: "img/vendors/forescout-logo.png",
            logoFallback: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzZiMmE5NCI+Rm9yZXNjb3V0PC90ZXh0Pjwvc3ZnPg==",
            color: "#6b2a94",
            features: {
                zeroTrust: 40,
                endpointVisibility: 90,
                cloudIntegration: 40,
                multiVendor: 75,
                remoteAccess: 60,
                userExperience: 55,
                cloudNative: 20,
                automation: 70,
                threatResponse: 80,
                scalability: 75,
                compliance: 82,
                costEffectiveness: 35,
                easeOfDeployment: 45
            },
            costs: {
                initialHardware: 90000,
                initialLicensing: 110000,
                initialImplementation: 55000,
                annualMaintenance: 25000,
                annualSupport: 40000,
                annualOperations: 75000,
                fteCost: 95000,
                fteCount: 1.25
            },
            deploymentTime: "Weeks",
            complexity: "Moderate",
            riskReduction: 70
        },
        fortinac: {
            id: "fortinac",
            name: "FortiNAC",
            type: "on-premises",
            description: "Fortinet NAC",
            badge: "",
            badgeClass: "",
            logo: "img/vendors/fortinac-logo.png",
            logoFallback: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iI2M4MTAyZSI+Rm9ydGlOQUM8L3RleHQ+PC9zdmc+",
            color: "#c8102e",
            features: {
                zeroTrust: 38,
                endpointVisibility: 70,
                cloudIntegration: 45,
                multiVendor: 65,
                remoteAccess: 60,
                userExperience: 60,
                cloudNative: 25,
                automation: 65,
                threatResponse: 75,
                scalability: 70,
                compliance: 75,
                costEffectiveness: 55,
                easeOfDeployment: 55
            },
            costs: {
                initialHardware: 60000,
                initialLicensing: 90000,
                initialImplementation: 45000,
                annualMaintenance: 18000,
                annualSupport: 35000,
                annualOperations: 65000,
                fteCost: 85000,
                fteCount: 1.0
            },
            deploymentTime: "Weeks",
            complexity: "Moderate",
            riskReduction: 62
        },
        juniper: {
            id: "juniper",
            name: "Juniper Mist",
            type: "cloud-hybrid",
            description: "AI-driven NAC",
            badge: "",
            badgeClass: "",
            logo: "img/vendors/juniper-logo.png",
            logoFallback: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzg0YmM0MSI+SnVuaXBlciBNaXN0PC90ZXh0Pjwvc3ZnPg==",
            color: "#84bc41",
            features: {
                zeroTrust: 60,
                endpointVisibility: 65,
                cloudIntegration: 75,
                multiVendor: 60,
                remoteAccess: 75,
                userExperience: 70,
                cloudNative: 70,
                automation: 80,
                threatResponse: 65,
                scalability: 75,
                compliance: 70,
                costEffectiveness: 60,
                easeOfDeployment: 65
            },
            costs: {
                initialHardware: 20000,
                initialLicensing: 105000,
                initialImplementation: 40000,
                annualMaintenance: 5000,
                annualSupport: 30000,
                annualOperations: 45000,
                fteCost: 85000,
                fteCount: 0.75
            },
            deploymentTime: "Days to Weeks",
            complexity: "Moderate",
            riskReduction: 70
        },
        securew2: {
            id: "securew2",
            name: "SecureW2",
            type: "cloud",
            description: "Cloud RADIUS",
            badge: "",
            badgeClass: "",
            logo: "img/vendors/securew2-logo.png",
            logoFallback: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzFhNGQ4MCI+U2VjdXJlVzI8L3RleHQ+PC9zdmc+",
            color: "#1a4d80",
            features: {
                zeroTrust: 60,
                endpointVisibility: 65,
                cloudIntegration: 75,
                multiVendor: 70,
                remoteAccess: 75,
                userExperience: 75,
                cloudNative: 85,
                automation: 70,
                threatResponse: 65,
                scalability: 65,
                compliance: 65,
                costEffectiveness: 70,
                easeOfDeployment: 75
            },
            costs: {
                initialHardware: 0,
                initialLicensing: 85000,
                initialImplementation: 30000,
                annualMaintenance: 0,
                annualSupport: 25000,
                annualOperations: 40000,
                fteCost: 75000,
                fteCount: 0.75
            },
            deploymentTime: "Days",
            complexity: "Low",
            riskReduction: 65
        },
        microsoft: {
            id: "microsoft",
            name: "Microsoft NPS",
            type: "on-premises",
            description: "Windows Server NAC",
            badge: "",
            badgeClass: "",
            logo: "img/vendors/microsoft-logo.png",
            logoFallback: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzAwYTRlZiI+TWljcm9zb2Z0IE5QUzwvdGV4dD48L3N2Zz4=",
            color: "#00a4ef",
            features: {
                zeroTrust: 30,
                endpointVisibility: 50,
                cloudIntegration: 45,
                multiVendor: 40,
                remoteAccess: 65,
                userExperience: 55,
                cloudNative: 25,
                automation: 40,
                threatResponse: 35,
                scalability: 60,
                compliance: 50,
                costEffectiveness: 70,
                easeOfDeployment: 50
            },
            costs: {
                initialHardware: 20000,
                initialLicensing: 45000,
                initialImplementation: 35000,
                annualMaintenance: 8000,
                annualSupport: 15000,
                annualOperations: 50000,
                fteCost: 80000,
                fteCount: 0.8
            },
            deploymentTime: "Weeks",
            complexity: "Moderate",
            riskReduction: 40
        },
        arista: {
            id: "arista",
            name: "Arista Agni",
            type: "cloud-hybrid",
            description: "Network control",
            badge: "",
            badgeClass: "",
            logo: "img/vendors/arista-logo.png",
            logoFallback: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzJkN2RlMSI+QXJpc3RhIEFnbmk8L3RleHQ+PC9zdmc+",
            color: "#2d7de1",
            features: {
                zeroTrust: 55,
                endpointVisibility: 60,
                cloudIntegration: 70,
                multiVendor: 50,
                remoteAccess: 65,
                userExperience: 60,
                cloudNative: 60,
                automation: 75,
                threatResponse: 60,
                scalability: 75,
                compliance: 60,
                costEffectiveness: 55,
                easeOfDeployment: 60
            },
            costs: {
                initialHardware: 25000,
                initialLicensing: 95000,
                initialImplementation: 45000,
                annualMaintenance: 10000,
                annualSupport: 28000,
                annualOperations: 50000,
                fteCost: 85000,
                fteCount: 0.8
            },
            deploymentTime: "Weeks",
            complexity: "Moderate",
            riskReduction: 60
        },
        foxpass: {
            id: "foxpass",
            name: "Foxpass",
            type: "cloud",
            description: "Cloud RADIUS/LDAP",
            badge: "",
            badgeClass: "",
            logo: "img/vendors/foxpass-logo.png",
            logoFallback: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iI2ZmNTcyMiI+Rm94cGFzczwvdGV4dD48L3N2Zz4=",
            color: "#ff5722",
            features: {
                zeroTrust: 55,
                endpointVisibility: 55,
                cloudIntegration: 80,
                multiVendor: 65,
                remoteAccess: 70,
                userExperience: 75,
                cloudNative: 90,
                automation: 65,
                threatResponse: 55,
                scalability: 60,
                compliance: 55,
                costEffectiveness: 80,
                easeOfDeployment: 85
            },
            costs: {
                initialHardware: 0,
                initialLicensing: 60000,
                initialImplementation: 15000,
                annualMaintenance: 0,
                annualSupport: 18000,
                annualOperations: 25000,
                fteCost: 70000,
                fteCount: 0.5
            },
            deploymentTime: "Hours to Days",
            complexity: "Low",
            riskReduction: 55
        },
        "no-nac": {
            id: "no-nac",
            name: "No NAC Solution",
            type: "none",
            description: "High risk baseline",
            badge: "High Risk",
            badgeClass: "badge-danger",
            logo: "img/vendors/no-nac-icon.png",
            logoFallback: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzc3Nzc3NyI+Tm8gTkFDPC90ZXh0Pjwvc3ZnPg==",
            color: "#777777",
            features: {
                zeroTrust: 0,
                endpointVisibility: 10,
                cloudIntegration: 0,
                multiVendor: 0,
                remoteAccess: 10,
                userExperience: 30,
                cloudNative: 0,
                automation: 0,
                threatResponse: 0,
                scalability: 0,
                compliance: 0,
                costEffectiveness: 100,
                easeOfDeployment: 100
            },
            costs: {
                initialHardware: 0,
                initialLicensing: 0,
                initialImplementation: 0,
                annualMaintenance: 0,
                annualSupport: 0,
                annualOperations: 0,
                fteCost: 0,
                fteCount: 0
            },
            deploymentTime: "N/A",
            complexity: "None",
            riskReduction: 0
        }
    },
    settings: {
        basePrice: 3.0,           // Default price per device in USD
        volumeDiscount: 0.15,     // 15% volume discount
        fteCost: 100000,          // Average FTE cost per year
        maintenancePercentage: 0.18, // Annual maintenance as percentage of initial investment
        deviceCount: 500,         // Default device count
        locations: 2,             // Default number of locations
        yearsToProject: 3,        // Default projection period
        riskReduction: 0.35,      // Default risk reduction percentage
        insuranceReduction: 0.10, // Default insurance premium reduction
        downtimeCost: 5000,       // Default cost of downtime per hour
        industryRiskFactor: 1.0,  // Default industry risk factor
        riskCostPerDevice: 100,   // Estimated risk cost per device without NAC
        defaultVendors: ["portnox", "cisco", "aruba"] // Default vendors to compare
    },
    calculations: {
        // Functions to calculate TCO, ROI, etc. will be added to this object
    }
};

// Add calculation functions
PORTNOX_DATA.calculations = {
    // Calculate total cost of ownership for a vendor
    calculateTCO: function(vendorId, settings) {
        const vendor = PORTNOX_DATA.vendors[vendorId];
        if (!vendor) return null;
        
        const s = Object.assign({}, PORTNOX_DATA.settings, settings || {});
        const years = s.yearsToProject;
        const isCloud = vendor.type.includes('cloud');
        
        // Size factor based on device count
        let sizeFactor = 1.0;
        if (s.deviceCount < 1000) sizeFactor = 0.8;
        else if (s.deviceCount > 5000) sizeFactor = 1.5;
        else if (s.deviceCount > 10000) sizeFactor = 2.0;
        
        // Location factor
        const locationFactor = Math.sqrt(s.locations / 2);
        
        // Calculate costs
        const costs = vendor.costs;
        
        // Initial costs
        const initialHardware = costs.initialHardware * sizeFactor * locationFactor;
        const initialLicensing = costs.initialLicensing * sizeFactor;
        const initialImplementation = costs.initialImplementation * sizeFactor * locationFactor;
        const totalInitialCost = initialHardware + initialLicensing + initialImplementation;
        
        // Annual costs
        const annualMaintenance = costs.annualMaintenance * sizeFactor * locationFactor;
        const annualSupport = costs.annualSupport * sizeFactor;
        const annualOperations = costs.annualOperations * sizeFactor;
        const annualPersonnel = costs.fteCost * costs.fteCount * sizeFactor;
        const totalAnnualCost = annualMaintenance + annualSupport + annualOperations + annualPersonnel;
        
        // Subscription costs for cloud-based solutions
        let annualSubscription = 0;
        if (isCloud) {
            // Calculate per-device price with volume discount
            const basePrice = s.basePrice; // Monthly per device
            const discount = s.volumeDiscount;
            const discountedPrice = basePrice * (1 - discount);
            annualSubscription = s.deviceCount * discountedPrice * 12;
        }
        
        // Total TCO
        const threeYearTCO = totalInitialCost + (totalAnnualCost + annualSubscription) * years;
        
        return {
            initialHardware,
            initialLicensing,
            initialImplementation,
            totalInitialCost,
            annualMaintenance,
            annualSupport,
            annualOperations,
            annualPersonnel,
            annualSubscription,
            totalAnnualCost: totalAnnualCost + annualSubscription,
            threeYearTCO
        };
    },
    
    // Calculate ROI comparing a vendor to a baseline
    calculateROI: function(vendorId, baselineVendorId, settings) {
        const vendor = PORTNOX_DATA.vendors[vendorId];
        if (!vendor) return null;
        
        // Get TCO for both vendors
        const vendorTCO = this.calculateTCO(vendorId, settings);
        const baselineTCO = this.calculateTCO(baselineVendorId || 'cisco', settings);
        
        if (!vendorTCO || !baselineTCO) return null;
        
        // Calculate cost savings
        const savings = baselineTCO.threeYearTCO - vendorTCO.threeYearTCO;
        const savingsPercentage = (savings / baselineTCO.threeYearTCO) * 100;
        
        // Calculate ROI
        const roi = (savings / vendorTCO.threeYearTCO) * 100;
        
        // Calculate payback period (in months)
        const monthlySavings = savings / (settings?.yearsToProject || PORTNOX_DATA.settings.yearsToProject) / 12;
        let paybackPeriod = 0;
        if (monthlySavings > 0) {
            paybackPeriod = vendorTCO.totalInitialCost / monthlySavings;
        }
        
        return {
            savings,
            savingsPercentage,
            roi,
            paybackPeriod,
            baselineTCO: baselineTCO.threeYearTCO,
            vendorTCO: vendorTCO.threeYearTCO
        };
    },
    
    // Calculate risk assessment
    calculateRiskAssessment: function(vendorId, settings) {
        const vendor = PORTNOX_DATA.vendors[vendorId];
        if (!vendor) return null;
        
        const s = Object.assign({}, PORTNOX_DATA.settings, settings || {});
        
        // Risk reduction based on vendor capabilities
        const riskReduction = vendor.riskReduction / 100;
        
        // Calculate breach risk with and without NAC
        const baseBreachRisk = s.deviceCount * s.riskCostPerDevice * s.industryRiskFactor;
        const reducedBreachRisk = baseBreachRisk * (1 - riskReduction);
        const breachCostSavings = baseBreachRisk - reducedBreachRisk;
        
        // Calculate compliance costs
        const complianceCoverage = vendor.features.compliance;
        const complianceEfficiency = complianceCoverage / 100;
        const complianceSavings = s.deviceCount * 20 * complianceEfficiency; // $20 per device baseline
        
        // Calculate mean time to respond
        let mttr = 240; // minutes (4 hours) baseline
        if (vendor.type.includes('cloud')) {
            mttr = 30; // 30 minutes for cloud solutions
        } else if (vendor.features.threatResponse > 70) {
            mttr = 60; // 1 hour for good threat response
        } else if (vendor.features.threatResponse > 50) {
            mttr = 120; // 2 hours for average threat response
        }
        
        // Insurance premium reduction
        const insuranceReduction = s.insuranceReduction;
        const annualInsuranceSavings = baseBreachRisk * 0.10 * insuranceReduction; // Assuming insurance costs 10% of risk
        
        return {
            riskReduction: vendor.riskReduction,
            baseBreachRisk,
            reducedBreachRisk,
            breachCostSavings,
            complianceCoverage,
            complianceSavings,
            mttr,
            insuranceReduction: insuranceReduction * 100,
            annualInsuranceSavings
        };
    },
    
    // Run all calculations for selected vendors
    calculateAll: function(selectedVendorIds, settings) {
        const results = {
            vendors: [],
            comparisons: []
        };
        
        // Ensure we have valid vendors
        if (!selectedVendorIds || !Array.isArray(selectedVendorIds) || selectedVendorIds.length === 0) {
            selectedVendorIds = PORTNOX_DATA.settings.defaultVendors;
        }
        
        // Calculate for each vendor
        selectedVendorIds.forEach(vendorId => {
            const vendor = PORTNOX_DATA.vendors[vendorId];
            if (!vendor) return;
            
            const tco = this.calculateTCO(vendorId, settings);
            const roi = this.calculateROI(vendorId, 'cisco', settings);
            const risk = this.calculateRiskAssessment(vendorId, settings);
            
            results.vendors.push({
                id: vendorId,
                name: vendor.name,
                type: vendor.type,
                tco,
                roi,
                risk
            });
        });
        
        // Calculate comparisons between vendors
        if (results.vendors.length > 1) {
            // Find Portnox for baseline
            const portnoxIndex = results.vendors.findIndex(v => v.id === 'portnox');
            const portnox = portnoxIndex >= 0 ? results.vendors[portnoxIndex] : results.vendors[0];
            
            // Compare other vendors to Portnox
            results.vendors.forEach(vendor => {
                if (vendor.id === portnox.id) return;
                
                results.comparisons.push({
                    vendor1: portnox.id,
                    vendor2: vendor.id,
                    tcoSavings: vendor.tco.threeYearTCO - portnox.tco.threeYearTCO,
                    tcoSavingsPercentage: ((vendor.tco.threeYearTCO - portnox.tco.threeYearTCO) / vendor.tco.threeYearTCO) * 100,
                    initialCostDifference: vendor.tco.totalInitialCost - portnox.tco.totalInitialCost,
                    annualCostDifference: vendor.tco.totalAnnualCost - portnox.tco.totalAnnualCost,
                    riskReductionDifference: portnox.risk.riskReduction - vendor.risk.riskReduction
                });
            });
        }
        
        return results;
    }
};
