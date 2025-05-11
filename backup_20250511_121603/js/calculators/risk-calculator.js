/**
 * Risk Calculator
 * Calculates security and operational risk metrics
 */

const RiskCalculator = (function() {
    
    function calculate(tcoResults, wizardState) {
        const riskMetrics = {};
        
        // Calculate risk metrics for each vendor
        Object.values(tcoResults.vendors).forEach(vendor => {
            riskMetrics[vendor.vendorId] = calculateVendorRisk(vendor, wizardState);
        });
        
        // Calculate risk comparisons
        const comparisons = {};
        wizardState.selectedVendors.forEach(vendorId => {
            if (vendorId !== 'portnox') {
                comparisons[vendorId] = compareRisks(
                    riskMetrics[vendorId],
                    riskMetrics.portnox
                );
            }
        });
        
        return {
            vendors: riskMetrics,
            comparisons
        };
    }
    
    function calculateVendorRisk(vendor, wizardState) {
        const industry = wizardState.industry;
        const industryData = window.industryData[industry];
        
        const risks = {
            security: calculateSecurityRisk(vendor, industryData),
            operational: calculateOperationalRisk(vendor),
            compliance: calculateComplianceRisk(vendor, wizardState),
            financial: calculateFinancialRisk(vendor, industryData),
            overall: 0
        };
        
        // Calculate overall risk score
        risks.overall = (
            risks.security * 0.4 +
            risks.operational * 0.2 +
            risks.compliance * 0.25 +
            risks.financial * 0.15
        );
        
        return risks;
    }
    
    function calculateSecurityRisk(vendor, industryData) {
        const baseRisk = 100;
        const securityScore = vendor.metrics.securityScore || 0;
        const vendorTypeMultiplier = {
            'Cloud-Native': 0.6,
            'Cloud': 0.7,
            'On-Premises': 1.0,
            'None': 1.5
        };
        
        const typeMultiplier = vendorTypeMultiplier[vendor.type] || 1.0;
        const securityRisk = baseRisk * (1 - securityScore / 10) * typeMultiplier;
        
        // Adjust for industry-specific risks
        if (industryData && industryData.securityPriority === 'critical') {
            return securityRisk * 1.5;
        }
        
        return securityRisk;
    }
    
    function calculateOperationalRisk(vendor) {
        const factors = {
            complexity: vendor.metrics.complexityScore || 5,
            deploymentTime: vendor.metrics.deploymentTime || 30,
            ftesRequired: vendor.metrics.ftesRequired || 1,
            scalability: vendor.metrics.scalabilityScore || 5
        };
        
        // Higher complexity and resource requirements increase risk
        const complexityRisk = factors.complexity * 10;
        const resourceRisk = factors.ftesRequired * 20;
        const timeRisk = factors.deploymentTime / 3;
        const scalabilityRisk = (10 - factors.scalability) * 5;
        
        return (complexityRisk + resourceRisk + timeRisk + scalabilityRisk) / 4;
    }
    
    function calculateComplianceRisk(vendor, wizardState) {
        const frameworks = [...wizardState.complianceFrameworks, ...wizardState.customCompliance];
        
        if (frameworks.length === 0) return 0;
        
        // Simplified compliance risk calculation
        const vendorCapability = vendor.metrics.securityScore || 0;
        const complianceGap = 10 - vendorCapability;
        
        return complianceGap * frameworks.length * 5;
    }
    
    function calculateFinancialRisk(vendor, industryData) {
        // Financial risk based on potential breach costs
        if (!industryData) return 50;
        
        const breachCost = industryData.riskFactors.dataBreachCost || 3;
        const vendorProtection = vendor.metrics.securityScore || 0;
        
        return breachCost * (10 - vendorProtection) * 10;
    }
    
    function compareRisks(vendor1Risk, vendor2Risk) {
        const comparison = {};
        
        ['security', 'operational', 'compliance', 'financial', 'overall'].forEach(category => {
            const reduction = ((vendor1Risk[category] - vendor2Risk[category]) / vendor1Risk[category]) * 100;
            comparison[category] = {
                reduction: reduction,
                vendor1Score: vendor1Risk[category],
                vendor2Score: vendor2Risk[category]
            };
        });
        
        return comparison;
    }
    
    // Public API
    return {
        calculate,
        calculateVendorRisk,
        compareRisks
    };
})();

// Export for use in other modules
window.RiskCalculator = RiskCalculator;
