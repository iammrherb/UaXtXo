/**
 * Interactive Risk Scenarios Module
 * Allows executives to model different breach scenarios
 */

window.RiskScenarios = {
    scenarios: {
        ransomware: {
            name: "Ransomware Attack",
            probability: { base: 0.15, withPortnox: 0.03 },
            impact: {
                financialCost: 2500000,
                downtimeHours: 72,
                dataLoss: 0.25,
                reputationScore: -35
            },
            mitigation: {
                portnoxEffectiveness: 0.85,
                recoveryTimeReduction: 0.75
            }
        },
        dataBreachExternal: {
            name: "External Data Breach",
            probability: { base: 0.12, withPortnox: 0.02 },
            impact: {
                financialCost: 4500000,
                downtimeHours: 24,
                dataLoss: 0.40,
                reputationScore: -45
            },
            mitigation: {
                portnoxEffectiveness: 0.83,
                recoveryTimeReduction: 0.70
            }
        },
        insiderThreat: {
            name: "Insider Threat",
            probability: { base: 0.08, withPortnox: 0.01 },
            impact: {
                financialCost: 1800000,
                downtimeHours: 8,
                dataLoss: 0.15,
                reputationScore: -20
            },
            mitigation: {
                portnoxEffectiveness: 0.92,
                recoveryTimeReduction: 0.85
            }
        },
        supplyChainAttack: {
            name: "Supply Chain Attack",
            probability: { base: 0.05, withPortnox: 0.015 },
            impact: {
                financialCost: 3200000,
                downtimeHours: 48,
                dataLoss: 0.30,
                reputationScore: -30
            },
            mitigation: {
                portnoxEffectiveness: 0.70,
                recoveryTimeReduction: 0.60
            }
        }
    },
    
    calculateScenarioImpact(scenarioKey, deviceCount, withPortnox = false) {
        const scenario = this.scenarios[scenarioKey];
        if (!scenario) return null;
        
        const sizeMultiplier = Math.log10(deviceCount) / 3; // Scale with org size
        const probability = withPortnox ? scenario.probability.withPortnox : scenario.probability.base;
        
        const financialImpact = scenario.impact.financialCost * sizeMultiplier;
        const expectedLoss = financialImpact * probability;
        
        if (withPortnox) {
            const mitigatedImpact = financialImpact * (1 - scenario.mitigation.portnoxEffectiveness);
            const mitigatedDowntime = scenario.impact.downtimeHours * (1 - scenario.mitigation.recoveryTimeReduction);
            
            return {
                probability: probability,
                financialImpact: mitigatedImpact,
                expectedAnnualLoss: mitigatedImpact * probability,
                downtimeHours: mitigatedDowntime,
                dataLossPercentage: scenario.impact.dataLoss * (1 - scenario.mitigation.portnoxEffectiveness),
                reputationImpact: Math.round(scenario.impact.reputationScore * 0.3)
            };
        }
        
        return {
            probability: probability,
            financialImpact: financialImpact,
            expectedAnnualLoss: expectedLoss,
            downtimeHours: scenario.impact.downtimeHours,
            dataLossPercentage: scenario.impact.dataLoss,
            reputationImpact: scenario.impact.reputationScore
        };
    },
    
    generateComparativeAnalysis(deviceCount) {
        const analysis = {};
        
        Object.keys(this.scenarios).forEach(key => {
            const current = this.calculateScenarioImpact(key, deviceCount, false);
            const withPortnox = this.calculateScenarioImpact(key, deviceCount, true);
            
            analysis[key] = {
                scenario: this.scenarios[key].name,
                current: current,
                withPortnox: withPortnox,
                improvement: {
                    probabilityReduction: ((current.probability - withPortnox.probability) / current.probability * 100).toFixed(1),
                    financialSavings: current.financialImpact - withPortnox.financialImpact,
                    downtimeReduction: current.downtimeHours - withPortnox.downtimeHours,
                    expectedValueImprovement: current.expectedAnnualLoss - withPortnox.expectedAnnualLoss
                }
            };
        });
        
        return analysis;
    }
};
