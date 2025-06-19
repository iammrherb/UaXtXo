// Advanced TCO Calculation Engine with Risk & Compliance
class AdvancedTCOCalculator {
    constructor() {
        this.vendors = {};
        this.deviceCount = 500;
        this.years = 3;
        this.riskFactors = {};
        this.complianceRequirements = {};
    }

    calculateComprehensiveTCO(vendor, devices, years) {
        const baseTCO = this.calculateBaseTCO(vendor, devices, years);
        const riskCosts = this.calculateRiskCosts(vendor, devices, years);
        const complianceCosts = this.calculateComplianceCosts(vendor, devices, years);
        const opportunityCosts = this.calculateOpportunityCosts(vendor, devices, years);
        
        return {
            baseTCO,
            riskCosts,
            complianceCosts,
            opportunityCosts,
            totalTCO: baseTCO.total + riskCosts.total + complianceCosts.total + opportunityCosts.total,
            savings: this.calculateSavings(vendor, devices, years),
            roi: this.calculateROI(vendor, devices, years),
            riskScore: this.calculateRiskScore(vendor),
            complianceScore: this.calculateComplianceScore(vendor)
        };
    }

    calculateBaseTCO(vendor, devices, years) {
        const scaleFactor = devices / 500;
        const baseline = vendor.baseline_500_devices;
        
        return {
            licensing: this.calculateLicensing(baseline.licensing, scaleFactor, years),
            implementation: baseline.implementation.professional_services,
            fte: baseline.fte_requirements.annual_cost * years * scaleFactor,
            infrastructure: this.calculateInfrastructure(baseline.infrastructure, scaleFactor, years),
            support: baseline.support.annual_cost * years,
            total: 0 // Will be calculated
        };
    }

    calculateRiskCosts(vendor, devices, years) {
        const riskProfile = vendor.risk_profile;
        const baseIncidentCost = 4450000; // Average data breach cost
        const incidentsPerYear = 12; // Industry average
        
        const preventedIncidents = incidentsPerYear * (riskProfile.incident_reduction / 100);
        const costAvoided = preventedIncidents * baseIncidentCost * years;
        
        return {
            dataBreachRisk: baseIncidentCost * (1 - riskProfile.breach_prevention / 100),
            ransomwareRisk: 4620000 * (1 - riskProfile.security_effectiveness / 100),
            downtimeRisk: 5770000 * (1 - riskProfile.incident_reduction / 100),
            reputationRisk: 3900000 * (1 - riskProfile.security_effectiveness / 100),
            total: 0, // Sum of above
            prevented: costAvoided
        };
    }

    calculateComplianceCosts(vendor, devices, years) {
        const compliance = vendor.compliance_coverage;
        const frameworks = compliance.frameworks;
        const violationCosts = {
            GDPR: 20000000,
            HIPAA: 1500000,
            PCI_DSS: 1000000,
            SOX: 5000000,
            NIST: 250000
        };
        
        let totalComplianceCost = 0;
        let totalPrevented = 0;
        
        Object.entries(frameworks).forEach(([framework, coverage]) => {
            const baseCost = violationCosts[framework] || 500000;
            const risk = (100 - coverage.coverage) / 100;
            const cost = baseCost * risk;
            totalComplianceCost += cost;
            totalPrevented += baseCost * (coverage.coverage / 100);
        });
        
        return {
            annualAuditCost: 50000 * (100 - compliance.violation_impact.audit_time_reduction) / 100,
            violationRisk: totalComplianceCost,
            automationSavings: 100000 * (compliance.violation_impact.compliance_cost_reduction / 100),
            total: totalComplianceCost / years,
            prevented: totalPrevented
        };
    }

    calculateOpportunityCosts(vendor, devices, years) {
        const deploymentDays = vendor.baseline_500_devices.implementation.duration_days;
        const dailyRevenueLoss = 50000; // Average for mid-size enterprise
        const productivityLoss = devices * 100 * deploymentDays; // $100/device/day
        
        return {
            deploymentDelay: deploymentDays * dailyRevenueLoss,
            productivityLoss: productivityLoss,
            innovationDelay: deploymentDays > 10 ? 500000 : 0,
            total: (deploymentDays * dailyRevenueLoss + productivityLoss) / years
        };
    }

    calculateSavings(vendor, devices, years) {
        // Compare against industry average
        const industryAvgCost = 350000 * (devices / 500) * years;
        const vendorCost = vendor.projections[years + '_year'].total_cost * (devices / 500);
        
        return {
            totalSavings: industryAvgCost - vendorCost,
            percentageSavings: ((industryAvgCost - vendorCost) / industryAvgCost) * 100,
            annualSavings: (industryAvgCost - vendorCost) / years
        };
    }

    calculateROI(vendor, devices, years) {
        const investment = vendor.baseline_500_devices.implementation.professional_services;
        const savings = this.calculateSavings(vendor, devices, years);
        const roi = (savings.totalSavings / investment) * 100;
        const paybackMonths = (investment / savings.annualSavings) * 12;
        
        return {
            percentage: roi,
            paybackMonths: Math.ceil(paybackMonths),
            breakEvenDate: new Date(Date.now() + paybackMonths * 30 * 24 * 60 * 60 * 1000)
        };
    }

    calculateRiskScore(vendor) {
        const weights = {
            security_effectiveness: 0.3,
            incident_reduction: 0.2,
            breach_prevention: 0.3,
            compliance_automation: 0.2
        };
        
        let score = 0;
        Object.entries(weights).forEach(([metric, weight]) => {
            score += (vendor.risk_profile[metric] || 0) * weight;
        });
        
        return Math.round(score);
    }

    calculateComplianceScore(vendor) {
        const frameworks = vendor.compliance_coverage.frameworks;
        let totalScore = 0;
        let count = 0;
        
        Object.values(frameworks).forEach(framework => {
            totalScore += framework.coverage * (framework.automated / 100);
            count++;
        });
        
        return Math.round(totalScore / count);
    }

    generateExecutiveMetrics(vendor, devices, years) {
        const tco = this.calculateComprehensiveTCO(vendor, devices, years);
        
        return {
            headline_savings: `${(tco.savings.totalSavings / 1000).toFixed(0)}K`,
            roi_percentage: `${tco.roi.percentage.toFixed(0)}%`,
            payback_period: `${tco.roi.paybackMonths} months`,
            risk_reduction: `${vendor.risk_profile.incident_reduction}%`,
            compliance_score: `${tco.complianceScore}%`,
            deployment_time: `${vendor.baseline_500_devices.implementation.duration_days} days`,
            incidents_prevented: vendor.projections[years + '_year'].incidents_prevented,
            key_message: this.generateKeyMessage(vendor, tco)
        };
    }

    generateKeyMessage(vendor, tco) {
        if (vendor.name === 'Portnox') {
            return `Portnox delivers ${tco.savings.percentageSavings.toFixed(0)}% TCO savings with ${vendor.risk_profile.security_effectiveness}% security effectiveness and ${vendor.risk_profile.compliance_automation}% automated compliance.`;
        } else {
            return `Traditional approach results in ${tco.roi.paybackMonths} month payback with limited automation and higher operational overhead.`;
        }
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedTCOCalculator;
}
