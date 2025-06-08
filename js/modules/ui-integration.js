/**
 * UI Integration Module
 * Bridges the existing UI with the Enhanced Platform Application
 */

ModuleLoader.register('UIIntegration', ['UIManager', 'EventSystem', 'EnhancedPlatformApplication'], function(uiManager, eventSystem, EnhancedPlatformApplication) {
    
    class UIIntegration {
        constructor() {
            this.uiManager = uiManager;
            this.eventSystem = eventSystem;
            this.platform = null; // Will be EnhancedPlatformApplication instance
        }
        
        init() {
            console.log('🔗 Initializing UI Integration with EnhancedPlatformApplication');
            
            // Create EnhancedPlatformApplication instance
            this.platform = new EnhancedPlatformApplication();
            
            // Make platform globally accessible
            window.platform = this.platform;
            
            // EnhancedPlatformApplication has its own render method, setupPremiumUI is no longer needed here.
            // The main UI setup will be handled by this.platform.render() called within its init() or by EnhancedPlatformApplication itself.
            
            // Initialize platform (which should include rendering its own UI)
            this.platform.init();
            
            // Setup event handlers
            this.setupEventHandlers(); // These might need adjustment for the new DOM structure from EnhancedPlatformApplication
        }
        
        // setupPremiumUI() is removed as EnhancedPlatformApplication will render its own UI.
        
        setupEventHandlers() {
            // Tab navigation - This will likely need to be updated based on EnhancedPlatformApplication's DOM structure
            document.addEventListener('click', (e) => {
                const navTab = e.target.closest('.nav-tab'); // Assuming '.nav-tab' is still used in EnhancedPlatformApplication
                if (navTab && navTab.dataset.tab) {
                    const tabName = navTab.dataset.tab;
                    
                    // Update active state - This logic might need to change
                    document.querySelectorAll('.nav-tab').forEach(t => {
                        t.classList.toggle('active', t === navTab);
                    });
                    
                    // Switch tab - This method should exist on EnhancedPlatformApplication
                    if (this.platform && typeof this.platform.switchTab === 'function') {
                        this.platform.switchTab(tabName);
                    } else {
                        console.warn('platform.switchTab is not available or not a function');
                    }
                }

                // Handling for other controls from EnhancedPlatformApplication might be needed here or within the component itself.
                // For example, if EnhancedPlatformApplication uses different IDs or classes for these buttons.
                const recalculateBtn = e.target.closest('#recalculate-btn') || e.target.closest('.recalculate-btn-enhanced');
                if (recalculateBtn) {
                     if (this.platform && typeof this.platform.calculate === 'function') {
                        this.platform.calculate();
                    } else {
                        console.warn('platform.calculate is not available or not a function');
                    }
                }

                const exportBtn = e.target.closest('#export-btn') || e.target.closest('.export-btn-enhanced');
                if (exportBtn) {
                    // Assuming export functionality might also be part of the platform now or handled differently
                    if (this.platform && typeof this.platform.exportData === 'function') {
                        this.platform.exportData();
                    } else {
                         // Fallback to old behavior if specific export method isn't on new platform
                        window.open('https://portnox.com/tco-report', '_blank');
                    }
                }

                const demoBtn = e.target.closest('#demo-btn') || e.target.closest('.demo-btn-enhanced');
                if (demoBtn) {
                    window.open('https://portnox.com/demo', '_blank');
                }
            });
            
            // Listen for calculation complete
            this.eventSystem.on('calculation:complete', (results) => {
                console.log('📊 Calculation complete (UIIntegration):', results);
            });

            // It might be necessary to listen to other events emitted by EnhancedPlatformApplication
            // For example: this.eventSystem.on('enhancedPlatform:rendered', () => { /* attach specific handlers */ });
        }
    }
    
    return UIIntegration;
});

console.log('✅ UI Integration module registered (modified for EnhancedPlatformApplication)');
