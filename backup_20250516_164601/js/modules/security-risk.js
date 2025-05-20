/**
 * Security Risk and Breach Impact Module
 */
const SecurityRiskModule = (function() {
    // Risk levels and definitions
    const riskLevels = {
        high: {
            label: "High",
            description: "Significant risk requiring immediate attention",
            color: "#f44336",
            score: 75
        },
        medium: {
            label: "Medium",
            description: "Moderate risk requiring attention",
            color: "#ff9800",
            score: 50
        },
        low: {
            label: "Low",
            description: "Manageable risk with proper controls",
            color: "#4caf50",
            score: 25
        }
    };

    // Risk categories and impact by security control implementation
    const riskCategories = {
        dataBreachRisk: {
            name: "Data Breach Risk",
            description: "Risk of unauthorized access to sensitive information",
            noNac: "high",
            basicNac: "medium",
            portnoxCloud: "low",
            impact: {
                financial: 0.7,
                reputation: 0.9,
                operational: 0.5,
                compliance: 0.8
            }
        },
        unauthorizedAccess: {
            name: "Unauthorized Access",
            description: "Risk of unauthorized users accessing network resources",
            noNac: "high",
            basicNac: "medium",
            portnoxCloud: "low",
            impact: {
                financial: 0.5,
                reputation: 0.4,
                operational: 0.7,
                compliance: 0.6
            }
        },
        complianceViolation: {
            name: "Compliance Violation",
            description: "Risk of failing to meet regulatory requirements",
            noNac: "high",
            basicNac: "medium",
            portnoxCloud: "low",
            impact: {
                financial: 0.8,
                reputation: 0.7,
                operational: 0.3,
                compliance: 1.0
            }
        },
        maliciousInsider: {
            name: "Malicious Insider",
            description: "Risk from insider threats and privileged user abuse",
            noNac: "medium",
            basicNac: "medium",
            portnoxCloud: "low",
            impact: {
                financial: 0.6,
                reputation: 0.7,
                operational: 0.7,
                compliance: 0.5
            }
        },
        ransomwareAttack: {
            name: "Ransomware Attack",
            description: "Risk of ransomware spreading across the network",
            noNac: "high",
            basicNac: "medium",
            portnoxCloud: "low",
            impact: {
                financial: 0.8,
                reputation: 0.6,
                operational: 0.9,
                compliance: 0.4
            }
        },
        shadowIT: {
            name: "Shadow IT",
            description: "Risk from unauthorized devices and applications",
            noNac: "high",
            basicNac: "high",
            portnoxCloud: "low",
            impact: {
                financial: 0.5,
                reputation: 0.3,
                operational: 0.7,
                compliance: 0.6
            }
        },
        outdatedDevices: {
            name: "Outdated Devices",
            description: "Risk from unpatched and vulnerable devices",
            noNac: "high",
            basicNac: "medium",
            portnoxCloud: "low",
            impact: {
                financial: 0.6,
                reputation: 0.4,
                operational: 0.8,
                compliance: 0.5
            }
        }
    };

    // Breach cost data by industry
    const breachCostData = {
        healthcare: {
            averageCost: 9800000,
            perRecord: 511,
            probability: 0.328
        },
        financial: {
            averageCost: 6080000,
            perRecord: 402,
            probability: 0.297
        },
        education: {
            averageCost: 3850000,
            perRecord: 187,
            probability: 0.246
        },
        manufacturing: {
            averageCost: 5560000,
            perRecord: 241,
            probability: 0.257
        },
        retail: {
            averageCost: 4240000,
            perRecord: 218,
            probability: 0.236
        },
        government: {
            averageCost: 5100000,
            perRecord: 272,
            probability: 0.267
        },
        energy: {
            averageCost: 5750000,
            perRecord: 280,
            probability: 0.260
        },
        default: {
            averageCost: 4350000,
            perRecord: 225,
            probability: 0.25
        }
    };

    // NAC mitigation factors
    const nacMitigationFactors = {
        portnoxCloud: {
            breachProbability: 0.75, // Reduces probability by 75%
            breachImpact: 0.65,      // Reduces impact by 65%
            detectionTime: 0.85,     // Reduces detection time by 85%
            responseTime: 0.80,      // Reduces response time by 80%
            dwell time: 0.70         // Reduces dwell time by 70%
        },
        traditional: {
            breachProbability: 0.55, // Reduces probability by 55%
            breachImpact: 0.45,      // Reduces impact by 45%
            detectionTime: 0.60,     // Reduces detection time by 60%
            responseTime: 0.55,      // Reduces response time by 55%
            dwell time: 0.50         // Reduces dwell time by 50%
        }
    };

    // Insurance premium impact data
    const insurancePremiumData = {
        baseRate: function(industry, devices) {
            const baseCosts = {
                healthcare: 35,
                financial: 40,
                retail: 25,
                education: 20,
                government: 30,
                manufacturing: 28,
                energy: 32,
                default: 30
            };
            
            // Per device rate with volume discount
            const rate = baseCosts[industry] || baseCosts.default;
            const scaleFactor = Math.pow(devices / 1000, -0.2); // Slight discount for volume
            
            return rate * scaleFactor;
        },
        
        discountFactors: {
            noNac: 1.0, // No discount
            basicNac: 0.85, // 15% discount
            portnoxCloud: 0.60 // 40% discount
        },
        
        calculatePremium: function(industry, devices, nacType) {
            const baseRate = this.baseRate(industry, devices);
            const discount = this.discountFactors[nacType] || 1.0;
            
            return Math.round(baseRate * devices * discount);
        }
    };

    // Get risk assessment data for heatmap
    function getRiskAssessmentData() {
        const result = [];
        
        Object.keys(riskCategories).forEach(key => {
            result.push({
                category: riskCategories[key].name,
                noNac: riskLevels[riskCategories[key].noNac].label,
                basicNac: riskLevels[riskCategories[key].basicNac].label,
                portnox: riskLevels[riskCategories[key].portnoxCloud].label
            });
        });
        
        return result;
    }

    // Calculate security improvement percentage
    function calculateSecurityImprovement(nacType) {
        let noNacScore = 0;
        let nacScore = 0;
        let maxPossibleScore = 0;
        
        Object.keys(riskCategories).forEach(key => {
            noNacScore += riskLevels[riskCategories[key].noNac].score;
            nacScore += riskLevels[riskCategories[key][nacType]].score;
            maxPossibleScore += riskLevels.high.score;
        });
        
        // Invert the scale since lower risk scores are better
        const noNacSecurity = maxPossibleScore - noNacScore;
        const nacSecurity = maxPossibleScore - nacScore;
        
        // Calculate percentage improvement
        return Math.round(((nacSecurity - noNacSecurity) / noNacSecurity) * 100);
    }

    // Calculate breach risk and costs
    function calculateBreachRisk(params) {
        const industry = params.industry || 'default';
        const deviceCount = params.deviceCount || 1000;
        const nacType = params.nacType || 'noNac';
        
        // Get industry breach data
        const breachData = breachCostData[industry] || breachCostData.default;
        
        // Calculate base annual risk
        const baseAnnualRisk = breachData.averageCost * breachData.probability;
        
        // Apply mitigation factor based on NAC type
        let mitigatedRisk = baseAnnualRisk;
        if (nacType === 'portnoxCloud') {
            mitigatedRisk = baseAnnualRisk * (1 - nacMitigationFactors.portnoxCloud.breachProbability);
        } else if (nacType === 'basicNac') {
            mitigatedRisk = baseAnnualRisk * (1 - nacMitigationFactors.traditional.breachProbability);
        }
        
        // Scale based on device count
        const deviceScaleFactor = Math.pow(deviceCount / 1000, 0.7);
        mitigatedRisk = mitigatedRisk * deviceScaleFactor;
        
        return {
            baseRisk: Math.round(baseAnnualRisk * deviceScaleFactor),
            mitigatedRisk: Math.round(mitigatedRisk),
            reductionAmount: Math.round((baseAnnualRisk * deviceScaleFactor) - mitigatedRisk),
            reductionPercentage: nacType === 'noNac' ? 0 : 
                Math.round(nacType === 'portnoxCloud' ? 
                    nacMitigationFactors.portnoxCloud.breachProbability * 100 : 
                    nacMitigationFactors.traditional.breachProbability * 100)
        };
    }

    // Calculate insurance premium impact
    function calculateInsurancePremium(params) {
        const industry = params.industry || 'default';
        const deviceCount = params.deviceCount || 1000;
        
        // Calculate premiums for different NAC types
        const noNacPremium = insurancePremiumData.calculatePremium(industry, deviceCount, 'noNac');
        const basicNacPremium = insurancePremiumData.calculatePremium(industry, deviceCount, 'basicNac');
        const portnoxPremium = insurancePremiumData.calculatePremium(industry, deviceCount, 'portnoxCloud');
        
        return {
            noNacPremium,
            basicNacPremium,
            portnoxPremium,
            portnoxSavings: noNacPremium - portnoxPremium,
            portnoxSavingsPercentage: Math.round((noNacPremium - portnoxPremium) / noNacPremium * 100),
            basicNacSavings: noNacPremium - basicNacPremium,
            basicNacSavingsPercentage: Math.round((noNacPremium - basicNacPremium) / noNacPremium * 100)
        };
    }

    // Return public API
    return {
        getRiskLevels: function() { return {...riskLevels}; },
        getRiskCategories: function() { return {...riskCategories}; },
        getBreachCostData: function() { return {...breachCostData}; },
        getNacMitigationFactors: function() { return {...nacMitigationFactors}; },
        getRiskAssessmentData,
        calculateSecurityImprovement,
        calculateBreachRisk,
        calculateInsurancePremium
    };
})();

// Export for browser or Node.js
if (typeof window !== 'undefined') {
    window.SecurityRiskModule = SecurityRiskModule;
} else if (typeof module !== 'undefined') {
    module.exports = SecurityRiskModule;
}
