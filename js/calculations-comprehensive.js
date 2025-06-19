// Comprehensive TCO Calculations with Real Market Data
const ComprehensiveCalculations = {
    // Organization size factors
    sizeFactors: {
        small: { devices: 500, employees: 100, sites: 1 },
        medium: { devices: 2500, employees: 500, sites: 3 },
        large: { devices: 10000, employees: 2000, sites: 8 },
        enterprise: { devices: 50000, employees: 10000, sites: 25 }
    },
    
    // Industry-specific factors
    industryFactors: {
        healthcare: {
            complianceMultiplier: 1.8,
            riskMultiplier: 2.2,
            downtime: 5000, // Cost per hour
            dataBreachCost: 10500000
        },
        finance: {
            complianceMultiplier: 2.0,
            riskMultiplier: 2.5,
            downtime: 12000,
            dataBreachCost: 12800000
        },
        retail: {
            complianceMultiplier: 1.3,
            riskMultiplier: 1.5,
            downtime: 3500,
            dataBreachCost: 3900000
        },
        manufacturing: {
            complianceMultiplier: 1.2,
            riskMultiplier: 1.6,
            downtime: 8000,
            dataBreachCost: 4200000
        },
        education: {
            complianceMultiplier: 1.1,
            riskMultiplier: 1.3,
            downtime: 2000,
            dataBreachCost: 3500000
        },
        technology: {
            complianceMultiplier: 1.4,
            riskMultiplier: 1.8,
            downtime: 6000,
            dataBreachCost: 7800000
        }
    },
    
    calculateTCO(vendor, orgSize, industry, years = 5) {
        const size = this.sizeFactors[orgSize] || this.sizeFactors.medium;
        const industryFactor = this.industryFactors[industry] || this.industryFactors.technology;
        const vendorData = window.vendorData[vendor];
        
        if (!vendorData) {
            console.error(`Vendor data not found for: ${vendor}`);
            return null;
        }
        
        const costs = {
            capex: 0,
            opex: 0,
            implementation: 0,
            operational: 0,
            hidden: 0,
            risk: 0
        };
        
        // Calculate based on vendor type
        if (vendorData.type === 'cloud-native' || vendorData.type === 'cloud-radius') {
            costs.capex = 0; // No upfront hardware
            
            // Subscription costs
            if (vendorData.pricing.tiers) {
                const tier = this.selectTier(vendorData.pricing.tiers, size.devices);
                costs.opex = tier.annual * years;
            } else if (vendorData.pricing.pricePerDevice) {
                const priceKey = size.devices < 1000 ? 'small' : 
                               size.devices < 5000 ? 'medium' : 
                               size.devices < 20000 ? 'large' : 'enterprise';
                costs.opex = vendorData.pricing.pricePerDevice[priceKey] * size.devices * years;
            }
            
            // Implementation
            costs.implementation = vendorData.implementation ? 
                (vendorData.implementation.professionalServices || 5000) : 5000;
            
            // Minimal operational costs for cloud
            costs.operational = vendor === 'portnox' ? 
                (0.25 * 120000 * years) : // 0.25 FTE
                (0.5 * 120000 * years);   // 0.5 FTE for others
                
        } else {
            // Legacy/On-premise vendors
            const pricing = vendorData.pricing;
            
            // Capital expenses
            if (pricing.licenses) {
                costs.capex += pricing.licenses.base || 0;
                costs.capex += (pricing.licenses.device || 0) * size.devices;
            }
            
            if (pricing.hardware) {
                const hwKey = size.devices < 5000 ? 'small' :
                             size.devices < 15000 ? 'medium' : 'large';
                costs.capex += pricing.hardware[hwKey] || 0;
                costs.capex += costs.capex * ((pricing.hardware.redundancy || 1.5) - 1); // HA costs
            }
            
            // Operating expenses
            if (pricing.licenses) {
                costs.opex += (pricing.licenses.subscription || 0) * size.devices * years;
                costs.opex += costs.capex * (pricing.licenses.maintenance || 0.2) * years;
            }
            
            // Implementation
            if (vendorData.implementation) {
                costs.implementation = vendorData.implementation.professionalServices || 
                    (vendorData.implementation.consultingHours * vendorData.implementation.consultingRate);
            }
            
            // Operational costs
            if (vendorData.operationalCosts) {
                const opCosts = vendorData.operationalCosts;
                costs.operational += (opCosts.fteRequired || 2) * (opCosts.avgSalary || 120000) * years;
                costs.operational += (opCosts.powerCooling || 0) * years;
                costs.operational += (opCosts.datacenterSpace || 0) * years;
                costs.operational += (opCosts.networkBandwidth || 0) * years;
            } else {
                // Default operational costs for legacy
                costs.operational = 2.5 * 120000 * years + 25000 * years;
            }
        }
        
        // Hidden costs calculation
        costs.hidden = this.calculateHiddenCosts(vendor, vendorData, size, years);
        
        // Risk costs calculation
        costs.risk = this.calculateRiskCosts(vendor, vendorData, industryFactor, size, years);
        
        // Apply industry multipliers
        costs.opex *= industryFactor.complianceMultiplier;
        costs.risk *= industryFactor.riskMultiplier;
        
        // Calculate totals
        const totalCost = Object.values(costs).reduce((sum, cost) => sum + cost, 0);
        
        return {
            vendor: vendor,
            costs: costs,
            totalCost: totalCost,
            annualCost: totalCost / years,
            costPerDevice: totalCost / size.devices,
            breakdown: {
                capexPercent: (costs.capex / totalCost * 100).toFixed(1),
                opexPercent: (costs.opex / totalCost * 100).toFixed(1),
                operationalPercent: (costs.operational / totalCost * 100).toFixed(1),
                riskPercent: (costs.risk / totalCost * 100).toFixed(1)
            }
        };
    },
    
    calculateHiddenCosts(vendor, vendorData, size, years) {
        let hidden = 0;
        
        // Downtime costs
        if (vendor === 'portnox') {
            hidden += 2 * 4 * 3000 * years; // 2 hours/year, $3000/hour
        } else if (vendorData.type === 'legacy') {
            hidden += 24 * 4 * 3000 * years; // 24 hours/year maintenance
        } else {
            hidden += 8 * 4 * 3000 * years; // 8 hours/year
        }
        
        // Training costs
        if (vendorData.type === 'legacy') {
            hidden += 40 * 200 * (size.employees / 100); // Training hours
        } else if (vendor !== 'portnox') {
            hidden += 16 * 200 * (size.employees / 100);
        } else {
            hidden += 4 * 200 * (size.employees / 100); // Minimal training
        }
        
        // Integration complexity
        if (vendorData.type === 'legacy') {
            hidden += 50000; // Complex integrations
        } else if (vendor !== 'portnox') {
            hidden += 20000;
        } else {
            hidden += 5000; // Simple API integrations
        }
        
        return hidden;
    },
    
    calculateRiskCosts(vendor, vendorData, industryFactor, size, years) {
        const riskData = window.riskData.categories;
        let totalRiskCost = 0;
        
        Object.keys(riskData).forEach(riskType => {
            const risk = riskData[riskType];
            let probability;
            
            if (vendor === 'portnox') {
                probability = risk.probability.withNAC.portnox;
            } else if (vendor === 'cisco') {
                probability = risk.probability.withNAC.cisco;
            } else if (vendorData.type === 'legacy') {
                probability = risk.probability.withNAC.legacy;
            } else {
                probability = risk.probability.noNAC;
            }
            
            // Annual expected loss
            const annualLoss = probability * risk.impact;
            totalRiskCost += annualLoss * years;
        });
        
        // Cyber insurance adjustments
        const insuranceData = window.riskData.cyberInsurance;
        const sizeKey = size.devices < 1000 ? 'small' :
                       size.devices < 5000 ? 'medium' :
                       size.devices < 20000 ? 'large' : 'enterprise';
        
        const basePremium = insuranceData.basePremium[sizeKey];
        const premiumFactor = insuranceData.premiumFactors[vendor] || 
                             insuranceData.premiumFactors.legacyNAC;
        
        totalRiskCost += basePremium * premiumFactor * years;
        
        return totalRiskCost;
    },
    
    selectTier(tiers, deviceCount) {
        // Find the most appropriate tier
        for (let i = tiers.length - 1; i >= 0; i--) {
            if (deviceCount >= tiers[i].devices) {
                return tiers[i];
            }
        }
        return tiers[0];
    },
    
    compareVendors(vendors, orgSize, industry, years = 5) {
        const results = vendors.map(vendor => this.calculateTCO(vendor, orgSize, industry, years));
        
        // Sort by total cost
        results.sort((a, b) => a.totalCost - b.totalCost);
        
        // Calculate savings vs most expensive
        const maxCost = Math.max(...results.map(r => r.totalCost));
        results.forEach(result => {
            result.savings = maxCost - result.totalCost;
            result.savingsPercent = (result.savings / maxCost * 100).toFixed(1);
        });
        
        return results;
    },
    
    generateROIAnalysis(portnoxCost, competitorCost, implementationTime) {
        const monthlySavings = (competitorCost.annualCost - portnoxCost.annualCost) / 12;
        const breakEvenMonths = portnoxCost.costs.implementation / monthlySavings;
        
        return {
            monthlySavings: monthlySavings,
            breakEvenMonths: Math.max(0, breakEvenMonths),
            fiveYearROI: ((competitorCost.totalCost - portnoxCost.totalCost) / portnoxCost.totalCost * 100),
            netPresentValue: this.calculateNPV(portnoxCost, competitorCost, 5, 0.08)
        };
    },
    
    calculateNPV(portnoxCost, competitorCost, years, discountRate) {
        let npv = 0;
        for (let year = 1; year <= years; year++) {
            const annualSavings = competitorCost.annualCost - portnoxCost.annualCost;
            npv += annualSavings / Math.pow(1 + discountRate, year);
        }
        return npv - portnoxCost.costs.implementation;
    }
};

// Export globally
window.ComprehensiveCalculations = ComprehensiveCalculations;

console.log('✅ Comprehensive calculations module loaded');
