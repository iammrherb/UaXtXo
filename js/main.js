/**
 * Main Application Entry Point
 */
(async function() {
    console.log('🚀 Starting Portnox Total Cost Analyzer...');
    console.log('Current time:', new Date().toISOString());
    
    // Module loading sequence with proper error handling
    const loadModules = async () => {
        // Core module definitions (not files)
        const moduleDefinitions = [
            { path: '/js/core/config-manager.js', name: 'ConfigManager' },
            { path: '/js/core/event-system.js', name: 'EventSystem' },
            { path: '/js/core/error-handler.js', name: 'ErrorHandler' },
            { path: '/js/data/vendor-database.js', name: 'VendorDatabase' },
            { path: '/js/data/vendor-data-manager.js', name: 'VendorDataManager' },
            { path: '/js/core/ui-manager.js', name: 'UIManager' }
        ];
        
        try {
            // Ensure ModuleLoader is ready
            if (!window.ModuleLoader) {
                throw new Error('ModuleLoader not found');
            }
            
            console.log('✅ ModuleLoader ready');
            console.log('ModuleLoader methods:', {
                register: typeof window.ModuleLoader.register,
                load: typeof window.ModuleLoader.load,
                loadAll: typeof window.ModuleLoader.loadAll
            });
            
            // Load module definition files
            console.log('\n📦 Loading module files...');
            for (const { path, name } of moduleDefinitions) {
                console.log(`\nLoading ${path}...`);
                try {
                    await loadScript(path);
                    console.log(`✓ Script loaded: ${path}`);
                    
                    // Small delay to ensure script execution
                    await new Promise(resolve => setTimeout(resolve, 50));
                    
                    // Check if module was registered
                    const modules = window.ModuleLoader.listModules();
                    if (modules.includes(name)) {
                        console.log(`✓ ${name} registered successfully`);
                    } else {
                        console.warn(`⚠️ ${name} not found in registered modules`);
                        console.log('Currently registered modules:', modules);
                    }
                } catch (error) {
                    console.error(`❌ Failed to load ${path}:`, error);
                }
            }
            
            // List all registered modules
            console.log('\n📋 All registered modules:', window.ModuleLoader.listModules());
            
            // Now initialize modules in correct order
            console.log('\n🚀 Initializing modules...');
            
            // Load in dependency order
            const coreModules = ['ConfigManager', 'EventSystem', 'ErrorHandler'];
            console.log('\nLoading core modules:', coreModules);
            await window.ModuleLoader.loadAll(coreModules);
            console.log('✓ Core modules loaded');
            
            // Load data modules
            console.log('\nLoading VendorDatabase...');
            const vendorDb = await window.ModuleLoader.load('VendorDatabase');
            console.log('✓ VendorDatabase loaded:', vendorDb);
            
            console.log('\nLoading VendorDataManager...');
            const vendorDataManager = await window.ModuleLoader.load('VendorDataManager');
            console.log('✓ VendorDataManager loaded');
            
            // Initialize vendor data
            if (vendorDataManager && vendorDataManager.initialize) {
                console.log('\nInitializing VendorDataManager...');
                await vendorDataManager.initialize();
                console.log('✓ VendorDataManager initialized');
                console.log('Available vendors:', vendorDataManager.getAllVendors().map(v => v.id));
            }
            
            // Load UI
            console.log('\nLoading UIManager...');
            const uiManager = await window.ModuleLoader.load('UIManager');
            console.log('✓ UIManager loaded');
            
            if (uiManager && uiManager.initialize) {
                console.log('\nInitializing UIManager...');
                await uiManager.initialize();
                console.log('✓ UIManager initialized');
            }
            
            // Setup router
            setupRouter();
            
            // Render initial view
            if (uiManager && uiManager.render) {
                console.log('\nRendering initial view...');
                uiManager.render();
                console.log('✓ Initial view rendered');
            }
            
            // Handle initial route
            handleRoute();
            
            console.log('\n✅ Application initialized successfully!');
            console.log('=====================================\n');
            
        } catch (error) {
            console.error('\n❌ Failed to initialize application:', error);
            console.error('Stack trace:', error.stack);
            showErrorPage(error);
        }
    };
    
    // Helper function to load scripts dynamically
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            // Check if script already loaded
            const existing = document.querySelector(`script[src="${src}"]`);
            if (existing) {
                console.log(`Script already in DOM: ${src}`);
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = src;
            script.async = false; // Ensure sequential loading
            
            script.onload = () => {
                console.log(`Script element loaded: ${src}`);
                resolve();
            };
            
            script.onerror = () => {
                const error = new Error(`Failed to load script: ${src}`);
                console.error(error);
                reject(error);
            };
            
            document.head.appendChild(script);
        });
    }
    
    // Setup client-side routing
    function setupRouter() {
        window.addEventListener('popstate', handleRoute);
        
        // Handle initial load
        if (!window.location.hash) {
            window.location.hash = '#dashboard';
        }
    }
    
    function handleRoute() {
        const hash = window.location.hash.slice(1) || 'dashboard';
        const UIManager = window.ModuleLoader.get('UIManager');
        
        if (UIManager && UIManager.switchView) {
            UIManager.switchView(hash);
        }
    }
    
    function showErrorPage(error) {
        document.getElementById('app').innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: Arial, sans-serif;">
                <div style="text-align: center; padding: 2rem; max-width: 600px;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ef4444; margin-bottom: 1rem;"></i>
                    <h1 style="font-size: 1.5rem; margin-bottom: 1rem;">Failed to Load Application</h1>
                    <p style="color: #666; margin-bottom: 1rem;">${error.message}</p>
                    <pre style="text-align: left; background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; overflow: auto; margin-bottom: 1.5rem; font-size: 0.875rem;">
${error.stack || 'No stack trace available'}
                    </pre>
                    <button onclick="location.reload()" style="background: #00D4AA; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 0.5rem; cursor: pointer;">
                        Reload Page
                    </button>
                </div>
            </div>
        `;
    }
    
    // Global helper functions
    window.TCOAnalyzer = {
        exportToPDF: async function() {
            const UIManager = window.ModuleLoader.get('UIManager');
            if (UIManager && UIManager.showNotification) {
                UIManager.showNotification('PDF export coming soon', 'info');
            }
        },
        
        exportToExcel: async function() {
            const UIManager = window.ModuleLoader.get('UIManager');
            if (UIManager && UIManager.showNotification) {
                UIManager.showNotification('Excel export coming soon', 'info');
            }
        },
        
        navigateTo: function(view) {
            window.location.hash = '#' + view;
        },
        
        scheduleDemo: function() {
            window.open('https://www.portnox.com/demo/', '_blank');
        },
        
        startTrial: function() {
            window.open('https://www.portnox.com/free-trial/', '_blank');
        },
        
        contactSales: function() {
            window.open('https://www.portnox.com/contact/', '_blank');
        }
    };
    
    // Make some functions globally accessible for UI
    window.UI = {
        scheduleDemo: () => TCOAnalyzer.scheduleDemo(),
        startTrial: () => TCOAnalyzer.startTrial(),
        contactSales: () => TCOAnalyzer.contactSales(),
        exportReport: () => TCOAnalyzer.exportToPDF(),
        formatCurrency: (amount, decimals = 0) => {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            }).format(amount);
        },
        formatNumber: (number, decimals = 0) => {
            return new Intl.NumberFormat('en-US', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            }).format(number);
        },
        formatPercent: (value, decimals = 0) => {
            return new Intl.NumberFormat('en-US', {
                style: 'percent',
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            }).format(value / 100);
        }
    };
    
    // Start the application
    console.log('\n🎯 Starting module loading process...\n');
    loadModules();
})();
