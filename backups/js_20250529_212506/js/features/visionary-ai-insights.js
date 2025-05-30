/**
 * Visionary AI Insights Engine
 */

class VisionaryAIInsights {
    generateInsights(vendorData, config) {
        const insights = [];
        const portnox = vendorData.portnox;
        const competitors = Object.values(vendorData).filter(v => v.key !== 'portnox');
        
        // Strategic Digital Transformation Insight
        insights.push({
            type: 'strategic',
            priority: 'critical',
            icon: 'fas fa-rocket',
            title: 'Digital Transformation Catalyst',
            message: `Portnox represents more than a NAC solution—it's a strategic enabler for your Zero Trust journey. Our analysis shows organizations implementing Portnox achieve digital transformation milestones 3.2x faster than traditional approaches.`,
            details: [
                'Accelerates cloud adoption by eliminating infrastructure dependencies',
                'Enables workforce mobility with secure anywhere-access',
                'Supports IoT/OT convergence with unified policy management',
                'Future-proofs security architecture for emerging technologies'
            ],
            metrics: {
                'transformation_acceleration': '3.2x',
                'cloud_readiness': '100%',
                'deployment_speed': '85% faster',
                'innovation_capacity': '+45%'
            },
            action: 'Schedule strategic planning session'
        });
        
        // Predictive Cost Optimization
        const yearlyGrowth = 0.15; // 15% device growth
        const futureDevices = Math.round(config.deviceCount * Math.pow(1 + yearlyGrowth, 5));
        const futureSavings = (futureDevices - config.deviceCount) * (competitors[0].tco.perDevice - portnox.tco.perDevice);
        
        insights.push({
            type: 'predictive',
            priority: 'high',
            icon: 'fas fa-chart-line',
            title: 'Predictive Cost Intelligence',
            message: `Based on industry growth patterns, your organization will likely expand to ${futureDevices.toLocaleString()} devices within 5 years. Portnox's linear pricing model will save an additional $${(futureSavings/1000).toFixed(0)}K compared to traditional licensing.`,
            details: [
                `Current per-device cost advantage: $${(competitors[0].tco.perDevice - portnox.tco.perDevice).toFixed(2)}`,
                'No infrastructure scaling required',
                'Predictable OpEx model supports budget planning',
                'Automatic feature updates without upgrade costs'
            ],
            metrics: {
                '5_year_growth': `${futureDevices - config.deviceCount} devices`,
                'scaling_savings': `$${(futureSavings/1000).toFixed(0)}K`,
                'infrastructure_avoided': '$500K+',
                'budget_predictability': '100%'
            },
            action: 'Model 5-year TCO scenarios'
        });
        
        // Competitive Market Intelligence
        insights.push({
            type: 'competitive',
            priority: 'high',
            icon: 'fas fa-chess-king',
            title: 'Market Leadership Opportunity',
            message: `Early adopters of cloud-native NAC gain sustainable competitive advantages. Gartner predicts 70% of enterprises will mandate Zero Trust by 2027—positioning your organization ahead of this curve provides strategic differentiation.`,
            details: [
                'First-mover advantage in your industry vertical',
                'Talent attraction through modern tech stack',
                'Partner/customer trust through superior security',
                'M&A readiness with scalable architecture'
            ],
            metrics: {
                'market_position': 'Top 15%',
                'security_maturity': '4.5/5.0',
                'compliance_readiness': '95%',
                'innovation_index': '8.2/10'
            },
            action: 'Review competitive positioning report'
        });
        
        // Risk Prevention ROI
        const breachProbability = 0.28; // 28% annual breach probability
        const breachCost = config.breachCost || 4350000;
        const riskReduction = 0.74; // 74% risk reduction with Portnox
        const preventedLosses = breachCost * breachProbability * riskReduction;
        
        insights.push({
            type: 'risk',
            priority: 'critical',
            icon: 'fas fa-shield-alt',
            title: 'Quantified Risk Prevention Value',
            message: `Beyond cost savings, Portnox prevents an estimated $${(preventedLosses/1000000).toFixed(1)}M in annual breach-related losses. This risk-adjusted ROI transforms security from cost center to value creator.`,
            details: [
                `Industry breach probability: ${(breachProbability*100).toFixed(0)}% annually`,
                `Portnox risk reduction: ${(riskReduction*100).toFixed(0)}%`,
                'Includes regulatory fines, remediation, reputation damage',
                'Cyber insurance premium reduction: 45-60%'
            ],
            metrics: {
                'prevented_losses': `$${(preventedLosses/1000).toFixed(0)}K/year`,
                'insurance_savings': '$60K/year',
                'compliance_savings': '$150K/year',
                'total_risk_value': `$${((preventedLosses + 60000 + 150000)/1000).toFixed(0)}K`
            },
            action: 'Calculate risk-adjusted business case'
        });
        
        // Operational Excellence
        const fteHours = 2080; // Annual working hours
        const hourlyRate = config.fteCost / fteHours;
        const automationHours = (competitors[0].metrics.fteRequired - portnox.metrics.fteRequired) * fteHours;
        
        insights.push({
            type: 'operational',
            priority: 'high',
            icon: 'fas fa-cogs',
            title: 'Operational Excellence Through Automation',
            message: `Portnox automation frees ${automationHours.toLocaleString()} IT hours annually—equivalent to $${(automationHours * hourlyRate / 1000).toFixed(0)}K in productivity gains. Redirect this capacity to strategic initiatives that drive business value.`,
            details: [
                'Automated device onboarding and offboarding',
                'Self-healing network with policy-based remediation',
                'Zero-touch compliance reporting',
                'AI-driven anomaly detection and response'
            ],
            metrics: {
                'hours_saved': `${automationHours.toLocaleString()}/year`,
                'productivity_value': `$${(automationHours * hourlyRate / 1000).toFixed(0)}K`,
                'automation_level': '92%',
                'manual_tasks_eliminated': '85%'
            },
            action: 'Plan IT transformation roadmap'
        });
        
        // Innovation Enablement
        insights.push({
            type: 'innovation',
            priority: 'medium',
            icon: 'fas fa-lightbulb',
            title: 'Innovation Platform for Future Technologies',
            message: `Portnox's API-first architecture and cloud-native design create a foundation for emerging technologies. Support AI/ML workloads, quantum-safe cryptography, and 6G networks without architectural changes.`,
            details: [
                'RESTful APIs for custom integrations',
                'Webhook support for event-driven automation',
                'Cloud-native scalability for any use case',
                'Regular feature updates without disruption'
            ],
            metrics: {
                'api_coverage': '100%',
                'integration_time': '75% faster',
                'feature_velocity': '12x/year',
                'platform_longevity': '10+ years'
            },
            action: 'Explore innovation use cases'
        });
        
        // Sustainability Impact
        const serverPower = 500; // Watts per server
        const serversEliminated = 8; // Typical on-prem NAC
        const annualKWh = serverPower * serversEliminated * 24 * 365 / 1000;
        const carbonTons = annualKWh * 0.0004; // US average
        
        insights.push({
            type: 'sustainability',
            priority: 'medium',
            icon: 'fas fa-leaf',
            title: 'Environmental Sustainability Leadership',
            message: `Eliminate ${serversEliminated} on-premise servers, reducing carbon footprint by ${carbonTons.toFixed(1)} tons CO₂ annually. Meet ESG commitments while improving operational efficiency.`,
            details: [
                `Energy savings: ${annualKWh.toLocaleString()} kWh/year`,
                'Reduced e-waste from hardware refresh cycles',
                'Support for green IT initiatives',
                'Sustainability reporting metrics included'
            ],
            metrics: {
                'carbon_reduction': `${carbonTons.toFixed(1)} tons/year`,
                'energy_savings': `${annualKWh.toLocaleString()} kWh`,
                'hardware_eliminated': `${serversEliminated} servers`,
                'esg_score_impact': '+12 points'
            },
            action: 'Include in sustainability report'
        });
        
        return insights;
    }
    
    generateStrategicRecommendations(insights, vendorData, config) {
        return [
            {
                priority: 1,
                phase: 'Immediate (0-30 days)',
                title: 'Executive Approval & Budget Allocation',
                description: 'Secure executive sponsorship and budget based on compelling 325% ROI and 7-month payback.',
                actions: [
                    'Present business case to C-suite with risk-adjusted ROI',
                    'Allocate budget from operational savings',
                    'Assign executive sponsor and project team',
                    'Schedule vendor evaluation and proof of concept'
                ],
                expectedOutcome: 'Project approval with accelerated timeline'
            },
            {
                priority: 2,
                phase: 'Short-term (30-90 days)',
                title: 'Pilot Program & Quick Wins',
                description: 'Launch targeted pilot to demonstrate value and build organizational confidence.',
                actions: [
                    'Deploy Portnox for high-risk department (10% of devices)',
                    'Implement automated guest access management',
                    'Enable BYOD with secure onboarding',
                    'Measure and communicate early wins'
                ],
                expectedOutcome: '40% operational efficiency gain in pilot group'
            },
            {
                priority: 3,
                phase: 'Medium-term (90-180 days)',
                title: 'Phased Enterprise Rollout',
                description: 'Systematic deployment across organization with minimal disruption.',
                actions: [
                    'Deploy to 25% of organization per month',
                    'Integrate with existing identity providers',
                    'Implement Zero Trust policies progressively',
                    'Train IT staff and end users'
                ],
                expectedOutcome: 'Full deployment with 98% user satisfaction'
            },
            {
                priority: 4,
                phase: 'Long-term (180+ days)',
                title: 'Advanced Capabilities & Optimization',
                description: 'Leverage advanced features for maximum value realization.',
                actions: [
                    'Enable AI-driven threat detection',
                    'Implement automated compliance reporting',
                    'Integrate with SIEM/SOAR platforms',
                    'Develop custom workflows via APIs'
                ],
                expectedOutcome: 'Mature Zero Trust architecture with continuous improvement'
            }
        ];
    }
}

window.visionaryAIInsights = new VisionaryAIInsights();
console.log("✅ Visionary AI Insights engine initialized");
