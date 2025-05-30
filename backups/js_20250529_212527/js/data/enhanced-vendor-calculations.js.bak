/**
 * Enhanced Vendor Calculations - Using Comprehensive Market Data
 */

class VendorCalculator {
    constructor() {
        this.vendorData = window.comprehensiveVendorData;
        this.portnoxPricing = 3.5; // Default, adjustable
    }
    
    setPortnoxPricing(pricePerDevice) {
        this.portnoxPricing = pricePerDevice;
        if (this.vendorData?.vendors?.portnox) {
            this.vendorData.vendors.portnox.pricing.perDevice = pricePerDevice;
        }
    }
    
    calculateVendorTCO(vendorKey, config) {
        if (!this.vendorData) return null;
        return this.vendorData.calculateTCO(vendorKey, config);
    }
    
    calculateROI(vendorKey, baselineVendor, config) {
        if (!this.vendorData) return null;
        return this.vendorData.calculateROI(vendorKey, baselineVendor, config);
    }
    
    calculateRiskMetrics(vendorKey, config) {
        if (!this.vendorData) return null;
        return this.vendorData.calculateRiskScore(vendorKey, config);
    }
    
    generateVendorComparison(config) {
        if (!this.vendorData) return {};
        
        const vendors = {};
        const allVendors = this.vendorData.getAllVendors();
        
        Object.keys(allVendors).forEach(vendorKey => {
            const vendorInfo = this.vendorData.getVendorData(vendorKey);
            const tcoData = this.calculateVendorTCO(vendorKey, config);
            const roiData = this.calculateROI(vendorKey, 'cisco', config);
            const riskMetrics = this.calculateRiskMetrics(vendorKey, config);
            const score = this.vendorData.getVendorScore(vendorKey, config);
            
            if (vendorInfo && tcoData && roiData && riskMetrics) {
                vendors[vendorKey] = {
                    key: vendorKey,
                    name: vendorInfo.name,
                    category: vendorInfo.category,
                    metrics: {
                        ...vendorInfo.operational,
                        ...vendorInfo.technical,
                        ...vendorInfo.business,
                        implementationDays: vendorInfo.implementation.days,
                        pricePerDevice: vendorInfo.pricing.perDevice
                    },
                    vendorInfo: vendorInfo,
                    tco: tcoData,
                    roi: roiData,
                    risk: riskMetrics,
                    score: score
                };
            }
        });
        
        return vendors;
    }
}

// Create global instance
window.vendorCalculator = new VendorCalculator();

console.log('✅ Enhanced Vendor Calculations loaded');
