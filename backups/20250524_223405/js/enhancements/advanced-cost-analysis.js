/**
 * Advanced Cost Analysis Module
 * Provides sophisticated cost modeling and analysis capabilities
 */

window.advancedCostAnalysis = (function() {
    'use strict';
    
    const module = {
        initialized: false,
        models: {},
        calculators: {},
        visualizations: {}
    };
    
    /**
     * Initialize the advanced cost analysis module
     */
    module.init = function() {
        console.log('🚀 Initializing Advanced Cost Analysis...');
        
        try {
            // Initialize cost models
            this.initializeCostModels();
            
            // Initialize calculators
            this.initializeCalculators();
            
            // Setup integrations
            this.setupIntegrations();
            
            this.initialized = true;
            console.log('✅ Advanced Cost Analysis initialized successfully');
            
        } catch (error) {
            console.error('❌ Failed to initialize cost analysis:', error);
        }
    };
    
    /**
     * Initialize cost models
     */
    module.initializeCostModels = function() {
        this.models = {
            tco: {
                name: 'Total Cost of Ownership',
                components: ['licensing', 'implementation', 'operations', 'hidden'],
                calculate: function(params) {
                    return {
                        year1: params.licensing + params.implementation + params.operations,
                        year3: params.licensing * 3 + params.implementation + params.operations * 3,
                        year5: params.licensing * 5 + params.implementation + params.operations * 5
                    };
                }
            },
            roi: {
                name: 'Return on Investment',
                calculate: function(params) {
                    const savings = params.currentCost - params.newCost;
                    const investment = params.newCost;
                    return (savings / investment) * 100;
                }
            },
            payback: {
                name: 'Payback Period',
                calculate: function(params) {
                    const monthlySavings = (params.currentCost - params.newCost) / 12;
                    return params.implementation / monthlySavings;
                }
            }
        };
    };
    
    /**
     * Initialize calculators
     */
    module.initializeCalculators = function() {
        this.calculators = {
            hiddenCosts: function(vendor) {
                const hidden = {
                    'portnox': 0, // No hidden costs
                    'cisco': 250000, // Hardware, upgrades, complexity
                    'aruba': 150000, // Hardware, licensing complexity
                    'default': 100000
                };
                return hidden[vendor] || hidden.default;
            },
            
            operationalEfficiency: function(vendor) {
                const efficiency = {
                    'portnox': 0.25, // 75% reduction in operational overhead
                    'cisco': 2.0, // 100% increase in operational overhead
                    'aruba': 1.5, // 50% increase
                    'default': 1.0
                };
                return efficiency[vendor] || efficiency.default;
            },
            
            riskAdjustedCost: function(baseCost, riskScore) {
                // Higher risk score = lower additional cost
                const riskMultiplier = 1 + ((100 - riskScore) / 100);
                return baseCost * riskMultiplier;
            }
        };
    };
    
    /**
     * Setup integrations with main platform
     */
    module.setupIntegrations = function() {
        // Wait for platform to be ready
        if (window.portnoxPlatform) {
            window.portnoxPlatform.costAnalysis = this;
            console.log('✅ Cost analysis integrated with main platform');
        } else {
            // Retry after a delay
            setTimeout(() => this.setupIntegrations(), 500);
        }
    };
    
    /**
     * Advanced TCO calculation
     */
    module.calculateAdvancedTCO = function(params) {
        const {
            vendor,
            deviceCount,
            years = 3,
            includeHidden = true,
            includeRisk = true
        } = params;
        
        const vendorData = window.portnoxPlatform?.vendorData[vendor];
        if (!vendorData) {
            console.error('Vendor data not found:', vendor);
            return null;
        }
        
        // Base costs
        const licensing = vendorData.pricing.basePrice * deviceCount * 12 * years;
        const implementation = vendorData.costs.implementation;
        const operational = vendorData.costs.personnelPerYear * years;
        
        // Hidden costs
        const hidden = includeHidden ? this.calculators.hiddenCosts(vendor) : 0;
        
        // Risk-adjusted costs
        let total = licensing + implementation + operational + hidden;
        if (includeRisk) {
            const riskScore = vendorData.security.overallSecurityScore;
            total = this.calculators.riskAdjustedCost(total, riskScore);
        }
        
        return {
            licensing,
            implementation,
            operational,
            hidden,
            total,
            perDevice: total / deviceCount,
            perYear: total / years,
            breakdown: {
                licensingPercent: (licensing / total) * 100,
                implementationPercent: (implementation / total) * 100,
                operationalPercent: (operational / total) * 100,
                hiddenPercent: (hidden / total) * 100
            }
        };
    };
    
    /**
     * Comparative analysis
     */
    module.compareVendors = function(vendors, params) {
        const results = {};
        
        vendors.forEach(vendor => {
            results[vendor] = this.calculateAdvancedTCO({
                vendor,
                ...params
            });
        });
        
        // Find best value
        let lowestCost = Infinity;
        let bestVendor = null;
        
        Object.entries(results).forEach(([vendor, data]) => {
            if (data.total < lowestCost) {
                lowestCost = data.total;
                bestVendor = vendor;
            }
        });
        
        // Calculate savings
        Object.entries(results).forEach(([vendor, data]) => {
            data.savings = data.total - lowestCost;
            data.savingsPercent = (data.savings / data.total) * 100;
            data.isBestValue = vendor === bestVendor;
        });
        
        return results;
    };
    
    /**
     * Generate cost insights
     */
    module.generateInsights = function(analysis) {
        const insights = [];
        
        // Find the vendor with lowest TCO
        const vendors = Object.entries(analysis);
        const bestValue = vendors.find(([v, data]) => data.isBestValue);
        
        if (bestValue) {
            insights.push({
                type: 'savings',
                priority: 'high',
                title: `${bestValue[0]} offers the lowest TCO`,
                description: `Save up to ${Math.round(bestValue[1].savingsPercent)}% compared to alternatives`,
                value: bestValue[1].total
            });
        }
        
        // Hidden cost insights
        vendors.forEach(([vendor, data]) => {
            if (data.hidden > 0) {
                insights.push({
                    type: 'warning',
                    priority: 'medium',
                    title: `Hidden costs identified for ${vendor}`,
                    description: `Additional ${Math.round(data.hidden / 1000)}K in hidden costs`,
                    value: data.hidden
                });
            }
        });
        
        // Operational efficiency
        vendors.forEach(([vendor, data]) => {
            const efficiency = this.calculators.operationalEfficiency(vendor);
            if (efficiency < 1) {
                insights.push({
                    type: 'benefit',
                    priority: 'high',
                    title: `${vendor} reduces operational overhead`,
                    description: `${Math.round((1 - efficiency) * 100)}% reduction in IT effort`,
                    value: efficiency
                });
            }
        });
        
        return insights;
    };
    
    return module;
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.advancedCostAnalysis.init();
});
