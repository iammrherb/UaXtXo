/**
 * UI Integration Module
 * Bridges the existing UI with the Premium Executive Platform
 */

ModuleLoader.register('UIIntegration', ['UIManager', 'EventSystem', 'PremiumExecutivePlatform'], function(uiManager, eventSystem, PremiumExecutivePlatform) {
    
    class UIIntegration {
        constructor() {
            this.uiManager = uiManager;
            this.eventSystem = eventSystem;
            this.platform = null;
        }
        
        init() {
            console.log('🔗 Initializing UI Integration');
            
            // Create premium platform instance
            this.platform = new PremiumExecutivePlatform();
            
            // Make platform globally accessible
            window.platform = this.platform;
            
            // Initialize the platform UI
            this.setupPremiumUI();
            
            // Initialize platform
            this.platform.init();
            
            // Setup event handlers
            this.setupEventHandlers();
        }
        
        setupPremiumUI() {
            const app = document.getElementById('app') || document.getElementById('app-container') || document.body;
            
            app.innerHTML = `
                <div class="premium-platform">
                    <!-- Premium Header -->
                    <header class="premium-header">
                        <div class="header-container">
                            <div class="brand-identity">
                                <img src="./img/vendors/portnox-logo.png" alt="Portnox" class="portnox-logo">
                                <div class="platform-title">
                                    <h1>Executive Decision Platform</h1>
                                    <p>Zero Trust NAC Investment Analysis & Risk Assessment</p>
                                </div>
                            </div>
                            <div class="header-controls">
                                <button class="control-btn calculate" id="recalculate-btn">
                                    <i class="fas fa-calculator"></i>
                                    <span>Recalculate</span>
                                </button>
                                <button class="control-btn export" id="export-btn">
                                    <i class="fas fa-download"></i>
                                    <span>Export</span>
                                </button>
                                <button class="control-btn demo" id="demo-btn">
                                    <i class="fas fa-calendar-check"></i>
                                    <span>Schedule Demo</span>
                                </button>
                            </div>
                        </div>
                    </header>
                    
                    <!-- Analysis Tabs -->
                    <div class="analysis-container">
                        <nav class="premium-nav">
                            <button class="nav-tab active" data-tab="financial-overview">
                                <i class="fas fa-chart-line"></i>
                                <span>Financial Overview</span>
                                <span class="tab-subtitle">TCO & ROI Analysis</span>
                            </button>
                            <button class="nav-tab" data-tab="risk-assessment">
                                <i class="fas fa-shield-virus"></i>
                                <span>Risk & Security</span>
                                <span class="tab-subtitle">Breach & Incident Impact</span>
                            </button>
                            <button class="nav-tab" data-tab="compliance-analysis">
                                <i class="fas fa-clipboard-check"></i>
                                <span>Compliance</span>
                                <span class="tab-subtitle">Regulatory Alignment</span>
                            </button>
                            <button class="nav-tab" data-tab="operational-impact">
                                <i class="fas fa-cogs"></i>
                                <span>Operational</span>
                                <span class="tab-subtitle">Efficiency & Timeline</span>
                            </button>
                            <button class="nav-tab" data-tab="strategic-insights">
                                <i class="fas fa-lightbulb"></i>
                                <span>Strategic Insights</span>
                                <span class="tab-subtitle">Recommendations</span>
                            </button>
                        </nav>
                        
                        <div class="analysis-content" id="analysis-content">
                            <!-- Dynamic content -->
                        </div>
                    </div>
                </div>
            `;
        }
        
        setupEventHandlers() {
            // Tab navigation
            document.addEventListener('click', (e) => {
                if (e.target.closest('.nav-tab')) {
                    const tab = e.target.closest('.nav-tab');
                    const tabName = tab.dataset.tab;
                    
                    // Update active state
                    document.querySelectorAll('.nav-tab').forEach(t => {
                        t.classList.toggle('active', t === tab);
                    });
                    
                    // Switch tab
                    this.platform.switchTab(tabName);
                }
            });
            
            // Control buttons
            document.getElementById('recalculate-btn')?.addEventListener('click', () => {
                this.platform.calculate();
            });
            
            document.getElementById('export-btn')?.addEventListener('click', () => {
                window.open('https://portnox.com/tco-report', '_blank');
            });
            
            document.getElementById('demo-btn')?.addEventListener('click', () => {
                window.open('https://portnox.com/demo', '_blank');
            });
            
            // Listen for calculation complete
            this.eventSystem.on('calculation:complete', (results) => {
                console.log('📊 Calculation complete:', results);
            });
        }
    }
    
    return UIIntegration;
});

console.log('✅ UI Integration module registered');
