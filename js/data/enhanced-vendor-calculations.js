/**
 * Enhanced Vendor Calculations - Consistent TCO/ROI Framework
 */

class VendorCalculator {
    constructor() {
        this.baseMetrics = {
            portnox: {
                pricePerDevice: 3.5,
                implementationDays: 21,
                fteRequired: 0.25,
                securityScore: 95,
                userSatisfaction: 92,
                supportQuality: 94
            },
            cisco: {
                pricePerDevice: 8.5,
                implementationDays: 90,
                fteRequired: 2.0,
                securityScore: 85,
                userSatisfaction: 75,
                supportQuality: 80
            },
            aruba: {
                pricePerDevice: 7.2,
                implementationDays: 75,
                fteRequired: 1.75,
                securityScore: 82,
                userSatisfaction: 78,
                supportQuality: 82
            },
            forescout: {
                pricePerDevice: 6.8,
                implementationDays: 60,
                fteRequired: 1.5,
                securityScore: 88,
                userSatisfaction: 80,
                supportQuality: 85
            },
            fortinet: {
                pricePerDevice: 5.9,
                implementationDays: 45,
                fteRequired: 1.25,
                securityScore: 90,
                userSatisfaction: 83,
                supportQuality: 86
            }
        };
    }
    
    calculateVendorTCO(vendorKey, config) {
        const vendor = this.baseMetrics[vendorKey];
        const deviceCount = config.deviceCount || 1000;
        const years = config.analysisPeriod || 3;
        const fteCost = config.fteCost || 100000;
        
        // Software/License Costs
        const annualLicenseCost = vendor.pricePerDevice * deviceCount * 12;
        const totalLicenseCost = annualLicenseCost * years;
        
        // Implementation Costs
        const implementationCost = this.calculateImplementationCost(vendor, config);
        
        // Operational Costs
        const annualOperationalCost = vendor.fteRequired * fteCost;
        const totalOperationalCost = annualOperationalCost * years;
        
        // Infrastructure Costs (cloud vendors have lower infra costs)
        const isCloudNative = vendorKey === 'portnox';
        const annualInfraCost = isCloudNative ? 0 : (deviceCount * 2.5 * 12);
        const totalInfraCost = annualInfraCost * years;
        
        // Training & Support
        const annualTrainingCost = isCloudNative ? 5000 : 15000;
        const totalTrainingCost = annualTrainingCost * years;
        
        // Hidden Costs (downtime, inefficiencies)
        const hiddenCostMultiplier = 1 + ((100 - vendor.userSatisfaction) / 200);
        
        // Calculate TCO
        const subtotal = totalLicenseCost + implementationCost + totalOperationalCost + 
                        totalInfraCost + totalTrainingCost;
        const tco = Math.round(subtotal * hiddenCostMultiplier);
        
        return {
            tco: tco,
            breakdown: {
                license: totalLicenseCost,
                implementation: implementationCost,
                operational: totalOperationalCost,
                infrastructure: totalInfraCost,
                training: totalTrainingCost,
                hidden: Math.round(subtotal * (hiddenCostMultiplier - 1))
            },
            annual: Math.round(tco / years),
            monthly: Math.round(tco / (years * 12))
        };
    }
    
    calculateImplementationCost(vendor, config) {
        const baseCost = vendor.implementationDays * 1000; // $1000/day
        const complexityMultiplier = 1 + (config.locationCount - 1) * 0.1;
        const sizeFactor = config.deviceCount / 1000;
        
        return Math.round(baseCost * complexityMultiplier * Math.sqrt(sizeFactor));
    }
    
    calculateROI(vendorKey, baselineVendor, config) {
        const vendorTCO = this.calculateVendorTCO(vendorKey, config);
        const baselineTCO = this.calculateVendorTCO(baselineVendor || 'cisco', config);
        
        const savings = baselineTCO.tco - vendorTCO.tco;
        const investment = vendorTCO.breakdown.implementation + vendorTCO.breakdown.license / config.analysisPeriod;
        
        const roi = Math.round((savings / investment) * 100);
        const paybackMonths = Math.round((investment / (savings / (config.analysisPeriod * 12))));
        
        return {
            roi: roi,
            paybackMonths: paybackMonths,
            savings: savings,
            savingsPercent: Math.round((savings / baselineTCO.tco) * 100)
        };
    }
    
    generateVendorComparison(config) {
        const vendors = {};
        
        Object.keys(this.baseMetrics).forEach(vendorKey => {
            const tcoData = this.calculateVendorTCO(vendorKey, config);
            const roiData = this.calculateROI(vendorKey, 'cisco', config);
            
            vendors[vendorKey] = {
                key: vendorKey,
                name: this.getVendorName(vendorKey),
                metrics: this.baseMetrics[vendorKey],
                tco: tcoData,
                roi: roiData,
                score: this.calculateVendorScore(vendorKey, tcoData, roiData)
            };
        });
        
        return vendors;
    }
    
    calculateVendorScore(vendorKey, tcoData, roiData) {
        const vendor = this.baseMetrics[vendorKey];
        
        // Weighted scoring
        const weights = {
            tco: 0.3,
            security: 0.25,
            implementation: 0.15,
            operational: 0.15,
            satisfaction: 0.15
        };
        
        // Normalize scores (higher is better)
        const tcoScore = 100 - (tcoData.tco / 500000) * 100; // Normalize against $500k
        const securityScore = vendor.securityScore;
        const implementationScore = 100 - (vendor.implementationDays / 100) * 100;
        const operationalScore = 100 - (vendor.fteRequired * 25); // 4 FTE = 0 score
        const satisfactionScore = vendor.userSatisfaction;
        
        const totalScore = 
            (tcoScore * weights.tco) +
            (securityScore * weights.security) +
            (implementationScore * weights.implementation) +
            (operationalScore * weights.operational) +
            (satisfactionScore * weights.satisfaction);
        
        return Math.round(totalScore);
    }
    
    getVendorName(key) {
        const names = {
            portnox: 'Portnox CLEAR',
            cisco: 'Cisco ISE',
            aruba: 'Aruba ClearPass',
            forescout: 'Forescout',
            fortinet: 'FortiNAC'
        };
        return names[key] || key;
    }
}

// Create global instance
window.vendorCalculator = new VendorCalculator();

console.log('✅ Enhanced Vendor Calculations loaded');
