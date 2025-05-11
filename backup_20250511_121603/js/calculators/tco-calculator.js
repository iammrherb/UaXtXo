/**
 * Enhanced TCO Calculator
 * Calculates Total Cost of Ownership with multi-vendor comparison
 */

const TCOCalculator = (function() {
    
    function calculate(wizardState) {
        const results = {
            vendors: {},
            comparison: {},
            savings: {},
            charts: {}
        };
        
        // Calculate TCO for each selected vendor
        wizardState.selectedVendors.forEach(vendorId => {
            results.vendors[vendorId] = calculateVendorTCO(vendorId, wizardState);
        });
        
        // Always calculate Portnox TCO for comparison
        results.vendors.portnox = calculatePortnoxTCO(wizardState);
        
        // Calculate comparisons and savings
        wizardState.selectedVendors.forEach(vendorId => {
            if (vendorId !== 'portnox') {
                results.comparison[vendorId] = compareVendors(
                    results.vendors[vendorId],
                    results.vendors.portnox
                );
                results.savings[vendorId] = calculateSavings(
                    results.vendors[vendorId],
                    results.vendors.portnox,
                    wizardState.costConfig.yearsToProject
                );
            }
        });
        
        // Generate chart data
        results.charts = generateChartData(results, wizardState);
        
        return results;
    }
    
    function calculateVendorTCO(vendorId, wizardState) {
        const vendor = window.vendorData[vendorId];
        if (!vendor) return null;
        
        const { costConfig, sensitivityFactors } = wizardState;
        const years = costConfig.yearsToProject;
        
        // Apply sensitivity factors
        const sensitivityMultipliers = {
            hardware: 1 + (sensitivityFactors.hardwareCost / 100),
            personnel: 1 + (sensitivityFactors.itStaffCost / 100),
            energy: 1 + (sensitivityFactors.energyCost / 100),
            downtime: 1 + (sensitivityFactors.downtime / 100),
            security: 1 + (sensitivityFactors.security / 100)
        };
        
        // Initial costs
        const initialCosts = {
            hardware: vendor.initialCosts.hardware * sensitivityMultipliers.hardware,
            software: vendor.initialCosts.software,
            implementation: vendor.initialCosts.implementation,
            training: vendor.initialCosts.training
        };
        
        // Annual costs
        const annualCosts = {
            licensing: vendor.annualCosts.licensing,
            maintenance: vendor.annualCosts.maintenance,
            support: vendor.annualCosts.support,
            personnel: vendor.annualCosts.personnel * sensitivityMultipliers.personnel,
            energy: vendor.annualCosts.energy * sensitivityMultipliers.energy,
            upgrades: vendor.annualCosts.upgrades,
            downtime: calculateDowntimeCost(vendor, wizardState) * sensitivityMultipliers.downtime,
            security: calculateSecurityRiskCost(vendor, wizardState) * sensitivityMultipliers.security
        };
        
        // Calculate total
        const totalInitial = Object.values(initialCosts).reduce((a, b) => a + b, 0);
        const totalAnnual = Object.values(annualCosts).reduce((a, b) => a + b, 0);
        const totalTCO = totalInitial + (totalAnnual * years);
        
        return {
            vendorId,
            vendorName: vendor.name,
            initialCosts,
            annualCosts,
            totalInitial,
            totalAnnual,
            totalTCO,
            metrics: vendor.metrics
        };
    }
    
    function calculatePortnoxTCO(wizardState) {
        const { costConfig, sensitivityFactors } = wizardState;
        const years = costConfig.yearsToProject;
        const devices = costConfig.deviceCount;
        
        // Portnox pricing calculation
        const monthlyPerDevice = costConfig.portnoxCostPerDevice;
        const annualLicensing = monthlyPerDevice * 12 * devices;
        
        // Support level costs
        const supportCosts = {
            basic: 0,
            standard: devices * 2, // $2 per device annually
            premium: devices * 5,   // $5 per device annually
            enterprise: devices * 8 // $8 per device annually
        };
        
        // Professional services costs
        const servicesCosts = {
            none: 0,
            basic: 15000,
            advanced: 30000,
            full: 50000
        };
        
        // Apply sensitivity factors
        const sensitivityMultipliers = {
            personnel: 1 + (sensitivityFactors.itStaffCost / 100),
            security: 1 + (sensitivityFactors.security / 100)
        };
        
        // Initial costs
        const initialCosts = {
            hardware: 0,
            software: 0,
            implementation: servicesCosts[costConfig.professionalServices] || 0,
            training: 5000
        };
        
        // Annual costs
        const annualCosts = {
            licensing: annualLicensing,
            maintenance: 0,
            support: supportCosts[costConfig.supportLevel] || 0,
            personnel: 40000 * sensitivityMultipliers.personnel, // Reduced IT staff requirement
            energy: 0,
            upgrades: 0,
            downtime: 5000, // Minimal downtime with cloud
            security: 10000 * sensitivityMultipliers.security // Reduced security risk
        };
        
        // Calculate total
        const totalInitial = Object.values(initialCosts).reduce((a, b) => a + b, 0);
        const totalAnnual = Object.values(annualCosts).reduce((a, b) => a + b, 0);
        const totalTCO = totalInitial + (totalAnnual * years);
        
        return {
            vendorId: 'portnox',
            vendorName: 'Portnox Cloud',
            initialCosts,
            annualCosts,
            totalInitial,
            totalAnnual,
            totalTCO,
            metrics: window.vendorData.portnox.metrics
        };
    }
    
    function calculateDowntimeCost(vendor, wizardState) {
        // Base downtime hours per year by vendor type
        const downtimeHours = {
            'On-Premises': 48,
            'Cloud': 8,
            'Cloud-Native': 4,
            'None': 120
        };
        
        const hoursPerYear = downtimeHours[vendor.type] || 24;
        const costPerHour = wizardState.costConfig.deviceCount * 50; // $50 per device per hour
        
        return hoursPerYear * costPerHour;
    }
    
    function calculateSecurityRiskCost(vendor, wizardState) {
        // Security risk multiplier by vendor type
        const riskMultipliers = {
            'On-Premises': 1.0,
            'Cloud': 0.6,
            'Cloud-Native': 0.4,
            'None': 3.0
        };
        
        const industry = wizardState.industry;
        const industryData = window.industryData[industry];
        const baseRiskCost = industryData ? industryData.riskFactors.dataBreachCost * 100000 : 200000;
        
        const multiplier = riskMultipliers[vendor.type] || 1.0;
        const securityScore = vendor.metrics.securityScore || 0;
        const scoreFactor = securityScore > 0 ? (10 - securityScore) / 10 : 1;
        
        return baseRiskCost * multiplier * scoreFactor;
    }
    
    function compareVendors(vendor1, vendor2) {
        const comparison = {
            tcoReduction: ((vendor1.totalTCO - vendor2.totalTCO) / vendor1.totalTCO) * 100,
            initialCostReduction: ((vendor1.totalInitial - vendor2.totalInitial) / vendor1.totalInitial) * 100,
            annualCostReduction: ((vendor1.totalAnnual - vendor2.totalAnnual) / vendor1.totalAnnual) * 100,
            deploymentTimeReduction: ((vendor1.metrics.deploymentTime - vendor2.metrics.deploymentTime) / vendor1.metrics.deploymentTime) * 100,
            fteReduction: ((vendor1.metrics.ftesRequired - vendor2.metrics.ftesRequired) / vendor1.metrics.ftesRequired) * 100
        };
        
        return comparison;
    }
    
    function calculateSavings(currentVendor, portnox, years) {
        const totalSavings = currentVendor.totalTCO - portnox.totalTCO;
        const annualSavings = currentVendor.totalAnnual - portnox.totalAnnual;
        const monthlySavings = annualSavings / 12;
        
        // Calculate ROI
        const investment = portnox.totalInitial;
        const returns = totalSavings;
        const roi = investment > 0 ? (returns / investment) * 100 : 0;
        
        // Calculate payback period
        const paybackMonths = investment > 0 ? investment / monthlySavings : 0;
        
        return {
            totalSavings,
            annualSavings,
            monthlySavings,
            roi,
            paybackMonths,
            savingsPercentage: (totalSavings / currentVendor.totalTCO) * 100
        };
    }
    
    function generateChartData(results, wizardState) {
        const chartData = {
            tcoComparison: {
                labels: [],
                datasets: []
            },
            costBreakdown: {
                labels: ['Initial', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
                datasets: []
            },
            annualCosts: {
                labels: [],
                datasets: []
            },
            savingsOverTime: {
                labels: [],
                datasets: []
            }
        };
        
        // Prepare TCO comparison data
        Object.values(results.vendors).forEach(vendor => {
            chartData.tcoComparison.labels.push(vendor.vendorName);
        });
        
        chartData.tcoComparison.datasets.push({
            label: 'Total Cost of Ownership',
            data: Object.values(results.vendors).map(v => v.totalTCO),
            backgroundColor: Object.keys(results.vendors).map(id => 
                id === 'portnox' ? '#2BD25B' : '#1B67B2'
            )
        });
        
        // Prepare cost breakdown over time
        Object.values(results.vendors).forEach(vendor => {
            const data = [vendor.totalInitial];
            for (let year = 1; year <= 5; year++) {
                if (year <= wizardState.costConfig.yearsToProject) {
                    data.push(vendor.totalInitial + (vendor.totalAnnual * year));
                }
            }
            
            chartData.costBreakdown.datasets.push({
                label: vendor.vendorName,
                data: data,
                borderColor: vendor.vendorId === 'portnox' ? '#2BD25B' : '#1B67B2',
                fill: false
            });
        });
        
        // Annual costs breakdown
        const costCategories = ['Licensing', 'Maintenance', 'Support', 'Personnel', 'Energy', 'Security'];
        chartData.annualCosts.labels = costCategories;
        
        Object.values(results.vendors).forEach(vendor => {
            chartData.annualCosts.datasets.push({
                label: vendor.vendorName,
                data: [
                    vendor.annualCosts.licensing,
                    vendor.annualCosts.maintenance,
                    vendor.annualCosts.support,
                    vendor.annualCosts.personnel,
                    vendor.annualCosts.energy,
                    vendor.annualCosts.security
                ],
                backgroundColor: vendor.vendorId === 'portnox' ? '#2BD25B' : '#1B67B2'
            });
        });
        
        return chartData;
    }
    
    // Public API
    return {
        calculate,
        calculateVendorTCO,
        calculatePortnoxTCO
    };
})();

// Export for use in other modules
window.TCOCalculator = TCOCalculator;
