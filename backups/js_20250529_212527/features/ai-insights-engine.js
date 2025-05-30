/**
 * AI Insights Engine - Complete Implementation
 */

class AIInsightsEngine {
    constructor() {
        console.log('🤖 AI Insights Engine initialized');
        this.insights = [];
        this.recommendations = [];
    }
    
    render(container) {
        container.innerHTML = `
            <div class="ai-insights-container">
                <h2>AI-Powered Strategic Insights</h2>
                <p>Intelligent analysis and recommendations based on your TCO data</p>
                
                <div class="ai-insights-grid">
                    ${this.generateInsights()}
                </div>
                
                <div class="ai-recommendations">
                    <h3>Strategic Recommendations</h3>
                    ${this.generateRecommendations()}
                </div>
                
                <div class="ai-actions">
                    <button class="action-btn primary" onclick="dashboard.generateDetailedReport()">
                        <i class="fas fa-file-pdf"></i> Generate AI Report
                    </button>
                    <button class="action-btn secondary" onclick="dashboard.scheduleDemo()">
                        <i class="fas fa-calendar"></i> Schedule Demo
                    </button>
                </div>
            </div>
        `;
    }
    
    generateInsights() {
        const vendorData = window.dashboard?.vendorData;
        if (!vendorData) return '<p>Loading insights...</p>';
        
        const portnox = vendorData.portnox;
        const cisco = vendorData.cisco;
        
        if (!portnox || !cisco) return '<p>Calculating insights...</p>';
        
        const savings = cisco.tco.total - portnox.tco.total;
        const insights = [
            {
                icon: 'fas fa-piggy-bank',
                title: 'Exceptional Cost Savings Opportunity',
                content: `Migrating to Portnox CLEAR will save $${(savings / 1000).toFixed(0)}K over 3 years - a ${portnox.roi.savingsPercent}% reduction in TCO.`,
                priority: 'critical',
                impact: 'high'
            },
            {
                icon: 'fas fa-rocket',
                title: 'Accelerated Time to Value',
                content: `Deploy ${Math.round((cisco.metrics.implementationDays - portnox.metrics.implementationDays) / cisco.metrics.implementationDays * 100)}% faster with Portnox's cloud-native architecture - operational in just ${portnox.metrics.implementationDays} days.`,
                priority: 'high',
                impact: 'medium'
            },
            {
                icon: 'fas fa-shield-alt',
                title: 'Superior Security Posture',
                content: `Achieve ${portnox.risk.breachReduction}% breach risk reduction with Portnox's ${portnox.metrics.securityScore}/100 security score and advanced Zero Trust capabilities.`,
                priority: 'critical',
                impact: 'critical'
            },
            {
                icon: 'fas fa-users-cog',
                title: 'Operational Excellence',
                content: `Reduce IT overhead by ${(cisco.metrics.fteRequired - portnox.metrics.fteRequired).toFixed(1)} FTE through automation, freeing resources for strategic initiatives.`,
                priority: 'high',
                impact: 'high'
            },
            {
                icon: 'fas fa-chart-line',
                title: 'Rapid ROI Achievement',
                content: `Achieve ${portnox.roi.roi}% ROI with payback in just ${portnox.roi.paybackMonths} months - one of the fastest in the industry.`,
                priority: 'high',
                impact: 'high'
            },
            {
                icon: 'fas fa-cloud',
                title: 'Future-Proof Architecture',
                content: `Portnox's cloud-native platform eliminates hardware dependencies and scales infinitely, supporting your growth without infrastructure investments.`,
                priority: 'medium',
                impact: 'medium'
            }
        ];
        
        return insights.map(insight => `
            <div class="ai-insight-card ${insight.priority}" data-impact="${insight.impact}">
                <div class="insight-icon">
                    <i class="${insight.icon}"></i>
                </div>
                <h3>${insight.title}</h3>
                <p>${insight.content}</p>
                <div class="insight-meta">
                    <span class="priority-badge ${insight.priority}">${insight.priority.toUpperCase()}</span>
                    <span class="impact-badge ${insight.impact}">Impact: ${insight.impact.toUpperCase()}</span>
                </div>
            </div>
        `).join('');
    }
    
    generateRecommendations() {
        const recommendations = [
            {
                step: 1,
                title: 'Immediate Approval',
                description: 'Approve Portnox CLEAR implementation within 30 days to start realizing savings immediately.',
                timeline: '0-30 days'
            },
            {
                step: 2,
                title: 'Pilot Program',
                description: 'Launch pilot with IT department (10% of devices) to validate deployment model.',
                timeline: '30-45 days'
            },
            {
                step: 3,
                title: 'Phased Rollout',
                description: 'Deploy to high-risk departments (25% of devices) based on pilot learnings.',
                timeline: '45-90 days'
            },
            {
                step: 4,
                title: 'Full Deployment',
                description: 'Complete organization-wide rollout with continuous monitoring.',
                timeline: '90-120 days'
            }
        ];
        
        return `
            <div class="recommendations-timeline">
                ${recommendations.map(rec => `
                    <div class="recommendation-step">
                        <div class="step-number">${rec.step}</div>
                        <div class="step-content">
                            <h4>${rec.title}</h4>
                            <p>${rec.description}</p>
                            <span class="timeline">${rec.timeline}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    analyzeVendorStrengths(vendorData) {
        // Analyze and rank vendor strengths
        const strengths = {};
        
        Object.entries(vendorData).forEach(([key, vendor]) => {
            strengths[key] = {
                name: vendor.name,
                score: vendor.score,
                topFeatures: this.identifyTopFeatures(vendor)
            };
        });
        
        return strengths;
    }
    
    identifyTopFeatures(vendor) {
        const features = [];
        
        if (vendor.metrics.cloudNative) features.push('Cloud Native');
        if (vendor.metrics.securityScore >= 90) features.push('Enterprise Security');
        if (vendor.metrics.automationLevel >= 85) features.push('High Automation');
        if (vendor.metrics.fteRequired <= 0.5) features.push('Low Maintenance');
        if (vendor.metrics.implementationDays <= 30) features.push('Rapid Deployment');
        
        return features;
    }
}

// Create global instance
window.aiInsightsEngine = new AIInsightsEngine();

console.log('✅ AI Insights Engine loaded');
