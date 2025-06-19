/**
 * Platform Tab Integration
 * Connects all analysis modules to the main platform
 */

// Extend the platform's tab switching functionality
if (window.platform) {
    const originalSwitchTab = window.platform.switchTab;
    
    window.platform.switchTab = function(tabName) {
        if (!tabName) return;
        
        // Update active tab
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });
        
        this.activeTab = tabName;
        const content = document.getElementById('analysis-content');
        
        // Initialize modules if not already done
        if (!this.modules) {
            this.modules = {
                risk: new window.RiskSecurityAnalysis(this),
                compliance: new window.ComplianceAnalysis(this),
                operational: new window.OperationalImpact(this),
                strategic: new window.StrategicInsights(this)
            };
        }
        
        switch(tabName) {
            case 'financial-overview':
                this.renderFinancialOverview(content);
                break;
            case 'risk-assessment':
                this.modules.risk.render(content);
                break;
            case 'compliance-analysis':
                this.modules.compliance.render(content);
                break;
            case 'operational-impact':
                this.modules.operational.render(content);
                break;
            case 'strategic-insights':
                this.modules.strategic.render(content);
                break;
        }
    };
    
    console.log('✅ Platform tab integration complete');
}
