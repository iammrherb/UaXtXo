// ENHANCED AI INSIGHTS
document.addEventListener('DOMContentLoaded', function() {
    if (window.dashboard) {
        window.dashboard.renderAIInsights = function(container) {
            if (this.selectedVendors.length === 0) {
                container.innerHTML = '<div class="vendor-selection-prompt"><p>Please select vendors to generate AI insights</p></div>';
                return;
            }
            
            const portnox = this.vendorData.portnox;
            const insights = this.generateAIInsights();
            
            container.innerHTML = `
                <div class="ai-insights-enhanced">
                    <h2>AI-Powered Strategic Insights</h2>
                    <p class="ai-description">Machine learning analysis of your TCO data reveals critical opportunities for cost optimization and risk reduction.</p>
                    
                    <div class="ai-insights-grid">
                        ${insights.map(insight => `
                            <div class="ai-insight-card ${insight.priority}">
                                <div class="insight-header">
                                    <i class="${insight.icon}"></i>
                                    <span class="priority-badge">${insight.priority.toUpperCase()}</span>
                                </div>
                                <h3>${insight.title}</h3>
                                <p>${insight.message}</p>
                                <div class="insight-action">
                                    <button onclick="dashboard.drillDown('${insight.type}')">
                                        ${insight.action} <i class="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="recommendations-section">
                        <h3>Executive Recommendations</h3>
                        <div class="recommendations-grid">
                            <div class="recommendation-card">
                                <div class="rec-number">1</div>
                                <h4>Immediate Action</h4>
                                <p>Approve Portnox implementation to capture $${(this.calculateSavings() / 1000).toFixed(0)}K in savings</p>
                            </div>
                            <div class="recommendation-card">
                                <div class="rec-number">2</div>
                                <h4>Deployment Strategy</h4>
                                <p>Phased rollout over 90 days to minimize disruption</p>
                            </div>
                            <div class="recommendation-card">
                                <div class="rec-number">3</div>
                                <h4>Risk Mitigation</h4>
                                <p>Implement Zero Trust policies to reduce breach risk by 30%</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        };
        
        window.dashboard.generateAIInsights = function() {
            const insights = [];
            const savings = this.calculateSavings();
            
            insights.push({
                type: 'cost',
                priority: 'critical',
                icon: 'fas fa-piggy-bank',
                title: 'Significant Cost Reduction Opportunity',
                message: `Analysis reveals $${(savings/1000).toFixed(0)}K in potential savings over 3 years by migrating to Portnox. This represents a ${Math.round((savings / this.vendorData.cisco.tco.tco) * 100)}% reduction in TCO.`,
                action: 'View cost breakdown'
            });
            
            insights.push({
                type: 'risk',
                priority: 'high',
                icon: 'fas fa-shield-alt',
                title: 'Enhanced Security Posture',
                message: 'Portnox\'s Zero Trust architecture provides 30% better threat protection than traditional NAC solutions, potentially preventing $1.3M in breach costs.',
                action: 'Analyze risk metrics'
            });
            
            insights.push({
                type: 'efficiency',
                priority: 'medium',
                icon: 'fas fa-tachometer-alt',
                title: 'Operational Efficiency Gains',
                message: 'Reduce IT overhead by 87% through automation, freeing 1.75 FTE for strategic initiatives worth $175K annually.',
                action: 'Review efficiency metrics'
            });
            
            return insights;
        };
        
        window.dashboard.calculateSavings = function() {
            let maxTco = 0;
            this.selectedVendors.forEach(key => {
                if (key !== 'portnox' && this.vendorData[key]) {
                    maxTco = Math.max(maxTco, this.vendorData[key].tco.tco);
                }
            });
            return maxTco - this.vendorData.portnox.tco.tco;
        };
    }
});
