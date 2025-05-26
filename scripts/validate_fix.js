// Validation script to ensure platform loads correctly
setTimeout(() => {
    console.log("🔍 Validating platform fix...");
    
    if (window.zeroTrustExecutivePlatform && window.zeroTrustExecutivePlatform.initialized) {
        console.log("✅ Platform is working correctly!");
        
        // Trigger initial render if needed
        if (typeof window.zeroTrustExecutivePlatform.calculateAndDisplayMetrics === 'function') {
            window.zeroTrustExecutivePlatform.calculateAndDisplayMetrics();
        }
    } else {
        console.warn("⚠️ Platform still not initialized, checking for specific issues...");
        
        // Create minimal fallback
        if (!window.zeroTrustExecutivePlatform) {
            console.log("🔧 Creating minimal fallback platform...");
            
            window.zeroTrustExecutivePlatform = {
                initialized: true,
                selectedVendors: ['portnox', 'cisco'],
                
                init() {
                    console.log("📦 Fallback platform initialized");
                    this.createMinimalInterface();
                    return this;
                },
                
                createMinimalInterface() {
                    const container = document.querySelector('#executive-view .view-content');
                    if (container && container.querySelector('.initial-loading')) {
                        container.innerHTML = `
                            <div class="executive-command-center">
                                <h2>Zero Trust Executive Platform</h2>
                                <p>Platform is loading with reduced functionality...</p>
                                <button onclick="location.reload()">Reload Page</button>
                            </div>
                        `;
                    }
                },
                
                calculateAndDisplayMetrics() {
                    console.log("📊 Minimal metrics calculation");
                },
                
                switchToTab(tabId) {
                    console.log("📑 Tab switch:", tabId);
                }
            };
            
            window.zeroTrustExecutivePlatform.init();
        }
    }
}, 3000);
