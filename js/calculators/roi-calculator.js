/**
 * ROI Calculator
 * Calculates Return on Investment metrics
 */

const ROICalculator = (function() {
    
    function calculate(tcoResults, wizardState) {
        const roiMetrics = {};
        
        // Calculate ROI for each vendor comparison
        Object.keys(tcoResults.savings).forEach(vendorId => {
            const savings = tcoResults.savings[vendorId];
            const currentVendor = tcoResults.vendors[vendorId];
            const portnox = tcoResults.vendors.portnox;
            
            roiMetrics[vendorId] = calculateVendorROI(
                currentVendor,
                portnox,
                savings,
                wizardState
            );
        });
        
        return roiMetrics;
    }
    
    function calculateVendorROI(currentVendor, portnox, savings, wizardState) {
        const years = wizardState.costConfig.yearsToProject;
        
        // Basic ROI metrics
        const roi = {
            totalSavings: savings.totalSavings,
            percentageSavings: savings.savingsPercentage,
            paybackPeriod: savings.paybackMonths,
            roi: savings.roi,
            npv: calculateNPV(currentVendor, portnox, years),
            irr: calculateIRR(currentVendor, portnox, years)
        };
        
        // Additional business impact metrics
        roi.businessImpact = calculateBusinessImpact(currentVendor, portnox, wizardState);
        roi.riskReduction = calculateRiskReduction(currentVendor, portnox, wizardState);
        roi.efficiencyGains = calculateEfficiencyGains(currentVendor, portnox);
        
        return roi;
    }
    
    function calculateNPV(currentVendor, portnox, years) {
        const discountRate = 0.08; // 8% discount rate
        let npv = -portnox.totalInitial; // Initial investment
        
        for (let year = 1; year <= years; year++) {
            const cashFlow = currentVendor.totalAnnual - portnox.totalAnnual;
            npv += cashFlow / Math.pow(1 + discountRate, year);
        }
        
        return npv;
    }
    
    function calculateIRR(currentVendor, portnox, years) {
        // Simplified IRR calculation
        const initialInvestment = portnox.totalInitial;
        const annualSavings = currentVendor.totalAnnual - portnox.totalAnnual;
        
        // Using approximation for IRR
        if (initialInvestment <= 0) return 0;
        
        const totalReturns = annualSavings * years;
        const averageAnnualReturn = totalReturns / years;
        const irr = (averageAnnualReturn / initialInvestment) * 100;
        
        return Math.min(irr, 100); // Cap at 100%
    }
    
    function calculateBusinessImpact(currentVendor, portnox, wizardState) {
        const impact = {
            productivityGains: 0,
            downtimeReduction: 0,
            staffReallocation: 0,
            complianceImprovement: 0
        };
        
        // Productivity gains from faster deployment
        const deploymentTimeSaved = currentVendor.metrics.deploymentTime - portnox.metrics.deploymentTime;
        impact.productivityGains = deploymentTimeSaved * 1000 * wizardState.costConfig.deviceCount / 100;
        
        // Downtime reduction value
        const downtimeSaved = currentVendor.annualCosts.downtime - portnox.annualCosts.downtime;
        impact.downtimeReduction = downtimeSaved;
        
        // Staff reallocation value
        const fteSaved = currentVendor.metrics.ftesRequired - portnox.metrics.ftesRequired;
        impact.staffReallocation = fteSaved * 100000; // Average IT staff cost
        
        // Compliance improvement value
        const complianceScore = calculateComplianceImprovement(currentVendor, portnox, wizardState);
        impact.complianceImprovement = complianceScore * 10000; // $10k per compliance point
        
        return impact;
    }
    
    function calculateRiskReduction(currentVendor, portnox, wizardState) {
        const industry = wizardState.industry;
        const industryData = window.industryData[industry];
        
        if (!industryData) return 0;
        
        const currentRisk = industryData.riskFactors.dataBreachCost * 
            (currentVendor.metrics.securityScore ? (10 - currentVendor.metrics.securityScore) / 10 : 1);
        
        const portnoxRisk = industryData.riskFactors.dataBreachCost * 
            (10 - portnox.metrics.securityScore) / 10;
        
        return ((currentRisk - portnoxRisk) / currentRisk) * 100;
    }
    
    function calculateEfficiencyGains(currentVendor, portnox) {
        const gains = {
            deploymentSpeed: ((currentVendor.metrics.deploymentTime - portnox.metrics.deploymentTime) / 
                currentVendor.metrics.deploymentTime) * 100,
            staffEfficiency: ((currentVendor.metrics.ftesRequired - portnox.metrics.ftesRequired) / 
                currentVendor.metrics.ftesRequired) * 100,
            scalability: (portnox.metrics.scalabilityScore - currentVendor.metrics.scalabilityScore) * 10,
            cloudReadiness: (portnox.metrics.cloudReadiness - currentVendor.metrics.cloudReadiness) * 10
        };
        
        return gains;
    }
    
    function calculateComplianceImprovement(currentVendor, portnox, wizardState) {
        const frameworks = [...wizardState.complianceFrameworks, ...wizardState.customCompliance];
        
        // Simplified compliance score calculation
        const currentScore = currentVendor.metrics.securityScore * 10;
        const portnoxScore = portnox.metrics.securityScore * 10;
        
        return portnoxScore - currentScore;
    }
    
    // Public API
    return {
        calculate,
        calculateVendorROI,
        calculateNPV,
        calculateIRR
    };
})();

// Export for use in other modules
window.ROICalculator = ROICalculator;
