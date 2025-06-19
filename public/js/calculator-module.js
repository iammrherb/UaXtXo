// Calculator Module for TCO/ROI Calculations
(function() {
    'use strict';
    
    class CalculatorModule {
        constructor() {
            this.calculations = new Map();
            this.formulas = new Map();
            this.setupFormulas();
        }
        
        initialize() {
            console.log('[Calculator] Initializing calculator module...');
            return Promise.resolve();
        }
        
        setupFormulas() {
            // TCO Formulas
            this.formulas.set('tco_legacy', (vendor, devices, years) => {
                const base = vendor.pricing.base_license;
                const perDevice = vendor.pricing.per_device * devices;
                const implementation = vendor.pricing.professional_services;
                const annualMaint = (base + perDevice) * vendor.pricing.annual_maintenance;
                const fteCost = vendor.deployment.fte_required * 150000; // Average IT salary
                const infraCost = vendor.infrastructure.servers_required * 15000; // Server costs
                
                const initialCost = base + perDevice + implementation + infraCost;
                const annualCost = annualMaint + fteCost;
                const totalCost = initialCost + (annualCost * years);
                
                return {
                    initial: initialCost,
                    annual: annualCost,
                    total: totalCost,
                    breakdown: {
                        licensing: base + perDevice,
                        implementation: implementation,
                        infrastructure: infraCost,
                        maintenance: annualMaint * years,
                        operations: fteCost * years
                    }
                };
            });
            
            this.formulas.set('tco_cloud', (vendor, devices, years) => {
                const perDevice = vendor.pricing.per_device * devices * years;
                const implementation = vendor.pricing.professional_services;
                
                return {
                    initial: implementation,
                    annual: vendor.pricing.per_device * devices,
                    total: perDevice + implementation,
                    breakdown: {
                        licensing: perDevice,
                        implementation: implementation,
                        infrastructure: 0,
                        maintenance: 0,
                        operations: 0
                    }
                };
            });
            
            // ROI Formulas
            this.formulas.set('roi', (savings, investment, years) => {
                const roi = ((savings - investment) / investment) * 100;
                const paybackMonths = (investment / (savings / (years * 12)));
                
                return {
                    percentage: roi,
                    paybackMonths: paybackMonths,
                    annualReturn: savings / years,
                    totalReturn: savings
                };
            });
            
            // Risk Reduction Formulas
            this.formulas.set('risk_reduction', (baseline, withNAC) => {
                const breachCost = 4450000; // Average data breach cost
                const baselineRisk = baseline.breachProbability * breachCost;
                const nacRisk = withNAC.breachProbability * breachCost;
                const reduction = baselineRisk - nacRisk;
                
                return {
                    baselineRisk: baselineRisk,
                    nacRisk: nacRisk,
                    reduction: reduction,
                    percentage: (reduction / baselineRisk) * 100
                };
            });
        }
        
        calculateTCO(vendor, options = {}) {
            const { devices = 1000, years = 3 } = options;
            
            const formula = vendor.category.includes('Cloud') ? 'tco_cloud' : 'tco_legacy';
            const calculation = this.formulas.get(formula)(vendor, devices, years);
            
            // Cache calculation
            const key = `${vendor.id}_${devices}_${years}`;
            this.calculations.set(key, calculation);
            
            return calculation;
        }
        
        compareVendors(vendors, options = {}) {
            const results = vendors.map(vendor => {
                const tco = this.calculateTCO(vendor, options);
                return { vendor, tco };
            });
            
            // Sort by total cost
            results.sort((a, b) => a.tco.total - b.tco.total);
            
            // Calculate savings vs most expensive
            const maxCost = Math.max(...results.map(r => r.tco.total));
            results.forEach(result => {
                result.savings = maxCost - result.tco.total;
                result.savingsPercentage = (result.savings / maxCost) * 100;
            });
            
            return results;
        }
        
        calculateROI(currentVendor, newVendor, options = {}) {
            const currentTCO = this.calculateTCO(currentVendor, options);
            const newTCO = this.calculateTCO(newVendor, options);
            const savings = currentTCO.total - newTCO.total;
            
            return this.formulas.get('roi')(savings, newTCO.total, options.years || 3);
        }
        
        generateChartData(vendors, options = {}) {
            const comparison = this.compareVendors(vendors, options);
            
            return {
                labels: comparison.map(c => c.vendor.name),
                datasets: [
                    {
                        label: 'Initial Cost',
                        data: comparison.map(c => c.tco.initial),
                        backgroundColor: 'rgba(255, 128, 0, 0.8)'
                    },
                    {
                        label: '3-Year Operations',
                        data: comparison.map(c => c.tco.total - c.tco.initial),
                        backgroundColor: 'rgba(0, 102, 255, 0.8)'
                    }
                ],
                breakdownData: comparison.map(c => ({
                    vendor: c.vendor.name,
                    ...c.tco.breakdown
                }))
            };
        }
        
        calculateIndustryMetrics(industry, vendorId, options = {}) {
            const vendor = window.ModuleLoader.getModule('VendorDatabase')?.getVendor(vendorId);
            if (!vendor) return null;
            
            const metrics = {
                complianceCost: this.calculateComplianceCost(industry, vendor),
                securityMetrics: this.calculateSecurityMetrics(industry, vendor),
                operationalMetrics: this.calculateOperationalMetrics(vendor, options)
            };
            
            return metrics;
        }
        
        calculateComplianceCost(industry, vendor) {
            const complianceMultipliers = {
                healthcare: 1.5,
                financial: 1.8,
                government: 2.0,
                education: 1.2,
                retail: 1.3,
                manufacturing: 1.4
            };
            
            const multiplier = complianceMultipliers[industry] || 1.0;
            const baseCost = vendor.category.includes('Cloud') ? 0 : 50000;
            
            return {
                annualAuditCost: baseCost * multiplier,
                complianceStaffHours: vendor.category.includes('Cloud') ? 100 : 500,
                automationSavings: vendor.category.includes('Cloud') ? baseCost * 0.8 : 0
            };
        }
        
        calculateSecurityMetrics(industry, vendor) {
            const industryRiskFactors = {
                healthcare: { breachCost: 10800000, probability: 0.28 },
                financial: { breachCost: 5970000, probability: 0.25 },
                government: { breachCost: 5000000, probability: 0.22 },
                education: { breachCost: 3860000, probability: 0.30 },
                retail: { breachCost: 3620000, probability: 0.32 },
                manufacturing: { breachCost: 4450000, probability: 0.26 }
            };
            
            const risk = industryRiskFactors[industry] || { breachCost: 4000000, probability: 0.25 };
            const nacReduction = vendor.features.zero_trust === 'complete' ? 0.85 : 0.60;
            
            return {
                annualRiskExposure: risk.breachCost * risk.probability,
                withNACRisk: risk.breachCost * risk.probability * (1 - nacReduction),
                riskReduction: risk.breachCost * risk.probability * nacReduction,
                insuranceSavings: vendor.features.zero_trust === 'complete' ? 0.25 : 0.10
            };
        }
        
        calculateOperationalMetrics(vendor, options = {}) {
            const { devices = 1000, locations = 1 } = options;
            
            return {
                devicesPerAdmin: vendor.category.includes('Cloud') ? 5000 : 500,
                mttr: vendor.category.includes('Cloud') ? 0.5 : 4, // Hours
                availability: vendor.category.includes('Cloud') ? 99.99 : 99.0,
                deploymentTime: vendor.deployment.time_months,
                requiredFTE: vendor.deployment.fte_required
            };
        }
        
        exportCalculations() {
            return {
                calculations: Array.from(this.calculations.entries()),
                timestamp: new Date().toISOString()
            };
        }
    }
    
    // Create and register
    const calculator = new CalculatorModule();
    
    if (window.ModuleLoader && window.ModuleLoader.register) {
        window.ModuleLoader.register('Calculator', calculator);
        console.log('[Calculator] ✓ Registered with ModuleLoader');
    }
    
    window.Calculator = calculator;
})();
