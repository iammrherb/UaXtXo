/**
 * TCO Calculator
 * Comprehensive Total Cost of Ownership calculation engine with all vendors
 */
class TCOCalculator {
    constructor() {
        // Initialize with default values
        this.initializeDefaults();
        console.log("TCO Calculator initialized");
    }
    
    /**
     * Initialize default values for TCO calculator
     */
    initializeDefaults() {
        // Base cost factors
        this.costFactors = {
            cisco: {
                hardware: { base: 50000, perDevice: 40 },
                software: { base: 20000, perDevice: 90 },
                implementation: { base: 60000, perDevice: 10 },
                maintenance: { percentage: 0.20, perDevice: 0 },
                personnel: { fte: 1.5, fteAnnualCost: 120000 }
            },
            aruba: {
                hardware: { base: 30000, perDevice: 30 },
                software: { base: 15000, perDevice: 70 },
                implementation: { base: 40000, perDevice: 8 },
                maintenance: { percentage: 0.18, perDevice: 0 },
                personnel: { fte: 1.0, fteAnnualCost: 120000 }
            },
            forescout: {
                hardware: { base: 35000, perDevice: 35 },
                software: { base: 20000, perDevice: 80 },
                implementation: { base: 50000, perDevice: 9 },
                maintenance: { percentage: 0.20, perDevice: 0 },
                personnel: { fte: 1.25, fteAnnualCost: 120000 }
            },
            fortinac: {
                hardware: { base: 20000, perDevice: 25 },
                software: { base: 10000, perDevice: 60 },
                implementation: { base: 30000, perDevice: 7 },
                maintenance: { percentage: 0.18, perDevice: 0 },
                personnel: { fte: 0.8, fteAnnualCost: 120000 }
            },
            nps: {
                hardware: { base: 5000, perDevice: 0 },
                software: { base: 0, perDevice: 0 },
                implementation: { base: 15000, perDevice: 3 },
                maintenance: { percentage: 0.10, perDevice: 0 },
                personnel: { fte: 0.5, fteAnnualCost: 120000 }
            },
            securew2: {
                hardware: { base: 0, perDevice: 0 },
                software: { base: 5000, perDevice: 31 },
                implementation: { base: 10000, perDevice: 2 },
                maintenance: { percentage: 0.15, perDevice: 0 },
                personnel: { fte: 0.3, fteAnnualCost: 120000 }
            },
            juniper: {
                hardware: { base: 15000, perDevice: 20 },
                software: { base: 10000, perDevice: 45 },
                implementation: { base: 25000, perDevice: 6 },
                maintenance: { percentage: 0.15, perDevice: 0 },
                personnel: { fte: 0.6, fteAnnualCost: 120000 }
            },
            arista: {
                hardware: { base: 30000, perDevice: 30 },
                software: { base: 15000, perDevice: 65 },
                implementation: { base: 35000, perDevice: 8 },
                maintenance: { percentage: 0.15, perDevice: 0 },
                personnel: { fte: 0.8, fteAnnualCost: 120000 }
            },
            foxpass: {
                hardware: { base: 0, perDevice: 0 },
                software: { base: 3000, perDevice: 25 },
                implementation: { base: 5000, perDevice: 2 },
                maintenance: { percentage: 0.08, perDevice: 0 },
                personnel: { fte: 0.2, fteAnnualCost: 120000 }
            },
            portnox: {
                hardware: { base: 0, perDevice: 0 },
                software: { base: 0, perDevice: 48 },
                implementation: { base: 5000, perDevice: 1 },
                maintenance: { percentage: 0, perDevice: 0 },
                personnel: { fte: 0.2, fteAnnualCost: 120000 }
            },
            noNac: {
                hardware: { base: 0, perDevice: 0 },
                software: { base: 0, perDevice: 0 },
                implementation: { base: 0, perDevice: 0 },
                maintenance: { percentage: 0, perDevice: 0 },
                personnel: { fte: 0.1, fteAnnualCost: 120000 }
            }
        };
        
        // Industry-specific modifiers
        this.industryModifiers = {
            healthcare: {
                implementation: 1.2,
                compliance: 1.3,
                risk: 1.4
            },
            financial: {
                implementation: 1.3,
                compliance: 1.4,
                risk: 1.5
            },
            government: {
                implementation: 1.2,
                compliance: 1.5,
                risk: 1.3
            },
            education: {
                implementation: 0.9,
                compliance: 0.8,
                risk: 0.9
            },
            retail: {
                implementation: 1.0,
                compliance: 1.1,
                risk: 1.2
            },
            manufacturing: {
                implementation: 1.1,
                compliance: 1.0,
                risk: 1.1
            },
            technology: {
                implementation: 0.9,
                compliance: 0.9,
                risk: 1.0
            },
            energy: {
                implementation: 1.2,
                compliance: 1.2,
                risk: 1.3
            }
        };
        
        // Scale factors for enterprise size
        this.scaleFactors = {
            small: 0.8,     // < 1,000 devices
            medium: 1.0,    // 1,000-5,000 devices
            large: 1.2,     // 5,000-10,000 devices
            enterprise: 1.4  // 10,000+ devices
        };
        
        // Complexity factors
        this.complexityFactors = {
            multiLocation: 1.2,
            cloudIntegration: 1.15,
            legacyDevices: 1.25,
            byod: 1.15
        };
        
        // Implementation timelines - using data from EnhancedVendors if available
        this.implementationTimelines = {};
        
        // Use EnhancedVendors data if available
        if (window.EnhancedVendors && EnhancedVendors.getTotalImplementationDays) {
            const vendors = Object.keys(this.costFactors);
            
            vendors.forEach(vendorId => {
                const totalDays = EnhancedVendors.getTotalImplementationDays(vendorId) || 0;
                
                // We need to calculate base and per-thousand-devices values
                // For simplicity, we'll use a formula that approximates the data
                // Base is for 1000 devices, and per-thousand is the increase for each 1000 devices
                
                let base = totalDays;
                let perThousandDevices = totalDays * 0.2; // 20% increase per thousand devices
                
                // Adjust for portnox which has very short implementation
                if (vendorId === 'portnox') {
                    base = totalDays;
                    perThousandDevices = totalDays * 0.5; // 50% increase per thousand devices
                }
                
                this.implementationTimelines[vendorId] = {
                    base,
                    perThousandDevices
                };
            });
        } else {
            // Fallback implementation timelines
            this.implementationTimelines = {
                cisco: { base: 90, perThousandDevices: 15 },
                aruba: { base: 60, perThousandDevices: 12 },
                forescout: { base: 60, perThousandDevices: 10 },
                fortinac: { base: 45, perThousandDevices: 8 },
                nps: { base: 15, perThousandDevices: 5 },
                securew2: { base: 10, perThousandDevices: 3 },
                juniper: { base: 30, perThousandDevices: 6 },
                arista: { base: 75, perThousandDevices: 12 },
                foxpass: { base: 10, perThousandDevices: 2 },
                portnox: { base: 3, perThousandDevices: 1 },
                noNac: { base: 0, perThousandDevices: 0 }
            };
        }
    }
    
    /**
     * Calculate TCO for a given vendor
     * @param {string} vendorId - Vendor identifier
     * @param {object} params - Calculation parameters
     * @returns {object} TCO breakdown
     */
    calculateVendorTCO(vendorId, params) {
        // Default params if not provided
        const calculationParams = {
            deviceCount: params.deviceCount || 1000,
            years: params.years || 3,
            organizationSize: params.organizationSize || 'medium',
            industry: params.industry || 'technology',
            locations: params.locations || 1,
            cloudIntegration: params.cloudIntegration || false,
            legacyDevices: params.legacyDevices || false,
            byod: params.byod || false,
            // Cost adjustments
            fteCost: params.fteCost || 120000,
            discountPercentage: params.discountPercentage || 0
        };
        
        const vendor = this.costFactors[vendorId];
        if (!vendor) {
            console.error(`Vendor ${vendorId} not found in cost factors`);
            return null;
        }
        
        // Get scale factor based on organization size
        const scaleFactor = this.scaleFactors[calculationParams.organizationSize] || 1.0;
        
        // Get industry modifiers
        const industryModifier = this.industryModifiers[calculationParams.industry] || {
            implementation: 1.0,
            compliance: 1.0,
            risk: 1.0
        };
        
        // Apply complexity factors
        let complexityMultiplier = 1.0;
        if (calculationParams.locations > 1) {
            complexityMultiplier *= this.complexityFactors.multiLocation;
        }
        if (calculationParams.cloudIntegration) {
            complexityMultiplier *= this.complexityFactors.cloudIntegration;
        }
        if (calculationParams.legacyDevices) {
            complexityMultiplier *= this.complexityFactors.legacyDevices;
        }
        if (calculationParams.byod) {
            complexityMultiplier *= this.complexityFactors.byod;
        }
        
        // Calculate hardware costs
        const hardwareCost = (vendor.hardware.base * scaleFactor * complexityMultiplier) + 
                            (vendor.hardware.perDevice * calculationParams.deviceCount);
        
        // Calculate software costs with discount
        const baseSoftwareCost = (vendor.software.base * scaleFactor * complexityMultiplier) + 
                                (vendor.software.perDevice * calculationParams.deviceCount * calculationParams.years);
        const softwareCost = baseSoftwareCost * (1 - (calculationParams.discountPercentage / 100));
        
        // Calculate implementation costs
        const implementationCost = (vendor.implementation.base * scaleFactor * complexityMultiplier * industryModifier.implementation) + 
                                    (vendor.implementation.perDevice * calculationParams.deviceCount);
        
        // Calculate maintenance costs
        const maintenanceCost = (softwareCost * vendor.maintenance.percentage * calculationParams.years) + 
                                (vendor.maintenance.perDevice * calculationParams.deviceCount * calculationParams.years);
        
        // Calculate personnel costs
        const personnelCost = vendor.personnel.fte * calculationParams.fteCost * calculationParams.years;
        
        // Calculate total costs
        const totalCost = hardwareCost + softwareCost + implementationCost + maintenanceCost + personnelCost;
        
        // Calculate implementation timeline
        const implementationDays = Math.ceil(
            this.implementationTimelines[vendorId].base + 
            (this.implementationTimelines[vendorId].perThousandDevices * calculationParams.deviceCount / 1000) * 
            complexityMultiplier * 
            industryModifier.implementation
        );
        
        // Return complete TCO breakdown
        return {
            vendor: vendorId,
            deviceCount: calculationParams.deviceCount,
            years: calculationParams.years,
            costs: {
                hardware: hardwareCost,
                software: softwareCost,
                implementation: implementationCost,
                maintenance: maintenanceCost,
                personnel: personnelCost,
                total: totalCost
            },
            costPerDevice: totalCost / calculationParams.deviceCount,
            costPerYear: totalCost / calculationParams.years,
            implementationTimeline: {
                days: implementationDays,
                phases: this.calculateImplementationPhases(vendorId, implementationDays)
            },
            breakdown: {
                hardware: Math.round((hardwareCost / totalCost) * 100),
                software: Math.round((softwareCost / totalCost) * 100),
                implementation: Math.round((implementationCost / totalCost) * 100),
                maintenance: Math.round((maintenanceCost / totalCost) * 100),
                personnel: Math.round((personnelCost / totalCost) * 100)
            }
        };
    }
    
    /**
     * Calculate implementation phases breakdown
     * @param {string} vendorId - Vendor identifier
     * @param {number} totalDays - Total implementation days
     * @returns {object} Implementation phases
     */
    calculateImplementationPhases(vendorId, totalDays) {
        // Different distribution based on vendor
        let phasePercentages;
        
        if (vendorId === 'portnox' || vendorId === 'securew2' || vendorId === 'foxpass') {
            // Cloud-native implementation phases
            phasePercentages = {
                planning: 0.20,
                hardware: 0,
                software: 0.10,
                integration: 0.20,
                policy: 0.20,
                testing: 0.15,
                deployment: 0.10,
                training: 0.05
            };
        } else if (vendorId === 'nps') {
            // Basic implementation phases
            phasePercentages = {
                planning: 0.15,
                hardware: 0.10,
                software: 0.15,
                integration: 0.20,
                policy: 0.15,
                testing: 0.10,
                deployment: 0.10,
                training: 0.05
            };
        } else {
            // Enterprise-grade implementation phases
            phasePercentages = {
                planning: 0.15,
                hardware: 0.10,
                software: 0.05,
                integration: 0.15,
                policy: 0.20,
                testing: 0.15,
                deployment: 0.15,
                training: 0.05
            };
        }
        
        // Get actual phase durations from EnhancedVendors if available
        if (window.EnhancedVendors && EnhancedVendors.implementationTimeline && EnhancedVendors.implementationTimeline.phases) {
            const timeline = EnhancedVendors.implementationTimeline.phases;
            const phases = {};
            
            // Map EnhancedVendors phases to our phase names
            const phaseMapping = {
                'Planning & Design': 'planning',
                'Hardware Procurement': 'hardware',
                'Software Installation': 'software',
                'Network Integration': 'integration',
                'Policy Configuration': 'policy',
                'Testing & Validation': 'testing',
                'Deployment & Rollout': 'deployment',
                'Knowledge Transfer': 'training'
            };
            
            // Calculate days for each phase using actual proportions from EnhancedVendors
            let totalPhasesDays = 0;
            timeline.forEach(phase => {
                const phaseName = phaseMapping[phase.name];
                const phaseDays = phase[vendorId]?.days || 0;
                totalPhasesDays += phaseDays;
                phases[phaseName] = phaseDays;
            });
            
            // If we have actual phase data, adjust it to match our total days
            if (totalPhasesDays > 0) {
                Object.keys(phases).forEach(phaseName => {
                    phases[phaseName] = Math.ceil((phases[phaseName] / totalPhasesDays) * totalDays);
                });
                
                return phases;
            }
        }
        
        // Calculate days for each phase using standard percentages
        return {
            planning: Math.ceil(totalDays * phasePercentages.planning),
            hardware: Math.ceil(totalDays * phasePercentages.hardware),
            software: Math.ceil(totalDays * phasePercentages.software),
            integration: Math.ceil(totalDays * phasePercentages.integration),
            policy: Math.ceil(totalDays * phasePercentages.policy),
            testing: Math.ceil(totalDays * phasePercentages.testing),
            deployment: Math.ceil(totalDays * phasePercentages.deployment),
            training: Math.ceil(totalDays * phasePercentages.training)
        };
    }
    
    /**
     * Calculate ROI for switching from current vendor to Portnox
     * @param {object} currentTCO - Current vendor TCO
     * @param {object} portnoxTCO - Portnox TCO
     * @returns {object} ROI analysis
     */
    calculateROI(currentTCO, portnoxTCO) {
        const totalSavings = currentTCO.costs.total - portnoxTCO.costs.total;
        const savingsPercentage = (totalSavings / currentTCO.costs.total) * 100;
        const initialInvestment = portnoxTCO.costs.implementation + 
                                (portnoxTCO.costs.software / portnoxTCO.years);  // First-year software cost
        
        // Calculate monthly costs and savings for breakeven analysis
        const currentMonthlyCost = currentTCO.costs.total / (currentTCO.years * 12);
        const portnoxMonthlyCost = portnoxTCO.costs.total / (portnoxTCO.years * 12);
        const monthlySavings = currentMonthlyCost - portnoxMonthlyCost;
        
        // Calculate breakeven point in months
        const breakEvenMonths = Math.ceil(initialInvestment / monthlySavings);
        
        // Calculate quarterly cumulative savings
        const quarters = portnoxTCO.years * 4;
        const quarterlySavings = [];
        
        // Initial investment is negative savings
        let cumulativeSavings = -initialInvestment;
        
        for (let i = 0; i < quarters; i++) {
            // Add 3 months of savings
            cumulativeSavings += monthlySavings * 3;
            quarterlySavings.push({
                quarter: `Q${i + 1}`,
                savings: cumulativeSavings,
                roi: (cumulativeSavings / initialInvestment) * 100
            });
        }
        
        return {
            totalSavings: totalSavings,
            savingsPercentage: savingsPercentage,
            initialInvestment: initialInvestment,
            breakEvenMonths: breakEvenMonths,
            paybackPeriod: {
                years: Math.floor(breakEvenMonths / 12),
                months: breakEvenMonths % 12
            },
            quarterlyAnalysis: quarterlySavings,
            implementationAdvantage: currentTCO.implementationTimeline.days - portnoxTCO.implementationTimeline.days
        };
    }
    
    /**
     * Calculate comprehensive comparison of all vendors
     * @param {object} params - Calculation parameters
     * @returns {object} Comprehensive comparison
     */
    calculateComparison(params) {
        const vendors = ['cisco', 'aruba', 'forescout', 'fortinac', 'nps', 'securew2', 'juniper', 'arista', 'foxpass', 'portnox'];
        const results = {};
        
        // Calculate TCO for each vendor
        vendors.forEach(vendorId => {
            results[vendorId] = this.calculateVendorTCO(vendorId, params);
        });
        
        // Additionally calculate noNac if relevant
        if (params.selectedVendor === 'noNac') {
            results.noNac = this.calculateVendorTCO('noNac', params);
        }
        
        // Find selected vendor and calculate ROI
        const selectedVendor = params.selectedVendor || 'cisco';
        let roi = null;
        
        if ((vendors.includes(selectedVendor) || selectedVendor === 'noNac') && selectedVendor !== 'portnox') {
            roi = this.calculateROI(results[selectedVendor], results['portnox']);
        }
        
        // Return comprehensive comparison
        return {
            params: params,
            results: results,
            selectedVendor: selectedVendor,
            roi: roi,
            vendors: vendors,
            tcoData: vendors.reduce((acc, vendorId) => {
                acc[vendorId] = results[vendorId].costs.total;
                return acc;
            }, {}),
            costBreakdowns: {
                ...vendors.reduce((acc, vendorId) => {
                    const breakdown = {};
                    const costs = results[vendorId].costs;
                    
                    Object.keys(costs).forEach(costType => {
                        if (costType !== 'total') {
                            breakdown[costType] = costs[costType];
                        }
                    });
                    
                    acc[vendorId] = breakdown;
                    return acc;
                }, {})
            },
            implementationComparison: this.generateImplementationComparison(results),
            sensitivityAnalysis: this.generateSensitivityAnalysis(params)
        };
    }
    
    /**
     * Generate implementation comparison data
     * @param {object} results - TCO results for all vendors
     * @returns {object} Implementation comparison
     */
    generateImplementationComparison(results) {
        const implementationData = {
            phases: [
                'Planning & Design',
                'Hardware Procurement',
                'Software Installation',
                'Network Integration',
                'Policy Configuration',
                'Testing & Validation',
                'Deployment & Rollout',
                'Knowledge Transfer'
            ],
            vendors: {}
        };
        
        // Map internal phase names to display names
        const phaseMapping = {
            planning: 'Planning & Design',
            hardware: 'Hardware Procurement',
            software: 'Software Installation',
            integration: 'Network Integration',
            policy: 'Policy Configuration',
            testing: 'Testing & Validation',
            deployment: 'Deployment & Rollout',
            training: 'Knowledge Transfer'
        };
        
        // Extract implementation timeline data for each vendor
        Object.keys(results).forEach(vendorId => {
            const timeline = results[vendorId].implementationTimeline;
            const phases = timeline.phases;
            
            implementationData.vendors[vendorId] = {
                totalDays: timeline.days,
                phases: {}
            };
            
            // Map phases to the standard names
            Object.keys(phases).forEach(phase => {
                const phaseName = phaseMapping[phase];
                implementationData.vendors[vendorId].phases[phaseName] = phases[phase];
            });
        });
        
        return implementationData;
    }
    
    /**
     * Generate sensitivity analysis for device count variations
     * @param {object} params - Base calculation parameters
     * @returns {object} Sensitivity analysis data
     */
    generateSensitivityAnalysis(params) {
        const deviceCounts = [500, 1000, 2500, 5000, 7500, 10000];
        const analysis = {
            deviceCount: [],
            selectedVendor: [],
            portnox: [],
            savings: [],
            savingsPercentage: []
        };
        
        // Selected vendor for comparison
        const selectedVendor = params.selectedVendor || 'cisco';
        
        // Generate analysis for different device counts
        deviceCounts.forEach(count => {
            // Create modified params
            const modifiedParams = { ...params, deviceCount: count };
            
            // Calculate TCO for selected vendor and Portnox
            const vendorTCO = this.calculateVendorTCO(selectedVendor, modifiedParams);
            const portnoxTCO = this.calculateVendorTCO('portnox', modifiedParams);
            
            // Calculate savings
            const savings = vendorTCO.costs.total - portnoxTCO.costs.total;
            const savingsPercentage = (savings / vendorTCO.costs.total) * 100;
            
            // Add to analysis data
            analysis.deviceCount.push(count);
            analysis.selectedVendor.push(vendorTCO.costs.total);
            analysis.portnox.push(portnoxTCO.costs.total);
            analysis.savings.push(savings);
            analysis.savingsPercentage.push(savingsPercentage);
        });
        
        return analysis;
    }
    
    /**
     * Generate insights based on comparison results
     * @param {object} comparison - Comparison results
     * @returns {array} Insights
     */
    generateInsights(comparison) {
        const selectedVendor = comparison.selectedVendor;
        const selectedTCO = comparison.results[selectedVendor];
        const portnoxTCO = comparison.results.portnox;
        const roi = comparison.roi;
        
        // Get vendor name for display
        const vendorName = window.EnhancedVendors?.vendors[selectedVendor]?.name || 
                            selectedVendor.charAt(0).toUpperCase() + selectedVendor.slice(1);
        
        const insights = [];
        
        // TCO insights
        insights.push({
            category: 'Cost Savings',
            title: `${Math.round(roi.savingsPercentage)}% Lower TCO with Portnox Cloud`,
            description: `Portnox Cloud delivers a 3-year TCO of $${Math.round(portnoxTCO.costs.total).toLocaleString()}, representing a ${Math.round(roi.savingsPercentage)}% reduction compared to ${vendorName}'s $${Math.round(selectedTCO.costs.total).toLocaleString()}.`,
            icon: 'piggy-bank'
        });
        
        // Implementation insights
        const implementationSavingsDays = selectedTCO.implementationTimeline.days - portnoxTCO.implementationTimeline.days;
        const implementationSavingsPercent = Math.round((implementationSavingsDays / selectedTCO.implementationTimeline.days) * 100);
        
        insights.push({
            category: 'Implementation',
            title: `${implementationSavingsPercent}% Faster Deployment Time`,
            description: `Portnox Cloud can be deployed in ${portnoxTCO.implementationTimeline.days} days compared to ${selectedTCO.implementationTimeline.days} days for ${vendorName}, accelerating time-to-value by ${implementationSavingsDays} days (${implementationSavingsPercent}%).`,
            icon: 'rocket'
        });
        
        // Hardware elimination insight
        if (selectedTCO.costs.hardware > 0) {
            const hardwarePercentage = Math.round((selectedTCO.costs.hardware / selectedTCO.costs.total) * 100);
            
            insights.push({
                category: 'Infrastructure',
                title: 'Zero Hardware Requirements',
                description: `Portnox Cloud eliminates the need for dedicated hardware appliances, which represent ${hardwarePercentage}% of ${vendorName}'s total cost ($${Math.round(selectedTCO.costs.hardware).toLocaleString()}).`,
                icon: 'server'
            });
        }
        
        // Personnel savings insight
        const personnelSavings = selectedTCO.costs.personnel - portnoxTCO.costs.personnel;
        const personnelSavingsPercent = Math.round((personnelSavings / selectedTCO.costs.personnel) * 100);
        
        insights.push({
            category: 'Operational Efficiency',
            title: `${personnelSavingsPercent}% Lower IT Resource Requirements`,
            description: `Portnox Cloud requires ${personnelSavingsPercent}% less IT staff time to manage, reducing operational costs by $${Math.round(personnelSavings).toLocaleString()} over three years compared to ${vendorName}.`,
            icon: 'users'
        });
        
        // ROI payback period insight
        const paybackPeriod = roi.paybackPeriod;
        let paybackText = '';
        
        if (paybackPeriod.years > 0) {
            paybackText = `${paybackPeriod.years} year${paybackPeriod.years > 1 ? 's' : ''}`;
            if (paybackPeriod.months > 0) {
                paybackText += ` and ${paybackPeriod.months} month${paybackPeriod.months > 1 ? 's' : ''}`;
            }
        } else {
            paybackText = `${paybackPeriod.months} month${paybackPeriod.months > 1 ? 's' : ''}`;
        }
        
        insights.push({
            category: 'Return on Investment',
            title: `Positive ROI in ${paybackText}`,
            description: `Investment in Portnox Cloud pays for itself in just ${paybackText}, with increasing returns thereafter resulting in a total 3-year savings of $${Math.round(roi.totalSavings).toLocaleString()}.`,
            icon: 'chart-line'
        });
        
        // Add appropriate vendor-specific insights
        if (window.EnhancedVendors?.getPortnoxAdvantages) {
            const advantages = window.EnhancedVendors.getPortnoxAdvantages(selectedVendor);
            
            if (advantages && advantages.length > 0) {
                // Add one insight from each category
                const categoriesUsed = new Set();
                
                advantages.forEach(category => {
                    // Only add one insight per category
                    if (!categoriesUsed.has(category.category) && category.items && category.items.length > 0) {
                        categoriesUsed.add(category.category);
                        
                        // Get an item from this category
                        const item = category.items[0];
                        
                        // Map category to icon
                        const categoryIcons = {
                            'Deployment & Implementation': 'rocket',
                            'Operational Costs': 'dollar-sign',
                            'Management & Maintenance': 'cogs',
                            'Scalability & Flexibility': 'expand-alt',
                            'Capabilities & Features': 'star',
                            'Management & Administration': 'sliders-h',
                            'Scalability & Performance': 'tachometer-alt',
                            'Security & Compliance': 'shield-alt',
                            'Platform Architecture': 'microchip',
                            'Deployment & Integration': 'plug',
                            'Device Management': 'mobile-alt',
                            'Cost Structure': 'money-bill-wave',
                            'NAC Capabilities': 'network-wired',
                            'Device Visibility': 'eye',
                            'Operational Simplicity': 'tasks',
                            'Cost Efficiency': 'hand-holding-usd',
                            'Implementation & Adoption': 'project-diagram',
                            'Cloud Architecture': 'cloud',
                            'Vendor Neutrality': 'handshake',
                            'Enterprise Readiness': 'building'
                        };
                        
                        insights.push({
                            category: category.category,
                            title: item,
                            description: `When compared to ${vendorName}, Portnox Cloud offers: ${category.items.join(', ')}`,
                            icon: categoryIcons[category.category] || 'star'
                        });
                    }
                });
            }
        }
        
        return insights;
    }
}

// Initialize TCO Calculator when page loads
document.addEventListener('DOMContentLoaded', function() {
    window.tcoCalculator = new TCOCalculator();
});
