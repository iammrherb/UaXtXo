/**
 * Advanced TCO Calculator Module
 * Provides sophisticated TCO calculation models with detailed breakdowns
 */

class AdvancedTcoCalculator {
    constructor() {
        this.industryData = window.INDUSTRY_COMPLIANCE || {};
        this.riskProfiles = window.RISK_PROFILES || {};
        this.insuranceOptions = window.INSURANCE_OPTIONS || {};
        this.vendorData = window.VENDOR_DATA || {};
        this.calculatorState = window.calculatorState || {};
        
        // Initialize cost models
        this.costModels = {
            subscription: this.calculateSubscriptionCost.bind(this),
            implementation: this.calculateImplementationCost.bind(this),
            hardware: this.calculateHardwareCost.bind(this),
            maintenance: this.calculateMaintenanceCost.bind(this),
            operational: this.calculateOperationalCost.bind(this),
            riskMitigation: this.calculateRiskMitigationValue.bind(this),
            complianceAutomation: this.calculateComplianceAutomationValue.bind(this),
            insurancePremium: this.calculateInsurancePremiumValue.bind(this),
            productivityGain: this.calculateProductivityGainValue.bind(this)
        };
    }
    
    /**
     * Calculate comprehensive TCO for a vendor
     * @param {string} vendorId - Vendor identifier
     * @param {object} inputs - Calculation inputs
     * @returns {object} - Detailed TCO breakdown
     */
    calculateVendorTco(vendorId, inputs) {
        const vendor = this.vendorData[vendorId];
        if (!vendor) {
            return null;
        }
        
        // Get base calculation values
        const yearsToProject = inputs.yearsToProject || 3;
        
        // Calculate individual cost components
        const subscriptionCost = this.costModels.subscription(vendor, inputs);
        const implementationCost = this.costModels.implementation(vendor, inputs);
        const hardwareCost = this.costModels.hardware(vendor, inputs);
        const maintenanceCost = this.costModels.maintenance(vendor, inputs, hardwareCost, implementationCost);
        const operationalCost = this.costModels.operational(vendor, inputs);
        
        // Calculate total costs by year
        const yearlyBreakdown = this.calculateYearlyBreakdown(
            vendor, 
            inputs,
            subscriptionCost,
            implementationCost,
            hardwareCost,
            maintenanceCost,
            operationalCost
        );
        
        // Calculate total TCO
        const totalTco = yearlyBreakdown.reduce((sum, year) => sum + year.totalCost, 0);
        
        // Calculate value and ROI components
        const riskMitigationValue = this.costModels.riskMitigation(vendor, inputs);
        const complianceAutomationValue = this.costModels.complianceAutomation(vendor, inputs);
        const insurancePremiumValue = this.costModels.insurancePremium(vendor, inputs);
        const productivityGainValue = this.costModels.productivityGain(vendor, inputs);
        
        // Calculate value by year
        const valueByYear = this.calculateValueByYear(
            vendor,
            inputs,
            riskMitigationValue,
            complianceAutomationValue,
            insurancePremiumValue,
            productivityGainValue
        );
        
        // Calculate total business value
        const totalBusinessValue = valueByYear.reduce((sum, year) => sum + year.totalValue, 0);
        
        // Calculate ROI
        const roi = totalTco > 0 ? (totalBusinessValue / totalTco) * 100 : 0;
        
        // Calculate payback period in months
        const annualValue = totalBusinessValue / yearsToProject;
        const monthlyValue = annualValue / 12;
        const paybackPeriod = monthlyValue > 0 ? Math.ceil(totalTco / monthlyValue) : 0;
        
        // Return comprehensive result
        return {
            vendor: vendor,
            costs: {
                subscription: subscriptionCost,
                implementation: implementationCost,
                hardware: hardwareCost,
                maintenance: maintenanceCost,
                operational: operationalCost,
                total: totalTco
            },
            yearlyBreakdown: yearlyBreakdown,
            businessValue: {
                riskMitigation: riskMitigationValue,
                complianceAutomation: complianceAutomationValue,
                insurancePremium: insurancePremiumValue,
                productivityGain: productivityGainValue,
                total: totalBusinessValue
            },
            valueByYear: valueByYear,
            roi: {
                percentage: roi,
                paybackPeriod: paybackPeriod
            }
        };
    }
    
    /**
     * Calculate subscription costs
     */
    calculateSubscriptionCost(vendor, inputs) {
        const costModel = vendor.costModel || {};
        
        // For vendors with no subscription model, return 0
        if (!costModel.type || !costModel.type.includes('Subscription')) {
            return 0;
        }
        
        // For Portnox, use the configurable base price
        let basePrice = vendor.id === 'portnox' ? 
            inputs.costParameters.portnoxBasePrice : (costModel.basePrice || 0);
        
        // Apply volume discount
        let discount = vendor.id === 'portnox' ? 
            inputs.costParameters.portnoxDiscount : (costModel.averageDiscount || 0);
        
        // Adjust discount based on organization size for non-Portnox vendors
        if (vendor.id !== 'portnox') {
            const sizeMultipliers = {
                'very-small': 0.5,
                'small': 0.8,
                'medium': 1.0,
                'large': 1.2,
                'enterprise': 1.5
            };
            
            discount *= sizeMultipliers[inputs.organizationSize] || 1.0;
        }
        
        // Calculate effective price per device
        const effectivePrice = basePrice * (1 - (discount / 100));
        
        // Calculate annual subscription cost
        const annualCost = effectivePrice * inputs.deviceCount * 12;
        
        // Calculate total subscription cost over the projection period
        return annualCost * inputs.yearsToProject;
    }
    
    /**
     * Calculate implementation costs with detailed factors
     */
    calculateImplementationCost(vendor, inputs) {
        // Base implementation cost from vendor data
        let cost = vendor.costModel.implementation || 0;
        
        // Adjust for organization size
        const sizeMultipliers = {
            'very-small': 0.6,
            'small': 1.0,
            'medium': 2.0,
            'large': 3.5,
            'enterprise': 5.0
        };
        
        cost *= sizeMultipliers[inputs.organizationSize] || 1.0;
        
        // Adjust for complexity based on network requirements
        const complexityFactors = {
            cloudIntegration: 0.15,
            legacyDevices: 0.2,
            byodSupport: 0.1,
            iotSupport: 0.25,
            wirelessSupport: 0.1,
            remoteWork: 0.1
        };
        
        let complexityAdjustment = 1.0;
        Object.keys(complexityFactors).forEach(factor => {
            if (inputs.networkRequirements[factor]) {
                complexityAdjustment += complexityFactors[factor];
            }
        });
        
        cost *= complexityAdjustment;
        
        // Adjust for locations
        cost *= Math.max(1.0, Math.sqrt(inputs.locations) * 0.5);
        
        // Calculate cost with markup for professional services
        cost *= 1.0 + (vendor.costModel.serviceMarkup || 0.1);
        
        // Add training costs
        const trainingCostPerPerson = vendor.costModel.trainingCost || 1000;
        const traineeCount = Math.max(1, Math.ceil(inputs.locations * 0.5));
        const trainingCost = trainingCostPerPerson * traineeCount;
        
        return Math.round(cost + trainingCost);
    }
    
    /**
     * Calculate hardware costs with refresh cycles
     */
    calculateHardwareCost(vendor, inputs) {
        // Base hardware cost from vendor data
        let cost = vendor.costModel.hardware || 0;
        
        // For cloud-only vendors, hardware cost is zero
        if (vendor.deploymentModel === 'Cloud-only') {
            return 0;
        }
        
        // For non-cloud vendors, adjust for organization size
        if (cost > 0) {
            const sizeMultipliers = {
                'very-small': 0.5,
                'small': 1.0,
                'medium': 2.5,
                'large': 4.0,
                'enterprise': 6.0
            };
            
            cost *= sizeMultipliers[inputs.organizationSize] || 1.0;
            
            // Adjust for number of locations
            cost *= Math.max(1.0, Math.log10(inputs.locations) + 1);
            
            // Calculate hardware refresh costs for projection period beyond 3 years
            if (inputs.yearsToProject > 3) {
                // Add partial hardware refresh at year 4
                cost += cost * 0.4;
            }
            
            if (inputs.yearsToProject > 4) {
                // Add another partial refresh for year 5
                cost += cost * 0.2;
            }
        }
        
        return Math.round(cost);
    }
    
    /**
     * Calculate maintenance costs
     */
    calculateMaintenanceCost(vendor, inputs, hardwareCost, implementationCost) {
        // For cloud-only vendors, maintenance cost is zero (included in subscription)
        if (vendor.deploymentModel === 'Cloud-only') {
            return 0;
        }
        
        // Calculate annual maintenance as percentage of hardware and implementation
        const maintenanceRate = vendor.costModel.maintenance || inputs.costParameters.maintenancePercentage || 18;
        const annualMaintenance = (hardwareCost + implementationCost) * (maintenanceRate / 100);
        
        // Calculate total maintenance cost over the projection period
        return Math.round(annualMaintenance * inputs.yearsToProject);
    }
    
    /**
     * Calculate operational costs based on FTE requirements
     */
    calculateOperationalCost(vendor, inputs) {
        // Extract FTE allocation for vendor type
        let fteAllocation = 0;
        
        if (vendor.fteRequirements) {
            // Parse FTE from string like "0.1-0.25 FTE" to get average
            const fteParts = vendor.fteRequirements.match(/[\d\.]+/g);
            if (fteParts && fteParts.length > 0) {
                if (fteParts.length === 1) {
                    fteAllocation = parseFloat(fteParts[0]);
                } else {
                    // Average if range is given
                    fteAllocation = (parseFloat(fteParts[0]) + parseFloat(fteParts[1])) / 2;
                }
            } else {
                // Default based on deployment type
                if (vendor.deploymentModel && vendor.deploymentModel.includes('Cloud')) {
                    fteAllocation = 0.25;
                } else {
                    fteAllocation = 1.0;
                }
            }
        }
        
        // Calculate annual FTE cost
        const annualFTECost = inputs.costParameters.fteCost * fteAllocation;
        
        // Include ongoing training costs
        const ongoingTrainingCost = inputs.costParameters.fteCost * 0.05 * fteAllocation;
        
        // Include incident management time
        const incidentManagementCost = inputs.costParameters.fteCost * 0.1 * fteAllocation;
        
        // Calculate total operational cost
        const totalAnnualOperationalCost = annualFTECost + ongoingTrainingCost + incidentManagementCost;
        
        // Multiply by years to project
        return Math.round(totalAnnualOperationalCost * inputs.yearsToProject);
    }
    
    /**
     * Calculate yearly cost breakdown
     */
    calculateYearlyBreakdown(vendor, inputs, subscriptionCost, implementationCost, hardwareCost, maintenanceCost, operationalCost) {
        const yearsToProject = inputs.yearsToProject || 3;
        const yearlyBreakdown = [];
        
        // Calculate annual costs
        const annualSubscription = subscriptionCost / yearsToProject;
        const annualOperational = operationalCost / yearsToProject;
        const annualMaintenance = maintenanceCost / yearsToProject;
        
        // Year 1 includes one-time costs
        yearlyBreakdown.push({
            year: 1,
            subscriptionCost: annualSubscription,
            implementationCost: implementationCost,
            hardwareCost: hardwareCost,
            maintenanceCost: annualMaintenance,
            operationalCost: annualOperational,
            totalCost: annualSubscription + implementationCost + hardwareCost + annualMaintenance + annualOperational
        });
        
        // Subsequent years only have recurring costs
        for (let year = 2; year <= yearsToProject; year++) {
            yearlyBreakdown.push({
                year: year,
                subscriptionCost: annualSubscription,
                implementationCost: 0,
                hardwareCost: 0,
                maintenanceCost: annualMaintenance,
                operationalCost: annualOperational,
                totalCost: annualSubscription + annualMaintenance + annualOperational
            });
        }
        
        return yearlyBreakdown;
    }
    
    /**
     * Calculate risk mitigation value
     */
    calculateRiskMitigationValue(vendor, inputs) {
        // Get risk profile data
        const riskProfile = this.riskProfiles[inputs.riskProfile] || {};
        
        // Get breach cost from risk profile
        const baseBreachCost = riskProfile.averageBreachCost || 4200000;
        
        // Calculate risk reduction percentage
        const riskReductionPercentage = vendor.security.riskReduction || 0;
        
        // Calculate annual risk reduction value (assume 10% chance of breach per year)
        const annualRiskReduction = baseBreachCost * 0.1 * (riskReductionPercentage / 100);
        
        // Calculate total risk mitigation value over projection period
        return Math.round(annualRiskReduction * inputs.yearsToProject);
    }
    
    /**
     * Calculate compliance automation value
     */
    calculateComplianceAutomationValue(vendor, inputs) {
        // Base on organization size and industry
        const baseComplianceCost = inputs.costParameters.fteCost * 0.5;
        
        // Adjust for industry complexity
        const industryData = this.industryData[inputs.industry] || {};
        const industryComplexity = industryData.primaryFrameworks ? 
            Math.min(2.0, 0.5 + (industryData.primaryFrameworks.length * 0.25)) : 1.0;
        
        // Calculate compliance automation percentage
        const complianceAutomationPct = vendor.security.complianceCoverage || 60;
        
        // Calculate annual compliance cost reduction
        const annualComplianceReduction = baseComplianceCost * industryComplexity * (complianceAutomationPct / 100);
        
        // Calculate total compliance automation value over projection period
        return Math.round(annualComplianceReduction * inputs.yearsToProject);
    }
    
    /**
     * Calculate insurance premium reduction value
     */
    calculateInsurancePremiumValue(vendor, inputs) {
        // Get insurance option data
        const insuranceOption = this.insuranceOptions[inputs.insuranceTier] || {};
        
        // If no insurance, return 0
        if (inputs.insuranceTier === 'none') {
            return 0;
        }
        
        // Get base annual premium
        const annualPremium = insuranceOption.estimatedAnnualCost || 0;
        
        // Calculate premium reduction percentage
        const reductionPercentage = vendor.security.insuranceImpact || inputs.costParameters.insuranceReduction || 0;
        
        // Calculate annual premium reduction
        const annualReduction = annualPremium * (reductionPercentage / 100);
        
        // Calculate total premium reduction over projection period
        return Math.round(annualReduction * inputs.yearsToProject);
    }
    
    /**
     * Calculate productivity gain value
     */
    calculateProductivityGainValue(vendor, inputs) {
        // Base on organization size and device count
        const deviceManagementFTE = inputs.deviceCount / 5000;
        const baseProductivityCost = inputs.costParameters.fteCost * deviceManagementFTE;
        
        // Calculate efficiency gain based on automation capabilities
        const efficiencyGain = vendor.features.automation || 50;
        
        // Calculate annual productivity gain
        const annualProductivityGain = baseProductivityCost * (efficiencyGain / 100);
        
        // Calculate total productivity gain over projection period
        return Math.round(annualProductivityGain * inputs.yearsToProject);
    }
    
    /**
     * Calculate value by year breakdown
     */
    calculateValueByYear(vendor, inputs, riskMitigationValue, complianceAutomationValue, insurancePremiumValue, productivityGainValue) {
        const yearsToProject = inputs.yearsToProject || 3;
        const valueByYear = [];
        
        // Calculate annual values
        const annualRiskMitigation = riskMitigationValue / yearsToProject;
        const annualComplianceAutomation = complianceAutomationValue / yearsToProject;
        const annualInsurancePremium = insurancePremiumValue / yearsToProject;
        const annualProductivityGain = productivityGainValue / yearsToProject;
        
        // Create value breakdown for each year
        for (let year = 1; year <= yearsToProject; year++) {
            // Scale values based on implementation timeline
            let scaleFactor = 1.0;
            
            // First year has ramp-up period
            if (year === 1) {
                scaleFactor = 0.7; // 70% of full value in first year
            }
            
            valueByYear.push({
                year: year,
                riskMitigationValue: annualRiskMitigation * scaleFactor,
                complianceAutomationValue: annualComplianceAutomation * scaleFactor,
                insurancePremiumValue: annualInsurancePremium * scaleFactor,
                productivityGainValue: annualProductivityGain * scaleFactor,
                totalValue: (annualRiskMitigation + annualComplianceAutomation + 
                            annualInsurancePremium + annualProductivityGain) * scaleFactor
            });
        }
        
        return valueByYear;
    }
    
    /**
     * Run sensitivity analysis on inputs
     * @param {string} vendorId - Vendor identifier
     * @param {object} baseInputs - Base calculation inputs
     * @param {object} sensitivityParams - Parameters to vary in sensitivity analysis
     * @returns {object} - Sensitivity analysis results
     */
    runSensitivityAnalysis(vendorId, baseInputs, sensitivityParams) {
        const results = {
            baseTco: null,
            variations: {}
        };
        
        // Calculate base TCO
        results.baseTco = this.calculateVendorTco(vendorId, baseInputs);
        
        // For each sensitivity parameter
        Object.keys(sensitivityParams).forEach(param => {
            const variations = sensitivityParams[param];
            results.variations[param] = {};
            
            // Calculate TCO for each variation
            variations.forEach(variation => {
                // Create modified inputs
                const modifiedInputs = JSON.parse(JSON.stringify(baseInputs));
                
                // Apply variation to parameter
                if (param.includes('.')) {
                    // Handle nested parameters
                    const parts = param.split('.');
                    let obj = modifiedInputs;
                    
                    // Navigate to the appropriate object
                    for (let i = 0; i < parts.length - 1; i++) {
                        if (!obj[parts[i]]) {
                            obj[parts[i]] = {};
                        }
                        obj = obj[parts[i]];
                    }
                    
                    // Set the value
                    obj[parts[parts.length - 1]] = variation;
                } else {
                    // Handle top-level parameters
                    modifiedInputs[param] = variation;
                }
                
                // Calculate TCO with variation
                results.variations[param][variation] = this.calculateVendorTco(vendorId, modifiedInputs);
            });
        });
        
        return results;
    }
    
    /**
     * Create comparative analysis across vendors
     * @param {Array} vendorIds - List of vendor IDs to compare
     * @param {object} inputs - Calculation inputs
     * @returns {object} - Comparative analysis results
     */
    createComparativeAnalysis(vendorIds, inputs) {
        const results = {
            vendors: {},
            comparisons: {
                tco: {},
                roi: {},
                value: {},
                payback: {}
            }
        };
        
        // Calculate TCO for each vendor
        vendorIds.forEach(vendorId => {
            results.vendors[vendorId] = this.calculateVendorTco(vendorId, inputs);
            
            // Extract metrics for comparison
            if (results.vendors[vendorId]) {
                results.comparisons.tco[vendorId] = results.vendors[vendorId].costs.total;
                results.comparisons.roi[vendorId] = results.vendors[vendorId].roi.percentage;
                results.comparisons.value[vendorId] = results.vendors[vendorId].businessValue.total;
                results.comparisons.payback[vendorId] = results.vendors[vendorId].roi.paybackPeriod;
            }
        });
        
        // Add calculated comparisons
        results.bestValue = this.determineHighestValue(results);
        results.fastestROI = this.determineFastestROI(results);
        results.lowestTCO = this.determineLowestTCO(results);
        
        return results;
    }
    
    /**
     * Determine vendor with highest value
     */
    determineHighestValue(results) {
        let highestValue = 0;
        let highestVendor = null;
        
        Object.keys(results.comparisons.value).forEach(vendorId => {
            const value = results.comparisons.value[vendorId];
            if (value > highestValue) {
                highestValue = value;
                highestVendor = vendorId;
            }
        });
        
        return {
            vendorId: highestVendor,
            value: highestValue
        };
    }
    
    /**
     * Determine vendor with fastest ROI
     */
    determineFastestROI(results) {
        let shortestPayback = Number.MAX_VALUE;
        let fastestVendor = null;
        
        Object.keys(results.comparisons.payback).forEach(vendorId => {
            const payback = results.comparisons.payback[vendorId];
            if (payback > 0 && payback < shortestPayback) {
                shortestPayback = payback;
                fastestVendor = vendorId;
            }
        });
        
        return {
            vendorId: fastestVendor,
            paybackPeriod: shortestPayback
        };
    }
    
    /**
     * Determine vendor with lowest TCO
     */
    determineLowestTCO(results) {
        let lowestTCO = Number.MAX_VALUE;
        let lowestVendor = null;
        
        Object.keys(results.comparisons.tco).forEach(vendorId => {
            const tco = results.comparisons.tco[vendorId];
            if (tco > 0 && tco < lowestTCO) {
                lowestTCO = tco;
                lowestVendor = vendorId;
            }
        });
        
        return {
            vendorId: lowestVendor,
            tco: lowestTCO
        };
    }
}

// Create instance and expose globally
window.advancedTcoCalculator = new AdvancedTcoCalculator();
