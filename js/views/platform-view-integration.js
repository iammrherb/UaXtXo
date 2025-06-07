/**
 * Platform View Integration
 * Updates premium executive platform with all new views
 */

// Update PremiumExecutivePlatform to include new views
if (window.PremiumExecutivePlatform) {
    // Add new view switching cases
    const originalSwitchView = PremiumExecutivePlatform.prototype.switchView;
    
    PremiumExecutivePlatform.prototype.switchView = function(viewName) {
        this.currentView = viewName;
        
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.view === viewName);
        });
        
        // Render view
        const content = document.getElementById('main-content');
        if (!content) return;
        
        switch(viewName) {
            case 'overview':
                this.renderOverviewView(content);
                break;
            case 'compliance':
                if (window.NAC && window.NAC.compliance) {
                    window.NAC.compliance.render(content);
                } else {
                    this.renderComplianceView(content);
                }
                break;
            case 'comparison':
                this.renderComparisonView(content);
                break;
            case 'financial':
                if (window.financialView) {
                    window.financialView.render(content);
                } else {
                    this.renderFinancialView(content);
                }
                break;
            case 'technical':
                this.renderTechnicalView(content);
                break;
            case 'risk-security':
                if (window.riskSecurityView) {
                    window.riskSecurityView.render(content);
                }
                break;
            case 'operational':
                if (window.operationalView) {
                    window.operationalView.render(content);
                }
                break;
            default:
                this.renderOverviewView(content);
        }
    };
    
    // Update navigation to include new views
    const originalRenderPlatform = PremiumExecutivePlatform.prototype.renderPlatform;
    
    PremiumExecutivePlatform.prototype.renderPlatform = function() {
        const container = document.getElementById('app-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="platform-wrapper">
                <!-- Header -->
                <header class="platform-header">
                    <div class="header-container">
                        <div class="header-left">
                            <img src="./img/vendors/portnox-logo.svg" alt="Portnox" class="header-logo">
                            <div class="header-title">
                                <h1>Executive Decision Platform</h1>
                                <p class="header-subtitle">Zero Trust NAC Investment Analysis</p>
                            </div>
                        </div>
                        
                        <nav class="header-nav">
                            <button class="nav-item active" data-view="overview">
                                <i class="fas fa-chart-line"></i>
                                <span>Overview</span>
                            </button>
                            <button class="nav-item" data-view="compliance">
                                <i class="fas fa-shield-check"></i>
                                <span>Compliance</span>
                            </button>
                            <button class="nav-item" data-view="financial">
                                <i class="fas fa-dollar-sign"></i>
                                <span>Financial</span>
                            </button>
                            <button class="nav-item" data-view="risk-security">
                                <i class="fas fa-shield-alt"></i>
                                <span>Risk & Security</span>
                            </button>
                            <button class="nav-item" data-view="operational">
                                <i class="fas fa-cogs"></i>
                                <span>Operational</span>
                            </button>
                            <button class="nav-item" data-view="comparison">
                                <i class="fas fa-balance-scale"></i>
                                <span>Compare</span>
                            </button>
                            <button class="nav-item" data-view="technical">
                                <i class="fas fa-network-wired"></i>
                                <span>Technical</span>
                            </button>
                        </nav>
                        
                        <div class="header-actions">
                            <button class="btn-icon" onclick="platform.toggleTheme()">
                                <i class="fas fa-moon"></i>
                            </button>
                            <button class="btn-primary" onclick="platform.exportReport()">
                                <i class="fas fa-download"></i>
                                Export Report
                            </button>
                        </div>
                    </div>
                </header>
                
                <!-- Main Content Area -->
                <main id="main-content" class="main-content">
                    <!-- Content will be rendered here -->
                </main>
                
                <!-- Footer -->
                <footer class="platform-footer">
                    <div class="footer-content">
                        <p>&copy; 2024 Portnox. Executive Decision Platform.</p>
                    </div>
                </footer>
            </div>
        `;
    };
}

console.log('✅ Platform view integration updated');
