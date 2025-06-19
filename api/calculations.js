// Enhanced TCO Calculation Engine with Per-Device Pricing
class TCOCalculator {
    constructor() {
        this.vendors = {};
        this.deviceCount = 500;
        this.years = 3;
    }

    calculateTCO(vendor, devices, years) {
        const baseline = vendor.baseline_500_devices;
        const scaleFactor = devices / 500;
        
        // Calculate based on per-device pricing tiers if available
        let licensing;
        if (vendor.per_device_pricing && vendor.per_device_pricing.tiers) {
            licensing = this.calculateTieredPricing(vendor.per_device_pricing.tiers, devices, years);
        } else {
            licensing = this.calculateLicensing(baseline.licensing, scaleFactor, years);
        }
        
        const implementation = baseline.implementation.professional_services;
        const fte = baseline.fte_requirements.annual_cost * years * scaleFactor;
        const infrastructure = this.calculateInfrastructure(baseline.infrastructure, scaleFactor, years);
        const support = baseline.support.annual_cost * years;
        
        return {
            licensing,
            implementation,
            fte,
            infrastructure,
            support,
            total: licensing + implementation + fte + infrastructure + support,
            breakdown: {
                licensing_percent: (licensing / (licensing + implementation + fte + infrastructure + support)) * 100,
                implementation_percent: (implementation / (licensing + implementation + fte + infrastructure + support)) * 100,
                fte_percent: (fte / (licensing + implementation + fte + infrastructure + support)) * 100,
                infrastructure_percent: (infrastructure / (licensing + implementation + fte + infrastructure + support)) * 100,
                support_percent: (support / (licensing + implementation + fte + infrastructure + support)) * 100
            }
        };
    }

    calculateTieredPricing(tiers, devices, years) {
        let pricePerDevice = 0;
        
        for (const tier of tiers) {
            if (devices >= tier.min && (tier.max === null || devices <= tier.max)) {
                pricePerDevice = tier.price_per_device;
                break;
            }
        }
        
        return pricePerDevice * devices * years;
    }

    calculateLicensing(licensing, scaleFactor, years) {
        if (licensing.model === 'subscription') {
            return (licensing.annual || 0) * years + 
                   (licensing.per_device || 0) * 500 * scaleFactor * years;
        } else {
            // Perpetual licensing
            let total = 0;
            Object.entries(licensing).forEach(([key, value]) => {
                if (typeof value === 'number' && key !== 'annual_maintenance') {
                    total += value * scaleFactor;
                }
            });
            total += (licensing.annual_maintenance || 0) * years;
            return total;
        }
    }

    calculateInfrastructure(infrastructure, scaleFactor, years) {
        if (infrastructure.cloud_hosted) {
            return (infrastructure.annual_cost || 0) * years;
        } else {
            const hardware = (infrastructure.hardware_cost || 0) + 
                           (infrastructure.redundancy_cost || 0) + 
                           (infrastructure.redundancy_hardware || 0);
            const maintenance = (infrastructure.annual_maintenance || 0) * years;
            return hardware * Math.ceil(scaleFactor) + maintenance;
        }
    }

    compareVendors(vendorList, devices, years) {
        const results = {};
        
        vendorList.forEach(vendorKey => {
            const vendor = this.vendors[vendorKey];
            if (vendor) {
                results[vendorKey] = this.calculateTCO(vendor, devices, years);
            }
        });
        
        // Sort by total TCO
        const sorted = Object.entries(results)
            .sort(([,a], [,b]) => a.total - b.total)
            .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
        
        return sorted;
    }

    calculateROI(currentCosts, newVendor, devices, years) {
        const newCosts = this.calculateTCO(newVendor, devices, years);
        const savings = currentCosts - newCosts.total;
        const roi = (savings / newCosts.implementation) * 100;
        const paybackPeriod = newCosts.implementation / (savings / years);
        
        return {
            savings,
            roi,
            paybackPeriod,
            breakEvenMonth: Math.ceil(paybackPeriod * 12),
            savingsPercentage: (savings / currentCosts) * 100
        };
    }

    calculateSecurityImpact(vendor) {
        const cloudBonus = vendor.type.includes('Cloud') ? 20 : 0;
        const zeroTrustBonus = vendor.advanced_features?.zero_trust_network_access ? 15 : 0;
        const automationBonus = vendor.advanced_features?.api_driven ? 10 : 0;
        
        return {
            riskReduction: 65 + cloudBonus + zeroTrustBonus + automationBonus,
            incidentReduction: 70 + cloudBonus + automationBonus,
            complianceScore: 85 + cloudBonus + zeroTrustBonus,
            mttrReduction: 80 + automationBonus
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TCOCalculator;
}
