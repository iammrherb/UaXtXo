/**
 * Platform Integration
 * Connects compliance view with main platform
 */

class PlatformIntegration {
    static initialize() {
        // Update navigation to include compliance
        this.updateNavigation();
        
        // Register view handlers
        this.registerViewHandlers();
        
        // Initialize compliance on platform
        this.initializeCompliance();
    }
    
    static updateNavigation() {
        const nav = document.querySelector('.header-nav');
        if (!nav) return;
        
        // Find compliance button
        const complianceBtn = nav.querySelector('[data-view="compliance"]');
        if (complianceBtn) {
            complianceBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showComplianceView();
            });
        }
    }
    
    static registerViewHandlers() {
        window.NAC = window.NAC || {};
        
        window.NAC.showView = (viewName) => {
            const mainContainer = document.getElementById('main-content') || 
                                document.getElementById('app-container');
            
            if (!mainContainer) return;
            
            // Remove active class from all nav items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to selected nav item
            const activeNav = document.querySelector(`[data-view="${viewName}"]`);
            if (activeNav) {
                activeNav.classList.add('active');
            }
            
            // Show appropriate view
            switch(viewName) {
                case 'compliance':
                    this.showComplianceView();
                    break;
                case 'overview':
                    this.showOverviewView();
                    break;
                case 'comparison':
                    this.showComparisonView();
                    break;
                case 'financial':
                    this.showFinancialView();
                    break;
                default:
                    this.showOverviewView();
            }
        };
    }
    
    static showComplianceView() {
        const container = document.getElementById('main-content') || 
                         document.getElementById('app-container');
        
        if (!container) return;
        
        // Render compliance view
        if (window.NAC && window.NAC.compliance) {
            window.NAC.compliance.render(container);
        }
    }
    
    static showOverviewView() {
        // Placeholder for overview view
        const container = document.getElementById('main-content') || 
                         document.getElementById('app-container');
        
        if (!container) return;
        
        container.innerHTML = `
            <div class="overview-container">
                <h2>Executive Overview</h2>
                <p>NAC Platform Executive Dashboard</p>
                <!-- Overview content here -->
            </div>
        `;
    }
    
    static showComparisonView() {
        // Placeholder for comparison view
        const container = document.getElementById('main-content') || 
                         document.getElementById('app-container');
        
        if (!container) return;
        
        container.innerHTML = `
            <div class="comparison-container">
                <h2>Vendor Comparison</h2>
                <p>Compare NAC vendors side by side</p>
                <!-- Comparison content here -->
            </div>
        `;
    }
    
    static showFinancialView() {
        // Placeholder for financial view
        const container = document.getElementById('main-content') || 
                         document.getElementById('app-container');
        
        if (!container) return;
        
        container.innerHTML = `
            <div class="financial-container">
                <h2>ROI Analysis</h2>
                <p>Financial impact and return on investment</p>
                <!-- Financial content here -->
            </div>
        `;
    }
    
    static initializeCompliance() {
        // Ensure compliance frameworks are loaded
        if (!window.ComplianceFrameworks) {
            console.error('Compliance frameworks not loaded');
            return;
        }
        
        // Ensure vendor database is loaded
        if (!window.VendorDatabase) {
            console.error('Vendor database not loaded');
            return;
        }
        
        // Initialize compliance view if not already done
        if (!window.NAC.compliance) {
            window.NAC.compliance = new ComplianceViewEnhanced(window.NAC);
        }
        
        console.log('✅ Compliance integration initialized');
    }
}

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    PlatformIntegration.initialize();
});

// Export for global use
window.PlatformIntegration = PlatformIntegration;
