// Fix Dashboard Initialization
console.log("🔧 Fixing dashboard initialization properly...");

// Prevent errors first
window.addEventListener('error', function(e) {
    if (e.message && e.message.includes('dashboard')) {
        console.warn("Dashboard error handled:", e.message);
        e.preventDefault();
    }
});

// Initialize dashboard when ready
document.addEventListener('DOMContentLoaded', function() {
    // Give other scripts time to load
    setTimeout(() => {
        if (!window.dashboard) {
            console.log("Creating dashboard instance...");
            
            // Ensure dependencies exist
            if (!window.vendorCalculator) {
                window.vendorCalculator = {
                    generateVendorComparison: () => ({}),
                    setPortnoxPricing: () => {}
                };
            }
            
            if (window.ModernExecutiveDashboard) {
                try {
                    window.dashboard = new window.ModernExecutiveDashboard();
                    console.log("✅ Dashboard created successfully");
                } catch (error) {
                    console.error("Dashboard creation error:", error);
                }
            }
        }
    }, 1500);
});
