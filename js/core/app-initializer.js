/**
 * App Initializer - Ensures proper loading sequence
 */

class AppInitializer {
    constructor() {
        this.components = {
            vendorCalculator: false,
            dashboard: false,
            industriesCompliance: false,
            aiInsights: false
        };
        
        this.init();
    }
    
    init() {
        console.log('🚀 Initializing Portnox TCO Analyzer...');
        
        // Check component availability
        this.checkComponents();
        
        // Initialize error handling
        this.setupErrorHandling();
        
        // Hide loading screen
        this.hideLoadingScreen();
        
        console.log('✅ App initialization complete');
    }
    
    checkComponents() {
        // Check each component
        this.components.vendorCalculator = !!window.vendorCalculator;
        this.components.dashboard = !!window.dashboard;
        this.components.industriesCompliance = !!window.industriesComplianceTab;
        
        console.log('📊 Component Status:', this.components);
        
        // Report any missing components
        Object.entries(this.components).forEach(([name, loaded]) => {
            if (!loaded) {
                console.warn(`⚠️ Component not loaded: ${name}`);
            }
        });
    }
    
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('App Error:', e);
            
            // Don't show errors in production
            if (window.location.hostname !== 'localhost') {
                e.preventDefault();
            }
        });
    }
    
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.appInitializer = new AppInitializer();
    });
} else {
    window.appInitializer = new AppInitializer();
}

console.log('✅ App Initializer loaded');
