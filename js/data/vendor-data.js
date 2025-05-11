/**
 * Enhanced Vendor Data with Market Research
 * Comprehensive vendor information with detailed metrics and market data
 */

const vendorData = {
    cisco: {
        name: "Cisco ISE",
        type: "On-Premises",
        description: "Enterprise-grade NAC solution with extensive features and Cisco ecosystem integration",
        logo: "cisco-logo.png",
        marketShare: 35,
        customerSatisfaction: 4.2,
        gartnerRating: "Leader",
        initialCosts: {
            hardware: 95000,
            software: 135000,
            implementation: 85000,
            training: 18000,
            professionalServices: 45000
        },
        annualCosts: {
            licensing: 65000,
            maintenance: 32000,
            support: 38000,
            personnel: 195000,
            energy: 12000,
            upgrades: 28000,
            downtime: 55000,
            securityRisk: 35000
        },
        hiddenCosts: {
            changeManagement: 15000,
            integrationComplexity: 25000,
            scalabilityLimitations: 20000,
            vendorLockIn: 30000
        },
        metrics: {
            deploymentTime: 75,
            ftesRequired: 2.5,
            deviceCapacity: 15000,
            scalabilityScore: 7,
            complexityScore: 9,
            securityScore: 8.5,
            cloudReadiness: 3,
            userExperienceScore: 7,
            automationLevel: 6,
            integrationCapabilities: 8
        },
        features: {
            authentication: "Advanced",
            authorization: "Advanced",
            accounting: "Advanced",
            guestAccess: "Advanced",
            byod: "Advanced",
            iot: "Good",
            cloudIntegration: "Basic",
            microsegmentation: "Advanced",
            threatDefense: "Excellent",
            compliance: "Excellent"
        },
        marketInsights: {
            strengths: [
                "Comprehensive feature set",
                "Deep Cisco ecosystem integration",
                "Mature product with extensive documentation",
                "Strong enterprise support"
            ],
            weaknesses: [
                "High complexity and learning curve",
                "Significant hardware requirements",
                "Limited cloud capabilities",
                "High total cost of ownership"
            ],
            opportunities: [
                "Cloud migration path with Cisco DNA",
                "Integration with Cisco security portfolio",
                "Advanced threat detection capabilities"
            ],
            threats: [
                "Cloud-native competitors",
                "Increasing operational costs",
                "Legacy architecture limitations"
            ]
        }
    },
    
    aruba: {
        name: "Aruba ClearPass",
        type: "On-Premises",
        description: "Comprehensive NAC with strong guest management and multi-vendor support",
        logo: "aruba-logo.png",
        marketShare: 28,
        customerSatisfaction: 4.4,
        gartnerRating: "Leader",
        initialCosts: {
            hardware: 85000,
            software: 105000,
            implementation: 65000,
            training: 14000,
            professionalServices: 35000
        },
        annualCosts: {
            licensing: 48000,
            maintenance: 25000,
            support: 30000,
            personnel: 165000,
            energy: 9000,
            upgrades: 22000,
            downtime: 42000,
            securityRisk: 30000
        },
        hiddenCosts: {
            changeManagement: 12000,
            integrationComplexity: 18000,
            scalabilityLimitations: 15000,
            vendorLockIn: 20000
        },
        metrics: {
            deploymentTime: 55,
            ftesRequired: 1.8,
            deviceCapacity: 12000,
            scalabilityScore: 7.5,
            complexityScore: 7.5,
            securityScore: 8,
            cloudReadiness: 5,
            userExperienceScore: 8,
            automationLevel: 7,
            integrationCapabilities: 8.5
        },
        features: {
            authentication: "Advanced",
            authorization: "Advanced",
            accounting: "Advanced",
            guestAccess: "Excellent",
            byod: "Excellent",
            iot: "Good",
            cloudIntegration: "Moderate",
            microsegmentation: "Good",
            threatDefense: "Good",
            compliance: "Good"
        },
        marketInsights: {
            strengths: [
                "Excellent guest management",
                "Strong multi-vendor support",
                "User-friendly interface",
                "Good mobile integration"
            ],
            weaknesses: [
                "Hardware dependency",
                "Limited cloud-native features",
                "Complex pricing model",
                "Resource intensive"
            ],
            opportunities: [
                "Cloud transition with Aruba Central",
                "Edge computing integration",
                "AI-powered insights"
            ],
            threats: [
                "Pure cloud competitors",
                "Rising maintenance costs",
                "Technology refresh cycles"
            ]
        }
    },
    
    forescout: {
        name: "Forescout",
        type: "On-Premises",
        description: "Agentless visibility platform with strong IoT/OT security capabilities",
        logo: "forescout-logo.png",
        marketShare: 18,
        customerSatisfaction: 4.3,
        gartnerRating: "Visionary",
        initialCosts: {
            hardware: 100000,
            software: 125000,
            implementation: 90000,
            training: 20000,
            professionalServices: 50000
        },
        annualCosts: {
            licensing: 70000,
            maintenance: 35000,
            support: 40000,
            personnel: 180000,
            energy: 11000,
            upgrades: 30000,
            downtime: 45000,
            securityRisk: 32000
        },
        hiddenCosts: {
            changeManagement: 16000,
            integrationComplexity: 22000,
            scalabilityLimitations: 18000,
            vendorLockIn: 25000
        },
        metrics: {
            deploymentTime: 60,
            ftesRequired: 2.0,
            deviceCapacity: 20000,
            scalabilityScore: 8,
            complexityScore: 7,
            securityScore: 9,
            cloudReadiness: 4,
            userExperienceScore: 7.5,
            automationLevel: 8,
            integrationCapabilities: 9
        },
        features: {
            authentication: "Good",
            authorization: "Good",
            accounting: "Good",
            guestAccess: "Basic",
            byod: "Good",
            iot: "Excellent",
            cloudIntegration: "Basic",
            microsegmentation: "Good",
            threatDefense: "Excellent",
            compliance: "Excellent"
        },
        marketInsights: {
            strengths: [
                "Excellent IoT/OT visibility",
                "Agentless discovery",
                "Strong security capabilities",
                "Extensive integration options"
            ],
            weaknesses: [
                "Limited guest management",
                "Complex deployment",
                "Hardware requirements",
                "Limited cloud capabilities"
            ],
            opportunities: [
                "OT security market growth",
                "Cloud platform development",
                "AI-driven analytics"
            ],
            threats: [
                "Cloud-native alternatives",
                "Specialized IoT solutions",
                "Market consolidation"
            ]
        }
    },
    
    fortinac: {
        name: "FortiNAC",
        type: "On-Premises",
        description: "Part of Fortinet Security Fabric with integrated security features",
        logo: "fortinac-logo.png",
        marketShare: 12,
        customerSatisfaction: 4.1,
        gartnerRating: "Challenger",
        initialCosts: {
            hardware: 75000,
            software: 95000,
            implementation: 60000,
            training: 12000,
            professionalServices: 30000
        },
        annualCosts: {
            licensing: 42000,
            maintenance: 22000,
            support: 28000,
            personnel: 155000,
            energy: 8000,
            upgrades: 20000,
            downtime: 38000,
            securityRisk: 35000
        },
        hiddenCosts: {
            changeManagement: 10000,
            integrationComplexity: 15000,
            scalabilityLimitations: 12000,
            vendorLockIn: 18000
        },
        metrics: {
            deploymentTime: 45,
            ftesRequired: 1.5,
            deviceCapacity: 10000,
            scalabilityScore: 6.5,
            complexityScore: 7,
            securityScore: 8,
            cloudReadiness: 4,
            userExperienceScore: 7,
            automationLevel: 6.5,
            integrationCapabilities: 7.5
        },
        features: {
            authentication: "Good",
            authorization: "Good",
            accounting: "Good",
            guestAccess: "Basic",
            byod: "Good",
            iot: "Moderate",
            cloudIntegration: "Basic",
            microsegmentation: "Good",
            threatDefense: "Good",
            compliance: "Good"
        },
        marketInsights: {
            strengths: [
                "Security Fabric integration",
                "Competitive pricing",
                "Fortinet ecosystem benefits",
                "Simplified management"
            ],
            weaknesses: [
                "Limited standalone capabilities",
                "Basic cloud features",
                "Fortinet dependency",
                "Limited advanced features"
            ],
            opportunities: [
                "Security Fabric expansion",
                "SMB market growth",
                "Managed service offerings"
            ],
            threats: [
                "Cloud-native solutions",
                "Best-of-breed competitors",
                "Platform limitations"
            ]
        }
    },
    
    nps: {
        name: "Microsoft NPS",
        type: "On-Premises",
        description: "Basic NAC included with Windows Server, limited enterprise features",
        logo: "microsoft-logo.png",
        marketShare: 8,
        customerSatisfaction: 3.5,
        gartnerRating: "Not Rated",
        initialCosts: {
            hardware: 35000,
            software: 10000,
            implementation: 45000,
            training: 10000,
            professionalServices: 25000
        },
        annualCosts: {
            licensing: 12000,
            maintenance: 15000,
            support: 20000,
            personnel: 135000,
            energy: 5000,
            upgrades: 12000,
            downtime: 65000,
            securityRisk: 75000
        },
        hiddenCosts: {
            changeManagement: 8000,
            integrationComplexity: 20000,
            scalabilityLimitations: 25000,
            vendorLockIn: 5000
        },
        metrics: {
            deploymentTime: 35,
            ftesRequired: 1.8,
            deviceCapacity: 5000,
            scalabilityScore: 4,
            complexityScore: 8,
            securityScore: 5,
            cloudReadiness: 3,
            userExperienceScore: 5,
            automationLevel: 3,
            integrationCapabilities: 5
        },
        features: {
            authentication: "Basic",
            authorization: "Basic",
            accounting: "Basic",
            guestAccess: "Limited",
            byod: "Limited",
            iot: "Limited",
            cloudIntegration: "Basic",
            microsegmentation: "Limited",
            threatDefense: "Basic",
            compliance: "Basic"
        },
        marketInsights: {
            strengths: [
                "Low initial cost",
                "Windows Server integration",
                "Simple deployment",
                "Microsoft ecosystem"
            ],
            weaknesses: [
                "Limited features",
                "Poor scalability",
                "Basic security",
                "Manual processes"
            ],
            opportunities: [
                "Azure integration",
                "Microsoft 365 synergy",
                "SMB market"
            ],
            threats: [
                "Feature-rich competitors",
                "Security requirements",
                "Compliance demands"
            ]
        }
    },
    
    securew2: {
        name: "SecureW2",
        type: "Cloud",
        description: "Cloud-focused solution with certificate-based authentication",
        logo: "securew2-logo.png",
        marketShare: 5,
        customerSatisfaction: 4.5,
        gartnerRating: "Niche Player",
        initialCosts: {
            hardware: 0,
            software: 45000,
            implementation: 35000,
            training: 10000,
            professionalServices: 20000
        },
        annualCosts: {
            licensing: 55000,
            maintenance: 0,
            support: 20000,
            personnel: 95000,
            energy: 0,
            upgrades: 0,
            downtime: 12000,
            securityRisk: 25000
        },
        hiddenCosts: {
            changeManagement: 8000,
            integrationComplexity: 12000,
            scalabilityLimitations: 5000,
            vendorLockIn: 15000
        },
        metrics: {
            deploymentTime: 25,
            ftesRequired: 1.0,
            deviceCapacity: 8000,
            scalabilityScore: 8,
            complexityScore: 5,
            securityScore: 8.5,
            cloudReadiness: 9,
            userExperienceScore: 8.5,
            automationLevel: 8,
            integrationCapabilities: 7
        },
        features: {
            authentication: "Excellent",
            authorization: "Good",
            accounting: "Good",
            guestAccess: "Good",
            byod: "Excellent",
            iot: "Moderate",
            cloudIntegration: "Excellent",
            microsegmentation: "Moderate",
            threatDefense: "Good",
            compliance: "Good"
        },
        marketInsights: {
            strengths: [
                "Certificate-based security",
                "Cloud-native architecture",
                "Simple deployment",
                "Passwordless authentication"
            ],
            weaknesses: [
                "Limited feature set",
                "Niche market position",
                "Limited IoT support",
                "Smaller ecosystem"
            ],
            opportunities: [
                "Zero-trust adoption",
                "Education market",
                "Cloud migration trend"
            ],
            threats: [
                "Comprehensive NAC solutions",
                "Market consolidation",
                "Feature expansion needs"
            ]
        }
    },
    
    portnox: {
        name: "Portnox Cloud",
        type: "Cloud-Native",
        description: "Zero-trust cloud-native NAC with automated deployment and AI-driven security",
        logo: "portnox-logo.png",
        marketShare: 8,
        customerSatisfaction: 4.8,
        gartnerRating: "Visionary",
        initialCosts: {
            hardware: 0,
            software: 0,
            implementation: 20000,
            training: 5000,
            professionalServices: 15000
        },
        annualCosts: {
            licensing: "dynamic", // Based on per-device pricing
            maintenance: 0,
            support: 0,
            personnel: 50000,
            energy: 0,
            upgrades: 0,
            downtime: 5000,
            securityRisk: 15000
        },
        hiddenCosts: {
            changeManagement: 5000,
            integrationComplexity: 8000,
            scalabilityLimitations: 0,
            vendorLockIn: 10000
        },
        metrics: {
            deploymentTime: 14,
            ftesRequired: 0.5,
            deviceCapacity: "unlimited",
            scalabilityScore: 10,
            complexityScore: 3,
            securityScore: 9.5,
            cloudReadiness: 10,
            userExperienceScore: 9,
            automationLevel: 9.5,
            integrationCapabilities: 9
        },
        features: {
            authentication: "Excellent",
            authorization: "Excellent",
            accounting: "Excellent",
            guestAccess: "Excellent",
            byod: "Excellent",
            iot: "Excellent",
            cloudIntegration: "Native",
            microsegmentation: "Excellent",
            threatDefense: "Excellent",
            compliance: "Excellent"
        },
        marketInsights: {
            strengths: [
                "100% cloud-native architecture",
                "Rapid deployment (days vs months)",
                "Zero hardware requirements",
                "AI-driven automation",
                "Unlimited scalability",
                "Automatic updates and maintenance"
            ],
            weaknesses: [
                "Internet connectivity dependency",
                "Newer market entrant",
                "Cloud-only approach may not suit all"
            ],
            opportunities: [
                "Digital transformation trends",
                "Zero-trust security adoption",
                "Remote work evolution",
                "IoT market expansion"
            ],
            threats: [
                "Established vendor competition",
                "Market education needs",
                "Cloud security concerns"
            ]
        },
        uniqueAdvantages: [
            "90% faster deployment than traditional NAC",
            "80% reduction in IT personnel requirements",
            "99.99% uptime SLA",
            "Real-time threat detection with AI",
            "Automatic compliance reporting",
            "No hardware refresh cycles"
        ]
    },
    
    none: {
        name: "No NAC",
        type: "None",
        description: "No network access control solution in place - high security risk",
        logo: "no-nac-icon.svg",
        marketShare: 0,
        customerSatisfaction: 0,
        gartnerRating: "N/A",
        initialCosts: {
            hardware: 0,
            software: 0,
            implementation: 0,
            training: 0,
            professionalServices: 0
        },
        annualCosts: {
            licensing: 0,
            maintenance: 0,
            support: 0,
            personnel: 0,
            energy: 0,
            upgrades: 0,
            downtime: 150000,
            securityRisk: 500000,
            breachCost: 4250000
        },
        hiddenCosts: {
            changeManagement: 0,
            integrationComplexity: 0,
            scalabilityLimitations: 0,
            vendorLockIn: 0
        },
        metrics: {
            deploymentTime: 0,
            ftesRequired: 0,
            deviceCapacity: 0,
            scalabilityScore: 0,
            complexityScore: 0,
            securityScore: 0,
            cloudReadiness: 0,
            userExperienceScore: 0,
            automationLevel: 0,
            integrationCapabilities: 0
        },
        features: {
            authentication: "None",
            authorization: "None",
            accounting: "None",
            guestAccess: "None",
            byod: "None",
            iot: "None",
            cloudIntegration: "None",
            microsegmentation: "None",
            threatDefense: "None",
            compliance: "None"
        },
        marketInsights: {
            strengths: [],
            weaknesses: [
                "No access control",
                "No device visibility",
                "No compliance capability",
                "No threat protection",
                "Maximum security risk"
            ],
            opportunities: [],
            threats: [
                "Data breaches",
                "Compliance violations",
                "Reputation damage",
                "Financial losses",
                "Legal liabilities"
            ]
        }
    }
};

// Market trends and insights
const marketTrends = {
    cloudAdoption: {
        trend: "Accelerating",
        growth: "35% YoY",
        drivers: [
            "Remote work requirements",
            "Digital transformation",
            "Cost optimization",
            "Scalability needs"
        ]
    },
    zeroTrust: {
        trend: "Mainstream adoption",
        growth: "45% YoY",
        drivers: [
            "Sophisticated threats",
            "Perimeter dissolution",
            "Cloud migration",
            "Compliance requirements"
        ]
    },
    automation: {
        trend: "Critical requirement",
        growth: "40% YoY",
        drivers: [
            "Staff shortages",
            "Complexity reduction",
            "Response time needs",
            "Cost efficiency"
        ]
    },
    aiSecurity: {
        trend: "Emerging",
        growth: "60% YoY",
        drivers: [
            "Threat sophistication",
            "Data volume",
            "Pattern recognition",
            "Predictive security"
        ]
    }
};

// Vendor comparison metrics
function compareVendors(vendor1, vendor2) {
    const metrics = ['deploymentTime', 'ftesRequired', 'scalabilityScore', 'securityScore', 'cloudReadiness'];
    const comparison = {};
    
    metrics.forEach(metric => {
        if (typeof vendor1.metrics[metric] === 'number' && typeof vendor2.metrics[metric] === 'number') {
            comparison[metric] = {
                vendor1: vendor1.metrics[metric],
                vendor2: vendor2.metrics[metric],
                difference: vendor1.metrics[metric] - vendor2.metrics[metric],
                percentDiff: ((vendor1.metrics[metric] - vendor2.metrics[metric]) / vendor1.metrics[metric] * 100).toFixed(1)
            };
        }
    });
    
    return comparison;
}

// Calculate vendor score
function calculateVendorScore(vendorId) {
    const vendor = vendorData[vendorId];
    if (!vendor) return 0;
    
    const weights = {
        securityScore: 0.25,
        scalabilityScore: 0.15,
        cloudReadiness: 0.15,
        userExperienceScore: 0.15,
        automationLevel: 0.15,
        integrationCapabilities: 0.15
    };
    
    let totalScore = 0;
    Object.keys(weights).forEach(metric => {
        totalScore += (vendor.metrics[metric] || 0) * weights[metric];
    });
    
    return totalScore;
}

// Export for use in other modules
window.vendorData = vendorData;
window.marketTrends = marketTrends;
window.compareVendors = compareVendors;
window.calculateVendorScore = calculateVendorScore;
