// Dashboard Initialization Fix
console.log("🔧 Fixing dashboard initialization...");

// Create a wrapper to prevent errors
(function() {
    // Ensure global objects exist
    window.vendorCalculator = window.vendorCalculator || {
        generateVendorComparison: function(config) {
            console.log("Using fallback vendor comparison");
            return {};
        },
        setPortnoxPricing: function(price) {
            console.log("Portnox pricing:", price);
        }
    };
    
    // Wait for DOM
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            if (!window.dashboard && window.ModernExecutiveDashboard) {
                try {
                    window.dashboard = new window.ModernExecutiveDashboard();
                    console.log("✅ Dashboard initialized");
                } catch (e) {
                    console.error("Dashboard init error:", e);
                }
            }
        }, 1000);
    });
})();
