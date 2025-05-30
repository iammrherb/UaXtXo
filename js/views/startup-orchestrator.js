/**
 * Startup Orchestrator - Ensures proper initialization order
 */

window.StartupOrchestrator = {
    init() {
        console.log('🎼 Orchestrating startup sequence...');
        
        // Step 1: Ensure platform exists
        this.waitForPlatform().then(() => {
            console.log('✅ Platform ready');
            
            // Step 2: Trigger calculation
            return this.ensureCalculation();
        }).then(() => {
            console.log('✅ Calculation complete');
            
            // Step 3: Force render
            return this.forceRender();
        }).then(() => {
            console.log('✅ Render complete');
            
            // Step 4: Add competitors
            return this.addCompetitors();
        }).then(() => {
            console.log('🎉 Startup complete!');
        }).catch(error => {
            console.error('❌ Startup error:', error);
        });
    },
    
    waitForPlatform() {
        return new Promise((resolve) => {
            const check = setInterval(() => {
                if (window.platform && window.platform.vendorDatabase) {
                    clearInterval(check);
                    resolve();
                }
            }, 100);
        });
    },
    
    ensureCalculation() {
        return new Promise((resolve) => {
            if (window.platform.calculationResults) {
                resolve();
                return;
            }
            
            console.log('📊 Triggering initial calculation...');
            window.platform.calculate();
            
            const check = setInterval(() => {
                if (window.platform.calculationResults) {
                    clearInterval(check);
                    resolve();
                }
            }, 500);
        });
    },
    
    forceRender() {
        return new Promise((resolve) => {
            if (window.ForceFinancialRender) {
                window.ForceFinancialRender.render();
                setTimeout(resolve, 1000);
            } else {
                resolve();
            }
        });
    },
    
    addCompetitors() {
        return new Promise((resolve) => {
            if (window.platform.selectedVendors.length === 1) {
                console.log('📊 Adding sample competitors...');
                
                ['cisco', 'aruba'].forEach(vendor => {
                    if (window.platform.vendorDatabase[vendor]) {
                        window.platform.selectedVendors.push(vendor);
                    }
                });
                
                window.platform.updateVendorSelection();
                window.platform.calculate();
            }
            
            setTimeout(resolve, 1000);
        });
    }
};

// Start orchestration when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        window.StartupOrchestrator.init();
    }, 1000);
});
