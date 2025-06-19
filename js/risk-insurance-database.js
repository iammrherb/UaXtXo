// Risk & Insurance Database
window.RiskInsuranceDatabase = {
    riskFactors: {
        "No NAC": {
            score: 9.5,
            breachProbability: 0.68,
            avgBreachCost: 4450000,
            insurancePremiumMultiplier: 1.5
        },
        "Legacy NAC": {
            score: 6.5,
            breachProbability: 0.42,
            avgBreachCost: 2800000,
            insurancePremiumMultiplier: 1.2
        },
        "Cloud NAC": {
            score: 3.0,
            breachProbability: 0.15,
            avgBreachCost: 950000,
            insurancePremiumMultiplier: 0.85
        }
    },
    insuranceImpact: {
        "Portnox": {
            premiumReduction: 0.15,
            deductibleReduction: 0.20,
            coverageIncrease: 0.25
        },
        "Legacy": {
            premiumReduction: 0.05,
            deductibleReduction: 0.10,
            coverageIncrease: 0.10
        }
    }
};
