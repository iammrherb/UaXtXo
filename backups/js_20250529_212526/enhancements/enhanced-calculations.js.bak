/**
 * Enhanced Calculation System
 * Adds advanced calculations without modifying existing UI
 */

(function() {
    'use strict';
    
    class EnhancedCalculationSystem {
        constructor() {
            this.calculations = {};
            this.listeners = [];
        }
        
        init() {
            this.setupCalculationMethods();
            this.connectToExistingSystem();
            console.log('✅ Enhanced Calculation System initialized');
        }
        
        setupCalculationMethods() {
            this.calculations = {
                calculateAdvancedROI: (vendor, config, baseline) => {
                    const basicROI = this.calculateBasicROI(vendor, config, baseline);
                    const riskAdjustment = this.calculateRiskAdjustment(vendor, config);
                    const efficiencyGains = this.calculateEfficiencyGains(vendor, config);
                    
                    return {
                        basic: basicROI,
                        riskAdjusted: basicROI + riskAdjustment,
                        withEfficiency: basicROI + riskAdjustment + efficiencyGains,
                        breakdown: {
                            costSavings: basicROI * 0.6,
                            riskReduction: riskAdjustment,
                            efficiency: efficiencyGains
                        }
                    };
                },
                
                calculateRiskAdjustment: (vendor, config) => {
                    const securityScore = vendor.metrics?.securityScore || 0;
                    const breachCost = config.breachCost || 4350000;
                    const riskFactor = config.riskFactor || 1.0;
                    
                    const riskReduction = (securityScore - 70) / 100;
                    return (breachCost * riskReduction * riskFactor * 0.1) / config.breachCost * 100;
                },
                
                calculateEfficiencyGains: (vendor, config) => {
                    const fteReduction = 2.0 - (vendor.metrics?.fteRequired || 1.0);
                    const fteCost = config.fteCost || 100000;
                    const years = config.analysisPeriod || 3;
                    
                    return (fteReduction * fteCost * years) / (vendor.costs?.tco3Year || 300000) * 100;
                },
                
                calculateBasicROI: (vendor, config, baseline) => {
                    const vendorTCO = vendor.costs?.tco3Year || 0;
                    const savings = baseline - vendorTCO;
                    return vendorTCO > 0 ? (savings / vendorTCO) * 100 : 0;
                }
            };
        }
        
        connectToExistingSystem() {
            // Listen for calculation events
            document.addEventListener('calculationComplete', (event) => {
                this.enhanceCalculationResults(event.detail);
            });
            
            // Listen for configuration changes
            document.addEventListener('configurationChanged', (event) => {
                this.handleConfigurationChange(event.detail);
            });
        }
        
        enhanceCalculationResults(results) {
            if (!results || !window.zeroTrustExecutivePlatform) return;
            
            const platform = window.zeroTrustExecutivePlatform;
            const vendors = platform.selectedVendors.map(id => platform.vendorData[id]);
            
            // Calculate baseline
            const baseline = this.calculateBaseline(vendors);
            
            // Enhance each vendor's calculations
            vendors.forEach(vendor => {
                const enhanced = this.calculations.calculateAdvancedROI(
                    vendor, 
                    platform.config, 
                    baseline
                );
                
                // Store enhanced calculations
                vendor.enhancedMetrics = enhanced;
            });
            
            // Notify listeners
            this.notifyListeners({ vendors, baseline, enhanced: true });
        }
        
        calculateBaseline(vendors) {
            const nonPortnox = vendors.filter(v => v.shortName !== 'Portnox');
            if (nonPortnox.length === 0) return 400000; // Default baseline
            
            return nonPortnox.reduce((sum, v) => sum + (v.costs?.tco3Year || 0), 0) / nonPortnox.length;
        }
        
        handleConfigurationChange(config) {
            // Trigger recalculation with new config
            if (window.zeroTrustExecutivePlatform) {
                window.zeroTrustExecutivePlatform.config = { 
                    ...window.zeroTrustExecutivePlatform.config, 
                    ...config 
                };
            }
        }
        
        notifyListeners(data) {
            this.listeners.forEach(listener => {
                try {
                    listener(data);
                } catch (error) {
                    console.error('Error in calculation listener:', error);
                }
            });
        }
        
        onCalculation(callback) {
            if (typeof callback === 'function') {
                this.listeners.push(callback);
            }
        }
    }
    
    // Initialize when ready
    document.addEventListener('DOMContentLoaded', () => {
        window.enhancedCalculationSystem = new EnhancedCalculationSystem();
        window.enhancedCalculationSystem.init();
    });
})();
