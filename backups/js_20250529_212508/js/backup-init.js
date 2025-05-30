/**
 * Backup Initialization
 * Creates UltimateExecutiveView if the main file failed to load
 */

console.log("🔧 Backup initialization starting...");

// Check if UltimateExecutiveView class exists
if (typeof UltimateExecutiveView === 'undefined') {
    console.log("⚠️ UltimateExecutiveView class not found, creating minimal version...");
    
    // Create a minimal working version
    window.UltimateExecutiveView = class UltimateExecutiveView {
        constructor() {
            this.initialized = false;
            this.currentTab = 'overview';
            this.selectedVendors = ['portnox', 'cisco', 'aruba', 'forescout', 'fortinac'];
            this.chartInstances = {};
            
            // Configuration
            this.config = {
                deviceCount: 1000,
                analysisPeriod: 3,
                riskFactor: 1.0,
                industry: 'technology',
                companySize: 'medium',
                fteCost: 100000,
                breachCost: 4350000,
                downtimeCost: 5000,
                selectedCompliance: ['nist-csf', 'pci-dss', 'gdpr']
            };
            
            // Basic vendor data
            this.vendorData = {
                'portnox': {
                    name: 'Portnox Cloud',
                    shortName: 'Portnox',
                    costs: { tco3Year: 245000 },
                    metrics: { roi3Year: 325, paybackMonths: 7, securityScore: 95, fteRequired: 0.25 }
                },
                'cisco': {
                    name: 'Cisco ISE',
                    shortName: 'Cisco',
                    costs: { tco3Year: 520000 },
                    metrics: { roi3Year: 45, paybackMonths: 32, securityScore: 85, fteRequired: 2.0 }
                }
            };
            
            // Use comprehensive data if available
            this.industryData = window.comprehensiveIndustries || {};
            this.complianceData = window.comprehensiveCompliance || {};
        }
        
        init() {
            if (this.initialized) return;
            console.log("🚀 Initializing backup Ultimate Executive View...");
            
            // Create basic layout
            const container = document.getElementById('ultimate-executive-content');
            if (container) {
                container.innerHTML = `
                    <div class="ultimate-executive-layout">
                        <div class="ultimate-header-section">
                            <h1>Ultimate Executive Intelligence Platform</h1>
                            <p>Zero Trust NAC Analysis (Recovery Mode)</p>
                            <div class="ultimate-actions">
                                <button onclick="alert('AI Insights feature is being restored...')">AI Insights</button>
                                <button onclick="alert('Scenarios feature is being restored...')">Compare Scenarios</button>
                            </div>
                        </div>
                        <div class="recovery-message">
                            <p>The platform is running in recovery mode. Core features are being restored.</p>
                            <p>Comprehensive data loaded: Industries (${Object.keys(this.industryData).length}), Compliance (${Object.keys(this.complianceData).length})</p>
                        </div>
                    </div>
                `;
            }
            
            this.initialized = true;
            console.log("✅ Backup Ultimate Executive View initialized");
        }
        
        showNotification(message, type) {
            console.log(`[${type}] ${message}`);
        }
        
        generateAIInsights() {
            console.log("AI Insights called from backup");
        }
        
        compareScenarios() {
            console.log("Compare Scenarios called from backup");
        }
        
        generatePresentation() {
            console.log("Generate Presentation called from backup");
        }
    };
}

// Create instance if needed
if (!window.ultimateExecutiveView) {
    window.ultimateExecutiveView = new UltimateExecutiveView();
    console.log("✅ Created backup Ultimate Executive View instance");
}

// Initialize after ensuring all data is loaded
setTimeout(() => {
    if (window.ultimateExecutiveView && !window.ultimateExecutiveView.initialized) {
        window.ultimateExecutiveView.init();
    }
}, 1000);

console.log("✅ Backup initialization complete");
