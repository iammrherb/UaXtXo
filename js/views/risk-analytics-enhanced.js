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
