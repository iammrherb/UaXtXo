/**
 * Initialization Controller - Manages startup sequence
 */

window.InitController = {
    initialized: false,
    componentsReady: {
        platform: false,
        vendors: false,
        calculations: false,
        dom: false
    },
    
    checkReady() {
        return Object.values(this.componentsReady).every(v => v);
    },
    
    markReady(component) {
        this.componentsReady[component] = true;
        console.log(`✅ ${component} ready`);
        
        if (this.checkReady() && !this.initialized) {
            this.initialized = true;
            this.onReady();
        }
    },
    
    onReady() {
        console.log('🚀 All components ready, starting application...');
        
        // Ensure we're on financial overview
        if (window.platform && window.platform.activeTab !== 'financial-overview') {
            window.platform.switchTab('financial-overview');
        }
    }
};

// Monitor initialization
document.addEventListener('DOMContentLoaded', () => {
    window.InitController.markReady('dom');
    
    // Monitor platform
    const checkPlatform = setInterval(() => {
        if (window.platform && window.platform.calculationResults) {
            clearInterval(checkPlatform);
            window.InitController.markReady('platform');
        }
    }, 100);
    
    // Monitor calculations
    const checkCalculations = setInterval(() => {
        if (window.platform && window.platform.calculationResults && 
            Object.keys(window.platform.calculationResults).length > 0) {
            clearInterval(checkCalculations);
            window.InitController.markReady('calculations');
        }
    }, 100);
});
