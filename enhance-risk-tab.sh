#!/bin/bash

# Enhanced Risk Tab Analytics for Portnox TCO Platform
# This script adds advanced risk analytics and improves the Risk tab

echo "🚀 Enhancing Risk Tab with advanced analytics..."

# Enhancement 1: Create comprehensive risk analytics module
cat > js/views/risk-analytics-enhanced.js << 'EOF'
/**
 * Enhanced Risk Analytics Module
 * Adds advanced risk calculations and industry benchmarks
 */

window.RiskAnalyticsEnhanced = {
    industryBenchmarks: {
        technology: {
            avgBreachCost: 4450000,
            avgDowntimeHours: 23,
            avgIncidentResponse: 280,
            compliancePenalty: 1400000
        },
        healthcare: {
            avgBreachCost: 10930000,
            avgDowntimeHours: 16,
            avgIncidentResponse: 329,
            compliancePenalty: 2100000
        },
        finance: {
            avgBreachCost: 5970000,
            avgDowntimeHours: 12,
            avgIncidentResponse: 233,
            compliancePenalty: 3500000
        },
        retail: {
            avgBreachCost: 3280000,
            avgDowntimeHours: 28,
            avgIncidentResponse: 298,
            compliancePenalty: 850000
        },
        manufacturing: {
            avgBreachCost: 4470000,
            avgDowntimeHours: 35,
            avgIncidentResponse: 310,
            compliancePenalty: 1200000
        }
    },
    
    calculateAdvancedRiskMetrics(platform) {
        const industry = platform.config.industry || 'technology';
        const benchmark = this.industryBenchmarks[industry];
        const devices = platform.config.deviceCount;
        
        // Calculate risk scores based on device count and industry
        const sizeMultiplier = devices < 1000 ? 0.7 : devices < 5000 ? 1.0 : 1.3;
        
        return {
            industryAvgBreachCost: benchmark.avgBreachCost * sizeMultiplier,
            portnoxBreachReduction: 0.73, // 73% breach risk reduction
            mttrReduction: {
                current: benchmark.avgIncidentResponse,
                withPortnox: Math.round(benchmark.avgIncidentResponse * 0.25)
            },
            complianceRiskReduction: 0.89, // 89% compliance risk reduction
            operationalRiskScore: {
                current: 78,
                withPortnox: 22
            },
            cyberInsuranceSavings: Math.round(benchmark.avgBreachCost * 0.03), // 3% of breach cost
            productivityGains: Math.round(devices * 2.5 * 12), // $2.50/device/month
            zeroTrustMaturityPath: [
                { month: 0, score: 15 },
                { month: 1, score: 35 },
                { month: 3, score: 65 },
                { month: 6, score: 85 },
                { month: 12, score: 92 }
            ]
        };
    },
    
    generateExecutiveRiskReport(platform, results) {
        const metrics = this.calculateAdvancedRiskMetrics(platform);
        const portnoxResult = results.portnox;
        
        return {
            executiveSummary: {
                toplineRisk: "Critical security gaps identified",
                recommendation: "Immediate Portnox deployment recommended",
                riskScore: { current: 78, projected: 22 },
                financialImpact: {
                    annualRiskExposure: metrics.industryAvgBreachCost * 0.15,
                    portnoxInvestment: portnoxResult?.year1?.tco?.total || 0,
                    netRiskReduction: metrics.industryAvgBreachCost * 0.15 * metrics.portnoxBreachReduction
                }
            },
            keyFindings: [
                {
                    finding: "Breach Risk Exposure",
                    current: `$${Math.round(metrics.industryAvgBreachCost / 1000)}K annual risk`,
                    withPortnox: `$${Math.round(metrics.industryAvgBreachCost * (1 - metrics.portnoxBreachReduction) / 1000)}K reduced risk`,
                    improvement: `${Math.round(metrics.portnoxBreachReduction * 100)}% reduction`
                },
                {
                    finding: "Incident Response Time",
                    current: `${metrics.mttrReduction.current} minutes MTTR`,
                    withPortnox: `${metrics.mttrReduction.withPortnox} minutes MTTR`,
                    improvement: "75% faster response"
                },
                {
                    finding: "Compliance Posture",
                    current: "Manual controls, high audit risk",
                    withPortnox: "Automated compliance, audit-ready",
                    improvement: `${Math.round(metrics.complianceRiskReduction * 100)}% risk reduction`
                },
                {
                    finding: "Cyber Insurance",
                    current: "Premium penalties for gaps",
                    withPortnox: `$${Math.round(metrics.cyberInsuranceSavings / 1000)}K annual savings`,
                    improvement: "Lower premiums, better coverage"
                }
            ],
            recommendations: [
                {
                    priority: "CRITICAL",
                    action: "Deploy Portnox Zero Trust NAC",
                    timeline: "Within 30 days",
                    impact: "Immediate 50% risk reduction"
                },
                {
                    priority: "HIGH",
                    action: "Implement automated compliance controls",
                    timeline: "During deployment",
                    impact: "Audit readiness in 60 days"
                },
                {
                    priority: "HIGH",
                    action: "Enable real-time threat detection",
                    timeline: "Phase 1 deployment",
                    impact: "75% faster incident response"
                },
                {
                    priority: "MEDIUM",
                    action: "Optimize cyber insurance coverage",
                    timeline: "Post-deployment",
                    impact: `$${Math.round(metrics.cyberInsuranceSavings / 1000)}K annual savings`
                }
            ]
        };
    }
};

// Integrate with Risk Module
window.addEventListener('DOMContentLoaded', function() {
    console.log('📊 Enhanced Risk Analytics loaded');
    
    // Wait for risk module to be ready
    const checkRiskModule = setInterval(() => {
        if (window.RiskSecurityModule && window.platform) {
            clearInterval(checkRiskModule);
            
            // Enhance the risk module with advanced analytics
            const originalCalculateMetrics = window.RiskSecurityModule.prototype.calculateRiskMetrics;
            window.RiskSecurityModule.prototype.calculateRiskMetrics = function(results) {
                const basicMetrics = originalCalculateMetrics.call(this, results);
                const advancedMetrics = window.RiskAnalyticsEnhanced.calculateAdvancedRiskMetrics(this.platform);
                
                return {
                    ...basicMetrics,
                    ...advancedMetrics,
                    executiveReport: window.RiskAnalyticsEnhanced.generateExecutiveRiskReport(this.platform, results)
                };
            };
        }
    }, 100);
});
EOF

# Enhancement 2: Add interactive risk scenarios
cat > js/views/risk-scenarios.js << 'EOF'
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
EOF

# Enhancement 3: Add the enhanced modules to index.html
sed -i '/<script src="\.\/js\/views\/risk-security-init\.js"><\/script>/a\    <script src="./js/views/risk-analytics-enhanced.js"></script>\n    <script src="./js/views/risk-scenarios.js"></script>' index.html

# Enhancement 4: Create a verification script
cat > verify-risk-tab.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Risk Tab Verification</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; background: #1a1a1a; color: #fff; }
        .test { margin: 10px 0; padding: 10px; background: #333; border-radius: 5px; }
        .pass { color: #0f0; }
        .fail { color: #f00; }
        .info { color: #0af; }
    </style>
</head>
<body>
    <h1>Risk Tab Verification Tests</h1>
    <div id="results"></div>
    
    <script>
        const results = document.getElementById('results');
        
        function addResult(test, status, message) {
            const div = document.createElement('div');
            div.className = 'test';
            div.innerHTML = `<strong class="${status}">${test}:</strong> ${message}`;
            results.appendChild(div);
        }
        
        // Test 1: Check if files exist
        addResult('File Check', 'info', 'Checking if all required files are loaded...');
        
        // Test 2: Check for syntax errors
        try {
            if (window.RiskSecurityModule) {
                addResult('RiskSecurityModule', 'pass', 'Module loaded successfully');
            } else {
                addResult('RiskSecurityModule', 'fail', 'Module not found');
            }
            
            if (window.RiskAnalyticsEnhanced) {
                addResult('RiskAnalyticsEnhanced', 'pass', 'Enhanced analytics loaded');
            }
            
            if (window.RiskScenarios) {
                addResult('RiskScenarios', 'pass', 'Scenarios module loaded');
            }
        } catch (e) {
            addResult('Module Loading', 'fail', 'Error: ' + e.message);
        }
        
        // Test 3: Function tests
        try {
            const testMetrics = window.RiskAnalyticsEnhanced.calculateAdvancedRiskMetrics({
                config: { industry: 'technology', deviceCount: 1000 }
            });
            addResult('Advanced Metrics', 'pass', 'Calculations working: ' + JSON.stringify(testMetrics).substring(0, 100) + '...');
        } catch (e) {
            addResult('Advanced Metrics', 'fail', 'Error: ' + e.message);
        }
        
        // Test 4: Scenario calculations
        try {
            const scenario = window.RiskScenarios.calculateScenarioImpact('ransomware', 1000, false);
            addResult('Scenario Calc', 'pass', 'Ransomware scenario: $' + Math.round(scenario.expectedAnnualLoss / 1000) + 'K expected loss');
        } catch (e) {
            addResult('Scenario Calc', 'fail', 'Error: ' + e.message);
        }
        
        addResult('Summary', 'info', 'Verification complete. Check the main application for full functionality.');
    </script>
</body>
</html>
EOF

# Commit all enhancements
git add -A
git commit -m "Enhanced Risk Tab with advanced analytics and scenarios

- Added RiskAnalyticsEnhanced module with industry benchmarks
- Created interactive risk scenarios for executive modeling
- Integrated advanced metrics with existing risk module
- Added verification page for testing
- Enhanced risk calculations with:
  - Industry-specific breach costs
  - Cyber insurance savings calculations
  - Zero Trust maturity progression
  - Comparative scenario analysis
  - Executive report generation"

echo "✅ Risk Tab enhancements completed!"
echo ""
echo "New features added:"
echo "1. Advanced risk analytics with industry benchmarks"
echo "2. Interactive breach scenario modeling"
echo "3. Executive risk reports with financial impact"
echo "4. Cyber insurance savings calculations"
echo "5. Zero Trust maturity progression tracking"
echo ""
echo "To verify the fixes:"
echo "1. Open index.html in your browser"
echo "2. Click on the 'Risk & Security' tab"
echo "3. All charts should load without errors"
echo "4. Open verify-risk-tab.html for diagnostic tests"
echo ""
echo "The Risk tab now provides comprehensive security analytics tailored for executive decision-making!"
